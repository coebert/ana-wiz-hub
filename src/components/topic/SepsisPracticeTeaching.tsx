import { useState } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { sepsisFluidComparison } from "@/lib/sepsis-fluids";

const R = ({ label }: { label: string }) => <InlineRef topicId="sepsis" refLabel={label} />;
const labels = ["NICE NG253 2025 high risk", "NICE NG253 2025 antibiotics", "NICE NG253 2025 fluids", "NICE NG253 2025 escalation", "SSC 2021", "SSC 2021 (Antimicrobial timing)", "CLOVERS 2023", "CLASSIC 2022"];

function FluidComparison() {
  const [weight, setWeight] = useState("");
  const [given, setGiven] = useState("");
  const r = sepsisFluidComparison(weight, given);
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <p className="font-semibold text-foreground">Teaching calculator: NICE vs SSC initial fluid</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <label className="flex flex-col">Weight (kg)<input inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 w-28 rounded border border-input bg-background px-2 py-1" /></label>
        <label className="flex flex-col">Fluid already given (mL)<input inputMode="decimal" value={given} onChange={(e) => setGiven(e.target.value)} className="mt-1 w-28 rounded border border-input bg-background px-2 py-1" /></label>
      </div>
      {r ? (
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>SSC 2021 suggestion (at least 30 mL/kg within 3 h): <strong className="text-foreground">{r.sscMl.toLocaleString()} mL</strong></li>
          <li>NICE NG253: {r.seniorReviewDue ? <strong className="text-foreground">1,000 mL reached; senior review now</strong> : <><strong className="text-foreground">{r.niceBolusesBeforeReview} × 250 mL</strong> ({r.niceRemainingMl.toLocaleString()} mL) before senior review, reassessing after each</>}</li>
        </ul>
      ) : <p className="text-sm">Enter a weight above 0 kg and any fluid already given.</p>}
      <p className="text-xs">Arithmetic only. It is not a prescription. Fluid response, lung status and heart function decide what you actually give.</p>
    </div>
  );
}

export function SepsisPracticeTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Latest Guidelines and Bedside Management: NICE NG253, SSC 2021 and the Fluid Trials</h2>
    <p>In November 2025 NICE replaced NG51 with three guidelines: NG253 for adults aged 16 or over, NG254 for under-16s and NG255 for pregnancy. NG253 was last updated on 23 September 2026. Risk is graded by NEWS2. High risk means suspected infection with a NEWS2 of 7 or above, or a lower score with one parameter scoring 3 after medical review.<R label="NICE NG253 2025 high risk" /></p>

    <h3 className="text-lg font-semibold text-foreground">UK vs international guidance</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50 text-foreground"><tr><th className="p-2 text-left">Issue</th><th className="p-2 text-left">NICE NG253 (UK, 2025–26)</th><th className="p-2 text-left">SSC 2021 (SCCM/ESICM)</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">Screening</td><td className="p-2">NEWS2 risk bands</td><td className="p-2">Recommends against qSOFA as the only screening tool</td></tr>
        <tr className="border-t border-border"><td className="p-2">Antibiotics</td><td className="p-2">High risk: within 1 h of the NEWS2 score<R label="NICE NG253 2025 antibiotics" /></td><td className="p-2">Possible shock: immediately, ideally within 1 h. Possible sepsis without shock: within 3 h if concern persists<R label="SSC 2021 (Antimicrobial timing)" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Initial fluid</td><td className="p-2">250 mL boluses, reassess each time; senior review at 1,000 mL total<R label="NICE NG253 2025 fluids" /></td><td className="p-2">At least 30 mL/kg crystalloid within 3 h (weak suggestion)<R label="SSC 2021" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Fluid type</td><td className="p-2">Balanced crystalloid such as Hartmann's; 0.9% saline if no balanced fluid is available</td><td className="p-2">Balanced crystalloid suggested over saline</td></tr>
        <tr className="border-t border-border"><td className="p-2">Escalation</td><td className="p-2">No response within 1 h of any intervention: senior clinician attends, critical care involved, consultant informed<R label="NICE NG253 2025 escalation" /></td><td className="p-2">MAP 65 mm Hg; noradrenaline first, then vasopressin</td></tr>
      </tbody>
    </table></div>
    <p>The biggest practical difference is fluid. For a 70 kg adult, 30 mL/kg is 2.1 L. NICE reaches senior review at 1 L. In practice, both mean giving fluid in measured steps and reassessing after each one.</p>

    <h3 className="text-lg font-semibold text-foreground">What the fluid trials add</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">CLOVERS (2023):</strong> 1,563 patients whose hypotension persisted after 1–3 L of fluid. The restrictive group got about 2.1 L less fluid and earlier vasopressors. Death by day 90 was 14.0% vs 14.9%, with no significant difference.<R label="CLOVERS 2023" /></li>
      <li><strong className="text-foreground">CLASSIC (2022):</strong> 1,554 ICU patients with septic shock. The restrictive group received a median of 1,798 vs 3,811 mL. 90-day mortality was 42.3% vs 42.1%.<R label="CLASSIC 2022" /></li>
      <li><strong className="text-foreground">Takeaway:</strong> after initial resuscitation, deliberately limiting fluid and starting vasopressors earlier neither helped nor harmed on average. These trials do not support withholding the first fluid, and they do not support giving fluid with no end-point.</li>
    </ul>

    <h3 className="text-lg font-semibold text-foreground">Bedside checklist: the first hour</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>Calculate NEWS2 and record the time. NICE's 1-hour antibiotic clock starts here.<R label="NICE NG253 2025 antibiotics" /></li>
      <li>Take a blood gas with lactate and send blood cultures, but don't let cultures delay antibiotics.</li>
      <li>Give broad-spectrum IV antibiotics that cover the likely source and follow local resistance patterns.</li>
      <li>Give a 250 mL balanced crystalloid bolus over 10–15 min, then reassess blood pressure, perfusion, mentation and lung examination.<R label="NICE NG253 2025 fluids" /></li>
      <li>If still hypotensive after about 1 L, get senior review and start noradrenaline toward a MAP of 65 mm Hg (peripheral use per local policy).</li>
      <li>Look for a source that needs control (pus, an infected line, an obstructed urinary tract or bowel) and plan the timing.</li>
      <li>If there is no response within 1 hour, the senior clinician attends in person and critical care is involved.<R label="NICE NG253 2025 escalation" /></li>
    </ol>

    <FluidComparison />

    <h3 className="text-lg font-semibold text-foreground">Worked case (fictional)</h3>
    <p>A 68-year-old, 70 kg, has an obstructed infected kidney. Ward NEWS2 is 8, BP 82/45, lactate 4.6 mmol/L. NEWS2 ≥7 puts her at high risk, so antibiotics are due within the hour. She gets four 250 mL boluses. After 1 L her MAP is 58 mm Hg with crackles at the lung bases. Rather than pushing toward 2.1 L, the team starts noradrenaline, involves critical care and arranges urgent decompression of the obstructed kidney. Antibiotics, the vasopressor and source control proceed together.</p>

    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: in NG253, what is the initial adult bolus, and when must a senior be involved?</summary><p className="mt-2">250 mL over 10–15 minutes, reassessing after each bolus. Get senior advice if the patient has not improved enough after 1,000 mL total, including fluid already given.</p></details>
    <p className="text-xs">These are teaching notes, not a local protocol or prescription. Pregnant or recently pregnant patients follow NICE NG255.</p>
    <LessonSources topicId="sepsis" labels={labels} />
  </div>;
}
