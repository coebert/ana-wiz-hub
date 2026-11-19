import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import CardiacArrestPostCardiacSurgeryDiagram from "@/components/diagrams/clinical/CardiacArrestPostCardiacSurgeryDiagram";
import ArrestTimeWindowWidget from "@/components/diagrams/clinical/ArrestTimeWindowWidget";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
import { topicReferences } from "@/data/references";

vi.mock("@/components/diagrams/_shared/DiagramFigure", () => ({ DiagramFigure: ({ children }: { children: ReactNode }) => <section>{children}</section> }));
afterEach(cleanup);

describe("post-cardiac-surgery arrest teaching", () => {
  it("starts CPR in PEA and confines pacing or shocks before CPR to the appropriate rhythms", () => {
    const diagram = render(<CardiacArrestPostCardiacSurgeryDiagram />);
    fireEvent.click(screen.getByRole("tab", { name: "Pulseless electrical activity" }));
    expect(diagram.container.textContent).toContain("Start external chest compressions immediately");
    expect(diagram.container.textContent).not.toContain("Check & use epicardial pacing FIRST");
    expect(diagram.container.textContent).toContain("50–100 micrograms IV");
    fireEvent.click(screen.getByRole("tab", { name: /Asystole/ }));
    expect(diagram.container.textContent).toContain("immediate pacing at maximum output");
    expect(diagram.container.textContent).toContain("first minute");
    fireEvent.click(screen.getByRole("tab", { name: /pulseless VT/ }));
    expect(diagram.container.textContent).toContain("up to three consecutive shocks");
    expect(diagram.container.textContent).toContain("at most one minute");
  });

  it("shows immediate PEA actions at time zero and the surgical reopening deadline at five minutes", () => {
    const timer = render(<ArrestTimeWindowWidget />);
    expect(timer.container.textContent).toContain("Start compressions immediately in PEA");
    fireEvent.click(screen.getByRole("button", { name: "1:00" }));
    expect(timer.container.textContent).toContain("CPR should already be underway");
    fireEvent.click(screen.getByRole("button", { name: "5:00" }));
    expect(timer.container.textContent).toContain("within five minutes of arrest");
    expect(timer.container.textContent).toContain("up to ten days after cardiac surgery");
  });

  it("carries the same rhythm and dose instructions into the FAQ used by offline teaching", () => {
    const faq = extractFaqsByPath()["/clinical/cardiothoracic"].find(([question]) => question.includes("cardiac arrest managed"));
    expect(faq?.[1]).toContain("In PEA, start chest compressions immediately");
    expect(faq?.[1]).toContain("50–100 micrograms IV");
    expect(faq?.[1]).toContain("resternotomy within five minutes");
    for (const label of ["RCUK 2025 cardiac surgery", "STS 2017 post-cardiac-surgery arrest"]) {
      expect(topicReferences.cardiothoracic.some((entry) => entry.label === label && entry.url.startsWith("https://"))).toBe(true);
    }
  });
});
