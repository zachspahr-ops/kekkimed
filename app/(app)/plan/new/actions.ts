'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  refreshCompetenceForUser,
  getTopWeakTopics,
  buildDynamicClusterForTopic,
  type WeakTopic,
  type EphemeralCluster,
} from '@/lib/competence/repo'

export type DeterministicPlanResult =
  | { rejected: true; reason: string }
  | {
      rejected: false
      planId: string
      foldedReviews: number
      picks: Array<{
        topic_id: string
        topic_title: string
        importance: number
        competence: number
        weakness: number
        cluster_id: string
        card_count: number
      }>
    }

/**
 * D22 deterministic planner.
 *
 *   1. Fold any new reviews into competence (refreshCompetenceForUser).
 *   2. Pull top-3 weakest topics with parent-system diversity.
 *   3. For each, build an ephemeral cluster from card_ontology_tags.
 *   4. Insert study_plan + 3 plan_items.
 *
 * Returns the saved plan id and a per-topic summary the UI can render.
 */
export async function generateDeterministicPlanAction(): Promise<DeterministicPlanResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 1. Refresh.
  const { foldedReviews } = await refreshCompetenceForUser(supabase, user.id)

  // 2. Top-K weakest.
  const top: WeakTopic[] = await getTopWeakTopics(supabase, user.id, 3)
  if (top.length === 0) {
    return {
      rejected: true,
      reason:
        "No competence data yet. Visit Intake first and pick one of the three calibration modes to seed your profile.",
    }
  }

  // 3. Topic title lookup (the rank function returns ids only).
  const topicIds = top.map((t) => t.topic_id)
  const { data: titleRows } = await supabase
    .from('concepts')
    .select('id, title')
    .in('id', topicIds)
  const titleById = new Map<string, string>(
    (titleRows ?? []).map((r) => [r.id as string, r.title as string]),
  )

  // 4. Build ephemeral clusters in parallel; Promise.all preserves input order
  // so plan_items still match the topic ranking.
  const builtClusters = await Promise.all(
    top.map((topic) => {
      const title = titleById.get(topic.topic_id) ?? topic.topic_id
      return buildDynamicClusterForTopic(supabase, user.id, topic.topic_id, title)
    }),
  )
  const clusters: Array<{ topic: WeakTopic; cluster: EphemeralCluster }> = top.map((topic, i) => ({
    topic,
    cluster: builtClusters[i],
  }))

  // 5. Save plan.
  const totalCards = clusters.reduce((acc, c) => acc + c.cluster.card_ids.length, 0)
  const rationale =
    `Top-3 weakest topics by importance × (1 − competence). ` +
    `Folded ${foldedReviews} new review(s) into competence before ranking. ` +
    `${totalCards} card(s) across ${clusters.length} ephemeral cluster(s).`

  const { data: plan, error: planError } = await supabase
    .from('study_plans')
    .insert({
      user_id: user.id,
      status: 'active',
      target_window_days: 7,
      rationale,
    })
    .select('id')
    .single()

  if (planError) {
    return {
      rejected: true,
      reason: `Plan insert failed: ${planError.message}`,
    }
  }

  const planId = plan.id as string

  const { error: itemsError } = await supabase.from('plan_items').insert(
    clusters.map((c, idx) => ({
      plan_id: planId,
      cluster_id: c.cluster.cluster_id,
      position: idx + 1,
      rationale:
        `Topic "${c.cluster.topic_title}" — importance ${c.topic.importance.toFixed(4)}, ` +
        `competence ${c.topic.competence.toFixed(2)}, weakness ${c.topic.weakness.toFixed(4)}.`,
    })),
  )

  if (itemsError) {
    return {
      rejected: true,
      reason: `plan_items insert failed: ${itemsError.message}`,
    }
  }

  return {
    rejected: false,
    planId,
    foldedReviews,
    picks: clusters.map((c) => ({
      topic_id: c.topic.topic_id,
      topic_title: c.cluster.topic_title,
      importance: c.topic.importance,
      competence: c.topic.competence,
      weakness: c.topic.weakness,
      cluster_id: c.cluster.cluster_id,
      card_count: c.cluster.card_ids.length,
    })),
  }
}
