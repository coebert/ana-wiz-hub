import { describe, it, expect } from "vitest";
import {
  URL_EXPECTATIONS,
  expectedTypesForUrl,
  sectionUrls,
  topicUrls,
  vivaUrls,
  RICH_RESULT_REQUIRED,
  SITEWIDE_TYPES,
} from "./fixtures/jsonld-url-expectations";
import { sectionMeta, topicsBySection, type Section } from "@/data/curriculum";

/**
 * Sanity tests for the centralised URL → JSON-LD expectations fixture.
 *
 * Guarantees that as the curriculum grows:
 *   • every available topic auto-appears with BreadcrumbList + LearningResource,
 *   • every section landing has BreadcrumbList + Course,
 *   • every expected @type has a Rich Results required-property entry,
 *   • URLs are unique and well-formed,
 *   • sitewide @types are not duplicated into per-URL expectations.
 */
describe("fixtures/jsonld-url-expectations", () => {
  it("URLs are unique", () => {
    const urls = URL_EXPECTATIONS.map((r) => r.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("URLs start with '/' and have no trailing slash (except root)", () => {
    for (const r of URL_EXPECTATIONS) {
      expect(r.url.startsWith("/"), `URL ${r.url} must start with /`).toBe(true);
      if (r.url !== "/") {
        expect(r.url.endsWith("/"), `URL ${r.url} must not end with /`).toBe(false);
      }
    }
  });

  it("every expected @type has a Rich Results required-property entry", () => {
    const all = new Set(URL_EXPECTATIONS.flatMap((r) => r.expectedTypes));
    for (const t of all) {
      expect(
        Object.prototype.hasOwnProperty.call(RICH_RESULT_REQUIRED, t),
        `@type ${t} appears in expectations but not in RICH_RESULT_REQUIRED`,
      ).toBe(true);
    }
  });

  it("sitewide @types are not duplicated into per-URL expectations", () => {
    for (const r of URL_EXPECTATIONS) {
      for (const t of r.expectedTypes) {
        expect(
          (SITEWIDE_TYPES as readonly string[]).includes(t),
          `URL ${r.url}: sitewide @type ${t} should not be repeated per-route`,
        ).toBe(false);
      }
    }
  });

  it("every section in sectionMeta has a section row", () => {
    const got = new Set(sectionUrls().map((r) => r.url));
    for (const meta of Object.values(sectionMeta)) {
      expect(got.has(meta.path), `missing section row for ${meta.path}`).toBe(true);
    }
  });

  it("every available topic has a topic row", () => {
    const got = new Set(topicUrls().map((r) => r.url));
    for (const [section, topics] of Object.entries(topicsBySection) as [
      Section,
      (typeof topicsBySection)[Section],
    ][]) {
      for (const t of topics) {
        if (!t.available) continue;
        const url = `${sectionMeta[section].path}/${t.id}`;
        expect(got.has(url), `missing topic row for ${url}`).toBe(true);
      }
    }
  });

  it("expectedTypesForUrl resolves known URLs and returns undefined for unknown", () => {
    expect(expectedTypesForUrl("/physics")).toEqual(["BreadcrumbList", "Course"]);
    expect(expectedTypesForUrl("/viva/library")).toEqual(["FAQPage"]);
    expect(expectedTypesForUrl("/this/does/not/exist")).toBeUndefined();
  });

  it(`exposes at least one viva URL (n=${vivaUrls().length})`, () => {
    expect(vivaUrls().length).toBeGreaterThan(0);
  });
});
