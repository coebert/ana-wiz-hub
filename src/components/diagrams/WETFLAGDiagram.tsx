import { useMemo, useState } from "react";

const WETFLAGDiagram = () => {
  const [age, setAge] = useState<number>(4); // years
  const [weight, setWeight] = useState<number | null>(null); // kg, optional override

  // APLS 2021 weight estimation by age band
  const estimatedWeight = useMemo(() => {
    if (age < 1) return Math.round((0.5 * 12 + 4) * 10) / 10; // (0.5 × age in months) + 4 — assume 6 months when <1
    if (age < 5) return 2 * age + 8;
    return 3 * age + 7;
  }, [age]);

  const w = weight ?? estimatedWeight;

  // Energy (defib) — 4 J/kg
  const energy = Math.round(4 * w);
  // Tube — uncuffed: age/4 + 4; cuffed: age/4 + 3.5; length oral = age/2 + 12
  const ettUncuffed = (age / 4 + 4).toFixed(1);
  const ettCuffed = (age / 4 + 3.5).toFixed(1);
  const ettLengthOral = (age / 2 + 12).toFixed(1);
  const ettLengthNasal = (age / 2 + 15).toFixed(1);
  // Fluids — 10 mL/kg bolus (APLS 2021); resuscitation up to 20 mL/kg in trauma
  const fluid = Math.round(10 * w);
  // Lorazepam (status) 0.1 mg/kg, Midazolam buccal 0.5 mg/kg
  const lorazepam = +(0.1 * w).toFixed(2);
  const midazolam = +(0.3 * w).toFixed(2);
  // Adrenaline — 10 µg/kg = 0.1 mL/kg of 1:10 000
  const adrenalineMicrog = Math.round(10 * w);
  const adrenalineMl = +(0.1 * w).toFixed(2);
  // Glucose — 2 mL/kg of 10%
  const glucoseMl = Math.round(2 * w);
  const glucoseGrams = +(0.2 * w).toFixed(1);

  const items = [
    {
      letter: "W",
      title: "Weight (kg)",
      value: `${w} kg`,
      formula: age < 1 ? "(0.5 × months) + 4" : age < 5 ? "(2 × age) + 8" : "(3 × age) + 7",
      detail:
        "APLS 2021 formulae. Always use measured weight if available (Broselow tape, scales). Dosing weight in obese children is debated — use ideal body weight for lipophilic drugs, total body weight for hydrophilic.",
      color: "hsl(var(--primary))",
    },
    {
      letter: "E",
      title: "Energy (J)",
      value: `${energy} J`,
      formula: "4 J/kg (DC shock)",
      detail:
        "Same energy for VF/pulseless VT and synchronised cardioversion (1 J/kg for first synchronised shock per UK guidance, 2 J/kg if needed; 4 J/kg for defibrillation). Use paediatric pads <10 kg or <1 yr; adult pads acceptable above this — anteroposterior position if pads overlap.",
      color: "hsl(0 70% 50%)",
    },
    {
      letter: "T",
      title: "Tube (ETT)",
      value: `Uncuffed ${ettUncuffed} mm  ·  Cuffed ${ettCuffed} mm`,
      formula: "Uncuffed: age/4 + 4   ·   Cuffed: age/4 + 3.5",
      detail: `Length at lips: ${ettLengthOral} cm (age/2 + 12). Nasal: ${ettLengthNasal} cm (age/2 + 15). Modern microcuffed tubes are now first-line in children of any age — confirm cuff pressure <20 cmH₂O. Neonates <3.5 kg: size 3.0 uncuffed.`,
      color: "hsl(220 70% 50%)",
    },
    {
      letter: "F",
      title: "Fluids (mL)",
      value: `${fluid} mL bolus`,
      formula: "10 mL/kg balanced crystalloid",
      detail:
        "APLS 2021 reduced bolus from 20 → 10 mL/kg after FEAST trial. Reassess after each bolus. Trauma/haemorrhagic shock: up to 20 mL/kg crystalloid then early blood products. DKA: 10 mL/kg over 30 min if shocked, otherwise cautious rehydration over 48 h to avoid cerebral oedema.",
      color: "hsl(200 70% 50%)",
    },
    {
      letter: "L",
      title: "Lorazepam (mg)",
      value: `${lorazepam} mg IV`,
      formula: "0.1 mg/kg IV (max 4 mg)",
      detail: `Status epilepticus first-line IV. No IV access: buccal midazolam ${midazolam} mg (0.3 mg/kg, max 10 mg) or rectal diazepam 0.5 mg/kg. Repeat once after 10 min if seizure persists, then escalate to phenytoin/levetiracetam (APLS now lists levetiracetam 40 mg/kg as alternative second-line — EcLiPSE/ConSEPT trials).`,
      color: "hsl(280 60% 50%)",
    },
    {
      letter: "A",
      title: "Adrenaline (µg)",
      value: `${adrenalineMicrog} µg  =  ${adrenalineMl} mL of 1:10 000`,
      formula: "10 µg/kg = 0.1 mL/kg of 1:10 000",
      detail:
        "Cardiac arrest dose IV/IO every 3–5 min. Anaphylaxis: 10 µg/kg IM of 1:1000 (max 500 µg). Croup: nebulised adrenaline 400 µg/kg of 1:1000 (max 5 mL). Avoid endotracheal route — IV/IO preferred.",
      color: "hsl(35 90% 45%)",
    },
    {
      letter: "G",
      title: "Glucose (mL)",
      value: `${glucoseMl} mL of 10% (= ${glucoseGrams} g)`,
      formula: "2 mL/kg of 10% dextrose",
      detail:
        "Hypoglycaemia: BM <3 mmol/L symptomatic, or <2.6 in neonate. Avoid 50% dextrose (osmolar/extravasation injury). Recheck BM after 10 min. Maintenance dextrose 4–6 mg/kg/min in neonates. Always check glucose in any unwell child — 'never let the sun set on a low BM'.",
      color: "hsl(142 60% 40%)",
    },
  ];

  return (
        <div className="my-6 p-4 rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground">WETFLAG — Paediatric Resuscitation Calculator</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            APLS 2021 mnemonic for weight-based emergency drug & equipment doses. Calculated when a child arrives in resus.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4 p-3 rounded-lg border border-border bg-secondary/30">
        <div>
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Age (years)</span>
            <span className="text-primary font-mono">{age < 1 ? "<1 yr" : `${age} yr`}</span>
          </label>
          <input
            type="range"
            min={0}
            max={14}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full mt-1 accent-primary"
          />
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Estimated weight: {estimatedWeight} kg (APLS formula{age < 1 ? " — assumes 6 mo" : ""})
          </p>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Override weight (kg)</span>
            {weight != null && (
              <button onClick={() => setWeight(null)} className="text-[10px] text-primary underline">use estimate</button>
            )}
          </label>
          <input
            type="number"
            min={1}
            max={100}
            step={0.5}
            value={weight ?? ""}
            placeholder={`${estimatedWeight}`}
            onChange={(e) => setWeight(e.target.value === "" ? null : Number(e.target.value))}
            className="w-full mt-1 px-2 py-1 rounded border border-border bg-background text-sm"
          />
          <p className="text-[10px] text-muted-foreground mt-0.5">Use measured weight when available.</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {items.map((it) => (
          <div
            key={it.letter}
            className="grid grid-cols-[40px_1fr] gap-3 p-3 rounded-lg border border-border bg-background"
          >
            <div
              className="flex items-center justify-center text-2xl font-serif font-bold rounded-md text-white"
              style={{ backgroundColor: it.color }}
            >
              {it.letter}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <p className="text-sm font-semibold text-foreground">{it.title}</p>
                <p className="text-sm font-bold" style={{ color: it.color }}>{it.value}</p>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">Formula: {it.formula}</p>
              <p className="text-xs text-muted-foreground/90 mt-1 leading-relaxed">{it.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-2.5 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
        <strong className="text-foreground">Clinical use: </strong>
        Calculate WETFLAG on PICU admission and at the start of any resuscitation. Write the values on the whiteboard / drug chart so the team can act without recalculating under stress.
      </div>
    </div>
  );
};

export default WETFLAGDiagram;
