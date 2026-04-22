import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withAlpha } from "@/lib/color-utils";
import InlineRef from "@/components/InlineRef";

type BladeKey = "macintosh" | "miller" | "mccoy" | "polio" | "wisconsin" | "videolaryngoscope";

interface BladeInfo {
  label: string;
  type: "curved" | "straight" | "articulated" | "angled" | "video";
  sizes: string;
  color: string;
  tipPlacement: string;
  mechanism: string;
  bestFor: string[];
  limitations: string[];
  indications: string;
  historicalNote: string;
  /** FRCA-mapped key learning points for the curriculum */
  keyPoints: string[];
  /** Reference labels (must match entries in references.ts under "equipment-monitoring") */
  refs: string[];
}

const blades: Record<BladeKey, BladeInfo> = {
  macintosh: {
    label: "Macintosh",
    type: "curved",
    sizes: "Sizes 1–4 (size 3 = average adult; size 4 = larger adults)",
    color: "hsl(210, 65%, 50%)",
    tipPlacement: "Tip sits in the vallecula (between base of tongue and epiglottis)",
    mechanism:
      "Indirect epiglottic elevation. Pressure on the hyoepiglottic ligament via the vallecula lifts the epiglottis forward to expose the glottis. Force vector: 45° forward and upward — never lever on the upper teeth.",
    bestFor: [
      "Routine adult intubation — the default UK blade",
      "Patients with normal anatomy and adequate mouth opening",
      "Leaves more pharyngeal space for ETT passage than straight blades",
      "Lower risk of epiglottic trauma (epiglottis not directly contacted)",
    ],
    limitations: [
      "Less effective in patients with floppy/long epiglottis (e.g., infants)",
      "Requires adequate mouth opening (≥3 cm) and neck extension",
      "Cormack-Lehane grade may worsen if vallecular pressure is inadequate",
    ],
    indications: "Standard for adults and children >2 years. First-line choice in routine elective and emergency adult intubation.",
    historicalNote: "Sir Robert Macintosh (Oxford, 1943) — observed the easier laryngeal view when a tonsillectomy gag pressed in the vallecula.",
    keyPoints: [
      "FRCA Primary — Equipment: identify the curved Macintosh blade and describe sizing (1–4) by patient age/build.",
      "Force vector is 45° forward and upward along the handle; never lever on the upper incisors.",
      "Indirect epiglottic elevation via the hyoepiglottic ligament — vallecular pressure is essential for view.",
      "Default Plan A blade in DAS 2015 unanticipated difficult intubation algorithm for adults.",
    ],
    refs: ["Macintosh 1943", "Cormack & Lehane 1984", "DAS 2015"],
  },
  miller: {
    label: "Miller",
    type: "straight",
    sizes: "Sizes 0–4 (size 0–1 = neonate/infant; 2 = small child; 3–4 = adult)",
    color: "hsl(140, 55%, 42%)",
    tipPlacement: "Tip passes posterior to the epiglottis and directly lifts it",
    mechanism:
      "Direct epiglottic elevation. The straight blade is advanced beneath the epiglottis and lifts it anteriorly, fully exposing the cords. Useful when the epiglottis is large, floppy, or U-shaped.",
    bestFor: [
      "Neonates and infants — large, omega-shaped, floppy epiglottis",
      "Anterior larynx (\"Cormack-Lehane III\")",
      "Patients with a long, lax epiglottis obscuring the cords",
      "Edentulous patients (no teeth to obstruct line-of-sight)",
    ],
    limitations: [
      "Narrower flange leaves less room to pass the ETT",
      "Higher risk of epiglottic trauma and laryngospasm if light anaesthesia",
      "Requires more precise tip placement",
    ],
    indications: "Paediatric anaesthesia (especially <1 year). Difficult adult airway with anterior larynx. Some prefer for awake intubation.",
    historicalNote: "Robert A. Miller (San Antonio, 1941) — straight blade with a slight upward curve at the tip.",
  },
  mccoy: {
    label: "McCoy",
    type: "articulated",
    sizes: "Sizes 3 and 4 (adult); modified Macintosh shape",
    color: "hsl(280, 50%, 55%)",
    tipPlacement: "Hinged tip in vallecula; lever flexes tip to elevate epiglottis indirectly",
    mechanism:
      "A Macintosh blade with a hinged distal tip operated by a lever on the handle. Squeezing the lever flexes the tip ~70°, lifting the hyoepiglottic ligament and improving the laryngeal view by ≥1 Cormack-Lehane grade in difficult cases.",
    bestFor: [
      "Anticipated or unexpected difficult laryngoscopy (CL grade 2b/3a)",
      "Patients with limited neck extension (e.g., cervical spine immobilisation)",
      "Rescue blade when standard Macintosh view is poor",
      "Useful when external laryngeal manipulation is impractical",
    ],
    limitations: [
      "Bulkier handle/lever mechanism",
      "Less helpful when problem is restricted mouth opening rather than view",
      "Relies on intact vallecular anatomy",
    ],
    indications: "Difficult airway algorithm, cervical spine precautions (manual in-line stabilisation), failed first-attempt Macintosh.",
    historicalNote: "McCoy and Mirakhur (Belfast, 1993) — hinged-tip modification of the standard Macintosh.",
  },
  polio: {
    label: "Polio",
    type: "angled",
    sizes: "Adult size; blade set at ~135° to handle",
    color: "hsl(25, 75%, 50%)",
    tipPlacement: "Same as Macintosh — vallecula",
    mechanism:
      "Macintosh-style blade attached at an obtuse (~135°) angle to the handle, allowing intubation when chest or shoulder bulk would block a normally-mounted handle from clearing the patient's body.",
    bestFor: [
      "Obstetric patients with large breasts impeding handle insertion",
      "Obese patients (BMI very high) with limited inter-mammary space",
      "Patients in body casts, halo traction, or kyphoscoliosis",
      "Historical use in iron-lung polio patients (origin of name)",
    ],
    limitations: [
      "Awkward force vector — harder to develop a clean lift",
      "Largely superseded by short-handle Macintosh and videolaryngoscopes",
      "Not stocked in many modern airway trolleys",
    ],
    indications: "Now mostly historical. Short-handled Macintosh or videolaryngoscope preferred for the same indications.",
    historicalNote: "Developed in the 1950s for intubating polio patients ventilated in iron lungs (chest enclosed in tank ventilator).",
  },
  wisconsin: {
    label: "Wisconsin / Wis-Hipple",
    type: "straight",
    sizes: "Sizes 0–4 (paediatric to adult); wider flange than Miller",
    color: "hsl(195, 60%, 45%)",
    tipPlacement: "Posterior to the epiglottis (direct lift)",
    mechanism:
      "Straight blade with a broad, flat lingual surface and a larger flange than the Miller. The wide flange better controls the tongue and provides more room for the ETT than a Miller, while still directly lifting the epiglottis.",
    bestFor: [
      "Paediatric intubation when tongue control is challenging",
      "Neonates (Wis-Hipple modification — straighter, wider)",
      "When more lateral tongue displacement is needed than Miller offers",
    ],
    limitations: [
      "Bulkier than Miller — may impede ETT insertion in very small mouths",
      "Less commonly stocked outside paediatric centres",
    ],
    indications: "Paediatric anaesthesia (alternative to Miller). Wis-Hipple is a popular neonatal blade in North American practice.",
    historicalNote: "Designed at the University of Wisconsin (1941). Wis-Hipple is a 1949 modification by Hipple for infants.",
  },
  videolaryngoscope: {
    label: "Videolaryngoscope (e.g., C-MAC, GlideScope)",
    type: "video",
    sizes: "Macintosh-shaped (C-MAC, McGRATH) or hyperangulated (GlideScope, McGRATH X-blade)",
    color: "hsl(0, 65%, 55%)",
    tipPlacement: "Vallecula (Mac-shape) or under epiglottis (hyperangulated)",
    mechanism:
      "Camera at the distal end of the blade transmits a glottic view to a screen — operator does not need a direct line-of-sight. Hyperangulated blades (60–90°) 'see around the corner' and require a stylet-shaped ETT for delivery.",
    bestFor: [
      "First-line in many modern UK practices (DAS 2015 guidelines)",
      "Anticipated difficult airway (limited mouth opening, restricted neck movement)",
      "Cervical spine immobilisation",
      "Teaching — supervisor and trainee share the same view",
      "Awake tracheal intubation (with topicalisation)",
    ],
    limitations: [
      "Improved view does not always equate to easier ETT delivery — \"can see, can't intubate\"",
      "Hyperangulated blades require a pre-formed (stylet) ETT",
      "Lens fogging, blood, secretions degrade the image",
      "Cost and availability; battery dependence",
    ],
    indications: "DAS algorithm Plan A alternative to direct laryngoscopy; primary tool in many anticipated difficult airways and ICU intubations.",
    historicalNote: "GlideScope (Pacey, 2001) — first commercially successful videolaryngoscope. Now standard equipment per DAS/RCoA recommendations.",
  },
};

