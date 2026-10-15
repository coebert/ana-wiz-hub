import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { AdrenalCrisisRecognitionTeaching, AdrenalCrisisTreatmentTeaching, AdrenalCrisisRecoveryTeaching, AdrenalCrisisVsSepsisTeaching } from "@/components/topic/AdrenalCrisisTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  {"question": "What is the Society for Endocrinology 2016 initial hydrocortisone regimen in adult adrenal crisis?", "options": ["50 mg orally", "100 mg IV or IM immediately, then 200 mg per 24 h by continuous infusion (or 50 mg every 6 h)", "300 mg IV then 100 mg 8-hourly", "Dexamethasone 4 mg"], "correctIndex": 1, "explanation": "Quoted from the guidance; the 300 mg regimen is the thyroid storm (ATA) regimen."},
  {"question": "Which electrolyte finding is expected in primary but not secondary adrenal insufficiency?", "options": ["Hyponatraemia", "Hyperkalaemia", "Hypoglycaemia", "Hypercalcaemia"], "correctIndex": 1, "explanation": "Primary disease loses aldosterone too; secondary insufficiency preserves it, so potassium is usually normal."},
  {"question": "Which patient is at risk of adrenal crisis despite normal adrenal glands?", "options": ["Prednisolone 10 mg daily for 6 months", "Prednisolone 5 mg for 3 days", "A single dose of dexamethasone at induction", "Inhaled salbutamol"], "correctIndex": 0, "explanation": "≥5 mg prednisolone equivalent for more than 4 weeks switches off pituitary drive."},
  {"question": "When does the guidance say to start fludrocortisone in primary adrenal insufficiency?", "options": ["Immediately with the first hydrocortisone dose", "When the daily hydrocortisone dose falls below 50 mg", "Never in the acute setting", "Only if sodium is below 120 mmol/L"], "correctIndex": 1, "explanation": "Higher hydrocortisone doses provide enough mineralocorticoid activity; start 100 micrograms daily once below 50 mg/24 h."},
  {"question": "A patient with known Addison's disease is in septic shock. How should hydrocortisone be viewed?", "options": ["Optional, as Surviving Sepsis only 'suggests' it", "As essential hormone replacement: give 100 mg immediately", "Contraindicated because of infection", "Only after vasopressors fail"], "correctIndex": 1, "explanation": "Replacement in known adrenal insufficiency is lifesaving; the septic-shock suggestion is for patients without known insufficiency."},
];

export default function AdrenalCrisisTopic() {
  return <TopicTemplate title="Adrenal Crisis" subtitle="Final / FFICM / EDIC — Endocrine Emergencies" backPath="/intensive-care/icu-endocrine-emergencies" backLabel="Endocrine Emergencies" accentColor="text-icu" topicId="adrenal-crisis" topicTitle="Adrenal Crisis"
    objectives={["Recognise adrenal crisis in primary, secondary and steroid-induced adrenal insufficiency", "Give hydrocortisone and fluids immediately without waiting for tests", "Taper safely, start fludrocortisone when indicated and teach sick-day rules", "Distinguish hydrocortisone replacement from the septic-shock adjunct"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["SfE crisis definition 2016", "SfE crisis immediate treatment 2016"], keyPoints: ["SfE crisis immediate treatment 2016", "SfE crisis hydrocortisone 2016", "SfE crisis fluids 2016", "SfE secondary insufficiency 2016", "SfE crisis sick day 2016"] }}
    keyPoints={[
      { text: "Never delay hydrocortisone for diagnostic tests", cites: ["SfE crisis immediate treatment 2016"] },
      { text: "Hydrocortisone 100 mg IV/IM immediately, then 200 mg per 24 h by infusion or 50 mg every 6 h", cites: ["SfE crisis hydrocortisone 2016"] },
      { text: "1 litre isotonic saline in the first hour, usually 4–6 L in 24 h", cites: ["SfE crisis fluids 2016"] },
      { text: "Steroids at ≥5 mg prednisolone equivalent for more than 4 weeks suppress the pituitary–adrenal axis", cites: ["SfE secondary insufficiency 2016"] },
      { text: "Missed sick-day rules are a leading cause of crisis", cites: ["SfE crisis sick day 2016"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons adopt the Society for Endocrinology 2016 adrenal crisis guidance, and contrast it with the Surviving Sepsis Campaign 2021 steroid recommendations. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific prescription. Return to <Link to="/intensive-care/icu-endocrine-emergencies" className="text-primary underline">Endocrine Emergencies</Link> for the other endocrine emergencies.</p>
      <ExamSection id="crisis-recognition" exams={exams}><CollapsibleSubsection title="Recognition and who is at risk" defaultOpen><AdrenalCrisisRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="crisis-treatment" exams={exams}><CollapsibleSubsection title="Immediate treatment: hydrocortisone and fluids"><AdrenalCrisisTreatmentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="crisis-recovery" exams={exams}><CollapsibleSubsection title="Recovery, fludrocortisone and preventing the next crisis"><AdrenalCrisisRecoveryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="crisis-vs-sepsis" exams={exams}><CollapsibleSubsection title="Replacement versus the septic-shock adjunct"><AdrenalCrisisVsSepsisTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
