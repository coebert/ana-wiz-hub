/** Limited original relationship maps; sonograms and procedural geometry remain withheld. */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { PLEXUS_SPATIAL } from "@/components/topic/AnatomySpatialTeaching";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";
import interscaleneMap from "@/assets/diagrams/plexus-relationships/interscalene.svg.asset.json";
import supraclavicularMap from "@/assets/diagrams/plexus-relationships/supraclavicular.svg.asset.json";
import infraclavicularMap from "@/assets/diagrams/plexus-relationships/infraclavicular.svg.asset.json";
import axillaryMap from "@/assets/diagrams/plexus-relationships/axillary.svg.asset.json";

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
    description: "The lateral, posterior and medial cords are related to the axillary artery, typically deep to pectoralis major and minor at the lateral infraclavicular level. Their apparent positions and the locations of veins vary with the individual and the scanning plane; cord names do not prescribe fixed clock positions.",
    landmarks: "Pectoralis major (superficial), pectoralis minor (deep), axillary artery (pulsatile), axillary vein (compressible, medial/caudal), pleura (deep)",
    needle: "In-plane sagittal parasagittal approach. Target: appropriate perineural spread outside cord and vessel boundaries; clock positions and approach vary with anatomy.",
    tips: "Arm abduction improves access. Identify coracoid process as bony landmark. U-shaped spread of LA around artery indicates correct placement. Avoid the vein (Doppler). Good site for catheter (pectoralis muscle holds catheter in place).",
  },
  axillary: {
    label: "Axillary",
    subtitle: '"Cross-Section"',
    description: "Median, ulnar and radial nerves are identified around the axillary artery, with substantial anatomical variation. The musculocutaneous nerve is commonly identified separately between biceps and coracobrachialis; its course and branching can vary.",
    landmarks: "Axillary artery with variable median, ulnar and radial nerve positions; radial nerve often deep to the artery. The musculocutaneous nerve is commonly separate between biceps and coracobrachialis. Trace each nerve to establish identity rather than relying on a clock position.",
    needle: "In-plane. Multiple injections around individual nerves or perivascular technique. Separate injection for musculocutaneous nerve in coracobrachialis.",
    tips: "Arm abducted 90°. Slide probe distally — nerves become more superficial and separate from artery. Median and ulnar are hyperechoic with honeycomb pattern. Musculocutaneous appears as bright oval between biceps and coracobrachialis. Select technique for the patient and identify vascular and nerve boundaries; no block is universally safest.",
  },
};

const relationshipMaps: Record<BlockLevel, { url: string; anatomy: string; limitations: string; references: string[] }> = {
  interscalene: {
    url: interscaleneMap.url,
    anatomy: "Conceptual transverse neck relationship: plexus lies between anterior and middle scalene muscles, deep to sternocleidomastoid. No needle, target or procedural route is represented.",
    limitations: "Medial / anterior versus lateral / posterior is explicitly labelled. Typical roots/trunks occupy the scalene interval; not every root or intervening vessel is shown. Root number and appearance vary. This is not a complete anatomical section or scanning template.",
    references: ["RAUK Plan A upper limb", "Royse plexus variation"],
  },
  supraclavicular: {
    url: supraclavicularMap.url,
    anatomy: "The plexus lies usually lateral and posterior to the subclavian artery at the first rib. Both lie above the rib. Pleura is distinct and deeper; a rib is not a universal barrier under every possible approach. This is not an ultrasound image.",
    limitations: "Vertical order expresses conceptual depth, not a scan plane. Rib, its acoustic shadow and adjacent pleura are distinct ultrasound landmarks; the map does not establish a protective rib beneath every route.",
    references: ["SPA supraclavicular guide"],
  },
  infraclavicular: {
    url: infraclavicularMap.url,
    anatomy: "Pectoralis major is superficial to pectoralis minor. The three brachial plexus cords and axillary vessels lie deep to pectoralis minor. No fixed angular or clock-face positions of individual cords are represented.",
    limitations: "Typical depth relationships at the lateral infraclavicular level only, not a costoclavicular scan plane. Cord and vein locations vary with anatomy, plane and arm position; the grouped cords are not assigned fixed screen positions.",
    references: ["Sandhu infraclavicular anatomy", "Di Filippo cord variation"],
  },
  axillary: {
    url: axillaryMap.url,
    anatomy: "Median, ulnar and radial nerves have variable positions around the axillary artery. The musculocutaneous nerve is commonly found separately between biceps and coracobrachialis. No fixed compass or clock positions are shown.",
    limitations: "Left-to-right order is not an anatomical axis. Trace nerves to establish identity, not from a clock position. Venous structures and anatomical variants are omitted from this concept map.",
    references: ["RAUK Plan A upper limb", "Royse plexus variation"],
  },
};

const BrachialPlexusUltrasoundDiagram = () => {
  const [selected, setSelected] = useState<BlockLevel>("interscalene");
  const info = levels[selected];
  const map = relationshipMaps[selected];

  return (
    <DiagramFigure
      id="brachial-plexus-ultrasound-diagram"
      title="Brachial plexus relationships"
      description="Four conceptual maps of selected brachial plexus relationships. These are not ultrasound images, are not to scale, and do not show a procedural needle route."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Brachial plexus relationships"
            subtitle="Conceptual maps of selected anatomical relationships"
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
  
          <div className="space-y-5" key={selected}>
            <div className="w-full max-w-[900px] mx-auto space-y-3">
              <img src={map.url} alt={map.anatomy} width={900} height={700} className="w-full h-auto" />
              <Button asChild variant="outline" className="min-h-11 whitespace-normal">
                <a href={map.url} target="_blank" rel="noopener noreferrer">Open larger {info.label.toLowerCase()} relationship map (new tab)</a>
              </Button>
              <p className="text-sm font-semibold text-foreground">Selected relationships — not an ultrasound image or procedural guide.</p>
              <p className="text-sm text-muted-foreground">Shapes are not to scale and do not show a needle route or injection target. The original sonogram and procedural atlas remain withheld pending reviewed redraw.</p>
              <p className="text-sm leading-relaxed">{map.anatomy}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{map.limitations}</p>
              <div className="text-sm">Anatomical sources: {map.references.map(label => <InlineRef key={label} topicId="brachial-plexus" refLabel={label} />)}</div>
            </div>
            <div className="border-l-4 border-anatomy pl-4">
              <p className="text-sm font-semibold text-foreground">Ultrasound scanning and safety teaching — separate from the maps</p>
              <p className="text-sm text-muted-foreground mt-2">{PLEXUS_SPATIAL}</p>
              <InlineRef topicId="brachial-plexus" refLabel="NICE HTG179 block" /><InlineRef topicId="brachial-plexus" refLabel="RAUK needling" /><InlineRef topicId="brachial-plexus" refLabel="SPA supraclavicular guide" />
            </div>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-primary bg-background/80">
                <p className="font-semibold text-foreground text-sm">{info.label} — {info.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{info.description}</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-xs">Key landmarks</p>
                <p className="text-xs text-muted-foreground mt-1">{info.landmarks}</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-xs">Retained procedural teaching — not depicted in the map</p>
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
