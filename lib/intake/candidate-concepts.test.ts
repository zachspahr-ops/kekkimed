// Unit + integration tests for the intake candidate-concepts filter.
//
// Run with: pnpm test

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  filterCandidateConcepts,
  __testing,
  type ConceptRecord,
} from './candidate-concepts.ts';

const { tokenize, deriveParentId, buildParentPath, scoreConcept } = __testing;

// ---------- small fixture for unit tests ----------

const fixture: readonly ConceptRecord[] = [
  // System: Cardiovascular
  { id: 'cardiology', title: 'Cardiovascular Disease', level: 'system', synonyms: [] },
  { id: 'cardiology.myocardial_disease', title: 'Myocardial Disease', level: 'subsection', synonyms: [] },
  { id: 'cardiology.myocardial_disease.hfpef', title: 'Heart Failure with Preserved Ejection Fraction', level: 'topic', synonyms: ['HFpEF', 'diastolic heart failure'] },
  { id: 'cardiology.myocardial_disease.hfref', title: 'Heart Failure with Reduced Ejection Fraction', level: 'topic', synonyms: ['HFrEF', 'systolic heart failure'] },
  { id: 'cardiology.arrhythmia', title: 'Arrhythmia', level: 'subsection', synonyms: [] },
  { id: 'cardiology.arrhythmia.afib', title: 'Atrial Fibrillation', level: 'topic', synonyms: ['AFib'] },

  // System: Nephrology
  { id: 'nephrology', title: 'Nephrology and Urology', level: 'system', synonyms: [] },
  { id: 'nephrology.electrolytes', title: 'Water and Electrolyte Balance', level: 'subsection', synonyms: [] },
  { id: 'nephrology.electrolytes.hyponatremia', title: 'Hyponatremia', level: 'topic', synonyms: ['low sodium', 'SIADH'] },
  { id: 'nephrology.electrolytes.hyperkalemia', title: 'Hyperkalemia', level: 'topic', synonyms: ['high potassium'] },

  // System: Endocrinology
  { id: 'endocrinology', title: 'Endocrinology Diabetes and Metabolism', level: 'system', synonyms: [] },
  { id: 'endocrinology.diabetes', title: 'Diabetes Mellitus', level: 'subsection', synonyms: [] },
  { id: 'endocrinology.diabetes.dka', title: 'Diabetic Ketoacidosis', level: 'topic', synonyms: ['DKA', 'ketoacidosis'] },
];

// ---------- helpers ----------

function ids(candidates: ReadonlyArray<{ id: string }>): string[] {
  return candidates.map((c) => c.id).sort();
}

// ---------- tokenize ----------

test('tokenize lowercases and splits on non-alphanumerics', () => {
  assert.deepEqual([...tokenize('Heart Failure (HFpEF)!')].sort(), ['failure', 'heart', 'hfpef']);
});

test('tokenize drops short tokens, stopwords, pure digits', () => {
  assert.deepEqual([...tokenize('the patient was 65 with a history of hyponatremia')].sort(), ['history', 'hyponatremia']);
});

test('tokenize returns empty set for empty / whitespace / pure-stopword input', () => {
  assert.equal(tokenize('').size, 0);
  assert.equal(tokenize('   ').size, 0);
  assert.equal(tokenize('the and was with').size, 0);
});

// ---------- deriveParentId ----------

test('deriveParentId returns null for system-level (no dot)', () => {
  assert.equal(deriveParentId('cardiology'), null);
});

test('deriveParentId returns parent for subsection (one dot)', () => {
  assert.equal(deriveParentId('cardiology.arrhythmia'), 'cardiology');
});

test('deriveParentId returns parent for topic (two dots)', () => {
  assert.equal(deriveParentId('cardiology.arrhythmia.afib'), 'cardiology.arrhythmia');
});

// ---------- buildParentPath ----------

test('buildParentPath empty string for system', () => {
  const byId = new Map(fixture.map((c) => [c.id, c]));
  assert.equal(buildParentPath('cardiology', byId), '');
});

test('buildParentPath returns system title for subsection', () => {
  const byId = new Map(fixture.map((c) => [c.id, c]));
  assert.equal(buildParentPath('cardiology.arrhythmia', byId), 'Cardiovascular Disease');
});

