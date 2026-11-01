import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { icuDrugDoseGroups } from "@/data/icuDrugDoses";
import { topicReferences } from "@/data/references";
import { operations } from "@/data/operativeSteps";
import { HYPERKALAEMIA_CALCIUM_TEACHING, HYPERKALAEMIA_TEACHING } from "@/lib/clinical-audit-rules";
const read = (path: string) => readFileSync(path, "utf8");
const dose = (drug: string) => icuDrugDoseGroups.flatMap(group => group.drugs).find(item => item.drug === drug);
describe("consolidated source-scoped clinical residuals", () => {
  it("routine 2/4 and adult immediate 16 are distinct; children are not given immediate 16", () => {
    expect(dose("Rocuronium")?.notes).toContain("2 mg/kg at T2; 4 mg/kg at PTC 1–2");
    expect(dose("Rocuronium")?.notes).toContain("about 3 minutes after rocuronium 1.2 mg/kg");
    expect(dose("Rocuronium")?.paediatricNotes).toContain("Immediate reversal has not been investigated in paediatrics");
  });
  it("distinguishes missed oral dose from seven-day non-oral additional method", () => {
    expect(dose("Sugammadex")?.notes).toMatch(/oral contraceptive missed-dose advice; for non-oral hormonal contraception add a non-hormonal method for 7 days/);
    const source = read("src/pages/topics/SuxVsRocComparisonTopic.tsx");
    expect(source).not.toContain("inactivates hormonal contraceptives");
    expect(source).toContain("non-oral hormonal users add non-hormonal contraception for 7 days");
  });
  it("count four is not T2 or TOFR; reversal cannot guarantee airway rescue", () => {
    const comparison = read("src/pages/topics/SuxVsRocComparisonTopic.tsx");
    expect(comparison).toContain("Four twitches are TOF count 4, not T2");
    expect(comparison).toContain("0.4 to <0.9");
    expect(comparison).toContain("does not guarantee rescue after failed intubation");
    const topic = read("src/pages/topics/NeuromuscularTopic.tsx");
    expect(topic).toContain("T2 is the second twitch, not a TOF ratio");
    expect(topic).not.toContain("complete reversal within ~2 min");
    expect(topic).not.toContain("rebleed risk after 24 h");
  });
  it("ASA metadata identifies the real 2023 NMB guideline, not NELA", () => {
    const reference = topicReferences.neuromuscular.find(ref => ref.label === "ASA 2023 NMB");
    expect(reference?.url).toBe("https://doi.org/10.1097/ALN.0000000000004379");
    expect(reference?.pmid).toBe("36520073");
    expect(topicReferences["suxamethonium-vs-rocuronium"].find(ref => ref.label === "ASA 2023 NMB")).toBe(reference);
    for (const file of ["src/data/references.ts", "src/data/cases/physiologyCases.ts", "src/data/cases/pharmacologyCases.ts", "src/pages/topics/NeuromuscularTopic.tsx"]) {
      expect(read(file)).not.toContain("anae.16114"); expect(read(file)).not.toContain("Assoc Anaesth 2023");
    }
  });
  it("NAC licensed and locally adopted SNAP courses stay separate and severe reactions pause", () => {
    expect(dose("N-acetylcysteine")?.dose).toContain("150 mg/kg over 1 h, 50 mg/kg over 4 h, then 100 mg/kg over 16 h");
    expect(dose("N-acetylcysteine")?.dose).toContain("separate 12-hour regimen (100 mg/kg over 2 h, then 200 mg/kg over 10 h)");
    expect(dose("N-acetylcysteine")?.notes).toContain("pause NAC");
  });
  it("renal copies reuse the calcium distinctions without losing severe-K thresholds", () => {
    expect(HYPERKALAEMIA_TEACHING.startsWith(HYPERKALAEMIA_CALCIUM_TEACHING)).toBe(true);
    expect(HYPERKALAEMIA_CALCIUM_TEACHING).toContain("over 5 minutes is the equivalent-calcium alternative, preferred in peri-arrest");
    expect(HYPERKALAEMIA_CALCIUM_TEACHING).toContain("During CPR for hyperkalaemic cardiac arrest, calcium chloride 10 mL 10% is given as a bolus");
    expect(HYPERKALAEMIA_CALCIUM_TEACHING).toContain("K ≥6.5 mmol/L requires urgent potassium-lowering treatment even without ECG changes");
    expect(read("src/pages/topics/RenalDiseaseTopic.tsx").match(/\{HYPERKALAEMIA_CALCIUM_TEACHING\}/g)).toHaveLength(2);
  });
  it.each(operations.filter(op => op.diagram))("operation $id retains nonempty resolvable sources", operation => {
    expect(operation.sources?.length, operation.id).toBeGreaterThan(0);
    for (const label of operation.sources ?? []) expect(topicReferences["operative-steps"].some(ref => ref.label === label), `${operation.id}: ${label}`).toBe(true);
  });
});