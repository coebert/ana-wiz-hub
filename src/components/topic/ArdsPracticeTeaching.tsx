import { useState } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { predictedBodyWeight, tidalVolumes, drivingPressure, pfBand } from "@/lib/ards-ventilation";

const R = ({ label }: { label: string }) => <InlineRef topicId="ards" refLabel={label} />;
const labels = ["Global ARDS definition 2024", "ESICM ARDS 2023 tidal volume", "ESICM ARDS 2023 prone", "ESICM ARDS 2023 recruitment", "ESICM ARDS 2023 ECMO", "ESICM ARDS 2023 HFNO", "ATS ARDS 2024", "ATS ARDS 2024 PEEP", "PROSEVA 2013 mortality"];
const input = "mt-1 w-24 rounded border border-input bg-background px-2 py-1";

function VentCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [h, setH] = useState(""); const [pl, setPl] = useState(""); const [peep, setPeep] = useState("");
  const [pao2, setPao2] = useState(""); const [fio2, setFio2] = useState("");
  const pbw = h.trim() ? predictedBodyWeight(sex, Number(h)) : null;
  const vt = pbw ? tidalVolumes(pbw) : null;
  const dp = pl.trim() && peep.trim() ? drivingPressure(Number(pl), Number(peep)) : null;
  const pf = pao2.trim() && fio2.trim() ? pfBand(Number(pao2), Number(fio2)) : null;
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
      <p className="font-semibold text-foreground">Teaching calculator: PBW, tidal volume, driving pressure, P/F</p>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col">Sex<select value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")} className={input}><option value="male">Male</option><option value="female">Female</option></select></label>
        <label className="flex flex-col">Height (cm)<input inputMode="decimal" value={h} onChange={(e) => setH(e.target.value)} className={input} /></label>
        <label className="flex flex-col">Plateau (cmH₂O)<input inputMode="decimal" value={pl} onChange={(e) => setPl(e.target.value)} className={input} /></label>
        <label className="flex flex-col">PEEP (cmH₂O)<input inputMode="decimal" value={peep} onChange={(e) => setPeep(e.target.value)} className={input} /></label>
        <label className="flex flex-col">PaO₂ (mm Hg)<input inputMode="decimal" value={pao2} onChange={(e) => setPao2(e.target.value)} className={input} /></label>
        <label className="flex flex-col">FiO₂ (0.21–1)<input inputMode="decimal" value={fio2} onChange={(e) => setFio2(e.target.value)} className={input} /></label>
      </div>
      <ul className="list-disc pl-5 space-y-1">
        <li>{pbw && vt ? <>PBW <strong className="text-foreground">{pbw} kg</strong>: 6 mL/kg = <strong className="text-foreground">{vt.start} mL</strong> (ESICM range 4–8 mL/kg: {vt.low}–{vt.high} mL)</> : "Enter height 120–230 cm for PBW."}</li>
        <li>{dp !== null ? <>Driving pressure <strong className="text-foreground">{dp} cmH₂O</strong>{dp > 15 ? " (above the commonly quoted 15 cmH₂O)" : ""}</> : "Enter plateau ≥ PEEP for driving pressure."}</li>
        <li>{pf ? <>P/F <strong className="text-foreground">{pf.ratio} mm Hg</strong>: {pf.band}{pf.proneThresholdMet ? "; below 150, so ESICM recommends proning after stabilisation" : ""}</> : "Enter PaO₂ (mm Hg; kPa × 7.5) and FiO₂ as a fraction."}</li>
      </ul>
      <p className="text-xs">Arithmetic only. It does not set the ventilator. The 15 cmH₂O driving-pressure figure comes from observational data, not a trial target.</p>
    </div>
  );
}

