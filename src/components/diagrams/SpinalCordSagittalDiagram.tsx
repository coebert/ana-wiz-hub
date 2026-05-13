import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

const SpinalCordSagittalDiagram = () => {
  const [highlight, setHighlight] = useState<string | null>(null);
  const [showSutures, setShowSutures] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Vertebral levels with y-coordinates (top of vertebra)
  const vertebrae = [
    { label: "C1", y: 50 },
    { label: "C2", y: 70 },
    { label: "C3", y: 90 },
    { label: "C4", y: 110 },
    { label: "C5", y: 130 },
    { label: "C6", y: 150 },
    { label: "C7", y: 170 },
    { label: "T1", y: 195 },
    { label: "T2", y: 215 },
    { label: "T3", y: 235 },
    { label: "T4", y: 255 },
    { label: "T5", y: 275 },
    { label: "T6", y: 295 },
    { label: "T7", y: 315 },
    { label: "T8", y: 335 },
    { label: "T9", y: 355 },
    { label: "T10", y: 375 },
    { label: "T11", y: 395 },
    { label: "T12", y: 415 },
    { label: "L1", y: 440 },
    { label: "L2", y: 465 },
    { label: "L3", y: 490 },
    { label: "L4", y: 515 },
    { label: "L5", y: 540 },
    { label: "S1", y: 565 },
    { label: "S2", y: 580 },
    { label: "S3", y: 595 },
    { label: "S4", y: 608 },
    { label: "S5", y: 620 },
  ];

  // Dermatome landmarks (clinically iconic levels)
  const dermatomes = [
    { level: "C4", landmark: "Shoulder tip / clavicle", y: 110 },
    { level: "C6", landmark: "Thumb", y: 150 },
    { level: "C7", landmark: "Middle finger", y: 170 },
    { level: "C8", landmark: "Little finger", y: 185 },
    { level: "T4", landmark: "Nipple line", y: 255 },
    { level: "T6", landmark: "Xiphisternum", y: 295 },
    { level: "T10", landmark: "Umbilicus", y: 375 },
    { level: "L1", landmark: "Inguinal ligament", y: 440 },
    { level: "L3", landmark: "Medial knee", y: 490 },
    { level: "L4", landmark: "Medial malleolus", y: 515 },
    { level: "L5", landmark: "Dorsum of foot / great toe", y: 540 },
    { level: "S1", landmark: "Lateral foot / little toe", y: 565 },
    { level: "S2-4", landmark: "Perineum / saddle area", y: 595 },
  ];

  // Spinal cord goes from foramen magnum (~y=45) and ends at conus L1/2 (~y=452)
  const cordTop = 45;
  const conusEnd = 452;
  const filumEnd = 580; // filum terminale to S2
  const cordX = 200;
  const cordWidth = 14;

  // Cervical and lumbar enlargements
  // Cervical enlargement C5-T1 (y 130-195), Lumbar enlargement T11-L1 (y 395-440)
  const isHL = (k: string) => highlight === k;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Sagittal View — Spinal Cord, Dermatome Levels, Conus, Cauda Equina & Adamkiewicz"
          subtitle="Hover key structures in the side panel"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_auto] gap-4 items-start">
          <div className="overflow-x-auto">
            <svg viewBox="0 0 480 680" className="w-full h-auto max-w-[480px] mx-auto" role="img" aria-label="Sagittal spinal cord diagram">
              {/* Background skin / body outline (very light) */}
              <path
                d="M 100 30 Q 90 200 95 400 Q 100 550 110 660 L 130 660 Q 125 550 120 400 Q 115 200 125 30 Z"
                fill="hsl(var(--muted))"
                opacity="0.25"
              />

              {/* Vertebral column outline (posterior) */}
              <path
                d="M 230 35 L 270 35 L 270 640 L 230 640 Z"
                fill="hsl(var(--muted))"
                opacity="0.4"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />

              {/* Individual vertebrae as horizontal divisions */}
              {vertebrae.map((v, i) => (
                <line
                  key={`vline-${i}`}
                  x1="230"
                  y1={v.y}
                  x2="270"
                  y2={v.y}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              ))}

              {/* Spinal canal (slight indent within vertebrae) */}
              <rect
                x="190"
                y={cordTop}
                width="30"
                height={620 - cordTop}
                fill="hsl(var(--background))"
                opacity="0.5"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />

              {/* Spinal cord proper - widens at cervical and lumbar enlargements */}
              <path
                d={`
                  M ${cordX - cordWidth / 2} ${cordTop}
                  L ${cordX - cordWidth / 2} 125
                  Q ${cordX - cordWidth / 2 - 4} 165, ${cordX - cordWidth / 2} 200
                  L ${cordX - cordWidth / 2} 390
                  Q ${cordX - cordWidth / 2 - 3} 420, ${cordX - cordWidth / 2} 440
                  L ${cordX - cordWidth / 2 + 4} ${conusEnd}
                  L ${cordX + cordWidth / 2 - 4} ${conusEnd}
                  L ${cordX + cordWidth / 2} 440
                  Q ${cordX + cordWidth / 2 + 3} 420, ${cordX + cordWidth / 2} 390
                  L ${cordX + cordWidth / 2} 200
                  Q ${cordX + cordWidth / 2 + 4} 165, ${cordX + cordWidth / 2} 125
                  L ${cordX + cordWidth / 2} ${cordTop}
                  Z
                `}
                fill="hsl(var(--anatomy) / 0.25)"
                stroke="hsl(var(--anatomy))"
                strokeWidth="1.5"
                style={{ opacity: isHL("cord") || !highlight ? 1 : 0.4 }}
              />

              {/* Cervical enlargement label */}
              <line x1={cordX - 12} y1="160" x2="155" y2="160" stroke="hsl(var(--anatomy))" strokeWidth="0.75" />
              <text x="150" y="163" textAnchor="end" fontSize="9" fill="hsl(var(--anatomy))" fontWeight="600">
                Cervical enlargement
              </text>
              <text x="150" y="174" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                (C5–T1, brachial plexus)
              </text>

              {/* Lumbar enlargement label */}
              <line x1={cordX - 12} y1="415" x2="155" y2="415" stroke="hsl(var(--anatomy))" strokeWidth="0.75" />
              <text x="150" y="418" textAnchor="end" fontSize="9" fill="hsl(var(--anatomy))" fontWeight="600">
                Lumbosacral enlargement
              </text>
              <text x="150" y="429" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                (L1–S3, lumbosacral plexus)
              </text>

              {/* Conus medullaris highlight */}
              <ellipse
                cx={cordX}
                cy={conusEnd - 4}
                rx="10"
                ry="8"
                fill={isHL("conus") ? "hsl(var(--primary))" : "hsl(var(--anatomy))"}
                opacity={isHL("conus") || !highlight ? 0.9 : 0.5}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHighlight("conus")}
                onMouseLeave={() => setHighlight(null)}
              />
              <line x1={cordX + 12} y1={conusEnd} x2="340" y2={conusEnd} stroke="hsl(var(--foreground))" strokeWidth="0.75" />
              <text x="345" y={conusEnd - 2} fontSize="10" fill="hsl(var(--foreground))" fontWeight="700">
                Conus medullaris
              </text>
              <text x="345" y={conusEnd + 9} fontSize="8" fill="hsl(var(--muted-foreground))">
                ends L1/L2 (adult)
              </text>
              <text x="345" y={conusEnd + 19} fontSize="8" fill="hsl(var(--muted-foreground))">
                L3 in neonate
              </text>

              {/* Cauda equina - nerve roots fanning out below conus */}
              <g
                style={{ cursor: "pointer", opacity: isHL("cauda") || !highlight ? 1 : 0.4 }}
                onMouseEnter={() => setHighlight("cauda")}
                onMouseLeave={() => setHighlight(null)}
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const startX = cordX - 4 + (i * 8) / 11;
                  const endX = 188 + (i * 24) / 11;
                  const endY = filumEnd + 10 + (i % 3) * 10;
                  return (
                    <path
                      key={`cauda-${i}`}
                      d={`M ${startX} ${conusEnd} Q ${startX - 2} ${(conusEnd + endY) / 2}, ${endX} ${endY}`}
                      stroke={isHL("cauda") ? "hsl(var(--primary))" : "hsl(var(--anatomy))"}
                      strokeWidth="1"
                      fill="none"
                    />
                  );
                })}
              </g>
              <line x1="218" y1="555" x2="345" y2="555" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
              <text x="345" y="553" fontSize="10" fill="hsl(var(--foreground))" fontWeight="700">
                Cauda equina
              </text>
              <text x="345" y="564" fontSize="8" fill="hsl(var(--muted-foreground))">
                L2–S5 nerve roots
              </text>
              <text x="345" y="574" fontSize="8" fill="hsl(var(--muted-foreground))">
                in CSF — safe target
              </text>

              {/* Filum terminale */}
              <line x1={cordX} y1={conusEnd} x2={cordX} y2={filumEnd} stroke="hsl(var(--anatomy))" strokeWidth="1" strokeDasharray="3 2" />
              <text x={cordX + 4} y={(conusEnd + filumEnd) / 2} fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic">
                filum terminale
              </text>

              {/* Dural sac termination at S2 */}
              <line x1="180" y1="580" x2="220" y2="580" stroke="hsl(var(--anatomy))" strokeWidth="1.5" />
              <line x1="178" y1="580" x2="155" y2="610" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
              <text x="150" y="615" textAnchor="end" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">
                Dural sac ends S2
              </text>

              {/* Artery of Adamkiewicz - enters T9-T12 (usually left, drawn from left side) */}
              <g
                style={{ cursor: "pointer", opacity: isHL("adam") || !highlight ? 1 : 0.4 }}
                onMouseEnter={() => setHighlight("adam")}
                onMouseLeave={() => setHighlight(null)}
              >
                {/* Hairpin loop characteristic of Adamkiewicz */}
                <path
                  d={`M 50 380 Q 100 380, 140 375 Q 175 372, 195 372 L 200 372 L 195 365 L 200 372 L 195 379`}
                  stroke="hsl(var(--destructive))"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="50" cy="380" r="3" fill="hsl(var(--destructive))" />
              </g>
              <text x="48" y="395" textAnchor="end" fontSize="9" fill="hsl(var(--destructive))" fontWeight="700">
                Artery of Adamkiewicz
              </text>
              <text x="48" y="406" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                T9–T12 (75% left)
              </text>
              <text x="48" y="416" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                supplies anterior 2/3 cord
              </text>

              {/* Vertebral level labels (left of column) */}
              {vertebrae.filter((_, i) => ["C1", "C7", "T1", "T4", "T6", "T9", "T10", "T12", "L1", "L3", "L5", "S1", "S2"].includes(vertebrae[i].label)).map((v) => (
                <text key={`vlbl-${v.label}`} x="276" y={v.y + 4} fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">
                  {v.label}
                </text>
              ))}

              {/* Dermatome landmarks - tick marks on the right with labels */}
              {dermatomes.map((d, i) => (
                <g key={`derm-${i}`}>
                  <line
                    x1="295"
                    y1={d.y}
                    x2="310"
                    y2={d.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <circle cx="312" cy={d.y} r="2" fill="hsl(var(--primary))" />
                  <text x="318" y={d.y - 3} fontSize="9" fill="hsl(var(--primary))" fontWeight="700">
                    {d.level}
                  </text>
                  <text x="318" y={d.y + 7} fontSize="8" fill="hsl(var(--muted-foreground))">
                    {d.landmark}
                  </text>
                </g>
              ))}

              {/* Title strip */}
              <text x="240" y="20" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="700">
                Sagittal Spinal Cord (adult)
              </text>
              <text x="240" y="32" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                Anterior ←      → Posterior
              </text>

              {/* Foramen magnum marker */}
              <line x1="180" y1="40" x2="220" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <text x="178" y="38" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">
                Foramen magnum
              </text>
            </svg>
          </div>

          {/* Legend / interactive panel */}
          <div className="space-y-2 lg:w-56">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Hover key structures</p>
            <button
              onClick={() => setHighlight(highlight === "cord" ? null : "cord")}
              onMouseEnter={() => setHighlight("cord")}
              onMouseLeave={() => setHighlight(null)}
              className="w-full text-left p-2 rounded border border-border hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(var(--anatomy))" }} />
                <span className="text-xs font-semibold text-foreground">Spinal cord</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Foramen magnum → L1/2. Cervical & lumbar enlargements give plexus roots.</p>
            </button>

            <button
              onMouseEnter={() => setHighlight("conus")}
              onMouseLeave={() => setHighlight(null)}
              className="w-full text-left p-2 rounded border border-border hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--anatomy))" }} />
                <span className="text-xs font-semibold text-foreground">Conus medullaris</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Adult: L1/2. Neonate: L3. Spinal needle below this level (L3/4 or L4/5).</p>
            </button>

            <button
              onMouseEnter={() => setHighlight("cauda")}
              onMouseLeave={() => setHighlight(null)}
              className="w-full text-left p-2 rounded border border-border hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(var(--anatomy))" }} />
                <span className="text-xs font-semibold text-foreground">Cauda equina</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">L2–S5 roots floating in CSF — mobile, deflect from needle. Dural sac ends S2.</p>
            </button>

            <button
              onMouseEnter={() => setHighlight("adam")}
              onMouseLeave={() => setHighlight(null)}
              className="w-full text-left p-2 rounded border border-border hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(var(--destructive))" }} />
                <span className="text-xs font-semibold text-foreground">Artery of Adamkiewicz</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Largest radicular artery. T9–T12 in 75%, left-sided in 75%. Reinforces anterior spinal artery — at risk in TAAA repair, aortic cross-clamp.</p>
            </button>

            <div className="p-2 rounded border border-primary/30 bg-primary/5">
              <p className="text-[10px] font-semibold text-foreground mb-1">Clinical pearls</p>
              <ul className="text-[10px] text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>T4 = nipple, T10 = umbilicus, L1 = inguinal — block height landmarks</li>
                <li>Spinal block to T4 needed for C-section</li>
                <li>Anterior spinal artery syndrome → motor + spinothalamic loss, dorsal columns spared</li>
                <li>Tuffier's line (iliac crests) = L4 / L3-4 interspace</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinalCordSagittalDiagram;
