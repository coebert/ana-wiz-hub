import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type TabKey = "structural" | "geometric" | "optical" | "tautomer";

interface TabConfig {
  key: TabKey;
  label: string;
  example: string;
}

const tabs: TabConfig[] = [
  { key: "structural", label: "Structural", example: "Enflurane vs Isoflurane" },
  { key: "geometric", label: "Geometric (cis/trans)", example: "Atracurium" },
  { key: "optical", label: "Optical (enantiomers)", example: "Ketamine R(−) / S(+)" },
  { key: "tautomer", label: "Tautomerism", example: "Thiopentone keto/enol" },
];

const IsomerismDiagram = () => {
  const [tab, setTab] = useState<TabKey>("optical");
  const [mirrorHover, setMirrorHover] = useState(false);

  return (
        <div className="border border-border rounded-lg p-4 mb-6 bg-card">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Isomerism in Anaesthetic Drugs
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Same molecular formula, different arrangements — and dramatically different pharmacology
      </p>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              tab === t.key
                ? "bg-chemistry text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-secondary/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Diagram + clinical panel */}
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 items-start">
        <div className="border border-border rounded-md bg-gradient-to-b from-background to-secondary/20 p-3 overflow-x-auto">
          {tab === "structural" && <StructuralPanel />}
          {tab === "geometric" && <GeometricPanel />}
          {tab === "optical" && <OpticalPanel mirrorHover={mirrorHover} setMirrorHover={setMirrorHover} />}
          {tab === "tautomer" && <TautomerPanel />}
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-xs font-semibold text-foreground mb-1">
              {tabs.find((t) => t.key === tab)?.label} — {tabs.find((t) => t.key === tab)?.example}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tab === "structural" &&
                "Enflurane and isoflurane share the same molecular formula (C₂HClF₅O) but the atoms are connected differently. Result: isoflurane has lower blood:gas solubility (1.4 vs 1.8), faster onset/offset, and far less epileptogenic potential."}
              {tab === "geometric" &&
                "Atracurium has 4 chiral centres and 2 geometric (cis/trans) configurations → 10 stereoisomers in the racemic mixture. Cisatracurium is the single 1R-cis, 1′R-cis isomer — 4× more potent, less histamine release, no laudanosine accumulation."}
              {tab === "optical" &&
                "Enantiomers are non-superimposable mirror images at a chiral carbon (4 different groups). They have identical physical properties EXCEPT the direction they rotate plane-polarised light. Biological receptors are chiral, so enantiomers can have very different potency, toxicity, and side-effect profiles."}
              {tab === "tautomer" &&
                "Thiopentone exists as keto (stable, white powder) and enol (water-soluble, yellow) tautomers in equilibrium. The enol form predominates in alkaline solution (pH 10.5) — that's why the reconstituted drug is yellow and why mixing with acidic drugs (e.g. rocuronium) causes precipitation."}
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-chemistry/5">
            <p className="text-xs font-semibold text-foreground mb-1.5">Clinical examples</p>
            <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
              {tab === "structural" && (
                <>
                  <li>• <strong>Enflurane vs isoflurane</strong> — same formula, different ether linkage</li>
                  <li>• <strong>Diethyl ether vs butanol</strong> — C₄H₁₀O isomers, very different boiling points</li>
                </>
              )}
              {tab === "geometric" && (
                <>
                  <li>• <strong>Cisatracurium</strong> — 1 of 10 atracurium isomers, used as a single agent</li>
                  <li>• <strong>Mivacurium</strong> — 3 stereoisomers, two active (cis-trans + trans-trans)</li>
                </>
              )}
              {tab === "optical" && (
                <>
                  <li>• <strong>Ketamine</strong>: S(+) ~4× more potent for analgesia/anaesthesia, fewer emergence reactions than R(−)</li>
                  <li>• <strong>Bupivacaine → levobupivacaine</strong>: S(−) isomer alone, less cardiotoxic than racemic mix</li>
                  <li>• <strong>Ropivacaine</strong>: pure S(−) isomer by design</li>
                  <li>• <strong>Isoflurane, desflurane, sevoflurane</strong>: chiral but used as racemates (no clinical difference)</li>
                </>
              )}
              {tab === "tautomer" && (
                <>
                  <li>• <strong>Thiopentone</strong> — keto (insoluble) ⇌ enol/thiol (soluble Na⁺ salt)</li>
                  <li>• <strong>Midazolam</strong> — open-ring (water-soluble at pH&lt;4) ⇌ closed-ring (lipid-soluble at pH 7.4) — not strict tautomerism but analogous pH-dependent equilibrium</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Sub-panels ---------- */

const StructuralPanel = () => (
  <svg viewBox="0 0 460 220" className="w-full h-auto">
    <text x="115" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">Enflurane</text>
    <text x="115" y="32" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">CHF₂–O–CF₂–CHFCl</text>
    {/* Enflurane skeletal */}
    <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
      <line x1="40" y1="100" x2="80" y2="80" />
      <line x1="80" y1="80" x2="120" y2="100" />
      <line x1="120" y1="100" x2="160" y2="80" />
      <line x1="160" y1="80" x2="200" y2="100" />
    </g>
    <g fontSize="9" fontWeight="600" textAnchor="middle">
      <text x="40" y="103" fill="hsl(var(--chemistry))">CHF₂</text>
      <text x="80" y="74" fill="hsl(var(--muted-foreground))">O</text>
      <text x="120" y="113" fill="hsl(var(--chemistry))">CF₂</text>
      <text x="160" y="74" fill="hsl(var(--chemistry))">CHF</text>
      <text x="200" y="103" fill="hsl(var(--destructive))">Cl</text>
    </g>

    <line x1="230" y1="40" x2="230" y2="200" stroke="hsl(var(--border))" strokeDasharray="3 3" />

    <text x="345" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">Isoflurane</text>
    <text x="345" y="32" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">CHF₂–O–CHCl–CF₃</text>
    <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
      <line x1="270" y1="100" x2="310" y2="80" />
      <line x1="310" y1="80" x2="350" y2="100" />
      <line x1="350" y1="100" x2="390" y2="80" />
      <line x1="350" y1="100" x2="350" y2="140" />
    </g>
    <g fontSize="9" fontWeight="600" textAnchor="middle">
      <text x="270" y="103" fill="hsl(var(--chemistry))">CHF₂</text>
      <text x="310" y="74" fill="hsl(var(--muted-foreground))">O</text>
      <text x="350" y="113" fill="hsl(var(--chemistry))">CH</text>
      <text x="390" y="74" fill="hsl(var(--chemistry))">CF₃</text>
      <text x="350" y="153" fill="hsl(var(--destructive))">Cl</text>
    </g>

    <text x="230" y="195" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontStyle="italic">
      Same atoms (C₂HClF₅O), different connectivity → different λ_blood/gas, MAC, seizure threshold
    </text>
  </svg>
);

const GeometricPanel = () => (
  <svg viewBox="0 0 460 220" className="w-full h-auto">
    <text x="115" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">cis (Z)</text>
    <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
      <line x1="65" y1="110" x2="165" y2="110" />
      <line x1="65" y1="113" x2="165" y2="113" />
      <line x1="65" y1="110" x2="40" y2="80" />
      <line x1="65" y1="113" x2="40" y2="143" />
      <line x1="165" y1="110" x2="190" y2="80" />
      <line x1="165" y1="113" x2="190" y2="143" />
    </g>
    <g fontSize="10" fontWeight="700" textAnchor="middle">
      <text x="35" y="76" fill="hsl(var(--destructive))">R</text>
      <text x="35" y="155" fill="hsl(var(--muted-foreground))">H</text>
      <text x="195" y="76" fill="hsl(var(--destructive))">R</text>
      <text x="195" y="155" fill="hsl(var(--muted-foreground))">H</text>
    </g>
    <text x="115" y="190" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">R groups same side</text>

    <line x1="230" y1="40" x2="230" y2="200" stroke="hsl(var(--border))" strokeDasharray="3 3" />

    <text x="345" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">trans (E)</text>
    <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
      <line x1="295" y1="110" x2="395" y2="110" />
      <line x1="295" y1="113" x2="395" y2="113" />
      <line x1="295" y1="110" x2="270" y2="80" />
      <line x1="295" y1="113" x2="270" y2="143" />
      <line x1="395" y1="110" x2="420" y2="80" />
      <line x1="395" y1="113" x2="420" y2="143" />
    </g>
    <g fontSize="10" fontWeight="700" textAnchor="middle">
      <text x="265" y="76" fill="hsl(var(--destructive))">R</text>
      <text x="265" y="155" fill="hsl(var(--muted-foreground))">H</text>
      <text x="425" y="76" fill="hsl(var(--muted-foreground))">H</text>
      <text x="425" y="155" fill="hsl(var(--destructive))">R</text>
    </g>
    <text x="345" y="190" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">R groups opposite sides</text>

    <text x="230" y="210" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontStyle="italic">
      Restricted rotation around C=C → spatial arrangement is fixed
    </text>
  </svg>
);

interface OpticalProps {
  mirrorHover: boolean;
  setMirrorHover: (v: boolean) => void;
}

const OpticalPanel = ({ mirrorHover, setMirrorHover }: OpticalProps) => (
  <svg viewBox="0 0 460 240" className="w-full h-auto"
    onMouseEnter={() => setMirrorHover(true)}
    onMouseLeave={() => setMirrorHover(false)}>
    {/* Mirror plane */}
    <line x1="230" y1="20" x2="230" y2="220" stroke="hsl(var(--chemistry))"
      strokeWidth={mirrorHover ? 2 : 1} strokeDasharray="4 3"
      opacity={mirrorHover ? 0.9 : 0.5} className="transition-all" />
    <text x="230" y="14" textAnchor="middle" fontSize="8" fill="hsl(var(--chemistry))"
      fontStyle="italic" opacity="0.7">mirror</text>

    {/* Left enantiomer S(+) */}
    <text x="115" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">S(+)-Ketamine</text>
    {/* Tetrahedral chiral C */}
    <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
      <line x1="115" y1="120" x2="115" y2="65" />
      <line x1="115" y1="120" x2="60" y2="155" />
      <line x1="115" y1="120" x2="115" y2="180" strokeDasharray="2 2" />
      <line x1="115" y1="120" x2="170" y2="155" />
    </g>
    <circle cx="115" cy="120" r="4" fill="hsl(var(--chemistry))" />
    <g fontSize="9" fontWeight="700" textAnchor="middle">
      <text x="115" y="60" fill="hsl(var(--destructive))">NHCH₃</text>
      <text x="50" y="160" fill="hsl(var(--muted-foreground))">Ar</text>
      <text x="115" y="195" fill="hsl(var(--muted-foreground))">cyclohexanone</text>
      <text x="180" y="160" fill="hsl(var(--muted-foreground))">H</text>
    </g>
    <text x="115" y="225" textAnchor="middle" fontSize="9" fill="hsl(var(--chemistry))" fontWeight="600">
      4× analgesic potency
    </text>

    {/* Right enantiomer R(−) — mirrored */}
    <text x="345" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">R(−)-Ketamine</text>
    <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
      <line x1="345" y1="120" x2="345" y2="65" />
      <line x1="345" y1="120" x2="400" y2="155" />
      <line x1="345" y1="120" x2="345" y2="180" strokeDasharray="2 2" />
      <line x1="345" y1="120" x2="290" y2="155" />
    </g>
    <circle cx="345" cy="120" r="4" fill="hsl(var(--chemistry))" />
    <g fontSize="9" fontWeight="700" textAnchor="middle">
      <text x="345" y="60" fill="hsl(var(--destructive))">NHCH₃</text>
      <text x="410" y="160" fill="hsl(var(--muted-foreground))">Ar</text>
      <text x="345" y="195" fill="hsl(var(--muted-foreground))">cyclohexanone</text>
      <text x="280" y="160" fill="hsl(var(--muted-foreground))">H</text>
    </g>
    <text x="345" y="225" textAnchor="middle" fontSize="9" fill="hsl(var(--chemistry))" fontWeight="600">
      more emergence reactions
    </text>
  </svg>
);

const TautomerPanel = () => (
    <DiagramFigure
      id="isomerism-diagram"
      title="Isomerism"
      description="Auto-generated wrapper for the Isomerism anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <svg viewBox="0 0 460 220" className="w-full h-auto">
      <text x="115" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">Keto form</text>
      <text x="115" y="32" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">white powder, insoluble</text>
      {/* C=O */}
      <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
        <line x1="60" y1="120" x2="100" y2="100" />
        <line x1="100" y1="100" x2="140" y2="120" />
        <line x1="100" y1="100" x2="100" y2="60" />
        <line x1="103" y1="100" x2="103" y2="60" />
      </g>
      <g fontSize="10" fontWeight="700" textAnchor="middle">
        <text x="55" y="123" fill="hsl(var(--muted-foreground))">C</text>
        <text x="145" y="123" fill="hsl(var(--muted-foreground))">C</text>
        <text x="100" y="55" fill="hsl(var(--destructive))">O</text>
        <text x="100" y="145" fill="hsl(var(--muted-foreground))">H₂</text>
      </g>
  
      {/* Equilibrium arrows */}
      <g stroke="hsl(var(--chemistry))" strokeWidth="1.5" fill="none">
        <line x1="190" y1="95" x2="270" y2="95" markerEnd="url(#tauto-arrow)" />
        <line x1="270" y1="115" x2="190" y2="115" markerEnd="url(#tauto-arrow)" />
      </g>
      <defs>
        <marker id="tauto-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--chemistry))" />
        </marker>
      </defs>
      <text x="230" y="88" textAnchor="middle" fontSize="8" fill="hsl(var(--chemistry))" fontWeight="600">alkaline pH</text>
      <text x="230" y="130" textAnchor="middle" fontSize="8" fill="hsl(var(--chemistry))" fontWeight="600">acidic pH</text>
  
      <text x="345" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--chemistry))">Enol (thiol) form</text>
      <text x="345" y="32" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">yellow Na⁺ salt, water-soluble</text>
      {/* C=C with OH */}
      <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
        <line x1="290" y1="120" x2="330" y2="100" />
        <line x1="330" y1="100" x2="370" y2="120" />
        <line x1="333" y1="103" x2="373" y2="123" />
        <line x1="370" y1="120" x2="370" y2="80" />
      </g>
      <g fontSize="10" fontWeight="700" textAnchor="middle">
        <text x="285" y="123" fill="hsl(var(--muted-foreground))">C</text>
        <text x="370" y="75" fill="hsl(var(--destructive))">SH</text>
        <text x="328" y="98" fill="hsl(var(--muted-foreground))">C</text>
        <text x="330" y="143" fill="hsl(var(--muted-foreground))">H</text>
      </g>
  
      <text x="230" y="195" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontStyle="italic">
        Thiopentone Na⁺ in solution = enol; precipitates back to keto when pH falls
      </text>
    </svg>
    </DiagramFigure>
  );

export default IsomerismDiagram;
