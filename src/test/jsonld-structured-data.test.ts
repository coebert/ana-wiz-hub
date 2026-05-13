import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, join, relative } from "path";
import { parse as parseHtml } from "node-html-parser";

/**
 * CI guard for JSON-LD structured data.
 *
 * 1. index.html: every <script type="application/ld+json"> JSON.parses, points
 *    at https://schema.org, declares an @type, and supplies Google's required
 *    rich-result properties for that @type.
 * 2. Sitewide identity: WebSite + Organization are present in index.html so
 *    every SPA route inherits valid structured data.
 * 3. src/**: every JSON-LD <script> we ship from a React component (literal
 *    object or `JSON.stringify(name)` referring to a const in the same file)
 *    declares @context = schema.org, has an @type, and supplies the required
 *    Google Rich Results properties.
 * 4. Key templates have documented coverage.
 *
 * On failure under GitHub Actions (GITHUB_ACTIONS=true), each issue is also
 * emitted as a `::error file=...,line=...,col=...,title=...::message`
 * workflow command so the failures surface as inline annotations on the
 * exact JSON-LD source line in the PR diff.
 */

const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;
const REPO_ROOT = process.cwd();
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === "true";

// Required properties per @type, sourced from
// https://developers.google.com/search/docs/appearance/structured-data
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

// ─── annotation collector ──────────────────────────────────────────────────

interface Issue {
  file: string; // repo-relative
  line: number;
  col?: number;
  title: string;
  message: string;
}

const issues: Issue[] = [];

function escapeAnnotation(s: string): string {
  // GitHub workflow command escaping for ::error::
  return s
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");
}

function escapeProp(s: string): string {
  return escapeAnnotation(s).replace(/,/g, "%2C").replace(/:/g, "%3A");
}

function annotate(issue: Issue) {
  issues.push(issue);
  const prefix = IS_GITHUB_ACTIONS
    ? `::error file=${escapeProp(issue.file)},line=${issue.line}` +
      (issue.col ? `,col=${issue.col}` : "") +
      `,title=${escapeProp(issue.title)}::${escapeAnnotation(issue.message)}`
    : `[jsonld] ${issue.file}:${issue.line}${issue.col ? `:${issue.col}` : ""} — ${issue.title}: ${issue.message}`;
  // Use console.log so workflow commands are emitted on stdout (GitHub parses both,
  // but stdout interleaves cleanly with vitest's own reporter output).
  // eslint-disable-next-line no-console
  console.log(prefix);
}

function rel(p: string): string {
  return relative(REPO_ROOT, p) || p;
}

/** Compute 1-based line number for a character offset in `src`. */
function lineOf(src: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < src.length; i++) {
    if (src.charCodeAt(i) === 10) line++;
  }
  return line;
}

// ─── helpers ────────────────────────────────────────────────────────────────

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
  let depth = 0;
  let inStr: string | null = null;
  let inTpl = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    const prev = src[i - 1];
    if (inStr) {
      if (c === inStr && prev !== "\\") inStr = null;
      continue;
    }
    if (inTpl) {
      if (c === "`" && prev !== "\\") inTpl = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === "`") { inTpl = true; continue; }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return src.substring(start, i + 1);
    }
  }
  return null;
}

// ─── index.html (JSON-parsable) ────────────────────────────────────────────

interface IndexBlock {
  source: string; // "index.html"
  index: number; // 1-based block index
  line: number;
  parsed: Record<string, unknown> | unknown[] | null;
  rawSnippet: string;
  parseError?: string;
}

function loadIndexHtmlBlocks(): IndexBlock[] {
  const path = resolve("index.html");
  const html = readFileSync(path, "utf8");
  // Walk the raw HTML so we can locate each script's line number; node-html-parser
  // doesn't expose source positions reliably.
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  const out: IndexBlock[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(html)) !== null) {
    i++;
    const raw = m[1];
    const block: IndexBlock = {
      source: "index.html",
      index: i,
      line: lineOf(html, m.index),
      parsed: null,
      rawSnippet: raw.slice(0, 500),
    };
    try {
      block.parsed = JSON.parse(raw);
    } catch (e) {
      block.parseError = (e as Error).message;
    }
    out.push(block);
  }
  // Use parseHtml only as a sanity check that we counted the same number of scripts.
  const root = parseHtml(html);
  const fromParser = root.querySelectorAll('script[type="application/ld+json"]').length;
  if (fromParser !== out.length) {
    throw new Error(
      `index.html: regex found ${out.length} JSON-LD scripts, html parser found ${fromParser} — extractor is out of sync`,
    );
  }
  return out;
}

// ─── src/** (string-inspection only) ───────────────────────────────────────

interface SourceBlock {
  file: string; // absolute
  fileRel: string;
  scriptLine: number; // line of the <script> tag
  payload: string;
  contextOk: boolean;
  contextRaw: string | null;
  type: string | null;
  hasProp: (prop: string) => boolean;
  resolveError?: string;
}

