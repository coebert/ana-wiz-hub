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

// Landing logo's exact resting filter — the crossfade target.
const LANDING_FILTER =
  "invert(1) brightness(2) drop-shadow(0 4px 12px rgba(0,0,0,0.35))";

const NeonSplash = () => {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("neon-splash-shown")) return;
    setMounted(true);
    sessionStorage.setItem("neon-splash-shown", "1");

    const readyTimer = requestAnimationFrame(() => setReady(true));
    const leaveTimer = setTimeout(() => setLeaving(true), 3200);
    const removeTimer = setTimeout(() => setMounted(false), 3200 + FADE_MS);

    return () => {
      cancelAnimationFrame(readyTimer);
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
        leaving ? "opacity-0 pointer-events-none" : ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo box — identical geometry to Landing.tsx hero logo. */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[104px] md:top-[136px] h-52 w-52 md:h-72 md:w-72 flex items-center justify-center">
        {/* Ambient glow halo. Animation runs during entry; on leave we
            freeze its transform (scale 1) and fade opacity to 0 so it
            doesn't drift or pulse during the crossfade. */}
        <div
          className={`absolute rounded-full bg-primary/25 blur-3xl ${
            leaving ? "" : "animate-neon-halo"
          }`}
          style={{
            width: "135%",
            height: "135%",
            transition: `opacity ${Math.round(FADE_MS * 0.6)}ms ease-out`,
            ...(leaving
              ? { opacity: 0, transform: "scale(1)", animation: "none" }
              : {}),
          }}
        />

        {/* Logo — same src/size as Landing. On leave, freeze the neon
            animations and transition `filter` to Landing's exact resting
            filter so the two images converge pixel-for-pixel. */}
        <img
          src={brainLogo}
          alt=""
          width={288}
          height={288}
          className={`relative h-full w-full ${leaving ? "" : "animate-neon-flicker"}`}
          style={{
            transition: `filter ${FADE_MS}ms ease-in-out`,
            ...(leaving
              ? { animation: "none", opacity: 1, filter: LANDING_FILTER }
              : {}),
          }}
        />
      </div>
    </div>
  );
};

export default NeonSplash;
