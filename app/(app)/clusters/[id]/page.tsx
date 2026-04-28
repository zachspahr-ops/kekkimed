import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { startReview } from './actions'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ClusterDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: cluster, error } = await supabase
    .from('clusters')
    .select(
      `
      id,
      name,
      description,
      cluster_memberships (count)
    `
    )
    .eq('id', id)
    .single()

  if (error || !cluster) notFound()

  const cardCount =
    (cluster.cluster_memberships as unknown as { count: number }[])[0]?.count ??
    0

  const startReviewForCluster = startReview.bind(null, id)

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="space-y-1">
        <Link
          href="/clusters"
          className="text-xs text-muted-foreground hover:underline"
        >
          ← Clusters
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">{cluster.name}</h1>
        {cluster.description && (
          <p className="text-sm text-muted-foreground">{cluster.description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {cardCount} {cardCount === 1 ? 'card' : 'cards'}
        </p>
      </div>

      {cardCount === 0 ? (
        <div className="rounded-md border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
          No cards in this cluster yet.
        </div>
      ) : (
        <form action={startReviewForCluster}>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Start review session
          </button>
        </form>
      )}
    </main>
  )
}
