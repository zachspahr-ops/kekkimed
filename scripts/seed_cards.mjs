#!/usr/bin/env node
// scripts/seed_cards.mjs
//
// Phase 1 Step 6: seeds 3 clusters + 20 human-authored, reviewed cards.
// Idempotent: if the seed clusters already exist for this user, exits cleanly.
//
// Run:
//   node --env-file="C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local" scripts/seed_cards.mjs
//
// Requires: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const SEED_EMAIL = 'zachspahr@gmail.com';
const SEED_CLUSTER_NAMES = ['Heart Failure GDMT', 'Hyponatremia', 'DKA / HHS'];

// ─── helpers ─────────────────────────────────────────────────────────────────

function assert(condition, msg) {
  if (!condition) { console.error('FATAL:', msg); process.exit(1); }
}

async function ensureUser() {
  // Check public.users first (populated by trigger on auth signup).
  const { data: existing } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', SEED_EMAIL)
    .maybeSingle();

  if (existing) {
    console.log(`  Found existing user ${existing.id}`);
    return existing.id;
  }

  // Not in public.users — check auth.users via admin API.
  console.log('  No user in public.users, checking auth.users...');
  const { data: listData, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (listErr) throw new Error(`listUsers failed: ${listErr.message}`);

  const found = listData?.users?.find(u => u.email === SEED_EMAIL);
  if (found) {
    // auth.users row exists but trigger didn't fire — upsert the mirror row.
    console.log(`  Found auth user ${found.id}, upserting public.users...`);
    const { error } = await supabase
      .from('users')
      .upsert({ id: found.id, email: SEED_EMAIL }, { onConflict: 'id' });
    if (error) throw new Error(`users upsert failed: ${error.message}`);
    return found.id;
  }

  // Create via admin API (email_confirm:true = no invite email sent).
  console.log('  Creating auth user via admin API...');
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email: SEED_EMAIL,
    email_confirm: true,
  });
  if (createErr) throw new Error(`createUser failed: ${createErr.message}`);

  const userId = created.user.id;
  console.log(`  Created auth user ${userId}`);

  // Trigger should have inserted public.users; upsert as a safety net.
  const { error: upsertErr } = await supabase
    .from('users')
    .upsert({ id: userId, email: SEED_EMAIL }, { onConflict: 'id' });
  if (upsertErr) throw new Error(`users upsert failed: ${upsertErr.message}`);

  return userId;
}

// ─── cluster definitions ──────────────────────────────────────────────────────

function clusterDefs(userId) {
  return [
    {
      name: 'Heart Failure GDMT',
      description: 'Guideline-directed medical therapy for HFrEF and HFpEF — PARADIGM-HF, DAPA-HF, EMPEROR-Preserved, ICD criteria.',
      owner_user_id: userId,
      visibility: 'private',
    },
    {
      name: 'Hyponatremia',
      description: 'Workup algorithm, SIADH criteria, correction rate limits, hypertonic saline dosing, ODS risk.',
      owner_user_id: userId,
      visibility: 'private',
    },
    {
      name: 'DKA / HHS',
      description: 'DKA diagnostic criteria, fluids, insulin/potassium rule, resolution criteria, HHS contrast, euglycemic DKA.',
      owner_user_id: userId,
      visibility: 'private',
    },
  ];
}

// ─── card + metadata definitions ─────────────────────────────────────────────
//
// _cluster : 0-based index into clusterDefs array
// _primary_concept : concept.id (verified against live DB above)
//   granularity derived from ID depth: 2-part → subsection, 3-part → topic
// _retrieval : inserted into card_retrieval_metadata
//
// All cards: source='human', status='reviewed'
// The 24h cooldown trigger only fires on UPDATE of status, not INSERT,
// so inserting directly as 'reviewed' is safe for seed data.

