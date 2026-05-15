import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";

/**
 * TTP pathophysiology — animated schematic.
 *
 * Top: endothelial Weibel-Palade body releases ultra-large vWF multimers.
 * Middle: ADAMTS13 (scissors) normally cleaves them into small, inert
 *         multimers. Anti-ADAMTS13 IgG blocks the scissors.
 * Bottom: uncleaved ULvWF strings tether platelets in the microvasculature
 *         → microthrombi → schistocyte formation across the fibrin strands.
 */
const TTPPathophysiologyDiagram = () => {
  const id = "ttp-pathophys";
  return (
    <DiagramFigure
      id={id}
      title="TTP pathophysiology — ADAMTS13 deficiency drives microvascular thrombosis"
      description="Endothelial release of ultra-large vWF multimers, normally cleaved by ADAMTS13. Autoantibody inhibition leaves uncleaved ULvWF strings that tether platelets, producing microthrombi, schistocytes and end-organ ischaemia."
      showCaption
    >
      <svg
        viewBox="0 0 820 360"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>TTP pathophysiology</title>
        <desc id={`${id}-desc`}>
          ADAMTS13 deficiency leaves ultra-large von Willebrand factor multimers uncleaved on
          endothelium, tethering platelets into microvascular thrombi.
        </desc>

        {/* Endothelial strip */}
        <rect x="20" y="40" width="780" height="40" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <text x="30" y="32" fontSize="12" fill="hsl(var(--foreground))" fontWeight="600">
          Endothelium (Weibel–Palade bodies release ULvWF)
        </text>

        {/* ULvWF strings — animated extension */}
        {[120, 280, 440, 600].map((x, i) => (
          <g key={x}>
            <path
              d={`M${x} 80 Q${x + 20} 140 ${x} 200 T${x + 5} 280`}
              stroke="hsl(var(--icu))"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="4 3"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.6s" repeatCount="indefinite" />
            </path>
            {/* Tethered platelets */}
            {[110, 170, 230].map((y, j) => (
              <circle key={j} cx={x + (j % 2 === 0 ? -6 : 8)} cy={y + i * 4} r="6" fill="hsl(var(--warn, 38 92% 50%))">
                <animate attributeName="r" values="5;7;5" dur="1.4s" begin={`${j * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        ))}

        {/* Scissors — ADAMTS13 (active on left, inhibited on right) */}
        <g transform="translate(200 150)">
          <text x="-50" y="-18" fontSize="11" fill="hsl(var(--success, 142 70% 40%))" fontWeight="600">
            ADAMTS13 cleaves ULvWF
          </text>
          <text x="-30" y="0" fontSize="22">✂</text>
          <animateTransform attributeName="transform" type="translate" values="200 150;205 150;200 150" dur="1s" repeatCount="indefinite" additive="sum" />
        </g>

        <g transform="translate(560 150)">
          <text x="-30" y="-18" fontSize="11" fill="hsl(var(--destructive))" fontWeight="600">
            Anti-ADAMTS13 IgG blocks scissors
          </text>
          <text x="-30" y="0" fontSize="22" opacity="0.4">✂</text>
          <line x1="-40" y1="-15" x2="0" y2="15" stroke="hsl(var(--destructive))" strokeWidth="3" />
        </g>

        {/* Microvessel lumen */}
        <rect x="20" y="270" width="780" height="70" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
        <text x="30" y="262" fontSize="12" fill="hsl(var(--foreground))" fontWeight="600">
          Microvascular lumen — platelet microthrombi + schistocytes (MAHA)
        </text>

        {/* Schistocytes (fragmented RBCs flowing) */}
        {[60, 180, 340, 500, 680].map((cx, i) => (
          <g key={cx}>
            <path
              d={`M${cx} 305 l10 -6 l6 8 l-8 6 z`}
              fill="hsl(0 70% 50%)"
              stroke="hsl(0 60% 35%)"
              strokeWidth="0.5"
            >
              <animate attributeName="transform" attributeType="XML" type="translate" from="0 0" to="120 0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </path>
          </g>
        ))}
      </svg>
    </DiagramFigure>
  );
};

export default TTPPathophysiologyDiagram;
