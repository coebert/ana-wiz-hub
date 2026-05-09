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
  // Sagittal head, facing LEFT. Scope enters from the left (out of mouth)
  // and advances rightward through retromolar → posterior tongue → vallecula → glottis.
  // Coordinates within viewBox 0 0 560 340.
  // Mouth-entry pivot (between the upper & lower teeth, just inside the lips).
  // The external part of the scope is anchored here; the intra-oral part
  // curves from this point through a control point in the retromolar gutter
  // to the moving tip — guaranteeing the shaft never leaves the airway.
  const ENTRY = { x: 112, y: 170 };

  // Per-step intra-airway tip positions and a bezier control point that
  // shapes the shaft so it always hugs anatomy (retromolar → tongue base →
  // vallecula → glottis → trachea).
  const scopePositions: Record<
    Step,
    { tipX: number; tipY: number; cpX: number; cpY: number; rot: number; ettOnShaft: number }
  > = {
    0: { tipX:  72, tipY: 172, cpX:  92, cpY: 172, rot:   0, ettOnShaft: 0.35 }, // tip just outside lips
    1: { tipX: 172, tipY: 184, cpX: 145, cpY: 174, rot:  20, ettOnShaft: 0.40 }, // retromolar entry
    2: { tipX: 215, tipY: 212, cpX: 178, cpY: 188, rot:  45, ettOnShaft: 0.50 }, // sweeping to midline
    3: { tipX: 246, tipY: 246, cpX: 198, cpY: 200, rot:  70, ettOnShaft: 0.55 }, // hovering above glottis
    4: { tipX: 252, tipY: 278, cpX: 210, cpY: 218, rot:  85, ettOnShaft: 0.92 }, // ETT railroaded through cords
    5: { tipX:  72, tipY: 172, cpX:  92, cpY: 172, rot:   0, ettOnShaft: 1    }, // scope withdrawn
  };
  const sp = scopePositions[step];

  const eyepieceContent = (() => {
    if (lostView) return "noview";
    if (step === 0) return "dark";
    if (step === 1) return "wall";
    if (step === 2) return "epiglottis";
    if (step === 3) return "cords";
    if (step === 4) return "tube";
    return "carina";
  })();

  const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
  const transition = `transform 900ms ${ease}`;

  return (
    <svg
      viewBox="0 0 720 360"
      className="w-full h-auto"
      role="img"
      aria-label="Animated, fully labelled sagittal view of Bonfils retromolar intubation"
    >
      <defs>
        <linearGradient id="bf-skin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(28 55% 88%)" />
          <stop offset="60%" stopColor="hsl(22 50% 78%)" />
          <stop offset="100%" stopColor="hsl(20 45% 68%)" />
        </linearGradient>
        <linearGradient id="bf-skin-shade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(20 40% 55% / 0.35)" />
          <stop offset="40%" stopColor="hsl(20 40% 55% / 0)" />
        </linearGradient>
        <linearGradient id="bf-tongue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(355 55% 60%)" />
          <stop offset="100%" stopColor="hsl(355 50% 38%)" />
        </linearGradient>
        <linearGradient id="bf-lip" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(355 60% 55%)" />
          <stop offset="100%" stopColor="hsl(355 55% 38%)" />
        </linearGradient>
        <linearGradient id="bf-mucosa" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(350 55% 45%)" />
          <stop offset="100%" stopColor="hsl(350 50% 30%)" />
        </linearGradient>
        <linearGradient id="bf-shaft" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 12% 70%)" />
          <stop offset="45%" stopColor="hsl(220 10% 25%)" />
          <stop offset="100%" stopColor="hsl(220 12% 60%)" />
        </linearGradient>
        <linearGradient id="bf-ett" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.65)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.30)" />
        </linearGradient>
        <radialGradient id="bf-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(50 100% 75%)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="hsl(50 100% 65% / 0.35)" />
          <stop offset="100%" stopColor="hsl(50 100% 65% / 0)" />
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
          <stop offset="0%" stopColor="hsl(350 65% 55% / 0.95)" />
          <stop offset="100%" stopColor="hsl(350 55% 28%)" />
        </radialGradient>
        <clipPath id="bf-eye-clip">
          <circle cx="42" cy="42" r="38" />
        </clipPath>
      </defs>

      {/* ==================================================================
          PATIENT HEAD — sagittal profile, FACING LEFT, supine on pillow
          ================================================================== */}

      {/* Pillow / table */}
      <rect x="0" y="305" width="720" height="55" fill="hsl(var(--muted) / 0.5)" />
      <path d="M 200 308 Q 320 290 460 308 L 460 320 L 200 320 Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" />

      {/* HEAD outline — clearly recognisable profile facing left.
          Path traced clockwise from forehead → brow → nose → philtrum →
          upper lip → MOUTH OPENING (gap) → lower lip → chin →
          submandibular → neck anterior → table → neck posterior → occiput → vertex.
      */}
      <path
        d="
          M 215 50
          Q 165 36 120 60
          Q 85 80 78 110
          Q 76 122 72 130
          L 50 138
          Q 38 144 50 152
          L 78 154
          Q 80 160 84 164
          L 110 166
          L 110 168

          L 60 168
          Q 50 170 56 178
          L 76 184
          Q 80 192 86 198
          L 96 210
          L 110 222
          Q 130 238 168 246
          L 200 252
          Q 220 256 232 270
          L 240 305
          L 360 305
          Q 360 240 350 200
          Q 340 150 320 110
          Q 295 65 240 50
          Z
        "
        fill="url(#bf-skin)"
        stroke="hsl(20 40% 45%)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Subtle face shading on the right (away from light) */}
      <path
        d="M 215 50 Q 295 65 320 110 Q 340 150 350 200 Q 360 240 360 305 L 240 305"
        fill="url(#bf-skin-shade)"
      />

      {/* Hairline + ear */}
      <path d="M 215 50 Q 260 48 300 70" fill="none" stroke="hsl(20 40% 35%)" strokeWidth="1" />
      <path d="M 295 100 q 14 4 14 22 q 0 16 -16 18" fill="hsl(20 45% 70%)" stroke="hsl(20 40% 45%)" strokeWidth="1" />
      <path d="M 300 116 q 6 2 6 12" fill="none" stroke="hsl(20 40% 45%)" strokeWidth="0.8" />

      {/* Eye */}
      <g>
        <path d="M 138 116 q 14 -8 28 0 q -14 6 -28 0 z" fill="hsl(0 0% 100%)" stroke="hsl(20 40% 35%)" strokeWidth="0.8" />
        <circle cx="152" cy="116" r="3" fill="hsl(220 50% 25%)" />
        <path d="M 134 110 q 14 -6 30 0" fill="none" stroke="hsl(20 40% 30%)" strokeWidth="1" />
      </g>

      {/* Nostril */}
      <path d="M 60 142 q 8 4 16 0" fill="none" stroke="hsl(20 40% 35%)" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="68" cy="143" rx="3" ry="1.6" fill="hsl(20 40% 25%)" />

      {/* LIPS — open mouth (jaw thrust) */}
      {/* Upper lip */}
      <path d="M 80 158 Q 95 152 112 158 Q 120 162 110 166 L 84 164 Q 78 162 80 158 Z" fill="url(#bf-lip)" stroke="hsl(355 55% 30%)" strokeWidth="0.8" />
      {/* Lower lip */}
      <path d="M 60 168 Q 85 174 116 168 Q 120 172 110 178 Q 90 184 70 180 Q 56 178 60 168 Z" fill="url(#bf-lip)" stroke="hsl(355 55% 30%)" strokeWidth="0.8" />
      {/* Philtrum */}
      <path d="M 90 148 L 92 156" stroke="hsl(20 40% 45%)" strokeWidth="0.6" />

      {/* Chin shadow */}
      <path d="M 86 198 Q 100 210 116 218" fill="none" stroke="hsl(20 40% 45%)" strokeWidth="0.7" />

      {/* ==================================================================
          ORAL CAVITY + AIRWAY (inside head, opens to the left at the lips)
          ================================================================== */}

      {/* Oral cavity background (dark mucosa visible through open mouth) */}
      <path
        d="M 110 166 L 110 168 L 200 174 Q 230 178 240 200 Q 232 220 200 222 Q 160 220 130 210 Q 116 200 110 168 Z"
        fill="hsl(350 50% 22%)"
      />

      {/* Hard palate (roof of mouth) */}
      <path d="M 112 162 Q 170 158 230 168" fill="none" stroke="hsl(0 0% 100% / 0.6)" strokeWidth="1.4" strokeLinecap="round" />
      {/* Soft palate + uvula (hangs down) */}
      <path
        d="M 230 168 Q 248 178 246 196 Q 244 208 238 200 Q 234 192 238 182"
        fill="hsl(355 50% 45%)"
        stroke="hsl(355 55% 30%)"
        strokeWidth="0.9"
      />

      {/* Maxilla (upper jaw bone reference) */}
      <path d="M 86 156 Q 130 152 220 160" fill="none" stroke="hsl(30 30% 55%)" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Mandible body + ramus */}
      <path d="M 86 188 Q 140 220 230 218 Q 280 216 295 196 Q 305 175 290 150" fill="none" stroke="hsl(30 30% 50%)" strokeWidth="1.4" />

      {/* TEETH — upper arcade */}
      <g fill="hsl(0 0% 98%)" stroke="hsl(30 25% 55%)" strokeWidth="0.5">
        {/* incisors / canines / premolars / molars (left → right inside mouth) */}
        <rect x="84" y="158" width="6" height="9" rx="1" />
        <rect x="91" y="158" width="6" height="9" rx="1" />
        <rect x="98" y="159" width="7" height="8" rx="1" />
        <rect x="106" y="160" width="8" height="7" rx="1.5" />
        <rect x="115" y="161" width="9" height="6" rx="1.5" />
        <rect x="125" y="161" width="9" height="6" rx="1.5" />
        <rect x="135" y="162" width="9" height="6" rx="1.5" />
        <rect x="145" y="162" width="9" height="6" rx="1.5" />
      </g>
      {/* TEETH — lower arcade */}
      <g fill="hsl(0 0% 98%)" stroke="hsl(30 25% 55%)" strokeWidth="0.5">
        <rect x="84" y="170" width="6" height="9" rx="1" />
        <rect x="91" y="170" width="6" height="9" rx="1" />
        <rect x="98" y="171" width="7" height="8" rx="1" />
        <rect x="106" y="171" width="8" height="7" rx="1.5" />
        <rect x="115" y="171" width="9" height="6" rx="1.5" />
        <rect x="125" y="171" width="9" height="6" rx="1.5" />
        <rect x="135" y="172" width="9" height="6" rx="1.5" />
        <rect x="145" y="172" width="9" height="6" rx="1.5" />
      </g>

      {/* RETROMOLAR GUTTER — behind last molar, this is the Bonfils' path */}
      <path
        d="M 158 168 Q 168 175 178 184"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray="3 2"
        strokeLinecap="round"
      />

      {/* TONGUE — bulky, fills lower oral cavity */}
      <path
        d="M 90 178
           Q 130 158 180 162
           Q 220 168 228 190
           Q 222 212 195 216
           Q 150 220 115 212
           Q 92 206 90 178 Z"
        fill="url(#bf-tongue)"
        stroke="hsl(355 55% 28%)"
        strokeWidth="1"
      />
      {/* Median sulcus */}
      <path d="M 110 180 Q 160 168 210 188" fill="none" stroke="hsl(355 55% 28% / 0.6)" strokeWidth="0.7" />

      {/* HYOID */}
      <ellipse cx="245" cy="232" rx="6" ry="2.4" fill="hsl(0 0% 96%)" stroke="hsl(30 25% 50%)" strokeWidth="0.8" />

      {/* VALLECULA + EPIGLOTTIS */}
      <path
        d="M 240 226 Q 252 220 260 226 L 258 252 Q 250 258 244 252 Z"
        fill="hsl(350 55% 50%)"
        stroke="hsl(350 55% 30%)"
        strokeWidth="0.9"
      />

      {/* THYROID & CRICOID cartilage */}
      <path d="M 240 252 L 240 282 Q 252 290 264 282 L 264 250" fill="hsl(0 0% 96% / 0.6)" stroke="hsl(30 25% 50%)" strokeWidth="1" />
      <path d="M 240 286 Q 252 294 264 286" fill="none" stroke="hsl(30 25% 50%)" strokeWidth="1" />

      {/* GLOTTIS / cords */}
      <ellipse cx="252" cy="270" rx="6" ry="2.2" fill="hsl(0 0% 96%)" stroke="hsl(var(--primary))" strokeWidth="1" />

      {/* TRACHEA with cartilage rings */}
      <rect x="246" y="274" width="14" height="40" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
      {[280, 287, 294, 301, 308].map((y) => (
        <line key={y} x1="247" y1={y} x2="259" y2={y} stroke="hsl(var(--foreground) / 0.35)" strokeWidth="0.6" />
      ))}

      {/* Oesophagus (posterior, dashed) */}
      <path d="M 280 268 Q 282 295 280 320" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 3" />

      {/* Posterior pharyngeal wall mucosa shading */}
      <path d="M 270 200 Q 282 240 278 285" fill="none" stroke="hsl(350 50% 35%)" strokeWidth="1.4" />

      {/* ==================================================================
          BONFILS SCOPE
          ================================================================== */}

      {step !== 5 && (
        <g style={{ transition, transformOrigin: `${sp.tipX}px ${sp.tipY}px` }}
           transform={`rotate(${sp.rot * 0.18} ${sp.tipX} ${sp.tipY})`}>
          {/* Battery handle (held by anaesthetist, well outside the mouth, top-left) */}
          <g transform="translate(-30, 90)">
            <rect x="0" y="0" width="42" height="36" rx="5" fill="hsl(220 10% 30%)" stroke="hsl(220 10% 15%)" />
            <rect x="6" y="6" width="30" height="6" rx="1" fill="hsl(220 10% 45%)" />
            <circle cx="36" cy="32" r="3" fill="hsl(120 60% 50%)" />
          </g>
          {/* Eyepiece on top of handle */}
          <circle cx="0" cy="78" r="11" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.4" />
          <circle cx="0" cy="78" r="5" fill="hsl(var(--primary) / 0.45)" />
          {/* O2 side-port */}
          <circle cx="-12" cy="100" r="3.4" fill="hsl(var(--accent))" />
          <line x1="-15" y1="100" x2="-28" y2="106" stroke="hsl(var(--accent))" strokeWidth="1.4" />

          {/* Rigid straight shaft from handle exit (~20, 110) → just before tip curve */}
          <line
            x1="20"
            y1="112"
            x2={sp.tipX - 22}
            y2={sp.tipY - 14}
            stroke="url(#bf-shaft)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Metallic specular highlight */}
          <line
            x1="22"
            y1="110"
            x2={sp.tipX - 22}
            y2={sp.tipY - 16}
            stroke="hsl(0 0% 100% / 0.55)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Curved distal 40° tip */}
          <path
            d={`M ${sp.tipX - 22} ${sp.tipY - 14}
                Q ${sp.tipX - 6} ${sp.tipY - 8} ${sp.tipX} ${sp.tipY}`}
            stroke="url(#bf-shaft)"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tip light glow */}
          <circle cx={sp.tipX} cy={sp.tipY} r="16" fill="url(#bf-light)">
            <animate attributeName="r" values="14;18;14" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx={sp.tipX} cy={sp.tipY} r="3.2" fill="hsl(50 100% 75%)" />

          {/* Light cone in viewing direction */}
          <path
            d={`M ${sp.tipX} ${sp.tipY}
                L ${sp.tipX + 42 * Math.cos(((sp.rot - 18) * Math.PI) / 180)} ${sp.tipY + 42 * Math.sin(((sp.rot - 18) * Math.PI) / 180)}
                L ${sp.tipX + 42 * Math.cos(((sp.rot + 18) * Math.PI) / 180)} ${sp.tipY + 42 * Math.sin(((sp.rot + 18) * Math.PI) / 180)} Z`}
            fill="hsl(50 100% 70% / 0.18)"
          />

          {/* ETT pre-loaded over shaft */}
          {sp.ettOnShaft > 0 && (() => {
            const x1 = 20;
            const y1 = 112;
            const x2 = sp.tipX - 22;
            const y2 = sp.tipY - 14;
            const ex = x1 + (x2 - x1) * sp.ettOnShaft;
            const ey = y1 + (y2 - y1) * sp.ettOnShaft;
            return (
              <g>
                <line x1={x1} y1={y1} x2={ex} y2={ey}
                  stroke="url(#bf-ett)" strokeWidth="14" strokeLinecap="round" />
                {sp.ettOnShaft > 0.7 && (
                  <ellipse cx={ex} cy={ey} rx="9" ry="6"
                    fill="hsl(var(--primary) / 0.4)"
                    stroke="hsl(var(--primary))" strokeWidth="1" />
                )}
                {/* Pilot tubing exiting proximally */}
                <path d={`M ${x1 + 6} ${y1 - 4} q -10 -10 -22 -4`}
                  fill="none" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.2" />
                <ellipse cx={x1 - 18} cy={y1 - 12} rx="6" ry="3.6"
                  fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              </g>
            );
          })()}
        </g>
      )}

      {/* ETT in place after withdrawal (step 5) */}
      {step === 5 && (
        <g>
          <path d="M 30 130 Q 130 160 230 230 L 252 270"
            stroke="hsl(var(--primary) / 0.25)" strokeWidth="22" strokeLinecap="round" fill="none" />
          <path d="M 30 130 Q 130 160 230 230 L 252 270"
            stroke="url(#bf-ett)" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M 32 128 Q 130 158 230 228"
            stroke="hsl(0 0% 100% / 0.45)" strokeWidth="2" fill="none" />
          {/* Cuff inflated below cords */}
          <ellipse cx="254" cy="288" rx="11" ry="7"
            fill="hsl(var(--primary) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="1.2" />
          <text x="270" y="291" fontSize="9" fill="hsl(var(--muted-foreground))">cuff inflated</text>
          {/* Pilot balloon */}
          <g transform="translate(20, 118)">
            <path d="M 0 0 q -12 -10 -24 -2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            <ellipse cx="-28" cy="-4" rx="7" ry="4.2" fill="hsl(var(--primary) / 0.45)" stroke="hsl(var(--primary))" />
          </g>
        </g>
      )}

      {/* ==================================================================
          LABELS & CALLOUTS — consistent leader-line style
          ================================================================== */}
      <g style={{ pointerEvents: "none" }}>
        {/* ---- Anatomy labels (neutral) ---- */}
        {[
          { tx: 170, ty: 158, lx: 170, ly: 22,  text: "hard palate",            align: "middle" as const },
          { tx: 245, ty: 174, lx: 250, ly: 38,  text: "soft palate",            align: "middle" as const },
          { tx: 244, ty: 198, lx: 304, ly: 56,  text: "uvula",                  align: "start"  as const },
          { tx: 60,  ty: 132, lx: 8,   ly: 110, text: "nose / nostril",         align: "start"  as const },
          { tx: 95,  ty: 162, lx: 6,   ly: 220, text: "upper teeth",            align: "start"  as const },
          { tx: 98,  ty: 175, lx: 6,   ly: 234, text: "lower teeth",            align: "start"  as const },
          { tx: 155, ty: 200, lx: 90,  ly: 280, text: "tongue",                 align: "start"  as const },
          { tx: 200, ty: 222, lx: 90,  ly: 296, text: "mandible",               align: "start"  as const },
          { tx: 245, ty: 232, lx: 335, ly: 130, text: "hyoid bone",             align: "start"  as const },
          { tx: 252, ty: 226, lx: 335, ly: 150, text: "vallecula",              align: "start"  as const },
          { tx: 252, ty: 242, lx: 335, ly: 170, text: "epiglottis",             align: "start"  as const },
          { tx: 252, ty: 270, lx: 335, ly: 195, text: "vocal cords (glottis)",  align: "start"  as const },
          { tx: 260, ty: 270, lx: 335, ly: 218, text: "thyroid cartilage",      align: "start"  as const },
          { tx: 276, ty: 245, lx: 335, ly: 240, text: "post. pharyngeal wall",  align: "start"  as const },
          { tx: 253, ty: 295, lx: 335, ly: 280, text: "trachea",                align: "start"  as const },
          { tx: 281, ty: 305, lx: 335, ly: 304, text: "oesophagus",             align: "start"  as const },
        ].map((l, i) => (
          <g key={`a-${i}`}>
            <line x1={l.tx} y1={l.ty} x2={l.lx} y2={l.ly}
              stroke="hsl(var(--muted-foreground) / 0.55)" strokeWidth="0.6" />
            <circle cx={l.tx} cy={l.ty} r="1.6" fill="hsl(var(--foreground) / 0.7)" />
            <text x={l.lx + (l.align === "start" ? 4 : 0)} y={l.ly} fontSize="9"
              fill="hsl(var(--foreground))" textAnchor={l.align}
              style={{ paintOrder: "stroke", stroke: "hsl(var(--background))", strokeWidth: 3 }}>
              {l.text}
            </text>
          </g>
        ))}

        {/* ---- KEY: retromolar channel — highlighted Bonfils path ---- */}
        <g>
          <line x1="170" y1="178" x2="92" y2="62"
            stroke="hsl(var(--primary) / 0.7)" strokeWidth="0.8" />
          <circle cx="170" cy="178" r="2.4" fill="hsl(var(--primary))" />
          <rect x="6" y="50" width="142" height="22" rx="3"
            fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
          <text x="14" y="64" fontSize="10" fontWeight="700" fill="hsl(var(--primary))">
            retromolar channel
          </text>
          <text x="14" y="74" fontSize="8" fill="hsl(var(--primary))">
            (Bonfils insertion path)
          </text>
        </g>

        {/* ---- Scope component labels — shown at step 0 (orientation view) ---- */}
        {step === 0 && (
          <g>
            {[
              { tx: -12, ty: 108, lx: 60, ly: 92,  text: "battery handle / LED light source" },
              { tx: 0,   ty: 78,  lx: 50, ly: 56,  text: "eyepiece / camera port" },
              { tx: -12, ty: 100, lx: 50, ly: 134, text: "O₂ side-port (defog + apnoeic O₂)" },
              { tx: 30,  ty: 116, lx: 80, ly: 152, text: "rigid stainless-steel shaft" },
              { tx: 50,  ty: 122, lx: 80, ly: 168, text: "ETT pre-loaded over shaft" },
              { tx: -12, ty: 92,  lx: 50, ly: 184, text: "pilot balloon" },
            ].map((l, i) => (
              <g key={`s-${i}`}>
                <line x1={l.tx} y1={l.ty} x2={l.lx} y2={l.ly}
                  stroke="hsl(var(--accent) / 0.8)" strokeWidth="0.6" />
                <circle cx={l.tx} cy={l.ty} r="1.6" fill="hsl(var(--accent))" />
                <text x={l.lx + 4} y={l.ly} fontSize="9"
                  fill="hsl(var(--accent-foreground))" textAnchor="start"
                  style={{ paintOrder: "stroke", stroke: "hsl(var(--background))", strokeWidth: 3 }}>
                  {l.text}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* ---- Dynamic scope-tip callout (follows the tip every step) ---- */}
        {step !== 5 && (() => {
          const lx = sp.tipX > 200 ? sp.tipX - 90 : sp.tipX + 30;
          const ly = sp.tipY + 50;
          return (
            <g style={{ transition: `opacity 400ms ease` }}>
              <line x1={sp.tipX} y1={sp.tipY} x2={lx + 40} y2={ly - 3}
                stroke="hsl(50 100% 45%)" strokeWidth="0.7" />
              <rect x={lx - 4} y={ly - 11} width="92" height="15" rx="3"
                fill="hsl(50 100% 92%)" stroke="hsl(50 100% 40%)" strokeWidth="0.7" />
              <text x={lx} y={ly} fontSize="9" fontWeight="600"
                fill="hsl(40 80% 22%)">
                scope tip — LED + lens
              </text>
            </g>
          );
        })()}
      </g>

      {/* ==================================================================
          UI overlays — caption, eyepiece, indicator
          ================================================================== */}
      <g>
        <rect x="10" y="338" width="260" height="20" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <text x="140" y="352" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
          Step {step + 1}: {STEPS[step].title}
        </text>
      </g>

      {/* Eyepiece preview (top-right) */}
      <g transform="translate(615, 22)">
        <text x="42" y="-4" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">
          eyepiece view
        </text>
        <circle cx="42" cy="42" r="40" fill="url(#bf-eye)" stroke="hsl(var(--border))" strokeWidth="1.4" />
        <g clipPath="url(#bf-eye-clip)">
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
              <path d="M 6 60 Q 30 40 78 56" fill="none" stroke="hsl(350 80% 35%)" strokeWidth="0.8" />
              <path d="M 10 70 Q 40 52 80 66" fill="none" stroke="hsl(350 80% 35%)" strokeWidth="0.6" />
              <text x="42" y="76" fontSize="7" fill="hsl(0 0% 100%)" textAnchor="middle">pharyngeal wall</text>
            </g>
          )}

          {eyepieceContent === "epiglottis" && (
            <g>
              <path d="M 16 50 Q 42 24 68 50 Q 64 68 42 70 Q 20 68 16 50 Z"
                fill="hsl(350 60% 50%)" stroke="hsl(350 60% 30%)" strokeWidth="0.8" />
              <path d="M 42 30 Q 42 50 42 66" stroke="hsl(350 60% 30%)" strokeWidth="0.6" fill="none" />
              <text x="42" y="80" fontSize="7" fill="hsl(0 0% 100%)" textAnchor="middle">epiglottis</text>
            </g>
          )}

          {eyepieceContent === "cords" && (
            <g>
              <path d="M 42 22 L 24 64 Q 42 60 42 56 Z" fill="hsl(0 0% 95%)" stroke="hsl(0 0% 60%)" strokeWidth="0.6" />
              <path d="M 42 22 L 60 64 Q 42 60 42 56 Z" fill="hsl(0 0% 95%)" stroke="hsl(0 0% 60%)" strokeWidth="0.6" />
              <ellipse cx="28" cy="66" rx="4" ry="3" fill="hsl(350 50% 50%)" />
              <ellipse cx="56" cy="66" rx="4" ry="3" fill="hsl(350 50% 50%)" />
              <path d="M 42 24 L 42 60" stroke="hsl(0 0% 15%)" strokeWidth="0.8" />
              <text x="42" y="80" fontSize="7" fill="hsl(0 0% 100%)" textAnchor="middle">cords centred</text>
            </g>
          )}

          {eyepieceContent === "tube" && (
            <g>
              <path d="M 42 22 L 24 64" stroke="hsl(0 0% 70%)" strokeWidth="0.6" fill="none" />
              <path d="M 42 22 L 60 64" stroke="hsl(0 0% 70%)" strokeWidth="0.6" fill="none" />
              <ellipse cx="42" cy="48" rx="14" ry="10" fill="hsl(var(--primary) / 0.55)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              <ellipse cx="42" cy="48" rx="9" ry="6" fill="hsl(0 0% 8%)" />
              <text x="42" y="80" fontSize="7" fill="hsl(0 0% 100%)" textAnchor="middle">ETT through cords</text>
            </g>
          )}

          {eyepieceContent === "carina" && (
            <g>
              <path d="M 42 18 L 22 70" stroke="hsl(350 50% 30%)" strokeWidth="2" />
              <path d="M 42 18 L 62 70" stroke="hsl(350 50% 30%)" strokeWidth="2" />
              {[28, 36, 44, 52].map((y, i) => (
                <g key={i}>
                  <path d={`M ${42 - (y - 20) * 0.4} ${y} q -2 -1 -4 0`} fill="none" stroke="hsl(0 0% 90% / 0.6)" strokeWidth="0.6" />
                  <path d={`M ${42 + (y - 20) * 0.4} ${y} q 2 -1 4 0`} fill="none" stroke="hsl(0 0% 90% / 0.6)" strokeWidth="0.6" />
                </g>
              ))}
              <text x="42" y="80" fontSize="7" fill="hsl(0 0% 100%)" textAnchor="middle">carina</text>
            </g>
          )}

          {eyepieceContent === "noview" && (
            <g>
              <rect x="0" y="0" width="84" height="84" fill="hsl(var(--destructive) / 0.55)" />
              <path d="M 0 30 Q 42 50 84 28" fill="hsl(350 80% 25%)" opacity="0.8" />
              <path d="M 0 60 Q 42 78 84 56" fill="hsl(350 80% 20%)" opacity="0.7" />
              <text x="42" y="48" fontSize="11" fontWeight="800"
                fill="hsl(var(--destructive-foreground))" textAnchor="middle">
                NO VIEW
              </text>
            </g>
          )}

          <rect x="0" y="0" width="84" height="84" fill="url(#bf-eye-vignette)" />
        </g>
        <line x1="42" y1="6" x2="42" y2="78" stroke="hsl(var(--foreground) / 0.18)" strokeWidth="0.5" />
        <line x1="6" y1="42" x2="78" y2="42" stroke="hsl(var(--foreground) / 0.18)" strokeWidth="0.5" />
        <circle cx="42" cy="42" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="1.4" />
      </g>

      {/* Live indicators */}
      <g transform="translate(290, 342)">
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
