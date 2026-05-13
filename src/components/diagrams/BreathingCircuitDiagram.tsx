import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Circuit = "maplesonA" | "maplesonD" | "maplesonF" | "circle";

interface CircuitInfo {
  label: string;
  fullName: string;
  efficiency: string;
  use: string;
  components: string[];
}

const circuits: Record<Circuit, CircuitInfo> = {
  maplesonA: {
    label: "Mapleson A",
    fullName: "Mapleson A (Magill / Lack)",
    efficiency: "Most efficient for spontaneous ventilation (FGF = MV)",
    use: "Spontaneous breathing — adults. Least efficient for controlled ventilation.",
    components: ["APL valve near patient", "Reservoir bag at machine end", "Corrugated tubing", "Fresh gas inlet at machine end"],
  },
  maplesonD: {
    label: "Mapleson D",
    fullName: "Mapleson D (Bain Circuit)",
    efficiency: "Most efficient for controlled ventilation (FGF = 70ml/kg/min)",
    use: "Controlled ventilation — coaxial (Bain) design. FGF for SV = 2-3× MV (inefficient).",
    components: ["APL valve near patient", "Reservoir bag near patient", "Coaxial tubing (FG inside)", "Fresh gas inlet near machine"],
  },
  maplesonF: {
    label: "Mapleson F",
    fullName: "Mapleson F (Jackson-Rees / Ayre's T-piece)",
    efficiency: "No valves — minimal resistance. FGF = 2.5-3× MV",
    use: "Paediatrics — low resistance, no valves. Open-ended bag for CPAP / assisted ventilation.",
    components: ["No APL valve", "Open-ended reservoir bag", "T-piece at patient end", "Fresh gas inlet at patient end"],
  },
  circle: {
    label: "Circle System",
    fullName: "Circle Breathing System",
    efficiency: "Most efficient overall — FGF can be reduced to metabolic O₂ (~250 ml/min)",
    use: "Standard for modern anaesthesia. Allows low-flow and closed-circuit anaesthesia.",
    components: ["CO₂ absorber (soda lime)", "Unidirectional valves ×2", "APL valve", "Reservoir bag", "Fresh gas inlet", "Inspiratory & expiratory limbs"],
  },
};

