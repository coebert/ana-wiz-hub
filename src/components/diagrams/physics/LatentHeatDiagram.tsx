import { DiagramFigure } from "../_shared/DiagramFigure";
/**
 * LatentHeatDiagram
 *
 * Heating curve of 1 kg of water from −20 °C ice to >100 °C steam, plotted as
 * temperature (y) against cumulative energy added (x). The two flat plateaus
 * — fusion at 0 °C (334 kJ/kg) and vaporisation at 100 °C (2260 kJ/kg) — make
 * the concept of latent heat immediately visible: energy goes in, but
 * temperature does not change, because the energy is being used to break
 * intermolecular bonds during the phase change rather than to increase
 * molecular kinetic energy.
 */
const LatentHeatDiagram = () => {
  // Cumulative energies (kJ) along the curve for 1 kg of water:
  //  ice  −20 → 0 °C   :  20 °C × 2.10 kJ/kg/K = 42 kJ
  //  fusion at 0 °C    :  334 kJ
  //  water 0 → 100 °C  :  100 °C × 4.18 kJ/kg/K = 418 kJ
  //  vaporisation 100  :  2260 kJ
  //  steam 100 → 120   :  20 °C × 2.01 kJ/kg/K ≈ 40 kJ
  //  Total ≈ 3094 kJ
  const total = 3094;
  // SVG viewport
  const W = 720;
  const H = 360;
  const padL = 60;
  const padR = 24;
  const padT = 28;
  const padB = 56;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xMax = total;
  const yMin = -25;
  const yMax = 130;

  const x = (kJ: number) => padL + (kJ / xMax) * plotW;
  const y = (t: number) => padT + ((yMax - t) / (yMax - yMin)) * plotH;

  // Curve points (kJ cumulative, °C)
  const pts: Array<[number, number]> = [
    [0, -20],
    [42, 0], // ice warms to 0 °C
    [42 + 334, 0], // fusion plateau
    [42 + 334 + 418, 100], // water warms to 100 °C
    [42 + 334 + 418 + 2260, 100], // vaporisation plateau
    [total, 120], // steam warms to 120 °C
  ];
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p[0])} ${y(p[1])}`).join(" ");

  // Gridline values
  const yTicks = [-20, 0, 25, 50, 75, 100, 120];
  const xTicks = [0, 500, 1000, 1500, 2000, 2500, 3000];

  // Plateau midpoints for labels
  const fusionMidX = x(42 + 334 / 2);
  const vapMidX = x(42 + 334 + 418 + 2260 / 2);

  return (
    <DiagramFigure
      id="latent-heat-diagram"
      title="Latent heat"
      description="Auto-generated wrapper for the Latent heat anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <figure className="my-4 rounded-lg border border-border bg-card p-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Heating curve for 1 kg of water from −20 °C ice to 120 °C steam, showing flat plateaus at 0 °C (latent heat of fusion, 334 kJ/kg) and at 100 °C (latent heat of vaporisation, 2260 kJ/kg) where energy is added without any change in temperature."
          className="w-full h-auto"
        >
          {/* Axes */}
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth={1} />
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth={1} />
  
          {/* Gridlines + ticks */}
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line
                x1={padL}
                y1={y(t)}
                x2={W - padR}
                y2={y(t)}
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                strokeDasharray="2 3"
              />
              <text
                x={padL - 8}
                y={y(t) + 3}
                fontSize="10"
                textAnchor="end"
                fill="hsl(var(--muted-foreground))"
              >
                {t}
              </text>
            </g>
          ))}
          {xTicks.map((kJ) => (
            <g key={`x${kJ}`}>
              <line x1={x(kJ)} y1={H - padB} x2={x(kJ)} y2={H - padB + 4} stroke="hsl(var(--foreground))" />
              <text
                x={x(kJ)}
                y={H - padB + 16}
                fontSize="10"
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
              >
                {kJ}
              </text>
            </g>
          ))}
  
          {/* Axis titles */}
          <text x={W / 2} y={H - 8} fontSize="11" textAnchor="middle" fill="hsl(var(--foreground))">
            Energy added (kJ per kg)
          </text>
          <text
            x={14}
            y={padT + plotH / 2}
            fontSize="11"
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            transform={`rotate(-90 14 ${padT + plotH / 2})`}
          >
            Temperature (°C)
          </text>
  
          {/* Phase shading on x-axis */}
          {[
            { from: 0, to: 42, fill: "hsl(210 70% 88%)", label: "Ice" },
            { from: 42, to: 42 + 334, fill: "hsl(210 60% 75%)", label: "Ice + water" },
            { from: 42 + 334, to: 42 + 334 + 418, fill: "hsl(200 55% 80%)", label: "Water" },
            { from: 42 + 334 + 418, to: 42 + 334 + 418 + 2260, fill: "hsl(20 70% 82%)", label: "Water + steam" },
            { from: 42 + 334 + 418 + 2260, to: total, fill: "hsl(20 60% 75%)", label: "Steam" },
          ].map((band) => (
            <rect
              key={band.label}
              x={x(band.from)}
              y={H - padB - 8}
              width={x(band.to) - x(band.from)}
              height={6}
              fill={band.fill}
              opacity={0.85}
            />
          ))}
  
          {/* The heating curve */}
          <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />
  
          {/* Plateau highlight rectangles */}
          <rect
            x={x(42)}
            y={padT + 2}
            width={x(42 + 334) - x(42)}
            height={plotH - 4}
            fill="hsl(210 80% 60%)"
            opacity={0.08}
          />
          <rect
            x={x(42 + 334 + 418)}
            y={padT + 2}
            width={x(42 + 334 + 418 + 2260) - x(42 + 334 + 418)}
            height={plotH - 4}
            fill="hsl(20 80% 60%)"
            opacity={0.10}
          />
  
          {/* Plateau labels */}
          <text
            x={fusionMidX}
            y={y(0) - 12}
            fontSize="10.5"
            textAnchor="middle"
            fill="hsl(210 70% 35%)"
            fontWeight={600}
          >
            Latent heat of fusion
          </text>
          <text
            x={fusionMidX}
            y={y(0) + 14}
            fontSize="10"
            textAnchor="middle"
            fill="hsl(210 70% 35%)"
          >
            334 kJ/kg
          </text>
  
          <text
            x={vapMidX}
            y={y(100) - 12}
            fontSize="10.5"
            textAnchor="middle"
            fill="hsl(20 70% 35%)"
            fontWeight={600}
          >
            Latent heat of vaporisation
          </text>
          <text
            x={vapMidX}
            y={y(100) + 14}
            fontSize="10"
            textAnchor="middle"
            fill="hsl(20 70% 35%)"
          >
            2260 kJ/kg  (≈6.8× fusion)
          </text>
  
          {/* Slope (sensible-heat) annotations */}
          <text x={x(20)} y={y(-10)} fontSize="9" fill="hsl(var(--muted-foreground))">
            c<tspan dy="2" fontSize="7">ice</tspan>
            <tspan dy="-2"> 2.10 kJ/kg/°C</tspan>
          </text>
          <text x={x(42 + 334 + 50)} y={y(50)} fontSize="9" fill="hsl(var(--muted-foreground))">
            c<tspan dy="2" fontSize="7">water</tspan>
            <tspan dy="-2"> 4.18 kJ/kg/°C</tspan>
          </text>
          <text x={x(total - 240)} y={y(118)} fontSize="9" fill="hsl(var(--muted-foreground))">
            c<tspan dy="2" fontSize="7">steam</tspan>
            <tspan dy="-2"> 2.01 kJ/kg/°C</tspan>
          </text>
        </svg>
  
        <figcaption className="mt-3 text-xs text-muted-foreground leading-relaxed">
          Heating curve for 1 kg of water. On the sloped sections temperature rises in
          proportion to energy added (Q = m·c·ΔT — <strong>sensible heat</strong>). On the two
          plateaus, energy continues to be added but the temperature stays constant — the
          energy breaks intermolecular bonds and drives a <strong>phase change</strong>
          (<strong>latent heat</strong>: 334 kJ/kg to melt, 2260 kJ/kg to evaporate). The
          large vaporisation plateau is why sweating, evaporative surgical-field loss and
          cooling of vaporiser liquid are such powerful clinical heat-transfer mechanisms.
        </figcaption>
      </figure>
    </DiagramFigure>
  );
};

export default LatentHeatDiagram;
