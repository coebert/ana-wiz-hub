import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Atom,
  Heart,
  FlaskConical,
  Bone,
  Stethoscope,
  Activity,
  ClipboardList,
  Beaker,
  Clock,
  CalendarDays,
  Timer,
  BookOpen,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { useStudyTime, formatDuration, toHours, todayKey } from "@/hooks/useStudyTime";
import { useAuth } from "@/hooks/useAuth";
import { Section, Topic, allTopics } from "@/data/curriculum";

const sectionMeta: {
  key: Section;
  title: string;
  path: string;
  icon: typeof Atom;
  iconColor: string;
  barClass: string;
}[] = [
  { key: "physics", title: "Physics", path: "/physics", icon: Atom, iconColor: "text-physics", barClass: "bg-physics" },
  { key: "physiology", title: "Physiology", path: "/physiology", icon: Heart, iconColor: "text-physiology", barClass: "bg-physiology" },
  { key: "pharmacology", title: "Pharmacology", path: "/pharmacology", icon: FlaskConical, iconColor: "text-pharmacology", barClass: "bg-pharmacology" },
  { key: "anatomy", title: "Anatomy", path: "/anatomy", icon: Bone, iconColor: "text-anatomy", barClass: "bg-anatomy" },
  { key: "clinical", title: "Clinical Anaesthesia", path: "/clinical", icon: Stethoscope, iconColor: "text-clinical", barClass: "bg-clinical" },
  { key: "intensive-care", title: "Intensive Care", path: "/intensive-care", icon: Activity, iconColor: "text-icu", barClass: "bg-icu" },
  { key: "perioperative", title: "Perioperative Medicine", path: "/perioperative", icon: ClipboardList, iconColor: "text-perioperative", barClass: "bg-perioperative" },
  { key: "chemistry", title: "Chemistry Foundations", path: "/chemistry", icon: Beaker, iconColor: "text-chemistry", barClass: "bg-chemistry" },
];

/** Last 14 day keys, oldest first. */
function recentDays(n: number): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(todayKey(d));
  }
  return out;
}

