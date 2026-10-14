import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { topicReferences } from "@/data/references";
import { APRVSection } from "@/components/topic/APRVSection";
import APRVExpiratoryFlowDiagram from "@/components/diagrams/intensive-care/APRVExpiratoryFlowDiagram";

vi.mock("@/components/references/InlineRef", () => ({
  InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span>,
}));
vi.mock("@/components/quiz/QuizSection", () => ({
  QuizSection: ({ questions }: { questions: { question: string }[] }) => (
    <div>{questions.map((q) => <p key={q.question}>{q.question}</p>)}</div>
  ),
}));

describe("Source-linked APRV teaching", () => {
  it("covers settings, monitoring, weaning, evidence and learning checks", () => {
    render(<APRVSection />);
    for (const title of [
      "The four settings — an adult teaching example",
      "Monitoring, troubleshooting and stopping rules",
      "Weaning and transfers",
      "Evidence: promising physiology, uncertain patient benefit",
      "APRV knowledge check",
    ]) expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(/ESICM’s 2023 ARDS guideline does not address APRV specifically/)).toBeInTheDocument();
  });

  it("keeps the plotted termination point inside the labelled target band", () => {
    const { container } = render(<APRVExpiratoryFlowDiagram />);
    expect(screen.getByText("(75% PEFR)")).toBeInTheDocument();
    const svg = container.querySelector("svg");
    const band = svg?.querySelector("rect");
    const marker = svg?.querySelector("circle");
    expect(band).not.toBeNull();
    expect(marker).not.toBeNull();
    const y = Number(band?.getAttribute("y"));
    const height = Number(band?.getAttribute("height"));
    const cy = Number(marker?.getAttribute("cy"));
    expect(cy).toBeGreaterThanOrEqual(y);
    expect(cy).toBeLessThanOrEqual(y + height + 0.001);
  });

  it("resolves every APRV-specific source to a real full-text source link", () => {
    const refs = topicReferences["mechanical-ventilation"];
    for (const label of ["Swindin APRV 2020", "Zhou APRV 2017", "Hirshberg APRV 2018", "CADTH APRV 2022"]) {
      const ref = refs.find((r) => r.label === label);
      expect(ref?.url).toMatch(/^https:\/\/(pmc\.ncbi\.nlm\.nih\.gov|www\.ncbi\.nlm\.nih\.gov)\//);
    }
  });
});