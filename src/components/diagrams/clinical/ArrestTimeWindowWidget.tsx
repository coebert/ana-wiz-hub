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

const THRESHOLDS: Threshold[] = [
  {
    at: 0, label: "0:00", title: "Start rhythm-specific resuscitation",
    action: "Confirm arrest, call the cardiac arrest and surgical teams and prepare for resternotomy. Start compressions immediately in PEA. In witnessed monitored VF/pVT, give up to three immediately available shocks. In asystole or extreme bradycardia try immediate pacing at maximum output if wires are available. Start compressions promptly if shocks or pacing are unavailable or fail.",
    color: "hsl(45, 90%, 50%)", tone: "warn",
  },
  {
    at: 60, label: "1:00", title: "Upper limit for initial shocks or pacing",
    action: "If circulation has not returned, CPR should already be underway. Continue high-quality compressions and ventilation, address reversible causes and proceed with the surgical team’s preparations for reopening. If adrenaline is used, RCUK advises 50–100 micrograms IV.",
    color: "hsl(0, 75%, 50%)", tone: "critical",
  },
  {
    at: 300, label: "5:00", title: "Resternotomy within five minutes",
    action: "For persistent arrest up to ten days after cardiac surgery, the trained team should reopen the chest within five minutes of arrest. Begin internal cardiac massage after reopening. Consider extracorporeal CPR for prolonged resuscitation or when reopening may be delayed.",
    color: "hsl(0, 75%, 40%)", tone: "critical",
  },
];

const MAX_SECONDS = 300; // early surgical reopening window

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ArrestTimeWindowWidget() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
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

  const currentIdx = THRESHOLDS.reduce(
    (acc, t, i) => (seconds >= t.at ? i : acc),
    0,
  );
  const current = THRESHOLDS[currentIdx];
  const next = THRESHOLDS[currentIdx + 1];
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
              Simulate elapsed arrest time. The widget highlights the action
              appropriate to the rhythm and the time limits for initial treatment and reopening.
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
  
        {/* Quick-jump chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {THRESHOLDS.map((t) => (
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
                background: `linear-gradient(90deg, ${THRESHOLDS[0].color}, ${current.color})`,
              }}
            />
          </div>
          <div className="relative h-6 mt-1">
            {THRESHOLDS.map((t) => {
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
          Teaching simulation. <a className="underline" href="https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines">RCUK 2025 cardiac surgery guidance</a> and <a className="underline" href="https://www.sts.org/sites/default/files/documents/ExpertConsensus_ResuscitationAfterCardiacSurgery.pdf">STS post-cardiac-surgery resuscitation consensus</a>.
        </p>
      </div>
    </DiagramFigure>
  );
}
