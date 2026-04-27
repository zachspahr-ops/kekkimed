# Kekki — Architecture

*Live snapshot of what exists in the codebase right now. The durable answer to "where does this thing live and how does data flow through it." If you've read CLAUDE.md, DECISIONS.md, and PHASES.md, this file fills the gap between "what we decided" and "what is actually built."*

**Last updated:** 2026-04-26 (Phase 1, after migrations 001+002; migration 003 forecast per D20).

---

## How to use this file

- **Read it at the start of any session that touches schema, routes, RLS, or the LLM wiring.** It's the second file in the `/plan` checklist after CLAUDE.md.
- **Update it in the same PR that lands the change.** If you add a table, write a new route, wire a new prompt, change RLS, or rotate an external service: update the relevant section here before merging. Stale architecture docs are worse than none.
- **Don't restate decisions.** This file says what is built. DECISIONS.md says why. PHASES.md says when. If you find yourself explaining a tradeoff, that probably belongs in DECISIONS.md.

When to update which section:

| You did this | Update section |
|---|---|
| Added/changed a table, column, index, trigger, or RLS policy | §3 Data Model |
| Added/changed an API route or server action | §4 Routes |
| Wired a new prompt or changed an existing one | §5 LLM Call Sites |
| Touched auth flow or middleware | §6 Auth + RLS |
| Added a new top-level dir or moved a load-bearing file | §7 File Layout |
| Changed Supabase, Vercel, or Anthropic config | §8 External Services |

---

## 1. System overview

```
                  ┌────────────────────────────────────┐
                  │           Browser (user)           │
                  └────────────────┬───────────────────┘
                                   │ HTTPS
                  ┌────────────────▼───────────────────┐
                  │     Next.js 14 App Router          │
                  │  (Vercel — main branch deploys)    │
                  │                                    │
                  │  /(marketing)   public landing     │
                  │  /(app)         auth-gated UI      │
                  │  /api           server actions     │
                  └─────┬──────────────┬───────────────┘
                        │              │
              @supabase/ssr     @anthropic-ai/sdk
                        │              │
        ┌───────────────▼──┐    ┌──────▼─────────────┐
        │   Supabase       │    │  Anthropic API     │
        │  (kekki-prod)    │    │  Claude Haiku 4.5  │
        │                  │    │                    │
        │ - Postgres + RLS │    │ Three call sites:  │
        │ - Auth (magic)   │    │  intake / plan /   │
        │ - Storage        │    │  ai_card           │
        └──────────────────┘    └────────────────────┘
```

The user's browser talks to Next.js running on Vercel. Server-side code in Next.js talks to Supabase (DB + auth + file storage) and to Anthropic (the only LLM, accessed at exactly three call sites — D6). All user-data tables in Postgres have Row-Level Security; Supabase's auth.uid() drives every policy.

---

## 2. Stack versions (current)

| Component | Version | Notes |
|---|---|---|
| Node.js | 20+ (developed on 24.15.0) | Windows install via `winget install OpenJS.NodeJS.LTS` |
| pnpm | 10+ | `npm install -g pnpm` after Node on PATH |
| Next.js | 14+ App Router | TypeScript strict mode |
| TypeScript | strict | `tsc --noEmit` is the typecheck gate |
| Tailwind CSS | latest | shadcn/ui components |
| Supabase JS | `@supabase/supabase-js` (server scripts) | `@supabase/ssr` will land in Phase 1 step 3 for browser/server cookies |
| Anthropic SDK | `@anthropic-ai/sdk` | not yet imported — first use in Phase 3 |
| Supabase CLI | latest | installed via Scoop; `supabase link --project-ref jquturibslqzkldngzvf` per worktree |

Stack is locked in DECISIONS.md D2. New dependencies require Zach's sign-off in `/plan`.

---

## 3. Data Model — live (migrations 001 + 002 applied to kekki-prod)

The schema is **14 tables** in `public`, plus the `auth.users` table managed by Supabase. All listed tables enable RLS; tables without explicit policies are service-role-only by default.

### Tables

