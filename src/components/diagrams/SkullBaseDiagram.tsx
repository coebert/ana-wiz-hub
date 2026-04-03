import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Fossa = "anterior" | "middle" | "posterior";

interface Foramen {
  id: string;
  name: string;
  fossa: Fossa;
  contents: string[];
  clinicalNote?: string;
  // SVG position (percentage-based for responsiveness)
  cx: number;
  cy: number;
  // label anchor
  labelX: number;
  labelY: number;
  labelAnchor?: "start" | "end" | "middle";
}

const foramina: Foramen[] = [
  // Anterior fossa
  { id: "cribriform", name: "Cribriform Plate", fossa: "anterior", cx: 50, cy: 14, labelX: 50, labelY: 8, labelAnchor: "middle", contents: ["CN I (Olfactory nerve fibres)"], clinicalNote: "Risk of CSF rhinorrhoea with base-of-skull fracture; contraindication to nasotracheal intubation/NG tube" },
  { id: "ant-ethmoidal", name: "Anterior Ethmoidal Foramen", fossa: "anterior", cx: 42, cy: 18, labelX: 22, labelY: 16, labelAnchor: "end", contents: ["Anterior ethmoidal artery & nerve (branch of V1)"] },
  { id: "post-ethmoidal", name: "Posterior Ethmoidal Foramen", fossa: "anterior", cx: 58, cy: 18, labelX: 78, labelY: 16, labelAnchor: "start", contents: ["Posterior ethmoidal artery & nerve"] },

  // Middle fossa
  { id: "optic-canal", name: "Optic Canal", fossa: "middle", cx: 44, cy: 26, labelX: 20, labelY: 25, labelAnchor: "end", contents: ["CN II (Optic nerve)", "Ophthalmic artery"], clinicalNote: "Pituitary surgery risk to optic chiasm" },
  { id: "optic-canal-r", name: "Optic Canal (R)", fossa: "middle", cx: 56, cy: 26, labelX: 56, labelY: 26 },
  { id: "sup-orbital-fissure", name: "Superior Orbital Fissure", fossa: "middle", cx: 40, cy: 30, labelX: 14, labelY: 31, labelAnchor: "end", contents: ["CN III (Oculomotor)", "CN IV (Trochlear)", "CN V1 (Ophthalmic — lacrimal, frontal, nasociliary)", "CN VI (Abducens)", "Superior ophthalmic vein"], clinicalNote: "Cavernous sinus thrombosis may affect all structures" },
  { id: "f-rotundum", name: "Foramen Rotundum", fossa: "middle", cx: 38, cy: 37, labelX: 14, labelY: 38, labelAnchor: "end", contents: ["CN V2 (Maxillary nerve)"], clinicalNote: "Maxillary nerve block for mid-face surgery" },
  { id: "f-ovale", name: "Foramen Ovale", fossa: "middle", cx: 37, cy: 43, labelX: 14, labelY: 44, labelAnchor: "end", contents: ["CN V3 (Mandibular nerve)", "Accessory meningeal artery", "Lesser petrosal nerve"], clinicalNote: "Mandibular nerve block; trigeminal ganglion ablation route" },
  { id: "f-spinosum", name: "Foramen Spinosum", fossa: "middle", cx: 40, cy: 48, labelX: 16, labelY: 50, labelAnchor: "end", contents: ["Middle meningeal artery", "Meningeal branch of V3"], clinicalNote: "Rupture → extradural haematoma (temporal region)" },
  { id: "f-lacerum", name: "Foramen Lacerum", fossa: "middle", cx: 42, cy: 52, labelX: 18, labelY: 56, labelAnchor: "end", contents: ["Internal carotid artery (passes over, not through)", "Greater petrosal nerve"], clinicalNote: "Fibrocartilage-filled in life; ICA passes over superior surface" },
  { id: "carotid-canal", name: "Carotid Canal", fossa: "middle", cx: 44, cy: 56, labelX: 20, labelY: 60, labelAnchor: "end", contents: ["Internal carotid artery", "Sympathetic plexus"] },

  // Posterior fossa
  { id: "iac", name: "Internal Acoustic Meatus", fossa: "posterior", cx: 60, cy: 52, labelX: 82, labelY: 50, labelAnchor: "start", contents: ["CN VII (Facial nerve)", "CN VIII (Vestibulocochlear nerve)", "Labyrinthine artery"], clinicalNote: "Acoustic neuroma site; facial nerve monitoring during surgery" },
  { id: "jugular-f", name: "Jugular Foramen", fossa: "posterior", cx: 62, cy: 60, labelX: 84, labelY: 58, labelAnchor: "start", contents: ["CN IX (Glossopharyngeal)", "CN X (Vagus)", "CN XI (Accessory — cranial root)", "Internal jugular vein", "Inferior petrosal sinus"], clinicalNote: "Glossopharyngeal nerve block for awake intubation; vagus → laryngeal nerves" },
  { id: "hypoglossal-canal", name: "Hypoglossal Canal", fossa: "posterior", cx: 58, cy: 66, labelX: 84, labelY: 66, labelAnchor: "start", contents: ["CN XII (Hypoglossal nerve)"], clinicalNote: "Risk during carotid endarterectomy; tongue deviates to lesion side" },
  { id: "f-magnum", name: "Foramen Magnum", fossa: "posterior", cx: 50, cy: 74, labelX: 50, labelY: 84, labelAnchor: "middle", contents: ["Medulla oblongata / Spinal cord", "Vertebral arteries", "CN XI (Spinal root of accessory nerve)", "Anterior & posterior spinal arteries", "Meninges"], clinicalNote: "Tonsillar herniation (coning) through foramen magnum is fatal" },
  { id: "stylomastoid", name: "Stylomastoid Foramen", fossa: "posterior", cx: 65, cy: 68, labelX: 86, labelY: 73, labelAnchor: "start", contents: ["CN VII (Facial nerve — exits skull)", "Stylomastoid artery"], clinicalNote: "Facial nerve vulnerable during parotid/mastoid surgery" },
];

