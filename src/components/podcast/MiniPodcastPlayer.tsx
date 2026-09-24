import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play, SkipBack, SkipForward, X, RotateCcw, RotateCw } from "lucide-react";
import { closePlayer, getAudio, skip, togglePlay, usePodcastPlayer } from "@/lib/podcastPlayer";

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.75];

export function MiniPodcastPlayer() {
  const { track, list, playing } = usePodcastPlayer();
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const a = getAudio();
    if (!a) return;
    const update = () => {
      setTime(a.currentTime);
      setDur(a.duration);
    };
    a.addEventListener("timeupdate", update);
    a.addEventListener("loadedmetadata", update);
    return () => {
      a.removeEventListener("timeupdate", update);
      a.removeEventListener("loadedmetadata", update);
    };
  }, []);

  useEffect(() => {
    const a = getAudio();
    if (a) a.playbackRate = speed;
  }, [speed, track]);

  if (!track) return null;
  const idx = list.findIndex((t) => t.key === track.key);
  const a = getAudio();
  const seekBy = (d: number) => {
    if (a) a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + d));
  };

  return (
    <div
      role="region"
      aria-label="Podcast player"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur shadow-lg"
    >
      <div className="mx-auto max-w-4xl px-3 py-2 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            {track.topicPath ? (
              <Link to={track.topicPath} className="block truncate text-sm font-semibold text-foreground hover:underline">
                {track.title}
              </Link>
            ) : (
              <p className="truncate text-sm font-semibold text-foreground">{track.title}</p>
            )}
            {track.subtitle && <p className="truncate text-xs text-muted-foreground">{track.subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])}
            className="rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground hover:bg-muted"
            aria-label="Playback speed"
          >
            {speed}×
          </button>
          <button type="button" onClick={closePlayer} aria-label="Close player" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-10 text-right text-[11px] tabular-nums text-muted-foreground">{fmt(time)}</span>
          <input
            type="range"
            min={0}
            max={dur || 0}
            step={1}
            value={time}
            onChange={(e) => a && (a.currentTime = Number(e.target.value))}
            aria-label="Seek"
            className="flex-1 accent-primary"
          />
          <span className="w-10 text-[11px] tabular-nums text-muted-foreground">{fmt(dur)}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => skip(-1)} disabled={idx <= 0} aria-label="Previous episode" className="rounded-md p-2 text-foreground hover:bg-muted disabled:opacity-40">
            <SkipBack className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => seekBy(-15)} aria-label="Back 15 seconds" className="rounded-md p-2 text-foreground hover:bg-muted">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/90">
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button type="button" onClick={() => seekBy(30)} aria-label="Forward 30 seconds" className="rounded-md p-2 text-foreground hover:bg-muted">
            <RotateCw className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => skip(1)} disabled={idx === -1 || idx >= list.length - 1} aria-label="Next episode" className="rounded-md p-2 text-foreground hover:bg-muted disabled:opacity-40">
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
