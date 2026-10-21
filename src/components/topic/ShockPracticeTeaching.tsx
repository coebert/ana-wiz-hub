import { useState } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { shockNumbers } from "@/lib/icu-shock-calcs";

const R = ({ label }: { label: string }) => <InlineRef topicId="circulatory-failure" refLabel={label} />;
const labels = ["SSC 2021 MAP 65", "65 trial 2020", "SOAP II 2010", "ANDROMEDA-SHOCK 2019", "ECLS-SHOCK 2023", "DanGer Shock 2024", "DanGer Shock 2024 harms"];
const input = "mt-1 w-24 rounded border border-input bg-background px-2 py-1";

function ShockCalculator() {
  const [hr, setHr] = useState(""); const [sbp, setSbp] = useState(""); const [dbp, setDbp] = useState(""); const [co, setCo] = useState("");
  const r = hr && sbp && dbp ? shockNumbers(Number(hr), Number(sbp), Number(dbp), co ? Number(co) : undefined) : null;
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
      <p className="font-semibold text-foreground">Teaching calculator: MAP, shock index and cardiac power output</p>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col">Heart rate<input aria-label="Heart rate" inputMode="decimal" value={hr} onChange={(e) => setHr(e.target.value)} className={input} /></label>
        <label className="flex flex-col">Systolic (mm Hg)<input aria-label="Systolic" inputMode="decimal" value={sbp} onChange={(e) => setSbp(e.target.value)} className={input} /></label>
        <label className="flex flex-col">Diastolic (mm Hg)<input aria-label="Diastolic" inputMode="decimal" value={dbp} onChange={(e) => setDbp(e.target.value)} className={input} /></label>
        <label className="flex flex-col">Cardiac output (L/min, optional)<input aria-label="Cardiac output" inputMode="decimal" value={co} onChange={(e) => setCo(e.target.value)} className={input} /></label>
      </div>
      {r ? <ul className="list-disc pl-5 space-y-1">
        <li>MAP about <strong className="text-foreground">{r.map} mm Hg</strong>{r.belowSscMap ? " — below the SSC initial target of 65 mm Hg" : ""}</li>
        <li>Shock index <strong className="text-foreground">{r.shockIndex}</strong>{r.shockIndex >= 1 ? " (heart rate higher than systolic pressure)" : ""}</li>
        <li>{r.cpo !== null ? <>Cardiac power output <strong className="text-foreground">{r.cpo} W</strong>{r.cpo < 0.6 ? " — below the 0.6 W often quoted in cardiogenic shock" : ""}</> : "Add cardiac output for cardiac power output (MAP × CO ÷ 451)."}</li>
      </ul> : <p>Enter heart rate, systolic and diastolic pressure (diastolic not above systolic).</p>}
      <p className="text-xs">Arithmetic only. A calculated MAP is not a measured arterial line MAP and does not tell you the cause of shock or what to give.</p>
    </div>
  );
}

