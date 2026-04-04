import { useState } from "react";

type StructureKey = "rib" | "scalene-tubercle" | "subclavian-vein" | "subclavian-artery" | "brachial-plexus" | "anterior-scalene" | "middle-scalene" | "scalenus-minimus" | "pleural-dome";

interface Structure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const structures: Record<StructureKey, Structure> = {
  rib: {
    label: "First Rib",
    color: "hsl(35, 40%, 55%)",
    detail: "Broadest, most curved, and shortest of the true ribs. Flattened with superior and inferior surfaces (not inner/outer like other ribs). Has a single articular facet on its head for T1 vertebra only. The scalene tubercle on its inner border divides it into anterior and posterior portions.",
    clinicalNote: "The first rib is a key landmark for subclavian vessel access, brachial plexus blocks, and thoracic outlet syndrome. Cervical rib (C7) is an anatomical variant causing TOS."
  },
  "scalene-tubercle": {
    label: "Scalene Tubercle",
    color: "hsl(50, 55%, 50%)",
    detail: "A raised ridge on the inner border of the first rib. It is the insertion point of scalenus anterior. It divides the superior surface into an anterior area (subclavian vein) and a posterior area (subclavian artery and brachial plexus trunks).",
    clinicalNote: "Critical landmark: the subclavian vein lies ANTERIOR to the scalene tubercle and the artery lies POSTERIOR. This relationship is constant and vital for safe vascular access."
  },
  "subclavian-vein": {
    label: "Subclavian Vein",
    color: "hsl(220, 60%, 55%)",
    detail: "Crosses the first rib ANTERIOR to the scalene tubercle (and scalenus anterior). Lies in the groove for the subclavian vein. Joins the IJV to form the brachiocephalic vein behind the sternoclavicular joint.",
    clinicalNote: "Subclavian vein cannulation: needle passes over first rib, anterior to scalenus anterior. Risk: pneumothorax (pleural dome), arterial puncture if needle too posterior."
  },
  "subclavian-artery": {
    label: "Subclavian Artery",
    color: "hsl(0, 60%, 50%)",
    detail: "Crosses the first rib POSTERIOR to the scalene tubercle, in the groove for the subclavian artery. Lies between scalenus anterior (anteriorly) and scalenus medius (posteriorly) — forming the interscalene groove.",
    clinicalNote: "Subclavian artery palpated in the interscalene groove above the first rib. Supraclavicular brachial plexus block target is lateral to the artery at the first rib."
  },
  "brachial-plexus": {
    label: "Brachial Plexus Trunks",
    color: "hsl(45, 65%, 50%)",
    detail: "The three trunks (superior C5-6, middle C7, inferior C8-T1) cross the first rib posterior to the subclavian artery, between scalenus anterior and medius. They are compact here — 'bundle of grapes' appearance on ultrasound.",
    clinicalNote: "Supraclavicular block: trunks/divisions at the first rib — 'spinal anaesthesia of the arm'. Highest success rate for complete upper limb block. Risk: pneumothorax (1%)."
  },
  "anterior-scalene": {
    label: "Scalenus Anterior",
    color: "hsl(0, 45%, 55%)",
    detail: "Inserts on the scalene tubercle of the first rib. Origin: anterior tubercles of C3-C6 transverse processes. The phrenic nerve runs on its anterior surface. Separates subclavian vein (anterior) from artery (posterior).",
    clinicalNote: "Scalenus anterior is the key dividing structure: vein in front, artery behind. Phrenic nerve on anterior surface — at risk during interscalene block (100% hemidiaphragm paresis)."
  },
  "middle-scalene": {
    label: "Scalenus Medius",
    color: "hsl(180, 40%, 50%)",
    detail: "Inserts on the superior surface of the first rib, posterior to the groove for the subclavian artery. Origin: posterior tubercles of C2-C7 transverse processes. Brachial plexus roots emerge between anterior and middle scalene.",
    clinicalNote: "The interscalene groove (between anterior and middle scalene) is the landmark for interscalene brachial plexus block at C6 level (Chassaignac's tubercle)."
  },
  "scalenus-minimus": {
    label: "Scalenus Minimus (Sibson's fascia)",
    color: "hsl(280, 40%, 55%)",
    detail: "An inconstant muscle (present in ~30–50%) from C7 transverse process to inner border of first rib and Sibson's fascia (suprapleural membrane). Sibson's fascia covers the pleural dome/lung apex.",
    clinicalNote: "Sibson's fascia is the suprapleural membrane protecting the lung apex. The pleural dome extends 2.5 cm above the medial third of the clavicle."
  },
  "pleural-dome": {
    label: "Pleural Dome (Lung Apex)",
    color: "hsl(160, 50%, 48%)",
    detail: "The cervical pleura and lung apex project above the first rib, extending ~2.5 cm above the medial third of the clavicle. Covered by Sibson's fascia. Lies medial to the scalene muscles.",
    clinicalNote: "Pleural dome at risk during subclavian vein cannulation, supraclavicular block, and internal jugular vein access. Pneumothorax is the principal complication."
  }
};

