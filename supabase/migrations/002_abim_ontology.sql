-- Kekki — migration 002: ABIM blueprint ontology + card_ontology_tags.
--
-- References:
--   - abim_blueprint_v1.json: canonical seed file (ABIM IM CERT, January 2026).
--   - DECISIONS.md D17 (four-layer tagging) — Layer 1 is now ABIM-backed.
--   - DECISIONS.md D18 (ABIM concept ID scheme and seed rules).
--   - DECISIONS.md D19 (card_ontology_tags replaces concept_ids[]).
--
-- What this migration does:
--   1. Extends `concepts` to hold the ABIM blueprint hierarchy
--      (system / subsection / topic) plus version + provenance.
--   2. Adds `card_ontology_tags`: m:m table replacing cards.concept_ids[].
--      Carries tag_role, granularity, confidence, tag_source, tagger_version,
--      and review_status — everything the planner needs beyond "which topic."
--   3. Drops cards.concept_ids and its validator trigger; concept FK is now
--      enforced at the row level in card_ontology_tags (cleaner than the
--      array trigger approach in 001).
--
-- Out of scope (deferred):
--   - Lattice + cognitive_task + card_format expansion → migration 003.
--   - Yield/planning fields + card_discriminators graph → migration 004.

-- ============================================================================
-- 1. CONCEPTS — extend for ABIM hierarchy
-- ============================================================================

alter table public.concepts
  add column level            text not null default 'topic'
                                check (level in ('system','subsection','topic')),
  add column ontology_source  text not null default 'abim_blueprint',
  add column ontology_version text not null default 'jan_2026';

-- Default 'topic' on level is a safe placeholder so the ALTER applies
-- cleanly against any existing rows. The seed script overwrites with the
-- correct level per row. No production concept data exists yet
-- (seed was blocked pending this migration).

comment on column public.concepts.id is
  'Hierarchical dot-delimited snake_case slug. '
  'Examples: "cardiovascular_disease", '
  '"cardiovascular_disease.dysrhythmias_and_conduction_defects", '
  '"cardiovascular_disease.dysrhythmias_and_conduction_defects.atrial_fibrillation". '
  'Seeded from abim_blueprint_v1.json. Format updated in migration 002 '
  '(was kebab-case in 001).';

comment on column public.concepts.level is
  'ABIM blueprint depth: system (top), subsection (middle), topic (leaf). '
  'Drives card_ontology_tags.granularity for fast filtering.';

comment on column public.concepts.weight is
  'Systems and subsections: exam_percent as decimal (e.g., 0.14 = 14%; '
  '"<2%" stored as 0.01). Topics: NULL.';

comment on column public.concepts.ontology_source is
  'Which controlled vocabulary produced this row. Currently always '
  '"abim_blueprint". Future planning ontologies use a different value.';

comment on column public.concepts.ontology_version is
  'Blueprint edition. Currently always "jan_2026". Bump when a new '
  'ABIM blueprint is seeded.';

-- ============================================================================
-- 2. CARD_ONTOLOGY_TAGS — m:m cards <-> concepts with role + provenance
-- ============================================================================

create table public.card_ontology_tags (
  card_id         uuid not null references public.cards(id) on delete cascade,
  concept_id      text not null references public.concepts(id) on delete restrict,
  tag_role        text not null
                    check (tag_role in ('primary','secondary','bridge','planning_only')),
  granularity     text not null
                    check (granularity in ('system','subsection','topic')),
  confidence      numeric not null default 1.0
                    check (confidence >= 0 and confidence <= 1),
  tag_source      text not null
                    check (tag_source in ('canonical','script','manual_override','model','import')),
  tagger_version  text null,
  review_status   text not null default 'accepted'
                    check (review_status in ('accepted','needs_review','rejected')),
  created_at      timestamptz not null default now(),
  primary key (card_id, concept_id, tag_role)
);

-- Exactly one primary tag per card. Other roles can repeat across concepts.
create unique index card_ontology_tags_one_primary
  on public.card_ontology_tags (card_id) where tag_role = 'primary';

comment on table public.card_ontology_tags is
  'Cards-to-concepts m:m. Replaces cards.concept_ids[] (dropped in this '
  'migration). Roles: primary (canonical placement, exactly one per card), '
  'secondary (additional ABIM coverage), bridge (cross-system link, e.g., '
  'amyloidosis under both cardio and nephro), planning_only (planner '
  'vocabulary not used for content classification).';

comment on column public.card_ontology_tags.granularity is
  'Denormalized from concepts.level. Lets queries filter by depth '
  'without joining concepts.';

comment on column public.card_ontology_tags.confidence is
  'Tagger confidence 0.0–1.0. Human-authored = 1.0. LLM-produced carries '
  'the model''s self-reported value. Used by planner to weight uncertain tags.';

comment on column public.card_ontology_tags.tag_source is
  'Provenance: canonical = authored with the card; script = auto-tagger; '
  'manual_override = human edit post-auto-tag; model = LLM; '
  'import = bulk pipeline (POST /api/cards/import).';

comment on column public.card_ontology_tags.tagger_version is
  'Version of the script or model that produced this tag. Used to '
  'invalidate or re-tag when a tagger changes.';

-- ============================================================================
-- 3. CARDS — drop concept_ids array (now lives in card_ontology_tags)
-- ============================================================================

drop trigger if exists cards_concept_ids_check on public.cards;
drop function if exists public.cards_validate_concept_ids();

-- Drop the GIN index explicitly for clarity (would drop with the column anyway).
drop index if exists public.cards_concept_ids_gin;

alter table public.cards
  drop column concept_ids;

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

-- Planner hot path: "all cards with a primary tag on this concept."
create index card_ontology_tags_concept_role
  on public.card_ontology_tags (concept_id, tag_role);

-- Authoring QA: "all tags for this card at a given granularity."
create index card_ontology_tags_card_granularity
  on public.card_ontology_tags (card_id, granularity);

-- ============================================================================
-- 5. ROW-LEVEL SECURITY
-- ============================================================================

alter table public.card_ontology_tags enable row level security;

-- SELECT: derive from cards visibility (same rule as cards_select in 001).
create policy card_ontology_tags_select on public.card_ontology_tags
  for select using (
    exists (
      select 1 from public.cards c
      where c.id = card_ontology_tags.card_id
        and (c.status = 'reviewed' or c.author_user_id = auth.uid())
    )
  );

-- WRITE: card author only. Service role bypasses RLS by default.
create policy card_ontology_tags_author_write on public.card_ontology_tags
  for all using (
    exists (
      select 1 from public.cards c
      where c.id = card_ontology_tags.card_id
        and c.author_user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.cards c
      where c.id = card_ontology_tags.card_id
        and c.author_user_id = auth.uid()
    )
  );

-- ============================================================================
-- END
-- ============================================================================
