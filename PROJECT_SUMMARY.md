# Kekki — Project Summary

*Living one-pager. Update at every phase boundary.*

---

## One-line pitch

Adaptive internal medicine study platform: residents feed in their analytics, the app produces a structured plan of cluster-level reviews, and the loop tightens with every cycle.

## Target user

Internal medicine residents preparing for in-training exams, ABIM, and subspecialty boards. First beta cohort: Zach's PGY-2 co-residents at his program. Distribution: closed beta gated by invite codes behind a public landing page (D1).

## Core loop

```
analytics in (free text or upload)
   → intake parser (LLM #1) → structured gaps mapped to ontology IDs
      → plan generator (LLM #2) → ordered list of 5–15 cluster reviews
         → user studies clusters in the review UI (binary self-rate, no LLM)
            → review logs + new analytics → next cycle
```

A scoped third LLM path — private AI card generation (D6, D13) — sits alongside the loop, not inside it. It lets the user spawn one or two cards on the spot when they hit a gap, with strict guardrails (rate limit, ontology constraint, citation required, draft cooling, attach-to-cluster).

## Stack snapshot

- **Frontend / API:** Next.js 14+ App Router, TypeScript strict mode, Tailwind CSS, shadcn/ui
- **Database / auth / storage:** Supabase (Postgres, magic-link auth, file storage), RLS on all user-data tables
- **LLM:** Anthropic Claude Haiku 4.5 via `@anthropic-ai/sdk`, accessed at exactly three call sites (D6)
- **Hosting:** Vercel, main branch auto-deploys, custom domain kekkimed.com (Cloudflare Registrar)
- **Package manager:** pnpm

Locked in DECISIONS.md D2. Do not propose stack changes without surfacing the conflict in `/plan`.

## Phase status

Current: **Phase 0 — Foundation, pre-step 1 (documentation pass).**

| Phase | Title | Status |
|---|---|---|
| 0 | Foundation (deploy pipeline) | In progress |
| 1 | Schema + Auth | Not started |
| 2 | Review loop | Not started |
| 3 | Intake + structuring | Not started |
| 4 | Plan generator | Not started |
| 5 | Plan execution | Not started |
| 6 | Import + cluster editor | Not started |
| 7 | Loop closure | Not started |
| 8 | Public face + beta gate | Not started |
| 9 | Content loop (ongoing) | Not started |

See [PHASES.md](PHASES.md) for the full step list and Definition of Done per phase.

## Budget + constraints

- **Year-one cap:** ~$1,100 all in (D10).
- **Time:** nights and weekends. ~10–12 weekends end-to-end through Phase 8.
- **Headcount:** Zach. No contractors, designers, lawyers, physician reviewers, or paid ads pre-traction.
- **Beta pricing:** free (D16). Post-beta pricing TBD; framing will be "study units" externally with token metering internally. No billing logic before Phase 8 + 4 weeks of real use.

## Out of scope

- Native mobile app (web-responsive only).
- FSRS or SM-2 per-card scheduling (D4 — cluster-level intervals only).
- LLM in the review loop, free-text answer scoring, or LLM-as-substitute-for-human-review (D3, D6).
- Bulk card authoring inside this repo (lives in the external pipeline that posts to `POST /api/cards/import`; D6, D13).
- Ingestion of any proprietary third-party qbank content — stems, choices, rationales, screenshots (D7, D14).
- Knowledge-map visualization layer until Phase 8 has run ≥4 weeks and there is signal users want it (PHASES.md Phase 9 note).
- Any billing, paywalls, or paid plans pre-traction (D16).

## Key references

- [CLAUDE.md](CLAUDE.md) — operating instructions for Claude Code
- [PHASES.md](PHASES.md) — phased build plan with DoD per phase
- [DECISIONS.md](DECISIONS.md) — locked architectural decisions (D1–D16)
- [PRACTICE_PATTERNS.md](PRACTICE_PATTERNS.md) — recurring workflow conventions
- [SESSION_LOG.md](SESSION_LOG.md) — append-only session-by-session record
- [kekki_ontology_v0.json](kekki_ontology_v0.json) — controlled vocabulary, 323 nodes
