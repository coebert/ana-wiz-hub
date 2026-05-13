import { useState } from "react";

type Location = "supraspinal" | "spinal" | "peripheral" | "overview";

const locations: { id: Location; label: string; color: string }[] = [
  { id: "overview", label: "Overview", color: "hsl(var(--primary))" },
  { id: "supraspinal", label: "Supraspinal", color: "#8b5cf6" },
  { id: "spinal", label: "Spinal Cord", color: "#3b82f6" },
  { id: "peripheral", label: "Peripheral", color: "#10b981" },
];

const receptorData = {
  supraspinal: {
    title: "Supraspinal (Brain)",
    regions: [
      {
        name: "Periaqueductal Grey (PAG)",
        receptors: "µ > κ > δ",
        function: "Descending inhibition of pain; activates OFF-cells in RVM",
      },
      {
        name: "Rostral Ventromedial Medulla (RVM)",
        receptors: "µ, κ",
        function: "Modulates descending facilitation/inhibition of dorsal horn",
      },
      {
        name: "Thalamus",
        receptors: "µ, κ",
        function: "Relay and gating of ascending nociceptive signals",
      },
      {
        name: "Limbic System (amygdala, NAc)",
        receptors: "µ > δ",
        function: "Affective/emotional component of pain, reward, euphoria, dependence",
      },
      {
        name: "Cortex (ACC, insular)",
        receptors: "µ, δ",
        function: "Pain perception, suffering; cognitive modulation",
      },
      {
        name: "Chemoreceptor Trigger Zone",
        receptors: "µ, δ",
        function: "Nausea and vomiting",
      },
      {
        name: "Brainstem respiratory centres",
        receptors: "µ (primary)",
        function: "Respiratory depression — ↓ CO₂ sensitivity of pre-Bötzinger complex",
      },
      {
        name: "Edinger-Westphal nucleus",
        receptors: "µ",
        function: "Miosis (parasympathetic stimulation of pupil constriction)",
      },
    ],
  },
  spinal: {
    title: "Spinal Cord (Dorsal Horn)",
    regions: [
      {
        name: "Substantia Gelatinosa (Lamina II)",
        receptors: "µ (70%), δ, κ",
        function: "Pre- & post-synaptic inhibition of Aδ and C fibre nociceptive transmission",
      },
      {
        name: "Presynaptic (C fibre terminals)",
        receptors: "µ, δ, κ",
        function: "↓ Ca²⁺ influx → ↓ substance P and glutamate release from primary afferents",
      },
      {
        name: "Postsynaptic (projection neurones)",
        receptors: "µ, δ",
        function: "Opens K⁺ channels → hyperpolarisation → ↓ ascending signal transmission",
      },
      {
        name: "Interneurones",
        receptors: "κ > µ",
        function: "Modulation of local spinal circuits; κ-mediated spinal analgesia",
      },
    ],
  },
  peripheral: {
    title: "Peripheral Sites",
    regions: [
      {
        name: "Primary afferent nociceptors (DRG)",
        receptors: "µ, δ, κ",
        function: "Receptors synthesised in DRG, transported to peripheral terminals. Upregulated in inflammation",
      },
      {
        name: "Inflamed tissue",
        receptors: "µ, δ, κ",
        function: "Peripheral analgesia — enhanced by acidic pH and inflammation (disrupted perineurium, ↑ receptor expression)",
      },
      {
        name: "GI tract (myenteric / submucosal plexus)",
        receptors: "µ (primary), κ, δ",
        function: "↓ peristalsis, ↑ sphincter tone, ↓ secretions → constipation",
      },
      {
        name: "Immune cells",
        receptors: "µ, δ, κ",
        function: "Endogenous opioid release (β-endorphin) from leukocytes in inflamed tissue provides local analgesia",
      },
    ],
  },
};

