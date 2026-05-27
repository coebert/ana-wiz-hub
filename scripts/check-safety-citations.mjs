#!/usr/bin/env node
/**
 * Safety-critical citation completeness check.
 *
 * Scans every `src/pages/topics/*.tsx` file for safety-critical numeric claims
 * (drug doses, infusion rates, defib energies, mmHg/mmol thresholds,
 * temperature targets) and flags any that do NOT have a citation in close
 * proximity — i.e. on the same logical block, within ±6 lines, an
 * `<InlineRef ... />`, `<Cite ... />`, or a `cites: [ ... ]` field exists.
 *
 * Why: numbers without an authoritative source are the single biggest exam
 * + clinical-safety risk in this app. This check makes that machine-checked.
 *
 * Usage:
 *   node scripts/check-safety-citations.mjs            # CI mode: fail on new
 *                                                       uncited numerics
 *   node scripts/check-safety-citations.mjs --report   # list every uncited
 *                                                       hit, ignore allowlist
 *   node scripts/check-safety-citations.mjs --write-allowlist
 *                                                     # regenerate the
 *                                                     # baseline allowlist
 *
 * Allowlist lives at scripts/safety-citations-allowlist.json so it is
 * reviewable in diffs. Each entry records the per-file uncited count; the
 * check fails if a file's actual count EXCEEDS the recorded number (new
 * uncited safety numbers were added). If the count DROPS, the script tells
 * you to lower the number — i.e. backfill is one-way.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = resolve(ROOT, "src/pages/topics");
const ALLOWLIST_PATH = resolve(ROOT, "scripts/safety-citations-allowlist.json");

const MODE_REPORT = process.argv.includes("--report");
const MODE_WRITE = process.argv.includes("--write-allowlist");

// ---------------------------------------------------------------------------
// Patterns for safety-critical numeric claims.
// Each pattern must capture the number + unit; ordered most-specific first.
// Avoid flagging years, page numbers, ASA grades, GCS scores, table cell
// labels, %-only values, etc.
// ---------------------------------------------------------------------------
const NUM = String.raw`(?:\d+(?:\.\d+)?)`;
const RANGE = String.raw`(?:${NUM}(?:\s*[-–—]\s*${NUM})?)`;

const SAFETY_PATTERNS = [
  // Weight-based doses: 1 mg/kg, 0.5 mcg/kg, 2 units/kg, 4 mL/kg, 4 J/kg
  {
    name: "weight-dose",
    re: new RegExp(
      String.raw`\b${RANGE}\s*(?:mg|mcg|µg|μg|ng|units?|mL|J)\s*\/\s*kg\b`,
      "g",
    ),
  },
  // Infusion rates: 5 mL/h, 0.05 mcg/kg/min, 2 mg/min, 4 units/h.
  // Bare "L/min" is a flow rate, not a drug rate — excluded.
  {
    name: "infusion-rate",
    re: new RegExp(
      String.raw`\b${RANGE}\s*(?:mg|mcg|µg|μg|ng|units?|mL)\s*\/\s*(?:h|hr|min|s|kg\s*\/\s*min|kg\s*\/\s*h)\b`,
      "g",
    ),
  },
  // Absolute drug doses tied to a route/bolus word nearby — caught loosely
  // by requiring "mg" / "mcg" / "µg" preceded by a number on a line that also
  // mentions bolus|loading|maintenance|IV|infusion|induction|dose.
  {
    name: "absolute-dose",
    re: new RegExp(
      String.raw`\b${RANGE}\s*(?:mg|mcg|µg|μg)\b`,
      "g",
    ),
    requireContextWord: /\b(bolus|loading|maintenance|infusion|induction|dose|titrate|repeat|max(?:imum)?)\b/i,
  },
  // Pressure thresholds: MAP > 65 mmHg, ICP < 20 mmHg, CPP ≥ 60 mmHg
  {
    name: "pressure-threshold",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?|>=|<=)\s*${NUM}\s*mmHg\b`,
      "g",
    ),
  },
  // Electrolyte / lab thresholds: K+ > 6.5 mmol/L, lactate > 4 mmol/L
  {
    name: "lab-threshold",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?|>=|<=)\s*${NUM}\s*(?:mmol\/L|mEq\/L|mg\/dL|µmol\/L|μmol\/L|g\/dL)\b`,
      "g",
    ),
  },
  // Temperature targets: 32–34 °C, < 36 °C, target 33°C
  {
    name: "temperature-target",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?\s*)?${RANGE}\s*°\s*C\b`,
      "g",
    ),
    requireContextWord: /\b(target|cool|warm|hypothermi|maintain|TTM|core|aim)\b/i,
  },
  // Defibrillation energies: 150 J, 200 J (when context is defib/shock/cardiovert)
  {
    name: "defib-energy",
    re: new RegExp(String.raw`\b${RANGE}\s*J\b`, "g"),
    requireContextWord: /\b(defib|shock|cardiovert|biphasic|monophasic|joule)\b/i,
  },
  // Oxygen saturation thresholds / targets: SpO2 < 94%, target 88–92%, SaO2 ≥ 90%
  // Context-gated so generic "%" numbers (e.g. mortality, sensitivity) don't trigger.
  {
    name: "oxygen-saturation",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?\s*)?${RANGE}\s*%`,
      "g",
    ),
    requireContextWord: /\b(SpO2|SaO2|SpO₂|SaO₂|oxygen\s+sat|saturation|hypoxaem?ia|target\s+sat)\b/i,
  },
  // Inspired oxygen fraction: FiO2 > 0.6, FiO2 ≥ 60%
  {
    name: "fio2-threshold",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?\s*)?${RANGE}\s*%?`,
      "g",
    ),
    requireContextWord: /\bFiO2|FiO₂\b/i,
    requireLineWord: /\bFiO2|FiO₂\b/i,
  },
  // Anticoagulation targets: INR 2–3, INR > 1.5, APTT ratio 1.5–2.5,
  // anti-Xa 0.5–1.0, anti-Xa > 0.3
  {
    name: "anticoag-target",
    re: new RegExp(
      String.raw`\b(?:INR|APTT(?:\s*ratio)?|aPTT(?:\s*ratio)?|anti[-\s]?Xa|ACT)\s*(?:of|target|level)?\s*(?:[<>≤≥]=?\s*)?${RANGE}\b`,
      "gi",
    ),
  },
  // Transfusion / haematology thresholds: Hb < 70 g/L, platelets < 50 ×10⁹/L,
  // fibrinogen < 1.5 g/L. The g/L unit is not in lab-threshold (which uses g/dL).
  {
    name: "haem-threshold",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?|>=|<=)\s*${NUM}\s*(?:g\/L|×?\s*10\^?9\s*\/\s*L|x\s*10\^?9\s*\/\s*L)\b`,
      "g",
    ),
  },
  // Glucose thresholds: BSL < 4 mmol/L, glucose > 10 mmol/L are caught by
  // lab-threshold above. Add specific peri-arrest paediatric "10% dextrose
  // 2 mL/kg" — already caught by weight-dose. No new pattern needed.

  // Lung-protective ventilation: Vt 6 mL/kg, PEEP 5 cmH2O, Pplat < 30 cmH2O
  {
    name: "airway-pressure",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?\s*)?${RANGE}\s*cm\s*H2O\b`,
      "gi",
    ),
    requireContextWord: /\b(PEEP|Pplat|plateau|peak|driving|airway|CPAP|PIP)\b/i,
  },
  // Heart-rate / respiratory-rate peri-arrest thresholds:
  // Only fire when a strong clinical context word is on the line — bare "HR"
  // or "RR" overlap too readily with "hr" (hours) and other tokens.
  {
    name: "vital-threshold",
    re: new RegExp(
      String.raw`(?:[<>≤≥]=?)\s*${NUM}\b`,
      "g",
    ),
    requireContextWord: /\b(bradycardi|tachycardi|bradypn|tachypn|peri[-\s]?arrest)/i,
    requireLineWord: /\b(bradycardi|tachycardi|bradypn|tachypn|peri[-\s]?arrest)/i,
  },
];

// Citation indicators considered "covers this line"
const CITE_INDICATORS = [
  /<InlineRef\b/,
  /<Cite\b/,
  /\bcites\s*:\s*\[/,
  /\brefLabel\s*=/,
];

// Skip JSX comments and code that's clearly UI scaffolding
const SKIP_LINE = [
  /^\s*\/\//,
  /^\s*\*/, // block-comment continuation
  /^\s*\/\*/,
];

