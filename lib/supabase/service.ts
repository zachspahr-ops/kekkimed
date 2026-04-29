import { createClient } from '@supabase/supabase-js'

/**
 * Supabase admin client that uses the service role key and bypasses RLS.
 * Only use server-side (Route Handlers, Server Actions).
 * Never expose this client or its key to the browser.
 */
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}
