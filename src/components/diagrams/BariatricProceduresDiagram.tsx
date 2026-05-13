import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Procedure = "rygb" | "sleeve" | "band";

const procedures: Record<Procedure, { label: string; color: string; desc: string; features: string[] }> = {
  rygb: {
    label: "Roux-en-Y Gastric Bypass",
    color: "hsl(var(--clinical))",
    desc: "Small gastric pouch (≈30 ml) anastomosed to a Roux limb of jejunum, bypassing the duodenum and proximal jejunum.",
    features: [
      "Restrictive + malabsorptive",
      "Gold standard — best long-term weight loss",
      "30 ml gastric pouch created",
      "Biliopancreatic & alimentary limbs",
      "Dumping syndrome risk (rapid gastric emptying)",
      "Internal hernia risk (Petersen's space)",
      "Anastomotic leak rate ≈1–2%",
      "Vitamin B₁₂, iron, calcium malabsorption",
    ],
  },
  sleeve: {
    label: "Sleeve Gastrectomy",
    color: "hsl(var(--primary))",
    desc: "Vertical resection of ≈80% of the stomach along the greater curvature, creating a tubular 'sleeve'.",
    features: [
      "Primarily restrictive (+ hormonal)",
      "Most commonly performed worldwide",
      "Removes ghrelin-producing fundus → ↓ appetite",
      "Irreversible — stomach is resected",
      "Staple line leak rate ≈1–3%",
      "Preserved pylorus → no dumping",
      "No malabsorption (no bypass)",
      "Can convert to RYGB if needed",
    ],
  },
  band: {
    label: "Adjustable Gastric Band",
    color: "hsl(220, 70%, 55%)",
    desc: "Inflatable silicone band placed around the gastric cardia, creating a small proximal pouch. Adjusted via subcutaneous port.",
    features: [
      "Purely restrictive",
      "Reversible & adjustable",
      "Lowest perioperative mortality",
      "No staple lines — no leak risk",
      "Subcutaneous port for saline adjustment",
      "Band slippage / erosion risk",
      "Inferior long-term weight loss",
      "Declining use worldwide",
    ],
  },
};

