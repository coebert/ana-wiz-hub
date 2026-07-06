import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  DEFAULT_UNIT_PREFERENCES,
  type UnitPreferences,
  type PressureUnit,
  type TemperatureUnit,
  type WeightUnit,
  type HaemoglobinUnit,
} from "@/lib/units";

/**
 * User preference for measurement units. Persisted in localStorage.
 * UK anaesthesia convention (kPa, °C, kg, g/L) is the baseline; users can
 * override per family.
 *
 * Implemented as a zustand store. The `useUnitPreferences` hook shape is
 * preserved so consumers didn't need to change when we moved off React
 * context (see review §5).
 */

const defaults = (): UnitPreferences => ({ ...DEFAULT_UNIT_PREFERENCES, pressure: "kPa" });

interface UnitPreferenceState {
  prefs: UnitPreferences;
  setPressure: (u: PressureUnit) => void;
  setTemperature: (u: TemperatureUnit) => void;
  setWeight: (u: WeightUnit) => void;
  setHaemoglobin: (u: HaemoglobinUnit) => void;
  reset: () => void;
}

export const useUnitPreferenceStore = create<UnitPreferenceState>()(
  persist(
    (set) => ({
      prefs: defaults(),
      setPressure: (u) => set((s) => ({ prefs: { ...s.prefs, pressure: u } })),
      setTemperature: (u) => set((s) => ({ prefs: { ...s.prefs, temperature: u } })),
      setWeight: (u) => set((s) => ({ prefs: { ...s.prefs, weight: u } })),
      setHaemoglobin: (u) => set((s) => ({ prefs: { ...s.prefs, haemoglobin: u } })),
      reset: () => set({ prefs: defaults() }),
    }),
    {
      name: "ac.unit-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ prefs: s.prefs }),
      // Merge stored prefs onto current defaults so newly-added unit families
      // don't come back undefined for users with an older persisted blob.
      merge: (persisted, current) => {
        const p = (persisted as { prefs?: Partial<UnitPreferences> } | undefined)?.prefs ?? {};
        return { ...current, prefs: { ...current.prefs, ...p } };
      },
    },
  ),
);

interface UnitPreferenceHook {
  prefs: UnitPreferences;
  setPressure: (u: PressureUnit) => void;
  setTemperature: (u: TemperatureUnit) => void;
  setWeight: (u: WeightUnit) => void;
  setHaemoglobin: (u: HaemoglobinUnit) => void;
  reset: () => void;
}

export const useUnitPreferences = (): UnitPreferenceHook => {
  const prefs = useUnitPreferenceStore((s) => s.prefs);
  const setPressure = useUnitPreferenceStore((s) => s.setPressure);
  const setTemperature = useUnitPreferenceStore((s) => s.setTemperature);
  const setWeight = useUnitPreferenceStore((s) => s.setWeight);
  const setHaemoglobin = useUnitPreferenceStore((s) => s.setHaemoglobin);
  const reset = useUnitPreferenceStore((s) => s.reset);
  return { prefs, setPressure, setTemperature, setWeight, setHaemoglobin, reset };
};

/** No-op provider kept for backward compatibility. */
export const UnitPreferenceProvider = ({ children }: { children: React.ReactNode }) =>
  children as React.ReactElement;
