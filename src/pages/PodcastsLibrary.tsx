import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Headphones, ListMusic, Plus, Check, Download, ExternalLink, Loader2, Search, X, ChevronDown, PlayCircle, SkipBack, SkipForward, ListOrdered, ArrowUp, ArrowDown, RotateCcw, Mic, ArrowRight } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { episodeKey, toggleQueued, usePodcastQueue } from "@/lib/podcastPlaylist";
import { podcastVoiceLabel } from "@/lib/podcastVoices";

interface PodcastRow {
  topic_id: string;
  topic_title: string;
  audio_path: string;
  duration_seconds: number | null;
  updated_at: string;
  voice: string | null;
}

interface ResolvedPodcast extends PodcastRow {
  /** Stable identity for a (topic, accent) recording — topics can have several. */
  key: string;
  audio_url: string;
  section: Section | null;
  topicPath: string | null;
}

const AUTOPLAY_KEY = "podcasts:autoplay";
const COLLAPSED_KEY = "podcasts:collapsedSections";
const ORDER_MODE_KEY = "podcasts:orderMode";
const CUSTOM_ORDER_KEY = "podcasts:customOrder";

type OrderMode = "curriculum" | "section" | "custom";

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
  const queue = usePodcastQueue();
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
  const [orderMode, setOrderMode] = useState<OrderMode>(() => {
    if (typeof window === "undefined") return "section";
    const v = localStorage.getItem(ORDER_MODE_KEY);
    return v === "curriculum" || v === "custom" ? v : "section";
  });
  const [customOrder, setCustomOrder] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const v = JSON.parse(localStorage.getItem(CUSTOM_ORDER_KEY) || "[]");
      return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
    } catch {
      return [];
    }
  });
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    localStorage.setItem(AUTOPLAY_KEY, autoplay ? "1" : "0");
  }, [autoplay]);

  useEffect(() => {
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem(ORDER_MODE_KEY, orderMode);
  }, [orderMode]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_ORDER_KEY, JSON.stringify(customOrder));
  }, [customOrder]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("topic_id, topic_title, audio_path, duration_seconds, updated_at, voice")
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
          key: episodeKey(row.topic_id, row.voice),
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
        podcastVoiceLabel(p.voice ?? undefined).toLowerCase().includes(q) ||
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
        items: map.get(k)!.sort(
          (a, b) =>
            a.topic_title.localeCompare(b.topic_title) ||
            podcastVoiceLabel(a.voice ?? undefined).localeCompare(
              podcastVoiceLabel(b.voice ?? undefined),
            ),
        ),
      }));
  }, [filtered]);

  // Curriculum-canonical order: the order in which topics appear in `allTopics`.
  const curriculumIndex = useMemo(() => {
    const m = new Map<string, number>();
    allTopics.forEach((t, i) => m.set(t.id, i));
    return m;
  }, []);

  /**
   * Flat ordered playlist used for prev/next + autoplay. Driven by `orderMode`:
   *  - "section":    sections in SECTION_ORDER, items alpha by title (matches the visible groups)
   *  - "curriculum": follows the canonical order topics appear in `allTopics`
   *  - "custom":     user-defined order (unknown ids fall back to section order at the end)
   */
  const playlist = useMemo(() => {
    if (!filtered) return [] as ResolvedPodcast[];
    if (orderMode === "curriculum") {
      return [...filtered].sort((a, b) => {
        const ai = curriculumIndex.get(a.topic_id) ?? Number.MAX_SAFE_INTEGER;
        const bi = curriculumIndex.get(b.topic_id) ?? Number.MAX_SAFE_INTEGER;
        if (ai !== bi) return ai - bi;
        return (
          a.topic_title.localeCompare(b.topic_title) ||
          podcastVoiceLabel(a.voice ?? undefined).localeCompare(
            podcastVoiceLabel(b.voice ?? undefined),
          )
        );
      });
    }
    if (orderMode === "custom") {
      const byId = new Map(filtered.map((p) => [p.key, p]));
      const ordered: ResolvedPodcast[] = [];
      const seen = new Set<string>();
      for (const id of customOrder) {
        const p = byId.get(id);
        if (p) {
          ordered.push(p);
          seen.add(id);
        }
      }
      // Append any new podcasts not yet in the saved custom order.
      for (const p of filtered) {
        if (!seen.has(p.key)) ordered.push(p);
      }
      return ordered;
    }
    // Default: section order (matches grouped UI).
    if (!grouped) return [] as ResolvedPodcast[];
    return grouped.flatMap((g) => g.items);
  }, [filtered, grouped, orderMode, customOrder, curriculumIndex]);

  const moveCustom = (key: string, delta: number) => {
    // Seed the saved custom order with the current playlist if empty/stale.
    const currentIds = playlist.map((p) => p.key);
    const idx = currentIds.indexOf(key);
    if (idx === -1) return;
    const target = idx + delta;
    if (target < 0 || target >= currentIds.length) return;
    const next = [...currentIds];
    [next[idx], next[target]] = [next[target], next[idx]];
    setCustomOrder(next);
  };

  const resetCustomOrder = () => setCustomOrder([]);

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

  /** Play a specific recording by (topic, accent) key, expanding its section. */
  const playPodcast = (key: string) => {
    const target = playlist.find((p) => p.key === key);
    if (!target) return;

    pauseAllExcept(key);

    // Ensure the section is expanded so the player is mounted.
    const sectionKey = (target.section ?? "_other") as string;
    setCollapsed((prev) => (prev[sectionKey] ? { ...prev, [sectionKey]: false } : prev));

    requestAnimationFrame(() => {
      const el = audioRefs.current.get(key);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.play().catch(() => {
        /* browser may block autoplay until first user interaction */
      });
      setNowPlaying(key);
    });
  };

  const goToOffset = (currentKey: string, offset: number) => {
    const idx = playlist.findIndex((p) => p.key === currentKey);
    if (idx === -1) return;
    const targetIdx = idx + offset;
    if (targetIdx < 0 || targetIdx >= playlist.length) return;
    playPodcast(playlist[targetIdx].key);
  };

  const handleEnded = (key: string) => {
    if (!autoplay) return;
    const idx = playlist.findIndex((p) => p.key === key);
    if (idx === -1 || idx >= playlist.length - 1) return;
    playPodcast(playlist[idx + 1].key);
  };

  const setAudioRef = (key: string) => (el: HTMLAudioElement | null) => {
    if (el) audioRefs.current.set(key, el);
    else audioRefs.current.delete(key);
  };

  const toggleSection = (key: string, open: boolean) => {
    setCollapsed((prev) => ({ ...prev, [key]: !open }));
  };

  const collectionJsonLd = useMemo(() => {
    if (!podcasts || podcasts.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Podcast Library — AnaesthesiaCore",
      url: "https://anaesthesiacore.app/podcasts",
      description:
        "AI-generated FRCA & FFICM revision podcasts for every AnaesthesiaCore topic.",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: podcasts.length,
        itemListElement: podcasts.slice(0, 100).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "PodcastEpisode",
            name: p.topic_title,
            url: p.topicPath
              ? `https://anaesthesiacore.app${p.topicPath}`
              : "https://anaesthesiacore.app/podcasts",
            associatedMedia: {
              "@type": "AudioObject",
              contentUrl: p.audio_url,
              encodingFormat: "audio/mpeg",
              ...(p.duration_seconds
                ? { duration: `PT${Math.round(p.duration_seconds)}S` }
                : {}),
            },
          },
        })),
      },
    };
  }, [podcasts]);

  return (
    <SectionLayout
      title="Podcast Library"
      subtitle="All AI-generated topic podcasts in one place — listen or download without opening the topic page."
      metaDescription="Listen to AI-generated FRCA & FFICM revision podcasts for every AnaesthesiaCore topic — stream or download from a single library page."
      backPath="/"
      backLabel="Home"
      disableAutoTOC
    >
      {collectionJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
        </Helmet>
      )}
      <Link
        to="/viva/library"
        className="group mb-6 flex items-center justify-between gap-3 rounded-lg border border-clinical/30 bg-clinical/5 p-3 sm:p-4 transition-colors hover:border-clinical/60 hover:bg-clinical/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-clinical/15 text-clinical">
            <Mic className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Listen to viva questions with model answers
            </p>
            <p className="text-xs text-muted-foreground">
              Open the Viva Question Library to play full questions and AI-spoken model answers as audio.
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-clinical shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>

      <Link
        to="/podcasts/playlist"
        className="group mb-6 flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3 sm:p-4 transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <ListMusic className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Build a listening playlist{queue.length > 0 ? ` (${queue.length} queued)` : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              Queue several podcasts with their topics and narrator accents, reorder them, and play them back-to-back.
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>

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
                  Plays in your chosen order when one finishes.
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

          <div className="rounded-lg border border-border bg-card px-3 py-2 space-y-2">
            <div className="flex items-center gap-2 min-w-0">
              <ListOrdered className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">Playback order</p>
                <p className="text-xs text-muted-foreground">
                  Controls Previous/Next and which podcast autoplays.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "section", label: "Section order", desc: "Match the groups shown below" },
                  { id: "curriculum", label: "Curriculum order", desc: "Follow the topic order in the syllabus" },
                  { id: "custom", label: "Custom playlist", desc: "Use ↑/↓ on each podcast to reorder" },
                ] as { id: OrderMode; label: string; desc: string }[]
              ).map((opt) => {
                const active = orderMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setOrderMode(opt.id)}
                    title={opt.desc}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/50 text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
              {orderMode === "custom" && customOrder.length > 0 && (
                <button
                  type="button"
                  onClick={resetCustomOrder}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground ml-auto"
                >
                  <RotateCcw className="h-3 w-3" /> Reset to section order
                </button>
              )}
            </div>
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
                        key={p.key}
                        className={cn(
                          "rounded-lg border bg-background p-3 sm:p-4 space-y-3 transition-colors",
                          nowPlaying === p.key ? "border-primary/60" : "border-border"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <Headphones className="h-4 w-4 text-primary shrink-0" />
                              <span className="truncate">{p.topic_title}</span>
                            </div>
                            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <Mic className="h-3 w-3" aria-hidden="true" />
                                {podcastVoiceLabel(p.voice ?? undefined)}
                              </span>
                              <span aria-hidden="true">•</span>
                              <span>{formatDuration(p.duration_seconds)}</span>
                              <span aria-hidden="true">•</span>
                              <span>{new Date(p.updated_at).toLocaleDateString()}</span>
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
                            <button
                              type="button"
                              onClick={() => toggleQueued(p.key)}
                              aria-pressed={queue.includes(p.key)}
                              className={cn(
                                "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                                queue.includes(p.key)
                                  ? "border-primary/60 bg-primary/10 text-primary"
                                  : "border-border bg-card text-foreground hover:bg-muted"
                              )}
                            >
                              {queue.includes(p.key) ? (
                                <>
                                  <Check className="h-3 w-3" /> Queued
                                </>
                              ) : (
                                <>
                                  <Plus className="h-3 w-3" /> Queue
                                </>
                              )}
                            </button>
                            <a
                              href={p.audio_url}
                              download={`${p.key.replace("::", "-")}.mp3`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                              <Download className="h-3 w-3" />
                              MP3
                            </a>
                          </div>
                        </div>
                        {(() => {
                          const playlistIdx = playlist.findIndex((x) => x.key === p.key);
                          const hasPrev = playlistIdx > 0;
                          const hasNext = playlistIdx >= 0 && playlistIdx < playlist.length - 1;
                          return (
                            <div className="space-y-2">
                              <audio
                                ref={setAudioRef(p.key)}
                                controls
                                preload="none"
                                className="w-full"
                                src={p.audio_url}
                                onPlay={() => setNowPlaying(p.key)}
                                onEnded={() => handleEnded(p.key)}
                              >
                                Your browser does not support audio playback.
                              </audio>
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => goToOffset(p.key, -1)}
                                  disabled={!hasPrev}
                                  aria-label="Previous podcast"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                  <SkipBack className="h-3.5 w-3.5" />
                                  Previous
                                </button>
                                <div className="flex items-center gap-1.5">
                                  {orderMode === "custom" && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => moveCustom(p.key, -1)}
                                        disabled={!hasPrev}
                                        aria-label="Move earlier in playlist"
                                        className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                      >
                                        <ArrowUp className="h-3 w-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => moveCustom(p.key, 1)}
                                        disabled={!hasNext}
                                        aria-label="Move later in playlist"
                                        className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                      >
                                        <ArrowDown className="h-3 w-3" />
                                      </button>
                                    </>
                                  )}
                                  <span className="text-[11px] text-muted-foreground">
                                    {playlistIdx >= 0 ? `${playlistIdx + 1} / ${playlist.length}` : ""}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => goToOffset(p.key, 1)}
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
