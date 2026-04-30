// Tiny helpers for reading Supabase JS aggregate-relation results.
//
// `select('cluster_memberships (count)')` returns the count nested as a
// one-element array (`{ cluster_memberships: [{ count: number }] }`) which
// supabase-js types as a full row relation. The `as unknown as ...` double
// cast that pattern requires shows up in a few read paths; consolidate it
// here so the call sites stay readable.

type CountAggregate = readonly { count: number }[]

/**
 * Read a `(count)` aggregate from a one-to-many relation Supabase returned.
 * Returns 0 when the relation key is missing, the array is empty, or the
 * count happens to be undefined.
 */
export function relationCount(rel: unknown): number {
  return (rel as CountAggregate | null | undefined)?.[0]?.count ?? 0
}
