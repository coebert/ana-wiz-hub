import { useState } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { plrChange, niceMaintenance } from "@/lib/icu-shock-calcs";

const R = ({ label }: { label: string }) => <InlineRef topicId="hypovolaemia" refLabel={label} />;
const input = "mt-1 w-24 rounded border border-input bg-background px-2 py-1";
const Q = ({ children, label }: { children: string; label: string }) => <blockquote className="border-l-2 border-primary pl-3 italic">{children}<R label={label} /></blockquote>;

export function HypovolaemiaRecognitionTeaching() {
  const labels = ["NICE CG174 resuscitation bolus", "Monnet 2016 PLR", "Monnet 2016 PLR pulse pressure"];
  const [b, setB] = useState(""); const [a, setA] = useState("");
  const r = b && a ? plrChange(Number(b), Number(a)) : null;
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <p>Hypovolaemia means too little circulating volume for the vascular space. This page covers losses other than bleeding: vomiting, diarrhoea, high-output stomas and fistulas, bowel obstruction with fluid trapped in the gut ("third space"), burns, diuretics, diabetic emergencies and simple poor intake. For blood loss see <Link to="/intensive-care/haemorrhagic-shock" className="text-primary underline">Haemorrhagic Shock</Link>.</p>
    <h3 className="text-lg font-semibold text-foreground">Recognising it</h3>
    <p>No single sign is reliable. Thirst, dry mouth and reduced skin turgor are weak signs in older adults. Postural rise in heart rate, a slow capillary refill, cool peripheries, falling urine output (below 0.5 mL/kg/h), a rising urea-to-creatinine ratio and a raised lactate build the picture. Blood pressure falls late, because vasoconstriction protects it until a large share of volume has gone. NICE lists the signs that suggest a patient needs fluid resuscitation, including a systolic pressure below 100, heart rate over 90, capillary refill over 2 s, respiratory rate over 20, NEWS 5 or more, and passive leg raising that suggests fluid responsiveness.</p>
    <h3 className="text-lg font-semibold text-foreground">Will fluid help? The passive leg raise</h3>
    <p>Raising the legs to 45° from a semi-recumbent position returns about 300 mL of venous blood to the heart — a reversible fluid challenge. A meta-analysis of 21 studies found:</p>
    <Q label="Monnet 2016 PLR">The area under the ROC curve was 0.95 ± 0.01. The best threshold was a PLR-induced increase in CO ≥10 ± 2 %.</Q>
    <p>The test must be read with a real-time cardiac output or stroke volume (echo, pulse contour, oesophageal Doppler), not blood pressure:</p>
    <Q label="Monnet 2016 PLR pulse pressure">When PLR effects are assessed by changes in PP, the specificity of the PLR test remains acceptable but its sensitivity is poor.</Q>
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
      <p className="font-semibold text-foreground">Teaching calculator: passive leg raise response</p>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col">Cardiac output or stroke volume before<input aria-label="Before" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} className={input} /></label>
        <label className="flex flex-col">At peak of leg raise<input aria-label="After" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} className={input} /></label>
      </div>
      <p>{r ? <>Change <strong className="text-foreground">{r.pct}%</strong>: {r.responsive ? "at or above the 10% threshold — likely to respond to fluid" : "below the 10% threshold — fluid unlikely to raise cardiac output"}</> : "Enter two positive values in the same units."}</p>
      <p className="text-xs">Arithmetic only. Fluid responsiveness is not the same as needing fluid: healthy people are fluid responsive too.</p>
    </div>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why measure cardiac output rather than pulse pressure during a leg raise?</summary><p className="mt-2">Pulse pressure changes have poor sensitivity (pooled 0.56), so many responders are missed; cardiac output changes of ≥10% predict response well (AUC 0.95).</p></details>
    <LessonSources topicId="hypovolaemia" labels={labels} />
  </div>;
}

