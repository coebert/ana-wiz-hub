import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { icuEndocrineEmergenciesQuestions } from "@/data/quizzes";
import { AdrenalInsufficiencyResuscitationTeaching, SepsisSteroidDecisionsTeaching, DkaSafetyAndRecoveryTeaching } from "@/components/topic/EndocrineEmergenciesTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span data-ref={refLabel} /> }));
afterEach(cleanup);
const refs = topicReferences["icu-endocrine-emergencies"];
describe("Endocrine resuscitation expansion", () => {
  it.each([AdrenalInsufficiencyResuscitationTeaching, SepsisSteroidDecisionsTeaching, DkaSafetyAndRecoveryTeaching])("renders a substantial lesson with exact source records and an answer", Lesson => {
    const { container } = render(<MemoryRouter><Lesson /></MemoryRouter>);
    expect(container.textContent?.length).toBeGreaterThan(2500);
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
    for (const quote of container.querySelectorAll("blockquote")) expect(refs.some(r => r.excerpt === quote.textContent)).toBe(true);
    for (const node of container.querySelectorAll("[data-ref]")) expect(refs.some(r => r.label === node.getAttribute("data-ref"))).toBe(true);
    const summary = screen.getByText(/Learning check:/); fireEvent.click(summary);
    expect(summary.closest("details")?.textContent?.length).toBeGreaterThan(180);
  });
  it("distinguishes UK and international DKA resolution", () => {
    render(<MemoryRouter><DkaSafetyAndRecoveryTeaching /></MemoryRouter>);
    expect(screen.getByText(/explicitly different definitions/)).toBeInTheDocument();
    expect(refs.find(r => r.label === "DKA resolution consensus 2024")?.excerpt).toContain("or bicarbonate ≥18");
    expect(refs.find(r => r.label === "DKA potassium safety 2024")?.excerpt).toContain("delayed until the potassium level increases to >3.5");
  });
  it("wires all three lessons and has valid quiz answers", () => {
    const page = readFileSync("src/pages/topics/IcuEndocrineEmergenciesTopic.tsx", "utf8");
    for (const name of ["AdrenalInsufficiencyResuscitationTeaching", "SepsisSteroidDecisionsTeaching", "DkaSafetyAndRecoveryTeaching"]) expect(page).toContain(`<${name} />`);
    expect(icuEndocrineEmergenciesQuestions).toHaveLength(14);
    for (const q of icuEndocrineEmergenciesQuestions) expect(q.options[q.correctIndex]).toBeTruthy();
  });
});
