import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { RenalFiltrationTeaching, RenalConcentrationTeaching, RenalHormonesTeaching } from "@/components/topic/SystemsPhysiologyTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  {"question": "Average GFR in males per OpenStax:", "options": ["About 25 mL/min", "About 125 mL/min", "About 500 mL/min", "About 1 L/min"], "correctIndex": 1, "explanation": "125 mL/min (range 90–140); 105 mL/min in females."},
  {"question": "Net filtration pressure (OpenStax worked values):", "options": ["55 mmHg", "30 mmHg", "10 mmHg", "0 mmHg"], "correctIndex": 2, "explanation": "55 − (15 + 30) = 10 mmHg."},
  {"question": "Renin is produced by:", "options": ["Principal cells", "Juxtaglomerular cells of the afferent arteriole", "Posterior pituitary", "Liver"], "correctIndex": 1, "explanation": "It converts angiotensinogen (made by the liver) to angiotensin I."},
  {"question": "ADH increases water reabsorption by:", "options": ["Blocking Na⁺ pumps", "Inserting aquaporins in collecting-duct principal cells", "Raising GFR", "Dilating the efferent arteriole"], "correctIndex": 1, "explanation": "Water then moves by osmosis into the medullary interstitium."},
  {"question": "In blood loss, angiotensin II:", "options": ["Raises GFR", "Reduces GFR and renal blood flow to preserve volume", "Has no renal effect", "Dilates both arterioles"], "correctIndex": 1, "explanation": "It constricts afferent and efferent arterioles."},
];

export default function RenalSystemOverviewTopic() {
  return <TopicTemplate title="Renal System Overview: Filtration, Concentration & Hormonal Control" subtitle="Primary / Final / FFICM — Basic Sciences" backPath="/physiology/physiology-overview" backLabel="Physiology Overview" accentColor="text-physiology" topicId="renal-system-overview" topicTitle="Renal System Overview: Filtration, Concentration & Hormonal Control"
    objectives={["Quote normal GFR and daily filtrate volume", "Calculate net filtration pressure from its components", "Explain the countercurrent multiplier", "Describe the actions of renin, angiotensin II and ADH"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    keyPoints={[
      {"text": "About 180 L/day is filtered and 99% reabsorbed, leaving 1–2 L of urine", "cites": ["OpenStax GFR value"]},
      {"text": "Net filtration pressure is only about 10 mmHg", "cites": ["OpenStax NFP equation"]},
      {"text": "The loop of Henle and vasa recta form a countercurrent multiplier", "cites": ["OpenStax countercurrent"]},
      {"text": "Angiotensin II and ADH conserve volume and support blood pressure", "cites": ["OpenStax angiotensin II", "OpenStax ADH"]},
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">A system-level overview that links to the detailed physiology pages. Quotations are word for word from the openly licensed OpenStax Anatomy and Physiology 2e textbook (CC BY 4.0); clinical links are teaching summaries, not guidelines.</p>
      <ExamSection id="renal-filtration" exams={exams}><CollapsibleSubsection title="1. Glomerular filtration" defaultOpen><RenalFiltrationTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="renal-concentration" exams={exams}><CollapsibleSubsection title="2. Reabsorption and concentrating urine"><RenalConcentrationTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="renal-hormones" exams={exams}><CollapsibleSubsection title="3. Renin–angiotensin–aldosterone and ADH"><RenalHormonesTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
