import { describe, it, expect } from "vitest";
import { operations } from "@/data/operativeSteps";
import { topicReferences } from "@/data/references";

const ids = ["orchidopexy", "hypospadias-repair", "ureteroscopy-laser", "pcnl"];
describe("paediatric and urology expansion", () => {
  it.each(ids)("%s has five staged steps, critical moments, a diagram and resolvable sources", id => {
    const op = operations.find(o => o.id === id)!;
    expect(op).toBeDefined();
    expect(op.steps).toHaveLength(5);
    for (const s of op.steps) expect(s.anaesthetic).toBeTruthy();
    expect(op.criticalMoments.length).toBeGreaterThanOrEqual(3);
    expect(op.diagram).toBeTruthy();
    expect(op.sources!.length).toBeGreaterThanOrEqual(2);
    for (const label of op.sources!) expect(topicReferences["operative-steps"].some(r => r.label === label)).toBe(true);
  });
  it("assigns the correct specialties", () => {
    expect(operations.find(o => o.id === "orchidopexy")!.specialty).toBe("Paediatric");
    expect(operations.find(o => o.id === "pcnl")!.specialty).toBe("Urology");
  });
});
