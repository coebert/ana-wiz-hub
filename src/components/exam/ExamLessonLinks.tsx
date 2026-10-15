import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { allTopics, sectionMeta } from "@/data/curriculum";

type Lesson = { topicId: string; label: string; anchor?: string };
type LessonGroup = { title: string; lessons: Lesson[] };

const physiology: LessonGroup = {
  title: "Physiology",
  lessons: [
    { topicId: "physiology-overview", label: "Homeostasis and set points", anchor: "section-homeostasis-and-set-points" },
    { topicId: "physiology-overview", label: "Negative and positive feedback", anchor: "section-feedback-loops-negative-and-positive" },
    { topicId: "renal-system-overview", label: "Renal filtration, concentration and hormonal control" },
    { topicId: "cardiovascular-system-overview", label: "Cardiac output and blood pressure" },
    { topicId: "respiratory-system-overview", label: "Ventilation, gas exchange and transport" },
    { topicId: "endocrine-physiology", label: "Endocrine physiology and the stress response" },
  ],
};

export const examLessonGroups: Record<"primary" | "final", LessonGroup[]> = {
  primary: [physiology, {
    title: "Endocrine foundations",
    lessons: [
      { topicId: "thyroid-function", label: "Thyroid synthesis, control and carriage", anchor: "section-synthesis-control-and-carriage" },
      { topicId: "diabetes-management", label: "Insulin physiology and the stress response", anchor: "section-insulin-physiology-and-the-stress-response" },
      { topicId: "endocrine-tumours", label: "Adrenal medulla and catecholamine physiology", anchor: "section-adrenal-medulla-and-phaeochromocytoma-physiology" },
    ],
  }],
  final: [physiology, {
    title: "Endocrine disease and emergencies",
    lessons: [
      { topicId: "thyroid-function", label: "Perioperative hyper- and hypothyroidism", anchor: "section-perioperative-hyper-and-hypothyroidism" },
      { topicId: "diabetes-management", label: "Perioperative diabetes: assessment and newer drugs", anchor: "section-preoperative-assessment-and-newer-drugs" },
      { topicId: "endocrine-tumours", label: "Anaesthesia for phaeochromocytoma", anchor: "section-anaesthesia-for-phaeochromocytoma" },
      { topicId: "icu-endocrine-emergencies", label: "Endocrine emergencies in ICU" },
      { topicId: "dka", label: "Diabetic ketoacidosis" },
      { topicId: "thyroid-storm", label: "Thyroid storm" },
      { topicId: "adrenal-crisis", label: "Adrenal crisis" },
      { topicId: "pituitary-apoplexy", label: "Pituitary apoplexy" },
    ],
  }, {
    title: "Intensive care",
    lessons: [
      { topicId: "critical-care-overview", label: "Critical care structure, team and communication" },
      { topicId: "icu-inpatient-journey", label: "ICU referral, treatment and discharge" },
      { topicId: "sepsis", label: "Sepsis and septic shock" },
      { topicId: "sepsis-resuscitation", label: "Initial septic shock resuscitation" },
      { topicId: "mechanical-ventilation", label: "Mechanical ventilation and weaning" },
      { topicId: "icu-discharge-planning", label: "ICU discharge planning and rehabilitation" },
      { topicId: "icu-outcomes", label: "Survival and functional recovery after ICU" },
      { topicId: "icu-outcomes", label: "Return to work after ICU", anchor: "section-7-return-to-work-and-usual-activities" },
      { topicId: "icu-outcomes", label: "PTSD, depression and anxiety after ICU", anchor: "section-8-ptsd-depression-and-anxiety" },
      { topicId: "pics-follow-up", label: "PICS follow-up plan" },
    ],
  }],
};

export function ExamLessonLinks({ exam }: { exam: "primary" | "final" }) {
  return (
    <section aria-labelledby="revision-lessons-heading" className="mb-10">
      <h2 id="revision-lessons-heading" className="text-2xl font-serif font-bold text-foreground mb-4">Revision lessons</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {examLessonGroups[exam].map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">{group.title}</h3>
            <ul className="divide-y divide-border">
              {group.lessons.map((lesson) => {
                const topic = allTopics.find((item) => item.id === lesson.topicId);
                if (!topic?.available) return null;
                const to = `${sectionMeta[topic.section].path}/${topic.id}${lesson.anchor ? `#${lesson.anchor}` : ""}`;
                return (
                  <li key={to}>
                    <Link to={to} className="flex items-start justify-between gap-3 py-2 text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                      <span>{lesson.label}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 mt-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}