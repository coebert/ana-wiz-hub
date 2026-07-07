import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { cn } from "@/lib/utils";

type View = "sensor" | "waveform" | "hpi";

interface Step {
  view: View;
  label: string;
  detail: string;
  /** 0..1 progress marker used by scenes to reveal / highlight content. */
  key: string;
}

/**
 * Acumen IQ + HPI schematic — animated.
 *
 * Auto-advancing 8-step walk-through that stitches the three views together:
 *   sensor view: pulse travels cannula → transducer → HemoSphere
 *   waveform view: 4 morphological features light up in turn
 *   hpi view: HPI curve rises, threshold crossed, MAP subsequently falls
 *
 * Manual tab clicks still work — clicking a tab pauses playback and jumps
 * to the first step of that view.
 */
export const AcumenIQDiagram = () => {
  const steps: Step[] = useMemo(
    () => [
      {
        view: "sensor",
        key: "pulse",
        label: "1. Pulsatile pressure",
        detail:
          "Each systole propagates a pressure pulse down the radial arterial cannula and fluid-filled tubing to the Acumen IQ transducer.",
      },
      {
        view: "sensor",
        key: "transduce",
        label: "2. Transducer → electrical signal",
        detail:
          "The Acumen IQ piezoresistive transducer converts pressure to a voltage — sampled at 100 Hz and streamed to HemoSphere.",
      },
      {
        view: "sensor",
        key: "compute",
        label: "3. HemoSphere derives haemodynamics",
        detail:
          "FloTrac 4th-gen analyses the arterial waveform to derive CO, SV, SVV, PPV, dP/dt, Eadyn — no calibration, no CVC.",
      },
      {
        view: "waveform",
        key: "upstroke",
        label: "4. Upstroke slope (dP/dt)",
        detail:
          "The rate of pressure rise indexes LV contractility — one of the strongest single features feeding HPI.",
      },
      {
        view: "waveform",
        key: "notch",
        label: "5. Dicrotic notch",
        detail:
          "Position/height of the notch reflects SVR and dynamic arterial elastance (Eadyn) — informs vasopressor vs fluid choice.",
      },
      {
        view: "waveform",
        key: "variability",
        label: "6. Beat-to-beat variability",
        detail:
          "Area/amplitude variation across the respiratory cycle → SVV / PPV → fluid responsiveness (valid only in controlled ventilation, sinus rhythm).",
      },
      {
        view: "hpi",
        key: "rising",
        label: "7. HPI rises",
        detail:
          "A logistic-regression ML model integrates >20 waveform features into a single 0–100 scalar. HPI trends up before MAP falls.",
      },
      {
        view: "hpi",
        key: "alarm",
        label: "8. Alarm & predicted hypotension",
        detail:
          "HPI ≥ 85 alarms ~15 min before MAP drops below 65 mmHg (Hatib 2018). HYPE 2020 showed a 74% reduction in hypotension time when clinicians acted on the alarm.",
      },
    ],
    [],
  );

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimer();
    if (!playing) return;
    timerRef.current = window.setTimeout(() => {
      setActive((p) => (p + 1) % steps.length);
    }, 2600);
    return clearTimer;
  }, [active, playing, steps.length, clearTimer]);

  const current = steps[active];
  const view = current.view;

  const jumpToView = (v: View) => {
    setPlaying(false);
    const idx = steps.findIndex((s) => s.view === v);
    if (idx >= 0) setActive(idx);
  };

  return (
    <DiagramFigure
      id="acumen-iq-diagram"
      title="Edwards Acumen IQ sensor & HPI"
      description="Animated walk-through of the Acumen IQ arterial-line sensor → FloTrac-derived haemodynamics → Hypotension Prediction Index (HPI) prediction of MAP <65 mmHg episodes."
    >
      <div className="space-y-4">
        {/* View tabs */}
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant={view === "sensor" ? "default" : "outline"} onClick={() => jumpToView("sensor")}>
            Sensor & signal chain
          </Button>
          <Button size="sm" variant={view === "waveform" ? "default" : "outline"} onClick={() => jumpToView("waveform")}>
            Waveform features
          </Button>
          <Button size="sm" variant={view === "hpi" ? "default" : "outline"} onClick={() => jumpToView("hpi")}>
            HPI trace
          </Button>
        </div>

        {/* Transport controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => {
              setPlaying(false);
              setActive((p) => (p - 1 + steps.length) % steps.length);
            }}
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="default"
            className="h-8 w-8"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => {
              setPlaying(false);
              setActive((p) => (p + 1) % steps.length);
            }}
            aria-label="Next step"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => {
              setActive(0);
              setPlaying(!prefersReducedMotion);
            }}
            aria-label="Restart"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="h-1.5 flex-1 min-w-[120px] rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono tabular-nums text-muted-foreground shrink-0">
            {active + 1} / {steps.length}
          </span>
        </div>

        {view === "sensor" && <SensorScene stepKey={current.key} />}
        {view === "waveform" && <WaveformScene stepKey={current.key} />}
        {view === "hpi" && <HpiScene stepKey={current.key} />}

        {/* Step caption */}
        <div
          key={`caption-${active}`}
          className="rounded-lg border-l-4 border-primary/60 bg-muted/40 px-4 py-3 animate-fade-in"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-foreground mb-1">{current.label}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{current.detail}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-1">Inputs</p>
            <p className="text-muted-foreground">
              Standard radial arterial line + Acumen IQ transducer. No calibration, no CVC, no thermodilution.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-1">Derived variables</p>
            <p className="text-muted-foreground">
              CO, SV, SVV, PPV, SVR, dP/dt (contractility), Eadyn (dynamic arterial elastance), HPI (0–100).
            </p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-1">HPI algorithm</p>
            <p className="text-muted-foreground">
              Logistic-regression ML model trained on &gt;20 waveform features from ~1300 arterial waveforms; alarms at HPI ≥ 85.
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

const SensorScene = ({ stepKey }: { stepKey: string }) => {
  // Animate a pulse dot along the tubing path when stepKey === "pulse".
  // Highlight transducer when "transduce", highlight monitor when "compute".
  const highlightSensor = stepKey === "transduce" || stepKey === "compute";
  const highlightMonitor = stepKey === "compute";

  return (
    <svg viewBox="0 0 400 180" className="w-full rounded-lg border border-border bg-secondary/20">
      {/* Arm outline */}
      <path
        d="M 20 90 Q 60 70 120 85 L 200 90 L 200 105 L 120 100 Q 60 105 20 105 Z"
        fill="hsl(var(--muted))"
        opacity="0.5"
      />
      {/* Radial artery */}
      <path d="M 30 96 Q 90 92 200 98" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" />
      <text x="30" y="120" className="text-[9px]" fill="hsl(var(--muted-foreground))">
        Radial arterial cannula
      </text>

      {/* Tubing path (shared for animation) */}
      <path
        id="acumen-tubing"
        d="M 200 98 L 230 98 L 230 60 L 260 60"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Pulse dots travelling down the tubing */}
      {stepKey === "pulse" && (
        <>
          {[0, 0.5].map((delay) => (
            <circle key={delay} r="4" fill="hsl(var(--destructive))">
              <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`} rotate="auto">
                <mpath href="#acumen-tubing" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="1.2s"
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
            </circle>
          ))}
        </>
      )}

      {/* Acumen IQ sensor box */}
      <rect
        x="260"
        y="45"
        width="90"
        height="30"
        rx="4"
        fill="hsl(var(--primary))"
        opacity={highlightSensor ? "0.35" : "0.15"}
        stroke="hsl(var(--primary))"
        strokeWidth={highlightSensor ? "2" : "1"}
        className={cn("transition-all", stepKey === "transduce" && "animate-pulse")}
      />
      <text x="305" y="63" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--primary))">
        Acumen IQ
      </text>
      <text x="305" y="72" textAnchor="middle" className="text-[7px]" fill="hsl(var(--muted-foreground))">
        pressure transducer
      </text>

      {/* Cable to monitor */}
      <path
        id="acumen-cable"
        d="M 350 60 Q 375 60 375 110 L 320 110"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 2"
      />

      {/* Electrical signal travelling to monitor on "compute" */}
      {stepKey === "compute" && (
        <circle r="3" fill="hsl(var(--primary))">
          <animateMotion dur="0.9s" repeatCount="indefinite">
            <mpath href="#acumen-cable" />
          </animateMotion>
        </circle>
      )}

      {/* HemoSphere monitor */}
      <rect
        x="210"
        y="105"
        width="110"
        height="60"
        rx="4"
        fill="hsl(var(--card))"
        stroke={highlightMonitor ? "hsl(var(--primary))" : "hsl(var(--border))"}
        strokeWidth={highlightMonitor ? "2" : "1"}
        className={cn("transition-all", highlightMonitor && "animate-pulse")}
      />
      <text x="265" y="120" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
        HemoSphere
      </text>
      <text x="220" y="133" className="text-[7px]" fill="hsl(var(--muted-foreground))">
        CO / SV / SVV
      </text>
      <text x="220" y="144" className="text-[7px]" fill="hsl(var(--muted-foreground))">
        dP/dt · Eadyn
      </text>
      <text x="220" y="155" className="text-[7px] font-semibold" fill="hsl(var(--primary))">
        HPI 0–100
      </text>

      {stepKey === "pulse" && (
        <text x="110" y="80" className="text-[8px] italic animate-fade-in" fill="hsl(var(--destructive))">
          pulsatile pressure →
        </text>
      )}
    </svg>
  );
};

const WaveformScene = ({ stepKey }: { stepKey: string }) => {
  const wavePath =
    "M 20 140 L 60 140 Q 65 140 70 60 Q 72 45 78 55 Q 90 85 100 95 L 110 100 Q 115 100 118 85 L 122 88 Q 130 110 140 130 L 180 138 L 220 140 Q 225 140 230 60 Q 232 45 238 55 Q 250 85 260 95 L 270 100 Q 275 100 278 85 L 282 88 Q 290 110 300 130 L 340 138 L 380 140";

  return (
    <svg viewBox="0 0 400 180" className="w-full rounded-lg border border-border bg-secondary/20">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="10" y1={y} x2="390" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
      ))}
      <path d={wavePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />

      {/* Upstroke slope highlight */}
      {stepKey === "upstroke" && (
        <g className="animate-fade-in">
          <line x1="65" y1="140" x2="70" y2="60" stroke="hsl(var(--destructive))" strokeWidth="3" />
          <line x1="215" y1="140" x2="220" y2="60" stroke="hsl(var(--destructive))" strokeWidth="3" />
          <path
            d="M 60 140 Q 65 140 70 60"
            stroke="hsl(var(--destructive))"
            strokeWidth="3"
            fill="none"
            strokeDasharray="120"
            strokeDashoffset="120"
          >
            <animate attributeName="stroke-dashoffset" from="120" to="0" dur="0.8s" fill="freeze" />
          </path>
          <text x="30" y="45" className="text-[9px] font-semibold" fill="hsl(var(--destructive))">
            Upstroke slope (dP/dt) → contractility
          </text>
        </g>
      )}

      {/* Dicrotic notch highlight */}
      {stepKey === "notch" && (
        <g className="animate-fade-in">
          <circle cx="118" cy="85" r="6" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2">
            <animate attributeName="r" values="4;10;4" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="278" cy="85" r="6" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2">
            <animate attributeName="r" values="4;10;4" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text x="130" y="70" className="text-[9px] font-semibold" fill="hsl(var(--destructive))">
            Dicrotic notch → SVR, Eadyn
          </text>
        </g>
      )}

      {/* Beat-to-beat variability — highlight both beats with brackets */}
      {stepKey === "variability" && (
        <g className="animate-fade-in">
          <path d="M 60 30 L 60 20 L 180 20 L 180 30" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" />
          <path d="M 220 30 L 220 20 L 340 20 L 340 30" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" />
          <text x="90" y="16" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">
            beat 1
          </text>
          <text x="250" y="16" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">
            beat 2 (respiratory cycle)
          </text>
          <text x="30" y="170" className="text-[9px] font-semibold" fill="hsl(var(--destructive))">
            Area / amplitude variation → SVV, PPV
          </text>
        </g>
      )}
    </svg>
  );
};

const HpiScene = ({ stepKey }: { stepKey: string }) => {
  const showAlarm = stepKey === "alarm";
  const hpiLen = 470; // approx path length
  const mapLen = 470;

  return (
    <svg viewBox="0 0 400 180" className="w-full rounded-lg border border-border bg-secondary/20">
      <line x1="30" y1="20" x2="30" y2="160" stroke="hsl(var(--border))" />
      <line x1="30" y1="160" x2="390" y2="160" stroke="hsl(var(--border))" />
      <text x="5" y="25" className="text-[8px]" fill="hsl(var(--muted-foreground))">
        100
      </text>
      <text x="5" y="163" className="text-[8px]" fill="hsl(var(--muted-foreground))">
        0
      </text>
      <text x="380" y="175" className="text-[8px]" fill="hsl(var(--muted-foreground))">
        time
      </text>
      <text x="5" y="90" className="text-[8px]" fill="hsl(var(--muted-foreground))" transform="rotate(-90 8 90)">
        HPI
      </text>

      {/* Alarm threshold */}
      <line
        x1="30"
        y1="41"
        x2="390"
        y2="41"
        stroke="hsl(var(--destructive))"
        strokeWidth="0.8"
        strokeDasharray="4 3"
      />
      <text x="335" y="38" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">
        HPI 85 alarm
      </text>

      {/* HPI curve — animated draw */}
      <path
        key={`hpi-${stepKey}`}
        d="M 30 140 Q 100 138 150 130 Q 200 115 240 60 Q 260 35 290 30 L 320 32 L 390 40"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray={hpiLen}
        strokeDashoffset={hpiLen}
      >
        <animate attributeName="stroke-dashoffset" from={hpiLen} to="0" dur="2.2s" fill="freeze" />
      </path>

      {/* MAP overlay — appears in alarm step */}
      {showAlarm && (
        <>
          <path
            d="M 30 70 Q 100 72 200 74 Q 260 80 300 110 Q 340 135 390 140"
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1.5"
            strokeDasharray={`${mapLen}`}
            strokeDashoffset={mapLen}
          >
            <animate attributeName="stroke-dashoffset" from={mapLen} to="0" dur="1.8s" fill="freeze" />
          </path>
          <text x="60" y="65" className="text-[8px] animate-fade-in" fill="hsl(var(--muted-foreground))">
            MAP (secondary axis)
          </text>
          <circle cx={240} cy={60} r={5} fill="hsl(var(--destructive))">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="245" y="55" className="text-[8px] font-semibold animate-fade-in" fill="hsl(var(--destructive))">
            Predicted hypotension ~15 min ahead
          </text>
          <text x="270" y="155" className="text-[8px] animate-fade-in" fill="hsl(var(--muted-foreground))">
            MAP crosses 65 mmHg
          </text>
        </>
      )}
    </svg>
  );
};

export default AcumenIQDiagram;
