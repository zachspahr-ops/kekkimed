# Kekki — Session Log

*Append-only. One entry per meaningful session. Newest at the top.*

Each entry follows this shape:

```
## YYYY-MM-DD — short title

**Phase + step:** which phase, which step, or pre-step doc work.
**What changed:** files touched and why.
**Blocked / deferred:** anything that didn't get done and why.
**Open questions for next session:** specific decisions or checks to surface in the next /plan.
```

---

## 2026-04-26 / 2026-04-27 — Migration 003 authored, D20 amendment, applied to kekki-prod

**Phase + step:** Phase 1 step 1b — `003_retrieval_metadata.sql` written 2026-04-26, applied to kekki-prod 2026-04-27 via Supabase MCP `apply_migration`. Step 1c (`004_planning_layer.sql`) deferred (planning enums TBD).

**What changed:**
- `supabase/migrations/003_retrieval_metadata.sql` (new) — adds `cards.primary_lattice` (NOT NULL, 4-value enum) and `cards.secondary_lattices` (subset CHECK over 7 values, default `'{}'`); widens `cards.card_format` 4 → 9 (drops the `'basic'` default since it is no longer in the enum and every authoring path supplies a format explicitly); creates `card_retrieval_metadata` (1:1 with cards) per `flashcard_database_design.md` §5 with `cognitive_task`, `prompt_frame`, `answer_form`, `retrieval_direction`, `discriminator`, `confusable_with`, `requires_cloze_one_by_one`, `cloze_grouping`, `format_confidence`, `format_review_status`, `format_review_note`. Planner indexes (`cognitive_task` btree, `secondary_lattices` GIN). RLS mirrors `card_ontology_tags`: SELECT derives from cards visibility, write restricted to author.
- `DECISIONS.md` D20 — appended **Format review status** block locking `card_retrieval_metadata.format_review_status text NOT NULL DEFAULT 'likely_ok' CHECK in ('likely_ok','revise_format','manual_review','approved')`. Vocabulary aligned with the external pipeline's emitted values per `flashcard_database_design.md` §5. Distinct from `card_ontology_tags.review_status` (D19) — that one covers tag acceptance, this one covers format-choice quality. Two columns because the failure modes differ.
- `PHASES.md` step 1b — corrected the `card_retrieval_metadata` field list (added `retrieval_direction`, `confusable_with`, `format_confidence`, `format_review_note` to match the canonical reference shape; original list was incomplete). Marked step 1b authored, not yet pushed.
- `PHASES.md` step 1c — marked deferred. Reason: the planning-field enums (`yield_tier`, `danger_level`, `board_likelihood`, `source_strength`, `review_priority`) are not defined anywhere — not DECISIONS.md, not this file, not `flashcard_database_design.md` (which uses *numeric* `weakness_score` / `priority_score` on `learner_card_state`, not categorical tiers on `cards`), not `Flash Card Generation PRACTICE_PATTERNS.md`. Will revisit and lock in a new DECISIONS entry before Phase 4 needs them.
- `PHASES.md` Phase 1 DoD — narrowed: requires migration 003 applied + `card_retrieval_metadata` table; the 004/`card_discriminators` requirement was peeled off into a follow-up since 1c is deferred.
- `ARCHITECTURE.md` §3 migration cadence — flipped 003 row to "Authored 2026-04-26 — pending push" with the corrected field list; flipped 004 row to "Deferred 2026-04-26 — enum values TBD." Did **not** bump the table count (14 → 15) or add `card_retrieval_metadata` to the live tables list yet — that lands in the same commit that records "Applied" once `supabase db push` succeeds, so the doc stays honest about what kekki-prod actually contains.

