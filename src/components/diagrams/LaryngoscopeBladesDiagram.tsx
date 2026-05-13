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
    keyPoints: [
      "FRCA Primary — Equipment: identify the straight Miller blade and its paediatric sizing (0 = preterm, 1 = neonate/infant).",
      "Direct epiglottic elevation — tip passes posterior to the epiglottis (large, floppy, U-shaped in neonates).",
      "Narrower flange leaves less ETT-passage space; precise midline technique required.",
      "Higher epiglottic trauma and laryngospasm risk if anaesthesia is light — adequate depth essential.",
    ],
    refs: ["Miller 1941", "BJA Educ Paeds Airway 2017", "Weiss & Engelhardt 2010"],
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
    keyPoints: [
      "FRCA Primary — Equipment: recognise the lever mechanism and explain how it improves view by ≥1 Cormack-Lehane grade.",
      "Useful rescue blade for grade 2b/3a views and when manual in-line stabilisation limits neck extension.",
      "Less helpful when the limiting factor is mouth opening rather than view.",
      "Tip flexion engages the hyoepiglottic ligament without needing greater axial force.",
    ],
    refs: ["McCoy & Mirakhur 1993", "Cormack & Lehane 1984", "DAS 2015"],
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
    keyPoints: [
      "FRCA Primary — Equipment: recognise the obtuse (~135°) handle-blade angle and historical context.",
      "Indications now niche: large breasts (obstetrics), morbid obesity, halo traction, kyphoscoliosis, body casts.",
      "Largely superseded by short-handle Macintosh and videolaryngoscopy (DAS 2015 default Plan A alternative).",
      "Awkward force vector — clean lift harder; not stocked on most modern airway trolleys.",
    ],
    refs: ["DAS 2015", "NAP4 2011"],
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
    keyPoints: [
      "FRCA Primary — Paediatric equipment: identify the wide-flange straight blade and Wis-Hipple neonatal modification.",
      "Direct epiglottic elevation with broader lingual surface — better tongue control than Miller.",
      "Useful when Miller flange is too narrow to control the tongue or pass the ETT.",
      "Per APAGBI/Weiss & Engelhardt: have multiple blade types/sizes available for the unexpected paediatric difficult airway.",
    ],
    refs: ["BJA Educ Paeds Airway 2017", "Weiss & Engelhardt 2010"],
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
    keyPoints: [
      "FRCA Final — DAS 2015: videolaryngoscopy is an alternative Plan A device and rescue tool; immediate availability mandated.",
      "Mac-shaped (C-MAC, McGRATH) — direct or indirect technique; hyperangulated (GlideScope, X-blade) — needs stylet-shaped ETT.",
      "Cochrane 2022: VL improves first-pass success and reduces failed intubation versus direct laryngoscopy in adults.",
      "NAP4: most major airway events occurred when difficulty was unanticipated — VL improves view but \"can see, can't intubate\" remains a risk.",
    ],
    refs: ["DAS 2015", "Cochrane VL 2022", "NAP4 2011", "BJA Educ Videolaryngoscopy 2016"],
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
  macintosh:         { path: "M70,82 Q120,150 175,178 Q200,188 215,182",          target: { x: 215, y: 182, r: 8,  label: "Vallecula" },                dur: 2.6 },
  miller:            { path: "M70,82 Q130,138 200,158 Q220,162 232,150",          target: { x: 232, y: 150, r: 8,  label: "Under epiglottis" },         dur: 2.7 },
  mccoy:             { path: "M70,82 Q120,150 175,178 Q195,184 208,182",          target: { x: 208, y: 182, r: 8,  label: "Vallecula → flex tip" },     dur: 2.8 },
  polio:             { path: "M88,72 Q140,150 185,178 Q205,184 218,180",          target: { x: 218, y: 180, r: 8,  label: "Vallecula" },                dur: 2.6 },
  wisconsin:         { path: "M70,82 Q130,140 200,158 Q220,162 232,150",          target: { x: 232, y: 150, r: 8,  label: "Under epiglottis" },         dur: 2.7 },
  videolaryngoscope: { path: "M70,82 Q110,140 150,180 Q200,210 222,180 Q228,160 222,138",  target: { x: 222, y: 138, r: 9,  label: "Glottic view (camera)" },    dur: 3.0 },
};

/* ---------- Shared visual primitives ---------- */

