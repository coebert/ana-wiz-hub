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
