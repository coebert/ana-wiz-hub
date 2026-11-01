import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import PaediatricIcuTopic, { PAEDIATRIC_BRADYCARDIA_2025_SUMMARY } from "@/pages/topics/PaediatricIcuTopic";
import TransfusionCoagulationTopic from "@/pages/topics/TransfusionCoagulationTopic";
import { TransfusionHaemorrhageTeaching, PROPPR_COMPONENTS, PROPPR_OUTCOMES, TRANSFUSION_CALCIUM, TRAUMA_PRESSURE, HEAD_INJURY_TXA } from "@/components/topic/TransfusionHaemorrhageTeaching";
import { paediatricEmergenciesQuestions, transfusionCoagulationQuestions } from "@/data/quizzes";
import { QuizSection } from "@/components/quiz/QuizSection";
import { topicReferences } from "@/data/references";
import { referenceLabels } from "../../scripts/lib/reference-labels";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: null }) }));
afterEach(cleanup);
const source = (file: string) => readFileSync(file, "utf8");

describe("CL87 RCUK 2025 scoped paediatric bradycardia", () => {
  it("requires HR below 60, poor perfusion despite respiratory support, even with a pulse", () => {
    const points = PaediatricIcuTopic().props.keyPoints;
    expect(points.filter((p: {text: string}) => p.text === PAEDIATRIC_BRADYCARDIA_2025_SUMMARY)).toHaveLength(2);
    for (const condition of ["HR <60/min", "poor perfusion persists despite adequate respiratory support", "even if a pulse is detectable", "commence chest compressions"]) expect(PAEDIATRIC_BRADYCARDIA_2025_SUMMARY).toContain(condition);
  });
  it("scopes adrenaline 10 micrograms/kg max 1 mg to PALS and selective atropine 20 micrograms/kg max 0.5 mg", () => {
    for (const rule of ["adrenaline 10 micrograms/kg IV/IO (maximum 1 mg)", "outside that pathway", "IV atropine 20 micrograms/kg (maximum 0.5 mg)", "increased vagal tone or selected cardiac conduction disease", "do not use it routinely before intubation"]) expect(PAEDIATRIC_BRADYCARDIA_2025_SUMMARY).toContain(rule);
    const page = source("src/pages/topics/PaediatricIcuTopic.tsx");
    expect(page).not.toMatch(/Minimum 100 mcg|minimum 100 micrograms|min 100 mcg|atropine before sux|treat with atropine/);
    expect(page).toContain("Monitored circulatory-failure specialist titration");
  });
  it("actual selected bradycardia quiz answer preserves ventilation first and conditional compressions", () => {
    const question = paediatricEmergenciesQuestions.find(q => q.question.includes("heart rate of 45/min"));
    expect(question).toBeDefined();
    if (!question) throw new Error("Missing bradycardia question");
    render(<MemoryRouter><QuizSection questions={[question]} /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: /Oxygen and effective assisted ventilation/ }));
    fireEvent.click(screen.getByRole("button", { name: "Submit Answer" }));
    expect(screen.getByText(question.explanation)).toBeInTheDocument();
    expect(question.explanation).toContain("despite adequate respiratory support");
    expect(question.explanation).toContain("maximum 0.5 mg");
  });
  it("FEAST summary retains population, 48-hour harm and current UK reassessment rather than dismissal", () => {
    const point = PaediatricIcuTopic().props.keyPoints.find((p: {text: string}) => p.text.startsWith("FEAST (2011)"));
    for (const fact of ["48-hour mortality", "severe febrile illness and impaired perfusion", "Uganda, Kenya and Tanzania", "condition-specific pathways", "overload surveillance"]) expect(point.text).toContain(fact);
    expect(point.cites).toEqual(["FEAST 2011", "RCUK PALS 2025 fluids"]);
    expect(source("src/pages/topics/PaediatricIcuTopic.tsx")).not.toContain("does NOT change UK practice");
  });
});

