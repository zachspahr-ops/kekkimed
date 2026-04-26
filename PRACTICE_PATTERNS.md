# Kekki — Practice Patterns

*How Zach and Claude Code work together on Kekki. Workflow norms, not architectural decisions. (Architecture lives in [DECISIONS.md](DECISIONS.md); operating instructions for the agent live in [CLAUDE.md](CLAUDE.md); this file is the connective tissue between them.)*

---

## Session start — `/plan` first, every time

Every session opens with `/plan` (D11). In plan mode, Claude Code must:

1. Read CLAUDE.md, PHASES.md, DECISIONS.md, and the relevant slice of `kekki_ontology_v0.json`.
2. State which phase and which step of PHASES.md is being worked on.
3. Surface any conflict with DECISIONS.md before proposing edits. Locked decisions are not bypassed silently — they are amended in plan mode with Zach's sign-off, or the proposal is reshaped to fit them.
4. Propose: files to touch, changes to make, how to verify.
5. Wait for approval before editing.

If Zach explicitly says "skip planning" in a given session, the plan step can be condensed — but file reads still happen, and conflicts still surface.

## Diff size discipline

Small diffs over big diffs, always. The reviewer is a first-time coder; a 400-line diff hides mistakes that a 40-line diff exposes.

- One slice at a time. End-to-end test the slice. Then layer the next.
- A "slice" is something with a one-sentence user-facing description. "Login page renders." "Magic-link callback redirects to /dashboard." "Review session writes one row per rating."
- Refactors are their own slice, not bundled into a feature change.
- If a change spans more than ~150 lines outside of generated/scaffold code, split it.

## Local verification before push

Never push code that has not been run locally. The bar:

- `pnpm typecheck` passes.
- `pnpm build` passes.
- The change works in the browser on a real flow Zach can describe in one sentence.
- For UI changes: opened in a browser, golden path exercised, at least one edge case poked at.

"It compiles" is not "it works." TypeScript catches type errors; it does not catch wrong-cluster-id or the-button-doesn't-do-anything.

## Boring-tech bias

When two approaches both fit, pick the one with more documentation, more StackOverflow answers, more LLM training data. Reasons:

- Zach is learning. Boring tech has more learning material.
- Debugging at 11pm is easier when error messages are searchable.
- Year-one budget cap is real. Boring tech rarely surprises with a paid tier.

This is why the stack is Next.js / Supabase / Tailwind / Vercel, not the latest framework of the month (D2).

## Ask before acting — and what counts as "acting"

CLAUDE.md lists the categories that require asking before changing. The spirit:

- Anything in DECISIONS.md.
- New dependencies, new LLM call sites (currently three — D6), new database tables not in PHASES.md.
- Anything touching clinical content rules, the AI card guardrails, or the labeling rules.
- Anything that costs money on a recurring basis.
- Anything introducing billing logic before Phase 8 + 4 weeks (D16).

What does *not* require asking: editing scratch code in a feature branch, fixing typos, adjusting a Tailwind class, renaming a local variable.

## Tool division — Claude Code, Cursor, Cowork

Three places where AI helps Zach build Kekki, each with a different shape:

- **Claude Code (this surface).** Structured implementation runs. Reads the project files. Operates with `/plan` discipline. Best for: a discrete change with a clear DoD ("add the magic-link callback route," "wire the import endpoint validation").
- **Cursor.** Day-to-day editor with an inline LLM. Best for: small edits, autocomplete-shaped refactors, asking a quick question about the file open in front of you. Not the right surface for multi-file architectural moves.
- **Cowork.** Strategic conversations, content decisions, doc drafting. Best for: "what should this prompt template look like," "draft the marketing page copy," "should we split this cluster," "what does the onboarding flow feel like?"

Use Claude Code for implementation, Cursor for inline editing, Cowork for strategy. Crossing wires (e.g., asking Cowork to write a 200-line migration) wastes everyone's time.

## Debugging stance — which layer broke?

When something doesn't work, the first question is which layer of the stack failed. The stack, top to bottom:

```
Browser  →  Next.js client component  →  Server component / route handler
       →  Supabase client  →  Postgres  →  RLS policy
       →  Anthropic API  →  Vercel deploy / env vars
```

Symptoms map to layers. "Page is blank" is usually browser-or-client. "Data isn't saving" is usually server-or-DB. "It works locally but not on Vercel" is usually env-vars-or-deploy. Resist the urge to start changing code before you know which layer is broken — that's how 30-minute fixes turn into 3-hour debugging sessions.

## Composability over cleverness

Small, single-purpose pieces that can be combined. A function with one job is testable, replaceable, readable. A function with five jobs hides bugs.

In code: components do one thing, route handlers do one thing, prompt templates do one thing. The intake prompt produces structured gaps — it does not also generate plans.

In commits: one slice per commit, one thing per commit message.

## What to do when stuck

- If stuck on a layer: take a screenshot or copy the error, hand it to Cursor or Cowork, ask "which layer is this and what would you check first."
- If stuck on a decision: open `/plan` and surface the conflict. Don't paper over it.
- If stuck on time: ship the smaller version. Cut scope before cutting verification.
- If stuck on motivation: that's what the SESSION_LOG is for — read the last three entries, see how much has actually shipped, then pick the next slice.

## Update cadence for these docs

- **CLAUDE.md, DECISIONS.md** — only when an operating rule or architectural decision changes. Treat as load-bearing.
- **PROJECT_SUMMARY.md** — at every phase boundary. Update the phase table, refresh anything that's drifted.
- **PRACTICE_PATTERNS.md** — when a workflow norm actually changes. Don't rewrite from preference; rewrite from experience.
- **SESSION_LOG.md** — append after every meaningful session. Append-only, never edited in place.
