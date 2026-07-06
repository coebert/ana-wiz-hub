import { useUnitPreferences } from "@/contexts/UnitPreferenceContext";
import { convertQty, defaultDigits, type AnyUnit } from "@/lib/units";

interface QtyProps {
  /** Numeric value as authored. */
  value: number;
  /** Source unit the value is authored in. */
  unit: AnyUnit;
  /** Override the formatted decimal places. */
  digits?: number;
  /** Render only the number (no unit suffix). */
  hideUnit?: boolean;
  /** Optional separator between number and unit. */
  separator?: string;
  className?: string;
}

/**
 * Inline numeric value that auto-converts to the user's preferred unit.
 * Use anywhere a literal like "40 mmHg" or "37°C" appears so the same
 * markup serves UK (kPa, °C) and US (mmHg, °F) conventions.
 *
 *   <Qty value={40} unit="mmHg" />            → "5.3 kPa" or "40 mmHg"
 *   <Qty value={70} unit="kg" digits={0} />   → "70 kg" or "154 lb"
 */
export const Qty = ({
  value,
  unit,
  digits,
  hideUnit = false,
  separator = " ",
  className,
}: QtyProps) => {
  const { prefs } = useUnitPreferences();
  const c = convertQty(value, unit, prefs);
  const d = digits ?? defaultDigits(c.unit);
  const num = c.value.toFixed(d);

  const title = c.converted ? `${value} ${unit} (source)` : undefined;

  return (
    <span className={className} title={title}>
      {num}
      {!hideUnit && (
        <>
          {separator}
          {c.unit}
        </>
      )}
    </span>
  );
};
