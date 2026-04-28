// Tests for the locked card vocabulary types module.
//
// Goal: ensure every const-array length matches the documented enum size in
// DECISIONS.md and that every type guard accepts ALL members and rejects
// non-members. Drift here is silently dangerous — runtime types must mirror
// the DB CHECK constraints exactly.

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  // const arrays
  CARD_SOURCES,
  CARD_STATUSES,
  DIFFICULTIES,
  TAG_ROLES,
  GRANULARITIES,
  TAG_REVIEW_STATUSES,
  TAG_SOURCES,
  PRIMARY_LATTICES,
  SECONDARY_LATTICES,
  CARD_FORMATS,
  COGNITIVE_TASKS,
  RETRIEVAL_DIRECTIONS,
  FORMAT_REVIEW_STATUSES,
  YIELD_TIERS,
  DANGER_LEVELS,
  BOARD_LIKELIHOODS,
  SOURCE_STRENGTHS,
  REVIEW_PRIORITIES,
  // guards
  isCardSource,
  isCardStatus,
  isDifficulty,
  isTagRole,
  isGranularity,
  isPrimaryLattice,
  isSecondaryLattice,
  isCardFormat,
  isCognitiveTask,
  isRetrievalDirection,
  isFormatReviewStatus,
  isYieldTier,
  isDangerLevel,
  isBoardLikelihood,
  isSourceStrength,
  isReviewPriority,
} from './types.ts';

// ---------- Cardinality checks (DECISIONS.md drift detector) ----------

test('CARD_SOURCES has 3 values per D13', () => assert.equal(CARD_SOURCES.length, 3));
test('CARD_STATUSES has 3 values per D7', () => assert.equal(CARD_STATUSES.length, 3));
test('DIFFICULTIES has 3 values per D17', () => assert.equal(DIFFICULTIES.length, 3));

test('TAG_ROLES has 4 values per D19', () => assert.equal(TAG_ROLES.length, 4));
test('GRANULARITIES has 3 values per D17/D19', () => assert.equal(GRANULARITIES.length, 3));
test('TAG_REVIEW_STATUSES has 3 values per D19', () => assert.equal(TAG_REVIEW_STATUSES.length, 3));
test('TAG_SOURCES has 5 values per D19', () => assert.equal(TAG_SOURCES.length, 5));

test('PRIMARY_LATTICES has 4 values per D20', () => assert.equal(PRIMARY_LATTICES.length, 4));
test('SECONDARY_LATTICES has 7 values per D20', () => assert.equal(SECONDARY_LATTICES.length, 7));
test('CARD_FORMATS has 9 values per D20 (m003 widened from 4)', () =>
  assert.equal(CARD_FORMATS.length, 9));
test('COGNITIVE_TASKS has 11 values per D20', () => assert.equal(COGNITIVE_TASKS.length, 11));
test('RETRIEVAL_DIRECTIONS has 5 values per m003', () =>
  assert.equal(RETRIEVAL_DIRECTIONS.length, 5));
test('FORMAT_REVIEW_STATUSES has 4 values per D20 amendment 2026-04-26', () =>
  assert.equal(FORMAT_REVIEW_STATUSES.length, 4));

test('YIELD_TIERS has 3 values per D21', () => assert.equal(YIELD_TIERS.length, 3));
test('DANGER_LEVELS has 4 values per D21 (lethal as separate tier)', () =>
  assert.equal(DANGER_LEVELS.length, 4));
test('BOARD_LIKELIHOODS has 3 values per D21', () => assert.equal(BOARD_LIKELIHOODS.length, 3));
test('SOURCE_STRENGTHS has 5 values per D21 (categorical, not int 1-5)', () =>
  assert.equal(SOURCE_STRENGTHS.length, 5));
test('REVIEW_PRIORITIES has 3 values per D21 (on probation)', () =>
  assert.equal(REVIEW_PRIORITIES.length, 3));

// ---------- Specific value spot-checks (catches re-ordering or rename drift) ----------

test('DANGER_LEVELS includes "lethal" as documented in D21', () => {
  assert.ok(DANGER_LEVELS.includes('lethal'));
});

