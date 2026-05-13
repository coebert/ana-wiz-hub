import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type ViewMode = "overview" | "inspiration" | "expiration" | "setup";

interface ViewData {
  label: string;
  description: string;
  highlights: string[];
}

const views: Record<ViewMode, ViewData> = {
  overview: {
    label: "Device Overview",
    description: "The Sedaconda (AnaConDa) is a modified HME placed between the Y-piece and ETT. It contains an activated carbon fibre reflector that captures and re-delivers volatile anaesthetic agent.",
    highlights: [
      "Fits standard 22 mm circuit connectors",
      "50 ml dead space (Sedaconda-S)",
      "Activated carbon reflector recaptures ~90% of exhaled agent",
      "Liquid agent infused via syringe pump port",
      "Gas sampling port for end-tidal agent monitoring",
    ],
  },
  inspiration: {
    label: "Inspiration Phase",
    description: "During inspiration, fresh gas from the ventilator passes through the carbon reflector. Previously adsorbed volatile agent is released from the carbon fibres and delivered to the patient, supplemented by newly evaporated liquid agent from the syringe pump.",
    highlights: [
      "Carbon reflector releases stored volatile → patient",
      "Fresh liquid agent evaporates within the reflector mesh",
      "Combined delivery achieves target end-tidal concentration",
      "Agent monitor confirms Fe' (end-tidal) concentration",
    ],
  },
  expiration: {
    label: "Expiration Phase",
    description: "During expiration, exhaled gas containing volatile agent passes back through the carbon reflector. ~90% of the agent is adsorbed onto the activated carbon fibres, ready for re-delivery on the next inspiration. Only ~10% escapes to the ventilator exhaust (captured by scavenging filter).",
    highlights: [
      "~90% of exhaled agent adsorbed by carbon reflector",
      "Only ~10% reaches exhaust → minimal waste & pollution",
      "Charcoal scavenging filter on expiratory port captures remainder",
      "Efficient agent conservation reduces cost",
    ],
  },
  setup: {
    label: "Practical Setup",
    description: "Complete Sedaconda setup requires a syringe pump with liquid volatile agent, an anaesthetic gas monitor, and a charcoal scavenging filter on the ventilator exhaust. The device is changed every 24 hours.",
    highlights: [
      "Syringe pump: isoflurane 0.5–5 ml/h (or sevoflurane)",
      "Gas monitor: essential — target Fe'Iso 0.3–1.5%",
      "Scavenging: activated charcoal filter on expiratory limb",
      "Change device every 24 h",
      "Compatible with standard ICU ventilators",
      "Increase V_T slightly to compensate for 50 ml dead space",
    ],
  },
};

const viewOrder: ViewMode[] = ["overview", "inspiration", "expiration", "setup"];

