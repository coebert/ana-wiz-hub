import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

const pathways = {
  pea: { title: "Pulseless electrical activity", text: "Start external chest compressions immediately. If the patient is paced, briefly pause pacing to reveal the underlying rhythm. Treat a revealed VF/pVT or asystole according to its own branch. Search for bleeding, tamponade, tension pneumothorax and other reversible causes." },
  vf: { title: "VF or pulseless VT", text: "With a witnessed monitored arrest and immediately available defibrillator, give up to three consecutive shocks promptly. If shocks fail to restore circulation, begin compressions immediately. Begin compressions if shocks cannot be delivered promptly." },
  asystole: { title: "Asystole or extreme bradycardia", text: "If epicardial pacing is present, briefly pause it to exclude an underlying shockable rhythm. Attempt immediate pacing at maximum output when available. Check for mechanical output. Begin compressions immediately if pacing is unavailable, ineffective or delayed." },
};
type Rhythm = keyof typeof pathways;

export default function CardiacArrestPostCardiacSurgeryDiagram() {
  const [rhythm, setRhythm] = useState<Rhythm>("pea");
  return <DiagramFigure id="cardiac-arrest-post-cardiac-surgery-diagram" title="Cardiac arrest after cardiac surgery" description="Choose the rhythm to see the initial action in a monitored postoperative cardiac surgical patient.">
    <p>Confirm arrest using clinical signs and pulseless pressure waveforms. Call the cardiac arrest and surgical teams, identify reversible causes and prepare for resternotomy immediately.</p>
    <div className="my-3 flex flex-wrap gap-2">{(Object.keys(pathways) as Rhythm[]).map(key =>
      <button key={key} className="rounded border p-2" aria-pressed={rhythm === key} onClick={() => setRhythm(key)}>{pathways[key].title}</button>)}</div>
    <p aria-live="polite"><strong>{pathways[rhythm].title}.</strong> {pathways[rhythm].text}</p>
    <p className="mt-3">For witnessed VF/pVT or asystole where immediate shocks or pacing are attempted, the brief exception to immediate compressions ends within the first minute. RCUK advises a reduced IV adrenaline dose of 0.05–0.1 mg. In persistent arrest up to 10 days after cardiac surgery, aim for a trained team to perform resternotomy within five minutes. Provide internal massage once the chest is open. Follow the unit’s specialist pathway and consider ECPR in prolonged arrest.</p>
    <p className="mt-3"><a className="underline" href="https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines">Resuscitation Council UK 2025, cardiac surgery</a> · <a className="underline" href="https://www.sts.org/sites/default/files/documents/ExpertConsensus_ResuscitationAfterCardiacSurgery.pdf">STS expert consensus</a></p>
  </DiagramFigure>;
}
