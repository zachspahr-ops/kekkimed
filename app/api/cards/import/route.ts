import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

// ============================================================================
// Locked enum sets (must stay in sync with DB check constraints)
// ============================================================================
const CARD_FORMATS = [
  'single_term_direct_cloze', 'bidirectional_term', 'clue_diagnosis_contrast',
  'eponym', 'linked_cloze_threshold', 'management_triplet', 'pairing_matrix',
  'complete_set_same_cloze', 'image_first_recognition',
] as const

const PRIMARY_LATTICES = ['t_to_m', 'p_to_e', 'e_to_o', 's_to_r'] as const

const SECONDARY_LATTICES = [
  'd_to_t', 'tst_to_int', 'sev_to_act', 'tx_to_mon',
  'cx_to_avoid', 'dx_to_diff', 'fu_to_next',
] as const

const DIFFICULTIES = ['core', 'advanced', 'trap'] as const
const CITATION_KINDS = ['guideline', 'primary_lit', 'textbook', 'uptodate', 'other'] as const
const YIELD_TIERS = ['high', 'medium', 'low'] as const
const DANGER_LEVELS = ['low', 'moderate', 'high', 'lethal'] as const
const BOARD_LIKELIHOODS = ['high', 'medium', 'low'] as const
const SOURCE_STRENGTHS = [
  'society_guideline', 'primary_trial', 'systematic_review',
  'narrative_review', 'expert_opinion',
] as const
const REVIEW_PRIORITIES = ['high', 'medium', 'low'] as const
const CONTEXTS = ['acute', 'chronic', 'screening', 'complication'] as const
const QTYPES = ['diagnosis', 'management', 'interpretation', 'prognosis', 'mechanism'] as const
const TAG_ROLES = ['primary', 'secondary', 'bridge', 'planning_only'] as const
const TAG_GRANULARITIES = ['system', 'subsection', 'topic'] as const
const COGNITIVE_TASKS = [
  'diagnosis_from_clues', 'management_treatment', 'test_lab_threshold',
  'mechanism_pathophys', 'association_risk', 'classic_feature_pattern',
  'multi_answer_list', 'term_alias_definition', 'eponym', 'superlative_rank',
  'compressed_factoid_other',
] as const
const RETRIEVAL_DIRECTIONS = [
  'forward', 'reverse', 'bidirectional', 'matrix_forward', 'matrix_reverse',
] as const

// ============================================================================
// Helpers
// ============================================================================
function isOneOf<T extends string>(val: unknown, choices: readonly T[]): val is T {
  return typeof val === 'string' && (choices as readonly string[]).includes(val)
}

function isSubsetOf<T extends string>(val: unknown, choices: readonly T[]): boolean {
  if (!Array.isArray(val)) return false
  return val.every((v) => isOneOf(v, choices))
}

function nonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0
}

