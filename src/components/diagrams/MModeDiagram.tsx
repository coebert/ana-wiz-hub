import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Track = "lv" | "mv" | "ao";

const SWEEP_MS = 4000; // one full sweep across the panel
const HR = 75; // bpm
const CYCLE_MS = 60000 / HR; // ~800 ms per cardiac cycle

const MModeDiagram = () => {
  const [track, setTrack] = useState<Track>("lv");
  const [running, setRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());
  const lastXRef = useRef<number>(0);

  // Panel layout (logical units, scaled to canvas size)
  const W = 600;
  const H = 260;

  // Returns y position (0..1, 0=top) for the M-mode trace at a given cardiac-cycle phase t (0..1)
  // Each track returns up to 4 traces (anterior structure, posterior structure, etc.)
  const traces: Record<Track, { color: string; label: string; fn: (t: number) => number }[]> = {
    lv: [
      // RV anterior wall (top)
      { color: "#fff8d0", label: "RV ant wall", fn: () => 0.18 },
      // IVS — moves posteriorly in systole (down on screen)
      { color: "#ffd070", label: "IVS", fn: (t) => 0.30 + 0.05 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.3)) },
      // LV cavity (no echo) — endocardium of IVS
      { color: "#ffd070", label: "LV endo (sept)", fn: (t) => 0.36 + 0.06 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.3)) },
      // LV posterior wall endo — moves anteriorly (up) in systole
      { color: "#7dfb6e", label: "PW endo", fn: (t) => 0.78 - 0.10 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.3)) },
      // Posterior wall epi (bottom)
      { color: "#fff8d0", label: "PW epi", fn: () => 0.88 },
    ],
    mv: [
      // IVS
      { color: "#ffd070", label: "IVS", fn: (t) => 0.30 + 0.04 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.3)) },
      // Anterior MV leaflet — classic M-shape: E peak (early filling), A peak (atrial kick), C-D closure
      {
        color: "#3acfff",
        label: "AMVL",
        fn: (t) => {
          // diastole occupies ~0.45–0.95 of cycle (after T wave)
          // E wave peak ~0.55, A wave peak ~0.85
          const e = Math.exp(-Math.pow((t - 0.55) / 0.05, 2));
          const a = 0.7 * Math.exp(-Math.pow((t - 0.82) / 0.04, 2));
          const open = 0.40 - 0.18 * (e + a); // upward (anterior) = lower y
          const closed = 0.42;
          // closed during systole (0..0.45)
          const inDiastole = t > 0.45 && t < 0.97;
          return inDiastole ? open : closed;
        },
      },
      // Posterior MV leaflet — mirror image (W-shape)
      {
        color: "#fff04a",
        label: "PMVL",
        fn: (t) => {
          const e = Math.exp(-Math.pow((t - 0.55) / 0.05, 2));
          const a = 0.7 * Math.exp(-Math.pow((t - 0.82) / 0.04, 2));
          const open = 0.50 + 0.10 * (e + a);
          const closed = 0.46;
          const inDiastole = t > 0.45 && t < 0.97;
          return inDiastole ? open : closed;
        },
      },
      // PW endocardium
      { color: "#7dfb6e", label: "PW endo", fn: (t) => 0.78 - 0.08 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.3)) },
    ],
    ao: [
      // Anterior aortic wall (RVOT side) — moves anteriorly (up) in systole
      { color: "#ff7a3a", label: "Ant Ao wall", fn: (t) => 0.32 - 0.06 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.25)) },
      // Aortic valve cusps — closed (single line) in diastole, open (parallel box) in systole
      {
        color: "#fff8d0",
        label: "RCC",
        fn: (t) => {
          // systole 0..0.40
          const inSystole = t < 0.40;
          return inSystole ? 0.36 : 0.43;
        },
      },
      {
        color: "#fff8d0",
        label: "NCC",
        fn: (t) => {
          const inSystole = t < 0.40;
          return inSystole ? 0.50 : 0.43;
        },
      },
      // Posterior aortic wall = anterior LA wall — moves with aorta
      { color: "#ff7a3a", label: "Post Ao / ant LA", fn: (t) => 0.54 - 0.06 * Math.max(0, Math.sin(t * Math.PI * 2 - 0.25)) },
      // Posterior LA wall — relatively fixed, slight expansion in atrial filling (late systole)
      { color: "#c090ff", label: "Post LA wall", fn: (t) => 0.82 + 0.02 * Math.sin(t * Math.PI * 2 + 0.5) },
    ],
  };

  // Reset trace when track changes
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cv.width, cv.height);
    drawGrid(ctx, cv.width, cv.height);
    lastXRef.current = 0;
    startRef.current = performance.now();
  }, [track]);

  function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    // vertical (time) gridlines every 50px
    for (let x = 0; x <= w; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    // horizontal (depth) gridlines every 26px
    for (let y = 0; y <= h; y += 26) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Animate the sweep
  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    // Setup canvas resolution for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    drawGrid(ctx, W, H);

    let lastTime = performance.now();
    lastXRef.current = 0;
    startRef.current = lastTime;

    const draw = (now: number) => {
      const elapsed = now - startRef.current;
      const xNow = (elapsed / SWEEP_MS) * W;
      const xWrapped = xNow % W;
      const lastX = lastXRef.current;

      // Detect wrap → clear panel and redraw grid
      if (xWrapped < lastX) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);
        drawGrid(ctx, W, H);
      }

      // Erase a small leading band ahead of the sweep to give the "wiping" feel
      const eraseW = 18;
      ctx.fillStyle = "#000";
      ctx.fillRect(xWrapped, 0, eraseW, H);
      drawGrid(ctx, W, H);
      // re-draw grid only inside the eraseW band — but easier to just redo whole grid lazily
      // (cheap at 600x260)

      // Draw new segment for each trace between lastX and xWrapped
      const xStart = xWrapped < lastX ? 0 : lastX;
      const xEnd = xWrapped;
      const tracksToDraw = traces[track];
      ctx.lineWidth = 1.6;
      for (const tr of tracksToDraw) {
        ctx.strokeStyle = tr.color;
        ctx.beginPath();
        let started = false;
        for (let x = xStart; x <= xEnd; x += 1) {
          // map screen x to cardiac cycle phase
          const tAbs = startRef.current + (x / W) * SWEEP_MS;
          const cyclePhase = ((tAbs - startRef.current) % CYCLE_MS) / CYCLE_MS;
          // Use elapsed-style mapping so traces look continuous across sweep
          const xToTime = (now - elapsed) + (x / W) * SWEEP_MS; // not strictly needed
          void xToTime;
          // Use absolute elapsed time mapping
          const absTime = (x / W) * SWEEP_MS;
          const phase = (absTime % CYCLE_MS) / CYCLE_MS;
          const y = tr.fn(phase) * H;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
          void cyclePhase;
        }
        ctx.stroke();
      }

      // Draw sweep marker (bright vertical bar leading edge)
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xWrapped + eraseW + 0.5, 0);
      ctx.lineTo(xWrapped + eraseW + 0.5, H);
      ctx.stroke();

      lastXRef.current = xWrapped;
      lastTime = now;
      void lastTime;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, track]);

  // Caliper overlay coordinates per track (logical 600x260, expressed as % so they scale)
  const calipers: Record<Track, { y1: number; y2: number; label: string; value: string; color: string }[]> = {
    lv: [
      { y1: 0.36, y2: 0.78, label: "LVIDd", value: "≈ 4.6 cm (3.9–5.3)", color: "#90ff90" },
      { y1: 0.42, y2: 0.68, label: "LVIDs", value: "≈ 3.0 cm (2.4–3.5) → FS ≈ 35%", color: "#90c0ff" },
    ],
    mv: [
      { y1: 0.22, y2: 0.30, label: "EPSS", value: "<7 mm normal · >7 mm = ↓EF", color: "#ff90b0" },
    ],
    ao: [
      { y1: 0.32, y2: 0.54, label: "Ao root", value: "2.0–3.7 cm", color: "#ffd070" },
      { y1: 0.54, y2: 0.82, label: "LA AP", value: "<4.0 cm normal · >4.7 cm = severe dilatation", color: "#c090ff" },
      { y1: 0.36, y2: 0.50, label: "AV cusp sep", value: "≥1.6 cm normal · <1.0 cm in severe AS", color: "#fff8d0" },
    ],
  };

  const trackInfo: Record<Track, { title: string; cursor: string; teaching: string }> = {
    lv: {
      title: "M-mode through LV (mid-papillary level)",
      cursor: "Cursor placed perpendicular to IVS at chordal level on PLAX, just distal to the MV leaflet tips.",
      teaching:
        "Measures: LVIDd (end-diastole, at QRS) and LVIDs (end-systole, at peak inward motion of PW). FS = (LVIDd − LVIDs) / LVIDd × 100 — normal 25–43%. Teichholz formula gives M-mode-derived EF (limited if RWMA — 2D Simpson's preferred). Also gives IVSd, PWd (LVH if >1.1 cm), relative wall thickness (RWT = 2·PWd/LVIDd; >0.42 = concentric).",
    },
    mv: {
      title: "M-mode through MV anterior leaflet",
      cursor: "Cursor through tip of anterior mitral leaflet on PLAX. Captures classic M-shape (anterior leaflet) and W-shape (posterior leaflet).",
      teaching:
        "E point = peak early diastolic opening (anterior leaflet excursion). EPSS = perpendicular distance from E point to nearest IVS surface. Normal <7 mm. EPSS >7 mm correlates with reduced LVEF (every 1 mm increase ≈ 2% drop in EF). Quick visual ↓EF surrogate when 2D Simpson's not feasible. Other patterns: 'doming' anterior leaflet in MS (loss of M-shape, prolonged E-F slope), SAM (systolic anterior motion) in HOCM.",
    },
    ao: {
      title: "M-mode through aortic root + LA",
      cursor: "Cursor through aortic valve at the level of the sinuses of Valsalva on PLAX. Captures both Ao walls (parallel motion) and posterior LA wall.",
      teaching:
        "Both aortic walls move anteriorly in systole (LV ejection) and posteriorly in diastole — parallel 'box-car' motion. AV cusps form a parallelogram in systole (open) and a single thin line in diastole (closed). LA dimension measured at end-systole (largest). Aortic root measured at end-diastole. LA:Ao ratio normally ~1:1; LA enlargement seen in chronic MR, AF, diastolic dysfunction.",
    },
  };

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">PLAX M-mode — animated sweep</h3>
      <p className="text-sm text-muted-foreground mb-4">Real-time M-mode generation through three classic PLAX cursor positions</p>

      <Tabs value={track} onValueChange={(v) => setTrack(v as Track)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="lv" className="text-xs">LV (LVIDd/s)</TabsTrigger>
          <TabsTrigger value="mv" className="text-xs">MV (EPSS)</TabsTrigger>
          <TabsTrigger value="ao" className="text-xs">Ao root + LA</TabsTrigger>
        </TabsList>

        <TabsContent value={track} forceMount>
          <div className="space-y-3">
            {/* Mini PLAX with cursor line */}
            <div className="bg-background rounded-lg border border-border p-2 grid sm:grid-cols-[1fr_2fr] gap-3 items-center">
              <div>
                <p className="text-[11px] font-bold text-foreground mb-1">Cursor position (PLAX)</p>
                <svg viewBox="0 0 200 140" className="w-full h-auto">
                  <defs>
                    <radialGradient id="mm-bg" cx="50%" cy="0%" r="100%">
                      <stop offset="0%" stopColor="#0a0a0a" />
                      <stop offset="100%" stopColor="#000" />
                    </radialGradient>
                  </defs>
                  <path d="M 100,5 L 30,130 A 100,100 0 0 0 170,130 Z" fill="url(#mm-bg)" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  {/* Simplified anatomy — RV, IVS, LV, PW, MV, Ao, LA */}
                  <path d="M 60,30 Q 100,28 140,32 L 145,52 Q 100,50 65,52 Z" fill="#1a1a1a" stroke="#d8d8a8" strokeWidth="0.6" />
                  <text x="100" y="44" fontSize="6" fill="#fff8d0" textAnchor="middle">RV</text>
                  <path d="M 65,52 Q 100,55 145,57 L 145,63 Q 100,60 65,58 Z" fill="#c8c098" opacity="0.85" />
                  <path d="M 65,58 Q 100,62 145,67 L 160,100 Q 100,108 70,100 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="0.6" />
                  <text x="105" y="90" fontSize="8" fill="#fff8d0" fontWeight="700" textAnchor="middle">LV</text>
                  <path d="M 70,100 Q 100,108 160,100 L 162,108 Q 100,116 70,108 Z" fill="#c8c098" opacity="0.85" />
                  {/* MV */}
                  <path d="M 145,67 Q 150,82 148,95" fill="none" stroke="#fff8d0" strokeWidth="0.7" />
                  <path d="M 160,73 Q 155,87 150,95" fill="none" stroke="#fff8d0" strokeWidth="0.7" />
                  {/* Ao + LA */}
                  <path d="M 145,57 L 170,42 L 178,58 L 175,82 L 160,90 L 145,67 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="0.6" />
                  <text x="162" y="68" fontSize="5" fill="#fff8d0" textAnchor="middle">Ao</text>
                  <path d="M 160,90 Q 178,98 178,118 L 165,128 Q 145,128 142,108 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="0.6" />
                  <text x="160" y="115" fontSize="6" fill="#fff8d0" textAnchor="middle" fontWeight="700">LA</text>
                  {/* Cursor line — varies by track */}
                  {(() => {
                    const cursors: Record<Track, { x: number; label: string }> = {
                      lv: { x: 110, label: "LV" },
                      mv: { x: 148, label: "MV" },
                      ao: { x: 160, label: "Ao+LA" },
                    };
                    const c = cursors[track];
                    return (
                      <g>
                        <line x1={c.x} y1="5" x2={c.x} y2="135" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.95" />
                        <circle cx={c.x} cy="5" r="2" fill="hsl(var(--primary))" />
                        <text x={c.x + 3} y="14" fontSize="6" fill="hsl(var(--primary))" fontWeight="700">{c.label}</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="text-xs space-y-1.5">
                <p className="font-bold text-foreground text-sm">{trackInfo[track].title}</p>
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">Cursor: </span>{trackInfo[track].cursor}</p>
                <button
                  onClick={() => setRunning((r) => !r)}
                  className="px-2 py-1 rounded text-[10px] font-semibold border border-border bg-background text-foreground hover:border-primary/50 transition-colors"
                >
                  {running ? "⏸  Pause sweep" : "▶  Resume sweep"}
                </button>
              </div>
            </div>

            {/* M-mode panel */}
            <div className="relative bg-black rounded-lg border border-border overflow-hidden">
              <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "auto", display: "block", aspectRatio: `${W} / ${H}` }}
                aria-label="Animated M-mode sweep"
              />
              {/* Caliper overlays (positioned with %) */}
              <div className="absolute inset-0 pointer-events-none">
                {calipers[track].map((c, i) => {
                  const top = `${c.y1 * 100}%`;
                  const height = `${(c.y2 - c.y1) * 100}%`;
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{ left: `${4 + i * 14}%`, top, height, width: "10px" }}
                    >
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2" style={{ width: "1px", background: c.color, opacity: 0.85 }} />
                      <div className="absolute top-0 -left-1" style={{ width: "12px", height: "1px", background: c.color }} />
                      <div className="absolute bottom-0 -left-1" style={{ width: "12px", height: "1px", background: c.color }} />
                      <div
                        className="absolute text-[9px] font-bold whitespace-nowrap"
                        style={{ color: c.color, left: "16px", top: "50%", transform: "translateY(-50%)", textShadow: "0 0 4px #000, 0 0 4px #000" }}
                      >
                        {c.label}
                      </div>
                    </div>
                  );
                })}
                {/* Time scale */}
                <div className="absolute bottom-1 right-2 text-[9px] text-white/60">
                  sweep ≈ 4 s · HR {HR} bpm
                </div>
                <div className="absolute top-1 left-2 text-[9px] text-white/60">
                  M-mode · {track === "lv" ? "LV" : track === "mv" ? "MV" : "Ao+LA"}
                </div>
              </div>
            </div>

            {/* Caliper legend + teaching */}
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-background border border-border">
                <p className="font-semibold text-foreground mb-1">Calipers</p>
                <ul className="space-y-1">
                  {calipers[track].map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 mt-1 rounded-sm flex-shrink-0" style={{ background: c.color }} />
                      <span className="text-muted-foreground"><span className="font-semibold text-foreground">{c.label}:</span> {c.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2 rounded bg-primary/10 border border-primary/20">
                <p className="font-semibold text-foreground mb-1">Teaching</p>
                <p className="text-muted-foreground">{trackInfo[track].teaching}</p>
              </div>
            </div>

            <div className="p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Why M-mode? </strong>
              Single-line, ultra-high temporal resolution (~1000 Hz vs ~30–60 Hz for 2D). Ideal for measuring rapid wall and valve motion (LVIDd/s, EPSS, AV cusp separation, mitral leaflet kinetics). Limitations: only one dimension; geometric assumptions for EF (Teichholz) fail with RWMA — use Simpson's biplane in those cases.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MModeDiagram;
