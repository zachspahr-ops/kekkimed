// Unit tests for D22 deterministic-planner math.
// Run with: pnpm test

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  outcomeFromReview,
  emaUpdate,
  distributeSubsectionWeight,
  rankWeakTopics,
  weakness,
  EMA_ALPHA_DEFAULT,
  SLOW_THRESHOLD_MS,
  OUTCOME_AGAIN,
  OUTCOME_FAST_GOOD,
  OUTCOME_SLOW_GOOD,
  type TopicForRanking,
} from './score.ts';

// ---------- outcomeFromReview ----------

test('outcomeFromReview: again → 0', () => {
  assert.equal(outcomeFromReview('again', 0), OUTCOME_AGAIN);
  assert.equal(outcomeFromReview('again', 50_000), OUTCOME_AGAIN);
  assert.equal(outcomeFromReview('again', 999_999), OUTCOME_AGAIN);
});

test('outcomeFromReview: good and fast → 1', () => {
  assert.equal(outcomeFromReview('good', 0), OUTCOME_FAST_GOOD);
  assert.equal(outcomeFromReview('good', SLOW_THRESHOLD_MS - 1), OUTCOME_FAST_GOOD);
});

test('outcomeFromReview: good and slow → 0.5', () => {
  assert.equal(outcomeFromReview('good', SLOW_THRESHOLD_MS), OUTCOME_SLOW_GOOD);
  assert.equal(outcomeFromReview('good', SLOW_THRESHOLD_MS + 1), OUTCOME_SLOW_GOOD);
  assert.equal(outcomeFromReview('good', 999_999), OUTCOME_SLOW_GOOD);
});

// ---------- emaUpdate ----------

test('emaUpdate: pulls toward outcome with default alpha', () => {
  const next = emaUpdate(0.5, 1, EMA_ALPHA_DEFAULT);
  // 0.3 * 1 + 0.7 * 0.5 = 0.65 (with float drift)
  assert.ok(Math.abs(next - 0.65) < 1e-9, `expected ~0.65, got ${next}`);
});

test('emaUpdate: alpha=1 returns outcome regardless of prev', () => {
  assert.equal(emaUpdate(0.0, 1, 1), 1);
  assert.equal(emaUpdate(1.0, 0, 1), 0);
  assert.equal(emaUpdate(0.5, 0.5, 1), 0.5);
});

test('emaUpdate: alpha=0 returns prev regardless of outcome', () => {
  assert.equal(emaUpdate(0.42, 1, 0), 0.42);
  assert.equal(emaUpdate(0.42, 0, 0), 0.42);
});

test('emaUpdate: clamps to [0,1]', () => {
  // These shouldn't actually exceed [0,1] given valid inputs, but the
  // clamp is a defensive backstop.
  assert.equal(emaUpdate(2, 2, 0.5), 1);
  assert.equal(emaUpdate(-1, -1, 0.5), 0);
});

test('emaUpdate: idempotent when prev = outcome', () => {
  assert.equal(emaUpdate(0.7, 0.7, 0.3), 0.7);
  assert.equal(emaUpdate(0.0, 0.0, 0.3), 0.0);
  assert.equal(emaUpdate(1.0, 1.0, 0.3), 1.0);
});

test('emaUpdate: three "good and fast" reviews from 0 cross 0.5', () => {
  // From cold start (prev=0), three correct-and-fast reviews should
  // raise competence above 0.5. Sanity check on alpha=0.3.
  let s = 0;
  s = emaUpdate(s, OUTCOME_FAST_GOOD); // 0.3
  s = emaUpdate(s, OUTCOME_FAST_GOOD); // 0.51
  s = emaUpdate(s, OUTCOME_FAST_GOOD); // 0.657
  assert.ok(s > 0.5, `expected >0.5 after 3 good+fast, got ${s}`);
});

// ---------- distributeSubsectionWeight ----------

test('distributeSubsectionWeight: even split', () => {
  assert.equal(distributeSubsectionWeight(0.05, 5), 0.01);
  assert.equal(distributeSubsectionWeight(0.14, 14), 0.01);
});

test('distributeSubsectionWeight: zero topics → 0', () => {
  assert.equal(distributeSubsectionWeight(0.05, 0), 0);
  assert.equal(distributeSubsectionWeight(0.05, -1), 0);
});

test('distributeSubsectionWeight: zero weight → 0', () => {
  assert.equal(distributeSubsectionWeight(0, 5), 0);
});

// ---------- weakness ----------

test('weakness: high importance + low competence → high weakness', () => {
  assert.equal(weakness({ importance: 0.02, competence: 0 }), 0.02);
});

test('weakness: high importance + full competence → 0', () => {
  assert.equal(weakness({ importance: 0.02, competence: 1 }), 0);
});

test('weakness: zero importance → 0 regardless of competence', () => {
  assert.equal(weakness({ importance: 0, competence: 0 }), 0);
  assert.equal(weakness({ importance: 0, competence: 1 }), 0);
});

// ---------- rankWeakTopics ----------

const t = (
  topic_id: string,
  system_id: string,
  subsection_id: string,
  importance: number,
  competence: number,
): TopicForRanking => ({ topic_id, system_id, subsection_id, importance, competence });

test('rankWeakTopics: empty input → empty result', () => {
  assert.deepEqual(rankWeakTopics([], 3), []);
});

