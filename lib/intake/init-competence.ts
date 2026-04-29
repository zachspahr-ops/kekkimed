// D22 — three deterministic intake paths that seed learner_topic_competence.
//
// All three resolve to the same outcome: a row per topic-level concept for
// the user, with a `score`, `samples=1` (or 0 for fresh init), and `source`
// set to the path that produced it. No LLM. No free text.

import type { SupabaseClient } from '@supabase/supabase-js'
import {
  emaUpdate,
  outcomeFromReview,
  type ReviewRating,
} from '@/lib/competence/score'

export type CompetenceSource = 'self_report' | 'standardized' | 'evaluator'

// ---------- shared helpers ----------

/**
 * Read every (system, subsection, topic) triple from concepts + concept_parents.
 * Returns a flat array; one row per topic with its parent system.
 *
 * Cached at request time; the ABIM blueprint is static.
 */
async function loadOntologyShape(
  supabase: SupabaseClient,
): Promise<{ topic_id: string; subsection_id: string; system_id: string }[]> {
  const { data: parentRows, error } = await supabase
    .from('concept_parents')
    .select('child_id, parent_id, is_primary')
    .eq('is_primary', true)

  if (error) throw new Error(`loadOntologyShape: ${error.message}`)

  // Subsection (one dot) → system (no dots).
  // Topic (two dots) → subsection (one dot).
  const systemBySub = new Map<string, string>()
  const subByTopic = new Map<string, string>()
  for (const row of parentRows ?? []) {
    const child = row.child_id as string
    const parent = row.parent_id as string
    if (child.includes('.') && !parent.includes('.')) {
      systemBySub.set(child, parent)
    } else if (child.split('.').length === 3 && parent.split('.').length === 2) {
      subByTopic.set(child, parent)
    }
  }

  const out: { topic_id: string; subsection_id: string; system_id: string }[] = []
  for (const [topicId, subId] of subByTopic) {
    const sysId = systemBySub.get(subId)
    if (!sysId) continue
    out.push({ topic_id: topicId, subsection_id: subId, system_id: sysId })
  }
  return out
}

async function bulkUpsertCompetence(
  supabase: SupabaseClient,
  rows: {
    user_id: string
    concept_id: string
    score: number
    samples: number
    source: CompetenceSource | 'review'
  }[],
): Promise<void> {
  if (rows.length === 0) return
  const now = new Date().toISOString()
  // Supabase JS will batch via a single insert; chunk to be safe with payload size.
  const BATCH = 500
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH).map((r) => ({ ...r, last_updated: now }))
    const { error } = await supabase
      .from('learner_topic_competence')
      .upsert(batch, { onConflict: 'user_id,concept_id' })
    if (error) throw new Error(`bulkUpsertCompetence: ${error.message}`)
  }
}

// ---------- 1. Self-report ----------

/**
 * Seed competence from per-system 0–1 scores. Each system's score is
 * applied uniformly to every descendant topic.
 *
 * Inputs:
 *   systemScores: Record<systemId, number 0..1>. Missing keys default to 0.5
 *   (neutral). Out-of-range values are clamped.
 *
 * Effect: writes 722 rows (one per topic) with `source='self_report'` and
 * `samples=0` (initial seed; not yet sample-validated).
 */
export async function initFromSelfReport(
  supabase: SupabaseClient,
  userId: string,
  systemScores: Record<string, number>,
): Promise<{ rowsWritten: number }> {
  const shape = await loadOntologyShape(supabase)
  const rows = shape.map((t) => {
    const raw = systemScores[t.system_id] ?? 0.5
    const score = Math.max(0, Math.min(1, raw))
    return {
      user_id: userId,
      concept_id: t.topic_id,
      score,
      samples: 0,
      source: 'self_report' as const,
    }
  })
  await bulkUpsertCompetence(supabase, rows)
  return { rowsWritten: rows.length }
}

// ---------- 2. Standardized ----------

/**
 * Seed competence from per-system % scores pasted from a standardized test
 * (USMLE practice, NBME, etc.). Same shape as self-report; different `source`.
 *
 * Inputs:
 *   systemPercents: Record<systemId, number 0..100>. Missing keys default to 50.
 *
 * Effect: writes 722 rows with `source='standardized'` and `samples=0`.
 */
