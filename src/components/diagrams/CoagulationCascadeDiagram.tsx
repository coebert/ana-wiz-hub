import { useState } from "react";

type PathwayKey = "intrinsic" | "extrinsic" | "common" | "fibrinolysis";

interface PathwayInfo {
  label: string;
  color: string;
  test: string;
  factors: string[];
  description: string;
  treatment: string;
}

const pathways: Record<PathwayKey, PathwayInfo> = {
  intrinsic: {
    label: "Intrinsic",
    color: "hsl(220, 70%, 55%)",
    test: "APTT / INTEM (ROTEM)",
    factors: ["XII → XIIa", "XI → XIa", "IX → IXa", "VIII (cofactor)"],
    description: "Contact activation pathway. Measured by APTT. Prolonged by heparin, haemophilia A (VIII) & B (IX).",
    treatment: "FFP if prolonged. HEPTEM shorter than INTEM → give protamine.",
  },
  extrinsic: {
    label: "Extrinsic",
    color: "hsl(0, 65%, 55%)",
    test: "PT / INR / EXTEM (ROTEM)",
    factors: ["Tissue Factor + VII → TF-VIIa"],
    description: "Tissue factor pathway — fastest activation. Measured by PT/INR. Prolonged by warfarin (target factors II, VII, IX, X).",
    treatment: "Vitamin K (slow) or PCC (Octaplex — rapid reversal). FFP if PCC unavailable.",
  },
  common: {
    label: "Common",
    color: "hsl(45, 80%, 50%)",
    test: "PT + APTT both prolonged / Thrombin time",
    factors: ["X → Xa", "V (cofactor)", "Prothrombin (II) → Thrombin (IIa)", "Fibrinogen (I) → Fibrin"],
    description: "Where intrinsic & extrinsic converge. Factor X activated → prothrombinase complex → thrombin → fibrin. Factor XIII cross-links fibrin (stable clot).",
    treatment: "Cryoprecipitate if fibrinogen <1.5 g/L (target in bleeding). FIBTEM A5 <12mm on ROTEM.",
  },
  fibrinolysis: {
    label: "Fibrinolysis",
    color: "hsl(160, 60%, 45%)",
    test: "EXTEM ML / LY30 (TEG)",
    factors: ["Plasminogen → Plasmin", "Fibrin → FDPs / D-dimers"],
    description: "Plasmin degrades fibrin clot. Excessive fibrinolysis = DIC, trauma coagulopathy. D-dimer = marker.",
    treatment: "Tranexamic acid (TXA) — lysine analogue blocks plasmin. Give <3h in trauma (CRASH-2).",
  },
};

const pathwayOrder: PathwayKey[] = ["intrinsic", "extrinsic", "common", "fibrinolysis"];

