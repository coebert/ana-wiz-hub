import { useEffect, useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * User-facing "Reduce motion" setting.
 *
 * Resolved value (`reduceMotion`) is the boolean every consumer should read.
 * Follows OS `prefers-reduced-motion` by default. Users can explicitly
 * override (on / off) and we persist that choice in localStorage. Pass
 * `null` to `setOverride` to clear and re-follow the OS.
 *
 * Implemented as a zustand store; the exported hook shape is preserved so
 * downstream consumers didn't need to change when we moved off React
 * context (see review §5).
 */

type Override = boolean | null;

interface MotionState {
  override: Override;
  setOverride: (next: Override) => void;
}

const useMotionStore = create<MotionState>()(
  persist(
    (set) => ({
      override: null,
      setOverride: (next) => set({ override: next }),
    }),
    {
      name: "ac.motion-preference",
      storage: createJSONStorage(() => localStorage),
      // Legacy shape stored a raw "on" / "off" string, not JSON. Ignore any
      // parse failures — they fall back to null which means "follow OS".
      partialize: (s) => ({ override: s.override }),
    },
  ),
);

const getSystemReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const subscribeSystem = (cb: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const useSystemReducedMotion = () =>
  useSyncExternalStore(subscribeSystem, getSystemReducedMotion, () => false);

interface MotionPreferenceHook {
  reduceMotion: boolean;
  override: Override;
  systemReducedMotion: boolean;
  setOverride: (next: Override) => void;
}

export const useMotionPreference = (): MotionPreferenceHook => {
  const override = useMotionStore((s) => s.override);
  const setOverride = useMotionStore((s) => s.setOverride);
  const systemReducedMotion = useSystemReducedMotion();
  const reduceMotion = override === null ? systemReducedMotion : override;
  return { reduceMotion, override, systemReducedMotion, setOverride };
};

/**
 * No-op provider kept for backward compatibility with existing tests /
 * imports. Zustand doesn't need a provider — remove call sites in a
 * follow-up. Renders children unchanged.
 */
export const MotionPreferenceProvider = ({ children }: { children: React.ReactNode }) => {
  // Touch the store once during mount so tree-shakers keep it wired up.
  useEffect(() => {
    void useMotionStore.getState();
  }, []);
  return children as React.ReactElement;
};
