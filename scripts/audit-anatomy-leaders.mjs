#!/usr/bin/env node
/**
 * Static audit of anatomy SVG diagrams for likely orientation / leader-line bugs.
 *
 * Convention: viewer faces patient — patient RIGHT = viewer LEFT (low x).
 *
 * Flags label objects whose `text`/`label`/`name` contains a side keyword
 * ("right", "left", "R ", "L ") whose `x`/`anchor`/`target` falls on the
 * wrong half of the SVG width.
 *
 * Output is advisory — every flagged item still needs human verification
 * because some plates are sagittal/posterior/lateral views.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "src/components/diagrams";
const ANATOMY_DIR = "src/components/diagrams/anatomy";

const SIDE_RX = /\b(right|left)\b/i;
const RIGHT_RX = /\bright\b/i;
const LEFT_RX = /\bleft\b/i;

// Files that are NOT bilateral anatomy (skip)
const SKIP = new Set([
  // physiology / curves / pathways — no R/L meaning
]);

function scanFile(file) {
  const src = fs.readFileSync(file, "utf8");
  // Heuristic: extract numeric x/cx/x1 or anchor:[x,y] / target:[x,y] near a label string
  const findings = [];

  // Pattern 1: { ... label/text/name: "...left/right..." ... x|cx: NUMBER ... }
  const objRx = /\{[^{}]*?(?:label|text|name|id)\s*:\s*["'`]([^"'`]+)["'`][^{}]*?(?:x|cx|x1|anchor|target)\s*[:=]\s*\[?\s*(-?\d+(?:\.\d+)?)/g;
  let m;
  while ((m = objRx.exec(src))) {
    const text = m[1];
    const x = parseFloat(m[2]);
    if (!SIDE_RX.test(text)) continue;
    findings.push({ text, x, idx: m.index });
  }

  // Determine SVG width by grepping viewBox or width
  let width = 1000;
  const vb = src.match(/viewBox\s*=\s*["'`]\s*\d+\s+\d+\s+(\d+)/);
  if (vb) width = parseInt(vb[1], 10);
  const center = width / 2;

  const issues = [];
  for (const f of findings) {
    const isRight = RIGHT_RX.test(f.text);
    const isLeft = LEFT_RX.test(f.text);
    if (isRight && isLeft) continue; // ambiguous text
    // Anatomical convention: patient RIGHT → viewer LEFT (x < center)
    // patient LEFT → viewer RIGHT (x > center)
    if (isRight && f.x > center * 1.05) {
      issues.push({ ...f, expected: "viewer-LEFT (x<center)", actual: `x=${f.x}, center=${center}` });
    } else if (isLeft && f.x < center * 0.95) {
      issues.push({ ...f, expected: "viewer-RIGHT (x>center)", actual: `x=${f.x}, center=${center}` });
    }
  }
  return { file, width, count: findings.length, issues };
}

const files = [];
for (const dir of [DIR, ANATOMY_DIR]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue;
    if (SKIP.has(f)) continue;
    files.push(path.join(dir, f));
  }
}

let total = 0;
const report = [];
for (const f of files) {
  const r = scanFile(f);
  if (r.issues.length === 0) continue;
  total += r.issues.length;
  report.push(`\n## ${r.file}  (viewBox width ${r.width})`);
  for (const i of r.issues) {
    report.push(`- "${i.text}"  →  expected ${i.expected}, got ${i.actual}`);
  }
}

const header = `# Anatomy diagram leader-line audit\n\nConvention: patient RIGHT = viewer LEFT.\nFiles scanned: ${files.length}. Suspected issues: ${total}.\nNote: posterior, sagittal, axial-from-below, and lateral views may legitimately invert this — every flag below requires human confirmation against the actual view declared in the file.\n`;

const out = header + report.join("\n") + "\n";
fs.mkdirSync("/mnt/documents", { recursive: true });
fs.writeFileSync("/mnt/documents/anatomy-leader-audit.md", out);
console.log(out);
console.log(`\nWrote /mnt/documents/anatomy-leader-audit.md`);
