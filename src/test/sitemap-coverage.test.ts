import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { topicsBySection, sectionMeta, type Section } from "@/data/curriculum";

describe("sitemap.xml curriculum coverage", () => {
  const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
  const sitemapsDir = resolve(process.cwd(), "public/sitemaps");

  it("exists", () => {
    expect(existsSync(sitemapPath)).toBe(true);
  });

  // sitemap.xml is now a sitemap index; aggregate <loc>s from every per-group sitemap.
  const locs = new Set<string>();
  if (existsSync(sitemapsDir)) {
    for (const file of readdirSync(sitemapsDir)) {
      if (!file.endsWith(".xml")) continue;
      const xml = readFileSync(resolve(sitemapsDir, file), "utf8");
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        locs.add(m[1].replace(/^https?:\/\/[^/]+/, ""));
      }
    }
  }


  it("includes every section landing page", () => {
    const missing = (Object.keys(sectionMeta) as Section[])
      .map((s) => sectionMeta[s].path)
      .filter((p) => !locs.has(p));
    expect(missing, `Missing section routes: ${missing.join(", ")}`).toEqual([]);
  });

  it("includes every available curriculum topic route", () => {
    const expected: string[] = [];
    for (const section of Object.keys(topicsBySection) as Section[]) {
      for (const topic of topicsBySection[section]) {
        if (!topic.available) continue;
        expected.push(`${sectionMeta[section].path}/${topic.id}`);
      }
    }
    const missing = expected.filter((p) => !locs.has(p));
    expect(
      missing,
      `Missing ${missing.length} topic route(s) from sitemap.xml:\n${missing.join("\n")}\nRun \`bunx tsx scripts/generate-sitemap.ts\` to regenerate.`,
    ).toEqual([]);
  });
});