| Table | Purpose | Key constraints | RLS posture |
|---|---|---|---|
| `users` | Mirror of `auth.users` + Kekki profile (`timezone` for D13 local-day rate limit) | PK = `auth.users(id)`; trigger-synced on signup | Self read/update |
| `concepts` | Controlled vocabulary, ABIM blueprint (D5, D17, D18) | `id` is dot-delimited slug; `level ∈ {system,subsection,topic}`; `ontology_source='abim_blueprint'`, `ontology_version='jan_2026'` | Authed read; service-role write |
| `concept_parents` | Polyhierarchy edges (D17) | Composite PK; partial unique index for one `is_primary=true` per child | Authed read; service-role write |
| `clusters` | Cluster snapshots — the unit of review (D4) | `visibility ∈ {private,shared}`; `definition jsonb` reserved for future "refresh" feature | Owner CRUD + shared SELECT |
| `cards` | Flashcards | `citation NOT NULL` (D7); `source ∈ {human,external_pipeline,ai_private}` (D13); `status ∈ {draft,reviewed,retired}`; `difficulty NOT NULL ∈ {core,advanced,trap}` (D17) | `reviewed` visible to all authed; `draft` author-only |
| `card_ontology_tags` | Cards ↔ concepts m:m (D19, replaces `cards.concept_ids[]`) | `tag_role ∈ {primary,secondary,bridge,planning_only}` with partial unique on primary; `confidence` 0–1; `tag_source` provenance | Derived from `cards` visibility |
| `cluster_memberships` | Cards ↔ clusters m:m | Composite PK + `position int` for ordering | Derived from `clusters` ownership |
| `reviews` | Append-only rating log (D9) | `rating ∈ {again,good}`; `time_ms` for D17 derived `slow` | Self read/insert; no update/delete |
| `analytics_uploads` | Raw intake (text or file ref) | `kind ∈ {text,file}` with payload check | Self CRUD |
| `structured_analytics` | Parsed gaps (intake parser output) | FK to `concepts(id)`; `severity` + `confidence` enums | Self CRUD |
| `study_plans` | Plan envelope | `status ∈ {active,complete,abandoned}`; `target_window_days` 7–14 | Self CRUD |
| `plan_items` | Ordered cluster references inside a plan | `position` 1–15; unique per `(plan_id, position)` | Derived from `study_plans` |
| `plan_progress` | Completion record per `plan_item` | Unique on `plan_item_id` (one completion per item) | Derived via `plan_items → study_plans` |
| `waitlist` | Landing-page email capture (D1) | Unique email | Service-role only (no public policies) |
| `usage_events` | Token metering at LLM call sites (D16) | `call_site ∈ {intake,plan,ai_card}`; `input_tokens`/`output_tokens` ≥ 0 | Self read; service-role write |

### Triggers

| Trigger | Fires on | What it does |
|---|---|---|
| `on_auth_user_created` | `auth.users` insert | Mirror to `public.users` |
| `on_auth_user_email_updated` | `auth.users` email update | Sync `public.users.email` |
| `cards_status_transition` | `cards` status update | Enforces D7 24-hour draft cooldown; stamps `reviewed_at`/`retired_at` |

### Concept-FK enforcement

Per-card concept tags are enforced relationally via `card_ontology_tags.concept_id REFERENCES concepts(id)`. The pre-D19 array-validator trigger (`cards_validate_concept_ids`) was dropped in migration 002.

### Migration cadence

| File | Status | Adds |
|---|---|---|
| `001_init.sql` | Applied | Base schema (14 tables, RLS, triggers) |
| `002_abim_ontology.sql` | Applied 2026-04-26 | `concepts.level/ontology_source/ontology_version`; `card_ontology_tags`; drops `cards.concept_ids[]` |
| `003_retrieval_metadata.sql` | Not yet written | `cards.primary_lattice` (4-value), `cards.secondary_lattices text[]` (subset CHECK over 7 values), expand `cards.card_format` 4 → 9, new 1:1 `card_retrieval_metadata` (cognitive_task, prompt_frame, answer_form, discriminator, requires_cloze_one_by_one, cloze_grouping, format_review_status). All enum values locked by D20. |
| `004_planning_layer.sql` | Not yet written | Planning fields on `cards` (yield_tier, danger_level, board_likelihood, source_strength, review_priority, primary_system_id, secondary_system_ids[], bridge_reason); `card_discriminators` directed-graph table for cross-card disambiguation. |

