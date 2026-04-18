import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withAlpha } from "@/lib/color-utils";

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

/* ════════════════════════════════════════════════════════════
   ANATOMICAL LANDMARK COORDINATES — right lateral view
   All coordinates in SVG viewBox units (0-280 x, 0-260 y)
   ════════════════════════════════════════════════════════════ */

const pts = {
  // Skull / mandible
  chin: [118, 82] as const,           // mental protuberance
  mandBody: [106, 78] as const,       // body of mandible mid-point
  mandAngle: [82, 76] as const,       // angle (gonion)
  mandRamus: [78, 60] as const,       // ramus — posterior ascending border
  mastoid: [72, 62] as const,         // mastoid process tip

  // Neck landmarks
  hyoid: [118, 106] as const,         // greater horn of hyoid
  midSternal: [118, 230] as const,    // midline at sternum level

  // SCM — band shape (anterior + posterior edges)
  scmMastoid: [72, 62] as const,      // origin
  scmSternalHead: [134, 232] as const, // sternal head insertion
  scmClavHead: [148, 228] as const,    // clavicular head insertion
  // SCM posterior edge control points
  scmPostMid: [100, 145] as const,

  // Digastric
  digastricPost: [76, 72] as const,    // post belly near mastoid
  digastricIntermed: [108, 96] as const, // intermediate tendon (hyoid level)
  digastricAnt: [118, 90] as const,    // ant belly at chin

  // Omohyoid
  omohyoidMid: [118, 164] as const,    // sup belly near midline
  omohyoidSCM: [128, 172] as const,    // crosses SCM
  omohyoidLat: [184, 170] as const,    // inf belly lateral end

  // Trapezius
  trapOcciput: [60, 40] as const,      // superior nuchal line
  trapShoulder: [224, 224] as const,   // acromion

  // Clavicle
  clavMed: [128, 232] as const,
  clavLat: [224, 230] as const,
};

