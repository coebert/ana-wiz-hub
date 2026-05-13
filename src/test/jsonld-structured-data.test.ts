import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { parse as parseHtml } from "node-html-parser";

/**
 * CI guard for JSON-LD structured data.
 *
 * 1. Every <script type="application/ld+json"> in the static index.html parses,
 *    points at https://schema.org, and declares an @type.
 * 2. Sitewide identity is present (WebSite + Organization) so every SPA route
 *    inherits valid structured data — until the project adopts per-route
 *    react-helmet-async, this is what crawlers see on every URL.
 * 3. Any per-route JSON-LD shipped via Helmet/inline <script> in src/ also
 *    parses and follows the same shape rules.
 * 4. Key page templates (Landing, TopicTemplate, DrugDetail) emit structured
 *    data that satisfies Google's Rich Results required-property checks for
 *    the @type they declare. If a template doesn't render its own JSON-LD
 *    yet, it must be explicitly listed here as covered by sitewide data so
 *    we know coverage is intentional, not accidental.
 */

const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;

// Minimum required properties per @type, sourced from
// https://developers.google.com/search/docs/appearance/structured-data
// Only types we actually use (or are likely to add) are listed; unknown types
// pass shape validation but are flagged as "not a known rich-result type".
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

interface JsonLdBlock {
  source: string; // file:line label
  raw: string;
  parsed: unknown;
}

function loadIndexHtmlBlocks(): JsonLdBlock[] {
  const html = readFileSync(resolve("index.html"), "utf8");
  const root = parseHtml(html);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');
  return scripts.map((s, i) => {
    const raw = s.text;
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      throw new Error(
        `index.html JSON-LD block #${i + 1} is not valid JSON: ${(e as Error).message}\n--- raw ---\n${raw}`,
      );
    }
    return { source: `index.html#${i + 1}`, raw, parsed };
  });
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

/**
 * Find JSON-LD blocks declared inside src/ via Helmet or raw <script>:
 *   <script type="application/ld+json">{JSON.stringify(...)}</script>
 *   <script type="application/ld+json">{`{...}`}</script>
 * We extract the literal object expression and JSON.parse it. Templated values
 * like `${slug}` are tolerated by replacing them with a sentinel string before
 * parsing — we are validating shape, not the rendered values.
 */
function loadSourceBlocks(): JsonLdBlock[] {
  const files = walk(resolve("src"));
  const blocks: JsonLdBlock[] = [];
  const scriptRe =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    let match: RegExpExecArray | null;
    while ((match = scriptRe.exec(src)) !== null) {
      const inner = match[1].trim();
      // Strip JSX braces around JSON.stringify(...) or template literal
      let payload = inner.replace(/^{|}$/g, "").trim();

      // JSON.stringify(<obj>) → use the object literal directly
      const stringifyMatch = /^JSON\.stringify\(([\s\S]+)\)$/m.exec(payload);
      if (stringifyMatch) payload = stringifyMatch[1].trim();

      // Template literal: `{...}` → strip backticks
      payload = payload.replace(/^`|`$/g, "").trim();

      // Replace ${...} interpolations with a sentinel string
      payload = payload.replace(/\$\{[^}]*\}/g, '"__INTERPOLATED__"');

      // Try strict JSON first, then a loose JS-object eval as a fallback for
      // unquoted keys (we run it in a sandboxed Function for shape only).
      let parsed: unknown;
      try {
        parsed = JSON.parse(payload);
      } catch {
        try {
          // eslint-disable-next-line no-new-func
          parsed = new Function(`"use strict"; return (${payload});`)();
        } catch (e) {
          throw new Error(
            `${file}: JSON-LD block does not parse — ${(e as Error).message}\n--- payload ---\n${payload}`,
          );
        }
      }
      blocks.push({ source: file, raw: payload, parsed });
    }
  }
  return blocks;
}