Apply with `supabase db push` (after `supabase link --project-ref jquturibslqzkldngzvf`).

---

## 4. Routes — live + planned

App-router conventions: folder name = URL segment; `page.tsx` = the page; `route.ts` = the API endpoint.

**Live now (Phase 0 + 1 step 2):**

| Route | Type | Purpose |
|---|---|---|
| `/` | page | Placeholder home page (will be replaced by marketing landing in Phase 8) |

**Planned by phase** (lightweight pointer; full intent in PHASES.md):

| Route | Phase | Purpose |
|---|---|---|
| `/login` | 1 step 3 | Magic-link signup/signin |
| `/auth/callback` | 1 step 3 | Supabase OAuth callback |
| `/dashboard` | 1 step 5 | Signed-in user landing |
| `/clusters`, `/clusters/[id]` | 2 | Cluster list + detail |
| `/review/[session_id]` | 2 | Card viewer + binary self-rate |
| `/intake` | 3 | Free-text + file upload + parser preview |
| `/plan/new`, `/plan/[id]` | 4 + 5 | Plan generation, execution |
| `POST /api/cards/import` | 6 | Bulk import endpoint for the external pipeline |

Update this section when a route lands.

---

## 5. LLM Call Sites — exactly three (D6)

The Anthropic SDK is **not yet imported**. First use lands in Phase 3.

| # | Site | Phase | Inputs | Outputs | Prompt location |
|---|---|---|---|---|---|
| 1 | Intake parser | 3 | Free-text/file from `/intake` | Structured gaps mapped to `concepts.id` (or `{rejected:true,reason}` per D14) | `/prompts/intake.md` (planned) |
| 2 | Plan generator | 4 | Recent `structured_analytics` rows + user's clusters | Ordered list of 5–15 cluster IDs with rationale + 7–14d target window | `/prompts/plan.md` (planned) |
| 3 | Private AI card generator | (post-Phase-6, see D13) | Existing gap (`structured_analytics` row or named concept) + target cluster | Card with `source='ai_private'`, `status='draft'`, citation, ontology tags | `/prompts/ai_card.md` (planned) |

**Hard rules across all sites:**
- Token usage logged to `usage_events` (D16) per request, with `request_ref` pointing to the originating row (`upload_id`, `plan_id`, or `card_id`).
- Concept tags are constrained-enum: model returns `concepts.id` strings or `null`; never invents slugs (D5, D17).
- Site #1 has the two-layer stem rejection (heuristic precheck + LLM constraint) per D14.
- Site #3 has the full guardrail bundle per D13: rate-limited 10 cards/user/local-day, attach-to-cluster required, citation enforced via `cards.citation NOT NULL`, draft → 24h cool → human review.

**Not allowed anywhere else:** LLM in the review loop, LLM scoring of free-text answers, LLM-as-substitute-for-human-review, bulk card generation in this repo (lives in the external pipeline that posts to `/api/cards/import`).

---

## 6. Auth + RLS

**Auth provider:** Supabase magic-link (D2). The `@supabase/ssr` package will land with Phase 1 step 3; cookies are read from request and written to response on every server action.

**The auth-uid invariant.** Every RLS policy on a user-data table predicates on `auth.uid()` matching either `user_id` (self-owned data) or a derived path through a parent table (e.g., `cluster_memberships` → `clusters.owner_user_id`). The service role bypasses RLS entirely; it is used for the seed script and for system writes to `usage_events` and `waitlist`.

**Visibility rules in one paragraph.** Reviewed cards are readable by any authenticated user. Draft cards are author-only. Clusters can be private (owner-only) or shared (any authed). Cluster memberships and card-ontology tags inherit visibility from their parent. Reviews, analytics uploads, structured analytics, plans, plan items, plan progress, and usage events are strictly self-only. The waitlist is service-role only.