test('rankWeakTopics: k=0 → empty result', () => {
  const topics = [t('a.b.c', 'a', 'a.b', 0.01, 0)];
  assert.deepEqual(rankWeakTopics(topics, 0), []);
});

test('rankWeakTopics: picks 3 weakest when systems all differ', () => {
  const topics = [
    t('cardio.x.aaa', 'cardio', 'cardio.x', 0.02, 0.0), // weakness 0.020
    t('nephro.y.bbb', 'nephro', 'nephro.y', 0.015, 0.0), // weakness 0.015
    t('endo.z.ccc', 'endo', 'endo.z', 0.01, 0.0),       // weakness 0.010
    t('pulm.w.ddd', 'pulm', 'pulm.w', 0.005, 0.0),      // weakness 0.005
  ];
  const picks = rankWeakTopics(topics, 3);
  assert.equal(picks.length, 3);
  assert.equal(picks[0].topic_id, 'cardio.x.aaa');
  assert.equal(picks[1].topic_id, 'nephro.y.bbb');
  assert.equal(picks[2].topic_id, 'endo.z.ccc');
});

test('rankWeakTopics: system diversity guard skips same-system topic', () => {
  const topics = [
    t('cardio.a.t1', 'cardio', 'cardio.a', 0.02, 0.0), // weakness 0.020 (picked)
    t('cardio.b.t2', 'cardio', 'cardio.b', 0.018, 0.0), // weakness 0.018 (skipped — same system)
    t('nephro.x.t3', 'nephro', 'nephro.x', 0.015, 0.0), // weakness 0.015 (picked)
    t('endo.y.t4', 'endo', 'endo.y', 0.012, 0.0),       // weakness 0.012 (picked)
  ];
  const picks = rankWeakTopics(topics, 3);
  assert.equal(picks.length, 3);
  assert.deepEqual(
    picks.map((p) => p.topic_id),
    ['cardio.a.t1', 'nephro.x.t3', 'endo.y.t4'],
  );
});

test('rankWeakTopics: subsection-diversity fallback when only one system available', () => {
  const topics = [
    t('cardio.a.t1', 'cardio', 'cardio.a', 0.02, 0.0),  // picked first
    t('cardio.b.t2', 'cardio', 'cardio.b', 0.018, 0.0), // skipped phase 1; picked phase 2 (different sub)
    t('cardio.a.t3', 'cardio', 'cardio.a', 0.017, 0.0), // skipped phase 1+2 (same sub as t1)
    t('cardio.c.t4', 'cardio', 'cardio.c', 0.015, 0.0), // picked phase 2 (different sub)
  ];
  const picks = rankWeakTopics(topics, 3);
  assert.equal(picks.length, 3);
  assert.deepEqual(
    picks.map((p) => p.topic_id),
    ['cardio.a.t1', 'cardio.b.t2', 'cardio.c.t4'],
  );
});

test('rankWeakTopics: degenerate fallback fills slots when even subsection diversity exhausted', () => {
  const topics = [
    t('cardio.a.t1', 'cardio', 'cardio.a', 0.02, 0.0),  // picked
    t('cardio.a.t2', 'cardio', 'cardio.a', 0.018, 0.0), // not picked phases 1/2; picked phase 3
    t('cardio.a.t3', 'cardio', 'cardio.a', 0.017, 0.0), // picked phase 3
  ];
  const picks = rankWeakTopics(topics, 3);
  assert.equal(picks.length, 3);
  assert.deepEqual(
    picks.map((p) => p.topic_id),
    ['cardio.a.t1', 'cardio.a.t2', 'cardio.a.t3'],
  );
});

test('rankWeakTopics: returns fewer than k when input is smaller', () => {
  const topics = [
    t('cardio.a.t1', 'cardio', 'cardio.a', 0.02, 0.0),
    t('nephro.x.t2', 'nephro', 'nephro.x', 0.01, 0.0),
  ];
  const picks = rankWeakTopics(topics, 3);
  assert.equal(picks.length, 2);
});

test('rankWeakTopics: tie-break stable by topic_id asc', () => {
  const topics = [
    t('z.b.t', 'z', 'z.b', 0.01, 0.5),
    t('a.b.t', 'a', 'a.b', 0.01, 0.5),
    t('m.b.t', 'm', 'm.b', 0.01, 0.5),
  ];
  // All have identical weakness 0.005 — order should be a, m, z by topic_id.
  const picks = rankWeakTopics(topics, 3);
  assert.deepEqual(
    picks.map((p) => p.topic_id),
    ['a.b.t', 'm.b.t', 'z.b.t'],
  );
});

test('rankWeakTopics: includes computed weakness on each pick', () => {
  const topics = [
    t('cardio.a.t1', 'cardio', 'cardio.a', 0.02, 0.5),
  ];
  const picks = rankWeakTopics(topics, 1);
  assert.equal(picks[0].weakness, 0.01); // 0.02 * (1 - 0.5)
});

test('rankWeakTopics: zero-importance topics rank last', () => {
  const topics = [
    t('zero.x.t', 'zero', 'zero.x', 0, 0),       // weakness 0
    t('low.x.t', 'low', 'low.x', 0.001, 0.0),    // weakness 0.001
  ];
  const picks = rankWeakTopics(topics, 2);
  assert.equal(picks[0].topic_id, 'low.x.t');
  assert.equal(picks[1].topic_id, 'zero.x.t');
});
