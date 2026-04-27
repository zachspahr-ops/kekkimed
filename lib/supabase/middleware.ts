import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Refreshes the Supabase auth cookie on every request.
 *
 * Called from proxy.ts (Next.js 16's renamed middleware file). The Supabase
 * docs are explicit: in the proxy you must call supabase.auth.getUser()
 * (NOT getSession) between createServerClient and returning the response, or
 * the access token will not refresh and signed-in users will be silently
 * logged out when their token expires.
 *
 * This file does NOT redirect unauthenticated users. That happens in the
 * (app)/layout.tsx Server Component, where redirects are closer to the data
 * and survive prefetching correctly.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: getUser() refreshes the access token. Do not replace with getSession().
  await supabase.auth.getUser()

  return supabaseResponse
}
