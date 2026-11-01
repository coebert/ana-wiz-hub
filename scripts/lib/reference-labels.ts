import { topicReferences } from "../../src/data/references";

/** Import the executed pool: imports, merges and appends are authoritative. */
export function referenceLabels(pool = topicReferences): Map<string, Set<string>> {
  return new Map(Object.entries(pool).map(([id, refs]) => [id, new Set(refs.map(ref => ref.label))]));
}