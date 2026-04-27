import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { allTopics } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { LogOut, Users, CalendarDays, TrendingUp, RefreshCw, BookOpen, BarChart3, Pill, Play, Square, CheckCircle2, AlertCircle } from "lucide-react";

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
  totalVisits: number;
  todayVisits: number;
  last7Days: { date: string; count: number }[];
  topTopics: TopicStat[];
  sectionBreakdown: { section: string; views: number }[];
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

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

    const { data: allVisits } = await supabase.from("app_visits").select("visitor_id, visited_at, page_path");
    const uniqueVisitors = new Set(allVisits?.map(v => v.visitor_id) || []);

    const { data: todayData } = await supabase
      .from("app_visits")
      .select("visitor_id")
      .gte("visited_at", todayStart);
    const todayUnique = new Set(todayData?.map(v => v.visitor_id) || []);

    // Last 7 days
    const last7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const dayVisits = allVisits?.filter(v => v.visited_at >= dayStart && v.visited_at < dayEnd) || [];
      const dayUnique = new Set(dayVisits.map(v => v.visitor_id));
      last7Days.push({
        date: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        count: dayUnique.size,
      });
    }

    // Topic-level analytics
    const topicVisitMap = new Map<string, { views: number; visitors: Set<string> }>();
    const sectionViewMap = new Map<string, number>();

    allVisits?.forEach(v => {
      if (!v.page_path) return;
      // Match topic paths like /physiology/cardiac-cycle
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

    setAnalytics({
      totalUniqueUsers: uniqueVisitors.size,
      dailyUsers: todayUnique.size,
      totalVisits: allVisits?.length || 0,
      todayVisits: todayData?.length || 0,
      last7Days,
      topTopics,
      sectionBreakdown,
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Unique Users", value: analytics.totalUniqueUsers, icon: Users, color: "text-blue-500" },
                { label: "Daily Active Users", value: analytics.dailyUsers, icon: CalendarDays, color: "text-green-500" },
                { label: "Total Page Views", value: analytics.totalVisits, icon: TrendingUp, color: "text-purple-500" },
                { label: "Today's Page Views", value: analytics.todayVisits, icon: TrendingUp, color: "text-orange-500" },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Unique Users — Last 7 Days</h2>
              <div className="flex items-end gap-2 h-40">
                {analytics.last7Days.map(day => {
                  const max = Math.max(...analytics.last7Days.map(d => d.count), 1);
                  const height = (day.count / max) * 100;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-foreground">{day.count}</span>
                      <div
                        className="w-full rounded-t bg-primary/70 transition-all duration-300 min-h-[4px]"
                        style={{ height: `${Math.max(height, 3)}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground leading-tight text-center">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section breakdown */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground mb-3">Views by Section</h2>
              <div className="space-y-2">
                {analytics.sectionBreakdown.map(s => {
                  const max = Math.max(...analytics.sectionBreakdown.map(x => x.views), 1);
                  const pct = (s.views / max) * 100;
                  const colorKey = Object.entries(sectionLabels).find(([, v]) => v === s.section)?.[0] || "physics";
                  return (
                    <div key={s.section} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-28 shrink-0">{s.section}</span>
                      <div className="flex-1 h-5 rounded bg-secondary/50 overflow-hidden">
                        <div
                          className={`h-full rounded ${sectionColors[colorKey] || "bg-primary"} transition-all duration-300`}
                          style={{ width: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground w-10 text-right">{s.views}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {analytics && activeTab === "topics" && (
          <>
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
          </>
        )}

        {activeTab === "formulary" && (
          <div className="space-y-4">
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
                    <Button onClick={cancelVerification} variant="destructive" size="sm">
                      <Square className="w-4 h-4 mr-1" /> Cancel
                    </Button>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
