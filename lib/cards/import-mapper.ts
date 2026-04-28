// Maps a validated NormalizedImportPayload (from import-schema.ts) into the
// flat list of multi-table insert rows the Phase 6 server action will hand
// to Supabase. Pure logic; no DB access.
//
// After this lands, `POST /api/cards/import` looks like:
//
//   const result = validateImportPayload(req.body);
//   if (!result.valid) return badRequest(result.errors);
//   const rows = mapNormalizedPayloadToInsertRows(result.payload, {
//     authorUserId: session.user.id,
//   });
//   await supabase.transaction(async (tx) => {
//     await tx.from('clusters').insert(rows.clusters);
//     await tx.from('cards').insert(rows.cards);
//     await tx.from('card_retrieval_metadata').insert(rows.card_retrieval_metadata);
//     await tx.from('card_ontology_tags').insert(rows.card_ontology_tags);
//     await tx.from('cluster_memberships').insert(rows.cluster_memberships);
//   });
//
// The DB enforces all the same vocabulary checks (D7/D17/D19/D20/D21 CHECK
// constraints, RLS, the cards_status_transition trigger). The mapper just
// needs to produce coherent rows in the right shape.

import type { NormalizedImportPayload } from './import-schema.ts';
import type {
  BoardLikelihood,
  CardFormat,
  CardSource,
  CardStatus,
  CitationKind,
  CognitiveTask,
  DangerLevel,
  Difficulty,
  FormatReviewStatus,
  Granularity,
  PrimaryLattice,
  RetrievalDirection,
  ReviewPriority,
  SecondaryLattice,
  SourceStrength,
  TagRole,
  TagReviewStatus,
  TagSource,
  YieldTier,
} from './types.ts';

// ---------- Insert row shapes (one per target table) ----------

export interface CardInsertRow {
  id: string;
  prompt: string;
  answer: string;
  citation: string;
  citation_kind: CitationKind;
  /** Always 'external_pipeline' for import (D13). */
  source: CardSource;
  /** Always 'draft' for import (D7 — promotion to 'reviewed' requires 24h cooling). */
  status: CardStatus;
  author_user_id: string;
  difficulty: Difficulty;
  primary_lattice: PrimaryLattice;
  secondary_lattices: SecondaryLattice[];
  card_format: CardFormat;
  yield_tier: YieldTier;
  danger_level: DangerLevel;
  board_likelihood: BoardLikelihood;
  source_strength: SourceStrength;
  review_priority: ReviewPriority;
  primary_system_id: string | null;
  secondary_system_ids: string[];
  bridge_reason: string | null;
}

export interface CardRetrievalMetadataInsertRow {
  card_id: string;
  cognitive_task: CognitiveTask;
  prompt_frame: string | null;
  answer_form: string | null;
  retrieval_direction: RetrievalDirection | null;
  discriminator: string | null;
  confusable_with: string | null;
  requires_cloze_one_by_one: boolean;
  cloze_grouping: string | null;
  format_confidence: number | null;
  format_review_status: FormatReviewStatus;
  format_review_note: string | null;
}

export interface CardOntologyTagInsertRow {
  card_id: string;
  concept_id: string;
  tag_role: TagRole;
  granularity: Granularity;
  confidence: number;
  tag_source: TagSource;
  tagger_version: string | null;
  /** Pipeline-supplied tags are accepted by default per D19. The tag-review
   *  workflow can downgrade later. */
  review_status: TagReviewStatus;
}

export interface ClusterInsertRow {
  id: string;
  owner_user_id: string;
  name: string;
  description: string | null;
  visibility: 'private' | 'shared';
}

export interface ClusterMembershipInsertRow {
  cluster_id: string;
  card_id: string;
  /** 1-indexed position within the cluster, in input order. The route handler
   *  may offset by existing-card count if appending to a non-empty cluster. */
  position: number;
}

export interface ImportInsertRows {
  /** New clusters created from `cluster_definition` payload entries. Empty
   *  if every card targeted an existing `cluster_id`. */
  clusters: ClusterInsertRow[];
  cards: CardInsertRow[];
  /** 1:1 with `cards`. */
  card_retrieval_metadata: CardRetrievalMetadataInsertRow[];
  /** N per card. */
  card_ontology_tags: CardOntologyTagInsertRow[];
  /** Exactly one per card. */
  cluster_memberships: ClusterMembershipInsertRow[];
}

// ---------- Options ----------

export interface MapperOptions {
  /** Authenticated user ID — populates `cards.author_user_id` and `clusters.owner_user_id`. */
  authorUserId: string;
  /** UUID generator. Defaults to `crypto.randomUUID()`. Inject for deterministic tests. */
  generateId?: () => string;
}

// ---------- Mapper ----------

const TAG_REVIEW_STATUS_DEFAULT: TagReviewStatus = 'accepted';
const IMPORT_SOURCE: CardSource = 'external_pipeline';
const IMPORT_STATUS: CardStatus = 'draft';

