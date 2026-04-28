// Validator for the `POST /api/cards/import` payload (Phase 6).
//
// External card-generation pipeline posts a JSON envelope; this validator
// is the single boundary between untrusted input and the DB. Validates
// against D7, D13, D17, D19, D20, D21 vocabulary using the locked enum
// guards from /lib/cards/types.ts.
//
// Contract:
//   - Input is `unknown` (the raw JSON.parse output).
//   - Output is a discriminated union: success with a NORMALIZED payload
//     (defaults applied; ready to map to DB rows) OR failure with an
//     accumulated list of errors (every problem found, not short-circuited).
//   - This validator does NOT touch the DB. Cluster-id existence checks,
//     concept-id existence checks, and 24-hour-cooling are application-layer
//     concerns the consumer enforces after schema validation succeeds.

import {
  isCardFormat,
  isCognitiveTask,
  isDangerLevel,
  isDifficulty,
  isFormatReviewStatus,
  isGranularity,
  isPrimaryLattice,
  isRetrievalDirection,
  isReviewPriority,
  isSecondaryLattice,
  isSourceStrength,
  isTagRole,
  isTagSource,
  isYieldTier,
  isBoardLikelihood,
  type BoardLikelihood,
  type CardFormat,
  type CognitiveTask,
  type DangerLevel,
  type Difficulty,
  type FormatReviewStatus,
  type Granularity,
  type PrimaryLattice,
  type RetrievalDirection,
  type ReviewPriority,
  type SecondaryLattice,
  type SourceStrength,
  type TagRole,
  type TagSource,
  type YieldTier,
} from './types.ts';

// ---------- Public payload types (the external pipeline produces these) ----------

export interface ImportOntologyTag {
  /** Concept id from `concepts.id`. Validator checks shape only; existence is the consumer's job. */
  concept_id: string;
  tag_role: TagRole;
  granularity: Granularity;
  /** 0–1. Defaults to 1.0 when omitted. */
  confidence?: number;
  tag_source: TagSource;
  tagger_version?: string;
}

export interface ImportClusterDefinition {
  name: string;
  description?: string | null;
  /** Default 'private' if omitted. */
  visibility?: 'private' | 'shared';
}

export interface ImportCard {
  // Core (D7, D17)
  prompt: string;
  answer: string;
  citation: string;
  citation_kind?: string;
  difficulty: Difficulty;

  // D20 lattice
  primary_lattice: PrimaryLattice;
  secondary_lattices?: SecondaryLattice[];
  card_format: CardFormat;

  // D21 planning
  yield_tier?: YieldTier;
  danger_level?: DangerLevel;
  board_likelihood?: BoardLikelihood;
  source_strength?: SourceStrength;
  review_priority?: ReviewPriority;
  primary_system_id?: string | null;
  secondary_system_ids?: string[];
  bridge_reason?: string | null;

  // D20 retrieval metadata (1:1 sidecar in m003)
  cognitive_task: CognitiveTask;
  prompt_frame?: string | null;
  answer_form?: string | null;
  retrieval_direction?: RetrievalDirection | null;
  discriminator?: string | null;
  confusable_with?: string | null;
  requires_cloze_one_by_one?: boolean;
  cloze_grouping?: string | null;
  /** 0–1. NULL allowed. */
  format_confidence?: number | null;
  format_review_status?: FormatReviewStatus;
  format_review_note?: string | null;

  // D19 ontology tags. Must contain exactly one with tag_role='primary'.
  ontology_tags: ImportOntologyTag[];

  // Cluster placement: exactly one of these two MUST be set.
  cluster_id?: string;
  cluster_definition?: ImportClusterDefinition;
}

export interface ImportPayload {
  cards: ImportCard[];
  /** Free-text identifier for the producing pipeline (e.g., "kekki-bulk-v3"). */
  source_pipeline?: string;
  pipeline_version?: string;
  /** Stable client-supplied key for retry-safe imports; consumer enforces idempotency. */
  idempotency_key?: string;
}

