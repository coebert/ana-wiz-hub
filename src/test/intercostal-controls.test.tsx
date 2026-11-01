import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Diagram from "@/components/diagrams/anatomy/IntercostalAnatomyDiagram";
afterEach(cleanup);

it("VAN visibility preserves the intercostal depth plane and superior-inferior ordering", () => {
  const { container } = render(<MemoryRouter><Diagram /></MemoryRouter>);
  const markers = () => Array.from(container.querySelectorAll('[data-vessel] circle')).map(circle => Number(circle.getAttribute("cy")));
  expect(markers()).toEqual([151, 174, 197]);
  fireEvent.click(screen.getByRole("button", { name: "Neurovascular details" }));
  expect(container.querySelectorAll('[data-vessel]')).toHaveLength(0);
  expect(container.querySelector('[data-structure="neurovascular"] rect')).toHaveAttribute("x", "165");
  expect(container.querySelector('[data-structure="int-intercostal"] rect')).toHaveAttribute("x", "120");
  expect(container.querySelector('[data-structure="innermost"] rect')).toHaveAttribute("x", "189");
  fireEvent.click(screen.getByRole("button", { name: "Neurovascular details" }));
  expect(markers()).toEqual([151, 174, 197]);
  expect(container.querySelector('[data-part*="needle"]')).toBeNull();
});