export async function initFromStandardized(
  supabase: SupabaseClient,
  userId: string,
  systemPercents: Record<string, number>,
): Promise<{ rowsWritten: number }> {
  const shape = await loadOntologyShape(supabase)
  const rows = shape.map((t) => {
    const rawPct = systemPercents[t.system_id] ?? 50
    const pct = Math.max(0, Math.min(100, rawPct))
    return {
      user_id: userId,
      concept_id: t.topic_id,
      score: pct / 100,
      samples: 0,
      source: 'standardized' as const,
    }
  })
  await bulkUpsertCompetence(supabase, rows)
  return { rowsWritten: rows.length }
}

// ---------- 3. Evaluator ----------

/**
 * Seed competence from a completed calibration session.
 *
 * Reads the user's reviews for the given session, EMA-updates competence
 * for each topic touched by those reviews. Topics not touched by the
 * session keep whatever value they had previously (or 0.5 if none — by
 * upserting a default first).
 *
 * Effect:
 *   - For touched topics: upsert with EMA-derived score, `source='evaluator'`,
 *     samples = number of reviews on cards tagged to that topic.
 *   - For untouched topics: upsert at 0.5 with `samples=0` if no row exists
 *     (so the planner has a baseline to compare against). Existing rows are
 *     left alone.
 */
export async function initFromEvaluatorSession(
  supabase: SupabaseClient,
  userId: string,
  sessionId: string,
): Promise<{ rowsWritten: number; reviewsFolded: number }> {
  // 1. Reviews from the session.
  const { data: reviewRows, error: reviewError } = await supabase
    .from('reviews')
    .select('card_id, rating, time_ms')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })

  if (reviewError) throw new Error(`initFromEvaluatorSession: reviews: ${reviewError.message}`)
  const reviews = reviewRows ?? []

  // 2. Topic-level concept tags for the touched cards.
  const cardIds = [...new Set(reviews.map((r) => r.card_id as string))]
  const { data: tagRows, error: tagError } = await supabase
    .from('card_ontology_tags')
    .select('card_id, concept_id, granularity')
    .in('card_id', cardIds.length === 0 ? ['__none__'] : cardIds)
    .eq('granularity', 'topic')

  if (tagError) throw new Error(`initFromEvaluatorSession: tags: ${tagError.message}`)

  const topicsByCard = new Map<string, string[]>()
  for (const row of tagRows ?? []) {
    const cid = row.card_id as string
    const arr = topicsByCard.get(cid) ?? []
    arr.push(row.concept_id as string)
    topicsByCard.set(cid, arr)
  }

  // 3. EMA-fold reviews per topic.
  const stateByTopic = new Map<string, { score: number; samples: number }>()
  for (const review of reviews) {
    const topics = topicsByCard.get(review.card_id as string) ?? []
    if (topics.length === 0) continue
    const outcome = outcomeFromReview(
      review.rating as ReviewRating,
      (review.time_ms as number | null) ?? 0,
    )
    for (const topicId of topics) {
      const prior = stateByTopic.get(topicId) ?? { score: 0.5, samples: 0 }
      const next = emaUpdate(prior.score, outcome)
      stateByTopic.set(topicId, { score: next, samples: prior.samples + 1 })
    }
  }

  // 4. Seed all topics not touched at 0.5/0/source=evaluator (insert-or-skip).
  const shape = await loadOntologyShape(supabase)
  const evaluatorRows: {
    user_id: string
    concept_id: string
    score: number
    samples: number
    source: CompetenceSource
  }[] = []

  for (const t of shape) {
    const folded = stateByTopic.get(t.topic_id)
    if (folded) {
      evaluatorRows.push({
        user_id: userId,
        concept_id: t.topic_id,
        score: folded.score,
        samples: folded.samples,
        source: 'evaluator',
      })
    } else {
      // Untouched topic — seed at 0.5 with samples=0. Upsert is safe; if a
      // prior intake already wrote a row, this would clobber it. To
      // preserve prior values, only insert when no row exists. We use a
      // separate insert with onConflict do-nothing semantics via Supabase's
      // `ignoreDuplicates` flag.
      evaluatorRows.push({
        user_id: userId,
        concept_id: t.topic_id,
        score: 0.5,
        samples: 0,
        source: 'evaluator',
      })
    }
  }

  // For touched topics: upsert (overwrite).
  // For untouched topics: insert ignoreDuplicates so we don't clobber prior
  // intake. Split into two passes.
  const touchedRows = evaluatorRows.filter((r) => stateByTopic.has(r.concept_id))
  const untouchedRows = evaluatorRows.filter((r) => !stateByTopic.has(r.concept_id))

  await bulkUpsertCompetence(supabase, touchedRows)

  // Untouched: insert ignoreDuplicates.
  if (untouchedRows.length > 0) {
    const now = new Date().toISOString()
    const BATCH = 500
    for (let i = 0; i < untouchedRows.length; i += BATCH) {
      const batch = untouchedRows.slice(i, i + BATCH).map((r) => ({ ...r, last_updated: now }))
      const { error } = await supabase
        .from('learner_topic_competence')
        .upsert(batch, { onConflict: 'user_id,concept_id', ignoreDuplicates: true })
      if (error)
        throw new Error(`initFromEvaluatorSession: untouched upsert: ${error.message}`)
    }
  }

  return { rowsWritten: evaluatorRows.length, reviewsFolded: reviews.length }
}

