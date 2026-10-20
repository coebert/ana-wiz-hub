import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playVivaSpeech, isCancelled, type SpeechPlayback } from "@/lib/viva-audio";
import { toast } from "sonner";

export interface DemoVivaSegment {
  /** Short label shown next to the play indicator (e.g. "Question"). */
  label: string;
  /** Spoken text for this segment. */
  text: string;
}

interface DemoVivaPlayerProps {
  segments: DemoVivaSegment[];
}

type PlayState = "idle" | "loading" | "playing" | "paused";

/** Plays spoken segments in order, streaming each as it is generated. */
const DemoVivaPlayer = ({ segments }: DemoVivaPlayerProps) => {
  const [state, setState] = useState<PlayState>("idle");
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const cancelledRef = useRef(false);
  const playbackRef = useRef<SpeechPlayback | null>(null);

  useEffect(() => () => {
    cancelledRef.current = true;
    playbackRef.current?.stop();
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    playbackRef.current?.stop();
    playbackRef.current = null;
    setState("idle");
    setActiveIdx(-1);
  }, []);

  const play = useCallback(async () => {
    if (state === "paused" && playbackRef.current) {
      playbackRef.current.resume();
      setState("playing");
      return;
    }
    cancelledRef.current = false;
    setState("loading");
    try {
      for (let i = 0; i < segments.length; i++) {
        if (cancelledRef.current) break;
        setActiveIdx(i);
        const seg = segments[i];
        const playback = playVivaSpeech(`${seg.label}. ${seg.text}`);
        playbackRef.current = playback;
        setState("playing");
        await playback.done;
      }
    } catch (err) {
      if (!isCancelled(err) && !cancelledRef.current) {
        toast.error(err instanceof Error ? err.message : "Unable to play audio");
      }
    } finally {
      if (!cancelledRef.current) {
        playbackRef.current = null;
        setState("idle");
        setActiveIdx(-1);
      }
    }
  }, [segments, state]);

  const pause = useCallback(() => {
    if (playbackRef.current) {
      playbackRef.current.pause();
      setState("paused");
    }
  }, []);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {state === "playing" ? (
        <Button type="button" size="sm" variant="secondary" onClick={pause}>
          <Pause className="h-3.5 w-3.5 mr-1.5" />
          Pause
        </Button>
      ) : (
        <Button type="button" size="sm" onClick={play} disabled={state === "loading"}>
          {state === "loading" ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5 mr-1.5" />
          )}
          {state === "loading" ? "Loading…" : state === "paused" ? "Resume" : "Play viva"}
        </Button>
      )}
      {state !== "idle" && state !== "loading" && (
        <Button type="button" size="sm" variant="outline" onClick={stop}>
          <Square className="h-3.5 w-3.5 mr-1.5" />
          Stop
        </Button>
      )}
      {activeIdx >= 0 && (
        <span className="text-[11px] text-muted-foreground">
          Now playing:{" "}
          <span className="font-medium text-foreground">{segments[activeIdx].label}</span>
        </span>
      )}
    </div>
  );
};

export default DemoVivaPlayer;
