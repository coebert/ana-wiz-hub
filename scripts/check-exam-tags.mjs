#!/usr/bin/env node
/**
 * scripts/check-exam-tags.mjs
 *
 * Scans src/**\/*.{ts,tsx} for string literals in exam-related contexts
 * (examTags arrays, `exam:` / `exams:` properties, `examTags` variables)
 * and reports any value that isn't one of the valid ExamTag values.
 *
 * Reuses the same rule as `lovable-local/valid-exam-tag` so behaviour
 * stays in sync with ESLint. Run via `npm run check -- --rule=exam-tags` (or
 * `bun run check -- --rule=exam-tags`). Exits non-zero on any unfixed violation,
 * suitable for CI / pre-commit hooks.
 *
 * Usage:
 *   node scripts/check-exam-tags.mjs               # scan src/, report only
 *   node scripts/check-exam-tags.mjs --fix         # apply ESLint autofixes
 *   node scripts/check-exam-tags.mjs path/to/dir   # custom target
 *   node scripts/check-exam-tags.mjs --fix src/    # combine
 */
import { readFileSync, writeFileSync, statSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { Linter } from "eslint";
import tseslint from "typescript-eslint";
import validExamTag from "../eslint-rules/valid-exam-tag.js";

// --- argv parsing ---------------------------------------------------------
const args = process.argv.slice(2);
const FIX = args.includes("--fix");
const positional = args.filter((a) => !a.startsWith("--"));

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const TARGET = resolve(positional[0] ?? join(ROOT, "src"));

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
      parser: tseslint.parser,
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

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

const files = walk(TARGET);
let totalViolations = 0;
let totalFixed = 0;
const fixedFiles = [];
const violationsByFile = [];

for (const file of files) {
  const code = readFileSync(file, "utf8");

  if (FIX) {
    // Iteratively apply autofixes until stable, then write back if changed.
    const result = linter.verifyAndFix(code, config, { filename: file });
    const remaining = result.messages.filter(
      (m) => m.ruleId === "lovable-local/valid-exam-tag",
    );

    if (result.fixed && result.output !== code) {
      writeFileSync(file, result.output);
      // Number of fixes = original violation count minus what's still left.
      const before = linter
        .verify(code, config, { filename: file })
        .filter((m) => m.ruleId === "lovable-local/valid-exam-tag").length;
      const fixedHere = before - remaining.length;
      totalFixed += fixedHere;
      fixedFiles.push({ file, count: fixedHere });
    }

    if (remaining.length > 0) {
      violationsByFile.push({ file, messages: remaining });
      totalViolations += remaining.length;
    }
  } else {
    const messages = linter
      .verify(code, config, { filename: file })
      .filter((m) => m.ruleId === "lovable-local/valid-exam-tag");
    if (messages.length > 0) {
      violationsByFile.push({ file, messages });
      totalViolations += messages.length;
    }
  }
}

const targetLabel = relative(ROOT, TARGET) || TARGET;

// --- Report ---------------------------------------------------------------
if (FIX && totalFixed > 0) {
  console.log(
    `${GREEN}✓${RESET} Auto-fixed ${BOLD}${totalFixed}${RESET} ExamTag violation${totalFixed === 1 ? "" : "s"} across ${fixedFiles.length} file${fixedFiles.length === 1 ? "" : "s"}:\n`,
  );
  for (const { file, count } of fixedFiles) {
    console.log(
      `  ${GREEN}fixed${RESET} ${relative(ROOT, file)} ${DIM}(${count})${RESET}`,
    );
  }
  console.log();
}

if (totalViolations === 0) {
  console.log(
    `${GREEN}✓${RESET} No${FIX ? " remaining" : ""} invalid ExamTag strings in ${DIM}${targetLabel}${RESET} (${files.length} files scanned).`,
  );
  process.exit(0);
}

console.log(
  `${RED}✗${RESET} ${FIX ? "Could not auto-fix " : "Found "}${BOLD}${totalViolations}${RESET} invalid ExamTag string${totalViolations === 1 ? "" : "s"} across ${violationsByFile.length} file${violationsByFile.length === 1 ? "" : "s"}:\n`,
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

if (FIX) {
  console.log(
    `${YELLOW}!${RESET} ${DIM}These could not be auto-fixed (e.g. dynamic values, ambiguous typos). Edit by hand.${RESET}\n`,
  );
} else {
  console.log(
    `${DIM}Valid ExamTags: primary, final, fficm, edic. Run with --fix to apply autofixes:${RESET}`,
  );
  console.log(`  ${DIM}node scripts/check-exam-tags.mjs --fix${RESET}\n`);
}

process.exit(1);
