import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface Bone {
  id: string;
  label: string;
  short: string;
  walls: string;
  clinical: string;
  /** Filled polygon describing the bone's contribution to the anterior view of the right orbit */
  path: string;
  labelX: number;
  labelY: number;
  hue: number;
}

interface Opening {
  id: string;
  label: string;
  location: string;
  contents: string[];
  clinical: string;
  /** Geometry — most openings are slits/ovals; the larger fissures use a path */
  shape:
    | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number; rotate?: number }
    | { type: "path"; d: string; centroid: [number, number] };
  labelX: number;
  labelY: number;
}

/* ---------------------------------------------------------------------------
 * Geometry
 *
 * The orbital aperture is drawn as a rounded quadrilateral (anterior view of
 * the RIGHT orbit, viewer's left = patient's medial). Seven bones tile the
 * aperture; their boundaries follow the standard topographical layout used
 * in Gray's Anatomy and Last's:
 *
 *   Roof:          frontal (anterior) + lesser wing of sphenoid (posterior)
 *   Lateral wall:  zygomatic (anterior) + greater wing of sphenoid (posterior)
 *   Floor:         maxilla (most) + zygomatic (anterolateral)
 *                  + orbital process of palatine (small posterior)
 *   Medial wall:   (anterior→posterior) frontal process of maxilla,
 *                  lacrimal, ethmoid (lamina papyracea), body of sphenoid
 *
 * Coordinates use a 600×500 viewBox; the aperture sits roughly within the
 * rectangle (140,90)–(470,400) with the apex pulled slightly posteromedially.
 * ------------------------------------------------------------------------- */

// Aperture outline used both for the rim and as a clip-path for bones
const APERTURE_PATH =
  "M180,90 " +
  "Q150,88 145,118 " +
  "L138,200 " +
  "Q132,260 150,310 " +
  "L165,360 " +
  "Q180,395 220,398 " +
  "L405,400 " +
  "Q445,398 458,365 " +
  "L470,295 " +
  "Q478,225 470,170 " +
  "L460,120 " +
  "Q450,90 420,90 " +
  "Z";

