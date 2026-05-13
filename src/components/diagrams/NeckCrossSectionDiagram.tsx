import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Structure = {
  id: string;
  label: string;
  desc: string;
  color: string;
  paths: string[];
};

const structures: Structure[] = [
  {
    id: "skin",
    label: "Skin & Platysma",
    desc: "Superficial layer. Platysma — thin sheet muscle in superficial fascia, supplied by facial nerve (VII). Covers anterior and lateral neck.",
    color: "#e8c9a0",
    paths: [],
  },
  {
    id: "scf",
    label: "Superficial Cervical Fascia",
    desc: "Loose areolar tissue deep to platysma. Contains cutaneous nerves, superficial veins (EJV, anterior jugular), and lymph nodes.",
    color: "#f5deb3",
    paths: [],
  },
  {
    id: "investing",
    label: "Investing (Superficial) Layer of DCF",
    desc: "Encircles entire neck. Splits to enclose SCM and trapezius. Attaches to mandible, mastoid, hyoid, spine of scapula, clavicle. Forms roof of posterior triangle.",
    color: "#a8d5ba",
    paths: [],
  },
  {
    id: "pretracheal",
    label: "Pretracheal (Middle) Layer",
    desc: "Muscular layer: encloses infrahyoid strap muscles. Visceral layer: encloses thyroid, trachea, oesophagus, recurrent laryngeal nerve. Blends with pericardium inferiorly — spread of neck infections to mediastinum.",
    color: "#93c5fd",
    paths: [],
  },
  {
    id: "prevertebral",
    label: "Prevertebral (Deep) Layer",
    desc: "Covers prevertebral muscles (longus colli/capitis) and vertebral column. Forms floor of posterior triangle. Alar fascia anteriorly creates 'danger space' — connects to posterior mediastinum.",
    color: "#c4b5fd",
    paths: [],
  },
  {
    id: "carotid",
    label: "Carotid Sheath",
    desc: "Condensation of all three DCF layers. Contains: CCA (medial), IJV (lateral), vagus nerve (posterior, between vessels). Also contains deep cervical lymph nodes and ansa cervicalis root. IJV sits lateral and slightly anterior to CCA at C6.",
    color: "#fca5a5",
    paths: [],
  },
  {
    id: "trachea",
    label: "Trachea & Oesophagus",
    desc: "Trachea anterior, oesophagus posterior (slightly left). C6 = cricoid cartilage level. Recurrent laryngeal nerve in tracheo-oesophageal groove. Isthmus of thyroid overlies tracheal rings 2–4.",
    color: "#fcd34d",
    paths: [],
  },
  {
    id: "thyroid",
    label: "Thyroid Gland",
    desc: "Lateral lobes flank trachea, connected by isthmus. Enclosed by pretracheal fascia. Blood supply: superior (ECA) and inferior (thyrocervical trunk) thyroid arteries. Intimate relation to RLN.",
    color: "#f9a8d4",
    paths: [],
  },
  {
    id: "vertebral",
    label: "Vertebral Body & Muscles",
    desc: "C6 vertebral body with carotid tubercle (Chassaignac's) — landmark for stellate ganglion block, vertebral artery entry into transverse foramen. Longus colli muscles anterolateral to body.",
    color: "#d4d4d8",
    paths: [],
  },
  {
    id: "scm",
    label: "Sternocleidomastoid",
    desc: "Key landmark muscle. Enclosed by investing layer. Divides neck into anterior and posterior triangles. Motor: accessory nerve (XI). Sensory: C2,3. Surface marking for IJV access.",
    color: "#f87171",
    paths: [],
  },
];

const NeckCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = selected ? structures.find((s) => s.id === selected) : null;

  const highlight = (id: string) => selected === id;
  const opacity = (id: string) => (selected && selected !== id ? 0.3 : 1);

  return (
    <DiagramFigure
      id="neck-cross-section-diagram"
      title="Neck cross section"
      description="Auto-generated wrapper for the Neck cross section anatomical diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6">
        <DiagramToggleBar
          title="Cross-Section of Neck at C6 Level"
          subtitle="Tap a structure to explore its contents and clinical relevance."
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures(v => !v) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels(v => !v) },
          ]}
        />
        <div className="flex flex-col lg:flex-row gap-4">
          <svg viewBox="0 0 500 500" className="w-full max-w-[500px] mx-auto" style={{ background: "hsl(var(--card))" }}>
            <defs>
              <radialGradient id="ncx-skinGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#fbe9c8" />
                <stop offset="70%" stopColor="#e8c9a0" />
                <stop offset="100%" stopColor="#b8956c" />
              </radialGradient>
              <radialGradient id="ncx-bodyGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#f4f4f4" />
                <stop offset="100%" stopColor="#a8a8a8" />
              </radialGradient>
              <radialGradient id="ncx-tracheaGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fffbe6" />
                <stop offset="100%" stopColor="#fde68a" />
              </radialGradient>
              <radialGradient id="ncx-thyroidGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#fde7f3" />
                <stop offset="100%" stopColor="#f3a5cb" />
              </radialGradient>
              <radialGradient id="ncx-vesselGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
              <radialGradient id="ncx-veinGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#1e3a5f" />
              </radialGradient>
              <radialGradient id="ncx-scmGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#fecaca" />
                <stop offset="100%" stopColor="#b91c1c" />
              </radialGradient>
              <pattern id="ncx-grain" patternUnits="userSpaceOnUse" width="6" height="6">
                <rect width="6" height="6" fill="transparent" />
                <circle cx="1.5" cy="1.5" r="0.4" fill="hsl(var(--accent))" opacity="0.18" />
                <circle cx="4.5" cy="4.5" r="0.4" fill="hsl(var(--accent))" opacity="0.12" />
              </pattern>
              <pattern id="ncx-muscleFibre" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M0,2 L4,2" stroke="hsl(var(--destructive))" strokeWidth="0.5" opacity="0.35" />
              </pattern>
              <filter id="ncx-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="1" result="off" />
                <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
  
            {/* Skin outline — outer ellipse with depth shading */}
            <ellipse
              cx="250" cy="250" rx="220" ry="200"
              fill="url(#ncx-skinGrad)"
              stroke={highlight("skin") ? "#f59e0b" : "#a0886a"}
              strokeWidth={highlight("skin") ? 3 : 1.5}
              opacity={opacity("skin")}
              filter="url(#ncx-shadow)"
              onClick={() => setSelected(selected === "skin" ? null : "skin")}
              className="cursor-pointer"
            />
            {/* Grain texture overlay */}
            <ellipse cx="250" cy="250" rx="218" ry="198" fill="url(#ncx-grain)" opacity="0.55" pointerEvents="none" />
            {/* Platysma demarcation */}
            {showSutures && (
              <ellipse cx="250" cy="250" rx="208" ry="188" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.55" pointerEvents="none" />
            )}
            {/* Alar fascia (danger space) */}
            {showSutures && (
              <path d="M170,300 Q200,290 250,288 Q300,290 330,300" fill="none" stroke="hsl(var(--pharmacology))" strokeWidth="0.5" strokeDasharray="1.5 2" opacity="0.5" pointerEvents="none" />
            )}
  
            {/* Investing layer */}
            <ellipse
              cx="250" cy="250" rx="195" ry="175"
              fill="none"
              stroke={highlight("investing") ? "#16a34a" : "#6aaa80"}
              strokeWidth={highlight("investing") ? 4 : 2}
              strokeDasharray={highlight("investing") ? "none" : "8 4"}
              opacity={opacity("investing")}
              onClick={() => setSelected(selected === "investing" ? null : "investing")}
              className="cursor-pointer"
            />
            {showLabels && (!selected || selected === "investing") ? (
              <text x="250" y="82" textAnchor="middle" fontSize="9" fill="hsl(var(--clinical))" fontWeight="600">Investing Layer</text>
            ) : null}
  
            {/* Pretracheal layer — inner ellipse around viscera */}
            <ellipse
              cx="250" cy="230" rx="95" ry="70"
              fill={highlight("pretracheal") ? "#93c5fd33" : "none"}
              stroke={highlight("pretracheal") ? "#3b82f6" : "#60a5fa"}
              strokeWidth={highlight("pretracheal") ? 3 : 1.5}
              strokeDasharray="6 3"
              opacity={opacity("pretracheal")}
              onClick={() => setSelected(selected === "pretracheal" ? null : "pretracheal")}
              className="cursor-pointer"
            />
            {showLabels && (!selected || selected === "pretracheal") ? (
              <text x="250" y="155" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="600">Pretracheal Layer</text>
            ) : null}
  
            {/* Prevertebral layer */}
            <path
              d="M155,320 Q155,280 175,260 Q200,235 250,230 Q300,235 325,260 Q345,280 345,320 L345,350 Q300,360 250,360 Q200,360 155,350 Z"
              fill={highlight("prevertebral") ? "#c4b5fd33" : "none"}
              stroke={highlight("prevertebral") ? "#7c3aed" : "#a78bfa"}
              strokeWidth={highlight("prevertebral") ? 3 : 1.5}
              strokeDasharray="6 3"
              opacity={opacity("prevertebral")}
              onClick={() => setSelected(selected === "prevertebral" ? null : "prevertebral")}
              className="cursor-pointer"
            />
            {showLabels && (!selected || selected === "prevertebral") ? (
              <text x="250" y="375" textAnchor="middle" fontSize="8" fill="hsl(var(--pharmacology))" fontWeight="600">Prevertebral Layer</text>
            ) : null}
  
            {/* Vertebral body */}
            <rect
              x="215" y="300" width="70" height="55" rx="8"
              fill={highlight("vertebral") ? "#a1a1aa" : "url(#ncx-bodyGrad)"}
              stroke={highlight("vertebral") ? "#f59e0b" : "#888"}
              strokeWidth={highlight("vertebral") ? 3 : 1.5}
              opacity={opacity("vertebral")}
              onClick={() => setSelected(selected === "vertebral" ? null : "vertebral")}
              className="cursor-pointer"
            />
            <text x="250" y="332" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="700" opacity={opacity("vertebral")}>C6</text>
            {/* Transverse processes / carotid tubercle */}
            <rect x="175" y="310" width="40" height="12" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity={opacity("vertebral")} />
            <rect x="285" y="310" width="40" height="12" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity={opacity("vertebral")} />
            {showLabels && (!selected || selected === "vertebral") ? (
              <>
                <text x="165" y="308" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Carotid</text>
                <text x="165" y="316" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">tubercle</text>
              </>
            ) : null}
            {/* Spinous process */}
            <path d="M245,355 L250,390 L255,355" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity={opacity("vertebral")} />
            {/* Spinal cord */}
            <ellipse cx="250" cy="300" rx="12" ry="10" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="1" opacity={opacity("vertebral")} />
            <text x="250" y="295" textAnchor="middle" fontSize="6" fill="hsl(var(--accent))" opacity={opacity("vertebral")}>Cord</text>
  
            {/* Longus colli muscles */}
            <ellipse cx="220" cy="290" rx="15" ry="10" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" strokeWidth="1" opacity={opacity("vertebral")} />
            <ellipse cx="280" cy="290" rx="15" ry="10" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" strokeWidth="1" opacity={opacity("vertebral")} />
            {showLabels && (!selected || selected === "vertebral") ? (
              <text x="250" y="280" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">Longus colli</text>
            ) : null}
  
            {/* Trachea */}
            <circle
              cx="250" cy="220" r="22"
              fill={highlight("trachea") ? "#fef08a" : "url(#ncx-tracheaGrad)"}
              stroke={highlight("trachea") ? "#f59e0b" : "#ca8a04"}
              strokeWidth={highlight("trachea") ? 3 : 1.5}
              opacity={opacity("trachea")}
              onClick={() => setSelected(selected === "trachea" ? null : "trachea")}
              className="cursor-pointer"
            />
            <text x="250" y="223" textAnchor="middle" fontSize="9" fill="hsl(var(--accent))" fontWeight="600" opacity={opacity("trachea")}>Trachea</text>
  
            {/* Oesophagus — posterior to trachea, slightly left */}
            <ellipse
              cx="245" cy="255" rx="14" ry="10"
              fill={highlight("trachea") ? "#fde68a" : "#fef3c7"}
              stroke={highlight("trachea") ? "#f59e0b" : "#b45309"}
              strokeWidth={highlight("trachea") ? 2 : 1}
              opacity={opacity("trachea")}
              onClick={() => setSelected(selected === "trachea" ? null : "trachea")}
              className="cursor-pointer"
            />
            <text x="245" y="258" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" opacity={opacity("trachea")}>Oesoph</text>
  
            {/* RLN dots in T-O groove */}
            <circle cx="228" cy="240" r="3" fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth="0.5" opacity={opacity("trachea")} />
            <circle cx="268" cy="240" r="3" fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth="0.5" opacity={opacity("trachea")} />
            {showLabels && (!selected || selected === "trachea") ? (
              <text x="228" y="235" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))">RLN</text>
            ) : null}
  
            {/* Thyroid lobes */}
            <ellipse
              cx="210" cy="215" rx="22" ry="28"
              fill={highlight("thyroid") ? "#fbcfe8" : "url(#ncx-thyroidGrad)"}
              stroke={highlight("thyroid") ? "#ec4899" : "#db2777"}
              strokeWidth={highlight("thyroid") ? 3 : 1.5}
              opacity={opacity("thyroid")}
              onClick={() => setSelected(selected === "thyroid" ? null : "thyroid")}
              className="cursor-pointer"
            />
            <ellipse
              cx="290" cy="215" rx="22" ry="28"
              fill={highlight("thyroid") ? "#fbcfe8" : "url(#ncx-thyroidGrad)"}
              stroke={highlight("thyroid") ? "#ec4899" : "#db2777"}
              strokeWidth={highlight("thyroid") ? 3 : 1.5}
              opacity={opacity("thyroid")}
              onClick={() => setSelected(selected === "thyroid" ? null : "thyroid")}
              className="cursor-pointer"
            />
            {showLabels && (!selected || selected === "thyroid") ? (
              <>
                <text x="210" y="210" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontWeight="600">Thyroid</text>
                <text x="290" y="210" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontWeight="600">Thyroid</text>
              </>
            ) : null}
  
            {/* Isthmus */}
            <rect x="232" y="193" width="36" height="8" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--accent))" strokeWidth="1" opacity={opacity("thyroid")} />
  
            {/* LEFT Carotid sheath */}
            <ellipse
              cx="155" cy="230" rx="30" ry="35"
              fill={highlight("carotid") ? "#fca5a533" : "none"}
              stroke={highlight("carotid") ? "#ef4444" : "#f87171"}
              strokeWidth={highlight("carotid") ? 3 : 2}
              strokeDasharray={highlight("carotid") ? "none" : "5 3"}
              opacity={opacity("carotid")}
              onClick={() => setSelected(selected === "carotid" ? null : "carotid")}
              className="cursor-pointer"
            />
            {/* CCA */}
            <circle cx="162" cy="235" r="10" fill="url(#ncx-vesselGrad)" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity={opacity("carotid")} />
            <text x="162" y="238" textAnchor="middle" fontSize="7" fill="hsl(var(--background))" fontWeight="700" opacity={opacity("carotid")}>CCA</text>
            {/* IJV */}
            <ellipse cx="145" cy="222" rx="12" ry="14" fill="url(#ncx-veinGrad)" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity={opacity("carotid")} />
            <text x="145" y="225" textAnchor="middle" fontSize="7" fill="hsl(var(--background))" fontWeight="700" opacity={opacity("carotid")}>IJV</text>
            {/* Vagus */}
            <circle cx="155" cy="248" r="4" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="1" opacity={opacity("carotid")} />
            {showLabels && (!selected || selected === "carotid") ? (
              <text x="155" y="260" textAnchor="middle" fontSize="6" fill="hsl(var(--accent))">X (vagus)</text>
            ) : null}
  
            {/* RIGHT Carotid sheath */}
            <ellipse
              cx="345" cy="230" rx="30" ry="35"
              fill={highlight("carotid") ? "#fca5a533" : "none"}
              stroke={highlight("carotid") ? "#ef4444" : "#f87171"}
              strokeWidth={highlight("carotid") ? 3 : 2}
              strokeDasharray={highlight("carotid") ? "none" : "5 3"}
              opacity={opacity("carotid")}
              onClick={() => setSelected(selected === "carotid" ? null : "carotid")}
              className="cursor-pointer"
            />
            <circle cx="338" cy="235" r="10" fill="url(#ncx-vesselGrad)" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity={opacity("carotid")} />
            <text x="338" y="238" textAnchor="middle" fontSize="7" fill="hsl(var(--background))" fontWeight="700" opacity={opacity("carotid")}>CCA</text>
            <ellipse cx="355" cy="222" rx="12" ry="14" fill="url(#ncx-veinGrad)" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity={opacity("carotid")} />
            <text x="355" y="225" textAnchor="middle" fontSize="7" fill="hsl(var(--background))" fontWeight="700" opacity={opacity("carotid")}>IJV</text>
            <circle cx="345" cy="248" r="4" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="1" opacity={opacity("carotid")} />
  
            {/* SCM muscles */}
            <ellipse
              cx="130" cy="195" rx="28" ry="14"
              transform="rotate(-30 130 195)"
              fill={highlight("scm") ? "#fca5a5" : "url(#ncx-scmGrad)"}
              stroke={highlight("scm") ? "#dc2626" : "#ef4444"}
              strokeWidth={highlight("scm") ? 3 : 1.5}
              opacity={opacity("scm")}
              onClick={() => setSelected(selected === "scm" ? null : "scm")}
              className="cursor-pointer"
            />
            {showLabels && (!selected || selected === "scm") ? (
              <text x="115" y="180" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="600" transform="rotate(-30 115 180)">SCM</text>
            ) : null}
            <ellipse
              cx="370" cy="195" rx="28" ry="14"
              transform="rotate(30 370 195)"
              fill={highlight("scm") ? "#fca5a5" : "url(#ncx-scmGrad)"}
              stroke={highlight("scm") ? "#dc2626" : "#ef4444"}
              strokeWidth={highlight("scm") ? 3 : 1.5}
              opacity={opacity("scm")}
              onClick={() => setSelected(selected === "scm" ? null : "scm")}
              className="cursor-pointer"
            />
            {showLabels && (!selected || selected === "scm") ? (
              <text x="385" y="180" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="600" transform="rotate(30 385 180)">SCM</text>
            ) : null}
            {/* SCM fibre overlay */}
            {showSutures && (
              <>
                <ellipse cx="130" cy="195" rx="27" ry="13" transform="rotate(-30 130 195)" fill="url(#ncx-muscleFibre)" opacity={opacity("scm") * 0.7} pointerEvents="none" />
                <ellipse cx="370" cy="195" rx="27" ry="13" transform="rotate(30 370 195)" fill="url(#ncx-muscleFibre)" opacity={opacity("scm") * 0.7} pointerEvents="none" />
              </>
            )}
  
            {/* Trapezius (posterior) */}
            <ellipse cx="145" cy="340" rx="30" ry="12" transform="rotate(40 145 340)" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1" opacity={0.5} />
            <ellipse cx="355" cy="340" rx="30" ry="12" transform="rotate(-40 355 340)" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1" opacity={0.5} />
            {showLabels && (
              <>
                <text x="130" y="355" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))">Trapezius</text>
                <text x="370" y="355" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))">Trapezius</text>
              </>
            )}
  
            {/* Vertebral artery in transverse foramen */}
            <circle cx="195" cy="318" r="5" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" strokeWidth="1" opacity={opacity("vertebral")} />
            <circle cx="305" cy="318" r="5" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" strokeWidth="1" opacity={opacity("vertebral")} />
            {showLabels && (!selected || selected === "vertebral") ? (
              <text x="195" y="340" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">VA</text>
            ) : null}
  
            {/* Anterior label */}
            <text x="250" y="120" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">Anterior</text>
            <text x="250" y="410" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">Posterior</text>
  
            {/* Strap muscles */}
            <ellipse cx="230" cy="180" rx="12" ry="8" fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth="1" opacity={opacity("pretracheal")} />
            <ellipse cx="270" cy="180" rx="12" ry="8" fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth="1" opacity={opacity("pretracheal")} />
            {showLabels && (!selected || selected === "pretracheal") ? (
              <text x="250" y="172" textAnchor="middle" fontSize="7" fill="hsl(var(--clinical))">Strap mm.</text>
            ) : null}
          </svg>
  
          {/* Legend / selection panel */}
          <div className="flex flex-col gap-1.5 min-w-[180px]">
            {structures.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(selected === s.id ? null : s.id)}
                className={`text-left text-xs px-2.5 py-1.5 rounded border transition-all ${
                  selected === s.id
                    ? "border-primary bg-primary/10 font-semibold text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ background: s.color }} />
                {s.label}
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
    </DiagramFigure>
  );
};

export default NeckCrossSectionDiagram;
