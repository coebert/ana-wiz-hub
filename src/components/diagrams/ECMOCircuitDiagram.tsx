import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type ECMOMode = "vv" | "va";

/* ─── Shared SVG sub-components ─── */

const PatientBody = ({ mode }: { mode: ECMOMode }) => (
  <g>
    {/* Torso silhouette */}
    <path d="M140,28 Q190,18 240,28 L255,140 Q190,155 125,140 Z"
      fill="hsl(var(--muted-foreground))" fillOpacity="0.04"
      stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />
    <text x="190" y="42" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="600" letterSpacing="1">PATIENT</text>

    {/* Heart — anatomical shape */}
    <path d="M174,58 C174,50 180,46 186,46 C192,46 196,50 196,56 C196,50 200,46 206,46 C212,46 218,50 218,58 C218,72 196,88 196,88 C196,88 174,72 174,58Z"
      fill="hsl(0, 45%, 38%)" fillOpacity="0.35" stroke="hsl(0, 40%, 45%)" strokeWidth="1" />
    {/* Aortic arch */}
    <path d="M196,52 Q196,36 215,36 Q234,36 234,52 L234,90"
      fill="none" stroke="hsl(0, 50%, 50%)" strokeWidth="2" opacity="0.3" />
    {/* SVC */}
    <path d="M220,28 L220,52" fill="none" stroke="hsl(220, 45%, 45%)" strokeWidth="2" opacity="0.25" />
    {/* IVC */}
    <path d="M180,88 L180,140" fill="none" stroke="hsl(220, 45%, 45%)" strokeWidth="2" opacity="0.25" />
    <text x="196" y="74" textAnchor="middle" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.5">Heart</text>

    {/* Lungs */}
    <path d="M142,48 C130,44 124,54 126,66 C128,78 136,86 146,82 L146,52Z"
      fill="hsl(200, 25%, 50%)" fillOpacity="0.08" stroke="hsl(200, 30%, 45%)" strokeWidth="0.75" opacity="0.4" />
    <path d="M250,48 C262,44 268,54 266,66 C264,78 256,86 246,82 L246,52Z"
      fill="hsl(200, 25%, 50%)" fillOpacity="0.08" stroke="hsl(200, 30%, 45%)" strokeWidth="0.75" opacity="0.4" />
    <text x="136" y="67" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" textAnchor="middle">L</text>
    <text x="256" y="67" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" textAnchor="middle">R</text>

    {/* Femoral vessels at bottom */}
    <line x1="175" y1="140" x2="175" y2="158" stroke="hsl(220, 45%, 45%)" strokeWidth="2" opacity="0.25" />
    {mode === "va" && <line x1="205" y1="140" x2="205" y2="158" stroke="hsl(0, 50%, 50%)" strokeWidth="2" opacity="0.25" />}
    <text x="175" y="166" textAnchor="middle" fontSize="5" fill="hsl(220, 50%, 55%)" opacity="0.5">Fem V</text>
    {mode === "va" && <text x="205" y="166" textAnchor="middle" fontSize="5" fill="hsl(0, 55%, 55%)" opacity="0.5">Fem A</text>}
  </g>
);

const PumpUnit = () => (
  <g>
    {/* Housing */}
    <circle cx="60" cy="260" r="22" fill="hsl(var(--muted-foreground))" fillOpacity="0.06"
      stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
    {/* Impeller blades */}
    {[0, 60, 120, 180, 240, 300].map(angle => (
      <line key={angle}
        x1={60 + 8 * Math.cos(angle * Math.PI / 180)} y1={260 + 8 * Math.sin(angle * Math.PI / 180)}
        x2={60 + 16 * Math.cos(angle * Math.PI / 180)} y2={260 + 16 * Math.sin(angle * Math.PI / 180)}
        stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
    ))}
    <text x="60" y="258" textAnchor="middle" fontSize="6.5" fill="hsl(var(--foreground))" fontWeight="700" opacity="0.7">PUMP</text>
    <text x="60" y="267" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">Centrifugal</text>
    {/* RPM indicator */}
    <text x="60" y="287" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">2000–5000 RPM</text>
    {/* Rotation arrow */}
    <path d="M44,250 C40,258 44,268 52,272" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.4">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
    </path>
    <polygon points="52,272 48,268 54,268" fill="hsl(var(--muted-foreground))" opacity="0.4" />
  </g>
);

