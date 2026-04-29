// D22 — pure math for the deterministic planner.
//
// Zero I/O, zero DB. Every function is referentially transparent so unit
// tests can run them without a Postgres in the loop. The DB layer in
// ./repo.ts wraps these and writes through to learner_topic_competence.

// ---------- constants ----------

/** EMA mixing rate. 0.3 = ~3 samples to materially shift competence. */
export const EMA_ALPHA_DEFAULT = 0.3;

/** Threshold for downgrading a "good" review to half credit (D17 / m003 comment). */
export const SLOW_THRESHOLD_MS = 90_000;

/** Outcome scalar for rating='good' AND time_ms < SLOW_THRESHOLD_MS. */
export const OUTCOME_FAST_GOOD = 1.0;

/** Outcome scalar for rating='good' AND time_ms >= SLOW_THRESHOLD_MS. */
export const OUTCOME_SLOW_GOOD = 0.5;

/** Outcome scalar for rating='again'. */
export const OUTCOME_AGAIN = 0.0;

// ---------- review outcome ----------

export type ReviewRating = 'again' | 'good';

/**
 * Map a (rating, time_ms) pair to an outcome scalar in {0, 0.5, 1}.
 * Used as the input to emaUpdate when folding a review into a topic's
 * competence.
 */
export function outcomeFromReview(rating: ReviewRating, timeMs: number): number {
  if (rating === 'again') return OUTCOME_AGAIN;
  if (timeMs >= SLOW_THRESHOLD_MS) return OUTCOME_SLOW_GOOD;
  return OUTCOME_FAST_GOOD;
}

// ---------- EMA ----------

/**
 * Exponential moving average update.
 *   new = alpha * outcome + (1 - alpha) * prev
 * Clamped to [0, 1].
 *
 * If `prev` is the same as the new sample, the result is the same value
 * (idempotent). If alpha=1, the new value is the outcome (no memory).
 * If alpha=0, prev is unchanged (frozen).
 */
export function emaUpdate(prev: number, outcome: number, alpha: number = EMA_ALPHA_DEFAULT): number {
  const next = alpha * outcome + (1 - alpha) * prev;
  return Math.max(0, Math.min(1, next));
}

// ---------- importance distribution ----------

/**
 * Distribute a subsection's exam-weight evenly across its child topics.
 * Returns 0 when topicCount is 0 (defensive — should never happen in
 * practice because every subsection in the ABIM blueprint has ≥1 topic).
 */
export function distributeSubsectionWeight(subWeight: number, topicCount: number): number {
  if (topicCount <= 0) return 0;
  return subWeight / topicCount;
}

// ---------- weakness ranking ----------

export type TopicForRanking = {
  topic_id: string;
  importance: number;
  competence: number;
  /**
   * Subsection-level concept_id (parent of the topic). Used for diversity
   * fallback when system-level diversity isn't achievable.
   */
  subsection_id: string;
  /**
   * System-level concept_id (grandparent of the topic). Primary diversity
   * dimension — the planner avoids picking 3 cardio topics if it can pick
   * cardio + nephro + endo instead.
   */
  system_id: string;
};

export type RankedTopic = TopicForRanking & {
  weakness: number;
};

/**
 * Compute weakness = importance × (1 − competence). Larger = weaker.
 */
export function weakness(t: Pick<TopicForRanking, 'importance' | 'competence'>): number {
  return t.importance * (1 - t.competence);
}

/**
 * Pick the top-K weakest topics with a diversity guard.
 *
 * Order:
 *   1. Sort all topics by weakness desc.
 *   2. Pick the weakest one as the first selection.
 *   3. For each subsequent slot, prefer the next-weakest topic whose
 *      system_id is different from every already-picked topic.
 *   4. If no system-different candidate exists, fall back to the next-
 *      weakest topic whose subsection_id is different from every
 *      already-picked subsection.
 *   5. If still nothing distinct, just take the next-weakest regardless
 *      (this is the degenerate case — a user with cards tagged to only
 *      one system and one subsection).
 *
 * Returns at most K results. Returns fewer if `topics` has fewer rows.
 *
 * Stable: ties on weakness are broken by the input order, then by
 * topic_id ascending for determinism.
 */
export function rankWeakTopics(topics: TopicForRanking[], k: number = 3): RankedTopic[] {
  if (topics.length === 0 || k <= 0) return [];

  // Compute weakness once and sort desc; tie-break by topic_id asc.
  const ranked: RankedTopic[] = topics
    .map((t) => ({ ...t, weakness: weakness(t) }))
    .sort((a, b) => {
      if (b.weakness !== a.weakness) return b.weakness - a.weakness;
      return a.topic_id < b.topic_id ? -1 : a.topic_id > b.topic_id ? 1 : 0;
    });

  const picks: RankedTopic[] = [];
  const usedSystems = new Set<string>();
  const usedSubsections = new Set<string>();
  const usedTopics = new Set<string>();

  // Phase 1: greedy pick with system-diversity preference.
  for (const candidate of ranked) {
    if (picks.length >= k) break;
    if (usedTopics.has(candidate.topic_id)) continue;
    if (picks.length === 0 || !usedSystems.has(candidate.system_id)) {
      picks.push(candidate);
      usedSystems.add(candidate.system_id);
      usedSubsections.add(candidate.subsection_id);
      usedTopics.add(candidate.topic_id);
    }
  }

  if (picks.length >= k) return picks;

  // Phase 2: fall back to subsection-diversity for remaining slots.
  for (const candidate of ranked) {
    if (picks.length >= k) break;
    if (usedTopics.has(candidate.topic_id)) continue;
    if (!usedSubsections.has(candidate.subsection_id)) {
      picks.push(candidate);
      usedSystems.add(candidate.system_id);
      usedSubsections.add(candidate.subsection_id);
      usedTopics.add(candidate.topic_id);
    }
  }

  if (picks.length >= k) return picks;

  // Phase 3: degenerate — fill remaining slots with next-weakest regardless.
  for (const candidate of ranked) {
    if (picks.length >= k) break;
    if (usedTopics.has(candidate.topic_id)) continue;
    picks.push(candidate);
    usedTopics.add(candidate.topic_id);
  }

  return picks;
}
