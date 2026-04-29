@AGENTS.md

# Kekki — Project Instructions for Claude Code

## What Kekki is

Adaptive internal medicine study platform. Physician-authored, citation-backed flashcards organized in clusters. The core loop is **deterministic math on the ABIM blueprint** (D22, supersedes the earlier LLM design):

1. User initializes competence via one of three intake modes — self-report sliders, paste a standardized score, or sit a 18-card evaluator session.
2. Planner ranks topics by `importance × (1 − competence)` (importance = ABIM exam_percent distributed across child topics; competence = EMA over `reviews`).
3. Top-3 weakest topics (with parent-system diversity) become three ephemeral clusters drawn from `card_ontology_tags`.
4. User studies; each review updates `learner_topic_competence`; the next plan reflects the new state.

There is **no LLM in this repo.** Bulk card authoring happens outside this repo in a separate pipeline that posts to the import endpoint (`POST /api/cards/import`); cards land in `draft` status and must be promoted by a human after a 24h cooling period.

Target user: internal medicine residents. Distribution: closed beta with public landing page.

## Who you are working with

Zach — PGY-2 IM resident, new to coding, nights/weekends only. Year-one budget cap ~$1,100.

- Explain every architectural choice in plain English the first time it appears.
- Keep diffs small. Prefer boring, well-documented choices.
- Never push code that has not been run locally.

## Session convention — `/plan` first

Zach opens every session with `/plan`. In plan mode you must:

1. Read CLAUDE.md, ARCHITECTURE.md, PHASES.md, DECISIONS.md, and `Medical_Knowledge_Ontology.md`.
2. State which phase and which step of PHASES.md you are working on.
3. Check DECISIONS.md for any conflict with your proposed approach. If there is a conflict, surface it and wait for Zach before acting.
4. Propose: files to touch, changes to make, how to verify.
5. Wait for approval before editing.

Never bypass plan mode unless explicitly told to.

## Stack (locked — see DECISIONS.md before proposing changes)

- Next.js 14+ App Router, TypeScript strict mode
- Supabase (Postgres, Auth, Storage) — magic-link auth
- Tailwind CSS + shadcn/ui
- Vercel for deployment, main branch auto-deploys
- pnpm as package manager

**No LLM in this repo (D22).** No `@anthropic-ai/sdk` dependency, no `lib/llm/`, no `prompts/`. Weakness comes from deterministic SQL on `concepts.weight` × `learner_topic_competence`. Adding any LLM call site back requires a new DECISIONS.md entry.

Scheduler is cluster-level crude intervals in Postgres. Not FSRS. Not SM-2.

## Controlled vocabulary (concepts)

The controlled vocabulary is the four-layer tagging framework defined in `Medical_Knowledge_Ontology.md` and locked in DECISIONS.md D17. Layer 1 (concepts) is curated data Zach authors; layers 2–4 (context, qtype, difficulty) are fixed enums on the `cards` table.

Canonical concepts live in `abim_blueprint_v1.json` — 970 concepts (18 systems, 230 subsections, 722 topics). Polyhierarchy modeled via the `concept_parents` table. The deterministic planner reads from `topic_importance_v` (D22 view: subsection `exam_percent` distributed across child topics) joined against `learner_topic_competence` to rank topics by weakness.

## Content rules (legal + editorial)

- Every card traces to a lawful source (primary literature, society guidelines, UpToDate, etc.).
- `cards.citation` is `NOT NULL` — a card without a citation cannot be saved (D7, D13).
- No ingested proprietary question stems, answer choices, or explanations from third-party qbanks.
- No screenshots or images from commercial products.
- Cards: `status ∈ {draft, reviewed, retired}`. Draft must sit ≥24h before promotion. Retired cards are flagged, not deleted.
- Cards: `source ∈ {human, external_pipeline, ai_private}` (the `ai_private` enum value remains in schema but is not produced by this repo post-D22).

## Card labeling (universal)

- Every card displays **"Educational study aid. Not clinical guidance."** in the review UI.
- Cards with `source = 'ai_private'` additionally display **"AI-generated, unreviewed"** until `status = 'reviewed'`. Badge is rendered from data — not optional in the component. See D15. (Pre-D22 cards may carry this source; new cards from this repo do not.)

## Cluster is the unit of review

Scheduling, plans, and review sessions operate at the cluster level (D4). Cards are not scheduled individually. The deterministic planner generates ephemeral clusters (`clusters.kind='ephemeral_topic'`, `source_topic_id` set) at plan time, drawn from cards tagged to the user's weakest topics via `card_ontology_tags`. No orphan cards.

## Beta and pricing

- Closed beta is **free**. Access gated by waitlist + invite codes (D1, D16).
- Post-beta pricing TBD. External framing uses **"study units"**; internal accounting is token metering at LLM call sites.
- Do not implement billing, paywalls, or paid plans before Phase 8 has run ≥4 weeks with real users. No Stripe, no `subscriptions` table, no entitlement checks.

## Definition of Done

- `pnpm typecheck` passes
- `pnpm build` passes
- `pnpm test` passes (when the change touches anything in `/lib` with a corresponding `*.test.ts`)
- The change works end-to-end on a real user flow you can describe in one sentence
- Has at least one test, or a documented manual-test recipe for UI flows
- Branch pushed, preview deploy green before merging to main

## Must ask before changing

DECISIONS.md entries, new dependencies, **adding any LLM call site back** (current count: zero — D22 supersedes D6/D13/D14), new DB tables not in PHASES.md, clinical content rules, locked card metadata enums (D20), locked planning enums (D21), anything costing money on a recurring basis, billing/pricing logic before Phase 8 + 4 weeks, scaffolding/installer commands that may overwrite project docs.

## File layout and local setup

- **File layout:** see ARCHITECTURE.md §7 (live directory tree).
- **Local setup, commands, env vars, Supabase CLI:** see [SETUP.md](SETUP.md).
