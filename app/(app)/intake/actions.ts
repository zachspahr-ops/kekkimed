'use server'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@/lib/supabase/server'
import { checkForQbankStem } from '@/lib/intake/stem-rejection'
import {
  filterCandidateConcepts,
  type ConceptRecord,
  type ConceptLevel,
} from '@/lib/intake/candidate-concepts'
import { getAnthropicClient } from '@/lib/llm/client'

export type Severity = 'low' | 'medium' | 'high'
export type Confidence = 'low' | 'medium' | 'high'

export interface ParsedGapItem {
  concept_id: string
  concept_title: string
  severity: Severity
  confidence: Confidence
  weakness_note: string
}

export type ParseIntakeResult =
  | { rejected: true; reason: string }
  | {
      rejected: false
      items: ParsedGapItem[]
      inputTokens: number
      outputTokens: number
      model: string
    }

export interface SaveGapsParams {
  items: ParsedGapItem[]
  rawText: string
  inputTokens: number
  outputTokens: number
  model: string
}

// ---------- helpers ----------

function deriveLevel(id: string): ConceptLevel {
  const dots = (id.match(/\./g) ?? []).length
  if (dots === 0) return 'system'
  if (dots === 1) return 'subsection'
  return 'topic'
}

interface RawGapItem {
  concept_id: unknown
  severity: unknown
  confidence: unknown
  weakness_note?: unknown
}

interface RawParseResponse {
  rejected: boolean
  reason?: string
  items?: RawGapItem[]
}

function isRawParseResponse(v: unknown): v is RawParseResponse {
  return (
    typeof v === 'object' &&
    v !== null &&
    'rejected' in v &&
    typeof (v as Record<string, unknown>).rejected === 'boolean'
  )
}

const VALID_SEVERITIES: ReadonlySet<string> = new Set(['low', 'medium', 'high'])
const VALID_CONFIDENCES: ReadonlySet<string> = new Set(['low', 'medium', 'high'])
const MODEL_ID = 'claude-haiku-4-5-20251001'

// ---------- server actions ----------

export async function parseIntakeAction(rawText: string): Promise<ParseIntakeResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Layer 1: heuristic stem rejection (D14)
  const layer1 = checkForQbankStem(rawText)
  if (layer1.rejected) {
    return { rejected: true, reason: layer1.reason }
  }

  // Load concepts (id, title, synonyms); derive level from ID structure
  const { data: conceptRows, error: conceptsError } = await supabase
    .from('concepts')
    .select('id, title, synonyms')
  if (conceptsError) throw new Error(conceptsError.message)

  const concepts: ConceptRecord[] = (conceptRows ?? []).map((row) => ({
    id: row.id as string,
    title: row.title as string,
    level: deriveLevel(row.id as string),
    synonyms: (row.synonyms as string[] | null) ?? [],
  }))

  const candidates = filterCandidateConcepts(rawText, concepts)
  const candidateSet = new Set(candidates.map((c) => c.id))

  // Build system prompt from prompts/intake.md; strip implementation notes section
  const promptRaw = readFileSync(join(process.cwd(), 'prompts', 'intake.md'), 'utf-8')
  const implNotesMarker = '## Implementation notes (for the server, not the model)'
  const implNotesIdx = promptRaw.indexOf(implNotesMarker)
  const promptBody = implNotesIdx === -1 ? promptRaw : promptRaw.slice(0, implNotesIdx)

  const systemPrompt = promptBody
    .replaceAll('{{user_input}}', rawText)
    .replaceAll('{{candidate_concepts_json}}', JSON.stringify(candidates, null, 2))
    .replaceAll('{{today_iso}}', new Date().toISOString().slice(0, 10))

  // Call Haiku 4.5 (D6 LLM call site #1). Prefill '{' enforces JSON start.
  const client = getAnthropicClient()
  const response = await client.messages.create({
    model: MODEL_ID,
    max_tokens: 1024,
    temperature: 0,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: 'Please analyze the input and return your JSON response.',
      },
      {
        role: 'assistant',
        content: '{',
      },
    ],
  })

  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  // Reconstruct JSON: prefill '{' + model completion
  const completionText =
    response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonText = '{' + completionText

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return { rejected: false, items: [], inputTokens, outputTokens, model: MODEL_ID }
  }

  if (!isRawParseResponse(parsed)) {
    return { rejected: false, items: [], inputTokens, outputTokens, model: MODEL_ID }
  }

  // Layer 2 rejection (from the LLM itself, per D14)
  if (parsed.rejected) {
    return { rejected: true, reason: parsed.reason ?? 'Input rejected by content check.' }
  }

  // Validate and map items
  const conceptTitleMap = new Map(candidates.map((c) => [c.id, c.title]))

  const items: ParsedGapItem[] = (parsed.items ?? [])
    .filter(
      (item) =>
        typeof item.concept_id === 'string' &&
        candidateSet.has(item.concept_id) &&
        typeof item.severity === 'string' &&
        VALID_SEVERITIES.has(item.severity) &&
        typeof item.confidence === 'string' &&
        VALID_CONFIDENCES.has(item.confidence),
    )
    .map((item) => ({
      concept_id: item.concept_id as string,
      concept_title: conceptTitleMap.get(item.concept_id as string) ?? (item.concept_id as string),
      severity: item.severity as Severity,
      confidence: item.confidence as Confidence,
      weakness_note:
        typeof item.weakness_note === 'string' ? item.weakness_note.slice(0, 240) : '',
    }))

  return { rejected: false, items, inputTokens, outputTokens, model: MODEL_ID }
}

export async function saveGapsAction(
  params: SaveGapsParams,
): Promise<{ success: true; uploadId: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Insert raw upload record
  const { data: upload, error: uploadError } = await supabase
    .from('analytics_uploads')
    .insert({ user_id: user.id, kind: 'text', raw_text: params.rawText })
    .select('id')
    .single()
  if (uploadError) throw new Error(uploadError.message)

  const uploadId = upload.id as string

  // Insert one structured_analytics row per gap
  if (params.items.length > 0) {
    const { error: analyticsError } = await supabase.from('structured_analytics').insert(
      params.items.map((item) => ({
        upload_id: uploadId,
        user_id: user.id,
        concept_id: item.concept_id,
        severity: item.severity,
        confidence: item.confidence,
        weakness_note: item.weakness_note || null,
      })),
    )
    if (analyticsError) throw new Error(analyticsError.message)
  }

  // Log token usage (D16)
  const { error: usageError } = await supabase.from('usage_events').insert({
    user_id: user.id,
    call_site: 'intake',
    model: params.model,
    input_tokens: params.inputTokens,
    output_tokens: params.outputTokens,
    request_ref: uploadId,
  })
  if (usageError) throw new Error(usageError.message)

  return { success: true, uploadId }
}
