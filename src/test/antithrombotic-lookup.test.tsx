import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { AntithromboticGuidelineLookup } from "@/components/diagrams/clinical/AntithromboticGuidelineLookup";

afterEach(cleanup);
describe("antithrombotic lookups never generate clinical clearance", () => {
  it.each([false, true])("has no clearance or timing algorithm, restart=%s", restart => {
    render(<AntithromboticGuidelineLookup restart={restart} />);
    const drug = screen.getByRole("combobox", { name: "Antiplatelet / anticoagulant" });
    const procedure = screen.getByRole("combobox", { name: "Intended procedure" });
    for (const agent of ["Thrombolytic", "Apixaban", "Clopidogrel", "None"]) {
      for (const technique of ["Single-shot spinal", "Neuraxial catheter removal", "Superficial block at a compressible site"]) {
        fireEvent.change(drug, { target: { value: agent } });
        fireEvent.change(procedure, { target: { value: technique } });
        expect(screen.getByRole("status").textContent).not.toMatch(/PROCEED|criteria satisfied|safe to restart|remove catheter at|restart at/i);
      }
    }
    screen.getAllByRole("checkbox").forEach(c => fireEvent.click(c));
    expect(screen.queryByRole("spinbutton")).toBeNull();
    expect(screen.getByRole("status").textContent).not.toMatch(/PROCEED|safe to restart|criteria satisfied/i);
  });
});