import { useState } from "react";

type ECMOMode = "vv" | "va";

const ECMOCircuitDiagram = () => {
  const [mode, setMode] = useState<ECMOMode>("vv");

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">ECMO Circuit — VV vs VA</h3>
      <p className="text-xs text-muted-foreground mb-3">Toggle between veno-venous and veno-arterial configurations</p>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("vv")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${mode === "vv" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
          VV-ECMO
        </button>
        <button onClick={() => setMode("va")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${mode === "va" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
          VA-ECMO
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 380 340" width="360" height="320" className="border border-border rounded bg-gradient-to-b from-background to-secondary/10">
            <defs>
              <linearGradient id="deoxyBlood" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(225, 50%, 35%)" />
                <stop offset="100%" stopColor="hsl(225, 45%, 30%)" />
              </linearGradient>
              <linearGradient id="oxyBlood" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(0, 60%, 45%)" />
                <stop offset="100%" stopColor="hsl(0, 55%, 40%)" />
              </linearGradient>
              <marker id="flowArrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="hsl(var(--muted-foreground))" opacity="0.6" />
              </marker>
              <marker id="flowArrowRed" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="hsl(0, 55%, 50%)" opacity="0.7" />
              </marker>
              <marker id="flowArrowBlue" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="hsl(220, 50%, 45%)" opacity="0.7" />
              </marker>
            </defs>

            {/* ===== PATIENT (Heart/Body) ===== */}
            {/* Body outline */}
            <rect x="130" y="20" width="120" height="120" rx="16" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.25" />
            <text x="190" y="42" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="bold">PATIENT</text>

            {/* Heart icon */}
            <path d="M175,60 C175,52 182,48 188,48 C194,48 200,52 200,60 C200,52 206,48 212,48 C218,48 225,52 225,60 C225,75 200,92 200,92 C200,92 175,75 175,60Z"
              fill="hsl(0, 50%, 40%)" fillOpacity="0.3" stroke="hsl(0, 45%, 45%)" strokeWidth="1" />
            <text x="200" y="78" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">Heart</text>

            {/* Lungs */}
            <path d="M145,55 C135,50 130,58 132,68 C134,78 140,85 148,82" fill="hsl(210, 30%, 35%)" fillOpacity="0.15" stroke="hsl(210, 30%, 40%)" strokeWidth="0.8" opacity="0.4" />
            <path d="M255,55 C265,50 270,58 268,68 C266,78 260,85 252,82" fill="hsl(210, 30%, 35%)" fillOpacity="0.15" stroke="hsl(210, 30%, 40%)" strokeWidth="0.8" opacity="0.4" />
            <text x="138" y="70" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3" textAnchor="middle">L</text>
            <text x="262" y="70" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3" textAnchor="middle">R</text>

            {/* Vasculature representation */}
            {mode === "vv" ? (
              <>
                {/* ===== VV-ECMO CIRCUIT ===== */}
                {/* Drainage: femoral vein (IVC) → pump */}
                <text x="148" y="130" fontSize="6" fill="hsl(220, 50%, 55%)" opacity="0.7" textAnchor="end">Femoral vein</text>
                <text x="148" y="138" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4" textAnchor="end">(drainage)</text>

                {/* Drainage line — blue/deoxygenated */}
                <path d="M155,128 L155,170 Q155,185 140,185 L60,185 Q40,185 40,205 L40,260"
                  fill="none" stroke="url(#deoxyBlood)" strokeWidth="5" strokeLinecap="round" />
                <path d="M155,155 L155,170" fill="none" stroke="hsl(220, 50%, 45%)" strokeWidth="1" opacity="0.5" markerEnd="url(#flowArrowBlue)" />
                <text x="50" y="178" fontSize="5" fill="hsl(220, 50%, 55%)" opacity="0.5">Deoxygenated</text>

                {/* Pump */}
                <circle cx="40" cy="275" r="18" fill="hsl(var(--muted-foreground))" fillOpacity="0.08" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
                <text x="40" y="273" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold" opacity="0.7">PUMP</text>
                <text x="40" y="281" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">centrifugal</text>
                {/* Rotation arrow */}
                <path d="M28,268 C25,275 28,282 35,284" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.4" markerEnd="url(#flowArrow)" />

                {/* Pump → Oxygenator */}
                <path d="M58,275 L110,275"
                  fill="none" stroke="url(#deoxyBlood)" strokeWidth="5" strokeLinecap="round" />
                <path d="M75,275" fill="none" stroke="hsl(220, 50%, 45%)" strokeWidth="1" opacity="0.5" markerEnd="url(#flowArrowBlue)" />

                {/* Oxygenator (membrane lung) */}
                <rect x="110" y="255" width="80" height="40" rx="8" fill="hsl(var(--muted-foreground))" fillOpacity="0.06" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
                {/* Membrane fibers */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <line key={i} x1={120 + i * 10} y1="260" x2={120 + i * 10} y2="290" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
                ))}
                <text x="150" y="272" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold" opacity="0.7">OXYGENATOR</text>
                <text x="150" y="280" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">membrane lung</text>
                {/* Gas in/out */}
                <path d="M150,295 L150,310" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
                <text x="150" y="318" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">Sweep gas (O₂)</text>
                <text x="150" y="326" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.3">↑ flow = ↑ CO₂ removal</text>

                {/* Heat exchanger */}
                <rect x="200" y="258" width="30" height="16" rx="3" fill="hsl(30, 50%, 50%)" fillOpacity="0.12" stroke="hsl(30, 50%, 50%)" strokeWidth="0.8" opacity="0.5" />
                <text x="215" y="269" textAnchor="middle" fontSize="4" fill="hsl(30, 50%, 50%)" opacity="0.6">Heater</text>

                {/* Oxygenator → return: IJV (SVC) — red/oxygenated */}
                <path d="M190,275 L310,275 Q330,275 330,255 L330,185 Q330,170 315,170 L252,128"
                  fill="none" stroke="url(#oxyBlood)" strokeWidth="5" strokeLinecap="round" />
                <path d="M330,220 L330,200" fill="none" stroke="hsl(0, 55%, 50%)" strokeWidth="1" opacity="0.5" markerEnd="url(#flowArrowRed)" />
                <text x="320" y="178" fontSize="5" fill="hsl(0, 55%, 50%)" opacity="0.5">Oxygenated</text>

                <text x="252" y="130" fontSize="6" fill="hsl(0, 55%, 55%)" opacity="0.7">IJV</text>
                <text x="252" y="138" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">(return → RA)</text>

                {/* Dual-lumen cannula alternative note */}
                <text x="190" y="150" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3" fontStyle="italic">or bicaval dual-lumen (Avalon)</text>

                {/* Key point */}
                <rect x="230" y="300" width="140" height="30" rx="5" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.5" />
                <text x="300" y="314" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground))" opacity="0.6" fontWeight="bold">VV: No cardiac support</text>
                <text x="300" y="322" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.4">Native heart pumps oxygenated blood</text>
              </>
            ) : (
              <>
                {/* ===== VA-ECMO CIRCUIT ===== */}
                {/* Drainage: RA via femoral vein or direct */}
                <text x="148" y="130" fontSize="6" fill="hsl(220, 50%, 55%)" opacity="0.7" textAnchor="end">Femoral vein</text>
                <text x="148" y="138" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4" textAnchor="end">(drainage → RA)</text>

                {/* Drainage line */}
                <path d="M155,128 L155,170 Q155,185 140,185 L60,185 Q40,185 40,205 L40,260"
                  fill="none" stroke="url(#deoxyBlood)" strokeWidth="5" strokeLinecap="round" />
                <path d="M155,155 L155,170" fill="none" stroke="hsl(220, 50%, 45%)" strokeWidth="1" opacity="0.5" markerEnd="url(#flowArrowBlue)" />
                <text x="50" y="178" fontSize="5" fill="hsl(220, 50%, 55%)" opacity="0.5">Deoxygenated</text>

                {/* Pump */}
                <circle cx="40" cy="275" r="18" fill="hsl(var(--muted-foreground))" fillOpacity="0.08" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
                <text x="40" y="273" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold" opacity="0.7">PUMP</text>
                <text x="40" y="281" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">centrifugal</text>
                <path d="M28,268 C25,275 28,282 35,284" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.4" markerEnd="url(#flowArrow)" />

                {/* Pump → Oxygenator */}
                <path d="M58,275 L110,275"
                  fill="none" stroke="url(#deoxyBlood)" strokeWidth="5" strokeLinecap="round" />

                {/* Oxygenator */}
                <rect x="110" y="255" width="80" height="40" rx="8" fill="hsl(var(--muted-foreground))" fillOpacity="0.06" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <line key={i} x1={120 + i * 10} y1="260" x2={120 + i * 10} y2="290" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
                ))}
                <text x="150" y="272" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold" opacity="0.7">OXYGENATOR</text>
                <text x="150" y="280" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">membrane lung</text>
                <path d="M150,295 L150,310" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
                <text x="150" y="318" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">Sweep gas (O₂)</text>

                {/* Heat exchanger */}
                <rect x="200" y="258" width="30" height="16" rx="3" fill="hsl(30, 50%, 50%)" fillOpacity="0.12" stroke="hsl(30, 50%, 50%)" strokeWidth="0.8" opacity="0.5" />
                <text x="215" y="269" textAnchor="middle" fontSize="4" fill="hsl(30, 50%, 50%)" opacity="0.6">Heater</text>

                {/* Return: FEMORAL ARTERY — red/oxygenated (retrograde) */}
                <path d="M190,275 L310,275 Q330,275 330,255 L330,185 Q330,170 315,170 L252,128"
                  fill="none" stroke="url(#oxyBlood)" strokeWidth="5" strokeLinecap="round" />
                <path d="M330,220 L330,200" fill="none" stroke="hsl(0, 55%, 50%)" strokeWidth="1" opacity="0.5" markerEnd="url(#flowArrowRed)" />
                <text x="320" y="178" fontSize="5" fill="hsl(0, 55%, 50%)" opacity="0.5">Oxygenated</text>

                <text x="252" y="130" fontSize="6" fill="hsl(0, 55%, 55%)" opacity="0.7">Femoral artery</text>
                <text x="252" y="138" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">(return — retrograde)</text>

                {/* Distal perfusion cannula */}
                <path d="M280,128 L300,118 L310,125" fill="none" stroke="hsl(0, 45%, 50%)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
                <text x="315" y="120" fontSize="4.5" fill="hsl(0, 45%, 50%)" opacity="0.5">Distal perfusion</text>
                <text x="315" y="126" fontSize="4.5" fill="hsl(0, 45%, 50%)" opacity="0.5">cannula (prevent</text>
                <text x="315" y="132" fontSize="4.5" fill="hsl(0, 45%, 50%)" opacity="0.5">limb ischaemia)</text>

                {/* Mixing zone / watershed */}
                <rect x="140" y="92" width="120" height="22" rx="4" fill="hsl(35, 60%, 50%)" fillOpacity="0.08" stroke="hsl(35, 60%, 50%)" strokeWidth="1" opacity="0.5" strokeDasharray="3 2" />
                <text x="200" y="104" textAnchor="middle" fontSize="5" fill="hsl(35, 60%, 50%)" opacity="0.7" fontWeight="bold">Mixing zone (Harlequin)</text>
                <text x="200" y="112" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.4">Monitor R radial SpO₂</text>

                {/* Key point */}
                <rect x="230" y="300" width="140" height="30" rx="5" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.5" />
                <text x="300" y="314" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground))" opacity="0.6" fontWeight="bold">VA: Cardiac + respiratory support</text>
                <text x="300" y="322" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.4">Retrograde flow — risk of Harlequin</text>
              </>
            )}
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3 animate-fade-in" key={mode}>
          {mode === "vv" ? (
            <>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">VV-ECMO — Respiratory Support Only</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deoxygenated blood drained from RA (via femoral vein), oxygenated extracorporeally, and returned to RA (via IJV). Blood passes through native heart and lungs — <strong>requires adequate cardiac function</strong>. No increase in MAP or cardiac output.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Cannulation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Femoro-jugular:</strong> Drainage 23–25 Fr femoral vein → return 19–21 Fr right IJV. <strong>Bicaval dual-lumen (Avalon):</strong> Single right IJV cannula — drainage from SVC + IVC, return directed toward tricuspid valve. Requires TOE/fluoro guidance.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Recirculation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Oxygenated return blood re-entering drainage cannula before passing through native circulation. Reduces effective support. Minimise by: separating cannula tips, optimising cannula position, adequate cardiac output. Recirculation fraction ideally &lt;30%.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">VA-ECMO — Cardiac + Respiratory Support</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deoxygenated blood drained from RA (femoral vein), oxygenated, and returned to <strong>arterial system</strong> (femoral artery — peripheral, or ascending aorta — central). Provides both gas exchange AND circulatory support. Bypasses heart and lungs.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Harlequin Syndrome (North-South / Differential Hypoxia)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  In peripheral VA-ECMO: retrograde aortic flow meets native (poorly oxygenated) antegrade cardiac output. <strong>Upper body (coronaries, brain) receives deoxygenated blood</strong> from native heart, while lower body receives oxygenated ECMO blood. Monitor: <strong>right radial arterial SpO₂/PaO₂</strong>. Solution: convert to VAV-ECMO or add return cannula to IJV.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">LV Distension</p>
                <p className="text-xs text-muted-foreground mt-1">
                  VA-ECMO increases afterload → failing LV cannot eject → LV distension, ↑LVEDP, pulmonary oedema, LV thrombus. Venting strategies: IABP, Impella, LA/LV vent, atrial septostomy. Monitor: pulsatility on arterial waveform — flat trace = no LV ejection.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ECMOCircuitDiagram;
