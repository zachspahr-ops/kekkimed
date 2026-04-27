# Flashcard Database Design for Metadata-Driven Study Plans

## Executive Summary

The database should treat each flashcard as a source-backed clinical retrieval object, not just a front/back text row.

The core design principle is:

```text
Store the medical content, retrieval design, source provenance, ontology tags, and learner performance as separate layers.
```

This separation matters because the project has two jobs:

1. Preserve a clean, auditable ABIM flashcard deck.
2. Use card metadata and performance data to generate custom study plans.

The database should therefore keep canonical card content stable while allowing derived tags, Anki exports, learner history, and study-plan recommendations to evolve.

Recommended architecture:

- `cards`: canonical card content and stable identifiers.
- `sources`: article provenance and license metadata.
- `ontology_nodes`: ABIM blueprint systems, subsections, and topics.
- `card_ontology_tags`: card-to-ontology mappings with confidence and provenance.
- `card_retrieval_metadata`: cognitive task, lattice, review format, retrieval direction, and discriminator metadata.
- `card_export_notes`: Anki-ready note variants, including Cloze One By One outputs.
- `learner_card_events`: review events, correctness, latency, confidence, and source of performance signal.
- `learner_card_state`: current memory state per learner and card.
- `study_plan_runs`: generated study plans with rules, weights, and rationale.
- `study_plan_items`: the ordered cards or topics assigned by each plan.

## First Principles

A custom study plan should not only ask:

```text
What topic is weak?
```

It should ask:

```text
Which clinical retrieval moves are weak, in which ABIM domains, at what urgency, and with what evidence?
```

For this project, topic metadata is necessary but not sufficient. The same topic can contain very different study tasks:

- recognizing a diagnosis from clues
- choosing a next management step
- remembering a treatment threshold
- distinguishing two mimics
- recalling a contraindication
- completing a required set
- pairing organism, antibody, mutation, or drug toxicity

The database should support study plans that can target both:

- content location: system, subsection, topic
- retrieval operation: cognitive task, review format, lattice, discriminator, direction

## Design Goals

1. Preserve source traceability.
2. Keep canonical card content stable.
3. Support derived ontology and review-format enrichment.
4. Support multiple export formats from one card record.
5. Track learner performance at the card and metadata level.
6. Generate study plans from metadata, not only raw due dates.
7. Support audit and rollback when ontology or format rules change.
8. Avoid locking the project into one Anki note type.

## Core Entity Model

```text
source article
    -> canonical card
        -> ontology tags
        -> retrieval metadata
        -> export note variants
        -> learner review events
        -> learner card state
        -> study plan items
```

The canonical card should remain the content anchor. Everything else can be regenerated, versioned, or learner-specific.

## Table Design

### 1. `cards`

Purpose: canonical source-backed flashcard records.

This table should mirror the current canonical CSV schema while adding database-native lifecycle fields.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `card_id` | text primary key | Stable project-level identifier. |
| `source_category` | text | Current file/category such as `CARDIO`, `GI`, `HEME`. |
| `subsection_raw` | text | Original card subsection from canonical CSV. |
| `subtopic_raw` | text | Original card subtopic from canonical CSV. |
| `lattice` | text | Current primary clinical relation, such as `P->E`, `T->M`, `E->O`, `S->R`. |
| `front` | text | Canonical prompt. |
| `flip` | text | Canonical answer. |
| `extra` | text | Supporting explanation. |
| `cluster` | text | Contrastive cluster, ideally no more than 5 members. |
| `source_pmid` | text | Exactly one PMID. |
| `im_cert_relevance` | text or integer | ABIM relevance/rationale. |
| `status` | text | `active`, `draft`, `retired`, `needs_review`, `excluded`. |
| `content_version` | integer | Increment when canonical content changes. |
| `created_at` | datetime | Creation timestamp. |
| `updated_at` | datetime | Last content update. |

Design note:

Do not overload this table with every derived tag. It should answer: what is the card, what source supports it, and is it active?

### 2. `sources`

