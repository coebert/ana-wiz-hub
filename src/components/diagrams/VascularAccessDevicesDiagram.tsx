import React from "react";

/**
 * Vascular access devices — scaled side-by-side comparison.
 *
 * All catheters are drawn to a common length scale (1 mm = 1 px on the
 * horizontal axis) so learners can immediately see why a peripheral
 * cannula reaches a vein but a PICC reaches the SVC. Lumen counts and
 * approximate French / gauge sizes are annotated.
 *
 * Devices included:
 *   1. Peripheral IV cannula (20 G, 14 G)
 *   2. Midline catheter
 *   3. PICC (peripherally inserted central catheter)
 *   4. Multi-lumen central venous catheter (CVC)
 *   5. Vascath / haemodialysis catheter
 *   6. Trauma line (Rapid Infusion Catheter / MAC introducer)
 *   7. Swan-Ganz introducer sheath (PA catheter introducer)
 */

interface DeviceRow {
  name: string;
  /** Length in mm (= px on the diagram). */
  lengthMm: number;
  /** Outer diameter in 0.1 mm units → controls drawn shaft thickness. */
  shaftPx: number;
  /** Hub colour (gauge code). */
  hubColor: string;
  /** Number of lumens to render at the distal tip. */
  lumens: number;
  /** Short summary printed beside the device. */
  meta: string;
  /** Where the tip typically lies. */
  tipSite: string;
  /** Catheter material colour. */
  shaftColor?: string;
  /** Optional curved insertion path (used for PICC / CVC schematic). */
  curved?: boolean;
}

const DEVICES: DeviceRow[] = [
  {
    name: "Peripheral cannula — 20 G",
    lengthMm: 32,
    shaftPx: 5,
    hubColor: "hsl(200 70% 50%)", // pink/blue — colour-coded gauge
    lumens: 1,
    meta: "20 G · 1.0 mm OD · ~60 mL/min",
    tipSite: "Peripheral vein (forearm / dorsum hand)",
  },
  {
    name: "Peripheral cannula — 14 G",
    lengthMm: 45,
    shaftPx: 8,
    hubColor: "hsl(28 80% 55%)", // orange
    lumens: 1,
    meta: "14 G · 2.1 mm OD · ~270 mL/min",
    tipSite: "Large peripheral vein (ACF) — resus / blood",
  },
  {
    name: "Midline catheter",
    lengthMm: 100,
    shaftPx: 6,
    hubColor: "hsl(210 30% 45%)",
    shaftColor: "hsl(45 25% 88%)",
    lumens: 1,
    meta: "3–5 Fr · 8–20 cm · tip in axillary vein",
    tipSite: "Axillary vein — NOT central. ≤4 weeks of vesicant-free therapy.",
  },
  {
    name: "PICC line",
    lengthMm: 220,
    shaftPx: 5,
    hubColor: "hsl(280 50% 45%)",
    shaftColor: "hsl(45 25% 88%)",
    lumens: 2,
    meta: "4–6 Fr · 1–3 lumens · CVAD",
    tipSite: "SVC / cavo-atrial junction — long-term IV access (weeks–months)",
    curved: true,
  },
  {
    name: "Multi-lumen CVC (triple)",
    lengthMm: 200,
    shaftPx: 7,
    hubColor: "hsl(0 70% 50%)",
    shaftColor: "hsl(45 25% 90%)",
    lumens: 3,
    meta: "7 Fr · 16 / 18 / 18 G lumens · ≤14 days",
    tipSite: "Lower SVC — vasopressors, CVP, parenteral nutrition",
    curved: true,
  },
  {
    name: "Vascath / haemodialysis",
    lengthMm: 200,
    shaftPx: 11,
    hubColor: "hsl(150 60% 38%)",
    shaftColor: "hsl(45 25% 92%)",
    lumens: 2,
    meta: "12–14 Fr · paired wide-bore lumens · ≥200 mL/min",
    tipSite: "RA / cavo-atrial junction — RRT, plasma exchange",
    curved: true,
  },
  {
    name: "Trauma line (RIC / MAC)",
    lengthMm: 70,
    shaftPx: 12,
    hubColor: "hsl(0 80% 45%)",
    shaftColor: "hsl(45 25% 90%)",
    lumens: 1,
    meta: "8.5 Fr / 9 Fr · short, wide-bore · >500 mL/min",
    tipSite: "Large vein (ACF or femoral) — massive transfusion",
  },
  {
    name: "Swan-Ganz introducer sheath",
    lengthMm: 150,
    shaftPx: 12,
    hubColor: "hsl(40 80% 45%)",
    shaftColor: "hsl(45 25% 92%)",
    lumens: 1,
    meta: "8.5–9 Fr · sideport + haemostatic valve · houses PAC",
    tipSite: "IJV/SCV → SVC — conduit for PA catheter, pacing wire, rapid volume",
  },
];

