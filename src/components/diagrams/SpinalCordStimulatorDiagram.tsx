import { DiagramFigure } from "./_shared/DiagramFigure";
/**
 * SpinalCordStimulatorDiagram
 * Annotated sagittal/posterior schematic of a spinal cord stimulator system:
 * IPG (battery), tunnelled extension wires, percutaneous epidural lead with
 * 8-contact array sitting in the dorsal epidural space at T8–T10, and a
 * cross-sectional inset showing lead position relative to dorsal columns.
 */
export function SpinalCordStimulatorDiagram() {
  return (
    <figure className="m-0 my-4">
      <div className="rounded-md border border-border bg-card p-3">
        <svg
          viewBox="0 0 720 380"
          role="img"
          aria-label="Spinal cord stimulator diagram showing implanted pulse generator in the buttock, tunnelled lead, and percutaneous epidural electrode array overlying the dorsal columns at the lower thoracic spine"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="scs-body" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(28 50% 88%)" />
              <stop offset="100%" stopColor="hsl(22 45% 72%)" />
            </linearGradient>
            <linearGradient id="scs-vert" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 0% 96%)" />
              <stop offset="100%" stopColor="hsl(30 20% 78%)" />
            </linearGradient>
            <linearGradient id="scs-lead" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(220 10% 30%)" />
              <stop offset="100%" stopColor="hsl(220 10% 12%)" />
            </linearGradient>
            <radialGradient id="scs-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
            </radialGradient>
          </defs>

          {/* ===== LEFT: posterior view of torso ===== */}
          {/* Body silhouette */}
          <path
            d="M 90 30 Q 60 30 60 70 L 70 200 Q 75 270 95 320 L 130 360 L 230 360 L 265 320 Q 285 270 290 200 L 300 70 Q 300 30 270 30 Z"
            fill="url(#scs-body)"
            stroke="hsl(20 40% 45%)"
            strokeWidth="1.5"
          />
          {/* Spine label band */}
          <text x="180" y="22" textAnchor="middle" fontSize="11"
            fill="hsl(var(--foreground))" fontWeight="600">
            Posterior view
          </text>

          {/* Vertebral column — stack of vertebrae */}
          {Array.from({ length: 18 }).map((_, i) => {
            const y = 50 + i * 14;
            const isThoracic = i >= 4 && i <= 12;
            return (
              <g key={i}>
                <rect
                  x="170" y={y} width="20" height="11" rx="2"
                  fill="url(#scs-vert)"
                  stroke="hsl(30 25% 45%)" strokeWidth="0.5"
                />
                {/* spinous process tips */}
                <path d={`M 180 ${y + 11} l -3 4 l 6 0 z`}
                  fill="hsl(30 25% 60%)" stroke="hsl(30 25% 40%)" strokeWidth="0.5" />
                {isThoracic && (
                  <text x="196" y={y + 8} fontSize="7" fill="hsl(var(--muted-foreground))">
                    T{i - 3}
                  </text>
                )}
              </g>
            );
          })}

          {/* Epidural lead inside spinal canal — 8 contacts at T8–T10 (rows 8-12) */}
          {(() => {
            const leadX = 180;
            const top = 50 + 6 * 14 - 4;     // ~T3 entry
            const bot = 50 + 13 * 14;        // ~T10 distal
            return (
              <g>
                {/* lead body */}
                <line x1={leadX} y1={top} x2={leadX} y2={bot}
                  stroke="url(#scs-lead)" strokeWidth="3" strokeLinecap="round" />
                {/* 8 cylindrical contacts */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const cy = bot - i * 7 - 4;
                  return (
                        <rect key={i} x={leadX - 2.4} y={cy} width="4.8" height="4" rx="1"
                      fill="hsl(45 90% 60%)" stroke="hsl(45 70% 35%)" strokeWidth="0.5">
                      <animate attributeName="opacity"
                        values="1;0.4;1" dur="1.6s" begin={`${i * 0.08}s`} repeatCount="indefinite" />
                    </rect>
  );
                })}
                {/* paraesthesia/stimulation halo */}
                <circle cx={leadX} cy={bot - 14} r="20" fill="url(#scs-pulse)">
                  <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })()}

          {/* Tuohy entry & needle puncture site (T12/L1) */}
          <path d="M 210 252 L 230 240" stroke="hsl(220 10% 25%)" strokeWidth="2" />
          <text x="232" y="237" fontSize="9" fill="hsl(var(--muted-foreground))">
            Tuohy entry (T12/L1, paramedian)
          </text>

          {/* Tunnelled extension wire — from lead anchor down/out to buttock IPG */}
          <path
            d="M 180 268 Q 210 285 250 305 Q 270 318 252 340"
            fill="none" stroke="url(#scs-lead)" strokeWidth="2" strokeLinecap="round"
            strokeDasharray="0"
          />
          {/* Anchor at fascia */}
          <rect x="174" y="266" width="12" height="6" rx="1.5"
            fill="hsl(0 0% 60%)" stroke="hsl(0 0% 30%)" strokeWidth="0.5" />
          <text x="120" y="275" fontSize="9" fill="hsl(var(--muted-foreground))">anchor (supraspinous fascia)</text>

          {/* IPG in upper buttock pocket */}
          <g transform="translate(238, 332)">
            <rect x="0" y="0" width="36" height="22" rx="6"
              fill="hsl(220 12% 28%)" stroke="hsl(220 12% 12%)" strokeWidth="1" />
            <rect x="3" y="3" width="30" height="6" rx="1.5" fill="hsl(220 12% 45%)" />
            <circle cx="29" cy="16" r="2.4" fill="hsl(120 60% 55%)">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
          <text x="282" y="346" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">
            IPG
          </text>
          <text x="282" y="357" fontSize="8" fill="hsl(var(--muted-foreground))">
            (battery / pulse generator)
          </text>

          {/* External patient programmer with telemetry */}
          <g transform="translate(40, 300)">
            <rect x="0" y="0" width="40" height="24" rx="3"
              fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
            <rect x="3" y="3" width="34" height="12" rx="1" fill="hsl(220 30% 92%)" />
            <text x="20" y="11" fontSize="6" textAnchor="middle"
              fill="hsl(220 50% 30%)">PROG</text>
            <circle cx="11" cy="20" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="20" cy="20" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="29" cy="20" r="1.5" fill="hsl(var(--primary))" />
          </g>
          {/* Telemetry arc */}
          <path d="M 90 312 Q 160 270 235 340"
            fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1"
            strokeDasharray="3 3" />
          <text x="46" y="334" fontSize="8" fill="hsl(var(--muted-foreground))">
            patient programmer
          </text>

          {/* ===== RIGHT: cross-section inset ===== */}
          <g transform="translate(380, 30)">
            <text x="160" y="-6" textAnchor="middle" fontSize="11"
              fill="hsl(var(--foreground))" fontWeight="600">
              Axial section — lead in dorsal epidural space
            </text>

            {/* outer body ring */}
            <circle cx="160" cy="160" r="150"
              fill="hsl(28 45% 90%)" stroke="hsl(20 40% 50%)" strokeWidth="1" />

            {/* Vertebral body (anterior) */}
            <path d="M 90 220 Q 160 250 230 220 L 230 170 Q 160 145 90 170 Z"
              fill="url(#scs-vert)" stroke="hsl(30 25% 45%)" strokeWidth="1" />
            <text x="160" y="210" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
              vertebral body
            </text>

            {/* Pedicles */}
            <rect x="92" y="120" width="20" height="40" rx="3"
              fill="url(#scs-vert)" stroke="hsl(30 25% 45%)" />
            <rect x="208" y="120" width="20" height="40" rx="3"
              fill="url(#scs-vert)" stroke="hsl(30 25% 45%)" />

            {/* Laminae meeting posteriorly + spinous process */}
            <path d="M 112 120 Q 160 80 208 120" fill="url(#scs-vert)" stroke="hsl(30 25% 45%)" />
            <path d="M 150 88 L 170 88 L 168 60 L 152 60 Z"
              fill="url(#scs-vert)" stroke="hsl(30 25% 45%)" />
            <text x="200" y="78" fontSize="9" fill="hsl(var(--muted-foreground))">spinous process</text>

            {/* Spinal canal contents */}
            {/* Dura */}
            <ellipse cx="160" cy="150" rx="42" ry="36"
              fill="hsl(var(--muted))" stroke="hsl(220 15% 40%)" strokeWidth="1" />
            <text x="118" y="180" fontSize="8" fill="hsl(var(--muted-foreground))">dura</text>

            {/* CSF */}
            <ellipse cx="160" cy="152" rx="34" ry="30"
              fill="hsl(200 70% 88%)" stroke="hsl(200 50% 60%)" strokeWidth="0.75" />

            {/* Spinal cord with butterfly grey matter */}
            <ellipse cx="160" cy="156" rx="22" ry="18"
              fill="hsl(0 0% 92%)" stroke="hsl(0 0% 50%)" strokeWidth="0.75" />
            <path
              d="M 160 142 Q 152 150 154 162 Q 158 170 160 168 Q 162 170 166 162 Q 168 150 160 142 Z
                 M 145 152 Q 152 156 152 160 Q 145 162 142 158 Z
                 M 175 152 Q 168 156 168 160 Q 175 162 178 158 Z"
              fill="hsl(280 25% 65% / 0.55)" stroke="hsl(280 25% 40%)" strokeWidth="0.5"
            />
            {/* Dorsal columns highlighted */}
            <ellipse cx="160" cy="146" rx="9" ry="3.5"
              fill="hsl(var(--primary) / 0.45)" stroke="hsl(var(--primary))" strokeWidth="0.75" />
            <text x="180" y="142" fontSize="8" fill="hsl(var(--primary))" fontWeight="600">
              dorsal columns
            </text>

            {/* Epidural lead sitting POSTERIOR (top) in epidural space */}
            <g>
              <ellipse cx="160" cy="118" rx="6" ry="3.5"
                fill="hsl(220 10% 18%)" stroke="hsl(45 90% 55%)" strokeWidth="1" />
              {/* radiating stim field */}
              <path d="M 160 118 Q 154 130 158 144" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="0.75" strokeDasharray="2 2" />
              <path d="M 160 118 Q 166 130 162 144" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="0.75" strokeDasharray="2 2" />
              <text x="100" y="112" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">
                epidural lead
              </text>
              <text x="60" y="123" fontSize="8" fill="hsl(var(--muted-foreground))">
                dorsal epidural space
              </text>
            </g>

            {/* Nerve roots exiting */}
            <path d="M 132 158 Q 110 168 90 175" stroke="hsl(50 80% 45%)" strokeWidth="1.5" fill="none" />
            <path d="M 188 158 Q 210 168 230 175" stroke="hsl(50 80% 45%)" strokeWidth="1.5" fill="none" />
            <text x="60" y="190" fontSize="8" fill="hsl(var(--muted-foreground))">nerve root</text>
          </g>

          {/* legend strip bottom */}
          <g transform="translate(10, 365)">
            <text x="0" y="0" fontSize="9" fill="hsl(var(--muted-foreground))">
              Lead tip target T8–T10 for low back / leg pain · cervical C2–C4 for upper limb · paraesthesia or sub-perception (10 kHz / burst) modes
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="text-[11px] text-muted-foreground mt-1 leading-snug">
        Spinal cord stimulator: percutaneous 8-contact epidural lead introduced via Tuohy needle at T12/L1
        (paramedian, loss-of-resistance to saline) and advanced cephalad to lie in the dorsal epidural space
        overlying the dorsal columns. The lead is anchored to supraspinous fascia, tunnelled subcutaneously
        and connected to an implantable pulse generator (IPG) in an upper-buttock or flank pocket. The
        patient programmer controls the IPG by transcutaneous telemetry.
      </figcaption>
    </figure>
  );
}

export default SpinalCordStimulatorDiagram;
