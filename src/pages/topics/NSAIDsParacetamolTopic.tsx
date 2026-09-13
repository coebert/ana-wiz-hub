import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { nsaidsParacetamolQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { NSAIDMechanismDiagram } from "@/components/diagrams/pharmacology/NSAIDMechanismDiagram";
import { AAShuntAnimation } from "@/components/diagrams/pharmacology/AAShuntAnimation";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { AnaesthesiaDosingCallout } from "@/components/perioperative/AnaesthesiaDosingCallout";
import { InlineRef } from "@/components/references/InlineRef";

const nsaidsParacetamolFaqs: Array<[string, string]> = [
  [
    "What is the maximum dose of paracetamol and when must it be reduced?",
    "Standard adult: 1 g qds (4 g/day). Reduce to 75 mg/kg/day (max 3 g/day) if weight <50 kg, chronic alcohol use, malnutrition, hepatic impairment, dehydration, glutathione depletion. IV dose: 15 mg/kg up to 1 g per dose, max 4 g/day in adults >50 kg, infused over 15 min. Toxicity above 150 mg/kg single dose (or >75 mg/kg in high-risk groups)."
  ],
  [
    "What are the contraindications and cautions for NSAID use perioperatively?",
    "Avoid in: renal impairment (eGFR <30), active GI bleeding/ulcer, severe heart failure, allergy/asthma exacerbated by NSAIDs (~10 % of asthmatics), 3rd-trimester pregnancy (premature ductus closure), platelet dysfunction or coagulopathy. Cautious use in elderly, hypovolaemia, ACEi/diuretics (triple whammy → AKI), bariatric surgery (anastomotic leak concerns), and major bone surgery (theoretical impaired healing — evidence weak)."
  ],
  [
    "Outline paracetamol overdose management.",
    "N-acetylcysteine (NAC) is the antidote — replenishes glutathione and detoxifies NAPQI. Use the UK paracetamol treatment nomogram: since 2012 a single treatment line is used, joining 100 mg/L at 4 h to 15 mg/L at 15 h post-ingestion — treat all patients whose plasma level is on or above this line. NAC is also indicated regardless of level for staggered overdose, uncertain/unknown timing, and late presentation with deranged LFTs. Regime: 150 mg/kg over 1 h, 50 mg/kg over 4 h, 100 mg/kg over 16 h. King's College criteria identify need for transplant referral."
  ]
];

const objectives = [
  "Compare COX-1 vs COX-2 selectivity and predict the GI / CV / renal trade-offs of common NSAIDs",
  "Recognise contraindications to perioperative NSAIDs (renal impairment, hypovolaemia, AKI risk, asthma, anticoagulation)",
  "Describe paracetamol metabolism, NAPQI formation, and the role of glutathione",
  "Apply the UK paracetamol treatment nomogram (single treatment line since 2012) and N-acetylcysteine treatment to paracetamol overdose",
  "Identify patients at increased risk of paracetamol hepatotoxicity (enzyme induction, malnutrition, low body weight)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "NSAID risk-benefit after a knee replacement",
    scenario:
      "A 72-year-old man (eGFR 55 mL/min, on ramipril and apixaban) has a primary TKR. The orthopaedic team request ibuprofen 400 mg TDS for postoperative analgesia. How do you respond?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Identify the renal risk profile.</strong> eGFR 55 (CKD stage 3a), age &gt; 65, and an ACE inhibitor on board.</li>
          <li><strong>Apply the 'triple whammy' rule.</strong> NSAID + ACEi/ARB + diuretic-or-volume-depletion → AKI. Surgery itself supplies the third hit (fasting, blood loss, third-spacing).</li>
          <li><strong>Quantify bleeding risk.</strong> Apixaban + NSAID roughly doubles GI bleeding and increases surgical-site bleeding.</li>
          <li><strong>Build the multimodal alternative.</strong> Paracetamol 1 g QDS + LIA at the surgical site + adductor-canal block + low-dose oxycodone PRN.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If eGFR were &gt; 60, no ACEi, no anticoagulant and patient &lt; 65 → short-course NSAID acceptable.</li>
          <li>Always document a stop date (≤ 5 days) when an NSAID is prescribed perioperatively.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Assuming 'topical' or 'PR' diclofenac avoids systemic effects — it doesn't, GFR still falls.</li>
            <li>Forgetting that COX-2 selective drugs (parecoxib) still cause renal injury — selectivity only spares the GI tract.</li>
            <li>Restarting the ACEi the morning of surgery 'because the patient takes it at home'.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Avoid routine NSAIDs in this patient. Use paracetamol, regional analgesia (adductor canal / LIA), and short-course low-dose opioids. Reserve NSAIDs for younger, well-hydrated patients with normal renal function and no anticoagulant — and document a clear stop date.",
   cites: ["Peck & Hill Ch.15"],
  },
  {
    title: "Staggered paracetamol overdose",
    scenario:
      "A 25-year-old woman (50 kg, on phenytoin, malnourished) presents 14 h after a 'staggered' paracetamol overdose totalling 12 g over 6 h. Plasma paracetamol level is 'below the treatment line' on the UK paracetamol treatment nomogram. Do you treat?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Calculate the dose per kg.</strong> 12 g ÷ 50 kg = 240 mg/kg — well above the 150 mg/kg toxic threshold and far above the 75 mg/kg high-risk threshold.</li>
          <li><strong>Test the nomogram's validity.</strong> The UK single-treatment-line nomogram (100 mg/L at 4 h to 15 mg/L at 15 h) is only valid for a single ingestion at a known time (4–15 h post-ingestion). A 6-hour staggered ingestion fails this rule.</li>
          <li><strong>Identify high-risk modifiers.</strong> Phenytoin → CYP2E1 induction → ↑ NAPQI. Malnutrition → glutathione depletion. Low body weight → lower absolute reserve.</li>
          <li><strong>Apply MHRA 2012 guidance.</strong> Treat any staggered overdose ≥ 75 mg/kg/24 h with NAC regardless of paracetamol level.</li>
          <li><strong>Choose the regimen.</strong> Standard 21-h IV NAC: 150 mg/kg over 1 h → 50 mg/kg over 4 h → 100 mg/kg over 16 h. Or SNAP (12 h, lower anaphylactoid rate).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points at 24 h</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Continue NAC</strong> (usually as a repeat of the 16-h bag, 100 mg/kg over 16 h) if at the end of treatment the ALT is still rising, the INR is &gt; 1.3 and rising, there is acidosis or renal impairment, or paracetamol remains detectable. Recheck ALT, INR, creatinine, lactate, pH and paracetamol every 12 h and only stop when ALT is falling, INR ≤ 1.3 and paracetamol is undetectable — clinical improvement alone is not enough.</li>
          <li><strong>Distinguish continuation from transplant referral.</strong> Continuing NAC is a routine biochemical decision; transplant referral is a separate escalation. Refer to a liver transplant centre if King's College Criteria are met (arterial pH &lt; 7.3 or lactate &gt; 3 mmol/L after resuscitation, OR all three of INR &gt; 6.5, creatinine &gt; 300 µmol/L and grade III/IV encephalopathy), and discuss earlier if INR &gt; 3 at 48 h, oliguria, hypoglycaemia or any encephalopathy appears — NAC continues throughout, including during transfer.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Reading a single level off the nomogram for a staggered or unknown-time ingestion — NAC is indicated regardless of level in these situations.</li>
            <li>Stopping NAC at 21 h despite ongoing transaminitis or coagulopathy.</li>
            <li>Confusing the anaphylactoid reaction (flush, bronchospasm in first hour) with true allergy — slow the rate, give antihistamine, do not stop permanently.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Treat with N-acetylcysteine immediately — do not rely on the nomogram for staggered overdoses or high-risk patients. Use the standard 21-h IV NAC regimen (or the simplified SNAP protocol) and monitor LFTs, INR, creatinine, lactate and pH at 24 h to guide continuation.",
   cites: ["BJA Educ 2018"],
  },
];

