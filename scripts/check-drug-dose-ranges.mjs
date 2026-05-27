#!/usr/bin/env node
/**
 * Drug-dose-range checker.
 *
 * Scans every src/pages/topics/*.tsx for "<drug name> ... <number> <unit>"
 * mentions and flags numbers that fall OUTSIDE the plausible range
 * declared in src/data/drug-dose-ranges.ts. Catches decimal-point errors
 * (0.1 vs 1.0), unit confusion (mg vs mcg), and gross route mix-ups
 * — the single highest-impact class of clinical content errors.
 *
 * Usage:
 *   node scripts/check-drug-dose-ranges.mjs            # CI mode
 *   node scripts/check-drug-dose-ranges.mjs --report   # list every hit
 *   node scripts/check-drug-dose-ranges.mjs --write-allowlist
 *                                                       # baseline
 *
 * Baseline lives at scripts/drug-dose-ranges-allowlist.json (per-file
 * counts). CI fails when a file's count exceeds the baseline — i.e.
 * a NEW out-of-range dose was introduced.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { DRUG_DOSE_RANGES as RANGES } from "../src/data/drug-dose-ranges.mjs";

const ROOT = process.cwd();
const TOPICS_DIR = resolve(ROOT, "src/pages/topics");
const ALLOWLIST_PATH = resolve(ROOT, "scripts/drug-dose-ranges-allowlist.json");

const MODE_REPORT = process.argv.includes("--report");
const MODE_WRITE = process.argv.includes("--write-allowlist");


// Build a regex that matches any drug name or synonym, longest-first to
// avoid "ketamine" swallowing a hypothetical shorter sub-name.
const ALL_NAMES = [];
for (const r of RANGES) {
  ALL_NAMES.push({ name: r.drug, canonical: r.drug });
  for (const s of r.synonyms ?? []) ALL_NAMES.push({ name: s, canonical: r.drug });
}
ALL_NAMES.sort((a, b) => b.name.length - a.name.length);
const NAME_RE = new RegExp(
  String.raw`\b(${ALL_NAMES.map((n) => n.name.replace(/[-\s]/g, "[-\\s]")).join("|")})\b`,
  "gi",
);
function canonicalOf(name) {
  const lc = name.toLowerCase();
  for (const n of ALL_NAMES) if (n.name === lc) return n.canonical;
  return lc;
}

// Numeric+unit token. Order matters: longest unit first so "mg/kg/min"
// beats "mg/kg" beats "mg".
const UNIT_RE = String.raw`(?:mcg|µg|μg|ng|mg|units?|mL|g)\s*\/\s*kg\s*\/\s*(?:min|h|hr)|(?:mcg|µg|μg|ng|mg|units?|mL|g)\s*\/\s*kg|(?:mcg|µg|μg|ng|mg|units?|mL|g)\s*\/\s*(?:min|h|hr)|(?:mcg|µg|μg|ng|mg|units?|mL|g)`;
const NUM_UNIT_RE = new RegExp(
  String.raw`(\d+(?:\.\d+)?)\s*(${UNIT_RE})`,
  "gi",
);

const ROUTE_WORDS = {
  bolus: /\b(bolus)\b/i,
  induction: /\b(induction|induce)\b/i,
  loading: /\b(loading\s+dose|load)\b/i,
  maintenance: /\b(maintenance)\b/i,
  infusion: /\b(infusion|infused|titrated|TIVA|TCI\s+plasma)\b/i,
  tci: /\b(TCI|target[-\s]controlled|Ce\s+target|effect[-\s]site)\b/i,
  iv: /\b(IV|intravenous|i\.v\.)\b/i,
  im: /\b(IM|intramuscular|i\.m\.)\b/i,
  po: /\b(PO|oral|by\s+mouth)\b/i,
  sc: /\b(SC|subcutaneous|s\.c\.)\b/i,
  io: /\b(IO|intraosseous)\b/i,
  intranasal: /\b(intranasal|IN\b)\b/i,
};

function normaliseUnit(u) {
  return u
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/µg|μg/g, "mcg")
    .replace(/units?/g, "units")
    .replace(/hr/g, "h");
}


function detectRoutes(line) {
  const found = [];
  for (const [k, re] of Object.entries(ROUTE_WORDS)) {
    if (re.test(line)) found.push(k);
  }
  return found;
}

// Skip JSX/code that isn't prose
const SKIP_LINE = [/^\s*\/\//, /^\s*\*/, /^\s*\/\*/, /^\s*import\b/, /^\s*export\b/];