// ---------- Normalized output (after defaults applied) ----------

export interface NormalizedOntologyTag {
  concept_id: string;
  tag_role: TagRole;
  granularity: Granularity;
  confidence: number;
  tag_source: TagSource;
  tagger_version: string | null;
}

export interface NormalizedClusterDefinition {
  name: string;
  description: string | null;
  visibility: 'private' | 'shared';
}

export interface NormalizedCard {
  prompt: string;
  answer: string;
  citation: string;
  citation_kind: string;
  difficulty: Difficulty;

  primary_lattice: PrimaryLattice;
  secondary_lattices: SecondaryLattice[];
  card_format: CardFormat;

  yield_tier: YieldTier;
  danger_level: DangerLevel;
  board_likelihood: BoardLikelihood;
  source_strength: SourceStrength;
  review_priority: ReviewPriority;
  primary_system_id: string | null;
  secondary_system_ids: string[];
  bridge_reason: string | null;

  cognitive_task: CognitiveTask;
  prompt_frame: string | null;
  answer_form: string | null;
  retrieval_direction: RetrievalDirection | null;
  discriminator: string | null;
  confusable_with: string | null;
  requires_cloze_one_by_one: boolean;
  cloze_grouping: string | null;
  format_confidence: number | null;
  format_review_status: FormatReviewStatus;
  format_review_note: string | null;

  ontology_tags: NormalizedOntologyTag[];
  cluster_id: string | null;
  cluster_definition: NormalizedClusterDefinition | null;
}

export interface NormalizedImportPayload {
  cards: NormalizedCard[];
  source_pipeline: string | null;
  pipeline_version: string | null;
  idempotency_key: string | null;
}

// ---------- Error reporting ----------

export interface ImportError {
  /** JSON pointer-style path, e.g. `['cards', 0, 'yield_tier']`. */
  path: ReadonlyArray<string | number>;
  /** Machine-readable code; stable identifiers callers can pattern-match on. */
  code:
    | 'NOT_OBJECT'
    | 'NOT_ARRAY'
    | 'EMPTY_ARRAY'
    | 'WRONG_TYPE'
    | 'MISSING_REQUIRED'
    | 'EMPTY_STRING'
    | 'INVALID_ENUM'
    | 'OUT_OF_RANGE'
    | 'INVALID_CLUSTER_PLACEMENT'
    | 'INVALID_PRIMARY_TAG_COUNT'
    | 'DUPLICATE_VALUE';
  message: string;
}

export type ValidationResult<T> =
  | { valid: true; payload: T }
  | { valid: false; errors: ImportError[] };

// ---------- Default values applied during normalization ----------

export const IMPORT_DEFAULTS = {
  citation_kind: 'other',
  yield_tier: 'medium' as YieldTier,
  danger_level: 'moderate' as DangerLevel,
  board_likelihood: 'medium' as BoardLikelihood,
  source_strength: 'narrative_review' as SourceStrength,
  review_priority: 'medium' as ReviewPriority,
  format_review_status: 'likely_ok' as FormatReviewStatus,
  cluster_visibility: 'private' as 'private' | 'shared',
  ontology_tag_confidence: 1.0,
  requires_cloze_one_by_one: false,
} as const;

// ---------- Helpers ----------

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

/** A field validator returns either a value or pushes errors and returns undefined. */
type Validator<T> = (
  value: unknown,
  path: ReadonlyArray<string | number>,
  errors: ImportError[],
) => T | undefined;

function requireString(
  obj: Record<string, unknown>,
  field: string,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): string | undefined {
  const value = obj[field];
  const path = [...parentPath, field];
  if (value === undefined || value === null) {
    errors.push({ path, code: 'MISSING_REQUIRED', message: `field "${field}" is required` });
    return undefined;
  }
  if (typeof value !== 'string') {
    errors.push({ path, code: 'WRONG_TYPE', message: `field "${field}" must be a string` });
    return undefined;
  }
  if (value.trim().length === 0) {
    errors.push({ path, code: 'EMPTY_STRING', message: `field "${field}" must be non-empty` });
    return undefined;
  }
  return value;
}