export function ArdsPracticeTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Latest Guidelines and Bedside Management: Global Definition, ESICM 2023 and ATS 2024</h2>
    <p>The 2024 global definition builds on Berlin. It includes patients on high-flow nasal oxygen at 30 L/min or more. It accepts SpO₂/FiO₂ ≤315 (when SpO₂ is 97% or below) as well as PaO₂/FiO₂ ≤300, and it allows ultrasound as imaging.<R label="Global ARDS definition 2024" /> In practice, ARDS can now be recognised before intubation and where blood gases are not available.</p>

    <h3 className="text-lg font-semibold text-foreground">ESICM vs ATS: where they agree and differ</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50 text-foreground"><tr><th className="p-2 text-left">Intervention</th><th className="p-2 text-left">ESICM 2023 (Europe)</th><th className="p-2 text-left">ATS 2024 (US)</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">Tidal volume</td><td className="p-2">Strong: 4–8 mL/kg PBW<R label="ESICM ARDS 2023 tidal volume" /></td><td className="p-2">Not re-addressed; earlier ATS guidance supports low tidal volume</td></tr>
        <tr className="border-t border-border"><td className="p-2">Prone</td><td className="p-2">Strong: P/F &lt;150 after stabilisation, sessions of 16 h or more<R label="ESICM ARDS 2023 prone" /></td><td className="p-2">Not re-addressed in the 2024 update</td></tr>
        <tr className="border-t border-border"><td className="p-2">PEEP / recruitment</td><td className="p-2">Against prolonged recruitment manoeuvres (≥35 cmH₂O for ≥1 min)<R label="ESICM ARDS 2023 recruitment" /></td><td className="p-2">Higher PEEP without recruitment manoeuvres (conditional); against prolonged recruitment (strong)<R label="ATS ARDS 2024 PEEP" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Corticosteroids</td><td className="p-2">Outside scope (non-drug therapies only)</td><td className="p-2">Suggested (conditional, moderate certainty)<R label="ATS ARDS 2024" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Neuromuscular blockers</td><td className="p-2">Not recommended routinely</td><td className="p-2">Suggested in early severe ARDS (conditional, low certainty)<R label="ATS ARDS 2024" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">VV-ECMO</td><td className="p-2">Strong: EOLIA-type severe ARDS, in an ECMO centre<R label="ESICM ARDS 2023 ECMO" /></td><td className="p-2">Suggested in selected severe ARDS (conditional)<R label="ATS ARDS 2024" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Before intubation</td><td className="p-2">HFNO over standard oxygen to reduce intubation (strong)<R label="ESICM ARDS 2023 HFNO" /></td><td className="p-2">Not addressed</td></tr>
      </tbody>
    </table></div>

    <h3 className="text-lg font-semibold text-foreground">Bedside checklist: the first 24 hours</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>Measure height. Calculate PBW and start at 6 mL/kg PBW, never actual weight.<R label="ESICM ARDS 2023 tidal volume" /></li>
      <li>Do inspiratory and expiratory holds. Keep plateau pressure ≤30 cmH₂O and track driving pressure (plateau minus PEEP).</li>
      <li>Set PEEP using a PEEP/FiO₂ table or an individual assessment; avoid prolonged recruitment manoeuvres.<R label="ATS ARDS 2024 PEEP" /></li>
      <li>Accept SpO₂ 88–95% and permissive hypercapnia if pH tolerates it.</li>
      <li>After stabilisation, if P/F is still &lt;150, prone for at least 16 h; PROSEVA cut 28-day mortality from 32.8% to 16.0%.<R label="ESICM ARDS 2023 prone" /><R label="PROSEVA 2013 mortality" /></li>
      <li>Aim for a conservative fluid balance once shock has resolved, and look for the cause (sepsis, aspiration, TRALI, pancreatitis).</li>
      <li>Consider steroids (ATS) and, in early severe ARDS, a short course of paralysis.<R label="ATS ARDS 2024" /></li>
      <li>If severe hypoxaemia or acidosis persists despite proning, contact an ECMO centre early. In the UK this is the commissioned NHS ECMO network.<R label="ESICM ARDS 2023 ECMO" /></li>
    </ol>

    <VentCalculator />

    <h3 className="text-lg font-semibold text-foreground">Worked case (fictional)</h3>
    <p>A 54-year-old man, 178 cm tall, with pneumococcal pneumonia. After intubation: PaO₂ 9 kPa (68 mm Hg) on FiO₂ 0.7, giving a P/F of about 97 (severe). His PBW is 73 kg, so the team sets 440 mL (6 mL/kg) with PEEP 14. Plateau is 30, so driving pressure is 16 cmH₂O, and they reduce tidal volume to 5 mL/kg. At 4 hours his P/F is still &lt;150, so he is proned for 16 h. They start dexamethasone for the pneumonia and give a short course of paralysis. Because his P/F stays below 80 despite this, they call the regional ECMO centre.</p>

    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what P/F and session length does ESICM 2023 specify for proning?</summary><p className="mt-2">P/F &lt;150 mm Hg after a stabilisation period, in sessions of 16 consecutive hours or more (strong recommendation).</p></details>
    <p className="text-xs">These are teaching notes, not a ventilation protocol.</p>
    <LessonSources topicId="ards" labels={labels} />
  </div>;
}