/**
 * Maps a validated import payload to the flat insert rows for the multi-table
 * write. Cluster definitions are deduplicated by name within the batch — two
 * cards both specifying `cluster_definition: { name: "Hyponatremia" }` share
 * one new cluster_id and produce one ClusterInsertRow.
 *
 * Cluster_ids referencing existing clusters pass through verbatim. The route
 * handler is responsible for verifying those exist and belong to the
 * authenticated user before inserting (the mapper does not query the DB).
 */
export function mapNormalizedPayloadToInsertRows(
  payload: NormalizedImportPayload,
  options: MapperOptions,
): ImportInsertRows {
  const generateId = options.generateId ?? (() => globalThis.crypto.randomUUID());
  const { authorUserId } = options;

  // ------- Phase 1: dedupe new cluster definitions by name -------
  const newClustersByName = new Map<string, ClusterInsertRow>();
  for (const card of payload.cards) {
    if (!card.cluster_definition) continue;
    if (newClustersByName.has(card.cluster_definition.name)) continue;
    newClustersByName.set(card.cluster_definition.name, {
      id: generateId(),
      owner_user_id: authorUserId,
      name: card.cluster_definition.name,
      description: card.cluster_definition.description,
      visibility: card.cluster_definition.visibility,
    });
  }

  // ------- Phase 2: per-cluster position counter -------
  const positionByCluster = new Map<string, number>();
  function nextPosition(clusterId: string): number {
    const next = (positionByCluster.get(clusterId) ?? 0) + 1;
    positionByCluster.set(clusterId, next);
    return next;
  }

  // ------- Phase 3: walk cards, build per-card rows -------
  const cards: CardInsertRow[] = [];
  const card_retrieval_metadata: CardRetrievalMetadataInsertRow[] = [];
  const card_ontology_tags: CardOntologyTagInsertRow[] = [];
  const cluster_memberships: ClusterMembershipInsertRow[] = [];

  for (const card of payload.cards) {
    const card_id = generateId();
    const cluster_id = resolveClusterId(card, newClustersByName);

    cards.push({
      id: card_id,
      prompt: card.prompt,
      answer: card.answer,
      citation: card.citation,
      citation_kind: card.citation_kind,
      source: IMPORT_SOURCE,
      status: IMPORT_STATUS,
      author_user_id: authorUserId,
      difficulty: card.difficulty,
      primary_lattice: card.primary_lattice,
      secondary_lattices: [...card.secondary_lattices],
      card_format: card.card_format,
      yield_tier: card.yield_tier,
      danger_level: card.danger_level,
      board_likelihood: card.board_likelihood,
      source_strength: card.source_strength,
      review_priority: card.review_priority,
      primary_system_id: card.primary_system_id,
      secondary_system_ids: [...card.secondary_system_ids],
      bridge_reason: card.bridge_reason,
    });

    card_retrieval_metadata.push({
      card_id,
      cognitive_task: card.cognitive_task,
      prompt_frame: card.prompt_frame,
      answer_form: card.answer_form,
      retrieval_direction: card.retrieval_direction,
      discriminator: card.discriminator,
      confusable_with: card.confusable_with,
      requires_cloze_one_by_one: card.requires_cloze_one_by_one,
      cloze_grouping: card.cloze_grouping,
      format_confidence: card.format_confidence,
      format_review_status: card.format_review_status,
      format_review_note: card.format_review_note,
    });

    for (const tag of card.ontology_tags) {
      card_ontology_tags.push({
        card_id,
        concept_id: tag.concept_id,
        tag_role: tag.tag_role,
        granularity: tag.granularity,
        confidence: tag.confidence,
        tag_source: tag.tag_source,
        tagger_version: tag.tagger_version,
        review_status: TAG_REVIEW_STATUS_DEFAULT,
      });
    }

    cluster_memberships.push({
      cluster_id,
      card_id,
      position: nextPosition(cluster_id),
    });
  }

  return {
    clusters: [...newClustersByName.values()],
    cards,
    card_retrieval_metadata,
    card_ontology_tags,
    cluster_memberships,
  };
}

// ---------- Helpers ----------

function resolveClusterId(
  card: NormalizedImportPayload['cards'][number],
  newClustersByName: ReadonlyMap<string, ClusterInsertRow>,
): string {
  if (card.cluster_id) return card.cluster_id;
  if (card.cluster_definition) {
    const cluster = newClustersByName.get(card.cluster_definition.name);
    if (!cluster) {
      // Unreachable — Phase 1 populates this map for every cluster_definition.
      throw new Error(
        `mapper invariant: cluster_definition "${card.cluster_definition.name}" not in newClustersByName map`,
      );
    }
    return cluster.id;
  }
  // Unreachable — validator guarantees exactly one of cluster_id / cluster_definition.
  throw new Error(
    'mapper invariant: NormalizedCard must have either cluster_id or cluster_definition',
  );
}
