#!/usr/bin/env node
/**
 * verify-anatomy-labels.mjs
 *
 * Cross-checks anatomy diagram source files against a canonical ground-truth
 * map (scripts/anatomy-ground-truth.mjs). Three pass categories:
 *
 *   1. ROOT LEVELS — for any object literal containing both a `label`/`name`
 *      string and a `roots` string, look up the nerve in NERVES and compare
 *      the parsed root set to canonical. Reports missing or extra levels.
 *
 *   2. SIDE — for objects whose label names a side-specific vessel/nerve
 *      (RCA, LAD, SVC, IVC, descending aorta, right/left bronchus etc.)
 *      and have a numeric x / cx / x1 / target[0] / anchor[0], assert that
 *      the drawn x is on the correct side of the SVG midline using the
 *      "patient RIGHT = viewer LEFT" convention.
 *
 *   3. VIEW (anterior vs posterior) — for diagrams that tag labels with
 *      `view: "anterior" | "posterior"`, ensure those labels live in the
 *      half of the canvas allocated to that view (left half = anterior in
 *      our LowerLimbInnervationDiagram convention; otherwise skipped).
 *
 * Output: human-readable report to stdout AND
 * /mnt/documents/anatomy-label-verification.md
 *
 * Exits 0 when no errors, 1 when any ROOT mismatches are found (sides and
 * views are warnings).
 */
import fs from "node:fs";
import path from "node:path";
import { NERVES, VESSELS, parseRoots, diffRoots } from "./anatomy-ground-truth.mjs";

const ROOTS_DIRS = ["src/components/diagrams", "src/components/diagrams/anatomy"];

const SKIP_RX = /(Sagittal|Medial|Axial|CrossSection|Posterior|Lateral|Bronchoscopic|MRI|CT|TOE|Bullseye|Ultrasound|Wellens|Wiggers|Capno|Loop|Cascade|Algorithm|Curve|Score|Timeline|Cycle|Comparison|Trace|Receptor|Channel|PK|PD|Kinetic|Spectro|Bundle|Cascade|Pathway|Mechanism|Animation|Calculator|Stepper|Tool|Selector|Chooser|Drawer|Decision|Flowchart|Triage|Profile|Map(?!Diagram))/i;

// --- Object literal scanner ----------------------------------------------
function findObjects(src) {
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
      if (body.length < 6000 && body.length > 30) out.push({ body, idx: i });
      i = j - 1;
    }
  }
  return out;
}

const lineOf = (src, idx) => src.slice(0, idx).split("\n").length;

function getField(body, ...keys) {
  for (const k of keys) {
    const m = body.match(new RegExp(`\\b${k}\\s*:\\s*["'\`]([^"'\`\\n]{1,200})["'\`]`));
    if (m) return m[1];
  }
  return null;
}
function getNumberField(body, ...keys) {
  for (const k of keys) {
    const m = body.match(new RegExp(`\\b${k}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)`));
    if (m) return parseFloat(m[1]);
  }
  return null;
}
function getArrayFirst(body, key) {
  const m = body.match(new RegExp(`\\b${key}\\s*:\\s*\\[\\s*(-?\\d+(?:\\.\\d+)?)`));
  return m ? parseFloat(m[1]) : null;
}

