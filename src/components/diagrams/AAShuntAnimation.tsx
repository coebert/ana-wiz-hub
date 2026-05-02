import { useEffect, useState } from "react";

/**
 * Arachidonic-acid shunt animation
 * ─────────────────────────────────
 * Step-by-step animated diagram showing how COX inhibition diverts
 * arachidonic acid (AA) into the 5-LOX pathway, generating cysteinyl
 * leukotrienes responsible for AERD (aspirin-exacerbated respiratory
 * disease).
 *
 * Phases (matches NMJ-diagram pattern):
 *   1. Resting AA pool flowing through both COX and 5-LOX
 *   2. NSAID arrives at COX active sites
 *   3. COX-1 / COX-2 hatched & blocked → PG/TXA₂ output collapses
 *   4. AA accumulates and is shunted into 5-LOX
 *   5. 5-LOX + FLAP convert AA → 5-HPETE → LTA₄
 *   6. LTC₄ synthase → LTC₄/D₄/E₄ released
 *   7. CysLT₁ receptors on bronchial smooth muscle activated
 *   8. Bronchoconstriction (AERD)
 */

const PHASES = [
  { id: "rest", label: "Resting flow — AA → COX & 5-LOX", duration: 70 },
  { id: "nsaid", label: "NSAID binds COX active site", duration: 50 },
  { id: "block", label: "COX-1 / COX-2 inhibited → ↓ PG / TXA₂", duration: 70 },
  { id: "shunt", label: "AA accumulates → shunted to 5-LOX", duration: 70 },
  { id: "lox", label: "5-LOX + FLAP → 5-HPETE → LTA₄", duration: 60 },
  { id: "cyslt", label: "LTC₄ synthase → LTC₄ / D₄ / E₄ released", duration: 60 },
  { id: "receptor", label: "CysLT₁ activation on bronchial smooth muscle", duration: 50 },
  { id: "broncho", label: "Bronchoconstriction (AERD)", duration: 70 },
];

const TOTAL = PHASES.reduce((s, p) => s + p.duration, 0);

const ramp = (t: number, start: number, end: number) => {
  if (t <= start) return 0;
  if (t >= end) return 1;
  return (t - start) / (end - start);
};

