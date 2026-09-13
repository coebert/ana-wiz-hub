import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { ExamSection } from "@/components/exam/ExamSection";
import { perioperativeFluidsQuestions } from "@/data/quizzes";
import { DiagramSection } from "@/components/topic/DiagramSection";
import GlycocalyxDiagram from "@/components/diagrams/physiology/GlycocalyxDiagram";
import { GlycocalyxSheddingCascadeDiagram } from "@/components/diagrams/perioperative/GlycocalyxSheddingCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";

const tocItems = [
  { id: "section-fluid-compartments", label: "Fluid Compartments", group: "Core" },
  { id: "section-fluid-composition", label: "Crystalloid & Colloid Composition", group: "Core" },
  { id: "section-gdft", label: "Goal-Directed Fluid Therapy", group: "Core" },
  { id: "section-special-populations", label: "Fluid Management in Special Populations", group: "Core" },
  { id: "section-rose", label: "Phases of Fluid Therapy (ROSE)", group: "Core" },
  { id: "section-paediatric-fluids", label: "Paediatric Fluid Management", group: "Core" },
  { id: "section-fluid-tolerance", label: "Fluid Tolerance & Venous Congestion", group: "Core" },
  { id: "section-glycocalyx", label: "Glycocalyx & Revised Starling", group: "Core" },
  { id: "section-key-fluid-trials", label: "Key Fluid Trials", group: "Evidence" },
];

const perioperativeFluidsFaqs: Array<[string, string]> = [
  ["Why are balanced crystalloids preferred over 0.9% saline for perioperative resuscitation?", "Large volumes of 0.9% saline cause hyperchloraemic metabolic acidosis and are associated with increased acute kidney injury and adverse renal events (SMART, SALT-ED). Balanced crystalloids (Hartmann's, Plasma-Lyte) have a more physiological chloride content."],
  ["How is fluid responsiveness assessed in a mechanically ventilated patient?", "With dynamic indices such as stroke volume variation or pulse pressure variation >12–13%, in sinus rhythm with tidal volume ≥8 mL/kg; if these conditions are not met, use a passive leg-raise manoeuvre or a 250 mL fluid challenge with stroke-volume reassessment."],
  ["When are starch-based colloids contraindicated?", "Hydroxyethyl starches should be avoided in sepsis and critical illness (CHEST, 6S — increased AKI and mortality) and are not licensed for ICU use in the UK or EU."],
];

