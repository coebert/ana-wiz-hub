import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { cardiacAnatomyQuestions } from "@/data/quizzes";
import CardiacAnatomyDiagram from "@/components/diagrams/CardiacAnatomyDiagram";
import CoronaryTerritoryMapDiagram from "@/components/diagrams/CoronaryTerritoryMapDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const CardiacAnatomyTopic = () => {
  return (
    <SectionLayout title="Cardiac & Great Vessel Anatomy" subtitle="FRCA / FFICM — Applied Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heart Chambers & Valves</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The heart lies in the middle mediastinum, enclosed in pericardium. Two-thirds lies to the left of the midline. The cardiac skeleton (fibrous rings) provides electrical insulation between atria and ventricles.
          </p>

          <CardiacAnatomyDiagram />

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Right Heart</p>
              <p className="text-sm text-muted-foreground mt-1">RA: receives SVC, IVC, coronary sinus. SA node (RA/SVC junction). AV node (triangle of Koch — tendon of Todaro, coronary sinus os, tricuspid annulus). RV: trabeculated, infundibulum leads to pulmonary valve.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Left Heart</p>
              <p className="text-sm text-muted-foreground mt-1">LA: smooth-walled (except appendage). 4 pulmonary veins enter posteriorly. Mitral valve: 2 leaflets with chordae tendineae to papillary muscles. LV: thick-walled (8–15 mm). Aortic valve: 3 semilunar cusps with sinuses of Valsalva.</p>
            </div>
          </div>
        </div>

        <div>
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

          <div className="mt-4">
            <CoronaryTerritoryMapDiagram />
          </div>
        </div>

        <div>
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
        </div>

        <div>
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
        </div>
      </section>

      <KeyLearningPoints points={[
        "SA node at SVC-RA junction; AV node in triangle of Koch — both supplied primarily by RCA",
        "Right coronary dominant in 85% — RCA gives PDA and supplies AV node",
        "LAD supplies anterior LV and anterior septum — most commonly occluded in MI",
        "Transverse sinus lies between aorta/PA and SVC — key for aortic cross-clamping in cardiac surgery",
        "Triangle of Koch landmarks: tendon of Todaro, coronary sinus ostium, tricuspid annulus",
      ]} />

      <QuizSection questions={cardiacAnatomyQuestions} />
      <ReferencesList topicId="cardiac-anatomy" />

      <TopicCompletionToggle topicId="cardiac-anatomy" topicTitle="Cardiac & Great Vessel Anatomy" />
    </SectionLayout>
  );
};

export default CardiacAnatomyTopic;
