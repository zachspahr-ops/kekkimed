# Phase 1 Schema Plan

**Status (as of 2026-04-26):** **historical** — Phase 1 steps 1+2 are implemented and applied to kekki-prod. This file is the design notebook that produced migration 001 and informed the ABIM-blueprint pivot in migration 002. The `concepts` table design and the `cards.concept_ids[]` column have been further revised by **migration 002** (ABIM blueprint adoption, D18 + D19) and forecast revisions in migration 003 (retrieval metadata, D20) and 004 (planning + discriminators). The seed file changed from a never-authored `kekki_concepts_v1.json` to the existing `abim_blueprint_v1.json`. Stale references to `kekki_ontology_v0.json` / `kekki_concepts_v1.json` are preserved for traceability — do not treat them as canonical. For current schema state, read [ARCHITECTURE.md](ARCHITECTURE.md). For current canonical seed, see [abim_blueprint_v1.json](abim_blueprint_v1.json) and DECISIONS.md D18.

**Scope:** the artifact this plan produces is `supabase/migrations/001_init.sql` (Phase 1 step 1) and the shape of `scripts/seed_ontology.ts` (Phase 1 step 2).
**Drafted:** 2026-04-26.
**Revised:** 2026-04-26 — reconciled with `Medical_Knowledge_Ontology.md` four-layer tag framework. See "Reconciliation" section below.

---

## DECISIONS.md check

