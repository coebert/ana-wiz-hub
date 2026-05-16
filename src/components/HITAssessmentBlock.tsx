import { useState, type ReactNode } from "react";
import FourTsScorePanel, { type FourTsBand } from "@/components/FourTsScorePanel";
import HITTreatmentFlowchart from "@/components/diagrams/HITTreatmentFlowchart";

/**
 * Links the 4Ts pre-test probability score to the HIT treatment flowchart.
 * The 4Ts panel is rendered first; arbitrary `children` (e.g. the Management
 * box) appear between the score and the flowchart so existing page layout is
 * preserved. The computed band drives the highlighted steps on the flowchart.
 */
const HITAssessmentBlock = ({ children }: { children?: ReactNode }) => {
  const [band, setBand] = useState<FourTsBand | null>(null);
  return (
    <>
      <FourTsScorePanel onBandChange={setBand} />
      {children}
      <HITTreatmentFlowchart highlightBand={band} />
    </>
  );
};

export default HITAssessmentBlock;
