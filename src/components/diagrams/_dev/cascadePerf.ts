/**
 * Dev-only performance store for animated cascade diagrams.
 *
 * Tracks, per mounted cascade instance:
 *   • layoutShifts — ResizeObserver-driven height changes of the description panel
 *   • totalShiftPx — cumulative |Δheight| in CSS pixels
 *   • stepChanges — how many times the user/auto-play advanced the step
 *   • playingMs   — wall-clock duration spent in `playing` mode
 *
 * Plus a single shared rAF-driven frame monitor (one loop for the whole page,
 * not per instance) that counts long frames (>50ms — Chrome's "long task"
 * threshold approximation in main-thread land) while ANY cascade is playing.
 *
 * All of this is a no-op outside `import.meta.env.DEV`.
 */

export interface CascadePerfEntry {
  id: string;
  title: string;
  layoutShifts: number;
  totalShiftPx: number;
  stepChanges: number;
  playingMs: number;
  isPlaying: boolean;
}

interface FrameStats {
  longFrames: number;
  totalFrames: number;
  worstFrameMs: number;
}

const DEV = typeof import.meta !== "undefined" && !!import.meta.env?.DEV;

const entries = new Map<string, CascadePerfEntry>();
const subscribers = new Set<() => void>();
let playingCount = 0;
let rafId: number | null = null;
let lastFrameTs: number | null = null;
const frameStats: FrameStats = {
  longFrames: 0,
  totalFrames: 0,
  worstFrameMs: 0,
};

const LONG_FRAME_MS = 50;

// Cached snapshot — must be a stable reference between mutations so
// useSyncExternalStore doesn't see "changes" every render (which would
// trigger an infinite update loop).
let cachedSnapshot: {
  entries: CascadePerfEntry[];
  frames: FrameStats;
  anyPlaying: boolean;
} = { entries: [], frames: { ...frameStats }, anyPlaying: false };

const invalidate = () => {
  cachedSnapshot = {
    entries: Array.from(entries.values()).map((e) => ({ ...e })),
    frames: { ...frameStats },
    anyPlaying: playingCount > 0,
  };
};

const emit = () => {
  invalidate();
  subscribers.forEach((cb) => cb());
};

const tickFrame = (ts: number) => {
  if (lastFrameTs !== null) {
    const delta = ts - lastFrameTs;
    frameStats.totalFrames += 1;
    if (delta > LONG_FRAME_MS) {
      frameStats.longFrames += 1;
      if (delta > frameStats.worstFrameMs) frameStats.worstFrameMs = delta;
    }
  }
  lastFrameTs = ts;
  if (playingCount > 0) {
    rafId = requestAnimationFrame(tickFrame);
  } else {
    rafId = null;
    lastFrameTs = null;
  }
};

const ensureFrameLoop = () => {
  if (!DEV) return;
  if (rafId === null && playingCount > 0) {
    rafId = requestAnimationFrame(tickFrame);
  }
};

export const cascadePerf = {
  enabled: DEV,

  register(id: string, title: string) {
    if (!DEV) return;
    entries.set(id, {
      id,
      title,
      layoutShifts: 0,
      totalShiftPx: 0,
      stepChanges: 0,
      playingMs: 0,
      isPlaying: false,
    });
    emit();
  },

  unregister(id: string) {
    if (!DEV) return;
    const e = entries.get(id);
    if (e?.isPlaying) {
      playingCount = Math.max(0, playingCount - 1);
    }
    entries.delete(id);
    emit();
  },

  recordShift(id: string, deltaPx: number) {
    if (!DEV) return;
    const e = entries.get(id);
    if (!e) return;
    e.layoutShifts += 1;
    e.totalShiftPx += Math.abs(deltaPx);
    emit();
  },

  recordStepChange(id: string) {
    if (!DEV) return;
    const e = entries.get(id);
    if (!e) return;
    e.stepChanges += 1;
    emit();
  },

  setPlaying(id: string, playing: boolean) {
    if (!DEV) return;
    const e = entries.get(id);
    if (!e || e.isPlaying === playing) return;
    e.isPlaying = playing;
    if (playing) {
      playingCount += 1;
      ensureFrameLoop();
    } else {
      playingCount = Math.max(0, playingCount - 1);
    }
    emit();
  },

  addPlayingMs(id: string, ms: number) {
    if (!DEV) return;
    const e = entries.get(id);
    if (!e) return;
    e.playingMs += ms;
    emit();
  },

  reset() {
    if (!DEV) return;
    entries.forEach((e) => {
      e.layoutShifts = 0;
      e.totalShiftPx = 0;
      e.stepChanges = 0;
      e.playingMs = 0;
    });
    frameStats.longFrames = 0;
    frameStats.totalFrames = 0;
    frameStats.worstFrameMs = 0;
    emit();
  },

  snapshot() {
    return {
      entries: Array.from(entries.values()),
      frames: { ...frameStats },
      anyPlaying: playingCount > 0,
    };
  },

  subscribe(cb: () => void) {
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  },
};

export type CascadePerfSnapshot = ReturnType<typeof cascadePerf.snapshot>;