**Verification:**
- `pnpm install` ✅ in this fresh worktree.
- `pnpm typecheck` ✅ — no app code changed.
- `pnpm build` ✅.
- Migration applied via Supabase MCP `apply_migration(project_id="jquturibslqzkldngzvf", name="retrieval_metadata", query=<003 SQL>)`. Result: `{"success":true}`. New version row in `supabase_migrations.schema_migrations`: `20260427040324_retrieval_metadata`. (We chose the MCP path over `supabase db push` because the worktree wasn't `supabase link`'d and the MCP avoids the password-prompt + terminal-hop ceremony entirely. This is the new default for migration work inside Claude Code sessions.)
- `list_tables` confirms `card_retrieval_metadata` exists with all 13 expected columns (correct types and nullability). `cards` gained `primary_lattice` (NOT NULL, 4-value CHECK) and `secondary_lattices text[]` (subset CHECK over 7 values, default `'{}'`); `cards.card_format` widened to 9 values, default dropped.
- `get_advisors(type="security")` returned 6 lints — **all pre-existing from migration 001, none introduced by 003.** Pre-existing: `waitlist` RLS-no-policy (INFO, by design — service-role-only); `cards_enforce_24h_cooldown` function search_path mutable (WARN); `handle_auth_user_email_update` and `handle_new_auth_user` SECURITY DEFINER functions callable by anon + authenticated (4 WARNs across the two functions). Worth a small follow-up cleanup migration; not a blocker for this PR.

**Blocked / deferred:**
- Migration 004 (planning + `card_discriminators`) — deferred until enum values for the planning fields are agreed (next DECISIONS entry, likely D21).
- Pre-existing security advisors from 001 — flagged here for traceability; address in a small follow-up migration.

**Open questions for next session:**
- Decide the planning-layer enums for 004. Sensible starting points: `high/medium/low` for `yield_tier` / `danger_level` / `board_likelihood`; integer 1–5 for `source_strength` (matches `sources.source_quality` shape in the reference doc); `numeric` for `review_priority` (matches the `priority_score` formula in `flashcard_database_design.md`). Lock in a new D21 before authoring the migration.
- Address the 5 pre-existing security advisor WARNs in a small follow-up migration (`SET search_path = ''` on the trigger functions; `REVOKE EXECUTE ... FROM anon, authenticated` on the SECURITY DEFINER auth functions).
- Then proceed to Phase 1 step 3 (Supabase magic-link auth).

---

## 2026-04-26 (evening) — Branch consolidation + repo hygiene + ARCHITECTURE.md

**Phase + step:** Phase 1 — between step 2 (done) and step 3 (auth, next). No new product code.

**What changed:**
- Merged `claude/nostalgic-wiles-154037` into `claude/sleepy-aryabhata-10d47b` so this branch reflects the state already applied to kekki-prod (migration 002, ABIM blueprint seed, DECISIONS D18+D19, archived `kekki_ontology_v0.json`). The `.claude/settings.local.json` conflict was a permission-allowlist union; resolved by keeping all useful entries and dropping session-specific failures (`gh`, `pandoc` — neither tool is installed).
- Repo hygiene:
  - Deleted `ontology.json` (byte-identical duplicate of `abim_blueprint_v1.json` — confirmed via md5).
  - Deleted `adaptive_im_study_platform_summary.docx` (every actionable principle is already in CLAUDE.md / DECISIONS.md / PHASES.md / PROJECT_SUMMARY.md; the docx's $50K MVP budget numbers actively conflicted with D10's $1,100 cap).
  - Moved `kekki_concepts_v1.json` → `archive/` (superseded by ABIM blueprint).
  - Moved `scripts/transform_v0_to_v1.mjs` → `archive/` (one-shot script for the dead v0→v1 path).
- Doc refresh — replaced stale `kekki_ontology_v0.json` / `kekki_concepts_v1.json` references with `abim_blueprint_v1.json`:
  - `CLAUDE.md` — `/plan` checklist, "Controlled vocabulary" section, file-layout block, seed instructions.
  - `PHASES.md` Phase 1 step 2.
  - `PRACTICE_PATTERNS.md` `/plan` checklist.
  - `KEKKI_ORIENTATION.md` Phase 1 feature-map (323 nodes → 970, 12 tables → 14).
  - `PROJECT_SUMMARY.md` — phase status table refreshed to reflect Phase 1 in progress; key references list updated.
  - `phase1_schema_plan.md` — added a header noting it's now historical (steps 1+2 implemented per migrations 001+002 and DECISIONS D17/D18/D19); body left intact for traceability.
