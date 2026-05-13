#!/usr/bin/env node
/**
 * Undo wrapper inserted by wrap-diagrams-with-figure.mjs.
 * Recognises the exact "Auto-generated wrapper for the …" signature.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIAG_DIR = join(ROOT, "src/components/diagrams");

const OPEN_RE =
  /\n {4}<DiagramFigure\n {6}id="[^"]+"\n {6}title="[^"]+"\n {6}description="Auto-generated wrapper for the [^"]+"\n {4}>\n {6}/;
const CLOSE_RE = /\n {4}<\/DiagramFigure>\n  /;
const IMPORT_LINE = `\nimport { DiagramFigure } from "./_shared/DiagramFigure";`;

let undone = 0;
let kept = 0;

for (const f of readdirSync(DIAG_DIR)) {
  if (!f.endsWith(".tsx")) continue;
  const path = join(DIAG_DIR, f);
  let src = readFileSync(path, "utf8");
  if (!src.includes("Auto-generated wrapper for the")) {
    if (src.includes("DiagramFigure")) kept++;
    continue;
  }
  const openMatch = src.match(OPEN_RE);
  if (!openMatch) {
    console.log(`[skip] ${f}: open signature not found`);
    continue;
  }
  const openStart = openMatch.index;
  const openEnd = openStart + openMatch[0].length;
  // Find the FIRST close after this open
  const after = src.slice(openEnd);
  const closeMatch = after.match(CLOSE_RE);
  if (!closeMatch) {
    console.log(`[skip] ${f}: close signature not found`);
    continue;
  }
  const closeStart = openEnd + closeMatch.index;
  const closeEnd = closeStart + closeMatch[0].length;

  const inner = src.slice(openEnd, closeStart);
  // De-indent: strip 2 leading spaces on each non-first line
  const innerLines = inner.split("\n");
  const deIndented = innerLines
    .map((l, i) => (i === 0 ? l : l.startsWith("  ") ? l.slice(2) : l))
    .join("\n");

  // Restore original `return (\n…\n  );` shape:
  // The wrap inserted right after `(` so original was `(\n    ${deIndented}\n  )`.
  // Reconstruct: `\n` + deIndented (which is the JSX content) + `\n  ` before `)`.
  const restored = "\n    " + deIndented + "\n  ";
  src = src.slice(0, openStart) + restored + src.slice(closeEnd);

  // Remove the import we added (only if no other DiagramFigure references remain)
  if (!src.includes("<DiagramFigure")) {
    src = src.replace(IMPORT_LINE, "");
  }
  writeFileSync(path, src);
  undone++;
}

console.log(`[undo] reverted=${undone}, kept (pre-existing wraps)=${kept}`);
