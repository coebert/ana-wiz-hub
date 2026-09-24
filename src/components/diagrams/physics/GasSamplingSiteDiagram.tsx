import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Mode = "mainstream" | "sidestream";

interface ModeInfo {
  label: string;
  summary: string;
  pros: string[];
  cons: string[];
}

const modes: Record<Mode, ModeInfo> = {
  mainstream: {
    label: "Mainstream (in-line)",
    summary:
      "IR cuvette inserted between the catheter mount and the breathing-circuit Y-piece. Expired gas flows through the heated measuring cell.",
    pros: [
      "Real-time waveform — no transit delay",
      "No gas dilution / no aspiration loss",
      "No pump, no scavenging of sampled gas",
    ],
    cons: [
      "Adds 5–10 mL dead space (significant in neonates)",
      "Heavy cuvette + cable at the airway → ETT drag",
      "Usually CO₂ only (single-wavelength IR)",
      "Window can fog — must be heated to ~39 °C",
    ],
  },
  sidestream: {
    label: "Sidestream (diverting)",
    summary:
      "A T-piece adaptor at the airway feeds a 2–3 m sample line. A pump aspirates 50–250 mL/min through a water trap to a remote multi-gas analyser inside the monitor.",
    pros: [
      "Multi-gas: CO₂, N₂O, O₂, all volatile agents",
      "Light T-piece adaptor — negligible dead space",
      "Works in non-intubated patients (nasal cannula sampling)",
    ],
    cons: [
      "2–4 s transit delay + rise time",
      "Dilution at low tidal volumes (neonates, HFOV, jet ventilation)",
      "Water trap + Nafion™ tubing required to manage humidity",
      "Sampled gas must be scavenged or returned to circuit",
    ],
  },
};

