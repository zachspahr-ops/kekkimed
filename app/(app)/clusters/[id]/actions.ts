'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'

export async function startReview(clusterId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verify the user can access this cluster before starting a session.
  const { data: cluster, error } = await supabase
    .from('clusters')
    .select('id')
    .eq('id', clusterId)
    .single()

  if (error || !cluster) redirect('/clusters')

  const sessionId = randomUUID()
  redirect(`/review/${sessionId}?cluster=${clusterId}`)
}
