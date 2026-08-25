import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type ECMOMode = "vv" | "va";

/* ─── Layout zones ─────────────────────────────────────────────
   viewBox: 520 × 440
   Patient zone:  x =   0 … 200  (left)
   Circuit zone:  x = 220 … 520  (right)
   Connector cannulae bridge the two zones.
   ────────────────────────────────────────────────────────────── */

const Patient = ({ mode }: { mode: ECMOMode }) => (
  <g>
    {/* Torso silhouette */}
    <path
      d="M55,40 Q100,28 145,40 L160,260 Q100,275 40,260 Z"
      fill="hsl(var(--muted-foreground))"
      fillOpacity="0.05"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="1.2"
      opacity="0.6"
    />
    <text
      x="100"
      y="56"
      textAnchor="middle"
      fontSize="9"
      fontWeight="700"
      letterSpacing="1.5"
      fill="hsl(var(--muted-foreground))"
      opacity="0.7"
    >
      PATIENT
    </text>

    {/* Lungs */}
    <path
      d="M55,80 C42,76 36,92 40,112 C44,132 56,142 68,138 L68,86 Z"
      fill="hsl(200, 35%, 55%)" fillOpacity="0.12"
      stroke="hsl(200, 40%, 45%)" strokeWidth="0.75" opacity="0.6"
    />
    <path
      d="M145,80 C158,76 164,92 160,112 C156,132 144,142 132,138 L132,86 Z"
      fill="hsl(200, 35%, 55%)" fillOpacity="0.12"
      stroke="hsl(200, 40%, 45%)" strokeWidth="0.75" opacity="0.6"
    />

    {/* Heart */}
    <path
      d="M82,100 C82,90 90,84 98,84 C104,84 109,88 109,94 C109,88 114,84 120,84 C128,84 136,90 136,100 C136,118 109,140 109,140 C109,140 82,118 82,100 Z"
      fill="hsl(0, 55%, 48%)" fillOpacity="0.18"
      stroke="hsl(0, 50%, 45%)" strokeWidth="1" opacity="0.85"
    />
    <text x="109" y="115" textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(var(--foreground))" opacity="0.7">Heart</text>

    {/* Anterior view: viewer's left = patient's right.
        SVC + IVC drain into the right atrium on the patient's right (viewer's left).
        Descending aorta lies to the left of the midline (viewer's right). */}
    {/* SVC (patient's right / viewer's left, blue) */}
    <path d="M95,40 L95,84" stroke="hsl(220, 60%, 50%)" strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round" />
    <text x="78" y="52" fontSize="8" fill="hsl(220, 55%, 50%)" opacity="0.75">SVC</text>

    {/* IVC (patient's right / viewer's left, blue, down to femoral) */}
    <path d="M95,140 L95,265" stroke="hsl(220, 60%, 50%)" strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round" />
    <text x="78" y="200" fontSize="8" fill="hsl(220, 55%, 50%)" opacity="0.75">IVC</text>

    {/* Descending aorta (patient's left / viewer's right, red, down) */}
    <path d="M125,108 Q140,108 140,128 L140,265" stroke="hsl(0, 65%, 50%)" strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round" />
    <text x="146" y="200" fontSize="8" fill="hsl(0, 60%, 50%)" opacity="0.75">Aorta</text>

    {/* Femoral vein stub */}
    <text x="95" y="280" textAnchor="middle" fontSize="8" fontWeight="600" fill="hsl(220, 55%, 50%)" opacity="0.85">Fem V</text>
    {mode === "va" && (
      <text x="140" y="280" textAnchor="middle" fontSize="8" fontWeight="600" fill="hsl(0, 60%, 50%)" opacity="0.85">Fem A</text>
    )}
    {mode === "vv" && (
      <text x="120" y="32" textAnchor="middle" fontSize="8" fontWeight="600" fill="hsl(0, 60%, 50%)" opacity="0.85">R IJV</text>
    )}
  </g>
);

const Pump = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r="28" fill="hsl(var(--card))" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.9" />
    <circle r="22" fill="hsl(var(--muted))" fillOpacity="0.4" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.6" />
    {/* Impeller blades — rotating */}
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.2s" repeatCount="indefinite" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          d="M0,0 Q8,-3 16,-1 L14,3 Q6,1 0,4 Z"
          fill="hsl(45, 80%, 55%)"
          stroke="hsl(45, 80%, 40%)"
          strokeWidth="0.5"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="4" fill="hsl(45, 90%, 70%)" />
    </g>
    <text y="46" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">Pump</text>
    <text y="58" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">centrifugal · 2–4k rpm</text>
  </g>
);

