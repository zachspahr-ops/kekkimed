# Kekki — Phased Build

Phases are sequential. Do not start Phase N+1 until Phase N's Definition of Done (DoD) is green. "Shipped" means deployed to Vercel and usable by Zach on his own account.

Total target: 10-12 weekends end to end.

---

## Phase 0 — Foundation (1 weekend)

**Goal:** the deploy pipeline is real before any product code exists.

**Steps**
1. Register kekkimed.com at Cloudflare Registrar (kekki.com was taken; product brand remains "Kekki").
2. Create private GitHub repo `zachspahr-ops/kekkimed` and push this folder.
3. Create Supabase project `kekki-prod`; capture project URL and anon key.
4. Create Vercel project linked to the GitHub repo; configure main branch auto-deploy; set custom domain to kekkimed.com.
5. `pnpm create next-app@latest` in this folder: TypeScript, Tailwind, App Router, src directory off.
6. Install shadcn/ui and initialize with neutral theme.
7. Replace home page with a branded "Kekki — launching soon" placeholder.
8. Populate "How to run locally" in CLAUDE.md.

**DoD:** visiting https://kekkimed.com returns a styled placeholder served from Vercel. `pnpm dev` works from a clean clone.

---

## Phase 1 — Schema + Auth (2 weekends)

**Goal:** Zach can log in; DB schema reflects the full data model.

**Steps**
1. Author `supabase/migrations/001_init.sql` with base tables: `users`, `concepts`, `concept_parents`, `cards`, `clusters`, `cluster_memberships`, `reviews`, `analytics_uploads`, `structured_analytics`, `study_plans`, `plan_items`, `plan_progress`, `waitlist`, `usage_events`. RLS on all user-data tables. **DONE 2026-04-26.** See `phase1_schema_plan.md` (now historical).
1a. Author `supabase/migrations/002_abim_ontology.sql` — adds `concepts.level`, `concepts.ontology_source`, `concepts.ontology_version`; creates `card_ontology_tags` (m:m, with role/granularity/confidence/source/version/review_status); drops `cards.concept_ids[]` array + validator. **DONE 2026-04-26 (applied to kekki-prod).** See D18 + D19.
1b. Author `supabase/migrations/003_retrieval_metadata.sql` — adds `cards.primary_lattice text NOT NULL`, `cards.secondary_lattices text[]`, expands `cards.card_format` enum 4 → 9, creates `card_retrieval_metadata` (1:1 with cards) carrying `cognitive_task`, `prompt_frame`, `answer_form`, `discriminator`, `requires_cloze_one_by_one`, `cloze_grouping`, `format_review_status`. All enum values locked by D20.
1c. Author `supabase/migrations/004_planning_layer.sql` — adds `cards.yield_tier`, `cards.danger_level`, `cards.board_likelihood`, `cards.source_strength`, `cards.review_priority`, `cards.primary_system_id`, `cards.secondary_system_ids[]`, `cards.bridge_reason`; creates `card_discriminators` graph table (directed edges between cards that share a discriminator).
2. Write `scripts/seed_ontology.mjs` — reads `abim_blueprint_v1.json` (ABIM IM CERT, Jan 2026; see D18 for ID scheme), generates dot-delimited snake_case IDs at three depth levels (system / subsection / topic), parses `exam_percent` to numeric (`"14%"` → `0.14`; `"<2%"` → `0.01`; topics → NULL), upserts into `concepts` and rebuilds `concept_parents`. Idempotent. Run with `node --env-file=.env.local scripts/seed_ontology.mjs`. **DONE 2026-04-26 (970 concepts seeded).**
3. Supabase magic-link auth using `@supabase/ssr`. `/login`, `/auth/callback`.
4. Protected route group `(app)` with middleware redirect to `/login` when unauthenticated.
5. `/dashboard` that shows the signed-in user's email and a stub "No clusters yet" state.
6. Seed 20 real cards across 3 clusters by hand (via SQL or a small script) so the schema survives contact with real data.

**DoD:** fresh user can sign up via magic link, lands on `/dashboard`, sees their email and seed clusters. RLS blocks cross-user reads in Supabase SQL editor spot-check. ABIM `concepts` table has ~970 rows across three `level` values. Migrations 003+004 applied; `card_retrieval_metadata` and `card_discriminators` tables exist.

---

## Phase 2 — Review loop (1 weekend)

**Goal:** the core product exists.