// ---------------------------------------------------------------------------

function listTopicFiles() {
  return readdirSync(TOPICS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => join(TOPICS_DIR, f));
}

function isCovered(lines, idx) {
  const lo = Math.max(0, idx - 6);
  const hi = Math.min(lines.length - 1, idx + 6);
  for (let i = lo; i <= hi; i++) {
    const l = lines[i];
    if (CITE_INDICATORS.some((re) => re.test(l))) return true;
  }
  return false;
}

export function scanText(src) {
  const lines = src.split("\n");
  const hits = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (SKIP_LINE.some((re) => re.test(line))) continue;

    // Collect candidates, then dedupe overlapping spans (prefer earlier =
    // more specific pattern in SAFETY_PATTERNS order).
    const candidates = [];
    for (const pat of SAFETY_PATTERNS) {
      if (pat.requireLineWord && !pat.requireLineWord.test(line)) continue;
      pat.re.lastIndex = 0;
      let m;
      while ((m = pat.re.exec(line)) !== null) {
        if (pat.requireContextWord && !pat.requireContextWord.test(line)) {
          const ctxLo = Math.max(0, i - 2);
          const ctxHi = Math.min(lines.length - 1, i + 2);
          let ctxOk = false;
          for (let j = ctxLo; j <= ctxHi; j++) {
            if (pat.requireContextWord.test(lines[j])) {
              ctxOk = true;
              break;
            }
          }
          if (!ctxOk) continue;
        }
        candidates.push({
          start: m.index,
          end: m.index + m[0].length,
          match: m[0],
          pattern: pat.name,
        });
      }
    }

    // Dedupe overlaps: keep first (most specific) when spans intersect.
    candidates.sort((a, b) => a.start - b.start || a.end - b.end);
    const kept = [];
    for (const c of candidates) {
      if (kept.some((k) => c.start < k.end && c.end > k.start)) continue;
      kept.push(c);
    }

    if (kept.length === 0) continue;
    if (isCovered(lines, i)) continue;

    for (const k of kept) {
      hits.push({
        line: i + 1,
        col: k.start + 1,
        match: k.match,
        pattern: k.pattern,
        snippet: line.trim().slice(0, 140),
      });
    }
  }
  return hits;
}

