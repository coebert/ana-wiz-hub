#!/usr/bin/env node
/**
 * Automated SEO checklist for CI.
 *
 * Walks every prerendered `dist/<route>/index.html` produced by
 * `scripts/prerender-seo.ts` and validates the baked-in `<head>` — the
 * exact HTML crawlers see on the first byte. Catches the classes of
 * regression the SEO scanner surfaces after the fact:
 *
 *   • <title> length outside 10–60 chars
 *   • <meta name="description"> length outside 50–160 chars
 *   • Missing og:title / og:description / og:url / og:type
 *   • Missing twitter:card
 *   • <link rel="canonical"> missing, non-absolute, or pointing at a
 *     different origin than the project domain
 *   • og:url that doesn't match the canonical (crawlers ignore per-page
 *     og:* when og:url misroutes attribution)
 *   • Duplicate <title>, canonical, or og:url tags
 *   • Default Lovable placeholders ("Lovable App", "Lovable Generated
 *     Project") shipping to production
 *
 * Run modes:
 *   node scripts/check-seo-meta.mjs           # warns, exit 0
 *   node scripts/check-seo-meta.mjs --strict  # fails CI on any error
 *
 * Wired into `postbuild` in strict mode after `verify-prerender.ts`, so
 * a bad meta/canonical fails the build before deploy.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, join, relative } from "path";

const DIST = resolve("dist");
const SITE_HOST = "anaesthesiacore.app";
const STRICT = process.argv.includes("--strict");

const TITLE_MIN = 10;
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

const LOVABLE_DEFAULTS = ["Lovable App", "Lovable Generated Project"];

/** Recursively list every index.html under dist. */
function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walkHtml(p, out);
    else if (name === "index.html") out.push(p);
  }
  return out;
}

function extractHead(html) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : "";
}

function all(regex, str) {
  return [...str.matchAll(regex)];
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? m[1] : null;
}

function checkRoute(route, html) {
  const head = extractHead(html);
  const errors = [];

  // ---- <title> ----
  const titles = all(/<title[^>]*>([^<]*)<\/title>/gi, head);
  if (titles.length === 0) errors.push("missing <title>");
  else if (titles.length > 1) errors.push(`duplicate <title> (${titles.length})`);
  const title = titles[0]?.[1]?.trim() ?? "";
  if (title && (title.length < TITLE_MIN || title.length > TITLE_MAX))
    errors.push(`title length ${title.length} outside ${TITLE_MIN}–${TITLE_MAX}: "${title}"`);
  if (LOVABLE_DEFAULTS.includes(title))
    errors.push(`title is Lovable default placeholder: "${title}"`);

  // ---- meta description ----
  const descTags = all(/<meta[^>]*name\s*=\s*"description"[^>]*>/gi, head);
  if (descTags.length === 0) errors.push("missing <meta name=description>");
  const desc = descTags[0] ? attr(descTags[0][0], "content") ?? "" : "";
  if (desc && (desc.length < DESC_MIN || desc.length > DESC_MAX))
    errors.push(`description length ${desc.length} outside ${DESC_MIN}–${DESC_MAX}`);
  if (LOVABLE_DEFAULTS.includes(desc))
    errors.push(`description is Lovable default placeholder`);

  // ---- Open Graph ----
  const ogNeeded = ["og:title", "og:description", "og:url", "og:type"];
  const ogTags = {};
  for (const t of all(/<meta[^>]*property\s*=\s*"(og:[^"]+)"[^>]*>/gi, head)) {
    const prop = t[1];
    const content = attr(t[0], "content") ?? "";
    ogTags[prop] = ogTags[prop] ? "__dup__" : content;
  }
  for (const p of ogNeeded) {
    if (!ogTags[p]) errors.push(`missing ${p}`);
    else if (ogTags[p] === "__dup__") errors.push(`duplicate ${p}`);
  }

  // ---- Twitter card ----
  const twCard = all(/<meta[^>]*name\s*=\s*"twitter:card"[^>]*>/gi, head);
  if (twCard.length === 0) errors.push("missing twitter:card");

  // ---- canonical ----
  const canonicals = all(/<link[^>]*rel\s*=\s*"canonical"[^>]*>/gi, head);
  if (canonicals.length === 0) errors.push("missing <link rel=canonical>");
  else if (canonicals.length > 1) errors.push(`duplicate canonical (${canonicals.length})`);
  const canonical = canonicals[0] ? attr(canonicals[0][0], "href") ?? "" : "";
  if (canonical) {
    let parsed;
    try {
      parsed = new URL(canonical);
    } catch {
      errors.push(`canonical is not an absolute URL: "${canonical}"`);
    }
    if (parsed && parsed.hostname !== SITE_HOST)
      errors.push(`canonical host ${parsed.hostname} != ${SITE_HOST}`);
  }

  // canonical <-> og:url must agree
  if (canonical && ogTags["og:url"] && ogTags["og:url"] !== "__dup__" && ogTags["og:url"] !== canonical)
    errors.push(`og:url "${ogTags["og:url"]}" != canonical "${canonical}"`);

  return { route, errors, title, descLen: desc.length };
}

function routeFromPath(p) {
  const rel = relative(DIST, p).replace(/\\/g, "/").replace(/\/?index\.html$/, "");
  return "/" + rel;
}

function main() {
  if (!existsSync(DIST)) {
    console.warn("[check-seo-meta] dist/ not found — run `npm run build` first. Skipping.");
    return;
  }
  const files = walkHtml(DIST);
  if (files.length === 0) {
    console.warn("[check-seo-meta] no index.html files under dist/. Skipping.");
    return;
  }

  const results = files.map((f) => {
    const html = readFileSync(f, "utf8");
    return checkRoute(routeFromPath(f), html);
  });

  const failed = results.filter((r) => r.errors.length > 0);
  const ok = results.length - failed.length;

  console.log(`[check-seo-meta] scanned ${results.length} prerendered routes — ${ok} ok, ${failed.length} with issues`);

  for (const r of failed) {
    console.log(`\n  ✗ ${r.route}`);
    for (const e of r.errors) console.log(`      • ${e}`);
  }

  if (failed.length > 0 && STRICT) {
    console.error(`\n[check-seo-meta] STRICT mode: ${failed.length} route(s) failed SEO checks.`);
    process.exit(1);
  }
  if (failed.length === 0) console.log("[check-seo-meta] ✓ all routes pass");
}

main();
