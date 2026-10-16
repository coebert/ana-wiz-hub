import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { CostCountrySummaryTeaching, CostCountryUkTeaching, CostCountryAustraliaTeaching, CostCountryNzTeaching, CostCountryEuropeTeaching, CostCountryUsTeaching } from "@/components/topic/IcuCostByCountryTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "The 2019/20 NHS adult average critical care bed-day cost is about:", options: ["£345", "£1,620", "£4,375", "£7,259"], correctIndex: 1, explanation: "About £1,620 per day, our arithmetic from the NHS England 2019/20 schedule rows." },
  { question: "Hicks 2019 found the mean cost per patient bed-day across 36 Australian ICUs was:", options: ["A$1,620", "A$2,670", "A$4,375", "A$9,852"], correctIndex: 2, explanation: "A$4,375 (SD A$1,157) in 2013/14 data; 2019 CPI equivalent A$4,875." },
  { question: "In the Hicks 2019 Australian study, lower cost per bed-day was significantly associated with:", options: ["Rural location and private status", "Higher bed number and higher occupancy", "More organs supported and longer stay", "Lower nurse ratios"], correctIndex: 1, explanation: "Both higher ICU bed number and higher occupancy were associated with lower cost per bed-day." },
  { question: "Tan 2012 applied one costing method to seven ICUs in Germany, Italy, the Netherlands and the UK and found direct costs per ICU day of:", options: ["€116–€202", "€1,168–€2,025", "€11,680–€20,250", "Identical in all seven"], correctIndex: 1, explanation: "€1,168 to €2,025; labour was the most important cost driver at all departments." },
  { question: "The NZ$7,259 Auckland DHB figure should be treated cautiously because:", options: ["It excludes staff costs", "It is one board, COVID-era, respiratory case mix, including lab/radiology/pharmacy/theatre", "It is a tariff, not a cost", "It is from 1999"], correctIndex: 1, explanation: "It is a single district health board figure from 2020/21 for adults with respiratory complaints, bundling costs other studies count separately." },
  { question: "Dasta 2005 estimated the adjusted incremental daily cost of mechanical ventilation in US ICUs as about:", options: ["$152", "$1,522", "$15,220", "$31,574"], correctIndex: 1, explanation: "$1,522 per day (p < .001), from 2002 charge-derived data." },
];

export default function IcuCostByCountryTopic() {
  return <TopicTemplate title="ICU Costs by Country: NHS beside Australia, New Zealand, Europe and the US" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-costs" backLabel="ICU Costs" accentColor="text-icu" topicId="icu-cost-by-country" topicTitle="ICU Costs by Country: NHS beside Australia, New Zealand, Europe and the US"
    objectives={["Quote the NHS adult critical care bed-day cost and how it is grouped", "Describe the Australian ANZICS registry bed-day cost and its drivers", "Explain the limits of the New Zealand single-board figure", "Compare European standardised costing studies and US charge-derived costs", "Explain why cross-country ICU costs cannot be compared by exchange rate alone"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NCC 2019/20 schedule", "Hicks 2019 mean bed-day cost", "Tan 2012 four-country range", "Dasta 2005 daily cost"] }}
    keyPoints={[
      { text: "UK: about £1,620 per adult bed day in 2019/20, grouped by organs supported (our arithmetic from published rows)", cites: ["NCC 2019/20 schedule"] },
      { text: "Australia: A$4,375 mean per patient bed-day across 36 ICUs in 2013/14; bigger, busier units cost less per day", cites: ["Hicks 2019 mean bed-day cost", "Hicks 2019 study scope"] },
      { text: "New Zealand: NZ$7,259 per day at one Auckland board in 2020/21 — indicative only, not a national study", cites: ["ADHB 2022 ICU day cost"] },
      { text: "Europe: €1,168–€2,025 per ICU day across four countries with one method; labour the main driver everywhere", cites: ["Tan 2012 four-country range", "Tan 2012 labour driver"] },
      { text: "US: charge-derived costs; ventilation added about $1,522 per day in 2002 data", cites: ["Dasta 2005 daily cost", "Dasta 2005 ventilation increment"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page complements <Link to="/intensive-care/icu-costs" className="text-primary underline">ICU Costs</Link> and <Link to="/intensive-care/icu-cost-by-condition" className="text-primary underline">ICU Cost by Condition</Link>, and mirrors <Link to="/intensive-care/icu-staffing-by-country" className="text-primary underline">ICU Staffing by Country</Link>. Quotations are verbatim from NHS England's 2019/20 schedule, Hicks 2019 (Medical Journal of Australia), an Auckland DHB Official Information Act response, Tan 2012 (Value in Health), Negrini 2006 (IPOC) and Dasta 2005; the comparison table is teaching synthesis. The figures differ in currency, year, method and case mix and are not directly comparable. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="cost-country-summary" exams={exams}><CollapsibleSubsection title="1. Summary by country" defaultOpen><CostCountrySummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-uk" exams={exams}><CollapsibleSubsection title="2. United Kingdom: NHS reference costs"><CostCountryUkTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-australia" exams={exams}><CollapsibleSubsection title="3. Australia: ANZICS registry costing"><CostCountryAustraliaTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-nz" exams={exams}><CollapsibleSubsection title="4. New Zealand: a single-board figure"><CostCountryNzTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-europe" exams={exams}><CollapsibleSubsection title="5. Europe: standardised cross-country studies"><CostCountryEuropeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-us" exams={exams}><CollapsibleSubsection title="6. United States: charge-derived costs"><CostCountryUsTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
