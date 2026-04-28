'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { generatePlanAction, savePlanAction, type PlanItem } from './actions'

interface Props {
  llmEnabled: boolean
  gapCount: number
  clusterCount: number
}

type Step = 'ready' | 'review'

export default function PlanNewClient({ llmEnabled, gapCount, clusterCount }: Props) {
  const router = useRouter()
  const [isGenerating, startGenerate] = useTransition()
  const [isSaving, startSave] = useTransition()

  const [step, setStep] = useState<Step>('ready')
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Plan proposal state
  const [items, setItems] = useState<PlanItem[]>([])
  const [targetWindowDays, setTargetWindowDays] = useState(10)
  const [planRationale, setPlanRationale] = useState('')
  const [uncoveredGaps, setUncoveredGaps] = useState<string[]>([])
  const [tokenMeta, setTokenMeta] = useState<{
    inputTokens: number
    outputTokens: number
    model: string
  } | null>(null)

  if (!llmEnabled) {
    return (
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        LLM not configured — set <code className="font-mono">ANTHROPIC_API_KEY</code> to enable
        plan generation.
      </div>
    )
  }

  if (gapCount === 0) {
    return (
      <div className="rounded-md border border-dashed bg-card p-6 text-sm text-muted-foreground text-center space-y-2">
        <p>No study gaps found.</p>
        <p>
          <a href="/intake" className="text-foreground underline underline-offset-2">
            Upload your analytics
          </a>{' '}
          first so the plan generator has gaps to work with.
        </p>
      </div>
    )
  }

  if (clusterCount === 0) {
    return (
      <div className="rounded-md border border-dashed bg-card p-6 text-sm text-muted-foreground text-center">
        No clusters available. Clusters need to be set up before a plan can be generated.
      </div>
    )
  }

  function handleGenerate() {
    setGenerateError(null)
    startGenerate(async () => {
      try {
        const result = await generatePlanAction()
        if (result.rejected) {
          setGenerateError(result.reason)
        } else {
          setItems(result.items)
          setTargetWindowDays(result.target_window_days)
          setPlanRationale(result.plan_rationale)
          setUncoveredGaps(result.uncovered_gaps)
          setTokenMeta({
            inputTokens: result.inputTokens,
            outputTokens: result.outputTokens,
            model: result.model,
          })
          setStep('review')
        }
      } catch {
        setGenerateError('Plan generation failed. Please try again.')
      }
    })
  }

  function handleSave() {
    if (!tokenMeta) return
    setSaveError(null)
    startSave(async () => {
      try {
        const result = await savePlanAction({
          items,
          target_window_days: targetWindowDays,
          plan_rationale: planRationale,
          ...tokenMeta,
        })
        // Phase 5 will add /plan/[id] — redirect there once it exists
        router.push(`/dashboard`)
        void result
      } catch {
        setSaveError('Failed to save plan. Please try again.')
      }
    })
  }

  // ---- Step: review ----
  if (step === 'review') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Your study plan</h2>
          <p className="text-sm text-muted-foreground">
            {items.length} cluster{items.length !== 1 ? 's' : ''} · {targetWindowDays}-day window
          </p>
        </div>

        {/* Plan rationale */}
        <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground leading-relaxed">
          {planRationale}
        </div>

        {/* Ordered cluster list */}
        <ol className="space-y-2">
          {items.map((item, idx) => (
            <li key={item.cluster_id} className="flex gap-3">
              <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {idx + 1}
              </span>
              <div className="flex-1 rounded-md border bg-card p-3 space-y-1">
                <p className="font-medium text-sm">{item.cluster_name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.rationale}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Uncovered gaps */}
        {uncoveredGaps.length > 0 && (
          <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-800">
            <p className="font-medium mb-1">Topics not covered by your clusters:</p>
            <ul className="space-y-0.5 font-mono">
              {uncoveredGaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        )}

        {saveError && <p className="text-sm text-destructive">{saveError}</p>}

        <div className="flex gap-3">
          <button
            onClick={() => setStep('ready')}
            disabled={isSaving}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
          >
            Regenerate
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : 'Save plan'}
          </button>
        </div>
      </div>
    )
  }

  // ---- Step: ready ----
  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-card p-4 space-y-1 text-sm">
        <p>
          <span className="font-medium">{gapCount}</span> gap{gapCount !== 1 ? 's' : ''} from your
          most recent intake
        </p>
        <p>
          <span className="font-medium">{clusterCount}</span> cluster
          {clusterCount !== 1 ? 's' : ''} available
        </p>
      </div>

      {generateError && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {generateError}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isGenerating ? 'Generating…' : 'Generate study plan'}
      </button>
    </div>
  )
}
