import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isValidElement, type ReactNode } from "react";
import PaediatricIcuTopic, { PAEDIATRIC_DNC_2025_SUMMARY } from "@/pages/topics/PaediatricIcuTopic";
import OrganDonationTopic, { DCD_FWIT_DEFINITION, DCD_ACCEPTANCE_SCOPE, DCD_NRP_OUTCOMES } from "@/pages/topics/OrganDonationTopic";
import { topicReferences } from "@/data/references";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

function strings(node: ReactNode): string[] {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(strings);
  if (isValidElement<{ children?: ReactNode }>(node)) return strings(node.props.children);
  return [];
}

describe("CL53/ROOT02 and proposed CL86 source-scoped residuals", () => {
  const paediatric = PaediatricIcuTopic().props;
  const donation = OrganDonationTopic().props;
  it("uses corrected age, both minimum 24-hour safeguards and no ancillary establishment under two", () => {
    expect(PAEDIATRIC_DNC_2025_SUMMARY).toContain("below 37 weeks corrected gestation");
    expect(PAEDIATRIC_DNC_2025_SUMMARY).toContain("under 2 years corrected age");
    expect(PAEDIATRIC_DNC_2025_SUMMARY).toContain("at least 24 hours after the last observed brainstem reflex or spontaneous breath");
    expect(PAEDIATRIC_DNC_2025_SUMMARY).toContain("at least 24 hours between test sets");
    expect(PAEDIATRIC_DNC_2025_SUMMARY).toContain("Ancillary investigations are not recommended to establish DNC");
    expect(paediatric.keyPoints.filter((p: {text: string}) => p.text === PAEDIATRIC_DNC_2025_SUMMARY)).toHaveLength(1);
    expect(strings(paediatric.coreConcepts).filter(s => s === PAEDIATRIC_DNC_2025_SUMMARY)).toHaveLength(2);
  });
  it("retains exactly one correct paediatric option at index 1 with the same current summary", () => {
    const quiz = paediatric.quizQuestions.find((q: {question: string}) => q.question === "Which statement about brainstem death testing in children is correct?");
    expect(quiz).toBeDefined();
    expect(quiz.correctIndex).toBe(1);
    expect(quiz.options).toHaveLength(4);
    expect(quiz.options[1]).toContain("minimum 24-hour safeguards below 2 years corrected age");
    expect(quiz.options.filter((s: string) => s.includes("From 37 weeks"))).toHaveLength(1);
    expect(quiz.explanation).toBe(PAEDIATRIC_DNC_2025_SUMMARY);
  });
  it("links current records and quarantines historical instructions without rewriting 2025 metadata", () => {
    for (const id of ["paediatric-icu", "organ-donation"]) {
      const ref = topicReferences[id].find(r => r.label === "AoMRC 2025 Paediatric DNC");
      expect(ref?.url).toContain("/2025/01/Code_of_Practice_Diagnosis_of_Death_010125.pdf");
      expect(ref?.citation).toContain("Appendix 2");
    }
    for (const id of ["neurointensive-care", "organ-donation", "paediatric-icu"]) {
      const historical = topicReferences[id].filter(r => /AoMRC 2008|RCPCH DNC.*2015/.test(r.label));
      expect(historical.length).toBeGreaterThan(0);
      for (const ref of historical) {
        expect(ref.label).toContain("Historical/superseded");
        expect(ref.excerpt).toBeUndefined();
        expect(ref.reviewNote).toContain("AoMRC 2025 Code and RCPCH Appendix 2");
      }
    }
    expect(topicReferences["organ-donation"].find(r => r.label === "AoMRC DNC Code of Practice (PDF)")?.reviewNote).toContain("2025 sections 6.51–6.59 checked");
  });
  it("dates the deceased-donor proportions with the correct denominator", () => {
    const point = donation.keyPoints.find((p: {text:string}) => p.text.includes("55% DCD"));
    expect(point.text).toContain("45% DBD of UK deceased organ donors, 2025–26");
    expect(point.text).toContain("792 DCD donors");
    expect(point.cites).toContain("NHSBT DCD activity 2025–26");
  });
  it("defines a sustained two-minute fall through actual cold perfusion or NRP, not withdrawal/arrest", () => {
    expect(DCD_FWIT_DEFINITION).toContain("sustained (at least 2-minute)");
    expect(DCD_FWIT_DEFINITION).toContain("SBP below 50 mmHg");
    expect(DCD_FWIT_DEFINITION).toContain("cold in-situ perfusion or normothermic regional perfusion");
    expect(DCD_FWIT_DEFINITION).toContain("not time since withdrawal");
    const example = donation.workedExamples[1];
    const answer = strings(example.answer).join(" ");
    expect(answer).toContain("If the sustained-low-BP interval begins at 12 min");
    expect(answer).toContain("actually starts at 43 min");
    expect(answer).toContain("43 − 12 = 31 min");
    expect(answer).toContain(DCD_ACCEPTANCE_SCOPE);
    expect(strings(example.working).join(" ")).toContain("Confirming death at 33 min assumes all criteria are then satisfied");
  });
  it("retains method-specific acceptance and observational rather than universal outcome benefit", () => {
    expect(DCD_ACCEPTANCE_SCOPE).toContain("cannot declare an organ viable or nonviable");
    expect(DCD_ACCEPTANCE_SCOPE).toContain("long withdrawal phase alone is not an automatic liver exclusion");
    expect(DCD_NRP_OUTCOMES).toContain("observational evidence");
    expect(DCD_NRP_OUTCOMES).toContain("varies by organ, donor selection and comparator");
    expect(donation.keyPoints.some((p: {text:string}) => p.text === DCD_NRP_OUTCOMES)).toBe(true);
    const faq = extractFaqsByPath()["/intensive-care/organ-donation"]?.find(([q]) => q === "How does DCD differ from DBD for donation?");
    expect(faq?.[1]).toContain("at least 2-minute");
    expect(faq?.[1]).toContain("arithmetic alone cannot establish viability");
  });
  it("contains none of the identified superseded live claims or universal organ cutoffs", () => {
    const paed = readFileSync("src/pages/topics/PaediatricIcuTopic.tsx", "utf8");
    const organ = readFileSync("src/pages/topics/OrganDonationTopic.tsx", "utf8");
    expect(paed).not.toMatch(/RCPCH DNC Infants 2015|ancillary testing often required|separate RCPCH criteria for infants under 2 months/);
    expect(organ).not.toMatch(/AoMRC 2008|~60%|~40%|~50% to ~20%|roughly half to roughly a fifth|<30 min kidney, <20 min liver|typically 2–3 h|within ~10 minutes/);
    expect(organ).toContain("end PaCO₂ ≥8.0 kPa");
    expect(organ).toContain("pH &lt;7.30");
    expect(organ).toContain("completion of the <strong>second</strong> set");
  });
});