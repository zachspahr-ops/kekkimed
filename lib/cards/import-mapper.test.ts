// Tests for the validated-payload → DB-insert-rows mapper.

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mapNormalizedPayloadToInsertRows } from './import-mapper.ts';
import { validateImportPayload } from './import-schema.ts';

const AUTHOR_ID = 'author-uuid-aaaaaaaaaaaaaaaaaaaaaa';

/** Deterministic ID generator: returns 'id-1', 'id-2', ... so test assertions
 *  can match exact values without crypto randomness. */
function makeFakeIdGenerator(): () => string {
  let n = 0;
  return () => `id-${++n}`;
}

function minimalCard(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    prompt: 'Q?',
    answer: 'A.',
    citation: 'cite',
    difficulty: 'core',
    primary_lattice: 't_to_m',
    card_format: 'single_term_direct_cloze',
    cognitive_task: 'diagnosis_from_clues',
    ontology_tags: [
      {
        concept_id: 'cardiovascular_disease',
        tag_role: 'primary',
        granularity: 'system',
        tag_source: 'manual_override',
      },
    ],
    cluster_id: '11111111-1111-1111-1111-111111111111',
    ...overrides,
  };
}

function validate(...cards: Array<Record<string, unknown>>) {
  const result = validateImportPayload({ cards });
  if (!result.valid) {
    throw new Error(
      `fixture failed validation: ${result.errors.map((e) => `${e.path.join('.')}=${e.code}`).join(', ')}`,
    );
  }
  return result.payload;
}

// ---------- Single card → 5-row output ----------

test('single existing-cluster card produces 1 card + 1 metadata + 1 tag + 0 clusters + 1 membership', () => {
  const payload = validate(minimalCard());
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });

  assert.equal(rows.cards.length, 1);
  assert.equal(rows.card_retrieval_metadata.length, 1);
  assert.equal(rows.card_ontology_tags.length, 1);
  assert.equal(rows.clusters.length, 0);
  assert.equal(rows.cluster_memberships.length, 1);
});

test('cards row has source=external_pipeline, status=draft, author_user_id wired', () => {
  const payload = validate(minimalCard());
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const [card] = rows.cards;
  assert.equal(card.source, 'external_pipeline');
  assert.equal(card.status, 'draft');
  assert.equal(card.author_user_id, AUTHOR_ID);
});

test('cards row preserves every input field verbatim', () => {
  const payload = validate(
    minimalCard({
      yield_tier: 'high',
      danger_level: 'lethal',
      board_likelihood: 'high',
      source_strength: 'society_guideline',
      review_priority: 'high',
      primary_system_id: 'cardiovascular_disease',
      secondary_system_ids: ['nephrology_and_urology'],
      bridge_reason: 'cardiorenal',
      secondary_lattices: ['d_to_t', 'tx_to_mon'],
      citation_kind: 'guideline',
    }),
  );
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const [card] = rows.cards;
  assert.equal(card.yield_tier, 'high');
  assert.equal(card.danger_level, 'lethal');
  assert.equal(card.board_likelihood, 'high');
  assert.equal(card.source_strength, 'society_guideline');
  assert.equal(card.review_priority, 'high');
  assert.equal(card.primary_system_id, 'cardiovascular_disease');
  assert.deepEqual(card.secondary_system_ids, ['nephrology_and_urology']);
  assert.equal(card.bridge_reason, 'cardiorenal');
  assert.deepEqual(card.secondary_lattices, ['d_to_t', 'tx_to_mon']);
  assert.equal(card.citation_kind, 'guideline');
});

test('card_retrieval_metadata row links to card by id and preserves m003 fields', () => {
  const payload = validate(
    minimalCard({
      retrieval_direction: 'forward',
      discriminator: 'rate vs total',
      requires_cloze_one_by_one: true,
      format_confidence: 0.85,
      format_review_status: 'approved',
    }),
  );
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const [card] = rows.cards;
  const [meta] = rows.card_retrieval_metadata;
  assert.equal(meta.card_id, card.id);
  assert.equal(meta.retrieval_direction, 'forward');
  assert.equal(meta.discriminator, 'rate vs total');
  assert.equal(meta.requires_cloze_one_by_one, true);
  assert.equal(meta.format_confidence, 0.85);
  assert.equal(meta.format_review_status, 'approved');
});

