#!/usr/bin/env node
/**
 * Build-time validator for the sitewide citation counter.
 *
 * The landing page surfaces "X+ citations across Y+ peer-reviewed sources"
 * sourced from `src/lib/citationStats.ts`, which in turn reads
 * `src/data/references.ts`. If references.ts ever drifts (malformed entry,
 * blank citation/label, accidental empty topic array) the counter could
 * silently render "0+ citations across 0+ sources" or fail to type-check.
 *
 * This script imports the real module via tsx and asserts the stats are
 * sane. It runs in `prebuild`, so a broken references file fails CI before
 * the bundle is produced.
 *
 * Exit codes:
 *   0  stats look healthy
 *   1  stats could not be computed or fall below the sanity floor
 */
import { pathToFileURL } from "node:url";
import path from "node:path";
import process from "node:process";

// Sanity floors — well below current real values (700 citations / 470
// sources / 137 topics at time of writing). The point is to catch a
// regression to zero/near-zero, not to lock in a specific number.
const FLOORS = {
  totalCitations: 200,
  uniqueSources: 150,
  topicsWithRefs: 50,
};

function fail(msg) {
  console.error(`\n  ✖ citation-stats check failed: ${msg}\n`);
  process.exit(1);
}

const modPath = path.resolve("src/lib/citationStats.ts");
const refsPath = path.resolve("src/data/references.ts");

let mod;
try {
  mod = await import(pathToFileURL(modPath).href);
} catch (err) {
  fail(`could not import ${modPath}\n     ${err?.stack || err}`);
}

const { citationStats } = mod ?? {};
if (!citationStats || typeof citationStats !== "object") {
  fail("citationStats export is missing or not an object");
}

const required = ["totalCitations", "uniqueSources", "uniqueUrls", "topicsWithRefs"];
for (const key of required) {
  const v = citationStats[key];
  if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
    fail(`citationStats.${key} is not a non-negative number (got ${JSON.stringify(v)})`);
  }
}

for (const [key, floor] of Object.entries(FLOORS)) {
  if (citationStats[key] < floor) {
    fail(
      `citationStats.${key} = ${citationStats[key]} fell below sanity floor ${floor}.\n` +
        `     This usually means ${refsPath} is malformed, empty, or lost a chunk of entries.`,
    );
  }
}

// uniqueSources can never exceed totalCitations.
if (citationStats.uniqueSources > citationStats.totalCitations) {
  fail(
    `uniqueSources (${citationStats.uniqueSources}) > totalCitations ` +
      `(${citationStats.totalCitations}) — impossible, references parse is broken`,
  );
}

console.log(
  `  ✔ citation stats OK — ${citationStats.totalCitations} citations / ` +
    `${citationStats.uniqueSources} sources / ${citationStats.topicsWithRefs} topics`,
);
