import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ResusRecognitionTeaching, ResusAntimicrobialTeaching, ResusCirculationTeaching, ResusVentilationTeaching } from "@/components/topic/SepsisResuscitationTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "SSC 2021 timing for antimicrobials in possible septic shock:", options: ["Within 6 h", "Within 3 h", "Immediately, ideally within 1 h", "After cultures and imaging are complete"], correctIndex: 2, explanation: "Recommended immediately, ideally within 1 h of recognition." },
  { question: "SSC 2021 initial crystalloid suggestion for sepsis-induced hypoperfusion:", options: ["At least 30 mL/kg within the first 3 h", "10 mL/kg once only", "60 mL/kg within 1 h", "No fluid before vasopressors"], correctIndex: 0, explanation: "A weak suggestion; give in steps with reassessment after each bolus." },
  { question: "Which screening approach does SSC 2021 recommend against?", options: ["NEWS", "qSOFA as a single screening tool", "SIRS", "MEWS"], correctIndex: 1, explanation: "qSOFA alone is not recommended compared with SIRS, NEWS or MEWS." },
  { question: "In Seymour 2017, which was NOT associated with lower risk-adjusted mortality?", options: ["Rapid antibiotics", "Rapid completion of the 3-hour bundle", "Rapid completion of an initial IV fluid bolus", "None of these"], correctIndex: 2, explanation: "Faster bolus completion was not associated with lower mortality." },
  { question: "In Shapiro 2005 (1,278 ED patients with infection), mortality with lactate ≥4.0 mmol/L was:", options: ["4.9%", "9.0%", "28.4%", "55%"], correctIndex: 2, explanation: "28.4% versus 4.9% below 2.5 and 9.0% between 2.5–4.0 mmol/L; lactate severity tracks mortality risk." },
  { question: "ARDSNet 2000 low-tidal-volume arm mean tidal volume (days 1–3):", options: ["About 6 mL/kg actual weight", "About 6 mL/kg predicted body weight", "About 10 mL/kg predicted body weight", "About 12 mL/kg actual weight"], correctIndex: 1, explanation: "6.2 ± 0.8 mL/kg predicted body weight; mortality 31.0% vs 39.8%." },
];

export default function SepsisResuscitationTopic() {
  return <TopicTemplate title="ICU Resuscitation: The First Hour of Septic Shock" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/sepsis" backLabel="Sepsis & Septic Shock" accentColor="text-icu" topicId="sepsis-resuscitation" topicTitle="ICU Resuscitation: The First Hour of Septic Shock"
    objectives={["Recognise septic shock and set lactate and capillary-refill baselines", "Give antimicrobials immediately, ideally within 1 h", "Give fluid in reassessed steps and start noradrenaline to a MAP of 65 mm Hg", "Intubate safely and apply lung-protective ventilation"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["Sepsis-3 2016 septic shock", "SSC 2021 (Antimicrobial timing)", "SSC 2021"], keyPoints: ["SSC 2021 (Antimicrobial timing)", "SSC 2021", "SSC 2021 MAP target", "ARDSNet 2000 settings"] }}
    keyPoints={[
      { text: "Start resuscitation on suspicion; do not wait for every Sepsis-3 criterion", cites: ["Sepsis-3 2016 septic shock", "SSC 2021 qSOFA screening"] },
      { text: "Antimicrobials immediately, ideally within 1 h, in possible septic shock", cites: ["SSC 2021 (Antimicrobial timing)", "Seymour 2017 NY sepsis mandate"] },
      { text: "At least 30 mL/kg crystalloid within 3 h is suggested; reassess after each bolus", cites: ["SSC 2021", "ESICM Shock 2014"] },
      { text: "MAP 65 mm Hg with noradrenaline first line; add vasopressin rather than escalating", cites: ["SSC 2021 MAP target", "SSC 2021 norepinephrine", "SSC 2021 vasopressin"] },
      { text: "If ventilated with ARDS: about 6 mL/kg predicted body weight and watch plateau pressure", cites: ["ARDSNet 2000 settings", "ARDSNet 2000 mortality"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page puts the first hour of septic-shock care in order. Detail lives on <Link to="/intensive-care/sepsis" className="text-primary underline">Sepsis &amp; Septic Shock</Link>, <Link to="/intensive-care/septic-shock" className="text-primary underline">Septic Shock: Vasopressors, MAP &amp; Steroids</Link> and <Link to="/intensive-care/mechanical-ventilation" className="text-primary underline">Mechanical Ventilation</Link>. In practice the steps happen in parallel. Quotations reuse verified records; the order and explanation are teaching synthesis, not a protocol or prescription.</p>
      <ExamSection id="resus-recognition" exams={exams}><CollapsibleSubsection title="1. Recognition and perfusion" defaultOpen><ResusRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="resus-antimicrobials" exams={exams}><CollapsibleSubsection title="2. Antimicrobials"><ResusAntimicrobialTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="resus-circulation" exams={exams}><CollapsibleSubsection title="3. Fluids and vasopressors"><ResusCirculationTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="resus-ventilation" exams={exams}><CollapsibleSubsection title="4. Airway and ventilation"><ResusVentilationTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