export const BreathingCircuitDiagram = () => {
  const [active, setActive] = useState<Circuit>("circle");
  const [gasPhase, setGasPhase] = useState(0);
  const c = circuits[active];

  useEffect(() => {
    setGasPhase(0);
    const timer = setInterval(() => setGasPhase((p) => (p + 1) % 120), 60);
    return () => clearInterval(timer);
  }, [active]);

  const renderCircuitSVG = () => {
    const particlePos = (gasPhase % 60) / 60;
    const isInspiration = gasPhase < 60;

    if (active === "circle") {
      return (
        <svg viewBox="0 0 380 260" className="w-full">
          {/* Inspiratory limb (top) */}
          <line x1="60" y1="50" x2="300" y2="50" stroke="hsl(var(--primary))" strokeWidth="3" />
          <text x="180" y="42" fontSize="8" fill="hsl(var(--primary))" textAnchor="middle">Inspiratory limb →</text>
          
          {/* Expiratory limb (bottom) */}
          <line x1="60" y1="180" x2="300" y2="180" stroke="hsl(var(--accent))" strokeWidth="3" />
          <text x="180" y="200" fontSize="8" fill="hsl(var(--accent))" textAnchor="middle">← Expiratory limb</text>

          {/* Patient connection */}
          <rect x="295" y="40" width="50" height="150" rx="8" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="320" y="120" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Patient</text>

          {/* Inspiratory valve */}
          <circle cx="100" cy="50" r="10" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="100" y="53" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">IV</text>
          <text x="100" y="72" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Insp. valve</text>

          {/* Expiratory valve */}
          <circle cx="100" cy="180" r="10" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
          <text x="100" y="183" fontSize="6" fill="hsl(var(--accent))" textAnchor="middle">EV</text>
          <text x="100" y="168" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Exp. valve</text>

          {/* CO2 absorber */}
          <rect x="30" y="80" width="60" height="70" rx="6" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line x1="60" y1="50" x2="60" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line x1="60" y1="150" x2="60" y2="180" stroke="hsl(var(--accent))" strokeWidth="2" />
          <text x="60" y="110" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">CO₂</text>
          <text x="60" y="122" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Absorber</text>
          <text x="60" y="136" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">(Soda lime)</text>

          {/* Fresh gas inlet */}
          <line x1="160" y1="25" x2="160" y2="50" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="160" cy="20" r="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="160" y="12" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">FGF</text>

          {/* APL valve */}
          <line x1="240" y1="180" x2="240" y2="220" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
          <path d="M 230 220 L 240 210 L 250 220 Z" fill="hsl(var(--muted-foreground))" />
          <text x="240" y="235" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">APL valve</text>

          {/* Reservoir bag */}
          <ellipse cx="240" cy="250" rx="20" ry="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="280" y="253" fontSize="7" fill="hsl(var(--muted-foreground))">Bag</text>

          {/* Animated gas particles */}
          {isInspiration ? (
            <>
              <circle cx={60 + particlePos * 240} cy="50" r="3" fill="hsl(var(--primary))" opacity="0.7">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx={60 + Math.max(0, particlePos - 0.15) * 240} cy="50" r="2.5" fill="hsl(var(--primary))" opacity="0.5" />
            </>
          ) : (
            <>
              <circle cx={300 - particlePos * 240} cy="180" r="3" fill="hsl(var(--accent))" opacity="0.7">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx={300 - Math.max(0, particlePos - 0.15) * 240} cy="180" r="2.5" fill="hsl(var(--accent))" opacity="0.5" />
            </>
          )}
        </svg>
      );
    }

    if (active === "maplesonA") {
      return (
        <svg viewBox="0 0 380 140" className="w-full">
          {/* Main tubing */}
          <line x1="30" y1="70" x2="330" y2="70" stroke="hsl(var(--primary))" strokeWidth="3" />
          
          {/* FGF at machine end */}
          <circle cx="40" cy="40" r="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <line x1="40" y1="46" x2="40" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="40" y="33" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">FGF</text>

          {/* Reservoir bag at machine end */}
          <ellipse cx="80" cy="100" rx="22" ry="10" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <line x1="80" y1="70" x2="80" y2="90" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="80" y="120" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Reservoir bag</text>

          {/* Corrugated tubing */}
          {[120, 145, 170, 195, 220, 245].map((x) => (
            <path key={x} d={`M ${x} 65 Q ${x+5} 60 ${x+10} 65 Q ${x+15} 70 ${x+20} 65`} fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
          ))}
          <text x="180" y="60" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Corrugated tubing</text>

          {/* APL valve NEAR PATIENT */}
          <path d="M 280 70 L 280 95 M 270 95 L 280 85 L 290 95" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
          <text x="280" y="110" fontSize="7" fill="hsl(var(--accent))" textAnchor="middle" fontWeight="bold">APL valve</text>

          {/* Patient */}
          <rect x="310" y="55" width="40" height="30" rx="6" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="330" y="73" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Patient</text>

          {/* Gas flow arrow */}
          {isInspiration ? (
            <circle cx={40 + particlePos * 290} cy="70" r="3" fill="hsl(var(--primary))" opacity="0.7" />
          ) : (
            <>
              <circle cx={330 - particlePos * 60} cy={70 + particlePos * 30} r="3" fill="hsl(var(--accent))" opacity="0.7" />
            </>
          )}
        </svg>
      );
    }

    if (active === "maplesonD") {
      return (
        <svg viewBox="0 0 380 140" className="w-full">
          {/* Outer tube */}
          <rect x="30" y="60" width="270" height="20" rx="10" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          {/* Inner tube (FGF) */}
          <line x1="35" y1="70" x2="300" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 2" />
          <text x="165" y="55" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle">FGF (inner coaxial tube) →</text>
          <text x="165" y="90" fontSize="7" fill="hsl(var(--accent))" textAnchor="middle">← Exhaled gas (outer tube)</text>

          {/* FGF at machine end */}
          <circle cx="25" cy="40" r="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <line x1="25" y1="46" x2="25" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="25" y="33" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">FGF</text>

          {/* APL valve and bag near patient */}
          <path d="M 310 70 L 310 100 M 300 100 L 310 90 L 320 100" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
          <text x="310" y="115" fontSize="7" fill="hsl(var(--accent))" textAnchor="middle">APL</text>
          <ellipse cx="340" cy="100" rx="15" ry="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="340" y="120" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Bag</text>

          {/* Patient */}
          <rect x="305" y="55" width="40" height="30" rx="6" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="325" y="73" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Patient</text>

          {/* Bain label */}
          <text x="165" y="130" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Bain circuit (coaxial Mapleson D)</text>
        </svg>
      );
    }

    // Mapleson F
    return (
      <svg viewBox="0 0 380 140" className="w-full">
        {/* T-piece */}
        <line x1="90" y1="70" x2="300" y2="70" stroke="hsl(var(--primary))" strokeWidth="3" />
        
        {/* T-piece junction at patient */}
        <line x1="90" y1="40" x2="90" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="90" cy="35" r="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="90" y="25" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">FGF</text>

        {/* Patient */}
        <rect x="40" y="55" width="40" height="30" rx="6" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="60" y="73" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Patient</text>

        {/* Open-ended bag */}
        <ellipse cx="310" cy="70" rx="25" ry="15" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="310" y="73" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Open bag</text>
        {/* Open end */}
        <line x1="335" y1="65" x2="345" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="335" y1="75" x2="345" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="355" y="73" fontSize="6" fill="hsl(var(--muted-foreground))">Open tail</text>

        {/* No valves label */}
        <text x="200" y="55" fontSize="7" fill="hsl(var(--accent))" textAnchor="middle" fontWeight="bold">No valves — minimal resistance</text>
        <text x="200" y="100" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">T-piece: ideal for paediatrics (&lt;20 kg)</text>
      </svg>
    );
  };

  return (
        <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(circuits) as Circuit[]).map((key) => (
          <Button key={key} variant={active === key ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setActive(key)}>
            {circuits[key].label}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-secondary/20 p-3">
        {renderCircuitSVG()}
      </div>

      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs font-semibold text-primary">{c.fullName}</p>
        <p className="text-sm text-foreground mt-1">{c.efficiency}</p>
        <p className="text-xs text-muted-foreground mt-1">{c.use}</p>
      </div>

      <div className="p-3 rounded-lg border border-border">
        <p className="text-xs font-semibold text-foreground mb-2">Components</p>
        <ul className="space-y-1">
          {c.components.map((comp) => (
            <li key={comp} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-primary mt-0.5">•</span>{comp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