function scanFile(file) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  const hits = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) continue;
    if (SKIP_LINE.some((re) => re.test(raw))) continue;

    NAME_RE.lastIndex = 0;
    let nameMatch;
    while ((nameMatch = NAME_RE.exec(raw)) !== null) {
      const canonical = canonicalOf(nameMatch[1]);
      const candidates = RANGES.filter((r) => r.drug === canonical);
      if (candidates.length === 0) continue;

      // Look for the FIRST numeric+unit AFTER the drug name on this line,
      // within ~80 chars (prevents matching the next sentence's dose).
      const after = raw.slice(nameMatch.index, nameMatch.index + 120);
      NUM_UNIT_RE.lastIndex = 0;
      let nu;
      while ((nu = NUM_UNIT_RE.exec(after)) !== null) {
        const value = parseFloat(nu[1]);
        const unit = normaliseUnit(nu[2]);
        const routes = detectRoutes(raw);

        // Pick candidate ranges whose unit matches and whose route matches
        // (or route="any" or no route detected on the line).
        const matching = candidates.filter((c) => {
          if (normaliseUnit(c.unit) !== unit) return false;
          if (c.route === "any") return true;
          if (routes.length === 0) return true; // no route cue → permissive
          return routes.includes(c.route);
        });
        if (matching.length === 0) continue;

        // OUT-OF-RANGE if value lies outside EVERY matching range.
        const inAny = matching.some((c) => value >= c.min && value <= c.max);
        if (!inAny) {
          const closest = matching[0];
          hits.push({
            line: i + 1,
            drug: canonical,
            value,
            unit,
            route: routes[0] ?? closest.route,
            expected: `${closest.min}–${closest.max} ${closest.unit}`,
            snippet: line.slice(0, 160),
          });
        }
        // One numeric per drug-mention is enough.
        break;
      }
    }
  }
  return hits;
}

function listTopicFiles() {
  return readdirSync(TOPICS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => join(TOPICS_DIR, f));
}

const files = listTopicFiles().sort();
const perFile = new Map();
for (const f of files) {
  const hits = scanFile(f);
  if (hits.length > 0) perFile.set(relative(ROOT, f), hits);
}

if (MODE_WRITE) {
  const out = {};
  for (const [rel, hits] of [...perFile.entries()].sort()) out[rel] = hits.length;
  writeFileSync(ALLOWLIST_PATH, JSON.stringify(out, null, 2) + "\n");
  const total = [...perFile.values()].reduce((a, h) => a + h.length, 0);
  console.log(
    `Wrote ${ALLOWLIST_PATH} — ${perFile.size} files, ${total} out-of-range drug doses.`,
  );
  process.exit(0);
}

if (MODE_REPORT) {
  let total = 0;
  for (const [rel, hits] of [...perFile.entries()].sort()) {
    console.log(`\n${rel}  (${hits.length})`);
    for (const h of hits) {
      console.log(
        `  L${h.line}  ${h.drug} ${h.value} ${h.unit} (${h.route})  — expected ${h.expected}`,
      );
      console.log(`         ${h.snippet}`);
    }
    total += hits.length;
  }
  console.log(`\nTotal out-of-range drug doses: ${total}`);
  process.exit(0);
}

// CI mode: compare against baseline
let allow = {};
if (existsSync(ALLOWLIST_PATH)) allow = JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8"));

const errors = [];
const improvements = [];
for (const [rel, hits] of perFile.entries()) {
  const baseline = allow[rel] ?? 0;
  if (hits.length > baseline) {
    const newCount = hits.length - baseline;
    errors.push(
      `${rel}: ${hits.length} out-of-range drug dose(s) (baseline ${baseline}). ` +
        `${newCount} new implausible dose(s) introduced.`,
    );
    for (const h of hits.slice(0, 6)) {
      errors.push(
        `    L${h.line}  ${h.drug} ${h.value} ${h.unit} (${h.route})  — expected ${h.expected}`,
      );
      errors.push(`         ${h.snippet}`);
    }
  } else if (hits.length < baseline) {
    improvements.push(
      `${rel}: ${hits.length} (baseline ${baseline}). Lower the baseline by running ` +
        `\`node scripts/check-drug-dose-ranges.mjs --write-allowlist\`.`,
    );
  }
}
for (const rel of Object.keys(allow)) {
  if (!perFile.has(rel) && allow[rel] > 0) {
    improvements.push(`${rel}: no longer present. Remove from allowlist.`);
  }
}

if (errors.length > 0) {
  console.error("✗ Drug-dose-range check failed:\n");
  for (const e of errors) console.error("  " + e);
  console.error(
    "\nA dose outside the plausible range was added. Either:\n" +
      "  1. The dose is wrong (decimal slip, mg↔mcg, route mix-up) — fix it.\n" +
      "  2. The dose is genuinely an outlier (e.g. cardiac fentanyl) — widen\n" +
      "     the relevant entry in src/data/drug-dose-ranges.ts with a source.\n",
  );
  process.exit(1);
}
if (improvements.length > 0) {
  console.error("✗ Drug-dose-range allowlist is out of date:\n");
  for (const i of improvements) console.error("  " + i);
  process.exit(1);
}

const total = [...perFile.values()].reduce((a, h) => a + h.length, 0);
console.log(
  `✓ Drug-dose-range check passed. ${files.length} topics scanned, ` +
    `${total} out-of-range doses within baseline.`,
);
process.exit(0);
