import { DiagramFigure } from "./_shared/DiagramFigure";
export const AbsorptionSpectraDiagram = () => {
  return (
    <DiagramFigure
      id="absorption-spectra-diagram"
      title="Absorption spectra"
      description="Auto-generated wrapper for the Absorption spectra anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="space-y-2">
        <svg viewBox="0 0 500 280" className="w-full" role="img" aria-label="Absorption spectra of oxyhaemoglobin and deoxyhaemoglobin">
          {/* Axes */}
          <line x1="60" y1="230" x2="460" y2="230" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="60" y2="230" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          
          {/* Y axis label */}
          <text x="20" y="130" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle" transform="rotate(-90, 20, 130)">
            Extinction Coefficient
          </text>
          
          {/* X axis label */}
          <text x="260" y="260" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle">
            Wavelength (nm)
          </text>
  
          {/* X axis ticks */}
          {[600, 660, 700, 805, 900, 940, 1000].map((nm) => {
            const x = 60 + ((nm - 580) / 450) * 400;
            return (
              <g key={nm}>
                <line x1={x} y1="230" x2={x} y2="235" stroke="hsl(var(--foreground))" strokeWidth="1" />
                <text x={x} y="247" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">
                  {nm}
                </text>
              </g>
            );
          })}
  
          {/* DeoxyHb curve (higher at 660, lower at 940) */}
          <path
            d="M 80 60 Q 120 55 145 70 Q 170 85 185 120 Q 220 170 260 160 Q 300 150 340 170 Q 380 185 420 195 Q 440 200 450 205"
            fill="none"
            stroke="hsl(var(--destructive))"
            strokeWidth="2"
          />
          
          {/* OxyHb curve (lower at 660, higher at 940) */}
          <path
            d="M 80 140 Q 120 150 145 160 Q 170 170 185 180 Q 220 200 260 160 Q 300 120 340 140 Q 380 155 420 170 Q 440 175 450 180"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
  
          {/* 660 nm vertical line */}
          {(() => {
            const x = 60 + ((660 - 580) / 450) * 400;
            return (
              <>
                <line x1={x} y1="40" x2={x} y2="225" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                <rect x={x - 20} y="35" width="40" height="18" rx="3" fill="hsl(var(--destructive))" opacity="0.15" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x={x} y="48" fill="hsl(var(--destructive))" fontSize="9" textAnchor="middle" fontWeight="bold">660nm</text>
              </>
            );
          })()}
  
          {/* 940 nm vertical line */}
          {(() => {
            const x = 60 + ((940 - 580) / 450) * 400;
            return (
              <>
                <line x1={x} y1="40" x2={x} y2="225" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                <rect x={x - 20} y="35" width="40" height="18" rx="3" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x={x} y="48" fill="hsl(var(--primary))" fontSize="9" textAnchor="middle" fontWeight="bold">940nm</text>
              </>
            );
          })()}
  
          {/* Isobestic point */}
          {(() => {
            const x = 60 + ((805 - 580) / 450) * 400;
            return (
              <>
                <circle cx={x} cy="160" r="5" fill="hsl(var(--foreground))" opacity="0.7" />
                <text x={x + 8} y="155" fill="hsl(var(--foreground))" fontSize="9">Isobestic</text>
                <text x={x + 8} y="166" fill="hsl(var(--foreground))" fontSize="9">point (805nm)</text>
              </>
            );
          })()}
  
          {/* Legend */}
          <line x1="320" y1="265" x2="340" y2="265" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <text x="345" y="269" fill="hsl(var(--foreground))" fontSize="10">DeoxyHb</text>
          <line x1="400" y1="265" x2="420" y2="265" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="425" y="269" fill="hsl(var(--foreground))" fontSize="10">OxyHb</text>
        </svg>
      </div>
    </DiagramFigure>
  );
};
