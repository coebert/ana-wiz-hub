import { useEffect, useState } from "react";
import brainLogo from "/brain-logo.webp";

/**
 * Full-screen splash that lights up the brain logo like a neon sign,
 * positioned to match the landing-page hero logo exactly so when the
 * splash fades the logo appears to persist in place.
 *
 * Crossfade strategy (no layout shift, no translate jump):
 *  - Splash logo geometry mirrors Landing.tsx exactly (top offset, size,
 *    horizontal centering). Both logos occupy the same pixel box.
 *  - On leaving, all running keyframe animations are frozen (halo scale,
 *    neon-flicker, neon-breathe). The logo's `filter` is transitioned
 *    from the neon look to Landing's resting filter over the same
 *    duration as the container fade — so the two images converge on an
 *    identical look at the moment the splash hits opacity 0.
 *  - The halo fades independently (faster) so only the logo remains
 *    visible during the final portion of the crossfade.
 *
 * Position math mirrors Landing.tsx:
 *   - Header height:     h-14   = 56px
 *   - Hero vertical pad: py-12  = 48px  (md: py-20 = 80px)
 *   - Logo size:         h-52   = 208px (md: h-72 = 288px)
 *
 * Shows once per browser session (sessionStorage gated).
 */

const FADE_MS = 900;

// Landing logo's resting filter, padded with two zero-radius transparent
// drop-shadows so the function list length matches neon-flicker's final
// state (invert, brightness, ds, ds, ds). Matching list lengths are
// required for CSS to interpolate `filter` smoothly — otherwise the
// browser falls back to discrete interpolation and the look snaps
// instead of crossfading.
const LANDING_FILTER =
  "invert(1) brightness(2) drop-shadow(0 4px 12px rgba(0,0,0,0.35)) drop-shadow(0 0 0 rgba(0,0,0,0)) drop-shadow(0 0 0 rgba(0,0,0,0))";

const shouldShowSplash = () => {
  if (typeof window === "undefined") return false;
  try {
    return !sessionStorage.getItem("neon-splash-shown");
  } catch {
    return false;
  }
};

const NeonSplash = () => {
  // Initialise synchronously so the splash paints on the very first frame,
  // before the landing hero has a chance to flash behind it.
  const [mounted, setMounted] = useState(shouldShowSplash);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mounted) return;
    try {
      sessionStorage.setItem("neon-splash-shown", "1");
    } catch {
      /* ignore */
    }

    let cancelled = false;
    let rafId = 0;
    let leaveTimer = 0 as unknown as ReturnType<typeof setTimeout>;
    let removeTimer = 0 as unknown as ReturnType<typeof setTimeout>;

    // Wait for the brain logo to be fully decoded before flipping `ready`.
    // The asset is already preloaded via <link rel="preload"> in index.html,
    // so this usually resolves immediately from cache; the await prevents
    // any first-load flicker when the decode hasn't finished by mount time.
    const img = new Image();
    img.src = brainLogo;
    const start = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(() => {
        if (cancelled) return;
        setReady(true);
        // Anchor the 3200ms display window to the moment the logo is
        // actually visible, not to mount time, so a slow decode never
        // shortens the neon ignition sequence.
        leaveTimer = setTimeout(() => setLeaving(true), 3200);
        removeTimer = setTimeout(() => setMounted(false), 3200 + FADE_MS);
      });
    };

    const decodePromise =
      typeof img.decode === "function"
        ? img.decode().catch(() => undefined)
        : new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
    decodePromise.then(start);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);


  if (!mounted) return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      onClick={() => {
        setLeaving(true);
        setTimeout(() => setMounted(false), FADE_MS);
      }}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      className={`fixed inset-0 z-[100] bg-[#05060a] cursor-pointer transition-opacity ease-in-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        style={{ transition: `opacity 200ms ease-out` }}
        className={ready ? "opacity-100" : "opacity-0"}
      >
      {/* Logo box — identical geometry to Landing.tsx hero logo.
          Vertical offset = sticky Header + hero section padding.
            • mobile (<sm): h-14 (56) + mobile exam-chip row (27) + border (1) + py-12 (48) = 132
            • sm..md:     h-14 (56) + border (1) + py-12 (48) = 105
            • md+:        h-14 (56) + border (1) + py-20 (80) = 137
          The chip row is `flex sm:hidden` in Header.tsx so it disappears at sm+. */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[132px] sm:top-[105px] md:top-[137px] h-52 w-52 md:h-72 md:w-72">
        {/* Ambient glow halo. Centered behind the brain via inset-based
            sizing so it doesn't depend on flex centering. */}
        <div
          className={`absolute rounded-full bg-primary/25 blur-3xl ${
            leaving ? "" : "animate-neon-halo"
          }`}
          style={{
            top: "-17.5%",
            left: "-17.5%",
            width: "135%",
            height: "135%",
            transition: `opacity ${Math.round(FADE_MS * 0.6)}ms ease-out`,
            ...(leaving
              ? { opacity: 0, transform: "scale(1)", animation: "none" }
              : {}),
          }}
        />

        {/* Logo — size classes applied directly (mirrors Landing.tsx exactly,
            no flex wrapper) so the rendered box is guaranteed to be the same
            208/288 px square as the landing hero logo. */}
        <img
          src={brainLogo}
          alt=""
          width={288}
          height={288}
          className={`relative h-52 w-52 md:h-72 md:w-72 ${leaving ? "" : "animate-neon-flicker"}`}
          style={{
            transition: `filter ${FADE_MS}ms ease-in-out`,
            ...(leaving
              ? { animation: "none", opacity: 1, filter: LANDING_FILTER }
              : {}),
          }}
        />
        </div>
      </div>
    </div>
  );
};

export default NeonSplash;
