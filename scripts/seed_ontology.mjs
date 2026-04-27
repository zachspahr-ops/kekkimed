// Seeds public.concepts and public.concept_parents from abim_blueprint_v1.json.
//
// ID scheme (D18): dot-delimited snake_case.
//   system:     <system_slug>
//   subsection: <system_slug>.<subsection_slug>
//   topic:      <system_slug>.<subsection_slug>.<topic_slug>
//
// Idempotent:
//   - Concepts: INSERT ... ON CONFLICT DO UPDATE (upsert on id).
//   - concept_parents: DELETE-then-INSERT scoped by child_id.
//
// Run with:
//   node --env-file=.env.local scripts/seed_ontology.mjs
//
// Requires SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.

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
  console.error("Run with: node --env-file=.env.local scripts/seed_ontology.mjs");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const repoRoot = path.resolve(import.meta.dirname, "..");
const blueprintFile = path.join(repoRoot, "abim_blueprint_v1.json");
const blueprint = JSON.parse(fs.readFileSync(blueprintFile, "utf8"));

// Parse "14%" → 0.14, "<2%" → 0.01, anything else → null.
function parseWeight(examPercent) {
  if (!examPercent) return null;
  if (examPercent.startsWith("<")) return 0.01;
  const match = examPercent.match(/^(\d+(?:\.\d+)?)%$/);
  if (!match) return null;
  return parseFloat(match[1]) / 100;
}

// Build flat arrays of concept rows and parent edge rows.
const conceptRows = [];
const parentRows = [];

for (const sys of blueprint.systems) {
  const sysId = sys.system_slug;

  conceptRows.push({
    id: sysId,
    title: sys.system,
    synonyms: [],
    weight: parseWeight(sys.exam_percent),
    level: "system",
    ontology_source: "abim_blueprint",
    ontology_version: "jan_2026",
  });

  for (const sub of sys.subsections) {
    const subId = `${sysId}.${sub.subsection_slug}`;

    conceptRows.push({
      id: subId,
      title: sub.subsection,
      synonyms: [],
      weight: parseWeight(sub.exam_percent),
      level: "subsection",
      ontology_source: "abim_blueprint",
      ontology_version: "jan_2026",
    });
    parentRows.push({ child_id: subId, parent_id: sysId, is_primary: true });

    for (let i = 0; i < sub.topic_slugs.length; i++) {
      const topicId = `${subId}.${sub.topic_slugs[i]}`;
      conceptRows.push({
        id: topicId,
        title: sub.topics[i],
        synonyms: [],
        weight: null,
        level: "topic",
        ontology_source: "abim_blueprint",
        ontology_version: "jan_2026",
      });
      parentRows.push({ child_id: topicId, parent_id: subId, is_primary: true });
    }
  }
}

console.log(
  `Loaded ${blueprint.systems.length} systems → ` +
  `${conceptRows.length} concept rows, ${parentRows.length} parent edges.`,
);

// Upsert concepts in batches of 500 to avoid payload size limits.
const BATCH = 500;
console.log("Upserting concepts...");
for (let i = 0; i < conceptRows.length; i += BATCH) {
  const batch = conceptRows.slice(i, i + BATCH);
  const { error } = await supabase
    .from("concepts")
    .upsert(batch, { onConflict: "id" });
  if (error) {
    console.error(`concepts upsert failed at row ${i}:`, error);
    process.exit(1);
  }
  process.stdout.write(`\r  ${Math.min(i + BATCH, conceptRows.length)}/${conceptRows.length} upserted`);
}
console.log();

// Remove any pre-ABIM concepts that don't belong to this ontology.
// Identifiable by: level='topic' (migration default) AND id contains no dot
// (all ABIM subsection/topic IDs have dots; system-level IDs have level='system').
console.log("Removing pre-ABIM orphan concepts (level=topic, id contains no dot)...");
const { data: orphanRows } = await supabase
  .from("concepts")
  .select("id")
  .eq("level", "topic")
  .not("id", "like", "%.%");

if (orphanRows && orphanRows.length > 0) {
  const orphanIds = orphanRows.map((r) => r.id);
  for (let i = 0; i < orphanIds.length; i += 50) {
    const batch = orphanIds.slice(i, i + 50);
    const { error } = await supabase.from("concepts").delete().in("id", batch);
    if (error) {
      console.error("orphan delete failed:", error);
      process.exit(1);
    }
  }
  console.log(`  Removed ${orphanIds.length} orphan concepts.`);
} else {
  console.log("  None found.");
}

// Replace concept_parents for every child in this seed (delete-then-insert).
const childIds = [...new Set(parentRows.map((r) => r.child_id))];
console.log(`Replacing concept_parents for ${childIds.length} children...`);

// Delete in smaller batches — long slug IDs make URL params large.
const DELETE_BATCH = 50;
for (let i = 0; i < childIds.length; i += DELETE_BATCH) {
  const batch = childIds.slice(i, i + DELETE_BATCH);
  const { error } = await supabase
    .from("concept_parents")
    .delete()
    .in("child_id", batch);
  if (error) {
    console.error(`concept_parents delete failed at chunk ${i}:`, error);
    process.exit(1);
  }
}

// Insert parent edges in batches.
for (let i = 0; i < parentRows.length; i += BATCH) {
  const batch = parentRows.slice(i, i + BATCH);
  const { error } = await supabase.from("concept_parents").insert(batch);
  if (error) {
    console.error(`concept_parents insert failed at row ${i}:`, error);
    process.exit(1);
  }
  process.stdout.write(`\r  ${Math.min(i + BATCH, parentRows.length)}/${parentRows.length} inserted`);
}
console.log();

// Verification counts.
const { count: conceptCount } = await supabase
  .from("concepts")
  .select("*", { count: "exact", head: true });

const { count: edgeCount } = await supabase
  .from("concept_parents")
  .select("*", { count: "exact", head: true });

// Level breakdown.
const { data: levelCounts } = await supabase
  .from("concepts")
  .select("level");

const byLevel = levelCounts.reduce((acc, r) => {
  acc[r.level] = (acc[r.level] ?? 0) + 1;
  return acc;
}, {});

console.log("\n--- Verification ---");
console.log(`Total concepts : ${conceptCount}`);
console.log(`  system       : ${byLevel.system ?? 0}`);
console.log(`  subsection   : ${byLevel.subsection ?? 0}`);
console.log(`  topic        : ${byLevel.topic ?? 0}`);
console.log(`Parent edges   : ${edgeCount}`);
console.log("Done.");
