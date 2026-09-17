import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/* ------------------------------------------------------------------ *
 * Published pharmacokinetic parameter sets, implemented exactly as in
 * the source papers. Volumes in litres, rate constants in min⁻¹,
 * clearances in L·min⁻¹.
 *   Marsh 1991 / modified Marsh (ke0 1.2 min⁻¹, t-peak matched)
 *   Schnider 1998 (Anesthesiology 88:1170)
 *   Paedfusor (Absalom & Kenny, Br J Anaesth 2005;95:110)
 *   Minto 1997 (Anesthesiology 86:10) — remifentanil
 * ------------------------------------------------------------------ */

export interface Patient {
  age: number;
  weight: number;
  height: number;
  sex: "male" | "female";
}

export interface ParamSet {
  V1: number;
  k10: number;
  k12: number;
  k21: number;
  k13: number;
  k31: number;
  ke0: number | null;
  V2: number;
  V3: number;
}

const jamesLBM = (p: Patient) => {
  const bmiTerm = (p.weight / p.height) ** 2;
  return p.sex === "male"
    ? 1.1 * p.weight - 128 * bmiTerm
    : 1.07 * p.weight - 148 * bmiTerm;
};

const marsh = (p: Patient, ke0: number): ParamSet => {
  const V1 = 0.228 * p.weight;
  return {
    V1,
    V2: 0.463 * p.weight,
    V3: 2.893 * p.weight,
    k10: 0.119,
    k12: 0.112,
    k21: 0.055,
    k13: 0.0419,
    k31: 0.0033,
    ke0,
  };
};

const schnider = (p: Patient): ParamSet => {
  const lbm = jamesLBM(p);
  const V1 = 4.27;
  const V2 = 18.9 - 0.391 * (p.age - 53);
  const V3 = 238;
  const Cl1 =
    1.89 + 0.0456 * (p.weight - 77) - 0.0681 * (lbm - 59) + 0.0264 * (p.height - 177);
  const Cl2 = 1.29 - 0.024 * (p.age - 53);
  const Cl3 = 0.836;
  return {
    V1,
    V2,
    V3,
    k10: Cl1 / V1,
    k12: Cl2 / V1,
    k21: Cl2 / V2,
    k13: Cl3 / V1,
    k31: Cl3 / V3,
    ke0: 0.456,
  };
};

const paedfusor = (p: Patient): ParamSet => {
  const V1 = 0.4584 * p.weight;
  return {
    V1,
    V2: 0.9542 * p.weight,
    V3: 5.9647 * p.weight,
    k10: 0.1527 * p.weight ** -0.3,
    k12: 0.114,
    k21: 0.055,
    k13: 0.0419,
    k31: 0.0033,
    ke0: 0.26,
  };
};

const minto = (p: Patient): ParamSet => {
  const lbm = jamesLBM(p);
  const V1 = 5.1 - 0.0201 * (p.age - 40) + 0.072 * (lbm - 55);
  const V2 = 9.82 - 0.0811 * (p.age - 40) + 0.108 * (lbm - 55);
  const V3 = 5.42;
  const Cl1 = 2.6 - 0.0162 * (p.age - 40) + 0.0191 * (lbm - 55);
  const Cl2 = 2.05 - 0.0301 * (p.age - 40);
  const Cl3 = 0.076 - 0.00113 * (p.age - 40);
  return {
    V1,
    V2,
    V3,
    k10: Cl1 / V1,
    k12: Cl2 / V1,
    k21: Cl2 / V2,
    k13: Cl3 / V1,
    k31: Cl3 / V3,
    ke0: 0.595 - 0.007 * (p.age - 40),
  };
};

type ModelId = "marsh" | "modmarsh" | "schnider" | "paedfusor" | "minto";

const modelMeta: Record<ModelId, { label: string; drug: string; colour: string; build: (p: Patient) => ParamSet }> = {
  marsh: { label: "Marsh", drug: "Propofol", colour: "hsl(200,65%,50%)", build: (p) => marsh(p, 0.26) },
  modmarsh: { label: "Modified Marsh", drug: "Propofol", colour: "hsl(175,60%,42%)", build: (p) => marsh(p, 1.2) },
  schnider: { label: "Schnider", drug: "Propofol", colour: "hsl(280,55%,55%)", build: schnider },
  paedfusor: { label: "Paedfusor", drug: "Propofol (child)", colour: "hsl(35,80%,48%)", build: paedfusor },
  minto: { label: "Minto", drug: "Remifentanil", colour: "hsl(0,60%,50%)", build: minto },
};

