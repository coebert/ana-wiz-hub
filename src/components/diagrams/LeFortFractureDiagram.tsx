import { useState } from "react";

type LeFortType = 1 | 2 | 3;

const TYPES: Record<LeFortType, {
  name: string;
  alias: string;
  definition: string;
  fractureLine: string;
  implications: string[];
  airway: string;
}> = {
  1: {
    name: "Le Fort I",
    alias: "Floating palate / Guérin fracture",
    definition: "Horizontal fracture separating the alveolar process of the maxilla and hard palate from the rest of the midface. The fracture passes above the maxillary teeth, through the nasal septum and pterygoid plates.",
    fractureLine: "Horizontal — above maxillary apices, through lateral nasal aperture, septum and lower pterygoid plates.",
    implications: [
      "Mobile hard palate / dental arch ('floating palate')",
      "Malocclusion, loose teeth, oral haemorrhage",
      "Airway usually maintained — risk from bleeding & swelling",
      "Nasal intubation generally safe (fracture below skull base)",
      "Repaired with intermaxillary fixation ± plate osteosynthesis",
    ],
    airway: "Nasal intubation acceptable. Oral intubation often preferred to allow occlusal check.",
  },
  2: {
    name: "Le Fort II",
    alias: "Pyramidal fracture",
    definition: "Pyramid-shaped fracture separating the central midface (maxilla + nose) from the zygomata and skull. Involves the inferior orbital rim and floor.",
    fractureLine: "Pyramidal — through nasal bridge, medial orbital wall, infra-orbital rim/floor, anterior maxillary wall, pterygoid plates.",
    implications: [
      "'Dish-face' deformity, mid-face mobility, periorbital ecchymosis (raccoon eyes)",
      "Infra-orbital nerve injury (cheek numbness)",
      "Possible CSF rhinorrhoea (cribriform involvement)",
      "Diplopia / enophthalmos from orbital floor disruption",
      "Avoid nasal intubation — risk of intracranial passage",
    ],
    airway: "Nasal intubation contraindicated. Oral / submental intubation or tracheostomy.",
  },
  3: {
    name: "Le Fort III",
    alias: "Craniofacial disjunction",
    definition: "Complete separation of the entire facial skeleton from the cranial base. Fracture runs through the zygomatic arches, orbits and naso-frontal junction.",
    fractureLine: "Transverse — naso-frontal suture, medial & lateral orbital walls, zygomatic arches, upper pterygoid plates.",
    implications: [
      "Massive haemorrhage (internal maxillary / ethmoidal arteries)",
      "Definite base-of-skull involvement → CSF leak common",
      "High association with TBI, c-spine injury, ocular trauma",
      "Severe airway compromise — swelling, blood, obstruction",
      "Anosmia (cribriform plate disruption)",
    ],
    airway: "Nasal intubation absolutely contraindicated. Early surgical airway (tracheostomy) often safest.",
  },
};

