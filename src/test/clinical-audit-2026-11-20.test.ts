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
