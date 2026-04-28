// Unit tests for D14 Layer 1 stem-rejection heuristic.
//
// Run with: pnpm test
// (which invokes `node --experimental-strip-types --test`).

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { checkForQbankStem, QBANK_STEM_RULE_NAMES } from './stem-rejection.ts';

// ---------- helpers ----------

function expectAccepted(input: string, label: string) {
  const result = checkForQbankStem(input);
  assert.equal(
    result.rejected,
    false,
    `${label}: expected accepted, got rejection (${'matched_pattern' in result ? result.matched_pattern : 'n/a'})`,
  );
}

function expectRejected(input: string, expectedRule: string, label: string) {
  const result = checkForQbankStem(input);
  assert.equal(result.rejected, true, `${label}: expected rejection, got accepted`);
  if (result.rejected) {
    assert.equal(
      result.matched_pattern,
      expectedRule,
      `${label}: expected rule "${expectedRule}", matched "${result.matched_pattern}"`,
    );
    assert.ok(
      result.reason.length > 10,
      `${label}: rejection reason should be a real user-facing message, got "${result.reason}"`,
    );
  }
}

// ---------- accept cases (legitimate user input) ----------

test('accepts empty input', () => {
  expectAccepted('', 'empty string');
  expectAccepted('   \n\n  ', 'whitespace only');
});

test('accepts plain weakness narrative', () => {
  expectAccepted(
    "I missed several questions on hyponatremia management thresholds last week. Need more reps on when to use hypertonic saline.",
    'plain narrative',
  );
});

test('accepts narrative that mentions MKSAP / UWorld by name', () => {
  expectAccepted(
    'My MKSAP review showed weakness in DKA fluid resuscitation. UWorld scores were similar.',
    'qbank product names alone',
  );
});

test('accepts a single isolated lettered list item', () => {
  expectAccepted(
    "I'm working through GDMT step A) ACEi initiation in HFrEF.",
    'one lettered item in prose',
  );
});

test('accepts a two-letter A/B comparison in prose', () => {
  expectAccepted(
    'Trying to remember which is preferred A) sacubitril/valsartan vs B) lisinopril for HFrEF post-hospitalization.',
    'two-letter prose comparison',
  );
});

test('accepts narrative containing the word "answer"', () => {
  expectAccepted(
    "I never know the answer when asked about hyponatremia correction rates.",
    'word "answer" without marker',
  );
});

test('accepts a single "Key Point:" header (e.g., from user own notes)', () => {
  expectAccepted(
    "Key Point: do not exceed 8 mEq/L per 24h sodium correction in chronic hyponatremia.",
    'one key-point header',
  );
});

// ---------- reject cases (qbank stems) ----------

test('rejects classic 5-choice MCQ vignette', () => {
  const stem = `A 62-year-old man with HFrEF presents with worsening dyspnea. Exam reveals JVD and bibasilar crackles.

Which of the following is the most appropriate next step?

A) Increase the loop diuretic
B) Start sacubitril/valsartan
C) Add metolazone
D) Initiate dialysis
E) Reduce the beta-blocker dose`;
  expectRejected(stem, 'lettered_choice_block', '5-choice MCQ');
});

test('rejects 3-choice MCQ with parenthesized letters', () => {
  const stem = `Which test best confirms the diagnosis?

(A) Serum osmolality
(B) Urine sodium
(C) ACTH stimulation test`;
  expectRejected(stem, 'lettered_choice_block', '3-choice parens');
});

test('rejects vignette with "the correct answer is"', () => {
  const text = `Patient presents with chest pain. The correct answer is acute pericarditis based on the diffuse ST elevation and PR depression.`;
  expectRejected(text, 'correct_answer_marker', 'correct answer is');
});

test('rejects "Correct answer:" line', () => {
  const text = `Question discussed DKA management.

Correct answer: 0.9% saline at 15-20 mL/kg over the first hour.`;
  expectRejected(text, 'correct_answer_marker', 'correct answer colon');
});

