import { useEffect, useRef, useState } from "react";

/**
 * PartialAirwayObstructionDiagram
 *
 * Animated comparison of partial airway obstruction at four anatomical levels.
 * Each tab loops a spontaneous breath (inspiration → expiration) and shows
 * how the lesion behaves at that level, plus a synchronised flow–volume loop.
 */

type Level = "supraglottic" | "glottic" | "extrathoracic" | "intrathoracic";

interface LevelInfo {
  label: string;
  shortLabel: string;
  noise: string;
  worstPhase: "insp" | "exp" | "both";
  pearl: string;
  helpful: string;
  avoid: string;
}

const LEVELS: Record<Level, LevelInfo> = {
  supraglottic: {
    label: "Supraglottic (tongue base / pharynx)",
    shortLabel: "Supraglottic",
    noise: "Low-pitched snore / stertor — inspiratory",
    worstPhase: "insp",
    pearl:
      "Pharyngeal soft tissue is sucked inward by negative inspiratory pressure. Jaw thrust, NPA, lateral position or CPAP splints the airway open.",
    helpful: "Jaw thrust • NPA/OPA • CPAP • lateral position • SAD",
    avoid: "Early paralysis • blind SAD in distorted anatomy",
  },
  glottic: {
    label: "Glottic (vocal cords)",
    shortLabel: "Glottic",
    noise: "High-pitched inspiratory ± biphasic stridor, voice change",
    worstPhase: "insp",
    pearl:
      "Cords narrow on inspiration. Maintain spontaneous ventilation, prepare smaller ETT, plan awake technique or surgical airway.",
    helpful: "Spontaneous ventilation • gas induction • heliox • smaller ETT",
    avoid: "Muscle relaxants before cord view • SAD as definitive airway",
  },
  extrathoracic: {
    label: "Subglottic / cervical trachea — variable extrathoracic",
    shortLabel: "Extrathoracic",
    noise: "Inspiratory stridor — flattened inspiratory limb of flow–volume loop",
    worstPhase: "insp",
    pearl:
      "Negative intratracheal pressure on inspiration < atmospheric pressure outside the neck → wall collapses inward. Expiration splints it open. PPV / CPAP and AFOI past the lesion are helpful.",
    helpful: "Sit upright • CPAP/PPV stents lumen • AFOI past lesion",
    avoid: "Apnoea without distal control • blind dilatation",
  },
  intrathoracic: {
    label: "Intrathoracic trachea / mediastinal mass — variable intrathoracic",
    shortLabel: "Intrathoracic",
    noise: "Expiratory stridor or wheeze — flattened expiratory limb",
    worstPhase: "exp",
    pearl:
      "Pleural pressure exceeds intraluminal pressure on expiration → airway collapses. Inspiration holds it open. Loss of spontaneous ventilation + supine IPPV is catastrophic; FONA above the lesion does not rescue.",
    helpful: "Spontaneous ventilation • semi-recumbent/lateral • rigid bronch ready",
    avoid: "Supine paralysis + IPPV • FONA expecting rescue",
  },
};

const CYCLE_MS = 3600; // one breath
const I_FRAC = 0.4; // inspiration occupies first 40%

