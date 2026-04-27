@AGENTS.md

# Kekki — Project Instructions for Claude Code

## What Kekki is

Adaptive internal medicine study platform. Physician-authored, citation-backed flashcards organized in clusters. The core loop: user feeds in performance analytics → LLM produces structured gaps → LLM produces a plan (5-15 cluster reviews, 7-14 day window) → user studies cards in clusters → review logs plus new uploads feed the next plan.

Bulk card authoring happens outside this repo, in a separate LLM pipeline that posts to the import endpoint. A scoped, in-repo private AI card generator also exists, gap-anchored and rate-limited — see DECISIONS.md D13. Cards from either path land in `draft` status and must be promoted by a human after a cooling period.

Target user: internal medicine residents. Distribution: closed beta with public landing page.

## Who you are working with

Zach, PGY-2 IM resident applying to cardiology fellowship. New to coding. Build time is nights and weekends. Year-one budget cap ~$1,100.

Assume you must:
- Explain every architectural choice in plain English the first time it appears.
- Test every deployable slice end-to-end before layering more.
- Never push code that has not been run locally.
- Prefer boring, well-documented choices over novel ones.
- Keep diffs small. Big diffs hide mistakes from a first-time reviewer.

## Session convention — `/plan` first

Zach opens every session with `/plan`. In plan mode you must:

1. Read CLAUDE.md, ARCHITECTURE.md, PHASES.md, DECISIONS.md, `Medical_Knowledge_Ontology.md`, and `abim_blueprint_v1.json` (when present).
2. State which phase and which step of PHASES.md you are working on.
3. Check DECISIONS.md for any conflict with your proposed approach. If there is a conflict, surface it and wait for Zach before acting.
4. Propose: files to touch, changes to make, how to verify.
5. Wait for approval before editing.

Never bypass plan mode unless explicitly told to.

## Stack (locked — see DECISIONS.md before proposing changes)

- Next.js 14+ App Router, TypeScript strict mode
- Supabase (Postgres, Auth, Storage) — magic-link auth
- Tailwind CSS + shadcn/ui
- Anthropic Claude Haiku 4.5 via `@anthropic-ai/sdk` — the only LLM
- Vercel for deployment, main branch auto-deploys
- pnpm as package manager
- Repo: this folder, git-initialized

Scheduler is cluster-level crude intervals in Postgres. Not FSRS. Not SM-2.

## LLM call sites (exactly three)

1. **Intake parser** — user submits free text or uploads analytics → LLM returns structured JSON mapping gaps to ontology IDs. See DECISIONS.md D6, D14.
2. **Plan generator** — structured gaps + ontology + user's cluster library → ordered plan (5-15 items). See DECISIONS.md D6.
3. **Private AI card generator** — gap-anchored, ontology-constrained, citation-required card generation. Output is private to the requesting user, lands in `draft` status, must attach to an existing or newly-created cluster, and is rate-limited at 10 cards/user/local-day. Cards from this path are never auto-publishable; they follow the same draft → 24h cool → human review → `reviewed` pipeline as all other cards. See DECISIONS.md D13.

Not allowed anywhere else: LLM in the card review loop, LLM scoring of free-text answers, LLM as a substitute for human card review, bulk card generation inside this repo (that lives in the external pipeline that calls `POST /api/cards/import`).

## Controlled vocabulary (concepts)

The controlled vocabulary is the four-layer tagging framework defined in `Medical_Knowledge_Ontology.md` and locked in DECISIONS.md D17. Layer 1 (concepts) is curated data Zach authors; layers 2–4 (context, qtype, difficulty) are fixed enums on the `cards` table.

The canonical concepts data lives at `abim_blueprint_v1.json` in repo root (ABIM Internal Medicine Certification blueprint, January 2026 — see D18). 970 concepts across three levels: 18 systems, 230 subsections, 722 topics. Concepts are polyhierarchical: a single concept can have multiple parents (e.g., amyloidosis under both Cardiology and Nephrology), modeled via the `concept_parents` table. The current ABIM seed produces single-parent edges only; cross-system bridges are added later via card-level `card_ontology_tags` with `tag_role='bridge'` (D19).

Every LLM prompt that extracts concept tags MUST:
- Be constrained to return a concept `id` (string) from the `concepts` table.
- Return `null` when no confident match exists.

Never let the LLM invent a concept slug. Fragmentation kills the planner.

