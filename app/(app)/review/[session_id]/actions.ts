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

  if (planItem) {
    await supabase.from('plan_progress').upsert(
      { plan_item_id: planItem.id, session_id: sessionId },
      { onConflict: 'plan_item_id', ignoreDuplicates: true }
    )
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

  redirect(`/clusters/${clusterId}`)
}
