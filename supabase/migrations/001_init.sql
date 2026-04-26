-- Kekki — initial schema migration.
--
-- Source of truth: phase1_schema_plan.md (approved 2026-04-26).
-- Decisions encoded: D5, D7, D9, D13, D14, D15, D16, D17.
--
-- Sections:
--   1. Tables (in FK-dependency order)
--   2. Indexes
--   3. Trigger functions
--   4. Triggers
--   5. RLS — enable + policies
--
-- All public tables. All user-data tables get RLS. Service role bypasses RLS by default.

-- ============================================================================
-- 1. TABLES
-- ============================================================================

-- 1.1 users — mirrors auth.users; adds Kekki profile fields.
create table public.users (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  timezone   text not null default 'UTC',  -- IANA TZ; D13 local-day rate limit
  created_at timestamptz not null default now()
);

comment on table  public.users          is 'Mirror of auth.users with Kekki profile. Synced via trigger on auth.users insert/update.';
comment on column public.users.timezone is 'IANA timezone name (e.g., America/New_York). Used for D13 ai_card local-day rate limit.';

-- 1.2 concepts — controlled vocabulary (D5, D17 layer 1).
create table public.concepts (
  id         text primary key,                    -- kebab-case slug
  title      text not null,
  synonyms   text[] not null default '{}',
  weight     numeric null,                        -- optional planner weighting
  created_at timestamptz not null default now()
);

comment on table public.concepts is 'Layer 1 of D17 four-layer tagging. Seeded from kekki_concepts_v1.json. LLM prompts must return ids from this table or null.';

-- 1.3 concept_parents — polyhierarchy (D17).
create table public.concept_parents (
  child_id   text not null references public.concepts(id) on delete cascade,
  parent_id  text not null references public.concepts(id) on delete cascade,
  is_primary boolean not null default false,
  primary key (child_id, parent_id),
  check (child_id <> parent_id)
);

create unique index concept_parents_one_primary
  on public.concept_parents (child_id) where is_primary = true;

comment on table public.concept_parents is 'Polyhierarchy: a concept may have multiple parents (e.g., amyloidosis under cardio AND nephro). Partial unique index enforces at most one primary parent per child.';

