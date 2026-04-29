# Kekki — Locked Decisions

Every entry is load-bearing. If Claude Code wants to revisit one, surface the conflict in `/plan` mode and wait for Zach's approval before acting.

Format: **decision**, followed by **rationale** (why), and **trigger to revisit** (what real-world signal would justify reopening it).

---

## D1 — Closed beta with public face

Invite codes gate signup; the landing page is public. Architected multi-tenant from day one so the Phase 8 rollout is a feature-flag flip, not a rewrite.

**Why:** preserves ambition while minimizing legal, support, and reputational surface area during a fellowship-application year.
**Revisit if:** waitlist crosses ~200 qualified IM residents and content/review pipeline is keeping up.

---

## D2 — Stack: Next.js 14 + Supabase + Tailwind/shadcn + Claude Haiku on Vercel

Every hard part — auth, hosting, DB, email, deploys — is vendored. No self-hosted infra. No exotic libraries.

**Why:** Zach is new to coding. Every hour should go to product logic, not plumbing.
**Revisit if:** Supabase free/Pro tier becomes a real bottleneck, or LLM cost per user exceeds $1/month at 100+ active users.

---

## D3 — No LLM in the review loop

Card review is: prompt → reveal → binary self-rate. No scoring, no grading, no per-card generation.

**Why:** cost control, latency, and the product thesis is that the reviewed content layer is the moat — not algorithmic flourish.
**Revisit if:** user research shows free-text recall meaningfully beats self-rate for learning, measured on the same users.

---

## D4 — Crude interval scheduler, not FSRS

Scheduling is cluster-level. A Postgres query surfaces clusters not reviewed in N days, weighted by recent miss rate. Binary ratings are logged but do not drive per-card scheduling in v1.

**Why:** matches the product thesis ("a cluster of cards at crude intervals"). Simpler to reason about. No runtime dependency on FSRS.js.
**Revisit if:** users explicitly ask for per-card scheduling, or internal metrics show rote repetition of mastered cards inside clusters.

---

## D5 — Controlled vocabulary (ontology)

All structured topic labels must map to an `id` in `kekki_ontology_v0.json`. LLM prompts are constrained-enum over the ontology; no free-text topics enter the DB.

**Why:** prevents data fragmentation. The planner cannot match gaps to clusters if "hyponatremia," "Hyponatremia," and "SIADH/CSW" live as separate strings.
**Revisit if:** the ontology proves too coarse or too fine after 30 days of real intakes; expected outcome is refinement, not removal.

---

## D6 — Three LLM call sites only — SUPERSEDED 2026-04-29 by D22

> **Superseded 2026-04-29 by D22** (zero-LLM pivot). Body retained below as historical context — do not act on it.

Intake parser, plan generator, and private AI card generator. Nothing else.

1. **Intake parser** — free text → structured gaps mapped to ontology IDs.
2. **Plan generator** — gaps + cluster library → ordered plan.
3. **Private AI card generator** — gap-anchored card creation with the guardrails in D13.

**Why:** caps API cost at predictable per-user-per-cycle spend. Keeps prompts auditable in `/prompts`. The third site (added 2026-04-26) is gated by D13's guardrails so it cannot become a back door for unbounded LLM use.
**Revisit if:** a genuinely new need appears (e.g., card deduplication, synonym expansion, free-text answer review). Adding a call site requires a new entry in this file. Removing one — particularly site #3 if guardrails fail — also requires a new entry.

---

## D7 — Clinical content rules

Every card authored from lawful sources with original expression only. No ingested third-party qbank stems, answer choices, rationales, tables, or screenshots. Draft status → 24-hour cooldown → promote to reviewed. Retired cards are flagged, never deleted.

The `cards.citation` field is required and DB-enforced (`NOT NULL` on the column). This applies to all sources — `human`, `external_pipeline`, and `ai_private`. A card without a citation cannot exist in the database.

**Why:** legal risk containment (prospectus doc section 6). Trust hierarchy is a core product feature, not an afterthought. DB-level enforcement keeps the rule outside any single application path that could be bypassed by a future endpoint.
**Revisit if:** licensed content partnership is signed with explicit rights; until then, do not touch.

---

## D8 — Plan shape: 5-15 clusters, 7-14 day window

A plan is an ordered sequence of 5-15 cluster reviews with a soft target window of 7-14 days. Completion = all items done OR the window elapses.

**Why:** cheap to implement, readable by a user, matches real resident study cadence.
**Revisit if:** users consistently blow past 14 days or finish plans in 3.

