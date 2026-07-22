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

## 2026-07-22 — Combined public v7.5.1 network + MedQA reviewer candidate

**Phase + step:** Phase 8 presentation slice — deterministic combined public release candidate `clinical_network_v751_nonloinc_public_r1` with stable reviewer release `kekki_medqa_parse_comparison_v751_r1`. Deployment promotion remains pending.

**What changed:**
- Made `/network/7.5.1` the canonical public network route. `/network/7.4` is now a temporary non-permanent compatibility redirect; the original v7.4 network remains preserved in Git at SHA-256 `253ebf642fe63db59c81bf919fe28c26af2d8a1a45cb34dd583cf63c94b35987` for rollback and audit. Historical `/network/4.9`, `/network/5.0`, `/network/5.1`, `/network/5.4`, and the original `/reviewer` remain preserved.
- Rebuilt the public graph from sealed corpus `clinical_corpus_v751_nonloinc_r1`, SHA-256 `d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec`, and network `clinical_network_v751_nonloinc_r1`, SHA-256 `37bad394d95299c920dd2c255220afbc64a23ab5da5c43fdecb8e10e7132dee9`. The private full-network export SHA-256 is `78178e470dba672a8bfbeefe96ef3736a99478376be15090f99a9d13cc2ec295`. The read-only v7.4 metadata database remains pinned at SHA-256 `7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0` and contributes metadata only, never clinical facts.
- Sealed graph counts are 17,166 active questions, 16,347 questions with facts, 6,117 concepts, 139,223 deduplicated question-concept incidences, and 340,960 support-one associations. The public payload contains 1,892 concepts and 14,676 associations at support eight or greater; the default support-16 view contains 892 concepts and 4,959 associations.
- Corrected the v7.4 ambiguous-label bug. v7.5.1 uses sealed preferred clinical labels and adds a human-readable namespace qualifier only for collisions. All 1,892 display labels are unique; 532 nodes are qualified across 265 duplicate-label groups; zero opaque `Local atomic concept` placeholders remain. Label rank is deterministic by question support, PageRank, display label, and identity. The renderer collision-culls overview labels and gives the searched concept visual and label priority.
- Kept `/reviewer/compare` as the stable route and preserved all 616 legacy mentions over exactly the same ten MedQA questions. The v7.5.1 panel loads 614 accepted `analysis_network_facts_v751` facts, collapses 103 duplicate answer/choice representations to 511 visible annotations, and reports 269 distinct question-concept incidences. All ten questions now have facts, including the former v7.4 zero-fact sample. The 355 excluded candidates comprise 282 LOINC-pending and 73 unresolved non-LOINC spans.
- Preserved the public privacy boundary. The network includes aggregate identities, metrics, filters, specialties, evidence tiers, and anonymized robustness totals; it excludes raw questions, answer keys, named sources, source selectors/distributions, incidences, spans, fact IDs, and provenance drill-downs. Raw text remains limited to the ten previously public MedQA examples in the reviewer. Reviewer annotations expose provenance-category counts but not underlying fact/source-record IDs.
- Added deterministic network/manifest tooling at `scripts/build_v751_public_showcase.py` and `scripts/validate_v751_public_showcase.py`, plus deterministic reviewer tooling at `scripts/build_v751_parse_comparison.py` and `scripts/validate_v751_parse_comparison.py`. The combined release manifest is `public/releases/v7.5.1-public.json`.

**Verification:**
- Public network HTML: SHA-256 `a6d27f7822dd9fa664b700eccf7efc2e1bd0fbccfae3321ac8806ed08ef5cb81` (6,081,981 bytes).
- Public comparison HTML: SHA-256 `20e8b1ccea61c509ddcf6571bfeaca8e705134e70ff7055ecec2cf86740097f8` (814,822 bytes).
- Combined manifest: SHA-256 `cee882382a54db0ceae78e20884dab4e7708e6ce6e9a7fd00d9383f4f06b9ed7` (3,634 bytes).
- Preserved legacy reviewer: SHA-256 `e5f3b2a55e5cdb9da54e5c8977231c05aa3c4928d896a15e3900ea3521318d77`.
- Independent network validation: 85 checks passed, 0 failed.
- Independent reviewer validation: 16,111 checks passed, 0 failed.
- Application checks: `pnpm typecheck` passed; all 115 `pnpm test` tests passed; `pnpm lint` passed with only the two pre-existing unused-symbol warnings in `CardRow.tsx` and `lib/cards/import-schema.ts`.
- Deterministic rebuilds reproduced the network, reviewer, and combined-manifest hashes exactly. Rendered-route QA passed 31 desktop/mobile assertions with no application page errors or non-analytics console errors, including the corrected mobile toolbar/filter layout and initially closed detail sheet.

**Deployment fields pending final promotion:**
- Source/production commit: **PENDING**
- Vercel preview URL and deployment ID: **PENDING**
- Vercel production deployment ID: **PENDING**
- Production route/asset verification: **PENDING**

**Blocked / deferred:**
- Laboratory/LOINC normalization is intentionally pending until **July 26, 2026 at 5:07 PM America/New_York**. v7.5.1 is a non-LOINC preview and must not be described as the final all-lane corpus.

**Open questions for next session:**
- After final local/browser checks, promote the candidate, fill the pending commit/preview/production identifiers above, and verify the live network, reviewer, redirect, manifest, historical routes, and asset hashes.
- After the LOINC allowance opens and the lab-complete parents are sealed, substitute those immutable artifacts, rerun both deterministic builders and independent validators, and publish an additive lab-complete successor rather than modifying v7.5.1 in place.

---

## 2026-07-21 — Public-safe v7.4 network + MedQA parser comparison

**Phase + step:** Phase 8 presentation slice — validated additive public release `clinical_network_v74_nonlab_public_r1`. The private Clinical Network Lab release remains unchanged.

**What changed:**
- Added `/network/7.4` as the public-safe derivative of private release `clinical_network_v74_nonlab_preview_r1`. The public graph retains aggregate concept associations, analytical filters, and anonymized robustness totals while removing raw questions, answer keys, source names/distributions, evidence/provenance payloads, and the source dropdown.
- Preserved `/network/4.9`, `/network/5.0`, `/network/5.1`, and `/network/5.4` as historical releases and kept `/reviewer` as the original parser experience.
- Added `/reviewer/compare` over exactly the same ten MedQA samples already published at `/reviewer`. This reviewer-only exception deliberately retains those ten raw MedQA questions to make the parsing visible side by side; it publishes no additional question text. The comparison contains 616 legacy mentions and 81 accepted v7.4 facts, collapsed to 70 distinct question-concept incidences; 9 of 10 questions have at least one accepted v7.4 fact.
- Pinned the sole clinical parent `outputs/im_boards_clinical_corpus_v74_nonlab.sqlite` at SHA-256 `4c5acfd4f86e9af1b4702cbeb403ac680d8830e7c86e34c06c370436dcbac521`. The unchanged private network database SHA-256 is `7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0`; its canonical graph SHA-256 is `213f59e74d49e3de47c1e8fa49d3f5a666fadedc2348cb82269f224d25598677`.
- Added a deterministic build path at `scripts/build_v74_public_showcase.py`, an independent validation path at `scripts/validate_v74_public_showcase.py`, and the versioned manifest at `public/releases/v7.4-public.json`.
- Kept anonymous Vercel Web Analytics on the public portfolio surfaces. GitHub `main` remains the Vercel production auto-deploy branch.
- Corrected the existing `prefer-const` lint blocker in the authenticated cards page without changing runtime behavior.

**Verification:**
- Public network HTML: SHA-256 `253ebf642fe63db59c81bf919fe28c26af2d8a1a45cb34dd583cf63c94b35987` (8,857,766 bytes).
- Public comparison HTML: SHA-256 `3bc485ee364929dad77838e8d9526e95bb023cb8228d70f9ed09e42db0f9ea3a` (437,753 bytes).
- Release manifest: SHA-256 `b88d4a8ea93e415d56573c54c3a9334da5243908f2f1091deba47312439caadf`.
- Independent privacy/count/topology/manifest validation: 113 passed, 0 failed.
- Application checks: typecheck passed; 115 tests passed; lint passed with two pre-existing warnings; production build passed.
- Rendered-route QA: 43 desktop/mobile browser assertions passed across the homepage, new routes, preserved reviewer, and historical networks, with no console or page errors.
- Production commit and live-route verification are recorded after GitHub `main` promotion.

**Blocked / deferred:**
- Laboratory/LOINC normalization is intentionally pending until **July 26, 2026 at 5:07 PM America/New_York**. This release is labeled a non-laboratory preview and must not be represented as the final all-lane corpus.

**Open questions for next session:**
- After the LOINC allowance opens and the lab-complete parent is sealed, substitute that immutable database, rerun the deterministic builder and independent validator, assign a new additive release name, and repeat production browser/deployment verification.

---

## 2026-07-17 — Network analysis 5.4 publication

**Phase + step:** Phase 8 presentation slice — publication of the current all-entity network analysis.