function scanFile(file) {
  return scanText(readFileSync(file, "utf8"));
}

export function compareAgainstAllowlist(perFile, allow) {
  const errors = [];
  const improvements = [];
  const liveFiles = new Set([...perFile.keys()]);

  for (const [rel, hits] of perFile.entries()) {
    const baseline = allow[rel] ?? 0;
    const actual = hits.length;
    if (actual > baseline) {
      errors.push({ rel, actual, baseline, hits });
    } else if (actual < baseline) {
      improvements.push({ rel, actual, baseline, reason: "decreased" });
    }
  }

  for (const rel of Object.keys(allow)) {
    if (!liveFiles.has(rel) && allow[rel] > 0) {
      improvements.push({ rel, actual: 0, baseline: allow[rel], reason: "stale" });
    }
  }

  return { errors, improvements };
}

export { SAFETY_PATTERNS, CITE_INDICATORS, isCovered };

// ---------------------------------------------------------------------------
// CLI entrypoint — only runs when invoked directly.
// ---------------------------------------------------------------------------
const isMain =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("check-safety-citations.mjs");
if (!isMain) {
  // exported for tests
} else {
  runCli();
}

function runCli() {

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const files = listTopicFiles().sort();
const perFile = new Map();
for (const f of files) {
  const hits = scanFile(f);
  if (hits.length > 0) perFile.set(relative(ROOT, f), hits);
}

if (MODE_WRITE) {
  const out = {};
  for (const [rel, hits] of [...perFile.entries()].sort()) {
    out[rel] = hits.length;
  }
  writeFileSync(ALLOWLIST_PATH, JSON.stringify(out, null, 2) + "\n");
  const total = [...perFile.values()].reduce((a, h) => a + h.length, 0);
  console.log(
    `Wrote ${ALLOWLIST_PATH} — ${perFile.size} files, ${total} uncited safety-critical numerics.`,
  );
  process.exit(0);
}

if (MODE_REPORT) {
  let total = 0;
  for (const [rel, hits] of [...perFile.entries()].sort()) {
    console.log(`\n${rel}  (${hits.length})`);
    for (const h of hits) {
      console.log(`  L${h.line}  [${h.pattern}]  ${h.match}`);
      console.log(`         ${h.snippet}`);
    }
    total += hits.length;
  }
  console.log(`\nTotal uncited safety-critical numerics: ${total}`);
  process.exit(0);
}

// CI mode: compare against allowlist
let allow = {};
if (existsSync(ALLOWLIST_PATH)) {
  allow = JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8"));
}

const errors = [];
const improvements = [];
const liveFiles = new Set([...perFile.keys()]);

for (const [rel, hits] of perFile.entries()) {
  const baseline = allow[rel] ?? 0;
  const actual = hits.length;
  if (actual > baseline) {
    const newCount = actual - baseline;
    errors.push(
      `${rel}: ${actual} uncited safety-critical numerics (baseline ${baseline}). ` +
        `${newCount} new uncited claim(s) added — every safety-critical number ` +
        `must sit next to an <InlineRef />, <Cite />, or a \`cites: [...]\` ` +
        `field within ±6 lines.`,
    );
    // Show worst offenders for the new file
    for (const h of hits.slice(0, 6)) {
      errors.push(`    L${h.line}  [${h.pattern}]  ${h.match}  —  ${h.snippet}`);
    }
  } else if (actual < baseline) {
    improvements.push(
      `${rel}: ${actual} uncited (baseline ${baseline}). Lower the number in ` +
        `scripts/safety-citations-allowlist.json (or rerun ` +
        `\`node scripts/check-safety-citations.mjs --write-allowlist\`).`,
    );
  }
}

// Detect stale allowlist entries
for (const rel of Object.keys(allow)) {
  if (!liveFiles.has(rel) && allow[rel] > 0) {
    improvements.push(
      `${rel}: file no longer has any uncited safety numerics (or was removed). ` +
        `Remove from scripts/safety-citations-allowlist.json.`,
    );
  }
}

if (errors.length > 0) {
  console.error("✗ Safety-critical citation check failed:\n");
  for (const e of errors) console.error("  " + e);
  if (improvements.length > 0) {
    console.error("\nAlso (informational):");
    for (const i of improvements) console.error("  " + i);
  }
  console.error(
    "\nFix by adding an <InlineRef topicId=\"...\" refLabel=\"...\" /> next to " +
      "the number, or by adding a `cites: [\"Label\"]` field to the enclosing " +
      "keyPoint / workedExample object. Label must exist in " +
      "topicReferences[topicId] in src/data/references.ts.",
  );
  process.exit(1);
}

if (improvements.length > 0) {
  console.error("✗ Safety-citation allowlist is out of date:\n");
  for (const i of improvements) console.error("  " + i);
  process.exit(1);
}

const total = [...perFile.values()].reduce((a, h) => a + h.length, 0);
console.log(
  `✓ Safety-critical citation check passed. ` +
    `${files.length} topics scanned, ${total} uncited numerics within baseline.`,
);
process.exit(0);