---

## D9 — Binary self-rate (Again / Good), always logged

Logging is non-negotiable even when the feature using the log isn't built yet. Store card_id, user_id, rating, session_id, timestamp.

**Why:** forward capture is cheap; retroactive reconstruction is impossible. Future weakness-detection features will need this data.
**Revisit if:** three-button rating (Again / Hard / Good) becomes necessary — but keep the binary log as the source of truth.

---

## D10 — Budget discipline

Year-one spend cap ~$1,100. No contractors, designers, lawyers, physician reviewers, or paid ads until user traction justifies it. Legal docs from a Termly or Iubenda template. Trademark filing deferred until Phase 8 has produced real users.

**Why:** force a product-market-fit signal before spend. Matches Zach's personal constraints.
**Revisit if:** product hits 50+ active beta users and retention is acceptable; then spend for lawyer review, logo polish, and trademark filing.

---

## D11 — Plan mode (`/plan`) is mandatory

Every Claude Code session starts with `/plan`. No exceptions unless Zach explicitly says "skip planning" in that session.

**Why:** Zach is a first-time reviewer of code and cannot catch silent mistakes in a 400-line diff. Plan mode forces intent to be read before edits are made.
**Revisit if:** never. This is a workflow decision, not an architectural one.

---

## D12 — Retired (superseded by D13, 2026-04-26)