const receptorTypes = [
  {
    name: "µ (MOP)",
    subtypes: "µ₁, µ₂",
    endogenous: "β-endorphin, endomorphin-1 & -2",
    effects: "Supraspinal analgesia (µ₁), spinal analgesia, respiratory depression (µ₂), euphoria, dependence, miosis, ↓GI motility, bradycardia",
    color: "#ef4444",
  },
  {
    name: "κ (KOP)",
    subtypes: "κ₁, κ₂, κ₃",
    endogenous: "Dynorphin A & B",
    effects: "Spinal analgesia, sedation, dysphoria, diuresis (↓ADH), miosis. Minimal respiratory depression",
    color: "#f59e0b",
  },
  {
    name: "δ (DOP)",
    subtypes: "δ₁, δ₂",
    endogenous: "Enkephalins (met- & leu-)",
    effects: "Spinal & supraspinal analgesia, modulates µ function, anxiolysis. May contribute to respiratory depression",
    color: "#3b82f6",
  },
  {
    name: "NOP (ORL-1)",
    subtypes: "—",
    endogenous: "Nociceptin / orphanin FQ",
    effects: "Complex: supraspinal anti-opioid (hyperalgesia), spinal analgesia. Anxiolysis. Does not bind classical opioids",
    color: "#8b5cf6",
  },
];

