#!/usr/bin/env node
/**
 * Smarter anatomy leader-line audit.
 *
 * For each diagram file:
 *   1. Find the SVG viewBox width → centerX.
 *   2. Find every JS object literal in the file containing both:
 *        - a label/name/text/id string mentioning right/left/RCA/LAD/LCx/LCA
 *        - a numeric x / cx / x1 / labelX / anchor[0] / target[0]
 *      (within the same object, scanning braces).
 *   3. Compare the side keyword to whether x is <centerX (viewer-LEFT) or >centerX (viewer-RIGHT).
 *   4. Apply the convention: patient RIGHT → viewer LEFT.
 *
 * Skip non-anterior views by file-name heuristic + header-comment heuristic.
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["src/components/diagrams", "src/components/diagrams/anatomy"];

const RIGHT_KEYS = [
  /\bRight\b/, /\bRA\b/, /\bRV\b/, /\bRCA\b/, /\bSVC\b/, /\bIVC\b/,
  /\bRight atrium\b/i, /\bRight ventric/i, /\bright lung\b/i,
  /\bright kidney\b/i, /\bright bronchus\b/i, /\bright main\b/i,
];
const LEFT_KEYS = [
  /\bLeft\b/, /\bLA\b/, /\bLV\b/, /\bLAD\b/, /\bLCx\b/, /\bLMS\b/, /\bLMCA\b/,
  /\bLeft atrium\b/i, /\bLeft ventric/i, /\bleft lung\b/i,
  /\baortic arch\b/i, /\bleft bronchus\b/i, /\bleft main\b/i,
];

const SKIP_FILE_RX = /(Sagittal|Medial|Axial|CrossSection|Posterior|Lateral|Bronchoscopic|MRI|CT|TOE|Bullseye|Plate|Bonny|Bony|UltrasoundDiagram|Wellens|Twelve|MMode|Wiggers|Capno|Loop|Cascade|Pathway|Algorithm|Curve|Score|Timeline|Cycle|Comparison|Trace|Receptor|Channel|PK|PD|Kinetic|Spectro|Bundle|Action|Response)/i;

function findObjects(src) {
  // Yields {body, startIdx} for each top-level-ish object literal `{ ... }`
  // Simple brace-balanced scan; ignores strings.
  const out = [];
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== "{") continue;
    let depth = 1, j = i + 1, inStr = null;
    while (j < src.length && depth > 0) {
      const c = src[j];
      if (inStr) {
        if (c === "\\") { j += 2; continue; }
        if (c === inStr) inStr = null;
      } else {
        if (c === '"' || c === "'" || c === "`") inStr = c;
        else if (c === "{") depth++;
        else if (c === "}") depth--;
      }
      j++;
    }
    if (depth === 0) {
      const body = src.slice(i, j);
      if (body.length < 4000 && body.length > 20) out.push({ body, idx: i });
      i = j - 1;
    }
  }
  return out;
}

function getX(body) {
  // Try several patterns; return first numeric x found
  const patterns = [
    /\b(?:labelX|x|cx|x1)\s*:\s*(-?\d+(?:\.\d+)?)/,
    /\banchor\s*:\s*\[\s*(-?\d+(?:\.\d+)?)/,
    /\btarget\s*:\s*\[\s*(-?\d+(?:\.\d+)?)/,
    /\bpos\s*:\s*\[\s*(-?\d+(?:\.\d+)?)/,
  ];
  for (const p of patterns) {
    const m = body.match(p);
    if (m) return parseFloat(m[1]);
  }
  return null;
}

function getLabelText(body) {
  const m = body.match(/(?:label|text|name|id)\s*:\s*["'`]([^"'`\n]{1,80})["'`]/);
  return m ? m[1] : null;
}

function classify(text) {
  for (const r of RIGHT_KEYS) if (r.test(text)) return "right";
  for (const r of LEFT_KEYS) if (r.test(text)) return "left";
  return null;
}

const lineOf = (src, idx) => src.slice(0, idx).split("\n").length;

function audit(file) {
  const src = fs.readFileSync(file, "utf8");
  if (SKIP_FILE_RX.test(path.basename(file))) return null;

  const vb = src.match(/viewBox\s*=\s*["'`]\s*\d+\s+\d+\s+(\d+(?:\.\d+)?)/);
  if (!vb) return null;
  const width = parseFloat(vb[1]);
  const cx = width / 2;

  const issues = [];
  for (const { body, idx } of findObjects(src)) {
    const text = getLabelText(body);
    if (!text) continue;
    const side = classify(text);
    if (!side) continue;
    const x = getX(body);
    if (x === null) continue;
    if (x < 0 || x > width) continue;

    // Convention: patient RIGHT → viewer LEFT (x<cx); patient LEFT → viewer RIGHT (x>cx)
    const tol = width * 0.05;
    if (side === "right" && x > cx + tol) {
      issues.push({ line: lineOf(src, idx), text, x, side, want: "viewer-LEFT" });
    } else if (side === "left" && x < cx - tol) {
      issues.push({ line: lineOf(src, idx), text, x, side, want: "viewer-RIGHT" });
    }
  }
  return { file, width, cx, issues };
}

const files = [];
for (const r of ROOTS) {
  if (!fs.existsSync(r)) continue;
  for (const f of fs.readdirSync(r)) {
    if (f.endsWith(".tsx")) files.push(path.join(r, f));
  }
}

const lines = [
  "# Anatomy leader-line audit",
  "",
  "Convention: patient RIGHT = viewer LEFT (standard anatomical, viewer faces patient).",
  "Each flag = an object literal whose label string mentions a side that disagrees with its drawn x-coordinate.",
  "Posterior, sagittal, axial-from-below, lateral, and ultrasound views are excluded by filename heuristic.",
  "",
];
let total = 0, hits = 0;
for (const f of files) {
  const r = audit(f);
  if (!r || r.issues.length === 0) continue;
  hits++;
  total += r.issues.length;
  lines.push(`## ${r.file}  (viewBox width ${r.width}, centerX ${r.cx})`);
  for (const i of r.issues) {
    lines.push(`- L${i.line}  "${i.text}"  side=${i.side}  x=${i.x}  → expected ${i.want}`);
  }
  lines.push("");
}
lines.unshift(`Files with suspected issues: ${hits}.  Total flags: ${total}.`, "");

const out = lines.join("\n");
fs.mkdirSync("/mnt/documents", { recursive: true });
fs.writeFileSync("/mnt/documents/anatomy-leader-audit.md", out);
console.log(out);
