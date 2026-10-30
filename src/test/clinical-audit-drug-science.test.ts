import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
const read = (path: string) => readFileSync(path, "utf8");
it("D06 and D07 repeated dosing no longer contradict unit/rate arithmetic", () => {
  const data = read("src/data/icuDrugDoses.ts");
  expect(data).toContain("0.3–2 milliunits/kg/min");
  expect(data).not.toContain("0.18–1.2 milliunits/kg/min");
  expect(data).not.toContain("0.5 mmol/kg over 1–2 h, maximum 0.2 mmol/kg/h");
  expect(data).toContain("requires at least 2.5 hours");
});
it("D70 repeated sugammadex teaching does not use TOF ratio for T2 dosing", () => {
  const topic = read("src/pages/topics/NeuromuscularTopic.tsx");
  expect(topic).not.toMatch(/2 mg\/kg if TOFR/);
  expect(topic).toContain("2 mg/kg at reappearance of T2");
  expect(read("src/pages/topics/SuxVsRocComparisonTopic.tsx")).not.toContain("— TOF count 1–2, no T2 yet");
  expect(read("src/data/references.ts")).not.toContain("sugammadex 2 mg/kg at TOFR ≥ 0.2");
});
it("D71 no block list grants clearance on therapeutic anticoagulation", () => {
  expect(read("src/pages/topics/RegionalAnaesthesiaTopic.tsx")).not.toContain("consequence is a bruise");
  expect(read("src/pages/topics/RegionalAnaesthesiaTopic.tsx")).not.toContain("may reasonably proceed on therapeutic anticoagulation");
});
it("D72 burn timing does not imply safety until day five", () => {
  const topic = read("src/pages/topics/BurnsIcuTopic.tsx");
  expect(topic).not.toContain("risk emerges from day 5");
  expect(topic).not.toContain("contra-indicated from day 5");
  expect(topic).toContain("after the initial 24 h");
});
it("D74 chemistry does not guarantee zero placental transfer or absent amide allergy", () => {
  const chemistry = read("src/pages/topics/OrganicChemistryTopic.tsx");
  expect(chemistry).not.toContain("allergy risk that amides lack");
  expect(chemistry).not.toContain("cannot cross BBB or placenta");
  expect(read("src/components/diagrams/chemistry/AmineComparisonDiagram.tsx")).not.toContain("No — foetus protected");
});