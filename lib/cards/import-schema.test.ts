// Tests for the Phase 6 import payload validator.

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  validateImportPayload,
  IMPORT_DEFAULTS,
  type ImportCard,
  type ImportError,
} from './import-schema.ts';

// ---------- Builders ----------

/** Minimal card payload — every required field with valid values, nothing optional. */
function minimalCard(): Record<string, unknown> {
  return {
    prompt: 'What is the correction-rate ceiling for chronic hyponatremia?',
    answer: '8 mEq/L per 24 hours.',
    citation: 'AHA/ACC/HFSA 2022 Guideline.',
    difficulty: 'core',
    primary_lattice: 't_to_m',
    card_format: 'single_term_direct_cloze',
    cognitive_task: 'test_lab_threshold',
    ontology_tags: [
      {
        concept_id: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
        tag_role: 'primary',
        granularity: 'topic',
        tag_source: 'manual_override',
      },
    ],
    cluster_id: '11111111-1111-1111-1111-111111111111',
  };
}

function minimalEnvelope(...cards: ReadonlyArray<Record<string, unknown>>): Record<string, unknown> {
  return { cards };
}

function findError(errors: readonly ImportError[], pathSubstr: string, code?: string): ImportError | undefined {
  return errors.find((e) => {
    const pathStr = e.path.join('.');
    return pathStr.includes(pathSubstr) && (code === undefined || e.code === code);
  });
}

// ---------- Top-level shape ----------

test('rejects non-object input with NOT_OBJECT', () => {
  for (const bad of [null, 42, 'string', [], true]) {
    const result = validateImportPayload(bad);
    assert.equal(result.valid, false);
    if (!result.valid) assert.equal(result.errors[0].code, 'NOT_OBJECT');
  }
});

test('rejects payload missing cards array', () => {
  const result = validateImportPayload({});
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.equal(result.errors[0].code, 'NOT_ARRAY');
    assert.deepEqual(result.errors[0].path, ['cards']);
  }
});

test('rejects payload with cards as non-array', () => {
  const result = validateImportPayload({ cards: 'not an array' });
  assert.equal(result.valid, false);
  if (!result.valid) assert.equal(result.errors[0].code, 'NOT_ARRAY');
});

test('rejects payload with empty cards array', () => {
  const result = validateImportPayload({ cards: [] });
  assert.equal(result.valid, false);
  if (!result.valid) assert.equal(result.errors[0].code, 'EMPTY_ARRAY');
});

// ---------- Minimal valid card ----------

test('accepts minimal valid card and applies defaults', () => {
  const result = validateImportPayload(minimalEnvelope(minimalCard()));
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.cards.length, 1);
    const card = result.payload.cards[0];
    // Defaults
    assert.equal(card.citation_kind, IMPORT_DEFAULTS.citation_kind);
    assert.equal(card.yield_tier, IMPORT_DEFAULTS.yield_tier);
    assert.equal(card.danger_level, IMPORT_DEFAULTS.danger_level);
    assert.equal(card.board_likelihood, IMPORT_DEFAULTS.board_likelihood);
    assert.equal(card.source_strength, IMPORT_DEFAULTS.source_strength);
    assert.equal(card.review_priority, IMPORT_DEFAULTS.review_priority);
    assert.equal(card.format_review_status, IMPORT_DEFAULTS.format_review_status);
    assert.equal(card.requires_cloze_one_by_one, IMPORT_DEFAULTS.requires_cloze_one_by_one);
    assert.deepEqual(card.secondary_lattices, []);
    assert.deepEqual(card.secondary_system_ids, []);
    assert.equal(card.primary_system_id, null);
    assert.equal(card.bridge_reason, null);
    assert.equal(card.format_confidence, null);
    // Ontology tag default confidence
    assert.equal(card.ontology_tags[0].confidence, 1.0);
    // Envelope defaults
    assert.equal(result.payload.source_pipeline, null);
    assert.equal(result.payload.pipeline_version, null);
    assert.equal(result.payload.idempotency_key, null);
  }
});

// ---------- Maximal valid card ----------

