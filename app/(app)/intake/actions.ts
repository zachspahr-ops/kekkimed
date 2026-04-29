'use server'

import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { createClient } from '@/lib/supabase/server'
import {
  initFromSelfReport,
  initFromStandardized,
  startEvaluatorSession,
} from '@/lib/intake/init-competence'

// ---------- self-report ----------

export async function submitSelfReportAction(
  systemScores: Record<string, number>,
): Promise<{ success: true; rowsWritten: number }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { rowsWritten } = await initFromSelfReport(supabase, user.id, systemScores)
  return { success: true, rowsWritten }
}

// ---------- standardized ----------

export async function submitStandardizedAction(
  systemPercents: Record<string, number>,
): Promise<{ success: true; rowsWritten: number }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { rowsWritten } = await initFromStandardized(supabase, user.id, systemPercents)
  return { success: true, rowsWritten }
}

// ---------- evaluator (server-side bootstrap) ----------

/**
 * Form action: starts a fresh evaluator session and redirects to the review
 * UI. The cluster is created with kind='evaluator'; on session completion,
 * `finishSession` (in /review/[session_id]/actions.ts) detects the kind and
 * runs `initFromEvaluatorSession`.
 */
export async function startEvaluatorAction(): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const sessionId = randomUUID()
  const { clusterId, cardCount } = await startEvaluatorSession(supabase, user.id, sessionId)

  if (cardCount === 0) {
    redirect('/intake?error=no_cards')
  }

  redirect(`/review/${sessionId}?cluster=${clusterId}`)
}
