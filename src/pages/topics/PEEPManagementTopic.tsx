import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { Exam } from "@/data/curriculum";
import { PEEPFoundationsTeaching, PEEPLungProtectionTeaching, PEEPTitrationTeaching, PEEPSettingsTeaching, PEEPSafetyTeaching } from "@/components/topic/PEEPManagementTeaching";
import { PEEPCaseTeaching } from "@/components/topic/PEEPCaseTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Set PEEP is 6 and a valid end-expiratory hold measures 14 cmH₂O. Intrinsic PEEP is:", options: ["6", "8", "14", "20"], correctIndex: 1, explanation: "Intrinsic PEEP = measured total PEEP minus external PEEP: 14 − 6 = 8 cmH₂O. The hold requires passive conditions." },
  { question: "ATS 2024 suggests which approach in moderate-to-severe ARDS?", options: ["Higher PEEP with routine prolonged recruitment", "Higher PEEP without lung recruitment manoeuvres", "Zero PEEP", "A universal PEEP of 15"], correctIndex: 1, explanation: "The higher-PEEP recommendation is conditional, without recruitment manoeuvres; prolonged recruitment is strongly recommended against." },
  { question: "At rate 20/min and inspiratory time 1 s, expiratory time is:", options: ["1 s", "2 s", "3 s", "4 s"], correctIndex: 1, explanation: "Cycle duration is 60/20 = 3 s, leaving 3 − 1 = 2 s for expiration. This arithmetic does not predict auto-PEEP." },
  { question: "For passive measurements, driving pressure subtracts which pressure from plateau?", options: ["Peak", "Set PEEP regardless of trapping", "Total PEEP", "Mean airway pressure"], correctIndex: 2, explanation: "Use total PEEP, measured under valid passive conditions. Subtracting only set PEEP can overestimate driving pressure when intrinsic PEEP is present." },
  { question: "After a PEEP increase, oxygenation improves but hypotension develops and compliance worsens. The best interpretation is:", options: ["Recruitment is proven", "Keep increasing PEEP until saturation reaches 100%", "Reassess haemodynamic cost and overdistension; the change is not an uncomplicated success", "Ignore blood pressure"], correctIndex: 2, explanation: "Oxygenation alone is not sufficient. Clinical reassessment and stopping/reversing poorly tolerated changes are part of supervised titration." },
];

export default function PEEPManagementTopic() {
  return <TopicTemplate title="PEEP Management" subtitle="FRCA Final / FFICM / EDIC — Mechanical Ventilation" backPath="/intensive-care/mechanical-ventilation" backLabel="Mechanical Ventilation" accentColor="text-icu" topicId="peep-management" topicTitle="PEEP Management"
    objectives={["Distinguish set, total and intrinsic PEEP and recognise when pressure holds are unreliable", "Combine PEEP with predicted-body-weight tidal volume and plateau-pressure limits in adult ARDS", "Interpret ATS and ESICM recommendations, recruitment risks and individual titration responses", "Explain how rate, volume, flow, inspiratory time, pressure support and external PEEP affect incomplete expiration"]}
    keyPoints={[
      { text: "In adult ARDS, use tidal volume 4–8 mL/kg predicted body weight and plateau pressure below 30 cmH₂O", cites: ["ATS 2024 protection"] },
      { text: "ATS conditionally suggests higher PEEP without recruitment in moderate-to-severe ARDS; prolonged recruitment manoeuvres are strongly recommended against", cites: ["ATS 2024 higher PEEP", "ATS 2024 recruitment"] },
      { text: "In severe airflow obstruction, reduce gas trapping by limiting minute ventilation and allowing expiration; external PEEP needs careful individual assessment", cites: ["Stather 2005 expiration", "Stather 2005 external PEEP"] },
    ]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["ATS 2024 protection", "ATS 2024 higher PEEP", "Stather 2005 measurement", "Stather 2005 expiration"], diagrams: ["Stather 2005 expiration"] }}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">PEEP decisions balance lung recruitment against overdistension and circulatory cost. These adult ICU lessons complement <Link to="/intensive-care/mechanical-ventilation" className="text-primary underline">Mechanical Ventilation</Link> and <Link to="/intensive-care/ards" className="text-primary underline">ARDS &amp; Lung Injury</Link>; practical sequences are teaching synthesis, not patient-specific prescriptions.</p>
      <ExamSection id="peep-foundations" exams={exams}><CollapsibleSubsection title="PEEP foundations and bedside measurement" defaultOpen><PEEPFoundationsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="peep-lung-protection" exams={exams}><CollapsibleSubsection title="PEEP within lung-protective ventilation"><PEEPLungProtectionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="peep-titration" exams={exams}><CollapsibleSubsection title="PEEP titration and response assessment"><PEEPTitrationTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="peep-settings" exams={exams}><CollapsibleSubsection title="Ventilator settings that influence PEEP"><PEEPSettingsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="peep-safety" exams={exams}><CollapsibleSubsection title="Recruitment risks and obstructive lung disease"><PEEPSafetyTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="peep-cases" exams={exams}><CollapsibleSubsection title="ICU cases — bronchospasm, intrinsic PEEP and mode transitions"><PEEPCaseTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}