**Trigger-managed inserts.** The `on_auth_user_created` trigger inserts a row into `public.users` whenever Supabase Auth creates an account. There is no insert policy on `public.users` because nothing in app code should insert there.

---

## 7. File Layout — current

```
/app                       Next.js App Router
  layout.tsx
  page.tsx                 placeholder home (Phase 0)
  globals.css
  favicon.ico
/components
  /ui                      shadcn/ui primitives
/lib
  utils.ts                 (only file so far — pure helpers)
/scripts
  seed_ontology.mjs        seeds concepts + concept_parents from abim_blueprint_v1.json (D18)
/supabase
  /migrations
    001_init.sql           base schema
    002_abim_ontology.sql  ABIM hierarchy + card_ontology_tags
/public                    static assets (Next.js default svgs for now)
/archive                   superseded files retained for traceability
  kekki_ontology_v0.json
  kekki_concepts_v1.json
  transform_v0_to_v1.mjs

abim_blueprint_v1.json     canonical ontology seed (ABIM IM CERT, Jan 2026; D18)
Medical_Knowledge_Ontology.md   four-layer tagging framework (D17)
flashcard_database_design.md    reference: existing flashcard DB shape (informs migration 003+004)
Flash Card Generation PRACTICE_PATTERNS.md   reference: card-writing norms used by external pipeline

ARCHITECTURE.md            this file
CLAUDE.md                  agent operating instructions (+ AGENTS.md included via @ at top)
AGENTS.md                  one-liner on Next.js conventions
DECISIONS.md               D1–D19, locked
PHASES.md                  phased build plan with DoD per phase
PROJECT_SUMMARY.md         pitch + phase status
PRACTICE_PATTERNS.md       workflow norms shared between Zach and the agent
SESSION_LOG.md             append-only session journal
KEKKI_ORIENTATION.md       plain-English stack tutor for Zach
phase1_schema_plan.md      historical: design notebook for migrations 001/002
README.md                  short repo intro

package.json, pnpm-lock.yaml, pnpm-workspace.yaml
next.config.ts, eslint.config.mjs, postcss.config.mjs, components.json, tsconfig.json
.gitignore
.claude/                   Claude Code session config (settings.local.json)
```

Planned additions:
- `/prompts/` — LLM prompt templates (Phase 3+).
- `/app/(marketing)`, `/app/(app)` route groups (Phase 1 step 3+).
- `/lib/supabase/` — browser + server clients (Phase 1 step 3).

---

## 8. External Services

| Service | Identifier / location | What it holds | Notes |
|---|---|---|---|
| Supabase project | `kekki-prod` (ref `jquturibslqzkldngzvf`) | DB, auth, storage | Linked per worktree via `supabase link`. Project URL + anon key in `.env.local`. |
| Vercel project | (linked to GitHub repo) | Hosting; main = production | Auto-deploys main; preview deploys per branch. |
| Cloudflare Registrar | kekkimed.com | Domain registration | DNS pointed at Vercel. |
| Anthropic API | `api.anthropic.com` | Claude Haiku 4.5 inference | `ANTHROPIC_API_KEY` server-only env var (lands in Phase 3). |
| GitHub | `zachspahr-ops/kekkimed` (private) | Source of truth | Vercel is connected here. |

**Env vars** (kept in `.env.local` at parent project dir, not the worktree):

| Var | Required by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 1 step 3+ | Exposed to browser |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 1 step 3+ | Exposed to browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Seed script + system writes | Server-only — never exposed to browser |
| `ANTHROPIC_API_KEY` | Phase 3+ | Server-only |

Worktrees: `.env.local` is at `C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local`, not in the worktree. Use `--env-file="C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local"` for Node scripts.

---

## 9. Definition of Done (architecture-level)

For any change that touches this file's territory:

1. `pnpm typecheck` passes.
2. `pnpm build` passes.
3. The change works end-to-end on a real flow you can describe in one sentence.
4. **This file is updated in the same PR.** No exceptions for schema, routes, RLS, or LLM wiring.
5. SESSION_LOG.md gets an entry that names the section of ARCHITECTURE.md you touched.
