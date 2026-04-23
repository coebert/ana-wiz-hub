#!/usr/bin/env node
/**
 * scripts/check-exam-tags.mjs
 *
 * Scans src/**\/*.{ts,tsx} for string literals in exam-related contexts
 * (examTags arrays, `exam:` / `exams:` properties, `examTags` variables)
 * and reports any value that isn't one of the valid ExamTag values.
 *
 * Reuses the same rule as `lovable-local/valid-exam-tag` so behaviour
 * stays in sync with ESLint. Run via `npm run check:exam-tags` (or
 * `bun run check:exam-tags`). Exits non-zero on any violation, suitable
 * for CI / pre-commit hooks.
 *
 * Usage:
 *   node scripts/check-exam-tags.mjs            # scans src/
 *   node scripts/check-exam-tags.mjs path/to/dir
 */
import { readFileSync, statSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { Linter } from "eslint";
import tsParser from "@typescript-eslint/parser";
import validExamTag from "../eslint-rules/valid-exam-tag.js";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const TARGET = resolve(process.argv[2] ?? join(ROOT, "src"));

const EXTENSIONS = new Set([".ts", ".tsx"]);
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".git"]);

/** Recursively collect .ts/.tsx files under `dir`. */
function walk(dir, out = []) {
  const stat = statSync(dir);
  if (stat.isFile()) {
    if (EXTENSIONS.has(extname(dir))) out.push(dir);
    return out;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(join(dir, entry.name), out);
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name))) {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

function extname(p) {
  const i = p.lastIndexOf(".");
  return i === -1 ? "" : p.slice(i);
}

const linter = new Linter({ configType: "flat" });
const config = [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "lovable-local": { rules: { "valid-exam-tag": validExamTag } },
    },
    rules: {
      "lovable-local/valid-exam-tag": "error",
    },
  },
];

const files = walk(TARGET);
let totalViolations = 0;
const violationsByFile = [];

for (const file of files) {
  const code = readFileSync(file, "utf8");
  const messages = linter.verify(code, config, { filename: file });
  const examTagMessages = messages.filter(
    (m) => m.ruleId === "lovable-local/valid-exam-tag",
  );
  if (examTagMessages.length > 0) {
    violationsByFile.push({ file, messages: examTagMessages });
    totalViolations += examTagMessages.length;
  }
}

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

if (totalViolations === 0) {
  console.log(
    `${GREEN}✓${RESET} No invalid ExamTag strings found in ${DIM}${relative(ROOT, TARGET) || TARGET}${RESET} (${files.length} files scanned).`,
  );
  process.exit(0);
}

console.log(
  `${RED}✗${RESET} Found ${BOLD}${totalViolations}${RESET} invalid ExamTag string${totalViolations === 1 ? "" : "s"} across ${violationsByFile.length} file${violationsByFile.length === 1 ? "" : "s"}:\n`,
);

for (const { file, messages } of violationsByFile) {
  console.log(`${BOLD}${relative(ROOT, file)}${RESET}`);
  for (const m of messages) {
    console.log(
      `  ${DIM}${m.line}:${m.column}${RESET}  ${RED}error${RESET}  ${m.message}`,
    );
  }
  console.log();
}

console.log(
  `${DIM}Valid ExamTags: primary, final, fficm, edic. Run with --fix via ESLint:${RESET}`,
);
console.log(`  ${DIM}bunx eslint --fix <file>${RESET}\n`);

process.exit(1);
