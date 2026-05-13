import { useState, useEffect } from "react";

type ComponentKey = "venous" | "reservoir" | "pump" | "oxygenator" | "filter" | "arterial" | "cardioplegia";

interface CPBComponent {
  label: string;
  shortLabel: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  description: string;
  detail: string;
}

const components: Record<ComponentKey, CPBComponent> = {
  venous: {
    label: "Venous Cannula",
    shortLabel: "Venous",
    x: 30, y: 30, w: 80, h: 35,
    color: "hsl(220, 60%, 50%)",
    description: "Drains deoxygenated blood from RA (2-stage) or SVC+IVC (bicaval).",
    detail: "Gravity siphon or vacuum-assisted drainage. Bicaval cannulation for open-heart procedures (mitral/tricuspid). Two-stage (single) for CABG.",
  },
  reservoir: {
    label: "Venous Reservoir",
    shortLabel: "Reservoir",
    x: 30, y: 95, w: 80, h: 35,
    color: "hsl(240, 50%, 55%)",
    description: "Collects venous return. Acts as volume buffer and bubble trap.",
    detail: "Open (hard-shell) or closed (collapsible bag). Open reservoir allows gravity drainage and acts as gross bubble trap. Volume monitoring critical — low level = air entrainment risk.",
  },
  pump: {
    label: "Pump (Roller/Centrifugal)",
    shortLabel: "Pump",
    x: 30, y: 160, w: 80, h: 35,
    color: "hsl(280, 55%, 55%)",
    description: "Generates flow. Roller pump = non-pulsatile, flow ∝ RPM. Centrifugal = afterload-dependent.",
    detail: "Roller: occlusive, flow independent of afterload, risk of spallation and tubing rupture. Centrifugal: less haemolysis, afterload-sensitive, won't pump air (safer). Target CI 2.2–2.4 L/min/m².",
  },
  oxygenator: {
    label: "Membrane Oxygenator + Heat Exchanger",
    shortLabel: "Oxygenator",
    x: 160, y: 160, w: 100, h: 35,
    color: "hsl(0, 60%, 55%)",
    description: "Gas exchange across microporous membrane. Integral heat exchanger for temperature management.",
    detail: "Hollow-fibre membrane: blood flows outside fibres, gas inside. FiO₂ and sweep rate control PaO₂ and PaCO₂. Heat exchanger: water flows counter-current. Max gradient 10°C to avoid gas embolism. Rewarm slowly (<1°C/min at 37°C).",
  },
  filter: {
    label: "Arterial Line Filter",
    shortLabel: "Filter",
    x: 160, y: 95, w: 100, h: 35,
    color: "hsl(30, 65%, 55%)",
    description: "40µm screen filter removes particulate debris and micro-air.",
    detail: "Last safety barrier before blood returns to patient. Removes platelet/leucocyte aggregates, fat globules, and micro-bubbles. Pressure monitored — rising gradient = filter occlusion.",
  },
  arterial: {
    label: "Arterial Cannula",
    shortLabel: "Arterial",
    x: 160, y: 30, w: 100, h: 35,
    color: "hsl(0, 70%, 50%)",
    description: "Returns oxygenated blood to ascending aorta (or femoral in emergency).",
    detail: "Aortic cannulation: tip positioned to direct flow into arch. Size affects flow and haemolysis. Femoral cannulation in redo/emergency — risk of retrograde dissection. Line pressure monitored continuously.",
  },
  cardioplegia: {
    label: "Cardioplegia Delivery",
    shortLabel: "Plegia",
    x: 300, y: 95, w: 70, h: 35,
    color: "hsl(50, 70%, 50%)",
    description: "High-K⁺ solution arresting the heart in diastole for myocardial protection.",
    detail: "Cold blood (4:1 blood:crystalloid) or crystalloid (St Thomas', Custodiol). Antegrade (aortic root) or retrograde (coronary sinus). Repeat every 20–30 min. Cold (4–8°C) reduces O₂ demand. Warm induction/terminal warm shot for recovery.",
  },
};

const componentOrder: ComponentKey[] = ["venous", "reservoir", "pump", "oxygenator", "filter", "arterial", "cardioplegia"];

const CPBCircuitDiagram = () => {
  const [selected, setSelected] = useState<ComponentKey>("oxygenator");
  const [flowPhase, setFlowPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFlowPhase(p => (p + 1) % 100), 60);
    return () => clearInterval(interval);
  }, []);

  const info = components[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive CPB Circuit</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a component to explore its function and clinical details</p>

      <svg viewBox="0 0 400 220" className="w-full max-w-xl mx-auto mb-4" style={{ height: "auto" }}>
        {/* Heart symbol */}
        <text x="130" y="22" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">❤ Patient</text>

        {/* Flow paths with animation */}
        {/* Venous path: patient → venous → reservoir */}
        <path d="M130,30 L110,47" stroke="hsl(220, 60%, 50%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        <path d="M70,65 L70,95" stroke="hsl(220, 60%, 50%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        {/* Reservoir → pump */}
        <path d="M70,130 L70,160" stroke="hsl(240, 50%, 55%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        {/* Pump → oxygenator */}
        <path d="M110,177 L160,177" stroke="hsl(280, 55%, 55%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        {/* Oxygenator → filter */}
        <path d="M210,160 L210,130" stroke="hsl(0, 60%, 55%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        {/* Filter → arterial */}
        <path d="M210,95 L210,65" stroke="hsl(30, 65%, 55%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        {/* Arterial → patient */}
        <path d="M160,47 L130,30" stroke="hsl(0, 70%, 50%)" strokeWidth="2" fill="none" strokeDasharray="6 3" strokeDashoffset={-flowPhase * 0.5} />
        {/* Cardioplegia line */}
        <path d="M260,112 L300,112" stroke="hsl(50, 70%, 50%)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />

        {/* Components */}
        {componentOrder.map((key) => {
          const c = components[key];
          const isActive = selected === key;
          return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
              <rect
                x={c.x} y={c.y} width={c.w} height={c.h} rx="6"
                fill={c.color}
                fillOpacity={isActive ? 0.25 : 0.1}
                stroke={c.color}
                strokeWidth={isActive ? 2.5 : 1}
              />
              <text
                x={c.x + c.w / 2} y={c.y + c.h / 2 + 4}
                textAnchor="middle" fontSize="9"
                fill={c.color} fontWeight={isActive ? "bold" : "normal"}
              >
                {c.shortLabel}
              </text>
            </g>
  );
        })}

        {/* Flow direction arrows */}
        <text x="70" y="88" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">↓</text>
        <text x="70" y="153" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">↓</text>
        <text x="140" y="174" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">→</text>
        <text x="210" y="148" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">↑</text>
        <text x="210" y="88" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">↑</text>
      </svg>

      {/* Info card */}
      <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
        <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{info.detail}</p>
      </div>
    </div>
  );
};

export default CPBCircuitDiagram;
