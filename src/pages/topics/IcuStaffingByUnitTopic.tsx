import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { UnitSummaryTeaching, UnitCardiothoracicTeaching, UnitNeuroBurnsTeaching, UnitRemoteEnhancedTeaching } from "@/components/topic/IcuStaffingByUnitTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "How does GPICS V3 set nurse staffing for cardiothoracic and neurocritical care units?", options: ["Their own higher ratios", "By the general staffing chapters", "1:1 for all patients", "Locally, with no minimum"], correctIndex: 1, explanation: "Both chapters state staffing must adhere to the minimum standards in the relevant staffing chapters of GPICS V3." },
  { question: "In a cardiothoracic ICU, in addition to the on-site doctor or ACCP, there must be:", options: ["A second ICM consultant", "A cardiothoracic surgeon", "A perfusionist on the unit", "An anaesthetist"], correctIndex: 1, explanation: "Minimum standard 3 of chapter 1.8; perfusion services must be readily available, not on the unit." },
  { question: "The cardiothoracic on-site rota must be trained in:", options: ["ATLS", "CALS and able to reopen the chest 24/7", "ECMO cannulation", "TOE accreditation"], correctIndex: 1, explanation: "Cardiac Surgery Advanced Life Support and chest reopening, 24/7. A TOE-competent clinician must be readily available, not every rota member." },
  { question: "Burns patients needing intensive care must be managed by:", options: ["The ICU consultant alone", "The burns surgeon alone", "Burns surgery and ICM consultants jointly", "A burns nurse specialist"], correctIndex: 2, explanation: "Joint consultant management with burns-specific training." },
  { question: "For smaller remote and rural ICUs, GPICS V3 requires:", options: ["A resident consultant", "ICM consultant advice 24/7 and network support", "Transfer of all level 3 patients", "No on-site rota"], correctIndex: 1, explanation: "Consultant advice 24/7, network support, and a dedicated 24/7 on-site doctor/ACCP rota." },
  { question: "The enhanced care nurse:patient ratio in GPICS V3 is:", options: ["1:2", "1:3", "1:4", "Not fixed — matched to acuity and workload"], correctIndex: 3, explanation: "Recommendation 3 of chapter 1.12; the minimum standards cover leadership and twice-daily review." },
];

export default function IcuStaffingByUnitTopic() {
  return <TopicTemplate title="ICU Staffing by Unit Type: GPICS V3" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-ratios" backLabel="ICU Staffing Ratios" accentColor="text-icu" topicId="icu-staffing-by-unit" topicTitle="ICU Staffing by Unit Type: GPICS V3"
    objectives={["Explain how GPICS V3 specialist chapters build on the general staffing standards", "List the additional staffing for cardiothoracic, neuro and burns intensive care", "Describe staffing standards for smaller remote and rural units", "Distinguish enhanced care requirements from level 2 and 3 ratios"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 cardiothoracic consultant", "GPICS V3 neuro staffing", "GPICS V3 remote consultant", "GPICS V3 enhanced nurse ratio"] }}
    keyPoints={[
      { text: "Specialist units keep the general GPICS staffing ratios and add unit-specific roles", cites: ["GPICS V3 cardiothoracic consultant", "GPICS V3 neuro staffing"] },
      { text: "Cardiothoracic: cardiothoracic surgeon on site with the ICU doctor/ACCP; CALS-trained rota able to reopen the chest 24/7", cites: ["GPICS V3 cardiothoracic consultant", "GPICS V3 cardiothoracic skills"] },
      { text: "Neuro: consultant trained in neuro intensive care leads a 7/7 ward round; access to listed neuroscience specialties", cites: ["GPICS V3 neuro ward round", "GPICS V3 neuro specialists"] },
      { text: "Burns: joint burns surgery and ICM consultant management", cites: ["GPICS V3 burns joint care"] },
      { text: "Remote and rural: ICM consultant advice 24/7, network support and a dedicated on-site rota", cites: ["GPICS V3 remote consultant"] },
      { text: "Enhanced care: no fixed nurse ratio; lead clinician and nurse, twice-daily senior review", cites: ["GPICS V3 enhanced nurse ratio", "GPICS V3 enhanced review"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page complements <Link to="/intensive-care/icu-staffing-ratios" className="text-primary underline">ICU Staffing Ratios</Link>, which covers each role in a general ICU. Quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026), checked 15 October 2026; the summary table is teaching synthesis. GPICS V3 covers adult intensive care; local commissioning and specialist service specifications also apply. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="unit-summary" exams={exams}><CollapsibleSubsection title="1. Summary by unit type" defaultOpen><UnitSummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="unit-cardiothoracic" exams={exams}><CollapsibleSubsection title="2. Cardiothoracic intensive care"><UnitCardiothoracicTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="unit-neuro-burns" exams={exams}><CollapsibleSubsection title="3. Neurocritical care and burns"><UnitNeuroBurnsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="unit-remote-enhanced" exams={exams}><CollapsibleSubsection title="4. Remote and rural units, and enhanced care"><UnitRemoteEnhancedTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
