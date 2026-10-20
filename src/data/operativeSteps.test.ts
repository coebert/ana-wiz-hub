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
    expect(vascular.length).toBe(11);
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

  it("includes the six new procedures in their clinical specialties", () => {
    const expected = [
      ["carotid-artery-stenting", "Vascular"], ["femoral-endarterectomy", "Vascular"],
      ["kidney-transplantation", "Urology"], ["inguinal-hernia-repair", "General & GI"],
      ["laparoscopic-appendicectomy", "General & GI"], ["transsphenoidal-pituitary-surgery", "Neurosurgery"],
    ];
    for (const [id, specialty] of expected) {
      const op = operations.find((entry) => entry.id === id);
      expect(op?.specialty, id).toBe(specialty);
      expect(op?.diagram, id).toBeTruthy();
      expect(op?.steps.length ?? 0, id).toBeGreaterThanOrEqual(4);
      expect((op?.sources ?? []).some((label) => topicReferences["operative-steps"].find((ref) => ref.label === label)?.excerpt), id).toBe(true);
    }
  });

  it("finds new procedures by aliases and perioperative hazards", () => {
    expect(searchOperations("CAS").map((o) => o.id)).toContain("carotid-artery-stenting");
    expect(searchOperations("renal transplant").map((o) => o.id)).toContain("kidney-transplantation");
    expect(searchOperations("CSF leak", "Neurosurgery").map((o) => o.id)).toContain("transsphenoidal-pituitary-surgery");
  });

  it("assigns every operation to a listed specialty", () => {
    for (const op of operations) expect(specialties, op.id).toContain(op.specialty);
  });

  it("adds paediatric and maxillofacial specialties with referenced, diagrammed operations", () => {
    for (const [id, sp] of [["pyloromyotomy", "Paediatric"], ["mandibular-fracture-orif", "Oral & Maxillofacial"], ["burr-hole-csdh", "Neurosurgery"], ["shoulder-arthroscopy", "Orthopaedic & Spine"]]) {
      const op = operations.find((o) => o.id === id);
      expect(op?.specialty, id).toBe(sp);
      expect(op?.diagram, id).toBeTruthy();
    }
    expect(searchOperations("beach chair").map((o) => o.id)).toContain("shoulder-arthroscopy");
  });

  it("has unique ids", () => {
    expect(new Set(operations.map((o) => o.id)).size).toBe(operations.length);
  });
});
