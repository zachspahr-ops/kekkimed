-- Kekki — migration 005: competence layer (D22 zero-LLM pivot).
--
-- References:
--   - DECISIONS.md D22 (zero-LLM ontology-math study loop;
--     supersedes D6, D13, D14).
--   - DECISIONS.md D18 (ABIM concept ID scheme; subsection weights
--     populated by m002 seed via scripts/seed_ontology.mjs).
--   - DECISIONS.md D17/D19 (concept polyhierarchy + card_ontology_tags;
--     the math reads from these).
--
-- What this migration does:
--   1. Creates view topic_importance_v: per-topic importance derived from
--      its parent subsection's weight, distributed evenly across the
--      topics that share that subsection.
--   2. Creates table learner_topic_competence: per-user, per-topic
--      competence ∈ [0,1] with EMA semantics. RLS self-only.
--   3. Adds clusters.kind ∈ {manual,ephemeral_topic} and
--      clusters.source_topic_id (FK→concepts.id) so the deterministic
--      planner can mark its auto-generated topic clusters and a future
--      cleanup pass can identify them.
--
-- No data backfill required: subsection weights are already populated
-- (verified 2026-04-29: 230/230 subsections with weight 0.01–0.05).
--
-- Out of scope (deferred):
--   - Planner code that reads the view and writes the table → Phase 4
--     (post-D22) implementation in lib/competence/repo.ts.
--   - Intake code that seeds learner_topic_competence → Phase 3
--     (post-D22) in lib/intake/init-competence.ts.
--   - usage_events table cleanup (no new writes after D22) → future
--     migration; cheap to retain.

-- ============================================================================
-- 1. TOPIC_IMPORTANCE_V — derived per-topic importance (D22)
--
-- Each topic's importance = (parent subsection's weight) / (count of topics
-- sharing that parent subsection). This is "the topic's slice of the
-- subsection's exam attention."
--
-- The view is recomputed on each query — there's no materialization in V1.
-- 722 rows × small joins is fast enough; revisit if planner latency bites.
-- ============================================================================

create or replace view public.topic_importance_v as
select
  c.id              as topic_id,
  c.title           as topic_title,
  parent.id         as subsection_id,
  parent.title      as subsection_title,
  parent.weight     as subsection_weight,
  sibling_count.n   as topics_in_subsection,
  parent.weight / nullif(sibling_count.n, 0)::numeric as importance
from public.concepts c
join public.concept_parents cp
  on cp.child_id = c.id and cp.is_primary = true
join public.concepts parent
  on parent.id = cp.parent_id
join lateral (
  select count(*)::numeric as n
  from public.concept_parents cp2
  join public.concepts s on s.id = cp2.child_id
  where cp2.parent_id = parent.id
    and cp2.is_primary = true
    and s.level = 'topic'
) sibling_count on true
where c.level = 'topic' and parent.level = 'subsection';

comment on view public.topic_importance_v is
  'D22: per-topic importance derived from parent subsection weight, '
  'distributed evenly across child topics. Used by the deterministic '
  'planner: weakness = importance × (1 − competence). Recomputed on '
  'each query; not materialized in V1.';

-- ============================================================================
-- 2. LEARNER_TOPIC_COMPETENCE — per-user, per-topic competence (D22)
-- ============================================================================

create table public.learner_topic_competence (
  user_id        uuid not null references public.users(id) on delete cascade,
  concept_id     text not null references public.concepts(id) on delete restrict,
  score          numeric not null check (score >= 0 and score <= 1),
  samples        int not null default 0 check (samples >= 0),
  source         text not null
                   check (source in ('self_report','standardized','evaluator','review')),
  last_updated   timestamptz not null default now(),
  primary key (user_id, concept_id)
);

comment on table public.learner_topic_competence is
  'D22: per-user, per-topic competence in [0,1]. EMA-updated by Phase 4 '
  'review hook from reviews × card_ontology_tags. Initialized by Phase 3 '
  'intake (self_report / standardized / evaluator). One row per (user, '
  'topic-level concept_id). Topics are leaves of the ABIM hierarchy '
  '(D18); no rows for system or subsection concepts.';

comment on column public.learner_topic_competence.score is
  'Competence ∈ [0,1]. 0 = total miss, 1 = mastery. EMA over review '
  'outcomes: outcome=1 if rating=good && time_ms<90000, 0.5 if '
  'rating=good && time_ms>=90000, 0 if rating=again. α default 0.3 '
  'in lib/competence/score.ts.';

comment on column public.learner_topic_competence.samples is
  'Count of EMA updates that have folded into this score. Useful for '
  'cold-start checks (samples < 3 = low-confidence competence).';

comment on column public.learner_topic_competence.source is
  'Origin of the most recent update. self_report = 18-system slider intake; '
  'standardized = paste-a-score intake; evaluator = calibration session; '
  'review = ongoing review-loop EMA. The first three are intake init paths; '
  'review is the steady-state.';

-- Index for the planner hot path: "all of this user's competence rows."
-- The PK already covers (user_id, concept_id); a separate (user_id) prefix
-- index isn't needed — the PK serves it.

-- ============================================================================
-- 3. CLUSTERS — kind + source_topic_id for ephemeral planner clusters (D22)
-- ============================================================================

alter table public.clusters
  add column kind text not null default 'manual'
                check (kind in ('manual','ephemeral_topic')),
  add column source_topic_id text null
                references public.concepts(id) on delete restrict;

comment on column public.clusters.kind is
  'D22: cluster provenance. manual = human-curated (Phase 6 cluster '
  'editor or seed). ephemeral_topic = auto-generated by Phase 4 '
  'deterministic planner from a weak topic''s card_ontology_tags. '
  'Future cleanup pass may delete stale ephemeral_topic rows once the '
  'plan is complete.';

comment on column public.clusters.source_topic_id is
  'D22: when kind=ephemeral_topic, points to the topic-level concept '
  'that drove the cluster (the user''s weak topic). NULL for manual '
  'clusters. FK to concepts(id); restrict-on-delete because the '
  'ontology is curated and removing a concept that has clusters '
  'pointing at it is a content-management event, not silent deletion.';

-- ============================================================================
-- 4. ROW-LEVEL SECURITY — learner_topic_competence
--
-- Self-only: a user can read, insert, update, and delete their own
-- competence rows. Service role bypasses RLS by default.
-- ============================================================================

alter table public.learner_topic_competence enable row level security;

create policy learner_topic_competence_self_select
  on public.learner_topic_competence
  for select using (auth.uid() = user_id);

create policy learner_topic_competence_self_insert
  on public.learner_topic_competence
  for insert with check (auth.uid() = user_id);

create policy learner_topic_competence_self_update
  on public.learner_topic_competence
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy learner_topic_competence_self_delete
  on public.learner_topic_competence
  for delete using (auth.uid() = user_id);

-- ============================================================================
-- END
-- ============================================================================
