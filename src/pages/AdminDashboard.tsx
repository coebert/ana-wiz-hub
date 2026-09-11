import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { allTopics } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LogOut, Users, CalendarDays, TrendingUp, RefreshCw, BookOpen, BarChart3, CheckCircle2, UserPlus, Repeat, Clock, Activity, Layers, Globe, CalendarIcon, Search, Link2, Share2, MousePointerClick, Headphones, Mic2, Map as MapIcon, Info, UserCheck } from "lucide-react";
import VisitorsWorldMap from "@/components/admin/VisitorsWorldMap";
import SeoAnalyticsPanel from "@/components/admin/SeoAnalyticsPanel";
import SpoofedDomainsPanel from "@/components/admin/SpoofedDomainsPanel";
import WebVitalsPanel from "@/components/admin/WebVitalsPanel";
import JumpClicksPanel from "@/components/admin/JumpClicksPanel";
import SearchVsReferrerPanel from "@/components/admin/SearchVsReferrerPanel";

/** Format a number of seconds as "Hh Mm" or "Mm Ss" for compact display. */
function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return "0m";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  const s = Math.floor(totalSeconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

/** Round a number up to a "nice" axis maximum (1, 2, 5 × 10^n). */
function niceMax(n: number): number {
  if (!n || n <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(n)));
  const f = n / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nice * exp;
}

/** Vertical Y-axis labels (5 evenly-spaced ticks from max down to 0). */
function ChartYAxis({ max, heightClass }: { max: number; heightClass: string }) {
  const ticks = [1, 0.75, 0.5, 0.25, 0].map(f => Math.round(max * f));
  return (
    <div
      className={`flex flex-col justify-between ${heightClass} text-[10px] text-muted-foreground tabular-nums pr-1 text-right shrink-0 min-w-[1.75rem]`}
      aria-hidden="true"
    >
      {ticks.map((t, i) => <span key={i} className="leading-none">{t}</span>)}
    </div>
  );
}

/** Horizontal gridlines behind a chart's bar area (4 lines at 25/50/75/100%). */
const chartGridStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to top, hsl(var(--border)) 1px, transparent 1px)",
  backgroundSize: "100% 25%",
  backgroundPosition: "0 100%",
  backgroundRepeat: "repeat-y",
};

