import { createContext, useContext, useState, ReactNode } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

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
    <DiagramFigure
      id="coronary-selection-context"
      title="Coronary selection context"
      description="Auto-generated wrapper for the Coronary selection context anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <CoronarySelectionContext.Provider value={{ territory, setTerritory }}>
        {children}
      </CoronarySelectionContext.Provider>
    </DiagramFigure>
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
