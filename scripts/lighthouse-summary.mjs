#!/usr/bin/env node
/**
 * Parse Lighthouse CI results and emit a Markdown summary of failing
 * categories, LCP, and affected pages — per form factor (desktop + mobile).
 *
 * Usage:
 *   node scripts/lighthouse-summary.mjs [--out summary.md]
 *
 * Behavior:
 * - Scans `.lighthouseci/desktop` and `.lighthouseci/mobile` (with a
 *   fallback to a flat `.lighthouseci/` directory for older runs).
 * - Per form factor: reads `assertion-results.json` (produced by `lhci
 *   autorun`), and derives a per-page category + LCP score table from
 *   `lhr-*.json`. Failures fall back to re-applying thresholds from the
 *   matching `.lighthouserc[.mobile].json` when assertion output is missing.
 * - Writes Markdown to stdout and, if `--out` is given, to a file (used
 *   by the workflow for the PR comment body and the job summary).
 */
import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VARIANTS = [
  { key: "desktop", label: "🖥️ Desktop", dir: ".lighthouseci/desktop", rc: ".lighthouserc.json" },
  { key: "mobile", label: "📱 Mobile", dir: ".lighthouseci/mobile", rc: ".lighthouserc.mobile.json" },
];
const LEGACY_DIR = ".lighthouseci";

function loadThresholds(rcPath) {
  if (!existsSync(rcPath)) return {};
  const rc = JSON.parse(readFileSync(rcPath, "utf8"));
  const out = {};
  const assertions = rc?.ci?.assert?.assertions ?? {};
  for (const [key, val] of Object.entries(assertions)) {
    const cfg = Array.isArray(val) ? val[1] : val;
    if (cfg?.minScore != null) out[key] = { minScore: cfg.minScore };
    if (cfg?.maxNumericValue != null) out[key] = { ...(out[key] ?? {}), maxNumericValue: cfg.maxNumericValue };
  }
  return out;
}

function loadJsonSafe(path) {
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { return null; }
}

function loadLhrs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")));
}

function fmtScore(n) { return n == null ? "—" : Math.round(n * 100).toString(); }
function fmtMs(n) { return n == null ? "—" : `${Math.round(n)} ms`; }

function summarizeVariant(variant) {
  const dir = existsSync(variant.dir) ? variant.dir : LEGACY_DIR;
  const thresholds = loadThresholds(variant.rc);
  const assertionResults = loadJsonSafe(join(dir, "assertion-results.json"));
  const lhrs = loadLhrs(dir);
  if (!lhrs.length && !assertionResults?.length) return null;

  // pageScores[url] = { categories, lcpMs } — worst across runs.
  const pageScores = {};
  for (const lhr of lhrs) {
    const url = lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl;
    if (!url) continue;
    pageScores[url] ??= { categories: {}, lcpMs: null };
    for (const [cat, entry] of Object.entries(lhr.categories ?? {})) {
      const prev = pageScores[url].categories[cat];
      pageScores[url].categories[cat] = prev == null ? entry.score : Math.min(prev, entry.score);
    }
    const lcp = lhr.audits?.["largest-contentful-paint"]?.numericValue;
    if (lcp != null) {
      const prev = pageScores[url].lcpMs;
      pageScores[url].lcpMs = prev == null ? lcp : Math.max(prev, lcp);
    }
  }

  const failures = [];
  if (assertionResults?.length) {
    for (const r of assertionResults) {
      if (r.passed) continue;
      failures.push({ url: r.url, auditId: r.auditId, actual: r.actual, expected: r.expected, operator: r.operator, level: r.level });
    }
  } else {
    for (const [url, { categories, lcpMs }] of Object.entries(pageScores)) {
      for (const [cat, score] of Object.entries(categories)) {
        const t = thresholds[`categories:${cat}`];
        if (t?.minScore != null && score < t.minScore) {
          failures.push({ url, auditId: `categories:${cat}`, actual: score, expected: t.minScore, operator: ">=", level: "error" });
        }
      }
      const lcpMax = thresholds["largest-contentful-paint"]?.maxNumericValue;
      if (lcpMax != null && lcpMs != null && lcpMs > lcpMax) {
        failures.push({ url, auditId: "largest-contentful-paint", actual: lcpMs, expected: lcpMax, operator: "<=", level: "error" });
      }
    }
  }

  return { variant, pageScores, failures, thresholds };
}