- Created `ARCHITECTURE.md` — durable, routinely-updated reference. Sections: system overview (with ASCII diagram), stack versions, live data model (the 14 tables), routes (live + planned), LLM call sites, auth + RLS, file layout, external services, DoD. Includes an explicit "update which section when you do X" table so this doc doesn't go stale. CLAUDE.md `/plan` checklist now lists ARCHITECTURE.md as the second file to read after CLAUDE.md.
- DECISIONS.md left untouched. D5 / D13 / D17 still reference `kekki_ontology_v0.json` / `kekki_concepts_v1.json` historically; D18 supersedes them in spirit. Editing locked decisions to chase wording would muddy the historical record — readers find D18 immediately after D17.
- 001_init.sql comment on line 39 still says "Seeded from kekki_concepts_v1.json" — not modified, since the migration has already been applied to prod and we don't rewrite applied migrations. The current truth is encoded in 002's column comments.

**Blocked / deferred:**
- Nothing blocked.

**Open questions for next session:**
- Phase 1 step 3 (Supabase magic-link auth) is unblocked. The file-layout sketch in ARCHITECTURE.md §7 anticipates `/lib/supabase/` (browser + server clients) and the `/app/(marketing)` + `/app/(app)` route groups; both need to land in step 3.
- Once step 3 is in, ARCHITECTURE.md §6 should be expanded with the actual middleware behavior and the cookie/server-client wiring details.

---

## 2026-04-26 (recovered from parent-dir drafts) — ABIM ontology adoption + D20 metadata enum lock

**Phase + step:** Phase 1, steps 1a + 2 (ontology overhaul, pre-auth). Strategy chat in Cowork, draft work in parent dir.

This entry was drafted in the parent project dir during the strategy session that produced D18 + the metadata enum lock (then numbered D19; renumbered to D20 during the evening consolidation pass — see entry above). Recovered from the `claude/parent-dir-draft-recovery` branch.

**What changed:**
- **Direction shift.** Earlier plan to author `kekki_concepts_v1.json` from scratch is retired. ABIM IM CERT blueprint becomes the canonical Layer 1 ontology. Driven by three uploaded reference docs from Zach: `flashcard_database_design.md`, `Flash Card Generation PRACTICE_PATTERNS.md`, `abim_ontology_improvement_plan.md` (the third was referenced in drafts but never landed in the repo; first two are now committed).
- **`abim_blueprint_v1.json`** placed in repo root. ABIM IM CERT, January 2026 edition. 18 systems, ~230 subsections, ~1,500 topics in source data; seeded as 970 concepts in DB.
- **`supabase/migrations/002_abim_ontology.sql`** written and applied to kekki-prod.
- **DECISIONS.md** D18 (ABIM blueprint canonical) and D19 (`card_ontology_tags` table) locked. The forward-looking metadata enum lock — originally drafted as a second "D19" — was reconciled into **D20** during the evening consolidation pass.
- Migration cadence locked: 002 (ontology, applied) → 003 (retrieval metadata per D20) → 004 (planning + discriminators per D20). One migration per Claude Code session.

**User decisions made this session (locked):**
- D18: ABIM blueprint = canonical Layer 1. Three depth levels (system / subsection / topic). Dot-delimited snake_case IDs. Strict tree (one parent per child). Cross-system tagging via `card_ontology_tags.tag_role = 'bridge'`, not concept polyhierarchy.
- D20: full metadata enum lock — primary_lattice (4-value CHECK), secondary_lattices (subset CHECK on 7 values), cognitive_task (11-value CHECK), card_format (9-value CHECK), tag_role (4-value CHECK), granularity (3-value CHECK), Cloze One By One first-class.
- "Miscellaneous" system in the ABIM blueprint kept as-is (real category, not a parsing artifact per Zach).
- exam_percent → numeric: `"14%"` → `0.14`, `"<2%"` → `0.01`, topics → NULL.
- `cards.concept_ids[]` dropped in 002 outright (no production data to migrate).
- Discriminator graph (`card_discriminators`) deferred to migration 004; export notes table deferred until multi-variant Anki content actually exists.