test('SOURCE_STRENGTHS includes society_guideline (highest) and expert_opinion (lowest)', () => {
  assert.ok(SOURCE_STRENGTHS.includes('society_guideline'));
  assert.ok(SOURCE_STRENGTHS.includes('expert_opinion'));
});

test('PRIMARY_LATTICES are the four D20 codes', () => {
  assert.deepEqual([...PRIMARY_LATTICES].sort(), ['e_to_o', 'p_to_e', 's_to_r', 't_to_m']);
});

test('CARD_FORMATS contains the lattice-bible 9-format menu', () => {
  for (const expected of [
    'single_term_direct_cloze',
    'clue_diagnosis_contrast',
    'eponym',
    'pairing_matrix',
    'complete_set_same_cloze',
    'image_first_recognition',
  ]) {
    assert.ok(CARD_FORMATS.includes(expected as (typeof CARD_FORMATS)[number]));
  }
});

test('COGNITIVE_TASKS includes the planner-critical management_treatment + test_lab_threshold', () => {
  assert.ok(COGNITIVE_TASKS.includes('management_treatment'));
  assert.ok(COGNITIVE_TASKS.includes('test_lab_threshold'));
});

// ---------- Generated type-guard contract (table-driven) ----------

const GUARDS: ReadonlyArray<{
  name: string;
  guard: (v: unknown) => boolean;
  values: readonly string[];
}> = [
  { name: 'isCardSource', guard: isCardSource, values: CARD_SOURCES },
  { name: 'isCardStatus', guard: isCardStatus, values: CARD_STATUSES },
  { name: 'isDifficulty', guard: isDifficulty, values: DIFFICULTIES },
  { name: 'isTagRole', guard: isTagRole, values: TAG_ROLES },
  { name: 'isGranularity', guard: isGranularity, values: GRANULARITIES },
  { name: 'isPrimaryLattice', guard: isPrimaryLattice, values: PRIMARY_LATTICES },
  { name: 'isSecondaryLattice', guard: isSecondaryLattice, values: SECONDARY_LATTICES },
  { name: 'isCardFormat', guard: isCardFormat, values: CARD_FORMATS },
  { name: 'isCognitiveTask', guard: isCognitiveTask, values: COGNITIVE_TASKS },
  { name: 'isRetrievalDirection', guard: isRetrievalDirection, values: RETRIEVAL_DIRECTIONS },
  { name: 'isFormatReviewStatus', guard: isFormatReviewStatus, values: FORMAT_REVIEW_STATUSES },
  { name: 'isYieldTier', guard: isYieldTier, values: YIELD_TIERS },
  { name: 'isDangerLevel', guard: isDangerLevel, values: DANGER_LEVELS },
  { name: 'isBoardLikelihood', guard: isBoardLikelihood, values: BOARD_LIKELIHOODS },
  { name: 'isSourceStrength', guard: isSourceStrength, values: SOURCE_STRENGTHS },
  { name: 'isReviewPriority', guard: isReviewPriority, values: REVIEW_PRIORITIES },
];

test('every guard accepts every documented value', () => {
  for (const { name, guard, values } of GUARDS) {
    for (const v of values) {
      assert.equal(guard(v), true, `${name} should accept "${v}"`);
    }
  }
});

test('every guard rejects non-string and obviously-wrong inputs', () => {
  for (const { name, guard } of GUARDS) {
    assert.equal(guard(undefined), false, `${name} rejects undefined`);
    assert.equal(guard(null), false, `${name} rejects null`);
    assert.equal(guard(0), false, `${name} rejects number`);
    assert.equal(guard({}), false, `${name} rejects object`);
    assert.equal(guard(['high']), false, `${name} rejects array`);
    assert.equal(guard(''), false, `${name} rejects empty string`);
    assert.equal(guard('NOT_A_REAL_VALUE_123'), false, `${name} rejects garbage string`);
  }
});

test('guards are case-sensitive (DB CHECK constraints are case-sensitive)', () => {
  assert.equal(isYieldTier('HIGH'), false, 'isYieldTier should reject uppercase HIGH');
  assert.equal(isDangerLevel('Lethal'), false, 'isDangerLevel should reject titlecase Lethal');
});
