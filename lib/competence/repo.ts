// D22 — DB layer for the deterministic planner.
//
// Wraps the pure math in ./score.ts with Supabase queries that read from
// learner_topic_competence + topic_importance_v + reviews + card_ontology_tags
// and write to learner_topic_competence + clusters + cluster_memberships.

import type { SupabaseClient } from '@supabase/supabase-js'
import {
  emaUpdate,
  outcomeFromReview,
  rankWeakTopics,
  type ReviewRating,
  type RankedTopic,
  type TopicForRanking,
} from './score.ts'

/** Default cluster size when surfacing cards from a weak topic. */
export const DEFAULT_CLUSTER_SIZE = 10

/** Default top-K for weak-topic selection. */
export const DEFAULT_TOP_K = 3

// ---------- types ----------

export type WeakTopic = RankedTopic

export type EphemeralCluster = {
  cluster_id: string
  source_topic_id: string
  topic_title: string
  card_ids: string[]
}

// ---------- refreshCompetenceForUser ----------

/**
 * Fold any reviews newer than the latest competence-row update into the
 * user's `learner_topic_competence` rows via EMA.
 *
 * Idempotent within the resolution of the `last_updated` timestamp:
 *   1. Read the user's most recent competence `last_updated`.
 *   2. Fetch reviews with `created_at > last_updated`.
 *   3. Fetch topic-level concept tags for the touched cards.
 *   4. For each review × tagged-topic, EMA-update the running per-topic state.
 *   5. Bulk-upsert the changed rows.
 *
 * Returns the number of reviews folded in (useful for logging + UI hints).
 */
export async function refreshCompetenceForUser(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ foldedReviews: number }> {
  // 1. Latest update marker.
  const { data: maxRow } = await supabase
    .from('learner_topic_competence')
    .select('last_updated')
    .eq('user_id', userId)
    .order('last_updated', { ascending: false })
    .limit(1)
    .maybeSingle()

  const since = (maxRow?.last_updated as string | undefined) ?? new Date(0).toISOString()

  // 2. New reviews since the marker, oldest first (so EMA folds chronologically).
  const { data: reviewRows, error: reviewError } = await supabase
    .from('reviews')
    .select('card_id, rating, time_ms, created_at')
    .eq('user_id', userId)
    .gt('created_at', since)
    .order('created_at', { ascending: true })

  if (reviewError) throw new Error(`refreshCompetenceForUser: reviews fetch failed: ${reviewError.message}`)
  const reviews = reviewRows ?? []
  if (reviews.length === 0) return { foldedReviews: 0 }

  // 3. Topic-level concept tags for the touched cards.
  const cardIds = [...new Set(reviews.map((r) => r.card_id as string))]
  const { data: tagRows, error: tagError } = await supabase
    .from('card_ontology_tags')
    .select('card_id, concept_id, granularity')
    .in('card_id', cardIds)
    .eq('granularity', 'topic')

  if (tagError) throw new Error(`refreshCompetenceForUser: tags fetch failed: ${tagError.message}`)

  const topicsByCard = new Map<string, string[]>()
  for (const tag of tagRows ?? []) {
    const cid = tag.card_id as string
    const tid = tag.concept_id as string
    const arr = topicsByCard.get(cid) ?? []
    arr.push(tid)
    topicsByCard.set(cid, arr)
  }

  // 4. Read existing competence rows for the topics we're about to touch.
  const touchedTopicIds = [...new Set([...topicsByCard.values()].flat())]
  if (touchedTopicIds.length === 0) return { foldedReviews: 0 }

  const { data: compRows, error: compError } = await supabase
    .from('learner_topic_competence')
    .select('concept_id, score, samples')
    .eq('user_id', userId)
    .in('concept_id', touchedTopicIds)

  if (compError) throw new Error(`refreshCompetenceForUser: competence fetch failed: ${compError.message}`)

  const stateByTopic = new Map<string, { score: number; samples: number }>()
  for (const row of compRows ?? []) {
    stateByTopic.set(row.concept_id as string, {
      score: Number(row.score),
      samples: row.samples as number,
    })
  }

  // 5. Fold reviews into per-topic state.
  let foldedReviews = 0
  for (const review of reviews) {
    const topics = topicsByCard.get(review.card_id as string) ?? []
    if (topics.length === 0) continue
    const outcome = outcomeFromReview(
      review.rating as ReviewRating,
      (review.time_ms as number | null) ?? 0,
    )
    for (const topicId of topics) {
      const prior = stateByTopic.get(topicId) ?? { score: 0, samples: 0 }
      const next = emaUpdate(prior.score, outcome)
      stateByTopic.set(topicId, { score: next, samples: prior.samples + 1 })
    }
    foldedReviews += 1
  }

  // 6. Upsert the changed rows. `source` flips to 'review' on every fold.
  const now = new Date().toISOString()
  const upserts = [...stateByTopic.entries()].map(([topicId, state]) => ({
    user_id: userId,
    concept_id: topicId,
    score: state.score,
    samples: state.samples,
    source: 'review' as const,
    last_updated: now,
  }))

  const { error: upsertError } = await supabase
    .from('learner_topic_competence')
    .upsert(upserts, { onConflict: 'user_id,concept_id' })

  if (upsertError) throw new Error(`refreshCompetenceForUser: upsert failed: ${upsertError.message}`)

  return { foldedReviews }
}