const bones: Bone[] = [
  {
    id: "frontal",
    label: "Frontal bone",
    short: "Frontal",
    walls:
      "Forms the entire anterior orbital roof and the upper part of the medial wall (above the trochlear fossa).",
    clinical:
      "Roof separates orbit from anterior cranial fossa — fractures risk CSF rhinorrhoea and frontal lobe contusion. Houses the supraorbital notch/foramen.",
    // Wide arch across the roof
    path:
      "M180,90 Q150,88 145,118 L142,170 L300,165 L460,170 L460,120 Q450,90 420,90 Z",
    labelX: 300,
    labelY: 130,
    hue: 210,
  },
  {
    id: "sphenoid-greater",
    label: "Sphenoid — greater wing",
    short: "Sphenoid (gr. wing)",
    walls:
      "Forms the posterior portion of the lateral wall; bounds the superior orbital fissure superiorly and the inferior orbital fissure superolaterally.",
    clinical:
      "Pterional approach traverses this bone. Spheno-orbital meningiomas typically arise here, hyperostosing the wing and causing proptosis.",
    path:
      "M460,170 L460,250 Q455,290 425,300 L385,290 L385,200 Q395,175 425,170 Z",
    labelX: 425,
    labelY: 220,
    hue: 35,
  },
  {
    id: "sphenoid-lesser",
    label: "Sphenoid — lesser wing & body",
    short: "Sphenoid (lesser)",
    walls:
      "Forms the posterior orbital roof and houses the optic canal; the body of the sphenoid completes the most posterior part of the medial wall.",
    clinical:
      "Optic canal lies within the lesser wing — fractures here threaten the optic nerve (traumatic optic neuropathy).",
    path:
      "M300,165 L460,170 L425,170 Q395,175 385,200 L385,250 L300,245 Z",
    labelX: 360,
    labelY: 195,
    hue: 50,
  },
  {
    id: "ethmoid",
    label: "Ethmoid — lamina papyracea",
    short: "Ethmoid",
    walls:
      "Forms the bulk of the medial wall as the paper-thin lamina papyracea, between the lacrimal bone anteriorly and the body of the sphenoid posteriorly.",
    clinical:
      "Easily fractured → orbital emphysema after nose-blowing. Direct route for ethmoid sinusitis to spread into the orbit (orbital cellulitis — most commonly subperiosteal medial-wall abscess).",
    path:
      "M165,170 L142,170 L138,200 Q132,260 150,290 L195,290 L200,200 Z",
    labelX: 168,
    labelY: 240,
    hue: 130,
  },
  {
    id: "lacrimal",
    label: "Lacrimal bone",
    short: "Lacrimal",
    walls:
      "Small bone forming the anterior part of the medial wall; carries the lacrimal sac fossa between the anterior and posterior lacrimal crests.",
    clinical:
      "Site of dacryocystorhinostomy (DCR) — a window is fashioned through the lacrimal bone into the middle meatus to bypass nasolacrimal duct obstruction.",
    path:
      "M165,170 L200,200 L195,290 L160,300 L155,225 Z",
    labelX: 178,
    labelY: 285,
    hue: 280,
  },
  {
    id: "maxilla",
    label: "Maxilla",
    short: "Maxilla",
    walls:
      "Forms most of the orbital floor and a small anteromedial wall contribution (frontal process of the maxilla, anterior to the lacrimal bone).",
    clinical:
      "Orbital floor is the thinnest wall (along with the medial wall). Blow-out fractures herniate orbital contents (especially inferior rectus) into the maxillary sinus → restricted upgaze, diplopia and infraorbital nerve numbness. The maxilla also contains the infraorbital canal.",
    path:
      "M150,290 Q160,355 200,360 L385,360 L420,345 L385,320 L195,320 Z",
    labelX: 290,
    labelY: 345,
    hue: 0,
  },
  {
    id: "zygomatic",
    label: "Zygomatic bone",
    short: "Zygomatic",
    walls:
      "Forms the anterior portion of the lateral wall and contributes to the lateral floor and inferolateral orbital rim.",
    clinical:
      "Strongest bone of the orbit — protects from blunt trauma. ZMC ('tripod') fractures are common after assault; the inferior orbital fissure runs along the zygomatico-sphenoid suture.",
    path:
      "M385,200 Q420,180 460,170 L460,250 Q455,290 425,300 L385,320 L420,345 L385,360 L385,250 Z",
    labelX: 432,
    labelY: 270,
    hue: 22,
  },
  {
    id: "palatine",
    label: "Palatine — orbital process",
    short: "Palatine",
    walls:
      "A pea-sized contribution to the posteromedial orbital floor, between the maxilla and the body of the sphenoid.",
    clinical:
      "Smallest contribution to the orbit; completes the floor at the medial end of the inferior orbital fissure and roofs the pterygopalatine fossa.",
    path: "M385,320 L420,345 L405,355 L380,335 Z",
    labelX: 405,
    labelY: 332,
    hue: 330,
  },
];

// Suture lines (drawn as faint dashed paths over the bones for realism)
const sutures: string[] = [
  // Fronto-zygomatic suture (lateral)
  "M460,170 Q455,180 460,200",
  // Fronto-maxillary / fronto-lacrimal (medial)
  "M165,170 L155,225",
  // Fronto-ethmoidal (medial roof — runs along anterior + posterior ethmoidal foramina)
  "M165,170 L300,165",
  // Spheno-frontal (roof, deep)
  "M300,165 L460,170",
  // Lacrimo-ethmoidal (medial)
  "M195,290 L160,300",
  // Spheno-zygomatic (lateral, contains IOF)
  "M385,200 Q400,260 385,320",
  // Spheno-maxillary (along inferior orbital fissure)
  "M385,320 L425,300",
  // Zygomatico-maxillary (anterolateral floor)
  "M385,360 L420,345",
];