function loadSourceBlocks(): SourceBlock[] {
  const files = walk(resolve("src")).filter((f) => !f.includes("/test/"));
  const blocks: SourceBlock[] = [];
  const scriptRe =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;

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
          `(?:const|let|var)\\s+${name}\\b[^=]*=\\s*(?:useMemo\\s*\\(\\s*\\(\\)\\s*=>\\s*\\(?\\s*)?`,
          "g",
        );
        const declMatch = declRe.exec(src);
        if (!declMatch) {
          resolveError = `cannot resolve JSON-LD variable "${name}"`;
        } else {
          const objStart = src.indexOf("{", declMatch.index + declMatch[0].length);
          const lit = extractBalancedBraces(src, objStart);
          if (!lit) {
            resolveError = `cannot extract object literal for "${name}"`;
          } else {
            payload = lit;
          }
        }
      }

      const sanitized = payload
        .replace(/\bas\s+const\b/g, "")
        .replace(/\bsatisfies\s+[A-Za-z_$][\w$.<>,\s|&[\]]*/g, "");

      const ctxMatch = /["']@context["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
      const typeMatch = /["']@type["']\s*:\s*["']([^"']+)["']/.exec(sanitized);

      blocks.push({
        file,
        fileRel: rel(file),
        scriptLine,
        payload: sanitized,
        contextOk: !!ctxMatch && SCHEMA_ORG.test(ctxMatch[1]),
        contextRaw: ctxMatch ? ctxMatch[1] : null,
        type: typeMatch ? typeMatch[1] : null,
        hasProp: (prop: string) =>
          new RegExp(`(?:^|[\\s,{])["']?${prop}["']?\\s*:`).test(sanitized),
        resolveError,
      });
    }
  }
  return blocks;
}

// ─── tests ─────────────────────────────────────────────────────────────────

