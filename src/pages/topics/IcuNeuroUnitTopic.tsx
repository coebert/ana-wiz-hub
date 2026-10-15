import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { NeuroUnitStaffingTeaching, NeuroUnitCostTeaching } from "@/components/topic/IcuUnitTypeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "GPICS V3 nurse:patient ratios in neurocritical care are:", options: ["Higher than general ICUs", "The general staffing chapter ratios", "1:1 for all patients", "Set locally with no minimum"], correctIndex: 1, explanation: "Chapter 1.9 minimum standard 1: staffing must adhere to the relevant staffing chapters of GPICS V3." },
  { question: "Consultants providing out-of-hours neurocritical care advice must have:", options: ["A neurosurgery fellowship", "Regular timetabled daytime sessions in neurocritical care", "A resident on-call rota", "FICM membership"], correctIndex: 1, explanation: "Chapter 1.9 minimum standard 2." },
  { question: "Care in each neuro intensive care area must be directed by:", options: ["Any ICM consultant", "A job-planned consultant trained in neuro intensive care, via a 7/7 ward round", "A neurosurgeon", "The nurse in charge"], correctIndex: 1, explanation: "Chapter 1.9 minimum standard 10." },
  { question: "Which is NOT on the GPICS V3 list of specialist services a neurocritical care unit must access?", options: ["Neurosurgery", "Stroke", "Neuroradiology", "Cardiothoracic surgery"], correctIndex: 3, explanation: "The list is neurosurgery, spinal surgery, neurology, stroke, diagnostic and interventional neuroradiology, neurophysiology and neurorehabilitation." },
  { question: "In the 2019/20 National Schedule, neurosciences units averaged:", options: ["£1,616 per bed day", "£2,303 per bed day", "£1,087 per bed day", "£917 per bed day"], correctIndex: 0, explanation: "69,779 adult bed days at about £1,616 — close to the all-unit average of £1,620." },
];

export default function IcuNeuroUnitTopic() {
  return <TopicTemplate title="The Neurocritical Care Unit: Staffing and Costs" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-by-unit" backLabel="ICU Staffing by Unit Type" accentColor="text-icu" topicId="icu-neuro-unit" topicTitle="The Neurocritical Care Unit: Staffing and Costs"
    objectives={["Explain how GPICS V3 neurocritical care staffing builds on the general baseline", "List the specialist services a neurocritical care unit must access", "Describe the consultant leadership requirements", "Quote the NHS 2019/20 cost of a neurosciences critical care bed day"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 neuro staffing", "NCC 2019/20 schedule"] }}
    keyPoints={[
      { text: "Neurocritical care keeps the general GPICS staffing ratios; its additions are consultant-specific", cites: ["GPICS V3 neuro staffing"] },
      { text: "Out-of-hours consultants must have regular daytime neurocritical care sessions", cites: ["GPICS V3 neuro staffing"] },
      { text: "Access required to neurosurgery, spinal surgery, neurology, stroke, neuroradiology, neurophysiology and neurorehabilitation", cites: ["GPICS V3 neuro specialists"] },
      { text: "Care directed by a job-planned consultant trained in neuro intensive care, 7/7 ward round", cites: ["GPICS V3 neuro ward round"] },
      { text: "NHS 2019/20: neurosciences units averaged about £1,616 per bed day across 69,779 bed days", cites: ["NCC 2019/20 schedule"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Staffing quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026), chapter 1.9; costs come from NHS England's National Schedule of NHS Costs 2019/20. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="neuro-staffing" exams={exams}><CollapsibleSubsection title="1. Staffing: GPICS V3 neurocritical care" defaultOpen><NeuroUnitStaffingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="neuro-cost" exams={exams}><CollapsibleSubsection title="2. Cost: neurosciences critical care"><NeuroUnitCostTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
