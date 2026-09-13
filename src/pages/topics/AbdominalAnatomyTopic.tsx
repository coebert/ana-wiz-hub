import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { InlineRef } from "@/components/references/InlineRef";

const abdominalAnatomyFaqs: Array<[string, string]> = [
  ["Where do the major neurovascular bundles for a TAP block lie?", "The transversus abdominis plane lies between the internal oblique and transversus abdominis muscles. It contains the T7–L1 anterior rami (intercostal, subcostal, iliohypogastric, ilioinguinal) that supply the anterior abdominal wall. A subcostal TAP covers T7–T9; a lateral TAP covers T10–T12 (umbilical territory); an ilioinguinal block targets L1."],
  ["Which landmarks define the inguinal canal?", "The canal runs from the deep ring (mid-point of the inguinal ligament, lateral to inferior epigastric artery) to the superficial ring (superolateral to pubic tubercle). Floor: inguinal ligament; roof: arching fibres of internal oblique and transversus; anterior wall: external oblique aponeurosis; posterior wall: transversalis fascia and conjoint tendon medially."],
  ["Why is the spleen at risk from left-sided rib fractures?", "The spleen lies under the 9th–11th left ribs in the left hypochondrium, behind the mid-axillary line. Left lower rib fractures (especially 9–11) are the commonest mechanism of blunt splenic injury — a high-energy mechanism with left flank tenderness mandates contrast CT to exclude haemorrhage from this highly vascular organ (~5% of cardiac output)."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { abdominalAnatomyQuestions } from "@/data/quizzes";
import AbdominalWallDiagram from "@/components/diagrams/anatomy/AbdominalWallDiagram";
import CorPictumFolio from "@/components/diagrams/anatomy/CorPictumFolio";
import { abdominalFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const AbdominalAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Abdominal & Pelvic Anatomy"
      subtitle="FRCA — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="abdominal-anatomy"
      quizQuestions={abdominalAnatomyQuestions}
      objectives={[
        "Describe the layered anatomy of the anterior abdominal wall and identify the TAP plane.",
        "Recall inguinal canal boundaries and the nerves targeted in hernia repair blocks.",
        "Outline the anaesthetic relevance of liver, kidneys, spleen, stomach and duodenum.",
        "Map pelvic autonomic and sacral plexus anatomy onto regional techniques.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["AN_BK_03"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Ellis & Feldman Ch.4", "Miller Ch.47"],
        workedExamples: ["BJA Educ 2015", "Miller Ch.47"],
        keyPoints: ["BJA Educ 2018 (Abdominal wall blocks)", "Ellis & Feldman Ch.4", "BJA Educ 2015", "Miller Ch.47", "Chin RAPM 2017", "HerniaSurge 2018", "Gray's Anatomy 42e"],
      }}
      coreConcepts={
        <>
          <span id="anterior-abdominal-wall-layers" aria-hidden="true" />
          <span id="key-abdominal-organs-anaesthetic-relevance" aria-hidden="true" />
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Anterior Abdominal Wall Layers" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Understanding the abdominal wall layers is essential for TAP blocks, rectus sheath blocks, and laparoscopic port placement.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <AbdominalWallDiagram />
            </div>
            <div className="space-y-1.5 mt-2">
              {[
                "Skin → Camper's fascia (fatty) → Scarpa's fascia (membranous)",
                "External oblique (fibres run downward and medially — 'hands in pockets')",
                "Internal oblique (fibres run upward and medially)",
                "Transversus abdominis — TAP plane lies between internal oblique and transversus",
                "Transversalis fascia → extraperitoneal fat → parietal peritoneum",
              ].map((layer, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded border border-border">
                  <span className="text-xs font-bold text-primary w-5 text-center">{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{layer}</span>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Rectus Sheath and the Rectus Sheath Block">
            <span id="rectus-sheath" aria-hidden="true" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The rectus sheath is formed by the aponeuroses of the three flat muscles splitting around rectus abdominis. <strong>Above the arcuate line</strong> (roughly midway between umbilicus and pubic crest): the external oblique aponeurosis and the anterior lamina of the internal oblique aponeurosis pass in front of the muscle, while the posterior lamina of internal oblique plus transversus aponeurosis pass behind it, so there is a complete posterior sheath. <strong>Below the arcuate line</strong> all three aponeuroses pass anteriorly, leaving only transversalis fascia and peritoneum behind the muscle — the reason low injections risk peritoneal puncture <InlineRef topicId="abdominal-anatomy" refLabel="Chin RAPM 2017" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Contents and landmarks</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Rectus abdominis, with tendinous intersections adherent to the <em>anterior</em> sheath only (so injectate spreads longitudinally in the posterior compartment, not across the midline).</li>
                  <li>Superior epigastric artery (from internal thoracic) anastomosing with the inferior epigastric artery (from external iliac) on the deep surface of the muscle — the structure at risk on needling and at port placement.</li>
                  <li>Terminal branches of the T7–T11 anterior rami entering laterally to supply the muscle and overlying skin, including the periumbilical T10 dermatome.</li>
                  <li>Linea alba in the midline; linea semilunaris at the lateral border — the ultrasound reference for probe placement.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Block technique and relevance</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>Target:</strong> between the deep surface of rectus abdominis and the posterior rectus sheath, in-plane, lateral-to-medial, at the level of the umbilicus.</li>
                  <li><strong>Indications:</strong> midline incisions — laparotomy, umbilical/epigastric hernia, laparoscopic midline ports, paediatric pyloromyotomy; useful when neuraxial analgesia is contraindicated.</li>
                  <li><strong>Coverage:</strong> somatic midline wall pain only, bilateral injections required; no visceral cover, so combine with multimodal analgesia.</li>
                  <li><strong>Dose:</strong> typically 10–20 ml of 0.25% levobupivacaine per side in an adult; count towards the total local-anaesthetic maximum (levobupivacaine ≈ 2 mg/kg) because these are high-volume fascial plane injections with rapid systemic absorption <InlineRef topicId="abdominal-anatomy" refLabel="BJA Educ 2018 (Abdominal wall blocks)" />.</li>
                  <li><strong>Complications:</strong> peritoneal or bowel puncture (worse below the arcuate line), epigastric vessel injury and rectus sheath haematoma (higher risk if anticoagulated), and LAST.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Inguinal Canal">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              An oblique passage roughly <strong>4 cm</strong> long running downwards and medially in the lower anterior abdominal wall, parallel to and above the medial half of the inguinal ligament. It runs from the <strong>deep (internal) ring</strong> — a defect in transversalis fascia at the mid-point of the inguinal ligament, immediately <em>lateral</em> to the inferior epigastric artery — to the <strong>superficial (external) ring</strong>, a triangular defect in the external oblique aponeurosis superolateral to the pubic tubercle <InlineRef topicId="abdominal-anatomy" refLabel="Gray's Anatomy 42e" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Boundaries</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>Anterior wall:</strong> external oblique aponeurosis throughout; reinforced laterally by internal oblique fibres.</li>
                  <li><strong>Posterior wall:</strong> transversalis fascia throughout; reinforced medially by the conjoint tendon (internal oblique + transversus).</li>
                  <li><strong>Roof:</strong> arching fibres of internal oblique and transversus abdominis.</li>
                  <li><strong>Floor:</strong> in-rolled inferior edge of the inguinal ligament, with the lacunar ligament medially.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Contents</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>Male:</strong> spermatic cord — vas deferens, testicular/cremasteric/vas arteries, pampiniform plexus, lymphatics, sympathetic fibres, genital branch of genitofemoral nerve, processus vaginalis remnant, within internal spermatic, cremasteric and external spermatic fascial layers.</li>
                  <li><strong>Female:</strong> round ligament of the uterus with the artery of the round ligament.</li>
                  <li><strong>Both:</strong> ilioinguinal nerve, which enters through the side wall rather than the deep ring and leaves via the superficial ring.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Hernias and surgical anatomy</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>Indirect</strong> (commonest, often congenital): enters the deep ring <em>lateral</em> to the inferior epigastric vessels and follows the cord — may reach the scrotum.</li>
                  <li><strong>Direct</strong> (acquired, wall weakness): pushes through Hesselbach's triangle <em>medial</em> to the inferior epigastric vessels — bounded by inguinal ligament, rectus sheath edge and the vessels.</li>
                  <li><strong>Femoral</strong> hernia lies below and lateral to the pubic tubercle and has a high strangulation risk — the key differential before listing as an elective inguinal repair.</li>
                  <li>Laparoscopic repair addresses the whole myopectineal orifice, which is why it needs general anaesthesia with pneumoperitoneum, whereas open mesh repair can be done under regional or local infiltration <InlineRef topicId="abdominal-anatomy" refLabel="HerniaSurge 2018" />.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Nerve Blocks for Hernia Repair</p>
                <p className="text-sm text-muted-foreground mt-1">Ilioinguinal nerve (L1) &amp; Iliohypogastric nerve (L1): both run in the TAP plane between internal oblique and transversus abdominis just medial and inferior to the anterior superior iliac spine — the target plane for inguinal-region blocks. The iliohypogastric nerve subsequently pierces the internal oblique to become more superficial. Genitofemoral nerve (L1–L2): the genital branch enters the canal via the deep ring and is <em>not</em> reliably covered, so cord traction still hurts — supplement with surgical infiltration or a deeper plane. Excess volume tracking to the femoral nerve causes transient quadriceps weakness and delayed day-case discharge.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Key Abdominal Organs — Anaesthetic Relevance">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <CorPictumFolio {...abdominalFolio} suppressOverlayLabels />
            </div>
            <div className="space-y-2">
              {[
                { organ: "Liver", detail: "Right upper quadrant, spanning ribs 7–11, largely under the diaphragm. Receives ~25% of cardiac output (≈70–75% portal vein, 25–30% hepatic artery) via a dual supply with hepatic arterial buffer response. Volatile agents and positive-pressure ventilation reduce total hepatic blood flow; portal triad structures (portal vein, hepatic artery, bile duct) lie in the free edge of the lesser omentum and are compressed in the Pringle manoeuvre. Couinaud's 8 segments guide resection; the three hepatic veins drain directly into the IVC, so mobilisation and low-CVP anaesthesia raise the risk of venous air entrainment and bleeding." },
                { organ: "Kidneys & ureters", detail: "Retroperitoneal, T12–L3, right sitting ~1.5 cm lower because of the liver; hila at L1 with vein anterior, artery, then pelvis posteriorly. Receive 20–25% of cardiac output with autoregulation over MAP ~80–180 mmHg. Posterior relations (diaphragm, 12th rib, quadratus lumborum, psoas) explain pleural puncture during percutaneous nephrolithotomy and the loin position's respiratory effects. Ureters cross the pelvic brim at the bifurcation of the common iliac artery and run under the uterine artery — the classic site of surgical injury." },
                { organ: "Spleen", detail: "Left hypochondrium under ribs 9–11 behind the mid-axillary line, ~5% of cardiac output through the splenic artery from the coeliac trunk, with the tail of the pancreas at the hilum. Friable capsule — left lower rib fractures and over-vigorous retraction cause major haemorrhage. Post-splenectomy: lifelong pneumococcal, meningococcal and Hib vaccination plus prophylactic penicillin, and a reactive thrombocytosis." },
                { organ: "Stomach, oesophagus & duodenum", detail: "Cardia at T11 with the gastro-oesophageal junction protected by the lower oesophageal sphincter and the diaphragmatic crura; sliding hiatus hernia and raised intra-abdominal pressure defeat the barrier pressure and drive aspiration risk. Sympathetic supply T5–T9 via greater splanchnic nerves, parasympathetic via anterior and posterior vagal trunks (vagal stimulation from traction causes bradycardia). Duodenum is retroperitoneal from D2 onwards and crosses the pancreas; the duodenojejunal flexure is fixed at the ligament of Treitz." },
                { organ: "Pancreas", detail: "Retroperitoneal at L1–L2, head in the duodenal C-loop with the bile duct behind it, neck over the superior mesenteric vessels, tail to the splenic hilum. Severe pancreatitis produces retroperitoneal fluid sequestration, intra-abdominal hypertension and ARDS. Referred epigastric-to-back pain travels with coeliac plexus fibres — the anatomical basis of coeliac plexus neurolysis for pancreatic cancer pain." },
                { organ: "Adrenal glands", detail: "Retroperitoneal, superomedial to each kidney; short right adrenal vein drains directly into the IVC (hazardous in adrenalectomy), left into the left renal vein. Cortical zones give mineralocorticoid, glucocorticoid and androgen output; medulla is a sympathetic ganglion secreting catecholamines. Phaeochromocytoma requires α-blockade before β-blockade, and tumour handling causes hypertensive surges followed by hypotension once venous drainage is ligated." },
                { organ: "Aorta, IVC & coeliac plexus", detail: "Aorta enters at T12 and bifurcates at L4; coeliac trunk T12, superior mesenteric artery L1, renal arteries L1–L2, inferior mesenteric artery L3. IVC pierces the diaphragm at T8 and is compressed by the gravid uterus supine (aortocaval compression → left lateral tilt). The coeliac plexus lies antero-lateral to the aorta at T12–L1 around the coeliac trunk, receiving greater (T5–T9), lesser (T10–T11) and least (T12) splanchnic nerves; block causes unopposed parasympathetic activity — hypotension and diarrhoea." },
                { organ: "Peritoneum & omenta", detail: "Parietal peritoneum is somatically innervated (sharp, localised pain; guarding), visceral peritoneum only autonomically (dull, referred, poorly localised). Large surface area explains rapid absorption of insufflated CO₂ and of intraperitoneal local anaesthetic, plus massive third-space losses in peritonitis. The greater sac and lesser sac communicate through the epiploic foramen; subphrenic and pelvic recesses are the dependent sites for collections." },
              ].map((o) => (
                <div key={o.organ} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{o.organ}</p>
                  <p className="text-sm text-muted-foreground mt-1">{o.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Organ relations, vertebral levels and autonomic supply as described in standard anatomical and anaesthetic texts <InlineRef topicId="abdominal-anatomy" refLabel="Gray's Anatomy 42e" /> <InlineRef topicId="abdominal-anatomy" refLabel="Ellis & Feldman Ch.4" />.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Coeliac Plexus & Coeliac Plexus Block">
            <span id="coeliac-plexus" aria-hidden="true" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The coeliac plexus is the largest autonomic plexus in the body: a dense retroperitoneal network of fibres and ganglia lying antero-lateral to the aorta at the <strong>T12–L1</strong> level, anterior to the diaphragmatic crura, surrounding the coeliac trunk and the root of the superior mesenteric artery. It provides the principal sensory and autonomic innervation of the upper abdominal viscera and is the target for neurolysis in intractable upper abdominal cancer pain <InlineRef topicId="abdominal-anatomy" refLabel="Gray's Anatomy 42e" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Components</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>Pre-ganglionic sympathetic</strong> fibres from the greater (T5–T9), lesser (T10–T11) and least (T12) splanchnic nerves, synapsing in the paired coeliac ganglia.</li>
                  <li><strong>Pre-ganglionic parasympathetic</strong> fibres passing through from the posterior vagal trunk without synapsing.</li>
                  <li><strong>Visceral afferents</strong> carrying nociception from the upper abdominal organs back to T5–T12 spinal segments — the basis of referred epigastric-to-back pain.</li>
                  <li>Some somatic contribution from the phrenic nerves; secondary plexuses (hepatic, splenic, renal, superior mesenteric) arise from it.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Territory</p>
                <p className="text-sm text-muted-foreground mt-1">Stomach and distal oesophagus, liver and biliary tract, pancreas, spleen, kidneys and adrenals, and the small bowel as far as the splenic flexure (mid-transverse colon). Pain from any of these is referred to the epigastrium and interscapular region, which is why a single plexus block can cover a wide upper abdominal field <InlineRef topicId="abdominal-anatomy" refLabel="Ellis & Feldman Ch.4" />.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Block technique</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>Indications:</strong> intractable pain from upper abdominal malignancy (classically pancreatic cancer), chronic pancreatitis; diagnostic block with local anaesthetic before neurolysis.</li>
                  <li><strong>Classic posterior approach:</strong> prone patient, bilateral needles inserted 5–7 cm from the midline at the level of the L1 spinous process, angled medially and cephalad to the <em>antero-lateral</em> aspect of the L1 vertebral body, in front of the crura.</li>
                  <li><strong>Imaging:</strong> fluoroscopy or CT guidance is standard, with contrast to confirm retro-crural/pre-aortic spread and exclude intravascular or intrathecal placement. Endoscopic ultrasound-guided anterior approaches are also used.</li>
                  <li><strong>Agents:</strong> diagnostic local anaesthetic; neurolysis with 50–100% alcohol or 6–10% phenol.</li>
                  <li><strong>Complications:</strong> hypotension and diarrhoea from unopposed parasympathetic activity (common and expected), back pain, retroperitoneal haematoma, aortic or renal puncture, pneumothorax, intravascular injection with LAST, and rarely paraplegia from spinal cord ischaemia or injection near the artery of Adamkiewicz. Pre-load with fluid and monitor closely.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Pelvic Anatomy">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pelvic Autonomics</p>
                <p className="text-sm text-muted-foreground mt-1">Sympathetic: hypogastric nerves (L1–L2). Parasympathetic: pelvic splanchnic nerves (S2–S4 — "nervi erigentes"). Damage during pelvic surgery → bladder/sexual dysfunction.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Sacral Plexus (L4–S4)</p>
                <p className="text-sm text-muted-foreground mt-1">Sciatic nerve (L4–S3): largest nerve in body. Exits pelvis through greater sciatic foramen below piriformis. Pudendal nerve (S2–S4): perineal sensation — pudendal nerve block for perineal surgery.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={abdominalAnatomyFaqs} />
        </>
      }
      workedExamples={[
        {
          title: "Planning a TAP block for laparotomy analgesia",
          scenario: "A 60-year-old has had a midline laparotomy for bowel resection and is for a bilateral subcostal + lateral TAP block on a 70 kg frame.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Identify plane on US: external oblique → internal oblique → transversus abdominis. Inject between IO and TA.</li>
                <li>Subcostal TAP covers T6–T9 (upper abdomen); lateral TAP covers T10–L1 (lower abdomen).</li>
                <li>Total LA dose: stay below toxic threshold. Levobupivacaine max ≈ 2 mg/kg → 140 mg in this patient.</li>
                <li>Use 0.25% levobupivacaine 20 ml per side → 50 mg per side, 100 mg total — within limit.</li>
                <li>TAP blocks cover somatic wall pain only — combine with multimodal analgesia (paracetamol, opioid PCA) for visceral pain.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Injecting too superficially (between EO and IO) → no spread to nerves.</li>
                  <li>Forgetting visceral pain coverage — TAP alone insufficient after bowel surgery.</li>
                  <li>Cumulative LA dose when combined with wound infiltration → LAST risk.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Bilateral subcostal + lateral TAP with 20 ml 0.25% levobupivacaine per side; combine with multimodal analgesia.",
    cites: ["Miller Ch.47"],
  },
      ]}
      keyPoints={[
        { text: "TAP block plane lies between internal oblique and transversus abdominis — targets thoracoabdominal nerves (T7–T11), subcostal (T12) and L1 branches (iliohypogastric, ilioinguinal)", cites: ["BJA Educ 2015"] },
        { text: "Ilioinguinal and iliohypogastric nerves (L1) — key targets for inguinal hernia repair blocks", cites: ["Ellis & Feldman Ch.4"] },
        { text: "Pelvic splanchnic nerves (S2-S4) provide parasympathetic supply — damage → bladder dysfunction", cites: ["Miller Ch.47"] },
        { text: "Liver receives 25% of CO — 75% portal vein, 25% hepatic artery", cites: ["BJA Educ 2015"] },
        { text: "Sciatic nerve exits pelvis below piriformis through greater sciatic foramen", cites: ["Ellis & Feldman Ch.4"] },
      ]}
    />
  );
};

export default AbdominalAnatomyTopic;
