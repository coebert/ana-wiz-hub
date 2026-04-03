import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export const VaporizerDiagram = () => {
  const [dialSetting, setDialSetting] = useState([2]);
  const svp = 21.3; // sevoflurane at 20°C in kPa
  const chamberConc = (svp / 101.3) * 100; // ~21%
  const targetConc = dialSetting[0];
  const bypassRatio = targetConc > 0 ? ((chamberConc - targetConc) / targetConc).toFixed(1) : "∞";
  const chamberFlow = targetConc > 0 ? (targetConc / chamberConc * 100).toFixed(0) : "0";
  const bypassFlow = targetConc > 0 ? (100 - parseFloat(chamberFlow)).toFixed(0) : "100";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground whitespace-nowrap">Dial: {targetConc}%</span>
        <Slider
          value={dialSetting}
          onValueChange={setDialSetting}
          min={0}
          max={5}
          step={0.5}
          className="flex-1"
        />
      </div>

      <svg viewBox="0 0 500 280" className="w-full" role="img" aria-label="Plenum vaporizer schematic">
        {/* Fresh gas in */}
        <line x1="30" y1="80" x2="120" y2="80" stroke="hsl(var(--primary))" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="30" y="70" fontSize="11" fill="hsl(var(--muted-foreground))">Fresh Gas In</text>

        {/* Splitting valve */}
        <rect x="120" y="60" width="40" height="40" rx="4" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="140" y="84" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle">Split</text>

        {/* Bypass channel */}
        <line x1="160" y1="70" x2="360" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="6 3" />
        <text x="260" y="62" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">Bypass ({bypassFlow}%)</text>

        {/* Chamber path */}
        <line x1="140" y1="100" x2="140" y2="160" stroke="hsl(var(--primary))" strokeWidth="2" />
        <line x1="140" y1="160" x2="180" y2="160" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Vaporizing chamber */}
        <rect x="180" y="130" width="140" height="80" rx="8" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="250" y="155" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Vaporizing Chamber</text>
        
        {/* Liquid level */}
        <rect x="185" y="185" width="130" height="20" rx="4" fill="hsl(var(--primary)/0.3)" />
        <text x="250" y="198" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle">Liquid Agent</text>

        {/* Wicks */}
        {[200, 220, 240, 260, 280, 300].map(x => (
          <line key={x} x1={x} y1="170" x2={x} y2="185" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
        ))}
        <text x="250" y="178" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">wicks</text>

        {/* Chamber output */}
        <line x1="320" y1="160" x2="360" y2="160" stroke="hsl(var(--primary))" strokeWidth="2" />
        <line x1="360" y1="160" x2="360" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="350" y="120" fontSize="10" fill="hsl(var(--primary))" textAnchor="end">({chamberFlow}%)</text>

        {/* Mixing point */}
        <circle cx="360" cy="70" r="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Output */}
        <line x1="368" y1="70" x2="470" y2="70" stroke="hsl(var(--accent))" strokeWidth="3" markerEnd="url(#arrow2)" />
        <text x="430" y="60" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">{targetConc}% out</text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="hsl(var(--primary))" />
          </marker>
          <marker id="arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="hsl(var(--accent))" />
          </marker>
        </defs>

        {/* Info box */}
        <rect x="120" y="230" width="260" height="40" rx="6" fill="hsl(var(--secondary)/0.5)" stroke="hsl(var(--border))" />
        <text x="250" y="248" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle">
          Splitting ratio (bypass:chamber) = {bypassRatio} : 1
        </text>
        <text x="250" y="262" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
          Chamber conc = SVP/Patm = {chamberConc.toFixed(0)}% (Sevoflurane at 20°C)
        </text>
      </svg>
    </div>
  );
};
