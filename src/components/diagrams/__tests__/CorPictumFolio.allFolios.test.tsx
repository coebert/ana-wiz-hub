import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CorPictumFolio from "../CorPictumFolio";
import {
  airwayFolio,
  headNeckFolio,
  neuroFolio,
  spinalFolio,
  brachialFolio,
  upperLimbFolio,
  lowerLimbFolio,
  thoracicFolio,
  abdominalFolio,
  
} from "../anatomyFolios";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ExamFilterProvider>{ui}</ExamFilterProvider>);

/**
 * Visual-regression guard for ALL anatomy folios:
 * confirms that overlay labels are suppressed by default (the global
 * default established to prevent double-labelling on painted plates).
 *
 * Asserted behaviour matches both the dev preview and production builds —
 * the `suppressOverlayLabels` default lives in the component, not in the
 * call site, so prod and preview behave identically.
 */

const folios = [
  ["airway", airwayFolio],
  ["headNeck", headNeckFolio],
  ["neuro", neuroFolio],
  ["spinal", spinalFolio],
  ["brachial", brachialFolio],
  ["upperLimb", upperLimbFolio],
  ["lowerLimb", lowerLimbFolio],
  ["thoracic", thoracicFolio],
  ["abdominal", abdominalFolio],
  
] as const;

const collectLabelTexts = (folio: typeof airwayFolio) =>
  new Set(
    folio.plates.flatMap((p) =>
      p.labels
        .filter((l) => l.polygon && l.polygon.length >= 3)
        .map((l) => l.english),
    ),
  );

describe("CorPictumFolio — overlay labels suppressed by default across all folios", () => {
  for (const [name, folio] of folios) {
    it(`${name}: no overlay labels render by default`, () => {
      const { container } = renderWithProviders(
        <CorPictumFolio {...folio} />,
      );
      const renderedTexts = new Set(
        Array.from(container.querySelectorAll("svg text"))
          .map((t) => t.textContent ?? "")
          .filter(Boolean),
      );
      const expectedSuppressed = collectLabelTexts(folio);
      // None of the polygon-driven overlay labels should appear in the SVG.
      for (const label of expectedSuppressed) {
        expect(renderedTexts.has(label)).toBe(false);
      }
    });

    it(`${name}: overlay labels reappear when explicitly opted in`, () => {
      const polygonLabels = collectLabelTexts(folio);
      if (polygonLabels.size === 0) return; // folio has no overlay labels to test
      const { container } = renderWithProviders(
        <CorPictumFolio {...folio} suppressOverlayLabels={false} />,
      );
      const renderedTexts = new Set(
        Array.from(container.querySelectorAll("svg text"))
          .map((t) => t.textContent ?? "")
          .filter(Boolean),
      );
      // At least one polygon label should now be painted as an overlay.
      const anyRendered = [...polygonLabels].some((l) => renderedTexts.has(l));
      expect(anyRendered).toBe(true);
    });
  }
});
