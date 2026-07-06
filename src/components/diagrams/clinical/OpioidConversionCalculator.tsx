import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Opioid Conversion Calculator with OMEDD output and incomplete cross-tolerance reduction.
 *
 * Conversions are expressed as the multiplier to convert ONE mg/µg of the source opioid
 * (by the listed route) into mg of ORAL morphine (OMEDD). Rotation back from OMEDD to a
 * target opioid uses 1 / targetFactor with a manual 25–50% safety reduction applied.
 *
 * Sources: FPM "Opioids Aware" dose conversion guide; Palliative Care Formulary (PCF7);
 * Twycross R. Symptom Management in Advanced Cancer; eviQ palliative care equianalgesia.
 * Methadone is intentionally excluded from automated rotation — specialist supervision required.
 */

type RouteKey = "oral" | "sc" | "iv" | "im" | "td" | "buccal";

interface OpioidOption {
  key: string;
  label: string;
  route: RouteKey;
  unit: "mg" | "µg";
  /** mg of oral morphine equivalent per 1 unit of this preparation (per dose, not per day) */
  toOMEDDperUnit: number;
  /** Optional dosing helper text */
  hint?: string;
  warn?: string;
}

const SOURCES: OpioidOption[] = [
  { key: "morphine-oral", label: "Morphine — oral", route: "oral", unit: "mg", toOMEDDperUnit: 1 },
  { key: "morphine-sc", label: "Morphine — SC/IV", route: "sc", unit: "mg", toOMEDDperUnit: 2, hint: "Parenteral morphine ≈ 2× oral potency" },
  { key: "oxycodone-oral", label: "Oxycodone — oral", route: "oral", unit: "mg", toOMEDDperUnit: 1.5 },
  { key: "oxycodone-sc", label: "Oxycodone — SC/IV", route: "sc", unit: "mg", toOMEDDperUnit: 3 },
  { key: "hydromorphone-oral", label: "Hydromorphone — oral", route: "oral", unit: "mg", toOMEDDperUnit: 5, hint: "PCF7 conversion 5:1" },
  { key: "hydromorphone-sc", label: "Hydromorphone — SC/IV", route: "sc", unit: "mg", toOMEDDperUnit: 10 },
  { key: "diamorphine-sc", label: "Diamorphine — SC/IV", route: "sc", unit: "mg", toOMEDDperUnit: 3, hint: "UK syringe-driver standard" },
  { key: "codeine-oral", label: "Codeine — oral", route: "oral", unit: "mg", toOMEDDperUnit: 0.1, hint: "10:1; ~10% are CYP2D6 ultra-rapid metabolisers" },
  { key: "tramadol-oral", label: "Tramadol — oral", route: "oral", unit: "mg", toOMEDDperUnit: 0.1, hint: "10:1 (also SNRI activity)" },
  { key: "tapentadol-oral", label: "Tapentadol — oral", route: "oral", unit: "mg", toOMEDDperUnit: 0.4, hint: "~2.5:1 to oral morphine" },
  { key: "dihydrocodeine-oral", label: "Dihydrocodeine — oral", route: "oral", unit: "mg", toOMEDDperUnit: 0.1 },
  { key: "buprenorphine-td", label: "Buprenorphine — TD patch (µg/h)", route: "td", unit: "µg", toOMEDDperUnit: 1.92, hint: "5 µg/h ≈ 12 mg OMEDD/24 h (×24/100×0.8)" },
  { key: "fentanyl-td", label: "Fentanyl — TD patch (µg/h)", route: "td", unit: "µg", toOMEDDperUnit: 2.4, hint: "25 µg/h ≈ 60 mg OMEDD/24 h" },
  { key: "fentanyl-iv", label: "Fentanyl — IV (per µg)", route: "iv", unit: "µg", toOMEDDperUnit: 0.01, hint: "100 µg IV ≈ 10 mg PO morphine" },
];

// Targets you can rotate TO (excludes codeine/tramadol/dihydrocodeine — rarely a rotation choice)
const TARGETS: OpioidOption[] = SOURCES.filter((s) =>
  ["morphine-oral", "morphine-sc", "oxycodone-oral", "oxycodone-sc", "hydromorphone-oral", "hydromorphone-sc", "diamorphine-sc", "buprenorphine-td", "fentanyl-td", "tapentadol-oral"].includes(s.key),
);

const ROUTE_LABEL: Record<RouteKey, string> = {
  oral: "PO",
  sc: "SC",
  iv: "IV",
  im: "IM",
  td: "TD",
  buccal: "buccal/SL",
};

const round = (n: number, dp = 1) => {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
};

