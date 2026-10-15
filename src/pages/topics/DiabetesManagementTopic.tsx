import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { InsulinPhysiologyTeaching, DiabetesPreopTeaching, DiabetesIntraopTeaching, DiabetesPostopTeaching } from "@/components/topic/DiabetesManagementTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  {"question": "Which transporter mediates insulin-stimulated glucose uptake into muscle and fat?", "options": ["GLUT1", "GLUT2", "GLUT4", "SGLT1"], "correctIndex": 2, "explanation": "GLUT4 vesicles move to the membrane under insulin (teaching synthesis; OpenStax describes the vesicle movement)."},
  {"question": "Why must a VRIII always run with a glucose infusion?", "options": ["To dilute the insulin", "Hypoglycaemia occurs when glucose stops but insulin continues", "To prevent hyperkalaemia", "Glucose increases insulin potency"], "correctIndex": 1, "explanation": "Quoted from the 2024 BJA Education review."},
  {"question": "What incidence of euglycaemic DKA did the cited review report after emergency surgery in patients on SGLT2 inhibitors?", "options": ["0.02%", "0.2%", "1.1%", "11%"], "correctIndex": 2, "explanation": "0.2% after non-emergency and 1.1% after emergency procedures."},
  {"question": "When is the delayed gastric emptying of GLP-1 receptor agonists most marked?", "options": ["After years of treatment", "Soon after starting treatment, in the first postprandial hours", "Only with weekly preparations", "Only in type 1 diabetes"], "correctIndex": 1, "explanation": "Tolerance and tachyphylaxis develop with ongoing treatment (BJA Educ 2024)."},
  {"question": "What did NICE-SUGAR show for tight glucose control (4.5–6.0 mmol/L) in ICU?", "options": ["Lower mortality", "No difference", "Higher mortality and more hypoglycaemia", "Fewer infections only"], "correctIndex": 2, "explanation": "Tight control increased mortality versus a target of 10 mmol/L or less (trial summary)."},
];

export default function DiabetesManagementTopic() {
  return <TopicTemplate title="Diabetes Management" subtitle="Primary / Final / FFICM — physiology and perioperative care" backPath="/perioperative/endocrine-disease" backLabel="Endocrine Co-Existing Disease" accentColor="text-clinical" topicId="diabetes-management" topicTitle="Diabetes Management"
    objectives={["Explain insulin secretion and glucose uptake, and how the stress response opposes insulin", "Assess the surgical patient with diabetes, including GLP-1 and SGLT2 risks", "Use a variable-rate insulin infusion safely with glucose", "Plan postoperative insulin and ICU glucose targets"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["BJA Educ HbA1c 2024", "BJA Educ SGLT2 euDKA 2024"], keyPoints: ["BJA Educ HbA1c 2024", "BJA Educ SGLT2 euDKA 2024", "BJA Educ VRIII glucose 2024", "BJA Educ basal-bolus 2024", "OpenStax beta cell"] }}
    keyPoints={[
      { text: "Beta cells make up about 75% of each islet; rising glucose releases insulin", cites: ["OpenStax beta cell"] },
      { text: "Guidelines strongly recommend a preoperative HbA1c", cites: ["BJA Educ HbA1c 2024"] },
      { text: "Always give glucose alongside a VRIII", cites: ["BJA Educ VRIII glucose 2024"] },
      { text: "SGLT2 inhibitors can cause euglycaemic DKA, more often after emergency surgery", cites: ["BJA Educ SGLT2 euDKA 2024"] },
      { text: "Basal-bolus insulin is preferred to a sliding scale after surgery", cites: ["BJA Educ basal-bolus 2024"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Physiology comes first, then perioperative management. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific advice. Return to <Link to="/perioperative/endocrine-disease" className="text-primary underline">Endocrine Co-Existing Disease</Link> for the overview.</p>
      <ExamSection id="diabetes-management-1" exams={exams}><CollapsibleSubsection title="Insulin physiology and the stress response" defaultOpen><InsulinPhysiologyTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="diabetes-management-2" exams={exams}><CollapsibleSubsection title="Preoperative assessment and newer drugs"><DiabetesPreopTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="diabetes-management-3" exams={exams}><CollapsibleSubsection title="Intraoperative insulin and glucose"><DiabetesIntraopTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="diabetes-management-4" exams={exams}><CollapsibleSubsection title="After surgery and in intensive care"><DiabetesPostopTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
