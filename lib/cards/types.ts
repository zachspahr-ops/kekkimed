// Locked card vocabulary per DECISIONS.md D17, D19, D20, D21.
//
// Single source of truth in TypeScript that mirrors the DB CHECK constraints
// in supabase/migrations/001_init.sql, 002_abim_ontology.sql,
// 003_retrieval_metadata.sql, and 004_planning_layer.sql.
//
// Update via forward migration ONLY. Adding a new enum value here without a
// corresponding migration silently desyncs runtime types from the database.
// CLAUDE.md "Things to ask Zach before changing" — this file is one of them.

// ---------- D7 / D13 / D17: cards.* identity columns ----------

/** D13: provenance of a card. `ai_private` cards never auto-promote (see D13). */
export type CardSource = 'human' | 'external_pipeline' | 'ai_private';

/** D7: lifecycle. 24-hour cooling between `draft` and `reviewed` per DB trigger. */
export type CardStatus = 'draft' | 'reviewed' | 'retired';

/** D17: pedagogical difficulty layer. */
export type Difficulty = 'core' | 'advanced' | 'trap';

/** D7: citation provenance category, enforced by m001 CHECK constraint. */
export type CitationKind = 'guideline' | 'primary_lit' | 'textbook' | 'uptodate' | 'other';

// ---------- D19 / D17: card_ontology_tags ----------

/** D19: tag role. Exactly one `primary` per card (partial unique index). */
export type TagRole = 'primary' | 'secondary' | 'bridge' | 'planning_only';

/** D19 / D17: depth in the ABIM ontology, denormalized from concepts.level. */
export type Granularity = 'system' | 'subsection' | 'topic';

/** D19: tag review state. Distinct from format_review_status (D20 amendment). */
export type TagReviewStatus = 'accepted' | 'needs_review' | 'rejected';

/** D19: provenance of a tag (canonical = blueprint-derived; model = LLM-produced). */
export type TagSource = 'canonical' | 'script' | 'manual_override' | 'model' | 'import';

// ---------- D20: lattice / cognitive_task / card_format / cloze ----------

/** D20: primary clinical relation the card teaches. Exactly one per card. */
export type PrimaryLattice = 't_to_m' | 'p_to_e' | 'e_to_o' | 's_to_r';

/** D20: additional clinical relations the card secondarily exercises. */
export type SecondaryLattice =
  | 'd_to_t'
  | 'tst_to_int'
  | 'sev_to_act'
  | 'tx_to_mon'
  | 'cx_to_avoid'
  | 'dx_to_diff'
  | 'fu_to_next';

/** D20: review format from the lattice-bible 9-format menu (m003 widened from 4 → 9). */
export type CardFormat =
  | 'single_term_direct_cloze'
  | 'bidirectional_term'
  | 'clue_diagnosis_contrast'
  | 'eponym'
  | 'linked_cloze_threshold'
  | 'management_triplet'
  | 'pairing_matrix'
  | 'complete_set_same_cloze'
  | 'image_first_recognition';

/** D20: 11-value cognitive operation enum on card_retrieval_metadata. */
export type CognitiveTask =
  | 'diagnosis_from_clues'
  | 'management_treatment'
  | 'test_lab_threshold'
  | 'mechanism_pathophys'
  | 'association_risk'
  | 'classic_feature_pattern'
  | 'multi_answer_list'
  | 'term_alias_definition'
  | 'eponym'
  | 'superlative_rank'
  | 'compressed_factoid_other';

/** D20: direction of retrieval the card supports. NULL = unset; sourced from m003 §3. */
export type RetrievalDirection =
  | 'forward'
  | 'reverse'
  | 'bidirectional'
  | 'matrix_forward'
  | 'matrix_reverse';

/** D20 amendment 2026-04-26: format-choice review state. */
export type FormatReviewStatus = 'likely_ok' | 'revise_format' | 'manual_review' | 'approved';

// ---------- D21: planning layer ----------

export type YieldTier = 'high' | 'medium' | 'low';
export type DangerLevel = 'low' | 'moderate' | 'high' | 'lethal';
export type BoardLikelihood = 'high' | 'medium' | 'low';
export type SourceStrength =
  | 'society_guideline'
  | 'primary_trial'
  | 'systematic_review'
  | 'narrative_review'
  | 'expert_opinion';
export type ReviewPriority = 'high' | 'medium' | 'low';

// ---------- Const value arrays (for runtime iteration / validation) ----------
//
// Pattern: each enum gets an `as const` tuple. Tuples are exported readonly so
// callers can iterate without mutating. The order is the order documented in
// DECISIONS.md (e.g., D21 lists danger_level as low/moderate/high/lethal).