**What changed:**
- Added `/network/5.4` using the validated support-2 all-entity analysis artifact.
- Added 5.4 to the public tools index as the current release and retained 4.9, 5.0, and 5.1 as historical releases.
- Matched the public site’s dark-only presentation, index navigation, and anonymous Vercel Web Analytics coverage.
- Updated `ARCHITECTURE.md` routes and external-service scope.

**Verification:**
- Focused lint, typecheck, production build, source-artifact identity, and live-route checks passed.

**Blocked / deferred:**
- None.

**Open questions for next session:**
- None.

## 2026-07-14 — Public portfolio analytics

**Phase + step:** Phase 8 presentation slice — anonymous traffic measurement for the public fellowship portfolio.

**What changed:**
- Added Vercel Web Analytics to the public homepage and to the self-contained reviewer, network 4.9, network 5.0, network 5.1, and legacy explorer pages.
- Scoped tracking to those public portfolio routes. Authenticated application pages and private route identifiers remain outside analytics.
- Updated `ARCHITECTURE.md` §8 to document the service and route boundary.

**Verification:**
- Focused lint, typecheck, and production build passed.
- Public-route HTML and Vercel's analytics collection script were checked after deployment.

**Blocked / deferred:**
- Visitor identity is intentionally unavailable: Vercel Web Analytics reports anonymous aggregate traffic, not names or IP addresses.

**Open questions for next session:**
- None. Review traffic under the Vercel project's Analytics tab after real visitors arrive.

## 2026-07-14 — Dark tools index + versioned analysis releases

**Phase + step:** Phase 8 presentation slice — redesign of the fellowship-facing public site and publication of selected analysis tools. Private application behavior remains unchanged.

**What changed:**
- Replaced the long marketing-style homepage with a stripped-down dark index built around four direct destinations: the question parse reviewer and network releases 4.9, 5.0, and 5.1.
- Added clean public routes at `/reviewer`, `/network/4.9`, `/network/5.0`, and `/network/5.1` using self-contained static analysis artifacts.
- Restyled the reviewer and all three network interfaces as dark-only tools, with simple links back to the index.
- Published a ten-question MedQA-only reviewer. The MKSAP half of the local review file was intentionally excluded to preserve the repository's public-content boundary.
- Updated page metadata and added a matching dark social-preview image.

**Verification:**
- Focused lint on the changed TypeScript files passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- The production server returned HTTP 200 with the expected interface marker for `/`, `/reviewer`, `/network/4.9`, `/network/5.0`, and `/network/5.1`.
- Reviewer audit confirmed 10 MedQA questions, no MKSAP source records, dark theme, and local review-state storage. Network audit confirmed dark-only styling, index links, and no embedded question/stem/choice-text fields.

**Blocked / deferred:**
- Full-repository lint still contains one pre-existing `prefer-const` error in `app/(app)/cards/page.tsx` plus two unrelated unused-variable warnings. The files changed in this presentation slice lint cleanly.

**Open questions for next session:**
- Decide whether `/explore` should remain as a legacy exhibit or redirect to the new tools index.
- Decide whether future public reviewer releases should remain MedQA-only or use project-authored synthetic examples.

---

## 2026-07-14 — Fellowship-facing public project showcase

**Phase + step:** Phase 8, step 1 presentation slice — public homepage and project exhibit. This does not change the closed-beta gate, pricing, authentication, or private application behavior.

**What changed:**
- Replaced the public placeholder homepage with a general fellowship portfolio narrative covering the clinical problem, precision-first method, validation evidence, project boundaries, Zach's role, and translation into the Kekki learning platform.
- Added a responsive, accessible visual system in `app/page.module.css` without new dependencies.
- Added the existing offline analysis dashboard as a public interactive exhibit under `/explore`, with fellowship-facing labels and a clear route back to the project overview.
- Updated root metadata and added a dedicated social-preview card for link sharing.
- Preserved `/login` and every authenticated application route unchanged.
- Public copy reports only aggregate evidence and explicitly excludes source question stems, answer choices, rationales, patient information, and clinical guidance.

**Verification:**
- `pnpm typecheck` passed.
- `pnpm build` passed; `/` remains statically rendered and all existing authenticated routes compiled successfully.

**Blocked / deferred:**
- Fellowship-specialty tailoring remains optional; this approved version is specialty-neutral.
- Waitlist collection, invite-code gating, legal pages, and the full Phase 8 beta launch remain deferred to the planned product phase.

**Open questions for next session:**
- Add a named author biography, CV, contact link, or fellowship-specific framing only when Zach is ready to publish those personal details.
- Decide whether the interactive exhibit should continue to show multiple historical snapshots or eventually feature only the newest validated network.

---

## 2026-04-29 — D22 pivot: zero-LLM, ontology-math study loop

**Phase + step:** D22 added to DECISIONS.md (supersedes D6, D13, D14). Phase 3 and Phase 4 rewritten in place to deterministic math; Phase 7 (loop closure) trivialized to "regenerate plan." All LLM code deleted from this repo.

**What changed:**

Decision + docs:
- `DECISIONS.md` — D22 appended (full text of the pivot — three locked specifics: zero LLM, topic-level math on 722 topics with distributed weights, dynamic per-topic clusters, three intake modes — plus effects on D6/D13/D14/D17/D20/D21/D16/D8). D6, D13, D14 each marked "SUPERSEDED 2026-04-29 by D22" with body retained as historical context.
- `PHASES.md` — Phase 3 (Math intake), Phase 4 (Deterministic planner), Phase 7 (Loop closure) rewritten in place. Strategic-review checkpoint marked historical and points at D22.
- `CLAUDE.md` — "LLM call sites (exactly three)" section deleted; "What Kekki is" rewritten to describe the new deterministic loop; "Stack" no longer lists Anthropic; "Intake parser — two-layer stem rejection" section deleted; "Must ask" updated.
- `ARCHITECTURE.md` — §1 system overview redrawn (no Anthropic node); §2 stack-versions row for Anthropic SDK dropped; §3 data model adds `learner_topic_competence`, `topic_importance_v` view, `clusters.kind` + `clusters.source_topic_id`, marks `analytics_uploads`/`structured_analytics`/`usage_events` as historical; §4 routes for `/intake` and `/plan/new` rewritten; §5 LLM Call Sites replaced with "no LLM" note; §7 file layout updated; §8 Anthropic API row + `ANTHROPIC_API_KEY` env var dropped.

Schema (applied via Supabase MCP):
- `supabase/migrations/005_competence_layer.sql` — creates `topic_importance_v` view (722 rows, importance = parent subsection weight ÷ child topic count), `learner_topic_competence` table with RLS self-only policies, adds `clusters.kind ∈ {manual,ephemeral_topic}` and `clusters.source_topic_id` (FK→`concepts.id`).
- `supabase/migrations/005a_extend_cluster_kind_evaluator.sql` — extends `clusters.kind` to also accept `'evaluator'` for the calibration intake path.

Pure math (with tests):
- `lib/competence/score.ts` — `outcomeFromReview`, `emaUpdate`, `distributeSubsectionWeight`, `weakness`, `rankWeakTopics` (top-K with parent-system diversity guard, then subsection fallback, then degenerate fill). Constants exported.
- `lib/competence/score.test.ts` — 23 unit tests covering outcomes, EMA bounds, idempotence, distribution, weakness, top-K selection in all three diversity-guard branches, tie-break stability.

