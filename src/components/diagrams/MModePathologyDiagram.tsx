import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

type Pathology = "sam" | "bbump" | "flutter" | "midClosure" | "doming";

interface PathologyDef {
  id: Pathology;
  label: string;
  short: string;
  cursor: string; // where M-mode beam is placed
  findings: string[];
  mechanism: string;
  clinical: string;
  associations: string[];
}

const pathologies: PathologyDef[] = [
  {
    id: "sam",
    label: "SAM in HOCM",
    short: "Systolic anterior motion",
    cursor: "M-mode through MV leaflet tips",
    findings: [
      "Anterior motion of AMVL toward IVS in mid-systole",
      "AMVL contacts septum (SAM-septal contact)",
      "Asymmetric septal hypertrophy (IVS:PW > 1.3)",
      "Mid-systolic notch on AV M-mode (secondary)",
    ],
    mechanism:
      "Hypertrophied basal septum narrows LVOT → high-velocity flow → Venturi effect drags AMVL anteriorly into LVOT → dynamic obstruction + posteriorly-directed MR jet.",
    clinical: "Worsened by ↓preload, ↓afterload, ↑contractility (e.g. hypovolaemia, vasoplegia, inotropes).",
    associations: ["HOCM", "Post-MVR (rare)", "Hyperdynamic LV in sepsis"],
  },
  {
    id: "bbump",
    label: "B-bump (↑LVEDP)",
    short: "AMVL B-notch",
    cursor: "M-mode through MV leaflet tips",
    findings: [
      "Notch (B-bump) on A–C closure line of AMVL",
      "Delayed mitral valve closure",
      "Often biphasic A-wave",
      "Associated dilated LV / impaired relaxation",
    ],
    mechanism:
      "Elevated LVEDP exceeds LA pressure during late diastole → premature partial MV closure with subsequent re-opening as LV contracts → 'B-bump' on closure slope.",
    clinical: "Marker of decompensated LV failure, severe AR with high LVEDP, or 1° MR with elevated filling pressures.",
    associations: ["Decompensated HF", "Severe AR", "Restrictive cardiomyopathy"],
  },
  {
    id: "flutter",
    label: "Fluttering AMVL (severe AR)",
    short: "Diastolic flutter",
    cursor: "M-mode through MV leaflet tips",
    findings: [
      "High-frequency diastolic fluttering of AMVL",
      "Premature MV closure if very severe AR",
      "LV dilatation with hyperdynamic septum",
      "Reverse doming of AMVL",
    ],
    mechanism:
      "Regurgitant AR jet strikes AMVL during diastole → leaflet vibrates at high frequency. Severe AR raises LVEDP rapidly → MV may close before atrial systole.",
    clinical: "Diagnostic of significant AR. Premature MV closure mandates urgent valve assessment.",
    associations: ["Acute severe AR (endocarditis, dissection)", "Chronic decompensated AR"],
  },
  {
    id: "midClosure",
    label: "Mid-systolic AV closure",
    short: "AV 'notch' / fluttering",
    cursor: "M-mode through aortic valve cusps",
    findings: [
      "Normal early-systolic AV opening (box-car)",
      "Mid-systolic partial closure (notch)",
      "Coarse fluttering of cusps in late systole",
      "Often paired with SAM on MV M-mode",
    ],
    mechanism:
      "Dynamic LVOT obstruction (HOCM, hypovolaemic hyperdynamic LV) reduces transvalvular flow mid-systole → cusps drift toward closure then re-open as obstruction transiently relieved.",
    clinical: "Strong sign of dynamic LVOT obstruction. Fixed mid-systolic closure also seen in fixed sub-aortic membrane.",
    associations: ["HOCM", "Hyperdynamic septic / post-MI LV", "Subaortic membrane"],
  },
  {
    id: "doming",
    label: "MS — doming AMVL",
    short: "Prolonged E-F slope",
    cursor: "M-mode through MV leaflet tips",
    findings: [
      "Reduced E-F slope (<35 mm/s; severe <15 mm/s)",
      "Anterior 'doming' of AMVL in diastole",
      "Paradoxical anterior motion of PMVL (moves with AMVL)",
      "Thickened, calcified leaflets; LA dilatation",
    ],
    mechanism:
      "Fused commissures restrict leaflet excursion → blood forced through narrow orifice → pressure gradient holds AMVL domed open. PMVL pulled anteriorly by tethered chordae.",
    clinical: "E-F slope estimates severity (historical). Now use planimetry / pressure half-time.",
    associations: ["Rheumatic MS", "Severe MAC", "Congenital MS"],
  },
];

const W = 700;
const H = 220;
const SWEEP_MS = 4000;
const HR_BPM = 75;
const CYCLE_MS = 60_000 / HR_BPM;

