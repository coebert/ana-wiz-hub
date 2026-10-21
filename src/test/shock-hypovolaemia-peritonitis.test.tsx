import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { intensiveCareTopics } from "@/data/curriculum";
import { ShockPracticeTeaching } from "@/components/topic/ShockPracticeTeaching";
import { HypovolaemiaRecognitionTeaching, HypovolaemiaFluidsTeaching } from "@/components/topic/HypovolaemiaPracticeTeaching";
import { PeritonitisAssessmentTeaching, PeritonitisSourceControlTeaching } from "@/components/topic/PeritonitisPracticeTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const cases = [[ShockPracticeTeaching, "circulatory-failure"], [HypovolaemiaRecognitionTeaching, "hypovolaemia"], [HypovolaemiaFluidsTeaching, "hypovolaemia"], [PeritonitisAssessmentTeaching, "peritonitis"], [PeritonitisSourceControlTeaching, "peritonitis"]] as const;

describe("Shock, hypovolaemia and peritonitis lessons", () => {
  it.each(cases)("renders with resolved sources and verbatim quotes (%#)", (Lesson, topic) => {
    const { container } = render(<MemoryRouter><Lesson /></MemoryRouter>);
    expect(container.textContent).toContain("Learning check:");
    expect(container.textContent).toContain("Sources for this lesson");
    expect(container.textContent).not.toContain("is missing from the topic list");
    for (const q of container.querySelectorAll("blockquote")) {
      const c = q.cloneNode(true) as HTMLElement; c.querySelectorAll("span").forEach((s) => s.remove());
      expect(topicReferences[topic].some((r) => r.excerpt && norm(r.excerpt) === norm(c.textContent!))).toBe(true);
    }
  });
  it("registers the new pages", () => {
    const routes = readFileSync("src/routes/topicRoutes.ts", "utf8");
    for (const id of ["hypovolaemia", "peritonitis"]) {
      expect(intensiveCareTopics.some((t) => t.id === id && t.available)).toBe(true);
      expect(routes).toContain(`"/intensive-care/${id}"`);
    }
  });
});