function renderVariant({ variant, pageScores, failures, thresholds }) {
  const lines = [];
  lines.push(`### ${variant.label}`);
  lines.push("");
  const lcpMax = thresholds["largest-contentful-paint"]?.maxNumericValue;
  const urls = Object.keys(pageScores).sort();
  if (urls.length) {
    lines.push(`| Page | Perf | A11y | Best Prac. | SEO | LCP${lcpMax ? ` (≤ ${lcpMax} ms)` : ""} |`);
    lines.push("| --- | ---: | ---: | ---: | ---: | ---: |");
    for (const url of urls) {
      const c = pageScores[url].categories;
      const lcp = pageScores[url].lcpMs;
      const lcpCell = lcp == null ? "—" : (lcpMax != null && lcp > lcpMax ? `❌ ${fmtMs(lcp)}` : `✅ ${fmtMs(lcp)}`);
      lines.push(`| \`${url}\` | ${fmtScore(c.performance)} | ${fmtScore(c.accessibility)} | ${fmtScore(c["best-practices"])} | ${fmtScore(c.seo)} | ${lcpCell} |`);
    }
    lines.push("");
  }
  if (!failures.length) {
    lines.push("✅ All assertions passed.");
  } else {
    const errors = failures.filter((f) => f.level === "error");
    const warns = failures.filter((f) => f.level !== "error");
    lines.push(`❌ **${errors.length} error${errors.length === 1 ? "" : "s"}**` + (warns.length ? `, ⚠️ ${warns.length} warning${warns.length === 1 ? "" : "s"}` : ""));
    lines.push("");
    lines.push("| Level | Page | Audit | Actual | Expected |");
    lines.push("| --- | --- | --- | ---: | ---: |");
    for (const f of failures) {
      const icon = f.level === "error" ? "❌" : "⚠️";
      const isCategory = f.auditId?.startsWith("categories:");
      const isTime = /paint|blocking|speed-index|interactive|first-/.test(f.auditId ?? "");
      const actual = isCategory ? fmtScore(f.actual) : isTime ? fmtMs(f.actual) : String(f.actual);
      const expected = isCategory ? fmtScore(f.expected) : isTime ? `${f.operator ?? "<="} ${fmtMs(f.expected)}` : `${f.operator ?? ""} ${f.expected}`.trim();
      lines.push(`| ${icon} | \`${f.url ?? "—"}\` | \`${f.auditId}\` | ${actual} | ${expected} |`);
    }
  }
  lines.push("");
  return lines.join("\n");
}

function summarize() {
  const results = VARIANTS.map(summarizeVariant).filter(Boolean);
  const lines = ["## 🚦 Lighthouse CI Summary", ""];
  if (!results.length) {
    lines.push("_No Lighthouse output found in `.lighthouseci/`._");
  } else {
    const totalErrors = results.reduce((n, r) => n + r.failures.filter((f) => f.level === "error").length, 0);
    lines.push(totalErrors === 0
      ? "✅ **All Lighthouse assertions passed on desktop and mobile.**"
      : `❌ **${totalErrors} assertion${totalErrors === 1 ? "" : "s"} failed across form factors.**`);
    lines.push("");
    for (const r of results) lines.push(renderVariant(r));
  }
  lines.push("<sub>Full HTML/JSON reports are attached as the `lhci-report-*` artifact.</sub>");
  return lines.join("\n");
}

const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const out = outFlag >= 0 ? args[outFlag + 1] : null;
const md = summarize();
process.stdout.write(md + "\n");
if (out) writeFileSync(out, md + "\n");
