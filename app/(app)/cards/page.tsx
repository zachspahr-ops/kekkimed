import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import CardRow from './CardRow'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const STATUS_OPTIONS = ['all', 'draft', 'reviewed', 'retired'] as const
type StatusFilter = (typeof STATUS_OPTIONS)[number]

export default async function CardsPage({ searchParams }: Props) {
  const { status: rawStatus } = await searchParams
  const filter: StatusFilter = STATUS_OPTIONS.includes(rawStatus as StatusFilter)
    ? (rawStatus as StatusFilter)
    : 'all'

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let cards: Array<{
    id: string
    prompt: string
    citation: string
    status: 'draft' | 'reviewed' | 'retired'
    created_at: string
  }> = []

  let counts: Record<string, number> = { all: 0, draft: 0, reviewed: 0, retired: 0 }

  if (user) {
    // Count all statuses for the tab badges.
    const { data: allCards } = await supabase
      .from('cards')
      .select('id, status')
      .eq('author_user_id', user.id)

    if (allCards) {
      counts.all = allCards.length
      for (const c of allCards) {
        counts[c.status as string] = (counts[c.status as string] ?? 0) + 1
      }
    }

    // Fetch the visible page.
    let query = supabase
      .from('cards')
      .select('id, prompt, citation, status, created_at')
      .eq('author_user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200)

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query
    cards = (data ?? []) as typeof cards
  }

  const now = new Date()

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Cards</h1>
          <p className="text-sm text-muted-foreground">
            {counts.all} total · {counts.draft} draft · {counts.reviewed} reviewed
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs text-muted-foreground hover:underline"
        >
          ← Dashboard
        </Link>
      </header>

      {/* Status filter tabs */}
      <div className="flex gap-1 border-b">
        {STATUS_OPTIONS.map((s) => (
          <Link
            key={s}
            href={s === 'all' ? '/cards' : `/cards?status=${s}`}
            className={`px-3 py-1.5 text-sm capitalize transition-colors ${
              filter === s
                ? 'border-b-2 border-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
            {counts[s] > 0 && (
              <span className="ml-1 text-xs text-muted-foreground">({counts[s]})</span>
            )}
          </Link>
        ))}
      </div>

      {cards.length === 0 ? (
        <div className="rounded-md border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
          {filter === 'all'
            ? 'No cards yet. Import cards via POST /api/cards/import.'
            : `No ${filter} cards.`}
        </div>
      ) : (
        <ul className="space-y-2">
          {cards.map((card) => {
            const ageMs = now.getTime() - new Date(card.created_at).getTime()
            const ageHours = ageMs / 3_600_000
            return (
              <CardRow
                key={card.id}
                id={card.id}
                prompt={card.prompt}
                citation={card.citation}
                status={card.status}
                createdAt={card.created_at}
                ageHours={ageHours}
              />
            )
          })}
        </ul>
      )}

      {cards.length === 200 && (
        <p className="text-xs text-muted-foreground text-center">
          Showing first 200 cards. Use status filter to narrow.
        </p>
      )}
    </main>
  )
}
