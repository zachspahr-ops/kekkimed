// Layer 1 of the two-layer intake stem-rejection (D14, CLAUDE.md "Intake parser").
//
// Runs server-side BEFORE the LLM is called. If the input matches any
// proprietary-qbank-stem signature, return early — no tokens spent, no
// input forwarded to the model. Layer 2 lives in /prompts/intake.md as
// an LLM-side constraint that catches paraphrased stems Layer 1 misses.
//
// Detection bias: prefer false negatives over false positives. A user
// describing weaknesses in plain English ("I missed several MKSAP DKA
// questions") must NOT be rejected. Triggers require structural signals
// (multiple lettered choices, explicit answer markers, qbank
// rationale formats) — a single mention of "MKSAP" or one isolated
// "(A)" does not.

export type StemRejectionResult =
  | { rejected: false }
  | { rejected: true; reason: string; matched_pattern: string };

type PatternRule = {
  /** Short stable identifier for telemetry / debugging. Stable across versions. */
  name: string;
  /** Regex matched against the trimmed input. Must use the `g`/`m` flags appropriately. */
  pattern: RegExp;
  /** User-facing rejection reason. Plain English; surfaced to the UI. */
  reason: string;
};

// Each rule describes one structural signature the heuristic looks for.
// Order matters only for which `matched_pattern` is reported when multiple
// fire — the rejection itself is binary.
const RULES: readonly PatternRule[] = [
  {
    // Three or more lettered choices on separate lines, each followed by text.
    // Catches `A) ... B) ... C) ...`, `A. ... B. ... C. ...`, `(A) ... (B) ... (C) ...`.
    // Three is the minimum for a real multiple-choice vignette; two is too
    // common in legitimate prose ("option A vs option B").
    name: 'lettered_choice_block',
    pattern:
      /(?:^|\n)\s*\(?[A-E]\)?[\.\)]\s+\S.*(?:\n|$)[\s\S]*?(?:^|\n)\s*\(?[A-E]\)?[\.\)]\s+\S.*(?:\n|$)[\s\S]*?(?:^|\n)\s*\(?[A-E]\)?[\.\)]\s+\S.*/m,
    reason:
      'Input looks like a multiple-choice question stem (three or more lettered answer choices). Paste your own notes or analytics, not the question itself.',
  },
  {
    // Explicit answer-key phrasing. Catches "the correct answer is", "correct answer:".
    name: 'correct_answer_marker',
    pattern: /\b(?:the\s+)?correct\s+answer\s+is\b|\bcorrect\s+answer\s*:/i,
    reason:
      'Input contains an explicit "correct answer" marker, which is characteristic of proprietary question explanations.',
  },
  {
    // UWorld and similar qbanks structure rationales under "Educational Objective:".
    name: 'educational_objective',
    pattern: /\beducational\s+objective\s*:/i,
    reason:
      'Input contains an "Educational Objective" section, which is a proprietary qbank rationale signature.',
  },
  {
    // MKSAP and similar use "Key Point:" as a recurring rationale header.
    // Single occurrence is OK in user notes; require two or more to fire.
    name: 'repeated_key_point_header',
    pattern: /\bkey\s+point\s*:[\s\S]+?\bkey\s+point\s*:/i,
    reason:
      'Input contains multiple "Key Point:" headers, which is characteristic of proprietary qbank rationale formatting.',
  },
  {
    // "This patient most likely has X" combined with a lettered list elsewhere
    // is a strong qbank-stem signal. The lettered-block rule already catches
    // most of these; this rule is the safety net for paraphrased prompts that
    // dropped the choices.
    name: 'patient_vignette_with_likely_diagnosis_question',
    pattern:
      /\bwhich\s+of\s+the\s+following\s+(?:is\s+(?:the\s+)?(?:most\s+likely|best)|would\s+most\s+likely)\b/i,
    reason:
      'Input contains a "Which of the following …" question stem, which is characteristic of multiple-choice question content.',
  },
  {
    // Item / Question numbering at the start of a block — qbank export pattern.
    // Standalone use ("Question 5 was about hyponatremia") is fine; the rule
    // requires the colon-prefixed prose form a qbank export uses.
    name: 'qbank_item_header',
    pattern: /(?:^|\n)\s*(?:item|question)\s+\d+\s*(?:of\s+\d+)?\s*[:\-]\s+\S/i,
    reason:
      'Input begins with an "Item N:" or "Question N:" header, which is characteristic of qbank exports.',
  },
];

/**
 * Layer 1 heuristic precheck for proprietary qbank stems.
 *
 * The server calls this BEFORE invoking the LLM. On rejection, return the
 * `reason` to the user verbatim and skip the LLM round-trip entirely
 * (D14: "no tokens spent, no input stored").
 *
 * On a non-match, the input is still subject to Layer 2 (the LLM's own
 * refusal in `/prompts/intake.md`). Pass-through here is not approval —
 * it just means the cheap heuristic did not see a structural signature.
 */
export function checkForQbankStem(input: string): StemRejectionResult {
  const trimmed = input.trim();
  if (trimmed.length === 0) return { rejected: false };

  for (const rule of RULES) {
    if (rule.pattern.test(trimmed)) {
      return {
        rejected: true,
        reason: rule.reason,
        matched_pattern: rule.name,
      };
    }
  }

  return { rejected: false };
}

/**
 * Exported for telemetry / observability — lets the server log which rule
 * fired without needing to re-check. Stable across versions because rule
 * names are part of the contract.
 */
export const QBANK_STEM_RULE_NAMES: readonly string[] = RULES.map((r) => r.name);
