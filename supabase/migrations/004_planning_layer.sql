-- Kekki — migration 004: planning layer + card_discriminators graph.
--
-- References:
--   - DECISIONS.md D21 (planning enum lock — yield_tier, danger_level,
--     board_likelihood, source_strength, review_priority).
--   - DECISIONS.md D17 (polyhierarchical concept tagging — primary_system_id
--     denormalizes the system-level placement; polyhierarchy still lives
--     in card_ontology_tags).
--   - DECISIONS.md D19 (card_ontology_tags RLS posture — template for
--     card_discriminators).
--   - DECISIONS.md D20 (sister entry; card-teaching vocabulary in m003).
--   - flashcard_database_design.md §"Study-Plan Scoring Model" L393–406
--     (numeric scoring model that consumes these categoricals at query time).
--   - "Flash Card Generation PRACTICE_PATTERNS.md" §"Yield gate" (vocabulary
--     hint for yield_tier).
--
-- What this migration does:
--   1. Adds five planning enums to cards (yield_tier, danger_level,
--      board_likelihood, source_strength, review_priority) — all NOT NULL
--      with sensible defaults so the 20 existing seeded cards (Phase 1
--      step 6) take the default without backfill.
--   2. Adds cards.primary_system_id text NULL (FK → concepts.id),
--      cards.secondary_system_ids text[] NOT NULL DEFAULT '{}',
--      cards.bridge_reason text NULL.
--   3. Creates card_discriminators directed-graph table joining cards by
--      shared discriminator_key (the discriminator column lives on
--      card_retrieval_metadata from m003).
--
-- Safety note:
--   Existing cards take the default enum values. If those defaults are
--   wrong for a given card, the author edits via the authoring UI later.
--   secondary_system_ids has no row-level FK enforcement — concept IDs
--   in the array are validated at the app layer for now (parallel to the
--   pattern dropped in m002 when concept_ids[] was retired). Tighten via
--   trigger if drift becomes a problem.
--
-- Out of scope (deferred):
--   - Planner logic that consumes these fields → Phase 4.
--   - LLM-prompt updates to emit these enums → refresh in Phase 4 once
--     the planner exists.
--   - Backfill of meaningful (non-default) values for the 20 seeded
--     cards → manual authoring task, not a migration.
--   - sources.source_quality integer 1–5 (flashcard_database_design.md
--     L137) → separate future migration when the sources table lands;
--     reconcile via a view, not by changing this enum.
--   - Trigger validating cards.primary_system_id against the
--     card_ontology_tags primary tag → defer; revisit if drift bites.

-- ============================================================================
-- 1. CARDS — planning enums + system denormalization (D21)
-- ============================================================================

alter table public.cards
  add column yield_tier text not null default 'medium'
                check (yield_tier in ('high','medium','low')),
  add column danger_level text not null default 'moderate'
                check (danger_level in ('low','moderate','high','lethal')),
  add column board_likelihood text not null default 'medium'
                check (board_likelihood in ('high','medium','low')),
  add column source_strength text not null default 'narrative_review'
                check (source_strength in (
                  'society_guideline','primary_trial','systematic_review',
                  'narrative_review','expert_opinion'
                )),
  add column review_priority text not null default 'medium'
                check (review_priority in ('high','medium','low')),
  add column primary_system_id text null
                references public.concepts(id) on delete restrict,
  add column secondary_system_ids text[] not null default '{}',
  add column bridge_reason text null;

comment on column public.cards.yield_tier is
  'D21: how high-yield this card is for internal-medicine practice. '
  'high = common, frequently encountered, board-favored. medium = standard '
  'IM knowledge. low = niche but worth knowing. Distinct from '
  'board_likelihood: yield = should you know it; board_likelihood = will '
  'ABIM ask it.';

comment on column public.cards.danger_level is
  'D21: clinical risk if the gap goes unaddressed. low / moderate / high / '
  'lethal. lethal is a separate tier above high — used for must-not-miss '
  'clinical patterns (anaphylaxis, malignant hyperthermia, tamponade) that '
  'the planner needs to be able to trump on.';

comment on column public.cards.board_likelihood is
  'D21: ABIM-specific testing probability. high / medium / low. Same shape '
  'as yield_tier so the planner can multiply them at query time.';

comment on column public.cards.source_strength is
  'D21: strength of the underlying citation. society_guideline > primary_trial '
  '> systematic_review > narrative_review > expert_opinion. Categorical '
  '(not integer 1–5) because D6/D13 require constrained-enum LLM outputs and '
  'strings carry semantics the model already speaks. The future sources '
  'table (flashcard_database_design.md L120-139) keeps an integer source_quality '
  'for raw provenance; this column is the planner-facing rollup. Reconcile '
  'via a view, not by changing the enum.';