const openings: Opening[] = [
  {
    id: "optic-canal",
    label: "Optic canal",
    location: "Lesser wing of sphenoid, at the orbital apex",
    contents: [
      "Optic nerve (CN II) within meningeal sheath + CSF",
      "Ophthalmic artery",
      "Sympathetic fibres from internal carotid plexus",
    ],
    clinical:
      "Surrounded by meninges & CSF — raised ICP transmits to the optic nerve sheath causing papilloedema. Apex fractures and tumours threaten the nerve (traumatic optic neuropathy).",
    shape: { type: "ellipse", cx: 350, cy: 215, rx: 7, ry: 7 },
    labelX: 500,
    labelY: 165,
  },
  {
    id: "sof",
    label: "Superior orbital fissure",
    location: "Slit between the greater & lesser wings of sphenoid",
    contents: [
      "CN III (oculomotor — superior & inferior divisions)",
      "CN IV (trochlear)",
      "CN V₁ branches: lacrimal, frontal, nasociliary",
      "CN VI (abducens)",
      "Superior ophthalmic vein",
      "Sympathetic fibres",
    ],
    clinical:
      "Annulus of Zinn divides the SOF: CN III (both divisions), VI, nasociliary (V₁) and sympathetics pass through the annulus; CN IV, lacrimal & frontal branches of V₁, and the superior ophthalmic vein pass outside it. Superior orbital fissure syndrome → ophthalmoplegia + V₁ sensory loss without visual loss; if vision is also lost, the apex (incl. optic canal) is involved (orbital apex syndrome).",
    // Curved slit running superolaterally from the apex
    shape: {
      type: "path",
      d: "M362,210 Q380,200 405,188 Q412,185 416,189 Q418,193 412,197 Q388,210 368,222 Q360,225 358,221 Q356,216 362,210 Z",
      centroid: [388, 205],
    },
    labelX: 510,
    labelY: 200,
  },
  {
    id: "iof",
    label: "Inferior orbital fissure",
    location: "Between greater wing of sphenoid, maxilla and palatine",
    contents: [
      "Maxillary nerve (CN V₂) → continues as infraorbital nerve",
      "Zygomatic nerve",
      "Inferior ophthalmic vein (anastomoses with the pterygoid plexus)",
      "Branches of the pterygopalatine ganglion",
    ],
    clinical:
      "Communicates with the pterygopalatine and infratemporal fossae — a route for spread of malignancy (e.g. SCC, adenoid cystic carcinoma) and the target for the maxillary nerve block via the suprazygomatic approach.",
    shape: {
      type: "path",
      d: "M388,318 Q405,308 425,298 Q432,295 434,300 Q435,304 428,308 Q408,320 392,330 Q386,332 384,326 Q383,321 388,318 Z",
      centroid: [410, 312],
    },
    labelX: 510,
    labelY: 320,
  },
  {
    id: "infraorbital",
    label: "Infraorbital foramen",
    location: "Anterior surface of maxilla, ~1 cm below the inferior orbital rim",
    contents: ["Infraorbital nerve (terminal branch of CN V₂)", "Infraorbital artery & vein"],
    clinical:
      "Target for the infraorbital nerve block — anaesthetises the lower eyelid, lateral nose, upper lip and anterior maxillary teeth (cleft lip repair, midface analgesia, transsphenoidal surgery).",
    shape: { type: "ellipse", cx: 295, cy: 410, rx: 6, ry: 5 },
    labelX: 240,
    labelY: 440,
  },
  {
    id: "supraorbital",
    label: "Supraorbital notch / foramen",
    location: "Supraorbital margin of the frontal bone (junction of medial and middle thirds)",
    contents: ["Supraorbital nerve (branch of frontal nerve, CN V₁)", "Supraorbital artery & vein"],
    clinical:
      "Target for the supraorbital nerve block — analgesia for the forehead and anterior scalp (frontal craniotomy, scalp laceration repair, awake-craniotomy field block).",
    shape: { type: "ellipse", cx: 270, cy: 90, rx: 6, ry: 5 },
    labelX: 200,
    labelY: 65,
  },
  {
    id: "ant-eth",
    label: "Anterior ethmoidal foramen",
    location: "Frontoethmoidal suture, anterior medial wall",
    contents: ["Anterior ethmoidal nerve (V₁)", "Anterior ethmoidal artery (branch of ophthalmic)"],
    clinical:
      "Anterior ethmoidal artery is a key surgical landmark in endoscopic sinus surgery — injury causes brisk retro-orbital haematoma and tense proptosis (compartment syndrome — needs lateral canthotomy).",
    shape: { type: "ellipse", cx: 215, cy: 168, rx: 4, ry: 4 },
    labelX: 130,
    labelY: 145,
  },
  {
    id: "post-eth",
    label: "Posterior ethmoidal foramen",
    location: "Frontoethmoidal suture, ~10–12 mm posterior to anterior ethmoidal",
    contents: ["Posterior ethmoidal nerve (V₁)", "Posterior ethmoidal artery"],
    clinical:
      "Marks the safe posterior limit of subperiosteal dissection — the optic canal lies only ~5 mm further posteriorly.",
    shape: { type: "ellipse", cx: 270, cy: 168, rx: 4, ry: 4 },
    labelX: 130,
    labelY: 105,
  },
  {
    id: "nlc",
    label: "Nasolacrimal canal",
    location: "Lacrimal & maxillary bones, anteromedial floor",
    contents: ["Nasolacrimal duct (drains tears into the inferior nasal meatus)"],
    clinical:
      "Obstruction → epiphora and dacryocystitis; bypassed surgically by DCR through the lacrimal bone into the middle meatus.",
    shape: { type: "ellipse", cx: 188, cy: 320, rx: 5, ry: 7 },
    labelX: 105,
    labelY: 330,
  },
  {
    id: "zfc",
    label: "Zygomatico-facial foramen",
    location: "Zygomatic bone — small foramen on the lateral wall/face of the zygoma",
    contents: ["Zygomaticofacial nerve (branch of zygomatic nerve, V₂)", "Small accompanying vessels"],
    clinical:
      "Sensory supply to the prominence of the cheek — relevant in regional blocks for awake craniotomy and after ZMC fractures (cheek paraesthesia).",
    shape: { type: "ellipse", cx: 442, cy: 285, rx: 4, ry: 4 },
    labelX: 530,
    labelY: 285,
  },
];

