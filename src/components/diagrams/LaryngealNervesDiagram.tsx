import { useState } from "react";

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
  const info = selected ? branches.find((b) => b.id === selected) : null;
  const hi = (id: string) => selected === id;
  const op = (id: string) => (selected && selected !== id ? 0.25 : 1);

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold text-foreground mb-2">Laryngeal Nerve Supply</h3>
      <p className="text-sm text-muted-foreground mb-4">Tap a structure to see its course, function, and clinical relevance.</p>

      <div className="flex flex-col lg:flex-row gap-4">
        <svg viewBox="0 0 460 620" className="w-full max-w-[460px] mx-auto" style={{ background: "hsl(var(--card))" }}>
          <defs>
            <linearGradient id="ln-aortaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="ln-thyroidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>

          {/* === TRACHEA === */}
          <rect x="200" y="160" width="60" height="380" rx="28" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" opacity={0.5} />
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <line key={i} x1="208" y1={185 + i * 40} x2="252" y2={185 + i * 40} stroke="#ca8a04" strokeWidth="1" opacity={0.4} />
          ))}
          <text x="230" y="210" textAnchor="middle" fontSize="9" fill="#92400e">Trachea</text>

          {/* === OESOPHAGUS === */}
          <ellipse cx="230" cy="560" rx="18" ry="10" fill="#fef3c7" stroke="#b45309" strokeWidth="1" opacity={0.4} />
          <text x="230" y="563" textAnchor="middle" fontSize="7" fill="#92400e">Oesoph</text>

          {/* === AORTIC ARCH === */}
          <path
            d="M300,480 Q300,420 280,400 Q250,370 220,400 Q200,420 200,480"
            fill="none" stroke="url(#ln-aortaGrad)" strokeWidth="18" strokeLinecap="round" opacity={0.7}
          />
          <text x="250" y="395" textAnchor="middle" fontSize="10" fill="#991b1b" fontWeight="700">Aortic Arch</text>

          {/* Ligamentum arteriosum */}
          <line x1="255" y1="380" x2="270" y2="360" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 2" opacity={op("rln-left")} />
          <text x="280" y="355" fontSize="7" fill="#6b7280" opacity={op("rln-left")}>Lig. arteriosum</text>

          {/* Right subclavian */}
          <path d="M300,480 Q330,470 370,465" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" opacity={0.5} />
          <text x="375" y="460" fontSize="8" fill="#991b1b">R. Subclavian A.</text>

          {/* === THYROID GLAND === */}
          <ellipse
            cx="175" cy="240" rx="30" ry="50"
            fill={hi("thyroid") ? "#fbcfe8" : "url(#ln-thyroidGrad)"}
            stroke={hi("thyroid") ? "#ec4899" : "#db2777"} strokeWidth={hi("thyroid") ? 3 : 1.5}
            opacity={op("thyroid")}
            onClick={() => setSelected(selected === "thyroid" ? null : "thyroid")}
            className="cursor-pointer"
          />
          <ellipse
            cx="285" cy="240" rx="30" ry="50"
            fill={hi("thyroid") ? "#fbcfe8" : "url(#ln-thyroidGrad)"}
            stroke={hi("thyroid") ? "#ec4899" : "#db2777"} strokeWidth={hi("thyroid") ? 3 : 1.5}
            opacity={op("thyroid")}
            onClick={() => setSelected(selected === "thyroid" ? null : "thyroid")}
            className="cursor-pointer"
          />
          {/* Isthmus */}
          <rect x="205" y="235" width="50" height="12" rx="5" fill="#fce7f3" stroke="#db2777" strokeWidth="1" opacity={op("thyroid")} />
          <text x="175" y="243" textAnchor="middle" fontSize="8" fill="#9d174d" fontWeight="600" opacity={op("thyroid")}>Thyroid</text>
          <text x="285" y="243" textAnchor="middle" fontSize="8" fill="#9d174d" fontWeight="600" opacity={op("thyroid")}>Thyroid</text>

          {/* Superior thyroid artery */}
          <path d="M140,170 Q155,190 170,200" fill="none" stroke="#ef4444" strokeWidth="2" opacity={op("eln")} />
          <text x="125" y="168" fontSize="7" fill="#991b1b" opacity={op("eln")}>Sup. thyroid A.</text>

          {/* Inferior thyroid artery */}
          <path d="M120,320 Q150,300 175,280" fill="none" stroke="#ef4444" strokeWidth="2" opacity={op("thyroid")} />
          <text x="95" y="328" fontSize="7" fill="#991b1b" opacity={op("thyroid")}>Inf. thyroid A.</text>

          {/* === LARYNX === */}
          <rect x="195" y="100" width="70" height="60" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" opacity={0.5} />
          <text x="230" y="125" textAnchor="middle" fontSize="9" fill="#0369a1" fontWeight="600">Larynx</text>
          {/* Thyrohyoid membrane */}
          <line x1="195" y1="110" x2="265" y2="110" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 2" />
          <text x="275" y="112" fontSize="6" fill="#0369a1">Thyrohyoid memb.</text>
          {/* Vocal cords line */}
          <line x1="200" y1="140" x2="260" y2="140" stroke="#0369a1" strokeWidth="1.5" />
          <text x="275" y="143" fontSize="6" fill="#0369a1">Vocal cords</text>
          {/* Cricothyroid */}
          <rect x="210" y="155" width="40" height="10" rx="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" opacity={op("eln")} />
          <text x="275" y="163" fontSize="6" fill="#0369a1" opacity={op("eln")}>Cricothyroid m.</text>

          {/* === VAGUS NERVES === */}
          {/* Left vagus */}
          <path
            d="M155,60 L155,140"
            fill="none" stroke={hi("vagus") ? "#eab308" : "#facc15"} strokeWidth={hi("vagus") ? 4 : 3}
            opacity={op("vagus")}
            onClick={() => setSelected(selected === "vagus" ? null : "vagus")}
            className="cursor-pointer"
          />
          <text x="145" y="55" textAnchor="middle" fontSize="9" fill="#a16207" fontWeight="700" opacity={op("vagus")}>L. Vagus (X)</text>

          {/* Right vagus */}
          <path
            d="M330,60 L330,140"
            fill="none" stroke={hi("vagus") ? "#eab308" : "#facc15"} strokeWidth={hi("vagus") ? 4 : 3}
            opacity={op("vagus")}
            onClick={() => setSelected(selected === "vagus" ? null : "vagus")}
            className="cursor-pointer"
          />
          <text x="340" y="55" textAnchor="middle" fontSize="9" fill="#a16207" fontWeight="700" opacity={op("vagus")}>R. Vagus (X)</text>

          {/* Left vagus continues to thorax */}
          <path
            d="M155,140 L155,400 Q155,420 200,440"
            fill="none" stroke="#facc15" strokeWidth="2.5" opacity={op("vagus")} strokeDasharray="6 3"
          />
          {/* Right vagus continues */}
          <path
            d="M330,140 L330,460"
            fill="none" stroke="#facc15" strokeWidth="2.5" opacity={op("vagus")} strokeDasharray="6 3"
          />

          {/* === SLN === */}
          <path
            d="M155,100 Q165,95 185,100"
            fill="none" stroke={hi("sln") ? "#16a34a" : "#4ade80"} strokeWidth={hi("sln") ? 4 : 2.5}
            opacity={op("sln")}
            onClick={() => setSelected(selected === "sln" ? null : "sln")}
            className="cursor-pointer"
          />
          <text x="175" y="92" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600" opacity={op("sln")}>SLN</text>

          {/* Internal laryngeal nerve — pierces thyrohyoid membrane */}
          <path
            d="M185,100 Q190,105 195,112"
            fill="none" stroke={hi("iln") ? "#059669" : "#34d399"} strokeWidth={hi("iln") ? 3.5 : 2}
            opacity={op("iln")}
            onClick={() => setSelected(selected === "iln" ? null : "iln")}
            className="cursor-pointer"
          />
          <circle cx="195" cy="112" r="3" fill="#34d399" stroke="#059669" strokeWidth="1" opacity={op("iln")} />
          <text x="183" y="120" fontSize="7" fill="#065f46" opacity={op("iln")}>ILN</text>
          <text x="173" y="128" fontSize="6" fill="#065f46" fontStyle="italic" opacity={op("iln")}>(sensory above cords)</text>

          {/* External laryngeal nerve — descends to cricothyroid */}
          <path
            d="M185,100 Q180,120 185,145 Q188,155 210,160"
            fill="none" stroke={hi("eln") ? "#0891b2" : "#22d3ee"} strokeWidth={hi("eln") ? 3.5 : 2}
            opacity={op("eln")}
            onClick={() => setSelected(selected === "eln" ? null : "eln")}
            className="cursor-pointer"
          />
          <circle cx="210" cy="160" r="3" fill="#22d3ee" stroke="#0891b2" strokeWidth="1" opacity={op("eln")} />
          <text x="178" y="150" fontSize="7" fill="#155e75" opacity={op("eln")}>ELN</text>
          <text x="168" y="158" fontSize="6" fill="#155e75" fontStyle="italic" opacity={op("eln")}>(motor to cricothyroid)</text>

          {/* Right SLN */}
          <path
            d="M330,100 Q310,95 280,100"
            fill="none" stroke={hi("sln") ? "#16a34a" : "#4ade80"} strokeWidth={hi("sln") ? 4 : 2.5}
            opacity={op("sln")}
            onClick={() => setSelected(selected === "sln" ? null : "sln")}
            className="cursor-pointer"
          />
          <text x="300" y="92" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600" opacity={op("sln")}>SLN</text>
          {/* Right ILN */}
          <path d="M280,100 Q272,105 268,112" fill="none" stroke="#34d399" strokeWidth="2" opacity={op("iln")} />
          <circle cx="268" cy="112" r="3" fill="#34d399" stroke="#059669" strokeWidth="1" opacity={op("iln")} />
          {/* Right ELN */}
          <path d="M280,100 Q285,120 275,145 Q270,155 255,160" fill="none" stroke="#22d3ee" strokeWidth="2" opacity={op("eln")} />
          <circle cx="255" cy="160" r="3" fill="#22d3ee" stroke="#0891b2" strokeWidth="1" opacity={op("eln")} />

          {/* === LEFT RLN === */}
          <path
            d="M200,440 Q210,450 220,440 Q225,420 222,380 Q220,340 215,300 Q212,270 210,240 Q208,200 205,165"
            fill="none" stroke={hi("rln-left") ? "#dc2626" : "#f87171"} strokeWidth={hi("rln-left") ? 4 : 2.5}
            opacity={op("rln-left")}
            onClick={() => setSelected(selected === "rln-left" ? null : "rln-left")}
            className="cursor-pointer"
          />
          <text x="195" y="350" fontSize="8" fill="#991b1b" fontWeight="600" opacity={op("rln-left")} transform="rotate(-90 195 350)">L. RLN</text>
          {/* Arrow showing it loops under arch */}
          <circle cx="200" cy="440" r="4" fill="#f87171" stroke="#dc2626" strokeWidth="1.5" opacity={op("rln-left")} />

          {/* === RIGHT RLN === */}
          <path
            d="M330,460 Q340,475 350,465 Q355,450 348,430 Q340,390 335,340 Q330,290 320,250 Q315,220 310,190 Q308,175 270,165"
            fill="none" stroke={hi("rln-right") ? "#ea580c" : "#fb923c"} strokeWidth={hi("rln-right") ? 4 : 2.5}
            opacity={op("rln-right")}
            onClick={() => setSelected(selected === "rln-right" ? null : "rln-right")}
            className="cursor-pointer"
          />
          <text x="345" y="340" fontSize="8" fill="#9a3412" fontWeight="600" opacity={op("rln-right")} transform="rotate(90 345 340)">R. RLN</text>
          <circle cx="330" cy="460" r="4" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" opacity={op("rln-right")} />

          {/* RLN motor endpoint arrows into larynx */}
          <path d="M205,165 L210,155" fill="none" stroke="#f87171" strokeWidth="2" markerEnd="" opacity={op("rln-left")} />
          <path d="M270,165 L265,155" fill="none" stroke="#fb923c" strokeWidth="2" opacity={op("rln-right")} />

          {/* RLN motor label */}
          {(selected === "rln-motor" || !selected) && (
            <text x="230" y="175" textAnchor="middle" fontSize="6" fill="#7c3aed">Motor: all intrinsic mm. except cricothyroid</text>
          )}

          {/* T-O groove labels */}
          <text x="205" y="278" fontSize="6" fill="#6b7280" opacity={op("rln-left")} transform="rotate(-90 205 278)">T-O groove</text>

          {/* Sensory territory annotations */}
          {(selected === "iln" || selected === "rln-motor") && (
            <>
              <line x1="195" y1="115" x2="195" y2="140" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
              <text x="180" y="137" fontSize="6" fill="#065f46">↑ Sensory above</text>
              <line x1="205" y1="165" x2="205" y2="145" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 2" />
              <text x="230" y="185" fontSize="6" fill="#7c3aed">↓ Sensory below</text>
            </>
          )}

          {/* Hyoid bone */}
          <path d="M185,95 Q230,85 275,95" fill="none" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
          <text x="230" y="85" textAnchor="middle" fontSize="7" fill="#78716c">Hyoid</text>
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