function optionalString(
  obj: Record<string, unknown>,
  field: string,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): string | null | undefined {
  const value = obj[field];
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== 'string') {
    errors.push({
      path: [...parentPath, field],
      code: 'WRONG_TYPE',
      message: `field "${field}" must be a string or null`,
    });
    return undefined;
  }
  return value;
}

function requireEnum<T extends string>(
  obj: Record<string, unknown>,
  field: string,
  guard: (v: unknown) => v is T,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): T | undefined {
  const value = obj[field];
  const path = [...parentPath, field];
  if (value === undefined || value === null) {
    errors.push({ path, code: 'MISSING_REQUIRED', message: `field "${field}" is required` });
    return undefined;
  }
  if (!guard(value)) {
    errors.push({
      path,
      code: 'INVALID_ENUM',
      message: `field "${field}" has invalid value ${JSON.stringify(value)}`,
    });
    return undefined;
  }
  return value;
}

function optionalEnum<T extends string>(
  obj: Record<string, unknown>,
  field: string,
  guard: (v: unknown) => v is T,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): T | null | undefined {
  const value = obj[field];
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (!guard(value)) {
    errors.push({
      path: [...parentPath, field],
      code: 'INVALID_ENUM',
      message: `field "${field}" has invalid value ${JSON.stringify(value)}`,
    });
    return undefined;
  }
  return value;
}

function optionalNumberInRange(
  obj: Record<string, unknown>,
  field: string,
  min: number,
  max: number,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): number | null | undefined {
  const value = obj[field];
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    errors.push({
      path: [...parentPath, field],
      code: 'WRONG_TYPE',
      message: `field "${field}" must be a finite number or null`,
    });
    return undefined;
  }
  if (value < min || value > max) {
    errors.push({
      path: [...parentPath, field],
      code: 'OUT_OF_RANGE',
      message: `field "${field}" must be between ${min} and ${max} (got ${value})`,
    });
    return undefined;
  }
  return value;
}

function optionalBoolean(
  obj: Record<string, unknown>,
  field: string,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): boolean | undefined {
  const value = obj[field];
  if (value === undefined) return undefined;
  if (typeof value !== 'boolean') {
    errors.push({
      path: [...parentPath, field],
      code: 'WRONG_TYPE',
      message: `field "${field}" must be a boolean`,
    });
    return undefined;
  }
  return value;
}

function optionalStringArray<T extends string>(
  obj: Record<string, unknown>,
  field: string,
  guard: ((v: unknown) => v is T) | null,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): T[] | undefined {
  const value = obj[field];
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    errors.push({
      path: [...parentPath, field],
      code: 'WRONG_TYPE',
      message: `field "${field}" must be an array`,
    });
    return undefined;
  }
  const result: T[] = [];
  let hadError = false;
  value.forEach((item, idx) => {
    if (typeof item !== 'string') {
      errors.push({
        path: [...parentPath, field, idx],
        code: 'WRONG_TYPE',
        message: `array element must be a string`,
      });
      hadError = true;
      return;
    }
    if (guard && !guard(item)) {
      errors.push({
        path: [...parentPath, field, idx],
        code: 'INVALID_ENUM',
        message: `array element ${JSON.stringify(item)} is not a valid value`,
      });
      hadError = true;
      return;
    }
    result.push((item as unknown) as T);
  });
  if (hadError) return undefined;
  return result;
}

// ---------- Sub-validators ----------

