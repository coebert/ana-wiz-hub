import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

type View = "sensor" | "waveform" | "hpi";

/**
 * Acumen IQ + HPI schematic.
 *
 * Illustrates:
 *  1. Sensor — Edwards Acumen IQ transducer on a standard radial arterial line
 *     feeds the HemoSphere platform (FloTrac 4th-gen algorithm) to derive
 *     continuous SV, CO, SVV, PPV, SVR and dP/dt from waveform analysis alone.
 *  2. Waveform features — the >20 morphological features (upstroke slope,
 *     dicrotic notch height, area, complexity) that HPI learns from.
 *  3. HPI trace — a 0–100 scalar; ≥85 predicts a MAP <65 mmHg episode within
 *     ~15 min (Hatib 2018 derivation; HYPE 2020 interventional trial).
 */
export const AcumenIQDiagram = () => {
  const [view, setView] = useState<View>("sensor");
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((x) => (x + 1) % 200), 60);
    return () => clearInterval(id);
  }, []);

  return (
    <DiagramFigure
      id="acumen-iq-diagram"
      title="Edwards Acumen IQ sensor & HPI"
      description="How the Acumen IQ arterial-line sensor derives continuous advanced haemodynamics (SV, CO, SVV, dP/dt) and how the Hypotension Prediction Index (HPI) uses >20 arterial-waveform features to forecast hypotension."
    >
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant={view === "sensor" ? "default" : "outline"} onClick={() => setView("sensor")}>Sensor & signal chain</Button>
          <Button size="sm" variant={view === "waveform" ? "default" : "outline"} onClick={() => setView("waveform")}>Waveform features</Button>
          <Button size="sm" variant={view === "hpi" ? "default" : "outline"} onClick={() => setView("hpi")}>HPI trace</Button>
        </div>

        {view === "sensor" && (
          <svg viewBox="0 0 400 180" className="w-full rounded-lg border border-border bg-secondary/20">
            {/* Arm outline */}
            <path d="M 20 90 Q 60 70 120 85 L 200 90 L 200 105 L 120 100 Q 60 105 20 105 Z" fill="hsl(var(--muted))" opacity="0.5" />
            {/* Radial artery */}
            <path d="M 30 96 Q 90 92 200 98" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" />
            <text x="30" y="120" className="text-[9px]" fill="hsl(var(--muted-foreground))">Radial arterial cannula</text>
            {/* Tubing */}
            <path d="M 200 98 L 230 98 L 230 60 L 260 60" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" />
            {/* Acumen IQ sensor box */}
            <rect x="260" y="45" width="90" height="30" rx="4" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" />
            <text x="305" y="63" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--primary))">Acumen IQ</text>
            <text x="305" y="72" textAnchor="middle" className="text-[7px]" fill="hsl(var(--muted-foreground))">pressure transducer</text>
            {/* Cable */}
            <path d="M 350 60 Q 375 60 375 110 L 320 110" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            {/* HemoSphere monitor */}
            <rect x="210" y="105" width="110" height="60" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="265" y="120" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">HemoSphere</text>
            <text x="220" y="133" className="text-[7px]" fill="hsl(var(--muted-foreground))">CO / SV / SVV</text>
            <text x="220" y="144" className="text-[7px]" fill="hsl(var(--muted-foreground))">dP/dt · Eadyn</text>
            <text x="220" y="155" className="text-[7px] font-semibold" fill="hsl(var(--primary))">HPI 0–100</text>
            {/* Arrow labels */}
            <text x="110" y="80" className="text-[8px] italic" fill="hsl(var(--muted-foreground))">pulsatile pressure</text>
          </svg>
        )}

        {view === "waveform" && (
          <svg viewBox="0 0 400 180" className="w-full rounded-lg border border-border bg-secondary/20">
            {/* Baseline grid */}
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="10" y1={y} x2="390" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
            ))}
            {/* Idealised arterial waveform */}
            <path
              d="M 20 140 L 60 140 Q 65 140 70 60 Q 72 45 78 55 Q 90 85 100 95 L 110 100 Q 115 100 118 85 L 122 88 Q 130 110 140 130 L 180 138 L 220 140 Q 225 140 230 60 Q 232 45 238 55 Q 250 85 260 95 L 270 100 Q 275 100 278 85 L 282 88 Q 290 110 300 130 L 340 138 L 380 140"
              fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
            />
            {/* Feature annotations */}
            <line x1="65" y1="140" x2="65" y2="60" stroke="hsl(var(--destructive))" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="30" y="55" className="text-[8px]" fill="hsl(var(--destructive))">1. Upstroke slope (dP/dt) → contractility</text>
            <text x="80" y="40" className="text-[8px]" fill="hsl(var(--foreground))">2. Peak systolic P</text>
            <text x="120" y="78" className="text-[8px]" fill="hsl(var(--foreground))">3. Dicrotic notch position/height → SVR, Eadyn</text>
            <text x="150" y="130" className="text-[8px]" fill="hsl(var(--muted-foreground))">4. Diastolic decay slope → arterial compliance</text>
            <text x="30" y="170" className="text-[8px]" fill="hsl(var(--muted-foreground))">5. Beat-to-beat area variability → SVV / PPV (fluid responsiveness)</text>
            <text x="220" y="170" className="text-[8px]" fill="hsl(var(--muted-foreground))">6. Complex feature interactions → HPI (machine-learned)</text>
          </svg>
        )}

        {view === "hpi" && (
          <svg viewBox="0 0 400 180" className="w-full rounded-lg border border-border bg-secondary/20">
            {/* Axes */}
            <line x1="30" y1="20" x2="30" y2="160" stroke="hsl(var(--border))" />
            <line x1="30" y1="160" x2="390" y2="160" stroke="hsl(var(--border))" />
            <text x="5" y="25" className="text-[8px]" fill="hsl(var(--muted-foreground))">100</text>
            <text x="5" y="163" className="text-[8px]" fill="hsl(var(--muted-foreground))">0</text>
            <text x="380" y="175" className="text-[8px]" fill="hsl(var(--muted-foreground))">time</text>
            <text x="5" y="90" className="text-[8px]" fill="hsl(var(--muted-foreground))" transform="rotate(-90 8 90)">HPI</text>
            {/* Alarm threshold */}
            <line x1="30" y1="41" x2="390" y2="41" stroke="hsl(var(--destructive))" strokeWidth="0.8" strokeDasharray="4 3" />
            <text x="335" y="38" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">HPI 85 alarm</text>
            {/* HPI curve rising, then MAP falls after alarm */}
            <path
              d="M 30 140 Q 100 138 150 130 Q 200 115 240 60 Q 260 35 290 30 L 320 32 L 390 40"
              fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
            />
            {/* MAP overlay (secondary y) */}
            <path
              d="M 30 70 Q 100 72 200 74 Q 260 80 300 110 Q 340 135 390 140"
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="3 3"
            />
            <text x="60" y="65" className="text-[8px]" fill="hsl(var(--muted-foreground))">MAP (secondary axis)</text>
            {/* Alert marker moves along the curve */}
            {t > 100 && (
              <>
                <circle cx={240} cy={60} r={4} fill="hsl(var(--destructive))">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="245" y="55" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">Predicted hypotension ~15 min ahead</text>
              </>
            )}
            <text x="270" y="155" className="text-[8px]" fill="hsl(var(--muted-foreground))">MAP crosses 65 mmHg</text>
          </svg>
        )}

        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-1">Inputs</p>
            <p className="text-muted-foreground">Standard radial arterial line + Acumen IQ transducer. No calibration, no CVC, no thermodilution.</p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-1">Derived variables</p>
            <p className="text-muted-foreground">CO, SV, SVV, PPV, SVR, dP/dt (contractility), Eadyn (dynamic arterial elastance), HPI (0–100).</p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-1">HPI algorithm</p>
            <p className="text-muted-foreground">Logistic-regression ML model trained on &gt;20 waveform features from ~1300 arterial waveforms; alarms at HPI ≥ 85.</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default AcumenIQDiagram;
