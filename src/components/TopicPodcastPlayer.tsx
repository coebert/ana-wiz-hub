import { useEffect, useRef, useState } from "react";
import { Headphones, Loader2, Pause, Play, AlertCircle, FileText, Gauge, Download, RefreshCw, Database, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  estimatePodcastTarget,
  extractTopicContent,
  fetchPodcast,
  generatePodcast,
  type PodcastResult,
} from "@/lib/podcast";
import { cn } from "@/lib/utils";

interface TopicPodcastPlayerProps {
  topicId: string;
  topicTitle: string;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

const formatTime = (s: number): string => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const TopicPodcastPlayer = ({ topicId, topicTitle }: TopicPodcastPlayerProps) => {
  const [podcast, setPodcast] = useState<PodcastResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [source, setSource] = useState<"cache" | "fresh" | null>(null);
  const [showScript, setShowScript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [estimate, setEstimate] = useState<{ minutes: number; words: number; sourceWords: number } | null>(null);
  const [regenOpen, setRegenOpen] = useState(false);
  const [regenPassword, setRegenPassword] = useState("");
  const [regenError, setRegenError] = useState<string | null>(null);
  const [regenSubmitting, setRegenSubmitting] = useState(false);

  // Estimate target length from page content once we know there's no cached podcast.
  useEffect(() => {
    if (loading || (podcast && podcast.status === "ready")) return;
    // Defer to next tick so topic DOM is fully rendered.
    const t = setTimeout(() => {
      const content = extractTopicContent();
      if (content && content.length > 50) setEstimate(estimatePodcastTarget(content));
    }, 0);
    return () => clearTimeout(t);
  }, [loading, podcast, topicId]);

  // Initial fetch — see if a cached podcast already exists.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const existing = await fetchPodcast(topicId);
      if (!cancelled) {
        setPodcast(existing);
        if (existing && existing.status === "ready") setSource("cache");
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  const handleGenerate = async (opts?: { force?: boolean; regeneratePassword?: string }) => {
    setGenerating(true);
    try {
      const content = extractTopicContent();
      if (!content || content.length < 200) {
        setPodcast({
          status: "failed",
          error: "Could not extract topic content from the page.",
        });
        return;
      }
      const result = await generatePodcast(topicId, topicTitle, content, opts);

      // If the backend says another generation is already in flight (likely
      // started in another tab or just before this click), poll the cached
      // row instead of showing nothing — surfaces the result as soon as it lands.
      if (result.status === "generating") {
        for (let i = 0; i < 60; i++) {
          await new Promise((r) => setTimeout(r, 5000));
          const polled = await fetchPodcast(topicId);
          if (polled && polled.status !== "generating") {
            setPodcast(polled);
            if (polled.status === "ready") setSource("fresh");
            return;
          }
        }
        setPodcast({
          status: "failed",
          error: "Podcast is still generating. Refresh the page in a minute.",
        });
        return;
      }

      setPodcast(result);
      if (result.status === "ready") setSource("fresh");
    } catch (err) {
      setPodcast({
        status: "failed",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setGenerating(false);
    }
  };

  const openRegenDialog = () => {
    setRegenPassword("");
    setRegenError(null);
    setRegenOpen(true);
  };

  const isInvalidPasswordError = (msg: string | undefined): boolean => {
    if (!msg) return false;
    return /invalid\s+regeneration\s+password/i.test(msg);
  };

  const submitRegenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegenError(null);

    // Client-side validation: format/shape only. Real check is server-side.
    const pw = regenPassword.trim();
    if (!pw) {
      setRegenError("Password is required.");
      return;
    }
    if (pw.length < 4) {
      setRegenError("Password is too short.");
      return;
    }

    setRegenSubmitting(true);
    try {
      const content = extractTopicContent();
      if (!content || content.length < 200) {
        setRegenError("Could not extract topic content from the page.");
        return;
      }

      // Probe with the password first so we can surface an invalid-password
      // error inline in the dialog without nuking the existing player state.
      const result = await generatePodcast(topicId, topicTitle, content, {
        force: true,
        regeneratePassword: pw,
      });

      if (result.status === "failed" && isInvalidPasswordError(result.error)) {
        setRegenError("Invalid password. Please try again.");
        return;
      }

      // Auth accepted — close dialog and swap the player into generating mode.
      setRegenOpen(false);
      setPodcast(null);
      setSource(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setGenerating(true);
      try {
        if (result.status === "generating") {
          for (let i = 0; i < 60; i++) {
            await new Promise((r) => setTimeout(r, 5000));
            const polled = await fetchPodcast(topicId);
            if (polled && polled.status !== "generating") {
              setPodcast(polled);
              if (polled.status === "ready") setSource("fresh");
              return;
            }
          }
          setPodcast({
            status: "failed",
            error: "Podcast is still generating. Refresh the page in a minute.",
          });
          return;
        }
        setPodcast(result);
        if (result.status === "ready") setSource("fresh");
      } finally {
        setGenerating(false);
      }
    } catch (err) {
      setRegenError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRegenSubmitting(false);
    }
  };

  // Audio element wiring
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, [podcast?.audio_url]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(speed);
    setSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "podcast";

  const handleDownload = async () => {
    if (!podcast?.audio_url) return;
    try {
      const res = await fetch(podcast.audio_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slugify(topicTitle)}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(podcast.audio_url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Checking for podcast…
      </div>
    );
  }

  // Not yet generated, or failed → show CTA
  if (!podcast || podcast.status !== "ready" || !podcast.audio_url) {
    const isFailed = podcast?.status === "failed";
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-3">
          <Headphones className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Listen to this topic
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              An AI-generated, exam-focused podcast based on this topic's content.
              First listener waits ~30–60 seconds; everyone after gets it instantly.
            </p>
            {estimate && (
              <p className="text-xs text-muted-foreground mt-1.5">
                <span className="font-medium text-foreground">Estimated: ~{estimate.minutes} min</span>{" "}
                · ~{estimate.words.toLocaleString()} words
                <span className="text-muted-foreground/70"> (from {estimate.sourceWords.toLocaleString()}-word source)</span>
              </p>
            )}
            {isFailed && podcast?.error && (
              <div className="mt-2 flex items-start gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{podcast.error}</span>
              </div>
            )}
            <Button
              onClick={() => handleGenerate()}
              disabled={generating}
              size="sm"
              className="mt-3"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating podcast…
                </>
              ) : (
                <>
                  <Headphones className="mr-2 h-4 w-4" />
                  {isFailed ? "Try again" : "Generate podcast"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Ready → player
  const totalDuration = duration || podcast.duration_seconds || 0;
  const scriptWords = podcast.script ? podcast.script.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <audio ref={audioRef} src={podcast.audio_url} preload="metadata" />
      <div className="flex items-center gap-3">
        <Headphones className="h-5 w-5 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-sm font-semibold text-foreground truncate">
              Topic podcast
            </h3>
            {source === "cache" && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                title="Playing previously generated audio from cache"
              >
                <Database className="h-2.5 w-2.5" /> Cached
              </span>
            )}
            {source === "fresh" && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
                title="Freshly generated this session"
              >
                <Sparkles className="h-2.5 w-2.5" /> Freshly generated
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Exam-focused tutorial · ~{Math.round(totalDuration / 60)} min
            {scriptWords > 0 && <> · {scriptWords.toLocaleString()} words</>}
          </p>
        </div>
        <Button
          onClick={togglePlay}
          size="icon"
          variant="default"
          className="h-10 w-10 rounded-full shrink-0"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs tabular-nums text-muted-foreground w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[currentTime]}
          max={totalDuration || 100}
          step={0.5}
          onValueChange={seekTo}
          className="flex-1"
          aria-label="Playback position"
        />
        <span className="text-xs tabular-nums text-muted-foreground w-10">
          {formatTime(totalDuration)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Button
          onClick={cycleSpeed}
          size="sm"
          variant="ghost"
          className="text-xs h-8"
          aria-label={`Playback speed ${speed}x`}
        >
          <Gauge className="mr-1.5 h-3.5 w-3.5" />
          {speed}×
        </Button>
        <div className="flex items-center gap-1">
          <Button
            onClick={openRegenDialog}
            size="sm"
            variant="ghost"
            className="text-xs h-8 text-muted-foreground/70 hover:text-foreground"
            aria-label="Regenerate podcast (password required)"
            title="Regenerate (password required)"
            disabled={generating}
          >
            {generating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            onClick={handleDownload}
            size="sm"
            variant="ghost"
            className="text-xs h-8"
            aria-label="Download MP3"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            MP3
          </Button>
          <Button
            onClick={() => setShowScript((s) => !s)}
            size="sm"
            variant="ghost"
            className="text-xs h-8"
          >
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            {showScript ? "Hide transcript" : "Show transcript"}
          </Button>
        </div>
      </div>

      {showScript && podcast.script && (
        <div
          className={cn(
            "mt-3 max-h-72 overflow-y-auto rounded-lg border border-border bg-muted/40 p-3",
            "text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap",
          )}
        >
          {podcast.script}
        </div>
      )}

      <Dialog open={regenOpen} onOpenChange={(o) => !regenSubmitting && setRegenOpen(o)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Lock className="h-4 w-4 text-primary" /> Regenerate podcast
            </DialogTitle>
            <DialogDescription>
              This replaces the cached audio for <span className="font-medium text-foreground">{topicTitle}</span>.
              Owner password required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitRegenerate} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="regen-password" className="text-xs">
                Owner password
              </Label>
              <Input
                id="regen-password"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={regenPassword}
                onChange={(e) => {
                  setRegenPassword(e.target.value);
                  if (regenError) setRegenError(null);
                }}
                disabled={regenSubmitting}
                aria-invalid={!!regenError}
                aria-describedby={regenError ? "regen-error" : undefined}
              />
              {regenError && (
                <p
                  id="regen-error"
                  role="alert"
                  className="flex items-start gap-1.5 text-xs text-destructive"
                >
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>{regenError}</span>
                </p>
              )}
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRegenOpen(false)}
                disabled={regenSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={regenSubmitting || !regenPassword.trim()}>
                {regenSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  "Regenerate"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
