import { useEffect } from "react";
import { PageSection } from "@/components/layout/PageSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, ExternalLink } from "lucide-react";
import LighthouseHistoryPanel from "@/components/ops/LighthouseHistoryPanel";
import SeoScanPanel from "@/components/ops/SeoScanPanel";
import CoverageBreakdownPanel from "@/components/ops/CoverageBreakdownPanel";

interface SitemapInfo {
  path?: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  isSitemapsIndex?: boolean;
  type?: string;
  contents?: Array<{ type?: string; submitted?: string; indexed?: string }>;
  warnings?: string;
  errors?: string;
}

interface AnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

interface IndexingPayload {
  site: string;
  sitemapUrl: string;
  range: { startDate: string; endDate: string };
  sitemap: SitemapInfo | { error: string };
  totals: { rows?: AnalyticsRow[] } | { error: string };
  byDate: { rows?: AnalyticsRow[] } | { error: string };
  topPages: { rows?: AnalyticsRow[] } | { error: string };
  fetchedAt: string;
}

const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

async function fetchIndexing(): Promise<IndexingPayload> {
  const { data, error } = await supabase.functions.invoke("gsc-indexing");
  if (error) throw error;
  if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
  return data as IndexingPayload;
}

function hasError<T>(v: T | { error: string }): v is { error: string } {
  return !!v && typeof v === "object" && "error" in v;
}

function fmtNum(n: number | undefined) {
  if (n == null) return "—";
  return n.toLocaleString();
}

function fmtDateTime(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function SeoIndexing() {
  useEffect(() => {
    document.title = "SEO Indexing Dashboard — AnaesthesiaCore";
  }, []);

  const { data, isLoading, isFetching, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["gsc-indexing"],
    queryFn: fetchIndexing,
    refetchInterval: REFRESH_MS,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  const sitemap = data?.sitemap;
  const totals = data?.totals;
  const byDate = data?.byDate;
  const topPages = data?.topPages;

  const totalsRow = !hasError(totals ?? { error: "" }) ? (totals as { rows?: AnalyticsRow[] })?.rows?.[0] : undefined;
  const byDateRows = !hasError(byDate ?? { error: "" }) ? (byDate as { rows?: AnalyticsRow[] })?.rows ?? [] : [];
  const topPagesRows = !hasError(topPages ?? { error: "" }) ? (topPages as { rows?: AnalyticsRow[] })?.rows ?? [] : [];

  // Sparkline: clicks/impressions over the period.
  const maxImpr = Math.max(1, ...byDateRows.map((r) => r.impressions ?? 0));

  return (
    <PageSection as="main" spacing="tight" width="xwide">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Google Indexing Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Auto-refreshes every 5 minutes · Last updated {fmtDateTime(data?.fetchedAt ?? new Date(dataUpdatedAt).toISOString())}
          </p>
        </div>
        <Button onClick={() => refetch()} disabled={isFetching} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </header>

      {error ? (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load indexing data</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {(error as Error).message}
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Sitemap</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : !sitemap || hasError(sitemap) ? (
              <Badge variant="destructive">Error</Badge>
            ) : (
              (() => {
                const s = sitemap as SitemapInfo;
                const hasErrs = s.errors && s.errors !== "0";
                const hasWarns = s.warnings && s.warnings !== "0";
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={hasErrs ? "destructive" : "default"}>
                        {hasErrs ? `${s.errors} errors` : "Submitted"}
                      </Badge>
                      {hasWarns ? <Badge variant="secondary">{s.warnings} warnings</Badge> : null}
                    </div>
                    <p className="text-xs text-muted-foreground">Submitted: {fmtDateTime(s.lastSubmitted)}</p>
                    <p className="text-xs text-muted-foreground">Downloaded: {fmtDateTime(s.lastDownloaded)}</p>
                    <a
                      href={data?.sitemapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      View sitemap.xml <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                );
              })()
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Impressions (28d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-3xl font-semibold">{fmtNum(totalsRow?.impressions)}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Clicks: {fmtNum(totalsRow?.clicks)} · CTR:{" "}
              {totalsRow?.ctr != null ? `${(totalsRow.ctr * 100).toFixed(1)}%` : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Indexed pages (28d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-3xl font-semibold">{fmtNum(topPagesRows.length ? totalsRowPagesCount(topPages) : undefined)}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Pages with at least one impression in the period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Daily impressions &amp; clicks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : byDateRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet for the last 28 days.</p>
          ) : (
            <div className="flex h-40 items-end gap-1">
              {byDateRows.map((r) => {
                const date = r.keys?.[0] ?? "";
                const impr = r.impressions ?? 0;
                const clicks = r.clicks ?? 0;
                const h = Math.max(2, Math.round((impr / maxImpr) * 100));
                return (
                  <div key={date} className="group flex flex-1 flex-col items-center justify-end">
                    <div
                      className="w-full rounded-t bg-primary/70 transition-colors group-hover:bg-primary"
                      style={{ height: `${h}%` }}
                      title={`${date}: ${impr} impressions, ${clicks} clicks`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top pages (28d)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : topPagesRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No page data yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Page</th>
                    <th className="py-2 pr-4 font-medium">Clicks</th>
                    <th className="py-2 pr-4 font-medium">Impr.</th>
                    <th className="py-2 pr-4 font-medium">CTR</th>
                    <th className="py-2 font-medium">Pos.</th>
                  </tr>
                </thead>
                <tbody>
                  {topPagesRows.map((r) => {
                    const url = r.keys?.[0] ?? "";
                    return (
                      <tr key={url} className="border-t border-border">
                        <td className="max-w-[420px] truncate py-2 pr-4">
                          <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                            {url.replace(/^https?:\/\/[^/]+/, "")}
                          </a>
                        </td>
                        <td className="py-2 pr-4">{fmtNum(r.clicks)}</td>
                        <td className="py-2 pr-4">{fmtNum(r.impressions)}</td>
                        <td className="py-2 pr-4">{r.ctr != null ? `${(r.ctr * 100).toFixed(1)}%` : "—"}</td>
                        <td className="py-2">{r.position != null ? r.position.toFixed(1) : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <CoverageBreakdownPanel />
      <SeoScanPanel />
      <LighthouseHistoryPanel />

    </PageSection>
  );
}

function totalsRowPagesCount(topPages: IndexingPayload["topPages"] | undefined): number | undefined {
  if (!topPages || hasError(topPages)) return undefined;
  return (topPages as { rows?: AnalyticsRow[] }).rows?.length;
}
