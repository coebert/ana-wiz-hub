import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";

/**
 * A single canonical base URL must be used everywhere so crawlers never see
 * mixed domains (e.g. lovable.app preview vs anaesthesiacore.app). Any drift
 * confuses search engines and splits ranking signals.
 */
const CANONICAL_BASE = "https://anaesthesiacore.app";

describe("canonical base URL consistency", () => {
  it("robots.txt Sitemap: uses canonical base", () => {
    const robotsPath = resolve(process.cwd(), "public/robots.txt");
    expect(existsSync(robotsPath)).toBe(true);
    const contents = readFileSync(robotsPath, "utf8");

    const sitemaps = Array.from(
      contents.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim),
    ).map((m) => m[1]);

    for (const url of sitemaps) {
      expect(
        url.startsWith(CANONICAL_BASE),
        `robots.txt Sitemap: ${url} does not start with ${CANONICAL_BASE}`,
      ).toBe(true);
    }
  });

  it("sitemap.xml index <loc> uses canonical base", () => {
    const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
    expect(existsSync(sitemapPath)).toBe(true);
    const contents = readFileSync(sitemapPath, "utf8");

    const locs = Array.from(contents.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
      (m) => m[1],
    );
    expect(locs.length).toBeGreaterThan(0);

    const offenders = locs.filter((u) => !u.startsWith(CANONICAL_BASE));
    expect(
      offenders,
      `sitemap.xml <loc> entries not using ${CANONICAL_BASE}:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("every per-section sitemap <loc> uses canonical base", () => {
    const sitemapsDir = resolve(process.cwd(), "public/sitemaps");
    expect(existsSync(sitemapsDir)).toBe(true);

    const files = readdirSync(sitemapsDir).filter((f) => f.endsWith(".xml"));
    expect(files.length).toBeGreaterThan(0);

    const offenders: string[] = [];
    for (const file of files) {
      const contents = readFileSync(resolve(sitemapsDir, file), "utf8");
      const locs = Array.from(contents.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
        (m) => m[1],
      );
      for (const url of locs) {
        if (!url.startsWith(CANONICAL_BASE)) {
          offenders.push(`${file}: ${url}`);
        }
      }
    }

    expect(
      offenders,
      `Per-section sitemap <loc> entries not using ${CANONICAL_BASE}:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  // index.html deliberately omits og:url so every route's Helmet can set a
  // self-referencing og:url (a static one would make every shared link look
  // like the homepage). If one is ever added it must use the canonical base.
  it("index.html og:url, when present, uses canonical base", () => {
    const indexPath = resolve(process.cwd(), "index.html");
    const contents = readFileSync(indexPath, "utf8");

    const ogUrl = contents.match(/<meta[^>]*\sproperty="og:url"[^>]*\scontent="([^"]+)"/)?.[1];
    if (!ogUrl) return;
    expect(
      ogUrl.startsWith(CANONICAL_BASE),
      `og:url ${ogUrl} does not start with ${CANONICAL_BASE}`,
    ).toBe(true);
  });

  it("index.html JSON-LD urls use canonical base", () => {
    const indexPath = resolve(process.cwd(), "index.html");
    const contents = readFileSync(indexPath, "utf8");

    const jsonLdBlocks = Array.from(
      contents.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ).map((m) => m[1]);

    const offenders: string[] = [];
    for (const block of jsonLdBlocks) {
      try {
        const data = JSON.parse(block);
        // Collect every string value that looks like a project URL
        const urls: string[] = [];
        function collect(obj: unknown) {
          if (typeof obj === "string" && obj.startsWith("http")) {
            urls.push(obj);
          } else if (Array.isArray(obj)) {
            obj.forEach(collect);
          } else if (obj && typeof obj === "object") {
            Object.values(obj).forEach(collect);
          }
        }
        collect(data);

        for (const url of urls) {
          // schema.org is the vocabulary context, not a project canonical URL
          if (url.startsWith("https://schema.org")) continue;
          if (!url.startsWith(CANONICAL_BASE)) {
            offenders.push(url);
          }
        }
      } catch {
        // Skip unparseable blocks — they’ll surface in other tests if needed
      }
    }

    expect(
      offenders,
      `JSON-LD URLs not using ${CANONICAL_BASE}:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
