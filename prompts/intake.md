# Intake Parser — Prompt Template

**LLM call site #1 (D6).** Used by the server action at `/intake` (Phase 3).

The user pastes free-text analytics ("missed lots of MKSAP DKA questions") or uploads a CSV/JSON of performance data. The server first runs the **Layer 1 heuristic precheck** (`/lib/intake/stem-rejection.ts` per D14). If Layer 1 accepts the input, the server interpolates this template and calls **Claude Haiku 4.5** (D2) to extract structured gaps mapped to ABIM concept IDs.

Use temperature 0 and JSON-mode output. The server validates against the output schema before persisting to `structured_analytics`.

---

## Inputs (server-injected)

- `{{user_input}}` — verbatim text from the user. Already passed Layer 1 heuristic stem-rejection. Do NOT trust this content blindly — Layer 2 (this prompt) is your refusal opportunity for paraphrased qbank stems Layer 1 missed.

- `{{candidate_concepts_json}}` — array of concept records the model must choose from. Each record:
  ```json
  {
    "id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
    "title": "Hyponatremia",
    "level": "topic",
    "synonyms": ["SIADH workup", "low sodium"],
    "parent_path": "Nephrology and Urology > Water and Electrolyte Balance"
  }
  ```
  The server pre-filters candidates by simple text overlap against `concepts.title` and `concepts.synonyms` and includes their ancestors so the model can choose the right granularity (system / subsection / topic per D18). Typically 30–80 records; never the full 970-row table.

- `{{today_iso}}` — current local date (`YYYY-MM-DD`). Used for "recent" framing in the model's decisions but not stored in output.

---

## Output

Return **exactly one JSON object** matching this schema. No prose before or after. JSON-mode is enforced server-side.

### Acceptance shape

```json
{
  "rejected": false,
  "items": [
    {
      "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
      "severity": "high",
      "confidence": "high",
      "weakness_note": "missed osmolality threshold and correction-rate questions"
    }
  ]
}
```

### Rejection shape (Layer 2 stem rejection per D14)

```json
{ "rejected": true, "reason": "<short, user-facing explanation>" }
```

### Schema constraints

- `severity ∈ {"low", "medium", "high"}` — matches `structured_analytics.severity` CHECK constraint.
- `confidence ∈ {"low", "medium", "high"}` — your self-reported confidence in the concept mapping.
- `concept_id` MUST be drawn from `{{candidate_concepts_json}}`. Never invent a slug — fragmentation kills the planner (CLAUDE.md). If no candidate is a confident match, **omit the gap from `items`** rather than guessing. Surface unmapped weaknesses in the next session — do not force an approximate match.
- `weakness_note` ≤ 240 chars. Quote or summarize the user's own words; do not editorialize.
- `items` may be empty if the input was vague enough that no specific gap can be extracted ("I'm tired of studying" → `{"rejected": false, "items": []}`).

---

## Layer 2 — refuse proprietary qbank content

Layer 1 (`/lib/intake/stem-rejection.ts`) catches the obvious cases. Your job here is to refuse what slipped through — paraphrased stems, partially-redacted vignettes, prose that reads like a question explanation.

**Refuse and return `{"rejected": true, "reason": "..."}` if the input contains any of:**

- A patient vignette with multiple-choice answer options, even if the option markers are renamed (e.g., "first option / second option" instead of "A / B").
- An explicit answer-key explanation ("the answer is", "the correct choice is", "this is because option C…").
- A rationale paragraph in qbank style — typically a "the patient most likely has X because of Y" structure followed by "the other choices are wrong because…".
- An "Educational Objective" section or equivalent ABIM-style learning objective phrasing.
- Multi-paragraph prose that reads like a copy-paste from UWorld / MKSAP / NEJM Knowledge+ / Amboss / Boards & Beyond / Pretest, even if the brand name was scrubbed.

**Do NOT refuse for:**

- Mentions of qbank product names in user notes ("MKSAP scores", "UWorld percentile") — those are legitimate self-descriptions.
- A user's own description of a topic they got wrong, even if technical ("I missed osmolality threshold questions in hyponatremia").
- Lists of weak topics, even when written compactly ("hyponatremia, DKA, GDMT").
- Numerical analytics dumps (CSV-like rows of topic + percent correct).

**Refusal `reason` should be specific and user-facing.** Examples:
- `"This looks like a copy-pasted multiple-choice question. Paste your own notes about what you got wrong, not the question itself."`
- `"This reads like a qbank rationale. Summarize what you missed in your own words instead."`

When in doubt, **prefer accepting and producing an empty `items` array** over false-rejecting a legitimate user note. Layer 1 already screens the obvious cases; your refusals should be the cases where Layer 1 plausibly missed something.

---

## Severity rubric

- `high` — the user explicitly says they got many wrong, were lost, never understood it, or that this is a critical board topic for them. Repeated mention across the input. Numerical signal (e.g., "30% correct") below ~50%.
- `medium` — single mention, hedged language ("I'm a bit shaky on…", "want to review"), or numerical signal in the 50–75% range.
- `low` — passing reference, "should review at some point", or numerical signal above ~75%.

When in doubt, default to `medium`. Severity is editable in the UI before the user saves — your job is a sensible first pass.

## Confidence rubric

- `high` — the user named the concept directly or used a synonym in `{{candidate_concepts_json}}`. Mapping is unambiguous.
- `medium` — the user described symptoms or a clinical scenario that maps cleanly to one candidate, with no plausible alternatives among the candidates.
- `low` — the user's wording is ambiguous and could fit two or more candidates; you picked the most likely. Surface this confidence so the user can edit before saving.