const Oxygenator = () => (
  <g>
    {/* Main housing */}
    <rect x="120" y="240" width="100" height="50" rx="10"
      fill="hsl(var(--muted-foreground))" fillOpacity="0.05"
      stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
    {/* Hollow fibre membranes */}
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} x1={130 + i * 7.5} y1="248" x2={130 + i * 7.5} y2="282"
        stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
    ))}
    {/* Blood path arrows (horizontal through fibres) */}
    <path d="M125,258 L215,258" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 3" />
    <path d="M125,272 L215,272" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 3" />
    <text x="170" y="260" textAnchor="middle" fontSize="6.5" fill="hsl(var(--foreground))" fontWeight="700" opacity="0.7">OXYGENATOR</text>
    <text x="170" y="269" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">Polymethylpentene</text>
    <text x="170" y="277" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">hollow fibre membrane</text>

    {/* Gas exchange labels */}
    <path d="M170,290 L170,310" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
    <text x="170" y="320" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.45">Sweep gas (O₂ + air)</text>
    <text x="170" y="329" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.35">↑ FGF = ↑ CO₂ removal</text>
    <text x="170" y="337" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.35">↑ FiO₂ = ↑ oxygenation</text>
  </g>
);

const HeatExchanger = () => (
  <g>
    <rect x="228" y="244" width="36" height="20" rx="4"
      fill="hsl(25, 55%, 50%)" fillOpacity="0.1"
      stroke="hsl(25, 55%, 50%)" strokeWidth="0.75" opacity="0.5" />
    {/* Water circuit symbol */}
    <path d="M234,250 C238,246 242,254 246,250 C250,246 254,254 258,250"
      fill="none" stroke="hsl(25, 55%, 50%)" strokeWidth="0.75" opacity="0.4" />
    <text x="246" y="260" textAnchor="middle" fontSize="4.5" fill="hsl(25, 55%, 50%)" opacity="0.6">Heat</text>
    <text x="246" y="268" textAnchor="middle" fontSize="3.5" fill="hsl(25, 55%, 50%)" opacity="0.4">exchanger</text>
  </g>
);

const MonitoringPoints = ({ mode }: { mode: ECMOMode }) => (
  <g>
    {/* Pre-oxygenator pressure */}
    <circle cx="105" y="265" r="3" fill="hsl(45, 70%, 55%)" fillOpacity="0.2" stroke="hsl(45, 70%, 55%)" strokeWidth="0.75" opacity="0.6" />
    <text x="105" y="258" textAnchor="middle" fontSize="3.5" fill="hsl(45, 70%, 55%)" opacity="0.5">P₁</text>

    {/* Post-oxygenator pressure */}
    <circle cx="235" y="265" r="3" fill="hsl(45, 70%, 55%)" fillOpacity="0.2" stroke="hsl(45, 70%, 55%)" strokeWidth="0.75" opacity="0.6" />
    <text x="235" y="258" textAnchor="middle" fontSize="3.5" fill="hsl(45, 70%, 55%)" opacity="0.5">P₂</text>

    {/* ΔP across oxygenator */}
    <path d="M110,265 L230,265" fill="none" stroke="hsl(45, 70%, 55%)" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.3" />

    {/* Pre-membrane SvO₂ */}
    <text x="90" y="245" fontSize="4" fill="hsl(220, 50%, 55%)" opacity="0.5" textAnchor="end">Pre-membrane</text>
    <text x="90" y="251" fontSize="3.5" fill="hsl(220, 50%, 55%)" opacity="0.4" textAnchor="end">SvO₂ monitor</text>

    {/* Post-membrane */}
    <text x="280" y="245" fontSize="4" fill="hsl(0, 55%, 55%)" opacity="0.5">Post-membrane</text>
    <text x="280" y="251" fontSize="3.5" fill="hsl(0, 55%, 55%)" opacity="0.4">PaO₂ &gt; 40 kPa</text>

    {/* Flow sensor */}
    <rect x="84" y="256" width="8" height="8" rx="1" fill="hsl(150, 50%, 45%)" fillOpacity="0.15" stroke="hsl(150, 50%, 45%)" strokeWidth="0.5" opacity="0.5" />
    <text x="88" y="262" textAnchor="middle" fontSize="3" fill="hsl(150, 50%, 45%)" opacity="0.5">F</text>

    {mode === "va" && (
      <g>
        <text x="350" y="100" textAnchor="end" fontSize="4" fill="hsl(35, 60%, 50%)" opacity="0.6">R radial SpO₂</text>
        <text x="350" y="106" textAnchor="end" fontSize="3.5" fill="hsl(35, 60%, 50%)" opacity="0.45">monitor mixing zone</text>
      </g>
    )}
  </g>
);

