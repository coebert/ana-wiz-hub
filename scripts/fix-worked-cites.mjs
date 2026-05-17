// Auto-fix script: normalize each worked-example cite to the canonical label
// from src/data/references.ts (topic-scoped first, then global). Prints a
// per-topic diff summary and a totals line. Pass --dry to preview without
// writing.
import fs from "node:fs";
import path from "node:path";

const DRY = process.argv.includes("--dry");
const TOPIC_DIR = "src/pages/topics";
const refsSrc = fs.readFileSync("src/data/references.ts", "utf8");

// Parse references.ts → refMap[topicId] = [labels], globalLabels = Set
const refMap = {};
const globalLabels = new Set();
const blockRe = /"([\w-]+)"\s*:\s*\[([\s\S]*?)\n\s*\]\s*,/g;
let m;
while ((m = blockRe.exec(refsSrc))) {
  const labels = [...m[2].matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
  refMap[m[1]] = labels;
  labels.forEach((l) => globalLabels.add(l));
}
const ALL_LABELS = [...globalLabels];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Resolve a cite to a canonical label.
// Priority: exact in topic refs → fuzzy in topic refs → exact global → fuzzy global → null
function resolve(label, topicRefs) {
  if (topicRefs.includes(label)) return { label, how: "exact" };
  const n = norm(label);

  const tFuzzy = topicRefs.filter((l) => {
    const ln = norm(l);
    return ln === n || ln.startsWith(n) || n.startsWith(ln);
  });
  if (tFuzzy.length === 1) return { label: tFuzzy[0], how: "topic-fuzzy" };

  if (globalLabels.has(label)) return { label, how: "exact-global" };

  const gFuzzy = ALL_LABELS.filter((l) => norm(l) === n);
  if (gFuzzy.length === 1) return { label: gFuzzy[0], how: "global-fuzzy" };

  return null;
}

const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));
const summary = []; // {file, topicId, replacements:[{from,to,how}], unresolved:[]}
let totalRepl = 0, totalUnres = 0, filesChanged = 0, filesScanned = 0;

for (const f of files) {
  const file = path.join(TOPIC_DIR, f);
  const src = fs.readFileSync(file, "utf8");
  const workedMatch = src.match(/const \w+WorkedExamples[\s\S]*?\n\];/);
  if (!workedMatch) continue;
  filesScanned++;

  const topicId = src.match(/topicId="([\w-]+)"/)?.[1] || "";
  const topicRefs = refMap[topicId] || [];
  const block = workedMatch[0];

  const repl = [];
  const unres = [];

  const newBlock = block.replace(/cites:\s*\[([^\]]*)\]/g, (full, inner) => {
    const labels = [...inner.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    const out = [];
    for (const lbl of labels) {
      const r = resolve(lbl, topicRefs);
      if (r) {
        if (r.label !== lbl) repl.push({ from: lbl, to: r.label, how: r.how });
        if (!out.includes(r.label)) out.push(r.label);
      } else {
        unres.push(lbl);
        if (!out.includes(lbl)) out.push(lbl);
      }
    }
    return `cites: [${out.map((x) => JSON.stringify(x)).join(", ")}]`;
  });

  if (newBlock !== block) {
    if (!DRY) fs.writeFileSync(file, src.replace(block, newBlock));
    filesChanged++;
  }
  if (repl.length || unres.length) {
    summary.push({ file: f, topicId, repl, unres });
    totalRepl += repl.length;
    totalUnres += unres.length;
  }
}

// Report
console.log(`Worked-example cite normalisation${DRY ? " (dry run)" : ""}`);
console.log(`Scanned ${filesScanned} topic files with worked examples\n`);

for (const s of summary) {
  console.log(`\n${s.file}  (topicId=${s.topicId})`);
  if (s.repl.length) {
    console.log("  replacements:");
    s.repl.forEach((r) => console.log(`    "${r.from}"  →  "${r.to}"  [${r.how}]`));
  }
  if (s.unres.length) {
    console.log("  unresolved (left as-is, not in references.ts):");
    [...new Set(s.unres)].forEach((u) => console.log(`    ! "${u}"`));
  }
}

console.log("\n──────── Summary ────────");
console.log(`Files with worked examples : ${filesScanned}`);
console.log(`Files modified             : ${filesChanged}`);
console.log(`Cite labels rewritten      : ${totalRepl}`);
console.log(`Cite labels still unresolved: ${totalUnres}`);
process.exit(totalUnres === 0 ? 0 : 1);
