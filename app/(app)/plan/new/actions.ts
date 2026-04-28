'use server'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@/lib/supabase/server'
import { getAnthropicClient } from '@/lib/llm/client'
import {
  buildClustersWithPlanningSummary,
  rankClustersByGapOverlap,
  type ClusterWithCards,
  type CardForPlanning,
} from '@/lib/plan/clusters-summary'
import {
  isYieldTier,
  isDangerLevel,
  isBoardLikelihood,
  isPrimaryLattice,
  isCognitiveTask,
} from '@/lib/cards/types'

export interface PlanItem {
  cluster_id: string
  cluster_name: string
  rationale: string
}

export type GeneratePlanResult =
  | { rejected: true; reason: string }
  | {
      rejected: false
      items: PlanItem[]
      target_window_days: number
      plan_rationale: string
      uncovered_gaps: string[]
      inputTokens: number
      outputTokens: number
      model: string
    }

export interface SavePlanParams {
  items: PlanItem[]
  target_window_days: number
  plan_rationale: string
  inputTokens: number
  outputTokens: number
  model: string
}

// ---------- helpers ----------

const MODEL_ID = 'claude-haiku-4-5-20251001'
const DEFAULT_COGNITIVE_TASK = 'compressed_factoid_other' as const
const MAX_CLUSTERS_IN_PROMPT = 150

interface RawPlanItem {
  cluster_id: unknown
  rationale: unknown
}

interface RawPlanResponse {
  rejected: boolean
  reason?: string
  items?: RawPlanItem[]
  target_window_days?: unknown
  plan_rationale?: unknown
  uncovered_gaps?: unknown[]
}

function isRawPlanResponse(v: unknown): v is RawPlanResponse {
  return (
    typeof v === 'object' &&
    v !== null &&
    'rejected' in v &&
    typeof (v as Record<string, unknown>).rejected === 'boolean'
  )
}

// ---------- server actions ----------

