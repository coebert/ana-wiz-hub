import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { musculoskeletalDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const tocItems = [
  { id: "section-rheumatoid-arthritis", label: "Rheumatoid Arthritis", group: "Core" },
  { id: "section-ankylosing-spondylitis", label: "Ankylosing Spondylitis", group: "Core" },
  { id: "section-connective-tissue-disease", label: "Connective Tissue Disease", group: "Core" },
  { id: "section-perioperative-drug-therapy", label: "Perioperative Drug Therapy", group: "Pharmacology" },
  { id: "section-spinal-deformity-and-myopathy", label: "Spinal Deformity & Myopathy", group: "Core" },
  { id: "section-airway-and-regional-checklist", label: "Airway & Regional Checklist", group: "Practical" },
];

const objectives = [
  "Describe the multi-system manifestations of rheumatoid arthritis relevant to anaesthesia, including cervical spine, airway, cardiorespiratory and haematological disease.",
  "Assess and manage the cervical spine in rheumatoid arthritis, recognising atlantoaxial and vertical subluxation and planning safe airway instrumentation.",
  "Outline the cardiorespiratory, airway and neuraxial implications of ankylosing spondylitis and connective tissue diseases (systemic sclerosis, SLE, Sjögren, Marfan, Ehlers-Danlos).",
  "Apply current guidance on perioperative management of DMARDs, biologics and JAK inhibitors around elective and emergency surgery.",
  "Plan anaesthesia for patients with spinal deformity and neuromuscular disease, including respiratory assessment and positioning/neuromonitoring considerations.",
];

const keyPoints = [
  {
    text: "Anterior atlantoaxial subluxation is present in up to 25% of long-standing rheumatoid arthritis — anterior atlanto-dental interval > 3 mm on flexion lateral cervical spine X-ray indicates instability; manual in-line stabilisation and awake fibreoptic or videolaryngoscopic intubation should be considered.",
    cites: ["BJA Educ Rheumatoid 2019"],
  },
  {
    text: "Cricoarytenoid arthritis causes hoarseness, stridor and reduced glottic aperture — anticipate a smaller tracheal tube and possible postoperative stridor.",
    cites: ["BJA Educ Rheumatoid 2019"],
  },
  {
    text: "Ankylosing spondylitis produces a fixed flexion deformity of the cervicothoracic spine, restrictive ventilatory defect, aortic regurgitation with conduction block, and a spine that fractures easily with minimal trauma — awake intubation and a front-of-neck access plan should be considered even for emergency surgery.",
    cites: ["BJA Educ AS 2015", "DAS 2015"],
  },
  {
    text: "Systemic sclerosis threatens the airway (reduced mouth opening, microstomia), the vasculature (Raynaud phenomenon, difficult IV/arterial access), the gut (oesophageal dysmotility — aspiration risk), the lungs (interstitial lung disease, pulmonary hypertension) and the kidney (scleroderma renal crisis, precipitated by high-dose corticosteroid).",
    cites: ["BJA Educ Rheumatoid 2019"],
  },
  {
    text: "Methotrexate, hydroxychloroquine and sulfasalazine should be continued perioperatively; biologic agents are withheld for one full dosing interval with surgery timed for the end of that interval; JAK inhibitors (e.g. tofacitinib, baricitinib) are stopped 3 days before surgery because of thrombosis and infection risk.",
    cites: ["ACR/ASHP Perioperative 2022", "BSR Biologics 2019"],
  },
  {
    text: "Chronic corticosteroid use requires perioperative steroid cover according to usual dose and surgical stress, because of HPA-axis suppression.",
    cites: ["ACR/ASHP Perioperative 2022"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Rheumatoid arthritis for elective shoulder arthroplasty",
    scenario:
      "A 64-year-old woman with 20-year history of seropositive rheumatoid arthritis on methotrexate, prednisolone 5 mg OD and adalimumab (fortnightly) presents for total shoulder arthroplasty. She has reduced neck movement, a hoarse voice and mild dyspnoea on exertion.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Cervical spine assessment: obtain flexion/extension lateral cervical spine X-rays — anterior atlanto-dental interval &gt; 3 mm indicates atlantoaxial instability; assess for vertical (basilar) subluxation and subaxial disease.
          </li>
          <li>
            Airway assessment: temporomandibular joint restriction, reduced mouth opening, cricoarytenoid arthritis (hoarseness/stridor) — anticipate a smaller tracheal tube and plan for a difficult airway.
          </li>
          <li>
            Systemic review: cardiovascular (pericardial effusion, valve disease), respiratory (pulmonary fibrosis, pleural effusion), anaemia of chronic disease, renal amyloid, Felty syndrome (neutropenia, splenomegaly) — check FBC, U&amp;E, and consider echocardiography if symptomatic.
          </li>
          <li>
            Drug plan: continue methotrexate and prednisolone (with perioperative steroid cover for surgical stress); withhold adalimumab for one dosing interval (2 weeks) and time surgery for the end of that interval per ACR/ASHP guidance <InlineRef topicId="musculoskeletal-disease" refLabel="ACR/ASHP Perioperative 2022" />.
          </li>
          <li>
            Airway plan: if instability or restricted movement present, use manual in-line stabilisation, awake fibreoptic or videolaryngoscopic intubation rather than direct laryngoscopy with neck extension.
          </li>
          <li>
            Positioning and access: fragile skin — careful padding and taping; anticipate technically difficult vascular access; consider interscalene block for analgesia with care regarding coexisting respiratory reserve.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Extending the neck for direct laryngoscopy without excluding atlantoaxial instability — risk of cord compression/quadriplegia.</li>
            <li>Stopping methotrexate "to reduce infection risk" — current evidence favours continuation; it is the biologic that is withheld.</li>
            <li>Forgetting steroid cover in a patient on long-term low-dose prednisolone.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Image the cervical spine in flexion to exclude atlantoaxial subluxation, plan awake fibreoptic or videolaryngoscopic intubation with manual in-line stabilisation if unstable, continue methotrexate and prednisolone (with stress-dose cover), withhold adalimumab for one dosing interval, and anticipate multi-system disease (cardiorespiratory, haematological, skin fragility).",
    cites: ["BJA Educ Rheumatoid 2019", "ACR/ASHP Perioperative 2022"],
  },
  {
    title: "Ankylosing spondylitis for emergency laparotomy",
    scenario:
      "A 48-year-old man with long-standing ankylosing spondylitis (fixed cervicothoracic kyphosis, chin-on-chest deformity) presents with a perforated viscus requiring emergency laparotomy. He has known aortic regurgitation.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Anticipate a grade 3-4 laryngoscopic view due to fixed flexion deformity — despite the emergency, plan for awake fibreoptic intubation or videolaryngoscopy with a surgeon/ENT available for front-of-neck access <InlineRef topicId="musculoskeletal-disease" refLabel="DAS 2015" />.
          </li>
          <li>
            Assess cardiac disease: aortic regurgitation and possible conduction block (first-degree AV block, complete heart block) — 12-lead ECG and, time permitting, focused echocardiography; have pacing available.
          </li>
          <li>
            Restrictive ventilatory defect from costovertebral fusion — reduced chest wall compliance, high risk of rapid desaturation; preoxygenate carefully and plan for a smooth, rapid controlled intubation sequence given full stomach/emergency context, balanced against airway difficulty (modified rapid sequence with videolaryngoscopy).
          </li>
          <li>
            Neuraxial technique is not first-line for GA induction in an emergency laparotomy, but if considered for postoperative analgesia, anticipate a technically difficult paramedian or ultrasound-guided approach due to calcified interspinous ligaments and ossified spine, and a higher risk of spinal fracture with positioning — handle and position with extreme care, maintaining the patient's fixed spinal alignment.
          </li>
          <li>
            Exclude cauda equina and atlantoaxial involvement if there are neurological symptoms, and document baseline neurology before positioning.
          </li>
          <li>
            Postoperative: HDU/ICU given restrictive respiratory disease and cardiac risk; early mobilisation and chest physiotherapy.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Attempting standard rapid sequence induction with direct laryngoscopy — the fixed flexed spine makes this a predictable failed airway.</li>
            <li>Forcing spinal extension for positioning or intubation — risk of vertebral fracture in the ossified, brittle spine.</li>
            <li>Missing conduction abnormalities associated with aortic root disease.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Plan awake fibreoptic intubation or videolaryngoscopy with front-of-neck access backup, assess for aortic regurgitation/conduction block with pacing available, anticipate a restrictive ventilatory defect, avoid forced spinal manipulation because of fracture risk, and expect a technically difficult neuraxial approach if used for analgesia.",
    cites: ["BJA Educ AS 2015", "DAS 2015"],
  },
];

const musculoskeletalDiseaseFaqs: Array<[string, string]> = [
  [
    "What cervical spine finding indicates atlantoaxial instability in rheumatoid arthritis?",
    "An anterior atlanto-dental interval > 3 mm on a lateral cervical spine X-ray in flexion indicates anterior atlantoaxial subluxation; vertical (basilar) subluxation, where the odontoid migrates upward into the foramen magnum, is the most dangerous and life-threatening variant. Flexion/extension imaging should be obtained before elective surgery in patients with long-standing disease and neck symptoms.",
  ],
  [
    "How should biologic and JAK-inhibitor therapy be managed before elective surgery?",
    "Biologics (e.g. TNF-α inhibitors such as adalimumab/infliximab, IL-6 inhibitors) are withheld for one full dosing interval, with surgery timed for the end of that interval to minimise both infection/wound-healing risk and disease flare. JAK inhibitors (tofacitinib, baricitinib, upadacitinib) are stopped 3 days before surgery because of thrombosis and infection risk. Methotrexate, hydroxychloroquine and sulfasalazine are continued throughout.",
  ],
  [
    "Why is systemic sclerosis a particular anaesthetic challenge?",
    "It affects nearly every system relevant to anaesthesia: microstomia limits mouth opening and airway access; Raynaud phenomenon and skin/vascular fibrosis make peripheral and arterial access difficult (avoid unnecessary cannulation, keep the patient warm); oesophageal dysmotility increases aspiration risk; interstitial lung disease and pulmonary hypertension increase perioperative respiratory and cardiac risk; and scleroderma renal crisis can be precipitated by high-dose corticosteroids and hypotension.",
  ],
  [
    "What respiratory parameters guide risk assessment before scoliosis surgery?",
    "A restrictive ventilatory defect develops as the Cobb angle increases; forced vital capacity (FVC) < 40% predicted is associated with a significant risk of prolonged postoperative ventilation, and FVC < 70% predicted warrants careful preoperative respiratory assessment. Neuromuscular scoliosis (e.g. Duchenne muscular dystrophy) carries additional risks of cardiomyopathy, malignant hyperthermia susceptibility (avoid suxamethonium and volatile agents in dystrophinopathies) and a blunted cough with bulbar weakness.",
  ],
];

const MusculoskeletalDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Musculoskeletal & Rheumatological Disease"
      subtitle="Anaesthetic implications of rheumatoid arthritis, spondyloarthropathy, connective tissue disease and spinal deformity"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="musculoskeletal-disease"
      topicTitle="Musculoskeletal & Rheumatological Disease"
      workedExamples={workedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={musculoskeletalDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_05"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ Rheumatoid 2019", "BJA Educ AS 2015", "ACR/ASHP Perioperative 2022", "BSR Biologics 2019", "BJA Educ Scoliosis 2017"],
        workedExamples: ["BJA Educ Rheumatoid 2019", "ACR/ASHP Perioperative 2022", "BJA Educ AS 2015", "DAS 2015"],
        keyPoints: [
          "BJA Educ Rheumatoid 2019",
          "BJA Educ AS 2015",
          "DAS 2015",
          "ACR/ASHP Perioperative 2022",
          "BSR Biologics 2019",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Rheumatological and musculoskeletal diseases produce multi-system pathology that spans the airway, cervical spine, cardiorespiratory system, kidneys and skin, and require careful perioperative planning around long-term immunosuppressant and biologic therapy. This topic covers rheumatoid arthritis, ankylosing spondylitis, connective tissue disease, drug management across the perioperative period, and spinal deformity/myopathy.
            </p>

            <TopicTableOfContents items={tocItems} />

            {/* RA */}
            <section id="section-rheumatoid-arthritis" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Rheumatoid Arthritis</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Multi-system Disease</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cardiac: pericardial effusion (often subclinical), valvular disease (mitral/aortic regurgitation), accelerated atherosclerosis and higher perioperative cardiac risk.</li>
                    <li>Respiratory: pulmonary fibrosis, pleural effusion, obliterative bronchiolitis, restrictive or mixed ventilatory defects.</li>
                    <li>Haematological: anaemia of chronic disease; Felty syndrome (rheumatoid arthritis + splenomegaly + neutropenia) increases infection risk.</li>
                    <li>Renal: amyloid (AA amyloidosis) causing nephrotic syndrome/renal impairment; also drug-related nephrotoxicity (NSAIDs, gold, penicillamine historically).</li>
                    <li>Airway: cricoarytenoid arthritis presents with hoarseness, stridor or a sensation of a lump in the throat and reduces the glottic aperture — anticipate a smaller tracheal tube <InlineRef topicId="musculoskeletal-disease" refLabel="BJA Educ Rheumatoid 2019" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cervical Spine Disease</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Anterior atlantoaxial subluxation: anterior atlanto-dental interval (AADI) &gt; 3 mm on lateral flexion X-ray indicates transverse ligament laxity/instability; found in up to 25% of longstanding disease.</li>
                    <li>Vertical (basilar) subluxation: odontoid migrates cephalad into the foramen magnum — the most dangerous variant, risking brainstem compression.</li>
                    <li>Subaxial subluxation ("staircase" deformity) may also occur.</li>
                    <li>Obtain flexion/extension lateral cervical spine imaging before elective surgery in symptomatic or long-standing disease <InlineRef topicId="musculoskeletal-disease" refLabel="BJA Educ Rheumatoid 2019" />.</li>
                    <li>Airway management: manual in-line stabilisation during any laryngoscopy attempt, with a low threshold for awake fibreoptic intubation or videolaryngoscopy to avoid neck extension.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Further Airway, Skin and Access Issues</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Temporomandibular joint involvement limits mouth opening, compounding airway difficulty.</li>
                    <li>Fragile, thin skin (often exacerbated by long-term corticosteroids) — meticulous padding, gentle tape and careful patient handling/positioning to avoid skin tears and pressure injury.</li>
                    <li>Small, deformed peripheral joints and vasculitis make vascular access and neuraxial landmark identification difficult; consider ultrasound guidance for both.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* AS */}
            <section id="section-ankylosing-spondylitis" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ankylosing Spondylitis</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Progressive fixed flexion deformity of the cervicothoracic spine, sometimes to a "chin-on-chest" position — direct laryngoscopy is frequently impossible <InlineRef topicId="musculoskeletal-disease" refLabel="BJA Educ AS 2015" />.</li>
                    <li>Costovertebral and costosternal joint fusion produces a restrictive ventilatory defect with reduced chest wall compliance and reliance on diaphragmatic breathing.</li>
                    <li>Cardiac: ascending aortic dilatation and aortic regurgitation, conduction abnormalities (first-degree AV block through to complete heart block) from fibrosis of the conducting system.</li>
                    <li>Cauda equina syndrome is a recognised late complication.</li>
                    <li>Atlantoaxial involvement can occur, though less commonly than in rheumatoid arthritis.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Airway and Regional Planning</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Anticipate a difficult airway; plan awake fibreoptic intubation or videolaryngoscopy and have a front-of-neck access plan and equipment immediately available <InlineRef topicId="musculoskeletal-disease" refLabel="DAS 2015" />.</li>
                    <li>Neuraxial anaesthesia is technically difficult due to ossified interspinous ligaments and fused facet joints — a paramedian or ultrasound-guided approach may succeed where midline fails.</li>
                    <li>The rigid, osteoporotic spine fractures easily with minimal trauma or forced positioning — handle the spine gently and avoid forced extension.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTD */}
            <section id="section-connective-tissue-disease" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Connective Tissue Disease</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Systemic Sclerosis (Scleroderma)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Microstomia and reduced mouth opening make laryngoscopy and even mask ventilation difficult.</li>
                    <li>Raynaud phenomenon and digital vasculopathy — difficult peripheral/arterial access; keep the patient and theatre warm, avoid unnecessary cannulation attempts and non-invasive BP cycling on affected digits.</li>
                    <li>Oesophageal dysmotility and lower oesophageal sphincter incompetence increase aspiration risk — consider rapid sequence induction/acid prophylaxis.</li>
                    <li>Interstitial lung disease and pulmonary arterial hypertension increase respiratory and right-heart risk; echocardiography and pulmonary function tests preoperatively.</li>
                    <li>Scleroderma renal crisis (malignant hypertension with AKI) can be precipitated by high-dose corticosteroids and perioperative hypotension/hypertension — avoid where possible and treat with ACE inhibitors.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Systemic Lupus Erythematosus</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Antiphospholipid antibodies (lupus anticoagulant, anticardiolipin) create a prothrombotic state — high VTE risk perioperatively despite a prolonged APTT; consider bridging anticoagulation planning.</li>
                    <li>Lupus nephritis may cause chronic kidney disease — dose-adjust renally cleared drugs and avoid nephrotoxins.</li>
                    <li>Pericarditis and Libman-Sacks endocarditis are recognised cardiac manifestations.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Sjögren, Marfan and Ehlers-Danlos Syndromes</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Sjögren syndrome: severe dry eyes/mouth — eye protection and airway humidification, care with mucosal instrumentation.</li>
                    <li>Marfan syndrome: aortic root dilatation/dissection risk, mitral valve prolapse, avoid excessive hypertension and tachycardia; joint hypermobility complicates positioning.</li>
                    <li>Ehlers-Danlos syndrome (particularly vascular type): fragile vasculature and tissue — extreme care with vascular access, arterial lines, and positioning; joint hypermobility and dislocation risk during positioning.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Drug therapy */}
            <section id="section-perioperative-drug-therapy" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Perioperative Drug Therapy</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Corticosteroids</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Chronic corticosteroid use suppresses the hypothalamic-pituitary-adrenal axis — provide perioperative "steroid cover" scaled to usual dose and magnitude of surgical stress, continuing the patient's normal dose plus supplementation as required.</li>
                    <li>Watch for corticosteroid side effects compounding perioperative risk: skin fragility, hyperglycaemia, osteoporosis (fracture risk on positioning), and impaired wound healing.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Conventional DMARDs</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Methotrexate, hydroxychloroquine and sulfasalazine are continued</strong> throughout the perioperative period — stopping increases disease flare risk without a proven reduction in infection <InlineRef topicId="musculoskeletal-disease" refLabel="ACR/ASHP Perioperative 2022" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Biologics and Targeted Therapies</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Biologic agents (TNF-α inhibitors, IL-6 inhibitors, abatacept, rituximab, etc.) are <strong>withheld for one full dosing interval</strong>, with elective surgery timed for the end of that dosing interval to minimise infection and wound-healing complications while limiting time off treatment <InlineRef topicId="musculoskeletal-disease" refLabel="ACR/ASHP Perioperative 2022" /> <InlineRef topicId="musculoskeletal-disease" refLabel="BSR Biologics 2019" />.</li>
                    <li>JAK inhibitors (tofacitinib, baricitinib, upadacitinib) are stopped <strong>3 days before surgery</strong> because of increased venous thromboembolism and infection risk.</li>
                    <li>Restart biologics/JAK inhibitors once the wound is healing satisfactorily and there is no evidence of infection, typically 2 weeks postoperatively.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">NSAIDs and Analgesia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>NSAIDs carry additive renal risk in patients with existing renal impairment (lupus nephritis, amyloid, chronic NSAID use) — use cautiously, ensure adequate hydration, and avoid in scleroderma renal crisis risk or acute kidney injury.</li>
                    <li>Multimodal, opioid-sparing analgesia is preferred given frequent chronic pain and opioid tolerance in these populations.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Spinal deformity */}
            <section id="section-spinal-deformity-and-myopathy" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal Deformity and Myopathy</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Scoliosis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Restrictive ventilatory defect correlates with Cobb angle; FVC &lt; 70% predicted warrants detailed respiratory workup, and FVC &lt; 40% predicted is associated with a high likelihood of predicted postoperative ventilation and prolonged weaning <InlineRef topicId="musculoskeletal-disease" refLabel="BJA Educ Scoliosis 2017" />.</li>
                    <li>Neuromuscular scoliosis (e.g. Duchenne muscular dystrophy, spinal muscular atrophy, cerebral palsy) tends to be more severe, progresses faster and is associated with cardiomyopathy and impaired cough/secretion clearance.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Muscular Dystrophy Cautions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Avoid suxamethonium (risk of hyperkalaemic cardiac arrest) and be alert to susceptibility to volatile-agent-triggered rhabdomyolysis/malignant hyperthermia-like reactions in dystrophinopathies — total intravenous anaesthesia is favoured.</li>
                    <li>Assess for dilated cardiomyopathy and conduction disease preoperatively.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Positioning and Neuromonitoring</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Prone positioning for spinal correction surgery requires careful eye, airway and pressure-point protection; abdomen must hang free to avoid raised intra-abdominal/epidural venous pressure and bleeding.</li>
                    <li>Intraoperative neuromonitoring (motor and somatosensory evoked potentials) constrains the anaesthetic technique — favour total intravenous anaesthesia with minimal neuromuscular blockade to preserve signal quality.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Checklist */}
            <section id="section-airway-and-regional-checklist" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Practical Airway and Regional Checklist</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Assess neck movement, mouth opening and cervical spine stability clinically and, if indicated, with flexion/extension imaging before elective surgery.</li>
                    <li>Have manual in-line stabilisation, videolaryngoscopy and awake fibreoptic equipment available; plan front-of-neck access for high-risk airways per DAS guidance <InlineRef topicId="musculoskeletal-disease" refLabel="DAS 2015" />.</li>
                    <li>Select an appropriately sized (often smaller) tracheal tube if cricoarytenoid or airway narrowing is suspected.</li>
                    <li>Use ultrasound guidance for vascular access and neuraxial techniques in patients with deformed anatomy, fragile skin or ossified ligaments.</li>
                    <li>Handle and position the spine gently in ankylosing spondylitis and osteoporotic disease to avoid fracture; pad pressure points carefully in fragile-skin conditions.</li>
                    <li>Confirm current DMARD/biologic/JAK-inhibitor status and steroid dose at preoperative assessment, and document the perioperative drug plan clearly.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </ExamSection>
      }
    />
  );
};

export default MusculoskeletalDiseaseTopic;
