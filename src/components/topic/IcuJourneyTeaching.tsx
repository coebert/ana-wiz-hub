import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "./LessonSources";
import { topicReferences } from "@/data/references";

const T = "icu-inpatient-journey";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const Check = ({ question, children }: { question: string; children: ReactNode }) => <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary><p className="mt-2">{children}</p></details>;
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

// Reuse verified excerpt records from the Critical Care Overview block so quotations cannot drift.
const Quote = ({ label }: { label: string }) => {
  const ref = topicReferences[T]?.find(item => item.label === label);
  if (!ref?.excerpt) return null;
  return <blockquote className="border-l-2 border-primary pl-4 text-foreground"><p>&ldquo;{ref.excerpt}&rdquo;<R label={label} /></p></blockquote>;
};

export function IcuJourneyReferralTeaching() {
  return <div className={wrap}>
    <p>This page follows one adult through critical care, from ward deterioration to follow-up. Quotations are the sources' own wording; the surrounding sequence is teaching synthesis, not a local admission policy. Each stage links to the page that teaches it in depth.</p>
    <H>Recognition and referral</H>
    <p>Most unplanned admissions begin with a deteriorating ward patient: rising early-warning scores, new organ dysfunction or a clinician's concern. Referral should state the problem, the physiological trajectory, treatment already given and the patient's known wishes or treatment limits. Suspected infection with organ dysfunction should prompt the <L to="/intensive-care/sepsis">sepsis</L> pathway in parallel with referral, not after it.</p>
    <H>Triage: what level of care does the patient need?</H>
    <Quote label="ICS Levels 2021 purpose" />
    <p>Levels describe the support a patient needs, not the bed they occupy. Ward care now absorbs the old levels 0 and 1; level 1 represents enhanced care.</p>
    <Quote label="ICS Levels 2021 level 2" />
    <Quote label="ICS Levels 2021 level 3" />
    <p>Triage also weighs whether critical care can achieve an outcome the patient would value. Where it cannot, a ward-based plan with clear ceilings of treatment is an active decision, discussed on <L to="/intensive-care/prognostication-ethics-icu">Prognostication & Ethics</L> and <L to="/intensive-care/end-of-life-communication">End-of-Life Communication</L>.</p>
    <Check question="a patient on the ward needs high-flow oxygen at an advanced level and nothing else. What level of care is this?">Level 3. The ICS 2021 definition places advanced respiratory monitoring and support alone at level 3, even with no other organ failing.</Check>
    <LessonSources topicId={T} labels={["ICS Levels 2021 purpose", "ICS Levels 2021 level 2", "ICS Levels 2021 level 3"]} />
  </div>;
}

export function IcuJourneyAdmissionTeaching() {
  return <div className={wrap}>
    <H>Time standards after the decision to admit</H>
    <Quote label="GPICS 2.1 admission timing" />
    <Quote label="GPICS 2.1 consultant review" />
    <p>Delay between decision and arrival is time spent at the wrong level of care; resuscitation continues wherever the patient is. If the patient must move between hospitals or departments, follow <L to="/intensive-care/transfer-medicine">Transfer Medicine</L>.</p>
    <H>The first hours</H>
    <p>A typical sequence (teaching synthesis): structured ABCDE reassessment; secure the airway and start <L to="/intensive-care/mechanical-ventilation">mechanical ventilation</L> if needed; establish monitoring and vascular access; resuscitate the circulation (<L to="/intensive-care/circulatory-failure">Circulatory Failure</L>, <L to="/intensive-care/fluid-balance">Fluid Balance</L>); send gases and cultures (<L to="/physics/abg-analyser">ABG Analyser</L>, <L to="/intensive-care/acid-base">Acid-Base</L>); start source control and <L to="/intensive-care/antimicrobials-icu">antimicrobials</L>; document the admission plan, escalation limits and next-of-kin contact.</p>
    <H>Staffing at the bedside</H>
    <Quote label="GPICS 2.1 nurse ratios" />
    <Check question="the decision to admit is made at 22:00 and the patient arrives at 03:30. Which standard was missed?">GPICS 2.1 requires unplanned admission within four hours of the decision; 5.5 hours breaches it. The consultant must still review in person within 12 hours of arrival.</Check>
    <LessonSources topicId={T} labels={["GPICS 2.1 admission timing", "GPICS 2.1 consultant review", "GPICS 2.1 nurse ratios"]} />
  </div>;
}