**Steps**
1. `/clusters` — list of clusters the user has access to.
2. `/clusters/[id]` — cluster detail; "Start review session."
3. `/review/[session_id]` — card viewer: prompt → reveal → two buttons (Again / Good).
4. Every rating writes a row to `reviews` (card_id, user_id, rating, created_at, session_id).
5. "Finish session" button; if the cluster was part of an active plan, write a row to `plan_progress`.

**DoD:** Zach completes a 15-card review session on his phone, every rating persists, session feels fast (<200ms per rating).

---

## Phase 3 — Intake + structuring (1-2 weekends)

**Goal:** free-text analytics → structured gaps.

**Steps**
1. `/intake` page with a textarea (free text) and file upload (CSV/JSON accepted; stored in Supabase Storage).
2. Server action calls Claude Haiku. Prompt template in `/prompts/intake.md` — constrained-enum forces ontology IDs.
3. Result rendered in a review UI; user can edit (drop a row, re-tag a row) before saving to `structured_analytics`.
4. Save the raw input to `analytics_uploads` with a reference to the resulting `structured_analytics` rows.

**DoD:** Zach pastes "I missed a bunch of hyponatremia and DKA questions on my last MKSAP"; intake returns two rows tagged `nephro_lyt_hypona` and `endo_dm_dka_hhs`; he confirms and they persist.

---

## Phase 4 — Plan generator (1 weekend)

**Goal:** structured gaps → ordered plan.

**Steps**
1. Server action at `/plan/new`: given the user's recent `structured_analytics` + their available clusters, call Haiku to propose a plan.
2. Prompt template at `/prompts/plan.md`. Output is an ordered list of 5-15 cluster IDs with a one-line rationale per item and a target window (7-14 days).
3. UI to accept, edit, or regenerate.
4. Accepted plan saved to `study_plans` + `plan_items`. Listed on `/dashboard` as the active plan.

**DoD:** after Phase 3 intake, Zach opens `/plan/new`, gets an ordered plan of 5-15 clusters with rationale, accepts, and sees it on his dashboard.

---

## Phase 5 — Plan execution (1 weekend)

**Goal:** walking a plan feels like "doing my study for today."

**Steps**
1. `/plan/[id]` — plan detail showing items with completion state.
2. Clicking an item opens the Phase 2 review loop for that cluster.
3. On session finish, mark the item `done`.
4. A plan is `complete` when all items are done OR the 14-day window elapses.

**DoD:** Zach walks a full plan end-to-end over a week, finishes it, sees it marked complete, and the dashboard offers Phase 7's next-step choice.

---

## Phase 6 — Import + cluster editor (1 weekend)

**Goal:** Zach's external card generator can pipe in.

**Steps**
1. `POST /api/cards/import` — accepts a JSON array of cards with a defined schema, validates, writes to `cards` with `status = 'draft'`.
2. Cluster editor UI: create clusters, assign/unassign cards, rename clusters, toggle `draft`/`reviewed`/`retired`.
3. Enforce 24-hour draft cooldown (DB constraint or app check) before `reviewed` promotion.

**DoD:** Zach runs his external generator, posts 50 cards in one call, organizes them into 3 clusters via the UI, promotes one cluster to `reviewed` after 24 hours.

---

## Phase 7 — Loop closure (1 weekend)

**Goal:** after a plan ends, offer both external re-upload and auto-generation from review history.

**Steps**
1. At plan completion, show two options: "Upload new analytics" (→ Phase 3 flow) or "Generate next plan from my review history."
2. Option 2: query recent `reviews` to compute cluster-level miss rates; feed into the Phase 3 structuring prompt as if it were an uploaded narrative; then run Phase 4 plan generation.

**DoD:** Zach completes a plan, clicks "Generate next," sees a new plan that reflects which clusters he actually struggled with.

---

## Phase 8 — Public face + beta gate (2 weekends)

**Goal:** closed beta with a public landing page.

**Steps**
1. Marketing landing page at `/`. Describe the product, show a sample cluster, collect email to `waitlist`.
2. Invite-code gate on signup: `invite_codes` table; signup requires a valid unused code.
3. `/tos` and `/privacy` pages from a Termly template.
4. Support email (support@kekkimed.com) configured via domain email forwarding.
5. Onboard first 5 invited co-residents manually.

**DoD:** 5 invited users sign up through the gate, complete an intake, accept a plan, finish at least one cluster session, all without Zach manually intervening per user.

---

## Phase 9 — Content loop (ongoing)

Not a phase with a fixed DoD. Zach writes cards, clusters them, studies with the product daily, ships one small improvement per week based on his own friction and beta user feedback.

Do not begin the Knowledge Map (visualization layer) until Phase 8 has run for 4+ weeks and there is clear signal that users want it.
