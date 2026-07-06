import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Per-subsection completion ticks. Users can mark each H2 within a topic
 * as done and, once signed in, that state syncs across devices via
 * `public.user_subsection_progress`. Anonymous users get localStorage-only
 * persistence; on first sign-in we union local + cloud (never lose ticks)
 * and one-time upload local-only rows.
 */

interface SubsectionProgressContextType {
  /** Map of topicId -> Set of checked subsection ids. */
  ticks: Record<string, Set<string>>;
  isChecked: (topicId: string, subsectionId: string) => boolean;
  toggle: (topicId: string, subsectionId: string) => void;
  getTopicProgress: (topicId: string) => { completed: number };
}

const SubsectionProgressContext = createContext<SubsectionProgressContextType | null>(null);

const STORAGE_KEY = "anaesthesia-core-subsection-progress";
const MIGRATED_FLAG = "anaesthesia-core-subsection-progress-cloud-migrated";

type Serialized = Record<string, string[]>;

const readLocal = (): Record<string, Set<string>> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Serialized;
    const out: Record<string, Set<string>> = {};
    for (const [topicId, ids] of Object.entries(parsed)) {
      if (Array.isArray(ids)) out[topicId] = new Set(ids);
    }
    return out;
  } catch {
    return {};
  }
};

const writeLocal = (state: Record<string, Set<string>>) => {
  if (typeof window === "undefined") return;
  const serialized: Serialized = {};
  for (const [topicId, ids] of Object.entries(state)) {
    serialized[topicId] = [...ids];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch {
    /* ignore quota */
  }
};

export const SubsectionProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [ticks, setTicks] = useState<Record<string, Set<string>>>(readLocal);
  const syncedUserRef = useRef<string | null>(null);

  // Persist on every change.
  useEffect(() => {
    writeLocal(ticks);
  }, [ticks]);

  // Hydrate + one-time migrate on sign-in.
  useEffect(() => {
    if (!user) {
      syncedUserRef.current = null;
      return;
    }
    if (syncedUserRef.current === user.id) return;
    syncedUserRef.current = user.id;

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_subsection_progress")
        .select("topic_id, subsection_id")
        .eq("user_id", user.id);
      if (cancelled || error) return;

      const cloud: Record<string, Set<string>> = {};
      for (const row of data ?? []) {
        const set = cloud[row.topic_id] ?? new Set<string>();
        set.add(row.subsection_id);
        cloud[row.topic_id] = set;
      }
      const local = readLocal();

      const merged: Record<string, Set<string>> = {};
      const topicIds = new Set([...Object.keys(cloud), ...Object.keys(local)]);
      for (const id of topicIds) {
        merged[id] = new Set([...(cloud[id] ?? []), ...(local[id] ?? [])]);
      }
      setTicks(merged);

      const migrationKey = `${MIGRATED_FLAG}:${user.id}`;
      if (!localStorage.getItem(migrationKey)) {
        const toUpload: { user_id: string; topic_id: string; subsection_id: string }[] = [];
        for (const [topicId, ids] of Object.entries(local)) {
          const cloudSet = cloud[topicId] ?? new Set<string>();
          for (const sid of ids) {
            if (!cloudSet.has(sid)) {
              toUpload.push({ user_id: user.id, topic_id: topicId, subsection_id: sid });
            }
          }
        }
        if (toUpload.length > 0) {
          await supabase.from("user_subsection_progress").upsert(toUpload);
        }
        localStorage.setItem(migrationKey, "1");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggle = useCallback(
    (topicId: string, subsectionId: string) => {
      setTicks((prev) => {
        const nextSet = new Set(prev[topicId] ?? []);
        const willCheck = !nextSet.has(subsectionId);
        if (willCheck) nextSet.add(subsectionId);
        else nextSet.delete(subsectionId);

        if (user) {
          if (willCheck) {
            supabase
              .from("user_subsection_progress")
              .upsert({ user_id: user.id, topic_id: topicId, subsection_id: subsectionId })
              .then(({ error }) => {
                if (error) console.warn("[subsection-progress] upsert failed", error);
              });
          } else {
            supabase
              .from("user_subsection_progress")
              .delete()
              .eq("user_id", user.id)
              .eq("topic_id", topicId)
              .eq("subsection_id", subsectionId)
              .then(({ error }) => {
                if (error) console.warn("[subsection-progress] delete failed", error);
              });
          }
        }

        return { ...prev, [topicId]: nextSet };
      });
    },
    [user]
  );

  const isChecked = useCallback(
    (topicId: string, subsectionId: string) =>
      ticks[topicId]?.has(subsectionId) ?? false,
    [ticks]
  );

  const getTopicProgress = useCallback(
    (topicId: string) => ({ completed: ticks[topicId]?.size ?? 0 }),
    [ticks]
  );

  return (
    <SubsectionProgressContext.Provider
      value={{ ticks, isChecked, toggle, getTopicProgress }}
    >
      {children}
    </SubsectionProgressContext.Provider>
  );
};

export const useSubsectionProgress = (): SubsectionProgressContextType => {
  const ctx = useContext(SubsectionProgressContext);
  if (!ctx) {
    throw new Error(
      "useSubsectionProgress must be used within SubsectionProgressProvider"
    );
  }
  return ctx;
};