test('accepts maximal payload with every field set', () => {
  const card = {
    ...minimalCard(),
    citation_kind: 'guideline',
    secondary_lattices: ['d_to_t', 'tx_to_mon'],
    yield_tier: 'high',
    danger_level: 'lethal',
    board_likelihood: 'high',
    source_strength: 'society_guideline',
    review_priority: 'high',
    primary_system_id: 'nephrology_and_urology',
    secondary_system_ids: ['cardiovascular_disease'],
    bridge_reason: 'cardiorenal syndrome relevance',
    prompt_frame: 'threshold',
    answer_form: 'number',
    retrieval_direction: 'forward',
    discriminator: 'rate vs total correction',
    confusable_with: 'central pontine myelinolysis triggers',
    requires_cloze_one_by_one: true,
    cloze_grouping: 'same_c1',
    format_confidence: 0.85,
    format_review_status: 'approved',
    format_review_note: 'tagger v2 + human review',
    ontology_tags: [
      {
        concept_id: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
        tag_role: 'primary',
        granularity: 'topic',
        confidence: 0.95,
        tag_source: 'model',
        tagger_version: 'haiku-4.5-2026-01',
      },
      {
        concept_id: 'cardiovascular_disease.heart_failure',
        tag_role: 'bridge',
        granularity: 'subsection',
        tag_source: 'manual_override',
      },
    ],
  };
  const envelope = {
    ...minimalEnvelope(card),
    source_pipeline: 'kekki-bulk-v3',
    pipeline_version: '3.2.1',
    idempotency_key: 'batch-2026-04-28-001',
  };
  const result = validateImportPayload(envelope);
  assert.equal(result.valid, true);
  if (result.valid) {
    const out = result.payload.cards[0];
    assert.equal(out.yield_tier, 'high');
    assert.equal(out.danger_level, 'lethal');
    assert.equal(out.source_strength, 'society_guideline');
    assert.deepEqual(out.secondary_lattices, ['d_to_t', 'tx_to_mon']);
    assert.equal(out.requires_cloze_one_by_one, true);
    assert.equal(out.format_confidence, 0.85);
    assert.equal(out.ontology_tags.length, 2);
    assert.equal(out.ontology_tags[0].tagger_version, 'haiku-4.5-2026-01');
    assert.equal(result.payload.source_pipeline, 'kekki-bulk-v3');
    assert.equal(result.payload.idempotency_key, 'batch-2026-04-28-001');
  }
});

// ---------- Required-field missing ----------

const REQUIRED_FIELDS = [
  'prompt',
  'answer',
  'citation',
  'difficulty',
  'primary_lattice',
  'card_format',
  'cognitive_task',
] as const;

for (const field of REQUIRED_FIELDS) {
  test(`rejects card missing required field "${field}"`, () => {
    const card = minimalCard();
    delete card[field];
    const result = validateImportPayload(minimalEnvelope(card));
    assert.equal(result.valid, false);
    if (!result.valid) {
      const err = findError(result.errors, field);
      assert.ok(err, `expected error for field "${field}"`);
      // For string fields the code is MISSING_REQUIRED; for enum fields likewise.
      assert.ok(
        err!.code === 'MISSING_REQUIRED',
        `expected MISSING_REQUIRED for "${field}", got ${err!.code}`,
      );
    }
  });
}

test('rejects empty-string required field', () => {
  const card = { ...minimalCard(), prompt: '   ' };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'prompt');
    assert.equal(err?.code, 'EMPTY_STRING');
  }
});

// ---------- Invalid enum values ----------

const ENUM_FIELDS_WITH_BAD_VALUES: ReadonlyArray<{ field: string; bad: string }> = [
  { field: 'difficulty', bad: 'extreme' },
  { field: 'primary_lattice', bad: 'q_to_z' },
  { field: 'card_format', bad: 'novel_format' },
  { field: 'cognitive_task', bad: 'guesswork' },
  { field: 'yield_tier', bad: 'extreme' },
  { field: 'danger_level', bad: 'fatal' },
  { field: 'board_likelihood', bad: 'maybe' },
  { field: 'source_strength', bad: 'twitter_thread' },
  { field: 'review_priority', bad: 'urgent' },
  { field: 'retrieval_direction', bad: 'sideways' },
  { field: 'format_review_status', bad: 'pending_committee' },
];

