# Kekki — Local Setup

Reference doc for getting the project running. Not loaded every session — linked from CLAUDE.md.

## Prerequisites

- **Node.js 20+** (developed against 24.15.0). Windows: `winget install OpenJS.NodeJS.LTS`.
- **pnpm 10+**: `npm install -g pnpm` after Node is on PATH.
- **Windows only:** `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` (run once).

## First-time setup

```bash
pnpm install
```

## Common commands

```bash
pnpm dev          # Next.js dev server at http://localhost:3000
pnpm build        # Production build
pnpm typecheck    # tsc --noEmit (DoD gate)
pnpm lint         # ESLint
```

## Environment variables

`.env.local` at repo root (git-ignored). Vercel preview/prod gets these from project settings.

| Var | Exposed to | Required from |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser | Phase 1 step 3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser | Phase 1 step 3 |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Seed script + system writes |
| `ANTHROPIC_API_KEY` | Server only | Phase 3 |

**Worktrees:** `.env.local` lives at `C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local`, not in the worktree. Use `--env-file="C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local"` for Node scripts.

## Supabase CLI

Installed via Scoop:

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

One-time setup per machine:

```powershell
supabase login
supabase link --project-ref jquturibslqzkldngzvf
```

Apply migrations:

```bash
supabase db push
```

**Preferred in Claude Code sessions:** use the Supabase MCP `apply_migration` tool instead of `supabase db push` — skips the per-worktree `supabase link` and DB password prompt.

## Seeding

```bash
node --env-file="C:/Users/Zach/Documents/Claude/Projects/Kekki/.env.local" scripts/seed_ontology.mjs
```

Idempotent — safe to re-run. Seeds 970 concepts + 952 `concept_parents` edges from `abim_blueprint_v1.json`.
