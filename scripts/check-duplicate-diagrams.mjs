#!/usr/bin/env node
/**
 * Flags diagram components used more than once inside a single topic page.
 *
 * Heuristic:
 *   - For each file in src/pages/topics, collect default+named imports from
 *     "@/components/diagrams/*".
 *   - Count JSX usages of each imported identifier (`<Name`).
 *   - Anything used >1 times in the same file is reported.
 *
 * Exits with code 1 if any duplicates are found, so it can gate publishing.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = join(ROOT, "src", "pages", "topics");

function listTsxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listTsxFiles(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

// Match imports from "@/components/diagrams/..."
const IMPORT_RE =
  /import\s+(?:(\w+)\s*(?:,\s*\{([^}]*)\})?|\{([^}]*)\})\s+from\s+["']@\/components\/diagrams\/[^"']+["']/g;

function collectDiagramImports(src) {
  const names = new Set();
  for (const m of src.matchAll(IMPORT_RE)) {
    const [, def, named1, named2] = m;
    if (def) names.add(def);
    const named = named1 || named2;
    if (named) {
      for (const part of named.split(",")) {
        const id = part.trim().split(/\s+as\s+/i).pop();
        if (id) names.add(id);
      }
    }
  }
  return [...names];
}

function countJsxUsages(src, name) {
  // Match `<Name` followed by space, `/`, `>`, or newline — not another identifier char.
  const re = new RegExp(`<${name}(?=[\\s/>\\n])`, "g");
  return (src.match(re) || []).length;
}

const files = listTsxFiles(TOPICS_DIR);
const issues = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const diagrams = collectDiagramImports(src);
  for (const name of diagrams) {
    const count = countJsxUsages(src, name);
    if (count > 1) {
      issues.push({ file: relative(ROOT, file), name, count });
    }
  }
}

if (issues.length === 0) {
  console.log(`✓ No duplicate diagram usages across ${files.length} topic pages.`);
  process.exit(0);
}

console.error("✗ Duplicate diagram components found:\n");
for (const { file, name, count } of issues) {
  console.error(`  ${file}: <${name}/> rendered ${count}× — keep a single instance.`);
}
console.error(
  "\nFix: render each diagram once, either inline in coreConcepts or via the diagrams prop — not both.",
);
process.exit(1);