test('card_ontology_tags rows: review_status defaults to "accepted" (D19)', () => {
  const payload = validate(
    minimalCard({
      ontology_tags: [
        {
          concept_id: 'a',
          tag_role: 'primary',
          granularity: 'topic',
          tag_source: 'model',
          tagger_version: 'v1',
        },
        {
          concept_id: 'b',
          tag_role: 'bridge',
          granularity: 'subsection',
          tag_source: 'manual_override',
        },
      ],
    }),
  );
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.card_ontology_tags.length, 2);
  for (const tag of rows.card_ontology_tags) {
    assert.equal(tag.review_status, 'accepted');
  }
  assert.equal(rows.card_ontology_tags[0].tagger_version, 'v1');
});

test('cluster_memberships row links existing cluster_id verbatim', () => {
  const payload = validate(minimalCard({ cluster_id: '99999999-9999-9999-9999-999999999999' }));
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const [membership] = rows.cluster_memberships;
  assert.equal(membership.cluster_id, '99999999-9999-9999-9999-999999999999');
});

// ---------- New-cluster path ----------

test('cluster_definition produces one ClusterInsertRow with owner_user_id wired', () => {
  const card = minimalCard();
  delete card.cluster_id;
  card.cluster_definition = {
    name: 'New Cluster',
    description: 'fresh',
    visibility: 'shared',
  };
  const payload = validate(card);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.clusters.length, 1);
  const [cluster] = rows.clusters;
  assert.equal(cluster.owner_user_id, AUTHOR_ID);
  assert.equal(cluster.name, 'New Cluster');
  assert.equal(cluster.description, 'fresh');
  assert.equal(cluster.visibility, 'shared');
});

test('cluster_membership.cluster_id matches the generated cluster id (FK link)', () => {
  const card = minimalCard();
  delete card.cluster_id;
  card.cluster_definition = { name: 'Test' };
  const payload = validate(card);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const [cluster] = rows.clusters;
  const [membership] = rows.cluster_memberships;
  assert.equal(membership.cluster_id, cluster.id);
});

// ---------- Cluster definition deduplication ----------

test('two cards with the same cluster_definition.name share one ClusterInsertRow', () => {
  const cardA = minimalCard();
  const cardB = minimalCard({ prompt: 'Q2?' });
  delete cardA.cluster_id;
  delete cardB.cluster_id;
  cardA.cluster_definition = { name: 'Shared' };
  cardB.cluster_definition = { name: 'Shared' };
  const payload = validate(cardA, cardB);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.clusters.length, 1, 'expected one new cluster (deduped by name)');
  assert.equal(rows.cluster_memberships.length, 2, 'expected two memberships');
  // Both memberships should point at the same cluster id.
  assert.equal(
    rows.cluster_memberships[0].cluster_id,
    rows.cluster_memberships[1].cluster_id,
  );
  assert.equal(rows.cluster_memberships[0].cluster_id, rows.clusters[0].id);
});

test('two cards with different cluster_definition.names produce two ClusterInsertRows', () => {
  const cardA = minimalCard();
  const cardB = minimalCard({ prompt: 'Q2?' });
  delete cardA.cluster_id;
  delete cardB.cluster_id;
  cardA.cluster_definition = { name: 'A' };
  cardB.cluster_definition = { name: 'B' };
  const payload = validate(cardA, cardB);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.clusters.length, 2);
  const names = rows.clusters.map((c) => c.name).sort();
  assert.deepEqual(names, ['A', 'B']);
});

