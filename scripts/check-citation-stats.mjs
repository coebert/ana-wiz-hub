/**
 * Validates `src/lib/citationStats.json` (run via tsx in prebuild).
 * Recomputes the stats from the runtime reference registry and curriculum, and fails if the generated JSON
 * is stale, plus loss-detection floors so a broken references parse cannot silently drop to near-zero.
 * Counts are bibliography entries / registered topics — not verification of source support.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { computeFromRepo } from "./lib/compute-citation-stats.ts";

const FLOORS = { totalReferenceEntries: 200, uniqueReferenceTexts: 150, registeredTopics: 50, registeredTopicsWithReferences: 50 };
const KEYS = ["totalReferenceEntries", "uniqueReferenceTexts", "uniqueUrls", "referencePoolsWithReferences", "registeredTopics", "registeredTopicsWithReferences"];

function fail(msg) {
  console.error(`\n  ✖ citation-stats check failed: ${msg}\n`);
  process.exit(1);
}

let json;
try { json = JSON.parse(readFileSync(path.resolve("src/lib/citationStats.json"), "utf8")); }
catch (e) { fail(`cannot read citationStats.json: ${e}`); }
const live = await computeFromRepo();
for (const k of KEYS) {
  if (typeof json[k] !== "number" || !Number.isFinite(json[k]) || json[k] < 0) fail(`citationStats.${k} is not a non-negative number`);
  if (json[k] !== live[k]) fail(`citationStats.${k} = ${json[k]} is stale; registry recomputes ${live[k]} — run tsx scripts/generate-citation-stats.ts`);
}
for (const [k, floor] of Object.entries(FLOORS)) if (live[k] < floor) fail(`${k} = ${live[k]} fell below loss-detection floor ${floor}`);
if (live.uniqueReferenceTexts > live.totalReferenceEntries) fail("uniqueReferenceTexts > totalReferenceEntries — parse broken");
if (live.registeredTopicsWithReferences > live.registeredTopics) fail("registeredTopicsWithReferences > registeredTopics");
console.log(`  ✔ citation stats OK — ${live.totalReferenceEntries} reference entries / ${live.registeredTopics} registered topics (${live.registeredTopicsWithReferences} with references)`);
