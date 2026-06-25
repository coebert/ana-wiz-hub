import { describe, it, expect } from "vitest";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

/**
 * Snapshot regression for FAQ content across EVERY topic route (not just the
 * three exam hubs covered by hub-faq-snapshots.test.tsx).
 *
 * The source of truth for FAQ content is the `<name>Faqs: Array<[string, string]>`
 * literal in each `src/pages/topics/*Topic.tsx` file. That same literal feeds:
 *
 *   • the visible DOM (rendered by `<TopicFaqs>` as an accordion of <summary>
 *     + answer prose), AND
 *   • the FAQPage JSON-LD (emitted at runtime via Helmet and baked into the
 *     static HTML by `scripts/prerender-seo.ts`).
 *
 * By pinning the extractor's output we catch ANY drift — a reworded question,
 * an edited answer, a new/removed entry, or a typo — across all topic pages,
 * for both the DOM accordion and the JSON-LD block, in one cheap test.
 *
 * To intentionally update after editing FAQ copy, run `vitest -u`.
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

describe("Topic FAQ source-of-truth snapshot regression", () => {
  const faqsByPath = extractFaqsByPath();
  const paths = Object.keys(faqsByPath).sort();

  it("matches the pinned set of FAQ-bearing routes", () => {
    // Locks the list of routes that ship FAQPage JSON-LD + visible FAQs.
    // Adding/removing a topic's FAQ block will fail this until reviewed.
    expect(paths).toMatchSnapshot("faq-route-list");
  });

  it("matches the FAQ count per route", () => {
    // Cheap, readable diff when only the number of Q&A changes on a route.
    const counts = Object.fromEntries(paths.map((p) => [p, faqsByPath[p].length]));
    expect(counts).toMatchSnapshot("faq-route-counts");
  });

  it("matches the full FAQ content (DOM + JSON-LD source of truth)", () => {
    // Every Q/A string is pinned. Any wording drift fails until re-baselined.
    const normalised: Record<string, Array<{ q: string; a: string }>> = {};
    for (const p of paths) {
      normalised[p] = faqsByPath[p].map(([q, a]) => ({
        q: q.replace(/\s+/g, " ").trim(),
        a: a.replace(/\s+/g, " ").trim(),
      }));
    }
    expect(normalised).toMatchSnapshot("faq-content-by-route");
  });

  it("matches the synthesised FAQPage JSON-LD per route", () => {
    // Mirrors the exact JSON-LD shape emitted by `<TopicFaqs>` and baked
    // into static HTML by `scripts/prerender-seo.ts`.
    const jsonLdByPath: Record<string, ReturnType<typeof buildFaqPageJsonLd>> = {};
    for (const p of paths) jsonLdByPath[p] = buildFaqPageJsonLd(faqsByPath[p]);
    expect(jsonLdByPath).toMatchSnapshot("faqpage-jsonld-by-route");
  });
});