function cardDefs(userId) {
  return [
    // ── Cluster 0: Heart Failure GDMT ─────────────────────────────────────
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease',
      prompt: 'What are the four drug classes that constitute GDMT for HFrEF (EF ≤40%)?',
      answer: 'Beta-blocker (carvedilol, metoprolol succinate, or bisoprolol), ACEi/ARB or ARNI (sacubitril–valsartan preferred over ACEi), MRA (spironolactone or eplerenone), and SGLT2 inhibitor (dapagliflozin or empagliflozin). All four classes carry class I mortality-reduction evidence.',
      citation: '2022 AHA/ACC/HFSA Heart Failure Guideline. JACC 2022;79(17):e263–421. doi:10.1016/j.jacc.2021.12.012',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['chronic'], qtypes: ['management'],
      primary_lattice: 'p_to_e', secondary_lattices: ['d_to_t'],
      card_format: 'management_triplet',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'condition_to_therapy_class',
        answer_form: 'enumerated_list',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: true, cloze_grouping: 'same_c1',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease',
      prompt: 'PARADIGM-HF: what was the relative risk reduction in the primary composite (CV death + HF hospitalization) for sacubitril–valsartan vs enalapril?',
      answer: '20% relative risk reduction (HR 0.80, 95% CI 0.73–0.87, p<0.001). Absolute event rates 21.8% vs 26.5% over 27 months. NNT ≈ 21 for primary composite. Also reduced all-cause mortality by 16%.',
      citation: 'McMurray JJV et al. PARADIGM-HF. NEJM 2014;371:993–1004. doi:10.1056/NEJMoa1409077',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'advanced', contexts: ['chronic'], qtypes: ['prognosis'],
      primary_lattice: 's_to_r', secondary_lattices: [],
      card_format: 'single_term_direct_cloze',
      _retrieval: {
        cognitive_task: 'superlative_rank',
        prompt_frame: 'trial_to_result',
        answer_form: 'numeric_with_units',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.90, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease',
      prompt: 'DAPA-HF: dapagliflozin reduced the composite of worsening HF or CV death in HFrEF by __% (HR ___). Was the benefit diabetes-dependent?',
      answer: '26% (HR 0.74, 95% CI 0.65–0.85, p<0.001). Benefit was consistent regardless of T2DM status (HR 0.75 with T2DM vs 0.73 without). NNT ≈ 21 over 18 months.',
      citation: 'McMurray JJV et al. DAPA-HF. NEJM 2019;381:1995–2008. doi:10.1056/NEJMoa1911303',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['chronic'], qtypes: ['management', 'prognosis'],
      primary_lattice: 'p_to_e', secondary_lattices: [],
      card_format: 'single_term_direct_cloze',
      _retrieval: {
        cognitive_task: 'test_lab_threshold',
        prompt_frame: 'trial_to_result',
        answer_form: 'numeric_with_units',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.90, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease',
      prompt: 'What are the two absolute contraindications to starting an MRA in HFrEF?',
      answer: 'eGFR <30 mL/min/1.73 m² OR serum potassium >5.0 mEq/L. Use with close monitoring if eGFR 30–49 or K 4.5–5.0. Recheck K and creatinine at 1 week and 4 weeks after initiation.',
      citation: '2022 AHA/ACC/HFSA Heart Failure Guideline. JACC 2022;79(17):e263–421.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['chronic'], qtypes: ['management'],
      primary_lattice: 'p_to_e', secondary_lattices: ['cx_to_avoid'],
      card_format: 'management_triplet',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'drug_to_contraindication',
        answer_form: 'enumerated_list',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.92, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease',
      prompt: 'What are the class I ICD criteria (EF, NYHA class, GDMT duration) in chronic HFrEF?',
      answer: 'EF ≤35% AND NYHA class II–III symptoms despite ≥3 months of optimized GDMT, with expected meaningful survival >1 year. (MADIT-II and SCD-HeFT: ~30–35% relative reduction in sudden cardiac death.)',
      citation: '2022 AHA/ACC/HFSA Heart Failure Guideline. JACC 2022;79(17):e263–421.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['chronic'], qtypes: ['management'],
      primary_lattice: 's_to_r', secondary_lattices: ['sev_to_act'],
      card_format: 'linked_cloze_threshold',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'criteria_to_intervention',
        answer_form: 'threshold_statement',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.93, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease.heart_failure_with_preserved_ejection_fraction_hfpef',
      prompt: 'EMPEROR-Preserved: empagliflozin reduced CV death/HF hospitalization in HFpEF (EF >40%) by __%. Was CV mortality alone significant?',
      answer: '21% reduction (HR 0.79, 95% CI 0.69–0.90). CV mortality alone was not significantly reduced — benefit was driven by reduction in HF hospitalizations (29%). First agent with class IIa evidence in HFpEF.',
      citation: 'Anker SD et al. EMPEROR-Preserved. NEJM 2021;385:1451–1461. doi:10.1056/NEJMoa2107038',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'advanced', contexts: ['chronic'], qtypes: ['prognosis', 'management'],
      primary_lattice: 'p_to_e', secondary_lattices: [],
      card_format: 'single_term_direct_cloze',
      _retrieval: {
        cognitive_task: 'test_lab_threshold',
        prompt_frame: 'trial_to_result',
        answer_form: 'numeric_with_units',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.90, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 0,
      _primary_concept: 'cardiovascular_disease.myocardial_disease',
      prompt: 'In HFrEF, which clinical state absolutely contraindicates beta-blocker initiation? What is the target resting HR with therapy?',
      answer: 'Acute decompensated HF contraindicates initiation — start only when euvolemic and compensated. Target resting HR <70 bpm on therapy. Hold if HR <50 or systolic BP <90 mmHg. Titrate up every 2 weeks as tolerated.',
      citation: '2022 AHA/ACC/HFSA Heart Failure Guideline. JACC 2022;79(17):e263–421.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'trap', contexts: ['acute', 'chronic'], qtypes: ['management'],
      primary_lattice: 'p_to_e', secondary_lattices: ['cx_to_avoid'],
      card_format: 'clue_diagnosis_contrast',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'drug_to_timing_and_contraindication',
        answer_form: 'rule_plus_exception',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.88, format_review_status: 'likely_ok',
      },
    },

    // ── Cluster 1: Hyponatremia ────────────────────────────────────────────
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'What is the first test to order when Na <135 mEq/L, and what does each result indicate?',
      answer: 'Serum osmolality. Hyperosmolar (>295 mOsm/kg): hyperglycemia/mannitol — not true hyponatremia. Isoosmolar (280–295): pseudohyponatremia from severe hyperlipidemia or hyperproteinemia. Hypoosmolar (<280): true hyponatremia — proceed to urine osmolality.',
      citation: 'Verbalis JG et al. Diagnosis, Evaluation, and Treatment of Hyponatremia. Am J Med 2013;126(10 Suppl 1):S1–42.',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute', 'chronic'], qtypes: ['diagnosis', 'interpretation'],
      primary_lattice: 't_to_m', secondary_lattices: [],
      card_format: 'clue_diagnosis_contrast',
      _retrieval: {
        cognitive_task: 'diagnosis_from_clues',
        prompt_frame: 'lab_to_workup_algorithm',
        answer_form: 'branching_rule',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'List the four essential diagnostic criteria for SIADH.',
      answer: '(1) Serum osmolality <280 mOsm/kg. (2) Urine osmolality >100 mOsm/kg (inappropriately concentrated). (3) Urine sodium >40 mEq/L on normal dietary sodium intake. (4) Clinical euvolemia. Requires: normal adrenal and thyroid function; no recent diuretic use.',
      citation: 'Verbalis JG et al. Am J Med 2013;126(10 Suppl 1):S1–42.',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute', 'chronic'], qtypes: ['diagnosis'],
      primary_lattice: 't_to_m', secondary_lattices: [],
      card_format: 'complete_set_same_cloze',
      _retrieval: {
        cognitive_task: 'multi_answer_list',
        prompt_frame: 'diagnosis_to_criteria',
        answer_form: 'enumerated_list',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: true, cloze_grouping: 'same_c1',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'A patient seizes with Na 112 mEq/L. What is the immediate treatment and the target acute sodium rise?',
      answer: '3% hypertonic saline 100 mL IV bolus over 10 minutes; repeat up to ×3 until seizures stop or Na rises 4–6 mEq/L acutely. Then limit total correction to ≤8–10 mEq/L in the first 24 hours to prevent osmotic demyelination syndrome.',
      citation: 'Spasovski G et al. European Clinical Practice Guidelines on Hyponatremia. Nephrol Dial Transplant 2014;29(Suppl 2):i1–39.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute'], qtypes: ['management'],
      primary_lattice: 'p_to_e', secondary_lattices: ['sev_to_act'],
      card_format: 'management_triplet',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'emergency_to_treatment_and_limit',
        answer_form: 'dose_plus_threshold',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'What is the maximum safe sodium correction per 24 hours to prevent ODS, and which patients need the stricter limit?',
      answer: '≤8–10 mEq/L per 24h (general limit). Stricter ≤8 mEq/L per 24h for high-risk patients: malnutrition, alcoholism, liver disease, or hypokalemia. If overcorrected: give DDAVP 2–4 mcg IV + D5W to actively re-lower sodium.',
      citation: 'Sterns RH. Disorders of Plasma Sodium. NEJM 2015;372:55–65. doi:10.1056/NEJMra1404489',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute'], qtypes: ['management'],
      primary_lattice: 's_to_r', secondary_lattices: ['sev_to_act'],
      card_format: 'linked_cloze_threshold',
      _retrieval: {
        cognitive_task: 'test_lab_threshold',
        prompt_frame: 'safety_limit_and_high_risk',
        answer_form: 'threshold_statement',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.93, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'In hypoosmolar hyponatremia, urine Na >40 mEq/L suggests ___; urine Na <20 mEq/L suggests ___.',
      answer: 'Urine Na >40: SIADH, adrenal insufficiency, or diuretic effect. Urine Na <20: hypovolemic hyponatremia (GI losses, hemorrhage) or effective circulatory depletion (CHF, cirrhosis, nephrotic syndrome with avid renal sodium reabsorption).',
      citation: 'Verbalis JG et al. Am J Med 2013;126(10 Suppl 1):S1–42.',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'advanced', contexts: ['acute', 'chronic'], qtypes: ['diagnosis', 'interpretation'],
      primary_lattice: 't_to_m', secondary_lattices: [],
      card_format: 'bidirectional_term',
      _retrieval: {
        cognitive_task: 'diagnosis_from_clues',
        prompt_frame: 'lab_value_to_diagnosis',
        answer_form: 'bidirectional_pair',
        retrieval_direction: 'bidirectional',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.92, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'Corrected sodium in hyperglycemia: for every 100 mg/dL glucose above normal, add ___ mEq/L (and ___ for severe hyperglycemia >400 mg/dL).',
      answer: '1.6 mEq/L (traditional Katz correction); 2.4 mEq/L for glucose >400 mg/dL (Hillier correction). Formula: corrected Na = measured Na + 1.6 × [(glucose − 100) / 100].',
      citation: 'Hillier TA et al. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med 1999;106(4):399–403.',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'advanced', contexts: ['acute'], qtypes: ['interpretation', 'mechanism'],
      primary_lattice: 't_to_m', secondary_lattices: [],
      card_format: 'single_term_direct_cloze',
      _retrieval: {
        cognitive_task: 'test_lab_threshold',
        prompt_frame: 'formula_recall',
        answer_form: 'numeric_formula',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.90, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 1,
      _primary_concept: 'nephrology_and_urology.water_and_electrolyte_balance.hyponatremia',
      prompt: 'In which hyponatremia subtypes are vaptans (tolvaptan, conivaptan) indicated, and in which are they contraindicated?',
      answer: 'Indicated: euvolemic (SIADH) or hypervolemic hyponatremia not responsive to fluid restriction. Contraindicated: hypovolemic hyponatremia (worsen volume depletion). Start inpatient only — monitor for overly rapid correction. Limit to ≤8–10 mEq/L/24h.',
      citation: 'Schrier RW et al. SALT-1 and SALT-2 trials. NEJM 2006;355:2099–2112.',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'advanced', contexts: ['acute', 'chronic'], qtypes: ['management'],
      primary_lattice: 'p_to_e', secondary_lattices: ['cx_to_avoid'],
      card_format: 'clue_diagnosis_contrast',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'drug_indication_vs_contraindication',
        answer_form: 'indication_and_contraindication',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.90, format_review_status: 'likely_ok',
      },
    },

    // ── Cluster 2: DKA / HHS ──────────────────────────────────────────────
    {
      _cluster: 2,
      _primary_concept: 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus',
      prompt: 'What are the three laboratory criteria that define DKA?',
      answer: '(1) Glucose >250 mg/dL (may be <250 in euglycemic DKA on SGLT2i). (2) Serum bicarbonate <18 mEq/L OR venous pH <7.3. (3) Positive serum or urine ketones. Severity: mild pH 7.25–7.30, moderate 7.0–7.25, severe <7.0.',
      citation: 'Kitabchi AE et al. ADA Consensus Statement on DKA/HHS Management. Diabetes Care 2009;32(7):1335–1343.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute'], qtypes: ['diagnosis'],
      primary_lattice: 't_to_m', secondary_lattices: [],
      card_format: 'complete_set_same_cloze',
      _retrieval: {
        cognitive_task: 'multi_answer_list',
        prompt_frame: 'diagnosis_to_criteria',
        answer_form: 'enumerated_list',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: true, cloze_grouping: 'same_c1',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 2,
      _primary_concept: 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus',
      prompt: 'In DKA, below what serum potassium should insulin NOT be started, and why?',
      answer: 'K <3.5 mEq/L. Insulin activates Na/K-ATPase, shifting K into cells — starting insulin with K <3.5 risks fatal hypokalemia. Replace K first; add 20–40 mEq K to each liter of IVF whenever K <5.5 mEq/L during treatment.',
      citation: 'Kitabchi AE et al. Diabetes Care 2009;32(7):1335–1343.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute'], qtypes: ['management', 'mechanism'],
      primary_lattice: 'p_to_e', secondary_lattices: ['cx_to_avoid'],
      card_format: 'linked_cloze_threshold',
      _retrieval: {
        cognitive_task: 'test_lab_threshold',
        prompt_frame: 'safety_threshold_for_intervention',
        answer_form: 'threshold_with_mechanism',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 2,
      _primary_concept: 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus',
      prompt: 'What is the first-line IV fluid for DKA and the initial rate? When do you add dextrose?',
      answer: '0.9% NaCl at 1–1.5 L/hr (15–20 mL/kg/hr) for the first hour. Then adjust: normal/low corrected Na → 0.9% NaCl; high corrected Na → 0.45% NaCl at 250–500 mL/hr. Add D5 to the bag when glucose reaches 200–250 mg/dL.',
      citation: 'Kitabchi AE et al. Diabetes Care 2009;32(7):1335–1343.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute'], qtypes: ['management'],
      primary_lattice: 'p_to_e', secondary_lattices: [],
      card_format: 'management_triplet',
      _retrieval: {
        cognitive_task: 'management_treatment',
        prompt_frame: 'emergency_to_fluid_selection',
        answer_form: 'drug_dose_and_trigger',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.93, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 2,
      _primary_concept: 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus',
      prompt: 'What are the three criteria for DKA resolution, and what must happen before stopping IV insulin?',
      answer: '(1) Glucose <200 mg/dL. (2) Serum bicarb ≥15 mEq/L. (3) Venous pH >7.3 (anion gap closed). Before stopping IV insulin: overlap with subcutaneous basal insulin by 1–2 hours to prevent rebound ketoacidosis.',
      citation: 'Kitabchi AE et al. Diabetes Care 2009;32(7):1335–1343.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'core', contexts: ['acute'], qtypes: ['management'],
      primary_lattice: 't_to_m', secondary_lattices: ['fu_to_next'],
      card_format: 'complete_set_same_cloze',
      _retrieval: {
        cognitive_task: 'multi_answer_list',
        prompt_frame: 'treatment_endpoint_criteria',
        answer_form: 'enumerated_list',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: true, cloze_grouping: 'same_c1',
        format_confidence: 0.95, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 2,
      _primary_concept: 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus',
      prompt: 'How does HHS differ from DKA on serum osmolality, glucose, and pH?',
      answer: 'HHS: effective Osm >320 mOsm/kg (often 340–380), glucose typically >600 mg/dL, pH usually >7.3 with minimal ketosis. DKA: Osm may be normal or mildly elevated, pH <7.3, significant ketonemia/ketonuria. Mixed DKA/HHS overlap exists in ~1/3 of cases.',
      citation: 'Kitabchi AE et al. Diabetes Care 2009;32(7):1335–1343.',
      citation_kind: 'guideline',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'advanced', contexts: ['acute'], qtypes: ['diagnosis'],
      primary_lattice: 't_to_m', secondary_lattices: [],
      card_format: 'clue_diagnosis_contrast',
      _retrieval: {
        cognitive_task: 'diagnosis_from_clues',
        prompt_frame: 'two_diagnoses_contrast',
        answer_form: 'comparative_rule',
        retrieval_direction: 'bidirectional',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.92, format_review_status: 'likely_ok',
      },
    },
    {
      _cluster: 2,
      _primary_concept: 'endocrinology_diabetes_and_metabolism.diabetes_mellitus.complications_of_diabetes_mellitus',
      prompt: 'Which drug class causes euglycemic DKA, and what glucose level should NOT be used to exclude the diagnosis?',
      answer: 'SGLT2 inhibitors (canagliflozin, dapagliflozin, empagliflozin). Do not exclude DKA when glucose <250 mg/dL — SGLT2i drive ketogenesis while urinary glucose loss keeps serum glucose near normal. Perioperative pearl: hold SGLT2i ≥3 days before elective surgery or prolonged fasting.',
      citation: 'Peters AL et al. Euglycemic DKA and SGLT2 inhibitors. Diabetes Care 2015;38(9):1687–1693. FDA Drug Safety Communication 2015.',
      citation_kind: 'primary_lit',
      source: 'human', author_user_id: userId, status: 'reviewed',
      difficulty: 'trap', contexts: ['acute'], qtypes: ['diagnosis', 'mechanism'],
      primary_lattice: 't_to_m', secondary_lattices: ['cx_to_avoid'],
      card_format: 'clue_diagnosis_contrast',
      _retrieval: {
        cognitive_task: 'mechanism_pathophys',
        prompt_frame: 'drug_to_unexpected_complication',
        answer_form: 'rule_exception',
        retrieval_direction: 'forward',
        requires_cloze_one_by_one: false, cloze_grouping: 'none',
        format_confidence: 0.93, format_review_status: 'likely_ok',
      },
    },
  ];
}

// ─── granularity helper ───────────────────────────────────────────────────────

function conceptGranularity(conceptId) {
  const depth = conceptId.split('.').length;
  if (depth === 1) return 'system';
  if (depth === 2) return 'subsection';
  return 'topic';
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== seed_cards.mjs ===');

  // 1. Ensure user exists.
  console.log('\n[1/5] Ensuring user...');
  const userId = await ensureUser();

  // 2. Idempotency check.
  console.log('\n[2/5] Checking for existing seed clusters...');
  const { data: existing, error: checkErr } = await supabase
    .from('clusters')
    .select('name')
    .eq('owner_user_id', userId)
    .in('name', SEED_CLUSTER_NAMES);
  if (checkErr) throw new Error(`cluster check failed: ${checkErr.message}`);

  if (existing && existing.length === SEED_CLUSTER_NAMES.length) {
    console.log('  All seed clusters already exist. Nothing to do.');
    return;
  }
  if (existing && existing.length > 0) {
    console.log(`  WARNING: ${existing.length}/${SEED_CLUSTER_NAMES.length} seed clusters exist but not all. Proceeding with full insert — duplicates will be created.`);
  }

  // 3. Insert clusters.
  console.log('\n[3/5] Inserting clusters...');
  const { data: clusters, error: clusterErr } = await supabase
    .from('clusters')
    .insert(clusterDefs(userId))
    .select('id, name');
  if (clusterErr) throw new Error(`cluster insert failed: ${clusterErr.message}`);
  assert(clusters.length === 3, `Expected 3 clusters, got ${clusters.length}`);
  for (const c of clusters) console.log(`  ${c.name} → ${c.id}`);

  const clusterIds = clusters.map(c => c.id);

  // 4. Insert cards + retrieval metadata + ontology tags + memberships.
  console.log('\n[4/5] Inserting cards...');
  const cards = cardDefs(userId);

  for (let i = 0; i < cards.length; i++) {
    const { _cluster, _primary_concept, _retrieval, ...cardRow } = cards[i];

    // 4a. Insert card.
    const { data: inserted, error: cardErr } = await supabase
      .from('cards')
      .insert(cardRow)
      .select('id')
      .single();
    if (cardErr) throw new Error(`card[${i}] insert failed: ${cardErr.message}\nCard: ${cardRow.prompt.slice(0, 60)}`);
    const cardId = inserted.id;

    // 4b. Insert retrieval metadata.
    const { error: rmErr } = await supabase
      .from('card_retrieval_metadata')
      .insert({ card_id: cardId, ..._retrieval });
    if (rmErr) throw new Error(`card[${i}] retrieval_metadata failed: ${rmErr.message}`);

    // 4c. Insert primary ontology tag.
    const { error: tagErr } = await supabase
      .from('card_ontology_tags')
      .insert({
        card_id: cardId,
        concept_id: _primary_concept,
        tag_role: 'primary',
        granularity: conceptGranularity(_primary_concept),
        confidence: 1.0,
        tag_source: 'canonical',
        review_status: 'accepted',
      });
    if (tagErr) throw new Error(`card[${i}] tag insert failed: ${tagErr.message}`);

    // 4d. Insert cluster membership.
    const { error: memErr } = await supabase
      .from('cluster_memberships')
      .insert({ cluster_id: clusterIds[_cluster], card_id: cardId, position: i });
    if (memErr) throw new Error(`card[${i}] membership failed: ${memErr.message}`);

    console.log(`  [${String(i + 1).padStart(2)}] ${cardRow.prompt.slice(0, 60)}...`);
  }

  // 5. Verify counts.
  console.log('\n[5/5] Verifying row counts...');
  const checks = [
    supabase.from('clusters').select('*', { count: 'exact', head: true }).eq('owner_user_id', userId),
    supabase.from('cards').select('*', { count: 'exact', head: true }).eq('author_user_id', userId),
    supabase.from('card_retrieval_metadata').select('*', { count: 'exact', head: true }),
    supabase.from('card_ontology_tags').select('*', { count: 'exact', head: true }).eq('tag_source', 'canonical'),
    supabase.from('cluster_memberships').select('*', { count: 'exact', head: true }),
  ];
  const results = await Promise.all(checks);
  const labels = ['clusters', 'cards', 'card_retrieval_metadata', 'card_ontology_tags', 'cluster_memberships'];
  for (let i = 0; i < results.length; i++) {
    const { count, error } = results[i];
    if (error) { console.warn(`  ${labels[i]}: count error — ${error.message}`); continue; }
    console.log(`  ${labels[i]}: ${count}`);
  }

  console.log('\n✓ Seed complete. Phase 1 Step 6 done.');
}

main().catch(err => {
  console.error('\nSeed failed:', err.message);
  process.exit(1);
});
