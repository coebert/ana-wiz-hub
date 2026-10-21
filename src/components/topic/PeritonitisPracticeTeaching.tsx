import { useState } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { stopItEndDay } from "@/lib/icu-shock-calcs";

const R = ({ label }: { label: string }) => <InlineRef topicId="peritonitis" refLabel={label} />;
const Q = ({ children, label }: { children: string; label: string }) => <blockquote className="border-l-2 border-primary pl-3 italic">{children}<R label={label} /></blockquote>;

export function PeritonitisAssessmentTeaching() {
  const labels = ["WSES 2017 IAI", "SIS-IDSA 2010", "SSC 2021 MAP 65", "NICE CG174 resuscitation bolus"];
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <p>Peritonitis is inflammation of the peritoneum. In ICU it is almost always <strong>secondary</strong>: a hole or dead bowel lets gut contents into the abdomen (perforated ulcer or diverticulum, appendicitis, ischaemic bowel, anastomotic leak). <strong>Primary</strong> (spontaneous bacterial) peritonitis occurs in ascites without a hole and is treated with antibiotics alone. <strong>Tertiary</strong> peritonitis persists or returns after apparently adequate source control, often with resistant organisms or fungi, and carries a high mortality.</p>
    <Q label="WSES 2017 IAI">The cornerstones of effective treatment of IAIs are early recognition, adequate source control, and appropriate antimicrobial therapy. Prompt resuscitation of patients with ongoing sepsis is of utmost important.</Q>
    <h3 className="text-lg font-semibold text-foreground">Recognition is harder in ICU</h3>
    <p>A sedated, ventilated patient cannot report pain or guard. Clues are a rising lactate or vasopressor need without another cause, new feed intolerance, ileus, distension, rising intra-abdominal pressure, abnormal drain fluid, and a raised CRP after the expected post-operative peak (often day 3–5 for an anastomotic leak). CT with contrast is the usual test; in an unstable patient, bedside ultrasound or a decision to go straight to theatre may be needed.</p>
    <h3 className="text-lg font-semibold text-foreground">Guidance compared</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50 text-foreground"><tr><th className="p-2 text-left">Issue</th><th className="p-2 text-left">WSES 2017 (global)</th><th className="p-2 text-left">SIS–IDSA 2010 (US)</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">Core message</td><td className="p-2">Early recognition, source control, antibiotics, resuscitation<R label="WSES 2017 IAI" /></td><td className="p-2">Same three pillars; separate community-acquired and healthcare-associated infection<R label="SIS-IDSA 2010" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Antibiotic choice</td><td className="p-2">Driven by local resistance and severity</td><td className="p-2">Narrower agents for mild community infections; broader for severe or hospital-acquired</td></tr>
        <tr className="border-t border-border"><td className="p-2">Duration</td><td className="p-2">Short courses after adequate source control (incorporates STOP-IT)</td><td className="p-2">Limit to 4–7 days unless source control is hard to achieve</td></tr>
      </tbody>
    </table></div>
    <h3 className="text-lg font-semibold text-foreground">Bedside checklist before theatre</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>Take blood cultures and give broad-spectrum antibiotics now; do not wait for theatre.</li>
      <li>Give crystalloid in 500 mL boluses, reassessing each time.<R label="NICE CG174 resuscitation bolus" /></li>
      <li>Start noradrenaline early for MAP below 65 mm Hg rather than drowning the bowel.<R label="SSC 2021 MAP 65" /></li>
      <li>Arterial line, lactate, gas, group and save, coagulation; correct potassium.</li>
      <li>Plan a rapid-sequence induction — the stomach is full and ileus is common; have vasopressor ready for induction hypotension.</li>
      <li>Agree with the surgeon whether the plan is definitive repair or damage control (wash out, control the leak, leave the abdomen open and return in 24–48 h).</li>
      <li>Document a pre-operative mortality risk (for example NELA) and discuss ceiling of care with the patient or family where possible.</li>
    </ol>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what is tertiary peritonitis?</summary><p className="mt-2">Peritonitis that persists or recurs after apparently adequate source control, often with resistant bacteria or fungi; it carries a high mortality.</p></details>
    <LessonSources topicId="peritonitis" labels={labels} />
  </div>;
}

