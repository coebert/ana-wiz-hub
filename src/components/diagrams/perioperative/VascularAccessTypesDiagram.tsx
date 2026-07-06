import React from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Detailed anatomical schematics of the five archetypal vascular access
 * devices. Each plate shows realistic surface anatomy, the venous/arterial
 * tree relevant to insertion, the catheter course and tip position, and
 * is fully annotated with bony, vascular and device landmarks.
 *
 * Read alongside the dwell-time / site evidence (Rickard 2012, epic3,
 * 3SITES, Maki 2006) summarised in the Vascular Access Devices topic.
 */

interface PlateProps {
  title: string;
  dwell: string;
  evidence: string;
  children: React.ReactNode;
}

const Plate: React.FC<PlateProps> = ({ title, dwell, evidence, children }) => (
  <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
    <div className="px-3 py-2 border-b border-border bg-muted/40">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">
        <span className="font-medium text-foreground">Dwell:</span> {dwell}
      </p>
      <p className="text-[11px] text-muted-foreground italic mt-0.5">
        {evidence}
      </p>
    </div>
    <div className="p-2 flex-1">{children}</div>
  </div>
);

// ─── Shared palette ───────────────────────────────────────────────────
const SkinFill = "hsl(28 45% 90%)";
const SkinShade = "hsl(22 35% 78%)";
const SkinEdge = "hsl(22 30% 55%)";
const Bone = "hsl(45 30% 82%)";
const BoneEdge = "hsl(38 25% 55%)";
const Muscle = "hsl(0 25% 62%)";
const VeinFill = "hsl(220 65% 42%)";
const VeinLight = "hsl(220 60% 60%)";
const ArteryFill = "hsl(0 70% 48%)";
const ArteryLight = "hsl(0 65% 65%)";
const Catheter = "hsl(45 30% 96%)";
const CatheterEdge = "hsl(35 20% 55%)";
const FgEdge = "hsl(var(--foreground))";
const MutedFg = "hsl(var(--muted-foreground))";

const labelStyle: React.CSSProperties = {
  fontSize: 8.5,
  fill: "hsl(var(--foreground))",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
};

const tinyLabel: React.CSSProperties = {
  fontSize: 7.5,
  fill: "hsl(var(--muted-foreground))",
  fontStyle: "italic",
};

const leader = (
  x1: number, y1: number, x2: number, y2: number, dashed = false,
) => (
  <line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={MutedFg}
    strokeWidth={0.5}
    strokeDasharray={dashed ? "2 1.5" : undefined}
  />
);

// SVG defs shared across plates
const SharedDefs: React.FC = () => (
  <defs>
    <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={SkinFill} />
      <stop offset="100%" stopColor={SkinShade} />
    </linearGradient>
    <linearGradient id="veinGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={VeinFill} />
      <stop offset="50%" stopColor={VeinLight} />
      <stop offset="100%" stopColor={VeinFill} />
    </linearGradient>
    <linearGradient id="arteryGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={ArteryFill} />
      <stop offset="50%" stopColor={ArteryLight} />
      <stop offset="100%" stopColor={ArteryFill} />
    </linearGradient>
    <radialGradient id="heartGrad" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0%" stopColor="hsl(0 55% 70%)" />
      <stop offset="100%" stopColor="hsl(0 55% 42%)" />
    </radialGradient>
    <radialGradient id="portGrad" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0%" stopColor="hsl(210 25% 70%)" />
      <stop offset="100%" stopColor="hsl(210 30% 38%)" />
    </radialGradient>
    <linearGradient id="catheterGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(40 25% 98%)" />
      <stop offset="100%" stopColor="hsl(35 20% 82%)" />
    </linearGradient>
  </defs>
);