const PerioperativeFluidsTopic = () => {
  return (
    <TopicTemplate
      title="Perioperative Fluid Therapy"
      subtitle="FRCA / FFICM — Perioperative Medicine"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-perioperative"
      topicId="perioperative-fluids"
      quizQuestions={perioperativeFluidsQuestions}
      objectives={[
        "Describe body fluid compartments and the distribution of crystalloids and colloids.",
        "Compare common IV fluids by composition and clinical effect.",
        "Apply goal-directed fluid therapy principles using stroke volume and dynamic indices.",
        "Explain the revised Starling equation and the role of the endothelial glycocalyx.",
        "Use major trial evidence (SMART, RELIEF, BaSICS) to choose a fluid strategy.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_06"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["NICE CG174", "BJA Educ 2017"],
        workedExamples: ["BJA Educ 2019", "NICE CG174", "SMART 2018", "RELIEF 2018", "BJA Educ GDFT 2016"],
        keyPoints: ["BJA Educ 2017", "NICE CG174", "BJA Educ 2019", "SMART 2018", "BJA Educ GDFT 2016", "RELIEF 2018", "Chappell 2019 (Glycocalyx)", "Front Med Fluids 2025", "BJA Paediatric Fluids 2006"],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <ExamSection id="section-fluid-compartments" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Fluid Compartments" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Total body water (TBW) = ~60% body weight. ICF 40%, ECF 20% (interstitial 15%, plasma 5%). Only 25% of crystalloid remains intravascular — the rest distributes to the interstitium.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Fluid</th>
                    <th className="text-left py-2 text-foreground font-semibold">Na⁺ (mmol/L)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Cl⁻ (mmol/L)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Osmolality</th>
                    <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">0.9% NaCl</td><td>154</td><td>154</td><td>308</td><td>Hyperchloraemic acidosis. Not "normal".</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hartmann's</td><td>131</td><td>111</td><td>278</td><td>Contains lactate 29 mmol/L (metabolised to HCO₃⁻). Balanced.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Plasmalyte</td><td>140</td><td>98</td><td>294</td><td>Most physiological. Acetate + gluconate as buffers.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">5% Albumin</td><td>148</td><td>128</td><td>300</td><td>Colloid. Better intravascular expansion. SAFE trial: equivalent to saline in general ICU.</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-fluid-composition" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Comparative Crystalloid & Colloid Composition">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Choice of fluid should be guided by composition relative to plasma — chloride content, buffer, tonicity and additional electrolytes all influence clinical effect. <InlineRef topicId="perioperative-fluids" refLabel="Front Med Fluids 2025" /> <InlineRef topicId="perioperative-fluids" refLabel="NICE CG174" />
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">Fluid</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">Na⁺ (mmol/L)</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">Cl⁻ (mmol/L)</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">K⁺ (mmol/L)</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">Ca²⁺/Mg²⁺ (mmol/L)</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">Buffer</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">Osmolarity (mOsm/L)</th>
                    <th className="text-left py-2 pr-2 text-foreground font-semibold">pH</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-2 font-medium text-foreground">0.9% sodium chloride</td>
                    <td className="pr-2">154</td><td className="pr-2">154</td><td className="pr-2">0</td><td className="pr-2">0</td><td className="pr-2">None</td><td className="pr-2">308</td><td className="pr-2">~5.5</td>
                    <td>Hyperchloraemic metabolic acidosis with large volumes</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-2 font-medium text-foreground">Hartmann's (CSL)</td>
                    <td className="pr-2">131</td><td className="pr-2">111</td><td className="pr-2">5</td><td className="pr-2">Ca 2</td><td className="pr-2">Lactate 29</td><td className="pr-2">~278</td><td className="pr-2">~6.5</td>
                    <td>Lactate metabolised to bicarbonate; mildly hypotonic — avoid in TBI</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-2 font-medium text-foreground">Plasma-Lyte 148</td>
                    <td className="pr-2">140</td><td className="pr-2">98</td><td className="pr-2">5</td><td className="pr-2">Mg 1.5</td><td className="pr-2">Acetate 27 + gluconate 23</td><td className="pr-2">~295</td><td className="pr-2">~7.4</td>
                    <td>No calcium — compatible with blood products</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-2 font-medium text-foreground">5% dextrose</td>
                    <td className="pr-2">0</td><td className="pr-2">0</td><td className="pr-2">0</td><td className="pr-2">None</td><td className="pr-2">—</td><td className="pr-2">~278</td><td className="pr-2">~4</td>
                    <td>Free water — no plasma volume expansion; hyponatraemia risk</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2 font-medium text-foreground">4–5% human albumin</td>
                    <td className="pr-2">~140</td><td className="pr-2">~128</td><td className="pr-2">—</td><td className="pr-2">—</td><td className="pr-2">—</td><td className="pr-2">~300</td><td className="pr-2">~7</td>
                    <td>Colloid oncotic effect; contraindicated in traumatic brain injury</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-gdft" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Goal-Directed Fluid Therapy (GDFT)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Individualised fluid administration guided by haemodynamic monitoring to optimise stroke volume and tissue oxygen delivery. Reduces complications after major surgery.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Stroke Volume Optimisation</p>
                <p className="text-sm text-muted-foreground mt-1">250 ml fluid challenges. Measure SV response with oesophageal Doppler, LiDCO, or FloTrac. If SV rises by ≥10% → fluid responsive → repeat. If {'<'}10% → stop fluids.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Dynamic Parameters</p>
                <p className="text-sm text-muted-foreground mt-1">PPV, SVV (arterial waveform analysis). Reliable only in sinus rhythm + controlled ventilation + VT ≥8 ml/kg. PLR test for spontaneous breathing.</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border mt-4">
              <p className="font-semibold text-foreground text-sm">De-resuscitation — the "Evacuation" phase of ROSE</p>
              <p className="text-sm text-muted-foreground mt-1">
                A cumulative positive fluid balance is not benign: it is associated with prolonged mechanical ventilation, impaired oxygenation, gut oedema and ileus, acute kidney injury, and increased mortality. GDFT should therefore include active planning for fluid removal, not only fluid administration. <InlineRef topicId="perioperative-fluids" refLabel="Front Med Fluids 2025" />
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong className="text-foreground">Triggers to switch from filling to removal:</strong> resolving shock, successful weaning of vasopressors, and a positive cumulative balance with clinical oedema or venous congestion.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong className="text-foreground">Methods:</strong> allow spontaneous diuresis where renal function permits; loop diuretics; albumin plus a diuretic in hypoalbuminaemia to sustain oncotic pull; ultrafiltration or renal replacement therapy when diuretics fail or in established AKI/oliguria.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Aim for a net-even or negative fluid balance before critical care discharge, balanced against ongoing haemodynamic stability — the restrictive-versus-liberal debate (RELIEF) shows this must be individualised rather than protocol-driven at either extreme. <InlineRef topicId="perioperative-fluids" refLabel="RELIEF 2018" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="section-rose" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Phases of Fluid Therapy — the ROSE Model">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Fluid therapy is not a single decision but progresses through distinct phases across an illness or perioperative course. The ROSE model (Resuscitation, Optimisation, Stabilisation, Evacuation) frames when to give fluid, when to titrate it, and when to actively remove it.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Resuscitation (salvage)</p>
                <p className="text-sm text-muted-foreground mt-1">Life-threatening hypoperfusion/profound shock. Rapid boluses (e.g. 250–500 mL crystalloid) to restore macrocirculatory perfusion — minutes to hours.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Optimisation</p>
                <p className="text-sm text-muted-foreground mt-1">Titrate fluid using GDFT and dynamic indices — SVV/PPV &gt;13%, or stroke volume rise ≥10% after a fluid bolus or passive leg raise — to optimise tissue oxygen delivery.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Stabilisation</p>
                <p className="text-sm text-muted-foreground mt-1">Maintenance fluid plus replacement of ongoing losses only; aim for a neutral cumulative balance rather than further expansion.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Evacuation (de-resuscitation)</p>
                <p className="text-sm text-muted-foreground mt-1">Once stable, actively remove excess fluid (diuretics or ultrafiltration/RRT) to limit fluid-overload harm — oedema, ileus, impaired wound and anastomotic healing.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Failure to progress through these phases — continuing "resuscitation-style" boluses into stabilisation, or never actively de-resuscitating — is a major driver of fluid-overload morbidity seen in trials such as RELIEF and underlies GDFT protocols. <InlineRef topicId="perioperative-fluids" refLabel="Front Med Fluids 2025" /> <InlineRef topicId="perioperative-fluids" refLabel="RELIEF 2018" /> <InlineRef topicId="perioperative-fluids" refLabel="BJA Educ GDFT 2016" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-paediatric-fluids" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Fluid Management in ERAS Protocols">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Fluid therapy is a core ERAS element: the aim is a patient who arrives in theatre euvolaemic and leaves it in <strong>zero fluid balance</strong>, without the salt and water excess that drives ileus, tissue oedema and impaired anastomotic healing. <InlineRef topicId="perioperative-fluids" refLabel="JCM Crystalloids 2023" />
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-3">
              <li><strong>Preoperative</strong>: avoid prolonged fasting (clear fluids until 2 h, solids 6 h), give carbohydrate-loading maltodextrin drinks up to 2 h before induction to reduce insulin resistance and thirst, and avoid mechanical bowel preparation (or replace losses with a balanced crystalloid if it is unavoidable). Patients then need little or no "catch-up" fluid at induction.</li>
              <li><strong>Intraoperative</strong>: a balanced crystalloid at roughly 1–3 mL/kg/h as maintenance, plus replacement of measured blood and third-space-free losses, titrated by goal-directed therapy in major or high-risk surgery. Do not give prophylactic volume for a notional "third space" — this concept is not supported by modern evidence. Treat vasodilatory hypotension from neuraxial block or anaesthetic agents with a vasopressor, not with repeated fluid boluses.</li>
              <li><strong>Postoperative</strong>: stop routine maintenance infusions early; encourage oral fluids and diet on the day of surgery, remove cannulae and catheters promptly, and prescribe fluid only for a documented deficit or ongoing loss. Weigh patients daily on prolonged pathways — a rising weight signals cumulative positive balance.</li>
              <li><strong>Glycocalyx link</strong>: large crystalloid volumes cause hypervolaemia-induced ANP release, which sheds the endothelial glycocalyx and increases capillary leak — so the ERAS "zero balance" approach is glycocalyx-protective as well as physiologically restrained. <InlineRef topicId="perioperative-fluids" refLabel="Chappell 2019 (Glycocalyx)" /></li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-paediatric-fluids-eras" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Paediatric Fluid Management">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Maintenance fluid requirements in children are calculated using the Holliday–Segar 4-2-1 rule: 4 mL/kg/h for the first 10 kg, 2 mL/kg/h for the next 10 kg, and 1 mL/kg/h for each kg thereafter.
            </p>
            <div className="p-4 rounded-lg border border-border mb-3">
              <p className="text-sm font-semibold text-foreground">Worked example — 22 kg child</p>
              <p className="text-sm text-muted-foreground mt-1">
                First 10 kg: 10 × 4 = 40 mL/h. Next 10 kg: 10 × 2 = 20 mL/h. Remaining 2 kg: 2 × 1 = 2 mL/h. Total = 40 + 20 + 2 = <strong className="text-foreground">62 mL/h</strong>.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Historically, hypotonic maintenance fluids (0.18% saline/4% dextrose) were used, but these caused a wave of iatrogenic hyponatraemia and hyponatraemic encephalopathy. The mechanism is non-osmotic ADH release driven by surgical stress, pain, nausea and opioids, which promotes free-water retention — administering hypotonic fluid in this state produces dilutional hyponatraemia. <InlineRef topicId="perioperative-fluids" refLabel="BJA Paediatric Fluids 2006" />
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Current NICE CG174 and APAGBI guidance therefore recommends isotonic balanced/crystalloid solutions (e.g. Plasma-Lyte, Hartmann's) for both maintenance and replacement in children, with glucose added where hypoglycaemia risk is significant (e.g. neonates and infants, or prolonged fasting). Postoperatively, maintenance is often restricted to 50–70% of calculated requirement, with regular monitoring of serum sodium to detect evolving hyponatraemia early. <InlineRef topicId="perioperative-fluids" refLabel="NICE CG174" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-fluid-tolerance" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Assessing Fluid Tolerance and Venous Congestion">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Fluid responsiveness (a rise in stroke volume with a bolus) does not equal fluid requirement. Exceeding a patient's fluid tolerance causes harm even when they remain "fluid responsive": congestive nephropathy, hepatic congestion, gut oedema and ileus, and impaired wound/anastomotic healing.
            </p>
            <div className="p-4 rounded-lg border border-border mb-3">
              <p className="text-sm font-semibold text-foreground">VExUS grading (Venous Excess Ultrasound)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Combines IVC diameter with Doppler of the hepatic vein (systolic flow reversal), portal vein (pulsatility fraction &gt;30–50%), and intrarenal vein (biphasic → monophasic flow) to grade venous congestion and guide de-resuscitation decisions.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Guyton's framing is useful conceptually: organ perfusion pressure = MAP − CVP (or venous pressure). Raising CVP with further fluid, without a corresponding rise in MAP, narrows the perfusion pressure gradient and can worsen organ perfusion despite an apparently "positive" fluid challenge.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Practical implication: in right ventricular dysfunction or established venous congestion, further boluses risk worsening RV distension and downstream congestion — prefer a vasopressor/inotrope to support MAP and consider active de-resuscitation (diuretics/ultrafiltration) rather than continued fluid loading. <InlineRef topicId="perioperative-fluids" refLabel="Front Med Fluids 2025" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-glycocalyx" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Glycocalyx & Revised Starling">
            <DiagramSection
              title="Glycocalyx — Intact vs Shed"
              intro={<p>Cross-section of the endothelial surface layer (ESL): proteoglycan / GAG mesh that excludes plasma proteins, and the consequences of its shedding by ANP, inflammation and crystalloid overload.</p>}
            >
              <GlycocalyxDiagram />
            </DiagramSection>
            <GlycocalyxSheddingCascadeDiagram />
            <p className="text-muted-foreground leading-relaxed mb-3 mt-4">
              The endothelial glycocalyx is a carbohydrate-rich layer lining the vascular endothelium. It regulates vascular permeability, prevents leucocyte adhesion, and modulates coagulation.
            </p>
            <div className="p-4 rounded-lg border border-border mb-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Revised Starling:</strong> Fluid filtration occurs across the glycocalyx, not at the capillary level. The sub-glycocalyx oncotic pressure (not interstitial) opposes filtration. There is no venous reabsorption in most tissues — lymphatic drainage returns filtered fluid.
                <br /><br />
                <strong className="text-foreground">Clinical implication:</strong> Fluid overload, inflammation, ANP, and surgical stress damage the glycocalyx → increased permeability → oedema. Avoid hypervolaemia — it sheds the glycocalyx via ANP release.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-special-populations" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Fluid Management in Special Populations">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Neurosurgery / TBI</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Target euvolaemia and normo-osmolality. Avoid hypotonic and glucose-containing fluids — both risk cerebral oedema. Isotonic saline is preferred over mildly hypotonic balanced solutions such as Hartmann's. Albumin is contraindicated (SAFE-TBI showed increased mortality).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Cardiac surgery</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Both hypovolaemia and fluid overload cause harm. The crystalloid-versus-colloid debate persists; synthetic colloids/starches carry an increased risk of renal replacement therapy without efficacy benefit over crystalloid. <InlineRef topicId="perioperative-fluids" refLabel="CCM Tetrastarch 2013" />
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Burns</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Large resuscitation volumes guided by the Parkland formula (2–4 mL/kg per %TBSA in the first 24 h, half given in the first 8 h). Crystalloid is preferred. Watch for "fluid creep" — over-resuscitation causing abdominal compartment syndrome — and monitor for rhabdomyolysis.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-key-fluid-trials" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Key Fluid Trials">
            <div className="space-y-2">
              {[
                { trial: "SAFE (2004)", result: "4% albumin vs 0.9% NaCl in ICU — no difference in 28-day mortality. Albumin harmful in TBI (SAFE-TBI subgroup)." },
                { trial: "SPLIT (2015)", result: "Balanced crystalloid (Plasmalyte) vs 0.9% NaCl in ICU — no difference in AKI. But underpowered." },
                { trial: "SMART (2018)", result: "Balanced crystalloids vs 0.9% NaCl — balanced crystalloids reduced composite of death, new RRT, or persistent renal dysfunction (MAKE30)." },
                { trial: "BaSICS (2021)", result: "Balanced vs saline AND slow vs fast infusion in ICU — no difference in 90-day mortality." },
                { trial: "RELIEF (2018)", result: "Restrictive vs liberal IV fluid regimen in major abdominal surgery — restrictive increased AKI. Liberal (but not excessive) approach preferred." },
              ].map((t) => (
                <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Balanced crystalloids (Plasma-Lyte, Hartmann's) preferred over 0.9% saline — large volumes of saline cause hyperchloraemic acidosis and AKI (SMART, SALT-ED).",
              'Avoid HES/starch colloids in critically ill and septic patients (CHEST, 6S) — increased AKI and mortality.',
              'Maintenance: 1–2 mL/kg/h in adults; 4-2-1 rule in paediatrics with isotonic fluid (NICE CG174) — hypotonic fluids cause hyponatraemia.',
              'Goal-directed fluid therapy using dynamic indices (SVV, PPV, stroke-volume response) outperforms CVP — CVP is a poor predictor of fluid responsiveness.',
              'Restrictive vs liberal: RELIEF trial showed restrictive regimens increase AKI — aim for zero-balance / modestly positive intraoperatively.',
              'Albumin 4–5% reasonable for cirrhotic SBP and large-volume paracentesis; avoid in TBI (SAFE — increased mortality).',
            ]}
          />
          <TopicFaqs faqs={perioperativeFluidsFaqs} />
        </>
      }
      workedExamples={[
        {
          title: "Fluid challenge in a hypotensive post-op patient",
          scenario: "A 70 kg man, day 1 after major colorectal surgery, is hypotensive (MAP 58 mmHg), HR 105, urine output 0.3 ml/kg/h. Lactate 3.1. He is in sinus rhythm and ventilated VT 8 ml/kg.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Assess fluid responsiveness using a dynamic index — PPV/SVV from arterial line. PPV &gt;13% suggests responsiveness.</li>
                <li>Give a 250 ml balanced crystalloid (Hartmann's/Plasmalyte) bolus over &lt;10 min — avoid 0.9% NaCl (SMART: ↑MAKE30).</li>
                <li>Reassess SV/MAP/lactate after 10–15 min. If SV rises ≥10% → responsive → repeat. If &lt;10% → stop fluids; consider noradrenaline.</li>
                <li>Aim for cumulative balance avoiding excess (RELIEF: overly restrictive ↑AKI; overly liberal ↑ileus, oedema).</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>PPV/SVV unreliable in spontaneous breathing, AF, or VT &lt;8 ml/kg — use PLR instead.</li>
                  <li>Repeated 0.9% NaCl boluses → hyperchloraemic acidosis, masking true lactate trend.</li>
                  <li>Chasing CVP — static pressures poorly predict fluid responsiveness.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Balanced crystalloid 250 ml challenge guided by SV/PPV; switch to noradrenaline once not fluid-responsive.",
          cites: ["SMART 2018", "RELIEF 2018", "BJA Educ GDFT 2016"],
        },
      ]}
      keyPoints={[
        { text: "Only 25% of crystalloid stays intravascular — colloids have better volume expansion", cites: ["BJA Educ 2017"] },
        { text: "0.9% NaCl causes hyperchloraemic acidosis — balanced crystalloids preferred (SMART trial)", cites: ["SMART 2018", "NICE CG174"] },
        { text: "GDFT: SV optimisation with 250ml challenges — stop when SV rise <10%", cites: ["BJA Educ GDFT 2016"] },
        { text: "Glycocalyx damage (inflammation, hypervolaemia, ANP) increases vascular permeability", cites: ["BJA Educ 2017"] },
        { text: "RELIEF trial: overly restrictive fluids increase AKI — aim for individualised, goal-directed approach", cites: ["RELIEF 2018"] },
      
      ]}
    />
  );
};

export default PerioperativeFluidsTopic;
