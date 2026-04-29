'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { resetCompetence } from '@/lib/competence/repo'

/**
 * D22: wipe every learner_topic_competence row for the current user, then
 * route them back to /intake so they can re-baseline.
 */
export async function resetCompetenceAction(): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await resetCompetence(supabase, user.id)
  redirect('/intake?reset=1')
}
