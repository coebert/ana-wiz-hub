import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const ESAIC_ESRA_SOURCE = "https://esaic.org/wp-content/uploads/2023/12/regional_anaesthesia_in_patients_on_antithrom.pdf";

const drugs = ["Aspirin", "Clopidogrel", "Prasugrel", "Ticagrelor", "Dipyridamole", "GP IIb/IIIa inhibitor", "LMWH", "Unfractionated heparin", "Warfarin", "Fondaparinux", "Apixaban", "Rivaroxaban", "Dabigatran", "Edoxaban", "Thrombolytic", "Bivalirudin / argatroban", "None"];
const procedures = ["Single-shot spinal", "Epidural / CSE / catheter insertion", "Neuraxial catheter removal", "Deep peripheral block", "Superficial block at a compressible site"];
const checks = [
  "Exact drug, formulation, dose and indication; other antithrombotics",
  "Last administration time and renal function (including recent deterioration)",
  "Platelet count, trend, bleeding history and clinically relevant coagulation abnormalities",
  "Traumatic puncture, surgical haemostasis and bleeding/thrombotic risk",
  "Catheter presence, insertion/removal plan and planned next dose",
  "Named guideline recommendation and local specialist review",
];

/** A guideline navigation/checklist aid. It intentionally has no clearance or patient timing algorithm. */
export function AntithromboticGuidelineLookup({ restart = false }: { restart?: boolean }) {
  const [drug, setDrug] = useState(restart ? "LMWH" : "None");
  const [procedure, setProcedure] = useState("Single-shot spinal");
  const [catheter, setCatheter] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const neuraxial = procedure !== "Superficial block at a compressible site";
  return <div className="space-y-4 rounded-lg border border-border bg-card p-4">
    <p className="text-sm font-semibold">{restart ? "Antithrombotic restart and catheter checklist" : "Regional anaesthesia and antithrombotics: guideline lookup"}</p>
    <p className="text-sm text-muted-foreground">Educational lookup only: these selections cannot establish suitability for a block, catheter removal or drug restart. No patient-specific timing is calculated; completing the checklist is not clinical clearance.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="space-y-1 text-sm">Antiplatelet / anticoagulant
        <select aria-label="Antiplatelet / anticoagulant" value={drug} onChange={e => setDrug(e.target.value)} className="block w-full rounded-md border border-border bg-background p-2">
          {drugs.map(d => <option key={d}>{d}</option>)}
        </select>
      </label>
      <label className="space-y-1 text-sm">Intended procedure
        <select aria-label="Intended procedure" value={procedure} onChange={e => setProcedure(e.target.value)} className="block w-full rounded-md border border-border bg-background p-2">
          {procedures.map(p => <option key={p}>{p}</option>)}
        </select>
      </label>
    </div>
    <label className="flex items-center gap-2 text-sm"><Checkbox checked={catheter} onCheckedChange={v => setCatheter(v === true)} aria-label="Indwelling neuraxial catheter" />Indwelling neuraxial catheter</label>
    <div role="status" className="space-y-2 border-l-4 border-destructive pl-3 text-sm">
      <p>{neuraxial ? "Spinal, epidural, catheter removal and deep non-compressible blocks require neuraxial/deep-block precautions. A single-shot spinal is not a superficial compressible block." : "Superficial compressible blocks have different guidance; assess the actual site, compressibility and consequences of bleeding. Fascial-plane blocks are not automatically superficial."}</p>
      {drug === "Clopidogrel" && <p>ESAIC/ESRA 2022: the interval before a neuraxial procedure is 5–7 days after the last clopidogrel dose, not 6 hours. Catheter removal is a neuraxial intervention; subsequent dosing depends on dose/loading and catheter removal. Review recommendations R17 and R36, not a generic hours-after-surgery rule.</p>}
      {drug === "Aspirin" && <p>ESAIC/ESRA distinguishes low-dose aspirin (&lt;200 mg/day) from high-dose aspirin (≥200 mg/day). Do not treat all aspirin doses or combination therapy as unrestricted.</p>}
      {catheter && <p>Do not derive removal time from the end of surgery. Last drug administration, dose, renal clearance and the catheter-specific recommendation must be checked separately from the subsequent-dose interval.</p>}
      <p>Routine PT/APTT cannot exclude a clinically relevant DOAC effect. TEG/ROTEM or a platelet count alone cannot certify platelet safety. Drug-specific testing, when indicated by the adopted guideline, requires appropriate assay interpretation.</p>
    </div>
    <fieldset className="space-y-2"><legend className="mb-2 text-sm font-semibold">Information requiring review</legend>
      {checks.map(c => <label key={c} className="flex items-start gap-2 text-sm"><Checkbox aria-label={c} checked={checked.includes(c)} onCheckedChange={v => setChecked(prev => v === true ? [...prev, c] : prev.filter(x => x !== c))} />{c}</label>)}
    </fieldset>
    <p className="text-sm text-muted-foreground">Record the responsible clinician’s individual decision and neurological monitoring plan. New weakness, sensory change or bladder/bowel dysfunction after neuraxial intervention requires urgent assessment.</p>
    <a href={ESAIC_ESRA_SOURCE} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">ESAIC/ESRA 2022 — Regional anaesthesia in patients on antithrombotic drugs (full guideline)</a>
    <p className="text-xs text-muted-foreground">This lookup uses the named European guideline; it does not merge its intervals with ASRA or older AAGBI guidance. Check current local guidance and product information.</p>
  </div>;
}