import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";

/**
 * Every <url> in every per-section sitemap must carry a <lastmod>, either
 * resolved from the backing page file's git/mtime timestamp or supplied as a
 * safe fallback in scripts/generate-sitemap.ts. Crawlers use lastmod to
 * prioritise re-fetches, so a missing date silently degrades crawl efficiency.
 */
describe("sitemap entries have a lastmod", () => {
  const sitemapsDir = resolve(process.cwd(), "public/sitemaps");
  const isoDate = /^\d{4}-\d{2}-\d{2}(T[\d:.+\-Z]+)?$/;

  it("public/sitemaps directory exists", () => {
    expect(existsSync(sitemapsDir)).toBe(true);
  });

  const files = existsSync(sitemapsDir)
    ? readdirSync(sitemapsDir).filter((f) => f.endsWith(".xml"))
    : [];

  it("at least one per-section sitemap is present", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`${file}: every <url> has a valid <lastmod>`, () => {
      const xml = readFileSync(resolve(sitemapsDir, file), "utf8");
      const urlBlocks = Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/g));
      expect(urlBlocks.length, `${file} has no <url> entries`).toBeGreaterThan(0);

      const offenders: string[] = [];
      for (const [, body] of urlBlocks) {
        const loc = body.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "(unknown)";
        const lastmod = body.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
        if (!lastmod) {
          offenders.push(`${loc} — missing <lastmod>`);
        } else if (!isoDate.test(lastmod)) {
          offenders.push(`${loc} — invalid <lastmod>: ${lastmod}`);
        }
      }

      expect(
        offenders,
        `Entries without a valid lastmod in ${file}:\n${offenders.join("\n")}\n` +
          `Run \`bunx tsx scripts/generate-sitemap.ts\` and check its warnings; ` +
          `add a <Route> for the path in src/App.tsx or set an explicit \`lastmod\` ` +
          `on the entry as a safe fallback.`,
      ).toEqual([]);
    });
  }
});
