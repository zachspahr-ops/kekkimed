'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Sign the user out and bounce them to /login. Invoked by the dashboard's
 * "Sign out" form. The form is a plain HTML form (no JS needed) so this
 * works without client hydration.
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
