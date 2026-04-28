import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from './actions'

export default async function DashboardPage() {
  // The (app) layout already enforced auth, so user is guaranteed non-null
  // here. We re-fetch to display the email without passing data through
  // layout props (cleaner; layouts don't re-render on client navigation).
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as{' '}
            <span className="font-medium text-foreground">{user?.email}</span>
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Sign out
          </button>
        </form>
      </header>

      <section>
        <Link
          href="/clusters"
          className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="font-medium">My Clusters</span>
          <span className="text-muted-foreground">→</span>
        </Link>
      </section>
    </main>
  )
}