export async function generatePlanAction(): Promise<GeneratePlanResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 1. Gaps from the user's most recent upload
  const { data: uploadRow } = await supabase
    .from('analytics_uploads')
    .select('id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const gapRows =
    uploadRow == null
      ? []
      : (
          await supabase
            .from('structured_analytics')
            .select('concept_id, severity, confidence, weakness_note')
            .eq('upload_id', uploadRow.id)
            .eq('user_id', user.id)
        ).data ?? []

  // 2. Clusters the user can access (RLS applies)
  const { data: clusterRows } = await supabase
    .from('clusters')
    .select('id, name, description')
  const clusters = clusterRows ?? []

  // 3. Card IDs for all those clusters
  const clusterIds = clusters.map((c) => c.id as string)
  const membershipRows =
    clusterIds.length === 0
      ? []
      : (
          await supabase
            .from('cluster_memberships')
            .select('cluster_id, card_id')
            .in('cluster_id', clusterIds)
        ).data ?? []

  const cardIds = [...new Set(membershipRows.map((m) => m.card_id as string))]

  // 4. Card planning fields (cards visible per RLS: reviewed or own draft)
  const cardRows =
    cardIds.length === 0
      ? []
      : (
          await supabase
            .from('cards')
            .select('id, yield_tier, danger_level, board_likelihood, primary_lattice')
            .in('id', cardIds)
        ).data ?? []

  // 5. Cognitive task from card_retrieval_metadata (LEFT JOIN semantics: default when missing)
  const metaRows =
    cardIds.length === 0
      ? []
      : (
          await supabase
            .from('card_retrieval_metadata')
            .select('card_id, cognitive_task')
            .in('card_id', cardIds)
        ).data ?? []

  const cognitiveTaskByCardId = new Map(
    metaRows.map((r) => [r.card_id as string, r.cognitive_task as string]),
  )

  // 6. Concept coverage from card_ontology_tags
  const tagRows =
    cardIds.length === 0
      ? []
      : (
          await supabase
            .from('card_ontology_tags')
            .select('card_id, concept_id')
            .in('card_id', cardIds)
        ).data ?? []

  const conceptIdsByCardId = new Map<string, string[]>()
  for (const tag of tagRows) {
    const cid = tag.card_id as string
    const arr = conceptIdsByCardId.get(cid) ?? []
    arr.push(tag.concept_id as string)
    conceptIdsByCardId.set(cid, arr)
  }

  // 7. Assemble ClusterWithCards[]
  const membershipsByCluster = new Map<string, string[]>()
  for (const m of membershipRows) {
    const arr = membershipsByCluster.get(m.cluster_id as string) ?? []
    arr.push(m.card_id as string)
    membershipsByCluster.set(m.cluster_id as string, arr)
  }

  const cardById = new Map(cardRows.map((c) => [c.id as string, c]))

  const clustersWithCards: ClusterWithCards[] = clusters.map((cluster) => {
    const cids = membershipsByCluster.get(cluster.id as string) ?? []
    const cards: CardForPlanning[] = cids.flatMap((cardId) => {
      const card = cardById.get(cardId)
      if (!card) return []
      const rawYield = card.yield_tier as string
      const rawDanger = card.danger_level as string
      const rawBoard = card.board_likelihood as string
      const rawLattice = card.primary_lattice as string
      const rawCognitive = cognitiveTaskByCardId.get(cardId) ?? DEFAULT_COGNITIVE_TASK
      if (
        !isYieldTier(rawYield) ||
        !isDangerLevel(rawDanger) ||
        !isBoardLikelihood(rawBoard) ||
        !isPrimaryLattice(rawLattice)
      ) {
        return []
      }
      return [
        {
          card_id: cardId,
          yield_tier: rawYield,
          danger_level: rawDanger,
          board_likelihood: rawBoard,
          primary_lattice: rawLattice,
          cognitive_task: isCognitiveTask(rawCognitive) ? rawCognitive : DEFAULT_COGNITIVE_TASK,
          concept_ids: conceptIdsByCardId.get(cardId) ?? [],
        },
      ]
    })
    return {
      cluster_id: cluster.id as string,
      name: cluster.name as string,
      description: cluster.description as string | null,
      cards,
    }
  })

  // 8. Build planning summaries and rank by gap overlap (cap at 150)
  const gapConceptIds = gapRows.map((g) => g.concept_id as string)
  const allSummaries = buildClustersWithPlanningSummary(clustersWithCards)
  const rankedSummaries = rankClustersByGapOverlap(allSummaries, gapConceptIds).slice(
    0,
    MAX_CLUSTERS_IN_PROMPT,
  )

  // 9. Recent completed plans (for recency damping in prompt)
  const { data: recentPlanRows } = await supabase
    .from('study_plans')
    .select('id, completed_at, plan_items(cluster_id)')
    .eq('user_id', user.id)
    .eq('status', 'complete')
    .order('completed_at', { ascending: false })
    .limit(3)

  const recentPlanHistory = (recentPlanRows ?? []).map((p) => ({
    plan_id: p.id as string,
    completed_at: (p.completed_at as string | null)?.slice(0, 10) ?? '',
    cluster_ids: (
      p.plan_items as unknown as Array<{ cluster_id: string }>
    ).map((pi) => pi.cluster_id),
  }))

  // 10. Build and interpolate the plan prompt
  const promptRaw = readFileSync(join(process.cwd(), 'prompts', 'plan.md'), 'utf-8')
  const implNotesMarker = '## Implementation notes (for the server, not the model)'
  const implNotesIdx = promptRaw.indexOf(implNotesMarker)
  const promptBody = implNotesIdx === -1 ? promptRaw : promptRaw.slice(0, implNotesIdx)

  const systemPrompt = promptBody
    .replaceAll('{{gaps_json}}', JSON.stringify(gapRows, null, 2))
    .replaceAll('{{clusters_json}}', JSON.stringify(rankedSummaries, null, 2))
    .replaceAll('{{today_iso}}', new Date().toISOString().slice(0, 10))
    .replaceAll('{{recent_plan_history_json}}', JSON.stringify(recentPlanHistory, null, 2))

  // 11. Call Haiku 4.5 (D6 LLM call site #2). Prefill '{' enforces JSON start.
  const client = getAnthropicClient()
  const response = await client.messages.create({
    model: MODEL_ID,
    max_tokens: 2048,
    temperature: 0,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: 'Please generate the study plan and return your JSON response.',
      },
      { role: 'assistant', content: '{' },
    ],
  })

  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  const completionText =
    response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonText = '{' + completionText

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return {
      rejected: true,
      reason: 'Plan generation failed — the model returned malformed output. Please try again.',
    }
  }

  if (!isRawPlanResponse(parsed)) {
    return {
      rejected: true,
      reason: 'Plan generation failed — unexpected response shape. Please try again.',
    }
  }

  if (parsed.rejected) {
    return { rejected: true, reason: parsed.reason ?? 'Plan rejected.' }
  }

  // 12. Validate output
  const validClusterIds = new Set(clusters.map((c) => c.id as string))
  const clusterNameById = new Map(clusters.map((c) => [c.id as string, c.name as string]))

  const rawItems = parsed.items ?? []
  const items: PlanItem[] = rawItems
    .filter(
      (item) =>
        typeof item.cluster_id === 'string' &&
        validClusterIds.has(item.cluster_id) &&
        typeof item.rationale === 'string',
    )
    .map((item) => ({
      cluster_id: item.cluster_id as string,
      cluster_name: clusterNameById.get(item.cluster_id as string) ?? (item.cluster_id as string),
      rationale: (item.rationale as string).slice(0, 240),
    }))
    // Remove duplicate cluster_ids (model constraint but enforce here too)
    .filter((item, idx, arr) => arr.findIndex((x) => x.cluster_id === item.cluster_id) === idx)

  // Enforce 5–15 items
  if (items.length < 5 || items.length > 15) {
    return {
      rejected: true,
      reason: `Plan validation failed — expected 5–15 items, got ${items.length}. Please try again.`,
    }
  }

  const rawDays =
    typeof parsed.target_window_days === 'number' ? parsed.target_window_days : 10
  const target_window_days = Math.min(14, Math.max(7, Math.round(rawDays)))

  const plan_rationale =
    typeof parsed.plan_rationale === 'string'
      ? parsed.plan_rationale
      : 'Study plan generated from your recent gaps.'

  const uncovered_gaps = (parsed.uncovered_gaps ?? [])
    .filter((g): g is string => typeof g === 'string')

  return {
    rejected: false,
    items,
    target_window_days,
    plan_rationale,
    uncovered_gaps,
    inputTokens,
    outputTokens,
    model: MODEL_ID,
  }
}

export async function savePlanAction(
  params: SavePlanParams,
): Promise<{ success: true; planId: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Insert study_plan
  const { data: plan, error: planError } = await supabase
    .from('study_plans')
    .insert({
      user_id: user.id,
      status: 'active',
      target_window_days: params.target_window_days,
      rationale: params.plan_rationale,
    })
    .select('id')
    .single()
  if (planError) throw new Error(planError.message)

  const planId = plan.id as string

  // Insert plan_items (position is 1-based)
  const { error: itemsError } = await supabase.from('plan_items').insert(
    params.items.map((item, idx) => ({
      plan_id: planId,
      cluster_id: item.cluster_id,
      position: idx + 1,
      rationale: item.rationale,
    })),
  )
  if (itemsError) throw new Error(itemsError.message)

  // Log token usage (D16)
  const { error: usageError } = await supabase.from('usage_events').insert({
    user_id: user.id,
    call_site: 'plan',
    model: params.model,
    input_tokens: params.inputTokens,
    output_tokens: params.outputTokens,
    request_ref: planId,
  })
  if (usageError) throw new Error(usageError.message)

  return { success: true, planId }
}
