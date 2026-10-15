import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { CostAverageTeaching, CostOrgansTeaching, CostUnitTypeTeaching, CostInternationalTeaching } from "@/components/topic/IcuCostLosTeaching";
import { IcuCostCalculator } from "@/components/topic/IcuCostCalculator";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "The DHSC 2023 answer gave the 2020/21 average NHS critical care bed-day cost as:", options: ["£345", "£901", "£1,881", "£2,349"], correctIndex: 2, explanation: "£1,881 per day, averaged across adult, paediatric and neonatal critical care." },
  { question: "NHS adult critical care costs are grouped into HRGs according to:", options: ["Primary diagnosis", "Number of organs supported each day", "Length of stay", "APACHE II score"], correctIndex: 1, explanation: "HRGs XC01Z–XC07Z are based on organs supported per day." },
  { question: "In the 2019/20 schedule, an adult day with 6 or more organs supported cost roughly:", options: ["The same as a 1-organ day", "About twice a 1-organ day", "Ten times a 1-organ day", "Less than a 0-organ day"], correctIndex: 1, explanation: "About £2,330 versus £1,240 (bed-day-weighted arithmetic from published rows)." },
  { question: "Most adult critical care bed days in 2019/20 involved:", options: ["0 organs", "1–2 organs", "4–5 organs", "6 or more organs"], correctIndex: 1, explanation: "About 850,000 of 1.33 million bed days (~64%) were 1- or 2-organ days." },
  { question: "Why can't Dasta 2005 US costs be converted into NHS costs by exchange rate?", options: ["They are in euros", "Different decade, costing method and case mix", "They exclude ventilation", "They include social care"], correctIndex: 1, explanation: "2002 US charge-derived costs versus NHS trust-reported expenditure." },
  { question: "The NHS unit-function cost breakdown describes:", options: ["Each patient's diagnosis", "The predominant patient type of the unit", "The tariff paid", "Private hospital costs"], correctIndex: 1, explanation: "It is the closest open proxy for cost by condition, not a diagnosis-level cost." },
];

export default function IcuCostsTopic() {
  return <TopicTemplate title="ICU Costs: NHS Bed-Day Costs by Organ Support and Unit Type" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-outcomes" backLabel="ICU Outcomes" accentColor="text-icu" topicId="icu-costs" topicTitle="ICU Costs: NHS Bed-Day Costs by Organ Support and Unit Type"
    objectives={["Quote the NHS average critical care bed-day cost and what it includes", "Explain how adult critical care HRGs depend on organs supported", "Interpret unit-function cost differences and their limits", "Explain why US and NHS ICU costs cannot be converted directly"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NCC 2019/20 schedule", "NCC 2019/20 general ICU by organs"] }}
    keyPoints={[
      { text: "Adult critical care HRGs (XC01Z–XC07Z) are costed by organs supported per day", cites: ["NCC 2019/20 general ICU by organs"] },
      { text: "2019/20 adult average about £1,620 per bed day; ~£1,240 for 1 organ to ~£2,330 for 6+ (our arithmetic from published rows)", cites: ["NCC 2019/20 schedule"] },
      { text: "Unit-function costs describe unit type, not diagnosis; small specialist groups rest on few trusts", cites: ["NCC 2019/20 specialist one-organ rows"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page expands the cost lesson on <Link to="/intensive-care/icu-outcomes" className="text-primary underline">ICU Outcomes</Link>. NHS figures are from NHS England's National Schedule of NHS Costs 2019/20 (the latest year we could check as a spreadsheet) and a 2023 DHSC parliamentary answer; totals and averages across rows are our own arithmetic and are labelled. Costs are reported costs, not tariffs. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="cost-average" exams={exams}><CollapsibleSubsection title="1. What an NHS critical care day costs" defaultOpen><CostAverageTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-organs" exams={exams}><CollapsibleSubsection title="2. Cost by number of organs supported"><CostOrgansTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-unit-type" exams={exams}><CollapsibleSubsection title="3. Cost by type of unit"><CostUnitTypeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-international" exams={exams}><CollapsibleSubsection title="4. US comparison and costs after discharge"><CostInternationalTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-calculator" exams={exams}><CollapsibleSubsection title="5. ICU cost calculator" defaultOpen><IcuCostCalculator /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