// ---------- getTopWeakTopics ----------

/**
 * Return the user's top-K weakest topics with parent-system diversity.
 *
 * Reads:
 *   - topic_importance_v (per-topic importance from blueprint)
 *   - learner_topic_competence (per-user score)
 *   - concept_parents (topic → subsection → system traversal)
 *
 * Note: callers should ensure refreshCompetenceForUser has been called first
 * if there are pending reviews to fold in.
 */
export async function getTopWeakTopics(
  supabase: SupabaseClient,
  userId: string,
  k: number = DEFAULT_TOP_K,
): Promise<WeakTopic[]> {
  // Pull every row from the importance view joined to this user's competence.
  // 722 rows is small; do the join + filter in SQL via a single RPC-shaped query.
  // Supabase JS doesn't compose multi-table joins gracefully here, so we run
  // two queries and join in app code.

  const { data: importanceRows, error: impError } = await supabase
    .from('topic_importance_v')
    .select('topic_id, topic_title, subsection_id, importance')

  if (impError) throw new Error(`getTopWeakTopics: importance fetch failed: ${impError.message}`)

  const { data: compRows, error: compError } = await supabase
    .from('learner_topic_competence')
    .select('concept_id, score')
    .eq('user_id', userId)

  if (compError) throw new Error(`getTopWeakTopics: competence fetch failed: ${compError.message}`)

  const competenceByTopic = new Map<string, number>()
  for (const row of compRows ?? []) {
    competenceByTopic.set(row.concept_id as string, Number(row.score))
  }

  // Pull subsection → system map so we can attach system_id to each topic row.
  const { data: parentRows, error: parentError } = await supabase
    .from('concept_parents')
    .select('child_id, parent_id, is_primary')
    .eq('is_primary', true)

  if (parentError) throw new Error(`getTopWeakTopics: parents fetch failed: ${parentError.message}`)

  const systemByCsubsection = new Map<string, string>()
  for (const row of parentRows ?? []) {
    // We're looking for subsection → system edges. concept_parents has all
    // edges; subsection rows have a parent_id pointing to a system. We can
    // filter by structure: subsection IDs have exactly one dot, system IDs
    // have zero. Cheaper than another query: trust the slug shape (D18).
    const child = row.child_id as string
    const parent = row.parent_id as string
    if (child.includes('.') && !parent.includes('.')) {
      // child is subsection, parent is system
      systemByCsubsection.set(child, parent)
    }
  }

  const ranked: TopicForRanking[] = []
  for (const row of importanceRows ?? []) {
    const topicId = row.topic_id as string
    const subId = row.subsection_id as string
    const sysId = systemByCsubsection.get(subId)
    if (!sysId) continue
    const importance = Number(row.importance)
    if (!Number.isFinite(importance)) continue
    const competence = competenceByTopic.get(topicId) ?? 0
    ranked.push({
      topic_id: topicId,
      importance,
      competence,
      subsection_id: subId,
      system_id: sysId,
    })
  }

  return rankWeakTopics(ranked, k)
}

// ---------- buildDynamicClusterForTopic ----------

/**
 * Insert an ephemeral cluster row for a weak topic, populated with up to N
 * cards tagged to that topic. Returns the cluster id + card ids.
 *
 * Cards are pulled from `card_ontology_tags` where `granularity='topic'`
 * and `concept_id = topicId`. RLS narrows the join to cards visible to
 * the calling user (reviewed + author drafts). Cards are ordered by
 * `(yield_tier, board_likelihood, danger_level)` as a deterministic
 * secondary sort, then by card_id for stability.
 */
