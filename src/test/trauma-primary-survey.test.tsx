import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { TraumaABCDETeaching, TraumaFluidBolusTeaching, TraumaTransfusionTeaching, TraumaSurgicalPriorityTeaching } from "@/components/topic/TraumaPrimarySurveyTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
const norm = (s: string) => s.replace(/[“”"]/g, "").replace(/\s+/g, " ").trim();
describe("Trauma primary survey lessons", () => {
  it.each([TraumaABCDETeaching, TraumaFluidBolusTeaching, TraumaTransfusionTeaching, TraumaSurgicalPriorityTeaching])("renders verbatim quotes, a check and sources", Lesson => {
    const { container } = render(<Lesson />);
    expect(container.textContent!.length).toBeGreaterThan(1500);
    expect(screen.getByText(/Learning check:/)).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
    for (const q of container.querySelectorAll("blockquote")) {
      const c = q.cloneNode(true) as HTMLElement; c.querySelectorAll("span").forEach(s => s.remove());
      const text = norm(c.textContent!);
      expect(topicReferences["trauma-emergency"].some(r => r.excerpt && norm(r.excerpt) === text), text).toBe(true);
    }
  });
  it("resolves every label and is rendered on the page", () => {
    const src = readFileSync("src/components/topic/TraumaPrimarySurveyTeaching.tsx", "utf8");
    for (const m of src.matchAll(/label="([^"]+)"/g)) expect(topicReferences["trauma-emergency"].some(r => r.label === m[1]), m[1]).toBe(true);
    const page = readFileSync("src/pages/topics/TraumaEmergencyTopic.tsx", "utf8");
    for (const c of ["TraumaABCDETeaching", "TraumaFluidBolusTeaching", "TraumaTransfusionTeaching", "TraumaSurgicalPriorityTeaching"]) expect(page).toContain(`<${c} />`);
    expect(page).not.toContain("250 mL boluses titrated to a palpable radial pulse");
  });
});
