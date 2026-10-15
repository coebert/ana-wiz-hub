import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { LosNationalTeaching, LosOrganSupportTeaching, LosConditionTeaching, LosInterpretTeaching } from "@/components/topic/IcuCostLosTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "ICNARC 2024–25 average critical care length of stay for all admissions:", options: ["2 days", "4 days", "6 days", "12 days"], correctIndex: 2, explanation: "6 days in critical care; 20 days in acute hospital." },
  { question: "HES 2019-20: critical care records starting at the weekend had:", options: ["Shorter stays", "Stays almost one day longer", "Identical stays", "No recorded stays"], correctIndex: 1, explanation: "Almost one day longer, possibly because more were emergencies." },
  { question: "HES: which discharge day had the shortest average stay?", options: ["Monday", "Wednesday", "Friday", "Saturday"], correctIndex: 3, explanation: "Saturday, 3.4 days; Monday longest at 5.0." },
  { question: "In HES 2018-19, the longest average duration of a support type was:", options: ["Advanced cardiovascular", "Basic respiratory", "Gastrointestinal", "Neurological"], correctIndex: 2, explanation: "Gastrointestinal support, 8.5 days (men) and 7.6 (women)." },
  { question: "ICNARC data 1995–2003: median ICU stay in severe acute pancreatitis was:", options: ["1.2 days", "3.8 days", "11.7 days", "20 days"], correctIndex: 1, explanation: "3.8 days, similar for survivors and non-survivors." },
  { question: "A unit with a shorter mean ICU stay:", options: ["Necessarily gives better care", "May have more early deaths or a different case mix", "Has fewer delayed discharges by definition", "Has lower mortality"], correctIndex: 1, explanation: "Early deaths, case mix and discharge practice all shorten stays." },
];

export default function IcuLengthOfStayTopic() {
  return <TopicTemplate title="ICU Length of Stay by Condition and Organ Support" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-outcomes" backLabel="ICU Outcomes" accentColor="text-icu" topicId="icu-length-of-stay" topicTitle="ICU Length of Stay by Condition and Organ Support"
    objectives={["Quote UK national ICU and hospital lengths of stay", "Describe NHS data on days of each organ support", "Compare condition-specific stays with their caveats", "Explain skew, early deaths and discharge delay in interpreting stay"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["HES ACC 2019-20 weekend start", "HES ACC support days"] }}
    keyPoints={[
      { text: "Weekend critical care admissions stayed almost one day longer (HES 2019-20)", cites: ["HES ACC 2019-20 weekend start"] },
      { text: "Saturday discharges had the shortest average stay (3.4 days); Monday the longest (5.0)", cites: ["HES ACC 2019-20 discharge day"] },
      { text: "Gastrointestinal support lasted longest (8.5 days in men); advanced cardiovascular about 3 days", cites: ["HES ACC support days"] },
      { text: "Severe acute pancreatitis (ICNARC data): median ICU stay 3.8 days", cites: ["Harrison 2007 pancreatitis stay"] },
      { text: "Most-deprived areas averaged 4.19 days per record versus 3.82 in least deprived (unadjusted)", cites: ["HES ACC 2019-20 deprivation"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page expands the length-of-stay lessons on <Link to="/intensive-care/icu-outcomes" className="text-primary underline">ICU Outcomes</Link>. NHS figures are from NHS Digital's Hospital Adult Critical Care Activity 2019-20 and ICNARC 2024–25. NHS England does not openly publish stay by diagnosis, so condition figures come from published studies and differ in country and year. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="los-national" exams={exams}><CollapsibleSubsection title="1. National averages" defaultOpen><LosNationalTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="los-organ-support" exams={exams}><CollapsibleSubsection title="2. Days by type of organ support"><LosOrganSupportTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="los-condition" exams={exams}><CollapsibleSubsection title="3. Length of stay by condition"><LosConditionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="los-interpret" exams={exams}><CollapsibleSubsection title="4. Deprivation and interpreting stay"><LosInterpretTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
