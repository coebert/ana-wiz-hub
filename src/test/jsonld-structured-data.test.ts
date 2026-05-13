import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { parse as parseHtml } from "node-html-parser";

/**
 * CI guard for JSON-LD structured data.
 *
 * 1. index.html: every <script type="application/ld+json"> JSON.parses, points
 *    at https://schema.org, declares an @type, and (for known rich-result
 *    types) supplies Google's required properties.
 * 2. Sitewide identity: WebSite + Organization are present in index.html so
 *    every SPA route inherits valid structured data.
 * 3. src/**: every JSON-LD <script> we ship from a React component (literal
 *    object or `JSON.stringify(name)` referring to a const in the same file)
 *    declares @context = schema.org, has an @type, and supplies the required
 *    Google Rich Results properties for that @type. We don't JSON.parse these
 *    — they're TSX with interpolations / conditional spreads / .map() — but
 *    we do extract the literal source and check it with regex, which catches
 *    every realistic mistake.
 * 4. Key page templates have documented JSON-LD coverage.
 */

const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;

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

/** Find a balanced { ... } block starting at `start` (must point at `{`). */
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
  source: string;
  parsed: Record<string, unknown> | unknown[];
}

function loadIndexHtmlBlocks(): IndexBlock[] {
  const html = readFileSync(resolve("index.html"), "utf8");
  const root = parseHtml(html);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');
  return scripts.map((s, i) => {
    const raw = s.text;
    try {
      return { source: `index.html#${i + 1}`, parsed: JSON.parse(raw) };
    } catch (e) {
      throw new Error(
        `index.html JSON-LD block #${i + 1} is not valid JSON: ${(e as Error).message}\n--- raw ---\n${raw}`,
      );
    }
  });
}

// ─── src/** (string-inspection only) ───────────────────────────────────────

interface SourceBlock {
  source: string;
  payload: string;
  contextOk: boolean;
  contextRaw: string | null;
  type: string | null;
  hasProp: (prop: string) => boolean;
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
      let payload = m[1].trim().replace(/^\{|\}$/g, "").trim();

      const stringifyMatch = /^JSON\.stringify\(([\s\S]+)\)$/m.exec(payload);
      if (stringifyMatch) payload = stringifyMatch[1].trim();

      // Resolve identifier → object literal in the same file.
      if (/^[A-Za-z_$][\w$]*$/.test(payload)) {
        const name = payload;
        const declRe = new RegExp(
          `(?:const|let|var)\\s+${name}\\b[^=]*=\\s*(?:useMemo\\s*\\(\\s*\\(\\)\\s*=>\\s*\\(?\\s*)?`,
          "g",
        );
        const declMatch = declRe.exec(src);
        if (!declMatch) {
          throw new Error(`${file}: cannot resolve JSON-LD variable "${name}"`);
        }
        const objStart = src.indexOf("{", declMatch.index + declMatch[0].length);
        const lit = extractBalancedBraces(src, objStart);
        if (!lit) {
          throw new Error(`${file}: cannot extract object literal for "${name}"`);
        }
        payload = lit;
      }

      const sanitized = payload
        .replace(/\bas\s+const\b/g, "")
        .replace(/\bsatisfies\s+[A-Za-z_$][\w$.<>,\s|&[\]]*/g, "");