const OpioidReceptorDiagram = () => {
  const [selected, setSelected] = useState<Location>("overview");

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              selected === loc.id
                ? "text-primary-foreground border-transparent shadow-sm"
                : "text-muted-foreground border-border hover:border-primary/40 bg-card"
            }`}
            style={selected === loc.id ? { backgroundColor: loc.color } : {}}
          >
            {loc.label}
          </button>
        ))}
      </div>

      {/* Overview: receptor subtypes table */}
      {selected === "overview" && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Opioid Receptor Subtypes & Signal Transduction</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2.5 font-semibold text-foreground">Receptor</th>
                  <th className="text-left p-2.5 font-semibold text-foreground">Subtypes</th>
                  <th className="text-left p-2.5 font-semibold text-foreground">Endogenous Ligand</th>
                  <th className="text-left p-2.5 font-semibold text-foreground">Key Effects</th>
                </tr>
              </thead>
              <tbody>
                {receptorTypes.map((r) => (
                  <tr key={r.name} className="border-t border-border">
                    <td className="p-2.5 font-medium text-foreground whitespace-nowrap">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-1.5"
                        style={{ backgroundColor: r.color }}
                      />
                      {r.name}
                    </td>
                    <td className="p-2.5 text-muted-foreground">{r.subtypes}</td>
                    <td className="p-2.5 text-muted-foreground">{r.endogenous}</td>
                    <td className="p-2.5 text-muted-foreground">{r.effects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signal transduction summary */}
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Common Signal Transduction (All Gi/Go coupled)</h4>
            <svg viewBox="0 0 700 60" className="w-full">
              {[
                { x: 0, w: 100, label: "Agonist binds" },
                { x: 120, w: 100, label: "Gi/Go activation" },
                { x: 240, w: 90, label: "↓ cAMP" },
                { x: 350, w: 120, label: "Opens K⁺ channels" },
                { x: 490, w: 130, label: "Closes Ca²⁺ channels" },
                { x: 640, w: 55, label: "↓ NT release" },
              ].map((step, i, arr) => (
                <g key={i}>
                  <rect
                    x={step.x}
                    y={10}
                    width={step.w}
                    height={36}
                    rx={6}
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                  />
                  <text
                    x={step.x + step.w / 2}
                    y={32}
                    textAnchor="middle"
                    className="fill-foreground"
                    fontSize={9}
                    fontWeight={500}
                  >
                    {step.label}
                  </text>
                  {i < arr.length - 1 && (
                    <path
                      d={`M${step.x + step.w + 4},28 L${arr[i + 1].x - 4},28`}
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1.5}
                      markerEnd="url(#arrowM)"
                    />
                  )}
                </g>
              ))}
              <defs>
                <marker id="arrowM" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Anatomical overview SVG */}
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Receptor Distribution — Anatomical Overview</h4>
            <svg viewBox="0 0 600 320" className="w-full">
              {/* Brain outline */}
              <ellipse cx={300} cy={70} rx={140} ry={55} fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth={1.5} />
              <text x={300} y={40} textAnchor="middle" fontSize={11} fontWeight={600} fill="hsl(var(--primary))">Supraspinal</text>
              <text x={300} y={58} textAnchor="middle" fontSize={8} className="fill-muted-foreground">PAG · RVM · Thalamus · Limbic · Cortex · CTZ</text>
              <text x={300} y={72} textAnchor="middle" fontSize={8} className="fill-muted-foreground">µ &gt; κ &gt; δ — analgesia, resp depression, euphoria</text>
              <text x={300} y={86} textAnchor="middle" fontSize={7} className="fill-muted-foreground">Edinger-Westphal (µ → miosis) · pre-Bötzinger (µ → resp dep)</text>

              {/* Spinal cord */}
              <rect x={270} y={130} width={60} height={80} rx={10} fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth={1.5} />
              <text x={300} y={148} textAnchor="middle" fontSize={11} fontWeight={600} fill="hsl(var(--primary))">Spinal</text>
              <text x={300} y={163} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">Dorsal horn</text>
              <text x={300} y={176} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">Lamina II (SG)</text>
              <text x={300} y={189} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">µ 70%, δ, κ</text>
              <text x={300} y={202} textAnchor="middle" fontSize={7} className="fill-muted-foreground">Pre & post-synaptic</text>

              {/* Connection line brain → cord */}
              <line x1={300} y1={125} x2={300} y2={130} stroke="hsl(var(--border))" strokeWidth={1.5} />

              {/* Peripheral - left */}
              <rect x={40} y={230} width={200} height={70} rx={10} fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth={1.5} />
              <text x={140} y={250} textAnchor="middle" fontSize={11} fontWeight={600} fill="hsl(var(--clinical))">Peripheral</text>
              <text x={140} y={266} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">Nociceptor terminals (DRG)</text>
              <text x={140} y={279} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">Inflamed tissue: ↑ receptor expression</text>
              <text x={140} y={292} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">µ, δ, κ — peripheral analgesia</text>

              {/* GI - right */}
              <rect x={360} y={230} width={200} height={70} rx={10} fill="hsl(var(--clinical))" stroke="hsl(var(--clinical))" strokeWidth={1.5} />
              <text x={460} y={250} textAnchor="middle" fontSize={11} fontWeight={600} fill="hsl(var(--clinical))">GI Tract</text>
              <text x={460} y={266} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">Myenteric & submucosal plexus</text>
              <text x={460} y={279} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">µ (primary) — ↓ peristalsis</text>
              <text x={460} y={292} textAnchor="middle" fontSize={7.5} className="fill-muted-foreground">↑ sphincter tone, ↓ secretions</text>

              {/* Connection lines */}
              <path d="M280,210 Q200,220 200,230" stroke="hsl(var(--border))" strokeWidth={1} fill="none" />
              <path d="M320,210 Q400,220 400,230" stroke="hsl(var(--border))" strokeWidth={1} fill="none" />
            </svg>
          </div>
        </div>
      )}

      {/* Location detail panels */}
      {selected !== "overview" && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {receptorData[selected].title}
          </h3>
          <div className="space-y-2">
            {receptorData[selected].regions.map((region, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{region.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{region.function}</p>
                  </div>
                  <span
                    className="shrink-0 text-xs font-mono px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: locations.find((l) => l.id === selected)?.color,
                      color: locations.find((l) => l.id === selected)?.color,
                      backgroundColor: `${locations.find((l) => l.id === selected)?.color}15`,
                    }}
                  >
                    {region.receptors}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpioidReceptorDiagram;
