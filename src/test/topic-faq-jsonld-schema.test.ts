import { describe, it, expect } from "vitest";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

/**
 * Validates that every FAQPage JSON-LD block we ship satisfies Google's
 * rich-result requirements and schema.org's FAQPage contract. Runs against
 * the source-of-truth FAQ data extracted from `src/pages/topics/*Topic.tsx`
 * (the same data that feeds both `<TopicFaqs>` DOM and the prerendered
 * JSON-LD in `scripts/prerender-seo.ts`).
 *
 * Required-field contract per Google FAQPage docs:
 *   - FAQPage.@context  === "https://schema.org"
 *   - FAQPage.@type     === "FAQPage"
 *   - FAQPage.mainEntity is a non-empty array
 *   - Each entry: @type === "Question", non-empty `name`
 *   - Each entry.acceptedAnswer: @type === "Answer", non-empty `text`
 *
 * Any missing/empty/wrong-typed field FAILS CI so malformed FAQ blocks
 * never reach production.
 *
 * Ref: https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

function buildFaqPageJsonLd(faqs: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

type Issue = { path: string; field: string; reason: string };

function validateFaqPage(block: unknown, route: string): Issue[] {
  const issues: Issue[] = [];
  if (!block || typeof block !== "object") {
    issues.push({ path: route, field: "<root>", reason: "FAQPage block is not an object" });
    return issues;
  }
  const b = block as Record<string, unknown>;

  if (b["@context"] !== "https://schema.org") {
    issues.push({ path: route, field: "@context", reason: `expected "https://schema.org", got ${JSON.stringify(b["@context"])}` });
  }
  if (b["@type"] !== "FAQPage") {
    issues.push({ path: route, field: "@type", reason: `expected "FAQPage", got ${JSON.stringify(b["@type"])}` });
  }
  if (!Array.isArray(b.mainEntity)) {
    issues.push({ path: route, field: "mainEntity", reason: "must be an array" });
    return issues;
  }
  if (b.mainEntity.length === 0) {
    issues.push({ path: route, field: "mainEntity", reason: "must contain ≥1 Question" });
    return issues;
  }

  b.mainEntity.forEach((entry, i) => {
    const where = `mainEntity[${i}]`;
    if (!entry || typeof entry !== "object") {
      issues.push({ path: route, field: where, reason: "entry must be an object" });
      return;
    }
    const q = entry as Record<string, unknown>;
    if (q["@type"] !== "Question") {
      issues.push({ path: route, field: `${where}.@type`, reason: `expected "Question", got ${JSON.stringify(q["@type"])}` });
    }
    if (typeof q.name !== "string" || q.name.trim() === "") {
      issues.push({ path: route, field: `${where}.name`, reason: "must be a non-empty string" });
    }
    const answer = q.acceptedAnswer;
    if (!answer || typeof answer !== "object") {
      issues.push({ path: route, field: `${where}.acceptedAnswer`, reason: "must be an object" });
      return;
    }
    const a = answer as Record<string, unknown>;
    if (a["@type"] !== "Answer") {
      issues.push({ path: route, field: `${where}.acceptedAnswer.@type`, reason: `expected "Answer", got ${JSON.stringify(a["@type"])}` });
    }
    if (typeof a.text !== "string" || a.text.trim() === "") {
      issues.push({ path: route, field: `${where}.acceptedAnswer.text`, reason: "must be a non-empty string" });
    }
  });

  return issues;
}

describe("FAQPage JSON-LD schema validation", () => {
  const faqsByPath = extractFaqsByPath();
  const paths = Object.keys(faqsByPath).sort();

  it("discovers at least one FAQ-bearing route (guards extractor regressions)", () => {
    expect(paths.length).toBeGreaterThan(0);
  });

  it("every route emits a valid FAQPage block (Google rich-result contract)", () => {
    const allIssues: Issue[] = [];
    for (const route of paths) {
      const block = buildFaqPageJsonLd(faqsByPath[route]);
      allIssues.push(...validateFaqPage(block, route));
    }
    if (allIssues.length > 0) {
      const summary = allIssues
        .map((i) => `  ${i.path} → ${i.field}: ${i.reason}`)
        .join("\n");
      throw new Error(
        `Found ${allIssues.length} FAQPage JSON-LD validation issue(s):\n${summary}`,
      );
    }
  });

  it("per-route validation (named subtests for fast failure attribution)", () => {
    // Aggregate per-route to make CI output point at the offending file fast.
    const perRoute: Record<string, Issue[]> = {};
    for (const route of paths) {
      const issues = validateFaqPage(buildFaqPageJsonLd(faqsByPath[route]), route);
      if (issues.length > 0) perRoute[route] = issues;
    }
    expect(perRoute).toEqual({});
  });
});
