// Tests for the plan-generator clusters aggregation helper.
//
// Run with: pnpm test

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  buildClustersWithPlanningSummary,
  rankClustersByGapOverlap,
  type CardForPlanning,
  type ClusterWithCards,
} from './clusters-summary.ts';
import {
  YIELD_TIERS,
  DANGER_LEVELS,
  BOARD_LIKELIHOODS,
  PRIMARY_LATTICES,
  COGNITIVE_TASKS,
} from '../cards/types.ts';

// ---------- Fixtures ----------

const HFPEF_CONCEPT =
  'cardiovascular_disease.myocardial_disease.heart_failure_with_preserved_ejection_fraction_hfpef';
const HF_CONCEPT = 'cardiovascular_disease.myocardial_disease';
const HYPONATREMIA_CONCEPT = 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia';
const DKA_CONCEPT = 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus';

function card(overrides: Partial<CardForPlanning> & { card_id: string }): CardForPlanning {
  return {
    yield_tier: 'medium',
    danger_level: 'moderate',
    board_likelihood: 'medium',
    primary_lattice: 't_to_m',
    cognitive_task: 'diagnosis_from_clues',
    concept_ids: [],
    ...overrides,
  };
}

const HF_CLUSTER: ClusterWithCards = {
  cluster_id: '11111111-1111-1111-1111-111111111111',
  name: 'Heart Failure GDMT',
  description: 'Guideline-directed medical therapy for HFrEF and HFpEF',
  cards: [
    card({
      card_id: 'c1',
      yield_tier: 'high',
      danger_level: 'high',
      board_likelihood: 'high',
      primary_lattice: 'p_to_e',
      cognitive_task: 'management_treatment',
      concept_ids: [HF_CONCEPT, HFPEF_CONCEPT],
    }),
    card({
      card_id: 'c2',
      yield_tier: 'high',
      danger_level: 'lethal',
      board_likelihood: 'high',
      primary_lattice: 'p_to_e',
      cognitive_task: 'management_treatment',
      concept_ids: [HF_CONCEPT],
    }),
    card({
      card_id: 'c3',
      yield_tier: 'medium',
      danger_level: 'moderate',
      board_likelihood: 'medium',
      primary_lattice: 't_to_m',
      cognitive_task: 'diagnosis_from_clues',
      concept_ids: [HFPEF_CONCEPT],
    }),
  ],
};

const HYPONATREMIA_CLUSTER: ClusterWithCards = {
  cluster_id: '22222222-2222-2222-2222-222222222222',
  name: 'Hyponatremia',
  description: null,
  cards: [
    card({
      card_id: 'c4',
      yield_tier: 'high',
      danger_level: 'lethal',
      board_likelihood: 'high',
      primary_lattice: 's_to_r',
      cognitive_task: 'test_lab_threshold',
      concept_ids: [HYPONATREMIA_CONCEPT],
    }),
    card({
      card_id: 'c5',
      yield_tier: 'medium',
      danger_level: 'moderate',
      board_likelihood: 'medium',
      primary_lattice: 't_to_m',
      cognitive_task: 'diagnosis_from_clues',
      concept_ids: [HYPONATREMIA_CONCEPT],
    }),
  ],
};

const EMPTY_CLUSTER: ClusterWithCards = {
  cluster_id: '33333333-3333-3333-3333-333333333333',
  name: 'Empty cluster',
  description: 'No cards yet',
  cards: [],
};

// ---------- buildClustersWithPlanningSummary ----------

test('produces one summary per input cluster, in input order', () => {
  const out = buildClustersWithPlanningSummary([HF_CLUSTER, HYPONATREMIA_CLUSTER, EMPTY_CLUSTER]);
  assert.equal(out.length, 3);
  assert.equal(out[0].cluster_id, HF_CLUSTER.cluster_id);
  assert.equal(out[1].cluster_id, HYPONATREMIA_CLUSTER.cluster_id);
  assert.equal(out[2].cluster_id, EMPTY_CLUSTER.cluster_id);
});

test('passes through cluster identity fields verbatim', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  assert.equal(hf.cluster_id, HF_CLUSTER.cluster_id);
  assert.equal(hf.name, HF_CLUSTER.name);
  assert.equal(hf.description, HF_CLUSTER.description);
});