const FlowAnimation = ({ path, color, delay = "0s" }: { path: string; color: string; delay?: string }) => (
  <circle r="3" fill={color} opacity="0.6">
    <animateMotion dur="3s" repeatCount="indefinite" begin={delay}>
      <mpath href={`#${path}`} />
    </animateMotion>
    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin={delay} />
  </circle>
);

const ECMOCircuitDiagram = () => {
  const [mode, setMode] = useState<ECMOMode>("vv");

  return (
    <DiagramFigure id="ecmo-circuit" title="ECMO circuit: veno-venous and veno-arterial configurations" description="Animated extracorporeal membrane oxygenation circuit toggling between VV and VA configurations, with cannulation sites, pump, oxygenator and heat exchanger.">
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">ECMO Circuit — VV vs VA</h3>
      <p className="text-xs text-muted-foreground mb-3">Interactive diagram showing circuit components, flow paths, and monitoring points</p>

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
          <svg viewBox="0 0 400 360" width="390" height="350" className="border border-border rounded bg-gradient-to-b from-background to-secondary/10">
            <defs>
              <linearGradient id="ecmo-deoxy" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(225, 55%, 38%)" />
                <stop offset="100%" stopColor="hsl(225, 50%, 32%)" />
              </linearGradient>
              <linearGradient id="ecmo-oxy" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(0, 60%, 48%)" />
                <stop offset="100%" stopColor="hsl(0, 55%, 42%)" />
              </linearGradient>
              <filter id="ecmo-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <PatientBody mode={mode} />

            {mode === "vv" ? (
              <g>
                {/* ── VV-ECMO Flow Paths ── */}
                {/* Drainage: femoral vein → pump */}
                <path id="vv-drain" d="M175,158 L175,195 Q175,210 155,210 L80,210 Q60,210 60,230 L60,238"
                  fill="none" stroke="url(#ecmo-deoxy)" strokeWidth="3" strokeLinecap="round" />
                <text x="130" y="205" fontSize="5" fill="hsl(220, 50%, 55%)" opacity="0.5">Drainage cannula</text>
                <text x="130" y="212" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">23–25 Fr multistage</text>

                {/* Pump → oxygenator */}
                <path d="M82,260 L120,260"
                  fill="none" stroke="url(#ecmo-deoxy)" strokeWidth="3" strokeLinecap="round" />

                {/* Oxygenator → return */}
                <path id="vv-return" d="M220,260 L310,260 Q335,260 335,240 L335,195 Q335,175 315,170 L220,140"
                  fill="none" stroke="url(#ecmo-oxy)" strokeWidth="3" strokeLinecap="round" />
                <text x="280" y="180" fontSize="5" fill="hsl(0, 55%, 55%)" opacity="0.5">Return cannula</text>
                <text x="280" y="187" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">19–21 Fr (R IJV)</text>

                {/* Return label at patient */}
                <text x="222" y="136" fontSize="5.5" fill="hsl(0, 55%, 55%)" opacity="0.7">→ RA (via IJV)</text>

                {/* Cannula tip in RA */}
                <circle cx="210" cy="72" r="2.5" fill="hsl(0, 55%, 50%)" opacity="0.35" filter="url(#ecmo-glow)" />
                <text x="226" y="75" fontSize="4" fill="hsl(0, 50%, 50%)" opacity="0.4">Return tip in RA</text>

                {/* Flow particles */}
                <FlowAnimation path="vv-drain" color="hsl(225, 55%, 45%)" delay="0s" />
                <FlowAnimation path="vv-drain" color="hsl(225, 55%, 45%)" delay="1.5s" />
                <FlowAnimation path="vv-return" color="hsl(0, 55%, 50%)" delay="0s" />
                <FlowAnimation path="vv-return" color="hsl(0, 55%, 50%)" delay="1.5s" />

                {/* Dual-lumen note */}
                <text x="190" y="152" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.3" fontStyle="italic">or bicaval dual-lumen (Avalon) via R IJV</text>

                {/* Key box */}
                <rect x="250" y="305" width="140" height="40" rx="6" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.4" />
                <text x="320" y="320" textAnchor="middle" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.6" fontWeight="700">VV: Respiratory support only</text>
                <text x="320" y="329" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.4">Native CO drives circulation</text>
                <text x="320" y="338" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">Recirculation fraction &lt;30%</text>
              </g>
            ) : (
              <g>
                {/* ── VA-ECMO Flow Paths ── */}
                {/* Drainage: femoral vein → pump */}
                <path id="va-drain" d="M175,158 L175,195 Q175,210 155,210 L80,210 Q60,210 60,230 L60,238"
                  fill="none" stroke="url(#ecmo-deoxy)" strokeWidth="3" strokeLinecap="round" />
                <text x="130" y="205" fontSize="5" fill="hsl(220, 50%, 55%)" opacity="0.5">Drainage cannula</text>
                <text x="130" y="212" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">21–25 Fr (fem vein → RA)</text>

                {/* Pump → oxygenator */}
                <path d="M82,260 L120,260"
                  fill="none" stroke="url(#ecmo-deoxy)" strokeWidth="3" strokeLinecap="round" />

                {/* Oxygenator → return (femoral artery) */}
                <path id="va-return" d="M220,260 L310,260 Q335,260 335,240 L335,195 Q335,175 315,170 L205,158"
                  fill="none" stroke="url(#ecmo-oxy)" strokeWidth="3" strokeLinecap="round" />
                <text x="280" y="180" fontSize="5" fill="hsl(0, 55%, 55%)" opacity="0.5">Return cannula</text>
                <text x="280" y="187" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">15–19 Fr (fem artery)</text>

                {/* Return label */}
                <text x="215" y="170" fontSize="5.5" fill="hsl(0, 55%, 55%)" opacity="0.7">→ Femoral artery</text>
                <text x="215" y="177" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.4">(retrograde aortic flow)</text>

                {/* Flow particles */}
                <FlowAnimation path="va-drain" color="hsl(225, 55%, 45%)" delay="0s" />
                <FlowAnimation path="va-drain" color="hsl(225, 55%, 45%)" delay="1.5s" />
                <FlowAnimation path="va-return" color="hsl(0, 55%, 50%)" delay="0s" />
                <FlowAnimation path="va-return" color="hsl(0, 55%, 50%)" delay="1.5s" />

                {/* Distal perfusion cannula */}
                <path d="M205,158 L215,148 L225,155" fill="none" stroke="hsl(0, 45%, 50%)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
                <text x="230" y="148" fontSize="4.5" fill="hsl(0, 45%, 50%)" opacity="0.55">Distal perfusion</text>
                <text x="230" y="154" fontSize="4" fill="hsl(0, 45%, 50%)" opacity="0.4">cannula (6–8 Fr)</text>

                {/* Mixing / Harlequin zone in aorta */}
                <rect x="145" y="88" width="105" height="24" rx="5"
                  fill="hsl(35, 65%, 50%)" fillOpacity="0.08"
                  stroke="hsl(35, 65%, 50%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.55" />
                <text x="197" y="100" textAnchor="middle" fontSize="5" fill="hsl(35, 65%, 50%)" opacity="0.7" fontWeight="700">Mixing zone (watershed)</text>
                <text x="197" y="108" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.4">Harlequin syndrome — monitor R radial SpO₂</text>

                {/* Native antegrade flow arrow */}
                <path d="M215,52 L230,52 L230,90" fill="none" stroke="hsl(220, 40%, 50%)" strokeWidth="1.5" opacity="0.3" strokeDasharray="2 2" />
                <text x="240" y="72" fontSize="3.5" fill="hsl(220, 40%, 50%)" opacity="0.4">Native</text>
                <text x="240" y="77" fontSize="3.5" fill="hsl(220, 40%, 50%)" opacity="0.4">antegrade</text>

                {/* ECMO retrograde arrow */}
                <path d="M205,130 L205,112" fill="none" stroke="hsl(0, 50%, 50%)" strokeWidth="1.5" opacity="0.3" strokeDasharray="2 2" />
                <text x="155" y="125" fontSize="3.5" fill="hsl(0, 50%, 50%)" opacity="0.4">ECMO retrograde</text>

                {/* Key box */}
                <rect x="250" y="305" width="140" height="40" rx="6" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.4" />
                <text x="320" y="320" textAnchor="middle" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.6" fontWeight="700">VA: Cardiac + respiratory</text>
                <text x="320" y="329" textAnchor="middle" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.4">↑ Afterload → risk LV distension</text>
                <text x="320" y="338" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">May need IABP / Impella to vent LV</text>
              </g>
            )}

            <PumpUnit />
            <Oxygenator />
            <HeatExchanger />
            <MonitoringPoints mode={mode} />

            {/* Legend */}
            <g opacity="0.5">
              <rect x="8" y="310" width="95" height="42" rx="4" fill="hsl(var(--muted-foreground))" fillOpacity="0.03" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="14" y1="322" x2="30" y2="322" stroke="url(#ecmo-deoxy)" strokeWidth="3" strokeLinecap="round" />
              <text x="34" y="324" fontSize="4.5" fill="hsl(var(--muted-foreground))">Deoxygenated</text>
              <line x1="14" y1="334" x2="30" y2="334" stroke="url(#ecmo-oxy)" strokeWidth="3" strokeLinecap="round" />
              <text x="34" y="336" fontSize="4.5" fill="hsl(var(--muted-foreground))">Oxygenated</text>
              <circle cx="22" cy="345" r="2" fill="hsl(45, 70%, 55%)" opacity="0.6" />
              <text x="34" y="347" fontSize="4.5" fill="hsl(var(--muted-foreground))">Monitoring point</text>
            </g>
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
                <p className="font-semibold text-foreground text-sm">Circuit Components</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Centrifugal pump:</strong> Non-occlusive, preload-dependent. Flow 3–7 L/min. <strong>Oxygenator:</strong> Polymethylpentene (PMP) hollow fibre membrane — separate gas & blood phases. Sweep gas controls CO₂ removal; FiO₂ controls oxygenation. <strong>Heat exchanger:</strong> Countercurrent water circuit maintains normothermia.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Monitoring & Recirculation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pre-membrane SvO₂ reflects systemic oxygen delivery. Post-membrane PaO₂ should be &gt;40 kPa. ΔP across oxygenator detects clot/fibre degradation. <strong>Recirculation:</strong> Return blood re-entering drainage — reduce by separating cannula tips. Aim recirculation &lt;30%.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Cannulation Options</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Femoro-jugular:</strong> Drainage 23–25 Fr femoral vein, return 19–21 Fr R IJV. <strong>Bicaval dual-lumen (Avalon):</strong> Single R IJV cannula draining from SVC + IVC, return towards tricuspid valve — requires TOE/fluoroscopy for positioning.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">VA-ECMO — Cardiac + Respiratory Support</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deoxygenated blood drained from RA (femoral vein), oxygenated, and returned to <strong>arterial system</strong> (femoral artery — peripheral, or ascending aorta — central). Provides gas exchange AND circulatory support. Bypasses heart and lungs.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Harlequin Syndrome</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Peripheral VA: retrograde aortic ECMO flow meets native (poorly oxygenated) antegrade cardiac output at a watershed. <strong>Upper body receives deoxygenated blood</strong> — monitor right radial SpO₂/PaO₂. Solution: convert to VAV or add IJV return cannula.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">LV Distension & Afterload</p>
                <p className="text-xs text-muted-foreground mt-1">
                  VA-ECMO increases LV afterload → failing LV cannot eject → LV distension, ↑LVEDP, pulmonary oedema, LV thrombus. Venting strategies: <strong>IABP, Impella, LA/LV vent, atrial septostomy</strong>. Monitor arterial pulsatility — flat trace = no LV ejection.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Distal Perfusion</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Femoral arterial cannula risks ipsilateral limb ischaemia. <strong>Distal perfusion cannula</strong> (6–8 Fr) inserted into SFA distal to ECMO cannula — supplies antegrade flow to leg. Monitor: foot SpO₂, lactate, NIRS.
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
