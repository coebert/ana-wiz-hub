import { useState } from "react";

interface Bone {
  id: string;
  label: string;
  short: string;
  walls: string;
  clinical: string;
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
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate?: number;
  labelX: number;
  labelY: number;
}

const bones: Bone[] = [
  {
    id: "frontal",
    label: "Frontal",
    short: "Frontal",
    walls: "Forms the orbital roof and contributes to the medial wall.",
    clinical: "Roof separates orbit from anterior cranial fossa — fractures risk CSF leak and frontal lobe injury.",
    path: "M120,90 L420,90 L420,150 L380,170 L160,170 L120,150 Z",
    labelX: 270,
    labelY: 130,
    hue: 210,
  },
  {
    id: "zygomatic",
    label: "Zygomatic",
    short: "Zygomatic",
    walls: "Forms the lateral wall and inferolateral orbital rim.",
    clinical: "Strongest wall — protects from blunt trauma. Fractures (tripod/ZMC) common after assault.",
    path: "M380,170 L450,180 L460,300 L420,330 L390,260 Z",
    labelX: 425,
    labelY: 245,
    hue: 25,
  },
  {
    id: "maxilla",
    label: "Maxilla",
    short: "Maxillary",
    walls: "Forms most of the orbital floor.",
    clinical:
      "Floor is thinnest wall (along with medial wall). Blow-out fractures herniate orbital contents (incl. inferior rectus) into maxillary sinus → diplopia on upgaze, infraorbital nerve numbness.",
    path: "M160,330 L420,330 L390,360 L190,360 Z",
    labelX: 290,
    labelY: 350,
    hue: 0,
  },
  {
    id: "lacrimal",
    label: "Lacrimal",
    short: "Lacrimal",
    walls: "Small bone on the anterior medial wall, housing the lacrimal sac fossa.",
    clinical: "Site of dacryocystorhinostomy (DCR) for nasolacrimal duct obstruction.",
    path: "M140,180 L170,180 L170,260 L140,260 Z",
    labelX: 110,
    labelY: 220,
    hue: 280,
  },
  {
    id: "ethmoid",
    label: "Ethmoid (lamina papyracea)",
    short: "Ethmoid",
    walls: "Forms the bulk of the medial wall — paper-thin lamina papyracea.",
    clinical:
      "Easily fractured → orbital emphysema after nose-blowing, and a route for ethmoid sinus infection to spread into the orbit (orbital cellulitis).",
    path: "M170,180 L170,260 L160,330 L195,330 L200,180 Z",
    labelX: 130,
    labelY: 305,
    hue: 120,
  },
  {
    id: "sphenoid",
    label: "Sphenoid (greater & lesser wings)",
    short: "Sphenoid",
    walls:
      "Greater wing forms most of the lateral wall posteriorly; lesser wing forms posterior roof and houses the optic canal.",
    clinical:
      "Optic canal lies in lesser wing — fractures here threaten the optic nerve. Greater & lesser wings bound the superior orbital fissure.",
    path: "M380,170 L450,180 L460,200 L450,260 L390,250 Z",
    labelX: 425,
    labelY: 195,
    hue: 50,
  },
  {
    id: "palatine",
    label: "Palatine (orbital process)",
    short: "Palatine",
    walls: "Tiny contribution to the posteromedial floor.",
    clinical: "Smallest contribution — rarely clinically isolated, but completes the floor adjacent to the inferior orbital fissure.",
    path: "M380,330 L420,330 L425,345 L390,345 Z",
    labelX: 405,
    labelY: 358,
    hue: 330,
  },
];

