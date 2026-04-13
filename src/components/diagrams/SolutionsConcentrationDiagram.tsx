import { useState } from "react";

export const SolutionsConcentrationDiagram = () => {
  const [activeTab, setActiveTab] = useState<"units" | "osmolality" | "tonicity">("units");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 justify-center mb-6">
        {([
          { key: "units" as const, label: "Concentration Units" },
          { key: "osmolality" as const, label: "Osmolality" },
          { key: "tonicity" as const, label: "Tonicity" },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeTab === key ? "bg-chemistry/10 border-chemistry text-chemistry" : "border-border text-muted-foreground hover:border-chemistry/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "units" && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-2 font-semibold text-foreground">Unit</th>
                  <th className="text-left p-2 font-semibold text-foreground">Definition</th>
                  <th className="text-left p-2 font-semibold text-foreground">Example</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { unit: "% w/v", def: "Grams of solute per 100 mL solution", ex: "0.9% NaCl = 9 g/L" },
                  { unit: "% w/w", def: "Grams of solute per 100 g solution", ex: "Halothane in oil" },
                  { unit: "Molarity (M)", def: "Moles of solute per litre of solution", ex: "150 mmol/L Na⁺" },
                  { unit: "Molality (m)", def: "Moles of solute per kg of solvent", ex: "More accurate, temp-independent" },
                  { unit: "mg/mL", def: "Mass per unit volume", ex: "Propofol 10 mg/mL (1%)" },
                  { unit: "Ratio", def: "Parts per total (e.g. 1:1000)", ex: "Adrenaline 1:1000 = 1 mg/mL" },
                  { unit: "ppm", def: "Parts per million", ex: "CO in expired gas" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="p-2 font-medium text-foreground font-mono">{row.unit}</td>
                    <td className="p-2">{row.def}</td>
                    <td className="p-2">{row.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <p className="text-xs font-medium text-foreground mb-1">Common Drug Concentration Conversions</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Adrenaline 1:1000 = <strong>1 mg/mL</strong></div>
              <div>Adrenaline 1:10,000 = <strong>100 μg/mL</strong></div>
              <div>Propofol 1% = <strong>10 mg/mL</strong></div>
              <div>Thiopentone 2.5% = <strong>25 mg/mL</strong></div>
              <div>Bupivacaine 0.25% = <strong>2.5 mg/mL</strong></div>
              <div>Glucose 5% = <strong>50 g/L</strong></div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">The Mole</h4>
            <p className="text-xs text-muted-foreground">
              1 mole = 6.022 × 10²³ particles (Avogadro's number). The molecular weight in grams contains exactly 1 mole.
              Example: NaCl MW = 58.5 → 58.5 g NaCl dissolved in 1 L = 1 mol/L (1 M) solution.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Millimole (mmol):</strong> 10⁻³ mol. Normal plasma Na⁺ = 140 mmol/L.
              <br/><strong>Micromole (μmol):</strong> 10⁻⁶ mol. Normal plasma creatinine ~60-110 μmol/L.
              <br/><strong>Nanomole (nmol):</strong> 10⁻⁹ mol. Normal plasma [H⁺] = 40 nmol/L (pH 7.4).
            </p>
          </div>
        </div>
      )}

      {activeTab === "osmolality" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Osmolality</p>
                <p className="text-sm font-mono font-bold text-foreground">mOsm / kg solvent</p>
                <p className="text-xs text-muted-foreground">(measured by freezing-point depression or vapour pressure)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Osmolarity</p>
                <p className="text-sm font-mono font-bold text-foreground">mOsm / L solution</p>
                <p className="text-xs text-muted-foreground">(calculated — slightly less accurate due to solute volume)</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Normal Plasma Osmolality: 280–295 mOsm/kg</h4>
            <p className="text-xs text-muted-foreground mb-2">Calculated osmolality = 2[Na⁺] + [urea] + [glucose] (all in mmol/L)</p>
            <p className="text-xs text-muted-foreground">
              <strong>Osmol gap</strong> = measured − calculated osmolality. Normal &lt;10 mOsm/kg.
              Elevated in: methanol, ethylene glycol, ethanol, mannitol poisoning.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Colligative Properties</h4>
            <p className="text-xs text-muted-foreground mb-2">Properties that depend on the <strong>number</strong> of solute particles, not their nature:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="bg-secondary/30 rounded-lg p-2">
                <p className="font-medium text-foreground">↑ Boiling point elevation</p>
                <p>Basis of osmometry</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-2">
                <p className="font-medium text-foreground">↓ Freezing point depression</p>
                <p>Used to measure osmolality</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-2">
                <p className="font-medium text-foreground">↓ Vapour pressure</p>
                <p>Raoult's law</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-2">
                <p className="font-medium text-foreground">Osmotic pressure</p>
                <p>Drives fluid across semi-permeable membranes</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-2 font-semibold text-foreground">IV Fluid</th>
                  <th className="text-left p-2 font-semibold text-foreground">Osmolarity</th>
                  <th className="text-left p-2 font-semibold text-foreground">Tonicity</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { fluid: "0.9% NaCl", osm: "308", ton: "Isotonic" },
                  { fluid: "5% Dextrose", osm: "278", ton: "Hypotonic (in vivo)" },
                  { fluid: "Hartmann's", osm: "278", ton: "Isotonic" },
                  { fluid: "3% NaCl", osm: "1026", ton: "Hypertonic" },
                  { fluid: "20% Mannitol", osm: "1098", ton: "Hypertonic" },
                  { fluid: "Gelofusine", osm: "274", ton: "Isotonic" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="p-2 font-medium text-foreground">{row.fluid}</td>
                    <td className="p-2 font-mono">{row.osm} mOsm/L</td>
                    <td className="p-2">{row.ton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "tonicity" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-1">Tonicity vs Osmolarity</p>
            <p className="text-sm font-medium text-foreground">
              Tonicity = <strong>effective</strong> osmolarity — considers only solutes that cannot freely cross cell membranes
            </p>
            <p className="text-xs text-muted-foreground mt-1">Urea crosses membranes freely → contributes to osmolarity but NOT tonicity</p>
          </div>

          {/* Cell diagrams */}
          <svg viewBox="0 0 420 160" className="w-full">
            {/* Hypotonic */}
            <g>
              <text x={70} y={20} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Hypotonic</text>
              <circle cx={70} cy={85} r={38} fill="hsl(210 70% 50%)" opacity="0.15" stroke="hsl(210 70% 50%)" strokeWidth="2" />
              <text x={70} y={82} textAnchor="middle" fontSize="8" className="fill-foreground">Cell swells</text>
              <text x={70} y={94} textAnchor="middle" fontSize="8" className="fill-muted-foreground">H₂O →</text>
              {/* Water arrows inward */}
              {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((a, i) => (
                <line key={i} x1={70 + Math.cos(a)*50} y1={85 + Math.sin(a)*50} x2={70 + Math.cos(a)*42} y2={85 + Math.sin(a)*42} stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
              ))}
              <text x={70} y={135} textAnchor="middle" fontSize="7" className="fill-muted-foreground">e.g. 5% dextrose</text>
              <text x={70} y={148} textAnchor="middle" fontSize="7" className="fill-destructive">Risk: cerebral oedema</text>
            </g>

            {/* Isotonic */}
            <g>
              <text x={210} y={20} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Isotonic</text>
              <circle cx={210} cy={85} r={30} fill="hsl(95 55% 38%)" opacity="0.15" stroke="hsl(95 55% 38%)" strokeWidth="2" />
              <text x={210} y={82} textAnchor="middle" fontSize="8" className="fill-foreground">No net</text>
              <text x={210} y={94} textAnchor="middle" fontSize="8" className="fill-muted-foreground">movement</text>
              <text x={210} y={135} textAnchor="middle" fontSize="7" className="fill-muted-foreground">e.g. 0.9% NaCl</text>
              <text x={210} y={148} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Hartmann's</text>
            </g>

            {/* Hypertonic */}
            <g>
              <text x={350} y={20} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Hypertonic</text>
              <circle cx={350} cy={85} r={22} fill="hsl(340 60% 50%)" opacity="0.15" stroke="hsl(340 60% 50%)" strokeWidth="2" />
              <text x={350} y={82} textAnchor="middle" fontSize="8" className="fill-foreground">Cell</text>
              <text x={350} y={94} textAnchor="middle" fontSize="8" className="fill-muted-foreground">shrinks</text>
              {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((a, i) => (
                <line key={i} x1={350 + Math.cos(a)*26} y1={85 + Math.sin(a)*26} x2={350 + Math.cos(a)*38} y2={85 + Math.sin(a)*38} stroke="hsl(340 60% 50%)" strokeWidth="1.5" />
              ))}
              <text x={350} y={135} textAnchor="middle" fontSize="7" className="fill-muted-foreground">e.g. 3% NaCl, mannitol</text>
              <text x={350} y={148} textAnchor="middle" fontSize="7" className="fill-muted-foreground">↓ ICP, ↓ cerebral oedema</text>
            </g>
          </svg>

          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <p className="text-xs font-medium text-foreground mb-1">Clinical Relevance</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong>5% dextrose</strong>: isotonic in the bag, but glucose metabolised rapidly → effectively free water → hypotonic in vivo</li>
              <li><strong>Hyponatraemia</strong>: reduced plasma tonicity → water enters cells → cerebral oedema. Correct slowly (&lt;10 mmol/24h) to avoid osmotic demyelination</li>
              <li><strong>Mannitol 20%</strong>: stays in ECF (MW 182) → osmotic gradient draws water from ICF → reduces ICP</li>
              <li><strong>Reflection coefficient (σ)</strong>: 1.0 for impermeable solutes (Na⁺), 0 for freely permeable (urea)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
