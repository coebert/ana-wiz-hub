import { useEffect, useState } from "react";
import brainLogo from "/brain-logo.webp";

/**
 * Full-screen splash that lights up the brain logo like a neon sign,
 * positioned to match the landing-page hero logo exactly so when the
 * splash fades the logo appears to persist in place.
 *
 * Position math mirrors Landing.tsx:
 *   - Header height:     h-14   = 56px
 *   - Hero vertical pad: py-12  = 48px  (md: py-20 = 80px)
 *   - Logo size:         h-52   = 208px (md: h-72 = 288px)
 *   - Horizontally centered inside the page container.
 *
 * Shows once per browser session (sessionStorage gated).
 */

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
    const removeTimer = setTimeout(() => setMounted(false), 3900);

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
        setTimeout(() => setMounted(false), 700);
      }}
      className={`fixed inset-0 z-[100] bg-[#05060a] cursor-pointer transition-opacity duration-700 ease-out ${
        leaving ? "opacity-0 pointer-events-none" : ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo positioned to match Landing.tsx hero logo exactly.
          top = header (h-14 = 56px) + hero py-12 (48px) = 104px mobile,
                header (56px) + hero md:py-20 (80px) = 136px desktop.
          Sized to h-52 w-52 mobile, h-72 w-72 desktop, matching Landing. */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[104px] md:top-[136px] h-52 w-52 md:h-72 md:w-72 flex items-center justify-center">
        {/* Ambient glow halo — ~135% of logo, centered behind it */}
        <div
          className="absolute rounded-full bg-primary/25 blur-3xl animate-neon-halo"
          style={{ width: "135%", height: "135%" }}
        />

        {/* Logo — same src, size, and invert filter as Landing so it visually
            persists when the splash overlay fades out. */}
        <img
          src={brainLogo}
          alt=""
          width={288}
          height={288}
          className="relative h-full w-full animate-neon-flicker invert brightness-200 [filter:invert(1)_brightness(2)_drop-shadow(0_4px_12px_rgba(0,0,0,0.35))]"
        />
      </div>
    </div>
  );
};

export default NeonSplash;