const OpioidConversionCalculator = () => {
  const [sourceKey, setSourceKey] = useState<string>("oxycodone-oral");
  const [doseValue, setDoseValue] = useState<number>(20);
  const [dosesPerDay, setDosesPerDay] = useState<number>(2);
  const [targetKey, setTargetKey] = useState<string>("morphine-oral");
  const [reductionPct, setReductionPct] = useState<number>(33);
  const [highRisk, setHighRisk] = useState<boolean>(false);

  const source = SOURCES.find((s) => s.key === sourceKey)!;
  const target = TARGETS.find((t) => t.key === targetKey)!;

  // For TD patches, "doses per day" is irrelevant — patch delivers continuously.
  const isSourceTD = source.route === "td";
  const isTargetTD = target.route === "td";

  // 24-hour OMEDD
  const omedd = useMemo(() => {
    if (isSourceTD) {
      // TD patches: dose is µg/h, factor pre-encodes ×24
      return doseValue * source.toOMEDDperUnit;
    }
    return doseValue * dosesPerDay * source.toOMEDDperUnit;
  }, [doseValue, dosesPerDay, source, isSourceTD]);

  // Auto-suggest reduction if high risk
  const effectiveReduction = highRisk ? Math.max(reductionPct, 50) : reductionPct;

  // Rotate to target — 24-h dose of target unit
  const target24hRaw = omedd / target.toOMEDDperUnit;
  const target24h = target24hRaw * (1 - effectiveReduction / 100);

  // Per-dose suggestions
  const targetPerDose = isTargetTD ? target24h / 24 : target24h / Math.max(1, dosesPerDay);
  const rescueDose = (target24h / 6); // 1/6 of new 24-h dose
  const rescueOMEDD = omedd / 6;

  const omeddBand = omedd < 60 ? "low" : omedd < 200 ? "moderate" : omedd < 400 ? "high" : "very-high";
  const bandColor =
    omeddBand === "low" ? "hsl(142 60% 40%)" : omeddBand === "moderate" ? "hsl(35 90% 45%)" : omeddBand === "high" ? "hsl(15 80% 50%)" : "hsl(0 80% 50%)";
  const bandLabel = omeddBand === "low" ? "Low (<60)" : omeddBand === "moderate" ? "Moderate (60–200)" : omeddBand === "high" ? "High (200–400)" : "Very high (>400)";

  // Round target sensibly
  const formatTarget = (v: number) => {
    if (isTargetTD) {
      // Snap to nearest available patch strength
      const fentanylStrengths = [12, 25, 37.5, 50, 75, 100];
      const bupStrengths = [5, 10, 15, 20, 35, 52.5, 70];
      const set = target.key === "fentanyl-td" ? fentanylStrengths : bupStrengths;
      const snap = set.reduce((p, c) => (Math.abs(c - v) < Math.abs(p - v) ? c : p), set[0]);
      return `≈ ${round(v, 1)} µg/h → nearest patch ${snap} µg/h`;
    }
    if (target.unit === "µg") return `${round(v, 0)} µg`;
    if (v >= 10) return `${round(v, 0)} mg`;
    return `${round(v, 1)} mg`;
  };

  return (
    <DiagramFigure
      id="opioid-conversion-calculator"
      title="Opioid conversion"
      description="Auto-generated wrapper for the Opioid conversion interactive calculator. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">Opioid Conversion Calculator (OMEDD)</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Calculates 24-h Oral Morphine Equivalent Daily Dose and converts to a target opioid with automatic
            25–50% incomplete cross-tolerance reduction. Cross-check against FPM "Opioids Aware" before prescribing.
          </p>
        </div>
  
        {/* Inputs */}
        <div className="grid lg:grid-cols-2 gap-3 mb-4">
          {/* SOURCE */}
          <div className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Current opioid</p>
            <select
              value={sourceKey}
              onChange={(e) => setSourceKey(e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm"
            >
              {SOURCES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
  
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-foreground">
                  {isSourceTD ? "Patch strength (µg/h)" : `Dose per administration (${source.unit})`}
                </label>
                <input
                  type="number"
                  min={0}
                  step={isSourceTD ? 1 : source.unit === "µg" ? 5 : 0.5}
                  value={doseValue}
                  onChange={(e) => setDoseValue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full mt-0.5 px-2 py-1 rounded border border-border bg-background text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-foreground">
                  {isSourceTD ? "Patch (continuous)" : "Doses per 24 h"}
                </label>
                <input
                  type="number"
                  min={1}
                  max={24}
                  step={1}
                  disabled={isSourceTD}
                  value={isSourceTD ? 1 : dosesPerDay}
                  onChange={(e) => setDosesPerDay(Math.max(1, Math.min(24, Number(e.target.value) || 1)))}
                  className="w-full mt-0.5 px-2 py-1 rounded border border-border bg-background text-sm font-mono disabled:opacity-50"
                />
              </div>
            </div>
            {source.hint && (
              <p className="text-[10px] text-muted-foreground italic">{source.hint}</p>
            )}
            <p className="text-[10px] text-muted-foreground">
              Route: <span className="font-mono">{ROUTE_LABEL[source.route]}</span> · OMEDD factor:{" "}
              <span className="font-mono">×{source.toOMEDDperUnit}</span>
              {isSourceTD && <> per µg/h per 24 h</>}
            </p>
          </div>
  
          {/* TARGET */}
          <div className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Rotate to</p>
            <select
              value={targetKey}
              onChange={(e) => setTargetKey(e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm"
            >
              {TARGETS.map((t) => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
            </select>
  
            <div>
              <label className="text-[11px] font-semibold text-foreground flex items-center justify-between">
                <span>Cross-tolerance reduction</span>
                <span className="font-mono text-primary">−{effectiveReduction}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={reductionPct}
                onChange={(e) => setReductionPct(Number(e.target.value))}
                disabled={highRisk}
                className="w-full mt-0.5 accent-primary disabled:opacity-50"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>0% (none)</span>
                <span>25% (standard)</span>
                <span>50% (high-risk)</span>
              </div>
            </div>
  
            <label className="flex items-start gap-2 text-[11px] text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={highRisk}
                onChange={(e) => setHighRisk(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <span>
                <strong>High-risk patient</strong> — elderly/frail, renal or hepatic impairment, OMEDD &gt;200 mg, or rotation to/from
                methadone/fentanyl. Forces ≥50% reduction.
              </span>
            </label>
          </div>
        </div>
  
        {/* OMEDD output */}
        <div className="p-3 rounded-lg border border-border bg-background mb-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">24-hour OMEDD</p>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: `${bandColor}22`, color: bandColor, border: `1px solid ${bandColor}55` }}
            >
              {bandLabel} mg/24 h
            </span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">
            {round(omedd, omedd < 10 ? 1 : 0)} <span className="text-sm font-normal text-muted-foreground">mg oral morphine / 24 h</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Calculation:{" "}
            {isSourceTD
              ? `${doseValue} µg/h × ${source.toOMEDDperUnit} = ${round(omedd)} mg/24 h`
              : `${doseValue} ${source.unit} × ${dosesPerDay}/day × ${source.toOMEDDperUnit} = ${round(omedd)} mg/24 h`}
          </p>
          {omedd > 120 && (
            <p className="text-[11px] text-destructive mt-1.5">
              ⚠ OMEDD &gt;120 mg/day — FPM advises specialist review; benefit unlikely above this threshold in chronic non-cancer pain.
            </p>
          )}
        </div>
  
        {/* Rotation output */}
        <div className="p-3 rounded-lg border-2 border-primary/30 bg-primary/5">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
            Suggested {target.label} dose
          </p>
  
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground uppercase">Equianalgesic 24 h</p>
              <p className="font-mono text-base font-semibold text-muted-foreground line-through">
                {formatTarget(target24hRaw)}
              </p>
            </div>
            <div className="p-2 rounded bg-background border-2 border-primary">
              <p className="text-[10px] text-primary uppercase font-semibold">After −{effectiveReduction}% reduction</p>
              <p className="font-mono text-base font-bold text-primary">
                {formatTarget(target24h)} / 24 h
              </p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground uppercase">Per dose ({isTargetTD ? "per h" : `÷${dosesPerDay}`})</p>
              <p className="font-mono text-base font-semibold text-foreground">
                {isTargetTD ? `${round(target24h / 24, 1)} µg/h` : formatTarget(targetPerDose)}
              </p>
            </div>
          </div>
  
          <div className="mt-3 grid sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground uppercase">Breakthrough rescue (1/6 of new 24 h)</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {formatTarget(rescueDose)} PRN, max 4-hourly
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Equivalent to ~{round(rescueOMEDD, 1)} mg oral morphine PRN
              </p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground uppercase">Titration plan</p>
              <p className="text-xs text-foreground">
                Review at 24–48 h. If &gt;3–4 rescues/day: ↑ background by ~30–50%. Always co-prescribe a stimulant
                laxative & PRN antiemetic for the first 5–7 days.
              </p>
            </div>
          </div>
        </div>
  
        {/* Caveats */}
        <div className="mt-3 grid sm:grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded bg-destructive/5 border border-destructive/20 text-muted-foreground">
            <strong className="text-foreground">Methadone:</strong> not included — uses a <em>variable</em> ratio (4:1 if OMEDD &lt;100,
            up to 12–20:1 if &gt;1000) plus an unpredictable half-life and QTc effects. <strong>Specialist palliative care only</strong>,
            usually inpatient.
          </div>
          <div className="p-2.5 rounded bg-destructive/5 border border-destructive/20 text-muted-foreground">
            <strong className="text-foreground">Fentanyl & buprenorphine patches</strong> reach steady state at ~12–24 h — overlap
            with the previous opioid (oral morphine for the first 12 h after first patch; remove other patch &amp; allow 12-h washout).
            Patches are <strong>not for opioid-naive</strong> patients or unstable pain.
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default OpioidConversionCalculator;
