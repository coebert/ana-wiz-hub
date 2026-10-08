import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Row = { topic_id: string; topic_title: string; topic_url: string | null; severity: string; created_at: string };
type Group = { topic_id: string; title: string; url: string | null; total: number; critical: number; major: number; minor: number; oldest: string };

/** Every open finding across all audit runs, grouped by topic. */
export default function OpenFindingsByTopic() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const load = async () => {
    setRows(null);
    const all: Row[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await supabase
        .from("topic_audit_findings")
        .select("topic_id, topic_title, topic_url, severity, created_at")
        .eq("status", "open")
        .range(from, from + 999);
      if (error || !data) break;
      all.push(...(data as Row[]));
      if (data.length < 1000) break;
    }
    setRows(all);
  };

  useEffect(() => { load(); }, []);

  const groups = useMemo(() => {
    const m = new Map<string, Group>();
    for (const r of rows ?? []) {
      const g = m.get(r.topic_id) ?? { topic_id: r.topic_id, title: r.topic_title, url: r.topic_url, total: 0, critical: 0, major: 0, minor: 0, oldest: r.created_at };
      g.total++;
      if (r.severity === "critical") g.critical++;
      else if (r.severity === "major") g.major++;
      else g.minor++;
      if (r.created_at < g.oldest) g.oldest = r.created_at;
      m.set(r.topic_id, g);
    }
    const q = query.trim().toLowerCase();
    return [...m.values()]
      .filter((g) => !q || g.title.toLowerCase().includes(q) || g.topic_id.includes(q))
      .sort((a, b) => b.critical - a.critical || b.major - a.major || b.total - a.total);
  }, [rows, query]);

  const shown = showAll ? groups : groups.slice(0, 15);
  const pathFor = (g: Group) => {
    if (!g.url) return null;
    try { return new URL(g.url).pathname; } catch { return g.url.startsWith("/") ? g.url : null; }
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base">
          Still open, by topic {rows && <span className="text-muted-foreground font-normal">— {rows.length} findings in {groups.length} topics</span>}
        </CardTitle>
        <Button size="sm" variant="outline" onClick={load}>Refresh</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Filter topics…" value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xs" />
        {!rows ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">No open findings.</p>
        ) : (
          <ul className="divide-y divide-border">
            {shown.map((g) => {
              const path = pathFor(g);
              return (
                <li key={g.topic_id} className="py-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium flex-1 min-w-[12rem]">
                    {path ? <Link to={path} className="hover:underline">{g.title}</Link> : g.title}
                  </span>
                  {g.critical > 0 && <Badge variant="destructive">{g.critical} critical</Badge>}
                  {g.major > 0 && <Badge>{g.major} major</Badge>}
                  {g.minor > 0 && <Badge variant="secondary">{g.minor} minor</Badge>}
                  <span className="text-xs text-muted-foreground w-28 text-right">since {new Date(g.oldest).toLocaleDateString()}</span>
                </li>
              );
            })}
          </ul>
        )}
        {groups.length > 15 && (
          <Button size="sm" variant="ghost" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show fewer" : `Show all ${groups.length} topics`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
