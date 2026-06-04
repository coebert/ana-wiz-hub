import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Interactive ventilator mode selector for the Ventilator Modes topic.
 * The learner picks one of four canonical modes and watches the pressure,
 * flow and volume waveforms scroll across the screen in real time. The
 * waveforms are synthesised from textbook descriptions of each mode
 * (Tobin's Mechanical Ventilation, Hess & Kacmarek, Deranged Physiology
 * CC2.3) rather than recorded data — they are deliberately stylised so
 * that the diagnostic shape of each mode is unmistakable.
 *
 *   AC/CMV  — every breath fully supported; square pressure (PCV) or
 *             square flow (VCV). We render PCV-style AC: square Paw,
 *             decelerating flow, ramping volume.
 *   SIMV    — mandatory breaths interleaved with smaller spontaneous
 *             pressure-supported breaths.
 *   PSV/CPAP — no mandatory breaths; constant PEEP with pressure-supported
 *             spontaneous breaths (or just CPAP when support = 0).
 *   PRVC    — pressure-controlled shape but the machine auto-adjusts
 *             driving pressure breath-to-breath to hit a set tidal volume;
 *             we show the dial converging onto target Vt over 3 breaths.
 */

type Mode = "ac" | "simv" | "psv" | "prvc";

interface ModeSpec {
  label: string;
  shortLabel: string;
  tagline: string;
  whoSets: string[];
  machineDelivers: string[];
  bestFor: string;
  caveat: string;
}

const MODES: Record<Mode, ModeSpec> = {
  ac: {
    label: "AC / CMV (Pressure-controlled assist-control)",
    shortLabel: "AC / CMV",
    tagline: "Every breath fully supported to the same target pressure.",
    whoSets: ["Inspiratory pressure (Pinsp above PEEP)", "PEEP", "Rate (backup)", "I:E or Ti", "FiO₂", "Trigger sensitivity"],
    machineDelivers: ["Square pressure waveform held for Ti", "Decelerating inspiratory flow", "Variable tidal volume (depends on compliance & resistance)"],
    bestFor: "Apnoeic or deeply sedated patient; lung-protective ventilation in ARDS with set plateau pressure.",
    caveat: "Vt is not guaranteed — if compliance falls, Vt falls. Patient–ventilator dyssynchrony (double-triggering, breath-stacking) is common if respiratory drive is high.",
  },
  simv: {
    label: "SIMV + PS (Synchronised Intermittent Mandatory Ventilation)",
    shortLabel: "SIMV",
    tagline: "Set number of mandatory breaths; any extra patient breaths are pressure-supported.",
    whoSets: ["Mandatory rate (e.g. 8/min)", "Mandatory Vt or Pinsp", "Pressure support level", "PEEP, FiO₂, trigger"],
    machineDelivers: ["Large mandatory breaths at fixed rate", "Smaller pressure-supported spontaneous breaths in between", "Synchronisation window prevents stacking"],
    bestFor: "Historical weaning mode; still used when partial ventilator support is desired alongside spontaneous effort.",
    caveat: "Multiple RCTs (Brochard 1994, Esteban 1995) show SIMV prolongs weaning vs PSV or T-piece trials. Mixed work of breathing across mandatory and spontaneous breaths is poorly tolerated.",
  },
  psv: {
    label: "PSV / CPAP (Pressure Support / Continuous Positive Airway Pressure)",
    shortLabel: "PSV / CPAP",
    tagline: "No mandatory breaths — patient triggers every breath; machine boosts pressure to a set level.",
    whoSets: ["Pressure support above PEEP (e.g. 8–15 cmH₂O)", "PEEP / CPAP", "FiO₂", "Trigger sensitivity", "Expiratory cycling threshold (% peak flow, usually 25 %)"],
    machineDelivers: ["Square pressure on each triggered breath", "Decelerating flow; breath ends when flow falls to cycling threshold", "Patient controls rate, Ti, and Vt"],
    bestFor: "Spontaneous breathing trial, weaning, post-extubation NIV support.",
    caveat: "Requires intact respiratory drive — apnoea backup essential. Excessive PS masks failing weaning; titrate to RSBI < 105.",
  },
  prvc: {
    label: "PRVC / VC+ / AutoFlow (Pressure-Regulated Volume Control)",
    shortLabel: "PRVC",
    tagline: "Pressure-controlled shape, but driving pressure auto-adjusts to hit a target tidal volume.",
    whoSets: ["Target tidal volume (e.g. 6 mL/kg PBW)", "Rate", "I:E or Ti", "Maximum allowed Pinsp", "PEEP, FiO₂"],
    machineDelivers: ["Square pressure waveform, decelerating flow (PCV shape)", "Driving pressure recalculated breath-to-breath using a 75 % step toward the volume target", "Vt delivered close to set value across changing compliance"],
    bestFor: "ARDS lung-protective ventilation when both Pplat ≤ 30 and Vt 6 mL/kg are required.",
    caveat: "If the patient's drive increases, the machine *reduces* support (more spontaneous effort ⇒ more measured Vt ⇒ less Pinsp), the opposite of what an air-hungry patient needs — recognised cause of dyssynchrony.",
  },
};

