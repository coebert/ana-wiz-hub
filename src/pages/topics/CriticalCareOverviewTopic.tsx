import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { GpicsTeaching, IcuStructureTeaching, IcuTeamRolesTeaching, IcuCommunicationTeaching } from "@/components/topic/CriticalCareOverviewTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "In GPICS V3 (2026), what were the old 'standards' renamed?", options: ["Quality recommendations", "Minimum standards", "Core requirements", "Essential practices"], correctIndex: 1, explanation: "V3 renamed 'standards' to 'minimum standards' — something all UK ICUs are expected to meet. 'Recommendations' became 'recommendations for a quality service'." },
  { question: "Under the ICS 2021 levels, a patient who needs invasive ventilation alone is which level?", options: ["Level 1", "Level 2", "Level 3", "Ward care"], correctIndex: 2, explanation: "“Patients needing advanced respiratory monitoring and support alone” is a level 3 descriptor." },
  { question: "GPICS V3: within what time must an ICU consultant review a new admission in person?", options: ["4 hours", "12 hours", "14 hours", "24 hours"], correctIndex: 2, explanation: "As urgently as the clinical state dictates, and always within 14 hours of admission (V2.1 said 12 hours)." },
  { question: "What is the GPICS minimum registered nurse ratio for a level 2 patient?", options: ["1:1", "1:2", "1:3", "1:4"], correctIndex: 1, explanation: "Level 3 needs at least 1:1; level 2 needs at least 1:2, plus a clinical shift leader who is not allocated a patient." },
  { question: "What did the 2013 randomised trial of overnight in-house intensivists find?", options: ["Lower mortality", "Shorter ICU stay", "No improvement in patient outcomes", "More errors"], correctIndex: 2, explanation: "Kerlin 2013: in an academic ICU, overnight in-house intensivist staffing did not improve patient outcomes." },
  { question: "After a daily goals form was introduced, what proportion of nurses and residents understood the day’s goals?", options: ["Under 10%", "About 50%", "About 75%", "Over 95%"], correctIndex: 3, explanation: "Pronovost 2003: under 10% at baseline, over 95% afterwards (single-unit before-and-after study)." },
];

export default function CriticalCareOverviewTopic() {
  return <TopicTemplate title="Critical Care Overview: Structure, Team & Communication" subtitle="Final / FFICM / EDIC — Organisation of Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu" topicId="critical-care-overview" topicTitle="Critical Care Overview: Structure, Team & Communication"
    objectives={["Explain what GPICS is, its editions, and the difference between minimum standards and quality recommendations", "Define ward care and levels 1–3 using the ICS 2021 descriptors", "State GPICS admission, consultant review and discharge time standards", "Give GPICS medical and nursing ratios and explain the clinical shift leader", "Interpret the evidence for intensivist-led care, including the overnight staffing trial", "Describe daily goals, structured handover and family communication evidence, and their limits"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["ICS Levels 2021 purpose", "GPICS V3 consultant review", "GPICS V3 nurse ratios", "Pronovost 2002 staffing", "Starmer 2014 I-PASS"] }}
    keyPoints={[
      { text: "GPICS V3 (2026) is the definitive reference for planning, commissioning and delivering UK adult intensive care; its tiers are minimum standards and quality recommendations", cites: ["GPICS V3 definitive", "GPICS V3 minimum standards", "GPICS V3 quality recommendations"] },
      { text: "Levels of care describe what the patient needs, not where they are", cites: ["ICS Levels 2021 purpose"] },
      { text: "Advanced respiratory support alone makes a patient level 3", cites: ["ICS Levels 2021 level 3"] },
      { text: "Unplanned admission within 4 hours of the decision; consultant review in person within 14 hours", cites: ["GPICS V3 admission timing", "GPICS V3 consultant review"] },
      { text: "Nurse ratios at least 1:1 for level 3 and 1:2 for level 2, with a clinical shift leader not allocated a patient 24/7", cites: ["GPICS V3 nurse ratios", "GPICS V3 coordinator"] },
      { text: "High-intensity intensivist staffing: pooled hospital mortality RR 0.71 in observational studies", cites: ["Pronovost 2002 staffing"] },
      { text: "I-PASS handover programme: medical errors down 23%, preventable adverse events down 30%", cites: ["Starmer 2014 I-PASS"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">To follow one patient from referral to discharge, see <Link to="/intensive-care/icu-inpatient-journey" className="text-primary underline">The ICU Inpatient Journey</Link>. Emergency pages: <Link to="/intensive-care/sepsis-resuscitation" className="text-primary underline">Septic shock resuscitation</Link>, <Link to="/intensive-care/icu-anaphylaxis" className="text-primary underline">Anaphylaxis</Link> and <Link to="/intensive-care/icu-eclampsia" className="text-primary underline">Severe pre-eclampsia and eclampsia</Link>.</p>
      <p className="text-muted-foreground leading-relaxed">These lessons quote the ICS levels of care, the FICM/ICS GPICS V3 standards and key trials word for word in the source popovers. Worked numbers and explanations are teaching reasoning, not local staffing policy. Related pages: <Link to="/intensive-care/non-technical-skills" className="text-primary underline">Non-technical Skills</Link>, <Link to="/intensive-care/end-of-life-communication" className="text-primary underline">End-of-Life Care &amp; Communication</Link>, <Link to="/intensive-care/ventilation-protocols" className="text-primary underline">ICU Ventilation Protocols</Link> and <Link to="/intensive-care/pics-follow-up" className="text-primary underline">PICS Follow-up</Link>.</p>
      <ExamSection id="gpics" exams={exams}><CollapsibleSubsection title="GPICS: the UK intensive care standards" defaultOpen><GpicsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="icu-structure" exams={exams}><CollapsibleSubsection title="ICU structure: levels of care and time standards" defaultOpen><IcuStructureTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="icu-team-roles" exams={exams}><CollapsibleSubsection title="Team roles and staffing"><IcuTeamRolesTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="icu-communication" exams={exams}><CollapsibleSubsection title="Communication: daily goals, handover and families"><IcuCommunicationTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
