import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { laserFibreopticsQuiz } from "@/data/quizzes";
import LaserFibreopticsDiagram from "@/components/diagrams/LaserFibreopticsDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const LaserFibreopticsTopic = () => {
  return (
    <SectionLayout
      title="Lasers & Fibreoptics"
      subtitle="LASER principles, fibreoptic light transmission, total internal reflection, and clinical applications"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "LASER = Light Amplification by Stimulated Emission of Radiation — requires population inversion in a gain medium",
            "Laser light is monochromatic (single wavelength), coherent (waves in phase), and collimated (parallel beam)",
            "CO₂ laser (10,600 nm) is absorbed by water and cuts tissue; it ignites PVC ETTs — use laser-safe tubes with saline-filled cuffs",
            "Total internal reflection occurs when light travels from high to low refractive index at angle > critical angle (sin θc = n₂/n₁)",
            "Coherent fibre bundles transmit images (fibres maintain spatial position); incoherent bundles transmit light only",
            "Numerical aperture NA = √(n₁² − n₂²) defines the acceptance cone angle of the fibre",
            "Reduce FiO₂ to ≤30% during airway laser surgery; avoid N₂O as it supports combustion",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Lasers and fibreoptics are fundamental to modern anaesthetic and surgical practice. Understanding laser physics is
            essential for safe airway laser surgery, while fibreoptic principles underpin the fibreoptic bronchoscope — a
            cornerstone of difficult airway management. Both topics appear regularly in the Primary FRCA physics examination.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <LaserFibreopticsDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">LASER Physics</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A laser produces light through <strong>stimulated emission</strong>. An incoming photon interacts with an atom in an
              excited (metastable) state, causing it to emit an identical photon — same wavelength, phase, and direction. This
              requires <strong>population inversion</strong>: more atoms must be in the excited state than the ground state, achieved
              by external energy input (pumping) — optical, electrical, or chemical.
            </p>
            <p>
              The gain medium sits within an <strong>optical cavity</strong> bounded by two mirrors. The total mirror reflects all
              light back; the partial mirror allows a fraction to escape as the laser beam. Multiple passes through the gain medium
              amplify the light exponentially. The resulting beam is <strong>monochromatic</strong> (single wavelength),
              <strong> coherent</strong> (waves in phase), and <strong>collimated</strong> (parallel, minimal divergence).
            </p>
            <p>
              <strong>CO₂ laser</strong> (10,600 nm, far infrared): strongly absorbed by water → precise cutting and vaporisation.
              Used extensively in airway surgery. <strong>Nd:YAG</strong> (1,064 nm, near infrared): penetrates deeply into tissue,
              good for coagulation. Can be transmitted via fibreoptic. <strong>KTP</strong> (532 nm, green): frequency-doubled
              Nd:YAG, absorbed by haemoglobin, used for superficial vascular lesions and vocal cord surgery.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Fibreoptics & Total Internal Reflection</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Total internal reflection (TIR)</strong> occurs when light travelling from a medium of higher refractive index
              (n₁, core) to one of lower refractive index (n₂, cladding) strikes the interface at an angle greater than the
              <strong> critical angle</strong>: sin θc = n₂/n₁. All light is reflected back into the core with zero transmission loss.
            </p>
            <p>
              The <strong>numerical aperture (NA)</strong> of a fibre defines the cone of light it can accept: NA = √(n₁² − n₂²).
              A larger NA accepts more light but provides lower image resolution. Clinical fibreoptic bundles contain thousands of
              individual fibres, each 8–12 μm in diameter.
            </p>
            <p>
              <strong>Coherent bundles</strong> maintain the spatial arrangement of fibres from one end to the other, allowing image
              transmission (viewing channel of bronchoscope). <strong>Incoherent bundles</strong> have random fibre arrangement and
              transmit light only (illumination channel). Modern video bronchoscopes use a CCD chip at the tip instead of a coherent
              bundle, providing superior image quality.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Laser Safety in Anaesthesia</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Airway fire</strong> is the most feared complication of airway laser surgery. The CO₂ laser can ignite standard
              PVC or rubber endotracheal tubes. Prevention requires: laser-safe tubes (metal shaft, e.g., Laser-Flex), reducing FiO₂
              to ≤30%, avoiding N₂O (supports combustion), filling the cuff with saline (± methylene blue dye as a leak indicator),
              and protecting the cuff with wet pledgets.
            </p>
            <p>
              <strong>Eye protection</strong> is mandatory for all theatre personnel. The goggles must be specific to the laser
              wavelength in use (CO₂ goggles do not protect against Nd:YAG). The patient's eyes are taped shut and covered with wet
              gauze. Warning signs must be displayed on all theatre doors, and the laser should be key-operated with a designated
              laser safety officer.
            </p>
          </div>
        </div>

        <QuizSection questions={laserFibreopticsQuiz} />

      <ReferencesList topicId="lasers-fibreoptics" />

        <TopicCompletionToggle topicId="lasers-fibreoptics" topicTitle="Lasers & Fibreoptics" />
      </div>
    </SectionLayout>
  );
};

export default LaserFibreopticsTopic;
