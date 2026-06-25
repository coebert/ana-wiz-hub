import { describe, it, expect, beforeEach } from "vitest";
import { render, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { ComponentType } from "react";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";
import FRCAPrimaryHub from "@/pages/FRCAPrimaryHub";
import FRCAFinalHub from "@/pages/FRCAFinalHub";
import FFICMHub from "@/pages/FFICMHub";

/**
 * Crawl each FRCA/FFICM hub route, parse the FAQPage JSON-LD that Helmet
 * injects into <head>, and assert every question + answer in the JSON-LD has
 * a matching visible `<summary>` and answer paragraph in the rendered DOM.
 *
 * This guards the rich-result contract Google requires: every FAQPage entry
 * must be visible on-page. A mismatch (typo, missing FAQ entry, edited
 * answer prose) fails CI before it ships.
 */

const HUBS: Array<{ path: string; loader: () => Promise<{ default: ComponentType }> }> = [
  { path: "/frca-primary", loader: () => import("@/pages/FRCAPrimaryHub") },
  { path: "/frca-final", loader: () => import("@/pages/FRCAFinalHub") },
  { path: "/fficm", loader: () => import("@/pages/FFICMHub") },
];

interface FaqEntry {
  question: string;
  answer: string;
}

function extractFaqEntries(): FaqEntry[] | null {
  const scripts = Array.from(
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
  );
  for (const s of scripts) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(s.textContent ?? "");
    } catch {
      continue;
    }
    if (!parsed || typeof parsed !== "object") continue;
    const obj = parsed as Record<string, unknown>;
    if (obj["@type"] !== "FAQPage") continue;
    const main = obj.mainEntity;
    if (!Array.isArray(main)) return [];
    return main.map((q) => {
      const qo = q as Record<string, unknown>;
      const answer = qo.acceptedAnswer as Record<string, unknown> | undefined;
      return {
        question: String(qo.name ?? ""),
        answer: String(answer?.text ?? ""),
      };
    });
  }
  return null;
}

function collapseWs(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

describe("Hub FAQPage JSON-LD ↔ visible FAQ parity", () => {
  beforeEach(() => {
    cleanup();
    // Helmet appends to document.head across renders — clear stale tags.
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove());
  });

  for (const hub of HUBS) {
    it(`${hub.path}: FAQPage JSON-LD matches visible FAQ content`, async () => {
      const Lazy = lazy(hub.loader);
      const { container } = render(
        <HelmetProvider>
          <ExamFilterProvider>
            <MemoryRouter initialEntries={[hub.path]}>
              <Suspense fallback={null}>
                <Lazy />
              </Suspense>
            </MemoryRouter>
          </ExamFilterProvider>
        </HelmetProvider>,
      );

      // Wait for Helmet to flush <script> tags into document.head.
      let faqs: FaqEntry[] | null = null;
      await waitFor(
        () => {
          faqs = extractFaqEntries();
          expect(faqs, "FAQPage JSON-LD block not found in <head>").not.toBeNull();
        },
        { timeout: 3000 },
      );

      const entries = faqs!;
      expect(entries.length, "FAQPage.mainEntity must be non-empty").toBeGreaterThan(0);

      // Visible <summary> elements should equal the JSON-LD questions, in order.
      const summaries = Array.from(container.querySelectorAll("summary")).map((el) =>
        collapseWs(el.textContent ?? ""),
      );
      const jsonQs = entries.map((e) => collapseWs(e.question));
      expect(summaries).toEqual(jsonQs);

      // Each answer paragraph should appear verbatim in the rendered DOM.
      const pageText = collapseWs(container.textContent ?? "");
      for (const entry of entries) {
        const answer = collapseWs(entry.answer);
        expect(
          pageText.includes(answer),
          `Answer for "${entry.question}" not visible on ${hub.path}`,
        ).toBe(true);
      }
    });
  }
});
