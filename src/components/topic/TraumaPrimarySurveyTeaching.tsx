import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "trauma-emergency";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Q = ({ label, children }: { label: string; children: ReactNode }) => (
  <blockquote className="border-l-2 border-border pl-4 italic">"{children}"<R label={label} /></blockquote>
);
const Reasoning = ({ children }: { children: ReactNode }) => (
  <p><strong className="text-foreground">Teaching reasoning (not a quoted guideline):</strong> {children}</p>
);
const Check = ({ question, children }: { question: string; children: ReactNode }) => (
  <details className="border-l-2 border-primary pl-4">
    <summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary>
    <div className="mt-2 space-y-2">{children}</div>
  </details>
);
const wrap = "space-y-4 text-muted-foreground leading-relaxed";

export function TraumaABCDETeaching() {
  return (
    <div className={wrap}>
      <H>Why the sequence starts with catastrophic haemorrhage</H>
      <p>NICE asks pre-hospital teams to record the primary survey in a fixed order that puts massive external bleeding before the airway:</p>
      <Q label="NG39 <C>ABCDE">catastrophic haemorrhage airway with in‑line spinal immobilisation breathing circulation disability (neurological) exposure and environment (&lt;C&gt;ABCDE).</Q>
      <Reasoning>a patient with a spurting limb wound can exsanguinate in the minutes it takes to secure an airway, so &lt;C&gt; is dealt with first and often by a different team member at the same time. In a well-staffed trauma team the letters are worked in parallel, but the order still sets priorities when hands are short.</Reasoning>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="text-left font-semibold text-foreground mb-2">Each step and the quoted action that goes with it</caption>
          <thead><tr className="border-b border-border"><th className="p-2">Step</th><th className="p-2">Key action</th><th className="p-2">Source</th></tr></thead>
          <tbody>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">&lt;C&gt;</th><td className="p-2">Direct pressure, then a tourniquet if pressure fails on a limb</td><td className="p-2"><R label="NG39 external bleeding" /><R label="NG39 tourniquet" /></td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">A</th><td className="p-2">Airway with in-line spinal immobilisation; RSI if the patient cannot maintain airway or ventilation</td><td className="p-2"><R label="NG39 RSI" /></td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">B</th><td className="p-2">Look for tension pneumothorax, open chest wounds and flail segments (see Thoracic Injuries below)</td><td className="p-2">Teaching summary</td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">C</th><td className="p-2">Peripheral IV, intra-osseous if that fails; lactate or base deficit to gauge bleeding</td><td className="p-2"><R label="NG39 access" /><R label="Rossaint 2023 lactate" /></td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">D</th><td className="p-2">GCS, pupils, glucose; a severe head injury changes the blood pressure target</td><td className="p-2"><R label="Rossaint 2023 BP target" /></td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">E</th><td className="p-2">Full exposure for hidden wounds, then cover and warm</td><td className="p-2">Teaching summary</td></tr>
          </tbody>
        </table>
      </div>
      <p>For circulatory access in hospital, NICE says to:</p>
      <Q label="NG39 access">use peripheral intravenous access or if peripheral intravenous access fails, consider intra‑osseous access while central access is being achieved.</Q>
      <p>For judging how much blood has been lost, the European guideline prefers lactate:</p>
      <Q label="Rossaint 2023 lactate">We recommend blood lactate as a sensitive test to estimate and monitor the extent of bleeding and tissue hypoperfusion; in the absence of lactate measurements, base deficit may represent a suitable alternative (Grade 1B).</Q>
      <Reasoning>the primary survey is repeated after every intervention and every change. A normal blood pressure in a young patient does not exclude major bleeding, which is why a rising lactate or falling base excess can come before hypotension.</Reasoning>
      <Check question="a motorcyclist has a pulsatile thigh wound and snoring respirations. Which is treated first?">
        <p>The thigh wound: catastrophic haemorrhage comes before the airway in &lt;C&gt;ABCDE. Direct pressure first, then a tourniquet if pressure fails, ideally while a second team member opens the airway with in-line immobilisation.<R label="NG39 <C>ABCDE" /><R label="NG39 tourniquet" /></p>
      </Check>
      <LessonSources topicId={T} labels={["NG39 <C>ABCDE", "NG39 external bleeding", "NG39 tourniquet", "NG39 RSI", "NG39 access", "Rossaint 2023 lactate", "Rossaint 2023 BP target"]} />
    </div>
  );
}

