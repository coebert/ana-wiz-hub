import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { emergencySurgeryQuestions, icuEndocrineEmergenciesQuestions } from "@/data/quizzes";
import { HyperglycaemicEmergenciesTeaching, ThyroidEmergenciesTeaching, AdrenalPituitaryEmergenciesTeaching, EndocrinePerioperativeTeaching } from "@/components/topic/EndocrineEmergenciesTeaching";
import { EmergencyPrioritisationTeaching, EmergencyAirwayEvidenceTeaching, EmergencyAppendicitisTeaching, EmergencyObstructionTeaching, EmergencyHipFractureTeaching } from "@/components/topic/EmergencySurgeryTeaching";

describe("next emergency source-led expansion", () => {
  it.each([HyperglycaemicEmergenciesTeaching, ThyroidEmergenciesTeaching, AdrenalPituitaryEmergenciesTeaching, EndocrinePerioperativeTeaching, EmergencyPrioritisationTeaching, EmergencyAirwayEvidenceTeaching, EmergencyAppendicitisTeaching, EmergencyObstructionTeaching, EmergencyHipFractureTeaching])("renders a substantive lesson with sources and a learning check", (Lesson) => {
    const html = renderToStaticMarkup(<Lesson />);
    expect(html.length).toBeGreaterThan(2000);
    expect(html).toContain("Learning check:");
    expect(html).toContain("Sources for this lesson");
    expect(html).not.toContain("is missing from the topic list");
  });
  it.each([["EndocrineEmergenciesTeaching", "icu-endocrine-emergencies"], ["EmergencySurgeryTeaching", "emergency-surgery"]])("resolves all lesson citations", (file, topic) => {
    const text = readFileSync(`src/components/topic/${file}.tsx`, "utf8");
    const refs = topicReferences[topic] ?? [];
    for (const match of text.matchAll(/<R label="([^"]+)"/g)) expect(refs.some(r => r.label === match[1]), match[1]).toBe(true);
    expect(new Set(refs.map(r => r.label)).size).toBe(refs.length);
  });
  it("keeps endocrine corrections consistent across linked displays", () => {
    for (const file of ["src/pages/topics/IcuEndocrineEmergenciesTopic.tsx", "src/components/diagrams/intensive-care/DKAAnimation.tsx", "src/components/diagrams/intensive-care/EndocrineEmergencyAlgorithms.tsx"]) {
      const text = readFileSync(file, "utf8");
      expect(text).not.toContain("HCO₃⁻ &gt; 18");
      expect(text).not.toContain("HCO₃⁻ >18");
      expect(text).not.toContain("Stop ≥ 3 days pre-op (MHRA)");
      expect(text).not.toContain("Switch to 0.45% NaCl if Na⁺ rising");
    }
    const page = readFileSync("src/pages/topics/IcuEndocrineEmergenciesTopic.tsx", "utf8");
    expect(page).toContain("105");
    expect(page).toContain("300 mg IV load");
  });
  it("keeps both quizzes (at least ten questions) valid and removes unsupported outcomes", () => {
    for (const quiz of [emergencySurgeryQuestions, icuEndocrineEmergenciesQuestions]) {
      expect(quiz.length).toBeGreaterThanOrEqual(10);
      for (const q of quiz) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation).not.toContain("Stop SGLT2 inhibitors ≥ 3 days");
      }
    }
    const page = readFileSync("src/pages/topics/EmergencySurgeryTopic.tsx", "utf8");
    expect(page).not.toContain("increases mortality in septic shock (KETASED");
    expect(page).not.toContain('refLabel="NICE NG111"');
  });
});