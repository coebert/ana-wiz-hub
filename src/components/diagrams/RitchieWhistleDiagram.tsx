const RitchieWhistleDiagram = () => {
  return (
        <div className="rounded-xl border border-border bg-card p-2 overflow-x-auto">
      <svg viewBox="0 0 480 320" className="w-full max-w-[480px] mx-auto" style={{ minWidth: 300 }}>
        <defs>
          <marker id="rw-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(var(--primary))" />
          </marker>
          <marker id="rw-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(var(--destructive))" />
          </marker>
        </defs>

        {/* Title */}
        <text x="240" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
          Ritchie Whistle (Venturi Alarm)
        </text>

        {/* === Main gas conduit === */}
        {/* Upper wall */}
        <line x1="60" y1="120" x2="180" y2="120" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="220" y1="120" x2="420" y2="120" stroke="hsl(var(--foreground))" strokeWidth="2" />
        {/* Lower wall */}
        <line x1="60" y1="170" x2="180" y2="170" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="220" y1="170" x2="420" y2="170" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Venturi constriction (narrowing) */}
        <line x1="180" y1="120" x2="195" y2="132" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="195" y1="132" x2="205" y2="132" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="205" y1="132" x2="220" y2="120" stroke="hsl(var(--foreground))" strokeWidth="2" />

        <line x1="180" y1="170" x2="195" y2="158" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="195" y1="158" x2="205" y2="158" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="205" y1="158" x2="220" y2="170" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Gas fill color */}
        <polygon points="60,121 180,121 195,133 205,133 220,121 420,121 420,169 220,169 205,157 195,157 180,169 60,169"
          fill="hsl(var(--primary))" />

        {/* Constriction label */}
        <text x="200" y="150" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">
          Venturi
        </text>

        {/* === Gas flow arrows === */}
        <line x1="80" y1="145" x2="165" y2="145" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#rw-arr)" />
        <line x1="225" y1="145" x2="400" y2="145" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#rw-arr)" />
        {/* Animated flow dots */}
        <circle r="3" fill="hsl(var(--primary))">
          <animateMotion dur="2s" repeatCount="indefinite" path="M80,145 L170,145 L200,145 L230,145 L400,145" />
        </circle>
        <circle r="3" fill="hsl(var(--primary))" opacity="0.4">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path="M80,145 L170,145 L200,145 L230,145 L400,145" />
        </circle>

        {/* === Side tube from low-pressure zone to whistle === */}
        <line x1="200" y1="120" x2="200" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="200" y1="65" x2="320" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Low pressure zone indicator */}
        <text x="200" y="112" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif" fontWeight="600">
          Low P
        </text>
        {/* Downward arrow showing suction */}
        <line x1="208" y1="70" x2="208" y2="115" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#rw-arr-red)" strokeDasharray="3,2" />
        <text x="218" y="95" fontSize="7" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif">Suction</text>

        {/* === Whistle chamber === */}
        <rect x="320" y="45" width="80" height="40" rx="8" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="360" y="62" textAnchor="middle" fontSize="9" fill="hsl(var(--accent))" fontFamily="Inter, sans-serif" fontWeight="700">
          WHISTLE
        </text>
        <text x="360" y="76" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">
          (Reed / Diaphragm)
        </text>

        {/* Air inlet to whistle from atmosphere */}
        <line x1="400" y1="65" x2="440" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="455" y="62" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">Air</text>
        <text x="455" y="72" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">inlet</text>

        {/* Sound waves from whistle */}
        {[0, 1, 2].map((i) => (
          <path key={i}
            d={`M${355 + i * 12},38 Q${360 + i * 12},30 ${365 + i * 12},38`}
            fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity={0.7 - i * 0.15}>
            <animate attributeName="opacity" values={`${0.7 - i * 0.15};${0.3};${0.7 - i * 0.15}`} dur="0.8s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
          </path>
        ))}

        {/* Labels */}
        <text x="60" y="115" fontSize="9" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">
          O₂ supply
        </text>
        <text x="420" y="185" textAnchor="end" fontSize="9" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">
          To patient / machine
        </text>

        {/* === Pressure labels === */}
        <text x="120" y="195" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontFamily="Inter, sans-serif">
          High velocity at constriction
        </text>
        <text x="120" y="206" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif">
          → Low pressure (Bernoulli)
        </text>

        {/* === Explanation box === */}
        <rect x="30" y="225" width="420" height="85" rx="8" fill="hsl(var(--secondary))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <rect x="30" y="225" width="420" height="85" rx="8" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

        <text x="240" y="245" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--accent))" fontFamily="Inter, sans-serif">
          How It Works
        </text>
        <text x="240" y="261" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
          O₂ flows through a Venturi constriction, creating a low-pressure zone (Bernoulli).
        </text>
        <text x="240" y="276" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
          This draws air through a side tube across a reed/diaphragm, producing an audible whistle.
        </text>
        <text x="240" y="291" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
          If O₂ supply fails → no flow → no Venturi effect → whistle stops → SILENCE = alarm.
        </text>
        <text x="240" y="306" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif" fontWeight="600">
          The alarm sounds DURING normal operation and STOPS on failure (fail-safe design).
        </text>
      </svg>
    </div>
  );
};

export default RitchieWhistleDiagram;
