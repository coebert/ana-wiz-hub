import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { ASTHMA_OXYGEN, KETAMINE_INDUCTION, ASTHMA_ADRENALINE, SEDACONDA_PRODUCT, VOLATILE_TRIALS, VOLATILE_RESCUE, COPD_ANTIBIOTICS, HELIOX_RESCUE } from "@/components/topic/BronchospasticRescueTeaching";
import SedacondaDiagram from "@/components/diagrams/intensive-care/SedacondaDiagram";
import { bronchospasticFailureQuestions } from "@/data/quizzes";
import { topicReferences } from "@/data/references";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

afterEach(cleanup);
const page = () => readFileSync("src/pages/topics/BronchospasticFailureTopic.tsx", "utf8");

describe("C6 source-scoped respiratory rescue", () => {
  it("CL77 corrects life-threatening hypoxia before UK 94–98% titration, separate from COPD", () => {
    expect(ASTHMA_OXYGEN).toContain("immediately with 100% oxygen");
    expect(ASTHMA_OXYGEN).toContain("after initial stabilisation titrate oxygen to SpO₂ 94–98%");
    expect(ASTHMA_OXYGEN).toContain("COPD controlled-oxygen advice is separate: target 88–92%");
    const faq = extractFaqsByPath()["/intensive-care/bronchospastic-failure"];
    expect(faq[0][1]).toContain("100% oxygen, then titrate to SpO₂ 94–98%");
  });
  it("CL81 induction properties never guarantee haemodynamic protection", () => {
    expect(KETAMINE_INDUCTION).toContain("hypotension, arrhythmias and cardiac effects can occur");
    expect(KETAMINE_INDUCTION).toContain("Choose neuromuscular blockade individually");
    const question = bronchospasticFailureQuestions.find(q => q.question.includes("sympathomimetic"));
    expect(question?.options[question.correctIndex]).toBe("Ketamine");
    expect(question?.explanation).toBe(KETAMINE_INDUCTION);
  });
  it("CL81 adrenaline is separate from routine asthma escalation", () => {
    expect(ASTHMA_ADRENALINE).toContain("not routinely indicated for asthma without anaphylaxis");
    expect(ASTHMA_ADRENALINE).toContain("IM adrenaline 0.5 mg");
    expect(ASTHMA_ADRENALINE).toContain("standard ALS for cardiac arrest");
    expect(page()).not.toContain('["8 — Adrenaline", "IV bolus 10–50');
  });
  it("CL82 licensed isoflurane dose, concentration units, date and sevo exclusion remain explicit", () => {
    for (const qualification of ["isoflurane medicine", "delivery device", "14 June 2024", "3 mL/h", "minute ventilation", "1.0%", "1.5%", "not MAC", "current local product information", "do not extrapolate isoflurane SmPC dosing to sevoflurane"]) {
      expect(SEDACONDA_PRODUCT).toContain(qualification);
    }
    expect(VOLATILE_RESCUE).toContain("outside Sedaconda's licensed sedation indication");
  });
  it("CL82 interactive setup retains exact agent-specific guidance and CL80 dead-space warning", () => {
    render(<MemoryRouter><SedacondaDiagram /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Practical Setup" }));
    expect(screen.getByText(SEDACONDA_PRODUCT)).toBeInTheDocument();
    expect(screen.getByText(/initial 3 mL\/h per UK SmPC/)).toBeInTheDocument();
    expect(screen.getByText(/Assess device size, apparatus dead space and approved placement/)).toBeInTheDocument();
    expect(screen.queryByText("Isoflurane 0.5–5 ml/h")).not.toBeInTheDocument();
  });
  it("CL83 trials retain comparators, populations, duration and outcome limits", () => {
    for (const qualification of ["301", "48 ±6 hours", "no midazolam arm", "RASS range −1 to −4 (90.7% vs 91.1%)", "secondary findings", "687", "up to 7 days", "moderate/severe ARDS", "47.1% vs 55.7%", "not a trial of selected short rescue"]) {
      expect(VOLATILE_TRIALS).toContain(qualification);
    }
    expect(VOLATILE_TRIALS).toContain("not proof of better survival, less delirium or general organ protection");
  });
  it("CL83 heliox has no universal device or nebuliser prescription", () => {
    expect(HELIOX_RESCUE).toContain("do not compromise oxygenation");
    expect(HELIOX_RESCUE).toContain("validated heliox-compatible");
    expect(HELIOX_RESCUE).toContain("not a standard rescue prescription or a universal nebuliser-flow multiplier");
  });
  it("CL84 UK prednisolone30mg5days is not the REDUCE40mg regimen", () => {
    expect(page()).toContain("Prednisolone 30 mg PO daily × 5 days (NICE NG115)");
    expect(page()).toContain("REDUCE used prednisone 40 mg daily for 5 versus 14 days");
    expect(topicReferences["bronchospastic-failure"].find(r => r.label === "NICE NG115")?.excerpt).toBe("Offer 30 mg oral prednisolone daily for 5 days.");
  });
  it("CL84 resistance risk is not an automatic fluoroquinolone rule; steroids add tendon risk", () => {
    for (const qualification of ["not every COPD exacerbation is bacterial", "does not mandate co-amoxiclav", "not automatic ciprofloxacin or levofloxacin", "other recommended antibiotics are inappropriate", "Avoid coadministration with corticosteroids", "tendinitis and tendon rupture"]) {
      expect(COPD_ANTIBIOTICS).toContain(qualification);
    }
  });
  it("CL82/83 references identify actual medicine and trials, not Trepulmix or transplantation", () => {
    const refs = topicReferences["bronchospastic-failure"];
    expect(refs.find(r => r.label === "Sedaconda SPC")?.url).toBe("https://sedanamedical.com/wp-content/uploads/2025/02/20240614-UK-Approved-SmPC-Sedaconda-IAin-MAH-Address.pdf");
    expect(refs.find(r => r.label === "Meiser isoflurane 2021")?.url).toBe("https://pubmed.ncbi.nlm.nih.gov/34454654/");
    expect(refs.find(r => r.label === "SESAR 2025")?.url).toBe("https://pubmed.ncbi.nlm.nih.gov/40098564/");
    expect(refs.some(r => /product\/12586|bjae\.2023\.04\.002/.test(r.url ?? ""))).toBe(false);
  });
  it("preserves CL78 NIV decisions rather than numerical automatic intubation or a generic asthma bridge", () => {
    expect(page()).toContain("pH &lt;7.35 and PaCO₂ &gt;6.5 kPa persist or develop despite optimal medical treatment");
    expect(page()).toContain("Severe acidosis alone does not exclude a trial");
    expect(page()).toContain("Do not attempt it in an agitated patient or sedate a patient simply to tolerate NIV");
    expect(page()).toContain("NIV must not delay necessary intubation");
  });
  it("preserves CL79 standard ALS and distinction between gas-exchange and circulatory support", () => {
    expect(page()).toContain("start high-quality CPR and give adrenaline according to the ALS algorithm");
    expect(page()).toContain("VV-ECMO alone provides no direct circulatory support");
    expect(page()).toContain("bilateral diagnostic thoracostomies are not routine");
  });
  it("preserves CL80 plateau-pressure and conditional apparatus-deadspace decisions", () => {
    expect(page()).toContain("It does not confirm gas trapping by itself");
    expect(page()).toContain("do not automatically increase tidal volume");
    expect(page()).toContain("A fixed 80% rule is not universally safe");
  });
  it("corrected clinical facts survive generated search and local audit extraction", () => {
    const search = JSON.parse(readFileSync("src/data/searchIndex.generated.json", "utf8"));
    const audit = JSON.parse(readFileSync("data-build/audit-corpus.json", "utf8"));
    const s = search.topics.find((t: {id: string}) => t.id === "bronchospastic-failure");
    const a = audit.entries.find((t: {topic_id: string}) => t.topic_id === "bronchospastic-failure");
    expect(s).toBeDefined(); expect(a).toBeDefined();
    for (const fact of ["not routinely indicated for asthma without anaphylaxis", "14 June 2024", "47.1% vs 55.7%", "Avoid coadministration with corticosteroids"]) {
      expect(JSON.stringify(s)).toContain(fact); expect(JSON.stringify(a)).toContain(fact);
    }
  });
});