describe("JSON-LD structured data", () => {
  const indexBlocks = loadIndexHtmlBlocks();
  const srcBlocks = loadSourceBlocks();

  it("index.html ships at least one JSON-LD block", () => {
    expect(indexBlocks.length, "index.html ships no JSON-LD scripts").toBeGreaterThan(0);
  });

  it("every index.html JSON-LD block parses and has @context schema.org + @type", () => {
    const before = issues.length;
    for (const b of indexBlocks) {
      if (b.parseError || !b.parsed) {
        annotate({
          file: "index.html",
          line: b.line,
          title: "JSON-LD parse error",
          message: `Block #${b.index} is not valid JSON: ${b.parseError ?? "unknown error"}`,
        });
        continue;
      }
      const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
      for (const item of items) {
        const obj = item as Record<string, unknown>;
        const ctx = obj["@context"];
        if (typeof ctx !== "string" || !SCHEMA_ORG.test(ctx)) {
          annotate({
            file: "index.html",
            line: b.line,
            title: "JSON-LD invalid @context",
            message: `Block #${b.index}: @context must be https://schema.org (got ${JSON.stringify(ctx)})`,
          });
        }
        if (!obj["@type"]) {
          annotate({
            file: "index.html",
            line: b.line,
            title: "JSON-LD missing @type",
            message: `Block #${b.index}: every JSON-LD object must declare @type`,
          });
        }
      }
    }
    expect(issues.length, "index.html JSON-LD shape errors (see annotations above)").toBe(before);
  });

  it("every index.html JSON-LD @type satisfies Google Rich Results requirements", () => {
    const before = issues.length;
    for (const b of indexBlocks) {
      if (!b.parsed) continue;
      const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
      for (const item of items) {
        const obj = item as Record<string, unknown>;
        const type = String(obj["@type"]);
        const required = RICH_RESULT_REQUIRED[type];
        if (!required) continue;
        for (const prop of required) {
          const v = obj[prop];
          if (v === undefined || v === null || v === "") {
            annotate({
              file: "index.html",
              line: b.line,
              title: `JSON-LD ${type} missing required "${prop}"`,
              message: `Block #${b.index}: Google Rich Results requires "${prop}" on @type ${type}`,
            });
          }
        }
      }
    }
    expect(issues.length, "index.html rich-results violations (see annotations above)").toBe(before);
  });

  it("sitewide JSON-LD includes both WebSite and Organization", () => {
    const types = new Set<string>();
    for (const b of indexBlocks) {
      if (!b.parsed) continue;
      const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
      for (const i of items) types.add(String((i as Record<string, unknown>)["@type"]));
    }
    if (!types.has("WebSite")) {
      annotate({
        file: "index.html",
        line: 1,
        title: "JSON-LD missing WebSite",
        message: "Add a WebSite JSON-LD block to index.html so every SPA route inherits it",
      });
    }
    if (!types.has("Organization")) {
      annotate({
        file: "index.html",
        line: 1,
        title: "JSON-LD missing Organization",
        message: "Add an Organization JSON-LD block to index.html for sitewide identity",
      });
    }
    expect(types.has("WebSite"), "index.html missing WebSite JSON-LD").toBe(true);
    expect(types.has("Organization"), "index.html missing Organization JSON-LD").toBe(true);
  });

  it("WebSite JSON-LD points at the canonical domain", () => {
    const websiteBlock = indexBlocks.find(
      (b) =>
        b.parsed &&
        (Array.isArray(b.parsed) ? b.parsed : [b.parsed]).some(
          (i) => (i as Record<string, unknown>)["@type"] === "WebSite",
        ),
    );
    const website = websiteBlock?.parsed
      ? (Array.isArray(websiteBlock.parsed) ? websiteBlock.parsed : [websiteBlock.parsed]).find(
          (i) => (i as Record<string, unknown>)["@type"] === "WebSite",
        ) as Record<string, unknown> | undefined
      : undefined;
    if (website?.url !== "https://anaesthesiacore.app/") {
      annotate({
        file: "index.html",
        line: websiteBlock?.line ?? 1,
        title: "JSON-LD WebSite.url drift",
        message: `WebSite.url must be https://anaesthesiacore.app/ (got ${JSON.stringify(website?.url)})`,
      });
    }
    expect(website?.url).toBe("https://anaesthesiacore.app/");
  });

  it("every src/** JSON-LD block resolves, declares @context schema.org and an @type", () => {
    const before = issues.length;
    for (const b of srcBlocks) {
      if (b.resolveError) {
        annotate({
          file: b.fileRel,
          line: b.scriptLine,
          title: "JSON-LD source could not be resolved",
          message: b.resolveError,
        });
        continue;
      }
      if (!b.contextOk) {
        annotate({
          file: b.fileRel,
          line: b.scriptLine,
          title: "JSON-LD invalid @context",
          message: `@context must be "https://schema.org" (got ${b.contextRaw ?? "none"})`,
        });
      }
      if (!b.type) {
        annotate({
          file: b.fileRel,
          line: b.scriptLine,
          title: "JSON-LD missing @type",
          message: `JSON-LD block must declare @type`,
        });
      }
    }
    expect(issues.length, "src/** JSON-LD shape errors (see annotations above)").toBe(before);
  });

  it("every src/** JSON-LD @type satisfies Google Rich Results requirements", () => {
    const before = issues.length;
    for (const b of srcBlocks) {
      if (!b.type) continue;
      const required = RICH_RESULT_REQUIRED[b.type];
      if (!required) {
        annotate({
          file: b.fileRel,
          line: b.scriptLine,
          title: `JSON-LD unknown @type "${b.type}"`,
          message: `@type "${b.type}" is not in the rich-results allowlist — add it to RICH_RESULT_REQUIRED with its required properties`,
        });
        continue;
      }
      for (const prop of required) {
        if (!b.hasProp(prop)) {
          annotate({
            file: b.fileRel,
            line: b.scriptLine,
            title: `JSON-LD ${b.type} missing required "${prop}"`,
            message: `Google Rich Results requires "${prop}" on @type ${b.type}`,
          });
        }
      }
    }
    expect(issues.length, "src/** rich-results violations (see annotations above)").toBe(before);
  });

  /**
   * Key templates the most crawlers hit. Each entry pins the file to the @type
   * we expect it to emit. "sitewide" means the route relies on index.html's
   * WebSite/Organization (acceptable until react-helmet-async is wired in).
   */
  const KEY_TEMPLATES: Array<{ file: string; expect: "sitewide" | string }> = [
    { file: "src/pages/Landing.tsx", expect: "sitewide" },
    { file: "src/components/TopicTemplate.tsx", expect: "LearningResource" },
    { file: "src/components/SectionLayout.tsx", expect: "BreadcrumbList" },
    { file: "src/pages/VivaQuestionLibrary.tsx", expect: "FAQPage" },
    { file: "src/pages/DrugDetail.tsx", expect: "sitewide" },
  ];

  it.each(KEY_TEMPLATES)(
    "key template $file has documented JSON-LD coverage ($expect)",
    ({ file, expect: kind }) => {
      const path = resolve(file);
      let exists = true;
      try { statSync(path); } catch { exists = false; }
      if (!exists) {
        annotate({
          file,
          line: 1,
          title: "Key JSON-LD template missing",
          message: `${file} not found — update KEY_TEMPLATES in src/test/jsonld-structured-data.test.ts`,
        });
      }
      expect(exists, `${file} not found`).toBe(true);
      if (kind === "sitewide") return;
      const blocks = srcBlocks.filter((b) => b.file === path);
      if (blocks.length === 0) {
        annotate({
          file,
          line: 1,
          title: `Key template missing JSON-LD`,
          message: `${file} is registered as @type "${kind}" but ships no JSON-LD <script>`,
        });
      } else {
        const types = new Set(blocks.map((b) => b.type));
        if (!types.has(kind)) {
          annotate({
            file,
            line: blocks[0].scriptLine,
            title: `Key template wrong @type`,
            message: `${file} expected to emit @type "${kind}", got ${[...types].join(", ") || "none"}`,
          });
        }
      }
      expect(blocks.length, `${file} declares no JSON-LD`).toBeGreaterThan(0);
      const types = new Set(blocks.map((b) => b.type));
      expect(types.has(kind), `${file} expected @type "${kind}", got ${[...types].join(", ")}`).toBe(true);
    },
  );
});
