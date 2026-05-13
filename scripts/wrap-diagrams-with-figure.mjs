#!/usr/bin/env node
/**
 * Codemod: wrap diagram components in <DiagramFigure>.
 *
 * - Scans src/components/diagrams/*.tsx
 * - Skips files that already import DiagramFigure
 * - Derives a curriculum-aware id, title and placeholder description
 *   from the filename (PascalCase → human readable; strips trailing
 *   noise words like "Diagram"/"Animation"/"Flowchart")
 * - Wraps the LAST `return ( … );` block of the file with
 *   <DiagramFigure>…</DiagramFigure> using a balanced-parenthesis match
 * - Adds the import after the last existing top-level import
 * - Files where the pattern can't be matched safely are listed in the
 *   checklist for manual editing
 *
 * Usage:
 *   node scripts/wrap-diagrams-with-figure.mjs            # dry-run
 *   node scripts/wrap-diagrams-with-figure.mjs --write    # apply
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIAG_DIR = join(ROOT, "src/components/diagrams");
const CHECKLIST_PATH = "/mnt/documents/diagram-figure-checklist.md";
const APPLY = process.argv.includes("--write");

// ---------- naming helpers ----------

const STRIP_SUFFIXES = [
  "Diagram",
  "Animation",
  "Flowchart",
  "Visualizer",
  "Visualiser",
  "Visual",
  "Calculator",
  "Chart",
  "Curve",
  "Model",
  "Simulator",
  "Comparison",
];

const ACRONYMS = new Set([
  "ARDS","ICU","ECMO","RRT","RSI","ANS","NMJ","CSHT","DAS","MRI","ABG",
  "APACHE","ADME","ALF","APRV","AERD","AKI","BIS","BNP","CMV","COPD",
  "COVID","CPAP","CRP","CSF","CTG","DIC","DKA","DVT","ECG","EEG","ETT",
  "FFP","GCS","GFR","HBOT","HFNC","HHS","HIT","HOCM","ICP","IHD","INR",
  "IPPV","JVP","LMA","LVH","MAP","MET","MRSA","NIPPV","NIV","NSTEMI",
  "OSA","PCA","PEA","PEEP","PFT","PONV","PPI","PT","PTH","PVC","RBBB",
  "RVH","SBT","SIADH","SIMV","SSRI","STEMI","SVT","TBI","TPN","TXA",
  "UFH","VAP","VBG","VF","VT","WPW","TIVA","FRC","TLC","V","Q","CO",
  "DO2","VO2","CaO2","SVO2","FiO2","PaO2","PaCO2","SpO2","Hb","Hct",
  "Na","K","Ca","Mg","Cl","BE","HCO3","NO","CO2","O2","H2O","NaCl",
  "FFICM","FRCA","DNA","RNA","ATP","ADP","cAMP","cGMP","GABA","NMDA",
  "AMPA","COX","NSAID","ACE","ARB","SSRI","SNRI","TCA","MAOI","DOAC",
  "LMWH","UFH","HIT","DIC","TEG","ROTEM","TXA","FFP","RBC","PRBC",
]);

function splitPascal(name) {
  // Split PascalCase / camelCase boundaries while preserving digits + acronym runs
  return name
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/\s+/)
    .filter(Boolean);
}

function humanize(name) {
  for (const s of STRIP_SUFFIXES) {
    if (name.endsWith(s) && name.length > s.length) {
      name = name.slice(0, -s.length);
      break;
    }
  }
  const parts = splitPascal(name);
  if (parts.length === 0) return name;

  const out = parts.map((p, i) => {
    const upper = p.toUpperCase();
    if (ACRONYMS.has(upper)) return upper;
    if (/^\d+$/.test(p)) return p;
    if (i === 0) return p[0].toUpperCase() + p.slice(1).toLowerCase();
    return p.toLowerCase();
  });
  return out.join(" ");
}

function toKebab(name) {
  return splitPascal(name)
    .map((p) => p.toLowerCase())
    .join("-");
}

function classify(name) {
  // Curriculum-aware label used in the description placeholder
  if (/Flowchart|Algorithm|Pathway/i.test(name)) return "clinical decision flowchart";
  if (/Animation/i.test(name)) return "animated physiological diagram";
  if (/Curve|Graph|Plot/i.test(name)) return "graphical relationship";
  if (/Calculator|Score/i.test(name)) return "interactive calculator";
  if (/Circuit|Machine|Apparatus/i.test(name)) return "equipment schematic";
  if (/Anatomy|Cross|Section/i.test(name)) return "anatomical diagram";
  return "anatomical/physiological diagram";
}

// ---------- wrapping ----------

/**
 * Find the last top-level `return ( … );` block in `src` and return
 * { start, end, inner } where start/end bracket the inner JSX.
 * Uses a parenthesis-balanced scan from the `return (` opening paren.
 * Returns null if no safe match.
 */
function findLastReturnBlock(src) {
  const re = /\n\s{2,}return\s*\(\s*\n/g;
  let lastMatch = null;
  let m;
  while ((m = re.exec(src)) !== null) lastMatch = m;
  if (!lastMatch) return null;

  // Position of the `(` after `return`
  const openParenIdx = src.indexOf("(", lastMatch.index);
  if (openParenIdx === -1) return null;

  let depth = 0;
  let i = openParenIdx;
  let inStr = null; // ', ", `
  let inLineComment = false;
  let inBlockComment = false;

  for (; i < src.length; i++) {
    const c = src[i];
    const next = src[i + 1];
    if (inLineComment) { if (c === "\n") inLineComment = false; continue; }
    if (inBlockComment) { if (c === "*" && next === "/") { inBlockComment = false; i++; } continue; }
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "/" && next === "/") { inLineComment = true; i++; continue; }
    if (c === "/" && next === "*") { inBlockComment = true; i++; continue; }
    if (c === "'" || c === '"' || c === "`") { inStr = c; continue; }
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) {
        // Inner is between openParenIdx+1 and i, trim leading \n and trailing whitespace
        const innerRaw = src.slice(openParenIdx + 1, i);
        return {
          openParenIdx,
          closeParenIdx: i,
          innerRaw,
        };
      }
    }
  }
  return null;
}

