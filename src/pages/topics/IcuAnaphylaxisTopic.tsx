import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { AnaphylaxisFirstDoseTeaching, AnaphylaxisRefractoryTeaching, AnaphylaxisAfterTeaching } from "@/components/topic/IcuEmergencyTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "RCUK 2021 IM adrenaline dose for an adult:", options: ["50 micrograms", "500 micrograms (0.5 mL of 1 mg/mL)", "1 mg (1 mL of 1 mg/mL)", "5 mg"], correctIndex: 1, explanation: "500 micrograms IM for adults and children over 12 years." },
  { question: "When should IM adrenaline be repeated?", options: ["After 1 minute", "After 5 minutes if ABC problems persist", "After 30 minutes", "Never"], correctIndex: 1, explanation: "Repeat after 5 minutes if Airway/Breathing/Circulation problems persist." },
  { question: "Refractory anaphylaxis is defined as ongoing problems despite:", options: ["One IM dose", "Two appropriate IM doses", "Antihistamine", "Hydrocortisone"], correctIndex: 1, explanation: "Two appropriate doses of IM adrenaline." },
  { question: "The role of antihistamines in RCUK 2021:", options: ["First line", "Second line, with adrenaline", "Third line; not for ABC problems", "Contraindicated"], correctIndex: 2, explanation: "Third-line; not for treating Airway/Breathing/Circulation problems initially." },
  { question: "Which condition can mimic anaphylaxis and typically does not respond to adrenaline?", options: ["ACE inhibitor-induced angioedema", "Septic shock", "Asthma", "Vasovagal faint"], correctIndex: 0, explanation: "RCUK lists ACE inhibitor-induced angioedema as a potentially life-threatening mimic that typically does not respond to adrenaline." },
];

export default function IcuAnaphylaxisTopic() {
  return <TopicTemplate title="Anaphylaxis in Critical Care" subtitle="Final / FFICM / EDIC — ICU emergencies" backPath="/intensive-care/critical-care-overview" backLabel="Critical Care Overview" accentColor="text-icu" topicId="icu-anaphylaxis" topicTitle="Anaphylaxis in Critical Care"
    objectives={["Give the correct IM adrenaline dose and repeat interval", "Recognise refractory anaphylaxis and start an adrenaline infusion", "Place fluids, antihistamines and steroids correctly", "Use tryptase and plan observation for biphasic reactions"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["RCUK 2021 IM dose", "RCUK 2021 refractory definition"], keyPoints: ["RCUK 2021 IM dose", "RCUK 2021 repeat IM", "RCUK 2021 refractory definition", "RCUK 2021 fluids antihistamines"] }}
    keyPoints={[
      { text: "Adult IM adrenaline 500 micrograms; repeat after 5 minutes if ABC problems persist", cites: ["RCUK 2021 IM dose", "RCUK 2021 repeat IM"] },
      { text: "Refractory after two IM doses: low-dose IV adrenaline infusion plus fluid bolus", cites: ["RCUK 2021 refractory definition", "RCUK 2021 infusion"] },
      { text: "Antihistamines are third line; steroids are not routine and never replace adrenaline", cites: ["RCUK 2021 fluids antihistamines", "RCUK 2021 steroids"] },
      { text: "Tryptase helps when the diagnosis is uncertain; fixed 6–12 h observation can miss biphasic reactions", cites: ["RCUK 2021 tryptase", "RCUK 2021 biphasic"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">One of the emergency pages linked from <Link to="/intensive-care/critical-care-overview" className="text-primary underline">Critical Care Overview</Link>. Quotations are verbatim from the Resuscitation Council UK 2021 guideline; surrounding explanation is teaching synthesis, not a prescription.</p>
      <ExamSection id="anaphylaxis-first" exams={exams}><CollapsibleSubsection title="1. Recognition and IM adrenaline" defaultOpen><AnaphylaxisFirstDoseTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="anaphylaxis-refractory" exams={exams}><CollapsibleSubsection title="2. Refractory anaphylaxis"><AnaphylaxisRefractoryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="anaphylaxis-after" exams={exams}><CollapsibleSubsection title="3. After the reaction"><AnaphylaxisAfterTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
