import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

/**
 * Interactive CT dose explorer.
 *
 * The user adjusts acquisition parameters (kVp, mAs, rotation time, pitch,
 * scan length, number of phases, patient diameter, body region). The component
 * computes simplified but realistic estimates of:
 *
 *   • CTDI_vol  (mGy)        — single-rotation phantom dose
 *   • DLP       (mGy·cm)     — CTDI_vol × scan length × phases
 *   • SSDE      (mGy)        — CTDI_vol × size-specific conversion factor
 *   • Effective dose (mSv)   — DLP × region-specific k
 *
 * Each output card cross-links back to the matching anchors in the parent
 * topic (#ctdi-vol, #dlp, #ssde, #effective-dose-ct).
 *
 * The maths is intentionally simplified — the goal is pedagogic visualisation
 * of *how each lever affects each metric*, not bedside dosimetry. Values are
 * within the right order of magnitude for typical adult MDCT.
 */

type Region = "head" | "neck" | "chest" | "abdomen" | "pelvis";

interface Preset {
  label: string;
  region: Region;
  kvp: number;
  mas: number; // effective mAs (mA × rotation / pitch)
  rotation: number; // s
  pitch: number;
  scanLength: number; // cm
  phases: number;
  diameter: number; // cm — effective patient diameter
}

const PRESETS: Preset[] = [
  {
    label: "Head CT (routine)",
    region: "head",
    kvp: 120,
    mas: 250,
    rotation: 1.0,
    pitch: 0.55,
    scanLength: 16,
    phases: 1,
    diameter: 17, // adult head ≈ 16–18 cm
  },
  {
    label: "CTPA",
    region: "chest",
    kvp: 100,
    mas: 130,
    rotation: 0.4,
    pitch: 1.2,
    scanLength: 30,
    phases: 1,
    diameter: 30,
  },
  {
    label: "CT abdo/pelvis (single phase)",
    region: "abdomen",
    kvp: 120,
    mas: 200,
    rotation: 0.5,
    pitch: 1.0,
    scanLength: 45,
    phases: 1,
    diameter: 32,
  },
  {
    label: "Triple-phase liver",
    region: "abdomen",
    kvp: 120,
    mas: 200,
    rotation: 0.5,
    pitch: 1.0,
    scanLength: 30,
    phases: 3,
    diameter: 32,
  },
  {
    label: "CT perfusion (stroke)",
    region: "head",
    kvp: 80,
    mas: 100,
    rotation: 1.0,
    pitch: 1.0,
    scanLength: 8,
    phases: 25,
    diameter: 17,
  },
];

// Region-specific k factor (mSv/(mGy·cm)) — ICRP 103-based typical values
const K_FACTOR: Record<Region, number> = {
  head: 0.0021,
  neck: 0.0059,
  chest: 0.014,
  abdomen: 0.015,
  pelvis: 0.015,
};

// SSDE conversion factor as a function of effective diameter for body
// (AAPM Report 204). Exponential fit f(d) = 3.704 * exp(-0.0367 * d_cm).
// For head (16 cm phantom) the factor is ~1.0 around 16 cm — use a
// gentler curve around the 16 cm phantom.
const ssdeFactor = (diameter: number, region: Region): number => {
  if (region === "head" || region === "neck") {
    // 16 cm phantom — factor near 1 at adult head, larger for paediatric
    return Math.max(0.6, Math.min(2.5, 1.4 * Math.exp(-0.025 * (diameter - 12))));
  }
  // 32 cm body phantom
  return Math.max(0.5, Math.min(3.5, 3.704 * Math.exp(-0.0367 * diameter)));
};

const formatNumber = (n: number, digits = 1): string => {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(digits);
  return n.toFixed(digits + 1);
};

