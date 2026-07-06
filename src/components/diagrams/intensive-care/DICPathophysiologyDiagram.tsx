import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";

/**
 * DIC pathophysiology — systemic activation of coagulation with consumption.
 */
const DICPathophysiologyDiagram = () => {
  const id = "dic-pathophys";
  return (
    <DiagramFigure
      id={id}
      title="DIC pathophysiology — systemic tissue factor exposure consumes clotting factors"
      description="Trigger (sepsis, trauma, malignancy, obstetric) releases tissue factor and DAMPs/PAMPs. Widespread thrombin generation produces microvascular fibrin thrombi (organ ischaemia) while consuming platelets, fibrinogen and clotting factors — paradoxical bleeding."
      showCaption
    >
      <svg
        viewBox="0 0 820 360"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>DIC pathophysiology</title>
        <desc id={`${id}-desc`}>
          Triggers liberate tissue factor; uncontrolled thrombin generation produces simultaneous
          microvascular thrombosis and consumptive bleeding.
        </desc>

        <defs>
          <marker id="dic-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Triggers */}
        <g>
          <rect x="20" y="30" width="180" height="140" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="30" y="50" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">Trigger</text>
          {["Sepsis (Gram −ve LPS)", "Trauma / burns", "Obstetric (AFE, abruption)", "Malignancy (APML)", "Snake envenomation"].map((t, i) => (
            <text key={t} x="30" y={70 + i * 18} fontSize="10" fill="hsl(var(--muted-foreground))">• {t}</text>
          ))}
        </g>

        <path d="M200 100 L260 100" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#dic-arr)" />
        <text x="205" y="92" fontSize="10" fill="hsl(var(--icu))">TF + DAMPs</text>

        {/* Central engine — thrombin burst */}
        <g>
          <circle cx="370" cy="100" r="60" fill="hsl(var(--destructive) / 0.12)" stroke="hsl(var(--destructive))" strokeWidth="1.5">
            <animate attributeName="r" values="58;64;58" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x="335" y="92" fontSize="12" fontWeight="700" fill="hsl(var(--destructive))">Systemic</text>
          <text x="332" y="108" fontSize="12" fontWeight="700" fill="hsl(var(--destructive))">thrombin</text>
          <text x="345" y="124" fontSize="10" fill="hsl(var(--muted-foreground))">burst</text>
        </g>

        {/* Two diverging arms */}
        <path d="M425 75 Q500 40 580 50" stroke="hsl(var(--icu))" strokeWidth="2" fill="none" markerEnd="url(#dic-arr)" />
        <path d="M425 130 Q500 170 580 180" stroke="hsl(var(--warn, 38 92% 50%))" strokeWidth="2" fill="none" markerEnd="url(#dic-arr)" />

        {/* Microthrombi panel */}
        <g>
          <rect x="585" y="20" width="215" height="110" rx="8" fill="hsl(var(--icu) / 0.08)" stroke="hsl(var(--icu) / 0.5)" />
          <text x="595" y="42" fontSize="12" fontWeight="700" fill="hsl(var(--icu))">Microvascular thrombosis</text>
          <text x="595" y="62" fontSize="10" fill="hsl(var(--muted-foreground))">Fibrin deposition in capillaries</text>
          <text x="595" y="78" fontSize="10" fill="hsl(var(--muted-foreground))">→ MODS, AKI, digital ischaemia</text>
          <text x="595" y="94" fontSize="10" fill="hsl(var(--muted-foreground))">→ schistocytes (MAHA)</text>
          <text x="595" y="114" fontSize="10" fontWeight="600" fill="hsl(var(--icu))">↑ D-dimer (fibrinolysis)</text>
        </g>

        {/* Bleeding panel */}
        <g>
          <rect x="585" y="150" width="215" height="120" rx="8" fill="hsl(var(--warn, 38 92% 50%) / 0.1)" stroke="hsl(var(--warn, 38 92% 50%) / 0.6)" />
          <text x="595" y="172" fontSize="12" fontWeight="700" fill="hsl(var(--warn, 38 92% 50%))">Consumptive coagulopathy</text>
          <text x="595" y="192" fontSize="10" fill="hsl(var(--muted-foreground))">↓ Platelets, ↓ fibrinogen</text>
          <text x="595" y="208" fontSize="10" fill="hsl(var(--muted-foreground))">↑ PT, ↑ APTT</text>
          <text x="595" y="224" fontSize="10" fill="hsl(var(--muted-foreground))">→ mucosal / line / surgical bleed</text>
          <text x="595" y="244" fontSize="10" fontWeight="600" fill="hsl(var(--warn, 38 92% 50%))">ISTH score ≥5 = overt DIC</text>
        </g>

        {/* Treatment */}
        <g>
          <rect x="20" y="200" width="540" height="140" rx="8" fill="hsl(var(--secondary) / 0.5)" stroke="hsl(var(--border))" />
          <text x="32" y="222" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">Management — treat the cause</text>
          <text x="32" y="244" fontSize="10" fill="hsl(var(--muted-foreground))">• Source control + ICU resuscitation (sepsis bundle, deliver placenta)</text>
          <text x="32" y="262" fontSize="10" fill="hsl(var(--muted-foreground))">• Bleeding: platelets &lt;50, fibrinogen &lt;1.5 (or &lt;2 obstetric) → cryo/fibrinogen, FFP for INR &gt;1.5</text>
          <text x="32" y="280" fontSize="10" fill="hsl(var(--muted-foreground))">• Thrombotic-predominant: prophylactic LMWH (unless bleeding); APML → ATRA + arsenic</text>
          <text x="32" y="298" fontSize="10" fill="hsl(var(--muted-foreground))">• Avoid antifibrinolytics in sepsis-DIC (microvascular thrombi)</text>
          <text x="32" y="320" fontSize="10" fontStyle="italic" fill="hsl(var(--muted-foreground))">Ferritin, fibrinogen, D-dimer, PLT trend = serial markers of activity</text>
        </g>
      </svg>
    </DiagramFigure>
  );
};

export default DICPathophysiologyDiagram;
