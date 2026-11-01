import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { topicReferences } from "@/data/references";
import { clinicalIncidentsQuestions, cardiacArrestPostResusQuestions, airwayManagementQuestions } from "@/data/quizzes";
import { HYPERKALAEMIA_TEACHING } from "@/lib/clinical-audit-rules";
import DASAlgorithmDiagram from "@/components/diagrams/clinical/DASAlgorithmDiagram";
import { ResusAntimicrobialTeaching, ResusCirculationTeaching, ResusRecognitionTeaching } from "@/components/topic/SepsisResuscitationTeaching";
import { EclampsiaHypertensionTeaching } from "@/components/topic/IcuEmergencyTeaching";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
const source = (name: string) => readFileSync(name, "utf8");
const text = (node: React.ReactNode) => renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
const ref = (id: string, label: string) => topicReferences[id]?.find((r) => r.label === label);

describe("C3 clinical pathways and source mappings", () => {
  it("CL-54 distinguishes severe potassium treatment from calcium and CPR rate", () => {
    expect(HYPERKALAEMIA_TEACHING).toContain("K ≥6.5 mmol/L");
    expect(HYPERKALAEMIA_TEACHING).toContain("even without ECG changes");
    expect(HYPERKALAEMIA_TEACHING).toContain("over 5 minutes");
    expect(HYPERKALAEMIA_TEACHING).toContain("During CPR");
    expect(HYPERKALAEMIA_TEACHING).toContain("given as a bolus");
  });
  it("CL-19 first-hour saline cannot await classification or skip interim sodium checks", () => {
    const s = source("src/pages/topics/SolutionsConcentrationTopic.tsx");
    expect(s).toContain("150 mL of 3% NaCl over 20 minutes");
    expect(s).toContain("check sodium after 20 minutes and between repeat boluses");
    expect(s).toContain("up to two further times");
    expect(s).toContain("must not await cause, volume-status or urine classification");
    expect(ref("solutions-concentration", "Society for Endocrinology Hyponatraemia 2016")?.url).toContain("PMC5314809");
  });
  it("CL-20 rendered adult pathway uses video first-line and ceilings not quotas", () => {
    render(<DASAlgorithmDiagram />);
    expect(screen.getByText("DAS Difficult Airway Algorithm (2025, non-obstetric adults)")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "2 1st intubation attempt" }));
    expect(screen.getByText(/Videolaryngoscopy first-line whenever possible/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Plan B" }));
    fireEvent.click(screen.getByRole("button", { name: "3 If surgery is essential" }));
    expect(screen.getByText(/under flexible endoscopic guidance; never blind/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Plan D" }));
    fireEvent.click(screen.getByRole("button", { name: "2 Scalpel cricothyroidotomy" }));
    expect(screen.getByText(/default to a vertical midline skin incision/)).toBeTruthy();
    cleanup();
    const q = airwayManagementQuestions.find((q) => q.question.includes("attempt ceiling"));
    expect(q?.options[q.correctIndex]).toBe("3+1");
    expect(q?.explanation).toContain("not a quota");
  });
  it("CL-20 all current airway copies distinguish unassessed anatomy and guided SAD intubation", () => {
    const s = source("src/pages/topics/AirwayManagementTopic.tsx");
    expect(s).toContain("two attempts as the default limit");
    expect(s).toContain("third attempt only by an experienced anaesthetist where appropriate");
    expect(s).toContain("under flexible endoscopic guidance");
    expect(s).not.toContain("Plan B (videolaryngoscope)");
    for (const file of ["src/pages/topics/AirwayManagementTopic.tsx", "src/components/diagrams/clinical/DASAlgorithmDiagram.tsx", "src/components/diagrams/clinical/CICODrillAnimation.tsx"])
      expect(source(file)).toMatch(/not explicitly assessed|unassessed/);
    expect(ref("airway-management", "DAS 2025")?.url).toContain("2025.10.006");
  });
  it("CL-21/22 rendered lessons preserve antibiotic certainty and conditional fluid", () => {
    const s = text(<ResusAntimicrobialTeaching />);
    expect(s).toContain("probable/definite sepsis without shock");
    expect(s).toContain("Only possible sepsis without shock");
    expect(s).toContain("up to 3 h");
    const fluids = text(<ResusCirculationTeaching />);
    expect(fluids).toContain("30 mL/kg");
    expect(fluids).toContain("not a mandatory fixed bolus");
    expect(fluids).toContain("age ≥65");
    expect(fluids).toContain("60–65");
    expect(ref("sepsis-resuscitation", "SSC 2026 fluids")?.excerpt).toContain("first 3 hr");
  });
  it("ROOT-19 rendered qSOFA teaching cannot exclude sepsis", () => {
    const s = text(<ResusRecognitionTeaching />);
    expect(s).toContain("limited sensitivity");
    expect(s).toContain("low score does not exclude sepsis");
    const faq = Object.values(extractFaqsByPath()).flat().find(([q]) => q === "What is the Sepsis-3 definition of sepsis and septic shock?");
    expect(faq?.[1]).toContain("not a diagnostic criterion or a sole screening tool");
    expect(ref("sepsis", "SSC 2026 qSOFA")?.url).toContain("2026");
  });
  it("CL-17/23/24 transfusion exceptions, windows and trial scope persist", () => {
    const s = source("src/pages/topics/TransfusionCoagulationTopic.tsx");
    expect(s).not.toContain("do NOT transfuse platelets");
    expect(s).toContain("life-threatening haemorrhage may justify platelets");
    expect(s).toContain("up to 12 h after transfusion");
    expect(s).toContain("up to 24 h");
    expect(s).toContain("FIB-PPH (2015)");
    expect(s).toContain("largely normofibrinogenaemic PPH");
    for (const label of ["BSH Platelets 2021", "MHRA TACO 2024", "SHOT TACO 2025", "FIB-PPH 2015"])
      expect(ref("transfusion-coagulation", label)?.url).toBeTruthy();
  });
  it("CL-28 quiz selects antibiotics using the UK 199-agent denominator", () => {
    const q = clinicalIncidentsQuestions.find((q) => q.question.includes("UK NAP6"));
    expect(q?.correctIndex).toBe(1);
    expect(q?.options[q.correctIndex]).toBe("Antibiotics");
    expect(q?.explanation).toContain("199 identified culprit agents");
    expect(ref("clinical-incidents", "NAP6 2018 (Triggers)")?.excerpt).toContain("antibiotics (94)");
  });
  it("CL-01/29 perioperative IV and general IM settings remain separate", () => {
    const q = clinicalIncidentsQuestions.find((q) => q.question.includes("fully monitored perioperative"));
    expect(q?.options[q.correctIndex]).toContain("50 micrograms");
    expect(q?.explanation).toContain("IM 500 micrograms");
    const s = source("src/pages/topics/BronchospasticFailureTopic.tsx");
    expect(s).toContain("not routine anaphylaxis treatment");
    expect(s).toContain("residual skin symptoms");
  });
  it("CL-30 SSEP acquisition distinguishes NMBA artefact benefit from motor-exam confounding", () => {
    const q = cardiacArrestPostResusQuestions.find((q) => q.question.includes("particularly useful"));
    expect(q?.explanation).not.toContain("off NMBA");
    expect(q?.explanation).toContain("reduce muscle artefact");
    expect(q?.explanation).toContain("clinical motor examination");
    expect(ref("cardiac-arrest-post-resus", "RCUK PRC 2025 SSEP")?.excerpt).toContain("neuromuscular blocking drug");
  });
  it("CL-31 unconscious scope distinguishes ≥72 h algorithm from 36–72 h narrative", () => {
    for (const file of ["src/components/diagrams/intensive-care/TtmTargetExplorerDiagram.tsx", "src/pages/topics/PrognosticationEthicsIcuTopic.tsx", "src/pages/topics/ArrhythmiasEcgIcuTopic.tsx"]) {
      const s = source(file);
      expect(s).toMatch(/unconscious|comatose/);
      expect(s).toContain("36–72 h");
      expect(s).toContain("2026");
      expect(s).not.toContain("Mandatory baseline for all post-ROSC");
    }
    expect(ref("arrhythmias-ecg-icu", "RCUK PRC Algorithm March 2026")?.excerpt).toContain("at least 72 h");
  });
  it("CL-32 rates label the trial arms without claiming equivalence", () => {
    const faq = Object.values(extractFaqsByPath()).flat().find(([q]) => q === "Is cricoid pressure still recommended in RSI?");
    expect(faq?.[1]).toContain("10/1735 (0.6%) with cricoid pressure");
    expect(faq?.[1]).toContain("9/1736 (0.5%) with sham");
    expect(faq?.[1]).toContain("No significant difference is not proof of equivalence");
  });
  it("CL-33/34 paediatric copies exclude bolus potassium and above-fistula placement", () => {
    const s = source("src/pages/topics/PaediatricIcuTopic.tsx");
    expect(s).not.toContain("bolus only if shocked");
    expect(s).not.toContain("every rehydration bag from the outset");
    expect(s).toContain("excluding initial IV boluses");
    expect(s).toContain("distal to the fistula when feasible");
    expect(s).not.toContain("tube tip above the fistula");
    expect(ref("paediatric-icu", "NICE NG18 potassium")?.excerpt).toContain("except the initial intravenous boluses");
    expect(ref("paediatric-icu", "BJA Educ TEF 2025")?.url).toContain("PMC12146005");
  });
  it("CL-85 rendered hydralazine consideration is antenatal first-dose only", () => {
    const s = text(<EclampsiaHypertensionTeaching />);
    expect(s).toContain("up to 500 mL");
    expect(s).toContain("first IV hydralazine dose in the antenatal period");
    expect(s).toContain("not a compulsory preload");
    expect(ref("icu-eclampsia", "NICE NG133 1.8.8")?.excerpt).toContain("first dose");
  });
});