import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/* =====================================================================
 * Patient-Positioning step-by-step mechanism animations.
 *
 * Each animation matches a specific MCQ rationale on the
 * Patient Positioning topic page so the visual story and the
 * teaching point reinforce each other.
 *
 *  1. SittingHydrostaticAnimation
 *     → MCQ: zero arterial transducer at the EAM (Circle of Willis).
 *     Walks through the hydrostatic column from heart → tragus and
 *     shows how a heart-zeroed MAP overestimates cerebral MAP by
 *     ~15–20 mmHg (1 cmH₂O ≈ 0.74 mmHg, ΔH ≈ 25 cm).
 *
 *  2. VAEDetectionLadderAnimation
 *     → MCQ: precordial Doppler is the most sensitive non-invasive
 *     monitor for VAE. Ladders the monitors from least → most
 *     sensitive showing the volume of air each will pick up.
 *
 *  3. ParkBenchArmTractionAnimation
 *     → MCQ: dependent arm hangs in a padded sling to off-load the
 *     brachial plexus. Shows the bad set-up (axillary roll IN the
 *     axilla, arm trapped) → progressive nerve traction → reset to
 *     the correct hanging-arm/caudal-roll configuration.
 *
 *  4. ProneIVCFreeAbdomenAnimation
 *     → MCQ: the Jackson (open) table keeps the abdomen free,
 *     decompressing the IVC and reducing epidural venous engorgement
 *     and surgical bleeding. Compares Wilson (compressed) vs Jackson
 *     (free) over the same 6-step cascade.
 *
 *  5. PeronealNerveLithotomyAnimation
 *     → MCQ: common peroneal nerve at the fibular head is the
 *     commonest stirrup neuropathy. Shows the mechanism of compression
 *     between the stirrup post and the lateral fibular head and the
 *     downstream foot drop.
 * ===================================================================*/

/* ---------------------------------------------------------------------
 * 1. Sitting position — hydrostatic gradient
 * -------------------------------------------------------------------*/
