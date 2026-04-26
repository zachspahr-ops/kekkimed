# Medical Knowledge Ontology Framework

## Executive Summary

This ontology enables flexible tagging and cross-linking of medical knowledge across MKSAP, ACC, ACP, journal articles, and case reviews. It supports three concurrent use cases: (1) spaced repetition study, (2) board exam simulation, and (3) practice gap analysis. The system traces concepts across questions, distinguishes question types and difficulty, and aggregates performance data at the concept and domain level for insights impossible with question-level analytics alone.

## 1. Core Principles

- **Polyhierarchical**: Concepts can have multiple parents. Amyloidosis belongs in both Cardiology (cardiac amyloid) and Nephrology (renal involvement).

- **Source-agnostic**: Same ontology tags MKSAP, ACC, journal articles, and case reviews. A question on ACE inhibitors in heart failure maps to the same concept regardless of source.

- **Use-case multiplexing**: One card/question can be tagged for study (weak area drill), exam simulation (filter to board-level only), and analytics (roll up to concept performance).

- **First principles**: Tags derive from the clinical question, not the content source. What is the user trying to learn or prove competence in?

## 2. Tag Layers

Every question/card has four layers of tags. Each layer serves a specific function.

### Layer 1: Concept (What is the core medical idea?)

The atomic unit of learning. Concepts are disease, physiology, drug, test, or skill entities. Examples:

- `concept:acute-coronary-syndrome`
- `concept:ace-inhibitors`
- `concept:ekg-interpretation`
- `concept:nephrotic-syndrome`

**Use**: Filter study cards by weakness; feed into concept-level performance dashboards.

### Layer 2: Clinical Context (How is it presented?)

The clinical scenario or presentation mode. Distinguishes the frame in which the concept is tested.

- `context:acute` (sudden onset, emergency)
- `context:chronic` (management over months/years)
- `context:screening` (asymptomatic detection)
- `context:complication` (managing an adverse event)

**Use**: Separate acute management boards (ABIM emergency medicine questions) from chronic disease management; tailor study sessions.

### Layer 3: Question Type (What cognitive task?)

The cognitive demand and answer format. Predicts exam performance better than content alone.

- `qtype:diagnosis` (identify disease from presentation)
- `qtype:management` (choose treatment)
- `qtype:interpretation` (read lab/imaging)
- `qtype:prognosis` (predict outcome)
- `qtype:mechanism` (explain pathophysiology)

**Use**: Simulate exam difficulty mix; identify weak cognitive domains (e.g., "I'm slow at diagnosis questions but fast at management").

### Layer 4: Difficulty & Performance (How hard? How'd you do?)

Difficulty is absolute (board-level, advanced, core knowledge); performance is relative (personal history).

- `difficulty:core` (fundamental, high yield; all board candidates should know)
- `difficulty:advanced` (subspecialty depth)
- `difficulty:trap` (common distractors; test discernment)

Performance tags:
- `status:correct`
- `status:slow` (right answer, long deliberation)
- `status:wrong` (incorrect answer; triggered card generation)
- `status:unseen` (not yet reviewed)

**Use**: Filter study to high-yield core or advanced topics; replay slow questions to improve speed; track performance by difficulty tier to forecast board readiness.

## 3. Concept Taxonomy

Concepts are organized hierarchically but tagged polyhierarchically. A question is tagged at the leaf level; search and analytics roll up or drill down.

| Level | Example |
|-------|---------|
| Organ system | `cv` (Cardiovascular) |
| Subcategory | `concept:heart-failure`, `concept:arrhythmia`, `concept:coronary-disease` |
| Leaf (tag) | `concept:hf-reduced-ejection-fraction`, `concept:beta-blockers-hf` |

## 4. Example: A Single Question

**Question**: MKSAP case on beta-blockers in acute heart failure.

- **Concept**: `concept:beta-blockers`, `concept:acute-decompensated-hf`
- **Context**: `context:acute`
- **Question type**: `qtype:management`
- **Difficulty**: `difficulty:core`
- **Performance**: `status:slow` (you answered correctly but took 2 min; board time limit is 90 sec)

**Tagstring** (stored as JSON array):
```json
[
  "concept:beta-blockers",
  "concept:acute-decompensated-hf",
  "context:acute",
  "qtype:management",
  "difficulty:core",
  "status:slow"
]
```

## 5. Use Cases

### Use Case 1: Spaced Repetition Study

Filter cards tagged `status:wrong` or `status:slow`; prioritize by concept performance ("show me all beta-blocker questions I've struggled with").

**Result**: High-yield, personalized study sessions.

### Use Case 2: Exam Simulation

Filter to `difficulty:core` and `difficulty:advanced`; mix by `qtype` in board-like ratio (40% diagnosis, 50% management, 10% mechanism); track timed performance.

**Result**: Realistic readiness forecast; identify cognitive weak spots.

### Use Case 3: Analytics

Roll up performance to concept level: "Across all 15 beta-blocker questions (MKSAP + ACC), my accuracy is 80% but time is 120 sec/q. Board-ready cutoffs are 90% and 90 sec."

**Result**: Data-driven prep plan; know exactly which concepts to drill.

## 6. Scaling to Multiple Sources

Once MKSAP is tagged, adding ACC, ACP, and journal articles is straightforward: each source's questions get the same four-layer tags, and the ontology auto-deduplicates concepts. A question from an ACC paper on beta-blockers gets the same `concept:beta-blockers` tag as MKSAP.

**Benefit**: A single analytics view across all sources; you know your total ace-inhibitor mastery, not just MKSAP performance.

## 7. Implementation

- **Tags are JSON arrays** in the card library. Each tag follows the format `prefix:name` (e.g., `concept:beta-blockers`).

- **Database**: Index on tag arrays to enable fast filtering by tag combo (concept + difficulty + status).

- **Frontend**: Multi-select filters; show count per tag; expose concept-level rollup stats.

## 8. Optimization & Next Steps

### Phase 1: Proof of concept (MKSAP only)
Tag 50–100 MKSAP questions across one system (e.g., Cardiovascular). Build analytics dashboard. Measure whether concept-level rollup reveals actionable patterns (e.g., "diagnosis questions are weak").

### Phase 2: Scale and integrate
Tag remaining MKSAP questions. Add ACC and ACP sources. Refine tag vocabulary based on patterns you observe.

### Phase 3: Connect to review loop
Hook the ontology into your card review system. When you mark a card "confusing," the system suggests retag combinations (e.g., maybe the question type was miscoded).

### What to measure
- **Concept-level performance gap**: Do concepts with low accuracy predict low board-exam scores? (Validate the ontology's predictive power.)
- **Time profile by type**: Are you systematically slower on one question type? (Confirms format-specific weak spots.)
- **Cross-source coverage**: Do you have enough ACC and ACP coverage in high-yield concepts? (Ensures balanced prep.)

---

**When to iterate**: After tagging 150–200 questions, review your performance data. If patterns don't match your intuition (e.g., you feel weak on diagnosis but the data shows strength), reassess the tag definitions. The ontology should fit your data, not the reverse.
