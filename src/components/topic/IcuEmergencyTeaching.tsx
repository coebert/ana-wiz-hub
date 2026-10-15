import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU emergency pages (anaphylaxis, eclampsia). Quotes resolve verified excerpt records so wording cannot drift. */
const AQ = makeQuote("icu-anaphylaxis");
const EQ = makeQuote("icu-eclampsia");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;

export function AnaphylaxisFirstDoseTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Recognise it, then give IM adrenaline</H>
      <p><Reasoning />anaphylaxis is a clinical diagnosis: sudden airway, breathing or circulation problems, usually with skin or mucosal changes, after a likely trigger. In the ICU the commonest triggers are drugs (antibiotics, neuromuscular blockers, chlorhexidine) and contrast. Skin signs can be absent. Stop the suspected trigger first.</p>
      <AQ label="RCUK 2021 IM dose" />
      <AQ label="RCUK 2021 repeat IM" />
      <AQ label="RCUK 2021 mimics" />
      <p>Perioperative reactions are covered on <L to="/clinical/clinical-incidents">Critical Incidents</L>.</p>
      <Check question="An adult develops stridor and a BP of 70/40 mm Hg during a co-amoxiclav infusion. First drug and dose?">Stop the infusion and give IM adrenaline 500 micrograms (0.5 mL of 1 mg/mL). Repeat after 5 minutes if airway, breathing or circulation problems persist.</Check>
    </div>
  );
}

export function AnaphylaxisRefractoryTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Refractory anaphylaxis: the critical care phase</H>
      <AQ label="RCUK 2021 refractory definition" />
      <AQ label="RCUK 2021 infusion" />
      <AQ label="RCUK 2021 fluids antihistamines" />
      <AQ label="RCUK 2021 steroids" />
      <p><Reasoning />after two IM doses the problem becomes an infusion problem: a low-dose IV adrenaline infusion with a rapid fluid bolus, given by people experienced in IV adrenaline. Bolus IV adrenaline outside specialist settings risks arrhythmias. Antihistamines and steroids do not treat airway, breathing or circulation problems. Infusion doses and second-line vasopressors follow local and RCUK protocols; receptor pharmacology is on <L to="/pharmacology/vasoactive-agents">Vasoactive Agents</L>.</p>
      <Check question="Two IM doses given; BP remains 75/45 mm Hg. Should hydrocortisone be given now as the main treatment?">No. This is refractory anaphylaxis: start a low-dose IV adrenaline infusion with a fluid bolus and get critical care help. Steroids may be considered only after initial resuscitation and never in place of adrenaline.</Check>
    </div>
  );
}

export function AnaphylaxisAfterTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Tryptase, biphasic reactions and follow-up</H>
      <AQ label="RCUK 2021 tryptase" />
      <AQ label="RCUK 2021 biphasic" />
      <p><Reasoning />a fixed 6–12-hour observation can miss many biphasic reactions, so how long to observe depends on how severe the reaction was and how much adrenaline it needed. Record the suspected trigger and refer the patient to an allergy clinic (teaching synthesis; check the RCUK guideline for timed tryptase sampling).</p>
      <Check question="Does a 6-hour observation period reliably catch biphasic reactions?">No. RCUK 2021 notes that this strategy may miss over 50% of biphasic reactions.</Check>
    </div>
  );
}

export function EclampsiaMagnesiumTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Magnesium sulfate: prevention and treatment of fits</H>
      <EQ label="Magpie 2002" />
      <EQ label="NICE NG133 1.8.2" />
      <EQ label="NICE NG133 1.8.4" />
      <EQ label="NICE NG133 1.8.5" />
      <p><Reasoning />magnesium is the anticonvulsant of choice; benzodiazepines and phenytoin are not substitutes. Monitor reflexes, respiratory rate and urine output during the infusion, because magnesium is renally excreted and toxicity causes loss of reflexes, then respiratory depression (teaching synthesis — follow local monitoring and antidote protocols). Obstetric anaesthetic issues are on <L to="/clinical/obstetric-anaesthesia">Obstetric Anaesthesia</L>.</p>
      <Check question="A woman with eclampsia fits again 2 hours into her magnesium infusion. What does NICE NG133 advise?">A further 2–4 g IV over 5–15 minutes, and continue the infusion for 24 hours after the last fit. Do not switch to diazepam or phenytoin.</Check>
    </div>
  );
}

export function EclampsiaHypertensionTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Severe hypertension</H>
      <EQ label="NICE NG133 1.8.6" />
      <p><Reasoning />severe hypertension in pre-eclampsia is treated immediately because it can cause stroke in the mother. Choose one of the three listed drugs and follow local doses and blood-pressure targets. Hydralazine can cause a sudden drop in blood pressure, which is why NICE pairs it with a small fluid preload (next lesson).</p>
      <Check question="Which three antihypertensives does NG133 list for severe hypertension in critical care?">Labetalol (oral or IV), oral nifedipine, or IV hydralazine.</Check>
    </div>
  );
}

export function EclampsiaFluidTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Fluid restriction</H>
      <EQ label="NICE NG133 fluids" />
      <p><Reasoning />pre-eclampsia causes leaky capillaries and low oncotic pressure, so these women are prone to pulmonary oedema. Fluid is restricted unless there are ongoing losses such as haemorrhage. This is the opposite of the reflex fluid bolus in <L to="/intensive-care/sepsis-resuscitation">septic shock</L>. Delivery is the definitive treatment, and the risk of fits continues after birth.</p>
      <Check question="Maintenance fluid limit in severe pre-eclampsia without other losses?">80 mL/hour (NICE NG133 1.8.12).</Check>
    </div>
  );
}
