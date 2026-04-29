'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  submitSelfReportAction,
  submitStandardizedAction,
  startEvaluatorAction,
} from './actions'

type SystemRow = { id: string; title: string; weight: number | null }
type Tab = 'self_report' | 'standardized' | 'evaluator'

const TAB_LABELS: Record<Tab, string> = {
  self_report: 'Self-report',
  standardized: 'Paste a score',
  evaluator: 'Take a calibration',
}

export default function IntakeClient({ systems }: { systems: SystemRow[] }) {
  const [tab, setTab] = useState<Tab>('self_report')
  const [done, setDone] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div className="space-y-6">
      <nav className="flex gap-2 border-b" role="tablist" aria-label="Intake mode">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => {
              setTab(t)
              setDone(null)
            }}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </nav>

      {done && (
        <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          {done}{' '}
          <button
            type="button"
            onClick={() => router.push('/plan/new')}
            className="ml-2 underline underline-offset-2 hover:no-underline"
          >
            Generate plan →
          </button>
        </div>
      )}

      {tab === 'self_report' && <SelfReportTab systems={systems} onDone={setDone} />}
      {tab === 'standardized' && <StandardizedTab systems={systems} onDone={setDone} />}
      {tab === 'evaluator' && <EvaluatorTab />}
    </div>
  )
}

// ---------- Self-report ----------

function SelfReportTab({
  systems,
  onDone,
}: {
  systems: SystemRow[]
  onDone: (msg: string) => void
}) {
  const [scores, setScores] = useState<Record<string, number>>(
    () => Object.fromEntries(systems.map((s) => [s.id, 50])),
  )
  const [isPending, startTransition] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        startTransition(async () => {
          const normalized = Object.fromEntries(
            Object.entries(scores).map(([k, v]) => [k, v / 100]),
          )
          const res = await submitSelfReportAction(normalized)
          onDone(`Saved ${res.rowsWritten} competence rows from self-report.`)
        })
      }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        How comfortable do you feel with each ABIM system right now? 0 = total stranger, 100 =
        rock-solid mastery. Default is 50 (neutral). The slider value distributes uniformly across
        every topic in the system.
      </p>
      <div className="space-y-3">
        {systems.map((s) => (
          <SliderRow
            key={s.id}
            label={s.title}
            sub={s.weight ? `${(s.weight * 100).toFixed(0)}% of exam` : null}
            value={scores[s.id] ?? 50}
            onChange={(v) => setScores((prev) => ({ ...prev, [s.id]: v }))}
          />
        ))}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Save self-report'}
      </button>
    </form>
  )
}

function SliderRow({
  label,
  sub,
  value,
  onChange,
}: {
  label: string
  sub: string | null
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label className="grid grid-cols-[1fr_auto_4rem] items-center gap-4 text-sm">
      <div className="min-w-0">
        <span className="block truncate font-medium">{label}</span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-48"
      />
      <span className="text-right tabular-nums text-muted-foreground">{value}%</span>
    </label>
  )
}

// ---------- Standardized ----------

function StandardizedTab({
  systems,
  onDone,
}: {
  systems: SystemRow[]
  onDone: (msg: string) => void
}) {
  const [pcts, setPcts] = useState<Record<string, string>>(
    () => Object.fromEntries(systems.map((s) => [s.id, ''])),
  )
  const [isPending, startTransition] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        startTransition(async () => {
          const numeric: Record<string, number> = {}
          for (const [k, v] of Object.entries(pcts)) {
            const n = Number(v)
            if (Number.isFinite(n) && v !== '') numeric[k] = n
          }
          const res = await submitStandardizedAction(numeric)
          onDone(`Saved ${res.rowsWritten} competence rows from standardized scores.`)
        })
      }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        Paste your % correct per system from a recent test (USMLE practice, NBME, MKSAP, etc.).
        Leave a field blank to default it to 50%.
      </p>
      <div className="space-y-3">
        {systems.map((s) => (
          <label key={s.id} className="grid grid-cols-[1fr_6rem] items-center gap-4 text-sm">
            <span className="font-medium">{s.title}</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={pcts[s.id] ?? ''}
              onChange={(e) => setPcts((prev) => ({ ...prev, [s.id]: e.target.value }))}
              placeholder="50"
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-right tabular-nums"
            />
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Save standardized scores'}
      </button>
    </form>
  )
}

// ---------- Evaluator ----------

function EvaluatorTab() {
  return (
    <form action={startEvaluatorAction} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Sit a quick 18-card calibration session — one card per ABIM system. Your ratings on those
        cards seed your competence profile. Untouched topics default to 0.5 (neutral).
      </p>
      <p className="text-xs text-muted-foreground">
        Note: cards used in the evaluator are real review cards, so you&apos;ll have seen them
        before they show up in a future plan. Mild signal contamination is accepted in V1.
      </p>
      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
      >
        Start calibration session
      </button>
    </form>
  )
}
