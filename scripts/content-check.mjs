#!/usr/bin/env node
/**
 * Unified content-quality CLI.
 *
 * Replaces the sprawl of `npm run check:*` scripts with one entry point:
 *
 *   npm run check                    # run every rule (was: check:all)
 *   npm run check -- --rule=diagrams # run one rule
 *   npm run check -- --rule=exam-tags --fix
 *   npm run check -- --list          # list rules
 *   npm run check -- --rule=safety-citations,drug-doses --report
 *
 * Each rule is a thin descriptor pointing at an existing script. Adding a
 * rule = one entry below, not a new package.json line.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPTS = __dirname;

/**
 * @typedef {{ id: string, description: string, cmd: string, args: string[], acceptsFlags?: string[] }} Rule
 */

/** @type {Rule[]} */
const RULES = [
  {
    id: "diagrams",
    description: "Flag diagram components used more than once inside a single topic page.",
    cmd: "node",
    args: [join(SCRIPTS, "check-duplicate-diagrams.mjs")],
  },
  {
    id: "sources",
    description: "Validate sectionSources labels in topics against src/data/references.ts.",
    cmd: "node",
    args: [join(SCRIPTS, "check-section-sources.mjs")],
  },
  {
    id: "exam-tags",
    description: "Ensure exam-tag string literals stay within the canonical set.",
    cmd: "node",
    args: [join(SCRIPTS, "check-exam-tags.mjs")],
    acceptsFlags: ["--fix"],
  },
  {
    id: "safety-citations",
    description: "Every safety-critical numeric claim in a topic must carry a citation.",
    cmd: "node",
    args: [join(SCRIPTS, "check-safety-citations.mjs")],
    acceptsFlags: ["--report"],
  },
  {
    id: "drug-doses",
    description: "Drug-dose ranges in topics must sit inside the allow-listed range.",
    cmd: "node",
    args: [join(SCRIPTS, "check-drug-dose-ranges.mjs")],
    acceptsFlags: ["--report"],
  },
  {
    id: "citation-stats",
    description: "Validate the sitewide citation counter shown on the landing page.",
    cmd: "tsx",
    args: [join(SCRIPTS, "check-citation-stats.mjs")],
  },
  {
    id: "source-excerpts",
    description: "Report per-topic coverage of verbatim source excerpts.",
    cmd: "node",
    args: [join(SCRIPTS, "check-source-excerpts.mjs")],
  },
  {
    id: "audit-fixes",
    description: "Every topic_audit_findings row marked fixed must have a matching citation.",
    cmd: "node",
    args: [join(SCRIPTS, "verify-audit-fixes.mjs")],
  },
];

/** Rules included in the default (all) run. Order matches the old `check:all`. */
const DEFAULT_RULES = [
  "diagrams",
  "sources",
  "exam-tags",
  "safety-citations",
  "drug-doses",
  "citation-stats",
];

function parseArgs(argv) {
  const out = { rules: null, extra: [], list: false, help: false };
  for (const a of argv) {
    if (a === "--list") out.list = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a.startsWith("--rule=")) {
      out.rules = a.slice("--rule=".length).split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      out.extra.push(a);
    }
  }
  return out;
}

function printHelp() {
  console.log(`content-check — unified content-quality CLI

Usage:
  npm run check                          # run all default rules
  npm run check -- --rule=<id>[,<id>…]   # run one or more rules
  npm run check -- --list                # list every rule
  npm run check -- --rule=exam-tags --fix
  npm run check -- --rule=safety-citations --report

Flags after --rule are forwarded to the underlying script when the rule
declares acceptsFlags. Unknown flags are still forwarded verbatim.`);
}

function printList() {
  const w = Math.max(...RULES.map((r) => r.id.length));
  for (const r of RULES) {
    const inAll = DEFAULT_RULES.includes(r.id) ? "*" : " ";
    console.log(`  ${inAll} ${r.id.padEnd(w)}  ${r.description}`);
  }
  console.log("\n  * = included in the default run");
}

function runRule(rule, extraArgs) {
  return new Promise((resolve) => {
    const forwarded = extraArgs.filter((f) =>
      !rule.acceptsFlags || rule.acceptsFlags.includes(f) || f.startsWith("--"),
    );
    const args = [...rule.args, ...forwarded];
    const label = `[${rule.id}]`;
    process.stdout.write(`\n${label} ${rule.cmd} ${args.map((a) => a.replace(SCRIPTS + "/", "")).join(" ")}\n`);
    const child = spawn(rule.cmd, args, { stdio: "inherit" });
    child.on("close", (code) => resolve({ id: rule.id, code: code ?? 1 }));
    child.on("error", (err) => {
      console.error(`${label} failed to spawn:`, err.message);
      resolve({ id: rule.id, code: 1 });
    });
  });
}

async function main() {
  const { rules, extra, list, help } = parseArgs(process.argv.slice(2));

  if (help) { printHelp(); return; }
  if (list) { printList(); return; }

  const wanted = rules ?? DEFAULT_RULES;
  const unknown = wanted.filter((id) => !RULES.find((r) => r.id === id));
  if (unknown.length) {
    console.error(`Unknown rule(s): ${unknown.join(", ")}`);
    console.error(`Available: ${RULES.map((r) => r.id).join(", ")}`);
    process.exit(2);
  }

  const results = [];
  for (const id of wanted) {
    const rule = RULES.find((r) => r.id === id);
    results.push(await runRule(rule, extra));
  }

  console.log("\n──────── summary ────────");
  for (const r of results) {
    console.log(`  ${r.code === 0 ? "✔" : "✘"} ${r.id}${r.code === 0 ? "" : ` (exit ${r.code})`}`);
  }
  const failed = results.filter((r) => r.code !== 0);
  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
