#!/usr/bin/env node
/**
 * Validates that every in-page hash link (`href="#..."`) inside a topic page
 * actually resolves to an anchor rendered by that same page.
 *
 * Anchors recognised:
 *   • literal `id="..."` / `id={"..."}`
 *   • slugified `<h2>` text (SectionLayout injects both the raw slug and
 *     a `toc-<slug>` form)
 *   • `<CollapsibleSubsection title="...">` → `section-<slug>` (via
 *     src/lib/sectionAnchor.ts)
 *   • implicit FAQ anchor when `<TopicFaqs>` is rendered
 *
 * Exits non-zero on any unresolved anchor — gates CI / unit tests.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = join(ROOT, "src", "pages", "topics");

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

  for (const m of src.matchAll(/\bid=(?:"([^"]+)"|\{\s*"([^"]+)"\s*\})/g)) {
    ids.add(m[1] ?? m[2]);
  }

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

  for (const m of src.matchAll(
    /<CollapsibleSubsection[^>]*\btitle="([^"]+)"/g,
  )) {
    ids.add(sectionAnchorId(m[1]));
  }

  if (/<TopicFaqs\b/.test(src)) {
    // Default heading in TopicFaqs is "Frequently asked"; allow common variant.
    ids.add(sectionAnchorId("Frequently asked"));
    ids.add(sectionAnchorId("Frequently asked questions"));
  }

  return ids;
}

const files = listTsx(TOPICS_DIR);
const issues = [];
let auditedLinks = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const ids = collectAnchors(src);
  for (const m of src.matchAll(/href="#([a-z0-9-]+)"/g)) {
    auditedLinks++;
    const anchor = m[1];
    if (!ids.has(anchor)) {
      issues.push({
        file: relative(ROOT, file),
        anchor,
      });
    }
  }
}

if (issues.length === 0) {
  console.log(
    `✓ No broken topic-page hash anchors across ${auditedLinks} link targets in ${files.length} files.`,
  );
  process.exit(0);
}

console.error("✗ Broken hash anchors in topic pages:\n");
for (const { file, anchor } of issues) {
  console.error(`  ${file}  →  #${anchor}`);
}
console.error(
  `\nFix: add a matching id="..."/heading/CollapsibleSubsection in the same file, or correct the href.`,
);
process.exit(1);