function validateOntologyTag(
  raw: unknown,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): NormalizedOntologyTag | undefined {
  if (!isPlainObject(raw)) {
    errors.push({
      path: parentPath,
      code: 'WRONG_TYPE',
      message: 'ontology tag must be an object',
    });
    return undefined;
  }
  const concept_id = requireString(raw, 'concept_id', parentPath, errors);
  const tag_role = requireEnum(raw, 'tag_role', isTagRole, parentPath, errors);
  const granularity = requireEnum(raw, 'granularity', isGranularity, parentPath, errors);
  const tag_source = requireEnum(raw, 'tag_source', isTagSource, parentPath, errors);
  const confidence = optionalNumberInRange(raw, 'confidence', 0, 1, parentPath, errors);
  const tagger_version_raw = optionalString(raw, 'tagger_version', parentPath, errors);

  if (!concept_id || !tag_role || !granularity || !tag_source) return undefined;

  return {
    concept_id,
    tag_role,
    granularity,
    confidence: confidence ?? IMPORT_DEFAULTS.ontology_tag_confidence,
    tag_source,
    tagger_version: tagger_version_raw ?? null,
  };
}

function validateClusterDefinition(
  raw: unknown,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): NormalizedClusterDefinition | undefined {
  if (!isPlainObject(raw)) {
    errors.push({
      path: parentPath,
      code: 'WRONG_TYPE',
      message: 'cluster_definition must be an object',
    });
    return undefined;
  }
  const name = requireString(raw, 'name', parentPath, errors);
  const description_raw = optionalString(raw, 'description', parentPath, errors);
  const visibility_raw = raw.visibility;
  let visibility: 'private' | 'shared' = IMPORT_DEFAULTS.cluster_visibility;
  if (visibility_raw !== undefined) {
    if (visibility_raw !== 'private' && visibility_raw !== 'shared') {
      errors.push({
        path: [...parentPath, 'visibility'],
        code: 'INVALID_ENUM',
        message: `visibility must be "private" or "shared" (got ${JSON.stringify(visibility_raw)})`,
      });
      return undefined;
    }
    visibility = visibility_raw;
  }

  if (!name) return undefined;

  return {
    name,
    description: description_raw ?? null,
    visibility,
  };
}