const Defs = ({ bladeKey, color: _color }: { bladeKey: BladeKey; color: string }) => (
  <defs>
    <linearGradient id={`steel-${bladeKey}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stopColor="hsl(210, 12%, 88%)" />
      <stop offset="35%" stopColor="hsl(210, 10%, 72%)" />
      <stop offset="55%" stopColor="hsl(210, 12%, 56%)" />
      <stop offset="100%" stopColor="hsl(210, 14%, 40%)" />
    </linearGradient>
    <linearGradient id={`channel-${bladeKey}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(210, 14%, 38%)" />
      <stop offset="100%" stopColor="hsl(210, 16%, 58%)" />
    </linearGradient>
    <linearGradient id={`handle-${bladeKey}`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="hsl(220, 8%, 22%)" />
      <stop offset="50%" stopColor="hsl(220, 8%, 36%)" />
      <stop offset="100%" stopColor="hsl(220, 8%, 18%)" />
    </linearGradient>
    <linearGradient id={`brass-${bladeKey}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(45, 55%, 75%)" />
      <stop offset="100%" stopColor="hsl(38, 60%, 45%)" />
    </linearGradient>
    <radialGradient id={`bulb-${bladeKey}`} cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stopColor="hsl(55, 100%, 92%)" />
      <stop offset="40%" stopColor="hsl(50, 100%, 72%)" />
      <stop offset="100%" stopColor="hsl(45, 90%, 50%)" stopOpacity="0" />
    </radialGradient>
    <filter id={`shadow-${bladeKey}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
      <feOffset dx="0.6" dy="1.2" result="off" />
      <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <clipPath id={`hclip-${bladeKey}`}><rect x="37" y="14" width="26" height="68" /></clipPath>
  </defs>
);

const Handle = ({ bladeKey, transform }: { bladeKey: BladeKey; transform?: string }) => (
  <g transform={transform} filter={`url(#shadow-${bladeKey})`}>
    <ellipse cx="50" cy="14" rx="13" ry="3.2" fill="hsl(220, 8%, 26%)" />
    <rect x="37" y="14" width="26" height="68" rx="2" fill={`url(#handle-${bladeKey})`} stroke="hsl(220, 10%, 14%)" strokeWidth="0.5" />
    <g opacity="0.55" clipPath={`url(#hclip-${bladeKey})`}>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`a${i}`} x1={37} y1={18 + i * 5} x2={63} y2={13 + i * 5} stroke="hsl(220, 5%, 10%)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`b${i}`} x1={37} y1={13 + i * 5} x2={63} y2={18 + i * 5} stroke="hsl(220, 5%, 10%)" strokeWidth="0.5" />
      ))}
    </g>
    <rect x="38" y="16" width="2" height="64" rx="1" fill="hsl(220, 8%, 60%)" opacity="0.5" />
    <rect x="35" y="80" width="30" height="6" rx="1" fill={`url(#brass-${bladeKey})`} stroke="hsl(38, 50%, 30%)" strokeWidth="0.5" />
    <path d="M40,86 L40,96 L60,96 L60,86 Z" fill={`url(#brass-${bladeKey})`} stroke="hsl(38, 50%, 30%)" strokeWidth="0.5" />
    <circle cx="50" cy="91" r="1.4" fill="hsl(38, 50%, 30%)" />
  </g>
);

