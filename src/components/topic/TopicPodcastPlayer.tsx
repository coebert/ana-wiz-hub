import { useEffect, useMemo, useRef, useState } from "react";
import { Headphones, Loader2, Pause, Play, AlertCircle, FileText, Gauge, Download, RefreshCw, Database, Sparkles, Lock, Mic } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  fetchRecordedVoices,
  formatExtractionDiagnostics,
  isStaleGenerating,
  type PodcastResult,
} from "@/lib/podcast";
import { useAuth } from "@/hooks/useAuth";
import {
  attachPodcastJob,
  clearPodcastJob,
  getPodcastJob,
  podcastJobElapsedSec,
  startPodcastJob,
  usePodcastJob,
} from "@/lib/podcastJobs";
import {
  ACCENT_GROUPS,
  accentsInGroup,
  DEFAULT_PODCAST_VOICE,
  getPreferredPodcastVoice,
  hasStoredPodcastVoicePreference,
  podcastVoiceLabel,
  setPreferredPodcastVoice,
} from "@/lib/podcastVoices";
import { hasNativeVoice } from "@/lib/podcastNativeVoices";
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

interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
}

/**
 * Split a podcast script into timestamped segments. TTS doesn't return
 * word-level timings, so we estimate each segment's start time by its
 * proportional character offset within the full script — accurate to a
 * few seconds for typical spoken pacing.
 */
