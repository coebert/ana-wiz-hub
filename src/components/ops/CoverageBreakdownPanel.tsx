import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, ExternalLink } from "lucide-react";

interface CoverageResult {
  url: string;
  verdict?: string | null;
  coverageState?: string | null;
  indexingState?: string | null;
  robotsTxtState?: string | null;
  pageFetchState?: string | null;
  lastCrawlTime?: string | null;
  googleCanonical?: string | null;
  userCanonical?: string | null;
  error?: string;
}

interface CoveragePayload {
  site: string;
  sitemapUrl: string;
  total: number;
  inspected: number;
  limit: number;
  offset: number;
  results: CoverageResult[];
  fetchedAt: string;
}

async function fetchCoverage(limit: number, offset: number): Promise<CoveragePayload> {
  const { data, error } = await supabase.functions.invoke("gsc-coverage", {
    body: null,
    method: "GET",
    headers: {},
    // edge function reads query params from URL — pass via path
  } as never);
  // Supabase invoke doesn't expose query params; fall back to a direct fetch.
  if (data && !error) return data as CoveragePayload;

  const { data: session } = await supabase.auth.getSession();
  const token = session.session?.access_token;
  const projectUrl = (supabase as unknown as { supabaseUrl: string }).supabaseUrl;
  const url = `${projectUrl}/functions/v1/gsc-coverage?limit=${limit}&offset=${offset}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
  return body as CoveragePayload;
}

function verdictVariant(v?: string | null): "default" | "secondary" | "destructive" | "outline" {
  if (!v) return "outline";
  if (v === "PASS") return "default";
  if (v === "PARTIAL") return "secondary";
  if (v === "FAIL" || v === "NEUTRAL") return "destructive";
  return "outline";
}

function shortPath(u: string): string {
  try {
    const p = new URL(u).pathname;
    return p === "/" ? "/" : p;
  } catch {
    return u;
  }
}

function fmtDateTime(iso?: string | null) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

export default function CoverageBreakdownPanel() {
  const [offset, setOffset] = useState(0);
  const limit = 25;

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["gsc-coverage", offset, limit],
    queryFn: () => fetchCoverage(limit, offset),
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });

  const summary = useMemo(() => {
    const rows = data?.results ?? [];
    const counts: Record<string, number> = {};
    let errors = 0;
    for (const r of rows) {
      if (r.error) { errors++; continue; }
      const k = r.coverageState ?? "Unknown";
      counts[k] = (counts[k] ?? 0) + 1;
    }
    return { counts, errors, total: rows.length };
  }, [data]);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>Coverage breakdown</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Live URL Inspection results from Google Search Console. Inspects a
            page of sitemap URLs at a time (quota-friendly).
          </p>
        </div>
        <Button onClick={() => refetch()} disabled={isFetching} size="sm" variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Inspecting…" : "Re-inspect"}
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-destructive">
            Failed to load coverage: {(error as Error).message}
          </p>
        ) : null}

        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : !data ? null : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline">
                {data.inspected} of {data.total} URLs
              </Badge>
              {Object.entries(summary.counts).map(([state, n]) => (
                <Badge key={state} variant={state.toLowerCase().includes("indexed") && !state.toLowerCase().includes("not") ? "default" : "secondary"}>
                  {state}: {n}
                </Badge>
              ))}
              {summary.errors > 0 && (
                <Badge variant="destructive">Errors: {summary.errors}</Badge>
              )}
              <span className="text-muted-foreground">
                · Fetched {fmtDateTime(data.fetchedAt)}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Page</th>
                    <th className="py-2 pr-4 font-medium">Verdict</th>
                    <th className="py-2 pr-4 font-medium">Coverage</th>
                    <th className="py-2 pr-4 font-medium">Fetch</th>
                    <th className="py-2 pr-4 font-medium">Last crawl</th>
                    <th className="py-2 font-medium">Canonical OK?</th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((r) => {
                    const canonicalOk =
                      r.googleCanonical && r.userCanonical
                        ? r.googleCanonical === r.userCanonical
                        : null;
                    return (
                      <tr key={r.url} className="border-t border-border align-top">
                        <td className="max-w-[320px] truncate py-2 pr-4">
                          <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                            {shortPath(r.url)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="py-2 pr-4">
                          {r.error ? (
                            <Badge variant="destructive" title={r.error}>Error</Badge>
                          ) : (
                            <Badge variant={verdictVariant(r.verdict)}>{r.verdict ?? "—"}</Badge>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-xs">{r.coverageState ?? "—"}</td>
                        <td className="py-2 pr-4 text-xs">{r.pageFetchState ?? "—"}</td>
                        <td className="py-2 pr-4 text-xs">{fmtDateTime(r.lastCrawlTime)}</td>
                        <td className="py-2 text-xs">
                          {canonicalOk === null ? "—" : canonicalOk ? (
                            <Badge variant="default">Match</Badge>
                          ) : (
                            <Badge variant="secondary" title={`google: ${r.googleCanonical}\nuser: ${r.userCanonical}`}>
                              Mismatch
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Showing {data.offset + 1}–{data.offset + data.inspected} of {data.total}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={offset === 0 || isFetching}
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={data.offset + data.inspected >= data.total || isFetching}
                  onClick={() => setOffset(offset + limit)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
