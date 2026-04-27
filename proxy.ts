import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Next.js 16 "proxy" file (formerly middleware.ts — renamed in Next 16).
 * Runs on every request matched by the config below; refreshes the Supabase
 * auth cookie so signed-in users stay signed in.
 *
 * Authentication redirects happen in app/(app)/layout.tsx, NOT here. This
 * file only refreshes cookies — keeping the proxy lean per Next.js docs
 * (proxy runs on prefetched routes too, so heavy logic costs you).
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Match all request paths except Next internals and static files. Auth
  // redirects are then enforced inside app/(app)/layout.tsx.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
