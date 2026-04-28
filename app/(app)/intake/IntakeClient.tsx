'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  parseIntakeAction,
  saveGapsAction,
  type ParsedGapItem,
  type Severity,
} from './actions'

interface Props {
  llmEnabled: boolean
}

type Step = 'input' | 'review'

export default function IntakeClient({ llmEnabled }: Props) {
  const router = useRouter()
  const [isParsing, startParse] = useTransition()
  const [isSaving, startSave] = useTransition()

  const [step, setStep] = useState<Step>('input')
  const [text, setText] = useState('')
  const [rejection, setRejection] = useState<string | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [items, setItems] = useState<ParsedGapItem[]>([])
  const [tokenMeta, setTokenMeta] = useState<{
    inputTokens: number
    outputTokens: number
    model: string
  } | null>(null)

  if (!llmEnabled) {
    return (
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        LLM not configured — set <code className="font-mono">ANTHROPIC_API_KEY</code> to enable
        intake parsing.
      </div>
    )
  }

  function handleParse() {
    if (!text.trim()) return
    setRejection(null)
    setParseError(null)
    startParse(async () => {
      try {
        const result = await parseIntakeAction(text.trim())
        if (result.rejected) {
          setRejection(result.reason)
        } else {
          setItems(result.items)
          setTokenMeta({
            inputTokens: result.inputTokens,
            outputTokens: result.outputTokens,
            model: result.model,
          })
          setStep('review')
        }
      } catch {
        setParseError('Something went wrong parsing your input. Please try again.')
      }
    })
  }

  function handleRemoveItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  function handleUpdateSeverity(idx: number, severity: Severity) {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, severity } : item)))
  }

  function handleUpdateNote(idx: number, weakness_note: string) {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, weakness_note } : item)))
  }

  function handleSave() {
    if (!tokenMeta) return
    setSaveError(null)
    startSave(async () => {
      try {
        await saveGapsAction({ items, rawText: text, ...tokenMeta })
        router.push('/dashboard')
      } catch {
        setSaveError('Failed to save. Please try again.')
      }
    })
  }

  // ---- Step: review ----
  if (step === 'review') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Review your gaps</h2>
          <p className="text-sm text-muted-foreground">
            Edit or remove rows before saving. Severity is adjustable.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-md border p-4 text-sm text-muted-foreground">
            No specific gaps found. Try adding more detail — for example, what topics you got wrong
            and roughly how many questions.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="rounded-md border bg-card p-3 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.concept_title}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {item.concept_id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      confidence: {item.confidence}
                    </span>
                    <select
                      value={item.severity}
                      onChange={(e) => handleUpdateSeverity(idx, e.target.value as Severity)}
                      className="text-xs rounded border border-input bg-background px-2 py-1"
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {item.weakness_note && (
                  <input
                    type="text"
                    value={item.weakness_note}
                    maxLength={240}
                    onChange={(e) => handleUpdateNote(idx, e.target.value)}
                    className="w-full text-xs rounded border border-input bg-background px-2 py-1 text-muted-foreground"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {saveError && (
          <p className="text-sm text-destructive">{saveError}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setStep('input')}
            disabled={isSaving}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving
              ? 'Saving…'
              : items.length > 0
                ? `Save ${items.length} gap${items.length !== 1 ? 's' : ''}`
                : 'Save (no gaps found)'}
          </button>
        </div>
      </div>
    )
  }

  // ---- Step: input ----
  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          "Paste your analytics, notes, or describe what you got wrong — e.g. 'I bombed hyponatremia and DKA on MKSAP last weekend'"
        }
        rows={8}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
      />

      {rejection && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {rejection}
        </div>
      )}

      {parseError && (
        <p className="text-sm text-destructive">{parseError}</p>
      )}

      <button
        onClick={handleParse}
        disabled={isParsing || !text.trim()}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isParsing ? 'Parsing…' : 'Parse my gaps'}
      </button>
    </div>
  )
}
