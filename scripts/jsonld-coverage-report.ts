#!/usr/bin/env bun
/**
 * JSON-LD structured-data coverage report.
 *
 * Walks index.html + src/** for every <script type="application/ld+json"> block,
 * detects @type(s), and checks each against Google's required Rich Results
 * properties. Emits:
 *   - Markdown report to stdout (or --out <path>)
 *   - JSON sidecar next to it (.json) for CI consumption
 *
 * Usage:
 *   bun run scripts/jsonld-coverage-report.ts
 *   bun run scripts/jsonld-coverage-report.ts --out /mnt/documents/jsonld-coverage.md
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { resolve, join, relative, dirname } from "path";

const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;
const REPO_ROOT = process.cwd();

// Sourced from https://developers.google.com/search/docs/appearance/structured-data
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

interface Row {
  template: string;          // file path relative to repo
  line: number;              // 1-based line of the <script> tag (or block in index.html)
  source: "index.html" | "src";
  type: string | null;
  contextOk: boolean;
  contextRaw: string | null;
  missingRequired: string[];
  unknownType: boolean;
  resolveError?: string;
}

function rel(p: string): string { return relative(REPO_ROOT, p) || p; }
function lineOf(src: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < src.length; i++) if (src.charCodeAt(i) === 10) line++;
  return line;
}
function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) out.push(p);
  }
  return out;
}
function extractBalancedBraces(src: string, start: number): string | null {
  if (src[start] !== "{") return null;
  let depth = 0; let inStr: string | null = null; let inTpl = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i]; const prev = src[i - 1];
    if (inStr) { if (c === inStr && prev !== "\\") inStr = null; continue; }
    if (inTpl) { if (c === "`" && prev !== "\\") inTpl = false; continue; }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === "`") { inTpl = true; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return src.substring(start, i + 1); }
  }
  return null;
}

function checkRequired(type: string, has: (p: string) => boolean): { missing: string[]; unknown: boolean } {
  const required = RICH_RESULT_REQUIRED[type];
  if (!required) return { missing: [], unknown: true };
  return { missing: required.filter((p) => !has(p)), unknown: false };
}

// ── index.html ──
function scanIndexHtml(): Row[] {
  const path = resolve("index.html");
  const html = readFileSync(path, "utf8");
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  const rows: Row[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const line = lineOf(html, m.index);
    let parsed: unknown = null; let parseError: string | undefined;
    try { parsed = JSON.parse(m[1]); } catch (e) { parseError = (e as Error).message; }
    if (parseError || !parsed) {
      rows.push({
        template: "index.html", line, source: "index.html",
        type: null, contextOk: false, contextRaw: null,
        missingRequired: [], unknownType: false,
        resolveError: `JSON parse error: ${parseError}`,
      });
      continue;
    }
    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      const obj = item as Record<string, unknown>;
      const ctx = obj["@context"];
      const type = obj["@type"] ? String(obj["@type"]) : null;
      const has = (p: string) => obj[p] !== undefined && obj[p] !== null && obj[p] !== "";
      const { missing, unknown } = type ? checkRequired(type, has) : { missing: [], unknown: false };
      rows.push({
        template: "index.html", line, source: "index.html",
        type,
        contextOk: typeof ctx === "string" && SCHEMA_ORG.test(ctx),
        contextRaw: typeof ctx === "string" ? ctx : null,
        missingRequired: missing,
        unknownType: unknown,
      });
    }
  }
  return rows;
}

// ── src/** ──
function scanSrc(): Row[] {
  const files = walk(resolve("src")).filter((f) => !f.includes("/test/"));
  const rows: Row[] = [];
  const scriptRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    let m: RegExpExecArray | null;
    while ((m = scriptRe.exec(src)) !== null) {
      const scriptLine = lineOf(src, m.index);
      let payload = m[1].trim().replace(/^\{|\}$/g, "").trim();
      let resolveError: string | undefined;
      const stringifyMatch = /^JSON\.stringify\(([\s\S]+)\)$/m.exec(payload);
      if (stringifyMatch) payload = stringifyMatch[1].trim();
      payload = payload.replace(/^`|`$/g, "").trim();
      if (/^[A-Za-z_$][\w$]*$/.test(payload)) {
        const name = payload;
        const declRe = new RegExp(
          `(?:const|let|var)\\s+${name}\\b[^=]*=\\s*(?:useMemo\\s*\\(\\s*\\(\\)\\s*=>\\s*\\(?\\s*)?`, "g",
        );
        const declMatch = declRe.exec(src);
        if (!declMatch) resolveError = `cannot resolve JSON-LD variable "${name}"`;
        else {
          const objStart = src.indexOf("{", declMatch.index + declMatch[0].length);
          const lit = extractBalancedBraces(src, objStart);
          if (!lit) resolveError = `cannot extract object literal for "${name}"`;
          else payload = lit;
        }
      }
      const sanitized = payload
        .replace(/\bas\s+const\b/g, "")
        .replace(/\bsatisfies\s+[A-Za-z_$][\w$.<>,\s|&[\]]*/g, "");
      const ctxMatch = /["']@context["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
      const typeMatch = /["']@type["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
      const hasProp = (prop: string) =>
        new RegExp(`(?:^|[\\s,{])["']?${prop}["']?\\s*:`).test(sanitized);
      const type = typeMatch ? typeMatch[1] : null;
      const { missing, unknown } = type ? checkRequired(type, hasProp) : { missing: [], unknown: false };
      rows.push({
        template: rel(file), line: scriptLine, source: "src",
        type,
        contextOk: !!ctxMatch && SCHEMA_ORG.test(ctxMatch[1]),
        contextRaw: ctxMatch ? ctxMatch[1] : null,
        missingRequired: missing,
        unknownType: unknown,
        resolveError,
      });
    }
  }
  return rows;
}

