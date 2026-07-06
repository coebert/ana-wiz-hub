import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface Foramen {
  id: string;
  label: string;
  /** Anatomical shape — round foramina render as ellipses; slits/canals use a path */
  shape:
    | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number; rotate?: number }
    | { type: "path"; d: string; centroid: [number, number] };
  contents: string;
  clinical: string;
  fossa: "anterior" | "middle" | "posterior";
}

const fossaColors = {
  anterior: "hsl(var(--anatomy))",
  middle: "hsl(210 70% 55%)",
  posterior: "hsl(280 50% 55%)",
};

/* ---------------------------------------------------------------------------
 * Geometry — Internal aspect of the skull base, viewed from above.
 * ViewBox 600 × 470. Midline x = 300. Patient's right is to the viewer's
 * left (x < 300), patient's left to the viewer's right (x > 300).
 *
 * Foramina are paired around the midline; shapes mirror anatomical reality
 * (e.g. ovale = oval, spinosum = small round, jugular = large irregular,
 * SOF = curved slit, IAM = horizontal slit, cribriform = paired sieve plates,
 * foramen magnum = large posterior oval).
 * ------------------------------------------------------------------------- */
const foramina: Foramen[] = [
  // ── Anterior cranial fossa ────────────────────────────────────────────
  {
    id: "cribriform-l",
    label: "Cribriform plate",
    shape: { type: "path", d: "M278,88 L298,86 L298,118 L278,116 Z", centroid: [288, 102] },
    contents: "Olfactory nerves (CN I)",
    clinical:
      "Anterior skull base fractures → CSF rhinorrhoea, anosmia, and a route for ascending meningitis. Relative contraindication to nasogastric / nasal airway insertion.",
    fossa: "anterior",
  },
  {
    id: "cribriform-r",
    label: "Cribriform plate",
    shape: { type: "path", d: "M302,86 L322,88 L322,116 L302,118 Z", centroid: [312, 102] },
    contents: "Olfactory nerves (CN I)",
    clinical:
      "Anterior skull base fractures → CSF rhinorrhoea, anosmia, and a route for ascending meningitis. Relative contraindication to nasogastric / nasal airway insertion.",
    fossa: "anterior",
  },

  // ── Middle cranial fossa ──────────────────────────────────────────────
  {
    id: "optic-canal-l",
    label: "Optic canal",
    shape: { type: "ellipse", cx: 268, cy: 158, rx: 7, ry: 7 },
    contents: "Optic nerve (CN II), ophthalmic artery, sympathetic fibres",
    clinical:
      "Sheath surrounded by meninges + CSF — raised ICP transmits to the optic nerve causing papilloedema. Apex fractures → traumatic optic neuropathy.",
    fossa: "middle",
  },
  {
    id: "optic-canal-r",
    label: "Optic canal",
    shape: { type: "ellipse", cx: 332, cy: 158, rx: 7, ry: 7 },
    contents: "Optic nerve (CN II), ophthalmic artery, sympathetic fibres",
    clinical:
      "Sheath surrounded by meninges + CSF — raised ICP transmits to the optic nerve causing papilloedema. Apex fractures → traumatic optic neuropathy.",
    fossa: "middle",
  },
  {
    id: "sof-l",
    label: "Superior orbital fissure",
    shape: {
      type: "path",
      d: "M252,170 Q235,178 222,192 Q218,196 222,200 Q226,202 232,198 Q248,184 264,180 Q270,178 270,174 Q268,170 262,170 Z",
      centroid: [244, 184],
    },
    contents: "CN III (sup./inf. divisions), CN IV, V₁ (lacrimal, frontal, nasociliary), CN VI, superior ophthalmic vein, sympathetic fibres",
    clinical:
      "SOF syndrome → ophthalmoplegia + V₁ sensory loss with preserved vision. If vision is also lost the apex (incl. optic canal) is involved — orbital apex syndrome. Annulus of Zinn divides contents inside vs. outside.",
    fossa: "middle",
  },
  {
    id: "sof-r",
    label: "Superior orbital fissure",
    shape: {
      type: "path",
      d: "M348,170 Q365,178 378,192 Q382,196 378,200 Q374,202 368,198 Q352,184 336,180 Q330,178 330,174 Q332,170 338,170 Z",
      centroid: [356, 184],
    },
    contents: "CN III (sup./inf. divisions), CN IV, V₁ (lacrimal, frontal, nasociliary), CN VI, superior ophthalmic vein, sympathetic fibres",
    clinical:
      "SOF syndrome → ophthalmoplegia + V₁ sensory loss with preserved vision. If vision is also lost the apex (incl. optic canal) is involved — orbital apex syndrome.",
    fossa: "middle",
  },
  {
    id: "rotundum-l",
    label: "Foramen rotundum",
    shape: { type: "ellipse", cx: 256, cy: 205, rx: 6, ry: 6 },
    contents: "Maxillary nerve (CN V₂)",
    clinical:
      "Exits into the pterygopalatine fossa. Target for the V₂ block (suprazygomatic approach) for mid-face surgery and trigeminal neuralgia.",
    fossa: "middle",
  },
  {
    id: "rotundum-r",
    label: "Foramen rotundum",
    shape: { type: "ellipse", cx: 344, cy: 205, rx: 6, ry: 6 },
    contents: "Maxillary nerve (CN V₂)",
    clinical:
      "Exits into the pterygopalatine fossa. Target for the V₂ block (suprazygomatic approach) for mid-face surgery and trigeminal neuralgia.",
    fossa: "middle",
  },
  {
    id: "ovale-l",
    label: "Foramen ovale",
    shape: { type: "ellipse", cx: 240, cy: 232, rx: 10, ry: 6, rotate: -20 },
    contents: "Mandibular nerve (CN V₃), accessory meningeal artery, lesser petrosal nerve (variable)",
    clinical:
      "V₃ carries motor fibres to the muscles of mastication. Percutaneous ovale puncture under fluoroscopy is the route for radiofrequency rhizotomy in trigeminal neuralgia.",
    fossa: "middle",
  },
  {
    id: "ovale-r",
    label: "Foramen ovale",
    shape: { type: "ellipse", cx: 360, cy: 232, rx: 10, ry: 6, rotate: 20 },
    contents: "Mandibular nerve (CN V₃), accessory meningeal artery, lesser petrosal nerve (variable)",
    clinical:
      "V₃ carries motor fibres to the muscles of mastication. Percutaneous ovale puncture under fluoroscopy is the route for radiofrequency rhizotomy in trigeminal neuralgia.",
    fossa: "middle",
  },
  {
    id: "spinosum-l",
    label: "Foramen spinosum",
    shape: { type: "ellipse", cx: 224, cy: 247, rx: 4, ry: 4 },
    contents: "Middle meningeal artery & vein, meningeal branch of V₃ (nervus spinosus)",
    clinical:
      "Pterional/temporal bone fractures rupture the middle meningeal artery → extradural haematoma with classic lucid interval and rapid neurological deterioration.",
    fossa: "middle",
  },
  {
    id: "spinosum-r",
    label: "Foramen spinosum",
    shape: { type: "ellipse", cx: 376, cy: 247, rx: 4, ry: 4 },
    contents: "Middle meningeal artery & vein, meningeal branch of V₃ (nervus spinosus)",
    clinical:
      "Pterional/temporal bone fractures rupture the middle meningeal artery → extradural haematoma with classic lucid interval and rapid neurological deterioration.",
    fossa: "middle",
  },
  {
    id: "lacerum-l",
    label: "Foramen lacerum",
    shape: { type: "ellipse", cx: 268, cy: 232, rx: 5, ry: 4, rotate: -25 },
    contents: "In life: filled by cartilage. Internal carotid artery passes ABOVE it (does not transit). Greater petrosal nerve, deep petrosal nerve.",
    clinical:
      "Often misremembered as transmitting the ICA — the carotid runs through the carotid canal above lacerum. Relevant in skull-base tumours and clival chordomas.",
    fossa: "middle",
  },
  {
    id: "lacerum-r",
    label: "Foramen lacerum",
    shape: { type: "ellipse", cx: 332, cy: 232, rx: 5, ry: 4, rotate: 25 },
    contents: "In life: filled by cartilage. Internal carotid artery passes ABOVE it (does not transit). Greater petrosal nerve, deep petrosal nerve.",
    clinical:
      "Often misremembered as transmitting the ICA — the carotid runs through the carotid canal above lacerum. Relevant in skull-base tumours and clival chordomas.",
    fossa: "middle",
  },
  {
    id: "carotid-l",
    label: "Carotid canal",
    shape: { type: "ellipse", cx: 218, cy: 270, rx: 6, ry: 6 },
    contents: "Internal carotid artery, internal carotid sympathetic plexus, internal carotid venous plexus",
    clinical:
      "Carotid runs through the petrous temporal bone before entering the cavernous sinus. Disruption (basilar skull fracture, iatrogenic injury) → carotid–cavernous fistula with pulsatile proptosis.",
    fossa: "middle",
  },
  {
    id: "carotid-r",
    label: "Carotid canal",
    shape: { type: "ellipse", cx: 382, cy: 270, rx: 6, ry: 6 },
    contents: "Internal carotid artery, internal carotid sympathetic plexus, internal carotid venous plexus",
    clinical:
      "Carotid runs through the petrous temporal bone before entering the cavernous sinus. Disruption → carotid–cavernous fistula with pulsatile proptosis.",
    fossa: "middle",
  },

  // ── Posterior cranial fossa ───────────────────────────────────────────
  {
    id: "iam-l",
    label: "Internal acoustic meatus",
    shape: { type: "ellipse", cx: 232, cy: 295, rx: 9, ry: 5, rotate: -10 },
    contents: "CN VII (facial), CN VIII (vestibulocochlear), nervus intermedius, labyrinthine artery",
    clinical:
      "Vestibular schwannomas (acoustic neuromas) arise here — present with unilateral SNHL, tinnitus, and balance disturbance. Intra-operative facial nerve monitoring is mandatory.",
    fossa: "posterior",
  },
  {
    id: "iam-r",
    label: "Internal acoustic meatus",
    shape: { type: "ellipse", cx: 368, cy: 295, rx: 9, ry: 5, rotate: 10 },
    contents: "CN VII (facial), CN VIII (vestibulocochlear), nervus intermedius, labyrinthine artery",
    clinical:
      "Vestibular schwannomas (acoustic neuromas) arise here — present with unilateral SNHL, tinnitus, and balance disturbance. Intra-operative facial nerve monitoring is mandatory.",
    fossa: "posterior",
  },
  {
    id: "jugular-l",
    label: "Jugular foramen",
    shape: {
      type: "path",
      d: "M210,322 Q204,330 208,342 Q214,352 226,350 Q236,346 238,335 Q236,322 226,318 Q216,316 210,322 Z",
      centroid: [222, 335],
    },
    contents: "CN IX (glossopharyngeal), CN X (vagus), CN XI (accessory), internal jugular vein, inferior petrosal & sigmoid sinuses",
    clinical:
      "Jugular foramen syndrome (Vernet) → IX/X/XI palsies (dysphagia, hoarseness, SCM/trapezius weakness). Glomus jugulare tumours arise here.",
    fossa: "posterior",
  },
  {
    id: "jugular-r",
    label: "Jugular foramen",
    shape: {
      type: "path",
      d: "M390,322 Q396,330 392,342 Q386,352 374,350 Q364,346 362,335 Q364,322 374,318 Q384,316 390,322 Z",
      centroid: [378, 335],
    },
    contents: "CN IX (glossopharyngeal), CN X (vagus), CN XI (accessory), internal jugular vein, inferior petrosal & sigmoid sinuses",
    clinical:
      "Jugular foramen syndrome (Vernet) → IX/X/XI palsies (dysphagia, hoarseness, SCM/trapezius weakness). Glomus jugulare tumours arise here.",
    fossa: "posterior",
  },
  {
    id: "hypoglossal-l",
    label: "Hypoglossal canal",
    shape: { type: "ellipse", cx: 262, cy: 360, rx: 6, ry: 4 },
    contents: "Hypoglossal nerve (CN XII), meningeal branch of ascending pharyngeal artery, emissary vein",
    clinical:
      "Lesion causes ipsilateral tongue deviation on protrusion ('tongue points to the lesion'). At risk during carotid endarterectomy — examine tongue movement post-op.",
    fossa: "posterior",
  },
  {
    id: "hypoglossal-r",
    label: "Hypoglossal canal",
    shape: { type: "ellipse", cx: 338, cy: 360, rx: 6, ry: 4 },
    contents: "Hypoglossal nerve (CN XII), meningeal branch of ascending pharyngeal artery, emissary vein",
    clinical:
      "Lesion causes ipsilateral tongue deviation on protrusion ('tongue points to the lesion'). At risk during carotid endarterectomy — examine tongue movement post-op.",
    fossa: "posterior",
  },
  {
    id: "foramen-magnum",
    label: "Foramen magnum",
    shape: { type: "ellipse", cx: 300, cy: 395, rx: 36, ry: 26 },
    contents: "Medulla → spinal cord, vertebral arteries, anterior & posterior spinal arteries, spinal roots of CN XI, meninges",
    clinical:
      "Tonsillar herniation ('coning') through foramen magnum → Cushing's triad and cardiorespiratory arrest. Arnold-Chiari malformation describes congenital tonsillar descent.",
    fossa: "posterior",
  },
];

