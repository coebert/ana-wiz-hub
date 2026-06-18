/**
 * Weekly SEO review report.
 *
 * Scans the project for SEO issues across:
 *   - index.html (sitewide head: title, description, canonical, og:*)
 *   - All route components in src/pages (heading structure: h1 presence, h-level skips)
 *   - public/sitemap.xml + public/sitemaps/*.xml (entry count vs route count)
 *
 * Compares findings to the snapshot stored in .seo-snapshots/latest.json (the
 * previous weekly run) and emits two outputs:
 *   1. Refreshed snapshot at .seo-snapshots/latest.json (committed by CI)
 *   2. Markdown report at /mnt/documents/seo-report-YYYY-MM-DD.md showing:
 *        - current findings (pass / warn / fail)
 *        - NEW issues introduced since last week
 *        - RESOLVED issues fixed since last week
 *        - high-level deltas (route count, sitemap entry count)
 *
 * Usage:
 *   bunx tsx scripts/seo-weekly-report.ts
 *
 * Wire into a weekly cron / GitHub Action to file the artifact automatically.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";

const ROOT = process.cwd();
const SNAPSHOT_DIR = resolve(ROOT, ".seo-snapshots");
const SNAPSHOT_PATH = join(SNAPSHOT_DIR, "latest.json");
const REPORT_DIR = "/mnt/documents";
const today = new Date().toISOString().slice(0, 10);
const REPORT_PATH = join(REPORT_DIR, `seo-report-${today}.md`);

type Severity = "pass" | "warn" | "fail";
interface Finding {
  id: string;
  severity: Severity;
  category: "meta" | "heading" | "og" | "sitemap";
  message: string;
}

const findings: Finding[] = [];
const push = (f: Finding) => findings.push(f);

// ---------- index.html (sitewide head) ----------
const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
const meta = (name: string) =>
  html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, "i"))?.[1];
const og = (prop: string) =>
  html.match(new RegExp(`<meta\\s+property="${prop}"\\s+content="([^"]*)"`, "i"))?.[1];

const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
const desc = meta("description") ?? "";

push({
  id: "meta:title:length",
  category: "meta",
  severity: title.length === 0 ? "fail" : title.length > 60 ? "warn" : "pass",
  message: `<title> is ${title.length} chars (target ≤ 60): "${title}"`,
});
push({
  id: "meta:description:length",
  category: "meta",
  severity: desc.length === 0 ? "fail" : desc.length > 160 ? "warn" : "pass",
  message: `meta description is ${desc.length} chars (target ≤ 160)`,
});

for (const prop of ["og:title", "og:description", "og:url", "og:type"]) {
  const v = og(prop);
  push({
    id: `og:${prop}`,
    category: "og",
    severity: v ? "pass" : "fail",
    message: v ? `${prop} present` : `${prop} missing from index.html`,
  });
}

// og:image is optional but worth tracking
push({
  id: "og:og:image",
  category: "og",
  severity: og("og:image") ? "pass" : "warn",
  message: og("og:image") ? "og:image present" : "og:image missing (optional but recommended for social previews)",
});

// ---------- Heading structure across page components ----------
function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (entry.endsWith(".tsx")) yield p;
  }
}

// Mirror src/test/seo-regression.test.ts HEADING_SKIP_ALLOWLIST so the
// snapshot doesn't keep flagging intentional, blessed exceptions.
const HEADING_SKIP_ALLOWLIST = new Set<string>([
  // DrugDetail renders compact <h1> + utility <h3> labels (no thematic
  // <h2> needed — the page is one cohesive monograph view).
  "src/pages/DrugDetail.tsx",
]);

const pageFiles = [...walk(resolve(ROOT, "src/pages"))];
let pagesWithH1 = 0;
const pagesMissingH1: string[] = [];
const pagesWithSkips: string[] = [];

for (const file of pageFiles) {
  const rel = file.replace(`${ROOT}/`, "");
  const src = readFileSync(file, "utf8");
  const hasH1 = /<h1[\s>]/.test(src);
  if (hasH1) pagesWithH1++;
  else pagesMissingH1.push(rel);

  if (HEADING_SKIP_ALLOWLIST.has(rel)) continue;
  // Detect h-level skips (e.g., h1 → h3 with no h2)
  const levels = [...src.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      pagesWithSkips.push(rel);
      break;
    }
  }
}

// TopicTemplate composes SectionLayout — an <h1> in either satisfies the
// requirement (matches src/test/seo-regression.test.ts).
const templateSrc = readFileSync(resolve(ROOT, "src/components/TopicTemplate.tsx"), "utf8");
const sectionLayoutSrc = readFileSync(
  resolve(ROOT, "src/components/SectionLayout.tsx"),
  "utf8",
);
const templateHasH1 = /<h1[\s>]/.test(templateSrc) || /<h1[\s>]/.test(sectionLayoutSrc);

push({
  id: "heading:topic-template-h1",
  category: "heading",
  severity: templateHasH1 ? "pass" : "fail",
  message: templateHasH1
    ? "TopicTemplate renders an <h1> (directly or via SectionLayout)"
    : "TopicTemplate is missing an <h1> — every topic page inherits this gap",
});


push({
  id: "heading:pages-with-h1",
  category: "heading",
  severity: pagesMissingH1.length === pageFiles.length ? "fail" : pagesMissingH1.length > pageFiles.length / 2 ? "warn" : "pass",
  message: `${pagesWithH1}/${pageFiles.length} page components contain an <h1>`,
});

push({
  id: "heading:level-skips",
  category: "heading",
  severity: pagesWithSkips.length === 0 ? "pass" : "warn",
  message:
    pagesWithSkips.length === 0
      ? "No heading-level skips detected"
      : `${pagesWithSkips.length} page(s) skip a heading level: ${pagesWithSkips.slice(0, 5).join(", ")}${pagesWithSkips.length > 5 ? "…" : ""}`,
});

// ---------- Sitemap coverage ----------
const sitemapsDir = resolve(ROOT, "public/sitemaps");
let totalUrls = 0;
if (existsSync(sitemapsDir)) {
  for (const f of readdirSync(sitemapsDir).filter((f) => f.endsWith(".xml"))) {
    const xml = readFileSync(join(sitemapsDir, f), "utf8");
    totalUrls += [...xml.matchAll(/<loc>/g)].length;
  }
}
const appSrc = readFileSync(resolve(ROOT, "src/App.tsx"), "utf8");
const routeCount = [...appSrc.matchAll(/<Route\s/g)].length;

push({
  id: "sitemap:url-count",
  category: "sitemap",
  severity: totalUrls === 0 ? "fail" : totalUrls < routeCount * 0.5 ? "warn" : "pass",
  message: `${totalUrls} URLs across per-section sitemaps; ${routeCount} <Route> entries in src/App.tsx`,
});

// ---------- Diff against previous snapshot ----------
type Snapshot = { generatedAt: string; findings: Record<string, Finding> };
let previous: Snapshot | null = null;
if (existsSync(SNAPSHOT_PATH)) {
  try {
    previous = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"));
  } catch {
    previous = null;
  }
}

const currentMap = Object.fromEntries(findings.map((f) => [f.id, f]));
const newIssues: Finding[] = [];
const resolvedIssues: Finding[] = [];
const worsened: Array<{ id: string; from: Severity; to: Severity }> = [];

if (previous) {
  for (const f of findings) {
    const prev = previous.findings[f.id];
    if (!prev && f.severity !== "pass") newIssues.push(f);
    else if (prev && prev.severity === "pass" && f.severity !== "pass") newIssues.push(f);
    else if (prev && prev.severity !== "pass" && f.severity === "pass") resolvedIssues.push(prev);
    else if (prev && prev.severity !== f.severity) worsened.push({ id: f.id, from: prev.severity, to: f.severity });
  }
}

// ---------- Persist snapshot ----------
if (!existsSync(SNAPSHOT_DIR)) mkdirSync(SNAPSHOT_DIR, { recursive: true });
const nextSnapshot: Snapshot = { generatedAt: today, findings: currentMap };
writeFileSync(SNAPSHOT_PATH, JSON.stringify(nextSnapshot, null, 2));

// ---------- Render markdown ----------
const icon = (s: Severity) => (s === "pass" ? "✅" : s === "warn" ? "⚠️" : "❌");
const counts = {
  pass: findings.filter((f) => f.severity === "pass").length,
  warn: findings.filter((f) => f.severity === "warn").length,
  fail: findings.filter((f) => f.severity === "fail").length,
};

const sections: Record<Finding["category"], string> = {
  meta: "Meta tags",
  heading: "Heading structure",
  og: "Open Graph",
  sitemap: "Sitemap coverage",
};

const groupBy = (cat: Finding["category"]) =>
  findings
    .filter((f) => f.category === cat)
    .map((f) => `- ${icon(f.severity)} **${f.id}** — ${f.message}`)
    .join("\n");

const lines: string[] = [];
lines.push(`# Weekly SEO review — ${today}`);
lines.push("");
lines.push(
  `**Summary:** ${counts.pass} pass · ${counts.warn} warn · ${counts.fail} fail` +
    (previous ? ` · _vs snapshot ${previous.generatedAt}_` : " · _first run, no prior snapshot_"),
);
lines.push("");

if (previous) {
  lines.push("## Changes since last review");
  if (newIssues.length === 0 && resolvedIssues.length === 0 && worsened.length === 0) {
    lines.push("- No SEO state changes detected.");
  } else {
    if (newIssues.length) {
      lines.push("### 🆕 New issues");
      for (const f of newIssues) lines.push(`- ${icon(f.severity)} **${f.id}** — ${f.message}`);
    }
    if (worsened.length) {
      lines.push("### 🔻 Worsened");
      for (const w of worsened) lines.push(`- **${w.id}** — ${w.from} → ${w.to}`);
    }
    if (resolvedIssues.length) {
      lines.push("### ✅ Resolved");
      for (const f of resolvedIssues) lines.push(`- **${f.id}** — was ${f.severity}, now passing`);
    }
  }
  lines.push("");
}

for (const cat of Object.keys(sections) as Finding["category"][]) {
  const body = groupBy(cat);
  if (!body) continue;
  lines.push(`## ${sections[cat]}`);
  lines.push(body);
  lines.push("");
}

lines.push("---");
lines.push(`_Snapshot persisted to \`.seo-snapshots/latest.json\`. Run \`bunx tsx scripts/seo-weekly-report.ts\` next week to refresh._`);

if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });
writeFileSync(REPORT_PATH, lines.join("\n"));

console.log(
  `SEO weekly report written to ${REPORT_PATH} (${counts.pass} pass / ${counts.warn} warn / ${counts.fail} fail; ${newIssues.length} new, ${resolvedIssues.length} resolved)`,
);
