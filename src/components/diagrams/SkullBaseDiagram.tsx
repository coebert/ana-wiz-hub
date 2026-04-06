import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type Fossa = "anterior" | "middle" | "posterior";

interface Foramen {
  id: string;
  name: string;
  fossa: Fossa;
  contents: string[];
  clinicalNote?: string;
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  labelX: number;
  labelY: number;
  labelAnchor: "start" | "end" | "middle";
}

const foramina: Foramen[] = [
  // ─── Anterior fossa ───
  { id: "cribriform", name: "Cribriform Plate", fossa: "anterior",
    cx: 200, cy: 78, rx: 18, ry: 8,
    labelX: 200, labelY: 42, labelAnchor: "middle",
    contents: ["CN I — Olfactory nerve fibres (multiple filaments)"],
    clinicalNote: "Base-of-skull fracture → CSF rhinorrhoea, anosmia. Contraindication to nasotracheal intubation and NG tube insertion." },
  { id: "ant-ethmoidal", name: "Anterior Ethmoidal Foramen", fossa: "anterior",
    cx: 178, cy: 88, rx: 3, ry: 2,
    labelX: 78, labelY: 72, labelAnchor: "end",
    contents: ["Anterior ethmoidal artery & nerve (V1 branch)"],
    clinicalNote: "Artery source of epistaxis; landmark for frontal sinus surgery." },
  { id: "post-ethmoidal", name: "Posterior Ethmoidal Foramen", fossa: "anterior",
    cx: 222, cy: 88, rx: 3, ry: 2,
    labelX: 322, labelY: 72, labelAnchor: "start",
    contents: ["Posterior ethmoidal artery & nerve"] },

  // ─── Middle fossa ───
  { id: "optic-canal-l", name: "Optic Canal", fossa: "middle",
    cx: 178, cy: 120, rx: 5, ry: 4,
    labelX: 68, labelY: 115, labelAnchor: "end",
    contents: ["CN II — Optic nerve", "Ophthalmic artery (branch of ICA)"],
    clinicalNote: "Pituitary tumour → bitemporal hemianopia (optic chiasm compression). Optic canal unroofing in optic nerve decompression." },
  { id: "optic-canal-r", name: "Optic Canal (R)", fossa: "middle",
    cx: 222, cy: 120, rx: 5, ry: 4,
    labelX: 222, labelY: 120, labelAnchor: "middle",
    contents: ["CN II — Optic nerve", "Ophthalmic artery"] },
  { id: "sof-l", name: "Superior Orbital Fissure", fossa: "middle",
    cx: 168, cy: 132, rx: 12, ry: 4,
    labelX: 58, labelY: 135, labelAnchor: "end",
    contents: ["CN III — Oculomotor", "CN IV — Trochlear", "CN V1 — Ophthalmic (lacrimal, frontal, nasociliary)", "CN VI — Abducens", "Superior ophthalmic vein"],
    clinicalNote: "Cavernous sinus thrombosis → all structures affected. Superior orbital fissure syndrome: proptosis + ophthalmoplegia + V1 sensory loss." },
  { id: "f-rotundum", name: "Foramen Rotundum", fossa: "middle",
    cx: 162, cy: 160, rx: 4, ry: 4,
    labelX: 52, labelY: 160, labelAnchor: "end",
    contents: ["CN V2 — Maxillary nerve"],
    clinicalNote: "Maxillary nerve block for mid-face surgery. V2 enters pterygopalatine fossa after exiting." },
  { id: "f-ovale", name: "Foramen Ovale", fossa: "middle",
    cx: 155, cy: 185, rx: 6, ry: 4,
    labelX: 45, labelY: 188, labelAnchor: "end",
    contents: ["CN V3 — Mandibular nerve", "Accessory meningeal artery", "Lesser petrosal nerve"],
    clinicalNote: "Route for percutaneous trigeminal ganglion procedures (balloon compression, RF thermocoagulation). Mandibular nerve block." },
  { id: "f-spinosum", name: "Foramen Spinosum", fossa: "middle",
    cx: 158, cy: 200, rx: 3, ry: 3,
    labelX: 48, labelY: 208, labelAnchor: "end",
    contents: ["Middle meningeal artery (branch of maxillary artery)", "Meningeal branch of V3"],
    clinicalNote: "MMA rupture → extradural (epidural) haematoma — 'lucid interval' then rapid deterioration. Temporal region most common." },
  { id: "f-lacerum", name: "Foramen Lacerum", fossa: "middle",
    cx: 168, cy: 220, rx: 7, ry: 5,
    labelX: 52, labelY: 232, labelAnchor: "end",
    contents: ["ICA passes OVER (not through) the superior surface", "Greater petrosal nerve → nerve of pterygoid canal", "Filled with fibrocartilage in life"],
    clinicalNote: "Common exam misconception: ICA does NOT pass through foramen lacerum — it passes over it from the carotid canal to the cavernous sinus." },
  { id: "carotid-canal", name: "Carotid Canal", fossa: "middle",
    cx: 168, cy: 240, rx: 5, ry: 4,
    labelX: 55, labelY: 255, labelAnchor: "end",
    contents: ["Internal carotid artery", "Sympathetic carotid plexus"],
    clinicalNote: "ICA enters petrous temporal bone → carotid canal → over foramen lacerum → cavernous sinus → emerges medial to anterior clinoid." },

  // ─── Posterior fossa ───
  { id: "iam", name: "Internal Acoustic Meatus", fossa: "posterior",
    cx: 245, cy: 225, rx: 6, ry: 4,
    labelX: 340, labelY: 215, labelAnchor: "start",
    contents: ["CN VII — Facial nerve", "CN VIII — Vestibulocochlear nerve", "Labyrinthine artery (branch of AICA)"],
    clinicalNote: "Vestibular schwannoma (acoustic neuroma) — CPA angle mass → CN VII/VIII compression. Intraoperative facial nerve monitoring essential." },
  { id: "jugular-f", name: "Jugular Foramen", fossa: "posterior",
    cx: 243, cy: 260, rx: 8, ry: 5,
    labelX: 345, labelY: 258, labelAnchor: "start",
    contents: ["CN IX — Glossopharyngeal", "CN X — Vagus", "CN XI — Accessory (cranial root)", "Internal jugular vein (sigmoid sinus continuation)", "Inferior petrosal sinus"],
    clinicalNote: "Glossopharyngeal nerve block for awake intubation (posterior tonsillar pillar). Vagus → recurrent laryngeal nerve. Jugular foramen syndrome (Vernet): CN IX, X, XI palsy." },
  { id: "hypoglossal", name: "Hypoglossal Canal", fossa: "posterior",
    cx: 230, cy: 282, rx: 5, ry: 3,
    labelX: 338, labelY: 286, labelAnchor: "start",
    contents: ["CN XII — Hypoglossal nerve"],
    clinicalNote: "At risk during carotid endarterectomy. LMN lesion: tongue deviates TOWARDS lesion side (ipsilateral). Bilateral lesion: difficulty speaking, swallowing." },
  { id: "f-magnum", name: "Foramen Magnum", fossa: "posterior",
    cx: 200, cy: 318, rx: 28, ry: 20,
    labelX: 200, labelY: 365, labelAnchor: "middle",
    contents: ["Medulla oblongata / Spinal cord junction", "Vertebral arteries (enter, unite → basilar artery)", "CN XI — Spinal accessory nerve (ascending root)", "Anterior & posterior spinal arteries", "Meninges (dura, arachnoid, pia)", "Tectorial membrane"],
    clinicalNote: "Tonsillar herniation (coning) through foramen magnum compresses medulla → fatal (Cushing response: hypertension, bradycardia, irregular respiration). Arnold-Chiari malformation." },
  { id: "stylomastoid", name: "Stylomastoid Foramen", fossa: "posterior",
    cx: 255, cy: 278, rx: 3, ry: 3,
    labelX: 345, labelY: 310, labelAnchor: "start",
    contents: ["CN VII — Facial nerve (exits skull here)", "Stylomastoid artery"],
    clinicalNote: "Facial nerve most vulnerable during parotid surgery and mastoidectomy. Nerve stimulator used to identify. Bell's palsy: idiopathic inflammation in facial canal." },
  { id: "condylar", name: "Condylar Canal", fossa: "posterior",
    cx: 245, cy: 330, rx: 3, ry: 3,
    labelX: 340, labelY: 338, labelAnchor: "start",
    contents: ["Condylar emissary vein"],
    clinicalNote: "Connects sigmoid sinus to suboccipital venous plexus. Route for infection spread." },
];

