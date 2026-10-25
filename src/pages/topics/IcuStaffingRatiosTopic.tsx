import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { StaffingOverviewTeaching, StaffingConsultantTeaching, StaffingResidentTeaching, StaffingNursingTeaching, StaffingMdtTeaching } from "@/components/topic/IcuStaffingTeaching";


import { UnitSummaryTeaching, UnitCardiothoracicTeaching, UnitNeuroBurnsTeaching, UnitRemoteEnhancedTeaching } from "@/components/topic/IcuStaffingByUnitTeaching";
import { CountrySummaryTeaching, CountryUkTeaching, CountryAnzTeaching, CountryEuropeTeaching, CountryUsTeaching } from "@/components/topic/IcuStaffingByCountryTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "GPICS V3 daytime consultant in ICM to patient ratio must not normally exceed:", options: ["1:4–1:6", "1:8–1:12", "1:15", "1:20"], correctIndex: 1, explanation: "A range between 1:8 and 1:12, during the daytime." },
  { question: "A non-resident consultant responsible for the ICU must be able to attend within:", options: ["15 minutes", "30 minutes", "60 minutes", "Next morning"], correctIndex: 1, explanation: "Immediately available 24/7: continually contactable and able to attend within 30 minutes." },
  { question: "The on-site doctor and ACCP staff to patient ratio must not normally exceed:", options: ["1:8 by day only", "1:8 24/7", "1:12 at night", "1:4"], correctIndex: 1, explanation: "1:8, 24 hours a day." },
  { question: "Minimum registered nurse ratios for level 3 and level 2 patients:", options: ["1:2 and 1:4", "1:1 and 1:2", "1:1 and 1:3", "1:1 for both"], correctIndex: 1, explanation: "1:1 for level 3, 1:2 for level 2, plus a clinical shift leader not allocated a patient, 24/7." },
  { question: "Bank/agency registered nurses not substantively employed may make up no more than:", options: ["10% of a shift", "20% of a shift", "50% of a shift", "No limit"], correctIndex: 1, explanation: "No more than 20% on any one shift." },
  { question: "The GPICS V3 minimum pharmacist establishment is:", options: ["One per hospital", "0.14 WTE per ICU bed", "1 WTE per 75 staff", "Seven-day dedicated ICU pharmacist"], correctIndex: 1, explanation: "0.14 WTE per bed; core services seven days, ICU pharmacist available five days." },
  { question: "Which allied health service must have 24-hour emergency access?", options: ["Dietetics", "Occupational therapy", "Respiratory physiotherapy", "Speech and language therapy"], correctIndex: 2, explanation: "Physiotherapy, dietetics, SLT and OT need 5-day access; only respiratory physiotherapy has a 24-hour emergency standard." },
  { question: "How long must novice ICU nurses be supernumerary?", options: ["2 weeks", "6 weeks", "12 weeks", "2 years"], correctIndex: 2, explanation: "12 weeks. Trainee ACCPs, by contrast, are supernumerary for two years." },
  { question: "How does GPICS V3 set nurse staffing for cardiothoracic and neurocritical care units?", options: ["Their own higher ratios", "By the general staffing chapters", "1:1 for all patients", "Locally, with no minimum"], correctIndex: 1, explanation: "Both chapters state staffing must adhere to the minimum standards in the relevant staffing chapters of GPICS V3." },
  { question: "In a cardiothoracic ICU, in addition to the on-site doctor or ACCP, there must be:", options: ["A second ICM consultant", "A cardiothoracic surgeon", "A perfusionist on the unit", "An anaesthetist"], correctIndex: 1, explanation: "Minimum standard 3 of chapter 1.8; perfusion services must be readily available, not on the unit." },
  { question: "The cardiothoracic on-site rota must be trained in:", options: ["ATLS", "CALS and able to reopen the chest 24/7", "ECMO cannulation", "TOE accreditation"], correctIndex: 1, explanation: "Cardiac Surgery Advanced Life Support and chest reopening, 24/7. A TOE-competent clinician must be readily available, not every rota member." },
  { question: "Burns patients needing intensive care must be managed by:", options: ["The ICU consultant alone", "The burns surgeon alone", "Burns surgery and ICM consultants jointly", "A burns nurse specialist"], correctIndex: 2, explanation: "Joint consultant management with burns-specific training." },
  { question: "For smaller remote and rural ICUs, GPICS V3 requires:", options: ["A resident consultant", "ICM consultant advice 24/7 and network support", "Transfer of all level 3 patients", "No on-site rota"], correctIndex: 1, explanation: "Consultant advice 24/7, network support, and a dedicated 24/7 on-site doctor/ACCP rota." },
  { question: "The enhanced care nurse:patient ratio in GPICS V3 is:", options: ["1:2", "1:3", "1:4", "Not fixed — matched to acuity and workload"], correctIndex: 3, explanation: "Recommendation 3 of chapter 1.12; the minimum standards cover leadership and twice-daily review." },
  { question: "The minimum nurse:patient ratio for the sickest ICU patients in GPICS V3, CICM IC-1 and ESICM 2011 is:", options: ["1:2", "1:1", "1:3", "Not specified"], correctIndex: 1, explanation: "All three give 1:1 for level 3 / ventilated / level of care III patients." },
  { question: "ESICM 2011 suggests nursing whole-time posts per level III bed of:", options: ["2", "3", "6", "8"], correctIndex: 2, explanation: "6 FTE per bed at 1/1; 3 at level II (1/2) and 2 at level I (1/3)." },
  { question: "CICM IC-1 scales specialist cover in larger ICUs by:", options: ["A 1:8 patient ratio", "One specialist per pod of 8–15 beds", "One per 20 beds", "Telemedicine"], correctIndex: 1, explanation: "At least one specialist at all times; in larger units one per pod of 8–15 beds (should)." },
  { question: "The Leapfrog standard requires an on-site intensivist in the daytime for at least:", options: ["4 hours, 5 days", "8 hours, 7 days", "12 hours, 7 days", "24 hours, 7 days"], correctIndex: 1, explanation: "At least 8 hours per day, 7 days per week, working exclusively in one ICU." },
  { question: "Which standard covers doctors only, not nurses?", options: ["GPICS V3", "CICM IC-1", "ESICM 2011", "Leapfrog"], correctIndex: 3, explanation: "Leapfrog's ICU Physician Staffing standard covers intensivist presence and response only." },
  { question: "A UK non-resident ICU consultant must be able to attend within:", options: ["5 minutes", "15 minutes", "30 minutes", "60 minutes"], correctIndex: 2, explanation: "GPICS V3 chapter 2.1: continually contactable and able to attend within 30 minutes." },
];

