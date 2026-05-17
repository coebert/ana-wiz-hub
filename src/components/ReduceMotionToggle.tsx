import { Sparkles, Zap } from "lucide-react";
import { useMotionPreference } from "@/contexts/MotionPreferenceContext";

/**
 * Compact toggle for the "Reduce motion" user preference.
 *
 * Three states cycle: follow system → on → off → follow system…
 * The icon reflects the effective value; the title/aria-label explain the
 * next action and the current source (system vs user override).
 */
export const ReduceMotionToggle = ({ className = "" }: { className?: string }) => {
  const { reduceMotion, override, systemReducedMotion, setOverride } = useMotionPreference();

  const onClick = () => {
    // Cycle: system → opposite of current effective → other → system
    if (override === null) setOverride(!systemReducedMotion);
    else if (override === true) setOverride(false);
    else setOverride(null);
  };

  const stateLabel =
    override === null
      ? `following system (${systemReducedMotion ? "on" : "off"})`
      : override
        ? "on"
        : "off";

  const Icon = reduceMotion ? Zap : Sparkles;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={reduceMotion}
      aria-label={`Reduce motion is ${stateLabel}. Click to change.`}
      title={`Reduce motion: ${stateLabel}`}
      className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap ${
        reduceMotion
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      } ${className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="hidden xl:inline">{reduceMotion ? "Motion off" : "Motion on"}</span>
    </button>
  );
};
