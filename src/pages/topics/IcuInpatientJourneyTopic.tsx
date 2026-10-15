import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { IcuJourneyReferralTeaching, IcuJourneyAdmissionTeaching, IcuJourneyTreatmentTeaching, IcuJourneyDischargeTeaching } from "@/components/topic/IcuJourneyTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "According to ICS 2021, what do the levels of critical care describe?", options: ["The ward where the patient is located", "The care the patient requires, not where they receive it", "The number of nurses on shift", "The patient's predicted mortality"], correctIndex: 1, explanation: "ICS 2021: levels describe the care a patient requires, not where they are receiving it." },
  { question: "Within what time must an unplanned admission reach critical care after the decision to admit (GPICS V3)?", options: ["1 hour", "4 hours", "12 hours", "24 hours"], correctIndex: 1, explanation: "GPICS V3: within four hours of the decision to admit and the completion of essential resuscitation and imaging." },
  { question: "By when must an ICU consultant review a newly admitted patient in person?", options: ["Within 4 hours", "Within 14 hours", "By the next morning ward round", "Within 24 hours"], correctIndex: 1, explanation: "GPICS V3: as urgently as the clinical state dictates, and always within 14 hours of admission (V2.1 said 12)." },
  { question: "What minimum registered nurse-to-patient ratio does GPICS V3 set for level 2 patients?", options: ["1:1", "1:2", "1:3", "1:4"], correctIndex: 1, explanation: "Level 3 needs at least 1:1; level 2 at least 1:2." },
  { question: "Which discharge to a general ward meets the GPICS V3 minimum standard and quality recommendation?", options: ["Within 4 hours of the decision, between 07:00 and 21:59", "Any time once a bed is free", "Within 24 hours, overnight preferred", "Only after the evening ward round"], correctIndex: 0, explanation: "GPICS V3: the 0700–2159 window is a minimum standard; discharge within four hours of the decision is a recommendation for a quality service." },
];

export default function IcuInpatientJourneyTopic() {
  return <TopicTemplate title="The ICU Inpatient Journey" subtitle="Final / FFICM / EDIC — From referral to follow-up" backPath="/intensive-care/critical-care-overview" backLabel="Critical Care Overview" accentColor="text-icu" topicId="icu-inpatient-journey" topicTitle="The ICU Inpatient Journey"
    objectives={["Triage a referred patient using the ICS 2021 levels of care", "Apply the GPICS V3 admission and consultant-review time standards", "Structure daily treatment around ward rounds, goals and handover", "Plan a safe, timely discharge with ward handover and follow-up"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["ICS Levels 2021 purpose", "GPICS V3 admission timing", "GPICS V3 ward round", "GPICS V3 discharge"], keyPoints: ["ICS Levels 2021 purpose", "GPICS V3 admission timing", "GPICS V3 consultant review", "GPICS V3 discharge", "GPICS V3 discharge handover"] }}
    keyPoints={[
      { text: "Levels of care describe what the patient needs, not where they are", cites: ["ICS Levels 2021 purpose"] },
      { text: "Unplanned admission within 4 hours of the decision; consultant review in person within 14 hours", cites: ["GPICS V3 admission timing", "GPICS V3 consultant review"] },
      { text: "Consultant-led ward rounds twice daily with multidisciplinary input", cites: ["GPICS V3 ward round"] },
      { text: "Ward discharge only between 07:00 and 21:59 (minimum standard), ideally within 4 hours of the decision", cites: ["GPICS V3 discharge"] },
      { text: "The receiving ward team should get verbal as well as written handover", cites: ["GPICS V3 discharge handover"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Four stages of one admission, each linking to the page that teaches it in depth. For unit structure and staffing evidence see <Link to="/intensive-care/critical-care-overview" className="text-primary underline">Critical Care Overview</Link>.</p>
      <ExamSection id="journey-referral" exams={exams}><CollapsibleSubsection title="1. Recognition, referral and triage" defaultOpen><IcuJourneyReferralTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="journey-admission" exams={exams}><CollapsibleSubsection title="2. Admission and the first hours"><IcuJourneyAdmissionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="journey-treatment" exams={exams}><CollapsibleSubsection title="3. Treatment: the daily cycle"><IcuJourneyTreatmentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="journey-discharge" exams={exams}><CollapsibleSubsection title="4. Discharge and life after critical care"><IcuJourneyDischargeTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