comment on column public.cards.review_priority is
  'D21: card-level intrinsic priority hint. high / medium / low. Lets the '
  'author override the yield × danger × board algebra for a specific card. '
  'Distinct from learner_card_state.priority_score (per-user computed from '
  'weakness × yield, flashcard_database_design.md L301). On probation per '
  'D21: if Phase 4 planner shows it adds nothing over yield × danger × '
  'board, drop via forward migration.';

comment on column public.cards.primary_system_id is
  'D21: denormalized system-level placement from card_ontology_tags (D19) '
  'for fast planner queries. NULLABLE because the 20 existing seed cards '
  'predate this migration and FK to concepts.id requires a real concept ID. '
  'Polyhierarchy (D17) still lives in card_ontology_tags — this column is '
  'a planner shortcut, not a replacement.';

comment on column public.cards.secondary_system_ids is
  'D21: additional system-level concept IDs the card secondarily touches. '
  'No row-level FK enforcement (parallel to the concept_ids[] validator '
  'trigger m002 dropped). Validate at the app layer; tighten via trigger '
  'if drift becomes a problem.';

comment on column public.cards.bridge_reason is
  'D21: human-readable rationale when secondary_system_ids crosses a system '
  'boundary (e.g., amyloidosis under cardiology with bridge_reason = '
  '"restrictive cardiomyopathy presentation"). NULL when not a bridge card.';

-- ============================================================================
-- 2. CARD_DISCRIMINATORS — directed-graph of confusable cards (D21)
--
-- Joins cards by a shared discriminator_key — the "why this, not that" point
-- recorded in card_retrieval_metadata.discriminator (m003). Planner can pull
-- contrast pairs/triples for confusable-cluster sessions.
-- ============================================================================

create table public.card_discriminators (
  source_card_id    uuid not null references public.cards(id) on delete cascade,
  target_card_id    uuid not null references public.cards(id) on delete cascade,
  discriminator_key text not null,
  created_at        timestamptz not null default now(),
  created_by        uuid null references public.users(id) on delete set null,
  primary key (source_card_id, target_card_id, discriminator_key),
  check (source_card_id <> target_card_id)
);

comment on table public.card_discriminators is
  'D21: directed-graph edges between cards that share a discriminator key. '
  'Edges are directed because the contrast may matter in one direction only '
  '(e.g., HFpEF → HFrEF is the typical board-relevant direction; reverse '
  'edges are added explicitly when needed). Joins via discriminator_key, '
  'which references the free-text discriminator column on '
  'card_retrieval_metadata (m003). Planner consumes this for confusable-'
  'cluster sessions.';

comment on column public.card_discriminators.source_card_id is
  'D21: the card whose discriminator the contrast is anchored on.';

comment on column public.card_discriminators.target_card_id is
  'D21: the card on the other side of the contrast.';

comment on column public.card_discriminators.discriminator_key is
  'D21: the shared "why this, not that" point. Free-text for now to match '
  'card_retrieval_metadata.discriminator (m003); promote to a relational '
  'lookup if drift becomes a problem.';

comment on column public.card_discriminators.created_by is
  'D21: user who recorded the edge. NULL allowed; set to NULL on user delete '
  'so edges survive account removal.';

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Planner hot path: "all edges out of this card" / "all edges into this card."
create index card_discriminators_source on public.card_discriminators (source_card_id);
create index card_discriminators_target on public.card_discriminators (target_card_id);

-- Planner: "all edges sharing this discriminator key."
create index card_discriminators_key on public.card_discriminators (discriminator_key);

-- ============================================================================
-- 4. ROW-LEVEL SECURITY
--
-- Mirrors card_ontology_tags (m002): SELECT requires both endpoints visible
-- to the caller; WRITE requires the caller to author at least one endpoint.
-- Service role bypasses by default.
-- ============================================================================

alter table public.card_discriminators enable row level security;

-- SELECT: both endpoints visible (each card is reviewed OR caller is author).
create policy card_discriminators_select on public.card_discriminators
  for select using (
    exists (
      select 1 from public.cards c
      where c.id = card_discriminators.source_card_id
        and (c.status = 'reviewed' or c.author_user_id = auth.uid())
    )
    and exists (
      select 1 from public.cards c
      where c.id = card_discriminators.target_card_id
        and (c.status = 'reviewed' or c.author_user_id = auth.uid())
    )
  );

-- WRITE: caller authors at least one endpoint. Service role bypasses RLS.
create policy card_discriminators_author_write on public.card_discriminators
  for all using (
    exists (
      select 1 from public.cards c
      where c.id in (card_discriminators.source_card_id, card_discriminators.target_card_id)
        and c.author_user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.cards c
      where c.id in (card_discriminators.source_card_id, card_discriminators.target_card_id)
        and c.author_user_id = auth.uid()
    )
  );

-- ============================================================================
-- END
-- ============================================================================
