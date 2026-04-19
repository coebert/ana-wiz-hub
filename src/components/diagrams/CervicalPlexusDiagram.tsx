import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { PlexusCard, PlexusChipRow, PlexusDetailPanel, ROOT_COLORS } from "./plexusShared";

type BranchKey = "superficial" | "deep" | "phrenic" | "ansa";

interface BranchInfo {
  label: string;
  color: string;
  roots: string;
  description: string;
  clinical: string;
}

const branches: Record<BranchKey, BranchInfo> = {
  superficial: {
    label: "Superficial Cervical Plexus",
    color: "hsl(210, 55%, 55%)",
    roots: "C2–C4",
    description: "Emerges at posterior border of SCM (Erb's point). Four cutaneous branches: lesser occipital (C2), great auricular (C2,3), transverse cervical (C2,3), supraclavicular (C3,4).",
    clinical: "Superficial cervical plexus block at Erb's point (posterior SCM border, junction of upper 2/3 and lower 1/3). Single injection provides analgesia for carotid endarterectomy, thyroid surgery, clavicle fracture.",
  },
  deep: {
    label: "Deep Cervical Plexus",
    color: "hsl(0, 50%, 55%)",
    roots: "C1–C4",
    description: "Motor branches to prevertebral muscles (longus capitis/colli, rectus capitis). Communicates with CN XI and CN XII. C1 fibres travel with XII to thyrohyoid and geniohyoid.",
    clinical: "Deep cervical plexus block at C2–C4 transverse processes. Risks: phrenic nerve block (avoid bilateral), vertebral artery injection, subarachnoid injection, recurrent laryngeal nerve block. Largely replaced by superficial/intermediate approach.",
  },
  phrenic: {
    label: "Phrenic Nerve",
    color: "hsl(45, 70%, 50%)",
    roots: "C3, C4, C5",
    description: "Principal motor nerve to diaphragm (sole motor supply). Descends on anterior surface of scalenus anterior, crosses subclavian artery, enters thorax. Also sensory to central diaphragm, pericardium, mediastinal pleura.",
    clinical: "C3,4,5 keeps the diaphragm alive. Phrenic nerve palsy occurs with interscalene block (~100%), deep cervical plexus block, and high epidural/spinal. Avoid bilateral blocks. Relative contraindication in patients dependent on single lung function.",
  },
  ansa: {
    label: "Ansa Cervicalis",
    color: "hsl(140, 45%, 48%)",
    roots: "C1–C3",
    description: "Loop on anterior surface of carotid sheath. Superior root (C1 via XII) descends from hypoglossal nerve. Inferior root (C2,3) descends lateral to IJV. Supplies infrahyoid strap muscles: sternohyoid, sternothyroid, omohyoid (inf belly).",
    clinical: "Embedded in anterior wall of carotid sheath. Can be sacrificed during carotid surgery without significant deficit. Thyrohyoid and geniohyoid supplied by C1 via XII directly (not ansa).",
  },
};

const branchKeys: BranchKey[] = ["superficial", "deep", "phrenic", "ansa"];

