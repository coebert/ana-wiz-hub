import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MousePointerClick, RefreshCw } from "lucide-react";

interface ClickRow {
  note_slug: string;
  target_path: string;
  target_section: string;
  target_label: string | null;
  clicked_at: string;
}

interface Aggregate {
  target_path: string;
  target_label: string;
  target_section: string;
  clicks: number;
}

const RANGE_DAYS = 30;

/**
 * Admin panel: shows aggregated click-through from the "Jump to related topic"
 * cards on note pages (last 30 days), so we can see which canonical topics
 * notes are actually feeding traffic into.
 */
export const JumpClicksPanel = () => {
  const [rows, setRows] = useState<ClickRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - RANGE_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("note_jump_clicks")
      .select("note_slug,target_path,target_section,target_label,clicked_at")
      .gte("clicked_at", since)
      .order("clicked_at", { ascending: false })
      .limit(5000);
    if (error) setError(error.message);
    setRows((data as ClickRow[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const topTargets = useMemo<Aggregate[]>(() => {
    const map = new Map<string, Aggregate>();
    for (const r of rows) {
      const key = r.target_path;
      const existing = map.get(key);
      if (existing) {
        existing.clicks += 1;
      } else {
        map.set(key, {
          target_path: key,
          target_label: r.target_label ?? key,
          target_section: r.target_section,
          clicks: 1,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.clicks - a.clicks).slice(0, 15);
  }, [rows]);

  const topNotes = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows) map.set(r.note_slug, (map.get(r.note_slug) ?? 0) + 1);
    return Array.from(map.entries())
      .map(([slug, clicks]) => ({ slug, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);
  }, [rows]);

  const maxClicks = topTargets[0]?.clicks ?? 1;

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MousePointerClick className="h-4 w-4 text-pharmacology" aria-hidden />
          <h2 className="text-lg font-semibold text-foreground">
            Notes — “Jump to related topic” clicks
          </h2>
        </div>
        <button
          onClick={() => void load()}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          disabled={loading}
          aria-label="Refresh"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Last {RANGE_DAYS} days · {rows.length} total click{rows.length === 1 ? "" : "s"}
      </p>

      {error && <p className="text-sm text-destructive mb-3">{error}</p>}

      {!loading && rows.length === 0 && (
        <p className="text-sm text-muted-foreground">No clicks recorded yet.</p>
      )}

      {topTargets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Most-clicked topics
            </h3>
            <ul className="space-y-1.5">
              {topTargets.map((t) => (
                <li key={t.target_path} className="text-sm">
                  <a
                    href={t.target_path}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:bg-muted/40 rounded px-2 py-1.5 transition-colors"
                  >
                    <span className="flex-1 min-w-0 truncate font-medium text-foreground">
                      {t.target_label}
                    </span>
                    <span className="tabular-nums text-xs text-muted-foreground w-10 text-right">
                      {t.clicks}
                    </span>
                    <span
                      className="h-1.5 rounded-full bg-pharmacology/60"
                      style={{ width: `${Math.max(8, (t.clicks / maxClicks) * 120)}px` }}
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Top source notes
            </h3>
            <ul className="space-y-1.5">
              {topNotes.map((n) => (
                <li key={n.slug} className="text-sm flex items-center gap-3 px-2 py-1.5">
                  <a
                    href={`/notes/${n.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-0 truncate text-foreground hover:underline"
                  >
                    {n.slug}
                  </a>
                  <span className="tabular-nums text-xs text-muted-foreground">{n.clicks}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default JumpClicksPanel;
