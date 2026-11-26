import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

const page = readFileSync("src/pages/topics/MuscleRelaxantsTopic.tsx", "utf8");
describe("independently reviewed neuromuscular reversal integration", () => {
  it("keeps deep block separate from immediate reversal in extracted learner FAQs", () => {
    const faqs = extractFaqsByPath()["/pharmacology/muscle-relaxants"];
    const answer = faqs.find(([q]) => q === "How does sugammadex reverse rocuronium?")?.[1];
    expect(answer).toContain("4 mg/kg at 1–2 post-tetanic counts");
    expect(answer).toContain("16 mg/kg for immediate reversal");
    expect(answer).not.toContain("regardless of depth");
    expect(answer).toContain("not a cannot-intubate-cannot-oxygenate rescue");
  });
  it("qualifies re-administration intervals and adult dosing with renal and paediatric limits", () => {
    expect(page).toContain("Re-administration (normal renal function)");
    expect(page).toContain("In mild or moderate renal impairment, wait 24 hours");
    expect(page).toContain("Doses use actual body weight");
    expect(page).toContain("In children, the licence covers routine reversal of rocuronium only");
    expect(page).toContain("immediate reversal has not been investigated");
    expect(page).toContain("CrCl &lt;30 mL/min");
  });
  it("gives airway rescue its own guideline rather than attributing it to product dosing", () => {
    expect(page).toContain('refLabel="DAS 2025"');
    const airway = topicReferences["muscle-relaxants"].find(r => r.label === "DAS 2025");
    expect(airway?.url).toContain("10.1016/j.bja.2025.10.006");
    expect(airway?.underReview).not.toBe(true);
  });
});
