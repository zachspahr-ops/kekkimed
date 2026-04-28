# AI Card Generator — Prompt Template

**LLM call site #3 (D6).** Used by the in-repo private AI card generator. Strictly bound by D13 guardrails (rate-limited 10/user/local-day, gap-anchored, attach-to-cluster required, citation enforced via DB CHECK, draft → 24h cool → human review → `reviewed`). Cards from this site **never auto-promote** — they always land at `source = 'ai_private'`, `status = 'draft'`.

The model is **Claude Haiku 4.5** (D2). Use temperature 0 and JSON-mode output. The server validates against the output schema before persisting through the same `/lib/cards/import-schema.ts` validator the bulk-import endpoint uses.

This is the most-guardrailed of the three LLM call sites because it's the only one that authors clinical content. Two principles dominate:

1. **Citation or refuse.** A card without a real, verifiable source is unusable. Hallucinated citations are worse than no card. The prompt instructs the model to refuse rather than fabricate.
2. **Constrained vocabulary everywhere.** Every enum field on the output (D7/D17/D19/D20/D21) maps to a CHECK constraint in the DB. The model picks from the listed values; the server's import validator rejects anything else.

---

## Inputs (server-injected)

- `{{gap_json}}` — the structured-analytics gap that anchors the card. Required.
  ```json
  {
    "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
    "severity": "high",
    "weakness_note": "missed osmolality threshold and correction-rate questions"
  }
  ```
  The card MUST be useful for the gap — same concept_id (or one of its descendants) anchored, and addressing the angle in `weakness_note` if that's specific enough to act on.

- `{{target_cluster_json}}` — D13 forbids orphan AI cards. Exactly one of these two shapes:
  ```json
  { "cluster_id": "5e8a...uuid" }
  ```
  or
  ```json
  { "cluster_definition": { "name": "Hyponatremia", "description": "Causes, workup, treatment thresholds" } }
  ```
  The server passes one or the other based on the user's UI choice (attach to existing vs. create new). Echo it verbatim in the output.

