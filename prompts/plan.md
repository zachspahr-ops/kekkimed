# Plan Generator — Prompt Template

**LLM call site #2 (D6).** Used by the server action at `/plan/new` (Phase 4).

Given a user's recent structured-analytics gaps and their available clusters, produce an ordered cluster-level study plan (5–15 items, 7–14 day window). The output is persisted to `study_plans` + `plan_items` after the user accepts in the UI.

The model is **Claude Haiku 4.5** (D2). Use temperature 0 and JSON-mode output. The server validates the JSON against the output schema before saving.

---

## Inputs (server-injected)

The server interpolates these placeholders before sending to the model. All are JSON-encoded.

- `{{gaps_json}}` — array of `structured_analytics` rows for the user. Each row:
  ```json
  {
    "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia",
    "severity": "high",        // low | medium | high
    "confidence": "high",      // low | medium | high (LLM's confidence in the original mapping)
    "weakness_note": "missed osmolality threshold questions"   // nullable
  }
  ```
  May be empty. If empty, the model must reject (see Refusal cases).

- `{{clusters_json}}` — array of clusters the user owns or has access to. Each cluster:
  ```json
  {
    "cluster_id": "5e8a...uuid",
    "name": "Hyponatremia",
    "description": "Causes, workup, treatment thresholds",
    "concept_coverage": [
      "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia"
    ],
    "card_count": 7,
    "planning_summary": {
      "yield_tier":       { "high": 4, "medium": 3, "low": 0 },
      "danger_level":     { "low": 1, "moderate": 4, "high": 1, "lethal": 1 },
      "board_likelihood": { "high": 5, "medium": 2, "low": 0 },
      "primary_lattice":  { "t_to_m": 3, "p_to_e": 2, "s_to_r": 2, "e_to_o": 0 },
      "cognitive_task":   { "diagnosis_from_clues": 3, "test_lab_threshold": 2, "management_treatment": 2 }
    }
  }
  ```
  `concept_coverage` is the union of `card_ontology_tags.concept_id` across the cluster's cards (D19). `planning_summary` distributions come from D20/D21 enums. The server pre-computes these so the model does not need to invent or aggregate.

- `{{today_iso}}` — the user's current local date in `YYYY-MM-DD` (used to anchor the target window).

- `{{recent_plan_history_json}}` — optional. Up to the user's last 3 completed `study_plans`, each with the cluster IDs and completion dates. Used to avoid immediate repetition. May be empty array.

---

## Output

Return **exactly one JSON object** matching this schema. No prose before or after.

```json
{
  "rejected": false,
  "items": [
    {
      "cluster_id": "<uuid from input clusters>",
      "rationale": "One line. References specific concept_id(s) from gaps and the planning angle (yield/danger/board/lattice/cognitive_task) that justifies inclusion."
    }
  ],
  "target_window_days": 10,
  "plan_rationale": "One paragraph. Describes the overall arc: which gaps drove the plan, how the ordering serves the user, and any uncovered gaps that need a future intake.",
  "uncovered_gaps": [
    "concept_id_string"
  ]
}
```

Or, when input is unworkable:

```json
{ "rejected": true, "reason": "<short, user-facing explanation>" }
```

### Hard constraints