export function HypovolaemiaFluidsTeaching() {
  const labels = ["NICE CG174 resuscitation bolus", "NICE CG174 maintenance", "SMART 2018", "PLUS 2022", "BaSICS 2021"];
  const [w, setW] = useState("");
  const m = w ? niceMaintenance(Number(w)) : null;
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h3 className="text-lg font-semibold text-foreground">Resuscitation: small boluses, then reassess</h3>
    <Q label="NICE CG174 resuscitation bolus">If patients need IV fluid resuscitation, use crystalloids that contain sodium in the range 130 to 154 mmol/l, with a bolus of 500 ml over less than 15 minutes.</Q>
    <p>After each bolus, look again at the same signs. NICE asks for expert help if the patient has had 2,000 mL and still needs more. Replace what is being lost: a vomiting patient loses chloride and potassium; diarrhoea and stoma losses take bicarbonate and potassium. Measure and chart ongoing losses every few hours and add them to the plan.</p>
    <h3 className="text-lg font-semibold text-foreground">Balanced crystalloid or saline?</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50 text-foreground"><tr><th className="p-2 text-left">Trial</th><th className="p-2 text-left">Result</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">SMART 2018 (US, 15,802 adults)</td><td className="p-2">Major adverse kidney events 14.3% balanced vs 15.4% saline — a small difference.<R label="SMART 2018" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">BaSICS 2021 (Brazil, 10,520)</td><td className="p-2">90-day mortality 26.4% vs 27.2%, not significant.<R label="BaSICS 2021" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">PLUS 2022 (Australia/NZ, 5,037)</td><td className="p-2">90-day mortality 21.8% vs 22.0%, not significant.<R label="PLUS 2022" /></td></tr>
      </tbody>
    </table></div>
    <p>Balanced solutions are a reasonable default and avoid hyperchloraemic acidosis, but the large mortality trials found no clear difference. Saline remains preferred after a head injury, and in a patient who is vomiting with a low chloride.</p>
    <h3 className="text-lg font-semibold text-foreground">Once resuscitated: maintenance</h3>
    <Q label="NICE CG174 maintenance">If patients need IV fluids for routine maintenance alone, restrict the initial prescription to: 25 to 30 ml/kg/day of water and approximately 1 mmol/kg/day of potassium, sodium and chloride and approximately 50 to 100 g/day of glucose to limit starvation ketosis.</Q>
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
      <p className="font-semibold text-foreground">Teaching calculator: NICE maintenance</p>
      <label className="flex flex-col">Weight (kg)<input aria-label="Weight" inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)} className={input} /></label>
      <p>{m ? <>Water <strong className="text-foreground">{m.waterLow}–{m.waterHigh} mL/day</strong>; sodium, potassium and chloride about <strong className="text-foreground">{m.electrolyteMmol} mmol/day</strong> each. Add measured ongoing losses separately.</> : "Enter a weight of 20–250 kg."}</p>
      <p className="text-xs">Arithmetic only. NICE advises lower volumes for older, frail, heart- or kidney-failure patients; this is not a prescription.</p>
    </div>
    <h3 className="text-lg font-semibold text-foreground">Worked case (fictional)</h3>
    <p>An 80 kg man with a new ileostomy has passed 2.5 L in 24 hours. HR 108, BP 98/60, capillary refill 4 s, urine 15 mL/h, creatinine doubled. A leg raise raises stroke volume by 14%. He gets 500 mL balanced crystalloid over 15 minutes, twice, with reassessment after each; heart rate falls to 92 and urine output rises. His plan then covers maintenance (about 2,000–2,400 mL/day) plus mL-for-mL replacement of stoma output, with magnesium and potassium checked, and a loperamide review with the surgeons.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what bolus does NICE CG174 recommend for resuscitation?</summary><p className="mt-2">500 mL of crystalloid containing 130–154 mmol/L sodium over less than 15 minutes, then reassess.</p></details>
    <p className="text-xs">These are teaching notes, not a fluid protocol.</p>
    <LessonSources topicId="hypovolaemia" labels={labels} />
  </div>;
}
