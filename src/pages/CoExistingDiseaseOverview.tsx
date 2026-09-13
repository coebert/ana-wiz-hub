import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Search, Stethoscope } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { PageJsonLd } from "@/components/layout/PageJsonLd";

interface OverviewEntry {
  id: string;
  title: string;
  examTags: string[];
  keyPoints: string[];
}

const EXAM_LABEL: Record<string, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
  edic: "EDIC",
};

const ENTRIES: OverviewEntry[] = [
  {
    id: "cardiovascular-disease",
    title: "Cardiovascular Co-Existing Disease",
    examTags: ["primary", "final", "fficm"],
    keyPoints: [
      "Ischaemic heart disease: identify recent MI/stent, continue aspirin, manage dual antiplatelet therapy by bleeding vs thrombotic risk",
      "Heart failure: phenotypes (HFrEF/HFpEF), optimisation before surgery, avoid myocardial depression and fluid overload",
      "Valvular disease: severity thresholds, goals for aortic stenosis (sinus rhythm, avoid hypotension) vs regurgitant lesions",
      "Arrhythmias and devices: pacemaker/ICD interrogation, diathermy precautions, perioperative reprogramming",
      "Pulmonary hypertension and adult congenital heart disease: RV-protective strategies and specialist referral",
    ],
  },
  {
    id: "respiratory-disease",
    title: "Respiratory Co-Existing Disease",
    examTags: ["primary", "final", "fficm"],
    keyPoints: [
      "Asthma: optimise control preoperatively, bronchospasm recognition and stepwise intraoperative management",
      "COPD: severity by spirometry, CO2 retainers, cor pulmonale, postoperative respiratory failure risk",
      "OSA: STOP-Bang screening, difficult airway implications, postoperative monitoring and CPAP",
      "Restrictive disease and pulmonary fibrosis: reduced compliance, oxygenation goals, regional techniques where possible",
      "Lung-protective ventilation and ARISCAT-style risk prediction for postoperative pulmonary complications",
    ],
  },
  {
    id: "endocrine-disease",
    title: "Endocrine Co-Existing Disease",
    examTags: ["primary", "final", "fficm"],
    keyPoints: [
      "Diabetes: perioperative glucose targets, VRIII vs omission strategies, SGLT2 inhibitor ketoacidosis risk and stopping rules",
      "Thyroid disease: uncontrolled hyper-/hypothyroidism delays surgery, thyroid storm and myxoedema coma",
      "Adrenal disorders: steroid supplementation guidance, adrenal crisis recognition and treatment",
      "Phaeochromocytoma: alpha-blockade before beta-blockade, volume repletion, crisis management",
      "Carcinoid syndrome: octreotide cover, avoid histamine-releasing drugs and catecholamine surges",
    ],
  },
  {
    id: "neurological-disease",
    title: "Neurological Co-Existing Disease",
    examTags: ["primary", "final", "fficm"],
    keyPoints: [
      "Myasthenia gravis: sensitivity to non-depolarising relaxants, avoid suxamethonium resistance pitfalls, postoperative ventilation risk scores",
      "Epilepsy: continue anticonvulsants, proconvulsant anaesthetic drugs, status epilepticus management",
      "Multiple sclerosis: avoid pyrexia, relapse risk, neuraxial considerations",
      "Parkinson's: continue dopaminergic therapy (NBM), avoid dopamine antagonists such as metoclopramide and haloperidol",
      "Neuromuscular disease and spinal cord injury: hyperkalaemia with suxamethonium, autonomic dysreflexia above T6",
    ],
  },
  {
    id: "haematological-disease",
    title: "Haematological Co-Existing Disease",
    examTags: ["primary", "final", "fficm"],
    keyPoints: [
      "Perioperative anaemia: detect and treat iron deficiency (including IV iron) before major surgery",
      "Patient blood management: restrictive transfusion thresholds, tranexamic acid, cell salvage",
      "Thrombocytopenia: procedural platelet thresholds for surgery, LP and neuraxial blocks",
      "Neutropenia: infection risk, aseptic precautions, growth-factor support",
      "Inherited disorders: sickle cell (avoid hypoxia/acidosis/cold), haemophilia factor cover, VWD and DDAVP",
    ],
  },
  {
    id: "hepatic-disease",
    title: "Hepatic Co-Existing Disease",
    examTags: ["final", "fficm"],
    keyPoints: [
      "Cirrhosis: Child-Pugh and MELD scoring, perioperative mortality risk by score and surgery type",
      "Portal hypertension: variceal bleeding risk, ascites management, avoid NSAIDs",
      "Altered pharmacology: reduced metabolism and albumin, prolonged sedative and relaxant effects",
      "Coagulopathy: 'rebalanced' haemostasis — INR does not reflect bleeding risk; thromboelastography-guided correction",
      "Acute liver failure and hepatorenal syndrome: recognition, lactulose/rifaximin, terlipressin",
    ],
  },
  {
    id: "renal-disease",
    title: "Renal Co-Existing Disease",
    examTags: ["primary", "final", "fficm"],
    keyPoints: [
      "CKD staging by eGFR (KDIGO G1–G5) and albuminuria; implications for drug dosing and contrast",
      "Dialysis patients: timing around surgery, volume and potassium targets, protect fistula arms",
      "Hyperkalaemia: ECG changes, calcium gluconate, insulin/dextrose, salbutamol, dialysis thresholds",
      "Altered pharmacology: avoid/reduce renally cleared drugs (morphine metabolites, LMWH, NSAIDs, metformin)",
      "Perioperative AKI prevention: KDIGO bundle, avoid nephrotoxins, STARRT-AKI evidence on RRT timing",
    ],
  },
  {
    id: "musculoskeletal-disease",
    title: "Musculoskeletal & Rheumatological Disease",
    examTags: ["final", "fficm"],
    keyPoints: [
      "Rheumatoid arthritis: atlanto-axial subluxation and cervical instability — airway and positioning implications",
      "Ankylosing spondylitis: difficult intubation, restricted spinal mobility, fragile cervical spine",
      "DMARDs: continue methotrexate; withhold biologics by dosing interval and surgery type (ACR/AAHKS guidance)",
      "Systemic sclerosis and connective tissue disease: difficult vascular access, reflux, pulmonary hypertension and fibrosis",
      "Scoliosis and restrictive physiology: positioning, ventilation and postoperative respiratory care",
    ],
  },
  {
    id: "gastrointestinal-disease",
    title: "Gastrointestinal Co-Existing Disease",
    examTags: ["final", "fficm"],
    keyPoints: [
      "GORD and aspiration risk: fasting guidance, rapid sequence induction indications, acid aspiration management",
      "Inflammatory bowel disease: anaemia, malnutrition, steroid and biologic implications, stoma considerations",
      "Malnutrition: screening (MUST), refeeding syndrome — thiamine, electrolyte monitoring (phosphate, potassium, magnesium)",
      "Intestinal failure and high-output stomas: fluid/electrolyte losses, TPN line management",
      "Bowel obstruction: full stomach, fluid sequestration, aspiration risk and RSI",
    ],
  },
  {
    id: "psychiatric-substance-disease",
    title: "Psychiatric Disease & Substance Misuse",
    examTags: ["final", "fficm"],
    keyPoints: [
      "Antidepressants: continue most; MAOI interactions with pethidine/tramadol and indirect sympathomimetics",
      "Serotonin syndrome vs neuroleptic malignant syndrome: recognition (clonus vs rigidity) and treatment",
      "Lithium: narrow therapeutic index, toxicity with dehydration/NSAIDs, prolongs neuromuscular blockade",
      "ECT anaesthesia: brief stimulus, haemodynamic response, drug interactions",
      "Alcohol and opioid use: withdrawal prophylaxis (CIWA, benzodiazepines), tolerance, buprenorphine continuation and multimodal analgesia",
    ],
  },
  {
    id: "immunosuppression-hiv",
    title: "Immunosuppression & HIV",
    examTags: ["final", "fficm"],
    keyPoints: [
      "Transplant immunosuppressants: continue calcineurin inhibitors perioperatively; interactions (CYP3A4) and nephrotoxicity",
      "Corticosteroids: HPA suppression thresholds and perioperative supplementation guidance",
      "HIV: ART continuation, CYP interactions with anaesthetic drugs, standard precautions regardless of viral load",
      "Biologics: infection risk, elective surgery timing by dosing interval",
      "Asplenia/hyposplenism: encapsulated organism risk, vaccination and antibiotic prophylaxis",
    ],
  },
];

