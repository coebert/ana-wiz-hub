import { useEffect, useLayoutEffect, useRef, useState } from "react";
import brainLogo from "/brain-logo.webp";

/**
 * Full-screen splash that gradually lights up the brain logo
 * like a neon sign, then fades out to reveal the page.
 *
 * Sizing strategy: instead of relying on `vmin` (which can produce
 * awkwardly tiny logos on short-but-wide screens and oversized halos
 * on tall phones), we measure the splash container with a
 * ResizeObserver and derive a single base unit from
 * `min(width, height)`. Logo size and every glow radius are computed
 * from that unit and exposed as CSS custom properties so the
 * keyframes can scale uniformly.
 *
 * Shows once per browser session (sessionStorage gated).
 */
const NeonSplash = () => {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [unit, setUnit] = useState(0); // px; base sizing unit

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("neon-splash-shown")) return;
    setMounted(true);
    sessionStorage.setItem("neon-splash-shown", "1");

    const leaveTimer = setTimeout(() => setLeaving(true), 3200);
    const removeTimer = setTimeout(() => setMounted(false), 3900);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Measure the container and derive a base unit.
  useLayoutEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const m = Math.min(width, height);
      setUnit(m);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  // Logo target: 42% of the short side, clamped to a sensible range.
  const logoSize = Math.round(Math.min(360, Math.max(180, unit * 0.42)));
  // Halo target: ~135% of the logo so the bloom always frames the brain.
  const haloSize = Math.round(logoSize * 1.35);
  // Glow radii — derived from logo size so every screen gets the same
  // proportional bloom. Stored as CSS variables consumed by keyframes.
  const glow1 = Math.max(2, Math.round(logoSize * 0.045)); // sharp inner halo
  const glow2 = Math.max(6, Math.round(logoSize * 0.16));  // mid bloom
  const glow3 = Math.max(12, Math.round(logoSize * 0.32)); // outer wash

  const cssVars = {
    "--neon-size": `${logoSize}px`,
    "--neon-halo": `${haloSize}px`,
    "--neon-glow-1": `${glow1}px`,
    "--neon-glow-2": `${glow2}px`,
    "--neon-glow-3": `${glow3}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
      onClick={() => {
        setLeaving(true);
        setTimeout(() => setMounted(false), 700);
      }}
      style={cssVars}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#05060a] cursor-pointer transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient glow halo — sized from measured logo */}
      <div
        className="absolute rounded-full bg-primary/25 blur-3xl animate-neon-halo"
        style={{ width: "var(--neon-halo)", height: "var(--neon-halo)" }}
      />

      {/* Only render once we have a measurement to avoid a flash at the wrong size */}
      {unit > 0 && (
        <img
          src={brainLogo}
          alt=""
          width={logoSize}
          height={logoSize}
          className="relative animate-neon-flicker"
          style={{ width: "var(--neon-size)", height: "var(--neon-size)" }}
        />
      )}
    </div>
  );
};

export default NeonSplash;
