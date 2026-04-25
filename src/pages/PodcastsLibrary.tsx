import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Headphones, Download, ExternalLink, Loader2, Search, X, ChevronDown, PlayCircle, SkipBack, SkipForward, ListOrdered, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { SectionLayout } from "@/components/SectionLayout";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PodcastRow {
  topic_id: string;
  topic_title: string;
  audio_path: string;
  duration_seconds: number | null;
  updated_at: string;
}

interface ResolvedPodcast extends PodcastRow {
  audio_url: string;
  section: Section | null;
  topicPath: string | null;
}

const AUTOPLAY_KEY = "podcasts:autoplay";
const COLLAPSED_KEY = "podcasts:collapsedSections";

const formatDuration = (s: number | null) => {
  if (!s || s <= 0) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const SECTION_ORDER: (Section | "_other")[] = [
  "physics",
  "physiology",
  "pharmacology",
  "anatomy",
  "clinical",
  "intensive-care",
  "perioperative",
  "chemistry",
  "_other",
];

const PodcastsLibrary = () => {
  const [podcasts, setPodcasts] = useState<ResolvedPodcast[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [autoplay, setAutoplay] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTOPLAY_KEY) === "1";
  });
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(COLLAPSED_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    localStorage.setItem(AUTOPLAY_KEY, autoplay ? "1" : "0");
  }, [autoplay]);

  useEffect(() => {
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("topic_id, topic_title, audio_path, duration_seconds, updated_at")
        .eq("status", "ready")
        .not("audio_path", "is", null)
        .order("updated_at", { ascending: false });

      if (cancelled) return;
      if (error) {
        setError(error.message);
        setPodcasts([]);
        return;
      }

      const resolved: ResolvedPodcast[] = (data ?? []).map((row) => {
        const topic = allTopics.find((t) => t.id === row.topic_id);
        const section = topic?.section ?? null;
        const topicPath = topic && section ? `${sectionMeta[section].path}/${topic.id}` : null;
        const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(row.audio_path!);
        return {
          ...(row as PodcastRow),
          audio_url: pub.publicUrl,
          section,
          topicPath,
        };
      });
      setPodcasts(resolved);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!podcasts) return null;
    const q = query.trim().toLowerCase();
    if (!q) return podcasts;
    return podcasts.filter((p) => {
      const sectionLabel = p.section ? sectionMeta[p.section].label.toLowerCase() : "";
      return (
        p.topic_title.toLowerCase().includes(q) ||
        p.topic_id.toLowerCase().includes(q) ||
        sectionLabel.includes(q)
      );
    });
  }, [podcasts, query]);

  const grouped = useMemo(() => {
    if (!filtered) return null;
    const map = new Map<Section | "_other", ResolvedPodcast[]>();
    for (const p of filtered) {
      const key = p.section ?? "_other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return SECTION_ORDER
      .filter((k) => map.has(k))
      .map((k) => ({
        key: k,
        items: map.get(k)!.sort((a, b) => a.topic_title.localeCompare(b.topic_title)),
      }));
  }, [filtered]);

  // Flat ordered playlist mirrors the grouped section order so "next" is predictable.
  const playlist = useMemo(() => {
    if (!grouped) return [] as ResolvedPodcast[];
    return grouped.flatMap((g) => g.items);
  }, [grouped]);

  /**
   * Pause every audio element except the optional `keepId`.
   * Used so manual skip / autoplay can't leave two players running.
   */
  const pauseAllExcept = (keepId: string | null) => {
    audioRefs.current.forEach((el, id) => {
      if (id !== keepId) {
        try {
          el.pause();
        } catch {
          /* ignore */
        }
      }
    });
  };

  /** Play a specific podcast by topic id, expanding its section + scrolling into view. */
  const playPodcast = (topicId: string) => {
    const target = playlist.find((p) => p.topic_id === topicId);
    if (!target) return;

    pauseAllExcept(topicId);

    // Ensure the section is expanded so the player is mounted.
    const sectionKey = (target.section ?? "_other") as string;
    setCollapsed((prev) => (prev[sectionKey] ? { ...prev, [sectionKey]: false } : prev));

    requestAnimationFrame(() => {
      const el = audioRefs.current.get(topicId);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.play().catch(() => {
        /* browser may block autoplay until first user interaction */
      });
      setNowPlaying(topicId);
    });
  };

  const goToOffset = (currentTopicId: string, offset: number) => {
    const idx = playlist.findIndex((p) => p.topic_id === currentTopicId);
    if (idx === -1) return;
    const targetIdx = idx + offset;
    if (targetIdx < 0 || targetIdx >= playlist.length) return;
    playPodcast(playlist[targetIdx].topic_id);
  };

  const handleEnded = (topicId: string) => {
    if (!autoplay) return;
    const idx = playlist.findIndex((p) => p.topic_id === topicId);
    if (idx === -1 || idx >= playlist.length - 1) return;
    playPodcast(playlist[idx + 1].topic_id);
  };

  const setAudioRef = (topicId: string) => (el: HTMLAudioElement | null) => {
    if (el) audioRefs.current.set(topicId, el);
    else audioRefs.current.delete(topicId);
  };

  const toggleSection = (key: string, open: boolean) => {
    setCollapsed((prev) => ({ ...prev, [key]: !open }));
  };

  return (
    <SectionLayout
      title="Podcast Library"
      subtitle="All AI-generated topic podcasts in one place — listen or download without opening the topic page."
      backPath="/"
      backLabel="Home"
      disableAutoTOC
    >
      {podcasts && podcasts.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search podcasts by topic, keyword, or section…"
              aria-label="Search podcasts"
              className="w-full rounded-lg border border-border bg-card pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <PlayCircle className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0">
                <Label htmlFor="autoplay-toggle" className="text-sm font-medium text-foreground cursor-pointer">
                  Autoplay next podcast
                </Label>
                <p className="text-xs text-muted-foreground truncate">
                  When one finishes, the next in order starts automatically.
                </p>
              </div>
            </div>
            <Switch
              id="autoplay-toggle"
              checked={autoplay}
              onCheckedChange={setAutoplay}
              aria-label="Toggle autoplay"
            />
          </div>
        </div>
      )}

      {podcasts === null && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading podcasts…
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load podcasts: {error}
        </div>
      )}

      {podcasts && podcasts.length === 0 && !error && (
        <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          No podcasts have been generated yet. Open any topic and click{" "}
          <span className="font-medium text-foreground">Generate podcast</span> to create one.
        </div>
      )}

      {grouped && grouped.length === 0 && podcasts && podcasts.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          No podcasts match “{query}”.
        </div>
      )}

      {grouped && grouped.length > 0 && (
        <div className="space-y-4">
          {grouped.map(({ key, items }) => {
            const label = key === "_other" ? "Other" : sectionMeta[key as Section].label;
            const sectionKey = key as string;
            const isOpen = !collapsed[sectionKey];
            return (
              <Collapsible
                key={sectionKey}
                open={isOpen}
                onOpenChange={(open) => toggleSection(sectionKey, open)}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform shrink-0",
                        !isOpen && "-rotate-90"
                      )}
                    />
                    <h2 className="text-base sm:text-lg font-serif font-bold text-foreground truncate">
                      {label}
                    </h2>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {items.length} {items.length === 1 ? "podcast" : "podcasts"}
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <ul className="space-y-3 px-3 sm:px-4 pb-4 pt-1">
                    {items.map((p) => (
                      <li
                        key={p.topic_id}
                        className={cn(
                          "rounded-lg border bg-background p-3 sm:p-4 space-y-3 transition-colors",
                          nowPlaying === p.topic_id ? "border-primary/60" : "border-border"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <Headphones className="h-4 w-4 text-primary shrink-0" />
                              <span className="truncate">{p.topic_title}</span>
                            </div>
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {formatDuration(p.duration_seconds)} •{" "}
                              {new Date(p.updated_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {p.topicPath && (
                              <Link
                                to={p.topicPath}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Open topic
                              </Link>
                            )}
                            <a
                              href={p.audio_url}
                              download={`${p.topic_id}.mp3`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                              <Download className="h-3 w-3" />
                              MP3
                            </a>
                          </div>
                        </div>
                        {(() => {
                          const playlistIdx = playlist.findIndex((x) => x.topic_id === p.topic_id);
                          const hasPrev = playlistIdx > 0;
                          const hasNext = playlistIdx >= 0 && playlistIdx < playlist.length - 1;
                          return (
                            <div className="space-y-2">
                              <audio
                                ref={setAudioRef(p.topic_id)}
                                controls
                                preload="none"
                                className="w-full"
                                src={p.audio_url}
                                onPlay={() => setNowPlaying(p.topic_id)}
                                onEnded={() => handleEnded(p.topic_id)}
                              >
                                Your browser does not support audio playback.
                              </audio>
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => goToOffset(p.topic_id, -1)}
                                  disabled={!hasPrev}
                                  aria-label="Previous podcast"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                  <SkipBack className="h-3.5 w-3.5" />
                                  Previous
                                </button>
                                <span className="text-[11px] text-muted-foreground">
                                  {playlistIdx >= 0 ? `${playlistIdx + 1} / ${playlist.length}` : ""}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => goToOffset(p.topic_id, 1)}
                                  disabled={!hasNext}
                                  aria-label="Next podcast"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                  Next
                                  <SkipForward className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      )}
    </SectionLayout>
  );
};

export default PodcastsLibrary;
