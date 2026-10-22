import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { sectionMeta, type Section } from "@/data/curriculum";

/**
 * Home-page summary of the most recent content-expansion batches.
 * Curated (newest first) — keep in sync with expansionStatus.ts and
 * curriculum-expansion.md when a batch is completed.
 *
 * Rendered as a horizontally scrollable strip so readers can scroll back
 * through older updates, not just the newest few.
 */
interface RecentExpansion {
  topicId: string;
  section: Section;
  title: string;
  note: string;
}

const RECENT_EXPANSIONS: RecentExpansion[] = [
  { topicId: "operative-steps", section: "perioperative", title: "Operations Library", note: "68 operations across 13 specialties; new hysteroscopy, TURBT, burn excision/grafting and double-jaw surgery entries with staged diagrams and anaesthetic notes." },
  { topicId: "icu-general-unit", section: "intensive-care", title: "The General Adult ICU", note: "New page: GPICS V3 baseline staffing and NHS 2019/20 general critical care costs." },
  { topicId: "icu-cardiac-unit", section: "intensive-care", title: "The Cardiothoracic ICU", note: "New page: GPICS V3 cardiothoracic staffing additions and NHS cardiac surgical costs." },
  { topicId: "icu-neuro-unit", section: "intensive-care", title: "The Neurocritical Care Unit", note: "New page: GPICS V3 neuro staffing and specialist access, plus NHS neurosciences costs." },
  { topicId: "icu-liver-unit", section: "intensive-care", title: "The Liver ICU", note: "New page: general GPICS V3 staffing applied to liver intensive care, plus NHS liver unit costs." },
  { topicId: "icu-obstetric-unit", section: "intensive-care", title: "Obstetric Critical Care", note: "New page: general GPICS V3 staffing applied to obstetric critical care, plus the highest NHS unit-function cost." },
  { topicId: "icu-cost-by-condition", section: "intensive-care", title: "ICU Cost by Condition", note: "New page: UK/NHS and US cost figures side by side for sepsis, ventilator pneumonia, ARDS and ventilation." },
  { topicId: "icu-staffing-by-country", section: "intensive-care", title: "ICU Staffing by Country", note: "New page: GPICS V3 beside Australian/New Zealand, European and US critical care staffing standards." },
  { topicId: "icu-cost-timeline", section: "intensive-care", title: "ICU Cost Timeline", note: "New page: NHS adult critical care cost per day year by year, 2013/14 to 2021/22, from the published national schedules." },
  { topicId: "icu-cost-by-country", section: "intensive-care", title: "ICU Costs by Country", note: "New page: NHS bed-day costs beside Australian, New Zealand, European and US figures, with the caveats behind each." },
  { topicId: "icu-staffing-by-unit", section: "intensive-care", title: "ICU Staffing by Unit Type (GPICS V3)", note: "New page: what GPICS V3 adds for cardiothoracic, neuro, burns, remote and rural, and enhanced care units." },
  { topicId: "icu-costs", section: "intensive-care", title: "ICU Costs (NHS data)", note: "New page: NHS cost per adult critical care day by organs supported and unit type, from the National Schedule of NHS Costs." },
  { topicId: "icu-length-of-stay", section: "intensive-care", title: "ICU Length of Stay", note: "New page: ICNARC and NHS hospital statistics on stay, days of each organ support and stays by condition." },
  { topicId: "icu-outcomes", section: "intensive-care", title: "ICU Outcomes", note: "New page: survival after ICU and the late excess mortality, length of stay, readmission rates and their link to death (Wunsch 2010, Herridge 2003, Rosenberg 2000)." },
  { topicId: "icu-discharge-planning", section: "intensive-care", title: "ICU Discharge Planning", note: "New page: rehabilitation from day one, safe ward transfer and handover, home discharge information and 2–3 month review (NICE CG83, CG50, GPICS)." },
  { topicId: "icu-anaphylaxis", section: "intensive-care", title: "Anaphylaxis in Critical Care", note: "New page: IM adrenaline doses and repeats, refractory anaphylaxis and adrenaline infusion, tryptase and biphasic reactions (RCUK 2021)." },
  { topicId: "icu-staffing-ratios", section: "intensive-care", title: "ICU Staffing Ratios (GPICS V3)", note: "New page: every GPICS V3 staffing role, with day and night requirements and worked nurse-ratio examples." },
  { topicId: "icu-eclampsia", section: "intensive-care", title: "Severe Pre-eclampsia and Eclampsia", note: "New page: magnesium sulfate regimen, Magpie, severe hypertension control and fluid restriction (NICE NG133)." },
  {
    topicId: "sepsis-resuscitation",
    section: "intensive-care",
    title: "ICU Resuscitation: Septic Shock",
    note: "New page: the first hour — recognition and lactate, immediate antimicrobials, fluids with reassessment, MAP 65 with noradrenaline, and lung-protective ventilation.",
  },
  {
    topicId: "septic-shock",
    section: "intensive-care",
    title: "Septic Shock",
    note: "New page under Sepsis: Sepsis-3 shock criteria, MAP 65, noradrenaline then vasopressin, the 65 trial and corticosteroids (ADRENAL).",
  },
  {
    topicId: "temperature-ph",
    section: "chemistry",
    title: "Temperature & pH",
    note: "New page: Kw and neutral pH, cooling a blood sample, alpha-stat versus pH-stat.",
  },
  {
    topicId: "renal-system-overview",
    section: "physiology",
    title: "Renal System Overview",
    note: "New page: GFR and net filtration pressure, the countercurrent multiplier, renin–angiotensin–aldosterone and ADH.",
  },
  {
    topicId: "cardiovascular-system-overview",
    section: "physiology",
    title: "Cardiovascular System Overview",
    note: "New page: Cardiac output, Frank–Starling, preload and afterload, MAP and baroreceptors.",
  },
  {
    topicId: "respiratory-system-overview",
    section: "physiology",
    title: "Respiratory System Overview",
    note: "New page: Pressure gradients and Boyle's law, Dalton and Henry, Bohr and Haldane effects, CO₂ transport.",
  },
  {
    topicId: "physiology-overview",
    section: "physiology",
    title: "Physiology Overview",
    note: "New page: homeostasis and set points, negative and positive feedback loops, and the organ systems, with links to every physiology topic.",
  },
  {
    topicId: "endocrine-tumours",
    section: "perioperative",
    title: "Endocrine Tumours",
    note: "New page: catecholamine physiology, phaeochromocytoma tests, alpha-blockade, after resection, and carcinoid crisis evidence.",
  },
  {
    topicId: "diabetes-management",
    section: "perioperative",
    title: "Diabetes Management",
    note: "New page: insulin physiology, GLP-1 and SGLT2 risks, variable-rate insulin with glucose, and postoperative and ICU glucose.",
  },
  {
    topicId: "thyroid-function",
    section: "perioperative",
    title: "Thyroid Function",
    note: "New page: hormone synthesis and tests, perioperative thyroid disease, and haematoma after thyroid surgery (SCOOP).",
  },
  {
    topicId: "pituitary-apoplexy",
    section: "intensive-care",
    title: "Pituitary Apoplexy",
    note: "New page: when to suspect it, MRI, empirical steroid indications and doses, early surgery evidence and follow-up.",
  },
  {
    topicId: "adrenal-crisis",
    section: "intensive-care",
    title: "Adrenal Crisis",
    note: "New page: steroid-induced risk, immediate hydrocortisone and fluids, fludrocortisone, sick-day rules, and replacement versus septic-shock steroids.",
  },
  {
    topicId: "thyroid-storm",
    section: "intensive-care",
    title: "Thyroid Storm",
    note: "New page: clinical diagnosis and Burch–Wartofsky score, thionamide-then-iodide timing, beta-1 blockade, steroids, cooling and plasmapheresis.",
  },
  {
    topicId: "dka",
    section: "intensive-care",
    title: "Diabetic Ketoacidosis (DKA)",
    note: "New page: JBDS 2023 criteria, blood-ketone monitoring, balanced-crystalloid evidence, fixed-rate insulin, potassium safety, resolution criteria and euglycaemic DKA.",
  },
  {
    topicId: "critical-care-overview",
    section: "intensive-care",
    title: "Critical Care Overview",
    note: "New page: ICS levels of care, GPICS admission and staffing standards, intensivist staffing evidence, daily goals, structured handover and family meetings.",
  },
  {
    topicId: "ventilation-protocols",
    section: "intensive-care",
    title: "ICU Ventilation Protocols",
    note: "New page: ARDSNet admission settings, plateau and driving pressure checks, paired sedation and breathing trials, protocolised and automated weaning.",
  },
  {
    topicId: "circulatory-failure",
    section: "intensive-care",
    title: "Circulatory Failure & Shock",
    note: "New lesson: MAP targets (SSC, 65 trial), noradrenaline vs dopamine, capillary refill (ANDROMEDA-SHOCK), ECLS-SHOCK and DanGer Shock, first-hour checklist and calculator.",
  },
  {
    topicId: "hypovolaemia",
    section: "intensive-care",
    title: "Hypovolaemia & Fluid Resuscitation",
    note: "New page: passive leg raise, NICE CG174 boluses and maintenance, SMART, BaSICS and PLUS, calculators and a fictional stoma case.",
  },
  {
    topicId: "peritonitis",
    section: "intensive-care",
    title: "Peritonitis & Intra-abdominal Sepsis",
    note: "New page: types of peritonitis, WSES vs SIS–IDSA, pre-laparotomy checklist, source control and STOP-IT antibiotic duration.",
  },
  {
    topicId: "haemorrhagic-shock",
    section: "intensive-care",
    title: "Haemorrhagic Shock & Resuscitation",
    note: "New page: shock index and lactate, why cuffs over-read in shock, blood pressure targets, PAMPer vs RePHILL, CRASH-2 timing, calcium and ITACTIC.",
  },
  {
    topicId: "icu-endocrine-emergencies",
    section: "intensive-care",
    title: "Endocrine Emergencies",
    note: "DKA resolution and potassium rules, HHS fluid/insulin targets, adrenal crisis dosing and thyroid-storm assessment, aligned with JBDS, SfE, ATA and MHRA guidance.",
  },
  {
    topicId: "emergency-surgery",
    section: "clinical",
    title: "Emergency Surgery",
    note: "NCEPOD urgency classes, emergency-airway trial evidence (DEVICE, PreVent, IRIS), appendicectomy timing, bowel-obstruction trial and hip-fracture pathway lessons.",
  },
  {
    topicId: "mass-casualty-military",
    section: "clinical",
    title: "Mass Casualty & Major Incidents",
    note: "Rewritten triage teaching from NARU's Ten Second Triage and NHS England MITT guidance, plus ethics, teamwork, bleeding control and chemical-response lessons.",
  },
  {
    topicId: "ophthalmic-anaesthesia",
    section: "clinical",
    title: "Ophthalmic Anaesthesia",
    note: "Evidence lesson: topical vs sub-Tenon's pain outcomes (Guay 2015 Cochrane) and the oculocardiac reflex.",
  },
  {
    topicId: "interventional-radiology",
    section: "clinical",
    title: "Anaesthesia for Interventional Radiology",
    note: "Stroke-thrombectomy evidence lesson (SIESTA / ANSTROKE / GOLIATH, Bai 2021) and a corrected FAQ answer.",
  },
  {
    topicId: "surgical-protocols",
    section: "clinical",
    title: "Perioperative Protocols by Surgery Type",
    note: "All ten surgery guides source-linked, plus an ERAS evidence lesson (Greco 2014 meta-analysis).",
  },
  {
    topicId: "mechanical-ventilation",
    section: "intensive-care",
    title: "Mechanical Ventilation",
    note: "Stress ulcer prophylaxis lesson (SUP-ICU 2018, REVISE 2024) and a full APRV section.",
  },
  {
    topicId: "icu-nutrition",
    section: "intensive-care",
    title: "Nutrition in Critical Care",
    note: "Protein and calorie trial evidence (EFFORT Protein, NUTRIREA-2/3, TARGET) with corrected trial data.",
  },
  {
    topicId: "elderly-anaesthesia",
    section: "clinical",
    title: "Anaesthesia for the Elderly",
    note: "Hip-fracture anaesthesia evidence (RAGA / REGAIN) and a corrected mortality claim.",
  },
  {
    topicId: "neurointensive-care",
    section: "intensive-care",
    title: "Neurointensive Care",
    note: "Transfusion-threshold evidence lesson (HEMOTION / TRAIN) with sources list.",
  },
  {
    topicId: "sepsis",
    section: "intensive-care",
    title: "Sepsis & Septic Shock",
    note: "Lessons on the 65 trial (permissive hypotension) and HYPRESS (steroids before shock).",
  },
  {
    topicId: "burns-icu",
    section: "intensive-care",
    title: "Burns ICU",
    note: "Burn-shock resuscitation evidence lesson (ABA 2024 CPG, fluid creep, propranolol and early-excision RCTs).",
  },
  {
    topicId: "abdominal-compartment-syndrome",
    section: "intensive-care",
    title: "Abdominal Compartment Syndrome",
    note: "Every section reviewed against the WSACS 2013 consensus definitions; unsupported figures removed.",
  },
  {
    topicId: "aki-rrt",
    section: "intensive-care",
    title: "AKI & Renal Replacement Therapy",
    note: "STARRT-AKI timing and RENAL dose evidence lessons added.",
  },
  {
    topicId: "non-technical-skills",
    section: "intensive-care",
    title: "Non-technical Skills",
    note: "ANTS framework and WHO surgical checklist evidence lessons with verbatim excerpts.",
  },
  {
    topicId: "resource-poor-anaesthesia",
    section: "clinical",
    title: "Resource-poor Anaesthesia",
    note: "WFSA workforce survey, ASOS outcomes and WHO checklist evidence, plus a caesarean spinal-vs-GA substudy lesson.",
  },
  {
    topicId: "local-anaesthetics",
    section: "pharmacology",
    title: "Local Anaesthetics",
    note: "Differential blockade lesson citing Fink & Cairns 1984 and Gokin 2001, correcting the oversimplified 'C fibres block first' rule.",
  },
  {
    topicId: "volatile-agents",
    section: "pharmacology",
    title: "Volatile Agents",
    note: "Meyer–Overton evidence lesson citing Franks & Lieb, Koblin 1994 and Franks 2008.",
  },
  {
    topicId: "antimicrobials-pharm",
    section: "pharmacology",
    title: "Antimicrobials",
    note: "Antiviral, antibiotic exposure (DALI, TDM), candidaemia, antimalarial, antiseptic and resistance lessons.",
  },
  {
    topicId: "iv-anaesthetics",
    section: "pharmacology",
    title: "IV Anaesthetics",
    note: "PRIS evidence lesson (Hemphill 2019) with verbatim excerpt and practice-based management steps labelled as such.",
  },
];

