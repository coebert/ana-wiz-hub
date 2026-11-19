import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface Threshold {
  at: number; // seconds
  label: string;
  title: string;
  action: string;
  color: string; // hsl
  tone: "info" | "warn" | "critical";
}

type RhythmKey = "vf-vt" | "pea" | "asystole";

const MAX_SECONDS = 720; // 12 min display window

const REDUCED_ADRENALINE =
  "Reduced IV adrenaline 0.05–0.1 mg (50–100 micrograms) when indicated — never a 1 mg bolus.";

const THRESHOLD_SETS: Record<RhythmKey, Threshold[]> = {
  "vf-vt": [
    {
      at: 0,
      label: "0:00",
      title: "Arrest recognised",
      action:
        "Confirm monitored VF/pulseless VT on the monitor and arterial trace. Call the cardiac arrest team AND the on-call cardiac surgeon. Note the time. Pre-applied defib pads in use.",
      color: "hsl(45, 90%, 50%)",
      tone: "info",
    },
    {
      at: 60,
      label: "1:00",
      title: "Up to 3 stacked shocks",
      action:
        "Deliver up to 3 sequential biphasic shocks (150–200 J) BEFORE starting chest compressions — these patients are monitored and reperfusion VF often responds to immediate shocks.",
      color: "hsl(0, 75%, 50%)",
      tone: "warn",
    },
    {
      at: 120,
      label: "2:00",
      title: "External compressions if shocks fail",
      action:
        "If still in VF/VT after 3 shocks, start external compressions 100–120/min, depth 5–6 cm, allowing full recoil. Amiodarone 300 mg IV for refractory VF/VT.",
      color: "hsl(210, 65%, 50%)",
      tone: "warn",
    },
    {
      at: 180,
      label: "3:00",
      title: "Reduced-dose adrenaline; prepare resternotomy",
      action: `${REDUCED_ADRENALINE} Open the resternotomy set and address surgery-specific causes (tamponade, bleeding, graft occlusion, hyperkalaemia/acidosis).`,
      color: "hsl(25, 80%, 50%)",
      tone: "critical",
    },
    {
      at: 300,
      label: "5:00",
      title: "Emergency resternotomy",
      action:
        "Refractory VF/VT with resternotomy indicated and a trained surgeon present: perform bedside resternotomy promptly, aiming to be within 5 minutes. Internal cardiac massage 100/min, internal defibrillation 20 J. Control bleeding, relieve tamponade.",
      color: "hsl(0, 75%, 40%)",
      tone: "critical",
    },
    {
      at: 600,
      label: "10:00",
      title: "Escalate to mechanical support",
      action:
        "No ROSC after resternotomy and reversible cause correction: escalate to VA-ECMO, IABP or temporary VAD. Senior cardiac surgeon + intensivist decision. Continue internal massage until on support.",
      color: "hsl(280, 55%, 50%)",
      tone: "critical",
    },
  ],
  pea: [
    {
      at: 0,
      label: "0:00",
      title: "PEA recognised",
      action:
        "Confirm PEA on the monitor and arterial trace with an absent pulse. Call the cardiac arrest team AND the on-call cardiac surgeon. Note the time. Start external compressions immediately — do not wait to try pacing.",
      color: "hsl(45, 90%, 50%)",
      tone: "info",
    },
    {
      at: 60,
      label: "1:00",
      title: "Compressions + assess reversible causes",
      action:
        "Continue external compressions 100–120/min. Urgent TOE/echo for tamponade or graft failure; replace volume/blood for bleeding; decompress a tension pneumothorax; correct hyperkalaemia/acidosis.",
      color: "hsl(210, 65%, 50%)",
      tone: "warn",
    },
    {
      at: 120,
      label: "2:00",
      title: "Reduced-dose adrenaline when indicated",
      action: `${REDUCED_ADRENALINE} Atropine is no longer routine. Treat a confirmed cause rather than giving calcium or bicarbonate indiscriminately.`,
      color: "hsl(25, 80%, 50%)",
      tone: "warn",
    },
    {
      at: 180,
      label: "3:00",
      title: "Prepare resternotomy",
      action:
        "Persisting PEA: open the resternotomy set and confirm the trained surgical responder. Tamponade and major bleeding are corrected by opening the chest.",
      color: "hsl(0, 75%, 50%)",
      tone: "critical",
    },
    {
      at: 300,
      label: "5:00",
      title: "Emergency resternotomy",
      action:
        "Resternotomy indicated and a trained surgeon present: perform bedside resternotomy promptly, aiming to be within 5 minutes. Internal cardiac massage 100/min; control bleeding; relieve tamponade.",
      color: "hsl(0, 75%, 40%)",
      tone: "critical",
    },
    {
      at: 600,
      label: "10:00",
      title: "Escalate to mechanical support",
      action:
        "No ROSC after resternotomy and reversible cause correction: escalate to VA-ECMO, IABP or temporary VAD. Senior cardiac surgeon + intensivist decision.",
      color: "hsl(280, 55%, 50%)",
      tone: "critical",
    },
  ],
  asystole: [
    {
      at: 0,
      label: "0:00",
      title: "Asystole recognised",
      action:
        "Confirm asystole with an absent pulse. Call the cardiac arrest team AND the on-call cardiac surgeon. Note the time. Start external compressions immediately if there is no output.",
      color: "hsl(45, 90%, 50%)",
      tone: "info",
    },
    {
      at: 60,
      label: "1:00",
      title: "Epicardial pacing at maximum output",
      action:
        "Set DDD or VVI at 80–100 bpm at maximum output and attempt capture WHILE compressions continue. A pacing spike alone is not output — stop compressions only when a coordinated electrical and mechanical output with a palpable pulse is confirmed.",
      color: "hsl(195, 70%, 45%)",
      tone: "warn",
    },
    {
      at: 120,
      label: "2:00",
      title: "Reduced-dose adrenaline when indicated",
      action: `${REDUCED_ADRENALINE} Atropine is no longer routine. Consider calcium or bicarbonate only for a confirmed hyperkalaemia/acidosis cause.`,
      color: "hsl(25, 80%, 50%)",
      tone: "warn",
    },
    {
      at: 180,
      label: "3:00",
      title: "Address reversible causes; prepare resternotomy",
      action:
        "Tamponade (echo/TOE), tension pneumothorax, surgical bleeding, graft occlusion, severe acidosis or hyperkalaemia. Open the resternotomy set.",
      color: "hsl(0, 75%, 50%)",
      tone: "critical",
    },
    {
      at: 300,
      label: "5:00",
      title: "Emergency resternotomy",
      action:
        "Resternotomy indicated and a trained surgeon present: perform bedside resternotomy promptly, aiming to be within 5 minutes. Internal cardiac massage 100/min; internal defibrillation 20 J if VF develops.",
      color: "hsl(0, 75%, 40%)",
      tone: "critical",
    },
    {
      at: 600,
      label: "10:00",
      title: "Escalate to mechanical support",
      action:
        "No ROSC after resternotomy and reversible cause correction: escalate to VA-ECMO, IABP or temporary VAD. Senior cardiac surgeon + intensivist decision.",
      color: "hsl(280, 55%, 50%)",
      tone: "critical",
    },
  ],
};

