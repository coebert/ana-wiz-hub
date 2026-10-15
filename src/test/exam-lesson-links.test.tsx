import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { allTopics, sectionMeta } from "@/data/curriculum";
import { ExamLessonLinks, examLessonGroups } from "@/components/exam/ExamLessonLinks";

afterEach(cleanup);
describe("FRCA revision lesson links", () => {
  for (const exam of ["primary", "final"] as const) {
    it(`${exam}: every lesson resolves to published exam-tagged content`, () => {
      const { container } = render(<MemoryRouter><ExamLessonLinks exam={exam} /></MemoryRouter>);
      const lessons = examLessonGroups[exam].flatMap((group) => group.lessons);
      expect(container.querySelectorAll("a")).toHaveLength(lessons.length);
      for (const lesson of lessons) {
        const topic = allTopics.find((item) => item.id === lesson.topicId);
        expect(topic?.available, lesson.topicId).toBe(true);
        expect(topic?.examTags, lesson.topicId).toContain(exam);
        if (!topic) continue;
        const href = `${sectionMeta[topic.section].path}/${topic.id}${lesson.anchor ? `#${lesson.anchor}` : ""}`;
        expect(container.querySelector(`a[href="${href}"]`)?.textContent).toBe(lesson.label);
      }
    });
  }
  it("hub pages include the matching lesson section", () => {
    expect(readFileSync("src/pages/FRCAPrimaryHub.tsx", "utf8")).toContain('<ExamLessonLinks exam="primary" />');
    expect(readFileSync("src/pages/FRCAFinalHub.tsx", "utf8")).toContain('<ExamLessonLinks exam="final" />');
  });
});