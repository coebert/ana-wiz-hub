import { useState } from "react";

type RegionKey = "vertebral-body" | "transverse-process" | "superior-costotransverse" | "parietal-pleura" | "pvs-contents" | "spinal-nerve" | "sympathetic-chain" | "epidural-comm" | "intercostal-ext";

interface Region {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const regions: Record<RegionKey, Region> = {
  "vertebral-body": {
    label: "Vertebral Body & Disc",
    color: "hsl(35, 40%, 55%)",
    detail: "Medial wall of the paravertebral space. The vertebral body and intervertebral disc form the bony medial boundary. The intervertebral foramen opens medially, connecting to the epidural space.",
    clinicalNote: "Local anaesthetic can spread medially through the intervertebral foramen into the epidural space — risk of bilateral block or epidural effects."
  },
  "transverse-process": {
    label: "Transverse Process",
    color: "hsl(30, 45%, 50%)",
    detail: "Posterior boundary. The transverse process and superior costotransverse ligament form the posterior wall. The tip of the transverse process is the landmark for needle contact (typically 2.5 cm lateral to midline).",
    clinicalNote: "Needle contact with transverse process at ~2–4 cm depth. Walk off the inferior edge and advance 1–1.5 cm to enter the paravertebral space."
  },
  "superior-costotransverse": {
    label: "Superior Costotransverse Ligament",
    color: "hsl(50, 50%, 50%)",
    detail: "A key posterior boundary connecting the neck of the rib to the transverse process above. This ligament provides the characteristic 'loss of resistance' or 'pop' when performing paravertebral block.",
    clinicalNote: "Loss of resistance passing through this ligament confirms entry into the paravertebral space — similar to epidural technique but unilateral."
  },
  "parietal-pleura": {
    label: "Parietal Pleura (anterolateral wall)",
    color: "hsl(160, 50%, 48%)",
    detail: "The anterolateral boundary is the parietal pleura (endothoracic fascia). This is the structure at risk of puncture during paravertebral block.",
    clinicalNote: "Pneumothorax is the most significant complication (~0.5%). Use ultrasound to visualise pleural displacement ('pleural push sign') to confirm correct placement."
  },
  "pvs-contents": {
    label: "Paravertebral Space (wedge)",
    color: "hsl(270, 45%, 55%)",
    detail: "A wedge-shaped space lateral to the vertebral column. Contains loose fatty/areolar tissue allowing spread of local anaesthetic across multiple dermatomes (typically 1 injection → 3–5 dermatomes).",
    clinicalNote: "Single-shot or catheter technique. 0.3–0.5 mL/kg of 0.25–0.5% bupivacaine. Provides unilateral somatic and sympathetic blockade — excellent analgesia for breast surgery, thoracotomy, rib fractures."
  },
  "spinal-nerve": {
    label: "Spinal Nerve (dorsal & ventral rami)",
    color: "hsl(45, 65%, 50%)",
    detail: "The spinal nerve exits the intervertebral foramen and passes through the paravertebral space before dividing into dorsal and ventral rami. The ventral ramus becomes the intercostal nerve.",
    clinicalNote: "Block here achieves both somatic and sympathetic block for the dermatome — more complete analgesia than intercostal nerve block alone."
  },
  "sympathetic-chain": {
    label: "Sympathetic Chain",
    color: "hsl(0, 55%, 50%)",
    detail: "The sympathetic trunk lies anterolateral in the paravertebral space. Preganglionic fibres synapse in the paravertebral ganglia; grey rami communicantes rejoin the spinal nerve.",
    clinicalNote: "Paravertebral block provides ipsilateral sympathectomy — less hypotension than epidural (unilateral vs bilateral sympathetic block)."
  },
  "epidural-comm": {
    label: "Epidural Communication",
    color: "hsl(210, 50%, 55%)",
    detail: "The paravertebral space communicates medially with the epidural space via the intervertebral foramen, and laterally with the intercostal space. Contralateral spread can occur.",
    clinicalNote: "Epidural spread occurs in ~10% of paravertebral blocks — monitor for bilateral block. Large volumes increase this risk."
  },
  "intercostal-ext": {
    label: "Intercostal Space (lateral)",
    color: "hsl(180, 40%, 50%)",
    detail: "Laterally, the paravertebral space is continuous with the intercostal space. Local anaesthetic can track laterally along the intercostal groove.",
    clinicalNote: "Lateral spread contributes to the multi-dermatomal coverage of a single paravertebral injection."
  }
};

const regionOrder: RegionKey[] = [
  "vertebral-body", "transverse-process", "superior-costotransverse",
  "parietal-pleura", "pvs-contents", "spinal-nerve",
  "sympathetic-chain", "epidural-comm", "intercostal-ext"
];

const ParavertebralSpaceDiagram = () => {
  const [selected, setSelected] = useState<RegionKey>("pvs-contents");
  const info = regions[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Paravertebral Space — Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any structure to see anatomy and clinical relevance for regional anaesthesia</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 300 260" width="300" height="260" className="border border-border rounded">
            {/* Vertebral body - medial */}
            <g className="cursor-pointer" onClick={() => setSelected("vertebral-body")}>
              <rect x="10" y="80" width="50" height="80" rx="6" 
                fill={regions["vertebral-body"].color} 
                fillOpacity={selected === "vertebral-body" ? 0.5 : 0.2}
                stroke={regions["vertebral-body"].color}
                strokeWidth={selected === "vertebral-body" ? 2 : 1} />
              <text x="35" y="124" fontSize="6" textAnchor="middle" fill={regions["vertebral-body"].color} fontWeight="bold">Vertebral</text>
              <text x="35" y="132" fontSize="6" textAnchor="middle" fill={regions["vertebral-body"].color}>Body</text>
            </g>

            {/* Epidural communication */}
            <g className="cursor-pointer" onClick={() => setSelected("epidural-comm")}>
              <path d="M60,105 L80,105 M60,135 L80,135" 
                stroke={regions["epidural-comm"].color}
                strokeWidth={selected === "epidural-comm" ? 2.5 : 1.5}
                strokeDasharray="4 2"
                opacity={selected === "epidural-comm" ? 0.8 : 0.4} />
              <text x="70" y="100" fontSize="5" textAnchor="middle" fill={regions["epidural-comm"].color}
                opacity={selected === "epidural-comm" ? 1 : 0.5}>Epidural</text>
              <text x="70" y="145" fontSize="5" textAnchor="middle" fill={regions["epidural-comm"].color}
                opacity={selected === "epidural-comm" ? 1 : 0.5}>comm.</text>
            </g>

            {/* Transverse process - posterior */}
            <g className="cursor-pointer" onClick={() => setSelected("transverse-process")}>
              <rect x="80" y="60" width="55" height="18" rx="4"
                fill={regions["transverse-process"].color}
                fillOpacity={selected === "transverse-process" ? 0.5 : 0.2}
                stroke={regions["transverse-process"].color}
                strokeWidth={selected === "transverse-process" ? 2 : 1} />
              <text x="107" y="72" fontSize="6" textAnchor="middle" fill={regions["transverse-process"].color} fontWeight="bold">Transverse Process</text>
            </g>

            {/* Superior costotransverse ligament */}
            <g className="cursor-pointer" onClick={() => setSelected("superior-costotransverse")}>
              <line x1="80" y1="78" x2="140" y2="78"
                stroke={regions["superior-costotransverse"].color}
                strokeWidth={selected === "superior-costotransverse" ? 3 : 2}
                strokeDasharray="6 3" />
              <text x="110" y="88" fontSize="5" textAnchor="middle" fill={regions["superior-costotransverse"].color} fontWeight="bold">
                Sup. Costotransverse Lig.
              </text>
            </g>

            {/* PVS - the wedge-shaped space */}
            <g className="cursor-pointer" onClick={() => setSelected("pvs-contents")}>
              <path d="M80,95 L180,95 L180,170 L80,145 Z" rx="4"
                fill={regions["pvs-contents"].color}
                fillOpacity={selected === "pvs-contents" ? 0.35 : 0.1}
                stroke={regions["pvs-contents"].color}
                strokeWidth={selected === "pvs-contents" ? 2 : 1} />
              <text x="125" y="130" fontSize="7" textAnchor="middle" fill={regions["pvs-contents"].color} fontWeight="bold">
                PARAVERTEBRAL
              </text>
              <text x="125" y="140" fontSize="7" textAnchor="middle" fill={regions["pvs-contents"].color} fontWeight="bold">
                SPACE
              </text>
              {/* Fat stipple */}
              {Array.from({ length: 15 }).map((_, i) => (
                <circle key={i} 
                  cx={90 + (i % 5) * 18} 
                  cy={100 + Math.floor(i / 5) * 14} 
                  r="1" fill={regions["pvs-contents"].color} opacity={selected === "pvs-contents" ? 0.3 : 0.1} />
              ))}
            </g>

            {/* Parietal pleura - anterolateral */}
            <g className="cursor-pointer" onClick={() => setSelected("parietal-pleura")}>
              <path d="M180,90 Q200,130 180,175"
                fill="none"
                stroke={regions["parietal-pleura"].color}
                strokeWidth={selected === "parietal-pleura" ? 3 : 1.5} />
              <text x="195" y="135" fontSize="6" fill={regions["parietal-pleura"].color} fontWeight="bold">Parietal</text>
              <text x="195" y="143" fontSize="6" fill={regions["parietal-pleura"].color}>Pleura</text>
            </g>

            {/* Spinal nerve */}
            <g className="cursor-pointer" onClick={() => setSelected("spinal-nerve")}>
              <path d="M60,120 L160,120"
                stroke={regions["spinal-nerve"].color}
                strokeWidth={selected === "spinal-nerve" ? 3 : 1.5}
                opacity={selected === "spinal-nerve" ? 0.9 : 0.5} />
              <circle cx="100" cy="120" r="3" fill={regions["spinal-nerve"].color} 
                opacity={selected === "spinal-nerve" ? 0.8 : 0.4} />
              <text x="100" y="116" fontSize="5" textAnchor="middle" fill={regions["spinal-nerve"].color} fontWeight="bold">Spinal Nerve</text>
            </g>

            {/* Sympathetic chain */}
            <g className="cursor-pointer" onClick={() => setSelected("sympathetic-chain")}>
              <circle cx="165" cy="155" r="5" fill={regions["sympathetic-chain"].color}
                fillOpacity={selected === "sympathetic-chain" ? 0.6 : 0.25}
                stroke={regions["sympathetic-chain"].color}
                strokeWidth={selected === "sympathetic-chain" ? 2 : 1} />
              <circle cx="165" cy="168" r="5" fill={regions["sympathetic-chain"].color}
                fillOpacity={selected === "sympathetic-chain" ? 0.6 : 0.25}
                stroke={regions["sympathetic-chain"].color}
                strokeWidth={selected === "sympathetic-chain" ? 2 : 1} />
              <line x1="165" y1="160" x2="165" y2="163"
                stroke={regions["sympathetic-chain"].color} strokeWidth="1.5" />
              <text x="165" y="182" fontSize="5" textAnchor="middle" fill={regions["sympathetic-chain"].color} fontWeight="bold">Symp. Chain</text>
            </g>

            {/* Intercostal extension */}
            <g className="cursor-pointer" onClick={() => setSelected("intercostal-ext")}>
              <path d="M180,110 L250,110 M180,160 L250,160"
                stroke={regions["intercostal-ext"].color}
                strokeWidth={selected === "intercostal-ext" ? 2 : 1}
                strokeDasharray="5 3"
                opacity={selected === "intercostal-ext" ? 0.7 : 0.3} />
              <text x="230" y="138" fontSize="5" textAnchor="middle" fill={regions["intercostal-ext"].color} fontWeight="bold">→ Intercostal</text>
              <text x="230" y="146" fontSize="5" textAnchor="middle" fill={regions["intercostal-ext"].color}>Space</text>
            </g>

            {/* Needle trajectory */}
            <path d="M130,20 L110,78" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" fill="none" markerEnd="url(#arrowPVS)" />
            <text x="140" y="18" fontSize="6" fill="hsl(var(--muted-foreground))">Needle</text>
            <text x="140" y="26" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.6">(walk off TP inferiorly)</text>
            <defs>
              <marker id="arrowPVS" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <path d="M0,0 L6,2 L0,4" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>

            {/* Rib above & below outlines */}
            <ellipse cx="180" cy="92" rx="40" ry="8" fill="hsl(35,40%,55%)" fillOpacity="0.15" stroke="hsl(35,40%,55%)" strokeWidth="0.5" />
            <text x="230" y="95" fontSize="5" fill="hsl(35,40%,55%)" opacity="0.5">Rib above</text>
            <ellipse cx="180" cy="173" rx="40" ry="8" fill="hsl(35,40%,55%)" fillOpacity="0.15" stroke="hsl(35,40%,55%)" strokeWidth="0.5" />
            <text x="230" y="176" fontSize="5" fill="hsl(35,40%,55%)" opacity="0.5">Rib below</text>

            {/* Legend */}
            <text x="10" y="210" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">Boundaries:</text>
            <text x="10" y="220" fontSize="5" fill="hsl(var(--muted-foreground))">Medial: vertebral body</text>
            <text x="10" y="228" fontSize="5" fill="hsl(var(--muted-foreground))">Posterior: transverse process + SCTL</text>
            <text x="10" y="236" fontSize="5" fill="hsl(var(--muted-foreground))">Anterolateral: parietal pleura</text>
            <text x="10" y="244" fontSize="5" fill="hsl(var(--muted-foreground))">Sup/Inf: heads/necks of adjacent ribs</text>
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

          {/* Quick reference buttons */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {regionOrder.map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`text-xs px-2 py-1 rounded border transition-all ${
                  selected === key
                    ? "border-primary bg-primary/10 text-foreground font-medium"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {regions[key].label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParavertebralSpaceDiagram;
