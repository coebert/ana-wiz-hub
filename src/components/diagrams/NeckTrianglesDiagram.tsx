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
    pathD: "M150,30 L150,210 L80,210 Z",
  },
  posterior: {
    label: "Posterior Triangle",
    color: "hsl(140, 50%, 48%)",
    borders: "SCM (anteriorly), trapezius (posteriorly), middle 1/3 of clavicle (inferiorly)",
    contents: "Accessory nerve (XI — superficial!), brachial plexus trunks, subclavian artery (3rd part), external jugular vein, transverse cervical and suprascapular arteries",
    clinicalNote: "Accessory nerve (XI) runs superficially — vulnerable during lymph node biopsy → shoulder drop. Brachial plexus trunks emerge between scalene muscles here — target for interscalene/supraclavicular blocks.",
    pathD: "M150,30 L150,210 L250,210 Z",
  },
  carotid: {
    label: "Carotid Triangle",
    color: "hsl(0, 55%, 52%)",
    borders: "SCM (posteriorly), superior belly of omohyoid (inferiorly), posterior belly of digastric (superiorly)",
    contents: "Carotid bifurcation, carotid body, ICA, ECA, IJV, vagus (X), hypoglossal (XII), SLN",
    clinicalNote: "Carotid endarterectomy performed here. Carotid body stimulation → bradycardia, hypotension. CCA bifurcation at C3/4 (upper border of thyroid cartilage). Hypoglossal nerve (XII) at risk during carotid surgery.",
    pathD: "M150,30 L150,130 L100,130 Z",
  },
  muscular: {
    label: "Muscular Triangle",
    color: "hsl(270, 45%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), superior belly of omohyoid (superolaterally)",
    contents: "Infrahyoid strap muscles (sternohyoid, sternothyroid, thyrohyoid, omohyoid), thyroid and parathyroid glands, trachea, oesophagus, RLN",
    clinicalNote: "Thyroidectomy and tracheostomy performed here. RLN runs in tracheo-oesophageal groove — at risk during thyroid surgery. Parathyroid glands posterior to thyroid lobes.",
    pathD: "M150,130 L150,210 L80,210 Z",
  },
  submandibular: {
    label: "Submandibular Triangle",
    color: "hsl(30, 60%, 52%)",
    borders: "Mandible (superiorly), anterior belly of digastric (anteroinferiorly), posterior belly of digastric (posteroinferiorly)",
    contents: "Submandibular gland, facial artery and vein, hypoglossal nerve (XII), mylohyoid nerve, lingual nerve",
    clinicalNote: "Submandibular gland excision — lingual nerve at risk (runs deep to gland). Facial artery crosses mandible at anterior masseter border — palpable pulse for facial block.",
    pathD: "M80,30 L150,30 L100,80 Z",
  },
  submental: {
    label: "Submental Triangle",
    color: "hsl(50, 60%, 50%)",
    borders: "Hyoid (inferiorly), anterior belly of digastric bilaterally, midline",
    contents: "Submental lymph nodes, small veins",
    clinicalNote: "Unpaired midline triangle. Submental lymph nodes drain floor of mouth and lower lip tip. Submental intubation route passes through this area.",
    pathD: "M80,30 L100,80 L60,80 Z",
  },
};

const triangleOrder: TriangleKey[] = ["anterior", "posterior", "carotid", "muscular", "submandibular", "submental"];

const NeckTrianglesDiagram = () => {
  const [selected, setSelected] = useState<TriangleKey>("anterior");
  const info = triangles[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Triangles of the Neck — Interactive</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a triangle or button to see its borders, contents, and clinical relevance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="30 15 260 210" width="260" height="210" className="border border-border rounded">
            {/* Head outline */}
            <ellipse cx="150" cy="15" rx="30" ry="12" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.3" />

            {/* SCM line */}
            <line x1="150" y1="30" x2="150" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
            <text x="155" y="120" fontSize="6" fill="hsl(var(--muted-foreground))" transform="rotate(90, 155, 120)" textAnchor="middle">SCM</text>

            {/* Mandible */}
            <path d="M60,30 Q100,25 150,30" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" fill="none" opacity="0.4" />
            <text x="105" y="27" fontSize="5" fill="hsl(var(--muted-foreground))">Mandible</text>

            {/* Trapezius line */}
            <line x1="250" y1="210" x2="150" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 2" />
            <text x="215" y="100" fontSize="5" fill="hsl(var(--muted-foreground))" transform="rotate(42, 215, 100)">Trapezius</text>

            {/* Clavicle */}
            <line x1="50" y1="210" x2="280" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" opacity="0.4" />
            <text x="200" y="222" fontSize="5" fill="hsl(var(--muted-foreground))">Clavicle</text>

            {/* Midline */}
            <line x1="80" y1="30" x2="80" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" opacity="0.3" strokeDasharray="2 3" />
            <text x="75" y="225" fontSize="5" fill="hsl(var(--muted-foreground))">Midline</text>

            {/* Triangle regions */}
            {triangleOrder.map((key) => {
              const t = triangles[key];
              const isActive = selected === key;
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <path
                    d={t.pathD}
                    fill={t.color}
                    fillOpacity={isActive ? 0.35 : 0.08}
                    stroke={t.color}
                    strokeWidth={isActive ? 2 : 0.5}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* Triangle labels inside shapes */}
            <text x="120" y="160" fontSize="6.5" fill={selected === "anterior" ? triangles.anterior.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "anterior" ? "bold" : "normal"} className="cursor-pointer select-none" onClick={() => setSelected("anterior")}>Anterior</text>
            <text x="170" y="160" fontSize="6.5" fill={selected === "posterior" ? triangles.posterior.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "posterior" ? "bold" : "normal"} className="cursor-pointer select-none" onClick={() => setSelected("posterior")}>Posterior</text>
            <text x="118" y="90" fontSize="5.5" fill={selected === "carotid" ? triangles.carotid.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "carotid" ? "bold" : "normal"} className="cursor-pointer select-none" onClick={() => setSelected("carotid")}>Carotid</text>
            <text x="100" y="185" fontSize="5.5" fill={selected === "muscular" ? triangles.muscular.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "muscular" ? "bold" : "normal"} className="cursor-pointer select-none" onClick={() => setSelected("muscular")}>Muscular</text>
            <text x="85" y="55" fontSize="5" fill={selected === "submandibular" ? triangles.submandibular.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "submandibular" ? "bold" : "normal"} className="cursor-pointer select-none" onClick={() => setSelected("submandibular")}>SubMand</text>
            <text x="68" y="70" fontSize="4.5" fill={selected === "submental" ? triangles.submental.color : "hsl(var(--muted-foreground))"} fontWeight={selected === "submental" ? "bold" : "normal"} className="cursor-pointer select-none" onClick={() => setSelected("submental")}>SubMent</text>

            {/* Key structure markers */}
            {selected === "carotid" && (
              <g className="animate-fade-in">
                <circle cx="130" cy="100" r="3" fill="hsl(0, 55%, 52%)" opacity="0.6" />
                <text x="137" y="102" fontSize="5" fill="hsl(0, 55%, 52%)">Carotid bifurcation</text>
              </g>
            )}
            {selected === "posterior" && (
              <g className="animate-fade-in">
                <path d="M160,80 Q180,90 200,100" stroke="hsl(140, 50%, 48%)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
                <text x="175" y="78" fontSize="5" fill="hsl(140, 50%, 48%)">CN XI (superficial!)</text>
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