const OrbitBonyAnatomyDiagram = () => {
  const [selectedBone, setSelectedBone] = useState<string | null>(null);
  const [selectedOpening, setSelectedOpening] = useState<string | null>("sof");
  const [showSutures, setShowSutures] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  const bone = bones.find((b) => b.id === selectedBone);
  const opening = openings.find((o) => o.id === selectedOpening);

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Bony Orbit — Right Orbit, Anterior View"
          subtitle="Tap a bone or an opening to reveal its contents and clinical relevance."
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
          ]}
        />

        <svg
          viewBox="0 0 600 500"
          className="w-full max-w-2xl mx-auto"
          role="img"
          aria-label="Anatomical diagram of the right bony orbit showing the seven constituent bones, foramina and fissures"
        >
          <defs>
            {/* Radial gradient — depth at the apex */}
            <radialGradient id="apexShade" cx="60%" cy="42%" r="55%">
              <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
              <stop offset="55%" stopColor="hsl(var(--foreground))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
            </radialGradient>
            {/* Subtle paper-grain inside the aperture */}
            <pattern id="grain" patternUnits="userSpaceOnUse" width="6" height="6">
              <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.15" />
            </pattern>
            {/* Clip everything to the orbital aperture so bone polygons can extend beyond without spilling */}
            <clipPath id="apertureClip">
              <path d={APERTURE_PATH} />
            </clipPath>
            {/* Drop-shadow filter to lift the rim slightly */}
            <filter id="rimShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
              <feOffset dx="0" dy="1.5" result="off" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.35" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Compass */}
          <text x={300} y={20} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
            SUPERIOR
          </text>
          <text x={300} y={490} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
            INFERIOR
          </text>
          <text x={70} y={250} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
            MEDIAL
          </text>
          <text x={540} y={250} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
            LATERAL
          </text>

          {/* Background plate */}
          <path
            d={APERTURE_PATH}
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth={2}
            filter="url(#rimShadow)"
          />

          {/* Bones — clipped to aperture */}
          <g clipPath="url(#apertureClip)">
            {bones.map((b) => {
              const isSel = selectedBone === b.id;
              return (
                <g
                  key={b.id}
                  className="cursor-pointer transition-opacity"
                  onClick={() => {
                    setSelectedBone(selectedBone === b.id ? null : b.id);
                    setSelectedOpening(null);
                  }}
                >
                  <path
                    d={b.path}
                    fill={`hsl(${b.hue} 55% 60%)`}
                    fillOpacity={isSel ? 0.7 : 0.28}
                    stroke={`hsl(${b.hue} 55% 40%)`}
                    strokeWidth={isSel ? 1.5 : 0.6}
                    strokeOpacity={isSel ? 0.9 : 0.5}
                  />
                </g>
              );
            })}

            {/* Paper grain overlay for texture */}
            <path d={APERTURE_PATH} fill="url(#grain)" pointerEvents="none" />

            {/* Suture lines */}
            {showSutures &&
              sutures.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={0.5}
                  strokeDasharray="2 2"
                  opacity={0.45}
                  pointerEvents="none"
                />
              ))}

            {/* Apex depth shading */}
            <path d={APERTURE_PATH} fill="url(#apexShade)" pointerEvents="none" />

            {/* Faint globe outline for orientation (set anteriorly within the orbit) */}
            <ellipse
              cx={290}
              cy={240}
              rx={92}
              ry={88}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={0.75}
              strokeDasharray="3 3"
              opacity={0.18}
              pointerEvents="none"
            />
          </g>

          {/* Aperture rim drawn on top so it stays crisp */}
          <path
            d={APERTURE_PATH}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={2}
          />

          {/* Bone labels (above clip, never cropped) */}
          {showLabels &&
            bones.map((b) => {
              const isSel = selectedBone === b.id;
              return (
                <text
                  key={`lbl-${b.id}`}
                  x={b.labelX}
                  y={b.labelY}
                  textAnchor="middle"
                  className="text-[9px] fill-foreground font-medium pointer-events-none select-none"
                  opacity={isSel ? 1 : 0.85}
                >
                  {b.short}
                </text>
              );
            })}

          {/* Openings */}
          {openings.map((o) => {
            const isSel = selectedOpening === o.id;
            const [cx, cy] =
              o.shape.type === "ellipse" ? [o.shape.cx, o.shape.cy] : o.shape.centroid;
            return (
    <DiagramFigure
      id="orbit-bony-anatomy-diagram"
      title="Orbit bony anatomy"
      description="Auto-generated wrapper for the Orbit bony anatomy anatomical diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <g
                  key={o.id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedOpening(selectedOpening === o.id ? null : o.id);
                    setSelectedBone(null);
                  }}
                >
                  {o.shape.type === "ellipse" ? (
                    <ellipse
                      cx={o.shape.cx}
                      cy={o.shape.cy}
                      rx={o.shape.rx}
                      ry={o.shape.ry}
                      transform={o.shape.rotate ? `rotate(${o.shape.rotate} ${o.shape.cx} ${o.shape.cy})` : undefined}
                      fill={isSel ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                      fillOpacity={isSel ? 0.95 : 0.82}
                      stroke="hsl(var(--background))"
                      strokeWidth={1}
                    />
                  ) : (
                    <path
                      d={o.shape.d}
                      fill={isSel ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                      fillOpacity={isSel ? 0.92 : 0.78}
                      stroke="hsl(var(--background))"
                      strokeWidth={1}
                    />
                  )}
  
                  {/* Leader line */}
                  {showLabels && (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={o.labelX}
                      y2={o.labelY}
                      stroke={isSel ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                      strokeWidth={isSel ? 0.9 : 0.6}
                      opacity={isSel ? 0.85 : 0.55}
                      pointerEvents="none"
                    />
                  )}
  
                  {/* Label */}
                  {showLabels && (
                    <text
                      x={o.labelX}
                      y={o.labelY - 3}
                      textAnchor={
                        o.labelX < 230 ? "end" : o.labelX > 470 ? "start" : "middle"
                      }
                      className="text-[8.5px] fill-foreground pointer-events-none select-none"
                      opacity={isSel ? 1 : 0.85}
                      fontWeight={isSel ? 600 : 400}
                    >
                      {o.label}
                    </text>
                  )}
                </g>
    </DiagramFigure>
  );
          })}
        </svg>

        {/* Mnemonics */}
        <div className="mt-3 space-y-1">
          <p className="text-xs text-center text-muted-foreground italic">
            <span className="font-semibold not-italic text-foreground">Seven bones — </span>
            "Many Friendly Zebras Enjoy Long Sweet Pickles": Maxilla, Frontal, Zygomatic, Ethmoid, Lacrimal, Sphenoid, Palatine.
          </p>
          <p className="text-xs text-center text-muted-foreground italic">
            <span className="font-semibold not-italic text-foreground">SOF contents — </span>
            "Lazy French Tarts Sit Naked In Anticipation": Lacrimal, Frontal, Trochlear, Superior division of III, Nasociliary, Inferior division of III, Abducens (+ superior ophthalmic vein).
          </p>
        </div>

        {/* Detail panel */}
        <div className="mt-4 min-h-[120px]">
          {bone ? (
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: `hsl(${bone.hue} 55% 45%)` }}
            >
              <p className="font-semibold text-foreground text-sm">{bone.label}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Walls:</span> {bone.walls}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {bone.clinical}
              </p>
            </div>
          ) : opening ? (
            <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5 border-l-primary border-l-4">
              <p className="font-semibold text-foreground text-sm">{opening.label}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Location:</span> {opening.location}
              </p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Transmits:</span>
                <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                  {opening.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {opening.clinical}
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">
              Select a bone or opening above to display details.
            </p>
          )}
        </div>

        {/* Quick-reference table */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-foreground mb-2">Foramina & Fissures — Quick Reference</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted/60">
                <tr>
                  <th className="text-left p-2 font-semibold text-foreground">Opening</th>
                  <th className="text-left p-2 font-semibold text-foreground">Key Contents</th>
                </tr>
              </thead>
              <tbody>
                {openings.map((o, i) => (
                  <tr
                    key={o.id}
                    className={`cursor-pointer hover:bg-muted/40 transition-colors ${
                      i % 2 === 0 ? "bg-background/60" : "bg-background/30"
                    } ${selectedOpening === o.id ? "ring-1 ring-primary" : ""}`}
                    onClick={() => {
                      setSelectedOpening(o.id);
                      setSelectedBone(null);
                    }}
                  >
                    <td className="p-2 font-medium text-foreground align-top whitespace-nowrap">
                      {o.label}
                    </td>
                    <td className="p-2 text-muted-foreground">{o.contents.join("; ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitBonyAnatomyDiagram;
