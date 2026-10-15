import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ThyroidSynthesisTeaching, ThyroidTestsTeaching, ThyroidPerioperativeTeaching, ThyroidPostopTeaching } from "@/components/topic/ThyroidFunctionTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  {"question": "What effect do rising T3 and T4 levels have on TSH?", "options": ["Increase TSH", "Decrease TSH", "No effect", "Increase TRH"], "correctIndex": 1, "explanation": "Negative feedback: rising T3 and T4 reduce TSH production and secretion (OpenStax)."},
  {"question": "Roughly what fraction of circulating T3 and T4 is unbound?", "options": ["Under 1%", "About 10%", "About 50%", "Over 90%"], "correctIndex": 0, "explanation": "Less than one percent is free; the rest is bound to TBG, albumin and other proteins (OpenStax)."},
  {"question": "Which pattern is typical of non-thyroidal illness in ICU?", "options": ["High TSH, low free T4", "Low TSH, high free T4", "Low T3 with normal or low TSH", "High T3, high TSH"], "correctIndex": 2, "explanation": "Low T3 with normal or low TSH is common in critical illness and is not treated with thyroid hormone (teaching synthesis)."},
  {"question": "By how long after thyroid surgery have approximately half of haematomas occurred?", "options": ["1 hour", "6 hours", "24 hours", "48 hours"], "correctIndex": 1, "explanation": "Most occur within 24 h, about half within 6 h (DAS 2022)."},
  {"question": "What does SCOOP stand for?", "options": ["Sit up, call, oxygen, open, pack", "Skin exposure, cut sutures, open skin, open muscles, pack wound", "Suction, call, oxygen, observe, prepare", "Staple removal, compress, observe, operate, pack"], "correctIndex": 1, "explanation": "Quoted from the DAS/BAETS/ENT-UK 2022 guideline."},
];

export default function ThyroidFunctionTopic() {
  return <TopicTemplate title="Thyroid Function" subtitle="Primary / Final / FFICM — physiology and perioperative care" backPath="/perioperative/endocrine-disease" backLabel="Endocrine Co-Existing Disease" accentColor="text-clinical" topicId="thyroid-function" topicTitle="Thyroid Function"
    objectives={["Describe thyroid hormone synthesis, feedback control and protein binding", "Interpret thyroid function tests, including non-thyroidal illness", "Plan anaesthesia for hyper- and hypothyroid patients and goitre", "Recognise and manage haematoma after thyroid surgery using SCOOP"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["DAS haematoma SCOOP 2022", "DAS haematoma timing 2022"], keyPoints: ["DAS haematoma SCOOP 2022", "DAS haematoma timing 2022", "OpenStax hyperthyroidism", "OpenStax thyroid binding", "OpenStax thyroid feedback"] }}
    keyPoints={[
      { text: "Increasing T3 and T4 suppress TSH by negative feedback", cites: ["OpenStax thyroid feedback"] },
      { text: "Over 99% of circulating T3 and T4 is protein-bound; only free hormone enters cells", cites: ["OpenStax thyroid binding"] },
      { text: "Hyperthyroidism raises metabolic rate and heart rate", cites: ["OpenStax hyperthyroidism"] },
      { text: "About half of post-thyroidectomy haematomas occur within 6 hours", cites: ["DAS haematoma timing 2022"] },
      { text: "Airway-threatening haematoma: SCOOP at the bedside", cites: ["DAS haematoma SCOOP 2022"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Physiology comes first, then perioperative management. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific advice. Return to <Link to="/perioperative/endocrine-disease" className="text-primary underline">Endocrine Co-Existing Disease</Link> for the overview.</p>
      <ExamSection id="thyroid-function-1" exams={exams}><CollapsibleSubsection title="Synthesis, control and carriage" defaultOpen><ThyroidSynthesisTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="thyroid-function-2" exams={exams}><CollapsibleSubsection title="Actions and thyroid function tests"><ThyroidTestsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="thyroid-function-3" exams={exams}><CollapsibleSubsection title="Perioperative hyper- and hypothyroidism"><ThyroidPerioperativeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="thyroid-function-4" exams={exams}><CollapsibleSubsection title="After thyroid surgery: haematoma and other complications"><ThyroidPostopTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
