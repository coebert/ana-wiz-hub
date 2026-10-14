import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { QuizSection } from "@/components/quiz/QuizSection";
import { Exam } from "@/data/curriculum";
import { EarlyRiskCheckTeaching, DischargeStepsTeaching, DiariesEvidenceTeaching } from "@/components/topic/PicsFollowUpTeaching";

const quiz = [
  { question: "NICE CG83 asks for the first short risk assessment:", options: ["At hospital discharge", "During the critical care stay, as early as clinically possible", "At the 2–3 month review", "Only if the patient asks"], correctIndex: 1, explanation: "Recommendation 1.2: during the critical care stay and as early as clinically possible." },
  { question: "Which is one of NICE's physical risk markers?", options: ["Age over 65", "Unable to self-ventilate on 35% oxygen or less", "ICU stay over 24 hours", "Any sedation"], correctIndex: 1, explanation: "Table 1 lists being unable to self-ventilate on 35% oxygen or less." },
  { question: "The NICE rehabilitation review is due:", options: ["1 week after discharge", "2–3 months after critical care discharge, face to face", "12 months, by telephone", "Only for ARDS"], correctIndex: 1, explanation: "Recommendations 1.23–1.24." },
  { question: "The 2019 JAMA ICU diary trial found:", options: ["PTSD fell from 13% to 5%", "No significant reduction in PTSD symptoms", "Diaries increased PTSD", "It was stopped early for benefit"], correctIndex: 1, explanation: "29.9% v 34.3%, P = .39; the authors said findings do not support diaries for PTSD prevention." },
  { question: "NICE suggests considering a self-directed rehabilitation manual for at least:", options: ["1 week", "6 weeks", "6 months", "1 year"], correctIndex: 1, explanation: "Recommendation 1.18: at least 6 weeks after discharge from critical care." },
];

const PicsFollowUpTopic = () => (
  <TopicTemplate
    title="PICS Follow-Up Plan"
    subtitle="FFICM / EDIC — Intensive Care"
    backPath="/intensive-care"
    backLabel="Intensive Care"
    accentColor="text-icu"
    topicId="pics-follow-up"
    topicTitle="PICS Follow-Up Plan"
    objectives={[
      "Carry out the NICE early short risk assessment and name its risk markers",
      "Set out the six steps from ICU to the 2–3 month review",
      "Interpret the conflicting ICU diary trials and the PRaCTICaL follow-up trial",
    ]}
    keyPoints={[
      { text: "Short risk check in ICU as early as clinically possible; comprehensive assessment and goals for those at risk", cites: ["NICE CG83 early assessment"] },
      { text: "Review patients with rehabilitation needs face to face 2–3 months after critical care discharge", cites: ["NICE CG83 review"] },
      { text: "ICU diaries: positive in Jones 2010 (13% v 5%), not supported by the larger 2019 JAMA trial", cites: ["Jones 2010 (ICU diaries)", "Garrouste-Orgeas 2019"] },
    ]}
    sectionExamMapping={{ objectives: { exams: [Exam.FINAL, Exam.FFICM] }, keyPoints: { exams: [Exam.FINAL, Exam.FFICM] } }}
    coreConcepts={
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          A practical, step-by-step follow-up plan for survivors of critical illness, built on NICE CG83. For what PICS is and how common each domain is, see the PICS lesson on <Link to="/intensive-care/prognostication-ethics-icu" className="text-primary underline-offset-4 hover:underline">Prognostication, Ethics &amp; Outcomes</Link>.
        </p>
        <ExamSection id="early-risk-check" exams={[Exam.FINAL, Exam.FFICM]}>
          <CollapsibleSubsection title="Steps 1–2: early risk check and starting rehabilitation"><EarlyRiskCheckTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="discharge-and-review" exams={[Exam.FINAL, Exam.FFICM]}>
          <CollapsibleSubsection title="Steps 3–6: discharge and the 2–3 month review"><DischargeStepsTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="diaries-evidence" exams={[Exam.FINAL, Exam.FFICM]}>
          <CollapsibleSubsection title="ICU diaries and follow-up clinics: the evidence"><DiariesEvidenceTeaching /></CollapsibleSubsection>
        </ExamSection>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Quiz</h3>
          <QuizSection questions={quiz} />
        </div>
      </div>
    }
  />
);

export default PicsFollowUpTopic;
