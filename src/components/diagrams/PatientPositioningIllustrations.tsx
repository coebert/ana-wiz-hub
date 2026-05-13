import React from "react";
import supineImg from "@/assets/positioning/supine.jpg";
import trendelenburgImg from "@/assets/positioning/trendelenburg.jpg";
import lithotomyImg from "@/assets/positioning/lithotomy.jpg";
import lateralImg from "@/assets/positioning/lateral.jpg";
import proneImg from "@/assets/positioning/prone.jpg";
import parkBenchImg from "@/assets/positioning/park-bench.jpg";
import sittingImg from "@/assets/positioning/sitting.jpg";
import beachChairImg from "@/assets/positioning/beach-chair.jpg";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Illustration-style image plates for the principal surgical positions.
 * Replaces the previous schematic SVG figures with watercolour-and-ink
 * medical-textbook illustrations. Each plate includes a caption listing
 * the key positioning checkpoints relevant to the FRCA / FFICM curriculum.
 */

interface PositionPlateProps {
  src: string;
  alt: string;
  title: string;
  checkpoints: string[];
}

const PositionPlate: React.FC<PositionPlateProps> = ({
  src,
  alt,
  title,
  checkpoints,
}) => (
  <figure className="my-4 rounded-xl border border-border bg-card overflow-hidden">
    <div className="bg-muted/20">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1024}
        height={640}
        className="w-full h-auto object-contain max-h-[420px] mx-auto"
      />
    </div>
    <figcaption className="px-4 py-3 border-t border-border">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-1.5 grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
        {checkpoints.map((c) => (
          <li key={c} className="flex gap-1.5">
            <span aria-hidden className="text-foreground/60">•</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </figcaption>
  </figure>
);

export const SupineIllustration: React.FC = () => (
  <PositionPlate
    src={supineImg}
    alt="Anaesthetised patient in supine position on an operating table"
    title="Supine"
    checkpoints={[
      "Arms abducted ≤ 90° on padded armboards (or tucked) to protect brachial plexus",
      "Eyes lubricated and taped, head on gel ring in neutral alignment",
      "Heels floated on foam pads; pressure points padded",
      "FRC ↓ 0.5–1 L vs sitting; ↑ V/Q mismatch in obese / elderly",
    ]}
  />
);

export const TrendelenburgIllustration: React.FC = () => (
  <PositionPlate
    src={trendelenburgImg}
    alt="Patient tilted head-down in Trendelenburg position"
    title="Trendelenburg (head-down 15–30°)"
    checkpoints={[
      "Shoulder braces over AC joint (NOT root of neck) — risk of brachial plexus traction",
      "↑ ICP, ↑ IOP, ↑ CVP, ↓ FRC; conjunctival/airway oedema in prolonged head-down",
      "Confirm ETT position after tilt — diaphragm ↑, carina migrates cephalad",
      "Risk of slide — non-slip mat, secure straps, anti-slip shoulder supports",
    ]}
  />
);

export const LithotomyIllustration: React.FC = () => (
  <PositionPlate
    src={lithotomyImg}
    alt="Patient in lithotomy position with both legs in padded stirrups"
    title="Lithotomy"
    checkpoints={[
      "Both legs raised SIMULTANEOUSLY (and lowered together) to prevent pelvic torsion",
      "Hip flexion ≤ 90°, minimal external rotation — protects femoral / obturator nerves",
      "Knees padded laterally — common peroneal nerve at fibular head most at risk",
      "Watch for well-leg compartment syndrome if &gt; 4 h; release stirrups intermittently",
    ]}
  />
);

export const LateralIllustration: React.FC = () => (
  <PositionPlate
    src={lateralImg}
    alt="Patient in right lateral decubitus position with axillary roll"
    title="Lateral decubitus"
    checkpoints={[
      "Axillary roll BELOW the dependent axilla (chest wall) — NEVER in the axilla itself",
      "Dependent eye / ear free of pressure; head neutral on a pillow",
      "Pillow between knees; dependent leg flexed, upper leg straight",
      "V/Q mismatch: dependent lung better perfused but worse ventilated under GA",
    ]}
  />
);

export const ProneIllustration: React.FC = () => (
  <PositionPlate
    src={proneImg}
    alt="Patient in prone position with abdomen free on bolsters"
    title="Prone"
    checkpoints={[
      "Abdomen FREE — bolsters / Wilson frame ↓ IAP, ↓ epidural venous engorgement, ↓ bleeding",
      "Eyes inspected every 20 min — risk of POVL (ION); avoid direct globe pressure",
      "Shoulders abducted &lt; 90°, elbows flexed, ulnar nerves padded",
      "ETT migrates ~2 cm caudally on turning — re-confirm bilateral air entry",
    ]}
  />
);

export const ParkBenchIllustration: React.FC = () => (
  <PositionPlate
    src={parkBenchImg}
    alt="Patient in park-bench position for posterior fossa neurosurgery"
    title="Park bench (posterior fossa / CP angle)"
    checkpoints={[
      "Three-quarter prone with head in Mayfield 3-pin clamp; 2 finger-breadths chin-to-chest",
      "Dependent arm in padded sling off table edge — protects brachial plexus",
      "Axillary roll under dependent thorax; pillow between knees",
      "Lower VAE risk than sitting (~10–15%) but limited surgical access",
    ]}
  />
);

export const SittingIllustration: React.FC = () => (
  <PositionPlate
    src={sittingImg}
    alt="Patient in sitting position for posterior fossa neurosurgery"
    title="Sitting (semi-Fowler) position"
    checkpoints={[
      "Mayfield head clamp; neck flexion preserves 2 finger-breadths gap to sternum",
      "Pre-op bubble echo to exclude PFO (relative contraindication)",
      "Zero arterial transducer at the EXTERNAL AUDITORY MEATUS (Circle of Willis)",
      "VAE 25–45% — precordial Doppler / TOE, EtCO₂/N₂, multi-orifice CVC at SVC-RA junction",
    ]}
  />
);

export const BeachChairIllustration: React.FC = () => (
    <DiagramFigure
      id="patient-positioning-illustrations"
      title="Patient positioning illustrations"
      description="Auto-generated wrapper for the Patient positioning illustrations anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <PositionPlate
      src={beachChairImg}
      alt="Patient in beach-chair position for shoulder surgery"
      title="Beach chair (shoulder surgery)"
      checkpoints={[
        "Trunk elevated 45–70°; head in padded holder, neck neutral — avoid lateral flexion",
        "Zero arterial transducer at the EXTERNAL AUDITORY MEATUS — MAP at heart over-reads CPP by 12–20 mmHg",
        "Knees flexed and supported; calf compression to ↓ venous pooling",
        "Cerebral hypoperfusion / stroke risk — keep MAP at brain ≥ 70 mmHg",
      ]}
    />
    </DiagramFigure>
  );
