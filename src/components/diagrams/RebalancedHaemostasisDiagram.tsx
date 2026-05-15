import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";

/**
 * Rebalanced haemostasis in liver failure — pro- and anti-coagulant factors
 * fall in parallel; INR misleads.
 */
const RebalancedHaemostasisDiagram = () => {
  const id = "rebalanced-haemostasis";
  return (
    <DiagramFigure
      id={id}
      title="Rebalanced haemostasis in liver failure"
      description="In cirrhosis/ALF the liver synthesises both procoagulants (II, V, VII, IX, X, XI, fibrinogen) and anticoagulants (protein C, protein S, antithrombin); both arms fall together. INR rises but global haemostasis is balanced or even prothrombotic — assess with TEG/ROTEM, avoid prophylactic FFP, give VTE prophylaxis."
      showCaption
    >
      <svg
        viewBox="0 0 820 320"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>Rebalanced haemostasis</title>
        <desc id={`${id}-desc`}>
          Procoagulant and anticoagulant pans of the haemostatic balance both fall in liver
          failure, leaving the patient balanced or prothrombotic despite a raised INR.
        </desc>

        {/* Fulcrum */}
        <polygon points="410,250 380,300 440,300" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <line x1="120" y1="170" x2="700" y2="170" stroke="hsl(var(--foreground))" strokeWidth="3">
          <animateTransform attributeName="transform" type="rotate" values="-3 410 170;3 410 170;-3 410 170" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="410" y1="170" x2="410" y2="250" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Left pan — procoagulant */}
        <g>
          <line x1="180" y1="170" x2="180" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <line x1="120" y1="170" x2="120" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <ellipse cx="150" cy="120" rx="80" ry="14" fill="hsl(var(--icu) / 0.2)" stroke="hsl(var(--icu))" />
          <text x="100" y="105" fontSize="11" fontWeight="700" fill="hsl(var(--icu))">Procoagulants ↓</text>
          <text x="84" y="92" fontSize="9" fill="hsl(var(--muted-foreground))">II, V, VII, IX, X, XI</text>
          <text x="92" y="78" fontSize="9" fill="hsl(var(--muted-foreground))">fibrinogen, PLT</text>
        </g>

        {/* Right pan — anticoagulant */}
        <g>
          <line x1="700" y1="170" x2="700" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <line x1="640" y1="170" x2="640" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <ellipse cx="670" cy="120" rx="80" ry="14" fill="hsl(var(--warn, 38 92% 50%) / 0.2)" stroke="hsl(var(--warn, 38 92% 50%))" />
          <text x="610" y="105" fontSize="11" fontWeight="700" fill="hsl(var(--warn, 38 92% 50%))">Anticoagulants ↓</text>
          <text x="608" y="92" fontSize="9" fill="hsl(var(--muted-foreground))">Protein C / S, AT</text>
          <text x="600" y="78" fontSize="9" fill="hsl(var(--muted-foreground))">↑ vWF, ↑ FVIII (endothelial)</text>
        </g>

        {/* Title strip */}
        <text x="320" y="30" fontSize="13" fontWeight="700" fill="hsl(var(--foreground))">
          Both pans fall together → balance preserved
        </text>
        <text x="290" y="50" fontSize="11" fill="hsl(var(--muted-foreground))">
          INR is misleading — measures only procoagulant arm
        </text>

        {/* Implications panel */}
        <g>
          <rect x="20" y="270" width="380" height="40" rx="6" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive) / 0.5)" />
          <text x="32" y="288" fontSize="11" fontWeight="700" fill="hsl(var(--destructive))">Avoid:</text>
          <text x="80" y="288" fontSize="10" fill="hsl(var(--muted-foreground))">prophylactic FFP for raised INR</text>
          <text x="32" y="303" fontSize="10" fill="hsl(var(--muted-foreground))">↑ portal pressure, volume overload, obscures prognosis</text>
        </g>

        <g>
          <rect x="420" y="270" width="380" height="40" rx="6" fill="hsl(var(--success, 142 70% 40%) / 0.08)" stroke="hsl(var(--success, 142 70% 40%) / 0.5)" />
          <text x="432" y="288" fontSize="11" fontWeight="700" fill="hsl(var(--success, 142 70% 40%))">Do:</text>
          <text x="460" y="288" fontSize="10" fill="hsl(var(--muted-foreground))">TEG/ROTEM for functional assessment</text>
          <text x="432" y="303" fontSize="10" fill="hsl(var(--muted-foreground))">VTE prophylaxis (LMWH) unless bleeding/PLT &lt;50</text>
        </g>
      </svg>
    </DiagramFigure>
  );
};

export default RebalancedHaemostasisDiagram;
