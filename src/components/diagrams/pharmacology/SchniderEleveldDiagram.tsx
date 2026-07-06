import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface PKParams {
  V1: number; V2: number; V3: number;
  Cl1: number; Cl2: number; Cl3: number;
  k10: number; k12: number; k21: number; k13: number; k31: number;
  ke0: number;
}

// ---- Schnider ----
const schniderParams = (wt: number, age: number, ht: number, sex: "M" | "F"): PKParams => {
  const lbm = sex === "M"
    ? 1.1 * wt - 128 * (wt / ht) ** 2
    : 1.07 * wt - 148 * (wt / ht) ** 2;
  const V1 = 4.27;
  const V2 = 18.9 - 0.391 * (age - 53);
  const V3 = 238;
  const Cl1 = 1.89 + 0.0456 * (wt - 77) - 0.0681 * (lbm - 59) + 0.0264 * (ht - 177);
  const Cl2 = 1.29 - 0.024 * (age - 53);
  const Cl3 = 0.836;
  return {
    V1, V2, V3, Cl1, Cl2, Cl3,
    k10: Cl1 / V1, k12: Cl2 / V1, k21: Cl2 / V2,
    k13: Cl3 / V1, k31: Cl3 / V3,
    ke0: 0.456,
  };
};

// ---- Eleveld (general purpose, simplified for visualisation) ----
// Reference adult: 35y, 70kg, 170cm. Age in years; pma in weeks.
// Based on Eleveld et al. Br J Anaesth 2018 — covariates: weight, age, sex, BMI.
// This is a faithful simplified implementation for teaching, not a TCI-grade port.
const eleveldParams = (wt: number, age: number, ht: number, sex: "M" | "F"): PKParams => {
  const bmi = wt / ((ht / 100) ** 2);
  const pma = age + 40 / 52; // post-menstrual age in years (approx)
  const refBmi = 70 / 1.7 ** 2; // ~24.2

  // Maturation function for clearance (sigmoid Emax)
  const matCl = (pma * 52) ** 9.06 / ((pma * 52) ** 9.06 + 42.3 ** 9.06);
  const matCl_ref = (35 + 40 / 52) ** 9.06 * 52 ** 9.06 / (((35 + 40 / 52) * 52) ** 9.06 + 42.3 ** 9.06);

  // Allometric scaling (3/4 for clearance, 1 for volume)
  const sizeCl = (wt / 70) ** 0.75;
  const sizeV = wt / 70;

  // Fat-free mass (Al-Sallami) — simplified
  const ffm = sex === "M"
    ? (0.88 + (1 - 0.88) / (1 + (age / 13.4) ** -12.7)) * (9270 * wt) / (6680 + 216 * bmi)
    : (1.11 + (1 - 1.11) / (1 + (age / 7.1) ** -1.1)) * (9270 * wt) / (8780 + 244 * bmi);
  const ffmRef = (0.88 + (1 - 0.88) / (1 + (35 / 13.4) ** -12.7)) * (9270 * 70) / (6680 + 216 * refBmi);

  // Reference volumes (population means)
  const V1ref = 6.28;
  const V2ref = 25.5;
  const V3ref = 273;
  const Cl1ref = 1.79; // L/min male; female 2.10 — simplification: use sex-corrected below
  const Cl2ref = 1.75;
  const Cl3ref = 1.11;

  // Apply covariate effects
  const V1 = V1ref * sizeV * Math.exp(-0.0227 * (age - 35));
  const V2 = V2ref * sizeV * Math.exp(-0.0227 * (age - 35));
  const V3 = V3ref * (ffm / ffmRef) * Math.exp(-0.0138 * (age - 35));
  const sexFactor = sex === "F" ? 1.11 : 1.0;
  const Cl1 = Cl1ref * sizeCl * (matCl / matCl_ref) * sexFactor;
  const Cl2 = Cl2ref * sizeCl;
  const Cl3 = Cl3ref * sizeCl;

  // ke0 — Eleveld uses time-to-peak effect approach; reported population mean ~0.146 min⁻¹
  const ke0 = 0.146 * (wt / 70) ** -0.25;

  return {
    V1, V2, V3, Cl1, Cl2, Cl3,
    k10: Cl1 / V1, k12: Cl2 / V1, k21: Cl2 / V2,
    k13: Cl3 / V1, k31: Cl3 / V3,
    ke0,
  };
};