// Background helpers
const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(80,140,80,0.18)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= W; x += 35) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 22) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
};

// Pathology-specific trace functions returning y for given (cycle phase t∈[0,1], baseline)
type TraceFn = (t: number) => { ivs: number; pw: number; amvl: number; pmvl: number; av1?: number; av2?: number };

const traceSAM: TraceFn = (t) => {
  // Hypertrophied septum (thick), AMVL pulled anteriorly mid-systole
  const ivs = 70 + 4 * Math.sin(t * Math.PI * 2); // thick septum, small motion
  const pw = 175 + 5 * Math.sin(t * Math.PI * 2 + Math.PI);
  // AMVL: normal diastolic open, but mid-systole moves anteriorly toward IVS
  let amvl: number;
  if (t < 0.35) {
    // Diastole: E peak at 0.05, A peak at 0.28
    const eBump = Math.exp(-Math.pow((t - 0.05) / 0.04, 2)) * 55;
    const aBump = Math.exp(-Math.pow((t - 0.26) / 0.04, 2)) * 35;
    amvl = 145 - eBump - aBump;
  } else {
    // Systole — SAM: leaflet pulled anteriorly toward septum (75)
    const samProgress = Math.min(1, Math.max(0, (t - 0.4) / 0.15));
    const samRelease = Math.min(1, Math.max(0, (t - 0.7) / 0.2));
    amvl = 145 - samProgress * 65 + samRelease * 65;
  }
  const pmvl = 165 + (t < 0.35 ? -10 * Math.exp(-Math.pow((t - 0.05) / 0.05, 2)) : 0);
  return { ivs, pw, amvl, pmvl };
};

const traceBbump: TraceFn = (t) => {
  const ivs = 80 + 6 * Math.sin(t * Math.PI * 2);
  const pw = 175 + 8 * Math.sin(t * Math.PI * 2 + Math.PI);
  // AMVL with B-bump on closure line
  let amvl: number;
  if (t < 0.08) {
    amvl = 145 - Math.exp(-Math.pow((t - 0.04) / 0.03, 2)) * 55; // E
  } else if (t < 0.22) {
    amvl = 145 - Math.exp(-Math.pow((t - 0.18) / 0.035, 2)) * 38; // A
  } else if (t < 0.34) {
    // Closure line C with B-bump (notch)
    const closeProgress = (t - 0.22) / 0.12;
    const bbump = Math.exp(-Math.pow((t - 0.28) / 0.015, 2)) * 14;
    amvl = 145 - 30 * (1 - closeProgress) + bbump;
  } else {
    amvl = 145; // Closed
  }
  const pmvl = 162;
  return { ivs, pw, amvl, pmvl };
};

const traceFlutter: TraceFn = (t) => {
  const ivs = 78 + 10 * Math.sin(t * Math.PI * 2); // hyperdynamic
  const pw = 180 + 10 * Math.sin(t * Math.PI * 2 + Math.PI);
  // AMVL: high-frequency flutter superimposed on diastolic excursion
  let amvl: number;
  if (t < 0.32) {
    const eBump = Math.exp(-Math.pow((t - 0.05) / 0.04, 2)) * 55;
    const aBump = Math.exp(-Math.pow((t - 0.24) / 0.035, 2)) * 25;
    const flutter = Math.sin(t * 180) * 4 * (t > 0.05 && t < 0.3 ? 1 : 0);
    amvl = 145 - eBump - aBump + flutter;
    // Premature closure if very severe (visualised)
    if (t > 0.27) amvl = 145 - Math.max(0, 25 - (t - 0.27) * 600);
  } else {
    amvl = 145;
  }
  const pmvl = 162;
  return { ivs, pw, amvl, pmvl };
};

const traceMidClosure: TraceFn = (t) => {
  const ivs = 75 + 5 * Math.sin(t * Math.PI * 2);
  const pw = 178 + 6 * Math.sin(t * Math.PI * 2 + Math.PI);
  // AV cusps: opens (box-car) then mid-systolic closure / flutter
  let av1 = 110; // anterior cusp baseline (closed)
  let av2 = 130; // posterior cusp baseline
  if (t >= 0.35 && t < 0.72) {
    const phase = (t - 0.35) / 0.37;
    // open at start
    let opening = 1;
    if (phase < 0.15) opening = phase / 0.15;
    else if (phase > 0.4 && phase < 0.55) {
      // mid-systolic partial closure
      opening = 1 - (phase - 0.4) / 0.15 * 0.5;
    } else if (phase >= 0.55 && phase < 0.7) {
      opening = 0.5 + (phase - 0.55) / 0.15 * 0.4;
    } else if (phase > 0.85) {
      opening = 0.9 * (1 - (phase - 0.85) / 0.15);
    } else {
      opening = 0.9;
    }
    // Coarse flutter in late systole
    const flutter = phase > 0.5 ? Math.sin(t * 90) * 2.5 : 0;
    av1 = 110 - opening * 12 + flutter;
    av2 = 130 + opening * 12 - flutter;
  }
  const amvl = 145; // not the focus
  const pmvl = 160;
  return { ivs, pw, amvl, pmvl, av1, av2 };
};