const NSAIDsParacetamolTopic = () => {
  return (
    <TopicTemplate
      title="NSAIDs & Paracetamol"
      subtitle="COX selectivity, perioperative risks, and paracetamol toxicity"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="nsaids-paracetamol"
      topicTitle="NSAIDs & Paracetamol"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={nsaidsParacetamolQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Pharmacology", "RCoA Final — Pain Medicine"] },
        
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Peck & Hill Ch.15",
          "BJA Educ 2018",
        ],
        workedExamples: [
          "NICE Paracetamol OD",
          "BJA Educ 2018",
          "Peck & Hill Ch.15",
        ],
        keyPoints: [
          "Peck & Hill Ch.15",
          "NICE Paracetamol OD",
          "BJA Educ 2018",
        ],
      }}
      keyPoints={[
        { text: "COX-1 = constitutive (GI protection, platelets, renal). COX-2 = inducible (inflammation, pain, fever)", cites: ["Peck & Hill Ch.15"] },
        { text: "Aspirin irreversibly inhibits COX — platelet effect lasts 7-10 days. All other NSAIDs are reversible", cites: ["NICE Paracetamol OD"] },
        { text: "NSAID renal toxicity: ↓ afferent arteriolar PGE₂ → ↓ GFR. High risk with hypovolaemia + ACEi/ARB ('triple whammy')", cites: ["BJA Educ 2018"] },
        { text: "Paracetamol toxicity: NAPQI → glutathione depletion → Zone 3 (centrilobular) hepatic necrosis", cites: ["Peck & Hill Ch.15"] },
        { text: "NAC (N-acetylcysteine) replenishes glutathione — most effective within 8h of paracetamol overdose", cites: ["NICE Paracetamol OD"] },
        { text: "COX-2 selective drugs have ↓ GI risk but ↑ CV risk (prothrombotic: ↓PGI₂ without ↓TXA₂)", cites: ["BJA Educ 2018"] },
        { text: "UK paracetamol treatment nomogram (single line since 2012: 100 mg/L at 4 h to 15 mg/L at 15 h) is invalid for staggered overdoses — treat empirically based on dose/risk factors, with NAC regardless of level", cites: ["Peck & Hill Ch.15"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="nsaid-mechanism" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="NSAIDs — Mechanism of Action" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              NSAIDs inhibit cyclo-oxygenase (COX), blocking conversion of arachidonic acid to prostaglandins and thromboxanes.
              COX-1 is constitutive (GI protection, platelet TXA₂, renal PGE₂); COX-2 is inducible (inflammation, pain, fever).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                  <th className="text-left py-2 text-foreground font-semibold">COX Selectivity</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Aspirin</td><td>Non-selective (irreversible)</td><td>Irreversibly acetylates COX → permanent platelet inhibition (7-10 days). Low dose: antiplatelet. High dose: analgesic</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ibuprofen</td><td>Non-selective (reversible)</td><td>Shortest half-life, good safety profile. Competitive with aspirin for platelet COX-1 binding</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Naproxen</td><td>Non-selective (reversible)</td><td>Half-life 12–17 h → BD dosing (250–500 mg). Lowest cardiovascular risk of the non-aspirin NSAIDs, so preferred when CV risk is the concern; GI risk remains</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Diclofenac</td><td>Slightly COX-2 preferential</td><td>Good analgesic, half-life 1–2 h. ↑ CV risk (especially MI) — comparable to a coxib. Available PO, PR, IM, topical</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ketorolac</td><td>Non-selective</td><td>Potent analgesic (IV/IM). Max 2 days use. ↑ GI bleeding risk</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Parecoxib/Celecoxib</td><td>COX-2 selective</td><td>↓ GI side effects but ↑ CV risk. Parecoxib = IV prodrug of valdecoxib</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <NSAIDMechanismDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="nsaid-adverse" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RCoA Final — Pain Medicine"]}>
            <CollapsibleSubsection title="NSAID Adverse Effects">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>GI</strong>: ↓ PGE₂/PGI₂ → ↓ mucosal protection → ulceration, bleeding. Risk factors: age, H. pylori, steroids, anticoagulants. COX-2 selective drugs have lower GI risk</li>
              <li><strong>Renal</strong>: ↓ afferent arteriolar PGE₂/PGI₂ → loss of compensatory afferent vasodilatation → ↓ renal blood flow and GFR. Can cause Na⁺/H₂O retention, hyperkalaemia, interstitial nephritis and papillary necrosis</li>
              <li><strong>The &lsquo;triple whammy&rsquo;</strong>: glomerular filtration depends on the balance between afferent dilatation (prostaglandin-mediated) and efferent constriction (angiotensin II-mediated). An <em>NSAID</em> removes afferent vasodilatation; an <em>ACE inhibitor or ARB</em> removes efferent vasoconstriction; a <em>diuretic or any volume-depleted state</em> (fasting, bleeding, third-spacing, sepsis) lowers renal perfusion pressure and raises renin. All three together abolish autoregulation of glomerular pressure and cause ischaemic AKI, with roughly a threefold increase in AKI risk and the highest risk in the first 30 days of the combination. Perioperatively surgery itself supplies the third hit, so check eGFR and the drug chart, hold the ACEi/ARB and diuretic where appropriate, keep the patient euvolaemic, avoid NSAIDs in eGFR &lt; 60 with these co-prescriptions, and monitor creatinine and urine output if an NSAID is unavoidable</li>
              <li><strong>Cardiovascular</strong>: COX-2 inhibition ↓ PGI₂ (vasodilator, antiplatelet) without ↓ TXA₂ → prothrombotic state. All NSAIDs carry some CV risk (except aspirin and naproxen)</li>
              <li><strong>Respiratory</strong>: aspirin-exacerbated respiratory disease (AERD) — COX inhibition shunts arachidonic acid to lipoxygenase pathway → ↑ leukotrienes → bronchospasm</li>
              <li><strong>Platelet</strong>: ↓ TXA₂ → ↓ aggregation. Aspirin effect lasts platelet lifespan (7-10 days); others reverse when drug clears</li>
            </ul>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <AAShuntAnimation />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="paracetamol" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Paracetamol (Acetaminophen)">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Mechanism</strong>: not fully understood. Central COX inhibition (COX-3?), serotonergic descending pathways, endocannabinoid system (AM404 metabolite), TRPV1 activation. Weak peripheral anti-inflammatory effect</li>
              <li><strong>PK</strong>: oral bioavailability ~80%, hepatic metabolism (glucuronidation 60%, sulphation 30%, CYP2E1 5% → NAPQI). IV onset ~5 min, peak effect ~1h. Adult dose 1g QDS (max 4g/day)</li>
              <li><strong>Phase II conjugation in detail</strong>: <em>glucuronidation</em> by UGT1A1/1A6/1A9 is the high-capacity, low-affinity route producing paracetamol glucuronide, and <em>sulphation</em> by SULT1A1/1A3 is the high-affinity, low-capacity route producing paracetamol sulphate. Both yield inactive, water-soluble, renally excreted conjugates. Sulphation saturates first because the PAPS (sulphate donor) pool is small, so as the dose rises a greater proportion is glucuronidated and, once that route also saturates, a greater fraction is shunted through CYP2E1 (and CYP1A2/3A4) to NAPQI. Neonates and infants rely more on sulphation (immature UGT), which partly explains their relative resistance to hepatotoxicity; malnutrition, fasting, prolonged illness and chronic alcohol excess deplete glutathione and sulphate reserves and shift the balance toward NAPQI. About 5% is excreted unchanged in urine</li>
              <li><strong>Toxicity</strong>: NAPQI (toxic metabolite) normally conjugated by glutathione. Overdose → glutathione depletion → NAPQI binds hepatocytes → centrilobular necrosis (Zone 3)</li>
              <li><strong>Treatment</strong>: N-acetylcysteine (NAC) — replenishes glutathione. Most effective within 8h. Staggered overdoses are higher risk than single timepoint and are treated with NAC regardless of level. Use the UK paracetamol treatment nomogram: since 2012 a single treatment line joins 100 mg/L at 4 h to 15 mg/L at 15 h post-ingestion — treat all patients on or above this line<InlineRef topicId="nsaids-paracetamol" refLabel="NICE Paracetamol OD" /></li>
              <li><strong>Risk factors for toxicity</strong>: enzyme inducers (phenytoin, rifampicin, alcohol), glutathione depletion (malnutrition, HIV, anorexia), low body weight (&lt;50kg — dose reduce)</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Non-selective NSAIDs inhibit COX-1 (GI mucosa, platelets, renal) and COX-2 (inflammation) — hence gastric, bleeding and renal side effects.",
              "Selective COX-2 inhibitors spare platelets but increase cardiovascular/thrombotic risk; rofecoxib was withdrawn.",
              "Aspirin irreversibly acetylates COX — antiplatelet effect lasts the platelet lifespan (~10 days).",
              "Paracetamol mechanism is incompletely understood — central COX inhibition, TRPV1 and cannabinoid pathways; minimal anti-inflammatory effect.",
              "Paracetamol toxicity: NAPQI overwhelms glutathione → hepatic necrosis; treat with N-acetylcysteine guided by the UK single-treatment-line nomogram (100 mg/L at 4 h to 15 mg/L at 15 h), using the 150 mg/kg loading dose over 1 h.",
            ]}
          />
          <TopicFaqs faqs={nsaidsParacetamolFaqs} />

          <AnaesthesiaDosingCallout focus="non-opioid multimodal analgesia" />
        </>
      }
    />
  );
};

export default NSAIDsParacetamolTopic;
