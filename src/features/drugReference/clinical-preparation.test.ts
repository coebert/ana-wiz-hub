import { describe, expect, it } from "vitest";
import { drugDilutions, calculateRate } from "./dilutions";
describe("D23 named propofol 1% calculator recipe", () => {
  it("uses 10 mg/mL = 10000 micrograms/mL, not doubled concentration", () => {
    const propofol = drugDilutions.find((d) => d.drug === "Propofol 1%");
    expect(propofol).toBeDefined();
    if (!propofol) throw new Error("Missing propofol recipe");
    expect(propofol.concentrationPerMl).toBe(10000);
    expect(calculateRate(propofol, 1, 70).mlPerHour).toBe(7);
  });
});