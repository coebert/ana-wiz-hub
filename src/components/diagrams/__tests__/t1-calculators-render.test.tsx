import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import OpioidConversionCalculator from "../clinical/OpioidConversionCalculator";
import PcaEpiduralCalculator from "../clinical/PcaEpiduralCalculator";
import ParklandCalculator from "../intensive-care/ParklandCalculator";
import SedationCalculatorTool from "@/pages/tools/SedationCalculatorTool";

describe("T1 rendered states", () => {
  it("opioid: zero dose shows no result and no patch/PRN output", () => {
    const { container } = render(<OpioidConversionCalculator />);
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "0" } });
    expect(screen.getByRole("status").textContent).toMatch(/dose above zero/);
    expect(container.textContent).not.toMatch(/nearest patch|PRN/);
  });

  it("opioid: oxycodone 20 mg ×2 → 60 mg OMEDD and no per-dose output", () => {
    const { container } = render(<OpioidConversionCalculator />);
    expect(container.textContent).toContain("60 mg oral morphine / 24 h");
    expect(container.textContent).not.toMatch(/Per dose|chosen interval/);
  });

  it("PCA: 20 kg child epidural range never exceeds 6 mL/h; 7 kg newborn gets no rate", () => {
    const { container } = render(<PcaEpiduralCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /Paediatric/ }));
    const [w, age] = Array.from(container.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
    fireEvent.change(w, { target: { value: "20" } });
    fireEvent.change(age, { target: { value: "60" } });
    expect(container.textContent).toContain("2.0–6.0 mL/h");
    fireEvent.change(w, { target: { value: "7" } });
    fireEvent.change(age, { target: { value: "0" } });
    expect(container.textContent).toMatch(/special group/);
    expect(w.value).toBe("7");
  });

  it("burns: 20 kg child example shows 20 mL/h urine target and no rate-now without fluid given", () => {
    const { container } = render(<ParklandCalculator />);
    fireEvent.click(screen.getAllByRole("button", { name: "Load" })[1]);
    expect(container.textContent).toContain("20 mL/h");
    expect(container.textContent).not.toMatch(/mL\/h —|rate now/i);
    fireEvent.click(screen.getAllByRole("button", { name: "Load" })[3]);
    expect(container.textContent).toMatch(/Formula subtotal only/);
    fireEvent.change(screen.getByLabelText(/Other prescribed fluids/), { target: { value: "0" } });
    expect(container.textContent).toMatch(/240 mL\/kg \(not above 250/);
  });

  it("sedation: negative weight shows no pump rate and no Stop row", () => {
    const { container } = render(
      <HelmetProvider><MemoryRouter><SedationCalculatorTool /></MemoryRouter></HelmetProvider>,
    );
    const weight = container.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(weight, { target: { value: "-70" } });
    expect(container.textContent).toMatch(/Enter an adult weight/);
    expect(within(container).queryByText("Stop")).toBeNull();
  });
});