const Oxygenator = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x="-45" y="-30" width="90" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.95" />
    {/* Membrane fibres */}
    {Array.from({ length: 10 }, (_, i) => (
      <line key={i} x1={-40 + i * 9} y1="-25" x2={-40 + i * 9} y2="25" stroke="hsl(215, 30%, 60%)" strokeWidth="0.6" opacity="0.5" />
    ))}
    {/* Gas-exchange gradient overlay */}
    <rect x="-45" y="-30" width="90" height="60" rx="8" fill="url(#oxy-gradient)" opacity="0.4" />
    <text y="-5" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">Oxygenator</text>
    <text y="7" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">PMP membrane</text>

    {/* Sweep gas in/out */}
    <line x1="0" y1="-30" x2="0" y2="-42" stroke="hsl(195, 70%, 50%)" strokeWidth="2" />
    <polygon points="-3,-34 3,-34 0,-29" fill="hsl(195, 70%, 50%)" />
    <text x="0" y="-48" textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(195, 70%, 45%)">Sweep gas (O₂)</text>

    <line x1="0" y1="30" x2="0" y2="42" stroke="hsl(0, 55%, 50%)" strokeWidth="2" />
    <polygon points="-3,38 3,38 0,43" fill="hsl(0, 55%, 50%)" />
    <text x="0" y="56" textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(0, 55%, 50%)">CO₂ exhaust</text>
  </g>
);

/* Animated flow particle along an arbitrary path id */
const Flow = ({ pathId, color, delay = "0s", count = 4 }: { pathId: string; color: string; delay?: string; count?: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <circle key={i} r="3.5" fill={color} opacity="0.95">
        <animateMotion
          dur="2.8s"
          repeatCount="indefinite"
          begin={`${parseFloat(delay) + (i * 2.8) / count}s`}
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    ))}
  </>
);

