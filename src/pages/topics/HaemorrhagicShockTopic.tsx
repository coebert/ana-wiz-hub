import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ShockRecognitionTeaching, BloodPressureMonitoringTeaching, TransfusionRatioTeaching } from "@/components/topic/HaemorrhagicShockTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "In the TraumaRegister DGU analysis, what proportion of trauma patients fitted an ATLS shock class?", options: ["9.3%", "35%", "62%", "90%"], correctIndex: 0, explanation: "Only 9.3% could be allocated to an ATLS class using heart rate, systolic BP and GCS together." },
  { question: "Heart rate 130, systolic BP 90 mmHg. Which shock index group?", options: ["Group I", "Group II", "Group III", "Group IV"], correctIndex: 3, explanation: "130 ÷ 90 ≈ 1.44, which is SI ≥1.4 (group IV); 57% of group IV needed ≥10 blood units before ICU." },
  { question: "In hypotensive emergency patients, how did cuff MAP compare with arterial line MAP?", options: ["About 13 mmHg lower", "Identical", "About 13 mmHg higher", "About 40 mmHg lower"], correctIndex: 2, explanation: "Meidert: oscillometric MAP was markedly higher, mean difference 13 ± 15 mmHg; 64% of readings missed hypotension." },
  { question: "What MAP does the European guideline recommend in bleeding patients with severe TBI (GCS ≤8)?", options: ["50–60 mmHg", "≥65 mmHg", "≥80 mmHg", "≥100 mmHg"], correctIndex: 2, explanation: "Rossaint 2023: SBP 80–90 mmHg without brain injury, but MAP ≥80 mmHg with severe TBI." },
  { question: "In CRASH-2, what happened when tranexamic acid was first given after 3 hours?", options: ["Greatest benefit", "No effect at all", "Death due to bleeding seemed to increase (RR 1.44)", "Fewer thrombotic events"], correctIndex: 2, explanation: "Late treatment seemed to increase death due to bleeding (4.4% vs 3.1%); give it as early as possible." },
];

export default function HaemorrhagicShockTopic() {
  return <TopicTemplate title="Haemorrhagic Shock & Resuscitation" subtitle="Final / FFICM / EDIC — Trauma & Critical Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu" topicId="haemorrhagic-shock" topicTitle="Haemorrhagic Shock & Resuscitation"
    objectives={["Explain why ATLS shock classes and single vital signs underestimate blood loss", "Calculate and interpret the shock index, lactate and base deficit", "Describe why cuff readings over-read in shock and when to place an arterial line", "State the European and NICE blood pressure approaches, including the brain injury exception", "Summarise PROPPR, PAMPer, RePHILL, CRASH-2 timing and ITACTIC, and the role of calcium"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["Mutschler 2014 ATLS", "Meidert 2021 cuff", "Rossaint 2023 BP target", "CRASH-2 timing 2011"] }}
    keyPoints={[
      { text: "Only 9.3% of trauma patients fitted an ATLS shock class using heart rate, systolic BP and GCS", cites: ["Mutschler 2014 ATLS"] },
      { text: "Shock index ≥1.4: 57% needed ≥10 blood units before ICU admission", cites: ["Mutschler 2013 transfusion"] },
      { text: "Cuff MAP read on average 13 mmHg higher than arterial MAP in shock; 64% of cuff readings missed hypotension", cites: ["Meidert 2021 cuff"] },
      { text: "Target SBP 80–90 mmHg until bleeding stops, but MAP ≥80 mmHg with severe TBI", cites: ["Rossaint 2023 BP target"] },
      { text: "Tranexamic acid within 1 hour reduced death due to bleeding (RR 0.68); after 3 hours it seemed to increase it (RR 1.44)", cites: ["CRASH-2 timing 2011", "CRASH-2 late harm 2011"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons quote registry studies, trials and the 2023 European trauma bleeding guideline word for word in the source popovers. Worked numbers and explanations are teaching reasoning, not patient-specific instructions. For the primary survey, NICE NG39 bolus advice and surgical priorities, see <Link to="/clinical/trauma-emergency" className="text-primary underline">Trauma & Emergency Anaesthesia</Link>.</p>
      <ExamSection id="shock-recognition" exams={exams}><CollapsibleSubsection title="Recognising haemorrhagic shock" defaultOpen><ShockRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="shock-bp-monitoring" exams={exams}><CollapsibleSubsection title="Blood pressure monitoring and targets in bleeding"><BloodPressureMonitoringTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="shock-transfusion" exams={exams}><CollapsibleSubsection title="Transfusion ratios, prehospital blood and tranexamic acid"><TransfusionRatioTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