/** Integrate the 3-compartment + effect-site ODEs after a unit bolus (1 mg into V1). */
function simulateBolus(ps: ParamSet, minutes = 20, dt = 0.005) {
  let a1 = 1, a2 = 0, a3 = 0, ce = 0;
  const ke0 = ps.ke0 ?? 0;
  const out: Array<{ t: number; cp: number; ce: number }> = [];
  const steps = Math.round(minutes / dt);
  for (let i = 0; i <= steps; i++) {
    const cp = a1 / ps.V1;
    if (i % Math.round(0.05 / dt) === 0) out.push({ t: i * dt, cp, ce });
    const da1 = -(ps.k10 + ps.k12 + ps.k13) * a1 + ps.k21 * a2 + ps.k31 * a3;
    const da2 = ps.k12 * a1 - ps.k21 * a2;
    const da3 = ps.k13 * a1 - ps.k31 * a3;
    const dce = ke0 * (cp - ce);
    a1 += da1 * dt; a2 += da2 * dt; a3 += da3 * dt; ce += dce * dt;
  }
  return out;
}

const tPeak = (curve: Array<{ t: number; ce: number }>) =>
  curve.reduce((best, pt) => (pt.ce > best.ce ? pt : best), curve[0]).t;

const TCIModelComparisonDiagram = () => {
  const [patient, setPatient] = useState<Patient>({ age: 40, weight: 70, height: 170, sex: "male" });
  const [active, setActive] = useState<ModelId[]>(["marsh", "modmarsh", "schnider"]);
  const [target, setTarget] = useState(4);

  const rows = useMemo(() => {
    return (Object.keys(modelMeta) as ModelId[]).map((id) => {
      const ps = modelMeta[id].build(patient);
      const curve = simulateBolus(ps);
      return {
        id,
        ...modelMeta[id],
        ps,
        curve,
        tpeak: ps.ke0 ? tPeak(curve) : null,
        clearance: ps.k10 * ps.V1,
      };
    });
  }, [patient]);

  const shown = rows.filter((r) => active.includes(r.id) && r.drug !== "Remifentanil");
  const maxCp = Math.max(...shown.flatMap((r) => r.curve.map((c) => c.cp)), 0.001);

  const W = 620, H = 250, padL = 48, padB = 34, padT = 12, padR = 12;
  const x = (t: number) => padL + (t / 20) * (W - padL - padR);
  const y = (v: number) => H - padB - (v / maxCp) * (H - padB - padT);
  const path = (curve: Array<{ t: number; cp: number; ce: number }>, key: "cp" | "ce") =>
    curve.map((c, i) => `${i === 0 ? "M" : "L"}${x(c.t).toFixed(1)},${y(c[key]).toFixed(1)}`).join(" ");

  return (
    <DiagramFigure
      id="tci-model-comparison"
      title="Model-to-model comparison: computed parameters, bolus dose and effect-site kinetics for the same patient"
      description="Interactive comparison. Entering age, weight, height and sex computes the published parameters of the Marsh, modified Marsh, Schnider, Paedfusor and Minto models. The graph shows plasma and effect-site concentrations after an identical 1 mg bolus, so differences reflect only the models' volumes and rate constants. Marsh scales the central volume with total body weight and therefore predicts a much lower peak concentration and demands a much larger induction dose than Schnider, whose central volume is fixed at 4.27 litres. Modified Marsh keeps Marsh volumes but raises ke0 to 1.2 per minute, shortening time to peak effect from about 4.5 minutes to about 1.6 minutes."
      showCaption
      className="rounded-lg border border-border p-4"
    >
      {/* Patient inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {([
          ["Age (yr)", "age", 1, 100],
          ["Weight (kg)", "weight", 5, 200],
          ["Height (cm)", "height", 60, 210],
        ] as const).map(([label, key, min, max]) => (
          <label key={key} className="text-xs text-muted-foreground">
            {label}
            <input
              type="number"
              min={min}
              max={max}
              value={patient[key]}
              onChange={(e) =>
                setPatient((p) => ({ ...p, [key]: Math.min(max, Math.max(min, Number(e.target.value) || min)) }))
              }
              className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1 text-foreground"
            />
          </label>
        ))}
        <label className="text-xs text-muted-foreground">
          Sex
          <select
            value={patient.sex}
            onChange={(e) => setPatient((p) => ({ ...p, sex: e.target.value as Patient["sex"] }))}
            className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1 text-foreground"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {rows.filter((r) => r.drug !== "Remifentanil").map((r) => (
          <button
            key={r.id}
            aria-pressed={active.includes(r.id)}
            onClick={() =>
              setActive((a) => (a.includes(r.id) ? a.filter((m) => m !== r.id) : [...a, r.id]))
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              active.includes(r.id) ? "text-primary-foreground border-transparent" : "border-border text-muted-foreground"
            }`}
            style={active.includes(r.id) ? { background: r.colour } : undefined}
          >
            {r.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Plasma (solid) and effect-site (dashed) concentration curves after an identical 1 mg bolus for the selected propofol models." className="w-full h-auto">
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="hsl(var(--border))" />
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="hsl(var(--border))" />
        {[0, 5, 10, 15, 20].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={H - padB} x2={x(t)} y2={H - padB + 4} stroke="hsl(var(--border))" />
            <text x={x(t)} y={H - padB + 16} textAnchor="middle" fontSize="10" className="fill-muted-foreground">{t}</text>
          </g>
        ))}
        <text x={(W) / 2} y={H - 4} textAnchor="middle" fontSize="10" className="fill-muted-foreground">minutes after bolus</text>
        <text x={12} y={padT + 40} fontSize="10" className="fill-muted-foreground" transform={`rotate(-90 12 ${padT + 40})`}>conc. per mg dose</text>
        {shown.map((r) => (
          <g key={r.id}>
            <path d={path(r.curve, "cp")} stroke={r.colour} strokeWidth="2.2" fill="none" />
            {r.ps.ke0 !== null && (
              <path d={path(r.curve, "ce")} stroke={r.colour} strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
            )}
          </g>
        ))}
        {shown.map((r, i) => (
          <g key={`${r.id}-key`}>
            <line x1={W - 170} y1={padT + 12 + i * 16} x2={W - 145} y2={padT + 12 + i * 16} stroke={r.colour} strokeWidth="2.2" />
            <text x={W - 140} y={padT + 16 + i * 16} fontSize="10" className="fill-muted-foreground">{r.label}</text>
          </g>
        ))}
      </svg>
      <p className="text-[11px] text-muted-foreground mb-4">Solid = plasma (Cp), dashed = effect site (Ce), both per 1 mg of drug given as an instantaneous bolus.</p>

      {/* Parameter table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <caption className="sr-only">Computed pharmacokinetic parameters for the entered patient</caption>
          <thead>
            <tr className="border-b border-border text-foreground">
              <th className="text-left py-2 font-semibold">Model</th>
              <th className="text-left py-2 font-semibold">V1 (L)</th>
              <th className="text-left py-2 font-semibold">V2 / V3 (L)</th>
              <th className="text-left py-2 font-semibold">k10 (min⁻¹)</th>
              <th className="text-left py-2 font-semibold">CL (L·min⁻¹)</th>
              <th className="text-left py-2 font-semibold">ke0 (min⁻¹)</th>
              <th className="text-left py-2 font-semibold">t-peak (min)</th>
              <th className="text-left py-2 font-semibold">Bolus for Cp {target}</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border">
                <td className="py-2 font-medium" style={{ color: r.colour }}>{r.label}<span className="block text-[10px] text-muted-foreground">{r.drug}</span></td>
                <td>{r.ps.V1.toFixed(2)}</td>
                <td>{r.ps.V2.toFixed(1)} / {r.ps.V3.toFixed(0)}</td>
                <td>{r.ps.k10.toFixed(3)}</td>
                <td>{r.clearance.toFixed(2)}</td>
                <td>{r.ps.ke0 !== null ? r.ps.ke0.toFixed(3) : "—"}</td>
                <td>{r.tpeak !== null ? r.tpeak.toFixed(1) : "—"}</td>
                <td>
                  {r.drug === "Remifentanil"
                    ? `${(r.ps.V1 * 4).toFixed(0)} µg for Ce 4 ng·ml⁻¹`
                    : `${(r.ps.V1 * target).toFixed(0)} mg (${(r.ps.V1 * target / patient.weight).toFixed(2)} mg·kg⁻¹)`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label className="block text-xs text-muted-foreground mt-3">
        Propofol target Cp/Ce: <strong className="text-foreground">{target} µg·ml⁻¹</strong>
        <input type="range" min={1} max={8} step={0.5} value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-full mt-1" />
      </label>
      <p className="text-[11px] text-muted-foreground mt-3">
        Paedfusor parameters are only valid for children of 1–16 years, and Schnider's lean-body-mass term (James equation) fails at extremes of body
        habitus — the table will still compute values outside those ranges, so read them as an illustration of model behaviour rather than as a dosing
        recommendation. Always titrate to processed EEG and clinical response.
      </p>
    </DiagramFigure>
  );
};

export default TCIModelComparisonDiagram;
