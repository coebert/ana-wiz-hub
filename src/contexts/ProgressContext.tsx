import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { allTopics, topicsBySection, Section, ExamTag } from "@/data/curriculum";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ProgressContextType {
  completedTopics: Set<string>;
  toggleTopic: (topicId: string) => void;
  isCompleted: (topicId: string) => boolean;
  getSectionProgress: (section: Section) => { completed: number; total: number };
  getOverallProgress: () => { completed: number; total: number };
  /** Progress across all available topics tagged for a given exam. */
  getExamProgress: (exam: ExamTag) => { completed: number; total: number };
  /** Progress within one section, scoped to topics tagged for the given exam. */
  getExamSectionProgress: (exam: ExamTag, section: Section) => { completed: number; total: number };
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "anaesthesia-core-progress";
const MIGRATED_FLAG = "anaesthesia-core-progress-cloud-migrated";

const readLocal = (): Set<string> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(readLocal);
  const syncedUserRef = useRef<string | null>(null);

  // Persist to localStorage on every change (source of truth for anon users
  // and a cache for signed-in users).
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  // One-time migrate + hydrate on sign-in. When the user changes we:
  //  1. Pull their cloud rows
  //  2. Merge with any local-only ids (union — never lose progress)
  //  3. Upload local-only ids that weren't already in the cloud
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
        .from("user_topic_progress")
        .select("topic_id")
        .eq("user_id", user.id);
      if (cancelled || error) return;

      const cloudIds = new Set((data ?? []).map((r) => r.topic_id));
      const localIds = readLocal();
      const merged = new Set([...cloudIds, ...localIds]);
      setCompletedTopics(merged);

      const migrationKey = `${MIGRATED_FLAG}:${user.id}`;
      if (!localStorage.getItem(migrationKey)) {
        const toUpload = [...localIds].filter((id) => !cloudIds.has(id));
        if (toUpload.length > 0) {
          await supabase
            .from("user_topic_progress")
            .upsert(toUpload.map((topic_id) => ({ user_id: user.id, topic_id })));
        }
        localStorage.setItem(migrationKey, "1");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggleTopic = useCallback(
    (topicId: string) => {
      setCompletedTopics((prev) => {
        const next = new Set(prev);
        const willComplete = !next.has(topicId);
        if (willComplete) next.add(topicId);
        else next.delete(topicId);

        // Fire-and-forget cloud write for signed-in users.
        if (user) {
          if (willComplete) {
            supabase
              .from("user_topic_progress")
              .upsert({ user_id: user.id, topic_id: topicId })
              .then(({ error }) => {
                if (error) console.warn("[progress] cloud upsert failed", error);
              });
          } else {
            supabase
              .from("user_topic_progress")
              .delete()
              .eq("user_id", user.id)
              .eq("topic_id", topicId)
              .then(({ error }) => {
                if (error) console.warn("[progress] cloud delete failed", error);
              });
          }
        }
        return next;
      });
    },
    [user]
  );

  const isCompleted = useCallback((topicId: string) => completedTopics.has(topicId), [completedTopics]);

  const getSectionProgress = useCallback(
    (section: Section) => {
      const available = (topicsBySection[section] || []).filter((t) => t.available);
      const completed = available.filter((t) => completedTopics.has(t.id)).length;
      return { completed, total: available.length };
    },
    [completedTopics]
  );

  const getOverallProgress = useCallback(() => {
    const available = allTopics.filter((t) => t.available);
    const completed = available.filter((t) => completedTopics.has(t.id)).length;
    return { completed, total: available.length };
  }, [completedTopics]);

  const getExamProgress = useCallback(
    (exam: ExamTag) => {
      const available = allTopics.filter((t) => t.available && t.examTags.includes(exam));
      const completed = available.filter((t) => completedTopics.has(t.id)).length;
      return { completed, total: available.length };
    },
    [completedTopics]
  );

  const getExamSectionProgress = useCallback(
    (exam: ExamTag, section: Section) => {
      const available = (topicsBySection[section] || []).filter(
        (t) => t.available && t.examTags.includes(exam)
      );
      const completed = available.filter((t) => completedTopics.has(t.id)).length;
      return { completed, total: available.length };
    },
    [completedTopics]
  );

  return (
    <ProgressContext.Provider
      value={{
        completedTopics,
        toggleTopic,
        isCompleted,
        getSectionProgress,
        getOverallProgress,
        getExamProgress,
        getExamSectionProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
};
