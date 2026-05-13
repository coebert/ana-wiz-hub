import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { clampValue, createLinearScale, makeTicks, niceAxisMax } from "@/lib/diagram-scale";

type Phase = 1 | 2 | 3 | 4;

interface PhaseData {
  phase: Phase;
  label: string;
  color: string;
  description: string;
  source: string;
}

const phases: PhaseData[] = [
  { phase: 1, label: "Phase I", color: "hsl(210, 70%, 55%)", source: "Pure dead space gas (100% O₂)", description: "Initial expiration of gas from conducting airways (anatomical dead space). Contains pure oxygen — no nitrogen. Volume ≈ 150 ml." },
  { phase: 2, label: "Phase II", color: "hsl(142, 60%, 45%)", source: "Mixing of dead space & alveolar gas", description: "Rapid rise in N₂ concentration as alveolar gas mixes with dead space gas. The midpoint of Phase II is used in Fowler's method to measure anatomical dead space." },
  { phase: 3, label: "Phase III (Alveolar Plateau)", color: "hsl(35, 80%, 50%)", source: "Mixed alveolar gas", description: "Relatively uniform alveolar gas. The slight upward slope reflects sequential emptying — basal alveoli (higher N₂, smaller, close first) contribute progressively less. Slope increases with V/Q mismatch or airway disease." },
  { phase: 4, label: "Phase IV", color: "hsl(0, 70%, 55%)", source: "Apical alveolar gas only", description: "Abrupt rise in N₂ concentration. Dependent airways have closed — only apical alveoli (which received less O₂ during inspiration → higher N₂) continue to empty. The onset of Phase IV = Closing Volume (CV)." },
];

