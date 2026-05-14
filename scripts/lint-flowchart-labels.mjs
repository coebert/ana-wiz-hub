#!/usr/bin/env node
/**
 * Developer-only lint: scans every diagram source under
 * src/components/diagrams/ for `svgNodeProps("…")` labels and flags any
 * that don't follow the standardized
 *   `<Kind> [N/M][ —|: ] body`
 * wording, or use inconsistent units.
 *
 * Usage:
 *   node scripts/lint-flowchart-labels.mjs
 *   node scripts/lint-flowchart-labels.mjs --json
 *
 * Exits non-zero when any violation is found.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd(), "src/components/diagrams");
const ALLOWED_KINDS = [
  "Step",
  "Decision",
  "Branch",
  "Outcome",
  "Pathway",
  "Tier",
  "Phase",
  "Modality",
];
const KIND_RE = new RegExp(
  `^(?:${ALLOWED_KINDS.join("|")})(?:\\s+\\$?\\w+\\/\\$?\\w+)?(?:\\s+(?:yes|no))?\\s*[—:]\\s+\\S`,
);

const UNIT_LINTS = [
  [/cmH₂O/, "use ASCII cmH2O"],
  [/mmH₂O/, "use ASCII mmH2O"],
  [/PaCO₂/, "use ASCII PaCO2"],
  [/PaO₂/, "use ASCII PaO2"],
  [/\bml\/kg\b/, "use mL/kg (capital L)"],
  [/\bmcg\b/, "use μg"],
  [/\bug\b/, "use μg"],
  [/\bhrs?\b/, "use h"],
  [/\bhour(s)?\b/i, "use h"],
  [/\bminutes?\b/i, "use min"],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (name === "__tests__" || name === "_shared") continue;
      yield* walk(p);
    } else if (/\.(tsx?|jsx?)$/.test(name)) {
      yield p;
    }
  }
}

function lineOf(src, idx) {
  return src.slice(0, idx).split("\n").length;
}

const violations = [];
const LABEL_RE = /svgNodeProps\(\s*([`"])((?:\\.|(?!\1).)*)\1\s*\)/g;

let total = 0;
for (const file of walk(ROOT)) {
  const src = readFileSync(file, "utf8");
  let m;
  while ((m = LABEL_RE.exec(src)) !== null) {
    total++;
    const raw = m[2];
    const probe = raw.replace(/\$\{[^}]+\}/g, "X");
    const line = lineOf(src, m.index);
    const rel = relative(process.cwd(), file);

    if (!KIND_RE.test(probe)) {
      violations.push({
        file: rel,
        line,
        label: raw,
        rule: "format",
        hint: `must start with one of ${ALLOWED_KINDS.join("/")} then optional N/M, then ":" or " — "`,
      });
    }
    for (const [bad, hint] of UNIT_LINTS) {
      if (bad.test(probe)) {
        violations.push({ file: rel, line, label: raw, rule: "units", hint });
      }
    }
  }
}

const json = process.argv.includes("--json");
if (json) {
  console.log(JSON.stringify({ scanned: total, violations }, null, 2));
} else {
  if (violations.length === 0) {
    console.log(`✓ ${total} svgNodeProps labels — all consistent`);
  } else {
    const byFile = new Map();
    for (const v of violations) {
      if (!byFile.has(v.file)) byFile.set(v.file, []);
      byFile.get(v.file).push(v);
    }
    console.log(
      `✗ ${violations.length} violation(s) in ${byFile.size} file(s) (scanned ${total} labels)\n`,
    );
    for (const [file, vs] of byFile) {
      console.log(`  ${file}`);
      for (const v of vs) {
        console.log(`    L${v.line}  [${v.rule}] ${v.hint}`);
        console.log(`           "${v.label}"`);
      }
      console.log();
    }
    console.log("Files to fix:");
    for (const f of byFile.keys()) console.log(`  ${f}`);
  }
}

process.exit(violations.length === 0 ? 0 : 1);
