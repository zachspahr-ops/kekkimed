import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /auth/callback?code=...&next=/dashboard
 *
 * Supabase redirects the magic link here with a one-time auth code. We
 * exchange it for a session (sets the auth cookie via setAll inside our
 * server client) and then redirect onward to ?next or /dashboard.
 *
 * On error we redirect to /login with a friendly message.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/dashboard'

  // Vercel deploys behind a proxy; x-forwarded-host gives us the visible host.
  const forwardedHost = request.headers.get('x-forwarded-host')
  const origin = forwardedHost
    ? `${url.protocol}//${forwardedHost}`
    : url.origin

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent('Missing auth code.')}`
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    )
  }

  return NextResponse.redirect(`${origin}${next}`)
}