test('mix of existing cluster_id and new cluster_definition keeps both paths separate', () => {
  const cardA = minimalCard({ cluster_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' });
  const cardB = minimalCard({ prompt: 'Q2?' });
  delete cardB.cluster_id;
  cardB.cluster_definition = { name: 'New' };
  const payload = validate(cardA, cardB);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.clusters.length, 1);
  assert.equal(rows.cluster_memberships.length, 2);
  assert.equal(
    rows.cluster_memberships[0].cluster_id,
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  );
  assert.equal(rows.cluster_memberships[1].cluster_id, rows.clusters[0].id);
});

// ---------- Position assignment ----------

test('position is 1-indexed and increments per cluster', () => {
  const c1 = minimalCard({ prompt: 'Q1?' });
  const c2 = minimalCard({ prompt: 'Q2?' });
  const c3 = minimalCard({ prompt: 'Q3?' });
  const payload = validate(c1, c2, c3);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const positions = rows.cluster_memberships.map((m) => m.position);
  assert.deepEqual(positions, [1, 2, 3]);
});

test('position counters are independent per cluster', () => {
  const c1 = minimalCard({ cluster_id: 'aa' });
  const c2 = minimalCard({ cluster_id: 'bb' });
  const c3 = minimalCard({ cluster_id: 'aa' });
  const c4 = minimalCard({ cluster_id: 'bb' });
  const payload = validate(c1, c2, c3, c4);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const positionsByCluster = new Map<string, number[]>();
  for (const m of rows.cluster_memberships) {
    const arr = positionsByCluster.get(m.cluster_id) ?? [];
    arr.push(m.position);
    positionsByCluster.set(m.cluster_id, arr);
  }
  assert.deepEqual(positionsByCluster.get('aa'), [1, 2]);
  assert.deepEqual(positionsByCluster.get('bb'), [1, 2]);
});

// ---------- ID generation ----------

test('every card gets a unique id and FKs are wired correctly', () => {
  const payload = validate(
    minimalCard({ prompt: 'Q1' }),
    minimalCard({ prompt: 'Q2' }),
    minimalCard({ prompt: 'Q3' }),
  );
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  const cardIds = rows.cards.map((c) => c.id);
  assert.equal(new Set(cardIds).size, 3, 'card ids should be unique');
  // Every card has a matching metadata row.
  for (const card of rows.cards) {
    const meta = rows.card_retrieval_metadata.find((m) => m.card_id === card.id);
    assert.ok(meta, `expected card_retrieval_metadata for card ${card.id}`);
  }
  // Every card has a matching membership row.
  for (const card of rows.cards) {
    const mem = rows.cluster_memberships.find((m) => m.card_id === card.id);
    assert.ok(mem, `expected cluster_membership for card ${card.id}`);
  }
});

test('default crypto.randomUUID generator works when no generator is injected', () => {
  // Non-deterministic, just smoke-test it produces a valid string.
  const payload = validate(minimalCard());
  const rows = mapNormalizedPayloadToInsertRows(payload, { authorUserId: AUTHOR_ID });
  const card = rows.cards[0];
  assert.match(card.id, /^[0-9a-f]{8}-[0-9a-f]{4}-/, 'default generator produces UUID-shaped string');
});

// ---------- Defensive invariants ----------

test('mapper output has exactly one membership per card', () => {
  const cards = Array.from({ length: 10 }, (_, i) => minimalCard({ prompt: `Q${i}` }));
  const payload = validate(...cards);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.cluster_memberships.length, rows.cards.length);
});

test('mapper output has exactly one card_retrieval_metadata per card', () => {
  const cards = Array.from({ length: 10 }, (_, i) => minimalCard({ prompt: `Q${i}` }));
  const payload = validate(...cards);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.card_retrieval_metadata.length, rows.cards.length);
});

test('total card_ontology_tags equals sum of ontology_tags across input cards', () => {
  const c1 = minimalCard();
  const c2 = minimalCard({
    ontology_tags: [
      { concept_id: 'a', tag_role: 'primary', granularity: 'topic', tag_source: 'manual_override' },
      { concept_id: 'b', tag_role: 'bridge', granularity: 'subsection', tag_source: 'manual_override' },
      { concept_id: 'c', tag_role: 'planning_only', granularity: 'system', tag_source: 'manual_override' },
    ],
  });
  const payload = validate(c1, c2);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.equal(rows.card_ontology_tags.length, 1 + 3);
});

test('mapper preserves input order of cards', () => {
  const c1 = minimalCard({ prompt: 'first' });
  const c2 = minimalCard({ prompt: 'second' });
  const c3 = minimalCard({ prompt: 'third' });
  const payload = validate(c1, c2, c3);
  const rows = mapNormalizedPayloadToInsertRows(payload, {
    authorUserId: AUTHOR_ID,
    generateId: makeFakeIdGenerator(),
  });
  assert.deepEqual(rows.cards.map((c) => c.prompt), ['first', 'second', 'third']);
});
