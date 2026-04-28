import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ClustersPage() {
  const supabase = await createClient()

  const { data: clusters, error } = await supabase
    .from('clusters')
    .select(
      `
      id,
      name,
      description,
      cluster_memberships (count)
    `
    )
    .order('created_at', { ascending: false })

  if (error) throw error

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">My Clusters</h1>
        <p className="text-sm text-muted-foreground">
          Select a cluster to start a review session.
        </p>
      </header>

      {clusters.length === 0 ? (
        <div className="rounded-md border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
          No clusters yet.
        </div>
      ) : (
        <ul className="space-y-2">
          {clusters.map((cluster) => {
            const cardCount =
              (cluster.cluster_memberships as unknown as { count: number }[])[0]
                ?.count ?? 0
            return (
              <li key={cluster.id}>
                <Link
                  href={`/clusters/${cluster.id}`}
                  className="flex items-center justify-between rounded-md border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div>
                    <p className="font-medium">{cluster.name}</p>
                    {cluster.description && (
                      <p className="text-xs text-muted-foreground">
                        {cluster.description}
                      </p>
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
      )}
    </main>
  )
}
