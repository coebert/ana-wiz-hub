import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

type ViewKey = "carina" | "right-main" | "left-main";
type StructureKey =
  | "carina"
  | "rmb"
  | "lmb"
  | "rul"
  | "bronchus-intermedius"
  | "rml"
  | "rll"
  | "lul"
  | "lingula"
  | "lll"
  | "rings"
  | "membranous";

interface BronchStructure {
  label: string;
  side: "right" | "left" | "midline" | "landmark";
  detail: string;
  clinical: string;
}

const sideColors: Record<BronchStructure["side"], string> = {
  midline: "hsl(var(--anatomy))",
  right: "hsl(0, 65%, 55%)",
  left: "hsl(210, 65%, 55%)",
  landmark: "hsl(45, 70%, 50%)",
};

const structures: Record<StructureKey, BronchStructure> = {
  carina: {
    label: "Carina",
    side: "midline",
    detail: "Sharp midline ridge dividing trachea into right and left main bronchi at level of T4–T5 (sternal angle of Louis).",
    clinical: "Sharp carina = normal. Widened/flattened carina suggests subcarinal pathology (LN, tumour, LA enlargement). Used to confirm ETT depth (3–5 cm above).",
  },
  rmb: {
    label: "Right main bronchus (RMB)",
    side: "right",
    detail: "Shorter (~2.5 cm), wider, and more vertical than left (~25° from vertical). Direct continuation of trachea.",
    clinical: "Site of inadvertent endobronchial intubation and aspirated foreign body lodgement. Withdraw ETT until bilateral air entry restored.",
  },
  lmb: {
    label: "Left main bronchus (LMB)",
    side: "left",
    detail: "Longer (~5 cm), narrower, and more horizontal (~45° from vertical). Passes under aortic arch.",
    clinical: "Preferred side for DLT placement (left-sided DLT) in most thoracic surgery — longer length tolerates cuff and provides stable seating.",
  },
  rul: {
    label: "Right upper lobe (RUL) orifice",
    side: "right",
    detail: "Arises ~1.5 cm distal to carina from lateral wall of RMB — the only lobar bronchus visible immediately upon entering RMB. Trifurcates into apical, posterior, anterior segments.",
    clinical: "Classic 'trifurcation sign' on bronchoscopy. Easily occluded by a right-sided DLT bronchial cuff if positioned too proximally.",
  },
  "bronchus-intermedius": {
    label: "Bronchus intermedius",
    side: "right",
    detail: "Continuation of RMB beyond RUL takeoff (~2 cm long) before dividing into RML and RLL bronchi.",
    clinical: "Landing zone for right-sided DLT bronchial lumen. Endobronchial blockers commonly seated here for right thoracotomy lung isolation.",
  },
  rml: {
    label: "Right middle lobe (RML) orifice",
    side: "right",
    detail: "Anterior takeoff from bronchus intermedius. Divides into medial and lateral segments (B4, B5).",
    clinical: "Right middle lobe syndrome — recurrent atelectasis/collapse due to long, narrow bronchus and surrounding lymph nodes.",
  },
  rll: {
    label: "Right lower lobe (RLL) orifice",
    side: "right",
    detail: "Posterior continuation of bronchus intermedius. Gives off superior segment (B6, 'Nelson's nerve') first, then basal trunk.",
    clinical: "Most common site for aspiration in supine patient (gravity-dependent). Look for purulent secretions / aspirated material here.",
  },
  lul: {
    label: "Left upper lobe (LUL) orifice",
    side: "left",
    detail: "Anterior takeoff from LMB ~5 cm beyond carina. Divides into upper division (apicoposterior + anterior) and lingular division.",
    clinical: "LUL bifurcation is the bronchoscopic landmark confirming correct seating of left-sided DLT (visible just distal to bronchial cuff).",
  },
  lingula: {
    label: "Lingula",
    side: "left",
    detail: "Inferior division of LUL — analogue of right middle lobe. Two segments: superior and inferior lingular.",
    clinical: "Left-sided counterpart to RML; may show similar 'lingular syndrome' atelectasis pattern.",
  },
  lll: {
    label: "Left lower lobe (LLL) orifice",
    side: "left",
    detail: "Continuation of LMB beyond LUL takeoff. Superior segment then basal segments.",
    clinical: "Like RLL, dependent in supine — common site for aspiration and post-op atelectasis after left-sided surgery.",
  },
  rings: {
    label: "Cartilaginous rings (anterior)",
    side: "landmark",
    detail: "C-shaped rings of hyaline cartilage form the anterior 2/3 of the tracheal wall — appear as pale, ribbed semicircles at 12 o'clock.",
    clinical: "Orientation cue: rings ANTERIOR (12 o'clock) = patient supine, scope in standard orientation. Loss of definition suggests tracheomalacia.",
  },
  membranous: {
    label: "Membranous (posterior) wall",
    side: "landmark",
    detail: "Soft posterior 1/3 of trachea/main bronchi — overlies oesophagus. Appears as smooth, vascular flat surface at 6 o'clock.",
    clinical: "Orientation cue: membranous wall POSTERIOR (6 o'clock). Site of posterior tracheal injury (over-inflated cuff, percutaneous tracheostomy).",
  },
};