function ensureImport(src) {
  if (src.includes('from "./_shared/DiagramFigure"')) return src;
  // Insert after last top-level import line
  const importRe = /^import .+;$/gm;
  let lastEnd = -1;
  let m;
  while ((m = importRe.exec(src)) !== null) {
    lastEnd = m.index + m[0].length;
  }
  const importLine = `\nimport { DiagramFigure } from "./_shared/DiagramFigure";`;
  if (lastEnd === -1) return importLine.trimStart() + "\n" + src;
  return src.slice(0, lastEnd) + importLine + src.slice(lastEnd);
}

function wrapFile(filePath) {
  const src = readFileSync(filePath, "utf8");
  if (src.includes("DiagramFigure")) return { status: "already" };

  const name = basename(filePath, ".tsx");
  const id = toKebab(name);
  const title = humanize(name);
  const kind = classify(name);
  const description =
    `Auto-generated wrapper for the ${title} ${kind}. ` +
    `Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure.`;

  const block = findLastReturnBlock(src);
  if (!block) return { status: "manual", reason: "no balanced return-block found", title, id };

  const inner = block.innerRaw;
  const trimmed = inner.replace(/^\s*\n/, "").replace(/\s*$/, "");
  // Heuristic: must look like JSX (starts with `<`)
  if (!/^\s*</.test(trimmed)) {
    return { status: "manual", reason: "return value is not a single JSX root", title, id };
  }
  // Avoid wrapping a Fragment / already-wrapped DiagramFigure
  if (/^\s*<>/.test(trimmed) || /^\s*<React\.Fragment/.test(trimmed)) {
    return { status: "manual", reason: "root is a Fragment — choose a real wrapper", title, id };
  }

  const indent = "      ";
  // Indent the inner JSX two extra levels
  const reindented = trimmed
    .split("\n")
    .map((l, i) => (i === 0 ? l : "  " + l))
    .join("\n");

  const wrapped =
    `\n    <DiagramFigure\n` +
    `      id=${JSON.stringify(id)}\n` +
    `      title=${JSON.stringify(title)}\n` +
    `      description=${JSON.stringify(description)}\n` +
    `    >\n` +
    `${indent}${reindented}\n` +
    `    </DiagramFigure>\n  `;

  const newSrc =
    ensureImport(
      src.slice(0, block.openParenIdx + 1) +
        wrapped +
        src.slice(block.closeParenIdx),
    );

  if (APPLY) writeFileSync(filePath, newSrc);
  return { status: "wrapped", title, id, description };
}

// ---------- run ----------

const files = readdirSync(DIAG_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => join(DIAG_DIR, f));

const results = { wrapped: [], manual: [], already: [] };

for (const f of files) {
  const r = wrapFile(f);
  if (r.status === "already") results.already.push(f);
  else if (r.status === "wrapped") results.wrapped.push({ file: f, ...r });
  else results.manual.push({ file: f, ...r });
}

// ---------- checklist ----------

const rel = (p) => p.replace(ROOT + "/", "");

const lines = [];
lines.push(`# DiagramFigure wrap checklist`);
lines.push("");
lines.push(`Generated by \`scripts/wrap-diagrams-with-figure.mjs\` ${APPLY ? "(applied)" : "(dry-run)"}.`);
lines.push("");
lines.push(`- Already wrapped: **${results.already.length}**`);
lines.push(`- Auto-wrapped this run: **${results.wrapped.length}**`);
lines.push(`- Needs manual wrap: **${results.manual.length}**`);
lines.push("");
lines.push(`## Manual edits required`);
lines.push("");
if (results.manual.length === 0) {
  lines.push("_None — every file matched the codemod pattern._");
} else {
  lines.push("| File | Reason | Suggested id | Suggested title |");
  lines.push("|---|---|---|---|");
  for (const r of results.manual) {
    lines.push(`| \`${rel(r.file)}\` | ${r.reason} | \`${r.id ?? "?"}\` | ${r.title ?? "?"} |`);
  }
}
lines.push("");
lines.push(`## Auto-wrapped — review titles & descriptions`);
lines.push("");
lines.push("Every entry below got a placeholder description. Replace with a curriculum-specific summary (1-2 sentences) of what the diagram teaches.");
lines.push("");
lines.push("| File | id | Title |");
lines.push("|---|---|---|");
for (const r of results.wrapped) {
  lines.push(`| \`${rel(r.file)}\` | \`${r.id}\` | ${r.title} |`);
}

mkdirSync(dirname(CHECKLIST_PATH), { recursive: true });
writeFileSync(CHECKLIST_PATH, lines.join("\n") + "\n");

console.log(
  `[wrap-diagrams] already=${results.already.length} wrapped=${results.wrapped.length} manual=${results.manual.length} ${APPLY ? "(written)" : "(dry-run)"}`,
);
console.log(`[wrap-diagrams] checklist → ${CHECKLIST_PATH}`);
