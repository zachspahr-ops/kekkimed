import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReviewClient } from './ReviewClient'

interface Props {
  params: Promise<{ session_id: string }>
  searchParams: Promise<{ cluster?: string }>
}

export default async function ReviewPage({ params, searchParams }: Props) {
  const { session_id } = await params
  const { cluster: clusterId } = await searchParams

  if (!clusterId) notFound()

  const supabase = await createClient()

  // Verify cluster access and fetch cluster name.
  const { data: cluster, error: clusterError } = await supabase
    .from('clusters')
    .select('id, name')
    .eq('id', clusterId)
    .single()

  if (clusterError || !cluster) notFound()

  // Load reviewed cards for this cluster in random order.
  const { data: memberships, error: cardsError } = await supabase
    .from('cluster_memberships')
    .select(
      `
      cards (
        id,
        prompt,
        answer,
        citation,
        source,
        status
      )
    `
    )
    .eq('cluster_id', clusterId)

  if (cardsError) throw cardsError

  const cards = memberships
    .map((m) => m.cards)
    .filter(Boolean)
    .flat()

  if (cards.length === 0) notFound()

  return (
    <ReviewClient
      sessionId={session_id}
      clusterId={clusterId}
      clusterName={cluster.name}
      cards={cards as {
        id: string
        prompt: string
        answer: string
        citation: string
        source: string
        status: string
      }[]}
    />
  )
}
