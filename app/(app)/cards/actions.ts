'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function promoteCardAction(cardId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('cards')
    .update({ status: 'reviewed' })
    .eq('id', cardId)
    .eq('author_user_id', user.id)
    .eq('status', 'draft')

  if (error) {
    // The 24h trigger raises a check_violation with the age in the message.
    if (error.code === '23514' || error.message?.includes('24 hours')) {
      return { error: 'Card must be at least 24 hours old before promotion.' }
    }
    return { error: error.message }
  }

  revalidatePath('/cards')
  return {}
}

export async function retireCardAction(cardId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('cards')
    .update({ status: 'retired' })
    .eq('id', cardId)
    .eq('author_user_id', user.id)
    .neq('status', 'retired')

  if (error) return { error: error.message }

  revalidatePath('/cards')
  return {}
}
