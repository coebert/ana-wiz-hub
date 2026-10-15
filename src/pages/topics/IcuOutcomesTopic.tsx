import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { OutcomesSurvivalTeaching, OutcomesIcnarcTeaching, OutcomesLengthOfStayTeaching, OutcomesReadmissionTeaching, OutcomesSeverityTeaching } from "@/components/topic/IcuOutcomesTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Wunsch 2010: 3-year mortality in elderly ICU survivors vs hospital controls was:", options: ["14.9% vs 39.5%", "39.5% vs 34.5%", "57.6% vs 9.6%", "No difference"], correctIndex: 1, explanation: "39.5% vs 34.5% (AHR 1.07); the general-population control group was 14.9%." },
  { question: "Which ICU survivors had the greatest excess mortality in Wunsch 2010?", options: ["Those not ventilated", "Those who received mechanical ventilation", "Those discharged home", "Those under 65"], correctIndex: 1, explanation: "57.6% vs 32.8% 3-year mortality, concentrated in the first 6 months." },
  { question: "Average ICU readmission rate in Rosenberg & Watts 2000:", options: ["About 1%", "About 7% (range 4–14%)", "About 20%", "About 30%"], correctIndex: 1, explanation: "Average 7%, range 4–14%, unchanged across North America and Europe." },
  { question: "Hospital death rates in readmitted patients compared with never-readmitted ICU survivors:", options: ["Similar", "Slightly lower", "2–10 times higher", "100 times higher"], correctIndex: 2, explanation: "Rosenberg & Watts: 2- to 10-times higher." },
  { question: "Herridge 2003 ARDS survivors at one year mainly had:", options: ["Oxygen dependence", "Abnormal spirometry", "Persistent functional disability from muscle wasting and weakness", "Full recovery"], correctIndex: 2, explanation: "No one needed oxygen at 12 months; disability was mostly extrapulmonary." },
  { question: "Herridge 2011: physical function 5 years after ARDS was:", options: ["Back to normal in all", "Normal in younger patients only", "Below normal predicted levels in both younger and older patients", "Worse than at 1 year"], correctIndex: 2, explanation: "Median 6-minute walk 436 m (76% predicted); neither group returned to normal predicted physical function." },
  { question: "APACHE II (Knaus 1985) is based on:", options: ["Diagnosis alone", "12 routine physiological measurements, age and previous health status", "Length of stay", "Lactate and SOFA only"], correctIndex: 1, explanation: "Score range 0 to 71, closely correlated with hospital death in 5815 admissions." },
  { question: "ICNARC CMP 2024-25: what proportion of adult critical care admissions died in critical care and in acute hospital?", options: ["11.5% and 15%", "5% and 8%", "20% and 30%", "2% and 4%"], correctIndex: 0, explanation: "88.5% survived to critical care discharge and 85% to acute hospital discharge — raw, unadjusted audit figures across 286 units." },
];

export default function IcuOutcomesTopic() {
  return <TopicTemplate title="ICU Outcomes: Survival, Length of Stay and Readmission" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-discharge-planning" backLabel="ICU Discharge Planning" accentColor="text-icu" topicId="icu-outcomes" topicTitle="ICU Outcomes: Survival, Length of Stay and Readmission"
    objectives={["Distinguish ICU, hospital and long-term mortality after critical illness", "Interpret length of stay and its link to functional recovery", "Quote ICU readmission rates, predictors and associated mortality", "Recognise the limits of outcome measures as markers of quality", "Explain severity scoring and risk-adjusted comparison between units"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["Wunsch 2010 conclusion", "Herridge 2003 conclusion", "Rosenberg 2000 conclusion"], keyPoints: ["Wunsch 2010 ventilation risk", "Herridge 2003 conclusion", "Rosenberg 2000 readmission rate", "Duke 2004 predictors"] }}
    keyPoints={[
      { text: "ICU survivors have excess mortality for years, concentrated early in those who were ventilated", cites: ["Wunsch 2010 three-year mortality", "Wunsch 2010 ventilation risk"] },
      { text: "Some ICU survivors die on the ward after discharge", cites: ["Duke 2004 post-ICU deaths"] },
      { text: "Long ICU stays are followed by persistent weakness and functional disability", cites: ["Herridge 2003 ARDS stay", "Herridge 2003 conclusion"] },
      { text: "Average ICU readmission about 7%, with 2–10 times higher hospital death rates", cites: ["Rosenberg 2000 readmission rate", "Rosenberg 2000 readmission mortality"] },
      { text: "Physical function remains below normal five years after ARDS", cites: ["Herridge 2011 five-year function"] },
      { text: "Units are compared by risk-adjusted mortality using severity scores", cites: ["Knaus 1985 APACHE II", "Knaus 1985 uses"] },
      { text: "Unstable vital signs and night-time discharge are associated with worse outcomes", cites: ["Rosenberg 2000 conclusion", "Duke 2004 predictors", "NICE CG50 night transfer"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page follows on from <Link to="/intensive-care/icu-discharge-planning" className="text-primary underline">ICU Discharge Planning</Link>. Quotations are copied word for word from published abstracts and NICE guidance; the explanations are teaching summaries, not local benchmarks. Study populations differ, so figures should not be applied directly to an individual patient.</p>
      <ExamSection id="outcomes-survival" exams={exams}><CollapsibleSubsection title="1. Survival after critical illness" defaultOpen><OutcomesSurvivalTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="outcomes-icnarc" exams={exams}><CollapsibleSubsection title="2. UK national audit (ICNARC)" defaultOpen><OutcomesIcnarcTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="outcomes-length-of-stay" exams={exams}><CollapsibleSubsection title="3. Length of stay and recovery"><OutcomesLengthOfStayTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="outcomes-readmission" exams={exams}><CollapsibleSubsection title="4. Readmission to ICU"><OutcomesReadmissionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="outcomes-severity" exams={exams}><CollapsibleSubsection title="5. Severity scoring and risk adjustment"><OutcomesSeverityTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