// ─── 1. Peripheral cannula in dorsum of hand ──────────────────────────
const PeripheralCannula: React.FC = () => (
  <svg viewBox="0 0 280 220" role="img"
       aria-label="20G peripheral cannula in dorsal venous network of hand"
       className="w-full h-auto">
    <SharedDefs />

    {/* Forearm — tapering distally with ulnar styloid bulge */}
    <path d="M0,200 C5,180 8,160 12,148 C20,140 35,134 50,130
             C58,128 64,128 70,130 L70,205 L0,205 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Wrist crease */}
    <path d="M50,131 C58,134 64,135 70,134" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.7}/>
    <path d="M52,138 C60,141 66,142 70,141" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.55}/>
    {/* Ulnar styloid prominence */}
    <ellipse cx={58} cy={132} rx={5} ry={3} fill={SkinShade} opacity={0.5}/>

    {/* Hand — dorsal view, anatomically tapered */}
    <path d="
      M70,130
      C82,128 96,124 108,120
      C118,118 126,116 132,114
      L134,68  C134,60 140,57 144,62 L146,108
      L152,55  C153,47 161,47 162,55 L160,106
      L171,53  C172,45 180,46 180,54 L172,108
      L188,62  C190,55 197,56 196,63 L184,114
      C200,118 215,124 228,134
      C244,148 248,170 240,190
      C234,202 222,210 208,210
      L70,210 Z"
      fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1} strokeLinejoin="round"
    />
    {/* Thumb (radial side, abducted) */}
    <path d="M70,142 C58,144 50,150 46,160 C44,168 48,176 56,178
             C66,178 74,170 78,158 L72,150 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Thenar eminence */}
    <ellipse cx={75} cy={165} rx={9} ry={6} fill={SkinShade} opacity={0.35}/>
    {/* Knuckles (MCP joint creases) */}
    {[
      [144, 116], [158, 113], [173, 114], [188, 118]
    ].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={4.5} ry={2} fill={SkinShade} opacity={0.55}/>
    ))}
    {/* PIP creases on extended fingers */}
    {[[143, 90],[157, 82],[172, 80],[188, 88]].map(([x,y],i)=>(
      <ellipse key={`p-${i}`} cx={x} cy={y} rx={3.2} ry={1.2} fill={SkinShade} opacity={0.45}/>
    ))}
    {/* Finger nails */}
    {[[143, 60],[157, 50],[172, 48],[188, 58]].map(([x,y],i)=>(
      <ellipse key={`n-${i}`} cx={x} cy={y} rx={2.4} ry={2.8} fill="hsl(28 35% 86%)" stroke={SkinEdge} strokeWidth={0.5} opacity={0.85}/>
    ))}
    {/* Extensor tendon shading on dorsum */}
    {[[100,165,140,118],[112,170,156,116],[124,172,170,118],[140,170,186,122]].map(([x1,y1,x2,y2],i)=>(
      <line key={`et-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={SkinShade} strokeWidth={1} opacity={0.35} strokeLinecap="round"/>
    ))}
    {/* Metacarpal shadow */}
    <ellipse cx={140} cy={170} rx={55} ry={20} fill={SkinShade} opacity={0.18}/>

    {/* Dorsal venous network — superficial veins */}
    {/* Cephalic-leading metacarpal */}
    <path d="M210,205 C200,180 185,155 170,135 L165,115"
          stroke="url(#veinGrad)" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.85}/>
    {/* Dorsal metacarpal vein (target) */}
    <path d="M85,205 C95,175 110,150 130,130 L140,112"
          stroke="url(#veinGrad)" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9}/>
    {/* Connecting arch */}
    <path d="M130,130 C150,128 165,128 170,135"
          stroke="url(#veinGrad)" strokeWidth={3} fill="none" opacity={0.8}/>
    {/* Smaller branches */}
    <path d="M120,160 C130,150 140,140 150,128" stroke={VeinLight} strokeWidth={1.5} fill="none" opacity={0.7}/>
    <path d="M155,200 C155,180 160,160 165,140" stroke={VeinLight} strokeWidth={1.5} fill="none" opacity={0.7}/>

    {/* Cannula assembly */}
    {/* Wings (taped) */}
    <path d="M88,158 L82,150 L82,166 Z" fill="hsl(200 60% 70%)" stroke={CatheterEdge} strokeWidth={0.5}/>
    <path d="M88,158 L94,150 L94,166 Z" fill="hsl(200 60% 70%)" stroke={CatheterEdge} strokeWidth={0.5}/>
    {/* Hub — colour coded pink (20G) */}
    <rect x="92" y="153" width="34" height="10" rx="2.5"
          fill="hsl(335 70% 65%)" stroke={CatheterEdge} strokeWidth={0.5}/>
    <rect x="92" y="153" width="34" height="3" rx="1" fill="hsl(335 70% 78%)" />
    {/* Injection port (cap) */}
    <circle cx="115" cy="148" r="3" fill="hsl(335 70% 55%)" stroke={CatheterEdge} strokeWidth={0.5}/>
    {/* Flashback chamber */}
    <rect x="124" y="156" width="6" height="4" rx="1" fill="hsl(0 60% 55%)" opacity={0.7}/>
    {/* Catheter — entering vein */}
    <line x1="126" y1="158" x2="148" y2="138" stroke={Catheter} strokeWidth={3} strokeLinecap="round" />
    <line x1="126" y1="158" x2="148" y2="138" stroke={CatheterEdge} strokeWidth={0.5} strokeLinecap="round" />
    {/* Tip inside vein (slightly darker) */}
    <circle cx="148" cy="138" r="1.8" fill={FgEdge} />

    {/* Transparent dressing outline */}
    <rect x="78" y="138" width="60" height="42" rx="3"
          fill="hsl(200 30% 90%)" opacity={0.18}
          stroke={MutedFg} strokeWidth={0.5} strokeDasharray="2 1.5"/>

    {/* Labels */}
    <text x="86" y="135" textAnchor="end" {...labelStyle as object}>Pink hub = 20G (≈ 60 mL/min)</text>
    {leader(88, 138, 92, 154)}

    <text x="125" y="195" textAnchor="middle" {...labelStyle as object}>Transparent semi-occlusive dressing</text>
    {leader(108, 182, 115, 192)}

    <text x="240" y="125" textAnchor="end" {...labelStyle as object}>Dorsal metacarpal vv.</text>
    {leader(195, 128, 168, 132)}

    <text x="270" y="160" textAnchor="end" {...labelStyle as object}>Catheter tip in vein</text>
    {leader(218, 156, 152, 140)}

    <text x="20" y="55" {...labelStyle as object}>Hand —</text>
    <text x="20" y="66" {...labelStyle as object}>dorsum (preferred:</text>
    <text x="20" y="77" {...labelStyle as object}>preserves forearm</text>
    <text x="20" y="88" {...labelStyle as object}>for future access)</text>

    <text x="20" y="208" {...tinyLabel as object}>Avoid: AC fossa for &gt;24 h, palmar surface, joints</text>
  </svg>
);

// ─── 2. PICC ──────────────────────────────────────────────────────────
const PICC: React.FC = () => (
  <svg viewBox="0 0 300 260" role="img"
       aria-label="PICC inserted in basilic vein, course to cavoatrial junction"
       className="w-full h-auto">
    <SharedDefs />

    {/* Torso — sloped shoulders, costal margin, waist */}
    <path d="M105,32
             C100,46 96,55 90,62
             C82,68 70,72 62,80
             C52,92 45,108 42,128
             L52,235
             L100,242
             C108,180 110,140 112,100
             L112,62
             C108,52 106,42 105,32 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    <path d="M105,32
             C110,46 114,55 120,62
             C150,66 175,70 195,78
             C210,86 220,100 222,120
             L222,240
             L120,240
             L120,100
             C115,80 110,55 105,32 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Deltoid contour on right shoulder */}
    <path d="M62,80 C58,98 55,118 56,138" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.6}/>
    {/* Pectoral fold */}
    <path d="M118,75 C140,80 165,85 188,92" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.55}/>
    {/* Neck */}
    <path d="M122,10 C124,22 126,28 130,32 L155,32 C159,28 161,22 163,10 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Sternocleidomastoid hint */}
    <path d="M132,12 C134,22 138,28 142,32" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.55}/>
    {/* Right arm (viewer's left), abducted — shoulder, biceps, antecubital, forearm */}
    <path d="M62,80
             C50,90 38,108 30,130
             C24,160 22,200 28,238
             L60,240
             C58,212 60,180 65,155
             C68,140 72,118 78,102 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Antecubital crease */}
    <path d="M30,168 C40,170 48,170 56,167" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.6}/>
    {/* Biceps shading */}
    <ellipse cx={48} cy={140} rx={10} ry={18} fill={SkinShade} opacity={0.25}/>

    {/* Clavicles — terminate at AC joint over deltoid (matches CVC/tunnelled/port plates) */}
    <path d="M85,62 C115,55 138,52 150,52" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    <path d="M150,52 C162,52 185,55 215,62" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    {/* Sternum (manubrium → body) */}
    <rect x="146" y="55" width="8" height="55" rx="3" fill={Bone} stroke={BoneEdge} strokeWidth={0.5}/>
    {/* Ribs — 18 px spacing, span 100→200 (matches CVC/Port plates).
        First rib is one intercostal below the clavicle (y=52) so the cage
        scales proportionally to the other chest plates. */}
    {[100, 118, 136, 154].map((y, i) => (
      <path key={i} d={`M100,${y} Q150,${y + 8} 200,${y}`}
            stroke={BoneEdge} strokeWidth={0.5} fill="none" opacity={0.35}/>
    ))}

    {/* Heart silhouette */}
    <path d="M130,135 C115,135 110,160 130,180 L155,200 L180,180 C195,160 185,135 170,135 C162,135 155,142 150,148 C145,142 138,135 130,135 Z"
          fill="url(#heartGrad)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>

    {/* Venous tree on patient's right */}
    {/* Basilic vein (medial arm) */}
    <path d="M55,235 C58,200 65,170 75,140 C82,115 90,98 105,85"
          stroke="url(#veinGrad)" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.55}/>
    {/* Axillary vein */}
    <path d="M105,85 C115,82 125,80 135,78" stroke="url(#veinGrad)" strokeWidth={3} fill="none" opacity={0.55}/>
    {/* Subclavian — joins at (158,68) */}
    <path d="M135,78 C145,75 152,72 158,68" stroke="url(#veinGrad)" strokeWidth={3} fill="none" opacity={0.55}/>
    {/* Brachiocephalic + SVC — runs from (158,68) to cavoatrial junction (156,142) */}
    <path d="M158,68 C160,90 158,115 156,142" stroke="url(#veinGrad)" strokeWidth={3} fill="none" opacity={0.55}/>

    {/* Cephalic vein (lateral, alternative) */}
    <path d="M30,180 C35,150 50,120 70,100" stroke={VeinLight} strokeWidth={2} fill="none" opacity={0.5}/>

    {/* Brachial artery (deep) */}
    <path d="M58,235 C62,200 70,170 80,140 C88,115 95,98 108,85" stroke={ArteryLight} strokeWidth={2} fill="none" opacity={0.6} strokeDasharray="3 2"/>

    {/* PICC catheter (purple) — basilic → axillary → SCV junction (158,68) → SVC tip (156,142) */}
    <path d="M40,232 C50,225 56,215 60,200 C66,170 75,140 88,118 C98,100 110,88 130,82 C145,78 152,72 158,68 C160,90 158,115 156,142"
          stroke="hsl(280 50% 45%)" strokeWidth={2} fill="none" strokeLinecap="round"/>
    {/* Catheter highlight */}
    <path d="M40,232 C50,225 56,215 60,200 C66,170 75,140 88,118 C98,100 110,88 130,82 C145,78 152,72 158,68 C160,90 158,115 156,142"
          stroke="hsl(280 60% 70%)" strokeWidth={0.75} fill="none" strokeLinecap="round" opacity={0.7}/>
    {/* External hub bifurcation */}
    <rect x="32" y="228" width="14" height="5" rx="1.2" fill="hsl(280 50% 45%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>
    <rect x="32" y="234" width="14" height="5" rx="1.2" fill="hsl(0 60% 50%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>
    {/* Securement device */}
    <rect x="48" y="218" width="20" height="12" rx="1.5" fill="hsl(200 30% 92%)" opacity={0.6}
          stroke={MutedFg} strokeWidth={0.5} strokeDasharray="1.5 1"/>
    {/* Tip marker */}
    <circle cx="156" cy="142" r="2" fill={FgEdge}/>
    <line x1="153" y1="142" x2="159" y2="142" stroke={Catheter} strokeWidth={1}/>

    {/* Ultrasound transducer footprint at insertion */}
    <rect x="46" y="236" width="20" height="3" rx="1" fill="hsl(200 50% 50%)" opacity={0.5}/>

    {/* Labels */}
    <text x="245" y="65" textAnchor="end" {...labelStyle as object}>R subclavian v.</text>
    {leader(195, 68, 162, 70)}

    <text x="245" y="135" textAnchor="end" {...labelStyle as object}>SVC</text>
    {leader(232, 132, 160, 132)}

    <text x="245" y="148" textAnchor="end" {...labelStyle as object}>Tip: cavoatrial junction</text>
    {leader(232, 145, 158, 142)}

    <text x="78" y="200" textAnchor="end" {...labelStyle as object}>Basilic v. (target)</text>
    {leader(80, 203, 70, 175)}

    <text x="20" y="155" {...labelStyle as object}>Cephalic v.</text>
    {leader(20, 158, 35, 165)}

    <text x="20" y="245" {...labelStyle as object}>US-guided</text>
    <text x="20" y="256" {...labelStyle as object}>insertion above AC</text>
    {leader(48, 248, 56, 232)}

    <text x="245" y="220" textAnchor="end" {...labelStyle as object}>4–6 Fr, single/double</text>
    <text x="245" y="231" textAnchor="end" {...labelStyle as object}>lumen, weeks–months</text>
  </svg>
);

// ─── 3. Non-tunnelled CVC ─────────────────────────────────────────────
const NonTunnelledCVC: React.FC = () => (
  <svg viewBox="0 0 300 260" role="img"
       aria-label="Triple-lumen non-tunnelled CVC in right internal jugular vein"
       className="w-full h-auto">
    <SharedDefs />

    {/* Head — head-down, turned away (chin up, contralateral rotation as positioned for IJV) */}
    <path d="M118,40 C112,22 130,8 150,8 C172,8 188,22 184,42
             C183,52 180,58 175,62
             L172,68 C170,72 165,74 160,74
             L140,74 C135,74 130,72 128,68
             L125,62 C121,58 119,52 118,40 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Mandible/jawline shading */}
    <path d="M128,60 C140,72 160,72 172,60" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.6}/>
    {/* Ear (right side, exposed by head turn) */}
    <path d="M180,38 C186,38 188,46 184,52 L180,52 Z" fill={SkinShade} stroke={SkinEdge} strokeWidth={0.5} opacity={0.85}/>
    {/* Neck — extended */}
    <path d="M132,72 C128,84 126,94 128,104 L172,104 C174,94 172,84 168,72 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Suprasternal notch */}
    <ellipse cx={150} cy={108} rx={5} ry={2.5} fill={SkinShade} opacity={0.55}/>
    {/* Torso — sloped trapezius into shoulders */}
    <path d="M128,104
             C108,108 90,114 78,124
             C70,132 68,142 70,152
             L75,250 L225,250 L230,152
             C232,142 230,132 222,124
             C210,114 192,108 172,104 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Pectoral fold and shoulder slope */}
    <path d="M85,128 C90,138 95,148 102,154" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.55}/>
    <path d="M215,128 C210,138 205,148 198,154" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.55}/>

    {/* Sternocleidomastoid (right side, viewer's left) */}
    <path d="M138,60 C130,75 122,90 118,100 L130,100 C135,88 142,75 145,62 Z"
          fill={Muscle} opacity={0.35} stroke={SkinEdge} strokeWidth={0.5}/>
    {/* Two heads of SCM */}
    <line x1="135" y1="100" x2="142" y2="62" stroke={SkinEdge} strokeWidth={0.5} opacity={0.5}/>

    {/* Clavicles */}
    <path d="M85,118 C115,112 145,108 155,108" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    <path d="M155,108 C170,108 195,112 215,118" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    {/* Sternum */}
    <rect x="146" y="115" width="8" height="50" rx="3" fill={Bone} stroke={BoneEdge} strokeWidth={0.5}/>
    {/* Ribs — 18 px intercostal spacing, span 100→200 (shared scale) */}
    {[130, 148, 166, 184].map((y, i) => (
      <path key={i} d={`M100,${y} Q150,${y + 8} 200,${y}`}
            stroke={BoneEdge} strokeWidth={0.5} fill="none" opacity={0.35}/>
    ))}

    {/* Carotid (deep, dashed) */}
    <path d="M135,60 L132,100 L138,118" stroke="url(#arteryGrad)" strokeWidth={3} fill="none" strokeDasharray="3 2" opacity={0.85}/>

    {/* Right IJV — running lateral to carotid in carotid sheath */}
    <path d="M148,60 L146,100 L152,118" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>

    {/* Subclavian + brachiocephalic + SVC */}
    <path d="M152,118 C150,130 148,140 150,150" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>
    <path d="M150,150 L150,200" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>

    {/* Heart */}
    <path d="M135,205 C120,210 115,235 140,250 L165,260 L185,250 C205,235 195,210 175,205 C167,205 160,212 155,218 C150,212 142,205 135,205 Z"
          fill="url(#heartGrad)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>

    {/* Pleural apex (lung) */}
    <path d="M85,118 C90,135 100,155 105,175 L75,175 L75,118 Z" fill="hsl(200 30% 80%)" opacity={0.3}/>
    <path d="M215,118 C210,135 200,155 195,175 L225,175 L225,118 Z" fill="hsl(200 30% 80%)" opacity={0.3}/>

    {/* Catheter — skin entry at apex of SCM triangle, threading IJV (146,100)
        → SCV junction (152,118) → brachiocephalic/SVC (150,150) → tip (150,200) */}
    <path d="M168,90 L146,100 L152,118 L150,150 L150,200"
          stroke={Catheter} strokeWidth={3} fill="none" strokeLinecap="round"/>
    <path d="M168,90 L146,100 L152,118 L150,150 L150,200"
          stroke={CatheterEdge} strokeWidth={0.5} fill="none" strokeLinecap="round"/>
    {/* Tip */}
    <circle cx="150" cy="200" r="2.2" fill={FgEdge}/>

    {/* Skin entry suture wings */}
    <rect x="162" y="86" width="12" height="6" rx="1.5" fill="hsl(0 0% 95%)" stroke={MutedFg} strokeWidth={0.5}/>

    {/* External 3-lumen hub assembly */}
    <rect x="172" y="80" width="22" height="4" rx="1" fill="hsl(0 70% 50%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>
    <text x="183" y="83.2" textAnchor="middle" fontSize={3.5} fill="hsl(var(--background))">D</text>
    <rect x="172" y="74" width="22" height="4" rx="1" fill="hsl(220 70% 50%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>
    <text x="183" y="77.2" textAnchor="middle" fontSize={3.5} fill="hsl(var(--background))">M</text>
    <rect x="172" y="68" width="22" height="4" rx="1" fill="hsl(150 60% 40%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>
    <text x="183" y="71.2" textAnchor="middle" fontSize={3.5} fill="hsl(var(--background))">P</text>

    {/* Transparent dressing */}
    <rect x="155" y="82" width="22" height="22" rx="2" fill="hsl(200 30% 90%)" opacity={0.18}
          stroke={MutedFg} strokeDasharray="1.5 1" strokeWidth={0.5}/>

    {/* Labels */}
    <text x="105" y="78" textAnchor="end" {...labelStyle as object}>SCM (sternocleidomastoid)</text>
    {leader(108, 80, 128, 80)}

    <text x="270" y="68" textAnchor="end" {...labelStyle as object}>Distal · Medial · Proximal</text>
    <text x="270" y="79" textAnchor="end" {...tinyLabel as object}>(D = CVP, vasoactives)</text>
    {leader(220, 73, 196, 75)}

    <text x="270" y="105" textAnchor="end" {...labelStyle as object}>Apex of SCM triangle</text>
    {leader(220, 102, 168, 92)}

    <text x="20" y="92" {...labelStyle as object}>R IJV</text>
    {leader(35, 90, 142, 80)}

    <text x="20" y="105" fill={ArteryFill} fontSize={8.5}>Carotid (avoid)</text>
    {leader(60, 102, 132, 90)}

    <text x="270" y="195" textAnchor="end" {...labelStyle as object}>Tip: lower SVC,</text>
    <text x="270" y="206" textAnchor="end" {...labelStyle as object}>above pericardial</text>
    <text x="270" y="217" textAnchor="end" {...labelStyle as object}>reflection</text>
    {leader(220, 200, 152, 200)}

    <text x="20" y="170" {...tinyLabel as object}>Pleural apex</text>
    {leader(50, 168, 80, 145)}
  </svg>
);

// ─── 4. Tunnelled line (Hickman / Groshong / Permcath) ───────────────
const TunnelledLine: React.FC = () => (
  <svg viewBox="0 0 300 260" role="img"
       aria-label="Tunnelled Hickman line: subcutaneous tunnel with Dacron cuff"
       className="w-full h-auto">
    <SharedDefs />

    {/* Anterior chest — neck base, sloped shoulders, deltoids, costal margin */}
    <path d="M120,30 C122,42 124,50 128,56
             L172,56 C176,50 178,42 180,30
             L182,30 L182,40
             C200,46 218,54 236,68
             C252,82 260,98 262,118
             L262,250 L38,250 L38,118
             C40,98 48,82 64,68
             C82,54 100,46 118,40 L118,30 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    {/* Deltoid contours */}
    <path d="M64,72 C58,90 54,108 56,128" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.55}/>
    <path d="M236,72 C242,90 246,108 244,128" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.55}/>
    {/* Pectoral fold */}
    <path d="M80,100 C120,108 180,108 220,100" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.45}/>
    {/* Suprasternal notch */}
    <ellipse cx={150} cy={58} rx={5} ry={2} fill={SkinShade} opacity={0.55}/>

    {/* Skin "cut-away" window showing subcutaneous tissue + tunnel */}
    <path d="M70,95 C90,80 200,80 220,95 L220,180 C200,195 90,195 70,180 Z"
          fill="hsl(35 50% 78%)" opacity={0.5}
          stroke={SkinEdge} strokeDasharray="3 2" strokeWidth={0.5}/>
    {/* Subcutaneous fat texture (stippled) */}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = 75 + (i * 4.7) % 140;
      const y = 95 + Math.floor((i * 4.7) / 140) * 12 + (i % 2) * 6;
      return <circle key={i} cx={x} cy={y} r={1.2} fill="hsl(45 45% 70%)" opacity={0.7}/>;
    })}

    {/* Clavicles — terminate at AC joint over deltoid (not off-shoulder) */}
    <path d="M78,88 C108,78 138,72 150,72" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    <path d="M150,72 C162,72 192,78 222,88" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    {/* Sternum (manubrium) */}
    <rect x="146" y="74" width="8" height="40" rx="2.5" fill={Bone} stroke={BoneEdge} strokeWidth={0.5}/>

    {/* Subclavian vein (under clavicle) */}
    <path d="M100,90 C140,84 175,78 200,72" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>
    {/* Brachiocephalic + SVC */}
    <path d="M200,72 C202,92 195,116 190,140" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>

    {/* Heart */}
    <path d="M170,150 C155,155 150,180 175,195 L195,205 L215,195 C232,180 220,155 205,150 C198,150 192,158 187,164 C182,158 176,150 170,150 Z"
          fill="url(#heartGrad)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>

    {/* Tunnel — exit site (chest wall) → subcutaneous course → venotomy */}
    {/* Exit site */}
    <circle cx="100" cy="170" r="4" fill="hsl(0 50% 55%)" stroke={FgEdge} strokeOpacity={0.6} strokeWidth={0.5}/>
    <circle cx="100" cy="170" r="1.5" fill="hsl(45 30% 30%)" />
    {/* Subcutaneous tunnel — solid (visible in cut-away) */}
    <path d="M100,170 C120,160 150,130 175,100 L200,72"
          stroke={Catheter} strokeWidth={3} fill="none" strokeLinecap="round"/>
    <path d="M100,170 C120,160 150,130 175,100 L200,72"
          stroke={CatheterEdge} strokeWidth={0.5} fill="none" strokeLinecap="round"/>
    {/* Dacron cuff — tissue ingrowth zone */}
    <g>
      <rect x="135" y="138" width="14" height="7" rx="2"
            fill="hsl(35 30% 55%)" stroke={FgEdge} strokeOpacity={0.6} strokeWidth={0.5}
            transform="rotate(-32 142 141.5)"/>
      {/* Cuff texture lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={137 + i*3} y1={140} x2={140 + i*3} y2={146}
              stroke="hsl(35 30% 35%)" strokeWidth={0.5}
              transform="rotate(-32 142 141.5)"/>
      ))}
    </g>

    {/* Intravascular segment (entering subclavian → SVC) */}
    <path d="M200,72 C202,94 196,116 190,140"
          stroke={Catheter} strokeWidth={3} fill="none"/>
    <path d="M200,72 C202,94 196,116 190,140"
          stroke={CatheterEdge} strokeWidth={0.5} fill="none"/>
    <circle cx="190" cy="140" r="2.2" fill={FgEdge}/>

    {/* External catheter & bifurcated hub */}
    <path d="M100,170 L75,200" stroke={Catheter} strokeWidth={3} fill="none" strokeLinecap="round"/>
    <path d="M100,170 L75,200" stroke={CatheterEdge} strokeWidth={0.5} fill="none" strokeLinecap="round"/>
    {/* Y connector */}
    <path d="M75,200 L60,212 L60,225" stroke={Catheter} strokeWidth={2} fill="none" strokeLinecap="round"/>
    <path d="M75,200 L90,212 L90,225" stroke={Catheter} strokeWidth={2} fill="none" strokeLinecap="round"/>
    {/* Clamps */}
    <rect x="56" y="216" width="8" height="4" rx="1" fill="hsl(0 0% 25%)"/>
    <rect x="86" y="216" width="8" height="4" rx="1" fill="hsl(0 0% 25%)"/>
    {/* Coloured caps */}
    <circle cx="60" cy="228" r="3.5" fill="hsl(0 70% 50%)" stroke={FgEdge} strokeOpacity={0.4}/>
    <circle cx="90" cy="228" r="3.5" fill="hsl(220 65% 50%)" stroke={FgEdge} strokeOpacity={0.4}/>

    {/* Skin layer indicator on cut-away */}
    <line x1="70" y1="95" x2="220" y2="95" stroke={SkinEdge} strokeWidth={0.5}/>
    <text x="68" y="93" textAnchor="end" {...tinyLabel as object}>Skin</text>
    <text x="68" y="115" textAnchor="end" {...tinyLabel as object}>Subcutis</text>

    {/* Labels */}
    <text x="280" y="58" textAnchor="end" {...labelStyle as object}>Venotomy: subclavian v.</text>
    {leader(225, 62, 196, 72)}

    <text x="280" y="95" textAnchor="end" {...labelStyle as object}>Intravascular segment</text>
    {leader(225, 100, 195, 100)}

    <text x="280" y="140" textAnchor="end" {...labelStyle as object}>Tip: cavoatrial</text>
    <text x="280" y="151" textAnchor="end" {...labelStyle as object}>junction</text>
    {leader(232, 142, 192, 140)}

    <text x="20" y="135" {...labelStyle as object}>Dacron cuff</text>
    <text x="20" y="146" {...tinyLabel as object}>(fibroblast ingrowth →</text>
    <text x="20" y="156" {...tinyLabel as object}>infection barrier &amp; anchor)</text>
    {leader(60, 138, 138, 142)}

    <text x="20" y="175" {...labelStyle as object}>Skin exit site</text>
    {leader(60, 172, 96, 170)}

    <text x="20" y="245" {...labelStyle as object}>Bifurcated hub +</text>
    <text x="20" y="256" {...labelStyle as object}>clamps + caps</text>
    {leader(75, 240, 75, 218)}
  </svg>
);

// ─── 5. Implanted port (Portacath) ────────────────────────────────────
const Portacath: React.FC = () => (
  <svg viewBox="0 0 300 260" role="img"
       aria-label="Implanted subcutaneous port with non-coring Huber needle"
       className="w-full h-auto">
    <SharedDefs />

    {/* Anterior chest — neck base, sloped shoulders, deltoids, costal margin */}
    <path d="M120,30 C122,42 124,50 128,56
             L172,56 C176,50 178,42 180,30
             L182,30 L182,40
             C200,46 218,54 236,68
             C252,82 260,98 262,118
             L262,250 L38,250 L38,118
             C40,98 48,82 64,68
             C82,54 100,46 118,40 L118,30 Z"
          fill="url(#skinGrad)" stroke={SkinEdge} strokeWidth={1}/>
    <path d="M64,72 C58,90 54,108 56,128" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.55}/>
    <path d="M236,72 C242,90 246,108 244,128" stroke={SkinShade} strokeWidth={0.75} fill="none" opacity={0.55}/>
    <path d="M80,100 C120,108 180,108 220,100" stroke={SkinShade} strokeWidth={0.5} fill="none" opacity={0.45}/>
    <ellipse cx={150} cy={58} rx={5} ry={2} fill={SkinShade} opacity={0.55}/>

    {/* Cut-away showing subcutaneous pocket */}
    <ellipse cx="100" cy="140" rx="55" ry="38" fill="hsl(35 50% 78%)" opacity={0.5}
             stroke={SkinEdge} strokeDasharray="3 2" strokeWidth={0.5}/>

    {/* Clavicles — terminate at AC joint over deltoid */}
    <path d="M78,88 C108,78 138,72 150,72" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    <path d="M150,72 C162,72 192,78 222,88" stroke={Bone} strokeWidth={3} strokeLinecap="round" fill="none"/>
    {/* Sternum */}
    <rect x="146" y="74" width="8" height="40" rx="2.5" fill={Bone} stroke={BoneEdge} strokeWidth={0.5}/>
    {/* Ribs — 18 px intercostal spacing, span 100→200 (shared scale) */}
    {[120, 138, 156, 174].map((y, i) => (
      <path key={i} d={`M100,${y} Q150,${y + 8} 200,${y}`}
            stroke={BoneEdge} strokeWidth={0.5} fill="none" opacity={0.35}/>
    ))}

    {/* Subclavian + SVC */}
    <path d="M100,90 C140,84 175,78 200,72" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>
    <path d="M200,72 C202,92 195,116 190,140" stroke="url(#veinGrad)" strokeWidth={3} fill="none"/>

    {/* Heart */}
    <path d="M170,150 C155,155 150,180 175,195 L195,205 L215,195 C232,180 220,155 205,150 C198,150 192,158 187,164 C182,158 176,150 170,150 Z"
          fill="url(#heartGrad)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>

    {/* Port reservoir — titanium body */}
    <ellipse cx="100" cy="145" rx="22" ry="14" fill="url(#portGrad)" stroke={FgEdge} strokeOpacity={0.6} strokeWidth={0.5}/>
    {/* Reservoir base highlight */}
    <ellipse cx="100" cy="142" rx="20" ry="11" fill="none" stroke="hsl(210 30% 85%)" strokeWidth={0.5} opacity={0.7}/>
    {/* Septum (silicone) — palpable triangular markers */}
    <ellipse cx="100" cy="142" rx="11" ry="7" fill="hsl(280 35% 32%)" stroke={FgEdge} strokeOpacity={0.5} strokeWidth={0.5}/>
    <ellipse cx="100" cy="141" rx="9" ry="5" fill="hsl(280 30% 40%)" opacity={0.7}/>
    {/* Three palpation bumps */}
    {[0, 120, 240].map(deg => {
      const r = 14;
      const rad = (deg * Math.PI) / 180;
      const cx = 100 + r * Math.cos(rad);
      const cy = 142 + r * 0.55 * Math.sin(rad);
      return <circle key={deg} cx={cx} cy={cy} r={1.4} fill="hsl(210 20% 80%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>;
    })}
    {/* Suture eyelets at base */}
    <circle cx={78} cy={155} r={1.5} fill="none" stroke={FgEdge} strokeOpacity={0.5} strokeWidth={0.5}/>
    <circle cx={122} cy={155} r={1.5} fill="none" stroke={FgEdge} strokeOpacity={0.5} strokeWidth={0.5}/>

    {/* Catheter from port → subclavian → SVC */}
    <path d="M120,140 C150,128 175,100 200,72"
          stroke={Catheter} strokeWidth={3} fill="none" strokeLinecap="round"/>
    <path d="M120,140 C150,128 175,100 200,72"
          stroke={CatheterEdge} strokeWidth={0.5} fill="none" strokeLinecap="round"/>
    <path d="M200,72 C202,94 196,116 190,140"
          stroke={Catheter} strokeWidth={3} fill="none"/>
    <path d="M200,72 C202,94 196,116 190,140"
          stroke={CatheterEdge} strokeWidth={0.5} fill="none"/>
    <circle cx="190" cy="140" r="2.2" fill={FgEdge}/>

    {/* Huber non-coring needle — angled 90° through skin into septum */}
    {/* Needle shaft */}
    <line x1="100" y1="100" x2="100" y2="140" stroke="hsl(0 0% 35%)" strokeWidth={1.5}/>
    {/* Bevel detail at tip */}
    <path d="M100,140 L98,138 L102,138 Z" fill="hsl(0 0% 55%)"/>
    {/* Right-angle hub of Huber needle */}
    <path d="M100,100 L100,93 L120,93" stroke="hsl(0 0% 35%)" strokeWidth={1.5} fill="none" strokeLinecap="round"/>
    {/* Wings */}
    <path d="M95,98 L90,92 L90,108 Z" fill="hsl(220 50% 65%)" stroke={FgEdge} strokeOpacity={0.5} strokeWidth={0.5}/>
    <path d="M105,98 L110,92 L110,108 Z" fill="hsl(220 50% 65%)" stroke={FgEdge} strokeOpacity={0.5} strokeWidth={0.5}/>
    {/* Connecting tubing */}
    <path d="M120,93 C140,90 155,88 170,90" stroke={Catheter} strokeWidth={2} fill="none"/>
    {/* Luer */}
    <rect x="168" y="86" width="10" height="8" rx="1.5" fill="hsl(0 0% 92%)" stroke={FgEdge} strokeOpacity={0.4} strokeWidth={0.5}/>

    {/* Skin surface line on cut-away */}
    <path d="M50,108 C90,103 110,103 150,108" stroke={SkinEdge} strokeWidth={0.75}/>
    <text x="48" y="106" textAnchor="end" {...tinyLabel as object}>Skin</text>

    {/* Labels */}
    <text x="20" y="80" {...labelStyle as object}>Huber (non-coring)</text>
    <text x="20" y="91" {...labelStyle as object}>needle — 90° hub</text>
    {leader(60, 84, 92, 95)}

    <text x="280" y="115" textAnchor="end" {...labelStyle as object}>Self-sealing</text>
    <text x="280" y="126" textAnchor="end" {...labelStyle as object}>silicone septum</text>
    {leader(220, 122, 112, 140)}

    <text x="280" y="170" textAnchor="end" {...labelStyle as object}>Titanium reservoir in</text>
    <text x="280" y="181" textAnchor="end" {...labelStyle as object}>subcutaneous pocket</text>
    {leader(218, 173, 122, 152)}

    <text x="280" y="200" textAnchor="end" {...labelStyle as object}>Suture eyelets</text>
    {leader(225, 197, 124, 156)}

    <text x="20" y="200" {...labelStyle as object}>Catheter → subclavian v.</text>
    {leader(75, 197, 145, 130)}

    <text x="280" y="240" textAnchor="end" {...labelStyle as object}>Tip: cavoatrial junction</text>
    {leader(232, 237, 192, 142)}
  </svg>
);

// ─── Wrapper ──────────────────────────────────────────────────────────
export const VascularAccessTypesDiagram: React.FC = () => (
    <DiagramFigure
      id="vascular-access-types-diagram"
      title="Vascular access types"
      description="Auto-generated wrapper for the Vascular access types anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Device archetypes — anatomy, dwell time and supporting evidence
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Five anatomically detailed schematics with surface anatomy, bony
          landmarks (clavicle, sternum, ribs), the relevant venous tree and
          the catheter course from skin entry to tip position. Read alongside
          the Rickard 2012 / epic3 / 3SITES evidence in the Key Learning Points.
        </p>
      </figcaption>
      <div className="p-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Plate
          title="1 · Peripheral cannula"
          dwell="Remove when clinically indicated (no fixed 72–96 h)"
          evidence="Rickard 2012 (Lancet); Cochrane 2019; epic3"
        >
          <PeripheralCannula />
        </Plate>
        <Plate
          title="2 · PICC"
          dwell="Weeks to months (≤ 6 months typical)"
          evidence="CRBSI ≈ 1.1/1000 catheter-days (Maki 2006)"
        >
          <PICC />
        </Plate>
        <Plate
          title="3 · Non-tunnelled CVC"
          dwell="≤ 7–14 days (no routine replacement — CDC 2017)"
          evidence="3SITES (Parienti 2015): SCV < IJV < femoral CRBSI"
        >
          <NonTunnelledCVC />
        </Plate>
        <Plate
          title="4 · Tunnelled line (Hickman / Groshong / Permcath)"
          dwell="Months to years"
          evidence="Subcutaneous Dacron cuff ↓ CRBSI vs non-tunnelled"
        >
          <TunnelledLine />
        </Plate>
        <Plate
          title="5 · Implanted port (Portacath)"
          dwell="Years (intermittent access)"
          evidence="Lowest CRBSI of any CVAD ≈ 0.1/1000 catheter-days"
        >
          <Portacath />
        </Plate>
      </div>
    </figure>
    </DiagramFigure>
  );

export default VascularAccessTypesDiagram;