function validateCard(
  raw: unknown,
  parentPath: ReadonlyArray<string | number>,
  errors: ImportError[],
): NormalizedCard | undefined {
  if (!isPlainObject(raw)) {
    errors.push({ path: parentPath, code: 'WRONG_TYPE', message: 'card must be an object' });
    return undefined;
  }

  const prompt = requireString(raw, 'prompt', parentPath, errors);
  const answer = requireString(raw, 'answer', parentPath, errors);
  const citation = requireString(raw, 'citation', parentPath, errors);
  const citation_kind = optionalString(raw, 'citation_kind', parentPath, errors);
  const difficulty = requireEnum(raw, 'difficulty', isDifficulty, parentPath, errors);

  const primary_lattice = requireEnum(raw, 'primary_lattice', isPrimaryLattice, parentPath, errors);
  const secondary_lattices = optionalStringArray(
    raw,
    'secondary_lattices',
    isSecondaryLattice,
    parentPath,
    errors,
  );
  const card_format = requireEnum(raw, 'card_format', isCardFormat, parentPath, errors);

  const yield_tier = optionalEnum(raw, 'yield_tier', isYieldTier, parentPath, errors);
  const danger_level = optionalEnum(raw, 'danger_level', isDangerLevel, parentPath, errors);
  const board_likelihood = optionalEnum(raw, 'board_likelihood', isBoardLikelihood, parentPath, errors);
  const source_strength = optionalEnum(raw, 'source_strength', isSourceStrength, parentPath, errors);
  const review_priority = optionalEnum(raw, 'review_priority', isReviewPriority, parentPath, errors);
  const primary_system_id = optionalString(raw, 'primary_system_id', parentPath, errors);
  const secondary_system_ids = optionalStringArray(
    raw,
    'secondary_system_ids',
    null,
    parentPath,
    errors,
  );
  const bridge_reason = optionalString(raw, 'bridge_reason', parentPath, errors);

  const cognitive_task = requireEnum(raw, 'cognitive_task', isCognitiveTask, parentPath, errors);
  const prompt_frame = optionalString(raw, 'prompt_frame', parentPath, errors);
  const answer_form = optionalString(raw, 'answer_form', parentPath, errors);
  const retrieval_direction = optionalEnum(
    raw,
    'retrieval_direction',
    isRetrievalDirection,
    parentPath,
    errors,
  );
  const discriminator = optionalString(raw, 'discriminator', parentPath, errors);
  const confusable_with = optionalString(raw, 'confusable_with', parentPath, errors);
  const requires_cloze_one_by_one = optionalBoolean(raw, 'requires_cloze_one_by_one', parentPath, errors);
  const cloze_grouping = optionalString(raw, 'cloze_grouping', parentPath, errors);
  const format_confidence = optionalNumberInRange(raw, 'format_confidence', 0, 1, parentPath, errors);
  const format_review_status = optionalEnum(
    raw,
    'format_review_status',
    isFormatReviewStatus,
    parentPath,
    errors,
  );
  const format_review_note = optionalString(raw, 'format_review_note', parentPath, errors);

  // Ontology tags
  const ontology_tags_raw = raw.ontology_tags;
  let ontology_tags: NormalizedOntologyTag[] | undefined;
  if (ontology_tags_raw === undefined || ontology_tags_raw === null) {
    errors.push({
      path: [...parentPath, 'ontology_tags'],
      code: 'MISSING_REQUIRED',
      message: 'ontology_tags is required',
    });
  } else if (!Array.isArray(ontology_tags_raw)) {
    errors.push({
      path: [...parentPath, 'ontology_tags'],
      code: 'NOT_ARRAY',
      message: 'ontology_tags must be an array',
    });
  } else if (ontology_tags_raw.length === 0) {
    errors.push({
      path: [...parentPath, 'ontology_tags'],
      code: 'EMPTY_ARRAY',
      message: 'ontology_tags must contain at least one tag (and exactly one with tag_role="primary")',
    });
  } else {
    const validated: NormalizedOntologyTag[] = [];
    let hadError = false;
    ontology_tags_raw.forEach((tag, idx) => {
      const result = validateOntologyTag(tag, [...parentPath, 'ontology_tags', idx], errors);
      if (!result) hadError = true;
      else validated.push(result);
    });
    if (!hadError) {
      const primaryCount = validated.filter((t) => t.tag_role === 'primary').length;
      if (primaryCount !== 1) {
        errors.push({
          path: [...parentPath, 'ontology_tags'],
          code: 'INVALID_PRIMARY_TAG_COUNT',
          message: `exactly one ontology_tag must have tag_role="primary" (found ${primaryCount}); enforced by D19 partial unique index`,
        });
      } else {
        ontology_tags = validated;
      }
    }
  }

  // Cluster placement: exactly one of cluster_id / cluster_definition.
  const cluster_id_raw = raw.cluster_id;
  const cluster_definition_raw = raw.cluster_definition;
  const has_id = cluster_id_raw !== undefined && cluster_id_raw !== null;
  const has_def = cluster_definition_raw !== undefined && cluster_definition_raw !== null;
  let cluster_id: string | null = null;
  let cluster_definition: NormalizedClusterDefinition | null = null;
  if (!has_id && !has_def) {
    errors.push({
      path: parentPath,
      code: 'INVALID_CLUSTER_PLACEMENT',
      message:
        'card must specify either cluster_id (existing cluster) or cluster_definition (new cluster) — neither was provided',
    });
  } else if (has_id && has_def) {
    errors.push({
      path: parentPath,
      code: 'INVALID_CLUSTER_PLACEMENT',
      message: 'card must specify either cluster_id OR cluster_definition, not both',
    });
  } else if (has_id) {
    if (!isNonEmptyString(cluster_id_raw)) {
      errors.push({
        path: [...parentPath, 'cluster_id'],
        code: 'WRONG_TYPE',
        message: 'cluster_id must be a non-empty string',
      });
    } else {
      cluster_id = cluster_id_raw;
    }
  } else {
    cluster_definition = validateClusterDefinition(
      cluster_definition_raw,
      [...parentPath, 'cluster_definition'],
      errors,
    ) ?? null;
  }

  if (
    !prompt ||
    !answer ||
    !citation ||
    !difficulty ||
    !primary_lattice ||
    !card_format ||
    !cognitive_task ||
    !ontology_tags
  ) {
    return undefined;
  }

  return {
    prompt,
    answer,
    citation,
    citation_kind: citation_kind ?? IMPORT_DEFAULTS.citation_kind,
    difficulty,
    primary_lattice,
    secondary_lattices: secondary_lattices ?? [],
    card_format,
    yield_tier: yield_tier ?? IMPORT_DEFAULTS.yield_tier,
    danger_level: danger_level ?? IMPORT_DEFAULTS.danger_level,
    board_likelihood: board_likelihood ?? IMPORT_DEFAULTS.board_likelihood,
    source_strength: source_strength ?? IMPORT_DEFAULTS.source_strength,
    review_priority: review_priority ?? IMPORT_DEFAULTS.review_priority,
    primary_system_id: primary_system_id ?? null,
    secondary_system_ids: secondary_system_ids ?? [],
    bridge_reason: bridge_reason ?? null,
    cognitive_task,
    prompt_frame: prompt_frame ?? null,
    answer_form: answer_form ?? null,
    retrieval_direction: retrieval_direction ?? null,
    discriminator: discriminator ?? null,
    confusable_with: confusable_with ?? null,
    requires_cloze_one_by_one:
      requires_cloze_one_by_one ?? IMPORT_DEFAULTS.requires_cloze_one_by_one,
    cloze_grouping: cloze_grouping ?? null,
    format_confidence: format_confidence ?? null,
    format_review_status: format_review_status ?? IMPORT_DEFAULTS.format_review_status,
    format_review_note: format_review_note ?? null,
    ontology_tags,
    cluster_id,
    cluster_definition,
  };
}

