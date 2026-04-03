import { useState } from "react";

type TriangleKey = "anterior" | "posterior" | "carotid" | "muscular" | "submandibular" | "submental";

interface TriangleInfo {
  label: string;
  color: string;
  borders: string;
  contents: string;
  clinicalNote: string;
  pathD: string;
}

const triangles: Record<TriangleKey, TriangleInfo> = {
  anterior: {
    label: "Anterior Triangle",
    color: "hsl(210, 55%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), mandible (superiorly)",
    contents: "Carotid sheath (CCA/ICA, IJV, vagus), thyroid gland, larynx, trachea, submandibular gland, infrahyoid muscles",
    clinicalNote: "Contains all major structures for airway management and vascular access. IJV cannulation performed here. Subdivided into carotid, muscular, submandibular, and submental triangles.",
    pathD: "M155,58 C145,55 135,54 125,56 L125,230 L155,230 C155,180 155,130 155,58 Z",
  },
  posterior: {
    label: "Posterior Triangle",
    color: "hsl(140, 50%, 48%)",
    borders: "SCM (anteriorly), trapezius (posteriorly), middle 1/3 of clavicle (inferiorly)",
    contents: "Accessory nerve (XI — superficial!), brachial plexus trunks, subclavian artery (3rd part), external jugular vein, transverse cervical and suprascapular arteries",
    clinicalNote: "CN XI runs superficially — vulnerable during lymph node biopsy → shoulder drop. Brachial plexus trunks here — target for interscalene/supraclavicular blocks.",
    pathD: "M155,58 L155,230 L240,230 C230,200 220,170 210,145 C200,118 190,95 175,75 C168,66 160,60 155,58 Z",
  },
  carotid: {
    label: "Carotid Triangle",
    color: "hsl(0, 55%, 52%)",
    borders: "SCM (posteriorly), sup. belly of omohyoid (inferiorly), post. belly of digastric (superiorly)",
    contents: "Carotid bifurcation (C3/4), carotid body, ICA, ECA, IJV, vagus (X), hypoglossal (XII), SLN",
    clinicalNote: "Carotid endarterectomy site. Carotid body → bradycardia. CCA bifurcation at upper thyroid cartilage. CN XII at risk during surgery.",
    pathD: "M155,58 C150,60 145,65 142,72 L140,140 L155,140 Z",
  },
  muscular: {
    label: "Muscular Triangle",
    color: "hsl(270, 45%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), sup. belly of omohyoid (superolaterally)",
    contents: "Infrahyoid strap muscles, thyroid and parathyroid glands, trachea, oesophagus, RLN",
    clinicalNote: "Thyroidectomy and tracheostomy performed here. RLN in tracheo-oesophageal groove — at risk during thyroid surgery.",
    pathD: "M125,140 L125,230 L155,230 L155,140 L140,140 Z",
  },
  submandibular: {
    label: "Submandibular Triangle",
    color: "hsl(30, 60%, 52%)",
    borders: "Mandible (superiorly), ant. belly of digastric (anteroinferiorly), post. belly of digastric (posteroinferiorly)",
    contents: "Submandibular gland, facial artery/vein, hypoglossal nerve (XII), mylohyoid nerve, lingual nerve",
    clinicalNote: "Submandibular gland excision — lingual nerve at risk. Facial artery palpable at anterior masseter border.",
    pathD: "M125,56 C130,48 138,42 148,38 C155,36 162,38 168,42 C160,50 155,56 155,58 C145,55 135,54 125,56 Z",
  },
  submental: {
    label: "Submental Triangle",
    color: "hsl(50, 60%, 50%)",
    borders: "Hyoid (inferiorly), ant. belly of digastric bilaterally, midline",
    contents: "Submental lymph nodes, small veins",
    clinicalNote: "Unpaired midline triangle. Submental nodes drain floor of mouth and lower lip tip. Submental intubation route passes here.",
    pathD: "M105,56 L125,56 C125,54 124,50 122,46 C118,40 114,38 108,38 C104,42 102,48 105,56 Z",
  },
};

const triangleOrder: TriangleKey[] = ["anterior", "posterior", "carotid", "muscular", "submandibular", "submental"];

