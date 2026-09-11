import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Interactive capnography waveform pattern recogniser for the
 * Capnography topic page. The learner picks a clinical scenario and
 * watches the corresponding EtCO₂ trace scroll across the screen. Each
 * waveform is synthesised from the canonical pattern descriptions in
 * Bhavani-Shankar & Philip (Anesth Analg 2000) and the BJA Education
 * 2017 review on capnography.
 *
 * Patterns: normal, obstructive (shark-fin), curare cleft, rebreathing
 * (raised baseline), oesophageal intubation / disconnection, and
 * cardiac oscillations.
 */

type Pattern =
  | "normal"
  | "bronchospasm"
  | "upperAirway"
  | "curare"
  | "rebreathing"
  | "disconnection"
  | "cardiac";

/**
 * Static, fully-labelled reference capnograph. Shows Phase I (inspiratory
 * baseline), Phase II (expiratory upstroke), Phase III (alveolar plateau)
 * and Phase 0 (inspiratory downstroke), along with the α angle (II–III
 * junction, normally ~100–110°; widens in obstruction) and β angle (III–0
 * junction, normally ~90°; widens with rebreathing). Rendered alongside
 * the animated trace so learners can map the scrolling waveform onto the
 * canonical named phases used in the FRCA syllabus.
 */
const LabelledReferenceCapnograph = () => {
  const w = 520;
  const h = 180;
  const padL = 40;
  const padR = 20;
  const padT = 24;
  const padB = 36;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  // Phase boundaries as fractions of a single breath (must mirror
  // waveformPoint()'s "normal" case so the labels stay honest).
  const p1End = 0.06; // Phase I baseline (compressed for readability)
  const p2End = 0.20; // Phase II upstroke
  const p3End = 0.72; // Phase III plateau
  const p0End = 0.86; // Phase 0 downstroke, then inspiratory baseline
  const peak = 5.0;
  const yFor = (kpa: number) => padT + plotH - (kpa / 6) * plotH;
  const xFor = (frac: number) => padL + frac * plotW;
  // Build a smoothed idealised waveform
  const pts: string[] = [];
  const N = 240;
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    let y = 0;
    if (p < p1End) y = 0;
    else if (p < p2End) {
      const k = (p - p1End) / (p2End - p1End);
      y = peak * (1 - Math.exp(-k * 3.2));
    } else if (p < p3End) {
      const k = (p - p2End) / (p3End - p2End);
      y = peak * (0.95 + 0.05 * k);
    } else if (p < p0End) {
      const k = (p - p3End) / (p0End - p3End);
      y = peak * Math.exp(-k * 3.5);
    } else y = 0;
    pts.push(`${xFor(p).toFixed(1)},${yFor(y).toFixed(1)}`);
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-auto"
      role="img"
      aria-label="Labelled reference capnograph showing phases I, II, III and 0, with alpha and beta angles"
    >
      {/* Axes */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="hsl(var(--border))" />
      <line x1={padL} y1={padT + plotH} x2={w - padR} y2={padT + plotH} stroke="hsl(var(--border))" />
      {/* Y-axis label */}
      <text x={4} y={padT + 4} fontSize="10" className="fill-muted-foreground" fontFamily="sans-serif">EtCO₂ (kPa)</text>
      {[0, 2, 4, 6].map((k) => (
        <g key={k}>
          <text x={padL - 6} y={yFor(k) + 3} fontSize="9" textAnchor="end" className="fill-muted-foreground" fontFamily="sans-serif">{k}</text>
          <line x1={padL - 3} x2={padL} y1={yFor(k)} y2={yFor(k)} stroke="hsl(var(--border))" />
        </g>
      ))}
      {/* X-axis label */}
      <text x={padL + plotW / 2} y={h - 4} fontSize="10" textAnchor="middle" className="fill-muted-foreground" fontFamily="sans-serif">
        Time (seconds) →
      </text>
      {/* Phase dividers */}
      {[p1End, p2End, p3End, p0End].map((f) => (
        <line
          key={f}
          x1={xFor(f)}
          x2={xFor(f)}
          y1={padT}
          y2={padT + plotH}
          stroke="hsl(var(--border))"
          strokeDasharray="2 3"
          strokeWidth={0.6}
        />
      ))}
      {/* Waveform */}
      <polyline points={pts.join(" ")} fill="none" stroke="hsl(var(--physiology))" strokeWidth={2} />
      {/* Phase labels along the top */}
      {[
        { c: (0 + p1End) / 2, label: "I" },
        { c: (p1End + p2End) / 2, label: "II" },
        { c: (p2End + p3End) / 2, label: "III" },
        { c: (p3End + p0End) / 2, label: "0" },
      ].map((s) => (
        <text
          key={s.label}
          x={xFor(s.c)}
          y={padT - 8}
          fontSize="11"
          textAnchor="middle"
          className="fill-foreground"
          fontFamily="sans-serif"
          fontWeight={600}
        >
          Phase {s.label}
        </text>
      ))}
      {/* α angle (Phase II→III junction, ~100–110°) */}
      <g>
        <circle cx={xFor(p2End)} cy={yFor(peak * 0.95)} r={3} fill="hsl(var(--physics))" />
        <text
          x={xFor(p2End) + 6}
          y={yFor(peak * 0.95) + 12}
          fontSize="11"
          fill="hsl(var(--physics))"
          fontFamily="sans-serif"
          fontWeight={600}
        >
          α (~100–110°)
        </text>
      </g>
      {/* β angle (Phase III→0 junction, ~90°) */}
      <g>
        <circle cx={xFor(p3End)} cy={yFor(peak)} r={3} fill="hsl(var(--physics))" />
        <text
          x={xFor(p3End) - 6}
          y={yFor(peak) - 6}
          fontSize="11"
          textAnchor="end"
          fill="hsl(var(--physics))"
          fontFamily="sans-serif"
          fontWeight={600}
        >
          β (~90°)
        </text>
      </g>
      {/* Sub-caption for the four phases */}
      <text x={padL} y={h - 20} fontSize="9" className="fill-muted-foreground" fontFamily="sans-serif">
        I: expiratory baseline (anatomical dead space) · II: expiratory upstroke · III: alveolar plateau · 0: inspiratory downstroke
      </text>
    </svg>
  );
};