export const CARD_SOURCES = ['human', 'external_pipeline', 'ai_private'] as const satisfies readonly CardSource[];
export const CARD_STATUSES = ['draft', 'reviewed', 'retired'] as const satisfies readonly CardStatus[];
export const DIFFICULTIES = ['core', 'advanced', 'trap'] as const satisfies readonly Difficulty[];
export const CITATION_KINDS = ['guideline', 'primary_lit', 'textbook', 'uptodate', 'other'] as const satisfies readonly CitationKind[];

export const TAG_ROLES = ['primary', 'secondary', 'bridge', 'planning_only'] as const satisfies readonly TagRole[];
export const GRANULARITIES = ['system', 'subsection', 'topic'] as const satisfies readonly Granularity[];
export const TAG_REVIEW_STATUSES = ['accepted', 'needs_review', 'rejected'] as const satisfies readonly TagReviewStatus[];
export const TAG_SOURCES = ['canonical', 'script', 'manual_override', 'model', 'import'] as const satisfies readonly TagSource[];

export const PRIMARY_LATTICES = ['t_to_m', 'p_to_e', 'e_to_o', 's_to_r'] as const satisfies readonly PrimaryLattice[];
export const SECONDARY_LATTICES = [
  'd_to_t',
  'tst_to_int',
  'sev_to_act',
  'tx_to_mon',
  'cx_to_avoid',
  'dx_to_diff',
  'fu_to_next',
] as const satisfies readonly SecondaryLattice[];

export const CARD_FORMATS = [
  'single_term_direct_cloze',
  'bidirectional_term',
  'clue_diagnosis_contrast',
  'eponym',
  'linked_cloze_threshold',
  'management_triplet',
  'pairing_matrix',
  'complete_set_same_cloze',
  'image_first_recognition',
] as const satisfies readonly CardFormat[];

export const COGNITIVE_TASKS = [
  'diagnosis_from_clues',
  'management_treatment',
  'test_lab_threshold',
  'mechanism_pathophys',
  'association_risk',
  'classic_feature_pattern',
  'multi_answer_list',
  'term_alias_definition',
  'eponym',
  'superlative_rank',
  'compressed_factoid_other',
] as const satisfies readonly CognitiveTask[];

export const RETRIEVAL_DIRECTIONS = [
  'forward',
  'reverse',
  'bidirectional',
  'matrix_forward',
  'matrix_reverse',
] as const satisfies readonly RetrievalDirection[];

export const FORMAT_REVIEW_STATUSES = [
  'likely_ok',
  'revise_format',
  'manual_review',
  'approved',
] as const satisfies readonly FormatReviewStatus[];

export const YIELD_TIERS = ['high', 'medium', 'low'] as const satisfies readonly YieldTier[];
export const DANGER_LEVELS = ['low', 'moderate', 'high', 'lethal'] as const satisfies readonly DangerLevel[];
export const BOARD_LIKELIHOODS = ['high', 'medium', 'low'] as const satisfies readonly BoardLikelihood[];
export const SOURCE_STRENGTHS = [
  'society_guideline',
  'primary_trial',
  'systematic_review',
  'narrative_review',
  'expert_opinion',
] as const satisfies readonly SourceStrength[];
export const REVIEW_PRIORITIES = ['high', 'medium', 'low'] as const satisfies readonly ReviewPriority[];

// ---------- Type guards ----------
//
// `makeIsMember` builds a runtime narrowing predicate from a const tuple.
// Generated guards work for `unknown` inputs from the network / DB / LLM
// without coercion.

function makeIsMember<T extends string>(values: readonly T[]) {
  const set = new Set<string>(values);
  return (v: unknown): v is T => typeof v === 'string' && set.has(v);
}

export const isCardSource = makeIsMember(CARD_SOURCES);
export const isCardStatus = makeIsMember(CARD_STATUSES);
export const isDifficulty = makeIsMember(DIFFICULTIES);
export const isCitationKind = makeIsMember(CITATION_KINDS);

export const isTagRole = makeIsMember(TAG_ROLES);
export const isGranularity = makeIsMember(GRANULARITIES);
export const isTagReviewStatus = makeIsMember(TAG_REVIEW_STATUSES);
export const isTagSource = makeIsMember(TAG_SOURCES);

export const isPrimaryLattice = makeIsMember(PRIMARY_LATTICES);
export const isSecondaryLattice = makeIsMember(SECONDARY_LATTICES);
export const isCardFormat = makeIsMember(CARD_FORMATS);
export const isCognitiveTask = makeIsMember(COGNITIVE_TASKS);
export const isRetrievalDirection = makeIsMember(RETRIEVAL_DIRECTIONS);
export const isFormatReviewStatus = makeIsMember(FORMAT_REVIEW_STATUSES);

export const isYieldTier = makeIsMember(YIELD_TIERS);
export const isDangerLevel = makeIsMember(DANGER_LEVELS);
export const isBoardLikelihood = makeIsMember(BOARD_LIKELIHOODS);
export const isSourceStrength = makeIsMember(SOURCE_STRENGTHS);
export const isReviewPriority = makeIsMember(REVIEW_PRIORITIES);
