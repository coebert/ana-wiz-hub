import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const solutionsConcentrationFaqs: Array<[string, string]> = [
  ["What is the difference between osmolarity and osmolality?", "Osmolarity is osmoles per litre of solution (mOsm/L); osmolality is osmoles per kilogram of solvent (mOsm/kg). Plasma values overlap at 285–295, but osmolality is preferred clinically because it is independent of temperature and unaffected by the volume occupied by plasma proteins and lipids."],
  ["Why does 0.9% saline carry a risk of hyperchloraemic acidosis?", "It contains 154 mmol/L Cl⁻ — well above the plasma range of 95–105. Large volumes raise plasma Cl⁻, lowering the strong-ion difference and producing a normal-anion-gap metabolic acidosis. Balanced crystalloids (Hartmann's, Plasma-Lyte) substitute lactate, acetate or gluconate for some Cl⁻ to avoid this."],
  ["How do you convert percentage concentration to mg/mL?", "A 1% solution = 1 g/100 mL = 10 mg/mL. So 2% lidocaine is 20 mg/mL, 0.5% bupivacaine is 5 mg/mL, and 1:200 000 adrenaline (1 g per 200 000 mL) is 5 µg/mL. This conversion is essential when calculating maximum safe local anaesthetic doses from the syringe label."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { InlineRef } from "@/components/references/InlineRef";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { SolutionsConcentrationDiagram } from "@/components/diagrams/chemistry/SolutionsConcentrationDiagram";
import { solutionsConcentrationQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Convert between %, mg/mL, mmol/L and ratio expressions of drug concentration",
  "Define osmolality, osmolarity, tonicity and the osmolar gap, and use them clinically",
  "List the four colligative properties and relate them to particle number rather than identity",
  "Predict cellular volume changes from hypotonic, isotonic and hypertonic solutions",
  "Apply safe-correction principles to acute and chronic hyponatraemia (osmotic demyelination risk)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Adrenaline ratio conversions for anaphylaxis",
    scenario:
      "An adult collapses with anaphylaxis. You have ampoules labelled 1:1,000 and 1:10,000. What concentration is each, and how much do you draw up for the IM dose?",
    working:
      "1:1,000 = 1 g in 1,000 mL = 1 mg/mL.\n1:10,000 = 1 g in 10,000 mL = 100 µg/mL.\nIM dose for an adult = 500 µg = 0.5 mg → 0.5 mL of 1:1,000.\nIV dose during cardiac arrest = 1 mg = 10 mL of 1:10,000.",
    answer:
      "Use 1:1,000 (1 mg/mL) for the IM anaphylaxis dose (0.5 mL = 500 µg). Use 1:10,000 (100 µg/mL) for IV cardiac-arrest doses. Mixing the two up is a classic 'never event' — always re-check the ampoule before administration.",
    cites: ["Cross & Plunkett Ch.3"],
  },
  {
    title: "Calculated osmolarity and the osmolar gap",
    scenario:
      "A patient presents with metabolic acidosis. Na⁺ 140 mmol/L, urea 6 mmol/L, glucose 5 mmol/L. Measured plasma osmolality is 320 mOsm/kg. Is the osmolar gap raised?",
    working:
      "Calculated osmolarity = 2[Na⁺] + [urea] + [glucose] = 2×140 + 6 + 5 = 291 mOsm/L.\nOsmolar gap = measured − calculated = 320 − 291 = 29 mOsm/kg (normal <10).",
    answer:
      "Yes — an osmolar gap of 29 mOsm/kg is markedly raised. Suspect an unmeasured osmole: methanol, ethylene glycol, ethanol, mannitol or propylene glycol. Combined with the metabolic acidosis (high anion gap) this raises ethylene glycol or methanol toxicity; treat with fomepizole (or ethanol) and urgent toxicology input.",
    cites: ["Lobo & Awad 2014"],
  },
];

const SolutionsConcentrationTopic = () => {
  return (
    <TopicTemplate
      title="Solutions & Concentration"
      subtitle="Molarity, osmolality, tonicity, and colligative properties"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="solutions-concentration"
      topicTitle="Solutions & Concentration"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={solutionsConcentrationQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics & Clinical Measurement"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["Severs 2015", "Lobo & Awad 2014", "Cross & Plunkett Ch.3"],
        keyPoints: ["NICE CG174", "Severs 2015", "Cross & Plunkett Ch.3", "Lobo & Awad 2014"],
      }}
      keyPoints={[
        { text: "1% solution = 10 mg/mL. Adrenaline 1:1,000 = 1 mg/mL; 1:10,000 = 100 µg/mL", cites: ["NICE CG174"] },
        { text: "Osmolality (mOsm/kg) is measured; osmolarity (mOsm/L) is calculated. Clinically near-equivalent", cites: ["Severs 2015"] },
        { text: "Normal plasma osmolality 280–295 mOsm/kg. Calculated = 2[Na⁺] + [urea] + [glucose]", cites: ["Cross & Plunkett Ch.3"] },
        { text: "Tonicity considers only non-membrane-permeable solutes. 5% dextrose is hypotonic in vivo", cites: ["Lobo & Awad 2014"] },
        { text: "Osmolar gap >10 → suspect methanol, ethylene glycol, ethanol or mannitol", cites: ["NICE CG174"] },
        { text: "Colligative properties (BP elevation, FP depression, osmotic pressure, VP lowering) depend on particle number, not type", cites: ["Severs 2015"] },
        { text: "Hyponatraemia → cellular oedema. Correct slowly (<10 mmol/24h) to avoid osmotic demyelination syndrome", cites: ["Cross & Plunkett Ch.3"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Solutions in Anaesthetic Practice" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Every drug you administer is a solution. Understanding concentration units, osmolality, and tonicity is essential
              for safe prescribing and fluid management. Errors in concentration calculations (particularly with adrenaline and
              insulin) are a significant cause of drug errors in anaesthesia and remain a UK 'never event'.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Interactive Diagram">
            <SolutionsConcentrationDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="concentration-units" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RCoA Primary — Clinical Measurement"]}>
            <CollapsibleSubsection title="Concentration Units">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Percentage (% w/v)</strong> = grams of solute per 100 mL of solution. So 1% = 10 mg/mL, 0.9% NaCl = 9 mg/mL.
                <strong> Ratio (e.g. 1:1,000)</strong> expresses parts of solute to parts of total solution by weight/volume:
                1:1,000 = 1 g in 1,000 mL = 1 mg/mL. <strong>Molarity (mol/L)</strong> normalises by particle number; 1 mole of NaCl
                dissociates into 2 osmoles, which is why osmolarity ≠ molarity for electrolytes.
              </p>
              <p>
                Common pitfalls: lidocaine 2% = 20 mg/mL (not 2 mg/mL); bupivacaine 0.25% = 2.5 mg/mL; phenylephrine 100 µg/mL
                is a dilution of the 10 mg/mL ampoule (1 mL into 100 mL).
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="molarity-molality" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Molarity and Molality">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Molarity</strong> (mol/L) expresses moles of solute per litre of <em>solution</em>. Because it is defined
                by volume, molarity is temperature- and pressure-dependent — a solution's volume expands slightly on warming,
                subtly reducing its molarity. <strong>Molality</strong> (mol/kg) expresses moles of solute per kilogram of
                <em> solvent</em>, a mass-based quantity unaffected by temperature or pressure.
              </p>
              <p>
                In dilute aqueous clinical solutions the two are numerically very similar, since the density of water is
                approximately 1 kg/L. This is why plasma osmolality (mOsm/kg, the value a laboratory osmometer actually measures
                by freezing-point depression) and calculated osmolarity (mOsm/L) are often used interchangeably at the bedside,
                even though osmolality is the physically correct, temperature-independent unit and the standard in physical
                chemistry and laboratory osmometry.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="osmolality-tonicity" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Osmolality, Osmolarity & Tonicity">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Osmolality</strong> (mOsm/kg of solvent) is what an osmometer measures by freezing-point depression.
                <strong> Osmolarity</strong> (mOsm/L of solution) is calculated. In dilute aqueous solutions the two are nearly
                identical. Normal plasma osmolality is 280–295 mOsm/kg.
              </p>
              <p>
                <strong>Tonicity</strong> considers only solutes that cannot cross the cell membrane (effective osmoles). 5% dextrose
                is iso-osmolar in the bag but hypotonic in vivo because glucose is metabolised, leaving free water that distributes
                across all body compartments. Hartmann's is mildly hypotonic (osmolarity 278 mOsm/L) and 0.9% saline is iso-osmotic
                (308 mOsm/L) but causes hyperchloraemic acidosis with large volumes.
              </p>
              <p>
                Whether a solute actually contributes to tonicity depends on its <strong>reflection coefficient (σ)</strong> — a
                dimensionless measure, ranging from 0 to 1, of how effectively a membrane restricts that solute's passage. A σ of
                <strong> 0</strong> means the membrane offers no restriction (the solute crosses freely and cannot sustain an
                osmotic gradient); a σ of <strong>1</strong> means the membrane is completely impermeable to it (it exerts its
                full osmotic effect). <strong>Albumin across intact capillary endothelium</strong> and <strong>Na⁺ across cell
                membranes</strong> both have σ ≈ 1, so they contribute fully to oncotic pressure and tonicity respectively. By
                contrast, <strong>urea, ethanol, methanol and glycerol</strong> have σ ≈ 0: they equilibrate freely across cell
                membranes, so although they raise <em>measured osmolality</em> (and hence widen the osmolar gap when unmeasured),
                they exert no sustained <em>tonicity</em> and cause no lasting fluid shift — this is precisely why urea is excluded
                from the effective osmolarity (tonicity) calculation despite being included in total osmolality. Formally,
                <strong> effective osmolarity (tonicity) = Σ σ × concentration</strong>, summed over each solute present. The
                reflection coefficient also appears explicitly in the <strong>Starling and Michel–Weinbaum (revised Starling)
                equations</strong> governing transcapillary fluid flux, and clinically, <strong>glycocalyx damage in sepsis and
                critical illness lowers σ for albumin</strong> across the capillary wall, allowing protein to leak into the
                interstitium and promoting oedema despite an unchanged plasma albumin concentration.
                <InlineRef topicId="solutions-concentration" refLabel="Cross & Plunkett Ch.3" />
                <InlineRef topicId="solutions-concentration" refLabel="Severs 2015" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="osmolar-gap" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Calculated Osmolarity & The Osmolar Gap">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Calculated osmolarity = 2[Na⁺] + [urea] + [glucose]</strong> (all in mmol/L). The factor of 2 accounts for
                the accompanying anion (mainly Cl⁻ and HCO₃⁻). The <strong>osmolar gap</strong> = measured − calculated; normally
                &lt;10 mOsm/kg.
              </p>
              <p>
                A raised osmolar gap suggests an <strong>unmeasured osmole</strong>: methanol, ethylene glycol, ethanol, mannitol,
                propylene glycol (a vehicle in lorazepam and phenytoin infusions) or isopropanol. Combined with a high anion-gap
                metabolic acidosis, methanol or ethylene glycol toxicity should be suspected and treated empirically with fomepizole.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="colligative" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Colligative Properties">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Colligative properties depend on the <strong>number</strong> of dissolved particles, not their identity. The four
                are: <strong>boiling-point elevation, freezing-point depression, osmotic pressure</strong>, and <strong>vapour-pressure
                lowering</strong>. Freezing-point depression is exploited by clinical osmometers; osmotic pressure underlies fluid
                shifts across capillary and cellular membranes.
              </p>
              <p>
                <strong>Osmotic pressure</strong> is described quantitatively by <strong>van't Hoff's law, π = nCRT</strong> (or
                equivalently π = iMRT), where π is osmotic pressure, C (or M) is molar concentration, R is the gas constant, T is
                absolute temperature and n (or i, the van't Hoff factor) is the number of particles produced per mole of solute —
                the formula is analogous to the ideal gas law and treats dissolved particles as if exerting pressure on a
                semi-permeable membrane. <strong>Oncotic (colloid osmotic) pressure</strong> is the fraction of total plasma osmotic
                pressure exerted by large, membrane-impermeant plasma proteins — mainly <strong>albumin</strong>, which contributes
                roughly 75–80% of it — and is normally around <strong>25–28 mmHg (≈3.3 kPa)</strong>, small compared with total
                plasma osmotic pressure (~5,600 mmHg) but critical because it is the pressure that opposes capillary hydrostatic
                pressure.
              </p>
              <p>
                <strong>Raoult's law</strong> underlies vapour-pressure lowering: the partial vapour pressure of a solvent
                above a solution equals the mole fraction of solvent multiplied by the vapour pressure of the pure solvent.
                Adding a non-volatile solute therefore lowers the solvent's mole fraction and its vapour pressure, which in
                turn raises the boiling point (more heat is needed to bring vapour pressure up to atmospheric pressure) —
                the mechanistic link between vapour-pressure lowering and boiling-point elevation.
              </p>
              <p>
                Quantitatively, one <strong>osmole</strong> dissolved in 1 kg of water <strong>depresses the freezing point by
                1.86 °C</strong> and <strong>elevates the boiling point by 0.52 °C</strong>, and generates an osmotic pressure of
                approximately <strong>19,300 mmHg (2.58 MPa)</strong> — illustrating just how large osmotic pressure is compared
                with the other colligative effects, and why even small solute concentration differences generate powerful fluid
                shifts across semipermeable membranes. <strong>Oncotic (colloid osmotic) pressure</strong> — the osmotic pressure
                specifically contributed by plasma proteins — is normally around <strong>25–28 mmHg</strong>, of which roughly
                <strong> 65–80% is due to albumin</strong>. <InlineRef topicId="solutions-concentration" refLabel="Cross & Plunkett Ch.3" />
              </p>
              <p>
                The classical <strong>Starling principle</strong> describes net capillary filtration as the balance of hydrostatic
                and oncotic pressure gradients across the capillary wall. The <strong>revised Starling principle</strong>
                incorporates the endothelial glycocalyx layer, showing that the subglycocalyx oncotic pressure (not interstitial
                oncotic pressure) opposes filtration, and that under normal conditions there is little or no absorption at the
                venous end of most capillaries — filtered fluid is instead returned via lymphatics. Clinically, this explains why
                <strong> hypoalbuminaemia</strong> (nephrotic syndrome, liver disease, sepsis, critical illness) lowers oncotic
                pressure and promotes oedema, and why the benefit of infused <strong>colloids</strong> in expanding plasma volume
                is less durable than once assumed once the glycocalyx is damaged (e.g. by inflammation, sepsis, or excessive
                crystalloid administration), allowing colloid to leak into the interstitium.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hyponatraemia" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["FFICM 3.4"]}>
            <CollapsibleSubsection title="Hyponatraemia & Safe Correction">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Acute</strong> hyponatraemia (developing over &lt;48 h, or of clearly documented rapid onset) has not
                allowed brain cells time to adapt: water moves into neurons faster than they can extrude intracellular
                osmolytes, so <strong>cerebral oedema and raised intracranial pressure dominate the risk</strong> — headache,
                seizures, coma, respiratory arrest. <strong>Chronic</strong> hyponatraemia (&gt;48 h, or of unknown duration —
                the default assumption if the timeline is unclear) has allowed neurons to adapt by actively extruding
                organic osmolytes (taurine, glutamate, myo-inositol) to limit cell swelling; because this adaptive buffering
                is lost only slowly on re-expansion, <strong>the risk shifts to osmotic demyelination syndrome (ODS)</strong>
                if serum sodium is corrected too quickly. <InlineRef topicId="solutions-concentration" refLabel="Spasovski 2014 Hyponatraemia" />
              </p>
              <p>
                <strong>Severe, symptomatic</strong> hyponatraemia (seizures, coma, marked obtundation) is a medical
                emergency regardless of chronicity: give <strong>150 mL of 3% NaCl over 20 minutes</strong>, and repeat up
                to <strong>three times</strong>, aiming for either a <strong>5 mmol/L rise</strong> in serum sodium or
                resolution of symptoms — whichever comes first — then stop the hypertonic saline. Thereafter, the
                <strong> total rise must not exceed 10 mmol/L in the first 24 h and 8 mmol/L in any subsequent 24-h period
                </strong>. In patients at <strong>high risk of ODS</strong> — serum Na⁺ &lt;105 mmol/L, chronic alcohol
                excess, malnutrition, hypokalaemia, or advanced liver disease — the correction rate should be limited
                further, to <strong>4–6 mmol/L per 24 h</strong>. <InlineRef topicId="solutions-concentration" refLabel="Spasovski 2014 Hyponatraemia" />
                <InlineRef topicId="solutions-concentration" refLabel="Sterns ODS 2018" />
              </p>
              <p>
                <strong>3% NaCl</strong> contains <strong>513 mmol/L each of Na⁺ and Cl⁻</strong> (osmolarity ≈1026 mosmol/L)
                — roughly 3.3 times the tonicity of plasma — and is markedly irritant to peripheral veins; it should be
                given via central access, or via a well-monitored large peripheral cannula with frequent site checks, with
                sodium re-checked every 2–4 hours during active correction. Always classify by volume status (hypovolaemic,
                euvolaemic, hypervolaemic) and urine osmolality/Na⁺ before treatment; SIADH is the commonest perioperative
                cause of euvolaemic hyponatraemia. <InlineRef topicId="solutions-concentration" refLabel="NICE CG174" />
              </p>
              <p>
                <strong>Sodium deficit (mmol) = TBW × (target [Na⁺] − measured [Na⁺])</strong>, where total body water (TBW) is
                approximated as 0.6 × weight (kg) in men and 0.5 × weight in women, falling further to around 0.5 (men) / 0.45
                (women) in the elderly and in obesity, reflecting reduced lean mass and relatively greater fat (which contains
                little water). For example, a 70 kg man with Na⁺ 118 mmol/L targeted to a safe interim value of 126 mmol/L has
                TBW ≈ 42 L, giving a deficit of 42 × (126 − 118) = 336 mmol that must be replaced gradually, not as a single bolus.
              </p>
              <p>
                The <strong>Adrogué–Madias formula</strong> predicts the change in serum sodium produced by one litre of a given
                infusate: <strong>ΔNa⁺ (per litre infused) = (infusate [Na⁺] − serum [Na⁺]) / (TBW + 1)</strong>, using the same
                weight-based TBW estimate above. It allows the infusion rate to be titrated to stay within the safe correction
                limits, but it assumes a closed, single-compartment system and <strong>ignores ongoing renal or
                gastrointestinal losses</strong> — it therefore <strong>consistently underestimates the actual rise in serum
                sodium</strong> once a spontaneous water diuresis develops (for example, as a suppressed ADH switches off in
                resolving hypovolaemia or once a thiazide is stopped). <InlineRef topicId="solutions-concentration" refLabel="Adrogue & Madias 2000" />
              </p>
              <p>
                This is the basis of the <strong>"desmopressin clamp"</strong>: once the underlying cause of hyponatraemia
                resolves — SIADH remitting, hypovolaemia being corrected, a thiazide being stopped, or hypocortisolism being
                treated — endogenous ADH falls abruptly and a brisk, unpredictable <strong>water diuresis (aquaresis)</strong>
                can drive serum sodium up far faster than intended, risking ODS. Giving <strong>desmopressin 1–2 mcg IV every
                6–8 hours</strong> pharmacologically fixes urine concentration, converting the correction into a controlled
                process that can be titrated safely with hypertonic saline; if overcorrection has already occurred,
                desmopressin can be used as a "rescue" together with <strong>5% dextrose</strong> to re-lower the sodium back
                towards the safe trajectory. <InlineRef topicId="solutions-concentration" refLabel="Sterns ODS 2018" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={solutionsConcentrationFaqs} />
        </>
      }
    />
  );
};

export default SolutionsConcentrationTopic;
