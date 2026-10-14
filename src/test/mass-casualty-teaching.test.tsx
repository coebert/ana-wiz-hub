import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { massCasualtyMilitaryQuestions } from "@/data/quizzes";
import { MassCasualtyEthicsTeaching, MassCasualtyTeamworkTeaching, MassCasualtyBleedingTeaching, MassCasualtyMilitaryTeaching, MassCasualtyChemicalTeaching } from "@/components/topic/MassCasualtyTeaching";

describe("mass casualty source-led teaching", () => {
  it.each([
    [MassCasualtyEthicsTeaching, "Consent, capacity and emergency treatment"],
    [MassCasualtyTeamworkTeaching, "Close the loop and protect the handover"],
    [MassCasualtyBleedingTeaching, "TXA, calcium, temperature and targeted haemostasis"],
    [MassCasualtyMilitaryTeaching, "Prepare for delay and transfer failure"],
    [MassCasualtyChemicalTeaching, "Nerve agents: treat respiratory toxicity, not pupil size"],
  ] as const)("renders lesson and source list", (Teaching, heading) => {
    const html = renderToStaticMarkup(<Teaching />);
    expect(html).toContain(heading);
    expect(html).toContain("Learning check:");
    expect(html).toContain("Sources for this lesson");
    expect(html).not.toContain("is missing from the topic list");
  });

  it("resolves every lesson citation and supplies exact excerpts for key treatment guidance", () => {
    const src = readFileSync("src/components/topic/MassCasualtyTeaching.tsx", "utf8");
    const refs = topicReferences["mass-casualty-military"] ?? [];
    for (const m of src.matchAll(/<R label="([^"]+)"/g)) {
      expect(refs.some((r) => r.label === m[1]), m[1]).toBe(true);
    }
    expect(new Set(refs.map((r) => r.label)).size).toBe(refs.length);
    for (const label of ["European Trauma 2023 TXA", "European Trauma 2023 Pressure", "UK CBRN Nerve Antidotes 2018", "UKHSA Nerve Agents 2024", "NICE NG116 Debriefing"]) {
      const ref = refs.find((r) => r.label === label);
      expect(ref?.excerpt?.length).toBeGreaterThan(40);
      expect(ref?.excerpt?.length).toBeLessThanOrEqual(600);
      expect(ref?.url).toMatch(/^https:\/\//);
    }
    expect(refs.some((r) => r.label === "UK TXA Consensus 2023")).toBe(false);
  });

  it("aligns quiz answers and removes unsafe historical shortcuts", () => {
    expect(massCasualtyMilitaryQuestions).toHaveLength(10);
    for (const q of massCasualtyMilitaryQuestions) {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
    }
    const page = readFileSync("src/pages/topics/MassCasualtyMilitaryTopic.tsx", "utf8");
    for (const unsafe of ["routine 8-hour maintenance infusion is no longer", "decontaminate before treatment", "&gt;110 if TBI", "RSI with ketamine 1–2 mg/kg", "Forgetting to release tourniquets"]) {
      expect(page).not.toContain(unsafe);
    }
    expect(page).toContain('title="Chemical Incidents & CBRN Response"');
  });
});