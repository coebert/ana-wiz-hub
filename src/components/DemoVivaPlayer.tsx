import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DemoVivaSegment {
  /** Short label shown next to the play indicator (e.g. "Question"). */
  label: string;
  /** Spoken text for this segment. */
  text: string;
}

interface DemoVivaPlayerProps {
  segments: DemoVivaSegment[];
}

type PlayState = "idle" | "playing" | "paused";

/**
 * Plays a sequence of spoken segments in real time using the browser's
 * built-in SpeechSynthesis API. No backend or API key required, so the
 * landing-page demo can be heard immediately on click.
 */
const DemoVivaPlayer = ({ segments }: DemoVivaPlayerProps) => {
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const [state, setState] = useState<PlayState>("idle");
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const cancelledRef = useRef(false);

  // Stop any in-flight speech if the component unmounts.
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  const speakSegment = useCallback(
    (text: string) =>
      new Promise<void>((resolve, reject) => {
        if (!supported) return resolve();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1;
        u.pitch = 1;
        const voices = window.speechSynthesis.getVoices();
        const preferred =
          voices.find((v) => /en-GB/i.test(v.lang)) ||
          voices.find((v) => /en[-_]/i.test(v.lang)) ||
          voices[0];
        if (preferred) u.voice = preferred;
        u.onend = () => resolve();
        u.onerror = (e) => {
          // "interrupted"/"canceled" are expected when user stops playback.
          if (e.error === "canceled" || e.error === "interrupted") resolve();
          else reject(new Error(e.error || "speech error"));
        };
        window.speechSynthesis.speak(u);
      }),
    [supported],
  );

  const stop = useCallback(() => {
    cancelledRef.current = true;
    if (supported) window.speechSynthesis.cancel();
    setState("idle");
    setActiveIdx(-1);
  }, [supported]);

  const play = useCallback(async () => {
    if (!supported) return;

    // Resume from pause.
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }

    cancelledRef.current = false;
    setState("playing");

    for (let i = 0; i < segments.length; i++) {
      if (cancelledRef.current) break;
      setActiveIdx(i);
      try {
        await speakSegment(`${segments[i].label}. ${segments[i].text}`);
      } catch {
        // Stop the chain on a real error.
        break;
      }
    }

    if (!cancelledRef.current) {
      setState("idle");
      setActiveIdx(-1);
    }
  }, [segments, speakSegment, state, supported]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setState("paused");
  }, [supported]);

  if (!supported) {
    return (
      <p className="text-[11px] text-muted-foreground italic">
        Voice playback isn't supported in this browser — try Chrome, Edge or Safari.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {state === "playing" ? (
        <Button type="button" size="sm" variant="secondary" onClick={pause}>
          <Pause className="h-3.5 w-3.5 mr-1.5" />
          Pause
        </Button>
      ) : (
        <Button type="button" size="sm" onClick={play}>
          <Play className="h-3.5 w-3.5 mr-1.5" />
          {state === "paused" ? "Resume" : "Play viva"}
        </Button>
      )}
      {state !== "idle" && (
        <Button type="button" size="sm" variant="outline" onClick={stop}>
          <Square className="h-3.5 w-3.5 mr-1.5" />
          Stop
        </Button>
      )}
      {activeIdx >= 0 && (
        <span className="text-[11px] text-muted-foreground">
          Now playing: <span className="font-medium text-foreground">{segments[activeIdx].label}</span>
        </span>
      )}
    </div>
  );
};

export default DemoVivaPlayer;
