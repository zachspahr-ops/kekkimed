# Kekki — Technical Orientation for Zach

*A plain-English guide to every tool, concept, and feature in the build. Written for a first-time coder who already thinks in systems.*

---

## The Mental Model First

Before any specific tool: understand the layers.

```
Your brain (ideas) 
  → Code (instructions)
    → Runtime (what executes the instructions) 
      → Server (where it runs)
        → Database (where data lives)
          → Browser (what the user sees)
```

Every tool below lives in one of these layers. When something breaks, you're always asking: *which layer broke?*

---

## The Language Layer

### JavaScript

The language of the web. Every browser understands it natively. You write instructions; the browser executes them. It is loosely typed, meaning you can write `let x = 5` and later `x = "hello"` without an error — which sounds flexible but causes bugs that are hard to find.

**Why Kekki uses it:** Next.js is JavaScript. You have no choice. Everything in your stack speaks JS.

### TypeScript

JavaScript with a type system bolted on. You declare what kind of data a variable can hold: `let x: number = 5`. Now if you try `x = "hello"`, TypeScript catches it *before* the code runs. It compiles down to plain JavaScript — the browser never sees TypeScript, only the output.

**Why Kekki uses it:** Your CLAUDE.md says `strict mode`. Every function, every variable, typed. It feels like overhead until the first time it catches a real bug at compile time instead of at 2am in production.

### Python

A different general-purpose language. Popular in data science, backend scripting, ML. Elegant syntax. Has no native role in browsers.

**Why Kekki does NOT use it:** Your stack is TypeScript/Next.js throughout. Python does not appear in the build. Worth learning eventually — irrelevant now.

---

## The Runtime Layer

### Node.js

JavaScript was invented for browsers. Node.js is what lets JavaScript run *outside* a browser — on a server, in a terminal, anywhere. When you run `pnpm dev` to start your local development server, Node.js is what's actually executing your code.

Think of it this way: JavaScript is the language, Node.js is the environment that runs it on a computer instead of in a browser.

**Why Kekki uses it:** Next.js requires Node.js. When your app runs on Vercel, it runs in a Node.js environment.

### Bun

A newer, faster alternative to Node.js. It also runs JavaScript/TypeScript. Faster startup, built-in bundler. Growing popularity in 2025.

**Why Kekki does NOT use it:** Your stack is locked to pnpm + standard Node. Bun is a valid choice for a greenfield project, but switching runtimes mid-build is a distraction. The ecosystem around Next.js/Vercel is Node-first. Don't switch.

### npx vs pnpm

These are not runtimes — they are *package managers and command runners*.

- **npm** — the original Node package manager. Installs libraries (called packages or dependencies).
- **npx** — a tool bundled with npm that runs a package *without installing it permanently*. `npx create-next-app` downloads and runs that scaffolding tool once.
- **pnpm** — a faster, disk-efficient alternative to npm. Uses a shared cache so packages aren't duplicated across projects. Your CLAUDE.md locks Kekki to pnpm.

**Rule:** Use `pnpm` for everything. `pnpm install`, `pnpm dev`, `pnpm build`. Don't mix npm and pnpm in the same project — lockfile conflicts.

---

## The Framework Layer

### Next.js

A framework built on top of React (a UI library) and Node.js. It handles routing, server-side rendering, API endpoints, and builds — so you don't have to wire those things up yourself.

**Key concept: App Router.** Next.js 14 introduced a new routing system. Folders = routes. A file at `/app/dashboard/page.tsx` automatically becomes the `/dashboard` page. No configuration needed.

**Key concept: Server vs Client components.** Some code runs on the server (database calls, API keys, heavy logic). Some runs in the browser (user interactions, animations). Next.js lets you declare this explicitly with `"use client"` at the top of a file. Default is server.

**Why Kekki uses it:** It handles auth callbacks, API routes, database calls, and the UI all in one repo. The alternative is running a separate backend — more complexity, more things to break.

### React

The UI library Next.js is built on. You write components — reusable pieces of UI. A component is a function that returns HTML-like syntax called JSX.

```tsx
function CardViewer({ prompt }: { prompt: string }) {
  return <div className="card">{prompt}</div>
}
```

