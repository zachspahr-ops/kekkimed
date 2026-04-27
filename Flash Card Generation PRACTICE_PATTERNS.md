# ABIM Flashcard Practice Patterns

## Executive Summary

This project generates flashcards from retrieval moves, not from topics.

The durable rule is:

```text
One card = one clinical retrieval operation.
```

A card is worth making when it trains a high-yield board decision: diagnosis, next step, mechanism, complication, contraindication, threshold, association, or contrast. The topic tells where the card lives. The retrieval move determines the card format.

Default bias:

- Prefer discrimination density over completeness.
- Prefer source-backed, exam-useful cards over polished summaries.
- Prefer the smallest format that preserves the decision.
- Use cloze when sentence context is essential.
- Use Cloze One By One / Hide All behavior for multi-part retrieval.
- Use reverse cards only when the reverse direction is clinically useful.

## First Principles

A good medical flashcard should answer one question:

```text
What decision should the learner be able to make under exam conditions?
```

Before generating a card, check three gates:

1. Yield gate: common, dangerous, board-favored, or easily confused.
2. Source gate: supported by a guideline, review, trial, blueprint-aligned source, or strong clinical principle.
3. Retrieval gate: the card tests one concrete clinical move rather than a general topic summary.

Reject or defer cards that are merely interesting, too broad, unsupported, or not tied to a likely exam decision.

## Generation Workflow

1. Identify the tested clinical move.
2. Pick the smallest review format that preserves that move.
3. Write the front so only one answer is reasonable.
4. Put the answer plus the key discriminator on the back or extra field.
5. Add source and ontology metadata.
6. Run format review and audit scripts before promoting or exporting.

The default card shape is:

```text
Clinical trigger -> diagnosis/action/decision
Back: answer + one discriminator
```

## The 9 Default Review Formats

These are the approved default formats used by the review-format tagging workflow.

### 1. Single-term direct cloze

Use for a single compact fact where sentence context matters.

Best for:

- one defining feature
- one mechanism
- one classic association
- one named treatment or adverse effect

Pattern:

```text
In [condition], [clinical context] is caused by {{c1::answer}}.
```

Avoid when the card needs a contrast, threshold, list, or treatment sequence.

### 2. Bidirectional term card

Use when both directions are clinically useful.

Best for:

- term -> meaning
- meaning -> term
- syndrome -> key feature
- feature -> syndrome

Do not create reverse cards automatically. Use them only when the reverse retrieval would help on a question stem.

### 3. Clue-to-diagnosis plus contrast card

Use when the learner must recognize a disease from a clue pattern and distinguish it from plausible mimics.

Best for:

- clinical vignettes
- classic presentations
- look-alike syndromes
- "why this, not that" board decisions

The back should include the key discriminator, not a full disease summary.

### 4. Eponym-to-meaning and meaning-to-eponym

Use for named entities only when the name itself is tested or clinically useful.

Best for:

- named signs
- named syndromes
- named criteria
- named antibodies or mutations when the name is a retrieval target

Avoid low-yield eponym trivia unless it changes diagnosis or management.

### 5. Linked cloze threshold card

Use when a numeric cutoff, duration, score, stage, or timing threshold changes the action.

Best for:

- treatment thresholds
- diagnostic cutoffs
- screening intervals
- duration rules
- risk-score action points

Pattern:

```text
In [clinical state], start/avoid/do [action] when {{c1::threshold}} because {{c1::reason/action link}}.
```

Do not classify every card with a number as a threshold card. The number must be the decision gate.

### 6. Management triplet card

Use when management requires a first move, an avoid/contraindication point, and an alternative or next option.

Best for:

- medication choice
- first-line vs second-line management
- contraindication-driven treatment selection
- escalation or rescue therapy

Preferred Cloze One By One shape:

```text
For [condition/context]:
First move: {{c1::drug or action}}
Avoid/major contraindication: {{c1::avoid point or contraindication}}
Alternative/next option: {{c1::alternative or escalation}}
```

Some cards do not have a true contraindication. Use the avoid field only for clinically meaningful avoid points.

### 7. Pairing matrix

Use when several clues map to several answers and the relationship itself is the learning target.

Best for:

- antibody -> disease
- mutation -> syndrome
- organism -> exposure
- drug -> toxicity
- test result -> diagnosis

Preferred behavior:

- emit cloze matrices, not Basic answer lists
- use same-card `c1` deletions
- create both directions when useful: clue -> answer and answer -> clue

Avoid one-pair "matrices" unless the pair is high-yield enough to stand alone as a direct or bidirectional card.

### 8. Complete-the-set same-cloze card

Use when the learner must retrieve a required set.

Best for:

- diagnostic criteria
- required complications
- contraindication lists
- classic triads
- major causes in a short high-yield list

Preferred shape:

```text
The key [set] for [condition/context] includes:
1. {{c1::item 1}}
2. {{c1::item 2}}
3. {{c1::item 3}}
```

Use explicit prompt anchors outside the clozes so the learner knows what part of the chain they are retrieving.

### 9. Image-first recognition card

Use when the visual finding is the actual retrieval trigger.

Best for:

- ECGs
- radiographs
- dermatology images
- fundoscopic findings
- blood smears
- pathology images

The image should come first. Explanatory text belongs on the back or in the extra field. Do not use this format when the image is decorative rather than necessary.

## Cloze One By One Principle

For multi-part cards, default to same-card `c1` deletions designed for Cloze One By One / Hide All behavior.

Core rules:

- Use same-card `c1` clozes when the items belong to one clinical retrieval operation.
- Reveal items one by one to avoid passive list recognition.
- Keep prompt anchors outside the clozes.
- Do not split a linked decision into unrelated cards if the relationship is the point.
- Do not bury the clinical trigger inside the cloze.

Good pattern:

```text
For [clinical context], management is:
First-line: {{c1::answer 1}}
Avoid when: {{c1::answer 2}}
Alternative: {{c1::answer 3}}
```

Bad pattern:

```text
{{c1::answer 1}}, {{c1::answer 2}}, and {{c1::answer 3}}
```

The bad pattern has no retrieval anchor. It trains list recall without a clinical decision.

## Quality Checks

Before accepting a generated card:

- Does the front cue exactly one intended answer?
- Is the retrieval move clear?
- Is the card high-yield enough?
- Is the source solid enough?
- Is the answer short enough to review repeatedly?
- Is the key discriminator present?
- Would this help with a board-style question?
- Is a reverse direction clinically useful, or just symmetric-looking?
- Does the chosen format match the answer shape?

Common failure modes:

- Topic summary instead of retrieval drill.
- Overlong back that feels educational but is not reviewable.
- Cloze deletion that hides the clinical context.
- Reverse card that tests a useless direction.
- Threshold card where the number is incidental.
- Pairing matrix with only one weak pair.
- Complete-set card without prompt anchors.
- Management triplet with a fake contraindication field.

## Project Rule

Canonical CSVs remain the content source of truth. Advanced formats should first be created as derived/enriched outputs, then reviewed before any canonical migration.

After adding or changing cards, rerun the relevant audit/tag/export scripts before treating the output as stable.
