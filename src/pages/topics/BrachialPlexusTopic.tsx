import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { Cite } from "@/components/Cite";
import { WorkedExample } from "@/components/WorkedExamples";
import { brachialPlexusQuestions } from "@/data/quizzes";
import BrachialPlexusDiagram from "@/components/diagrams/BrachialPlexusDiagram";
import BrachialPlexusUltrasoundDiagram from "@/components/diagrams/BrachialPlexusUltrasoundDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { brachialFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Recall the brachial plexus organisation: roots → trunks → divisions → cords → branches (C5–T1)",
  "Match each block approach (interscalene, supraclavicular, infraclavicular, axillary) to the appropriate surgery",
  "Predict the dermatomes/myotomes spared by each approach (e.g. ulnar sparing with interscalene)",
  "List the major complications of each block and how to mitigate them (phrenic palsy, pneumothorax, LAST)",
  "Recognise key sonographic landmarks (interscalene 'traffic-light', supraclavicular 'grapes on a stalk', axillary nerves)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing a brachial plexus block for shoulder arthroscopy",
    scenario:
      "A 55-year-old man with COPD (FEV₁ 1.4 L) is having an elective shoulder arthroscopy for rotator cuff repair. The surgeon requests a regional block. Which approach do you choose and why?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Match anatomy to surgery.</strong> Shoulder skin and capsule = C5–C6 (suprascapular and axillary nerves). Standard answer = interscalene block.</li>
          <li><strong>Check the contraindications.</strong> Interscalene causes 100% ipsilateral phrenic palsy → ~25% drop in FEV₁. In severe COPD this may be unsafe.</li>
          <li><strong>Consider alternatives.</strong>
            <ul className="list-disc list-inside ml-5">
              <li>Low-volume (5–10 mL) ultrasound-guided interscalene reduces phrenic spread.</li>
              <li>Combined suprascapular + axillary nerve block ('shoulder block') — phrenic-sparing, covers most of the joint.</li>
              <li>Costoclavicular / supraclavicular approach — high diaphragmatic palsy rate, not better.</li>
              <li>GA + intra-articular LA + multimodal as fallback.</li>
            </ul>
          </li>
          <li><strong>Decide.</strong> Combined suprascapular + axillary nerve block is the safest analgesic option here.</li>
          <li><strong>Counsel and document.</strong> Discuss phrenic risk, hoarseness (recurrent laryngeal), Horner's syndrome (sympathetic chain) for any plexus block.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Performing bilateral interscalene blocks — never. One ipsilateral phrenic palsy is the max.</li>
            <li>Assuming ultrasound abolishes phrenic palsy — it reduces but does not eliminate it.</li>
            <li>Using high-volume LA in COPD just to 'be sure' — bigger phrenic effect for no analgesic gain.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Avoid a standard interscalene block in this severe COPD patient. Use a combined suprascapular + axillary nerve block (phrenic-sparing) for analgesia, with GA and multimodal cover. Document the discussion of risks (phrenic palsy, Horner's, recurrent laryngeal nerve).",
   cites: ["BJA Educ 2014"],
  },
  {
    title: "Patchy axillary block — which nerve is missed?",
    scenario:
      "After an ultrasound-guided axillary block for forearm surgery, the patient has good ulnar and median sensory loss but the lateral forearm and biceps remain functional. Which nerve has been missed and why?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Identify the spared territory.</strong> Lateral forearm (sensory) and biceps (motor) = <strong>musculocutaneous nerve</strong> distribution.</li>
          <li><strong>Recall the anatomy.</strong> The musculocutaneous nerve leaves the lateral cord <strong>proximal to the axilla</strong>, then runs <strong>within coracobrachialis</strong>, separate from the perivascular sheath.</li>
          <li><strong>Why it's missed.</strong> The axillary approach deposits LA around the artery (median, ulnar, radial). Musculocutaneous has already left this sheath.</li>
          <li><strong>Rescue technique.</strong> Find coracobrachialis on ultrasound; the musculocutaneous nerve appears as a flat hyperechoic structure between coracobrachialis and biceps. Inject 5–8 mL of LA around it.</li>
          <li><strong>Don't forget the intercostobrachial nerve.</strong> T2 supplies the medial upper arm and is NOT part of the brachial plexus → block separately if a tourniquet is used.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Quick reminder</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Axillary approach: targets terminal branches around the 3rd part of the axillary artery (median lateral, ulnar medial, radial posterior).</li>
          <li>Musculocutaneous + intercostobrachial almost always need separate top-ups.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Calling the block 'patchy' and converting to GA without identifying the specific gap.</li>
            <li>Forgetting tourniquet pain → intercostobrachial top-up.</li>
            <li>Exceeding the maximum LA dose by adding multiple top-ups — keep a running total.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "The musculocutaneous nerve has been missed because it leaves the lateral cord proximal to the axillary sheath. Rescue with an ultrasound-guided 5–8 mL injection between coracobrachialis and biceps. Add an intercostobrachial block separately if a tourniquet is in use.",
   cites: ["Ellis & Feldman Ch.8"],
  },
];

