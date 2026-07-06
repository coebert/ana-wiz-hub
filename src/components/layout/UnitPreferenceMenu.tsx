import { Ruler } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUnitPreferences } from "@/contexts/UnitPreferenceContext";
import type {
  PressureUnit,
  TemperatureUnit,
  WeightUnit,
  HaemoglobinUnit,
} from "@/lib/units";

/** True when any preference differs from the default. */
const hasNonDefault = (prefs: {
  pressure: PressureUnit;
  temperature: TemperatureUnit;
  weight: WeightUnit;
  haemoglobin: HaemoglobinUnit;
}) =>
  prefs.pressure !== "mmHg" ||
  prefs.temperature !== "C" ||
  prefs.weight !== "kg" ||
  prefs.haemoglobin !== "g/dL";

/**
 * Header dropdown letting the user pick their preferred display units for
 * the four region-dependent measurement families used across the app.
 */
export const UnitPreferenceMenu = ({ className = "" }: { className?: string }) => {
  const {
    prefs,
    setPressure,
    setTemperature,
    setWeight,
    setHaemoglobin,
    reset,
  } = useUnitPreferences();

  const active = hasNonDefault(prefs);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Units preferences"
          title="Units preferences"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap border ${
            active
              ? "border-clinical/60 bg-clinical/10 text-clinical hover:bg-clinical/20"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          } ${className}`}
        >
          <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden xl:inline">Units</span>
          {active && (
            <span className="ml-0.5 inline-flex h-2 w-2 rounded-full bg-clinical" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Pressure</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={prefs.pressure}
          onValueChange={(v) => setPressure(v as PressureUnit)}
        >
          <DropdownMenuRadioItem value="kPa">kPa (UK)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="mmHg">mmHg (US)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Temperature</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={prefs.temperature}
          onValueChange={(v) => setTemperature(v as TemperatureUnit)}
        >
          <DropdownMenuRadioItem value="C">°C</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="F">°F</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Weight</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={prefs.weight}
          onValueChange={(v) => setWeight(v as WeightUnit)}
        >
          <DropdownMenuRadioItem value="kg">kg</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lb">lb</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Haemoglobin</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={prefs.haemoglobin}
          onValueChange={(v) => setHaemoglobin(v as HaemoglobinUnit)}
        >
          <DropdownMenuRadioItem value="g/L">g/L (UK)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="g/dL">g/dL (US)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={reset}>Reset to defaults</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