const bladeOrder: BladeKey[] = ["macintosh", "miller", "mccoy", "polio", "wisconsin", "videolaryngoscope"];

interface BladeShapeProps {
  bladeKey: BladeKey;
  opacity?: number;
  /** When true, render the animated tip trajectory + target halo overlay */
  animate?: boolean;
}

/**
 * Per-blade animation metadata.
 *  - path: SVG path the moving tip follows (start of insertion → final target).
 *  - target: anatomy point that pulses while the tip arrives.
 *  - targetLabel: short caption rendered next to the halo.
 *  - dur: motion duration in seconds.
 */
const tipTrajectory: Record<BladeKey, { path: string; target: { x: number; y: number; r: number; label: string }; dur: number }> = {
  macintosh:         { path: "M40,118 Q90,150 148,148",                 target: { x: 148, y: 148, r: 7,  label: "Vallecula" },                dur: 2.4 },
  miller:            { path: "M40,118 Q100,135 160,124 Q168,122 170,118", target: { x: 170, y: 118, r: 7,  label: "Under epiglottis" },         dur: 2.6 },
  mccoy:             { path: "M40,118 Q90,150 145,150",                 target: { x: 145, y: 150, r: 7,  label: "Vallecula (then flex tip)" }, dur: 2.4 },
  polio:             { path: "M55,118 Q95,150 148,150",                 target: { x: 148, y: 150, r: 7,  label: "Vallecula" },                dur: 2.4 },
  wisconsin:         { path: "M40,116 Q100,130 160,122 Q168,120 170,118", target: { x: 170, y: 118, r: 7,  label: "Under epiglottis" },         dur: 2.6 },
  videolaryngoscope: { path: "M40,118 Q70,150 100,170 Q140,185 158,166", target: { x: 178, y: 105, r: 8,  label: "Glottic view (camera)" },    dur: 3.0 },
};

