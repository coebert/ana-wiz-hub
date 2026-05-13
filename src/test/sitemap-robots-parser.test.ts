import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { XMLParser, XMLValidator } from "fast-xml-parser";

/**
 * Parses public/sitemap.xml, every public/sitemaps/*.xml, and public/robots.txt
 * with proper parsers (fast-xml-parser for XML, line-aware tokenizer for the
 * robots.txt grammar) instead of regex. Catches malformed XML, wrong root
 * elements, missing required children, and robots.txt directives that don't
 * conform to https://www.robotstxt.org/robotstxt.html.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.+\-Z]+)?$/;
const CANONICAL_BASE = "https://anaesthesiacore.app";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  // Always coerce single elements to arrays so we don't need to handle two shapes
  isArray: (name) => ["sitemap", "url"].includes(name),
});

function validateXml(xml: string, label: string) {
  const result = XMLValidator.validate(xml, { allowBooleanAttributes: false });
  if (result !== true) {
    throw new Error(
      `${label} is not well-formed XML: ${result.err.code} at line ${result.err.line}, col ${result.err.col} — ${result.err.msg}`,
    );
  }
}

describe("structured parser: public/sitemap.xml", () => {
  const path = resolve(process.cwd(), "public/sitemap.xml");

  it("file exists", () => {
    expect(existsSync(path)).toBe(true);
  });

  const xml = existsSync(path) ? readFileSync(path, "utf8") : "";

  it("is well-formed XML", () => {
    expect(() => validateXml(xml, "public/sitemap.xml")).not.toThrow();
  });

  it("root element is <sitemapindex> with sitemaps.org namespace", () => {
    const doc = parser.parse(xml);
    const keys = Object.keys(doc).filter((k) => !k.startsWith("?"));
    expect(
      keys,
      `Expected exactly one root element <sitemapindex>, got: ${keys.join(", ") || "(none)"}`,
    ).toEqual(["sitemapindex"]);

    const ns = doc.sitemapindex?.["@_xmlns"];
    expect(
      ns,
      `Missing xmlns on <sitemapindex>; got "${ns}"`,
    ).toBe("http://www.sitemaps.org/schemas/sitemap/0.9");
  });

  it("every <sitemap> has a <loc> and a valid <lastmod>", () => {
    const doc = parser.parse(xml);
    const sitemaps: Array<{ loc?: string; lastmod?: string }> =
      doc.sitemapindex?.sitemap ?? [];

    expect(sitemaps.length, "<sitemapindex> contains no <sitemap> children").toBeGreaterThan(0);

    const offenders: string[] = [];
    for (const [i, s] of sitemaps.entries()) {
      const ref = s.loc ?? `<sitemap[${i}]>`;
      if (!s.loc) offenders.push(`${ref}: missing <loc>`);
      else if (!s.loc.startsWith(CANONICAL_BASE))
        offenders.push(`${ref}: <loc> not on ${CANONICAL_BASE}`);
      if (!s.lastmod) offenders.push(`${ref}: missing <lastmod>`);
      else if (!ISO_DATE.test(s.lastmod))
        offenders.push(`${ref}: invalid <lastmod> "${s.lastmod}"`);
    }

    expect(
      offenders,
      `Structural problems in sitemap.xml:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});

describe("structured parser: public/sitemaps/*.xml", () => {
  const dir = resolve(process.cwd(), "public/sitemaps");
  const files = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith(".xml"))
    : [];

  it("at least one per-section sitemap is present", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    describe(file, () => {
      const xml = readFileSync(resolve(dir, file), "utf8");

      it("is well-formed XML", () => {
        expect(() => validateXml(xml, `public/sitemaps/${file}`)).not.toThrow();
      });

      it("root element is <urlset> with sitemaps.org namespace", () => {
        const doc = parser.parse(xml);
        const keys = Object.keys(doc).filter((k) => !k.startsWith("?"));
        expect(
          keys,
          `Expected exactly one root element <urlset> in ${file}, got: ${keys.join(", ") || "(none)"}`,
        ).toEqual(["urlset"]);

        expect(doc.urlset?.["@_xmlns"]).toBe(
          "http://www.sitemaps.org/schemas/sitemap/0.9",
        );
      });

      it("every <url> has a <loc> on the canonical domain and valid <lastmod>", () => {
        const doc = parser.parse(xml);
        const urls: Array<{ loc?: string; lastmod?: string; priority?: string | number; changefreq?: string }> =
          doc.urlset?.url ?? [];

        expect(urls.length, `${file} has no <url> entries`).toBeGreaterThan(0);

        const validChangefreq = new Set([
          "always",
          "hourly",
          "daily",
          "weekly",
          "monthly",
          "yearly",
          "never",
        ]);
        const offenders: string[] = [];
        for (const [i, u] of urls.entries()) {
          const ref = u.loc ?? `<url[${i}]>`;
          if (!u.loc) offenders.push(`${ref}: missing <loc>`);
          else if (!u.loc.startsWith(CANONICAL_BASE))
            offenders.push(`${ref}: off-domain <loc>`);
          if (u.lastmod && !ISO_DATE.test(u.lastmod))
            offenders.push(`${ref}: invalid <lastmod> "${u.lastmod}"`);
          if (u.changefreq && !validChangefreq.has(String(u.changefreq)))
            offenders.push(`${ref}: invalid <changefreq> "${u.changefreq}"`);
          if (u.priority !== undefined) {
            const p = Number(u.priority);
            if (Number.isNaN(p) || p < 0 || p > 1)
              offenders.push(`${ref}: <priority> "${u.priority}" outside 0.0-1.0`);
          }
        }

        expect(
          offenders,
          `Structural problems in ${file}:\n${offenders.join("\n")}`,
        ).toEqual([]);
      });
    });
  }
});

/**
 * Minimal robots.txt parser. Spec: https://www.robotstxt.org/robotstxt.html
 * Records are blocks separated by blank lines, each starting with one or more
 * `User-agent:` lines followed by `Allow:` / `Disallow:` lines. `Sitemap:` is
 * a top-level non-group directive.
 */
