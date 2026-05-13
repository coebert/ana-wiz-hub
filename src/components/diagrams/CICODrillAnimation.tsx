import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/**
 * CICO ("can't intubate, can't oxygenate") — DAS 2015 emergency front-of-neck
 * access drill, presented as a 6-step animated mechanism.
 *
 * The scene is a stylised neck with cricothyroid landmark; the active step
 * highlights the relevant anatomical structure or instrument. Pure design
 * tokens — no raw colours.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Declare CICO",
    detail: (
      <>
        Call it out loud: <strong>"This is a CICO situation."</strong> Stop further
        intubation attempts (they worsen oedema and bleeding). Maximise FiO₂ 1.0,
        continue face-mask + 2-handed jaw-thrust, ensure paralysis (sux 1 mg/kg
        IV or roc 1.2 mg/kg) — laryngospasm or light anaesthesia masquerade as
        CICO surprisingly often.
      </>
    ),
    callout: <>Don't waste time on a 4th laryngoscopy. Time-to-FONA &lt; 5 min.</>,
  },
  {
    label: "Position & expose",
    detail: (
      <>
        Extend the neck on a pillow if no C-spine concern. Stand on the
        patient's left (right-handed operator). Stabilise the larynx between
        thumb and middle finger of the non-dominant hand throughout the entire
        procedure — do <em>not</em> let go.
      </>
    ),
  },
  {
    label: "Identify CTM",
    detail: (
      <>
        Palpate the laryngeal handshake — thyroid notch above, cricoid ring
        below. The <strong>cricothyroid membrane</strong> sits in the dip
        between them, ~1 finger-breadth below the thyroid prominence.
        Difficult/obese neck: use a longitudinal midline incision first to find
        the membrane by feel.
      </>
    ),
    callout: <>Bedside ultrasound (linear probe, transverse) increases first-pass success.</>,
  },
  {
    label: "Stab",
    detail: (
      <>
        <strong>Transverse stab</strong> through skin and CTM with a size-10
        scalpel, blade pointing caudad. If you cannot palpate the CTM, make a
        vertical 8–10 cm midline skin incision first, then re-palpate and stab
        transversely.
      </>
    ),
    callout: <>Expect bleeding — irrelevant if oxygenation is restored.</>,
  },
  {
    label: "Bougie",
    detail: (
      <>
        Rotate the scalpel 90° (sharp edge caudad), then slide a{" "}
        <strong>bougie</strong> alongside the blade into the trachea. Aim
        45° caudad. Feel for tracheal-ring clicks; do not force past
        carina (~10–15 cm depth).
      </>
    ),
  },
  {
    label: "Tube + confirm",
    detail: (
      <>
        Withdraw the scalpel. Railroad a <strong>cuffed 6.0 ETT</strong> over
        the bougie, advance ~2 cm beyond the cuff, inflate. Confirm with
        sustained square-wave <strong>ETCO₂</strong>, bilateral chest rise, and
        SpO₂ recovery. Hand over to ENT/maxfax for definitive airway.
      </>
    ),
    callout: <>NAP4: most CICO deaths occur from delay or failure to perform FONA, not from FONA itself.</>,
  },
];

const STEP_DURATIONS = [3000, 2400, 2800, 2600, 2600, 3200];

export const CICODrillAnimation = () => {
  const stepsWithDur = STEPS.map((s, i) => ({ ...s, durationMs: STEP_DURATIONS[i] }));

  return (
            <AnimatedMechanism
      title="CICO emergency drill — scalpel-bougie-tube (DAS 2015)"
      subtitle="Auto-plays through the 6 steps of the front-of-neck access cricothyroidotomy. Use the chips or arrows to scrub. Target: complete drill in under 60 seconds."
      stepMs={2600}
      steps={stepsWithDur}
      accentClass="border-clinical/50"
      renderScene={(active) => (
        <div className="flex items-center justify-center h-full">
          <svg
            viewBox="0 0 320 280"
            className="w-full max-w-[340px] h-auto"
            role="img"
            aria-label="Stylised anterior neck showing cricothyroid membrane and FONA equipment"
          >
            {/* Neck silhouette */}
            <path
              d="M60,30 C60,30 90,10 160,10 C230,10 260,30 260,30 L260,270 L60,270 Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />

            {/* Mandible */}
            <path
              d="M70,40 Q160,15 250,40 L250,55 Q160,32 70,55 Z"
              fill="hsl(var(--muted-foreground) / 0.15)"
              stroke="hsl(var(--border))"
            />

            {/* Thyroid cartilage (notch + body) */}
            <path
              d="M120,90 L160,82 L200,90 L200,140 L120,140 Z"
              fill={active === 2 ? "hsl(var(--clinical) / 0.25)" : "hsl(var(--card))"}
              stroke={active === 2 ? "hsl(var(--clinical))" : "hsl(var(--border))"}
              strokeWidth={active === 2 ? "2.5" : "1.5"}
              className="transition-all duration-500"
            />
            <path
              d="M155,82 L160,75 L165,82"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />

            {/* Cricothyroid membrane (the target!) */}
            <rect
              x="125"
              y="142"
              width="70"
              height="14"
              rx="2"
              fill={
                active >= 2 && active <= 4
                  ? "hsl(var(--accent) / 0.55)"
                  : "hsl(var(--accent) / 0.2)"
              }
              stroke={
                active >= 2 && active <= 4 ? "hsl(var(--accent))" : "hsl(var(--border))"
              }
              strokeWidth={active === 2 ? "2.5" : "1.5"}
              className="transition-all duration-500"
            />
            {active === 2 && (
              <text
                x="160"
                y="153"
                textAnchor="middle"
                className="text-[10px] font-semibold fill-foreground"
              >
                CTM
              </text>
            )}

            {/* Cricoid cartilage */}
            <rect
              x="118"
              y="158"
              width="84"
              height="22"
              rx="3"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />

            {/* Tracheal rings */}
            {[0, 1, 2, 3].map((i) => (
              <ellipse
                key={i}
                cx="160"
                cy={196 + i * 16}
                rx="38"
                ry="6"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
            ))}

            {/* STAB — scalpel coming in */}
            {active === 3 && (
              <g className="animate-fade-in">
                <line
                  x1="50"
                  y1="100"
                  x2="135"
                  y2="148"
                  stroke="hsl(var(--clinical))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <polygon
                  points="135,148 128,143 130,153"
                  fill="hsl(var(--clinical))"
                />
                <text
                  x="55"
                  y="92"
                  className="text-[10px] font-semibold fill-clinical"
                  fill="hsl(var(--clinical))"
                >
                  scalpel
                </text>
              </g>
            )}

            {/* BOUGIE — slid into trachea */}
            {active === 4 && (
              <g className="animate-fade-in">
                <path
                  d="M40,150 Q100,150 145,170 Q160,180 160,210"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="160" cy="210" r="3" fill="hsl(var(--accent))" />
                <text
                  x="40"
                  y="142"
                  className="text-[10px] font-semibold"
                  fill="hsl(var(--accent))"
                >
                  bougie
                </text>
              </g>
            )}

            {/* TUBE — railroaded over bougie + ETCO2 trace */}
            {active === 5 && (
              <g className="animate-fade-in">
                <path
                  d="M30,165 Q90,165 130,175 L160,200 L160,250"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <ellipse
                  cx="160"
                  cy="220"
                  rx="14"
                  ry="6"
                  fill="hsl(var(--primary) / 0.5)"
                  stroke="hsl(var(--primary))"
                />
                <text x="30" y="158" className="text-[10px] font-semibold" fill="hsl(var(--primary))">
                  6.0 ETT + cuff
                </text>
                {/* ETCO2 square wave */}
                <g transform="translate(220, 250)">
                  <path
                    d="M0,10 L8,10 L10,0 L22,0 L24,10 L32,10 L34,0 L46,0 L48,10 L60,10"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                  />
                  <text x="30" y="22" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                    ETCO₂
                  </text>
                </g>
              </g>
            )}

            {/* Operator hand stabilising larynx (steps 1-5) */}
            {active >= 1 && (
              <g opacity="0.55">
                <circle cx="240" cy="115" r="10" fill="hsl(var(--muted-foreground) / 0.4)" />
                <circle cx="240" cy="135" r="10" fill="hsl(var(--muted-foreground) / 0.4)" />
              </g>
            )}

            {/* Step 0 — "STOP" overlay */}
            {active === 0 && (
              <g className="animate-fade-in">
                <rect
                  x="80"
                  y="100"
                  width="160"
                  height="50"
                  rx="8"
                  fill="hsl(var(--destructive) / 0.15)"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="2"
                />
                <text
                  x="160"
                  y="132"
                  textAnchor="middle"
                  className="text-base font-bold"
                  fill="hsl(var(--destructive))"
                >
                  DECLARE CICO
                </text>
              </g>
            )}
          </svg>
        </div>
      )}
    />
  );
};

export default CICODrillAnimation;