test('null description passes through as null (not "" or undefined)', () => {
  const [hypo] = buildClustersWithPlanningSummary([HYPONATREMIA_CLUSTER]);
  assert.strictEqual(hypo.description, null);
});

test('card_count matches input cards length', () => {
  const [hf, hypo, empty] = buildClustersWithPlanningSummary([
    HF_CLUSTER,
    HYPONATREMIA_CLUSTER,
    EMPTY_CLUSTER,
  ]);
  assert.equal(hf.card_count, 3);
  assert.equal(hypo.card_count, 2);
  assert.equal(empty.card_count, 0);
});

// ---------- concept_coverage ----------

test('concept_coverage is a deduplicated union of card concept_ids', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  // c1 has [HF, HFPEF], c2 has [HF], c3 has [HFPEF] → dedupe to {HF, HFPEF}
  assert.deepEqual([...hf.concept_coverage], [HF_CONCEPT, HFPEF_CONCEPT].sort());
});

test('concept_coverage is sorted', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  const ids = [...hf.concept_coverage];
  const sorted = [...ids].sort();
  assert.deepEqual(ids, sorted);
});

test('empty cluster has empty concept_coverage', () => {
  const [empty] = buildClustersWithPlanningSummary([EMPTY_CLUSTER]);
  assert.deepEqual([...empty.concept_coverage], []);
});

// ---------- planning_summary histograms ----------

test('histograms include zero buckets for absent enum values (full distribution shape)', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  // Every YIELD_TIERS member must be a key in the yield_tier histogram.
  for (const tier of YIELD_TIERS) {
    assert.ok(tier in hf.planning_summary.yield_tier, `missing yield_tier bucket "${tier}"`);
  }
  for (const level of DANGER_LEVELS) {
    assert.ok(level in hf.planning_summary.danger_level, `missing danger_level bucket "${level}"`);
  }
  for (const bl of BOARD_LIKELIHOODS) {
    assert.ok(bl in hf.planning_summary.board_likelihood, `missing board_likelihood bucket "${bl}"`);
  }
  for (const pl of PRIMARY_LATTICES) {
    assert.ok(pl in hf.planning_summary.primary_lattice, `missing primary_lattice bucket "${pl}"`);
  }
  for (const ct of COGNITIVE_TASKS) {
    assert.ok(ct in hf.planning_summary.cognitive_task, `missing cognitive_task bucket "${ct}"`);
  }
});

test('histogram counts match the fixture (HF cluster: 2 high yield, 1 medium yield)', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  assert.deepEqual(hf.planning_summary.yield_tier, { high: 2, medium: 1, low: 0 });
});

test('histogram counts match the fixture (HF cluster: 1 high, 1 lethal, 1 moderate, 0 low)', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  assert.deepEqual(hf.planning_summary.danger_level, { low: 0, moderate: 1, high: 1, lethal: 1 });
});

test('histogram counts match the fixture (HF cluster lattice: 2 p_to_e, 1 t_to_m)', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  assert.equal(hf.planning_summary.primary_lattice.p_to_e, 2);
  assert.equal(hf.planning_summary.primary_lattice.t_to_m, 1);
  assert.equal(hf.planning_summary.primary_lattice.e_to_o, 0);
  assert.equal(hf.planning_summary.primary_lattice.s_to_r, 0);
});

test('histogram counts match the fixture (HF cluster cognitive_task: 2 management, 1 diagnosis)', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  assert.equal(hf.planning_summary.cognitive_task.management_treatment, 2);
  assert.equal(hf.planning_summary.cognitive_task.diagnosis_from_clues, 1);
  assert.equal(hf.planning_summary.cognitive_task.test_lab_threshold, 0);
});

test('Hyponatremia cluster has expected lethal bucket and threshold cognitive task', () => {
  const [hypo] = buildClustersWithPlanningSummary([HYPONATREMIA_CLUSTER]);
  assert.equal(hypo.planning_summary.danger_level.lethal, 1);
  assert.equal(hypo.planning_summary.cognitive_task.test_lab_threshold, 1);
});

