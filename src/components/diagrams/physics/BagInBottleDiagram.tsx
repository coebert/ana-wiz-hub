import { useState, useEffect } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

const BagInBottleDiagram = () => {
  const [phase, setPhase] = useState<"insp" | "exp">("exp");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setPhase((p) => (p === "insp" ? "exp" : "insp")), 2500);
    return () => clearInterval(id);
  }, [auto]);

  const isInsp = phase === "insp";

  // Bellows position: ascending bellows rise during expiration, compress during inspiration
  const bellowsTop = isInsp ? 200 : 100; // lower during insp (compressed), higher during exp (risen)
  const bellowsH = isInsp ? 60 : 160;

  // Driving gas arrows
  const drivingGasActive = isInsp;

  return (
    <DiagramFigure id="bag-in-bottle" title="Bag-in-bottle ventilator: inspiratory and expiratory phases" description="Animated mechanical ventilator showing driving gas compressing the inner bellows during inspiration and passive recoil during expiration.">
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => { setPhase("insp"); setAuto(false); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isInsp ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Inspiration
        </button>
        <button
          onClick={() => { setPhase("exp"); setAuto(false); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !isInsp ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          Expiration
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

      {/* SVG Diagram */}
      <div className="rounded-xl border border-border bg-card p-2 overflow-x-auto">
        <svg viewBox="0 0 520 420" className="w-full max-w-[520px] mx-auto" style={{ minWidth: 320 }}>
          <defs>
            <marker id="bib-arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="hsl(var(--primary))" />
            </marker>
            <marker id="bib-arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="hsl(var(--clinical))" />
            </marker>
            <marker id="bib-arrow-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="hsl(var(--accent))" />
            </marker>
            <marker id="bib-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="hsl(var(--destructive))" />
            </marker>
            {/* Driving gas pattern */}
            <pattern id="driving-gas" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1" fill="hsl(var(--accent))" opacity="0.4" />
            </pattern>
          </defs>

          {/* Title */}
          <text x="260" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
            Bag-in-Bottle Ventilator — Ascending Bellows
          </text>
          <text x="260" y="38" textAnchor="middle" fontSize="11" fill={isInsp ? "#3B82F6" : "#10B981"} fontFamily="Inter, sans-serif" fontWeight="600">
            {isInsp ? "● INSPIRATION" : "● EXPIRATION"}
          </text>

          {/* ===== OUTER BOTTLE (Chamber) ===== */}
          <rect x="140" y="60" width="180" height="230" rx="8" ry="8"
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.7" />
          {/* Label */}
          <text x="148" y="78" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">Sealed Chamber</text>

          {/* Driving gas fills outer chamber during inspiration */}
          {drivingGasActive && (
            <rect x="142" y="62" width="176" height="226" rx="6" ry="6"
              fill="url(#driving-gas)" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
            </rect>
          )}

          {/* ===== INNER BELLOWS ===== */}
          <g>
            {/* Bellows body */}
            <rect x="175" y={bellowsTop} width="110" height={bellowsH} rx="4" ry="4"
              fill={isInsp ? "#3B82F620" : "#10B98120"}
              stroke={isInsp ? "#3B82F6" : "#10B981"}
              strokeWidth="2"
              style={{ transition: "all 0.8s ease-in-out" }}
            />
            {/* Bellows accordion lines */}
            {[0.2, 0.4, 0.6, 0.8].map((f) => (
              <line key={f}
                x1="180" y1={bellowsTop + f * bellowsH}
                x2="280" y2={bellowsTop + f * bellowsH}
                stroke={isInsp ? "#3B82F6" : "#10B981"} strokeWidth="0.75" opacity="0.5"
                style={{ transition: "all 0.8s ease-in-out" }}
              />
            ))}
            {/* Label inside bellows */}
            <text x="230" y={bellowsTop + bellowsH / 2 + 4} textAnchor="middle" fontSize="10"
              fill={isInsp ? "#3B82F6" : "#10B981"} fontFamily="Inter, sans-serif" fontWeight="600"
              style={{ transition: "all 0.8s ease-in-out" }}>
              Bellows
            </text>
            {/* Gas label */}
            <text x="230" y={bellowsTop + bellowsH / 2 + 16} textAnchor="middle" fontSize="8"
              fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif"
              style={{ transition: "all 0.8s ease-in-out" }}>
              (patient gas)
            </text>
          </g>

          {/* ===== PATIENT CONNECTION (tube from bellows top, out the chamber) ===== */}
          {/* Vertical tube from bellows top to above chamber */}
          <line x1="230" y1={Math.min(bellowsTop, 100)} x2="230" y2="60"
            stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.6"
            style={{ transition: "all 0.8s ease-in-out" }} />
          <line x1="230" y1="60" x2="230" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.6" />
          {/* Horizontal to right */}
          <line x1="230" y1="50" x2="400" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.6" />
          {/* Down to patient */}
          <line x1="400" y1="50" x2="400" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.6" />

          {/* Patient icon */}
          <circle cx="400" cy="120" r="18" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.6" />
          <circle cx="400" cy="115" r="5" fill="hsl(var(--foreground))" opacity="0.4" />
          <line x1="400" y1="120" x2="400" y2="132" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="393" y1="125" x2="407" y2="125" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <text x="400" y="150" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif" fontWeight="600">Patient</text>

          {/* ===== DRIVING GAS INLET ===== */}
          {/* Pipe from left into chamber */}
          <line x1="60" y1="180" x2="140" y2="180" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray={drivingGasActive ? "none" : "4,4"} />
          <text x="55" y="172" textAnchor="end" fontSize="9" fill="hsl(var(--accent))" fontFamily="Inter, sans-serif" fontWeight="600">Driving</text>
          <text x="55" y="183" textAnchor="end" fontSize="9" fill="hsl(var(--accent))" fontFamily="Inter, sans-serif" fontWeight="600">Gas</text>

          {/* Driving gas flow arrow during inspiration */}
          {drivingGasActive && (
            <line x1="70" y1="190" x2="130" y2="190"
              stroke="hsl(var(--accent))" strokeWidth="1.5" markerEnd="url(#bib-arrow-orange)">
              <animate attributeName="x1" values="70;90;70" dur="1s" repeatCount="indefinite" />
              <animate attributeName="x2" values="130;140;130" dur="1s" repeatCount="indefinite" />
            </line>
          )}

          {/* ===== FGF INLET ===== */}
          {/* FGF enters from left at bottom of bellows area */}
          <line x1="60" y1="270" x2="175" y2="270" stroke="hsl(var(--clinical))" strokeWidth="2" />
          <line x1="175" y1="270" x2="175" y2={bellowsTop + bellowsH}
            stroke="hsl(var(--clinical))" strokeWidth="1.5" strokeDasharray="3,3"
            style={{ transition: "all 0.8s ease-in-out" }} />
          <text x="55" y="264" textAnchor="end" fontSize="9" fill="hsl(var(--clinical))" fontFamily="Inter, sans-serif" fontWeight="600">Fresh Gas</text>
          <text x="55" y="275" textAnchor="end" fontSize="9" fill="hsl(var(--clinical))" fontFamily="Inter, sans-serif" fontWeight="600">Flow (FGF)</text>

          {/* ===== EXPIRATORY VALVE / APL ===== */}
          <line x1="400" y1="100" x2="460" y2="100" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
          <rect x="460" y="88" width="40" height="24" rx="4" fill={!isInsp ? "#EF444430" : "#EF444410"} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
          <text x="480" y="103" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif" fontWeight="600">APL</text>

          {/* ===== GAS FLOW ARROWS ===== */}
          {isInsp ? (
            <>
              {/* Inspiration: gas flows from bellows → patient */}
              {/* Arrow up from bellows */}
              <line x1="240" y1={bellowsTop - 5} x2="240" y2="55"
                stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#bib-arrow-blue)"
                style={{ transition: "all 0.8s ease-in-out" }}>
              </line>
              {/* Arrow along top tube */}
              <line x1="245" y1="46" x2="370" y2="46"
                stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#bib-arrow-blue)" />
              {/* Arrow down to patient */}
              <line x1="396" y1="55" x2="396" y2="95"
                stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#bib-arrow-blue)" />

              {/* Animated dots along path */}
              <circle r="3" fill="hsl(var(--primary))">
                <animateMotion dur="1.5s" repeatCount="indefinite"
                  path="M240,200 L240,55 L396,55 L396,100" />
              </circle>
              <circle r="3" fill="hsl(var(--primary))" opacity="0.5">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"
                  path="M240,200 L240,55 L396,55 L396,100" />
              </circle>
            </>
          ) : (
            <>
              {/* Expiration: gas flows from patient → bellows (bellows rise) */}
              {/* Arrow from patient up */}
              <line x1="404" y1="95" x2="404" y2="55"
                stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#bib-arrow-green)" />
              {/* Arrow along tube back */}
              <line x1="390" y1="54" x2="245" y2="54"
                stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#bib-arrow-green)" />
              {/* Arrow down into bellows */}
              <line x1="240" y1="55" x2="240" y2={bellowsTop + 10}
                stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#bib-arrow-green)"
                style={{ transition: "all 0.8s ease-in-out" }} />

              {/* Animated dots */}
              <circle r="3" fill="hsl(var(--clinical))">
                <animateMotion dur="1.5s" repeatCount="indefinite"
                  path="M404,100 L404,54 L240,54 L240,105" />
              </circle>
              <circle r="3" fill="hsl(var(--clinical))" opacity="0.5">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"
                  path="M404,100 L404,54 L240,54 L240,105" />
              </circle>

              {/* Some exhaled gas exits via APL */}
              <line x1="465" y1="105" x2="465" y2="135"
                stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#bib-arrow-red)" />
              <text x="465" y="148" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif">Exhaust</text>

              {/* Driving gas exits during expiration */}
              <line x1="130" y1="195" x2="80" y2="195"
                stroke="hsl(var(--accent))" strokeWidth="1.5" markerEnd="url(#bib-arrow-orange)" opacity="0.5">
              </line>
            </>
          )}

          {/* ===== EXPLANATION BOX ===== */}
          <rect x="20" y="310" width="480" height="100" rx="8" fill="hsl(var(--secondary))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x="20" y="310" width="480" height="100" rx="8" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

          {isInsp ? (
            <>
              <text x="260" y="332" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--primary))" fontFamily="Inter, sans-serif">
                INSPIRATION
              </text>
              <text x="260" y="350" textAnchor="middle" fontSize="9.5" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
                Driving gas enters the sealed chamber, compressing the bellows.
              </text>
              <text x="260" y="365" textAnchor="middle" fontSize="9.5" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
                Patient gas inside the bellows is pushed up and delivered to the patient.
              </text>
              <text x="260" y="380" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">
                The bellows descend (are compressed). VT determined by bellows excursion.
              </text>
              <text x="260" y="395" textAnchor="middle" fontSize="9" fill="hsl(var(--accent))" fontFamily="Inter, sans-serif">
                Driving gas (orange) fills the space around the bellows.
              </text>
            </>
          ) : (
            <>
              <text x="260" y="332" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--clinical))" fontFamily="Inter, sans-serif">
                EXPIRATION
              </text>
              <text x="260" y="350" textAnchor="middle" fontSize="9.5" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
                Driving gas supply stops. Exhaled gas from the patient refills the bellows.
              </text>
              <text x="260" y="365" textAnchor="middle" fontSize="9.5" fill="hsl(var(--foreground))" fontFamily="Inter, sans-serif">
                The bellows ASCEND (rise) as they refill — visible confirmation of gas return.
              </text>
              <text x="260" y="380" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))" fontFamily="Inter, sans-serif">
                Excess gas exits via the APL valve. FGF also enters the bellows.
              </text>
              <text x="260" y="395" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">
                If disconnected, bellows fail to rise → immediate visual alarm (safety feature).
              </text>
            </>
          )}

          {/* Legend */}
          <g transform="translate(20, 55)">
            <rect x="0" y="0" width="100" height="62" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <circle cx="12" cy="14" r="4" fill="hsl(var(--primary))" />
            <text x="22" y="17" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">Patient gas (insp)</text>
            <circle cx="12" cy="30" r="4" fill="hsl(var(--clinical))" />
            <text x="22" y="33" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">Patient gas (exp)</text>
            <circle cx="12" cy="46" r="4" fill="hsl(var(--accent))" />
            <text x="22" y="49" fontSize="8" fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">Driving gas</text>
          </g>
        </svg>
      </div>
    </div>
    </DiagramFigure>
  );
};

export default BagInBottleDiagram;