for (const { field, bad } of ENUM_FIELDS_WITH_BAD_VALUES) {
  test(`rejects invalid value for enum "${field}": "${bad}"`, () => {
    const card = { ...minimalCard(), [field]: bad };
    const result = validateImportPayload(minimalEnvelope(card));
    assert.equal(result.valid, false);
    if (!result.valid) {
      const err = findError(result.errors, field);
      assert.equal(err?.code, 'INVALID_ENUM');
    }
  });
}

test('rejects bad value within secondary_lattices array', () => {
  const card = { ...minimalCard(), secondary_lattices: ['d_to_t', 'NOT_REAL'] };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'secondary_lattices.1');
    assert.equal(err?.code, 'INVALID_ENUM');
  }
});

// ---------- Ontology tags ----------

test('rejects empty ontology_tags array', () => {
  const card = { ...minimalCard(), ontology_tags: [] };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'ontology_tags');
    assert.equal(err?.code, 'EMPTY_ARRAY');
  }
});

test('rejects ontology_tags with no primary', () => {
  const card = {
    ...minimalCard(),
    ontology_tags: [
      {
        concept_id: 'cardiovascular_disease',
        tag_role: 'secondary',
        granularity: 'system',
        tag_source: 'manual_override',
      },
    ],
  };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'ontology_tags', 'INVALID_PRIMARY_TAG_COUNT');
    assert.ok(err);
  }
});

test('rejects ontology_tags with multiple primaries (D19 partial unique index would block this)', () => {
  const card = {
    ...minimalCard(),
    ontology_tags: [
      {
        concept_id: 'a',
        tag_role: 'primary',
        granularity: 'topic',
        tag_source: 'manual_override',
      },
      {
        concept_id: 'b',
        tag_role: 'primary',
        granularity: 'topic',
        tag_source: 'manual_override',
      },
    ],
  };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'ontology_tags', 'INVALID_PRIMARY_TAG_COUNT');
    assert.ok(err);
    assert.match(err!.message, /found 2/);
  }
});

test('rejects ontology_tag missing required fields', () => {
  const card = {
    ...minimalCard(),
    ontology_tags: [
      {
        concept_id: 'a',
        // missing tag_role, granularity, tag_source
      },
    ],
  };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const fields = result.errors.map((e) => e.path[e.path.length - 1]);
    assert.ok(fields.includes('tag_role'));
    assert.ok(fields.includes('granularity'));
    assert.ok(fields.includes('tag_source'));
  }
});

test('rejects ontology_tag confidence out of [0,1]', () => {
  const card = {
    ...minimalCard(),
    ontology_tags: [
      {
        concept_id: 'a',
        tag_role: 'primary',
        granularity: 'topic',
        tag_source: 'model',
        confidence: 1.5,
      },
    ],
  };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'confidence', 'OUT_OF_RANGE');
    assert.ok(err);
  }
});

// ---------- format_confidence range ----------

test('rejects format_confidence > 1', () => {
  const card = { ...minimalCard(), format_confidence: 1.5 };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'format_confidence', 'OUT_OF_RANGE');
    assert.ok(err);
  }
});

test('accepts format_confidence at boundaries 0 and 1', () => {
  for (const value of [0, 1]) {
    const card = { ...minimalCard(), format_confidence: value };
    const result = validateImportPayload(minimalEnvelope(card));
    assert.equal(result.valid, true, `format_confidence=${value} should be valid`);
  }
});

test('accepts format_confidence as null', () => {
  const card = { ...minimalCard(), format_confidence: null };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, true);
  if (result.valid) assert.equal(result.payload.cards[0].format_confidence, null);
});

// ---------- Cluster placement ----------

test('rejects card with neither cluster_id nor cluster_definition', () => {
  const card = minimalCard();
  delete card.cluster_id;
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = result.errors.find((e) => e.code === 'INVALID_CLUSTER_PLACEMENT');
    assert.ok(err);
    assert.match(err!.message, /neither/);
  }
});