/** Simple SVG line chart for a daily count series. */
function DailyTrendLineChart({ data, color = "var(--primary)", strokeWidth = 2, height = 160 }: {
  data: { date: string; count: number }[];
  color?: string;
  strokeWidth?: number;
  height?: number;
}) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No data yet.</p>;
  const max = niceMax(Math.max(...data.map(d => d.count), 1));
  const width = 1000;
  const padding = { top: 16, right: 24, bottom: 28, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xFor = (i: number) => padding.left + (chartWidth / (data.length - 1)) * i;
  const yFor = (count: number) => padding.top + chartHeight - (count / max) * chartHeight;
  const points = data.map((d, i) => `${xFor(i)},${yFor(d.count)}`).join(" ");
  const ticks = [1, 0.75, 0.5, 0.25, 0].map(f => Math.round(max * f));

  return (
    <div className="flex gap-2">
      <div className={`flex flex-col justify-between h-40 text-[10px] text-muted-foreground tabular-nums pr-1 text-right shrink-0 min-w-[1.75rem]`} aria-hidden="true">
        {ticks.map((t, i) => <span key={i} className="leading-none">{t}</span>)}
      </div>
      <div className="flex-1 relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-40"
          preserveAspectRatio="none"
          role="img"
          aria-label={`Line chart of daily non-bot active users. ${data.map(d => `${d.date}: ${d.count}`).join(", ")}.`}
        >
          {/* horizontal gridlines */}
          {ticks.map((_, i) => {
            const y = padding.top + (chartHeight / 4) * i;
            return (
              <line
                key={i}
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}
          {/* trend line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * (1000 / width)}
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          {/* data points */}
          {data.map((d, i) => (
            <g key={d.date}>
              <circle
                cx={xFor(i)}
                cy={yFor(d.count)}
                r={5}
                fill="hsl(var(--card))"
                stroke={color}
                strokeWidth={strokeWidth}
              />
              <title>{`${d.date}: ${d.count} non-bot daily active users`}</title>
            </g>
          ))}
        </svg>
        <div className="flex justify-between text-[10px] text-muted-foreground px-1">
          <span>{data[0]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </div>
    </div>
  );
}



/** Convert an ISO 3166-1 alpha-2 country code (e.g. "GB") to its flag emoji. */
function countryFlag(code: string | null | undefined): string {
  if (!code || code.length !== 2) return "";
  const cc = code.toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + cc.charCodeAt(0) - 65, A + cc.charCodeAt(1) - 65);
}

/**
 * Regex matching known bot / crawler / monitor user-agent signatures.
 * Kept at module scope so overview stats, per-country tables, and drill-downs
 * all apply the same exclusion rules. `yandex` alone would also match
 * `YandexBrowser` (a real end-user browser), so we target `yandexbot`.
 */
const BOT_UA_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|pingdom|uptimerobot|monitor|headless|phantomjs|puppeteer|playwright|lighthouse|ahrefsbot|semrush|dataforseo|petalbot|yandexbot|duckduckbot|baiduspider|applebot|gptbot|ccbot|claudebot|perplexity/i;

/**
 * Build the set of visitor_ids that look like real humans: they must have sent
 * at least one User-Agent header, and none of their UAs may match BOT_UA_RE.
 * Visitors with no UA at all (can't confirm human) are excluded.
 */
function buildNonBotVisitorSet(
  visits: ReadonlyArray<{ visitor_id: string; user_agent?: string | null }>,
): Set<string> {
  const state = new Map<string, { hasUA: boolean; anyBot: boolean }>();
  visits.forEach(v => {
    const rawUa = (v as { user_agent?: unknown }).user_agent;
    const ua = typeof rawUa === "string" ? rawUa.trim() : "";
    const cur = state.get(v.visitor_id) ?? { hasUA: false, anyBot: false };
    if (ua.length > 0) {
      cur.hasUA = true;
      if (BOT_UA_RE.test(ua)) cur.anyBot = true;
    }
    state.set(v.visitor_id, cur);
  });
  const out = new Set<string>();
  state.forEach((v, id) => { if (v.hasUA && !v.anyBot) out.add(id); });
  return out;
}

type TrafficSource = "direct" | "search" | "social" | "referral";

const TRAFFIC_SOURCE_META: Record<TrafficSource, { label: string; help: string; icon: typeof Search; color: string }> = {
  search:   { label: "Search engines", help: "Visitors who arrived via Google, Bing, DuckDuckGo, etc.", icon: Search,             color: "text-blue-500" },
  direct:   { label: "Direct",         help: "Bookmarks, typed URL, or app links — no referrer header.",  icon: MousePointerClick, color: "text-emerald-500" },
  social:   { label: "Social",         help: "Visitors arriving from a social network or messenger.",     icon: Share2,            color: "text-pink-500" },
  referral: { label: "Other sites",    help: "Visitors who clicked a link on another website.",           icon: Link2,             color: "text-amber-500" },
};

interface TopicStat {
  id: string;
  title: string;
  section: string;
  views: number;
  uniqueVisitors: number;
}

interface Analytics {
  totalUniqueUsers: number;
  totalNonBotUsers: number;
  dailyUsers: number;
  weeklyUsers: number;
  monthlyUsers: number;
  newUsersToday: number;
  returningUsers: number;
  returningPct: number;
  avgPagesPerUser: number;
  avgVisitsPerActiveDay: number;
  peakHourLabel: string;
  peakHourCount: number;
  totalVisits: number;
  todayVisits: number;
  last7Days: { date: string; count: number }[];
  last7DaysNonBot: { date: string; count: number }[];
  last30Days: { date: string; count: number }[];
  last30DaysNonBot: { date: string; count: number }[];
  hourlyToday: { hour: number; count: number }[];
  // All visit timestamps in the current dashboard range — used to recompute
  // the hour-of-day chart for any sub-window the user picks.
  visitTimestamps: string[];
  rangeStart: string | null;
  rangeEnd: string | null;
  topEntryPaths: { path: string; count: number }[];
  topUsers: { visitorId: string; visits: number; activeDays: number; firstSeen: string; lastSeen: string; country: string | null; countryName: string | null; trafficSource: TrafficSource | null }[];
  topCountries: { country: string; countryName: string; users: number; visits: number }[];
  trafficSources: { source: TrafficSource; users: number; visits: number; usersPct: number }[];
  topReferrers: { host: string; users: number; visits: number; source: TrafficSource }[];
  topTopics: TopicStat[];
  sectionBreakdown: { section: string; views: number }[];
  retentionCohorts: {
    cohortStart: string;
    cohortLabel: string;
    size: number;
    d1: number | null;
    d7: number | null;
    d30: number | null;
    d1Pct: number | null;
    d7Pct: number | null;
    d30Pct: number | null;
  }[];
  podcasts: {
    total: number;
    ready: number;
    pending: number;
    failed: number;
    totalSeconds: number;
    pageViews: number;
    uniqueListeners: number;
    inRangeGenerated: number;
    recent: { topicTitle: string; topicId: string; status: string; durationSeconds: number | null; createdAt: string }[];
    topByViews: { topicTitle: string; topicId: string; views: number }[];
  };
  viva: {
    totalCachedAnswers: number;
    uniqueTopics: number;
    byExam: { exam: string; count: number }[];
    pageViews: number;
    uniqueUsers: number;
    inRangeGenerated: number;
    recent: { topicTitle: string; exam: string; createdAt: string }[];
  };
}

const sectionLabels: Record<string, string> = {
  physics: "Physics",
  physiology: "Physiology",
  pharmacology: "Pharmacology",
  anatomy: "Anatomy",
  clinical: "Clinical",
  "intensive-care": "Intensive Care",
  perioperative: "Perioperative",
};

const sectionColors: Record<string, string> = {
  physics: "bg-blue-500",
  physiology: "bg-rose-500",
  pharmacology: "bg-emerald-500",
  anatomy: "bg-amber-500",
  clinical: "bg-violet-500",
  "intensive-care": "bg-cyan-500",
  perioperative: "bg-pink-500",
};

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<number | null>(null);
  const [confirmedUsers, setConfirmedUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "topics" | "seo">("overview");
  const [mapMetric, setMapMetric] = useState<"users" | "visits">("users");
  // Raw visits kept for sub-range filtering (e.g. top countries)
  const [allVisits, setAllVisits] = useState<{ visitor_id: string; visited_at: string; country?: string | null; country_name?: string | null; user_agent?: string | null }[]>([]);
  const [countriesDateRange, setCountriesDateRange] = useState<"all" | "today" | "7d" | "30d">("all");
  const [drillCountry, setDrillCountry] = useState<{ code: string; name: string } | null>(null);

  // Formulary verification + ESICM dose validator have moved to the unified
  // Content Audit page at /admin/audit so that all topic-accuracy checks are
  // started, monitored, and reviewed from one place.


  // Route protection lives in <RequireAdmin>. A duplicate guard here used
  // to race the auth state after sign-in and bounce fresh admins back to
  // /admin/login "a few seconds after logging in".


  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  const fetchAnalytics = async (rangeFrom?: Date | null, rangeTo?: Date | null) => {
    setLoading(true);
    const from = rangeFrom === null ? undefined : (rangeFrom ?? dateFrom);
    const to = rangeTo === null ? undefined : (rangeTo ?? dateTo);
    // `now` is treated as the end of the analysis window (range end, or actual now)
    const now = to ? new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999) : new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const rangeStartIso = from ? new Date(from.getFullYear(), from.getMonth(), from.getDate()).toISOString() : null;
    const rangeEndIso = to ? now.toISOString() : null;

    // Paginate around the PostgREST max-rows cap (default 1000) so counters
    // don't silently stall once the visits table grows past that.
    const PAGE = 1000;
    const fetchAllVisits = async <T,>(
      columns: string,
      applyFilters: (q: any) => any,
    ): Promise<T[]> => {
      const out: T[] = [];
      for (let offset = 0; ; offset += PAGE) {
        let q: any = supabase.from("app_visits").select(columns);
        q = applyFilters(q).order("visited_at", { ascending: true }).range(offset, offset + PAGE - 1);
        const { data, error } = await q;
        if (error) { console.warn("[admin] fetch visits failed", error.message); break; }
        const rows = (data ?? []) as T[];
        out.push(...rows);
        if (rows.length < PAGE) break;
      }
      return out;
    };

    const visits = await fetchAllVisits<{
      visitor_id: string;
      visited_at: string;
      page_path: string | null;
      country: string | null;
      country_name: string | null;
      referrer: string | null;
      traffic_source: string | null;
    }>("visitor_id, visited_at, page_path, country, country_name, referrer, traffic_source, user_agent", (q) => {
      let qq = q;
      if (rangeStartIso) qq = qq.gte("visited_at", rangeStartIso);
      if (rangeEndIso) qq = qq.lte("visited_at", rangeEndIso);
      return qq;
    });
    const uniqueVisitors = new Set(visits.map(v => v.visitor_id));

    // Non-bot users: visitors whose user_agent never matches known bot/crawler
    // signatures. A visitor with any bot-looking UA is excluded, and visitors
    // with no UA at all are also excluded (can't confirm they're human).
    // Note: `yandex` alone would also match `YandexBrowser` (a real end-user
    // browser), so we target `yandexbot` specifically.
    const BOT_UA_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|pingdom|uptimerobot|monitor|headless|phantomjs|puppeteer|playwright|lighthouse|ahrefsbot|semrush|dataforseo|petalbot|yandexbot|duckduckbot|baiduspider|applebot|gptbot|ccbot|claudebot|perplexity/i;
    const uaByVisitor = new Map<string, { hasUA: boolean; anyBot: boolean }>();
    visits.forEach(v => {
      const rawUa = (v as { user_agent?: unknown }).user_agent;
      const ua = typeof rawUa === "string" ? rawUa.trim() : "";
      const cur = uaByVisitor.get(v.visitor_id) ?? { hasUA: false, anyBot: false };
      if (ua.length > 0) {
        cur.hasUA = true;
        if (BOT_UA_RE.test(ua)) cur.anyBot = true;
      }
      uaByVisitor.set(v.visitor_id, cur);
    });
    let totalNonBotUsers = 0;
    uaByVisitor.forEach(v => { if (v.hasUA && !v.anyBot) totalNonBotUsers += 1; });

    const todayData = await fetchAllVisits<{
      visitor_id: string;
      visited_at: string;
      user_agent: string | null;
    }>("visitor_id, visited_at, user_agent", (q) =>
      q.gte("visited_at", todayStart).lte("visited_at", now.toISOString()),
    );
    const todayNonBotVisitorIds = buildNonBotVisitorSet(todayData);
    const todayUnique = todayNonBotVisitorIds;


    const normaliseSource = (s: string | null | undefined): TrafficSource | null => {
      if (!s) return null;
      const v = s.toLowerCase();
      if (v === "search" || v === "direct" || v === "social" || v === "referral") return v;
      return null;
    };

    // First-seen timestamp per visitor → used for new-vs-returning split
    const firstSeen = new Map<string, string>();
    const visitsPerUser = new Map<string, number>();
    const activeDaysPerUser = new Map<string, Set<string>>();
    const lastSeen = new Map<string, string>();
    // Per-visitor country tallies → pick the most-frequent country as their "origin"
    const userCountryCounts = new Map<string, Map<string, { name: string; count: number }>>();
    // Per-visitor traffic-source tallies → pick the most-frequent as their "acquisition channel"
    const userSourceCounts = new Map<string, Map<TrafficSource, number>>();
    visits.forEach(v => {
      const prev = firstSeen.get(v.visitor_id);
      if (!prev || v.visited_at < prev) firstSeen.set(v.visitor_id, v.visited_at);
      const prevLast = lastSeen.get(v.visitor_id);
      if (!prevLast || v.visited_at > prevLast) lastSeen.set(v.visitor_id, v.visited_at);
      visitsPerUser.set(v.visitor_id, (visitsPerUser.get(v.visitor_id) || 0) + 1);
      const day = v.visited_at.slice(0, 10);
      if (!activeDaysPerUser.has(v.visitor_id)) activeDaysPerUser.set(v.visitor_id, new Set());
      activeDaysPerUser.get(v.visitor_id)!.add(day);
      const cc = (v.country ?? "").toUpperCase();
      if (cc && cc.length === 2) {
        if (!userCountryCounts.has(v.visitor_id)) userCountryCounts.set(v.visitor_id, new Map());
        const m = userCountryCounts.get(v.visitor_id)!;
        const entry = m.get(cc) ?? { name: v.country_name ?? cc, count: 0 };
        entry.count += 1;
        if (v.country_name) entry.name = v.country_name;
        m.set(cc, entry);
      }
      const src = normaliseSource(v.traffic_source);
      if (src) {
        if (!userSourceCounts.has(v.visitor_id)) userSourceCounts.set(v.visitor_id, new Map());
        const sm = userSourceCounts.get(v.visitor_id)!;
        sm.set(src, (sm.get(src) ?? 0) + 1);
      }
    });

    const topUsers = Array.from(visitsPerUser.entries())
      .map(([visitorId, visits]) => {
        let country: string | null = null;
        let countryName: string | null = null;
        const m = userCountryCounts.get(visitorId);
        if (m && m.size > 0) {
          const [cc, info] = Array.from(m.entries()).sort((a, b) => b[1].count - a[1].count)[0];
          country = cc;
          countryName = info.name;
        }
        let trafficSource: TrafficSource | null = null;
        const sm = userSourceCounts.get(visitorId);
        if (sm && sm.size > 0) {
          trafficSource = Array.from(sm.entries()).sort((a, b) => b[1] - a[1])[0][0];
        }
        return {
          visitorId,
          visits,
          activeDays: activeDaysPerUser.get(visitorId)?.size ?? 0,
          firstSeen: firstSeen.get(visitorId) ?? "",
          lastSeen: lastSeen.get(visitorId) ?? "",
          country,
          countryName,
          trafficSource,
        };
      })
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 15);

    // Traffic-source breakdown across the selected window.
    // "Users" = visitors whose *primary* (most-frequent) source matches the bucket,
    // so the counts add up to the number of classified users (no double-counting).
    const sourceVisitCounts: Record<TrafficSource, number> = { search: 0, direct: 0, social: 0, referral: 0 };
    visits.forEach(v => {
      const s = normaliseSource(v.traffic_source);
      if (s) sourceVisitCounts[s] += 1;
    });
    const sourceUserCounts: Record<TrafficSource, number> = { search: 0, direct: 0, social: 0, referral: 0 };
    let totalClassifiedUsers = 0;
    userSourceCounts.forEach(sm => {
      if (sm.size === 0) return;
      const top = Array.from(sm.entries()).sort((a, b) => b[1] - a[1])[0][0];
      sourceUserCounts[top] += 1;
      totalClassifiedUsers += 1;
    });
    const trafficSources = (Object.keys(sourceVisitCounts) as TrafficSource[])
      .map(source => ({
        source,
        users: sourceUserCounts[source],
        visits: sourceVisitCounts[source],
        usersPct: totalClassifiedUsers > 0
          ? Math.round((sourceUserCounts[source] / totalClassifiedUsers) * 100)
          : 0,
      }))
      .sort((a, b) => b.users - a.users || b.visits - a.visits);

    // Top external referring hosts (search engines + other sites)
    const referrerStats = new Map<string, { users: Set<string>; visits: number; source: TrafficSource }>();
    visits.forEach(v => {
      if (!v.referrer) return;
      let host = "";
      try { host = new URL(v.referrer).hostname.toLowerCase().replace(/^www\./, ""); } catch { return; }
      if (!host) return;
      const src = normaliseSource(v.traffic_source) ?? "referral";
      if (!referrerStats.has(host)) {
        referrerStats.set(host, { users: new Set(), visits: 0, source: src });
      }
      const e = referrerStats.get(host)!;
      e.users.add(v.visitor_id);
      e.visits += 1;
    });
    const topReferrers = Array.from(referrerStats.entries())
      .map(([host, e]) => ({ host, users: e.users.size, visits: e.visits, source: e.source }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);



    // Top countries (by unique visitors, then total visits).
    // Bot / crawler / monitor traffic is excluded so the geo tables reflect
    // real humans only, matching the "non-bot" numbers shown in the stat cards.
    const nonBotVisitorIds = buildNonBotVisitorSet(visits);
    const computeTopCountries = (visitList: typeof visits) => {
      const countryVisits = new Map<string, { name: string; users: Set<string>; visits: number }>();
      visitList.forEach((v: { visitor_id: string; country?: string | null; country_name?: string | null }) => {
        if (!nonBotVisitorIds.has(v.visitor_id)) return;
        const c = (v.country ?? "").toUpperCase();
        if (!c || c.length !== 2) return;
        if (!countryVisits.has(c)) {
          countryVisits.set(c, { name: v.country_name ?? c, users: new Set(), visits: 0 });
        }
        const entry = countryVisits.get(c)!;
        entry.users.add(v.visitor_id);
        entry.visits += 1;
      });
      return Array.from(countryVisits.entries())
        .map(([country, e]) => ({ country, countryName: e.name, users: e.users.size, visits: e.visits }))
        .sort((a, b) => b.users - a.users || b.visits - a.visits)
        .slice(0, 15);
    };
    const topCountries = computeTopCountries(visits);

    const newUsersToday = Array.from(firstSeen.entries()).filter(
      ([, ts]) => ts >= todayStart,
    ).length;
    const returningUsers = Array.from(visitsPerUser.values()).filter(n => n >= 2).length;
    const returningPct = uniqueVisitors.size > 0
      ? Math.round((returningUsers / uniqueVisitors.size) * 100)
      : 0;
    const avgPagesPerUser = uniqueVisitors.size > 0
      ? visits.length / uniqueVisitors.size
      : 0;
    const visitsPerActiveDay: number[] = [];
    visitsPerUser.forEach((count, uid) => {
      const days = activeDaysPerUser.get(uid)?.size || 1;
      visitsPerActiveDay.push(count / days);
    });
    const avgVisitsPerActiveDay = visitsPerActiveDay.length > 0
      ? visitsPerActiveDay.reduce((a, b) => a + b, 0) / visitsPerActiveDay.length
      : 0;

    // 7d / 30d rolling unique — bots, crawlers and monitors excluded
    const weeklyUsers = new Set(
      visits
        .filter(v => v.visited_at >= sevenDaysAgo && nonBotVisitorIds.has(v.visitor_id))
        .map(v => v.visitor_id),
    ).size;
    const monthlyUsers = new Set(
      visits
        .filter(v => v.visited_at >= thirtyDaysAgo && nonBotVisitorIds.has(v.visitor_id))
        .map(v => v.visitor_id),
    ).size;

    // Last 7 days
    const isNonBotVisitor = (vid: string) => {
      const u = uaByVisitor.get(vid);
      return !!u && u.hasUA && !u.anyBot;
    };
    const last7Days: { date: string; count: number }[] = [];
    const last7DaysNonBot: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const dayVisits = visits.filter(v => v.visited_at >= dayStart && v.visited_at < dayEnd);
      const dayUnique = new Set(dayVisits.map(v => v.visitor_id));
      const label = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
      last7Days.push({ date: label, count: dayUnique.size });
      let nonBotCount = 0;
      dayUnique.forEach(vid => { if (isNonBotVisitor(vid)) nonBotCount += 1; });
      last7DaysNonBot.push({ date: label, count: nonBotCount });
    }

    // Last 30 days (unique users per day)
    const last30Days: { date: string; count: number }[] = [];
    const last30DaysNonBot: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const dayUnique = new Set(
        visits.filter(v => v.visited_at >= dayStart && v.visited_at < dayEnd).map(v => v.visitor_id),
      );
      const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      last30Days.push({ date: label, count: dayUnique.size });
      let nonBotCount = 0;
      dayUnique.forEach(vid => { if (isNonBotVisitor(vid)) nonBotCount += 1; });
      last30DaysNonBot.push({ date: label, count: nonBotCount });
    }


    // Hour-of-day distribution today
    const hourlyToday: { hour: number; count: number }[] = Array.from(
      { length: 24 },
      (_, h) => ({ hour: h, count: 0 }),
    );
    visits.forEach(v => {
      if (v.visited_at < todayStart) return;
      const h = new Date(v.visited_at).getHours();
      hourlyToday[h].count++;
    });
    const peak = hourlyToday.reduce(
      (best, cur) => (cur.count > best.count ? cur : best),
      { hour: 0, count: 0 },
    );
    const peakHourLabel = peak.count > 0
      ? `${peak.hour.toString().padStart(2, "0")}:00`
      : "—";

    // Top entry / landing paths (non-topic, e.g. /, /curriculum, /viva)
    const pathCounts = new Map<string, number>();
    visits.forEach(v => {
      if (!v.page_path) return;
      pathCounts.set(v.page_path, (pathCounts.get(v.page_path) || 0) + 1);
    });
    const topEntryPaths = Array.from(pathCounts.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Topic-level analytics
    const topicVisitMap = new Map<string, { views: number; visitors: Set<string> }>();
    const sectionViewMap = new Map<string, number>();

    visits.forEach(v => {
      if (!v.page_path) return;
      const segments = v.page_path.split("/").filter(Boolean);
      if (segments.length === 2) {
        const [section, topicId] = segments;
        const topic = allTopics.find(t => t.id === topicId && t.section === section);
        if (topic) {
          if (!topicVisitMap.has(topicId)) {
            topicVisitMap.set(topicId, { views: 0, visitors: new Set() });
          }
          const entry = topicVisitMap.get(topicId)!;
          entry.views++;
          entry.visitors.add(v.visitor_id);
          sectionViewMap.set(section, (sectionViewMap.get(section) || 0) + 1);
        }
      }
    });

    const topTopics: TopicStat[] = allTopics
      .map(t => {
        const data = topicVisitMap.get(t.id);
        return {
          id: t.id,
          title: t.title,
          section: t.section,
          views: data?.views || 0,
          uniqueVisitors: data?.visitors.size || 0,
        };
      })
      .sort((a, b) => b.views - a.views);

    const sectionBreakdown = Object.entries(sectionLabels).map(([key, label]) => ({
      section: label,
      views: sectionViewMap.get(key) || 0,
    })).sort((a, b) => b.views - a.views);

    // Weekly retention cohorts (last 8 weeks of first-seen users)
    // For each cohort, compute % returning on day 1, day 7, day 30 after first visit.
    const dayKey = (iso: string) => iso.slice(0, 10);
    const userActiveDays = new Map<string, Set<string>>();
    visits.forEach(v => {
      if (!userActiveDays.has(v.visitor_id)) userActiveDays.set(v.visitor_id, new Set());
      userActiveDays.get(v.visitor_id)!.add(dayKey(v.visited_at));
    });
    const msDay = 86_400_000;
    const todayDayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    // Week start = Monday
    const weekStartOf = (d: Date) => {
      const day = (d.getDay() + 6) % 7; // 0 = Monday
      const ws = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
      return ws;
    };
    const cohorts = new Map<string, string[]>(); // cohortStartISO(date-only) -> visitor_ids
    firstSeen.forEach((ts, uid) => {
      const ws = weekStartOf(new Date(ts));
      const key = ws.toISOString().slice(0, 10);
      if (!cohorts.has(key)) cohorts.set(key, []);
      cohorts.get(key)!.push(uid);
    });
    const sortedCohortKeys = Array.from(cohorts.keys()).sort().slice(-8);
    const retentionCohorts = sortedCohortKeys.map(key => {
      const uids = cohorts.get(key)!;
      const cohortStartMs = new Date(key + "T00:00:00").getTime();
      // For each user, age = how many full days between cohort start and today
      // Use cohort midpoint (start) for window eligibility.
      const ageDays = Math.floor((todayDayStart - cohortStartMs) / msDay);
      // Range-based retention: a user counts toward Dn if they returned on
      // ANY day in the window (relative to their own first-seen day).
      //   D1  = active on day 1
      //   D7  = active on any day 2–7   (the "first-week return" bucket)
      //   D30 = active on any day 8–30  (the "first-month return" bucket)
      // This avoids the false-zero you'd get from requiring an exact-day-7
      // hit when traffic is sparse but users do return within the window.
      const computeRange = (startOffset: number, endOffset: number): { count: number; pct: number } | null => {
        // Need enough elapsed days to observe at least the start of the window.
        if (ageDays < startOffset) return null;
        // Cap the window at what we've actually observed so cohorts aren't
        // penalised for time that hasn't happened yet.
        const effectiveEnd = Math.min(endOffset, ageDays);
        let count = 0;
        uids.forEach(uid => {
          const firstTs = firstSeen.get(uid)!;
          const firstDayMs = new Date(dayKey(firstTs) + "T00:00:00").getTime();
          for (let off = startOffset; off <= effectiveEnd; off++) {
            const targetKey = new Date(firstDayMs + off * msDay).toISOString().slice(0, 10);
            if (userActiveDays.get(uid)?.has(targetKey)) { count++; break; }
          }
        });
        return { count, pct: uids.length > 0 ? Math.round((count / uids.length) * 100) : 0 };
      };
      const d1 = computeRange(1, 1);
      const d7 = computeRange(2, 7);
      const d30 = computeRange(8, 30);
      const startDate = new Date(key + "T00:00:00");
      return {
        cohortStart: key,
        cohortLabel: `Wk of ${startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
        size: uids.length,
        d1: d1?.count ?? null,
        d7: d7?.count ?? null,
        d30: d30?.count ?? null,
        d1Pct: d1?.pct ?? null,
        d7Pct: d7?.pct ?? null,
        d30Pct: d30?.pct ?? null,
      };
    });

    // ── Podcast usage ──────────────────────────────────────────────────────
    // Engagement signals come from two places: the `podcasts` table (what's
    // been generated + listenable) and `app_visits` page paths matching the
    // podcast routes (proxy for "listens" since plays aren't logged).
    const podcastVisits = visits.filter(v =>
      v.page_path === "/podcasts" || (v.page_path?.startsWith("/podcasts/") ?? false),
    );
    const podcastTopicViews = new Map<string, { title: string; views: number }>();
    podcastVisits.forEach(v => {
      const m = v.page_path?.match(/^\/podcasts\/([^/]+)/);
      if (!m) return;
      const topicId = m[1];
      const topic = allTopics.find(t => t.id === topicId);
      const title = topic?.title ?? topicId;
      const e = podcastTopicViews.get(topicId) ?? { title, views: 0 };
      e.views += 1;
      podcastTopicViews.set(topicId, e);
    });
    const podcastTopByViews = Array.from(podcastTopicViews.entries())
      .map(([topicId, e]) => ({ topicId, topicTitle: e.title, views: e.views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);

    const { data: podcastRows } = await supabase
      .from("podcasts")
      .select("topic_id, topic_title, status, duration_seconds, created_at")
      .order("created_at", { ascending: false });
    const pRows = podcastRows ?? [];
    const podcastsSummary = {
      total: pRows.length,
      ready: pRows.filter(p => p.status === "ready").length,
      pending: pRows.filter(p => p.status === "pending" || p.status === "generating").length,
      failed: pRows.filter(p => p.status === "failed").length,
      totalSeconds: pRows.reduce((s, p) => s + (p.duration_seconds ?? 0), 0),
      pageViews: podcastVisits.length,
      uniqueListeners: new Set(podcastVisits.map(v => v.visitor_id)).size,
      inRangeGenerated: pRows.filter(p => {
        if (rangeStartIso && p.created_at < rangeStartIso) return false;
        if (rangeEndIso && p.created_at > rangeEndIso) return false;
        return true;
      }).length,
      recent: pRows.slice(0, 5).map(p => ({
        topicId: p.topic_id,
        topicTitle: p.topic_title,
        status: p.status,
        durationSeconds: p.duration_seconds ?? null,
        createdAt: p.created_at,
      })),
      topByViews: podcastTopByViews,
    };

    // ── Viva usage ────────────────────────────────────────────────────────
    // `/viva` and `/viva/*` visits are the proxy for sessions started.
    // `viva_model_answers` rows are unique cached responses ever generated.
    const vivaVisits = visits.filter(v => v.page_path === "/viva" || (v.page_path?.startsWith("/viva/") ?? false));
    const { data: vivaRows } = await supabase
      .from("viva_model_answers")
      .select("exam, topic_title, created_at")
      .order("created_at", { ascending: false });
    const vRows = vivaRows ?? [];
    const vivaByExamMap = new Map<string, number>();
    vRows.forEach(r => vivaByExamMap.set(r.exam, (vivaByExamMap.get(r.exam) ?? 0) + 1));
    const vivaSummary = {
      totalCachedAnswers: vRows.length,
      uniqueTopics: new Set(vRows.map(r => r.topic_title)).size,
      byExam: Array.from(vivaByExamMap.entries())
        .map(([exam, count]) => ({ exam, count }))
        .sort((a, b) => b.count - a.count),
      pageViews: vivaVisits.length,
      uniqueUsers: new Set(vivaVisits.map(v => v.visitor_id)).size,
      inRangeGenerated: vRows.filter(r => {
        if (rangeStartIso && r.created_at < rangeStartIso) return false;
        if (rangeEndIso && r.created_at > rangeEndIso) return false;
        return true;
      }).length,
      recent: vRows.slice(0, 5).map(r => ({
        topicTitle: r.topic_title,
        exam: r.exam,
        createdAt: r.created_at,
      })),
    };


    setAnalytics({
      totalUniqueUsers: uniqueVisitors.size,
      totalNonBotUsers,
      dailyUsers: todayUnique.size,
      weeklyUsers,
      monthlyUsers,
      newUsersToday,
      returningUsers,
      returningPct,
      avgPagesPerUser,
      avgVisitsPerActiveDay,
      peakHourLabel,
      peakHourCount: peak.count,
      totalVisits: visits.length,
      todayVisits: todayData?.length || 0,
      last7Days,
      last7DaysNonBot,
      last30Days,
      last30DaysNonBot,
      hourlyToday,
      visitTimestamps: visits.map(v => v.visited_at),
      rangeStart: rangeStartIso,
      rangeEnd: rangeEndIso,
      topEntryPaths,
      topTopics,
      sectionBreakdown,
      retentionCohorts,
      topUsers,
      topCountries,
      trafficSources,
      topReferrers,
      podcasts: podcastsSummary,
      viva: vivaSummary,
    });
    setAllVisits(visits);
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) fetchAnalytics();
  }, [user, isAdmin]);

  // Filter top countries by a sub-range independent of the global dashboard range
  // Non-bot visitor ids across the full retained window. Shared by the
  // per-country panel and country drill-downs so all geo views exclude
  // crawlers/monitors using the same rules as the top-line stat cards.
  const nonBotVisitorIds = useMemo(
    () => buildNonBotVisitorSet(allVisits),
    [allVisits],
  );

  const filteredTopCountries = useMemo(() => {
    if (!allVisits.length) return [];
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const subset = allVisits.filter(v => {
      if (!nonBotVisitorIds.has(v.visitor_id)) return false;
      if (countriesDateRange === "today") return v.visited_at >= todayStart;
      if (countriesDateRange === "7d") return v.visited_at >= sevenDaysAgo;
      if (countriesDateRange === "30d") return v.visited_at >= thirtyDaysAgo;
      return true;
    });
    const countryVisits = new Map<string, { name: string; users: Set<string>; visits: number }>();
    subset.forEach((v: { visitor_id: string; country?: string | null; country_name?: string | null }) => {
      const c = (v.country ?? "").toUpperCase();
      if (!c || c.length !== 2) return;
      if (!countryVisits.has(c)) {
        countryVisits.set(c, { name: v.country_name ?? c, users: new Set(), visits: 0 });
      }
      const entry = countryVisits.get(c)!;
      entry.users.add(v.visitor_id);
      entry.visits += 1;
    });
    return Array.from(countryVisits.entries())
      .map(([country, e]) => ({ country, countryName: e.name, users: e.users.size, visits: e.visits }))
      .sort((a, b) => b.users - a.users || b.visits - a.visits)
      .slice(0, 15);
  }, [allVisits, countriesDateRange, nonBotVisitorIds]);

  // Count bot / missing-UA visits and unique visitor IDs that were filtered out
  // of the country breakdown. Displayed as a badge with a tooltip so the admin
  // can see the volume of traffic excluded by the bot rules.
  const excludedCountryCounts = useMemo(() => {
    if (!allVisits.length) return { visits: 0, users: 0 };
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    let visits = 0;
    const users = new Set<string>();
    allVisits.forEach(v => {
      if (countriesDateRange === "today" && v.visited_at < todayStart) return;
      if (countriesDateRange === "7d" && v.visited_at < sevenDaysAgo) return;
      if (countriesDateRange === "30d" && v.visited_at < thirtyDaysAgo) return;
      if (nonBotVisitorIds.has(v.visitor_id)) return;
      visits += 1;
      users.add(v.visitor_id);
    });
    return { visits, users: users.size };
  }, [allVisits, countriesDateRange, nonBotVisitorIds]);

  // Drill-down: daily users + visits for the selected country across the same sub-range.
  const drillTrend = useMemo(() => {
    if (!drillCountry || !allVisits.length) return [] as { date: string; users: number; visits: number }[];
    const now = new Date();
    let startMs = 0;
    if (countriesDateRange === "today") {
      startMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    } else if (countriesDateRange === "7d") {
      startMs = now.getTime() - 7 * 24 * 60 * 60 * 1000;
    } else if (countriesDateRange === "30d") {
      startMs = now.getTime() - 30 * 24 * 60 * 60 * 1000;
    } else {
      startMs = now.getTime() - 90 * 24 * 60 * 60 * 1000; // cap "all" view to last 90d
    }
    const code = drillCountry.code.toUpperCase();
    const buckets = new Map<string, { users: Set<string>; visits: number }>();
    allVisits.forEach(v => {
      if (!nonBotVisitorIds.has(v.visitor_id)) return;
      if ((v.country ?? "").toUpperCase() !== code) return;
      const t = new Date(v.visited_at).getTime();
      if (t < startMs) return;
      const d = new Date(t);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!buckets.has(key)) buckets.set(key, { users: new Set(), visits: 0 });
      const b = buckets.get(key)!;
      b.users.add(v.visitor_id);
      b.visits += 1;
    });
    // Fill empty days for continuity
    const startDay = new Date(startMs);
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date();
    endDay.setHours(0, 0, 0, 0);
    const out: { date: string; users: number; visits: number }[] = [];
    for (let d = new Date(startDay); d.getTime() <= endDay.getTime(); d.setDate(d.getDate() + 1)) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const b = buckets.get(key);
      out.push({ date: key, users: b ? b.users.size : 0, visits: b ? b.visits : 0 });
    }
    return out;
  }, [allVisits, drillCountry, countriesDateRange, nonBotVisitorIds]);

  const drillTotals = useMemo(() => {
    let users = new Set<string>();
    let visits = 0;
    if (drillCountry) {
      const code = drillCountry.code.toUpperCase();
      const now = Date.now();
      let startMs = 0;
      if (countriesDateRange === "today") {
        const d = new Date(); d.setHours(0,0,0,0); startMs = d.getTime();
      } else if (countriesDateRange === "7d") startMs = now - 7*86400000;
      else if (countriesDateRange === "30d") startMs = now - 30*86400000;
      else startMs = now - 90*86400000;
      allVisits.forEach(v => {
        if (!nonBotVisitorIds.has(v.visitor_id)) return;
        if ((v.country ?? "").toUpperCase() !== code) return;
        if (new Date(v.visited_at).getTime() < startMs) return;
        users.add(v.visitor_id);
        visits += 1;
      });
    }
    return { users: users.size, visits };
  }, [allVisits, drillCountry, countriesDateRange, nonBotVisitorIds]);

  if (authLoading || (!user || !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const maxTopicViews = analytics ? Math.max(...analytics.topTopics.map(t => t.views), 1) : 1;

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3, hint: "Headline usage stats and weekly activity" },
    { key: "topics" as const, label: "Topic Analytics", icon: BookOpen, hint: "Most and least visited topics" },
    { key: "seo" as const, label: "SEO", icon: TrendingUp, hint: "Google Search Console rankings, clicks, and top queries" },
  ];


  const handleTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    setActiveTab(tabs[next].key);
    const el = document.getElementById(`admin-tab-${tabs[next].key}`);
    el?.focus();
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background pt-20 px-4 pb-10">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:text-foreground focus:px-3 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-primary"
      >
        Skip to dashboard content
      </a>
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground" aria-label={`Signed in as ${user.email}`}>
              Signed in as <span className="font-medium text-foreground">{user.email}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAnalytics()}
              disabled={loading}
              aria-label={loading ? "Refreshing analytics" : "Refresh analytics"}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/audit")}
              aria-label="Open content accuracy audit (includes formulary verification and ESICM dose validator)"
            >
              <CheckCircle2 className="w-4 h-4 mr-1" aria-hidden="true" />
              Content Audit
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => { signOut(); navigate("/"); }}
              aria-label="Sign out of admin dashboard"
            >
              <LogOut className="w-4 h-4 mr-1" aria-hidden="true" /> Sign Out
            </Button>
          </div>
        </header>

        {/* Tab switcher */}
        <div
          role="tablist"
          aria-label="Admin sections"
          className="flex gap-1 p-1 rounded-lg bg-secondary/50 w-full sm:w-fit overflow-x-auto"
        >
          {tabs.map((tab, idx) => {
            const selected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`admin-tab-${tab.key}`}
                role="tab"
                aria-selected={selected}
                aria-controls={`admin-panel-${tab.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.key)}
                onKeyDown={(e) => handleTabKey(e, idx)}
                title={tab.hint}
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-md text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <tab.icon className="w-4 h-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <main id="admin-main" tabIndex={-1} className="space-y-6 focus:outline-none">

        {!analytics && loading && (
          <div className="p-8 rounded-xl border border-border bg-card text-center" role="status" aria-live="polite">
            <RefreshCw className="w-5 h-5 mx-auto animate-spin text-muted-foreground mb-2" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Loading analytics…</p>
          </div>
        )}

        {analytics && activeTab === "overview" && (
          <section
            id="admin-panel-overview"
            role="tabpanel"
            aria-labelledby="admin-tab-overview"
            className="space-y-6"
          >
            {/* Date range picker */}
            <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[180px]">
                <h2 className="text-sm font-semibold text-foreground mb-1">Date range</h2>
                <p className="text-xs text-muted-foreground">
                  {dateFrom || dateTo
                    ? `Recalculating metrics for ${dateFrom ? format(dateFrom, "d MMM yyyy") : "the beginning"} → ${dateTo ? format(dateTo, "d MMM yyyy") : "now"}.`
                    : "All-time metrics. Pick a start and/or end date to scope every metric on this tab."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("justify-start text-left font-normal min-w-[140px]", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "d MMM yyyy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      disabled={(d) => (dateTo ? d > dateTo : false) || d > new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground text-sm">→</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("justify-start text-left font-normal min-w-[140px]", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "d MMM yyyy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      disabled={(d) => (dateFrom ? d < dateFrom : false) || d > new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {[
                  { label: "7d", days: 7 },
                  { label: "30d", days: 30 },
                  { label: "90d", days: 90 },
                ].map(p => (
                  <Button
                    key={p.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const end = new Date();
                      const start = new Date();
                      start.setDate(end.getDate() - (p.days - 1));
                      setDateFrom(start);
                      setDateTo(end);
                      fetchAnalytics(start, end);
                    }}
                  >
                    {p.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateFrom(undefined);
                    setDateTo(undefined);
                    fetchAnalytics(null, null);
                  }}
                >
                  All time
                </Button>
                <Button
                  size="sm"
                  onClick={() => fetchAnalytics()}
                  disabled={loading}
                >
                  Apply
                </Button>
                {(dateFrom || dateTo) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDateFrom(undefined);
                      setDateTo(undefined);
                      fetchAnalytics(null, null);
                    }}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4" role="list" aria-label="Headline statistics">
              {[
                { label: "Total Unique Users", value: analytics.totalUniqueUsers, icon: Users, color: "text-blue-500", help: "Distinct visitors ever recorded" },
                { label: "Total Non-Bot Users", value: analytics.totalNonBotUsers, icon: Users, color: "text-emerald-500", help: "Distinct visitors with a human-looking user agent (bots, crawlers and monitors excluded)" },
                { label: "Daily Active Users", value: analytics.dailyUsers, icon: CalendarDays, color: "text-green-500", help: "Distinct human-looking visitors today (bots, crawlers and monitors excluded)" },
                { label: "Total Page Views", value: analytics.totalVisits, icon: TrendingUp, color: "text-purple-500", help: "All page visits ever recorded" },
                { label: "Today's Page Views", value: analytics.todayVisits, icon: TrendingUp, color: "text-orange-500", help: "Page visits since midnight" },
              ].map(stat => (
                <div
                  key={stat.label}
                  role="listitem"
                  className="p-4 rounded-xl border border-border bg-card focus-within:ring-2 focus-within:ring-primary"
                  aria-label={`${stat.label}: ${stat.value.toLocaleString()}. ${stat.help}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground tabular-nums" aria-hidden="true">{stat.value.toLocaleString()}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{stat.help}</p>
                </div>
              ))}
            </div>

            {/* User insight tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="User engagement statistics">
              {[
                { label: "Weekly Active", value: analytics.weeklyUsers, fmt: (v: number) => v.toLocaleString(), icon: Activity, color: "text-sky-500", help: "Distinct human-looking visitors in the last 7 days (bots, crawlers and monitors excluded)" },
                { label: "Monthly Active", value: analytics.monthlyUsers, fmt: (v: number) => v.toLocaleString(), icon: CalendarDays, color: "text-indigo-500", help: "Distinct human-looking visitors in the last 30 days (bots, crawlers and monitors excluded)" },
                { label: "New Today", value: analytics.newUsersToday, fmt: (v: number) => v.toLocaleString(), icon: UserPlus, color: "text-emerald-500", help: "Visitors whose first ever visit is today" },
                { label: "Returning Users", value: analytics.returningUsers, fmt: (v: number) => `${v.toLocaleString()} (${analytics.returningPct}%)`, icon: Repeat, color: "text-amber-500", help: "Visitors with two or more visits" },
                { label: "Avg Pages / User", value: analytics.avgPagesPerUser, fmt: (v: number) => v.toFixed(1), icon: Layers, color: "text-rose-500", help: "Total page views ÷ unique visitors" },
                { label: "Avg Visits / Active Day", value: analytics.avgVisitsPerActiveDay, fmt: (v: number) => v.toFixed(1), icon: BarChart3, color: "text-fuchsia-500", help: "Per-user visit intensity on days they engaged" },
                { label: "Peak Hour Today", value: analytics.peakHourCount, fmt: () => `${analytics.peakHourLabel}${analytics.peakHourCount ? ` · ${analytics.peakHourCount}` : ""}`, icon: Clock, color: "text-cyan-500", help: "Hour-of-day with the most page views today" },
                { label: "Engagement Rate", value: analytics.totalUniqueUsers > 0 ? Math.round((analytics.weeklyUsers / analytics.totalUniqueUsers) * 100) : 0, fmt: (v: number) => `${v}%`, icon: TrendingUp, color: "text-teal-500", help: "Share of all-time users active in the last 7 days" },
              ].map(stat => (
                <div
                  key={stat.label}
                  role="listitem"
                  className="p-4 rounded-xl border border-border bg-card"
                  aria-label={`${stat.label}: ${stat.fmt(stat.value)}. ${stat.help}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground tabular-nums" aria-hidden="true">{stat.fmt(stat.value)}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{stat.help}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Unique Users — Last 7 Days</h2>
              <p className="text-xs text-muted-foreground mb-4">Distinct visitors per day</p>
              <div className="flex gap-2">
                <ChartYAxis max={niceMax(Math.max(...analytics.last7Days.map(d => d.count), 1))} heightClass="h-40" />
                <div
                  className="flex-1 flex items-end gap-2 h-40"
                  role="img"
                  aria-label={`Bar chart of unique users per day for the last 7 days. ${analytics.last7Days.map(d => `${d.date}: ${d.count}`).join(", ")}.`}
                  style={chartGridStyle}
                >
                  {analytics.last7Days.map(day => {
                    const max = niceMax(Math.max(...analytics.last7Days.map(d => d.count), 1));
                    const height = (day.count / max) * 100;
                    return (
                      <div key={day.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end" title={`${day.date}: ${day.count} unique users`}>
                        <span className="text-xs font-medium text-foreground tabular-nums">{day.count}</span>
                        <div
                          className="w-full rounded-t bg-primary/70 transition-all duration-300 min-h-[4px]"
                          style={{ height: `${Math.max(height, 3)}%` }}
                          aria-hidden="true"
                        />
                        <span className="text-[10px] text-muted-foreground leading-tight text-center">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 30-day sparkline */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Unique Users — Last 30 Days</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Daily distinct visitors · {analytics.monthlyUsers.toLocaleString()} unique over the period
              </p>
              <div className="flex gap-2">
                <ChartYAxis max={niceMax(Math.max(...analytics.last30Days.map(d => d.count), 1))} heightClass="h-24" />
                <div className="flex-1">
                  <div
                    className="flex items-end gap-[2px] h-24"
                    role="img"
                    aria-label="Bar chart of unique users per day for the last 30 days"
                    style={chartGridStyle}
                  >
                    {analytics.last30Days.map(day => {
                      const max = niceMax(Math.max(...analytics.last30Days.map(d => d.count), 1));
                      const height = (day.count / max) * 100;
                      return (
                        <div
                          key={day.date}
                          className="flex-1 bg-primary/60 rounded-t min-h-[2px] hover:bg-primary transition-colors"
                          style={{ height: `${Math.max(height, 2)}%` }}
                          title={`${day.date}: ${day.count} unique users`}
                          aria-hidden="true"
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>{analytics.last30Days[0]?.date}</span>
                    <span>{analytics.last30Days[analytics.last30Days.length - 1]?.date}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Non-bot users — 7 day trend */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Non-Bot Users — Last 7 Days</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Distinct visitors per day with a human-looking user agent (bots, crawlers and monitors excluded)
              </p>
              <div className="flex gap-2">
                <ChartYAxis max={niceMax(Math.max(...analytics.last7DaysNonBot.map(d => d.count), 1))} heightClass="h-40" />
                <div
                  className="flex-1 flex items-end gap-2 h-40"
                  role="img"
                  aria-label={`Bar chart of non-bot users per day for the last 7 days. ${analytics.last7DaysNonBot.map(d => `${d.date}: ${d.count}`).join(", ")}.`}
                  style={chartGridStyle}
                >
                  {analytics.last7DaysNonBot.map(day => {
                    const max = niceMax(Math.max(...analytics.last7DaysNonBot.map(d => d.count), 1));
                    const height = (day.count / max) * 100;
                    return (
                      <div key={day.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end" title={`${day.date}: ${day.count} non-bot users`}>
                        <span className="text-xs font-medium text-foreground tabular-nums">{day.count}</span>
                        <div
                          className="w-full rounded-t bg-emerald-500/70 transition-all duration-300 min-h-[4px]"
                          style={{ height: `${Math.max(height, 3)}%` }}
                          aria-hidden="true"
                        />
                        <span className="text-[10px] text-muted-foreground leading-tight text-center">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Non-bot users — 30 day sparkline */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Non-Bot Users — Last 30 Days</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Daily distinct non-bot visitors · {analytics.totalNonBotUsers.toLocaleString()} unique over the full period
              </p>
              <div className="flex gap-2">
                <ChartYAxis max={niceMax(Math.max(...analytics.last30DaysNonBot.map(d => d.count), 1))} heightClass="h-24" />
                <div className="flex-1">
                  <div
                    className="flex items-end gap-[2px] h-24"
                    role="img"
                    aria-label="Bar chart of non-bot users per day for the last 30 days"
                    style={chartGridStyle}
                  >
                    {analytics.last30DaysNonBot.map(day => {
                      const max = niceMax(Math.max(...analytics.last30DaysNonBot.map(d => d.count), 1));
                      const height = (day.count / max) * 100;
                      return (
                        <div
                          key={day.date}
                          className="flex-1 bg-emerald-500/60 rounded-t min-h-[2px] hover:bg-emerald-500 transition-colors"
                          style={{ height: `${Math.max(height, 2)}%` }}
                          title={`${day.date}: ${day.count} non-bot users`}
                          aria-hidden="true"
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>{analytics.last30DaysNonBot[0]?.date}</span>
                    <span>{analytics.last30DaysNonBot[analytics.last30DaysNonBot.length - 1]?.date}</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Non-bot daily active users — 30-day trend line */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Non-Bot Daily Active Users Trend</h2>
              <p className="text-xs text-muted-foreground mb-3">
                30-day trend of distinct human-looking visitors per day (bots, crawlers and monitors excluded)
              </p>
              <DailyTrendLineChart data={analytics.last30DaysNonBot} color="hsl(var(--primary))" />
            </div>


            {/* Hour of day — configurable window */}

            <HourActivityCard analytics={analytics} />


            {/* Top entry paths */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Top Pages</h2>
              <p className="text-xs text-muted-foreground mb-3">Most visited URLs across all users</p>
              {analytics.topEntryPaths.length === 0 ? (
                <p className="text-sm text-muted-foreground">No page visits recorded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {analytics.topEntryPaths.map(p => {
                    const max = Math.max(...analytics.topEntryPaths.map(x => x.count), 1);
                    const pct = (p.count / max) * 100;
                    return (
                      <li key={p.path} className="flex items-center gap-3" aria-label={`${p.path}: ${p.count} views`}>
                        <span className="text-xs text-foreground flex-1 truncate font-mono">{p.path}</span>
                        <div className="w-32 h-2 rounded bg-secondary/50 overflow-hidden" aria-hidden="true">
                          <div className="h-full rounded bg-primary/60" style={{ width: `${Math.max(pct, 2)}%` }} />
                        </div>
                        <span className="text-xs font-medium text-foreground w-12 text-right tabular-nums">{p.count.toLocaleString()}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Traffic sources — how visitors arrived (direct vs search vs other) */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Traffic Sources</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                How visitors reached the app. Each user is assigned to their most-frequent source so percentages add up to 100%.
                {analytics.trafficSources.every(s => s.users === 0 && s.visits === 0) && (
                  <> No source data yet — traffic source is recorded from new visits onwards.</>
                )}
              </p>
              {analytics.trafficSources.some(s => s.users > 0 || s.visits > 0) && (
                <ul className="space-y-2" aria-label="Traffic source breakdown">
                  {analytics.trafficSources.map(s => {
                    const meta = TRAFFIC_SOURCE_META[s.source];
                    const Icon = meta.icon;
                    return (
                      <li
                        key={s.source}
                        className="flex items-center gap-3"
                        aria-label={`${meta.label}: ${s.users} users (${s.usersPct}%), ${s.visits} visits. ${meta.help}`}
                      >
                        <span className="flex items-center gap-1.5 w-36 shrink-0">
                          <Icon className={`w-4 h-4 ${meta.color}`} aria-hidden="true" />
                          <span className="text-xs font-medium text-foreground">{meta.label}</span>
                        </span>
                        <div className="flex-1 h-2 rounded bg-secondary/50 overflow-hidden" aria-hidden="true">
                          <div
                            className="h-full rounded bg-primary/60 transition-all duration-300"
                            style={{ width: `${Math.max(s.usersPct, 2)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground w-12 text-right tabular-nums">{s.usersPct}%</span>
                        <span className="text-[11px] text-muted-foreground w-28 text-right tabular-nums">
                          {s.users.toLocaleString()} user{s.users === 1 ? "" : "s"} · {s.visits.toLocaleString()} visit{s.visits === 1 ? "" : "s"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Top referring hosts (search engines + external sites) */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Link2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Top Referrers</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">External domains that sent traffic to the app.</p>
              {analytics.topReferrers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No external referrers recorded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {analytics.topReferrers.map(r => {
                    const meta = TRAFFIC_SOURCE_META[r.source];
                    const Icon = meta.icon;
                    return (
                      <li
                        key={r.host}
                        className="flex items-center gap-3"
                        aria-label={`${r.host} (${meta.label}): ${r.users} users, ${r.visits} visits`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${meta.color}`} aria-hidden="true" />
                        <span className="text-xs text-foreground flex-1 truncate font-mono">{r.host}</span>
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground w-20 text-right">{meta.label}</span>
                        <span className="text-xs font-medium text-foreground w-12 text-right tabular-nums">{r.visits.toLocaleString()}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>


            {/* Podcast usage */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Headphones className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Podcast Usage</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Generated topic podcasts (all-time) and listener page views (within the selected date range).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Total podcasts", value: analytics.podcasts.total.toLocaleString(), help: "Podcast rows ever generated" },
                  { label: "Ready", value: analytics.podcasts.ready.toLocaleString(), help: `${analytics.podcasts.pending} pending · ${analytics.podcasts.failed} failed` },
                  { label: "Total runtime", value: formatDuration(analytics.podcasts.totalSeconds), help: "Sum of audio length across ready podcasts" },
                  { label: "Page views", value: `${analytics.podcasts.pageViews.toLocaleString()}`, help: `${analytics.podcasts.uniqueListeners.toLocaleString()} unique listeners in range` },
                ].map(s => (
                  <div key={s.label} className="rounded-lg border border-border/60 bg-background/40 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
                    <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.help}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">Most listened (by page views)</h3>
                  {analytics.podcasts.topByViews.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No podcast page views yet in this range.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {analytics.podcasts.topByViews.map(t => {
                        const max = Math.max(...analytics.podcasts.topByViews.map(x => x.views), 1);
                        const pct = (t.views / max) * 100;
                        return (
                          <li key={t.topicId} className="flex items-center gap-2" aria-label={`${t.topicTitle}: ${t.views} views`}>
                            <span className="text-xs text-foreground flex-1 truncate" title={t.topicTitle}>{t.topicTitle}</span>
                            <div className="w-20 h-1.5 rounded bg-secondary/50 overflow-hidden" aria-hidden="true">
                              <div className="h-full rounded bg-primary/60" style={{ width: `${Math.max(pct, 4)}%` }} />
                            </div>
                            <span className="text-xs font-medium text-foreground w-8 text-right tabular-nums">{t.views}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">Recently generated</h3>
                  {analytics.podcasts.recent.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No podcasts generated yet.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {analytics.podcasts.recent.map(r => {
                        const when = new Date(r.createdAt);
                        const ageMin = Math.max(0, Math.floor((Date.now() - when.getTime()) / 60000));
                        const ago =
                          ageMin < 60 ? `${ageMin}m ago` :
                          ageMin < 1440 ? `${Math.floor(ageMin / 60)}h ago` :
                          `${Math.floor(ageMin / 1440)}d ago`;
                        return (
                          <li key={r.topicId + r.createdAt} className="flex items-center gap-2">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${r.status === "ready" ? "bg-emerald-500" : r.status === "failed" ? "bg-rose-500" : "bg-amber-500"}`} aria-hidden="true" />
                            <span className="text-xs text-foreground flex-1 truncate" title={r.topicTitle}>{r.topicTitle}</span>
                            <span className="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap">
                              {r.durationSeconds ? `${Math.round(r.durationSeconds / 60)}m · ` : ""}{ago}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Viva usage */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Mic2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Viva Usage</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Cached AI model answers represent unique viva questions ever requested. Page views and unique users are within the selected date range.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Cached answers", value: analytics.viva.totalCachedAnswers.toLocaleString(), help: "Unique viva responses generated all-time" },
                  { label: "Topics covered", value: analytics.viva.uniqueTopics.toLocaleString(), help: "Distinct topic titles with at least one viva question" },
                  { label: "Page views", value: analytics.viva.pageViews.toLocaleString(), help: `${analytics.viva.uniqueUsers.toLocaleString()} unique users in range` },
                  { label: "Generated in range", value: analytics.viva.inRangeGenerated.toLocaleString(), help: "New cached answers created within the date range" },
                ].map(s => (
                  <div key={s.label} className="rounded-lg border border-border/60 bg-background/40 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
                    <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.help}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">By exam</h3>
                  {analytics.viva.byExam.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No viva answers cached yet.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {analytics.viva.byExam.map(e => {
                        const total = analytics.viva.totalCachedAnswers || 1;
                        const pct = Math.round((e.count / total) * 100);
                        const examLabel = e.exam === "primary" ? "FRCA Primary" : e.exam === "final" ? "FRCA Final" : e.exam === "fficm" ? "FFICM" : e.exam;
                        return (
                          <li key={e.exam} className="flex items-center gap-2" aria-label={`${examLabel}: ${e.count} answers (${pct}%)`}>
                            <span className="text-xs text-foreground w-28 shrink-0">{examLabel}</span>
                            <div className="flex-1 h-1.5 rounded bg-secondary/50 overflow-hidden" aria-hidden="true">
                              <div className="h-full rounded bg-primary/60" style={{ width: `${Math.max(pct, 2)}%` }} />
                            </div>
                            <span className="text-xs font-medium text-foreground w-16 text-right tabular-nums">{e.count.toLocaleString()} · {pct}%</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">Recent questions</h3>
                  {analytics.viva.recent.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No viva answers cached yet.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {analytics.viva.recent.map(r => {
                        const when = new Date(r.createdAt);
                        const ageMin = Math.max(0, Math.floor((Date.now() - when.getTime()) / 60000));
                        const ago =
                          ageMin < 60 ? `${ageMin}m ago` :
                          ageMin < 1440 ? `${Math.floor(ageMin / 60)}h ago` :
                          `${Math.floor(ageMin / 1440)}d ago`;
                        const examLabel = r.exam === "primary" ? "Primary" : r.exam === "final" ? "Final" : r.exam === "fficm" ? "FFICM" : r.exam;
                        return (
                          <li key={r.topicTitle + r.createdAt} className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-secondary/60 text-muted-foreground shrink-0">{examLabel}</span>
                            <span className="text-xs text-foreground flex-1 truncate" title={r.topicTitle}>{r.topicTitle}</span>
                            <span className="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap">{ago}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Top users */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Top Users</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Most active anonymous visitor IDs by total page views.</p>
              {analytics.topUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No visitor data yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3 font-medium">Visitor ID</th>
                        <th className="py-2 pr-3 font-medium">Country</th>
                        <th className="py-2 pr-3 font-medium">Source</th>
                        <th className="py-2 pr-3 font-medium text-right">Visits</th>
                        <th className="py-2 pr-3 font-medium text-right">Active days</th>
                        <th className="py-2 pr-3 font-medium text-right">First seen</th>
                        <th className="py-2 pr-3 font-medium text-right">Last seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.topUsers.map(u => {
                        const last = new Date(u.lastSeen);
                        const first = new Date(u.firstSeen);
                        const ageMin = Math.max(0, Math.floor((Date.now() - last.getTime()) / 60000));
                        const lastLabel =
                          ageMin < 60 ? `${ageMin}m ago` :
                          ageMin < 1440 ? `${Math.floor(ageMin / 60)}h ago` :
                          `${Math.floor(ageMin / 1440)}d ago`;
                        const flag = countryFlag(u.country);
                        return (
                          <tr key={u.visitorId} className="border-b border-border/50">
                            <td className="py-2 pr-3 font-mono text-foreground truncate max-w-[180px]" title={u.visitorId}>
                              {u.visitorId.length > 20 ? u.visitorId.slice(0, 18) + "…" : u.visitorId}
                            </td>
                            <td className="py-2 pr-3 text-foreground whitespace-nowrap">
                              {u.country ? (
                                <span className="inline-flex items-center gap-1.5">
                                  <span aria-hidden className="text-base leading-none">{flag}</span>
                                  <span>{u.countryName ?? u.country}</span>
                                </span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="py-2 pr-3 text-foreground whitespace-nowrap">
                              {u.trafficSource ? (() => {
                                const meta = TRAFFIC_SOURCE_META[u.trafficSource];
                                const Icon = meta.icon;
                                return (
                                  <span className="inline-flex items-center gap-1.5" title={meta.help}>
                                    <Icon className={`w-3.5 h-3.5 ${meta.color}`} aria-hidden="true" />
                                    <span>{meta.label}</span>
                                  </span>
                                );
                              })() : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="py-2 pr-3 text-right tabular-nums font-medium text-foreground">{u.visits.toLocaleString()}</td>
                            <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground">{u.activeDays}</td>
                            <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground" title={first.toISOString()}>
                              {first.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </td>
                            <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground" title={last.toISOString()}>
                              {lastLabel}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* World map of visitors */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">Visitors by Country</h2>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setMapMetric("users")}
                    className={`px-2 py-1 rounded border transition-colors ${
                      mapMetric === "users"
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    Unique visitors
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMetric("visits")}
                    className={`px-2 py-1 rounded border transition-colors ${
                      mapMetric === "visits"
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    Total visits
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Choropleth of {mapMetric === "users" ? "unique visitors" : "total visits"} per country (bots excluded). Hover a country for details; scroll or pinch to zoom.
              </p>
              {filteredTopCountries.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No country data yet — countries are recorded from new visits onwards.
                </p>
              ) : (
                <VisitorsWorldMap data={filteredTopCountries} metric={mapMetric} />
              )}
            </div>

            {/* Top countries */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">Top Countries</h2>
                </div>
                <div className="flex gap-1">
                  {([
                    { key: "today" as const, label: "Today" },
                    { key: "7d" as const, label: "7d" },
                    { key: "30d" as const, label: "30d" },
                    { key: "all" as const, label: "All" },
                  ]).map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setCountriesDateRange(opt.key)}
                      className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                        countriesDateRange === opt.key
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                      aria-pressed={countriesDateRange === opt.key}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Distinct visitors and page views grouped by country (resolved at visit time; bots and unknown user-agents excluded).
                {countriesDateRange !== "all" && (
                  <span className="ml-1 italic">Showing {countriesDateRange === "today" ? "today" : countriesDateRange === "7d" ? "last 7 days" : "last 30 days"}.</span>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1 ml-2 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px] cursor-help">
                      <Info className="w-3 h-3" aria-hidden="true" />
                      {excludedCountryCounts.visits.toLocaleString()} probable bots excluded
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    {excludedCountryCounts.visits.toLocaleString()} visits from {excludedCountryCounts.users.toLocaleString()} visitor IDs were filtered out. Includes user-agents matching known bot/crawler/monitor signatures and visits with no user-agent.
                  </TooltipContent>
                </Tooltip>
              </p>
              {filteredTopCountries.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No country data yet — countries are recorded from new visits onwards.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3 font-medium">Country</th>
                        <th className="py-2 pr-3 font-medium text-right">Users</th>
                        <th className="py-2 pr-3 font-medium text-right">Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTopCountries.map(c => (
                        <tr
                          key={c.country}
                          className="border-b border-border/50 cursor-pointer hover:bg-muted/40 transition-colors"
                          onClick={() => setDrillCountry({ code: c.country, name: c.countryName })}
                          title={`View daily trend for ${c.countryName}`}
                        >
                          <td className="py-2 pr-3 text-foreground">
                            <span aria-hidden className="text-base leading-none mr-2">{countryFlag(c.country)}</span>
                            <span className="font-mono text-muted-foreground mr-2">{c.country}</span>
                            <span className="underline-offset-2 hover:underline">{c.countryName}</span>
                          </td>
                          <td className="py-2 pr-3 text-right tabular-nums font-medium text-foreground">{c.users.toLocaleString()}</td>
                          <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground">{c.visits.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-[11px] text-muted-foreground">Tip: click a country to see its daily trend.</p>
                </div>
              )}
            </div>

            {/* Country drill-down dialog */}
            <Dialog open={!!drillCountry} onOpenChange={(o) => !o && setDrillCountry(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span aria-hidden className="text-xl leading-none">{drillCountry ? countryFlag(drillCountry.code) : ""}</span>
                    <span>{drillCountry?.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{drillCountry?.code}</span>
                  </DialogTitle>
                  <DialogDescription>
                    Daily users and visits — {countriesDateRange === "today" ? "today" : countriesDateRange === "7d" ? "last 7 days" : countriesDateRange === "30d" ? "last 30 days" : "last 90 days"}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-md border border-border bg-card">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Unique users</div>
                    <div className="text-xl font-semibold text-foreground tabular-nums">{drillTotals.users.toLocaleString()}</div>
                  </div>
                  <div className="p-3 rounded-md border border-border bg-card">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total visits</div>
                    <div className="text-xl font-semibold text-foreground tabular-nums">{drillTotals.visits.toLocaleString()}</div>
                  </div>
                </div>
                {drillTrend.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No visits recorded in this range.</p>
                ) : (
                  (() => {
                    const maxV = Math.max(1, ...drillTrend.map(d => d.visits));
                    const w = 640, h = 180, padL = 28, padR = 8, padT = 8, padB = 22;
                    const innerW = w - padL - padR;
                    const innerH = h - padT - padB;
                    const n = drillTrend.length;
                    const barW = innerW / n;
                    const usersMax = Math.max(1, ...drillTrend.map(d => d.users));
                    const linePts = drillTrend.map((d, i) => {
                      const x = padL + i * barW + barW / 2;
                      const y = padT + innerH - (d.users / usersMax) * innerH;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    }).join(" ");
                    const ticks = [0, 0.5, 1].map(t => Math.round(maxV * t));
                    return (
                      <div>
                        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label={`Daily trend for ${drillCountry?.name}`}>
                          {ticks.map((v, i) => {
                            const y = padT + innerH - (v / maxV) * innerH;
                            return (
                              <g key={i}>
                                <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth={0.5} />
                                <text x={padL - 4} y={y + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
                              </g>
                            );
                          })}
                          {drillTrend.map((d, i) => {
                            const x = padL + i * barW + 1;
                            const bh = (d.visits / maxV) * innerH;
                            const y = padT + innerH - bh;
                            return (
                              <rect key={d.date} x={x} y={y} width={Math.max(1, barW - 2)} height={bh} fill="hsl(var(--primary) / 0.35)">
                                <title>{`${d.date}: ${d.visits} visits, ${d.users} users`}</title>
                              </rect>
                            );
                          })}
                          <polyline points={linePts} fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} />
                          {drillTrend.map((d, i) => {
                            const x = padL + i * barW + barW / 2;
                            const y = padT + innerH - (d.users / usersMax) * innerH;
                            return <circle key={d.date} cx={x} cy={y} r={1.8} fill="hsl(var(--primary))" />;
                          })}
                          {(() => {
                            const labelEvery = Math.max(1, Math.ceil(n / 8));
                            return drillTrend.map((d, i) => {
                              if (i % labelEvery !== 0 && i !== n - 1) return null;
                              const x = padL + i * barW + barW / 2;
                              const short = d.date.slice(5);
                              return <text key={d.date} x={x} y={h - 6} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{short}</text>;
                            });
                          })()}
                        </svg>
                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded-sm" style={{ background: "hsl(var(--primary) / 0.35)" }} /> Visits</span>
                          <span className="flex items-center gap-1"><span className="inline-block w-3 h-[2px]" style={{ background: "hsl(var(--primary))" }} /> Unique users</span>
                        </div>
                      </div>
                    );
                  })()
                )}
              </DialogContent>
            </Dialog>



            {/* Cohort retention */}

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Cohort Retention</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Weekly cohorts grouped by first visit. D1 = % active on day 1; D7 = % returning on any day 2–7; D30 = % returning on any day 8–30 (windows are capped at observed age, so recent cohorts aren't penalised).
              </p>
              {analytics.retentionCohorts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No cohort data yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3 font-medium">Cohort</th>
                        <th className="py-2 pr-3 font-medium text-right">Size</th>
                        <th className="py-2 pr-3 font-medium text-right">D1</th>
                        <th className="py-2 pr-3 font-medium text-right">D7</th>
                        <th className="py-2 pr-3 font-medium text-right">D30</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.retentionCohorts.map(c => {
                        const cell = (pct: number | null, count: number | null) => {
                          if (pct === null) return <span className="text-muted-foreground/75">—</span>;
                          // Heatmap: 0 → muted, 100 → primary
                          const alpha = Math.max(0.08, Math.min(0.85, pct / 100));
                          return (
                            <span
                              className="inline-block px-2 py-0.5 rounded font-mono tabular-nums"
                              style={{ backgroundColor: `hsl(var(--primary) / ${alpha})`, color: pct > 40 ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
                              title={`${count} of ${c.size} returning`}
                            >
                              {pct}%
                            </span>
                          );
                        };
                        return (
                          <tr key={c.cohortStart} className="border-b border-border/50">
                            <td className="py-2 pr-3 text-foreground font-medium">{c.cohortLabel}</td>
                            <td className="py-2 pr-3 text-right tabular-nums text-foreground">{c.size}</td>
                            <td className="py-2 pr-3 text-right">{cell(c.d1Pct, c.d1)}</td>
                            <td className="py-2 pr-3 text-right">{cell(c.d7Pct, c.d7)}</td>
                            <td className="py-2 pr-3 text-right">{cell(c.d30Pct, c.d30)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>


            {/* Section breakdown */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Views by Section</h2>
              <p className="text-xs text-muted-foreground mb-3">Topic page views grouped by curriculum section</p>
              <ul className="space-y-2">
                {analytics.sectionBreakdown.map(s => {
                  const max = Math.max(...analytics.sectionBreakdown.map(x => x.views), 1);
                  const pct = (s.views / max) * 100;
                  const colorKey = Object.entries(sectionLabels).find(([, v]) => v === s.section)?.[0] || "physics";
                  return (
                    <li key={s.section} className="flex items-center gap-3" aria-label={`${s.section}: ${s.views} views`}>
                      <span className="text-xs text-foreground w-28 shrink-0 font-medium">{s.section}</span>
                      <div className="flex-1 h-5 rounded bg-secondary/50 overflow-hidden" aria-hidden="true">
                        <div
                          className={`h-full rounded ${sectionColors[colorKey] || "bg-primary"} transition-all duration-300`}
                          style={{ width: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground w-12 text-right tabular-nums">{s.views.toLocaleString()}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {analytics && activeTab === "topics" && (
          <section
            id="admin-panel-topics"
            role="tabpanel"
            aria-labelledby="admin-tab-topics"
            className="space-y-6"
          >
            {/* Top 20 most visited topics */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Most Visited Topics</h2>
              <p className="text-xs text-muted-foreground mb-4">Ranked by total page views across all users</p>
              <div className="space-y-2">
                {analytics.topTopics.slice(0, 20).map((t, i) => (
                  <div key={t.id} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-5 text-right shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{t.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${sectionColors[t.section] || "bg-primary"} text-white`}>
                          {sectionLabels[t.section] || t.section}
                        </span>
                      </div>
                      <div className="mt-1 h-2 rounded bg-secondary/50 overflow-hidden">
                        <div
                          className="h-full rounded bg-primary/60 transition-all duration-300"
                          style={{ width: `${Math.max((t.views / maxTopicViews) * 100, 1)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0 w-20">
                      <p className="text-sm font-bold text-foreground">{t.views}</p>
                      <p className="text-[10px] text-muted-foreground">{t.uniqueVisitors} user{t.uniqueVisitors !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                ))}
                {analytics.topTopics.every(t => t.views === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No topic visits recorded yet. Data will appear as users browse topics.</p>
                )}
              </div>
            </div>

            {/* Topics with zero views */}
            {analytics.topTopics.filter(t => t.views === 0).length > 0 && (
              <div className="p-4 rounded-xl border border-border bg-card">
                <h2 className="text-sm font-semibold text-foreground mb-1">Unvisited Topics</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  {analytics.topTopics.filter(t => t.views === 0).length} topics with no views yet
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {analytics.topTopics
                    .filter(t => t.views === 0)
                    .map(t => (
                      <span
                        key={t.id}
                        className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
                      >
                        {t.title}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === "seo" && (
          <section
            id="admin-panel-seo"
            role="tabpanel"
            aria-labelledby="admin-tab-seo"
          >
            <SeoAnalyticsPanel />
            <SearchVsReferrerPanel />
            <div className="mt-6">
              <JumpClicksPanel />
            </div>
            <SpoofedDomainsPanel />
            <div className="mt-8 border-t border-border pt-8">
              <WebVitalsPanel />
            </div>
          </section>
        )}

        {/* Formulary verification panel has moved to /admin/audit (Content Audit). */}

        </main>
      </div>
    </div>
    </TooltipProvider>
  );
};

type HourRangeMode = "today" | "yesterday" | "last7" | "last30" | "all" | "specific";

const HOUR_RANGE_PRESETS: { mode: HourRangeMode; label: string; help: string }[] = [
  { mode: "today",     label: "Today",       help: "Page views by hour for today only." },
  { mode: "yesterday", label: "Yesterday",   help: "Page views by hour for yesterday." },
  { mode: "last7",     label: "Last 7 days", help: "Hour-of-day distribution over the past 7 days." },
  { mode: "last30",    label: "Last 30 days",help: "Hour-of-day distribution over the past 30 days." },
  { mode: "all",       label: "All loaded",  help: "All visits within the dashboard date range above." },
  { mode: "specific",  label: "Specific day",help: "Pick a single day to inspect." },
];

function HourActivityCard({ analytics }: { analytics: Analytics }) {
  const [mode, setMode] = useState<HourRangeMode>("today");
  const [specificDate, setSpecificDate] = useState<Date | undefined>(undefined);

  // Determine the [start, end) window in ms for the selected mode.
  // For "all", we use the dashboard's loaded range (or -Infinity/+Infinity if all-time).
  const { startMs, endMs, label, note } = (() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const dayMs = 86_400_000;
    if (mode === "today") {
      return { startMs: todayStart, endMs: todayStart + dayMs, label: "Today", note: "Page views by hour for today." };
    }
    if (mode === "yesterday") {
      return { startMs: todayStart - dayMs, endMs: todayStart, label: "Yesterday", note: "Page views by hour for yesterday." };
    }
    if (mode === "last7") {
      return { startMs: todayStart - 6 * dayMs, endMs: todayStart + dayMs, label: "Last 7 days", note: "Aggregated hour-of-day distribution across the past 7 days." };
    }
    if (mode === "last30") {
      return { startMs: todayStart - 29 * dayMs, endMs: todayStart + dayMs, label: "Last 30 days", note: "Aggregated hour-of-day distribution across the past 30 days." };
    }
    if (mode === "specific" && specificDate) {
      const s = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate()).getTime();
      return {
        startMs: s,
        endMs: s + dayMs,
        label: format(specificDate, "EEE d MMM yyyy"),
        note: `Page views by hour for ${format(specificDate, "EEEE d MMMM yyyy")}.`,
      };
    }
    // "all" — fall through. Use dashboard range if set, else everything in the loaded set.
    const startMs = analytics.rangeStart ? new Date(analytics.rangeStart).getTime() : -Infinity;
    const endMs = analytics.rangeEnd ? new Date(analytics.rangeEnd).getTime() : Infinity;
    const labelBits: string[] = [];
    if (analytics.rangeStart) labelBits.push(format(new Date(analytics.rangeStart), "d MMM yyyy"));
    else labelBits.push("All time");
    if (analytics.rangeEnd) labelBits.push(format(new Date(analytics.rangeEnd), "d MMM yyyy"));
    return {
      startMs,
      endMs,
      label: labelBits.join(" → "),
      note: analytics.rangeStart || analytics.rangeEnd
        ? "Aggregated hour-of-day distribution across the dashboard date range above."
        : "Aggregated hour-of-day distribution across all loaded visits. Use the date range above to restrict.",
    };
  })();

  const hourly = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: 0 }));
  let totalInWindow = 0;
  for (const iso of analytics.visitTimestamps) {
    const t = new Date(iso).getTime();
    if (t < startMs || t >= endMs) continue;
    hourly[new Date(iso).getHours()].count += 1;
    totalInWindow += 1;
  }
  const max = niceMax(Math.max(...hourly.map(h => h.count), 1));
  const peak = hourly.reduce((b, c) => (c.count > b.count ? c : b), { hour: 0, count: 0 });
  const peakLabel = peak.count > 0 ? `${peak.hour.toString().padStart(2, "0")}:00` : "—";

  const showSpecificPicker = mode === "specific";
  const needsDate = mode === "specific" && !specificDate;

  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Activity by Hour — {label}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {note}
            {totalInWindow > 0 && (
              <> Peak {peakLabel} ({peak.count.toLocaleString()} views) · {totalInWindow.toLocaleString()} total.</>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3" role="group" aria-label="Hour-of-day time period">
        {HOUR_RANGE_PRESETS.map(p => {
          const selected = mode === p.mode;
          return (
            <Button
              key={p.mode}
              size="sm"
              variant={selected ? "default" : "outline"}
              onClick={() => setMode(p.mode)}
              title={p.help}
              aria-pressed={selected}
              className="h-7 px-2.5 text-xs"
            >
              {p.label}
            </Button>
          );
        })}
        {showSpecificPicker && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className={cn("h-7 px-2.5 text-xs justify-start font-normal", !specificDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                {specificDate ? format(specificDate, "d MMM yyyy") : "Pick a day"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={specificDate}
                onSelect={setSpecificDate}
                disabled={(d) => d > new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      {needsDate ? (
        <p className="text-xs text-muted-foreground py-6 text-center">Pick a day to view its hourly breakdown.</p>
      ) : totalInWindow === 0 ? (
        <p className="text-xs text-muted-foreground py-6 text-center">
          No visits recorded in this window.
          {mode === "all" && !analytics.rangeStart && !analytics.rangeEnd && (
            <> The loaded data set may be empty.</>
          )}
          {(mode !== "all" && (analytics.rangeStart || analytics.rangeEnd)) && (
            <> Note: the chart can only show data within the dashboard date range above — widen it to see older hours.</>
          )}
        </p>
      ) : (
        <>
          <div className="flex gap-2">
            <ChartYAxis max={max} heightClass="h-32" />
            <div className="flex-1">
              <div
                className="flex items-end gap-[2px] h-32"
                role="img"
                aria-label={`Bar chart of page views by hour of day for ${label}. Peak hour ${peakLabel} with ${peak.count} views.`}
                style={chartGridStyle}
              >
                {hourly.map(h => {
                  const height = (h.count / max) * 100;
                  const isPeak = h.count === peak.count && h.count > 0;
                  return (
                    <div
                      key={h.hour}
                      className={`flex-1 rounded-t min-h-[2px] transition-colors ${isPeak ? "bg-primary" : "bg-primary/50"}`}
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={`${h.hour.toString().padStart(2, "0")}:00 — ${h.count} views`}
                      aria-hidden="true"
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 tabular-nums">
                <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
              </div>
            </div>
          </div>
        </>

      )}
    </div>
  );
}

export default AdminDashboard;
