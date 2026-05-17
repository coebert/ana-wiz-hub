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

    // Total: ~3.2s neon sequence, then fade out 700ms
    const leaveTimer = setTimeout(() => setLeaving(true), 3200);
    const removeTimer = setTimeout(() => setMounted(false), 3900);

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
        setTimeout(() => setMounted(false), 700);
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#05060a] cursor-pointer transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient glow halo — sized in vmin so it scales smoothly */}
      <div className="absolute h-[55vmin] w-[55vmin] max-h-[520px] max-w-[520px] rounded-full bg-primary/25 blur-3xl animate-neon-halo" />

      <img
        src={brainLogo}
        alt=""
        width={320}
        height={320}
        className="relative h-[42vmin] w-[42vmin] max-h-[340px] max-w-[340px] min-h-[180px] min-w-[180px] animate-neon-flicker"
      />
    </div>
  );
};

export default NeonSplash;
