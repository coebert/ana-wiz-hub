import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { TempPhKwTeaching, TempPhBloodTeaching, TempPhStatTeaching } from "@/components/topic/TemperaturePhTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  { question: "Why does the pH of pure water fall as it is warmed?", options: ["It absorbs CO₂", "Self-ionisation is endothermic, so Kw rises and [H⁺] increases", "Hydroxide evaporates", "It becomes acidic"], correctIndex: 1, explanation: "OpenStax: ionisation is endothermic, so [H⁺] and [OH⁻] both rise with temperature. The water stays neutral." },
  { question: "Approximately what is neutral pH at 37 °C?", options: ["7.4", "7.0", "6.8", "6.1"], correctIndex: 2, explanation: "Neutral pH = ½ pKw; with Kw ≈ 2.4 × 10⁻¹⁴ at 37 °C (textbook value) this is about 6.8." },
  { question: "A closed blood sample is cooled. What happens?", options: ["pH falls, PaCO₂ rises", "pH rises, PaCO₂ falls", "Both unchanged", "pH falls, PaCO₂ falls"], correctIndex: 1, explanation: "CO₂ becomes more soluble so its partial pressure falls, and pH rises (roughly 0.015 per °C, a textbook approximation)." },
  { question: "Alpha-stat management aims for:", options: ["Temperature-corrected pH 7.40", "Uncorrected (37 °C) pH 7.40 and PaCO₂ ~5.3 kPa", "Adding CO₂ to the oxygenator", "Maximal cerebral blood flow"], correctIndex: 1, explanation: "Alpha-stat uses values measured at 37 °C, keeping histidine imidazole ionisation constant and preserving autoregulation." },
  { question: "A recognised disadvantage of pH-stat in adult circulatory arrest is:", options: ["Poor brain cooling", "Impaired cerebral autoregulation with risk of hyperaemia or microembolism", "Hypokalaemia", "Reduced oxygen solubility"], correctIndex: 1, explanation: "Quoted from Chatzopoulou 2025: pH-stat's benefit 'may be offset by impaired cerebral autoregulation and an increased risk of hyperemia or microembolism formation'." },
];

export default function TemperaturePhTopic() {
  return <TopicTemplate title="Temperature & pH" subtitle="Primary / Final / FFICM — Chemistry" backPath="/chemistry/acids-bases-buffers" backLabel="Acids, Bases & Buffers" accentColor="text-physics" topicId="temperature-ph" topicTitle="Temperature & pH"
    objectives={["Explain why neutral pH depends on temperature through Kw", "Predict how cooling changes pH and PaCO₂ in a closed blood sample", "Compare alpha-stat and pH-stat management and their cerebral effects"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["OpenStax Chemistry 2e Kw", "Chatzopoulou 2025 alpha/pH-stat"], keyPoints: ["OpenStax Chemistry 2e Kw", "StatPearls Acid-Base 2022", "Chatzopoulou 2025 alpha/pH-stat"] }}
    keyPoints={[
      { text: "Water self-ionisation is endothermic, so Kw rises and neutral pH falls with temperature", cites: ["OpenStax Chemistry 2e Kw"] },
      { text: "Normal blood pH is 7.35–7.45 at 37 °C — alkaline to neutral (about 6.8 at 37 °C, textbook value)", cites: ["StatPearls Acid-Base 2022"] },
      { text: "Alpha-stat preserves the physiological pH rise with cooling and supports cerebral autoregulation; pH-stat risks hyperaemia and microembolism in adults", cites: ["Chatzopoulou 2025 alpha/pH-stat"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page expands the short lesson on <Link to="/chemistry/acids-bases-buffers" className="text-primary underline">Acids, Bases &amp; Buffers</Link>. Quotations are the sources' own wording and reuse that page's verified records; numerical constants are standard textbook values, labelled as such.</p>
      <ExamSection id="temp-ph-kw" exams={exams}><CollapsibleSubsection title="Kw and neutral pH" defaultOpen><TempPhKwTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="temp-ph-blood" exams={exams}><CollapsibleSubsection title="Cooling a blood sample and temperature correction"><TempPhBloodTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="temp-ph-stat" exams={exams}><CollapsibleSubsection title="Alpha-stat versus pH-stat"><TempPhStatTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