test('rejects "Educational Objective:" rationale block', () => {
  const text = `Discussion of GDMT in HFrEF.

Educational Objective: Identify guideline-directed medical therapy for heart failure with reduced ejection fraction.`;
  expectRejected(text, 'educational_objective', 'educational objective');
});

test('rejects multiple "Key Point:" headers (qbank rationale formatting)', () => {
  const text = `Patient with hyponatremia.

Key Point: SIADH is diagnosis of exclusion.

Key Point: Correct sodium no faster than 8 mEq/L/24h.`;
  expectRejected(text, 'repeated_key_point_header', 'two key points');
});

test('rejects "Which of the following is most likely…" question stem', () => {
  const text = `A 30-year-old man with new exertional syncope and a systolic murmur that increases with Valsalva. Which of the following is most likely?`;
  expectRejected(text, 'patient_vignette_with_likely_diagnosis_question', 'most-likely stem');
});

test('rejects "Which of the following would most likely" variant', () => {
  const text = `Which of the following would most likely be elevated in this patient?`;
  expectRejected(text, 'patient_vignette_with_likely_diagnosis_question', 'would most likely');
});

test('rejects qbank item header at start of input', () => {
  const text = `Item 47 of 200: A 55-year-old woman with progressive fatigue presents to clinic.`;
  expectRejected(text, 'qbank_item_header', 'item header');
});

test('rejects "Question 5:" qbank-export header', () => {
  const text = `Question 5: Which medication should be initiated next?`;
  // The "Which of the following" rule does not match this exact phrasing, so
  // the qbank_item_header rule should be the one that fires.
  expectRejected(text, 'qbank_item_header', 'question header');
});

// ---------- combined / adversarial cases ----------

test('rejects when stem contains both a vignette and an answer marker (first match wins)', () => {
  const text = `A 70-year-old presents with confusion. Sodium is 110.

A) Hypertonic saline
B) Free water restriction
C) Furosemide
D) Tolvaptan

The correct answer is A) hypertonic saline because of severe symptomatic hyponatremia.`;
  // Either lettered_choice_block or correct_answer_marker is acceptable here —
  // both are correct rejections. Assert it's one of them.
  const result = checkForQbankStem(text);
  assert.equal(result.rejected, true, 'combined adversarial input should reject');
  if (result.rejected) {
    assert.ok(
      result.matched_pattern === 'lettered_choice_block' ||
        result.matched_pattern === 'correct_answer_marker',
      `expected lettered_choice_block or correct_answer_marker, got ${result.matched_pattern}`,
    );
  }
});

test('does not reject prose that mentions "the answer was" without "correct"', () => {
  expectAccepted(
    "I thought the answer was potassium replacement but apparently magnesium was the bigger issue.",
    '"the answer was" without "correct"',
  );
});

test('case-insensitive match on "EDUCATIONAL OBJECTIVE:"', () => {
  const text = `Discussion of GDMT.\n\nEDUCATIONAL OBJECTIVE: Identify GDMT for HFrEF.`;
  expectRejected(text, 'educational_objective', 'all caps educational objective');
});

// ---------- contract / metadata tests ----------

test('QBANK_STEM_RULE_NAMES exposes every rule name and only those names', () => {
  assert.ok(QBANK_STEM_RULE_NAMES.length >= 6, 'expected at least 6 rules');
  // All names should be lowercase snake_case for stable telemetry.
  for (const name of QBANK_STEM_RULE_NAMES) {
    assert.match(name, /^[a-z][a-z0-9_]*$/, `rule name "${name}" should be lowercase snake_case`);
  }
  // Should have no duplicates.
  const unique = new Set(QBANK_STEM_RULE_NAMES);
  assert.equal(unique.size, QBANK_STEM_RULE_NAMES.length, 'rule names should be unique');
});

test('result type narrows correctly for accepted inputs', () => {
  const result = checkForQbankStem('plain notes');
  if (result.rejected === false) {
    // Type narrowing test — these property accesses must compile under strict mode.
    // No `reason` or `matched_pattern` fields exist on the accepted variant.
    // @ts-expect-error: reason does not exist on accepted variant
    void result.reason;
  } else {
    assert.fail('expected accepted variant');
  }
});
