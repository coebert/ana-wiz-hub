import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { EclampsiaMagnesiumTeaching, EclampsiaHypertensionTeaching, EclampsiaFluidTeaching } from "@/components/topic/IcuEmergencyTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "NICE NG133 magnesium sulfate loading dose:", options: ["2 g IV over 1 hour", "4 g IV over 5–15 minutes", "10 g IM", "1 g IV bolus"], correctIndex: 1, explanation: "Collaborative Eclampsia Trial regimen: 4 g IV over 5–15 minutes, then 1 g/hour for 24 hours." },
  { question: "After an eclamptic fit, the magnesium infusion continues for:", options: ["6 hours", "12 hours", "24 hours after the last fit", "Until delivery only"], correctIndex: 2, explanation: "24 hours after the last fit." },
  { question: "Which is NOT an alternative to magnesium in eclampsia (NG133)?", options: ["Diazepam", "Phenytoin", "Other anticonvulsants", "All of these"], correctIndex: 3, explanation: "NG133 says do not use diazepam, phenytoin or other anticonvulsants as an alternative." },
  { question: "The Magpie trial found that magnesium sulphate in pre-eclampsia:", options: ["Had no effect", "Halved the risk of eclampsia", "Increased maternal death", "Only helped the baby"], correctIndex: 1, explanation: "Halves the risk of eclampsia and probably reduces maternal death." },
  { question: "NG133 maintenance fluid limit in severe pre-eclampsia without ongoing losses:", options: ["40 mL/h", "80 mL/h", "125 mL/h", "No limit"], correctIndex: 1, explanation: "Limit to 80 mL/hour unless there are other ongoing fluid losses." },
];

export default function IcuEclampsiaTopic() {
  return <TopicTemplate title="Severe Pre-eclampsia and Eclampsia in Critical Care" subtitle="Final / FFICM / EDIC — ICU emergencies" backPath="/intensive-care/critical-care-overview" backLabel="Critical Care Overview" accentColor="text-icu" topicId="icu-eclampsia" topicTitle="Severe Pre-eclampsia and Eclampsia in Critical Care"
    objectives={["Give magnesium sulfate by the Collaborative Eclampsia Trial regimen and treat recurrent fits", "Treat severe hypertension immediately with a listed drug", "Restrict fluids and explain why"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NICE NG133 1.8.4", "NICE NG133 1.8.6", "NICE NG133 fluids"], keyPoints: ["Magpie 2002", "NICE NG133 1.8.4", "NICE NG133 1.8.5", "NICE NG133 1.8.6"] }}
    keyPoints={[
      { text: "Magnesium halves the risk of eclampsia (Magpie)", cites: ["Magpie 2002"] },
      { text: "4 g IV over 5–15 min, then 1 g/h for 24 h (24 h after the last fit); recurrent fits 2–4 g", cites: ["NICE NG133 1.8.4"] },
      { text: "No diazepam or phenytoin as an alternative to magnesium", cites: ["NICE NG133 1.8.5"] },
      { text: "Severe hypertension: labetalol, oral nifedipine or IV hydralazine immediately", cites: ["NICE NG133 1.8.6"] },
      { text: "Maintenance fluid limited to 80 mL/h unless ongoing losses", cites: ["NICE NG133 fluids"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">One of the emergency pages linked from <Link to="/intensive-care/critical-care-overview" className="text-primary underline">Critical Care Overview</Link>. Quotations are verbatim from NICE NG133 and the Magpie trial; surrounding explanation is teaching synthesis, not a prescription. Doses are given as NICE states them; check local obstetric protocols.</p>
      <ExamSection id="eclampsia-magnesium" exams={exams}><CollapsibleSubsection title="1. Magnesium sulfate" defaultOpen><EclampsiaMagnesiumTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="eclampsia-hypertension" exams={exams}><CollapsibleSubsection title="2. Severe hypertension"><EclampsiaHypertensionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="eclampsia-fluids" exams={exams}><CollapsibleSubsection title="3. Fluids"><EclampsiaFluidTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
