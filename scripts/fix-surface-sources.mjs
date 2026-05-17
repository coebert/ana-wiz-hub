#!/usr/bin/env node
/**
 * Auto-surface inline cite labels into sectionSources arrays.
 *
 * For each src/pages/topics/*.tsx file with a `sectionSources={{ ... }}` prop:
 *   - Collect inline `cites:[...]` per owner section (workedExamples / keyPoints
 *     / objectives / diagrams).
 *   - For each owner that is ALREADY a key in sectionSources, append any
 *     inline labels that aren't already in that array.
 *
 * Pairs with fix-section-sources.mjs (which creates missing keys) — this
 * one populates labels into keys that exist. Idempotent.
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
  let best = null, bestPos = -1;
  for (const { re, key } of SECTION_OWNERS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) && m.index < idx) {
      if (m.index > bestPos) { bestPos = m.index; best = key; }
    }
  }
  return best;
}

function findSectionSourcesRange(src) {
  const start = src.search(/sectionSources\s*=\s*\{\{/);
  if (start === -1) return null;
  const openIdx = src.indexOf("{{", start) + 2;
  let depth = 2, i = openIdx;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    i++;
  }
  return { openIdx, contentEnd: i - 2 };
}

const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));
let touched = 0, totalAdded = 0;
const changes = [];

for (const f of files) {
  const file = path.join(TOPIC_DIR, f);
  let src = fs.readFileSync(file, "utf8");
  const range = findSectionSourcesRange(src);
  if (!range) continue;

  // Collect inline cites by owner
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
  if (bySection.size === 0) continue;

  // For each owner, find its key's array within sectionSources block and
  // append missing labels. Edit from end of file backward to keep offsets.
  const edits = []; // { pos, insertText }
  const block = src.slice(range.openIdx, range.contentEnd);
  const additions = [];
  for (const [section, inlineLabels] of bySection) {
    // Find `section: [ ... ]` within block (depth-aware on [])
    const keyRe = new RegExp(`\\b${section}\\s*:\\s*\\[`, "g");
    const km = keyRe.exec(block);
    if (!km) continue; // key absent — fix-section-sources handles that
    const arrStart = km.index + km[0].length; // just after '['
    let depth = 1, j = arrStart;
    while (j < block.length && depth > 0) {
      const ch = block[j];
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      j++;
    }
    const arrEnd = j - 1; // index of ']' within block
    const arrText = block.slice(arrStart, arrEnd);
    const existing = new Set([...arrText.matchAll(/"([^"]+)"/g)].map((m) => m[1]));
    const toAdd = inlineLabels.filter((l) => !existing.has(l));
    if (toAdd.length === 0) continue;

    // Insert before the closing ']'. Detect if existing array uses newlines.
    const insertAt = range.openIdx + arrEnd; // absolute index of ']'
    const multiline = arrText.includes("\n");
    let insertText;
    if (multiline) {
      // Use 2 spaces deeper than the line containing `section:`
      const lineStart = block.lastIndexOf("\n", km.index) + 1;
      const lineIndent = (block.slice(lineStart, km.index).match(/^[ \t]*/) || [""])[0];
      const inner = lineIndent + "  ";
      const trimmed = arrText.replace(/\s+$/, "");
      const needsComma = trimmed.length > 0 && !trimmed.endsWith(",");
      insertText =
        (needsComma ? "," : "") +
        "\n" +
        toAdd.map((l) => `${inner}"${l}",`).join("\n") +
        "\n" +
        lineIndent;
    } else {
      const trimmed = arrText.replace(/\s+$/, "");
      const needsComma = trimmed.length > 0 && !trimmed.endsWith(",");
      insertText = (needsComma ? ", " : "") + toAdd.map((l) => `"${l}"`).join(", ");
    }
    edits.push({ pos: insertAt, insertText });
    additions.push({ section, labels: toAdd });
  }

  if (edits.length === 0) continue;
  edits.sort((a, b) => b.pos - a.pos);
  for (const e of edits) {
    src = src.slice(0, e.pos) + e.insertText + src.slice(e.pos);
  }
  fs.writeFileSync(file, src, "utf8");
  touched++;
  totalAdded += additions.reduce((n, a) => n + a.labels.length, 0);
  changes.push({ file: f, additions });
}

console.log(`fix-surface-sources: updated ${touched} files, surfaced ${totalAdded} labels.\n`);
for (const c of changes) {
  console.log(`  ${c.file}`);
  for (const a of c.additions) {
    console.log(`    + ${a.section}: ${a.labels.map((l) => `"${l}"`).join(", ")}`);
  }
}
