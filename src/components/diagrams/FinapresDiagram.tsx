import { DiagramFigure } from "./_shared/DiagramFigure";
const FinapresDiagram = () => {
  return (
        <div className="my-8">
      <h3 className="text-xl font-serif font-bold text-foreground mb-4">Finapres Volume-Clamp Servo Loop</h3>
      <div className="rounded-xl border border-border bg-card p-2 overflow-x-auto">
        <svg viewBox="0 0 720 520" className="w-full h-auto min-w-[360px]" aria-label="Finapres volume-clamp servo loop diagram">
          <defs>
            <marker id="fin-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="hsl(var(--primary))" />
            </marker>
            <marker id="fin-arrow-muted" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="hsl(var(--muted-foreground))" />
            </marker>
            <marker id="fin-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="hsl(0 70% 50%)" />
            </marker>
          </defs>

          {/* Title */}
          <text x="360" y="28" textAnchor="middle" className="fill-foreground text-[14px] font-bold">Penáz Volume-Clamp Principle</text>

          {/* === FINGER CUFF (left) === */}
          <rect x="40" y="60" width="200" height="180" rx="16" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="140" y="85" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">Finger Cuff</text>

          {/* Artery cross-section */}
          <ellipse cx="140" cy="155" rx="38" ry="38" fill="hsl(0 70% 92%)" stroke="hsl(0 50% 65%)" strokeWidth="2" />
          <ellipse cx="140" cy="155" rx="22" ry="22" fill="hsl(0 65% 55%)" opacity="0.7" />
          <text x="140" y="160" textAnchor="middle" className="fill-background text-[10px] font-bold">Artery</text>

          {/* IR LED & detector */}
          <rect x="58" y="200" width="50" height="26" rx="4" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="83" y="217" textAnchor="middle" className="fill-primary text-[9px] font-semibold">IR LED</text>

          <rect x="172" y="200" width="56" height="26" rx="4" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="200" y="217" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Detector</text>

          {/* Light path */}
          <line x1="108" y1="213" x2="172" y2="213" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#fin-arrow)" />
          <text x="140" y="235" textAnchor="middle" className="fill-muted-foreground text-[8px]">Plethysmograph</text>

          {/* === SERVO CONTROLLER (center) === */}
          <rect x="290" y="80" width="180" height="100" rx="14" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="380" y="108" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">Servo Controller</text>
          <text x="380" y="128" textAnchor="middle" className="fill-muted-foreground text-[10px]">Compares detected volume</text>
          <text x="380" y="142" textAnchor="middle" className="fill-muted-foreground text-[10px]">to set-point → adjusts</text>
          <text x="380" y="156" textAnchor="middle" className="fill-muted-foreground text-[10px]">cuff pressure to maintain</text>
          <text x="380" y="170" textAnchor="middle" className="fill-muted-foreground text-[10px]">constant arterial diameter</text>

          {/* === AIR PUMP (right) === */}
          <rect x="530" y="90" width="140" height="70" rx="12" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="600" y="118" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Rapid Air Pump</text>
          <text x="600" y="136" textAnchor="middle" className="fill-muted-foreground text-[10px]">Pneumatic actuator</text>
          <text x="600" y="150" textAnchor="middle" className="fill-muted-foreground text-[9px]">(response &lt;10 ms)</text>

          {/* === PRESSURE TRANSDUCER (bottom-right) === */}
          <rect x="530" y="240" width="140" height="60" rx="12" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="600" y="266" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Pressure</text>
          <text x="600" y="282" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Transducer</text>

          {/* === OUTPUT (bottom-center) === */}
          <rect x="290" y="350" width="180" height="70" rx="14" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="380" y="378" textAnchor="middle" className="fill-primary text-[12px] font-bold">Cuff Pressure =</text>
          <text x="380" y="396" textAnchor="middle" className="fill-primary text-[12px] font-bold">Arterial Pressure</text>
          <text x="380" y="412" textAnchor="middle" className="fill-muted-foreground text-[9px]">(beat-to-beat waveform)</text>

          {/* === PHYSIOCAL (bottom-left) === */}
          <rect x="40" y="350" width="190" height="60" rx="12" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="135" y="375" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Physiocal Algorithm</text>
          <text x="135" y="392" textAnchor="middle" className="fill-muted-foreground text-[9px]">Periodic recalibration of</text>
          <text x="135" y="404" textAnchor="middle" className="fill-muted-foreground text-[9px]">set-point for vascular tone</text>

          {/* === ARROWS === */}

          {/* Detector → Servo (volume signal) */}
          <line x1="228" y1="213" x2="288" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#fin-arrow)" />
          <text x="248" y="170" className="fill-primary text-[9px] font-semibold" transform="rotate(-25 248 170)">Volume signal</text>

          {/* Servo → Pump */}
          <line x1="470" y1="125" x2="528" y2="125" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#fin-arrow)" />
          <text x="499" y="118" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Drive</text>

          {/* Pump → Cuff (pressure line) */}
          <path d="M 530,155 Q 500,200 400,210 Q 300,220 240,175" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" markerEnd="url(#fin-arrow-red)" />
          <text x="400" y="230" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(0 70% 50%)">Cuff pressure</text>

          {/* Pump → Transducer */}
          <line x1="600" y1="160" x2="600" y2="238" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#fin-arrow-muted)" />

          {/* Transducer → Output */}
          <line x1="530" y1="280" x2="472" y2="370" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#fin-arrow)" />
          <text x="510" y="330" textAnchor="middle" className="fill-primary text-[9px] font-semibold" transform="rotate(-50 510 330)">Measured P</text>

          {/* Physiocal → Servo */}
          <path d="M 135,350 L 135,290 Q 135,260 170,260 L 288,200" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#fin-arrow-muted)" />
          <text x="180" y="275" className="fill-muted-foreground text-[8px]">Set-point update</text>

          {/* === KEY PRINCIPLE annotation === */}
          <rect x="40" y="450" width="640" height="55" rx="10" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.25)" strokeWidth="1" />
          <text x="360" y="472" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Key Principle: When cuff pressure = intra-arterial pressure, the arterial wall is "unloaded"</text>
          <text x="360" y="490" textAnchor="middle" className="fill-muted-foreground text-[10px]">(transmural pressure = 0). The servo keeps diameter constant → cuff pressure tracks arterial pressure continuously.</text>
        </svg>
      </div>
    </div>
  );
};

export default FinapresDiagram;
