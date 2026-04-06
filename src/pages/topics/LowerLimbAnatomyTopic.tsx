import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { lowerLimbAnatomyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const LowerLimbAnatomyTopic = () => {
  return (
    <SectionLayout title="Lower Limb & Lumbosacral Plexus" subtitle="FRCA Primary & Final — Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lumbar Plexus (L1-L4)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Formed within psoas major from anterior rami of L1-L4. Main branches:</p>
          <div className="space-y-3">
            {[
              { nerve: "Femoral nerve (L2-L4)", desc: "Passes under inguinal ligament lateral to femoral artery (VAN: vein-artery-nerve). Motor: quadriceps (knee extension), sartorius. Sensory: anterior thigh, medial leg (saphenous branch). Block: below inguinal ligament lateral to artery, or fascia iliaca block." },
              { nerve: "Obturator nerve (L2-L4)", desc: "Through obturator foramen. Motor: adductors of thigh. Sensory: medial thigh (variable). Relevant for hip/knee surgery. Can cause incomplete block with femoral nerve block alone." },
              { nerve: "Lateral cutaneous nerve of thigh (L2-L3)", desc: "Passes under/through inguinal ligament near ASIS. Pure sensory: lateral thigh. Meralgia paraesthetica = entrapment neuropathy." },
              { nerve: "Iliohypogastric/Ilioinguinal (L1)", desc: "Relevant for inguinal hernia surgery. TAP/ilioinguinal block provides analgesia for lower abdominal incisions." },
            ].map(n => (
              <div key={n.nerve} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{n.nerve}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sacral Plexus (L4-S3)</h2>
          <div className="space-y-3">
            {[
              { nerve: "Sciatic nerve (L4-S3)", desc: "Largest nerve in the body. Exits pelvis through greater sciatic foramen below piriformis. Two components: tibial (medial, anterior divisions) and common peroneal (lateral, posterior divisions). Divides in popliteal fossa (variable). Block: subgluteal, anterior, popliteal approaches." },
              { nerve: "Tibial nerve", desc: "Motor: posterior compartment (gastrocnemius, soleus — plantarflexion), deep muscles of foot. Sensory: sole of foot (medial/lateral plantar nerves). Passes behind medial malleolus." },
              { nerve: "Common peroneal nerve", desc: "Wraps around fibular neck (vulnerable to compression). Motor: anterior compartment (dorsiflexion — deep peroneal), lateral compartment (eversion — superficial peroneal). Sensory: lateral leg and dorsum of foot. Foot drop from compression." },
              { nerve: "Posterior cutaneous nerve of thigh (S1-S3)", desc: "Sensory: posterior thigh. Not blocked by sciatic nerve block — need separate block or proximal approach." },
            ].map(n => (
              <div key={n.nerve} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{n.nerve}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Blocks for Lower Limb</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Block</th>
                <th className="text-left py-2 text-foreground font-semibold">Nerves</th>
                <th className="text-left py-2 text-foreground font-semibold">Indications</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fascia iliaca</td><td>Femoral, obturator, LCNT</td><td>Hip fracture analgesia (#NOF), hip/knee surgery</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Femoral nerve block</td><td>Femoral</td><td>Knee surgery, femoral shaft fracture</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adductor canal</td><td>Saphenous + nerve to vastus medialis</td><td>Knee arthroplasty — motor-sparing (preserves quadriceps)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Popliteal sciatic</td><td>Tibial + common peroneal</td><td>Below-knee surgery, ankle/foot</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Ankle block</td><td>5 nerves at ankle</td><td>Foot surgery. Tibial, deep peroneal, superficial peroneal, sural, saphenous</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Femoral nerve (L2-L4): lateral to femoral artery under inguinal ligament. Motor: quadriceps. Sensory: anterior thigh + medial leg (saphenous)",
        "Sciatic nerve (L4-S3): largest nerve. Two components — tibial (plantarflexion) and common peroneal (dorsiflexion)",
        "Common peroneal nerve wraps around fibular neck — vulnerable to compression → foot drop",
        "Fascia iliaca block covers femoral + obturator + LCNT — excellent for hip fracture analgesia",
        "Adductor canal block: motor-sparing alternative to femoral nerve block for knee surgery",
        "Ankle block: 5 nerves — tibial (behind medial malleolus), deep/superficial peroneal, sural, saphenous",
      ]} />
      <QuizSection questions={lowerLimbAnatomyQuestions} />
      <ReferencesList topicId="lower-limb-anatomy" />
      <TopicCompletionToggle topicId="lower-limb-anatomy" topicTitle="Lower Limb &amp; Lumbosacral Plexus" />
    </SectionLayout>
  );
};

export default LowerLimbAnatomyTopic;
