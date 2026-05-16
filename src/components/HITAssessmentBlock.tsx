import { useState } from "react";
import FourTsScorePanel, { type FourTsBand } from "@/components/FourTsScorePanel";
import HITTreatmentFlowchart from "@/components/diagrams/HITTreatmentFlowchart";

/**
 * Links the 4Ts pre-test probability score to the HIT treatment flowchart.
 * When the user completes the 4Ts, the resulting LOW / INTERMEDIATE / HIGH
 * band is forwarded to the flowchart, which highlights the steps that apply
 * (or, for LOW, displays a "HIT excluded — continue heparin" notice).
 */
const HITAssessmentBlock = () => {
  const [band, setBand] = useState<FourTsBand | null>(null);
  return (
    <>
      <FourTsScorePanel onBandChange={setBand} />
      <HITTreatmentFlowchart highlightBand={band} />
    </>
  );
};

export default HITAssessmentBlock;
