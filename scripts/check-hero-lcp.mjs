#!/usr/bin/env node
/**
 * Dedicated Lighthouse assertion for the homepage hero element.
 *
 * LHCI's built-in assertions can gate numeric audits but can't verify
 * *which* element Lighthouse identified as the LCP — that lives inside
 * the `largest-contentful-paint-element` diagnostic audit's details.
 *
 * This script post-processes `.lighthouseci/{desktop,mobile}/lhr-*.json`
 * and enforces two hero-specific contracts on the homepage:
 *
 *   1. The LCP element selector matches the hero (the H1 wordmark or
 *      the brain-logo <img>). If a heavier element (a section card,
 *      footer text, etc.) becomes the LCP, mobile perf has regressed
 *      even if the numeric threshold passes.
 *   2. Median LCP is under the per-form-factor hero budget:
 *         desktop ≤ 1800 ms, mobile ≤ 2500 ms.
 *
 * Emits a Markdown summary (stdout + optional --out file) and exits
 * non-zero on any failure so the CI job fails.
 */
import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VARIANTS = [
  { key: "desktop", label: "🖥️ Desktop", dir: ".lighthouseci/desktop", lcpBudgetMs: 1800 },
  { key: "mobile", label: "📱 Mobile", dir: ".lighthouseci/mobile", lcpBudgetMs: 2500 },
];
const HOMEPAGE_MATCHER = (url) => {
  try {
    const u = new URL(url);
    return u.pathname === "/" || u.pathname.endsWith("/index.html");
  } catch { return false; }
};
// Selectors / snippets we accept as "the hero". The hero contains the
// H1 wordmark and a decorative brain-logo <img> (both rendered inside
// the hero <section>). Anything else is a regression signal.
const HERO_SELECTOR_PATTERNS = [
  /^h1\b/i,
  /\bh1\b/,
  /brain-logo/i,
  /section[^>]*>.*picture/i,
];
const HERO_TEXT_PATTERNS = [
  /AnaesthesiaCore/i,
  /FRCA/i,
];

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function loadLhrs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")));
}

function extractLcpElement(lhr) {
  const audit = lhr.audits?.["largest-contentful-paint-element"];
  const item = audit?.details?.items?.[0];
  // Newer Lighthouse nests the node under `.node`; older versions surface it flat.
  const node = item?.node ?? item?.element ?? item;
  if (!node) return null;
  return {
    selector: node.selector ?? "",
    snippet: node.snippet ?? "",
    nodeLabel: node.nodeLabel ?? "",
    path: node.path ?? "",
  };
}

function isHero(el) {
  if (!el) return false;
  const hay = `${el.selector}\n${el.snippet}\n${el.nodeLabel}`;
  return (
    HERO_SELECTOR_PATTERNS.some((r) => r.test(el.selector) || r.test(el.snippet)) ||
    HERO_TEXT_PATTERNS.some((r) => r.test(hay))
  );
}

function checkVariant(variant) {
  const lhrs = loadLhrs(variant.dir).filter((l) => HOMEPAGE_MATCHER(l.finalDisplayedUrl || l.finalUrl || l.requestedUrl));
  if (!lhrs.length) {
    return { variant, skipped: true, reason: "No homepage LHR found (build or LHCI likely failed)." };
  }
  const runs = lhrs.map((lhr) => ({
    lcpMs: lhr.audits?.["largest-contentful-paint"]?.numericValue ?? null,
    element: extractLcpElement(lhr),
  }));
  const lcpMs = runs.map((r) => r.lcpMs).filter((v) => v != null);
  const medianLcp = median(lcpMs);
  // Take the element from the median run (or the first if we can't align).
  const sortedByLcp = [...runs].filter((r) => r.lcpMs != null).sort((a, b) => a.lcpMs - b.lcpMs);
  const medianRun = sortedByLcp[Math.floor(sortedByLcp.length / 2)] ?? runs[0];
  const element = medianRun?.element ?? null;
  const heroOk = isHero(element);
  const budgetOk = medianLcp != null && medianLcp <= variant.lcpBudgetMs;
  return {
    variant,
    skipped: false,
    element,
    medianLcp,
    heroOk,
    budgetOk,
    passed: heroOk && budgetOk,
  };
}

function fmtMs(n) { return n == null ? "—" : `${Math.round(n)} ms`; }
function truncate(s, n = 80) { return !s ? "—" : (s.length > n ? s.slice(0, n - 1) + "…" : s); }

function render(results) {
  const lines = ["## 🎯 Hero LCP Assertion", ""];
  lines.push("Dedicated check: the homepage LCP must be the hero element and meet the form-factor budget.");
  lines.push("");
  lines.push("| Form factor | LCP element | Median LCP | Budget | Result |");
  lines.push("| --- | --- | ---: | ---: | :---: |");
  for (const r of results) {
    if (r.skipped) {
      lines.push(`| ${r.variant.label} | — | — | ${fmtMs(r.variant.lcpBudgetMs)} | ⏭️ skipped |`);
      continue;
    }
    const sel = truncate(r.element?.selector || r.element?.nodeLabel || r.element?.snippet, 70);
    const heroIcon = r.heroOk ? "✅ hero" : "❌ not hero";
    const budgetIcon = r.budgetOk ? "✅" : "❌";
    const overall = r.passed ? "✅" : "❌";
    lines.push(`| ${r.variant.label} | \`${sel}\` — ${heroIcon} | ${fmtMs(r.medianLcp)} ${budgetIcon} | ${fmtMs(r.variant.lcpBudgetMs)} | ${overall} |`);
  }
  lines.push("");
  const failed = results.filter((r) => !r.skipped && !r.passed);
  if (failed.length) {
    lines.push("**Failures:**");
    for (const r of failed) {
      if (!r.heroOk) lines.push(`- ${r.variant.label}: LCP element is not the hero — got \`${truncate(r.element?.selector, 100)}\` / snippet \`${truncate(r.element?.snippet, 100)}\`.`);
      if (!r.budgetOk) lines.push(`- ${r.variant.label}: median LCP ${fmtMs(r.medianLcp)} exceeds budget ${fmtMs(r.variant.lcpBudgetMs)}.`);
    }
  }
  return lines.join("\n");
}

const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const outPath = outFlag >= 0 ? args[outFlag + 1] : null;

const results = VARIANTS.map(checkVariant);
const md = render(results);
process.stdout.write(md + "\n");
if (outPath) writeFileSync(outPath, md + "\n");

const anyRan = results.some((r) => !r.skipped);
const anyFailed = results.some((r) => !r.skipped && !r.passed);
// If nothing ran (LHCI failed earlier) we don't want to double-fail the job —
// the LHCI step itself is already gated. Exit 0 so the summary still posts.
process.exit(anyRan && anyFailed ? 1 : 0);
