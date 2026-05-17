import { useEffect, useState, useSyncExternalStore } from "react";
import { Activity, RotateCcw, X } from "lucide-react";
import { cascadePerf, type CascadePerfSnapshot } from "./cascadePerf";

const EMPTY: CascadePerfSnapshot = {
  entries: [],
  frames: { longFrames: 0, totalFrames: 0, worstFrameMs: 0 },
  anyPlaying: false,
};

const useSnapshot = (): CascadePerfSnapshot => {
  return useSyncExternalStore(
    (cb) => cascadePerf.subscribe(cb),
    () => cascadePerf.snapshot(),
    () => EMPTY,
  );
};

/**
 * Dev-only floating perf badge for animated cascade diagrams.
 * Mount once near the app root; renders nothing in production.
 */
export const CascadePerfBadge = () => {
  if (!cascadePerf.enabled) return null;
  return <CascadePerfBadgeInner />;
};

const CascadePerfBadgeInner = () => {
  const snap = useSnapshot();
  const [open, setOpen] = useState(false);
  // Tick once a second so playingMs counters update in the UI.
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!snap.anyPlaying) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [snap.anyPlaying]);

  if (snap.entries.length === 0) return null;

  const totalShifts = snap.entries.reduce((n, e) => n + e.layoutShifts, 0);
  const totalShiftPx = snap.entries.reduce((n, e) => n + e.totalShiftPx, 0);
  const playingCount = snap.entries.filter((e) => e.isPlaying).length;
  const dropPct =
    snap.frames.totalFrames > 0
      ? (snap.frames.longFrames / snap.frames.totalFrames) * 100
      : 0;

  return (
    <div className="fixed bottom-3 right-3 z-[200] font-mono text-[11px] select-none">
      {open ? (
        <div className="w-[300px] max-h-[60vh] overflow-auto rounded-lg border border-border bg-card/95 backdrop-blur shadow-xl">
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border sticky top-0 bg-card/95 backdrop-blur">
            <div className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="font-semibold text-foreground">Cascade perf</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => cascadePerf.reset()}
                className="rounded p-1 hover:bg-muted text-muted-foreground"
                aria-label="Reset perf counters"
                title="Reset counters"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1 hover:bg-muted text-muted-foreground"
                aria-label="Close perf panel"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="px-3 py-2 border-b border-border space-y-0.5">
            <Row label="Mounted" value={`${snap.entries.length}`} />
            <Row label="Playing" value={`${playingCount}`} />
            <Row
              label="Layout shifts"
              value={`${totalShifts} (${Math.round(totalShiftPx)}px)`}
              warn={totalShifts > 0}
            />
            <Row
              label="Long frames (>50ms)"
              value={
                snap.frames.totalFrames > 0
                  ? `${snap.frames.longFrames} / ${snap.frames.totalFrames} (${dropPct.toFixed(1)}%)`
                  : "—"
              }
              warn={dropPct > 5}
            />
            <Row
              label="Worst frame"
              value={
                snap.frames.worstFrameMs > 0
                  ? `${snap.frames.worstFrameMs.toFixed(0)}ms`
                  : "—"
              }
              warn={snap.frames.worstFrameMs > 100}
            />
          </div>
          <ul className="divide-y divide-border">
            {snap.entries.map((e) => (
              <li key={e.id} className="px-3 py-1.5">
                <p className="truncate font-semibold text-foreground" title={e.title}>
                  {e.isPlaying ? "▶ " : "■ "}
                  {e.title}
                </p>
                <p className="text-muted-foreground">
                  shifts {e.layoutShifts} · Δ{Math.round(e.totalShiftPx)}px ·
                  steps {e.stepChanges} · play {(e.playingMs / 1000).toFixed(1)}s
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/95 backdrop-blur px-2.5 py-1 shadow-md hover:bg-muted"
          aria-label="Open cascade perf panel"
          title="Cascade diagram performance"
        >
          <Activity
            className={`h-3.5 w-3.5 ${dropPct > 5 || totalShifts > 0 ? "text-destructive" : "text-primary"}`}
            aria-hidden="true"
          />
          <span className="text-foreground">
            {snap.entries.length}·{totalShifts}sh·{snap.frames.longFrames}lf
          </span>
        </button>
      )}
    </div>
  );
};

const Row = ({ label, value, warn }: { label: string; value: string; warn?: boolean }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-muted-foreground">{label}</span>
    <span className={warn ? "text-destructive font-semibold" : "text-foreground"}>
      {value}
    </span>
  </div>
);
