// Full curriculum citation + sectionSources audit
import fs from "node:fs";
import path from "node:path";

const TOPIC_DIR = "src/pages/topics";
const refsSrc = fs.readFileSync("src/data/references.ts", "utf8");

// Build per-topic and global label maps
const refMap = {};
const globalLabels = new Set();
const blockRe = /"([\w-]+)"\s*:\s*\[([\s\S]*?)\n\s*\]\s*,/g;
let m;
while ((m = blockRe.exec(refsSrc))) {
  const labels = [...m[2].matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
  refMap[m[1]] = labels;
  labels.forEach((l) => globalLabels.add(l));
}

const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));
const report = {
  unresolvedCites: [],          // cite label not in topic refs nor global
  missingSectionSources: [],    // file has no sectionSources={{...}} at all
  citesNotInSectionSources: [], // worked-example/keyPoints cite not in topic's sectionSources
  noTopicId: [],
  noRefsForTopicId: [],
};

let totalCites = 0;

for (const f of files) {
  const src = fs.readFileSync(path.join(TOPIC_DIR, f), "utf8");
  const topicId = src.match(/topicId="([\w-]+)"/)?.[1];
  if (!topicId) { report.noTopicId.push(f); continue; }
  const topicRefs = refMap[topicId];
  if (!topicRefs) report.noRefsForTopicId.push({ f, topicId });

  // sectionSources block
  const ssBlock = src.match(/sectionSources=\{\{([\s\S]*?)\n\s*\}\}/);
  if (!ssBlock) {
    report.missingSectionSources.push({ f, topicId });
    continue;
  }
  const ssLabels = new Set([...ssBlock[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));

  // All cite labels in the file
  const cites = [];
  const citeRe = /cites:\s*\[([^\]]*)\]/g;
  let c;
  while ((c = citeRe.exec(src))) {
    [...c[1].matchAll(/"([^"]+)"/g)].forEach((x) => cites.push(x[1]));
  }
  totalCites += cites.length;

  for (const lbl of cites) {
    const inTopicRefs = topicRefs?.includes(lbl);
    const inGlobal = globalLabels.has(lbl);
    if (!inTopicRefs && !inGlobal) {
      report.unresolvedCites.push({ f, topicId, label: lbl });
    }
    if (!ssLabels.has(lbl)) {
      report.citesNotInSectionSources.push({ f, topicId, label: lbl });
    }
  }
}

console.log(`Scanned ${files.length} topic files, ${totalCites} cite labels.\n`);
console.log("=== Topics with no topicId prop ===");
report.noTopicId.forEach((f) => console.log("  -", f));
console.log(`\n=== Topics with no references.ts entry (topicId not registered) === (${report.noRefsForTopicId.length})`);
report.noRefsForTopicId.slice(0, 50).forEach((x) => console.log(`  - ${x.f} (topicId=${x.topicId})`));
console.log(`\n=== Topics missing sectionSources={{...}} === (${report.missingSectionSources.length})`);
report.missingSectionSources.forEach((x) => console.log(`  - ${x.f} (topicId=${x.topicId})`));
console.log(`\n=== Unresolved cite labels (not in references.ts at all) === (${report.unresolvedCites.length})`);
report.unresolvedCites.slice(0, 100).forEach((x) => console.log(`  - ${x.f} :: "${x.label}"`));
console.log(`\n=== Cite labels not listed in their topic's sectionSources === (${report.citesNotInSectionSources.length})`);
const grouped = {};
report.citesNotInSectionSources.forEach((x) => {
  grouped[x.f] = grouped[x.f] || new Set();
  grouped[x.f].add(x.label);
});
Object.entries(grouped).slice(0, 50).forEach(([f, set]) => {
  console.log(`  - ${f}: ${[...set].map((l) => `"${l}"`).join(", ")}`);
});

const ok =
  report.noTopicId.length === 0 &&
  report.missingSectionSources.length === 0 &&
  report.unresolvedCites.length === 0 &&
  report.citesNotInSectionSources.length === 0;
console.log("\nRESULT:", ok ? "PASS" : "FAIL");
process.exit(ok ? 0 : 1);
