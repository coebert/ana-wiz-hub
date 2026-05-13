import React from "react";
import subTenonsImg from "@/assets/ophthalmic/sub-tenons-block.jpg";
import peribulbarImg from "@/assets/ophthalmic/peribulbar-block.jpg";
import retrobulbarImg from "@/assets/ophthalmic/retrobulbar-block.jpg";
import topicalImg from "@/assets/ophthalmic/topical-intracameral.jpg";

/**
 * Illustration plates for the four principal ophthalmic regional anaesthesia
 * techniques: sub-Tenon's, peribulbar, retrobulbar, and topical/intracameral.
 * Watercolour-and-ink medical-textbook style with key procedural checkpoints.
 */

interface BlockPlateProps {
  src: string;
  alt: string;
  title: string;
  steps: string[];
}

const BlockPlate: React.FC<BlockPlateProps> = ({ src, alt, title, steps }) => (
  <figure className="my-4 rounded-xl border border-border bg-card overflow-hidden">
    <div className="bg-muted/20">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={896}
        className="w-full h-auto object-contain max-h-[460px] mx-auto"
      />
    </div>
    <figcaption className="px-4 py-3 border-t border-border">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-1.5 grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
        {steps.map((s) => (
          <li key={s} className="flex gap-1.5">
            <span aria-hidden className="text-foreground/60">•</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </figcaption>
  </figure>
);

export const SubTenonsBlockIllustration: React.FC = () => (
  <BlockPlate
    src={subTenonsImg}
    alt="Cross-sectional anatomical illustration of a sub-Tenon's eye block showing a blunt curved cannula in the inferonasal sub-Tenon's space"
    title="Sub-Tenon's block — inferonasal approach"
    steps={[
      "Topical LA drops; small conjunctival nick inferonasally with Westcott scissors",
      "Blunt curved 19G Sub-Tenon's cannula advanced posteriorly between Tenon's capsule and sclera",
      "Inject 3–5 mL LA — spreads around posterior globe and along optic nerve",
      "Safest needle-based technique: no sharp needle near globe; chemosis common but minor",
    ]}
  />
);

export const PeribulbarBlockIllustration: React.FC = () => (
  <BlockPlate
    src={peribulbarImg}
    alt="Anatomical illustration of a peribulbar eye block showing a 25G needle with its tip outside the extraocular muscle cone"
    title="Peribulbar block — extraconal"
    steps={[
      "25G short (25 mm) needle through skin or conjunctiva, inferotemporal quadrant",
      "Advance parallel to orbital floor, keeping tip OUTSIDE the muscle cone",
      "Inject 6–10 mL LA in extraconal fat (± second medial top-up); onset 10–15 min",
      "Lower brainstem-anaesthesia risk than retrobulbar; globe perforation still possible",
    ]}
  />
);

export const RetrobulbarBlockIllustration: React.FC = () => (
  <BlockPlate
    src={retrobulbarImg}
    alt="Anatomical illustration of a retrobulbar eye block showing a long needle inside the extraocular muscle cone behind the globe"
    title="Retrobulbar block — intraconal (rarely used now)"
    steps={[
      "25G long (31–38 mm) sharp needle, inferotemporal entry 1 cm below lateral canthus",
      "Advance upward and medially toward the orbital apex into the muscle cone",
      "Aspirate, then inject 2–4 mL LA inside the cone for rapid akinesia",
      "Risks: globe perforation, retrobulbar haemorrhage, optic-nerve injury, brainstem anaesthesia",
    ]}
  />
);

export const TopicalIntracameralIllustration: React.FC = () => (
      <BlockPlate
    src={topicalImg}
    alt="Illustration showing topical anaesthetic eye drops and intracameral lidocaine injection into the anterior chamber for cataract surgery"
    title="Topical ± intracameral — cataract surgery"
    steps={[
      "Topical proxymetacaine or tetracaine 0.5% drops anaesthetise corneal epithelium",
      "Surgeon supplements with intracameral preservative-free lidocaine 1% via clear corneal incision",
      "No injection-related risks; requires a cooperative, still patient",
      "No akinesia — patient must keep the eye still and follow surgeon's instructions",
    ]}
  />
  );
