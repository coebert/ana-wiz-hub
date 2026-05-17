// Coverage report: cite completeness across all topics, grouped by curriculum domain.
//
// Per-topic checks:
//   - has topicId
//   - has sectionSources block
//   - every cite label resolves to a Reference in references.ts (topic-scoped or global)
//   - every cite label is present in that topic's sectionSources panel
//
// Aggregated by domain (derived from backPath="/...").
import fs from "node:fs";
import path from "node:path";

const TOPIC_DIR = "src/pages/topics";
const refsSrc = fs.readFileSync("src/data/references.ts", "utf8");

const refMap = {};
const globalLabels = new Set();
const blockRe = /"([\w-]+)"\s*:\s*\[([\s\S]*?)\n\s*\]\s*,/g;
let m;
while ((m = blockRe.exec(refsSrc))) {
  const labels = [...m[2].matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
  refMap[m[1]] = labels;
  labels.forEach((l) => globalLabels.add(l));
}

const DOMAIN_FROM_BACKPATH = {
  "/physics": "Physics",
  "/chemistry": "Physics",
  "/physiology": "Physiology",
  "/pharmacology": "Pharmacology",
  "/anatomy": "Clinical",
  "/clinical": "Clinical",
  "/intensive-care": "ICU",
  "/perioperative": "Perioperative",
};

const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));

const domains = {};
const ensure = (d) => (domains[d] ||= {
  topics: 0,
  topicsWithWorked: 0,
  topicsClean: 0,
  totalCites: 0,
  workedCites: 0,
  unresolved: [],
  notInSectionSources: [],
  missingSectionSources: [],
  noTopicId: [],
});

for (const f of files) {
  const src = fs.readFileSync(path.join(TOPIC_DIR, f), "utf8");
  const backPath = src.match(/backPath="([^"]+)"/)?.[1];
  const domain = DOMAIN_FROM_BACKPATH[backPath] || "Other";
  const d = ensure(domain);
  d.topics++;

  const topicId = src.match(/topicId="([\w-]+)"/)?.[1];
  if (!topicId) { d.noTopicId.push(f); continue; }
  const topicRefs = refMap[topicId] || [];

  const ssBlock = src.match(/sectionSources=\{\{([\s\S]*?)\n\s*\}\}/);
  if (!ssBlock) { d.missingSectionSources.push(f); continue; }
  const ssLabels = new Set([...ssBlock[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));

  // All cite labels
  const allCites = [];
  const citeRe = /cites:\s*\[([^\]]*)\]/g;
  let c;
  while ((c = citeRe.exec(src))) {
    [...c[1].matchAll(/"([^"]+)"/g)].forEach((x) => allCites.push(x[1]));
  }
  d.totalCites += allCites.length;

  // Worked-example cites (inside the WorkedExamples block)
  const workedBlock = src.match(/const \w+WorkedExamples[\s\S]*?\n\];/);
  let workedCites = [];
  if (workedBlock) {
    d.topicsWithWorked++;
    const wRe = /cites:\s*\[([^\]]*)\]/g;
    let w;
    while ((w = wRe.exec(workedBlock[0]))) {
      [...w[1].matchAll(/"([^"]+)"/g)].forEach((x) => workedCites.push(x[1]));
    }
    d.workedCites += workedCites.length;
  }

  let clean = true;
  for (const lbl of allCites) {
    if (!topicRefs.includes(lbl) && !globalLabels.has(lbl)) {
      d.unresolved.push({ f, label: lbl });
      clean = false;
    }
    if (!ssLabels.has(lbl)) {
      d.notInSectionSources.push({ f, label: lbl });
      clean = false;
    }
  }
  if (clean) d.topicsClean++;
}

const order = ["Physics", "Physiology", "Pharmacology", "Clinical", "ICU", "Perioperative", "Other"];
const pad = (s, n) => String(s).padEnd(n);

console.log("Citation coverage report by curriculum domain\n");
console.log(pad("Domain", 14), pad("Topics", 7), pad("Worked", 7), pad("Clean", 7), pad("Cites", 7), pad("Worked-cites", 13), pad("Unresolved", 11), "Not-in-SS");
console.log("-".repeat(90));

let g = { topics: 0, worked: 0, clean: 0, cites: 0, wcites: 0, unr: 0, miss: 0 };
for (const name of order) {
  const d = domains[name];
  if (!d) continue;
  const unr = d.unresolved.length;
  const miss = d.notInSectionSources.length;
  console.log(
    pad(name, 14),
    pad(d.topics, 7),
    pad(d.topicsWithWorked, 7),
    pad(`${d.topicsClean}/${d.topics}`, 7),
    pad(d.totalCites, 7),
    pad(d.workedCites, 13),
    pad(unr, 11),
    miss,
  );
  g.topics += d.topics; g.worked += d.topicsWithWorked; g.clean += d.topicsClean;
  g.cites += d.totalCites; g.wcites += d.workedCites; g.unr += unr; g.miss += miss;
}
console.log("-".repeat(90));
console.log(pad("TOTAL", 14), pad(g.topics, 7), pad(g.worked, 7), pad(`${g.clean}/${g.topics}`, 7),
  pad(g.cites, 7), pad(g.wcites, 13), pad(g.unr, 11), g.miss);

const coveragePct = ((g.clean / g.topics) * 100).toFixed(1);
const workedPct = ((g.worked / g.topics) * 100).toFixed(1);
console.log(`\nClean-topic coverage:    ${g.clean}/${g.topics} (${coveragePct}%)`);
console.log(`Worked-example coverage: ${g.worked}/${g.topics} (${workedPct}%)`);

// Per-domain failure detail
console.log("\n--- Detail: per-domain unresolved labels ---");
for (const name of order) {
  const d = domains[name];
  if (!d || d.unresolved.length === 0) continue;
  console.log(`\n[${name}] ${d.unresolved.length} unresolved`);
  d.unresolved.forEach((x) => console.log(`  - ${x.f} :: "${x.label}"`));
}

console.log("\n--- Detail: per-domain cites missing from sectionSources (top 20 each) ---");
for (const name of order) {
  const d = domains[name];
  if (!d || d.notInSectionSources.length === 0) continue;
  console.log(`\n[${name}] ${d.notInSectionSources.length} gaps`);
  const grouped = {};
  d.notInSectionSources.forEach((x) => {
    grouped[x.f] = grouped[x.f] || new Set();
    grouped[x.f].add(x.label);
  });
  Object.entries(grouped).slice(0, 20).forEach(([f, set]) =>
    console.log(`  - ${f}: ${[...set].map((l) => `"${l}"`).join(", ")}`)
  );
}

const ok = g.unr === 0 && g.miss === 0 && g.clean === g.topics;
console.log("\nRESULT:", ok ? "PASS" : "FAIL");
process.exit(ok ? 0 : 1);
