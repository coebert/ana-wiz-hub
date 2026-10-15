import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ConditionSummaryTeaching, ConditionSepsisTeaching, ConditionPneumoniaTeaching, ConditionVentilationTeaching } from "@/components/topic/IcuCostByConditionTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "The NHS National Schedule costs adult critical care by:", options: ["Diagnosis", "Bed day by organs supported", "Admission", "Consultant episode"], correctIndex: 1, explanation: "HRGs XC01Z–XC07Z, per bed day by number of organs supported; condition costs come from studies." },
  { question: "In Paoli 2018 (US), the mean hospital cost of septic shock was:", options: ["$16,324", "$24,638", "$38,298", "$51,022"], correctIndex: 2, explanation: "$38,298; $51,022 was sepsis not present at admission." },
  { question: "In Edbrooke 1999 (UK ICU), which sepsis patients cost most?", options: ["Septic on admission", "Septic on day 2", "Sepsis after day 2", "No difference"], correctIndex: 2, explanation: "Median $17,963 when sepsis developed after day 2, largely through longer stays." },
  { question: "The matched hospital cost difference attributed to VAP in Kollef 2012 was about:", options: ["$1,522", "$16,324", "$39,828", "$99,598"], correctIndex: 2, explanation: "$99,598 vs $59,770 = $39,828." },
  { question: "The mean cost of the initial ICU stay for ventilated ARDS patients in the UK OSCAR analysis was:", options: ["£1,738", "£26,857", "£43,100", "£90,206"], correctIndex: 1, explanation: "£26,857, at £1,738 per ICU day. £43,100 is the INHALE HAP/VAP figure." },
  { question: "Why should UK and US condition costs not be converted by exchange rate?", options: ["Exchange rates are volatile", "Years, methods and cost scope differ", "US figures are estimates", "NHS figures exclude staff"], correctIndex: 1, explanation: "They span decades, use charges vs trust-reported costs, and count ICU-only vs whole-hospital stays." },
];

export default function IcuCostByConditionTopic() {
  return <TopicTemplate title="ICU Cost by Condition: UK and US Figures" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-costs" backLabel="ICU Costs" accentColor="text-icu" topicId="icu-cost-by-condition" topicTitle="ICU Cost by Condition: UK and US Figures"
    objectives={["Explain why NHS critical care is costed by organ support rather than diagnosis", "Quote UK and US cost figures for sepsis, VAP/HAP and ventilated ARDS", "Explain why longer stays drive condition costs", "Recognise the limits of comparing UK and US cost studies"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NCC 2021/22 adult CC by organs", "Paoli 2018 sepsis costs", "Kollef 2012 VAP costs", "Marti 2016 ARDS costs"] }}
    keyPoints={[
      { text: "NHS costs adult ICU per bed day by organs supported (£1,587 to £2,985 in 2021/22), not by diagnosis", cites: ["NCC 2021/22 adult CC by organs"] },
      { text: "US sepsis hospital cost rose with severity: $16,324, $24,638, $38,298 for septic shock", cites: ["Paoli 2018 sepsis costs"] },
      { text: "UK ICU sepsis cost highest when sepsis began after day 2 (median $17,963, 1990s)", cites: ["Edbrooke 1999 sepsis costs"] },
      { text: "VAP added about $39,828 per US hospital stay; UK HAP/VAP patients averaged £43,100", cites: ["Kollef 2012 VAP costs", "INHALE 2020 HAP/VAP costs"] },
      { text: "Ventilated UK ARDS: mean initial ICU stay £26,857", cites: ["Marti 2016 ARDS costs"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page complements <Link to="/intensive-care/icu-costs" className="text-primary underline">ICU Costs</Link> and the cost section of <Link to="/intensive-care/icu-outcomes" className="text-primary underline">ICU Outcomes</Link>. Quotations are verbatim from the published abstracts and NHS England's National Schedule; tables are teaching synthesis. Figures are cash values from different years and are not inflation-adjusted. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="condition-summary" exams={exams}><CollapsibleSubsection title="1. Summary by condition" defaultOpen><ConditionSummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="condition-sepsis" exams={exams}><CollapsibleSubsection title="2. Sepsis"><ConditionSepsisTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="condition-pneumonia" exams={exams}><CollapsibleSubsection title="3. Ventilator- and hospital-acquired pneumonia"><ConditionPneumoniaTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="condition-ventilation" exams={exams}><CollapsibleSubsection title="4. ARDS and mechanical ventilation"><ConditionVentilationTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
