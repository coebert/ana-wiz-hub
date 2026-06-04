import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "./_shared/DiagramFigure";

type RRTMode = "crrt" | "ihd";

const modes: Record<RRTMode, {
  label: string;
  fullName: string;
  principle: string;
  settings: { label: string; value: string }[];
  pros: string[];
  cons: string[];
}> = {
  crrt: {
    label: "CRRT (CVVHDF)",
    fullName: "Continuous Veno-Venous Haemodiafiltration",
    principle: "Continuous blood flow through haemofilter at low rates (150-250 ml/min). Combines diffusion (dialysis) and convection (haemofiltration) for solute removal. Runs 24h/day. Replacement fluid pre/post-filter.",
    settings: [
      { label: "Blood flow", value: "150-250 ml/min" },
      { label: "Effluent dose", value: "25-30 ml/kg/hr (KDIGO)" },
      { label: "Duration", value: "Continuous (24h/day)" },
      { label: "Anticoagulation", value: "Regional citrate (preferred) or heparin" },
      { label: "Access", value: "Dialysis catheter (large-bore dual-lumen CVC)" },
    ],
    pros: [
      "Haemodynamically stable — gradual solute/fluid removal",
      "Preferred in critically ill / unstable patients",
      "Excellent control of fluid balance",
      "Better middle-molecule clearance (convection)",
      "Regional citrate avoids systemic anticoagulation",
    ],
    cons: [
      "Requires ICU nursing (1:1 care)",
      "Continuous anticoagulation needed",
      "Filter clotting → downtime",
      "Immobilises patient",
      "Higher cost per treatment",
    ],
  },
  ihd: {
    label: "IHD",
    fullName: "Intermittent Haemodialysis",
    principle: "High-efficiency blood flow (300-400 ml/min) against counter-current dialysate. Primarily diffusion-based. Sessions typically 3-4 hours, 3-4 times/week. Rapid solute clearance.",
    settings: [
      { label: "Blood flow", value: "300-400 ml/min" },
      { label: "Dialysate flow", value: "500-800 ml/min" },
      { label: "Duration", value: "3-4 hours, 3-4×/week" },
      { label: "Anticoagulation", value: "Systemic heparin (usually)" },
      { label: "Access", value: "Dialysis catheter or AV fistula" },
    ],
    pros: [
      "Rapid correction of hyperkalaemia/toxins",
      "Patient mobilisation between sessions",
      "Lower nursing intensity",
      "Established outpatient infrastructure",
      "Better small-molecule clearance (diffusion)",
    ],
    cons: [
      "Haemodynamic instability (rapid fluid shifts)",
      "Disequilibrium syndrome risk",
      "Intermittent — rebound of solutes between sessions",
      "Less precise fluid management",
      "Requires systemic anticoagulation",
    ],
  },
};

