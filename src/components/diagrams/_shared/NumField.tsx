import { useId } from "react";

/** Parse a free-text numeric field: blank → null (unknown); anything else → Number (may be NaN/∞, rejected later). */
export const parseNum = (s: string): number | null => (s.trim() === "" ? null : Number(s));

export function NumField({ label, unit, value, onChange, hint, invalid }: {
  label: string; unit?: string; value: string; onChange: (v: string) => void; hint?: string; invalid?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        {unit && <span className="text-muted-foreground font-mono">{unit}</span>}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        className={`w-full px-2 py-1 rounded border bg-background text-sm font-mono ${invalid ? "border-destructive" : "border-border"}`}
      />
      {(hint || invalid) && (
        <p className={`text-[10px] mt-0.5 ${invalid ? "text-destructive" : "text-muted-foreground"}`}>
          {invalid ? "Not a valid value in this unit — left unscored." : hint}
        </p>
      )}
    </div>
  );
}
