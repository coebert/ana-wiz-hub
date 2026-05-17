#!/usr/bin/env node
/**
 * Topic flow & locality audit.
 *
 * Complements scripts/audit-structural-clarity.mjs by checking two
 * pedagogical-quality dimensions that the structural audit cannot:
 *
 *   1. Diagram locality
 *      Diagrams, tables and animations should sit next to the text they
 *      illustrate. In our TopicTemplate render order, anything passed to
 *      the `diagrams={…}` prop renders as a single trailing
 *      "Diagrams & Visualisations" block, far from the relevant prose
 *      inside `coreConcepts`. We flag topics where ≥1 diagram component
 *      is grouped in the `diagrams` block AND zero diagrams are embedded
 *      inline within `coreConcepts`.
 *
 *   2. Flow ordering (general → specialised)
 *      We extract subsection titles (CollapsibleSubsection title=, h2/h3
 *      text, ExamSection id=) inside the `coreConcepts` block in source
 *      order and classify each into a tier:
 *        T1 Foundations  — definition, overview, principles, structure,
 *                          classification, basics, normal
 *        T2 Mechanism    — physiology, mechanism, kinetics, dynamics,
 *                          transport, metabolism, regulation, action
 *        T3 Applied      — clinical, indications, dose, monitoring,
 *                          technique, management, assessment, selection
 *        T4 Special/Exam — complications, pitfalls, special pops,
 *                          paediatric, pregnancy, controversies, exam,
 *                          viva, summary, comparison
 *      A topic is flagged when a tier appears after a strictly higher
 *      tier (e.g. a T1 "Definition" section after a T3 "Management"
 *      section) — that's a flow regression.
 *
 * Report is grouped by domain; exits 0 always (advisory audit).
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

// ─── Tier classification (lowercase substring match, first hit wins) ────────
const TIERS = [
  { tier: 1, keys: ["definition","overview","introduction","principle","basics","fundamental","classification","structure","anatomy","normal curve","background"] },
  { tier: 2, keys: ["mechanism","physiolog","pharmacokinetic","pharmacodynamic","kinetics","dynamics","transport","metabolism","regulation","mode of action","action of","pathway","cascade"] },
  { tier: 3, keys: ["clinical","indication","dosing","dose","monitoring","technique","management","assessment","selection","preparation","setup","conduct","intraoperative","perioperative","practical","measurement","equipment"] },
  { tier: 4, keys: ["complication","pitfall","contraindication","controvers","special","paediatric","pregnan","elderly","obesity","emergency","failure","toxicity","overdose","summary","exam","viva","comparison","future","recent"] },
];
function tierOf(title) {
  const t = title.toLowerCase();
  for (const { tier, keys } of TIERS) for (const k of keys) if (t.includes(k)) return tier;
  return 0; // unknown
}

// ─── Block extraction (JSX-naive, brace-balanced) ───────────────────────────
function balancedBlock(src, propName) {
  const propRe = new RegExp(`${propName}\\s*=\\s*\\{`, "g");
  const m = propRe.exec(src);
  if (!m) return null;
  const start = m.index + m[0].length;
  let depth = 1, i = start;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    i++;
  }
  return src.slice(start, i - 1);
}

// Anything whose tag-name looks like a diagram, chart, animation or table widget.
const DIAGRAM_TAG_RE =
  /<([A-Z][A-Za-z0-9_]*(?:Diagram|Chart|Curve|Graph|Plot|Animation|Animator|Visual|Visualisation|Visualization|Flowchart|Timeline|Schematic|Tree|Loop|Cycle|Wave|Wheel|Sankey|Heatmap|Heatmap|Map|Plate)|DiagramSection|LazyDiagrams)\b/g;

// Any literal HTML <table> tag (rare in this codebase, but counted).
const TABLE_TAG_RE = /<table\b/g;

function countWidgets(block) {
  if (!block) return 0;
  return (block.match(DIAGRAM_TAG_RE)?.length ?? 0) + (block.match(TABLE_TAG_RE)?.length ?? 0);
}

// ─── Title extraction inside coreConcepts ───────────────────────────────────
function extractTitles(block) {
  if (!block) return [];
  const out = [];
  // CollapsibleSubsection title="…"
  for (const m of block.matchAll(/<CollapsibleSubsection[^>]*\stitle="([^"]+)"/g)) {
    out.push({ idx: m.index, title: m[1] });
  }
  // <h2>…</h2> and <h3>…</h3>  (strip JSX expressions inside)
  for (const m of block.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)) {
    const text = m[1].replace(/\{[^}]*\}/g, "").replace(/<[^>]+>/g, "").trim();
    if (text) out.push({ idx: m.index, title: text });
  }
  // ExamSection id="kebab-id" (fallback when no h2/h3 inside)
  for (const m of block.matchAll(/<ExamSection[^>]*\sid="([a-z0-9-]+)"/g)) {
    const title = m[1].replace(/-/g, " ");
    out.push({ idx: m.index, title });
  }
  return out.sort((a, b) => a.idx - b.idx).map((x) => x.title);
}

// ─── Per-file analysis ──────────────────────────────────────────────────────
const files = fs.readdirSync(TOPIC_DIR).filter((f) => f.endsWith(".tsx"));
const domains = {};
const ensure = (d) => (domains[d] ||= {
  topics: 0,
  diagramAllGrouped: [], // {file, grouped, inline}
  flowRegress: [],       // {file, regressions: [{from, to, tierFrom, tierTo}]}
  noConcernTitles: 0,    // topics with too-few titles to judge ordering
});

for (const f of files) {
  const file = path.join(TOPIC_DIR, f);
  const src = fs.readFileSync(file, "utf8");
  const backPath = src.match(/backPath="([^"]+)"/)?.[1];
  const domain = DOMAIN_FROM_BACKPATH[backPath] || "Other";
  const d = ensure(domain);
  d.topics++;

  const coreBlock = balancedBlock(src, "coreConcepts");
  const diagBlock = balancedBlock(src, "diagrams");

  const grouped = countWidgets(diagBlock);
  const inline  = countWidgets(coreBlock);

  if (grouped >= 1 && inline === 0) {
    d.diagramAllGrouped.push({ file: f, grouped, inline });
  }

  const titles = extractTitles(coreBlock);
  const tiers = titles.map((t) => ({ title: t, tier: tierOf(t) })).filter((x) => x.tier > 0);
  if (tiers.length < 3) { d.noConcernTitles++; continue; }

  // Regression = current tier strictly lower than the highest seen so far.
  let highWater = 0;
  let highTitle = "";
  const regressions = [];
  for (const { title, tier } of tiers) {
    if (tier < highWater) {
      regressions.push({ from: highTitle, to: title, tierFrom: highWater, tierTo: tier });
    } else if (tier > highWater) {
      highWater = tier;
      highTitle = title;
    }
  }
  if (regressions.length) d.flowRegress.push({ file: f, regressions });
}

// ─── Report ─────────────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n);
console.log("Topic flow & locality audit\n");
console.log(pad("Domain", 14), pad("Topics", 7), pad("DiagsGrouped", 13), "FlowRegress");
console.log("-".repeat(60));

let G = { t: 0, dg: 0, fr: 0 };
for (const name of ORDER) {
  const d = domains[name];
  if (!d) continue;
  console.log(pad(name, 14), pad(d.topics, 7), pad(d.diagramAllGrouped.length, 13), d.flowRegress.length);
  G.t += d.topics; G.dg += d.diagramAllGrouped.length; G.fr += d.flowRegress.length;
}
console.log("-".repeat(60));
console.log(pad("TOTAL", 14), pad(G.t, 7), pad(G.dg, 13), G.fr);

console.log("\n--- Diagrams all grouped in trailing block (no inline diagrams in coreConcepts) ---");
for (const name of ORDER) {
  const d = domains[name];
  if (!d || d.diagramAllGrouped.length === 0) continue;
  console.log(`\n[${name}] ${d.diagramAllGrouped.length}`);
  for (const x of d.diagramAllGrouped) {
    console.log(`  - ${x.file}  (grouped=${x.grouped}, inline=${x.inline})`);
  }
}

console.log("\n--- Flow regressions (subsection tier drops after a higher tier) ---");
console.log("  Tiers: 1 Foundations · 2 Mechanism · 3 Applied · 4 Special/Exam");
for (const name of ORDER) {
  const d = domains[name];
  if (!d || d.flowRegress.length === 0) continue;
  console.log(`\n[${name}] ${d.flowRegress.length}`);
  for (const x of d.flowRegress) {
    console.log(`  - ${x.file}`);
    for (const r of x.regressions.slice(0, 3)) {
      console.log(`      T${r.tierFrom} "${r.from}"  →  T${r.tierTo} "${r.to}"`);
    }
    if (x.regressions.length > 3) console.log(`      …(+${x.regressions.length - 3} more)`);
  }
}

console.log(`\nSummary: ${G.dg}/${G.t} topics have all diagrams grouped at the end; ${G.fr}/${G.t} show a subsection-tier regression.`);