const ECMOCircuitDiagram = () => {
  const [mode, setMode] = useState<ECMOMode>("vv");

  // Bridge points between patient and circuit
  // Drainage exits Fem V (95,265) → out to pump
  // Return enters either R IJV (120,40) for VV or Fem A (140,265) for VA

  // Pump @ (300, 320). Oxygenator @ (430, 200).
  const drainPath = "M 95 265 Q 95 320 200 340 L 272 320";
  const pumpToOxy = "M 328 320 Q 380 320 380 280 L 430 230";
  const returnPathVV = "M 430 170 Q 430 80 350 50 L 120 40";
  const returnPathVA = "M 430 170 Q 430 100 360 100 Q 250 100 200 220 Q 175 280 140 265";

  return (
    <DiagramFigure
      id="ecmo-circuit"
      title="ECMO circuit: VV vs VA configuration"
      description="Animated extracorporeal membrane oxygenation circuit toggling between veno-venous (respiratory support) and veno-arterial (cardiopulmonary support) configurations."
    >
      <div className="border border-border rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">ECMO Circuit — VV vs VA</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Toggle the mode to see how the return cannula site changes the support type
        </p>

        {/* Mode toggle */}
        <div role="tablist" aria-label="ECMO mode" className="inline-flex rounded-lg border border-border p-1 bg-secondary/40 mb-4">
          {(["vv", "va"] as ECMOMode[]).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                mode === m
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "vv" ? "VV-ECMO" : "VA-ECMO"}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* SVG */}
          <div className="w-full lg:flex-1 min-w-0">
            <svg viewBox="0 0 520 440" className="w-full h-auto border border-border rounded-lg bg-gradient-to-br from-background to-secondary/10">
              <defs>
                <linearGradient id="oxy-gradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="hsl(220, 70%, 45%)" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="hsl(280, 30%, 45%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(0, 70%, 50%)" stopOpacity="0.5" />
                </linearGradient>

                {/* Invisible motion paths */}
                <path id="ecmo-drain" d={drainPath} fill="none" />
                <path id="ecmo-pump-oxy" d={pumpToOxy} fill="none" />
                <path id="ecmo-return-vv" d={returnPathVV} fill="none" />
                <path id="ecmo-return-va" d={returnPathVA} fill="none" />
              </defs>

              {/* Zone divider (subtle) */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="hsl(var(--border))" strokeDasharray="3 4" opacity="0.4" />
              <text x="100" y="18" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="hsl(var(--muted-foreground))" opacity="0.6">PATIENT</text>
              <text x="360" y="18" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="hsl(var(--muted-foreground))" opacity="0.6">EXTRACORPOREAL CIRCUIT</text>

              <Patient mode={mode} />

              {/* Drainage tubing (deoxygenated, blue) — always present */}
              <path d={drainPath} stroke="hsl(220, 70%, 45%)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
              <path d={drainPath} stroke="hsl(220, 60%, 75%)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
              <text x="170" y="370" fontSize="9" fontWeight="600" fill="hsl(220, 55%, 45%)">
                Drainage 23–25 Fr
              </text>

              {/* Pump → oxygenator (still deoxygenated) */}
              <path d={pumpToOxy} stroke="hsl(220, 70%, 45%)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />

              {/* Return tubing (oxygenated, red) — depends on mode */}
              {mode === "vv" ? (
                <>
                  <path d={returnPathVV} stroke="hsl(0, 70%, 48%)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
                  <path d={returnPathVV} stroke="hsl(0, 60%, 80%)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                  <text x="270" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(0, 65%, 45%)">
                    Return 19–21 Fr → R IJV (RA)
                  </text>
                </>
              ) : (
                <>
                  <path d={returnPathVA} stroke="hsl(0, 70%, 48%)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
                  <path d={returnPathVA} stroke="hsl(0, 60%, 80%)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                  <text x="270" y="92" textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(0, 65%, 45%)">
                    Return 15–19 Fr → Fem artery (retrograde)
                  </text>
                </>
              )}

              {/* Components rendered last so they sit on top of tubing */}
              <Pump x={300} y={320} />
              <Oxygenator x={430} y={200} />

              {/* Animated flow particles */}
              <Flow pathId="ecmo-drain" color="hsl(220, 85%, 55%)" />
              <Flow pathId="ecmo-pump-oxy" color="hsl(220, 85%, 55%)" />
              <Flow pathId={mode === "vv" ? "ecmo-return-vv" : "ecmo-return-va"} color="hsl(0, 80%, 55%)" />

              {/* Mode-specific call-outs */}
              {mode === "va" && (
                <g>
                  {/* Mixing / watershed zone */}
                  <ellipse cx="120" cy="78" rx="32" ry="14" fill="hsl(45, 90%, 55%)" fillOpacity="0.18" stroke="hsl(45, 90%, 50%)" strokeWidth="1.2" strokeDasharray="3 2" />
                  <text x="120" y="80" textAnchor="middle" fontSize="8" fontWeight="700" fill="hsl(38, 90%, 35%)">Watershed</text>
                  <text x="120" y="92" textAnchor="middle" fontSize="7" fill="hsl(38, 80%, 40%)">(Harlequin)</text>
                </g>
              )}

              {/* Legend */}
              <g transform="translate(220, 400)">
                <rect x="-4" y="-12" width="290" height="32" rx="4" fill="hsl(var(--secondary))" fillOpacity="0.5" stroke="hsl(var(--border))" strokeWidth="0.5" />
                <line x1="6" y1="-2" x2="26" y2="-2" stroke="hsl(220, 70%, 45%)" strokeWidth="4" strokeLinecap="round" />
                <text x="30" y="1" fontSize="9" fill="hsl(var(--foreground))">Deoxygenated</text>
                <line x1="110" y1="-2" x2="130" y2="-2" stroke="hsl(0, 70%, 48%)" strokeWidth="4" strokeLinecap="round" />
                <text x="134" y="1" fontSize="9" fill="hsl(var(--foreground))">Oxygenated</text>
                <circle cx="16" cy="13" r="3" fill="hsl(45, 90%, 55%)" />
                <text x="24" y="16" fontSize="9" fill="hsl(var(--foreground))">Centrifugal pump (spinning)</text>
              </g>
            </svg>
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-[290px] lg:shrink-0 space-y-3 animate-fade-in" key={mode}>
            {mode === "vv" ? (
              <>
                <div className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm mb-1">VV-ECMO — Respiratory Support</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Drains from RA (fem vein), oxygenates, returns to RA (R IJV).
                    Blood still passes through native heart & lungs — <strong>requires intact cardiac output</strong>.
                    No effect on MAP.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm mb-1">Key Settings</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 list-disc pl-4">
                    <li>Flow 3–7 L/min (60–80 mL/kg/min)</li>
                    <li>FiO₂ on sweep → controls oxygenation</li>
                    <li>Sweep gas flow → controls CO₂ removal</li>
                    <li>Pre-membrane SvO₂; post-membrane PaO₂ &gt; 40 kPa</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm mb-1">Recirculation</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Oxygenated return re-entering drainage limb. Target &lt; 30%. Reduced by
                    separating cannula tips or using a bicaval dual-lumen (Avalon) via R IJV.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm mb-1">VA-ECMO — Cardiac + Respiratory</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Drains from RA, oxygenates, returns to <strong>femoral artery</strong>
                    (retrograde aortic flow). Bypasses both heart and lungs — provides full
                    gas exchange <em>and</em> circulatory support.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="font-semibold text-foreground text-sm mb-1">⚠ Harlequin Syndrome</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Recovered native LV ejects <em>deoxygenated</em> blood that meets retrograde
                    ECMO flow at an aortic watershed. Upper body (coronaries, brain, R arm) is
                    perfused by poorly-oxygenated blood. <strong>Monitor right radial SpO₂.</strong>
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="font-semibold text-foreground text-sm mb-1">⚠ LV Distension</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Retrograde flow ↑ LV afterload. Failing LV cannot eject → LV distends,
                    pulmonary oedema, intracardiac thrombus. Vent with IABP, Impella ("ECMELLA"),
                    or atrial septostomy. Track arterial pulsatility.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm mb-1">Distal Limb Perfusion</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Femoral arterial cannula occludes the SFA — add a 6–8 Fr antegrade sheath
                    distally. Monitor foot SpO₂, NIRS, lactate.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default ECMOCircuitDiagram;