const SCALE_PX_PER_MM = 1.5;

export const VascularAccessDevicesDiagram: React.FC = () => {
  const W = 720;
  const rowH = 70;
  const leftPad = 230;
  const baselineX = leftPad;
  const H = DEVICES.length * rowH + 60;

  return (
    <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Vascular access devices — drawn to a common length scale
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Horizontal axis = catheter length (1 mm ≈ 1.5 px). Hub colours
          follow ISO gauge / French coding. Lumen count is annotated at the
          tip. Tip position determines whether the device is peripheral,
          midline, or central — that, in turn, dictates which drugs and
          flow rates it may safely deliver.
        </p>
      </figcaption>

      <div className="p-3 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto min-w-[640px]"
          role="img"
          aria-label="Comparative diagram of peripheral cannulae, midline, PICC, CVC, vascath, trauma line and Swan-Ganz introducer sheath"
        >
          {/* Scale ruler */}
          <g transform={`translate(${leftPad},20)`}>
            {[0, 50, 100, 150, 200].map((mm) => (
              <g key={mm} transform={`translate(${mm * SCALE_PX_PER_MM},0)`}>
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={6}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                />
                <text
                  x={0}
                  y={-4}
                  textAnchor="middle"
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                >
                  {mm} mm
                </text>
              </g>
            ))}
            <line
              x1={0}
              y1={6}
              x2={250 * SCALE_PX_PER_MM}
              y2={6}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={0.6}
            />
          </g>

          {DEVICES.map((d, i) => {
            const y = 50 + i * rowH;
            const len = d.lengthMm * SCALE_PX_PER_MM;
            const shaftColor = d.shaftColor ?? "hsl(45 30% 80%)";
            // Optional curve to suggest insertion route to SVC.
            const path = d.curved
              ? `M ${baselineX},${y} C ${baselineX + len * 0.4},${y - 18} ${
                  baselineX + len * 0.7
                },${y + 18} ${baselineX + len},${y}`
              : `M ${baselineX},${y} L ${baselineX + len},${y}`;

            return (
              <g key={d.name}>
                {/* Label block */}
                <text
                  x={leftPad - 12}
                  y={y - 4}
                  textAnchor="end"
                  fontSize={11}
                  fontWeight={700}
                  fill="hsl(var(--foreground))"
                >
                  {d.name}
                </text>
                <text
                  x={leftPad - 12}
                  y={y + 9}
                  textAnchor="end"
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                >
                  {d.meta}
                </text>
                <text
                  x={leftPad - 12}
                  y={y + 21}
                  textAnchor="end"
                  fontSize={8.5}
                  fill="hsl(var(--muted-foreground))"
                  fontStyle="italic"
                >
                  {d.tipSite}
                </text>

                {/* Shaft (catheter body) */}
                <path
                  d={path}
                  fill="none"
                  stroke={shaftColor}
                  strokeWidth={d.shaftPx}
                  strokeLinecap="round"
                />
                {/* Subtle shaft outline */}
                <path
                  d={path}
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeOpacity={0.18}
                  strokeWidth={d.shaftPx}
                  strokeLinecap="round"
                />

                {/* Hub (proximal) */}
                <rect
                  x={baselineX - 18}
                  y={y - d.shaftPx - 2}
                  width={18}
                  height={d.shaftPx * 2 + 4}
                  rx={2}
                  fill={d.hubColor}
                  stroke="hsl(var(--foreground))"
                  strokeOpacity={0.4}
                  strokeWidth={0.6}
                />
                {/* Side-port for introducer sheath */}
                {d.name.includes("Swan") && (
                  <g>
                    <line
                      x1={baselineX - 9}
                      y1={y - d.shaftPx - 2}
                      x2={baselineX - 9}
                      y2={y - d.shaftPx - 18}
                      stroke={d.hubColor}
                      strokeWidth={3}
                    />
                    <circle
                      cx={baselineX - 9}
                      cy={y - d.shaftPx - 22}
                      r={4}
                      fill={d.hubColor}
                      stroke="hsl(var(--foreground))"
                      strokeOpacity={0.4}
                      strokeWidth={0.6}
                    />
                    <text
                      x={baselineX - 1}
                      y={y - d.shaftPx - 20}
                      fontSize={8}
                      fill="hsl(var(--muted-foreground))"
                    >
                      side-port
                    </text>
                  </g>
                )}

                {/* Lumen markers at distal tip */}
                {(() => {
                  // Approximate tip orientation for label layout.
                  const tipX = baselineX + len;
                  const tipY = y;
                  const dots: React.ReactNode[] = [];
                  for (let l = 0; l < d.lumens; l++) {
                    const offset = (l - (d.lumens - 1) / 2) * 4;
                    dots.push(
                      <circle
                        key={l}
                        cx={tipX - 2}
                        cy={tipY + offset}
                        r={1.4}
                        fill="hsl(var(--background))"
                        stroke="hsl(var(--foreground))"
                        strokeWidth={0.5}
                      />,
                    );
                  }
                  return (
                    <g>
                      {/* Distal tip taper */}
                      <circle cx={tipX} cy={tipY} r={2.2} fill={shaftColor} />
                      {dots}
                      <text
                        x={tipX + 8}
                        y={tipY + 3}
                        fontSize={9}
                        fill="hsl(var(--muted-foreground))"
                      >
                        {d.lumens} {d.lumens === 1 ? "lumen" : "lumens"}
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}

          {/* Anatomical reference markers above the timeline */}
          <g transform={`translate(${leftPad}, ${H - 16})`}>
            {[
              { mm: 32, label: "forearm" },
              { mm: 70, label: "ACF" },
              { mm: 100, label: "axillary v." },
              { mm: 200, label: "SVC" },
            ].map((m) => (
              <g key={m.label} transform={`translate(${m.mm * SCALE_PX_PER_MM},0)`}>
                <line
                  x1={0}
                  y1={-6}
                  x2={0}
                  y2={-2}
                  stroke="hsl(var(--primary))"
                  strokeWidth={1}
                />
                <text
                  x={0}
                  y={6}
                  textAnchor="middle"
                  fontSize={9}
                  fill="hsl(var(--primary))"
                  fontWeight={600}
                >
                  {m.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </figure>
  );
};

// ──────────────────────────────────────────────────────────────────────
// Cross-section diagram — compares lumen geometry & flow.
// ──────────────────────────────────────────────────────────────────────

interface CrossSection {
  name: string;
  outerFr: number; // outer French (1 Fr = 0.33 mm)
  layout: "single" | "double" | "triple" | "quad-triplane";
  flow: string;
  use: string;
  hue: number;
}

const CROSS_SECTIONS: CrossSection[] = [
  {
    name: "20 G peripheral",
    outerFr: 3,
    layout: "single",
    flow: "60 mL/min",
    use: "Maintenance / induction",
    hue: 200,
  },
  {
    name: "14 G / RIC / trauma line",
    outerFr: 9,
    layout: "single",
    flow: ">500 mL/min (pressure-bag)",
    use: "Resus, massive transfusion",
    hue: 0,
  },
  {
    name: "Triple-lumen CVC (7 Fr)",
    outerFr: 7,
    layout: "triple",
    flow: "Distal 16 G ≈ 25 mL/min",
    use: "Vasopressors, CVP, TPN",
    hue: 350,
  },
  {
    name: "Vascath (12 Fr)",
    outerFr: 12,
    layout: "double",
    flow: "200–400 mL/min per lumen",
    use: "Haemodialysis, plasma exchange",
    hue: 150,
  },
  {
    name: "Swan introducer (8.5 Fr)",
    outerFr: 8.5,
    layout: "single",
    flow: "Single very wide bore (~10 Fr lumen)",
    use: "Conduit for PAC, rapid volume",
    hue: 40,
  },
];

export const VascularAccessCrossSectionDiagram: React.FC = () => {
  const W = 720;
  const cellW = W / CROSS_SECTIONS.length;
  const H = 240;
  const cy = 95;
  // Largest device sets the visual scale.
  const maxFr = Math.max(...CROSS_SECTIONS.map((c) => c.outerFr));
  const maxR = 36;

  return (
    <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Lumen geometry — why a CVC is not a resus line
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          End-on cross-sections drawn to scale (1 Fr = 0.33 mm OD). Maximum
          flow follows Hagen–Poiseuille — proportional to r⁴ and inversely
          proportional to length. A short, wide single lumen (14 G, RIC,
          introducer) outflows a long, narrow multi-lumen CVC by an order
          of magnitude.
        </p>
      </figcaption>
      <div className="p-3 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto min-w-[640px]"
          role="img"
          aria-label="Cross-sectional comparison of vascular access device lumens"
        >
          {CROSS_SECTIONS.map((c, i) => {
            const cx = i * cellW + cellW / 2;
            const r = (c.outerFr / maxFr) * maxR;
            const wallColor = `hsl(${c.hue} 30% 55%)`;
            const lumenFill = `hsl(${c.hue} 60% 92%)`;
            return (
              <g key={c.name}>
                {/* Outer wall */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={wallColor}
                  stroke="hsl(var(--foreground))"
                  strokeOpacity={0.4}
                  strokeWidth={0.8}
                />
                {/* Lumens */}
                {c.layout === "single" && (
                  <circle cx={cx} cy={cy} r={r * 0.78} fill={lumenFill} />
                )}
                {c.layout === "double" && (
                  <>
                    <path
                      d={`M ${cx} ${cy - r * 0.85} A ${r * 0.85} ${r * 0.85} 0 0 1 ${cx} ${
                        cy + r * 0.85
                      } Z`}
                      fill={lumenFill}
                    />
                    <path
                      d={`M ${cx} ${cy - r * 0.85} A ${r * 0.85} ${r * 0.85} 0 0 0 ${cx} ${
                        cy + r * 0.85
                      } Z`}
                      fill={`hsl(${c.hue} 40% 80%)`}
                    />
                    <line
                      x1={cx}
                      y1={cy - r * 0.85}
                      x2={cx}
                      y2={cy + r * 0.85}
                      stroke={wallColor}
                      strokeWidth={1.2}
                    />
                  </>
                )}
                {c.layout === "triple" && (
                  <>
                    {[0, 120, 240].map((deg, idx) => {
                      const rad = (deg * Math.PI) / 180;
                      const lx = cx + Math.cos(rad) * r * 0.4;
                      const ly = cy + Math.sin(rad) * r * 0.4;
                      const sizes = [0.36, 0.28, 0.28];
                      return (
                        <circle
                          key={deg}
                          cx={lx}
                          cy={ly}
                          r={r * sizes[idx]}
                          fill={lumenFill}
                          stroke={wallColor}
                          strokeWidth={0.6}
                        />
                      );
                    })}
                  </>
                )}

                {/* Label */}
                <text
                  x={cx}
                  y={cy + r + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill="hsl(var(--foreground))"
                >
                  {c.name}
                </text>
                <text
                  x={cx}
                  y={cy + r + 30}
                  textAnchor="middle"
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                >
                  {c.flow}
                </text>
                <text
                  x={cx}
                  y={cy + r + 44}
                  textAnchor="middle"
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                  fontStyle="italic"
                >
                  {c.use}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
};

export default VascularAccessDevicesDiagram;
