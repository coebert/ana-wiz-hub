import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DiaphragmDiagram } from "./DiaphragmDiagram";

describe("Diaphragm anatomical orientation and selection", () => {
  it("places the caval foramen patient-right and oesophageal hiatus patient-left", () => {
    const { container } = render(<DiaphragmDiagram />);
    const openings = Array.from(container.querySelectorAll("svg ellipse"));
    expect(openings.map((o) => Number(o.getAttribute("cx")))).toEqual([225, 265, 250]);
  });

  it("keeps an opening selected when clicked repeatedly", () => {
    const { container } = render(<DiaphragmDiagram />);
    for (const opening of container.querySelectorAll("svg ellipse")) {
      fireEvent.click(opening);
      fireEvent.click(opening);
      expect(container.textContent).toContain("Transmits:");
    }
  });
});