React handles keeping the screen in sync with your data. When data changes, the relevant components re-render automatically.

### shadcn/ui

Pre-built, styled React components: buttons, dialogs, cards, form inputs. You copy the source into your project (rather than installing as a locked dependency), so you can modify them freely. Built on Tailwind.

**Why Kekki uses it:** You don't have time to design a design system. shadcn gives you production-quality UI out of the box.

### Tailwind CSS

A CSS framework where you style things with utility classes directly in your JSX.

```tsx
<div className="flex items-center gap-4 p-6 rounded-xl bg-white shadow">
```

No separate CSS files. No naming conventions to invent. Verbose in the markup but fast to write and easy to read.

---

## The Database Layer

### SQL (Structured Query Language)

The language you use to talk to relational databases. A relational database stores data in tables with rows and columns — like spreadsheets that enforce rules.

```sql
SELECT * FROM cards WHERE status = 'reviewed' AND cluster_id = 'abc123';
```

Read as: "Give me all columns from the cards table, where the status is 'reviewed' and the cluster ID is 'abc123'."

You'll write SQL for: migrations (building/changing table structure), manual data inspection, and debugging.

**Key SQL concepts for Kekki:**
- **Table** — one entity type. `cards`, `clusters`, `reviews`, `users`.
- **Row** — one record. One card. One review event.
- **Foreign key** — a column that points to a row in another table. A `review` has a `card_id` that points to the `cards` table.
- **Migration** — a SQL file that modifies the database schema. Numbered (`001_init.sql`). Run once, never edited.
- **Row-Level Security (RLS)** — Postgres feature that enforces "user X can only read their own rows" at the database layer, not just application layer.

### Supabase

A managed Postgres database with extras: built-in auth, file storage, real-time subscriptions, a web UI to inspect data. You don't run Postgres yourself — Supabase runs it and gives you a dashboard plus client libraries.

**The Supabase JS client** lets your Next.js code talk to Postgres directly from your server components. No separate backend needed.

**Magic link auth:** User enters email → Supabase sends a one-time link → user clicks → they're logged in. No passwords to manage.

---

## The Terminal Layer

### Terminal / Bash

The terminal is a text interface to your computer. Instead of clicking, you type commands. Bash is the language those commands are written in (on Mac/Linux). PowerShell is the Windows equivalent.

```bash
cd kekki          # change directory to the kekki folder
pnpm dev          # start the dev server
git status        # see what files have changed
```

**You will use the terminal constantly.** It is not optional. The good news: you'll use maybe 15 commands repeatedly and that covers 90% of cases.

**Core commands you need:**
```bash
cd <folder>       # navigate to a folder
ls                # list files in current folder
pnpm install      # install all project dependencies
pnpm dev          # start local dev server (usually localhost:3000)
pnpm build        # compile the app (catches TypeScript errors)
pnpm typecheck    # run TypeScript checks without building
git add .         # stage all changes
git commit -m ""  # save a snapshot with a message
git push          # send to GitHub
```

### PowerShell

Windows's version of bash. Same concept, different syntax. Installed by default on Windows. For Kekki development, you'll mostly use it the same way you'd use bash — running pnpm commands, git commands, etc.

---

## The Editor Layer

### VS Code (Visual Studio Code)

A free code editor made by Microsoft. Has a terminal built in. Has extensions for TypeScript, Tailwind, Git, Supabase — everything in your stack. The most widely used editor in web development.

Features you'll use:
- Syntax highlighting (code is color-coded by type)
- IntelliSense (autocomplete that knows your TypeScript types)
- Integrated terminal (run pnpm commands without switching windows)
- Git diff view (see exactly what changed before committing)
- Error squiggles (TypeScript errors appear inline as you type)

### Cursor

VS Code fork with Claude built in. Same interface, same extensions — plus you can highlight code and ask questions, generate functions inline, get explanations in context. Especially useful for a first-time coder because the LLM can see your actual files.

**Kekki workflow:** Use Cursor for day-to-day coding. Use Cowork (this session) for strategy, planning, and content decisions. Use Claude Code (terminal) for structured implementation runs.

### IDEs (Integrated Development Environments)

