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
  // Sagittal viewBox 0..520 / 0..320. Tip coordinates chosen to follow a
  // realistic retromolar → posterior tongue → vallecula → glottis arc.
  // ettOnShaft = fraction of shaft length covered by the ETT (0..1).
  const scopePositions: Record<
    Step,
    { tipX: number; tipY: number; rot: number; ettOnShaft: number; shaftIn: number }
  > = {
    0: { tipX: 110, tipY: 150, rot: -8, ettOnShaft: 0.35, shaftIn: 0 },   // outside mouth
    1: { tipX: 235, tipY: 178, rot: 10, ettOnShaft: 0.4, shaftIn: 0.35 }, // retromolar entry
    2: { tipX: 295, tipY: 198, rot: 38, ettOnShaft: 0.5, shaftIn: 0.6 },  // rotate to midline
    3: { tipX: 330, tipY: 218, rot: 62, ettOnShaft: 0.55, shaftIn: 0.78 }, // glottic view
    4: { tipX: 345, tipY: 240, rot: 78, ettOnShaft: 0.95, shaftIn: 0.92 }, // ETT railroaded
    5: { tipX: 110, tipY: 150, rot: -8, ettOnShaft: 1, shaftIn: 0 },      // scope withdrawn
  };
  const sp = scopePositions[step];

  // Eyepiece content per step
  const eyepieceContent = (() => {
    if (lostView) return "noview";
    if (step === 0) return "dark";
    if (step === 1) return "wall";
    if (step === 2) return "epiglottis";
    if (step === 3) return "cords";
    if (step === 4) return "tube";
    return "carina";
  })();

  // Smooth transition style applied to animated groups
  const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
  const transition = `transform 900ms ${ease}`;

  return (
    <svg
      viewBox="0 0 520 320"
      className="w-full h-auto"
      role="img"
      aria-label="Animated sagittal view of Bonfils retromolar intubation"
    >
      <defs>
        <linearGradient id="bf-skin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--clinical) / 0.18)" />
          <stop offset="100%" stopColor="hsl(var(--clinical) / 0.04)" />
        </linearGradient>
        <linearGradient id="bf-tongue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--clinical) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--clinical) / 0.25)" />
        </linearGradient>
        <linearGradient id="bf-mucosa" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--clinical) / 0.45)" />
          <stop offset="100%" stopColor="hsl(var(--clinical) / 0.2)" />
        </linearGradient>
        <linearGradient id="bf-shaft" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" />
          <stop offset="45%" stopColor="hsl(var(--foreground))" />
          <stop offset="100%" stopColor="hsl(var(--muted-foreground))" />
        </linearGradient>
        <linearGradient id="bf-ett" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.25)" />
        </linearGradient>
        <radialGradient id="bf-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
          <stop offset="60%" stopColor="hsl(var(--primary) / 0.35)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </radialGradient>
        <radialGradient id="bf-eye" cx="50%" cy="50%" r="55%">
          <stop offset="60%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </radialGradient>
        <radialGradient id="bf-eye-vignette" cx="50%" cy="50%" r="55%">
          <stop offset="60%" stopColor="hsl(0 0% 0% / 0)" />
          <stop offset="100%" stopColor="hsl(0 0% 0% / 0.55)" />
        </radialGradient>
        <radialGradient id="bf-mucosa-rad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="hsl(350 65% 55% / 0.85)" />
          <stop offset="100%" stopColor="hsl(350 55% 30% / 0.95)" />
        </radialGradient>
      </defs>

      {/* ---- HEAD: sagittal silhouette ---- */}
      <path
        d="M 70 60
           Q 130 22 235 30
           Q 330 36 380 70
           Q 410 95 405 140
           Q 400 180 380 205
           L 360 215
           Q 340 220 330 232
           L 320 250
           L 295 268
           Q 270 280 230 278
           L 180 275
           Q 130 268 100 248
           Q 70 220 60 175
           Q 50 110 70 60 Z"
        fill="url(#bf-skin)"
        stroke="hsl(var(--clinical) / 0.7)"
        strokeWidth="1.4"
      />

      {/* Nose hint */}
      <path d="M 388 100 Q 405 112 388 130" fill="none" stroke="hsl(var(--clinical) / 0.5)" strokeWidth="1.2" />

      {/* Hard palate */}
      <path
        d="M 215 158 Q 290 152 350 162"
        fill="none"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Soft palate + uvula */}
      <path
        d="M 350 162 Q 365 178 358 196 Q 354 206 348 196 Q 344 188 348 178"
        fill="hsl(var(--clinical) / 0.35)"
        stroke="hsl(var(--clinical) / 0.7)"
        strokeWidth="1"
      />

      {/* Mandible body */}
      <path
        d="M 195 195 Q 250 232 320 232 Q 360 232 372 218"
        fill="none"
        stroke="hsl(var(--foreground) / 0.7)"
        strokeWidth="1.6"
      />
      {/* Mandibular ramus */}
      <path
        d="M 372 218 Q 380 200 378 175"
        fill="none"
        stroke="hsl(var(--foreground) / 0.5)"
        strokeWidth="1.4"
      />

      {/* Dental arcade — incisors + canines + molars (lateral profile) */}
      <g fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.7)" strokeWidth="0.7">
        {/* upper teeth */}
        {[200, 212, 225, 240, 258, 278].map((x, i) => (
          <rect key={`u${i}`} x={x} y={158} width={i < 3 ? 9 : 11} height={i < 3 ? 12 : 9} rx={1.5} />
        ))}
        {/* lower teeth */}
        {[200, 212, 225, 240, 258, 278].map((x, i) => (
          <rect key={`l${i}`} x={x} y={i < 3 ? 178 : 181} width={i < 3 ? 9 : 11} height={i < 3 ? 12 : 9} rx={1.5} />
        ))}
      </g>
      {/* Retromolar gutter highlight */}
      <path
        d="M 290 173 Q 300 178 308 188"
        fill="none"
        stroke="hsl(var(--primary) / 0.55)"
        strokeWidth="1.8"
        strokeDasharray="2 2"
      />
      <text x="312" y="172" fontSize="8" fill="hsl(var(--muted-foreground))">retromolar gutter</text>

      {/* Tongue — bulky, with dorsum and base */}
      <path
        d="M 200 192
           Q 240 162 290 168
           Q 330 174 335 200
           Q 333 220 305 224
           Q 260 230 220 222
           Q 200 218 200 192 Z"
        fill="url(#bf-tongue)"
        stroke="hsl(var(--clinical) / 0.6)"
        strokeWidth="1"
      />
      <path
        d="M 220 198 Q 270 182 320 200"
        fill="none"
        stroke="hsl(var(--clinical) / 0.5)"
        strokeWidth="0.7"
      />
      <text x="265" y="208" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
        tongue
      </text>

      {/* Posterior pharyngeal wall */}
      <path
        d="M 360 200 Q 372 230 365 270 L 360 282"
        fill="url(#bf-mucosa)"
        stroke="hsl(var(--clinical) / 0.55)"
        strokeWidth="1"
      />

      {/* Hyoid */}
      <ellipse cx="335" cy="232" rx="6" ry="2.4" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="0.8" />

      {/* Vallecula + epiglottis (leaf) */}
      <path
        d="M 333 230 Q 345 226 352 232 L 350 256 Q 344 262 338 256 Z"
        fill="hsl(var(--clinical) / 0.35)"
        stroke="hsl(var(--clinical))"
        strokeWidth="1"
      />
      <text x="354" y="246" fontSize="8" fill="hsl(var(--muted-foreground))">epiglottis</text>

      {/* Thyroid cartilage outline */}
      <path
        d="M 332 256 L 332 284 Q 340 290 348 284 L 348 254"
        fill="none"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1"
      />

      {/* Vocal cords (V seen end-on within sagittal — represented as small slit) */}
      <ellipse cx="340" cy="270" rx="6" ry="2.2" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />

      {/* Trachea with cartilage rings */}
      <rect x="334" y="274" width="14" height="38" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
      {[280, 287, 294, 301, 308].map((y) => (
        <line key={y} x1="335" y1={y} x2="347" y2={y} stroke="hsl(var(--foreground) / 0.35)" strokeWidth="0.6" />
      ))}

      {/* Oesophagus (posterior, dashed) */}
      <path d="M 358 270 Q 358 295 355 315" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 3" />

      {/* ---- BONFILS SCOPE ---- */}
      {step !== 5 && (
        <g style={{ transition, transformOrigin: `${sp.tipX}px ${sp.tipY}px` }}
           transform={`rotate(${sp.rot * 0.15} ${sp.tipX} ${sp.tipY})`}>
          {/* Battery handle (origin, outside mouth) */}
          <g transform="translate(20, 70)">
            <rect x="-6" y="-8" width="38" height="34" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
            <circle cx="32" cy="9" r="4" fill="hsl(var(--accent))" />
          </g>
          {/* Eyepiece */}
          <circle cx="62" cy="62" r="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.2" />
          <circle cx="62" cy="62" r="4" fill="hsl(var(--primary) / 0.4)" />
          {/* Side-port O2 */}
          <circle cx="44" cy="76" r="3" fill="hsl(var(--accent))" />

          {/* Rigid straight shaft from handle (~70,80) toward tip approach */}
          <line
            x1="70"
            y1="84"
            x2={sp.tipX - 22}
            y2={sp.tipY - 16}
            stroke="url(#bf-shaft)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Metallic highlight */}
          <line
            x1="70"
            y1="82"
            x2={sp.tipX - 22}
            y2={sp.tipY - 18}
            stroke="hsl(var(--background) / 0.55)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Curved distal 40° tip */}
          <path
            d={`M ${sp.tipX - 22} ${sp.tipY - 16}
                Q ${sp.tipX - 6} ${sp.tipY - 10} ${sp.tipX} ${sp.tipY}`}
            stroke="url(#bf-shaft)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tip light glow */}
          <circle cx={sp.tipX} cy={sp.tipY} r="14" fill="url(#bf-light)" />
          <circle cx={sp.tipX} cy={sp.tipY} r="3.2" fill="hsl(var(--primary))" />

          {/* Light cone toward viewing direction */}
          <path
            d={`M ${sp.tipX} ${sp.tipY}
                L ${sp.tipX + 38 * Math.cos(((sp.rot - 18) * Math.PI) / 180)} ${sp.tipY + 38 * Math.sin(((sp.rot - 18) * Math.PI) / 180)}
                L ${sp.tipX + 38 * Math.cos(((sp.rot + 18) * Math.PI) / 180)} ${sp.tipY + 38 * Math.sin(((sp.rot + 18) * Math.PI) / 180)} Z`}
            fill="hsl(var(--primary) / 0.14)"
          />

          {/* ETT pre-loaded over shaft (rendered as parallel sleeve) */}
          {sp.ettOnShaft > 0 && (
            <g>
              {/* Compute the shaft midline endpoints for the ETT segment */}
              {(() => {
                const x1 = 70;
                const y1 = 84;
                const x2 = sp.tipX - 22;
                const y2 = sp.tipY - 16;
                // ETT covers the proximal portion 0..ettOnShaft of the shaft
                const ex = x1 + (x2 - x1) * sp.ettOnShaft;
                const ey = y1 + (y2 - y1) * sp.ettOnShaft;
                return (
                  <>
                    <line x1={x1} y1={y1} x2={ex} y2={ey}
                      stroke="url(#bf-ett)" strokeWidth="14" strokeLinecap="round" />
                    {/* Cuff at distal end of ETT (only visible when ETT is well advanced) */}
                    {sp.ettOnShaft > 0.7 && (
                      <ellipse cx={ex} cy={ey} rx="9" ry="6"
                        fill="hsl(var(--primary) / 0.35)"
                        stroke="hsl(var(--primary))" strokeWidth="1" />
                    )}
                    {/* Pilot tubing */}
                    <path d={`M ${x1 + 14} ${y1 + 4} q -8 14 -22 6`}
                      fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
                  </>
                );
              })()}
            </g>
          )}
        </g>
      )}

      {/* ETT in place after withdrawal (step 5) */}
      {step === 5 && (
        <g style={{ transition: `opacity 600ms ease` }}>
          {/* Outer tube shadow */}
          <path
            d="M 70 110 Q 200 150 305 240 L 340 270"
            stroke="hsl(var(--primary) / 0.25)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tube body */}
          <path
            d="M 70 110 Q 200 150 305 240 L 340 270"
            stroke="url(#bf-ett)"
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner highlight */}
          <path
            d="M 72 108 Q 200 148 305 238"
            stroke="hsl(var(--background) / 0.4)"
            strokeWidth="2"
            fill="none"
          />
          {/* Cuff inflated below cords */}
          <ellipse cx="342" cy="288" rx="11" ry="7"
            fill="hsl(var(--primary) / 0.45)" stroke="hsl(var(--primary))" strokeWidth="1.2" />
          <text x="356" y="291" fontSize="9" fill="hsl(var(--muted-foreground))">cuff inflated</text>
          {/* Pilot balloon */}
          <g transform="translate(58, 96)">
            <path d="M 0 0 q -10 -8 -22 0" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            <ellipse cx="-26" cy="-2" rx="7" ry="4" fill="hsl(var(--primary) / 0.4)" stroke="hsl(var(--primary))" />
          </g>
        </g>
      )}

      {/* ---- Step caption strip ---- */}
      <g>
        <rect x="10" y="288" width="220" height="24" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <text x="120" y="304" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
          Step {step + 1}: {STEPS[step].title}
        </text>
      </g>

      {/* ---- Eyepiece preview (top-right) ---- */}
      <g transform="translate(420, 20)">
        <text x="42" y="-4" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">
          eyepiece view
        </text>
        <circle cx="42" cy="42" r="40" fill="url(#bf-eye)" stroke="hsl(var(--border))" strokeWidth="1.4" />
        <clipPath id="bf-eye-clip">
          <circle cx="42" cy="42" r="38" />
        </clipPath>
        <g clipPath="url(#bf-eye-clip)">
          {/* Background mucosa for in-airway views */}
          {(eyepieceContent === "wall" || eyepieceContent === "epiglottis" ||
            eyepieceContent === "cords" || eyepieceContent === "carina" ||
            eyepieceContent === "tube") && (
            <rect x="0" y="0" width="84" height="84" fill="url(#bf-mucosa-rad)" />
          )}

          {eyepieceContent === "dark" && (
            <rect x="0" y="0" width="84" height="84" fill="hsl(0 0% 5%)" />
          )}

          {eyepieceContent === "wall" && (
            <g>
              {/* Pharyngeal mucosa with vessels */}
              <path d="M 6 60 Q 30 40 78 56" fill="none" stroke="hsl(350 80% 35%)" strokeWidth="0.8" />
              <path d="M 10 70 Q 40 52 80 66" fill="none" stroke="hsl(350 80% 35%)" strokeWidth="0.6" />
              <text x="42" y="76" fontSize="7" fill="hsl(var(--background))" textAnchor="middle">pharyngeal wall</text>
            </g>
          )}

          {eyepieceContent === "epiglottis" && (
            <g>
              {/* Curled epiglottis leaf with median vallecula */}
              <path
                d="M 16 50 Q 42 24 68 50 Q 64 68 42 70 Q 20 68 16 50 Z"
                fill="hsl(350 60% 50% / 0.95)"
                stroke="hsl(350 60% 30%)"
                strokeWidth="0.8"
              />
              <path d="M 42 30 Q 42 50 42 66" stroke="hsl(350 60% 30%)" strokeWidth="0.6" fill="none" />
              <text x="42" y="80" fontSize="7" fill="hsl(var(--background))" textAnchor="middle">epiglottis</text>
            </g>
          )}

          {eyepieceContent === "cords" && (
            <g>
              {/* Vocal cord V — pearly white triangles meeting anteriorly */}
              <path d="M 42 22 L 24 64 Q 42 60 42 56 Z" fill="hsl(0 0% 95%)" stroke="hsl(0 0% 60%)" strokeWidth="0.6" />
              <path d="M 42 22 L 60 64 Q 42 60 42 56 Z" fill="hsl(0 0% 95%)" stroke="hsl(0 0% 60%)" strokeWidth="0.6" />
              {/* Arytenoids */}
              <ellipse cx="28" cy="66" rx="4" ry="3" fill="hsl(350 50% 50%)" />
              <ellipse cx="56" cy="66" rx="4" ry="3" fill="hsl(350 50% 50%)" />
              {/* Glottic chink */}
              <path d="M 42 24 L 42 60" stroke="hsl(0 0% 15%)" strokeWidth="0.8" />
              <text x="42" y="80" fontSize="7" fill="hsl(var(--background))" textAnchor="middle">cords centred</text>
            </g>
          )}

          {eyepieceContent === "tube" && (
            <g>
              {/* ETT advancing through cords */}
              <path d="M 42 22 L 24 64" stroke="hsl(0 0% 70%)" strokeWidth="0.6" fill="none" />
              <path d="M 42 22 L 60 64" stroke="hsl(0 0% 70%)" strokeWidth="0.6" fill="none" />
              <ellipse cx="42" cy="48" rx="14" ry="10" fill="hsl(var(--primary) / 0.55)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              <ellipse cx="42" cy="48" rx="9" ry="6" fill="hsl(0 0% 8%)" />
              <text x="42" y="80" fontSize="7" fill="hsl(var(--background))" textAnchor="middle">ETT through cords</text>
            </g>
          )}

          {eyepieceContent === "carina" && (
            <g>
              <path d="M 42 18 L 22 70" stroke="hsl(350 50% 30%)" strokeWidth="2" />
              <path d="M 42 18 L 62 70" stroke="hsl(350 50% 30%)" strokeWidth="2" />
              {/* Cartilage rings on both bronchi */}
              {[28, 36, 44, 52].map((y, i) => (
                <g key={i}>
                  <path d={`M ${42 - (y - 20) * 0.4} ${y} q -2 -1 -4 0`} fill="none" stroke="hsl(0 0% 90% / 0.6)" strokeWidth="0.6" />
                  <path d={`M ${42 + (y - 20) * 0.4} ${y} q 2 -1 4 0`} fill="none" stroke="hsl(0 0% 90% / 0.6)" strokeWidth="0.6" />
                </g>
              ))}
              <text x="42" y="80" fontSize="7" fill="hsl(var(--background))" textAnchor="middle">carina</text>
            </g>
          )}

          {eyepieceContent === "noview" && (
            <g>
              <rect x="0" y="0" width="84" height="84" fill="hsl(var(--destructive) / 0.55)" />
              {/* Smear / blood */}
              <path d="M 0 30 Q 42 50 84 28" fill="hsl(350 80% 25%)" opacity="0.8" />
              <path d="M 0 60 Q 42 78 84 56" fill="hsl(350 80% 20%)" opacity="0.7" />
              <text x="42" y="48" fontSize="11" fontWeight="800" fill="hsl(var(--destructive-foreground))" textAnchor="middle">
                NO VIEW
              </text>
            </g>
          )}

          {/* Vignette */}
          <rect x="0" y="0" width="84" height="84" fill="url(#bf-eye-vignette)" />
        </g>
        {/* Reticle */}
        <line x1="42" y1="6" x2="42" y2="78" stroke="hsl(var(--foreground) / 0.18)" strokeWidth="0.5" />
        <line x1="6" y1="42" x2="78" y2="42" stroke="hsl(var(--foreground) / 0.18)" strokeWidth="0.5" />
        <circle cx="42" cy="42" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="1.4" />
      </g>

      {/* ---- Live indicators ---- */}
      <g transform="translate(260, 292)">
        <circle cx="0" cy="6" r="3" fill="hsl(var(--accent))">
          {!lostView && <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <text x="8" y="9" fontSize="9" fill="hsl(var(--muted-foreground))">
          O₂ side-port flowing
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
