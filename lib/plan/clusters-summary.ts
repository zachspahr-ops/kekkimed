// Builds the `{{clusters_json}}` payload that `/prompts/plan.md` consumes.
//
// The Phase 4 server action runs a single SQL query joining
// `clusters` × `cluster_memberships` × `cards` × `card_ontology_tags`
// × `card_retrieval_metadata`, materializes that as the `ClusterWithCards`
// shape below, and passes it here. This helper does the per-cluster
// aggregation (concept coverage + planning_summary histograms) that the
// LLM consumes — Postgres does the join, TypeScript does the rollup.
//
// Pure logic. No DB access. Tests use fixture data; production wiring is
// deferred to Phase 4.

import {
  YIELD_TIERS,
  DANGER_LEVELS,
  BOARD_LIKELIHOODS,
  PRIMARY_LATTICES,
  COGNITIVE_TASKS,
  type YieldTier,
  type DangerLevel,
  type BoardLikelihood,
  type PrimaryLattice,
  type CognitiveTask,
} from '../cards/types.ts';

// ---------- Inputs (shape produced by the Phase 4 server SQL query) ----------

/** Per-card planning fields the aggregator reads. Mirrors the columns the
 *  server SELECTs from cards × card_ontology_tags × card_retrieval_metadata. */
export interface CardForPlanning {
  card_id: string;
  yield_tier: YieldTier;
  danger_level: DangerLevel;
  board_likelihood: BoardLikelihood;
  primary_lattice: PrimaryLattice;
  /** From card_retrieval_metadata.cognitive_task (D20). */
  cognitive_task: CognitiveTask;
  /** Union of card_ontology_tags.concept_id rows for this card. */
  concept_ids: readonly string[];
}

export interface ClusterWithCards {
  cluster_id: string;
  name: string;
  description: string | null;
  cards: readonly CardForPlanning[];
}

// ---------- Outputs (shape `/prompts/plan.md` reads) ----------

export interface PlanningSummary {
  yield_tier: Record<YieldTier, number>;
  danger_level: Record<DangerLevel, number>;
  board_likelihood: Record<BoardLikelihood, number>;
  primary_lattice: Record<PrimaryLattice, number>;
  cognitive_task: Record<CognitiveTask, number>;
}

export interface ClusterWithPlanningSummary {
  cluster_id: string;
  name: string;
  description: string | null;
  /** Sorted, deduplicated union of every card's concept_ids in this cluster. */
  concept_coverage: readonly string[];
  card_count: number;
  /** Histograms over D20/D21 enums. Zero buckets are present so the prompt
   *  always sees the full distribution shape — the LLM should not have to
   *  infer "absent = zero". */
  planning_summary: PlanningSummary;
}

// ---------- Implementation ----------

function emptyHistogram<T extends string>(values: readonly T[]): Record<T, number> {
  const out = {} as Record<T, number>;
  for (const v of values) out[v] = 0;
  return out;
}

function summarizeCluster(cluster: ClusterWithCards): ClusterWithPlanningSummary {
  const yield_tier = emptyHistogram(YIELD_TIERS);
  const danger_level = emptyHistogram(DANGER_LEVELS);
  const board_likelihood = emptyHistogram(BOARD_LIKELIHOODS);
  const primary_lattice = emptyHistogram(PRIMARY_LATTICES);
  const cognitive_task = emptyHistogram(COGNITIVE_TASKS);
  const conceptSet = new Set<string>();

  for (const card of cluster.cards) {
    yield_tier[card.yield_tier]++;
    danger_level[card.danger_level]++;
    board_likelihood[card.board_likelihood]++;
    primary_lattice[card.primary_lattice]++;
    cognitive_task[card.cognitive_task]++;
    for (const cid of card.concept_ids) conceptSet.add(cid);
  }

  return {
    cluster_id: cluster.cluster_id,
    name: cluster.name,
    description: cluster.description,
    concept_coverage: [...conceptSet].sort(),
    card_count: cluster.cards.length,
    planning_summary: {
      yield_tier,
      danger_level,
      board_likelihood,
      primary_lattice,
      cognitive_task,
    },
  };
}

/**
 * Aggregates a list of clusters (each with its cards already joined) into the
 * shape `/prompts/plan.md` expects as `{{clusters_json}}`.
 *
 * Output ordering matches input ordering. The server is responsible for any
 * top-N pre-filter when the user has more than ~150 clusters (the prompt's
 * stated bound).
 */
export function buildClustersWithPlanningSummary(
  clusters: readonly ClusterWithCards[],
): readonly ClusterWithPlanningSummary[] {
  return clusters.map(summarizeCluster);
}

// ---------- Optional: relevance pre-filter for huge cluster libraries ----------

/**
 * Returns clusters whose `concept_coverage` overlaps any concept_id in
 * `gapConceptIds`, ranked by overlap count descending. Used by the Phase 4
 * server to keep `{{clusters_json}}` under ~150 entries when a user has a
 * large cluster library.
 *
 * Deterministic tie-break: by `card_count` desc, then by `cluster_id` asc.
 * Stable across runs so prompt caching can hit on repeated inputs.
 */
export function rankClustersByGapOverlap(
  clusters: readonly ClusterWithPlanningSummary[],
  gapConceptIds: readonly string[],
): readonly ClusterWithPlanningSummary[] {
  if (gapConceptIds.length === 0) return clusters;
  const gapSet = new Set(gapConceptIds);

  type Scored = { cluster: ClusterWithPlanningSummary; overlap: number };
  const scored: Scored[] = clusters.map((cluster) => {
    let overlap = 0;
    for (const cid of cluster.concept_coverage) {
      if (gapSet.has(cid)) overlap++;
    }
    return { cluster, overlap };
  });

  scored.sort((a, b) => {
    if (b.overlap !== a.overlap) return b.overlap - a.overlap;
    if (b.cluster.card_count !== a.cluster.card_count) {
      return b.cluster.card_count - a.cluster.card_count;
    }
    return a.cluster.cluster_id.localeCompare(b.cluster.cluster_id);
  });

  return scored.map((s) => s.cluster);
}
