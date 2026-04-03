import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      { label: "Access", value: "Vascath (large-bore dual-lumen CVC)" },
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
      { label: "Access", value: "Vascath or AV fistula" },
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
    const timer = setInterval(() => setFlowPhase((p) => (p + 1) % 100), 50);
    return () => clearInterval(timer);
  }, [active]);

  const bloodParticle = (flowPhase % 50) / 50;
  const dialysateParticle = ((flowPhase + 25) % 50) / 50;

  return (
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
        <svg viewBox="0 0 400 280" className="w-full">
          {/* Patient */}
          <rect x="10" y="100" width="55" height="60" rx="8" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="37" y="128" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Patient</text>
          <text x="37" y="140" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Vascath</text>

          {/* Blood out (to filter) - red */}
          <path d="M 65 115 L 100 115 L 100 60 L 160 60" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="3" />
          <text x="130" y="52" fontSize="7" fill="hsl(0 70% 50%)" textAnchor="middle">Blood out →</text>

          {/* Blood pump */}
          <circle cx="130" cy="60" r="12" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="130" y="63" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">Pump</text>
          <text x="130" y="82" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            {active === "crrt" ? "150-250" : "300-400"} ml/min
          </text>

          {/* Haemofilter / Dialyser */}
          <rect x="160" y="30" width="110" height="200" rx="10" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="215" y="25" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">
            {active === "crrt" ? "Haemofilter" : "Dialyser"}
          </text>

          {/* Membrane fibres */}
          {[60, 85, 110, 135, 160, 185, 210].map((y) => (
            <line key={y} x1="170" y1={y} x2="260" y2={y} stroke="hsl(var(--border))" strokeWidth="0.7" opacity="0.5" />
          ))}
          <text x="215" y="130" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            Semi-permeable membrane
          </text>
          <text x="215" y="145" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            {active === "crrt" ? "Diffusion + convection" : "Primarily diffusion"}
          </text>

          {/* Blood return (from filter) - darker red */}
          <path d="M 160 200 L 100 200 L 100 145 L 65 145" fill="none" stroke="hsl(0 50% 40%)" strokeWidth="3" />
          <text x="130" y="215" fontSize="7" fill="hsl(0 50% 40%)" textAnchor="middle">← Blood return</text>

          {/* Dialysate IN (bottom of filter) */}
          <path d="M 340 220 L 270 220" fill="none" stroke="hsl(200 60% 50%)" strokeWidth="2" />
          <text x="340" y="215" fontSize="7" fill="hsl(200 60% 50%)" textAnchor="end">Dialysate in</text>

          {/* Dialysate/Effluent OUT (top of filter) */}
          <path d="M 270 45 L 340 45" fill="none" stroke="hsl(45 70% 45%)" strokeWidth="2" />
          <text x="340" y="40" fontSize="7" fill="hsl(45 70% 45%)" textAnchor="end">Effluent out →</text>

          {/* Effluent bag */}
          <rect x="345" y="30" width="45" height="30" rx="5" fill="hsl(45 70% 45% / 0.1)" stroke="hsl(45 70% 45%)" strokeWidth="1" />
          <text x="367" y="48" fontSize="6" fill="hsl(45 70% 45%)" textAnchor="middle">Waste</text>

          {active === "crrt" && (
            <>
              {/* Replacement fluid */}
              <path d="M 130 30 L 155 30 L 155 55" fill="none" stroke="hsl(150 50% 45%)" strokeWidth="1.5" />
              <rect x="110" y="10" width="45" height="20" rx="4" fill="hsl(150 50% 45% / 0.1)" stroke="hsl(150 50% 45%)" strokeWidth="1" />
              <text x="132" y="23" fontSize="6" fill="hsl(150 50% 45%)" textAnchor="middle">Pre-filter</text>
              <text x="132" y="7" fontSize="6" fill="hsl(150 50% 45%)" textAnchor="middle">Replacement</text>

              {/* Citrate */}
              <path d="M 100 95 L 100 115" fill="none" stroke="hsl(280 50% 50%)" strokeWidth="1.5" />
              <rect x="78" y="88" width="44" height="12" rx="3" fill="hsl(280 50% 50% / 0.1)" stroke="hsl(280 50% 50%)" strokeWidth="1" />
              <text x="100" y="97" fontSize="6" fill="hsl(280 50% 50%)" textAnchor="middle">Citrate</text>
            </>
          )}

          {/* Animated blood particles */}
          <circle
            cx={65 + bloodParticle * 95}
            cy={115 - (bloodParticle > 0.3 ? (bloodParticle - 0.3) * 80 : 0)}
            r="3"
            fill="hsl(0 70% 50%)"
            opacity="0.7"
          />
          <circle
            cx={160 - (1 - bloodParticle) * 95}
            cy={200 - ((1 - bloodParticle) > 0.3 ? ((1 - bloodParticle) - 0.3) * 80 : 0)}
            r="3"
            fill="hsl(0 50% 40%)"
            opacity="0.7"
          />

          {/* Animated dialysate particle (counter-current) */}
          <circle
            cx={270 + dialysateParticle * 70}
            cy="45"
            r="2.5"
            fill="hsl(45 70% 45%)"
            opacity="0.6"
          />

          {/* Flow rate label */}
          <text x="215" y="260" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            {active === "crrt" ? "Counter-current flow — continuous 24h" : "Counter-current flow — high efficiency 3-4h sessions"}
          </text>
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
  );
};
