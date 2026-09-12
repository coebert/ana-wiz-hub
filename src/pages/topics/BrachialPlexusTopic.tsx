import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const brachialPlexusFaqs: Array<[string, string]> = [
  ["What are the five sections of the brachial plexus from medial to lateral?", "Roots (C5–T1, between scalenus anterior and medius) → trunks (upper C5–6, middle C7, lower C8–T1, at the first rib) → divisions (anterior and posterior, behind the clavicle) → cords (lateral, medial, posterior, named relative to the axillary artery) → terminal branches (musculocutaneous, axillary, radial, median, ulnar). Mnemonic: \"Real Texans Drink Cold Beer\"."],
  ["Which block reliably anaesthetises C8/T1 dermatomes for hand surgery?", "Infraclavicular and axillary blocks reliably cover C8/T1 because they target cords or terminal branches. Interscalene block characteristically misses C8/T1 (ulnar sparing) because the lower trunk lies deep at the scalene level — making it unsuitable as a sole technique for hand surgery, though ideal for shoulder."],
  ["What is the risk profile of an interscalene block?", "~100% incidence of ipsilateral phrenic nerve palsy (avoid in severe respiratory disease), recurrent laryngeal nerve block (hoarseness), Horner's syndrome (cervical sympathetic involvement), and rare but catastrophic intra-arterial (vertebral artery) injection causing immediate seizures. Pneumothorax risk is low compared with supraclavicular block."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Cite } from "@/components/references/Cite";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { brachialPlexusQuestions } from "@/data/quizzes";
import BrachialPlexusDiagram from "@/components/diagrams/anatomy/BrachialPlexusDiagram";
import BrachialPlexusUltrasoundDiagram from "@/components/diagrams/anatomy/BrachialPlexusUltrasoundDiagram";
import CorPictumFolio from "@/components/diagrams/anatomy/CorPictumFolio";
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
          <li><strong>Check the contraindications.</strong> Interscalene causes 100% ipsilateral phrenic palsy → ~25% drop in FEV₁<Cite topicId="brachial-plexus" labels={["Urmey 1991"]} />. In severe COPD this may be unsafe.</li>
          <li><strong>Consider alternatives.</strong>
            <ul className="list-disc list-inside ml-5">
              <li>Low-volume (5–10 mL) ultrasound-guided interscalene reduces phrenic spread<Cite topicId="brachial-plexus" labels={["Riazi 2008", "Renes 2009"]} />.</li>
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
        workedExamples: [
          "BJA Educ 2014",
          "Ellis & Feldman Ch.8",
          "Urmey 1991",
          "Riazi 2008",
          "Renes 2009",
        ],
        keyPoints: [
          "Miller Ch.46",
          "BJA Educ 2014",
          "Ellis & Feldman Ch.8",
          "Urmey 1991",
          "Riazi 2008",
        ],
      }}
      keyPoints={[
        { text: "Brachial plexus arises from ventral rami C5–T1: Roots → Trunks → Divisions → Cords → Branches ('Robert Taylor Drinks Cold Beer')", cites: ["Miller Ch.46", "Ellis & Feldman Ch.8"] },
        { text: "Trunks: Superior (C5,6), Middle (C7), Inferior (C8,T1); suprascapular nerve leaves the superior trunk before the divisions form", cites: ["Ellis & Feldman Ch.8"] },
        { text: "Cords are named by their relation to the 2nd part of the axillary artery (lateral, posterior, medial) and split into the five terminal branches", cites: ["Miller Ch.46"] },
        { text: "Interscalene block (roots/trunks, C5–C7) — shoulder surgery; spares C8/T1 (ulnar) and causes ~100% ipsilateral phrenic nerve palsy", cites: ["BJA Educ 2014", "Ellis & Feldman Ch.8", "Urmey 1991"] },
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
                <p className="text-sm text-muted-foreground mt-1">Between anterior and middle scalene at C6 level. Targets C5–C7 (superior/middle trunks). Misses C8/T1 (ulnar sparing). Phrenic nerve palsy 100%<Cite topicId="brachial-plexus" labels={["Urmey 1991"]} />. Contralateral hand ventilation check essential.<Cite topicId="brachial-plexus" labels={["BJA Educ 2014", "Miller Ch.46"]} /></p>
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

          <ExamSection id="adjuvants" exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Regional Anaesthesia"]}>
            <CollapsibleSubsection title="Pharmacological Adjuvants for Brachial Plexus Block">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Adjuvants are added to prolong analgesia beyond the 8–14 h given by plain long-acting local anaesthetic, without the catheter burden. None is licensed for perineural use in the UK, so use is off-label and must be documented and preservative-free.<Cite topicId="brachial-plexus" labels={["BJA 2024 Dexamethasone ISB", "Miller Ch.46"]} />
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Adjuvant</th>
                    <th className="text-left py-2 text-foreground font-semibold">Dose</th>
                    <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                    <th className="text-left py-2 text-foreground font-semibold">Effect &amp; cautions</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Dexamethasone</td><td>4–8 mg perineural or IV</td><td>Local vasoconstriction, inhibition of ectopic C-fibre discharge, anti-inflammatory; some effect is systemic</td><td>Prolongs analgesia by 6–8 h. Perineural gives about 2 h more than the same IV dose, so IV is a reasonable and non-off-label alternative. Transient hyperglycaemia.<Cite topicId="brachial-plexus" labels={["BJA 2024 Dexamethasone ISB"]} /></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Dexmedetomidine</td><td>0.5–1 mcg/kg (typically 50–100 mcg)</td><td>α₂-adrenoceptor agonism; hyperpolarisation-activated cation current block in C and Aδ fibres</td><td>Prolongs block by ~3–5 h and speeds onset. Dose-dependent bradycardia, hypotension and sedation — avoid in heart block and unmonitored patients.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Clonidine</td><td>0.5–1 mcg/kg (max ~150 mcg)</td><td>α₂ agonism</td><td>Prolongs analgesia by ~2 h; weaker than dexmedetomidine. Sedation, hypotension, bradycardia; avoid in the elderly.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Buprenorphine</td><td>100–300 mcg</td><td>Partial µ agonist with local sodium-channel blocking action</td><td>Prolongs analgesia by ~8 h but causes nausea and vomiting in up to a third of patients; anti-emetic cover advised.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Adrenaline</td><td>1:200,000–1:400,000 (2.5–5 mcg/mL)</td><td>Vasoconstriction reducing systemic uptake</td><td>Marker of intravascular injection and reduces peak plasma concentration; modest prolongation. Avoid where perfusion is precarious or in patients with severe cardiovascular disease.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Sodium bicarbonate, midazolam, tramadol, ketamine and magnesium have all been described but evidence is weak or neurotoxicity is a concern; midazolam and ketamine should not be given perineurally. Liposomal bupivacaine offers prolonged release but its clinical superiority over adjuvant-supplemented plain bupivacaine is not established.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="injury-patterns" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Traction Injury Patterns: Erb's and Klumpke's">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Erb–Duchenne palsy (upper, C5–C6)</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Mechanism:</strong> forcible downward traction on the arm or lateral flexion of the neck away from the shoulder — shoulder dystocia at delivery, a fall onto the shoulder, motorcycle injury, or excessive arm abduction and head rotation under anaesthesia. <strong>Site:</strong> superior trunk, classically Erb's point where C5 and C6 unite. <strong>Motor loss:</strong> deltoid and supraspinatus (abduction), biceps and brachialis (elbow flexion), supinator, infraspinatus (lateral rotation). <strong>Posture:</strong> arm adducted and internally rotated, elbow extended, forearm pronated, wrist flexed — the "waiter's tip" deformity. <strong>Sensory:</strong> lateral arm and forearm (regimental badge and lateral cutaneous of forearm). <strong>Reflexes:</strong> biceps and supinator lost, triceps preserved. Hand function is intact.<Cite topicId="brachial-plexus" labels={["Ellis & Feldman Ch.8"]} /></p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Klumpke's palsy (lower, C8–T1)</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Mechanism:</strong> forcible upward traction on the abducted arm — breech delivery with the arm above the head, grabbing for a hold during a fall, apical lung tumour (Pancoast), cervical rib or thoracic outlet compression, and sternal retraction during cardiac surgery. <strong>Site:</strong> inferior trunk. <strong>Motor loss:</strong> intrinsic hand muscles (interossei, lumbricals, thenar and hypothenar), long finger flexors — producing a <strong>claw hand</strong> with metacarpophalangeal hyperextension and interphalangeal flexion. <strong>Sensory:</strong> medial forearm and hand (medial cutaneous nerves, ulnar territory). <strong>Associated Horner's syndrome</strong> (ptosis, miosis, anhidrosis, enophthalmos) if the T1 root is avulsed proximally, because the preganglionic sympathetic fibres to the stellate ganglion travel with T1 — its presence suggests a proximal, poor-prognosis root avulsion.<Cite topicId="brachial-plexus" labels={["Ellis & Feldman Ch.8", "Miller Ch.46"]} /></p>
              </div>
              <div className="p-4 rounded-lg border border-border sm:col-span-2">
                <p className="font-semibold text-foreground text-sm">Perioperative prevention and assessment</p>
                <p className="text-sm text-muted-foreground mt-1">Limit arm abduction to &lt; 90° on arm boards, avoid external rotation and posterior shoulder displacement, pad the elbow, avoid shoulder braces in steep Trendelenburg, and document neurological status before regional block. Distinguish a <strong>preganglionic root avulsion</strong> (Horner's, paraspinal muscle denervation, preserved sensory nerve action potentials on nerve conduction studies, pseudomeningocoele on MRI — poor prognosis, needs early nerve transfer) from a <strong>postganglionic rupture or neurapraxia</strong> (recoverable, often within 3 months). Serial examination, EMG at 3–4 weeks and MRI guide surgical referral.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="chronic-pain" exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Pain Medicine"]}>
            <CollapsibleSubsection title="Chronic Pain, CRPS and the Brachial Plexus">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The upper limb is the commonest site of <strong>complex regional pain syndrome (CRPS)</strong>, typically after distal radius fracture, carpal tunnel surgery or a minor crush injury. Diagnosis is clinical, using the <strong>Budapest criteria</strong>: continuing pain disproportionate to the inciting event, plus symptoms and confirmed signs in at least two of four categories — sensory (hyperalgesia, allodynia), vasomotor (temperature asymmetry, skin colour change), sudomotor/oedema (sweating change, swelling), and motor/trophic (weakness, tremor, dystonia, nail and hair change) — with no better explanation. CRPS type I has no identifiable nerve lesion; type II follows a definable nerve injury (causalgia).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Mechanisms</p>
                <p className="text-sm text-muted-foreground mt-1">Peripheral and central sensitisation, neurogenic inflammation with release of substance P and CGRP, altered sympathetic–afferent coupling and adrenoreceptor upregulation, microvascular dysfunction, glial activation and maladaptive cortical reorganisation of the somatosensory map. Disuse amplifies each mechanism.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Management</p>
                <p className="text-sm text-muted-foreground mt-1">Evidence for individual treatments is weak; systematic review evidence supports early multidisciplinary rehabilitation as the cornerstone, with graded motor imagery and mirror therapy, physiotherapy and desensitisation, and psychological therapy.<Cite topicId="brachial-plexus" labels={["Cochrane 2023 CRPS"]} /> Drugs: paracetamol and NSAIDs, gabapentinoids or amitriptyline/duloxetine for neuropathic pain, short courses of oral corticosteroid in the early inflammatory phase, bisphosphonates, and topical lidocaine or capsaicin. Opioids are of limited value.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Interventional options</p>
                <p className="text-sm text-muted-foreground mt-1">Stellate ganglion block or continuous brachial plexus catheter can provide a window for intensive physiotherapy in sympathetically maintained pain; benefit is often short-lived and evidence is low quality. Spinal cord and dorsal root ganglion stimulation are considered in refractory cases. Intravenous regional guanethidine is no longer recommended.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Other chronic upper-limb pain</p>
                <p className="text-sm text-muted-foreground mt-1">Post-amputation phantom and stump pain (pre-emptive plexus catheters may help acute but not chronic pain), post-traumatic plexus avulsion deafferentation pain (poorly opioid-responsive, may need dorsal root entry zone lesioning), persistent post-surgical pain after shoulder or breast surgery, thoracic outlet syndrome, and neuropathic pain after chemotherapy or radiotherapy plexopathy. Prevention rests on good acute pain control, early mobilisation and avoiding immobilisation in a splint for longer than necessary.</p>
              </div>
            </div>
            </CollapsibleSubsection>
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
          <TopicFaqs faqs={brachialPlexusFaqs} />
        </>
      }
    />
  );
};

export default BrachialPlexusTopic;
