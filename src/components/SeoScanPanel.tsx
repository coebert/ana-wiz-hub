import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RefreshCw, AlertCircle, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PageAudit {
  url: string;
  status: number;
  response_ms: number;
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string | null;
  h1_count: number;
  robots_meta: string | null;
  byte_size: number;
  findings: string[];
}

interface SeoScan {
  id: string;
  created_at: string;
  base_url: string;
  commit_sha: string | null;
  pages_total: number;
  pages_ok: number;
  pages_failed: number;
  findings_count: number;
  duration_ms: number | null;
  results: {
    pages?: PageAudit[];
    finding_totals?: Record<string, number>;
    sitemap_size?: number;
  };
}

const FINDING_LABELS: Record<string, string> = {
  missing_title: "Missing <title>",
  title_too_short: "Title too short (<10 chars)",
  title_too_long: "Title too long (>60 chars)",
  duplicate_title: "Duplicate title",
  missing_description: "Missing meta description",
  description_too_short: "Description too short (<50 chars)",
  description_too_long: "Description too long (>160 chars)",
  duplicate_description: "Duplicate description",
  missing_canonical: "Missing canonical link",
  duplicate_canonical: "Duplicate canonical",
  missing_og_title: "Missing og:title",
  missing_og_description: "Missing og:description",
  missing_og_image: "Missing og:image",
  missing_twitter_card: "Missing twitter:card",
  missing_h1: "Missing <h1>",
  multiple_h1: "Multiple <h1> tags",
  noindex_meta: "noindex meta tag",
  fetch_failed: "Page failed to load",
  http_404: "404 Not Found",
  http_500: "500 Server Error",
};

function labelFor(key: string) {
  return FINDING_LABELS[key] ?? key.replace(/_/g, " ");
}

async function fetchScans(): Promise<SeoScan[]> {
  const { data, error } = await supabase
    .from("seo_scans")
    .select("id,created_at,base_url,commit_sha,pages_total,pages_ok,pages_failed,findings_count,duration_ms,results")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []) as unknown as SeoScan[];
}