The category that VS Code and Cursor belong to. The "integrated" part means editor + terminal + debugger + version control all in one window. Alternatives: JetBrains WebStorm (paid, powerful, heavier). For Kekki: VS Code or Cursor, nothing else needed.

---

## The Deployment Layer

### Git / GitHub

Git is version control: it tracks every change to your code, lets you revert, branch, and merge.

GitHub is where your git repository lives remotely. It is the source of truth.

**The cycle:**
1. Make changes locally
2. `git add .` (stage changes)
3. `git commit -m "what I did"` (snapshot)
4. `git push` (send to GitHub)
5. Vercel detects the push and auto-deploys

**Branch = a parallel version of the code.** You work on a branch, test it, then merge to `main`. Main auto-deploys. Never commit directly to main for anything that isn't trivial.

### Vercel

A hosting platform optimized for Next.js (Vercel built Next.js). You link your GitHub repo, and every push to main triggers an automatic deploy. Preview URLs are generated for every branch so you can test before merging.

**Why it matters:** "It works on my laptop" is not done. "It works on Vercel" is done.

---

## The Mobile Tangent

### Expo / ExpoGo

Expo is a framework for building mobile apps (iOS + Android) using React and JavaScript. ExpoGo is a phone app that lets you preview your Expo app without going through the App Store.

**Kekki does not use this.** Kekki is a web app. It will work on mobile browsers (responsive design), but it is not a native app. If Kekki ever becomes a native app, that's a Phase 10+ decision. For now, file this away and ignore it.

---

## The Composability Concept

### Composable Code

Not a tool — a philosophy. Composable code means building small, single-purpose pieces that can be combined.

A non-composable function does five things. A composable one does one thing. You combine five composable functions to get the same result — but now each piece can be tested, reused, and replaced independently.

In React: a composable component tree. `<PlanPage>` contains `<PlanHeader>`, `<ClusterList>`, `<ClusterCard>`. Each component has one job. You can swap `<ClusterCard>` without touching anything else.

In Kekki's LLM layer: intake → structured JSON → planner. Three composable steps. If the intake prompt breaks, you fix the intake without touching the planner.

**Why it matters for you:** When you're debugging, small composable pieces are much easier to test in isolation. Big monolithic functions hide bugs.

---

## The MCP Concept (Relevant to Cowork)

Model Context Protocol — a standard that lets Claude connect to external tools (your filesystem, Supabase, Google Calendar, etc.) through structured APIs. When you use Cowork and it reads your PHASES.md or writes a file to your project folder, that's MCP in action. Not something you need to build for Kekki, but explains why Claude in Cowork can interact with your files.

---

## The Kekki App — Feature Map

### What you're building, phase by phase

---

### Phase 0 — The empty frame
*What the user sees:* "Kekki — launching soon." That's it.
*What matters:* The deploy pipeline is real. kekkimed.com → Vercel → GitHub → your laptop. The plumbing works before any product exists. This is not optional — it is the foundation everything else sits on.

---

### Phase 1 — Identity and data structure
*What the user sees:* Login page → magic link email → dashboard showing "No clusters yet."
*What the database looks like:* All 12 tables exist. The ontology (323 topic nodes) is seeded. RLS is active.
*Why this order:* You cannot build any product feature without auth (who is the user?) and schema (where does the data go?). Phase 1 is boring and invisible. It is also load-bearing.

---

### Phase 2 — The core product (the review loop)
*What the user sees:* A cluster list → a cluster → a session → cards one at a time → "Again" or "Good" → session summary.
*What happens in the background:* Every rating writes a row to the `reviews` table: who, what card, what rating, what session, when. This data is the feedstock for everything that comes after.
*Why this is Phase 2 and not Phase 5:* Because if the review loop is bad — laggy, ugly, confusing — nothing else matters. Validate the core before building around it.

---

### Phase 3 — Intake parser (LLM call site #1)
*What the user sees:* A text box. They paste "I bombed hyponatremia and DKA on my last MKSAP block." They submit. A structured list of gaps appears: `nephro_lyt_hypona`, `endo_dm_dka_hhs`. They confirm or edit.
*What happens in the background:* A server action sends the text to Claude Haiku with a prompt that forces it to return ontology IDs, not free text. The output is validated and saved to `structured_analytics`.
*Why it matters:* This is how the app learns what the user doesn't know. Without structured gaps, the planner has nothing to work with.

