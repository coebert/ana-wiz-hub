import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Diagram from "@/components/diagrams/anatomy/ParavertebralSpaceDiagram";
afterEach(cleanup);

it("selects only declared boundaries while omitted anatomy stays text-only", () => {
  const { container } = render(<MemoryRouter><Diagram /></MemoryRouter>);
  for (const [name, edge] of [["Medial — body / disc", "medial"], ["Medial — foramen", "medial"], ["Posterior — superior costotransverse ligament", "posterior"], ["Anterolateral — parietal pleura", "anterolateral"]]) {
    fireEvent.click(screen.getByRole("button", { name }));
    expect(container.querySelector(`[data-boundary="${edge}"]`)).toHaveAttribute("data-selected", "true");
  }
  fireEvent.click(screen.getByRole("button", { name: "Spinal Nerve" }));
  expect(screen.getByText(/Text-only detail/)).toBeInTheDocument();
  expect(container.querySelector('[data-boundary][data-selected="true"]')).toBeNull();
});

it("boundary visibility does not change compartment geometry or reintroduce routes", () => {
  const { container } = render(<MemoryRouter><Diagram /></MemoryRouter>);
  const shape = container.querySelector('[data-part="compartment"]')?.getAttribute("d");
  fireEvent.click(screen.getByRole("button", { name: "Boundaries" }));
  expect(container.querySelectorAll('[data-boundary]')).toHaveLength(0);
  expect(container.querySelector('[data-part="compartment"]')).toHaveAttribute("d", shape);
  fireEvent.click(screen.getByRole("button", { name: "Boundaries" }));
  expect(container.querySelectorAll('[data-boundary]')).toHaveLength(3);
  expect(container.querySelector('[data-part*="needle"]')).toBeNull();
});