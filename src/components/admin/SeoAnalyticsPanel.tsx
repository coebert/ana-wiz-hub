import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, Search, Globe, Smartphone, ExternalLink } from "lucide-react";

interface GscRow {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SeoData {
  site: string;
  range: { startDate: string; endDate: string; days: number };
  totals: { rows?: GscRow[]; error?: string };
  byDate: { rows?: GscRow[]; error?: string };
  topQueries: { rows?: GscRow[]; error?: string };
  topPages: { rows?: GscRow[]; error?: string };
  topCountries: { rows?: GscRow[]; error?: string };
  byDevice: { rows?: GscRow[]; error?: string };
  fetchedAt: string;
}

function fmtNum(n: number | undefined) {
  if (n == null || !isFinite(n)) return "—";
  return new Intl.NumberFormat().format(Math.round(n));
}
function fmtPct(n: number | undefined) {
  if (n == null || !isFinite(n)) return "—";
  return `${(n * 100).toFixed(1)}%`;
}
function fmtPos(n: number | undefined) {
  if (n == null || !isFinite(n)) return "—";
  return n.toFixed(1);
}

// GSC returns ISO 3166-1 alpha-3 country codes. Map the common ones to
// alpha-2 (for the flag emoji) + display name. Unknown codes fall back to
// the raw code so we never render an empty cell.
const COUNTRY_MAP: Record<string, { a2: string; name: string }> = {
  gbr: { a2: "GB", name: "United Kingdom" }, usa: { a2: "US", name: "United States" },
  irl: { a2: "IE", name: "Ireland" },         aus: { a2: "AU", name: "Australia" },
  nzl: { a2: "NZ", name: "New Zealand" },     can: { a2: "CA", name: "Canada" },
  ind: { a2: "IN", name: "India" },           pak: { a2: "PK", name: "Pakistan" },
  zaf: { a2: "ZA", name: "South Africa" },    nga: { a2: "NG", name: "Nigeria" },
  ken: { a2: "KE", name: "Kenya" },           egy: { a2: "EG", name: "Egypt" },
  sgp: { a2: "SG", name: "Singapore" },       mys: { a2: "MY", name: "Malaysia" },
  hkg: { a2: "HK", name: "Hong Kong" },       are: { a2: "AE", name: "UAE" },
  sau: { a2: "SA", name: "Saudi Arabia" },    deu: { a2: "DE", name: "Germany" },
  fra: { a2: "FR", name: "France" },          esp: { a2: "ES", name: "Spain" },
  ita: { a2: "IT", name: "Italy" },           nld: { a2: "NL", name: "Netherlands" },
  bel: { a2: "BE", name: "Belgium" },         che: { a2: "CH", name: "Switzerland" },
  swe: { a2: "SE", name: "Sweden" },          nor: { a2: "NO", name: "Norway" },
  dnk: { a2: "DK", name: "Denmark" },         fin: { a2: "FI", name: "Finland" },
  pol: { a2: "PL", name: "Poland" },          prt: { a2: "PT", name: "Portugal" },
  grc: { a2: "GR", name: "Greece" },          tur: { a2: "TR", name: "Turkey" },
  bra: { a2: "BR", name: "Brazil" },          mex: { a2: "MX", name: "Mexico" },
  arg: { a2: "AR", name: "Argentina" },       chl: { a2: "CL", name: "Chile" },
  col: { a2: "CO", name: "Colombia" },        per: { a2: "PE", name: "Peru" },
  jpn: { a2: "JP", name: "Japan" },           kor: { a2: "KR", name: "South Korea" },
  chn: { a2: "CN", name: "China" },           twn: { a2: "TW", name: "Taiwan" },
  tha: { a2: "TH", name: "Thailand" },        vnm: { a2: "VN", name: "Vietnam" },
  idn: { a2: "ID", name: "Indonesia" },       phl: { a2: "PH", name: "Philippines" },
  bgd: { a2: "BD", name: "Bangladesh" },      lka: { a2: "LK", name: "Sri Lanka" },
  npl: { a2: "NP", name: "Nepal" },           irn: { a2: "IR", name: "Iran" },
  irq: { a2: "IQ", name: "Iraq" },            isr: { a2: "IL", name: "Israel" },
  rou: { a2: "RO", name: "Romania" },         hun: { a2: "HU", name: "Hungary" },
  cze: { a2: "CZ", name: "Czechia" },         aut: { a2: "AT", name: "Austria" },
  ukr: { a2: "UA", name: "Ukraine" },         rus: { a2: "RU", name: "Russia" },
};

function flagEmoji(a2: string) {
  if (a2.length !== 2) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + a2.charCodeAt(0) - 65, A + a2.charCodeAt(1) - 65);
}

