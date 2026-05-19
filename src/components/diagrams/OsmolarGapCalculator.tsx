import { useState, useMemo } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";
import { RotateCcw } from "lucide-react";

/**
 * Osmolar Gap Calculator
 *
 * Inputs: Na⁺, urea, glucose, measured osmolality, and optional toxic
 * alcohol / ethanol levels — each with unit selection. Outputs the
 * calculated osmolarity, osmolar gap, and an interpretation panel that
 * cross-checks with the anion gap when given.
 *
 * Units handled:
 *   Na⁺                  mmol/L (single unit)
 *   Urea                 mmol/L  ↔ mg/dL (BUN)       BUN mg/dL × 0.357 = mmol/L
 *   Glucose              mmol/L  ↔ mg/dL              mg/dL ÷ 18 = mmol/L
 *   Ethanol/methanol/EG  mg/dL    →  mOsm/kg          (mg/dL ÷ MW) × 10
 *
 * All numeric inputs are bounded — clamped to physiological/toxicological
 * ranges before use to prevent absurd outputs from typos.
 */

type UreaUnit = "mmol/L" | "mg/dL (BUN)";
type GlucoseUnit = "mmol/L" | "mg/dL";

interface Field {
  label: string;
  value: string;
  set: (v: string) => void;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  placeholder?: string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const parseNum = (s: string, lo: number, hi: number): number | null => {
  if (s.trim() === "") return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return clamp(n, lo, hi);
};

const NumInput = ({ label, value, set, unit, min, max, step = 0.1, placeholder }: Field) => (
  <label className="block">
    <span className="text-xs font-medium text-foreground">{label}{unit ? <span className="text-muted-foreground"> ({unit})</span> : null}</span>
    <input
      type="number"
      inputMode="decimal"
      value={value}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      onChange={(e) => set(e.target.value.slice(0, 8))}
      className="mt-1 w-full px-2 py-1.5 text-sm rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </label>
);

const OsmolarGapCalculator = () => {
  // Inputs
  const [na, setNa] = useState("140");
  const [ureaUnit, setUreaUnit] = useState<UreaUnit>("mmol/L");
  const [urea, setUrea] = useState("5");
  const [gluUnit, setGluUnit] = useState<GlucoseUnit>("mmol/L");
  const [glucose, setGlucose] = useState("5");
  const [ethanol, setEthanol] = useState(""); // mg/dL
  const [measured, setMeasured] = useState("295");
  const [ag, setAg] = useState(""); // optional, mEq/L

  const reset = () => {
    setNa("140"); setUreaUnit("mmol/L"); setUrea("5");
    setGluUnit("mmol/L"); setGlucose("5"); setEthanol("");
    setMeasured("295"); setAg("");
  };

  const result = useMemo(() => {
    const naV = parseNum(na, 100, 200);
    const ureaRaw = parseNum(urea, 0, 200);
    const gluRaw = parseNum(glucose, 0, 200);
    const ethRaw = parseNum(ethanol, 0, 600);
    const measV = parseNum(measured, 200, 450);
    const agV = parseNum(ag, 0, 60);

    if (naV === null || ureaRaw === null || gluRaw === null) return null;

    // Convert to mmol/L
    const ureaMmol = ureaUnit === "mg/dL (BUN)" ? ureaRaw * 0.357 : ureaRaw;
    const gluMmol = gluUnit === "mg/dL" ? gluRaw / 18 : gluRaw;
    const ethMOsm = ethRaw !== null ? (ethRaw / 46) * 10 : 0; // ethanol MW 46

    const calc = 2 * naV + ureaMmol + gluMmol + ethMOsm;
    const gap = measV !== null ? measV - calc : null;

    let interpretation = "";
    let tone: "ok" | "warn" | "alarm" = "ok";
    if (gap === null) {
      interpretation = "Enter a measured osmolality to compute the gap.";
    } else if (gap < 10) {
      tone = "ok";
      interpretation = "Normal osmolar gap (< 10 mOsm/kg). Toxic alcohols unlikely if presentation is early; remember a late presentation may have a normal gap with a high AG.";
    } else if (gap < 25) {
      tone = "warn";
      interpretation = "Mildly raised osmolar gap. Consider ethanol, mannitol, propylene glycol (lorazepam/diazepam infusions), severe lactic/ketoacidosis, or pseudohyponatraemia.";
    } else {
      tone = "alarm";
      interpretation = "Markedly raised osmolar gap. Strongly suspect toxic alcohol ingestion (methanol, ethylene glycol, diethylene glycol). Send levels, start fomepizole empirically and consider RRT.";
    }

    let combo = "";
    if (gap !== null && agV !== null) {
      if (gap > 10 && agV > 14) combo = "↑ osmolar gap + ↑ anion gap → toxic alcohol with metabolism underway (formate / glycolate / oxalate).";
      else if (gap > 10 && agV <= 14) combo = "↑ osmolar gap, normal AG → early toxic alcohol ingestion before ADH metabolism, or osmotic agent (mannitol, propylene glycol).";
      else if (gap <= 10 && agV > 14) combo = "Normal osmolar gap + ↑ AG → late toxic alcohol presentation (parent metabolised) OR another HAGMA cause (lactate, ketones, uraemia, salicylate).";
      else combo = "Both gaps normal — toxic alcohol very unlikely.";
    }

    return { naV, ureaMmol, gluMmol, ethMOsm, calc, gap, interpretation, tone, combo };
  }, [na, urea, ureaUnit, glucose, gluUnit, ethanol, measured, ag]);

  const toneClass =
    result?.tone === "alarm" ? "border-destructive/40 bg-destructive/5"
    : result?.tone === "warn" ? "border-yellow-500/40 bg-yellow-500/5"
    : "border-primary/30 bg-primary/5";

  return (
    <DiagramFigure
      id="osmolar-gap-calculator"
      title="Osmolar Gap Calculator"
      description="Interactive calculator for serum osmolar gap with unit handling for sodium, urea, glucose, and ethanol; cross-checks against the anion gap to interpret the toxic-alcohol time course."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-serif font-bold text-foreground">Osmolar gap calculator</h3>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border border-border hover:bg-secondary transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <NumInput label="Na⁺" value={na} set={setNa} unit="mmol/L" min={100} max={200} step={1} />

          <div>
            <NumInput label="Urea" value={urea} set={setUrea} unit={ureaUnit} min={0} max={200} step={0.1} />
            <div className="mt-1 inline-flex rounded border border-border overflow-hidden text-[10px] w-full">
              {(["mmol/L", "mg/dL (BUN)"] as UreaUnit[]).map((u) => (
                <button key={u} onClick={() => setUreaUnit(u)}
                  className={`flex-1 px-1 py-0.5 transition-colors ${ureaUnit === u ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <NumInput label="Glucose" value={glucose} set={setGlucose} unit={gluUnit} min={0} max={200} step={0.1} />
            <div className="mt-1 inline-flex rounded border border-border overflow-hidden text-[10px] w-full">
              {(["mmol/L", "mg/dL"] as GlucoseUnit[]).map((u) => (
                <button key={u} onClick={() => setGluUnit(u)}
                  className={`flex-1 px-1 py-0.5 transition-colors ${gluUnit === u ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>

          <NumInput label="Ethanol (if known)" value={ethanol} set={setEthanol} unit="mg/dL" min={0} max={600} step={1} placeholder="optional" />
          <NumInput label="Measured osmolality" value={measured} set={setMeasured} unit="mOsm/kg" min={200} max={450} step={1} />
          <NumInput label="Anion gap (optional)" value={ag} set={setAg} unit="mEq/L" min={0} max={60} step={1} placeholder="optional" />
        </div>

        {result && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
              <div className="p-2 rounded border border-border bg-secondary/30">
                <p className="text-muted-foreground">Calculated</p>
                <p className="font-mono font-semibold text-foreground">{result.calc.toFixed(1)} mOsm/kg</p>
              </div>
              <div className="p-2 rounded border border-border bg-secondary/30">
                <p className="text-muted-foreground">Measured</p>
                <p className="font-mono font-semibold text-foreground">{measured || "—"} mOsm/kg</p>
              </div>
              <div className="p-2 rounded border border-primary/40 bg-primary/5 col-span-2">
                <p className="text-muted-foreground">Osmolar gap</p>
                <p className="font-mono font-bold text-lg text-primary">
                  {result.gap !== null ? `${result.gap.toFixed(1)} mOsm/kg` : "—"}
                </p>
              </div>
            </div>

            <details className="text-xs text-muted-foreground mb-3">
              <summary className="cursor-pointer text-foreground font-medium">Show working</summary>
              <pre className="mt-2 p-2 rounded bg-secondary/30 overflow-x-auto text-[11px] leading-snug whitespace-pre-wrap">
{`2 × Na⁺ = 2 × ${result.naV} = ${(2 * result.naV).toFixed(1)}
+ urea  = ${result.ureaMmol.toFixed(2)} mmol/L
+ glucose = ${result.gluMmol.toFixed(2)} mmol/L
${result.ethMOsm > 0 ? `+ ethanol contribution = ${result.ethMOsm.toFixed(1)} mOsm/kg\n` : ""}= ${result.calc.toFixed(1)} mOsm/kg (calculated)
Gap = measured − calculated`}
              </pre>
            </details>

            <div className={`p-3 rounded-md border animate-fade-in ${toneClass}`} key={result.tone + (result.gap ?? "")}>
              <p className="text-sm text-foreground">{result.interpretation}</p>
              {result.combo && <p className="text-xs text-foreground mt-2"><strong>+ AG:</strong> {result.combo}</p>}
            </div>
          </>
        )}

        <details className="mt-3 text-xs">
          <summary className="cursor-pointer text-foreground font-medium">Worked example — suspected methanol</summary>
          <div className="mt-2 p-3 rounded border border-border bg-secondary/30 text-muted-foreground space-y-1">
            <p>A 42-year-old presents 4 h after ingesting an unknown alcohol. Na⁺ 140, urea 5, glucose 5, ethanol 0; measured osmolality 332; AG 14.</p>
            <p>Calculated = 2(140) + 5 + 5 = 290. Gap = 332 − 290 = <strong>42 mOsm/kg</strong>.</p>
            <p>AG only marginally raised, osmolar gap markedly raised → <strong>early toxic alcohol ingestion</strong>, parent still unmetabolised. Send methanol/ethylene glycol levels, give <strong>fomepizole 15 mg/kg IV</strong> empirically, consider haemodialysis (especially if methanol &gt; 50 mg/dL, ethylene glycol &gt; 50 mg/dL, AKI, visual symptoms, or severe acidosis).</p>
          </div>
        </details>
      </div>
    </DiagramFigure>
  );
};

export default OsmolarGapCalculator;