test('rejects card with both cluster_id and cluster_definition', () => {
  const card = {
    ...minimalCard(),
    cluster_definition: { name: 'Some New Cluster' },
  };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = result.errors.find((e) => e.code === 'INVALID_CLUSTER_PLACEMENT');
    assert.ok(err);
    assert.match(err!.message, /not both/);
  }
});

test('accepts card with cluster_definition (new cluster)', () => {
  const card = minimalCard();
  delete card.cluster_id;
  card.cluster_definition = { name: 'GDMT v2', description: 'updated', visibility: 'shared' };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, true);
  if (result.valid) {
    const out = result.payload.cards[0];
    assert.equal(out.cluster_id, null);
    assert.deepEqual(out.cluster_definition, {
      name: 'GDMT v2',
      description: 'updated',
      visibility: 'shared',
    });
  }
});

test('cluster_definition default visibility is private', () => {
  const card = minimalCard();
  delete card.cluster_id;
  card.cluster_definition = { name: 'Quiet Cluster' };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, true);
  if (result.valid) assert.equal(result.payload.cards[0].cluster_definition?.visibility, 'private');
});

test('rejects cluster_definition with bad visibility value', () => {
  const card = minimalCard();
  delete card.cluster_id;
  card.cluster_definition = { name: 'X', visibility: 'public' };
  const result = validateImportPayload(minimalEnvelope(card));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = findError(result.errors, 'visibility', 'INVALID_ENUM');
    assert.ok(err);
  }
});

// ---------- Multi-card + path correctness ----------

test('error paths point to the correct card index', () => {
  const cards = [minimalCard(), { ...minimalCard(), yield_tier: 'extreme' }, minimalCard()];
  const result = validateImportPayload(minimalEnvelope(...cards));
  assert.equal(result.valid, false);
  if (!result.valid) {
    const err = result.errors.find((e) => e.path.includes('yield_tier'));
    assert.ok(err);
    // Path should be ['cards', 1, 'yield_tier']
    assert.deepEqual(err!.path, ['cards', 1, 'yield_tier']);
  }
});

test('errors are accumulated, not short-circuited (multiple cards, multiple fields)', () => {
  const cards = [
    { ...minimalCard(), prompt: '' },                  // EMPTY_STRING
    { ...minimalCard(), difficulty: 'wrong' },         // INVALID_ENUM
    { ...minimalCard(), card_format: 'wrong' },        // INVALID_ENUM
  ];
  const result = validateImportPayload(minimalEnvelope(...cards));
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.errors.length >= 3, `expected ≥3 errors, got ${result.errors.length}`);
  }
});

test('a fully-broken card surfaces every issue (every required field)', () => {
  const result = validateImportPayload({
    cards: [
      {
        // every required field missing
        ontology_tags: [],
      },
    ],
  });
  assert.equal(result.valid, false);
  if (!result.valid) {
    const fields = result.errors.map((e) => String(e.path[e.path.length - 1]));
    for (const required of ['prompt', 'answer', 'citation', 'difficulty', 'primary_lattice', 'card_format', 'cognitive_task']) {
      assert.ok(fields.includes(required), `expected error for "${required}", got fields: ${fields.join(',')}`);
    }
  }
});

// ---------- Type-checking smoke test ----------

test('NormalizedCard inferred shape compiles against ImportCard inputs', () => {
  // This is a compile-time check disguised as a runtime test — if the types
  // drift, the assignment fails to compile.
  const minimal: ImportCard = {
    prompt: 'p',
    answer: 'a',
    citation: 'c',
    difficulty: 'core',
    primary_lattice: 't_to_m',
    card_format: 'single_term_direct_cloze',
    cognitive_task: 'diagnosis_from_clues',
    ontology_tags: [
      {
        concept_id: 'x',
        tag_role: 'primary',
        granularity: 'topic',
        tag_source: 'manual_override',
      },
    ],
    cluster_id: 'some-uuid',
  };
  // Validates as a sanity check that the type matches the runtime.
  const result = validateImportPayload({ cards: [minimal] });
  assert.equal(result.valid, true);
});