const SITTING_STEPS: AnimatedMechanismStep[] = [
  {
    label: "Sit patient up",
    detail: (
      <>
        Trunk elevated to ~60°, head pinned and flexed, knees raised to heart
        level. The brain (Circle of Willis) now sits roughly{" "}
        <strong>25 cm above the right atrium</strong>.
      </>
    ),
  },
  {
    label: "Column = ΔH",
    detail: (
      <>
        That vertical column of blood is a hydrostatic pressure gradient.{" "}
        <strong>1 cmH₂O ≈ 0.74 mmHg</strong>, so 25 cmH₂O ≈{" "}
        <strong>~18 mmHg</strong> of pressure drop between the heart and the
        Circle of Willis.
      </>
    ),
    callout: <>P_brain = P_heart − ρgh</>,
  },
  {
    label: "Zero at heart (wrong)",
    detail: (
      <>
        If the arterial transducer is zeroed at the right atrium, MAP at the
        cuff/transducer reads (e.g.) <strong>80 mmHg</strong> — but the brain
        is being perfused at only <strong>~62 mmHg</strong>. The anaesthetist
        is reassured while the watershed is hypoperfused.
      </>
    ),
  },
  {
    label: "Watershed at risk",
    detail: (
      <>
        Sustained CPP &lt; 50 mmHg in the parieto-occipital watershed
        territory → ischaemic stroke and post-operative visual loss have
        both been reported in sitting / beach-chair surgery zeroed at the
        heart.
      </>
    ),
    callout: <>Reported beach-chair stroke clusters trace back to this single error.</>,
  },
  {
    label: "Re-zero at EAM",
    detail: (
      <>
        Move the transducer up to the <strong>external auditory meatus</strong>{" "}
        — a surface marker for the Circle of Willis. The displayed MAP is now
        a true cerebral MAP and the anaesthetist titrates pressors to a brain
        target, not a heart target.
      </>
    ),
  },
  {
    label: "Maintain CPP > 70",
    detail: (
      <>
        Aim for MAP at the EAM <strong>≥ 70 mmHg</strong> (or within 20 % of
        the patient's awake MAP) for the duration of pinning and dissection.
        Treat hypotension promptly with metaraminol / noradrenaline; do not
        rely on volume alone.
      </>
    ),
    callout: <>Cerebral oximetry (NIRS) is a useful adjunct but not a substitute.</>,
  },
];

export const SittingHydrostaticAnimation = () => (
  <AnimatedMechanism
    title="Sitting position — why the transducer must zero at the EAM"
    subtitle="Walks the hydrostatic column from heart to Circle of Willis and shows the magnitude of the error when the arterial line is zeroed at the heart."
    stepMs={2800}
    steps={SITTING_STEPS}
    accentClass="border-clinical/50"
    renderScene={(active) => (
      <div className="flex items-center justify-center h-full">
        <svg
          viewBox="0 0 320 320"
          className="w-full max-w-[360px] h-auto"
          role="img"
          aria-label="Seated patient with hydrostatic column from right atrium to external auditory meatus"
        >
          <defs>
            <linearGradient id="ppm-col" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--clinical))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--clinical))" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Operating table back-rest */}
          <path
            d="M40,290 L40,80 L150,40 L290,40 L290,60 L160,60 L60,95 L60,290 Z"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
          />

          {/* Patient silhouette (seated, head flexed) */}
          {/* Trunk */}
          <path
            d="M90,260 L100,150 Q120,100 160,90 L210,82 L220,98 L130,160 L120,260 Z"
            fill="hsl(var(--muted-foreground) / 0.18)"
            stroke="hsl(var(--border))"
          />
          {/* Head (pinned, flexed) */}
          <circle
            cx="218"
            cy="78"
            r="22"
            fill="hsl(var(--muted-foreground) / 0.22)"
            stroke="hsl(var(--border))"
          />
          {/* Mayfield pin marker */}
          <circle cx="232" cy="68" r="2.5" fill="hsl(var(--foreground))" />
          <circle cx="206" cy="60" r="2.5" fill="hsl(var(--foreground))" />
          <circle cx="226" cy="92" r="2.5" fill="hsl(var(--foreground))" />

          {/* Knees raised to heart level */}
          <path
            d="M120,260 Q170,250 200,240 L240,260 L240,278 L120,278 Z"
            fill="hsl(var(--muted-foreground) / 0.18)"
            stroke="hsl(var(--border))"
          />

          {/* Right atrium reference */}
          <circle
            cx="135"
            cy="170"
            r="8"
            fill={active >= 2 ? "hsl(var(--clinical))" : "hsl(var(--muted-foreground))"}
            opacity={active >= 0 ? 1 : 0.4}
          />
          <text x="68" y="174" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
            RA
          </text>

          {/* External Auditory Meatus reference (Circle of Willis) */}
          <circle
            cx="208"
            cy="78"
            r="6"
            fill={active >= 4 ? "hsl(var(--clinical))" : "hsl(var(--muted-foreground))"}
          />
          {active >= 4 && (
            <text x="155" y="62" className="text-[9px] font-semibold" fill="hsl(var(--clinical))">
              EAM = CoW
            </text>
          )}

          {/* Hydrostatic column (only after step 1) */}
          {active >= 1 && (
            <g className="animate-fade-in">
              <line
                x1="270"
                y1="78"
                x2="270"
                y2="170"
                stroke="url(#ppm-col)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Tick marks */}
              {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                const y = 78 + (170 - 78) * t;
                return (
                  <line
                    key={i}
                    x1="280"
                    y1={y}
                    x2="288"
                    y2={y}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1"
                  />
                );
              })}
              <text x="295" y="124" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">
                ΔH ≈ 25 cm
              </text>
              <text x="295" y="138" className="text-[9px]" fill="hsl(var(--muted-foreground))">
                ≈ 18 mmHg
              </text>
            </g>
          )}

          {/* Wrong-zero callout (step 2) */}
          {active === 2 && (
            <g className="animate-fade-in">
              <rect
                x="20"
                y="155"
                width="80"
                height="34"
                rx="6"
                fill="hsl(var(--destructive) / 0.15)"
                stroke="hsl(var(--destructive))"
              />
              <text x="60" y="170" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--destructive))">
                MAP 80
              </text>
              <text x="60" y="184" textAnchor="middle" className="text-[8px]" fill="hsl(var(--destructive))">
                @ heart
              </text>
            </g>
          )}

          {/* Brain MAP at step 2-3 */}
          {(active === 2 || active === 3) && (
            <g className="animate-fade-in">
              <rect
                x="120"
                y="40"
                width="80"
                height="30"
                rx="6"
                fill="hsl(var(--destructive) / 0.2)"
                stroke="hsl(var(--destructive))"
              />
              <text x="160" y="60" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--destructive))">
                CPP ≈ 62
              </text>
            </g>
          )}

          {/* Watershed shading at step 3 */}
          {active === 3 && (
            <g className="animate-fade-in">
              <ellipse cx="220" cy="78" rx="14" ry="8" fill="hsl(var(--destructive) / 0.4)">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.4s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}

          {/* Correct-zero callout (steps 4-5) */}
          {active >= 4 && (
            <g className="animate-fade-in">
              <rect
                x="20"
                y="60"
                width="92"
                height="34"
                rx="6"
                fill="hsl(var(--accent) / 0.18)"
                stroke="hsl(var(--accent))"
              />
              <text x="66" y="76" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--accent))">
                MAP 80 @ EAM
              </text>
              <text x="66" y="89" textAnchor="middle" className="text-[8px]" fill="hsl(var(--accent))">
                = true cerebral MAP
              </text>
              {/* Arrow from cuff to EAM */}
              <line
                x1="112"
                y1="77"
                x2="200"
                y2="78"
                stroke="hsl(var(--accent))"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </g>
          )}
        </svg>
      </div>
    )}
  />
);

