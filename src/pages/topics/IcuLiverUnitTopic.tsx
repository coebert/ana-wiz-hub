import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { LiverUnitStaffingTeaching, LiverUnitCostTeaching } from "@/components/topic/IcuUnitTypeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Which GPICS V3 chapter sets liver ICU staffing?", options: ["Chapter 1.8", "Chapter 1.9", "A dedicated liver chapter", "None — the general staffing chapters apply"], correctIndex: 3, explanation: "GPICS V3 has specialist chapters for cardiothoracic, neuro, burns, remote/rural and enhanced care, but none for liver intensive care." },
  { question: "The GPICS V3 daytime consultant:patient ratio in a liver ICU is:", options: ["1:8 to 1:12", "1:4", "1:15", "Not defined anywhere"], correctIndex: 0, explanation: "The general chapter 2.1 minimum standard applies." },
  { question: "Nurse:patient ratios in a liver ICU follow:", options: ["A liver-specific ratio", "1:1 level 3 and 1:2 level 2, as for all ICUs", "1:2 for all patients", "Local policy only"], correctIndex: 1, explanation: "Chapter 2.5 minimum standards apply to every ICU." },
  { question: "In the 2019/20 National Schedule, liver units averaged:", options: ["£1,300 per bed day", "£1,760 per bed day", "£2,303 per bed day", "£917 per bed day"], correctIndex: 1, explanation: "8,376 adult bed days at about £1,760 — above the general average." },
  { question: "Why should the liver unit cost average be treated cautiously?", options: ["It includes paediatric patients", "It rests on few trust submissions, so one hospital's accounting can move it", "It is a tariff, not a cost", "It dates from the 1990s"], correctIndex: 1, explanation: "Only 8,376 bed days from a handful of specialist centres; the figure is descriptive." },
];

export default function IcuLiverUnitTopic() {
  return <TopicTemplate title="The Liver ICU: Staffing and Costs" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-by-unit" backLabel="ICU Staffing by Unit Type" accentColor="text-icu" topicId="icu-liver-unit" topicTitle="The Liver ICU: Staffing and Costs"
    objectives={["Explain why liver ICUs work to the general GPICS V3 staffing chapters", "State the baseline consultant, resident, nursing and pharmacy standards", "Quote the NHS 2019/20 cost of a liver critical care bed day", "Describe the limits of small-group cost averages"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 consultant ratio", "NCC 2019/20 schedule"] }}
    keyPoints={[
      { text: "GPICS V3 has no liver-specific chapter; the general staffing chapters apply", cites: ["GPICS V3 consultant ratio"] },
      { text: "Baseline ratios: consultant 1:8–1:12 by day, on-site doctor/ACCP no more than 1:8 around the clock", cites: ["GPICS V3 consultant ratio", "GPICS V3 resident ratio"] },
      { text: "Nursing 1:1 level 3 and 1:2 level 2, with a clinical shift leader who has no patient allocation", cites: ["GPICS V3 nurse ratios", "GPICS V3 coordinator"] },
      { text: "NHS 2019/20: liver units averaged about £1,760 per bed day across 8,376 bed days", cites: ["NCC 2019/20 schedule"] },
      { text: "Small specialist groups rest on few trust submissions — descriptive, not per-condition costs", cites: ["NCC 2019/20 schedule"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Staffing quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026) general staffing chapters; costs come from NHS England's National Schedule of NHS Costs 2019/20. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="liver-staffing" exams={exams}><CollapsibleSubsection title="1. Staffing: the general GPICS V3 standards" defaultOpen><LiverUnitStaffingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="liver-cost" exams={exams}><CollapsibleSubsection title="2. Cost: liver critical care"><LiverUnitCostTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