No conflicts with locked decisions, **with one reinterpretation Zach must explicitly bless** (see Open Items #1):

- **D5 — controlled vocabulary.** Reinterpreted: the "ontology" is the curated **concept** list (Layer 1 of `Medical_Knowledge_Ontology.md`). Concepts replace the v0/v1 ontology JSON as the controlled vocabulary. D5's force is unchanged — LLM prompts return concept slugs from the concepts table, never invented strings.
- D7 — clinical content rules → `cards.citation NOT NULL`, draft-cooldown trigger, `status` lifecycle enum unchanged.
- D9 — binary self-rate, always logged → `reviews` table; binary rating preserved as primary log. `time_ms` added for "slow" performance derivation.
- D13 — private AI card guardrails → `cards.source`, nullable `author_user_id` with CHECK, `users.timezone` for local-day rate limit.
- D14, D15 — no schema impact.
- D16 — token metering → `usage_events` table.

---

## Reconciliation with `Medical_Knowledge_Ontology.md`

The framework introduces four orthogonal tag layers per card: **concept**, **context**, **qtype**, **difficulty/performance**. The plan adopts this with these calls:

1. **Per-card tag layers stored as four typed columns**, not one prefixed array. Zach picked separate columns for DB-level constraint enforcement.
2. **Concepts are polyhierarchical.** A `concept_parents` junction table replaces the scalar `parent_id` column. A concept can have any number of parents; one parent may be flagged `is_primary` for breadcrumb display.
3. **`topics` renamed to `concepts`** to match framework vocabulary. Triggers `concepts_validate_*` etc. CLAUDE.md, PHASES.md (step 1 + step 2), and D5 wording need a search-and-replace pass — listed in Open Items.
4. **Difficulty changes from `smallint 1–5` to `text` with CHECK in `(core, advanced, trap)`.** NOT NULL, no default; every card carries a difficulty. Matches framework's three-tier scheme.
5. **Performance tags (`status:correct/slow/wrong/unseen`) are NOT stored.** They are *derived* from `reviews` at query time:
   - `unseen` — no reviews row exists for `(user_id, card_id)`.
   - `wrong` — most recent rating is `again`.
   - `slow` — most recent rating is `good` AND `time_ms > 90000`.
   - `correct` — most recent rating is `good` AND `time_ms <= 90000`.
   `reviews` gains a `time_ms int NULL` column to support this derivation. NULL allowed because Phase 1 hand-seeded reviews and pre-Phase 2 timings won't have it. Phase 2 review UI populates it.
6. **`cards.status` (lifecycle: draft/reviewed/retired) is unchanged.** The framework's `status:` prefix collides on name only. We avoid the collision by never persisting framework-style `status:*` strings — performance is computed, not tagged.
7. **`cards.card_format` and `cards.citation_kind` remain as separate columns.** They are card *attributes*, not tag layers. The framework doesn't address them; they coexist cleanly.

---

## Architectural choices made this session

1. **Cluster model: persisted snapshot now, definition column reserved for future refresh.** `clusters.definition jsonb NULL` ships in v1 unused; future "refresh" feature reads it.
2. **Cards carry tags via four typed columns:** `concept_ids text[]`, `contexts text[]`, `qtypes text[]`, `difficulty text`. Validation:
   - `concept_ids` — trigger checks each element exists in `concepts(id)`.
   - `contexts`, `qtypes` — CHECK constraints with subset operator (`<@ ARRAY[...]`).
   - `difficulty` — scalar CHECK enum.
3. **Polyhierarchy via `concept_parents (child_id, parent_id, is_primary)`.** Partial unique index ensures at most one `is_primary=true` per child.
4. **`author_user_id` nullable, with CHECK that NULL only when `source='external_pipeline'`.**
5. **24-hour draft cooldown is a Postgres trigger** (BEFORE UPDATE on `cards`).
6. **`users.email` mirrored from `auth.users` via trigger.**
7. **`users.timezone` defaults to `'UTC'`.**
8. **`usage_events` exists in v1** so call sites in Phases 3/4/6 just write to it.

---

## Tables (14 total)

### `users`

```
id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
email         text NOT NULL
timezone      text NOT NULL DEFAULT 'UTC'
created_at    timestamptz NOT NULL DEFAULT now()
```

**RLS:** SELECT/UPDATE own row only.

### `concepts` *(was `topics`)*

```
id            text PRIMARY KEY                  -- kebab-case slug, e.g., 'beta-blockers'
title         text NOT NULL                     -- human-readable, e.g., 'Beta Blockers'
synonyms      text[] NOT NULL DEFAULT '{}'
weight        numeric NULL                      -- optional planner weighting
created_at    timestamptz NOT NULL DEFAULT now()
```

Note: no `parent_id`, no `depth`. Hierarchy lives in `concept_parents`.

**RLS:** all authenticated users SELECT. No write policies — service role seeds.

### `concept_parents` *(new — polyhierarchy)*

```
child_id     text NOT NULL REFERENCES concepts(id) ON DELETE CASCADE
parent_id    text NOT NULL REFERENCES concepts(id) ON DELETE CASCADE
is_primary   boolean NOT NULL DEFAULT false
PRIMARY KEY (child_id, parent_id)
CHECK (child_id <> parent_id)
```

**Partial unique index:** `UNIQUE (child_id) WHERE is_primary = true` — at most one primary parent per child.

**RLS:** all authenticated users SELECT.

### `clusters`

```
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
owner_user_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
name            text NOT NULL
description     text NULL
visibility      text NOT NULL DEFAULT 'private'
                  CHECK (visibility IN ('private','shared'))
definition      jsonb NULL                      -- reserved for future refresh
generated_at    timestamptz NOT NULL DEFAULT now()
created_at      timestamptz NOT NULL DEFAULT now()
```

**RLS:** SELECT if owner OR `visibility='shared'`. INSERT/UPDATE/DELETE owner only.

### `cards`

```
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
prompt          text NOT NULL
answer          text NOT NULL
citation        text NOT NULL CHECK (length(trim(citation)) > 0)
citation_kind   text NOT NULL DEFAULT 'other'
                  CHECK (citation_kind IN
                    ('guideline','primary_lit','textbook','uptodate','other'))
source          text NOT NULL
                  CHECK (source IN ('human','external_pipeline','ai_private'))
status          text NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','reviewed','retired'))
author_user_id  uuid REFERENCES users(id)
                  CHECK ((author_user_id IS NOT NULL)
                         OR (source = 'external_pipeline'))

-- Tag layers (Medical_Knowledge_Ontology.md):
concept_ids     text[] NOT NULL DEFAULT '{}'
                  -- elements validated by trigger against concepts(id)
contexts        text[] NOT NULL DEFAULT '{}'
                  CHECK (contexts <@ ARRAY['acute','chronic','screening','complication'])
qtypes          text[] NOT NULL DEFAULT '{}'
                  CHECK (qtypes <@ ARRAY['diagnosis','management','interpretation',
                                         'prognosis','mechanism'])
difficulty      text NOT NULL
                  CHECK (difficulty IN ('core','advanced','trap'))

card_format     text NOT NULL DEFAULT 'basic'
                  CHECK (card_format IN ('basic','cloze','image_occlusion','case'))

created_at      timestamptz NOT NULL DEFAULT now()
reviewed_at     timestamptz NULL
retired_at      timestamptz NULL
```

**RLS:** SELECT if (`status='reviewed'`) OR (`author_user_id = auth.uid()`). INSERT/UPDATE/DELETE if `author_user_id = auth.uid()`. Service role can write `external_pipeline` rows.

**Indexes:**
- `cards USING gin (concept_ids)` — concept-tag filter (cluster generation).
- `cards USING gin (contexts)` — context filter.
- `cards USING gin (qtypes)` — qtype filter.
- `cards (difficulty)` — difficulty filter (board-prep mode).
- `cards (author_user_id, source, created_at)` — D13 rate-limit query.
- `cards (status)` — review-loop filtering.

**Triggers:**
- `cards_validate_concept_ids` (BEFORE INSERT/UPDATE) — rejects rows with unknown concept ids.
- `cards_enforce_24h_cooldown` (BEFORE UPDATE) — rejects status `draft → reviewed` when `now() - created_at < interval '24 hours'`. Stamps `reviewed_at = now()` on legitimate transition.

### `cluster_memberships`

```
cluster_id   uuid NOT NULL REFERENCES clusters(id) ON DELETE CASCADE
card_id      uuid NOT NULL REFERENCES cards(id) ON DELETE CASCADE
position     int NOT NULL DEFAULT 0
PRIMARY KEY (cluster_id, card_id)
```

**RLS:** inherits via cluster ownership/visibility.

**Index:** `cluster_memberships(card_id)`.

### `reviews`

```
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
card_id      uuid NOT NULL REFERENCES cards(id) ON DELETE CASCADE
cluster_id   uuid NOT NULL REFERENCES clusters(id) ON DELETE CASCADE
session_id   uuid NOT NULL
rating       text NOT NULL CHECK (rating IN ('again','good'))
time_ms      int NULL CHECK (time_ms IS NULL OR time_ms >= 0)   -- for derived 'slow'
created_at   timestamptz NOT NULL DEFAULT now()
```

**RLS:** SELECT/INSERT own rows only. Append-only (no UPDATE/DELETE policies).

**Indexes:**
- `reviews (user_id, created_at DESC)`
- `reviews (cluster_id, user_id)`
- `reviews (session_id)`
- `reviews (user_id, card_id, created_at DESC)` — for "most recent review per (user, card)" performance derivation.

### `analytics_uploads`

```
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
kind         text NOT NULL CHECK (kind IN ('text','file'))
raw_text     text NULL
file_path    text NULL
created_at   timestamptz NOT NULL DEFAULT now()
CHECK ((kind = 'text' AND raw_text IS NOT NULL) OR
       (kind = 'file' AND file_path IS NOT NULL))
```

**RLS:** owner only.

### `structured_analytics`

```
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
upload_id       uuid NOT NULL REFERENCES analytics_uploads(id) ON DELETE CASCADE
user_id         uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
concept_id      text NOT NULL REFERENCES concepts(id)
weakness_note   text NULL
severity        text NOT NULL DEFAULT 'medium'
                  CHECK (severity IN ('low','medium','high'))
confidence      text NOT NULL DEFAULT 'medium'
                  CHECK (confidence IN ('low','medium','high'))
created_at      timestamptz NOT NULL DEFAULT now()
```

**RLS:** owner only.

**Index:** `structured_analytics (user_id, created_at DESC)`.

### `study_plans`

```
id                  uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id             uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
status              text NOT NULL DEFAULT 'active'
                      CHECK (status IN ('active','complete','abandoned'))
target_window_days  smallint NOT NULL CHECK (target_window_days BETWEEN 7 AND 14)
rationale           text NULL
started_at          timestamptz NOT NULL DEFAULT now()
completed_at        timestamptz NULL
```

**RLS:** owner only.

### `plan_items`

```
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
plan_id      uuid NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE
cluster_id   uuid NOT NULL REFERENCES clusters(id) ON DELETE RESTRICT
position     smallint NOT NULL CHECK (position BETWEEN 1 AND 15)
rationale    text NULL
UNIQUE (plan_id, position)
```

**RLS:** inherits via study_plans ownership.

### `plan_progress`

```
id             uuid PRIMARY KEY DEFAULT gen_random_uuid()
plan_item_id   uuid NOT NULL REFERENCES plan_items(id) ON DELETE CASCADE
session_id     uuid NOT NULL
completed_at   timestamptz NOT NULL DEFAULT now()
UNIQUE (plan_item_id)
```

**RLS:** inherits via plan_items → study_plans.

### `waitlist`

```
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
email        text NOT NULL UNIQUE
created_at   timestamptz NOT NULL DEFAULT now()
invited_at   timestamptz NULL
```

**RLS:** service role only. No public anon policies (spam vector).

### `usage_events` *(D16)*

```
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id         uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
call_site       text NOT NULL CHECK (call_site IN ('intake','plan','ai_card'))
model           text NOT NULL
input_tokens    int NOT NULL CHECK (input_tokens >= 0)
output_tokens   int NOT NULL CHECK (output_tokens >= 0)
request_ref     text NULL
created_at      timestamptz NOT NULL DEFAULT now()
```

**RLS:** SELECT own rows. INSERT service role only.

**Index:** `usage_events (user_id, call_site, created_at DESC)`.

---

## Triggers and functions

1. `handle_new_auth_user` — AFTER INSERT on `auth.users` → INSERT into `public.users`.
2. `handle_auth_user_email_update` — AFTER UPDATE on `auth.users` → UPDATE `public.users.email`.
3. `cards_validate_concept_ids` — BEFORE INSERT/UPDATE on `cards` → verify each `concept_ids` element exists in `concepts(id)`.
4. `cards_enforce_24h_cooldown` — BEFORE UPDATE on `cards` → reject `draft → reviewed` when too new; stamp `reviewed_at`.

---

## Seed script outline (`scripts/seed_ontology.ts`)

- Reads canonical concept ontology JSON (filename TBD; Zach to author).
- Expected input shape:
  ```
  {
    "concepts": [
      { "id": "beta-blockers", "title": "Beta Blockers",
        "synonyms": ["BBs"], "weight": null,
        "parents": [{"id": "cardiovascular", "is_primary": true}] },
      ...
    ]
  }
  ```
- For each concept: upsert into `concepts`; replace its `concept_parents` rows.
- Idempotent.
- Service-role connection only.

**Blocker:** the canonical concept ontology JSON does not exist yet. `Medical_Knowledge_Ontology.md` is the framework doc, not the data file. Schema and script can ship before; seed run waits on Zach producing the JSON.

---

## Migration order

1. `users`
2. `concepts`
3. `concept_parents`
4. `clusters`
5. `cards`
6. `cluster_memberships`
7. `reviews`
8. `analytics_uploads`
9. `structured_analytics`
10. `study_plans`
11. `plan_items`
12. `plan_progress`
13. `waitlist`
14. `usage_events`
15. Trigger functions + triggers
16. RLS policies

Single `001_init.sql` file.

---

## Definition of Done (Phase 1 step 1)

- `001_init.sql` applies cleanly to a fresh Supabase project.
- All 14 tables visible in Supabase dashboard.
- RLS enabled on every user-data table; cross-user SELECT blocked in spot-check.
- 24h cooldown trigger rejects a manual UPDATE attempting `draft → reviewed` on a row created seconds ago.
- `concept_ids` validation trigger rejects an INSERT with an unknown concept id.
- `is_primary` partial unique index rejects a second primary parent for the same child.
- `users` mirror trigger fires on a test signup and produces a `public.users` row.

---

## Open items still requiring Zach's input

These do not block migration *design* but block downstream work:

1. **Bless the D5 reinterpretation.** Concepts (Layer 1 of `Medical_Knowledge_Ontology.md`) become the controlled vocabulary previously named "ontology IDs." D5's wording references `kekki_ontology_v0.json`; needs an entry update or a new locked decision (D17) to record the shift cleanly.
2. **Author the canonical concept ontology JSON.** `Medical_Knowledge_Ontology.md` is the framework, not the data. Phase 1 step 2 (seed) waits on this file.
3. **Confirm starter lists for non-framework dimensions.** These are *not* in `Medical_Knowledge_Ontology.md`; I picked them last round and want to re-confirm:
   - `card_format`: `basic | cloze | image_occlusion | case`
   - `citation_kind`: `guideline | primary_lit | textbook | uptodate | other`
4. **Downstream doc edits** (small but they touch locked files; I'll do them once item 1 is blessed):
   - **CLAUDE.md** — section "Controlled vocabulary (ontology)" references `kekki_ontology_v0.json` and the topics table; rename to concepts and update file reference.
   - **CLAUDE.md** — section "File layout (target)" lists `kekki_ontology_v0.json` in repo root; replace with the new canonical filename.
   - **PHASES.md** — Phase 1 step 1 lists `topics` in the table list; rename to `concepts` and add `concept_parents`.
   - **PHASES.md** — Phase 1 step 2 says `seed_ontology.ts` reads `kekki_ontology_v0.json`; update file reference.
   - **DECISIONS.md D5** — wording references topic IDs and the v0 file; add a paragraph or new D17 noting the framework adoption.

---

## Next step

Once Zach confirms items 1, 3, and 4 above, the next session writes `001_init.sql` directly from this plan. Item 2 (the concept JSON) only blocks the seed *run*, not the migration write.
