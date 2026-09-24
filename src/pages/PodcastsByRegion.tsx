import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Headphones, Search, X, Plus, Check, Globe2, ArrowLeft, ExternalLink } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";
import {
  addToQueue,
  episodeKey,
  findQueueEntry,
  removeFromQueue,
  usePodcastQueue,
} from "@/lib/podcastPlaylist";
import { playTrack, togglePlay, usePodcastPlayer } from "@/lib/podcastPlayer";
import { podcastVoiceLabel, podcastVoiceRegion } from "@/lib/podcastVoices";
import { cn } from "@/lib/utils";

interface Episode {
  key: string;
  topic_id: string;
  topic_title: string;
  audio_url: string;
  duration_seconds: number | null;
  voice: string | null;
  voiceLabel: string;
  region: string;
  section: Section | null;
  sectionLabel: string;
  topicPath: string | null;
}

const formatDuration = (s: number | null) => {
  if (!s || s <= 0) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const totalRuntime = (episodes: Episode[]) => {
  const secs = episodes.reduce((sum, e) => sum + (e.duration_seconds ?? 0), 0);
  if (secs <= 0) return null;
  const h = Math.floor(secs / 3600);
  const m = Math.round((secs % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
};

type SortMode = "region" | "topic" | "longest";

const PodcastsByRegion = () => {
  const queue = usePodcastQueue();
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("all");
  const [section, setSection] = useState<string>("all");
  const [sort, setSort] = useState<SortMode>("region");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error: err } = await supabase
        .from("podcasts")
        .select("topic_id, topic_title, audio_path, duration_seconds, voice, updated_at")
        .eq("status", "ready")
        .not("audio_path", "is", null)
        .order("updated_at", { ascending: false });

      if (cancelled) return;
      if (err) {
        setError(err.message);
        setEpisodes([]);
        return;
      }

      const resolved: Episode[] = (data ?? []).map((row) => {
        const topic = allTopics.find((t) => t.id === row.topic_id);
        const topicSection = topic?.section ?? null;
        const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(row.audio_path!);
        return {
          key: episodeKey(row.topic_id, row.voice),
          topic_id: row.topic_id,
          topic_title: row.topic_title,
          audio_url: pub.publicUrl,
          duration_seconds: row.duration_seconds,
          voice: row.voice,
          voiceLabel: podcastVoiceLabel(row.voice ?? undefined),
          region: podcastVoiceRegion(row.voice ?? undefined),
          section: topicSection,
          sectionLabel: topicSection ? sectionMeta[topicSection].label : "Other",
          topicPath: topic && topicSection ? `${sectionMeta[topicSection].path}/${topic.id}` : null,
        };
      });
      setEpisodes(resolved);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const regions = useMemo(() => {
    if (!episodes) return [];
    const counts = new Map<string, number>();
    episodes.forEach((e) => counts.set(e.region, (counts.get(e.region) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [episodes]);

  const sections = useMemo(() => {
    if (!episodes) return [];
    const counts = new Map<string, number>();
    episodes.forEach((e) => counts.set(e.sectionLabel, (counts.get(e.sectionLabel) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [episodes]);

  const filtered = useMemo(() => {
    if (!episodes) return null;
    const q = query.trim().toLowerCase();
    const list = episodes.filter((e) => {
      if (region !== "all" && e.region !== region) return false;
      if (section !== "all" && e.sectionLabel !== section) return false;
      if (!q) return true;
      return (
        e.topic_title.toLowerCase().includes(q) ||
        e.topic_id.toLowerCase().includes(q) ||
        e.voiceLabel.toLowerCase().includes(q) ||
        e.region.toLowerCase().includes(q) ||
        e.sectionLabel.toLowerCase().includes(q)
      );
    });
    return [...list].sort((a, b) => {
      if (sort === "topic") return a.topic_title.localeCompare(b.topic_title);
      if (sort === "longest") return (b.duration_seconds ?? 0) - (a.duration_seconds ?? 0);
      return (
        a.region.localeCompare(b.region) ||
        a.voiceLabel.localeCompare(b.voiceLabel) ||
        a.topic_title.localeCompare(b.topic_title)
      );
    });
  }, [episodes, query, region, section, sort]);

  const grouped = useMemo(() => {
    if (!filtered) return null;
    if (sort !== "region") return [["All matching episodes", filtered] as const];
    const map = new Map<string, Episode[]>();
    filtered.forEach((e) => {
      const list = map.get(e.region) ?? [];
      list.push(e);
      map.set(e.region, list);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered, sort]);

  const clearFilters = () => {
    setQuery("");
    setRegion("all");
    setSection("all");
  };
  const filtersActive = query.trim() !== "" || region !== "all" || section !== "all";

  const renderEpisode = (e: Episode) => {
    const queued = findQueueEntry(queue, e.key, e.topic_id);
    return (
      <li key={e.key} className="rounded-lg border border-border bg-card p-3 sm:p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm sm:text-base break-words">
              {e.topic_title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                <Globe2 className="h-3 w-3" aria-hidden="true" />
                {e.region}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                {e.voiceLabel}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                {e.sectionLabel}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                {formatDuration(e.duration_seconds)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => (queued ? removeFromQueue(queued) : addToQueue(e.key))}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors",
                queued
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {queued ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {queued ? "Queued" : "Queue"}
            </button>
            {e.topicPath && (
              <Link
                to={e.topicPath}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                Topic <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (player.track?.key === e.key) return togglePlay();
            const toT = (x: Episode) => ({ key: x.key, title: x.topic_title, subtitle: `${x.voiceLabel} • ${formatDuration(x.duration_seconds)}`, src: x.audio_url, topicPath: x.topicPath });
            playTrack(toT(e), (episodes ?? []).map(toT));
          }}
          aria-label={`Play ${e.topic_title} — ${e.voiceLabel}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          {player.track?.key === e.key && player.playing ? (
            <><Pause className="h-4 w-4" /> Pause</>
          ) : (
            <><Play className="h-4 w-4" /> {player.track?.key === e.key ? "Resume" : "Play"}</>
          )}
        </button>
      </li>
    );
  };

  return (
    <SectionLayout
      title="Podcasts by Region"
      subtitle="Browse every recorded episode by narrator region as well as by topic, with the running time of each."
      metaDescription="Browse AnaesthesiaCore revision podcasts by narrator region, topic area and duration — play or queue any recorded episode."
      backPath="/podcasts"
      backLabel="Podcast Library"
      disableAutoTOC
    >
      <Link
        to="/podcasts"
        className="mb-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to the full podcast library
      </Link>

      {error && (
        <p className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          Episodes could not be loaded right now. Please try again shortly.
        </p>
      )}

      {episodes === null && (
        <p className="text-sm text-muted-foreground">Loading episodes…</p>
      )}

      {episodes && episodes.length === 0 && !error && (
        <p className="text-sm text-muted-foreground">
          No recordings yet — episodes appear here once the editorial team records them.
        </p>
      )}

      {episodes && episodes.length > 0 && (
        <>
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by topic, region or accent…"
                aria-label="Search episodes"
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setRegion("all")}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs",
                  region === "all"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                All regions ({episodes.length})
              </button>
              {regions.map(([name, count]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setRegion(name)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    region === name
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {name} ({count})
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs text-muted-foreground" htmlFor="section-filter">
                Topic area
              </label>
              <select
                id="section-filter"
                value={section}
                onChange={(event) => setSection(event.target.value)}
                className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"
              >
                <option value="all">All topic areas</option>
                {sections.map(([name, count]) => (
                  <option key={name} value={name}>
                    {name} ({count})
                  </option>
                ))}
              </select>

              <label className="ml-2 text-xs text-muted-foreground" htmlFor="sort-mode">
                Sort
              </label>
              <select
                id="sort-mode"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"
              >
                <option value="region">Group by region</option>
                <option value="topic">Topic A–Z</option>
                <option value="longest">Longest first</option>
              </select>

              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              <Headphones className="mr-1 inline h-3 w-3" aria-hidden="true" />
              {filtered?.length ?? 0} episode{(filtered?.length ?? 0) === 1 ? "" : "s"}
              {filtered && totalRuntime(filtered) ? ` · ${totalRuntime(filtered)} of listening` : ""}
            </p>
          </div>

          {filtered && filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No episodes match those filters yet. Try a different region or topic area.
            </p>
          )}

          <div className="space-y-6">
            {grouped?.map(([groupName, list]) => (
              <section key={groupName}>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  {groupName}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({list.length}
                    {totalRuntime(list) ? ` · ${totalRuntime(list)}` : ""})
                  </span>
                </h2>
                <ul className="space-y-3">{list.map(renderEpisode)}</ul>
              </section>
            ))}
          </div>
        </>
      )}
    </SectionLayout>
  );
};

export default PodcastsByRegion;