A confident wrong mapping is worse than a low-confidence right one. When unsure, set `confidence: "low"` and let the user override.

---

## Granularity guidance (D17, D18)

`{{candidate_concepts_json}}` includes records at three levels — system, subsection, topic. Choose the most specific level the user's wording supports:

- "Cardiology weakness" → system-level concept (`cardiovascular_disease`)
- "Heart failure questions" → subsection-level (`cardiovascular_disease.myocardial_disease`)
- "HFpEF management thresholds" → topic-level (`cardiovascular_disease.myocardial_disease.heart_failure_with_preserved_ejection_fraction_hfpef`)

Going more specific than the user's wording supports invents specificity. Going broader loses planner signal. Match the level the user actually expressed.

---

## Worked examples

### Example 1 — narrative input, two clear gaps

**`{{user_input}}`:**
```
Looking back at last weekend's MKSAP review, I bombed hyponatremia — especially the questions about correcting too fast. I also got DKA fluid management wrong twice. Beyond that, I felt slow on hypertension target organ damage but probably knew it.
```

**Acceptable output:**
```json
{
  "rejected": false,
  "items": [
    {
      "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
      "severity": "high",
      "confidence": "high",
      "weakness_note": "missed correction-rate questions; bombed the topic on weekend MKSAP review"
    },
    {
      "concept_id": "endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus",
      "severity": "high",
      "confidence": "high",
      "weakness_note": "got DKA fluid management wrong twice"
    },
    {
      "concept_id": "cardiovascular_disease.hypertension",
      "severity": "low",
      "confidence": "medium",
      "weakness_note": "felt slow on target organ damage but probably knew it"
    }
  ]
}
```

### Example 2 — vague input, empty items is correct

**`{{user_input}}`:**
```
I'm tired and don't feel ready for the boards.
```

**Acceptable output:**
```json
{ "rejected": false, "items": [] }
```

A vague mood note is not a rejection — it's just not a structurable gap. The UI will tell the user no specific gaps were found and prompt them for more detail.

### Example 3 — paraphrased qbank stem, Layer 2 catches it

**`{{user_input}}`:**
```
A 62-year-old man with HFrEF presents with worsening dyspnea and bibasilar crackles. The first option is to increase the loop diuretic. The second option is to add a thiazide. The third option is to start an SGLT2 inhibitor. The fourth option is to initiate dialysis. The most appropriate next step is option three because SGLT2 inhibitors reduce HF hospitalization in HFrEF independent of diabetes status.
```

(Layer 1 likely missed this because the option markers are spelled out as words. This is exactly the case Layer 2 must catch.)

**Acceptable output:**
```json
{ "rejected": true, "reason": "This looks like a multiple-choice question with answer rationale. Summarize what you got wrong in your own words instead — for example, \"I missed an HFrEF management question about SGLT2 inhibitors.\"" }
```

### Example 4 — uploaded CSV-like analytics dump

**`{{user_input}}`:**
```
Topic, % correct
Hyponatremia, 35
DKA, 40
GDMT in HFrEF, 60
Hypertension targets, 78
```

**Acceptable output:**
```json
{
  "rejected": false,
  "items": [
    {
      "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
      "severity": "high",
      "confidence": "high",
      "weakness_note": "35% correct on uploaded analytics"
    },
    {
      "concept_id": "endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus",
      "severity": "high",
      "confidence": "high",
      "weakness_note": "40% correct on uploaded analytics"
    },
    {
      "concept_id": "cardiovascular_disease.myocardial_disease",
      "severity": "medium",
      "confidence": "medium",
      "weakness_note": "60% correct on uploaded analytics — GDMT in HFrEF"
    }
  ]
}
```

(`Hypertension targets` at 78% is above the low-severity threshold — omit, do not include as a gap.)

---

## Implementation notes (for the server, not the model)

- **Layer 1 first.** Call `checkForQbankStem(input)` from `/lib/intake/stem-rejection.ts` BEFORE building this prompt. If Layer 1 rejects, return its reason directly to the UI. Do not call the LLM. Do not store the input.
- **Candidate filtering.** Pre-filter `candidate_concepts` to ~30–80 records by:
  1. Tokenize the input.
  2. Score each row in `concepts` by token overlap against `title` and `synonyms[]`.
  3. Keep top-N + their ancestors (so the model can pick the right granularity).
  4. Always include all 18 system-level concepts as a coverage floor.
- **Validation.** Validate the model's output against the schema before writing to `structured_analytics`. Reject `concept_id`s not present in the candidate set. Reject any output that's not valid JSON.
- **Telemetry.** Log token usage to `usage_events` (D16) with `call_site = 'intake'`. On rejection (Layer 1 or Layer 2), log the rejection reason and `matched_pattern` (Layer 1 only) — do not store the user's input on rejection per D14.
- **Storage.** Store the original input in `analytics_uploads` only on acceptance. Link `structured_analytics.upload_id` per row.

## Cross-references

- D6 — three LLM call sites; this is #1.
- D14 — two-layer parser stem rejection. Layer 1 = `/lib/intake/stem-rejection.ts`. Layer 2 = this prompt's "refuse proprietary qbank content" section.
- D17 — concept tagging framework; `concept_id` is constrained-enum from the `concepts` table.
- D18 — ABIM blueprint structure (system / subsection / topic granularity).
- CLAUDE.md "Intake parser — two-layer stem rejection" — the canonical statement of this two-layer design.
