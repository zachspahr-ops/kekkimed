'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

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

  // Look for an active plan item referencing this cluster.
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
    await supabase.from('plan_progress').insert({
      plan_item_id: planItem.id,
      user_id: user.id,
      session_id: sessionId,
    })
  }

  redirect(`/clusters/${clusterId}`)
}
