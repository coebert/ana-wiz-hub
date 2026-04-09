import { useState } from "react";

interface Foramen {
  id: string;
  label: string;
  x: number;
  y: number;
  rx: number;
  ry: number;
  contents: string;
  clinical: string;
  fossa: "anterior" | "middle" | "posterior";
}

const foramina: Foramen[] = [
  { id: "cribriform", label: "Cribriform Plate", x: 300, y: 95, rx: 30, ry: 8, contents: "CN I (Olfactory nerves)", clinical: "CSF rhinorrhoea in anterior skull base fractures. Contraindication to nasogastric tube insertion.", fossa: "anterior" },
  { id: "optic-canal-l", label: "Optic Canal", x: 260, y: 155, rx: 10, ry: 8, contents: "CN II (Optic nerve), Ophthalmic artery", clinical: "Raised ICP → papilloedema. Pupil response used to assess brainstem function.", fossa: "middle" },
  { id: "optic-canal-r", label: "Optic Canal", x: 340, y: 155, rx: 10, ry: 8, contents: "CN II (Optic nerve), Ophthalmic artery", clinical: "Raised ICP → papilloedema. Pupil response used to assess brainstem function.", fossa: "middle" },
  { id: "sof-l", label: "Superior Orbital Fissure", x: 240, y: 170, rx: 16, ry: 6, contents: "CN III, IV, V₁ (ophthalmic), VI, Ophthalmic veins", clinical: "Orbital apex syndrome — all eye movement lost. V₁ blocked in trigeminal nerve blocks.", fossa: "middle" },
  { id: "sof-r", label: "Superior Orbital Fissure", x: 360, y: 170, rx: 16, ry: 6, contents: "CN III, IV, V₁ (ophthalmic), VI, Ophthalmic veins", clinical: "Orbital apex syndrome — all eye movement lost. V₁ blocked in trigeminal nerve blocks.", fossa: "middle" },
  { id: "rotundum-l", label: "Foramen Rotundum", x: 248, y: 200, rx: 8, ry: 8, contents: "CN V₂ (Maxillary nerve)", clinical: "Maxillary nerve block for mid-face surgery. Exits into pterygopalatine fossa.", fossa: "middle" },
  { id: "rotundum-r", label: "Foramen Rotundum", x: 352, y: 200, rx: 8, ry: 8, contents: "CN V₂ (Maxillary nerve)", clinical: "Maxillary nerve block for mid-face surgery. Exits into pterygopalatine fossa.", fossa: "middle" },
  { id: "ovale-l", label: "Foramen Ovale", x: 235, y: 230, rx: 10, ry: 7, contents: "CN V₃ (Mandibular nerve), Accessory meningeal artery", clinical: "Mandibular nerve block for jaw surgery. V₃ also carries motor fibres to muscles of mastication.", fossa: "middle" },
  { id: "ovale-r", label: "Foramen Ovale", x: 365, y: 230, rx: 10, ry: 7, contents: "CN V₃ (Mandibular nerve), Accessory meningeal artery", clinical: "Mandibular nerve block for jaw surgery. V₃ also carries motor fibres to muscles of mastication.", fossa: "middle" },
  { id: "spinosum-l", label: "Foramen Spinosum", x: 222, y: 243, rx: 6, ry: 6, contents: "Middle meningeal artery, Meningeal branch of V₃", clinical: "Rupture → extradural haematoma. Lucid interval then rapid deterioration. Temporal bone fracture.", fossa: "middle" },
  { id: "spinosum-r", label: "Foramen Spinosum", x: 378, y: 243, rx: 6, ry: 6, contents: "Middle meningeal artery, Meningeal branch of V₃", clinical: "Rupture → extradural haematoma. Lucid interval then rapid deterioration. Temporal bone fracture.", fossa: "middle" },
  { id: "iam-l", label: "Internal Acoustic Meatus", x: 230, y: 290, rx: 10, ry: 7, contents: "CN VII (Facial), CN VIII (Vestibulocochlear), Labyrinthine artery", clinical: "Facial nerve monitoring during acoustic neuroma surgery. VII wraps around VIII in the meatus.", fossa: "posterior" },
  { id: "iam-r", label: "Internal Acoustic Meatus", x: 370, y: 290, rx: 10, ry: 7, contents: "CN VII (Facial), CN VIII (Vestibulocochlear), Labyrinthine artery", clinical: "Facial nerve monitoring during acoustic neuroma surgery. VII wraps around VIII in the meatus.", fossa: "posterior" },
  { id: "jugular-l", label: "Jugular Foramen", x: 222, y: 330, rx: 12, ry: 9, contents: "CN IX (Glossopharyngeal), CN X (Vagus), CN XI (Accessory), IJV", clinical: "IX → gag reflex afferent, glossopharyngeal nerve block for awake intubation. X → all laryngeal innervation. XI → SCM/trapezius.", fossa: "posterior" },
  { id: "jugular-r", label: "Jugular Foramen", x: 378, y: 330, rx: 12, ry: 9, contents: "CN IX (Glossopharyngeal), CN X (Vagus), CN XI (Accessory), IJV", clinical: "IX → gag reflex afferent, glossopharyngeal nerve block for awake intubation. X → all laryngeal innervation. XI → SCM/trapezius.", fossa: "posterior" },
  { id: "hypoglossal-l", label: "Hypoglossal Canal", x: 260, y: 360, rx: 8, ry: 6, contents: "CN XII (Hypoglossal nerve)", clinical: "Tongue deviation towards lesion side. At risk during carotid endarterectomy — test post-op.", fossa: "posterior" },
  { id: "hypoglossal-r", label: "Hypoglossal Canal", x: 340, y: 360, rx: 8, ry: 6, contents: "CN XII (Hypoglossal nerve)", clinical: "Tongue deviation towards lesion side. At risk during carotid endarterectomy — test post-op.", fossa: "posterior" },
  { id: "foramen-magnum", label: "Foramen Magnum", x: 300, y: 380, rx: 35, ry: 22, contents: "Brainstem/Spinal cord, Vertebral arteries, CN XI (spinal root), Anterior/Posterior spinal arteries", clinical: "Tonsillar herniation (coning) through foramen magnum → cardiorespiratory arrest. Arnold-Chiari malformation.", fossa: "posterior" },
];

