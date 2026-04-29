'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { generateDeterministicPlanAction, type DeterministicPlanResult } from './actions'

export default function PlanNewClient({ competenceRows }: { competenceRows: number }) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<DeterministicPlanResult | null>(null)

  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-card p-4 text-sm">
        <p>
          <span className="font-medium">{competenceRows}</span> competence rows on file.
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          startTransition(async () => {
            const r = await generateDeterministicPlanAction()
            setResult(r)
          })
        }
        disabled={isPending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Generating…' : 'Generate plan'}
      </button>

      {result?.rejected && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {result.reason}
        </div>
      )}

      {result && !result.rejected && (
        <div className="space-y-4">
          <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
            Saved plan {result.planId.slice(0, 8)}… (folded {result.foldedReviews} new review(s)
            into competence before ranking).
          </div>
          <ol className="space-y-3">
            {result.picks.map((p, idx) => (
              <li key={p.topic_id} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {idx + 1}
                </span>
                <div className="flex-1 space-y-1 rounded-md border bg-card p-3">
                  <p className="text-sm font-medium">{p.topic_title}</p>
                  <p className="text-xs text-muted-foreground">
                    importance {p.importance.toFixed(4)} · competence {p.competence.toFixed(2)} ·
                    weakness {p.weakness.toFixed(4)} · {p.card_count} card
                    {p.card_count !== 1 ? 's' : ''}
                  </p>
                  <Link
                    href={`/clusters/${p.cluster_id}`}
                    className="text-xs text-foreground underline underline-offset-2 hover:no-underline"
                  >
                    Open cluster →
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() =>
              startTransition(async () => {
                const r = await generateDeterministicPlanAction()
                setResult(r)
              })
            }
            disabled={isPending}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
          >
            {isPending ? 'Regenerating…' : 'Regenerate'}
          </button>
        </div>
      )}
    </div>
  )
}