export async function buildDynamicClusterForTopic(
  supabase: SupabaseClient,
  userId: string,
  topicId: string,
  topicTitle: string,
  size: number = DEFAULT_CLUSTER_SIZE,
): Promise<EphemeralCluster> {
  // 1. Find tagged cards.
  const { data: tagRows, error: tagError } = await supabase
    .from('card_ontology_tags')
    .select('card_id')
    .eq('concept_id', topicId)
    .eq('granularity', 'topic')

  if (tagError)
    throw new Error(`buildDynamicClusterForTopic: tags fetch failed: ${tagError.message}`)

  const candidateCardIds = [...new Set((tagRows ?? []).map((r) => r.card_id as string))]
  if (candidateCardIds.length === 0) {
    // No cards tagged to this topic. Insert an empty cluster anyway so the
    // plan_item has a target; the UI can render "no cards yet" and prompt
    // the user to author content.
    const { data: emptyCluster, error: emptyError } = await supabase
      .from('clusters')
      .insert({
        owner_user_id: userId,
        name: `Topic: ${topicTitle}`,
        description: `Auto-generated from weak topic — no cards yet.`,
        kind: 'ephemeral_topic',
        source_topic_id: topicId,
        visibility: 'private',
      })
      .select('id')
      .single()
    if (emptyError)
      throw new Error(`buildDynamicClusterForTopic: empty-cluster insert failed: ${emptyError.message}`)

    return {
      cluster_id: emptyCluster.id as string,
      source_topic_id: topicId,
      topic_title: topicTitle,
      card_ids: [],
    }
  }

  // 2. Filter to cards visible to user (RLS) + sort for stability.
  const { data: cardRows, error: cardError } = await supabase
    .from('cards')
    .select('id, yield_tier, board_likelihood, danger_level')
    .in('id', candidateCardIds)

  if (cardError)
    throw new Error(`buildDynamicClusterForTopic: cards fetch failed: ${cardError.message}`)

  const yieldRank: Record<string, number> = { high: 0, medium: 1, low: 2 }
  const boardRank: Record<string, number> = { high: 0, medium: 1, low: 2 }
  const dangerRank: Record<string, number> = { lethal: 0, high: 1, moderate: 2, low: 3 }

  const sortedIds = (cardRows ?? [])
    .map((c) => ({
      id: c.id as string,
      y: yieldRank[c.yield_tier as string] ?? 99,
      b: boardRank[c.board_likelihood as string] ?? 99,
      d: dangerRank[c.danger_level as string] ?? 99,
    }))
    .sort((a, b) => a.y - b.y || a.b - b.b || a.d - b.d || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    .slice(0, size)
    .map((c) => c.id)

  // 3. Insert the ephemeral cluster.
  const { data: cluster, error: clusterError } = await supabase
    .from('clusters')
    .insert({
      owner_user_id: userId,
      name: `Topic: ${topicTitle}`,
      description: `Auto-generated from weak topic (${sortedIds.length} cards).`,
      kind: 'ephemeral_topic',
      source_topic_id: topicId,
      visibility: 'private',
    })
    .select('id')
    .single()

  if (clusterError)
    throw new Error(`buildDynamicClusterForTopic: cluster insert failed: ${clusterError.message}`)

  const clusterId = cluster.id as string

  // 4. Insert memberships in order.
  if (sortedIds.length > 0) {
    const { error: memberError } = await supabase.from('cluster_memberships').insert(
      sortedIds.map((cardId, idx) => ({
        cluster_id: clusterId,
        card_id: cardId,
        position: idx + 1,
      })),
    )
    if (memberError)
      throw new Error(`buildDynamicClusterForTopic: membership insert failed: ${memberError.message}`)
  }

  return {
    cluster_id: clusterId,
    source_topic_id: topicId,
    topic_title: topicTitle,
    card_ids: sortedIds,
  }
}

// ---------- resetCompetence ----------

/**
 * Wipe every competence row for a user. Used by the Settings "Reset" action.
 * After reset, the user must redo intake before a plan can be generated.
 */
export async function resetCompetence(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ deletedRows: number }> {
  const { error, count } = await supabase
    .from('learner_topic_competence')
    .delete({ count: 'exact' })
    .eq('user_id', userId)

  if (error) throw new Error(`resetCompetence: delete failed: ${error.message}`)
  return { deletedRows: count ?? 0 }
}