The `concepts` table is seeded by `scripts/seed_ontology.mjs` from `abim_blueprint_v1.json`. Columns: `id`, `title`, `synonyms[]`, `weight`, `level`, `ontology_source`, `ontology_version`. Hierarchy lives in a separate `concept_parents (child_id, parent_id, is_primary)` table. ID format is dot-delimited: `<system>.<subsection>.<topic>`. See D18 for the full ID scheme; ARCHITECTURE.md for the live schema.

Migration 003 (planned per Phase 1 step 1b) adds the retrieval-metadata layer: `cards.primary_lattice`, `cards.secondary_lattices[]`, an expanded 9-value `cards.card_format`, and a 1:1 `card_retrieval_metadata` table with `cognitive_task`, prompt/answer framing, discriminator, and `requires_cloze_one_by_one` / `cloze_grouping`. Migration 004 (Phase 1 step 1c) adds the planning layer (`yield_tier`, `danger_level`, `board_likelihood`, `source_strength`, `review_priority`, `primary_system_id`, `secondary_system_ids[]`, `bridge_reason`) and the `card_discriminators` graph. All enum values are locked by D20.

## Content rules (legal + editorial)

- Every card traces to a lawful source (primary literature, society guidelines, UpToDate, etc.).
- The `cards.citation` column is `NOT NULL` at the DB level — a card without a citation cannot be saved (D7, D13).
- No ingested proprietary question stems, answer choices, or explanations from third-party qbanks.
- No screenshots or images from commercial products.
- Cards have a `status` field: `draft` (private to author), `reviewed` (publishable), `retired`.
- A card must sit in `draft` at least 24 hours before promotion to `reviewed` (forced cooling period — enforced in DB trigger or application logic).
- Retired cards are flagged, not deleted.
- Cards have a `source` column: `human`, `external_pipeline`, or `ai_private`. AI-generated cards never auto-promote — `reviewed` requires a human action regardless of source.

## Card labeling (universal)

- Every card displays the disclaimer **"Educational study aid. Not clinical guidance."** in the review UI, regardless of source or status.
- Cards with `source = 'ai_private'` additionally display **"AI-generated, unreviewed"** until they reach `status = 'reviewed'`. The badge is rendered from the data, not optional in the component. See DECISIONS.md D15.

## Intake parser — two-layer stem rejection

The intake parser must refuse to ingest proprietary qbank stems. Two independent layers, both required (D14):

1. **Layer 1 — heuristic precheck.** Before the LLM is called, the server runs regex/structural checks for qbank-stem signatures: enumerated answer choices (`A) ... B) ... C) ... D)`), explicit "The correct answer is", "Educational Objective:", lettered choice patterns combined with rationale prose, etc. A match short-circuits the request and returns a friendly rejection — no tokens spent, no input stored.
2. **Layer 2 — LLM constraint.** The intake prompt (`/prompts/intake.md`) instructs the model to refuse and return `{"rejected": true, "reason": "..."}` if the input still appears to be proprietary qbank content. The server treats `rejected: true` as a non-error rejection and never proceeds to ontology mapping.

Both layers are needed because heuristics miss paraphrased stems and LLMs sometimes power through obvious cases.

## Cluster is the unit of review

