// Seeds public.concepts and public.concept_parents from kekki_concepts_v1.json.
//
// Idempotent:
//   - Concepts are upserted on id (re-runs update title/synonyms/weight in place).
//   - Parent edges are deleted-then-inserted per concept (handles structural changes).
//
// Run with:
//   node --env-file=.env.local scripts/seed_ontology.mjs
//
// Requires SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY in env.
// Uses service role to bypass RLS (concepts/concept_parents have no public-write policies).

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing env vars. Need SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.",
  );
  console.error(
    "Run with: node --env-file=.env.local scripts/seed_ontology.mjs",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const repoRoot = path.resolve(import.meta.dirname, "..");
const conceptsFile = path.join(repoRoot, "kekki_concepts_v1.json");

const data = JSON.parse(fs.readFileSync(conceptsFile, "utf8"));
const concepts = data.concepts;
console.log(`Loaded ${concepts.length} concepts from ${path.basename(conceptsFile)}.`);

// 1. Upsert concepts (no parent links here — that's a separate table).
const conceptRows = concepts.map((c) => ({
  id: c.id,
  title: c.title,
  synonyms: c.synonyms ?? [],
  weight: c.weight ?? null,
}));

console.log("Upserting concepts...");
const { error: conceptError } = await supabase
  .from("concepts")
  .upsert(conceptRows, { onConflict: "id" });

if (conceptError) {
  console.error("concepts upsert failed:", conceptError);
  process.exit(1);
}
console.log(`  ${conceptRows.length} concept rows upserted.`);

// 2. Replace concept_parents edges for these children.
const parentRows = concepts.flatMap((c) =>
  (c.parents ?? []).map((p) => ({
    child_id: c.id,
    parent_id: p.id,
    is_primary: p.is_primary ?? false,
  })),
);

const childIds = [...new Set(parentRows.map((r) => r.child_id))];
console.log(`Replacing concept_parents (${parentRows.length} edges across ${childIds.length} children)...`);

if (childIds.length > 0) {
  const { error: deleteError } = await supabase
    .from("concept_parents")
    .delete()
    .in("child_id", childIds);

  if (deleteError) {
    console.error("concept_parents delete failed:", deleteError);
    process.exit(1);
  }
}

if (parentRows.length > 0) {
  const { error: insertError } = await supabase
    .from("concept_parents")
    .insert(parentRows);

  if (insertError) {
    console.error("concept_parents insert failed:", insertError);
    process.exit(1);
  }
}

console.log(`  ${parentRows.length} parent edges inserted.`);

// 3. Verification counts.
const { count: conceptCount } = await supabase
  .from("concepts")
  .select("*", { count: "exact", head: true });

const { count: edgeCount } = await supabase
  .from("concept_parents")
  .select("*", { count: "exact", head: true });

console.log(`\nRemote state: ${conceptCount} concepts, ${edgeCount} parent edges.`);
console.log("Done.");
