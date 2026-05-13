import { DiagramFigure } from "./_shared/DiagramFigure";
/**
 * Annotated schematic of the Bonfils retromolar rigid intubation fibrescope.
 * Pure SVG, themed with semantic tokens.
 */
const BonfilsDeviceDiagram = () => {
  return (
    <DiagramFigure
      id="bonfils-device-diagram"
      title="Bonfils device"
      description="Auto-generated wrapper for the Bonfils device anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <figure className="m-0">
        <div className="rounded-md border border-border bg-card p-3">
          <svg
            viewBox="0 0 640 280"
            role="img"
            aria-label="Labelled diagram of the Bonfils rigid fibrescope showing eyepiece, battery handle, oxygen side-port, rigid stainless-steel shaft, pre-loaded ETT and fixed 40 degree distal curve"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="bf-shaft" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.85" />
                <stop offset="0.5" stopColor="hsl(var(--foreground))" stopOpacity="0.55" />
                <stop offset="1" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="bf-ett" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0.10" />
              </linearGradient>
              <marker id="bf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
  
            {/* Battery handle */}
            <rect x="40" y="110" width="70" height="60" rx="6"
              fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
            <text x="75" y="195" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
              Battery handle
            </text>
            <text x="75" y="207" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
              (LED light source)
            </text>
  
            {/* Eyepiece / camera port */}
            <circle cx="120" cy="80" r="22" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
            <circle cx="120" cy="80" r="10" fill="hsl(var(--primary))" opacity="0.35" />
            <line x1="120" y1="100" x2="120" y2="120" stroke="hsl(var(--border))" strokeWidth="2" />
            <text x="120" y="55" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
              Eyepiece / camera port
            </text>
  
            {/* O2 side-port */}
            <path d="M110 130 q-30 0 -45 -25" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
            <circle cx="65" cy="105" r="6" fill="hsl(var(--accent))" />
            <text x="20" y="92" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">O₂ side-port</text>
            <text x="20" y="104" fontSize="9" fill="hsl(var(--muted-foreground))">2–6 L·min⁻¹</text>
            <text x="20" y="115" fontSize="9" fill="hsl(var(--muted-foreground))">defogs lens,</text>
            <text x="20" y="126" fontSize="9" fill="hsl(var(--muted-foreground))">apnoeic O₂</text>
  
            {/* Rigid shaft (straight section) */}
            <rect x="110" y="135" width="380" height="14" rx="3" fill="url(#bf-shaft)" stroke="hsl(var(--border))" />
  
            {/* ETT pre-loaded over shaft */}
            <path d="M170 128 L470 128 Q495 128 500 142 L500 156 Q495 170 470 170 L170 170 Z"
              fill="url(#bf-ett)" stroke="hsl(var(--primary))" strokeOpacity="0.6" />
            {/* Cuff */}
            <ellipse cx="478" cy="149" rx="14" ry="9" fill="hsl(var(--primary))" opacity="0.35" stroke="hsl(var(--primary))" strokeOpacity="0.6" />
  
            {/* Distal 40° curve */}
            <path d="M490 142 Q545 142 565 178 Q575 198 562 215"
              fill="none" stroke="url(#bf-shaft)" strokeWidth="3" strokeLinecap="round" />
            {/* Distal tip light */}
            <circle cx="562" cy="215" r="5" fill="hsl(var(--accent))" />
            <circle cx="562" cy="215" r="9" fill="hsl(var(--accent))" opacity="0.25" />
  
            {/* 40° angle indicator */}
            <path d="M540 142 A30 30 0 0 1 558 178" fill="none"
              stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
            <text x="582" y="172" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">40° fixed curve</text>
            <text x="582" y="184" fontSize="9" fill="hsl(var(--muted-foreground))">non-adjustable</text>
  
            {/* Labels with arrows */}
            <line x1="300" y1="100" x2="300" y2="133" stroke="hsl(var(--muted-foreground))"
              markerEnd="url(#bf-arrow)" />
            <text x="300" y="92" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
              Pre-loaded ETT
            </text>
            <text x="300" y="80" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
              railroaded over shaft once cords visualised
            </text>
  
            <line x1="380" y1="190" x2="380" y2="152" stroke="hsl(var(--muted-foreground))"
              markerEnd="url(#bf-arrow)" />
            <text x="380" y="205" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
              Rigid stainless-steel shaft
            </text>
            <text x="380" y="218" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
              fibreoptic bundle inside · resists pharyngeal collapse
            </text>
  
            <line x1="478" y1="250" x2="478" y2="162" stroke="hsl(var(--muted-foreground))"
              markerEnd="url(#bf-arrow)" />
            <text x="478" y="263" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))">
              ETT cuff
            </text>
  
            <line x1="562" y1="245" x2="562" y2="225" stroke="hsl(var(--muted-foreground))"
              markerEnd="url(#bf-arrow)" />
            <text x="562" y="258" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))">
              Distal tip + light
            </text>
          </svg>
        </div>
        <figcaption className="text-[11px] text-muted-foreground mt-1 leading-snug">
          Bonfils fibrescope schematic: proximal eyepiece/camera port, battery handle (LED light source),
          O₂ side-port for lens defog and apnoeic oxygenation, rigid stainless-steel shaft with internal
          fibreoptic bundle, pre-loaded ETT, and a fixed 40° distal curve carrying the illumination tip.
        </figcaption>
      </figure>
    </DiagramFigure>
  );
};

export default BonfilsDeviceDiagram;
