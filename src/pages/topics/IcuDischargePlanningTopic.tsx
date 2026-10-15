import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { DischargeRehabStartTeaching, DischargeTransferTeaching, DischargeHomeTeaching, DischargeFollowUpTeaching } from "@/components/topic/IcuDischargeTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "When does NICE CG83 say rehabilitation risk should first be assessed?", options: ["At ward transfer", "At hospital discharge", "During the critical care stay, as early as clinically possible", "At the 3-month clinic"], correctIndex: 2, explanation: "Recommendation 1.2: during the critical care stay and as early as clinically possible." },
  { question: "NICE CG50: ICU-to-ward transfer between 22:00 and 07:00 should be:", options: ["Routine", "Avoided whenever possible and documented as an adverse incident", "Allowed if the bed is needed", "Only by consultant order"], correctIndex: 1, explanation: "Avoid whenever possible; document as an adverse incident if it occurs." },
  { question: "Responsibility during ICU-to-ward transfer (NICE CG50) is:", options: ["ICU team only", "Ward team only", "Shared between transferring and receiving teams", "The outreach team"], correctIndex: 2, explanation: "Shared responsibility, with a formal structured handover and written plan." },
  { question: "NICE CG83 self-directed rehabilitation manual duration:", options: ["1 week", "At least 6 weeks", "3 months exactly", "Not recommended"], correctIndex: 1, explanation: "Consider offering for at least 6 weeks after discharge from critical care." },
  { question: "NICE CG83 review of patients with rehabilitation needs:", options: ["2–3 months after critical care discharge, face to face", "By phone at 1 week", "At 1 year only", "Only if requested"], correctIndex: 0, explanation: "2 to 3 months, face to face, by an appropriately skilled professional." },
];

export default function IcuDischargePlanningTopic() {
  return <TopicTemplate title="ICU Discharge Planning and Longer-Term Recovery" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-inpatient-journey" backLabel="The ICU Inpatient Journey" accentColor="text-icu" topicId="icu-discharge-planning" topicTitle="ICU Discharge Planning and Longer-Term Recovery"
    objectives={["Assess rehabilitation risk and start rehabilitation during the ICU stay", "Time and hand over ICU-to-ward transfer safely", "Prepare patients and families for home", "Plan the 2–3 month review and onward referral"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NICE CG83 early assessment", "NICE CG50 night transfer", "NICE CG83 review"], keyPoints: ["NICE CG83 early assessment", "GPICS V3 discharge", "NICE CG50 shared handover", "NICE CG83 review"] }}
    keyPoints={[
      { text: "Assess rehabilitation risk during the ICU stay and start rehabilitation early", cites: ["NICE CG83 early assessment", "NICE CG83 start early"] },
      { text: "Avoid night-time ward transfer; document it as an adverse incident if it happens", cites: ["GPICS V3 discharge", "NICE CG50 night transfer"] },
      { text: "Shared ICU–ward responsibility with a structured handover and written plan", cites: ["NICE CG50 shared handover", "GPICS V3 discharge handover"] },
      { text: "Information before home discharge; consider a 6-week self-directed rehabilitation manual", cites: ["NICE CG83 home discharge", "NICE CG83 ward step-down"] },
      { text: "Face-to-face review 2–3 months after critical care discharge", cites: ["NICE CG83 review"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page expands the discharge stage of <Link to="/intensive-care/icu-inpatient-journey" className="text-primary underline">The ICU Inpatient Journey</Link>. Quotations reuse verified records from NICE CG83, NICE CG50 and GPICS V3; surrounding explanation is teaching synthesis, not a local discharge policy.</p>
      <ExamSection id="discharge-rehab-start" exams={exams}><CollapsibleSubsection title="1. Rehabilitation during the stay" defaultOpen><DischargeRehabStartTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="discharge-transfer" exams={exams}><CollapsibleSubsection title="2. Transfer to the ward"><DischargeTransferTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="discharge-home" exams={exams}><CollapsibleSubsection title="3. Ward step-down and home"><DischargeHomeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="discharge-follow-up" exams={exams}><CollapsibleSubsection title="4. Longer-term recovery and review"><DischargeFollowUpTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