export default function SeoScanPanel() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["seo-scans"],
    queryFn: fetchScans,
    refetchOnWindowFocus: false,
  });

  const runScan = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("run-seo-scan", {
        body: {
          base_url: window.location.origin.includes("anaesthesiacore.app")
            ? "https://anaesthesiacore.app"
            : window.location.origin,
          max_pages: 80,
        },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      return data as { ok: true; pages_total: number; findings_count: number };
    },
    onSuccess: (res) => {
      toast({
        title: "SEO scan complete",
        description: `${res.pages_total} pages · ${res.findings_count} findings`,
      });
      qc.invalidateQueries({ queryKey: ["seo-scans"] });
    },
    onError: (e: Error) =>
      toast({ title: "SEO scan failed", description: e.message, variant: "destructive" }),
  });

  const latest = data?.[0];

  const findingTotals = useMemo(
    () => Object.entries(latest?.results?.finding_totals ?? {}).sort((a, b) => b[1] - a[1]),
    [latest],
  );

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>Post-deploy SEO scan</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Crawls sitemap.xml after every publish · {data?.length ?? 0} scan
            {data?.length === 1 ? "" : "s"} on file
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => runScan.mutate()}
          disabled={runScan.isPending}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${runScan.isPending ? "animate-spin" : ""}`} />
          Run scan now
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {error ? (
          <p className="text-sm text-destructive">Failed to load scans: {(error as Error).message}</p>
        ) : null}

        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !latest ? (
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
            No scans yet. Click <strong>Run scan now</strong> to seed the first one, or republish to
            trigger the GitHub Actions workflow automatically.
          </div>
        ) : (
          <>
            {/* Latest summary */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <SummaryStat label="Pages crawled" value={latest.pages_total} />
              <SummaryStat
                label="OK"
                value={latest.pages_ok}
                tone={latest.pages_failed === 0 ? "good" : "ok"}
              />
              <SummaryStat
                label="Failed"
                value={latest.pages_failed}
                tone={latest.pages_failed === 0 ? "good" : "bad"}
              />
              <SummaryStat
                label="Findings"
                value={latest.findings_count}
                tone={latest.findings_count === 0 ? "good" : latest.findings_count < 10 ? "ok" : "bad"}
              />
            </div>

            <Tabs defaultValue="findings">
              <TabsList>
                <TabsTrigger value="findings">Findings breakdown</TabsTrigger>
                <TabsTrigger value="pages">Per-page audit</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="findings" className="mt-4">
                {findingTotals.length === 0 ? (
                  <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> No findings — clean scan.
                  </div>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {findingTotals.map(([key, count]) => (
                      <li
                        key={key}
                        className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                      >
                        <span className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          {labelFor(key)}
                        </span>
                        <Badge variant="secondary">{count}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>

              <TabsContent value="pages" className="mt-4">
                <div className="space-y-1 text-sm">
                  {(latest.results.pages ?? []).map((p) => {
                    const isExpanded = expanded === p.url;
                    const hasIssues = p.findings.length > 0;
                    return (
                      <div key={p.url} className="rounded-md border border-border">
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : p.url)}
                          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-muted/50"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <span className="truncate">{p.url.replace(/^https?:\/\/[^/]+/, "") || "/"}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2">
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {p.response_ms}ms
                            </span>
                            <Badge
                              variant={
                                p.status >= 400 ? "destructive" : hasIssues ? "secondary" : "default"
                              }
                            >
                              {p.status || "ERR"} · {p.findings.length}
                            </Badge>
                          </span>
                        </button>
                        {isExpanded ? (
                          <div className="space-y-2 border-t border-border bg-muted/30 px-3 py-3 text-xs">
                            <DetailRow label="Title" value={p.title} max={60} />
                            <DetailRow label="Description" value={p.description} max={160} />
                            <DetailRow label="Canonical" value={p.canonical} />
                            <DetailRow label="og:title" value={p.og_title} />
                            <DetailRow label="og:image" value={p.og_image} />
                            <DetailRow label="twitter:card" value={p.twitter_card} />
                            <DetailRow label="H1 count" value={String(p.h1_count)} />
                            {p.findings.length > 0 ? (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {p.findings.map((f) => (
                                  <Badge key={f} variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-300">
                                    {labelFor(f)}
                                  </Badge>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">When</th>
                      <th className="py-2 pr-4 font-medium">Commit</th>
                      <th className="py-2 pr-4 font-medium">Pages</th>
                      <th className="py-2 pr-4 font-medium">Failed</th>
                      <th className="py-2 pr-4 font-medium">Findings</th>
                      <th className="py-2 font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data!.map((s) => (
                      <tr key={s.id} className="border-t border-border">
                        <td className="py-2 pr-4 whitespace-nowrap">
                          {new Date(s.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4">
                          {s.commit_sha ? (
                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                              {s.commit_sha.slice(0, 7)}
                            </code>
                          ) : (
                            <span className="text-muted-foreground">manual</span>
                          )}
                        </td>
                        <td className="py-2 pr-4 tabular-nums">{s.pages_total}</td>
                        <td className="py-2 pr-4 tabular-nums">
                          <span className={s.pages_failed > 0 ? "text-destructive" : ""}>
                            {s.pages_failed}
                          </span>
                        </td>
                        <td className="py-2 pr-4 tabular-nums">{s.findings_count}</td>
                        <td className="py-2 tabular-nums text-muted-foreground">
                          {s.duration_ms != null ? `${(s.duration_ms / 1000).toFixed(1)}s` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function SummaryStat({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: number;
  tone?: "good" | "ok" | "bad" | "muted";
}) {
  const className =
    tone === "good"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : tone === "ok"
      ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      : tone === "bad"
      ? "border-destructive/30 bg-destructive/10 text-destructive"
      : "border-border bg-muted/40 text-foreground";
  return (
    <div className={`rounded-md border px-3 py-2 ${className}`}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function DetailRow({ label, value, max }: { label: string; value: string | null; max?: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="w-28 shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 flex-1 break-all font-mono">
        {value ? (
          <>
            {value}
            {max ? (
              <span className="ml-2 text-muted-foreground">({value.length}/{max})</span>
            ) : null}
          </>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </span>
    </div>
  );
}
