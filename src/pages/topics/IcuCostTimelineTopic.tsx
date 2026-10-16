import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { TimelineSeriesTeaching, TimelineOrgansTeaching, TimelineCaveatsTeaching } from "@/components/topic/IcuCostTimelineTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "The all-adult NHS critical care cost per bed day in 2013/14 (bed-day-weighted from published rows) was about:", options: ["£890", "£1,190", "£1,620", "£2,144"], correctIndex: 1, explanation: "About £1,190; £890 was the one-organ row." },
  { question: "By 2021/22 the all-adult average had reached about:", options: ["£1,307", "£1,881", "£2,144", "£2,985"], correctIndex: 2, explanation: "About £2,144 — roughly 80% above 2013/14 in cash terms (our arithmetic)." },
  { question: "Why is the 2020/21 figure of £1,881 not placed in the adult series?", options: ["It is in US dollars", "It averages adults, children and neonates", "It excludes nursing costs", "It is a tariff price"], correctIndex: 1, explanation: "The DHSC answer gives an all-ages critical care figure, not an adult-only one." },
  { question: "Which statement about the cost rise is correct?", options: ["It is inflation-adjusted", "It spans a change from Reference Costs to the National Cost Collection", "It reflects tariff prices", "It is mainly driven by 0-organ days"], correctIndex: 1, explanation: "The costing method changed, and figures are cash, so not all the rise is real spending growth." },
  { question: "Adult critical care days are costed by:", options: ["Diagnosis", "APACHE II score", "Number of organs supported", "Unit size"], correctIndex: 2, explanation: "HRGs XC01Z–XC07Z run from 0 to 6 or more organs supported." },
];

export default function IcuCostTimelineTopic() {
  return <TopicTemplate title="ICU Cost Timeline: NHS Adult Critical Care Costs Year by Year" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-costs" backLabel="ICU Costs" accentColor="text-icu" topicId="icu-cost-timeline" topicTitle="ICU Cost Timeline: NHS Adult Critical Care Costs Year by Year"
    objectives={["Track the NHS adult critical care bed-day cost from 2013/14 to 2021/22", "Compare how each organ-support level changed", "Explain why cash figures across a costing-method change overstate real growth"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["RC 2013-14 adult CC by organs", "NCC 2021/22 adult CC by organs"] }}
    keyPoints={[
      { text: "Adult average per bed day: about £1,190 (2013/14), £1,307 (2015/16), £1,620 (2019/20), £2,144 (2021/22) — our arithmetic from published rows", cites: ["RC 2013-14 adult CC by organs", "RC 2015-16 adult CC by organs", "NCC 2019/20 schedule", "NCC 2021/22 adult CC by organs"] },
      { text: "2020/21 was published only as an all-ages £1,881 per day, so it is not in the adult series", cites: ["DHSC 2023 NHS bed-day costs"] },
      { text: "Figures are cash, trust-reported costs spanning a costing-method change and COVID", cites: ["DHSC 2023 critical care caveat"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page extends the single-year snapshot on <Link to="/intensive-care/icu-costs" className="text-primary underline">ICU Costs</Link> into a series, using each year's published NHS national cost schedule. Only years we could download and check are shown.</p>
      <ExamSection id="timeline-series" exams={exams}><CollapsibleSubsection title="1. Cost per adult bed day, year by year" defaultOpen><TimelineSeriesTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="timeline-organs" exams={exams}><CollapsibleSubsection title="2. Change by organs supported"><TimelineOrgansTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="timeline-caveats" exams={exams}><CollapsibleSubsection title="3. Reading the trend safely"><TimelineCaveatsTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
