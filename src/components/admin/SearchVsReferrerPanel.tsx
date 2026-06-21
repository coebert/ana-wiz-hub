import { useEffect, useMemo, useState } from "react";
import { ShieldAlert, Search, RefreshCw, Bot, MousePointerClick, ExternalLink, LineChart as LineChartIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

/**
 * Admin SEO panel: splits genuine Google organic clicks (Search Console
 * ground truth) from app-recorded visits whose referrer claims to be
 * google.com. The gap between the two columns is the bot / referrer-spoof
 * floor — useful for sanity-checking dashboard traffic numbers.
 *
 * Data sources:
 *   - GSC searchAnalytics (via gsc-search-analytics edge function), grouped
 *     by date, page, query, and page×date for the last 30 days.
 *   - app_visits rows (admin RLS read) with referrer containing "google"
 *     for the same window, grouped by day and by page_path.
 */

interface GscDateRow {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface GscPageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface GscPageDateRow {
  page: string;
  date: string;
  clicks: number;
  impressions: number;
}
interface GscPayload {
  site: string;
  startDate: string;
  endDate: string;
  days: number;
  byDate: GscDateRow[];
  byPage: GscPageRow[];
  byQuery: GscQueryRow[];
  byPageDate?: GscPageDateRow[];
}

interface VisitRow {
  visited_at: string;
  page_path: string | null;
  referrer: string | null;
  visitor_id: string;
  user_agent: string | null;
}

const RANGE_DAYS = 30;
// Half-life for recency decay, in days. A 14-day half-life means a hit
// today is worth 1.0, a hit 14 days ago 0.5, and a hit 28 days ago 0.25.
const DECAY_HALF_LIFE_DAYS = 14;

const fmtDay = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const pathOf = (loc: string) => {
  try {
    return new URL(loc).pathname || "/";
  } catch {
    return loc;
  }
};

const stripQueryAndHash = (p: string | null) => {
  if (!p) return "/";
  return p.split(/[?#]/)[0] || "/";
};

// Tokens that, when present in a User-Agent string, almost always indicate
// an automated client rather than a real browser. Lowercase substring match.
const BOT_UA_TOKENS = [
  "bot", "crawler", "spider", "slurp", "headless", "phantomjs",
  "puppeteer", "playwright", "selenium", "lighthouse", "pagespeed",
  "ahrefs", "semrush", "mj12", "dotbot", "petalbot", "yandexbot",
  "bingpreview", "gptbot", "claudebot", "ccbot", "anthropic", "perplexity",
  "applebot", "duckduckbot", "facebookexternalhit", "twitterbot",
  "linkedinbot", "discordbot", "telegrambot", "whatsapp",
  "dataforseo", "serpapi", "scrapy", "python-requests", "python-urllib",
  "go-http-client", "java/", "okhttp", "curl/", "wget/", "httpclient",
  "axios/", "node-fetch", "got (",
];

const isBotUserAgent = (ua: string | null): boolean => {
  if (!ua) return true; // missing UA is itself a strong bot signal
  const s = ua.toLowerCase();
  return BOT_UA_TOKENS.some((t) => s.includes(t));
};

const recencyWeight = (visitedAt: string, now: number): number => {
  const ageMs = now - new Date(visitedAt).getTime();
  const ageDays = Math.max(0, ageMs / (1000 * 60 * 60 * 24));
  return Math.pow(0.5, ageDays / DECAY_HALF_LIFE_DAYS);
};

// Single source of truth for the spoofing confidence formula. Used by
// both the per-page summary table and the 30-day time-series chart so
// the numbers stay consistent.
interface ScoreInputs {
  hits: number;
  weightedHits: number;
  visitors: number;
  botHits: number;
  recentHits: number;
  real: number;
}
const computeSpoofScore = (i: ScoreInputs): number => {
  if (i.weightedHits <= 0) return 0;
  const mismatch = Math.max(0, i.weightedHits - i.real) / i.weightedHits;
  const volume = Math.min(1, i.weightedHits / 8);
  const duplication = i.hits > 0 ? 1 - i.visitors / i.hits : 0;
  const botShare = i.hits > 0 ? i.botHits / i.hits : 0;
  const recency = i.hits > 0 ? i.recentHits / i.hits : 0;
  const blend =
    0.4 + 0.15 * volume + 0.15 * duplication + 0.2 * botShare + 0.1 * recency;
  return Math.round(100 * mismatch * blend);
};

// Distinct hues for up to 6 page lines on the time-series chart. Uses
// existing section design tokens so colours stay on-brand.
const PAGE_LINE_COLORS = [
  "hsl(var(--destructive))",
  "hsl(var(--physiology))",
  "hsl(var(--pharmacology))",
  "hsl(var(--clinical))",
  "hsl(var(--icu))",
  "hsl(var(--perioperative))",
];
const TRAILING_WINDOW_DAYS = 7;
const CHART_PAGE_OPTIONS = [5, 10, 20] as const;
type ChartPageSize = (typeof CHART_PAGE_OPTIONS)[number];

export const SearchVsReferrerPanel = () => {
  const [gsc, setGsc] = useState<GscPayload | null>(null);
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - RANGE_DAYS * 24 * 60 * 60 * 1000);
    const sinceIso = since.toISOString();

    const [gscRes, visitsRes] = await Promise.all([
      supabase.functions.invoke<GscPayload>("gsc-search-analytics", {
        body: { days: RANGE_DAYS },
      }),
      supabase
        .from("app_visits")
        .select("visited_at,page_path,referrer,visitor_id,user_agent")
        .gte("visited_at", sinceIso)
        .or("referrer.ilike.%google%,referrer.ilike.%.google.%")
        .order("visited_at", { ascending: false })
        .limit(20000),
    ]);

    if (gscRes.error) {
      setError(gscRes.error.message);
    } else if (gscRes.data) {
      setGsc(gscRes.data);
    }
    if (visitsRes.error) {
      setError((prev) => prev ?? visitsRes.error!.message);
    }
    setVisits((visitsRes.data as VisitRow[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  // -- aggregates -----------------------------------------------------------

  const realClicksByDay = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of gsc?.byDate ?? []) m.set(r.date, r.clicks);
    return m;
  }, [gsc]);

  const spoofByDay = useMemo(() => {
    const m = new Map<string, number>();
    for (const v of visits) {
      const day = v.visited_at.slice(0, 10);
      m.set(day, (m.get(day) ?? 0) + 1);
    }
    return m;
  }, [visits]);

  const dailyRows = useMemo(() => {
    const days: { date: string; real: number; referrer: number; suspected: number }[] = [];
    for (let i = RANGE_DAYS - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      const real = realClicksByDay.get(d) ?? 0;
      const referrer = spoofByDay.get(d) ?? 0;
      days.push({ date: d, real, referrer, suspected: Math.max(0, referrer - real) });
    }
    return days;
  }, [realClicksByDay, spoofByDay]);

  const totals = useMemo(() => {
    const real = dailyRows.reduce((s, r) => s + r.real, 0);
    const referrer = dailyRows.reduce((s, r) => s + r.referrer, 0);
    const impressions = (gsc?.byDate ?? []).reduce((s, r) => s + r.impressions, 0);
    return { real, referrer, suspected: Math.max(0, referrer - real), impressions };
  }, [dailyRows, gsc]);

  const topPages = useMemo(() => {
    return (gsc?.byPage ?? [])
      .slice()
      .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
      .slice(0, 15)
      .map((r) => ({ ...r, path: pathOf(r.page) }));
  }, [gsc]);

  const topQueries = useMemo(() => {
    return (gsc?.byQuery ?? [])
      .slice()
      .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
      .slice(0, 15);
  }, [gsc]);

  const spoofedPages = useMemo(() => {
    // Score 0–100 per page. Combines five normalised factors so we can
    // prioritise pages that look most like spoofed / bot traffic rather
    // than just sorting by raw gap.
    //
    //   mismatch    weight 0.40  — fraction of weighted referrer hits not
    //                              explained by real GSC clicks
    //   volume      weight 0.15  — confidence that the sample is big enough
    //                              to be more than noise (full at ~8 hits)
    //   duplication weight 0.15  — share of hits from repeat visitor_ids
    //   bot UA      weight 0.20  — share of hits with a bot/crawler UA
    //                              (or no UA at all)
    //   recency     weight 0.10  — boost for hits clustered in the last
    //                              ~14 days (half-life decay)
    //
    // Hits are weighted by a 14-day half-life decay so a noisy old burst
    // doesn't outrank an active one.
    const realByPath = new Map<string, number>();
    for (const r of gsc?.byPage ?? []) {
      const p = pathOf(r.page);
      realByPath.set(p, (realByPath.get(p) ?? 0) + r.clicks);
    }
    const now = Date.now();
    type Bucket = {
      hits: number;
      weightedHits: number;
      visitors: Set<string>;
      botHits: number;
      recentHits: number; // hits within the last half-life window
    };
    const refByPath = new Map<string, Bucket>();
    for (const v of visits) {
      const p = stripQueryAndHash(v.page_path);
      const w = recencyWeight(v.visited_at, now);
      const cur =
        refByPath.get(p) ??
        ({ hits: 0, weightedHits: 0, visitors: new Set<string>(), botHits: 0, recentHits: 0 } as Bucket);
      cur.hits += 1;
      cur.weightedHits += w;
      cur.visitors.add(v.visitor_id);
      if (isBotUserAgent(v.user_agent)) cur.botHits += 1;
      if (w >= 0.5) cur.recentHits += 1;
      refByPath.set(p, cur);
    }
    const rows: {
      path: string;
      referrer: number;
      weighted: number;
      real: number;
      visitors: number;
      botShare: number;
      score: number;
      reasons: string[];
    }[] = [];
    for (const [path, b] of refByPath) {
      const real = realByPath.get(path) ?? 0;
      const v = b.visitors.size;

      const score = computeSpoofScore({
        hits: b.hits,
        weightedHits: b.weightedHits,
        visitors: v,
        botHits: b.botHits,
        recentHits: b.recentHits,
        real,
      });
      const mismatch =
        b.weightedHits > 0
          ? Math.max(0, b.weightedHits - real) / b.weightedHits
          : 0;
      const duplication = b.hits > 0 ? 1 - v / b.hits : 0;
      const botShare = b.hits > 0 ? b.botHits / b.hits : 0;
      const recency = b.hits > 0 ? b.recentHits / b.hits : 0;

      const reasons: string[] = [];
      if (mismatch >= 0.9 && b.hits >= 3) reasons.push("no matching GSC clicks");
      else if (mismatch >= 0.5) reasons.push("more referrer hits than GSC clicks");
      if (botShare >= 0.5) reasons.push(`bot UA ${Math.round(botShare * 100)}%`);
      if (duplication >= 0.5 && b.hits >= 4)
        reasons.push(`repeat visitors ${Math.round(duplication * 100)}%`);
      if (recency >= 0.6 && b.hits >= 4) reasons.push("recent surge");
      if (b.hits < 3) reasons.push("low sample");

      rows.push({
        path,
        referrer: b.hits,
        weighted: Math.round(b.weightedHits * 10) / 10,
        real,
        visitors: v,
        botShare,
        score,
        reasons,
      });
    }
    return rows.sort((a, b) => b.score - a.score || b.referrer - a.referrer);
  }, [gsc, visits]);

  // ── 30-day per-page spoofing-confidence series ─────────────────────────
  //
  // For each of the top spoof-suspect pages, compute a daily score using
  // a trailing 7-day rolling window so the line is smooth enough to spot
  // when spoofing starts or stops. Per-day real GSC clicks come from the
  // `byPageDate` dimension; bot UA / visitor data come from app_visits.
  const { pageSeries, pageSeriesPaths, botRateSeries } = useMemo(() => {
    const topPaths = spoofedPages.slice(0, MAX_CHART_PAGES).map((p) => p.path);
    const pathSet = new Set(topPaths);

    // Index app_visits by (path → array of {ts, weight, visitor, bot}).
    const visitsByPath = new Map<
      string,
      { ts: number; visitor: string; bot: boolean }[]
    >();
    for (const v of visits) {
      const p = stripQueryAndHash(v.page_path);
      if (!pathSet.has(p)) continue;
      const arr = visitsByPath.get(p) ?? [];
      arr.push({
        ts: new Date(v.visited_at).getTime(),
        visitor: v.visitor_id,
        bot: isBotUserAgent(v.user_agent),
      });
      visitsByPath.set(p, arr);
    }

    // Index GSC clicks by (path → date → clicks).
    const gscByPathDate = new Map<string, Map<string, number>>();
    for (const r of gsc?.byPageDate ?? []) {
      const p = pathOf(r.page);
      if (!pathSet.has(p)) continue;
      const m = gscByPathDate.get(p) ?? new Map<string, number>();
      m.set(r.date, (m.get(r.date) ?? 0) + r.clicks);
      gscByPathDate.set(p, m);
    }

    const days: string[] = [];
    for (let i = RANGE_DAYS - 1; i >= 0; i--) {
      days.push(
        new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      );
    }

    // Daily site-wide bot UA rate among google-referrer visits.
    const botRate = days.map((d) => {
      const same = visits.filter((v) => v.visited_at.slice(0, 10) === d);
      const total = same.length;
      const bots = same.filter((v) => isBotUserAgent(v.user_agent)).length;
      return {
        date: d,
        rate: total === 0 ? 0 : Math.round((bots / total) * 100),
        sample: total,
      };
    });

    // Per-day score for each tracked page using a trailing window.
    const rows: Record<string, number | string>[] = days.map((d) => {
      const row: Record<string, number | string> = { date: d };
      const dayEnd = new Date(d + "T23:59:59Z").getTime();
      const windowStart = dayEnd - TRAILING_WINDOW_DAYS * 24 * 60 * 60 * 1000;
      const recencyCutoff = dayEnd - 2 * 24 * 60 * 60 * 1000; // "recent" = last 2 days of window
      for (const path of topPaths) {
        const vs = (visitsByPath.get(path) ?? []).filter(
          (x) => x.ts >= windowStart && x.ts <= dayEnd,
        );
        const visitors = new Set(vs.map((x) => x.visitor));
        const botHits = vs.filter((x) => x.bot).length;
        const recentHits = vs.filter((x) => x.ts >= recencyCutoff).length;
        const weightedHits = vs.reduce(
          (s, x) =>
            s + Math.pow(0.5, (dayEnd - x.ts) / (DECAY_HALF_LIFE_DAYS * 86400000)),
          0,
        );
        // Real GSC clicks for the page over the same trailing window.
        let real = 0;
        const m = gscByPathDate.get(path);
        if (m) {
          for (let i = 0; i < TRAILING_WINDOW_DAYS; i++) {
            const dd = new Date(dayEnd - i * 86400000).toISOString().slice(0, 10);
            real += m.get(dd) ?? 0;
          }
        }
        row[path] = computeSpoofScore({
          hits: vs.length,
          weightedHits,
          visitors: visitors.size,
          botHits,
          recentHits,
          real,
        });
      }
      return row;
    });

    return { pageSeries: rows, pageSeriesPaths: topPaths, botRateSeries: botRate };
  }, [spoofedPages, visits, gsc]);

  const maxClicks = Math.max(1, ...topPages.map((p) => p.clicks));
  const maxQueryClicks = Math.max(1, ...topQueries.map((q) => q.clicks));
  const maxDaily = Math.max(1, ...dailyRows.map((d) => Math.max(d.real, d.referrer)));

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6 mt-6">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-physiology" aria-hidden />
          <h2 className="text-lg font-semibold text-foreground">
            Real Google clicks vs referrer-spoof traffic
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
        Last {RANGE_DAYS} days · Search Console is ground truth; in-app visits
        with a <code>google.com</code> referrer are compared against it.
      </p>

      {error && (
        <p className="text-sm text-destructive mb-3">
          Couldn’t load Search Console data: {error}
        </p>
      )}

      {/* ── headline tiles ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Tile
          icon={<MousePointerClick className="h-4 w-4 text-physiology" />}
          label="Real Google clicks"
          value={totals.real}
          sub={`${totals.impressions.toLocaleString()} impressions`}
        />
        <Tile
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
          label="google.com referrer visits"
          value={totals.referrer}
          sub="from app_visits"
        />
        <Tile
          icon={<Bot className="h-4 w-4 text-destructive" />}
          label="Suspected bot floor"
          value={totals.suspected}
          sub={
            totals.referrer === 0
              ? "—"
              : `${Math.round((totals.suspected / totals.referrer) * 100)}% of google referrer hits`
          }
          tone="warn"
        />
        <Tile
          icon={<MousePointerClick className="h-4 w-4 text-pharmacology" />}
          label="Real clicks per day"
          value={(totals.real / RANGE_DAYS).toFixed(1)}
          sub={`avg over ${RANGE_DAYS} days`}
        />
      </div>

      {/* ── daily comparison ──────────────────────────────────────────── */}
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
          Daily breakdown
        </h3>
        <div className="rounded border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="text-left px-3 py-1.5 font-medium">Day</th>
                <th className="text-right px-3 py-1.5 font-medium">Real GSC</th>
                <th className="text-right px-3 py-1.5 font-medium">google.com referrer</th>
                <th className="text-left px-3 py-1.5 font-medium w-1/2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-physiology" /> real
                    <span className="h-2 w-2 rounded-sm bg-muted ml-2" /> referrer
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {dailyRows.map((r) => (
                <tr key={r.date} className="border-t border-border">
                  <td className="px-3 py-1 tabular-nums text-muted-foreground">
                    {fmtDay(r.date)}
                  </td>
                  <td className="px-3 py-1 text-right tabular-nums text-foreground font-medium">
                    {r.real}
                  </td>
                  <td className="px-3 py-1 text-right tabular-nums">
                    <span className={r.suspected > 0 ? "text-destructive" : ""}>
                      {r.referrer}
                    </span>
                  </td>
                  <td className="px-3 py-1">
                    <div className="flex items-center gap-1 h-3">
                      <span
                        className="h-2 rounded-sm bg-physiology"
                        style={{ width: `${(r.real / maxDaily) * 100}%` }}
                        aria-label={`${r.real} real clicks`}
                      />
                      <span
                        className="h-2 rounded-sm bg-muted-foreground/40"
                        style={{ width: `${(r.referrer / maxDaily) * 100}%` }}
                        aria-label={`${r.referrer} referrer visits`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── side-by-side: pages + queries ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            Top pages by real Google clicks
          </h3>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No clicks recorded in window.</p>
          ) : (
            <ul className="space-y-1">
              {topPages.map((p) => (
                <li key={p.page} className="text-sm">
                  <a
                    href={p.path}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:bg-muted/40 rounded px-2 py-1 transition-colors"
                  >
                    <span className="flex-1 min-w-0 truncate text-foreground">
                      {p.path}
                    </span>
                    <span className="tabular-nums text-xs text-muted-foreground w-8 text-right">
                      {p.clicks}
                    </span>
                    <span
                      className="h-1.5 rounded-full bg-physiology/60"
                      style={{ width: `${Math.max(6, (p.clicks / maxClicks) * 100)}px` }}
                      aria-hidden
                    />
                  </a>
                  <div className="px-2 text-[10px] text-muted-foreground tabular-nums">
                    pos {p.position.toFixed(1)} · {p.impressions.toLocaleString()} impr ·
                    CTR {(p.ctr * 100).toFixed(1)}%
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            Top queries by real Google clicks
          </h3>
          {topQueries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No clicks recorded in window — try expanding the date range or check
              GSC ranking position.
            </p>
          ) : (
            <ul className="space-y-1">
              {topQueries.map((q) => (
                <li key={q.query} className="text-sm">
                  <div className="flex items-center gap-3 px-2 py-1">
                    <span className="flex-1 min-w-0 truncate text-foreground">
                      {q.query}
                    </span>
                    <span className="tabular-nums text-xs text-muted-foreground w-8 text-right">
                      {q.clicks}
                    </span>
                    <span
                      className="h-1.5 rounded-full bg-pharmacology/60"
                      style={{ width: `${Math.max(6, (q.clicks / maxQueryClicks) * 100)}px` }}
                      aria-hidden
                    />
                  </div>
                  <div className="px-2 text-[10px] text-muted-foreground tabular-nums">
                    pos {q.position.toFixed(1)} · {q.impressions.toLocaleString()} impr ·
                    CTR {(q.ctr * 100).toFixed(1)}%
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── 30-day spoofing confidence trend ───────────────────────────── */}
      {pageSeriesPaths.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <LineChartIcon className="h-4 w-4 text-physiology" aria-hidden />
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Spoofing confidence trend · top {pageSeriesPaths.length} pages
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Trailing {TRAILING_WINDOW_DAYS}-day rolling score per page. Spikes
            mark when spoofing started; sustained drops to 0 mean it has
            stopped. Same 0–100 formula as the table below.
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pageSeries} margin={{ top: 5, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tickFormatter={fmtDay}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  interval="preserveStartEnd"
                  minTickGap={24}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 6,
                    fontSize: 11,
                  }}
                  labelFormatter={(d) => fmtDay(String(d))}
                  formatter={(value: number, name: string) => [`${value}/100`, name]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 10 }}
                  formatter={(value: string) =>
                    value.length > 32 ? "…" + value.slice(-31) : value
                  }
                />
                {pageSeriesPaths.map((path, idx) => (
                  <Line
                    key={path}
                    type="monotone"
                    dataKey={path}
                    name={path}
                    stroke={PAGE_LINE_COLORS[idx % PAGE_LINE_COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bot UA rate across all spoof-suspect visits */}
          <details className="mt-3 text-xs text-muted-foreground">
            <summary className="cursor-pointer text-foreground hover:underline inline-flex items-center gap-1.5">
              <Bot className="h-3.5 w-3.5" /> Daily bot-UA rate across all
              google-referrer visits
            </summary>
            <div className="h-40 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={botRateSeries}
                  margin={{ top: 5, right: 16, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={fmtDay}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    interval="preserveStartEnd"
                    minTickGap={24}
                  />
                  <YAxis
                    domain={[0, 100]}
                    unit="%"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    width={36}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 6,
                      fontSize: 11,
                    }}
                    labelFormatter={(d) => fmtDay(String(d))}
                    formatter={(value: number) => [`${value}%`, "Bot UA share"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1">
              Only counts visits logged after the <code>user_agent</code>
              column was added; earlier days will read ≈100% (UA missing).
            </p>
          </details>
        </div>
      )}

      {/* ── spoofed pages ─────────────────────────────────────────────── */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
          Spoofing confidence by page
        </h3>
        <p className="text-xs text-muted-foreground mb-2">
          Score 0–100 — higher means the referrer-Google traffic is less
          likely to be real organic search and more worth investigating.
        </p>
        <details className="mb-3 text-xs text-muted-foreground">
          <summary className="cursor-pointer text-foreground hover:underline">
            How is this score calculated?
          </summary>
          <div className="mt-2 rounded border border-border bg-muted/30 p-3 space-y-2">
            <p>
              Each page bucketed from <code>app_visits</code> with a
              <code> google.* </code> referrer is scored on five factors,
              normalised 0–1 and blended into one number out of 100.
              Mismatch acts as a gate — if real GSC clicks explain the
              hits, the score collapses to 0 regardless of the rest.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="text-foreground font-medium">Mismatch ×0.40 (gate)</span> —
                fraction of recency-weighted referrer hits not explained
                by real Search Console clicks for the same page.
              </li>
              <li>
                <span className="text-foreground font-medium">Volume ×0.15</span> —
                ramps to full confidence at ~8 weighted hits so a single
                orphan visit can’t score high.
              </li>
              <li>
                <span className="text-foreground font-medium">Duplication ×0.15</span> —
                share of hits from repeated <code>visitor_id</code>s; real
                organic traffic is mostly unique visitors.
              </li>
              <li>
                <span className="text-foreground font-medium">Bot user-agent ×0.20</span> —
                share of hits whose <code>User-Agent</code> matches known
                crawler tokens (bot, headless, curl, python-requests,
                ahrefs, gptbot, …) or is missing entirely.
              </li>
              <li>
                <span className="text-foreground font-medium">Recency ×0.10</span> —
                share of hits within the last 14 days (half-life decay
                τ=14d applied to all hit weighting). Live spoofing
                outranks an old burst.
              </li>
            </ul>
            <p>
              Query-level confidence isn’t shown because{" "}
              <code>app_visits</code> doesn’t carry the source query —
              only the referrer URL, which is what gets spoofed. Bot UA
              data is only available for visits logged after this column
              was added; older rows count as “UA missing” (still a bot
              signal).
            </p>
          </div>
        </details>
        {spoofedPages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No referrer-google visits recorded.
          </p>
        ) : (
          <div className="rounded border border-border overflow-hidden overflow-x-auto">
            <table className="w-full text-xs min-w-[720px]">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="text-left px-3 py-1.5 font-medium">Page</th>
                  <th className="text-right px-3 py-1.5 font-medium" title="Raw referrer hits in 30d window">
                    Hits
                  </th>
                  <th className="text-right px-3 py-1.5 font-medium" title="Recency-weighted hits (14-day half-life)">
                    Weighted
                  </th>
                  <th className="text-right px-3 py-1.5 font-medium">Visitors</th>
                  <th className="text-right px-3 py-1.5 font-medium" title="Share of hits with bot-like or missing User-Agent">
                    Bot UA
                  </th>
                  <th className="text-right px-3 py-1.5 font-medium">Real GSC</th>
                  <th className="text-left px-3 py-1.5 font-medium w-[220px]">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {spoofedPages.map((r) => {
                  const tone =
                    r.score >= 75
                      ? "bg-destructive text-destructive-foreground"
                      : r.score >= 50
                        ? "bg-physiology/80 text-white"
                        : r.score >= 25
                          ? "bg-muted-foreground/60 text-white"
                          : "bg-muted text-muted-foreground";
                  return (
                    <tr key={r.path} className="border-t border-border">
                      <td className="px-3 py-1 truncate max-w-[240px]">
                        <a
                          href={r.path}
                          target="_blank"
                          rel="noreferrer"
                          className="text-foreground hover:underline inline-flex items-center gap-1"
                        >
                          {r.path} <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      </td>
                      <td className="px-3 py-1 text-right tabular-nums">{r.referrer}</td>
                      <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                        {r.weighted}
                      </td>
                      <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                        {r.visitors}
                      </td>
                      <td
                        className={`px-3 py-1 text-right tabular-nums ${
                          r.botShare >= 0.5 ? "text-destructive font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {Math.round(r.botShare * 100)}%
                      </td>
                      <td className="px-3 py-1 text-right tabular-nums">{r.real}</td>
                      <td className="px-3 py-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`inline-flex items-center justify-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${tone}`}
                            aria-label={`Spoofing confidence ${r.score} of 100`}
                          >
                            {r.score}
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate">
                            {r.reasons.join(" · ") || "—"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

const Tile = ({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub: string;
  tone?: "warn";
}) => (
  <div
    className={`rounded-md border bg-background px-3 py-2 ${
      tone === "warn" ? "border-destructive/40" : "border-border"
    }`}
  >
    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wide">
      {icon}
      <span>{label}</span>
    </div>
    <div className="mt-1 text-2xl font-semibold text-foreground tabular-nums">
      {typeof value === "number" ? value.toLocaleString() : value}
    </div>
    <div className="text-[11px] text-muted-foreground">{sub}</div>
  </div>
);

export default SearchVsReferrerPanel;
