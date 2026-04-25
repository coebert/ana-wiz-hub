import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Local-only viva practice tracker. Persists the set of question IDs the user
 * has marked (or auto-marked) as practiced to localStorage. No auth required;
 * progress is per-device.
 *
 * Also tracks a per-day activity log (YYYY-MM-DD -> count) so we can show
 * today's practiced count and a consecutive-day streak.
 *
 * Multi-tab safe via the `storage` event listener.
 */
const STORAGE_KEY = "viva:practiced";
const ACTIVITY_KEY = "viva:activity";

type ActivityMap = Record<string, number>;

const readSet = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((x) => typeof x === "string")) : new Set();
  } catch {
    return new Set();
  }
};

const writeSet = (set: Set<string>) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    /* quota / private mode — ignore */
  }
};

const readActivity = (): ActivityMap => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ACTIVITY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const out: ActivityMap = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof k === "string" && typeof v === "number" && Number.isFinite(v)) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
};

const writeActivity = (a: ActivityMap) => {
  try {
    window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(a));
  } catch {
    /* ignore */
  }
};

const todayKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const computeStreak = (activity: ActivityMap): number => {
  if (!activity || Object.keys(activity).length === 0) return 0;
  let streak = 0;
  const cursor = new Date();
  // If today has no activity, the streak can still be the run ending yesterday.
  if (!activity[todayKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (activity[todayKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export const useVivaProgress = () => {
  const [practiced, setPracticed] = useState<Set<string>>(() => readSet());
  const [activity, setActivity] = useState<ActivityMap>(() => readActivity());

  // Sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPracticed(readSet());
      if (e.key === ACTIVITY_KEY) setActivity(readActivity());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const bumpToday = useCallback(() => {
    setActivity((prev) => {
      const key = todayKey();
      const next: ActivityMap = { ...prev, [key]: (prev[key] ?? 0) + 1 };
      writeActivity(next);
      return next;
    });
  }, []);

  const mark = useCallback(
    (id: string) => {
      setPracticed((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        writeSet(next);
        bumpToday();
        return next;
      });
    },
    [bumpToday],
  );

  const unmark = useCallback((id: string) => {
    setPracticed((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      writeSet(next);
      return next;
    });
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setPracticed((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
          bumpToday();
        }
        writeSet(next);
        return next;
      });
    },
    [bumpToday],
  );

  const reset = useCallback(() => {
    setPracticed(new Set());
    writeSet(new Set());
    setActivity({});
    writeActivity({});
  }, []);

  const isPracticed = useCallback((id: string) => practiced.has(id), [practiced]);

  const todayCount = activity[todayKey()] ?? 0;
  const streak = useMemo(() => computeStreak(activity), [activity]);

  return { practiced, mark, unmark, toggle, reset, isPracticed, todayCount, streak };
};
