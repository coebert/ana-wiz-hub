import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Static educational diagram explaining the chain
 *   Absorbed dose (Gy) → ×wR → Equivalent dose (Sv) → ×wT, summed → Effective dose (Sv)
 * with a worked CT-pulmonary-angiogram example.
 */

const RadiationDoseUnitsDiagram = () => {
  return (
    <DiagramFigure
      id="radiation-dose-units"
      title="Radiation dose units — Gy, mGy, Sv, mSv"
      description="Visual chain from absorbed dose (Gy) to equivalent dose to effective dose (Sv), with a worked CTPA example showing prefix conversion and tissue weighting."
    >
      <div className="my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-2">
          From energy deposited to whole-body risk: Gy → Sv
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          The three dose quantities answer different questions: <strong>how much energy</strong> was
          deposited (Gy), <strong>how biologically damaging</strong> that radiation type was (Sv,
          equivalent), and <strong>how much whole-body cancer risk</strong> the exposure carries (Sv,
          effective). Convert prefixes by powers of 1 000 (1 Gy = 1 000 mGy = 1 000 000 µGy).
        </p>

        {/* === Flow diagram === */}
        <div className="rounded-xl border border-border bg-card p-3 overflow-x-auto">
          <svg
            viewBox="0 0 760 280"
            className="w-full h-auto min-w-[520px]"
            role="img"
            aria-label="Flow chart showing absorbed dose in gray multiplied by radiation weighting factor giving equivalent dose in sievert, then multiplied by tissue weighting factors and summed across organs to give effective dose"
          >
            <defs>
              <marker id="dose-arrow" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
                <path d="M0,0 L10,4 L0,8 Z" fill="hsl(var(--foreground))" />
              </marker>
            </defs>

            {/* Box 1 — Absorbed dose */}
            <g>
              <rect x="20" y="80" width="200" height="120" rx="10" fill="hsl(var(--muted)/0.4)" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="120" y="105" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                Absorbed dose
              </text>
              <text x="120" y="135" textAnchor="middle" className="fill-foreground text-[20px] font-bold">
                Gy
              </text>
              <text x="120" y="156" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                = J / kg of tissue
              </text>
              <text x="120" y="178" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
                Pure physics — energy per mass
              </text>
            </g>

            {/* Arrow 1 — × wR */}
            <line x1="220" y1="140" x2="280" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#dose-arrow)" />
            <text x="250" y="128" textAnchor="middle" className="fill-primary text-[11px] font-semibold">
              × w<tspan dy="2" fontSize="9">R</tspan>
            </text>
            <text x="250" y="158" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              radiation weighting
            </text>

            {/* Box 2 — Equivalent dose */}
            <g>
              <rect x="285" y="80" width="200" height="120" rx="10" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <text x="385" y="105" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                Equivalent dose
              </text>
              <text x="385" y="135" textAnchor="middle" className="fill-primary text-[20px] font-bold">
                Sv
              </text>
              <text x="385" y="156" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                = Gy × w<tspan dy="2" fontSize="8">R</tspan>
              </text>
              <text x="385" y="178" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
                Per organ — biological damage
              </text>
            </g>

            {/* Arrow 2 — × wT, sum */}
            <line x1="485" y1="140" x2="545" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#dose-arrow)" />
            <text x="515" y="128" textAnchor="middle" className="fill-primary text-[11px] font-semibold">
              × w<tspan dy="2" fontSize="9">T</tspan>, Σ
            </text>
            <text x="515" y="158" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              tissue weighting,
            </text>
            <text x="515" y="170" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              summed across organs
            </text>

            {/* Box 3 — Effective dose */}
            <g>
              <rect x="550" y="80" width="200" height="120" rx="10" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
              <text x="650" y="105" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                Effective dose
              </text>
              <text x="650" y="135" textAnchor="middle" className="fill-destructive text-[20px] font-bold">
                Sv
              </text>
              <text x="650" y="156" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                = Σ (H<tspan dy="2" fontSize="8">T</tspan> × w<tspan dy="2" fontSize="8">T</tspan>)
              </text>
              <text x="650" y="178" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
                Whole-body stochastic risk
              </text>
            </g>

            {/* wR examples row */}
            <text x="250" y="232" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              w<tspan dy="2" fontSize="8">R</tspan> examples
            </text>
            <text x="250" y="250" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              X-ray, γ, β = 1
            </text>
            <text x="250" y="262" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              neutrons 5–20, α = 20
            </text>

            {/* wT examples row */}
            <text x="650" y="232" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              w<tspan dy="2" fontSize="8">T</tspan> examples
            </text>
            <text x="650" y="250" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              breast/lung/colon/marrow 0.12
            </text>
            <text x="650" y="262" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              thyroid 0.04 · skin 0.01
            </text>
          </svg>
        </div>

        {/* === Prefix conversion strip === */}
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-sm font-semibold text-foreground mb-2">Prefix conversions (apply identically to Gy and Sv)</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded bg-card border border-border">
              <p className="font-mono font-semibold text-foreground">1 Gy</p>
              <p className="text-muted-foreground">= 1 000 mGy</p>
            </div>
            <div className="p-2 rounded bg-card border border-border">
              <p className="font-mono font-semibold text-foreground">1 mGy</p>
              <p className="text-muted-foreground">= 1 000 µGy = 0.001 Gy</p>
            </div>
            <div className="p-2 rounded bg-card border border-border">
              <p className="font-mono font-semibold text-foreground">1 Sv</p>
              <p className="text-muted-foreground">= 1 000 mSv</p>
            </div>
            <div className="p-2 rounded bg-card border border-border">
              <p className="font-mono font-semibold text-foreground">1 mSv</p>
              <p className="text-muted-foreground">= 1 000 µSv = 0.001 Sv</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            For diagnostic X-ray and CT (w<sub>R</sub> = 1): an absorbed dose of <span className="font-mono">10 mGy</span> to a single organ
            corresponds to an equivalent dose of <span className="font-mono">10 mSv</span> to that organ — the numerical value is unchanged,
            only the unit (and meaning) changes.
          </p>
        </div>

        {/* === Worked example === */}
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm font-semibold text-foreground mb-2">
            Worked example — CT pulmonary angiogram (CTPA)
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            A 40-year-old woman has a CTPA. The scanner reports an organ <strong>absorbed dose</strong> of
            <span className="font-mono"> 20 mGy</span> to the lungs and <span className="font-mono">15 mGy</span> to the breasts
            (X-rays, w<sub>R</sub> = 1). Estimate the contribution of these two organs to her <strong>effective dose</strong>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 font-semibold text-foreground border border-border">Step</th>
                  <th className="text-left p-2 font-semibold text-foreground border border-border">Lung</th>
                  <th className="text-left p-2 font-semibold text-foreground border border-border">Breast</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="p-2 border border-border font-medium text-foreground">1. Absorbed dose (Gy)</td>
                  <td className="p-2 border border-border font-mono">20 mGy</td>
                  <td className="p-2 border border-border font-mono">15 mGy</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border font-medium text-foreground">
                    2. × w<sub>R</sub> = 1 → equivalent (Sv)
                  </td>
                  <td className="p-2 border border-border font-mono">20 mSv</td>
                  <td className="p-2 border border-border font-mono">15 mSv</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border font-medium text-foreground">3. × w<sub>T</sub></td>
                  <td className="p-2 border border-border font-mono">× 0.12</td>
                  <td className="p-2 border border-border font-mono">× 0.12</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border font-medium text-foreground">
                    4. Organ contribution to E
                  </td>
                  <td className="p-2 border border-border font-mono">2.4 mSv</td>
                  <td className="p-2 border border-border font-mono">1.8 mSv</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-sm text-foreground/90 space-y-2">
            <p>
              <strong>Summed:</strong> <span className="font-mono">2.4 + 1.8 = 4.2 mSv</span> from these two organs alone. Adding the
              smaller contributions from heart, oesophagus, thymus, marrow and skin in the scan field gives a total effective dose of
              roughly <span className="font-mono">5–10 mSv</span> for a typical CTPA.
            </p>
            <p className="text-muted-foreground text-xs">
              <strong className="text-foreground">Putting it in context:</strong> ≈ 2–4 years of UK natural background (2.7 mSv/yr),
              ≈ 250–500 chest X-rays, and well below the occupational annual limit (20 mSv) — but enough that the request must be
              <em> justified</em> and the protocol <em>optimised</em> (lower kVp, iterative reconstruction, breast shielding) under IR(ME)R.
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default RadiationDoseUnitsDiagram;
