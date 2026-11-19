import { describe, expect, it } from "vitest";
import * as banks from "@/data/quizzes";
import { caseBanks } from "@/data/cases";
import { perioperativeCases } from "@/pages/PerioperativeCaseBank";
import type { QuizQuestion } from "@/components/quiz/QuizSection";

function answer(questions: QuizQuestion[], stem: RegExp) {
  const matches = questions.filter(({ question }) => stem.test(question));
  expect(matches, String(stem)).toHaveLength(1);
  const [item] = matches;
  return { key: item.options[item.correctIndex], rationale: item.explanation };
}

const cases = [...caseBanks.flatMap((bank) => bank.cases), ...perioperativeCases];

describe("November 2026 clinical content regressions", () => {
  it("ships a valid keyed option and explanatory text for every exported quiz item", () => {
    const invalid: string[] = [];
    for (const [bank, questions] of Object.entries(banks)) {
      for (const [index, item] of questions.entries()) {
        if (!item.question.trim() || !item.explanation.trim() ||
            !Number.isInteger(item.correctIndex) || !item.options[item.correctIndex]?.trim() ||
            item.options.length < 2 || item.options.some((option) => !option.trim()) ||
            new Set(item.options).size !== item.options.length) {
          invalid.push(bank + " question " + (index + 1));
        }
      }
    }
    expect(invalid).toEqual([]);
  });

  it("keys emergency rhythm decisions to the patient's rhythm and haemodynamics", () => {
    const group = banks.arrhythmiasEcgIcuQuestions;
    expect(answer(group, /pre-excited atrial fibrillation/i).key).toMatch(/AV nodal blockers.*amiodarone/i);
    expect(answer(group, /polymorphic VT/i).rationale).toMatch(/sustained.*unsynchronised shock/i);
    expect(answer(group, /new LBBB after ROSC/i).key).toMatch(/ischaemia or instability.*strongly suspected/i);
    expect(answer(group, /complete AV block with a broad-QRS/i).rationale).toMatch(/against atropine/i);
  });

  it("preserves the indication, dose and repeat interval in both newborn case banks", () => {
    for (const id of ["icu-paed-neonatal-resuscitation", "paed-neonatal-resuscitation"]) {
      const item = cases.find((c) => c.id === id);
      expect(item, id).toBeDefined();
      const stages = item!.stages.flatMap((stage) => stage.answer).join(" ");
      expect(stages).toMatch(/20 micrograms\/kg/);
      expect(stages).toMatch(/every 4 minutes/);
      expect(stages).toMatch(/measured low.{0,90}2 mL\/kg of 10%/);
      expect(stages).not.toMatch(/2[.]5 mL\/kg of 10%|every 3–5 minutes/);
    }
  });

  it("teaches the cumulative limit and bolus duration across adult and infant lipid rescue cases", () => {
    for (const id of ["pharmacology-la-toxicity", "pharmacology-last-lipid-rescue", "pharmacology-tox-paediatric-last"]) {
      const item = cases.find((c) => c.id === id);
      expect(item, id).toBeDefined();
      const stages = item!.stages.flatMap((stage) => stage.answer).join(" ");
      expect(stages).toMatch(/1[.]5 mL\/kg.{0,48}2–3 minutes/);
      expect(stages).toMatch(/12 mL\/kg|72 mL total/);
      expect(stages).not.toMatch(/bolus over about 1 minute|over one minute/i);
    }
  });
});