export default function PartialAirwayObstructionDiagram() {
  const [level, setLevel] = useState<Level>("supraglottic");
  const [running, setRunning] = useState(true);
  const [t, setT] = useState(0); // 0..1 within breath
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }
    const tick = (now: number) => {
      if (startRef.current == null) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      setT(elapsed / CYCLE_MS);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const inInsp = t < I_FRAC;
  const phaseProgress = inInsp ? t / I_FRAC : (t - I_FRAC) / (1 - I_FRAC);

  // Pressure waveform (negative pleural during insp, positive during exp)
  // Normalised −1..+1
  const pleuralP = inInsp
    ? -Math.sin(Math.PI * phaseProgress) // dips to -1 mid-insp
    : 0.6 * Math.sin(Math.PI * phaseProgress); // small positive on exp

  // Lesion-specific lumen factor 0..1 (1 = fully open)
  let lumen = 1;
  switch (level) {
    case "supraglottic":
      // Pharynx collapses on inspiration (worst at peak negative)
      lumen = 1 + 0.7 * pleuralP * (pleuralP < 0 ? 1 : 0);
      break;
    case "glottic":
      // Cords adduct on insp (paradoxical-style narrowing)
      lumen = 1 + 0.55 * pleuralP * (pleuralP < 0 ? 1 : 0);
      break;
    case "extrathoracic":
      // Variable extrathoracic — collapses on insp (negative intratracheal P < atm)
      lumen = 1 + 0.6 * pleuralP * (pleuralP < 0 ? 1 : 0);
      break;
    case "intrathoracic":
      // Variable intrathoracic — collapses on exp (positive pleural > intratracheal)
      lumen = 1 - 0.7 * (pleuralP > 0 ? pleuralP : 0);
      break;
  }
  lumen = Math.max(0.08, Math.min(1, lumen));

  // Flow waveform (sinusoidal, inspiration negative by convention)
  // For loop visualisation we display absolute envelope.
  const baseFlow = inInsp ? -Math.sin(Math.PI * phaseProgress) : Math.sin(Math.PI * phaseProgress);
  // Apply obstruction limitation
  const flowAttenuation = inInsp && (level === "supraglottic" || level === "glottic" || level === "extrathoracic")
    ? lumen
    : !inInsp && level === "intrathoracic"
      ? lumen
      : 1;
  const flow = baseFlow * (0.4 + 0.6 * flowAttenuation);

  const info = LEVELS[level];

  return (
    <div className="w-full rounded-lg border border-border bg-card p-4">
      <div className="mb-3">
        <h3 className="text-lg font-serif font-semibold text-foreground">
          Partial airway obstruction — level-by-level animation
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Each tab loops a single spontaneous breath. Watch the airway lumen, the chest, and the
          flow–volume loop deform in the phase where the lesion is unmasked.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mb-3">
        {(Object.keys(LEVELS) as Level[]).map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`text-xs font-medium rounded px-2 py-1.5 border transition ${
              level === l
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
          >
            {LEVELS[l].shortLabel}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4">
        {/* Anatomy panel */}
        <div className="rounded-md border border-border bg-background overflow-hidden">
          <AnatomySvg level={level} lumen={lumen} pleuralP={pleuralP} inInsp={inInsp} />
        </div>

        {/* Flow loop & info */}
        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-border bg-background p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Flow–volume loop
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {inInsp ? "Inspiration" : "Expiration"}
              </span>
            </div>
            <FlowLoop level={level} t={t} flow={flow} inInsp={inInsp} />
          </div>

          <div className="rounded-md border border-border bg-background p-3 space-y-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Level</div>
              <div className="text-sm font-semibold text-foreground">{info.label}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Audible sign</div>
              <div className="text-xs text-foreground/85">{info.noise}</div>
            </div>
            <div className="text-xs text-foreground/85 leading-relaxed">{info.pearl}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="rounded border border-clinical/30 bg-clinical/5 p-2">
                <div className="text-[9px] uppercase tracking-wider text-clinical font-semibold mb-0.5">
                  Helpful
                </div>
                <div className="text-[11px] text-foreground/85">{info.helpful}</div>
              </div>
              <div className="rounded border border-destructive/30 bg-destructive/5 p-2">
                <div className="text-[9px] uppercase tracking-wider text-destructive font-semibold mb-0.5">
                  Avoid
                </div>
                <div className="text-[11px] text-foreground/85">{info.avoid}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setRunning((r) => !r)}
            className="text-xs font-medium rounded bg-primary text-primary-foreground py-1.5 hover:opacity-90 transition"
          >
            {running ? "Pause animation" : "Resume animation"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Anatomy SVG -------------------- */

function AnatomySvg({
  level,
  lumen,
  pleuralP,
  inInsp,
}: {
  level: Level;
  lumen: number;
  pleuralP: number;
  inInsp: boolean;
}) {
  // Universal anatomy: head + airway column + chest + diaphragm
  // Chest expansion driven by pleural pressure (more negative = bigger expansion)
  const chestExpansion = inInsp ? Math.abs(pleuralP) * 12 : -pleuralP * 8;
  const chestTopY = 150 - chestExpansion;
  const diaphragmY = 250 + chestExpansion * 0.7;

  // Lumen widths at each level (full open = 18 px). Apply only at the active level.
  const wSupra = level === "supraglottic" ? 6 + 16 * lumen : 22;
  const wGlottic = level === "glottic" ? 3 + 12 * lumen : 14;
  const wExtra = level === "extrathoracic" ? 3 + 14 * lumen : 16;
  const wIntra = level === "intrathoracic" ? 3 + 14 * lumen : 16;

  // Air column gradient color hint depending on phase
  const airColor = inInsp ? "hsl(var(--primary) / 0.3)" : "hsl(var(--accent-foreground) / 0.25)";

  return (
    <svg viewBox="0 0 360 360" className="w-full h-auto" role="img" aria-label="Animated airway obstruction">
      <defs>
        <linearGradient id="pao-chest" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--clinical) / 0.18)" />
          <stop offset="100%" stopColor="hsl(var(--clinical) / 0.06)" />
        </linearGradient>
        <linearGradient id="pao-air" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={airColor} />
          <stop offset="100%" stopColor="hsl(var(--background))" />
        </linearGradient>
      </defs>

      {/* Head outline */}
      <path
        d="M 130 20 Q 180 6 230 20 Q 240 60 230 95 L 200 110 L 160 110 L 130 95 Q 120 60 130 20 Z"
        fill="hsl(var(--muted))"
        stroke="hsl(var(--border))"
        strokeWidth="1"
      />
      {/* Tongue base / pharynx (supraglottic level) */}
      <ellipse
        cx="180"
        cy="98"
        rx={wSupra}
        ry="10"
        fill="url(#pao-air)"
        stroke={level === "supraglottic" ? "hsl(var(--destructive))" : "hsl(var(--border))"}
        strokeWidth={level === "supraglottic" ? 2 : 1}
      />

      {/* Larynx / glottis */}
      <g>
        {/* Cartilage */}
        <path d="M 162 110 L 198 110 L 204 138 L 156 138 Z" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        {/* Vocal cord aperture */}
        <ellipse
          cx="180"
          cy="124"
          rx={wGlottic / 2}
          ry="4"
          fill="hsl(var(--primary) / 0.25)"
          stroke={level === "glottic" ? "hsl(var(--destructive))" : "hsl(var(--border))"}
          strokeWidth={level === "glottic" ? 2 : 1}
        />
      </g>

      {/* Chest cavity */}
      <path
        d={`M 80 ${chestTopY} Q 100 ${chestTopY - 8} 180 ${chestTopY - 8} Q 260 ${chestTopY - 8} 280 ${chestTopY} L 270 ${diaphragmY - 10} Q 180 ${diaphragmY + 4} 90 ${diaphragmY - 10} Z`}
        fill="url(#pao-chest)"
        stroke="hsl(var(--clinical))"
        strokeWidth="1.5"
      />
      {/* Diaphragm */}
      <path
        d={`M 90 ${diaphragmY - 10} Q 180 ${diaphragmY + 14} 270 ${diaphragmY - 10}`}
        stroke="hsl(var(--clinical))"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 3"
      />

      {/* Trachea — split into extrathoracic (above chest top) and intrathoracic (below) */}
      {/* Extrathoracic segment */}
      <rect
        x={180 - wExtra / 2}
        y="138"
        width={wExtra}
        height={chestTopY - 138}
        fill="hsl(var(--primary) / 0.18)"
        stroke={level === "extrathoracic" ? "hsl(var(--destructive))" : "hsl(var(--border))"}
        strokeWidth={level === "extrathoracic" ? 2 : 1}
      />
      {/* Sternal notch marker */}
      <line
        x1="155"
        y1={chestTopY}
        x2="205"
        y2={chestTopY}
        stroke="hsl(var(--muted-foreground))"
        strokeDasharray="2 3"
        strokeWidth="0.75"
      />
      <text x="148" y={chestTopY + 3} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">
        sternal notch
      </text>

      {/* Intrathoracic segment */}
      <rect
        x={180 - wIntra / 2}
        y={chestTopY}
        width={wIntra}
        height={diaphragmY - chestTopY - 30}
        fill="hsl(var(--primary) / 0.18)"
        stroke={level === "intrathoracic" ? "hsl(var(--destructive))" : "hsl(var(--border))"}
        strokeWidth={level === "intrathoracic" ? 2 : 1}
      />
      {/* Carina */}
      <path
        d={`M ${180 - wIntra / 2} ${diaphragmY - 30} L 150 ${diaphragmY - 10} M ${180 + wIntra / 2} ${diaphragmY - 30} L 210 ${diaphragmY - 10}`}
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Pleural pressure arrows around intrathoracic trachea */}
      {level === "intrathoracic" && pleuralP > 0.1 && (
        <g stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" opacity={pleuralP}>
          <path d="M 130 230 L 168 230" markerEnd="url(#pao-arrow-r)" />
          <path d="M 230 230 L 192 230" markerEnd="url(#pao-arrow-r)" />
          <text x="115" y="222" fontSize="9" fill="hsl(var(--destructive))" textAnchor="end" stroke="none">
            +Ppl
          </text>
        </g>
      )}
      {/* Atmospheric arrows around extrathoracic trachea */}
      {level === "extrathoracic" && pleuralP < -0.1 && (
        <g stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" opacity={Math.abs(pleuralP)}>
          <path d="M 130 145 L 168 145" markerEnd="url(#pao-arrow-r)" />
          <path d="M 230 145 L 192 145" markerEnd="url(#pao-arrow-r)" />
          <text x="115" y="138" fontSize="9" fill="hsl(var(--destructive))" textAnchor="end" stroke="none">
            P_atm
          </text>
        </g>
      )}

      <defs>
        <marker id="pao-arrow-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>

      {/* Phase label */}
      <g>
        <rect x="10" y="330" width="120" height="22" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <text x="70" y="345" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
          {inInsp ? "Inspiration ↓" : "Expiration ↑"}
        </text>
      </g>
      {/* Lumen meter */}
      <g transform="translate(310, 330)">
        <rect x="0" y="0" width="40" height="22" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <rect
          x="2"
          y="2"
          width={36 * lumen}
          height="18"
          rx="3"
          fill={lumen < 0.4 ? "hsl(var(--destructive))" : "hsl(var(--clinical))"}
        />
        <text x="20" y="-3" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
          lumen
        </text>
      </g>
    </svg>
  );
}

/* -------------------- Flow–Volume Loop -------------------- */

function FlowLoop({
  level,
  t,
  flow,
  inInsp,
}: {
  level: Level;
  t: number;
  flow: number;
  inInsp: boolean;
}) {
  // Build the static envelope path for this lesion (one full loop).
  // x: volume (0..1), y: flow (-1..+1), with expiration above zero on display
  const N = 60;
  const points: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    // first half = expiration (volume from TLC=0 to RV=1, flow positive)
    // second half = inspiration (volume from RV=1 back to TLC=0, flow negative)
    let vol: number, fl: number;
    if (u < 0.5) {
      vol = u * 2; // 0 → 1
      const base = Math.sin(Math.PI * (u * 2)) * 1.0; // peak ~1
      fl = base;
      if (level === "intrathoracic") fl = Math.min(fl, 0.4); // flattened expiratory limb
    } else {
      vol = 1 - (u - 0.5) * 2; // 1 → 0
      const base = -Math.sin(Math.PI * ((u - 0.5) * 2));
      fl = base;
      if (level === "extrathoracic" || level === "supraglottic" || level === "glottic") {
        fl = Math.max(fl, -0.4); // flattened inspiratory limb
      }
    }
    points.push([vol, fl]);
  }

  const W = 240;
  const H = 140;
  const padX = 24;
  const padY = 14;
  const x = (v: number) => padX + v * (W - padX * 2);
  const y = (f: number) => H / 2 - f * (H / 2 - padY);

  const pathD =
    "M " + points.map(([v, f]) => `${x(v).toFixed(1)} ${y(f).toFixed(1)}`).join(" L ");

  // Marker position based on t & current flow
  // Approximate volume from phase
  const I_FRAC = 0.4;
  const phaseProgress = inInsp ? t / I_FRAC : (t - I_FRAC) / (1 - I_FRAC);
  const vol = inInsp ? 1 - phaseProgress : phaseProgress; // insp: TLC←RV, exp: TLC→RV
  // Display flow on graph: expiration positive, inspiration negative
  const displayFlow = inInsp ? -Math.abs(flow) : Math.abs(flow);

  return (
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* Axes */}
      <line x1={padX} y1={H / 2} x2={W - padX} y2={H / 2} stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1={padX} y1={padY} x2={padX} y2={H - padY} stroke="hsl(var(--border))" strokeWidth="1" />
      <text x={W - padX} y={H / 2 - 3} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">
        Volume →
      </text>
      <text x={padX + 4} y={padY + 8} fontSize="8" fill="hsl(var(--muted-foreground))">
        Exp ↑
      </text>
      <text x={padX + 4} y={H - padY - 2} fontSize="8" fill="hsl(var(--muted-foreground))">
        Insp ↓
      </text>

      {/* Loop envelope */}
      <path d={pathD} stroke="hsl(var(--clinical))" strokeWidth="1.5" fill="none" />

      {/* Animated marker */}
      <circle cx={x(vol)} cy={y(displayFlow)} r="4" fill="hsl(var(--primary))" />
    </svg>
  );
}