/* ---------------------------------------------------------------------
 * 2. VAE detection sensitivity ladder
 * -------------------------------------------------------------------*/
const VAE_STEPS: AnimatedMechanismStep[] = [
  {
    label: "Air entrains",
    detail: (
      <>
        A non-collapsed dural sinus or emissary vein sits ABOVE the right
        atrium in sitting / park-bench. The negative pressure gradient
        sucks air into the venous circulation.
      </>
    ),
    callout: <>Bone wax + saline flooding by surgeon — tell them immediately.</>,
  },
  {
    label: "Pulse oximetry",
    detail: (
      <>
        SpO₂ falls only when V/Q has already crashed — usually after{" "}
        <strong>&gt; 1 mL/kg</strong> of intracardiac air. By the time it
        moves you are managing arrest, not VAE.
      </>
    ),
  },
  {
    label: "End-tidal CO₂",
    detail: (
      <>
        EtCO₂ falls when the air bubble obstructs pulmonary outflow and
        increases dead-space. Detects ~<strong>0.5 mL/kg</strong> air —
        useful and continuous, but not the earliest signal.
      </>
    ),
  },
  {
    label: "End-tidal N₂",
    detail: (
      <>
        EtN₂ rises within seconds of any clinically meaningful entrainment
        because room air is 78 % N₂. More sensitive than EtCO₂ but
        requires a multi-gas analyser tuned for N₂ — not always available.
      </>
    ),
  },
  {
    label: "Precordial Doppler",
    detail: (
      <>
        Continuous-wave Doppler over the right 2nd–3rd intercostal space
        produces the classic "mill-wheel" murmur from{" "}
        <strong>0.05 mL</strong> of intracardiac air — 100× more sensitive
        than EtCO₂. <strong>The most sensitive non-invasive monitor.</strong>
      </>
    ),
    callout: <>MCQ answer — winning combination with EtN₂ and a multi-orifice CVC.</>,
  },
  {
    label: "TOE (gold standard)",
    detail: (
      <>
        Transoesophageal echo detects micro-bubbles &lt; 0.02 mL and is the
        true gold standard, but it is invasive, requires expertise and
        crowds the surgical access. Reserved for very high-risk cases or
        confirmed PFO.
      </>
    ),
  },
];

const VAE_SENS = [
  { label: "SpO₂", vol: "> 1 mL/kg", x: 18 },
  { label: "EtCO₂", vol: "0.5 mL/kg", x: 38 },
  { label: "EtN₂", vol: "0.1 mL/kg", x: 55 },
  { label: "Doppler", vol: "0.05 mL", x: 72 },
  { label: "TOE", vol: "0.02 mL", x: 88 },
];

export const VAEDetectionLadderAnimation = () => (
  <AnimatedMechanism
    title="Detecting venous air embolism — sensitivity ladder"
    subtitle="Each monitor is graded by the volume of air it will reliably detect. The active step lights up the corresponding rung."
    stepMs={2600}
    steps={VAE_STEPS}
    accentClass="border-clinical/50"
    renderScene={(active) => (
      <div className="flex items-center justify-center h-full">
        <svg
          viewBox="0 0 320 240"
          className="w-full max-w-[360px] h-auto"
          role="img"
          aria-label="Sensitivity ladder of monitors used to detect venous air embolism"
        >
          {/* Y-axis */}
          <line x1="40" y1="30" x2="40" y2="210" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="20" y="34" className="text-[9px]" fill="hsl(var(--muted-foreground))" transform="rotate(-90 20 34)">
            sensitivity
          </text>

          {/* Ladder rungs (highest sensitivity at top, lowest at bottom) */}
          {VAE_SENS.map((m, i) => {
            // step index in animation: 0=entrains, then 1..5 map to monitors
            const monitorActive = active === i + 1;
            const monitorPassed = active > i + 1 || active === 5; // illuminate as we ladder up
            const y = 200 - i * 32;
            return (
              <g key={m.label}>
                <line
                  x1="40"
                  y1={y}
                  x2="290"
                  y2={y}
                  stroke={monitorActive ? "hsl(var(--clinical))" : "hsl(var(--border))"}
                  strokeWidth={monitorActive ? "2" : "1"}
                  strokeDasharray={monitorActive ? undefined : "3 3"}
                />
                <circle
                  cx={40 + (m.x / 100) * 250}
                  cy={y}
                  r={monitorActive ? "8" : "5"}
                  fill={
                    monitorActive
                      ? "hsl(var(--clinical))"
                      : monitorPassed
                      ? "hsl(var(--clinical) / 0.4)"
                      : "hsl(var(--muted-foreground) / 0.4)"
                  }
                  stroke={monitorActive ? "hsl(var(--clinical))" : "hsl(var(--border))"}
                >
                  {monitorActive && (
                    <animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
                  )}
                </circle>
                <text
                  x={45}
                  y={y - 4}
                  className="text-[9px] font-semibold"
                  fill={monitorActive ? "hsl(var(--clinical))" : "hsl(var(--foreground))"}
                >
                  {m.label}
                </text>
                <text x={285} y={y - 4} textAnchor="end" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                  {m.vol}
                </text>
              </g>
            );
          })}

          {/* Air entrainment (step 0) */}
          {active === 0 && (
            <g className="animate-fade-in">
              <text x="160" y="20" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--destructive))">
                Air entering venous circulation
              </text>
              {[0, 0.4, 0.8].map((d, i) => (
                <circle key={i} cx="60" cy="220" r="3" fill="hsl(var(--destructive))">
                  <animate attributeName="cy" values="220;30" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}
        </svg>
      </div>
    )}
  />
);

/* ---------------------------------------------------------------------
 * 3. Park-bench: brachial plexus traction vs hanging arm
 * -------------------------------------------------------------------*/
const PB_STEPS: AnimatedMechanismStep[] = [
  {
    label: "Wrong: roll IN axilla",
    detail: (
      <>
        Trainee places the "axillary roll" directly into the dependent
        axilla. This is the <strong>opposite</strong> of what the name
        implies — it compresses the axillary artery and brachial plexus
        against the humeral head.
      </>
    ),
    callout: <>The "axillary roll" must sit on the chest wall caudal to the axilla.</>,
  },
  {
    label: "Plexus stretched",
    detail: (
      <>
        The dependent shoulder is pushed cephalad while the arm is trapped
        underneath the body — the brachial plexus is now both compressed
        AND stretched between the clavicle and the first rib.
      </>
    ),
  },
  {
    label: "Pulse lost",
    detail: (
      <>
        Within minutes the radial pulse and SpO₂ trace on the dependent
        hand become unreliable. Post-op the patient wakes with C5–T1
        weakness — a "rucksack palsy" mechanism.
      </>
    ),
  },
  {
    label: "Reset: roll caudad",
    detail: (
      <>
        The roll (gel pad / 1-L bag) is moved to the chest wall{" "}
        <strong>2–3 finger-breadths CAUDAL</strong> to the axilla. It
        offloads the dependent shoulder by tilting the thorax slightly,
        not by stuffing the axilla.
      </>
    ),
  },
  {
    label: "Arm hangs free",
    detail: (
      <>
        The dependent arm is brought out from under the body and rests in
        a <strong>padded sling</strong> off the table edge — neutral
        shoulder, elbow slightly flexed, wrist supported. No pressure on
        the brachial plexus, no traction on the cords.
      </>
    ),
    callout: <>The defining feature of the park-bench — MCQ answer.</>,
  },
  {
    label: "Pulse + SpO₂ check",
    detail: (
      <>
        Confirm the radial pulse and a clean plethysmographic trace on the
        dependent hand AFTER positioning. Re-check at 30-min intervals.
        The same trace is your live monitor that the plexus is unloaded
        throughout the case.
      </>
    ),
  },
];

export const ParkBenchArmTractionAnimation = () => (
  <AnimatedMechanism
    title="Park-bench — protecting the dependent brachial plexus"
    subtitle="Animates the difference between the WRONG axillary-roll-in-axilla setup and the CORRECT caudal-roll + hanging-arm sling that off-loads the plexus."
    stepMs={2600}
    steps={PB_STEPS}
    accentClass="border-clinical/50"
    renderScene={(active) => {
      const wrongPhase = active <= 2;
      return (
        <div className="flex items-center justify-center h-full">
          <svg
            viewBox="0 0 320 240"
            className="w-full max-w-[360px] h-auto"
            role="img"
            aria-label="Park-bench position showing wrong vs correct dependent arm and axillary roll placement"
          >
            {/* Table */}
            <rect x="20" y="160" width="280" height="14" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <rect x="40" y="174" width="6" height="40" fill="hsl(var(--muted-foreground))" />
            <rect x="274" y="174" width="6" height="40" fill="hsl(var(--muted-foreground))" />

            {/* Patient torso side-on (lateral) */}
            <ellipse
              cx="160"
              cy="140"
              rx="100"
              ry="22"
              fill="hsl(var(--muted-foreground) / 0.2)"
              stroke="hsl(var(--border))"
            />
            {/* Head pinned */}
            <circle cx="60" cy="130" r="18" fill="hsl(var(--muted-foreground) / 0.25)" stroke="hsl(var(--border))" />
            <circle cx="48" cy="124" r="2" fill="hsl(var(--foreground))" />
            <circle cx="72" cy="124" r="2" fill="hsl(var(--foreground))" />
            <circle cx="60" cy="142" r="2" fill="hsl(var(--foreground))" />

            {/* Shoulder (dependent) */}
            <circle
              cx="105"
              cy="148"
              r="11"
              fill={wrongPhase ? "hsl(var(--destructive) / 0.3)" : "hsl(var(--accent) / 0.3)"}
              stroke={wrongPhase ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
              strokeWidth="1.5"
            />

            {/* Brachial plexus rendered as wavy lines from neck down to arm */}
            <path
              d={
                wrongPhase
                  ? "M85,135 Q95,150 110,158 Q120,166 130,180" /* stretched */
                  : "M85,135 Q98,145 108,150 Q118,156 128,160" /* slack */
              }
              fill="none"
              stroke={wrongPhase ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
              strokeWidth={wrongPhase ? "2.5" : "2"}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            <path
              d={
                wrongPhase
                  ? "M88,130 Q100,148 115,160 Q125,170 132,182"
                  : "M88,130 Q102,142 112,148 Q122,154 130,158"
              }
              fill="none"
              stroke={wrongPhase ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
              strokeWidth={wrongPhase ? "2.5" : "2"}
              strokeLinecap="round"
              className="transition-all duration-700"
            />

            {/* WRONG roll — inside the axilla */}
            {wrongPhase && (
              <g className="animate-fade-in">
                <ellipse cx="105" cy="158" rx="10" ry="6" fill="hsl(var(--destructive))" opacity="0.7" />
                <text x="160" y="40" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--destructive))">
                  ✗ Roll IN axilla
                </text>
              </g>
            )}

            {/* CORRECT roll — caudal to axilla, on chest wall */}
            {!wrongPhase && active >= 3 && (
              <g className="animate-fade-in">
                <ellipse cx="135" cy="158" rx="14" ry="6" fill="hsl(var(--accent))" opacity="0.65" />
                <text x="160" y="40" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--accent))">
                  ✓ Roll caudal to axilla
                </text>
                <line
                  x1="135"
                  y1="170"
                  x2="135"
                  y2="195"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text x="135" y="208" textAnchor="middle" className="text-[8px]" fill="hsl(var(--accent))">
                  2-3 finger-breadths
                </text>
              </g>
            )}

            {/* Dependent arm — trapped (wrong) vs hanging in sling (correct) */}
            {wrongPhase ? (
              /* Trapped under body */
              <g>
                <path
                  d="M105,155 Q120,175 145,180 L165,184"
                  fill="none"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {active === 2 && (
                  <text x="170" y="178" className="text-[9px] font-semibold" fill="hsl(var(--destructive))">
                    pulse lost
                  </text>
                )}
              </g>
            ) : (
              active >= 4 && (
                /* Hanging in sling off the table edge */
                <g className="animate-fade-in">
                  <path
                    d="M105,158 L80,200 L60,225"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Sling */}
                  <path
                    d="M50,222 Q60,230 72,225"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                  />
                  <path
                    d="M50,222 L40,180"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />
                  <text x="20" y="178" className="text-[8px] font-semibold" fill="hsl(var(--accent))">
                    padded sling
                  </text>
                  {active === 5 && (
                    <g className="animate-fade-in">
                      <circle cx="60" cy="225" r="8" fill="none" stroke="hsl(var(--accent))" strokeWidth="1">
                        <animate attributeName="r" values="6;12;6" dur="1.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0;1" dur="1.4s" repeatCount="indefinite" />
                      </circle>
                      <text x="60" y="240" textAnchor="middle" className="text-[8px] font-semibold" fill="hsl(var(--accent))">
                        SpO₂ ✓
                      </text>
                    </g>
                  )}
                </g>
              )
            )}
          </svg>
        </div>
      );
    }}
  />
);

