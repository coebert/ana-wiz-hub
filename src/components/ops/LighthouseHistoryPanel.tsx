import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, RefreshCw, Smartphone, Monitor, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface LighthouseRun {
  id: string;
  created_at: string;
  url: string;
  commit_sha: string | null;
  branch: string | null;
  lh_version: string | null;
  score_performance: number | null;
  score_accessibility: number | null;
  score_best_practices: number | null;
  score_seo: number | null;
  lcp_ms: number | null;
  cls: number | null;
  inp_ms: number | null;
  tbt_ms: number | null;
  report_path: string | null;
}

const GH_REPO = "ana-wiz-hub"; // best-effort; commit links degrade gracefully if absent

function scoreTone(score: number | null): "good" | "ok" | "bad" | "muted" {
  if (score == null) return "muted";
  if (score >= 90) return "good";
  if (score >= 50) return "ok";
  return "bad";
}

function ScoreChip({ label, score }: { label: string; score: number | null }) {
  const tone = scoreTone(score);
  const className =
    tone === "good"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : tone === "ok"
      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
      : tone === "bad"
      ? "bg-destructive/15 text-destructive border-destructive/30"
      : "bg-muted text-muted-foreground border-border";
  return (
    <div className={`flex flex-col items-start rounded-md border px-3 py-2 ${className}`}>
      <span className="text-xs font-medium opacity-80">{label}</span>
      <span className="text-2xl font-semibold tabular-nums">{score ?? "—"}</span>
    </div>
  );
}

function fmtDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

async function fetchRuns(): Promise<LighthouseRun[]> {
  const { data, error } = await supabase
    .from("lighthouse_runs")
    .select(
      "id,created_at,url,commit_sha,branch,lh_version,score_performance,score_accessibility,score_best_practices,score_seo,lcp_ms,cls,inp_ms,tbt_ms,report_path",
    )
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) throw error;
  return (data ?? []) as LighthouseRun[];
}

