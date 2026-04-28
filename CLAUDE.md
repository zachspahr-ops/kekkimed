@AGENTS.md

# Kekki — Project Instructions for Claude Code

## What Kekki is

Adaptive internal medicine study platform. Physician-authored, citation-backed flashcards organized in clusters. The core loop: user feeds in performance analytics → LLM produces structured gaps → LLM produces a plan (5-15 cluster reviews, 7-14 day window) → user studies cards in clusters → review logs plus new uploads feed the next plan.

Bulk card authoring happens outside this repo, in a separate LLM pipeline that posts to the import endpoint. A scoped, in-repo private AI card generator also exists, gap-anchored and rate-limited — see DECISIONS.md D13. Cards from either path land in `draft` status and must be promoted by a human after a cooling period.

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
- Anthropic Claude Haiku 4.5 via `@anthropic-ai/sdk` — the only LLM
- Vercel for deployment, main branch auto-deploys
- pnpm as package manager

Scheduler is cluster-level crude intervals in Postgres. Not FSRS. Not SM-2.

## LLM call sites (exactly three)

1. **Intake parser** — user submits free text or uploads analytics → LLM returns structured JSON mapping gaps to ontology IDs. See DECISIONS.md D6, D14.
2. **Plan generator** — structured gaps + ontology + user's cluster library → ordered plan (5-15 items). See DECISIONS.md D6.
3. **Private AI card generator** — gap-anchored, ontology-constrained, citation-required card generation. Rate-limited 10 cards/user/local-day. Output is private to requesting user, lands in `draft`, must attach to an existing or newly-created cluster. Cards never auto-promote — requires human review. See DECISIONS.md D13.

Not allowed anywhere else: LLM in the card review loop, LLM scoring of free-text answers, LLM as a substitute for human card review, bulk card generation inside this repo (that lives in the external pipeline that calls `POST /api/cards/import`).

## Controlled vocabulary (concepts)

The controlled vocabulary is the four-layer tagging framework defined in `Medical_Knowledge_Ontology.md` and locked in DECISIONS.md D17. Layer 1 (concepts) is curated data Zach authors; layers 2–4 (context, qtype, difficulty) are fixed enums on the `cards` table.

Canonical concepts live in `abim_blueprint_v1.json` — 970 concepts (18 systems, 230 subsections, 722 topics). Polyhierarchy modeled via the `concept_parents` table.

Every LLM prompt that extracts concept tags MUST:
- Return a concept `id` (string) from the `concepts` table.
- Return `null` when no confident match exists.

**Never let the LLM invent a concept slug. Fragmentation kills the planner.**

## Content rules (legal + editorial)

- Every card traces to a lawful source (primary literature, society guidelines, UpToDate, etc.).
- `cards.citation` is `NOT NULL` — a card without a citation cannot be saved (D7, D13).
- No ingested proprietary question stems, answer choices, or explanations from third-party qbanks.
- No screenshots or images from commercial products.
- Cards: `status ∈ {draft, reviewed, retired}`. Draft must sit ≥24h before promotion. Retired cards are flagged, not deleted.
- Cards: `source ∈ {human, external_pipeline, ai_private}`. AI-generated cards never auto-promote.

## Card labeling (universal)

- Every card displays **"Educational study aid. Not clinical guidance."** in the review UI.
- Cards with `source = 'ai_private'` additionally display **"AI-generated, unreviewed"** until `status = 'reviewed'`. Badge is rendered from data — not optional in the component. See D15.

## Intake parser — two-layer stem rejection

Both layers required (D14):

1. **Heuristic precheck.** Regex checks for qbank signatures (`A) ... B) ... C) ... D)`, "The correct answer is", "Educational Objective:", etc.) before calling the LLM. Match → friendly rejection, no tokens spent.
2. **LLM constraint.** Intake prompt instructs model to return `{"rejected": true, "reason": "..."}` for proprietary content. Server treats `rejected: true` as a non-error rejection.

## Cluster is the unit of review

Scheduling, plans, and review sessions operate at the cluster level (D4). Cards are not scheduled individually. AI-generated cards (call site #3) must attach to an existing user-owned cluster or a new one created in the same flow. No orphan cards.

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

DECISIONS.md entries, new dependencies, new LLM call sites (current count: three — D6), new DB tables not in PHASES.md, clinical content rules, AI card guardrails (D13), locked card metadata enums (D20), locked planning enums (D21), anything costing money on a recurring basis, billing/pricing logic before Phase 8 + 4 weeks, scaffolding/installer commands that may overwrite project docs.

## File layout and local setup

- **File layout:** see ARCHITECTURE.md §7 (live directory tree).
- **Local setup, commands, env vars, Supabase CLI:** see [SETUP.md](SETUP.md).