/* ---------------------------------------------------------------------
 * 4. Prone IVC compression — Wilson vs Jackson
 * -------------------------------------------------------------------*/
const PRONE_IVC_STEPS: AnimatedMechanismStep[] = [
  {
    label: "Patient turned prone",
    detail: (
      <>
        Five-person log roll, anaesthetist controls the airway. Two
        positioning options: a Wilson-style frame with a single abdominal
        pad, or a Jackson (open) table with the abdomen completely free.
      </>
    ),
  },
  {
    label: "Wilson: abdomen pressed",
    detail: (
      <>
        On a Wilson frame the abdomen rests on a padded arch. Body weight
        is transmitted into the abdominal compartment, raising{" "}
        <strong>intra-abdominal pressure</strong> well above baseline.
      </>
    ),
    callout: <>↑ IAP also ↓ FRC and ↓ pulmonary compliance — worse ventilation too.</>,
  },
  {
    label: "IVC compressed",
    detail: (
      <>
        Raised IAP collapses the inferior vena cava against the vertebral
        bodies. <strong>Venous return ↓</strong>, preload ↓, cardiac
        output ↓.
      </>
    ),
  },
  {
    label: "Epidural veins engorge",
    detail: (
      <>
        Blood that cannot return via the IVC is shunted up the
        valveless internal vertebral (Batson's) plexus. The epidural
        venous plexus engorges directly within the surgical field —{" "}
        <strong>more bleeding, worse view, longer operating time</strong>.
      </>
    ),
  },
  {
    label: "Switch to Jackson",
    detail: (
      <>
        On the Jackson (open) table, the patient is supported by chest
        and pelvic / thigh pads with the entire abdomen suspended
        between them. No abdominal contact = no rise in IAP.
      </>
    ),
    callout: <>MCQ answer — Jackson is the frame that "lets the abdomen hang free".</>,
  },
  {
    label: "IVC + bleeding ↓",
    detail: (
      <>
        IVC flow restored → preload preserved, cardiac output stable, and
        — critically for the surgeon — epidural venous engorgement
        falls. Blood loss in lumbar fusion is reproducibly lower on
        Jackson than on a Wilson.
      </>
    ),
  },
];

export const ProneIVCFreeAbdomenAnimation = () => (
  <AnimatedMechanism
    title="Prone — why the Jackson table beats the Wilson frame for IVC compression"
    subtitle="Side-on cross-section. Watch IAP rise on the Wilson, the IVC collapse and the epidural venous plexus engorge — then reset on the Jackson with the abdomen free."
    stepMs={2800}
    steps={PRONE_IVC_STEPS}
    accentClass="border-clinical/50"
    renderScene={(active) => {
      const isWilson = active >= 1 && active <= 3;
      const isJackson = active >= 4;
      return (
        <div className="flex items-center justify-center h-full">
          <svg
            viewBox="0 0 340 220"
            className="w-full max-w-[380px] h-auto"
            role="img"
            aria-label="Prone patient side-on showing IVC compression on Wilson frame versus free abdomen on Jackson table"
          >
            {/* Floor */}
            <line x1="10" y1="200" x2="330" y2="200" stroke="hsl(var(--border))" />

            {/* Frame */}
            {isWilson || active === 0 ? (
              <g>
                {/* Wilson arch */}
                <path
                  d="M60,180 Q170,100 280,180"
                  fill="none"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <text x="170" y="195" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--muted-foreground))">
                  Wilson frame
                </text>
              </g>
            ) : (
              <g>
                {/* Jackson — chest + pelvic posts only */}
                <rect x="70" y="130" width="40" height="60" rx="4" fill="hsl(var(--muted-foreground))" />
                <rect x="230" y="130" width="40" height="60" rx="4" fill="hsl(var(--muted-foreground))" />
                <text x="170" y="195" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--muted-foreground))">
                  Jackson (open) table
                </text>
              </g>
            )}

            {/* Patient body — sagittal cross-section */}
            <path
              d={
                isWilson
                  ? "M50,80 L290,80 Q310,80 310,100 L310,140 Q170,170 30,140 L30,100 Q30,80 50,80 Z" /* compressed downward */
                  : "M50,80 L290,80 Q310,80 310,100 L310,130 Q170,135 30,130 L30,100 Q30,80 50,80 Z"
              }
              fill="hsl(var(--muted-foreground) / 0.18)"
              stroke="hsl(var(--border))"
              className="transition-all duration-700"
            />

            {/* Spine (top edge — patient is prone) */}
            <line x1="50" y1="85" x2="290" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" strokeDasharray="4 2" />
            <text x="170" y="78" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">
              spine (posterior)
            </text>

            {/* IVC — anterior to vertebral bodies; here drawn near top of body */}
            <ellipse
              cx="170"
              cy={isWilson ? 105 : 100}
              rx={isWilson ? 4 : 16}
              ry="5"
              fill={isWilson ? "hsl(var(--destructive))" : "hsl(var(--clinical))"}
              stroke={isWilson ? "hsl(var(--destructive))" : "hsl(var(--clinical))"}
              className="transition-all duration-700"
            />
            <text
              x={188}
              y={isWilson ? 108 : 103}
              className="text-[9px] font-semibold"
              fill={isWilson ? "hsl(var(--destructive))" : "hsl(var(--clinical))"}
            >
              IVC
            </text>

            {/* Abdominal pad / contact (Wilson only) */}
            {active >= 1 && active <= 3 && (
              <g className="animate-fade-in">
                <ellipse cx="170" cy="138" rx="40" ry="6" fill="hsl(var(--destructive) / 0.5)" />
                <text x="170" y="155" textAnchor="middle" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">
                  ↑ IAP
                </text>
                {/* Compression arrows */}
                {[140, 165, 195].map((x) => (
                  <g key={x}>
                    <line x1={x} y1="160" x2={x} y2="125" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#ppm-arr)" />
                  </g>
                ))}
              </g>
            )}

            {/* Epidural venous plexus engorged (step 3) */}
            {active === 3 && (
              <g className="animate-fade-in">
                {[80, 120, 170, 220, 260].map((x, i) => (
                  <circle key={i} cx={x} cy="88" r="3" fill="hsl(var(--destructive))">
                    <animate attributeName="r" values="2;4;2" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                ))}
                <text x="170" y="65" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--destructive))">
                  Batson's plexus engorged → bleeding
                </text>
              </g>
            )}

            {/* Restored flow (step 5) */}
            {active === 5 && (
              <g className="animate-fade-in">
                {[0, 0.5, 1].map((d, i) => (
                  <circle key={i} cx="60" cy="100" r="3" fill="hsl(var(--clinical))">
                    <animate attributeName="cx" values="60;290" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                <text x="170" y="65" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--clinical))">
                  IVC flow restored ✓
                </text>
              </g>
            )}

            <defs>
              <marker id="ppm-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--destructive))" />
              </marker>
            </defs>
          </svg>
        </div>
      );
    }}
  />
);

/* ---------------------------------------------------------------------
 * 5. Lithotomy — common peroneal nerve at the fibular head
 * -------------------------------------------------------------------*/
const PERONEAL_STEPS: AnimatedMechanismStep[] = [
  {
    label: "Lithotomy stirrup",
    detail: (
      <>
        Hip and knee flexed to ~90°, leg held in a candy-cane (older) or
        Allen-style boot (modern). The lateral aspect of the upper calf
        sits against the post / boot edge.
      </>
    ),
  },
  {
    label: "Common peroneal exposed",
    detail: (
      <>
        The common peroneal nerve winds around the{" "}
        <strong>neck of the fibula</strong> just below the lateral knee —
        only skin and a thin layer of subcutaneous fat sit between the
        nerve and bone.
      </>
    ),
    callout: <>This is the most superficial major peripheral nerve in the leg.</>,
  },
  {
    label: "Compression",
    detail: (
      <>
        With the leg in the stirrup, the fibular head is pressed against
        the rigid post — the nerve is squeezed between the post (outside)
        and bone (inside). Effect grows linearly with operating time.
      </>
    ),
  },
  {
    label: "Ischaemia → neuropraxia",
    detail: (
      <>
        Sustained compression &gt; 2 h causes endoneurial ischaemia and
        focal demyelination — a neuropraxia. The deep peroneal branch
        (motor) is more vulnerable than the superficial branch.
      </>
    ),
  },
  {
    label: "Foot drop",
    detail: (
      <>
        The patient wakes with weakness of ankle dorsiflexion and
        eversion (foot drop) plus loss of sensation over the dorsum of
        the foot and first web-space. Recovery takes weeks; complete
        transection is rare.
      </>
    ),
    callout: <>Commonest position-related neuropathy in lithotomy — MCQ answer.</>,
  },
  {
    label: "Prevention",
    detail: (
      <>
        Use boot-style stirrups (load on the heel, not the lateral calf),
        pad the fibular head, keep hip flexion &lt; 90°, and{" "}
        <strong>lower the legs every 2 h</strong> on long Lloyd-Davies
        cases. Document the pad and pulse check after every position
        change.
      </>
    ),
  },
];

