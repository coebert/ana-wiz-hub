import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, FileArchive, Loader2, Search, X } from "lucide-react";
import { Zip, ZipPassThrough } from "fflate";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";
import { episodeKey } from "@/lib/podcastPlaylist";
import { podcastVoiceLabel } from "@/lib/podcastVoices";

interface Ep {
  key: string;
  topic_id: string;
  title: string;
  voice: string | null;
  voiceLabel: string;
  url: string;
  duration: number | null;
  sectionLabel: string;
}

/** Split ZIPs so a single browser download never has to hold too much in memory. */
const MAX_ZIP_BYTES = 400 * 1024 * 1024;
const EST_BYTES_PER_SEC = 16000; // ~128 kbps MP3

const fmtMin = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return h ? `${h} h ${m} min` : `${m} min`;
};
const fmtMB = (b: number) => (b >= 1e9 ? `${(b / 1e9).toFixed(1)} GB` : `${Math.round(b / 1e6)} MB`);
const fileName = (e: Ep) =>
  `${e.title.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-") || e.topic_id}-${e.voice ?? "default"}.mp3`;

const save = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
};

export default function PodcastDownloads() {
  const [eps, setEps] = useState<Ep[] | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [format, setFormat] = useState<"zip" | "files">("zip");
  const [progress, setProgress] = useState<{ done: number; total: number; label: string } | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const cancel = useRef(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("podcasts")
        .select("topic_id, topic_title, audio_path, duration_seconds, voice")
        .eq("status", "ready")
        .not("audio_path", "is", null)
        .order("topic_title");
      setEps(
        (data ?? []).map((r) => {
          const t = allTopics.find((x) => x.id === r.topic_id);
          return {
            key: episodeKey(r.topic_id, r.voice),
            topic_id: r.topic_id,
            title: r.topic_title,
            voice: r.voice,
            voiceLabel: podcastVoiceLabel(r.voice ?? undefined),
            url: supabase.storage.from("podcasts").getPublicUrl(r.audio_path!).data.publicUrl,
            duration: r.duration_seconds,
            sectionLabel: t?.section ? sectionMeta[t.section as Section].label : "Other",
          };
        }),
      );
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (eps ?? []).filter(
      (e) => !q || e.title.toLowerCase().includes(q) || e.voiceLabel.toLowerCase().includes(q),
    );
  }, [eps, query]);

  const groups = useMemo(() => {
    const m = new Map<string, Ep[]>();
    filtered.forEach((e) => m.set(e.sectionLabel, [...(m.get(e.sectionLabel) ?? []), e]));
    return [...m.entries()];
  }, [filtered]);

  const chosen = (eps ?? []).filter((e) => selected.has(e.key));
  const totalSec = chosen.reduce((s, e) => s + (e.duration ?? 0), 0);
  const estBytes = totalSec * EST_BYTES_PER_SEC;

  const toggle = (keys: string[], on: boolean) =>
    setSelected((prev) => {
      const n = new Set(prev);
      keys.forEach((k) => (on ? n.add(k) : n.delete(k)));
      return n;
    });

  const downloadFiles = async () => {
    let failed = 0;
    for (let i = 0; i < chosen.length && !cancel.current; i++) {
      setProgress({ done: i, total: chosen.length, label: chosen[i].title });
      try {
        const r = await fetch(chosen[i].url);
        if (!r.ok) throw new Error();
        save(await r.blob(), fileName(chosen[i]));
      } catch {
        failed++;
      }
      await new Promise((res) => setTimeout(res, 400));
    }
    return failed;
  };

  const downloadZip = async () => {
    let failed = 0;
    let part = 1;
    let parts: Uint8Array[] = [];
    let size = 0;
    let zip: Zip | null = null;
    let finished: Promise<void> | null = null;
    const multi = estBytes > MAX_ZIP_BYTES;

    const open = () => {
      parts = [];
      size = 0;
      let resolve!: () => void;
      finished = new Promise((r) => (resolve = r));
      zip = new Zip((err, chunk, final) => {
        if (err) throw err;
        parts.push(chunk);
        if (final) resolve();
      });
    };
    const close = async () => {
      if (!zip) return;
      zip.end();
      await finished;
      save(
        new Blob(parts as BlobPart[], { type: "application/zip" }),
        multi ? `anaesthesiacore-podcasts-part-${part}.zip` : "anaesthesiacore-podcasts.zip",
      );
      part++;
      zip = null;
    };

    open();
    for (let i = 0; i < chosen.length && !cancel.current; i++) {
      const e = chosen[i];
      setProgress({ done: i, total: chosen.length, label: e.title });
      try {
        const r = await fetch(e.url);
        if (!r.ok) throw new Error();
        const buf = new Uint8Array(await r.arrayBuffer());
        if (size > 0 && size + buf.length > MAX_ZIP_BYTES) {
          await close();
          open();
        }
        const f = new ZipPassThrough(`${e.sectionLabel}/${fileName(e)}`);
        zip!.add(f);
        f.push(buf, true);
        size += buf.length;
      } catch {
        failed++;
      }
    }
    if (!cancel.current && size > 0) await close();
    return failed;
  };

  const start = async () => {
    cancel.current = false;
    setNote(null);
    const failed = format === "zip" ? await downloadZip() : await downloadFiles();
    setProgress(null);
    setNote(
      cancel.current
        ? "Download cancelled."
        : failed
          ? `Finished — ${failed} episode(s) couldn't be downloaded.`
          : format === "zip"
            ? "Finished — your ZIP download has started."
            : "Finished. If only one file appeared, allow multiple downloads for this site in your browser.",
    );
  };

  return (
    <SectionLayout
      title="Download Podcasts"
      subtitle="Pick the episodes you want and download them as a single ZIP or as separate MP3 files for offline listening."
      metaDescription="Download AnaesthesiaCore FRCA and FFICM revision podcasts in bulk — select episodes and save them as a ZIP or individual MP3 files."
      backPath="/podcasts"
      backLabel="Podcast Library"
      disableAutoTOC
    >
      <Link to="/podcasts" className="mb-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to the podcast library
      </Link>

      <div className="sticky top-16 z-20 mb-4 space-y-3 rounded-lg border border-border bg-card p-3 sm:p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-foreground">
            {chosen.length} selected
            {chosen.length > 0 && (
              <span className="font-normal text-muted-foreground">
                {" "}· {fmtMin(totalSec)} · about {fmtMB(estBytes)}
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={() => toggle(filtered.map((e) => e.key), true)}
            className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
          >
            Select all{query ? " shown" : ""} ({filtered.length})
          </button>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Download format">
          {(
            [
              ["zip", "One ZIP file", FileArchive],
              ["files", "Separate MP3s", Download],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={format === id}
              onClick={() => setFormat(id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                format === id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
          <button
            type="button"
            disabled={!chosen.length || !!progress}
            onClick={start}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {progress ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {progress ? `${progress.done}/${progress.total}` : "Download"}
          </button>
          {progress && (
            <button type="button" onClick={() => (cancel.current = true)} className="text-xs text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          )}
        </div>
        {progress && (
          <div className="space-y-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
            </div>
            <p className="truncate text-xs text-muted-foreground">Fetching: {progress.label}</p>
          </div>
        )}
        {format === "zip" && estBytes > MAX_ZIP_BYTES && !progress && (
          <p className="text-xs text-muted-foreground">
            Large selection — it will be split into several ZIPs of up to {fmtMB(MAX_ZIP_BYTES)} each. Keep this page open until it finishes.
          </p>
        )}
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search episodes or narrators"
          aria-label="Search episodes"
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-9 text-sm"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {eps === null ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading episodes…
        </p>
      ) : (
        <div className="space-y-4">
          {groups.map(([label, items]) => {
            const all = items.every((e) => selected.has(e.key));
            return (
              <section key={label} className="rounded-lg border border-border bg-card">
                <label className="flex cursor-pointer items-center gap-2 border-b border-border px-3 py-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={all}
                    onChange={() => toggle(items.map((e) => e.key), !all)}
                  />
                  <h2 className="font-display text-base font-semibold text-foreground">{label}</h2>
                  <span className="ml-auto text-xs text-muted-foreground">{items.length}</span>
                </label>
                <ul className="divide-y divide-border">
                  {items.map((e) => (
                    <li key={e.key}>
                      <label className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-muted/50">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-primary"
                          checked={selected.has(e.key)}
                          onChange={() => toggle([e.key], !selected.has(e.key))}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-foreground">{e.title}</span>
                          <span className="block text-xs text-muted-foreground">
                            {e.voiceLabel} · {e.duration ? fmtMin(e.duration) : "—"}
                          </span>
                        </span>
                      </label>
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
}