- Scheduling, plans, and review sessions all operate at the cluster level (D4). Cards are not scheduled individually.
- AI-generated cards (call site #3) MUST attach to either an existing user-owned cluster or a new cluster the user creates in the same flow. No orphan cards. The generation request itself names the target cluster; the server rejects requests without one.
- Bulk-imported cards from the external pipeline (`POST /api/cards/import`) follow the same rule — the import payload specifies `cluster_id` per card or includes a cluster definition.

## Beta and pricing

- Closed beta is **free**. Access is gated by waitlist + invite codes (D1, D16).
- Post-beta pricing is **TBD**. External framing will use **"study units"** (a user-readable abstraction over the underlying work the app performs); internal accounting is **token metering** at the LLM call sites.
- Do not implement billing, paywalls, or paid plans before Phase 8 has run for ≥4 weeks with real users. No Stripe wiring, no `subscriptions` table, no entitlement checks ahead of need.

## File layout (target)

```
/app
  /(marketing)   public landing, waitlist
  /(app)         auth-gated app
    /dashboard
    /clusters
    /review
    /plan
    /intake
/components      shadcn/ui + project components
/lib             pure utilities, LLM client, Supabase client
/supabase
  /migrations    *.sql, numbered
/prompts         LLM prompt templates — source of truth
/scripts         one-off: seed, import
abim_blueprint_v1.json                       canonical ontology seed (ABIM IM CERT, Jan 2026; D18)
Medical_Knowledge_Ontology.md                four-layer tagging framework (D17)
flashcard_database_design.md                 reference: existing flashcard DB shape
Flash Card Generation PRACTICE_PATTERNS.md   reference: card-writing norms used by external pipeline
ARCHITECTURE.md                              live data model + LLM wiring; updated each phase
CLAUDE.md
AGENTS.md
PHASES.md
DECISIONS.md
PROJECT_SUMMARY.md
PRACTICE_PATTERNS.md
SESSION_LOG.md
KEKKI_ORIENTATION.md                         plain-English stack tutor for Zach
phase1_schema_plan.md                        historical: schema design notes for migrations 001/002
/archive                                     superseded files retained for traceability
```

## Definition of Done for any change

- `pnpm typecheck` passes
- `pnpm build` passes
- The change works end-to-end on a real user flow you can describe in one sentence
- Has at least one test, or a documented manual-test recipe for UI flows
- Branch pushed, preview deploy green before merging to main

## How to run locally

### Prerequisites

- **Node.js 20+** (developed against 24.15.0). Windows: `winget install OpenJS.NodeJS.LTS`.
- **pnpm 10+**. Install via `npm install -g pnpm` after Node is on PATH. (Corepack-based install is the modern recommendation but tripped Windows permission issues against `C:\Program Files\nodejs\` for this repo, so we landed on the `npm install -g` path.)
- **Windows only:** PowerShell execution policy must allow user scripts: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` (run once).

### First-time setup

```bash
pnpm install
```

### Common commands

```bash
pnpm dev          # Next.js dev server at http://localhost:3000
pnpm build        # Production build
pnpm start        # Serve the production build
pnpm typecheck    # tsc --noEmit (CLAUDE.md DoD)
pnpm lint         # ESLint flat config
```

### Environment variables

Use `.env.local` at repo root (git-ignored). Vercel preview/prod gets these from project settings.

Currently required: *(none — placeholder home page only, no API calls yet)*.

Future additions:
- **Phase 1 step 3 (Supabase auth):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only).
- **Phase 3 (intake parser):** `ANTHROPIC_API_KEY`.

### Supabase

CLI installed via Scoop: `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase`.

One-time setup (per machine):

```powershell
supabase login              # browser-based auth, opens verification page
supabase link --project-ref jquturibslqzkldngzvf   # links repo to kekki-prod
```

Apply migrations:

```bash
supabase db push            # applies any new files in supabase/migrations/
```

### Seeding

Seed the concepts table from `abim_blueprint_v1.json`:

```bash
node --env-file=.env.local scripts/seed_ontology.mjs
```

Idempotent — safe to re-run. Requires `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

### Verification (also the DoD baseline)

After any change, both must pass before push:

```bash
pnpm typecheck
pnpm build
```

## Glossary

- **Cluster** — a named group of cards around a clinical theme (e.g., "Heart Failure GDMT"). The unit of review.
- **Plan** — ordered list of 5-15 clusters to review within a 7-14 day window.
- **Intake** — user-provided analytics or narrative, processed by the LLM into structured gaps.
- **Gap** — structured record of a weak topic. Maps to a concept `id` from the `concepts` table.
- **Review** — a single card rating event. Binary: Again / Good.
- **Source** — origin of a card: `human` (authored by a person), `external_pipeline` (bulk-imported via the import API), `ai_private` (created by call site #3, gap-anchored, private to the requesting user).
- **Study unit** — externally-facing abstraction for billing/pricing conversations post-beta. Never a runtime concept; do not implement until pricing is decided.

## Things to ask Zach before changing

- Anything in DECISIONS.md
- Adding a new dependency
- Adding a new LLM call site (current count: three — see D6)
- Adding a new database table not described in PHASES.md
- Anything that touches clinical content rules
- Anything that touches the AI card generation guardrails (D13) — rate limit, attach-to-cluster, citation requirement, draft cooling
- Anything that touches the locked card metadata enums (D20) — `primary_lattice`, `secondary_lattices`, `cognitive_task`, the 9-value `card_format`, `tag_role`, `granularity`, Cloze One By One. New values are added via forward migration; never silently coerced or repurposed.
- Anything that costs money on a recurring basis
- Anything that introduces billing, payment, or pricing logic before Phase 8 + 4 weeks of real beta use
- Anything that runs scaffolding or installer commands that may overwrite existing project docs (lesson from 2026-04-26: `create-next-app` clobbered CLAUDE.md)
