import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from './actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch the most recent active or completed plan with item progress.
  let activePlan: {
    id: string
    status: string
    target_window_days: number
    started_at: string
    completed_at: string | null
    totalItems: number
    doneCount: number
  } | null = null

  if (user) {
    const { data: planRow } = await supabase
      .from('study_plans')
      .select(
        `
        id, status, target_window_days, started_at, completed_at,
        plan_items (id, plan_progress(plan_item_id))
      `,
      )
      .eq('user_id', user.id)
      .in('status', ['active', 'complete'])
      .order('started_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (planRow) {
      const items = (planRow.plan_items ?? []) as Array<{
        id: string
        plan_progress: { plan_item_id: string }[]
      }>
      activePlan = {
        id: planRow.id as string,
        status: planRow.status as string,
        target_window_days: planRow.target_window_days as number,
        started_at: planRow.started_at as string,
        completed_at: planRow.completed_at as string | null,
        totalItems: items.length,
        doneCount: items.filter((i) => i.plan_progress.length > 0).length,
      }
    }
  }

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

      {/* Active plan card */}
      {activePlan && (
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {activePlan.status === 'complete' ? 'Last plan' : 'Active plan'}
          </h2>
          <Link
            href={`/plan/${activePlan.id}`}
            className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <div className="space-y-1">
              <p className="font-medium">
                {activePlan.status === 'complete' ? 'Plan complete ✓' : 'Plan in progress'}
              </p>
              <p className="text-xs text-muted-foreground">
                {activePlan.doneCount} / {activePlan.totalItems} items done ·{' '}
                {new Date(activePlan.started_at).toLocaleDateString()}
              </p>
            </div>
            <span className="text-muted-foreground">→</span>
          </Link>
          {activePlan.status === 'complete' && (
            <p className="mt-1 text-xs text-muted-foreground">
              Ready for a new plan?{' '}
              <Link href="/plan/new" className="underline underline-offset-2">
                Generate next plan →
              </Link>
            </p>
          )}
        </section>
      )}

      <section className="space-y-2">
        <Link
          href="/clusters"
          className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="font-medium">My Clusters</span>
          <span className="text-muted-foreground">→</span>
        </Link>
        <Link
          href="/cards"
          className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="font-medium">Cards</span>
          <span className="text-muted-foreground">→</span>
        </Link>
        <Link
          href="/intake"
          className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="font-medium">Intake / Calibration</span>
          <span className="text-muted-foreground">→</span>
        </Link>
        <Link
          href="/plan/new"
          className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="font-medium">Generate Study Plan</span>
          <span className="text-muted-foreground">→</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="font-medium">Settings</span>
          <span className="text-muted-foreground">→</span>
        </Link>
      </section>
    </main>
  )
}