function describeCountry(code: string | undefined) {
  if (!code) return { flag: "", name: "—" };
  const lc = code.toLowerCase();
  const m = COUNTRY_MAP[lc];
  if (m) return { flag: flagEmoji(m.a2), name: m.name };
  return { flag: "", name: code.toUpperCase() };
}

const RANGE_OPTIONS = [
  { label: "7d", days: 7 },
  { label: "28d", days: 28 },
  { label: "90d", days: 90 },
];

export default function SeoAnalyticsPanel() {
  const [data, setData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(28);

  const load = async (d: number) => {
    setLoading(true);
    setError(null);
    const { data: res, error: err } = await supabase.functions.invoke("seo-analytics", {
      body: { days: d },
    });
    if (err) {
      setError(err.message);
    } else if ((res as any)?.error) {
      setError((res as any).error);
    } else {
      setData(res as SeoData);
    }
    setLoading(false);
  };

  useEffect(() => { load(days); /* eslint-disable-next-line */ }, [days]);

  const totals = data?.totals?.rows?.[0];
  const maxClick = useMemo(() => {
    const rows = data?.byDate?.rows ?? [];
    return Math.max(1, ...rows.map(r => r.clicks));
  }, [data]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
            Google Search performance
          </h2>
          <p className="text-sm text-muted-foreground">
            From Google Search Console for <span className="font-mono">{data?.site ?? "anaesthesiacore.app"}</span>
            {data?.range && (
              <> · {data.range.startDate} → {data.range.endDate}</>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Date range" className="flex p-1 rounded-md bg-secondary/50">
            {RANGE_OPTIONS.map(r => (
              <button
                key={r.days}
                role="tab"
                aria-selected={days === r.days}
                onClick={() => setDays(r.days)}
                className={`px-3 py-1.5 text-sm rounded ${
                  days === r.days ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => load(days)} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </Button>
        </div>
      </header>

      {error && (
        <div className="p-4 rounded-lg border border-destructive/40 bg-destructive/5 text-sm">
          <p className="font-medium text-destructive">Couldn't load Search Console data</p>
          <p className="text-muted-foreground mt-1">{error}</p>
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Clicks",        value: fmtNum(totals?.clicks),       help: "Visits from Google search results" },
          { label: "Impressions",   value: fmtNum(totals?.impressions),  help: "Times a page from your site appeared in results" },
          { label: "Avg. CTR",      value: fmtPct(totals?.ctr),          help: "Clicks ÷ impressions" },
          { label: "Avg. position", value: fmtPos(totals?.position),     help: "Mean ranking across all queries (1 = top)" },
        ].map(k => (
          <div key={k.label} className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
            <p className="text-2xl font-bold tabular-nums mt-1">{loading && !data ? "…" : k.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{k.help}</p>
          </div>
        ))}
      </div>

      {/* Daily clicks chart */}
      <div className="p-4 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-3">Daily clicks</h3>
        <div className="flex items-end gap-1 h-32">
          {(data?.byDate?.rows ?? []).map((row, i) => {
            const h = Math.max(2, Math.round((row.clicks / maxClick) * 100));
            const date = row.keys?.[0] ?? "";
            return (
              <div
                key={i}
                className="flex-1 bg-primary/70 hover:bg-primary rounded-t transition-colors"
                style={{ height: `${h}%` }}
                title={`${date}: ${row.clicks} clicks · ${row.impressions} impressions`}
                aria-label={`${date}: ${row.clicks} clicks`}
              />
            );
          })}
          {(!data?.byDate?.rows || data.byDate.rows.length === 0) && (
            <p className="text-sm text-muted-foreground self-center w-full text-center">No data yet for this window.</p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top queries */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-primary" aria-hidden="true" /> Top search queries
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium">Query</th>
                  <th className="text-right py-2 font-medium">Clicks</th>
                  <th className="text-right py-2 font-medium">Impr.</th>
                  <th className="text-right py-2 font-medium">CTR</th>
                  <th className="text-right py-2 font-medium">Pos.</th>
                </tr>
              </thead>
              <tbody>
                {(data?.topQueries?.rows ?? []).map((r, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-2 truncate max-w-[18ch]" title={r.keys?.[0]}>{r.keys?.[0]}</td>
                    <td className="text-right tabular-nums">{fmtNum(r.clicks)}</td>
                    <td className="text-right tabular-nums">{fmtNum(r.impressions)}</td>
                    <td className="text-right tabular-nums">{fmtPct(r.ctr)}</td>
                    <td className="text-right tabular-nums">{fmtPos(r.position)}</td>
                  </tr>
                ))}
                {(!data?.topQueries?.rows || data.topQueries.rows.length === 0) && (
                  <tr><td colSpan={5} className="py-4 text-center text-muted-foreground">No queries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top pages */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" /> Top pages
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium">Page</th>
                  <th className="text-right py-2 font-medium">Clicks</th>
                  <th className="text-right py-2 font-medium">Impr.</th>
                  <th className="text-right py-2 font-medium">Pos.</th>
                </tr>
              </thead>
              <tbody>
                {(data?.topPages?.rows ?? []).map((r, i) => {
                  const url = r.keys?.[0] ?? "";
                  const path = url.replace(/^https?:\/\/[^/]+/, "") || "/";
                  return (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-2">
                        <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate inline-block max-w-[24ch]" title={url}>
                          {path}
                        </a>
                      </td>
                      <td className="text-right tabular-nums">{fmtNum(r.clicks)}</td>
                      <td className="text-right tabular-nums">{fmtNum(r.impressions)}</td>
                      <td className="text-right tabular-nums">{fmtPos(r.position)}</td>
                    </tr>
                  );
                })}
                {(!data?.topPages?.rows || data.topPages.rows.length === 0) && (
                  <tr><td colSpan={4} className="py-4 text-center text-muted-foreground">No pages yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top countries */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" aria-hidden="true" /> Top countries
          </h3>
          <ul className="space-y-1.5 text-sm">
            {(data?.topCountries?.rows ?? []).map((r, i) => {
              const c = describeCountry(r.keys?.[0]);
              return (
                <li key={i} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <span aria-hidden="true">{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span className="text-muted-foreground text-xs tabular-nums shrink-0">
                    {fmtNum(r.clicks)} clicks · pos {fmtPos(r.position)}
                  </span>
                </li>
              );
            })}
            {(!data?.topCountries?.rows || data.topCountries.rows.length === 0) && (
              <li className="text-muted-foreground">No data yet.</li>
            )}
          </ul>
        </div>

        {/* By device */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" /> By device
          </h3>
          <ul className="space-y-1.5 text-sm">
            {(data?.byDevice?.rows ?? []).map((r, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="capitalize">{(r.keys?.[0] ?? "").toLowerCase()}</span>
                <span className="text-muted-foreground">{fmtNum(r.clicks)} clicks · CTR {fmtPct(r.ctr)} · pos {fmtPos(r.position)}</span>
              </li>
            ))}
            {(!data?.byDevice?.rows || data.byDevice.rows.length === 0) && (
              <li className="text-muted-foreground">No data yet.</li>
            )}
          </ul>
        </div>
      </div>

      {data?.fetchedAt && (
        <p className="text-xs text-muted-foreground text-right">
          Fetched {new Date(data.fetchedAt).toLocaleString()} · Google Search Console data lags ~2 days.
        </p>
      )}
    </section>
  );
}
