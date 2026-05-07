import { useEffect, useState } from "react";

/**
 * Dev-only "verification mode" for anatomy diagrams.
 *
 * When enabled, every <AnatomyPlate> overlays:
 *   • a crosshair + ring at each leader `target` (red)
 *   • a crosshair at each `label` anchor (blue)
 *   • a dashed bounding box around the rendered label rect
 *   • the label `id` printed next to the target
 *
 * Use it to scan a topic page for misaligned arrows in seconds.
 *
 * Stored in localStorage so it survives reloads. Only mounted in `import.meta.env.DEV`.
 */

const STORAGE_KEY = "anatomy:verifyMode";

let listeners: Set<(v: boolean) => void> = new Set();

const read = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

export const setVerifyMode = (v: boolean) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(v));
};

export const useVerifyMode = (): boolean => {
  const [on, setOn] = useState<boolean>(read);
  useEffect(() => {
    const h = (v: boolean) => setOn(v);
    listeners.add(h);
    return () => {
      listeners.delete(h);
    };
  }, []);
  return on;
};

/**
 * Floating dev-only toggle button. Render once at app root.
 * No-op in production builds.
 */
export const VerifyModeToggle: React.FC = () => {
  const on = useVerifyMode();
  if (!import.meta.env.DEV) return null;
  return (
    <button
      type="button"
      aria-label="Toggle anatomy diagram verification overlay"
      aria-pressed={on}
      onClick={() => setVerifyMode(!on)}
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        zIndex: 9999,
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid hsl(var(--border))",
        background: on ? "hsl(0, 70%, 50%)" : "hsl(var(--card))",
        color: on ? "white" : "hsl(var(--foreground))",
        fontSize: 11,
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {on ? "✓ Verify mode" : "Verify anatomy"}
    </button>
  );
};