const RHYTHM_LABELS: { key: RhythmKey; label: string }[] = [
  { key: "vf-vt", label: "VF / pVT" },
  { key: "pea", label: "PEA" },
  { key: "asystole", label: "Asystole (pacing wires)" },
];

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ArrestTimeWindowWidget() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [rhythm, setRhythm] = useState<RhythmKey>("vf-vt");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => (s >= MAX_SECONDS ? s : s + 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  const thresholds = THRESHOLD_SETS[rhythm];
  const currentIdx = thresholds.reduce(
    (acc, t, i) => (seconds >= t.at ? i : acc),
    0,
  );
  const current = thresholds[currentIdx];
  const next = thresholds[currentIdx + 1];
  const secondsToNext = next ? Math.max(0, next.at - seconds) : null;
  const progressPct = Math.min(100, (seconds / MAX_SECONDS) * 100);

  const toneClasses = {
    info: "border-amber-500/30 bg-amber-500/5",
    warn: "border-orange-500/40 bg-orange-500/10",
    critical: "border-red-500/50 bg-red-500/10",
  } as const;

  const toneText = {
    info: "text-amber-500",
    warn: "text-orange-500",
    critical: "text-red-500",
  } as const;

  return (
    <DiagramFigure
      id="arrest-time-window-widget"
      title="Arrest time window widget"
      description="Arrest time window widget: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
      <div className="rounded-xl border border-border bg-card p-4 my-6">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <h3 className="text-base font-serif font-bold text-foreground">
              Arrest Time-Window Widget
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Simulate elapsed arrest time for the selected rhythm. The widget
              highlights the action required as you approach each threshold.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {running ? "Pause" : seconds === 0 ? "Start" : "Resume"}
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setSeconds(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-background text-muted-foreground hover:bg-accent/40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Rhythm selector */}
        <div className="flex flex-wrap gap-1.5 mb-3" role="tablist" aria-label="Arrest rhythm">
          {RHYTHM_LABELS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              role="tab"
              aria-selected={rhythm === opt.key}
              onClick={() => {
                setRhythm(opt.key);
                setSeconds(0);
                setRunning(false);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                rhythm === opt.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-accent/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Quick-jump chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {thresholds.map((t) => (
            <button
              key={t.at}
              type="button"
              onClick={() => setSeconds(t.at)}
              className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                seconds >= t.at
                  ? "border-transparent text-white"
                  : "border-border bg-background text-muted-foreground hover:bg-accent/40"
              }`}
              style={seconds >= t.at ? { background: t.color } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mb-6">
          <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${thresholds[0].color}, ${current.color})`,
              }}
            />
          </div>
          <div className="relative h-6 mt-1">
            {thresholds.map((t) => {
              const left = (t.at / MAX_SECONDS) * 100;
              const reached = seconds >= t.at;
              return (
                <div
                  key={t.at}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${left}%` }}
                >
                  <div
                    className={`w-2 h-2 rounded-full -mt-3 ring-2 ring-background transition-all ${
                      reached ? "scale-125" : ""
                    }`}
                    style={{ background: reached ? t.color : "hsl(var(--muted-foreground) / 0.4)" }}
                  />
                  <span
                    className={`text-[10px] mt-1 font-medium ${
                      reached ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current state */}
        <div className="grid sm:grid-cols-[140px_1fr] gap-3 items-stretch">
          <div className="rounded-lg border border-border bg-secondary/30 p-3 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Elapsed
            </span>
            <span className="text-3xl font-mono font-bold text-foreground tabular-nums">
              {fmt(seconds)}
            </span>
            {secondsToNext !== null && next && (
              <span className="text-[10px] text-muted-foreground mt-1 text-center">
                Next threshold {next.label}
                <br />
                in {fmt(secondsToNext)}
              </span>
            )}
          </div>

          <div className={`rounded-lg border p-3 min-h-[180px] sm:min-h-[150px] ${toneClasses[current.tone]}`}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: current.color }}
                aria-hidden
              />
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${toneText[current.tone]}`}>
                {current.label} · {current.tone === "critical" ? "Critical" : current.tone === "warn" ? "Action now" : "Initial"}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              {current.title}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {current.action}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground italic mt-4">
          Educational tool only — not for live clinical use. Thresholds follow
          Resuscitation Council UK 2025 special-circumstances guidance and the
          STS expert consensus on resuscitation after cardiac surgery.
        </p>
      </div>
    </DiagramFigure>
  );
}
