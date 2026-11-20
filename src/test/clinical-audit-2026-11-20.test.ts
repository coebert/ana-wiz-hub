import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";

const read = (path: string) => readFileSync(path, "utf8");
const pool = (topicId: string) =>
  topicReferences[topicId as keyof typeof topicReferences] ?? [];

describe("RCUK 2025 adult ALS energy statements", () => {
  it("defibrillation topic uses the 2025 first-shock floor, not the retired 120–200 J range", () => {
    const page = read("src/pages/topics/DefibrillationPacingTopic.tsx");
    expect(page).not.toContain("120–200 J");
    expect(page).not.toContain("120-200 J");
    expect(page).toContain("at least 150 J");
    expect(page).toContain("130–150 J");
    expect(page).toContain("Maximum device output, synchronised");
    expect(page).toContain("RCUK 2025 ALS");
  });

  it("cardiac arrest topic no longer mirrors the 2021 energy range or title", () => {
    const page = read("src/pages/topics/CardiacArrestPostResusTopic.tsx");
    expect(page).not.toContain("120–200 J");
    expect(page).not.toContain("2021 Resuscitation Council UK");
    expect(page).toContain("2025 Resuscitation Council UK");
    expect(page).toContain("at least 150 J");
  });

  it("antiarrhythmics cardioversion follows the 2025 rhythm-specific energies", () => {
    const page = read("src/pages/topics/AntiarrhythmicsTopic.tsx");
    expect(page).not.toContain("AF 120–200 J");
    expect(page).toContain("maximum defibrillator output");
    expect(page).toContain("atrial flutter/SVT 70–120 J");
    expect(page).toContain("VT with a pulse 120–150 J");
  });

  it("ICU arrhythmia page no longer mirrors the 2021 defibrillation ladder", () => {
    const page = read("src/pages/topics/ArrhythmiasEcgIcuTopic.tsx");
    expect(page).not.toContain("biphasic 120–150 J first shock");
    expect(page).toContain("at least 150 J");
    expect(page).not.toContain("(RCUK 2021)");
    expect(page).toContain("Peri-arrest Algorithms (RCUK 2025, March 2026 algorithms)");
  });

  it("the reference pool carries verbatim 2025 excerpts for energy and cardioversion", () => {
    const labels = pool("defibrillation-pacing").map((r) => r.label);
    expect(labels).toContain("RCUK 2025 ALS");
    expect(labels).toContain("RCUK 2025 ALS cardioversion");
    const shock = pool("defibrillation-pacing").find((r) => r.label === "RCUK 2025 ALS");
    expect(shock?.excerpt).toContain("at least 150 J");
    const cardio = pool("defibrillation-pacing").find(
      (r) => r.label === "RCUK 2025 ALS cardioversion",
    );
    expect(cardio?.excerpt).toContain("maximum defibrillator output");
    expect(cardio?.excerpt).toContain("70-120 J");
    expect(cardio?.excerpt).toContain("120-150 J");
  });
});

describe("RCUK paediatric life support 2025 energy escalation", () => {
  it("refractory VF/pVT escalates to 8 J/kg (max 360 J), not an invented 10 J/kg ceiling", () => {
    const page = read("src/pages/topics/DefibrillationPacingTopic.tsx");
    expect(page).not.toContain("never exceed 10 J/kg");
    expect(page).toContain("8 J/kg (maximum 360 J)");
    expect(page).toContain('refLabel="RCUK PALS 2025"');
  });

  it("paediatric dose tool states the escalation rather than fixed repeat energy", () => {
    const page = read("src/pages/tools/PaedDoseTool.tsx");
    expect(page).not.toContain("same energy for subsequent shocks");
    expect(page).toContain("8 J/kg (max 360 J)");
  });

  it("paediatric ICU table and WETFLAG detail keep the escalation and cardioversion distinction", () => {
    const icu = read("src/pages/topics/PaediatricIcuTopic.tsx");
    expect(icu).toContain("then up to 8 J/kg, max 360 J");
    const wetflag = read("src/components/diagrams/intensive-care/WETFLAGDiagram.tsx");
    expect(wetflag).toContain("increasing stepwise to 8 J/kg (max 360 J)");
    expect(wetflag).not.toContain("Same energy for VF/pulseless VT and synchronised cardioversion");
  });
});

describe("PUMA sustained exhaled CO₂ wording", () => {
  it("capnography diagram does not present an invented six-breath cut-off", () => {
    const diagram = read("src/components/diagrams/physics/CapnographyWaveformDiagram.tsx");
    expect(diagram).not.toContain("~6 breaths");
    expect(diagram).toContain("≥7 breaths");
    expect(diagram).toContain(">1 kPa above baseline");
  });

  it("oesophageal CO₂ is not presented as a stand-alone stopping rule", () => {
    const diagram = read("src/components/diagrams/physics/CapnographyWaveformDiagram.tsx");
    expect(diagram).not.toContain("predicts non-survival");
    expect(diagram).toContain("no single EtCO₂ value is a stand-alone stopping rule");
  });
});

