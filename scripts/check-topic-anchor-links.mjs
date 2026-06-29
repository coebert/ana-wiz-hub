#!/usr/bin/env node
/**
 * Validates in-page hash anchors across:
 *   • src/pages/topics/**.tsx         — topic pages (`href="#..."`)
 *   • src/components/diagrams/**.tsx  — diagram + SVG components
 *
 * Two link classes are checked with different scopes:
 *   1. **SVG-internal refs** — `<mpath href="#x" />`, `<use href="#x" />`,
 *      `xlinkHref="#x"`. Must resolve to an `id="..."` defined in the SAME
 *      file (these are SVG fragment refs and don't traverse documents).
 *   2. **In-page anchor links** — `<a href="#x">`. Must resolve EITHER
 *      within the same file OR within the global set of anchors rendered
 *      by any topic page (since diagrams are embedded inside topic pages).
 *
 * Anchors recognised per file:
 *   • literal `id="..."` / `id={"..."}`
 *   • slugified `<h2>` text (SectionLayout injects both the raw slug and
 *     a `toc-<slug>` form)
 *   • `<CollapsibleSubsection title="...">` → `section-<slug>` (via
 *     src/lib/sectionAnchor.ts)
 *   • implicit FAQ anchor when `<TopicFaqs>` is rendered
 *
 * Also scans any inline HTML passed via `dangerouslySetInnerHTML` string
 * literals defined in the same file (data arrays etc.) — the same
 * `href="#..."` regex picks those up because the strings live in source.
 *
 * Exits non-zero on any unresolved anchor — gates CI / unit tests.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = join(ROOT, "src", "pages", "topics");
const DIAGRAMS_DIR = join(ROOT, "src", "components", "diagrams");

function listTsx(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listTsx(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

/** Mirror of slugify() in SectionLayout. */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Mirror of sectionAnchorId() in src/lib/sectionAnchor.ts. */
function sectionAnchorId(title) {
  const slug = String(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return "section-" + slug;
}

function collectAnchors(src) {
  const ids = new Set();

  // 1. Literal id="..." / id={"..."} — covers <div id=>, <path id=>,
  //    <g id=>, etc. across both JSX and inline SVG.
  for (const m of src.matchAll(/\bid=(?:"([^"]+)"|\{\s*"([^"]+)"\s*\})/g)) {
    ids.add(m[1] ?? m[2]);
  }

  // 2. <h2> literal text → slug + toc-slug
  for (const m of src.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const text = m[1]
      .replace(/\{[^{}]*\}/g, " ")
      .replace(/<[^>]+>/g, " ")
      .trim();
    if (!text) continue;
    const s = slugify(text);
    if (s) {
      ids.add(s);
      ids.add(`toc-${s}`);
    }
  }

  // 3. <CollapsibleSubsection title="..."> → section-<slug>
  for (const m of src.matchAll(
    /<CollapsibleSubsection[^>]*\btitle="([^"]+)"/g,
  )) {
    ids.add(sectionAnchorId(m[1]));
  }

  // 4. <TopicFaqs> default heading
  if (/<TopicFaqs\b/.test(src)) {
    ids.add(sectionAnchorId("Frequently asked"));
    ids.add(sectionAnchorId("Frequently asked questions"));
  }

  return ids;
}

const topicFiles = listTsx(TOPICS_DIR);
const diagramFiles = statSync(DIAGRAMS_DIR).isDirectory()
  ? listTsx(DIAGRAMS_DIR)
  : [];

// Build per-file anchor maps + the global anchor set rendered by topic pages.
const fileAnchors = new Map();
const globalTopicAnchors = new Set();
for (const file of [...topicFiles, ...diagramFiles]) {
  const src = readFileSync(file, "utf8");
  const ids = collectAnchors(src);
  fileAnchors.set(file, { src, ids });
}
for (const file of topicFiles) {
  for (const id of fileAnchors.get(file).ids) globalTopicAnchors.add(id);
}

const issues = [];
let auditedLinks = 0;
let auditedSvgRefs = 0;

const A_HASH_RE = /<a\b[^>]*\bhref="#([a-z0-9_-]+)"/gi;
const PLAIN_HASH_RE = /href="#([a-zA-Z0-9_-]+)"/g;
const SVG_REF_RE =
  /<(?:mpath|use|textPath|linearGradient|radialGradient|pattern|filter|clipPath|mask)\b[^>]*\b(?:xlink:href|xlinkHref|href)="#([a-zA-Z0-9_-]+)"/g;

for (const [file, { src, ids }] of fileAnchors) {
  const isDiagram = file.startsWith(DIAGRAMS_DIR);
  const rel = relative(ROOT, file);

  // 1. SVG-internal references — must resolve within the same file.
  for (const m of src.matchAll(SVG_REF_RE)) {
    auditedSvgRefs++;
    const anchor = m[1];
    if (!ids.has(anchor)) {
      issues.push({
        file: rel,
        anchor,
        kind: "svg-internal",
        detail:
          "SVG fragment reference must resolve to an id within the same file.",
      });
    }
  }

  // 2. <a href="#..."> in-page anchor links.
  //    Topic pages: resolve within same file.
  //    Diagram components: resolve within same file OR globally across topic pages.
  for (const m of src.matchAll(A_HASH_RE)) {
    auditedLinks++;
    const anchor = m[1];
    if (ids.has(anchor)) continue;
    if (isDiagram && globalTopicAnchors.has(anchor)) continue;
    issues.push({
      file: rel,
      anchor,
      kind: isDiagram ? "diagram-anchor" : "topic-anchor",
      detail: isDiagram
        ? "No matching id in this diagram or any topic page that could host it."
        : "No matching id in this topic page.",
    });
  }

  // 3. Catch href="#..." that aren't on <a> but live in plain strings
  //    (e.g. inside data arrays later rendered via dangerouslySetInnerHTML).
  //    Same resolution rule as <a>.
  const seen = new Set();
  for (const m of src.matchAll(PLAIN_HASH_RE)) {
    const anchor = m[1];
    const key = `${anchor}@${m.index}`;
    if (seen.has(key)) continue;
    seen.add(key);
    // Skip if this match is already part of an <a> we just audited.
    const ctx = src.slice(Math.max(0, m.index - 60), m.index);
    if (/<a\b[^>]*$/i.test(ctx)) continue;
    // Skip if it's part of an SVG fragment ref we just audited.
    if (/<(?:mpath|use|textPath|linearGradient|radialGradient|pattern|filter|clipPath|mask)\b[^>]*$/i.test(ctx)) continue;
    auditedLinks++;
    if (ids.has(anchor)) continue;
    if (isDiagram && globalTopicAnchors.has(anchor)) continue;
    if (!isDiagram && globalTopicAnchors.has(anchor)) continue; // tolerated cross-topic
    issues.push({
      file: rel,
      anchor,
      kind: "inline-html-anchor",
      detail:
        "Anchor used in inline HTML / data string does not resolve in this file or any topic page.",
    });
  }
}

if (issues.length === 0) {
  console.log(
    `✓ No broken hash anchors across ${auditedLinks} <a>/inline-HTML links and ${auditedSvgRefs} SVG fragment refs in ${fileAnchors.size} files.`,
  );
  process.exit(0);
}

console.error("✗ Broken hash anchors detected:\n");
for (const { file, anchor, kind, detail } of issues) {
  console.error(`  [${kind}] ${file}  →  #${anchor}`);
  console.error(`      ${detail}`);
}
console.error(
  `\nFix: add a matching id="..."/heading/CollapsibleSubsection, or correct the href.`,
);
process.exit(1);
