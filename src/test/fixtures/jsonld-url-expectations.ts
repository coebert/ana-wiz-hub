/**
 * Centralised JSON-LD URL → expected-types fixtures.
 *
 * Single source of truth for "which URL paths must ship which JSON-LD
 * @type(s)?". Sibling tests (jsonld-url-mapping, jsonld-route-coverage,
 * jsonld-route-params, jsonld-coverage-report) all consume this so the
 * mapping stays consistent as the curriculum grows.
 *
 * URLs are derived from the curriculum data (`sectionMeta`,
 * `topicsBySection`) so adding a new section or topic automatically
 * extends coverage — no edits to this file required.
 *
 * Sitewide @types (WebSite, Organization) are emitted by index.html and
 * inherited by every SPA route, so they don't appear in per-URL
 * expectations.
 */

import { sectionMeta, topicsBySection, type Section } from "@/data/curriculum";

// ── sitewide ──────────────────────────────────────────────────────────────
export const SITEWIDE_TYPES = ["WebSite", "Organization"] as const;

// ── Rich Results required-property table ──────────────────────────────────
// Keep aligned with Google's Rich Results documentation. Tests use this to
// flag JSON-LD that ships a known @type but is missing required props.
export const RICH_RESULT_REQUIRED: Record<string, string[]> = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Course: ["name", "description", "provider"],
  LearningResource: ["name"],
  Drug: ["name"],
};

// ── per-URL expectation rows ──────────────────────────────────────────────
export interface UrlExpectation {
  /** Concrete URL path served by the SPA. */
  url: string;
  /** Required JSON-LD @types for this URL (besides sitewide). */
  expectedTypes: string[];
  /**
   * High-level kind tag — useful for grouping in coverage reports and
   * in test descriptions.
   */
  kind: "home" | "section" | "topic" | "viva" | "drug" | "utility";
  /** Optional curriculum metadata for topic/section URLs. */
  section?: Section;
  topicId?: string;
}

// ── derived rows ──────────────────────────────────────────────────────────
const sectionRows: UrlExpectation[] = (
  Object.entries(sectionMeta) as [Section, { label: string; path: string }][]
).map(([section, meta]) => ({
  url: meta.path,
  expectedTypes: ["BreadcrumbList", "Course"],
  kind: "section",
  section,
}));

const topicRows: UrlExpectation[] = (
  Object.entries(topicsBySection) as [Section, (typeof topicsBySection)[Section]][]
).flatMap(([section, topics]) =>
  topics
    .filter((t) => t.available)
    .map<UrlExpectation>((t) => ({
      url: `${sectionMeta[section].path}/${t.id}`,
      expectedTypes: ["BreadcrumbList", "LearningResource"],
      kind: "topic",
      section,
      topicId: t.id,
    })),
);

const vivaRows: UrlExpectation[] = [
  { url: "/viva/library", expectedTypes: ["FAQPage"], kind: "viva" },
];

const drugRows: UrlExpectation[] = [
  // /drugs/:slug — sitewide-only is acceptable until a Drug schema is added.
  // Sample slugs are kept here so parameterised-route tests can expand.
  { url: "/drugs/propofol", expectedTypes: [], kind: "drug" },
  { url: "/drugs/rocuronium", expectedTypes: [], kind: "drug" },
  { url: "/drugs/remifentanil", expectedTypes: [], kind: "drug" },
];

const utilityRows: UrlExpectation[] = [
  { url: "/", expectedTypes: [], kind: "home" },
  { url: "/revise", expectedTypes: [], kind: "utility" },
  { url: "/map", expectedTypes: [], kind: "utility" },
  { url: "/progress", expectedTypes: [], kind: "utility" },
  { url: "/podcasts", expectedTypes: [], kind: "utility" },
  { url: "/viva", expectedTypes: [], kind: "utility" },
  { url: "/drugs", expectedTypes: [], kind: "utility" },
];

/** All known URL expectations — derived from curriculum + manual rows. */
export const URL_EXPECTATIONS: UrlExpectation[] = [
  ...utilityRows,
  ...sectionRows,
  ...topicRows,
  ...vivaRows,
  ...drugRows,
];

/** Lookup expected @types for a URL. Returns `undefined` if not registered. */
export function expectedTypesForUrl(url: string): string[] | undefined {
  return URL_EXPECTATIONS.find((r) => r.url === url)?.expectedTypes;
}

/** Filter helpers used by tests + reporting. */
export const sectionUrls = () => URL_EXPECTATIONS.filter((r) => r.kind === "section");
export const topicUrls = () => URL_EXPECTATIONS.filter((r) => r.kind === "topic");
export const vivaUrls = () => URL_EXPECTATIONS.filter((r) => r.kind === "viva");
export const drugUrls = () => URL_EXPECTATIONS.filter((r) => r.kind === "drug");