const LeFortFractureDiagram = () => {
  const [type, setType] = useState<LeFortType>(1);
  const t = TYPES[type];

  // Colours
  const skin = "hsl(25 40% 88%)";
  const skinStroke = "hsl(25 30% 50%)";
  const bone = "hsl(40 30% 92%)";
  const boneStroke = "hsl(30 25% 45%)";
  const cavity = "hsl(0 0% 25%)";
  const fractureColor = "hsl(0 80% 50%)";
  const skullBase = "hsl(280 40% 55%)";

  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-card">
      <div className="mb-3">
        <h3 className="text-lg font-serif font-bold text-foreground">Le Fort Fractures of the Midface</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          René Le Fort's 1901 classification of midfacial fracture patterns from cadaver impact studies. Click each type to see the fracture line and anaesthetic implications.
        </p>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {([1, 2, 3] as LeFortType[]).map((n) => (
          <button
            key={n}
            onClick={() => setType(n)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
              type === n
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {TYPES[n].name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
        {/* SVG — frontal view of skull */}
        <div className="rounded-lg border border-border bg-background p-2">
          <svg viewBox="0 0 360 420" className="w-full h-auto" role="img" aria-label={`${t.name} fracture diagram`}>
            {/* Skull outline (frontal) */}
            <path
              d="M 180 20
                 C 250 20, 300 70, 300 150
                 C 300 200, 295 240, 285 270
                 C 275 305, 250 340, 220 370
                 C 210 380, 195 385, 180 385
                 C 165 385, 150 380, 140 370
                 C 110 340, 85 305, 75 270
                 C 65 240, 60 200, 60 150
                 C 60 70, 110 20, 180 20 Z"
              fill={bone}
              stroke={boneStroke}
              strokeWidth="1.6"
            />

            {/* Frontal bone shading */}
            <path d="M 80 90 Q 180 50 280 90 L 280 130 Q 180 110 80 130 Z" fill="hsl(40 25% 86%)" opacity="0.5" />

            {/* Skull base reference (purple) */}
            <line x1="60" y1="125" x2="300" y2="125" stroke={skullBase} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.55" />
            <text x="305" y="128" fontSize="8" fill={skullBase}>skull base</text>

            {/* Orbits */}
            <ellipse cx="125" cy="155" rx="32" ry="24" fill={cavity} />
            <ellipse cx="235" cy="155" rx="32" ry="24" fill={cavity} />
            {/* Eye highlight */}
            <circle cx="125" cy="155" r="9" fill="hsl(200 60% 60%)" opacity="0.6" />
            <circle cx="235" cy="155" r="9" fill="hsl(200 60% 60%)" opacity="0.6" />

            {/* Nasal aperture */}
            <path d="M 180 175 L 168 235 Q 180 245 192 235 Z" fill={cavity} />
            {/* Nasal bridge */}
            <line x1="180" y1="120" x2="180" y2="175" stroke={boneStroke} strokeWidth="1" />

            {/* Zygomatic arches (cheekbones) */}
            <path d="M 75 180 Q 95 195 130 200" fill="none" stroke={boneStroke} strokeWidth="1.4" />
            <path d="M 285 180 Q 265 195 230 200" fill="none" stroke={boneStroke} strokeWidth="1.4" />

            {/* Maxilla */}
            <path d="M 110 240 Q 180 250 250 240 L 245 305 Q 180 320 115 305 Z" fill="hsl(40 30% 90%)" stroke={boneStroke} strokeWidth="1" />

            {/* Teeth */}
            <g stroke={boneStroke} strokeWidth="0.6">
              {Array.from({ length: 10 }).map((_, i) => (
                <rect
                  key={i}
                  x={120 + i * 12}
                  y={305}
                  width="10"
                  height="12"
                  rx="2"
                  fill="hsl(0 0% 98%)"
                />
              ))}
            </g>

            {/* Mandible (greyed — not part of Le Fort) */}
            <path
              d="M 110 320 Q 180 360 250 320 L 245 350 Q 180 395 115 350 Z"
              fill="hsl(40 15% 82%)"
              opacity="0.7"
              stroke={boneStroke}
              strokeWidth="1"
            />

            {/* === FRACTURE LINES === */}
            {type === 1 && (
              <g stroke={fractureColor} strokeWidth="2.5" fill="none" strokeLinecap="round">
                {/* Horizontal across maxilla just above teeth */}
                <path d="M 105 285 Q 180 278 255 285" strokeDasharray="0" />
                {/* Through pterygoids (hidden — show small ticks at ends) */}
                <line x1="100" y1="285" x2="92" y2="290" />
                <line x1="260" y1="285" x2="268" y2="290" />
                <text x="265" y="280" fontSize="10" fill={fractureColor} fontWeight="700">I</text>
              </g>
            )}

            {type === 2 && (
              <g stroke={fractureColor} strokeWidth="2.5" fill="none" strokeLinecap="round">
                {/* Pyramidal: nasal bridge → medial orbit → infraorbital rim → maxilla → pterygoids */}
                <path d="M 180 130 L 160 150 L 140 178 L 110 215 L 95 280" />
                <path d="M 180 130 L 200 150 L 220 178 L 250 215 L 265 280" />
                {/* Across nasal bridge */}
                <line x1="170" y1="125" x2="190" y2="125" />
                <text x="180" y="118" fontSize="10" fill={fractureColor} fontWeight="700" textAnchor="middle">II</text>
              </g>
            )}

            {type === 3 && (
              <g stroke={fractureColor} strokeWidth="2.5" fill="none" strokeLinecap="round">
                {/* Transverse: naso-frontal → through orbits → zygomatic arches */}
                <path d="M 60 145 Q 90 140 105 145 L 130 135 Q 150 125 170 122 L 180 118 L 190 122 Q 210 125 230 135 L 255 145 Q 270 140 300 145" />
                {/* Mark naso-frontal */}
                <circle cx="180" cy="118" r="3" fill={fractureColor} />
                <text x="180" y="108" fontSize="10" fill={fractureColor} fontWeight="700" textAnchor="middle">III</text>
              </g>
            )}

            {/* Title */}
            <text x="10" y="18" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
              {t.name} — frontal view
            </text>
          </svg>
        </div>

        {/* Side panel */}
        <div className="space-y-2">
          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
            <p className="text-sm font-bold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground italic mt-0.5">{t.alias}</p>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{t.definition}</p>
          </div>

          <div className="p-2.5 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground mb-1">Fracture line</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.fractureLine}</p>
          </div>

          <div className="p-2.5 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground mb-1">Implications & risks</p>
            <ul className="space-y-1">
              {t.implications.map((b, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed pl-3 relative">
                  <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-2.5 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Airway plan: </strong>{t.airway}
          </div>
        </div>
      </div>

      <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border text-xs text-muted-foreground">
        <strong className="text-foreground">Common to all: </strong>
        all Le Fort fractures involve the <em>pterygoid plates</em> — this is the unifying anatomical feature. Most real-world injuries are mixed (e.g., Le Fort II on one side, III on the other) and frequently asymmetric. Always assume associated TBI, c-spine injury and ocular trauma until excluded.
      </div>
    </div>
  );
};

export default LeFortFractureDiagram;
