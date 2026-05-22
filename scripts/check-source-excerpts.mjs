#!/usr/bin/env node
/**
 * Source-excerpt coverage reporter.
 *
 * Walks src/data/references.ts and reports, per topic, how many
 * Reference entries have a verbatim `excerpt` populated vs. the total.
 * Reference entries should ship a short verbatim source excerpt that
 * backs the dose, threshold, value, or recommendation being cited —
 * see the docstring on the `Reference` interface for authoring rules.
 *
 * Run: `node scripts/check-source-excerpts.mjs`
 *
 * The script always exits 0 — it is intentionally a coverage report,
 * not a CI gate, so excerpts can be backfilled incrementally without
 * blocking every PR. The CI gate (verify-audit-fixes) already requires
 * a citation to exist; this report tracks the deeper "show the reader
 * the actual quoted sentence" coverage on top of that.
 */
import fs from "node:fs";
import path from "node:path";

const FILE = "src/data/references.ts";
const src = fs.readFileSync(FILE, "utf8");

// Topic blocks look like:
//   "topic-id": [
//     { label: "...", citation: "...", url: "...", excerpt: "..." },
//     ...
//   ],
const topicRx = /"([a-z0-9-]+)":\s*\[([\s\S]*?)\n\s*\],/g;
const refRx = /\{\s*label:\s*"([^"]+)"[\s\S]*?\}/g;

const rows = [];
let totalRefs = 0;
let totalWithExcerpt = 0;

let m;
while ((m = topicRx.exec(src)) !== null) {
  const topic = m[1];
  const block = m[2];
  let r;
  let count = 0;
  let withExcerpt = 0;
  const missing = [];
  refRx.lastIndex = 0;
  while ((r = refRx.exec(block)) !== null) {
    count++;
    const obj = r[0];
    if (/\bexcerpt\s*:/.test(obj)) withExcerpt++;
    else missing.push(r[1]);
  }
  if (count === 0) continue;
  rows.push({ topic, count, withExcerpt, missing });
  totalRefs += count;
  totalWithExcerpt += withExcerpt;
}

rows.sort((a, b) => a.withExcerpt / a.count - b.withExcerpt / b.count);

const pct = (n, d) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));

const lines = [
  "# Source-excerpt coverage",
  "",
  `Overall: ${totalWithExcerpt} / ${totalRefs} references have a verbatim excerpt (${pct(totalWithExcerpt, totalRefs)}%).`,
  "",
  "## Topics with the lowest coverage (first 40)",
  "",
];
for (const row of rows.slice(0, 40)) {
  lines.push(
    `- **${row.topic}** — ${row.withExcerpt}/${row.count} (${pct(row.withExcerpt, row.count)}%)` +
      (row.missing.length > 0
        ? `  · missing: ${row.missing.slice(0, 6).join(", ")}${row.missing.length > 6 ? `, +${row.missing.length - 6} more` : ""}`
        : ""),
  );
}

const out = lines.join("\n");
try {
  fs.mkdirSync("/mnt/documents", { recursive: true });
  fs.writeFileSync("/mnt/documents/source-excerpt-coverage.md", out);
} catch {
  /* sandbox-only */
}
console.log(out);
console.log(
  `\nWrote /mnt/documents/source-excerpt-coverage.md (${rows.length} topics scanned).`,
);
process.exit(0);