export const RRTCircuitDiagram = () => {
  const [active, setActive] = useState<RRTMode>("crrt");
  const [flowPhase, setFlowPhase] = useState(0);
  const m = modes[active];

  useEffect(() => {
    setFlowPhase(0);
    const timer = setInterval(() => setFlowPhase((p) => (p + 1) % 200), 40);
    return () => clearInterval(timer);
  }, [active]);

  // Normalised 0-1 cycling values for particle positions
  const t1 = (flowPhase % 100) / 100;
  const t2 = ((flowPhase + 50) % 100) / 100;
  const t3 = ((flowPhase + 25) % 100) / 100;
  const t4 = ((flowPhase + 75) % 100) / 100;

  // Blood flows top-to-bottom inside filter; dialysate flows bottom-to-top (counter-current)
  const filterLeft = 140;
  const filterRight = 310;
  const filterTop = 50;
  const filterBot = 260;
  const filterMidX = (filterLeft + filterRight) / 2;
  const membraneX = filterMidX; // vertical membrane
  const bloodChannelX = filterLeft + (membraneX - filterLeft) / 2; // left half = blood
  const dialysateChannelX = membraneX + (filterRight - membraneX) / 2; // right half = dialysate

  return (
    <DiagramFigure id="rrt-circuit" title="Renal replacement therapy circuits: CRRT and intermittent haemodialysis" description="Animated extracorporeal RRT circuit comparing CRRT and intermittent haemodialysis — access, blood pump, filter, replacement fluid and effluent.">
    <div className="space-y-4">
      <div className="flex gap-2">
        {(Object.keys(modes) as RRTMode[]).map((key) => (
          <Button key={key} variant={active === key ? "default" : "outline"} size="sm" onClick={() => setActive(key)}>
            {modes[key].label}
          </Button>
        ))}
      </div>

      {/* Animated circuit diagram */}
      <div className="rounded-lg border border-border bg-secondary/20 p-3">
        <svg viewBox="0 0 450 340" className="w-full">
          <defs>
            <marker id="arrowRed" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="hsl(0 70% 50%)" />
            </marker>
            <marker id="arrowDarkRed" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="hsl(0 50% 40%)" />
            </marker>
            <marker id="arrowBlue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="hsl(200 60% 50%)" />
            </marker>
            <marker id="arrowYellow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="hsl(45 70% 45%)" />
            </marker>
            <marker id="arrowWaste" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
              <polygon points="0 0, 5 2, 0 4" fill="hsl(30 60% 45%)" />
            </marker>
          </defs>

          {/* ─── Patient ─── */}
          <rect x="10" y="120" width="60" height="70" rx="8" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="40" y="150" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Patient</text>
          <text x="40" y="164" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Vascath</text>

          {/* ─── Blood out: patient → pump → filter top-left ─── */}
          <path d="M 70 135 L 95 135 L 95 75 L 140 75" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="3" markerEnd="url(#arrowRed)" />
          <text x="80" y="68" fontSize="7" fill="hsl(0 70% 50%)" fontWeight="600">Blood out →</text>

          {/* Blood pump */}
          <circle cx="118" cy="75" r="13" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="118" y="73" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">Pump</text>
          <text x="118" y="81" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            {active === "crrt" ? "150-250" : "300-400"}
          </text>
          <text x="118" y="100" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">ml/min</text>

          {/* ─── Haemofilter / Dialyser outer box ─── */}
          <rect x={filterLeft} y={filterTop} width={filterRight - filterLeft} height={filterBot - filterTop} rx="10"
            fill="hsl(var(--primary)/0.03)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x={filterMidX} y={filterTop - 6} fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">
            {active === "crrt" ? "Haemofilter" : "Dialyser"}
          </text>

          {/* ─── Vertical semi-permeable membrane (dashed) ─── */}
          <line x1={membraneX} y1={filterTop + 8} x2={membraneX} y2={filterBot - 8}
            stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4 3" />
          {/* Membrane label */}
          <text x={membraneX} y={filterBot + 14} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            Semi-permeable membrane
          </text>

          {/* Channel labels */}
          <text x={bloodChannelX} y={filterTop + 18} fontSize="7" fill="hsl(0 70% 50%)" textAnchor="middle" fontWeight="600">
            BLOOD
          </text>
          <text x={bloodChannelX} y={filterTop + 28} fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            (top → bottom)
          </text>
          <text x={dialysateChannelX} y={filterTop + 18} fontSize="7" fill="hsl(200 60% 50%)" textAnchor="middle" fontWeight="600">
            DIALYSATE
          </text>
          <text x={dialysateChannelX} y={filterTop + 28} fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            (bottom → top)
          </text>

          {/* Blood flow arrows inside filter (downward) */}
          <line x1={bloodChannelX} y1={filterTop + 35} x2={bloodChannelX} y2={filterBot - 15}
            stroke="hsl(0 70% 50% / 0.25)" strokeWidth="3" strokeLinecap="round" />
          <line x1={bloodChannelX} y1={filterTop + 40} x2={bloodChannelX} y2={filterBot - 20}
            stroke="hsl(0 70% 50%)" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

          {/* Dialysate flow arrows inside filter (upward) */}
          <line x1={dialysateChannelX} y1={filterTop + 35} x2={dialysateChannelX} y2={filterBot - 15}
            stroke="hsl(200 60% 50% / 0.15)" strokeWidth="3" strokeLinecap="round" />
          <line x1={dialysateChannelX} y1={filterBot - 20} x2={dialysateChannelX} y2={filterTop + 40}
            stroke="hsl(200 60% 50%)" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

          {/* ─── Waste products crossing membrane (blood → dialysate) ─── */}
          {[90, 130, 170, 210].map((y) => (
            <g key={y}>
              <line x1={membraneX - 25} y1={y} x2={membraneX + 25} y2={y}
                stroke="hsl(30 60% 45%)" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrowWaste)" />
              <text x={membraneX + 28} y={y + 3} fontSize="5" fill="hsl(30 60% 45%)">
                {y === 90 ? "K⁺" : y === 130 ? "Urea" : y === 170 ? "Cr" : "H⁺"}
              </text>
            </g>
          ))}
          <text x={membraneX} y={235} fontSize="6" fill="hsl(30 60% 45%)" textAnchor="middle" fontWeight="600">
            Waste: blood → dialysate
          </text>
          <text x={membraneX} y={245} fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            {active === "crrt" ? "Diffusion + convection" : "Primarily diffusion"}
          </text>

          {/* ─── Animated blood particles (downward through blood channel) ─── */}
          {[t1, t2].map((t, i) => (
            <circle key={`bp${i}`}
              cx={bloodChannelX}
              cy={filterTop + 40 + t * (filterBot - filterTop - 65)}
              r="4" fill="hsl(0 70% 50%)" opacity="0.8" />
          ))}

          {/* ─── Animated dialysate particles (upward through dialysate channel) ─── */}
          {[t3, t4].map((t, i) => (
            <circle key={`dp${i}`}
              cx={dialysateChannelX}
              cy={filterBot - 20 - t * (filterBot - filterTop - 65)}
              r="3.5" fill="hsl(200 60% 50%)" opacity="0.7" />
          ))}

          {/* ─── Blood return: filter bottom-left → patient ─── */}
          <path d={`M ${filterLeft} ${filterBot - 20} L 95 ${filterBot - 20} L 95 175 L 70 175`}
            fill="none" stroke="hsl(0 50% 40%)" strokeWidth="3" markerEnd="url(#arrowDarkRed)" />
          <text x="80" y={filterBot - 8} fontSize="7" fill="hsl(0 50% 40%)" fontWeight="600">← Blood return</text>

          {/* ─── Dialysate IN: from right → filter bottom-right ─── */}
          <path d={`M 400 ${filterBot - 20} L ${filterRight} ${filterBot - 20}`}
            fill="none" stroke="hsl(200 60% 50%)" strokeWidth="2" markerEnd="url(#arrowBlue)" />
          <rect x="400" y={filterBot - 35} width="45" height="25" rx="5" fill="hsl(200 60% 50% / 0.1)" stroke="hsl(200 60% 50%)" strokeWidth="1" />
          <text x="422" y={filterBot - 20} fontSize="6" fill="hsl(200 60% 50%)" textAnchor="middle">Fresh</text>
          <text x="422" y={filterBot - 12} fontSize="6" fill="hsl(200 60% 50%)" textAnchor="middle">dialysate</text>

          {/* ─── Effluent OUT: filter top-right → waste bag ─── */}
          <path d={`M ${filterRight} ${filterTop + 20} L 400 ${filterTop + 20}`}
            fill="none" stroke="hsl(45 70% 45%)" strokeWidth="2" markerEnd="url(#arrowYellow)" />
          <rect x="400" y={filterTop + 8} width="45" height="25" rx="5" fill="hsl(45 70% 45% / 0.1)" stroke="hsl(45 70% 45%)" strokeWidth="1" />
          <text x="422" y={filterTop + 18} fontSize="6" fill="hsl(45 70% 45%)" textAnchor="middle">Effluent</text>
          <text x="422" y={filterTop + 28} fontSize="6" fill="hsl(45 70% 45%)" textAnchor="middle">(waste)</text>

          {/* ─── CRRT-specific: citrate + replacement fluid ─── */}
          {active === "crrt" && (
            <>
              <path d="M 118 30 L 135 30 L 135 60" fill="none" stroke="hsl(150 50% 45%)" strokeWidth="1.5" />
              <rect x="96" y="12" width="48" height="18" rx="4" fill="hsl(150 50% 45% / 0.1)" stroke="hsl(150 50% 45%)" strokeWidth="1" />
              <text x="120" y="21" fontSize="5.5" fill="hsl(150 50% 45%)" textAnchor="middle">Replacement</text>
              <text x="120" y="28" fontSize="5.5" fill="hsl(150 50% 45%)" textAnchor="middle">fluid (pre-filter)</text>

              <path d="M 95 110 L 95 135" fill="none" stroke="hsl(280 50% 50%)" strokeWidth="1.5" />
              <rect x="74" y="102" width="42" height="12" rx="3" fill="hsl(280 50% 50% / 0.1)" stroke="hsl(280 50% 50%)" strokeWidth="1" />
              <text x="95" y="111" fontSize="6" fill="hsl(280 50% 50%)" textAnchor="middle">Citrate</text>
            </>
          )}

          {/* Counter-current label */}
          <text x={filterMidX} y={filterBot + 28} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            {active === "crrt" ? "Counter-current flow — continuous 24h" : "Counter-current flow — high efficiency 3-4h sessions"}
          </text>

          {/* Legend */}
          <g transform="translate(10, 290)">
            <circle cx="5" cy="5" r="4" fill="hsl(0 70% 50%)" opacity="0.8" />
            <text x="14" y="8" fontSize="6" fill="hsl(var(--muted-foreground))">Blood (↓)</text>
            <circle cx="75" cy="5" r="3.5" fill="hsl(200 60% 50%)" opacity="0.7" />
            <text x="84" y="8" fontSize="6" fill="hsl(var(--muted-foreground))">Dialysate (↑)</text>
            <line x1="145" y1="5" x2="160" y2="5" stroke="hsl(30 60% 45%)" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrowWaste)" />
            <text x="165" y="8" fontSize="6" fill="hsl(var(--muted-foreground))">Waste transfer</text>
          </g>
        </svg>
      </div>

      {/* Principle */}
      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs font-semibold text-primary">{m.fullName}</p>
        <p className="text-sm text-foreground mt-1">{m.principle}</p>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {m.settings.map((s) => (
          <div key={s.label} className="p-2 rounded-lg bg-secondary/30 border border-border">
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
            <p className="text-xs font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pros / Cons */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-border">
          <p className="text-xs font-semibold text-emerald-600 mb-2">Advantages</p>
          <ul className="space-y-1">
            {m.pros.map((item) => (
              <li key={item} className="text-xs text-muted-foreground flex items-start gap-1">
                <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>{item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="text-xs font-semibold text-destructive mb-2">Limitations</p>
          <ul className="space-y-1">
            {m.cons.map((item) => (
              <li key={item} className="text-xs text-muted-foreground flex items-start gap-1">
                <span className="text-destructive mt-0.5 shrink-0">✗</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </DiagramFigure>
  );
};
