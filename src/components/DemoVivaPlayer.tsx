import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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

/**
 * Plays a sequence of spoken segments using the same OpenAI TTS voice
 * (`gpt-4o-mini-tts` / `alloy`) as the podcast generator, via the
 * `tts-demo` edge function. Audio for each segment is fetched on demand
 * and cached in-memory so replays/resumes are instant.
 */
const DemoVivaPlayer = ({ segments }: DemoVivaPlayerProps) => {
  const [state, setState] = useState<PlayState>("idle");
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const cancelledRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<number, string>>(new Map());

  // Stop any in-flight playback on unmount + revoke object URLs.
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      cacheRef.current.forEach((url) => URL.revokeObjectURL(url));
      cacheRef.current.clear();
    };
  }, []);

  const fetchSegmentUrl = useCallback(
    async (idx: number): Promise<string> => {
      const cached = cacheRef.current.get(idx);
      if (cached) return cached;

      const seg = segments[idx];
      const { data, error } = await supabase.functions.invoke("tts-demo", {
        body: { text: `${seg.label}. ${seg.text}` },
      });
      if (error) throw new Error(error.message || "TTS request failed");
      if (!data?.audioBase64) throw new Error("No audio returned");

      const url = `data:${data.mimeType ?? "audio/mpeg"};base64,${data.audioBase64}`;
      cacheRef.current.set(idx, url);
      return url;
    },
    [segments],
  );

  const playSegment = useCallback(
    (url: string) =>
      new Promise<void>((resolve, reject) => {
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error("playback error"));
        audio.play().catch(reject);
      }),
    [],
  );

  const stop = useCallback(() => {
    cancelledRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState("idle");
    setActiveIdx(-1);
  }, []);

  const play = useCallback(async () => {
    // Resume from pause.
    if (state === "paused" && audioRef.current) {
      try {
        await audioRef.current.play();
        setState("playing");
      } catch {
        /* ignore */
      }
      return;
    }

    cancelledRef.current = false;
    setState("loading");

    try {
      for (let i = 0; i < segments.length; i++) {
        if (cancelledRef.current) break;
        setActiveIdx(i);
        const url = await fetchSegmentUrl(i);
        if (cancelledRef.current) break;
        setState("playing");
        try {
          await playSegment(url);
        } catch {
          break;
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to play audio";
      toast.error(message);
    } finally {
      if (!cancelledRef.current) {
        setState("idle");
        setActiveIdx(-1);
      }
    }
  }, [fetchSegmentUrl, playSegment, segments, state]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
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
          {state === "loading"
            ? "Loading…"
            : state === "paused"
              ? "Resume"
              : "Play viva"}
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
          <span className="font-medium text-foreground">
            {segments[activeIdx].label}
          </span>
        </span>
      )}
    </div>
  );
};

export default DemoVivaPlayer;
