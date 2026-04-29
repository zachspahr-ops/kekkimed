'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createClusterAction(formData: FormData): Promise<void> {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() || null

  if (!name) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: cluster, error } = await supabase
    .from('clusters')
    .insert({
      owner_user_id: user.id,
      name,
      description,
      kind: 'manual',
    })
    .select('id')
    .single()

  if (error || !cluster) return

  revalidatePath('/clusters')
  redirect(`/clusters/${cluster.id}`)
}