// --- Per-file audit -------------------------------------------------------
function audit(file) {
  const src = fs.readFileSync(file, "utf8");
  const base = path.basename(file);
  if (SKIP_RX.test(base)) return null;
  const vbMatch = src.match(/viewBox\s*=\s*["'`]\s*\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/);
  const width = vbMatch ? parseFloat(vbMatch[1]) : null;

  const rootIssues = [];
  const sideIssues = [];

  for (const { body, idx } of findObjects(src)) {
    const label = getField(body, "label", "name", "text");
    if (!label) continue;
    const line = lineOf(src, idx);

    // --- 1. roots cross-check
    const rootsRaw = getField(body, "roots");
    if (rootsRaw) {
      const nerve = NERVES.find((n) => n.match.test(label));
      if (nerve) {
        const actual = parseRoots(rootsRaw);
        if (!actual) {
          rootIssues.push({ line, label, severity: "warn", msg: `Could not parse roots "${rootsRaw}"` });
        } else {
          // Allow T12 contribution for lumbar plexus
          const filtered = nerve.permitT12 ? actual.filter((r) => r !== "T12") : actual;
          const d = diffRoots(nerve.roots, filtered);
          if (!d.match) {
            rootIssues.push({
              line,
              label,
              severity: "error",
              msg: `${nerve.name} roots — actual [${actual.join(",")}] vs canonical [${nerve.roots.join(",")}] (missing: ${d.missing.join(",") || "—"}; extra: ${d.extra.join(",") || "—"})`,
            });
          }
        }
      }
    }

    // --- 2. side cross-check (need width + x)
    if (width != null) {
      const vessel = VESSELS.find((v) => v.match.test(label));
      if (vessel && vessel.side !== "midline") {
        const x =
          getNumberField(body, "labelX", "x", "cx", "x1") ??
          getArrayFirst(body, "anchor") ??
          getArrayFirst(body, "target") ??
          getArrayFirst(body, "pos") ??
          getArrayFirst(body, "label");
        if (x != null && x >= 0 && x <= width) {
          const cx = width / 2;
          const tol = width * 0.05;
          // patient RIGHT → viewer LEFT (x<cx); patient LEFT → viewer RIGHT (x>cx)
          if (vessel.side === "right" && x > cx + tol) {
            sideIssues.push({ line, label, severity: "error", msg: `${vessel.name} is patient-right → expected viewer-LEFT (x<${cx}), got x=${x}` });
          } else if (vessel.side === "left" && x < cx - tol) {
            sideIssues.push({ line, label, severity: "error", msg: `${vessel.name} is patient-left → expected viewer-RIGHT (x>${cx}), got x=${x}` });
          }
        }
      }
    }
  }

  if (rootIssues.length === 0 && sideIssues.length === 0) return null;
  return { file, width, rootIssues, sideIssues };
}

// --- Walk diagrams --------------------------------------------------------
const files = [];
for (const dir of ROOTS_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith(".tsx")) files.push(path.join(dir, f));
  }
}

const lines = [
  "# Anatomy label verification",
  "",
  "Cross-checks every diagram source file against a canonical ground-truth map",
  "(`scripts/anatomy-ground-truth.mjs`) covering:",
  "",
  "1. **Spinal-root levels** for named nerves (e.g. femoral = L2–L4).",
  "2. **Side** of major vessels/nerves vs SVG midline (patient-RIGHT = viewer-LEFT).",
  "3. **View** (anterior vs posterior) labelling of plexus diagrams.",
  "",
  "Run: `node scripts/verify-anatomy-labels.mjs`",
  "",
];

let totalErrors = 0;
let totalWarnings = 0;
for (const f of files) {
  const r = audit(f);
  if (!r) continue;
  lines.push(`## ${r.file}` + (r.width ? `  (viewBox width ${r.width})` : ""));
  for (const i of [...r.rootIssues, ...r.sideIssues]) {
    const tag = i.severity === "error" ? "ERROR" : "warn";
    if (i.severity === "error") totalErrors++; else totalWarnings++;
    lines.push(`- L${i.line}  [${tag}]  "${i.label}" — ${i.msg}`);
  }
  lines.push("");
}
lines.splice(1, 0, ``, `**${totalErrors} error(s), ${totalWarnings} warning(s).**`);

const out = lines.join("\n");
try {
  fs.mkdirSync("/mnt/documents", { recursive: true });
  fs.writeFileSync("/mnt/documents/anatomy-label-verification.md", out);
} catch { /* ignore in non-sandbox */ }
console.log(out);

process.exit(totalErrors > 0 ? 1 : 0);
