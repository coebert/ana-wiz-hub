import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Diagram from "@/components/diagrams/anatomy/EpiduralSpaceDiagram";
afterEach(cleanup);

it("catheter visibility preserves the reviewed epidural-only segment and does not introduce a route", () => {
  const { container } = render(<MemoryRouter><Diagram /></MemoryRouter>);
  expect(container.querySelector('[data-part="catheter-segment"]')).toHaveAttribute("d", "M147 350V180Q147 152 171 127");
  fireEvent.click(screen.getByRole("button", { name: "Catheter segment" }));
  expect(container.querySelector('[data-part="catheter"]')).toBeNull();
  expect(container.querySelector('[data-part="dura"]')).toHaveAttribute("x", "230");
  expect(container.querySelector('[data-part="arachnoid"]')).toHaveAttribute("x", "245");
  expect(container.querySelector('[data-part="subarachnoid-csf"]')).toHaveAttribute("x", "250");
  fireEvent.click(screen.getByRole("button", { name: "Catheter segment" }));
  expect(container.querySelector('[data-part="catheter-segment"]')).toHaveAttribute("d", "M147 350V180Q147 152 171 127");
  expect(container.querySelector('[data-part="cranial-arrow"]')).toHaveAttribute("d", "M160 130L175 123L171 139");
  expect(container.querySelector('[data-part*="needle"]')).toBeNull();
});