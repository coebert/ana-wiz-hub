import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { vascularAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const VascularAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Vascular Anaesthesia" subtitle="FRCA Final — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Abdominal Aortic Aneurysm (AAA)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Definitions</strong>: AAA = aortic diameter ≥3 cm (or 1.5× normal). Elective repair indicated at ≥5.5 cm (men) or ≥5.0 cm (women), or if growth &gt;1 cm/year</li>
            <li><strong>Open repair</strong>: supracoeliac or infrarenal cross-clamp. Massive haemodynamic changes — ↑ SVR and afterload on clamp, ↓ BP on unclamp (reperfusion). Cell salvage essential</li>
            <li><strong>EVAR (endovascular)</strong>: lower perioperative mortality (1–2% vs 4–6% open). GA or LA + sedation. Contrast nephropathy risk. Post-implantation syndrome (fever, ↑ CRP, ↑ WCC)</li>
            <li><strong>Ruptured AAA</strong>: 80% pre-hospital mortality. Permissive hypotension (SBP 70–80 mmHg) until aortic control. Massive transfusion protocol. Damage control surgery</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Aortic Cross-Clamping Physiology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Above clamp</strong>: ↑ SVR (40–60%), ↑ MAP, ↑ cardiac preload, ↑ myocardial O₂ demand. Risk of LV failure/ischaemia. Magnitude depends on clamp level (supracoeliac &gt; infrarenal)</li>
            <li><strong>Below clamp</strong>: ↓ perfusion to kidneys, gut, spinal cord, lower limbs. Renal ischaemia (if suprarenal), gut mucosal ischaemia, lactic acidosis</li>
            <li><strong>Unclamping</strong>: ↓ SVR (vasodilatation, washout of metabolites), ↓ preload (blood pooling in lower body), metabolic acidosis, ↑ K⁺, ↑ lactate, myocardial depressant factors. Manage: volume loading pre-unclamp, slow/staged release, vasopressors</li>
            <li><strong>Spinal cord protection</strong>: CSF drainage (lumbar drain), MAP targets &gt;80 mmHg, avoid hypothermia, reimplant intercostal arteries (open TAAA repair)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Carotid Endarterectomy (CEA)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Indication</strong>: symptomatic carotid stenosis ≥50% (NASCET) or asymptomatic ≥60–70%. Surgery within 2 weeks of symptoms (NICE)</li>
            <li><strong>GA vs regional</strong>: GALA trial showed no difference in outcomes. Regional (cervical plexus block) allows awake neurological monitoring</li>
            <li><strong>Cerebral monitoring</strong>: awake testing (gold standard under regional), TCD (MCA flow velocity), stump pressure (&gt;40–50 mmHg adequate), EEG, near-infrared spectroscopy (NIRS)</li>
            <li><strong>Shunting</strong>: routine vs selective. Selective based on monitoring — used if stump pressure &lt;40 mmHg or neurological deficit during clamping</li>
            <li><strong>Haemodynamic management</strong>: avoid hypotension during cross-clamp (maintain cerebral perfusion). Post-op: BP control to prevent hyperperfusion syndrome (headache, seizures, ICH)</li>
            <li><strong>Complications</strong>: stroke (2–5%), cranial nerve injury (vagus, hypoglossal, marginal mandibular), neck haematoma (may compromise airway), hyperperfusion syndrome, MI</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Peripheral Vascular Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Lower limb bypass/angioplasty</strong>: patients often have widespread atherosclerosis, IHD, DM, CKD. High cardiac risk — Lee's RCRI assessment</li>
            <li><strong>Anaesthetic options</strong>: GA, neuraxial (spinal/epidural), peripheral nerve blocks, or combinations. Regional may improve graft flow (sympathectomy)</li>
            <li><strong>Amputation</strong>: often elderly, frail, comorbid. Sciatic + femoral nerve block or spinal anaesthesia. Phantom limb pain prevention: regional analgesia, gabapentinoids</li>
            <li><strong>Ischaemia-reperfusion injury</strong>: release of K⁺, lactate, myoglobin, inflammatory mediators from revascularised tissue. Can cause cardiac arrhythmias, renal failure, ARDS</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Cardiac Risk Assessment</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Lee's RCRI</strong>: 6 predictors — high-risk surgery, IHD, CCF, CVA/TIA, DM (insulin), creatinine &gt;177 µmol/L. ≥3 points = high risk</li>
            <li><strong>CPET</strong>: AT &lt;11 ml/kg/min = high risk. VE/VCO₂ &gt;34 also associated with poor outcomes</li>
            <li><strong>Cardiac medications</strong>: continue statins, beta-blockers, aspirin. Withhold ACEi/ARBs on day of surgery (hypotension risk). Dual antiplatelet management — MDT discussion</li>
            <li><strong>Coronary stents</strong>: BMS — defer elective surgery 6 weeks; DES — defer 6–12 months (or 3 months with newer-generation DES). Continue aspirin perioperatively if possible</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intraoperative Monitoring & Management</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Arterial line</strong>: essential for open aortic surgery, recommended for CEA. Beat-to-beat BP and serial ABGs</li>
            <li><strong>Central venous access</strong>: consider for open aortic surgery (vasoactive drugs, volume assessment). Not always needed for EVAR or CEA</li>
            <li><strong>Cardiac output monitoring</strong>: goal-directed fluid therapy (oesophageal Doppler, PiCCO, FloTrac) improves outcomes in major vascular surgery</li>
            <li><strong>Temperature</strong>: active warming essential. Hypothermia worsens coagulopathy, cardiac morbidity, wound infection</li>
            <li><strong>Cell salvage</strong>: essential for open aortic surgery. Relative contraindication if concurrent malignancy (use leucocyte depletion filter)</li>
            <li><strong>Renal protection</strong>: maintain adequate MAP, avoid nephrotoxins, goal-directed fluid therapy. No proven benefit of renal-dose dopamine or mannitol</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Aortic cross-clamping: ↑ SVR/afterload above clamp; ischaemia below. Unclamp → ↓ SVR, acidosis, ↑ K⁺ — pre-load before release",
        "Ruptured AAA: permissive hypotension (SBP 70–80) until aortic control. Massive transfusion protocol",
        "CEA: GALA trial — no difference GA vs regional. Monitor cerebral perfusion (stump pressure, TCD, NIRS). Post-op BP control to prevent hyperperfusion",
        "Vascular patients have high cardiac risk — Lee's RCRI, CPET (AT <11 = high risk), continue statins/beta-blockers perioperatively",
        "Ischaemia-reperfusion: K⁺ release, myoglobin, lactate washout can cause arrhythmias, AKI, ARDS",
      ]} />
      <QuizSection questions={vascularAnaesthesiaQuestions} />
      <ReferencesList topicId="vascular-anaesthesia" />
      <TopicCompletionToggle topicId="vascular-anaesthesia" topicTitle="Vascular Anaesthesia" />
    </SectionLayout>
  );
};

export default VascularAnaesthesiaTopic;