export const AAShuntAnimation = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % TOTAL), 40);
    return () => clearInterval(id);
  }, [playing]);

  // Determine current phase
  let acc = 0;
  let currentPhase = PHASES[0];
  let phaseProgress = 0;
  for (const p of PHASES) {
    if (frame >= acc && frame < acc + p.duration) {
      currentPhase = p;
      phaseProgress = (frame - acc) / p.duration;
      break;
    }
    acc += p.duration;
  }

  const jumpToPhase = (id: string) => {
    let a = 0;
    for (const p of PHASES) {
      if (p.id === id) {
        setFrame(a);
        setPlaying(false);
        return;
      }
      a += p.duration;
    }
  };

  // Global timeline t (0 → 8) for synchronised easing
  const phaseIndex = PHASES.findIndex((p) => p.id === currentPhase.id);
  const t = phaseIndex + phaseProgress;

  // Visual magnitudes
  const nsaidArrive = ramp(t, 1.0, 1.8);                 // NSAID dots descending onto COX
  const coxBlocked = ramp(t, 1.7, 2.6);                  // hatch + ↓ badge on COX boxes
  const pgFlow = 1 - 0.92 * ramp(t, 1.7, 2.8);           // COX product flow shrinks
  const aaAccumulate = ramp(t, 2.2, 3.4);                // AA pool glow
  const shuntFlow = ramp(t, 3.0, 4.2);                   // arrow AA → 5-LOX swells
  const loxActive = ramp(t, 4.0, 5.0);                   // 5-LOX glow + FLAP
  const ltProduced = ramp(t, 5.0, 6.0);                  // LTC₄/D₄/E₄ dots appear
  const ltDescend = ramp(t, 5.6, 6.8);                   // LTs migrate to receptor
  const receptorActive = ramp(t, 6.5, 7.4);              // CysLT₁ glow
  const bronchoConstrict = ramp(t, 7.0, 8.0);            // airway lumen narrows

  // Layout
  const W = 560;
  const H = 460;

  const aaX = 280;
  const aaY = 70;

  const cox1X = 175;
  const cox2X = 385;
  const loxX = 75;
  const enzymeY = 165;
  const productY = 245;

  // ── Helper: render a small "AA" token at (x,y) ──
  const AAToken = ({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) => (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={5} fill="hsl(45 85% 55%)" stroke="hsl(35 80% 35%)" strokeWidth={0.8} />
      <text x={x} y={y + 1.8} textAnchor="middle" fontSize="5" fontWeight={700} fill="hsl(0 0% 100%)">AA</text>
    </g>
  );

  // Streaming AA dots along a curve from (x1,y1) → (x2,y2) via a control point
  const streamDots = (count: number, x1: number, y1: number, cx: number, cy: number, x2: number, y2: number, intensity: number, key: string) => {
    if (intensity < 0.02) return null;
    return Array.from({ length: count }).map((_, i) => {
      const phase = ((frame * 0.02) + i / count) % 1;
      const u = phase;
      const px = (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * cx + u * u * x2;
      const py = (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * cy + u * u * y2;
      const fade = u < 0.1 ? u * 10 : u > 0.9 ? (1 - u) * 10 : 1;
      return <AAToken key={`${key}-${i}`} x={px} y={py} opacity={Math.min(1, fade) * intensity} />;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label="Animated arachidonic-acid shunt into 5-lipoxygenase pathway when COX is inhibited">
        <defs>
          <marker id="aa-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--muted-foreground))" />
          </marker>
          <marker id="aa-arrow-shunt" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(0 65% 50%)" />
          </marker>
          <pattern id="aa-block-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="hsl(0 65% 50%)" strokeWidth="2" opacity="0.55" />
          </pattern>
        </defs>

        {/* Membrane phospholipids → PLA₂ → AA */}
        <rect x={50} y={20} width={W - 100} height={20} rx={3} fill="hsl(45 30% 92%)" stroke="hsl(var(--border))" />
        <text x={W / 2} y={34} textAnchor="middle" fontSize="9.5" className="fill-foreground font-semibold">
          Membrane phospholipids
        </text>
        <line x1={W / 2} x2={W / 2} y1={40} y2={aaY - 12} stroke="hsl(var(--muted-foreground))" strokeWidth={1.4} markerEnd="url(#aa-arrow)" />
        <text x={W / 2 + 8} y={55} fontSize="8.5" className="fill-muted-foreground italic">phospholipase A₂</text>

        {/* AA pool — glows when accumulating */}
        {aaAccumulate > 0.05 && (
          <ellipse cx={aaX} cy={aaY + 1} rx={92 + aaAccumulate * 14} ry={18 + aaAccumulate * 4}
            fill="hsl(45 90% 60%)" opacity={0.15 + aaAccumulate * 0.35}>
            <animate attributeName="opacity"
              values={`${0.15 + aaAccumulate * 0.25};${0.25 + aaAccumulate * 0.45};${0.15 + aaAccumulate * 0.25}`}
              dur="1.2s" repeatCount="indefinite" />
          </ellipse>
        )}
        <rect x={aaX - 80} y={aaY - 12} width={160} height={26} rx={6}
          fill="hsl(var(--background))" stroke="hsl(var(--muted-foreground))" strokeWidth={1.2} />
        <text x={aaX} y={aaY + 5} textAnchor="middle" fontSize="10.5" fontWeight={700} className="fill-foreground">
          Arachidonic acid (AA)
        </text>
        {aaAccumulate > 0.4 && (
          <text x={aaX} y={aaY + 26} textAnchor="middle" fontSize="8" fontWeight={700} fill="hsl(35 90% 35%)" opacity={aaAccumulate}>
            ↑ pool builds up
          </text>
        )}

        {/* ── Branches: COX-1, COX-2, 5-LOX ── */}
        {/* Curves from AA pool */}
        <path d={`M ${aaX - 30} ${aaY + 14} Q ${(aaX - 30 + cox1X) / 2} ${aaY + 40}, ${cox1X} ${enzymeY - 16}`}
          fill="none" stroke="hsl(210 70% 50%)" strokeWidth={1.2 + pgFlow * 1.8} opacity={0.4 + pgFlow * 0.4}
          markerEnd="url(#aa-arrow)" />
        <path d={`M ${aaX + 30} ${aaY + 14} Q ${(aaX + 30 + cox2X) / 2} ${aaY + 40}, ${cox2X} ${enzymeY - 16}`}
          fill="none" stroke="hsl(280 55% 55%)" strokeWidth={1.2 + pgFlow * 1.8} opacity={0.4 + pgFlow * 0.4}
          markerEnd="url(#aa-arrow)" />
        {/* Shunt arrow grows with shuntFlow */}
        <path d={`M ${aaX - 70} ${aaY + 14} Q ${(aaX - 70 + loxX) / 2} ${aaY + 50}, ${loxX} ${enzymeY - 16}`}
          fill="none" stroke="hsl(0 65% 50%)" strokeWidth={1.2 + shuntFlow * 3.5}
          opacity={0.3 + shuntFlow * 0.65}
          strokeDasharray="5 3"
          markerEnd="url(#aa-arrow-shunt)" />
        {shuntFlow > 0.2 && (
          <text x={(aaX - 70 + loxX) / 2 - 10} y={aaY + 70} fontSize="9" fontWeight={700} fill="hsl(0 65% 45%)" opacity={shuntFlow}>
            SHUNT
          </text>
        )}

        {/* Streaming AA tokens into 5-LOX during shunt phase */}
        {streamDots(5, aaX - 70, aaY + 14, (aaX - 70 + loxX) / 2, aaY + 50, loxX, enzymeY - 16, shuntFlow, "shunt")}

        {/* COX-1 box */}
        <EnzymeBox x={cox1X} y={enzymeY} label="COX-1" sublabel="constitutive" color="hsl(210 70% 50%)" inhibited={coxBlocked} />
        {/* COX-2 box */}
        <EnzymeBox x={cox2X} y={enzymeY} label="COX-2" sublabel="inducible" color="hsl(280 55% 55%)" inhibited={coxBlocked} />
        {/* 5-LOX box */}
        <g>
          <EnzymeBox x={loxX} y={enzymeY} label="5-LOX" sublabel="+ FLAP" color="hsl(0 65% 50%)" inhibited={0} />
          {loxActive > 0.1 && (
            <circle cx={loxX} cy={enzymeY} r={28 + loxActive * 6} fill="hsl(0 65% 50%)" opacity={0.15 * loxActive}>
              <animate attributeName="r" values={`${24 + loxActive * 4};${32 + loxActive * 6};${24 + loxActive * 4}`} dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* NSAID dots descending onto COX active sites */}
        {nsaidArrive > 0.05 && [cox1X, cox2X].map((cx, i) => {
          const startY = -10;
          const endY = enzymeY - 18;
          const y = startY + (endY - startY) * Math.min(1, nsaidArrive * 1.1 + i * 0.05);
          return (
            <g key={i} opacity={nsaidArrive}>
              <circle cx={cx + (i ? 6 : -6)} cy={y} r={6} fill="hsl(0 70% 55%)" stroke="hsl(0 70% 30%)" strokeWidth={1} />
              <text x={cx + (i ? 6 : -6)} y={y + 2} textAnchor="middle" fontSize="6" fontWeight={700} fill="hsl(0 0% 100%)">N</text>
            </g>
          );
        })}
        {nsaidArrive > 0.3 && coxBlocked < 0.4 && (
          <text x={W / 2} y={enzymeY - 35} textAnchor="middle" fontSize="9" fontWeight={700} fill="hsl(0 65% 45%)" opacity={nsaidArrive}>
            NSAID molecules
          </text>
        )}

        {/* ── Products row ── */}
        {/* COX products (collapse with pgFlow) */}
        <ProductBox x={cox1X} y={productY} color="hsl(210 70% 50%)" title="TXA₂ · PGE₂ · PGI₂" sub="(platelet · gastric · renal)" intensity={pgFlow} />
        <ProductBox x={cox2X} y={productY} color="hsl(280 55% 55%)" title="PGE₂ · PGI₂" sub="(inflammation · pain · fever)" intensity={pgFlow} />
        {/* 5-LOX products (grow with ltProduced) */}
        <ProductBox x={loxX} y={productY} color="hsl(0 65% 50%)" title="LTC₄ · D₄ · E₄" sub="(cysteinyl leukotrienes)" intensity={0.25 + ltProduced * 0.75} highlighted={ltProduced > 0.3} />

        {/* Intermediate label appearing during LOX phase */}
        {loxActive > 0.3 && ltProduced < 0.9 && (
          <text x={loxX} y={productY - 38} textAnchor="middle" fontSize="8" fontWeight={600} fill="hsl(0 65% 40%)" opacity={loxActive * (1 - ltProduced * 0.7)}>
            5-HPETE → LTA₄
          </text>
        )}
        {ltProduced > 0.4 && (
          <text x={loxX} y={productY - 24} textAnchor="middle" fontSize="8" fontWeight={700} fill="hsl(0 65% 35%)" opacity={ltProduced}>
            LTC₄ synthase
          </text>
        )}

        {/* ── Cysteinyl leukotrienes migrating to receptor ── */}
        {ltDescend > 0.05 && Array.from({ length: 5 }).map((_, i) => {
          const u = Math.min(1, ltDescend * 1.2 - i * 0.1);
          if (u <= 0) return null;
          const startX = loxX;
          const startY = productY + 18;
          const endX = 180;
          const endY = 360;
          const cx = (startX + endX) / 2 - 30;
          const cy = (startY + endY) / 2 + 20;
          const x = (1 - u) * (1 - u) * startX + 2 * (1 - u) * u * cx + u * u * endX;
          const y = (1 - u) * (1 - u) * startY + 2 * (1 - u) * u * cy + u * u * endY;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={5} fill="hsl(0 65% 55%)" stroke="hsl(0 70% 30%)" strokeWidth={0.8} opacity={0.9} />
              <text x={x} y={y + 1.8} textAnchor="middle" fontSize="4.5" fontWeight={700} fill="hsl(0 0% 100%)">LT</text>
            </g>
          );
        })}

        {/* ── Bronchial smooth muscle / airway ── */}
        {/* Airway lumen — narrows with bronchoConstrict */}
        <g>
          {/* outer airway wall */}
          <rect x={150} y={345} width={260} height={95} rx={20} fill="hsl(340 40% 95%)" stroke="hsl(340 60% 50%)" strokeWidth={2} />
          <text x={280} y={362} textAnchor="middle" fontSize="10" fontWeight={600} className="fill-foreground">
            Bronchial smooth muscle
          </text>

          {/* CysLT₁ receptors */}
          {[200, 240, 280, 320, 360].map((rx, i) => {
            const active = receptorActive > 0.1 && i < Math.ceil(receptorActive * 5);
            return (
              <g key={i}>
                {active && (
                  <circle cx={rx} cy={372} r={7 + receptorActive * 2} fill="hsl(0 65% 50%)" opacity={0.25 * receptorActive}>
                    <animate attributeName="r" values={`${6 + receptorActive};${10 + receptorActive * 2};${6 + receptorActive}`} dur="0.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <rect x={rx - 6} y={368} width={12} height={10} rx={2}
                  fill={active ? "hsl(0 65% 55%)" : "hsl(340 30% 80%)"}
                  stroke={active ? "hsl(0 70% 30%)" : "hsl(340 30% 60%)"} strokeWidth={1} />
              </g>
            );
          })}
          {receptorActive > 0.3 && (
            <text x={280} y={392} textAnchor="middle" fontSize="8" fontWeight={700} fill="hsl(0 65% 35%)" opacity={receptorActive}>
              CysLT₁ receptors activated
            </text>
          )}

          {/* Airway lumen — width depends on bronchoConstrict */}
          {(() => {
            const lumenFull = 220;
            const lumenWidth = lumenFull * (1 - bronchoConstrict * 0.7);
            const lumenX = 280 - lumenWidth / 2;
            return (
              <>
                <rect x={lumenX} y={405} width={lumenWidth} height={26} rx={10}
                  fill="hsl(200 60% 88%)" stroke="hsl(200 50% 55%)" strokeWidth={1.2} />
                <text x={280} y={422} textAnchor="middle" fontSize="9" fontWeight={700} fill="hsl(200 50% 30%)">
                  {bronchoConstrict > 0.4 ? "constricted lumen" : "airway lumen"}
                </text>
              </>
            );
          })()}
        </g>

        {/* Final AERD callout */}
        {bronchoConstrict > 0.5 && (
          <g opacity={bronchoConstrict}>
            <rect x={W - 180} y={345} width={170} height={36} rx={6}
              fill="hsl(0 70% 95%)" stroke="hsl(0 65% 50%)" strokeWidth={1.2} />
            <text x={W - 95} y={360} textAnchor="middle" fontSize="9" fontWeight={700} fill="hsl(0 65% 35%)">
              Aspirin-Exacerbated
            </text>
            <text x={W - 95} y={372} textAnchor="middle" fontSize="9" fontWeight={700} fill="hsl(0 65% 35%)">
              Respiratory Disease
            </text>
          </g>
        )}
      </svg>

      {/* Phase indicator + per-phase explanation */}
      <div className="text-center mt-2 mb-3">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary">
          {currentPhase.label}
        </span>
        {currentPhase.id === "block" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            NSAIDs occupy the COX active site (aspirin acetylates Ser529 irreversibly). Prostaglandin and
            thromboxane synthesis collapses — but arachidonic acid keeps being released from membrane phospholipids.
          </p>
        )}
        {currentPhase.id === "shunt" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            With the COX route blocked, the AA pool rises and is preferentially metabolised by{" "}
            <span className="font-semibold" style={{ color: "hsl(0 65% 40%)" }}>5-lipoxygenase</span> on the nuclear envelope (with FLAP as a docking partner).
          </p>
        )}
        {currentPhase.id === "lox" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            5-LOX oxidises AA to 5-HPETE, then dehydrates it to the unstable epoxide{" "}
            <span className="font-semibold" style={{ color: "hsl(0 65% 40%)" }}>LTA₄</span>.
          </p>
        )}
        {currentPhase.id === "cyslt" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            LTC₄ synthase conjugates LTA₄ with glutathione → LTC₄, which is exported and successively cleaved to{" "}
            <span className="font-semibold">LTD₄</span> and <span className="font-semibold">LTE₄</span>.
          </p>
        )}
        {currentPhase.id === "broncho" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            CysLT₁ activation drives bronchial smooth-muscle contraction, mucus hypersecretion and eosinophilic
            inflammation — the basis of <span className="font-semibold">aspirin-exacerbated respiratory disease (AERD)</span>.
            Treat with leukotriene-receptor antagonists (montelukast) or aspirin desensitisation.
          </p>
        )}
      </div>

      {/* Cross-link chips (jump to phase) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 text-xs">
        <span className="text-muted-foreground mr-1">Jump to:</span>
        {[
          { id: "rest", label: "Resting flow" },
          { id: "block", label: "COX blocked" },
          { id: "shunt", label: "Shunt to 5-LOX" },
          { id: "lox", label: "5-LOX → LTA₄" },
          { id: "cyslt", label: "LTC₄/D₄/E₄" },
          { id: "broncho", label: "Bronchospasm" },
        ].map((link) => {
          const isActive = currentPhase.id === link.id;
          return (
            <button
              key={link.id}
              onClick={() => jumpToPhase(link.id)}
              className={`px-2.5 py-1 rounded-full border transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted hover:border-primary/50"
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Phase timeline (clickable) */}
      <div className="flex gap-0.5 mb-4">
        {PHASES.map((p, i) => {
          const start = PHASES.slice(0, i).reduce((s, pp) => s + pp.duration, 0);
          const isCurrent = currentPhase.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => jumpToPhase(p.id)}
              title={p.label}
              aria-label={`Jump to ${p.label}`}
              className={`h-1.5 rounded-full transition-colors cursor-pointer hover:brightness-110 ${
                isCurrent ? "bg-primary" : frame > start ? "bg-primary/30" : "bg-muted"
              }`}
              style={{ flex: p.duration }}
            />
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
    </div>
  );
};

/* ── Sub-components ───────────────────────────────────────── */

const EnzymeBox = ({
  x, y, label, sublabel, color, inhibited,
}: { x: number; y: number; label: string; sublabel: string; color: string; inhibited: number }) => (
  <g>
    <rect x={x - 38} y={y - 16} width={76} height={32} rx={6} fill={`${color}20`} stroke={color} strokeWidth={1.4} />
    <text x={x} y={y - 2} textAnchor="middle" fontSize="11" fontWeight={700} fill={color}>{label}</text>
    <text x={x} y={y + 10} textAnchor="middle" fontSize="7.5" className="fill-muted-foreground italic">{sublabel}</text>
    {inhibited > 0.1 && (
      <g>
        <rect x={x - 38} y={y - 16} width={76} height={32} rx={6} fill="url(#aa-block-hatch)" opacity={inhibited} pointerEvents="none" />
        <rect x={x - 22} y={y + 18} width={44} height={14} rx={7} fill="hsl(0 65% 50%)" opacity={inhibited} />
        <text x={x} y={y + 28} textAnchor="middle" fontSize="8" fontWeight={700} fill="hsl(var(--background))" opacity={inhibited}>
          BLOCKED
        </text>
      </g>
    )}
  </g>
);

const ProductBox = ({
  x, y, color, title, sub, intensity, highlighted = false,
}: { x: number; y: number; color: string; title: string; sub: string; intensity: number; highlighted?: boolean }) => (
  <g>
    <line x1={x} x2={x} y1={y - 30} y2={y - 8} stroke={color} strokeWidth={1.2 * (0.4 + intensity)} opacity={0.3 + intensity * 0.6} markerEnd="url(#aa-arrow)" />
    {highlighted && (
      <rect x={x - 92} y={y - 10} width={184} height={40} rx={7} fill={color} opacity={0.12}>
        <animate attributeName="opacity" values="0.08;0.22;0.08" dur="1s" repeatCount="indefinite" />
      </rect>
    )}
    <rect x={x - 90} y={y - 8} width={180} height={36} rx={6} fill="hsl(var(--background))" stroke={color} strokeWidth={1.2} opacity={0.4 + intensity * 0.6} />
    <text x={x} y={y + 6} textAnchor="middle" fontSize="9.5" fontWeight={700} fill={color} opacity={0.4 + intensity * 0.6}>{title}</text>
    <text x={x} y={y + 19} textAnchor="middle" fontSize="7.5" className="fill-muted-foreground" opacity={0.4 + intensity * 0.6}>{sub}</text>
  </g>
);
