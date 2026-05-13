import { createContext, useContext, useState, ReactNode } from "react";

export type CoronaryTerritory =
  | "anterior"
  | "septal"
  | "lateral"
  | "inferior"
  | "posterior"
  | "rv";

interface CoronarySelectionContextValue {
  territory: CoronaryTerritory;
  setTerritory: (t: CoronaryTerritory) => void;
}

const CoronarySelectionContext = createContext<CoronarySelectionContextValue | null>(null);

export const CoronarySelectionProvider = ({
  children,
  initial = "anterior",
}: {
  children: ReactNode;
  initial?: CoronaryTerritory;
}) => {
  const [territory, setTerritory] = useState<CoronaryTerritory>(initial);
  return (
            <CoronarySelectionContext.Provider value={{ territory, setTerritory }}>
      {children}
    </CoronarySelectionContext.Provider>
  );
};

/**
 * Returns the shared coronary selection state when inside a
 * CoronarySelectionProvider, otherwise falls back to local component state so
 * each diagram still works standalone.
 */
export const useCoronarySelection = (
  initial: CoronaryTerritory = "anterior",
): [CoronaryTerritory, (t: CoronaryTerritory) => void] => {
  const ctx = useContext(CoronarySelectionContext);
  const [local, setLocal] = useState<CoronaryTerritory>(initial);
  if (ctx) return [ctx.territory, ctx.setTerritory];
  return [local, setLocal];
};
