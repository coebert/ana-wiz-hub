#!/usr/bin/env node
/**
 * Audit + auto-patch missing references entries.
 *
 * For every src/pages/topics/*.tsx file:
 *   - Collect all inline `cites:[...]` labels (across workedExamples, keyPoints,
 *     objectives, diagrams, etc.).
 *   - Look up the topic's entry in src/data/references.ts (topicReferences).
 *   - For each label not registered for that topic, try to REUSE an identical
 *     label registered for any OTHER topic (most labels recur — e.g.
 *     "BJA Educ 2018", "Ganong Ch.5"). If found, copy that Reference object
 *     into the topic's array.
 *   - For labels with no existing entry anywhere, append a placeholder
 *     `{ label, citation: label }` and report it for manual curation.
 *
 * The script rewrites src/data/references.ts in place and prints a per-topic
 * diff summary distinguishing REUSED vs PLACEHOLDER additions.
 */
import fs from "node:fs";
import path from "node:path";

const TOPIC_DIR = "src/pages/topics";
const REFS_FILE = "src/data/references.ts";

// ---------- Read topic files: collect inline cites per topicId ----------
function collectInlineCitesPerTopic() {
  const out = new Map(); // topicId → Set<label>
  for (const f of fs.readdirSync(TOPIC_DIR).filter((x) => x.endsWith(".tsx"))) {
    const src = fs.readFileSync(path.join(TOPIC_DIR, f), "utf8");
    const topicId = src.match(/topicId="([\w-]+)"/)?.[1];
    if (!topicId) continue;
    const set = out.get(topicId) ?? new Set();
    for (const m of src.matchAll(/cites:\s*\[([^\]]*)\]/g)) {
      for (const lm of m[1].matchAll(/"([^"]+)"/g)) set.add(lm[1]);
    }
    out.set(topicId, set);
  }
  return out;
}

// ---------- Parse references.ts: ranges + labels per topic + label registry ----------
function parseReferences(src) {
  // Map<topicId, { startBlock, endBlock, labels:Set<string>, entries:Reference[] }>
  const topics = new Map();
  // Map<label, Reference-literal-source-string>
  const registry = new Map();

  const topicRe = /"([a-z0-9-]+)"\s*:\s*\[/g;
  let m;
  while ((m = topicRe.exec(src)) !== null) {
    const topicId = m[1];
    const arrOpen = topicRe.lastIndex; // just after '['
    let depth = 1, i = arrOpen;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      i++;
    }
    const arrClose = i - 1; // index of matching ']'
    const block = src.slice(arrOpen, arrClose);

    // Extract each `{ ... }` entry at depth 1 inside the array.
    const entries = [];
    let d = 0, start = -1;
    for (let j = 0; j < block.length; j++) {
      const ch = block[j];
      if (ch === "{") {
        if (d === 0) start = j;
        d++;
      } else if (ch === "}") {
        d--;
        if (d === 0 && start !== -1) {
          const literal = block.slice(start, j + 1);
          const labelMatch = literal.match(/label\s*:\s*"([^"]+)"/);
          if (labelMatch) {
            entries.push({ label: labelMatch[1], literal });
            if (!registry.has(labelMatch[1])) registry.set(labelMatch[1], literal);
          }
          start = -1;
        }
      }
    }
    topics.set(topicId, {
      arrOpen,
      arrClose,
      labels: new Set(entries.map((e) => e.label)),
      entries,
    });
  }
  return { topics, registry };
}

// ---------- Main ----------
const refsSrc = fs.readFileSync(REFS_FILE, "utf8");
const inlineByTopic = collectInlineCitesPerTopic();
const { topics, registry } = parseReferences(refsSrc);

// Compute additions per topic (preserve original order so byte-offset patching works)
const additionsByTopic = new Map(); // topicId → Array<{ label, literal, source: "reused"|"placeholder" }>
let totalReused = 0, totalPlaceholder = 0, topicsTouched = 0;

for (const [topicId, t] of topics) {
  const inline = inlineByTopic.get(topicId);
  if (!inline) continue;
  const missing = [...inline].filter((l) => !t.labels.has(l));
  if (missing.length === 0) continue;

  const adds = [];
  for (const label of missing) {
    if (registry.has(label)) {
      adds.push({ label, literal: registry.get(label), source: "reused" });
      totalReused++;
    } else {
      const literal = `{ label: ${JSON.stringify(label)}, citation: ${JSON.stringify(label)} }`;
      adds.push({ label, literal, source: "placeholder" });
      totalPlaceholder++;
    }
  }
  additionsByTopic.set(topicId, adds);
  topicsTouched++;
}

if (additionsByTopic.size === 0) {
  console.log("✓ No missing references — every inline cite resolves.");
  process.exit(0);
}

// Apply edits from the BOTTOM up so earlier offsets stay valid.
const sortedTopics = [...additionsByTopic.entries()].sort(
  (a, b) => topics.get(b[0]).arrClose - topics.get(a[0]).arrClose,
);

let newSrc = refsSrc;
for (const [topicId, adds] of sortedTopics) {
  const { arrClose } = topics.get(topicId);
  // Build insertion text. Insert before the closing ']'. Match indentation of preceding lines.
  // Find indent of the preceding entry by looking back for a "\n    {" style.
  const before = newSrc.slice(0, arrClose);
  const indentMatch = before.match(/\n([ \t]+)\{[^{}]*label:[^{}]*\}[^[]*$/);
  const indent = indentMatch ? indentMatch[1] : "    ";
  // Ensure preceding entry ends with ','
  const trimmedBefore = before.replace(/\s+$/, "");
  const needsComma = !trimmedBefore.endsWith(",") && !trimmedBefore.endsWith("[");
  const lines = adds.map((a) => `${indent}${a.literal},`).join("\n");
  const insert = `${needsComma ? "," : ""}\n${lines}\n${indent.slice(0, Math.max(0, indent.length - 2))}`;
  newSrc = trimmedBefore + insert + newSrc.slice(arrClose);
}

fs.writeFileSync(REFS_FILE, newSrc, "utf8");

console.log(`fix-missing-references: patched ${topicsTouched} topics — ${totalReused} reused, ${totalPlaceholder} placeholder.\n`);
const ORDER = [...additionsByTopic.keys()].sort();
for (const topicId of ORDER) {
  const adds = additionsByTopic.get(topicId);
  console.log(`  ${topicId}  (+${adds.length})`);
  for (const a of adds) {
    const tag = a.source === "reused" ? "↻ reused    " : "✎ PLACEHOLDER";
    console.log(`    ${tag}  "${a.label}"`);
  }
}

if (totalPlaceholder > 0) {
  console.log(
    `\n⚠ ${totalPlaceholder} placeholder entry/entries added (label-only). ` +
    `Curate these in ${REFS_FILE} — search for entries where citation === label.`,
  );
}
