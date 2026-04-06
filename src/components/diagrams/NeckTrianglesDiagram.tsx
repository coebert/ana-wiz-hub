import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TriangleKey = "anterior" | "posterior" | "carotid" | "muscular" | "submandibular" | "submental" | "occipital" | "supraclavicular";

interface TriangleInfo {
  label: string;
  color: string;
  borders: string;
  contents: string;
  clinicalNote: string;
  pathD: string;
  parent?: "anterior" | "posterior";
}

const triangles: Record<TriangleKey, TriangleInfo> = {
  anterior: {
    label: "Anterior Triangle",
    color: "hsl(210, 55%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), mandible (superiorly)",
    contents: "Carotid sheath (CCA/ICA/ECA, IJV, vagus nerve), thyroid gland, larynx, trachea, submandibular gland, infrahyoid strap muscles, ansa cervicalis",
    clinicalNote: "Contains all major structures for airway management and vascular access. IJV cannulation at apex of triangle between SCM heads. Subdivided into 4 smaller triangles. Deep cervical fascia layers within: investing, pretracheal, prevertebral.",
    pathD: "M155,58 C145,55 135,54 125,56 L125,230 L155,230 C155,180 155,130 155,58 Z",
  },
  posterior: {
    label: "Posterior Triangle",
    color: "hsl(140, 50%, 48%)",
    borders: "SCM (anteriorly), trapezius (posteriorly), middle 1/3 of clavicle (inferiorly). Floor: splenius capitis, levator scapulae, anterior & middle scalenes. Roof: investing layer of deep cervical fascia",
    contents: "Accessory nerve (CN XI — superficial!), brachial plexus trunks (upper/middle/lower), subclavian artery (3rd part), external jugular vein, transverse cervical & suprascapular arteries, phrenic nerve on anterior scalene, cervical plexus",
    clinicalNote: "CN XI crosses superficially — vulnerable during lymph node biopsy → shoulder drop (trapezius palsy). Brachial plexus trunks between scalenes — target for interscalene & supraclavicular blocks. Phrenic nerve (C3,4,5) descends on anterior scalene — at risk with interscalene block (100% ipsilateral hemidiaphragm paresis).",
    pathD: "M155,58 L155,230 L240,230 C230,200 220,170 210,145 C200,118 190,95 175,75 C168,66 160,60 155,58 Z",
  },
  carotid: {
    label: "Carotid Triangle",
    color: "hsl(0, 55%, 52%)",
    borders: "SCM (posteriorly), sup. belly of omohyoid (inferiorly), post. belly of digastric (superiorly)",
    contents: "CCA bifurcation (C3/4 — upper thyroid cartilage), carotid body & sinus, ICA, ECA & branches, IJV, CN X (vagus), CN XII (hypoglossal), CN XI, internal branch of SLN, ansa cervicalis root",
    clinicalNote: "Carotid endarterectomy site. Carotid body = chemoreceptor (O₂/CO₂/pH). Carotid sinus = baroreceptor (glossopharyngeal IX) — massage → bradycardia. CN XII crosses ECA/ICA laterally — at risk in carotid surgery → tongue deviation to operated side.",
    pathD: "M155,58 C150,60 145,65 142,72 L140,140 L155,140 Z",
    parent: "anterior",
  },
  muscular: {
    label: "Muscular Triangle",
    color: "hsl(270, 45%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), sup. belly of omohyoid (superolaterally)",
    contents: "Infrahyoid strap muscles (sternohyoid, sternothyroid, thyrohyoid, omohyoid), thyroid & parathyroid glands, trachea, oesophagus, RLN in tracheo-oesophageal groove, inferior thyroid artery",
    clinicalNote: "Thyroidectomy and tracheostomy site. RLN in tracheo-oesophageal groove — at risk during thyroid surgery (unilateral → hoarseness; bilateral → stridor). Inf. thyroid artery from thyrocervical trunk crosses RLN — ligate lateral to avoid nerve injury.",
    pathD: "M125,140 L125,230 L155,230 L155,140 L140,140 Z",
    parent: "anterior",
  },
  submandibular: {
    label: "Submandibular (Digastric) Triangle",
    color: "hsl(30, 60%, 52%)",
    borders: "Mandible (superiorly), ant. belly of digastric (anteroinferiorly), post. belly of digastric (posteroinferiorly)",
    contents: "Submandibular gland (superficial & deep parts around mylohyoid), facial artery & vein, hypoglossal nerve (CN XII), mylohyoid nerve, lingual nerve, submandibular ganglion, submental artery",
    clinicalNote: "Submandibular gland excision — lingual nerve loops under submandibular duct (Wharton's). Facial artery palpable at anterior masseter border on mandible (pulse point). Deep part of gland wraps around posterior mylohyoid.",
    pathD: "M125,56 C130,48 138,42 148,38 C155,36 162,38 168,42 C160,50 155,56 155,58 C145,55 135,54 125,56 Z",
    parent: "anterior",
  },
  submental: {
    label: "Submental Triangle",
    color: "hsl(50, 60%, 50%)",
    borders: "Hyoid (inferiorly), ant. belly of digastric bilaterally. Floor: mylohyoid. Only unpaired midline triangle.",
    contents: "Submental lymph nodes (drain lower lip tip, floor of mouth, tip of tongue), small veins joining anterior jugular",
    clinicalNote: "Submental intubation route passes through this space (alternative to tracheostomy in maxillofacial trauma). Submental nodes → submandibular → deep cervical chain.",
    pathD: "M105,56 L125,56 C125,54 124,50 122,46 C118,40 114,38 108,38 C104,42 102,48 105,56 Z",
    parent: "anterior",
  },
  occipital: {
    label: "Occipital Triangle",
    color: "hsl(170, 45%, 45%)",
    borders: "SCM (anteroinferiorly), trapezius (posteriorly), omohyoid inf. belly (inferiorly)",
    contents: "CN XI (accessory nerve), branches of cervical plexus (lesser occipital, great auricular, transverse cervical, supraclavicular nerves), floor muscles (splenius capitis, levator scapulae, scalenes)",
    clinicalNote: "CN XI enters posterior triangle from beneath SCM at Erb's point (junction of upper & middle thirds of posterior SCM border) and crosses to trapezius. The nerve puncture point for superficial cervical plexus block is at Erb's point.",
    pathD: "M155,58 L155,180 L240,180 C225,155 215,135 205,118 C195,100 185,85 175,72 C168,64 160,60 155,58 Z",
    parent: "posterior",
  },
  supraclavicular: {
    label: "Supraclavicular (Subclavian) Triangle",
    color: "hsl(320, 40%, 48%)",
    borders: "SCM (anterosuperiorly), omohyoid inf. belly (superiorly), clavicle (inferiorly)",
    contents: "Subclavian artery (3rd part), suprascapular artery, transverse cervical artery, brachial plexus trunks, subclavian vein (posterior to clavicle), external jugular vein termination",
    clinicalNote: "Supraclavicular brachial plexus block target — trunks/divisions above clavicle. Subclavian vein cannulation — risk of pneumothorax (apex of lung rises 2.5cm above middle third of clavicle). Omohyoid is key landmark.",
    pathD: "M155,180 L155,230 L240,230 C238,215 235,200 232,190 C225,185 215,182 200,180 Z",
    parent: "posterior",
  },
};

