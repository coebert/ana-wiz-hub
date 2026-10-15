import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU discharge planning and longer-term recovery. Quotes resolve verified records copied from the ICU Inpatient Journey and PICS pages. */
const Q = makeQuote("icu-discharge-planning");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;

export function DischargeRehabStartTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Discharge planning starts during the ICU stay</H>
      <Q label="NICE CG83 early assessment" />
      <Q label="NICE CG83 table 1" />
      <Q label="NICE CG83 start early" />
      <p><Reasoning />rehabilitation needs are found by assessing the patient, not by waiting until discharge. Table 1 includes non-physical risks such as recurrent nightmares. One named coordinator keeps the plan going across ICU, ward and community.</p>
      <Check question="A ventilated patient on 40% oxygen cannot get out of bed. When should rehabilitation risk be assessed?">Now, during the critical care stay — NICE CG83 lists inability to self-ventilate on 35% oxygen or less and inability to get out of bed as examples of risk.</Check>
    </div>
  );
}

export function DischargeTransferTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Transfer to the ward: timing and handover</H>
      <Q label="GPICS 2.1 discharge" />
      <Q label="NICE CG50 night transfer" />
      <Q label="GPICS 2.1 discharge handover" />
      <Q label="NICE CG50 shared handover" />
      <p><Reasoning />the patient moves to a ward with far fewer nurses per patient. The ICU and ward teams share responsibility, so the written plan must be something the ward can actually deliver. Outreach follow-up after transfer is a common local safety net (teaching synthesis).</p>
      <Check question="Who is responsible for the patient during ICU-to-ward transfer according to NICE CG50?">Both teams share responsibility, supported by a formal structured handover (medical and nursing) and a written plan.</Check>
    </div>
  );
}

export function DischargeHomeTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Ward step-down and going home</H>
      <Q label="NICE CG83 ward step-down" />
      <Q label="NICE CG83 home discharge" />
      <p><Reasoning />going home is not the end of critical care recovery. Patients and families need written information on physical recovery, driving, work and support services. Stress symptoms after traumatic memories are managed using the NICE PTSD guideline.</p>
      <Check question="For how long does NICE CG83 suggest a self-directed rehabilitation manual after critical care discharge?">At least 6 weeks, based on clinical judgement and the patient's needs.</Check>
    </div>
  );
}

export function DischargeFollowUpTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Longer-term recovery and review</H>
      <Q label="NICE CG83 review" />
      <p><Reasoning />the 2–3 month review checks recovery against the goals set during the stay and refers the patient on if they are recovering slowly. Physical, cognitive and mental-health problems after critical illness (PICS), follow-up clinics and support for families are covered on <L to="/intensive-care/pics-follow-up">PICS &amp; follow-up</L>. The full patient journey is on <L to="/intensive-care/icu-inpatient-journey">The ICU Inpatient Journey</L>.</p>
      <Check question="When and how should patients with rehabilitation needs be reviewed after leaving critical care?">At 2 to 3 months, face to face, by an appropriately skilled professional familiar with their critical care course.</Check>
      <p>Survival, length of stay and readmission rates after ICU are covered on <L to="/intensive-care/icu-outcomes">ICU Outcomes</L>.</p>
    </div>
  );
}
