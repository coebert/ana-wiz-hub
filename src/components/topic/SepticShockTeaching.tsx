import { Link } from "react-router-dom";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** Septic shock haemodynamics. Quotes resolve the septic-shock excerpt records (copied verbatim from Sepsis and Corticosteroids). */
const Quote = makeQuote("septic-shock");

export function ShockRecognitionTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Defining septic shock and measuring perfusion</H>
      <Quote label="Sepsis-3 2016 septic shock" />
      <p><Reasoning />both criteria are required — vasopressor need for MAP ≥65 mm Hg AND lactate &gt;2 mmol/L after adequate fluid. Lactate and capillary refill then guide resuscitation.</p>
      <Quote label="SSC 2021 lactate" />
      <Quote label="SSC 2021 capillary refill" />
      <p>Initial fluid volume and timing are covered on <Link to="/intensive-care/sepsis" className="text-primary underline">Sepsis &amp; Septic Shock</Link>.</p>
      <Check question="MAP 60 mm Hg on noradrenaline after fluids, lactate 1.6 mmol/L. Septic shock by Sepsis-3?">No — the lactate criterion is not met. It is sepsis with hypotension needing vasopressors, which still requires the same urgent management.</Check>
    </div>
  );
}

export function ShockVasopressorTeaching() {
  return (
    <div className={lessonWrap}>
      <H>MAP target and vasopressor choice</H>
      <Quote label="SSC 2021 MAP target" />
      <Quote label="SSC 2021 norepinephrine" />
      <Quote label="SSC 2021 vasopressin" />
      <p><Reasoning />vasopressin adds a non-adrenergic vasoconstrictor (V1 receptors), so it can spare catecholamine dose. The guideline's own remark that it is usually started at noradrenaline 0.25–0.5 µg/kg/min is a practice note, not a separate recommendation.</p>
      <H>Is 65 too high for older patients?</H>
      <Quote label="Lamontagne 2020 65 trial" />
      <p><Reasoning />the 65 trial (UK, age ≥65) targeted MAP 60–65 mm Hg and reduced vasopressor exposure without a significant mortality difference; the confidence interval does not exclude benefit. See <Link to="/pharmacology/vasoactive-agents" className="text-primary underline">Vasoactive Agents</Link> for receptor pharmacology.</p>
      <Check question="Noradrenaline is rising and MAP is still 58 mm Hg. What does SSC 2021 suggest?">Add vasopressin rather than continuing to escalate noradrenaline.</Check>
    </div>
  );
}

export function ShockSteroidTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Corticosteroids as a septic-shock adjunct</H>
      <Quote label="SSC 2021 Steroids" />
      <Quote label="ADRENAL 2018" />
      <p><Reasoning />ADRENAL found no 90-day mortality benefit but faster shock reversal; the recommendation is "suggest" (weak). This is a haemodynamic adjunct, not replacement of a missing hormone — patients with known adrenal insufficiency need full replacement doses (see <Link to="/intensive-care/adrenal-crisis" className="text-primary underline">Adrenal Crisis</Link>).</p>
      <Check question="Does hydrocortisone in septic shock reduce death at 90 days?">ADRENAL did not show this; steroids are suggested for ongoing vasopressor need, mainly to speed shock reversal.</Check>
    </div>
  );
}
