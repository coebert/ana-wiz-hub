import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { AdmissionProtocolTeaching, MonitoringProtocolTeaching, WeaningProtocolTeaching } from "@/components/topic/VentilationProtocolsTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "In the ARDS Network trial, what was mortality with lower vs traditional tidal volumes?", options: ["20% vs 25%", "31.0% vs 39.8%", "35% vs 36%", "39.8% vs 31.0%"], correctIndex: 1, explanation: "Lower tidal volumes (about 6 ml/kg PBW) reduced mortality from 39.8% to 31.0%." },
  { question: "What is the predicted body weight of a man 180 cm tall?", options: ["About 65 kg", "About 75 kg", "About 85 kg", "His actual weight"], correctIndex: 1, explanation: "50 + 0.91 × (180 − 152.4) ≈ 75 kg." },
  { question: "Plateau 26, PEEP 8 cmH₂O. What is the driving pressure?", options: ["8", "18", "26", "34"], correctIndex: 1, explanation: "ΔP = plateau − PEEP = 18 cmH₂O." },
  { question: "What did pairing sedation breaks with breathing trials achieve in the ABC trial?", options: ["No change", "3.1 more ventilator-free days, with more self-extubations", "Fewer self-extubations", "Longer ICU stay"], correctIndex: 1, explanation: "14.7 vs 11.6 days breathing without assistance; self-extubation 16 vs 6." },
  { question: "In the 2014 Cochrane review, where did protocolised weaning NOT reduce ventilation time?", options: ["Medical ICUs", "Surgical ICUs", "Mixed ICUs", "Neurosurgical ICUs"], correctIndex: 3, explanation: "Average 26% reduction, mainly in medical, surgical and mixed ICUs, but not neurosurgical ICUs." },
];

export default function VentilationProtocolsTopic() {
  return <TopicTemplate title="ICU Ventilation Protocols" subtitle="Final / FFICM / EDIC — Mechanical Ventilation" backPath="/intensive-care/mechanical-ventilation" backLabel="Mechanical Ventilation" accentColor="text-icu" topicId="ventilation-protocols" topicTitle="ICU Ventilation Protocols"
    objectives={["Describe a standardised admission ventilation protocol based on predicted body weight", "Calculate predicted body weight, driving pressure and compliance", "Explain what plateau and driving pressure monitoring can and cannot tell you", "Summarise the ABC trial and the evidence for protocolised and automated weaning"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["ARDSNet 2000 mortality", "Amato 2015 driving pressure", "ABC 2008 outcomes", "Blackwood 2014 Cochrane"] }}
    keyPoints={[
      { text: "Lower tidal volumes (6.2 vs 11.8 ml/kg PBW) reduced ARDS mortality from 39.8% to 31.0%", cites: ["ARDSNet 2000 mortality", "ARDSNet 2000 settings"] },
      { text: "Each ~7 cmH₂O rise in driving pressure was associated with higher mortality (RR 1.41), even with protective plateau pressures", cites: ["Amato 2015 driving pressure"] },
      { text: "Paired sedation breaks and breathing trials gave 3.1 more days breathing unassisted, with more self-extubations", cites: ["ABC 2008 outcomes", "ABC 2008 self-extubation"] },
      { text: "Protocolised weaning shortened ventilation by 26% on average, but not in neurosurgical ICUs", cites: ["Blackwood 2014 Cochrane"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons quote the trials and reviews word for word in the source popovers. Checklists, worked numbers and explanations are teaching reasoning, not your unit's protocol. Ventilator modes and the full weaning lesson stay on <Link to="/intensive-care/mechanical-ventilation" className="text-primary underline">Mechanical Ventilation</Link>.</p>
      <ExamSection id="vp-admission" exams={exams}><CollapsibleSubsection title="Standardised admission ventilation settings" defaultOpen><AdmissionProtocolTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="vp-monitoring" exams={exams}><CollapsibleSubsection title="Monitoring protocols: plateau and driving pressure"><MonitoringProtocolTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="vp-weaning" exams={exams}><CollapsibleSubsection title="Sedation and weaning protocols"><WeaningProtocolTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
