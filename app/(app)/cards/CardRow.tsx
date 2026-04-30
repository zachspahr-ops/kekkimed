'use client'

import { useState, useTransition } from 'react'
import { promoteCardAction, retireCardAction } from './actions'

interface CardRowProps {
  id: string
  prompt: string
  citation: string
  status: 'draft' | 'reviewed' | 'retired'
  ageHours: number
}

export default function CardRow({ id, prompt, citation, status, ageHours }: CardRowProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const canPromote = status === 'draft' && ageHours >= 24

  function handlePromote() {
    setError(null)
    startTransition(async () => {
      const result = await promoteCardAction(id)
      if (result.error) setError(result.error)
    })
  }

  function handleRetire() {
    if (!confirm('Retire this card? It will be flagged and excluded from new sessions.')) return
    setError(null)
    startTransition(async () => {
      const result = await retireCardAction(id)
      if (result.error) setError(result.error)
    })
  }

  const ageLabel =
    ageHours < 1
      ? `${Math.round(ageHours * 60)}m old`
      : ageHours < 24
        ? `${Math.round(ageHours)}h old`
        : `${Math.floor(ageHours / 24)}d old`

  return (
    <li className="rounded-md border bg-card px-4 py-3 text-sm space-y-1">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium line-clamp-2">{prompt}</p>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            status === 'draft'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              : status === 'reviewed'
                ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                : 'bg-muted text-muted-foreground'
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-xs text-muted-foreground truncate">{citation}</p>
      <div className="flex items-center gap-2">
        <span className={`text-xs ${ageHours >= 24 ? 'text-muted-foreground' : 'text-amber-600 dark:text-amber-400'}`}>
          {ageLabel}
        </span>
        {status === 'draft' && (
          <button
            type="button"
            onClick={handlePromote}
            disabled={isPending || !canPromote}
            className="rounded px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
            title={!canPromote ? 'Must be 24 h old to promote' : undefined}
          >
            {isPending ? '…' : 'Promote'}
          </button>
        )}
        {status !== 'retired' && (
          <button
            type="button"
            onClick={handleRetire}
            disabled={isPending}
            className="rounded px-2 py-0.5 text-xs font-medium border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-40 dark:border-red-800 dark:text-red-400"
          >
            Retire
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </li>
  )
}
