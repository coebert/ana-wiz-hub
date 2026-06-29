#!/usr/bin/env node
/**
 * Audits inline `cites: ["Label", ...]` arrays in topic pages against the
 * canonical labels registered in src/data/references.ts for that topic.
 *
 * Complements check-section-sources.mjs by extending the same label-integrity
 * guarantee to every per-bullet / per-keypoint citation, not just the
 * top-level sectionSources prop.
 *
 * Heuristic:
 *   - Find each topic file's `topicId="..."`.
 *   - Extract every `cites: [ ... ]` literal array.
 *   - Every double-quoted string inside must exist as a `label` for that
 *     topic in references.ts.
 *
 * Exits non-zero if any mismatches are found.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = join(ROOT, "src", "pages", "topics");
const REFS_FILE = join(ROOT, "src", "data", "references.ts");

function listTsxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listTsxFiles(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

function loadReferenceLabels() {
  const src = readFileSync(REFS_FILE, "utf8");
  const map = new Map();
  const topicRe = /"([a-z0-9-]+)"\s*:\s*\[/g;
  let m;
  while ((m = topicRe.exec(src)) !== null) {
    const topicId = m[1];
    let depth = 1;
    let i = topicRe.lastIndex;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      i++;
    }
    const block = src.slice(topicRe.lastIndex, i - 1);
    const labels = new Set();
    for (const lm of block.matchAll(/label\s*:\s*"([^"]+)"/g)) {
      labels.add(lm[1]);
    }
    map.set(topicId, labels);
  }
  return map;
}

function extractTopicId(src) {
  const m =
    src.match(/topicId\s*=\s*"([^"]+)"/) ||
    src.match(/topicId\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

/** Extract every `cites: [ ... ]` block (balanced brackets). */
function extractCitesArrays(src) {
  const out = [];
  const re = /\bcites\s*:\s*\[/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let depth = 1;
    let i = re.lastIndex;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      i++;
    }
    out.push(src.slice(re.lastIndex, i - 1));
  }
  return out;
}

const refLabels = loadReferenceLabels();
const files = listTsxFiles(TOPICS_DIR);

const issues = [];
let auditedFiles = 0;
let auditedArrays = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const arrays = extractCitesArrays(src);
  if (arrays.length === 0) continue;

  const topicId = extractTopicId(src);
  if (!topicId) continue; // cites can also live in subcomponents — skip those.

  const labels = refLabels.get(topicId);
  if (!labels) {
    issues.push({
      file: relative(ROOT, file),
      kind: "missing-references-entry",
      detail: `cites:[…] used but no entry for "${topicId}" in src/data/references.ts.`,
    });
    continue;
  }

  auditedFiles++;
  const seen = new Set();
  for (const arr of arrays) {
    auditedArrays++;
    for (const lm of arr.matchAll(/"([^"\\]+)"/g)) {
      const label = lm[1];
      const key = `${label}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!labels.has(label)) {
        issues.push({
          file: relative(ROOT, file),
          kind: "label-mismatch",
          detail: `cites label "${label}" not in references.ts for "${topicId}". Known: ${[...labels].map((l) => `"${l}"`).join(", ")}`,
        });
      }
    }
  }
}

if (issues.length === 0) {
  console.log(
    `✓ No cites-label mismatches across ${auditedFiles} topic pages (${auditedArrays} cites:[…] arrays).`,
  );
  process.exit(0);
}

console.error("✗ cites label issues found:\n");
for (const { file, kind, detail } of issues) {
  console.error(`  [${kind}] ${file}`);
  console.error(`      ${detail}`);
}
console.error(
  '\nFix: use the exact short label from src/data/references.ts (e.g. "NAP4 2011"), or add the missing entry/label to references.ts.',
);
process.exit(1);
