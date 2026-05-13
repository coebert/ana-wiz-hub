#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
const OPEN_RE = /\n {4}<DiagramFigure\n {6}id="[^"]+"\n {6}title="[^"]+"\n {6}description="Auto-generated wrapper for the [^"]+"\n {4}>\n {6}/;
const CLOSE_RE = /\n {4}<\/DiagramFigure>\n  /;
const IMPORT_LINE = `\nimport { DiagramFigure } from "./_shared/DiagramFigure";`;
for (const path of process.argv.slice(2)) {
  let src = readFileSync(path, "utf8");
  const om = src.match(OPEN_RE); if (!om) { console.log("skip", path); continue; }
  const after = src.slice(om.index + om[0].length);
  const cm = after.match(CLOSE_RE); if (!cm) { console.log("skip-close", path); continue; }
  const closeStart = om.index + om[0].length + cm.index;
  const closeEnd = closeStart + cm[0].length;
  const inner = src.slice(om.index + om[0].length, closeStart);
  const deIndented = inner.split("\n").map((l, i) => i === 0 ? l : (l.startsWith("  ") ? l.slice(2) : l)).join("\n");
  src = src.slice(0, om.index) + "\n    " + deIndented + "\n  " + src.slice(closeEnd);
  src = src.replace(IMPORT_LINE, "").replace(/^import \{ DiagramFigure \} from "\.\/_shared\/DiagramFigure";\n/, "");
  writeFileSync(path, src);
  console.log("reverted", path);
}
