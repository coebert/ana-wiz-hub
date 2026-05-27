// Fixture: every safety-critical number has an <InlineRef /> within ±6 lines,
// so scanText() should return zero hits.
export const Covered = () => (
  <div>
    <p>Suxamethonium 1 mg/kg IV for RSI.</p>
    <InlineRef topicId="rsi" refLabel="Difficult Airway Society 2015" />

    <p>Maintain MAP &gt; 65 mmHg in septic shock.</p>
    <InlineRef topicId="sepsis" refLabel="Surviving Sepsis 2021" />

    <p>Target INR 2.5–3.5 for mechanical mitral valve.</p>
    <InlineRef topicId="anticoag" refLabel="BSH 2022" />
  </div>
);
