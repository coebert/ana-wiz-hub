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
  parent?: "anterior" | "posterior";
}

const triangles: Record<TriangleKey, TriangleInfo> = {
  anterior: {
    label: "Anterior Triangle",
    color: "hsl(210, 55%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), mandible (superiorly)",
    contents: "Carotid sheath (CCA/ICA/ECA, IJV, vagus nerve), thyroid gland, larynx, trachea, submandibular gland, infrahyoid strap muscles, ansa cervicalis",
    clinicalNote: "Contains all major structures for airway management and vascular access. IJV cannulation at apex of triangle between SCM heads. Subdivided into 4 smaller triangles. Deep cervical fascia layers within: investing, pretracheal, prevertebral.",
  },
  posterior: {
    label: "Posterior Triangle",
    color: "hsl(140, 50%, 48%)",
    borders: "SCM (anteriorly), trapezius (posteriorly), middle 1/3 of clavicle (inferiorly). Floor: splenius capitis, levator scapulae, anterior & middle scalenes. Roof: investing layer of deep cervical fascia",
    contents: "Accessory nerve (CN XI — superficial!), brachial plexus trunks (upper/middle/lower), subclavian artery (3rd part), external jugular vein, transverse cervical & suprascapular arteries, phrenic nerve on anterior scalene, cervical plexus",
    clinicalNote: "CN XI crosses superficially — vulnerable during lymph node biopsy → shoulder drop (trapezius palsy). Brachial plexus trunks between scalenes — target for interscalene & supraclavicular blocks. Phrenic nerve (C3,4,5) descends on anterior scalene — at risk with interscalene block (100% ipsilateral hemidiaphragm paresis).",
  },
  carotid: {
    label: "Carotid Triangle",
    color: "hsl(0, 55%, 52%)",
    borders: "SCM (posteriorly), sup. belly of omohyoid (inferiorly), post. belly of digastric (superiorly)",
    contents: "CCA bifurcation (C3/4 — upper thyroid cartilage), carotid body & sinus, ICA, ECA & branches, IJV, CN X (vagus), CN XII (hypoglossal), CN XI, internal branch of SLN, ansa cervicalis root",
    clinicalNote: "Carotid endarterectomy site. Carotid body = chemoreceptor (O₂/CO₂/pH). Carotid sinus = baroreceptor (glossopharyngeal IX) — massage → bradycardia. CN XII crosses ECA/ICA laterally — at risk in carotid surgery → tongue deviation to operated side.",
    parent: "anterior",
  },
  muscular: {
    label: "Muscular Triangle",
    color: "hsl(270, 45%, 52%)",
    borders: "Midline (medially), SCM (posterolaterally), sup. belly of omohyoid (superolaterally)",
    contents: "Infrahyoid strap muscles (sternohyoid, sternothyroid, thyrohyoid, omohyoid), thyroid & parathyroid glands, trachea, oesophagus, RLN in tracheo-oesophageal groove, inferior thyroid artery",
    clinicalNote: "Thyroidectomy and tracheostomy site. RLN in tracheo-oesophageal groove — at risk during thyroid surgery (unilateral → hoarseness; bilateral → stridor). Inf. thyroid artery from thyrocervical trunk crosses RLN — ligate lateral to avoid nerve injury.",
    parent: "anterior",
  },
  submandibular: {
    label: "Submandibular (Digastric) Triangle",
    color: "hsl(30, 60%, 52%)",
    borders: "Mandible (superiorly), ant. belly of digastric (anteroinferiorly), post. belly of digastric (posteroinferiorly)",
    contents: "Submandibular gland (superficial & deep parts around mylohyoid), facial artery & vein, hypoglossal nerve (CN XII), mylohyoid nerve, lingual nerve, submandibular ganglion, submental artery",
    clinicalNote: "Submandibular gland excision — lingual nerve loops under submandibular duct (Wharton's). Facial artery palpable at anterior masseter border on mandible (pulse point). Deep part of gland wraps around posterior mylohyoid.",
    parent: "anterior",
  },
  submental: {
    label: "Submental Triangle",
    color: "hsl(50, 60%, 50%)",
    borders: "Hyoid (inferiorly), ant. belly of digastric bilaterally. Floor: mylohyoid. Only unpaired midline triangle.",
    contents: "Submental lymph nodes (drain lower lip tip, floor of mouth, tip of tongue), small veins joining anterior jugular",
    clinicalNote: "Submental intubation route passes through this space (alternative to tracheostomy in maxillofacial trauma). Submental nodes → submandibular → deep cervical chain.",
    parent: "anterior",
  },
  occipital: {
    label: "Occipital Triangle",
    color: "hsl(170, 45%, 45%)",
    borders: "SCM (anteroinferiorly), trapezius (posteriorly), omohyoid inf. belly (inferiorly)",
    contents: "CN XI (accessory nerve), branches of cervical plexus (lesser occipital, great auricular, transverse cervical, supraclavicular nerves), floor muscles (splenius capitis, levator scapulae, scalenes)",
    clinicalNote: "CN XI enters posterior triangle from beneath SCM at Erb's point (junction of upper & middle thirds of posterior SCM border) and crosses to trapezius. The nerve puncture point for superficial cervical plexus block is at Erb's point.",
    parent: "posterior",
  },
  supraclavicular: {
    label: "Supraclavicular (Subclavian) Triangle",
    color: "hsl(320, 40%, 48%)",
    borders: "SCM (anterosuperiorly), omohyoid inf. belly (superiorly), clavicle (inferiorly)",
    contents: "Subclavian artery (3rd part), suprascapular artery, transverse cervical artery, brachial plexus trunks, subclavian vein (posterior to clavicle), external jugular vein termination",
    clinicalNote: "Supraclavicular brachial plexus block target — trunks/divisions above clavicle. Subclavian vein cannulation — risk of pneumothorax (apex of lung rises 2.5cm above middle third of clavicle). Omohyoid is key landmark.",
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

/* ─── Key anatomical points (lateral view, right side) ─── */
// Skull / jaw
const VERTEX = "105,18";
const OCCIPUT = "62,42";
const MASTOID = "68,72";        // mastoid process
const EAR = "64,58";
const MANDIBLE_ANGLE = "88,82"; // angle of mandible
const MANDIBLE_BODY = "100,90"; // body
const CHIN = "108,86";          // mentum / chin point
const GONION = "88,82";

// Key neck points
const HYOID = "108,108";        // hyoid bone level
const SCM_ORIGIN = MASTOID;     // mastoid
const SCM_INSERT_ST = "130,220";// sternal head SCM
const SCM_INSERT_CL = "140,218";// clavicular head SCM
const MIDLINE_HYOID = "108,108";
const MIDLINE_STERNAL = "108,220";
const TRAPEZIUS_OCCIPUT = "62,50";
const TRAPEZIUS_SHOULDER = "210,218";
const CLAVICLE_MED = "120,222";
const CLAVICLE_LAT = "210,222";

// Digastric reference points
const DIGASTRIC_ANT = "108,98"; // ant. belly → near hyoid/chin
const DIGASTRIC_POST = "80,78"; // post. belly → near mastoid

// Omohyoid crossing SCM
const OMOHYOID_SCM = "124,172";
const OMOHYOID_LAT = "175,168";

// Triangle paths (SVG polygon-style)
// Anterior triangle: midline – mandible – SCM
const PATH_ANTERIOR = `M${CHIN} L${MANDIBLE_ANGLE} L${MASTOID} L${SCM_INSERT_ST} L${MIDLINE_STERNAL} L${MIDLINE_HYOID} L${HYOID} Z`;
// Posterior triangle: SCM – trapezius – clavicle
const PATH_POSTERIOR = `M${MASTOID} L${TRAPEZIUS_OCCIPUT} L${TRAPEZIUS_SHOULDER} L${CLAVICLE_LAT} L${SCM_INSERT_CL} L${SCM_INSERT_ST} Z`;

// Subdivisions of anterior
const PATH_CAROTID = `M${MANDIBLE_ANGLE} L${DIGASTRIC_POST} L${OMOHYOID_SCM} L${SCM_INSERT_ST} Q118,145 ${OMOHYOID_SCM} L${MANDIBLE_ANGLE} Z`;
// Simplified: carotid = post digastric – omohyoid – SCM
const PATH_CAROTID_2 = `M${GONION} L68,72 L124,172 L130,220 Q125,142 ${GONION} Z`;
// Actually let me build proper paths

// Better approach: define points as numbers
const pts = {
  chin: [108, 86],
  mandAngle: [88, 82],
  mastoid: [68, 72],
  hyoid: [108, 108],
  midSternal: [108, 222],
  scmSternal: [130, 222],
  scmClavic: [138, 220],
  trapOcciput: [62, 50],
  trapShoulder: [210, 220],
  clavMed: [120, 222],
  clavLat: [210, 222],
  digastricAnt: [108, 98],   // near chin/hyoid
  digastricPost: [78, 78],   // near mastoid
  omohyoidSCM: [122, 170],   // where omohyoid crosses SCM
  omohyoidLat: [172, 166],   // lateral end of omohyoid
} as const;

function p(...coords: (readonly [number, number])[]): string {
  return coords.map(c => c.join(",")).join(" L");
}

const NeckTrianglesDiagram = () => {
  const [selected, setSelected] = useState<TriangleKey>("anterior");
  const [showSubdivisions, setShowSubdivisions] = useState(true);
  const info = triangles[selected];

  // Build triangle SVG paths
  const paths: Record<TriangleKey, string> = {
    anterior: `M${p(pts.chin, pts.mandAngle, pts.mastoid, pts.scmSternal, pts.midSternal, pts.hyoid)} Z`,
    posterior: `M${p(pts.mastoid, pts.trapOcciput, pts.trapShoulder, pts.clavLat, pts.scmClavic, pts.scmSternal)} Z`,
    // Carotid: post. digastric (sup), omohyoid sup belly (inf), SCM (post)
    carotid: `M${p(pts.mandAngle, pts.digastricPost, pts.mastoid, pts.omohyoidSCM)} Z`,
    // Muscular: midline, SCM, omohyoid sup belly
    muscular: `M${p(pts.hyoid, pts.omohyoidSCM, pts.scmSternal, pts.midSternal)} Z`,
    // Submandibular: mandible, ant digastric, post digastric
    submandibular: `M${p(pts.chin, pts.mandAngle, pts.digastricPost, pts.digastricAnt)} Z`,
    // Submental: hyoid, ant belly of digastric (bilateral - shown as small triangle at midline)
    submental: `M${p(pts.chin, pts.digastricAnt, pts.hyoid)} Z`,
    // Occipital: SCM, trapezius, omohyoid inf belly
    occipital: `M${p(pts.mastoid, pts.trapOcciput, pts.trapShoulder, pts.omohyoidLat, pts.omohyoidSCM)} Z`,
    // Supraclavicular: SCM, omohyoid, clavicle
    supraclavicular: `M${p(pts.omohyoidSCM, pts.omohyoidLat, pts.clavLat, pts.scmClavic, pts.scmSternal)} Z`,
  };

  const labelPositions: Record<TriangleKey, { x: number; y: number; fontSize: number; label: string }> = {
    anterior: { x: 104, y: 160, fontSize: 6, label: "Anterior" },
    posterior: { x: 148, y: 170, fontSize: 6, label: "Posterior" },
    carotid: { x: 88, y: 128, fontSize: 5.5, label: "Carotid" },
    muscular: { x: 110, y: 195, fontSize: 5, label: "Muscular" },
    submandibular: { x: 88, y: 90, fontSize: 4.5, label: "Submand." },
    submental: { x: 105, y: 97, fontSize: 4, label: "SubMent." },
    occipital: { x: 130, y: 130, fontSize: 5, label: "Occipital" },
    supraclavicular: { x: 148, y: 200, fontSize: 4.5, label: "Supraclav." },
  };

  const displayTriangles = showSubdivisions
    ? triangleOrder
    : (["anterior", "posterior"] as TriangleKey[]);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Triangles of the Neck — Interactive</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a triangle to see borders, contents, and clinical relevance. Right lateral view.</p>

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
              <svg viewBox="20 5 230 240" width="300" height="280" className="border border-border rounded bg-card">
                {/* ─── Head silhouette (right lateral) ─── */}
                <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" opacity="0.25">
                  {/* Skull vault */}
                  <path d="M105,18 C85,15 68,22 58,36 C52,46 54,56 58,64" />
                  {/* Occiput to mastoid */}
                  <path d="M58,64 C60,68 64,72 68,72" />
                  {/* Ear */}
                  <path d="M64,52 C58,54 56,60 58,66 C60,70 64,72 66,70" />
                  {/* Top of head to forehead to nose to chin */}
                  <path d="M105,18 C118,16 128,20 132,28 C136,36 134,46 130,52 C128,56 126,60 125,64 C124,68 126,74 124,78 C120,82 114,86 108,86" />
                  {/* Mandible: chin → angle */}
                  <path d="M108,86 C102,86 94,84 88,82" strokeWidth="2" opacity="0.35" />
                </g>

                {/* ─── Bony landmarks ─── */}
                <g fill="hsl(var(--foreground))" opacity="0.2">
                  {/* Mastoid process */}
                  <circle cx="68" cy="72" r="3" />
                  {/* Hyoid */}
                  <ellipse cx="108" cy="108" rx="6" ry="2.5" />
                </g>

                {/* ─── SCM muscle (thick band from mastoid to sternum/clavicle) ─── */}
                <path
                  d={`M${p(pts.mastoid)} C85,100 100,140 115,175 C120,190 125,205 ${p(pts.scmSternal)}`}
                  stroke="hsl(var(--foreground))" strokeWidth="3" fill="none" opacity="0.2"
                />
                {/* SCM clavicular head */}
                <path
                  d={`M120,200 C125,208 130,214 ${p(pts.scmClavic)}`}
                  stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" opacity="0.15"
                />

                {/* ─── Trapezius (posterior border) ─── */}
                <path
                  d={`M${p(pts.trapOcciput)} C80,80 120,130 160,170 C180,190 195,205 ${p(pts.trapShoulder)}`}
                  stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" opacity="0.15" strokeDasharray="6 3"
                />

                {/* ─── Clavicle ─── */}
                <path
                  d={`M${p(pts.clavMed)} C140,218 170,216 ${p(pts.clavLat)}`}
                  stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" opacity="0.3"
                />

                {/* ─── Midline (anterior border) ─── */}
                <line x1="108" y1="86" x2="108" y2="222" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.15" strokeDasharray="4 3" />

                {/* ─── Digastric muscle (ant + post bellies) ─── */}
                {showSubdivisions && (
                  <g stroke="hsl(var(--foreground))" strokeWidth="1" fill="none" opacity="0.18" strokeDasharray="3 2">
                    {/* Post belly: mastoid → intermediate tendon near hyoid */}
                    <path d={`M${p(pts.digastricPost)} C85,85 95,90 ${p(pts.digastricAnt)}`} />
                    {/* Ant belly: intermediate tendon → chin */}
                    <path d={`M${p(pts.digastricAnt)} C106,94 108,90 ${p(pts.chin)}`} />
                  </g>
                )}

                {/* ─── Omohyoid (divides posterior triangle) ─── */}
                {showSubdivisions && (
                  <path d={`M108,155 C112,160 118,168 ${p(pts.omohyoidSCM)} C135,168 150,167 ${p(pts.omohyoidLat)}`}
                    stroke="hsl(var(--foreground))" strokeWidth="1" fill="none" opacity="0.2" strokeDasharray="4 2" />
                )}

                {/* ─── Triangle fill regions ─── */}
                {displayTriangles.map((key) => {
                  const isActive = selected === key;
                  const t = triangles[key];
                  // Parent triangles rendered as faint outlines when subdivisions shown
                  if (showSubdivisions && (key === "anterior" || key === "posterior")) {
                    return (
                      <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                        <path
                          d={paths[key]}
                          fill={t.color}
                          fillOpacity={isActive ? 0.12 : 0.02}
                          stroke={isActive ? t.color : "transparent"}
                          strokeWidth={isActive ? 1.5 : 0}
                          strokeDasharray="5 3"
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  }
                  return (
                    <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                      <path
                        d={paths[key]}
                        fill={t.color}
                        fillOpacity={isActive ? 0.4 : 0.1}
                        stroke={t.color}
                        strokeWidth={isActive ? 2.5 : 1}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}

                {/* ─── Triangle labels ─── */}
                <g className="select-none pointer-events-none">
                  {displayTriangles.map(key => {
                    const pos = labelPositions[key];
                    const isActive = selected === key;
                    // Hide parent labels when subdivisions are shown and it's not selected
                    if (showSubdivisions && (key === "anterior" || key === "posterior") && !isActive) return null;
                    return (
                      <text
                        key={key}
                        x={pos.x} y={pos.y}
                        fontSize={pos.fontSize}
                        fill={isActive ? triangles[key].color : "hsl(var(--muted-foreground))"}
                        fontWeight={isActive ? "bold" : "normal"}
                        textAnchor="middle"
                        opacity={isActive ? 1 : 0.6}
                      >
                        {pos.label}
                      </text>
                    );
                  })}
                </g>

                {/* ─── Anatomical landmark labels ─── */}
                <g fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.45" className="select-none pointer-events-none">
                  <text x="72" y="70" fontSize="4.5">Mastoid</text>
                  <text x="100" y="115" fontSize="4.5">Hyoid</text>
                  <text x="128" y="216" fontSize="5" transform="rotate(-4,128,216)">Clavicle</text>
                  <text x="100" y="234" fontSize="4.5">Midline</text>
                  {/* SCM label along muscle */}
                  <text x="105" y="152" fontSize="5.5" transform="rotate(68,105,152)" fontWeight="500">SCM</text>
                  {/* Trapezius */}
                  <text x="160" y="158" fontSize="5" transform="rotate(38,160,158)">Trapezius</text>
                  {/* Mandible */}
                  <text x="92" y="80" fontSize="4.5">Mandible</text>
                  {showSubdivisions && <>
                    <text x="116" y="168" fontSize="3.8" opacity="0.35">Omohyoid</text>
                    <text x="82" y="92" fontSize="3.5" opacity="0.35">Digastric</text>
                  </>}
                </g>

                {/* ─── Context-sensitive anatomical overlays ─── */}
                {selected === "carotid" && (
                  <g className="animate-fade-in">
                    {/* Carotid bifurcation marker */}
                    <circle cx="95" cy="112" r="4" fill="none" stroke="hsl(0, 55%, 52%)" strokeWidth="1.5" opacity="0.7" />
                    <circle cx="95" cy="112" r="1.5" fill="hsl(0, 55%, 52%)" opacity="0.7" />
                    <text x="78" y="122" fontSize="4.5" fill="hsl(0, 55%, 52%)" fontWeight="500">Carotid bifurc.</text>
                    <text x="78" y="127" fontSize="3.5" fill="hsl(0, 55%, 52%)" opacity="0.7">(C3/4 level)</text>
                    {/* ICA + ECA */}
                    <path d="M95,112 L90,96 L86,85" stroke="hsl(0, 65%, 55%)" strokeWidth="1.2" fill="none" opacity="0.5" />
                    <path d="M95,112 L100,98 L98,88" stroke="hsl(0, 45%, 45%)" strokeWidth="1" fill="none" opacity="0.4" />
                    <text x="80" y="84" fontSize="3.5" fill="hsl(0, 65%, 55%)">ICA</text>
                    <text x="99" y="86" fontSize="3.5" fill="hsl(0, 45%, 45%)">ECA</text>
                    {/* CN XII */}
                    <path d="M88,100 C95,96 102,95 108,97" stroke="hsl(40, 60%, 50%)" strokeWidth="1" fill="none" strokeDasharray="2 1.5" opacity="0.5" />
                    <text x="110" y="96" fontSize="3.5" fill="hsl(40, 60%, 50%)">CN XII</text>
                  </g>
                )}
                {(selected === "posterior" || selected === "occipital") && (
                  <g className="animate-fade-in">
                    {/* CN XI path across posterior triangle */}
                    <path d="M82,88 C100,100 130,120 160,140 C180,152 195,164 205,178"
                      stroke="hsl(140, 50%, 48%)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" opacity="0.65" />
                    <text x="135" y="115" fontSize="4.5" fill="hsl(140, 50%, 48%)" fontWeight="500">CN XI (superficial!)</text>
                    {/* Erb's point */}
                    <circle cx="90" cy="118" r="3.5" fill="none" stroke="hsl(50, 70%, 55%)" strokeWidth="1.5" opacity="0.7" />
                    <text x="74" y="116" fontSize="3.5" fill="hsl(50, 70%, 55%)" fontWeight="500">Erb's pt</text>
                    {/* Brachial plexus trunks */}
                    <path d="M100,175 C120,180 140,182 165,184" stroke="hsl(30, 60%, 52%)" strokeWidth="2" fill="none" opacity="0.45" />
                    <text x="135" y="192" fontSize="4" fill="hsl(30, 60%, 52%)">Brachial plexus</text>
                    {/* Phrenic nerve */}
                    <path d="M98,130 C100,150 105,170 110,195" stroke="hsl(60, 50%, 50%)" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" opacity="0.4" />
                    <text x="82" y="152" fontSize="3.5" fill="hsl(60, 50%, 50%)">Phrenic n.</text>
                  </g>
                )}
                {selected === "supraclavicular" && (
                  <g className="animate-fade-in">
                    <path d="M135,205 C145,200 155,198 170,200" stroke="hsl(320, 40%, 48%)" strokeWidth="2" fill="none" opacity="0.6" />
                    <text x="148" y="196" fontSize="4" fill="hsl(320, 40%, 48%)">Subclavian a.</text>
                    {/* Lung apex */}
                    <path d="M150,222 C158,214 168,212 178,216" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" opacity="0.35" />
                    <text x="180" y="214" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.55">Lung apex</text>
                  </g>
                )}
                {selected === "muscular" && (
                  <g className="animate-fade-in">
                    {/* RLN in tracheo-oesophageal groove */}
                    <path d="M109,160 C110,175 110,190 110,208" stroke="hsl(50, 65%, 48%)" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.5" />
                    <text x="92" y="206" fontSize="4" fill="hsl(50, 65%, 48%)">RLN</text>
                    {/* Thyroid gland */}
                    <ellipse cx="114" cy="175" rx="10" ry="14" fill="none" stroke="hsl(270, 45%, 52%)" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 1.5" />
                    <text x="126" y="178" fontSize="3.5" fill="hsl(270, 45%, 52%)" opacity="0.6">Thyroid</text>
                  </g>
                )}
                {selected === "submandibular" && (
                  <g className="animate-fade-in">
                    {/* Submandibular gland */}
                    <ellipse cx="93" cy="88" rx="8" ry="5" fill="none" stroke="hsl(30, 60%, 52%)" strokeWidth="1" opacity="0.5" strokeDasharray="3 1.5" />
                    <text x="80" y="98" fontSize="3.5" fill="hsl(30, 60%, 52%)">SM gland</text>
                    {/* Facial artery */}
                    <path d="M85,86 C82,82 80,78 82,74" stroke="hsl(0, 50%, 55%)" strokeWidth="1" fill="none" opacity="0.4" />
                    <text x="68" y="74" fontSize="3.5" fill="hsl(0, 50%, 55%)">Facial a.</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: info.color }} />
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

              {/* Triangle selector chips */}
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