export function TraumaFluidBolusTeaching() {
  return (
    <div className={wrap}>
      <H>Restrictive volume until bleeding is controlled</H>
      <Q label="NG39 restrictive">For patients with active bleeding use a restrictive approach to volume resuscitation until definitive early control of bleeding has been achieved.</Q>
      <p>NICE titrates fluid to a pulse, not to a number:</p>
      <Q label="NG39 central pulse">In pre-hospital settings, titrate volume resuscitation to maintain a palpable central pulse (carotid or femoral).</Q>
      <Q label="NG39 hospital titration">In hospital settings, move rapidly to haemorrhage control, titrating volume resuscitation to maintain central circulation until control is achieved.</Q>
      <p>The European guideline gives a numerical target, with a different target in head injury:</p>
      <Q label="Rossaint 2023 BP target">In the initial phase following trauma, we recommend the use of a restricted volume replacement strategy with a target systolic blood pressure of 80–90 mmHg (mean arterial pressure 50–60 mmHg) until major bleeding has been stopped without clinical evidence of brain injury (Grade 1B). In patients with severe TBI (GCS ≤ 8), we recommend that a mean arterial pressure ≥ 80 mmHg be maintained (Grade 1C).</Q>
      <Q label="NG39 TBI and shock">if haemorrhagic shock is the dominant condition, continue restrictive volume resuscitation or if traumatic brain injury is the dominant condition, use a less restrictive volume resuscitation approach to maintain cerebral perfusion.</Q>
      <H>Clear fluids: where UK and European guidance differ</H>
      <Q label="NG39 crystalloid">In pre-hospital settings only use crystalloids to replace fluid volume in patients with active bleeding if blood components are not available.</Q>
      <Q label="NG39 no crystalloid">In hospital settings do not use crystalloids for patients with active bleeding.</Q>
      <Q label="Rossaint 2023 crystalloid">We recommend that fluid therapy using a 0.9% sodium chloride or balanced crystalloid solution be initiated in the hypotensive bleeding trauma patient (Grade 1B). We recommend that hypotonic solutions such as Ringer’s lactate be avoided in patients with severe head trauma (Grade 1B).</Q>
      <p>If the restricted target is not reached, the European guideline adds a vasopressor rather than more fluid:</p>
      <Q label="Rossaint 2023 vasopressor">If a restricted volume replacement strategy does not achieve the target blood pressure, we recommend the administration of noradrenaline in addition to fluids to maintain target arterial pressure (Grade 1C).</Q>
      <Reasoning>NICE does not set a bolus volume for bleeding trauma; small aliquots with reassessment of the central pulse fit its wording. In a UK hospital the "bolus" for an actively bleeding patient is blood products, not clear fluid. In the UK exams, quote NG39 and note that the European guideline still allows crystalloid to start and adds noradrenaline.</Reasoning>
      <Check question="a patient with GCS 6 and a bleeding pelvic fracture has MAP 58 mmHg. Is that acceptable?">
        <p>No. The 50–60 mmHg MAP range applies only without clinical evidence of brain injury; with severe TBI (GCS ≤ 8) the European guideline recommends MAP ≥ 80 mmHg. NICE likewise says to use a less restrictive approach when the brain injury dominates.<R label="Rossaint 2023 BP target" /><R label="NG39 TBI and shock" /></p>
      </Check>
      <LessonSources topicId={T} labels={["NG39 restrictive", "NG39 central pulse", "NG39 hospital titration", "NG39 TBI and shock", "NG39 crystalloid", "NG39 no crystalloid", "Rossaint 2023 BP target", "Rossaint 2023 crystalloid", "Rossaint 2023 vasopressor"]} />
    </div>
  );
}

