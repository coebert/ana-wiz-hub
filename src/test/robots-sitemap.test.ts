import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

/**
 * robots.txt must advertise the canonical sitemap index at the project
 * domain so crawlers (Google, Bing, etc.) can discover all per-section
 * sitemaps. CI fails if the directive is missing, points elsewhere, or
 * uses a non-canonical host (e.g. www, lovable.app preview).
 */
describe("robots.txt sitemap directive", () => {
  const SITEMAP_URL = "https://anaesthesiacore.app/sitemap.xml";
  const robotsPath = resolve(process.cwd(), "public/robots.txt");

  it("exists", () => {
    expect(existsSync(robotsPath)).toBe(true);
  });

  const contents = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";

  it("contains a Sitemap: directive", () => {
    expect(/^\s*Sitemap:\s*\S+/im.test(contents)).toBe(true);
  });

  it(`points to ${SITEMAP_URL}`, () => {
    const sitemaps = Array.from(contents.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim)).map(
      (m) => m[1],
    );
    expect(
      sitemaps,
      `Expected exactly one Sitemap: ${SITEMAP_URL}\nFound: ${JSON.stringify(sitemaps)}\n` +
        `Update public/robots.txt to advertise the canonical sitemap URL.`,
    ).toEqual([SITEMAP_URL]);
  });
});