type RobotsRecord = { userAgents: string[]; rules: Array<{ field: string; value: string }> };
function parseRobots(text: string): { records: RobotsRecord[]; sitemaps: string[]; errors: string[] } {
  const records: RobotsRecord[] = [];
  const sitemaps: string[] = [];
  const errors: string[] = [];
  let current: RobotsRecord | null = null;
  let inUserAgentBlock = false;

  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/#.*$/, "").trim();
    if (line === "") {
      current = null;
      inUserAgentBlock = false;
      continue;
    }

    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) {
      errors.push(`line ${i + 1}: malformed directive "${raw}"`);
      continue;
    }
    const field = m[1].toLowerCase();
    const value = m[2].trim();

    if (field === "sitemap") {
      if (!/^https?:\/\//i.test(value)) {
        errors.push(`line ${i + 1}: Sitemap value must be an absolute URL ("${value}")`);
      }
      sitemaps.push(value);
      continue;
    }

    if (field === "user-agent") {
      if (!current || !inUserAgentBlock) {
        current = { userAgents: [], rules: [] };
        records.push(current);
        inUserAgentBlock = true;
      }
      current.userAgents.push(value);
      continue;
    }

    inUserAgentBlock = false;
    if (!current) {
      errors.push(`line ${i + 1}: ${m[1]} directive before any User-agent block`);
      continue;
    }
    if (field === "allow" || field === "disallow") {
      current.rules.push({ field, value });
    } else if (field === "crawl-delay" || field === "host") {
      current.rules.push({ field, value });
    } else {
      errors.push(`line ${i + 1}: unknown directive "${m[1]}"`);
    }
  }

  return { records, sitemaps, errors };
}

describe("structured parser: public/robots.txt", () => {
  const path = resolve(process.cwd(), "public/robots.txt");

  it("file exists", () => {
    expect(existsSync(path)).toBe(true);
  });

  const text = existsSync(path) ? readFileSync(path, "utf8") : "";
  const parsed = parseRobots(text);

  it("has no malformed directives", () => {
    expect(
      parsed.errors,
      `robots.txt parse errors:\n${parsed.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("has at least one User-agent block", () => {
    expect(parsed.records.length, "no User-agent blocks found").toBeGreaterThan(0);
  });

  it("declares the canonical Sitemap exactly once", () => {
    expect(
      parsed.sitemaps,
      `Expected exactly one Sitemap: ${CANONICAL_BASE}/sitemap.xml — got ${JSON.stringify(parsed.sitemaps)}`,
    ).toEqual([`${CANONICAL_BASE}/sitemap.xml`]);
  });

  it("every record has at least one User-agent", () => {
    const empty = parsed.records.filter((r) => r.userAgents.length === 0);
    expect(
      empty.length,
      `Found ${empty.length} record(s) without a User-agent line`,
    ).toBe(0);
  });
});