const fossaColors: Record<Fossa, { fill: string; text: string; bg: string; border: string }> = {
  anterior: { fill: "hsl(210 70% 55%)", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  middle: { fill: "hsl(40 75% 52%)", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  posterior: { fill: "hsl(155 55% 48%)", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
};

const fossaLabels: Record<Fossa, string> = {
  anterior: "Anterior Cranial Fossa",
  middle: "Middle Cranial Fossa",
  posterior: "Posterior Cranial Fossa",
};

const displayForamina = foramina.filter(f => f.id !== "optic-canal-r");

const SkullBaseDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterFossa, setFilterFossa] = useState<Fossa | "all">("all");

  const selectedForamen = foramina.find(f => f.id === selected);
  const isVisible = (f: Fossa) => filterFossa === "all" || filterFossa === f;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Base of Skull — Internal Surface</h3>
      <p className="text-sm text-muted-foreground mb-3">Tap any foramen to view its contents and clinical relevance. Filter by cranial fossa.</p>

      {/* Fossa filter */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge variant={filterFossa === "all" ? "default" : "outline"} className="cursor-pointer text-xs"
          onClick={() => { setFilterFossa("all"); setSelected(null); }}>All Fossae</Badge>
        {(["anterior", "middle", "posterior"] as Fossa[]).map(f => (
          <Badge key={f} variant={filterFossa === f ? "default" : "outline"}
            className={`cursor-pointer text-xs ${filterFossa === f ? "" : fossaColors[f].text}`}
            onClick={() => { setFilterFossa(f); setSelected(null); }}
            style={filterFossa === f ? { backgroundColor: fossaColors[f].fill } : {}}>
            {fossaLabels[f]}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* SVG */}
        <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto flex-shrink-0">
          <defs>
            <radialGradient id="skull-bone-bg" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.03" />
            </radialGradient>
            {/* Bone texture pattern */}
            <pattern id="bone-texture" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="0.3" fill="hsl(var(--muted-foreground))" opacity="0.08" />
            </pattern>
          </defs>

          {/* ═══ OUTER SKULL CONTOUR ═══ */}
          {/* More realistic cranial vault shape — viewed from above (internal surface) */}
          <path d={`M200,18 
            C260,18 310,35 330,70 
            C348,105 350,150 345,185 
            C340,225 330,260 315,290 
            C295,340 255,370 200,375 
            C145,370 105,340 85,290 
            C70,260 60,225 55,185 
            C50,150 52,105 70,70 
            C90,35 140,18 200,18 Z`}
            fill="url(#skull-bone-bg)" stroke="hsl(var(--border))" strokeWidth="1.2" />
          <path d={`M200,18 
            C260,18 310,35 330,70 
            C348,105 350,150 345,185 
            C340,225 330,260 315,290 
            C295,340 255,370 200,375 
            C145,370 105,340 85,290 
            C70,260 60,225 55,185 
            C50,150 52,105 70,70 
            C90,35 140,18 200,18 Z`}
            fill="url(#bone-texture)" />

          {/* ═══ BONE SUTURE LINES ═══ */}
          {/* Coronal suture (anterior) */}
          <path d="M85,95 Q120,88 145,92 Q170,96 200,95 Q230,96 255,92 Q280,88 315,95"
            fill="none" stroke="hsl(var(--border))" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.4" />

          {/* ═══ ANTERIOR CRANIAL FOSSA ═══ */}
          <path d={`M90,95 Q130,55 200,50 Q270,55 310,95 
            Q275,108 250,112 Q225,118 200,118 Q175,118 150,112 Q125,108 90,95 Z`}
            fill={fossaColors.anterior.fill} fillOpacity={isVisible("anterior") ? 0.07 : 0.01}
            stroke={fossaColors.anterior.fill} strokeWidth="0.6" strokeDasharray="3 2"
            opacity={isVisible("anterior") ? 0.8 : 0.15} />

          {/* Orbital plates of frontal bone (paired depressions) */}
          <ellipse cx="165" cy="80" rx="30" ry="15" fill="none" stroke={fossaColors.anterior.fill}
            strokeWidth="0.4" opacity={isVisible("anterior") ? 0.3 : 0.05} />
          <ellipse cx="235" cy="80" rx="30" ry="15" fill="none" stroke={fossaColors.anterior.fill}
            strokeWidth="0.4" opacity={isVisible("anterior") ? 0.3 : 0.05} />

          {/* Crista galli */}
          <path d="M200,60 L196,72 L204,72 Z" fill={fossaColors.anterior.fill} fillOpacity={isVisible("anterior") ? 0.15 : 0.03}
            stroke={fossaColors.anterior.fill} strokeWidth="0.5" opacity={isVisible("anterior") ? 0.6 : 0.1} />
          <text x="200" y="57" textAnchor="middle" fontSize="5" fill={fossaColors.anterior.fill}
            opacity={isVisible("anterior") ? 0.5 : 0.1}>Crista galli</text>

          {/* Cribriform plate area */}
          <rect x="185" y="72" width="30" height="14" rx="3" fill="none" stroke={fossaColors.anterior.fill}
            strokeWidth="0.5" strokeDasharray="1 1" opacity={isVisible("anterior") ? 0.4 : 0.08} />
          {/* Olfactory grooves */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <circle key={`olf-${i}`} cx={188 + i * 4} cy={79} r="0.8" fill={fossaColors.anterior.fill}
              fillOpacity={isVisible("anterior") ? 0.2 : 0.03} />
          ))}

          <text x="200" y="40" textAnchor="middle" fontSize="7" fill={fossaColors.anterior.fill}
            fontWeight="600" opacity={isVisible("anterior") ? 0.5 : 0.1}>ANTERIOR FOSSA</text>

          {/* ═══ LESSER WING OF SPHENOID (anterior-middle boundary) ═══ */}
          <path d="M90,95 Q130,110 155,112 Q175,115 200,118 Q225,115 245,112 Q270,110 310,95"
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.2" />
          <text x="120" y="107" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.3">Lesser wing</text>

          {/* ═══ MIDDLE CRANIAL FOSSA ═══ */}
          {/* Left middle fossa floor */}
          <path d={`M90,95 Q125,108 155,112 Q170,125 165,155 
            Q160,190 158,210 Q156,230 168,245 
            Q180,248 200,248 Q200,118 200,118 
            Q175,118 155,112 Z`}
            fill={fossaColors.middle.fill} fillOpacity={isVisible("middle") ? 0.05 : 0.01}
            stroke={fossaColors.middle.fill} strokeWidth="0.4" strokeDasharray="3 2"
            opacity={isVisible("middle") ? 0.6 : 0.12} />
          {/* Right middle fossa floor */}
          <path d={`M310,95 Q275,108 245,112 Q230,125 235,155 
            Q240,190 242,210 Q244,230 232,245 
            Q220,248 200,248 Q200,118 200,118 
            Q225,118 245,112 Z`}
            fill={fossaColors.middle.fill} fillOpacity={isVisible("middle") ? 0.05 : 0.01}
            stroke={fossaColors.middle.fill} strokeWidth="0.4" strokeDasharray="3 2"
            opacity={isVisible("middle") ? 0.6 : 0.12} />

          {/* Greater wing of sphenoid texture */}
          <text x="130" y="170" fontSize="5" fill={fossaColors.middle.fill} opacity={isVisible("middle") ? 0.3 : 0.06}>Greater wing</text>
          <text x="260" y="170" fontSize="5" fill={fossaColors.middle.fill} opacity={isVisible("middle") ? 0.3 : 0.06}>Greater wing</text>

          {/* Sella turcica (pituitary fossa) — detailed */}
          <ellipse cx="200" cy="170" rx="16" ry="10" fill="hsl(var(--card))" stroke="hsl(var(--foreground))"
            strokeWidth="0.7" opacity="0.3" />
          <path d="M184,165 Q190,158 200,156 Q210,158 216,165" fill="none" stroke="hsl(var(--foreground))"
            strokeWidth="0.5" opacity="0.25" />
          <text x="200" y="173" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5">Sella turcica</text>
          <text x="200" y="179" textAnchor="middle" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.35">(pituitary fossa)</text>

          {/* Anterior clinoid processes */}
          <circle cx="178" cy="155" r="3" fill="hsl(var(--muted-foreground))" fillOpacity="0.08"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.3" />
          <circle cx="222" cy="155" r="3" fill="hsl(var(--muted-foreground))" fillOpacity="0.08"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.3" />
          <text x="172" y="150" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.3" textAnchor="end">Ant clinoid</text>

          {/* Posterior clinoid processes */}
          <circle cx="190" cy="182" r="2.5" fill="hsl(var(--muted-foreground))" fillOpacity="0.06"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.25" />
          <circle cx="210" cy="182" r="2.5" fill="hsl(var(--muted-foreground))" fillOpacity="0.06"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.25" />

          {/* Dorsum sellae */}
          <path d="M188,185 Q200,192 212,185" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.2" />
          <text x="200" y="198" textAnchor="middle" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.3">Dorsum sellae</text>

          {/* Clivus */}
          <path d="M192,195 Q200,250 200,248" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.6" opacity="0.15" />
          <path d="M208,195 Q200,250 200,248" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.6" opacity="0.15" />
          <text x="200" y="215" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.25">Clivus</text>

          <text x="130" y="145" textAnchor="middle" fontSize="6" fill={fossaColors.middle.fill}
            fontWeight="600" opacity={isVisible("middle") ? 0.4 : 0.08}>MIDDLE</text>
          <text x="270" y="145" textAnchor="middle" fontSize="6" fill={fossaColors.middle.fill}
            fontWeight="600" opacity={isVisible("middle") ? 0.4 : 0.08}>MIDDLE</text>

          {/* ═══ PETROUS RIDGES (middle-posterior boundary) ═══ */}
          <path d="M168,245 Q185,235 200,248 Q215,235 232,245"
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.25" />
          {/* Extended petrous temporal bone */}
          <path d="M90,200 Q120,220 155,235 Q165,242 168,245"
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.2" />
          <path d="M310,200 Q280,220 245,235 Q235,242 232,245"
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.2" />
          <text x="128" y="232" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.3" transform="rotate(-25,128,232)">Petrous ridge</text>

          {/* ═══ POSTERIOR CRANIAL FOSSA ═══ */}
          <path d={`M168,245 Q185,235 200,248 Q215,235 232,245 
            Q250,255 270,270 Q300,300 295,335 Q260,370 200,375 
            Q140,370 105,335 Q100,300 130,270 Q150,255 168,245 Z`}
            fill={fossaColors.posterior.fill} fillOpacity={isVisible("posterior") ? 0.05 : 0.01}
            stroke={fossaColors.posterior.fill} strokeWidth="0.5" strokeDasharray="3 2"
            opacity={isVisible("posterior") ? 0.6 : 0.12} />

          {/* Internal occipital protuberance */}
          <circle cx="200" cy="355" r="3" fill="hsl(var(--muted-foreground))" fillOpacity="0.06"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.3" />
          <text x="200" y="365" textAnchor="middle" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.25">Int occipital protuberance</text>

          {/* Internal occipital crest */}
          <line x1="200" y1="340" x2="200" y2="355" stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.2" />

          {/* Grooves for transverse sinuses */}
          <path d="M105,335 Q150,345 200,340 Q250,345 295,335"
            fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.12" />
          <text x="145" y="348" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.2">Transverse sinus groove</text>

          {/* Grooves for sigmoid sinuses */}
          <path d="M105,335 Q95,310 100,285" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.1" />
          <path d="M295,335 Q305,310 300,285" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.1" />

          {/* Foramen magnum — detailed ellipse */}
          <ellipse cx="200" cy="318" rx="28" ry="20" fill="hsl(var(--card))" fillOpacity="0.5"
            stroke={fossaColors.posterior.fill} strokeWidth="1" opacity={isVisible("posterior") ? 0.6 : 0.12} />

          {/* Occipital condyles flanking foramen magnum */}
          <ellipse cx="168" cy="325" rx="10" ry="5" fill="hsl(var(--muted-foreground))" fillOpacity="0.04"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.2" transform="rotate(-15,168,325)" />
          <ellipse cx="232" cy="325" rx="10" ry="5" fill="hsl(var(--muted-foreground))" fillOpacity="0.04"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.2" transform="rotate(15,232,325)" />
          <text x="160" y="338" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.25" textAnchor="middle">Condyle</text>
          <text x="240" y="338" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.25" textAnchor="middle">Condyle</text>

          <text x="200" y="378" textAnchor="middle" fontSize="7" fill={fossaColors.posterior.fill}
            fontWeight="600" opacity={isVisible("posterior") ? 0.5 : 0.1}>POSTERIOR FOSSA</text>

          {/* Orientation */}
          <text x="200" y="14" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.4">ANTERIOR</text>
          <text x="200" y="396" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.4">POSTERIOR</text>
          <text x="40" y="200" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3" transform="rotate(-90,40,200)">LEFT</text>
          <text x="360" y="200" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3" transform="rotate(90,360,200)">RIGHT</text>

          {/* ═══ FORAMEN MARKERS ═══ */}
          {foramina.map(f => {
            if (!isVisible(f.fossa)) return null;
            if (f.id === "optic-canal-r") {
              // Just draw the dot for the right optic canal
              return (
                <ellipse key={f.id} cx={f.cx} cy={f.cy} rx={f.rx || 4} ry={f.ry || 3}
                  fill={selected === "optic-canal-l" ? fossaColors[f.fossa].fill : "hsl(var(--card))"}
                  fillOpacity={selected === "optic-canal-l" ? 0.4 : 0.3}
                  stroke={fossaColors[f.fossa].fill} strokeWidth={selected === "optic-canal-l" ? 1.5 : 0.6}
                  className="cursor-pointer" onClick={() => setSelected(selected === "optic-canal-l" ? null : "optic-canal-l")} />
              );
            }
            const isSel = selected === f.id;
            const color = fossaColors[f.fossa].fill;
            return (
              <g key={f.id} className="cursor-pointer" onClick={() => setSelected(isSel ? null : f.id)}>
                {/* Foramen shape */}
                <ellipse cx={f.cx} cy={f.cy} rx={f.rx || 4} ry={f.ry || 3}
                  fill={isSel ? color : "hsl(var(--card))"} fillOpacity={isSel ? 0.4 : 0.3}
                  stroke={color} strokeWidth={isSel ? 1.8 : 0.6} />
                {isSel && (
                  <ellipse cx={f.cx} cy={f.cy} rx={(f.rx || 4) + 5} ry={(f.ry || 3) + 4}
                    fill={color} fillOpacity="0.08" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
                )}
                {/* Leader line */}
                <line x1={f.cx} y1={f.cy} x2={f.labelX} y2={f.labelY}
                  stroke={color} strokeWidth="0.3" opacity={isSel ? 0.7 : 0.3} />
                {/* Label */}
                <text x={f.labelX} y={f.labelY} textAnchor={f.labelAnchor}
                  fontSize={isSel ? "6.5" : "5.5"} fill={isSel ? color : "hsl(var(--muted-foreground))"}
                  fontWeight={isSel ? 700 : 400} opacity={isSel ? 1 : 0.65}>
                  {f.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Detail panel */}
        <div className="flex-1 min-w-0">
          {selectedForamen ? (
            <div className={`p-4 rounded-lg border animate-fade-in ${fossaColors[selectedForamen.fossa].border} ${fossaColors[selectedForamen.fossa].bg}`}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h4 className="font-semibold text-foreground text-sm">{selectedForamen.name}</h4>
                <Badge variant="outline" className={`text-xs ${fossaColors[selectedForamen.fossa].text}`}>
                  {fossaLabels[selectedForamen.fossa]}
                </Badge>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Structures:</p>
              {selectedForamen.contents.map((c, i) => (
                <p key={i} className="text-sm text-foreground flex items-start gap-1.5">
                  <span className="text-muted-foreground mt-0.5">•</span>{c}
                </p>
              ))}
              {selectedForamen.clinicalNote && (
                <div className="mt-3 pt-2 border-t border-border/50">
                  <p className="text-xs font-medium text-amber-400 mb-1">⚠ Clinical Relevance</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedForamen.clinicalNote}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 text-foreground font-semibold">Foramen</th>
                    <th className="text-left py-1.5 text-foreground font-semibold">Key Contents</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {displayForamina.map(f => (
                    <tr key={f.id} className="border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => setSelected(f.id)}>
                      <td className={`py-1.5 font-medium ${fossaColors[f.fossa].text}`}>{f.name}</td>
                      <td className="py-1.5">{f.contents.slice(0, 2).join("; ")}{f.contents.length > 2 ? " …" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkullBaseDiagram;