**Blocked / deferred:**
- Migrations 003 and 004 not yet drafted.
- `card_export_notes` table (Anki variants) deferred until needed.
- `learner_card_state` materialized view deferred to Phase 5.
- `abim_ontology_improvement_plan.md` referenced in drafts but never written; references trimmed during consolidation.

---

## 2026-04-26 — Doc pass: AI card generation guardrails + base project docs

**Phase + step:** Phase 0, pre-step 1. No code yet — pure documentation pass before scaffolding.

**What changed:**
- `CLAUDE.md` — updated to reflect three LLM call sites (was two); added third site (private AI card generation) with reference to D13. Added new sections: "Card labeling (universal)", "Intake parser — two-layer stem rejection", "Cluster is the unit of review", "Beta and pricing". Strengthened "Content rules" with `cards.citation NOT NULL` and `source` column requirement. Updated "What Kekki is" to reflect that some card generation lives in-repo under guardrails. Updated "Things to ask Zach before changing" to include AI guardrails and pre-Phase-8 billing prohibition. Added new files to "File layout".
- `DECISIONS.md` — amended D6 from "Two LLM call sites" to "Three LLM call sites" with the third site enumerated. Tightened D7 to mandate `cards.citation NOT NULL` at the DB layer. Retired D12 in place (kept stub for stable references; substance folded into D13). Added D13 (private AI card generation guardrails: private-only, ontology-constrained, citation required, gap-anchored, attach-to-cluster, 10/user/local-day, draft → 24h cool → human-reviewed, bulk stays external). Added D14 (two-layer parser stem rejection: heuristic precheck + LLM constraint). Added D15 (universal disclaimer + AI-unreviewed badge until cooled). Added D16 (closed beta = free; pricing TBD with study-unit framing externally and token metering internally; no billing infra pre-Phase-8 + 4 weeks).
- `PROJECT_SUMMARY.md` — created. One-line pitch, target user, core loop, stack snapshot, phase status table, budget, out-of-scope list, key references.
- `PRACTICE_PATTERNS.md` — created. Session-start convention, diff discipline, local verification, boring-tech bias, ask-before-acting scope, tool division (Claude Code / Cursor / Cowork), debugging stance, composability, doc update cadence.
- `SESSION_LOG.md` — created. This file. First entry is this one.
- `KEKKI_ORIENTATION.md` — small follow-up edit. Two paragraphs were stale after the call-site change: the Phase 4 explainer ("only two LLM calls total") and the Phase 6 explainer ("separate card-generation pipeline outside this repo"). Both updated to reflect three call sites and the bulk-vs-private distinction. Source of truth still lives in CLAUDE.md and DECISIONS.md; orientation doc just mirrors them in plain English for Zach.

**User decisions made this session (locked in DECISIONS.md):**
- D12 retire-and-fold over keep-as-stub-with-content (chose cleaner read).
- AI card rate limit scoped to user's **local calendar day**, not rolling 24h or UTC.
- Citation enforcement is **hard** — DB-level `NOT NULL` on `cards.citation`, applied to all sources (D7).
- `PRACTICE_PATTERNS.md` is **separate** from `CLAUDE.md`, not folded in. CLAUDE.md = invariants for Claude Code; PRACTICE_PATTERNS = workflow norms shared between Zach and the agent.

**Blocked / deferred:**
- Nothing blocked. All proposed doc edits landed.

**Open questions for next session:**
- Phase 0 step 1 starts with registering kekkimed.com at Cloudflare Registrar (kekki.com was taken). Confirm Zach has a Cloudflare account before the next session, or surface that as the first action.
- Phase 0 step 2 is creating the GitHub repo and pushing this folder. The folder is currently not git-initialized (per the system context). First in-session git action will be `git init` + initial commit.
- Schema work (Phase 1 step 1) needs to encode the new fields introduced this session: `cards.source` enum (`human` | `external_pipeline` | `ai_private`), `cards.citation NOT NULL`, a usage-metering table for D16's token accounting, and a `users.timezone` column for D13's local-day rate limit. Surface these as part of the Phase 1 plan, not as ad-hoc additions.
- The intake parser's heuristic precheck (D14 layer 1) needs a small library of qbank-stem regexes. Draft these in `/prompts/intake.md` or a sibling file when Phase 3 starts.
