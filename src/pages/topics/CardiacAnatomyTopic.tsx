import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { cardiacAnatomyQuestions } from "@/data/quizzes";
import CardiacAnatomyDiagram from "@/components/diagrams/CardiacAnatomyDiagram";
import systemicCirculationOverview from "@/assets/plates/systemic-circulation-overview.jpg";
import CoronaryTerritoryMapDiagram from "@/components/diagrams/CoronaryTerritoryMapDiagram";
import CoronaryTreeDiagram from "@/components/diagrams/CoronaryTreeDiagram";
import LVBullseyeDiagram from "@/components/diagrams/LVBullseyeDiagram";
import TwelveLeadEcgDiagram from "@/components/diagrams/TwelveLeadEcgDiagram";
import CardiacConductionDiagram from "@/components/diagrams/CardiacConductionDiagram";
import AnteriorCardiacPlate from "@/components/diagrams/anatomy/AnteriorCardiacPlate";
import { CoronarySelectionProvider } from "@/components/diagrams/coronarySelectionContext";
import { DiagramTabs } from "@/components/diagrams/DiagramTabs";
import { DiagramSection } from "@/components/DiagramSection";
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
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Ellis & Feldman Ch.3", "Power & Kam Ch.3"],
        diagrams: ["BJA Educ 2005", "Ellis & Feldman Ch.3"],
        workedExamples: ["BJA Educ 2005", "Power & Kam Ch.3"],
        keyPoints: ["Ellis & Feldman Ch.3", "BJA Educ 2005", "Power & Kam Ch.3"],
      }}
      diagrams={
        <>
          <CardiacAnatomyDiagram />

          <DiagramSection
            title="Systemic circulation overview"
            intro="Whole-body map of the major systemic arteries with the great vessels and pulmonary circulation labelled around an enlarged heart inset. Useful for orientating regional anatomy (upper limb, thoracic/abdominal aorta, pelvic, lower limb) against the central cardiac plumbing."
          >
            <figure className="rounded-xl border border-border bg-card overflow-hidden">
              <img
                src={systemicCirculationOverview}
                alt="Annotated diagram of the systemic arterial circulation, great vessels, and an enlarged heart showing chambers and coronary arteries"
                className="w-full h-auto"
                loading="lazy"
              />
              <figcaption className="text-xs text-muted-foreground p-3 border-t border-border">
                Major arteries of the systemic circulation with great vessels of the heart and pulmonary circulation.
              </figcaption>
            </figure>
          </DiagramSection>


          <DiagramSection
            title="Painted plates — heart, valves & conduction"
            intro="Hand-coded SVG plates with code-defined labels and leader lines — every label is auditable in source, not baked into pixels."
          >
            <AnteriorCardiacPlate />
          </DiagramSection>

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

          <CardiacConductionDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heart Chambers & Valves</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coronary Arteries</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Conducting System</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Great Vessels & Pericardium</h2>
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
          </ExamSection>
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