function assertSchemaShape(block: JsonLdBlock) {
  const node = block.parsed as Record<string, unknown> | unknown[];
  const items = Array.isArray(node) ? node : [node];
  for (const item of items) {
    expect(item, `${block.source}: JSON-LD root must be an object`).toBeTypeOf("object");
    const ctx = (item as Record<string, unknown>)["@context"];
    expect(typeof ctx, `${block.source}: missing @context`).toBe("string");
    expect(SCHEMA_ORG.test(ctx as string), `${block.source}: @context must be schema.org, got ${ctx}`).toBe(true);
    const type = (item as Record<string, unknown>)["@type"];
    expect(type, `${block.source}: missing @type`).toBeTruthy();
  }
}

function assertRichResultRequired(block: JsonLdBlock) {
  const node = block.parsed as Record<string, unknown> | unknown[];
  const items = Array.isArray(node) ? node : [node];
  for (const item of items) {
    const type = String((item as Record<string, unknown>)["@type"]);
    const required = RICH_RESULT_REQUIRED[type];
    if (!required) continue; // unknown @type — shape check above is enough
    for (const prop of required) {
      const value = (item as Record<string, unknown>)[prop];
      expect(
        value !== undefined && value !== null && value !== "",
        `${block.source}: @type ${type} is missing required property "${prop}" for Google Rich Results`,
      ).toBe(true);
    }
  }
}

describe("JSON-LD structured data", () => {
  const indexBlocks = loadIndexHtmlBlocks();
  const srcBlocks = loadSourceBlocks();
  const allBlocks = [...indexBlocks, ...srcBlocks];

  it("index.html ships at least one JSON-LD block", () => {
    expect(indexBlocks.length).toBeGreaterThan(0);
  });

  it("every JSON-LD block parses and has @context + @type", () => {
    for (const b of allBlocks) assertSchemaShape(b);
  });

  it("every JSON-LD @type with rich-results requirements satisfies them", () => {
    for (const b of allBlocks) assertRichResultRequired(b);
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

  /**
   * Key templates that crawlers hit most often. Each entry pins the template
   * file and the structured-data coverage we expect. "sitewide" means the
   * route relies on index.html's WebSite/Organization (acceptable for now
   * because the SPA injects no per-route head). When we adopt
   * react-helmet-async for per-route JSON-LD, switch the entry to the
   * specific @type the template should emit (e.g. "Article" for topics,
   * "MedicalWebPage" or "Drug" for drug detail).
   */
  const KEY_TEMPLATES: Array<{ file: string; expect: "sitewide" | string }> = [
    { file: "src/pages/Landing.tsx", expect: "sitewide" },
    { file: "src/components/TopicTemplate.tsx", expect: "sitewide" },
    { file: "src/pages/DrugDetail.tsx", expect: "sitewide" },
  ];

  it.each(KEY_TEMPLATES)("key template $file has documented JSON-LD coverage", ({ file, expect: kind }) => {
    const path = resolve(file);
    const exists = (() => { try { statSync(path); return true; } catch { return false; } })();
    expect(exists, `${file} not found — update KEY_TEMPLATES`).toBe(true);
    if (kind === "sitewide") {
      // Sitewide coverage is satisfied by the index.html assertions above.
      // No per-template work needed; this branch keeps the registry honest.
      return;
    }
    const src = readFileSync(path, "utf8");
    const blocks = srcBlocks.filter((b) => b.source === path);
    expect(blocks.length, `${file} declares no JSON-LD but is registered as @type ${kind}`).toBeGreaterThan(0);
    const types = new Set(
      blocks.flatMap((b) => {
        const items = Array.isArray(b.parsed) ? b.parsed : [b.parsed];
        return items.map((i) => String((i as Record<string, unknown>)["@type"]));
      }),
    );
    expect(types.has(kind), `${file} expected to emit @type "${kind}", got ${[...types].join(", ") || "none"}`).toBe(true);
    // Also ensure the file actually wires it into the rendered head (Helmet or raw script).
    expect(
      /Helmet|application\/ld\+json/.test(src),
      `${file} declares JSON-LD but doesn't appear to render it (no <Helmet> or ld+json script)`,
    ).toBe(true);
  });
});
