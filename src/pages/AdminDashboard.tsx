import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { allTopics } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { LogOut, Users, CalendarDays, TrendingUp, RefreshCw, BookOpen, BarChart3, Pill, Play, Square, CheckCircle2, AlertCircle, UserPlus, Repeat, Clock, Activity, Layers, Globe } from "lucide-react";

interface TopicStat {
  id: string;
  title: string;
  section: string;
  views: number;
  uniqueVisitors: number;
}

interface Analytics {
  totalUniqueUsers: number;
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
  last30Days: { date: string; count: number }[];
  hourlyToday: { hour: number; count: number }[];
  topEntryPaths: { path: string; count: number }[];
  topUsers: { visitorId: string; visits: number; activeDays: number; firstSeen: string; lastSeen: string }[];
  topCountries: { country: string; countryName: string; users: number; visits: number }[];
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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "topics" | "formulary">("overview");

  // Formulary verification state
  interface VerificationJob {
    id: string;
    status: string;
    total: number;
    processed: number;
    succeeded: number;
    failed: number;
    current_drug: string | null;
    last_error: string | null;
    created_at: string;
    updated_at: string;
    completed_at: string | null;
  }
  interface VerificationLog {
    id: string;
    drug_name: string;
    drug_slug: string;
    status: string;
    fields_changed: string[];
    error: string | null;
    created_at: string;
  }
  const [job, setJob] = useState<VerificationJob | null>(null);
  const [logs, setLogs] = useState<VerificationLog[]>([]);
  const [starting, setStarting] = useState(false);