interface PatternSpec {
  label: string;
  shortLabel: string;
  tagline: string;
  causes: string[];
  pearls: string[];
}

const PATTERNS: Record<Pattern, PatternSpec> = {
  normal: {
    label: "Normal capnograph",
    shortLabel: "Normal",
    tagline: "Phase I baseline → II rapid upstroke → III alveolar plateau → 0 → inspiratory baseline.",
    causes: [
      "Healthy adult lung",
      "Adequate ventilation and circulation",
      "No rebreathing (functioning valves, fresh soda lime)",
    ],
    pearls: [
      "EtCO₂ ≈ PaCO₂ − 0.5 kPa (4 mmHg) in health.",
      "Phase III slope < 5° — a steeper slope is the earliest sign of obstruction.",
    ],
  },
  bronchospasm: {
    label: "Bronchospasm (shark-fin) waveform",
    shortLabel: "Bronchospasm",
    tagline:
      "Lower-airway (intrathoracic) obstruction: sloping phase II merging into an upsloping phase III with no true plateau — obtuse α angle.",
    causes: [
      "Acute asthma / anaphylactic bronchospasm",
      "COPD with expiratory flow limitation",
      "Light anaesthesia with airway irritation (ETT, secretions, cold dry gas)",
      "Small-airway secretions or mucus plugging",
    ],
    pearls: [
      "Mechanism: heterogeneous small-airway time constants — fast alveoli empty first, slow CO₂-rich alveoli empty late, so the trace keeps climbing.",
      "Slope of phase III correlates with the degree of bronchospasm; flattening of the fin is a sensitive marker of bronchodilator response.",
      "EtCO₂ underestimates PaCO₂ disproportionately because alveolar emptying is incomplete.",
      "Ventilate with a long expiratory time (I:E 1:3–1:4) — otherwise auto-PEEP accumulates.",
    ],
  },
  upperAirway: {
    label: "Upper (extrathoracic) airway obstruction",
    shortLabel: "Upper airway",
    tagline:
      "Whole breath is delayed and small: slurred phase II, low amplitude, but a recognisable plateau is still reached — the fin shape is blunted, not progressive.",
    causes: [
      "Laryngospasm or partial glottic closure",
      "Soft-tissue / tongue obstruction in a sedated spontaneously breathing patient",
      "Kinked, bitten or secretion-plugged tracheal tube; supraglottic airway malposition",
      "Airway oedema, tumour, foreign body above the carina",
    ],
    pearls: [
      "Mechanism: a single fixed resistance to bulk flow — all alveoli still empty with the same (uniform) composition, so once gas arrives the plateau is flat.",
      "Distinguishing feature: bronchospasm has NO plateau (continuous rise); upper-airway obstruction has a delayed but flat plateau with reduced tidal volume.",
      "Often accompanied by an irregular rate, low-amplitude 'nibbled' breaths and rocking chest movement; stridor rather than wheeze.",
      "Salbutamol will not fix it — relieve the obstruction (jaw thrust, CPAP, deepen anaesthesia, suxamethonium for laryngospasm, check/replace the tube).",
    ],
  },
  curare: {
    label: "Curare cleft",
    shortLabel: "Curare cleft",
    tagline: "Notch interrupting the alveolar plateau — a single breath of spontaneous effort against IPPV.",
    causes: [
      "Diaphragmatic effort returning during neuromuscular blockade reversal",
      "Inadequate paralysis with controlled ventilation",
      "Light anaesthesia",
    ],
    pearls: [
      "Depth of the cleft increases as residual paralysis wears off.",
      "Verify with PNS train-of-four; treat by topping up relaxant or deepening anaesthesia.",
      "Easy to miss on long traces — watch the plateau, not the peak.",
    ],
  },
  rebreathing: {
    label: "Raised baseline — rebreathing",
    shortLabel: "Rebreathing",
    tagline: "Inspiratory baseline lifts off zero — patient is inspiring CO₂.",
    causes: [
      "Exhausted soda lime (turning purple)",
      "Faulty expiratory unidirectional valve in a circle system",
      "Insufficient FGF for a Mapleson circuit",
      "Bain inner-tube disconnection (positive Pethick's test)",
    ],
    pearls: [
      "If baseline ≠ 0, the patient is rebreathing — find the cause.",
      "Circle system: change soda lime, check unidirectional valves.",
      "Mapleson D / Bain: increase FGF to at least 70 mL/kg/min (IPPV) or 150 mL/kg/min (spontaneous).",
    ],
  },
  disconnection: {
    label: "Sudden loss of trace — disconnection / oesophageal",
    shortLabel: "Disconnect",
    tagline: "Trace falls abruptly to zero (or never rises above ~1 kPa).",
    causes: [
      "Circuit disconnection",
      "Oesophageal intubation (small bumps for ~6 breaths from gastric CO₂, then flat)",
      "Complete airway obstruction",
      "Cardiac arrest (loss of pulmonary blood flow → no CO₂ delivery)",
    ],
    pearls: [
      "An absent or vanishing trace is a never-event signal — confirm tube position, circuit and circulation in that order.",
      "During CPR, EtCO₂ < 1.3 kPa (10 mmHg) after 20 min predicts non-survival; a sudden rise heralds ROSC.",
      "Gastric CO₂ peters out within ~6 breaths — never use a single squeeze of the bag to confirm tracheal placement.",
    ],
  },
  cardiac: {
    label: "Cardiac oscillations",
    shortLabel: "Cardiac oscill.",
    tagline: "Small ripples on the descending limb timed with the heartbeat.",
    causes: [
      "Low respiratory rate, slim patient, deep paralysis",
      "Paediatric patients with non-rebreathing systems",
      "Hyperdynamic circulation pulsing the airway gas column",
    ],
    pearls: [
      "Benign — but the ventilator may mistake them for spontaneous efforts and auto-trigger.",
      "Fix auto-triggering by reducing trigger sensitivity.",
      "Often the only visual sign of vigorous cardiac output during apnoea.",
    ],
  },
};

