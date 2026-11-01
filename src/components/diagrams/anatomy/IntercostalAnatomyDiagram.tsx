/** Text-only chest-wall teaching: depth and craniocaudal relationships are independent; mixed-plane art withdrawn. */
import { IntercostalRelationships } from "./RelationshipSchematics";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { INTERCOSTAL_SPATIAL, INTERCOSTAL_TARGETS } from "@/components/topic/AnatomySpatialTeaching";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

type LayerKey = "skin" | "ext-intercostal" | "int-intercostal" | "innermost" | "neurovascular" | "endothoracic" | "parietal-pleura" | "pleural-space" | "visceral-pleura" | "lung" | "rib-above" | "rib-below";

interface Layer {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, Layer> = {
  "rib-above": { label: "Rib (above)", color: "hsl(35, 40%, 60%)", detail: "Superior rib with costal groove on its inferior surface housing the intercostal neurovascular bundle (VAN — vein, artery, nerve from top to bottom).", clinicalNote: "The neurovascular bundle runs in the costal groove at the INFERIOR border of the rib above. Insert needles/drains ABOVE the rib below." },
  skin: { label: "Skin & Subcutaneous", color: "hsl(25, 45%, 65%)", detail: "Skin, subcutaneous fat, and superficial fascia. Variable thickness depending on body habitus.", clinicalNote: "Local anaesthetic infiltration here for chest drain insertion. Mark the safe triangle (anterior lat dorsi, lateral pec major, 5th ICS)." },
  "ext-intercostal": { label: "External Intercostal", color: "hsl(0, 50%, 55%)", detail: "Fibres run downward and FORWARD ('hands in pockets'). Extends from tubercle posteriorly to costochondral junction anteriorly, replaced by external intercostal membrane.", clinicalNote: "Active in inspiration — elevates ribs." },
  "int-intercostal": { label: "Internal Intercostal", color: "hsl(210, 50%, 52%)", detail: "Fibres run downward and BACKWARD (perpendicular to external). Extends from sternum anteriorly to angle of rib posteriorly.", clinicalNote: "Active in forced expiration. Between internal and innermost layers lies the neurovascular bundle — target for intercostal nerve block." },
  neurovascular: { label: "Neurovascular Bundle (VAN)", color: "hsl(350, 65%, 50%)", detail: "Intercostal Vein (superior), Artery (middle), Nerve (inferior) — VAN from top to bottom. Runs between internal and innermost intercostal muscles in costal groove.", clinicalNote: "Target for intercostal nerve block (inject just inferior to rib at angle). Inadvertent puncture → pneumo/haemothorax." },
  innermost: { label: "Innermost Intercostal", color: "hsl(240, 45%, 52%)", detail: "Incomplete muscle layer, same fibre direction as internal intercostal. Includes subcostalis and transversus thoracis.", clinicalNote: INTERCOSTAL_TARGETS },
  endothoracic: { label: "Endothoracic Fascia", color: "hsl(180, 35%, 52%)", detail: "Thin connective tissue lining inner thoracic wall, deep to innermost intercostal.", clinicalNote: "Separates musculoskeletal thorax from pleura. Extrapleural plane used in some surgical approaches." },
  "parietal-pleura": { label: "Parietal Pleura", color: "hsl(160, 50%, 48%)", detail: "Lines inner thoracic wall. Innervated by intercostal (costal) and phrenic (mediastinal/diaphragmatic) nerves — pain-sensitive.", clinicalNote: "Parietal pleura is sensory — pleuritic pain arises here. Phrenic supply to central diaphragmatic pleura → shoulder tip pain." },
  "pleural-space": { label: "Pleural Space", color: "hsl(195, 55%, 55%)", detail: "Potential space containing ~5 ml serous fluid. Negative pressure (−5 cmH₂O at FRC) keeps lung expanded.", clinicalNote: "Pneumothorax: air here → lung collapse. Chest drain target (safe triangle, 5th ICS, mid-axillary line)." },
  "visceral-pleura": { label: "Visceral Pleura", color: "hsl(140, 45%, 48%)", detail: "Covers lung surface including fissures. Autonomic innervation only — NOT pain-sensitive. Blood supply from bronchial arteries.", clinicalNote: "No somatic innervation — lung parenchymal disease painless unless parietal pleura involved." },
  lung: { label: "Lung Parenchyma", color: "hsl(340, 40%, 60%)", detail: "~300 million alveoli, surface area ~70 m². Dual blood supply: pulmonary (gas exchange) and bronchial (nutritive).", clinicalNote: "Right: 3 lobes, 10 segments. Left: 2 lobes. Right upper lobe bronchus eparterial — key for DLT positioning." },
  "rib-below": { label: "Rib (below)", color: "hsl(35, 40%, 60%)", detail: "Insert needles and drains ABOVE this rib to avoid the neurovascular bundle running under the rib above.", clinicalNote: "Safe insertion: above the rib below. Triangle of safety for chest drain." },
};

const layerOrder: LayerKey[] = ["rib-above", "skin", "ext-intercostal", "int-intercostal", "neurovascular", "innermost", "endothoracic", "parietal-pleura", "pleural-space", "visceral-pleura", "lung", "rib-below"];

const IntercostalAnatomyDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("neurovascular");
  const info = layers[selected];
  const [showLabels, setShowLabels] = useState(true);


  return (
    <DiagramFigure
      id="intercostal-anatomy-diagram"
      title="Intercostal anatomy"
      description="Intercostal anatomy: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Intercostal space — spatial relationships"
            subtitle="Tap any layer to see its anatomy and clinical relevance for chest procedures"
            toggles={[{ label: "Labels", active: showLabels, onChange: () => setShowLabels(v => !v) }]}
          />
  
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 min-w-0 border-l-4 border-anatomy pl-4">
              <h3 className="text-sm font-semibold text-foreground">Intercostal parasagittal relationship schematic</h3>
              <IntercostalRelationships selected={selected} onSelect={key => setSelected(key as LayerKey)} labels={showLabels} />
              <p className="text-sm text-muted-foreground mt-2">{INTERCOSTAL_SPATIAL}</p>
              <InlineRef topicId="thoracic-anatomy" refLabel="BTS pleural procedures 2023" /><InlineRef topicId="thoracic-anatomy" refLabel="Intercostal anatomy" /><InlineRef topicId="thoracic-anatomy" refLabel="Thoracic wall VAN" /><InlineRef topicId="thoracic-anatomy" refLabel="TTUHSC thoracic wall relationships" />
              <div className="flex flex-wrap gap-2 mt-4">{layerOrder.map(key => <Button key={key} variant="outline" size="sm" aria-pressed={selected === key} onClick={() => setSelected(key)}>{layers[key].label}</Button>)}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
                style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
              >
                <p className="font-semibold text-foreground text-sm">{info.label}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Clinical:</span> {info.clinicalNote}<InlineRef topicId="thoracic-anatomy" refLabel="ESRA Plan A ESP" /><InlineRef topicId="thoracic-anatomy" refLabel="WFSA thoracic PVB" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default IntercostalAnatomyDiagram;
