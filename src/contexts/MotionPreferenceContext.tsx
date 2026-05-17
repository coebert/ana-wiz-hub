import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * User-facing "Reduce motion" setting.
 *
 * Resolved value (`reduceMotion`) is the boolean every consumer should read.
 * It follows the OS `prefers-reduced-motion` media query by default, but the
 * user can explicitly override (on / off) and we persist that choice in
 * localStorage. Pass `null` to `setOverride` to clear and re-follow the OS.
 */

type Override = boolean | null;

interface MotionPreferenceContextType {
  /** Effective value: true → animations should be reduced. */
  reduceMotion: boolean;
  /** User's explicit override (null = follow system). */
  override: Override;
  /** OS-level preference, exposed so the UI can label "(system: on/off)". */
  systemReducedMotion: boolean;
  setOverride: (next: Override) => void;
}

const STORAGE_KEY = "ac.motion-preference";
const MotionPreferenceContext = createContext<MotionPreferenceContextType | null>(null);

const readStored = (): Override => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "on") return true;
    if (raw === "off") return false;
    return null;
  } catch {
    return null;
  }
};

const writeStored = (value: Override) => {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {
    /* storage might be disabled */
  }
};

export const MotionPreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [override, setOverrideState] = useState<Override>(() => readStored());
  const [systemReducedMotion, setSystem] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setSystem(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setOverride = (next: Override) => {
    setOverrideState(next);
    writeStored(next);
  };

  const reduceMotion = override === null ? systemReducedMotion : override;

  return (
    <MotionPreferenceContext.Provider
      value={{ reduceMotion, override, systemReducedMotion, setOverride }}
    >
      {children}
    </MotionPreferenceContext.Provider>
  );
};

export const useMotionPreference = (): MotionPreferenceContextType => {
  const ctx = useContext(MotionPreferenceContext);
  if (!ctx) {
    // Safe fallback so components outside the provider don't crash; behaves
    // as if motion is allowed and the user has no explicit override.
    return {
      reduceMotion: false,
      override: null,
      systemReducedMotion: false,
      setOverride: () => {},
    };
  }
  return ctx;
};
