import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * OxygenCascadeDiagram
 *
 * Stepwise fall in PO₂ from atmospheric air to the mitochondrion
 * (room air, breathing spontaneously, at sea level). Shown as a
 * descending step plot so the magnitude of each loss is visually
 * obvious.
 *
 * Values are the canonical FRCA Primary teaching figures (kPa):
 *   Atmospheric  ............ 21.2
 *   Humidified inspired  .... 19.9
 *   Alveolar  ............... 13.3
 *   Arterial  ............... 13.0   (small A–a gradient ≈ 0.3 kPa)
 *   Capillary  .............. 5.3
 *   Mitochondrial  .......... 1.0    (Pasteur point ~0.5–3 kPa)
 *
 * Source: West JB, Respiratory Physiology — The Essentials (10th ed.).
 */
const STEPS = [
  { label: "Atmospheric",  po2: 21.2, note: "Dry air, sea level (FiO₂ 0.21 × 101.3 kPa)" },
  { label: "Humidified",   po2: 19.9, note: "After warming + saturation in upper airway (P_H₂O 6.3 kPa)" },
  { label: "Alveolar",     po2: 13.3, note: "Alveolar gas equation: P_AO₂ = FiO₂(P_atm − P_H₂O) − PaCO₂/RQ" },
  { label: "Arterial",     po2: 13.0, note: "Small A–a gradient (≈0.3 kPa) from physiological V/Q mismatch + shunt" },
  { label: "Capillary",    po2: 5.3,  note: "After tissue O₂ offloading (mixed venous PO₂)" },
  { label: "Mitochondrial",po2: 1.0,  note: "Pasteur point: below ~0.5–3 kPa oxidative phosphorylation fails" },
];

const W = 720;
const H = 360;
const PAD_L = 70;
const PAD_R = 20;
const PAD_T = 30;
const PAD_B = 70;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;
const Y_MAX = 22; // kPa

const xFor = (i: number) => PAD_L + (i + 0.5) * (PLOT_W / STEPS.length);
const yFor = (po2: number) => PAD_T + (1 - po2 / Y_MAX) * PLOT_H;

const OxygenCascadeDiagram = () => {
  const yTicks = [0, 5, 10, 15, 20];

  return (
    <div className="space-y-4">
      <DiagramFigure
        id="oxygen-cascade"
        title="Oxygen cascade from atmosphere to mitochondrion"
        description="Stepwise fall in partial pressure of oxygen (PO₂, kPa) from inspired air through the alveolus, arterial blood, capillary and mitochondrion at sea level breathing room air."
      >
        <svg
          role="img"
          aria-labelledby="oxygen-cascade-title oxygen-cascade-desc"
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
        >
          <title id="oxygen-cascade-title">Oxygen cascade</title>
          <desc id="oxygen-cascade-desc">
            Descending step plot showing PO₂ falling from 21 kPa atmospheric to ~1 kPa mitochondrial.
          </desc>

          {/* Y axis grid + labels */}
          {yTicks.map((t) => {
            const y = yFor(t);
            return (
              <g key={t}>
                <line
                  x1={PAD_L}
                  x2={W - PAD_R}
                  y1={y}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 4"
                />
                <text
                  x={PAD_L - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground"
                  fontSize="11"
                >
                  {t}
                </text>
              </g>
            );
          })}
          <text
            x={18}
            y={PAD_T + PLOT_H / 2}
            transform={`rotate(-90 18 ${PAD_T + PLOT_H / 2})`}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
            fontWeight="600"
          >
            PO₂ (kPa)
          </text>

          {/* Step plot — descending horizontal bars + connecting drops */}
          {STEPS.map((s, i) => {
            const x = xFor(i);
            const y = yFor(s.po2);
            const barW = (PLOT_W / STEPS.length) * 0.7;
            const next = STEPS[i + 1];
            return (
              <g key={s.label}>
                {/* Drop connector to next step */}
                {next && (
                  <line
                    x1={x + barW / 2}
                    y1={y}
                    x2={xFor(i + 1) - barW / 2}
                    y2={yFor(next.po2)}
                    stroke="hsl(var(--physiology))"
                    strokeWidth={2}
                    strokeDasharray="4 3"
                    opacity={0.55}
                  />
                )}
                {/* Bar */}
                <rect
                  x={x - barW / 2}
                  y={y}
                  width={barW}
                  height={PAD_T + PLOT_H - y}
                  rx={3}
                  fill="hsl(var(--physiology) / 0.18)"
                  stroke="hsl(var(--physiology))"
                  strokeWidth={1.5}
                />
                {/* Value label above bar */}
                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize="12"
                  fontWeight="700"
                >
                  {s.po2.toFixed(1)}
                </text>
                {/* X axis label (split onto two lines if long) */}
                <text
                  x={x}
                  y={PAD_T + PLOT_H + 18}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize="11"
                  fontWeight="600"
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* Pasteur-point shading */}
          <rect
            x={PAD_L}
            y={yFor(3)}
            width={PLOT_W}
            height={yFor(0) - yFor(3)}
            fill="hsl(var(--destructive) / 0.08)"
          />
          <text
            x={W - PAD_R - 6}
            y={yFor(3) - 4}
            textAnchor="end"
            className="fill-destructive"
            fontSize="10"
            fontStyle="italic"
          >
            Pasteur point (~0.5–3 kPa)
          </text>

          {/* X axis baseline */}
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={PAD_T + PLOT_H}
            y2={PAD_T + PLOT_H}
            stroke="hsl(var(--foreground))"
            strokeWidth={1.5}
          />
          <text
            x={PAD_L + PLOT_W / 2}
            y={H - 10}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            Stage along the oxygen cascade
          </text>
        </svg>
      </DiagramFigure>

      {/* Stage-by-stage explanation */}
      <ol className="space-y-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s.label} className="flex gap-3">
            <span className="font-mono text-xs text-muted-foreground w-6 shrink-0 mt-0.5">
              {i + 1}.
            </span>
            <div>
              <span className="font-semibold text-foreground">{s.label}</span>{" "}
              <span className="font-mono text-physiology">{s.po2.toFixed(1)} kPa</span>
              <span className="text-foreground/80"> — {s.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OxygenCascadeDiagram;
