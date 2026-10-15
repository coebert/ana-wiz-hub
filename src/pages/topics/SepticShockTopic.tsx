import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ShockRecognitionTeaching, ShockVasopressorTeaching, ShockSteroidTeaching } from "@/components/topic/SepticShockTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Sepsis-3 septic shock requires:", options: ["MAP <65 mm Hg alone", "Vasopressors to keep MAP ≥65 mm Hg AND lactate >2 mmol/L despite adequate fluid", "Lactate >4 mmol/L alone", "SIRS ≥2 plus hypotension"], correctIndex: 1, explanation: "Both criteria are needed, after adequate volume resuscitation." },
  { question: "SSC 2021 initial MAP target for septic shock on vasopressors:", options: ["55 mm Hg", "65 mm Hg", "75 mm Hg", "85 mm Hg"], correctIndex: 1, explanation: "A strong recommendation for 65 mm Hg over higher targets." },
  { question: "First-line vasopressor in septic shock (SSC 2021):", options: ["Adrenaline", "Dopamine", "Noradrenaline", "Phenylephrine"], correctIndex: 2, explanation: "Noradrenaline (norepinephrine) is recommended first line." },
  { question: "MAP remains inadequate on noradrenaline. SSC 2021 suggests:", options: ["Escalate noradrenaline without limit", "Add vasopressin", "Add dopamine", "Give more fluid regardless of response"], correctIndex: 1, explanation: "Add vasopressin instead of escalating noradrenaline (weak recommendation)." },
  { question: "ADRENAL (2018) found that hydrocortisone infusion in ventilated septic shock:", options: ["Reduced 90-day mortality", "Did not reduce 90-day mortality", "Increased mortality", "Was only tested in children"], correctIndex: 1, explanation: "No 90-day mortality difference; SSC 2021 still suggests steroids for ongoing vasopressor need." },
];

export default function SepticShockTopic() {
  return <TopicTemplate title="Septic Shock: Vasopressors, MAP & Steroids" subtitle="Final / FFICM / EDIC — Sepsis" backPath="/intensive-care/sepsis" backLabel="Sepsis & Septic Shock" accentColor="text-icu" topicId="septic-shock" topicTitle="Septic Shock: Vasopressors, MAP & Steroids"
    objectives={["Apply the Sepsis-3 septic-shock criteria and SSC 2021 perfusion markers", "Choose a MAP target and sequence noradrenaline and vasopressin", "Weigh the corticosteroid evidence and separate it from adrenal replacement"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["Sepsis-3 2016 septic shock", "SSC 2021 MAP target", "SSC 2021 Steroids"], keyPoints: ["SSC 2021 MAP target", "SSC 2021 norepinephrine", "SSC 2021 vasopressin", "ADRENAL 2018"] }}
    keyPoints={[
      { text: "Septic shock = vasopressors for MAP ≥65 mm Hg AND lactate >2 mmol/L despite adequate fluid", cites: ["Sepsis-3 2016 septic shock"] },
      { text: "Target MAP 65 mm Hg initially; noradrenaline first line; add vasopressin rather than escalating noradrenaline", cites: ["SSC 2021 MAP target", "SSC 2021 norepinephrine", "SSC 2021 vasopressin"] },
      { text: "Permissive MAP 60–65 in patients ≥65 years did not significantly change 90-day mortality (65 trial)", cites: ["Lamontagne 2020 65 trial"] },
      { text: "IV corticosteroids suggested for ongoing vasopressor need; ADRENAL showed no 90-day mortality benefit", cites: ["SSC 2021 Steroids", "ADRENAL 2018"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page expands the haemodynamic part of <Link to="/intensive-care/sepsis" className="text-primary underline">Sepsis &amp; Septic Shock</Link>, which keeps recognition, antibiotics and fluids. Quotations reuse verified records from that page and Corticosteroids; surrounding explanation is teaching synthesis, not a prescription.</p>
      <ExamSection id="septic-shock-recognition" exams={exams}><CollapsibleSubsection title="Definition and perfusion targets" defaultOpen><ShockRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="septic-shock-vasopressors" exams={exams}><CollapsibleSubsection title="MAP target, noradrenaline and vasopressin"><ShockVasopressorTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="septic-shock-steroids" exams={exams}><CollapsibleSubsection title="Corticosteroids"><ShockSteroidTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
