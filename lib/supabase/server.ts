import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Supabase client for use in Server Components, Server Actions, and Route Handlers.
 *
 * Uses Next.js cookies() to read/write the auth cookie. From a Server Component
 * (which is read-only for cookies), the setAll branch silently no-ops — that's
 * fine because proxy.ts refreshes the session cookie on every request.
 *
 * Per Next.js 16 conventions: cookies() is async, so this factory is async too.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component — cookieStore.set throws there.
            // Safe to ignore: proxy.ts refreshes cookies on every request.
          }
        },
      },
    }
  )
}
