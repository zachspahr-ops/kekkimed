import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { relationCount } from '@/lib/supabase/relations'
import { startReview } from '@/app/(app)/clusters/[id]/actions'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ complete?: string }>
}

export default async function PlanDetailPage({ params, searchParams }: Props) {
  const { id: planId } = await params
  const { complete } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return notFound()

  const { data: plan, error } = await supabase
    .from('study_plans')
    .select(
      `
      id, status, target_window_days, rationale, started_at, completed_at,
      plan_items (
        id, position, rationale, cluster_id,
        clusters (id, name, description, cluster_memberships(count))
      )
    `,
    )
    .eq('id', planId)
    .eq('user_id', user.id)
    .order('position', { referencedTable: 'plan_items', ascending: true })
    .single()

  if (error || !plan) notFound()

  // Which items are done?
  const itemIds = (plan.plan_items ?? []).map((i) => i.id)
  const { data: progressRows } = await supabase
    .from('plan_progress')
    .select('plan_item_id')
    .in('plan_item_id', itemIds.length > 0 ? itemIds : ['00000000-0000-0000-0000-000000000000'])

  const doneSet = new Set((progressRows ?? []).map((r) => r.plan_item_id))

  const items = (plan.plan_items ?? []) as unknown as Array<{
    id: string
    position: number
    rationale: string | null
    cluster_id: string
    clusters: { id: string; name: string; description: string | null; cluster_memberships: { count: number }[] } | null
  }>

  const totalItems = items.length
  const doneCount = items.filter((i) => doneSet.has(i.id)).length

  const startedAt = new Date(plan.started_at as string)
  const expiresAt = new Date(startedAt)
  expiresAt.setDate(expiresAt.getDate() + (plan.target_window_days as number))
  const now = new Date()
  const isExpired = plan.status === 'active' && now > expiresAt
  const isComplete = plan.status === 'complete'
  const daysLeft = Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / 86_400_000))

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="space-y-1">
        <Link href="/dashboard" className="text-xs text-muted-foreground hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Study plan
        </h1>
        <p className="text-sm text-muted-foreground">
          Started {startedAt.toLocaleDateString()} ·{' '}
          {plan.target_window_days}-day window
          {isComplete
            ? ' · complete'
            : isExpired
              ? ' · expired'
              : ` · ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
        </p>
      </div>

      {complete === '1' && (
        <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          Plan complete! Your competence has been updated. Generate a new plan when you&apos;re ready.
        </div>
      )}

      {isExpired && (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
          This plan&apos;s window has elapsed. Generate a fresh plan to continue.
        </div>
      )}

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {doneCount} / {totalItems} done
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: totalItems > 0 ? `${(doneCount / totalItems) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Plan items */}
      <ol className="space-y-3">
        {items.map((item) => {
          const cluster = item.clusters
          const cardCount = relationCount(cluster?.cluster_memberships)
          const done = doneSet.has(item.id)
          const startReviewBound = startReview.bind(null, item.cluster_id)

          return (
            <li key={item.id} className="flex gap-3">
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {done ? '✓' : item.position}
              </span>
              <div className="flex flex-1 items-start justify-between gap-3 rounded-md border bg-card px-4 py-3 text-sm">
                <div className="space-y-0.5">
                  <p className="font-medium">{cluster?.name ?? item.cluster_id}</p>
                  {cluster?.description && (
                    <p className="text-xs text-muted-foreground">{cluster.description}</p>
                  )}
                  {item.rationale && (
                    <p className="text-xs text-muted-foreground">{item.rationale}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                  </p>
                </div>
                {cardCount > 0 && !isExpired && (
                  <form action={startReviewBound} className="shrink-0">
                    <button
                      type="submit"
                      className={`rounded-md px-3 py-1.5 text-xs font-medium shadow-sm ${
                        done
                          ? 'border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {done ? 'Review again' : 'Start →'}
                    </button>
                  </form>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {/* Footer actions */}
      <div className="flex gap-3">
        <Link
          href="/plan/new"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
        >
          {isComplete || isExpired ? 'Generate new plan' : 'Regenerate plan'}
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
        >
          Dashboard
        </Link>
      </div>
    </main>
  )
}
