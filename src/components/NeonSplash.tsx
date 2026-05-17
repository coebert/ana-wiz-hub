import { useEffect, useState } from "react";
import brainLogo from "/brain-logo.webp";

/**
 * Full-screen splash that gradually lights up the brain logo
 * like a neon sign, then fades out to reveal the page.
 *
 * Shows once per browser session (sessionStorage gated).
 */
const NeonSplash = () => {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("neon-splash-shown")) return;
    setMounted(true);
    sessionStorage.setItem("neon-splash-shown", "1");

    // Total: ~2.6s neon sequence, then fade out 600ms
    const leaveTimer = setTimeout(() => setLeaving(true), 2600);
    const removeTimer = setTimeout(() => setMounted(false), 3300);

    return () => {
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
        setTimeout(() => setMounted(false), 600);
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#05060a] cursor-pointer transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient glow halo */}
      <div className="absolute h-[60vmin] w-[60vmin] rounded-full bg-primary/20 blur-3xl animate-neon-halo" />

      <img
        src={brainLogo}
        alt=""
        width={320}
        height={320}
        className="relative h-56 w-56 md:h-80 md:w-80 invert brightness-200 animate-neon-flicker [filter:invert(1)_brightness(2)]"
      />
    </div>
  );
};

export default NeonSplash;
