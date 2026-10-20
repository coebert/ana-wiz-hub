import { describe, expect, it } from "vitest";
import { operations, searchOperations, specialties } from "./operativeSteps";
import { topicReferences } from "./references";

describe("operations library", () => {
  it("finds an operation by alias and by a step-level hazard", () => {
    expect(searchOperations("CEA").map((o) => o.id)).toContain("carotid-endarterectomy");
    expect(searchOperations("cement").map((o) => o.id)).toContain("hip-hemiarthroplasty");
  });

  it("filters by specialty and requires every search word", () => {
    const vascular = searchOperations("", "Vascular");
    expect(vascular.length).toBe(9);
    expect(vascular.every((o) => o.specialty === "Vascular")).toBe(true);
    expect(searchOperations("carotid tourniquet")).toHaveLength(0);
  });

  it("only cites sources that exist in the reference list", () => {
    const labels = new Set((topicReferences["operative-steps"] ?? []).map((r) => r.label));
    for (const op of operations) for (const s of op.sources ?? []) expect(labels.has(s), `${op.id}: ${s}`).toBe(true);
  });

  it("references every operation", () => {
    for (const op of operations) expect(op.sources?.length ?? 0, op.id).toBeGreaterThan(0);
  });

  it("assigns every operation to a listed specialty", () => {
    for (const op of operations) expect(specialties, op.id).toContain(op.specialty);
  });

  it("has unique ids", () => {
    expect(new Set(operations.map((o) => o.id)).size).toBe(operations.length);
  });
});
