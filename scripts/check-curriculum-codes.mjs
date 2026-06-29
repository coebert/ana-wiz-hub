#!/usr/bin/env node
/**
 * Audits every `curriculumCodes={[...]}` JSX prop used in topic pages,
 * components, and anatomyFolios against the canonical registry in
 * src/data/curriculumCodes.ts.
 *
 * Catches:
 *   - typos in FRCA mapping codes (e.g. "CL_BK_3" vs "CL_BK_03")
 *   - codes that haven't been added to CURRICULUM_CODES yet
 *
 * Exits non-zero if any unregistered code is found, gating CI.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = join(ROOT, "src", "pages", "topics");
const DIAGRAMS_DIR = join(ROOT, "src", "components", "diagrams");
const REGISTRY_FILE = join(ROOT, "src", "data", "curriculumCodes.ts");

const CODE_FORMAT_RE = /^[A-Z]{2}_BK_\d{2}$/;

function listTsxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listTsxFiles(p));
    else if (name.endsWith(".tsx") || name.endsWith(".ts")) out.push(p);
  }
  return out;
}

/** Parse CURRICULUM_CODES keys out of the registry file. */
function loadRegisteredCodes() {
  const src = readFileSync(REGISTRY_FILE, "utf8");
  const start = src.indexOf("CURRICULUM_CODES");
  const open = src.indexOf("{", start);
  const close = src.indexOf("} as const", open);
  const block = src.slice(open, close);
  const codes = new Set();
  for (const m of block.matchAll(/^\s*([A-Z]{2}_BK_\d{2})\s*:/gm)) {
    codes.add(m[1]);
  }
  return codes;
}

/**
 * Extract codes from every `curriculumCodes={[ ... ]}` (JSX prop) and
 * `curriculumCodes: [ ... ]` (object literal, e.g. in anatomyFolios links).
 */
function extractCodes(src) {
  const out = [];
  // JSX prop  curriculumCodes={[ "AA_BK_01", "BB_BK_02" ]}
  const propRe = /curriculumCodes\s*=\s*\{\s*\[([^\]]*)\]/g;
  let m;
  while ((m = propRe.exec(src))) {
    for (const lm of m[1].matchAll(/"([^"]+)"/g)) out.push(lm[1]);
  }
  // Object literal  code: "AA_BK_01"
  for (const lm of src.matchAll(/\bcode\s*:\s*"([A-Z0-9_]+)"/g)) {
    out.push(lm[1]);
  }
  return out;
}

const registered = loadRegisteredCodes();
const files = [
  ...listTsxFiles(TOPICS_DIR),
  ...listTsxFiles(DIAGRAMS_DIR),
];

const issues = [];
let auditedFiles = 0;

for (const file of files) {
  // Skip the registry itself and tests.
  if (file === REGISTRY_FILE) continue;
  if (file.includes("__tests__") || /\.test\.[tj]sx?$/.test(file)) continue;

  const src = readFileSync(file, "utf8");
  const codes = extractCodes(src);
  if (codes.length === 0) continue;

  auditedFiles++;
  const seen = new Set();
  for (const code of codes) {
    if (seen.has(code)) continue;
    seen.add(code);
    // Only validate strings that *look like* an RCoA BK code (contain "_BK_").
    // Free-text descriptors such as "RCoA Final — Clinical Anaesthesia" or
    // "FFICM 2.4" are accepted by curriculumCodes props and are out of scope.
    if (!/_BK_/.test(code)) continue;
    if (!CODE_FORMAT_RE.test(code)) {
      issues.push({
        file: relative(ROOT, file),
        kind: "bad-format",
        detail: `"${code}" looks like an RCoA BK code but does not match XX_BK_NN.`,
      });
    } else if (!registered.has(code)) {
      issues.push({
        file: relative(ROOT, file),
        kind: "unregistered",
        detail: `"${code}" is not in CURRICULUM_CODES. Add it to src/data/curriculumCodes.ts with title + exams.`,
      });
    }
  }
}

if (issues.length === 0) {
  console.log(
    `✓ No curriculumCodes mapping issues across ${auditedFiles} files.`,
  );
  process.exit(0);
}

console.error("✗ curriculumCodes mapping issues found:\n");
for (const { file, kind, detail } of issues) {
  console.error(`  [${kind}] ${file}`);
  console.error(`      ${detail}`);
}
console.error(
  "\nFix: register the code in src/data/curriculumCodes.ts (with title + exams) or correct the typo in the topic page.",
);
process.exit(1);
