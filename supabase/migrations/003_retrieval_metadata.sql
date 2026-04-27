-- Kekki — migration 003: retrieval metadata layer.
--
-- References:
--   - DECISIONS.md D20 (card metadata enum lock — lattice / cognitive_task /
--     card_format / cloze, plus the format_review_status amendment landed
--     in the same PR as this migration).
--   - flashcard_database_design.md §5 (card_retrieval_metadata canonical shape).
--   - "Flash Card Generation PRACTICE_PATTERNS.md" §"The 9 Default Review Formats".
--
-- What this migration does:
--   1. Adds cards.primary_lattice (4-value enum, NOT NULL) — the primary
--      clinical relation the card teaches.
--   2. Adds cards.secondary_lattices (subset of 7 values, array) — additional
--      relations the card secondarily exercises.
--   3. Widens cards.card_format from 4 → 9 values (the full lattice-bible
--      menu). Drops the prior default ('basic') because it isn't in the
--      new enum and every authoring path supplies a format explicitly.
--   4. Creates card_retrieval_metadata (1:1 with cards): cognitive_task,
--      prompt_frame, answer_form, retrieval_direction, discriminator,
--      confusable_with, requires_cloze_one_by_one, cloze_grouping,
--      format_confidence, format_review_status, format_review_note.
--
-- Safety note:
--   primary_lattice is added NOT NULL with no default. This succeeds because
--   public.cards has zero rows at the time of this migration (Phase 1 step 6
--   has not yet seeded any cards). If that ever changes — e.g., this
--   migration is re-applied to a database that already has card data —
--   the ALTER will fail and require a backfill step.
--
-- Out of scope (deferred):
--   - Planning fields (yield_tier, danger_level, board_likelihood,
--     source_strength, review_priority, primary_system_id,
--     secondary_system_ids[], bridge_reason) and the card_discriminators
--     graph table → migration 004. Deferred 2026-04-26: enum values for
--     the planning fields are not defined in the reference docs or
--     DECISIONS.md. Revisit before Phase 4 (plan generator) needs them.

-- ============================================================================
-- 1. CARDS — primary_lattice + secondary_lattices (D20 lattice codes)
-- ============================================================================

alter table public.cards
  add column primary_lattice text not null
                check (primary_lattice in ('t_to_m','p_to_e','e_to_o','s_to_r')),
  add column secondary_lattices text[] not null default '{}'
                check (
                  secondary_lattices <@ array[
                    'd_to_t','tst_to_int','sev_to_act','tx_to_mon',
                    'cx_to_avoid','dx_to_diff','fu_to_next'
                  ]::text[]
                );

comment on column public.cards.primary_lattice is
  'D20: primary clinical relation the card teaches. Exactly one per card. '
  't_to_m = trigger/clue → mechanism or diagnosis. '
  'p_to_e = presentation → empiric regimen or initial treatment. '
  'e_to_o = exposure/history/context → organism or etiology. '
  's_to_r = patient state/severity → risk, complication, or prognostic implication.';

comment on column public.cards.secondary_lattices is
  'D20: additional clinical relations the card secondarily exercises. '
  'Subset of {d_to_t, tst_to_int, sev_to_act, tx_to_mon, cx_to_avoid, '
  'dx_to_diff, fu_to_next}. Zero or more per card; default is empty array.';

-- ============================================================================
-- 2. CARDS — widen card_format from 4 → 9 values (D20)
-- ============================================================================

-- Drop the default ('basic') because it isn't in the new enum and every
-- authoring path (manual, AI, import) supplies card_format explicitly.
alter table public.cards alter column card_format drop default;

-- Drop and re-add the CHECK with the full 9-value lattice-bible menu.
-- Constraint name 'cards_card_format_check' is the Postgres default for the
-- inline CHECK declared in migration 001 (pattern: <table>_<column>_check).
alter table public.cards drop constraint cards_card_format_check;
alter table public.cards add constraint cards_card_format_check
  check (card_format in (
    'single_term_direct_cloze',
    'bidirectional_term',
    'clue_diagnosis_contrast',
    'eponym',
    'linked_cloze_threshold',
    'management_triplet',
    'pairing_matrix',
    'complete_set_same_cloze',
    'image_first_recognition'
  ));

comment on column public.cards.card_format is
  'D20: review format from the lattice-bible 9-format menu. See '
  '"Flash Card Generation PRACTICE_PATTERNS.md" §"The 9 Default Review Formats" '
  'for when to use each. Authoring paths must supply this explicitly; no '
  'default since migration 003.';

-- ============================================================================
-- 3. CARD_RETRIEVAL_METADATA — 1:1 with cards
--
-- Reference shape: flashcard_database_design.md §5. Captures how the card
-- should be studied (cognitive task, prompt structure, retrieval direction,
-- discriminator, format-review state) so the planner can target weak
-- retrieval moves, not just weak topics.
-- ============================================================================