---

### Phase 4 — Plan generator (LLM call site #2)
*What the user sees:* A "Generate plan" button. A list of 5-15 clusters with rationale: "Start with Heart Failure GDMT (your most-missed cluster this month). Then AKI. Then..." They accept or regenerate.
*What happens in the background:* The planner takes structured gaps + available clusters + the ontology and asks Haiku: "Given these weaknesses and this content library, what's the optimal order to study?"
*Why so few LLM calls:* Cost control. The app uses exactly three LLM call sites — intake parser (#1), plan generator (#2), and a private AI card generator (#3) for spawning one or two cards on the spot when you hit a gap. LLM in the card review loop = dollars at scale, so the review loop itself stays LLM-free. The third call site is rate-limited (10 cards/user/local-day) and gated by guardrails — see DECISIONS.md D6 and D13.

---

### Phase 5 — Plan execution
*What the user sees:* A plan detail page showing items with checkmarks. Each item links to the review loop. On finish, the item marks done. When all are done, the plan is complete.
*What this enables:* "What should I study tonight?" becomes a one-click answer. The app becomes a daily habit, not a reference tool.

---

### Phase 6 — Content import + cluster editor
*What the user sees:* An editor to create clusters, add cards, rename, promote from draft to reviewed, retire old ones.
*What happens externally:* Zach's separate card-generation pipeline (the bulk authoring path, outside this repo) posts JSON to `POST /api/cards/import`. The app validates and ingests. A private in-repo AI card generator (LLM call site #3) handles the on-the-spot case when you hit a gap mid-study and want one or two cards immediately — same draft → cool → review pipeline, just a different intake path. Bulk authoring stays external; in-repo is for one-at-a-time, gap-anchored requests with hard guardrails (DECISIONS.md D13).
*Why the 24-hour draft rule:* Cooling period. A card written at 2am under pressure should sit and be re-read before it goes live. This is enforced at the DB layer — not optional. The rule applies to every source: human-authored, external pipeline, and private AI.

---

### Phase 7 — Closing the loop
*What the user sees:* After a plan completes: "Upload new analytics" or "Generate from review history." Option 2 computes miss rates from the `reviews` table and feeds them back into the Phase 3 intake format automatically.
*Why this is the whole product thesis:* Study → gaps → plan → study → gaps → plan. The loop should get tighter with each cycle as the app learns where the user is weak. Phase 7 is when the product becomes self-improving.

---

### Phase 8 — Public face
*What the user sees (public):* A landing page at kekkimed.com. Sample cluster. Email waitlist.
*What the user sees (gated):* Signup requires an invite code. First 5 users are Zach's co-residents.
*What gets added:* ToS, privacy policy, support email.
*Why invite-only first:* You cannot support an open beta while on 28-hour call. You need to know the people using it so you can debug their issues by asking them directly.

---

### Phase 9 — Continuous content
Not a phase with an end. Zach writes cards, studies with the product, ships one small improvement per week. The product improves because the content improves and because Zach is the primary user.

---

## The Budget

$1,100 year one, all in.

- Vercel Pro: ~$240/year (needed for custom domain + analytics)
- Supabase Pro: ~$300/year (25 GB storage, no row limits)
- Domain: ~$15/year (Cloudflare Registrar)
- Anthropic API: ~$50-100/year at beta-user scale (Haiku is cheap — ~$0.25 per million input tokens)
- Remainder: buffer for unexpected costs

What is explicitly deferred until traction: lawyer review, logo design, trademark filing, paid ads.

---

## The One Thing to Internalize

You are not learning to be a software engineer. You are learning *just enough* to build *one specific thing*. The tools above are not a curriculum — they are a toolbelt. You pick up the wrench when you need to turn a bolt. You do not need to understand the metallurgy.

When something breaks: identify the layer. When you're about to add something new: ask whether it's in PHASES.md. When you're unsure about a decision: open `/plan` in Claude Code.

That is the whole system.
