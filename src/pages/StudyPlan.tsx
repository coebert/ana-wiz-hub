import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  CalendarClock,
  CalendarPlus,
  Check,
  Download,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import { useRecentTopics } from "@/hooks/useRecentTopics";
import { useStudyTime, formatDuration } from "@/hooks/useStudyTime";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { EXAM_TAGS, ExamTag } from "@/data/curriculum";
import {
  DEFAULT_SCHEDULE,
  REASON_LABELS,
  ScheduleConfig,
  SECTION_TITLES,
  buildSchedule,
  formatSessionDate,
  isoDate,
  readStoredPlan,
  recommendTopics,
  scheduleToIcs,
  storePlan,
  topicsPerSession,
} from "@/lib/study-plan";

const EXAM_LABELS: Record<ExamTag, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
  edic: "EDIC",
};

const WEEKDAYS = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 0, label: "Sun" },
];

const MINUTE_OPTIONS = [20, 30, 45, 60, 90];
const WEEK_OPTIONS = [1, 2, 4, 6, 8, 12];

const StudyPlan = () => {
  const { completedTopics, isCompleted, toggleTopic } = useProgress();
  const recent = useRecentTopics();
  const { byTopic } = useStudyTime();
  const { activeExam } = useExamFilter();

  const [config, setConfig] = useState<ScheduleConfig>(
    () => readStoredPlan()?.config ?? { ...DEFAULT_SCHEDULE, exam: activeExam }
  );

  useEffect(() => {
    storePlan(config);
  }, [config]);

  const recentIds = useMemo(() => recent.map((r) => r.topicId), [recent]);

  const ranked = useMemo(
    () =>
      recommendTopics({
        completed: completedTopics,
        recentIds,
        studySeconds: byTopic,
        exam: config.exam,
      }),
    [completedTopics, recentIds, byTopic, config.exam]
  );

  const sessions = useMemo(() => buildSchedule(config, ranked), [config, ranked]);

  const topPicks = ranked.slice(0, 6);
  const perSession = topicsPerSession(config.minutesPerSession);
  const plannedTopics = sessions.reduce((n, s) => n + s.topics.length, 0);
  const plannedMinutes = sessions.length * config.minutesPerSession;

  const toggleWeekday = (value: number) =>
    setConfig((c) => ({
      ...c,
      weekdays: c.weekdays.includes(value)
        ? c.weekdays.filter((d) => d !== value)
        : [...c.weekdays, value],
    }));

  const downloadIcs = () => {
    const blob = new Blob([scheduleToIcs(sessions)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anaesthesiacore-study-plan.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageSection spacing="default" width="xwide">
      <Helmet>
        <title>Study Plan Builder – Recommended Topics – AnaesthesiaCore</title>
        <meta
          name="description"
          content="Build a personalised anaesthesia revision schedule. Topic recommendations from your progress and recent reading, with a calendar export."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/study-plan" />
        <meta property="og:title" content="Study Plan Builder – AnaesthesiaCore" />
        <meta
          property="og:description"
          content="A revision schedule built from your progress, recent topics and exam target."
        />
        <meta property="og:url" content="https://anaesthesiacore.app/study-plan" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Study Plan Builder – AnaesthesiaCore" />
        <meta
          name="twitter:description"
          content="A revision schedule built from your progress and recent topics."
        />
      </Helmet>

      <header className="max-w-2xl space-y-3">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden />
          Study plan
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
          What to revise next
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Recommendations come from the topics you have completed, the ones you opened most
          recently and where you have spent the least time. Set your available days below and the
          schedule fills itself in.{" "}
          <Link to="/study-stats" className="text-primary hover:underline">
            See hours per topic
          </Link>
          .
        </p>
      </header>

      {/* Recommendations */}
      <section aria-labelledby="recommended-heading" className="mt-10 space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="recommended-heading"
            className="font-serif text-xl font-semibold text-foreground inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            Recommended next
          </h2>
          <p className="text-xs text-muted-foreground">
            {ranked.length} topic{ranked.length === 1 ? "" : "s"} still to cover
          </p>
        </div>

        {topPicks.length === 0 ? (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Nothing outstanding for this exam filter — everything available is marked complete.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topPicks.map(({ topic, path, reason }) => (
              <li
                key={topic.id}
                className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={path}
                    className="font-medium text-foreground hover:text-primary transition-colors leading-snug"
                  >
                    {topic.title}
                  </Link>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                    {SECTION_TITLES[topic.section]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{REASON_LABELS[reason]}</p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] text-muted-foreground">
                    {byTopic[topic.id] ? formatDuration(byTopic[topic.id]) : "Not started"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Mark ${topic.title} complete`}
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Mark done
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Schedule builder */}
      <section aria-labelledby="builder-heading" className="mt-12 space-y-4">
        <h2
          id="builder-heading"
          className="font-serif text-xl font-semibold text-foreground inline-flex items-center gap-2"
        >
          <Target className="h-4 w-4 text-primary" aria-hidden />
          Schedule builder
        </h2>

        <div className="rounded-xl border border-border bg-card p-5 space-y-6">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">Study days</legend>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => {
                const on = config.weekdays.includes(d.value);
                return (
                  <button
                    key={d.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleWeekday(d.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      on
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-foreground">Minutes per session</span>
              <select
                value={config.minutesPerSession}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, minutesPerSession: Number(e.target.value) }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                {MINUTE_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m} minutes
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-foreground">Plan length</span>
              <select
                value={config.weeks}
                onChange={(e) => setConfig((c) => ({ ...c, weeks: Number(e.target.value) }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                {WEEK_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w} week{w === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-foreground">Start date</span>
              <input
                type="date"
                value={config.startDate}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, startDate: e.target.value || isoDate(new Date()) }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              />
            </label>

            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-foreground">Exam target</span>
              <select
                value={config.exam ?? "all"}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    exam: e.target.value === "all" ? null : (e.target.value as ExamTag),
                  }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="all">Whole curriculum</option>
                {EXAM_TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {EXAM_LABELS[tag]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground flex-1 min-w-[12rem]">
              {sessions.length} session{sessions.length === 1 ? "" : "s"} · {plannedTopics} topics ·
              about {Math.round((plannedMinutes / 60) * 10) / 10} h in total ·{" "}
              {perSession} topic{perSession === 1 ? "" : "s"} per session
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setConfig((c) => ({ ...c, startDate: isoDate(new Date()) }))
              }
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" aria-hidden />
              Restart from today
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={downloadIcs}
              disabled={sessions.length === 0}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" aria-hidden />
              Add to calendar
            </Button>
          </div>
        </div>
      </section>

      {/* Generated schedule */}
      <section aria-labelledby="schedule-heading" className="mt-10 space-y-4">
        <h2
          id="schedule-heading"
          className="font-serif text-xl font-semibold text-foreground inline-flex items-center gap-2"
        >
          <CalendarPlus className="h-4 w-4 text-primary" aria-hidden />
          Your schedule
        </h2>

        {sessions.length === 0 ? (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Pick at least one study day to generate a schedule.
          </p>
        ) : (
          <ol className="space-y-3">
            {sessions.map((s) => {
              const done = s.topics.every((t) => isCompleted(t.id));
              return (
                <li
                  key={s.date}
                  className={`rounded-xl border p-4 ${
                    done ? "border-primary/40 bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-foreground">{formatSessionDate(s.date)}</p>
                    <p className="text-xs text-muted-foreground">{s.minutes} min</p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {s.topics.map((t) => {
                      const complete = isCompleted(t.id);
                      return (
                        <li key={t.id} className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleTopic(t.id)}
                            aria-pressed={complete}
                            aria-label={`Mark ${t.title} ${complete ? "not done" : "done"}`}
                            className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                              complete
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary"
                            }`}
                          >
                            {complete && <Check className="h-3 w-3" aria-hidden />}
                          </button>
                          <Link
                            to={t.path}
                            className={`text-sm hover:text-primary transition-colors ${
                              complete
                                ? "text-muted-foreground line-through"
                                : "text-foreground"
                            }`}
                          >
                            {t.title}
                          </Link>
                          <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                            {SECTION_TITLES[t.section]}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </PageSection>
  );
};

export default StudyPlan;