export function TraumaTransfusionTeaching() {
  return (
    <div className={wrap}>
      <H>Ratios first, then laboratory guidance</H>
      <Q label="NG39 1:1">For adults (16 or over) use a ratio of 1 unit of plasma to 1 unit of red blood cells to replace fluid volume.</Q>
      <Q label="NG39 fixed ratio">For patients with active bleeding, start with a fixed‑ratio protocol for blood components and change to a protocol guided by laboratory coagulation results at the earliest opportunity.</Q>
      <p>The European guideline accepts two starting strategies:</p>
      <Q label="Rossaint 2023 initial products">In the initial management of patients with expected massive haemorrhage, we recommend one of the two following strategies: Fibrinogen concentrate or cryoprecipitate and pRBC (Grade 1C) FFP or pathogen-inactivated FFP in a FFP/pRBC ratio of at least 1:2 as needed (Grade 1C) In addition, we suggest a high platelet/pRBC ratio (Grade 2B).</Q>
      <H>What PROPPR showed about ratios</H>
      <Q label="PROPPR 2015 outcomes">No significant differences were detected in mortality at 24 hours (12.7% in 1:1:1 group vs 17.0% in 1:1:2 group; difference, -4.2% [95% CI, -9.6% to 1.1%]; P = .12) or at 30 days (22.4% vs 26.1%, respectively; difference, -3.7% [95% CI, -10.2% to 2.7%]; P = .26).</Q>
      <Q label="PROPPR 2015 exsanguination">Exsanguination, which was the predominant cause of death within the first 24 hours, was significantly decreased in the 1:1:1 group (9.2% vs 14.6% in 1:1:2 group</Q>
      <H>Haemoglobin threshold once transfusion is needed</H>
      <Q label="Rossaint 2023 haemoglobin">If erythrocyte transfusion is necessary, we recommend a target haemoglobin of 70–90 g/L (Grade 1C).</Q>
      <Reasoning>during active bleeding the haemoglobin lags behind blood loss, because whole blood is lost and the concentration only falls once fluid redistributes or is given. A normal first haemoglobin therefore does not stop activation of the major haemorrhage protocol; the 70–90 g/L target guides red cell use once bleeding is controlled or slowing. Platelet and fibrinogen targets are covered in the Massive Transfusion Protocol and fibrinogen lessons on this page.</Reasoning>
      <Check question="what was PROPPR's absolute difference in 24-hour exsanguination deaths?">
        <p>14.6% − 9.2% = <strong>5.4 percentage points</strong> fewer exsanguination deaths with 1:1:1, although all-cause mortality at 24 hours and 30 days did not differ significantly.<R label="PROPPR 2015 exsanguination" /><R label="PROPPR 2015 outcomes" /></p>
      </Check>
      <LessonSources topicId={T} labels={["NG39 1:1", "NG39 fixed ratio", "Rossaint 2023 initial products", "PROPPR 2015 outcomes", "PROPPR 2015 exsanguination", "Rossaint 2023 haemoglobin"]} />
    </div>
  );
}

export function TraumaSurgicalPriorityTeaching() {
  return (
    <div className={wrap}>
      <H>Time to bleeding control drives everything</H>
      <Q label="Rossaint 2023 time to control">We recommend that the time elapsed between injury and bleeding control be minimised (Grade 1B).</Q>
      <H>Matching the operation to the response</H>
      <p>NICE links the type of surgery to how the patient responds to volume resuscitation:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="text-left font-semibold text-foreground mb-2">NICE NG39 surgical decision by haemodynamic response</caption>
          <thead><tr className="border-b border-border"><th className="p-2">Response</th><th className="p-2">Surgery</th></tr></thead>
          <tbody>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Unstable, not responding</th><td className="p-2">Damage control surgery<R label="NG39 damage control" /></td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Unstable, responding</th><td className="p-2">Consider definitive surgery<R label="NG39 definitive surgery" /></td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Normal haemodynamics</th><td className="p-2">Definitive surgery<R label="NG39 normal haemodynamics" /></td></tr>
          </tbody>
        </table>
      </div>
      <Q label="Rossaint 2023 damage control">We recommend damage control surgery in the severely injured patient presenting with haemorrhagic shock, signs of ongoing bleeding, coagulopathy and/or combined abdominal vascular and pancreatic injuries (Grade 1B).</Q>
      <H>Imaging should not delay the theatre</H>
      <Q label="NG39 limit imaging">Limit diagnostic imaging (such as chest and pelvis X‑rays or FAST [focused assessment with sonography for trauma]) to the minimum needed to direct intervention in patients with suspected haemorrhage and haemodynamic instability who are not responding to volume resuscitation.</Q>
      <Q label="NG39 FAST">Be aware that a negative FAST does not exclude intraperitoneal or retroperitoneal haemorrhage.</Q>
      <Q label="NG39 pelvic IR">Use interventional radiology techniques in patients with active arterial pelvic haemorrhage unless immediate open surgery is needed to control bleeding from other injuries.</Q>
      <Reasoning>the anaesthetist's role is to keep the patient alive long enough for the bleeding to be stopped, not to "optimise" before theatre. In a non-responder, induction happens in theatre with the surgeon scrubbed, because loss of sympathetic tone at induction can cause cardiac arrest. Definitive repair waits until the lethal triad is corrected in intensive care.</Reasoning>
      <Check question="a patient with a stab wound to the abdomen stays hypotensive after two units of red cells and plasma, and FAST is negative. What next?">
        <p>Damage control surgery. The patient is unstable and not responding, and a negative FAST does not exclude intra- or retroperitoneal bleeding, so imaging should be limited to the minimum needed to direct intervention.<R label="NG39 damage control" /><R label="NG39 FAST" /><R label="NG39 limit imaging" /></p>
      </Check>
      <LessonSources topicId={T} labels={["Rossaint 2023 time to control", "NG39 damage control", "NG39 definitive surgery", "NG39 normal haemodynamics", "Rossaint 2023 damage control", "NG39 limit imaging", "NG39 FAST", "NG39 pelvic IR"]} />
    </div>
  );
}