const BladeShape = ({ bladeKey, opacity = 1, animate = false }: BladeShapeProps) => {
  const b = blades[bladeKey];
  const gradId = `blade-${bladeKey}`;
  const traj = tipTrajectory[bladeKey];

  return (
    <svg viewBox="0 0 220 240" className="w-full max-w-[260px] mx-auto" style={{ opacity }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={b.color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={b.color} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Reference anatomy: tongue + epiglottis + vocal cords */}
      <g opacity={animate ? 0.42 : 0.18}>
        {/* Tongue */}
        <path d="M40,170 Q90,140 140,150 Q160,155 170,170 L170,200 L40,200 Z" fill="hsl(var(--muted-foreground))" />
        <text x="60" y="195" fontSize="6" fill="hsl(var(--muted-foreground))">Tongue</text>
        {/* Epiglottis */}
        <path d="M150,150 Q160,130 168,118 Q172,114 174,118 Q170,135 162,152 Z" fill="hsl(280, 40%, 55%)" />
        <text x="180" y="125" fontSize="6" fill="hsl(280, 40%, 55%)">Epiglottis</text>
        {/* Vallecula */}
        <circle cx="148" cy="148" r="3" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 1" />
        <text x="115" y="146" fontSize="5" fill="hsl(var(--muted-foreground))">Vallecula</text>
        {/* Cords */}
        <line x1="170" y1="115" x2="195" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" strokeDasharray="2 1" />
        <text x="186" y="95" fontSize="5" fill="hsl(var(--muted-foreground))">Cords</text>
      </g>
      {/* Handle (common to all) */}
      {bladeKey !== "polio" && (
        <g>
          <rect x="20" y="20" width="14" height="90" rx="2" fill="hsl(var(--muted))" stroke="hsl(0,0%,55%)" strokeWidth="0.6" />
          {/* Handle ridges */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <line key={i} x1="22" y1={28 + i * 12} x2="32" y2={28 + i * 12} stroke="hsl(0,0%,40%)" strokeWidth="0.4" opacity="0.4" />
          ))}
        </g>
      )}

      {/* Blade-specific shapes */}
      {bladeKey === "macintosh" && (
        <g>
          {/* Curved blade */}
          <path
            d="M34,110 Q50,135 90,150 Q120,158 150,150"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Flange (lateral wall) */}
          <path d="M34,110 Q50,138 90,154 Q120,162 152,154 L150,148 Q120,156 90,148 Q52,134 36,108 Z" fill={withAlpha(b.color, 0.25)} stroke={b.color} strokeWidth="0.5" />
          {/* Light position */}
          <circle cx="142" cy="151" r="2" fill="hsl(50, 100%, 70%)" stroke="hsl(50, 80%, 40%)" strokeWidth="0.4" />
          {/* Tip arrow into vallecula */}
          <path d="M148,148 L142,142" stroke={b.color} strokeWidth="0.6" markerEnd="url(#arrow)" />
          <text x="105" y="180" textAnchor="middle" fontSize="6.5" fill={b.color} fontWeight="600">Curved · tip in vallecula</text>
        </g>
      )}

      {bladeKey === "miller" && (
        <g>
          {/* Straight blade */}
          <path
            d="M34,110 L155,128"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Slight upturn at tip */}
          <path d="M150,128 Q160,128 165,122" fill="none" stroke={`url(#${gradId})`} strokeWidth="12" strokeLinecap="round" />
          {/* Channel (concave upper surface) */}
          <path d="M34,106 L165,118 L165,124 L34,114 Z" fill={withAlpha(b.color, 0.22)} stroke={b.color} strokeWidth="0.5" />
          {/* Light */}
          <circle cx="158" cy="124" r="2" fill="hsl(50, 100%, 70%)" stroke="hsl(50, 80%, 40%)" strokeWidth="0.4" />
          {/* Tip lifts under epiglottis */}
          <path d="M165,122 L170,118" stroke={b.color} strokeWidth="0.6" markerEnd="url(#arrow)" />
          <text x="100" y="180" textAnchor="middle" fontSize="6.5" fill={b.color} fontWeight="600">Straight · tip lifts epiglottis</text>
        </g>
      )}

      {bladeKey === "mccoy" && (
        <g>
          {/* Macintosh-style blade with hinged tip */}
          <path
            d="M34,110 Q50,135 90,150 Q115,156 135,152"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Hinged distal tip — drawn flexed */}
          <path
            d="M135,152 Q148,148 152,138"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Hinge marker */}
          <circle cx="135" cy="152" r="2.5" fill="hsl(var(--background))" stroke={b.color} strokeWidth="1.2" />
          {/* Lever on handle */}
          <rect x="34" y="22" width="10" height="22" rx="1.5" fill={b.color} opacity="0.7" />
          <text x="50" y="34" fontSize="5" fill={b.color} fontWeight="600">Lever</text>
          <path d="M44,33 Q70,40 100,80" fill="none" stroke={b.color} strokeWidth="0.5" strokeDasharray="2 1.5" opacity="0.7" />
          {/* Light */}
          <circle cx="148" cy="142" r="2" fill="hsl(50, 100%, 70%)" stroke="hsl(50, 80%, 40%)" strokeWidth="0.4" />
          <text x="100" y="180" textAnchor="middle" fontSize="6.5" fill={b.color} fontWeight="600">Hinged tip · improves view ≥1 grade</text>
        </g>
      )}

      {bladeKey === "polio" && (
        <g>
          {/* Angled handle (~135°) */}
          <g transform="rotate(-45 27 110)">
            <rect x="20" y="20" width="14" height="90" rx="2" fill="hsl(var(--muted))" stroke="hsl(0,0%,55%)" strokeWidth="0.6" />
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <line key={i} x1="22" y1={28 + i * 12} x2="32" y2={28 + i * 12} stroke="hsl(0,0%,40%)" strokeWidth="0.4" opacity="0.4" />
            ))}
          </g>
          {/* Curved Mac-style blade emerging from angled handle */}
          <path
            d="M50,110 Q72,140 110,150 Q130,154 150,150"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path d="M50,110 Q72,143 110,154 Q130,158 152,154 L150,148 Q130,152 110,148 Q72,138 52,108 Z" fill={withAlpha(b.color, 0.25)} stroke={b.color} strokeWidth="0.5" />
          <circle cx="142" cy="151" r="2" fill="hsl(50, 100%, 70%)" stroke="hsl(50, 80%, 40%)" strokeWidth="0.4" />
          {/* Angle marker */}
          <path d="M40,110 A 16,16 0 0 0 50,118" fill="none" stroke={b.color} strokeWidth="0.6" strokeDasharray="1.5 1" />
          <text x="35" y="128" fontSize="5" fill={b.color}>~135°</text>
          <text x="100" y="190" textAnchor="middle" fontSize="6.5" fill={b.color} fontWeight="600">Obtuse handle · clears chest/breasts</text>
        </g>
      )}

      {bladeKey === "wisconsin" && (
        <g>
          {/* Straight blade with wider flange */}
          <path
            d="M34,108 L160,124"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Wide flange */}
          <path d="M34,100 L160,118 L160,128 L34,116 Z" fill={withAlpha(b.color, 0.3)} stroke={b.color} strokeWidth="0.5" />
          {/* Tip slight upturn */}
          <path d="M155,124 Q165,124 168,120" fill="none" stroke={`url(#${gradId})`} strokeWidth="12" strokeLinecap="round" />
          <circle cx="158" cy="122" r="2" fill="hsl(50, 100%, 70%)" stroke="hsl(50, 80%, 40%)" strokeWidth="0.4" />
          <text x="100" y="180" textAnchor="middle" fontSize="6.5" fill={b.color} fontWeight="600">Straight · wide flange (paediatric)</text>
        </g>
      )}

      {bladeKey === "videolaryngoscope" && (
        <g>
          {/* Hyperangulated blade */}
          <path
            d="M34,110 Q60,140 80,165 Q95,185 130,180 Q150,178 158,165"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="13"
            strokeLinecap="round"
          />
          {/* Camera at tip */}
          <circle cx="155" cy="166" r="3.5" fill="hsl(var(--background))" stroke={b.color} strokeWidth="1.5" />
          <circle cx="155" cy="166" r="1.5" fill={b.color} />
          {/* Light */}
          <circle cx="148" cy="172" r="1.8" fill="hsl(50, 100%, 70%)" stroke="hsl(50, 80%, 40%)" strokeWidth="0.4" />
          {/* Cable to screen */}
          <path d="M27,30 Q10,50 8,90" fill="none" stroke={b.color} strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Mini screen */}
          <rect x="2" y="92" width="22" height="16" rx="2" fill="hsl(var(--card))" stroke={b.color} strokeWidth="0.8" />
          <rect x="4" y="94" width="18" height="12" rx="1" fill={withAlpha(b.color, 0.35)} />
          <text x="13" y="103" textAnchor="middle" fontSize="5" fill={b.color} fontWeight="600">VIEW</text>
          {/* Angle indicator */}
          <text x="100" y="200" textAnchor="middle" fontSize="6.5" fill={b.color} fontWeight="600">Hyperangulated · camera at tip</text>
        </g>
      )}

      {/* ===== Animated tip trajectory + target halo (Phase: insertion → target) ===== */}
      {animate && (
        <g key={`anim-${bladeKey}`}>
          {/* Faint dashed trajectory line */}
          <path
            d={traj.path}
            fill="none"
            stroke={b.color}
            strokeWidth="1"
            strokeDasharray="3 2.5"
            opacity="0.55"
          />
          {/* Pulsing halo on the target anatomy */}
          <circle cx={traj.target.x} cy={traj.target.y} r={traj.target.r} fill="none" stroke={b.color} strokeWidth="1.5" opacity="0.9">
            <animate attributeName="r" values={`${traj.target.r};${traj.target.r + 6};${traj.target.r}`} dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.15;0.9" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={traj.target.x} cy={traj.target.y} r="2.5" fill={b.color} opacity="0.95" />
          {/* Target caption */}
          <text x={traj.target.x + 9} y={traj.target.y - 2} fontSize="6" fill={b.color} fontWeight="700">
            {traj.target.label}
          </text>
          {/* Moving tip marker — repeats every cycle */}
          <g>
            <circle r="4.5" fill={b.color} opacity="0.95" stroke="hsl(var(--background))" strokeWidth="1">
              <animateMotion dur={`${traj.dur}s`} repeatCount="indefinite" path={traj.path} rotate="auto" />
              <animate attributeName="opacity" values="0;1;1;0.2" keyTimes="0;0.15;0.85;1" dur={`${traj.dur}s`} repeatCount="indefinite" />
            </circle>
            {/* Glow trail */}
            <circle r="9" fill="none" stroke={b.color} strokeWidth="0.8" opacity="0.35">
              <animateMotion dur={`${traj.dur}s`} repeatCount="indefinite" path={traj.path} />
              <animate attributeName="opacity" values="0;0.4;0.4;0" keyTimes="0;0.15;0.85;1" dur={`${traj.dur}s`} repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      )}

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill={b.color} />
        </marker>
      </defs>
    </svg>
  );
};