export const RecentExpansions = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-update-card]");
    const step = first ? first.offsetWidth + 12 : 320;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="recent-expansions-heading">
      <div className="mb-8 max-w-2xl">
        <p className="eyebrow text-muted-foreground mb-2">
          <Sparkles className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" aria-hidden />
          Content updates
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="recent-expansions-heading" className="h2">Recently expanded</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll to older content updates"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 shadow-elev-1 transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll to newer content updates"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 shadow-elev-1 transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <p className="lead mt-2 text-foreground/70">
          The latest topics to receive in-depth, source-linked teaching — each new lesson
          cites the studies and guidelines behind it. Scroll or swipe sideways to see
          earlier updates.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {RECENT_EXPANSIONS.map((item) => {
          const meta = sectionMeta[item.section];
          return (
            <Link
              key={item.topicId}
              data-update-card
              to={`/${item.section}/${item.topicId}`}
              className="group flex w-[270px] shrink-0 snap-start flex-col rounded-xl border border-border bg-card p-4 shadow-elev-1 transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-px hover:shadow-elev-2 hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mono mb-2">
                {meta.label}
              </span>
              <h3 className="h4 mb-1.5 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="small leading-relaxed text-foreground/70 flex-1">
                {item.note}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Read topic
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <Link
          to="/curriculum/expansion"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          See full expansion progress across all topics
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
};