export const CTDoseExplorer = () => {
  const [presetIdx, setPresetIdx] = useState(2); // CT abdo/pelvis
  const [region, setRegion] = useState<Region>(PRESETS[2].region);
  const [kvp, setKvp] = useState(PRESETS[2].kvp);
  const [mas, setMas] = useState(PRESETS[2].mas);
  const [rotation, setRotation] = useState(PRESETS[2].rotation);
  const [pitch, setPitch] = useState(PRESETS[2].pitch);
  const [scanLength, setScanLength] = useState(PRESETS[2].scanLength);
  const [phases, setPhases] = useState(PRESETS[2].phases);
  const [diameter, setDiameter] = useState(PRESETS[2].diameter);

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setPresetIdx(i);
    setRegion(p.region);
    setKvp(p.kvp);
    setMas(p.mas);
    setRotation(p.rotation);
    setPitch(p.pitch);
    setScanLength(p.scanLength);
    setPhases(p.phases);
    setDiameter(p.diameter);
  };

  // ─── Dose calculations ──────────────────────────────────────────────────
  const { ctdi, dlp, ssde, eff, kFactor, ssdeF } = useMemo(() => {
    // CTDI_vol scales ~linearly with mAs and ~(kVp/120)^2.5 (X-ray output).
    // Reference: a typical body protocol at 120 kVp / 200 mAs / pitch 1
    //   gives CTDI_vol ≈ 12 mGy in a 32 cm phantom.
    const refMas = 200;
    const refKvp = 120;
    const refCtdiBody = 12; // mGy at the reference settings
    const refCtdiHead = 50; // mGy for head protocols (16 cm phantom, higher mAs typical)

    const kvpFactor = Math.pow(kvp / refKvp, 2.5);
    const masFactor = mas / refMas;
    const pitchFactor = 1 / pitch; // CTDI_vol already accounts for pitch — effective mAs ≈ mAs/pitch

    const baseCtdi = region === "head" || region === "neck" ? refCtdiHead : refCtdiBody;
    const ctdi = baseCtdi * kvpFactor * masFactor * pitchFactor;

    const dlp = ctdi * scanLength * phases;

    const kFactor = K_FACTOR[region];
    const eff = dlp * kFactor; // mSv

    const ssdeF = ssdeFactor(diameter, region);
    const ssde = ctdi * ssdeF;

    return { ctdi, dlp, ssde, eff, kFactor, ssdeF };
  }, [region, kvp, mas, rotation, pitch, scanLength, phases, diameter]);

  // For visual scaling
  const yearsBackground = eff / 2.7;
  const cxrEquiv = eff / 0.02;

  // Bar widths (clamped) for the visual ladder
  const ctdiBar = Math.min(100, (ctdi / 80) * 100); // 80 mGy = full
  const dlpBar = Math.min(100, (dlp / 3000) * 100); // 3000 mGy·cm = full
  const ssdeBar = Math.min(100, (ssde / 80) * 100);
  const effBar = Math.min(100, (eff / 50) * 100); // 50 mSv = full

  return (
    <div className="my-6 rounded-xl border border-border bg-muted/30 p-4 space-y-4">
      <div>
        <h3 className="text-lg font-serif font-bold text-foreground leading-tight">
          CT acquisition → dose explorer
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Drag the levers to see how scan length, phases, kVp, mAs, pitch and patient size feed into{" "}
          <a href="#ctdi-vol" className="underline hover:text-foreground">CTDI<sub>vol</sub></a>,{" "}
          <a href="#dlp" className="underline hover:text-foreground">DLP</a>,{" "}
          <a href="#ssde" className="underline hover:text-foreground">SSDE</a> and{" "}
          <a href="#effective-dose-ct" className="underline hover:text-foreground">effective dose</a>.
        </p>
      </div>

      {/* Preset row */}
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p, i) => (
          <Button
            key={p.label}
            type="button"
            size="sm"
            variant={presetIdx === i ? "default" : "outline"}
            onClick={() => applyPreset(i)}
            className="h-7 px-2 text-[11px]"
          >
            {p.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ─── Controls ─── */}
        <div className="lg:col-span-2 space-y-3">
          <ControlBlock label="Body region">
            <div className="flex flex-wrap gap-1">
              {(["head", "neck", "chest", "abdomen", "pelvis"] as Region[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`text-[11px] px-2 py-0.5 rounded border capitalize ${
                    region === r
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              k = {kFactor.toFixed(4)} mSv/(mGy·cm)
            </p>
          </ControlBlock>

          <SliderRow
            label="Tube voltage (kVp)"
            value={kvp}
            min={70}
            max={140}
            step={5}
            unit=" kVp"
            onChange={setKvp}
            hint="Output ∝ (kVp)^≈2.5 — small changes have a big dose effect."
            affects={[{ anchor: "ctdi-vol", label: "CTDI<sub>vol</sub>" }]}
          />
          <SliderRow
            label="Effective mAs"
            value={mas}
            min={20}
            max={500}
            step={5}
            unit=" mAs"
            onChange={setMas}
            hint="Linear with dose; modulation lowers it for thinner anatomy."
            affects={[{ anchor: "ctdi-vol", label: "CTDI<sub>vol</sub>" }]}
          />
          <SliderRow
            label="Rotation time"
            value={rotation}
            min={0.25}
            max={1.0}
            step={0.05}
            unit=" s"
            onChange={setRotation}
            hint="Faster rotation = less motion; mAs is the dose driver, not rotation alone."
            digits={2}
          />
          <SliderRow
            label="Pitch"
            value={pitch}
            min={0.4}
            max={1.6}
            step={0.05}
            unit=""
            onChange={setPitch}
            hint="Pitch > 1 spreads dose over more anatomy (less dose, more noise)."
            digits={2}
            affects={[{ anchor: "ctdi-vol", label: "CTDI<sub>vol</sub>" }]}
          />
          <SliderRow
            label="Scan length (z)"
            value={scanLength}
            min={5}
            max={120}
            step={1}
            unit=" cm"
            onChange={setScanLength}
            hint="Linear with DLP — only scan what you need."
            affects={[
              { anchor: "dlp", label: "DLP" },
              { anchor: "effective-dose-ct", label: "Effective dose" },
            ]}
          />
          <SliderRow
            label="Phases / acquisitions"
            value={phases}
            min={1}
            max={30}
            step={1}
            unit="×"
            onChange={setPhases}
            hint="Multi-phase (triple-liver, perfusion) multiplies DLP and effective dose directly."
            affects={[
              { anchor: "dlp", label: "DLP" },
              { anchor: "effective-dose-ct", label: "Effective dose" },
            ]}
          />
          <SliderRow
            label="Patient effective diameter"
            value={diameter}
            min={10}
            max={45}
            step={1}
            unit=" cm"
            onChange={setDiameter}
            hint={`SSDE conversion factor = ${ssdeF.toFixed(2)} — bigger patients absorb less, smaller absorb more relative to phantom.`}
            affects={[{ anchor: "ssde", label: "SSDE" }]}
          />
        </div>

        {/* ─── Outputs ─── */}
        <div className="lg:col-span-3 space-y-2">
          <DoseCard
            anchor="ctdi-vol"
            title={
              <>
                CTDI<sub>vol</sub>
              </>
            }
            value={`${formatNumber(ctdi)} mGy`}
            bar={ctdiBar}
            color="hsl(195 80% 55%)"
            formula={
              <>
                ∝ mAs · (kVp / 120)<sup>2.5</sup> ÷ pitch
              </>
            }
            drivers={["mAs", "kVp", "pitch"]}
            hint="Per-rotation phantom dose. Reported on every console."
          />
          <DoseCard
            anchor="dlp"
            title="DLP"
            value={`${formatNumber(dlp)} mGy·cm`}
            bar={dlpBar}
            color="hsl(25 85% 55%)"
            formula={
              <>
                = CTDI<sub>vol</sub> × scan length × phases
                <span className="ml-1 tabular-nums text-foreground">
                  ({formatNumber(ctdi)} × {scanLength} × {phases})
                </span>
              </>
            }
            drivers={["scan length", "phases"]}
            hint="Best surrogate for total energy deposited."
          />
          <DoseCard
            anchor="ssde"
            title="SSDE"
            value={`${formatNumber(ssde)} mGy`}
            bar={ssdeBar}
            color="hsl(280 65% 60%)"
            formula={
              <>
                = CTDI<sub>vol</sub> × f(diameter)
                <span className="ml-1 tabular-nums text-foreground">
                  ({formatNumber(ctdi)} × {ssdeF.toFixed(2)})
                </span>
              </>
            }
            drivers={["patient size"]}
            hint="Size-corrected dose — essential for paediatrics & adult size variation."
          />
          <DoseCard
            anchor="effective-dose-ct"
            title="Effective dose"
            value={`${formatNumber(eff, 2)} mSv`}
            bar={effBar}
            color="hsl(0 70% 55%)"
            formula={
              <>
                = DLP × k
                <span className="ml-1 tabular-nums text-foreground">
                  ({formatNumber(dlp)} × {kFactor.toFixed(4)})
                </span>
              </>
            }
            drivers={["region (k)", "all of the above"]}
            hint={`≈ ${yearsBackground.toFixed(yearsBackground >= 1 ? 1 : 2)} yr UK background · ≈ ${
              cxrEquiv >= 100 ? Math.round(cxrEquiv / 5) * 5 : Math.round(cxrEquiv)
            }× CXRs`}
            highlight
          />
        </div>
      </div>

      {/* Footnote */}
      <p className="text-[11px] text-muted-foreground italic leading-snug">
        Simplified pedagogic model. Real scanner consoles report CTDI<sub>vol</sub>/DLP from
        calibrated phantom measurements; SSDE follows AAPM Report 204; effective dose uses ICRP-103
        tissue weighting. Use this to feel the levers — not for clinical dosimetry.
      </p>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────

const ControlBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
    {children}
  </div>
);

interface LinkTarget {
  anchor: string;
  label: string;
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  hint?: string;
  digits?: number;
  affects?: LinkTarget[];
}

const SliderRow = ({ label, value, min, max, step, unit, onChange, hint, digits = 0, affects }: SliderRowProps) => (
  <div>
    <div className="flex items-baseline justify-between text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums text-foreground font-medium">
        {value.toFixed(digits)}
        {unit}
      </span>
    </div>
    <Slider
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onChange(v[0])}
      className="my-1"
    />
    {hint && <p className="text-[10px] text-muted-foreground italic leading-snug">{hint}</p>}
    {affects && affects.length > 0 && (
      <p className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">
        Affects:{" "}
        {affects.map((t, i) => (
          <span key={t.anchor}>
            <a
              href={`#${t.anchor}`}
              className="underline decoration-dotted underline-offset-2 hover:text-foreground"
              dangerouslySetInnerHTML={{ __html: t.label }}
            />
            {i < affects.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    )}
  </div>
);

interface DoseCardProps {
  anchor: string;
  title: React.ReactNode;
  value: string;
  bar: number;
  color: string;
  formula: React.ReactNode;
  drivers: string[];
  hint: string;
  highlight?: boolean;
}

const DoseCard = ({ anchor, title, value, bar, color, formula, drivers, hint, highlight }: DoseCardProps) => (
  <div
    className={`rounded-lg border bg-background/80 p-2.5 ${
      highlight ? "border-primary/50" : "border-border"
    }`}
    style={{ borderLeftWidth: 4, borderLeftColor: color }}
  >
    <div className="flex items-baseline justify-between gap-2">
      <a
        href={`#${anchor}`}
        className="text-sm font-semibold text-foreground underline-offset-2 hover:underline"
      >
        {title}
      </a>
      <span className="text-base tabular-nums font-bold" style={{ color }}>
        {value}
      </span>
    </div>
    <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">{formula}</div>
    <div className="mt-1.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${bar}%`, background: color }} />
    </div>
    <div className="flex items-center justify-between mt-1 gap-2">
      <div className="flex flex-wrap gap-1">
        {drivers.map((d) => (
          <span
            key={d}
            className="text-[9px] uppercase tracking-wide px-1 py-0.5 rounded border border-border text-muted-foreground"
          >
            {d}
          </span>
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground italic text-right">{hint}</span>
    </div>
  </div>
);

export default CTDoseExplorer;
