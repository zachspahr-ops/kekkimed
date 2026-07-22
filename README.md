# Kekki

Kekki is a Next.js application and a public clinical-data portfolio at [kekkimed.com](https://kekkimed.com). The public tools are static, versioned exhibits; the signed-in study application remains a separate authenticated surface.

## Public clinical-analysis routes

| Route | Release | Public-content boundary |
|---|---|---|
| `/network/7.5.1` | `clinical_network_v751_nonloinc_public_r1` | Canonical aggregate non-LOINC clinical-concept network. It contains no raw questions, answer keys, source labels, evidence/provenance payloads, or question-source selector. |
| `/network/7.4` | temporary compatibility redirect | Non-permanent redirect to `/network/7.5.1`. The original v7.4 asset remains preserved in Git for rollback and audit. |
| `/reviewer/compare` | `kekki_medqa_parse_comparison_v751_r1` | Stable side-by-side comparison over the same ten public MedQA samples: 616 unchanged legacy mentions versus 614 accepted v7.5.1 facts, collapsed to 511 unique visible annotations and 269 question-concept incidences. All ten samples now have promoted facts. |
| `/reviewer` | legacy parser | Preserved original ten-question MedQA review experience. |
| `/network/4.9`, `/network/5.0`, `/network/5.1`, `/network/5.4` | historical | Preserved historical network releases. They are comparisons, not clinical sources for v7.5.1. |

The public release is reproducibly derived from the sealed v7.5.1 corpus `clinical_corpus_v751_nonloinc_r1`, SHA-256 `d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec`, and network `clinical_network_v751_nonloinc_r1`, SHA-256 `37bad394d95299c920dd2c255220afbc64a23ab5da5c43fdecb8e10e7132dee9`. The private full-network export SHA-256 is `78178e470dba672a8bfbeefe96ef3736a99478376be15090f99a9d13cc2ec295`. The v7.4 metadata database remains read-only at SHA-256 `7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0`; it supplies specialty/source metadata only and is not a clinical fact source.

The sealed graph contains 17,166 active questions, 16,347 questions with facts, 6,117 concepts, 139,223 deduplicated question-concept incidences, and 340,960 support-one associations. The public payload retains the support-eight-or-greater long tail: 1,892 concepts and 14,676 associations. Its defensible default at support 16 contains 892 concepts and 4,959 associations.

v7.5.1 also corrects the v7.4 display-label defect. Every public node now uses its sealed preferred clinical label. When canonical labels collide, the display adds a human-readable namespace qualifier; it never substitutes an opaque `Local atomic concept` placeholder or leaks a machine-local namespace. The 1,892 display labels are unique, including 532 qualified nodes across 265 duplicate-label groups. Label visibility is ranked deterministically by question support, PageRank, display label, and concept identity.

The public privacy boundary is unchanged: the network publishes aggregate terminology identities, graph metrics, context filters, specialties, evidence-tier categories, and anonymized robustness totals. It excludes question text, answer keys, named sources, source distributions/selectors, incidences, span evidence, fact IDs, and provenance drill-downs. `/reviewer/compare` is the only raw-text exception and contains exactly the same ten previously public MedQA examples. Its 614 accepted facts become 511 visible annotations after 103 duplicate answer/choice representations are collapsed; 269 distinct question-concept incidences remain. The 355 unresolved candidates are excluded, including 282 LOINC-pending and 73 unresolved non-LOINC candidates.

This is explicitly a v7.5.1 non-LOINC preview. Laboratory/LOINC normalization remains pending until **July 26, 2026 at 5:07 PM America/New_York**; the release must not be described as the final all-lane corpus.

## Reproducible public build

- Network/manifest builder: `scripts/build_v751_public_showcase.py`
- Independent network validator: `scripts/validate_v751_public_showcase.py`
- Reviewer builder: `scripts/build_v751_parse_comparison.py`
- Independent reviewer validator: `scripts/validate_v751_parse_comparison.py`
- Release manifest: `public/releases/v7.5.1-public.json`
- Network HTML: SHA-256 `a6d27f7822dd9fa664b700eccf7efc2e1bd0fbccfae3321ac8806ed08ef5cb81` (6,081,981 bytes)
- Comparison reviewer HTML: SHA-256 `20e8b1ccea61c509ddcf6571bfeaca8e705134e70ff7055ecec2cf86740097f8` (814,822 bytes)
- Combined manifest: SHA-256 `cee882382a54db0ceae78e20884dab4e7708e6ce6e9a7fd00d9383f4f06b9ed7` (3,634 bytes)
- Preserved legacy reviewer Git artifact: SHA-256 `e5f3b2a55e5cdb9da54e5c8977231c05aa3c4928d896a15e3900ea3521318d77`
- Preserved v7.4 network Git artifact: SHA-256 `253ebf642fe63db59c81bf919fe28c26af2d8a1a45cb34dd583cf63c94b35987`

The independent network validator passes 85 checks and the independent reviewer validator passes 16,111 checks, both with zero failures. The rebuilt network, reviewer, and combined manifest are deterministic. `pnpm typecheck` passes; `pnpm test` passes all 115 tests; and `pnpm lint` passes with the two pre-existing unused-symbol warnings in `CardRow.tsx` and `lib/cards/import-schema.ts`. A 31-assertion rendered desktop/mobile route suite passes with no application page errors or non-analytics console errors; it covers the stable and historical routes, the v7.4 redirect, reviewer inspection, Q03 recovery, privacy controls, responsive drawers, and horizontal-overflow checks. The network renderer collision-culls overview labels, always prioritizes the searched concept, and keeps the mobile detail sheet closed until a concept or association is selected.

Deployment record:

- Release content commit: `ab876812461c5bb6955870e89fc536e15be40fac`
- Vercel preview: `4XGKzf7goZdritvBsyFebXZxt8qs` / GitHub deployment `5556641284` at `https://kekkimed-qy0j8jpwc-zachspahr-ops-projects.vercel.app`
- Vercel production: `HVu1s7oDP6S3xf9W7TERUcsgm2vi` / GitHub deployment `5556725693` at `https://kekkimed-h5yr66shq-zachspahr-ops-projects.vercel.app`
- Production verification: `https://www.kekkimed.com/network/7.5.1`, `/reviewer/compare`, `/reviewer`, the v7.4 compatibility redirect, all four historical network routes, and the release manifest returned 200 on July 22, 2026. Downloaded production network, reviewer, and manifest bytes exactly matched their declared SHA-256 hashes.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Before changing Next.js conventions, read `AGENTS.md` and the applicable guides in `node_modules/next/dist/docs/`.

## Verification

```bash
pnpm typecheck
pnpm test
pnpm build
```

Run both independent v7.5.1 validators in addition to the application checks. See `ARCHITECTURE.md` for the current routes and asset boundaries and `SESSION_LOG.md` for release status.
