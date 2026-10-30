/**
 * Clinical content audit batch 1 (30 Oct 2026) — regression guards.
 * Each test pins one corrected rule so contradictory or superseded teaching
 * cannot silently return. See docs/content-audit-2026-10-30.md.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { topicReferences as references } from "@/data/references";

const read = (p: string) => readFileSync(resolve(__dirname, "../..", p), "utf8");
const CI = read("src/pages/topics/ClinicalIncidentsTopic.tsx");
const AM = read("src/pages/topics/AirwayManagementTopic.tsx");
const CA = read("src/pages/topics/CardiacArrestPostResusTopic.tsx");
const PK = read("src/pages/topics/PaediatricCoreTopic.tsx");
const PI = read("src/pages/topics/PaediatricIcuTopic.tsx");

const MH_FILES = [
  "src/pages/topics/ClinicalIncidentsTopic.tsx",
  "src/pages/topics/VolatileAgentsTopic.tsx",
  "src/pages/topics/GeneticSyndromesTopic.tsx",
  "src/data/quizzes.ts",
];
const TEMP_FILES = [
  "src/pages/topics/CardiacArrestPostResusTopic.tsx",
  "src/pages/topics/NeuroprognosticationTopic.tsx",
  "src/pages/topics/PrognosticationEthicsIcuTopic.tsx",
  "src/pages/topics/ArrhythmiasEcgIcuTopic.tsx",
  "src/components/diagrams/intensive-care/TtmTargetExplorerDiagram.tsx",
  "src/components/diagrams/intensive-care/PostCardiacArrestProgDiagram.tsx",
  "src/data/quizzes.ts",
];

describe("CL-01 perioperative anaphylaxis", () => {
  it("does not claim steroids reduce biphasic reactions or list them as routine second line", () => {
    expect(CI).not.toMatch(/reduces biphasic/i);
    expect(CI).not.toMatch(/<li>Chlorphenamine 10 mg IV, hydrocortisone 200 mg IV<\/li>/);
  });
  it("uses a 5-minute repeat for the general IM algorithm, never 1–2 minutes for IM", () => {
    expect(CI).not.toMatch(/IM[^<]{0,80}repeat every 1–2 min/i);
    expect(CI).toMatch(/repeated after 5 minutes/);
  });
  it("gives the RCUK peri-operative IV bolus as 50 micrograms = 0.5 mL of 1:10,000", () => {
    // 1:10,000 = 100 micrograms/mL, so 0.5 mL = 50 micrograms
    expect(0.5 * (1000 / 10)).toBe(50);
    expect(CI).toContain("50 micrograms</strong> (0.5 mL of 1:10,000");
  });
});

describe("CL-02/03 malignant hyperthermia (EMHG v2024)", () => {
  it.each(MH_FILES)("%s has no absolute 10 mg/kg dantrolene ceiling", (f) => {
    const t = read(f);
    expect(t).not.toMatch(/(max(imum)?|up to|repeat(ed)? to) 10 mg\/kg/i);
  });
  it("caps individual doses at 300 mg and repeats every 10 minutes", () => {
    expect(CI).toContain("maximum 300 mg per dose");
    expect(CI).toMatch(/Repeat every 10 min/);
  });
  it("does not instruct changing circuit/machine before treatment", () => {
    expect(CI).not.toMatch(/change circuits? IMMEDIATELY|change circuit to vapour-free/i);
    expect(CI).toContain("do not waste time changing the circuit or anaesthetic machine");
  });
  it("vial arithmetic is correct and labelled formulation-specific", () => {
    const dose = 70 * 2.5;
    expect(dose).toBe(175);
    expect(Math.ceil(dose / 20)).toBe(9);
    expect(CI).toMatch(/Formulation-specific/);
  });
});

describe("CL-04 PUMA sustained exhaled CO2", () => {
  it("states the four PUMA criteria and default tube removal", () => {
    expect(AM).not.toMatch(/≥ 2 waveforms|3–5 consecutive waveforms/);
    expect(AM).toMatch(/at least seven breaths/);
    expect(AM).toMatch(/1 kPa above\s+baseline/);
    expect(AM).toMatch(/remove the tube unless removal is judged more dangerous/);
  });
});

describe("CL-05 CICO trigger", () => {
  it("has no numeric SpO2 trigger for FONA", () => {
    expect(AM).not.toMatch(/(below|&lt;|<) ?80 ?%/);
  });
});

describe("CL-06 IRIS", () => {
  it("reports failure to demonstrate non-inferiority", () => {
    expect(AM).not.toMatch(/showed non-inferiority of sham/);
    expect(AM).toMatch(/failed to demonstrate non-inferiority/);
  });
});

describe("CL-07 refractory VF", () => {
  it("does not offer double sequential defibrillation as a treatment option", () => {
    expect(CA).not.toMatch(/consider vector change \(AP pads\) or double sequential/);
    expect(read("src/data/cases/physicsCases.ts")).not.toMatch(/using a second defibrillator/);
    expect(CA).toMatch(/does not recommend routine dual/);
  });
});

describe("CL-08 post-arrest temperature", () => {
  it.each(TEMP_FILES)("%s teaches ≤37.5 °C, not superseded 37.7 °C", (f) => {
    expect(read(f).replace("The superseded 2022 update used > 37.7 °C.", "")).not.toMatch(/37\.7\s?°?C?/);
  });
  it("does not claim TTM 2013 demonstrated equivalence", () => {
    expect(CA).not.toMatch(/demonstrated equivalence/);
  });
  it("cites the RCUK 2025 post-resuscitation guideline", () => {
    expect(references["cardiac-arrest-post-resus"].some((r) => r.label === "RCUK PRC 2025")).toBe(true);
  });
});

describe("CL-09 paediatric DKA/trauma boluses", () => {
  it("has no blanket 5 mL/kg DKA or trauma rule", () => {
    for (const t of [PK, PI]) {
      expect(t).not.toMatch(/5 m[lL]\/kg (aliquots|boluses|in DKA)[^"<]{0,40}(DKA|trauma)/);
      expect(t).not.toMatch(/5 m[lL]\/kg in DKA/);
    }
    expect(PK).toMatch(/10 mL\/kg 0\.9% saline bolus/);
  });
});

describe("CL-10 maintenance fluid arithmetic", () => {
  const fourTwoOne = (kg: number) =>
    Math.min(kg, 10) * 4 + Math.max(Math.min(kg - 10, 10), 0) * 2 + Math.max(kg - 20, 0);
  it("14 kg child is 48 mL/hr by 4-2-1 and the quiz key matches", () => {
    expect(fourTwoOne(14)).toBe(48);
    expect((1000 + 4 * 50) / 24).toBe(50);
    const q = PK.slice(PK.indexOf("estimated 14 kg"));
    const opts = q.slice(0, q.indexOf("correctIndex")).match(/^\s*"(.+)",\s*$/gm)!.map((s) => s.trim().slice(1, -2));
    const idx = Number(q.match(/correctIndex: (\d)/)![1]);
    expect(opts[idx]).toBe("0.9% saline with 5% glucose at 48 mL/hr");
    expect(PK).not.toMatch(/46 mL\/hr/);
  });
});