export default function IcuStaffingRatiosTopic() {
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
  return <TopicTemplate title="ICU Staffing: Roles, Specialist Units and International Standards" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu" topicId="icu-staffing-ratios" topicTitle="ICU Staffing: Roles, Specialist Units and International Standards"
    objectives={["State the GPICS V3 consultant, resident and nurse ratios and the hours each applies", "Calculate a shift's minimum registered nurse numbers from patient levels", "Describe pharmacy, AHP and support-staff minimum standards", "Relate day and night medical staffing to the evidence on intensivist models", "Describe specialist-unit additions to the adult GPICS baseline", "Compare international staffing standards with their dates and scope"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 consultant ratio", "GPICS V3 resident ratio", "GPICS V3 nurse ratios", "GPICS V3 pharmacist", "GPICS V3 cardiothoracic consultant", "CICM IC-1 nurse ratios"] }}
    keyPoints={[
      { text: "Daytime ICM consultant ratio 1:8 to 1:12; twice-daily ward rounds, one face-to-face, 7 days", cites: ["GPICS V3 consultant ratio", "GPICS V3 ward round"] },
      { text: "Out of hours, the responsible consultant must be contactable and able to attend within 30 minutes", cites: ["GPICS V3 consultant availability"] },
      { text: "On-site doctor/ACCP ratio not normally above 1:8, 24/7; trainee ACCPs are supernumerary for two years", cites: ["GPICS V3 resident ratio", "GPICS V3 ACCP supernumerary"] },
      { text: "Nurses 1:1 level 3 and 1:2 level 2, plus a 24/7 shift leader not allocated a patient", cites: ["GPICS V3 nurse ratios", "GPICS V3 coordinator"] },
      { text: "Extra enhanced nurse above 10 beds; no more than 20% bank/agency per shift", cites: ["GPICS V3 additional nurse", "GPICS V3 bank agency"] },
      { text: "Pharmacist 0.14 WTE per bed; AHPs 5-day access, emergency respiratory physiotherapy 24 h", cites: ["GPICS V3 pharmacist", "GPICS V3 physiotherapy"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-10">
      <p className="text-muted-foreground leading-relaxed">Adult ICU staffing by role and shift, specialist-unit requirements and international comparisons. GPICS V3 quotations (January 2026) retain their source check dated 15 October 2026; CICM IC-1 (reviewed 2016), ESICM 2011 and Leapfrog 2026 differ in date, status and scope. GPICS covers adult intensive care and does not set children's ICU ratios. Tables and worked examples are teaching synthesis; local commissioning, specialist service specifications and later guidance also apply. Source-checked, not consultant-reviewed.</p>
      <nav aria-label="ICU staffing sections" className="border-y border-border py-4">
        <ol className="grid gap-2 sm:grid-cols-3 text-sm text-primary">
          <li><Link className="underline" to="#staffing-roles">1. Roles and shifts</Link></li>
          <li><Link className="underline" to="#staffing-units">2. Specialist units</Link></li>
          <li><Link className="underline" to="#staffing-countries">3. International standards</Link></li>
        </ol>
      </nav>
      <section id="staffing-roles" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">1. Roles and shifts: GPICS V3</h2>
      <ExamSection id="staffing-overview" exams={exams}><CollapsibleSubsection title="1. Summary by role and shift" defaultOpen><StaffingOverviewTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-consultant" exams={exams}><CollapsibleSubsection title="2. Consultants: day and night"><StaffingConsultantTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-resident" exams={exams}><CollapsibleSubsection title="3. Resident doctors and ACCPs"><StaffingResidentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-nursing" exams={exams}><CollapsibleSubsection title="4. Nursing ratios per shift"><StaffingNursingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-mdt" exams={exams}><CollapsibleSubsection title="5. Pharmacy, allied health and support staff"><StaffingMdtTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section id="staffing-units" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">2. Specialist units and enhanced care</h2>
      <ExamSection id="unit-summary" exams={exams}><CollapsibleSubsection title="1. Summary by unit type" defaultOpen><UnitSummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="unit-cardiothoracic" exams={exams}><CollapsibleSubsection title="2. Cardiothoracic intensive care"><UnitCardiothoracicTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="unit-neuro-burns" exams={exams}><CollapsibleSubsection title="3. Neurocritical care and burns"><UnitNeuroBurnsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="unit-remote-enhanced" exams={exams}><CollapsibleSubsection title="4. Remote and rural units, and enhanced care"><UnitRemoteEnhancedTeaching /></CollapsibleSubsection></ExamSection>
      </section>
      <section id="staffing-countries" className="space-y-6 scroll-mt-28">
        <h2 className="text-3xl font-serif font-bold">3. International staffing standards</h2>
      <ExamSection id="country-summary" exams={exams}><CollapsibleSubsection title="1. Summary by role and country" defaultOpen><CountrySummaryTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-uk" exams={exams}><CollapsibleSubsection title="2. United Kingdom: GPICS V3"><CountryUkTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-anz" exams={exams}><CollapsibleSubsection title="3. Australia and New Zealand: CICM IC-1"><CountryAnzTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-europe" exams={exams}><CollapsibleSubsection title="4. Europe: ESICM recommendations"><CountryEuropeTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="country-us" exams={exams}><CollapsibleSubsection title="5. United States: Leapfrog physician staffing"><CountryUsTeaching /></CollapsibleSubsection></ExamSection>
      </section>
    </div>}
  />;
}
