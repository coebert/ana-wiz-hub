import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { PeritonitisAssessmentTeaching, PeritonitisSourceControlTeaching } from "@/components/topic/PeritonitisPracticeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Which type of peritonitis occurs in ascites without a perforation?", options: ["Primary", "Secondary", "Tertiary", "Chemical"], correctIndex: 0, explanation: "Primary (spontaneous bacterial) peritonitis is treated with antibiotics alone." },
  { question: "In STOP-IT, what was the median antibiotic duration in the fixed-course group?", options: ["2 days", "4 days", "8 days", "14 days"], correctIndex: 1, explanation: "4.0 days vs 8.0 days, with similar outcomes (21.8% vs 22.3%)." },
  { question: "STOP-IT's short course applies only when…", options: ["The patient is afebrile", "Source control is adequate", "CRP is normal", "Cultures are negative"], correctIndex: 1, explanation: "All patients had an adequate source-control procedure." },
  { question: "WSES 2017 names which cornerstones of treatment?", options: ["Imaging, steroids, fluids", "Early recognition, adequate source control, appropriate antimicrobials", "Nasogastric tube and analgesia", "TPN and bowel rest"], correctIndex: 1, explanation: "With prompt resuscitation of ongoing sepsis." },
  { question: "What is the usual induction approach for emergency laparotomy for peritonitis?", options: ["Inhalational induction", "Rapid-sequence induction with vasopressor ready", "Awake fibreoptic for all", "Spinal anaesthesia"], correctIndex: 1, explanation: "Full stomach and ileus; septic patients often drop their pressure at induction." },
];

export default function PeritonitisTopic() {
  return <TopicTemplate title="Peritonitis & Intra-abdominal Sepsis" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu" topicId="peritonitis" topicTitle="Peritonitis & Intra-abdominal Sepsis"
    objectives={["Distinguish primary, secondary and tertiary peritonitis", "Recognise intra-abdominal sepsis in sedated ICU patients", "Prepare a septic patient for emergency laparotomy", "Apply source control and STOP-IT antibiotic duration evidence"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["WSES 2017 IAI", "SIS-IDSA 2010", "STOP-IT 2015"] }}
    keyPoints={[
      { text: "Cornerstones: early recognition, adequate source control, appropriate antibiotics and prompt resuscitation", cites: ["WSES 2017 IAI"] },
      { text: "After adequate source control, about 4 days of antibiotics matched longer courses (21.8% vs 22.3%)", cites: ["STOP-IT 2015", "STOP-IT 2015 duration"] },
      { text: "Resuscitate with 500 mL boluses and start noradrenaline early for MAP below 65", cites: ["NICE CG174 resuscitation bolus", "SSC 2021 MAP 65"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <ExamSection id="peritonitis-assessment" exams={exams}><CollapsibleSubsection title="Types, recognition and guidance compared" defaultOpen><PeritonitisAssessmentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="peritonitis-source-control" exams={exams}><CollapsibleSubsection title="Source control, antibiotic duration and ICU care"><PeritonitisSourceControlTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