const traceDoming: TraceFn = (t) => {
  const ivs = 78 + 4 * Math.sin(t * Math.PI * 2);
  const pw = 178 + 4 * Math.sin(t * Math.PI * 2 + Math.PI);
  // Doming AMVL: opens but stays "domed" with very shallow E-F slope
  let amvl: number;
  let pmvl: number;
  if (t < 0.4) {
    // Slow E rise then very flat slope (prolonged E-F)
    const open = Math.min(1, t / 0.06);
    const decay = Math.max(0, 1 - (t - 0.06) * 0.4); // very slow decay
    amvl = 145 - 50 * open * (0.6 + 0.4 * decay);
    // PMVL moves WITH AMVL (anteriorly) — paradoxical
    pmvl = 162 - 18 * open * (0.6 + 0.4 * decay);
  } else {
    const close = Math.min(1, (t - 0.4) / 0.1);
    amvl = 145 - 30 * (1 - close);
    pmvl = 162 - 10 * (1 - close);
  }
  // Thicker leaflet line drawn in render
  return { ivs, pw, amvl, pmvl };
};

const traceMap: Record<Pathology, TraceFn> = {
  sam: traceSAM,
  bbump: traceBbump,
  flutter: traceFlutter,
  midClosure: traceMidClosure,
  doming: traceDoming,
};