interface ViewConfig {
  title: string;
  subtitle: string;
  defaultSelected: StructureKey;
  visible: StructureKey[];
}

const views: Record<ViewKey, ViewConfig> = {
  carina: {
    title: "View 1 — Distal trachea & carina",
    subtitle: "Tracheal rings anterior (12 o'clock), membranous wall posterior (6). Carina divides RMB (left of screen) from LMB (right) — standard bronchoscopic orientation, patient supine.",
    defaultSelected: "carina",
    visible: ["carina", "rmb", "lmb", "rings", "membranous"],
  },
  "right-main": {
    title: "View 2 — Right main bronchus",
    subtitle: "Advance into RMB (more vertical). RUL takes off laterally almost immediately — the only lobar orifice visible from RMB.",
    defaultSelected: "rul",
    visible: ["rul", "bronchus-intermedius", "rml", "rll"],
  },
  "left-main": {
    title: "View 3 — Left main bronchus",
    subtitle: "Advance into LMB (longer, more horizontal). LUL/lingula takes off anterosuperiorly ~5 cm from carina; LLL continues distally.",
    defaultSelected: "lul",
    visible: ["lul", "lingula", "lll"],
  },
};

interface HotspotProps {
  cx: number;
  cy: number;
  r: number;
  isSelected: boolean;
  color: string;
  onClick: () => void;
  pulse?: boolean;
}

const Hotspot = ({ cx, cy, r, isSelected, color, onClick, pulse }: HotspotProps) => (
  <g onClick={onClick} className="cursor-pointer">
    {pulse && !isSelected && (
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke={color} strokeWidth={1} opacity={0.6}>
        <animate attributeName="r" values={`${r + 2};${r + 8};${r + 2}`} dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>
    )}
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      opacity={isSelected ? 0.9 : 0.45}
      stroke={isSelected ? color : "transparent"}
      strokeWidth={isSelected ? 2 : 0}
      style={{ filter: isSelected ? "url(#bvd-glow)" : undefined }}
    />
  </g>
);

