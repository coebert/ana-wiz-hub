import { DiagramFigure } from "../_shared/DiagramFigure";
import { AntithromboticGuidelineLookup } from "./AntithromboticGuidelineLookup";

export const AnticoagRestartTimeline = () => (
  <DiagramFigure id="anticoag-restart-timeline" title="Antithrombotic restart: guideline checklist" description="Review catheter and drug-specific recommendations; no generated restart timeline.">
    <AntithromboticGuidelineLookup restart />
  </DiagramFigure>
);
export default AnticoagRestartTimeline;
