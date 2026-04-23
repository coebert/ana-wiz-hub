import { useState } from "react";
import {
  Stethoscope,
  Users,
  Activity,
  Pill,
  ListChecks,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Side-by-side procedural sedation case studies.
 *
 * Each scenario applies the same five-axis framework — patient selection,
 * target depth, drug plan, monitoring intensity, and staffing/environment —
 * to a typical real-world case. The reader can flick between tabs to see
 * how the recommendation flexes with the procedure and patient.
 *
 * Cases chosen to span the depth/risk spectrum:
 *   - Endoscopy (moderate, day-case)
 *   - Dental (minimal, primary-care)
 *   - DC cardioversion (deep, anaesthetist-led)
 *   - ED limb reduction (deep, unfasted, opportunistic)
 *   - MRI in a child (deep, remote site)
 */

interface Scenario {
  id: string;
  title: string;
  setting: string;
  patient: {
    summary: string;
    selection: string[];
  };
  depth: {
    target: "Minimal" | "Moderate" | "Deep" | "GA";
    rationale: string;
  };
  drugs: {
    plan: string;
    rescue: string;
  };
  monitoring: string[];
  staffing: {
    environment: string;
    team: string[];
  };
  pitfalls: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "endoscopy",
    title: "Diagnostic colonoscopy",
    setting: "Day-case endoscopy unit · ASA II adult · 60 min slot",
    patient: {
      summary:
        "62-year-old man, BMI 28, hypertension on amlodipine, anxious about awareness. Fasted 6 h solids / 2 h fluids. STOP-BANG 1.",
      selection: [
        "Confirm consent for sedation (awareness, recall, respiratory depression)",
        "Bowel prep tolerated; no significant electrolyte derangement",
        "Hold antihypertensive on morning if systolic <120; continue otherwise",
      ],
    },
    depth: {
      target: "Moderate",
      rationale:
        "Procedure tolerable with anxiolysis + analgesia; deep sedation rarely needed. Patient must be cooperative for position changes.",
    },
    drugs: {
      plan:
        "Midazolam 1–2 mg IV + fentanyl 25–50 µg, titrated. Top-up midazolam 0.5 mg as required.",
      rescue:
        "Flumazenil 100 µg increments and naloxone 40 µg increments at the bedside; jaw-thrust + supplemental O₂ if SpO₂ falls.",
    },
    monitoring: [
      "Continuous SpO₂ + capnography via nasal cannula with CO₂ port",
      "NIBP every 5 min, 3-lead ECG given hypertension",
      "Verbal contact / MOAA/S documented every 5 min",
    ],
    staffing: {
      environment:
        "Endoscopy room with O₂, suction, tipping trolley, resuscitation trolley & defibrillator immediately available.",
      team: [
        "Endoscopist performing procedure (cannot also be the sedationist)",
        "Sedationist (endoscopy nurse or anaesthetist) — sole role is the patient",
        "Endoscopy assistant for technical work",
      ],
    },
    pitfalls: [
      "Synergy if propofol added to midazolam + opioid — drop doses by 30–50%",
      "Vasovagal during caecal distension → atropine ready",
      "Discharge only with responsible adult escort; PADSS score",
    ],
  },
  {
    id: "dental",
    title: "Adult dental extraction (anxious patient)",
    setting: "Primary-care dental surgery · ASA I adult · 30 min slot",
    patient: {
      summary:
        "28-year-old with severe needle phobia, otherwise healthy, BMI 24, no airway risk factors. Has eaten breakfast.",
      selection: [
        "Local anaesthesia is the primary technique — sedation is anxiolytic adjunct",
        "Fasting not mandated for minimal sedation but document the discussion",
        "Screen for benzodiazepine tolerance, recent alcohol, opioid use",
      ],
    },
    depth: {
      target: "Minimal",
      rationale:
        "Anxiolysis only — patient must respond normally to verbal command. Going beyond minimal in a primary-care chair exceeds the safety envelope.",
    },
    drugs: {
      plan:
        "Single agent: midazolam 2 mg IV titrated 0.5 mg/min to anxiolysis (typical effective dose 3–5 mg) — OR inhaled N₂O/O₂ 30–50%.",
      rescue:
        "Flumazenil 200 µg ready; bag-mask ventilation kit in the room.",
    },
    monitoring: [
      "Continuous SpO₂",
      "NIBP pre- and post-procedure, every 10 min during",
      "Verbal contact maintained throughout (this defines the level)",
    ],
    staffing: {
      environment:
        "Dental chair with tipping function, O₂ source, suction, AED. Compliant with SAAD / RCoA 2020 standards for dental sedation.",
      team: [
        "Dentist trained in conscious sedation (not also operating)",
        "Second appropriately trained person dedicated to monitoring",
      ],
    },
    pitfalls: [
      "Combining midazolam with opioids in primary care = no longer minimal sedation — refer to hospital",
      "Disinhibition / paradoxical reaction → reverse with flumazenil",
      "Extended observation if elderly or chronic benzodiazepine use",
    ],
  },
  {
    id: "cardioversion",
    title: "Elective DC cardioversion",
    setting: "Coronary care / theatre · ASA III adult · 5 min procedure",
    patient: {
      summary:
        "70-year-old with persistent AF, EF 40%, on apixaban (TOE confirmed no LA thrombus), BMI 32, STOP-BANG 4.",
      selection: [
        "Anticoagulation plan agreed with cardiology (continue apixaban)",
        "Fasted 6/2; airway assessed (Mallampati, mouth opening, neck movement)",
        "Pre-oxygenate 3 min — anticipate brief apnoea after bolus",
      ],
    },
    depth: {
      target: "Deep",
      rationale:
        "Brief but intensely stimulating shock — needs unconsciousness and amnesia. Lasts seconds; offset must be rapid.",
    },
    drugs: {
      plan:
        "Propofol 0.5–1 mg/kg slow IV bolus until loss of verbal contact, OR TCI Ce 2–3 µg/mL. Avoid opioids unless analgesia required.",
      rescue:
        "Vasopressor (metaraminol 0.5 mg, phenylephrine 50–100 µg) drawn; IV fluids running; bag-mask ready; SGA & intubation kit immediately available.",
    },
    monitoring: [
      "Full AAGBI minimum: SpO₂, ETCO₂, NIBP every 1 min, continuous ECG",
      "Pre-oxygenation with 100% O₂ via tight-fit mask",
      "Defibrillator pads in position before sedation",
    ],
    staffing: {
      environment:
        "Resus area with anaesthetic machine or self-inflating bag; tilt trolley; full airway and resuscitation equipment.",
      team: [
        "Anaesthetist delivering sedation (sole role: the patient)",
        "ODP / anaesthetic assistant",
        "Cardiologist performing cardioversion",
      ],
    },
    pitfalls: [
      "Hypotension after propofol — common in elderly with poor LV function",
      "Awareness if under-dosed or shock delivered before loss of consciousness",
      "Aspiration risk if obese / hiatus hernia — pre-oxygenate well, ramped position",
    ],
  },
  {
    id: "ed-reduction",
    title: "ED shoulder reduction",
    setting: "Emergency department resus bay · ASA II–III adult · unfasted",
    patient: {
      summary:
        "45-year-old, anterior shoulder dislocation 3 h post-fall, ate 1 h ago, on no medication, BMI 26, no airway risk factors.",
      selection: [
        "Risk–benefit: rapid reduction prevents neurovascular compromise — accept fasting status",
        "Document explicit consent for sedation in unfasted patient",
        "Plan: keep depth as light as possible while still allowing reduction",
      ],
    },
    depth: {
      target: "Deep",
      rationale:
        "Reduction requires brief muscle relaxation; cannot be done under moderate sedation alone. Aim for shortest possible deep window.",
    },
    drugs: {
      plan:
        "Ketofol (1:1 ketamine 0.5 mg/kg + propofol 0.5 mg/kg) IV — preserves CV stability, opposing respiratory effects offset; or propofol 0.5 mg/kg + fentanyl 50 µg.",
      rescue:
        "Suction (large-bore Yankauer) running; anti-emetic (ondansetron 4 mg IV); intubation trolley at the head of the bed.",
    },
    monitoring: [
      "Continuous SpO₂ + capnography",
      "NIBP every 3 min, continuous ECG",
      "Trained observer documenting depth, vitals every 2 min",
    ],
    staffing: {
      environment:
        "Resus bay with full airway equipment, defibrillator, vasopressors. RCEM safe sedation standards apply.",
      team: [
        "ED consultant or senior registrar trained in deep sedation (not performing reduction)",
        "Second clinician performing the reduction",
        "Nurse dedicated to monitoring and documentation",
      ],
    },
    pitfalls: [
      "Aspiration in unfasted patient — left-lateral if tolerated, suction ready",
      "Emergence phenomena with ketamine — co-administer midazolam if needed",
      "Discharge only when fully oriented, ambulating and tolerating fluids",
    ],
  },
  {
    id: "mri-paeds",
    title: "MRI brain in a 4-year-old",
    setting: "MRI scanner suite · ASA II child · 45 min scan",
    patient: {
      summary:
        "4-year-old with developmental delay, weight 16 kg, fasted, parent present. Cannot lie still; previous scan abandoned awake.",
      selection: [
        "Decision sedation vs GA discussed with paediatric anaesthetist",
        "MRI-compatible monitoring and equipment confirmed",
        "Reversal drugs and resuscitation trolley with paediatric sizes outside scanner",
      ],
    },
    depth: {
      target: "Deep",
      rationale:
        "Stillness required for diagnostic images. Depth maintained for the full scan duration; remote site mandates anaesthetic-led care.",
    },
    drugs: {
      plan:
        "Propofol TCI (Eleveld model) Ce 2.5–4 µg/mL OR sevoflurane via LMA. Dexmedetomidine 1 µg/kg load + 0.5 µg/kg/h is an alternative for spontaneous-breathing scan.",
      rescue:
        "Paediatric-sized airway adjuncts, LMA and ETT immediately accessible; emergency drugs drawn up by weight (WETFLAG).",
    },
    monitoring: [
      "MRI-safe SpO₂, ETCO₂, NIBP, ECG, temperature",
      "Visual contact via in-bore camera; vitals on remote display",
      "Hearing protection in situ",
    ],
    staffing: {
      environment:
        "MRI suite with anaesthetic machine / TIVA pumps in zone 4-compatible configuration; dedicated recovery area outside the scanner.",
      team: [
        "Consultant paediatric anaesthetist",
        "ODP familiar with MRI environment",
        "Radiographer and parent (escorted in/out per local policy)",
      ],
    },
    pitfalls: [
      "Airway obstruction in a remote site with limited access — pre-empt with adjunct/LMA",
      "Hypothermia during long scans — warming blanket, monitor core temp",
      "Slow recovery from prolonged TIVA — extend monitored observation",
    ],
  },
];

