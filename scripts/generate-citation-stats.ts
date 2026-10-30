/**
 * Precomputes reference-list stats into `src/lib/citationStats.json` (prebuild/predev).
 * These are bibliography-entry counts and registered-topic counts — not inline-citation occurrences,
 * source-support verification or peer-review status.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { computeFromRepo } from "./lib/compute-citation-stats";

const out = await computeFromRepo();
writeFileSync(path.resolve("src/lib/citationStats.json"), JSON.stringify(out, null, 2) + "\n");
console.log(
  `citationStats.json: ${out.totalReferenceEntries} reference entries, ${out.uniqueReferenceTexts} distinct reference texts, ` +
    `${out.uniqueUrls} URLs, ${out.registeredTopics} registered topics (${out.registeredTopicsWithReferences} with references), ` +
    `${out.referencePoolsWithReferences} reference pools`,
);