- `{{candidate_concepts_json}}` — same shape as `intake.md` (`/lib/intake/candidate-concepts.ts`). The server pre-filters to concepts adjacent to the gap (the gap's concept, its ancestors, its sibling subsections, the 18 systems). The model picks ontology tags from this list and never invents a slug.

- `{{user_request_json}}` — optional. The user's free-text narrowing of the request. Example: `"focus on chronic correction rate, not acute"`. May be empty.

- `{{today_iso}}` — current local date. Used in citation freshness reasoning ("if it's >5 years old and the topic is moving, downgrade source_strength").

---

## Output

Return **exactly one JSON object** matching one of the two shapes below. No prose before or after. JSON-mode is enforced server-side.

### Acceptance shape — exactly one card

```json
{
  "rejected": false,
  "card": {
    "prompt": "...",
    "answer": "...",
    "citation": "<author>, <journal/title>, <year>; <section/page>",
    "citation_kind": "guideline" | "primary_lit" | "textbook" | "uptodate" | "other",
    "difficulty": "core" | "advanced" | "trap",

    "primary_lattice": "t_to_m" | "p_to_e" | "e_to_o" | "s_to_r",
    "secondary_lattices": [],
    "card_format": "single_term_direct_cloze" | "bidirectional_term" | "clue_diagnosis_contrast" | "eponym" | "linked_cloze_threshold" | "management_triplet" | "pairing_matrix" | "complete_set_same_cloze" | "image_first_recognition",

    "yield_tier": "high" | "medium" | "low",
    "danger_level": "low" | "moderate" | "high" | "lethal",
    "board_likelihood": "high" | "medium" | "low",
    "source_strength": "society_guideline" | "primary_trial" | "systematic_review" | "narrative_review" | "expert_opinion",
    "review_priority": "high" | "medium" | "low",
    "primary_system_id": "<system-level concept id from candidates, or null>",
    "secondary_system_ids": [],
    "bridge_reason": null,

    "cognitive_task": "diagnosis_from_clues" | "management_treatment" | "test_lab_threshold" | "mechanism_pathophys" | "association_risk" | "classic_feature_pattern" | "multi_answer_list" | "term_alias_definition" | "eponym" | "superlative_rank" | "compressed_factoid_other",
    "prompt_frame": "<short label or null>",
    "answer_form": "<short label or null>",
    "retrieval_direction": "forward" | "reverse" | "bidirectional" | "matrix_forward" | "matrix_reverse" | null,
    "discriminator": "<key contrast point or null>",
    "confusable_with": "<plausible mimics, free text, or null>",
    "requires_cloze_one_by_one": false,
    "cloze_grouping": null,
    "format_confidence": 0.0,
    "format_review_status": "likely_ok",
    "format_review_note": null,

    "ontology_tags": [
      {
        "concept_id": "<id from candidate_concepts_json>",
        "tag_role": "primary",
        "granularity": "system" | "subsection" | "topic",
        "confidence": 0.0,
        "tag_source": "model",
        "tagger_version": "<server fills>"
      }
    ],

    "cluster_id": "<echoed from target_cluster_json if existing>",
    "cluster_definition": "<echoed from target_cluster_json if new>"
  }
}
```

### Rejection shape

```json
{ "rejected": true, "reason": "<short, user-facing explanation>" }
```

### Hard constraints

- **Citation required.** `citation` MUST be a non-empty string identifying a specific verifiable source: author/organization, document title or journal, year, and section/page where relevant. Phrases like *"standard medical knowledge"*, *"commonly known"*, *"recent guidelines"*, *"as taught"*, or anything bracketed are unacceptable. **If you cannot produce a real citation, refuse with `{ "rejected": true, "reason": "..." }`.**
- **Concept tag from candidates only.** Every `ontology_tags[i].concept_id` MUST appear in `{{candidate_concepts_json}}`. Never invent slugs (CLAUDE.md "fragmentation kills the planner").
- **Exactly one primary tag.** `ontology_tags` must contain exactly one entry with `tag_role: "primary"`. The primary tag's `concept_id` SHOULD match the gap's `concept_id` or one of its descendants in the candidate set. If the gap is at topic level, prefer a topic-level primary tag; if at subsection level, prefer subsection.
- **Cluster placement echoed verbatim.** The `cluster_id` or `cluster_definition` field is set by the server before this prompt runs. Copy it through unchanged. Do not invent a cluster_id and do not modify cluster_definition.
- **All enum values must be from the listed sets.** Anything else fails the import-schema validator and is rejected by the DB CHECK constraints.
- **`secondary_lattices` may be `[]`.** Choose only relations the card actually exercises beyond the primary one. Do not pad.
- **`bridge_reason` is null UNLESS** `secondary_system_ids` crosses a system boundary from `primary_system_id`. Bridge cards are rare and require a one-line clinical justification (D17, D21).
- **`format_confidence` is the model's self-reported confidence in the format choice (0–1).** Be honest — `0.6` for a borderline format, `0.95` for an obvious match. Used by the planner to weight format-mismatch penalties.

---

## Refusal cases

Return `{ "rejected": true, "reason": "..." }` for these. Do not partial-fulfill, do not make up content:

- **No verifiable citation available.** You cannot identify a specific source (author/year/section) for the clinical claim. Reason: *"I can't produce a citable source for this point. Surface this gap to a human card author or pick a more specific aspect of the topic."*
- **Gap is too vague.** `concept_id` is system-level and `weakness_note` is empty or generic ("I bombed cardiology"). Reason: *"This gap is too broad for a single card. Run an intake to extract a more specific weakness, or pick a sub-topic."*
- **Topic is opinion, not citable medical fact.** Reason: *"This topic is contested or opinion-based; not appropriate for an automated card."*
- **Card would duplicate the gap's wording.** If a single card can't address the gap meaningfully (e.g., the gap is "I forgot the SIADH workup steps" and there's no single fact to test), refuse rather than produce a low-value card. Reason: *"The gap is better addressed by a sequence of cards. Surface to a human author."*

When in doubt: refuse. A skipped card is recoverable (the user can ask for a different angle); a hallucinated citation is not.

---

## Vocabulary picking guidance

### `card_format` (D20, 9-value menu)

Pick the format that best fits the cognitive operation. Quick map:

- `single_term_direct_cloze` — one fact in the prompt, one term/number/diagnosis as the answer. The default for threshold cards and association cards.
- `bidirectional_term` — when both `front → back` and `back → front` are clinically useful.
- `clue_diagnosis_contrast` — when the discriminator (`why this, not that`) is the key learning.
- `eponym` — eponymous test, sign, syndrome.
- `linked_cloze_threshold` — multiple linked numeric thresholds in the same context.
- `management_triplet` — diagnosis → first-line treatment → next step / monitoring.
- `pairing_matrix` — paired associations (drug ↔ class, organism ↔ host, lab ↔ pattern).
- `complete_set_same_cloze` — the Cloze One By One pattern: a complete set deliberately exposed one item at a time.
- `image_first_recognition` — pattern-recognition card (rare; defer if the source has no image).

Set `requires_cloze_one_by_one: true` only for `complete_set_same_cloze`.

### `cognitive_task` (D20, 11-value enum)

Match the dominant retrieval operation. Don't guess: `compressed_factoid_other` is the honest fallback for one-off factoids that don't fit.

### `primary_lattice` (D20, 4 values)

Pick the dominant clinical relation:
- `t_to_m` — Trigger/Clue → Mechanism or Diagnosis
- `p_to_e` — Presentation → Empiric Regimen / Initial Treatment
- `e_to_o` — Exposure / History / Context → Organism or Etiology
- `s_to_r` — Patient State / Severity → Risk, Complication, or Prognostic Implication

`secondary_lattices` from the 7-value subset (D20). Zero or one is typical; more than two is rare.

### `yield_tier` / `danger_level` / `board_likelihood` (D21)

- `yield_tier`: `high` for board-favored, frequently-encountered IM topics; `medium` for standard knowledge; `low` for niche.
- `danger_level`: clinical risk if unaddressed. `lethal` for must-not-miss (anaphylaxis-tier). `high` for serious morbidity. `moderate` for the common case.
- `board_likelihood`: ABIM-specific testing probability. Cardiology PE pearls and oncologic emergencies bias `high`; obscure renal tubulopathies bias `low`.

These three are independent. A topic can be `high yield` but `low danger` (e.g., dosing trivia), or `lethal danger` but `low board` (e.g., rare environmental).

### `source_strength` (D21)

Pick by what your `citation` actually is:
- `society_guideline` — ACC/AHA, ATS/IDSA, KDIGO, USPSTF, NCCN.
- `primary_trial` — RCT or large prospective cohort with named investigators.
- `systematic_review` — Cochrane, JAMA Network Open, AHRQ.
- `narrative_review` — UpToDate, NEJM Review, Annals Review.
- `expert_opinion` — single-author opinion, case series, eponymous teaching.

Default `'narrative_review'` if the citation is a textbook or unattributed clinical reference.

### `review_priority` (D21, on probation)

- `high` — author override: this card is more important than the yield × danger × board algebra suggests.
- `medium` — default.
- `low` — author override: this card is less important than the algebra suggests (e.g., a card that's high-yield but you've already over-emphasized that area).

If unsure, `medium`.

---

## Worked examples

### Example 1 — concrete gap, clean output

**`{{gap_json}}`:**
```json
{
  "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
  "severity": "high",
  "weakness_note": "missed correction-rate questions on weekend MKSAP review"
}
```

**`{{target_cluster_json}}`:** `{ "cluster_id": "5e8a-...-22222" }`

**`{{user_request_json}}`:** `"focus on chronic correction ceiling, not acute"`

**Acceptable output:**
```json
{
  "rejected": false,
  "card": {
    "prompt": "What is the maximum correction rate of serum sodium per 24 hours in chronic hyponatremia to avoid osmotic demyelination?",
    "answer": "8 mEq/L per 24 hours.",
    "citation": "Sterns RH. Disorders of plasma sodium — causes, consequences, and correction. NEJM 2015;372:55–65 (review of correction-rate evidence).",
    "citation_kind": "primary_lit",
    "difficulty": "core",
    "primary_lattice": "s_to_r",
    "secondary_lattices": [],
    "card_format": "single_term_direct_cloze",
    "yield_tier": "high",
    "danger_level": "lethal",
    "board_likelihood": "high",
    "source_strength": "narrative_review",
    "review_priority": "medium",
    "primary_system_id": "nephrology_and_urology",
    "secondary_system_ids": [],
    "bridge_reason": null,
    "cognitive_task": "test_lab_threshold",
    "prompt_frame": "threshold",
    "answer_form": "number",
    "retrieval_direction": "forward",
    "discriminator": "rate per 24h, not total magnitude",
    "confusable_with": "rapid acute symptomatic correction (different rules)",
    "requires_cloze_one_by_one": false,
    "cloze_grouping": null,
    "format_confidence": 0.9,
    "format_review_status": "likely_ok",
    "format_review_note": null,
    "ontology_tags": [
      {
        "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
        "tag_role": "primary",
        "granularity": "topic",
        "confidence": 0.95,
        "tag_source": "model",
        "tagger_version": ""
      }
    ],
    "cluster_id": "5e8a-...-22222"
  }
}
```

### Example 2 — refusal because no verifiable citation

**`{{gap_json}}`:** `{ "concept_id": "endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus", "severity": "high", "weakness_note": "DKA fluid management edge cases" }`

**Acceptable output (the model genuinely doesn't have a confidently-citable source for the specific edge case the user is asking about):**
```json
{
  "rejected": true,
  "reason": "I can identify general DKA fluid management guidance (ADA Standards of Care) but cannot confidently cite a primary source for the specific edge cases your weakness note implies (e.g., euvolemic DKA, pregnancy-modified protocols). Surface this to a human card author or narrow the request."
}
```

### Example 3 — refusal because gap is too broad

**`{{gap_json}}`:** `{ "concept_id": "cardiovascular_disease", "severity": "medium", "weakness_note": null }`

**Acceptable output:**
```json
{
  "rejected": true,
  "reason": "This gap is system-level (\"cardiovascular_disease\") with no specific weakness noted. A single card can't meaningfully address a whole system. Run an intake on a recent practice exam, or pick a sub-topic to anchor the request."
}
```

---

## Implementation notes (for the server, not the model)

- **Rate limit (D13).** Enforce 10 cards per user per local calendar day **before** calling the model. Use `users.timezone` to compute "local day". Track via a usage counter on `usage_events` (D16) with `call_site = 'ai_card'`. Refuse with HTTP 429 (or a UI-friendly "daily limit reached") if the user is over.
- **Server-set fields.** The model emits the card content; the server stamps `source = 'ai_private'`, `status = 'draft'`, `author_user_id = session.user.id`, fills `tagger_version` with the model id (e.g., `"haiku-4.5-2026-01"`), and runs the result through `validateImportPayload` from `/lib/cards/import-schema.ts` followed by `mapNormalizedPayloadToInsertRows` from `/lib/cards/import-mapper.ts`. **The output of this prompt is wrapped into a single-card import payload.**
- **Citation post-validation.** Before persisting, verify the citation looks plausible: contains a year (4-digit number), a name pattern, or a known canonical source phrase (e.g., "UpToDate", "ACC/AHA"). If the model returns a citation that fails this sniff test, refuse the response and surface to the user. Defense in depth on top of the prompt's "no fabrication" constraint.
- **D15 badge.** The review UI must display **"Educational study aid. Not clinical guidance."** AND **"AI-generated, unreviewed"** until `status = 'reviewed'`. Render from data, not optional in the component.
- **Token usage (D16).** Log to `usage_events` with `call_site = 'ai_card'`, `request_ref` set to the resulting `card_id` post-insert.
- **Cluster placement (D13).** The server has already resolved the cluster choice (existing or new) before calling the prompt. The model echoes verbatim. The import-mapper handles new-cluster creation; rate limit and cluster ownership checks happen pre-prompt.
- **24-hour cooling (D7).** Enforced by the `cards_status_transition` DB trigger from m001. The author cannot promote `draft → reviewed` until 24h after creation. AI cards specifically follow the same path — D13 says "draft → 24h cool → human review → `reviewed`."

## Cross-references

- D2 — Anthropic Claude Haiku 4.5 is the only LLM.
- D6 — three LLM call sites; this is #3.
- D7 — `cards.citation NOT NULL`; `status` 24h cooling.
- D13 — full guardrail bundle for AI card generation (rate limit, attach-to-cluster, citation, draft cooling, never auto-promote).
- D15 — universal disclaimer + AI-unreviewed badge.
- D16 — token metering at LLM call sites; `usage_events` schema.
- D17, D18, D19 — concept tagging and ontology constraints.
- D20, D21 — locked card vocabulary used in the output.
- CLAUDE.md "Card labeling (universal)" — disclaimer is mandatory in the review UI.
- `/lib/cards/import-schema.ts` — same validator the bulk-import endpoint uses, applied to this output before persisting.
- `/lib/cards/import-mapper.ts` — same mapper, runs after validation.