export function IcuJourneyTreatmentTeaching() {
  return <div className={wrap}>
    <H>The daily cycle: ward rounds and goals</H>
    <Quote label="GPICS 2.1 ward round" />
    <Quote label="Pronovost 2003 daily goals" />
    <p>Each round should review the cause of admission, each organ system and every line, tube and drug, then state explicit goals for the next 24 hours. The Pronovost study measured staff understanding of goals, not patient mortality.</p>
    <H>Organ support and prevention bundles</H>
    <p>Treatment pages for the commonest problems: <L to="/intensive-care/ards">ARDS</L>, <L to="/intensive-care/peep-management">PEEP management</L>, <L to="/intensive-care/aki-rrt">AKI & RRT</L>, <L to="/intensive-care/neurointensive-care">Neurointensive care</L>, <L to="/intensive-care/transfusion-coagulation">Transfusion & coagulation</L> and <L to="/intensive-care/ecmo">ECMO</L>. Daily care also covers <L to="/intensive-care/icu-sedation-delirium">sedation and delirium</L>, <L to="/intensive-care/icu-nutrition">nutrition</L>, thromboprophylaxis, glucose control, pressure-area care and early mobilisation. This checklist is teaching synthesis.</p>
    <H>Shift handover and family communication</H>
    <Quote label="Starmer 2014 I-PASS" />
    <Quote label="Lautrette 2007 family" />
    <p>I-PASS was studied in paediatric residents, and Lautrette in relatives of patients dying in ICU; applying them elsewhere is extrapolation.</p>
    <H>Liberation from support</H>
    <p>As the patient improves, the plan moves to weaning: readiness screening, spontaneous breathing trials and extubation are taught on <L to="/intensive-care/mechanical-ventilation">Mechanical Ventilation</L> and <L to="/intensive-care/ventilation-protocols">ICU Ventilation Protocols</L>.</p>
    <Check question="does the daily goals study show that goals forms reduce ICU mortality?">No. It showed that staff understanding of the day's goals rose from under 10% to over 95%; it did not measure mortality.</Check>
    <LessonSources topicId={T} labels={["GPICS 2.1 ward round", "Pronovost 2003 daily goals", "Starmer 2014 I-PASS", "Lautrette 2007 family"]} />
  </div>;
}

export function IcuJourneyDischargeTeaching() {
  return <div className={wrap}>
    <H>Timing of discharge to the ward</H>
    <Quote label="GPICS 2.1 discharge" />
    <p>Night-time and delayed discharges matter because the patient leaves a 1:1 or 1:2 nursing environment for a ward with far fewer staff per patient. A discharge decision should state why the patient no longer needs critical care and what would prompt readmission.</p>
    <H>Handover to the ward team</H>
    <Quote label="GPICS 2.1 discharge handover" />
    <p>A good discharge summary covers diagnoses, procedures, ongoing drugs and antimicrobial plan, lines to remove, nutrition and swallow status, mobility, delirium, treatment limits and the follow-up plan (teaching synthesis). Outreach review after discharge helps catch early deterioration.</p>
    <H>Life after critical care</H>
    <p>Survivors often have physical, cognitive and psychological problems after discharge. Rehabilitation, follow-up clinics and support for families are taught on <L to="/intensive-care/pics-follow-up">PICS & follow-up</L>. When the outcome is death or organ donation, see <L to="/intensive-care/end-of-life-communication">End-of-Life Communication</L> and <L to="/intensive-care/organ-donation">Organ Donation</L>.</p>
    <Check question="the bed manager asks to move a stable patient to the ward at 23:30. What does GPICS 2.1 say?">Discharge to a general ward must occur between 07:00 and 21:59. A 23:30 move breaches the standard; the patient should stay until morning unless there is a safer alternative.</Check>
    <LessonSources topicId={T} labels={["GPICS 2.1 discharge", "GPICS 2.1 discharge handover"]} />
  </div>;
}