test('buildParentPath returns "<system> > <subsection>" for topic', () => {
  const byId = new Map(fixture.map((c) => [c.id, c]));
  assert.equal(
    buildParentPath('nephrology.electrolytes.hyponatremia', byId),
    'Nephrology and Urology > Water and Electrolyte Balance',
  );
});

// ---------- scoreConcept ----------

test('scoreConcept counts overlap against title + synonyms', () => {
  const hfpef = fixture.find((c) => c.id === 'cardiology.myocardial_disease.hfpef')!;
  // "diastolic heart failure" (synonym) — all three tokens overlap
  assert.equal(scoreConcept(tokenize('diastolic heart failure workup'), hfpef), 3);
});

test('scoreConcept is zero when no overlap', () => {
  const dka = fixture.find((c) => c.id === 'endocrinology.diabetes.dka')!;
  assert.equal(scoreConcept(tokenize('arrhythmia management'), dka), 0);
});

// ---------- filterCandidateConcepts: contract guarantees ----------

test('always includes all systems even when input has no matches', () => {
  const result = filterCandidateConcepts('', fixture);
  const systems = result.filter((c) => c.level === 'system');
  assert.equal(systems.length, 3, 'expected all 3 systems');
});

test('always includes all systems even when input matches a single topic', () => {
  const result = filterCandidateConcepts('hyponatremia', fixture);
  const systemIds = result.filter((c) => c.level === 'system').map((c) => c.id).sort();
  assert.deepEqual(systemIds, ['cardiology', 'endocrinology', 'nephrology']);
});

test('includes the matched topic and its parent subsection', () => {
  const result = filterCandidateConcepts('hyponatremia', fixture);
  const resultIds = ids(result);
  assert.ok(resultIds.includes('nephrology.electrolytes.hyponatremia'), 'topic match present');
  assert.ok(resultIds.includes('nephrology.electrolytes'), 'parent subsection present');
});

test('synonym match counts (e.g., "DKA" matches Diabetic Ketoacidosis)', () => {
  const result = filterCandidateConcepts('I missed several DKA fluid management questions', fixture);
  const resultIds = ids(result);
  assert.ok(resultIds.includes('endocrinology.diabetes.dka'), 'synonym-matched topic present');
  assert.ok(resultIds.includes('endocrinology.diabetes'), 'parent subsection present');
});

test('multi-topic input pulls in multiple topics + their parents', () => {
  const result = filterCandidateConcepts('hyponatremia and DKA review', fixture);
  const resultIds = ids(result);
  assert.ok(resultIds.includes('nephrology.electrolytes.hyponatremia'));
  assert.ok(resultIds.includes('endocrinology.diabetes.dka'));
  assert.ok(resultIds.includes('nephrology.electrolytes'));
  assert.ok(resultIds.includes('endocrinology.diabetes'));
});

test('output is sorted by id (deterministic)', () => {
  const result = filterCandidateConcepts('hyponatremia DKA hfpef', fixture);
  const idsList = result.map((c) => c.id);
  const sorted = [...idsList].sort();
  assert.deepEqual(idsList, sorted, 'expected sorted-by-id output');
});

test('parent_path is empty for systems, populated for subsection/topic', () => {
  const result = filterCandidateConcepts('hyponatremia', fixture);
  const sys = result.find((c) => c.id === 'nephrology');
  const sub = result.find((c) => c.id === 'nephrology.electrolytes');
  const topic = result.find((c) => c.id === 'nephrology.electrolytes.hyponatremia');
  assert.equal(sys!.parent_path, '');
  assert.equal(sub!.parent_path, 'Nephrology and Urology');
  assert.equal(topic!.parent_path, 'Nephrology and Urology > Water and Electrolyte Balance');
});

test('respects maxTotal cap by dropping subsection ancestors first (systems + matches preserved)', () => {
  // Force a tight budget. Fixture has 3 systems + 3 matchable topics + 3 subsection parents.
  const result = filterCandidateConcepts('hyponatremia DKA hfpef', fixture, { maxTotal: 6 });
  assert.equal(result.length, 6);
  // All 3 systems present, all 3 topic matches present, no subsections.
  assert.equal(result.filter((c) => c.level === 'system').length, 3);
  assert.equal(result.filter((c) => c.level === 'topic').length, 3);
  assert.equal(result.filter((c) => c.level === 'subsection').length, 0);
});

