import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { CountrySummaryTeaching, CountryUkTeaching, CountryAnzTeaching, CountryEuropeTeaching, CountryUsTeaching } from "@/components/topic/IcuStaffingByCountryTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "The minimum nurse:patient ratio for the sickest ICU patients in GPICS V3, CICM IC-1 and ESICM 2011 is:", options: ["1:2", "1:1", "1:3", "Not specified"], correctIndex: 1, explanation: "All three give 1:1 for level 3 / ventilated / level of care III patients." },
  { question: "ESICM 2011 suggests nursing whole-time posts per level III bed of:", options: ["2", "3", "6", "8"], correctIndex: 2, explanation: "6 FTE per bed at 1/1; 3 at level II (1/2) and 2 at level I (1/3)." },
  { question: "CICM IC-1 scales specialist cover in larger ICUs by:", options: ["A 1:8 patient ratio", "One specialist per pod of 8–15 beds", "One per 20 beds", "Telemedicine"], correctIndex: 1, explanation: "At least one specialist at all times; in larger units one per pod of 8–15 beds (should)." },
  { question: "The Leapfrog standard requires an on-site intensivist in the daytime for at least:", options: ["4 hours, 5 days", "8 hours, 7 days", "12 hours, 7 days", "24 hours, 7 days"], correctIndex: 1, explanation: "At least 8 hours per day, 7 days per week, working exclusively in one ICU." },
  { question: "Which standard covers doctors only, not nurses?", options: ["GPICS V3", "CICM IC-1", "ESICM 2011", "Leapfrog"], correctIndex: 3, explanation: "Leapfrog's ICU Physician Staffing standard covers intensivist presence and response only." },
  { question: "A UK non-resident ICU consultant must be able to attend within:", options: ["5 minutes", "15 minutes", "30 minutes", "60 minutes"], correctIndex: 2, explanation: "GPICS V3 chapter 2.1: continually contactable and able to attend within 30 minutes." },
];

export default function IcuStaffingByCountryTopic() {
  return <TopicTemplate title="ICU Staffing by Country: GPICS V3 and International Standards" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/icu-staffing-ratios" backLabel="ICU Staffing Ratios" accentColor="text-icu" topicId="icu-staffing-by-country" topicTitle="ICU Staffing by Country: GPICS V3 and International Standards"
    objectives={["Compare GPICS V3 nurse and doctor standards with Australian/New Zealand, European and US standards", "Quote the CICM IC-1 nurse ratios and specialist roster requirements", "Describe the ESICM levels of care and nursing posts per bed", "Explain how the US Leapfrog standard measures intensivist presence rather than ratios"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 nurse ratios", "CICM IC-1 nurse ratios", "ESICM 2011 nurse ratios", "Leapfrog 2026 daytime intensivist"] }}
    keyPoints={[
      { text: "UK, Australia/New Zealand and Europe all set 1:1 nursing for the sickest patients and 1:2 for the next level", cites: ["GPICS V3 nurse ratios", "CICM IC-1 nurse ratios", "ESICM 2011 nurse ratios"] },
      { text: "UK: consultant 1:8 to 1:12 by day, able to attend within 30 minutes out of hours", cites: ["GPICS V3 consultant ratio", "GPICS V3 consultant availability"] },
      { text: "Australia/New Zealand: a specialist rostered at all times, one per pod of 8–15 beds in larger units", cites: ["CICM IC-1 specialist roster"] },
      { text: "Europe: 6 nursing posts per level III bed; ratios may need adapting for each country", cites: ["ESICM 2011 nurse ratios", "ESICM 2011 ratio caveat"] },
      { text: "US (Leapfrog): intensivist on site 8 hours a day, 7 days a week; calls returned within 5 minutes", cites: ["Leapfrog 2026 daytime intensivist", "Leapfrog 2026 five-minute response"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page complements <Link to="/intensive-care/icu-staffing-ratios" className="text-primary underline">ICU Staffing Ratios</Link> and <Link to="/intensive-care/icu-staffing-by-unit" className="text-primary underline">ICU Staffing by Unit Type</Link>. Quotations are verbatim from GPICS V3 (January 2026), CICM IC-1 (last reviewed 2016), the ESICM 2011 recommendations and the Leapfrog 2026 factsheet; the comparison table is teaching synthesis. The documents differ in date, status and scope. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="country-summary" exams={exams}><CollapsibleSubsection title="1. Summary by role and country" defaultOpen><CountrySummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-uk" exams={exams}><CollapsibleSubsection title="2. United Kingdom: GPICS V3"><CountryUkTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-anz" exams={exams}><CollapsibleSubsection title="3. Australia and New Zealand: CICM IC-1"><CountryAnzTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-europe" exams={exams}><CollapsibleSubsection title="4. Europe: ESICM recommendations"><CountryEuropeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-us" exams={exams}><CollapsibleSubsection title="5. United States: Leapfrog physician staffing"><CountryUsTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