Purpose: preserve article provenance and licensing.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `source_pmid` | text primary key | PMID used by cards. |
| `title` | text | Article title. |
| `doi` | text | DOI if available. |
| `url` | text | Source URL or PMC URL. |
| `year` | integer | Publication year. |
| `journal` | text | Journal. |
| `license` | text | Required license, currently CC BY 4.0 for canonical sources. |
| `license_verified` | boolean | Whether license was checked. |
| `source_type` | text | review, guideline, trial, practical overview, etc. |
| `source_quality` | integer | Optional 1-5 quality rating. |
| `notes` | text | Caveats or sparse-source notes. |

Study-plan value:

This enables study plans to favor higher-confidence cards and flag weakly sourced or outdated areas for review.

### 3. `ontology_nodes`

Purpose: store the ABIM blueprint ontology and any secondary planning ontology.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `ontology_node_id` | text primary key | Stable ontology ID. |
| `ontology_name` | text | `ABIM_blueprint`, `Kekki_v0`, etc. |
| `level` | text | `system`, `subsection`, `topic`, or planning-specific level. |
| `name` | text | Human-readable node name. |
| `parent_id` | text nullable | Parent ontology node. |
| `sort_order` | integer | Display order. |
| `active` | boolean | Whether node is currently active. |

Design note:

The ABIM ontology should remain the exam-aligned source of truth. Kekki can remain a secondary planning vocabulary until coverage and false-match risk improve.

### 4. `card_ontology_tags`

Purpose: many-to-many mapping from cards to ontology nodes.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `card_id` | text foreign key | Card. |
| `ontology_node_id` | text foreign key | Tagged ontology node. |
| `tag_role` | text | `primary`, `secondary`, `bridge`, `planning_only`. |
| `granularity` | text | `system`, `subsection`, `topic`. |
| `confidence` | real | Tagging confidence. |
| `tag_source` | text | `canonical`, `script`, `manual_override`, `model`, `import`. |
| `tagger_version` | text | Script/model/rule version. |
| `review_status` | text | `accepted`, `needs_review`, `rejected`. |
| `created_at` | datetime | Tag creation time. |

Study-plan value:

This lets the planner ask for weak cards in a system, subsection, topic, or planning vocabulary without mutating the canonical card.

### 5. `card_retrieval_metadata`

Purpose: store how the card should be studied.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `card_id` | text primary/foreign key | Card. |
| `prompt_frame` | text | Prompt structure, such as clue, management, threshold, contrast. |
| `cognitive_task` | text | Diagnosis, management, mechanism, risk, threshold, etc. |
| `answer_form` | text | Drug, disease, organism, number, list, paired association, etc. |
| `recommended_review_format` | text | One of the 9 default formats. |
| `retrieval_direction` | text | `forward`, `reverse`, `bidirectional`, `matrix_forward`, `matrix_reverse`. |
| `requires_cloze_one_by_one` | boolean | True for linked multi-part retrieval. |
| `cloze_grouping` | text | Same-`c1`, separate clozes, or none. |
| `discriminator` | text | The key "why this, not that" point. |
| `confusable_with` | text | Optional list or linked table of plausible mimics. |
| `format_confidence` | real | Confidence in recommended format. |
| `format_review_status` | text | `likely_ok`, `revise_format`, `manual_review`, `approved`. |
| `format_review_note` | text | Why the format was chosen or flagged. |

The 9 default review formats are:

1. Single-term direct cloze.
2. Bidirectional term card.
3. Clue-to-diagnosis plus contrast card.
4. Eponym-to-meaning and meaning-to-eponym.
5. Linked cloze threshold card.
6. Management triplet card.
7. Pairing matrix.
8. Complete-the-set same-cloze card.
9. Image-first recognition card.

Study-plan value:

This is the table that makes the system better than a topic tree. A learner can be weak in cardiology management triplets but fine in cardiology diagnosis recognition. The plan should see that difference.

### 6. `card_export_notes`

Purpose: store generated note variants for Anki or another app.

One canonical card may produce multiple study notes, especially for bidirectional cards and pairing matrices.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `export_note_id` | text primary key | Stable export-note identifier. |
| `card_id` | text foreign key | Source card. |
| `note_type` | text | Basic, Cloze, Enhanced Cloze, Cloze One By One, etc. |
| `direction` | text | forward, reverse, matrix_forward, matrix_reverse. |
| `content` | text | Anki note content or front. |
| `back` | text | Back field when applicable. |
| `extra` | text | Extra field. |
| `tags` | text/json | Export tags. |
| `cloze_schema` | text | same-`c1`, separate cloze, none. |
| `export_batch_id` | text | Links to a generated export. |
| `export_status` | text | draft, reviewed, exported, retired. |
| `generated_at` | datetime | Generation timestamp. |

