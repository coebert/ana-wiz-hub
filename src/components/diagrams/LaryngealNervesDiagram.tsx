import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type Branch = {
  id: string;
  label: string;
  desc: string;
  color: string;
};

const branches: Branch[] = [
  {
    id: "vagus",
    label: "Vagus Nerve (X)",
    desc: "Exits jugular foramen. Descends in carotid sheath (between ICA/CCA and IJV, posterior). Gives off SLN high in neck (from inferior vagal ganglion at C2), then RLN in thorax (left) or neck (right). Also gives cardiac branches and pharyngeal branch.",
    color: "#facc15",
  },
  {
    id: "sln",
    label: "Superior Laryngeal Nerve",
    desc: "Branches from vagus at C2 level near inferior ganglion. Divides into: Internal branch (sensory above vocal cords — pierces thyrohyoid membrane with superior laryngeal artery) and External branch (motor to cricothyroid — runs with superior thyroid artery, at risk in thyroid surgery).",
    color: "#4ade80",
  },
  {
    id: "iln",
    label: "Internal Laryngeal Nerve",
    desc: "Pure sensory + autonomic to laryngeal mucosa above vocal cords (supraglottis, epiglottis, vallecula, piriform fossa, aryepiglottic folds). Pierces thyrohyoid membrane 2–4mm below greater horn of hyoid with superior laryngeal artery. Lies submucosally in piriform fossa floor. Block target for awake intubation.",
    color: "#34d399",
  },
  {
    id: "eln",
    label: "External Laryngeal Nerve",
    desc: "Motor to cricothyroid muscle (tensor of vocal cords, increases pitch). Runs on inferior constrictor deep to superior thyroid artery. Cernea classification: Type 1 (>1cm above pole), Type 2a (<1cm above), Type 2b (below pole — highest risk). 'Nerve of Amelita Galli-Curci' — damage causes voice fatigue.",
    color: "#22d3ee",
  },
  {
    id: "rln-left",
    label: "Left RLN",
    desc: "Loops under aortic arch (posterior to ligamentum arteriosum) then ascends in tracheo-oesophageal groove. Longer course (12cm) = more vulnerable. Passes deep to Berry's ligament near Zuckerkandl's tubercle before entering larynx posterior to cricothyroid joint. At risk in thyroid, parathyroid, oesophageal, and aortic arch surgery.",
    color: "#f87171",
  },
  {
    id: "rln-right",
    label: "Right RLN",
    desc: "Loops under right subclavian artery then ascends obliquely to tracheo-oesophageal groove. Shorter course (5–6cm), more oblique. Non-recurrent laryngeal nerve variant (0.5–1%) — runs directly from vagus to larynx, associated with aberrant right subclavian artery (arteria lusoria). Passes deep to Berry's ligament.",
    color: "#fb923c",
  },
  {
    id: "rln-motor",
    label: "RLN Motor Supply",
    desc: "Motor to ALL intrinsic laryngeal muscles EXCEPT cricothyroid. Includes: posterior cricoarytenoid (ONLY abductor — opens cords), lateral cricoarytenoid (adducts), thyroarytenoid/vocalis (relaxes cords), interarytenoid (closes posterior glottis), oblique arytenoid (narrows inlet). Also sensory to mucosa below vocal cords (subglottis, upper trachea).",
    color: "#c084fc",
  },
  {
    id: "thyroid",
    label: "Thyroid & Landmarks",
    desc: "Thyroid lobes lateral to trachea. Superior thyroid artery (ECA branch) accompanies external SLN. Inferior thyroid artery (thyrocervical trunk) crosses posterior to RLN — variable relationship (nerve anterior 25%, posterior 50%, between branches 25%). Berry's ligament (posterior suspensory) tethers thyroid to trachea — RLN passes deep to it. Zuckerkandl's tubercle (posterior thyroid lobe extension) is a key landmark for identifying the RLN.",
    color: "#f472b6",
  },
  {
    id: "carotid-sheath",
    label: "Carotid Sheath",
    desc: "Fascial compartment containing: CCA/ICA (medial), IJV (lateral), vagus nerve (posteriorly, between vessels). Also contains deep cervical lymph nodes and ansa cervicalis. Extends from skull base to aortic arch. IJV and CCA relationship may vary — ultrasound-guided IJV cannulation avoids carotid puncture.",
    color: "#60a5fa",
  },
];

const LaryngealNervesDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = selected ? branches.find((b) => b.id === selected) : null;
  const hi = (id: string) => selected === id;
  const op = (id: string) => (selected && selected !== id ? 0.25 : 1);

  return (
    <div className="my-6">
      <DiagramToggleBar
        title="Laryngeal Nerve Supply"
        subtitle="Tap a structure to see its course, function, and clinical relevance."
        toggles={[
          { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
          { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-4">
        <svg viewBox="0 0 460 620" className="w-full max-w-[460px] mx-auto" style={{ background: "hsl(var(--card))" }}>
          <defs>
            {/* Depth gradients */}
            <linearGradient id="ln-aortaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <radialGradient id="ln-thyroidGrad" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="60%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="0.45" />
            </radialGradient>
            <radialGradient id="ln-tracheaGrad" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#a16207" stopOpacity="0.25" />
            </radialGradient>
            <radialGradient id="ln-larynxGrad" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="ln-vesselRed" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
            <radialGradient id="ln-vesselBlue" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#1e40af" />
            </radialGradient>
            {/* Subtle tissue grain */}
            <pattern id="ln-grain" patternUnits="userSpaceOnUse" width="6" height="6">
              <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
            </pattern>
            {/* Shadow for depth */}
            <filter id="ln-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
              <feOffset dx="0.5" dy="1.5" result="off" />
              <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Compass arrow marker */}
            <marker id="ln-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
            </marker>
          </defs>

          {/* Compass */}
          {showLabels && (
            <>
              <text x="20" y="14" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">SUPERIOR</text>
              <text x="20" y="610" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">INFERIOR</text>
            </>
          )}

          {/* === CAROTID SHEATH (left) === */}
          <ellipse cx="148" cy="100" rx="14" ry="12"
            fill={hi("carotid-sheath") ? "#60a5fa" : "transparent"}
            fillOpacity={0.1}
            stroke="hsl(var(--primary))"
            strokeWidth={hi("carotid-sheath") ? 2 : 0.8}
            strokeDasharray={hi("carotid-sheath") ? "" : "3 2"}
            opacity={op("carotid-sheath")}
            onClick={() => setSelected(selected === "carotid-sheath" ? null : "carotid-sheath")}
            className="cursor-pointer"
          />
          <circle cx="143" cy="98" r="5" fill="url(#ln-vesselRed)" stroke="hsl(var(--destructive))" strokeWidth="0.5" opacity={op("carotid-sheath")} filter="url(#ln-shadow)" />
          <text x="143" y="100" textAnchor="middle" fontSize="3.5" fill="hsl(var(--background))" opacity={op("carotid-sheath")} fontWeight="600">CCA</text>
          <ellipse cx="155" cy="98" rx="6" ry="5" fill="url(#ln-vesselBlue)" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity={op("carotid-sheath")} filter="url(#ln-shadow)" />
          <text x="155" y="100" textAnchor="middle" fontSize="3.5" fill="hsl(var(--background))" opacity={op("carotid-sheath")} fontWeight="600">IJV</text>
          {hi("carotid-sheath") && showLabels && (
            <text x="115" y="88" fontSize="7" fill="hsl(var(--primary))" fontWeight="600">Carotid sheath</text>
          )}

          {/* === CAROTID SHEATH (right) === */}
          <ellipse cx="315" cy="100" rx="14" ry="12"
            fill={hi("carotid-sheath") ? "#60a5fa" : "transparent"}
            fillOpacity={0.1}
            stroke="hsl(var(--primary))"
            strokeWidth={hi("carotid-sheath") ? 2 : 0.8}
            strokeDasharray={hi("carotid-sheath") ? "" : "3 2"}
            opacity={op("carotid-sheath")}
            onClick={() => setSelected(selected === "carotid-sheath" ? null : "carotid-sheath")}
            className="cursor-pointer"
          />
          <circle cx="320" cy="98" r="5" fill="url(#ln-vesselRed)" stroke="hsl(var(--destructive))" strokeWidth="0.5" opacity={op("carotid-sheath")} filter="url(#ln-shadow)" />
          <ellipse cx="308" cy="98" rx="6" ry="5" fill="url(#ln-vesselBlue)" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity={op("carotid-sheath")} filter="url(#ln-shadow)" />

          {/* === TRACHEA — anatomically shaped with cartilaginous rings === */}
          <rect x="200" y="160" width="60" height="380" rx="28" fill="url(#ln-tracheaGrad)" stroke="hsl(var(--accent))" strokeWidth="1.5" filter="url(#ln-shadow)" />
          {/* C-shaped cartilage rings */}
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <path key={i}
              d={`M204,${185 + i * 40} Q230,${178 + i * 40} 256,${185 + i * 40}`}
              stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round" />
          ))}
          {/* Posterior membranous wall (annular ligament) */}
          {showSutures && [0,1,2,3,4,5,6,7,8].map(i => (
            <line key={`m${i}`} x1="208" y1={205 + i * 40} x2="252" y2={205 + i * 40}
              stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.35" />
          ))}
          {showLabels && <text x="230" y="525" textAnchor="middle" fontSize="8" fill="hsl(var(--accent))" fontWeight="600">Trachea</text>}

          {/* === OESOPHAGUS — behind trachea, partially visible === */}
          <ellipse cx="230" cy="560" rx="20" ry="11" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.55" />
          {/* Mucosal folds */}
          {showSutures && (
            <>
              <path d="M215,560 Q230,557 245,560" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" opacity="0.4" />
              <path d="M215,562 Q230,565 245,562" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" opacity="0.4" />
            </>
          )}
          {showLabels && <text x="230" y="563" textAnchor="middle" fontSize="6" fill="hsl(var(--accent))" fontWeight="600">Oesoph.</text>}

          {/* T-O groove indicator */}
          {showSutures && showLabels && (
            <text x="198" y="278" fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.5" transform="rotate(-90 198 278)">Tracheo-oesoph. groove</text>
          )}

          {/* === AORTIC ARCH — anatomically curved with depth === */}
          <path
            d="M300,490 Q300,420 280,398 Q250,365 220,398 Q200,420 200,490"
            fill="none" stroke="url(#ln-aortaGrad)" strokeWidth="3" strokeLinecap="round" opacity={0.85}
            filter="url(#ln-shadow)"
          />
          {/* Inner highlight on arch (vessel lumen suggestion) */}
          <path
            d="M300,490 Q300,420 280,398 Q250,365 220,398 Q200,420 200,490"
            fill="none" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" opacity="0.4"
            transform="translate(0,-4)"
          />
          {showLabels && <text x="250" y="392" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))" fontWeight="700">Aortic Arch</text>}

          {/* Ligamentum arteriosum */}
          {showSutures && (
            <>
              <line x1="255" y1="380" x2="270" y2="358" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4 2" opacity={op("rln-left")} />
              {showLabels && <text x="280" y="355" fontSize="6.5" fill="hsl(var(--muted-foreground))" opacity={op("rln-left")}>Lig. arteriosum</text>}
            </>
          )}

          {/* Right subclavian — with depth gradient */}
          <path d="M300,480 Q330,470 370,465" fill="none" stroke="url(#ln-aortaGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.7" filter="url(#ln-shadow)" />
          {showLabels && <text x="375" y="460" fontSize="7" fill="hsl(var(--destructive))" fontWeight="600">R. Subclavian A.</text>}

          {/* === THYROID GLAND — paired lobes with realistic shape === */}
          {/* Left lobe: anatomical pyriform shape */}
          <path
            d="M175,195 C155,200 148,225 150,255 C152,280 165,290 178,288 C190,285 200,270 200,250 C200,225 195,205 188,198 C184,194 180,193 175,195 Z"
            fill={hi("thyroid") ? "#fbcfe8" : "url(#ln-thyroidGrad)"}
            stroke={hi("thyroid") ? "#ec4899" : "#9d174d"}
            strokeWidth={hi("thyroid") ? 2.5 : 1.5}
            opacity={op("thyroid")}
            onClick={() => setSelected(selected === "thyroid" ? null : "thyroid")}
            className="cursor-pointer"
            filter="url(#ln-shadow)"
          />
          {/* Right lobe (mirror) */}
          <path
            d="M285,195 C305,200 312,225 310,255 C308,280 295,290 282,288 C270,285 260,270 260,250 C260,225 265,205 272,198 C276,194 280,193 285,195 Z"
            fill={hi("thyroid") ? "#fbcfe8" : "url(#ln-thyroidGrad)"}
            stroke={hi("thyroid") ? "#ec4899" : "#9d174d"}
            strokeWidth={hi("thyroid") ? 2.5 : 1.5}
            opacity={op("thyroid")}
            onClick={() => setSelected(selected === "thyroid" ? null : "thyroid")}
            className="cursor-pointer"
            filter="url(#ln-shadow)"
          />
          {/* Isthmus — joins lobes anteriorly across trachea */}
          <path d="M195,235 Q230,228 265,235 Q265,245 230,247 Q195,245 195,235 Z"
            fill="url(#ln-thyroidGrad)" stroke="hsl(var(--accent))" strokeWidth="1" opacity={op("thyroid") * 0.85} />
          {/* Vascular pattern hint on lobes */}
          {showSutures && (
            <g opacity={op("thyroid") * 0.4} stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none">
              <path d="M170,210 Q175,235 178,265" />
              <path d="M185,205 Q188,235 188,275" />
              <path d="M290,210 Q285,235 282,265" />
              <path d="M275,205 Q272,235 272,275" />
            </g>
          )}
          {showLabels && (
            <>
              <text x="170" y="245" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontWeight="600" opacity={op("thyroid")}>Thyroid</text>
              <text x="290" y="245" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontWeight="600" opacity={op("thyroid")}>Thyroid</text>
            </>
          )}

          {/* Zuckerkandl's tubercle — posterior extension, key RLN landmark */}
          <ellipse cx="195" cy="225" rx="5" ry="9"
            fill={hi("thyroid") ? "#f9a8d4" : "#fce7f3"}
            stroke={hi("thyroid") ? "#be185d" : "#9d174d"}
            strokeWidth={hi("thyroid") ? 1.8 : 0.8}
            opacity={op("thyroid")}
          />
          <ellipse cx="265" cy="225" rx="5" ry="9"
            fill={hi("thyroid") ? "#f9a8d4" : "#fce7f3"}
            stroke={hi("thyroid") ? "#be185d" : "#9d174d"}
            strokeWidth={hi("thyroid") ? 1.8 : 0.8}
            opacity={op("thyroid")}
          />
          {hi("thyroid") && showLabels && (
            <>
              <text x="158" y="223" textAnchor="end" fontSize="5" fill="hsl(var(--accent))" fontWeight="600">Zuckerkandl's</text>
              <text x="158" y="230" textAnchor="end" fontSize="5" fill="hsl(var(--accent))">tubercle</text>
            </>
          )}

          {/* Berry's ligament — tethers thyroid to cricoid/trachea (RLN passes deep) */}
          {showSutures && (
            <>
              <line x1="195" y1="215" x2="203" y2="207" stroke={hi("thyroid") ? "#be185d" : "#9d174d"} strokeWidth={hi("thyroid") ? 2 : 1} strokeDasharray="2 1.5" opacity={op("thyroid")} />
              <line x1="265" y1="215" x2="257" y2="207" stroke={hi("thyroid") ? "#be185d" : "#9d174d"} strokeWidth={hi("thyroid") ? 2 : 1} strokeDasharray="2 1.5" opacity={op("thyroid")} />
              {hi("thyroid") && showLabels && (
                <text x="230" y="204" textAnchor="middle" fontSize="5" fill="hsl(var(--accent))" fontWeight="600">Berry's lig.</text>
              )}
            </>
          )}

          {/* Superior thyroid artery — with depth */}
          <path d="M140,170 Q155,188 172,200" fill="none" stroke="url(#ln-vesselRed)" strokeWidth="2" opacity={op("eln")} strokeLinecap="round" />
          {showLabels && <text x="115" y="168" fontSize="6.5" fill="hsl(var(--destructive))" opacity={op("eln")} fontWeight="600">Sup. thyroid A.</text>}

          {/* Inferior thyroid artery */}
          <path d="M118,322 Q150,302 178,278" fill="none" stroke="url(#ln-vesselRed)" strokeWidth="2" opacity={op("thyroid")} strokeLinecap="round" />
          {showLabels && <text x="92" y="328" fontSize="6.5" fill="hsl(var(--destructive))" opacity={op("thyroid")} fontWeight="600">Inf. thyroid A.</text>}
          {hi("thyroid") && showLabels && (
            <g fill="hsl(var(--muted-foreground))" fontSize="5">
              <text x="92" y="340">ITA-RLN relationship:</text>
              <text x="92" y="348">• Nerve posterior 50%</text>
              <text x="92" y="356">• Nerve anterior 25%</text>
              <text x="92" y="364">• Between branches 25%</text>
            </g>
          )}

          {/* === LARYNX — shaped like a shield (thyroid cartilage) === */}
          <path
            d="M195,108 L265,108 L268,128 Q258,148 230,160 Q202,148 192,128 Z"
            fill="url(#ln-larynxGrad)" stroke="hsl(var(--primary))" strokeWidth="1.5" filter="url(#ln-shadow)"
          />
          {/* Laryngeal prominence (Adam's apple) */}
          <path d="M225,108 L230,114 L235,108" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.6" />
          {showLabels && <text x="230" y="125" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="700">Larynx</text>}

          {/* Thyrohyoid membrane */}
          {showSutures && (
            <>
              <line x1="195" y1="108" x2="265" y2="108" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
              {showLabels && <text x="275" y="110" fontSize="5.5" fill="hsl(var(--primary))">Thyrohyoid memb.</text>}
            </>
          )}

          {/* Vocal cords — pearly white inside larynx */}
          <line x1="208" y1="142" x2="252" y2="142" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <line x1="208" y1="144" x2="252" y2="144" stroke="hsl(var(--background))" strokeWidth="0.5" strokeLinecap="round" />
          {showLabels && <text x="275" y="145" fontSize="5.5" fill="hsl(var(--primary))">Vocal cords</text>}

          {/* Cricothyroid muscle — paired triangular slips */}
          <path d="M210,158 L240,158 L248,168 L232,170 L222,170 L212,168 Z"
            fill="url(#ln-larynxGrad)" stroke="hsl(var(--primary))" strokeWidth="1" opacity={op("eln") * 0.8} />
          {showLabels && <text x="275" y="166" fontSize="5.5" fill="hsl(var(--primary))" opacity={op("eln")}>Cricothyroid m.</text>}

          {/* Entry point label — RLN enters posterior to CT joint */}
          {showSutures && showLabels && (
            <text x="188" y="174" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.6">← RLN entry (post. to CT joint)</text>
          )}

          {/* === VAGUS NERVES — paired, thick yellow with shadow === */}
          {[150, 320].map((x, i) => (
            <g key={i}>
              <path
                d={`M${x},60 L${x},140`}
                fill="none" stroke={hi("vagus") ? "#a16207" : "#facc15"} strokeWidth={hi("vagus") ? 4.5 : 3.5}
                opacity={op("vagus")}
                strokeLinecap="round"
                onClick={() => setSelected(selected === "vagus" ? null : "vagus")}
                className="cursor-pointer"
                filter={hi("vagus") ? "url(#ln-shadow)" : undefined}
              />
              {/* Inner highlight along nerve fascicle */}
              <line x1={x} y1="60" x2={x} y2="140"
                stroke="hsl(var(--accent))" strokeWidth="0.75" opacity={op("vagus") * 0.7} />
            </g>
          ))}
          {showLabels && (
            <>
              <text x="140" y="55" textAnchor="middle" fontSize="8.5" fill="hsl(var(--accent))" fontWeight="700" opacity={op("vagus")}>L. Vagus (X)</text>
              <text x="330" y="55" textAnchor="middle" fontSize="8.5" fill="hsl(var(--accent))" fontWeight="700" opacity={op("vagus")}>R. Vagus (X)</text>
            </>
          )}

          {/* Left vagus continues to thorax (dashed) */}
          <path
            d="M150,140 L150,400 Q155,420 200,438"
            fill="none" stroke="hsl(var(--accent))" strokeWidth="2" opacity={op("vagus")} strokeDasharray="6 3"
            strokeLinecap="round"
          />
          {/* Right vagus continues */}
          <path
            d="M320,140 L320,460"
            fill="none" stroke="hsl(var(--accent))" strokeWidth="2" opacity={op("vagus")} strokeDasharray="6 3"
            strokeLinecap="round"
          />

          {/* === SLN — left & right === */}
          <path
            d="M150,100 Q165,95 185,100"
            fill="none" stroke={hi("sln") ? "#15803d" : "#4ade80"} strokeWidth={hi("sln") ? 4 : 2.8}
            opacity={op("sln")} strokeLinecap="round"
            onClick={() => setSelected(selected === "sln" ? null : "sln")}
            className="cursor-pointer"
          />
          <path
            d="M320,100 Q305,95 280,100"
            fill="none" stroke={hi("sln") ? "#15803d" : "#4ade80"} strokeWidth={hi("sln") ? 4 : 2.8}
            opacity={op("sln")} strokeLinecap="round"
            onClick={() => setSelected(selected === "sln" ? null : "sln")}
            className="cursor-pointer"
          />
          {showLabels && (
            <>
              <text x="170" y="92" textAnchor="middle" fontSize="7.5" fill="hsl(var(--clinical))" fontWeight="600" opacity={op("sln")}>SLN</text>
              <text x="295" y="92" textAnchor="middle" fontSize="7.5" fill="hsl(var(--clinical))" fontWeight="600" opacity={op("sln")}>SLN</text>
            </>
          )}

          {/* Internal laryngeal nerve — pierces thyrohyoid membrane (left + right) */}
          <path
            d="M185,100 Q190,105 195,114"
            fill="none" stroke={hi("iln") ? "#047857" : "#34d399"} strokeWidth={hi("iln") ? 3.5 : 2.2}
            opacity={op("iln")} strokeLinecap="round"
            onClick={() => setSelected(selected === "iln" ? null : "iln")}
            className="cursor-pointer"
          />
          <circle cx="195" cy="114" r="3" fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth="0.75" opacity={op("iln")} />
          <path d="M280,100 Q272,105 268,114" fill="none" stroke={hi("iln") ? "#047857" : "#34d399"} strokeWidth={hi("iln") ? 3.5 : 2.2} opacity={op("iln")} strokeLinecap="round" />
          <circle cx="268" cy="114" r="3" fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth="0.75" opacity={op("iln")} />
          {showLabels && (
            <>
              <text x="183" y="123" fontSize="6.5" fill="hsl(var(--clinical))" opacity={op("iln")} fontWeight="600">ILN</text>
              {hi("iln") && <text x="158" y="132" fontSize="5.5" fill="hsl(var(--clinical))" fontStyle="italic" opacity={op("iln")}>(sensory above cords)</text>}
            </>
          )}

          {/* External laryngeal nerve — descends to cricothyroid */}
          <path
            d="M185,100 Q180,120 185,145 Q188,158 215,162"
            fill="none" stroke={hi("eln") ? "#0e7490" : "#22d3ee"} strokeWidth={hi("eln") ? 3.5 : 2.2}
            opacity={op("eln")} strokeLinecap="round"
            onClick={() => setSelected(selected === "eln" ? null : "eln")}
            className="cursor-pointer"
          />
          <circle cx="215" cy="162" r="3" fill="hsl(var(--icu))" stroke="hsl(var(--icu))" strokeWidth="0.75" opacity={op("eln")} />
          <path d="M280,100 Q285,120 275,145 Q272,158 245,162" fill="none" stroke={hi("eln") ? "#0e7490" : "#22d3ee"} strokeWidth={hi("eln") ? 3.5 : 2.2} opacity={op("eln")} strokeLinecap="round" />
          <circle cx="245" cy="162" r="3" fill="hsl(var(--icu))" stroke="hsl(var(--icu))" strokeWidth="0.75" opacity={op("eln")} />
          {showLabels && (
            <>
              <text x="178" y="152" fontSize="6.5" fill="hsl(var(--icu))" opacity={op("eln")} fontWeight="600">ELN</text>
              {hi("eln") && <text x="148" y="160" fontSize="5.5" fill="hsl(var(--icu))" fontStyle="italic" opacity={op("eln")}>(motor to cricothyroid)</text>}
            </>
          )}

          {/* Cernea classification for ELN */}
          {hi("eln") && showLabels && (
            <g fill="hsl(var(--icu))" fontSize="5">
              <text x="138" y="180">Cernea: Type 1 (&gt;1cm above pole)</text>
              <text x="138" y="188">Type 2a (&lt;1cm above)</text>
              <text x="138" y="196" fontWeight="700">Type 2b (below pole — highest risk)</text>
            </g>
          )}

          {/* === LEFT RLN — looping under aortic arch with smoother curve === */}
          <path
            d="M200,438 Q212,452 222,440 Q228,418 224,378 Q221,338 217,298 Q213,268 211,238 Q209,200 206,168"
            fill="none" stroke={hi("rln-left") ? "#b91c1c" : "#f87171"} strokeWidth={hi("rln-left") ? 4 : 2.8}
            opacity={op("rln-left")} strokeLinecap="round"
            onClick={() => setSelected(selected === "rln-left" ? null : "rln-left")}
            className="cursor-pointer"
            filter={hi("rln-left") ? "url(#ln-shadow)" : undefined}
          />
          {showLabels && <text x="190" y="350" fontSize="7.5" fill="hsl(var(--destructive))" fontWeight="600" opacity={op("rln-left")} transform="rotate(-90 190 350)">L. RLN</text>}
          <circle cx="200" cy="438" r="4.5" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity={op("rln-left")} />
          {hi("rln-left") && showLabels && (
            <text x="172" y="420" fontSize="5" fill="hsl(var(--destructive))" fontWeight="600">Loops under arch (12 cm course)</text>
          )}

          {/* === RIGHT RLN — loops under right subclavian === */}
          <path
            d="M320,460 Q336,476 346,464 Q352,448 344,428 Q336,388 331,338 Q326,288 316,248 Q311,218 306,188 Q304,174 270,168"
            fill="none" stroke={hi("rln-right") ? "#c2410c" : "#fb923c"} strokeWidth={hi("rln-right") ? 4 : 2.8}
            opacity={op("rln-right")} strokeLinecap="round"
            onClick={() => setSelected(selected === "rln-right" ? null : "rln-right")}
            className="cursor-pointer"
            filter={hi("rln-right") ? "url(#ln-shadow)" : undefined}
          />
          {showLabels && <text x="340" y="340" fontSize="7.5" fill="hsl(var(--accent))" fontWeight="600" opacity={op("rln-right")} transform="rotate(90 340 340)">R. RLN</text>}
          <circle cx="320" cy="460" r="4.5" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity={op("rln-right")} />
          {hi("rln-right") && showLabels && (
            <text x="350" y="420" fontSize="5" fill="hsl(var(--accent))" fontWeight="600">Shorter (5–6 cm), more oblique</text>
          )}

          {/* Non-recurrent RLN variant */}
          {hi("rln-right") && (
            <>
              <path d="M320,120 Q310,140 295,155 Q280,162 270,168"
                fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.55" strokeLinecap="round" />
              {showLabels && (
                <>
                  <text x="330" y="135" fontSize="5" fill="hsl(var(--accent))" opacity="0.8">Non-recurrent variant</text>
                  <text x="330" y="143" fontSize="5" fill="hsl(var(--accent))" opacity="0.8">(0.5–1%, with arteria lusoria)</text>
                </>
              )}
            </>
          )}

          {/* RLN motor endpoint arrows into larynx */}
          <path d="M206,168 L210,158" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" opacity={op("rln-left")} strokeLinecap="round" />
          <path d="M270,168 L266,158" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" opacity={op("rln-right")} strokeLinecap="round" />

          {/* RLN motor label */}
          {(selected === "rln-motor" || !selected) && showLabels && (
            <text x="230" y="178" textAnchor="middle" fontSize="5.5" fill="hsl(var(--pharmacology))" fontWeight="600">Motor: all intrinsic mm. except cricothyroid</text>
          )}

          {/* Sensory territory annotations */}
          {(selected === "iln" || selected === "rln-motor") && showLabels && (
            <>
              <line x1="195" y1="118" x2="195" y2="140" stroke="hsl(var(--clinical))" strokeWidth="1" strokeDasharray="2 2" />
              <text x="178" y="137" fontSize="6" fill="hsl(var(--clinical))" fontWeight="600">↑ Sensory above</text>
              <line x1="208" y1="168" x2="208" y2="148" stroke="hsl(var(--pharmacology))" strokeWidth="1" strokeDasharray="2 2" />
              <text x="232" y="188" fontSize="6" fill="hsl(var(--pharmacology))" fontWeight="600">↓ Sensory below</text>
            </>
          )}

          {/* Hyoid bone — curved with greater horns */}
          <path d="M178,95 Q200,86 230,86 Q260,86 282,95"
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <circle cx="178" cy="95" r="2" fill="hsl(var(--foreground))" opacity="0.4" />
          <circle cx="282" cy="95" r="2" fill="hsl(var(--foreground))" opacity="0.4" />
          {showLabels && <text x="230" y="80" textAnchor="middle" fontSize="6.5" fill="hsl(var(--muted-foreground))" fontWeight="600">Hyoid (greater horns)</text>}
        </svg>

        {/* Legend buttons */}
        <div className="flex flex-col gap-1.5 min-w-[170px]">
          {branches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(selected === b.id ? null : b.id)}
              className={`text-left text-xs px-2.5 py-1.5 rounded border transition-all ${
                selected === b.id
                  ? "border-primary bg-primary/10 font-semibold text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ background: b.color }} />
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {info && (
        <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
          <p className="font-semibold text-foreground text-sm">{info.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{info.desc}</p>
        </div>
      )}
    </div>
  );
};

export default LaryngealNervesDiagram;