const structureOrder: StructureKey[] = [
  "rib", "scalene-tubercle", "anterior-scalene", "middle-scalene",
  "subclavian-vein", "subclavian-artery", "brachial-plexus",
  "pleural-dome", "scalenus-minimus"
];

const FirstRibDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("rib");
  const info = structures[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">First Rib — Superior View</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any structure to see anatomy and clinical relevance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 320 220" width="320" height="220" className="border border-border rounded">
            {/* First rib - curved bone */}
            <g className="cursor-pointer" onClick={() => setSelected("rib")}>
              <path d="M40,140 Q80,40 200,30 Q280,30 290,80"
                fill="none"
                stroke={structures.rib.color}
                strokeWidth={selected === "rib" ? 10 : 8}
                strokeLinecap="round"
                opacity={selected === "rib" ? 0.6 : 0.3} />
              {/* Head (medial) */}
              <circle cx="40" cy="140" r="6" fill={structures.rib.color} fillOpacity={selected === "rib" ? 0.5 : 0.25}
                stroke={structures.rib.color} strokeWidth="1" />
              <text x="20" y="155" fontSize="6" fill={structures.rib.color}>Head</text>
              <text x="20" y="162" fontSize="5" fill={structures.rib.color} opacity="0.7">(→ T1)</text>
            </g>

            {/* Scalene tubercle */}
            <g className="cursor-pointer" onClick={() => setSelected("scalene-tubercle")}>
              <circle cx="170" cy="33" r="6"
                fill={structures["scalene-tubercle"].color}
                fillOpacity={selected === "scalene-tubercle" ? 0.7 : 0.3}
                stroke={structures["scalene-tubercle"].color}
                strokeWidth={selected === "scalene-tubercle" ? 2 : 1} />
              <text x="160" y="22" fontSize="6" textAnchor="middle" fill={structures["scalene-tubercle"].color} fontWeight="bold">Scalene</text>
              <text x="160" y="14" fontSize="6" textAnchor="middle" fill={structures["scalene-tubercle"].color}>Tubercle</text>
            </g>

            {/* Subclavian vein - anterior to scalene tubercle */}
            <g className="cursor-pointer" onClick={() => setSelected("subclavian-vein")}>
              <path d="M120,45 Q145,30 195,30"
                fill="none"
                stroke={structures["subclavian-vein"].color}
                strokeWidth={selected === "subclavian-vein" ? 5 : 3}
                opacity={selected === "subclavian-vein" ? 0.7 : 0.35} />
              <text x="150" y="48" fontSize="6" textAnchor="middle" fill={structures["subclavian-vein"].color} fontWeight="bold">
                Subclavian V.
              </text>
              <text x="140" y="56" fontSize="5" textAnchor="middle" fill={structures["subclavian-vein"].color} opacity="0.7">(anterior)</text>
            </g>

            {/* Subclavian artery - posterior to scalene tubercle */}
            <g className="cursor-pointer" onClick={() => setSelected("subclavian-artery")}>
              <path d="M80,80 Q120,40 175,38 Q210,38 240,42"
                fill="none"
                stroke={structures["subclavian-artery"].color}
                strokeWidth={selected === "subclavian-artery" ? 4 : 2.5}
                opacity={selected === "subclavian-artery" ? 0.7 : 0.35} />
              <text x="230" y="55" fontSize="6" fill={structures["subclavian-artery"].color} fontWeight="bold">
                Subclavian A.
              </text>
              <text x="230" y="63" fontSize="5" fill={structures["subclavian-artery"].color} opacity="0.7">(posterior)</text>
            </g>

            {/* Brachial plexus trunks */}
            <g className="cursor-pointer" onClick={() => setSelected("brachial-plexus")}>
              {[0, 1, 2].map(i => (
                <circle key={i} cx={200 + i * 10} cy={43 + i * 3} r="3"
                  fill={structures["brachial-plexus"].color}
                  fillOpacity={selected === "brachial-plexus" ? 0.7 : 0.3}
                  stroke={structures["brachial-plexus"].color}
                  strokeWidth={selected === "brachial-plexus" ? 1.5 : 0.8} />
              ))}
              <text x="235" y="75" fontSize="5" fill={structures["brachial-plexus"].color} fontWeight="bold">Brachial</text>
              <text x="235" y="82" fontSize="5" fill={structures["brachial-plexus"].color}>Plexus</text>
            </g>

            {/* Scalenus anterior */}
            <g className="cursor-pointer" onClick={() => setSelected("anterior-scalene")}>
              <path d="M170,33 L140,80 L155,85 L170,33"
                fill={structures["anterior-scalene"].color}
                fillOpacity={selected === "anterior-scalene" ? 0.3 : 0.1}
                stroke={structures["anterior-scalene"].color}
                strokeWidth={selected === "anterior-scalene" ? 1.5 : 0.8} />
              <text x="135" y="95" fontSize="5" fill={structures["anterior-scalene"].color} fontWeight="bold">Scalenus</text>
              <text x="135" y="102" fontSize="5" fill={structures["anterior-scalene"].color}>Anterior</text>
            </g>

            {/* Scalenus medius */}
            <g className="cursor-pointer" onClick={() => setSelected("middle-scalene")}>
              <path d="M210,35 L195,85 L215,90 L225,40"
                fill={structures["middle-scalene"].color}
                fillOpacity={selected === "middle-scalene" ? 0.3 : 0.1}
                stroke={structures["middle-scalene"].color}
                strokeWidth={selected === "middle-scalene" ? 1.5 : 0.8} />
              <text x="205" y="98" fontSize="5" fill={structures["middle-scalene"].color} fontWeight="bold">Scalenus</text>
              <text x="205" y="105" fontSize="5" fill={structures["middle-scalene"].color}>Medius</text>
            </g>

            {/* Pleural dome */}
            <g className="cursor-pointer" onClick={() => setSelected("pleural-dome")}>
              <ellipse cx="90" cy="100" rx="35" ry="25"
                fill={structures["pleural-dome"].color}
                fillOpacity={selected === "pleural-dome" ? 0.25 : 0.08}
                stroke={structures["pleural-dome"].color}
                strokeWidth={selected === "pleural-dome" ? 1.5 : 0.8}
                strokeDasharray="4 2" />
              <text x="90" y="98" fontSize="5" textAnchor="middle" fill={structures["pleural-dome"].color} fontWeight="bold">Pleural</text>
              <text x="90" y="106" fontSize="5" textAnchor="middle" fill={structures["pleural-dome"].color}>Dome</text>
            </g>

            {/* Scalenus minimus / Sibson's fascia */}
            <g className="cursor-pointer" onClick={() => setSelected("scalenus-minimus")}>
              <path d="M95,70 Q100,90 90,110"
                fill="none"
                stroke={structures["scalenus-minimus"].color}
                strokeWidth={selected === "scalenus-minimus" ? 2 : 1}
                strokeDasharray="3 2"
                opacity={selected === "scalenus-minimus" ? 0.7 : 0.3} />
              <text x="60" y="75" fontSize="5" fill={structures["scalenus-minimus"].color}>Sibson's</text>
              <text x="60" y="82" fontSize="5" fill={structures["scalenus-minimus"].color}>fascia</text>
            </g>

            {/* Labels */}
            <text x="280" y="90" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">Lateral</text>
            <text x="15" y="130" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">Medial</text>
            <text x="130" y="10" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">Anterior</text>

            {/* Key relationship annotation */}
            <line x1="170" y1="38" x2="170" y2="195" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
            <text x="155" y="200" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5" textAnchor="middle">↑ Scalene tubercle line</text>
            <text x="125" y="210" fontSize="5" fill={structures["subclavian-vein"].color} opacity="0.5">Vein anterior ←</text>
            <text x="180" y="210" fontSize="5" fill={structures["subclavian-artery"].color} opacity="0.5">→ Artery posterior</text>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {structureOrder.map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`text-xs px-2 py-1 rounded border transition-all ${
                  selected === key
                    ? "border-primary bg-primary/10 text-foreground font-medium"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {structures[key].label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstRibDiagram;