create table public.card_retrieval_metadata (
  card_id                   uuid primary key
                              references public.cards(id) on delete cascade,
  cognitive_task            text not null
                              check (cognitive_task in (
                                'diagnosis_from_clues',
                                'management_treatment',
                                'test_lab_threshold',
                                'mechanism_pathophys',
                                'association_risk',
                                'classic_feature_pattern',
                                'multi_answer_list',
                                'term_alias_definition',
                                'eponym',
                                'superlative_rank',
                                'compressed_factoid_other'
                              )),
  prompt_frame              text null,
  answer_form               text null,
  retrieval_direction       text null
                              check (retrieval_direction is null or retrieval_direction in (
                                'forward','reverse','bidirectional',
                                'matrix_forward','matrix_reverse'
                              )),
  discriminator             text null,
  confusable_with           text null,
  requires_cloze_one_by_one boolean not null default false,
  cloze_grouping            text null,
  format_confidence         numeric null
                              check (format_confidence is null
                                     or (format_confidence >= 0 and format_confidence <= 1)),
  format_review_status      text not null default 'likely_ok'
                              check (format_review_status in (
                                'likely_ok','revise_format','manual_review','approved'
                              )),
  format_review_note        text null,
  created_at                timestamptz not null default now()
);

comment on table public.card_retrieval_metadata is
  '1:1 retrieval metadata for cards (D20). Captures the cognitive operation '
  'the card trains, the format choice, and the discriminator/contrast '
  'metadata the planner uses to pick "weak format in this domain" sessions. '
  'Canonical shape: flashcard_database_design.md §5.';

comment on column public.card_retrieval_metadata.cognitive_task is
  'D20-locked enum of 11 values. The kind of clinical operation the card '
  'tests (diagnosis_from_clues, management_treatment, test_lab_threshold, '
  'mechanism_pathophys, association_risk, classic_feature_pattern, '
  'multi_answer_list, term_alias_definition, eponym, superlative_rank, '
  'compressed_factoid_other).';

comment on column public.card_retrieval_metadata.prompt_frame is
  'Free-text label for the prompt structure (e.g., "clue", "management", '
  '"threshold", "contrast"). Not enumerated; tightened later if drift '
  'becomes a problem.';

comment on column public.card_retrieval_metadata.answer_form is
  'Free-text label for the answer shape (e.g., "drug", "disease", '
  '"organism", "number", "list", "paired association"). Not enumerated.';

comment on column public.card_retrieval_metadata.retrieval_direction is
  'Direction of retrieval the card supports. forward = front→back; '
  'reverse = back→front; bidirectional = both directions clinically useful; '
  'matrix_forward / matrix_reverse for pairing-matrix cards (D20 card_format '
  '"pairing_matrix"). NULL until the authoring path declares it.';

comment on column public.card_retrieval_metadata.discriminator is
  'D20: the key "why this, not that" point that distinguishes this card from '
  'plausible mimics. Lives on the back of clue_diagnosis_contrast cards and '
  'as a pointer for the future card_discriminators graph (migration 004).';

comment on column public.card_retrieval_metadata.confusable_with is
  'Free-text list of plausible mimics for this card. Free-text for now; '
  'a relational table of confusables may be introduced if the planner '
  'starts driving sessions off this column.';

comment on column public.card_retrieval_metadata.requires_cloze_one_by_one is
  'D20: true for cards using same-card c1 deletions designed for Cloze One '
  'By One / Hide All behavior. Default false so single-cloze and Basic-style '
  'cards do not have to opt out.';

comment on column public.card_retrieval_metadata.cloze_grouping is
  'D20: short tag describing how clozes are grouped on the card. Free text '
  'for now (e.g., "same_c1", "separate", "none"); locked to enum if drift '
  'becomes a problem.';

comment on column public.card_retrieval_metadata.format_confidence is
  'Tagger confidence 0–1 in the chosen card_format. NULL when unknown. '
  'Used by the planner to weight format-mismatch penalties.';

comment on column public.card_retrieval_metadata.format_review_status is
  'D20 amendment 2026-04-26: quality-of-format-choice review state. '
  'likely_ok = automated tagger thinks the format fits. revise_format = '
  'tagger flagged for re-tag. manual_review = needs human eye. approved = '
  'human signed off. Distinct from card_ontology_tags.review_status, which '
  'covers tag acceptance, not format quality.';

comment on column public.card_retrieval_metadata.format_review_note is
  'Free-text rationale for the format choice or the review flag. Populated '
  'by tagger or human reviewer.';

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

-- Planner hot path: "all cards exercising this cognitive task."
create index card_retrieval_metadata_cognitive_task
  on public.card_retrieval_metadata (cognitive_task);

-- Planner: "all cards that secondarily touch this lattice."
create index cards_secondary_lattices_gin
  on public.cards using gin (secondary_lattices);

-- ============================================================================
-- 5. ROW-LEVEL SECURITY
--
-- Same posture as card_ontology_tags (migration 002): SELECT derives from
-- cards visibility; WRITE restricted to card author. Service role bypasses.
-- ============================================================================

alter table public.card_retrieval_metadata enable row level security;

create policy card_retrieval_metadata_select on public.card_retrieval_metadata
  for select using (
    exists (
      select 1 from public.cards c
      where c.id = card_retrieval_metadata.card_id
        and (c.status = 'reviewed' or c.author_user_id = auth.uid())
    )
  );

create policy card_retrieval_metadata_author_write on public.card_retrieval_metadata
  for all using (
    exists (
      select 1 from public.cards c
      where c.id = card_retrieval_metadata.card_id
        and c.author_user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.cards c
      where c.id = card_retrieval_metadata.card_id
        and c.author_user_id = auth.uid()
    )
  );

-- ============================================================================
-- END
-- ============================================================================