const StudyStats = () => {
  const { byDay, byTopic, totalSeconds, loading } = useStudyTime();
  const { user } = useAuth();

  const topicLookup = useMemo(() => {
    const pathBySection = new Map(sectionMeta.map((s) => [s.key, s.path]));
    const map = new Map<string, { topic: Topic; path: string }>();
    for (const t of allTopics) {
      const base = pathBySection.get(t.section);
      if (base) map.set(t.id, { topic: t, path: `${base}/${t.id}` });
    }
    return map;
  }, []);

  const sections = useMemo(() => {
    const rows = sectionMeta.map((s) => {
      const topics = Object.entries(byTopic)
        .map(([topicId, seconds]) => {
          const entry = topicLookup.get(topicId);
          if (!entry || entry.topic.section !== s.key) return null;
          return { topicId, seconds, title: entry.topic.title, path: entry.path };
        })
        .filter((t): t is { topicId: string; seconds: number; title: string; path: string } => t !== null)
        .sort((a, b) => b.seconds - a.seconds);
      const seconds = topics.reduce((n, t) => n + t.seconds, 0);
      return { ...s, topics, seconds };
    });
    return rows.filter((r) => r.seconds > 0).sort((a, b) => b.seconds - a.seconds);
  }, [byTopic, topicLookup]);

  const maxSectionSeconds = sections[0]?.seconds ?? 0;

  const days = useMemo(() => {
    const keys = recentDays(14);
    return keys.map((day) => {
      const seconds = Object.values(byDay[day] ?? {}).reduce((n, s) => n + s, 0);
      return { day, seconds };
    });
  }, [byDay]);

  const maxDaySeconds = Math.max(...days.map((d) => d.seconds), 1);
  const todaySeconds = byDay[todayKey()]
    ? Object.values(byDay[todayKey()]).reduce((n, s) => n + s, 0)
    : 0;
  const last7 = days.slice(-7).reduce((n, d) => n + d.seconds, 0);
  const topicsStudied = Object.keys(byTopic).filter((id) => topicLookup.has(id)).length;
  const daysActive = Object.values(byDay).filter((topics) =>
    Object.values(topics).some((s) => s > 0)
  ).length;

  const hasData = totalSeconds > 0;

  return (
    <PageSection spacing="default" width="xwide">
      <Helmet>
        <title>Study Stats – Hours Per Topic – AnaesthesiaCore</title>
        <meta
          name="description"
          content="See how many hours you have spent revising each anaesthesia topic, with a time breakdown by section and a 14-day study trend."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/study-stats" />
        <meta property="og:title" content="Study Stats – Hours Per Topic – AnaesthesiaCore" />
        <meta
          property="og:description"
          content="Hours spent per anaesthesia topic, broken down by curriculum section."
        />
        <meta property="og:url" content="https://anaesthesiacore.app/study-stats" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Study Stats – Hours Per Topic" />
        <meta name="twitter:description" content="Hours spent per anaesthesia topic, broken down by section." />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Timer className="h-4 w-4" />
          <span>Study stats</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
          Hours spent on each topic
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Active reading time is measured while a topic page is open and you are actually working —
          idle tabs stop counting.{" "}
          {user
            ? "Your totals sync across every device you sign in on."
            : "Sign in to keep these totals across devices."}{" "}
          <Link to="/progress" className="text-primary hover:underline">
            See topic completion
          </Link>
          .
        </p>
      </div>

      {/* Headline figures */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total study time", value: `${toHours(totalSeconds)} h`, icon: Clock },
          { label: "Today", value: formatDuration(todaySeconds), icon: Timer },
          { label: "Last 7 days", value: formatDuration(last7), icon: CalendarDays },
          { label: "Topics studied", value: String(topicsStudied), icon: BookOpen },
        ].map((tile) => (
          <div key={tile.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <tile.icon className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wide">{tile.label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{tile.value}</div>
          </div>
        ))}
      </div>

      {!hasData && (
        <div className="rounded-xl border border-dashed border-border bg-card/60 p-6 mb-8">
          <h2 className="font-serif text-lg font-bold text-foreground mb-1">No study time yet</h2>
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading your study history…"
              : "Open any topic and start reading — time is recorded automatically and this page fills in."}
          </p>
        </div>
      )}

      {hasData && (
        <>
          {/* Daily trend */}
          <section className="mb-8">
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">Last 14 days</h2>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-end gap-1.5 h-32">
                {days.map((d) => {
                  const heightPct = Math.max((d.seconds / maxDaySeconds) * 100, d.seconds > 0 ? 4 : 1.5);
                  const label = new Date(`${d.day}T00:00:00`).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                  });
                  return (
                    <div key={d.day} className="flex-1 h-full px-[1px] flex flex-col justify-end items-center min-w-0">
                      <div
                        className={`w-full rounded-t-sm ${d.seconds > 0 ? "bg-primary" : "bg-muted"}`}
                        style={{ height: `${heightPct}%` }}
                        title={`${label}: ${formatDuration(d.seconds)}`}
                        aria-label={`${label}: ${formatDuration(d.seconds)}`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
                <span>{new Date(`${days[0].day}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
                <span>
                  {daysActive} day{daysActive === 1 ? "" : "s"} with study time
                </span>
                <span>Today</span>
              </div>
            </div>
          </section>

          {/* Section breakdown */}
          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">Time by section</h2>
            <div className="space-y-4">
              {sections.map((s) => {
                const share = totalSeconds > 0 ? Math.round((s.seconds / totalSeconds) * 100) : 0;
                const barPct = maxSectionSeconds > 0 ? (s.seconds / maxSectionSeconds) * 100 : 0;
                return (
                  <div key={s.key} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <Link to={s.path} className="flex items-center gap-2 group min-w-0">
                        <s.icon className={`h-4 w-4 shrink-0 ${s.iconColor}`} />
                        <span className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {s.title}
                        </span>
                      </Link>
                      <div className="text-sm text-muted-foreground shrink-0">
                        <span className="font-semibold text-foreground">{formatDuration(s.seconds)}</span>{" "}
                        · {share}% of total
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full ${s.barClass} transition-all duration-500`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                    <ul className="space-y-1">
                      {s.topics.map((t) => {
                        const topicPct = s.seconds > 0 ? (t.seconds / s.seconds) * 100 : 0;
                        return (
                          <li key={t.topicId}>
                            <Link
                              to={t.path}
                              className="group flex items-center gap-3 rounded-md px-2 py-1.5 -mx-2 hover:bg-muted/40 transition-colors"
                            >
                              <span className="text-sm text-foreground truncate flex-1 min-w-0 group-hover:text-primary transition-colors">
                                {t.title}
                              </span>
                              <span className="hidden sm:block h-1 w-24 rounded-full bg-muted overflow-hidden shrink-0">
                                <span
                                  className={`block h-full rounded-full ${s.barClass}`}
                                  style={{ width: `${topicPct}%` }}
                                />
                              </span>
                              <span className="text-xs text-muted-foreground shrink-0 tabular-nums w-16 text-right">
                                {formatDuration(t.seconds)}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </PageSection>
  );
};

export default StudyStats;
