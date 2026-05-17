#!/usr/bin/env node
/**
 * Auto-fix missing sectionSources keys in topic pages.
 *
 * For each src/pages/topics/*.tsx file:
 *   - Detect inline `cites:[...]` blocks owned by `workedExamples` / `keyPoints`
 *     / `objectives` / `diagrams`.
 *   - Parse the existing `sectionSources={{ ... }}` prop.
 *   - For any owner whose cites are not represented as a key in sectionSources,
 *     append a new `section: ["Label", ...]` entry containing the deduped set
 *     of inline labels (sorted by first appearance).
 *
 * Reports a per-topic diff summary and writes changes in place. Idempotent.
 */
import fs from "node:fs";
import path from "node:path";

const TOPIC_DIR = "src/pages/topics";

const SECTION_OWNERS = [
  { re: /workedExamples\s*[:=]/g, key: "workedExamples" },
  { re: /keyPoints\s*[:=]/g, key: "keyPoints" },
  { re: /objectives\s*[:=]/g, key: "objectives" },
  { re: /diagrams\s*[:=]/g, key: "diagrams" },
];

function ownerOf(src, idx) {
  let best = null;
  let bestPos = -1;
  for (const { re, key } of SECTION_OWNERS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) && m.index < idx) {
      if (m.index > bestPos) {
        bestPos = m.index;
        best = key;
      }
    }
  }
  return best;
}

function findSectionSourcesRange(src) {
  const start = src.search(/sectionSources\s*=\s*\{\{/);
  if (start === -1) return null;
  const openIdx = src.indexOf("{{", start) + 2;
  let depth = 2;
  let i = openIdx;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    i++;
  }
  // block content: openIdx .. i-2 ; closing "}}" at i-2..i
  return { openIdx, contentEnd: i - 2, closeEnd: i };
}

function parseExistingKeys(block) {
  const keys = new Set();
  for (const m of block.matchAll(/(\w+)\s*:\s*\[/g)) keys.add(m[1]);
  return keys;
}

const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));
let totalFiles = 0;
let totalAdded = 0;
const changes = [];

for (const f of files) {
  const file = path.join(TOPIC_DIR, f);
  let src = fs.readFileSync(file, "utf8");
  const range = findSectionSourcesRange(src);
  if (!range) continue;

  const block = src.slice(range.openIdx, range.contentEnd);
  const existingKeys = parseExistingKeys(block);

  // Collect cites by owner section
  const bySection = new Map();
  const citeRe = /cites:\s*\[([^\]]*)\]/g;
  let cm;
  while ((cm = citeRe.exec(src))) {
    const owner = ownerOf(src, cm.index);
    if (!owner) continue;
    const labels = [...cm[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    if (!bySection.has(owner)) bySection.set(owner, []);
    for (const l of labels) {
      if (!bySection.get(owner).includes(l)) bySection.get(owner).push(l);
    }
  }

  const additions = [];
  for (const [section, labels] of bySection) {
    if (existingKeys.has(section)) continue;
    if (labels.length === 0) continue;
    additions.push({ section, labels });
  }
  if (additions.length === 0) continue;

  // Build new entries text. Try to match indentation from existing block.
  const indentMatch = block.match(/\n([ \t]+)\w+\s*:/);
  const indent = indentMatch ? indentMatch[1] : "          ";
  const newEntries = additions
    .map(
      ({ section, labels }) =>
        `${indent}${section}: [${labels.map((l) => `"${l}"`).join(", ")}],`,
    )
    .join("\n");

  // Ensure trailing comma/newline hygiene: insert just before closing `}}`.
  const before = src.slice(0, range.contentEnd);
  const after = src.slice(range.contentEnd);
  const trimmedBefore = before.replace(/\s+$/, "");
  // Make sure last existing entry ends with a comma
  const beforeWithComma = trimmedBefore.endsWith(",") || trimmedBefore.endsWith("{")
    ? trimmedBefore
    : trimmedBefore + ",";
  const newSrc = `${beforeWithComma}\n${newEntries}\n${indent.replace(/  $/, "")}${after}`;

  fs.writeFileSync(file, newSrc, "utf8");
  totalFiles++;
  totalAdded += additions.length;
  changes.push({ file: f, additions });
}

console.log(`fix-section-sources: updated ${totalFiles} files, added ${totalAdded} sectionSources keys.\n`);
for (const c of changes) {
  console.log(`  ${c.file}`);
  for (const a of c.additions) {
    console.log(`    + ${a.section}: ${a.labels.length} label(s)  (${a.labels.slice(0, 3).map((l) => `"${l}"`).join(", ")}${a.labels.length > 3 ? ", …" : ""})`);
  }
}