const openings: Opening[] = [
  {
    id: "optic-canal",
    label: "Optic canal",
    location: "Lesser wing of sphenoid (posteromedial apex)",
    contents: ["Optic nerve (CN II)", "Ophthalmic artery", "Sympathetic fibres from internal carotid plexus"],
    clinical:
      "Surrounded by meninges & CSF — raised ICP transmits to the optic nerve sheath → papilloedema. Fractures here cause traumatic optic neuropathy.",
    cx: 360,
    cy: 230,
    rx: 9,
    ry: 9,
    labelX: 470,
    labelY: 160,
  },
  {
    id: "sof",
    label: "Superior orbital fissure",
    location: "Between greater & lesser wings of sphenoid",
    contents: [
      "CN III (oculomotor — superior & inferior divisions)",
      "CN IV (trochlear)",
      "CN V₁ branches: lacrimal, frontal, nasociliary",
      "CN VI (abducens)",
      "Superior ophthalmic vein",
      "Sympathetic fibres",
    ],
    clinical:
      "Annulus of Zinn divides the SOF — CN III, VI, nasociliary (V₁) and sympathetics pass through the annulus; CN IV, lacrimal & frontal (V₁) and the superior ophthalmic vein pass outside it. Superior orbital fissure syndrome (e.g. tumour, fracture) → ophthalmoplegia + V₁ sensory loss.",
    cx: 380,
    cy: 215,
    rx: 26,
    ry: 6,
    rotate: -25,
    labelX: 510,
    labelY: 215,
  },
  {
    id: "iof",
    label: "Inferior orbital fissure",
    location: "Between greater wing of sphenoid & maxilla (with palatine contribution)",
    contents: [
      "Maxillary nerve (CN V₂) → continues as infraorbital nerve",
      "Zygomatic nerve",
      "Inferior ophthalmic vein (communicates with pterygoid plexus)",
      "Branches of pterygopalatine ganglion",
    ],
    clinical:
      "Communicates with pterygopalatine and infratemporal fossae — route for spread of malignancy and a target for maxillary nerve block.",
    cx: 390,
    cy: 305,
    rx: 28,
    ry: 6,
    rotate: 20,
    labelX: 510,
    labelY: 310,
  },
  {
    id: "infraorbital",
    label: "Infraorbital foramen",
    location: "Anterior surface of maxilla, ~1 cm below the inferior orbital rim",
    contents: ["Infraorbital nerve (terminal branch of CN V₂)", "Infraorbital artery & vein"],
    clinical:
      "Site of infraorbital nerve block — anaesthetises lower eyelid, lateral nose, upper lip and anterior maxillary teeth (cleft lip repair, midface analgesia).",
    cx: 290,
    cy: 380,
    rx: 7,
    ry: 7,
    labelX: 290,
    labelY: 415,
  },
  {
    id: "supraorbital",
    label: "Supraorbital foramen / notch",
    location: "Frontal bone, at the supraorbital margin",
    contents: ["Supraorbital nerve (branch of frontal nerve, CN V₁)", "Supraorbital artery & vein"],
    clinical:
      "Target for supraorbital nerve block — forehead and anterior scalp analgesia (frontal craniotomy, scalp laceration repair).",
    cx: 280,
    cy: 95,
    rx: 7,
    ry: 6,
    labelX: 200,
    labelY: 70,
  },
  {
    id: "ant-eth",
    label: "Anterior ethmoidal foramen",
    location: "Frontoethmoidal suture, medial wall",
    contents: ["Anterior ethmoidal nerve (V₁)", "Anterior ethmoidal artery"],
    clinical:
      "Anterior ethmoidal artery is a key surgical landmark in endoscopic sinus surgery — injury causes brisk orbital haematoma.",
    cx: 195,
    cy: 200,
    rx: 5,
    ry: 5,
    labelX: 110,
    labelY: 185,
  },
  {
    id: "post-eth",
    label: "Posterior ethmoidal foramen",
    location: "Frontoethmoidal suture, ~10–12 mm posterior to anterior ethmoidal",
    contents: ["Posterior ethmoidal nerve (V₁)", "Posterior ethmoidal artery"],
    clinical: "Marks the safe posterior limit of subperiosteal dissection — beyond it lies the optic canal (~5 mm further back).",
    cx: 235,
    cy: 200,
    rx: 5,
    ry: 5,
    labelX: 110,
    labelY: 280,
  },
  {
    id: "nlc",
    label: "Nasolacrimal canal",
    location: "Lacrimal & maxillary bones, anteromedial floor",
    contents: ["Nasolacrimal duct (drains tears into inferior nasal meatus)"],
    clinical: "Obstruction → epiphora and dacryocystitis; bypassed surgically by DCR through the lacrimal bone.",
    cx: 175,
    cy: 320,
    rx: 6,
    ry: 8,
    labelX: 90,
    labelY: 345,
  },
];