-- 1.4 clusters — cluster snapshots (B-mode now; definition column reserved for future C-mode refresh).
create table public.clusters (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references public.users(id) on delete cascade,
  name          text not null,
  description   text null,
  visibility    text not null default 'private'
                  check (visibility in ('private','shared')),
  definition    jsonb null,                     -- reserved: tag-query for future "refresh"
  generated_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

comment on column public.clusters.definition is 'Reserved for future "refresh cluster" feature; v1 always null. Forward-capture so future migration is unnecessary.';

-- 1.5 cards — flashcards. Tag layers per D17.
create table public.cards (
  id              uuid primary key default gen_random_uuid(),
  prompt          text not null,
  answer          text not null,
  citation        text not null check (length(trim(citation)) > 0),  -- D7
  citation_kind   text not null default 'other'
                    check (citation_kind in ('guideline','primary_lit','textbook','uptodate','other')),
  source          text not null
                    check (source in ('human','external_pipeline','ai_private')),  -- D13
  status          text not null default 'draft'
                    check (status in ('draft','reviewed','retired')),
  author_user_id  uuid references public.users(id),
  -- D17 tag layers:
  concept_ids     text[] not null default '{}',  -- validated by trigger against concepts(id)
  contexts        text[] not null default '{}'
                    check (contexts <@ array['acute','chronic','screening','complication']::text[]),
  qtypes          text[] not null default '{}'
                    check (qtypes <@ array['diagnosis','management','interpretation','prognosis','mechanism']::text[]),
  difficulty      text not null
                    check (difficulty in ('core','advanced','trap')),
  card_format     text not null default 'basic'
                    check (card_format in ('basic','cloze','image_occlusion','case')),
  created_at      timestamptz not null default now(),
  reviewed_at     timestamptz null,
  retired_at      timestamptz null,
  constraint cards_author_required_for_owned_sources
    check ((author_user_id is not null) or (source = 'external_pipeline'))
);

comment on table  public.cards          is 'Flashcards. citation NOT NULL (D7). source enum (D13). Tag layers concept_ids/contexts/qtypes/difficulty per D17. 24h draft cooldown enforced via trigger (D7).';
comment on column public.cards.citation is 'D7: every card traces to a lawful source. Empty/whitespace rejected by check.';

-- 1.6 cluster_memberships — M2M card<->cluster.
create table public.cluster_memberships (
  cluster_id uuid not null references public.clusters(id) on delete cascade,
  card_id    uuid not null references public.cards(id) on delete cascade,
  position   int not null default 0,
  primary key (cluster_id, card_id)
);

-- 1.7 reviews — append-only rating log (D9). time_ms for D17 derived performance.
create table public.reviews (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.users(id) on delete cascade,
  card_id    uuid not null references public.cards(id) on delete cascade,
  cluster_id uuid not null references public.clusters(id) on delete cascade,
  session_id uuid not null,
  rating     text not null check (rating in ('again','good')),
  time_ms    int  null check (time_ms is null or time_ms >= 0),
  created_at timestamptz not null default now()
);

comment on column public.reviews.time_ms is 'For D17 derived performance: slow = good && time_ms > 90000. Phase 2 review UI populates.';

-- 1.8 analytics_uploads — raw user input feeding the intake parser (D6 site #1).
create table public.analytics_uploads (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.users(id) on delete cascade,
  kind       text not null check (kind in ('text','file')),
  raw_text   text null,
  file_path  text null,                                 -- Supabase Storage path
  created_at timestamptz not null default now(),
  constraint analytics_uploads_kind_payload
    check ((kind = 'text' and raw_text is not null) or
           (kind = 'file' and file_path is not null))
);

-- 1.9 structured_analytics — intake parser output. One row per (gap, concept_id).
create table public.structured_analytics (
  id            uuid primary key default gen_random_uuid(),
  upload_id     uuid not null references public.analytics_uploads(id) on delete cascade,
  user_id       uuid not null references public.users(id) on delete cascade,
  concept_id    text not null references public.concepts(id),
  weakness_note text null,
  severity      text not null default 'medium' check (severity in ('low','medium','high')),
  confidence    text not null default 'medium' check (confidence in ('low','medium','high')),
  created_at    timestamptz not null default now()
);

-- 1.10 study_plans — D8 plan shape: 5-15 clusters, 7-14 day window.
create table public.study_plans (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.users(id) on delete cascade,
  status             text not null default 'active' check (status in ('active','complete','abandoned')),
  target_window_days smallint not null check (target_window_days between 7 and 14),
  rationale          text null,
  started_at         timestamptz not null default now(),
  completed_at       timestamptz null
);

-- 1.11 plan_items — ordered cluster references inside a plan.
create table public.plan_items (
  id         uuid primary key default gen_random_uuid(),
  plan_id    uuid not null references public.study_plans(id) on delete cascade,
  cluster_id uuid not null references public.clusters(id) on delete restrict,
  position   smallint not null check (position between 1 and 15),
  rationale  text null,
  unique (plan_id, position)
);

-- 1.12 plan_progress — completion record per plan_item (one row per completion).
create table public.plan_progress (
  id           uuid primary key default gen_random_uuid(),
  plan_item_id uuid not null references public.plan_items(id) on delete cascade,
  session_id   uuid not null,
  completed_at timestamptz not null default now(),
  unique (plan_item_id)
);

-- 1.13 waitlist — landing page email capture. Service-role-only writes.
create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now(),
  invited_at timestamptz null
);

-- 1.14 usage_events — token metering at LLM call sites (D16). Forward-capture for billing.
create table public.usage_events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users(id) on delete cascade,
  call_site     text not null check (call_site in ('intake','plan','ai_card')),  -- D6 sites
  model         text not null,
  input_tokens  int not null check (input_tokens >= 0),
  output_tokens int not null check (output_tokens >= 0),
  request_ref   text null,                       -- upload_id / plan_id / card_id for traceability
  created_at    timestamptz not null default now()
);

comment on table public.usage_events is 'D16: token metering at the three LLM call sites (D6). Per-user, per-call-site, per-day aggregation feeds future billing. Service role writes only.';

