import { Link } from "react-router-dom";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** First-hour septic-shock resuscitation. Quotes resolve verified records reused from Sepsis, Septic Shock and Mechanical Ventilation. */
const Quote = makeQuote("sepsis-resuscitation");
const L = ({ to, children }: { to: string; children: string }) => <Link to={to} className="text-primary underline">{children}</Link>;

export function ResusRecognitionTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Step 1 — Recognise shock and measure perfusion</H>
      <Quote label="Sepsis-3 2016 septic shock" />
      <Quote label="SSC 2021 qSOFA screening" />
      <p><Reasoning />do not wait for every Sepsis-3 criterion before acting: hypotension or hypoperfusion with suspected infection starts resuscitation now, and the label is confirmed later. Screening uses a broad tool; qSOFA alone is not enough.</p>
      <Quote label="SSC 2021 lactate" />
      <Quote label="SSC 2021 capillary refill" />
      <p>Lactate and capillary refill give a baseline you can re-measure after each intervention. Full criteria and screening are on <L to="/intensive-care/sepsis">Sepsis &amp; Septic Shock</L>.</p>
      <Check question="Suspected pneumonia, MAP 58 mm Hg, lactate pending. Wait for the lactate before starting treatment?">No. Hypotension with suspected infection is enough to start resuscitation; lactate guides and tracks it but should not delay it.</Check>
    </div>
  );
}

export function ResusAntimicrobialTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Step 2 — Antimicrobials immediately</H>
      <Quote label="SSC 2021 (Antimicrobial timing)" />
      <Quote label="Seymour 2017 NY sepsis mandate" />
      <p><Reasoning />possible septic shock is the highest-urgency group — "immediately, ideally within 1 h". Seymour's observational data link faster antibiotics, not a faster first fluid bolus, with lower adjusted mortality; association is not proof of cause. Send cultures when it does not meaningfully delay the first dose, and look for a source that needs control. Teaching synthesis, not a prescription — follow local antimicrobial guidance.</p>
      <Check question="Which time-critical step did Seymour 2017 associate with lower mortality: rapid antibiotics or rapid completion of the initial fluid bolus?">Rapid antibiotics (and the 3-hour bundle); rapid completion of the initial fluid bolus was not associated with lower mortality.</Check>
    </div>
  );
}

export function ResusCirculationTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Step 3 — Fluids, then vasopressors to MAP 65</H>
      <Quote label="SSC 2021" />
      <Quote label="ESICM Shock 2014" />
      <p><Reasoning />30 mL/kg within 3 hours is a weak suggestion, not a fixed bolus. Give fluid in steps and reassess perfusion and fluid tolerance after each one. Do not leave a patient hypotensive while waiting to finish fluid before starting noradrenaline.</p>
      <Quote label="SSC 2021 MAP target" />
      <Quote label="SSC 2021 norepinephrine" />
      <Quote label="SSC 2021 vasopressin" />
      <p>Arterial line, MAP targets, vasopressin and steroids are covered on <L to="/intensive-care/septic-shock">Septic Shock: Vasopressors, MAP &amp; Steroids</L>; fluid choice on <L to="/intensive-care/fluid-balance">Fluid Balance and Tonicity</L>.</p>
      <Check question="After 1.5 L crystalloid, MAP is 60 mm Hg and crackles are developing. Next step?">Stop routine boluses (fluid intolerance) and start or escalate noradrenaline to a MAP of 65 mm Hg, reassessing perfusion.</Check>
    </div>
  );
}

export function ResusVentilationTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Step 4 — Airway and lung-protective ventilation if intubated</H>
      <p><Reasoning />intubating a patient in septic shock is high-risk: induction drugs and positive pressure can make hypotension worse. Teaching synthesis: resuscitate first where possible, have a vasopressor running or ready, and reduce induction doses. Drug choice is discussed on <L to="/intensive-care/mechanical-ventilation">Mechanical Ventilation</L>.</p>
      <Quote label="ARDSNet 2000 settings" />
      <Quote label="ARDSNet 2000 mortality" />
      <p><Reasoning />sepsis is a leading cause of ARDS. Set tidal volume by predicted body weight (not actual weight) and watch plateau pressure. ARDSNet studied patients with ARDS/acute lung injury, so using it for all ventilated septic patients is an extrapolation. PEEP and mode choice: <L to="/intensive-care/peep-management">PEEP Management</L>.</p>
      <Check question="A 160 cm woman weighing 110 kg is ventilated for septic shock with ARDS. Should tidal volume be calculated on her 110 kg?">No — predicted body weight. ARDSNet's low-tidal-volume arm used about 6 mL/kg predicted body weight.</Check>
    </div>
  );
}
