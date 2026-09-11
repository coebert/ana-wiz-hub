import { Topic, Section, ExamTag, allTopics } from "@/data/curriculum";

/** Route prefix for each curriculum section. */
export const SECTION_PATHS: Record<Section, string> = {
  physics: "/physics",
  physiology: "/physiology",
  pharmacology: "/pharmacology",
  anatomy: "/anatomy",
  clinical: "/clinical",
  "intensive-care": "/intensive-care",
  perioperative: "/perioperative",
  chemistry: "/chemistry",
};

export const SECTION_TITLES: Record<Section, string> = {
  physics: "Physics",
  physiology: "Physiology",
  pharmacology: "Pharmacology",
  anatomy: "Anatomy",
  clinical: "Clinical Anaesthesia",
  "intensive-care": "Intensive Care",
  perioperative: "Perioperative Medicine",
  chemistry: "Chemistry Foundations",
};

export function topicPath(topic: Topic): string {
  return `${SECTION_PATHS[topic.section]}/${topic.id}`;
}

export type RecommendationReason =
  | "resume"
  | "started"
  | "weak-section"
  | "exam-core"
  | "next-up";

export const REASON_LABELS: Record<RecommendationReason, string> = {
  resume: "Pick up where you left off",
  started: "Started but not finished",
  "weak-section": "Least-covered section",
  "exam-core": "Core for your exam",
  "next-up": "Next in the curriculum",
};

export interface Recommendation {
  topic: Topic;
  path: string;
  score: number;
  reason: RecommendationReason;
}

export interface RecommendInput {
  /** Completed topic ids. */
  completed: Set<string>;
  /** Recently opened topic ids, most recent first. */
  recentIds: string[];
  /** topicId -> seconds of recorded study time. */
  studySeconds: Record<string, number>;
  /** Exam to weight towards; `null` means the whole curriculum. */
  exam: ExamTag | null;
  topics?: Topic[];
}

/**
 * Rank the topics a learner should study next.
 *
 * Deterministic and pure so the schedule builder and the "recommended next"
 * list always agree, and so it can be unit-tested. Scoring, highest first:
 *   +60  opened recently but not completed (resume)
 *   +45  has recorded study time but not completed
 *   +30  belongs to the section with the lowest completion rate
 *   +12  tagged for the selected exam
 *   -    small curriculum-order tie-break so output is stable
 */
export function recommendTopics(input: RecommendInput): Recommendation[] {
  const { completed, recentIds, studySeconds, exam } = input;
  const source = (input.topics ?? allTopics).filter((t) => t.available !== false);

  const pool = exam ? source.filter((t) => t.examTags.includes(exam)) : source;

  // Completion rate per section (over the same pool) to find weak areas.
  const perSection = new Map<Section, { done: number; total: number }>();
  for (const t of pool) {
    const row = perSection.get(t.section) ?? { done: 0, total: 0 };
    row.total += 1;
    if (completed.has(t.id)) row.done += 1;
    perSection.set(t.section, row);
  }
  let weakest: Section | null = null;
  let weakestRate = Infinity;
  for (const [section, { done, total }] of perSection) {
    if (total === 0) continue;
    const rate = done / total;
    if (rate < weakestRate) {
      weakestRate = rate;
      weakest = section;
    }
  }

  const recentRank = new Map(recentIds.map((id, i) => [id, i]));
  const orderIndex = new Map(pool.map((t, i) => [t.id, i]));

  const out: Recommendation[] = [];
  for (const topic of pool) {
    if (completed.has(topic.id)) continue;

    let score = 0;
    let reason: RecommendationReason = "next-up";

    const rank = recentRank.get(topic.id);
    if (rank !== undefined) {
      score += 60 - Math.min(rank, 11) * 2;
      reason = "resume";
    } else if ((studySeconds[topic.id] ?? 0) > 60) {
      score += 45;
      reason = "started";
    }

    if (topic.section === weakest) {
      score += 30;
      if (reason === "next-up") reason = "weak-section";
    }

    if (exam && topic.examTags.includes(exam)) {
      score += 12;
      if (reason === "next-up") reason = "exam-core";
    }

    // Stable, mild preference for curriculum order.
    score -= (orderIndex.get(topic.id) ?? 0) / 1000;

    out.push({ topic, path: topicPath(topic), score, reason });
  }

  return out.sort((a, b) => b.score - a.score);
}