describe("RCUK 2025 waveform capnography during CPR", () => {
  it("waveform CPR action no longer aims at the 2021 1.3 kPa threshold", () => {
    const page = read("src/pages/topics/CapnographyWaveformsTopic.tsx");
    expect(page).not.toContain("RCUK/ERC 2021");
    expect(page).not.toContain("Persistent ETCO₂ < 1.3 kPa after 20 minutes");
    expect(page).toContain("Do not use a low ETCO₂ value alone to decide whether to stop resuscitation");
    expect(page).toContain("≥ 3.3 kPa (25 mmHg)");
  });

  it("adult ALS subsection heading and ETCO₂ bullets are 2025-scoped", () => {
    const page = read("src/pages/topics/CardiacArrestPostResusTopic.tsx");
    expect(page).toContain("Adult ALS Algorithm — RCUK 2025");
    expect(page).not.toContain("Adult ALS Algorithm — RCUK / ERC 2021");
    expect(page).not.toContain("after 20 min of ALS predicts very poor outcome");
    expect(page).toContain("should not be interrupted on this sign alone");
    expect(page).toContain('refLabel="RCUK ALS 2025 capnography"');
  });
});

describe("superseded NICE NG51 citations", () => {
  const surfaces = [
    "src/components/topic/SepsisCriteriaEgdtTeaching.tsx",
    "src/pages/topics/HaematologyImmunityTopic.tsx",
    "src/pages/topics/PaediatricIcuTopic.tsx",
    "src/components/diagrams/pharmacology/EmpiricalSepsisChooser.tsx",
    "src/pages/topics/InfectiousDiseaseIcuTopic.tsx",
    "src/pages/topics/AntimicrobialsIcuTopic.tsx",
  ];

  it("no reviewed surface cites NG51", () => {
    for (const path of surfaces) {
      expect(read(path), path).not.toContain("NG51");
    }
  });

  it("assigns NG253 to adults, NG254 to children and keeps pregnancy on NG255", () => {
    expect(read("src/components/topic/SepsisCriteriaEgdtTeaching.tsx")).toContain("NICE NG253");
    expect(read("src/pages/topics/HaematologyImmunityTopic.tsx")).toContain("NICE NG253 Sepsis");
    expect(read("src/pages/topics/PaediatricIcuTopic.tsx")).toContain('refLabel="NICE NG254"');
    expect(read("src/pages/topics/PaediatricIcuTopic.tsx")).not.toContain('refLabel="NICE NG51"');
    const chooser = read("src/components/diagrams/pharmacology/EmpiricalSepsisChooser.tsx");
    expect(chooser).toContain("NG253 (adults), NG254 (under-16s), NG255 (pregnancy)");
  });

  it("reference pools carry the current population-specific records", () => {
    const labels = (topicId: string) => pool(topicId).map((r) => r.label);
    expect(labels("antimicrobials-icu")).toContain("NICE NG253");
    expect(labels("infectious-disease-icu")).toContain("NICE NG253");
    expect(labels("haematology-immunity")).toContain("NICE NG253 Sepsis");
    expect(labels("paediatric-icu")).toContain("NICE NG254");
    expect(labels("paediatric-icu")).not.toContain("NICE NG51");
  });
});

describe("IDSA/ESCMID 2026 S. aureus bacteraemia statements", () => {
  it("does not present a universal SAB bundle", () => {
    const page = read("src/pages/topics/InfectiousDiseaseIcuTopic.tsx");
    expect(page).not.toContain("S. aureus bacteraemia always requires echocardiography");
    expect(page).not.toContain("always echo + prolonged therapy");
    expect(page).toContain("risk-stratify rather than apply a universal bundle");
    expect(page).toContain('cites: ["IDSA/ESCMID SAB 2026"]');
  });

  it("separates adult and paediatric echo assessment in the record", () => {
    const record = pool("infectious-disease-icu").find(
      (r) => r.label === "IDSA/ESCMID SAB 2026",
    );
    expect(record?.excerpt).toContain("routinely performing TTE in all adults with SAB");
    expect(record?.excerpt).toContain("children with SAB who have structural heart disease");
    expect(record?.url).toContain("idsociety.org/practice-guideline/staphylococcus-aureus-bacteremia");
  });
});

describe("vancomycin AUC and procalcitonin attribution", () => {
  it("scopes AUC guidance to serious MRSA infection, not universal ICU dosing", () => {
    const page = read("src/pages/topics/AntimicrobialsIcuTopic.tsx");
    expect(page).not.toContain("are essential in ICU");
    expect(page).toContain("serious MRSA infection");
    expect(page).toContain('cites: ["ASHP/IDSA Vancomycin 2020"]');
    const record = pool("antimicrobials-icu").find(
      (r) => r.label === "ASHP/IDSA Vancomycin 2020",
    );
    expect(record?.excerpt).toContain("400-600");
    expect(record?.url).toContain("doi.org/10.1093/ajhp/zxaa036");
  });

  it("separates procalcitonin for starting from stopping antibiotics", () => {
    const page = read("src/pages/topics/AntimicrobialsIcuTopic.tsx");
    expect(page).toContain("clinical evaluation alone over procalcitonin");
    expect(page).toContain("decide when to stop");
    expect(page).toContain('cites: ["SSC 2026 procalcitonin"]');
    const record = pool("antimicrobials-icu").find(
      (r) => r.label === "SSC 2026 procalcitonin",
    );
    expect(record?.excerpt).toContain("adequate source control");
  });
});