// ---------- Top-level validator ----------

export function validateImportPayload(input: unknown): ValidationResult<NormalizedImportPayload> {
  const errors: ImportError[] = [];

  if (!isPlainObject(input)) {
    return {
      valid: false,
      errors: [
        {
          path: [],
          code: 'NOT_OBJECT',
          message: 'payload must be a JSON object with a "cards" array',
        },
      ],
    };
  }

  const cards_raw = input.cards;
  if (!Array.isArray(cards_raw)) {
    errors.push({
      path: ['cards'],
      code: 'NOT_ARRAY',
      message: 'payload.cards must be an array',
    });
    return { valid: false, errors };
  }
  if (cards_raw.length === 0) {
    errors.push({
      path: ['cards'],
      code: 'EMPTY_ARRAY',
      message: 'payload.cards must contain at least one card',
    });
    return { valid: false, errors };
  }

  const normalizedCards: NormalizedCard[] = [];
  cards_raw.forEach((card, idx) => {
    const result = validateCard(card, ['cards', idx], errors);
    if (result) normalizedCards.push(result);
  });

  // Optional envelope fields. Validate but do not abort on these.
  const source_pipeline = optionalString(input, 'source_pipeline', [], errors);
  const pipeline_version = optionalString(input, 'pipeline_version', [], errors);
  const idempotency_key = optionalString(input, 'idempotency_key', [], errors);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    payload: {
      cards: normalizedCards,
      source_pipeline: source_pipeline ?? null,
      pipeline_version: pipeline_version ?? null,
      idempotency_key: idempotency_key ?? null,
    },
  };
}