const CoExistingDiseaseOverview = () => {
  const { activeExam } = useExamFilter();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      if (activeExam && !e.examTags.includes(activeExam)) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.keyPoints.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [search, activeExam]);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Co-Existing Disease Overview — AnaesthesiaCore</title>
        <meta
          name="description"
          content="One-page revision overview of every perioperative co-existing disease topic, with key exam points and links to the full guidance for each condition."
        />
              <link rel="canonical" href="https://anaesthesiacore.app/perioperative/co-existing-disease" />
        <meta property="og:url" content="https://anaesthesiacore.app/perioperative/co-existing-disease" />
</Helmet>
      <PageJsonLd name="Co-Existing Disease Overview" description="One-page revision overview of every perioperative co-existing disease topic, with key exam points and links to the full guidance for each condition." />

      <PageSection className="pt-8 pb-16">
        <Link
          to="/perioperative"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Perioperative Medicine
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-perioperative/10 p-2.5 text-perioperative">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Co-Existing Disease Overview
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Every co-existing disease topic in one place, with the key exam
              points for each. Use it for rapid revision, then open a topic for
              the full detail, quizzes and case discussions.
            </p>
          </div>
        </div>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search key points (e.g. hyperkalaemia, MAOI, sickle cell)…"
            className="pl-9"
            aria-label="Search co-existing disease key points"
          />
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {filtered.length} of {ENTRIES.length} topics shown
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-col rounded-xl border border-perioperative/25 bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold leading-snug">
                  {entry.title}
                </h2>
                <span className="flex gap-1">
                  {entry.examTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-perioperative/40 bg-perioperative/5 px-2 py-0.5 text-[11px] font-medium text-perioperative"
                    >
                      {EXAM_LABEL[tag] ?? tag.toUpperCase()}
                    </span>
                  ))}
                </span>
              </div>
              <ul className="mt-3 flex-1 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {entry.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link
                to={`/perioperative/${entry.id}`}
                className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-perioperative hover:underline"
              >
                Study full topic <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No topics match "{search}". Try a different term or clear the exam filter.
          </p>
        )}
      </PageSection>
    </main>
  );
};

export default CoExistingDiseaseOverview;
