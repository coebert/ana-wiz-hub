import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { AnaestheticAdverseEventsTeaching, AnaestheticRiskReductionTeaching } from "@/components/topic/AnaestheticAdverseEventsTeaching";
import { RiskPredictionTeaching, RiskConsentTeaching, RiskCommunicationTeaching } from "@/components/topic/AnaestheticRiskTeaching";
import { PreExistingConditionRiskTeaching, AgeRelatedRiskTeaching, SurgerySpecificRiskTeaching } from "@/components/topic/PatientSurgeryRiskTeaching";
import { CognitiveRiskTeaching } from "@/components/topic/CognitiveRiskTeaching";
import { RiskOperationLinks } from "@/components/topic/RiskOperationLinks";
import { PositioningRiskTeaching } from "@/components/topic/PositioningRiskTeaching";
import { RegionalAnaesthesiaRiskTeaching } from "@/components/topic/RegionalAnaesthesiaRiskTeaching";
import { anaestheticRiskQuiz } from "@/data/anaestheticRiskQuiz";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC];

export default function AnaestheticRiskTopic() {
  return <TopicTemplate title="Anaesthetic Risk & Informed Consent" subtitle="FRCA / FFICM / EDIC — Perioperative Medicine" backPath="/perioperative" backLabel="Perioperative Medicine" accentColor="text-perioperative" topicId="anaesthetic-risk" topicTitle="Anaesthetic Risk & Informed Consent"
    objectives={[
      "Describe common side effects and serious adverse events using qualified absolute frequencies",
      "Distinguish anaesthesia-attributable harms from perioperative complications and postoperative mortality",
      "Summarise the evidence on whether general anaesthesia causes postoperative cognitive dysfunction or permanent decline, in adults and children",
      "Explain how pre-existing conditions and age change perioperative risk",
      "Select and interpret general and surgery-specific risk tools for the correct population, outcome and time horizon",
      "Quote technique-specific risks for neuraxial and peripheral regional anaesthesia, including nerve injury, PDPH and LAST",
      "Describe position-specific harms (prone, lithotomy, beach-chair, lateral, steep head-down) and their evidence base",
      "Communicate risk, uncertainty and reasonable alternatives in a patient-centred discussion",
      "Apply current UK consent principles, including material risk, capacity, refusal and emergencies",
      "Plan individualised prevention, postoperative monitoring and follow-up after harm",
    ]}
    sectionExamMapping={{ objectives: { exams }, workedExamples: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["RCoA population", "NAP7 incidence", "SORT 2014", "Association Consent 2026", "GMC patient priorities"] }}
    coreConcepts={<div className="space-y-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground pt-2">1. The baseline: what can go wrong</h2>
      <ExamSection id="adverse-event-frequencies" exams={exams}><CollapsibleSubsection title="Adverse events and side effects: frequencies with context" defaultOpen><AnaestheticAdverseEventsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="cognitive-risk" exams={exams}><CollapsibleSubsection title="Cognitive effects: postoperative cognitive dysfunction and lasting decline"><CognitiveRiskTeaching /></CollapsibleSubsection></ExamSection>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground pt-2">2. The patient: who is at higher risk</h2>
      <ExamSection id="pre-existing-condition-risk" exams={exams}><CollapsibleSubsection title="Pre-existing conditions and anaesthetic risk"><PreExistingConditionRiskTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="age-related-risk" exams={exams}><CollapsibleSubsection title="Age-related risks: older adults and children"><AgeRelatedRiskTeaching /></CollapsibleSubsection></ExamSection>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground pt-2">3. Predicting an individual’s risk</h2>
      <ExamSection id="risk-prediction" exams={exams}><CollapsibleSubsection title="General risk prediction tools: choose the right endpoint"><RiskPredictionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="surgery-specific-risk" exams={exams}><CollapsibleSubsection title="Risk prediction for specific types of surgery"><SurgerySpecificRiskTeaching /></CollapsibleSubsection></ExamSection>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground pt-2">4. The procedure: technique and positioning</h2>
      <ExamSection id="regional-anaesthesia-risk" exams={exams}><CollapsibleSubsection title="Risks of regional anaesthetic techniques"><RegionalAnaesthesiaRiskTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="positioning-risk" exams={exams}><CollapsibleSubsection title="Risks of patient positioning during surgery"><PositioningRiskTeaching /></CollapsibleSubsection></ExamSection>
      <RiskOperationLinks />
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground pt-2">5. Talking about risk and consent</h2>
      <ExamSection id="risk-communication" exams={exams}><CollapsibleSubsection title="Communicating probabilities without false reassurance"><RiskCommunicationTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="informed-consent" exams={exams}><CollapsibleSubsection title="Informed consent for anaesthesia: current UK guidance"><RiskConsentTeaching /></CollapsibleSubsection></ExamSection>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground pt-2">6. Reducing risk</h2>
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
      { text: "Regional techniques have their own figures: NAP3 permanent neuraxial harm 2.0–4.2 per 100,000, permanent peripheral-block nerve injury 2–5 per 10,000, and LAST about 0.87 per 1,000 peripheral blocks; do not quote one technique's rate for another.", cites: ["NAP3 neuraxial", "RCoA PNB nerve damage", "LAST registry 2013"] },
      { text: "POCD is common after major surgery in older people (ISPOCD1: 25.8% at 1 week, 9.9% at 3 months), but randomised GA versus regional comparison showed no difference at 3 months, and GAS found no IQ effect of under 1 h of infant GA.", cites: ["ISPOCD1 1998", "Rasmussen GA vs regional 2003", "GAS trial 2019"] },
      { text: "Age raises risk mainly by reducing reserve: over-80s had 8% vs 3% 30-day mortality, and 26% vs 4% once a complication occurred; in children, APRICOT found severe critical events in 5.2%, mostly respiratory.", cites: ["Hamel over-80 2005", "APRICOT 2017"] },
      { text: "SORT, NELA and NSQIP predict postoperative outcomes, not anaesthetic causation; ASA physical status alone is not a calibrated risk percentage.", cites: ["SORT 2014", "NELA calculator", "NSQIP", "ASA physical status"] },
      { text: "Use a tool built for the operation: NELA for emergency laparotomy, EuroSCORE II for cardiac surgery, the Nottingham Hip Fracture Score for hip fracture — and combine scores with clinical judgement.", cites: ["NELA calculator", "EuroSCORE II 2012", "Nottingham Hip Fracture Score 2008"] },
      { text: "Positioning harm is position-specific: lithotomy beyond 2 hours raises leg neuropathy (1.5% overall), prone spinal fusion carries rare ischaemic optic neuropathy, and beach-chair blood pressure must be referenced to head level.", cites: ["Warner lithotomy 2000", "POVL study group 2012", "Pohl beach chair 2005"] },
      { text: "Use the Association’s 2026 consent guidance and current GMC principles: material risks, patient values, reasonable alternatives and no action; a form cannot replace dialogue.", cites: ["Association Consent 2026", "Montgomery 2015", "GMC patient priorities", "GMC recording"] },
      { text: "Capacity is time- and decision-specific; respect capable refusal, including in emergencies, and apply jurisdiction-specific law when capacity is lacking.", cites: ["GMC capacity", "GMC refusal", "GMC emergency", "Mental Capacity Act"] },
      { text: "Current PONV and delirium guidance support individualised prevention, but do not promise that a technique or prophylactic drug eliminates risk.", cites: ["PONV Fifth prevention", "ESAIC delirium 2024", "ASA older adults 2025"] },
    ]}
    quizQuestions={anaestheticRiskQuiz}
  />;
}