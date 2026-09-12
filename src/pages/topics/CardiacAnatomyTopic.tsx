import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const cardiacAnatomyFaqs: Array<[string, string]> = [
  ["Why does the right coronary artery supply the SA and AV nodes in most people?", "In ~85% of patients (right-dominant circulation) the RCA gives the SA nodal artery and the AV nodal artery before becoming the posterior descending artery. This is why inferior MIs from RCA occlusion frequently cause bradycardia, AV block and right-ventricular involvement — and why right-sided ECG leads (V4R) should be recorded."],
  ["Where exactly does the apex beat lie and why does it shift?", "Normally in the 5th left intercostal space, just medial to the mid-clavicular line, marking the LV apex. It shifts laterally and inferiorly with LV dilation (chronic AR, dilated cardiomyopathy), and laterally without inferior shift with mediastinal displacement (pneumothorax, large pleural effusion, lobectomy)."],
  ["Which structures lie immediately posterior to the heart and what is the clinical relevance?", "The oesophagus, descending aorta and left main bronchus lie directly behind the left atrium. A TOE probe therefore gives unparalleled LA and mitral views; a massively enlarged LA can cause dysphagia (and Ortner's sign — hoarseness from recurrent laryngeal nerve compression); and aortic aneurysms can erode into the oesophagus."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { InlineRef } from "@/components/references/InlineRef";
import { ExamSection } from "@/components/exam/ExamSection";
import { cardiacAnatomyQuestions } from "@/data/quizzes";
import CardiacAnatomyDiagram from "@/components/diagrams/anatomy/CardiacAnatomyDiagram";
import systemicArteriesPlate from "@/assets/plates/systemic-arteries-openstax.jpg.asset.json";
import CoronaryTerritoryMapDiagram from "@/components/diagrams/anatomy/CoronaryTerritoryMapDiagram";
import CoronaryTreeDiagram from "@/components/diagrams/anatomy/CoronaryTreeDiagram";
import LVBullseyeDiagram from "@/components/diagrams/anatomy/LVBullseyeDiagram";
import TwelveLeadEcgDiagram from "@/components/diagrams/intensive-care/TwelveLeadEcgDiagram";
import CardiacConductionDiagram from "@/components/diagrams/intensive-care/CardiacConductionDiagram";
import AnteriorCardiacPlate from "@/components/diagrams/anatomy/AnteriorCardiacPlate";
import { CoronarySelectionProvider } from "@/components/diagrams/intensive-care/coronarySelectionContext";
import { DiagramTabs } from "@/components/diagrams/physiology/DiagramTabs";
import { Exam } from "@/data/curriculum";

const CardiacAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Cardiac & Great Vessel Anatomy"
      subtitle="FRCA / FFICM — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="cardiac-anatomy"
      quizQuestions={cardiacAnatomyQuestions}
      objectives={[
        "Describe heart chamber and valve anatomy with surgical landmarks.",
        "Identify the coronary arterial tree and predict ECG territory of occlusion.",
        "Outline the conducting system and dominant nodal blood supply.",
        "Locate the great vessels and pericardial sinuses relevant to cardiac surgery.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["AN_BK_03"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Ellis & Feldman Ch.3", "Power & Kam Ch.3"],
        workedExamples: ["BJA Educ 2005", "Power & Kam Ch.3"],
        keyPoints: ["Ellis & Feldman Ch.3", "BJA Educ 2005", "Power & Kam Ch.3"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Heart Chambers & Valves" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The heart lies in the middle mediastinum, enclosed in pericardium. Two-thirds lies to the left of the midline. The cardiac skeleton (fibrous rings) provides electrical insulation between atria and ventricles.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Right Heart</p>
                <p className="text-sm text-muted-foreground mt-1">RA: receives SVC, IVC, coronary sinus. SA node (RA/SVC junction). AV node (triangle of Koch — tendon of Todaro, coronary sinus os, tricuspid annulus). RV: trabeculated, infundibulum leads to pulmonary valve.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Left Heart</p>
                <p className="text-sm text-muted-foreground mt-1">LA: smooth-walled (except appendage). 4 pulmonary veins enter posteriorly. Mitral valve: 2 leaflets with chordae tendineae to papillary muscles. LV: thick-walled (8–15 mm). Aortic valve: 3 semilunar cusps with sinuses of Valsalva.</p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <CardiacAnatomyDiagram />
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <AnteriorCardiacPlate />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Cardiac Valves in Detail">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Valve anatomy underpins echocardiographic assessment, surgical repair and the localisation of conduction
              tissue <InlineRef topicId="cardiac-anatomy" refLabel="BJA Educ 2005" />.
            </p>
            <div className="space-y-2">
              {[
                { v: "Mitral valve", d: "Two leaflets — a large anterior (aortic) leaflet continuous with the aortic root, and a shallow posterior (mural) leaflet, usually scalloped into three segments. Chordae insert onto two papillary muscles: the anterolateral muscle has a dual supply (LAD diagonal + circumflex), whereas the posteromedial muscle usually has a single supply (PDA), explaining its vulnerability to rupture and acute severe mitral regurgitation after inferior MI. Annular dilation or papillary tethering after infarction produces functional/ischaemic regurgitation with structurally normal leaflets." },
                { v: "Aortic valve", d: "Three semilunar cusps — right coronary, left coronary and non-coronary — each with a dilated sinus of Valsalva above it. The right and left coronary arteries arise from their respective sinuses; the non-coronary sinus sits adjacent to the interatrial septum and the AV node. The free edge of each cusp carries a central fibrous thickening, the nodule of Arantius, which helps the cusps coapt." },
                { v: "Tricuspid valve", d: "Three leaflets — anterior, posterior and septal. The septal leaflet attaches directly to the interventricular septum; the AV node lies at the apex of the triangle of Koch just above its annular attachment, so surgery or ablation in this region risks complete heart block. Larger orifice and thinner chordae than the mitral valve." },
                { v: "Pulmonary valve", d: "Three semilunar cusps — anterior, right and left. It is the most anterior of the four valves, lying immediately behind the left third costal cartilage, which is why it is the valve most readily injured in penetrating anterior chest trauma and best heard at the left second interspace." },
              ].map((x) => (
                <div key={x.v} className="p-3 rounded border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.v}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Coronary Venous Drainage">
            <p className="text-muted-foreground leading-relaxed mb-3">
              About 60–70% of coronary venous return reaches the right atrium through the <strong>coronary sinus</strong>,
              a short wide channel in the posterior atrioventricular groove that opens into the RA between the IVC orifice
              and the tricuspid annulus, guarded by the rudimentary Thebesian valve. It is the route used for retrograde
              cardioplegia and for placing the left-ventricular lead of a biventricular pacemaker
              <InlineRef topicId="cardiac-anatomy" refLabel="Ellis & Feldman Ch.3" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Great cardiac vein</strong> — ascends with the LAD in the anterior interventricular groove, then turns into the left AV groove to become the coronary sinus.</li>
              <li><strong>Middle cardiac vein</strong> — accompanies the posterior descending artery in the posterior interventricular groove.</li>
              <li><strong>Small cardiac vein</strong> — runs with the acute (right) marginal artery along the inferior border of the right heart.</li>
              <li><strong>Posterior vein of the left ventricle</strong> and the <strong>oblique vein of Marshall</strong> also drain into the sinus.</li>
              <li><strong>Anterior cardiac veins</strong> — several small veins draining the RV free wall directly into the right atrium, bypassing the coronary sinus.</li>
              <li><strong>Thebesian veins (venae cordis minimae)</strong> — minute vessels draining myocardium straight into the adjacent chambers; part of the small physiological shunt that contributes to normal A–a gradient.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Fibrous Skeleton of the Heart">
            <p className="text-muted-foreground leading-relaxed mb-3">
              A dense collagenous framework at the atrioventricular junction that anchors the valves and myocardium,
              resists dilation of the valve orifices during systole, and electrically insulates atrial from ventricular
              muscle <InlineRef topicId="cardiac-anatomy" refLabel="Ellis & Feldman Ch.3" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Components</strong>: four fibrous rings (annuli) around the mitral, tricuspid, aortic and pulmonary orifices, joined by the right and left fibrous trigones and continuous with the membranous interventricular septum.</li>
              <li><strong>Electrical insulation</strong>: the <strong>bundle of His</strong> is normally the only structure penetrating the skeleton, so it is the sole route of atrioventricular conduction — accessory pathways crossing the annulus (e.g. Kent bundle) cause pre-excitation.</li>
              <li><strong>Clinical relevance</strong>: annuloplasty rings restore the annulus; annular calcification distorts conduction tissue; aortic–mitral continuity through the left trigone means aortic root abscess can involve the mitral valve and the His bundle.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Surface Anatomy & Auscultation">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Right border</strong>: gentle curve from the right 3rd to the right 6th costal cartilage, about 1–2 cm lateral to the sternal edge (right atrium).</li>
              <li><strong>Inferior border</strong>: right 6th costal cartilage to the apex (mainly right ventricle).</li>
              <li><strong>Left border</strong>: left 2nd costal cartilage to the apex (left ventricle and left atrial appendage).</li>
              <li><strong>Apex</strong>: 5th left intercostal space, just medial to the mid-clavicular line.</li>
            </ul>
            <div className="mt-3 space-y-2">
              {[
                { s: "Aortic area", p: "2nd right intercostal space, parasternal — ejection systolic murmur of aortic stenosis radiating to the carotids." },
                { s: "Pulmonary area", p: "2nd left intercostal space, parasternal — pulmonary flow murmurs, loud P2 in pulmonary hypertension." },
                { s: "Tricuspid area", p: "4th/5th left intercostal space at the lower left sternal edge — tricuspid regurgitation, VSD." },
                { s: "Mitral area", p: "5th left intercostal space at the mid-clavicular line (apex) — pansystolic murmur of mitral regurgitation radiating to the axilla." },
              ].map((x) => (
                <div key={x.s} className="p-3 rounded border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.s}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.p}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Auscultation points lie downstream of each valve rather than over it, because sound travels with the
              turbulent blood flow. The same landmarks guide pre-operative examination, ultrasound windows for focused
              echocardiography and safe placement of chest drains and internal defibrillator pads
              <InlineRef topicId="cardiac-anatomy" refLabel="Power & Kam Ch.3" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Coronary Arteries">
            <div className="space-y-2">
              {[
                { artery: "Left Main Stem (LMS)", detail: "2 cm from left coronary sinus → divides into LAD and circumflex. Short — stenosis here is 'widow-maker'." },
                { artery: "LAD", detail: "Runs in anterior interventricular groove. Supplies anterior LV, anterior septum (septal perforators), apex. Gives diagonal branches." },
                { artery: "Circumflex (LCx)", detail: "Runs in left AV groove. Supplies lateral and posterior LV. Gives obtuse marginal branches. Dominant in 15%." },
                { artery: "Right Coronary (RCA)", detail: "Runs in right AV groove. Supplies RA, RV, SA node (60%), AV node (80%), inferior LV. Dominant in 85% (gives PDA)." },
                { artery: "Dominance", detail: "Defined by which artery gives the posterior descending artery (PDA). Right dominant 85%, left 15%, co-dominant rare." },
              ].map((a) => (
                <div key={a.artery} className="flex gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm whitespace-nowrap">{a.artery}</span>
                  <span className="text-sm text-muted-foreground">{a.detail}</span>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <CoronarySelectionProvider initial="anterior">
                <DiagramTabs
                  title="Coronary territory mapping"
                  description="Pick a territory or coronary branch on any panel — the others stay in sync, so you can move between the anatomical tree, the LV bullseye and the 12-lead correlation."
                  tabs={[
                    {
                      value: "territory",
                      label: "Territory map",
                      caption: "Anatomical projection of LAD, LCx and RCA territories on the heart silhouette.",
                      content: <CoronaryTerritoryMapDiagram />,
                    },
                    {
                      value: "tree",
                      label: "Coronary tree",
                      caption: "Branching diagram from the aortic root to PDA — toggle dominance and named branches.",
                      content: <CoronaryTreeDiagram />,
                    },
                    {
                      value: "bullseye",
                      label: "LV bullseye",
                      caption: "AHA 17-segment bullseye coloured by supplying coronary artery.",
                      content: <LVBullseyeDiagram />,
                    },
                    {
                      value: "ecg",
                      label: "12-lead correlation",
                      caption: "Which leads see each territory — predict the culprit vessel from ST changes.",
                      content: <TwelveLeadEcgDiagram />,
                    },
                  ]}
                />
              </CoronarySelectionProvider>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Conducting System">
            <p className="text-muted-foreground leading-relaxed mb-3">
              SA node (pacemaker, 60–100 bpm) → atrial conduction → AV node (inherent rate 40–60, 0.1s delay) → bundle of His → right and left bundle branches → Purkinje fibres → ventricular muscle.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">SA Node</p>
                <p className="text-sm text-muted-foreground mt-1">Junction of SVC and RA. Supplied by SA nodal artery (from RCA in 60%, LCx in 40%). Rich autonomic innervation.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">AV Node</p>
                <p className="text-sm text-muted-foreground mt-1">Triangle of Koch. Supplied by AV nodal artery (from RCA in 80%). Only site of normal atrio-ventricular conduction. Ablation target in AF.</p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <CardiacConductionDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Great Vessels & Pericardium">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Aortic Arch</p>
                <p className="text-sm text-muted-foreground mt-1">Branches (L→R): brachiocephalic trunk → right subclavian + right CCA; left CCA; left subclavian. Arch passes over left main bronchus. Recurrent laryngeal nerve loops under arch.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pericardium</p>
                <p className="text-sm text-muted-foreground mt-1">Fibrous + serous (parietal and visceral/epicardium). Pericardial space: 15–50 ml fluid. Transverse sinus: between aorta/PA anteriorly and SVC/pulmonary veins posteriorly — surgically important for cross-clamping.</p>
              </div>
            </div>
            <figure className="rounded-xl border border-border bg-card overflow-hidden mt-4">
              <img
                src={systemicArteriesPlate.url}
                alt="Anterior labelled diagram of the major systemic arteries: aortic arch and its branches, thoracic and abdominal aorta with visceral branches, common/external/internal iliac arteries, and upper and lower limb arterial tree"
                className="w-full h-auto"
                loading="lazy"
              />
              <figcaption className="text-xs text-muted-foreground p-3 border-t border-border">
                Major systemic arteries — anterior view. Adapted from OpenStax College, <em>Anatomy &amp; Physiology</em> (Fig. 20.31), <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY 4.0</a>.
              </figcaption>
            </figure>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={cardiacAnatomyFaqs} />
        </>
      }
      workedExamples={[
        {
          title: "Localising MI from a 12-lead ECG",
          scenario: "A 64-year-old presents with chest pain. ECG shows ST elevation in II, III and aVF with reciprocal depression in I and aVL. Identify the territory and culprit artery.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Inferior leads are II, III, aVF — ST elevation = <strong>inferior MI</strong>.</li>
                <li>Inferior wall supply: RCA (85% dominance) → PDA → inferior LV.</li>
                <li>RCA also supplies SA node (60%) and AV node (80%) → expect bradycardia and AV block.</li>
                <li>Add right-sided leads (V4R) — ST elevation in V4R suggests RV infarct → preload-dependent; avoid nitrates, give fluids cautiously.</li>
                <li>Plan: PPCI within 120 min, dual antiplatelets, anticoagulation; anaesthetic input if airway/haemodynamic deterioration.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Giving GTN in RV infarct → catastrophic hypotension.</li>
                  <li>Forgetting V4R/posterior leads when inferior changes are present.</li>
                  <li>Assuming LCx culprit if dominance is left — check coronary angiogram.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Inferior STEMI from RCA occlusion; check V4R for RV involvement and avoid nitrates if present.",
    cites: ["BJA Educ 2005"],
  },
      ]}
      keyPoints={[
        { text: "SA node at SVC-RA junction; AV node in triangle of Koch — both supplied primarily by RCA", cites: ["Power & Kam Ch.3"] },
        { text: "Right coronary dominant in 85% — RCA gives PDA and supplies AV node", cites: ["Ellis & Feldman Ch.3"] },
        { text: "LAD supplies anterior LV and anterior septum — most commonly occluded in MI", cites: ["BJA Educ 2005"] },
        { text: "Transverse sinus lies between aorta/PA and SVC — key for aortic cross-clamping in cardiac surgery", cites: ["Power & Kam Ch.3"] },
        { text: "Triangle of Koch landmarks: tendon of Todaro, coronary sinus ostium, tricuspid annulus", cites: ["Ellis & Feldman Ch.3"] },
      ]}
    />
  );
};

export default CardiacAnatomyTopic;
