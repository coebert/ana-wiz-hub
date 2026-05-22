import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  DEFAULT_UNIT_PREFERENCES,
  type UnitPreferences,
  type PressureUnit,
  type TemperatureUnit,
  type WeightUnit,
  type HaemoglobinUnit,
} from "@/lib/units";

/**
 * User preference for measurement units (pressure / temperature / weight /
 * haemoglobin). Persisted in localStorage. Defaults follow UK anaesthesia
 * convention (kPa, °C, kg, g/L) — see resolveDefaults below — but users in
 * other regions can override per family.
 */

const STORAGE_KEY = "ac.unit-preferences";

interface UnitPreferenceContextType {
  prefs: UnitPreferences;
  setPressure: (u: PressureUnit) => void;
  setTemperature: (u: TemperatureUnit) => void;
  setWeight: (u: WeightUnit) => void;
  setHaemoglobin: (u: HaemoglobinUnit) => void;
  reset: () => void;
}

const UnitPreferenceContext = createContext<UnitPreferenceContextType | null>(null);

const resolveDefaults = (): UnitPreferences => {
  // UK anaesthesia exam convention is the project baseline.
  return { ...DEFAULT_UNIT_PREFERENCES, pressure: "kPa" };
};

const readStored = (): UnitPreferences => {
  if (typeof window === "undefined") return resolveDefaults();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return resolveDefaults();
    const parsed = JSON.parse(raw) as Partial<UnitPreferences>;
    return { ...resolveDefaults(), ...parsed };
  } catch {
    return resolveDefaults();
  }
};

const writeStored = (prefs: UnitPreferences) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
};

export const UnitPreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [prefs, setPrefs] = useState<UnitPreferences>(() => readStored());

  useEffect(() => {
    writeStored(prefs);
  }, [prefs]);

  const update = useCallback(<K extends keyof UnitPreferences>(key: K, value: UnitPreferences[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);

  const value: UnitPreferenceContextType = {
    prefs,
    setPressure: (u) => update("pressure", u),
    setTemperature: (u) => update("temperature", u),
    setWeight: (u) => update("weight", u),
    setHaemoglobin: (u) => update("haemoglobin", u),
    reset: () => setPrefs(resolveDefaults()),
  };

  return <UnitPreferenceContext.Provider value={value}>{children}</UnitPreferenceContext.Provider>;
};

export const useUnitPreferences = (): UnitPreferenceContextType => {
  const ctx = useContext(UnitPreferenceContext);
  if (!ctx) {
    // Safe fallback so components outside the provider don't crash.
    return {
      prefs: resolveDefaults(),
      setPressure: () => {},
      setTemperature: () => {},
      setWeight: () => {},
      setHaemoglobin: () => {},
      reset: () => {},
    };
  }
  return ctx;
};
