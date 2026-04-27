import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth gate for the (app) route group. Every page rendered under this layout
 * has a signed-in user — pages can `await supabase.auth.getUser()` and trust
 * the result is non-null.
 *
 * Why here and not in proxy.ts? Per Next.js 16 auth guidance, redirects close
 * to the data are more reliable than proxy-level redirects (which run on
 * prefetched routes and can fire spuriously). The proxy refreshes the
 * session cookie; this layout enforces the redirect.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}
