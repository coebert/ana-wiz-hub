import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import AnatomyPlate, { type AnatomyLabel } from "./AnatomyPlate";

describe("AnatomyPlate", () => {
  const labels: AnatomyLabel[] = [
    { id: "aorta", text: "Aorta", target: [500, 300], label: [700, 200] },
    { id: "lv", text: "Left ventricle", target: [400, 450], label: [150, 500], sub: "Systemic pump" },
  ];

  it("renders title, subtitle, caption, labels and checkpoints without verify-mode wiring", () => {
    const { container, getByText } = render(
      <AnatomyPlate
        title="Cardiac chambers"
        subtitle="Anterior view"
        caption="Schematic only"
        checkpoints={["LV wall ~10mm", "Aortic valve trileaflet"]}
        labels={labels}
      >
        <circle cx={500} cy={350} r={120} fill="none" stroke="currentColor" />
      </AnatomyPlate>,
    );

    expect(getByText("Cardiac chambers")).toBeInTheDocument();
    expect(getByText("Anterior view")).toBeInTheDocument();
    expect(getByText("Schematic only")).toBeInTheDocument();
    expect(getByText("Aorta")).toBeInTheDocument();
    expect(getByText("Left ventricle")).toBeInTheDocument();
    expect(getByText("Systemic pump")).toBeInTheDocument();
    expect(getByText("LV wall ~10mm")).toBeInTheDocument();

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("respects hideLabels by omitting label text from the SVG", () => {
    const { queryByText, container } = render(
      <AnatomyPlate title="Bare plate" labels={labels} hideLabels>
        <rect x={0} y={0} width={10} height={10} />
      </AnatomyPlate>,
    );

    expect(queryByText("Aorta")).toBeNull();
    expect(queryByText("Left ventricle")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
