// Fixture: boundary overlap cases between weight-dose and infusion-rate.
// Each line is crafted so the two regexes' spans collide at a punctuation
// or extra-unit boundary. Dedupe must emit exactly one hit per number.
<div>
  <p>Noradrenaline infusion at 0.05 mcg/kg/min, titrated to MAP.</p>
  <p>Remifentanil bolus 1 mcg/kg; then 0.1 mcg/kg/min maintenance.</p>
  <p>Insulin infusion 0.05 units/kg/h (weight-banded).</p>
  <p>Propofol bolus 2 mg/kg, infusion 5 mg/kg/h.</p>
  <p>Adrenaline 1 mg IV bolus then 0.1 mcg/kg/min infusion.</p>
</div>
