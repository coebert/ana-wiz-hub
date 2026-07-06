import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface OrbitalStructure {
  id: string;
  label: string;
  nerve: string;
  action: string;
  clinical: string;
  path: string;
  color: string;
}

const muscles: OrbitalStructure[] = [
  {
    id: "sr", label: "Superior Rectus", nerve: "CN III (Oculomotor) — superior division",
    action: "Elevation, intorsion, adduction", clinical: "CN III palsy → eye 'down and out', ptosis, mydriasis.",
    path: "M300,160 L300,100 L340,80 L260,80 Z", color: "hsl(0 70% 55%)"
  },
  {
    id: "ir", label: "Inferior Rectus", nerve: "CN III (Oculomotor) — inferior division",
    action: "Depression, extorsion, adduction", clinical: "Most commonly trapped in orbital floor blow-out fractures → diplopia on upgaze.",
    path: "M300,340 L300,400 L340,420 L260,420 Z", color: "hsl(25 80% 55%)"
  },
  {
    id: "mr", label: "Medial Rectus", nerve: "CN III (Oculomotor) — inferior division",
    action: "Adduction", clinical: "Tested by convergence. Failure → lateral deviation (exotropia). Most powerful extraocular muscle.",
    path: "M200,250 L140,250 L130,270 L130,230 Z", color: "hsl(120 50% 45%)"
  },
  {
    id: "lr", label: "Lateral Rectus", nerve: "CN VI (Abducens)",
    action: "Abduction", clinical: "CN VI has longest intracranial course — vulnerable to raised ICP. Palsy → convergent squint (esotropia).",
    path: "M400,250 L460,250 L470,270 L470,230 Z", color: "hsl(210 70% 55%)"
  },
  {
    id: "so", label: "Superior Oblique", nerve: "CN IV (Trochlear)",
    action: "Intorsion, depression (in adduction), abduction", clinical: "CN IV palsy → head tilt to opposite side (compensatory). Test: depression in adduction (looking down and in).",
    path: "M230,170 L180,120 L160,130 L220,185 Z", color: "hsl(280 55% 55%)"
  },
  {
    id: "io", label: "Inferior Oblique", nerve: "CN III (Oculomotor) — inferior division",
    action: "Extorsion, elevation (in adduction), abduction", clinical: "Only extraocular muscle originating from anterior orbit (maxillary bone). Overaction common in childhood squints.",
    path: "M230,330 L180,380 L160,370 L220,315 Z", color: "hsl(330 60% 55%)"
  },
  {
    id: "lps", label: "Levator Palpebrae Superioris", nerve: "CN III (Oculomotor) — superior division + sympathetic (Müller's muscle)",
    action: "Elevates upper eyelid", clinical: "CN III palsy → complete ptosis. Horner's syndrome → partial ptosis (loss of Müller's muscle tone only).",
    path: "M240,135 L360,135 L350,148 L250,148 Z", color: "hsl(45 80% 50%)"
  },
];

const otherStructures = [
  { id: "optic", label: "Optic Nerve (CN II)", desc: "Passes through optic canal with ophthalmic artery. Surrounded by meninges and CSF — raised ICP → papilloedema." },
  { id: "ophthalmic-a", label: "Ophthalmic Artery", desc: "Branch of ICA. Enters orbit through optic canal. Branches: central retinal, lacrimal, posterior ciliary arteries." },
  { id: "sof-contents", label: "Superior Orbital Fissure", desc: "Transmits CN III, IV, V₁ (lacrimal, frontal, nasociliary), VI, and superior ophthalmic vein. Annulus of Zinn divides contents." },
  { id: "ciliary", label: "Ciliary Ganglion", desc: "Parasympathetic relay (CN III → Edinger-Westphal). Post-ganglionic short ciliary nerves → sphincter pupillae (constriction) and ciliary muscle (accommodation)." },
];

const OrbitAnatomyDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showOther, setShowOther] = useState<string | null>(null);
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const selectedMuscle = muscles.find(m => m.id === selected);

  return (
    <DiagramFigure
      id="orbit-anatomy-diagram"
      title="Orbit anatomy"
      description="Auto-generated wrapper for the Orbit anatomy anatomical diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Orbit — Extraocular Muscles & Nerve Supply (Anterior View)"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures(v => !v) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels(v => !v) },
            ]}
          />
  
          <svg viewBox="0 0 600 500" className="w-full max-w-lg mx-auto">
            {/* Orbital rim */}
            <ellipse cx={300} cy={250} rx={150} ry={130} fill="none" stroke="hsl(var(--border))" strokeWidth={2} />
            {showLabels && (
              <>
                <text x={300} y={30} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">SUPERIOR</text>
                <text x={300} y={490} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">INFERIOR</text>
                <text x={90} y={255} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">MEDIAL</text>
                <text x={510} y={255} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">LATERAL</text>
              </>
            )}
  
            {/* Globe */}
            <circle cx={300} cy={250} r={65} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={1.5} opacity={0.3} />
            {/* Iris */}
            <circle cx={300} cy={250} r={22} fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} opacity={0.4} />
            {/* Pupil */}
            <circle cx={300} cy={250} r={10} fill="hsl(var(--foreground))" opacity={0.2} />
  
            {/* Optic nerve */}
            <line x1={300} y1={315} x2={300} y2={460} stroke="hsl(var(--foreground))" strokeWidth={3} opacity={0.2} />
            {showLabels && (
              <text x={315} y={445} className="text-[8px] fill-muted-foreground">CN II</text>
            )}
  
            {/* Muscles */}
            {muscles.map(m => {
              const isSelected = selected === m.id;
              return (
                    <g key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)} className="cursor-pointer">
                  <path d={m.path} fill={m.color} opacity={isSelected ? 0.8 : 0.25} stroke={m.color} strokeWidth={isSelected ? 2 : 1} />
                </g>
    );
            })}
  
            {/* Muscle labels */}
            {showLabels && (
              <>
                <text x={300} y={70} textAnchor="middle" className="text-[9px] fill-foreground font-medium cursor-pointer" onClick={() => setSelected(selected === "sr" ? null : "sr")}>Superior Rectus</text>
                <text x={300} y={445} textAnchor="middle" className="text-[9px] fill-foreground font-medium cursor-pointer" onClick={() => setSelected(selected === "ir" ? null : "ir")}>Inferior Rectus</text>
                <text x={120} y={245} textAnchor="middle" className="text-[9px] fill-foreground font-medium cursor-pointer" onClick={() => setSelected(selected === "mr" ? null : "mr")}>Medial Rectus</text>
                <text x={490} y={245} textAnchor="middle" className="text-[9px] fill-foreground font-medium cursor-pointer" onClick={() => setSelected(selected === "lr" ? null : "lr")}>Lateral Rectus</text>
                <text x={155} y={115} textAnchor="middle" className="text-[9px] fill-foreground font-medium cursor-pointer" onClick={() => setSelected(selected === "so" ? null : "so")}>Sup. Oblique</text>
                <text x={155} y={390} textAnchor="middle" className="text-[9px] fill-foreground font-medium cursor-pointer" onClick={() => setSelected(selected === "io" ? null : "io")}>Inf. Oblique</text>
                <text x={300} y={128} textAnchor="middle" className="text-[8px] fill-foreground cursor-pointer" opacity={0.7} onClick={() => setSelected(selected === "lps" ? null : "lps")}>LPS</text>
              </>
            )}
  
            {/* Nerve colour key in SVG */}
            {showSutures && (
              <>
                <rect x={20} y={450} width={8} height={8} rx={1} fill="hsl(210 70% 55%)" opacity={0.7} />
                <text x={32} y={457} className="text-[7px] fill-muted-foreground">CN VI (LR6)</text>
                <rect x={20} y={462} width={8} height={8} rx={1} fill="hsl(280 55% 55%)" opacity={0.7} />
                <text x={32} y={469} className="text-[7px] fill-muted-foreground">CN IV (SO4)</text>
                <rect x={20} y={474} width={8} height={8} rx={1} fill="hsl(0 70% 55%)" opacity={0.7} />
                <text x={32} y={481} className="text-[7px] fill-muted-foreground">CN III (rest)</text>
              </>
            )}
  
            {/* Trochlea label */}
            {showSutures && (
              <>
                <circle cx={175} cy={135} r={4} fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} opacity={0.4} />
                {showLabels && (
                  <text x={175} y={150} textAnchor="middle" className="text-[7px] fill-muted-foreground italic">trochlea</text>
                )}
              </>
            )}
          </svg>
  
          {/* Mnemonic */}
          <p className="text-xs text-center text-muted-foreground mt-2 italic">"LR6 SO4 — all the Rest III" — Lateral Rectus = CN VI, Superior Oblique = CN IV, all others = CN III</p>
  
          {/* Selected muscle info */}
          <div className="mt-4 min-h-[80px]">
            {selectedMuscle ? (
              <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5">
                <p className="font-semibold text-foreground text-sm" style={{ color: selectedMuscle.color }}>{selectedMuscle.label}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Nerve:</span> {selectedMuscle.nerve}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Action:</span> {selectedMuscle.action}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Clinical:</span> {selectedMuscle.clinical}</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center italic">Tap a muscle to see its nerve supply, action, and clinical relevance</p>
            )}
          </div>
  
          {/* Other orbital structures */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-foreground">Other Orbital Structures</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {otherStructures.map(s => (
                <div key={s.id} onClick={() => setShowOther(showOther === s.id ? null : s.id)} className="cursor-pointer p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <p className="text-xs font-medium text-foreground">{s.label}</p>
                  {showOther === s.id && <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default OrbitAnatomyDiagram;