const CervicalPlexusDiagram = () => {
  const [selected, setSelected] = useState<BranchKey>("superficial");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = branches[selected];

  // Spine x positions
  const spineX = 80;
  const rootStartX = spineX + 18;
  // Y positions for C1-C5 roots
  const rootY: Record<string, number> = { C1: 50, C2: 80, C3: 110, C4: 140, C5: 170 };

  return (
    <PlexusCard>
      <DiagramToggleBar
        title="Cervical Plexus (C1–C4)"
        subtitle="Tap a branch to see roots, anatomy, and clinical relevance"
        toggles={[
          { label: "Sutures", active: showSutures, onChange: () => setShowSutures(v => !v) },
          { label: "Labels", active: showLabels, onChange: () => setShowLabels(v => !v) },
        ]}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="10 15 320 200" width="340" height="215" className="border border-border rounded bg-card">
            {/* ─── Vertebral column ─── */}
            <g>
              {["C1", "C2", "C3", "C4", "C5"].map((level) => (
                <g key={level}>
                  <rect x={spineX - 14} y={rootY[level] - 10} width="28" height="20" rx="3"
                    fill="hsl(var(--muted))" stroke={ROOT_COLORS[level]} strokeWidth="1.25" />
                  <text x={spineX} y={rootY[level] + 4} fontSize="9" fill={ROOT_COLORS[level]}
                    textAnchor="middle" fontWeight="700">{level}</text>
                </g>
              ))}
              {/* Spinal cord */}
              <rect x={spineX - 5} y={35} width="10" height="155" rx="4"
                fill="hsl(var(--muted))" opacity="0.3" />
            </g>

            {/* ─── Ventral rami emerging ─── */}
            {["C1", "C2", "C3", "C4", "C5"].map((level) => (
              <line key={level} x1={rootStartX} y1={rootY[level]} x2={rootStartX + 25} y2={rootY[level]}
                stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.3" />
            ))}

            {/* ─── SCM reference (vertical dashed) ─── */}
            {showSutures && (
              <>
                <line x1="195" y1="30" x2="195" y2="195" stroke="hsl(var(--foreground))" strokeWidth="1.5"
                  opacity="0.12" strokeDasharray="5 3" />
                {showLabels && (
                  <text x="198" y="38" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">SCM post. border</text>
                )}
              </>
            )}

            {/* ═══ SUPERFICIAL CERVICAL PLEXUS ═══ */}
            <g opacity={selected === "superficial" ? 1 : 0.3} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("superficial")}>
              {/* Erb's point */}
              <circle cx="195" cy="95" r="5" fill="none" stroke={branches.superficial.color}
                strokeWidth={selected === "superficial" ? 2 : 1} />
              <circle cx="195" cy="95" r="2" fill={branches.superficial.color} opacity="0.6" />
              {selected === "superficial" && (
                <text x="203" y="92" fontSize="5.5" fill={branches.superficial.color} fontWeight="500">Erb's point</text>
              )}

              {/* Converging roots C2,3,4 → Erb's point */}
              <path d={`M${rootStartX + 25},${rootY.C2} C140,${rootY.C2} 170,90 195,95`}
                stroke={branches.superficial.color} strokeWidth="1.5" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C3} C145,${rootY.C3} 175,100 195,95`}
                stroke={branches.superficial.color} strokeWidth="1.5" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C4} C150,130 180,105 195,95`}
                stroke={branches.superficial.color} strokeWidth="1.2" fill="none" opacity="0.7" />

              {/* 4 cutaneous branches fanning out */}
              {/* Lesser occipital (C2) — up & back */}
              <path d="M195,95 C210,80 225,60 240,45" stroke={branches.superficial.color}
                strokeWidth="1.3" fill="none" />
              <text x="242" y="44" fontSize="5.5" fill={branches.superficial.color}>Lesser occipital (C2)</text>

              {/* Great auricular (C2,3) — up to ear */}
              <path d="M195,95 C215,85 230,75 245,65" stroke={branches.superficial.color}
                strokeWidth="1.3" fill="none" />
              <text x="247" y="64" fontSize="5.5" fill={branches.superficial.color}>Great auricular (C2,3)</text>

              {/* Transverse cervical (C2,3) — forward */}
              <path d="M195,95 C215,95 235,95 260,95" stroke={branches.superficial.color}
                strokeWidth="1.3" fill="none" />
              <text x="262" y="94" fontSize="5.5" fill={branches.superficial.color}>Transverse cervical (C2,3)</text>

              {/* Supraclavicular (C3,4) — down */}
              <path d="M195,95 C210,115 225,140 245,165" stroke={branches.superficial.color}
                strokeWidth="1.3" fill="none" />
              <text x="247" y="164" fontSize="5.5" fill={branches.superficial.color}>Supraclavicular (C3,4)</text>
            </g>

            {/* ═══ DEEP CERVICAL PLEXUS ═══ */}
            <g opacity={selected === "deep" ? 1 : 0.15} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("deep")}>
              {/* Deep branches — short motor branches to prevertebral muscles */}
              <path d={`M${rootStartX + 25},${rootY.C1} L140,${rootY.C1}`}
                stroke={branches.deep.color} strokeWidth="2" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C2} L140,${rootY.C2}`}
                stroke={branches.deep.color} strokeWidth="2" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C3} L140,${rootY.C3}`}
                stroke={branches.deep.color} strokeWidth="2" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C4} L140,${rootY.C4}`}
                stroke={branches.deep.color} strokeWidth="2" fill="none" />
              {/* Motor to prevertebral */}
              <rect x="142" y="42" width="40" height="108" rx="5" fill={branches.deep.color}
                fillOpacity="0.08" stroke={branches.deep.color} strokeWidth="0.8" strokeDasharray="3 2" />
              {selected === "deep" && (
                <text x="162" y="100" fontSize="5" fill={branches.deep.color} textAnchor="middle"
                  fontWeight="500">Prevertebral mm.</text>
              )}
            </g>

            {/* ═══ PHRENIC NERVE ═══ */}
            <g opacity={selected === "phrenic" ? 1 : 0.25} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("phrenic")}>
              {/* C3,4,5 contributions */}
              <path d={`M${rootStartX + 25},${rootY.C3} C130,${rootY.C3} 138,120 142,125`}
                stroke={branches.phrenic.color} strokeWidth="1.3" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C4} C130,${rootY.C4} 138,135 142,125`}
                stroke={branches.phrenic.color} strokeWidth="1.8" fill="none" />
              <path d={`M${rootStartX + 25},${rootY.C5} C130,160 138,145 142,125`}
                stroke={branches.phrenic.color} strokeWidth="1.3" fill="none" />
              {/* Descending on scalenus anterior */}
              <path d="M142,125 C140,140 138,155 136,170 C134,180 132,190 130,200"
                stroke={branches.phrenic.color} strokeWidth="2.5" fill="none" />
              {/* Arrow to diaphragm */}
              <polygon points="128,200 132,200 130,207" fill={branches.phrenic.color} />
              {selected === "phrenic" && <>
                <text x="118" y="185" fontSize="5.5" fill={branches.phrenic.color} fontWeight="600">Phrenic n.</text>
                <text x="112" y="192" fontSize="4.5" fill={branches.phrenic.color} opacity="0.7">(C3,4,5)</text>
                <text x="108" y="210" fontSize="5" fill={branches.phrenic.color} opacity="0.5">→ Diaphragm</text>
                {/* Scalenus anterior reference */}
                <rect x="135" y="125" width="14" height="70" rx="3" fill={branches.phrenic.color}
                  fillOpacity="0.06" stroke={branches.phrenic.color} strokeWidth="0.5" strokeDasharray="2 2" />
                <text x="152" y="160" fontSize="4.5" fill={branches.phrenic.color} opacity="0.5">Scalenus ant.</text>
              </>}
            </g>

            {/* ═══ ANSA CERVICALIS ═══ */}
            <g opacity={selected === "ansa" ? 1 : 0.15} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("ansa")}>
              {/* Superior root (C1 via XII) */}
              <path d={`M${rootStartX + 25},${rootY.C1} C140,45 160,42 180,40`}
                stroke={branches.ansa.color} strokeWidth="1.5" fill="none" />
              <text x="182" y="39" fontSize="4.5" fill={branches.ansa.color} opacity={selected === "ansa" ? 0.7 : 0.3}>via CN XII</text>
              {/* Descending loop */}
              <path d="M180,40 C185,55 188,75 186,95 C184,115 178,130 170,140"
                stroke={branches.ansa.color} strokeWidth="2" fill="none" />

              {/* Inferior root (C2,3) */}
              <path d={`M${rootStartX + 25},${rootY.C2} C140,80 155,100 160,120 C165,135 168,140 170,140`}
                stroke={branches.ansa.color} strokeWidth="1.5" fill="none" />

              {/* Ansa loop marker */}
              <circle cx="170" cy="140" r="3" fill={branches.ansa.color} fillOpacity="0.3"
                stroke={branches.ansa.color} strokeWidth="1" />

              {selected === "ansa" && <>
                <text x="174" y="138" fontSize="5" fill={branches.ansa.color} fontWeight="500">Ansa cervicalis</text>
                {/* Branches to strap muscles */}
                <path d="M170,140 L200,150" stroke={branches.ansa.color} strokeWidth="1" fill="none" />
                <text x="202" y="149" fontSize="4.5" fill={branches.ansa.color}>Sternohyoid</text>
                <path d="M170,140 L200,160" stroke={branches.ansa.color} strokeWidth="1" fill="none" />
                <text x="202" y="159" fontSize="4.5" fill={branches.ansa.color}>Sternothyroid</text>
                <path d="M170,140 L200,170" stroke={branches.ansa.color} strokeWidth="1" fill="none" />
                <text x="202" y="169" fontSize="4.5" fill={branches.ansa.color}>Omohyoid (inf)</text>
                {/* Superior root label */}
                <text x="188" y="55" fontSize="4" fill={branches.ansa.color} opacity="0.6">Sup. root (C1)</text>
                <text x="145" y="115" fontSize="4" fill={branches.ansa.color} opacity="0.6">Inf. root (C2,3)</text>
              </>}
            </g>

            {/* Root labels */}
            {showLabels && (
              <g fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4" className="select-none pointer-events-none">
                <text x="38" y="54" textAnchor="middle">C1</text>
                <text x="38" y="84" textAnchor="middle">C2</text>
                <text x="38" y="114" textAnchor="middle">C3</text>
                <text x="38" y="144" textAnchor="middle">C4</text>
                <text x="38" y="174" textAnchor="middle">C5</text>
              </g>
            )}
          </svg>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <PlexusDetailPanel
            reactKey={selected}
            title={info.label}
            roots={info.roots}
            region={
              selected === "superficial"
                ? "Superficial"
                : selected === "deep"
                ? "Deep"
                : selected === "phrenic"
                ? "Phrenic"
                : "Ansa"
            }
            accent={info.color}
            fields={[
              { label: "Anatomy", value: info.description },
              { label: "Clinical", value: info.clinical },
            ]}
          />

          <PlexusChipRow<BranchKey>
            selected={selected}
            onSelect={setSelected}
            items={branchKeys.map((k) => ({
              key: k,
              color: branches[k].color,
              label: branches[k].label.replace("Cervical Plexus", "CP").replace("Nerve", "N."),
            }))}
          />
        </div>
      </div>
    </PlexusCard>
  );
};

export default CervicalPlexusDiagram;