const BariatricProceduresDiagram = () => {
  const [selected, setSelected] = useState<Procedure>("rygb");
  const proc = procedures[selected];

  return (
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Bariatric Procedures Comparison</h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(procedures) as Procedure[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              selected === key
                ? "text-white border-transparent"
                : "text-muted-foreground border-border hover:border-foreground/30"
            }`}
            style={selected === key ? { backgroundColor: procedures[key].color } : {}}
          >
            {procedures[key].label}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <svg viewBox="0 0 200 280" className="w-48 h-auto mx-auto md:mx-0 shrink-0">
          {selected === "rygb" && <RYGBImage color={proc.color} />}
          {selected === "sleeve" && <SleeveImage color={proc.color} />}
          {selected === "band" && <BandImage color={proc.color} />}
        </svg>

        <div className="flex-1 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{proc.desc}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {proc.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: proc.color }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-muted-foreground border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-3 font-medium text-foreground">Feature</th>
              <th className="py-2 px-2 font-medium text-foreground">RYGB</th>
              <th className="py-2 px-2 font-medium text-foreground">Sleeve</th>
              <th className="py-2 px-2 font-medium text-foreground">Band</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Mechanism", "Restrictive + malabsorptive", "Restrictive + hormonal", "Restrictive only"],
              ["Excess weight loss", "60–70%", "55–65%", "40–50%"],
              ["Operative mortality", "0.1–0.5%", "0.1–0.3%", "<0.1%"],
              ["Reversibility", "Technically possible", "Irreversible", "Fully reversible"],
              ["Dumping syndrome", "Common", "Rare", "No"],
              ["Nutritional deficiency", "Significant", "Minimal", "Minimal"],
              ["Reoperation rate", "5–10%", "3–7%", "15–30%"],
            ].map(([feature, ...vals], i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5 pr-3 font-medium">{feature}</td>
                {vals.map((v, j) => (
                  <td key={j} className="py-1.5 px-2 text-center">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* SVG stomach illustrations */
const RYGBImage = ({ color }: { color: string }) => (
  <g>
    {/* Oesophagus */}
    <path d="M90 10 L90 50" stroke="hsl(var(--muted-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Excluded stomach (greyed) */}
    <path d="M90 50 Q60 50 50 80 Q35 130 55 170 Q70 195 100 190 Q130 185 135 150 Q140 120 130 90 Q120 60 90 50Z" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    <text x="90" y="130" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.6">excluded</text>
    {/* Small pouch */}
    <rect x="78" y="48" width="24" height="18" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
    <text x="90" y="60" textAnchor="middle" fontSize="6" fill={color} fontWeight="bold">pouch</text>
    {/* Roux limb */}
    <path d="M90 66 L90 100 Q90 110 100 115 L140 130 Q155 135 155 150 L155 260" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <text x="160" y="200" fontSize="7" fill={color}>Roux limb</text>
    {/* Biliopancreatic limb */}
    <path d="M100 190 L100 220 Q100 230 110 235 L155 250" stroke="hsl(var(--muted-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
    <text x="50" y="220" fontSize="7" fill="hsl(var(--muted-foreground))">BP limb</text>
  </g>
);

const SleeveImage = ({ color }: { color: string }) => (
  <g>
    {/* Oesophagus */}
    <path d="M90 10 L90 50" stroke="hsl(var(--muted-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Resected portion (dashed) */}
    <path d="M80 55 Q55 60 45 90 Q35 130 50 170 Q60 195 80 190" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
    <text x="40" y="130" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5" transform="rotate(-15,40,130)">resected</text>
    {/* Sleeve */}
    <path d="M85 50 Q92 50 95 60 L100 100 Q102 140 100 180 Q98 210 90 240 L90 260" stroke={color} strokeWidth="2" fill={color} opacity="0.25" />
    <path d="M95 50 Q88 50 85 60 L82 100 Q80 140 82 180 Q84 210 90 240" stroke={color} strokeWidth="2" fill="none" />
    <path d="M95 50 Q98 50 100 60 L103 100 Q105 140 103 180 Q100 210 90 240" stroke={color} strokeWidth="2" fill="none" />
    <text x="115" y="140" fontSize="7" fill={color} fontWeight="bold">sleeve</text>
    {/* Staple line */}
    <line x1="83" y1="65" x2="83" y2="230" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <text x="70" y="155" fontSize="6" fill={color} opacity="0.7" transform="rotate(-90,70,155)">staple line</text>
  </g>
);

const BandImage = ({ color }: { color: string }) => (
    <DiagramFigure
      id="bariatric-procedures-diagram"
      title="Bariatric procedures"
      description="Auto-generated wrapper for the Bariatric procedures anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <g>
      {/* Oesophagus */}
      <path d="M90 10 L90 50" stroke="hsl(var(--muted-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Full stomach */}
      <path d="M90 50 Q60 50 50 80 Q35 130 55 180 Q70 210 100 205 Q130 200 140 160 Q150 120 130 80 Q120 55 90 50Z" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
      {/* Band */}
      <ellipse cx="90" cy="72" rx="28" ry="6" fill="none" stroke={color} strokeWidth="3" />
      <text x="90" y="60" textAnchor="middle" fontSize="6" fill={color} fontWeight="bold">small pouch</text>
      <text x="90" y="145" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">stomach</text>
      {/* Tubing to port */}
      <path d="M118 72 L150 60 L170 40" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="163" y="30" width="20" height="14" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <text x="173" y="39" textAnchor="middle" fontSize="5" fill={color}>port</text>
      {/* Duodenum */}
      <path d="M100 205 Q110 220 105 240 L100 260" stroke="hsl(var(--muted-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    </DiagramFigure>
  );

export default BariatricProceduresDiagram;