// ============================================================================
// Route handler
// ============================================================================
export async function POST(req: NextRequest) {
  // Auth: check IMPORT_API_KEY
  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  const expected = process.env.IMPORT_API_KEY
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Body must be a JSON object' }, { status: 400 })
  }

  const { author_user_id, cards: rawCards } = body as Record<string, unknown>

  if (!nonEmptyString(author_user_id)) {
    return NextResponse.json({ error: 'author_user_id is required' }, { status: 400 })
  }

  if (!Array.isArray(rawCards) || rawCards.length === 0) {
    return NextResponse.json({ error: 'cards must be a non-empty array' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const inserted: string[] = []
  const skipped: Array<{ index: number; reason: string }> = []

  for (let i = 0; i < rawCards.length; i++) {
    const raw = rawCards[i] as Record<string, unknown>

    // --- required field validation ---
    if (!nonEmptyString(raw.prompt)) {
      skipped.push({ index: i, reason: 'Missing required field: prompt' }); continue
    }
    if (!nonEmptyString(raw.answer)) {
      skipped.push({ index: i, reason: 'Missing required field: answer' }); continue
    }
    if (!nonEmptyString(raw.citation)) {
      skipped.push({ index: i, reason: 'Missing required field: citation' }); continue
    }
    if (!isOneOf(raw.citation_kind, CITATION_KINDS)) {
      skipped.push({ index: i, reason: `citation_kind must be one of: ${CITATION_KINDS.join(', ')}` }); continue
    }
    if (!isOneOf(raw.difficulty, DIFFICULTIES)) {
      skipped.push({ index: i, reason: `difficulty must be one of: ${DIFFICULTIES.join(', ')}` }); continue
    }
    if (!isOneOf(raw.card_format, CARD_FORMATS)) {
      skipped.push({ index: i, reason: `card_format must be one of: ${CARD_FORMATS.join(', ')}` }); continue
    }
    if (!isOneOf(raw.primary_lattice, PRIMARY_LATTICES)) {
      skipped.push({ index: i, reason: `primary_lattice must be one of: ${PRIMARY_LATTICES.join(', ')}` }); continue
    }

    // --- optional fields with defaults ---
    const secondary_lattices = Array.isArray(raw.secondary_lattices) ? raw.secondary_lattices : []
    if (!isSubsetOf(secondary_lattices, SECONDARY_LATTICES)) {
      skipped.push({ index: i, reason: `secondary_lattices contains invalid value(s)` }); continue
    }
    const contexts = Array.isArray(raw.contexts) ? raw.contexts : []
    if (!isSubsetOf(contexts, CONTEXTS)) {
      skipped.push({ index: i, reason: `contexts contains invalid value(s)` }); continue
    }
    const qtypes = Array.isArray(raw.qtypes) ? raw.qtypes : []
    if (!isSubsetOf(qtypes, QTYPES)) {
      skipped.push({ index: i, reason: `qtypes contains invalid value(s)` }); continue
    }

    const yield_tier = isOneOf(raw.yield_tier, YIELD_TIERS) ? raw.yield_tier : 'medium'
    const danger_level = isOneOf(raw.danger_level, DANGER_LEVELS) ? raw.danger_level : 'moderate'
    const board_likelihood = isOneOf(raw.board_likelihood, BOARD_LIKELIHOODS) ? raw.board_likelihood : 'medium'
    const source_strength = isOneOf(raw.source_strength, SOURCE_STRENGTHS) ? raw.source_strength : 'narrative_review'
    const review_priority = isOneOf(raw.review_priority, REVIEW_PRIORITIES) ? raw.review_priority : 'medium'

    const primary_system_id =
      typeof raw.primary_system_id === 'string' && raw.primary_system_id.length > 0
        ? raw.primary_system_id
        : null

    const secondary_system_ids = Array.isArray(raw.secondary_system_ids)
      ? (raw.secondary_system_ids as unknown[]).filter((v) => typeof v === 'string')
      : []

    const bridge_reason =
      typeof raw.bridge_reason === 'string' && raw.bridge_reason.length > 0
        ? raw.bridge_reason
        : null

    // --- insert card ---
    const { data: card, error: cardError } = await supabase
      .from('cards')
      .insert({
        prompt: raw.prompt,
        answer: raw.answer,
        citation: raw.citation,
        citation_kind: raw.citation_kind,
        source: 'external_pipeline',
        status: 'draft',
        author_user_id,
        difficulty: raw.difficulty,
        card_format: raw.card_format,
        primary_lattice: raw.primary_lattice,
        secondary_lattices,
        contexts,
        qtypes,
        yield_tier,
        danger_level,
        board_likelihood,
        source_strength,
        review_priority,
        primary_system_id,
        secondary_system_ids,
        bridge_reason,
      })
      .select('id')
      .single()

    if (cardError || !card) {
      skipped.push({ index: i, reason: cardError?.message ?? 'Insert failed' })
      continue
    }

    const cardId = card.id as string

    // --- insert tags ---
    const tags = Array.isArray(raw.tags) ? raw.tags : []
    for (const tag of tags as Record<string, unknown>[]) {
      if (!nonEmptyString(tag.concept_id)) continue
      if (!isOneOf(tag.granularity, TAG_GRANULARITIES)) continue
      const tag_role = isOneOf(tag.tag_role, TAG_ROLES) ? tag.tag_role : 'primary'
      const confidence =
        typeof tag.confidence === 'number' && tag.confidence >= 0 && tag.confidence <= 1
          ? tag.confidence
          : 1.0

      await supabase.from('card_ontology_tags').insert({
        card_id: cardId,
        concept_id: tag.concept_id,
        tag_role,
        granularity: tag.granularity,
        confidence,
        tag_source: 'import',
        tagger_version: typeof tag.tagger_version === 'string' ? tag.tagger_version : null,
        review_status: 'accepted',
      })
      // Tag insert errors (e.g., unknown concept_id) are soft-ignored here;
      // the card is still inserted. The pipeline should validate concept IDs.
    }

    // --- insert retrieval metadata (optional) ---
    const meta = raw.retrieval_metadata
    if (meta && typeof meta === 'object' && !Array.isArray(meta)) {
      const m = meta as Record<string, unknown>
      if (isOneOf(m.cognitive_task, COGNITIVE_TASKS)) {
        await supabase.from('card_retrieval_metadata').insert({
          card_id: cardId,
          cognitive_task: m.cognitive_task,
          prompt_frame: typeof m.prompt_frame === 'string' ? m.prompt_frame : null,
          answer_form: typeof m.answer_form === 'string' ? m.answer_form : null,
          retrieval_direction: isOneOf(m.retrieval_direction, RETRIEVAL_DIRECTIONS)
            ? m.retrieval_direction
            : null,
          discriminator: typeof m.discriminator === 'string' ? m.discriminator : null,
          confusable_with: typeof m.confusable_with === 'string' ? m.confusable_with : null,
          requires_cloze_one_by_one: m.requires_cloze_one_by_one === true,
          cloze_grouping: typeof m.cloze_grouping === 'string' ? m.cloze_grouping : null,
          format_confidence:
            typeof m.format_confidence === 'number' ? m.format_confidence : null,
          format_review_status: isOneOf(m.format_review_status, [
            'likely_ok', 'revise_format', 'manual_review', 'approved',
          ] as const)
            ? m.format_review_status
            : 'likely_ok',
          format_review_note: typeof m.format_review_note === 'string' ? m.format_review_note : null,
        })
      }
    }

    inserted.push(cardId)
  }

  return NextResponse.json({ inserted: inserted.length, card_ids: inserted, skipped })
}