const W = 760; // viewBox width
const TRACE_H = 90; // per-trace height
const N_BREATHS = 3;
const SAMPLES = 600;

/** Returns three arrays (Paw, Flow, Vt) sampled across one screen of three breaths. */
function buildWaveforms(mode: Mode, t: number) {
  const paw: number[] = [];
  const flow: number[] = [];
  const vol: number[] = [];

  // Per-breath geometry
  const breathDur = 1; // normalised to 1 unit per breath
  const tiFrac = 0.33;
  const peep = 5;

  for (let i = 0; i < SAMPLES; i++) {
    const xRaw = (i / SAMPLES) * N_BREATHS + t; // scrolls with time
    const phase = ((xRaw % breathDur) + breathDur) % breathDur;
    const breathIdx = Math.floor(xRaw) % 100;
    const inInsp = phase < tiFrac;
    const inspProgress = phase / tiFrac; // 0..1 inside insp
    const expProgress = (phase - tiFrac) / (1 - tiFrac); // 0..1 inside exp

    let p = peep;
    let f = 0;
    let v = 0;

    if (mode === "ac") {
      // PCV-style AC: square pressure, decelerating flow, exp-decay flow
      const pinsp = 20;
      p = inInsp ? peep + pinsp : peep;
      if (inInsp) {
        // decelerating inspiratory flow
        f = 60 * Math.max(0, 1 - inspProgress * 0.95);
        v = 500 * (1 - Math.exp(-inspProgress * 3));
      } else {
        f = -50 * Math.exp(-expProgress * 3);
        v = 500 * Math.exp(-expProgress * 3);
      }
    } else if (mode === "simv") {
      // Mandatory every 3rd breath, PS on the others
      const mandatory = breathIdx % 2 === 0;
      const pinsp = mandatory ? 22 : 10;
      const vtPeak = mandatory ? 500 : 280;
      p = inInsp ? peep + pinsp : peep;
      if (inInsp) {
        f = (mandatory ? 60 : 35) * Math.max(0, 1 - inspProgress * 0.9);
        v = vtPeak * (1 - Math.exp(-inspProgress * 3));
      } else {
        f = -(mandatory ? 50 : 30) * Math.exp(-expProgress * 3);
        v = vtPeak * Math.exp(-expProgress * 3);
      }
    } else if (mode === "psv") {
      // Every breath triggered by patient (small negative deflection at start),
      // square PS, flow-cycled at 25 % of peak.
      const ps = 12;
      const peakFlow = 45;
      // approximate cycling: breath ends naturally when decelerating flow
      // crosses 25 % peak; for visualisation that's a slightly shorter Ti.
      const psTiFrac = 0.28;
      const inPsInsp = phase < psTiFrac;
      const psInsp = phase / psTiFrac;
      const psExp = (phase - psTiFrac) / (1 - psTiFrac);
      // small trigger dip just before inspiration
      const triggerDip = phase < 0.02 ? -2 : 0;
      p = inPsInsp ? peep + ps : peep + triggerDip;
      if (inPsInsp) {
        f = peakFlow * Math.max(0, 1 - psInsp * 0.85);
        v = 380 * (1 - Math.exp(-psInsp * 3));
      } else {
        f = -35 * Math.exp(-psExp * 3);
        v = 380 * Math.exp(-psExp * 3);
      }
    } else if (mode === "prvc") {
      // Pressure-controlled shape, but Pinsp converges to hit Vt target
      // over the visible 3 breaths.
      const targets = [14, 18, 20]; // ramping Pinsp toward target Vt
      const pinsp = targets[breathIdx % targets.length];
      const vtPeak = 380 + (pinsp - 14) * 20; // crude compliance link
      p = inInsp ? peep + pinsp : peep;
      if (inInsp) {
        f = (40 + pinsp) * Math.max(0, 1 - inspProgress * 0.95);
        v = vtPeak * (1 - Math.exp(-inspProgress * 3));
      } else {
        f = -(35 + pinsp * 0.6) * Math.exp(-expProgress * 3);
        v = vtPeak * Math.exp(-expProgress * 3);
      }
    }

    paw.push(p);
    flow.push(f);
    vol.push(v);
  }
  return { paw, flow, vol };
}

