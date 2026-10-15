import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { CardiacOutputTeaching, PreloadAfterloadTeaching, BloodPressureControlTeaching } from "@/components/topic/SystemsPhysiologyTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  {"question": "Cardiac output equals:", "options": ["HR + SV", "HR × SV", "SV ÷ HR", "MAP × SVR"], "correctIndex": 1, "explanation": "Heart rate × stroke volume."},
  {"question": "Normal stroke volume per OpenStax:", "options": ["10–30 mL", "55–100 mL", "150–200 mL", "250 mL"], "correctIndex": 1, "explanation": "Mean CO 5.25 L/min, range 4.0–8.0."},
  {"question": "Frank–Starling: force of contraction is proportional to:", "options": ["Heart rate", "Initial fibre length", "Afterload", "Calcium only"], "correctIndex": 1, "explanation": "Within physiological limits."},
  {"question": "Which increases afterload?", "options": ["Vasodilatation", "Aortic stenosis", "Bradycardia", "Hypovolaemia"], "correctIndex": 1, "explanation": "Stenosis makes the valve harder to open."},
  {"question": "Main vascular baroreceptors lie in:", "options": ["Pulmonary veins", "Aortic and carotid sinuses", "Coronary arteries", "Renal arteries"], "correctIndex": 1, "explanation": "They respond to stretch."},
];

export default function CardiovascularSystemOverviewTopic() {
  return <TopicTemplate title="Cardiovascular System Overview: Cardiac Output & Blood Pressure" subtitle="Primary / Final / FFICM — Basic Sciences" backPath="/physiology/physiology-overview" backLabel="Physiology Overview" accentColor="text-physiology" topicId="cardiovascular-system-overview" topicTitle="Cardiovascular System Overview: Cardiac Output & Blood Pressure"
    objectives={["Calculate cardiac output from heart rate and stroke volume", "State the Frank–Starling mechanism", "Define afterload", "Describe mean arterial pressure and the baroreceptor reflex"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    keyPoints={[
      {"text": "CO = HR × SV; mean resting CO about 5.25 L/min per ventricle", "cites": ["OpenStax cardiac output", "OpenStax CO values"]},
      {"text": "Greater fibre stretch, within limits, gives a stronger contraction", "cites": ["OpenStax Frank-Starling"]},
      {"text": "Afterload rises with vascular resistance or valve stenosis", "cites": ["OpenStax afterload"]},
      {"text": "Baroreceptors are stretch receptors that signal the cardiovascular centre", "cites": ["OpenStax baroreceptors"]},
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">A system-level overview that links to the detailed physiology pages. Quotations are word for word from the openly licensed OpenStax Anatomy and Physiology 2e textbook (CC BY 4.0); clinical links are teaching summaries, not guidelines.</p>
      <ExamSection id="cv-cardiac-output" exams={exams}><CollapsibleSubsection title="1. Cardiac output" defaultOpen><CardiacOutputTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cv-preload-afterload" exams={exams}><CollapsibleSubsection title="2. Preload, Frank–Starling and afterload"><PreloadAfterloadTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cv-blood-pressure" exams={exams}><CollapsibleSubsection title="3. Blood pressure and baroreceptors"><BloodPressureControlTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
