import { useCallback, useEffect, useState } from "react";

/**
 * Local-only viva practice tracker. Persists the set of question IDs the user
 * has marked (or auto-marked) as practiced to localStorage. No auth required;
 * progress is per-device.
 *
 * Multi-tab safe via the `storage` event listener.
 */
const STORAGE_KEY = "viva:practiced";

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

export const useVivaProgress = () => {
  const [practiced, setPracticed] = useState<Set<string>>(() => readSet());

  // Sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPracticed(readSet());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const mark = useCallback((id: string) => {
    setPracticed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      writeSet(next);
      return next;
    });
  }, []);

  const unmark = useCallback((id: string) => {
    setPracticed((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      writeSet(next);
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setPracticed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      writeSet(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setPracticed(new Set());
    writeSet(new Set());
  }, []);

  const isPracticed = useCallback((id: string) => practiced.has(id), [practiced]);

  return { practiced, mark, unmark, toggle, reset, isPracticed };
};
