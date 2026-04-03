import { useState } from "react";
import { Button } from "@/components/ui/button";

type Mode = "vcv" | "pcv" | "psv";

export const VentilatorWaveformsDiagram = () => {
  const [mode, setMode] = useState<Mode>("vcv");

  const waveforms: Record<Mode, { label: string; pressurePath: string; flowPath: string }> = {
    vcv: {
      label: "Volume Control",
      pressurePath: "M 40 120 L 40 120 L 80 80 L 200 60 L 200 120 L 240 120",
      flowPath: "M 40 120 L 40 60 L 200 60 L 200 120 L 240 120",
    },
    pcv: {
      label: "Pressure Control",
      pressurePath: "M 40 120 L 40 60 L 200 60 L 200 120 L 240 120",
      flowPath: "M 40 120 L 40 40 Q 120 80 200 120 L 240 120",
    },
    psv: {
      label: "Pressure Support",
      pressurePath: "M 40 120 Q 60 60 100 60 L 160 65 Q 190 70 200 120 L 240 120",
      flowPath: "M 40 120 L 50 40 Q 120 80 200 120 L 240 120",
    },
  };

  const w = waveforms[mode];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(["vcv", "pcv", "psv"] as Mode[]).map((m) => (
          <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => setMode(m)}>
            {waveforms[m].label}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Pressure (cmH₂O)</p>
          <svg viewBox="0 0 280 150" className="w-full rounded border border-border bg-secondary/20">
            <line x1="40" y1="120" x2="260" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
            <line x1="40" y1="20" x2="40" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
            <path d={w.pressurePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
            <text x="35" y="65" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">Pinsp</text>
            <text x="35" y="125" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">PEEP</text>
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Flow (L/min)</p>
          <svg viewBox="0 0 280 150" className="w-full rounded border border-border bg-secondary/20">
            <line x1="40" y1="120" x2="260" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
            <line x1="40" y1="20" x2="40" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
            <path d={w.flowPath} fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <text x="120" y="145" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">Time →</text>
          </svg>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {mode === "vcv" && "VCV: constant (square) flow waveform → rising pressure. Volume guaranteed, pressure varies."}
        {mode === "pcv" && "PCV: square pressure waveform → decelerating flow. Pressure guaranteed, volume varies with compliance."}
        {mode === "psv" && "PSV: patient-triggered, pressure-supported breaths. Flow decelerates; cycling occurs at % of peak flow."}
      </p>
    </div>
  );
};