describe("CL88 trial-specific haemorrhage evidence", () => {
  it("distinguishes adult platelet dose from platelet-equivalent units and trauma outcomes", () => {
    for (const fact of ["6 plasma units", "1 adult platelet dose", "6 whole-blood-derived platelet units", "6 RBC units", "plasma:platelet-equivalents:RBC"]) expect(PROPPR_COMPONENTS).toContain(fact);
    for (const fact of ["86.1% vs 78.1%", "9.2% vs 14.6%", "24 hours (12.7% vs 17.0%)", "30 days (22.4% vs 26.1%)", "not statistically significant", "time to haemostasis"]) expect(PROPPR_OUTCOMES).toContain(fact);
  });
  it("actual PROPPR quiz selects more haemostasis, not faster haemostasis or established mortality benefit", () => {
    const question = transfusionCoagulationQuestions.find(q => q.question.includes("PROPPR"));
    if (!question) throw new Error("Missing PROPPR question");
    render(<MemoryRouter><QuizSection questions={[question]} /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: /More achieved haemostasis and fewer died/ }));
    fireEvent.click(screen.getByRole("button", { name: "Submit Answer" }));
    expect(screen.getByText(question.explanation)).toBeInTheDocument();
    expect(question.explanation).toContain("not statistically significant");
    expect(question.explanation).not.toContain("faster than");
  });
  it("calcium is frequent measured normal-range replacement, not a universal pack prescription", () => {
    expect(TRANSFUSION_CALCIUM).toContain("1.1–1.3 mmol/L");
    expect(TRANSFUSION_CALCIUM).toContain("laboratory and pH context");
    expect(TRANSFUSION_CALCIUM).toContain("not a national mandate or a substitute for measurement");
    const page = source("src/pages/topics/TransfusionCoagulationTopic.tsx");
    expect(page).not.toContain("per 4 units PRBC");
    expect(page).not.toContain("most dangerous metabolic complication");
  });
  it("80–90 target excludes brain/spinal injury and is not every-haemorrhage teaching", () => {
    expect(TRAUMA_PRESSURE).toContain("SBP 80–90 mmHg");
    expect(TRAUMA_PRESSURE).toContain("adult traumatic haemorrhage without clinical brain or spinal cord injury");
    expect(TRAUMA_PRESSURE).toContain("cerebral-perfusion protection");
  });
  it("selected adult head-injury TXA is NICE 2 g within 2 hours, not a universal CRASH-3 regimen", () => {
    for (const condition of ["GCS 12 or less", "no suspected active extracranial bleeding", "consider 2 g TXA IV bolus", "people 16 and over", "within 2 hours", "before imaging", "separate from"]) expect(HEAD_INJURY_TXA).toContain(condition);
    const worked = TransfusionCoagulationTopic().props.workedExamples[0];
    expect(worked.working).toContain(HEAD_INJURY_TXA);
    expect(worked.working).toContain("1 g IV at the start AND 1 g at the end");
    expect(worked.working).not.toContain("clearly indicated in isolated traumatic brain injury");
  });
  it("actual teaching renders adjacent resolving protocol/guideline sources and scoped FAQ", () => {
    render(<MemoryRouter><TransfusionHaemorrhageTeaching /></MemoryRouter>);
    expect(screen.getByText(PROPPR_COMPONENTS)).toBeInTheDocument();
    expect(screen.getByText(HEAD_INJURY_TXA)).toBeInTheDocument();
    const faq = extractFaqsByPath()["/intensive-care/transfusion-coagulation"][0][1];
    expect(faq).toContain("not one adult platelet dose per RBC");
    expect(faq).toContain("NICE NG39 initial adult major-trauma plasma:RBC is 1:1");
    expect(faq).toContain("1.1–1.3 mmol/L");
    const labels = referenceLabels();
    for (const label of ["PROPPR 2015 protocol", "PROPPR 2015 outcomes", "NICE NG39 major haemorrhage", "NICE NG232 selected head injury TXA", "Rossaint 2023 calcium", "Rossaint 2023 BP target"]) expect(labels.get("transfusion-coagulation")?.has(label)).toBe(true);
    for (const label of ["RCUK PALS 2025", "RCUK PALS 2025 arrhythmias", "RCUK PALS 2025 intubation", "RCUK PALS 2025 fluids"]) expect(topicReferences["paediatric-icu"].find(r => r.label === label)?.url).toBe("https://www.resus.org.uk/cy/node/36439");
  });
  it("corrected local search/audit copies retain both topics without the unsafe residual claims", () => {
    const search = JSON.parse(source("src/data/searchIndex.generated.json"));
    const audit = JSON.parse(source("data-build/audit-corpus.json"));
    for (const id of ["paediatric-icu", "transfusion-coagulation"]) {
      const s = search.topics.find((t: {id: string}) => t.id === id);
      const a = audit.entries.find((t: {topic_id: string}) => t.topic_id === id);
      expect(s).toBeDefined(); expect(a).toBeDefined();
      const combined = JSON.stringify([s, a]);
      expect(combined).not.toMatch(/does NOT change UK practice|clearly indicated in isolated traumatic brain injury|most dangerous metabolic complication|per 4 units PRBC/);
    }
  });
});