import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { brachialPlexusQuestions } from "@/data/quizzes";
import BrachialPlexusDiagram from "@/components/diagrams/BrachialPlexusDiagram";

const BrachialPlexusTopic = () => {
  return (
    <SectionLayout title="Brachial Plexus" subtitle="FRCA — Applied Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy">
      <BrachialPlexusDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Organisation: Roots → Trunks → Divisions → Cords → Branches</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Formed by ventral rami of C5–T1. Mnemonic: "Robert Taylor Drinks Cold Beer" (Roots, Trunks, Divisions, Cords, Branches).
          </p>
          <div className="space-y-2">
            {[
              { level: "Roots (C5–T1)", detail: "Emerge between anterior and middle scalene muscles. Long thoracic nerve (C5,6,7) — serratus anterior. Dorsal scapular nerve (C5)." },
              { level: "Trunks", detail: "Superior (C5,6), Middle (C7), Inferior (C8,T1). Suprascapular nerve arises from superior trunk — shoulder abduction and lateral rotation." },
              { level: "Divisions", detail: "Each trunk divides into anterior and posterior divisions behind the clavicle. Anterior divisions supply flexor compartments; posterior supply extensors." },
              { level: "Cords", detail: "Named by relation to 2nd part of axillary artery. Lateral (C5,6,7), Posterior (C5–T1), Medial (C8,T1)." },
              { level: "Terminal Branches", detail: "Lateral cord → musculocutaneous + lateral contribution to median. Medial cord → ulnar + medial contribution to median. Posterior cord → axillary + radial." },
            ].map((l) => (
              <div key={l.level} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Block Approaches & Anatomy</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Interscalene (Roots/Trunks)</p>
              <p className="text-sm text-muted-foreground mt-1">Between anterior and middle scalene at C6 level. Targets C5–C7 (superior/middle trunks). Misses C8/T1 (ulnar sparing). Phrenic nerve palsy 100%. Contralateral hand ventilation check essential.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Supraclavicular (Trunks/Divisions)</p>
              <p className="text-sm text-muted-foreground mt-1">Trunks and divisions most compact here ("3 grapes on a stalk" appearance on US above subclavian artery). Complete arm block. Pneumothorax risk (minimal with US).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Infraclavicular (Cords)</p>
              <p className="text-sm text-muted-foreground mt-1">Cords surround 2nd part of axillary artery beneath pectoralis muscles. Good for catheter placement — skin puncture away from neck. Targets all cords.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Axillary (Branches)</p>
              <p className="text-sm text-muted-foreground mt-1">Terminal branches around 3rd part of axillary artery. Musculocutaneous already left (separate block in coracobrachialis). Safest approach — no pneumothorax risk.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Terminal Nerves</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Nerve</th>
                  <th className="text-left py-2 text-foreground font-semibold">Roots</th>
                  <th className="text-left py-2 text-foreground font-semibold">Motor</th>
                  <th className="text-left py-2 text-foreground font-semibold">Sensory</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Musculocutaneous</td><td>C5,6,7</td><td>Biceps, brachialis, coracobrachialis</td><td>Lateral cutaneous of forearm</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Median</td><td>C5–T1</td><td>Forearm flexors (most), thenar muscles, lateral 2 lumbricals</td><td>Lateral 3½ digits (palmar)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ulnar</td><td>C8,T1</td><td>Intrinsic hand muscles (most), FCU, FDP (medial)</td><td>Medial 1½ digits</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Radial</td><td>C5–T1</td><td>Extensors of arm and forearm, triceps, supinator</td><td>Posterior arm/forearm, dorsal 3½ digits</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Axillary</td><td>C5,6</td><td>Deltoid, teres minor</td><td>Regimental badge area</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Brachial plexus: C5-T1. 'Robert Taylor Drinks Cold Beer' — Roots, Trunks, Divisions, Cords, Branches",
        "Interscalene block targets C5-7 (shoulder surgery) — 100% ipsilateral phrenic nerve palsy",
        "Supraclavicular: trunks most compact — best for complete arm anaesthesia below shoulder",
        "Cords named by relation to 2nd part of axillary artery (lateral, posterior, medial)",
        "Musculocutaneous nerve leaves early — must be blocked separately with axillary approach",
      ]} />

      <QuizSection questions={brachialPlexusQuestions} />
      <TopicCompletionToggle topicId="brachial-plexus" topicTitle="Brachial Plexus" />
    </SectionLayout>
  );
};

export default BrachialPlexusTopic;
