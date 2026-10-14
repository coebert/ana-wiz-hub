import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { TonicityTeaching, IsotonicTeaching, HypotonicTeaching, HypertonicTeaching } from "@/components/topic/FluidBalanceTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Why does glucose 5% behave as a hypotonic fluid after infusion?", options: ["It contains a lot of chloride", "The glucose is metabolised, leaving free water", "It has a very high osmolarity", "It stays in the plasma"], correctIndex: 1, explanation: "Once glucose enters cells it no longer holds water outside them, so the infusion acts like free water." },
  { question: "What sodium range does NICE CG174 give for adult resuscitation crystalloids?", options: ["30–77 mmol/l", "100–120 mmol/l", "130–154 mmol/l", "Above 200 mmol/l"], correctIndex: 2, explanation: "NICE: crystalloids containing sodium 130 to 154 mmol/l, as a 500 ml bolus over less than 15 minutes." },
  { question: "What does NICE NG29 recommend for routine maintenance in children?", options: ["Glucose 5% alone", "Isotonic crystalloids with sodium 131–154 mmol/litre", "0.18% saline in 4% glucose", "3% saline"], correctIndex: 1, explanation: "Children start on isotonic maintenance to reduce hospital-acquired hyponatraemia." },
  { question: "Above what adult daily maintenance volume does NICE say hyponatraemia risk increases?", options: ["1 litre", "1.5 litres", "2.5 litres", "5 litres"], correctIndex: 2, explanation: "NICE CG174: prescribing more than 2.5 litres per day increases the risk of hyponatraemia." },
  { question: "What first-24-hour limit on sodium rise does the European hyponatraemia guideline suggest?", options: ["5 mmol/l", "10 mmol/l", "15 mmol/l", "No limit"], correctIndex: 1, explanation: "Limit the rise to 10 mmol/l in the first 24 h and 8 mmol/l every 24 h thereafter." },
];

export default function FluidBalanceTopic() {
  return <TopicTemplate title="Fluid Balance and Tonicity" subtitle="Primary / Final / FFICM / EDIC — Acid-Base Disorders" backPath="/intensive-care/acid-base" backLabel="Acid-Base Disorders" accentColor="text-icu" topicId="fluid-balance" topicTitle="Fluid Balance and Tonicity"
    objectives={["Distinguish osmolarity from effective tonicity and classify fluids as isotonic, hypotonic or hypertonic", "Apply NICE resuscitation bolus recommendations for adults and children", "Explain NICE maintenance requirements and the risk of hospital-acquired hyponatraemia", "Describe the 3% saline bolus protocol and correction limits for severe symptomatic hyponatraemia", "Link fluid chloride content to the saline vs balanced fluid evidence"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NICE CG174 resuscitation", "NICE CG174 maintenance", "NICE NG29 maintenance", "Spasovski 2014 Hyponatraemia"] }}
    keyPoints={[
      { text: "Adult resuscitation uses crystalloids with sodium 130–154 mmol/l as a 500 ml bolus over less than 15 minutes", cites: ["NICE CG174 resuscitation"] },
      { text: "Adult maintenance starts at 25–30 ml/kg/day water with about 1 mmol/kg/day sodium, potassium and chloride", cites: ["NICE CG174 maintenance"] },
      { text: "Children start on isotonic maintenance crystalloids with sodium 131–154 mmol/litre", cites: ["NICE NG29 maintenance"] },
      { text: "3% saline is given as 150 ml boluses with sodium rise limited to 10 mmol/l in the first 24 h", cites: ["Spasovski 2014 Hyponatraemia"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons quote the NICE adult (CG174) and paediatric (NG29) intravenous fluid guidelines, the European hyponatraemia guideline and the SALSA trial word for word in the source popovers. Worked numbers and physiology explanations are teaching reasoning, not patient-specific prescriptions. For the chloride and outcome trials, see the <Link to="/intensive-care/acid-base#section-fluids-chloride" className="text-primary underline">saline vs balanced fluids lesson</Link> on Acid-Base Disorders.</p>
      <ExamSection id="fluid-tonicity" exams={exams}><CollapsibleSubsection title="Osmolarity, tonicity and fluid classification" defaultOpen><TonicityTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="fluid-isotonic" exams={exams}><CollapsibleSubsection title="Isotonic fluids and resuscitation"><IsotonicTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="fluid-hypotonic" exams={exams}><CollapsibleSubsection title="Hypotonic fluids, maintenance and hospital-acquired hyponatraemia"><HypotonicTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="fluid-hypertonic" exams={exams}><CollapsibleSubsection title="Hypertonic saline and safe correction"><HypertonicTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
