import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { StaffingOverviewTeaching, StaffingConsultantTeaching, StaffingResidentTeaching, StaffingNursingTeaching, StaffingMdtTeaching } from "@/components/topic/IcuStaffingTeaching";

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
];

export default function IcuStaffingRatiosTopic() {
  return <TopicTemplate title="ICU Staffing Ratios: GPICS V3 by Role and Shift" subtitle="Final / FFICM / EDIC — Intensive Care" backPath="/intensive-care/critical-care-overview" backLabel="Critical Care Overview" accentColor="text-icu" topicId="icu-staffing-ratios" topicTitle="ICU Staffing Ratios: GPICS V3 by Role and Shift"
    objectives={["State the GPICS V3 consultant, resident and nurse ratios and the hours each applies", "Calculate a shift's minimum registered nurse numbers from patient levels", "Describe pharmacy, AHP and support-staff minimum standards", "Relate day and night medical staffing to the evidence on intensivist models"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["GPICS V3 consultant ratio", "GPICS V3 resident ratio", "GPICS V3 nurse ratios", "GPICS V3 pharmacist"] }}
    keyPoints={[
      { text: "Daytime ICM consultant ratio 1:8 to 1:12; twice-daily ward rounds, one face-to-face, 7 days", cites: ["GPICS V3 consultant ratio", "GPICS V3 ward round"] },
      { text: "Out of hours, the responsible consultant must be contactable and able to attend within 30 minutes", cites: ["GPICS V3 consultant availability"] },
      { text: "On-site doctor/ACCP ratio not normally above 1:8, 24/7; trainee ACCPs are supernumerary for two years", cites: ["GPICS V3 resident ratio", "GPICS V3 ACCP supernumerary"] },
      { text: "Nurses 1:1 level 3 and 1:2 level 2, plus a 24/7 shift leader not allocated a patient", cites: ["GPICS V3 nurse ratios", "GPICS V3 coordinator"] },
      { text: "Extra enhanced nurse above 10 beds; no more than 20% bank/agency per shift", cites: ["GPICS V3 additional nurse", "GPICS V3 bank agency"] },
      { text: "Pharmacist 0.14 WTE per bed; AHPs 5-day access, emergency respiratory physiotherapy 24 h", cites: ["GPICS V3 pharmacist", "GPICS V3 physiotherapy"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page expands the staffing section of <Link to="/intensive-care/critical-care-overview" className="text-primary underline">Critical Care Overview</Link>. Quotations are verbatim from GPICS Version 3 (FICM/ICS, January 2026), checked 15 October 2026; tables and worked examples are teaching synthesis. Local commissioning, devolved-nation requirements and later GPICS updates take precedence. Source-checked, not consultant-reviewed.</p>
      <ExamSection id="staffing-overview" exams={exams}><CollapsibleSubsection title="1. Summary by role and shift" defaultOpen><StaffingOverviewTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-consultant" exams={exams}><CollapsibleSubsection title="2. Consultants: day and night"><StaffingConsultantTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-resident" exams={exams}><CollapsibleSubsection title="3. Resident doctors and ACCPs"><StaffingResidentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-nursing" exams={exams}><CollapsibleSubsection title="4. Nursing ratios per shift"><StaffingNursingTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="staffing-mdt" exams={exams}><CollapsibleSubsection title="5. Pharmacy, allied health and support staff"><StaffingMdtTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
