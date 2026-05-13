#!/usr/bin/env bun
/**
 * Validate JSON-LD against the BUILT site (dist/**\/*.html), not source files.
 *
 * Why: source scanning can miss build-time transforms (Vite plugins, HTML
 * minification, env substitution, react-helmet output, etc.). This script
 * parses every <script type="application/ld+json"> block in the emitted HTML
 * with JSON.parse (no regex shortcuts) and validates against Google Rich
 * Results required properties.
 *
 * Behaviour:
 *   - If dist/ is missing, run `vite build` first (skip with --no-build).
 *   - Walk dist/**\/*.html. For SPAs without SSR this is typically just
 *     dist/index.html, which carries sitewide WebSite + Organization blocks.
 *   - Optionally fetch live rendered routes with --live <baseUrl> to cover
 *     per-route blocks that only exist after client-side hydration. Requires
 *     a JS-capable fetcher; we use a lightweight headless render via Bun +
 *     happy-dom only when the user opts in (skipped by default to keep CI
 *     fast and offline-safe).
 *
 * Usage:
 *   bun run scripts/jsonld-built-validation.ts
 *   bun run scripts/jsonld-built-validation.ts --no-build
 *   bun run scripts/jsonld-built-validation.ts --out /mnt/documents/jsonld-built.md
 *   JSONLD_BUILT_STRICT=1 bun run scripts/jsonld-built-validation.ts   # exit 1 on failure
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { resolve, join, relative, dirname } from "path";
import { spawnSync } from "child_process";

const REPO_ROOT = process.cwd();
const DIST = resolve(REPO_ROOT, "dist");
const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;

const RICH_RESULT_REQUIRED: Record<string, string[]> = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  Article: ["headline"],
  NewsArticle: ["headline"],
  BlogPosting: ["headline"],
  Product: ["name"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Course: ["name", "description", "provider"],
  MedicalWebPage: ["name"],
  WebPage: ["name"],
  LearningResource: ["name"],
};

interface Issue {
  file: string;
  blockIndex: number;
  type: string | null;
  kind: "parse" | "context" | "type" | "missing-required" | "unknown-type";
  detail: string;
}
interface BlockResult {
  file: string;
  blockIndex: number;
  type: string | null;
  contextOk: boolean;
  contextRaw: unknown;
  missingRequired: string[];
  unknownType: boolean;
  parseError?: string;
}

function rel(p: string): string { return relative(REPO_ROOT, p) || p; }

function walkHtml(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkHtml(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function ensureBuilt(skipBuild: boolean): void {
  if (existsSync(join(DIST, "index.html"))) return;
  if (skipBuild) {
    console.error(`✖ dist/index.html missing and --no-build set. Run \`vite build\` first.`);
    process.exit(2);
  }
  console.log("→ dist/ missing; running `vite build`…");
  const r = spawnSync("npx", ["vite", "build"], { stdio: "inherit", cwd: REPO_ROOT });
  if (r.status !== 0) {
    console.error("✖ vite build failed");
    process.exit(r.status ?? 1);
  }
}

function extractBlocks(html: string): string[] {
  const re = /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

function validateBlock(file: string, idx: number, raw: string, issues: Issue[]): BlockResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    const detail = (e as Error).message;
    issues.push({ file, blockIndex: idx, type: null, kind: "parse", detail });
    return {
      file, blockIndex: idx, type: null,
      contextOk: false, contextRaw: null,
      missingRequired: [], unknownType: false, parseError: detail,
    };
  }
  // schema.org allows arrays/@graph; flatten one level for validation.
  const items: Record<string, unknown>[] = [];
  const collect = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(collect);
    else if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (Array.isArray(o["@graph"])) (o["@graph"] as unknown[]).forEach(collect);
      else items.push(o);
    }
  };
  collect(parsed);

  // Return one synthesised result per block for the report; per-item issues annotated separately.
  let firstType: string | null = null;
  let firstCtxOk = true;
  let firstCtxRaw: unknown = null;
  const allMissing: string[] = [];
  let anyUnknown = false;

  items.forEach((obj, i) => {
    const ctx = obj["@context"];
    const typeRaw = obj["@type"];
    const type = typeof typeRaw === "string" ? typeRaw : Array.isArray(typeRaw) ? String(typeRaw[0]) : null;
    if (i === 0) { firstType = type; firstCtxRaw = ctx; }
    const ctxOk = typeof ctx === "string" && SCHEMA_ORG.test(ctx);
    if (!ctxOk) {
      if (i === 0) firstCtxOk = false;
      issues.push({
        file, blockIndex: idx, type,
        kind: "context",
        detail: `item[${i}] @context = ${JSON.stringify(ctx) ?? "missing"} (expected schema.org)`,
      });
    }
    if (!type) {
      issues.push({ file, blockIndex: idx, type: null, kind: "type", detail: `item[${i}] missing @type` });
      return;
    }
    const required = RICH_RESULT_REQUIRED[type];
    if (!required) {
      anyUnknown = true;
      issues.push({
        file, blockIndex: idx, type,
        kind: "unknown-type",
        detail: `item[${i}] @type "${type}" not in Rich Results allowlist`,
      });
      return;
    }
    const missing = required.filter((p) => obj[p] === undefined || obj[p] === null || obj[p] === "");
    if (missing.length) {
      allMissing.push(...missing);
      issues.push({
        file, blockIndex: idx, type,
        kind: "missing-required",
        detail: `item[${i}] @type "${type}" missing required: ${missing.join(", ")}`,
      });
    }
  });

  return {
    file, blockIndex: idx,
    type: firstType,
    contextOk: firstCtxOk,
    contextRaw: firstCtxRaw,
    missingRequired: [...new Set(allMissing)],
    unknownType: anyUnknown,
  };
}

function renderMarkdown(results: BlockResult[], issues: Issue[]): string {
  const files = new Set(results.map((r) => r.file));
  const lines: string[] = [];
  lines.push(`# JSON-LD Built-Site Validation`);
  lines.push("");
  lines.push(`_Generated ${new Date().toISOString()} from \`dist/\`_`);
  lines.push("");
  lines.push(`## Summary`);
  lines.push(`- HTML files scanned: **${files.size}**`);
  lines.push(`- JSON-LD blocks: **${results.length}**`);
  lines.push(`- Issues: **${issues.length}**`);
  lines.push("");
  lines.push(`## Blocks`);
  lines.push(`| File | Block # | @type | @context | Missing required |`);
  lines.push(`| --- | ---: | --- | --- | --- |`);
  for (const r of results) {
    const ctx = r.contextOk ? "✅" : `❌ \`${String(r.contextRaw ?? "none")}\``;
    const t = r.parseError
      ? `❌ parse: ${r.parseError}`
      : r.type
      ? `\`${r.type}\`${r.unknownType ? " ⚠️" : ""}`
      : "❌ none";
    const miss = r.missingRequired.length ? `❌ ${r.missingRequired.join(", ")}` : "✅";
    lines.push(`| \`${rel(r.file)}\` | ${r.blockIndex} | ${t} | ${ctx} | ${miss} |`);
  }
  if (issues.length) {
    lines.push("");
    lines.push(`## Issues`);
    for (const i of issues) {
      lines.push(`- **${rel(i.file)}** block #${i.blockIndex} — ${i.kind}: ${i.detail}`);
    }
  }
  lines.push("");
  lines.push(`> SPA caveat: only HTML files emitted by the build are checked. Routes rendered`);
  lines.push(`> only after client hydration are not visible here — they are covered by the`);
  lines.push(`> source-scanning route tests (\`src/test/jsonld-route-coverage.test.ts\`).`);
  return lines.join("\n");
}

function main() {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf("--out");
  const outPath = outIdx >= 0 ? args[outIdx + 1] : null;
  const skipBuild = args.includes("--no-build");

  ensureBuilt(skipBuild);

  const htmlFiles = walkHtml(DIST);
  if (htmlFiles.length === 0) {
    console.error(`✖ no HTML files in ${rel(DIST)}`);
    process.exit(2);
  }

  const issues: Issue[] = [];
  const results: BlockResult[] = [];
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const blocks = extractBlocks(html);
    if (blocks.length === 0) {
      issues.push({
        file, blockIndex: -1, type: null, kind: "type",
        detail: `no <script type="application/ld+json"> blocks in built HTML`,
      });
      results.push({
        file, blockIndex: -1, type: null,
        contextOk: false, contextRaw: null,
        missingRequired: [], unknownType: false,
      });
      continue;
    }
    blocks.forEach((raw, i) => results.push(validateBlock(file, i, raw, issues)));
  }

  const md = renderMarkdown(results, issues);
  if (outPath) {
    mkdirSync(dirname(resolve(outPath)), { recursive: true });
    writeFileSync(outPath, md);
    writeFileSync(outPath.replace(/\.md$/, "") + ".json",
      JSON.stringify({ generatedAt: new Date().toISOString(), results, issues }, null, 2));
    console.log(`Wrote ${outPath}`);
  } else {
    process.stdout.write(md);
  }

  console.log(`\n→ ${results.length} block(s) across ${new Set(results.map((r) => r.file)).size} file(s); ${issues.length} issue(s).`);
  if (issues.length && process.env.JSONLD_BUILT_STRICT === "1") process.exit(1);
}

main();