const ShapeComparison = () => (
  <div className="p-3 rounded-lg border border-border bg-secondary/20">
    <p className="text-xs font-semibold text-foreground mb-2">Profile Comparison — Curved vs Straight vs Hyperangulated</p>
    <svg viewBox="0 0 360 130" className="w-full max-w-[420px] mx-auto">
      {/* Curved (Macintosh) */}
      <g>
        <text x="60" y="14" textAnchor="middle" fontSize="8" fill="hsl(210, 65%, 50%)" fontWeight="bold">Curved (Macintosh)</text>
        <path d="M20,40 Q40,75 100,90" fill="none" stroke="hsl(210, 65%, 50%)" strokeWidth="6" strokeLinecap="round" />
        <text x="60" y="110" textAnchor="middle" fontSize="6.5" fill="hsl(var(--muted-foreground))">Tip → vallecula</text>
        <text x="60" y="120" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Indirect lift</text>
      </g>
      {/* Straight (Miller) */}
      <g>
        <text x="180" y="14" textAnchor="middle" fontSize="8" fill="hsl(140, 55%, 42%)" fontWeight="bold">Straight (Miller)</text>
        <path d="M140,55 L218,75 Q224,75 226,72" fill="none" stroke="hsl(140, 55%, 42%)" strokeWidth="6" strokeLinecap="round" />
        <text x="180" y="110" textAnchor="middle" fontSize="6.5" fill="hsl(var(--muted-foreground))">Tip → under epiglottis</text>
        <text x="180" y="120" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Direct lift</text>
      </g>
      {/* Hyperangulated (VL) */}
      <g>
        <text x="300" y="14" textAnchor="middle" fontSize="8" fill="hsl(0, 65%, 55%)" fontWeight="bold">Hyperangulated (VL)</text>
        <path d="M260,40 Q280,65 290,90 Q300,105 330,98" fill="none" stroke="hsl(0, 65%, 55%)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="328" cy="98" r="2.5" fill="hsl(var(--background))" stroke="hsl(0, 65%, 55%)" strokeWidth="1.2" />
        <text x="300" y="115" textAnchor="middle" fontSize="6.5" fill="hsl(var(--muted-foreground))">Camera "sees around"</text>
        <text x="300" y="123" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">No direct line of sight</text>
      </g>
    </svg>
  </div>
);