const SedacondaDiagram = () => {
  const [activeView, setActiveView] = useState<ViewMode>("overview");
  const data = views[activeView];

  return (
    <DiagramFigure
      id="sedaconda-diagram"
      title="Sedaconda"
      description="Auto-generated wrapper for the Sedaconda anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 mb-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Sedaconda / AnaConDa Device</h3>
        <p className="text-xs text-muted-foreground mb-4">Interactive diagram — select a view to explore device function and gas flow</p>
  
        {/* View selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {viewOrder.map((view) => {
            const isActive = activeView === view;
            return (
                  <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`p-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/10 text-foreground shadow-sm"
                    : "border-border bg-secondary/20 text-muted-foreground hover:bg-secondary/40"
                }`}
              >
                {views[view].label}
              </button>
    );
          })}
        </div>
  
        <div className="grid md:grid-cols-5 gap-4">
          {/* Device SVG — 3 columns */}
          <div className="md:col-span-3 rounded-lg border border-border bg-background p-3 flex items-center justify-center">
            <svg viewBox="0 0 480 340" className="w-full h-auto max-h-[360px]">
              <defs>
                <linearGradient id="carbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.1" />
                </linearGradient>
                <pattern id="carbonPattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.2" fill="hsl(var(--muted-foreground))" opacity="0.35" />
                </pattern>
                <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(210, 80%, 55%)" />
                </marker>
                <marker id="arrowAmber" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(35, 92%, 50%)" />
                </marker>
                <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(150, 60%, 40%)" />
                </marker>
              </defs>
  
              {/* ===== VENTILATOR CIRCUIT (left) ===== */}
              <rect x="10" y="130" width="70" height="80" rx="6" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.6" />
              <text x="45" y="163" textAnchor="middle" className="fill-muted-foreground text-[8px] font-semibold">ICU</text>
              <text x="45" y="175" textAnchor="middle" className="fill-muted-foreground text-[8px] font-semibold">Ventilator</text>
  
              {/* Inspiratory limb */}
              <line x1="80" y1="152" x2="130" y2="152" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.4" />
              {/* Expiratory limb */}
              <line x1="80" y1="188" x2="130" y2="188" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.4" />
  
              {/* Y-piece */}
              <rect x="130" y="140" width="30" height="60" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
              <text x="145" y="173" textAnchor="middle" className="fill-muted-foreground text-[7px]">Y-piece</text>
  
              {/* ===== SEDACONDA DEVICE (center) ===== */}
              <rect
                x="180" y="105" width="150" height="130" rx="10"
                fill="url(#carbonGrad)"
                stroke={activeView === "overview" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth={activeView === "overview" ? "2" : "1.5"}
                opacity={activeView === "overview" ? 1 : 0.8}
              />
              {/* Device label */}
              <text x="255" y="122" textAnchor="middle" className="fill-foreground text-[9px] font-bold">SEDACONDA</text>
  
              {/* Carbon reflector zone */}
              <rect
                x="200" y="140" width="110" height="55" rx="4"
                fill="url(#carbonPattern)"
                stroke={
                  activeView === "inspiration" ? "hsl(210, 80%, 55%)" :
                  activeView === "expiration" ? "hsl(35, 92%, 50%)" :
                  "hsl(var(--muted-foreground))"
                }
                strokeWidth={activeView === "inspiration" || activeView === "expiration" ? "2" : "1"}
                strokeDasharray={activeView === "inspiration" || activeView === "expiration" ? "none" : "3,3"}
                className="transition-all duration-500"
              />
              <text x="255" y="158" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Activated Carbon</text>
              <text x="255" y="168" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Reflector</text>
              <text x="255" y="183" textAnchor="middle" className="fill-muted-foreground text-[6px]">~90% agent recaptured</text>
  
              {/* Connection: Y-piece → Device */}
              <line x1="160" y1="170" x2="180" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
  
              {/* Connection: Device → ETT */}
              <line x1="330" y1="170" x2="350" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
  
              {/* ===== SYRINGE PUMP (top) ===== */}
              <rect
                x="215" y="30" width="80" height="40" rx="5"
                fill="none"
                stroke={activeView === "setup" ? "hsl(150, 60%, 40%)" : "hsl(var(--muted-foreground))"}
                strokeWidth={activeView === "setup" ? "2" : "1.2"}
                opacity={activeView === "setup" ? 1 : 0.5}
              />
              <text x="255" y="48" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Syringe Pump</text>
              <text x="255" y="59" textAnchor="middle" className="fill-muted-foreground text-[6px]">Isoflurane 0.5–5 ml/h</text>
  
              {/* Syringe line to device */}
              <line x1="255" y1="70" x2="255" y2="105" stroke="hsl(150, 60%, 40%)" strokeWidth="1.5" strokeDasharray={activeView === "setup" ? "none" : "3,3"} markerEnd="url(#arrowGreen)" opacity={activeView === "setup" ? 1 : 0.5} />
              <text x="268" y="90" className="text-[6px]" fill="hsl(150, 60%, 40%)" opacity={activeView === "setup" ? 1 : 0.6}>Liquid agent</text>
  
              {/* ===== GAS MONITOR (bottom) ===== */}
              <rect
                x="210" y="265" width="90" height="40" rx="5"
                fill="none"
                stroke={activeView === "setup" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth={activeView === "setup" ? "2" : "1.2"}
                opacity={activeView === "setup" ? 1 : 0.5}
              />
              <text x="255" y="283" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Gas Monitor</text>
              <text x="255" y="296" textAnchor="middle" className="fill-muted-foreground text-[6px]">Fe'Iso / Fe'Sevo</text>
  
              {/* Sampling line */}
              <line x1="255" y1="235" x2="255" y2="265" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray={activeView === "setup" ? "none" : "3,3"} opacity={activeView === "setup" ? 1 : 0.5} />
              <circle cx="255" cy="240" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity={activeView === "setup" ? 1 : 0.5} />
              <text x="270" y="252" className="text-[6px] fill-primary" opacity={activeView === "setup" ? 1 : 0.6}>Sampling port</text>
  
              {/* ===== ETT & PATIENT (right) ===== */}
              <rect x="350" y="155" width="50" height="30" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
              <text x="375" y="173" textAnchor="middle" className="fill-muted-foreground text-[7px] font-semibold">ETT</text>
  
              {/* Patient lungs icon */}
              <path d="M425 155 Q440 145 445 160 Q448 175 435 180 Q425 183 423 175 Z" fill="hsl(210, 60%, 70%)" opacity="0.3" />
              <path d="M425 155 Q410 145 405 160 Q402 175 415 180 Q425 183 427 175 Z" fill="hsl(210, 60%, 70%)" opacity="0.3" />
              <text x="425" y="195" textAnchor="middle" className="fill-muted-foreground text-[7px]">Patient</text>
  
              <line x1="400" y1="170" x2="415" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
  
              {/* ===== SCAVENGING FILTER (bottom-left) ===== */}
              <rect
                x="30" y="250" width="80" height="35" rx="5"
                fill="none"
                stroke={activeView === "setup" ? "hsl(35, 92%, 50%)" : "hsl(var(--muted-foreground))"}
                strokeWidth={activeView === "setup" ? "2" : "1.2"}
                opacity={activeView === "setup" ? 1 : 0.5}
              />
              <text x="70" y="267" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Charcoal Filter</text>
              <text x="70" y="278" textAnchor="middle" className="fill-muted-foreground text-[6px]">Scavenging</text>
  
              <line x1="70" y1="210" x2="70" y2="250" stroke="hsl(35, 92%, 50%)" strokeWidth="1" strokeDasharray="3,3" opacity={activeView === "setup" ? 1 : 0.4} />
              <text x="85" y="235" className="text-[6px]" fill="hsl(35, 92%, 50%)" opacity={activeView === "setup" ? 1 : 0.5}>~10% exhaust</text>
  
              {/* ===== FLOW ARROWS (phase-dependent) ===== */}
              {activeView === "inspiration" && (
                <>
                  {/* Ventilator → Y-piece → Device → ETT → Patient */}
                  <line x1="85" y1="148" x2="128" y2="148" stroke="hsl(210, 80%, 55%)" strokeWidth="2" markerEnd="url(#arrowBlue)" className="animate-fade-in" />
                  <line x1="162" y1="165" x2="178" y2="165" stroke="hsl(210, 80%, 55%)" strokeWidth="2" markerEnd="url(#arrowBlue)" className="animate-fade-in" />
                  <line x1="332" y1="165" x2="348" y2="165" stroke="hsl(210, 80%, 55%)" strokeWidth="2" markerEnd="url(#arrowBlue)" className="animate-fade-in" />
                  <line x1="402" y1="165" x2="412" y2="165" stroke="hsl(210, 80%, 55%)" strokeWidth="2" markerEnd="url(#arrowBlue)" className="animate-fade-in" />
                  {/* Label */}
                  <text x="255" y="215" textAnchor="middle" className="text-[7px] font-bold animate-fade-in" fill="hsl(210, 80%, 55%)">
                    Agent released from carbon → patient
                  </text>
                </>
              )}
  
              {activeView === "expiration" && (
                <>
                  {/* Patient → ETT → Device → Y-piece → Ventilator */}
                  <line x1="412" y1="175" x2="402" y2="175" stroke="hsl(35, 92%, 50%)" strokeWidth="2" markerEnd="url(#arrowAmber)" className="animate-fade-in" style={{ transform: "scaleX(-1)", transformOrigin: "407px 175px" }} />
                  <line x1="348" y1="175" x2="332" y2="175" stroke="hsl(35, 92%, 50%)" strokeWidth="2" className="animate-fade-in" />
                  <line x1="178" y1="175" x2="162" y2="175" stroke="hsl(35, 92%, 50%)" strokeWidth="2" className="animate-fade-in" />
                  <line x1="128" y1="192" x2="85" y2="192" stroke="hsl(35, 92%, 50%)" strokeWidth="1.5" strokeDasharray="4,3" className="animate-fade-in" opacity="0.6" />
                  {/* Label */}
                  <text x="255" y="215" textAnchor="middle" className="text-[7px] font-bold animate-fade-in" fill="hsl(35, 92%, 50%)">
                    ~90% agent adsorbed by carbon reflector
                  </text>
                  {/* Arrows into carbon */}
                  <line x1="315" y1="170" x2="312" y2="170" stroke="hsl(35, 92%, 50%)" strokeWidth="2" markerEnd="url(#arrowAmber)" className="animate-fade-in" style={{ transform: "scaleX(-1)", transformOrigin: "313px 170px" }} />
                </>
              )}
            </svg>
          </div>
  
          {/* Info panel — 2 columns */}
          <div className="md:col-span-2 space-y-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-semibold text-foreground mb-2">{data.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{data.description}</p>
            </div>
  
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Key Points</p>
              <ul className="space-y-1.5">
                {data.highlights.map((point) => (
                  <li key={point} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Agent comparison */}
            {activeView === "setup" && (
              <div className="rounded-lg border border-border bg-background p-4 animate-fade-in">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Agent Comparison</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-secondary/30 rounded px-2 py-1.5">
                    <span className="text-xs font-medium text-foreground">Isoflurane</span>
                    <span className="text-xs text-muted-foreground">Preferred for prolonged use (&gt;48 h). Lower cost. No compound A.</span>
                  </div>
                  <div className="flex items-center justify-between bg-secondary/30 rounded px-2 py-1.5">
                    <span className="text-xs font-medium text-foreground">Sevoflurane</span>
                    <span className="text-xs text-muted-foreground">Faster onset. Compound A risk at low flows. Fluoride nephrotoxicity.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Circuit flow summary */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <span className="px-2 py-1 rounded bg-secondary/40 font-medium">Ventilator</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-secondary/40 font-medium">Y-piece</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-primary/15 text-foreground font-bold border border-primary/30">Sedaconda</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-secondary/40 font-medium">ETT</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-secondary/40 font-medium">Patient</span>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SedacondaDiagram;