export function ShockPracticeTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Latest Guidelines and Bedside Management of Shock</h2>
    <p>Shock is inadequate tissue oxygen delivery for demand. At the bedside the first job is not to name the type but to restore perfusion while you find out. A quick look at the heart with ultrasound, the jugular veins, the skin and the lactate usually sorts the four types — hypovolaemic, distributive, cardiogenic and obstructive — within minutes. Mixed shock is common: a septic patient can also be dry and have septic cardiomyopathy.</p>

    <h3 className="text-lg font-semibold text-foreground">What the recent trials changed</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50 text-foreground"><tr><th className="p-2 text-left">Question</th><th className="p-2 text-left">Evidence</th><th className="p-2 text-left">Bedside meaning</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">What MAP?</td><td className="p-2">SSC 2021: initial MAP 65 mm Hg over higher targets.<R label="SSC 2021 MAP 65" /> 65 trial (age ≥65): permissive MAP 60–65 gave 41.0% vs 43.8% 90-day mortality, not significant.<R label="65 trial 2020" /></td><td className="p-2">Start at 65; in older vasodilated patients, chasing higher numbers adds vasopressor without proven benefit. Individualise for chronic hypertension or raised intracranial pressure.</td></tr>
        <tr className="border-t border-border"><td className="p-2">Which vasopressor first?</td><td className="p-2">SOAP II: no mortality difference, but arrhythmias 24.1% with dopamine vs 12.4% with noradrenaline.<R label="SOAP II 2010" /></td><td className="p-2">Noradrenaline is the default first agent; dopamine has fallen out of use.</td></tr>
        <tr className="border-t border-border"><td className="p-2">What resuscitation endpoint?</td><td className="p-2">ANDROMEDA-SHOCK: capillary refill-targeted 34.9% vs lactate-targeted 43.4% 28-day mortality (P = .06), less organ dysfunction at 72 h.<R label="ANDROMEDA-SHOCK 2019" /></td><td className="p-2">Capillary refill time is a valid, fast, repeatable target; lactate falls slowly and is not only a perfusion marker.</td></tr>
        <tr className="border-t border-border"><td className="p-2">Routine VA-ECMO in infarct shock?</td><td className="p-2">ECLS-SHOCK: 47.8% vs 49.0% 30-day mortality; more bleeding and vascular complications.<R label="ECLS-SHOCK 2023" /></td><td className="p-2">Do not use VA-ECMO routinely; reserve it for selected patients in experienced centres.</td></tr>
        <tr className="border-t border-border"><td className="p-2">Microaxial pump (Impella CP)?</td><td className="p-2">DanGer Shock (STEMI shock, selected, no coma): 45.8% vs 58.5% mortality at 180 days<R label="DanGer Shock 2024" />, but safety events 24.0% vs 6.2%.<R label="DanGer Shock 2024 harms" /></td><td className="p-2">The first device trial to show a survival benefit, in a narrow group; limb ischaemia, bleeding and renal replacement were more common.</td></tr>
      </tbody>
    </table></div>

    <h3 className="text-lg font-semibold text-foreground">Bedside checklist: the first hour</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>Call for help. Airway, breathing, two large-bore cannulas, bloods with lactate and a blood gas.</li>
      <li>Look: mottling, capillary refill (press 10 s on the finger pad; normal ≤3 s), conscious level, urine output.<R label="ANDROMEDA-SHOCK 2019" /></li>
      <li>Point-of-care ultrasound: big or small heart, poor or good function, pericardial fluid, right heart strain, free abdominal fluid, lung B-lines.</li>
      <li>Treat the type you find: fluid or blood for hypovolaemia; antibiotics and source control for sepsis; reperfusion and inotropes for cardiogenic; decompress for tension pneumothorax or tamponade; thrombolysis for massive pulmonary embolism.</li>
      <li>Start noradrenaline early if MAP stays below 65 — peripherally through a good cannula while central access is arranged.<R label="SSC 2021 MAP 65" /><R label="SOAP II 2010" /></li>
      <li>Insert an arterial line; non-invasive cuffs are unreliable in shock.</li>
      <li>Reassess every 15–30 minutes. Stop fluids when the patient no longer responds or develops lung water.</li>
      <li>In cardiogenic shock from a heart attack, call cardiology for the catheter lab early and discuss mechanical support only in a shock centre.<R label="ECLS-SHOCK 2023" /><R label="DanGer Shock 2024" /></li>
    </ol>

    <ShockCalculator />

    <h3 className="text-lg font-semibold text-foreground">Worked case (fictional)</h3>
    <p>A 71-year-old woman is cold and confused 6 hours after an anterior heart attack. HR 115, BP 82/58, lactate 5.2, capillary refill 6 s. Calculated MAP is about 66 and the shock index 1.4. Ultrasound shows a dilated, poorly contracting left ventricle and B-lines, so this is cardiogenic, not hypovolaemic: the team gives no fluid bolus. Noradrenaline holds the MAP at 65, an arterial line goes in and she goes straight to the catheter lab. Cardiac output by thermodilution is 2.8 L/min, giving a cardiac power output of about 0.41 W. The shock team discusses a microaxial pump, weighing the DanGer Shock survival benefit against the limb and bleeding risks.</p>

    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what did ECLS-SHOCK show about routine VA-ECMO?</summary><p className="mt-2">No survival benefit (47.8% vs 49.0% at 30 days) and more bleeding and vascular complications. It should not be used routinely in infarct-related cardiogenic shock.</p></details>
    <p className="text-xs">These are teaching notes, not a shock protocol.</p>
    <LessonSources topicId="circulatory-failure" labels={labels} />
  </div>;
}