const MModePathologyDiagram = () => {
  const [selected, setSelected] = useState<Pathology>("sam");
  const [paused, setPaused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ start: performance.now(), lastX: 0, lastVals: null as ReturnType<TraceFn> | null });

  const def = pathologies.find((p) => p.id === selected)!;

  // Reset when pathology changes
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    drawGrid(ctx);
    stateRef.current = { start: performance.now(), lastX: 0, lastVals: null };
  }, [selected]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (paused) {
        lastTime = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = now - lastTime;
      lastTime = now;
      const elapsed = (now - stateRef.current.start) % SWEEP_MS;
      const x = (elapsed / SWEEP_MS) * W;

      // If wrapped, clear
      if (x < stateRef.current.lastX) {
        drawGrid(ctx);
        stateRef.current.lastVals = null;
      }

      // Erase the upcoming column (sweep effect)
      const eraseW = Math.max(2, (W * dt) / SWEEP_MS + 6);
      ctx.fillStyle = "#000";
      ctx.fillRect(x, 0, eraseW + 8, H);
      // re-grid that segment
      ctx.strokeStyle = "rgba(80,140,80,0.18)";
      ctx.lineWidth = 0.5;
      for (let xx = Math.floor(x / 35) * 35; xx <= x + eraseW + 8; xx += 35) {
        ctx.beginPath();
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += 22) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + eraseW + 8, y);
        ctx.stroke();
      }

      // Compute current values
      const t = ((elapsed % CYCLE_MS) / CYCLE_MS);
      const fn = traceMap[selected];
      const vals = fn(t);
      const prev = stateRef.current.lastVals ?? vals;

      const drawSeg = (y1: number, y2: number, color: string, width: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(stateRef.current.lastX, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      };

      // IVS + PW (myocardial walls) — bright bands
      drawSeg(prev.ivs, vals.ivs, "#d8d8a8", 2.2);
      drawSeg(prev.ivs - 8, vals.ivs - 8, "rgba(216,216,168,0.5)", 1);
      drawSeg(prev.pw, vals.pw, "#d8d8a8", 2.2);
      drawSeg(prev.pw + 8, vals.pw + 8, "rgba(216,216,168,0.5)", 1);

      // Hypertrophy stripe for SAM/midClosure
      if (selected === "sam" || selected === "midClosure") {
        for (let off = 2; off < 14; off += 2) {
          drawSeg(prev.ivs + off, vals.ivs + off, "rgba(216,216,168,0.35)", 1);
        }
      }

      // AMVL trace
      const amvlColor =
        selected === "doming" ? "#fff8d0" : "#fff8d0";
      const amvlWidth = selected === "doming" ? 2.2 : 1.4;
      drawSeg(prev.amvl, vals.amvl, amvlColor, amvlWidth);

      // PMVL trace (only in pathologies where it's relevant)
      if (selected === "doming" || selected === "sam") {
        drawSeg(prev.pmvl, vals.pmvl, "#fff8d0", selected === "doming" ? 1.8 : 1.2);
      } else if (selected === "bbump" || selected === "flutter") {
        drawSeg(prev.pmvl, vals.pmvl, "rgba(255,248,208,0.4)", 0.9);
      }

      // AV cusps for midClosure
      if (selected === "midClosure" && vals.av1 != null && vals.av2 != null && prev.av1 != null && prev.av2 != null) {
        drawSeg(prev.av1, vals.av1, "#fff8d0", 1.5);
        drawSeg(prev.av2, vals.av2, "#fff8d0", 1.5);
      }

      // Sweep cursor
      ctx.strokeStyle = "rgba(255,107,107,0.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + eraseW + 6, 0);
      ctx.lineTo(x + eraseW + 6, H);
      ctx.stroke();

      stateRef.current.lastVals = vals;
      stateRef.current.lastX = x;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [selected, paused]);

  // Annotation overlays per pathology
  const annotations: Record<Pathology, { x: number; y: number; label: string; color?: string }[]> = {
    sam: [
      { x: 0.46, y: 0.36, label: "SAM", color: "#ff6b6b" },
      { x: 0.05, y: 0.15, label: "thick IVS" },
      { x: 0.08, y: 0.55, label: "E" },
    ],
    bbump: [
      { x: 0.28, y: 0.62, label: "B-bump", color: "#ff6b6b" },
      { x: 0.05, y: 0.45, label: "E" },
      { x: 0.18, y: 0.55, label: "A" },
    ],
    flutter: [
      { x: 0.18, y: 0.62, label: "flutter", color: "#ff6b6b" },
      { x: 0.28, y: 0.72, label: "premature closure", color: "#ff6b6b" },
    ],
    midClosure: [
      { x: 0.5, y: 0.5, label: "mid-systolic notch", color: "#ff6b6b" },
      { x: 0.6, y: 0.62, label: "cusp flutter", color: "#ff6b6b" },
      { x: 0.4, y: 0.42, label: "AV opens" },
    ],
    doming: [
      { x: 0.18, y: 0.5, label: "↓ E-F slope", color: "#ff6b6b" },
      { x: 0.1, y: 0.42, label: "domed AMVL" },
      { x: 0.22, y: 0.62, label: "PMVL anterior →", color: "#ff6b6b" },
    ],
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-foreground">M-mode Pathology Gallery</h2>
            <p className="text-sm text-muted-foreground">Classic abnormal M-mode patterns — animated in real time.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setPaused((p) => !p)} className="text-xs gap-1.5">
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {paused ? "Resume" : "Pause"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {pathologies.map((p) => (
            <Button key={p.id} variant={selected === p.id ? "default" : "outline"} size="sm" onClick={() => setSelected(p.id)} className="text-xs">
              {p.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-4">
          <div>
            <div className="relative rounded-md overflow-hidden border border-border bg-black">
              <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto block" />
              {/* Annotation overlay */}
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Side scale */}
                <g fontFamily="system-ui, sans-serif">
                  <text x="6" y="14" fontSize="9" fill="hsl(var(--accent))" opacity="0.7">RV/IVS</text>
                  <text x="6" y={H - 6} fontSize="9" fill="hsl(var(--accent))" opacity="0.7">PW/posterior</text>
                  <text x={W - 6} y="14" fontSize="9" fill="hsl(var(--destructive))" textAnchor="end">{def.short}</text>
                  <text x={W - 6} y={H - 6} fontSize="8" fill="hsl(var(--accent))" opacity="0.6" textAnchor="end">sweep ≈ 4 s · 75 bpm</text>
                </g>
                {annotations[selected].map((a, i) => (
                  <g key={i}>
                    <text x={a.x * W} y={a.y * H} fontSize="10" fontWeight="700" fill={a.color ?? "#fff8d0"} style={{ paintOrder: "stroke", stroke: "#000", strokeWidth: 2 }}>
                      {a.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5 italic">{def.cursor}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-md border border-border bg-secondary/30">
              <p className="font-semibold text-foreground mb-1">Findings</p>
              <ul className="space-y-1 text-muted-foreground">
                {def.findings.map((f) => (
                  <li key={f} className="flex gap-1.5"><span className="text-primary">•</span><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-md border border-primary/20 bg-primary/5">
              <p className="font-semibold text-foreground mb-1">Mechanism</p>
              <p className="text-muted-foreground leading-relaxed">{def.mechanism}</p>
            </div>
            <div className="p-3 rounded-md border border-destructive/20 bg-destructive/5">
              <p className="font-semibold text-foreground mb-1">Clinical pearl</p>
              <p className="text-muted-foreground leading-relaxed">{def.clinical}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Associations</p>
              <div className="flex flex-wrap gap-1">
                {def.associations.map((a) => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MModePathologyDiagram;