const triangleOrder: TriangleKey[] = ["anterior", "posterior", "carotid", "muscular", "submandibular", "submental", "occipital", "supraclavicular"];

const fascialLayers = [
  { name: "Investing layer", desc: "Encloses SCM and trapezius. Splits to form roof of posterior triangle. Attaches to hyoid, mandible, mastoid process." },
  { name: "Pretracheal (visceral) layer", desc: "Encloses thyroid gland, trachea, oesophagus, strap muscles. Extends into thorax as fibrous pericardium. Infection here → mediastinitis." },
  { name: "Prevertebral layer", desc: "Covers vertebral column, prevertebral muscles, scalenes, deep cervical muscles. Extends laterally as axillary sheath around brachial plexus & subclavian vessels." },
  { name: "Carotid sheath", desc: "Contains CCA/ICA, IJV, CN X (vagus). Formed by contributions from all three layers. Ansa cervicalis embedded in anterior wall." },
];

const NeckTrianglesDiagram = () => {
  const [selected, setSelected] = useState<TriangleKey>("anterior");
  const [showSubdivisions, setShowSubdivisions] = useState(true);
  const info = triangles[selected];

  // Positions for labels
  const labelPositions: Record<TriangleKey, { x: number; y: number; fontSize: number; label: string }> = {
    anterior: { x: 135, y: 200, fontSize: 6.5, label: "Anterior" },
    posterior: { x: 185, y: 170, fontSize: 6.5, label: "Posterior" },
    carotid: { x: 142, y: 110, fontSize: 5.5, label: "Carotid" },
    muscular: { x: 137, y: 195, fontSize: 5, label: "Muscular" },
    submandibular: { x: 140, y: 50, fontSize: 5, label: "Submand." },
    submental: { x: 112, y: 50, fontSize: 4.5, label: "SubMent." },
    occipital: { x: 185, y: 130, fontSize: 5, label: "Occipital" },
    supraclavicular: { x: 185, y: 210, fontSize: 4.5, label: "Supraclav." },
  };

  const displayTriangles = showSubdivisions
    ? triangleOrder
    : (["anterior", "posterior"] as TriangleKey[]);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Triangles of the Neck — Interactive</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a triangle to see borders, contents, and clinical relevance</p>

      <Tabs defaultValue="triangles">
        <TabsList className="grid w-full grid-cols-2 mb-3">
          <TabsTrigger value="triangles" className="text-xs">Triangle Map</TabsTrigger>
          <TabsTrigger value="fascia" className="text-xs">Fascial Layers</TabsTrigger>
        </TabsList>

        <TabsContent value="triangles">
          <div className="flex flex-wrap gap-1.5 mb-3">
            <button
              onClick={() => setShowSubdivisions(!showSubdivisions)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${showSubdivisions ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
            >
              {showSubdivisions ? "Show major only" : "Show subdivisions"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-shrink-0 mx-auto">
              <svg viewBox="60 0 220 260" width="260" height="260" className="border border-border rounded">
                {/* Head - lateral view profile */}
                <g stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.3">
                  <path d="M100,5 C80,5 65,15 60,30 C55,48 58,65 70,75 C62,78 58,82 60,88 C62,92 68,94 75,92" />
                  <path d="M75,92 C85,95 100,92 108,85 C115,78 120,68 130,62 C140,56 152,50 165,48" />
                  <path d="M108,85 C112,80 118,72 125,65 C132,58 140,52 148,48" />
                  <path d="M165,48 C170,42 175,38 178,35 C180,32 178,28 175,25 C172,22 168,25 166,30 C164,35 162,42 165,48" />
                  <path d="M100,5 C120,2 140,5 158,15 C170,22 175,25 175,25" />
                </g>

                {/* Anatomical landmarks */}
                <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" fill="none" opacity="0.4">
                  <path d="M75,92 C90,96 105,95 115,90 C125,84 135,72 148,62 C158,54 168,48 175,46" strokeWidth="1.8" />
                  <path d="M168,42 C165,48 160,56 155,65 C150,78 148,95 150,115 C152,140 154,170 155,200 C156,218 155,228 155,230" strokeWidth="2" opacity="0.5" />
                  <path d="M175,75 C185,95 200,130 215,170 C225,195 235,218 240,230" strokeWidth="1.5" opacity="0.35" strokeDasharray="4 2" />
                  <path d="M115,230 C130,228 155,226 180,228 C210,230 240,230 260,228" strokeWidth="2" opacity="0.5" />
                  <path d="M110,92 C115,88 120,86 125,88" strokeWidth="1.5" />
                  <line x1="125" y1="56" x2="125" y2="230" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
                </g>

                {/* Omohyoid - divides posterior into occipital + supraclavicular */}
                {showSubdivisions && (
                  <path d="M130,140 C140,145 148,155 155,170 C160,178 170,180 195,180"
                    stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="3 2" />
                )}

                {/* Triangle regions */}
                {displayTriangles.map((key) => {
                  const t = triangles[key];
                  const isActive = selected === key;
                  // Don't show parent if subdivisions visible and a child is more specific
                  if (showSubdivisions && (key === "anterior" || key === "posterior")) {
                    return (
                      <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                        <path
                          d={t.pathD}
                          fill={t.color}
                          fillOpacity={isActive ? 0.15 : 0.02}
                          stroke={isActive ? t.color : "transparent"}
                          strokeWidth={isActive ? 2 : 0}
                          strokeDasharray="4 2"
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  }
                  return (
                    <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                      <path
                        d={t.pathD}
                        fill={t.color}
                        fillOpacity={isActive ? 0.4 : 0.08}
                        stroke={t.color}
                        strokeWidth={isActive ? 2.5 : 0.8}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}

                {/* Labels */}
                <g className="select-none">
                  {displayTriangles.map(key => {
                    const pos = labelPositions[key];
                    const isActive = selected === key;
                    return (
                      <text
                        key={key}
                        x={pos.x} y={pos.y}
                        fontSize={pos.fontSize}
                        fill={isActive ? triangles[key].color : "hsl(var(--muted-foreground))"}
                        fontWeight={isActive ? "bold" : "normal"}
                        className="cursor-pointer"
                        onClick={() => setSelected(key)}
                        opacity={isActive ? 1 : 0.7}
                      >
                        {pos.label}
                      </text>
                    );
                  })}
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
                    <text x="152" y="103" fontSize="4.5" fill="hsl(0, 55%, 52%)">Carotid bifurc. (C3/4)</text>
                    {/* CN XII */}
                    <path d="M145,95 C150,92 156,90 162,92" stroke="hsl(40, 60%, 50%)" strokeWidth="1.2" fill="none" strokeDasharray="2 1" opacity="0.6" />
                    <text x="164" y="90" fontSize="4" fill="hsl(40, 60%, 50%)">CN XII</text>
                  </g>
                )}
                {selected === "posterior" && (
                  <g className="animate-fade-in">
                    <path d="M165,80 C175,90 190,105 205,120" stroke="hsl(140, 50%, 48%)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity="0.7" />
                    <text x="175" y="78" fontSize="5" fill="hsl(140, 50%, 48%)">CN XI (superficial!)</text>
                    <path d="M160,200 C165,195 172,192 180,192" stroke="hsl(30, 60%, 52%)" strokeWidth="2" fill="none" opacity="0.5" />
                    <text x="183" y="195" fontSize="4.5" fill="hsl(30, 60%, 52%)">Brachial plexus</text>
                    {/* Phrenic nerve */}
                    <path d="M158,160 C156,175 155,190 155,210" stroke="hsl(60, 50%, 50%)" strokeWidth="1" fill="none" strokeDasharray="2 1" opacity="0.5" />
                    <text x="140" y="178" fontSize="3.5" fill="hsl(60, 50%, 50%)">Phrenic n.</text>
                  </g>
                )}
                {selected === "occipital" && (
                  <g className="animate-fade-in">
                    <path d="M158,72 C168,82 178,95 188,110 C198,125 205,140 210,155" stroke="hsl(170, 45%, 45%)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity="0.7" />
                    <text x="195, 88" fontSize="4" fill="hsl(170, 45%, 45%)" x="198" y="92">CN XI path</text>
                    {/* Erb's point */}
                    <circle cx="158" cy="100" r="3" fill="none" stroke="hsl(170, 45%, 45%)" strokeWidth="1.5" opacity="0.7" />
                    <text x="134" y="104" fontSize="4" fill="hsl(170, 45%, 45%)">Erb's pt</text>
                  </g>
                )}
                {selected === "supraclavicular" && (
                  <g className="animate-fade-in">
                    <path d="M170,210 C175,208 180,207 188,208" stroke="hsl(320, 40%, 48%)" strokeWidth="2" fill="none" opacity="0.6" />
                    <text x="192" y="210" fontSize="4" fill="hsl(320, 40%, 48%)">Subclavian a. (3rd part)</text>
                    {/* Lung apex */}
                    <path d="M180,226 C186,220 192,218 200,220" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" fill="none" strokeDasharray="2 1" opacity="0.4" />
                    <text x="202" y="222" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.6">Lung apex</text>
                  </g>
                )}
                {selected === "muscular" && (
                  <g className="animate-fade-in">
                    <path d="M130,180 C132,185 134,192 135,200" stroke="hsl(50, 65%, 48%)" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.6" />
                    <text x="122" y="212" fontSize="4.5" fill="hsl(50, 65%, 48%)">RLN (T-O groove)</text>
                    <ellipse cx="140" cy="180" rx="12" ry="8" fill="none" stroke="hsl(270, 45%, 52%)" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 1" />
                    <text x="124" y="176" fontSize="3.5" fill="hsl(270, 45%, 52%)" opacity="0.6">Thyroid</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
                  {info.parent && (
                    <Badge variant="outline" className="text-xs">
                      Sub of {info.parent === "anterior" ? "Anterior" : "Posterior"}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Borders:</strong> {info.borders}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Contents:</strong> {info.contents}</p>
                <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
                  <strong>Clinical:</strong> {info.clinicalNote}
                </p>
              </div>

              {/* Triangle selector */}
              <div className="flex flex-wrap gap-1">
                {triangleOrder.map(key => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors border ${
                      selected === key ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                    style={selected === key ? { borderColor: triangles[key].color, backgroundColor: triangles[key].color + "18" } : {}}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: triangles[key].color, opacity: 0.7 }} />
                    {triangles[key].label.replace(" Triangle", "").replace("Submandibular (Digastric)", "Submand.").replace("Supraclavicular (Subclavian)", "Supraclav.")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fascia">
          <p className="text-sm text-muted-foreground mb-3">
            The deep cervical fascia has three layers that compartmentalise neck structures. Understanding these layers is crucial for predicting infection spread and planning nerve blocks.
          </p>
          <div className="space-y-3">
            {fascialLayers.map((layer, i) => (
              <div key={i} className="p-3 rounded-lg border border-border">
                <p className="text-sm font-semibold text-foreground">{i + 1}. {layer.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{layer.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
            <p className="text-xs text-muted-foreground">
              Retropharyngeal space (between buccopharyngeal fascia & prevertebral layer) extends from skull base to T1–T4 → abscess here can track into mediastinum. The <strong>danger space</strong> (between prevertebral fascia layers) extends to diaphragm.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeckTrianglesDiagram;