export const GasSamplingSiteDiagram = () => {
  const [mode, setMode] = useState<Mode>("mainstream");
  const [phase, setPhase] = useState(0);
  const m = modes[mode];

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 100), 60);
    return () => clearInterval(t);
  }, []);

  const expFrac = (phase % 100) / 100; // 0..1 expiratory progress
  const sampleFrac = ((phase + 30) % 100) / 100; // delayed sample progress for sidestream

  return (
    <DiagramFigure
      id="gas-sampling-site-diagram"
      title="Gas sampling site"
      description="Gas sampling site: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(modes) as Mode[]).map((k) => (
            <Button
              key={k}
              size="sm"
              variant={mode === k ? "default" : "outline"}
              className="text-xs"
              onClick={() => setMode(k)}
            >
              {modes[k].label}
            </Button>
          ))}
        </div>
  
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <svg viewBox="0 0 420 240" className="w-full">
            {/* Patient (ETT) */}
            <rect x="20" y="100" width="55" height="50" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--border))" strokeWidth="1.5" />
            <text x="47.5" y="122" fontSize="8" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">Patient</text>
            <text x="47.5" y="134" fontSize="7" textAnchor="middle" fill="hsl(var(--muted-foreground))">(ETT)</text>
  
            {/* Catheter mount */}
            <rect x="75" y="115" width="30" height="20" fill="hsl(var(--muted)/0.4)" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x="90" y="148" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">cath. mount</text>
  
            {/* Mainstream cuvette OR plain connector */}
            {mode === "mainstream" ? (
              <>
                <rect x="105" y="108" width="40" height="34" rx="3" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent))" strokeWidth="2" />
                {/* IR source / detector */}
                <circle cx="112" cy="125" r="3" fill="hsl(var(--accent))" />
                <circle cx="138" cy="125" r="3" fill="hsl(var(--accent))" />
                <line x1="115" y1="125" x2="135" y2="125" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2 2" />
                <text x="125" y="103" fontSize="7" textAnchor="middle" fill="hsl(var(--accent))" fontWeight="bold">IR cuvette</text>
                <text x="125" y="156" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">heated 39 °C</text>
                {/* Cable to monitor */}
                <path d="M 145 115 Q 200 70 280 70 L 320 70" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="230" y="62" fontSize="7" textAnchor="middle" fill="hsl(var(--accent))">electrical signal</text>
              </>
            ) : (
              <>
                {/* T-piece adaptor */}
                <rect x="105" y="115" width="30" height="20" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <text x="120" y="103" fontSize="7" textAnchor="middle" fill="hsl(var(--primary))" fontWeight="bold">T-piece</text>
                {/* Sample line */}
                <line x1="120" y1="115" x2="120" y2="80" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <path d="M 120 80 Q 180 50 250 50 L 290 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <text x="180" y="42" fontSize="7" textAnchor="middle" fill="hsl(var(--primary))">sample line ~2–3 m, 50–250 mL/min</text>
                {/* Water trap */}
                <rect x="240" y="55" width="22" height="22" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="251" y="69" fontSize="6" textAnchor="middle" fill="hsl(var(--foreground))">H₂O</text>
                <text x="251" y="88" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">trap</text>
              </>
            )}
  
            {/* Y-piece */}
            <path d="M 145 125 L 175 110 M 145 125 L 175 140" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
            <circle cx="145" cy="125" r="2.5" fill="hsl(var(--border))" />
            <text x="165" y="100" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">Y-piece</text>
  
            {/* Inspiratory limb (top) */}
            <line x1="175" y1="110" x2="340" y2="110" stroke="hsl(var(--primary))" strokeWidth="2" />
            <text x="255" y="103" fontSize="7" textAnchor="middle" fill="hsl(var(--primary))">Inspiratory limb →</text>
            {/* Expiratory limb (bottom) */}
            <line x1="175" y1="140" x2="340" y2="140" stroke="hsl(var(--accent))" strokeWidth="2" />
            <text x="255" y="156" fontSize="7" textAnchor="middle" fill="hsl(var(--accent))">← Expiratory limb</text>
  
            {/* Anaesthetic machine block */}
            <rect x="340" y="95" width="60" height="60" rx="4" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--border))" strokeWidth="1.5" />
            <text x="370" y="120" fontSize="7" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">Anaesthetic</text>
            <text x="370" y="131" fontSize="7" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">machine</text>
            <text x="370" y="143" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">+ scavenger</text>
  
            {/* Monitor */}
            <rect x="290" y="30" width="80" height="40" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1.5" />
            <text x="330" y="46" fontSize="7" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">Monitor</text>
            <text x="330" y="57" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">
              {mode === "mainstream" ? "(displays signal)" : "(houses analyser + pump)"}
            </text>
            {/* tiny waveform */}
            <path d="M 295 65 L 305 65 L 308 60 L 318 60 L 320 65 L 365 65" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
  
            {/* Animated expired gas particle in expiratory limb */}
            <circle cx={175 + expFrac * 165} cy="140" r="3" fill="hsl(var(--accent))" opacity="0.8" />
            <circle cx={175 + ((expFrac + 0.4) % 1) * 165} cy="140" r="2.5" fill="hsl(var(--accent))" opacity="0.5" />
  
            {/* Animated sample particle (sidestream only) */}
            {mode === "sidestream" && (
              <>
                <circle cx={120} cy={115 - sampleFrac * 35} r="2.5" fill="hsl(var(--primary))" opacity={sampleFrac < 0.5 ? 0.8 : 0} />
                <circle cx={120 + Math.max(0, sampleFrac - 0.5) * 2 * 170} cy="50" r="2.5" fill="hsl(var(--primary))" opacity={sampleFrac >= 0.5 ? 0.8 : 0} />
              </>
            )}
  
            {/* Animated mainstream "in-cuvette" highlight */}
            {mode === "mainstream" && (
              <circle cx={107 + (phase % 40)} cy="125" r="2.5" fill="hsl(var(--accent))" opacity="0.8" />
            )}
  
            {/* Legend dots */}
            <g transform="translate(15, 200)">
              <circle cx="0" cy="0" r="3" fill="hsl(var(--accent))" />
              <text x="8" y="3" fontSize="7" fill="hsl(var(--muted-foreground))">expired gas</text>
              {mode === "sidestream" && (
                <>
                  <circle cx="78" cy="0" r="3" fill="hsl(var(--primary))" />
                  <text x="86" y="3" fontSize="7" fill="hsl(var(--muted-foreground))">aspirated sample</text>
                </>
              )}
            </g>
  
            {/* Dead-space / delay annotation */}
            <text x="210" y="225" fontSize="7" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              {mode === "mainstream"
                ? "Sensor sits in the gas stream → 0 s delay, +5–10 mL dead space at the airway"
                : "Sensor is remote → ~2–4 s transit delay, negligible dead space at the airway"}
            </text>
          </svg>
        </div>
  
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs font-semibold text-primary">{m.label}</p>
          <p className="text-sm text-foreground mt-1">{m.summary}</p>
        </div>
  
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">Advantages</p>
            <ul className="space-y-1">
              {m.pros.map((p) => (
                <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">+</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">Limitations</p>
            <ul className="space-y-1">
              {m.cons.map((c) => (
                <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-accent mt-0.5">−</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};
