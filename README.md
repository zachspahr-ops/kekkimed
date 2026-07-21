# Kekki

Kekki is a Next.js application and a public clinical-data portfolio at [kekkimed.com](https://kekkimed.com). The public tools are static, versioned exhibits; the signed-in study application remains a separate authenticated surface.

## Public clinical-analysis routes

| Route | Release | Public-content boundary |
|---|---|---|
| `/network/7.4` | `clinical_network_v74_nonlab_public_r1` | Aggregate non-laboratory clinical-concept network. It contains no raw questions, answer keys, source labels, evidence/provenance payloads, or question-source selector. |
| `/reviewer/compare` | v7.4 parser comparison | Side-by-side comparison over the same ten public MedQA samples: 616 legacy mentions versus 81 accepted v7.4 facts, collapsed to 70 question-concept incidences. Nine of ten samples have accepted v7.4 facts. Raw question text is shown only for these ten MedQA examples. |
| `/reviewer` | legacy parser | Preserved original ten-question MedQA review experience. |
| `/network/4.9`, `/network/5.0`, `/network/5.1`, `/network/5.4` | historical | Preserved historical network releases. They are comparisons, not sources for v7.4. |

The v7.4 public network is an additive, privacy-reduced derivative of the unchanged private release `clinical_network_v74_nonlab_preview_r1`. Its sole clinical parent is `outputs/im_boards_clinical_corpus_v74_nonlab.sqlite`, SHA-256 `4c5acfd4f86e9af1b4702cbeb403ac680d8830e7c86e34c06c370436dcbac521`. The private network database SHA-256 is `7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0`; the canonical graph SHA-256 is `213f59e74d49e3de47c1e8fa49d3f5a666fadedc2348cb82269f224d25598677`.

This is explicitly a v7.4 non-laboratory preview. Laboratory/LOINC normalization remains pending until **July 26, 2026 at 5:07 PM America/New_York**; the release must not be described as the final all-lane corpus.

## Reproducible public build

- Builder: `scripts/build_v74_public_showcase.py`
- Independent validator: `scripts/validate_v74_public_showcase.py`
- Release manifest: `public/releases/v7.4-public.json`
- Network HTML: SHA-256 `253ebf642fe63db59c81bf919fe28c26af2d8a1a45cb34dd583cf63c94b35987` (8,857,766 bytes)
- Comparison reviewer HTML: SHA-256 `3bc485ee364929dad77838e8d9526e95bb023cb8228d70f9ed09e42db0f9ea3a` (437,753 bytes)
- Manifest: SHA-256 `b88d4a8ea93e415d56573c54c3a9334da5243908f2f1091deba47312439caadf`
- Preserved legacy reviewer Git artifact: SHA-256 `e5f3b2a55e5cdb9da54e5c8977231c05aa3c4928d896a15e3900ea3521318d77`

The independent validator passes 113 checks, the application test suite passes 115 tests, and rendered desktop/mobile QA passes 43 browser assertions. The validator enforces both the public-network privacy contract and the exact ten-question MedQA reviewer exception. Anonymous Vercel Web Analytics is enabled on public portfolio routes. GitHub `main` is the production branch and auto-deploys to Vercel.

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

Run the independent v7.4 public validator in addition to the application checks. See `ARCHITECTURE.md` for the current routes and asset boundaries and `SESSION_LOG.md` for release status.