      const ctxMatch = /["']@context["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
      const typeMatch = /["']@type["']\s*:\s*["']([^"']+)["']/.exec(sanitized);

      blocks.push({
        source: file,
        payload: sanitized,
        contextOk: !!ctxMatch && SCHEMA_ORG.test(ctxMatch[1]),
        contextRaw: ctxMatch ? ctxMatch[1] : null,
        type: typeMatch ? typeMatch[1] : null,
        // Match `prop:` or `"prop":` at any nesting level. Required props for
        // current rich-result types are top-level scalars/arrays so this is
        // sufficient — false positives are not a concern for required-prop
        // existence (we only check whether a key with that name appears).
        hasProp: (prop: string) =>
          new RegExp(`(?:^|[\\s,{])["']?${prop}["']?\\s*:`).test(sanitized),
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
    expect(indexBlocks.length).toBeGreaterThan(0);
  });

  it("every index.html JSON-LD block has @context schema.org and @type", () => {
    for (const b of indexBlocks) {
      const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
      for (const item of items) {
        const obj = item as Record<string, unknown>;
        expect(typeof obj["@context"], `${b.source}: missing @context`).toBe("string");
        expect(
          SCHEMA_ORG.test(obj["@context"] as string),
          `${b.source}: @context must be schema.org, got ${obj["@context"]}`,
        ).toBe(true);
        expect(obj["@type"], `${b.source}: missing @type`).toBeTruthy();
      }
    }
  });

  it("every index.html JSON-LD @type satisfies Google Rich Results requirements", () => {
    for (const b of indexBlocks) {
      const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
      for (const item of items) {
        const obj = item as Record<string, unknown>;
        const type = String(obj["@type"]);
        const required = RICH_RESULT_REQUIRED[type];
        if (!required) continue;
        for (const prop of required) {
          const v = obj[prop];
          expect(
            v !== undefined && v !== null && v !== "",
            `${b.source}: @type ${type} is missing required property "${prop}"`,
          ).toBe(true);
        }
      }
    }
  });

  it("sitewide JSON-LD includes both WebSite and Organization", () => {
    const types = new Set<string>();
    for (const b of indexBlocks) {
      const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
      for (const i of items) types.add(String((i as Record<string, unknown>)["@type"]));
    }
    expect(types.has("WebSite"), "index.html missing WebSite JSON-LD").toBe(true);
    expect(types.has("Organization"), "index.html missing Organization JSON-LD").toBe(true);
  });

  it("WebSite JSON-LD points at the canonical domain", () => {
    const website = indexBlocks
      .flatMap((b) => (Array.isArray(b.parsed) ? b.parsed : [b.parsed]))
      .find((i) => (i as Record<string, unknown>)["@type"] === "WebSite") as
      | Record<string, unknown>
      | undefined;
    expect(website?.url).toBe("https://anaesthesiacore.app/");
  });

  it("every src/** JSON-LD block declares @context schema.org and an @type", () => {
    for (const b of srcBlocks) {
      expect(
        b.contextOk,
        `${b.source}: JSON-LD must have "@context": "https://schema.org" (got ${b.contextRaw ?? "none"})`,
      ).toBe(true);
      expect(b.type, `${b.source}: JSON-LD must declare an @type`).toBeTruthy();
    }
  });

  it("every src/** JSON-LD @type satisfies Google Rich Results requirements", () => {
    for (const b of srcBlocks) {
      if (!b.type) continue;
      const required = RICH_RESULT_REQUIRED[b.type];
      expect(
        required,
        `${b.source}: @type "${b.type}" is not in the rich-results allowlist — add it to RICH_RESULT_REQUIRED with its required properties`,
      ).toBeDefined();
      for (const prop of required ?? []) {
        expect(
          b.hasProp(prop),
          `${b.source}: @type ${b.type} is missing required property "${prop}" for Google Rich Results`,
        ).toBe(true);
      }
    }
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
      expect(exists, `${file} not found — update KEY_TEMPLATES`).toBe(true);
      if (kind === "sitewide") return;
      const blocks = srcBlocks.filter((b) => b.source === path);
      expect(
        blocks.length,
        `${file} declares no JSON-LD but is registered as @type ${kind}`,
      ).toBeGreaterThan(0);
      const types = new Set(blocks.map((b) => b.type));
      expect(
        types.has(kind),
        `${file} expected to emit @type "${kind}", got ${[...types].join(", ") || "none"}`,
      ).toBe(true);
    },
  );
});