// Simulate 3-comp + Ce
function simulate(p: PKParams, bolus: number, infRateMgMin: number, durMin: number, dt = 0.1) {
  const steps = Math.floor(durMin / dt);
  const A1 = new Float32Array(steps + 1);
  const A2 = new Float32Array(steps + 1);
  const A3 = new Float32Array(steps + 1);
  const Ce = new Float32Array(steps + 1);
  A1[0] = bolus;
  for (let i = 0; i < steps; i++) {
    const c1 = A1[i] / p.V1;
    const dA1 = infRateMgMin - p.k10 * A1[i] - p.k12 * A1[i] + p.k21 * A2[i] - p.k13 * A1[i] + p.k31 * A3[i];
    const dA2 = p.k12 * A1[i] - p.k21 * A2[i];
    const dA3 = p.k13 * A1[i] - p.k31 * A3[i];
    const dCe = p.ke0 * (c1 - Ce[i]);
    A1[i + 1] = A1[i] + dA1 * dt;
    A2[i + 1] = A2[i] + dA2 * dt;
    A3[i + 1] = A3[i] + dA3 * dt;
    Ce[i + 1] = Ce[i] + dCe * dt;
  }
  const Cp = new Float32Array(steps + 1);
  for (let i = 0; i <= steps; i++) Cp[i] = A1[i] / p.V1;
  return { Cp, Ce, dt, steps };
}

