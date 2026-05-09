import { useEffect, useRef, useState } from "react";

/**
 * BonfilsRetromolarAnimation
 *
 * Animated walkthrough of the Bonfils retromolar intubation technique.
 * Steps: jaw thrust → retromolar insertion → midline rotation → glottic view →
 * ETT railroad → cuff inflation. Includes a "lose view" failure mode that
 * triggers an escalation overlay (stop, withdraw, plan B).
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

interface StepInfo {
  title: string;
  body: string;
  cue: string;
}

const STEPS: Record<Step, StepInfo> = {
  0: {
    title: "Position & jaw thrust",
    body: "Patient supine, head neutral. Assistant performs sustained jaw thrust to lift the tongue base off the posterior pharyngeal wall and create a retromolar channel.",
    cue: "Pre-oxygenate; switch on side-port O₂ at 2–6 L · min⁻¹ to keep the lens clear and oxygenate apnoeically.",
  },
  1: {
    title: "Retromolar insertion",
    body: "Pre-load ETT onto the rigid shaft. Insert the tip behind the right (or left) molars, hugging the lateral pharyngeal wall — bypassing the tongue rather than displacing it.",
    cue: "Mouth opening as little as 1.2 cm is sufficient. Never advance blind — eye on the screen at all times.",
  },
  2: {
    title: "Rotate to midline",
    body: "Once past the tongue base, rotate the scope 90° toward the midline so the fixed 40° distal curve sweeps anteriorly toward the glottis.",
    cue: "If the lens fogs or fills with secretions: pause, suction, increase O₂ flow, then continue.",
  },
  3: {
    title: "Glottic view",
    body: "Identify the epiglottis, then the cords. Centre the aperture in the eyepiece. Confirm structures before any ETT advancement.",
    cue: "No view = no advance. Withdraw to the last identifiable landmark.",
  },
  4: {
    title: "Railroad the ETT",
    body: "Holding the scope still, advance the ETT off the shaft and through the cords under continuous vision. Rotate the tube 90° anti-clockwise if the bevel hangs on the right arytenoid.",
    cue: "Do not push against resistance — withdraw, re-orient, retry once.",
  },
  5: {
    title: "Confirm & secure",
    body: "Withdraw the scope, inflate the cuff, ventilate, confirm capnography and bilateral air entry, then secure.",
    cue: "Document attempts. If failed: declare, oxygenate, escalate to plan B (awake tracheostomy or scalpel-bougie-tube per DAS 2015).",
  },
};

const AUTO_MS = 2800;

export default function BonfilsRetromolarAnimation() {
  const [step, setStep] = useState<Step>(0);
  const [playing, setPlaying] = useState(true);
  const [lostView, setLostView] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance
  useEffect(() => {
    if (!playing || lostView) return;
    timerRef.current = setTimeout(() => {
      setStep((s) => ((s + 1) % 6) as Step);
    }, AUTO_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, lostView]);

  // If view is lost, force step back to 3 (the "no view" moment)
  useEffect(() => {
    if (lostView) {
      setStep(3);
      setPlaying(false);
    }
  }, [lostView]);

  const reset = () => {
    setLostView(false);
    setStep(0);
    setPlaying(true);
  };

  const info = STEPS[step];

  return (
    <div className="w-full rounded-lg border border-border bg-card p-4">
      <div className="mb-3">
        <h3 className="text-lg font-serif font-semibold text-foreground">
          Bonfils retromolar intubation — animated sequence
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Six-step walkthrough of the retromolar approach with ETT railroading. Toggle “lose view”
          at any point to trigger the stop-and-escalate protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,260px] gap-4">
        {/* Anatomy + scope animation */}
        <div className="rounded-md border border-border bg-background overflow-hidden relative">
          <BonfilsSvg step={step} lostView={lostView} />
          {lostView && <EscalateOverlay onReset={reset} />}
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-border bg-background p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Step {step + 1} of 6
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {playing && !lostView ? "auto" : "manual"}
              </span>
            </div>
            <div className="text-sm font-semibold text-foreground">{info.title}</div>
            <p className="text-xs text-foreground/85 mt-1 leading-relaxed">{info.body}</p>
            <div className="mt-2 rounded border border-clinical/30 bg-clinical/5 p-2 text-[11px] text-foreground/85">
              <span className="font-semibold text-clinical">Cue: </span>
              {info.cue}
            </div>

            {/* Step dots */}
            <div className="mt-3 flex items-center gap-1">
              {([0, 1, 2, 3, 4, 5] as Step[]).map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPlaying(false);
                    setLostView(false);
                    setStep(i);
                  }}
                  aria-label={`Go to step ${i + 1}`}
                  className={`flex-1 h-1.5 rounded transition ${
                    i === step
                      ? "bg-primary"
                      : i < step
                        ? "bg-primary/40"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-md border border-border bg-background p-3 space-y-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              disabled={lostView}
              className="w-full text-xs font-medium rounded bg-primary text-primary-foreground py-1.5 hover:opacity-90 transition disabled:opacity-40"
            >
              {playing && !lostView ? "Pause" : "Play"}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setPlaying(false);
                  setLostView(false);
                  setStep(((step + 5) % 6) as Step);
                }}
                className="text-xs rounded border border-border bg-background py-1.5 hover:bg-muted transition"
              >
                ◀ Step
              </button>
              <button
                onClick={() => {
                  setPlaying(false);
                  setLostView(false);
                  setStep(((step + 1) % 6) as Step);
                }}
                className="text-xs rounded border border-border bg-background py-1.5 hover:bg-muted transition"
              >
                Step ▶
              </button>
            </div>
            <button
              onClick={() => setLostView((v) => !v)}
              className={`w-full text-xs font-medium rounded py-1.5 border transition ${
                lostView
                  ? "bg-destructive text-destructive-foreground border-destructive"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {lostView ? "View lost — escalating" : "Simulate: lose view"}
            </button>
            <button
              onClick={reset}
              className="w-full text-xs rounded border border-border bg-background py-1.5 hover:bg-muted transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- SVG anatomy + scope -------------------- */

function BonfilsSvg({ step, lostView }: { step: Step; lostView: boolean }) {
  // Scope tip path positions for each step (sagittal mouth view)
  // Coordinates within 0..420 / 0..280 viewBox
  const scopePositions: Record<Step, { tipX: number; tipY: number; rot: number; ettOnShaft: number }> = {
    0: { tipX: 50, tipY: 60, rot: -10, ettOnShaft: 0 }, // outside mouth, jaw thrust scene
    1: { tipX: 170, tipY: 100, rot: 5, ettOnShaft: 0.3 }, // entering retromolar
    2: { tipX: 230, tipY: 130, rot: 35, ettOnShaft: 0.45 }, // rotating to midline
    3: { tipX: 270, tipY: 150, rot: 55, ettOnShaft: 0.55 }, // glottic view
    4: { tipX: 290, tipY: 170, rot: 70, ettOnShaft: 0.95 }, // ETT railroaded through cords
    5: { tipX: 90, tipY: 80, rot: -5, ettOnShaft: 1 }, // scope withdrawn, ETT in place
  };
  const sp = scopePositions[step];

  // Eyepiece view content
  const eyepieceContent = (() => {
    if (lostView) return "noview";
    if (step <= 1) return "wall";
    if (step === 2) return "epiglottis";
    if (step === 3 || step === 4) return "cords";
    return "carina";
  })();

  return (
    <svg
      viewBox="0 0 420 280"
      className="w-full h-auto"
      role="img"
      aria-label="Animated Bonfils retromolar intubation"
    >
      <defs>
        <linearGradient id="bonf-tissue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--clinical) / 0.18)" />
          <stop offset="100%" stopColor="hsl(var(--clinical) / 0.05)" />
        </linearGradient>
        <radialGradient id="bonf-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </radialGradient>
      </defs>

      {/* Sagittal head outline */}
      <path
        d="M 60 50 Q 110 22 200 28 Q 300 36 340 80 Q 350 130 320 170 Q 290 210 260 220 L 230 230 Q 180 240 140 230 L 110 220 Q 70 200 55 160 Q 45 100 60 50 Z"
        fill="url(#bonf-tissue)"
        stroke="hsl(var(--clinical))"
        strokeWidth="1.4"
      />

      {/* Mandible / teeth */}
      <path d="M 110 175 Q 200 200 290 175" stroke="hsl(var(--foreground))" strokeWidth="1.2" fill="none" />
      {/* Molars marker */}
      <g fill="hsl(var(--foreground))">
        {[120, 135, 270, 285].map((x, i) => (
          <rect key={i} x={x} y={168} width={6} height={8} rx={1} />
        ))}
      </g>
      <text x="278" y="166" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
        molars
      </text>

      {/* Tongue base */}
      <path
        d="M 130 175 Q 200 130 270 175 L 260 195 Q 200 180 140 195 Z"
        fill="hsl(var(--clinical) / 0.25)"
        stroke="hsl(var(--clinical) / 0.5)"
        strokeWidth="1"
      />
      <text x="200" y="160" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
        tongue base
      </text>

      {/* Pharynx + epiglottis */}
      <path
        d="M 270 175 Q 295 175 305 195 L 305 215"
        stroke="hsl(var(--clinical))"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 280 200 Q 290 195 300 200 L 296 218 Q 290 220 284 218 Z"
        fill="hsl(var(--clinical) / 0.35)"
        stroke="hsl(var(--clinical))"
        strokeWidth="1"
      />
      <text x="306" y="200" fontSize="8" fill="hsl(var(--muted-foreground))">
        epiglottis
      </text>

      {/* Glottis / cords */}
      <ellipse cx="295" cy="225" rx="6" ry="3" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1" />
      {/* Trachea */}
      <rect x="289" y="225" width="12" height="40" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />

      {/* Bonfils scope shaft + curved tip */}
      {step !== 5 && (
        <g>
          {/* Straight rigid shaft */}
          <line
            x1="-20"
            y1="40"
            x2={sp.tipX - 20}
            y2={sp.tipY - 20}
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Curved distal tip — short arc */}
          <path
            d={`M ${sp.tipX - 20} ${sp.tipY - 20} Q ${sp.tipX - 4} ${sp.tipY - 12} ${sp.tipX} ${sp.tipY}`}
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tip light */}
          <circle cx={sp.tipX} cy={sp.tipY} r="3.5" fill="hsl(var(--primary))" />
          {/* Light cone */}
          <path
            d={`M ${sp.tipX} ${sp.tipY} L ${sp.tipX + 30 * Math.cos((sp.rot * Math.PI) / 180)} ${sp.tipY + 30 * Math.sin((sp.rot * Math.PI) / 180)} L ${sp.tipX + 30 * Math.cos(((sp.rot + 30) * Math.PI) / 180)} ${sp.tipY + 30 * Math.sin(((sp.rot + 30) * Math.PI) / 180)} Z`}
            fill="hsl(var(--primary) / 0.18)"
          />
        </g>
      )}

      {/* ETT loaded on the shaft (ribbed cylinder) */}
      {step !== 5 && sp.ettOnShaft > 0 && (
        <g>
          <rect
            x={-15}
            y={32}
            width={(sp.tipX - 5 + 15) * sp.ettOnShaft}
            height={16}
            rx={6}
            fill="hsl(var(--accent-foreground) / 0.25)"
            stroke="hsl(var(--accent-foreground))"
            strokeWidth="1"
          />
        </g>
      )}

      {/* ETT in place after withdrawal (step 5) */}
      {step === 5 && (
        <g>
          {/* ETT entering mouth, curving down to trachea */}
          <path
            d="M 60 60 Q 200 110 295 220 L 295 260"
            stroke="hsl(var(--accent-foreground))"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 60 60 Q 200 110 295 220 L 295 260"
            stroke="hsl(var(--accent-foreground) / 0.35)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cuff */}
          <ellipse cx="295" cy="245" rx="9" ry="6" fill="hsl(var(--accent-foreground) / 0.5)" stroke="hsl(var(--accent-foreground))" />
          <text x="305" y="248" fontSize="9" fill="hsl(var(--muted-foreground))">cuff</text>
        </g>
      )}

      {/* Step caption strip */}
      <g>
        <rect x="8" y="252" width="180" height="22" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <text x="98" y="267" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
          Step {step + 1}: {STEPS[step].title}
        </text>
      </g>

      {/* Eyepiece preview circle (top-right) */}
      <g transform="translate(330, 30)">
        <circle cx="35" cy="35" r="36" fill="url(#bonf-eye)" stroke="hsl(var(--border))" strokeWidth="1.4" />
        <circle cx="35" cy="35" r="32" fill="none" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="0.8" strokeDasharray="2 3" />
        {/* Crosshair */}
        <line x1="35" y1="10" x2="35" y2="60" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="0.6" />
        <line x1="10" y1="35" x2="60" y2="35" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="0.6" />

        {/* Content per step */}
        {eyepieceContent === "wall" && (
          <text x="35" y="38" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            pharyngeal wall
          </text>
        )}
        {eyepieceContent === "epiglottis" && (
          <g>
            <path
              d="M 22 38 Q 35 26 48 38 L 46 50 Q 35 53 24 50 Z"
              fill="hsl(var(--clinical) / 0.5)"
              stroke="hsl(var(--clinical))"
              strokeWidth="0.8"
            />
            <text x="35" y="64" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              epiglottis
            </text>
          </g>
        )}
        {eyepieceContent === "cords" && (
          <g>
            <ellipse cx="35" cy="38" rx="14" ry="6" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <line x1="22" y1="38" x2="48" y2="38" stroke="hsl(var(--primary))" strokeWidth="1.2" />
            <text x="35" y="64" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              cords centred
            </text>
          </g>
        )}
        {eyepieceContent === "carina" && (
          <g>
            <line x1="35" y1="22" x2="22" y2="50" stroke="hsl(var(--clinical))" strokeWidth="1.2" />
            <line x1="35" y1="22" x2="48" y2="50" stroke="hsl(var(--clinical))" strokeWidth="1.2" />
            <text x="35" y="64" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              carina (post-confirm)
            </text>
          </g>
        )}
        {eyepieceContent === "noview" && (
          <g>
            <rect x="6" y="6" width="58" height="58" fill="hsl(var(--destructive) / 0.4)" />
            <text x="35" y="40" fontSize="9" fontWeight="700" fill="hsl(var(--destructive-foreground))" textAnchor="middle">
              NO VIEW
            </text>
          </g>
        )}
        <text x="35" y="-2" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
          eyepiece
        </text>
      </g>
    </svg>
  );
}