test('empty cluster has all-zero histograms', () => {
  const [empty] = buildClustersWithPlanningSummary([EMPTY_CLUSTER]);
  for (const v of Object.values(empty.planning_summary.yield_tier)) {
    assert.equal(v, 0);
  }
  for (const v of Object.values(empty.planning_summary.danger_level)) {
    assert.equal(v, 0);
  }
});

test('histogram counts sum to card_count for every enum field', () => {
  const [hf] = buildClustersWithPlanningSummary([HF_CLUSTER]);
  for (const histogram of [
    hf.planning_summary.yield_tier,
    hf.planning_summary.danger_level,
    hf.planning_summary.board_likelihood,
    hf.planning_summary.primary_lattice,
    hf.planning_summary.cognitive_task,
  ]) {
    const total = Object.values(histogram).reduce((acc, n) => acc + n, 0);
    assert.equal(total, hf.card_count, 'histogram sum should equal card_count');
  }
});

// ---------- rankClustersByGapOverlap ----------

test('rankClustersByGapOverlap returns clusters unchanged when no gaps', () => {
  const summarized = buildClustersWithPlanningSummary([HF_CLUSTER, HYPONATREMIA_CLUSTER]);
  const ranked = rankClustersByGapOverlap(summarized, []);
  assert.equal(ranked.length, 2);
  assert.equal(ranked[0].cluster_id, HF_CLUSTER.cluster_id);
  assert.equal(ranked[1].cluster_id, HYPONATREMIA_CLUSTER.cluster_id);
});

test('rankClustersByGapOverlap puts higher-overlap clusters first', () => {
  const summarized = buildClustersWithPlanningSummary([HYPONATREMIA_CLUSTER, HF_CLUSTER]);
  // Only HF cluster overlaps the HF concept; hyponatremia cluster doesn't.
  const ranked = rankClustersByGapOverlap(summarized, [HF_CONCEPT]);
  assert.equal(ranked[0].cluster_id, HF_CLUSTER.cluster_id);
  assert.equal(ranked[1].cluster_id, HYPONATREMIA_CLUSTER.cluster_id);
});

test('rankClustersByGapOverlap tie-breaks by card_count desc, then cluster_id asc', () => {
  // Two clusters both overlap zero gap concepts; HF has more cards (3) than hypo (2).
  const summarized = buildClustersWithPlanningSummary([HYPONATREMIA_CLUSTER, HF_CLUSTER]);
  const ranked = rankClustersByGapOverlap(summarized, [DKA_CONCEPT]);
  assert.equal(ranked[0].cluster_id, HF_CLUSTER.cluster_id, 'larger cluster first when overlap ties');
});

test('rankClustersByGapOverlap counts every overlapping concept (not just first)', () => {
  // Build a cluster that hits both gap concepts to verify multi-overlap scoring.
  const multiHit: ClusterWithCards = {
    cluster_id: '44444444-4444-4444-4444-444444444444',
    name: 'Multi-hit',
    description: null,
    cards: [
      card({
        card_id: 'cm1',
        concept_ids: [HF_CONCEPT, HYPONATREMIA_CONCEPT, DKA_CONCEPT],
      }),
    ],
  };
  const summarized = buildClustersWithPlanningSummary([multiHit, HF_CLUSTER, HYPONATREMIA_CLUSTER]);
  const ranked = rankClustersByGapOverlap(summarized, [HF_CONCEPT, HYPONATREMIA_CONCEPT]);
  // Multi-hit overlaps 2; HF overlaps 1; hypo overlaps 1.
  assert.equal(ranked[0].cluster_id, multiHit.cluster_id);
});

test('rankClustersByGapOverlap is deterministic across runs', () => {
  const summarized = buildClustersWithPlanningSummary([HYPONATREMIA_CLUSTER, HF_CLUSTER, EMPTY_CLUSTER]);
  const a = rankClustersByGapOverlap(summarized, [HF_CONCEPT, HYPONATREMIA_CONCEPT]);
  const b = rankClustersByGapOverlap(summarized, [HF_CONCEPT, HYPONATREMIA_CONCEPT]);
  assert.deepEqual(
    a.map((c) => c.cluster_id),
    b.map((c) => c.cluster_id),
  );
});
