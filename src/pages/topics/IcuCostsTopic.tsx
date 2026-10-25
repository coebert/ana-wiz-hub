import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { CostAverageTeaching, CostOrgansTeaching, CostUnitTypeTeaching, CostInternationalTeaching } from "@/components/topic/IcuCostLosTeaching";
import { IcuCostCalculator } from "@/components/topic/IcuCostCalculator";
import { TimelineSeriesTeaching, TimelineOrgansTeaching, TimelineCaveatsTeaching } from "@/components/topic/IcuCostTimelineTeaching";
import { ConditionSummaryTeaching, ConditionSepsisTeaching, ConditionPneumoniaTeaching, ConditionVentilationTeaching, ConditionChildrenTeaching } from "@/components/topic/IcuCostByConditionTeaching";
import { CostCountrySummaryTeaching, CostCountryUkTeaching, CostCountryAustraliaTeaching, CostCountryNzTeaching, CostCountryEuropeTeaching, CostCountryUsTeaching } from "@/components/topic/IcuCostByCountryTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "The DHSC 2023 answer gave the 2020/21 average NHS critical care bed-day cost as:", options: ["£345", "£901", "£1,881", "£2,349"], correctIndex: 2, explanation: "£1,881 per day, averaged across adult, paediatric and neonatal critical care." },
  { question: "NHS adult critical care costs are grouped into HRGs according to:", options: ["Primary diagnosis", "Number of organs supported each day", "Length of stay", "APACHE II score"], correctIndex: 1, explanation: "HRGs XC01Z–XC07Z are based on organs supported per day." },
  { question: "In the 2019/20 schedule, an adult day with 6 or more organs supported cost roughly:", options: ["The same as a 1-organ day", "About twice a 1-organ day", "Ten times a 1-organ day", "Less than a 0-organ day"], correctIndex: 1, explanation: "About £2,330 versus £1,240 (bed-day-weighted arithmetic from published rows)." },
  { question: "Most adult critical care bed days in 2019/20 involved:", options: ["0 organs", "1–2 organs", "4–5 organs", "6 or more organs"], correctIndex: 1, explanation: "About 850,000 of 1.33 million bed days (~64%) were 1- or 2-organ days." },
  { question: "Why can't Dasta 2005 US costs be converted into NHS costs by exchange rate?", options: ["They are in euros", "Different decade, costing method and case mix", "They exclude ventilation", "They include social care"], correctIndex: 1, explanation: "2002 US charge-derived costs versus NHS trust-reported expenditure." },
  { question: "The NHS unit-function cost breakdown describes:", options: ["Each patient's diagnosis", "The predominant patient type of the unit", "The tariff paid", "Private hospital costs"], correctIndex: 1, explanation: "It is the closest open proxy for cost by condition, not a diagnosis-level cost." },

  { question: "The all-adult NHS critical care cost per bed day in 2013/14 (bed-day-weighted from published rows) was about:", options: ["£890", "£1,190", "£1,620", "£2,144"], correctIndex: 1, explanation: "About £1,190; £890 was the one-organ row." },
  { question: "By 2021/22 the all-adult average had reached about:", options: ["£1,307", "£1,881", "£2,144", "£2,985"], correctIndex: 2, explanation: "About £2,144 — roughly 80% above 2013/14 in cash terms (our arithmetic)." },
  { question: "Why is the 2020/21 figure of £1,881 not placed in the adult series?", options: ["It is in US dollars", "It averages adults, children and neonates", "It excludes nursing costs", "It is a tariff price"], correctIndex: 1, explanation: "The DHSC answer gives an all-ages critical care figure, not an adult-only one." },
  { question: "Which statement about the cost rise is correct?", options: ["It is inflation-adjusted", "It spans a change from Reference Costs to the National Cost Collection", "It reflects tariff prices", "It is mainly driven by 0-organ days"], correctIndex: 1, explanation: "The costing method changed, and figures are cash, so not all the rise is real spending growth." },
  { question: "Adult critical care days are costed by:", options: ["Diagnosis", "APACHE II score", "Number of organs supported", "Unit size"], correctIndex: 2, explanation: "HRGs XC01Z–XC07Z run from 0 to 6 or more organs supported." },

  { question: "The NHS National Schedule costs adult critical care by:", options: ["Diagnosis", "Bed day by organs supported", "Admission", "Consultant episode"], correctIndex: 1, explanation: "HRGs XC01Z–XC07Z, per bed day by number of organs supported; condition costs come from studies." },
  { question: "In Paoli 2018 (US), the mean hospital cost of septic shock was:", options: ["$16,324", "$24,638", "$38,298", "$51,022"], correctIndex: 2, explanation: "$38,298; $51,022 was sepsis not present at admission." },
  { question: "In Edbrooke 1999 (UK ICU), which sepsis patients cost most?", options: ["Septic on admission", "Septic on day 2", "Sepsis after day 2", "No difference"], correctIndex: 2, explanation: "Median $17,963 when sepsis developed after day 2, largely through longer stays." },
  { question: "The matched hospital cost difference attributed to VAP in Kollef 2012 was about:", options: ["$1,522", "$16,324", "$39,828", "$99,598"], correctIndex: 2, explanation: "$99,598 vs $59,770 = $39,828." },
  { question: "The mean cost of the initial ICU stay for ventilated ARDS patients in the UK OSCAR analysis was:", options: ["£1,738", "£26,857", "£43,100", "£90,206"], correctIndex: 1, explanation: "£26,857, at £1,738 per ICU day. £43,100 is the INHALE HAP/VAP figure." },
  { question: "Why should UK and US condition costs not be converted by exchange rate?", options: ["Exchange rates are volatile", "Years, methods and cost scope differ", "US figures are estimates", "NHS figures exclude staff"], correctIndex: 1, explanation: "They span decades, use charges vs trust-reported costs, and count ICU-only vs whole-hospital stays." },
  { question: "In the 2019/20 NHS schedule, the average cost of a paediatric intensive care unit bed day (excluding transport) was about:", options: ["£1,162", "£1,620", "£2,235", "£7,866"], correctIndex: 2, explanation: "£2,235 by our weighted arithmetic from the CCU04 rows; £1,620 is the adult average and £7,866 the most intensive children's level." },
  { question: "In the CHiP trial, mean total cost per child admitted after cardiac surgery was about:", options: ["£5,702", "£16,000–£17,000", "£26,857", "£43,100"], correctIndex: 1, explanation: "£16,228 (tight control) and £17,005 (conventional)." },

  { question: "The 2019/20 NHS adult average critical care bed-day cost is about:", options: ["£345", "£1,620", "£4,375", "£7,259"], correctIndex: 1, explanation: "About £1,620 per day, our arithmetic from the NHS England 2019/20 schedule rows." },
  { question: "Hicks 2019 found the mean cost per patient bed-day across 36 Australian ICUs was:", options: ["A$1,620", "A$2,670", "A$4,375", "A$9,852"], correctIndex: 2, explanation: "A$4,375 (SD A$1,157) in 2013/14 data; 2019 CPI equivalent A$4,875." },
  { question: "In the Hicks 2019 Australian study, lower cost per bed-day was significantly associated with:", options: ["Rural location and private status", "Higher bed number and higher occupancy", "More organs supported and longer stay", "Lower nurse ratios"], correctIndex: 1, explanation: "Both higher ICU bed number and higher occupancy were associated with lower cost per bed-day." },
  { question: "Tan 2012 applied one costing method to seven ICUs in Germany, Italy, the Netherlands and the UK and found direct costs per ICU day of:", options: ["€116–€202", "€1,168–€2,025", "€11,680–€20,250", "Identical in all seven"], correctIndex: 1, explanation: "€1,168 to €2,025; labour was the most important cost driver at all departments." },
  { question: "The NZ$7,259 Auckland DHB figure should be treated cautiously because:", options: ["It excludes staff costs", "It is one board, COVID-era, respiratory case mix, including lab/radiology/pharmacy/theatre", "It is a tariff, not a cost", "It is from 1999"], correctIndex: 1, explanation: "It is a single district health board figure from 2020/21 for adults with respiratory complaints, bundling costs other studies count separately." },
  { question: "Dasta 2005 estimated the adjusted incremental daily cost of mechanical ventilation in US ICUs as about:", options: ["$152", "$1,522", "$15,220", "$31,574"], correctIndex: 1, explanation: "$1,522 per day (p < .001), from 2002 charge-derived data." },
];