/* -------------------- Escalation overlay -------------------- */

function EscalateOverlay({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 bg-destructive/15 flex items-center justify-center p-4">
      <div className="max-w-sm rounded-md border border-destructive bg-card p-4 shadow-lg">
        <div className="text-xs uppercase tracking-wider text-destructive font-bold mb-1">
          Stop & escalate
        </div>
        <p className="text-sm text-foreground font-semibold leading-snug mb-2">
          View lost — do not advance the ETT.
        </p>
        <ol className="list-decimal list-inside text-xs text-foreground/85 space-y-1 mb-3">
          <li>Withdraw the scope to the last identifiable landmark.</li>
          <li>Suction; increase side-port O₂; clear lens.</li>
          <li>Re-attempt only if cause reversible (fog, secretions).</li>
          <li>If still no view: declare failure, oxygenate, call for help.</li>
          <li>
            Move to <strong>plan B</strong> per DAS 2015 — SAD rescue, awake tracheostomy, or
            scalpel-bougie-tube cricothyroidotomy if CICO.
          </li>
        </ol>
        <button
          onClick={onReset}
          className="w-full text-xs font-medium rounded bg-primary text-primary-foreground py-1.5 hover:opacity-90 transition"
        >
          Reset sequence
        </button>
      </div>
    </div>
  );
}