// ── output ──
function renderMarkdown(rows: Row[]): string {
  const total = rows.length;
  const okRows = rows.filter((r) => !r.resolveError && r.contextOk && r.type && !r.unknownType && r.missingRequired.length === 0);
  const violations = rows.filter((r) => r.resolveError || !r.contextOk || !r.type || r.unknownType || r.missingRequired.length);
  const types = new Map<string, number>();
  for (const r of rows) if (r.type) types.set(r.type, (types.get(r.type) ?? 0) + 1);

  const lines: string[] = [];
  lines.push(`# JSON-LD Structured-Data Coverage Report`);
  lines.push("");
  lines.push(`_Generated ${new Date().toISOString()}_`);
  lines.push("");
  lines.push(`## Summary`);
  lines.push("");
  lines.push(`- **Blocks scanned:** ${total}`);
  lines.push(`- **Passing:** ${okRows.length}`);
  lines.push(`- **With issues:** ${violations.length}`);
  lines.push(`- **Unique @types:** ${types.size}`);
  lines.push("");
  lines.push(`### @type distribution`);
  lines.push("");
  lines.push(`| @type | Count | Required properties |`);
  lines.push(`| --- | ---: | --- |`);
  for (const [t, n] of [...types.entries()].sort()) {
    const req = RICH_RESULT_REQUIRED[t]?.join(", ") ?? "_(not in allowlist)_";
    lines.push(`| \`${t}\` | ${n} | ${req} |`);
  }
  lines.push("");

  lines.push(`## Coverage by template`);
  lines.push("");
  lines.push(`| Template | Line | @type | @context | Missing required | Notes |`);
  lines.push(`| --- | ---: | --- | --- | --- | --- |`);
  for (const r of rows) {
    const ctx = r.contextOk ? "✅" : `❌ \`${r.contextRaw ?? "none"}\``;
    const type = r.type ? `\`${r.type}\`${r.unknownType ? " ⚠️" : ""}` : "❌ none";
    const missing = r.missingRequired.length ? `❌ ${r.missingRequired.map((p) => `\`${p}\``).join(", ")}` : "✅";
    const notes: string[] = [];
    if (r.resolveError) notes.push(r.resolveError);
    if (r.unknownType) notes.push(`@type not in rich-results allowlist`);
    lines.push(`| \`${r.template}\` | ${r.line} | ${type} | ${ctx} | ${missing} | ${notes.join("; ") || "—"} |`);
  }
  lines.push("");

  if (violations.length) {
    lines.push(`## Issues`);
    lines.push("");
    for (const r of violations) {
      lines.push(`- **${r.template}:${r.line}** — ${[
        r.resolveError && `resolve: ${r.resolveError}`,
        !r.contextOk && `bad @context (${r.contextRaw ?? "none"})`,
        !r.type && `missing @type`,
        r.unknownType && `unknown @type \`${r.type}\``,
        r.missingRequired.length && `missing required: ${r.missingRequired.join(", ")}`,
      ].filter(Boolean).join("; ")}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf("--out");
  const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

  const rows = [...scanIndexHtml(), ...scanSrc()];
  const md = renderMarkdown(rows);

  if (outPath) {
    mkdirSync(dirname(resolve(outPath)), { recursive: true });
    writeFileSync(outPath, md);
    const jsonPath = outPath.replace(/\.md$/, "") + ".json";
    writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2));
    // eslint-disable-next-line no-console
    console.log(`Wrote ${outPath} and ${jsonPath}`);
  } else {
    process.stdout.write(md);
  }

  const hasFailures = rows.some(
    (r) => r.resolveError || !r.contextOk || !r.type || r.missingRequired.length > 0,
  );
  if (process.env.JSONLD_COVERAGE_STRICT === "1" && hasFailures) process.exit(1);
}

main();