export interface ScheduleConfig {
  /** 0 = Sunday … 6 = Saturday, matching Date#getDay. */
  weekdays: number[];
  minutesPerSession: number;
  weeks: number;
  /** ISO date (YYYY-MM-DD) of the first possible session. */
  startDate: string;
  exam: ExamTag | null;
}

export interface ScheduleSession {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  minutes: number;
  topics: { id: string; title: string; path: string; section: Section }[];
}

export const DEFAULT_SCHEDULE: ScheduleConfig = {
  weekdays: [1, 3, 5],
  minutesPerSession: 45,
  weeks: 4,
  startDate: isoDate(new Date()),
  exam: null,
};

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** Roughly 25 minutes of focused reading per topic. */
export function topicsPerSession(minutes: number): number {
  return Math.max(1, Math.round(minutes / 25));
}

/**
 * Turn a config plus a ranked recommendation list into dated sessions.
 * Topics are dealt out in rank order and never repeated.
 */
export function buildSchedule(
  config: ScheduleConfig,
  ranked: Recommendation[]
): ScheduleSession[] {
  const weekdays = [...new Set(config.weekdays)].sort();
  if (weekdays.length === 0) return [];

  const perSession = topicsPerSession(config.minutesPerSession);
  const start = parseIsoDate(config.startDate);
  if (!start) return [];

  const sessions: ScheduleSession[] = [];
  let cursor = 0;
  const totalDays = config.weeks * 7;

  for (let offset = 0; offset < totalDays; offset++) {
    const day = new Date(start);
    day.setDate(start.getDate() + offset);
    if (!weekdays.includes(day.getDay())) continue;
    if (cursor >= ranked.length) break;

    const slice = ranked.slice(cursor, cursor + perSession);
    cursor += slice.length;
    sessions.push({
      date: isoDate(day),
      minutes: config.minutesPerSession,
      topics: slice.map((r) => ({
        id: r.topic.id,
        title: r.topic.title,
        path: r.path,
        section: r.topic.section,
      })),
    });
  }

  return sessions;
}

export function parseIsoDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatSessionDate(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Minimal iCalendar export so a plan can be dropped into any calendar app. */
export function scheduleToIcs(sessions: ScheduleSession[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AnaesthesiaCore//Study Plan//EN",
    "CALSCALE:GREGORIAN",
  ];
  for (const s of sessions) {
    const stamp = s.date.replace(/-/g, "");
    const titles = s.topics.map((t) => t.title).join(", ");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${stamp}-${s.topics[0]?.id ?? "session"}@anaesthesiacore.app`,
      `DTSTAMP:${stamp}T090000Z`,
      `DTSTART;VALUE=DATE:${stamp}`,
      `SUMMARY:Revision (${s.minutes} min): ${escapeIcs(titles)}`,
      `DESCRIPTION:${escapeIcs(
        s.topics.map((t) => `${t.title} — https://anaesthesiacore.app${t.path}`).join("\\n")
      )}`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function escapeIcs(text: string): string {
  return text.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

const PLAN_KEY = "anaesthesia-core-study-plan";

export function readStoredPlan(): { config: ScheduleConfig } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PLAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { config?: Partial<ScheduleConfig> };
    if (!parsed?.config) return null;
    const c = parsed.config;
    return {
      config: {
        weekdays: Array.isArray(c.weekdays)
          ? c.weekdays.filter((n): n is number => typeof n === "number" && n >= 0 && n <= 6)
          : DEFAULT_SCHEDULE.weekdays,
        minutesPerSession:
          typeof c.minutesPerSession === "number" && c.minutesPerSession > 0
            ? c.minutesPerSession
            : DEFAULT_SCHEDULE.minutesPerSession,
        weeks: typeof c.weeks === "number" && c.weeks > 0 ? Math.min(c.weeks, 12) : DEFAULT_SCHEDULE.weeks,
        startDate: typeof c.startDate === "string" && parseIsoDate(c.startDate)
          ? c.startDate
          : isoDate(new Date()),
        exam: c.exam === null || typeof c.exam === "string" ? (c.exam as ExamTag | null) : null,
      },
    };
  } catch {
    return null;
  }
}

export function storePlan(config: ScheduleConfig) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PLAN_KEY, JSON.stringify({ config }));
  } catch {
    /* ignore quota errors */
  }
}
