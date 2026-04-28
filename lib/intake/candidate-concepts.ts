// Pre-filters the 970-row `concepts` table down to ~30–80 candidates
// the intake-parser LLM (`/prompts/intake.md` placeholder
// `{{candidate_concepts_json}}`) chooses from. Pure logic; the caller
// supplies the concepts array (in production: the `concepts` table
// from Supabase; in tests: a fixture or `abim_blueprint_v1.json`).
//
// Goals:
//   1. Always include all 18 systems as a coverage floor — the LLM
//      can default to system-level granularity if no topic matches.
//   2. Surface the most token-overlap-relevant topics and subsections.
//   3. Include their parent subsections so the LLM can pick the right
//      D17/D18 granularity (topic vs subsection vs system).
//   4. Stay under maxTotal (default 80) so the prompt fits cleanly.
//
// Detection bias: be inclusive. The LLM is the discriminator here —
// false-positive candidates cost a few tokens; missing the right
// candidate forces the LLM to omit a valid gap (D6 "never invent a
// concept slug"), which corrupts the planner downstream.

export type ConceptLevel = 'system' | 'subsection' | 'topic';

export interface ConceptRecord {
  /** Dot-delimited snake_case ID per D18, e.g. `cardiovascular_disease.myocardial_disease.hfpef`. */
  id: string;
  /** Human-readable title from the ABIM blueprint, e.g. "Heart Failure with Preserved Ejection Fraction". */
  title: string;
  level: ConceptLevel;
  /** Optional synonyms; current ABIM seed produces empty arrays. Used for token overlap. */
  synonyms: readonly string[];
}

/** Shape consumed by the intake-parser prompt's `{{candidate_concepts_json}}`. */
export interface FilteredCandidate {
  id: string;
  title: string;
  level: ConceptLevel;
  synonyms: readonly string[];
  /** Empty string for systems; "<System>" for subsections; "<System> > <Subsection>" for topics. */
  parent_path: string;
}

export interface FilterOptions {
  /** Max number of token-overlap matches to include (excluding the system floor). Default 30. */
  topN?: number;
  /** Hard cap on returned candidates. Default 80 (matches the prompt's stated budget). */
  maxTotal?: number;
  /** Minimum token-overlap count for a concept to qualify as a match. Default 1. */
  minOverlap?: number;
}

const DEFAULTS = { topN: 30, maxTotal: 80, minOverlap: 1 } as const;

// Generic English stopwords. Medical-specific vocabulary like "disease",
// "syndrome", "acute", "chronic", "primary" is intentionally NOT stopworded
// because the title text is medical and those tokens carry signal.
const STOP_WORDS: ReadonlySet<string> = new Set([
  'and', 'are', 'been', 'being', 'but', 'for', 'from', 'has', 'have', 'had',
  'into', 'its', 'onto', 'over', 'than', 'that', 'the', 'this', 'those',
  'these', 'too', 'was', 'were', 'will', 'with', 'within', 'without',
  // medical-narrative noise
  'patient', 'patients', 'questions', 'question', 'review', 'reviewed',
  'missed', 'mksap', 'uworld', 'amboss', 'pretest', 'nbme',
]);

const MIN_TOKEN_LENGTH = 3;
const LEVEL_RANK: Record<ConceptLevel, number> = { topic: 3, subsection: 2, system: 1 };

function tokenize(text: string): Set<string> {
  const out = new Set<string>();
  if (!text) return out;
  for (const raw of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < MIN_TOKEN_LENGTH) continue;
    if (STOP_WORDS.has(raw)) continue;
    if (/^\d+$/.test(raw)) continue;
    out.add(raw);
  }
  return out;
}

function deriveParentId(id: string): string | null {
  const lastDot = id.lastIndexOf('.');
  return lastDot === -1 ? null : id.substring(0, lastDot);
}

function buildParentPath(conceptId: string, byId: ReadonlyMap<string, ConceptRecord>): string {
  const segments: string[] = [];
  let cursor = deriveParentId(conceptId);
  while (cursor !== null) {
    const parent = byId.get(cursor);
    if (!parent) break;
    segments.unshift(parent.title);
    cursor = deriveParentId(cursor);
  }
  return segments.join(' > ');
}

function scoreConcept(inputTokens: ReadonlySet<string>, concept: ConceptRecord): number {
  if (inputTokens.size === 0) return 0;
  const conceptTokens = tokenize(concept.title);
  for (const synonym of concept.synonyms) {
    for (const tok of tokenize(synonym)) conceptTokens.add(tok);
  }
  let overlap = 0;
  for (const tok of inputTokens) {
    if (conceptTokens.has(tok)) overlap++;
  }
  return overlap;
}

/**
 * Filter a concepts list down to the LLM-injectable candidate set.
 *
 * Output ordering: returned candidates are sorted lexicographically by `id`
 * for deterministic prompts (helps cache hits and easier diffing in logs).
 */
export function filterCandidateConcepts(
  userInput: string,
  concepts: readonly ConceptRecord[],
  options: FilterOptions = {},
): readonly FilteredCandidate[] {
  const topN = options.topN ?? DEFAULTS.topN;
  const maxTotal = options.maxTotal ?? DEFAULTS.maxTotal;
  const minOverlap = options.minOverlap ?? DEFAULTS.minOverlap;

  const byId = new Map<string, ConceptRecord>();
  const systems: ConceptRecord[] = [];
  for (const c of concepts) {
    byId.set(c.id, c);
    if (c.level === 'system') systems.push(c);
  }

  // Score every concept; keep matches at or above the min-overlap threshold.
  const inputTokens = tokenize(userInput);
  const scored = concepts
    .map((concept) => ({ concept, score: scoreConcept(inputTokens, concept) }))
    .filter((s) => s.score >= minOverlap)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tie-break: prefer more specific levels — topic carries more planner signal than system.
      return LEVEL_RANK[b.concept.level] - LEVEL_RANK[a.concept.level];
    });

  const topMatches = scored.slice(0, topN).map((s) => s.concept);

  // Assemble the result set in priority order so the maxTotal cap drops the
  // least-important entries first.
  //
  // Tier 1 — all systems (always; coverage floor).
  // Tier 2 — top-N matches (in score order).
  // Tier 3 — direct parents of topic matches (subsections).
  //          Grandparents of topics are systems, already in Tier 1.
  const seen = new Set<string>();
  const accepted: ConceptRecord[] = [];

  for (const sys of systems) {
    if (accepted.length >= maxTotal) break;
    if (seen.has(sys.id)) continue;
    seen.add(sys.id);
    accepted.push(sys);
  }

  for (const match of topMatches) {
    if (accepted.length >= maxTotal) break;
    if (seen.has(match.id)) continue;
    seen.add(match.id);
    accepted.push(match);
  }

  for (const match of topMatches) {
    if (accepted.length >= maxTotal) break;
    if (match.level !== 'topic') continue;
    const parentId = deriveParentId(match.id);
    if (!parentId || seen.has(parentId)) continue;
    const parent = byId.get(parentId);
    if (!parent) continue;
    seen.add(parent.id);
    accepted.push(parent);
  }

  const result: FilteredCandidate[] = accepted.map((c) => ({
    id: c.id,
    title: c.title,
    level: c.level,
    synonyms: c.synonyms,
    parent_path: buildParentPath(c.id, byId),
  }));

  result.sort((a, b) => a.id.localeCompare(b.id));
  return result;
}

// Test-only re-exports. Useful for unit-testing the building blocks
// without smuggling them into the public API surface.
export const __testing = { tokenize, deriveParentId, buildParentPath, scoreConcept };
