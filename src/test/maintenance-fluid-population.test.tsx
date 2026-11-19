import { fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import MaintenanceFluidTool from "@/pages/tools/MaintenanceFluidTool";

it("uses separate paediatric and adult estimates and clears results for invalid input", () => {
  render(<MemoryRouter><HelmetProvider><MaintenanceFluidTool /></HelmetProvider></MemoryRouter>);
  const weight = screen.getByRole("spinbutton");
  fireEvent.change(weight, { target: { value: "14" } });
  const output = screen.getByText("Child daily requirement (NG29)").parentElement!;
  expect(within(output).getByText("1200")).toBeInTheDocument();
  expect(screen.getByText("48")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "adult" } });
  fireEvent.change(weight, { target: { value: "70" } });
  expect(screen.getByText("1750–2100")).toBeInTheDocument();
  expect(screen.getByText("73–88")).toBeInTheDocument();
  expect(screen.queryByText("Child hourly approximation (4-2-1)")).toBeNull();

  fireEvent.change(weight, { target: { value: "" } });
  expect(screen.getByRole("status")).toHaveTextContent("Enter a weight");
  expect(screen.queryByText("1750–2100")).toBeNull();
});
