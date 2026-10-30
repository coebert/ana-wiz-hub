import stats from "./citationStats.json";

/**
 * Generated reference-list stats (scripts/generate-citation-stats.ts, prebuild/predev).
 * Bibliography-entry and registered-topic counts only — not inline-citation occurrences,
 * source-support verification or peer-review status.
 */
export const citationStats = stats as {
  totalReferenceEntries: number;
  uniqueReferenceTexts: number;
  uniqueUrls: number;
  referencePoolsWithReferences: number;
  registeredTopics: number;
  registeredTopicsWithReferences: number;
};

/** Floor to a display step; zero stays zero (never a minimum such as 10+). */
export const roundDown = (n: number, step = 10) => Math.floor(Math.max(0, n) / step) * step;
