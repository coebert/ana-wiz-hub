import { useEffect, useLayoutEffect, useRef, useState } from "react";
import brainLogo from "/brain-logo.webp";

/**
 * Full-screen splash that gradually lights up the brain logo
 * like a neon sign, then fades out to reveal the page.
 *
 * Sizing strategy: we measure the splash container with a
 * ResizeObserver and derive a single base unit from
 * `min(width, height)`. Logo size and every glow radius are computed
 * from that unit and exposed as CSS custom properties so the
 * keyframes can scale uniformly.
 *
 * Smoothing & clamping (see useLayoutEffect below):
 *  - Raw container measurements are clamped to [MIN_UNIT, MAX_UNIT]
 *    so freak values during orientation flips (e.g. a transient 0px
 *    height between layout passes) cannot collapse the logo.
 *  - ResizeObserver callbacks are batched with requestAnimationFrame
 *    so a burst of resize events (mobile rotation, browser chrome
 *    appearing/disappearing) only triggers one React update per frame.
 *  - The committed unit is ignored if it differs from the previous
 *    value by less than UNIT_EPSILON, eliminating sub-pixel jitter.
 *  - CSS variable changes are eased via a `transition` on the
 *    container (see the style block) so the logo/halo glide rather
 *    than snap between sizes.
 *
 * Shows once per browser session (sessionStorage gated).
 */

const MIN_UNIT = 240;   // px — protects against transient 0/tiny measurements
const MAX_UNIT = 1400;  // px — caps the unit on very large monitors
const UNIT_EPSILON = 4; // px — ignore changes smaller than this (anti-jitter)

const NeonSplash = () => {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  // `ready` flips on the next frame after mount so the container can
  // transition from opacity-0 → opacity-100. Without this two-step
  // commit the splash would pop in instantly because the element is
  // appended already at its final opacity.
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Seed the base unit synchronously on first render using the
  // viewport's short edge. This guarantees the very first paint has
  // a sensible logo/halo size — no zero-sized flash, and no jump from
  // a default to the measured value once the ResizeObserver fires.
  // The ResizeObserver in useLayoutEffect then takes over with the
  // exact container measurement (and keeps it in sync on resize).
  const [unit, setUnit] = useState<number>(() => {
    if (typeof window === "undefined") return MIN_UNIT;
    const raw = Math.min(window.innerWidth, window.innerHeight);
    return Math.min(MAX_UNIT, Math.max(MIN_UNIT, raw));
  });

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

  // Flip `ready` on the frame after mount so the opacity transition runs.
  useLayoutEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  // Measure the container, clamp + smooth, then derive a base unit.
  useLayoutEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let lastCommitted = 0;

    const commit = () => {
      rafId = null;
      const { width, height } = el.getBoundingClientRect();
      const raw = Math.min(width, height);
      // Clamp first — protects against the 0px transient during
      // orientation changes and against absurdly large monitors.
      const clamped = Math.min(MAX_UNIT, Math.max(MIN_UNIT, raw));
      // Anti-jitter: ignore tiny deltas so 1px scrollbar wobble
      // doesn't re-trigger CSS transitions every frame.
      if (Math.abs(clamped - lastCommitted) < UNIT_EPSILON) return;
      lastCommitted = clamped;
      setUnit(clamped);
    };

    const schedule = () => {
      if (rafId !== null) return; // already scheduled this frame
      rafId = requestAnimationFrame(commit);
    };

    // Initial synchronous measure (no debounce) so first paint is correct.
    commit();

    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    // Also listen for orientation change explicitly — some mobile
    // browsers fire resize after a delay that ResizeObserver misses.
    window.addEventListener("orientationchange", schedule);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("orientationchange", schedule);
    };
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

  // Smoothing: ease width/height between measured sizes so resize/
  // orientation events glide rather than snap. The neon glow itself
  // continues to be driven by the keyframes; only the geometry eases.
  const smoothingStyle: React.CSSProperties = {
    transition: "width 220ms ease-out, height 220ms ease-out",
  };

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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#05060a] cursor-pointer transition-opacity duration-700 ease-out ${
        leaving ? "opacity-0 pointer-events-none" : ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Ambient glow halo — sized from measured logo */}
      <div
        className="absolute rounded-full bg-primary/25 blur-3xl animate-neon-halo"
        style={{
          width: "var(--neon-halo)",
          height: "var(--neon-halo)",
          ...smoothingStyle,
        }}
      />

      {/* Logo — seeded from viewport on first render, refined by ResizeObserver */}
      <img
        src={brainLogo}
        alt=""
        width={logoSize}
        height={logoSize}
        className="relative animate-neon-flicker"
        style={{
          width: "var(--neon-size)",
          height: "var(--neon-size)",
          ...smoothingStyle,
        }}
      />
    </div>
  );
};

export default NeonSplash;