const polyline = (vals: number[], yCenter: number, yScale: number) =>
  vals
    .map((v, i) => `${(i / (SAMPLES - 1)) * W},${yCenter - v * yScale}`)
    .join(" ");

export const VentilatorModesDiagram = () => {
  const [mode, setMode] = useState<Mode>("ac");
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const loop = (now: number) => {
      if (!last.current) last.current = now;
      const dt = (now - last.current) / 1000;
      last.current = now;
      setTick((t) => t + dt * 0.4); // scroll speed
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [running]);

  const spec = MODES[mode];
  const { paw, flow, vol } = useMemo(() => buildWaveforms(mode, tick), [mode, tick]);

  // Trace centres (Paw, Flow, Vt)
  const yPaw = 50;
  const yFlow = yPaw + TRACE_H;
  const yVol = yFlow + TRACE_H;

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Interactive — ventilator mode waveforms
        </p>
        <h3 className="text-lg font-serif font-bold text-foreground">
          Pressure, flow and volume by mode
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Pick a mode and watch the three traces scroll in real time. The
          waveform shape is the visual fingerprint that lets you identify
          a mode at the bedside before reading the screen banner.
        </p>
      </div>

      {/* Mode selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
              mode === m
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
            aria-pressed={mode === m}
          >
            {MODES[m].shortLabel}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="ml-auto px-3 py-1.5 rounded-md text-sm font-medium border border-border bg-background text-foreground hover:bg-muted"
        >
          {running ? "Pause" : "Play"}
        </button>
      </div>

      {/* SVG waveform stack */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${TRACE_H * 3 + 30}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${spec.shortLabel} ventilator waveform — pressure, flow and volume`}
        >
          {/* Trace backgrounds + zero lines */}
          {[yPaw, yFlow, yVol].map((y) => (
            <g key={y}>
              <line
                x1={0}
                x2={W}
                y1={y}
                y2={y}
                stroke="hsl(var(--border))"
                strokeDasharray="2 4"
              />
            </g>
          ))}

          {/* Labels */}
          <text x={4} y={yPaw - TRACE_H / 2 + 12} className="fill-muted-foreground" fontSize="11" fontFamily="sans-serif">Pₐw (cmH₂O)</text>
          <text x={4} y={yFlow - TRACE_H / 2 + 12} className="fill-muted-foreground" fontSize="11" fontFamily="sans-serif">Flow (L/min)</text>
          <text x={4} y={yVol - TRACE_H / 2 + 12} className="fill-muted-foreground" fontSize="11" fontFamily="sans-serif">Vt (mL)</text>

          {/* Pressure */}
          <polyline
            points={polyline(paw, yPaw, 1.2)}
            fill="none"
            stroke="hsl(var(--physics))"
            strokeWidth={2}
          />
          {/* Flow */}
          <polyline
            points={polyline(flow, yFlow, 0.4)}
            fill="none"
            stroke="hsl(var(--physiology))"
            strokeWidth={2}
          />
          {/* Volume */}
          <polyline
            points={polyline(vol, yVol, 0.06)}
            fill="none"
            stroke="hsl(var(--pharmacology))"
            strokeWidth={2}
          />
        </svg>
      </div>

      {/* Mode explainer */}
      <div className="rounded-lg border border-border bg-muted/40 p-3 sm:p-4 space-y-3">
        <div>
          <p className="font-serif font-semibold text-foreground">{spec.label}</p>
          <p className="text-sm text-muted-foreground italic">{spec.tagline}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-semibold text-foreground mb-1">Clinician sets</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
              {spec.whoSets.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Machine delivers</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
              {spec.machineDelivers.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border border-border bg-card p-2">
            <p className="font-semibold text-foreground text-xs uppercase tracking-wider">Use when</p>
            <p className="text-muted-foreground mt-1">{spec.bestFor}</p>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <p className="font-semibold text-foreground text-xs uppercase tracking-wider">Watch out</p>
            <p className="text-muted-foreground mt-1">{spec.caveat}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentilatorModesDiagram;