export const SchniderEleveldDiagram = () => {
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(50);
  const [height, setHeight] = useState(170);
  const [sex, setSex] = useState<"M" | "F">("M");
  const [bolusMgPerKg, setBolusMgPerKg] = useState(2);
  const [infRate, setInfRate] = useState(8); // mg/kg/h
  const [durationMin] = useState(60);

  const bmi = weight / ((height / 100) ** 2);

  const schnider = useMemo(() => schniderParams(weight, age, height, sex), [weight, age, height, sex]);
  const eleveld = useMemo(() => eleveldParams(weight, age, height, sex), [weight, age, height, sex]);

  const bolus = bolusMgPerKg * weight;
  const infMgMin = (infRate * weight) / 60;

  const simS = useMemo(() => simulate(schnider, bolus, infMgMin, durationMin), [schnider, bolus, infMgMin, durationMin]);
  const simE = useMemo(() => simulate(eleveld, bolus, infMgMin, durationMin), [eleveld, bolus, infMgMin, durationMin]);

  // Plot
  const W = 580, H = 260;
  const pad = { top: 20, right: 20, bottom: 36, left: 46 };
  const pw = W - pad.left - pad.right;
  const ph = H - pad.top - pad.bottom;
  const maxC = 8;
  const xOf = (t: number) => pad.left + (t / durationMin) * pw;
  const yOf = (c: number) => pad.top + ph - Math.min(c, maxC) / maxC * ph;

  const buildPath = (arr: Float32Array, dt: number) => {
    let d = "";
    const stride = Math.max(1, Math.floor(arr.length / 250));
    for (let i = 0; i < arr.length; i += stride) {
      d += `${i === 0 ? "M" : "L"}${xOf(i * dt).toFixed(1)} ${yOf(arr[i]).toFixed(1)} `;
    }
    return d;
  };

  // Validity flags
  const schniderValid = age >= 17 && age <= 90 && bmi >= 16 && bmi <= 35;
  const eleveldValid = age >= 0 && age <= 88 && bmi >= 12 && bmi <= 52;

  // Schnider becomes mathematically unstable at BMI extremes due to LBM (James) breakdown
  const lbm = sex === "M" ? 1.1 * weight - 128 * (weight / height) ** 2 : 1.07 * weight - 148 * (weight / height) ** 2;
  const schniderLBMBreakdown = lbm <= 0;

  return (
    <DiagramFigure
      id="schnider-eleveld-diagram"
      title="Schnider eleveld"
      description="Auto-generated wrapper for the Schnider eleveld anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="w-full max-w-4xl mx-auto space-y-4">
        {/* Validity badges */}
        <div className="flex flex-wrap gap-2">
          <div className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${schniderValid && !schniderLBMBreakdown ? "border-pharmacology/40 bg-pharmacology/5 text-pharmacology" : "border-[hsl(0_70%_50%)]/40 bg-[hsl(0_70%_50%)]/5 text-[hsl(0_70%_50%)]"}`}>
            Schnider: {schniderLBMBreakdown ? "LBM breakdown (BMI too high)" : schniderValid ? "Within validation range" : "Outside validation (17–90 yr, BMI 16–35)"}
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${eleveldValid ? "border-pharmacology/40 bg-pharmacology/5 text-pharmacology" : "border-[hsl(0_70%_50%)]/40 bg-[hsl(0_70%_50%)]/5 text-[hsl(0_70%_50%)]"}`}>
            Eleveld: {eleveldValid ? "Within validation range (neonate–88 yr, BMI 12–52)" : "Outside validation"}
          </div>
        </div>
  
        {/* Plot */}
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-xs font-medium text-foreground mb-2">Plasma & Effect-Site Concentration vs Time</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {[0, 2, 4, 6, 8].map((c) => (
              <g key={c}>
                <line x1={pad.left} y1={yOf(c)} x2={W - pad.right} y2={yOf(c)} stroke="hsl(210 20% 90%)" />
                <text x={pad.left - 6} y={yOf(c) + 3} textAnchor="end" fontSize="10" className="fill-muted-foreground">{c}</text>
              </g>
            ))}
            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <g key={f}>
                <line x1={pad.left + f * pw} y1={pad.top} x2={pad.left + f * pw} y2={pad.top + ph} stroke="hsl(210 20% 95%)" />
                <text x={pad.left + f * pw} y={pad.top + ph + 14} textAnchor="middle" fontSize="10" className="fill-muted-foreground">{Math.round(f * durationMin)}</text>
              </g>
            ))}
            <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + ph} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
            <line x1={pad.left} y1={pad.top + ph} x2={W - pad.right} y2={pad.top + ph} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
            <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" className="fill-foreground">Time (min)</text>
            <text x={12} y={H / 2} textAnchor="middle" transform={`rotate(-90 12 ${H / 2})`} fontSize="10" className="fill-foreground">μg/mL</text>
  
            {/* therapeutic window */}
            <rect x={pad.left} y={yOf(6)} width={pw} height={yOf(2) - yOf(6)} fill="hsl(170 50% 40%)" opacity="0.05" />
  
            {/* Schnider */}
            {!schniderLBMBreakdown && (
              <>
                <path d={buildPath(simS.Cp, simS.dt)} fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />
                <path d={buildPath(simS.Ce, simS.dt)} fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" strokeDasharray="4 3" opacity="0.85" />
              </>
            )}
            {/* Eleveld */}
            <path d={buildPath(simE.Cp, simE.dt)} fill="none" stroke="hsl(220 70% 50%)" strokeWidth="2" />
            <path d={buildPath(simE.Ce, simE.dt)} fill="none" stroke="hsl(220 70% 50%)" strokeWidth="2" strokeDasharray="4 3" opacity="0.85" />
          </svg>
          <div className="flex flex-wrap gap-3 text-[11px] mt-1">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(0_70%_50%)]" /> Schnider Cp</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0 border-t border-dashed border-[hsl(0_70%_50%)]" /> Schnider Ce</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(220_70%_50%)]" /> Eleveld Cp</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0 border-t border-dashed border-[hsl(220_70%_50%)]" /> Eleveld Ce</span>
          </div>
        </div>
  
        {/* Parameter comparison table */}
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-xs font-medium text-foreground mb-2">Model parameters (this patient — wt {weight} kg, age {age} y, ht {height} cm, BMI {bmi.toFixed(1)})</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1 px-2 text-foreground">Parameter</th>
                  <th className="text-right py-1 px-2 text-[hsl(0_70%_50%)]">Schnider</th>
                  <th className="text-right py-1 px-2 text-[hsl(220_70%_50%)]">Eleveld</th>
                  <th className="text-left py-1 px-2 text-muted-foreground hidden sm:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1 px-2 text-foreground">V1 (L)</td>
                  <td className="py-1 px-2 text-right text-foreground">{schnider.V1.toFixed(2)}</td>
                  <td className="py-1 px-2 text-right text-foreground">{eleveld.V1.toFixed(2)}</td>
                  <td className="py-1 px-2 text-muted-foreground hidden sm:table-cell">Schnider fixed; Eleveld scales with weight & age</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1 px-2 text-foreground">V2 (L)</td>
                  <td className="py-1 px-2 text-right text-foreground">{schnider.V2.toFixed(1)}</td>
                  <td className="py-1 px-2 text-right text-foreground">{eleveld.V2.toFixed(1)}</td>
                  <td className="py-1 px-2 text-muted-foreground hidden sm:table-cell">Both decrease with age</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1 px-2 text-foreground">V3 (L)</td>
                  <td className="py-1 px-2 text-right text-foreground">{schnider.V3.toFixed(0)}</td>
                  <td className="py-1 px-2 text-right text-foreground">{eleveld.V3.toFixed(0)}</td>
                  <td className="py-1 px-2 text-muted-foreground hidden sm:table-cell">Eleveld uses FFM (Al-Sallami)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1 px-2 text-foreground">Cl1 (L/min)</td>
                  <td className="py-1 px-2 text-right text-foreground">{schnider.Cl1.toFixed(2)}</td>
                  <td className="py-1 px-2 text-right text-foreground">{eleveld.Cl1.toFixed(2)}</td>
                  <td className="py-1 px-2 text-muted-foreground hidden sm:table-cell">Eleveld: allometric ¾ + maturation + sex (♀ +11%)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1 px-2 text-foreground">k10 (min⁻¹)</td>
                  <td className="py-1 px-2 text-right text-foreground">{schnider.k10.toFixed(3)}</td>
                  <td className="py-1 px-2 text-right text-foreground">{eleveld.k10.toFixed(3)}</td>
                  <td className="py-1 px-2 text-muted-foreground hidden sm:table-cell">Elimination rate constant</td>
                </tr>
                <tr>
                  <td className="py-1 px-2 text-foreground">ke0 (min⁻¹)</td>
                  <td className="py-1 px-2 text-right text-foreground">{schnider.ke0.toFixed(3)}</td>
                  <td className="py-1 px-2 text-right text-foreground">{eleveld.ke0.toFixed(3)}</td>
                  <td className="py-1 px-2 text-muted-foreground hidden sm:table-cell">Schnider faster equilibration; Eleveld TTPE-derived</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Patient + dose controls */}
        <div className="grid sm:grid-cols-2 gap-3 bg-card rounded-lg border border-border p-4">
          <div>
            <label className="text-xs font-medium text-foreground flex justify-between"><span>Weight</span><span>{weight} kg</span></label>
            <Slider value={[weight]} min={3} max={180} step={1} onValueChange={(v) => setWeight(v[0])} className="mt-2" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground flex justify-between"><span>Age</span><span>{age} yr</span></label>
            <Slider value={[age]} min={1} max={95} step={1} onValueChange={(v) => setAge(v[0])} className="mt-2" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground flex justify-between"><span>Height</span><span>{height} cm</span></label>
            <Slider value={[height]} min={50} max={210} step={1} onValueChange={(v) => setHeight(v[0])} className="mt-2" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground flex justify-between"><span>BMI</span><span className={bmi > 35 || bmi < 16 ? "text-[hsl(25_85%_50%)] font-semibold" : ""}>{bmi.toFixed(1)}</span></label>
            <div className="h-2 mt-3 rounded-full bg-secondary relative overflow-hidden">
              <div className="absolute h-full bg-pharmacology/40" style={{ width: `${Math.min(100, (bmi / 50) * 100)}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">Sex:</span>
            <button onClick={() => setSex("M")} className={`px-3 py-1 rounded text-xs border ${sex === "M" ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"}`}>Male</button>
            <button onClick={() => setSex("F")} className={`px-3 py-1 rounded text-xs border ${sex === "F" ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"}`}>Female</button>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground flex justify-between"><span>Bolus</span><span>{bolusMgPerKg.toFixed(1)} mg/kg</span></label>
            <Slider value={[bolusMgPerKg]} min={0} max={3} step={0.1} onValueChange={(v) => setBolusMgPerKg(v[0])} className="mt-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-foreground flex justify-between"><span>Maintenance infusion</span><span>{infRate.toFixed(1)} mg/kg/h</span></label>
            <Slider value={[infRate]} min={0} max={15} step={0.5} onValueChange={(v) => setInfRate(v[0])} className="mt-2" />
          </div>
        </div>
  
        {/* Quick-pick patient profiles */}
        <div className="bg-secondary/30 rounded-lg border border-border p-3">
          <p className="text-xs font-medium text-foreground mb-2">Quick patient profiles — see how the models diverge:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Child (8 yr, 28 kg)", wt: 28, age: 8, ht: 130, sex: "M" as const },
              { label: "Healthy adult (35 yr, 70 kg)", wt: 70, age: 35, ht: 175, sex: "M" as const },
              { label: "Elderly (82 yr, 60 kg)", wt: 60, age: 82, ht: 162, sex: "F" as const },
              { label: "Morbidly obese (45 yr, 140 kg)", wt: 140, age: 45, ht: 170, sex: "M" as const },
              { label: "Neonate (1 yr, 10 kg)", wt: 10, age: 1, ht: 75, sex: "F" as const },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => { setWeight(p.wt); setAge(p.age); setHeight(p.ht); setSex(p.sex); }}
                className="px-2.5 py-1 text-xs rounded border border-border bg-background hover:bg-pharmacology/10 hover:border-pharmacology hover:text-pharmacology transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
  
        <div className="bg-secondary/30 rounded-lg border border-border p-4 text-xs text-foreground space-y-2">
          <p><strong>Schnider (1998):</strong> derived in healthy adult volunteers (25–81 yr, BMI 16–35). Fixed V1 (4.27 L) gives high initial plasma peaks. Performs poorly in children, neonates, and patients with BMI &gt; 35 — the LBM (James) equation breaks down at high BMI and can return implausible or negative values.</p>
          <p><strong>Eleveld (2018):</strong> a single general-purpose propofol model developed from a pooled database of &gt;1,000 subjects spanning <em>neonates to elderly</em> and <em>BMI 12–52</em>. It uses allometric scaling (3/4 power for clearance), a maturation function for organ function, fat-free mass (Al-Sallami), and explicit sex covariate. ke0 derived from time-to-peak-effect rather than fitted to EEG.</p>
          <p><strong>Why it matters:</strong> at the extremes of size and age — children, the very elderly, and the morbidly obese — Schnider and Marsh systematically over- or under-predict. Eleveld is now the recommended default in most modern TCI pumps because one model handles the entire population. Try the "Morbidly obese" and "Child" profiles above to see how the curves diverge.</p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SchniderEleveldDiagram;