const BronchoscopicViewDiagram = () => {
  const [view, setView] = useState<ViewKey>("carina");
  const [selected, setSelected] = useState<StructureKey>("carina");
  const [showLabels, setShowLabels] = useState(true);
  const [showOrientation, setShowOrientation] = useState(true);

  const cfg = views[view];
  const info = structures[selected];

  const switchView = (v: ViewKey) => {
    setView(v);
    setSelected(views[v].defaultSelected);
  };

  // Common bronchoscopic field-of-view: dark mucosal background, vignette,
  // anterior=top (rings), posterior=bottom (membranous). Standard bronchoscopic
  // orientation (patient supine, scope advanced from above): patient's RIGHT
  // appears on the LEFT of the screen and patient's LEFT on the RIGHT — i.e.
  // RMB on left of screen, LMB on right. R/L compass labels match.

  return (
    <DiagramFigure
      id="bronchoscopic-view-diagram"
      title="Bronchoscopic view"
      description="Auto-generated wrapper for the Bronchoscopic view anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Bronchoscopic view — carina & lobar orifices"
            subtitle={cfg.subtitle}
            toggles={[
              { label: "Orientation", active: showOrientation, onChange: () => setShowOrientation((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          {/* View selector */}
          <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Bronchoscopic view">
            {(Object.keys(views) as ViewKey[]).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => switchView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  view === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {views[v].title.replace(/^View \d+ — /, "")}
              </button>
            ))}
          </div>
  
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            <div className="flex-shrink-0 mx-auto">
              <svg
                viewBox="0 0 360 360"
                className="w-full max-w-[360px]"
                role="img"
                aria-label={`Bronchoscopic view of ${cfg.title}`}
              >
                <defs>
                  <radialGradient id="bvd-fov" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(15, 35%, 22%)" />
                    <stop offset="55%" stopColor="hsl(10, 40%, 14%)" />
                    <stop offset="100%" stopColor="hsl(0, 0%, 4%)" />
                  </radialGradient>
                  <radialGradient id="bvd-lumen" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(0, 0%, 0%)" stopOpacity="1" />
                    <stop offset="70%" stopColor="hsl(10, 30%, 8%)" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="hsl(15, 40%, 22%)" stopOpacity="0.4" />
                  </radialGradient>
                  <radialGradient id="bvd-mucosa" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(10, 55%, 38%)" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(10, 50%, 22%)" stopOpacity="1" />
                  </radialGradient>
                  <pattern id="bvd-vasc" patternUnits="userSpaceOnUse" width="14" height="14">
                    <path d="M0,7 Q3,4 7,7 T14,7" stroke="hsl(0, 60%, 30%)" strokeWidth="0.5" fill="none" opacity="0.45" />
                  </pattern>
                  <filter id="bvd-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="bvd-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="0" dy="1.5" result="off" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <clipPath id="bvd-clip">
                    <circle cx="180" cy="180" r="158" />
                  </clipPath>
                </defs>
  
                {/* Outer scope frame */}
                <rect x="0" y="0" width="360" height="360" rx="12" fill="hsl(220, 12%, 6%)" />
                <circle cx="180" cy="180" r="160" fill="hsl(0, 0%, 0%)" />
                <circle cx="180" cy="180" r="158" fill="url(#bvd-fov)" />
  
                {/* Mucosal wall + vasculature inside FOV */}
                <g clipPath="url(#bvd-clip)">
                  <circle cx="180" cy="180" r="158" fill="url(#bvd-mucosa)" opacity="0.55" />
                  <circle cx="180" cy="180" r="158" fill="url(#bvd-vasc)" opacity="0.7" />
  
                  {/* Anterior cartilage rings (12 o'clock) */}
                  <g opacity={view === "carina" ? 1 : 0.7}>
                    {[0, 1, 2, 3].map((i) => (
                      <path
                        key={i}
                        d={`M 70,${60 + i * 14} Q 180,${44 + i * 14} 290,${60 + i * 14}`}
                        fill="none"
                        stroke="hsl(20, 25%, 78%)"
                        strokeWidth="3"
                        opacity={0.55 - i * 0.08}
                        strokeLinecap="round"
                        onClick={() => setSelected("rings")}
                        className="cursor-pointer"
                        style={selected === "rings" ? { stroke: sideColors.landmark, opacity: 0.9, filter: "url(#bvd-glow)" } : undefined}
                      />
                    ))}
                  </g>
  
                  {/* Posterior membranous wall (6 o'clock) */}
                  <path
                    d="M 50,300 Q 180,330 310,300 L 310,330 Q 180,355 50,330 Z"
                    fill="hsl(350, 45%, 28%)"
                    opacity={selected === "membranous" ? 0.95 : 0.65}
                    stroke={selected === "membranous" ? sideColors.landmark : "transparent"}
                    strokeWidth={selected === "membranous" ? 2 : 0}
                    onClick={() => setSelected("membranous")}
                    className="cursor-pointer"
                    style={selected === "membranous" ? { filter: "url(#bvd-glow)" } : undefined}
                  />
  
                  {/* === VIEW 1: Carina === */}
                  {view === "carina" && (
                    <>
                      {/* Carinal ridge — vertical pale line down centre */}
                      <path
                        d="M 180,110 Q 178,180 182,250"
                        stroke={selected === "carina" ? sideColors.midline : "hsl(20, 30%, 70%)"}
                        strokeWidth={selected === "carina" ? 6 : 4}
                        fill="none"
                        strokeLinecap="round"
                        opacity={selected === "carina" ? 1 : 0.85}
                        onClick={() => setSelected("carina")}
                        className="cursor-pointer"
                        style={selected === "carina" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* Right main lumen (right of screen) */}
                      <ellipse
                        cx="115" cy="180" rx="48" ry="56"
                        fill="url(#bvd-lumen)"
                        stroke={selected === "rmb" ? sideColors.right : "hsl(10, 30%, 18%)"}
                        strokeWidth={selected === "rmb" ? 3 : 1.5}
                        onClick={() => setSelected("rmb")}
                        className="cursor-pointer"
                        style={selected === "rmb" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* Left main lumen */}
                      <ellipse
                        cx="245" cy="180" rx="42" ry="50"
                        fill="url(#bvd-lumen)"
                        stroke={selected === "lmb" ? sideColors.left : "hsl(10, 30%, 18%)"}
                        strokeWidth={selected === "lmb" ? 3 : 1.5}
                        onClick={() => setSelected("lmb")}
                        className="cursor-pointer"
                        style={selected === "lmb" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      <Hotspot cx={115} cy={180} r={5} isSelected={selected === "rmb"} color={sideColors.right} onClick={() => setSelected("rmb")} />
                      <Hotspot cx={245} cy={180} r={5} isSelected={selected === "lmb"} color={sideColors.left} onClick={() => setSelected("lmb")} />
                      <Hotspot cx={180} cy={180} r={5} isSelected={selected === "carina"} color={sideColors.midline} onClick={() => setSelected("carina")} pulse />
                    </>
                  )}
  
                  {/* === VIEW 2: Right main === */}
                  {view === "right-main" && (
                    <>
                      {/* RUL orifice — high lateral (right side of screen, ~2 o'clock from centre) */}
                      <ellipse
                        cx="262" cy="118" rx="32" ry="36"
                        fill="url(#bvd-lumen)"
                        stroke={selected === "rul" ? sideColors.right : "hsl(10, 30%, 18%)"}
                        strokeWidth={selected === "rul" ? 3 : 1.5}
                        transform="rotate(-25 262 118)"
                        onClick={() => setSelected("rul")}
                        className="cursor-pointer"
                        style={selected === "rul" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* Bronchus intermedius — large central lumen */}
                      <ellipse
                        cx="170" cy="200" rx="62" ry="58"
                        fill="url(#bvd-lumen)"
                        stroke={selected === "bronchus-intermedius" ? sideColors.right : "hsl(10, 30%, 18%)"}
                        strokeWidth={selected === "bronchus-intermedius" ? 3 : 1.5}
                        onClick={() => setSelected("bronchus-intermedius")}
                        className="cursor-pointer"
                        style={selected === "bronchus-intermedius" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* Internal carina between RUL and BI */}
                      <path d="M 220,150 Q 215,170 205,190" stroke="hsl(20, 30%, 75%)" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
                      {/* RML and RLL hinted as smaller distal lumens within BI */}
                      <ellipse
                        cx="142" cy="218" rx="22" ry="20"
                        fill="hsl(0, 0%, 0%)" opacity="0.85"
                        stroke={selected === "rml" ? sideColors.right : "hsl(10, 30%, 22%)"}
                        strokeWidth={selected === "rml" ? 2.5 : 1}
                        onClick={() => setSelected("rml")}
                        className="cursor-pointer"
                        style={selected === "rml" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      <ellipse
                        cx="195" cy="220" rx="22" ry="22"
                        fill="hsl(0, 0%, 0%)" opacity="0.85"
                        stroke={selected === "rll" ? sideColors.right : "hsl(10, 30%, 22%)"}
                        strokeWidth={selected === "rll" ? 2.5 : 1}
                        onClick={() => setSelected("rll")}
                        className="cursor-pointer"
                        style={selected === "rll" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      <Hotspot cx={262} cy={118} r={5} isSelected={selected === "rul"} color={sideColors.right} onClick={() => setSelected("rul")} pulse />
                      <Hotspot cx={170} cy={200} r={5} isSelected={selected === "bronchus-intermedius"} color={sideColors.right} onClick={() => setSelected("bronchus-intermedius")} />
                    </>
                  )}
  
                  {/* === VIEW 3: Left main === */}
                  {view === "left-main" && (
                    <>
                      {/* LUL orifice — anterosuperior (top, slightly right on left-bronchus view) */}
                      <ellipse
                        cx="200" cy="115" rx="38" ry="40"
                        fill="url(#bvd-lumen)"
                        stroke={selected === "lul" ? sideColors.left : "hsl(10, 30%, 18%)"}
                        strokeWidth={selected === "lul" ? 3 : 1.5}
                        transform="rotate(15 200 115)"
                        onClick={() => setSelected("lul")}
                        className="cursor-pointer"
                        style={selected === "lul" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* Lingula — inferior subdivision shown as smaller lumen within LUL */}
                      <ellipse
                        cx="218" cy="138" rx="14" ry="13"
                        fill="hsl(0, 0%, 0%)" opacity="0.85"
                        stroke={selected === "lingula" ? sideColors.left : "hsl(10, 30%, 22%)"}
                        strokeWidth={selected === "lingula" ? 2.5 : 1}
                        onClick={() => setSelected("lingula")}
                        className="cursor-pointer"
                        style={selected === "lingula" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* LLL — large lumen continuing distally */}
                      <ellipse
                        cx="155" cy="220" rx="58" ry="60"
                        fill="url(#bvd-lumen)"
                        stroke={selected === "lll" ? sideColors.left : "hsl(10, 30%, 18%)"}
                        strokeWidth={selected === "lll" ? 3 : 1.5}
                        onClick={() => setSelected("lll")}
                        className="cursor-pointer"
                        style={selected === "lll" ? { filter: "url(#bvd-glow)" } : undefined}
                      />
                      {/* Internal carina between LUL and LLL */}
                      <path d="M 175,165 Q 168,180 160,195" stroke="hsl(20, 30%, 75%)" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
                      <Hotspot cx={200} cy={115} r={5} isSelected={selected === "lul"} color={sideColors.left} onClick={() => setSelected("lul")} pulse />
                      <Hotspot cx={155} cy={220} r={5} isSelected={selected === "lll"} color={sideColors.left} onClick={() => setSelected("lll")} />
                    </>
                  )}
                </g>
  
                {/* === Orientation overlay (outside FOV ring) === */}
                {showOrientation && (
                  <g pointerEvents="none">
                    {/* Compass: A (anterior) top, P (posterior) bottom, R/L sides */}
                    <text x="180" y="22" fontSize="11" fill="hsl(45, 90%, 60%)" textAnchor="middle" fontWeight="700" letterSpacing="1.5">ANTERIOR</text>
                    <text x="180" y="350" fontSize="11" fill="hsl(45, 90%, 60%)" textAnchor="middle" fontWeight="700" letterSpacing="1.5">POSTERIOR</text>
                    <text x="14" y="184" fontSize="11" fill="hsl(0, 70%, 65%)" fontWeight="700" letterSpacing="1.5">R</text>
                    <text x="340" y="184" fontSize="11" fill="hsl(210, 70%, 65%)" fontWeight="700" letterSpacing="1.5">L</text>
                    {/* Clock cues */}
                    <text x="180" y="40" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.7">12 — rings</text>
                    <text x="180" y="335" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.7">6 — membranous</text>
                  </g>
                )}
  
                {/* === Labels overlay === */}
                {showLabels && (
                  <g pointerEvents="none">
                    {view === "carina" && (
                      <>
                        <text x="115" y="184" fontSize="9" fill="hsl(0, 80%, 78%)" textAnchor="middle" fontWeight="600">RMB</text>
                        <text x="245" y="184" fontSize="9" fill="hsl(210, 80%, 78%)" textAnchor="middle" fontWeight="600">LMB</text>
                        <text x="180" y="100" fontSize="8" fill="hsl(var(--anatomy))" textAnchor="middle" fontWeight="600">Carina</text>
                      </>
                    )}
                    {view === "right-main" && (
                      <>
                        <text x="262" y="122" fontSize="9" fill="hsl(0, 80%, 78%)" textAnchor="middle" fontWeight="600">RUL</text>
                        <text x="170" y="204" fontSize="9" fill="hsl(0, 80%, 78%)" textAnchor="middle" fontWeight="600">BI</text>
                        <text x="142" y="222" fontSize="7" fill="hsl(0, 80%, 78%)" textAnchor="middle">RML</text>
                        <text x="195" y="224" fontSize="7" fill="hsl(0, 80%, 78%)" textAnchor="middle">RLL</text>
                      </>
                    )}
                    {view === "left-main" && (
                      <>
                        <text x="200" y="119" fontSize="9" fill="hsl(210, 80%, 80%)" textAnchor="middle" fontWeight="600">LUL</text>
                        <text x="218" y="141" fontSize="6.5" fill="hsl(210, 80%, 80%)" textAnchor="middle">Lingula</text>
                        <text x="155" y="224" fontSize="9" fill="hsl(210, 80%, 80%)" textAnchor="middle" fontWeight="600">LLL</text>
                      </>
                    )}
                  </g>
                )}
  
                {/* Scope shaft hint at bottom */}
                <rect x="2" y="2" width="356" height="356" rx="12" fill="none" stroke="hsl(220, 10%, 18%)" strokeWidth="1" />
              </svg>
            </div>
  
            <div className="flex-1 min-w-0 space-y-3">
              <div
                className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px]"
                style={{ borderLeftWidth: 4, borderLeftColor: sideColors[info.side] }}
                key={selected}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-foreground text-sm">{info.label}</p>
                  <span
                    className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md ml-auto"
                    style={{ background: `${sideColors[info.side]}22`, color: sideColors[info.side] }}
                  >
                    {info.side === "midline" ? "Midline" : info.side === "landmark" ? "Landmark" : info.side === "right" ? "Right side" : "Left side"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Bronchoscopy:</span> {info.detail}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Clinical:</span> {info.clinical}
                </p>
              </div>
  
              <div>
                <p className="text-[11px] text-muted-foreground font-medium mb-1.5 uppercase tracking-wide">Structures in this view</p>
                <div className="flex flex-wrap gap-1.5">
                  {cfg.visible.map((k) => (
                    <button
                      key={k}
                      onClick={() => setSelected(k)}
                      className={`text-xs px-2 py-1 rounded border transition-all flex items-center gap-1.5 ${
                        selected === k
                          ? "border-primary bg-primary/10 text-foreground font-medium"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sideColors[structures[k].side] }} />
                      {structures[k].label.split(" (")[0]}
                    </button>
                  ))}
                </div>
              </div>
  
              <div className="p-2.5 rounded-md bg-secondary/40 border border-border">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Orientation rule:</span> Hold the scope so cartilage rings sit at <strong>12 o'clock</strong> and the membranous wall at <strong>6 o'clock</strong>. The <span style={{ color: sideColors.right }} className="font-semibold">right</span> bronchial tree appears on the <span style={{ color: sideColors.right }} className="font-semibold">right of the screen</span>; the <span style={{ color: sideColors.left }} className="font-semibold">left</span> on the <span style={{ color: sideColors.left }} className="font-semibold">left</span> — anatomical convention, not mirrored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BronchoscopicViewDiagram;
