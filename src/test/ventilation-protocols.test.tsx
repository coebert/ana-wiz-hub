import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { intensiveCareTopics } from "@/data/curriculum";
import { AdmissionProtocolTeaching, MonitoringProtocolTeaching, WeaningProtocolTeaching } from "@/components/topic/VentilationProtocolsTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
const norm = (s: string) => s.replace(/[“”"]/g, "").replace(/\s+/g, " ").trim();
describe("Ventilation protocol lessons", () => {
  it.each([AdmissionProtocolTeaching, MonitoringProtocolTeaching, WeaningProtocolTeaching])("renders teaching, a check, sources and verbatim quotes", Lesson => {
    const { container } = render(<MemoryRouter><Lesson /></MemoryRouter>);
    expect(container.textContent!.length).toBeGreaterThan(1000);
    expect(screen.getAllByText(/Learning check:/).length).toBeGreaterThan(0);
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
    for (const q of container.querySelectorAll("blockquote")) {
      const c = q.cloneNode(true) as HTMLElement; c.querySelectorAll("span").forEach(s => s.remove()); const text = norm(c.textContent!);
      expect(topicReferences["ventilation-protocols"].some(r => r.excerpt && (text.includes(norm(r.excerpt)) || norm(r.excerpt).includes(text.replace(/\s*\.$/, ""))))).toBe(true);
    }
  });
  it("registers, links and resolves labels", () => {
    expect(intensiveCareTopics.some(t => t.id === "ventilation-protocols" && t.available)).toBe(true);
    expect(readFileSync("src/routes/topicRoutes.ts", "utf8")).toContain('["/intensive-care/ventilation-protocols", "VentilationProtocolsTopic"]');
    expect(readFileSync("src/pages/topics/MechanicalVentilationTopic.tsx", "utf8")).toContain('to="/intensive-care/ventilation-protocols"');
    const src = readFileSync("src/components/topic/VentilationProtocolsTeaching.tsx", "utf8");
    expect(src).toContain("/intensive-care/peep-management");
    for (const m of src.matchAll(/label="([^"]+)"/g)) expect(topicReferences["ventilation-protocols"].some(r => r.label === m[1]), m[1]).toBe(true);
  });
});