export function PeritonitisSourceControlTeaching() {
  const labels = ["STOP-IT 2015", "STOP-IT 2015 duration", "WSES 2017 IAI"];
  const [d, setD] = useState("");
  const end = d ? stopItEndDay(d) : null;
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h3 className="text-lg font-semibold text-foreground">Source control comes first</h3>
    <p>Antibiotics cannot sterilise a leaking bowel. Source control means draining pus, closing or removing the leaking bowel and washing out contamination — by surgery or, for a contained abscess, by radiological drainage. The sooner it happens in septic shock, the better; most guidance aims for within hours of diagnosis once the patient is resuscitated enough to go. In very frail patients, the honest discussion may be about whether surgery is in their interests at all.</p>
    <h3 className="text-lg font-semibold text-foreground">How long should antibiotics run? STOP-IT</h3>
    <p>STOP-IT randomised 518 patients with complicated intra-abdominal infection and adequate source control to a fixed course of about 4 days or to treatment until 2 days after fever, white count and ileus had resolved.</p>
    <Q label="STOP-IT 2015">Surgical-site infection, recurrent intraabdominal infection, or death occurred in 56 of 257 patients in the experimental group (21.8%), as compared with 58 of 260 patients in the control group (22.3%)</Q>
    <Q label="STOP-IT 2015 duration">The median duration of antibiotic therapy was 4.0 days (interquartile range, 4.0 to 5.0) in the experimental group, as compared with 8.0 days (interquartile range, 5.0 to 10.0) in the control group</Q>
    <p>Half the antibiotics gave the same outcome. The result only applies once the source is controlled; most patients were not in septic shock, so ICU teams still review each patient rather than stopping automatically.</p>
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
      <p className="font-semibold text-foreground">Teaching tool: STOP-IT course end date</p>
      <label className="flex flex-col">Date of adequate source control<input aria-label="Source control date" type="date" value={d} onChange={(e) => setD(e.target.value)} className="mt-1 w-44 rounded border border-input bg-background px-2 py-1" /></label>
      <p>{end ? <>A STOP-IT-style 4-day course would end around <strong className="text-foreground">{end}</strong>.</> : "Pick a date."}</p>
      <p className="text-xs">Arithmetic only. It does not apply without adequate source control, and it is not a stop order.</p>
    </div>
    <h3 className="text-lg font-semibold text-foreground">After theatre in ICU</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>Wean vasopressors as perfusion improves; avoid a large positive fluid balance, which worsens bowel oedema and intra-abdominal pressure. See <Link to="/intensive-care/abdominal-compartment-syndrome" className="text-primary underline">Abdominal Compartment Syndrome</Link>.</li>
      <li>Start enteral feeding early when the bowel is in continuity and the patient is stable.</li>
      <li>If the patient fails to improve by 48–72 hours, look again for a persisting source: CT, drain fluid, return to theatre.</li>
      <li>Send peritoneal fluid for culture and narrow antibiotics to the results.</li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">Worked case (fictional)</h3>
    <p>A 68-year-old woman, day 4 after anterior resection, becomes confused with HR 120, MAP 58 and lactate 4.1. CT shows free gas and fluid around the anastomosis. Cultures are taken and piperacillin–tazobactam given within the hour. Two 500 mL boluses improve capillary refill only briefly, so noradrenaline starts. After a rapid-sequence induction the surgeons take down the anastomosis and form a stoma. Source control is on 30 October; a 4-day course would end around 3 November, and her antibiotics are stopped then after review because she has improved.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what did STOP-IT show?</summary><p className="mt-2">After adequate source control, about 4 days of antibiotics gave similar outcomes (21.8% vs 22.3%) to longer, physiology-guided courses (median 8 days).</p></details>
    <p className="text-xs">These are teaching notes, not an antibiotic or surgical protocol.</p>
    <LessonSources topicId="peritonitis" labels={labels} />
  </div>;
}