const ClosingVolumeDiagram = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [showCapacity, setShowCapacity] = useState(false);
  const [ageGroup, setAgeGroup] = useState<"young" | "elderly">("young");
  const [autoScale, setAutoScale] = useState(true);

  // CV increases with age; CC = CV + RV
  const cv = ageGroup === "young" ? 10 : 25; // % of VC
  const rv = 25; // % of TLC simplified
  const cc = cv + rv; // closing capacity

  // Curve parameters (single source of truth — used for both rendering & scaling)
  const phase4Start = ageGroup === "young" ? 320 : 290;
  const slopeIII = ageGroup === "young" ? 0.08 : 0.18; // steeper in elderly
  const n2AtEndIII = 30 + slopeIII * (phase4Start - 160);
  const rawPhase4Peak = n2AtEndIII + 25; // theoretical Phase IV end before clamping

  // Dynamic y-axis: round the actual peak up with headroom, never below 40%
  const yMax = autoScale ? niceAxisMax(rawPhase4Peak, { step: 10, headroom: 1.05, floor: 40 }) : 60;
  const tickStep = yMax <= 80 ? 10 : 20;
  const _yTicks = makeTicks(yMax, tickStep);

  // Single shared scale — every curve control point goes through this so it
  // can never escape the plot rectangle [0 → 190px (bottom), yMax → 20px (top)].
  const yScale = createLinearScale({ domain: [0, yMax], range: [190, 20] });
  const phase4EndN2 = clampValue(rawPhase4Peak, 0, yMax);

  return (
        <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Single-Breath N₂ Washout & Closing Volume</h3>

      {/* Age toggle */}
      <div className="flex gap-2">
        {(["young", "elderly"] as const).map(a => (
          <button key={a} onClick={() => setAgeGroup(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              ageGroup === a ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}>
            {a === "young" ? "Young Adult (~25y)" : "Elderly (~65y)"}
          </button>
        ))}
        <button onClick={() => setShowCapacity(!showCapacity)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            showCapacity ? "bg-accent text-accent-foreground border-border shadow-sm" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}>
          {showCapacity ? "Hide" : "Show"} CC
        </button>
        <button onClick={() => setAutoScale(!autoScale)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            autoScale ? "bg-accent text-accent-foreground border-border shadow-sm" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
          title="Toggle dynamic y-axis scaling based on selected age group">
          Y-axis: {autoScale ? `Auto (0–${yMax}%)` : "Fixed (0–60%)"}
        </button>
      </div>

      {/* N₂ Washout Curve SVG */}
      <svg viewBox="0 0 420 240" className="w-full">
        {/* Axes */}
        <line x1="60" y1="190" x2="390" y2="190" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1="60" y1="190" x2="60" y2="20" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="225" y="215" textAnchor="middle" className="text-[10px] fill-muted-foreground">Expired Volume (L)</text>
        <text x="15" y="105" textAnchor="middle" className="text-[10px] fill-muted-foreground" transform="rotate(-90,15,105)">N₂ Concentration (%)</text>

        {/* Y-axis labels (0–60 % to accommodate elderly Phase IV peak) */}
        {[0, 10, 20, 30, 40, 50, 60].map(v => {
          const y = 190 - (v / 60) * 160;
          return (
            <g key={v}>
              <line x1="56" y1={y} x2="60" y2={y} stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="52" y={y + 3} textAnchor="end" className="text-[8px] fill-muted-foreground">{v}</text>
            </g>
          );
        })}

        {/* Phase regions - background */}
        {(() => {
          const phaseXRanges = [
            { x1: 60, x2: 110 },   // Phase I
            { x1: 110, x2: 160 },  // Phase II
            { x1: 160, x2: ageGroup === "young" ? 320 : 290 }, // Phase III
            { x1: ageGroup === "young" ? 320 : 290, x2: 380 }, // Phase IV
          ];
          return phaseXRanges.map((r, i) => (
            <rect key={i} x={r.x1} y={20} width={r.x2 - r.x1} height={170}
              fill={phases[i].color} opacity={selectedPhase === (i + 1) ? 0.12 : 0.03}
              className="cursor-pointer"
              onClick={() => setSelectedPhase(selectedPhase === (i + 1) as Phase ? null : (i + 1) as Phase)}
            />
          ));
        })()}

        {/* The N₂ curve — uses shared yScale so control points reflect dynamic y-axis */}
        {(() => {
          const pathD = [
            `M 60,190`,
            // Phase I - flat near zero
            `L 100,189`,
            `C 105,189 108,185 110,180`,
            // Phase II - S-shaped rise
            `C 120,150 140,${yScale(30) - 5} 160,${yScale(30)}`,
            // Phase III - gentle upslope
            `L ${phase4Start},${yScale(n2AtEndIII)}`,
            // Phase IV - steep rise
            `C ${phase4Start + 15},${yScale(n2AtEndIII + 10)} ${phase4Start + 30},${yScale(n2AtEndIII + 18)} 380,${yScale(phase4EndN2)}`,
          ].join(" ");

          return (
            <path d={pathD} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          );
        })()}

        {/* Phase labels */}
        {(() => {
          const centers = [85, 135, (160 + phase4Start) / 2, (phase4Start + 380) / 2];
          return phases.map((p, i) => (
            <text key={i} x={centers[i]} y={210} textAnchor="middle"
              className={`text-[8px] font-medium cursor-pointer ${selectedPhase === p.phase ? "fill-foreground" : "fill-muted-foreground"}`}
              onClick={() => setSelectedPhase(selectedPhase === p.phase ? null : p.phase)}>
              {p.label.split(" (")[0]}
            </text>
          ));
        })()}

        {/* Closing Volume marker */}
        {(() => {
          const cvX = phase4Start;
          const n2AtCV = 30 + slopeIII * (cvX - 160);
          const cvY = yScale(n2AtCV);
          return (
            <g>
              <line x1={cvX} y1={cvY} x2={cvX} y2={195} stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x={cvX} y={205} textAnchor="middle" className="text-[9px] fill-destructive font-semibold">CV</text>
              <circle cx={cvX} cy={cvY} r="4" fill="hsl(0, 70%, 55%)" />
            </g>
          );
        })()}

        {/* Closing Capacity bracket */}
        {showCapacity && (
          <g>
            <rect x="62" y="2" width="70" height="14" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x="97" y="12" textAnchor="middle" className="text-[8px] fill-foreground font-medium">CC = CV + RV</text>
            <rect x="395" y="60" width="20" height="90" rx="2" fill="hsl(0, 70%, 55%)" opacity={0.1} stroke="hsl(0, 70%, 55%)" strokeWidth="1" strokeDasharray="3,2" />
            <text x="405" y="108" textAnchor="middle" className="text-[7px] fill-destructive font-medium" transform="rotate(90,405,108)">CC = {cc}% TLC</text>
          </g>
        )}
      </svg>

      {/* Phase selector buttons */}
      <div className="flex flex-wrap gap-2">
        {phases.map(p => (
          <button key={p.phase}
            onClick={() => setSelectedPhase(selectedPhase === p.phase ? null : p.phase)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selectedPhase === p.phase
                ? "border-border shadow-sm text-foreground"
                : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
            style={selectedPhase === p.phase ? { backgroundColor: withAlpha(p.color, 0.09) } : {}}>
            {p.label.split(" (")[0]}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selectedPhase !== null && (() => {
        const p = phases[selectedPhase - 1];
        return (
              <div className="bg-secondary/30 rounded-lg p-3 border border-border" style={{ borderLeftColor: p.color, borderLeftWidth: 3 }}>
            <p className="text-sm font-semibold text-foreground">{p.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Source: {p.source}</p>
            <p className="text-xs text-muted-foreground mt-2">{p.description}</p>
          </div>
  );
      })()}

      {!selectedPhase && (
        <p className="text-xs text-muted-foreground text-center">Tap a phase to see details</p>
      )}

      {/* Airway closure visualisation */}
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-xs font-semibold text-foreground mb-3">Airway Closure Mechanism</p>
        <svg viewBox="0 0 400 140" className="w-full">
          {/* Upright lung outline */}
          <path d="M80,15 C50,15 30,50 28,90 C26,120 45,130 65,130 L95,130 C115,130 134,120 132,90 C130,50 110,15 80,15Z"
            fill="hsl(var(--muted))" opacity={0.15} stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="80" y="10" textAnchor="middle" className="text-[9px] fill-foreground font-medium">During Expiration</text>

          {/* Apex - open airways */}
          <circle cx="80" cy="40" r="10" fill="hsl(210, 70%, 55%)" opacity={0.2} stroke="hsl(210, 70%, 55%)" strokeWidth="1" />
          <text x="80" y="43" textAnchor="middle" className="text-[6px] fill-foreground">Open</text>
          <text x="140" y="43" className="text-[8px] fill-muted-foreground">Apex: −ve pleural P → airways stay open</text>

          {/* Mid */}
          <circle cx="80" cy="75" r="10" fill="hsl(142, 60%, 45%)" opacity={0.2} stroke="hsl(142, 60%, 45%)" strokeWidth="1" />
          <text x="80" y="78" textAnchor="middle" className="text-[6px] fill-foreground">Open</text>
          <text x="140" y="78" className="text-[8px] fill-muted-foreground">Mid: moderate pleural P → normal calibre</text>

          {/* Base - closing/closed */}
          <ellipse cx="80" cy="110" rx={ageGroup === "young" ? 8 : 3} ry="10"
            fill="hsl(0, 70%, 55%)" opacity={0.25} stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" />
          <text x="80" y="113" textAnchor="middle" className="text-[6px] fill-foreground">
            {ageGroup === "young" ? "Closing" : "Closed"}
          </text>
          <text x="140" y="108" className="text-[8px] fill-muted-foreground">
            Base: +ve pleural P → airway closure
          </text>
          <text x="140" y="120" className="text-[8px] fill-destructive font-medium">
            {ageGroup === "young" ? "CV < FRC → closes below normal expiration" : "CV > FRC → closes during tidal breathing!"}
          </text>

          {/* FRC vs CV comparison bar */}
          <rect x="280" y="20" width="100" height="110" rx="6" fill="hsl(var(--muted))" opacity={0.1} stroke="hsl(var(--border))" strokeWidth="0.5" />
          <text x="330" y="35" textAnchor="middle" className="text-[9px] fill-foreground font-semibold">FRC vs CC</text>
          
          {/* FRC bar */}
          <rect x="295" y="45" width="20" height="75" rx="3" fill="hsl(210, 70%, 55%)" opacity={0.4} />
          <text x="305" y="125" textAnchor="middle" className="text-[7px] fill-muted-foreground">FRC</text>
          
          {/* CC bar */}
          <rect x="345" y={ageGroup === "young" ? 70 : 40} width="20" height={ageGroup === "young" ? 50 : 80} rx="3"
            fill="hsl(0, 70%, 55%)" opacity={0.4} />
          <text x="355" y="125" textAnchor="middle" className="text-[7px] fill-muted-foreground">CC</text>
          
          {/* Comparison indicator */}
          <text x="330" y={ageGroup === "young" ? 65 : 138} textAnchor="middle"
            className={`text-[8px] font-semibold ${ageGroup === "young" ? "fill-green-500" : "fill-destructive"}`}>
            {ageGroup === "young" ? "CC < FRC ✓" : "CC > FRC ✗"}
          </text>
        </svg>
      </div>

      {/* Clinical significance */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Clinical Significance</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>CV increases with age — CC exceeds FRC by ~45 years (supine) or ~65 years (upright)</li>
          <li>When CC &gt; FRC: airway closure occurs during tidal breathing → V/Q mismatch → hypoxaemia</li>
          <li>Factors increasing CV: age, smoking, obesity, LVF, abdominal surgery</li>
          <li>Factors decreasing FRC: supine position, anaesthesia, obesity, pregnancy</li>
          <li>PEEP/CPAP can increase FRC above CC, preventing airway closure</li>
          <li>Explains age-related decline in PaO₂ (~0.04 kPa/year decline from age 20)</li>
        </ul>
      </div>
    </div>
  );
};

export { ClosingVolumeDiagram };
