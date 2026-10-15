import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { CardiacUnitStaffingTeaching, CardiacUnitCostTeaching } from "@/components/topic/IcuUnitTypeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "In a cardiothoracic ICU, in addition to the on-site medical doctor or ACCP, there must be:", options: ["A second ICM consultant", "A cardiothoracic surgeon", "A perfusionist on the unit", "A cardiologist"], correctIndex: 1, explanation: "GPICS V3 chapter 1.8 minimum standard 3." },
  { question: "The cardiothoracic on-site rota must be trained in:", options: ["ATLS", "CALS and capable of chest reopening 24/7", "ECMO cannulation", "TOE accreditation"], correctIndex: 1, explanation: "Cardiac Surgery Advanced Life Support with 24/7 chest-reopening capability." },
  { question: "Perfusion services and theatre staff for emergency resternotomy must be:", options: ["On the unit at all times", "Readily available 24/7", "Available in hours only", "Provided by the ICU nursing team"], correctIndex: 1, explanation: "Chapter 1.8 minimum standard 5: readily available, not resident on the unit." },
  { question: "Consultants covering cardiothoracic ICU out of hours must:", options: ["Be resident on site", "Have regular daytime timetabled sessions in cardiothoracic intensive care", "Hold FRCA", "Be cardiac surgeons"], correctIndex: 1, explanation: "Chapter 1.8 minimum standard 1." },
  { question: "In the 2019/20 National Schedule, cardiac surgical units (CCU06) averaged:", options: ["£1,660 per bed day", "£2,303 per bed day", "£917 per bed day", "£1,087 per bed day"], correctIndex: 0, explanation: "168,333 adult bed days at about £1,660; the one-organ row was £1,215.90." },
];

export default function IcuCardiacUnitTopic() {
  return <TopicTemplate title="The Cardiothoracic ICU: Staffing and Costs" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-by-unit" backLabel="ICU Staffing by Unit Type" accentColor="text-icu" topicId="icu-cardiac-unit" topicTitle="The Cardiothoracic ICU: Staffing and Costs"
    objectives={["List the GPICS V3 cardiothoracic staffing additions over the general baseline", "Explain the CALS and chest-reopening requirement", "Describe perfusion and theatre support for emergency resternotomy", "Quote the NHS 2019/20 cost of a cardiac surgical critical care bed day"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 cardiothoracic consultant", "NCC 2019/20 specialist one-organ rows"] }}
    keyPoints={[
      { text: "General GPICS staffing ratios apply; the chapter adds a cardiothoracic surgeon alongside the on-site doctor/ACCP", cites: ["GPICS V3 cardiothoracic consultant"] },
      { text: "On-site rota must be CALS-trained and capable of chest reopening 24/7", cites: ["GPICS V3 cardiothoracic skills"] },
      { text: "Perfusion services, theatre staff and facilities for emergency resternotomy and bypass readily available 24/7", cites: ["GPICS V3 cardiothoracic perfusion"] },
      { text: "Care directed by a job-planned cardiothoracic ICM consultant through a 7/7 multidisciplinary ward round", cites: ["GPICS V3 cardiothoracic ward round"] },
      { text: "NHS 2019/20: cardiac surgical units averaged about £1,660 per bed day across 168,333 bed days", cites: ["NCC 2019/20 specialist one-organ rows"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Staffing quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026), chapter 1.8; costs come from NHS England's National Schedule of NHS Costs 2019/20. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="cardiac-staffing" exams={exams}><CollapsibleSubsection title="1. Staffing: GPICS V3 cardiothoracic intensive care" defaultOpen><CardiacUnitStaffingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cardiac-cost" exams={exams}><CollapsibleSubsection title="2. Cost: cardiac surgical critical care"><CardiacUnitCostTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