  const fetchJob = async () => {
    const { data: jobs } = await supabase
      .from("drug_verification_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    const j = (jobs?.[0] as VerificationJob | undefined) ?? null;
    setJob(j);
    if (j) {
      const { data: logRows } = await supabase
        .from("drug_verification_log")
        .select("*")
        .eq("job_id", j.id)
        .order("created_at", { ascending: false })
        .limit(50);
      setLogs((logRows ?? []) as VerificationLog[]);
    }
  };

  useEffect(() => {
    if (activeTab !== "formulary") return;
    fetchJob();
    const interval = setInterval(fetchJob, 3000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const startVerification = async () => {
    setStarting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke("verify-drugs", {
        body: { action: "start" },
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await fetchJob();
    } catch (e) {
      alert(`Could not start: ${e instanceof Error ? e.message : "Unknown error"}`);
    } finally {
      setStarting(false);
    }
  };

  const cancelVerification = async () => {
    if (!job) return;
    if (!confirm("Cancel the running verification job?")) return;
    const { data: { session } } = await supabase.auth.getSession();
    await supabase.functions.invoke("verify-drugs", {
      body: { action: "cancel", jobId: job.id },
      headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
    });
    await fetchJob();
  };

  const resumeVerification = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.functions.invoke("verify-drugs", {
      body: { action: "resume" },
      headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
    });
    if (error || data?.error) {
      alert(`Could not resume: ${error?.message ?? data?.error ?? "Unknown"}`);
    }
    await fetchJob();
  };

  const isStalled = !!job
    && ["pending", "running"].includes(job.status)
    && Date.now() - new Date(job.updated_at).getTime() > 90_000;

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: allVisits } = await supabase
      .from("app_visits")
      .select("visitor_id, visited_at, page_path, country, country_name")
      .limit(100000);
    const visits = allVisits ?? [];
    const uniqueVisitors = new Set(visits.map(v => v.visitor_id));

    const { data: todayData } = await supabase
      .from("app_visits")
      .select("visitor_id")
      .gte("visited_at", todayStart)
      .limit(100000);
    const todayUnique = new Set(todayData?.map(v => v.visitor_id) || []);

    // First-seen timestamp per visitor → used for new-vs-returning split
    const firstSeen = new Map<string, string>();
    const visitsPerUser = new Map<string, number>();
    const activeDaysPerUser = new Map<string, Set<string>>();
    const lastSeen = new Map<string, string>();
    visits.forEach(v => {
      const prev = firstSeen.get(v.visitor_id);
      if (!prev || v.visited_at < prev) firstSeen.set(v.visitor_id, v.visited_at);
      const prevLast = lastSeen.get(v.visitor_id);
      if (!prevLast || v.visited_at > prevLast) lastSeen.set(v.visitor_id, v.visited_at);
      visitsPerUser.set(v.visitor_id, (visitsPerUser.get(v.visitor_id) || 0) + 1);
      const day = v.visited_at.slice(0, 10);
      if (!activeDaysPerUser.has(v.visitor_id)) activeDaysPerUser.set(v.visitor_id, new Set());
      activeDaysPerUser.get(v.visitor_id)!.add(day);
    });

    const topUsers = Array.from(visitsPerUser.entries())
      .map(([visitorId, visits]) => ({
        visitorId,
        visits,
        activeDays: activeDaysPerUser.get(visitorId)?.size ?? 0,
        firstSeen: firstSeen.get(visitorId) ?? "",
        lastSeen: lastSeen.get(visitorId) ?? "",
      }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 15);

    // Top countries (by unique visitors, then total visits)
    const countryVisits = new Map<string, { name: string; users: Set<string>; visits: number }>();
    visits.forEach((v: { visitor_id: string; country?: string | null; country_name?: string | null }) => {
      const c = (v.country ?? "").toUpperCase();
      if (!c || c.length !== 2) return;
      if (!countryVisits.has(c)) {
        countryVisits.set(c, { name: v.country_name ?? c, users: new Set(), visits: 0 });
      }
      const entry = countryVisits.get(c)!;
      entry.users.add(v.visitor_id);
      entry.visits += 1;
    });
    const topCountries = Array.from(countryVisits.entries())
      .map(([country, e]) => ({ country, countryName: e.name, users: e.users.size, visits: e.visits }))
      .sort((a, b) => b.users - a.users || b.visits - a.visits)
      .slice(0, 15);

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

    // 7d / 30d rolling unique
    const weeklyUsers = new Set(
      visits.filter(v => v.visited_at >= sevenDaysAgo).map(v => v.visitor_id),
    ).size;
    const monthlyUsers = new Set(
      visits.filter(v => v.visited_at >= thirtyDaysAgo).map(v => v.visitor_id),
    ).size;

    // Last 7 days
    const last7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const dayVisits = visits.filter(v => v.visited_at >= dayStart && v.visited_at < dayEnd);
      const dayUnique = new Set(dayVisits.map(v => v.visitor_id));
      last7Days.push({
        date: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        count: dayUnique.size,
      });
    }

    // Last 30 days (unique users per day)
    const last30Days: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const dayUnique = new Set(
        visits.filter(v => v.visited_at >= dayStart && v.visited_at < dayEnd).map(v => v.visitor_id),
      );
      last30Days.push({
        date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        count: dayUnique.size,
      });
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
      const computeDay = (offset: number): { count: number; pct: number } | null => {
        // Only compute if cohort has had time to be observed at this offset (need at least offset+1 days since cohort start)
        if (ageDays < offset) return null;
        let count = 0;
        uids.forEach(uid => {
          const firstTs = firstSeen.get(uid)!;
          const firstDayMs = new Date(dayKey(firstTs) + "T00:00:00").getTime();
          const targetKey = new Date(firstDayMs + offset * msDay).toISOString().slice(0, 10);
          if (userActiveDays.get(uid)?.has(targetKey)) count++;
        });
        return { count, pct: uids.length > 0 ? Math.round((count / uids.length) * 100) : 0 };
      };
      const d1 = computeDay(1);
      const d7 = computeDay(7);
      const d30 = computeDay(30);
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

    setAnalytics({
      totalUniqueUsers: uniqueVisitors.size,
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
      last30Days,
      hourlyToday,
      topEntryPaths,
      topTopics,
      sectionBreakdown,
      retentionCohorts,
      topUsers,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) fetchAnalytics();
  }, [user, isAdmin]);

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
    { key: "formulary" as const, label: "Formulary Verify", icon: Pill, hint: "Re-check drug monographs against reference sources" },
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
              onClick={fetchAnalytics}
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
              aria-label="Open content accuracy audit"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Headline statistics">
              {[
                { label: "Total Unique Users", value: analytics.totalUniqueUsers, icon: Users, color: "text-blue-500", help: "Distinct visitors ever recorded" },
                { label: "Daily Active Users", value: analytics.dailyUsers, icon: CalendarDays, color: "text-green-500", help: "Distinct visitors today" },
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
                { label: "Weekly Active", value: analytics.weeklyUsers, fmt: (v: number) => v.toLocaleString(), icon: Activity, color: "text-sky-500", help: "Distinct visitors in the last 7 days" },
                { label: "Monthly Active", value: analytics.monthlyUsers, fmt: (v: number) => v.toLocaleString(), icon: CalendarDays, color: "text-indigo-500", help: "Distinct visitors in the last 30 days" },
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
              <div className="flex items-end gap-2 h-40" role="img" aria-label={`Bar chart of unique users per day for the last 7 days. ${analytics.last7Days.map(d => `${d.date}: ${d.count}`).join(", ")}.`}>
                {analytics.last7Days.map(day => {
                  const max = Math.max(...analytics.last7Days.map(d => d.count), 1);
                  const height = (day.count / max) * 100;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1" title={`${day.date}: ${day.count} unique users`}>
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

            {/* 30-day sparkline */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Unique Users — Last 30 Days</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Daily distinct visitors · {analytics.monthlyUsers.toLocaleString()} unique over the period
              </p>
              <div className="flex items-end gap-[2px] h-24" role="img" aria-label="Bar chart of unique users per day for the last 30 days">
                {analytics.last30Days.map(day => {
                  const max = Math.max(...analytics.last30Days.map(d => d.count), 1);
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

            {/* Hour of day */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-1">Activity by Hour — Today</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Page views by hour of day · peak {analytics.peakHourLabel}
                {analytics.peakHourCount > 0 ? ` (${analytics.peakHourCount} views)` : ""}
              </p>
              <div className="flex items-end gap-[2px] h-24" role="img" aria-label="Bar chart of page views by hour of day for today">
                {analytics.hourlyToday.map(h => {
                  const max = Math.max(...analytics.hourlyToday.map(x => x.count), 1);
                  const height = (h.count / max) * 100;
                  const isPeak = h.count === max && h.count > 0;
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
                        return (
                          <tr key={u.visitorId} className="border-b border-border/50">
                            <td className="py-2 pr-3 font-mono text-foreground truncate max-w-[180px]" title={u.visitorId}>
                              {u.visitorId.length > 20 ? u.visitorId.slice(0, 18) + "…" : u.visitorId}
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

            {/* Cohort retention */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Cohort Retention</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Weekly cohorts grouped by first visit. D1 / D7 / D30 = % of cohort users who returned on day 1, 7, or 30 after first seen.
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
                          if (pct === null) return <span className="text-muted-foreground/50">—</span>;
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

        {activeTab === "formulary" && (
          <section
            id="admin-panel-formulary"
            role="tabpanel"
            aria-labelledby="admin-tab-formulary"
            className="space-y-4"
          >
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-base font-semibold text-foreground">Verify formulary against reference sources</h2>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                    Re-checks every drug monograph for consistency with the eMC SPCs (medicines.org.uk),
                    NICE BNF public pages, and AAGBI / ICS / RCoA guidelines. Updates are written
                    directly to the formulary. Runs in the background — you can leave this page.
                  </p>
                </div>
                <div className="flex gap-2">
                  {(!job || ["completed", "failed", "cancelled"].includes(job.status)) && (
                    <Button onClick={startVerification} disabled={starting} size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      {starting ? "Starting…" : "Verify all drugs"}
                    </Button>
                  )}
                  {job && ["pending", "running"].includes(job.status) && (
                    <>
                      {isStalled && (
                        <Button onClick={resumeVerification} size="sm" variant="secondary">
                          <Play className="w-4 h-4 mr-1" /> Resume
                        </Button>
                      )}
                      <Button onClick={cancelVerification} variant="destructive" size="sm">
                        <Square className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>


              {job && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap text-xs">
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      job.status === "running" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" :
                      job.status === "completed" ? "bg-green-500/15 text-green-600 dark:text-green-400" :
                      job.status === "failed" ? "bg-red-500/15 text-red-600 dark:text-red-400" :
                      job.status === "cancelled" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                      "bg-secondary text-muted-foreground"
                    }`}>{job.status.toUpperCase()}</span>
                    <span className="text-muted-foreground">
                      {job.processed} / {job.total} processed
                    </span>
                    <span className="text-green-600 dark:text-green-400">{job.succeeded} ok</span>
                    {job.failed > 0 && (
                      <span className="text-red-600 dark:text-red-400">{job.failed} failed</span>
                    )}
                    {job.current_drug && (
                      <span className="text-muted-foreground">→ {job.current_drug}</span>
                    )}
                  </div>

                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${job.total ? (job.processed / job.total) * 100 : 0}%` }}
                    />
                  </div>

                  {job.last_error && (
                    <p className="text-xs text-red-600 dark:text-red-400 break-words">
                      Last error: {job.last_error}
                    </p>
                  )}
                </div>
              )}
            </div>

            {logs.length > 0 && (
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="text-sm font-semibold text-foreground mb-3">Recent activity (latest 50)</h3>
                <div className="space-y-1.5 max-h-[480px] overflow-y-auto">
                  {logs.map(l => (
                    <div key={l.id} className="flex items-start gap-2 text-xs">
                      {l.status === "updated" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      ) : l.status === "unchanged" ? (
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-foreground">{l.drug_name}</span>
                        <span className="text-muted-foreground ml-2">
                          {l.status === "updated" ? `updated · ${l.fields_changed.join(", ")}` :
                           l.status === "unchanged" ? "no changes needed" :
                           `failed: ${l.error ?? "unknown"}`}
                        </span>
                      </div>
                      <span className="text-muted-foreground shrink-0">
                        {new Date(l.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
