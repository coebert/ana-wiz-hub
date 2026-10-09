import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import inventory from "@/data/anatomyDiagramSources.generated.json";
import DiagramSources from "@/pages/DiagramSources";

vi.mock("@/components/layout/SectionLayout", () => ({ SectionLayout: ({ children }: { children: React.ReactNode }) => <main>{children}</main> }));

describe("Anatomy diagram sources", () => {
  it("includes every surgical atlas plate, all painted plates and all four brain views", () => {
    expect(inventory.entries.filter(e => e.kind === "Painted atlas plate")).toHaveLength(2);
    expect(inventory.entries.filter(e => e.kind === "Sourced public-domain plate")).toHaveLength(31);
    expect(inventory.entries.filter(e => e.kind === "Surgical atlas schematic")).toHaveLength(32);
    for (const id of ["BrainAxialDiagram", "BrainCoronalDiagram", "BrainAnatomyDiagram", "BrainMedialDiagram", "NephronDiagram"]) expect(inventory.entries.some(e => e.id === id)).toBe(true);
    expect(new Set(inventory.entries.map(e => e.id)).size).toBe(inventory.entries.length);
  });
  it("does not certify missing sources or generated painted artwork", () => {
    for (const e of inventory.entries) {
      if (!e.sources.length || e.kind === "Painted atlas plate") expect(e.status).toBe("needs-review");
      expect(e.topicLinks.length).toBeGreaterThan(0);
      expect(e.sources.some(s => s.detail?.includes("could not be resolved"))).toBe(false);
    }
    expect(inventory.entries.find(e => e.id === "BrainAxialDiagram")?.uncertainty.join(" ")).toContain("Occipital-horn");
    const sagittal = inventory.entries.find(e => e.id === "airwayFolio-sagittal");
    expect(sagittal?.credit).toContain("Public domain");
    expect(sagittal?.sources[0]?.url).toContain("commons.wikimedia.org");
  });
  it("searches by source and shows an honest empty state", () => {
    render(<MemoryRouter><DiagramSources /></MemoryRouter>);
    const search = screen.getByLabelText("Search diagrams and sources");
    fireEvent.change(search, { target: { value: "Occipital-horn" } });
    expect(document.querySelectorAll("[data-diagram-entry]")).toHaveLength(1);
    expect(screen.getByRole("status").textContent).toContain("Showing 1 of");
    fireEvent.change(search, { target: { value: "no-such-diagram-xxxx" } });
    expect(screen.getByText("No diagrams match these filters.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(document.querySelectorAll("[data-diagram-entry]")).toHaveLength(inventory.entries.length);
    cleanup();
  });
});