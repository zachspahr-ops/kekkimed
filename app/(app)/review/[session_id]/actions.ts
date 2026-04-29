'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { refreshCompetenceForUser } from '@/lib/competence/repo'
import { initFromEvaluatorSession } from '@/lib/intake/init-competence'

export async function submitRating(
  sessionId: string,
  cardId: string,
  clusterId: string,
  rating: 'again' | 'good',
  timeMs: number
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('reviews').insert({
    user_id: user.id,
    card_id: cardId,
    cluster_id: clusterId,
    session_id: sessionId,
    rating,
    time_ms: timeMs,
  })

  if (error) throw error
}

export async function finishSession(sessionId: string, clusterId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Look up the cluster to detect evaluator-kind sessions and to make sure
  // we have the kind on hand before any other side effects.
  const { data: cluster } = await supabase
    .from('clusters')
    .select('id, kind')
    .eq('id', clusterId)
    .maybeSingle()

  const kind = (cluster?.kind as string | undefined) ?? 'manual'

  // Plan-progress upsert (D22 keeps existing plan-walking behaviour intact
  // for ephemeral_topic and manual clusters that are part of an active plan).
  const { data: planItem } = await supabase
    .from('plan_items')
    .select(
      `
      id,
      study_plans!inner (id, status, user_id)
    `
    )
    .eq('cluster_id', clusterId)
    .eq('study_plans.user_id', user.id)
    .eq('study_plans.status', 'active')
    .limit(1)
    .maybeSingle()

  let planId: string | null = null

  if (planItem) {
    await supabase.from('plan_progress').upsert(
      { plan_item_id: planItem.id, session_id: sessionId },
      { onConflict: 'plan_item_id', ignoreDuplicates: true },
    )

    planId = (planItem.study_plans as unknown as { id: string }).id

    // Check if all items in this plan are now done.
    const { data: allItems } = await supabase
      .from('plan_items')
      .select('id, plan_progress(plan_item_id)')
      .eq('plan_id', planId)

    const total = allItems?.length ?? 0
    const done = allItems?.filter(
      (i) => (i.plan_progress as unknown as { plan_item_id: string }[]).length > 0,
    ).length ?? 0

    if (total > 0 && done >= total) {
      await supabase
        .from('study_plans')
        .update({ status: 'complete', completed_at: new Date().toISOString() })
        .eq('id', planId)
        .eq('user_id', user.id)
      redirect(`/plan/${planId}?complete=1`)
    }
  }

  // D22 evaluator branch: fold the calibration session into competence and
  // route the user into plan generation.
  if (kind === 'evaluator') {
    await initFromEvaluatorSession(supabase, user.id, sessionId)
    redirect('/plan/new')
  }

  // Default branch (manual / ephemeral_topic): fold this session's reviews
  // into the running EMA so the next plan reflects the just-finished work.
  await refreshCompetenceForUser(supabase, user.id)

  if (planId) {
    redirect(`/plan/${planId}`)
  }
  redirect(`/clusters/${clusterId}`)
}