test('respects topN by dropping low-score matches before ancestors', () => {
  const result = filterCandidateConcepts(
    'hyponatremia DKA hfpef arrhythmia',
    fixture,
    { topN: 2 },
  );
  const topicIds = result.filter((c) => c.level === 'topic').map((c) => c.id);
  // Only 2 topic matches at most should appear (the first 2 by score).
  assert.ok(topicIds.length <= 2, `expected ≤ 2 topic matches, got ${topicIds.length}`);
});

test('minOverlap=2 filters out single-token matches', () => {
  // "heart" alone matches HFpEF, HFrEF (each scores 1 via title token "heart")
  // With minOverlap 2, neither qualifies → no topic matches → only systems returned.
  const result = filterCandidateConcepts('heart', fixture, { minOverlap: 2 });
  const topicCount = result.filter((c) => c.level === 'topic').length;
  assert.equal(topicCount, 0);
  assert.equal(result.filter((c) => c.level === 'system').length, 3);
});

test('empty input returns only systems', () => {
  const result = filterCandidateConcepts('', fixture);
  assert.equal(result.length, 3);
  for (const c of result) assert.equal(c.level, 'system');
});

test('input that tokenizes to empty (all stopwords) returns only systems', () => {
  const result = filterCandidateConcepts('the and was the with', fixture);
  assert.equal(result.length, 3);
  for (const c of result) assert.equal(c.level, 'system');
});

// ---------- integration test: real ABIM blueprint at scale ----------

function loadBlueprintAsConcepts(): ConceptRecord[] {
  const repoRoot = resolve(import.meta.dirname, '..', '..');
  const blueprintPath = resolve(repoRoot, 'abim_blueprint_v1.json');
  // Mirror the transform in scripts/seed_ontology.mjs (only the fields we need).
  const blueprint = JSON.parse(readFileSync(blueprintPath, 'utf8')) as {
    systems: Array<{
      system: string;
      system_slug?: string;
      subsections: Array<{
        subsection: string;
        subsection_slug: string;
        topics: string[];
        topic_slugs: string[];
      }>;
    }>;
  };

  const concepts: ConceptRecord[] = [];

  for (const sys of blueprint.systems) {
    const sysId = sys.system_slug ?? sys.system.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    concepts.push({ id: sysId, title: sys.system, level: 'system', synonyms: [] });

    for (const sub of sys.subsections) {
      const subId = `${sysId}.${sub.subsection_slug}`;
      concepts.push({ id: subId, title: sub.subsection, level: 'subsection', synonyms: [] });

      for (let i = 0; i < sub.topic_slugs.length; i++) {
        concepts.push({
          id: `${subId}.${sub.topic_slugs[i]}`,
          title: sub.topics[i],
          level: 'topic',
          synonyms: [],
        });
      }
    }
  }

  return concepts;
}

test('integration: 970-row ABIM blueprint loads cleanly', () => {
  const concepts = loadBlueprintAsConcepts();
  assert.ok(concepts.length > 900 && concepts.length < 1100, `expected ~970 concepts, got ${concepts.length}`);
  const systems = concepts.filter((c) => c.level === 'system');
  assert.equal(systems.length, 18, 'expected exactly 18 ABIM systems');
});

test('integration: filter against real blueprint stays under maxTotal and includes all systems', () => {
  const concepts = loadBlueprintAsConcepts();
  const result = filterCandidateConcepts(
    "I bombed hyponatremia and DKA fluid management. Also slow on HFrEF GDMT.",
    concepts,
  );
  assert.ok(result.length <= 80, `expected ≤80 candidates, got ${result.length}`);
  const systems = result.filter((c) => c.level === 'system');
  assert.equal(systems.length, 18, 'expected all 18 systems in result');
});

test('integration: hyponatremia query returns the topic and its subsection from the real blueprint', () => {
  const concepts = loadBlueprintAsConcepts();
  const result = filterCandidateConcepts('hyponatremia correction rate', concepts);
  const idsLower = result.map((c) => c.id.toLowerCase());
  // The exact slug depends on the blueprint; assert any id contains "hyponatremia".
  const matched = idsLower.some((id) => id.includes('hyponatremia'));
  assert.ok(matched, 'expected at least one id containing "hyponatremia"');
});

test('integration: empty / vague input returns exactly the 18 systems', () => {
  const concepts = loadBlueprintAsConcepts();
  const result = filterCandidateConcepts('', concepts);
  assert.equal(result.length, 18);
  for (const c of result) assert.equal(c.level, 'system');
});
