import { useState } from "react";
import { PlayCircle } from "lucide-react";
import GuidedWalkthroughOverlay, { WalkthroughStep } from "@/components/diagrams/shared/GuidedWalkthroughOverlay";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface Step {
  id: number;
  title: string;
  instruction: string;
  tips: string[];
  pitfalls?: string[];
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Preparation & Equipment Check",
    instruction: "Select appropriate DLT size. Left-sided DLT is preferred in most cases (right upper lobe bronchus take-off is variable and easily occluded). Check both cuffs for leaks. Lubricate the bronchial tip. Prepare fibreoptic bronchoscope (FOB). Ensure suction available.",
    tips: [
      "Women: 35–37 Fr (height-based; 35 Fr if <160 cm)",
      "Men: 37–41 Fr (39 Fr most common; 41 Fr if >180 cm)",
      "Right-sided DLT only for left mainstem pathology (tumour, stent, left pneumonectomy)",
      "Have a bronchial blocker available as backup",
    ],
    pitfalls: [
      "Failing to check both cuffs before insertion",
      "Choosing too large a tube → bronchial rupture risk",
    ],
  },
  {
    id: 2,
    title: "Patient Positioning & Pre-oxygenation",
    instruction: "Position the patient supine with optimal 'sniffing' position (head extension, neck flexion on a pillow). Pre-oxygenate with 100% O₂ for ≥3 minutes or 8 vital capacity breaths. Standard monitoring and IV access. Induce anaesthesia and confirm ability to ventilate.",
    tips: [
      "Ramped position improves laryngoscopy in obese patients",
      "Neuromuscular blockade essential — rocuronium 0.6–1.2 mg/kg",
      "Video laryngoscope available for difficult airway",
    ],
  },
  {
    id: 3,
    title: "Laryngoscopy & Initial Insertion",
    instruction: "Perform direct or video laryngoscopy. Insert the DLT with the bronchial curve facing anteriorly (concavity up) and the distal tip pointing upward. Pass through the vocal cords under direct vision. The tracheal cuff should be just past the cords.",
    tips: [
      "Hold the DLT by the proximal connector like a stylet",
      "The blue bronchial cuff should be visible passing through the cords",
      "If using a stylet, remove it as soon as the tip passes the cords",
      "Bougie-assisted insertion possible if view is poor",
    ],
    pitfalls: [
      "Forcing the tube — risk of airway trauma, bronchial rupture",
      "Inserting too deep at this stage before rotation",
    ],
  },
  {
    id: 4,
    title: "Rotate 90° Towards Target Bronchus",
    instruction: "Once the tip is past the vocal cords (~2–3 cm), rotate the tube 90° ANTICLOCKWISE (for a left-sided DLT) so the bronchial lumen curves towards the left mainstem bronchus. For a right-sided DLT, rotate CLOCKWISE.",
    tips: [
      "Left DLT → rotate anticlockwise (towards patient's left)",
      "Right DLT → rotate clockwise (towards patient's right)",
      "Gentle, smooth rotation — never force",
      "Withdraw stylet before or during rotation if present",
    ],
    pitfalls: [
      "Rotating in the wrong direction → bronchial lumen enters wrong side",
      "Rotating before the tip has passed the cords → vocal cord injury",
    ],
  },
  {
    id: 5,
    title: "Advance to Depth",
    instruction: "Advance the tube gently until moderate resistance is felt — this indicates the bronchial cuff has seated in the left (or right) mainstem bronchus. Typical depth at the teeth: 29 cm (170 cm patient). Rough guide: depth (cm) = height (cm) / 10 + 12.",
    tips: [
      "Average insertion depth: 27–29 cm at incisors",
      "Too shallow → bronchial cuff in trachea (no isolation)",
      "Too deep → may occlude the upper lobe bronchus",
      "Resistance should be gentle — stop if firm resistance encountered",
    ],
    pitfalls: [
      "Over-insertion → left upper lobe obstruction (left DLT) or complete right lung isolation failure",
      "Excessive force → bronchial rupture (rare but catastrophic)",
    ],
  },
  {
    id: 6,
    title: "Inflate Cuffs & Clinical Check",
    instruction: "Inflate the tracheal cuff (5–10 ml air). Connect to ventilator and confirm bilateral ventilation. Then clamp the tracheal (non-bronchial) limb — only the bronchial lung should ventilate. Inflate the bronchial cuff (1–2 ml air) until the air leak stops. Then clamp the bronchial limb — only the tracheal lung should ventilate.",
    tips: [
      "Tracheal cuff: seal the trachea (≤25 cmH₂O pressure)",
      "Bronchial cuff: MINIMUM volume to seal — overinflation risks mucosal ischaemia & rupture",
      "Use manometry to check bronchial cuff pressure <30 cmH₂O",
      "Auscultate in 4 zones: bilateral axillae, bilateral anterior chest",
    ],
    pitfalls: [
      "Over-inflating bronchial cuff → mucosal ischaemia, rupture",
      "Missing a malposition by not clamping each lumen separately",
    ],
  },
  {
    id: 7,
    title: "Fibreoptic Bronchoscope Confirmation",
    instruction: "FOB confirmation is MANDATORY — clinical checks alone miss up to 37% of malpositions. Pass the FOB down the TRACHEAL lumen first. You should see: the carina, the blue bronchial cuff sitting in the left mainstem bronchus, and the right mainstem bronchus orifice clear and unobstructed.",
    tips: [
      "Tracheal lumen view: carina + blue cuff in left bronchus + patent right bronchus",
      "Then check bronchial lumen: should see left upper and lower lobe orifices",
      "If right-sided DLT: must see RUL ventilation slot aligned with RUL orifice",
      "Recheck after lateral positioning (tube migrates 1–2 cm with position change)",
    ],
    pitfalls: [
      "Skipping FOB confirmation — unacceptable practice",
      "Forgetting to recheck after turning patient lateral",
      "Misidentifying the carina (secondary carina vs main carina)",
    ],
  },
  {
    id: 8,
    title: "Lateral Positioning & Reconfirmation",
    instruction: "After turning the patient into the lateral decubitus position for thoracotomy, the DLT may migrate proximally or distally by 1–2 cm. Repeat FOB confirmation through BOTH lumens. Re-auscultate. Adjust depth if needed. Begin one-lung ventilation when the surgeon is ready.",
    tips: [
      "Head flexion → tube advances (deeper). Extension → tube withdraws.",
      "Lateral positioning often causes the tube to move outward (shallower)",
      "Protective lung ventilation during OLV: VT 5–6 ml/kg IBW, PEEP 5, FiO₂ as needed",
      "CPAP 5 cmH₂O to non-ventilated lung if hypoxia develops",
    ],
  },
];

type DLTSide = "left" | "right";

const DLTInsertionDiagram = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dltSide, setDltSide] = useState<DLTSide>("left");
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  const step = STEPS[currentStep];

  // Build walkthrough steps from STEPS — confirmation actions for each phase
  const walkthroughSteps: WalkthroughStep[] = STEPS.map((s) => {
    // Build action checklist from instruction + tips + pitfalls (key items)
    const actions: string[] = [];
    // Take instruction as the primary confirmation
    actions.push(s.instruction);
    // Add up to 3 most important tips as discrete checks
    s.tips.slice(0, 3).forEach((t) => actions.push(`Confirm: ${t}`));
    return {
      id: s.id,
      title: s.title,
      detail: s.pitfalls?.length
        ? `Watch for: ${s.pitfalls.join(" · ")}`
        : undefined,
      actions,
      confirmation:
        s.id === STEPS.length
          ? "DLT position re-confirmed in lateral position. Safe to begin one-lung ventilation."
          : "Step confirmed — advance to the next phase.",
      tone: s.id === 7 ? "warn" : "info",
    };
  });

  // Diagram rendering per step
  const renderStepDiagram = (stepId: number) => {
    const isLeft = dltSide === "left";

    // Common airway anatomy elements
    const renderAirway = (showDLT: boolean, dltPhase: "above" | "entering" | "rotating" | "advanced" | "seated") => {
      // Trachea and bronchi coordinates
      const tracheaTop = 30;
      const carinaY = 200;
      const tracheaW = 44;
      const cx = 200; // center x
      const lBronchAngle = -35;
      const rBronchAngle = 25;
      const bronchLen = 80;

      // Left bronchus endpoint
      const lbx = cx + bronchLen * Math.sin((lBronchAngle * Math.PI) / 180);
      const lby = carinaY + bronchLen * Math.cos((lBronchAngle * Math.PI) / 180);
      // Right bronchus endpoint
      const rbx = cx + bronchLen * Math.sin((rBronchAngle * Math.PI) / 180);
      const rby = carinaY + bronchLen * Math.cos((rBronchAngle * Math.PI) / 180);

      // DLT path based on phase
      let dltTipY = tracheaTop;
      let dltRotated = false;
      let dltInBronchus = false;
      let showBronchialCuff = false;
      let showTrachealCuff = false;

      switch (dltPhase) {
        case "above": dltTipY = tracheaTop + 20; break;
        case "entering": dltTipY = tracheaTop + 80; break;
        case "rotating": dltTipY = carinaY - 40; dltRotated = true; break;
        case "advanced": dltTipY = carinaY - 10; dltRotated = true; dltInBronchus = true; break;
        case "seated": dltTipY = carinaY; dltRotated = true; dltInBronchus = true; showBronchialCuff = true; showTrachealCuff = true; break;
      }

      return (
        <svg viewBox="0 0 400 340" className="w-full max-w-xs mx-auto">
          {/* Background */}
          <rect width="400" height="340" fill="hsl(var(--card))" rx="8" stroke="hsl(var(--border))" strokeWidth="0.75" />

          {/* Larynx / vocal cords */}
          <g opacity="0.5">
            <path d={`M${cx - 24},${tracheaTop + 5} L${cx - 8},${tracheaTop + 15} L${cx - 24},${tracheaTop + 25}`}
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            <path d={`M${cx + 24},${tracheaTop + 5} L${cx + 8},${tracheaTop + 15} L${cx + 24},${tracheaTop + 25}`}
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            <text x={cx} y={tracheaTop - 2} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Vocal cords</text>
          </g>

          {/* Trachea */}
          <path d={`M${cx - tracheaW / 2},${tracheaTop + 25} L${cx - tracheaW / 2},${carinaY}`}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d={`M${cx + tracheaW / 2},${tracheaTop + 25} L${cx + tracheaW / 2},${carinaY}`}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" opacity="0.3" />

          {/* Tracheal rings */}
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i}
              d={`M${cx - tracheaW / 2 + 2},${tracheaTop + 35 + i * 20} Q${cx},${tracheaTop + 38 + i * 20} ${cx + tracheaW / 2 - 2},${tracheaTop + 35 + i * 20}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.15" />
          ))}

          {/* Carina */}
          <circle cx={cx} cy={carinaY} r="3" fill="hsl(var(--foreground))" opacity="0.25" />
          <text x={cx + 28} y={carinaY + 4} fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.6">Carina</text>

          {/* Left main bronchus */}
          <line x1={cx} y1={carinaY} x2={lbx} y2={lby}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          <line x1={cx - 5} y1={carinaY + 3} x2={lbx - 12} y2={lby + 5}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          <text x={lbx - 15} y={lby + 20} fontSize="8" fill="hsl(var(--foreground))" opacity="0.5" textAnchor="middle">Left bronchus</text>

          {/* Right main bronchus */}
          <line x1={cx} y1={carinaY} x2={rbx} y2={rby}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          <line x1={cx + 5} y1={carinaY + 3} x2={rbx + 12} y2={rby + 5}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          <text x={rbx + 15} y={rby + 20} fontSize="8" fill="hsl(var(--foreground))" opacity="0.5" textAnchor="middle">Right bronchus</text>

          {/* RUL take-off (short, steep) */}
          <line x1={rbx - 15} y1={rby - 12} x2={rbx + 10} y2={rby - 35}
            stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          <text x={rbx + 15} y={rby - 35} fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">RUL</text>

          {/* LUL take-off */}
          <line x1={lbx + 10} y1={lby - 8} x2={lbx - 15} y2={lby - 30}
            stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          <text x={lbx - 20} y={lby - 30} fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">LUL</text>

          {/* RML take-off (anterior, from bronchus intermedius) */}
          <line x1={rbx - 5} y1={rby + 6} x2={rbx + 14} y2={rby + 14}
            stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          <text x={rbx + 22} y={rby + 16} fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">RML</text>

          {/* RLL continuation (distal right bronchus) */}
          <line x1={rbx} y1={rby + 4} x2={rbx + 18} y2={rby + 32}
            stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          <text x={rbx + 22} y={rby + 36} fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">RLL</text>

          {/* LLL continuation (distal left bronchus) */}
          <line x1={lbx} y1={lby + 4} x2={lbx - 18} y2={lby + 32}
            stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          <text x={lbx - 22} y={lby + 36} fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">LLL</text>

          {/* DLT tube */}
          {showDLT && (
            <g>
              {/* Determine the path based on phase */}
              {!dltInBronchus ? (
                // Tube in trachea only
                <g>
                  {/* Tracheal lumen */}
                  <rect x={cx - 10} y={dltTipY - 100} width={8} height={dltPhase === "above" ? 90 : 110}
                    rx="3" fill="hsl(210 60% 55%)" fillOpacity="0.3" stroke="hsl(210 60% 55%)" strokeWidth="1" />
                  {/* Bronchial lumen */}
                  <rect x={cx + 2} y={dltTipY - 100} width={8} height={dltPhase === "above" ? 95 : 115}
                    rx="3" fill="hsl(210 60% 55%)" fillOpacity="0.3" stroke="hsl(210 60% 55%)" strokeWidth="1" />
                  {/* Tip */}
                  <circle cx={cx + 6} cy={dltTipY + (dltPhase === "above" ? -10 : 15)} r="4"
                    fill="hsl(210 60% 55%)" fillOpacity="0.5" />
                  {/* Rotation arrow for step 4 */}
                  {dltRotated && (
                    <g>
                      <path d={`M${cx + 20},${dltTipY - 10} A15,15 0 0,${isLeft ? "0" : "1"} ${cx - 15},${dltTipY + 5}`}
                        fill="none" stroke="hsl(35 70% 50%)" strokeWidth="1.5" markerEnd="url(#arrow-rot)" />
                      <text x={cx + 30} y={dltTipY - 5} fontSize="7" fill="hsl(35 70% 50%)" fontWeight="600">
                        Rotate 90° {isLeft ? "↶" : "↷"}
                      </text>
                    </g>
                  )}
                </g>
              ) : (
                // Tube advanced into bronchus
                <g>
                  {/* Tracheal lumen — stays in trachea */}
                  <path d={`M${cx - 6},${tracheaTop} L${cx - 6},${carinaY - 15}`}
                    stroke="hsl(210 60% 55%)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                  <path d={`M${cx - 6},${tracheaTop} L${cx - 6},${carinaY - 15}`}
                    stroke="hsl(210 60% 55%)" strokeWidth="1" fill="none" />
                  {/* Tracheal opening */}
                  <ellipse cx={cx - 6} cy={carinaY - 12} rx="3" ry="2"
                    fill="hsl(var(--card))" stroke="hsl(210 60% 55%)" strokeWidth="0.75" />
                  <text x={cx - 6} y={carinaY - 22} textAnchor="middle" fontSize="6" fill="hsl(210 60% 55%)" fontWeight="600">Tracheal lumen</text>

                  {/* Bronchial lumen — curves into target bronchus */}
                  {isLeft ? (
                    <path d={`M${cx + 6},${tracheaTop} L${cx + 6},${carinaY - 5} Q${cx},${carinaY + 5} ${lbx + 5},${lby - 15}`}
                      stroke="hsl(0 60% 55%)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                  ) : (
                    <path d={`M${cx + 6},${tracheaTop} L${cx + 6},${carinaY - 5} Q${cx + 8},${carinaY + 5} ${rbx - 5},${rby - 15}`}
                      stroke="hsl(0 60% 55%)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                  )}
                  {isLeft ? (
                    <path d={`M${cx + 6},${tracheaTop} L${cx + 6},${carinaY - 5} Q${cx},${carinaY + 5} ${lbx + 5},${lby - 15}`}
                      stroke="hsl(0 60% 55%)" strokeWidth="1" fill="none" />
                  ) : (
                    <path d={`M${cx + 6},${tracheaTop} L${cx + 6},${carinaY - 5} Q${cx + 8},${carinaY + 5} ${rbx - 5},${rby - 15}`}
                      stroke="hsl(0 60% 55%)" strokeWidth="1" fill="none" />
                  )}
                  <text x={isLeft ? lbx + 20 : rbx - 20} y={isLeft ? lby - 20 : rby - 20}
                    fontSize="6" fill="hsl(0 60% 55%)" fontWeight="600" textAnchor="middle">Bronchial lumen</text>

                  {/* Bronchial cuff */}
                  {showBronchialCuff && (
                    <g>
                      {isLeft ? (
                        <ellipse cx={(cx + lbx + 5) / 2 - 5} cy={(carinaY + lby - 15) / 2 + 5}
                          rx="10" ry="5" fill="hsl(210 70% 60%)" fillOpacity="0.3"
                          stroke="hsl(210 70% 60%)" strokeWidth="1"
                          transform={`rotate(${lBronchAngle}, ${(cx + lbx + 5) / 2 - 5}, ${(carinaY + lby - 15) / 2 + 5})`} />
                      ) : (
                        <ellipse cx={(cx + rbx - 5) / 2 + 5} cy={(carinaY + rby - 15) / 2 + 5}
                          rx="10" ry="5" fill="hsl(210 70% 60%)" fillOpacity="0.3"
                          stroke="hsl(210 70% 60%)" strokeWidth="1"
                          transform={`rotate(${rBronchAngle}, ${(cx + rbx - 5) / 2 + 5}, ${(carinaY + rby - 15) / 2 + 5})`} />
                      )}
                      <text x={isLeft ? lbx + 25 : rbx - 25} y={isLeft ? lby - 5 : rby - 5}
                        fontSize="6" fill="hsl(210 70% 60%)" textAnchor="middle">Blue bronchial cuff</text>
                    </g>
                  )}

                  {/* Tracheal cuff */}
                  {showTrachealCuff && (
                    <g>
                      <ellipse cx={cx} cy={carinaY - 40} rx="18" ry="6"
                        fill="hsl(150 50% 50%)" fillOpacity="0.2" stroke="hsl(150 50% 50%)" strokeWidth="1" />
                      <text x={cx + 28} y={carinaY - 38} fontSize="6" fill="hsl(150 50% 50%)">Tracheal cuff</text>
                    </g>
                  )}
                </g>
              )}
            </g>
          )}

          {/* Arrow markers */}
          <defs>
            <marker id="arrow-rot" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="hsl(35 70% 50%)" />
            </marker>
          </defs>

          {/* Step label */}
          <text x="10" y="18" fontSize="9" fill="hsl(var(--foreground))" fontWeight="700">Step {stepId}</text>
        </svg>
      );
    };

    switch (stepId) {
      case 1: return renderAirway(false, "above");
      case 2: return renderAirway(false, "above");
      case 3: return renderAirway(true, "entering");
      case 4: return renderAirway(true, "rotating");
      case 5: return renderAirway(true, "advanced");
      case 6: return renderAirway(true, "seated");
      case 7:
        // FOB confirmation view
        return (
          <div className="space-y-3">
            {renderAirway(true, "seated")}
            <div className="grid grid-cols-2 gap-2">
              {/* Tracheal lumen FOB view */}
              <div className="rounded-lg border border-border p-2">
                <svg viewBox="0 0 120 120" className="w-full">
                  <circle cx="60" cy="60" r="55" fill="hsl(0 0% 10%)" stroke="hsl(var(--border))" strokeWidth="1" />
                  {/* Airway wall */}
                  <circle cx="60" cy="60" r="45" fill="none" stroke="hsl(0 0% 25%)" strokeWidth="1" />
                  {/* Carina ridge */}
                  <path d="M60,20 L60,55" stroke="hsl(0 0% 35%)" strokeWidth="2" />
                  {/* Left bronchus opening */}
                  <ellipse cx="40" cy="65" rx="18" ry="22" fill="hsl(0 0% 5%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
                  {/* Blue cuff visible in left bronchus */}
                  <ellipse cx="40" cy="55" rx="14" ry="6" fill="hsl(210 70% 55%)" fillOpacity="0.4" stroke="hsl(210 70% 55%)" strokeWidth="1" />
                  <text x="40" y="58" textAnchor="middle" fontSize="5" fill="hsl(210 70% 60%)" fontWeight="600">Blue cuff</text>
                  {/* Right bronchus opening */}
                  <ellipse cx="78" cy="68" rx="16" ry="20" fill="hsl(0 0% 5%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
                  <text x="78" y="72" textAnchor="middle" fontSize="5" fill="hsl(0 0% 50%)">R bronchus</text>
                  {/* Carina label */}
                  <text x="60" y="16" textAnchor="middle" fontSize="5" fill="hsl(0 0% 50%)">Carina</text>
                </svg>
                <p className="text-[10px] text-muted-foreground text-center mt-1 font-medium">Tracheal lumen FOB view</p>
              </div>
              {/* Bronchial lumen FOB view */}
              <div className="rounded-lg border border-border p-2">
                <svg viewBox="0 0 120 120" className="w-full">
                  <circle cx="60" cy="60" r="55" fill="hsl(0 0% 10%)" stroke="hsl(var(--border))" strokeWidth="1" />
                  <circle cx="60" cy="60" r="40" fill="none" stroke="hsl(0 0% 25%)" strokeWidth="1" />
                  {/* Secondary carina */}
                  <path d="M60,25 L60,50" stroke="hsl(0 0% 35%)" strokeWidth="1.5" />
                  {/* LUL orifice */}
                  <ellipse cx="42" cy="62" rx="16" ry="20" fill="hsl(0 0% 5%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
                  <text x="42" y="65" textAnchor="middle" fontSize="5" fill="hsl(0 0% 50%)">LUL</text>
                  {/* LLL orifice */}
                  <ellipse cx="76" cy="65" rx="14" ry="18" fill="hsl(0 0% 5%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
                  <text x="76" y="68" textAnchor="middle" fontSize="5" fill="hsl(0 0% 50%)">LLL</text>
                  <text x="60" y="22" textAnchor="middle" fontSize="5" fill="hsl(0 0% 50%)">2° carina</text>
                </svg>
                <p className="text-[10px] text-muted-foreground text-center mt-1 font-medium">Bronchial lumen FOB view</p>
              </div>
            </div>
          </div>
        );
      case 8: return renderAirway(true, "seated");
      default: return null;
    }
  };

  return (
    <DiagramFigure
      id="dlt-insertion-diagram"
      title="DLT insertion"
      description="Auto-generated wrapper for the DLT insertion anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
          <h3 className="text-lg font-serif font-bold text-foreground">Double-Lumen Tube — Step-by-Step Insertion Guide</h3>
          <button
            type="button"
            onClick={() => setWalkthroughOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Guided walkthrough
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Navigate through each step, or launch the guided walkthrough to tick off confirmation actions as you progress.</p>
  
        {/* DLT side selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground">DLT side:</span>
          <button onClick={() => setDltSide("left")}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
              dltSide === "left" ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"
            }`}>Left (standard)</button>
          <button onClick={() => setDltSide("right")}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
              dltSide === "right" ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"
            }`}>Right</button>
          {dltSide === "right" && (
            <span className="text-[10px] text-amber-400">⚠ Only for left-sided pathology</span>
          )}
        </div>
  
        {/* Step navigation */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <button key={s.id} onClick={() => setCurrentStep(i)}
              className={`flex-shrink-0 w-8 h-8 rounded-full text-xs font-bold border transition-all ${
                i === currentStep
                  ? "border-primary bg-primary/20 text-foreground"
                  : i < currentStep
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:bg-secondary/40"
              }`}>
              {s.id}
            </button>
          ))}
        </div>
  
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Diagram */}
          <div className="lg:w-1/2 flex-shrink-0">
            {renderStepDiagram(step.id)}
          </div>
  
          {/* Step details */}
          <div className="lg:w-1/2 space-y-3">
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">
                <span className="text-primary mr-1.5">Step {step.id}.</span>
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.instruction}</p>
            </div>
  
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs font-semibold text-foreground mb-1.5">💡 Tips</p>
              {step.tips.map((t, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">• {t}</p>
              ))}
            </div>
  
            {step.pitfalls && step.pitfalls.length > 0 && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-foreground mb-1.5">⚠ Pitfalls</p>
                {step.pitfalls.map((p, i) => (
                  <p key={i} className="text-xs text-muted-foreground leading-relaxed">• {p}</p>
                ))}
              </div>
            )}
  
            {/* Navigation buttons */}
            <div className="flex gap-2 pt-2">
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-secondary transition-all disabled:opacity-30">
                ← Previous
              </button>
              <button onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                disabled={currentStep === STEPS.length - 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-primary/50 bg-primary/10 text-foreground hover:bg-primary/20 transition-all disabled:opacity-30">
                Next →
              </button>
            </div>
          </div>
        </div>
  
        {/* Quick reference sizing table */}
        <div className="mt-6 rounded-lg border border-border p-3">
          <p className="text-xs font-semibold text-foreground mb-2">DLT Sizing Quick Reference</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              { size: "35 Fr", who: "Small ♀ (<160 cm)", color: "hsl(320 50% 55%)" },
              { size: "37 Fr", who: "Average ♀ / Small ♂", color: "hsl(280 45% 55%)" },
              { size: "39 Fr", who: "Average ♂ (most common)", color: "hsl(210 60% 55%)" },
              { size: "41 Fr", who: "Large ♂ (>180 cm)", color: "hsl(150 50% 50%)" },
            ].map(s => (
              <div key={s.size} className="rounded border border-border p-2">
                <p className="text-sm font-bold" style={{ color: s.color }}>{s.size}</p>
                <p className="text-[10px] text-muted-foreground">{s.who}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">Depth at teeth ≈ height (cm) ÷ 10 + 12</p>
        </div>
  
        <GuidedWalkthroughOverlay
          open={walkthroughOpen}
          onClose={() => setWalkthroughOpen(false)}
          steps={walkthroughSteps}
          stepIndex={currentStep}
          onStepChange={setCurrentStep}
          title="DLT insertion — confirmation walkthrough"
          subtitle={`${dltSide === "left" ? "Left-sided" : "Right-sided"} double-lumen tube`}
        />
      </div>
    </DiagramFigure>
  );
};

export default DLTInsertionDiagram;
