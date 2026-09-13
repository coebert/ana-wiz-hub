import { describe, it, expect, beforeEach } from "vitest";
import { render, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { ComponentType } from "react";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";
// The hub header renders the account menu, which requires the auth context.
import { AuthProvider } from "@/hooks/useAuth";
import FRCAPrimaryHub from "@/pages/FRCAPrimaryHub";
import FRCAFinalHub from "@/pages/FRCAFinalHub";
import FFICMHub from "@/pages/FFICMHub";

/**
 * Snapshot regression for hub FAQ content.
 *
 * Captures two artifacts per hub route and pins them via Vitest snapshots:
 *   1. The full FAQPage JSON-LD structure (shape + every Q/A string).
 *   2. The visible DOM FAQ block (<summary> + answer prose, in order).
 *
 * Any drift — a reworded question, a new entry, a removed entry, a changed
 * @type, or a missing acceptedAnswer — fails the build until the snapshot
 * is intentionally updated with `vitest -u`. Pairs with hub-faq-jsonld.test
 * which enforces JSON-LD ↔ DOM parity at runtime.
 */

const HUBS: Array<{ name: string; path: string; Component: ComponentType }> = [
  { name: "frca-primary", path: "/frca-primary", Component: FRCAPrimaryHub },
  { name: "frca-final", path: "/frca-final", Component: FRCAFinalHub },
  { name: "fficm", path: "/fficm", Component: FFICMHub },
];

const collapseWs = (s: string) => s.replace(/\s+/g, " ").trim();

function findFaqPageJsonLd(): Record<string, unknown> | null {
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
    if (parsed && typeof parsed === "object" && (parsed as Record<string, unknown>)["@type"] === "FAQPage") {
      return parsed as Record<string, unknown>;
    }
  }
  return null;
}

/** Normalise FAQPage JSON-LD into a stable snapshot shape. */
function normaliseFaqPage(block: Record<string, unknown>) {
  const mainEntity = Array.isArray(block.mainEntity) ? block.mainEntity : [];
  return {
    "@context": block["@context"] ?? null,
    "@type": block["@type"] ?? null,
    mainEntity: mainEntity.map((entry) => {
      const q = entry as Record<string, unknown>;
      const answer = q.acceptedAnswer as Record<string, unknown> | undefined;
      return {
        "@type": q["@type"] ?? null,
        name: collapseWs(String(q.name ?? "")),
        acceptedAnswer: {
          "@type": answer?.["@type"] ?? null,
          text: collapseWs(String(answer?.text ?? "")),
        },
      };
    }),
  };
}

/** Capture visible FAQ DOM (question + answer paragraphs) in document order. */
function captureVisibleFaq(container: HTMLElement) {
  const details = Array.from(container.querySelectorAll("details"));
  return details.map((d) => {
    const summary = d.querySelector("summary");
    const answerNodes = Array.from(d.children).filter((c) => c.tagName !== "SUMMARY");
    return {
      question: collapseWs(summary?.textContent ?? ""),
      answer: collapseWs(answerNodes.map((n) => n.textContent ?? "").join(" ")),
    };
  });
}

describe("Hub FAQ snapshot regression", () => {
  beforeEach(() => {
    cleanup();
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove());
  });

  for (const hub of HUBS) {
    it(`${hub.path}: FAQPage JSON-LD snapshot`, async () => {
      const Hub = hub.Component;
      render(
        <HelmetProvider>
          <AuthProvider>
          <ExamFilterProvider>
            <MemoryRouter initialEntries={[hub.path]}>
              <Hub />
            </MemoryRouter>
          </ExamFilterProvider>
          </AuthProvider>
        </HelmetProvider>,
      );

      let block: Record<string, unknown> | null = null;
      await waitFor(
        () => {
          block = findFaqPageJsonLd();
          expect(block, "FAQPage JSON-LD missing").not.toBeNull();
        },
        { timeout: 3000 },
      );

      expect(normaliseFaqPage(block!)).toMatchSnapshot(`${hub.name}-faqpage-jsonld`);
    });

    it(`${hub.path}: visible FAQ DOM snapshot`, async () => {
      const Hub = hub.Component;
      const { container } = render(
        <HelmetProvider>
          <AuthProvider>
          <ExamFilterProvider>
            <MemoryRouter initialEntries={[hub.path]}>
              <Hub />
            </MemoryRouter>
          </ExamFilterProvider>
          </AuthProvider>
        </HelmetProvider>,
      );

      await waitFor(() => {
        expect(container.querySelectorAll("details").length).toBeGreaterThan(0);
      });

      expect(captureVisibleFaq(container)).toMatchSnapshot(`${hub.name}-faq-dom`);
    });
  }
});
