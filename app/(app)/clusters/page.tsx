import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { relationCount } from '@/lib/supabase/relations'
import { createClusterAction } from './actions'

export default async function ClustersPage() {
  const supabase = await createClient()

  const { data: clusters, error } = await supabase
    .from('clusters')
    .select(
      `
      id,
      name,
      description,
      kind,
      cluster_memberships (count)
    `
    )
    .order('created_at', { ascending: false })

  if (error) throw error

  const manualClusters = clusters.filter((c) => (c as { kind: string }).kind === 'manual' || !('kind' in c))
  const ephemeralClusters = clusters.filter((c) => (c as { kind: string }).kind !== 'manual' && 'kind' in c)

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">My Clusters</h1>
        <p className="text-sm text-muted-foreground">
          Select a cluster to start a review session.
        </p>
      </header>

      {/* New cluster form */}
      <details className="group rounded-md border bg-card p-4">
        <summary className="cursor-pointer text-sm font-medium select-none">
          + New cluster
        </summary>
        <form action={createClusterAction} className="mt-3 space-y-3">
          <input
            name="name"
            required
            placeholder="Cluster name"
            className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <input
            name="description"
            placeholder="Description (optional)"
            className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
          >
            Create
          </button>
        </form>
      </details>

      {clusters.length === 0 ? (
        <div className="rounded-md border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
          No clusters yet.
        </div>
      ) : (
        <div className="space-y-4">
          {manualClusters.length > 0 && (
            <section className="space-y-2">
              {ephemeralClusters.length > 0 && (
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Manual
                </h2>
              )}
              <ul className="space-y-2">
                {manualClusters.map((cluster) => {
                  const cardCount = relationCount(cluster.cluster_memberships)
                  return (
                    <li key={cluster.id}>
                      <Link
                        href={`/clusters/${cluster.id}`}
                        className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div>
                          <p className="font-medium">{cluster.name}</p>
                          {cluster.description && (
                            <p className="text-xs text-muted-foreground">{cluster.description}</p>
                          )}
                        </div>
                        <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                          {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {ephemeralClusters.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Plan clusters
              </h2>
              <ul className="space-y-2">
                {ephemeralClusters.map((cluster) => {
                  const cardCount = relationCount(cluster.cluster_memberships)
                  return (
                    <li key={cluster.id}>
                      <Link
                        href={`/clusters/${cluster.id}`}
                        className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div>
                          <p className="font-medium">{cluster.name}</p>
                          {cluster.description && (
                            <p className="text-xs text-muted-foreground">{cluster.description}</p>
                          )}
                        </div>
                        <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                          {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  )
}
