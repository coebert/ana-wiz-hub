import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { HypovolaemiaRecognitionTeaching, HypovolaemiaFluidsTeaching } from "@/components/topic/HypovolaemiaPracticeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "What passive leg raise change in cardiac output best predicted fluid responsiveness in Monnet 2016?", options: ["≥5%", "≥10%", "≥15%", "≥25%"], correctIndex: 1, explanation: "The best threshold was a PLR-induced increase in CO ≥10 ± 2%." },
  { question: "What resuscitation bolus does NICE CG174 recommend?", options: ["250 mL over 30 min", "500 mL over less than 15 min", "1,000 mL over 1 h", "30 mL/kg over 3 h"], correctIndex: 1, explanation: "Crystalloid with 130–154 mmol/L sodium, 500 mL over less than 15 minutes." },
  { question: "What NICE daily water volume is used for routine maintenance?", options: ["10–15 mL/kg", "25–30 mL/kg", "40–50 mL/kg", "60 mL/kg"], correctIndex: 1, explanation: "25–30 mL/kg/day water with about 1 mmol/kg/day of sodium, potassium and chloride." },
  { question: "What did PLUS 2022 find for 90-day mortality with balanced solution vs saline?", options: ["Large reduction", "21.8% vs 22.0%, no difference", "Increase with balanced", "Not measured"], correctIndex: 1, explanation: "No evidence that risk of death or AKI was lower with balanced solution." },
  { question: "Why read a leg raise test with cardiac output rather than pulse pressure?", options: ["Pulse pressure is too specific", "Pulse pressure has poor sensitivity", "Cardiac output cannot change", "It is cheaper"], correctIndex: 1, explanation: "Pulse pressure misses many responders (sensitivity about 0.56)." },
];

export default function HypovolaemiaTopic() {
  return <TopicTemplate title="Hypovolaemia & Fluid Resuscitation" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu" topicId="hypovolaemia" topicTitle="Hypovolaemia & Fluid Resuscitation"
    objectives={["Recognise non-haemorrhagic hypovolaemia and why blood pressure falls late", "Use a passive leg raise with cardiac output to judge fluid responsiveness", "Prescribe NICE CG174 resuscitation boluses and maintenance", "Summarise SMART, BaSICS and PLUS on balanced crystalloid vs saline"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NICE CG174 resuscitation bolus", "Monnet 2016 PLR", "PLUS 2022"] }}
    keyPoints={[
      { text: "NICE: 500 mL crystalloid bolus over less than 15 minutes, then reassess", cites: ["NICE CG174 resuscitation bolus"] },
      { text: "Passive leg raise ≥10% rise in cardiac output predicts fluid response (AUC 0.95)", cites: ["Monnet 2016 PLR"] },
      { text: "Maintenance: 25–30 mL/kg/day water, about 1 mmol/kg/day Na, K and Cl", cites: ["NICE CG174 maintenance"] },
      { text: "Balanced vs saline: small kidney signal in SMART; no mortality difference in BaSICS or PLUS", cites: ["SMART 2018", "BaSICS 2021", "PLUS 2022"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <ExamSection id="hypovolaemia-recognition" exams={exams}><CollapsibleSubsection title="Recognition and fluid responsiveness" defaultOpen><HypovolaemiaRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="hypovolaemia-fluids" exams={exams}><CollapsibleSubsection title="Latest guidelines and bedside fluid management"><HypovolaemiaFluidsTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
