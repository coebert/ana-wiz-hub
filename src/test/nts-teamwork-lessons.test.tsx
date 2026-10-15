import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { DebriefingTeaching, SpeakingUpTeaching, TeamSTEPPSTeaching } from "@/components/topic/NTSEvidenceTeaching";

vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span data-ref={refLabel} /> }));
afterEach(cleanup);
const refs = topicReferences["non-technical-skills"];

describe("Non-technical skills teamwork expansion", () => {
  it.each([DebriefingTeaching, SpeakingUpTeaching, TeamSTEPPSTeaching])("renders detailed teaching, exact source records and an expandable answer", Lesson => {
    const { container } = render(<Lesson />);
    expect(container.textContent?.length).toBeGreaterThan(3500);
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
    expect(container.querySelectorAll("blockquote").length).toBeGreaterThan(0);
    for (const quote of container.querySelectorAll("blockquote")) expect(refs.some(ref => ref.excerpt === quote.textContent)).toBe(true);
    for (const node of container.querySelectorAll("[data-ref]")) expect(refs.some(ref => ref.label === node.getAttribute("data-ref"))).toBe(true);
    const summary = screen.getByText(/Learning check:/);
    fireEvent.click(summary);
    expect(summary.closest("details")?.textContent?.length).toBeGreaterThan(300);
    expect(container.textContent).toContain("Fictional teaching");
  });

  it("does not conflate operational debriefing with PTSD prevention", () => {
    const { container } = render(<DebriefingTeaching />);
    expect(container.textContent).toContain("It is not limited to compulsory sessions");
    expect(container.textContent).toContain("not be advertised as proven PTSD prevention");
    expect(refs.find(ref => ref.label === "NICE NG116 Debriefing")?.excerpt).toBe("Do not offer psychologically-focused debriefing for the prevention or treatment of PTSD.");
  });

  it("keeps canonical CUS and time-critical escalation distinct", () => {
    const { container } = render(<SpeakingUpTeaching />);
    expect(container.textContent).toContain("CUS: Concerned, Uncomfortable, Safety issue");
    expect(container.textContent).toContain("not a waiting rule");
    expect(container.textContent).toContain("person receiving it both have responsibilities");
    expect(refs.find(ref => ref.label === "AHRQ Two-Challenge")?.excerpt).toContain("at least two times");
  });

  it("distinguishes plan updates, check-back and completion", () => {
    const { container } = render(<TeamSTEPPSTeaching />);
    expect(container.textContent).toContain("Huddle — update an existing plan");
    expect(container.textContent).toContain("Read-back checks understanding; completion reporting separately checks execution");
  });

  it("wires all three anchored lessons, four additional quiz questions and removes conflicting debrief claims", () => {
    const page = readFileSync("src/pages/topics/NonTechnicalSkillsTopic.tsx", "utf8");
    for (const name of ["DebriefingTeaching", "SpeakingUpTeaching", "TeamSTEPPSTeaching"]) expect(page).toContain(`<${name} />`);
    expect(page.match(/correctIndex:/g)).toHaveLength(6);
    expect(page).not.toContain("STOP-5");
    expect(page).not.toContain("Reduces moral distress");
    for (const label of ["AHRQ Debrief", "AHRQ CUS", "AHRQ Two-Challenge", "AHRQ DESC", "AHRQ Huddle", "AHRQ SBAR", "AHRQ Check-Back", "AHRQ Brief", "AHRQ Call-Out", "AHRQ TeamSTEPPS curriculum"]) {
      const ref = refs.find(item => item.label === label);
      expect(ref?.url).toMatch(/^https:\/\/www\.ahrq\.gov\//);
      expect(ref?.excerpt?.length).toBeGreaterThan(30);
      expect(ref?.excerpt?.length).toBeLessThanOrEqual(600);
    }
  });
});