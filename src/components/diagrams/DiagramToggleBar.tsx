interface ToggleConfig {
  label: string;
  active: boolean;
  onChange: () => void;
}

interface DiagramToggleBarProps {
  title?: string;
  subtitle?: string;
  toggles: ToggleConfig[];
  className?: string;
}

/**
 * Unified toggle bar used across head & neck anatomy diagrams.
 * Renders an optional title/subtitle on the left and a row of pill toggle
 * buttons on the right (Sutures, Labels, etc.).
 */
export const DiagramToggleBar = ({ title, subtitle, toggles, className = "" }: DiagramToggleBarProps) => {
  return (
    <div className={`flex flex-wrap items-start justify-between gap-2 mb-2 ${className}`}>
      {(title || subtitle) && (
        <div className="min-w-0">
          {title && <h3 className="text-lg font-serif font-bold text-foreground leading-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 text-xs ml-auto">
        {toggles.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={t.onChange}
            aria-pressed={t.active}
            className={`px-2 py-1 rounded border transition-colors ${
              t.active
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {t.label} {t.active ? "✓" : "○"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiagramToggleBar;
