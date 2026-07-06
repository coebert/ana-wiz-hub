import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";

/**
 * TTP pathophysiology — side-by-side schematic.
 *
 * Left panel (NORMAL): endothelial Weibel–Palade bodies release ultra-large
 *   vWF multimers; ADAMTS13 cleaves them into small inert fragments;
 *   platelets and RBCs flow freely through the microvessel.
 *
 * Right panel (TTP): autoantibody inhibits ADAMTS13; uncleaved ULvWF strings
 *   tether platelets into microthrombi; RBCs are sheared into schistocytes
 *   as they squeeze past, producing MAHA and end-organ ischaemia.
 *
 * Numbered steps (1 → 2 → 3) on each side reinforce the causal chain.
 */
const TTPPathophysiologyDiagram = () => {
  const id = "ttp-pathophys";

  // Re-usable bits
  const endothelium = (xStart: number, width: number) => (
    <>
      <rect
        x={xStart}
        y="48"
        width={width}
        height="22"
        rx="4"
        fill="hsl(var(--muted))"
        stroke="hsl(var(--border))"
      />
      {/* Weibel–Palade bodies */}
      {[xStart + width * 0.2, xStart + width * 0.5, xStart + width * 0.8].map((cx) => (
        <ellipse
          key={cx}
          cx={cx}
          cy="59"
          rx="6"
          ry="3"
          fill="hsl(var(--icu) / 0.55)"
          stroke="hsl(var(--icu))"
          strokeWidth="0.6"
        />
      ))}
    </>
  );

  const stepBadge = (cx: number, cy: number, n: number, tone: "ok" | "bad") => (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r="9"
        fill={tone === "ok" ? "hsl(142 70% 40%)" : "hsl(var(--destructive))"}
      />
      <text
        x={cx}
        y={cy + 3.5}
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        fill="hsl(var(--primary-foreground))"
      >
        {n}
      </text>
    </g>
  );

  return (
    <DiagramFigure
      id={id}
      title="TTP pathophysiology — ADAMTS13 deficiency drives microvascular thrombosis"
      description="Left: normal endothelial release of ultra-large vWF multimers, cleaved by ADAMTS13 into inert fragments — blood flows freely. Right: autoantibody blocks ADAMTS13, uncleaved ULvWF strings tether platelets into microthrombi, shearing red cells into schistocytes (MAHA) and causing end-organ ischaemia."
      showCaption
    >
      <svg
        viewBox="0 0 820 520"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>TTP pathophysiology — normal vs TTP</title>
        <desc id={`${id}-desc`}>
          Side-by-side comparison. On the left, ADAMTS13 cleaves ultra-large von Willebrand factor
          multimers released from endothelial Weibel–Palade bodies into inert fragments, allowing
          free platelet and red-cell flow. On the right, anti-ADAMTS13 IgG inhibits the protease,
          leaving uncleaved multimer strings that tether platelets into microthrombi and shear
          red cells into schistocytes.
        </desc>

        {/* Panel headers */}
        <g>
          <rect x="20" y="10" width="380" height="24" rx="4" fill="hsl(142 70% 40% / 0.12)" />
          <text x="210" y="27" textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(142 70% 30%)">
            NORMAL — ADAMTS13 active
          </text>
        </g>
        <g>
          <rect x="420" y="10" width="380" height="24" rx="4" fill="hsl(var(--destructive) / 0.12)" />
          <text x="610" y="27" textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(var(--destructive))">
            TTP — ADAMTS13 inhibited
          </text>
        </g>

        {/* Endothelial strips */}
        {endothelium(20, 380)}
        {endothelium(420, 380)}

        {/* Vertical divider */}
        <line
          x1="410"
          y1="10"
          x2="410"
          y2="410"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* ──────────── LEFT (NORMAL) ──────────── */}

        {/* Step 1 — release of ULvWF (short stub from endothelium) */}
        {stepBadge(60, 95, 1, "ok")}
        <text x="78" y="98" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
          ULvWF released
        </text>
        {[140, 220, 300].map((x) => (
          <path
            key={x}
            d={`M${x} 70 q6 14 0 28`}
            stroke="hsl(var(--icu))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="3 2"
          />
        ))}

        {/* Step 2 — ADAMTS13 scissors cleave */}
        {stepBadge(60, 155, 2, "ok")}
        <text x="78" y="158" fontSize="11" fill="hsl(142 70% 30%)" fontWeight="600">
          ADAMTS13 cleaves at A2 domain
        </text>
        <g transform="translate(220 158)">
          <text x="-8" y="0" fontSize="22" fill="hsl(142 70% 40%)">✂</text>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="220 158;226 158;220 158"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </g>

        {/* Step 3 — small inert fragments + free flow */}
        {stepBadge(60, 215, 3, "ok")}
        <text x="78" y="218" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
          Small inert vWF fragments
        </text>
        {[140, 200, 260, 320].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="232"
            x2={x + 14}
            y2="232"
            stroke="hsl(var(--icu) / 0.6)"
            strokeWidth="2"
          >
            <animate
              attributeName="x1"
              values={`${x};${x + 30}`}
              dur="3s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values={`${x + 14};${x + 44}`}
              dur="3s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Microvessel lumen — left */}
        <rect
          x="20"
          y="270"
          width="380"
          height="120"
          rx="8"
          fill="hsl(var(--background))"
          stroke="hsl(var(--border))"
        />
        <text x="30" y="288" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
          Microvascular lumen
        </text>
        {/* Free platelets */}
        {[80, 160, 240, 320].map((cx, i) => (
          <circle key={cx} cx={cx} cy="320" r="5" fill="hsl(38 92% 50%)">
            <animate
              attributeName="cx"
              values={`${cx};${cx + 80}`}
              dur="2.5s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* Intact RBCs (biconcave discs) */}
        {[100, 200, 300].map((cx, i) => (
          <ellipse key={cx} cx={cx} cy="358" rx="10" ry="6" fill="hsl(0 70% 50%)" stroke="hsl(0 60% 35%)" strokeWidth="0.6">
            <animate
              attributeName="cx"
              values={`${cx};${cx + 100}`}
              dur="3s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        ))}
        <text x="210" y="406" textAnchor="middle" fontSize="11" fill="hsl(142 70% 30%)" fontWeight="600">
          → no microthrombi · intact RBCs
        </text>

        {/* ──────────── RIGHT (TTP) ──────────── */}

        {/* Step 1 — same release */}
        {stepBadge(460, 95, 1, "bad")}
        <text x="478" y="98" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
          ULvWF released (same trigger)
        </text>

        {/* Step 2 — autoantibody blocks scissors */}
        {stepBadge(460, 155, 2, "bad")}
        <text x="478" y="158" fontSize="11" fill="hsl(var(--destructive))" fontWeight="600">
          Anti-ADAMTS13 IgG blocks protease
        </text>
        <g>
          <text x="612" y="166" fontSize="22" opacity="0.35" fill="hsl(var(--muted-foreground))">
            ✂
          </text>
          <line
            x1="600"
            y1="148"
            x2="640"
            y2="172"
            stroke="hsl(var(--destructive))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="650" y="166" fontSize="11" fontWeight="600" fill="hsl(var(--destructive))">
            blocked
          </text>
        </g>

        {/* Step 3 — uncleaved ULvWF strings tethering platelets */}
        {stepBadge(460, 215, 3, "bad")}
        <text x="478" y="218" fontSize="11" fill="hsl(var(--destructive))" fontWeight="600">
          ULvWF strings tether platelets → microthrombi
        </text>

        {/* Long uncleaved strings extending from endothelium into lumen */}
        {[500, 580, 660, 740].map((x, i) => (
          <g key={x}>
            <path
              d={`M${x} 70 Q${x + 10} 160 ${x - 4} 250 T${x + 6} 360`}
              stroke="hsl(var(--icu))"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="5 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-16"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </path>
            {/* Tethered platelets clumped along the string */}
            {[260, 295, 330].map((y, j) => (
              <circle
                key={j}
                cx={x + (j % 2 === 0 ? -6 : 7)}
                cy={y + i * 2}
                r="6"
                fill="hsl(38 92% 50%)"
                stroke="hsl(38 92% 35%)"
                strokeWidth="0.6"
              >
                <animate
                  attributeName="r"
                  values="5.5;7;5.5"
                  dur="1.4s"
                  begin={`${j * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))}

        {/* Microvessel lumen — right */}
        <rect
          x="420"
          y="270"
          width="380"
          height="120"
          rx="8"
          fill="hsl(var(--background))"
          stroke="hsl(var(--border))"
        />
        <text x="430" y="288" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
          Microvascular lumen — obstructed
        </text>

        {/* Schistocytes shearing past microthrombi */}
        {[460, 540, 620, 700, 760].map((cx, i) => (
          <g key={cx}>
            <path
              d={`M${cx} 360 l10 -6 l4 8 l-9 5 z`}
              fill="hsl(0 70% 50%)"
              stroke="hsl(0 60% 35%)"
              strokeWidth="0.6"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="80 0"
                dur="2.6s"
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
        <text x="610" y="406" textAnchor="middle" fontSize="11" fill="hsl(var(--destructive))" fontWeight="600">
          → microthrombi · schistocytes (MAHA) · ischaemia
        </text>

        {/* ──────────── ANIMATED CAUSAL FLOW CHAIN (TTP) ──────────── */}
        <defs>
          <marker
            id={`${id}-flow-arrow`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--destructive))" />
          </marker>
        </defs>

        <text
          x="20"
          y="440"
          fontSize="12"
          fontWeight="700"
          fill="hsl(var(--foreground))"
        >
          Causal cascade in TTP
        </text>

        {(() => {
          const nodes = [
            { x: 70, label: "ULvWF", sub: "uncleaved strings" },
            { x: 220, label: "Platelet", sub: "adhesion & aggregation" },
            { x: 390, label: "Microthrombi", sub: "in arterioles/capillaries" },
            { x: 560, label: "MAHA", sub: "RBC shear → schistocytes" },
            { x: 730, label: "End-organ", sub: "ischaemia (CNS, renal, cardiac)" },
          ];
          const nodeY = 475;
          return (
            <g>
              {/* Arrows between nodes */}
              {nodes.slice(0, -1).map((n, i) => {
                const next = nodes[i + 1];
                const x1 = n.x + 52;
                const x2 = next.x - 52;
                const pathId = `${id}-flow-path-${i}`;
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={nodeY}
                      x2={x2}
                      y2={nodeY}
                      stroke="hsl(var(--destructive))"
                      strokeWidth="2"
                      markerEnd={`url(#${id}-flow-arrow)`}
                    />
                    {/* Travelling particle */}
                    <circle r="3.5" fill="hsl(var(--destructive))">
                      <animate
                        attributeName="cx"
                        values={`${x1};${x2 - 6}`}
                        dur="2.4s"
                        begin={`${i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cy"
                        values={`${nodeY};${nodeY}`}
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        dur="2.4s"
                        begin={`${i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <use href={`#${pathId}`} />
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((n, i) => (
                <g key={n.label}>
                  <rect
                    x={n.x - 52}
                    y={nodeY - 18}
                    width="104"
                    height="36"
                    rx="8"
                    fill="hsl(var(--destructive) / 0.12)"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="fill"
                      values="hsl(var(--destructive) / 0.12);hsl(var(--destructive) / 0.28);hsl(var(--destructive) / 0.12)"
                      dur="2.4s"
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text
                    x={n.x}
                    y={nodeY - 2}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="hsl(var(--destructive))"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x}
                    y={nodeY + 11}
                    textAnchor="middle"
                    fontSize="9"
                    fill="hsl(var(--foreground))"
                  >
                    {n.sub}
                  </text>
                </g>
              ))}
            </g>
          );
        })()}
      </svg>

      {/* Compact legend */}
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "hsl(38 92% 50%)" }} /> Platelet
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-3 rounded-sm" style={{ background: "hsl(0 70% 50%)" }} /> RBC / schistocyte
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4" style={{ background: "hsl(var(--icu))" }} /> ULvWF multimer
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span style={{ color: "hsl(142 70% 40%)" }}>✂</span> ADAMTS13 active
        </span>
      </div>
    </DiagramFigure>
  );
};

export default TTPPathophysiologyDiagram;
