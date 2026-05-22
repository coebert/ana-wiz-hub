import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated diagram: gut (stomach, small bowel, colon, spleen) → SMV/splenic
 * vein → hepatic portal vein → liver sinusoids → hepatic vein → IVC → heart →
 * systemic circulation. First-pass extraction visualised in the sinusoid
 * window with hepatocytes, Kupffer cells and bile canaliculi for realism.
 */
type Layer = "hepatocyte" | "kupffer" | "bile";

const PortalFirstPassDiagram = () => {
  const [er, setEr] = useState(0.7);
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);
  const [layers, setLayers] = useState<Record<Layer, boolean>>({
    hepatocyte: false,
    kupffer: false,
    bile: false,
  });
  const toggleLayer = (k: Layer) =>
    setLayers((s) => ({ ...s, [k]: !s[k] }));
  const anyMechanism = layers.hepatocyte || layers.kupffer || layers.bile;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 1000), 40);
    return () => clearInterval(id);
  }, [playing]);

  const W = 720;
  const H = 480;

  const N_PARTICLES = 22;
  const particles = Array.from({ length: N_PARTICLES }, (_, i) => {
    const phase = (tick * 0.010 + i / N_PARTICLES) % 1;
    return { id: i, p: phase };
  });

  // Journey waypoints (matched to redrawn anatomy):
  //   0.00–0.18  gut capillary bed → mesenteric tributaries
  //   0.18–0.38  SMV/splenic confluence → hepatic portal vein
  //   0.38–0.68  hepatic sinusoids (extraction window, L→R sweep)
  //   0.68–0.82  hepatic vein → IVC ascending
  //   0.82–0.92  right heart → pulmonary loop → left heart
  //   0.92–1.00  systemic arterial arc returning to gut
  const positionAt = (p: number): { x: number; y: number } => {
    if (p < 0.18) {
      const t = p / 0.18;
      // travels through small-bowel coils up toward SMV
      return { x: 130 + t * 90, y: 380 - Math.sin(t * Math.PI * 2) * 8 };
    }
    if (p < 0.38) {
      const t = (p - 0.18) / 0.20;
      // SMV confluence, then up the portal vein toward porta hepatis
      return { x: 220 + t * 130, y: 380 - t * 150 };
    }
    if (p < 0.68) {
      const t = (p - 0.38) / 0.30;
      // sinusoid sweep across the right lobe with gentle wave
      return { x: 350 + t * 200, y: 230 + Math.sin(t * Math.PI * 3) * 6 };
    }
    if (p < 0.82) {
      const t = (p - 0.68) / 0.14;
      // hepatic vein joining IVC, ascending to right atrium
      return { x: 550 - t * 30, y: 230 - t * 90 };
    }
    if (p < 0.92) {
      const t = (p - 0.82) / 0.10;
      // through heart and aortic arch
      return { x: 520 - t * 90, y: 140 - Math.sin(t * Math.PI) * 25 };
    }
    const t = (p - 0.92) / 0.08;
    // systemic arc returning down to gut on the left
    return { x: 430 - t * 300, y: 115 + t * 240 };
  };

  const isExtracted = (i: number, p: number) => {
    if (p < 0.38) return false;
    const r = ((i * 9301 + 49297) % 233280) / 233280;
    if (p < 0.68) {
      const through = (p - 0.38) / 0.30;
      return r < er * through;
    }
    return r < er;
  };

  return (
    <DiagramFigure
      id="portal-first-pass-diagram"
      title="Portal first pass"
      description="Auto-generated wrapper for the Portal first pass anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            Portal Circulation & First-Pass Metabolism
          </h3>
          <div className="flex flex-wrap gap-1.5 text-xs" role="group" aria-label="Mechanism layer toggles">
            <span className="text-muted-foreground self-center mr-1">
              {anyMechanism ? "Mechanism layers:" : "Anatomy only — add layers:"}
            </span>
            {([
              { k: "hepatocyte" as Layer, label: "Hepatocyte uptake" },
              { k: "kupffer" as Layer, label: "Kupffer cells" },
              { k: "bile" as Layer, label: "Bile canaliculi" },
            ]).map(({ k, label }) => (
              <button
                key={k}
                type="button"
                onClick={() => toggleLayer(k)}
                aria-pressed={layers[k]}
                className={`px-2 py-1 rounded border transition-colors ${
                  layers[k]
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {label} {layers[k] ? "✓" : "○"}
              </button>
            ))}
          </div>
        </div>
  
        <div className="bg-card rounded-xl border border-border p-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            role="img"
            aria-label="Anatomical animated diagram of oral drug absorption from gut, transit through superior mesenteric and portal veins, hepatic sinusoid extraction, hepatic vein to IVC, right and left heart, then systemic arterial return."
          >
            <defs>
              <marker id="pf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <radialGradient id="pf-liver" cx="45%" cy="35%" r="75%">
                <stop offset="0%" stopColor="hsl(15, 60%, 58%)" />
                <stop offset="60%" stopColor="hsl(12, 58%, 45%)" />
                <stop offset="100%" stopColor="hsl(8, 55%, 30%)" />
              </radialGradient>
              <radialGradient id="pf-liver-sheen" cx="35%" cy="25%" r="40%">
                <stop offset="0%" stopColor="hsl(25, 80%, 75%)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(25, 80%, 75%)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="pf-portal" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(265, 55%, 58%)" />
                <stop offset="100%" stopColor="hsl(255, 55%, 38%)" />
              </linearGradient>
              <linearGradient id="pf-vein" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(215, 65%, 50%)" />
                <stop offset="100%" stopColor="hsl(215, 65%, 32%)" />
              </linearGradient>
              <linearGradient id="pf-artery" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(0, 75%, 58%)" />
                <stop offset="100%" stopColor="hsl(8, 75%, 48%)" />
              </linearGradient>
              <radialGradient id="pf-stomach" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="hsl(30, 55%, 78%)" />
                <stop offset="100%" stopColor="hsl(25, 50%, 55%)" />
              </radialGradient>
              <radialGradient id="pf-spleen" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="hsl(340, 45%, 50%)" />
                <stop offset="100%" stopColor="hsl(340, 50%, 30%)" />
              </radialGradient>
              <radialGradient id="pf-heart" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="hsl(355, 70%, 58%)" />
                <stop offset="100%" stopColor="hsl(350, 70%, 35%)" />
              </radialGradient>
              <pattern id="pf-mucosa" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M0 6 Q1.5 0 3 6 T6 6" stroke="hsl(20, 50%, 35%)" strokeWidth="0.5" fill="none" opacity="0.5" />
              </pattern>
            </defs>
  
            {/* ===== Background body silhouette hint ===== */}
            <rect x={20} y={20} width={W - 40} height={H - 40} rx={20}
              fill="hsl(var(--muted))" opacity={0.08} stroke="hsl(var(--border))" strokeWidth="0.75" />
  
            {/* ===== Systemic arterial arc (top) ===== */}
            <path d="M 110 130 Q 290 50 520 140" fill="none"
              stroke="url(#pf-artery)" strokeWidth="3" strokeLinecap="round" opacity={0.18} />
            <path d="M 110 130 Q 290 50 520 140" fill="none"
              stroke="url(#pf-artery)" strokeWidth="3" strokeLinecap="round" />
            <text x={310} y={70} textAnchor="middle" fontSize="11"
              className="fill-foreground font-semibold tracking-wide">SYSTEMIC ARTERIAL CIRCULATION</text>
  
            {/* aortic branches feathering down to gut */}
            {[140, 200, 260].map((x, i) => (
              <path key={i} d={`M ${x} 100 Q ${x - 5} 200 ${130 + i * 30} 360`}
                stroke="hsl(0, 70%, 55%)" strokeWidth="1" fill="none" opacity={0.35} strokeDasharray="2 3" />
            ))}
  
            {/* ===== Heart ===== */}
            <g transform="translate(485,110)">
              <path d="M 0 12 C -14 -8 14 -22 22 -4 C 30 -22 58 -8 44 12 C 36 28 22 38 22 38 C 22 38 8 28 0 12 Z"
                fill="url(#pf-heart)" stroke="hsl(350, 70%, 25%)" strokeWidth="1" />
              <text x={22} y={20} textAnchor="middle" fontSize="9"
                fill="hsl(45, 100%, 96%)" className="font-semibold">Heart</text>
            </g>
  
            {/* ===== Stomach ===== */}
            <path d="M 70 250 Q 60 230 85 220 Q 130 210 160 230 Q 175 245 168 270 Q 150 295 110 290 Q 80 285 70 270 Z"
              fill="url(#pf-stomach)" stroke="hsl(20, 50%, 35%)" strokeWidth="1" />
            <text x={120} y={258} textAnchor="middle" fontSize="9"
              className="fill-foreground font-medium">Stomach</text>
  
            {/* ===== Spleen ===== */}
            <path d="M 60 320 Q 45 330 50 360 Q 60 385 85 380 Q 95 365 92 340 Q 85 322 60 320 Z"
              fill="url(#pf-spleen)" stroke="hsl(340, 50%, 22%)" strokeWidth="1" />
            <text x={70} y={355} textAnchor="middle" fontSize="8"
              fill="hsl(45, 100%, 95%)" className="font-medium">Spleen</text>
  
            {/* ===== Small bowel coils ===== */}
            <g>
              <path d="M 110 360 Q 140 340 170 360 T 230 360 T 290 360"
                fill="none" stroke="hsl(25, 50%, 55%)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 110 360 Q 140 340 170 360 T 230 360 T 290 360"
                fill="url(#pf-mucosa)" stroke="hsl(20, 50%, 35%)" strokeWidth="0.5" opacity={0.6} />
              <path d="M 120 395 Q 155 380 195 395 T 270 395"
                fill="none" stroke="hsl(25, 50%, 55%)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 120 395 Q 155 380 195 395 T 270 395"
                fill="url(#pf-mucosa)" stroke="hsl(20, 50%, 35%)" strokeWidth="0.5" opacity={0.6} />
              <text x={195} y={425} textAnchor="middle" fontSize="9"
                className="fill-foreground font-medium">Small bowel · enterocyte CYP3A4</text>
            </g>
  
            {/* ===== Mesenteric tributaries → SMV ===== */}
            {[150, 200, 250].map((x, i) => (
              <path key={i} d={`M ${x} 370 Q ${x + 10} 340 ${230 + i * 5} 320`}
                stroke="url(#pf-portal)" strokeWidth="2" fill="none" opacity={0.85} strokeLinecap="round" />
            ))}
            <text x={170} y={335} fontSize="8" className="fill-muted-foreground italic">SMV tributaries</text>
  
            {/* Splenic vein joining */}
            <path d="M 90 350 Q 150 330 230 320"
              stroke="url(#pf-portal)" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.9} />
            <text x={130} y={318} fontSize="8" className="fill-muted-foreground italic">Splenic v.</text>
  
            {/* ===== Hepatic portal vein ===== */}
            <path d="M 230 320 Q 280 290 350 230"
              stroke="url(#pf-portal)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 230 320 Q 280 290 350 230"
              stroke="hsl(265, 60%, 70%)" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.4} />
            <text x={270} y={295} fontSize="11"
              transform="rotate(-38, 270, 295)"
              className="fill-foreground font-semibold">Hepatic portal v.</text>
            <text x={295} y={310} fontSize="8"
              transform="rotate(-38, 295, 310)"
              className="fill-muted-foreground italic">~75% liver inflow · partially deoxygenated, nutrient-rich</text>
  
            {/* ===== Hepatic artery (proper) — companion to portal triad ===== */}
            <path d="M 470 130 Q 430 170 360 220"
              stroke="url(#pf-artery)" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.85} />
            <text x={420} y={188} fontSize="8" className="fill-muted-foreground italic"
              transform="rotate(-30, 420, 188)">Hepatic a. (~25%, oxygen)</text>
  
            {/* ===== Liver lobes ===== */}
            {/* Right lobe */}
            <path d="M 350 175 Q 430 150 580 170 Q 630 200 615 270 Q 555 305 460 300 Q 380 285 350 240 Z"
              fill="url(#pf-liver)" stroke="hsl(8, 55%, 22%)" strokeWidth="1.5" />
            {/* Falciform ligament */}
            <path d="M 470 165 L 470 295" stroke="hsl(8, 55%, 22%)" strokeWidth="1" opacity={0.55} />
            {/* Left lobe (smaller, to the left of falciform) */}
            <path d="M 355 200 Q 410 175 470 175 L 470 280 Q 410 290 360 270 Q 340 240 355 200 Z"
              fill="url(#pf-liver)" stroke="hsl(8, 55%, 22%)" strokeWidth="1" opacity={0.92} />
            {/* Sheen */}
            <path d="M 360 180 Q 460 160 580 180 Q 600 220 560 250 Q 470 240 380 230 Z"
              fill="url(#pf-liver-sheen)" />
            {/* Gallbladder */}
            <path d="M 455 295 Q 450 320 460 332 Q 472 332 478 318 Q 478 300 470 293 Z"
              fill="hsl(80, 55%, 45%)" stroke="hsl(80, 55%, 25%)" strokeWidth="0.75" />
            <text x={490} y={328} fontSize="8" className="fill-muted-foreground">GB</text>
  
            <text x={500} y={205} textAnchor="middle" fontSize="14"
              fill="hsl(45, 100%, 96%)" className="font-bold tracking-wide">LIVER</text>
            <text x={500} y={220} textAnchor="middle" fontSize="9"
              fill="hsl(45, 100%, 96%)" opacity={0.9}>sinusoidal extraction · CYP450 · UGT</text>
  
            {/* Sinusoid lattice — hepatocyte plates */}
            {layers.hepatocyte && (
              <g opacity={0.7}>
                {Array.from({ length: 6 }).map((_, row) =>
                  Array.from({ length: 12 }).map((_, col) => (
                    <rect key={`${row}-${col}`}
                      x={365 + col * 19}
                      y={235 + row * 9}
                      width={14} height={5} rx={1.5}
                      fill="hsl(45, 100%, 92%)" opacity={0.28} />
                  ))
                )}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={i} x1={360} y1={241 + i * 9} x2={595} y2={241 + i * 9}
                    stroke="hsl(265, 50%, 80%)" strokeWidth="0.5" opacity={0.6} />
                ))}
                <text x={365} y={232} fontSize="7" className="fill-muted-foreground italic">hepatocyte plates · CYP450/UGT uptake</text>
              </g>
            )}
            {layers.kupffer && (
              <g>
                {[
                  [395, 248], [445, 257], [490, 248], [535, 266], [575, 257],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={2.6} fill="hsl(50, 90%, 65%)"
                      stroke="hsl(40, 80%, 40%)" strokeWidth="0.5" />
                    <circle cx={x} cy={y} r={5} fill="none"
                      stroke="hsl(50, 90%, 65%)" strokeWidth="0.5" opacity={0.5}>
                      <animate attributeName="r" values="3;7;3" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
                <text x={595} y={232} fontSize="7" textAnchor="end"
                  fill="hsl(40, 80%, 45%)" className="italic">Kupffer cells · phagocytosis</text>
              </g>
            )}
            {layers.bile && (
              <g>
                <line x1={595} y1={285} x2={365} y2={285}
                  stroke="hsl(80, 70%, 50%)" strokeWidth="1" strokeDasharray="3 2" opacity={0.85}>
                  <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.2s" repeatCount="indefinite" />
                </line>
                <line x1={595} y1={278} x2={365} y2={278}
                  stroke="hsl(80, 70%, 60%)" strokeWidth="0.5" strokeDasharray="2 3" opacity={0.6} />
                <text x={595} y={275} fontSize="7" textAnchor="end"
                  fill="hsl(80, 60%, 35%)" className="italic">bile canaliculi · counter-flow to portal blood →</text>
              </g>
            )}
  
            {/* ===== Hepatic vein → IVC ===== */}
            <path d="M 555 230 Q 540 180 525 145"
              stroke="url(#pf-vein)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 555 230 Q 540 180 525 145"
              stroke="hsl(215, 65%, 75%)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
            <text x={566} y={185} fontSize="9" className="fill-muted-foreground">Hepatic v. → IVC</text>
  
            {/* Direction arrows */}
            <line x1={260} y1={300} x2={285} y2={272}
              stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#pf-arrow)" opacity={0.55} />
            <line x1={540} y1={185} x2={530} y2={160}
              stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#pf-arrow)" opacity={0.55} />
            <line x1={300} y1={88} x2={250} y2={92}
              stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#pf-arrow)" opacity={0.55} />
  
            {/* Sinusoid extraction overlay */}
            <rect x={358} y={230} width={240} height={62} rx={6}
              fill="hsl(15, 70%, 50%)" opacity={0.05 + er * 0.16} />
            <text x={478} y={307} textAnchor="middle" fontSize="9"
              className="fill-muted-foreground italic">
              Extraction window — periportal (zone 1) → centrilobular (zone 3)
            </text>
  
            {/* Animated drug particles */}
            {particles.map(({ id, p }) => {
              const { x, y } = positionAt(p);
              const extracted = isExtracted(id, p);
              if (extracted && p > 0.38) {
                if (p > 0.68) return null;
                const fade = 1 - (p - 0.38) / 0.30;
                return (
                  <g key={id} opacity={fade}>
                    <circle cx={x} cy={y} r={4} fill="hsl(280, 70%, 55%)"
                      stroke="hsl(280, 80%, 30%)" strokeWidth="0.75" />
                    <circle cx={x} cy={y} r={7} fill="none"
                      stroke="hsl(280, 70%, 55%)" strokeWidth="0.5" opacity={0.4} />
                  </g>
                );
              }
              return (
                    <g key={id}>
                  <circle cx={x} cy={y} r={5} fill="hsl(280, 75%, 62%)"
                    stroke="hsl(280, 80%, 28%)" strokeWidth="1" />
                  <circle cx={x - 1.3} cy={y - 1.3} r={1.4} fill="hsl(280, 90%, 90%)" opacity={0.85} />
                </g>
    );
            })}
  
            {/* Legend */}
            <g transform="translate(40, 40)">
              <rect x={-6} y={-10} width={210} height={66} rx={6}
                fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.75" opacity={0.92} />
              <circle cx={6} cy={6} r={5} fill="hsl(280, 75%, 62%)" stroke="hsl(280, 80%, 28%)" strokeWidth="1" />
              <text x={18} y={10} fontSize="10" className="fill-foreground">Drug molecule (active)</text>
              <circle cx={6} cy={24} r={4} fill="hsl(280, 70%, 55%)" opacity={0.4} />
              <text x={18} y={28} fontSize="10" className="fill-muted-foreground">Extracted / metabolised</text>
              <circle cx={6} cy={42} r={2} fill="hsl(50, 80%, 70%)" />
              <text x={18} y={46} fontSize="10" className="fill-muted-foreground">Kupffer cell</text>
            </g>
          </svg>
        </div>
  
        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Hepatic extraction ratio (E)</span>
              <span className="font-mono font-semibold text-foreground">{er.toFixed(2)}</span>
            </div>
            <input type="range" min={0} max={1} step={0.05} value={er}
              onChange={(e) => setEr(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>0 (no extraction)</span>
              <span>1 (complete)</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Oral bioavailability F ≈ (1 − E) × Fa. With E = {er.toFixed(2)}, an orally absorbed
              drug delivers ≈ <span className="font-mono font-semibold text-foreground">{Math.round((1 - er) * 100)}%</span> to the systemic circulation.
            </p>
          </div>
  
          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <p className="text-xs font-semibold text-foreground mb-1">Clinical correlates</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
              <li><span className="font-semibold text-foreground">High E (&gt;0.7):</span> propranolol, lidocaine, morphine, GTN, fentanyl — flow-dependent clearance; bypass first pass with IV/SL/TD/PR routes.</li>
              <li><span className="font-semibold text-foreground">Low E (&lt;0.3):</span> diazepam, warfarin, phenytoin — capacity-limited; clearance unchanged by flow.</li>
              <li>Portosystemic shunting (cirrhosis, TIPSS) ↑ bioavailability of high-E drugs → toxicity risk.</li>
            </ul>
          </div>
        </div>
  
        <div className="flex justify-center">
          <button onClick={() => setPlaying((p) => !p)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors">
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PortalFirstPassDiagram;
