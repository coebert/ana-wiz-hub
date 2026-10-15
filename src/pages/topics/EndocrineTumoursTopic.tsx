import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { PhaeoPhysiologyTeaching, PhaeoDiagnosisTeaching, PhaeoAnaesthesiaTeaching, CarcinoidTeaching } from "@/components/topic/EndocrineTumoursTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  {"question": "Which enzyme converts noradrenaline to adrenaline?", "options": ["Tyrosine hydroxylase", "PNMT", "COMT", "MAO"], "correctIndex": 1, "explanation": "PNMT, induced by adrenal cortisol (teaching synthesis)."},
  {"question": "What is the preferred first test when phaeochromocytoma is strongly suspected?", "options": ["Plasma fractionated metanephrines", "Urinary 5-HIAA", "Random plasma catecholamines", "CT abdomen"], "correctIndex": 0, "explanation": "High negative predictive value and simple (Gombert 2025)."},
  {"question": "Why should beta-blockade not be started before alpha-blockade?", "options": ["It causes hypoglycaemia", "Unopposed vasoconstriction can cause a hypertensive crisis", "It reduces metanephrines", "It blocks PNMT"], "correctIndex": 1, "explanation": "Quoted from Gombert 2025."},
  {"question": "Why may hypoglycaemia occur after phaeochromocytoma resection?", "options": ["Excess cortisol", "Catecholamines had suppressed insulin secretion", "Octreotide", "Phenoxybenzamine stimulates insulin"], "correctIndex": 1, "explanation": "The sudden fall in catecholamines unmasks insulin activity (Gombert 2025)."},
  {"question": "What did the 2022 meta-analysis find for prophylactic octreotide?", "options": ["Halved crisis risk", "No significant reduction in carcinoid crisis", "Increased mortality", "Eliminated crisis with infusion"], "correctIndex": 1, "explanation": "OR 0.73 (0.32–1.66), with no standard regimen used (Xu 2022)."},
];

export default function EndocrineTumoursTopic() {
  return <TopicTemplate title="Endocrine Tumours" subtitle="Primary / Final / FFICM — physiology and perioperative care" backPath="/perioperative/endocrine-disease" backLabel="Endocrine Co-Existing Disease" accentColor="text-clinical" topicId="endocrine-tumours" topicTitle="Endocrine Tumours"
    objectives={["Describe catecholamine synthesis and breakdown and the origin of phaeochromocytoma", "Choose the right biochemical test for phaeochromocytoma", "Prepare and anaesthetise a patient with phaeochromocytoma, including after resection", "Explain carcinoid physiology and the evidence on carcinoid crisis and octreotide"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["IJMS phaeo blockade 2025", "IJMS phaeo hypoglycaemia 2025"], keyPoints: ["IJMS phaeo blockade 2025", "IJMS phaeo hypoglycaemia 2025", "IJMS phaeo metanephrines 2025", "IJMS phaeo origin 2025", "Xu carcinoid crisis 2022"] }}
    keyPoints={[
      { text: "Phaeochromocytomas arise from adrenal medullary chromaffin cells", cites: ["IJMS phaeo origin 2025"] },
      { text: "Plasma metanephrines are preferred when suspicion is high", cites: ["IJMS phaeo metanephrines 2025"] },
      { text: "Alpha-blockade first; beta-blockade only after adequate alpha-blockade", cites: ["IJMS phaeo blockade 2025"] },
      { text: "Hypoglycaemia can follow resection as catecholamines fall", cites: ["IJMS phaeo hypoglycaemia 2025"] },
      { text: "Carcinoid crisis occurs in up to 20% of midgut NET surgery; prophylactic octreotide is unproven", cites: ["Xu carcinoid crisis 2022"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Physiology comes first, then perioperative management. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific advice. Return to <Link to="/perioperative/endocrine-disease" className="text-primary underline">Endocrine Co-Existing Disease</Link> for the overview.</p>
      <ExamSection id="endocrine-tumours-1" exams={exams}><CollapsibleSubsection title="Adrenal medulla and phaeochromocytoma physiology" defaultOpen><PhaeoPhysiologyTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="endocrine-tumours-2" exams={exams}><CollapsibleSubsection title="Diagnosing phaeochromocytoma"><PhaeoDiagnosisTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="endocrine-tumours-3" exams={exams}><CollapsibleSubsection title="Anaesthesia for phaeochromocytoma"><PhaeoAnaesthesiaTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="endocrine-tumours-4" exams={exams}><CollapsibleSubsection title="Carcinoid syndrome and carcinoid crisis"><CarcinoidTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
