import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { VentilationMechanicsTeaching, GasExchangeTeaching, GasTransportTeaching } from "@/components/topic/SystemsPhysiologyTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  {"question": "Boyle's law: at constant temperature, gas pressure is:", "options": ["Proportional to volume", "Inversely proportional to volume", "Independent of volume", "Proportional to temperature"], "correctIndex": 1, "explanation": "P = k/V."},
  {"question": "Dalton's law states that:", "options": ["Gas dissolves in proportion to pressure", "Total pressure is the sum of partial pressures", "Gas diffuses by molecular weight", "Pressure is inverse to volume"], "correctIndex": 1, "explanation": "Each gas exerts its own pressure."},
  {"question": "The Bohr effect means a lower pH:", "options": ["Inhibits oxygen release", "Promotes oxygen release from haemoglobin", "Has no effect", "Increases CO₂ binding"], "correctIndex": 1, "explanation": "Acidic tissues favour unloading."},
  {"question": "Fraction of CO₂ carried as bicarbonate:", "options": ["About 7%", "About 23%", "About 70%", "About 99%"], "correctIndex": 2, "explanation": "Made in red cells by carbonic anhydrase."},
  {"question": "Haldane effect: deoxygenated haemoglobin:", "options": ["Binds less CO₂", "Binds CO₂ more readily", "Releases bicarbonate", "Binds more oxygen"], "correctIndex": 1, "explanation": "Oxygenated haemoglobin does not readily bind CO₂."},
];

export default function RespiratorySystemOverviewTopic() {
  return <TopicTemplate title="Respiratory System Overview: Ventilation, Gas Exchange & Transport" subtitle="Primary / Final / FFICM — Basic Sciences" backPath="/physiology/physiology-overview" backLabel="Physiology Overview" accentColor="text-physiology" topicId="respiratory-system-overview" topicTitle="Respiratory System Overview: Ventilation, Gas Exchange & Transport"
    objectives={["Explain inspiration using pressure gradients and Boyle's law", "State Dalton's and Henry's laws", "Describe the Bohr and Haldane effects", "Describe CO₂ transport and chemical control of breathing"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    keyPoints={[
      {"text": "Air moves down pressure gradients between atmosphere, alveoli and pleura", "cites": ["OpenStax pulmonary ventilation", "OpenStax Boyle"]},
      {"text": "Total gas pressure is the sum of partial pressures", "cites": ["OpenStax Dalton"]},
      {"text": "Lower pH promotes oxygen release (Bohr)", "cites": ["OpenStax Bohr"]},
      {"text": "About 70% of CO₂ is carried as bicarbonate", "cites": ["OpenStax CO2 bicarbonate"]},
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">A system-level overview that links to the detailed physiology pages. Quotations are word for word from the openly licensed OpenStax Anatomy and Physiology 2e textbook (CC BY 4.0); clinical links are teaching summaries, not guidelines.</p>
      <ExamSection id="resp-ventilation" exams={exams}><CollapsibleSubsection title="1. How air moves" defaultOpen><VentilationMechanicsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="resp-gas-exchange" exams={exams}><CollapsibleSubsection title="2. Gas exchange and partial pressures"><GasExchangeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="resp-gas-transport" exams={exams}><CollapsibleSubsection title="3. Carrying oxygen and carbon dioxide"><GasTransportTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