const DEPTH_BADGE: Record<Scenario["depth"]["target"], string> = {
  Minimal: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Moderate: "bg-primary/15 text-primary",
  Deep: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  GA: "bg-destructive/15 text-destructive",
};

const Block = ({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Stethoscope;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-background p-3">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      <p className="font-semibold text-foreground text-sm">{title}</p>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">{children}</div>
  </div>
);

export const SedationCaseScenarios = () => {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const active = SCENARIOS.find((s) => s.id === activeId)!;

  return (
    <section
      className="my-6 rounded-xl border border-border bg-card p-4 md:p-5"
      aria-label="Procedural sedation case scenarios"
    >
      <header className="mb-4">
        <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
          Case scenarios — same framework, different recipes
        </h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Pick a case to see how patient selection, target depth, drugs, monitoring and staffing
          flex with the procedure.
        </p>
      </header>

      {/* Tabs */}
      <div role="tablist" aria-label="Case scenarios" className="flex flex-wrap gap-2 mb-4">
        {SCENARIOS.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`case-panel-${s.id}`}
              id={`case-tab-${s.id}`}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs md:text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-secondary/50",
              )}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`case-panel-${active.id}`}
        aria-labelledby={`case-tab-${active.id}`}
        className="rounded-lg border border-border bg-secondary/20 p-3 md:p-4 space-y-3"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-serif font-bold text-foreground text-base">{active.title}</p>
            <p className="text-xs text-muted-foreground">{active.setting}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Target depth</span>
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded",
                DEPTH_BADGE[active.depth.target],
              )}
            >
              {active.depth.target}
            </span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Block icon={ClipboardList} title="Patient & selection">
            <p>{active.patient.summary}</p>
            <ul className="space-y-1 mt-1">
              {active.patient.selection.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Stethoscope} title="Why this depth">
            <p>{active.depth.rationale}</p>
          </Block>

          <Block icon={Pill} title="Drug plan & rescue">
            <p>
              <strong className="text-foreground">Plan: </strong>
              {active.drugs.plan}
            </p>
            <p>
              <strong className="text-foreground">Rescue: </strong>
              {active.drugs.rescue}
            </p>
          </Block>

          <Block icon={Activity} title="Monitoring intensity">
            <ul className="space-y-1">
              {active.monitoring.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Users} title="Staffing & environment">
            <p>{active.staffing.environment}</p>
            <ul className="space-y-1 mt-1">
              {active.staffing.team.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={AlertTriangle} title="Common pitfalls">
            <ul className="space-y-1">
              {active.pitfalls.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-destructive" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <div className="flex items-start gap-2 rounded-md border border-border bg-background p-3">
          <ListChecks className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Note how the same five axes — selection, depth, drugs, monitoring, staffing — apply
            to every case. The recipe changes with risk, procedure duration and stimulus, but the
            framework does not.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SedationCaseScenarios;