const BrachialPlexusTopic = () => {
  return (
    <TopicTemplate
      title="Brachial Plexus"
      subtitle="Applied anatomy, block approaches, and complications"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="brachial-plexus"
      topicTitle="Brachial Plexus"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={brachialPlexusQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Anatomy", "RCoA Final — Regional Anaesthesia"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Ellis & Feldman Ch.8",
          "Miller Ch.46",
          "BJA Educ 2014",
        ],
        diagrams: [
          "Ellis & Feldman Ch.8",
          "BJA Educ 2014",
          "Miller Ch.46",
        ],
        workedExamples: [
          "BJA Educ 2014",
          "Ellis & Feldman Ch.8",
        ],
        keyPoints: [
          "Miller Ch.46",
          "BJA Educ 2014",
          "Ellis & Feldman Ch.8",
        ],
      }}
      keyPoints={[
        { text: "Brachial plexus arises from ventral rami C5–T1: Roots → Trunks → Divisions → Cords → Branches ('Robert Taylor Drinks Cold Beer')", cites: ["Miller Ch.46", "Ellis & Feldman Ch.8"] },
        { text: "Trunks: Superior (C5,6), Middle (C7), Inferior (C8,T1); suprascapular nerve leaves the superior trunk before the divisions form", cites: ["Ellis & Feldman Ch.8"] },
        { text: "Cords are named by their relation to the 2nd part of the axillary artery (lateral, posterior, medial) and split into the five terminal branches", cites: ["Miller Ch.46"] },
        { text: "Interscalene block (roots/trunks, C5–C7) — shoulder surgery; spares C8/T1 (ulnar) and causes ~100% ipsilateral phrenic nerve palsy", cites: ["BJA Educ 2014", "Ellis & Feldman Ch.8"] },
        { text: "Supraclavicular block (trunks/divisions) — trunks most compact ('grapes on a stalk' above subclavian artery); best for complete arm anaesthesia below the shoulder, watch for pneumothorax", cites: ["BJA Educ 2014"] },
        { text: "Infraclavicular block (cords) — deep to pectoralis around 2nd part of axillary artery; reliable single-injection block and the preferred site for catheters", cites: ["Miller Ch.46"] },
        { text: "Axillary block (terminal branches around 3rd part of axillary artery) — safest approach (no pneumothorax, no phrenic risk); ideal for forearm/hand surgery", cites: ["Ellis & Feldman Ch.8", "Miller Ch.46"] },
        { text: "Musculocutaneous nerve leaves the lateral cord proximal to the axilla and runs in coracobrachialis — must be blocked separately with the axillary approach", cites: ["Ellis & Feldman Ch.8"] },
        { text: "Intercostobrachial nerve (T2) is NOT part of the brachial plexus — supplies medial upper arm and must be blocked separately when a tourniquet is used", cites: ["BJA Educ 2014"] },
        { text: "Key complications: LAST (use lowest effective dose, aspirate, incremental injection), phrenic palsy, Horner's syndrome, recurrent laryngeal nerve palsy, pneumothorax (supraclavicular/infraclavicular)", cites: ["BJA Educ 2014", "Miller Ch.46"] },
        { text: "Ultrasound landmarks: interscalene 'traffic-light' between scalenes at C6; supraclavicular 'grapes on a stalk' lateral to subclavian artery on 1st rib; axillary nerves clustered around the artery with musculocutaneous in coracobrachialis", cites: ["BJA Educ 2014"] },
        { text: "Terminal branches at a glance: musculocutaneous (C5–7, lateral forearm), median (C5–T1, lateral 3½ digits palmar), ulnar (C8/T1, medial 1½ digits), radial (C5–T1, posterior arm + dorsal 3½ digits), axillary (C5,6, regimental badge)", cites: ["Ellis & Feldman Ch.8", "Miller Ch.46"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="organisation" exams={[Exam.PRIMARY]} curriculumCodes={["RCoA Primary — Anatomy"]}>
            <CollapsibleSubsection title="Organisation: Roots → Trunks → Divisions → Cords → Branches" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Formed by ventral rami of C5–T1. Mnemonic: "Robert Taylor Drinks Cold Beer" (Roots, Trunks, Divisions, Cords, Branches).<Cite topicId="brachial-plexus" labels={["Ellis & Feldman Ch.8", "Miller Ch.46"]} />
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CorPictumFolio {...brachialFolio} suppressOverlayLabels />
            <p className="text-xs text-muted-foreground italic mt-2">
              Plexus organisation adapted from standard anatomical descriptions.<Cite topicId="brachial-plexus" labels={["Ellis & Feldman Ch.8", "Miller Ch.46"]} />
            </p>
            <div className="mt-6">
              <BrachialPlexusDiagram />
              <p className="text-xs text-muted-foreground italic mt-2">
                Schematic of roots → trunks → divisions → cords → branches and the four block approach levels.<Cite topicId="brachial-plexus" labels={["BJA Educ 2014", "Miller Ch.46"]} />
              </p>
            </div>
          </ExamSection>

          <ExamSection id="approaches" exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Regional Anaesthesia"]}>
            <CollapsibleSubsection title="Block Approaches & Anatomy">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Interscalene (Roots/Trunks)</p>
                <p className="text-sm text-muted-foreground mt-1">Between anterior and middle scalene at C6 level. Targets C5–C7 (superior/middle trunks). Misses C8/T1 (ulnar sparing). Phrenic nerve palsy 100%. Contralateral hand ventilation check essential.<Cite topicId="brachial-plexus" labels={["BJA Educ 2014", "Miller Ch.46"]} /></p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Supraclavicular (Trunks/Divisions)</p>
                <p className="text-sm text-muted-foreground mt-1">Trunks and divisions most compact here ("3 grapes on a stalk" appearance on US above subclavian artery). Complete arm block. Pneumothorax risk (minimal with US).<Cite topicId="brachial-plexus" labels={["BJA Educ 2014"]} /></p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Infraclavicular (Cords)</p>
                <p className="text-sm text-muted-foreground mt-1">Cords surround 2nd part of axillary artery beneath pectoralis muscles. Good for catheter placement — skin puncture away from neck. Targets all cords.<Cite topicId="brachial-plexus" labels={["Miller Ch.46"]} /></p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Axillary (Branches)</p>
                <p className="text-sm text-muted-foreground mt-1">Terminal branches around 3rd part of axillary artery. Musculocutaneous already left (separate block in coracobrachialis). Safest approach — no pneumothorax risk.<Cite topicId="brachial-plexus" labels={["Ellis & Feldman Ch.8", "Miller Ch.46"]} /></p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ultrasound" exams={[Exam.FINAL]}>
            <BrachialPlexusUltrasoundDiagram />
            <p className="text-xs text-muted-foreground italic mt-2">
              Sonographic landmarks (interscalene "traffic-light", supraclavicular "grapes on a stalk", axillary perivascular nerves) follow standard ultrasound anatomy references.<Cite topicId="brachial-plexus" labels={["BJA Educ 2014"]} />
            </p>
          </ExamSection>

          <ExamSection id="terminal-nerves" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Key Terminal Nerves">
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
              <p className="text-xs text-muted-foreground italic mt-3">
                Motor/sensory distributions per standard anatomy and regional anaesthesia references.<Cite topicId="brachial-plexus" labels={["Ellis & Feldman Ch.8", "Miller Ch.46"]} />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
        </>
      }
    />
  );
};

export default BrachialPlexusTopic;