DB layer:
- `lib/competence/repo.ts` — `refreshCompetenceForUser` (folds reviews newer than the user's max `last_updated` into competence via EMA), `getTopWeakTopics` (joins `topic_importance_v` × competence × concept_parents → ranks via `rankWeakTopics`), `buildDynamicClusterForTopic` (queries `card_ontology_tags`, sorts by yield/board/danger, inserts ephemeral cluster + memberships), `resetCompetence`.
- `lib/intake/init-competence.ts` — `initFromSelfReport`, `initFromStandardized`, `initFromEvaluatorSession`, `startEvaluatorSession` (creates a `kind='evaluator'` cluster with one card per system).

Routes (rewritten):
- `app/(app)/intake/page.tsx` — server wrapper loads systems and existing competence count.
- `app/(app)/intake/IntakeClient.tsx` — three-tab UI: 18 system sliders / per-system % inputs / "Start calibration" button.
- `app/(app)/intake/actions.ts` — three deterministic server actions; no LLM, no token usage.
- `app/(app)/plan/new/page.tsx` — server wrapper; redirects to intake if no competence rows yet.
- `app/(app)/plan/new/PlanNewClient.tsx` — single "Generate plan" button + result card showing top-3 picks with metrics.
- `app/(app)/plan/new/actions.ts` — `generateDeterministicPlanAction`: refresh → top-3 → 3 ephemeral clusters → save plan. Pure SQL.
- `app/(app)/review/[session_id]/actions.ts` — `finishSession` now (a) detects `kind='evaluator'` clusters and runs `initFromEvaluatorSession` + redirects to `/plan/new`, (b) for all other kinds, calls `refreshCompetenceForUser` so the next plan reflects the just-finished session.
- `app/(app)/settings/page.tsx` (new) + `actions.ts` (new) + `ResetCompetenceForm.tsx` (new) — Settings page showing competence row count + sources histogram + a red "Reset competence profile" button (with browser-confirm) that wipes the user's rows and redirects to `/intake`.
- `app/(app)/dashboard/page.tsx` — nav: "Upload Analytics" → "Intake / Calibration"; new Settings link.

Deleted:
- `lib/llm/` (entire directory)
- `lib/intake/{stem-rejection,candidate-concepts}.{ts,test.ts}`
- `lib/plan/clusters-summary.{ts,test.ts}`
- `prompts/{intake,plan,ai_card}.md` (entire directory)
- `@anthropic-ai/sdk` from `package.json` (and `pnpm-lock.yaml` updated)

Verification:
- `pnpm typecheck` clean.
- `pnpm test` — 115/115 pass (the 69-test drop is the deleted LLM-side test files).
- `pnpm build` clean. All 11 routes compile, including the new `/settings`.
- DB queried via Supabase MCP after migration: 722 topics × importance values 0.0006–0.017, competence table empty, 3 existing clusters defaulted to `kind='manual'`.

**Blocked / deferred:**
- Cleanup of `usage_events` table (schema kept; no new writes from this repo). Future migration can drop it.
- Cleanup of `analytics_uploads` + `structured_analytics` tables (same — not written to anymore but schema retained).
- The evaluator session's card-sampling uses `Math.random()` — fine for V1 but not deterministic. Worth revisiting once we have telemetry on cold-start quality.

**Open questions for next session:**
- Should the deterministic planner cap plan size at exactly 3 (current V1) or accept a user override? D8 was narrowed but the table accepts more.
- Is the EMA α=0.3 the right pace? Worth instrumenting once Zach uses it for two weeks.
- Should `usage_events` actually be dropped now, or held for analytics-of-the-pivot use later?

---

## 2026-04-28 — Phase 3 + 4 wired: intake parser + plan generator

**Phase + step:** Phase 3 (Intake + Structuring) complete; Phase 4 (Plan Generator) complete. Strategic Review Checkpoint done inline — all big bets (D4, D9, D6, D20) still valid; ~$0 Anthropic spend to date.

**What changed:**

Phase 3 — intake parser wired (LLM call site #1):
- `app/(app)/intake/actions.ts` (new) — `parseIntakeAction`: Layer 1 heuristic check → load 970 concepts → `filterCandidateConcepts` → interpolate `prompts/intake.md` (strips implementation-notes section) → Haiku 4.5 at temp=0 with `{` prefill → validate response (concept IDs must be in candidate set, enums must match) → return proposal to client without DB write yet. `saveGapsAction`: inserts `analytics_uploads` (kind=text) + `structured_analytics` rows + `usage_events` (call_site='intake').
- `app/(app)/intake/IntakeClient.tsx` (new) — two-step client component. Step 1: textarea + "Parse my gaps" button; shows rejection reason inline. Step 2: editable gap table (severity select, note input, remove button); shows uncovered-gaps warning; "Save" or "Back" buttons.
- `app/(app)/intake/page.tsx` (new) — thin server wrapper; calls `isLlmEnabled()` and passes flag to client (shows "LLM not configured" banner when key absent).
- `app/(app)/dashboard/page.tsx` — added "Upload Analytics" nav link.
- `next.config.ts` — added top-level `outputFileTracingIncludes: { '/**': ['./prompts/**'] }` so Vercel bundles `prompts/intake.md` and `prompts/plan.md` at runtime.

Phase 4 — plan generator wired (LLM call site #2):
- `app/(app)/plan/new/actions.ts` (new) — `generatePlanAction`: 6 DB queries to assemble `ClusterWithCards[]` (clusters → memberships → cards → card_retrieval_metadata → card_ontology_tags → recent plans) → `buildClustersWithPlanningSummary` + `rankClustersByGapOverlap` (cap at 150) → interpolate `prompts/plan.md` → Haiku 4.5 → validate (cluster IDs constrained to input set, items 5–15, target_window_days 7–14) → return enriched proposal with cluster names. `savePlanAction`: inserts `study_plans` + `plan_items` (1-indexed positions) + `usage_events` (call_site='plan').
- `app/(app)/plan/new/PlanNewClient.tsx` (new) — two-step client component. Step 1: gap/cluster context card + "Generate study plan" button + error display. Step 2: plan rationale paragraph, ordered cluster list (each with LLM rationale), uncovered-gaps yellow banner if any, "Regenerate" or "Save plan" buttons.
- `app/(app)/plan/new/page.tsx` (new) — server wrapper; pre-loads gap count (from latest upload) and cluster count; passes to client (shows "no gaps" / "no clusters" states if either is zero).
- `app/(app)/dashboard/page.tsx` — added "Generate Study Plan" nav link.

**ARCHITECTURE.md sections updated:** §2 (Anthropic SDK now imported), §3 (m004 status → Applied), §4 (Phase 2–4 routes moved to Live; planned list trimmed to Phase 5+6), §5 (LLM call sites table — sites #1 + #2 status → Wired), §7 (file layout — added Phase 2–4 route files + lib/llm/).

**Verification:**
- `pnpm typecheck` ✅
- `pnpm build` ✅ — `/intake` and `/plan/new` appear as `ƒ (Dynamic)` routes.

**Manual end-to-end to run:**
1. `pnpm dev`; sign in.
2. `/intake`: paste "I bombed hyponatremia — especially the overcorrection questions. Also missed DKA fluid management twice." → parse → expect two rows, both `severity=high`. Edit if needed, save. Verify `analytics_uploads` + `structured_analytics` rows in Supabase dashboard.
3. `/plan/new`: click "Generate study plan" → expect 5+ clusters ordered by gap relevance → save. Verify `study_plans` + `plan_items` rows.
4. Rejection test: paste a UWorld vignette at `/intake` → expect Layer 1 or Layer 2 rejection, no DB writes.
5. Check `usage_events` table for intake + plan rows with correct token counts.

**Blocked / deferred:**
- Phase 5 (`/plan/[id]` detail view + per-item review sessions + completion tracking). Currently `savePlanAction` redirects to `/dashboard` after save.
- File upload at `/intake` (textarea-only for Phase 3; file input fits Phase 6 import work).
- `ANTHROPIC_API_KEY` must be in `.env.local` for LLM calls to work locally. Confirm it's set before testing.

**Open questions for next session:**
- Phase 5: what should `/plan/[id]` show? Ordered cluster list + "Start review session" per item + completion checkmarks? Link back to the existing `/review/[session_id]` flow?
- Should `savePlanAction` redirect to `/plan/[id]` when Phase 5 lands (yes — update the TODO comment in `PlanNewClient.tsx`)?
- Synonym backfill for `concepts` table (raised in earlier session) would improve `filterCandidateConcepts` relevance for MKSAP-style abbreviations — still open.

---

## 2026-04-28 — `/prompts/ai_card.md` authored (LLM call site #3)

**Phase + step:** post-Phase-6 prep — pre-authors the third and most-guardrailed LLM prompt before its consumer (private AI card generation, gated behind D13). All three D6 call-site prompts now exist in repo. Continuation of the same mobile session.

**What changed:**
- `/prompts/ai_card.md` (new) — full prompt template for the AI card generator (D6 #3, D13 guardrails). Spec: input schema (`{{gap_json}}`, `{{target_cluster_json}}`, `{{candidate_concepts_json}}`, `{{user_request_json}}`, `{{today_iso}}`), output JSON schema mirroring `ImportCard` from `/lib/cards/import-schema.ts` so the server can pipe the result through the same validator + mapper used by the bulk-import endpoint, and explicit refusal cases. Two principles dominate: (1) citation or refuse — hallucinated citations are worse than no card; (2) constrained vocabulary everywhere — D7/D17/D19/D20/D21 enums map to DB CHECK constraints. Vocabulary picking guidance per enum (which `card_format` for which retrieval pattern, which `source_strength` for which citation type, etc.). Three worked examples: concrete-gap clean output, refusal-due-to-no-citation, refusal-due-to-vague-gap.
- `ARCHITECTURE.md` §5 row 3 — flipped from `(planned)` to `(authored 2026-04-28; consumer not yet wired)`.
- `ARCHITECTURE.md` §7 — added `ai_card.md` under `/prompts/`; removed it from "Planned additions".

**Why now:** symmetry with the other two prompts (`intake.md`, `plan.md`). All three call-site prompts are now reviewable end-to-end. The shared types module + import validator + import mapper are already in place to back this prompt's consumer when D13 finally implements (post-Phase-6); the prompt closes the design loop.

**Decisions made this session:**
- **Single-card output (not multi).** The prompt produces one card per call. Rate limit (D13: 10/user/local-day) is per card; sequential calls give the user UI feedback per generation. Multi-card output would muddy the rate-limit semantics and the failure modes (one bad citation in a batch shouldn't reject the whole batch).
- **Output shape mirrors `ImportCard` exactly.** The server can run the AI-card output through the same `validateImportPayload` + `mapNormalizedPayloadToInsertRows` pipeline as bulk imports — no second validator needed. This is the payoff for landing the import path before D13 implementation.
- **Citation post-validation is documented.** The server should run a "looks like a real citation" sniff test (year present, name pattern, known canonical source phrase) on top of the prompt's "no fabrication" constraint. Defense in depth.
- **`source = 'ai_private'` and `status = 'draft'` set by the server, not the model.** Same pattern as the import endpoint hard-coding. D13 forbids auto-promote regardless of what the model emits.

**Verification:** docs only this commit; `pnpm typecheck`, `pnpm test`, `pnpm build` all green from prior commit. No code changes.

**Out of scope (intentional):**
- The D13 consumer (`/app/(app)/cards/generate/page.tsx` or similar). Lands post-Phase-6.
- The rate-limit counter on `usage_events` (D16). Wiring detail; the `usage_events` table already exists from m001.
- The "AI-generated, unreviewed" badge (D15). Review-UI render concern; not a prompt detail.
- The token-metering wrapper. Same — server side.

**Open questions for next session:**
- Should the AI card generator support a "regenerate / refine" loop (user sees draft, asks for revision)? D13 doesn't say either way. Adding it later is cheap; defer until the first consumer is wired and dogfooding shows what's missing.
- Citation sniff test heuristics — should they live in `/lib/cards/citation-validation.ts` as a pure function (testable on mobile) or inline in the route handler? Lean toward pure function. Save for the next mobile slice if we come back.

---

## 2026-04-28 — Phase 6 import → DB row mapper (+ citation_kind tightening)

**Phase + step:** Phase 6 prep — finishes the validated-payload-to-DB-rows path. After this commit, the route handler is `validate → map → transactional insert`; almost no logic of its own. Continuation of the same mobile session.

**What changed:**
- `/lib/cards/import-mapper.ts` (new) — `mapNormalizedPayloadToInsertRows(payload, options)` takes a `NormalizedImportPayload` from the validator and produces an `ImportInsertRows` bundle: arrays for `clusters` (new), `cards`, `card_retrieval_metadata`, `card_ontology_tags`, and `cluster_memberships`. Pure logic, no DB access. ID generation defaults to `crypto.randomUUID()` but is injectable for deterministic tests. Cluster definitions deduplicate by name within the batch (two cards with `cluster_definition: { name: "Hyponatremia" }` share one new cluster). Cluster-id references pass through verbatim (existence checks remain the route handler's job).
- `/lib/cards/import-mapper.test.ts` (new) — 19 tests. Single-card → 5-table-row counts. Verbatim field preservation across D7/D17/D19/D20/D21. Mapper hard-codes `source = 'external_pipeline'` and `status = 'draft'` per Phase 6 spec. `card_retrieval_metadata.card_id` FK match. `card_ontology_tags.review_status = 'accepted'` default per D19. New-cluster path: ClusterInsertRow with `owner_user_id` wired, FK link to membership. Cluster dedup by name (one cluster, two memberships). Distinct-name → distinct clusters. Mix of existing cluster_id + new cluster_definition. Position assignment: 1-indexed, increments per cluster, independent counters. Card-id uniqueness + FK consistency across all output tables. Default `crypto.randomUUID()` smoke test. Defensive invariants: 1 metadata per card, 1 membership per card, sum(ontology_tags) = sum across cards. Input-order preservation.
- `/lib/cards/types.ts` — added `CitationKind` enum (`'guideline' | 'primary_lit' | 'textbook' | 'uptodate' | 'other'`) per the m001 CHECK constraint. Was previously not in the locked vocab. Plus `CITATION_KINDS` const array and `isCitationKind` guard.
- `/lib/cards/types.test.ts` — added cardinality test (`CITATION_KINDS.length === 5`) and guard contract entry. Existing guards-table tests automatically extend coverage.
- `/lib/cards/import-schema.ts` — tightened `citation_kind` validation from arbitrary string to `isCitationKind` enum guard. Closes a gap where `citation_kind: "tweet"` would pass the validator but fail at DB insert time.
- `/lib/cards/import-schema.test.ts` — added `citation_kind: "tweet"` to the table-driven invalid-enum test loop. Pulls validator coverage to 12 enum-typed fields.
- `ARCHITECTURE.md` §7 — added `import-mapper.ts` + tests to the `/lib/cards/` listing.

**Why now:** the Phase 6 validator landed last commit; the natural follow-on is "what does the route handler actually call after validation?" With the mapper shipped, the route handler is `validate → map → transactional insert`. Plus the `citation_kind` gap was a real bug (DB rejection at insert time, surfacing as a 500 instead of a 400) — fixing it now while the validator is fresh in mind is cheaper than catching it in Phase 6 dogfooding.

**Decisions made this session:**
- **Cluster definitions dedupe within batch by `name`.** Two cards with the same new-cluster name share one ClusterInsertRow. Reasoning: external pipelines bulk-generating cards for a topic naturally produce many cards targeting the same cluster definition. Forcing them to use a separate envelope-level `cluster_definitions` array would complicate the contract for marginal gain. Cross-batch dedup (against existing clusters with same name) is the route handler's call — `clusters` table doesn't have a unique constraint on `(owner_user_id, name)`, and it's not obvious it should.
- **`source = 'external_pipeline'` and `status = 'draft'` are hard-coded by the mapper, not configurable.** D13 forbids auto-promote; the import path always lands in draft. If a future use case (e.g., admin tool) needs to import as `human` or `reviewed`, that's a different route, not a flag here.
- **Position is 1-indexed, increments per cluster, batch-local.** Schema default is 0 with no uniqueness; the mapper produces sensible ordering for fresh clusters. Caller can offset by existing-card-count when appending to a non-empty cluster (documented in the mapper's `position` comment).
- **`card_ontology_tags.review_status = 'accepted'` default for import.** D19 doesn't force this; `manual_override` and `import` tag_sources are typically vetted upstream by the pipeline. Tag-review workflow can downgrade to `needs_review` later.
- **`generateId` is injectable but defaults to `crypto.randomUUID()`.** Tests use a deterministic counter (`id-1`, `id-2`...) to assert FK linkage exactly. Production never sees the test generator. Small, conventional seam.

**Verification:**
- `pnpm test` → 159/159 pass (22 stem-rejection + 27 candidate-concepts + 22 types + 25 clusters-summary + 44 import-schema + 19 import-mapper).
- `pnpm typecheck` → green.
- `pnpm build` → green.

**Out of scope (intentional):**
- Existing-cluster dedup (mapper doesn't query DB; route handler can deduplicate by querying first if desired).
- Idempotency replay logic (separate concern; deferred to Phase 6 wiring).
- Position offsetting against existing cluster cards (mapper documents the contract; caller offsets if needed).

**Open questions for next session:**
- Should there be an `idempotency_keys` table migration so retries with the same `idempotency_key` return the same response? Defer until Phase 6 wiring is in progress and we know the actual replay semantics needed.
- Should the route handler be at `app/api/cards/import/route.ts` (App Router convention) with a Server Action wrapper, or is the standalone route fine? Defer.

---

## 2026-04-28 — Phase 6 import validator (`POST /api/cards/import`)

**Phase + step:** Phase 6 prep — pre-authors the runtime validator the bulk-import endpoint will use as its boundary. After this commit, Phase 6's remaining work is the route handler (calls `validateImportPayload`, then writes to DB), the cluster editor UI, and the 24-hour cooling DB trigger (already in m001 per CLAUDE.md).

**What changed:**
- `/lib/cards/import-schema.ts` (new) — runtime validator for the import payload. Builds on `/lib/cards/types.ts` (every D17/D19/D20/D21 enum guard is used). Pure logic; no DB access. Cluster-id existence and concept-id existence checks are deferred to the consumer (require DB queries). Public surface:
  - `ImportPayload` / `ImportCard` / `ImportOntologyTag` / `ImportClusterDefinition` — input shape every external pipeline must speak.
  - `NormalizedImportPayload` / `NormalizedCard` / `NormalizedOntologyTag` / `NormalizedClusterDefinition` — output shape with all defaults applied (D21 enum defaults, ontology-tag confidence 1.0, etc.). Direct mapping target for DB rows.
  - `ImportError` — discriminated by 11 `code` values (`NOT_OBJECT`, `NOT_ARRAY`, `EMPTY_ARRAY`, `WRONG_TYPE`, `MISSING_REQUIRED`, `EMPTY_STRING`, `INVALID_ENUM`, `OUT_OF_RANGE`, `INVALID_CLUSTER_PLACEMENT`, `INVALID_PRIMARY_TAG_COUNT`, `DUPLICATE_VALUE`); each error carries a JSON-pointer-style path so the response can pinpoint exactly which card and field is wrong.
  - `validateImportPayload(input: unknown)` → `{valid: true, payload: NormalizedImportPayload} | {valid: false, errors: ImportError[]}`. **Errors accumulate** rather than short-circuit — a fully-broken card surfaces every required-field issue in one round-trip, not one error per resubmit.
  - `IMPORT_DEFAULTS` exported as a frozen object so callers can document the contract.
- `/lib/cards/import-schema.test.ts` (new) — 43 tests. Top-level shape rejections (non-object, missing cards, empty array, non-array). Minimal valid payload + defaults applied check. Maximal payload preserving every field. Required-field-missing test for each of the 7 required card fields (loop). Empty-string rejection. Invalid-enum rejection for each of 11 enum-typed fields (loop). Secondary-lattices array bad-element. Ontology tags: empty array, no primary, multiple primaries (D19 enforces partial unique index — validator front-runs the DB), missing fields, confidence out of `[0,1]`. format_confidence boundary cases (0, 1, null). Cluster placement: neither set, both set, valid id, valid definition, default visibility = private, bad visibility enum. Multi-card error path correctness (`['cards', 1, 'yield_tier']`). Error accumulation (3 broken cards → ≥3 errors). Type-checking smoke test.
- `ARCHITECTURE.md` §7 — added the two new files under `/lib/cards/`.

**Why now:** with `/lib/cards/types.ts` shipped, the import validator is a 30-minute write of guarded property reads. Landing it now means Phase 6's route handler can be a one-liner — `validateImportPayload(req.body)` — and the external pipeline contract is documented in code (the `ImportCard` interface is the single source of truth that bulk authors can target).

**Decisions made this session:**
- **Errors accumulate, never short-circuit.** Validator collects every issue then returns. External pipelines submit batches of 50+ cards; a single MISSING_REQUIRED on card 17 should not hide a duplicate-primary on card 23. The accumulation cost is one pass over broken cards; the correctness benefit is "fix everything in one PR review cycle."
- **JSON-pointer-style path arrays (`['cards', 0, 'yield_tier']`).** Easier for clients to navigate programmatically than a string. `path.join('.')` gives a human-readable form when needed.
- **11 stable error codes (TS literal union).** External-pipeline authors can pattern-match on codes for retry logic without parsing messages. `INVALID_PRIMARY_TAG_COUNT` is a specific code (rather than generic INVALID) because the D19 partial unique index makes this a hard contract — surfacing it cleanly upstream of the DB is the whole point.
- **Validator does NOT check DB-existence facts.** `cluster_id` references and `concept_id` references are validated by the DB at write time. Pulling those into the validator would either need a fake DB layer in tests (premature) or a real one (impossible on mobile). Phase 6's route handler does the existence checks after schema validation succeeds.
- **Defaults applied during validation, not after.** Output is fully-normalized `NormalizedCard` with no `undefined` fields. The Phase 6 consumer can map straight to DB rows without re-checking which fields are optional.

**Verification:**
- `pnpm test` → 138/138 pass (22 stem-rejection + 27 candidate-concepts + 21 types + 25 clusters-summary + 43 import-schema).
- `pnpm typecheck` → green.
- `pnpm build` → green.

**Out of scope (intentional):**
- DB existence checks (cluster_id, concept_id) — Phase 6 consumer handles these post-validation.
- 24-hour cooling enforcement — already in the m001 `cards_status_transition` trigger; not the validator's job.
- Idempotency-key replay logic — consumer concern (probably a `usage_events`-like table or a dedicated `import_idempotency_keys` table; defer to Phase 6 wiring).
- Auth — `POST /api/cards/import` will require auth; that lands in the route handler, not here.
- Coercion of stringified booleans / numbers — validator is strict (`true` is true, `"true"` is rejected with WRONG_TYPE). External pipelines should send proper JSON types; coercion hides bugs.

**Open questions for next session:**
- Should `confidence` for ontology tags default to something other than 1.0 when `tag_source = 'model'`? Currently defaults to 1.0 across the board. D19 says "Human-authored tags = 1.0. LLM-produced tags carry the model's self-reported value." Strict reading: model-source tags without confidence should be a validation error. Pragmatic: default to 1.0 and let the human reviewer downgrade. Lean pragmatic for now; revisit if the data quality hurts.
- Should the validator enforce a max card count per request (e.g., 1000)? Currently unbounded. Phase 6 wiring's body-size limit catches the worst, but a 1000-card cap in the validator gives clearer error messages.

---

## 2026-04-28 — Phase 4 plan generator: shared card vocab types + clusters aggregator

**Phase + step:** Phase 4 prep — pre-authors the consumer-side helpers that `/prompts/plan.md` references, plus a shared card-vocabulary types module that encodes D17/D19/D20/D21 in TypeScript. After this, the plan-generator server action's only remaining work is the SQL query, the Anthropic SDK call, and the UI.

**What changed:**
- `/lib/cards/types.ts` (new) — single TypeScript source of truth for the locked card vocabulary. Encodes 17 enums spanning D7 (`status`), D13 (`source`), D17 (`difficulty`, `granularity`), D19 (`tag_role`, `tag_review_status`, `tag_source`), D20 (`primary_lattice`, `secondary_lattice`, `card_format`, `cognitive_task`, `retrieval_direction`, `format_review_status`), and D21 (`yield_tier`, `danger_level`, `board_likelihood`, `source_strength`, `review_priority`). Each enum gets a string-literal type, a `const` tuple (for runtime iteration), and a generated type-guard (`isYieldTier`, etc.). The guards reject non-strings, wrong-case strings, and unknown values — important since `auth.users` row attributes and LLM-returned strings arrive as `unknown`.
- `/lib/cards/types.test.ts` (new) — 21 tests. Cardinality checks for every enum (drift detector against DECISIONS.md — e.g., "DANGER_LEVELS has 4 values per D21" fails loudly if someone adds a fifth without a forward migration). Spot-checks for specific values (`lethal` in danger, `society_guideline` in source_strength, the four D20 lattice codes). Table-driven test asserts every guard accepts every documented value and rejects garbage / non-strings / wrong case.
- `/lib/plan/clusters-summary.ts` (new) — `buildClustersWithPlanningSummary(clusters)` aggregates per-cluster D20/D21 histograms (`yield_tier`, `danger_level`, `board_likelihood`, `primary_lattice`, `cognitive_task`) plus deduplicated `concept_coverage` and `card_count`. Histograms always include zero buckets so the LLM sees the full distribution shape rather than inferring "absent = zero". Postgres does the join (single SQL query); TypeScript does the rollup. Plus `rankClustersByGapOverlap(clusters, gapConceptIds)` for when a user has > 150 clusters — pre-ranks by gap-concept overlap (tie-break: card_count desc → cluster_id asc, deterministic across runs so prompt caching can hit on repeated inputs).
- `/lib/plan/clusters-summary.test.ts` (new) — 20 tests. Identity passthrough (cluster_id / name / description, including null), card_count correctness, concept_coverage dedup + sort, histogram zero-buckets invariant, histogram counts on three different fixture clusters (HF GDMT with management-treatment dominance + lethal card; Hyponatremia with threshold cognitive task; Empty cluster with all-zero histograms), histogram-sum-equals-card-count invariant for every enum field. Plus 5 ranking tests: no-gaps passthrough, higher overlap first, tie-break by card_count, multi-overlap counting, deterministic across runs.
- `/prompts/plan.md` — implementation notes refreshed to point at `buildClustersWithPlanningSummary()` and `rankClustersByGapOverlap()` rather than restating the algorithms in prose. Also added a note that the server should use the `is*` type guards from `/lib/cards/types.ts` to narrow LLM-returned enum strings before persisting.
- `ARCHITECTURE.md` §7 — added `/lib/cards/` and `/lib/plan/` subdirectories with the four new files.

**Why now:** the plan.md prompt references `planning_summary` histograms in five enum dimensions; without a typed implementation the Phase 4 server would have to either build them ad-hoc (silently desync from D20/D21) or skip them (LLM has to count cards itself, expensive and error-prone). Landing the typed source-of-truth (`/lib/cards/types.ts`) plus the aggregator now means the Phase 4 wiring is just SQL + an Anthropic SDK call + a UI.

**Decisions made this session:**
- **Single shared vocabulary module over per-feature enum copies.** `/lib/cards/types.ts` is imported by the planner aggregator now, will be imported by the Phase 6 import validator and the Phase 3 intake schema check next. Keeping enums in one place means updating D20/D21 (via forward migration only — CLAUDE.md guardrail) is one file edit, not a hunt across the codebase.
- **`as const satisfies readonly Foo[]` over `as readonly Foo[]`.** Modern TS pattern: `satisfies` checks the literal contents are valid `Foo` values without widening the array type. Result: the const array carries narrow tuple types AND is type-checked against the union. Safer drift detection.
- **Generated guards via `makeIsMember(values)`.** Avoids 17 hand-written `is*` functions that could drift from their tuples. Single helper, used 17 times.
- **Histograms include zero buckets.** Forces the LLM to see "0 lethal, 4 high" instead of inferring that absent buckets mean zero. Slightly larger payload; zero ambiguity.
- **Ranking helper uses deterministic tie-break.** `card_count desc → cluster_id asc` so prompt caching can hit on repeated identical inputs (Anthropic prompt caching keys on exact byte equality).

**Verification:**
- `pnpm test` → 95/95 pass (22 stem-rejection + 27 candidate-concepts + 21 types + 25 clusters-summary).
- `pnpm typecheck` → green.
- `pnpm build` → green.

**Out of scope (intentional):**
- The Supabase SQL query that produces the `ClusterWithCards[]` input is deferred to Phase 4 wiring. Mobile sandbox can't test it against kekki-prod.
- `is*` guards exist for every D20/D21 enum but are not yet imported anywhere. Phase 4 server action will import them when validating LLM-returned cluster-id and rationale text. Intentional — adding consumers without real wiring would create dead code.
- No card-shape Zod-equivalent runtime validator yet (Phase 6 work). The shared types module is the foundation; the validator builds on top.

**Open questions for next session:**
- The Phase 4 SQL query should probably live in a typed query helper `/lib/plan/queries.ts` rather than inline in the server action. Defer until actually wiring.
- `cognitive_task` is on `card_retrieval_metadata` (1:1 with cards from m003) — the SQL query needs an explicit join. Phase 4 wiring should capture this or LEFT JOIN with a fallback if `card_retrieval_metadata` is missing for a card (shouldn't happen given the 1:1 constraint, but defensive coding).

---

## 2026-04-28 — Phase 3 intake foundation: candidate-concepts filter helper

**Phase + step:** Phase 3 prep — completes the pure-logic side of the intake parser. The Phase 3 server action can now compose two helpers (`checkForQbankStem` + `filterCandidateConcepts`) and the `intake.md` prompt; the only remaining work is wiring (Anthropic SDK call + UI).

**What changed:**
- `/lib/intake/candidate-concepts.ts` (new) — `filterCandidateConcepts(userInput, concepts, options?)` helper. Takes the full `concepts` table (970 rows in production) and returns ~30–80 records for the intake LLM's `{{candidate_concepts_json}}`. Algorithm: tokenize input (lowercase, drop short / stopword / digit tokens), score each concept by token overlap against `title` + `synonyms[]`, take top-N with topic > subsection > system tie-break, always include all 18 systems as a coverage floor, pull in parent subsections of top topic matches, cap at `maxTotal` by dropping subsection ancestors first (systems and direct matches preserved). Output sorted by id for deterministic prompts. Exports `__testing` namespace for white-box tests on internal helpers without leaking API surface.
- `/lib/intake/candidate-concepts.test.ts` (new) — 27 tests: 12 unit tests on internal helpers (tokenize, deriveParentId, buildParentPath, scoreConcept), 11 unit tests on the public `filterCandidateConcepts` (system floor invariant, topic + parent inclusion, synonym matching, multi-topic input, deterministic ordering, parent_path correctness, maxTotal cap behavior, topN cap, minOverlap threshold, empty/stopword input), and 4 integration tests against the real `abim_blueprint_v1.json` (970 concepts loaded; result stays under maxTotal; "hyponatremia correction rate" returns the matching topic; empty input returns exactly the 18 systems). All 27 pass; combined suite is now 49/49 (22 stem-rejection + 27 candidate-concepts).
- `/prompts/intake.md` — implementation note updated to point at `filterCandidateConcepts()` rather than the prose algorithm. Server doesn't need to re-implement the heuristic.
- `ARCHITECTURE.md` §7 — added the two new files under `/lib/intake/`.

**Why now:** the prompt template's `{{candidate_concepts_json}}` placeholder needs a concrete server-side implementation, otherwise Phase 3 wiring would have to design the filter on the spot. Pure logic with deterministic output makes this fully unit-testable on mobile, and the integration tests against the real blueprint catch any scaling bugs before Phase 3 hits production data.

**Decisions made this session:**
- **Token-overlap heuristic over embeddings** — for an MVP with a 970-row table where concepts have human-readable titles, simple token overlap is sufficient. The integration test against the real blueprint confirms relevance on a real-shaped query. Embeddings can land later if dogfooding shows the heuristic missing obvious matches; gated on the prompt's "Open question" in SESSION_LOG.
- **Always include all 18 systems** — coverage floor so the LLM can fall back to system-level granularity when no topic is a confident match. Costs ~18 lines of prompt; saves the LLM from inventing slugs (CLAUDE.md: "Never let the LLM invent a concept slug. Fragmentation kills the planner.").
- **Subsection ancestors yes, deeper grandparents no** — topics' grandparents are systems (already in the floor). The helper only adds direct subsection parents, keeping the candidate count predictable.
- **`__testing` re-export over manual visibility juggling** — small, conventional, and clearly marked. Test-only seam without polluting the public API.

**Verification:**
- `pnpm test` → 49/49 pass (22 stem-rejection + 27 candidate-concepts).
- `pnpm typecheck` → green.
- `pnpm build` → green.

**Out of scope (intentional):**
- No Supabase query helper to load concepts. Phase 3's server action will do the query and pass the rows to `filterCandidateConcepts`. Adding a query helper now would either need Supabase access (none on mobile) or a fake data layer (premature).
- No tagger version / confidence in output. The intake parser writes to `structured_analytics` which has its own `confidence` enum (D17); that's separate from filter confidence and lives at the prompt boundary.

**Open questions for next session:**
- Should `synonyms` be backfilled into the `concepts` table for common medical aliases (e.g., `hyponatremia` → `["SIADH", "low sodium"]`)? The seed currently produces empty arrays. Synonym-rich rows would improve overlap scoring meaningfully. Consider a Layer-1.5 pass that pre-populates synonyms from `Medical_Knowledge_Ontology.md` or the LLM itself (one-shot, human-reviewed).
- The integration test asserts result count ≤ 80, which holds at typical scale. If a paragraph-length input causes the cap to bind regularly, revisit `maxTotal` or add a second-stage tier-3 (subsection ancestors) prioritization.

---

## 2026-04-28 — Phase 3 intake foundation: D14 Layer 1 + Layer 2 + native test runner

**Phase + step:** Phase 3 prep — pre-authors both layers of the D14 stem-rejection design plus the intake-parser prompt (LLM call site #1). Adds the project's first runnable unit-test harness using Node 22's native `node:test`. Continuation of the same mobile session.

**What changed:**
- `/lib/intake/stem-rejection.ts` (new) — Layer 1 heuristic precheck per D14. Six rule patterns (`lettered_choice_block`, `correct_answer_marker`, `educational_objective`, `repeated_key_point_header`, `patient_vignette_with_likely_diagnosis_question`, `qbank_item_header`). Detection bias: prefer false negatives over false positives (a user mentioning "MKSAP" in their notes must not be rejected). Result type is a discriminated union `{rejected: false} | {rejected: true; reason; matched_pattern}` for clean call-site narrowing under strict mode.
- `/lib/intake/stem-rejection.test.ts` (new) — 22 unit tests using Node 22's `node:test` runner. Covers: empty input, plain narrative, qbank product names in legitimate prose, single-letter-in-prose, classic 5-choice MCQ, 3-choice with parens, "correct answer" markers, "Educational Objective:" rationale, repeated "Key Point:" headers, "Which of the following…" stems, "Item N:" headers, combined adversarial input, false-positive guards ("the answer was…" without "correct"), case-insensitive matches, and the `QBANK_STEM_RULE_NAMES` contract. All 22 pass.
- `/prompts/intake.md` (new) — Layer 2 LLM prompt for the intake parser (D6 #1). Mirrors `plan.md` style: input schema (`{{user_input}}`, `{{candidate_concepts_json}}` pre-filtered to ~30–80 records, `{{today_iso}}`), output schema (`{rejected: false, items[]}` or `{rejected: true, reason}` per D14 Layer 2), severity / confidence rubrics, granularity guidance per D17/D18 (system / subsection / topic), four worked examples covering acceptance, vague-but-not-rejected, paraphrased-stem rejection, and CSV analytics dump.
- `package.json` — added `"test": "node --experimental-strip-types --test lib/**/*.test.ts"` script. Uses Node 22+ native test runner with experimental TS strip-types — no new dependencies. Verified 22/22 tests pass on the sandbox's Node v22.22.2.
- `CLAUDE.md` DoD — added `pnpm test` to the bullet list. Common-commands block — added `pnpm test` with the underlying invocation documented.
- `ARCHITECTURE.md` §5 row 1 — flipped intake prompt from `(planned)` to `(authored 2026-04-28; consumer not yet wired)` and noted the Layer 1 helper location.
- `ARCHITECTURE.md` §7 file layout — added `/lib/intake/` subdirectory with both files; added `intake.md` under `/prompts/`; removed `intake.md` from "Planned additions".

**Why now:** D14 stem rejection is a hard guardrail (refusing proprietary qbank content) — landing both layers as runnable code/prompt before Phase 3 starts means the Phase 3 implementer (likely Zach in a future session) just wires the call site instead of designing the rejection logic on the spot. Native `node:test` was available all along; the project just hadn't picked a test framework yet, and Phase 3 will need tested logic regardless.

**Decisions made this session (no DECISIONS.md edits required):**
- **Test framework:** Node 22+ native `node:test` with `--experimental-strip-types`. Zero new dependencies. Lives in `lib/**/*.test.ts` co-located with source. Reasoning: Vitest and Jest both add 30+ MB and a config burden; the native runner has been adequate since Node 18 and is stable from 22.6.
- **Layer 1 detection bias:** false negatives over false positives. Two of the six rules have explicit safeguards (lettered choices require ≥3 separate lines; "Key Point:" requires repetition) precisely to avoid rejecting legitimate user notes. Layer 2 is the safety net for paraphrased stems.

**Verification:**
- `pnpm test` → 22/22 pass.
- `pnpm typecheck` → green.
- `pnpm build` → green.

**Out of scope (intentional):**
- No server-side intake route (Phase 3 wires `/intake/page.tsx` + the server action).
- No live LLM call (no `ANTHROPIC_API_KEY` on mobile sandbox).
- No `/prompts/ai_card.md` (Phase 6+, gated on D13).
- No Zod or runtime schema validator for `structured_analytics` rows — Phase 3 implementer can add when wiring the consumer; the manual TypeScript-types-only path is fine for an MVP given how narrow the schema is.

**Open questions for next session:**
- Should `candidate_concepts_json` filtering live in a `/lib/intake/candidate-concepts.ts` helper now (testable in isolation) or be inlined in the Phase 3 server action? Lean toward extracting now, but it depends on whether the filter needs a seeded `concepts` table to test — if so, defer.
- The Layer 2 prompt suggests pre-filtering candidates by token overlap against `concepts.title` and `concepts.synonyms[]`. If overlap is poor (rare medical synonyms), consider a small embedding lookup later — but only if Phase 3 dogfooding shows the overlap heuristic missing obvious matches.

---

## 2026-04-28 — `/prompts/plan.md` authored (LLM call site #2)

**Phase + step:** Phase 4 prep — pre-authoring the prompt template before the consumer (server action at `/plan/new`) is wired. Continuation of the same mobile session that landed D21 + migration 004.

**What changed:**
- `/prompts/plan.md` (new) — full prompt template for the plan-generator LLM call site (D6 #2). Spec: input schema (`{{gaps_json}}`, `{{clusters_json}}`, `{{today_iso}}`, `{{recent_plan_history_json}}`), output JSON schema (`{rejected, items[5..15], target_window_days[7..14], plan_rationale, uncovered_gaps}`), hard constraints (cluster_id constrained-enum from input, never invent), selection rubric (severity → danger floor → yield × board → recency damping → coverage diversity → format diversity), refusal cases, worked example with two real concept IDs from the seed data. Leverages D17–D21 vocabulary throughout (concept IDs, lattice codes, cognitive_task, yield_tier, danger_level, board_likelihood). Server pre-computes `planning_summary` distributions per cluster — the model does not aggregate.
- `ARCHITECTURE.md` §5 (LLM Call Sites) — flipped row 2 prompt location from `(planned)` to `(authored 2026-04-28; consumer not yet wired)`.
- `ARCHITECTURE.md` §7 (File Layout) — added `/prompts/` directory, listed `plan.md`, added `003_retrieval_metadata.sql` and `004_planning_layer.sql` to the migrations list (was stale).
- `ARCHITECTURE.md` §7 "Planned additions" — replaced `/prompts/` with the still-pending `/prompts/intake.md` and `/prompts/ai_card.md`.

**Why now:** D21 just locked the planning vocabulary, so the prompt can constrain LLM output to `yield_tier ∈ {high, medium, low}`, `danger_level ∈ {low, moderate, high, lethal}`, etc. Authoring this template now while the vocabulary is fresh is cheaper than re-deriving it during Phase 4 implementation.

**Out of scope (intentional):**
- No server code, no Anthropic SDK import, no `/plan/new` route handler. Phase 4 wires the consumer.
- No live LLM testing — that needs `ANTHROPIC_API_KEY`, which the mobile sandbox doesn't have.
- Worked-example output is illustrative (5 items with 3 unspecified supporting clusters); first real plan generation will produce the canonical example to fold back into the template.

**Blocked / deferred:**
- `/prompts/intake.md` (call site #1) — Phase 3 work, not started.
- `/prompts/ai_card.md` (call site #3) — post-Phase-6, gated on D13.

**Open questions for next session:**
- Should the server's `planning_summary` aggregation be a SQL view or computed in-route? View is testable in isolation; in-route saves a migration. Defer until Phase 4 starts.
- The selection rubric's "recency damping" leans on `recent_plan_history_json` — does the server pre-compute a "do not repeat" flag, or does the model decide? Currently the prompt asks the model to soft-damp; revisit if Phase 4 reveals the model over-repeats.

---

## 2026-04-28 — D21 planning enum lock + migration 004 authored (mobile session)

**Phase + step:** Phase 1 step 1c — unblocks the migration deferred 2026-04-26. Mobile-only session: doc + schema work, zero application code, `supabase db push` deferred to Zach's next laptop session before Phase 4 starts.

**What changed:**
- `DECISIONS.md` — appended **D21** (planning-layer enum lock). Locks the five planning enums on `cards`: `yield_tier`/`board_likelihood`/`review_priority ∈ {high,medium,low}`, `danger_level ∈ {low,moderate,high,lethal}`, `source_strength ∈ {society_guideline, primary_trial, systematic_review, narrative_review, expert_opinion}`. Also locks the `primary_system_id` / `secondary_system_ids[]` / `bridge_reason` denorm shape and the `card_discriminators` directed-graph table contract. Sister entry to D20 (D20 = what the card teaches; D21 = how the planner prioritizes it). Includes "Revisit if" clauses for each open question — `review_priority` is explicitly on probation pending Phase 4 planner first-pass.
- `supabase/migrations/004_planning_layer.sql` (new) — adds eight columns to `cards` (five enums + three system fields), creates `card_discriminators` with composite PK, three indexes, and RLS mirroring `card_ontology_tags` (D19). All five enums NOT NULL with sensible defaults (`medium` / `moderate` / `narrative_review` / `medium`) so the 20 existing seed cards take defaults without backfill SQL. `primary_system_id` is NULLABLE because the FK to `concepts(id)` requires a real concept ID and the seed cards predate this migration. Style mirrors m003 (CHECK constraints, not Postgres ENUMs; `comment on column ...` per column referencing D21).
- `ARCHITECTURE.md` — bumped "Last updated" to 2026-04-28; updated table count `15 → 16 tables` (with note that #16 lands on push); appended planning enums to the cards row in §3 Tables; inserted new `card_discriminators` row between `card_retrieval_metadata` and `cluster_memberships`; flipped the `004_planning_layer.sql` migration cadence row from "Deferred 2026-04-26 — enum values TBD" to "Authored 2026-04-28 (file written, not yet `supabase db push`'d). Enum values locked by D21 (added same day)."
- `PHASES.md` — flipped step 1c status from "Deferred 2026-04-26" to "Authored 2026-04-28 (file written, not yet `supabase db push`'d)" with the locked enum values inline. Updated the Phase 1 DoD line to reflect that m004 is authored but `supabase db push` is outstanding.
- `CLAUDE.md` — distinguished m003/D20 from m004/D21 in the migration-summary paragraph (was "All enum values are locked by D20"). Added a new "Things to ask Zach before changing" bullet covering the D21 locked enums + `card_discriminators` graph.
- `SESSION_LOG.md` — this entry.

**User decisions made this session (locked in DECISIONS.md):**
- D21: `source_strength` is **categorical** (5 values), not integer 1–5. Reason: D6/D13 require constrained-enum LLM outputs; strings carry semantics ("primary_trial" beats "5"). Future `sources.source_quality` integer (`flashcard_database_design.md` L137) keeps the integer for raw provenance; reconcile via a view.
- D21: `review_priority` **kept** as card-level `high/medium/low`, on probation. Distinct from `learner_card_state.priority_score` (per-user computed). Drop in a forward migration if Phase 4 planner shows it's redundant with `yield × danger × board`.
- D21: `danger_level` keeps `lethal` as a **fourth tier** above `high` (planner needs a "must-not-miss" trump for anaphylaxis / MH / tamponade).
- D21: all five enums **NOT NULL with sensible defaults** so the 20 existing seed cards take defaults without backfill SQL.
- D21: `primary_system_id` is a **denorm** of the system-level placement from `card_ontology_tags` (D19). Polyhierarchy (D17) still authoritative there. No validating trigger now; revisit if drift bites.
- D21: `secondary_system_ids text[]` has **no row-level FK enforcement** — validated at the app layer (parallel to the `concept_ids[]` validator trigger m002 dropped).

**Blocked / deferred:**
- `supabase db push` — needs Zach's laptop. Smoke-test recipe: column shape check via `information_schema.columns`, `select count(*) from card_discriminators` → 0, CHECK rejection test (`update cards set yield_tier='extreme'` → expect violation), defaults check on the 20 seed cards.
- RLS spot-check — needs Supabase SQL editor with two impersonated users; deferred to laptop session.
- Backfill of meaningful (non-default) enum values for the 20 seed cards — deferred to manual authoring once Phase 4 lands. Backfilling now would lock arbitrary guesses.
- Validating trigger for `cards.primary_system_id ↔ card_ontology_tags` primary tag — deferred per D21 "Revisit if" clause; revisit if drift becomes a problem.

**Open questions for next session:**
- Strategic Review Checkpoint (PHASES.md L61–71) is still queued between Phase 2 DoD and Phase 3 start. The D21 work doesn't change that schedule but does mean Phase 4 (plan generator) is now unblocked once m004 is pushed.
- Whether the planner's first pass should treat `review_priority` as a separate signal or fold it into the `yield × danger × board` algebra — answer comes from Phase 4 implementation; if it's pure overhead, drop in a follow-up forward migration.
- Whether Phase 4's prompt should emit these enums directly or accept LLM proposals for them. D6/D13 imply emit-required; surface in the Phase 4 prompt design.

---

## 2026-04-27 — Phase 1 Step 6: seed 20 cards across 3 clusters

**Phase + step:** Phase 1 step 6 — seed real card data so the schema survives contact with actual content. Last step of Phase 1. Phase 2 (review loop) is now unblocked.

**What changed:**
- `scripts/seed_cards.mjs` (new) — idempotent seed script. Ensures the Supabase auth user exists (creates via admin API if not present), inserts 3 clusters (Heart Failure GDMT, Hyponatremia, DKA / HHS), 20 human-authored reviewed cards, 20 `card_retrieval_metadata` rows, 20 `card_ontology_tags` rows (primary tag each), and 20 `cluster_memberships`. Skips if seed clusters already exist.
- `ARCHITECTURE.md` §7 file layout — added `seed_cards.mjs` entry.
- `ARCHITECTURE.md` — bumped "Last updated" header to reflect seeded state.

**Seed data applied to kekki-prod 2026-04-27.** Verified row counts: 3 clusters, 20 cards, 20 card_retrieval_metadata, 20 card_ontology_tags, 20 cluster_memberships. User `zachspahr@gmail.com` created in auth.users and public.users via admin API (email_confirm:true — no invite email sent; magic-link flow will use the same account).

**Concept IDs used:**
- `cardiovascular_disease.myocardial_disease` (subsection) — 6 HF GDMT cards
- `cardiovascular_disease.myocardial_disease.heart_failure_with_preserved_ejection_fraction_hfpef` (topic) — 1 HFpEF card
- `nephrology_and_urology.water_and_electrolyte_balance.hyponatremia` (topic) — 7 hyponatremia cards
- `endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus` (topic) — 6 DKA/HHS cards

**Verification:**
- `pnpm typecheck` ✅
- `pnpm build` ✅
- Seed script output: all 20 rows inserted cleanly, row count verification passed.

**Blocked / deferred:**
- Migration 004 (planning fields + `card_discriminators`) — still deferred; planning enums not yet locked in DECISIONS.md.
- Pre-existing security advisor WARNs from 001 — not addressed here.

**Open questions for next session:**
- Phase 2 (review loop): `/clusters`, `/clusters/[id]`, `/review/[session_id]`. Seed data is now in place to drive this.
- 🛑 Strategic review checkpoint fires after Phase 2 DoD is green — do not skip.

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

## 2026-04-27 — Phase 1 steps 3+4+5: Supabase magic-link auth

**Phase + step:** Phase 1 steps 3 (auth), 4 (protected route group), 5 (dashboard). All three landed together in this PR — they're tightly coupled and splitting them produces three trivially small, mutually dependent PRs.

**Branching:** opened off `origin/main` rather than the in-flight `claude/interesting-chebyshev-7f1f21` branch (PR #3, migration 003). The two PRs are functionally independent — auth doesn't depend on the schema changes in 003 — so working in parallel and resolving any tiny doc conflicts at merge time was cleaner than serializing.

**Critical Next.js 16 surprise:** `middleware.ts` no longer exists — Next 16 renamed the file convention to `proxy.ts`. The export is `proxy()` (default or named), `config.matcher` works the same. AGENTS.md was warning about exactly this. Every Supabase + Next.js tutorial online uses `middleware.ts`, which **does nothing** in Next 16. Documented in ARCHITECTURE.md §6 + §7 so this doesn't surprise the next session.

**What changed (code):**
- `lib/supabase/server.ts` — `createServerClient` factory using `cookies()` from `next/headers`. The `setAll` adapter swallows errors thrown from Server Components (read-only context); `proxy.ts` rewrites cookies on every request anyway.
- `lib/supabase/client.ts` — `createBrowserClient` factory for Client Components.
- `lib/supabase/middleware.ts` — `updateSession(request)`: builds a `NextResponse`, creates a server client wired to `request.cookies` + `response.cookies`, calls `auth.getUser()` to refresh the access token, returns the response with rewritten cookies. Comment in the file flags loudly why `getUser()` not `getSession()` — the latter doesn't refresh.
- `proxy.ts` (repo root) — calls `updateSession`. `config.matcher` excludes `_next/static`, `_next/image`, `favicon.ico`, and common image extensions.
- `app/login/page.tsx` — magic-link form. Server component reads `searchParams` (async in Next 16) for `status=sent` and `error` banners.
- `app/login/actions.ts` — `signInWithEmail` Server Action: validates email, builds an absolute callback URL from `x-forwarded-host`/`host`, calls `signInWithOtp` with `emailRedirectTo` + `shouldCreateUser: true`, redirects to `/login?status=sent` or `/login?error=...`. The `shouldCreateUser` flip-point is documented inline — when invite-code gating lands in Phase 8 (D1), flip to `false`.
- `app/auth/callback/route.ts` — GET handler exchanging `?code=` for a session, then redirecting to `?next=` or `/dashboard`. Honors `x-forwarded-host` for Vercel preview URLs.
- `app/(app)/layout.tsx` — auth gate. Calls `getUser()`; redirects to `/login` if absent. Every page under `(app)` is guaranteed authenticated.
- `app/(app)/dashboard/page.tsx` — shows email + stub "No clusters yet" + sign-out form.
- `app/(app)/dashboard/actions.ts` — `signOut` Server Action.

**What changed (deps):** added `@supabase/ssr ^0.10.2` (sign-off received in plan-mode). `@supabase/supabase-js` was already present.

**What changed (docs):**
- `CLAUDE.md` — env-vars section flipped from "Currently required: none" to listing the 3 Supabase vars as currently required.
- `ARCHITECTURE.md` §2 stack table — marked `@supabase/ssr` installed.
- `ARCHITECTURE.md` §4 routes — moved `/login`, `/auth/callback`, `/dashboard` from "Planned" to "Live now" with the actual handler types.
- `ARCHITECTURE.md` §6 Auth + RLS — replaced the "ssr will land" placeholder with the actual cookie + session flow (4 numbered steps), the "why redirect from layout, not proxy" rationale, and the sign-out flow.
- `ARCHITECTURE.md` §7 file layout — added all the new files; removed `/lib/supabase/` and `/app/(app)` from "Planned additions".
- `PHASES.md` Phase 1 steps 3, 4, 5 — marked DONE 2026-04-27 with one-line implementation notes per step.

**Verification:**
- `pnpm typecheck` ✅
- `pnpm build` ✅. Build output explicitly shows `ƒ Proxy (Middleware)` confirming Next 16 picked up `proxy.ts`. Routes: `/`, `/login`, `/auth/callback`, `/dashboard`, `/_not-found` — all expected.
- End-to-end magic-link flow not yet verified — Zach to do this locally after setting Vercel env vars + Supabase Studio redirect URLs (see "Manual steps" below).

**Manual steps Zach owns (not bypassable from inside Claude Code):**
1. **Vercel env vars.** Vercel → kekkimed → Settings → Environment Variables. Add for **Production** and **Preview** (and Development if desired): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (mark Sensitive). Values from Supabase Studio → Project Settings → API.
2. **`.env.local` at parent project dir** (`C:\Users\Zach\Documents\Claude\Projects\Kekki\.env.local`) — same three vars, for `pnpm dev` locally.
3. **Supabase Studio → Authentication → URL Configuration.** Set Site URL to `https://kekkimed.com`. Add Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://kekkimed.com/auth/callback`
   - `https://kekkimed-*.vercel.app/auth/callback` (preview deploys; wildcard required)
4. Optionally customize the Magic Link email template (Studio → Authentication → Email Templates).

**Branching / merge note:** this PR was opened off `origin/main` while PR #3 (migration 003) is still pending merge. PR #3's doc edits to `ARCHITECTURE.md` (§3 table list, "Last updated" stamp, migration cadence row, the cards row), `PHASES.md` (Phase 1 DoD line, step 1b/1c), `DECISIONS.md` (D20 amendment), and `SESSION_LOG.md` (top entry) do not overlap with the auth doc edits structurally, but the "top of `SESSION_LOG.md`" and "Last updated" lines may produce 1–3 line conflicts when both PRs merge. Trivial to resolve in a rebase.

**Blocked / deferred:**
- End-to-end auth verification — needs the manual steps above first.
- The 5 pre-existing security advisor lints from migration 001 — still flagged for a follow-up cleanup migration, not addressed here.

**Open questions for next session:**
- After auth ships and Phase 1 step 6 (seed 20 cards) lands, decide planning-layer enums for migration 004 and lock in DECISIONS as D21.
- Phase 2 (review loop) is the natural next step once Phase 1 closes.

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