- `items` length: **5 ≤ N ≤ 15**.
- `target_window_days`: integer **7 ≤ D ≤ 14**.
- Every `cluster_id` MUST be drawn from `{{clusters_json}}`. Never invent or guess a UUID.
- Every `concept_id` referenced in `rationale` or `uncovered_gaps` MUST be drawn from `{{gaps_json}}` (or appear in some cluster's `concept_coverage`). Never invent concept slugs — fragmentation kills the planner (CLAUDE.md).
- No duplicate `cluster_id` within `items`.
- `rationale` per item: one line, ≤ 240 chars.

---

## Selection rubric

Order items by descending **planning weight**. The planning weight is a soft heuristic (not a formula the model must compute precisely):

1. **Severity match** — clusters whose `concept_coverage` overlaps a `severity = "high"` gap rank above `medium` and `low`.
2. **Danger floor** — within a tied severity, clusters with any `danger_level = "lethal"` cards rank above `high` and below.
3. **Yield × board** — among similarly dangerous clusters, prefer those with high `yield_tier` and high `board_likelihood`.
4. **Recency damping** — push down clusters that appear in `{{recent_plan_history_json}}` unless a fresh `severity = "high"` gap forces them back.
5. **Coverage diversity** — avoid stacking five clusters on the same primary system if the gap set spans more systems. If gaps span two systems, the plan should too (proportional to gap distribution).
6. **Retrieval-format diversity** — within reasonable limits, prefer plans that exercise varied `cognitive_task` distributions across the included clusters (don't make a 10-item plan that's 100% `diagnosis_from_clues`).

The `target_window_days` choice:
- 7 days for plans of 5–8 items
- 10 days for 9–11 items
- 14 days for 12–15 items
- Bias longer if the gap set is broad and the user's recent plan history shows a pattern of incomplete plans.

---

## Refusal cases

Return `{ "rejected": true, "reason": "..." }` for these. Do not partial-fulfill:

- `gaps_json` is empty → `"No structured gaps to plan against. Run an intake first."`
- `clusters_json` is empty → `"No clusters available to plan from. Build or import clusters first."`
- Fewer than 5 clusters meaningfully overlap any gap's `concept_coverage` → `"Not enough cluster coverage for these gaps. Need clusters covering at least 5 distinct gap concepts."`
- All gaps overlap clusters that appear in the most recent `recent_plan_history_json` entry (would produce a degenerate repeat plan) → `"These gaps were just addressed in the previous plan. Run a new intake to capture fresh weakness signal before planning again."`

---

## Style notes for rationales

- Use locked vocabulary: `yield_tier` values (`high`/`medium`/`low`), `danger_level` (`low`/`moderate`/`high`/`lethal`), `cognitive_task` enum from D20, `primary_lattice` codes from D20.
- Anchor every rationale to a concrete `concept_id` from `{{gaps_json}}`. Generic rationales like "good for review" are not acceptable.
- Examples of acceptable per-item rationales:
  - `"Targets nephrology_and_urology.water_and_electrolyte_balance.hyponatremia (severity=high) with 4 high-yield diagnosis_from_clues cards and 1 lethal-tier threshold."`
  - `"Reinforces cardiovascular_disease.myocardial_disease (severity=medium) via 5 management_triplet cards in the p_to_e lattice — fills the management gap noted in weakness_note."`

---

## Worked example

**Inputs (truncated for readability):**

```json
{
  "gaps_json": [
    { "concept_id": "endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus", "severity": "high", "confidence": "high", "weakness_note": "missed DKA fluid management" },
    { "concept_id": "nephrology_and_urology.water_and_electrolyte_balance.hyponatremia", "severity": "high", "confidence": "high", "weakness_note": null }
  ],
  "clusters_json": [
    { "cluster_id": "11111111-1111-1111-1111-111111111111", "name": "DKA / HHS", "description": "Diagnosis, fluid + insulin management, transitions", "concept_coverage": ["endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus"], "card_count": 6, "planning_summary": { "yield_tier": {"high": 5, "medium": 1, "low": 0}, "danger_level": {"low": 0, "moderate": 2, "high": 3, "lethal": 1}, "board_likelihood": {"high": 5, "medium": 1, "low": 0}, "primary_lattice": {"p_to_e": 4, "s_to_r": 2}, "cognitive_task": {"management_treatment": 4, "test_lab_threshold": 2} } },
    { "cluster_id": "22222222-2222-2222-2222-222222222222", "name": "Hyponatremia", "description": "Causes, workup, treatment thresholds", "concept_coverage": ["nephrology_and_urology.water_and_electrolyte_balance.hyponatremia"], "card_count": 7, "planning_summary": { "yield_tier": {"high": 4, "medium": 3, "low": 0}, "danger_level": {"low": 1, "moderate": 4, "high": 1, "lethal": 1}, "board_likelihood": {"high": 5, "medium": 2, "low": 0}, "primary_lattice": {"t_to_m": 3, "p_to_e": 2, "s_to_r": 2}, "cognitive_task": {"diagnosis_from_clues": 3, "test_lab_threshold": 2, "management_treatment": 2} } }
    /* ... 4–13 more clusters ... */
  ],
  "today_iso": "2026-04-28",
  "recent_plan_history_json": []
}
```

**Acceptable output (for a 5-item plan):**

```json
{
  "rejected": false,
  "items": [
    {
      "cluster_id": "11111111-1111-1111-1111-111111111111",
      "rationale": "Targets endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus (severity=high). 5 high-yield management_treatment cards, 1 lethal-tier — addresses the DKA fluid-management note directly."
    },
    {
      "cluster_id": "22222222-2222-2222-2222-222222222222",
      "rationale": "Targets nephrology_and_urology.water_and_electrolyte_balance.hyponatremia (severity=high). Mix of t_to_m diagnosis_from_clues and test_lab_threshold cards covers workup-through-treatment arc."
    }
    /* + 3 supporting clusters chosen for coverage diversity */
  ],
  "target_window_days": 7,
  "plan_rationale": "Two high-severity gaps drive the plan: DKA management and hyponatremia workup. Items 1–2 hit the gaps directly with high-yield, board-relevant cards including lethal-tier content. Items 3–5 broaden into adjacent concepts to avoid a 5-item plan that fires only two cognitive tasks. 7-day window because the gap set is narrow and the user's history shows steady completion.",
  "uncovered_gaps": []
}
```

---

## Implementation notes (for the server, not the model)

- The server constructs `{{clusters_json}}` via `buildClustersWithPlanningSummary()` from `/lib/plan/clusters-summary.ts`. The helper takes a `ClusterWithCards[]` (cluster rows joined with their cards' planning fields and concept tags from a single SQL query across `clusters` × `cluster_memberships` × `cards` × `card_ontology_tags` × `card_retrieval_metadata`) and produces the `{{clusters_json}}` shape — including the per-cluster `planning_summary` histograms over D20/D21 enums. Histograms always include zero buckets so the model sees the full distribution shape.
- Token usage is logged to `usage_events` (D16) with `call_site = 'plan'` and `request_ref` set to the resulting `study_plan_id` (or the upload that triggered the plan if generation pre-dates the row).
- Validate the model's output against the schema **before** persisting. If validation fails, return a UI error with "regenerate" affordance — do not silently truncate or coerce. Use the `is*` type guards from `/lib/cards/types.ts` to narrow LLM-returned enum strings before writing to the DB.
- Bound the request: when `clusters_json` would exceed ~150 entries, pre-rank with `rankClustersByGapOverlap()` (same module) and slice to the top 150 before sending. Tie-break: gap-overlap desc → card_count desc → cluster_id asc, deterministic across runs so prompt caching can hit on repeated inputs.

## Cross-references

- D6 — three LLM call sites; this is #2.
- D8 — plan shape (5–15 cluster items, 7–14 day window).
- D17 — concept IDs are constrained-enum from the `concepts` table.
- D19 — `card_ontology_tags` is the source of `concept_coverage`.
- D20 — locked card-teaching vocabulary used in planning summaries and rationales.
- D21 — locked planning-layer vocabulary used in `planning_summary` and rationales.