export default function IcuCostsTopic() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      const details = target instanceof HTMLDetailsElement ? target : target.querySelector("details");
      if (details instanceof HTMLDetailsElement) details.open = true;
      target.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return <TopicTemplate title="ICU Costs: NHS Trends, Conditions and International Comparisons" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu" topicId="icu-costs" topicTitle="ICU Costs"
    objectives={["Interpret NHS adult bed-day costs by organ support and unit type", "Describe the verified NHS cost timeline and its limitations", "Distinguish condition-level, paediatric and whole-hospital costs", "Compare international studies without equating currencies or methods", "Use historical bed-day rates for teaching arithmetic, not patient cost prediction"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["NCC 2019/20 schedule"] }}
    keyPoints={[
      { text: "NHS adult critical care bed days are grouped by organs supported; unit-function costs are not diagnosis costs or tariff prices", cites: ["NCC 2019/20 schedule", "NCC 2019/20 specialist one-organ rows"] },
      { text: "Verified adult weighted averages: £1,190 in 2013/14 to £2,144 in 2021/22, about 80% higher in cash terms (our arithmetic); missing years are not interpolated", cites: ["RC 2013-14 adult CC by organs", "NCC 2021/22 adult CC by organs"] },
      { text: "The £1,881 figure for 2020/21 includes adults, children and neonates and is not an adult-only timeline value", cites: ["DHSC 2023 NHS bed-day costs", "DHSC 2023 critical care caveat"] },
      { text: "Sepsis, pneumonia and ARDS studies have different years, populations and cost scopes; ICU and whole-hospital costs must not be conflated", cites: ["Paoli 2018 sepsis costs", "Kollef 2012 VAP costs", "Marti 2016 ARDS costs"] },
      { text: "PICU uses care-level HRGs rather than adult organ-support groups; the 2019/20 weighted bed-day average excluding transport is about £2,235 (our arithmetic)", cites: ["NCC 2019/20 PICU by care level"] },
      { text: "International figures cannot be compared by exchange rate alone, and historical averages cannot predict a patient's bill", cites: ["Hicks 2019 mean bed-day cost", "Tan 2012 four-country range", "Dasta 2005 daily cost"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-10">
      <p className="text-muted-foreground leading-relaxed">NHS adult critical care costs, historical trends, condition-specific studies, children's intensive care and international comparisons. Figures retain their original years, currencies and cost scopes: these are reported costs, not prices paid, and averages calculated across published rows are labelled as our arithmetic. Source-checked, not consultant-reviewed.</p>
      <nav aria-label="ICU cost sections" className="border-y border-border py-4">
        <ol className="grid gap-2 sm:grid-cols-2 text-sm text-primary">
          <li><Link className="underline" to="#cost-nhs">1. NHS adult bed-day costs</Link></li>
          <li><Link className="underline" to="#cost-timeline">2. NHS costs over time</Link></li>
          <li><Link className="underline" to="#cost-conditions">3. Costs by condition</Link></li>
          <li><Link className="underline" to="#cost-children">4. Children's intensive care</Link></li>
          <li><Link className="underline" to="#cost-countries">5. International comparisons</Link></li>
          <li><Link className="underline" to="#cost-international">6. Costs after discharge</Link></li>
          <li><Link className="underline" to="#cost-calculator">7. Cost calculator</Link></li>
        </ol>
      </nav>
      <section id="cost-nhs" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">1. NHS adult bed-day costs</h2>
      <ExamSection id="cost-average" exams={exams}><CollapsibleSubsection title="1. What an NHS critical care day costs" defaultOpen><CostAverageTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-organs" exams={exams}><CollapsibleSubsection title="2. Cost by number of organs supported"><CostOrgansTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-unit-type" exams={exams}><CollapsibleSubsection title="3. Cost by type of unit"><CostUnitTypeTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section id="cost-timeline" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">2. NHS costs over time</h2>
      <ExamSection id="timeline-series" exams={exams}><CollapsibleSubsection title="1. Cost per adult bed day, year by year" defaultOpen><TimelineSeriesTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="timeline-organs" exams={exams}><CollapsibleSubsection title="2. Change by organs supported"><TimelineOrgansTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="timeline-caveats" exams={exams}><CollapsibleSubsection title="3. Reading the trend safely"><TimelineCaveatsTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section id="cost-conditions" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">3. Costs by condition</h2>
      <ExamSection id="condition-summary" exams={exams}><CollapsibleSubsection title="1. Summary by condition" defaultOpen><ConditionSummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="condition-sepsis" exams={exams}><CollapsibleSubsection title="2. Sepsis"><ConditionSepsisTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="condition-pneumonia" exams={exams}><CollapsibleSubsection title="3. Ventilator- and hospital-acquired pneumonia"><ConditionPneumoniaTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="condition-ventilation" exams={exams}><CollapsibleSubsection title="4. ARDS and mechanical ventilation"><ConditionVentilationTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section id="cost-children" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">4. Children's intensive care</h2>
      <ExamSection id="condition-children" exams={exams}><CollapsibleSubsection title="5. Children's intensive care (PICU)"><ConditionChildrenTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section id="cost-countries" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">5. International comparisons</h2>
      <ExamSection id="cost-country-summary" exams={exams}><CollapsibleSubsection title="1. Summary by country" defaultOpen><CostCountrySummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-uk" exams={exams}><CollapsibleSubsection title="2. United Kingdom: NHS reference costs"><CostCountryUkTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-australia" exams={exams}><CollapsibleSubsection title="3. Australia: ANZICS registry costing"><CostCountryAustraliaTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-nz" exams={exams}><CollapsibleSubsection title="4. New Zealand: a single-board figure"><CostCountryNzTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-europe" exams={exams}><CollapsibleSubsection title="5. Europe: standardised cross-country studies"><CostCountryEuropeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cost-country-us" exams={exams}><CollapsibleSubsection title="6. United States: charge-derived costs"><CostCountryUsTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section className="space-y-6">
        <h2 className="text-3xl font-serif font-bold">6. Costs after discharge and comparison limits</h2>
      <ExamSection id="cost-international" exams={exams}><CollapsibleSubsection title="4. US comparison and costs after discharge"><CostInternationalTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section className="space-y-6">
        <h2 className="text-3xl font-serif font-bold">7. Teaching cost calculator</h2>
      <ExamSection id="cost-calculator" exams={exams}><CollapsibleSubsection title="5. ICU cost calculator" defaultOpen><IcuCostCalculator /></CollapsibleSubsection></ExamSection>
      </section>
    </div>}
  />;
}
