import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Study-time tracking.
 *
 * Counts *active* seconds spent on a topic page: the tab must be visible and
 * the user must have interacted (or scrolled) within IDLE_MS. Time is
 * accumulated locally per topic per day (localStorage is the source of truth
 * for anonymous users and a device cache for signed-in users) and flushed to
 * `public.user_study_time` via the `add_study_time` RPC, which adds a delta
 * atomically so several devices can contribute to the same day.
 */

const STORAGE_KEY = "anaesthesia-core-study-time";
/** Seconds already pushed to the cloud, so we only ever send deltas. */
const SYNCED_KEY = "anaesthesia-core-study-time-synced";

const TICK_MS = 5000;
const IDLE_MS = 90_000;
/** Never credit more than 4 h to a single topic-day (matches the RPC cap). */
const MAX_SECONDS_PER_TOPIC_DAY = 14_400;

export type StudyTimeMap = Record<string, Record<string, number>>; // day -> topicId -> seconds

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function readMap(key: string): StudyTimeMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: StudyTimeMap = {};
    for (const [day, topics] of Object.entries(parsed as Record<string, unknown>)) {
      if (!topics || typeof topics !== "object" || Array.isArray(topics)) continue;
      const inner: Record<string, number> = {};
      for (const [topicId, secs] of Object.entries(topics as Record<string, unknown>)) {
        if (typeof secs === "number" && Number.isFinite(secs) && secs > 0) {
          inner[topicId] = Math.min(Math.round(secs), MAX_SECONDS_PER_TOPIC_DAY);
        }
      }
      if (Object.keys(inner).length > 0) out[day] = inner;
    }
    return out;
  } catch {
    return {};
  }
}

function writeMap(key: string, map: StudyTimeMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* ignore quota errors */
  }
}

export function readLocalStudyTime(): StudyTimeMap {
  return readMap(STORAGE_KEY);
}

/** Add seconds to a topic's total for today, locally. Returns the new total. */
function addLocalSeconds(topicId: string, seconds: number): number {
  const day = todayKey();
  const map = readMap(STORAGE_KEY);
  const forDay = map[day] ?? {};
  const next = Math.min((forDay[topicId] ?? 0) + seconds, MAX_SECONDS_PER_TOPIC_DAY);
  forDay[topicId] = next;
  map[day] = forDay;
  writeMap(STORAGE_KEY, map);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("study-time-updated"));
  }
  return next;
}

/** Push any not-yet-synced local seconds for today to the cloud. */
async function syncToCloud(userId: string) {
  const day = todayKey();
  const local = readMap(STORAGE_KEY)[day] ?? {};
  const syncedMap = readMap(SYNCED_KEY);
  const synced = syncedMap[day] ?? {};

  for (const [topicId, total] of Object.entries(local)) {
    const delta = Math.round(total - (synced[topicId] ?? 0));
    if (delta <= 0) continue;
    const { error } = await supabase.rpc("add_study_time", {
      _topic_id: topicId,
      _seconds: delta,
      _day: day,
    });
    if (error) {
      console.warn("[study-time] cloud sync failed", error);
      return;
    }
    synced[topicId] = total;
    syncedMap[day] = synced;
    writeMap(SYNCED_KEY, syncedMap);
  }
  void userId;
}

/**
 * Track active study time on a topic page. Mount once per topic page.
 */
export function useTrackStudyTime(topicId: string | undefined) {
  const { user } = useAuth();
  const lastActivity = useRef<number>(Date.now());
  const pending = useRef<number>(0);

  useEffect(() => {
    if (!topicId || typeof window === "undefined") return;

    const bump = () => {
      lastActivity.current = Date.now();
    };
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "scroll",
      "wheel",
      "touchstart",
      "mousemove",
    ];
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));

    const flush = () => {
      if (pending.current <= 0) return;
      const secs = Math.round(pending.current);
      pending.current = 0;
      addLocalSeconds(topicId, secs);
    };

    const interval = window.setInterval(() => {
      const active =
        document.visibilityState === "visible" &&
        Date.now() - lastActivity.current < IDLE_MS;
      if (active) pending.current += TICK_MS / 1000;
      if (pending.current >= 30) flush();
    }, TICK_MS);

    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);

    return () => {
      events.forEach((e) => window.removeEventListener(e, bump));
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [topicId]);

  // Periodically push local totals to the cloud while signed in.
  useEffect(() => {
    if (!user) return;
    void syncToCloud(user.id);
    const id = window.setInterval(() => void syncToCloud(user.id), 60_000);
    const onHide = () => {
      if (document.visibilityState === "hidden") void syncToCloud(user.id);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onHide);
      void syncToCloud(user.id);
    };
  }, [user]);
}

export interface StudyTimeData {
  /** day -> topicId -> seconds (local + cloud merged, cloud wins per day/topic) */
  byDay: StudyTimeMap;
  /** topicId -> total seconds */
  byTopic: Record<string, number>;
  totalSeconds: number;
  loading: boolean;
  refresh: () => void;
}

function foldByTopic(byDay: StudyTimeMap): { byTopic: Record<string, number>; total: number } {
  const byTopic: Record<string, number> = {};
  let total = 0;
  for (const topics of Object.values(byDay)) {
    for (const [topicId, secs] of Object.entries(topics)) {
      byTopic[topicId] = (byTopic[topicId] ?? 0) + secs;
      total += secs;
    }
  }
  return { byTopic, total };
}

/**
 * Read study time for the stats page. Local data is used immediately; when
 * signed in, cloud rows replace the local value for any day/topic they cover
 * (the cloud aggregates every device, so it is the higher-fidelity source).
 */
export function useStudyTime(): StudyTimeData {
  const { user } = useAuth();
  const [local, setLocal] = useState<StudyTimeMap>(() => readLocalStudyTime());
  const [cloud, setCloud] = useState<StudyTimeMap>({});
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => setLocal(readLocalStudyTime()), []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("study-time-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("study-time-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  useEffect(() => {
    if (!user) {
      setCloud({});
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from("user_study_time")
        .select("topic_id, day, seconds")
        .eq("user_id", user.id);
      if (cancelled) return;
      setLoading(false);
      if (error) {
        console.warn("[study-time] cloud read failed", error);
        return;
      }
      const map: StudyTimeMap = {};
      for (const row of data ?? []) {
        const day = String(row.day);
        map[day] = map[day] ?? {};
        map[day][row.topic_id] = Math.max(map[day][row.topic_id] ?? 0, Number(row.seconds) || 0);
      }
      setCloud(map);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const byDay = useMemo(() => {
    const merged: StudyTimeMap = {};
    for (const [day, topics] of Object.entries(local)) merged[day] = { ...topics };
    for (const [day, topics] of Object.entries(cloud)) {
      merged[day] = merged[day] ?? {};
      for (const [topicId, secs] of Object.entries(topics)) {
        merged[day][topicId] = Math.max(merged[day][topicId] ?? 0, secs);
      }
    }
    return merged;
  }, [local, cloud]);

  const { byTopic, total } = useMemo(() => foldByTopic(byDay), [byDay]);

  return { byDay, byTopic, totalSeconds: total, loading, refresh };
}

/** "2 h 45 m" / "45 m" / "3 m" / "under a minute" */
export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0 m";
  if (seconds < 60) return "under a minute";
  const totalMinutes = Math.round(seconds / 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} m`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} m`;
}

/** Decimal hours, 1 dp — used for the "hours" headline figures. */
export function toHours(seconds: number): number {
  return Math.round((seconds / 3600) * 10) / 10;
}