Originally: "Card generation lives outside this repo." Retired because the in-repo private AI card generator (LLM call site #3, D6) makes the absolute statement false. The retained substance — that **bulk** card authoring lives in an external pipeline that posts to `POST /api/cards/import` — is folded into D13 alongside the in-repo guardrails. Number kept as a stub so historical references stay stable; do not reuse.

---

## D13 — Private AI card generation, with guardrails — SUPERSEDED 2026-04-29 by D22

> **Superseded 2026-04-29 by D22** (zero-LLM pivot). The private AI card generator is removed from this repo. Bulk external authoring posting to `POST /api/cards/import` survives. Body retained below as historical context — do not act on it.

Added 2026-04-26. The repo includes a private, gap-anchored AI card generator (LLM call site #3 in D6). It is not a substitute for human authorship; it is a scaffolding tool for the user. The following guardrails are non-negotiable and must be implemented as a unit:

1. **Private-only.** Cards generated through this path are owned by the requesting user. They are never visible to other users in any state. They never auto-promote.
2. **Ontology-constrained.** Topic tags must resolve to an `id` in `kekki_ontology_v0.json` (D5). The prompt returns ontology IDs, not free-text topic names.
3. **Citation required.** The model must produce a citation for every card. The `cards.citation` column is `NOT NULL` (D7); a card without a usable citation is rejected before save.
4. **Gap-anchored prompts.** A generation request must reference an existing `structured_analytics` row (a recorded gap) or a user-named ontology ID. Cards cannot be generated from arbitrary free-text prompts.
5. **Attach-to-cluster required.** Each request specifies a target cluster — either an existing user-owned cluster or a new cluster created in the same flow. No orphan cards.
6. **Rate-limited 10 cards / user / local-day.** The limit is per user, scoped to the user's local calendar day (server reads the user's `timezone` and bounds the count). The limit applies to the number of cards generated, not the number of requests. Burst beyond the limit returns a friendly rejection.
7. **Draft → 24h cool → human-reviewed.** Output lands as `status='draft'`, `source='ai_private'`. Promotion to `reviewed` requires both (a) ≥24 hours since creation and (b) an explicit human action by the owning user. There is no auto-promote.
8. **Bulk authoring stays external.** Anything beyond per-request, gap-anchored, rate-limited generation belongs in the external pipeline that posts to `POST /api/cards/import`. The in-repo path is not a place to scale card production.

**Why:** the original "no card generation in-repo" rule (retired D12) was too strict for the actual product need — a resident hits a gap and wants one or two cards on the spot. The guardrails preserve every property that mattered in D12 (cost containment, no proprietary stems, human-in-the-loop) while admitting the legitimate use case. Each guardrail closes a specific failure mode: rate limit caps cost, attach-to-cluster prevents orphan content, draft cooling prevents regretted late-night cards going public, source field makes AI-vs-human auditable forever.
**Revisit if:** the rate limit proves either too tight (users hitting it on legitimate study sessions) or too loose (a single user driving runaway cost). Also revisit if real usage shows AI cards are systematically lower quality than human cards even after review — that would mean the guardrails aren't enough and the path should be retired.

---

## D14 — Two-layer parser stem rejection — SUPERSEDED 2026-04-29 by D22

> **Superseded 2026-04-29 by D22** (zero-LLM pivot). No free-text intake → no qbank-stem ingestion path → no rejection layer needed. Body retained below as historical context — do not act on it.

Added 2026-04-26. The intake parser must refuse proprietary qbank stems via two independent layers, both required:

1. **Heuristic precheck** (in code, before the LLM is called) — regex/structural detection of qbank-stem signatures (enumerated answer choices, "The correct answer is", "Educational Objective:", lettered choice + rationale combos). A match short-circuits the request: no tokens spent, no input persisted, friendly rejection returned.
2. **LLM constraint** (in `/prompts/intake.md`) — the model is instructed to refuse and return `{"rejected": true, "reason": "..."}` if the input still appears to be proprietary qbank content. The server treats this as a non-error rejection and never proceeds to ontology mapping.

**Why:** D7 forbids ingesting third-party qbank content; without an enforcement layer, that rule lives only in good intentions. Two layers because heuristics miss paraphrased stems (catch with the LLM) and LLMs sometimes power through obvious cases (catch with regex). Defense in depth is cheap here.
**Revisit if:** real intake traffic shows either layer producing a meaningful false-positive rate (rejecting legitimate user narratives), or the LLM layer producing false negatives that the heuristic should have caught — both indicate a tuning need, not a design failure.

---

## D15 — Card labeling rules

Added 2026-04-26. Every card displayed in the review UI shows two pieces of labeling, rendered from data, not optional:

1. **Universal disclaimer:** **"Educational study aid. Not clinical guidance."** Shown on every card, every source, every status.
2. **AI-unreviewed badge:** **"AI-generated, unreviewed"** shown on cards with `source='ai_private'` AND `status='draft'`. The badge is removed automatically once status flips to `reviewed`. Cards with `source='human'` or `source='external_pipeline'` never display this badge.

**Why:** the labels are both an editorial signal (this is study material, not patient advice) and a legal one (defends against any claim that a user mistook AI output for vetted content). Rendering from data means a future component refactor cannot accidentally drop the disclaimer.
**Revisit if:** legal counsel (when retained per D10) recommends different language. The mechanism stays; the strings may change.

---

## D16 — Closed beta is free; pricing TBD with study-unit framing externally, token metering internally

Added 2026-04-26.

- The closed beta (D1) is **free** for invited users. No paywalls, no trial logic, no entitlement checks during the beta period.
- Post-beta pricing is **TBD**. When pricing is decided:
  - **External framing** uses **"study units"** — a user-readable abstraction over the underlying work (intake runs, plan generations, AI cards generated, etc.). Users do not see token counts.
  - **Internal accounting** uses **token metering** at the three LLM call sites. A `usage_events` table (or equivalent) logs tokens per user per call site per day. This is the data billing will eventually be built on.
- Do **not** implement billing infrastructure (Stripe, subscriptions, entitlement checks) until Phase 8 has run for ≥4 weeks with real users and a pricing decision exists.

**Why:** premature billing logic distracts from product. But token metering is forward-capture (D9 logic): cheap to add at the same time the call sites are built, expensive to retrofit. Separating internal metering from external framing lets us change the unit users see (per-month, per-plan, "100 study units") without touching the metering plumbing.
**Revisit if:** Phase 8 produces real usage and a pricing decision is needed. Until then, this is locked.

---

## D17 — Four-layer tagging framework (concept / context / qtype / difficulty)

Added 2026-04-26. Adopts the four-layer model from `Medical_Knowledge_Ontology.md` as the structural basis for card tagging and analytics. The layers are orthogonal and each lives in its own typed column on `cards`:

1. **Concept** — `concept_ids text[]`. The atomic medical idea (disease, drug, test, skill). Stored in a polyhierarchical `concepts` table; multiple parents allowed via `concept_parents (child_id, parent_id, is_primary)`. The `concepts` table replaces what earlier docs called `topics`. Canonical seed file: `kekki_concepts_v1.json` (Zach to author).
2. **Clinical context** — `contexts text[]`. CHECK constrained to `(acute, chronic, screening, complication)`.
3. **Question type** — `qtypes text[]`. CHECK constrained to `(diagnosis, management, interpretation, prognosis, mechanism)`.
4. **Difficulty** — `difficulty text NOT NULL`. CHECK constrained to `(core, advanced, trap)`. Single value per card.

Performance tags (`status:correct/slow/wrong/unseen` from the framework doc) are **NOT stored**. They are derived from `reviews` at query time:
- `unseen` — no row exists for `(user_id, card_id)`.
- `wrong` — most recent rating is `again`.
- `slow` — most recent rating is `good` AND `time_ms > 90000`.
- `correct` — most recent rating is `good` AND `time_ms <= 90000`.

To support derivation, `reviews` carries a `time_ms int NULL` column populated by the Phase 2 review UI.

This entry **supersedes the single-dimension topic interpretation in D5.** D5's force is unchanged: the LLM is constrained to return concept slugs from the curated `concepts` table; no free-text concepts enter the DB. What changes is the *target* of the constraint — it's the curated concepts list, not `kekki_ontology_v0.json`.

**Why:** the framework lets one card be filtered four ways (study, exam-sim, weakness-drill, cognitive-pattern) without re-coding. Polyhierarchy lets cross-system concepts (e.g., amyloidosis in cardio AND nephro) avoid duplication. Separate typed columns over a unified `tags text[]` because DB-level CHECK constraints are cheaper to maintain than application-level tag validation. Performance is derived rather than tagged because the source of truth is `reviews`; pre-tagging would create a stale-data problem.
**Revisit if:** real card authoring shows the four layers under-fit (need a fifth dimension) or over-fit (one layer is always empty). Also revisit if performance derivation queries become slow at scale — then materialize them into a `card_user_state` table rather than re-tagging.

---

## D18 — ABIM concept ID scheme and seed rules

Added 2026-04-26. The canonical controlled vocabulary is the ABIM Internal Medicine Certification blueprint (January 2026), seeded from `abim_blueprint_v1.json` (18 systems, ~230 subsections, ~1,500 topics). This entry governs how concept IDs are constructed and how the blueprint is transformed into DB rows.

**ID format:** dot-delimited snake_case, three levels:
- **System:** `<system_slug>` — e.g., `cardiovascular_disease`
- **Subsection:** `<system_slug>.<subsection_slug>` — e.g., `cardiovascular_disease.dysrhythmias_and_conduction_defects`
- **Topic:** `<system_slug>.<subsection_slug>.<topic_slug>` — e.g., `cardiovascular_disease.dysrhythmias_and_conduction_defects.atrial_fibrillation`

**Slug sources:**
- System slug: taken from `system_slug` field in JSON (pre-computed: lowercase, non-alphanumeric → `_`, collapse repeats, strip trailing `_`).
- Subsection slug: taken from `subsection_slug` field in JSON, prefixed with `<system_slug>.`.
- Topic slug: taken from `topic_slugs[i]` field in JSON, prefixed with `<system_slug>.<subsection_slug>.`.

**Column rules for the seed script:**
- `level`: `'system'` / `'subsection'` / `'topic'` — set explicitly, never inferred.
- `weight`: parse `exam_percent` string. `"14%"` → `0.14`. `"<2%"` → `0.01`. Applies to system and subsection rows. Topic rows get `NULL`.
- `synonyms`: empty array `{}`. ABIM JSON has none; enrichment is a future step via a separate data file or migration.
- `ontology_source`: always `'abim_blueprint'`. Do not override.
- `ontology_version`: always `'jan_2026'`. Do not override.

**Parent edges (`concept_parents`):**
- Every subsection → its system (`is_primary = true`).
- Every topic → its subsection (`is_primary = true`).
- All edges in this seed are primary (single-parent by definition in the ABIM blueprint).

**Idempotency:** `INSERT ... ON CONFLICT DO UPDATE` for concepts; DELETE-then-INSERT scoped by `child_id` for `concept_parents`. Safe to re-run.

**Why:** a three-level dot-delimited ID makes parent traversal and prefix-matching trivially expressible in SQL (`id LIKE 'cardiovascular_disease.%'`). Keeping slugs in the JSON means the extraction script is deterministic and does not need to re-derive them.
**Revisit if:** a new ABIM blueprint version ships (then bump `ontology_version` and re-run the seed); or if a fourth level (sub-topic) is needed — that would require a migration to add the `'subtopic'` value to the `level` CHECK.

---

## D19 — `card_ontology_tags` replaces `cards.concept_ids[]`

Added 2026-04-26. Migration 002 drops `cards.concept_ids text[]` and its array-validator trigger, replacing them with the `card_ontology_tags` table. This is a proper relational m:m with FK enforcement at the row level — cleaner than the array trigger approach in migration 001.

**Schema (key columns):**
- `card_id uuid` + `concept_id text` + `tag_role text` — composite primary key.
- `tag_role` CHECK: `('primary','secondary','bridge','planning_only')`. Exactly one `primary` tag per card (enforced by partial unique index). `bridge` is used for cross-system concepts (e.g., amyloidosis under both cardiology and nephrology). `planning_only` is for planner-vocabulary concepts not used in content classification.
- `granularity text` CHECK: `('system','subsection','topic')` — denormalized from `concepts.level` so queries can filter without joining `concepts`.
- `confidence numeric` 0.0–1.0. Human-authored tags = 1.0. LLM-produced tags carry the model's self-reported value.
- `tag_source text` CHECK: `('canonical','script','manual_override','model','import')` — provenance of the tag.
- `tagger_version text NULL` — version string for the script or model that produced the tag; used to invalidate stale tags when a tagger changes.
- `review_status text` CHECK: `('accepted','needs_review','rejected')`.

**RLS:** SELECT derives from `cards` visibility (reviewed OR author). WRITE restricted to card author. Service role bypasses both.

**Migration cadence:** 001 applied (base schema). 002 applies in the session where this entry is written (ABIM ontology + `card_ontology_tags`). 003 (retrieval metadata / lattice) and 004 (planning fields + discriminator graph) are separate Claude Code sessions.

**Why:** a proper FK table enforces concept-ID validity at the DB level without the bespoke trigger in 001. The `tag_role` + `confidence` + `tag_source` columns give the planner enough metadata to weight uncertain or cross-system tags without an additional lookup table.
**Revisit if:** a fifth `tag_role` value is needed (e.g., `excluded` for negative training signal); or if `card_ontology_tags` query latency becomes a bottleneck at scale — then consider a materialized tag summary per card.

---

## D20 — Card metadata enum lock (lattice / cognitive_task / card_format / cloze)

Added 2026-04-26. Locks the vocabulary every card-authoring path (in-repo AI generator D13, external import pipeline `POST /api/cards/import`, manual authoring) must speak. These values become CHECK constraints in migration 003 (retrieval metadata) and migration 004 (planning + discriminators). Pipelines that emit cards in other vocabularies are rejected at import.

**Lattice codes** — captures the primary clinical relationship the card teaches.

- `cards.primary_lattice text NOT NULL CHECK (primary_lattice in ('t_to_m','p_to_e','e_to_o','s_to_r'))` — exactly one per card.
  - `t_to_m` = Trigger/Clue → Mechanism or Diagnosis
  - `p_to_e` = Presentation → Empiric Regimen or Initial Treatment
  - `e_to_o` = Exposure/History/Context → Organism or Etiology
  - `s_to_r` = Patient State/Severity → Risk, Complication, or Prognostic Implication
- `cards.secondary_lattices text[]` with subset CHECK against `('d_to_t','tst_to_int','sev_to_act','tx_to_mon','cx_to_avoid','dx_to_diff','fu_to_next')`. Zero or more per card.
  - `d_to_t` = Diagnosis → Treatment
  - `tst_to_int` = Test → Interpretation
  - `sev_to_act` = Severity → Action
  - `tx_to_mon` = Treatment → Monitoring
  - `cx_to_avoid` = Contraindication/Complication → Avoid
  - `dx_to_diff` = Diagnosis → Differential/Discriminator
  - `fu_to_next` = Follow-up → Next Step

**Cognitive task** — `card_retrieval_metadata.cognitive_task text NOT NULL CHECK in ('diagnosis_from_clues','management_treatment','test_lab_threshold','mechanism_pathophys','association_risk','classic_feature_pattern','multi_answer_list','term_alias_definition','eponym','superlative_rank','compressed_factoid_other')`.

**Card format** — `cards.card_format` enum expanded 4 → 9, matching the lattice-bible 9-format menu: `single_term_direct_cloze`, `bidirectional_term`, `clue_diagnosis_contrast`, `eponym`, `linked_cloze_threshold`, `management_triplet`, `pairing_matrix`, `complete_set_same_cloze`, `image_first_recognition`. Migration 003 will run `ALTER TABLE cards DROP CONSTRAINT cards_card_format_check; ALTER TABLE cards ADD CONSTRAINT cards_card_format_check CHECK (card_format in (...))` to widen the existing 4-value check from migration 001.

**Tag role** — `card_ontology_tags.tag_role CHECK in ('primary','secondary','bridge','planning_only')`. Already locked by D19; restated here so this entry is self-contained as the canonical metadata vocabulary.

**Granularity** — `card_ontology_tags.granularity CHECK in ('system','subsection','topic')`. Denormalized from `concepts.level` for fast filter without join. Already locked by D19; restated here.

**Cloze One By One** — `card_retrieval_metadata.requires_cloze_one_by_one boolean NOT NULL DEFAULT false`, `card_retrieval_metadata.cloze_grouping text NULL` (e.g., `same_c1`, `separate`, `none`). First-class because the lattice-bible 9-format menu treats it as the default for multi-part retrieval.

**Format review status** (amendment 2026-04-26) — `card_retrieval_metadata.format_review_status text NOT NULL DEFAULT 'likely_ok' CHECK in ('likely_ok','revise_format','manual_review','approved')`. Vocabulary taken from `flashcard_database_design.md` §5 to match the external pipeline's emitted values; using a different vocabulary on the in-repo path would force the import endpoint to re-map. **Distinct from `card_ontology_tags.review_status` (D19),** which covers tag acceptance — `format_review_status` covers quality of the *format choice* for the card. Two columns because the failure modes differ: a tag can be wrong while the format is fine, and vice versa.

**Why:** these enums are the contract between every card producer (in-repo AI, external pipeline, manual authoring) and every consumer (planner, review UI, analytics, import validator). Drift between producer and consumer = broken queries and silent miscategorization. CHECK constraints push validation to the DB so no application path can bypass them. Locking them here means migration 003's SQL must encode exactly these values, not negotiate with itself; and the import endpoint can validate cleanly against this single source of truth.
**Revisit if:** real card authoring surfaces a missing value (e.g., a card teaches a clinical pattern that doesn't fit any lattice code). Add to the enum via a forward migration; do not silently coerce or repurpose existing values. The import endpoint should hard-fail unknown values rather than guess.

---

## D21 — Planning-layer enum lock (yield / danger / board / source / review_priority)

Added 2026-04-28. Locks the vocabulary the cluster planner consumes when ranking cards into 5–15-card review windows. These values become CHECK constraints in migration 004 and are the contract every card-authoring path (manual, in-repo AI per D13, external pipeline `POST /api/cards/import`) must speak. Sister entry to D20: D20 covers what the card *teaches*; D21 covers how the planner *prioritizes* it.

**Yield tier** — `cards.yield_tier text NOT NULL DEFAULT 'medium' CHECK (yield_tier in ('high','medium','low'))`. Vocabulary from "Flash Card Generation PRACTICE_PATTERNS.md" §"Yield gate." `high` = common, frequently encountered, board-favored. `medium` = standard internal-medicine knowledge. `low` = niche but worth knowing. Distinct from `board_likelihood` (yield = should you know it; board_likelihood = will ABIM ask it).

**Danger level** — `cards.danger_level text NOT NULL DEFAULT 'moderate' CHECK (danger_level in ('low','moderate','high','lethal'))`. Clinical risk if the gap goes unaddressed. `lethal` is a separate tier above `high` because the planner needs a dedicated "must-not-miss" trump (anaphylaxis, malignant hyperthermia, tamponade) without conflating it with serious-but-survivable morbidity.

**Board likelihood** — `cards.board_likelihood text NOT NULL DEFAULT 'medium' CHECK (board_likelihood in ('high','medium','low'))`. ABIM-specific testing probability. Same shape as `yield_tier` so the planner can multiply them cleanly.

**Source strength** — `cards.source_strength text NOT NULL DEFAULT 'narrative_review' CHECK (source_strength in ('society_guideline','primary_trial','systematic_review','narrative_review','expert_opinion'))`. Categorical, not the integer 1–5 scale used by `flashcard_database_design.md` L137 for the future `sources.source_quality` column. Reason: D6/D13 require constrained-enum LLM outputs; strings carry semantics the model already speaks ("primary_trial" beats "5"). When the future `sources` table lands, it keeps the integer for raw provenance; `cards.source_strength` is the planner-facing rollup. Reconcile via a view, not by changing the enum.

**Review priority** — `cards.review_priority text NOT NULL DEFAULT 'medium' CHECK (review_priority in ('high','medium','low'))`. Card-level intrinsic hint that lets the author override the yield × danger × board algebra for an individual card. **Distinct from** the per-user computed `learner_card_state.priority_score real` in `flashcard_database_design.md` L301 — `review_priority` is author-provided, `priority_score` is derived from weakness × yield. On probation: if Phase 4's first planner pass shows it adds nothing over yield × danger × board, drop it via a forward migration.

**System IDs** — `cards.primary_system_id text NULL REFERENCES concepts(id) ON DELETE RESTRICT`, `cards.secondary_system_ids text[] NOT NULL DEFAULT '{}'`, `cards.bridge_reason text NULL`. These denormalize the system-level placement from `card_ontology_tags` (D19) for fast planner queries. Polyhierarchical concept tagging (D17) still lives in `card_ontology_tags`; `primary_system_id` is a planner shortcut, not a replacement. `secondary_system_ids` has no row-level FK enforcement (parallel to the `concept_ids[]` validator trigger m002 dropped) — validate at the app layer; tighten via trigger if drift becomes a problem. `bridge_reason` is the human-readable rationale when `secondary_system_ids` crosses a system boundary (e.g., amyloidosis under cardiology with `bridge_reason = 'restrictive cardiomyopathy presentation'`).

**Card discriminators graph** — `card_discriminators (source_card_id, target_card_id, discriminator_key, created_at, created_by)`. Directed edges between cards that share a discriminator key (the `discriminator text` column on `card_retrieval_metadata` from migration 003). Lets the planner schedule confusable cards together for contrast review. Composite primary key on `(source_card_id, target_card_id, discriminator_key)`; CHECK `source_card_id <> target_card_id`; cascade on card delete; `created_by` set-null on user delete. RLS posture mirrors `card_ontology_tags` (D19): SELECT requires both endpoints visible to the caller (`cards.status='reviewed'` OR `author_user_id=auth.uid()` for both source and target); WRITE requires the caller to author at least one endpoint; service-role bypasses by default.

**Why:** the planner (Phase 4) needs categorical filters at the card level so a single SQL query can answer "give me 10 high-yield, lethal-if-missed cards I'm weak on this week." Numeric scoring (per `flashcard_database_design.md` §"Study-Plan Scoring Model" L393–406) happens at query time from these categoricals plus per-user state — the categoricals are the planner *inputs*, not a replacement for the model. Locking them as CHECK constraints (D20-style, not Postgres ENUMs) keeps every authoring path on the same vocabulary and forward-migrates cleanly when a new tier is needed.

**Revisit if:** (a) authoring surfaces a card that genuinely needs a 4th tier in `yield_tier` or `board_likelihood` — add via forward migration, do not repurpose; (b) the planner's first pass reveals `review_priority` is redundant with `yield × danger × board` — drop it via forward migration; (c) the future `sources.source_quality` integer scale needs a deterministic mapping into `source_strength` — add a view, do not change the enum; (d) `primary_system_id` drift from `card_ontology_tags` primary tag becomes a problem — add a validating trigger.

Cross-references: D6 (LLM call sites must emit constrained enums), D13 (private AI generation enforces these on emit), D17 (polyhierarchical concept tagging — `primary_system_id` is a denorm, not a replacement), D19 (`card_ontology_tags` RLS template), D20 (sister entry; card-teaching vocabulary). Implemented in `supabase/migrations/004_planning_layer.sql`.

---

## D22 — Pivot to zero-LLM, ontology-math study loop (supersedes D6, D13, D14)

Added 2026-04-29. Kekki removes all LLM call sites from this repo. Weakness comes from deterministic math on the ABIM blueprint (D18) and per-user review history. The product thesis becomes: **importance × (1 − competence) per topic, top-3 weakest, dynamic per-topic clusters drawn from the existing card library.** No free-text gap parsing, no LLM ranking, no in-repo AI card generation.

**The four locked specifics:**

1. **Zero LLM in this repo.** All three former call sites are removed. The `@anthropic-ai/sdk` dependency is dropped from `package.json`. The directories `lib/llm/` and `prompts/` are deleted. The LLM-specific intake helpers (`lib/intake/stem-rejection.ts`, `lib/intake/candidate-concepts.ts`) and the LLM-specific planner helper (`lib/plan/clusters-summary.ts`) are deleted. Bulk card authoring still happens externally and posts to `POST /api/cards/import` (Phase 6) — that survives unchanged.

2. **Topic-level math on 722 topics.** Each topic's importance = parent subsection's `exam_percent` (D18) divided evenly across the topics that share that parent subsection. Importance is computed in a SQL view `topic_importance_v` (joining `concepts` + `concept_parents`); never denormalized. Per-user competence ∈ [0, 1] is stored in a new `learner_topic_competence` table with `(user_id, concept_id)` PK, updated by EMA over `reviews` rows: `outcome = 1.0` if `rating='good' AND time_ms < 90_000`, `0.5` if `rating='good' AND time_ms >= 90_000`, `0.0` if `rating='again'`. Default α = 0.3.

3. **Three intake modes, all deterministic.**
   - **Self-report:** 18 system sliders 0–100%. Score distributed evenly across child subsections and topics.
   - **Standardized:** paste per-system % from a result the user already has (USMLE practice, NBME, etc.). Same distribution math.
   - **Evaluator:** sit a calibration session of 18 cards (one per system) sampled from the existing review-card library. Mild signal contamination accepted in V1. On finish, EMA-update competence per topic from the actual reviews recorded.
   All three write rows to `learner_topic_competence` with `source ∈ {self_report, standardized, evaluator, review}`. No free text accepted anywhere.

4. **Dynamic per-topic clusters at plan generation.** The deterministic planner (a) calls `refreshCompetenceForUser()` to fold in any new `reviews` since last run, (b) ranks topics by `importance × (1 − competence)` desc, (c) picks the top-3 with a parent-system diversity guard (falls back to subsection diversity if all weak topics sit in one system), (d) for each chosen topic, queries `card_ontology_tags` for cards tagged to that topic and inserts a new `clusters` row with `kind='ephemeral_topic'` and `source_topic_id` set, and (e) writes `study_plans` + `plan_items` referencing those clusters. Plan size is 3 (one cluster per weak topic). D8's "5–15 cluster window" is narrowed to exactly 3 in V1; revisit when there is real usage data.

**Effect on prior decisions:**

- **D6 superseded.** "Three LLM call sites" → "zero LLM call sites." Body retained for history.
- **D13 superseded.** Private AI card generator removed. The bulk external pipeline that posts to `/api/cards/import` survives.
- **D14 superseded.** No free-text intake → no qbank-stem ingestion → no rejection layer needed.
- **D17 retained, narrowed.** The four-layer card vocabulary (concept / context / qtype / difficulty) still drives queries. The "weakness signal" no longer comes from LLM-parsed gaps; it comes from `reviews` × `card_ontology_tags` rolled up to topic. The polyhierarchy + canonical concept slug rule is the foundation of the math.
- **D20 retained, re-scoped.** Lattice / cognitive_task / card_format enums remain card metadata. They are no longer LLM-prompt vocabulary; they are sort-within-cluster signals and future analytics inputs.
- **D21 retained, re-scoped.** Yield / danger / board / source enums remain card metadata. The deterministic planner ranks **topics** by importance × (1 − competence); these card-level enums act as tiebreakers when selecting cards from a topic's tag pool, not as planner inputs.
- **D16 narrowed.** Token metering is moot because there are no tokens. The `usage_events` schema stays (cheap), but no new writes occur from this repo. A future migration may drop it.
- **D8 narrowed.** Plan shape becomes exactly 3 cluster reviews (one per weak topic) instead of 5–15. The 7–14 day window concept is retired in V1; users regenerate plans on demand. Revisit once usage data exists.
- **D5, D18, D19 unaffected.** Controlled vocabulary, ABIM ID scheme, and `card_ontology_tags` are the load-bearing structure of the new math.

**Why:** the original three-LLM-site design (D6) was load-bearing on a hypothesis that free-text → structured-gap → LLM-ranked plan would be the intelligent layer of the product. Hands-on use of Phases 3 + 4 (shipped 2026-04-28 and 2026-04-29) showed the LLM was injecting variance, latency, and cost without producing better plans than what the ABIM blueprint percentages and review-derived competence already imply deterministically. The math model is reproducible, debuggable, free at runtime, and matches the way the user actually thinks about weakness ("Cardiology is heavy on the boards and I'm bad at it"). It also collapses Phase 7 (loop closure) to a one-paragraph "regenerate plan" since the math is the loop.

**Revisit if:** the deterministic loop produces visibly poor plans for users with sparse review history (the cold-start problem is the most likely failure mode, mitigated by the evaluator intake mode), or if user research shows free-text gap input materially beats the three-mode intake on usability, or if a new product surface (e.g., free-text answer evaluation, card deduplication, synonym expansion) emerges that genuinely needs an LLM. Adding any LLM call site back requires a new entry that names the site, the cost cap, and the legal containment posture.

Implementation locked in plan file `C:/Users/Zach/.claude/plans/i-would-like-to-keen-koala.md` and migration `supabase/migrations/005_competence_layer.sql`.
