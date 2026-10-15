import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { intensiveCareTopics } from "@/data/curriculum";
import { ShockRecognitionTeaching, BloodPressureMonitoringTeaching, TransfusionRatioTeaching } from "@/components/topic/HaemorrhagicShockTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
const norm = (s: string) => s.replace(/[“”"]/g, "").replace(/\s+/g, " ").trim();
describe("Haemorrhagic shock lessons", () => {
  it.each([ShockRecognitionTeaching, BloodPressureMonitoringTeaching, TransfusionRatioTeaching])("renders teaching, a check, sources and verbatim quotes", Lesson => {
    const { container } = render(<MemoryRouter><Lesson /></MemoryRouter>);
    expect(container.textContent!.length).toBeGreaterThan(1200);
    expect(screen.getByText(/Learning check:/)).toBeInTheDocument();
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
    for (const q of container.querySelectorAll("blockquote")) {
      const c = q.cloneNode(true) as HTMLElement; c.querySelectorAll("span").forEach(s => s.remove()); const text = norm(c.textContent!);
      expect(topicReferences["haemorrhagic-shock"].some(r => r.excerpt && (text.includes(norm(r.excerpt)) || norm(r.excerpt).includes(text.replace(/\s*\.$/, ""))))).toBe(true);
    }
  });
  it("registers, links and resolves labels", () => {
    expect(intensiveCareTopics.some(t => t.id === "haemorrhagic-shock" && t.available)).toBe(true);
    expect(readFileSync("src/routes/topicRoutes.ts", "utf8")).toContain('["/intensive-care/haemorrhagic-shock", "HaemorrhagicShockTopic"]');
    expect(readFileSync("src/pages/topics/TraumaEmergencyTopic.tsx", "utf8")).toContain('to="/intensive-care/haemorrhagic-shock"');
    const src = readFileSync("src/components/topic/HaemorrhagicShockTeaching.tsx", "utf8");
    expect(src).toContain("/clinical/trauma-emergency#section-blood-transfusion-ratios-and-haemoglobin-thresholds");
    for (const m of src.matchAll(/label="([^"]+)"/g)) expect(topicReferences["haemorrhagic-shock"].some(r => r.label === m[1]), m[1]).toBe(true);
  });
});