-- ============================================================================
-- 2. INDEXES
-- ============================================================================

-- cards: tag-filter queries (cluster generation), rate-limit query (D13), status filtering
create index cards_concept_ids_gin       on public.cards using gin (concept_ids);
create index cards_contexts_gin          on public.cards using gin (contexts);
create index cards_qtypes_gin            on public.cards using gin (qtypes);
create index cards_difficulty            on public.cards (difficulty);
create index cards_author_source_created on public.cards (author_user_id, source, created_at);
create index cards_status                on public.cards (status);

-- concepts: case-insensitive title search, parent traversal
create index concepts_title_lower    on public.concepts (lower(title));
create index concept_parents_parent  on public.concept_parents (parent_id);

-- cluster_memberships: reverse lookup (which clusters is this card in?)
create index cluster_memberships_card on public.cluster_memberships (card_id);

-- reviews: D4 cluster-level miss rate, D17 most-recent-rating-per-card
create index reviews_user_recent       on public.reviews (user_id, created_at desc);
create index reviews_cluster_user      on public.reviews (cluster_id, user_id);
create index reviews_session           on public.reviews (session_id);
create index reviews_user_card_recent  on public.reviews (user_id, card_id, created_at desc);

-- structured_analytics: recent gaps per user (Phase 4 plan input)
create index structured_analytics_user_created on public.structured_analytics (user_id, created_at desc);

-- usage_events: D13 rate-limit aggregation, billing rollups
create index usage_events_user_callsite_created on public.usage_events (user_id, call_site, created_at desc);

-- ============================================================================
-- 3. TRIGGER FUNCTIONS
-- ============================================================================

-- 3.1 handle_new_auth_user — mirror auth.users -> public.users on signup.
create function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 3.2 handle_auth_user_email_update — keep mirrored email in sync.
create function public.handle_auth_user_email_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.users set email = new.email where id = new.id;
  end if;
  return new;
end;
$$;

-- 3.3 cards_validate_concept_ids — every element of concept_ids must exist in concepts(id).
-- Acts as a per-element FK that Postgres can't express natively for arrays.
create function public.cards_validate_concept_ids()
returns trigger
language plpgsql
as $$
declare
  unknown_id text;
begin
  select cid into unknown_id
  from unnest(new.concept_ids) as cid
  where not exists (select 1 from public.concepts c where c.id = cid)
  limit 1;

  if unknown_id is not null then
    raise exception 'Unknown concept id in cards.concept_ids: %', unknown_id
      using errcode = 'foreign_key_violation';
  end if;
  return new;
end;
$$;

-- 3.4 cards_enforce_24h_cooldown — D7 draft -> reviewed transition gate.
-- Also stamps reviewed_at / retired_at on legitimate transitions.
create function public.cards_enforce_24h_cooldown()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'reviewed' and old.status = 'draft' then
    if (now() - old.created_at) < interval '24 hours' then
      raise exception
        'Cards must be in draft for at least 24 hours before promotion to reviewed (current age: %)',
        (now() - old.created_at)
        using errcode = 'check_violation';
    end if;
    new.reviewed_at := now();
  end if;

  if new.status = 'retired' and old.status is distinct from 'retired' then
    new.retired_at := now();
  end if;

  return new;
end;
$$;

-- ============================================================================
-- 4. TRIGGERS
-- ============================================================================

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.handle_auth_user_email_update();

create trigger cards_concept_ids_check
  before insert or update of concept_ids on public.cards
  for each row execute function public.cards_validate_concept_ids();

create trigger cards_status_transition
  before update of status on public.cards
  for each row execute function public.cards_enforce_24h_cooldown();

-- ============================================================================
-- 5. ROW-LEVEL SECURITY
-- ============================================================================
-- All user-data tables enable RLS. Tables without public policies are
-- service-role-only by default (anon/authenticated requests get blocked).

-- 5.1 users — self-only.
alter table public.users enable row level security;

create policy users_self_select on public.users
  for select using (id = auth.uid());

create policy users_self_update on public.users
  for update using (id = auth.uid()) with check (id = auth.uid());

-- (insert/delete trigger-managed; no public policies)

-- 5.2 concepts — read-only to authenticated users. Writes via service role only.
alter table public.concepts enable row level security;

create policy concepts_authed_select on public.concepts
  for select to authenticated using (true);

-- 5.3 concept_parents — same as concepts.
alter table public.concept_parents enable row level security;

create policy concept_parents_authed_select on public.concept_parents
  for select to authenticated using (true);

-- 5.4 clusters — owner CRUD; SELECT also allows shared.
alter table public.clusters enable row level security;

create policy clusters_select on public.clusters
  for select using (owner_user_id = auth.uid() or visibility = 'shared');

create policy clusters_owner_insert on public.clusters
  for insert with check (owner_user_id = auth.uid());

create policy clusters_owner_update on public.clusters
  for update using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());

create policy clusters_owner_delete on public.clusters
  for delete using (owner_user_id = auth.uid());

-- 5.5 cards — reviewed visible to all authed; draft visible to author. Author CRUD.
alter table public.cards enable row level security;

create policy cards_select on public.cards
  for select using (status = 'reviewed' or author_user_id = auth.uid());

create policy cards_author_insert on public.cards
  for insert with check (author_user_id = auth.uid());

create policy cards_author_update on public.cards
  for update using (author_user_id = auth.uid()) with check (author_user_id = auth.uid());

create policy cards_author_delete on public.cards
  for delete using (author_user_id = auth.uid());

-- 5.6 cluster_memberships — derives access from cluster.
alter table public.cluster_memberships enable row level security;

create policy cluster_memberships_select on public.cluster_memberships
  for select using (
    exists (
      select 1 from public.clusters c
      where c.id = cluster_memberships.cluster_id
        and (c.owner_user_id = auth.uid() or c.visibility = 'shared')
    )
  );

create policy cluster_memberships_owner_write on public.cluster_memberships
  for all using (
    exists (
      select 1 from public.clusters c
      where c.id = cluster_memberships.cluster_id and c.owner_user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.clusters c
      where c.id = cluster_memberships.cluster_id and c.owner_user_id = auth.uid()
    )
  );

-- 5.7 reviews — append-only self log (D9).
alter table public.reviews enable row level security;

create policy reviews_self_select on public.reviews
  for select using (user_id = auth.uid());

create policy reviews_self_insert on public.reviews
  for insert with check (user_id = auth.uid());

-- (no update/delete policies — append-only per D9)

-- 5.8 analytics_uploads — owner-only.
alter table public.analytics_uploads enable row level security;

create policy analytics_uploads_self on public.analytics_uploads
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 5.9 structured_analytics — owner-only.
alter table public.structured_analytics enable row level security;

create policy structured_analytics_self on public.structured_analytics
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 5.10 study_plans — owner-only.
alter table public.study_plans enable row level security;

create policy study_plans_self on public.study_plans
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 5.11 plan_items — derives access from study_plans.
alter table public.plan_items enable row level security;

create policy plan_items_via_plan on public.plan_items
  for all using (
    exists (
      select 1 from public.study_plans p
      where p.id = plan_items.plan_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.study_plans p
      where p.id = plan_items.plan_id and p.user_id = auth.uid()
    )
  );

-- 5.12 plan_progress — derives access from plan_items -> study_plans.
alter table public.plan_progress enable row level security;

create policy plan_progress_via_plan_item on public.plan_progress
  for all using (
    exists (
      select 1 from public.plan_items pi
      join public.study_plans p on p.id = pi.plan_id
      where pi.id = plan_progress.plan_item_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.plan_items pi
      join public.study_plans p on p.id = pi.plan_id
      where pi.id = plan_progress.plan_item_id and p.user_id = auth.uid()
    )
  );

-- 5.13 waitlist — service role only. RLS enabled with no public policies = locked.
alter table public.waitlist enable row level security;

-- 5.14 usage_events — self-read; service role writes only.
alter table public.usage_events enable row level security;

create policy usage_events_self_select on public.usage_events
  for select using (user_id = auth.uid());

-- ============================================================================
-- END
-- ============================================================================