export default function LighthouseHistoryPanel() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["lighthouse-runs"],
    queryFn: fetchRuns,
    refetchOnWindowFocus: false,
  });

  const [reportUrls, setReportUrls] = useState<Record<string, string>>({});
  const [seedStrategy, setSeedStrategy] = useState<"mobile" | "desktop">("mobile");

  const seedRun = useMutation({
    mutationFn: async (strategy: "mobile" | "desktop") => {
      const target = "https://anaesthesiacore.app/";
      const { data, error } = await supabase.functions.invoke("seed-lighthouse-run", {
        body: { url: target, strategy },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      return data as { ok: true; scores: Record<string, number>; strategy?: string };
    },
    onSuccess: (res, strategy) => {
      const s = res.scores;
      toast({
        title: `Lighthouse ${strategy} run seeded`,
        description: `Perf ${s.performance} · A11y ${s.accessibility} · BP ${s.best_practices} · SEO ${s.seo}`,
      });
      qc.invalidateQueries({ queryKey: ["lighthouse-runs"] });
    },
    onError: (e: Error) =>
      toast({ title: "Seed failed", description: e.message, variant: "destructive" }),
  });

  // Sign URLs for the most recent reports.
  useEffect(() => {
    if (!data) return;
    const paths = data.map((r) => r.report_path).filter((p): p is string => !!p);
    if (paths.length === 0) return;
    let cancelled = false;
    (async () => {
      const map: Record<string, string> = {};
      for (const p of paths) {
        const { data: signed } = await supabase.storage
          .from("lighthouse-reports")
          .createSignedUrl(p, 60 * 30);
        if (signed?.signedUrl) map[p] = signed.signedUrl;
      }
      if (!cancelled) setReportUrls(map);
    })();
    return () => {
      cancelled = true;
    };
  }, [data]);

  const latest = data?.[0];

  // Charts use chronological order (oldest -> newest).
  const chronological = useMemo(() => (data ? [...data].reverse() : []), [data]);

  // Build latest mobile/desktop per URL for the comparison view.
  const stratOf = (r: LighthouseRun): "mobile" | "desktop" => {
    const b = (r.branch ?? "").toLowerCase();
    if (b === "psi-desktop") return "desktop";
    if (b === "psi-mobile") return "mobile";
    // CI/Lighthouse default form factor is mobile.
    return "mobile";
  };
  const comparison = useMemo(() => {
    const map = new Map<string, { url: string; mobile?: LighthouseRun; desktop?: LighthouseRun }>();
    for (const r of data ?? []) {
      const key = r.url;
      const entry = map.get(key) ?? { url: r.url };
      const s = stratOf(r);
      // data is sorted desc, so first seen is latest.
      if (s === "mobile" && !entry.mobile) entry.mobile = r;
      if (s === "desktop" && !entry.desktop) entry.desktop = r;
      map.set(key, entry);
    }
    return [...map.values()];
  }, [data]);

  const categoryData = chronological.map((r) => ({
    label: new Date(r.created_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    Performance: r.score_performance ?? null,
    Accessibility: r.score_accessibility ?? null,
    "Best Practices": r.score_best_practices ?? null,
    SEO: r.score_seo ?? null,
  }));

  const cwvData = chronological.map((r) => ({
    label: new Date(r.created_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    LCP: r.lcp_ms,
    INP: r.inp_ms,
    TBT: r.tbt_ms,
    CLS: r.cls != null ? r.cls * 1000 : null, // scale CLS to fit ms axis
  }));

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>Lighthouse history</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Scores across published builds · {data?.length ?? 0} run{data?.length === 1 ? "" : "s"} tracked
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={seedStrategy} onValueChange={(v) => setSeedStrategy(v as "mobile" | "desktop")}>
            <TabsList className="h-8">
              <TabsTrigger value="mobile" className="h-6 text-xs">Mobile</TabsTrigger>
              <TabsTrigger value="desktop" className="h-6 text-xs">Desktop</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            size="sm"
            variant="outline"
            onClick={() => seedRun.mutate(seedStrategy)}
            disabled={seedRun.isPending}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${seedRun.isPending ? "animate-spin" : ""}`} />
            Seed {seedStrategy}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {error ? (
          <p className="text-sm text-destructive">Failed to load runs: {(error as Error).message}</p>
        ) : null}

        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !data || data.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Latest scores */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <ScoreChip label="Performance" score={latest?.score_performance ?? null} />
              <ScoreChip label="Accessibility" score={latest?.score_accessibility ?? null} />
              <ScoreChip label="Best Practices" score={latest?.score_best_practices ?? null} />
              <ScoreChip label="SEO" score={latest?.score_seo ?? null} />
            </div>

            {/* Trend chart */}
            <Tabs defaultValue="categories">
              <TabsList>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="cwv">Core Web Vitals</TabsTrigger>
                <TabsTrigger value="compare">Mobile vs Desktop</TabsTrigger>
              </TabsList>
              <TabsContent value="categories" className="mt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer>
                    <LineChart data={categoryData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="Performance" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Accessibility" stroke="#10b981" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Best Practices" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="SEO" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="cwv" className="mt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer>
                    <LineChart data={cwvData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="LCP" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="INP" stroke="#10b981" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="TBT" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="CLS" stroke="#8b5cf6" strokeWidth={2} dot={false} name="CLS (×1000)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Values in ms (CLS scaled ×1000 to share axis).
                </p>
              </TabsContent>
              <TabsContent value="compare" className="mt-4">
                <ComparisonView rows={comparison} />
              </TabsContent>
            </Tabs>

            {/* Run table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">When</th>
                    <th className="py-2 pr-4 font-medium">Commit</th>
                    <th className="py-2 pr-4 font-medium">Perf</th>
                    <th className="py-2 pr-4 font-medium">A11y</th>
                    <th className="py-2 pr-4 font-medium">BP</th>
                    <th className="py-2 pr-4 font-medium">SEO</th>
                    <th className="py-2 font-medium">Report</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r) => (
                    <tr key={r.id} className="border-t border-border">
                      <td className="py-2 pr-4 whitespace-nowrap">{fmtDateTime(r.created_at)}</td>
                      <td className="py-2 pr-4">
                        {r.commit_sha ? (
                          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                            {r.commit_sha.slice(0, 7)}
                          </code>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-2 pr-4 tabular-nums">{r.score_performance ?? "—"}</td>
                      <td className="py-2 pr-4 tabular-nums">{r.score_accessibility ?? "—"}</td>
                      <td className="py-2 pr-4 tabular-nums">{r.score_best_practices ?? "—"}</td>
                      <td className="py-2 pr-4 tabular-nums">{r.score_seo ?? "—"}</td>
                      <td className="py-2">
                        {r.report_path && reportUrls[r.report_path] ? (
                          <a
                            href={reportUrls[r.report_path]}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            Open <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="space-y-3 rounded-md border border-dashed border-border bg-muted/30 p-6 text-sm">
      <p className="font-medium text-foreground">No Lighthouse runs yet.</p>
      <p className="text-muted-foreground">
        Add the <code className="rounded bg-muted px-1">LIGHTHOUSE_INGEST_TOKEN</code> repo
        secret to GitHub, then republish — the workflow at{" "}
        <code className="rounded bg-muted px-1">.github/workflows/lighthouse.yml</code> runs
        Lighthouse and posts results here.
      </p>
      <p className="text-muted-foreground">
        Or seed a manual run by POSTing a JSON summary to the{" "}
        <code className="rounded bg-muted px-1">ingest-lighthouse-run</code> edge function with
        the <code className="rounded bg-muted px-1">x-lighthouse-ingest-token</code> header.
      </p>
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://github.com/${GH_REPO}/actions`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1"
        >
          GitHub Actions <ExternalLink className="h-3 w-3" />
        </a>
      </Button>
    </div>
  );
}

interface ComparisonRow {
  url: string;
  mobile?: LighthouseRun;
  desktop?: LighthouseRun;
}

function Delta({ mobile, desktop }: { mobile: number | null | undefined; desktop: number | null | undefined }) {
  if (mobile == null || desktop == null) return null;
  const diff = desktop - mobile;
  if (diff === 0) return <span className="text-xs text-muted-foreground">±0</span>;
  const positive = diff > 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  const cls = positive
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-destructive";
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs ${cls}`}>
      <Icon className="h-3 w-3" />
      {positive ? "+" : ""}
      {diff}
    </span>
  );
}

function StratCell({ run, label, icon: Icon }: { run?: LighthouseRun; label: string; icon: typeof Smartphone }) {
  if (!run) {
    return (
      <div className="rounded-md border border-dashed border-border bg-muted/20 p-3 text-center">
        <div className="mb-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Icon className="h-3 w-3" /> {label}
        </div>
        <p className="text-xs text-muted-foreground">No run yet</p>
      </div>
    );
  }
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Icon className="h-3 w-3" /> {label}
        </span>
        <span className="tabular-nums">{new Date(run.created_at).toLocaleDateString()}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <ScoreChip label="Perf" score={run.score_performance} />
        <ScoreChip label="A11y" score={run.score_accessibility} />
        <ScoreChip label="BP" score={run.score_best_practices} />
        <ScoreChip label="SEO" score={run.score_seo} />
      </div>
    </div>
  );
}

function avgScore(r?: LighthouseRun): number | null {
  if (!r) return null;
  const xs = [r.score_performance, r.score_accessibility, r.score_best_practices, r.score_seo].filter(
    (n): n is number => typeof n === "number",
  );
  if (xs.length === 0) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function WinnerBadge({ row }: { row: ComparisonRow }) {
  if (!row.mobile || !row.desktop) {
    return (
      <Badge variant="outline" className="text-xs">
        {row.mobile ? "Mobile only" : row.desktop ? "Desktop only" : "No data"}
      </Badge>
    );
  }
  const m = avgScore(row.mobile) ?? 0;
  const d = avgScore(row.desktop) ?? 0;
  const diff = Math.round((d - m) * 10) / 10;
  if (Math.abs(diff) < 0.5) {
    return (
      <Badge className="border-border bg-muted text-foreground text-xs">Tied · avg {m.toFixed(0)}</Badge>
    );
  }
  const desktopWins = diff > 0;
  const Icon = desktopWins ? Monitor : Smartphone;
  const label = desktopWins ? "Desktop leads" : "Mobile leads";
  return (
    <Badge
      className={`text-xs border ${
        desktopWins
          ? "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30"
          : "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30"
      }`}
    >
      <Icon className="mr-1 h-3 w-3" />
      {label} · +{Math.abs(diff).toFixed(1)}
    </Badge>
  );
}

function metricDeltas(row: ComparisonRow) {
  if (!row.mobile || !row.desktop) return null;
  return [
    { key: "Perf", m: row.mobile.score_performance, d: row.desktop.score_performance },
    { key: "A11y", m: row.mobile.score_accessibility, d: row.desktop.score_accessibility },
    { key: "BP", m: row.mobile.score_best_practices, d: row.desktop.score_best_practices },
    { key: "SEO", m: row.mobile.score_seo, d: row.desktop.score_seo },
  ];
}

function ComparisonView({ rows }: { rows: ComparisonRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No runs to compare yet.</p>;
  }
  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const m = avgScore(row.mobile);
        const d = avgScore(row.desktop);
        const desktopWins = m != null && d != null && d - m >= 0.5;
        const mobileWins = m != null && d != null && m - d >= 0.5;
        const deltas = metricDeltas(row);
        return (
          <div key={row.url} className="rounded-lg border border-border p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="truncate text-sm font-medium" title={row.url}>{row.url}</p>
              <WinnerBadge row={row} />
            </div>
            {deltas ? (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {deltas.map((x) => (
                  <DeltaBadge key={x.key} label={x.key} mobile={x.m} desktop={x.d} />
                ))}
              </div>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className={mobileWins ? "ring-2 ring-sky-500/40 rounded-md" : ""}>
                <StratCell run={row.mobile} label="Mobile" icon={Smartphone} />
              </div>
              <div className={desktopWins ? "ring-2 ring-violet-500/40 rounded-md" : ""}>
                <StratCell run={row.desktop} label="Desktop" icon={Monitor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DeltaBadge({
  label,
  mobile,
  desktop,
}: {
  label: string;
  mobile: number | null;
  desktop: number | null;
}) {
  if (mobile == null || desktop == null) {
    return (
      <Badge variant="outline" className="text-xs font-normal">
        {label} —
      </Badge>
    );
  }
  const diff = desktop - mobile;
  if (diff === 0) {
    return (
      <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
        {label} ±0
      </Badge>
    );
  }
  const desktopBetter = diff > 0;
  const Icon = desktopBetter ? ArrowUpRight : ArrowDownRight;
  const winner = desktopBetter ? "Desktop" : "Mobile";
  const cls = desktopBetter
    ? "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30"
    : "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30";
  return (
    <Badge className={`text-xs font-normal border ${cls}`} title={`${winner} +${Math.abs(diff)}`}>
      {label}
      <Icon className="mx-0.5 h-3 w-3" />
      {Math.abs(diff)} {winner === "Desktop" ? "D" : "M"}
    </Badge>
  );
}
