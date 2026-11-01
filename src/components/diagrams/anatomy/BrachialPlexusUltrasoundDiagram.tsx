/** Text-only spatial teaching: no sonographic projection or procedural needle geometry is offered pending review. */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { PLEXUS_SPATIAL } from "@/components/topic/AnatomySpatialTeaching";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

type BlockLevel = "interscalene" | "supraclavicular" | "infraclavicular" | "axillary";

const levels: Record<BlockLevel, { label: string; subtitle: string; description: string; landmarks: string; needle: string; tips: string }> = {
  interscalene: {
    label: "Interscalene",
    subtitle: '"Traffic Lights"',
    description: "Three hypoechoic round structures (C5, C6, C7 roots/trunks) stacked vertically between anterior and middle scalene muscles — resembling traffic lights. Located deep to SCM at C6 level.",
    landmarks: "SCM (superficial), anterior scalene (medial), middle scalene (lateral), carotid artery (medial/deep), internal jugular vein (superficial/medial)",
    needle: "In-plane lateral to medial. Target: perineural/fascial-plane spread outside nerve boundaries, not into a root. Avoid phrenic nerve (anterior to anterior scalene).",
    tips: "Trace distally from supraclavicular view to identify roots. Slide cranially to see C5–C7 as separate round structures. Doppler to identify vertebral artery (deep, medial).",
  },
  supraclavicular: {
    label: "Supraclavicular",
    subtitle: '"Bunch of Grapes"',
    description: "Trunks and divisions appear as a cluster of hypoechoic nodules (bunch of grapes) sitting on top of the first rib, lateral and superficial to the subclavian artery. Pleura visible as bright sliding line deep to artery.",
    landmarks: "Subclavian artery (pulsatile, round), first rib (hyperechoic with acoustic shadow), pleura (sliding, deep to rib), nerve cluster (posterolateral to artery)",
    needle: "In-plane lateral to medial. Target: 'corner pocket' — junction of nerve cluster, artery, and first rib. Keep needle tip visible at all times to avoid pneumothorax.",
    tips: "Start with probe in supraclavicular fossa, tilted caudally. Identify artery first, then look posterolateral for the nerve cluster. Identify rib, acoustic shadow and pleura separately; the rib is not a universal safety backstop. Colour Doppler to confirm dorsal scapular/transverse cervical arteries.",
  },
  infraclavicular: {
    label: "Infraclavicular",
    subtitle: '"Cords Around Artery"',
    description: "Three cords (lateral, posterior, medial) surround the second part of the axillary artery deep to pectoralis major and minor. Appear as hyperechoic structures at roughly 9, 6, and 3 o'clock positions relative to artery.",
    landmarks: "Pectoralis major (superficial), pectoralis minor (deep), axillary artery (pulsatile), axillary vein (compressible, medial/caudal), pleura (deep)",
    needle: "In-plane sagittal parasagittal approach. Target: appropriate perineural spread outside cord and vessel boundaries; clock positions and approach vary with anatomy.",
    tips: "Arm abduction improves access. Identify coracoid process as bony landmark. U-shaped spread of LA around artery indicates correct placement. Avoid the vein (Doppler). Good site for catheter (pectoralis muscle holds catheter in place).",
  },
  axillary: {
    label: "Axillary",
    subtitle: '"Cross-Section"',
    description: "Terminal branches (median, ulnar, radial) arranged around the third part of the axillary artery in the axilla. Musculocutaneous nerve seen separately as a hyperechoic oval within coracobrachialis muscle.",
    landmarks: "Axillary artery (centre), median nerve (superficial/lateral ~12 o'clock), ulnar nerve (superficial/medial ~2 o'clock), radial nerve (posterior/deep ~6 o'clock), musculocutaneous nerve (in coracobrachialis, lateral)",
    needle: "In-plane. Multiple injections around individual nerves or perivascular technique. Separate injection for musculocutaneous nerve in coracobrachialis.",
    tips: "Arm abducted 90°. Slide probe distally — nerves become more superficial and separate from artery. Median and ulnar are hyperechoic with honeycomb pattern. Musculocutaneous appears as bright oval between biceps and coracobrachialis. Select technique for the patient and identify vascular and nerve boundaries; no block is universally safest.",
  },
};

const BrachialPlexusUltrasoundDiagram = () => {
  const [selected, setSelected] = useState<BlockLevel>("interscalene");
  const info = levels[selected];

  return (
    <DiagramFigure
      id="brachial-plexus-ultrasound-diagram"
      title="Brachial plexus ultrasound"
      description="Brachial plexus ultrasound: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Ultrasound anatomy — brachial plexus blocks"
            subtitle="Block-level anatomy and landmarks"
            toggles={[]}
          />
  
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(levels) as BlockLevel[]).map((l) => (
              <Button variant="outline" aria-pressed={selected === l} key={l} onClick={() => setSelected(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selected === l
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}>
                {levels[l].label}
              </Button>
            ))}
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 items-start animate-fade-in" key={selected}>
            <div className="flex-1 min-w-0 border-l-4 border-anatomy pl-4">
              <p className="text-sm font-semibold text-foreground">Spatial relationships — procedural figure withdrawn</p>
              <p className="text-sm text-muted-foreground mt-2">{PLEXUS_SPATIAL}</p>
              <InlineRef topicId="brachial-plexus" refLabel="NICE HTG179 block" /><InlineRef topicId="brachial-plexus" refLabel="RAUK needling" /><InlineRef topicId="brachial-plexus" refLabel="SPA supraclavicular guide" />
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div className="p-3 rounded-lg border border-border bg-background/80 min-h-[110px]" style={{ borderLeftWidth: 4, borderLeftColor: "hsl(var(--primary))" }}>
                <p className="font-semibold text-foreground text-sm">{info.label} — {info.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{info.description}</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-xs">Key landmarks</p>
                <p className="text-xs text-muted-foreground mt-1">{info.landmarks}</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-xs">Needle technique</p>
                <p className="text-xs text-muted-foreground mt-1">{info.needle}</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <p className="font-semibold text-foreground text-xs">Scanning tips</p>
                <p className="text-xs text-muted-foreground mt-1">{info.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BrachialPlexusUltrasoundDiagram;
