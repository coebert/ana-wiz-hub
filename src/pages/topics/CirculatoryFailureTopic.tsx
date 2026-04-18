import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { circulatoryFailureQuestions } from "@/data/quizzes";
import FluidResponsivenessDiagram from "@/components/diagrams/FluidResponsivenessDiagram";
import MechanicalCirculatorySupportDiagram from "@/components/diagrams/MechanicalCirculatorySupportDiagram";
import MCSPressureVolumeLoopDiagram from "@/components/diagrams/MCSPressureVolumeLoopDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const CirculatoryFailureTopic = () => {
  return (
    <SectionLayout title="Circulatory Failure & Shock" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Shock is defined as inadequate tissue oxygen delivery relative to metabolic demand, resulting in cellular dysfunction. Classification by mechanism guides diagnosis and treatment.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Classification of Shock</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">CVP</th>
                  <th className="text-left py-2 text-foreground font-semibold">CO</th>
                  <th className="text-left py-2 text-foreground font-semibold">SVR</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hypovolaemic</td><td>↓ Preload</td><td>↓</td><td>↓</td><td>↑</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiogenic</td><td>Pump failure</td><td>↑</td><td>↓↓</td><td>↑</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Distributive</td><td>↓ SVR (vasodilation)</td><td>↓/N</td><td>↑/N</td><td>↓↓</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Obstructive</td><td>↓ Venous return / outflow</td><td>↑</td><td>↓</td><td>↑</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Illustrative Clinical Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-serif font-semibold text-foreground mb-1">Hypovolaemic</h3>
              <p className="text-xs text-muted-foreground italic mb-2">22-year-old motorcyclist, blunt abdominal trauma.</p>
              <p className="text-sm text-foreground/90">HR 135, BP 78/55, cool peripheries, CRT 4 s, lactate 6.2, Hb 72 g/L. FAST: free fluid in Morison's pouch — splenic laceration. <strong>Pattern:</strong> ↓preload, ↓CO, ↑SVR (compensatory), ↓CVP. <strong>Treat:</strong> haemorrhage control + balanced blood products (1:1:1), permissive hypotension until source controlled.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-serif font-semibold text-foreground mb-1">Cardiogenic</h3>
              <p className="text-xs text-muted-foreground italic mb-2">68-year-old with anterior STEMI 6 h ago.</p>
              <p className="text-sm text-foreground/90">HR 110, BP 82/64, cold mottled legs, raised JVP, bibasal crackles, lactate 4.8, oliguric. Echo: LVEF 18%, akinetic anterior wall. <strong>Pattern:</strong> ↑CVP/PAOP, ↓↓CO, ↑SVR. <strong>Treat:</strong> emergency PCI, dobutamine ± noradrenaline, careful diuresis, consider IABP/Impella/VA-ECMO if refractory.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-serif font-semibold text-foreground mb-1">Distributive — septic</h3>
              <p className="text-xs text-muted-foreground italic mb-2">74-year-old with urosepsis from obstructed pyelonephritis.</p>
              <p className="text-sm text-foreground/90">T 39.1, HR 128, BP 76/38 (MAP 51) despite 30 mL/kg crystalloid, warm flushed peripheries, bounding pulse, lactate 4.1, WCC 22. <strong>Pattern:</strong> ↓↓SVR, ↑/N CO ("warm shock"), ↓CVP. <strong>Treat:</strong> source control (urgent nephrostomy), broad-spectrum antibiotics within 1 h, noradrenaline to MAP ≥65, vasopressin if rising NA requirement, hydrocortisone if refractory.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-serif font-semibold text-foreground mb-1">Distributive — anaphylactic</h3>
              <p className="text-xs text-muted-foreground italic mb-2">35-year-old, IV teicoplanin at induction.</p>
              <p className="text-sm text-foreground/90">Sudden ↓ETCO₂, peak airway pressure 38, urticaria, BP 50/30, tryptase rising. <strong>Pattern:</strong> profound vasodilation + capillary leak + bronchospasm. <strong>Treat:</strong> stop trigger, IM adrenaline 500 µg (or IV 50 µg boluses titrated), 100% O₂, IV fluid bolus, second-line: salbutamol, hydrocortisone, chlorphenamine.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-serif font-semibold text-foreground mb-1">Distributive — neurogenic</h3>
              <p className="text-xs text-muted-foreground italic mb-2">28-year-old, fall from height, complete C5 cord injury.</p>
              <p className="text-sm text-foreground/90">HR 48 (loss of cardiac sympathetic outflow T1–T4), BP 78/40, warm dry skin <em>below</em> the lesion, priapism. <strong>Pattern:</strong> ↓SVR + bradycardia. <strong>Treat:</strong> cautious fluids, noradrenaline (α + modest β), atropine/glycopyrrolate or pacing for bradycardia, MAP target 85–90 for spinal cord perfusion.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-serif font-semibold text-foreground mb-1">Obstructive — massive PE</h3>
              <p className="text-xs text-muted-foreground italic mb-2">52-year-old, post-op day 4 hip replacement, sudden collapse.</p>
              <p className="text-sm text-foreground/90">HR 140, BP 70/50, JVP elevated, ETCO₂ 1.8 kPa, S1Q3T3 on ECG, RV dilated on bedside echo with septal bowing. <strong>Pattern:</strong> ↑CVP, ↓CO, RV failure. <strong>Treat:</strong> systemic thrombolysis (alteplase 50 mg) or surgical/catheter embolectomy, noradrenaline to support coronary perfusion of the ischaemic RV, avoid fluid overload (worsens RV distension).</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 md:col-span-2">
              <h3 className="font-serif font-semibold text-foreground mb-1">Obstructive — tension pneumothorax / tamponade</h3>
              <p className="text-xs text-muted-foreground italic mb-2">Ventilated trauma patient becomes hypotensive 10 min after intubation.</p>
              <p className="text-sm text-foreground/90">↑ peak airway pressure, tracheal deviation, absent breath sounds left, distended neck veins → <strong>tension pneumothorax</strong> — needle decompression then chest drain. Alternative: muffled heart sounds, equal air entry, pulsus paradoxus, swinging RA collapse on echo → <strong>tamponade</strong> — pericardiocentesis. <strong>Pattern:</strong> ↑CVP, ↓venous return, ↓CO, ↑SVR. Vasopressors and fluid are temporising only — definitive treatment is mechanical relief of the obstruction.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Assessment of Fluid Responsiveness</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Static measures (CVP, PAOP) are poor predictors. Dynamic indices are more reliable:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Pulse pressure variation (PPV)</strong>: &gt;13% predicts fluid responsiveness (requires sinus rhythm, controlled ventilation, VT ≥8 ml/kg)</li>
            <li><strong>Stroke volume variation (SVV)</strong>: &gt;10-15% threshold</li>
            <li><strong>Passive leg raise (PLR)</strong>: Autotransfusion of ~300ml. ↑CO by ≥10% predicts responsiveness. Works in spontaneous breathing and arrhythmias.</li>
            <li><strong>Mini fluid challenge</strong>: 100ml crystalloid over 1 min; ↑VTI &gt;10%</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiogenic Shock</h2>
          <p className="text-muted-foreground leading-relaxed">
            Caused by acute MI, myocarditis, cardiomyopathy, valvular emergency. Management: early revascularisation (PCI for STEMI), inotropes (dobutamine, milrinone), vasopressors if needed (noradrenaline). Consider mechanical circulatory support (IABP, Impella, VA-ECMO) for refractory cases. Avoid excessive fluids (may worsen pulmonary oedema).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why use vasopressors? — restoring coronary perfusion pressure</h2>
          <p className="text-foreground/90 leading-relaxed mb-3">
            It seems counter-intuitive to <em>increase</em> afterload in a failing heart. The rationale becomes clear once you consider how the left ventricle feeds itself.
          </p>
          <div className="bg-muted/40 rounded-lg p-4 border border-border my-3">
            <p className="text-center font-mono text-foreground">
              CPP = DBP<sub>aorta</sub> − LVEDP
            </p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Coronary (subendocardial) perfusion pressure is the diastolic aortic pressure minus the LV end-diastolic pressure. Unlike every other vascular bed, the LV myocardium is perfused almost exclusively in <strong>diastole</strong> because systolic intramural pressure exceeds aortic pressure and squeezes the intramyocardial vessels shut.
            </p>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">The vicious cycle of hypotension in shock</h3>
          <ol className="list-decimal pl-6 space-y-1 text-foreground/90 text-sm">
            <li>SVR falls (sepsis, anaphylaxis) <em>or</em> CO falls (cardiogenic) → <strong>diastolic BP falls</strong>.</li>
            <li>Low DBP → <strong>↓ coronary perfusion pressure</strong> → subendocardial ischaemia.</li>
            <li>Ischaemic myocardium contracts and relaxes more poorly → <strong>↓ stroke volume + ↑ LVEDP</strong>.</li>
            <li>↑ LVEDP further <strong>squeezes the subendocardial vessels</strong> from inside → CPP falls again.</li>
            <li>↓ CO → ↓ aortic pressure → ↓ CPP → more ischaemia. The spiral terminates in cardiac arrest unless interrupted.</li>
          </ol>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">How vasopressors break the cycle</h3>
          <p className="text-foreground/90 leading-relaxed mb-2">
            An α₁-agonist (noradrenaline, phenylephrine, vasopressin via V₁) constricts arterioles and venules. The effects on the LV are twofold:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
            <li><strong>↑ Diastolic aortic pressure</strong> — raising SVR raises the diastolic floor → <strong>↑ CPP and coronary blood flow</strong>, reversing subendocardial ischaemia.</li>
            <li><strong>↑ Venous return</strong> via venoconstriction (~70% of blood volume sits in capacitance veins) → ↑ stroke volume by Frank–Starling, even before any direct inotropy.</li>
            <li>Net effect: a better-perfused myocardium contracts more efficiently, LVEDP falls, and the ischaemic spiral reverses.</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">The trade-off — afterload mismatch</h3>
          <p className="text-foreground/90 leading-relaxed mb-2">
            Raising afterload also raises LV wall stress (Laplace) and MVO₂. The art is finding the SVR at which CPP gain exceeds the MVO₂ cost:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
            <li><strong>Septic / vasoplegic shock:</strong> baseline SVR is profoundly low; restoring it almost always improves CPP without compromising CO. MAP target ≥ 65 mmHg (≥ 80–85 in chronic hypertension).</li>
            <li><strong>Cardiogenic shock:</strong> SVR is already high. Pure α-agonism risks worsening forward failure, so noradrenaline is preferred (β₁ activity preserves CO) and combined with an inotrope (dobutamine, milrinone) or mechanical unloading (IABP, Impella).</li>
            <li><strong>RV failure / massive PE:</strong> the thin-walled RV is normally perfused throughout the cardiac cycle, but when RV pressure rises towards systemic levels, RV perfusion becomes diastole-dependent like the LV. Noradrenaline raises systemic DBP &gt; PA pressure → restores RV CPP → breaks the RV ischaemic spiral. <em>This is why noradrenaline is first-line in haemodynamically unstable PE.</em></li>
            <li><strong>Severe AS / HOCM:</strong> phenylephrine is preferred — pure α₁ raises CPP without the chronotropy that worsens diastolic filling and outflow gradient.</li>
          </ul>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Exam pearl</p>
            <p className="text-sm text-muted-foreground mt-1">
              In a hypotensive patient with myocardial ischaemia, the question "won't a vasopressor make ischaemia worse by raising afterload?" is answered by <strong>CPP = DBP − LVEDP</strong>. Restoring DBP almost always wins because subendocardial perfusion is the rate-limiting step. The strategy fails only when SVR is driven so high that LV wall stress and MVO₂ rise faster than coronary supply — hence the appeal of <em>combining</em> a vasopressor with an inotrope or mechanical unloading device in cardiogenic shock.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Mechanical Circulatory Support (MCS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When pharmacological therapy fails to restore adequate perfusion in cardiogenic shock, MCS devices can directly augment cardiac output, unload the failing left ventricle, and buy time for recovery, decision, transplantation, or destination therapy. The three principal LV-support devices differ fundamentally in <em>how</em> they generate flow and <em>how much</em> they unload the ventricle.
          </p>
          <MechanicalCirculatorySupportDiagram />

          <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">Pressure–volume loop analysis</h3>
          <p className="text-foreground/90 leading-relaxed text-sm mb-2">
            The clearest way to compare MCS devices is on the LV pressure–volume (PV) loop. Cardiogenic shock collapses the loop into a tall, wide, low-stroke-work box (low contractility = flatter ESPVR, high LVEDP). Each device modifies the loop differently:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm mb-3">
            <li><strong>IABP:</strong> small leftward shift — modest ↓ESV/↑SV from afterload reduction; EDV largely unchanged. Stroke work and PVA modestly reduced.</li>
            <li><strong>Impella:</strong> direct LV unloading — loop shrinks and shifts left. EDV ↓, ESV ↓, LVEDP ↓↓, native stroke work ↓ (much of CO is now pump output). PVA falls markedly → ↓MVO₂.</li>
            <li><strong>VA-ECMO:</strong> peripheral retrograde flow ↑↑ afterload → loop becomes tall and may collapse to an isovolumetric vertical line (AV never opens). LVEDP rises → LV distension and pulmonary oedema unless vented (Impella, IABP, atrial septostomy).</li>
            <li><strong>Durable LVAD:</strong> maximal unloading — loop collapses to a small triangle or vertical line at low volume. LVEDP minimal; the native heart contributes essentially no stroke work.</li>
          </ul>
          <MCSPressureVolumeLoopDiagram />
        </div>
      </section>

      <FluidResponsivenessDiagram />

      <KeyLearningPoints points={[
        "Classify shock by mechanism: hypovolaemic, cardiogenic, distributive, obstructive",
        "Dynamic indices (PPV, SVV, PLR) are superior to static measures (CVP) for fluid responsiveness",
        "Passive leg raise is the gold standard — works in spontaneous breathing and arrhythmias",
        "Cardiogenic shock: inotropes + vasopressors, avoid fluid overload, consider mechanical support",
        "Lactate clearance (>20% in 2h) is a useful target for resuscitation adequacy",
      ]} />

      <QuizSection questions={circulatoryFailureQuestions} />
      <ReferencesList topicId="circulatory-failure" />

      <SeeAlso topicId="circulatory-failure" />
        <TopicCompletionToggle topicId="circulatory-failure" topicTitle="Circulatory Failure &amp; Shock" />
    </SectionLayout>
  );
};

export default CirculatoryFailureTopic;
