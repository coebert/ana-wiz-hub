import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/** Closed-form effect-site response to an imposed unit step in plasma concentration. */
function relativeEffectSite(timeMin: number, ke0PerMin: number) {
  return 1 - Math.exp(-ke0PerMin * timeMin);
}

export default function TCISimulatorDiagram() {
  const [ke0, setKe0] = useState(0.5);
  const [time, setTime] = useState(2);
  const halfTime = Math.log(2) / ke0;
  const points = Array.from({ length: 101 }, (_, i) => {
    const t = i / 10;
    return (34 + 50 * t) + "," + (164 - 144 * relativeEffectSite(t, ke0));
  }).join(" ");
  return <DiagramFigure id="tci-simulator-diagram" title="Effect-site equilibration"
    description="Explore the lag after a plasma concentration step using the first-order effect-site equation.">
    <p>This example holds plasma concentration at one arbitrary unit from time zero. The effect-site concentration begins at zero and approaches plasma concentration according to dCe/dt = ke₀(Cp − Ce). It illustrates equilibration only. A clinical TCI pump also models drug distribution, elimination, prior dosing and a targeting algorithm.</p>
    <label className="my-3 block">Equilibration constant (ke₀) {ke0.toFixed(2)} per minute
      <input className="block w-full" type="range" min=".1" max="1.5" step=".05" value={ke0} onChange={e => setKe0(Number(e.target.value))}/></label>
    <svg viewBox="0 0 550 190" className="w-full" role="img" aria-label="Normalized plasma concentration stays at one; effect-site concentration approaches it over ten minutes.">
      <path d="M34 20V164H534" fill="none" stroke="currentColor"/>
      <line x1="34" y1="20" x2="534" y2="20" stroke="#64748b" strokeDasharray="4 4"/>
      <polyline points={points} fill="none" stroke="#0284c7" strokeWidth="3"/>
      <g fill="currentColor" fontSize="11"><text x="14" y="24">1</text><text x="14" y="166">0</text><text x="34" y="183">0 min</text><text x="496" y="183">10 min</text></g>
    </svg>
    <p>Dashed line shows imposed plasma concentration. Blue line shows effect-site concentration. The equilibration half-time is {halfTime.toFixed(2)} minutes.</p>
    <label className="my-3 block">Inspect time {time.toFixed(1)} minutes
      <input className="block w-full" type="range" min="0" max="10" step=".1" value={time} onChange={e => setTime(Number(e.target.value))}/></label>
    <p aria-live="polite">At this time Ce is {(relativeEffectSite(time, ke0) * 100).toFixed(1)}% of the imposed Cp.</p>
    <a className="underline" href="https://doi.org/10.1093/bja/aep143">Absalom et al. Pharmacokinetic models for propofol, 2009</a>
  </DiagramFigure>;
}