const NeckTrianglesDiagram = () => {
  const [selected, setSelected] = useState<TriangleKey>("anterior");
  const info = triangles[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Triangles of the Neck — Interactive</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a triangle to see borders, contents, and clinical relevance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="60 0 220 260" width="260" height="260" className="border border-border rounded">
            {/* Head - lateral view profile */}
            <g stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.3">
              {/* Skull outline */}
              <path d="M100,5 C80,5 65,15 60,30 C55,48 58,65 70,75 C62,78 58,82 60,88 C62,92 68,94 75,92" />
              {/* Mandible with angle */}
              <path d="M75,92 C85,95 100,92 108,85 C115,78 120,68 130,62 C140,56 152,50 165,48" />
              {/* Jaw line */}
              <path d="M108,85 C112,80 118,72 125,65 C132,58 140,52 148,48" />
              {/* Ear */}
              <path d="M165,48 C170,42 175,38 178,35 C180,32 178,28 175,25 C172,22 168,25 166,30 C164,35 162,42 165,48" />
              {/* Occiput/posterior skull */}
              <path d="M100,5 C120,2 140,5 158,15 C170,22 175,25 175,25" />
            </g>

            {/* Anatomical landmarks */}
            <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" fill="none" opacity="0.4">
              {/* Mandible lower border */}
              <path d="M75,92 C90,96 105,95 115,90 C125,84 135,72 148,62 C158,54 168,48 175,46" strokeWidth="1.8" />
              {/* SCM - prominent diagonal */}
              <path d="M168,42 C165,48 160,56 155,65 C150,78 148,95 150,115 C152,140 154,170 155,200 C156,218 155,228 155,230" strokeWidth="2" opacity="0.5" />
              {/* Trapezius posterior border */}
              <path d="M175,75 C185,95 200,130 215,170 C225,195 235,218 240,230" strokeWidth="1.5" opacity="0.35" strokeDasharray="4 2" />
              {/* Clavicle */}
              <path d="M115,230 C130,228 155,226 180,228 C210,230 240,230 260,228" strokeWidth="2" opacity="0.5" />
              {/* Hyoid */}
              <path d="M110,92 C115,88 120,86 125,88" strokeWidth="1.5" />
              {/* Midline */}
              <line x1="125" y1="56" x2="125" y2="230" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
            </g>

            {/* Triangle regions */}
            {triangleOrder.map((key) => {
              const t = triangles[key];
              const isActive = selected === key;
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <path
                    d={t.pathD}
                    fill={t.color}
                    fillOpacity={isActive ? 0.35 : 0.06}
                    stroke={t.color}
                    strokeWidth={isActive ? 2 : 0.5}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* Labels */}
            <g fontSize="6.5" className="select-none">
              <text x="135" y="200" fill={selected === "anterior" ? triangles.anterior.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "anterior" ? "bold" : "normal"} className="cursor-pointer" onClick={() => setSelected("anterior")}>Anterior</text>
              <text x="180" y="170" fill={selected === "posterior" ? triangles.posterior.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "posterior" ? "bold" : "normal"} className="cursor-pointer" onClick={() => setSelected("posterior")}>Posterior</text>
              <text x="135" y="110" fill={selected === "carotid" ? triangles.carotid.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "carotid" ? "bold" : "normal"} className="cursor-pointer" onClick={() => setSelected("carotid")}>Carotid</text>
              <text x="130" y="195" fill={selected === "muscular" ? triangles.muscular.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "muscular" ? "bold" : "normal"} fontSize="5.5" className="cursor-pointer" onClick={() => setSelected("muscular")}>Muscular</text>
              <text x="128" y="52" fill={selected === "submandibular" ? triangles.submandibular.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "submandibular" ? "bold" : "normal"} fontSize="5.5" className="cursor-pointer" onClick={() => setSelected("submandibular")}>SubMand.</text>
              <text x="105" y="50" fill={selected === "submental" ? triangles.submental.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "submental" ? "bold" : "normal"} fontSize="5" className="cursor-pointer" onClick={() => setSelected("submental")}>SubMent.</text>
            </g>

            {/* Landmark labels */}
            <g fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.5">
              <text x="160" y="136" transform="rotate(80, 160, 136)">SCM</text>
              <text x="210" y="155" transform="rotate(52, 210, 155)" fontSize="5">Trapezius</text>
              <text x="170" y="244">Clavicle</text>
              <text x="98" y="238" fontSize="5">Midline</text>
              <text x="80" y="100" fontSize="5">Mandible</text>
            </g>

            {/* Context-sensitive markers */}
            {selected === "carotid" && (
              <g className="animate-fade-in">
                <circle cx="148" cy="108" r="3.5" fill="none" stroke="hsl(0, 55%, 52%)" strokeWidth="1.5" opacity="0.7" />
                <circle cx="148" cy="108" r="1.2" fill="hsl(0, 55%, 52%)" opacity="0.7" />
                <text x="152" y="105" fontSize="5" fill="hsl(0, 55%, 52%)">Carotid bifurc.</text>
              </g>
            )}
            {selected === "posterior" && (
              <g className="animate-fade-in">
                <path d="M165,80 C175,90 190,105 205,120" stroke="hsl(140, 50%, 48%)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity="0.7" />
                <text x="175" y="78" fontSize="5" fill="hsl(140, 50%, 48%)">CN XI (superficial!)</text>
                <path d="M160,200 C165,195 172,192 180,192" stroke="hsl(30, 60%, 52%)" strokeWidth="2" fill="none" opacity="0.5" />
                <text x="183" y="195" fontSize="4.5" fill="hsl(30, 60%, 52%)">Brachial plexus</text>
              </g>
            )}
            {selected === "muscular" && (
              <g className="animate-fade-in">
                <path d="M130,180 C132,185 134,192 135,200" stroke="hsl(50, 65%, 48%)" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.6" />
                <text x="126" y="212" fontSize="4.5" fill="hsl(50, 65%, 48%)">RLN in T-O groove</text>
              </g>
            )}
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Borders:</strong> {info.borders}</p>
            <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Contents:</strong> {info.contents}</p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeckTrianglesDiagram;
