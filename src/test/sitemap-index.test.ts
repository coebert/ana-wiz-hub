import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";

/**
 * The sitemap index at public/sitemap.xml must be well-formed XML and every
 * nested <sitemap><loc> must resolve to an existing file on disk. If a
 * per-section sitemap is removed or renamed without updating the index,
 * crawlers will 404 on the referenced URL and SEO coverage drops.
 */
describe("sitemap index integrity", () => {
  const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
  const sitemapsDir = resolve(process.cwd(), "public/sitemaps");

  it("public/sitemap.xml exists", () => {
    expect(existsSync(sitemapPath)).toBe(true);
  });

  const contents = existsSync(sitemapPath)
    ? readFileSync(sitemapPath, "utf8")
    : "";

  it("is well-formed XML (has sitemapindex root)", () => {
    expect(contents).toMatch(/<sitemapindex[^>]*>/);
    expect(contents).toMatch(/<\/sitemapindex>/);
  });

  it("contains at least one nested <sitemap>", () => {
    const sitemapBlocks = Array.from(contents.matchAll(/<sitemap>/g));
    expect(sitemapBlocks.length).toBeGreaterThan(0);
  });

  it("every <loc> resolves to an existing file in public/sitemaps/", () => {
    const sitemapBlocks = Array.from(
      contents.matchAll(/<sitemap>[\s\S]*?<\/sitemap>/g),
    );

    const offenders: string[] = [];

    for (const [raw] of sitemapBlocks) {
      const loc = raw.match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!loc) {
        offenders.push("<sitemap> block missing <loc>");
        continue;
      }

      // Expect canonical domain; map to local public/ path
      const localPath = loc.replace(
        /^https:\/\/anaesthesiacore\.app\//,
        "public/",
      );

      if (!existsSync(resolve(process.cwd(), localPath))) {
        offenders.push(`${loc} -> ${localPath} (file not found)`);
      }
    }

    expect(
      offenders,
      `Broken sitemap references:\n${offenders.join("\n")}\n` +
        `Run \`bunx tsx scripts/generate-sitemap.ts\` to regenerate, ` +
        `or update public/sitemap.xml to match files in public/sitemaps/.`,
    ).toEqual([]);
  });
});