const buildTranscriptSegments = (
  script: string,
  totalDuration: number,
): TranscriptSegment[] => {
  const clean = script.trim();
  if (!clean || !Number.isFinite(totalDuration) || totalDuration <= 0) return [];

  // Prefer paragraph breaks; fall back to sentence splits for long single blocks.
  let chunks = clean.split(/\n{2,}/).map((c) => c.trim()).filter(Boolean);
  if (chunks.length < 4) {
    chunks = clean
      .split(/(?<=[.!?])\s+(?=[A-Z0-9"“'])/)
      .map((c) => c.trim())
      .filter(Boolean);
  }
  // Group short sentences so segments feel like paragraphs (~2-3 sentences).
  const grouped: string[] = [];
  let buf = "";
  for (const c of chunks) {
    buf = buf ? `${buf} ${c}` : c;
    if (buf.length >= 220) {
      grouped.push(buf);
      buf = "";
    }
  }
  if (buf) grouped.push(buf);

  const totalChars = grouped.reduce((n, c) => n + c.length, 0) || 1;
  let acc = 0;
  return grouped.map((text, i) => {
    const start = (acc / totalChars) * totalDuration;
    acc += text.length;
    const end =
      i === grouped.length - 1
        ? totalDuration
        : (acc / totalChars) * totalDuration;
    return { text, start, end };
  });
};

export const TopicPodcastPlayer = ({ topicId, topicTitle }: TopicPodcastPlayerProps) => {
  const [podcast, setPodcast] = useState<PodcastResult | null>(null);
  const [loading, setLoading] = useState(true);
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
  // Narrator/accent choice. Starts from the listener's saved preference
  // (shared across topics); each accent has its own cached episode server-side.
  const [voiceId, setVoiceId] = useState<string>(() => getPreferredPodcastVoice());
  const voicePinned = useRef(true);
  // Only admins may commission new recordings; listeners pick from accents
  // that already exist for this topic.
  const { isAdmin } = useAuth();
  const [recordedVoices, setRecordedVoices] = useState<string[]>([]);

  // Generation runs in a module-level registry (src/lib/podcastJobs.ts) so it
  // keeps going after the user navigates away from this topic page.
  const job = usePodcastJob(topicId);
  const generating = job?.status === "generating";
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!generating) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [generating]);

  const progress = generating && job
    ? { elapsedSec: podcastJobElapsedSec(job), lastStatus: job.lastStatus }
    : null;

  // Adopt a finished job's result (it may have completed while the user was
  // on another page, or in this session before the component remounted).
  useEffect(() => {
    if (!job || job.status === "generating" || !job.result) return;
    setPodcast(job.result);
    setSource(
      job.result.status === "ready"
        ? job.ownedBySession && !job.result.cached
          ? "fresh"
          : "cache"
        : null,
    );
    setLoading(false);
  }, [job]);

  // Estimate target length from page content once we know there's no cached podcast.
  useEffect(() => {
    if (loading || (podcast && podcast.status === "ready")) return;
    // Defer to next tick so topic DOM is fully rendered.
    const t = setTimeout(() => {
      const { content } = extractTopicContent();
      if (content && content.length > 50) setEstimate(estimatePodcastTarget(content));
    }, 0);
    return () => clearTimeout(t);
  }, [loading, podcast, topicId]);

  // Initial fetch — see if a cached podcast already exists. If a generation
  // is already in flight (e.g. kicked off in another tab, or still running in
  // the background after a previous tab closed), attach to it so the shared
  // registry keeps polling instead of offering a fresh "Generate" button.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      // A live job for this topic already owns the state — nothing to fetch.
      if (getPodcastJob(topicId)?.status === "generating") {
        setLoading(false);
        return;
      }
      setLoading(true);
      // Which accents actually exist for this topic decides what listeners
      // can choose from.
      const recorded = await fetchRecordedVoices(topicId);
      if (cancelled) return;
      setRecordedVoices(recorded);
      // Which accent to open with:
      //  1. the listener's own saved choice, when this topic has it recorded;
      //  2. otherwise a real regional recording (native-voice accent), so the
      //     genuine regional narration is heard rather than the legacy
      //     default synthetic narration;
      //  3. otherwise whatever recording exists.
      const savedChoice = hasStoredPodcastVoicePreference();
      const nativeRecorded = recorded.find((v) => hasNativeVoice(v));
      const preferred =
        savedChoice && recorded.includes(voiceId)
          ? voiceId
          : recorded.includes(voiceId) && !nativeRecorded
            ? voiceId
            : (nativeRecorded ?? recorded[0] ?? voiceId);
      if (preferred !== voiceId) {
        voicePinned.current = true;
        setVoiceId(preferred);
      }
      const existing = await fetchPodcast(topicId, preferred);
      if (cancelled) return;
      // Stale recovery: if the row is stuck in `generating` but hasn't been
      // updated in several minutes, the background job is dead. Surface it
      // as a failed result so the user gets a clear retry path instead of
      // an indefinite spinner. The server-side reclaim guard (3 min) will
      // accept the next non-force invocation.
      if (existing && isStaleGenerating(existing)) {
        setPodcast({
          status: "failed",
          error:
            "Previous podcast generation appears stalled. Click retry to start a new one.",
        });
        setLoading(false);
        return;
      }

      setPodcast(existing);
      if (existing?.voice && !voicePinned.current) setVoiceId(existing.voice);
      if (existing && existing.status === "ready") setSource("cache");
      setLoading(false);

      // Attach to an in-flight (still-fresh) generation started elsewhere.
      if (existing && existing.status === "generating") {
        void attachPodcastJob(topicId, topicTitle, window.location.pathname, preferred);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [topicId, topicTitle]);

  const handleGenerate = async (opts?: { force?: boolean; regeneratePassword?: string }) => {
    const { content, diagnostics } = extractTopicContent();
    if (!content || content.length < diagnostics.minChars) {
      setPodcast({
        status: "failed",
        error:
          `Could not extract topic content from the page.\n\n` +
          formatExtractionDiagnostics(diagnostics),
      });
      return;
    }
    clearPodcastJob(topicId);
    // Fire and forget: the registry owns the run, so leaving this page (or
    // unmounting this component) no longer cancels it.
    void startPodcastJob({
      topicId,
      topicTitle,
      topicPath: window.location.pathname,
      content,
      force: opts?.force,
      regeneratePassword: opts?.regeneratePassword,
      voiceId,
    });
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
      const { content, diagnostics } = extractTopicContent();
      if (!content || content.length < diagnostics.minChars) {
        setRegenError(
          `Could not extract topic content from the page.\n\n` +
            formatExtractionDiagnostics(diagnostics),
        );
        return;
      }

      clearPodcastJob(topicId);
      // Kick the run off in the global registry so it survives navigation.
      const started = startPodcastJob({
        topicId,
        topicTitle,
        topicPath: window.location.pathname,
        content,
        force: true,
        regeneratePassword: pw,
        voiceId,
      });

      // Give the server a moment to reject a bad password before we swap the
      // player into generating mode. If the row flips to `generating`, auth
      // was accepted and we can close the dialog and let the job run on.
      const settled = await Promise.race([
        started,
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
      ]);

      if (settled && settled.status === "failed" && isInvalidPasswordError(settled.error)) {
        clearPodcastJob(topicId);
        setRegenError("Invalid password. Please try again.");
        return;
      }
      if (settled && settled.status === "failed") {
        clearPodcastJob(topicId);
        setRegenError(settled.error || "Regeneration failed. Please try again.");
        return;
      }
      // Nothing in this topic has changed since the existing recording in this
      // voice, so we kept it rather than spending credits on an identical one.
      if (settled?.unchanged) {
        clearPodcastJob(topicId);
        setPodcast(settled);
        setRegenError(
          "This topic hasn't changed since it was last recorded in this voice, so the existing recording was kept and no credits were used.",
        );
        return;
      }

      // Accepted (or still running) — close the dialog and let the registry
      // drive the player. Reset playback of the old audio.
      setRegenOpen(false);
      setPodcast(null);
      setSource(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
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

  const seekToSeconds = (t: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(t, audio.duration || t));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
    if (audio.paused) {
      audio.play().catch(() => {/* ignore autoplay rejection */});
      setIsPlaying(true);
    }
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

  // Hooks must run on every render — keep them above any early returns.
  const transcriptSegments = useMemo(() => {
    if (!podcast || podcast.status !== "ready" || !podcast.script) return [];
    const total = duration || podcast.duration_seconds || 0;
    return buildTranscriptSegments(podcast.script, total);
  }, [podcast, duration]);
  const activeSegmentIdx = useMemo(() => {
    if (!transcriptSegments.length) return -1;
    for (let i = transcriptSegments.length - 1; i >= 0; i--) {
      if (currentTime >= transcriptSegments[i].start - 0.25) return i;
    }
    return 0;
  }, [transcriptSegments, currentTime]);

  const onVoiceChange = (next: string) => {
    voicePinned.current = true;
    setVoiceId(next);
    setPreferredPodcastVoice(next);
    // If this accent is already recorded for the topic, switch to it straight
    // away — no re-generation, no cost. Otherwise the player keeps the current
    // audio and offers a "Listen in this voice" button.
    void (async () => {
      const cached = await fetchPodcast(topicId, next);
      if (cached?.status === "ready") {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setPodcast(cached);
        setSource("cache");
      } else if (cached?.status === "generating" && !isStaleGenerating(cached)) {
        void attachPodcastJob(topicId, topicTitle, window.location.pathname, next);
      }
    })();
  };

  // Listeners see only the accents already recorded for this topic. Admins keep
  // the full bank so they can commission a new accent.
  const voicePicker = isAdmin ? (
    <div className="flex flex-wrap items-center gap-2">
      <Mic className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      <label className="text-xs text-muted-foreground" htmlFor={`podcast-voice-${topicId}`}>
        Narrator
      </label>
      <Select value={voiceId} onValueChange={onVoiceChange} disabled={generating}>
        <SelectTrigger
          id={`podcast-voice-${topicId}`}
          className="h-8 w-[15rem] max-w-full text-xs"
          aria-label="Podcast narrator voice and accent"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[60vh]">
          {ACCENT_GROUPS.map((group) => (
            <SelectGroup key={group}>
              <SelectLabel className="text-[0.7rem] uppercase tracking-wide">{group}</SelectLabel>
              {accentsInGroup(group).map((v) => (
                <SelectItem key={v.id} value={v.id} className="text-xs">
                  <span className="font-medium">{v.label}</span>
                  <span className="text-muted-foreground"> — {v.description}</span>
                  {recordedVoices.includes(v.id) && (
                    <span className="ml-1 text-[0.65rem] uppercase tracking-wide text-primary">
                      recorded
                    </span>
                  )}
                  {!recordedVoices.includes(v.id) && hasNativeVoice(v.id) && (
                    <span className="ml-1 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      native voice
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : recordedVoices.length > 1 ? (
    <div className="flex flex-wrap items-center gap-2">
      <Mic className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      <label className="text-xs text-muted-foreground" htmlFor={`podcast-voice-${topicId}`}>
        Narrator
      </label>
      <Select value={voiceId} onValueChange={onVoiceChange}>
        <SelectTrigger
          id={`podcast-voice-${topicId}`}
          className="h-8 w-[15rem] max-w-full text-xs"
          aria-label="Podcast narrator voice and accent"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[60vh]">
          {recordedVoices.map((v) => (
            <SelectItem key={v} value={v} className="text-xs">
              {podcastVoiceLabel(v)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : null;

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Checking for podcast…
      </div>
    );
  }

  // Nothing recorded yet and the visitor cannot commission recordings.
  if ((!podcast || podcast.status !== "ready" || !podcast.audio_url) && !isAdmin) {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-3">
          <Headphones className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground">
              Listen to this topic
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {podcast?.status === "generating"
                ? "A recording for this topic is being prepared — check back shortly."
                : "No audio recording has been made for this topic yet. Recordings are added by the editorial team."}
            </p>
          </div>
        </div>
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
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">
                  {podcast.error}
                </pre>
              </div>
            )}
            <div className="mt-3">{voicePicker}</div>
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
            {generating && progress && (
              <div
                className="mt-3 rounded-md border border-border bg-muted/40 p-2.5 text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span className="font-medium text-foreground">
                    Generating podcast…
                  </span>
                  <span className="tabular-nums">
                    {formatTime(progress.elapsedSec)} elapsed
                  </span>
                </div>
                <div className="mt-1.5 pl-5.5">
                  Status:{" "}
                  <span className="font-medium text-foreground">
                    {progress.lastStatus === "generating"
                      ? "Synthesising audio on the server"
                      : progress.lastStatus === "pending"
                      ? "Queued"
                      : "Waiting for first update…"}
                  </span>
                  {estimate && (
                    <>
                      {" · target ~"}
                      {estimate.minutes} min
                    </>
                  )}
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all"
                    style={{
                      // Soft indeterminate-ish bar: ramps up against an
                      // expected ~4-minute generation, capped at 95% until
                      // the row reports terminal.
                      width: `${Math.min(95, Math.round((progress.elapsedSec / 240) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            )}
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
          {isAdmin && (
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
          )}
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        {voicePicker}
        {isAdmin && (podcast.voice ?? DEFAULT_PODCAST_VOICE) !== voiceId ? (
          <Button onClick={() => handleGenerate()} size="sm" variant="outline" className="h-8 text-xs" disabled={generating}>
            {generating ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Re-recording…
              </>
            ) : (
              <>
                <Mic className="mr-1.5 h-3.5 w-3.5" />
                Listen in this voice
              </>
            )}
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">
            Narrated in {podcastVoiceLabel(podcast.voice ?? DEFAULT_PODCAST_VOICE)}
          </span>
        )}
      </div>

      {showScript && podcast.script && (
        transcriptSegments.length > 0 ? (
          <div
            className={cn(
              "mt-3 max-h-72 overflow-y-auto rounded-lg border border-border bg-muted/40 p-2",
              "text-sm leading-relaxed text-foreground/85",
            )}
            aria-label="Podcast transcript with clickable timestamps"
          >
            <ol className="space-y-1">
              {transcriptSegments.map((seg, i) => {
                const isActive = i === activeSegmentIdx;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => seekToSeconds(seg.start)}
                      className={cn(
                        "group flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
                        "hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        isActive && "bg-primary/10 text-foreground",
                      )}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`Jump to ${formatTime(seg.start)}`}
                    >
                      <span
                        className={cn(
                          "shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-background/70 text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {formatTime(seg.start)}
                      </span>
                      <span className="flex-1 whitespace-pre-wrap">{seg.text}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-2 px-2 text-[10px] text-muted-foreground/70">
              Timestamps are estimated from script length — accurate to a few seconds.
            </p>
          </div>
        ) : (
          <div
            className={cn(
              "mt-3 max-h-72 overflow-y-auto rounded-lg border border-border bg-muted/40 p-3",
              "text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap",
            )}
          >
            {podcast.script}
          </div>
        )
      )}

      <Dialog open={regenOpen} onOpenChange={(o) => !regenSubmitting && setRegenOpen(o)}>
        <DialogContent
          className="sm:max-w-sm"
          onEscapeKeyDown={(e) => {
            if (regenSubmitting) e.preventDefault();
          }}
          onPointerDownOutside={(e) => {
            if (regenSubmitting) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            if (regenSubmitting) e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Lock className="h-4 w-4 text-primary" /> Regenerate podcast
            </DialogTitle>
            <DialogDescription>
              This replaces the cached audio for <span className="font-medium text-foreground">{topicTitle}</span>.
              Owner password required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitRegenerate} className="space-y-3" noValidate>
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
                aria-errormessage={regenError ? "regen-error" : undefined}
              />
              <div
                aria-live="polite"
                aria-atomic="true"
                className="min-h-[1rem]"
              >
                {regenError && (
                  <p
                    id="regen-error"
                    role="alert"
                    className="flex items-start gap-1.5 text-xs text-destructive"
                  >
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="whitespace-pre-wrap break-words">{regenError}</span>
                  </p>
                )}
              </div>
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