const fossaColors = {
  anterior: "hsl(var(--anatomy))",
  middle: "hsl(210 70% 55%)",
  posterior: "hsl(280 50% 55%)",
};

const SkullBaseDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedForamen = foramina.find(f => f.id === selected);
  const displayForamen = selectedForamen || null;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3 text-center">Internal Surface of Skull Base — Cranial Nerve Foramina</h4>

        <div className="flex flex-wrap gap-4 justify-center mb-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: fossaColors.anterior, opacity: 0.5 }} /> Anterior Fossa</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: fossaColors.middle, opacity: 0.5 }} /> Middle Fossa</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: fossaColors.posterior, opacity: 0.5 }} /> Posterior Fossa</span>
        </div>

        <svg viewBox="0 0 600 470" className="w-full max-w-lg mx-auto">
          <ellipse cx={300} cy={235} rx={220} ry={220} fill="none" stroke="hsl(var(--border))" strokeWidth={2} />

          {/* Anterior fossa */}
          <path d="M140,160 Q200,60 300,55 Q400,60 460,160 L380,180 Q300,140 220,180 Z" fill={fossaColors.anterior} opacity={0.08} stroke={fossaColors.anterior} strokeWidth={0.5} strokeDasharray="4,3" />
          <text x={300} y={80} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">ANTERIOR CRANIAL FOSSA</text>

          {/* Middle fossa */}
          <path d="M140,160 L220,180 Q300,140 380,180 L460,160 L460,270 Q380,260 300,265 Q220,260 140,270 Z" fill={fossaColors.middle} opacity={0.08} stroke={fossaColors.middle} strokeWidth={0.5} strokeDasharray="4,3" />
          <text x={165} y={220} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">MIDDLE</text>
          <text x={435} y={220} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">MIDDLE</text>

          {/* Posterior fossa */}
          <path d="M140,270 Q220,260 300,265 Q380,260 460,270 Q460,400 300,450 Q140,400 140,270 Z" fill={fossaColors.posterior} opacity={0.08} stroke={fossaColors.posterior} strokeWidth={0.5} strokeDasharray="4,3" />
          <text x={300} y={435} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">POSTERIOR CRANIAL FOSSA</text>

          {/* Crista galli */}
          <line x1={300} y1={70} x2={300} y2={110} stroke="hsl(var(--border))" strokeWidth={1.5} />
          <text x={300} y={120} textAnchor="middle" className="text-[8px] fill-muted-foreground">Crista galli</text>

          {/* Sella turcica */}
          <rect x={280} y={190} width={40} height={20} rx={4} fill="none" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3,2" />
          <text x={300} y={225} textAnchor="middle" className="text-[8px] fill-muted-foreground">Sella turcica</text>

          {/* Petrous ridge */}
          <line x1={200} y1={270} x2={290} y2={265} stroke="hsl(var(--border))" strokeWidth={1} />
          <line x1={400} y1={270} x2={310} y2={265} stroke="hsl(var(--border))" strokeWidth={1} />

          {/* Foramina */}
          {foramina.map(f => {
            const isSelected = selected === f.id || (displayForamen && displayForamen.label === f.label && selected !== null);
            const color = fossaColors[f.fossa];
            return (
              <g key={f.id} onClick={() => setSelected(selected === f.id ? null : f.id)} className="cursor-pointer">
                <ellipse cx={f.x} cy={f.y} rx={f.rx} ry={f.ry} fill={isSelected ? color : "hsl(var(--foreground))"} opacity={isSelected ? 0.7 : 0.15} stroke={isSelected ? color : "hsl(var(--foreground))"} strokeWidth={isSelected ? 2 : 1} />
                {!f.id.endsWith("-r") && (
                  <text x={f.id.endsWith("-l") ? f.x - f.rx - 4 : f.x} y={f.y - f.ry - 4} textAnchor={f.id.endsWith("-l") ? "end" : "middle"} className="text-[8px] fill-foreground font-medium" style={{ pointerEvents: "none" }}>
                    {f.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="mt-4 min-h-[80px]">
          {displayForamen ? (
            <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5">
              <p className="font-semibold text-foreground text-sm">{displayForamen.label}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Contents:</span> {displayForamen.contents}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Clinical:</span> {displayForamen.clinical}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">Tap a foramen to see its contents and clinical relevance</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkullBaseDiagram;