export const PeronealNerveLithotomyAnimation = () => (
  <AnimatedMechanism
    title="Lithotomy — common peroneal nerve at the fibular head"
    subtitle="Zoomed view of the lateral knee in a stirrup. Watch the nerve get caught between the post and the fibular head, the focal ischaemia and the resulting foot drop."
    stepMs={2600}
    steps={PERONEAL_STEPS}
    accentClass="border-clinical/50"
    renderScene={(active) => (
      <div className="flex items-center justify-center h-full">
        <svg
          viewBox="0 0 320 240"
          className="w-full max-w-[360px] h-auto"
          role="img"
          aria-label="Lateral view of a knee in a lithotomy stirrup showing the common peroneal nerve compressed at the fibular neck"
        >
          {/* Stirrup post */}
          <rect
            x="40"
            y="40"
            width="14"
            height="180"
            rx="3"
            fill={active >= 2 ? "hsl(var(--destructive) / 0.7)" : "hsl(var(--muted-foreground))"}
            stroke="hsl(var(--border))"
          />
          <text x="20" y="135" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))" transform="rotate(-90 20 135)">
            stirrup
          </text>

          {/* Femur (upper leg, going up-right) */}
          <path
            d="M150,80 L260,40 L268,52 L160,96 Z"
            fill="hsl(var(--muted-foreground) / 0.25)"
            stroke="hsl(var(--border))"
          />
          <text x="220" y="55" className="text-[8px]" fill="hsl(var(--muted-foreground))">
            femur
          </text>

          {/* Calf — tibia + fibula (lateral) */}
          {/* Tibia */}
          <path
            d="M150,90 L70,180 L82,192 L162,102 Z"
            fill="hsl(var(--muted-foreground) / 0.25)"
            stroke="hsl(var(--border))"
          />
          {/* Fibula (lateral, smaller) */}
          <path
            d="M158,98 L78,188 L86,196 L165,108 Z"
            fill="hsl(var(--muted-foreground) / 0.35)"
            stroke="hsl(var(--border))"
          />

          {/* Fibular head — highlighted node */}
          <circle
            cx="156"
            cy="105"
            r={active >= 1 ? "8" : "5"}
            fill={active >= 2 ? "hsl(var(--destructive))" : "hsl(var(--clinical))"}
            stroke="hsl(var(--foreground))"
            strokeWidth="1"
            className="transition-all duration-500"
          />
          {active >= 1 && (
            <text x="170" y="100" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
              fibular head
            </text>
          )}

          {/* Common peroneal nerve — wraps around the fibular neck */}
          <path
            d="M180,75 Q165,90 148,108 Q140,120 130,140 Q120,160 110,180"
            fill="none"
            stroke={active >= 2 ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
            strokeWidth={active >= 2 ? "3.5" : "2.5"}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {active >= 1 && (
            <text x="186" y="76" className="text-[9px] font-semibold" fill={active >= 2 ? "hsl(var(--destructive))" : "hsl(var(--accent))"}>
              common peroneal n.
            </text>
          )}

          {/* Compression arrow (step 2+) */}
          {active >= 2 && (
            <g className="animate-fade-in">
              <line
                x1="62"
                y1="108"
                x2="142"
                y2="108"
                stroke="hsl(var(--destructive))"
                strokeWidth="2"
                markerEnd="url(#ppm-pn-arr)"
              />
              <text x="100" y="100" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--destructive))">
                compression
              </text>
            </g>
          )}

          {/* Ischaemia ring (step 3) */}
          {active === 3 && (
            <circle cx="148" cy="108" r="14" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="3 2">
              <animate attributeName="r" values="10;18;10" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Foot — neutral vs dropped */}
          <g className="transition-transform duration-700" style={{ transformOrigin: "98px 188px", transform: active === 4 ? "rotate(45deg)" : "rotate(0deg)" }}>
            <path
              d="M82,192 L98,200 L130,204 L130,214 L98,214 L80,206 Z"
              fill={active === 4 ? "hsl(var(--destructive) / 0.4)" : "hsl(var(--muted-foreground) / 0.3)"}
              stroke="hsl(var(--border))"
            />
          </g>
          {active === 4 && (
            <text x="160" y="220" className="text-[10px] font-bold" fill="hsl(var(--destructive))">
              foot drop
            </text>
          )}

          {/* Prevention overlay (step 5) */}
          {active === 5 && (
            <g className="animate-fade-in">
              <rect x="180" y="150" width="130" height="70" rx="6" fill="hsl(var(--accent) / 0.12)" stroke="hsl(var(--accent))" />
              <text x="245" y="166" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--accent))">
                prevention
              </text>
              <text x="188" y="182" className="text-[8px]" fill="hsl(var(--foreground))">• boot-style stirrup</text>
              <text x="188" y="194" className="text-[8px]" fill="hsl(var(--foreground))">• pad fibular head</text>
              <text x="188" y="206" className="text-[8px]" fill="hsl(var(--foreground))">• hip flexion &lt; 90°</text>
              <text x="188" y="218" className="text-[8px]" fill="hsl(var(--foreground))">• down-time q2h</text>
            </g>
          )}

          <defs>
            <marker id="ppm-pn-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--destructive))" />
            </marker>
          </defs>
        </svg>
      </div>
    )}
  />
);
