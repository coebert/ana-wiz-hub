import { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

const W = 640;
const H = 360;

/**
 * PCP HRCT Diagram
 *
 * Stylised axial chest CT illustrating the radiological hallmarks of
 * Pneumocystis jirovecii pneumonia:
 *   • Bilateral perihilar / central ground-glass opacification (GGO)
 *   • Relative subpleural sparing
 *   • Upper-zone thin-walled cysts (pneumatoceles) — risk of pneumothorax
 *   • Sparing of pleural effusion / lymphadenopathy (uncommon)
 *
 * Toggle layers ("GGO" / "Cysts") to teach feature recognition. The
 * GGO pulses gently and the cysts have a subtle drift to draw the eye
 * to each pattern in turn.
 */
const PCPHRCTDiagram = () => {
  const [showGGO, setShowGGO] = useState(true);
  const [showCysts, setShowCysts] = useState(true);
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((x) => (x + dt) % 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Pulsing opacity for the GGO halo (0.35..0.7)
  const ggoPulse = 0.35 + 0.175 * (1 + Math.sin(t * 1.6));

  // Slow drift used to give cysts a faint shimmer
  const drift = Math.sin(t * 1.1);

  // Lung outlines (axial section, schematic)
  const leftLung = "M 150 90 C 90 110 70 200 110 290 C 150 320 220 300 230 240 C 240 180 220 110 150 90 Z";
  const rightLung = "M 490 90 C 550 110 570 200 530 290 C 490 320 420 300 410 240 C 400 180 420 110 490 90 Z";

  return (
    <DiagramFigure
      id="pcp-hrct"
      title="HRCT pattern of Pneumocystis pneumonia"
      description="Axial chest CT showing bilateral perihilar ground-glass opacification with subpleural sparing and upper-zone thin-walled cysts."
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={() => setShowGGO((v) => !v)}
          className={`px-3 py-1 text-xs rounded-md border transition-colors ${
            showGGO
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border"
          }`}
          aria-pressed={showGGO}
        >
          Ground-glass
        </button>
        <button
          onClick={() => setShowCysts((v) => !v)}
          className={`px-3 py-1 text-xs rounded-md border transition-colors ${
            showCysts
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border"
          }`}
          aria-pressed={showCysts}
        >
          Cysts
        </button>
        <span className="text-xs text-muted-foreground ml-2">Toggle features to compare patterns</span>
      </div>

      <svg
        role="img"
        aria-labelledby="pcp-hrct-title pcp-hrct-desc"
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-md border border-border bg-[hsl(var(--card))]"
      >
        <title id="pcp-hrct-title">PCP HRCT pattern</title>
        <desc id="pcp-hrct-desc">
          Schematic axial chest CT. Bilateral perihilar ground-glass opacification with subpleural
          sparing; thin-walled upper-zone cysts.
        </desc>

        <defs>
          {/* Soft radial gradient for ground-glass — denser centrally, fading peripherally */}
          <radialGradient id="ggo-grad" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="hsl(var(--icu))" stopOpacity="0.85" />
            <stop offset="55%" stopColor="hsl(var(--icu))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--icu))" stopOpacity="0" />
          </radialGradient>
          <clipPath id="left-lung-clip">
            <path d={leftLung} />
          </clipPath>
          <clipPath id="right-lung-clip">
            <path d={rightLung} />
          </clipPath>
        </defs>

        {/* Body wall ellipse */}
        <ellipse
          cx={W / 2}
          cy={H / 2 + 10}
          rx={290}
          ry={150}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth={2}
        />

        {/* Lungs */}
        <path d={leftLung} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={1.5} />
        <path d={rightLung} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={1.5} />

        {/* Mediastinum / heart shadow */}
        <path
          d="M 250 140 C 230 200 240 270 290 300 C 340 320 400 300 400 240 C 400 180 380 140 320 130 Z"
          fill="hsl(var(--muted-foreground) / 0.25)"
          stroke="hsl(var(--border))"
          strokeWidth={1}
        />
        <text x={W / 2} y={H / 2 + 20} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">
          Heart
        </text>

        {/* Vertebral body */}
        <ellipse cx={W / 2} cy={H - 50} rx={28} ry={20} fill="hsl(var(--muted-foreground) / 0.3)" />
        <text x={W / 2} y={H - 46} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">
          T-spine
        </text>

        {/* GROUND-GLASS — perihilar, fades peripherally (subpleural sparing) */}
        {showGGO && (
          <g style={{ transition: "opacity 0.3s" }}>
            <g clipPath="url(#left-lung-clip)">
              <ellipse cx={210} cy={210} rx={90} ry={110} fill="url(#ggo-grad)" opacity={ggoPulse} />
            </g>
            <g clipPath="url(#right-lung-clip)">
              <ellipse cx={430} cy={210} rx={90} ry={110} fill="url(#ggo-grad)" opacity={ggoPulse} />
            </g>
          </g>
        )}

        {/* CYSTS — upper-zone thin-walled */}
        {showCysts && (
          <g style={{ transition: "opacity 0.3s" }}>
            <g clipPath="url(#left-lung-clip)">
              <circle cx={170} cy={130} r={14} fill="hsl(var(--background))" stroke="hsl(var(--destructive))" strokeWidth={1.5} opacity={0.9 + 0.05 * drift} />
              <circle cx={195} cy={150} r={9} fill="hsl(var(--background))" stroke="hsl(var(--destructive))" strokeWidth={1.5} opacity={0.9 - 0.05 * drift} />
              <circle cx={150} cy={160} r={7} fill="hsl(var(--background))" stroke="hsl(var(--destructive))" strokeWidth={1.5} />
            </g>
            <g clipPath="url(#right-lung-clip)">
              <circle cx={470} cy={130} r={13} fill="hsl(var(--background))" stroke="hsl(var(--destructive))" strokeWidth={1.5} opacity={0.9 + 0.05 * drift} />
              <circle cx={445} cy={155} r={8} fill="hsl(var(--background))" stroke="hsl(var(--destructive))" strokeWidth={1.5} opacity={0.9 - 0.05 * drift} />
              <circle cx={490} cy={160} r={6} fill="hsl(var(--background))" stroke="hsl(var(--destructive))" strokeWidth={1.5} />
            </g>
          </g>
        )}

        {/* Subpleural sparing annotation — arc on left lung periphery */}
        {showGGO && (
          <g>
            <path
              d="M 95 200 C 100 240 115 280 140 300"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              opacity={0.8}
            />
            <text x={20} y={260} fontSize={10} fill="hsl(var(--primary))">
              Subpleural
            </text>
            <text x={20} y={273} fontSize={10} fill="hsl(var(--primary))">
              sparing
            </text>
          </g>
        )}

        {/* Labels with leader lines */}
        {showGGO && (
          <g>
            <line x1={325} y1={75} x2={295} y2={150} stroke="hsl(var(--icu))" strokeWidth={1} />
            <line x1={325} y1={75} x2={345} y2={150} stroke="hsl(var(--icu))" strokeWidth={1} />
            <text x={325} y={65} textAnchor="middle" fontSize={11} fill="hsl(var(--icu))" fontWeight="600">
              Bilateral perihilar GGO
            </text>
          </g>
        )}
        {showCysts && (
          <g>
            <line x1={W - 120} y1={90} x2={485} y2={125} stroke="hsl(var(--destructive))" strokeWidth={1} />
            <text x={W - 10} y={85} textAnchor="end" fontSize={11} fill="hsl(var(--destructive))" fontWeight="600">
              Upper-zone cysts
            </text>
            <text x={W - 10} y={100} textAnchor="end" fontSize={9} fill="hsl(var(--destructive))">
              (pneumothorax risk)
            </text>
          </g>
        )}

        {/* Orientation marker */}
        <g transform={`translate(${W - 40} ${H - 30})`}>
          <circle r={16} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={1} />
          <text textAnchor="middle" y={4} fontSize={11} fill="hsl(var(--muted-foreground))">R</text>
        </g>
      </svg>

      <p className="text-xs text-muted-foreground mt-2">
        Schematic axial HRCT. Classic PCP triad: <strong>bilateral perihilar ground-glass</strong>{" "}
        opacification, <strong>subpleural sparing</strong>, and <strong>upper-zone thin-walled cysts</strong>{" "}
        (a substrate for the ~10% incidence of pneumothorax).
      </p>
    </DiagramFigure>
  );
};

export default PCPHRCTDiagram;
