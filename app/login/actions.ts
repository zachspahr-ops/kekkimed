'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Build the absolute base URL for the magic-link redirect target.
 *
 * Supabase emails the user a link pointing at our /auth/callback route, so
 * the URL must be absolute. On Vercel, x-forwarded-host + x-forwarded-proto
 * are set; locally only host is set and we infer http for localhost.
 */
async function getBaseUrl(): Promise<string> {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000'
  const proto =
    h.get('x-forwarded-proto') ??
    (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

/**
 * Server Action invoked by the login form. Sends a Supabase magic link.
 * Always redirects — to /login?status=sent on success, /login?error=... on
 * failure. We never echo the email back in the URL (privacy).
 */
export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()

  if (!email || !email.includes('@')) {
    redirect('/login?error=Please+enter+a+valid+email+address.')
  }

  const supabase = await createClient()
  const baseUrl = await getBaseUrl()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseUrl}/auth/callback`,
      // Allow new users to sign up via magic link. When invite-code gating
      // lands in Phase 8 (D1), flip this to false and route signups through
      // the invite flow instead.
      shouldCreateUser: true,
    },
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/login?status=sent')
}
