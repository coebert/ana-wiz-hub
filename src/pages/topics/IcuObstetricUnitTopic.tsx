import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ObstetricUnitStaffingTeaching, ObstetricUnitCostTeaching } from "@/components/topic/IcuUnitTypeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "GPICS V3 staffing for obstetric critical care is set by:", options: ["A dedicated obstetric chapter", "The general staffing chapters", "The enhanced care chapter only", "RCOG standards within GPICS"], correctIndex: 1, explanation: "GPICS V3 has no obstetric chapter; the general staffing chapters apply." },
  { question: "A consultant/specialist responsible for the ICU must be immediately available 24/7, meaning:", options: ["Resident on site", "Continually contactable and, if non-resident, able to attend within 30 minutes", "Available by phone in hours", "On site for ward rounds only"], correctIndex: 1, explanation: "Chapter 2.1 minimum standard 8." },
  { question: "In the 2019/20 National Schedule, obstetric and gynaecology critical care (CCU12) averaged:", options: ["£1,620 per bed day", "£1,760 per bed day", "£2,303 per bed day", "£1,087 per bed day"], correctIndex: 2, explanation: "The highest unit-function average, from the smallest group (8,008 bed days)." },
  { question: "The published one-organ (XC06Z) cost for obstetric and gynaecology critical care in 2019/20 was:", options: ["£1,215.90", "£976.14", "£3,039.99", "£1,303.41"], correctIndex: 2, explanation: "Published CCU12 XC06Z row value." },
  { question: "Why can the obstetric unit average not be read as the cost of a critically ill pregnant patient?", options: ["It includes neonatal care", "Unit function describes the unit's predominant patient type, not each diagnosis, and the group is very small", "It is a US figure", "It excludes staffing"], correctIndex: 1, explanation: "8,008 bed days from few trusts; the schedule describes unit function, not diagnosis." },
];

export default function IcuObstetricUnitTopic() {
  return <TopicTemplate title="Obstetric Critical Care: Staffing and Costs" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-by-unit" backLabel="ICU Staffing by Unit Type" accentColor="text-icu" topicId="icu-obstetric-unit" topicTitle="Obstetric Critical Care: Staffing and Costs"
    objectives={["Explain why obstetric critical care works to the general GPICS V3 staffing chapters", "State the baseline consultant, resident, nursing and pharmacy standards", "Quote the NHS 2019/20 cost of an obstetric and gynaecology critical care bed day", "Describe the limits of the smallest unit-function cost group"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 consultant ratio", "NCC 2019/20 specialist one-organ rows"] }}
    keyPoints={[
      { text: "GPICS V3 has no obstetric chapter; the general staffing chapters apply", cites: ["GPICS V3 consultant ratio"] },
      { text: "Baseline ratios: consultant 1:8–1:12 by day, on-site doctor/ACCP no more than 1:8 around the clock", cites: ["GPICS V3 consultant ratio", "GPICS V3 resident ratio"] },
      { text: "Nursing 1:1 level 3 and 1:2 level 2, with a clinical shift leader who has no patient allocation", cites: ["GPICS V3 nurse ratios", "GPICS V3 coordinator"] },
      { text: "NHS 2019/20: obstetric and gynaecology units averaged about £2,303 per bed day — the highest unit-function average", cites: ["NCC 2019/20 specialist one-organ rows"] },
      { text: "The smallest group (8,008 bed days), so the most sensitive to individual trusts' accounting", cites: ["NCC 2019/20 schedule"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Staffing quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026) general staffing chapters; costs come from NHS England's National Schedule of NHS Costs 2019/20. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="obstetric-staffing" exams={exams}><CollapsibleSubsection title="1. Staffing: the general GPICS V3 standards" defaultOpen><ObstetricUnitStaffingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="obstetric-cost" exams={exams}><CollapsibleSubsection title="2. Cost: obstetric and gynaecology critical care"><ObstetricUnitCostTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
