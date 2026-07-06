import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CorPictumFolio, { type CorPictumPlate } from "@/components/diagrams/anatomy/CorPictumFolio";
import { upperLimbFolio, lowerLimbFolio } from "../anatomyFolios";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ExamFilterProvider>{ui}</ExamFilterProvider>);

/**
 * Visual-regression guard — ensures the limb anatomy plates do NOT render
 * the auto overlay labels on top of the painted plate (which already has
 * baked-in labels). A regression here re-introduces the "double-label" bug.
 */

const plate: CorPictumPlate = {
  id: "t",
  tabLabel: "T",
  folio: "I",
  title: "Test",
  subtitle: "",
  image: "data:image/png;base64,iVBORw0KGgo=",
  alt: "",
  caption: "",
  labels: [
    {
      latin: "musculus testus",
      english: "Sentinel Label",
      note: "n",
      polygon: [
        [0.2, 0.2],
        [0.4, 0.2],
        [0.4, 0.4],
        [0.2, 0.4],
      ],
    },
  ],
};

describe("CorPictumFolio overlay labels", () => {
  it("suppresses auto labels by default", () => {
    const { container } = renderWithProviders(
      <CorPictumFolio atlasTitle="A" atlasSubtitle="" plates={[plate]} />,
    );
    const texts = Array.from(container.querySelectorAll("svg text")).filter(
      (t) => t.textContent === "Sentinel Label",
    );
    expect(texts.length).toBe(0);
  });

  it("renders auto labels when suppressOverlayLabels is explicitly false", () => {
    const { container } = renderWithProviders(
      <CorPictumFolio atlasTitle="A" atlasSubtitle="" plates={[plate]} suppressOverlayLabels={false} />,
    );
    const texts = Array.from(container.querySelectorAll("svg text")).filter(
      (t) => t.textContent === "Sentinel Label",
    );
    expect(texts.length).toBe(1);
  });

  it("upper- and lower-limb folios contain polygon labels (so suppression matters)", () => {
    const hasPolygons = (folio: typeof upperLimbFolio) =>
      folio.plates.some((p) => p.labels.some((l) => l.polygon && l.polygon.length >= 3));
    expect(hasPolygons(upperLimbFolio)).toBe(true);
    expect(hasPolygons(lowerLimbFolio)).toBe(true);
  });
});