const W = 760;
const H = 200;
const SAMPLES = 600;
const N_BREATHS = 3;

/** Returns EtCO₂ (kPa) for a given normalised position within one breath cycle. */
function waveformPoint(pattern: Pattern, phase: number, breathIdx: number): number {
  // breath cycle: 0..0.40 expiration, 0.40..1.0 inspiration (1:1.5 I:E flipped)
  const expEnd = 0.40;
  const peakNormal = 5.0; // kPa

  const baseline0 = 0;

  if (pattern === "disconnection") {
    // First two breaths normal, then disconnection — flat line
    if (breathIdx < 1) {
      return baseNormal(phase, expEnd, peakNormal);
    }
    return 0;
  }

  if (pattern === "rebreathing") {
    const v = baseNormal(phase, expEnd, peakNormal + 0.5);
    return v + 1.0; // baseline lifted ~1 kPa
  }

  if (pattern === "bronchospasm") {
    return baseObstruction(phase, expEnd, peakNormal - 0.3);
  }

  if (pattern === "upperAirway") {
    return baseUpperAirway(phase, expEnd, peakNormal - 1.2);
  }

  if (pattern === "curare") {
    return baseCurare(phase, expEnd, peakNormal);
  }

  if (pattern === "cardiac") {
    return baseCardiac(phase, expEnd, peakNormal);
  }

  return baseNormal(phase, expEnd, peakNormal);

  function baseNormal(p: number, eEnd: number, peak: number) {
    if (p < 0.02) return baseline0; // phase I (small)
    if (p < 0.10) {
      // phase II rapid upstroke
      const k = (p - 0.02) / 0.08;
      return peak * (1 - Math.exp(-k * 3.5));
    }
    if (p < eEnd) {
      // phase III plateau (very mild upward slope)
      const k = (p - 0.10) / (eEnd - 0.10);
      return peak * (0.95 + 0.05 * k);
    }
    // expiration ends, inspiration: fall to zero rapidly
    const k = (p - eEnd) / 0.08;
    if (k < 1) return peak * Math.exp(-k * 4);
    return baseline0;
  }

  function baseObstruction(p: number, eEnd: number, peak: number) {
    if (p < 0.02) return 0;
    if (p < eEnd) {
      // smooth shark-fin: continuous rise without distinct plateau
      const k = (p - 0.02) / (eEnd - 0.02);
      return peak * (1 - Math.exp(-k * 1.6));
    }
    const k = (p - eEnd) / 0.10;
    if (k < 1) return peak * 0.85 * Math.exp(-k * 3);
    return 0;
  }

  function baseCurare(p: number, eEnd: number, peak: number) {
    const v = baseNormal(p, eEnd, peak);
    // cleft only on the plateau region (alternating breaths for emphasis)
    if (p > 0.18 && p < 0.26) {
      const k = (p - 0.22) / 0.04;
      return v - peak * 0.4 * Math.max(0, 1 - k * k);
    }
    return v;
  }

  function baseCardiac(p: number, eEnd: number, peak: number) {
    const v = baseNormal(p, eEnd, peak);
    // small ripples on inspiratory baseline (after eEnd)
    if (p > eEnd + 0.08 && p < 1) {
      const osc = Math.sin(p * 60) * 0.18;
      return Math.max(0, osc + 0.1);
    }
    return v;
  }
}

