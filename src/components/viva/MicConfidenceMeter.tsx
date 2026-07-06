import { useMemo } from "react";
import { AlertTriangle, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfidenceSegment {
  /** Verbatim recognised phrase from a single finalised result. */
  text: string;
  /** Web Speech API confidence for that phrase, range 0–1. May be 0/undefined on some browsers. */
  confidence: number;
}

interface MicConfidenceMeterProps {
  /** All finalised segments captured during the current recording. */
  segments: ConfidenceSegment[];
  /** True while the mic is actively listening — drives the pulsing dot + label. */
  listening: boolean;
  /** Threshold below which a segment is flagged for review. Default 0.6. */
  lowThreshold?: number;
  /** Optional callback when the user clicks a flagged phrase to copy it for editing. */
  onPickFlagged?: (segment: ConfidenceSegment) => void;
  className?: string;
}

/**
 * Live microphone recognition confidence meter.
 *
 * - While `listening`, shows a rolling-average confidence bar over the most
 *   recent finalised segments so the user can spot when the mic is struggling
 *   (background noise, accent, low volume).
 * - After recording, surfaces any segments below `lowThreshold` as a list of
 *   "phrases to double-check" so the user can quickly edit shaky transcription
 *   before submitting it for marking.
 *
 * Some browsers (notably Safari) report `confidence === 0` even for clean
 * speech. When that's the case across the board, we hide the meter rather than
 * scare the user with a permanently-red bar.
 */
const MicConfidenceMeter = ({
  segments,
  listening,
  lowThreshold = 0.6,
  onPickFlagged,
  className,
}: MicConfidenceMeterProps) => {
  const stats = useMemo(() => {
    const usable = segments.filter((s) => s.confidence > 0);
    if (usable.length === 0) return null;
    const recent = usable.slice(-6);
    const avg = recent.reduce((a, s) => a + s.confidence, 0) / recent.length;
    const flagged = segments.filter(
      (s) => s.confidence > 0 && s.confidence < lowThreshold,
    );
    return { avg, flagged, sampleSize: usable.length };
  }, [segments, lowThreshold]);

  // Browser doesn't report confidence (e.g. Safari) — render nothing rather than mislead.
  if (!stats && !listening) return null;
  if (!stats && listening) {
    // Listening but no finalised segments yet — show a placeholder bar.
    return (
      <div className={cn("rounded-lg border border-border bg-muted/30 p-3", className)}>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Mic className="h-3.5 w-3.5" />
          Listening… recognition confidence will appear here.
        </div>
      </div>
    );
  }

  const pct = Math.round((stats!.avg ?? 0) * 100);
  const tone =
    pct >= 80
      ? "bg-primary"
      : pct >= 60
        ? "bg-amber-500"
        : "bg-destructive";
  const toneLabel = pct >= 80 ? "Strong" : pct >= 60 ? "Mixed" : "Weak";
  const toneTextClass =
    pct >= 80
      ? "text-primary"
      : pct >= 60
        ? "text-amber-600 dark:text-amber-400"
        : "text-destructive";

  return (
    <div className={cn("rounded-lg border border-border bg-card p-3 space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Mic className="h-3.5 w-3.5" />
          Mic recognition
          {listening && (
            <span className="inline-flex items-center gap-1 normal-case font-normal text-destructive">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-destructive" />
              </span>
              live
            </span>
          )}
        </div>
        <span className={cn("text-[11px] font-semibold", toneTextClass)}>
          {pct}% · {toneLabel}
        </span>
      </div>

      {/* Confidence bar */}
      <div
        className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-label="Microphone recognition confidence"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className={cn("h-full transition-all duration-300 ease-out", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Flagged phrases — surfaced as soon as they appear, even mid-recording. */}
      {stats!.flagged.length > 0 && (
        <div className="pt-1.5 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <AlertTriangle className="h-3 w-3" />
            {stats!.flagged.length} phrase{stats!.flagged.length === 1 ? "" : "s"} to double-check
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {stats!.flagged.slice(-6).map((s, i) => {
              const conf = Math.round(s.confidence * 100);
              const Tag = onPickFlagged ? "button" : "span";
              return (
                <li key={`${i}-${s.text}`}>
                  <Tag
                    type={onPickFlagged ? "button" : undefined}
                    onClick={
                      onPickFlagged ? () => onPickFlagged(s) : undefined
                    }
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[11px] text-amber-700 dark:text-amber-300",
                      onPickFlagged && "hover:bg-amber-500/20 cursor-pointer",
                    )}
                    title={`Recognition confidence ${conf}%`}
                  >
                    <span className="font-mono text-[10px] opacity-70">{conf}%</span>
                    <span className="max-w-[18ch] truncate">"{s.text}"</span>
                  </Tag>
                </li>
              );
            })}
          </ul>
          {!listening && (
            <p className="text-[10px] text-muted-foreground mt-1">
              Edit your transcript before submitting if any of these look wrong.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MicConfidenceMeter;