// ---------- evaluator session bootstrap ----------

/**
 * Sample N cards (default 18 — one per system) from cards visible to the user
 * (RLS-filtered automatically), pack them into a fresh `kind='evaluator'`
 * cluster, and return the cluster_id + sessionId. The caller redirects to
 * `/review/{sessionId}?cluster={clusterId}` to start the calibration.
 */
export async function startEvaluatorSession(
  supabase: SupabaseClient,
  userId: string,
  sessionId: string,
  perSystem: number = 1,
): Promise<{ clusterId: string; cardCount: number }> {
  // 1. Get the 18 systems.
  const { data: systemRows, error: sysError } = await supabase
    .from('concepts')
    .select('id')
    .eq('level', 'system')

  if (sysError) throw new Error(`startEvaluatorSession: systems: ${sysError.message}`)
  const systemIds = (systemRows ?? []).map((r) => r.id as string)

  // 2. For each system, pull cards whose primary_system_id matches; sample N.
  // RLS narrows to reviewed-or-author cards.
  const sampledCardIds: string[] = []
  for (const sysId of systemIds) {
    const { data: cardRows, error: cardError } = await supabase
      .from('cards')
      .select('id')
      .eq('primary_system_id', sysId)
      .limit(perSystem * 5) // grab more than needed to allow random pick

    if (cardError) throw new Error(`startEvaluatorSession: cards (${sysId}): ${cardError.message}`)
    const ids = (cardRows ?? []).map((r) => r.id as string)
    if (ids.length === 0) continue
    // Pseudo-random pick: shuffle then take perSystem.
    const shuffled = [...ids].sort(() => Math.random() - 0.5).slice(0, perSystem)
    sampledCardIds.push(...shuffled)
  }

  // 3. Create the evaluator cluster.
  const { data: cluster, error: clusterError } = await supabase
    .from('clusters')
    .insert({
      owner_user_id: userId,
      name: 'Initial calibration',
      description: `Sampled ${sampledCardIds.length} cards across ${systemIds.length} systems for intake competence.`,
      kind: 'evaluator',
      visibility: 'private',
    })
    .select('id')
    .single()

  if (clusterError)
    throw new Error(`startEvaluatorSession: cluster insert: ${clusterError.message}`)

  const clusterId = cluster.id as string

  // 4. Insert memberships.
  if (sampledCardIds.length > 0) {
    const { error: memberError } = await supabase.from('cluster_memberships').insert(
      sampledCardIds.map((cardId, idx) => ({
        cluster_id: clusterId,
        card_id: cardId,
        position: idx + 1,
      })),
    )
    if (memberError)
      throw new Error(`startEvaluatorSession: memberships: ${memberError.message}`)
  }

  return { clusterId, cardCount: sampledCardIds.length }
}
