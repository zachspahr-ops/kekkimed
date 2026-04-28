'use client'

import { useState, useRef, useTransition } from 'react'
import { submitRating, finishSession } from './actions'

interface Card {
  id: string
  prompt: string
  answer: string
  citation: string
  source: string
  status: string
}

interface Props {
  sessionId: string
  clusterId: string
  clusterName: string
  cards: Card[]
}

export function ReviewClient({ sessionId, clusterId, clusterName, cards }: Props) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()
  const revealedAt = useRef<number | null>(null)

  const card = cards[index]
  const progress = `${index + 1} / ${cards.length}`
  const isAiCard = card?.source === 'ai_private' && card?.status !== 'reviewed'

  function reveal() {
    revealedAt.current = Date.now()
    setRevealed(true)
  }

  function rate(rating: 'again' | 'good') {
    const timeMs = revealedAt.current ? Date.now() - revealedAt.current : 0

    // Fire DB write in the background — do not block UI on the roundtrip
    startTransition(async () => {
      await submitRating(sessionId, card.id, clusterId, rating, timeMs)
    })

    // Advance UI immediately (synchronous, outside startTransition)
    if (index + 1 >= cards.length) {
      setDone(true)
    } else {
      setIndex((i) => i + 1)
      setRevealed(false)
      revealedAt.current = null
    }
  }

  function finish() {
    startTransition(async () => {
      await finishSession(sessionId, clusterId)
    })
  }

  if (done) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center gap-6 p-6 pt-16">
        <div className="text-center">
          <p className="text-lg font-semibold">Session complete</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You reviewed all {cards.length} cards in {clusterName}.
          </p>
        </div>
        <button
          onClick={finish}
          disabled={isPending}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? 'Finishing…' : 'Finish session'}
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 p-6">
      <header className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{clusterName}</span>
        <span>{progress}</span>
      </header>

      {/* Card */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="border-b p-5">
          <p className="text-sm font-medium leading-relaxed">{card.prompt}</p>
        </div>

        {revealed ? (
          <div className="space-y-3 p-5">
            <p className="text-sm leading-relaxed">{card.answer}</p>
            <p className="text-xs text-muted-foreground">
              Source: {card.citation}
            </p>
            {isAiCard && (
              <p className="text-xs font-medium text-amber-600">
                AI-generated, unreviewed
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center p-5">
            <button
              onClick={reveal}
              className="rounded-md border bg-background px-4 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Reveal answer
            </button>
          </div>
        )}
      </div>

      {/* Rating buttons — only shown after reveal */}
      {revealed && (
        <div className="flex gap-3">
          <button
            onClick={() => rate('again')}
            disabled={isPending}
            className="flex-1 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50"
          >
            Again
          </button>
          <button
            onClick={() => rate('good')}
            disabled={isPending}
            className="flex-1 rounded-md border border-green-600/40 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100 disabled:opacity-50 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900"
          >
            Good
          </button>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Educational study aid. Not clinical guidance.
      </p>
    </main>
  )
}