const BladeShape = ({ bladeKey, opacity = 1, animate = false }: BladeShapeProps) => {
  const b = blades[bladeKey];
  const traj = tipTrajectory[bladeKey];
  const steel = `url(#steel-${bladeKey})`;
  const channel = `url(#channel-${bladeKey})`;
  const accent = b.color;

  return (
    <svg viewBox="0 0 260 260" className="w-full max-w-[300px] mx-auto" style={{ opacity }}>
      <Defs bladeKey={bladeKey} color={accent} />

      {/* Reference anatomy — sagittal cross-section through the upper airway */}
      <g opacity={animate ? 0.5 : 0.22}>
        {/* Hard palate */}
        <path d="M150,90 Q190,82 230,98 L232,108 Q190,96 150,104 Z" fill="hsl(15, 35%, 78%)" />
        <text x="190" y="92" fontSize="5.5" fill="hsl(15, 35%, 50%)">Hard palate</text>
        {/* Tongue */}
        <path d="M120,150 Q160,130 200,150 Q220,158 215,180 L120,180 Z" fill="hsl(0, 45%, 72%)" stroke="hsl(0, 40%, 52%)" strokeWidth="0.5" />
        <text x="155" y="172" fontSize="5.5" fill="hsl(0, 40%, 40%)">Tongue (base)</text>
        {/* Hyoepiglottic ligament */}
        <path d="M210,178 L222,160" stroke="hsl(45, 40%, 45%)" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.7" />
        {/* Epiglottis */}
        <path d="M218,178 Q228,158 232,138 Q235,132 238,138 Q236,160 226,180 Z" fill="hsl(15, 55%, 68%)" stroke="hsl(15, 55%, 45%)" strokeWidth="0.5" />
        <text x="240" y="148" fontSize="5.5" fill="hsl(15, 55%, 40%)">Epiglottis</text>
        {/* Vallecula */}
        <ellipse cx="215" cy="180" rx="4" ry="2.5" fill="hsl(0, 25%, 50%)" opacity="0.6" />
        <text x="180" y="195" fontSize="5" fill="hsl(var(--muted-foreground))">Vallecula</text>
        {/* Vocal cords */}
        <path d="M232,138 L246,128 L244,142 Z" fill="hsl(40, 25%, 92%)" stroke="hsl(40, 20%, 60%)" strokeWidth="0.5" />
        <text x="248" y="124" fontSize="5" fill="hsl(40, 20%, 45%)">Cords</text>
        {/* Trachea */}
        <path d="M232,144 L240,148 L244,200 L228,200 Z" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.5" />
        {/* Posterior pharyngeal wall */}
        <path d="M120,90 Q115,140 120,200" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.45" />
        {/* Upper incisors */}
        <path d="M126,126 L132,128 L132,134 L126,132 Z" fill="hsl(40, 25%, 92%)" stroke="hsl(40, 20%, 50%)" strokeWidth="0.5" />
      </g>


      {/* Blade-specific shapes */}
      {bladeKey === "macintosh" && (
        <g>
          <Handle bladeKey={bladeKey} transform="translate(20,0)" />
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M70,96 L88,96 Q102,108 122,128 Q150,158 180,178 Q204,190 218,184 L222,180 Q210,184 192,180 Q165,170 140,148 Q110,118 92,104 L70,104 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M75,99 L88,99 Q102,110 122,130 Q150,160 180,180 Q200,190 215,184" fill="none" stroke={channel} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
            <path d="M76,100 Q104,114 134,140 Q168,168 198,184" fill="none" stroke="hsl(210, 18%, 96%)" strokeWidth="0.75" strokeLinecap="round" opacity="0.7" />
            <path d="M70,96 L88,96 Q102,108 122,128 Q150,158 180,178 Q204,190 218,184 L218,176 Q200,182 180,170 Q150,148 120,118 Q102,100 88,90 L70,90 Z" fill={withAlpha(accent, 0.18)} stroke={accent} strokeWidth="0.5" />
            <ellipse cx="220" cy="183" rx="4" ry="2.2" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
          </g>
          <path d="M82,93 Q108,116 140,144 Q172,170 210,184" fill="none" stroke="hsl(45, 80%, 70%)" strokeWidth="0.5" strokeDasharray="0.8 1" opacity="0.7" />
          <circle cx="208" cy="184" r="6" fill={`url(#bulb-${bladeKey})`} opacity="0.9" />
          <circle cx="208" cy="184" r="1.6" fill="hsl(50, 100%, 88%)" stroke="hsl(40, 80%, 45%)" strokeWidth="0.5" />
          <text x="105" y="118" fontSize="4.5" fill="hsl(210, 14%, 25%)" fontWeight="700" opacity="0.7">MAC 3</text>
          <text x="130" y="232" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">Curved · tip → vallecula</text>
          <text x="130" y="242" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Indirect epiglottic elevation</text>
        </g>
      )}

      {bladeKey === "miller" && (
        <g>
          <Handle bladeKey={bladeKey} transform="translate(20,0)" />
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M70,96 L82,96 Q92,104 108,116 Q145,140 195,158 Q220,166 232,156 L234,150 Q220,160 196,150 Q150,134 110,108 Q94,98 82,90 L70,90 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M76,99 Q98,110 130,128 Q170,148 215,158 Q226,160 233,152" fill="none" stroke={channel} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
            <path d="M77,99 Q108,114 150,134 Q190,152 222,158" fill="none" stroke="hsl(210, 18%, 96%)" strokeWidth="0.75" opacity="0.7" />
            <path d="M228,154 Q236,150 240,142 Q237,148 233,152 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M76,93 L84,93 Q100,100 130,114 Q170,134 210,150 L210,154 Q170,140 130,120 Q100,106 84,98 L76,98 Z" fill={withAlpha(accent, 0.18)} stroke={accent} strokeWidth="0.5" />
          </g>
          <path d="M82,93 Q120,114 168,136 Q210,154 230,156" fill="none" stroke="hsl(45, 80%, 70%)" strokeWidth="0.5" strokeDasharray="0.8 1" opacity="0.7" />
          <circle cx="226" cy="156" r="5.5" fill={`url(#bulb-${bladeKey})`} opacity="0.9" />
          <circle cx="226" cy="156" r="1.5" fill="hsl(50, 100%, 88%)" stroke="hsl(40, 80%, 45%)" strokeWidth="0.5" />
          <text x="115" y="116" fontSize="4.5" fill="hsl(210, 14%, 25%)" fontWeight="700" opacity="0.7">MIL 1</text>
          <text x="130" y="232" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">Straight · tip lifts epiglottis</text>
          <text x="130" y="242" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Direct elevation (paediatric / anterior larynx)</text>
        </g>
      )}

      {bladeKey === "mccoy" && (
        <g>
          <Handle bladeKey={bladeKey} transform="translate(20,0)" />
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M40,30 L40,72 Q40,76 44,76 L52,76 Q56,76 56,72 L56,30 Q56,26 52,26 L44,26 Q40,26 40,30 Z" fill={accent} stroke="hsl(0, 0%, 15%)" strokeWidth="0.5" opacity="0.92" />
            <text x="48" y="56" textAnchor="middle" fontSize="4.2" fill="hsl(0,0%,100%)" fontWeight="700">LEVER</text>
          </g>
          <path d="M50,76 Q70,90 110,118 Q140,140 170,160 Q188,170 196,176" fill="none" stroke="hsl(220, 10%, 30%)" strokeWidth="0.5" strokeDasharray="1.2 1" opacity="0.6" />
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M70,96 L86,96 Q100,108 122,128 Q148,156 178,176 L194,182 L196,178 L182,170 Q156,154 132,130 Q108,108 92,96 L70,90 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <circle cx="196" cy="180" r="3.5" fill="hsl(210, 14%, 32%)" stroke="hsl(210, 18%, 78%)" strokeWidth="0.75" />
            <circle cx="196" cy="180" r="1.2" fill="hsl(0, 0%, 12%)" />
            <path d="M194,178 L208,184 Q214,184 214,180 Q216,170 210,166 L196,178 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M76,100 Q108,116 140,142 Q170,168 192,178" fill="none" stroke="hsl(210, 18%, 96%)" strokeWidth="0.75" opacity="0.7" />
            <path d="M70,90 L86,90 Q100,102 122,122 Q148,150 178,170 L182,166 Q156,148 132,124 Q108,102 92,90 L70,84 Z" fill={withAlpha(accent, 0.16)} stroke={accent} strokeWidth="0.5" />
          </g>
          <path d="M196,180 A 14,14 0 0 0 210,166" fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="1.2 1" opacity="0.7" />
          <text x="218" y="170" fontSize="4.5" fill={accent} fontWeight="600">~70°</text>
          <circle cx="208" cy="180" r="5" fill={`url(#bulb-${bladeKey})`} opacity="0.9" />
          <circle cx="208" cy="180" r="1.4" fill="hsl(50, 100%, 88%)" stroke="hsl(40, 80%, 45%)" strokeWidth="0.5" />
          <text x="105" y="118" fontSize="4.5" fill="hsl(210, 14%, 25%)" fontWeight="700" opacity="0.7">McCOY 3</text>
          <text x="130" y="232" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">Hinged tip · improves view ≥ 1 grade</text>
          <text x="130" y="242" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Lever flexes distal segment</text>
        </g>
      )}

      {bladeKey === "polio" && (
        <g>
          <g transform="rotate(-50 40 90)">
            <Handle bladeKey={bladeKey} transform="translate(0,0)" />
          </g>
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M88,82 L102,84 Q118,96 138,118 Q166,148 194,170 Q212,180 222,176 L226,172 Q214,176 196,170 Q170,158 144,134 Q120,110 104,94 L88,76 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M92,86 Q120,108 150,134 Q180,158 208,176" fill="none" stroke="hsl(210, 18%, 96%)" strokeWidth="0.75" opacity="0.7" />
            <path d="M92,86 Q118,100 138,118 Q166,146 194,166 Q210,176 222,176 L222,170 Q200,172 178,162 Q150,142 124,116 Q108,100 96,82 L92,80 Z" fill={withAlpha(accent, 0.18)} stroke={accent} strokeWidth="0.5" />
          </g>
          <path d="M88,82 A 16,16 0 0 0 76,96" fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.8" />
          <text x="62" y="106" fontSize="5" fill={accent} fontWeight="600">~135°</text>
          <circle cx="216" cy="178" r="5.5" fill={`url(#bulb-${bladeKey})`} opacity="0.9" />
          <circle cx="216" cy="178" r="1.5" fill="hsl(50, 100%, 88%)" stroke="hsl(40, 80%, 45%)" strokeWidth="0.5" />
          <text x="120" y="120" fontSize="4.5" fill="hsl(210, 14%, 25%)" fontWeight="700" opacity="0.7">POLIO 3</text>
          <text x="140" y="232" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">Obtuse handle · clears chest / breasts</text>
          <text x="140" y="242" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Historical — replaced by short-handle Mac / VL</text>
        </g>
      )}

      {bladeKey === "wisconsin" && (
        <g>
          <Handle bladeKey={bladeKey} transform="translate(20,0)" />
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M70,96 L82,96 Q92,104 108,114 Q150,134 200,150 Q224,156 234,148 L236,142 Q224,150 200,142 Q150,128 108,104 Q94,96 82,86 L70,86 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M70,86 L82,86 Q100,94 130,108 Q170,128 212,144 L212,140 Q170,124 130,102 Q100,90 82,80 L70,80 Z" fill={withAlpha(accent, 0.22)} stroke={accent} strokeWidth="0.5" />
            <path d="M77,99 Q108,114 150,132 Q190,148 220,150" fill="none" stroke="hsl(210, 18%, 96%)" strokeWidth="0.75" opacity="0.7" />
            <path d="M232,148 Q238,144 240,138 Q237,144 234,148 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
          </g>
          <circle cx="226" cy="150" r="5.5" fill={`url(#bulb-${bladeKey})`} opacity="0.9" />
          <circle cx="226" cy="150" r="1.5" fill="hsl(50, 100%, 88%)" stroke="hsl(40, 80%, 45%)" strokeWidth="0.5" />
          <text x="115" y="112" fontSize="4.5" fill="hsl(210, 14%, 25%)" fontWeight="700" opacity="0.7">WIS-HIPPLE 1.5</text>
          <text x="130" y="232" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">Straight · wide flange (paediatric)</text>
          <text x="130" y="242" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Better tongue control than Miller</text>
        </g>
      )}

      {bladeKey === "videolaryngoscope" && (
        <g>
          <g filter={`url(#shadow-${bladeKey})`}>
            <rect x="32" y="8" width="34" height="86" rx="4" fill={`url(#handle-${bladeKey})`} stroke="hsl(220, 10%, 14%)" strokeWidth="0.5" />
            <circle cx="49" cy="32" r="2.4" fill="hsl(0, 0%, 14%)" stroke={accent} strokeWidth="0.5" />
            <circle cx="49" cy="32" r="0.9" fill={accent} />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={34} y1={48 + i * 5} x2={64} y2={48 + i * 5} stroke="hsl(220, 6%, 14%)" strokeWidth="0.5" opacity="0.55" />
            ))}
            <rect x="30" y="92" width="38" height="6" rx="1" fill={`url(#brass-${bladeKey})`} stroke="hsl(38, 50%, 30%)" strokeWidth="0.5" />
          </g>
          <g filter={`url(#shadow-${bladeKey})`}>
            <path d="M70,96 L88,96 Q100,114 110,142 Q120,176 144,196 Q172,212 200,206 Q216,200 222,188 L226,184 Q218,196 202,200 Q176,204 152,190 Q132,176 122,150 Q112,120 100,104 Q90,90 88,90 L70,90 Z" fill={steel} stroke="hsl(210, 14%, 30%)" strokeWidth="0.5" />
            <path d="M76,99 Q98,118 110,148 Q124,180 152,196 Q180,206 215,194" fill="none" stroke={channel} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
            <path d="M77,100 Q98,118 112,150 Q128,182 158,198 Q188,206 218,194" fill="none" stroke="hsl(210, 18%, 96%)" strokeWidth="0.75" opacity="0.7" />
            <ellipse cx="220" cy="190" rx="6" ry="4.5" fill="hsl(220, 10%, 12%)" stroke={accent} strokeWidth="0.75" />
            <circle cx="220" cy="190" r="2.4" fill="hsl(220, 30%, 18%)" stroke="hsl(210, 12%, 70%)" strokeWidth="0.5" />
            <circle cx="220" cy="190" r="1" fill="hsl(180, 60%, 75%)" opacity="0.85" />
            <circle cx="215" cy="186" r="0.8" fill="hsl(50, 100%, 92%)" />
            <circle cx="225" cy="186" r="0.8" fill="hsl(50, 100%, 92%)" />
          </g>
          <path d="M49,8 Q40,2 24,12 Q12,22 14,46" fill="none" stroke="hsl(220, 10%, 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <g filter={`url(#shadow-${bladeKey})`}>
            <rect x="2" y="44" width="32" height="24" rx="2.5" fill="hsl(220, 12%, 14%)" stroke="hsl(220, 10%, 8%)" strokeWidth="0.5" />
            <rect x="4" y="46" width="28" height="18" rx="1" fill="hsl(200, 30%, 22%)" />
            <ellipse cx="18" cy="55" rx="9" ry="6" fill="hsl(15, 45%, 60%)" opacity="0.9" />
            <path d="M14,53 L22,53 L20,58 L18,60 L16,58 Z" fill="hsl(40, 25%, 92%)" />
            <text x="18" y="70" textAnchor="middle" fontSize="3" fill={accent} fontWeight="700">LIVE</text>
          </g>
          <text x="130" y="232" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">Hyperangulated · camera at tip</text>
          <text x="130" y="242" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Indirect view — stylet-shaped ETT required</text>
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
            <circle r="9" fill="none" stroke={b.color} strokeWidth="0.75" opacity="0.35">
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
        <path d="M20,40 Q40,75 100,90" fill="none" stroke="hsl(210, 65%, 50%)" strokeWidth="3" strokeLinecap="round" />
        <text x="60" y="110" textAnchor="middle" fontSize="6.5" fill="hsl(var(--muted-foreground))">Tip → vallecula</text>
        <text x="60" y="120" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Indirect lift</text>
      </g>
      {/* Straight (Miller) */}
      <g>
        <text x="180" y="14" textAnchor="middle" fontSize="8" fill="hsl(140, 55%, 42%)" fontWeight="bold">Straight (Miller)</text>
        <path d="M140,55 L218,75 Q224,75 226,72" fill="none" stroke="hsl(140, 55%, 42%)" strokeWidth="3" strokeLinecap="round" />
        <text x="180" y="110" textAnchor="middle" fontSize="6.5" fill="hsl(var(--muted-foreground))">Tip → under epiglottis</text>
        <text x="180" y="120" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Direct lift</text>
      </g>
      {/* Hyperangulated (VL) */}
      <g>
        <text x="300" y="14" textAnchor="middle" fontSize="8" fill="hsl(0, 65%, 55%)" fontWeight="bold">Hyperangulated (VL)</text>
        <path d="M260,40 Q280,65 290,90 Q300,105 330,98" fill="none" stroke="hsl(0, 65%, 55%)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="328" cy="98" r="2.5" fill="hsl(var(--background))" stroke="hsl(0, 65%, 55%)" strokeWidth="1" />
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
                <p className="text-muted-foreground">
                  {info.mechanism}
                  {info.refs.map((r) => (
                    <InlineRef
                      key={r}
                      topicId="equipment-monitoring"
                      refLabel={r}
                      contextTitle={`${info.label} — FRCA key points`}
                      keyPoints={info.keyPoints}
                      accentColor={info.color}
                    />
                  ))}
                </p>
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

          <div
            className="rounded-lg border-l-4 border border-border p-3 mt-3 text-xs"
            style={{ borderLeftColor: info.color, backgroundColor: withAlpha(info.color, 0.06) }}
          >
            <p className="font-semibold text-foreground mb-1.5">FRCA Key Learning Points</p>
            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
              {info.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
            </ul>
          </div>

          <div className="rounded-lg border border-border p-3 bg-secondary/20 mt-3 text-[11px]">
            <p className="font-semibold text-foreground mb-1">Sources</p>
            <p className="text-muted-foreground">
              {info.refs.map((r, i) => (
                <span key={r}>
                  {i > 0 && " · "}
                  {r}
                  <InlineRef
                    topicId="equipment-monitoring"
                    refLabel={r}
                    contextTitle={`${info.label} — FRCA key points`}
                    keyPoints={info.keyPoints}
                    accentColor={info.color}
                  />
                </span>
              ))}
            </p>
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
