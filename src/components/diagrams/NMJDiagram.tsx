import { useState, useEffect } from "react";

const PHASES = [
  { id: "rest", label: "Resting State", duration: 70 },
  { id: "ap", label: "Action Potential Arrives", duration: 40 },
  { id: "ca", label: "Ca²⁺ Influx through VGCCs", duration: 80 },
  { id: "syt", label: "Ca²⁺ Binds Synaptotagmin-1", duration: 50 },
  { id: "vesicle", label: "SNARE Zippering → Vesicle Fusion & ACh Release", duration: 60 },
  { id: "bind", label: "ACh Binds nAChR", duration: 50 },
  { id: "depol", label: "End-Plate Depolarisation", duration: 50 },
  { id: "degrade", label: "ACh Hydrolysis by AChE", duration: 50 },
];

const TOTAL = PHASES.reduce((s, p) => s + p.duration, 0);

export const NMJDiagram = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setFrame((f) => (f + 1) % TOTAL), 40);
    return () => clearInterval(interval);
  }, [playing]);

  // Jump playhead to the start of a named phase
  const jumpToPhase = (id: string) => {
    let acc = 0;
    for (const p of PHASES) {
      if (p.id === id) {
        setFrame(acc);
        setPlaying(false);
        return;
      }
      acc += p.duration;
    }
  };

  // Determine current phase
  let accumulated = 0;
  let currentPhase = PHASES[0];
  let phaseProgress = 0;
  for (const p of PHASES) {
    if (frame >= accumulated && frame < accumulated + p.duration) {
      currentPhase = p;
      phaseProgress = (frame - accumulated) / p.duration;
      break;
    }
    accumulated += p.duration;
  }

  const w = 520;
  const h = 380;

  // Vesicle positions
  const vesicles = [
    { cx: 160, cy: 115 },
    { cx: 200, cy: 105 },
    { cx: 240, cy: 112 },
    { cx: 280, cy: 108 },
    { cx: 320, cy: 115 },
  ];

  const showCaArrows = currentPhase.id === "ca" || currentPhase.id === "syt" || currentPhase.id === "vesicle";
  const showAChDots = currentPhase.id === "vesicle" || currentPhase.id === "bind" || currentPhase.id === "depol";
  const vesiclesFusing = currentPhase.id === "vesicle" || currentPhase.id === "bind" || currentPhase.id === "depol";
  const receptorsActive = currentPhase.id === "bind" || currentPhase.id === "depol";
  const showDegradation = currentPhase.id === "degrade";
  const showAP = currentPhase.id === "ap" || currentPhase.id === "ca";

  // ─── Synchronised Ca²⁺ sub-animation timing ─────────────────────────────
  // Single normalised timeline t spanning "ca" → "syt" → "vesicle" phases (0 → 3).
  //   t in [0, 1)  = within "ca" phase
  //   t in [1, 2)  = within "syt" phase (Ca²⁺ binding to synaptotagmin)
  //   t in [2, 3)  = within "vesicle" phase
  const caT =
    currentPhase.id === "ca" ? phaseProgress
      : currentPhase.id === "syt" ? 1 + phaseProgress
      : currentPhase.id === "vesicle" ? 2 + phaseProgress
      : -1;

  // Helper: smooth ramp 0→1 between two timeline points
  const ramp = (t: number, start: number, end: number) => {
    if (t <= start) return 0;
    if (t >= end) return 1;
    return (t - start) / (end - start);
  };

  // VGCC opening: opens fast (0 → 0.15), stays open, closes late in "vesicle" (2.7 → 2.95)
  const vgccOpen = caT >= 0 ? ramp(caT, 0, 0.15) * (1 - ramp(caT, 2.7, 2.95)) : 0;

  // Ca²⁺ ions stream: starts 0.1, fully on by 0.3, fades out 2.0 → 2.3 (early vesicle)
  const caStreamIntensity = caT >= 0 ? ramp(caT, 0.1, 0.3) * (1 - ramp(caT, 2.0, 2.3)) : 0;

  // Cloud builds through "ca" (0.2 → 1.0), holds through "syt", dissipates 2.3 → 3.0
  const cloudIntensity = caT >= 0 ? ramp(caT, 0.2, 1.0) * (1 - ramp(caT, 2.3, 3.0)) : 0;

  // Synaptotagmin Ca²⁺ binding: ramps up over the "syt" phase (1.0 → 1.8), saturates, then released as fusion proceeds (2.5 → 3.0)
  const sytBinding = caT >= 0 ? ramp(caT, 1.0, 1.8) * (1 - ramp(caT, 2.5, 3.0)) : 0;

  // Vesicle fusion progress: only during "vesicle" phase (caT 2 → 3)
  const fusionProgress = currentPhase.id === "vesicle" ? phaseProgress
    : currentPhase.id === "bind" || currentPhase.id === "depol" ? 1
    : 0;

  // ACh dot animation
  const achY = showAChDots
    ? 140 + phaseProgress * 50
    : 140;

  return (
    <div className="w-full max-w-xl mx-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Nerve terminal */}
        <rect x={100} y={40} width={300} height={100} rx="12" fill="hsl(210 60% 94%)" stroke="hsl(210 70% 45%)" strokeWidth="2" />
        <text x={250} y={30} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Pre-synaptic Nerve Terminal</text>

        {/* Action potential flash */}
        {showAP && (
          <g>
            <line x1={60} y1={90} x2={100} y2={90} stroke="hsl(30 80% 50%)" strokeWidth="3" strokeDasharray="6 3">
              <animate attributeName="stroke-opacity" values="1;0.3;1" dur="0.4s" repeatCount="indefinite" />
            </line>
            <text x={50} y={85} textAnchor="end" fontSize="9" className="fill-muted-foreground">AP →</text>
          </g>
        )}

        {/* Voltage-gated Ca²⁺ channels — labelled VGCC, glow when open */}
        {[140, 200, 260, 320, 360].map((x, i) => {
          const open = vgccOpen > 0.05;
          return (
            <g key={i}>
              {open && (
                <circle cx={x} cy={140} r={14} fill="hsl(35 95% 55%)" opacity={0.25 * vgccOpen}>
                  <animate attributeName="r" values="10;16;10" dur="0.8s" repeatCount="indefinite" />
                </circle>
              )}
              <rect x={x - 7} y={130} width={14} height={20} rx="2"
                fill={open ? `hsl(35 95% ${55 + (1 - vgccOpen) * 25}%)` : "hsl(210 20% 80%)"}
                stroke={open ? "hsl(25 90% 40%)" : "hsl(210 20% 60%)"}
                strokeWidth={open ? 1.5 : 1}
              />
              {open && (
                <line x1={x} y1={132} x2={x} y2={148}
                  stroke="hsl(45 100% 95%)" strokeWidth={2.5 * vgccOpen} opacity={vgccOpen} />
              )}
            </g>
          );
        })}
        {/* VGCC label */}
        {vgccOpen > 0.3 && (
          <text x={100} y={128} fontSize="9" className="font-semibold" fill="hsl(25 90% 40%)" opacity={vgccOpen}>VGCC open</text>
        )}

        {/* Ca²⁺ ions streaming UP through channels into terminal */}
        {caStreamIntensity > 0.02 && [140, 200, 260, 320, 360].flatMap((x, ci) =>
          [0, 0.4, 0.75].map((delay, di) => {
            const cycle = ((frame * 0.025) + delay + ci * 0.13) % 1;
            const startY = 175;
            const endY = 110;
            const y = startY + (endY - startY) * cycle;
            const baseOpacity = cycle < 0.1 ? cycle * 10 : cycle > 0.85 ? (1 - cycle) * 6.5 : 1;
            const opacity = Math.min(1, baseOpacity) * caStreamIntensity;
            return (
              <g key={`${ci}-${di}`}>
                <circle cx={x} cy={y} r={5}
                  fill="hsl(35 95% 55%)" stroke="hsl(25 90% 35%)" strokeWidth="1"
                  opacity={opacity} />
                <text x={x} y={y + 2} textAnchor="middle" fontSize="5"
                  className="font-bold" fill="hsl(0 0% 100%)"
                  opacity={opacity}>
                  Ca
                </text>
              </g>
            );
          })
        )}

        {/* Intracellular Ca²⁺ cloud building under active zone */}
        {cloudIntensity > 0.02 && (
          <ellipse cx={250} cy={120} rx={130} ry={18}
            fill="hsl(35 95% 55%)" opacity={0.1 + cloudIntensity * 0.3} />
        )}

        {/* Vesicles — Syt-1 sensors visible at base; Ca²⁺ binds them before SNARE-mediated fusion */}
        {vesicles.map((v, i) => {
          const localFusion = Math.max(0, Math.min(1, fusionProgress * 1.6 - i * 0.12));
          const fusing = localFusion > 0;
          const vy = v.cy + (140 - v.cy) * localFusion;
          const opacity = showDegradation ? 0.3 : fusing ? 1 - 0.4 * localFusion : 1;

          const sytY = vy + 12;
          const sytPositions = [-5, 0, 5];
          const showSyt = caT >= 0 && localFusion < 0.6;
          const sytGlow = sytBinding * (1 - localFusion);

          return (
            <g key={i}>
              <circle cx={v.cx} cy={vy} r={12} fill="hsl(170 50% 70%)" stroke="hsl(170 50% 40%)" strokeWidth="1.5" opacity={opacity} />
              {localFusion < 0.5 && (
                <>
                  <circle cx={v.cx - 3} cy={vy - 2} r={2} fill="hsl(170 50% 40%)" opacity={1 - localFusion * 2} />
                  <circle cx={v.cx + 3} cy={vy + 2} r={2} fill="hsl(170 50% 40%)" opacity={1 - localFusion * 2} />
                </>
              )}

              {/* Synaptotagmin-1 sensors (3 C2 domains) */}
              {showSyt && sytPositions.map((dx, k) => {
                const bound = sytGlow > 0.1;
                return (
                  <g key={k}>
                    {bound && (
                      <circle cx={v.cx + dx} cy={sytY} r={4 + sytGlow * 2}
                        fill="hsl(35 95% 55%)" opacity={0.35 * sytGlow}>
                        <animate attributeName="opacity"
                          values={`${0.2 * sytGlow};${0.5 * sytGlow};${0.2 * sytGlow}`}
                          dur="0.6s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={v.cx + dx} cy={sytY} r={2.5}
                      fill={bound ? "hsl(35 95% 55%)" : "hsl(280 30% 65%)"}
                      stroke={bound ? "hsl(25 90% 35%)" : "hsl(280 30% 40%)"}
                      strokeWidth="0.8"
                      opacity={opacity} />
                    {bound && (
                      <circle cx={v.cx + dx} cy={sytY - 1} r={1.2}
                        fill="hsl(45 100% 95%)" opacity={sytGlow} />
                    )}
                  </g>
                );
              })}

              {i === 0 && showSyt && sytGlow > 0.2 && (
                <text x={v.cx - 22} y={sytY + 3} fontSize="7"
                  fill="hsl(280 40% 35%)" className="font-semibold" opacity={sytGlow}>
                  Syt-1
                </text>
              )}
            </g>
          );
        })}

        {/* ── Mechanism callout: Ca²⁺ → Syt-1 → complexin displacement → SNARE zippering ── */}
        {(currentPhase.id === "syt" || (currentPhase.id === "vesicle" && phaseProgress < 0.4)) && (() => {
          // Sub-step progress along caT (1.0 → 2.4 covers syt phase + early vesicle)
          // Step 1 (Ca²⁺ → Syt-1):       caT 1.00 → 1.45
          // Step 2 (displaces complexin): caT 1.45 → 1.90
          // Step 3 (SNARE zippers):       caT 1.90 → 2.40
          const stepActive = (start: number, end: number) => {
            if (caT < start) return 0;
            if (caT > end + 0.25) return 0.35; // dim "completed" tail
            if (caT > end) return 1;            // fully on, holding
            return ramp(caT, start, start + 0.15) * 1; // fade in
          };
          const s1 = stepActive(1.00, 1.45);
          const s2 = stepActive(1.45, 1.90);
          const s3 = stepActive(1.90, 2.40);
          const containerOpacity = Math.max(sytBinding, currentPhase.id === "vesicle" ? 1 - phaseProgress * 2 : 0);

          return (
          <g opacity={containerOpacity}>
            {/* Pointer line from callout down to a docked vesicle base */}
            <line x1={295} y1={88} x2={355} y2={132} stroke="hsl(280 50% 55%)" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
            {/* Callout card */}
            <rect x={150} y={48} width={295} height={42} rx={6}
              fill="hsl(280 60% 97%)" stroke="hsl(280 50% 55%)" strokeWidth="1.2" />
            <text x={160} y={62} fontSize="9" fontWeight="700" fill="hsl(280 55% 35%)">
              Molecular trigger
            </text>

            {/* Step 1 — Ca²⁺ binds Syt-1 */}
            <g opacity={0.25 + s1 * 0.75}>
              {s1 > 0.5 && (
                <rect x={157} y={70} width={98} height={11} rx={2}
                  fill="hsl(35 90% 88%)" opacity={s1 * 0.7}>
                  <animate attributeName="opacity" values={`${s1 * 0.4};${s1 * 0.8};${s1 * 0.4}`} dur="0.7s" repeatCount="indefinite" />
                </rect>
              )}
              <text x={160} y={78} fontSize="8.5" fontWeight={s1 > 0.5 ? 800 : 600} fill="hsl(35 90% 40%)">
                4 Ca²⁺ → Syt-1 C2
              </text>
            </g>

            {/* Step 2 — displaces complexin */}
            <g opacity={0.25 + s2 * 0.75}>
              {s2 > 0.5 && (
                <rect x={255} y={70} width={130} height={11} rx={2}
                  fill="hsl(280 60% 92%)" opacity={s2 * 0.7}>
                  <animate attributeName="opacity" values={`${s2 * 0.4};${s2 * 0.8};${s2 * 0.4}`} dur="0.7s" repeatCount="indefinite" />
                </rect>
              )}
              <text x={258} y={78} fontSize="8.5" fontWeight={s2 > 0.5 ? 800 : 600} fill="hsl(280 50% 45%)">
                → displaces complexin
              </text>
            </g>

            {/* Step 3 — SNARE zippers */}
            <g opacity={0.25 + s3 * 0.75}>
              {s3 > 0.5 && (
                <rect x={157} y={80} width={270} height={11} rx={2}
                  fill="hsl(160 55% 90%)" opacity={s3 * 0.7}>
                  <animate attributeName="opacity" values={`${s3 * 0.4};${s3 * 0.8};${s3 * 0.4}`} dur="0.7s" repeatCount="indefinite" />
                </rect>
              )}
              <text x={160} y={88} fontSize="8.5" fontWeight={s3 > 0.5 ? 800 : 600} fill="hsl(160 60% 35%)">
                → SNARE (Syb · Stx · SNAP-25) zippers → fusion
              </text>
            </g>

            {/* Sub-step progress dots */}
            <g transform="translate(410, 56)">
              {[s1, s2, s3].map((s, i) => (
                <circle key={i} cx={i * 8} cy={0} r={2.5}
                  fill={s > 0.5 ? "hsl(280 55% 45%)" : "hsl(280 30% 80%)"} />
              ))}
            </g>
          </g>
          );
        })()}

        {/* Label vesicles */}
        <text x={380} y={95} fontSize="9" className="fill-muted-foreground">ACh vesicles</text>

        {/* Synaptic cleft */}
        <rect x={100} y={150} width={300} height={50} fill="hsl(45 40% 95%)" stroke="none" />
        <text x={420} y={178} fontSize="9" className="fill-muted-foreground">Synaptic</text>
        <text x={420} y={188} fontSize="9" className="fill-muted-foreground">Cleft</text>

        {/* ACh molecules in cleft */}
        {showAChDots && Array.from({ length: 8 }).map((_, i) => {
          const x = 130 + i * 30 + Math.sin(i * 2 + frame * 0.1) * 5;
          const y = Math.min(achY + Math.sin(i * 3) * 8, 195);
          const opacity = showDegradation ? Math.max(0, 1 - phaseProgress * 2) : 0.8;
          return (
            <circle key={i} cx={x} cy={y} r={3} fill="hsl(170 50% 40%)" opacity={opacity} />
          );
        })}

        {/* AChE molecules */}
        {showDegradation && Array.from({ length: 4 }).map((_, i) => (
          <g key={i} opacity={phaseProgress}>
            <text x={150 + i * 55} y={178} fontSize="8" className="font-semibold" fill="hsl(0 65% 50%)">AChE</text>
          </g>
        ))}

        {/* Post-synaptic membrane / motor end plate */}
        <rect x={100} y={200} width={300} height={90} rx="12" fill="hsl(340 40% 95%)" stroke="hsl(340 60% 50%)" strokeWidth="2" />
        <text x={250} y={218} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Motor End Plate</text>

        {/* nAChR receptors */}
        {[140, 180, 220, 260, 300, 340].map((x, i) => {
          const active = receptorsActive && i < Math.floor(phaseProgress * 6 + 1);
          return (
            <g key={i}>
              {/* Receptor channel */}
              <rect x={x - 8} y={195} width={16} height={24} rx="3"
                fill={active ? "hsl(170 50% 60%)" : "hsl(340 30% 85%)"}
                stroke={active ? "hsl(170 50% 35%)" : "hsl(340 30% 60%)"}
                strokeWidth="1.5"
              />
              {/* Channel pore */}
              <line x1={x} y1={197} x2={x} y2={217}
                stroke={active ? "hsl(170 50% 35%)" : "hsl(340 30% 70%)"}
                strokeWidth={active ? "3" : "1"}
              />
              {active && (
                <text x={x} y={230} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Na⁺↓</text>
              )}
            </g>
          );
        })}
        <text x={380} y={210} fontSize="9" className="fill-muted-foreground">nAChR</text>

        {/* End-plate potential */}
        {currentPhase.id === "depol" && (
          <g>
            <text x={250} y={270} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">
              End-Plate Potential → Muscle AP
            </text>
            <line x1={170} y1={275} x2={330} y2={275} stroke="hsl(340 60% 50%)" strokeWidth="2">
              <animate attributeName="stroke-opacity" values="1;0.4;1" dur="0.5s" repeatCount="indefinite" />
            </line>
          </g>
        )}

        {/* Choline recycling arrow */}
        {showDegradation && (
          <g opacity={phaseProgress}>
            <path d="M 250 200 Q 430 170 250 145" fill="none" stroke="hsl(210 50% 60%)" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrowRecycle)" />
            <text x={440} y={165} fontSize="8" className="fill-muted-foreground">Choline</text>
            <text x={440} y={175} fontSize="8" className="fill-muted-foreground">reuptake</text>
          </g>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrowCa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(30 80% 50%)" />
          </marker>
          <marker id="arrowRecycle" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(210 50% 60%)" />
          </marker>
        </defs>
      </svg>

      {/* Phase indicator */}
      <div className="text-center mt-2 mb-3">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary">
          {currentPhase.label}
        </span>
        {currentPhase.id === "ca" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            Depolarisation opens <span className="font-semibold" style={{ color: "hsl(25 90% 40%)" }}>P/Q-type voltage-gated Ca²⁺ channels</span>.
            Extracellular Ca²⁺ flows down its gradient into the nerve terminal, raising local
            [Ca²⁺]ᵢ from ~100 nM to &gt;100 µM at the active zone.
          </p>
        )}
        {currentPhase.id === "syt" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            Ca²⁺ binds the C2A/C2B domains of <span className="font-semibold" style={{ color: "hsl(280 40% 35%)" }}>synaptotagmin-1</span> on
            the docked vesicle. Cooperative binding (~5 Ca²⁺ ions) triggers a conformational change that
            displaces complexin and releases the SNARE complex to zipper.
          </p>
        )}
        {currentPhase.id === "vesicle" && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            SNARE zippering (synaptobrevin · syntaxin · SNAP-25) drives membrane fusion. The vesicle
            collapses into the active zone and releases a quantum (~10 000 ACh molecules) into the cleft.
          </p>
        )}
      </div>

      {/* Cross-links: jump between molecular sub-stages */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 text-xs">
        <span className="text-muted-foreground mr-1">Jump to:</span>
        {[
          { id: "rest", label: "Docking", hint: "Vesicles tethered at active zone" },
          { id: "ca", label: "Ca²⁺ influx", hint: "VGCCs open, [Ca²⁺]ᵢ rises" },
          { id: "syt", label: "Priming (Syt-1 binding)", hint: "Ca²⁺ binds Syt-1 → complexin displaced" },
          { id: "vesicle", label: "Fusion", hint: "SNARE zippers → ACh release" },
        ].map((link) => {
          const isActive = currentPhase.id === link.id;
          return (
            <button
              key={link.id}
              onClick={() => jumpToPhase(link.id)}
              title={link.hint}
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
              className={`h-1.5 rounded-full transition-colors cursor-pointer hover:brightness-110 ${isCurrent ? "bg-primary" : frame > start ? "bg-primary/30" : "bg-muted"}`}
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
