#!/usr/bin/env node
/**
 * Audits `sectionSources={{...}}` labels in src/pages/topics/*.tsx against
 * the canonical labels registered in src/data/references.ts (topicReferences).
 *
 * Heuristic:
 *   - Find each topic file's `topicId="..."` (or `topicId: "..."`).
 *   - Extract every string literal inside the `sectionSources={{ ... }}` block.
 *   - Compare against the set of `label` values for that topic in references.ts.
 *   - Anything not present is reported as a mismatch.
 *
 * Exits non-zero if any mismatches are found, gating CI / build / test.
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

/** Parse references.ts → Map<topicId, Set<label>>. */
function loadReferenceLabels() {
  const src = readFileSync(REFS_FILE, "utf8");
  const map = new Map();
  // Match `"topic-id": [ ...block... ],` (block ends at matching `]`)
  const topicRe = /"([a-z0-9-]+)"\s*:\s*\[/g;
  let m;
  while ((m = topicRe.exec(src)) !== null) {
    const topicId = m[1];
    // Walk forward to the matching `]`
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

/** Extract the `sectionSources={{ ... }}` block, balanced braces. */
function extractSectionSourcesBlock(src) {
  const start = src.search(/sectionSources\s*=\s*\{\{/);
  if (start === -1) return null;
  // Position right after the opening `{{`
  const openIdx = src.indexOf("{{", start) + 2;
  let depth = 2; // we've consumed `{{`
  let i = openIdx;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    i++;
  }
  return src.slice(openIdx, i - 2);
}

function extractStringLiterals(block) {
  const out = [];
  // Double-quoted strings, no escaped quotes inside (good enough for citation labels).
  for (const m of block.matchAll(/"([^"\\]+)"/g)) out.push(m[1]);
  return out;
}

const refLabels = loadReferenceLabels();
const files = listTsxFiles(TOPICS_DIR);

const issues = [];
let auditedFiles = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const block = extractSectionSourcesBlock(src);
  if (!block) continue; // Topic doesn't use sectionSources yet — skip.

  const topicId = extractTopicId(src);
  if (!topicId) {
    issues.push({
      file: relative(ROOT, file),
      kind: "missing-topicId",
      detail: "sectionSources present but topicId could not be parsed.",
    });
    continue;
  }

  const labels = refLabels.get(topicId);
  if (!labels) {
    issues.push({
      file: relative(ROOT, file),
      kind: "missing-references-entry",
      detail: `No entry for "${topicId}" in src/data/references.ts.`,
    });
    continue;
  }

  auditedFiles++;
  const used = extractStringLiterals(block);
  const seen = new Set();
  for (const label of used) {
    if (seen.has(label)) continue;
    seen.add(label);
    if (!labels.has(label)) {
      issues.push({
        file: relative(ROOT, file),
        kind: "label-mismatch",
        detail: `"${label}" not in references.ts for "${topicId}". Known: ${[...labels].map((l) => `"${l}"`).join(", ")}`,
      });
    }
  }
}

if (issues.length === 0) {
  console.log(
    `✓ No sectionSources label mismatches across ${auditedFiles} audited topic pages.`,
  );
  process.exit(0);
}

console.error("✗ sectionSources label issues found:\n");
for (const { file, kind, detail } of issues) {
  console.error(`  [${kind}] ${file}`);
  console.error(`      ${detail}`);
}
console.error(
  `\nFix: use the exact short label from src/data/references.ts (e.g. "NAP Reports", "BJA Educ 2017"), or add the missing entry/label to references.ts.`,
);
process.exit(1);
