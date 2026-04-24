import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Headphones, Download, ExternalLink, Loader2 } from "lucide-react";
import { SectionLayout } from "@/components/SectionLayout";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";

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

const formatDuration = (s: number | null) => {
  if (!s || s <= 0) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const PodcastsLibrary = () => {
  const [podcasts, setPodcasts] = useState<ResolvedPodcast[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const grouped = useMemo(() => {
    if (!podcasts) return null;
    const map = new Map<Section | "_other", ResolvedPodcast[]>();
    for (const p of podcasts) {
      const key = p.section ?? "_other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    // Order by curriculum section order
    const order: (Section | "_other")[] = [
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
    return order
      .filter((k) => map.has(k))
      .map((k) => ({ key: k, items: map.get(k)!.sort((a, b) => a.topic_title.localeCompare(b.topic_title)) }));
  }, [podcasts]);

  return (
    <SectionLayout
      title="Podcast Library"
      subtitle="All AI-generated topic podcasts in one place — listen or download without opening the topic page."
      backPath="/"
      backLabel="Home"
      disableAutoTOC
    >
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

      {grouped && grouped.length > 0 && (
        <div className="space-y-10">
          {grouped.map(({ key, items }) => {
            const label = key === "_other" ? "Other" : sectionMeta[key as Section].label;
            return (
              <section key={key} className="space-y-4">
                <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
                  <h2 className="text-xl font-serif font-bold text-foreground">{label}</h2>
                  <span className="text-xs text-muted-foreground">
                    {items.length} {items.length === 1 ? "podcast" : "podcasts"}
                  </span>
                </div>

                <ul className="space-y-3">
                  {items.map((p) => (
                    <li
                      key={p.topic_id}
                      className="rounded-lg border border-border bg-card p-4 space-y-3"
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
                      <audio controls preload="none" className="w-full" src={p.audio_url}>
                        Your browser does not support audio playback.
                      </audio>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </SectionLayout>
  );
};

export default PodcastsLibrary;