const NeckTrianglesDiagram = () => {
  const [selected, setSelected] = useState<TriangleKey>("anterior");
  const [showSubdivisions, setShowSubdivisions] = useState(true);
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = triangles[selected];

  // ── SCM centreline path (curved) for triangle boundaries ──
  // SCM anterior edge from mastoid → sternal head
  const scmAntEdge = `M72,62 C82,90 100,135 114,172 C122,195 128,215 134,232`;
  // SCM posterior edge from mastoid → clavicular head
  const scmPostEdge = `M72,62 C88,95 108,148 124,180 C136,205 142,220 148,228`;

  // ── Triangle paths with curved SCM borders ──
  const paths: Record<TriangleKey, string> = {
    // Anterior: chin → mandible body → angle → along SCM ant edge → sternal notch → midline up
    anterior: `M118,82 L106,78 L82,76 C82,90 100,135 114,172 C122,195 128,215 134,232 L118,230 L118,106 Z`,
    // Posterior: mastoid → trapezius occiput → shoulder → clavicle → SCM clavicular head → along SCM post edge back
    posterior: `M72,62 L60,40 C100,80 150,140 190,185 L224,224 L224,230 L148,228 C136,205 108,148 88,95 Z`,
    // Carotid: mandible angle → digastric post → along SCM to omohyoid crossing → omohyoid sup belly back
    carotid: `M82,76 C80,74 76,72 76,72 C82,90 96,120 108,148 L128,172 C122,164 118,156 108,148 C100,130 90,108 82,76 Z`,
    // Muscular: hyoid → midline down → sternal → SCM ant edge up → omohyoid back to hyoid
    muscular: `M118,106 L118,230 L134,232 C128,215 122,195 114,172 L128,172 C122,164 120,150 118,106 Z`,
    // Submandibular: mandible (chin→angle) → digastric post → intermed tendon → digastric ant → chin
    submandibular: `M118,82 L106,78 L82,76 C80,74 76,72 76,72 C82,78 95,88 108,96 L118,90 Z`,
    // Submental: chin → digastric ant → hyoid
    submental: `M118,82 L118,90 L108,96 L118,106 Z`,
    // Occipital: mastoid → trapezius → omohyoid lat → omohyoid SCM → along SCM post edge
    occipital: `M72,62 L60,40 C100,80 150,140 190,185 L224,224 L184,170 L128,172 C108,148 88,95 72,62 Z`,
    // Supraclavicular: omohyoid SCM → omohyoid lat → clavicle → SCM clavicular head
    supraclavicular: `M128,172 L184,170 L224,224 L224,230 L148,228 C136,205 130,190 128,172 Z`,
  };

  const labelPositions: Record<TriangleKey, { x: number; y: number; fontSize: number; label: string }> = {
    anterior: { x: 115, y: 160, fontSize: 6, label: "Anterior" },
    posterior: { x: 155, y: 165, fontSize: 6, label: "Posterior" },
    carotid: { x: 96, y: 128, fontSize: 5.5, label: "Carotid" },
    muscular: { x: 120, y: 200, fontSize: 5, label: "Muscular" },
    submandibular: { x: 96, y: 86, fontSize: 4.5, label: "Submand." },
    submental: { x: 116, y: 96, fontSize: 4, label: "SubMent." },
    occipital: { x: 140, y: 128, fontSize: 5, label: "Occipital" },
    supraclavicular: { x: 164, y: 208, fontSize: 4.5, label: "Supraclav." },
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
            <button
              onClick={() => setShowSutures(!showSutures)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${showSutures ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
            >
              Sutures & detail
            </button>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
            >
              Labels
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-shrink-0 mx-auto">
              <svg viewBox="15 0 240 255" width="310" height="290" className="border border-border rounded bg-card">
                <defs>
                  {/* Bone texture for mandible */}
                  <linearGradient id="nt-boneGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.06" />
                  </linearGradient>
                  {/* SCM muscle gradient — fibre-direction shading */}
                  <linearGradient id="nt-scmGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 50%, 55%)" stopOpacity="0.18" />
                    <stop offset="50%" stopColor="hsl(0, 55%, 45%)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="hsl(0, 50%, 55%)" stopOpacity="0.14" />
                  </linearGradient>
                  {/* Per-triangle depth shading — radial highlight */}
                  {triangleOrder.map((key) => (
                    <radialGradient key={`grad-${key}`} id={`nt-grad-${key}`} cx="50%" cy="40%" r="65%">
                      <stop offset="0%" stopColor={triangles[key].color} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={triangles[key].color} stopOpacity="0.08" />
                    </radialGradient>
                  ))}
                  {/* Subtle skin/tissue grain */}
                  <pattern id="nt-grain" patternUnits="userSpaceOnUse" width="5" height="5">
                    <circle cx="1" cy="1" r="0.35" fill="hsl(var(--muted-foreground))" opacity="0.16" />
                  </pattern>
                  {/* Drop shadow for prominent structures */}
                  <filter id="nt-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                    <feOffset dx="0.5" dy="1.2" result="off" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Compass */}
                {showLabels && (
                  <g fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">
                    <text x="138" y="8" textAnchor="middle">SUPERIOR</text>
                    <text x="138" y="252" textAnchor="middle">INFERIOR</text>
                    <text x="22" y="130" textAnchor="middle" transform="rotate(-90, 22, 130)">ANTERIOR</text>
                    <text x="248" y="130" textAnchor="middle" transform="rotate(90, 248, 130)">POSTERIOR</text>
                  </g>
                )}

                {/* Tissue grain background overlay */}
                <rect x="15" y="0" width="240" height="255" fill="url(#nt-grain)" opacity="0.5" />

                {/* ════════ HEAD SILHOUETTE ════════ */}
                <g stroke="hsl(var(--foreground))" fill="none" opacity="0.22">
                  {/* Cranium vault */}
                  <path d="M108,10 C88,8 68,16 58,30 C50,44 52,56 58,62" strokeWidth="1.5" />
                  {/* Occiput → mastoid */}
                  <path d="M58,62 C62,66 68,70 72,62" strokeWidth="1.2" />
                  {/* Ear */}
                  <path d="M64,44 C56,48 54,56 58,62 C60,65 64,66 67,63" strokeWidth="1" opacity="0.6" />
                  {/* Forehead → nose → upper lip */}
                  <path d="M108,10 C120,8 132,14 138,24 C142,34 138,44 134,50 C132,54 130,58 130,62 C130,66 132,70 130,74 C128,78 124,80 118,82"
                    strokeWidth="1.5" />
                </g>

                {/* ════════ MANDIBLE — detailed bony shape ════════ */}
                <g>
                  {/* Mandible body + ramus as filled shape */}
                  <path d={`
                    M118,82
                    C114,80 108,78 106,78
                    L94,76 L82,76
                    C80,72 78,66 78,60
                    C78,54 80,50 82,48
                    L82,48
                    C80,50 78,55 78,60
                    C78,66 80,72 82,76
                    L82,76
                  `}
                    stroke="hsl(var(--foreground))" strokeWidth="2.2" fill="url(#nt-boneGrad)" opacity="0.4"
                  />
                  {/* Mandible body — thick lower border */}
                  <path d="M118,82 C114,81 108,79 106,78 L94,77 L82,76"
                    stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" opacity="0.35" />
                  {/* Ramus ascending */}
                  <path d="M82,76 C80,70 78,64 78,58 C78,52 80,48 82,46"
                    stroke="hsl(var(--foreground))" strokeWidth="1.8" fill="none" opacity="0.25" />
                  {/* Condyle and coronoid process hints */}
                  <path d="M82,46 C84,42 86,40 88,40" stroke="hsl(var(--foreground))" strokeWidth="1" fill="none" opacity="0.15" />
                  {/* Mental foramen */}
                  <circle cx="102" cy="78" r="1.5" fill="hsl(var(--foreground))" opacity="0.12" />
                  {/* Angle marker */}
                  <circle cx="82" cy="76" r="2" fill="hsl(var(--foreground))" opacity="0.15" />
                </g>

                {/* ════════ SCM MUSCLE — realistic band shape ════════ */}
                <path d={`
                  M68,60 C70,58 74,58 76,60
                  C84,82 98,118 112,155
                  C120,174 126,196 132,218
                  C134,224 136,228 140,232
                  L150,228 L148,228
                  C144,224 140,218 136,210
                  C128,188 116,160 104,136
                  C92,108 82,82 74,64
                  C72,62 70,61 68,60
                  Z
                `}
                  fill="url(#nt-scmGrad)" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.5"
                />
                {/* SCM sternal head (narrower, tendinous) */}
                <path d="M132,218 C133,222 134,228 134,232 L140,232 C140,228 139,224 138,218"
                  fill="hsl(var(--foreground))" fillOpacity="0.08" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.35" />
                {/* SCM clavicular head (broader, muscular) */}
                <path d="M138,218 C140,222 142,226 148,228 L154,226 C150,222 146,218 142,214"
                  fill="hsl(var(--foreground))" fillOpacity="0.06" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.25" />
                {/* SCM internal fibre direction lines */}
                <g stroke="hsl(var(--foreground))" strokeWidth="0.3" fill="none" opacity="0.08">
                  <path d="M72,64 C86,100 102,140 120,185" />
                  <path d="M74,66 C88,104 106,148 124,192" />
                  <path d="M70,62 C84,96 100,134 116,178" />
                </g>

                {/* ════════ TRAPEZIUS — anterior border ════════ */}
                <path d={`M60,40 C95,75 140,130 180,178 C200,202 215,218 224,224`}
                  stroke="hsl(var(--foreground))" strokeWidth="1.8" fill="none" opacity="0.15"
                  strokeDasharray="8 4" />
                {/* Trapezius muscle mass suggestion */}
                <path d={`M60,40 C95,75 140,130 180,178 C200,202 215,218 224,224
                  L230,220 C220,212 205,195 185,172 C145,125 100,72 65,38 Z`}
                  fill="hsl(var(--foreground))" fillOpacity="0.03" />

                {/* ════════ CLAVICLE — S-shaped bone ════════ */}
                <path d={`M128,232 C138,228 158,224 178,226 C198,228 215,230 224,230`}
                  stroke="hsl(var(--foreground))" strokeWidth="3" fill="none" opacity="0.25"
                  strokeLinecap="round" />
                {/* Clavicle upper and lower contour for 3D effect */}
                <path d={`M128,230 C138,226 158,222 178,224 C198,226 215,228 224,228`}
                  stroke="hsl(var(--foreground))" strokeWidth="0.5" fill="none" opacity="0.1" />

                {/* ════════ HYOID BONE ════════ */}
                <ellipse cx="118" cy="106" rx="8" ry="3" fill="hsl(var(--foreground))" fillOpacity="0.08"
                  stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />

                {/* ════════ MIDLINE ════════ */}
                <line x1="118" y1="82" x2="118" y2="232" stroke="hsl(var(--foreground))"
                  strokeWidth="0.6" opacity="0.1" strokeDasharray="5 4" />

                {/* ════════ DIGASTRIC MUSCLE (subdivision boundary) ════════ */}
                {showSubdivisions && (
                  <g>
                    {/* Post belly: mastoid → intermediate tendon */}
                    <path d="M76,72 C82,78 90,86 98,92 C104,95 108,96 108,96"
                      stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" opacity="0.18" />
                    {/* Intermediate tendon (at hyoid) */}
                    <circle cx="108" cy="96" r="2" fill="hsl(var(--foreground))" fillOpacity="0.15"
                      stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.25" />
                    {/* Ant belly: intermediate tendon → chin */}
                    <path d="M108,96 C112,92 115,88 118,84"
                      stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" opacity="0.18" />
                    {/* Label */}
                    <text x="84" y="92" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35"
                      transform="rotate(-20,84,92)">Post. digastric</text>
                    <text x="114" y="92" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.3"
                      transform="rotate(-55,114,92)">Ant.</text>
                  </g>
                )}

                {/* ════════ OMOHYOID (subdivision boundary) ════════ */}
                {showSubdivisions && (
                  <g>
                    {/* Sup belly: hyoid region → crosses SCM */}
                    <path d="M118,164 C120,166 124,170 128,172"
                      stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" opacity="0.2" />
                    {/* Intermediate tendon at SCM */}
                    <circle cx="128" cy="172" r="1.8" fill="hsl(var(--foreground))" fillOpacity="0.12"
                      stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.2" />
                    {/* Inf belly: SCM → lateral */}
                    <path d="M128,172 C145,170 165,169 184,170"
                      stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" opacity="0.18" />
                    {/* Label */}
                    <text x="152" y="166" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">Omohyoid</text>
                  </g>
                )}

                {/* ════════ TRIANGLE FILL REGIONS ════════ */}
                {displayTriangles.map((key) => {
                  const isActive = selected === key;
                  const t = triangles[key];
                  if (showSubdivisions && (key === "anterior" || key === "posterior")) {
                    return (
                      <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                        <path d={paths[key]} fill={t.color}
                          fillOpacity={isActive ? 0.1 : 0.01}
                          stroke={isActive ? t.color : "transparent"}
                          strokeWidth={isActive ? 1.5 : 0}
                          strokeDasharray="6 3"
                          className="transition-all duration-200" />
                      </g>
                    );
                  }
                  return (
                    <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                      <path d={paths[key]} fill={t.color}
                        fillOpacity={isActive ? 0.35 : 0.08}
                        stroke={t.color}
                        strokeWidth={isActive ? 2 : 0.8}
                        className="transition-all duration-200" />
                    </g>
                  );
                })}

                {/* ════════ TRIANGLE LABELS ════════ */}
                <g className="select-none pointer-events-none">
                  {displayTriangles.map(key => {
                    const pos = labelPositions[key];
                    const isActive = selected === key;
                    if (showSubdivisions && (key === "anterior" || key === "posterior") && !isActive) return null;
                    return (
                      <text key={key} x={pos.x} y={pos.y}
                        fontSize={pos.fontSize}
                        fill={isActive ? triangles[key].color : "hsl(var(--muted-foreground))"}
                        fontWeight={isActive ? "bold" : "normal"}
                        textAnchor="middle"
                        opacity={isActive ? 1 : 0.55}>
                        {pos.label}
                      </text>
                    );
                  })}
                </g>

                {/* ════════ ANATOMICAL LANDMARK LABELS ════════ */}
                <g fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4" className="select-none pointer-events-none">
                  <text x="62" y="58" fontSize="4.5">Mastoid</text>
                  <text x="76" y="74" fontSize="4" opacity="0.5">Angle</text>
                  <text x="108" y="114" fontSize="4.5">Hyoid</text>
                  <text x="140" y="244" fontSize="5">Clavicle</text>
                  <text x="112" y="244" fontSize="4.5">Midline</text>
                  <text x="94" y="70" fontSize="5">Mandible</text>
                  {/* SCM label along muscle body */}
                  <text x="108" y="150" fontSize="6" transform="rotate(64,108,150)" fontWeight="600" opacity="0.3">SCM</text>
                  {/* Trapezius */}
                  <text x="172" y="158" fontSize="5" transform="rotate(35,172,158)" opacity="0.3">Trapezius</text>
                </g>

                {/* ════════ CONTEXT-SENSITIVE OVERLAYS ════════ */}
                {selected === "carotid" && (
                  <g className="animate-fade-in">
                    <circle cx="100" cy="115" r="4.5" fill="none" stroke="hsl(0, 55%, 52%)" strokeWidth="1.5" opacity="0.65" />
                    <circle cx="100" cy="115" r="1.5" fill="hsl(0, 55%, 52%)" opacity="0.6" />
                    <text x="82" y="125" fontSize="4.5" fill="hsl(0, 55%, 52%)" fontWeight="500">Carotid bifurc.</text>
                    <text x="82" y="130" fontSize="3.5" fill="hsl(0, 55%, 52%)" opacity="0.6">(C3/4 level)</text>
                    {/* ICA + ECA */}
                    <path d="M100,115 L94,98 L90,85" stroke="hsl(0, 65%, 55%)" strokeWidth="1.2" fill="none" opacity="0.45" />
                    <path d="M100,115 L106,100 L104,88" stroke="hsl(0, 45%, 45%)" strokeWidth="1" fill="none" opacity="0.35" />
                    <text x="82" y="84" fontSize="3.5" fill="hsl(0, 65%, 55%)">ICA</text>
                    <text x="106" y="86" fontSize="3.5" fill="hsl(0, 45%, 45%)">ECA</text>
                    {/* CN XII */}
                    <path d="M90,102 C98,98 106,97 114,99" stroke="hsl(40, 60%, 50%)" strokeWidth="1" fill="none" strokeDasharray="2 1.5" opacity="0.45" />
                    <text x="116" y="98" fontSize="3.5" fill="hsl(40, 60%, 50%)">CN XII</text>
                  </g>
                )}
                {(selected === "posterior" || selected === "occipital") && (
                  <g className="animate-fade-in">
                    {/* CN XI path */}
                    <path d="M84,86 C105,100 138,122 168,144 C190,158 208,172 218,184"
                      stroke="hsl(140, 50%, 48%)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" opacity="0.6" />
                    <text x="145" y="118" fontSize="4.5" fill="hsl(140, 50%, 48%)" fontWeight="500">CN XI (superficial!)</text>
                    {/* Erb's point */}
                    <circle cx="94" cy="115" r="3.5" fill="none" stroke="hsl(50, 70%, 55%)" strokeWidth="1.5" opacity="0.65" />
                    <text x="78" y="112" fontSize="3.5" fill="hsl(50, 70%, 55%)" fontWeight="500">Erb's pt</text>
                    {/* Brachial plexus */}
                    <path d="M110,182 C130,186 155,188 180,190" stroke="hsl(30, 60%, 52%)" strokeWidth="2" fill="none" opacity="0.4" />
                    <text x="148" y="198" fontSize="4" fill="hsl(30, 60%, 52%)">Brachial plexus</text>
                    {/* Phrenic nerve */}
                    <path d="M105,130 C108,155 112,180 116,205" stroke="hsl(60, 50%, 50%)" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" opacity="0.35" />
                    <text x="88" y="158" fontSize="3.5" fill="hsl(60, 50%, 50%)">Phrenic n.</text>
                  </g>
                )}
                {selected === "supraclavicular" && (
                  <g className="animate-fade-in">
                    <path d="M145,210 C158,205 172,203 188,206" stroke="hsl(320, 40%, 48%)" strokeWidth="2" fill="none" opacity="0.55" />
                    <text x="160" y="200" fontSize="4" fill="hsl(320, 40%, 48%)">Subclavian a.</text>
                    <path d="M164,230 C172,222 182,218 194,222" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" opacity="0.3" />
                    <text x="196" y="220" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.45">Lung apex</text>
                  </g>
                )}
                {selected === "muscular" && (
                  <g className="animate-fade-in">
                    <path d="M119,164 C120,180 120,198 120,218" stroke="hsl(50, 65%, 48%)" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.45" />
                    <text x="104" y="214" fontSize="4" fill="hsl(50, 65%, 48%)">RLN</text>
                    <ellipse cx="124" cy="182" rx="12" ry="16" fill="none" stroke="hsl(270, 45%, 52%)" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 1.5" />
                    <text x="138" y="184" fontSize="3.5" fill="hsl(270, 45%, 52%)" opacity="0.5">Thyroid</text>
                  </g>
                )}
                {selected === "submandibular" && (
                  <g className="animate-fade-in">
                    <ellipse cx="98" cy="86" rx="9" ry="5" fill="none" stroke="hsl(30, 60%, 52%)" strokeWidth="1" opacity="0.45" strokeDasharray="3 1.5" />
                    <text x="84" y="96" fontSize="3.5" fill="hsl(30, 60%, 52%)">SM gland</text>
                    <path d="M92,82 C88,78 86,74 88,70" stroke="hsl(0, 50%, 55%)" strokeWidth="1" fill="none" opacity="0.35" />
                    <text x="74" y="68" fontSize="3.5" fill="hsl(0, 50%, 55%)">Facial a.</text>
                  </g>
                )}

                {/* ════════ MASTOID PROCESS (prominent) ════════ */}
                <g>
                  <ellipse cx="72" cy="62" rx="4" ry="5" fill="hsl(var(--foreground))" fillOpacity="0.06"
                    stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.2" />
                </g>
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

              <div className="flex flex-wrap gap-1">
                {triangleOrder.map(key => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors border ${
                      selected === key ? "text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                    style={selected === key ? { borderColor: triangles[key].color, backgroundColor: withAlpha(triangles[key].color, 0.09) } : {}}
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
