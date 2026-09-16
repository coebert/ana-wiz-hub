import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Headphones,
  ListMusic,
  Loader2,
  Mic,
  Plus,
  Repeat,
  Search,
  SkipBack,
  SkipForward,
  Trash2,
  X,
} from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";
import { podcastVoiceLabel } from "@/lib/podcastVoices";
import {
  addToQueue,
  dedupeQueue,
  episodeKey,
  clearQueue,
  moveInQueue,
  removeFromQueue,
  usePodcastQueue,
} from "@/lib/podcastPlaylist";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Episode {
  /** Stable identity for a (topic, accent) recording. */
  key: string;
  topic_id: string;
  topic_title: string;
  audio_url: string;
  duration_seconds: number | null;
  voice: string | undefined;
  section: Section | null;
  topicPath: string | null;
}

const AUTOPLAY_KEY = "podcasts:playlistAutoplay";

const formatDuration = (s: number | null) => {
  if (!s || s <= 0) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const formatTotal = (seconds: number) => {
  if (seconds <= 0) return "0 min";
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
};

const PodcastPlaylist = () => {
  const queue = usePodcastQueue();
  const { isAdmin } = useAuth();
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [removedDuplicates, setRemovedDuplicates] = useState(0);
  /** Progress of a recording run started for the unrecorded queue entries. */
  const [recording, setRecording] = useState<RerecordJob | null>(null);
  const [recordError, setRecordError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [autoplay, setAutoplay] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(AUTOPLAY_KEY) !== "0";
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(AUTOPLAY_KEY, autoplay ? "1" : "0");
  }, [autoplay]);

  const loadEpisodes = useCallback(async () => {
    const { data, error: err } = await supabase
      .from("podcasts")
      .select("topic_id, topic_title, audio_path, duration_seconds, voice")
      .eq("status", "ready")
      .not("audio_path", "is", null)
      .order("topic_title", { ascending: true });

    if (err) {
      setError(err.message);
      setEpisodes([]);
      return;
    }
    setError(null);
    const resolved: Episode[] = (data ?? []).map((row) => {
      const topic = allTopics.find((t) => t.id === row.topic_id);
      const section = topic?.section ?? null;
      const { data: pub } = supabase.storage
        .from("podcasts")
        .getPublicUrl(row.audio_path as string);
      return {
        key: episodeKey(row.topic_id, row.voice),
        topic_id: row.topic_id,
        topic_title: row.topic_title,
        audio_url: pub.publicUrl,
        duration_seconds: row.duration_seconds ?? null,
        voice: row.voice ?? undefined,
        section,
        topicPath: topic && section ? `${sectionMeta[section].path}/${topic.id}` : null,
      };
    });
    setEpisodes(resolved);
  }, []);

  useEffect(() => {
    void loadEpisodes();
  }, [loadEpisodes]);

  const byId = useMemo(() => {
    const m = new Map<string, Episode>();
    (episodes ?? []).forEach((e) => {
      m.set(e.key, e);
      // Legacy queue entries stored a bare topic id — resolve those to the
      // first (most recently listed) recording for the topic.
      if (!m.has(e.topic_id)) m.set(e.topic_id, e);
    });
    return m;
  }, [episodes]);

  // Automatically prune duplicate queue entries once the episode list is known:
  // two entries can point at the same recording (a legacy bare topic id plus a
  // `topic::voice` key), which exact-string de-duplication cannot catch.
  useEffect(() => {
    if (!episodes || episodes.length === 0) return;
    const removed = dedupeQueue((entry) => byId.get(entry)?.key ?? null);
    if (removed > 0) setRemovedDuplicates((n) => n + removed);
  }, [episodes, byId]);


  /** Queued episodes in queue order; ids without a ready episode are skipped. */
  const queued = useMemo(() => {
    const seen = new Set<string>();
    const list: Episode[] = [];
    for (const id of queue) {
      const e = byId.get(id);
      // A legacy bare-topic entry and a per-accent entry can resolve to the
      // same recording — list it once so playback and reordering stay sane.
      if (!e || seen.has(e.key)) continue;
      seen.add(e.key);
      list.push(e);
    }
    return list;
  }, [queue, byId]);

  /**
   * Queue entries with no recording yet. These are real requests, not dead
   * entries: an admin can commission them straight from here and the finished
   * episodes then appear in the queue and the podcast library.
   */
  const pending = useMemo(() => {
    const seen = new Set<string>();
    const list: PendingRequest[] = [];
    for (const entry of queue) {
      if (byId.has(entry)) continue;
      const { topicId, voice } = parseEpisodeKey(entry);
      const topic = allTopics.find((t) => t.id === topicId && t.available);
      if (!topic) continue;
      const resolvedVoice = voice ?? DEFAULT_PODCAST_VOICE;
      const key = episodeKey(topicId, resolvedVoice);
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({
        entry,
        topicId,
        topicTitle: topic.title,
        topicPath: `${sectionMeta[topic.section].path}/${topic.id}`,
        section: topic.section,
        voice: resolvedVoice,
      });
    }
    return list;
  }, [queue, byId]);

  /** Topics with no recording at all — offer them as queueable requests. */
  const unrecordedTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const recorded = new Set((episodes ?? []).map((e) => e.topic_id));
    const requested = new Set(pending.map((p) => p.topicId));
    return allTopics
      .filter((t) => t.available && !recorded.has(t.id) && !requested.has(t.id))
      .filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          sectionMeta[t.section].label.toLowerCase().includes(q),
      )
      .slice(0, 20);
  }, [episodes, pending, query]);

  /** Commission the unrecorded queue entries on the durable server worker. */
  const startRecording = async () => {
    if (pending.length === 0 || starting) return;
    setStarting(true);
    setRecordError(null);
    try {
      const job = await createRerecordJobForRequests(
        pending.map((p) => ({
          topicId: p.topicId,
          topicTitle: p.topicTitle,
          topicPath: p.topicPath,
          voice: p.voice,
        })),
      );
      setRecording(job);
      await wakeRerecordWorker(job.id);
    } catch (err) {
      setRecordError(err instanceof Error ? err.message : "Could not start recording.");
    } finally {
      setStarting(false);
    }
  };

  // Follow the run: refresh the episode list as items finish so completed
  // recordings drop into the queue (and the library) without a reload.
  useEffect(() => {
    if (!recording) return;
    let cancelled = false;
    const id = window.setInterval(async () => {
      const latest = await fetchJob(recording.id);
      if (cancelled || !latest) return;
      setRecording(latest);
      await loadEpisodes();
      if (latest.status !== "running" || latest.processed >= latest.total) {
        window.clearInterval(id);
      }
    }, 10_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [recording, loadEpisodes]);


  const available = useMemo(() => {
    const list = (episodes ?? []).filter(
      (e) => !queue.includes(e.key) && !queue.includes(e.topic_id),
    );
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((e) => {
      const sectionLabel = e.section ? sectionMeta[e.section].label.toLowerCase() : "";
      return (
        e.topic_title.toLowerCase().includes(q) ||
        e.topic_id.toLowerCase().includes(q) ||
        sectionLabel.includes(q) ||
        podcastVoiceLabel(e.voice).toLowerCase().includes(q)
      );
    });
  }, [episodes, queue, query]);

  const totalSeconds = useMemo(
    () => queued.reduce((sum, e) => sum + (e.duration_seconds ?? 0), 0),
    [queued],
  );

  // Keep the cursor inside the queue as items are added, removed or reordered.
  useEffect(() => {
    if (currentIndex > Math.max(queued.length - 1, 0)) setCurrentIndex(0);
  }, [queued.length, currentIndex]);

  const current = queued[currentIndex] ?? null;

  // Load the selected track and continue playback when skipping/autoplaying.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (el.dataset.trackId === current.key) return;
    el.dataset.trackId = current.key;
    el.load();
    if (shouldPlayRef.current) {
      el.play().catch(() => {
        /* browsers block autoplay until the first user interaction */
      });
    }
  }, [current]);

  const playAt = (index: number) => {
    if (index < 0 || index >= queued.length) return;
    shouldPlayRef.current = true;
    setCurrentIndex(index);
    if (queued[index]?.key === current?.key) {
      audioRef.current?.play().catch(() => {
        /* ignore */
      });
    }
  };

  const handleEnded = () => {
    if (!autoplay) return;
    if (currentIndex < queued.length - 1) playAt(currentIndex + 1);
  };

  return (
    <SectionLayout
      title="Podcast Playlist"
      subtitle="Build a listening queue from your generated podcasts — titles, topics and narrator accents in the order you choose."
      metaDescription="Queue multiple AnaesthesiaCore revision podcasts into one playlist, reorder them, and play them back-to-back with your chosen narrator accent."
      backPath="/podcasts"
      backLabel="Podcast Library"
      disableAutoTOC
    >
      {episodes === null && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading podcasts…
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load podcasts: {error}
        </div>
      )}

      {episodes && episodes.length === 0 && !error && (
        <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          No podcasts have been generated yet. Open any topic, choose a narrator, and click{" "}
          <span className="font-medium text-foreground">Generate podcast</span> — it will then
          appear here.
        </div>
      )}

      {episodes && episodes.length > 0 && (
        <div className="space-y-6">
          {/* Now playing */}
          <section
            aria-labelledby="now-playing-heading"
            className="rounded-lg border border-border bg-card p-3 sm:p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id="now-playing-heading"
                className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-foreground"
              >
                <ListMusic className="h-4 w-4 text-primary shrink-0" />
                Now playing
              </h2>
              <span className="text-xs text-muted-foreground shrink-0">
                {queued.length > 0 ? `${currentIndex + 1} / ${queued.length}` : "Queue empty"}
              </span>
            </div>

            {current ? (
              <>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground break-words">
                    {current.topic_title}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      {current.section ? sectionMeta[current.section].label : "Other"}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span className="inline-flex items-center gap-1">
                      <Mic className="h-3 w-3" aria-hidden="true" />
                      {podcastVoiceLabel(current.voice)}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>{formatDuration(current.duration_seconds)}</span>
                  </p>
                </div>

                <audio
                  ref={audioRef}
                  controls
                  preload="none"
                  className="w-full"
                  src={current.audio_url}
                  onEnded={handleEnded}
                >
                  Your browser does not support audio playback.
                </audio>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => playAt(currentIndex - 1)}
                      disabled={currentIndex <= 0}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <SkipBack className="h-3.5 w-3.5" />
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => playAt(currentIndex + 1)}
                      disabled={currentIndex >= queued.length - 1}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <SkipForward className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Repeat className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                    <Label
                      htmlFor="playlist-autoplay"
                      className="cursor-pointer text-xs text-foreground"
                    >
                      Play queue continuously
                    </Label>
                    <Switch
                      id="playlist-autoplay"
                      checked={autoplay}
                      onCheckedChange={setAutoplay}
                      aria-label="Play the queue continuously"
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add podcasts from the list below to start a queue.
              </p>
            )}
          </section>

          {/* Queue */}
          <section aria-labelledby="queue-heading" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id="queue-heading"
                className="text-base sm:text-lg font-serif font-bold text-foreground"
              >
                Your queue
              </h2>
              {removedDuplicates > 0 && (
                <p
                  role="status"
                  className="w-full order-last text-xs text-muted-foreground"
                >
                  Removed {removedDuplicates} duplicate{" "}
                  {removedDuplicates === 1 ? "episode" : "episodes"} from your queue.
                </p>
              )}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {queued.length} {queued.length === 1 ? "episode" : "episodes"} •{" "}
                  {formatTotal(totalSeconds)}
                </span>
                {queued.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      clearQueue();
                      setCurrentIndex(0);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3" /> Clear queue
                  </button>
                )}
              </div>
            </div>

            {queued.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
                Nothing queued yet.
              </p>
            ) : (
              <ol className="space-y-2">
                {queued.map((e, i) => (
                  <li
                    key={e.key}
                    className={cn(
                      "rounded-lg border bg-card p-3",
                      i === currentIndex ? "border-primary/60 bg-primary/5" : "border-border",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 shrink-0 text-xs font-semibold text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => playAt(i)}
                          className="text-left text-sm font-medium text-foreground hover:text-primary"
                        >
                          {e.topic_title}
                        </button>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <span>{e.section ? sectionMeta[e.section].label : "Other"}</span>
                          <span aria-hidden="true">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Mic className="h-3 w-3" aria-hidden="true" />
                            {podcastVoiceLabel(e.voice)}
                          </span>
                          <span aria-hidden="true">•</span>
                          <span>{formatDuration(e.duration_seconds)}</span>
                          {e.topicPath && (
                            <Link
                              to={e.topicPath}
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              Open topic
                            </Link>
                          )}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveInQueue(queue.includes(e.key) ? e.key : e.topic_id, -1)}
                          disabled={i === 0}
                          aria-label={`Move ${e.topic_title} earlier`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveInQueue(queue.includes(e.key) ? e.key : e.topic_id, 1)}
                          disabled={i === queued.length - 1}
                          aria-label={`Move ${e.topic_title} later`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromQueue(queue.includes(e.key) ? e.key : e.topic_id)}
                          aria-label={`Remove ${e.topic_title} from queue`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Add episodes */}
          <section aria-labelledby="add-heading" className="space-y-3">
            <h2
              id="add-heading"
              className="text-base sm:text-lg font-serif font-bold text-foreground"
            >
              Add podcasts
            </h2>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder="Search by topic, section, or accent…"
                aria-label="Search podcasts to add"
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {available.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
                {query
                  ? `No podcasts match “${query}”.`
                  : "Every available podcast is already in your queue."}
              </p>
            ) : (
              <ul className="space-y-2">
                {available.map((e) => (
                  <li
                    key={e.key}
                    className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Headphones className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="break-words">{e.topic_title}</span>
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span>{e.section ? sectionMeta[e.section].label : "Other"}</span>
                        <span aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1">
                          <Mic className="h-3 w-3" aria-hidden="true" />
                          {podcastVoiceLabel(e.voice)}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>{formatDuration(e.duration_seconds)}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToQueue(e.key)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Plus className="h-3 w-3" />
                      Queue
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </SectionLayout>
  );
};

export default PodcastPlaylist;