const OrbitBonyAnatomyDiagram = () => {
  const [selectedBone, setSelectedBone] = useState<string | null>(null);
  const [selectedOpening, setSelectedOpening] = useState<string | null>("sof");

  const bone = bones.find((b) => b.id === selectedBone);
  const opening = openings.find((o) => o.id === selectedOpening);

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <h4 className="text-sm font-semibold text-foreground mb-1 text-center">
          Bony Orbit — Constituent Bones, Foramina & Fissures (Right Orbit, Anterior View)
        </h4>
        <p className="text-xs text-center text-muted-foreground mb-3 italic">
          Tap a bone or an opening to reveal its contents and clinical relevance
        </p>

        <svg viewBox="0 0 600 460" className="w-full max-w-2xl mx-auto" role="img" aria-label="Diagram of the bony orbit and its foramina and fissures">
          {/* Compass */}
          <text x={290} y={20} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">SUPERIOR</text>
          <text x={290} y={455} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">INFERIOR</text>
          <text x={70} y={235} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">MEDIAL</text>
          <text x={500} y={235} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">LATERAL</text>

          {/* Orbital rim outline (rounded rectangle, suggesting the bony aperture) */}
          <path
            d="M150,100 Q140,90 170,90 L420,90 Q450,90 450,170 L460,290 Q455,340 410,345 L195,345 Q150,340 145,290 L135,170 Q140,100 150,100 Z"
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth={2}
          />

          {/* Bones (filled regions) */}
          {bones.map((b) => {
            const isSel = selectedBone === b.id;
            return (
              <g
                key={b.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedBone(selectedBone === b.id ? null : b.id);
                  setSelectedOpening(null);
                }}
              >
                <path
                  d={b.path}
                  fill={`hsl(${b.hue} 65% 55%)`}
                  opacity={isSel ? 0.55 : 0.18}
                  stroke={`hsl(${b.hue} 60% 45%)`}
                  strokeWidth={isSel ? 1.5 : 0.75}
                />
                <text
                  x={b.labelX}
                  y={b.labelY}
                  textAnchor="middle"
                  className="text-[9px] fill-foreground font-medium pointer-events-none"
                  opacity={isSel ? 1 : 0.75}
                >
                  {b.short}
                </text>
              </g>
            );
          })}

          {/* Globe outline (faint, for orientation) */}
          <circle cx={290} cy={225} r={70} fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="3 3" opacity={0.18} />

          {/* Openings */}
          {openings.map((o) => {
            const isSel = selectedOpening === o.id;
            const transform = o.rotate ? `rotate(${o.rotate} ${o.cx} ${o.cy})` : undefined;
            return (
              <g
                key={o.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedOpening(selectedOpening === o.id ? null : o.id);
                  setSelectedBone(null);
                }}
              >
                <ellipse
                  cx={o.cx}
                  cy={o.cy}
                  rx={o.rx}
                  ry={o.ry}
                  transform={transform}
                  fill={isSel ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                  opacity={isSel ? 0.95 : 0.7}
                  stroke="hsl(var(--background))"
                  strokeWidth={1}
                />
                {/* Leader line + label */}
                <line
                  x1={o.cx}
                  y1={o.cy}
                  x2={o.labelX}
                  y2={o.labelY}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={0.6}
                  opacity={0.55}
                />
                <text
                  x={o.labelX}
                  y={o.labelY - 2}
                  textAnchor={o.labelX < 250 ? "end" : o.labelX > 450 ? "start" : "middle"}
                  className="text-[8.5px] fill-foreground pointer-events-none"
                  opacity={isSel ? 1 : 0.85}
                  fontWeight={isSel ? 600 : 400}
                >
                  {o.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Mnemonic */}
        <p className="text-xs text-center text-muted-foreground mt-2 italic">
          Seven bones — "Many Friendly Zebras Enjoy Long Sweet Pickles": <span className="not-italic">Maxilla, Frontal, Zygomatic, Ethmoid, Lacrimal, Sphenoid, Palatine.</span>
          {" "}SOF mnemonic: "Lazy French Tarts Sit Naked In Anticipation" — Lacrimal, Frontal, Trochlear, Sup. division of III, Nasociliary, Inf. division of III, Abducens.
        </p>

        {/* Detail panel */}
        <div className="mt-4 min-h-[110px]">
          {bone ? (
            <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5" style={{ borderLeftWidth: 4, borderLeftColor: `hsl(${bone.hue} 60% 50%)` }}>
              <p className="font-semibold text-foreground text-sm">{bone.label}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Walls:</span> {bone.walls}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Clinical:</span> {bone.clinical}</p>
            </div>
          ) : opening ? (
            <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5">
              <p className="font-semibold text-foreground text-sm">{opening.label}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Location:</span> {opening.location}</p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Transmits:</span>
                <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                  {opening.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Clinical:</span> {opening.clinical}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">Select a bone or opening above to display details.</p>
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
                    className={`cursor-pointer hover:bg-muted/40 transition-colors ${i % 2 === 0 ? "bg-background/60" : "bg-background/30"} ${selectedOpening === o.id ? "ring-1 ring-primary" : ""}`}
                    onClick={() => {
                      setSelectedOpening(o.id);
                      setSelectedBone(null);
                    }}
                  >
                    <td className="p-2 font-medium text-foreground align-top whitespace-nowrap">{o.label}</td>
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
