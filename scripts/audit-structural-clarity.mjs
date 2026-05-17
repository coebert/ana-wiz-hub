#!/usr/bin/env node
/**
 * Structural-clarity audit for topic pages.
 *
 * For each src/pages/topics/*.tsx file, reports issues across four axes that
 * together describe whether a topic's citation scaffolding is well-formed:
 *
 *   1. has-topicId        — topicId="..." present
 *   2. has-sectionSources — sectionSources={{...}} prop present
 *   3. section-coverage   — every section that contains inline `cites:[...]`
 *                           also has a corresponding key in sectionSources
 *                           (e.g. cites inside `workedExamples=` ⇒ a
 *                           `workedExamples: [...]` entry in sectionSources)
 *   4. label-surfaced     — every inline cite label appears in *some*
 *                           sectionSources array for the same topic
 *
 * Output is grouped by domain (matching verify-worked-cites.mjs), with a
 * compact per-domain table plus an itemised gap list. Exits non-zero if any
 * topic has at least one structural issue.
 */
import fs from "node:fs";
import path from "node:path";

const TOPIC_DIR = "src/pages/topics";

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

const ORDER = ["Physics", "Physiology", "Pharmacology", "Clinical", "ICU", "Perioperative", "Other"];

// Map "owner" of an inline cites block → expected sectionSources key.
// Owners are matched by the nearest preceding prop / const name.
const SECTION_OWNERS = [
  { re: /workedExamples\s*[:=]/g, key: "workedExamples" },
  { re: /keyPoints\s*[:=]/g,      key: "keyPoints" },
  { re: /objectives\s*[:=]/g,     key: "objectives" },
  { re: /diagrams\s*[:=]/g,       key: "diagrams" },
  { re: /coreConcepts\s*[:=]/g,   key: "coreConcepts" },
  { re: /clinicalRelevance\s*[:=]/g, key: "clinicalRelevance" },
];

/** Find the section-owner key that contains offset `idx`, by nearest preceding match. */
function ownerOf(src, idx) {
  let best = null;
  let bestPos = -1;
  for (const { re, key } of SECTION_OWNERS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) && m.index < idx) {
      if (m.index > bestPos) { bestPos = m.index; best = key; }
    }
  }
  return best;
}

/** Parse sectionSources={{ ... }} → Map<sectionKey, Set<label>>. */
function parseSectionSources(src) {
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
  const block = src.slice(openIdx, i - 2);
  // Top-level keys: "key: [ ... ]" — accept identifier or quoted keys
  const out = new Map();
  const keyRe = /(\w+)\s*:\s*\[([^\]]*)\]/g;
  let km;
  while ((km = keyRe.exec(block))) {
    const labels = new Set([...km[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
    out.set(km[1], labels);
  }
  return out;
}

const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));
const domains = {};
const ensure = (d) => (domains[d] ||= {
  topics: 0, clean: 0,
  noTopicId: [], noSS: [],
  missingSectionKey: [],   // {file, section, labels:Set}
  notSurfaced: [],         // {file, label, section}
});

for (const f of files) {
  const file = path.join(TOPIC_DIR, f);
  const src = fs.readFileSync(file, "utf8");
  const backPath = src.match(/backPath="([^"]+)"/)?.[1];
  const domain = DOMAIN_FROM_BACKPATH[backPath] || "Other";
  const d = ensure(domain);
  d.topics++;

  const topicId = src.match(/topicId="([\w-]+)"/)?.[1];
  if (!topicId) { d.noTopicId.push(f); continue; }

  const ss = parseSectionSources(src);
  if (!ss) { d.noSS.push(f); continue; }

  // Collect inline cites with their owning section
  const citeRe = /cites:\s*\[([^\]]*)\]/g;
  const bySection = new Map(); // section → Set<label>
  let cm;
  while ((cm = citeRe.exec(src))) {
    const owner = ownerOf(src, cm.index) || "unknown";
    const labels = [...cm[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    if (!bySection.has(owner)) bySection.set(owner, new Set());
    labels.forEach((l) => bySection.get(owner).add(l));
  }

  let clean = true;

  // 3. section-coverage
  for (const [section, labels] of bySection) {
    if (section === "unknown") continue;
    if (!ss.has(section)) {
      d.missingSectionKey.push({ file: f, section, labels: [...labels] });
      clean = false;
    }
  }

  // 4. label-surfaced (any sectionSources array, same topic)
  const allSurfaced = new Set();
  for (const set of ss.values()) for (const l of set) allSurfaced.add(l);
  for (const [section, labels] of bySection) {
    for (const l of labels) {
      if (!allSurfaced.has(l)) {
        d.notSurfaced.push({ file: f, label: l, section });
        clean = false;
      }
    }
  }

  if (clean) d.clean++;
}

const pad = (s, n) => String(s).padEnd(n);
console.log("Structural-clarity audit — topic pages\n");
console.log(pad("Domain", 14), pad("Topics", 7), pad("Clean", 8), pad("NoTopicId", 10),
            pad("NoSS", 6), pad("MissKey", 8), "NotSurfaced");
console.log("-".repeat(80));

let G = { t: 0, c: 0, nid: 0, nss: 0, mk: 0, ns: 0 };
for (const name of ORDER) {
  const d = domains[name];
  if (!d) continue;
  const mk = d.missingSectionKey.length;
  const ns = d.notSurfaced.length;
  console.log(
    pad(name, 14), pad(d.topics, 7), pad(`${d.clean}/${d.topics}`, 8),
    pad(d.noTopicId.length, 10), pad(d.noSS.length, 6), pad(mk, 8), ns,
  );
  G.t += d.topics; G.c += d.clean; G.nid += d.noTopicId.length;
  G.nss += d.noSS.length; G.mk += mk; G.ns += ns;
}
console.log("-".repeat(80));
console.log(pad("TOTAL", 14), pad(G.t, 7), pad(`${G.c}/${G.t}`, 8),
            pad(G.nid, 10), pad(G.nss, 6), pad(G.mk, 8), G.ns);

const pct = ((G.c / G.t) * 100).toFixed(1);
console.log(`\nStructurally-clean topics: ${G.c}/${G.t} (${pct}%)`);

// Detail
function group(arr, keyFn) {
  const m = new Map();
  for (const x of arr) {
    const k = keyFn(x);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  }
  return m;
}

console.log("\n--- Missing sectionSources keys (section has cites but no SS entry) ---");
for (const name of ORDER) {
  const d = domains[name];
  if (!d || d.missingSectionKey.length === 0) continue;
  console.log(`\n[${name}] ${d.missingSectionKey.length}`);
  for (const x of d.missingSectionKey) {
    console.log(`  - ${x.file} :: ${x.section}  (e.g. ${x.labels.slice(0, 3).map((l) => `"${l}"`).join(", ")})`);
  }
}

console.log("\n--- Cites not surfaced anywhere in sectionSources (top per file) ---");
for (const name of ORDER) {
  const d = domains[name];
  if (!d || d.notSurfaced.length === 0) continue;
  console.log(`\n[${name}] ${d.notSurfaced.length}`);
  const byFile = group(d.notSurfaced, (x) => x.file);
  for (const [file, list] of byFile) {
    const uniq = [...new Set(list.map((l) => `${l.label}  ← ${l.section}`))];
    console.log(`  - ${file}: ${uniq.slice(0, 6).join("; ")}${uniq.length > 6 ? ` …(+${uniq.length - 6})` : ""}`);
  }
}

if (G.nid || G.nss) {
  console.log("\n--- Pages missing scaffolding ---");
  for (const name of ORDER) {
    const d = domains[name];
    if (!d) continue;
    if (d.noTopicId.length) console.log(`[${name}] no topicId: ${d.noTopicId.join(", ")}`);
    if (d.noSS.length)      console.log(`[${name}] no sectionSources: ${d.noSS.join(", ")}`);
  }
}

const ok = G.c === G.t;
console.log("\nRESULT:", ok ? "PASS" : "FAIL");
process.exit(ok ? 0 : 1);
