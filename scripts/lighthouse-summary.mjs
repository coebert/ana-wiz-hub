#!/usr/bin/env node
/**
 * Parse Lighthouse CI results in `.lighthouseci/` and emit a Markdown
 * summary of failing categories and affected pages.
 *
 * Usage:
 *   node scripts/lighthouse-summary.mjs [--out summary.md]
 *
 * Behavior:
 * - Reads `.lighthouseci/assertion-results.json` (produced by `lhci
 *   autorun`) when present. Falls back to scanning `lhr-*.json` files
 *   and re-applying category minScore thresholds from `.lighthouserc.json`.
 * - Groups failures by URL, showing the category, actual score, and
 *   threshold. Writes the Markdown to stdout and, if `--out` is given,
 *   to a file (used by the workflow for the PR comment body and the
 *   GitHub step summary).
 */
import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LHCI_DIR = ".lighthouseci";
const RC_PATH = ".lighthouserc.json";

function loadThresholds() {
  if (!existsSync(RC_PATH)) return {};
  const rc = JSON.parse(readFileSync(RC_PATH, "utf8"));
  const out = {};
  const assertions = rc?.ci?.assert?.assertions ?? {};
  for (const [key, val] of Object.entries(assertions)) {
    const cfg = Array.isArray(val) ? val[1] : val;
    if (cfg?.minScore != null) out[key] = cfg.minScore;
    if (cfg?.maxNumericValue != null) out[key + "::max"] = cfg.maxNumericValue;
  }
  return out;
}

function loadAssertionResults() {
  const path = join(LHCI_DIR, "assertion-results.json");
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function loadLhrs() {
  if (!existsSync(LHCI_DIR)) return [];
  return readdirSync(LHCI_DIR)
    .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(LHCI_DIR, f), "utf8")));
}

function fmtScore(n) {
  return n == null ? "—" : Math.round(n * 100).toString();
}

function summarize() {
  const thresholds = loadThresholds();
  const assertionResults = loadAssertionResults();
  const lhrs = loadLhrs();

  // pageScores[url][category] = median score
  const pageScores = {};
  for (const lhr of lhrs) {
    const url = lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl;
    if (!url) continue;
    pageScores[url] ??= {};
    for (const [cat, entry] of Object.entries(lhr.categories ?? {})) {
      const prev = pageScores[url][cat];
      // Keep the lowest across runs so failures aren't hidden by variance.
      pageScores[url][cat] = prev == null ? entry.score : Math.min(prev, entry.score);
    }
  }

  const failures = [];
  if (assertionResults?.length) {
    for (const r of assertionResults) {
      if (r.passed) continue;
      failures.push({
        url: r.url,
        auditId: r.auditId,
        actual: r.actual,
        expected: r.expected,
        operator: r.operator,
        level: r.level,
      });
    }
  } else {
    // Fallback: re-derive from category scores using thresholds
    for (const [url, cats] of Object.entries(pageScores)) {
      for (const [cat, score] of Object.entries(cats)) {
        const key = `categories:${cat}`;
        const min = thresholds[key];
        if (min != null && score < min) {
          failures.push({
            url,
            auditId: key,
            actual: score,
            expected: min,
            operator: ">=",
            level: "error",
          });
        }
      }
    }
  }

  const lines = [];
  lines.push("## 🚦 Lighthouse CI Summary");
  lines.push("");

  const urls = Object.keys(pageScores).sort();
  if (urls.length) {
    lines.push("### Category scores by page");
    lines.push("");
    lines.push("| Page | Perf | A11y | Best Prac. | SEO |");
    lines.push("| --- | ---: | ---: | ---: | ---: |");
    for (const url of urls) {
      const c = pageScores[url];
      lines.push(
        `| \`${url}\` | ${fmtScore(c.performance)} | ${fmtScore(c.accessibility)} | ${fmtScore(c["best-practices"])} | ${fmtScore(c.seo)} |`,
      );
    }
    lines.push("");
  }

  if (!failures.length) {
    lines.push("✅ **All Lighthouse assertions passed.**");
  } else {
    const errors = failures.filter((f) => f.level === "error");
    const warns = failures.filter((f) => f.level !== "error");
    lines.push(
      `❌ **${errors.length} error${errors.length === 1 ? "" : "s"}**` +
        (warns.length ? `, ⚠️ ${warns.length} warning${warns.length === 1 ? "" : "s"}` : ""),
    );
    lines.push("");
    lines.push("### Failing assertions");
    lines.push("");
    lines.push("| Level | Page | Audit / Category | Actual | Expected |");
    lines.push("| --- | --- | --- | ---: | ---: |");
    for (const f of failures) {
      const icon = f.level === "error" ? "❌" : "⚠️";
      const actual = f.auditId?.startsWith("categories:")
        ? fmtScore(f.actual)
        : String(f.actual);
      const expected = f.auditId?.startsWith("categories:")
        ? fmtScore(f.expected)
        : `${f.operator ?? ""} ${f.expected}`.trim();
      lines.push(`| ${icon} | \`${f.url ?? "—"}\` | \`${f.auditId}\` | ${actual} | ${expected} |`);
    }
  }

  lines.push("");
  lines.push(
    "<sub>Full HTML/JSON reports are attached to this run as the `lhci-report-*` artifact.</sub>",
  );
  return lines.join("\n");
}

const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const out = outFlag >= 0 ? args[outFlag + 1] : null;

const md = summarize();
process.stdout.write(md + "\n");
if (out) writeFileSync(out, md + "\n");