const CoagulationCascadeDiagram = () => {
  const [active, setActive] = useState<PathwayKey>("common");
  const info = pathways[active];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Coagulation Cascade</h3>
      <p className="text-xs text-muted-foreground mb-3">Select a pathway to explore factors, tests, and treatment</p>

      {/* Pathway selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {pathwayOrder.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              active === key ? "text-white border-transparent" : "border-border text-muted-foreground hover:text-foreground"
            }`}
            style={active === key ? { backgroundColor: pathways[key].color } : {}}
          >
            {pathways[key].label}
          </button>
        ))}
      </div>

      {/* SVG Cascade */}
      <svg viewBox="0 0 400 260" className="w-full max-w-lg mx-auto mb-4" style={{ height: "auto" }}>
        {/* Intrinsic arm */}
        <g opacity={active === "intrinsic" ? 1 : 0.25} className="transition-opacity duration-300">
          <rect x="20" y="10" width="90" height="28" rx="6" fill={pathways.intrinsic.color} fillOpacity="0.15" stroke={pathways.intrinsic.color} strokeWidth="1.5" />
          <text x="65" y="28" textAnchor="middle" fontSize="10" fill={pathways.intrinsic.color} fontWeight="bold">XII → XIIa</text>
          <line x1="65" y1="38" x2="65" y2="52" stroke={pathways.intrinsic.color} strokeWidth="1.5" markerEnd="url(#arrow-intrinsic)" />

          <rect x="20" y="52" width="90" height="28" rx="6" fill={pathways.intrinsic.color} fillOpacity="0.15" stroke={pathways.intrinsic.color} strokeWidth="1.5" />
          <text x="65" y="70" textAnchor="middle" fontSize="10" fill={pathways.intrinsic.color} fontWeight="bold">XI → XIa</text>
          <line x1="65" y1="80" x2="65" y2="94" stroke={pathways.intrinsic.color} strokeWidth="1.5" />

          <rect x="20" y="94" width="90" height="28" rx="6" fill={pathways.intrinsic.color} fillOpacity="0.15" stroke={pathways.intrinsic.color} strokeWidth="1.5" />
          <text x="65" y="112" textAnchor="middle" fontSize="10" fill={pathways.intrinsic.color} fontWeight="bold">IX → IXa + VIII</text>
          <line x1="65" y1="122" x2="65" y2="140" stroke={pathways.intrinsic.color} strokeWidth="1.5" />
          <line x1="65" y1="140" x2="155" y2="155" stroke={pathways.intrinsic.color} strokeWidth="1.5" strokeDasharray="4 2" />

          <text x="15" y="75" fontSize="8" fill={pathways.intrinsic.color} transform="rotate(-90, 15, 75)" textAnchor="middle">APTT</text>
        </g>

        {/* Extrinsic arm */}
        <g opacity={active === "extrinsic" ? 1 : 0.25} className="transition-opacity duration-300">
          <rect x="260" y="52" width="120" height="28" rx="6" fill={pathways.extrinsic.color} fillOpacity="0.15" stroke={pathways.extrinsic.color} strokeWidth="1.5" />
          <text x="320" y="70" textAnchor="middle" fontSize="10" fill={pathways.extrinsic.color} fontWeight="bold">TF + VII → TF-VIIa</text>
          <line x1="320" y1="80" x2="320" y2="140" stroke={pathways.extrinsic.color} strokeWidth="1.5" />
          <line x1="320" y1="140" x2="245" y2="155" stroke={pathways.extrinsic.color} strokeWidth="1.5" strokeDasharray="4 2" />

          <text x="385" y="75" fontSize="8" fill={pathways.extrinsic.color} transform="rotate(90, 385, 75)" textAnchor="middle">PT / INR</text>
        </g>

        {/* Common pathway */}
        <g opacity={active === "common" ? 1 : 0.25} className="transition-opacity duration-300">
          <rect x="150" y="148" width="100" height="28" rx="6" fill={pathways.common.color} fillOpacity="0.2" stroke={pathways.common.color} strokeWidth="1.5" />
          <text x="200" y="166" textAnchor="middle" fontSize="10" fill={pathways.common.color} fontWeight="bold">X → Xa + V</text>
          <line x1="200" y1="176" x2="200" y2="190" stroke={pathways.common.color} strokeWidth="1.5" />

          <rect x="140" y="190" width="120" height="28" rx="6" fill={pathways.common.color} fillOpacity="0.2" stroke={pathways.common.color} strokeWidth="1.5" />
          <text x="200" y="208" textAnchor="middle" fontSize="10" fill={pathways.common.color} fontWeight="bold">Prothrombin → Thrombin</text>
          <line x1="200" y1="218" x2="200" y2="228" stroke={pathways.common.color} strokeWidth="1.5" />

          <rect x="140" y="228" width="120" height="28" rx="6" fill={pathways.common.color} fillOpacity="0.25" stroke={pathways.common.color} strokeWidth="2" />
          <text x="200" y="246" textAnchor="middle" fontSize="11" fill={pathways.common.color} fontWeight="bold">Fibrinogen → Fibrin</text>
        </g>

        {/* Fibrinolysis */}
        <g opacity={active === "fibrinolysis" ? 1 : 0.25} className="transition-opacity duration-300">
          <line x1="260" y1="242" x2="300" y2="242" stroke={pathways.fibrinolysis.color} strokeWidth="1.5" />
          <rect x="300" y="220" width="90" height="22" rx="5" fill={pathways.fibrinolysis.color} fillOpacity="0.15" stroke={pathways.fibrinolysis.color} strokeWidth="1.5" />
          <text x="345" y="235" textAnchor="middle" fontSize="9" fill={pathways.fibrinolysis.color} fontWeight="bold">Plasmin</text>
          <line x1="345" y1="242" x2="345" y2="250" stroke={pathways.fibrinolysis.color} strokeWidth="1.5" />
          <text x="345" y="258" textAnchor="middle" fontSize="8" fill={pathways.fibrinolysis.color}>FDPs / D-dimer</text>

          {/* TXA inhibition */}
          <line x1="330" y1="215" x2="330" y2="205" stroke="hsl(0, 70%, 55%)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="330" y="200" textAnchor="middle" fontSize="7" fill="hsl(0, 70%, 55%)">⊗ TXA</text>
        </g>

        {/* Arrow marker */}
        <defs>
          <marker id="arrow-intrinsic" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill={pathways.intrinsic.color} />
          </marker>
        </defs>
      </svg>

      {/* Detail card */}
      <div className="p-4 rounded-lg border border-border animate-fade-in" key={active}>
        <p className="font-bold text-sm" style={{ color: info.color }}>{info.label} Pathway</p>
        <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Test:</strong> {info.test}</p>
        <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Factors:</strong> {info.factors.join(" → ")}</p>
        <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
        <p className="text-xs text-primary mt-2 font-medium">Rx: {info.treatment}</p>
      </div>
    </div>
  );
};

export default CoagulationCascadeDiagram;