Design note:

Do not treat Anki export notes as the canonical card. Export notes are projections of the card plus metadata into a study format.

### 7. `learner_card_events`

Purpose: raw study-performance events.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `event_id` | text primary key | Unique review event. |
| `learner_id` | text | Learner. |
| `card_id` | text | Canonical card. |
| `export_note_id` | text nullable | Specific note variant reviewed. |
| `reviewed_at` | datetime | Time of review. |
| `response_grade` | integer/text | Again/hard/good/easy or 0-5 scale. |
| `correct` | boolean nullable | Correctness if available. |
| `response_time_ms` | integer | Latency. |
| `self_confidence` | integer nullable | Optional 1-5 confidence. |
| `source` | text | Anki import, app review, manual quiz, etc. |
| `was_new` | boolean | New vs review. |

Study-plan value:

This table allows objective and subjective weakness detection:

- wrong
- slow
- repeatedly hard
- low confidence
- forgotten after prior success

### 8. `learner_card_state`

Purpose: current learner-specific state for planning.

This table is derived from event history and can be recalculated.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `learner_id` | text | Learner. |
| `card_id` | text | Card. |
| `status` | text | unseen, learning, young, mature, suspended, relearn. |
| `last_reviewed_at` | datetime | Last review. |
| `next_due_at` | datetime | Due date if using spaced repetition. |
| `ease` | real | Memory ease or stability estimate. |
| `lapse_count` | integer | Number of failures after learning. |
| `recent_accuracy` | real | Rolling accuracy. |
| `median_response_time_ms` | integer | Speed signal. |
| `weakness_score` | real | Planner-ready weakness score. |
| `priority_score` | real | Combined weakness plus yield plus exam relevance. |

Study-plan value:

This is the planner's fast lookup table. It should be updated from review events, not hand-edited.

### 9. `study_plan_runs`

Purpose: record each generated study plan and its logic.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `study_plan_id` | text primary key | Plan ID. |
| `learner_id` | text | Learner. |
| `created_at` | datetime | Plan creation time. |
| `goal` | text | Board review, weak areas, maintenance, exam sprint, etc. |
| `time_budget_minutes` | integer | Available time. |
| `horizon_days` | integer | Plan length. |
| `rules_json` | json | Filters and weights used. |
| `summary` | text | Human-readable rationale. |

### 10. `study_plan_items`

Purpose: the actual assigned study units.

Recommended fields:

| Field | Type | Purpose |
|---|---|---|
| `study_plan_id` | text foreign key | Plan. |
| `rank` | integer | Ordered item position. |
| `item_type` | text | card, topic, subsection, system, mixed_block. |
| `card_id` | text nullable | Card if item is a card. |
| `ontology_node_id` | text nullable | Topic/subsection/system if item is grouped. |
| `recommended_minutes` | integer | Time allocation. |
| `reason` | text | Why this was selected. |
| `target_retrieval_format` | text | Format focus, if any. |
| `target_cognitive_task` | text | Cognitive task focus, if any. |

## Metadata Needed for Custom Study Plans

The planner should be able to filter and rank cards by:

Content:

- ABIM system
- subsection
- topic
- raw subtopic
- secondary planning vocabulary such as Kekki, if reviewed

Retrieval:

- lattice
- cognitive task
- answer form
- recommended review format
- retrieval direction
- cloze one-by-one requirement
- discriminator or confusable cluster

Evidence:

- source PMID
- source type
- source quality
- license verification
- card status
- review status

Learner state:

- unseen cards
- due cards
- wrong cards
- slow cards
- low-confidence cards
- repeated lapses
- weak systems or topics
- weak retrieval formats

Planning constraints:

- time available
- exam date
- desired mix of new vs review
- system focus
- remediation vs maintenance
- minimum coverage across ABIM systems

## Study-Plan Scoring Model

A practical first scoring model:

```text
priority_score =
  weakness_score
  + yield_weight
  + due_weight
  + exam_blueprint_weight
  + source_confidence_weight
  + retrieval_format_gap_weight
  - redundancy_penalty
```

Where:

- `weakness_score`: wrong, slow, hard, or lapsed cards.
- `yield_weight`: high-yield subheaders and board-relevant material.
- `due_weight`: spaced-repetition urgency.
- `exam_blueprint_weight`: ABIM content distribution or current study target.
- `source_confidence_weight`: stronger for clean, reviewed, source-backed cards.
- `retrieval_format_gap_weight`: boosts undertrained cognitive tasks or formats.
- `redundancy_penalty`: avoids assigning many near-duplicate cards from one cluster.

The key improvement over normal deck scheduling is that the planner can say:

```text
You are not just weak in nephrology.
You are weak in nephrology threshold cards and management triplets.
```

## Example Study-Plan Queries

Weak management decisions:

```sql
SELECT c.card_id, c.front, c.flip, r.recommended_review_format, l.weakness_score
FROM cards c
JOIN card_retrieval_metadata r ON r.card_id = c.card_id
JOIN learner_card_state l ON l.card_id = c.card_id
WHERE l.learner_id = :learner_id
  AND r.cognitive_task = 'management_treatment'
  AND l.weakness_score > 0.7
ORDER BY l.priority_score DESC;
```

Slow threshold cards in cardiology:

```sql
SELECT c.card_id, c.front, c.flip, l.median_response_time_ms
FROM cards c
JOIN card_ontology_tags t ON t.card_id = c.card_id
JOIN ontology_nodes o ON o.ontology_node_id = t.ontology_node_id
JOIN card_retrieval_metadata r ON r.card_id = c.card_id
JOIN learner_card_state l ON l.card_id = c.card_id
WHERE l.learner_id = :learner_id
  AND o.name = 'Cardiovascular Disease'
  AND r.recommended_review_format = 'Linked cloze threshold card'
ORDER BY l.median_response_time_ms DESC;
```

Build a balanced one-hour plan:

```text
20 minutes: due high-yield cards
20 minutes: weakest system/topic cards
10 minutes: weakest retrieval format
10 minutes: mixed contrast cards from confusable clusters
```

## Recommended Implementation Path

Fast option:

Keep CSV files as canonical source of truth. Create a SQLite database from the CSV and derived enrichment files for querying and study-plan generation.

Challenge option:

Build a normalized SQLite schema with import scripts, derived views, and a first study-plan generator that outputs a daily CSV/TSV or Anki filtered-deck tag list.

Ambitious option:

Build a full app with learner review ingestion, adaptive scoring, study-plan generation, export sync, and dashboard views by system, topic, retrieval format, and weakness type.

Recommended path:

Start with the challenge option. SQLite is enough for this phase, and it keeps the project auditable. Move to Postgres only when multi-user sync, server deployment, or large-scale analytics become real requirements.

## Why SQLite First

SQLite is the right first database because:

- the dataset is small
- the workflow is local
- the project needs auditability
- exports can be regenerated
- schema changes are easy
- it supports SQL queries for study-plan logic
- it avoids premature app infrastructure

Use Postgres later if the project becomes a hosted product or needs concurrent multi-user access.

## Non-Negotiable Design Rules

1. Do not make Anki export rows the canonical database record.
2. Do not collapse ontology tags and retrieval-format tags into one field.
3. Do not overwrite canonical content when enriching metadata.
4. Do not force topic precision when evidence only supports system-level tagging.
5. Do not generate study plans from topic alone.
6. Do not treat reverse cards as automatic.
7. Do not treat every number as a threshold.
8. Do not treat Kekki as production ontology until coverage and false-match risk improve.
9. Preserve source PMID and license provenance.
10. Preserve review events separately from current learner state.

## Bottom Line

The database should be designed around the actual learning model:

```text
source-backed card
  + ABIM ontology location
  + retrieval operation
  + review format
  + learner performance
  = custom study plan
```

This lets the system generate study plans that are not merely "more cardiology" or "more nephrology," but targeted remediation of the learner's weakest board-relevant retrieval moves.