export const LaryngoscopeBladesDiagram = () => {
  const [selected, setSelected] = useState<BladeKey>("macintosh");
  const [animate, setAnimate] = useState(true);
  const info = blades[selected];
  const traj = tipTrajectory[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-2 space-y-4">
      <div>
        <h3 className="text-lg font-serif font-bold text-foreground">Laryngoscope Blades</h3>
        <p className="text-xs text-muted-foreground">
          Tap a blade to compare shape, tip placement, mechanism of laryngeal exposure, and clinical indication.
        </p>
      </div>

      {/* Blade selector */}
      <div className="flex flex-wrap gap-1.5">
        {bladeOrder.map(key => {
          const b = blades[key];
          const isActive = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                isActive ? "text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
              }`}
              style={isActive ? { borderColor: b.color, backgroundColor: withAlpha(b.color, 0.09), color: b.color } : {}}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      <Tabs defaultValue="diagram">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagram" className="text-xs">Shape & Mechanism</TabsTrigger>
          <TabsTrigger value="details" className="text-xs">Clinical Use</TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs">Profile Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="diagram" className="mt-3">
          <div className="grid sm:grid-cols-[1fr_1.2fr] gap-4 items-start">
            <div className="rounded-lg bg-secondary/20 border border-border p-2 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-muted-foreground">
                  Target: <span className="font-semibold" style={{ color: info.color }}>{traj.target.label}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setAnimate(a => !a)}
                  aria-pressed={animate}
                  className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                    animate
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {animate ? "⏸ Pause" : "▶ Animate tip"}
                </button>
              </div>
              <BladeShape bladeKey={selected} animate={animate} />
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-semibold text-foreground">Tip placement</p>
                <p className="text-muted-foreground">{info.tipPlacement}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Mechanism of exposure</p>
                <p className="text-muted-foreground">{info.mechanism}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Sizes available</p>
                <p className="text-muted-foreground">{info.sizes}</p>
              </div>
              <div className="pt-1 border-t border-border">
                <p className="text-[11px] italic text-muted-foreground">{info.historicalNote}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-3">
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-border p-3 bg-secondary/20">
              <p className="font-semibold text-foreground mb-1.5" style={{ color: info.color }}>Best for</p>
              <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                {info.bestFor.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-border p-3 bg-secondary/20">
              <p className="font-semibold text-foreground mb-1.5">Limitations</p>
              <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                {info.limitations.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          </div>
          <div className="rounded-lg border border-border p-3 bg-secondary/20 mt-3 text-xs">
            <p className="font-semibold text-foreground mb-1">Indications</p>
            <p className="text-muted-foreground">{info.indications}</p>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-3">
          <ShapeComparison />
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            <span className="font-semibold text-foreground">Choosing a blade:</span> Macintosh remains the default for
            adult direct laryngoscopy. Use a straight (Miller / Wis-Hipple) blade in neonates and infants where the
            epiglottis is large and floppy. Reach for a McCoy when an unexpected grade 2b/3 view is encountered.
            Videolaryngoscopy (Mac-shaped or hyperangulated) is now first-line for any anticipated difficult airway and
            increasingly used for routine cases per DAS 2015 guidelines.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaryngoscopeBladesDiagram;
