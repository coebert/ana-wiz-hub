import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { GeneralUnitStaffingTeaching, GeneralUnitCostTeaching } from "@/components/topic/IcuUnitTypeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "GPICS V3 daytime consultant in ICM to patient ratio must not normally exceed:", options: ["1:4 to 1:6", "1:8 to 1:12", "1:15", "1:20"], correctIndex: 1, explanation: "Chapter 2.1 minimum standard: a range between 1:8 and 1:12." },
  { question: "GPICS V3 registered nurse:patient ratios are:", options: ["1:1 for all ICU patients", "1:1 level 3, 1:2 level 2", "1:2 level 3, 1:4 level 2", "Set locally with no minimum"], correctIndex: 1, explanation: "Chapter 2.5 minimum standards; a clinical shift leader with no patient allocation is also required 24/7." },
  { question: "An ICU with more than 10 beds must also have:", options: ["A second consultant on site", "At least one additional enhanced critical care nurse not allocated a patient", "A resident pharmacist", "Two shift leaders"], correctIndex: 1, explanation: "Chapter 2.5 minimum standard 7, repeated for each additional 10 beds." },
  { question: "The minimum clinical pharmacy provision per ICU bed is:", options: ["0.05 WTE", "0.14 WTE", "0.5 WTE", "1 WTE"], correctIndex: 1, explanation: "Chapter 2.7: minimum 0.14 WTE pharmacist per intensive care bed, with core services seven days a week." },
  { question: "In the 2019/20 National Schedule, general adult critical care (CCU01) cost on average:", options: ["£917 per bed day", "£1,689 per bed day", "£2,303 per bed day", "£3,040 per bed day"], correctIndex: 1, explanation: "838,376 adult bed days at a weighted average of about £1,689 (our arithmetic from published rows)." },
];

export default function IcuGeneralUnitTopic() {
  return <TopicTemplate title="The General Adult ICU: Staffing and Costs" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-by-unit" backLabel="ICU Staffing by Unit Type" accentColor="text-icu" topicId="icu-general-unit" topicTitle="The General Adult ICU: Staffing and Costs"
    objectives={["State the GPICS V3 baseline staffing standards that apply to every ICU", "Describe consultant, resident, nursing and pharmacy minimum standards", "Quote the NHS 2019/20 cost of a general adult critical care bed day", "Explain why unit-function costs cannot be read as per-diagnosis costs"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 consultant ratio", "NCC 2019/20 schedule"] }}
    keyPoints={[
      { text: "General adult ICUs work to the GPICS V3 general staffing chapters: consultant 1:8–1:12 by day, on-site doctor/ACCP no more than 1:8 around the clock", cites: ["GPICS V3 consultant ratio", "GPICS V3 resident ratio"] },
      { text: "Nursing: 1:1 for level 3 and 1:2 for level 2 patients, plus a clinical shift leader with no patient allocation", cites: ["GPICS V3 nurse ratios", "GPICS V3 coordinator"] },
      { text: "Units over 10 beds need at least one additional enhanced critical care nurse without a patient allocation", cites: ["GPICS V3 additional nurse"] },
      { text: "Pharmacy: minimum 0.14 WTE pharmacist per bed, core services seven days a week", cites: ["GPICS V3 pharmacist"] },
      { text: "NHS 2019/20: general adult critical care averaged about £1,689 per bed day across 838,376 bed days", cites: ["NCC 2019/20 general ICU by organs"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Staffing quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026); costs come from NHS England's National Schedule of NHS Costs 2019/20, with aggregates labelled as our arithmetic. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="general-staffing" exams={exams}><CollapsibleSubsection title="1. Staffing: the GPICS V3 baseline" defaultOpen><GeneralUnitStaffingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="general-cost" exams={exams}><CollapsibleSubsection title="2. Cost: general adult critical care"><GeneralUnitCostTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