function buildPolyline(pattern: Pattern, scroll: number): string {
  const pts: string[] = [];
  for (let i = 0; i < SAMPLES; i++) {
    const xRaw = (i / SAMPLES) * N_BREATHS + scroll;
    const breathIdx = Math.floor(xRaw);
    const phase = ((xRaw % 1) + 1) % 1;
    const y = waveformPoint(pattern, phase, breathIdx);
    const px = (i / (SAMPLES - 1)) * W;
    // Scale: peak ~6 kPa → use bottom 20 px margin, top 20 px margin
    const py = H - 20 - (y / 7) * (H - 40);
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return pts.join(" ");
}

export const CapnographyWaveformDiagram = () => {
  const [pattern, setPattern] = useState<Pattern>("normal");
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
      setTick((t) => t + dt * 0.35);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [running]);

  // Reset breath counter when pattern changes (so disconnection shows from breath 0)
  useEffect(() => {
    setTick(0);
    last.current = 0;
  }, [pattern]);

  const spec = PATTERNS[pattern];
  const points = useMemo(() => buildPolyline(pattern, tick), [pattern, tick]);

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Interactive — capnography pattern recognition
        </p>
        <h3 className="text-lg font-serif font-bold text-foreground">
          EtCO₂ waveforms by clinical scenario
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Pick a scenario and watch the trace scroll in real time. The
          shape of the waveform is more diagnostic than the EtCO₂ number —
          every cause below has a distinctive fingerprint.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(PATTERNS) as Pattern[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPattern(p)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
              pattern === p
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
            aria-pressed={pattern === p}
          >
            {PATTERNS[p].shortLabel}
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

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${spec.shortLabel} capnography waveform`}
        >
          {/* Gridlines: 1 kPa increments */}
          {[0, 1, 2, 3, 4, 5, 6].map((kpa) => {
            const y = H - 20 - (kpa / 7) * (H - 40);
            return (
              <g key={kpa}>
                <line
                  x1={30}
                  x2={W}
                  y1={y}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeDasharray={kpa === 0 ? "0" : "2 4"}
                  strokeWidth={kpa === 0 ? 1 : 0.5}
                />
                <text
                  x={4}
                  y={y + 4}
                  className="fill-muted-foreground"
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  {kpa}
                </text>
              </g>
            );
          })}
          <text x={4} y={14} className="fill-muted-foreground" fontSize="10" fontFamily="sans-serif">kPa</text>

          {/* Reference 5 kPa line (normal EtCO₂) */}
          <line
            x1={30}
            x2={W}
            y1={H - 20 - (5 / 7) * (H - 40)}
            y2={H - 20 - (5 / 7) * (H - 40)}
            stroke="hsl(var(--physics))"
            strokeDasharray="4 6"
            strokeWidth={0.8}
            opacity={0.4}
          />

          <polyline
            points={points}
            fill="none"
            stroke="hsl(var(--physiology))"
            strokeWidth={2}
          />
          {/* X-axis label */}
          <text
            x={W - 6}
            y={H - 4}
            textAnchor="end"
            fontSize="10"
            className="fill-muted-foreground"
            fontFamily="sans-serif"
          >
            Time (seconds) →
          </text>
        </svg>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Reference — labelled normal capnograph
        </p>
        <LabelledReferenceCapnograph />
      </div>


      <div className="rounded-lg border border-border bg-muted/40 p-3 sm:p-4 space-y-3">
        <div>
          <p className="font-serif font-semibold text-foreground">{spec.label}</p>
          <p className="text-sm text-muted-foreground italic">{spec.tagline}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-semibold text-foreground mb-1">Typical causes</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
              {spec.causes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Exam pearls</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
              {spec.pearls.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapnographyWaveformDiagram;
