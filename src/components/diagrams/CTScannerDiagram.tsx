import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

/**
 * Animated CT scanner diagram.
 *
 * Three synchronised panels:
 *   1. Axial gantry view — X-ray tube + detector arc rotating around the patient,
 *      fan beam traced through tissue at each projection angle.
 *   2. Helical (z-axis) view — patient on a couch travelling through the gantry
 *      while the focal spot traces a helix; pitch annotated.
 *   3. Sinogram → reconstructed image — projections accumulate as columns in the
 *      sinogram, and the back-projected image fills in as more angles are sampled.
 */
export const CTScannerDiagram = () => {
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0); // 0 → 1 over ~6s, then loops
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      setT((prev) => (prev + dt / 6) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  // Gantry rotation: 2 full rotations per loop
  const angle = t * 2 * Math.PI * 2; // radians

  // ─── Panel 1: Axial gantry ─────────────────────────────────────────────
  const cx = 100;
  const cy = 100;
  const gantryR = 78;
  const tubeR = 70;
  const detR = 70;
  const tx = cx + tubeR * Math.cos(angle - Math.PI / 2);
  const ty = cy + tubeR * Math.sin(angle - Math.PI / 2);
  const dxC = cx + detR * Math.cos(angle + Math.PI / 2);
  const dyC = cy + detR * Math.sin(angle + Math.PI / 2);
  // Detector arc endpoints (±28° from centre)
  const arcSpan = (28 * Math.PI) / 180;
  const a1 = angle + Math.PI / 2 - arcSpan;
  const a2 = angle + Math.PI / 2 + arcSpan;
  const ax1 = cx + detR * Math.cos(a1);
  const ay1 = cy + detR * Math.sin(a1);
  const ax2 = cx + detR * Math.cos(a2);
  const ay2 = cy + detR * Math.sin(a2);
  // Fan beam rays
  const fanRays = Array.from({ length: 9 }, (_, i) => {
    const frac = i / 8;
    const aRay = a1 + (a2 - a1) * frac;
    return {
      x: cx + detR * Math.cos(aRay),
      y: cy + detR * Math.sin(aRay),
    };
  });

  // ─── Panel 2: Helical acquisition ──────────────────────────────────────
  // Patient/couch travels right→left as gantry rotates. Helix traced behind.
  const helixSteps = 90;
  const helixPath = Array.from({ length: helixSteps }, (_, i) => {
    const frac = i / (helixSteps - 1);
    const phase = frac * angle * 0.8;
    const z = 30 + frac * 180;
    const y = 60 + 22 * Math.sin(phase);
    return `${i === 0 ? "M" : "L"} ${z} ${y}`;
  }).join(" ");
  const tableX = 30 + (t * 180) % 180;

  // ─── Panel 3: Sinogram + reconstruction ────────────────────────────────
  // As t advances, more sinogram columns become visible, and reconstruction sharpens.
  const sinoCols = 60;
  const filledCols = Math.floor(t * sinoCols);
  const reconAlpha = Math.min(1, t * 1.15);

  return (
    <div className="my-6 rounded-xl border border-border bg-muted/30 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground leading-tight">
            CT scanner — gantry, helix &amp; reconstruction
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Rotating tube + detector arc → projections → sinogram → back-projected image.
          </p>
        </div>
        <div className="flex gap-1.5">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setPlaying((p) => !p)}
            className="h-7 px-2 text-xs"
          >
            {playing ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setT(0);
              lastRef.current = null;
            }}
            className="h-7 px-2 text-xs"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* ─── Panel 1: Axial gantry ─── */}
        <figure className="rounded-lg border border-border bg-background/80 p-2">
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            {/* Gantry housing */}
            <circle
              cx={cx}
              cy={cy}
              r={gantryR + 10}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle
              cx={cx}
              cy={cy}
              r={gantryR}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={0.5}
              opacity={0.5}
            />
            {/* Patient cross-section */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={26}
              ry={20}
              fill="hsl(var(--accent) / 0.15)"
              stroke="hsl(var(--accent))"
              strokeWidth={1}
            />
            <circle cx={cx - 8} cy={cy - 4} r={4} fill="hsl(var(--accent) / 0.4)" />
            <circle cx={cx + 9} cy={cy + 3} r={3} fill="hsl(var(--accent) / 0.4)" />
            {/* Fan beam */}
            <g opacity={0.85}>
              {fanRays.map((r, i) => (
                <line
                  key={i}
                  x1={tx}
                  y1={ty}
                  x2={r.x}
                  y2={r.y}
                  stroke="hsl(45 95% 60%)"
                  strokeWidth={0.6}
                  opacity={0.55}
                />
              ))}
            </g>
            {/* Detector arc */}
            <path
              d={`M ${ax1} ${ay1} A ${detR} ${detR} 0 0 0 ${ax2} ${ay2}`}
              fill="none"
              stroke="hsl(195 80% 55%)"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Detector centre marker */}
            <circle cx={dxC} cy={dyC} r={2} fill="hsl(195 80% 55%)" />
            {/* X-ray tube */}
            <g>
              <circle cx={tx} cy={ty} r={6} fill="hsl(25 85% 55%)" stroke="hsl(var(--foreground))" strokeWidth={0.5} />
              <text x={tx} y={ty + 1.5} textAnchor="middle" fontSize={5} fill="hsl(var(--background))" fontWeight={700}>
                T
              </text>
            </g>
            {/* Labels */}
            <text x={cx} y={14} textAnchor="middle" fontSize={7} fill="hsl(var(--muted-foreground))" fontWeight={600}>
              GANTRY ROTATION
            </text>
            <text x={cx} y={194} textAnchor="middle" fontSize={6} fill="hsl(var(--muted-foreground))">
              tube + detector rotate ~0.25–0.5 s/turn
            </text>
          </svg>
          <figcaption className="text-[10px] text-muted-foreground text-center mt-1">
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: "hsl(25 85% 55%)" }} />
            tube
            <span className="inline-block w-2 h-2 rounded-full ml-2 mr-1" style={{ background: "hsl(195 80% 55%)" }} />
            detector arc
            <span className="inline-block w-2 h-2 rounded-full ml-2 mr-1" style={{ background: "hsl(45 95% 60%)" }} />
            fan beam
          </figcaption>
        </figure>

        {/* ─── Panel 2: Helical acquisition ─── */}
        <figure className="rounded-lg border border-border bg-background/80 p-2">
          <svg viewBox="0 0 220 200" className="w-full h-auto">
            <text x={110} y={14} textAnchor="middle" fontSize={7} fill="hsl(var(--muted-foreground))" fontWeight={600}>
              HELICAL ACQUISITION
            </text>
            {/* Gantry (side-on, simplified as two rings) */}
            <ellipse cx={110} cy={90} rx={18} ry={55} fill="none" stroke="hsl(var(--border))" strokeWidth={1.5} />
            <ellipse cx={110} cy={90} rx={14} ry={48} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth={0.6} opacity={0.5} />
            {/* Z-axis */}
            <line x1={20} y1={150} x2={210} y2={150} stroke="hsl(var(--border))" strokeWidth={0.6} strokeDasharray="2 2" />
            <text x={210} y={160} textAnchor="end" fontSize={6} fill="hsl(var(--muted-foreground))">
              z (table travel)
            </text>
            {/* Helix trace */}
            <path d={helixPath} fill="none" stroke="hsl(25 85% 55%)" strokeWidth={1.2} opacity={0.55} />
            {/* Couch */}
            <rect
              x={tableX - 35}
              y={88}
              width={70}
              height={6}
              rx={2}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth={0.5}
            />
            {/* Patient on couch */}
            <ellipse
              cx={tableX}
              cy={84}
              rx={28}
              ry={5}
              fill="hsl(var(--accent) / 0.3)"
              stroke="hsl(var(--accent))"
              strokeWidth={0.8}
            />
            <circle cx={tableX + 25} cy={84} r={3.5} fill="hsl(var(--accent) / 0.5)" />
            {/* Travel arrow */}
            <line x1={tableX + 40} y1={120} x2={tableX + 60} y2={120} stroke="hsl(var(--foreground))" strokeWidth={1} markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={4} markerHeight={4} orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--foreground))" />
              </marker>
            </defs>
            {/* Pitch annotation */}
            <text x={110} y={178} textAnchor="middle" fontSize={6.5} fill="hsl(var(--muted-foreground))">
              pitch = table travel/rotation ÷ beam width
            </text>
            <text x={110} y={188} textAnchor="middle" fontSize={6} fill="hsl(var(--muted-foreground))" fontStyle="italic">
              MDCT: 64–320 detector rows along z
            </text>
          </svg>
          <figcaption className="text-[10px] text-muted-foreground text-center mt-1">
            continuous tube rotation + couch translation → helical path
          </figcaption>
        </figure>

        {/* ─── Panel 3: Sinogram → reconstruction ─── */}
        <figure className="rounded-lg border border-border bg-background/80 p-2">
          <svg viewBox="0 0 220 200" className="w-full h-auto">
            <text x={110} y={14} textAnchor="middle" fontSize={7} fill="hsl(var(--muted-foreground))" fontWeight={600}>
              SINOGRAM → IMAGE
            </text>

            {/* Sinogram frame */}
            <rect x={15} y={28} width={90} height={75} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={1} />
            <text x={60} y={25} textAnchor="middle" fontSize={6} fill="hsl(var(--muted-foreground))">
              sinogram (θ vs detector)
            </text>
            {/* Sinogram content — sinusoidal traces */}
            {Array.from({ length: filledCols }).map((_, i) => {
              const x = 15 + (i / sinoCols) * 90;
              const theta = (i / sinoCols) * Math.PI;
              return (
                <g key={i} opacity={0.85}>
                  {[0, 1, 2].map((k) => {
                    const offset = [0, -8, 6][k];
                    const amp = [18, 10, 14][k];
                    const y = 28 + 37.5 + amp * Math.sin(2 * theta + offset * 0.3);
                    const intensity = [0.9, 0.6, 0.75][k];
                    return (
                      <rect
                        key={k}
                        x={x}
                        y={y - 0.6}
                        width={1.6}
                        height={1.2}
                        fill={`hsl(195 80% 55% / ${intensity})`}
                      />
                    );
                  })}
                </g>
              );
            })}
            {/* Sinogram axes */}
            <text x={12} y={32} textAnchor="end" fontSize={5} fill="hsl(var(--muted-foreground))">θ=0</text>
            <text x={12} y={103} textAnchor="end" fontSize={5} fill="hsl(var(--muted-foreground))">π</text>

            {/* Arrow → reconstruction */}
            <line x1={110} y1={65} x2={130} y2={65} stroke="hsl(var(--foreground))" strokeWidth={1} markerEnd="url(#arrow2)" />
            <defs>
              <marker id="arrow2" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={4} markerHeight={4} orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--foreground))" />
              </marker>
            </defs>
            <text x={120} y={58} textAnchor="middle" fontSize={5} fill="hsl(var(--muted-foreground))">
              FBP / iter.
            </text>

            {/* Reconstructed image */}
            <rect x={135} y={28} width={75} height={75} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={1} />
            {/* Background blur as projections accumulate */}
            <g opacity={reconAlpha}>
              {/* Skull */}
              <ellipse cx={172.5} cy={65} rx={32} ry={32} fill="hsl(0 0% 90%)" />
              {/* Brain */}
              <ellipse cx={172.5} cy={66} rx={26} ry={26} fill="hsl(0 0% 55%)" />
              {/* Ventricles */}
              <ellipse cx={168} cy={62} rx={3} ry={6} fill="hsl(0 0% 20%)" />
              <ellipse cx={177} cy={62} rx={3} ry={6} fill="hsl(0 0% 20%)" />
              {/* Falx */}
              <line x1={172.5} y1={40} x2={172.5} y2={92} stroke="hsl(0 0% 75%)" strokeWidth={0.5} />
            </g>
            {/* Streak artefacts when undersampled */}
            {filledCols < sinoCols * 0.6 && (
              <g opacity={(1 - filledCols / (sinoCols * 0.6)) * 0.4}>
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI;
                  const x1 = 172.5 + 32 * Math.cos(a);
                  const y1 = 65 + 32 * Math.sin(a);
                  const x2 = 172.5 - 32 * Math.cos(a);
                  const y2 = 65 - 32 * Math.sin(a);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(195 80% 55%)"
                      strokeWidth={0.4}
                    />
                  );
                })}
              </g>
            )}
            {/* HU colour bar */}
            <rect x={135} y={112} width={75} height={4} fill="url(#huGrad)" stroke="hsl(var(--border))" strokeWidth={0.4} />
            <defs>
              <linearGradient id="huGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="hsl(0 0% 5%)" />
                <stop offset="50%" stopColor="hsl(0 0% 50%)" />
                <stop offset="100%" stopColor="hsl(0 0% 95%)" />
              </linearGradient>
            </defs>
            <text x={135} y={123} fontSize={5} fill="hsl(var(--muted-foreground))">−1000</text>
            <text x={172.5} y={123} textAnchor="middle" fontSize={5} fill="hsl(var(--muted-foreground))">0 (water)</text>
            <text x={210} y={123} textAnchor="end" fontSize={5} fill="hsl(var(--muted-foreground))">+1000 HU</text>

            {/* Progress label */}
            <text x={110} y={145} textAnchor="middle" fontSize={6} fill="hsl(var(--muted-foreground))">
              {`projections sampled: ${filledCols} / ${sinoCols}`}
            </text>
            <text x={110} y={156} textAnchor="middle" fontSize={5.5} fill="hsl(var(--muted-foreground))" fontStyle="italic">
              streaks fade as angular coverage approaches π
            </text>

            {/* Progress bar */}
            <rect x={20} y={170} width={180} height={3} rx={1.5} fill="hsl(var(--muted))" />
            <rect x={20} y={170} width={180 * (filledCols / sinoCols)} height={3} rx={1.5} fill="hsl(195 80% 55%)" />
          </svg>
          <figcaption className="text-[10px] text-muted-foreground text-center mt-1">
            each projection adds one column to the sinogram → image sharpens with angular coverage
          </figcaption>
        </figure>
      </div>

      <p className="text-[11px] text-muted-foreground italic leading-snug">
        Schematic. One full π of projection angles is sufficient to reconstruct a slice (parallel-beam
        equivalence); helical MDCT interleaves z-axis coverage so every slice receives the required
        angular sampling as the patient travels through the gantry.
      </p>
    </div>
  );
};

export default CTScannerDiagram;
