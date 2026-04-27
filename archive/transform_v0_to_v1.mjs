// One-shot: transform kekki_ontology_v0.json into kekki_concepts_v1.json.
//
// Differences:
//   - snake_case ids -> kebab-case (cardio_hf_hfref_dx -> cardio-hf-hfref-dx)
//   - scalar parent_id -> parents[] (polyhierarchy-capable; D17)
//   - drops the depth column (polyhierarchy makes "the depth" undefined per parent)
//   - adds weight: null on each concept (planner-weighting hook, unused in v1)
//
// Re-run safely; idempotent overwrite.

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const v0Path = path.join(repoRoot, "kekki_ontology_v0.json");
const v1Path = path.join(repoRoot, "kekki_concepts_v1.json");

const v0 = JSON.parse(fs.readFileSync(v0Path, "utf8"));

const kebab = (s) => s.replace(/_/g, "-");

const concepts = v0.nodes.map((n) => ({
  id: kebab(n.id),
  title: n.title,
  synonyms: n.synonyms ?? [],
  weight: null,
  parents: n.parent_id
    ? [{ id: kebab(n.parent_id), is_primary: true }]
    : [],
}));

const out = {
  meta: {
    name: "Kekki Medical Concepts",
    version: "1.0.0",
    drafted: "2026-04-26",
    basis:
      "Transformed from kekki_ontology_v0.json. snake_case -> kebab-case slugs; scalar parent_id -> polyhierarchy-capable parents[]. Concept granularity is the v0 starting point; refine through actual card-writing.",
    framework: "Medical_Knowledge_Ontology.md",
    decision: "DECISIONS.md D17",
  },
  concepts,
};

fs.writeFileSync(v1Path, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`Wrote ${concepts.length} concepts to ${path.basename(v1Path)}`);
