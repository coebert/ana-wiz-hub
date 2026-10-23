import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { AnaestheticAdverseEventsTeaching, AnaestheticRiskReductionTeaching } from "@/components/topic/AnaestheticAdverseEventsTeaching";
import { RiskPredictionTeaching, RiskConsentTeaching, RiskCommunicationTeaching } from "@/components/topic/AnaestheticRiskTeaching";
import { anaestheticRiskQuiz } from "@/data/anaestheticRiskQuiz";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC];

export default function AnaestheticRiskTopic() {
  return <TopicTemplate title="Anaesthetic Risk & Informed Consent" subtitle="FRCA / FFICM / EDIC — Perioperative Medicine" backPath="/perioperative" backLabel="Perioperative Medicine" accentColor="text-perioperative" topicId="anaesthetic-risk" topicTitle="Anaesthetic Risk & Informed Consent"
    objectives={[
      "Describe common side effects and serious adverse events using qualified absolute frequencies",
      "Distinguish anaesthesia-attributable harms from perioperative complications and postoperative mortality",
      "Select and interpret risk tools for the correct patient population, outcome and time horizon",
      "Communicate risk, uncertainty and reasonable alternatives in a patient-centred discussion",
      "Apply current UK consent principles, including material risk, capacity, refusal and emergencies",
      "Plan individualised prevention, postoperative monitoring and follow-up after harm",
    ]}
    sectionExamMapping={{ objectives: { exams }, workedExamples: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["RCoA population", "NAP7 incidence", "SORT 2014", "Association Consent 2026", "GMC patient priorities"] }}
    coreConcepts={<div className="space-y-8">
      <ExamSection id="adverse-event-frequencies" exams={exams}><CollapsibleSubsection title="Adverse events and side effects: frequencies with context" defaultOpen><AnaestheticAdverseEventsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="risk-prediction" exams={exams}><CollapsibleSubsection title="Individual risk prediction: choose the right endpoint"><RiskPredictionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="informed-consent" exams={exams}><CollapsibleSubsection title="Informed consent for anaesthesia: current UK guidance"><RiskConsentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="risk-communication" exams={exams}><CollapsibleSubsection title="Communicating probabilities without false reassurance"><RiskCommunicationTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="risk-reduction" exams={exams}><CollapsibleSubsection title="Reducing risk and planning safe recovery"><AnaestheticRiskReductionTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
    workedExamples={[
      { title: "Fictional case: a singer considering general anaesthesia", scenario: "A professional singer needs elective surgery and asks whether a low overall death risk means there is nothing to worry about.", working: "Explore the importance of voice, airway instrumentation, dental condition and postoperative throat symptoms. Distinguish common temporary sore throat from lasting vocal injury; the 20–40% sore-throat figure does not quantify permanent voice damage. Discuss clinically reasonable techniques and their limitations, without promising that sedation or regional anaesthesia is risk-free.", answer: "The discussion centres on the singer’s material risks and reasonable alternatives, not mortality alone. Record priorities, uncertainties and the agreed airway/anaesthetic plan.", cites: ["Montgomery 2015", "RCoA sore throat", "GMC patient priorities"] },
      { title: "Fictional case: frailty and emergency abdominal surgery", scenario: "An older adult with frailty and sepsis needs emergency laparotomy. The team asks whether the routine 1-in-100,000 direct anaesthetic death figure is appropriate for consent.", working: "It is not: that estimate is framed for healthy adults and routine surgery. Use an applicable NELA estimate with current inputs, clinical judgement, baseline function and uncertainty. Explain postoperative death, complications, organ support, loss of independence and the consequences of not operating. Urgency does not automatically remove capacity.", answer: "Seek a supported patient-centred decision and agree postoperative support and treatment limits. Any model estimate is postoperative risk, not death attributable solely to anaesthesia.", cites: ["RCoA mortality", "NELA calculator", "CPOC Frailty", "GMC emergency"] },
      { title: "Fictional arithmetic: relative versus absolute benefit", scenario: "A hypothetical intervention reduces the same defined 30-day event from 2% to 1% in comparable populations.", working: "2% = 200 events per 10,000; 1% = 100 per 10,000. Absolute reduction = 1 percentage point; relative reduction = (2 − 1)/2 = 50%; NNT = 1/0.01 = 100 over 30 days. These invented inputs are not measured anaesthetic treatment effects.", answer: "Explain 100 fewer events per 10,000, not just a 50% reduction. Real clinical use needs valid evidence, comparable endpoints and uncertainty; arithmetic alone does not prove benefit.", cites: ["GMC information"] },
      { title: "Fictional case: refusal and a signed form", scenario: "A capable patient signed a surgical form yesterday but now declines an epidural because they fear nerve injury. Their relative asks the team to proceed anyway.", working: "Check understanding, explain the proposed epidural’s benefits, technique-specific risks and alternatives, and allow questions. A signed form is not blanket permission for an unwanted technique. A relative cannot override a capable adult’s decision; do not infer incapacity from disagreement.", answer: "Respect the refusal, agree a clinically reasonable alternative and document the revised plan and discussion.", cites: ["GMC refusal", "GMC capacity", "GMC recording", "NAP3 neuraxial"] },
    ]}
    keyPoints={[
      { text: "Population averages require an event definition, denominator, date and case-mix; do not add overlapping risks or treat historical audit rates as individual predictions.", cites: ["RCoA population", "NAP7 incidence"] },
      { text: "NAP5 reported awareness about 1 in 19,600 general anaesthetics; ascertainment and neuromuscular-block subgroups materially change the estimate.", cites: ["NAP5 incidence", "NAP5 muscle relaxation"] },
      { text: "NAP6 severe perioperative anaphylaxis is about 1 in 10,000; NAP7 arrest is about 3 in 10,000. Neither figure is an all-case anaesthesia-attributable death rate.", cites: ["NAP6 incidence", "NAP7 incidence"] },
      { text: "SORT, NELA and NSQIP predict postoperative outcomes, not anaesthetic causation; ASA physical status alone is not a calibrated risk percentage.", cites: ["SORT 2014", "NELA calculator", "NSQIP", "ASA physical status"] },
      { text: "Use the Association’s 2026 consent guidance and current GMC principles: material risks, patient values, reasonable alternatives and no action; a form cannot replace dialogue.", cites: ["Association Consent 2026", "Montgomery 2015", "GMC patient priorities", "GMC recording"] },
      { text: "Capacity is time- and decision-specific; respect capable refusal, including in emergencies, and apply jurisdiction-specific law when capacity is lacking.", cites: ["GMC capacity", "GMC refusal", "GMC emergency", "Mental Capacity Act"] },
      { text: "Current PONV and delirium guidance support individualised prevention, but do not promise that a technique or prophylactic drug eliminates risk.", cites: ["PONV Fifth prevention", "ESAIC delirium 2024", "ASA older adults 2025"] },
    ]}
    quizQuestions={anaestheticRiskQuiz}
  />;
}