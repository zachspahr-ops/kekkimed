# Kekki — Architecture

*Live snapshot of what exists in the codebase right now. The durable answer to "where does this thing live and how does data flow through it." If you've read CLAUDE.md, DECISIONS.md, and PHASES.md, this file fills the gap between "what we decided" and "what is actually built."*

**Last updated:** 2026-07-22 (combined v7.5.1 non-LOINC public release deployed and verified).

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
| Changed Supabase or Vercel config | §8 External Services |

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
                  └─────┬──────────────────────────────┘
                        │
                  @supabase/ssr
                        │
        ┌───────────────▼────┐
        │   Supabase         │
        │  (kekki-prod)      │
        │                    │
        │ - Postgres + RLS   │
        │ - Auth (magic)     │
        │ - Storage          │
        └────────────────────┘
```

The user's browser talks to Next.js running on Vercel. Server-side code in Next.js talks to Supabase (DB + auth + file storage). **There is no LLM in this repo (D22).** All user-data tables in Postgres have Row-Level Security; Supabase's `auth.uid()` drives every policy. Weakness ranking, top-3 selection, and dynamic cluster generation are pure SQL on `concepts.weight`, `topic_importance_v`, `learner_topic_competence`, and `card_ontology_tags`.

---

## 2. Stack versions (current)

| Component | Version | Notes |
|---|---|---|
| Node.js | 20+ (developed on 24.15.0) | Windows install via `winget install OpenJS.NodeJS.LTS` |
| pnpm | 10+ | `npm install -g pnpm` after Node on PATH |
| Next.js | 14+ App Router | TypeScript strict mode |
| TypeScript | strict | `tsc --noEmit` is the typecheck gate |
| Tailwind CSS | latest | shadcn/ui components |
| Supabase JS | `@supabase/supabase-js` (server scripts), `@supabase/ssr` ^0.10.2 (auth cookies) | Both installed |
| Supabase CLI | latest | installed via Scoop; `supabase link --project-ref jquturibslqzkldngzvf` per worktree |

Stack is locked in DECISIONS.md D2. New dependencies require Zach's sign-off in `/plan`.

---

## 3. Data Model — live (migrations 001–005 applied to kekki-prod; 005 lands with the D22 pivot)

The schema is **17 tables + 1 view** in `public`, plus the `auth.users` table managed by Supabase. All listed tables enable RLS; tables without explicit policies are service-role-only by default.

### Tables

| Table | Purpose | Key constraints | RLS posture |
|---|---|---|---|
| `users` | Mirror of `auth.users` + Kekki profile (`timezone` for D13 local-day rate limit) | PK = `auth.users(id)`; trigger-synced on signup | Self read/update |
| `concepts` | Controlled vocabulary, ABIM blueprint (D5, D17, D18) | `id` is dot-delimited slug; `level ∈ {system,subsection,topic}`; `ontology_source='abim_blueprint'`, `ontology_version='jan_2026'` | Authed read; service-role write |
| `concept_parents` | Polyhierarchy edges (D17) | Composite PK; partial unique index for one `is_primary=true` per child | Authed read; service-role write |
| `clusters` | Cluster snapshots — the unit of review (D4). M005 adds `kind ∈ {manual,ephemeral_topic}` (D22) and `source_topic_id` (FK→`concepts.id`, nullable) for planner-generated clusters. | `visibility ∈ {private,shared}`; `kind`, `source_topic_id` (D22); `definition jsonb` reserved for future "refresh" feature | Owner CRUD + shared SELECT |
| `cards` | Flashcards | `citation NOT NULL` (D7); `source ∈ {human,external_pipeline,ai_private}` (D13); `status ∈ {draft,reviewed,retired}`; `difficulty NOT NULL ∈ {core,advanced,trap}` (D17); `primary_lattice NOT NULL ∈ {t_to_m,p_to_e,e_to_o,s_to_r}` and `secondary_lattices text[]` subset of 7 values (D20, m003); `card_format` 9-value enum (D20, m003); planning enums `yield_tier`/`board_likelihood`/`review_priority ∈ {high,medium,low}`, `danger_level ∈ {low,moderate,high,lethal}`, `source_strength ∈ {society_guideline,primary_trial,systematic_review,narrative_review,expert_opinion}` — all NOT NULL with defaults (D21, m004); `primary_system_id text NULL` FK→concepts, `secondary_system_ids text[]`, `bridge_reason text NULL` (D21, m004) | `reviewed` visible to all authed; `draft` author-only |
| `card_ontology_tags` | Cards ↔ concepts m:m (D19, replaces `cards.concept_ids[]`) | `tag_role ∈ {primary,secondary,bridge,planning_only}` with partial unique on primary; `confidence` 0–1; `tag_source` provenance | Derived from `cards` visibility |
| `card_retrieval_metadata` | 1:1 with `cards`; how the card should be studied (D20, m003) | `cognitive_task NOT NULL` 11-value enum; `retrieval_direction` 5-value; `requires_cloze_one_by_one bool`; `format_review_status` 4-value enum (D20 amendment); `format_confidence` 0–1 | Derived from `cards` visibility |
| `card_discriminators` | Directed-graph edges between cards that share a discriminator key (D21, m004) | Composite PK `(source_card_id, target_card_id, discriminator_key)`; CHECK `source_card_id ≠ target_card_id`; cascade on card delete; `created_by` set-null on user delete | Both endpoints visible to caller; INSERT requires authoring either endpoint |
| `cluster_memberships` | Cards ↔ clusters m:m | Composite PK + `position int` for ordering | Derived from `clusters` ownership |
| `reviews` | Append-only rating log (D9) | `rating ∈ {again,good}`; `time_ms` for D17 derived `slow` | Self read/insert; no update/delete |
| `analytics_uploads` | (Pre-D22 intake raw text — unused after D22, schema retained) | `kind ∈ {text,file}` with payload check | Self CRUD |
| `structured_analytics` | (Pre-D22 LLM-parsed gaps — unused after D22, schema retained) | FK to `concepts(id)`; `severity` + `confidence` enums | Self CRUD |
| `learner_topic_competence` | **D22** Per-user, per-topic competence ∈ [0,1]; updated by EMA over `reviews` | PK `(user_id, concept_id)`; `score` 0–1; `samples int`; `source ∈ {self_report,standardized,evaluator,review}` | Self read/insert/update |
| `topic_importance_v` *(view)* | **D22** Per-topic importance = parent subsection `exam_percent` distributed evenly across child topics. 722 rows. | Joins `concepts` + `concept_parents` where `parent.level='subsection'`; never denormalized | Inherits caller permissions on `concepts` |
| `study_plans` | Plan envelope | `status ∈ {active,complete,abandoned}`; `target_window_days` historical (V1 plans are exactly 3 clusters per D22) | Self CRUD |
| `plan_items` | Ordered cluster references inside a plan | `position` 1–3 in V1 (D22 narrowed D8); unique per `(plan_id, position)` | Derived from `study_plans` |
| `plan_progress` | Completion record per `plan_item` | Unique on `plan_item_id` (one completion per item) | Derived via `plan_items → study_plans` |
| `waitlist` | Landing-page email capture (D1) | Unique email | Service-role only (no public policies) |
| `usage_events` | (Pre-D22 token metering — no new writes after D22, schema retained for history) | `call_site ∈ {intake,plan,ai_card}`; `input_tokens`/`output_tokens` ≥ 0 | Self read; service-role write |

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
| `003_retrieval_metadata.sql` | Applied 2026-04-27 (via Supabase MCP `apply_migration`; version stamp `20260427040324_retrieval_metadata`) | `cards.primary_lattice` (4-value), `cards.secondary_lattices text[]` (subset CHECK over 7 values), expand `cards.card_format` 4 → 9 (drops the prior `'basic'` default — every authoring path supplies a format), new 1:1 `card_retrieval_metadata` (cognitive_task, prompt_frame, answer_form, retrieval_direction, discriminator, confusable_with, requires_cloze_one_by_one, cloze_grouping, format_confidence, format_review_status, format_review_note). Enum values locked by D20 + the 2026-04-26 D20 amendment (`format_review_status`). |
| `004_planning_layer.sql` | Applied 2026-04-28. Enum values locked by D21 (added same day). | Adds planning enums on `cards` (`yield_tier`, `danger_level`, `board_likelihood`, `source_strength`, `review_priority` — all NOT NULL with defaults so existing seed cards take defaults without backfill); adds `cards.primary_system_id text NULL` FK→concepts, `cards.secondary_system_ids text[] NOT NULL DEFAULT '{}'`, `cards.bridge_reason text NULL`; creates `card_discriminators` directed-graph table joining cards by shared `discriminator_key` (the `discriminator` column lives on `card_retrieval_metadata` from m003), with RLS mirroring `card_ontology_tags` (D19). |
| `005_competence_layer.sql` | In progress (D22 pivot). | Backfills `concepts.weight` from `abim_blueprint_v1.json` for 230 subsection rows; creates `topic_importance_v` view (722 topic rows × distributed importance); creates `learner_topic_competence` table with RLS (self-only); adds `clusters.kind ∈ {manual,ephemeral_topic}` and `clusters.source_topic_id text NULL FK→concepts`. |

Apply with Supabase MCP `apply_migration` (preferred per `feedback_worktree_env.md`) or `supabase db push` (after `supabase link --project-ref jquturibslqzkldngzvf`).

---

## 4. Routes — live + planned

App-router conventions: folder name = URL segment; `page.tsx` = the page; `route.ts` = the API endpoint.

**Live now (Phases 0–4):**

| Route | Type | Purpose |
|---|---|---|
| `/` | page | Public dark tools index linking to the preserved reviewer, stable side-by-side v7.5.1 parse comparison, canonical v7.5.1 network, and historical network releases. |
| `/reviewer` | static HTML via rewrite | Preserved original MedQA-only question parse reviewer. Entity highlights, metadata inspection, accept/flag notes, and JSON export run entirely in the browser; review state stays in local storage. |
| `/reviewer/compare` | static HTML via rewrite | Stable side-by-side legacy-versus-v7.5.1 parse review over exactly the same ten MedQA questions shown by `/reviewer`. The reviewer-only exception permits those ten raw MedQA samples: 616 unchanged legacy mentions versus 614 accepted v7.5.1 facts, deterministically collapsed to 511 visible annotations and 269 distinct question-concept incidences. All ten questions have accepted facts; 355 unresolved candidate spans remain excluded. |
| `/network/4.9` | static HTML via rewrite | Entity-level answer-choice topology with clinical-domain and answer-role views. |
| `/network/5.0` | static HTML via rewrite | Entity-level association network with cross-source replication and community structure. |
| `/network/5.1` | static HTML via rewrite | Historical canonical-concept answer-choice network with exact answer choices retained for audit. |
| `/network/5.4` | static HTML via rewrite | Preserved historical all-entity analysis release with a weighted component landscape, reviewed community labels, and focused evidence-network drill-downs. |
| `/network/7.5.1` | static HTML via rewrite | Canonical public-safe `clinical_network_v751_nonloinc_public_r1` preview. It exposes 1,892 concepts and 14,676 support-eight-or-greater associations, with a default support-16 view of 892 concepts and 4,959 associations. Raw questions, answer keys, source labels, evidence/provenance, and the source selector are excluded. |
| `/network/7.4` | temporary redirect | Non-permanent compatibility redirect to `/network/7.5.1`. The original v7.4 static asset remains preserved in Git as a rollback/audit artifact and is not overwritten. |
| `/login` | page + server action | Magic-link sign-in form. Server action `signInWithEmail` calls `supabase.auth.signInWithOtp`; redirects to `/login?status=sent` on success or `/login?error=...` on failure |
| `/auth/callback` | route handler | GET handler that receives `?code=...` from the Supabase magic link, calls `exchangeCodeForSession`, redirects to `/dashboard` (or `?next=`) |
| `(app)` route group | layout | Auth gate. The layout calls `supabase.auth.getUser()` and `redirect('/login')` when no session — every page under this group is guaranteed authenticated |
| `/dashboard` | page | Signed-in user landing. Shows email, nav links to clusters / intake / plan |
| `/clusters` | page | Cluster list — shows all user-accessible clusters with card counts |
| `/clusters/[id]` | page + server action | Cluster detail + "Start review session" button |
| `/review/[session_id]` | page + client component + server action | Card viewer (prompt → reveal → Again/Good buttons). Writes to `reviews`; "Finish" writes to `plan_progress`. |
| `/intake` | page + client component + server actions | **D22** Three-tab UI: self-report (18 system sliders) / standardized (per-system %) / evaluator (18-card calibration session). Each calls a deterministic server action in `init-competence.ts` that writes 722 rows to `learner_topic_competence` with the appropriate `source`. No LLM. |
| `/plan/new` | page + client component + server action | **D22** One button "Generate plan." Server action `generateDeterministicPlanAction` calls `refreshCompetenceForUser` → `getTop3WeakTopics` (importance × (1−competence) with parent-system diversity) → `buildDynamicClusterForTopic` × 3 (inserts ephemeral `clusters` rows with `kind='ephemeral_topic'`) → writes `study_plans` + `plan_items`. Pure SQL, no LLM. |

**Planned by phase** (lightweight pointer; full intent in PHASES.md):

| Route | Phase | Purpose |
|---|---|---|
| `/plan/[id]` | 5 | Plan detail + walk clusters in order + completion tracking |
| `POST /api/cards/import` | 6 | Bulk import endpoint for the external pipeline |

Update this section when a route lands.

---

## 5. LLM Call Sites — none (D22 supersedes D6/D13/D14)

There is **no LLM in this repo** as of 2026-04-29 (D22). The `@anthropic-ai/sdk` dependency was removed; `lib/llm/`, `prompts/`, `lib/intake/stem-rejection.ts`, `lib/intake/candidate-concepts.ts`, and `lib/plan/clusters-summary.ts` were deleted.

**Where the "intelligent" parts of the product live now:**

| Concern | Where it's computed |
|---|---|
| Gap detection | `topic_importance_v` × `learner_topic_competence` (SQL view + table) |
| Top-3 weak topics | `lib/competence/score.ts` `rankWeakTopics(rows, k=3)` with parent-system diversity guard |
| Cluster generation | `lib/competence/repo.ts` `buildDynamicClusterForTopic` queries `card_ontology_tags` and inserts an ephemeral `clusters` row |
| Plan envelope | `app/(app)/plan/new/actions.ts` `generateDeterministicPlanAction` orchestrates the above into `study_plans` + `plan_items` |

**Bulk card authoring** happens outside this repo and posts to `POST /api/cards/import` (Phase 6) — that path is unchanged by D22.

**Adding any LLM call site back** requires a new DECISIONS.md entry that names the site, the cost cap, and the legal containment posture (D22, "Revisit if").

---

## 6. Auth + RLS

**Auth provider:** Supabase magic-link (D2). Implemented via `@supabase/ssr` (^0.10.2) — landed in Phase 1 step 3.

**Cookie + session flow:**
1. User submits email at `/login`. The server action `signInWithEmail` calls `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: '<host>/auth/callback' } })`. Supabase emails a magic link.
2. User clicks the link. Browser hits `/auth/callback?code=...`. The route handler calls `exchangeCodeForSession(code)`, which sets the auth cookie via `cookieStore.set` (called from inside the `setAll` adapter in `lib/supabase/server.ts`).
3. Subsequent requests are intercepted by `proxy.ts` (Next.js 16's renamed middleware file). It calls `lib/supabase/middleware.ts → updateSession`, which calls `supabase.auth.getUser()` — that call refreshes the access token if needed and rewrites the cookie via `setAll`. **Use `getUser()` not `getSession()` here**: the latter does not refresh, and signed-in users would be silently logged out when their token expires.
4. Pages and route handlers under `app/(app)/` use `lib/supabase/server.ts → createClient()` to read the user inside Server Components. The `(app)/layout.tsx` is the auth gate: it calls `getUser()` and `redirect('/login')` if absent.

**Why redirect from the layout, not the proxy?** Per Next.js 16 auth guidance, redirects close to the data are more reliable than proxy-level redirects, which run on prefetched routes and can fire spuriously. The proxy's only job is to refresh the cookie.

**Sign-out:** the `/dashboard` page renders a plain `<form>` POSTing to a `signOut` Server Action that calls `supabase.auth.signOut()` and `redirect('/login')`. No JS required.

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
  /login
    page.tsx               magic-link form (Phase 1 step 3)
    actions.ts             server action: signInWithEmail
  /auth/callback
    route.ts               GET handler: exchangeCodeForSession → /dashboard
  /(app)                   protected route group — layout enforces auth (Phase 1 step 4)
    layout.tsx             calls getUser; redirect('/login') if null
    /dashboard
      page.tsx             email + nav links (clusters / intake / plan)
      actions.ts           server action: signOut
    /clusters
      page.tsx             cluster list with card counts (Phase 2)
      /[id]
        page.tsx           cluster detail + "Start review session" (Phase 2)
        actions.ts         server actions: start session (Phase 2)
    /review/[session_id]
      page.tsx             review session page (Phase 2)
      ReviewClient.tsx     client component: prompt → reveal → Again/Good (Phase 2)
      actions.ts           server actions: rate card, finish session (Phase 2)
    /intake
      page.tsx             server wrapper: pre-loads competence rows + system list (Phase 3, post-D22)
      IntakeClient.tsx     client component: 3-tab UI (self-report / standardized / evaluator) (Phase 3, post-D22)
      actions.ts           initFromSelfReportAction / initFromStandardizedAction / startEvaluatorAction (Phase 3, post-D22)
      /evaluator/[session_id]
        page.tsx           18-card calibration session — reuses review UI; on finish, EMA-init competence (Phase 3, post-D22)
    /plan/new
      page.tsx             server wrapper: pre-loads top-3 preview (Phase 4, post-D22)
      PlanNewClient.tsx    client component: single "Generate plan" button + read-only preview (Phase 4, post-D22)
      actions.ts           generateDeterministicPlanAction — pure SQL, no LLM (Phase 4, post-D22)
    /settings
      page.tsx             "Reset competence" button (Phase 7, post-D22)
      actions.ts           resetCompetenceAction
proxy.ts                   Next.js 16 proxy (formerly middleware.ts) — refreshes session cookie via @supabase/ssr
/components
  /ui                      shadcn/ui primitives
/lib
  utils.ts                 pure helpers
  /cards
    types.ts                   locked card vocabulary (D17/D19/D20/D21 enum types + const arrays + type guards)
    types.test.ts              cardinality + guard contract tests
    import-schema.ts           Phase 6 validator for `POST /api/cards/import` payload (returns NormalizedImportPayload or accumulated ImportError[])
    import-schema.test.ts      validator test suite
    import-mapper.ts           maps NormalizedImportPayload → flat insert rows for clusters, cards, card_retrieval_metadata, card_ontology_tags, cluster_memberships
    import-mapper.test.ts      mapper test suite
  /competence                  D22 — deterministic math layer
    score.ts                   pure functions: outcomeFromReview, emaUpdate, distributeSubsectionWeight, rankWeakTopics
    score.test.ts              unit tests (EMA bounds, distribution math, top-K diversity guard)
    repo.ts                    DB layer: refreshCompetenceForUser, getTop3WeakTopics, buildDynamicClusterForTopic, resetCompetence
    repo.test.ts               integration tests against seeded DB
  /intake
    init-competence.ts         D22 — initFromSelfReport / initFromStandardized / initFromEvaluatorSession
    init-competence.test.ts    unit tests
  /supabase
    server.ts              createServerClient factory (Server Components, Actions, Route Handlers)
    client.ts              createBrowserClient factory (Client Components)
    middleware.ts          updateSession helper used by proxy.ts
/scripts
  seed_ontology.mjs        seeds concepts + concept_parents from abim_blueprint_v1.json (D18)
  seed_concept_weights.ts  D22 — backfills concepts.weight from abim_blueprint_v1.json (subsection-level, 230 rows)
  seed_cards.mjs           Phase 1 step 6: seeds 3 clusters + 20 reviewed cards (HF GDMT, Hyponatremia, DKA/HHS) (applied to kekki-prod 2026-04-27)
  build_v751_public_showcase.py      deterministic v7.5.1 public-network and combined-manifest builder
  validate_v751_public_showcase.py   independent network privacy, label, topology, and manifest validator
  build_v751_parse_comparison.py     deterministic ten-question legacy/v7.5.1 reviewer builder
  validate_v751_parse_comparison.py  independent reviewer cohort, span, identity, and count validator
/supabase
  /migrations
    001_init.sql                 base schema
    002_abim_ontology.sql        ABIM hierarchy + card_ontology_tags
    003_retrieval_metadata.sql   retrieval-metadata layer (D20)
    004_planning_layer.sql       planning layer + card_discriminators (D21)
    005_competence_layer.sql     competence + topic_importance_v + clusters.kind (D22)
/public                        static public tools, social preview, and other browser-served assets
  /reviewer                    preserved MedQA reviewer plus stable side-by-side v7.5.1 comparison
  /networks/{4.9,5.0,5.1,5.4} preserved self-contained historical network releases
  /networks/7.4               preserved v7.4 rollback asset; public route temporarily redirects
  /networks/7.5.1             canonical public-safe v7.5.1 non-LOINC aggregate network
  /releases/v7.4-public.json  preserved v7.4 release manifest
  /releases/v7.5.1-public.json combined v7.5.1 network/reviewer release manifest
  /explorer                    legacy fellowship exhibit
/archive                       superseded files retained for traceability
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
- `/app/(marketing)` route group (Phase 8 — public landing + waitlist).

---

### v7.5.1 public clinical-analysis boundary

`clinical_network_v751_nonloinc_public_r1` is generated from the immutable corpus `outputs/im_boards_clinical_corpus_v751_nonloinc.sqlite` (SHA-256 `d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec`) and network `outputs/im_boards_clinical_network_v751_nonloinc.sqlite` (SHA-256 `37bad394d95299c920dd2c255220afbc64a23ab5da5c43fdecb8e10e7132dee9`). The private full-network export SHA-256 is `78178e470dba672a8bfbeefe96ef3736a99478376be15090f99a9d13cc2ec295`. The read-only v7.4 metadata database, SHA-256 `7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0`, supplies specialty/source metadata only; it is not a clinical fact source.

The sealed graph contains 17,166 active questions, 16,347 questions with facts, 6,117 concepts, 139,223 deduplicated question-concept incidences, and 340,960 support-one associations. The public payload retains 1,892 concepts and 14,676 associations at support eight or greater; its default support-16 view contains 892 concepts and 4,959 associations.

The v7.4 public graph's ambiguous-label failure is explicitly corrected. Public node identity remains `(external_namespace, external_code)`, while `preferred_label` supplies the human-readable base label. A namespace qualifier is added only when canonical labels collide. This yields 1,892 unique display labels, including 532 qualified nodes across 265 duplicate-label groups, with zero opaque placeholders. Label rank is deterministic: descending question support, descending PageRank, display label, then concept identity. Neither `LOCAL_ATOMIC_V60` nor a synthetic `Local atomic concept` placeholder is exposed as display text.

The public network contains aggregate concepts and question-level association counts only. It excludes raw question text, answer keys, named source labels and distributions, source selectors, fact/span evidence, incidence records, question/fact IDs, and provenance drill-downs. It retains analytical filters, evidence-tier categories, specialty aggregates, and anonymized robustness totals (`sourceCount`, maximum share, leave-one-set-out support, and cross-set status), never source names.

`/reviewer/compare` is the narrow raw-text exception. It reuses exactly the ten MedQA examples already available at `/reviewer` and preserves their 616 legacy mentions. The v7.5.1 panel is derived from `analysis_network_facts_v751`: 614 accepted facts are collapsed by visible location, span, and terminology identity to 511 annotations and 269 question-concept incidences. All ten questions have accepted facts. Candidate spans remain excluded: 282 are pending LOINC and 73 remain unresolved non-LOINC candidates. Only provenance-category counts are attached to annotations; raw fact and source-record IDs are not published.

The network/manifest builder is `scripts/build_v751_public_showcase.py`, with independent validator `scripts/validate_v751_public_showcase.py` (85 checks). The reviewer builder is `scripts/build_v751_parse_comparison.py`, with independent validator `scripts/validate_v751_parse_comparison.py` (16,111 checks). Asset identity is pinned as follows:

- Network HTML: SHA-256 `a6d27f7822dd9fa664b700eccf7efc2e1bd0fbccfae3321ac8806ed08ef5cb81` (6,081,981 bytes).
- Comparison HTML: SHA-256 `20e8b1ccea61c509ddcf6571bfeaca8e705134e70ff7055ecec2cf86740097f8` (814,822 bytes).
- Combined release manifest: SHA-256 `cee882382a54db0ceae78e20884dab4e7708e6ce6e9a7fd00d9383f4f06b9ed7` (3,634 bytes).
- Preserved legacy reviewer: SHA-256 `e5f3b2a55e5cdb9da54e5c8977231c05aa3c4928d896a15e3900ea3521318d77`.
- Preserved v7.4 network rollback asset: SHA-256 `253ebf642fe63db59c81bf919fe28c26af2d8a1a45cb34dd583cf63c94b35987`.

`/network/7.5.1` is canonical. `/network/7.4` is a temporary non-permanent redirect to it; the old static asset is retained in Git rather than overwritten. `/reviewer/compare` remains the stable reviewer route, and `/reviewer` plus `/network/4.9`, `/network/5.0`, `/network/5.1`, and `/network/5.4` remain preserved historical interfaces.

Application verification passes: `pnpm typecheck`; all 115 `pnpm test` tests; and `pnpm lint` with only the two pre-existing unused-symbol warnings in `CardRow.tsx` and `lib/cards/import-schema.ts`. Rendered browser verification passes 31 desktop/mobile assertions with no application page errors or non-analytics console errors. The renderer collision-culls overview labels, promotes search matches ahead of rank-based labels, prevents mobile toolbar overflow, and opens the mobile detail sheet only after selection. Release content commit `ab876812461c5bb6955870e89fc536e15be40fac` was previewed in Vercel deployment `4XGKzf7goZdritvBsyFebXZxt8qs` (GitHub deployment `5556641284`) and promoted in production deployment `HVu1s7oDP6S3xf9W7TERUcsgm2vi` (GitHub deployment `5556725693`). The live routes and downloaded network/reviewer/manifest bytes were verified against the locally sealed artifacts on July 22, 2026.

This release is a non-LOINC preview, not the final all-lane corpus. Laboratory/LOINC normalization is deferred until **July 26, 2026 at 5:07 PM America/New_York**. The later lab-complete release must substitute the newly sealed parent artifacts and rerun both deterministic builders and independent validators rather than modify this preview in place.

---

## 8. External Services

| Service | Identifier / location | What it holds | Notes |
|---|---|---|---|
| Supabase project | `kekki-prod` (ref `jquturibslqzkldngzvf`) | DB, auth, storage | Linked per worktree via `supabase link`. Project URL + anon key in `.env.local`. |
| Vercel project | (linked to GitHub repo) | Hosting; main = production; Web Analytics | Auto-deploys GitHub `main` and creates branch previews. Anonymous Web Analytics is loaded only on `/`, `/reviewer`, `/reviewer/compare`, `/network/4.9`, `/network/5.0`, `/network/5.1`, `/network/5.4`, canonical `/network/7.5.1`, the temporary `/network/7.4` redirect destination, and the legacy `/explore` exhibit; private application routes are excluded. The v7.5.1 preview/deployment IDs are pending promotion. |
| Cloudflare Registrar | kekkimed.com | Domain registration | DNS pointed at Vercel. |
| GitHub | `zachspahr-ops/kekkimed` (private) | Source of truth | Vercel is connected here. |

**Env vars** (kept in `.env.local` at parent project dir, not the worktree):

| Var | Required by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 1 step 3+ | Exposed to browser |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 1 step 3+ | Exposed to browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Seed script + system writes | Server-only — never exposed to browser |

Worktrees: `.env.local` is at `C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local`, not in the worktree. Use `--env-file="C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local"` for Node scripts.

---

## 9. Definition of Done (architecture-level)

For any change that touches this file's territory:

1. `pnpm typecheck` passes.
2. `pnpm build` passes.
3. The change works end-to-end on a real flow you can describe in one sentence.
4. **This file is updated in the same PR.** No exceptions for schema, routes, RLS, or LLM wiring.
5. SESSION_LOG.md gets an entry that names the section of ARCHITECTURE.md you touched.
