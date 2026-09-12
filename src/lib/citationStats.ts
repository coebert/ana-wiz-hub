import stats from "./citationStats.json";

/**
 * Sitewide citation stats for the landing page counters.
 *
 * Precomputed at build time by `scripts/generate-citation-stats.ts` (wired
 * into `prebuild`/`predev`) into `citationStats.json`, so the client bundle
 * doesn't pull in the full references dataset just to show three numbers.
 * Stays in sync automatically as references are added or removed.
 */
export const citationStats = stats as {
  totalCitations: number;
  uniqueSources: number;
  uniqueUrls: number;
  topicsWithRefs: number;
};
