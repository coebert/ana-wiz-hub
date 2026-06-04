import { topicReferences } from "@/data/references";

/**
 * Sitewide citation stats, computed once at module load from
 * `src/data/references.ts`. Stays in sync automatically as references are
 * added or removed — no hand-curated numbers to drift out of date.
 */
function compute() {
  let totalCitations = 0;
  const uniqueSources = new Set<string>();
  const uniqueUrls = new Set<string>();
  const topicsWithRefs = new Set<string>();

  for (const [topicId, refs] of Object.entries(topicReferences)) {
    if (!refs || refs.length === 0) continue;
    topicsWithRefs.add(topicId);
    for (const r of refs) {
      totalCitations += 1;
      // Normalise on the citation string so the same paper cited via two
      // different short labels still collapses to one source.
      const key = (r.citation || r.label || r.url || "").trim().toLowerCase();
      if (key) uniqueSources.add(key);
      if (r.url) uniqueUrls.add(r.url);
    }
  }

  return {
    totalCitations,
    uniqueSources: uniqueSources.size,
    uniqueUrls: uniqueUrls.size,
    topicsWithRefs: topicsWithRefs.size,
  };
}

export const citationStats = compute();