const SkullBaseDiagram = () => {
  const [selected, setSelected] = useState<string | null>("ovale-l");
  const [showSutures, setShowSutures] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Selecting one foramen also visually highlights its mirror partner
  const selectedForamen = foramina.find((f) => f.id === selected) ?? null;

  return (
    <DiagramFigure
      id="skull-base-diagram"
      title="Skull base"
      description="Auto-generated wrapper for the Skull base anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Internal Surface of the Skull Base — Cranial Nerve Foramina"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
            ]}
          />
  
          <div className="flex flex-wrap gap-3 justify-center mb-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: fossaColors.anterior, opacity: 0.55 }} /> Anterior fossa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: fossaColors.middle, opacity: 0.55 }} /> Middle fossa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: fossaColors.posterior, opacity: 0.55 }} /> Posterior fossa
            </span>
          </div>
  
          <svg
            viewBox="0 0 600 470"
            className="w-full max-w-2xl mx-auto"
            role="img"
            aria-label="Diagram of the internal surface of the skull base showing the three cranial fossae and major foramina"
          >
            <defs>
              {/* Apex/depth shading inside each fossa */}
              <radialGradient id="anteriorShade" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor={fossaColors.anterior} stopOpacity="0.18" />
                <stop offset="100%" stopColor={fossaColors.anterior} stopOpacity="0.04" />
              </radialGradient>
              <radialGradient id="middleShadeL" cx="55%" cy="55%" r="65%">
                <stop offset="0%" stopColor={fossaColors.middle} stopOpacity="0.22" />
                <stop offset="100%" stopColor={fossaColors.middle} stopOpacity="0.04" />
              </radialGradient>
              <radialGradient id="middleShadeR" cx="45%" cy="55%" r="65%">
                <stop offset="0%" stopColor={fossaColors.middle} stopOpacity="0.22" />
                <stop offset="100%" stopColor={fossaColors.middle} stopOpacity="0.04" />
              </radialGradient>
              <radialGradient id="posteriorShade" cx="50%" cy="55%" r="60%">
                <stop offset="0%" stopColor={fossaColors.posterior} stopOpacity="0.22" />
                <stop offset="100%" stopColor={fossaColors.posterior} stopOpacity="0.04" />
              </radialGradient>
              {/* Subtle bone texture */}
              <pattern id="boneGrain" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
              </pattern>
              {/* Drop shadow for the cranial vault */}
              <filter id="vaultShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="2" result="off" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.32" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Clip everything to the vault outline */}
              <clipPath id="vaultClip">
                <ellipse cx={300} cy={235} rx={220} ry={205} />
              </clipPath>
            </defs>
  
            {/* Compass */}
            <text x={300} y={14} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">ANTERIOR</text>
            <text x={300} y={462} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">POSTERIOR</text>
            <text x={50} y={240} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">RIGHT</text>
            <text x={550} y={240} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">LEFT</text>
  
            {/* Cranial vault */}
            <ellipse
              cx={300}
              cy={235}
              rx={220}
              ry={205}
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              strokeWidth={2}
              filter="url(#vaultShadow)"
            />
  
            <g clipPath="url(#vaultClip)">
              {/* ── Anterior cranial fossa ───────────────────────── */}
              <path
                d="M120,180 Q200,55 300,50 Q400,55 480,180 L380,195 Q300,160 220,195 Z"
                fill={fossaColors.anterior}
                fillOpacity={0.08}
                stroke={fossaColors.anterior}
                strokeWidth={0.5}
                strokeDasharray="4 3"
              />
              <path
                d="M120,180 Q200,55 300,50 Q400,55 480,180 L380,195 Q300,160 220,195 Z"
                fill="url(#anteriorShade)"
                pointerEvents="none"
              />
  
              {/* ── Middle cranial fossa (paired wings either side of sella) ── */}
              <path
                d="M120,180 L220,195 Q260,210 280,255 L200,278 Q160,278 130,275 Q120,240 120,180 Z"
                fill={fossaColors.middle}
                fillOpacity={0.08}
                stroke={fossaColors.middle}
                strokeWidth={0.5}
                strokeDasharray="4 3"
              />
              <path
                d="M120,180 L220,195 Q260,210 280,255 L200,278 Q160,278 130,275 Q120,240 120,180 Z"
                fill="url(#middleShadeL)"
                pointerEvents="none"
              />
  
              <path
                d="M480,180 L380,195 Q340,210 320,255 L400,278 Q440,278 470,275 Q480,240 480,180 Z"
                fill={fossaColors.middle}
                fillOpacity={0.08}
                stroke={fossaColors.middle}
                strokeWidth={0.5}
                strokeDasharray="4 3"
              />
              <path
                d="M480,180 L380,195 Q340,210 320,255 L400,278 Q440,278 470,275 Q480,240 480,180 Z"
                fill="url(#middleShadeR)"
                pointerEvents="none"
              />
  
              {/* Sella turcica region (central elevation) */}
              <path
                d="M280,195 Q300,180 320,195 L320,255 Q300,265 280,255 Z"
                fill="hsl(var(--muted))"
                fillOpacity={0.45}
                stroke="hsl(var(--border))"
                strokeWidth={0.75}
              />
              <text x={300} y={228} textAnchor="middle" className="text-[7.5px] fill-muted-foreground italic">
                sella turcica
              </text>
  
              {/* ── Posterior cranial fossa ──────────────────────── */}
              <path
                d="M130,275 Q160,278 200,278 L280,260 Q300,265 320,260 L400,278 Q440,278 470,275 Q470,400 300,440 Q130,400 130,275 Z"
                fill={fossaColors.posterior}
                fillOpacity={0.08}
                stroke={fossaColors.posterior}
                strokeWidth={0.5}
                strokeDasharray="4 3"
              />
              <path
                d="M130,275 Q160,278 200,278 L280,260 Q300,265 320,260 L400,278 Q440,278 470,275 Q470,400 300,440 Q130,400 130,275 Z"
                fill="url(#posteriorShade)"
                pointerEvents="none"
              />
  
              {/* Bone texture overlay */}
              <ellipse cx={300} cy={235} rx={220} ry={205} fill="url(#boneGrain)" pointerEvents="none" />
  
              {/* Sutures + bony landmarks */}
              {showSutures && (
                <g stroke="hsl(var(--foreground))" strokeWidth={0.5} opacity={0.45} fill="none" pointerEvents="none">
                  {/* Crista galli */}
                  <line x1={300} y1={70} x2={300} y2={120} strokeDasharray="0" strokeWidth={1.5} opacity={0.55} />
                  {/* Petrous ridges (curved, sloping medially towards dorsum sellae) */}
                  <path d="M150,278 Q220,265 280,255" strokeDasharray="3 2" />
                  <path d="M450,278 Q380,265 320,255" strokeDasharray="3 2" />
                  {/* Sphenoid crest / planum sphenoidale */}
                  <path d="M220,195 Q260,210 280,225 L320,225 Q340,210 380,195" strokeDasharray="3 2" />
                  {/* Frontoethmoidal sutures */}
                  <path d="M210,135 Q240,108 278,100" strokeDasharray="2 2" />
                  <path d="M390,135 Q360,108 322,100" strokeDasharray="2 2" />
                  {/* Lambdoid suture along posterior fossa */}
                  <path d="M155,360 Q220,420 300,432 Q380,420 445,360" strokeDasharray="2 2" />
                  {/* Internal occipital crest */}
                  <line x1={300} y1={420} x2={300} y2={440} strokeDasharray="0" strokeWidth={1} opacity={0.5} />
                </g>
              )}
  
              {/* Midline reference */}
              <line x1={300} y1={50} x2={300} y2={440} stroke="hsl(var(--foreground))" strokeWidth={0.5} strokeDasharray="2 4" opacity={0.25} pointerEvents="none" />
            </g>
  
            {/* Crista galli label outside clip */}
            {showLabels && (
              <text x={300} y={132} textAnchor="middle" className="text-[7.5px] fill-muted-foreground italic">
                crista galli
              </text>
            )}
  
            {/* Foramina */}
            {foramina.map((f) => {
              const partnerSelected =
                selectedForamen !== null &&
                selectedForamen.label === f.label &&
                selectedForamen.id !== f.id;
              const isSelected = selected === f.id || partnerSelected;
              const color = fossaColors[f.fossa];
              const [cx, cy] =
                f.shape.type === "ellipse" ? [f.shape.cx, f.shape.cy] : f.shape.centroid;
  
              // Place label outside the vault on the appropriate side; centre-pole foramina go above/below
              const isMidline = Math.abs(cx - 300) < 8;
              let labelX: number;
              let labelY: number;
              let anchor: "start" | "end" | "middle";
              if (isMidline) {
                labelX = cx;
                labelY = cy < 235 ? cy - 18 : cy + f.shape.type === "ellipse" ? cy + (f.shape as any).ry + 14 : cy + 18;
                anchor = "middle";
              } else if (cx < 300) {
                labelX = 110;
                labelY = cy + 3;
                anchor = "end";
              } else {
                labelX = 490;
                labelY = cy + 3;
                anchor = "start";
              }
  
              // Manually adjust for crowded mid-fossa labels (left side)
              const yOffsets: Record<string, number> = {
                "optic-canal-l": -2,
                "sof-l": 6,
                "rotundum-l": 8,
                "ovale-l": 4,
                "spinosum-l": 4,
                "lacerum-l": 0,
                "carotid-l": 6,
                "iam-l": 0,
                "jugular-l": 6,
                "hypoglossal-l": 4,
                "optic-canal-r": -2,
                "sof-r": 6,
                "rotundum-r": 8,
                "ovale-r": 4,
                "spinosum-r": 4,
                "lacerum-r": 0,
                "carotid-r": 6,
                "iam-r": 0,
                "jugular-r": 6,
                "hypoglossal-r": 4,
              };
              if (yOffsets[f.id] !== undefined) labelY = cy + yOffsets[f.id];
  
              return (
                    <g
                  key={f.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(selected === f.id ? null : f.id)}
                >
                  {f.shape.type === "ellipse" ? (
                    <ellipse
                      cx={f.shape.cx}
                      cy={f.shape.cy}
                      rx={f.shape.rx}
                      ry={f.shape.ry}
                      transform={f.shape.rotate ? `rotate(${f.shape.rotate} ${f.shape.cx} ${f.shape.cy})` : undefined}
                      fill={isSelected ? color : "hsl(var(--foreground))"}
                      fillOpacity={isSelected ? 0.85 : 0.55}
                      stroke={isSelected ? color : "hsl(var(--foreground))"}
                      strokeWidth={isSelected ? 1.6 : 0.8}
                    />
                  ) : (
                    <path
                      d={f.shape.d}
                      fill={isSelected ? color : "hsl(var(--foreground))"}
                      fillOpacity={isSelected ? 0.85 : 0.55}
                      stroke={isSelected ? color : "hsl(var(--foreground))"}
                      strokeWidth={isSelected ? 1.4 : 0.8}
                    />
                  )}
  
                  {/* Show label only on the "primary" side (left half) to avoid duplication;
                      midline foramina (cribriform halves, foramen magnum) show one label centred. */}
                  {showLabels && !f.id.endsWith("-r") && (
                    <>
                      <line
                        x1={cx}
                        y1={cy}
                        x2={labelX + (anchor === "end" ? 6 : anchor === "start" ? -6 : 0)}
                        y2={labelY - 2}
                        stroke={isSelected ? color : "hsl(var(--muted-foreground))"}
                        strokeWidth={isSelected ? 0.9 : 0.5}
                        opacity={isSelected ? 0.85 : 0.45}
                        pointerEvents="none"
                      />
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor={anchor}
                        className="text-[8px] fill-foreground select-none pointer-events-none"
                        fontWeight={isSelected ? 600 : 400}
                        opacity={isSelected ? 1 : 0.85}
                      >
                        {f.label}
                      </text>
                    </>
                  )}
                </g>
    );
            })}
          </svg>
  
          {/* Mnemonic */}
          <p className="text-xs text-center text-muted-foreground mt-2 italic">
            <span className="font-semibold not-italic text-foreground">Standing Room Only — </span>
            CN V₁ → Superior orbital fissure, V₂ → Rotundum, V₃ → Ovale.
          </p>
  
          {/* Detail panel */}
          <div className="mt-4 min-h-[110px]">
            {selectedForamen ? (
              <div
                className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
                style={{ borderLeftWidth: 4, borderLeftColor: fossaColors[selectedForamen.fossa] }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-foreground text-sm">{selectedForamen.label}</p>
                  <span
                    className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                    style={{ background: `${fossaColors[selectedForamen.fossa]}26`, color: fossaColors[selectedForamen.fossa] }}
                  >
                    {selectedForamen.fossa} fossa
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Transmits:</span> {selectedForamen.contents}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Clinical:</span> {selectedForamen.clinical}
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center italic">
                Tap a foramen above to see its contents and clinical relevance.
              </p>
            )}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SkullBaseDiagram;
