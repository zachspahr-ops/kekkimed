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
1b. Author `supabase/migrations/003_retrieval_metadata.sql` — adds `cards.primary_lattice text NOT NULL`, `cards.secondary_lattices text[]`, expands `cards.card_format` enum 4 → 9, creates `card_retrieval_metadata` (1:1 with cards) carrying `cognitive_task`, `prompt_frame`, `answer_form`, `retrieval_direction`, `discriminator`, `confusable_with`, `requires_cloze_one_by_one`, `cloze_grouping`, `format_confidence`, `format_review_status`, `format_review_note`. Enum values for `primary_lattice`, `secondary_lattices`, `card_format`, `cognitive_task`, `requires_cloze_one_by_one`, and `format_review_status` locked by D20 (latter added in the 2026-04-26 amendment). `retrieval_direction` constrained to a 5-value enum sourced from `flashcard_database_design.md` §5 but not yet promoted into D20. **Authored 2026-04-26 (file written, not yet `supabase db push`'d).**
1c. Author `supabase/migrations/004_planning_layer.sql` — adds `cards.yield_tier`, `cards.danger_level`, `cards.board_likelihood`, `cards.source_strength`, `cards.review_priority`, `cards.primary_system_id`, `cards.secondary_system_ids[]`, `cards.bridge_reason`; creates `card_discriminators` graph table (directed edges between cards that share a discriminator). **Authored 2026-04-28 (file written, not yet `supabase db push`'d).** Enum values locked by D21 (added same day): `yield_tier`/`board_likelihood`/`review_priority ∈ {high,medium,low}`, `danger_level ∈ {low,moderate,high,lethal}`, `source_strength ∈ {society_guideline,primary_trial,systematic_review,narrative_review,expert_opinion}`. All NOT NULL with sensible defaults so the 20 existing seed cards take defaults without backfill.
2. Write `scripts/seed_ontology.mjs` — reads `abim_blueprint_v1.json` (ABIM IM CERT, Jan 2026; see D18 for ID scheme), generates dot-delimited snake_case IDs at three depth levels (system / subsection / topic), parses `exam_percent` to numeric (`"14%"` → `0.14`; `"<2%"` → `0.01`; topics → NULL), upserts into `concepts` and rebuilds `concept_parents`. Idempotent. Run with `node --env-file=.env.local scripts/seed_ontology.mjs`. **DONE 2026-04-26 (970 concepts seeded).**
3. Supabase magic-link auth using `@supabase/ssr`. `/login`, `/auth/callback`. **DONE 2026-04-27.** Includes `lib/supabase/{server,client,middleware}.ts` factories and `proxy.ts` (Next.js 16's renamed `middleware.ts`) calling `updateSession` to refresh the session cookie on every request.
4. Protected route group `(app)` with redirect to `/login` when unauthenticated. **DONE 2026-04-27.** Redirect lives in `app/(app)/layout.tsx` (Server Component) rather than the proxy — closer to the data, survives prefetching reliably.
5. `/dashboard` that shows the signed-in user's email and a stub "No clusters yet" state. **DONE 2026-04-27.** Includes a sign-out form posting to a `signOut` Server Action.
6. Seed 20 real cards across 3 clusters by hand (via SQL or a small script) so the schema survives contact with real data.

**DoD:** fresh user can sign up via magic link, lands on `/dashboard`, sees their email and seed clusters. RLS blocks cross-user reads in Supabase SQL editor spot-check. ABIM `concepts` table has ~970 rows across three `level` values. Migration 003 applied; `card_retrieval_metadata` table exists. Migration 004 authored 2026-04-28 (planning enums locked by D21); `supabase db push` outstanding before Phase 4 begins.

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

## 🛑 STRATEGIC REVIEW CHECKPOINT — between Phase 2 and Phase 3 (historical, 2026-04-27)

When Phase 2's DoD landed, the planned strategic-review pass surfaced enough friction with the Phase 3 + Phase 4 LLM design that Zach pivoted the architecture before continuing. The pivot is captured in **D22** (zero-LLM, ontology-math study loop). Phase 3 + 4 below have been rewritten in place to match the post-D22 architecture; pre-D22 wording and the LLM-era tasks (intake parser, plan generator, AI card generator) are gone. Original Phases 3 + 4 LLM code shipped 2026-04-28/29 and is being deleted in the D22 implementation pass.

---

## Phase 3 — Math intake (1 weekend) — POST-D22 REWRITE

**Goal:** the user's competence per topic is initialized via one of three deterministic intake modes — no LLM, no free text.

**Steps**
1. Apply migration `005_competence_layer.sql`: backfill `concepts.weight` from `abim_blueprint_v1.json` (subsection level — 230 rows), create the `topic_importance_v` view (722 rows, distributing each subsection's `exam_percent` evenly across child topics), create `learner_topic_competence` table with RLS, add `clusters.kind` and `clusters.source_topic_id` columns.
2. `/intake` page with three tabs:
   - **Self-report:** 18 system sliders 0–100%. On submit, distribute each system score uniformly across child topics → write 722 rows to `learner_topic_competence` with `source='self_report'`.
   - **Standardized:** 18 per-system % inputs (paste from a USMLE/NBME score report). Same distribution math; `source='standardized'`.
   - **Evaluator:** "Start session" → routes to a one-shot review session sampling 18 cards (one per system) from the existing reviewed-card library. On finish, EMA-update `learner_topic_competence` per topic from the actual review outcomes; `source='evaluator'`.
3. All three modes write through `lib/intake/init-competence.ts` which is the single entry point for seeding competence. Server actions live in `app/(app)/intake/actions.ts` and call into it.
4. The `analytics_uploads` and `structured_analytics` tables are no longer written by intake; they are unused going forward (kept in schema for Phase 6 import history if needed).

**DoD:** Zach hits `/intake`, picks self-report, drags 18 sliders, submits; `learner_topic_competence` has 722 rows for his user with `source='self_report'`. Each of the three modes can be exercised end-to-end and produces a populated competence table.

---

## Phase 4 — Deterministic planner (1 weekend) — POST-D22 REWRITE

**Goal:** competence + ABIM importance → a 3-cluster plan, computed in SQL.

**Steps**
1. `lib/competence/score.ts` — pure functions, no DB: `outcomeFromReview`, `emaUpdate`, `distributeSubsectionWeight`, `rankWeakTopics` (top-K with parent-system diversity guard).
2. `lib/competence/repo.ts` — DB layer: `refreshCompetenceForUser` (folds in any new `reviews` since last run via EMA), `getTop3WeakTopics` (joins `topic_importance_v` × `learner_topic_competence`, applies diversity guard), `buildDynamicClusterForTopic` (queries `card_ontology_tags` for cards tagged to a topic, inserts a `clusters` row with `kind='ephemeral_topic'` and `source_topic_id`), `resetCompetence`.
3. `/plan/new` page with one button "Generate plan." Server action `generateDeterministicPlanAction` calls `refreshCompetenceForUser` → `getTop3WeakTopics` → `buildDynamicClusterForTopic` × 3 → writes `study_plans` + `plan_items`. No LLM, no Anthropic SDK, no token usage. Plan size = exactly 3 in V1 (D8 narrowed by D22).
4. Accepted plan listed on `/dashboard` as the active plan.

**DoD:** after Phase 3, Zach opens `/plan/new`, clicks "Generate," and sees three ephemeral topic clusters drawn from his three weakest topics (with system diversity). Each cluster contains the cards tagged to that topic. Plan rows persisted; visible on the dashboard.

---

## Phase 5 — Plan execution (1 weekend)

**Goal:** walking a plan feels like "doing my study for today."

**Steps**
1. `/plan/[id]` — plan detail showing items with completion state.
2. Clicking an item opens the Phase 2 review loop for that cluster.
3. On session finish, mark the item `done`.
4. A plan is `complete` when all items are done OR the 14-day window elapses.

**DoD:** Zach walks a full plan end-to-end over a week, finishes it, sees it marked complete, and the dashboard surfaces a "Generate next plan" button that re-runs Phase 4's deterministic planner against the updated competence (Phase 7).

---

## Phase 6 — Import + cluster editor (1 weekend)

**Goal:** Zach's external card generator can pipe in.

**Steps**
1. `POST /api/cards/import` — accepts a JSON array of cards with a defined schema, validates, writes to `cards` with `status = 'draft'`.
2. Cluster editor UI: create clusters, assign/unassign cards, rename clusters, toggle `draft`/`reviewed`/`retired`.
3. Enforce 24-hour draft cooldown (DB constraint or app check) before `reviewed` promotion.

**DoD:** Zach runs his external generator, posts 50 cards in one call, organizes them into 3 clusters via the UI, promotes one cluster to `reviewed` after 24 hours.

---

## Phase 7 — Loop closure (½ weekend) — POST-D22 REWRITE

**Goal:** trivial under D22 — the math *is* the loop.

**Steps**
1. At plan completion (or any time), the user clicks "Generate plan" on `/plan/new`. The server action runs `refreshCompetenceForUser` first, which folds in every `reviews` row written since the last run; `getTop3WeakTopics` then reflects the new state automatically.
2. Add a hook on `finishSession` (the existing review server action) that calls `refreshCompetenceForUser` after each session, so the competence table is fresh by the time the user returns to `/plan/new`. This is the "q24" cadence in practice — refreshes happen on review completion plus any time the user generates a plan, which is at least daily.
3. Add a "Reset competence" button to Settings that wipes `learner_topic_competence` for the user (with confirm modal) and redirects them back to `/intake`. Lets users re-baseline if they feel the model has drifted.

**DoD:** Zach completes a 3-cluster plan, hits "Generate plan" again, and sees a new plan whose top-3 weakest topics reflect both his prior intake init *and* his actual review performance from the cluster he just finished. The "Reset" button fully clears competence and routes to `/intake`.

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