// Filter out the duplicate optic canal marker (used only for SVG dot)
const uniqueForamina = foramina.filter(f => f.contents);

const fossaColors: Record<Fossa, { bg: string; border: string; fill: string; text: string }> = {
  anterior: { bg: "bg-blue-500/10", border: "border-blue-500/30", fill: "hsl(210,80%,60%)", text: "text-blue-400" },
  middle: { bg: "bg-amber-500/10", border: "border-amber-500/30", fill: "hsl(40,80%,55%)", text: "text-amber-400" },
  posterior: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", fill: "hsl(155,60%,50%)", text: "text-emerald-400" },
};

const fossaLabels: Record<Fossa, string> = {
  anterior: "Anterior Cranial Fossa",
  middle: "Middle Cranial Fossa",
  posterior: "Posterior Cranial Fossa",
};

const SkullBaseDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterFossa, setFilterFossa] = useState<Fossa | "all">("all");

  const selectedForamen = uniqueForamina.find(f => f.id === selected);
  const visibleForamina = filterFossa === "all" ? foramina : foramina.filter(f => f.fossa === filterFossa);

  return (
    <Card className="mb-8 border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
          Base of Skull — Foramina & Contents
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tap any foramen to view structures passing through it. Filter by cranial fossa.
        </p>
      </CardHeader>
      <CardContent>
        {/* Fossa filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant={filterFossa === "all" ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setFilterFossa("all")}
          >
            All Fossae
          </Badge>
          {(["anterior", "middle", "posterior"] as Fossa[]).map(f => (
            <Badge
              key={f}
              variant={filterFossa === f ? "default" : "outline"}
              className={`cursor-pointer text-xs ${filterFossa === f ? "" : fossaColors[f].text}`}
              onClick={() => setFilterFossa(f)}
            >
              {fossaLabels[f]}
            </Badge>
          ))}
        </div>

        {/* SVG Diagram */}
        <div className="relative w-full max-w-lg mx-auto">
          <svg viewBox="0 0 100 95" className="w-full" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {/* Skull outline — superior view of internal skull base */}
            <defs>
              <radialGradient id="skull-bg" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            {/* Outer skull shape */}
            <ellipse cx="50" cy="47" rx="46" ry="46" fill="url(#skull-bg)" stroke="hsl(var(--border))" strokeWidth="0.5" />

            {/* Fossa regions */}
            {/* Anterior fossa */}
            <path
              d="M 15 28 Q 50 5 85 28 Q 75 35 50 33 Q 25 35 15 28 Z"
              fill={filterFossa === "anterior" || filterFossa === "all" ? "hsl(210,80%,60%)" : "transparent"}
              fillOpacity={0.08}
              stroke="hsl(210,80%,60%)"
              strokeWidth="0.3"
              strokeDasharray="1.5 1"
              opacity={filterFossa === "all" || filterFossa === "anterior" ? 1 : 0.2}
            />
            <text x="50" y="22" textAnchor="middle" fontSize="2.2" fill="hsl(210,80%,60%)" opacity="0.6" fontWeight="600">ANTERIOR FOSSA</text>

            {/* Middle fossa */}
            <path
              d="M 15 28 Q 25 35 50 33 Q 75 35 85 28 Q 88 45 80 58 Q 60 48 50 48 Q 40 48 20 58 Q 12 45 15 28 Z"
              fill={filterFossa === "middle" || filterFossa === "all" ? "hsl(40,80%,55%)" : "transparent"}
              fillOpacity={0.06}
              stroke="hsl(40,80%,55%)"
              strokeWidth="0.3"
              strokeDasharray="1.5 1"
              opacity={filterFossa === "all" || filterFossa === "middle" ? 1 : 0.2}
            />
            <text x="28" y="42" textAnchor="middle" fontSize="2" fill="hsl(40,80%,55%)" opacity="0.5" fontWeight="600">MIDDLE</text>
            <text x="72" y="42" textAnchor="middle" fontSize="2" fill="hsl(40,80%,55%)" opacity="0.5" fontWeight="600">MIDDLE</text>

            {/* Posterior fossa */}
            <path
              d="M 20 58 Q 40 48 50 48 Q 60 48 80 58 Q 85 75 75 88 Q 50 95 25 88 Q 15 75 20 58 Z"
              fill={filterFossa === "posterior" || filterFossa === "all" ? "hsl(155,60%,50%)" : "transparent"}
              fillOpacity={0.06}
              stroke="hsl(155,60%,50%)"
              strokeWidth="0.3"
              strokeDasharray="1.5 1"
              opacity={filterFossa === "all" || filterFossa === "posterior" ? 1 : 0.2}
            />
            <text x="50" y="90" textAnchor="middle" fontSize="2.2" fill="hsl(155,60%,50%)" opacity="0.5" fontWeight="600">POSTERIOR FOSSA</text>

            {/* Petrous ridges */}
            <line x1="20" y1="58" x2="50" y2="48" stroke="hsl(var(--border))" strokeWidth="0.4" />
            <line x1="80" y1="58" x2="50" y2="48" stroke="hsl(var(--border))" strokeWidth="0.4" />

            {/* Sella turcica */}
            <ellipse cx="50" cy="40" rx="5" ry="3" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="1 0.5" />
            <text x="50" y="41" textAnchor="middle" fontSize="1.6" fill="hsl(var(--muted-foreground))" opacity="0.5">Sella</text>

            {/* Clivus */}
            <line x1="47" y1="43" x2="47" y2="55" stroke="hsl(var(--border))" strokeWidth="0.25" opacity="0.4" />
            <line x1="53" y1="43" x2="53" y2="55" stroke="hsl(var(--border))" strokeWidth="0.25" opacity="0.4" />

            {/* Foramen magnum outline */}
            <ellipse cx="50" cy="74" rx="8" ry="6" fill="none" stroke="hsl(155,60%,50%)" strokeWidth="0.4" opacity="0.5" />

            {/* Foramen dots and labels */}
            {visibleForamina.map(f => {
              const isSelected = selected === f.id;
              const color = fossaColors[f.fossa].fill;
              // Skip the duplicate optic canal R for label rendering
              const showLabel = f.id !== "optic-canal-r";

              return (
                <g key={f.id} onClick={() => f.contents && setSelected(isSelected ? null : f.id)} className={f.contents ? "cursor-pointer" : ""}>
                  {/* Dot */}
                  <circle
                    cx={f.cx}
                    cy={f.cy}
                    r={isSelected ? 1.8 : 1.2}
                    fill={isSelected ? color : "transparent"}
                    stroke={color}
                    strokeWidth={isSelected ? 0.5 : 0.35}
                  />
                  {isSelected && (
                    <circle cx={f.cx} cy={f.cy} r="3" fill={color} fillOpacity="0.15" />
                  )}
                  {/* Label line + text */}
                  {showLabel && f.labelAnchor && (
                    <>
                      <line
                        x1={f.cx}
                        y1={f.cy}
                        x2={f.labelX}
                        y2={f.labelY}
                        stroke={color}
                        strokeWidth="0.15"
                        opacity={isSelected ? 0.8 : 0.4}
                      />
                      <text
                        x={f.labelX}
                        y={f.labelY}
                        textAnchor={f.labelAnchor}
                        fontSize={isSelected ? "2" : "1.7"}
                        fill={isSelected ? color : "hsl(var(--muted-foreground))"}
                        fontWeight={isSelected ? 700 : 400}
                        opacity={isSelected ? 1 : 0.7}
                      >
                        {f.name}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected foramen detail */}
        {selectedForamen && (
          <div className={`mt-4 p-4 rounded-lg border ${fossaColors[selectedForamen.fossa].border} ${fossaColors[selectedForamen.fossa].bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-sm">{selectedForamen.name}</h3>
              <Badge variant="outline" className={`text-xs ${fossaColors[selectedForamen.fossa].text}`}>
                {fossaLabels[selectedForamen.fossa]}
              </Badge>
            </div>
            <div className="space-y-1 mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Structures passing through:</p>
              {selectedForamen.contents.map((c, i) => (
                <p key={i} className="text-sm text-foreground flex items-start gap-1.5">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  {c}
                </p>
              ))}
            </div>
            {selectedForamen.clinicalNote && (
              <div className="mt-3 pt-2 border-t border-border/50">
                <p className="text-xs font-medium text-amber-400 mb-1">⚠ Clinical Relevance</p>
                <p className="text-sm text-muted-foreground">{selectedForamen.clinicalNote}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick reference table */}
        {!selectedForamen && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1.5 text-foreground font-semibold">Foramen</th>
                  <th className="text-left py-1.5 text-foreground font-semibold">Key Contents</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {uniqueForamina.map(f => (
                  <tr
                    key={f.id}
                    className="border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setSelected(f.id)}
                  >
                    <td className={`py-1.5 font-medium ${fossaColors[f.fossa].text}`}>{f.name}</td>
                    <td className="py-1.5">{f.contents.join("; ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkullBaseDiagram;
