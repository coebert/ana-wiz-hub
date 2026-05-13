import { useState, useEffect } from "react";

const ManleyMVDDiagram = () => {
  const [phase, setPhase] = useState<"A-delivers" | "B-delivers">("A-delivers");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setPhase((p) => (p === "A-delivers" ? "B-delivers" : "A-delivers")), 2800);
    return () => clearInterval(id);
  }, [auto]);

  const aDelivers = phase === "A-delivers";

  // Bellows A: compressed when delivering, expanded when filling
  const bellowsAH = aDelivers ? 40 : 100;
  const bellowsATop = aDelivers ? 160 : 100;
  // Bellows B: opposite
  const bellowsBH = aDelivers ? 100 : 40;
  const bellowsBTop = aDelivers ? 100 : 160;

  const colorDeliver = "#3B82F6";
  const colorFill = "#10B981";
  const colorFGF = "#F59E0B";

  return (
            <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => { setPhase("A-delivers"); setAuto(false); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            aDelivers ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Bellows A Delivers
        </button>
        <button
          onClick={() => { setPhase("B-delivers"); setAuto(false); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !aDelivers ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Bellows B Delivers
        </button>
        <button
          onClick={() => setAuto((a) => !a)}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            auto ? "bg-primary/20 text-primary ring-1 ring-primary/40" : "bg-secondary text-muted-foreground"
          }`}
        >
          {auto ? "⏸ Pause" : "▶ Auto"}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-2 overflow-x-auto">
        <svg viewBox="0 0 520 430" className="w-full max-w-[520px] mx-auto" style={{ minWidth: 320 }}>
          <defs>
            <marker id="mvd-arr-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill={colorDeliver} />
            </marker>
            <marker id="mvd-arr-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill={colorFill} />
            </marker>
            <marker id="mvd-arr-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill={colorFGF} />
            </marker>
          </defs>

          {/* Title */}
          <text x="260" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
            Manley Minute Volume Divider
          </text>
          <text x="260" y="38" textAnchor="middle" fontSize="11" fill={colorDeliver} fontFamily="Inter, sans-serif" fontWeight="600">
            {aDelivers ? "● Bellows A → Patient    |    FGF → Bellows B" : "● Bellows B → Patient    |    FGF → Bellows A"}
          </text>

          {/* ===== FGF Inlet ===== */}
          <line x1="30" y1="130" x2="120" y2="130" stroke={colorFGF} strokeWidth="2" />
          <text x="25" y="122" textAnchor="end" fontSize="9" fill={colorFGF} fontFamily="Inter, sans-serif" fontWeight="600">Fresh Gas</text>
          <text x="25" y="133" textAnchor="end" fontSize="9" fill={colorFGF} fontFamily="Inter, sans-serif" fontWeight="600">Flow (FGF)</text>
          {/* FGF arrow always flowing in */}
          <line x1="40" y1="138" x2="110" y2="138" stroke={colorFGF} strokeWidth="1.5" markerEnd="url(#mvd-arr-orange)">
            <animate attributeName="x1" values="40;60;40" dur="1s" repeatCount="indefinite" />
          </line>

          {/* ===== Changeover Valve ===== */}
          <rect x="120" y="110" width="60" height="40" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.8" />
          <text x="150" y="127" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">Change-</text>
          <text x="150" y="138" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">over Valve</text>

          {/* ===== Bellows A (Left) ===== */}
          <text x="100" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">Bellows A</text>
          {/* Bellows housing */}
          <rect x="55" y="90" width="90" height="120" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          {/* Concertina bellows */}
          <rect x="65" y={bellowsATop} width="70" height={bellowsAH} rx="3"
            fill={aDelivers ? `${colorDeliver}20` : `${colorFill}20`}
            stroke={aDelivers ? colorDeliver : colorFill}
            strokeWidth="2"
            style={{ transition: "all 0.8s ease-in-out" }}
          />
          {/* Accordion folds */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`a-${f}`}
              x1="70" y1={bellowsATop + f * bellowsAH}
              x2="130" y2={bellowsATop + f * bellowsAH}
              stroke={aDelivers ? colorDeliver : colorFill} strokeWidth="0.75" opacity="0.5"
              style={{ transition: "all 0.8s ease-in-out" }}
            />
          ))}
          {/* Weight on top */}
          <rect x="75" y={bellowsATop - 10} width="50" height="10" rx="2"
            fill="hsl(var(--muted-foreground))" opacity="0.4"
            style={{ transition: "all 0.8s ease-in-out" }} stroke="hsl(var(--border))" strokeWidth="0.75" />
          <text x="100" y={bellowsATop - 2} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif"
            style={{ transition: "all 0.8s ease-in-out" }}>
            Weight
          </text>
          {/* Status label */}
          <text x="100" y={bellowsATop + bellowsAH / 2 + 3} textAnchor="middle" fontSize="9"
            fill={aDelivers ? colorDeliver : colorFill} fontFamily="Inter, sans-serif" fontWeight="600"
            style={{ transition: "all 0.8s ease-in-out" }}>
            {aDelivers ? "Delivering" : "Filling"}
          </text>

          {/* ===== Bellows B (Right) ===== */}
          <text x="300" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">Bellows B</text>
          <rect x="255" y="90" width="90" height="120" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <rect x="265" y={bellowsBTop} width="70" height={bellowsBH} rx="3"
            fill={!aDelivers ? `${colorDeliver}20` : `${colorFill}20`}
            stroke={!aDelivers ? colorDeliver : colorFill}
            strokeWidth="2"
            style={{ transition: "all 0.8s ease-in-out" }}
          />
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`b-${f}`}
              x1="270" y1={bellowsBTop + f * bellowsBH}
              x2="330" y2={bellowsBTop + f * bellowsBH}
              stroke={!aDelivers ? colorDeliver : colorFill} strokeWidth="0.75" opacity="0.5"
              style={{ transition: "all 0.8s ease-in-out" }}
            />
          ))}
          <rect x="275" y={bellowsBTop - 10} width="50" height="10" rx="2"
            fill="hsl(var(--muted-foreground))" opacity="0.4"
            style={{ transition: "all 0.8s ease-in-out" }} stroke="hsl(var(--border))" strokeWidth="0.75" />
          <text x="300" y={bellowsBTop - 2} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif"
            style={{ transition: "all 0.8s ease-in-out" }}>
            Weight
          </text>
          <text x="300" y={bellowsBTop + bellowsBH / 2 + 3} textAnchor="middle" fontSize="9"
            fill={!aDelivers ? colorDeliver : colorFill} fontFamily="Inter, sans-serif" fontWeight="600"
            style={{ transition: "all 0.8s ease-in-out" }}>
            {!aDelivers ? "Delivering" : "Filling"}
          </text>

          {/* ===== Connections from valve to bellows ===== */}
          {/* Valve → Bellows A */}
          <line x1="120" y1="130" x2="100" y2="130" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <line x1="100" y1="130" x2="100" y2="90" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          {/* Valve → Bellows B */}
          <line x1="180" y1="130" x2="200" y2="130" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <line x1="200" y1="130" x2="300" y2="130" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <line x1="300" y1="130" x2="300" y2="90" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />

          {/* ===== Patient outlet ===== */}
          {/* Common outlet from valve to patient */}
          <line x1="200" y1="130" x2="200" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <line x1="200" y1="60" x2="430" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <line x1="430" y1="60" x2="430" y2="105" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />

          {/* Patient icon */}
          <circle cx="430" cy="125" r="18" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.6" />
          <circle cx="430" cy="120" r="5" fill="hsl(var(--foreground))" opacity="0.4" />
          <line x1="430" y1="125" x2="430" y2="137" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="423" y1="130" x2="437" y2="130" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <text x="430" y="155" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">Patient</text>

          {/* ===== Flow arrows ===== */}
          {aDelivers ? (
            <>
              {/* A delivering to patient (blue) */}
              <circle r="3" fill={colorDeliver}>
                <animateMotion dur="1.5s" repeatCount="indefinite"
                  path="M100,160 L100,90 L100,60 L200,60 L430,60 L430,105" />
              </circle>
              <circle r="3" fill={colorDeliver} opacity="0.4">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"
                  path="M100,160 L100,90 L100,60 L200,60 L430,60 L430,105" />
              </circle>
              {/* Delivery arrow from A up */}
              <line x1="92" y1={bellowsATop - 15} x2="92" y2="65"
                stroke={colorDeliver} strokeWidth="1.5" markerEnd="url(#mvd-arr-blue)"
                style={{ transition: "all 0.6s" }} />
              {/* Arrow along to patient */}
              <line x1="210" y1="55" x2="415" y2="55"
                stroke={colorDeliver} strokeWidth="1.5" markerEnd="url(#mvd-arr-blue)" />

              {/* FGF filling B (green) */}
              <circle r="3" fill={colorFill}>
                <animateMotion dur="1.8s" repeatCount="indefinite"
                  path="M150,130 L300,130 L300,100" />
              </circle>
              {/* FGF arrow to B */}
              <line x1="190" y1="125" x2="290" y2="125"
                stroke={colorFill} strokeWidth="1.5" markerEnd="url(#mvd-arr-green)" />
            </>
          ) : (
            <>
              {/* B delivering to patient (blue) */}
              <circle r="3" fill={colorDeliver}>
                <animateMotion dur="1.5s" repeatCount="indefinite"
                  path="M300,160 L300,90 L300,60 L430,60 L430,105" />
              </circle>
              <circle r="3" fill={colorDeliver} opacity="0.4">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"
                  path="M300,160 L300,90 L300,60 L430,60 L430,105" />
              </circle>
              <line x1="308" y1={bellowsBTop - 15} x2="308" y2="65"
                stroke={colorDeliver} strokeWidth="1.5" markerEnd="url(#mvd-arr-blue)"
                style={{ transition: "all 0.6s" }} />
              <line x1="310" y1="55" x2="415" y2="55"
                stroke={colorDeliver} strokeWidth="1.5" markerEnd="url(#mvd-arr-blue)" />

              {/* FGF filling A (green) */}
              <circle r="3" fill={colorFill}>
                <animateMotion dur="1.8s" repeatCount="indefinite"
                  path="M150,130 L100,130 L100,100" />
              </circle>
              <line x1="140" y1="125" x2="108" y2="125"
                stroke={colorFill} strokeWidth="1.5" markerEnd="url(#mvd-arr-green)" />
            </>
          )}

          {/* ===== Key equation ===== */}
          <rect x="120" y="220" width="160" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="200" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--foreground))" fontFamily="monospace">
            MV = FGF = VT × RR
          </text>

          {/* ===== Explanation box ===== */}
          <rect x="20" y="265" width="480" height="155" rx="8" fill="hsl(var(--secondary))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x="20" y="265" width="480" height="155" rx="8" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

          <text x="260" y="287" textAnchor="middle" fontSize="11" fontWeight="bold" fill={colorDeliver} fontFamily="Inter, sans-serif">
            {aDelivers ? "PHASE 1: Bellows A delivers, Bellows B fills" : "PHASE 2: Bellows B delivers, Bellows A fills"}
          </text>
          <text x="260" y="307" textAnchor="middle" fontSize="9.5" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
            The changeover valve alternates FGF between the two bellows.
          </text>
          <text x="260" y="323" textAnchor="middle" fontSize="9.5" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
            {aDelivers
              ? "Weight on Bellows A pushes gas to the patient. FGF simultaneously fills Bellows B."
              : "Weight on Bellows B pushes gas to the patient. FGF simultaneously fills Bellows A."}
          </text>
          <text x="260" y="343" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">
            When the delivering bellows is empty, the valve switches — the cycle repeats.
          </text>
          <text x="260" y="363" textAnchor="middle" fontSize="9" fill={colorFGF} fontFamily="Inter, sans-serif">
            Minute Volume = Fresh Gas Flow. Tidal Volume = FGF ÷ Respiratory Rate.
          </text>
          <text x="260" y="383" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">
            Entirely pneumatic — no electricity required. Changing FGF changes tidal volume.
          </text>
          <text x="260" y="403" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif">
            ⚠ Cannot deliver PEEP. Limited alarms. No waveform monitoring.
          </text>

          {/* Legend */}
          <g transform="translate(370, 220)">
            <rect x="0" y="0" width="120" height="46" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <circle cx="12" cy="12" r="4" fill={colorDeliver} />
            <text x="22" y="15" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">Delivery to patient</text>
            <circle cx="12" cy="28" r="4" fill={colorFill} />
            <text x="22" y="31" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">FGF filling bellows</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ManleyMVDDiagram;
