import { SectionLayout } from "@/components/layout/SectionLayout";
import { Link } from "react-router-dom";
import {
  ClipboardCheck,
  Syringe,
  Scissors,
  Activity,
  BedDouble,
  HeartPulse,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TimelineLink = { label: string; to: string };
type Phase = {
  id: string;
  name: string;
  timing: string;
  icon: typeof ClipboardCheck;
  summary: string;
  actions: string[];
  links: TimelineLink[];
};

const phases: Phase[] = [
  {
    id: "preop",
    name: "Pre-operative assessment",
    timing: "Days to weeks before surgery",
    icon: ClipboardCheck,
    summary:
      "History, examination and investigations to define risk, optimise co-existing disease and plan the anaesthetic. Includes shared decision-making, prehabilitation and consent.",
    actions: [
      "Airway assessment (Mallampati, mouth opening, neck movement)",
      "Cardiovascular & respiratory risk stratification (CPET, RCRI)",
      "Review and perioperative management of regular medicines",
      "Fasting instructions, VTE and blood-transfusion planning",
      "Premedication and anxiolysis where indicated",
    ],
    links: [
      { label: "Preoperative Assessment", to: "/perioperative/preoperative-assessment" },
      { label: "Cardiovascular Co-Existing Disease", to: "/perioperative/cardiovascular-disease" },
      { label: "Respiratory Co-Existing Disease", to: "/perioperative/respiratory-disease" },
      { label: "Enhanced Recovery (ERAS)", to: "/perioperative/enhanced-recovery" },
    ],
  },
  {
    id: "induction",
    name: "Induction",
    timing: "Minutes before incision",
    icon: Syringe,
    summary:
      "Checklist, monitoring and drug administration to move from awake to anaesthetised, with airway secured and intravenous access established. Rapid sequence induction for the full stomach.",
    actions: [
      "WHO/team brief and anaesthetic machine check",
      "Pre-oxygenation (3–5 min or 8 vital-capacity breaths)",
      "IV induction (propofol) or inhalational induction; RSI with suxamethonium",
      "Airway management: facemask → supraglottic device → tracheal tube",
      "Establish monitoring and vascular access",
    ],
    links: [
      { label: "Airway Management", to: "/clinical/airway-management" },
      { label: "Vascular Access Devices", to: "/perioperative/vascular-access-devices" },
      { label: "TIVA", to: "/clinical/tiva" },
      { label: "Equipment & Monitoring", to: "/physics/equipment-monitoring" },
    ],
  },
  {
    id: "surgery",
    name: "Surgery (intra-operative)",
    timing: "Knife to skin → closure",
    icon: Scissors,
    summary:
      "The surgical phase. Anaesthetic priorities are physiological stability, positioning and pressure care, fluid and blood management, temperature control and communication with the surgical team.",
    actions: [
      "Patient positioning and protection of pressure points/nerves",
      "Fluid therapy, transfusion thresholds and haemostasis",
      "Normothermia: active warming, fluid warmers",
      "Antibiotic prophylaxis timing and repeat dosing",
      "Anticipation of surgical stimuli (traction, insufflation, tourniquet)",
    ],
    links: [
      { label: "Patient Positioning", to: "/clinical/patient-positioning" },
      { label: "Perioperative Fluid Therapy", to: "/perioperative/perioperative-fluids" },
      { label: "Emergency Surgery", to: "/clinical/emergency-surgery" },
      { label: "Co-Existing Disease Overview", to: "/perioperative/co-existing-disease" },
    ],
  },
  {
    id: "anaesthetic",
    name: "Anaesthetic maintenance",
    timing: "Throughout the operation",
    icon: Activity,
    summary:
      "Titration of volatile or TIVA anaesthesia, analgesia and muscle relaxation against surgical stimulus, with continuous monitoring of depth, oxygenation, ventilation and circulation.",
    actions: [
      "Volatile maintenance vs TIVA; depth-of-anaesthesia monitoring",
      "Balanced analgesia: opioids, paracetamol, NSAIDs, regional techniques",
      "Neuromuscular blockade, train-of-four monitoring and reversal",
      "Ventilation strategy: lung-protective settings, PEEP, recruitment",
      "Haemodynamic support: fluids, vasopressors, inotropes",
    ],
    links: [
      { label: "TIVA", to: "/clinical/tiva" },
      { label: "Depth of Anaesthesia", to: "/physics/depth-of-anaesthesia" },
      { label: "Regional Anaesthesia", to: "/clinical/regional-anaesthesia" },
      { label: "Pain Medicine", to: "/clinical/pain-medicine" },
    ],
  },
  {
    id: "postop",
    name: "Post-operative",
    timing: "Emergence → PACU handover",
    icon: BedDouble,
    summary:
      "Reversal of neuromuscular blockade, emergence and extubation, management of airway and haemodynamic problems on waking, and structured handover to recovery staff.",
    actions: [
      "Reverse neuromuscular blockade (neostigmine/glycopyrrolate or sugammadex)",
      "Emergence and safe extubation criteria",
      "Antiemesis — PONV prophylaxis and treatment",
      "Analgesia handover: PCA, epidural or regional catheter plans",
      "Document and hand over intra-operative events and fluids",
    ],
    links: [
      { label: "Pain Medicine", to: "/clinical/pain-medicine" },
      { label: "Antiemetics", to: "/pharmacology/antiemetics" },
      { label: "Clinical Incidents", to: "/clinical/clinical-incidents" },
      { label: "Post-op High-Risk ICU Care", to: "/intensive-care/postop-high-risk-icu" },
    ],
  },
  {
    id: "recovery",
    name: "Recovery & beyond",
    timing: "PACU → ward → discharge",
    icon: HeartPulse,
    summary:
      "Structured PACU care with discharge criteria, ward-based enhanced recovery, day-surgery discharge standards, and follow-up of complications such as delirium, AKI and persistent pain.",
    actions: [
      "PACU monitoring and modified Aldrete discharge criteria",
      "Day-surgery discharge: escort, oral intake, analgesia plan",
      "ERAS ward care: early feeding, mobilisation, drain/criteria-led care",
      "Recognise complications: delirium, respiratory depression, AKI, ileus",
      "Follow-up: awareness, nerve injury, chronic post-surgical pain",
    ],
    links: [
      { label: "Day Surgery", to: "/clinical/day-surgery" },
      { label: "Enhanced Recovery (ERAS)", to: "/perioperative/enhanced-recovery" },
      { label: "Elderly Anaesthesia", to: "/clinical/elderly-anaesthesia" },
      { label: "Perioperative Case Bank", to: "/perioperative/case-bank" },
    ],
  },
];

const PhaseCard = ({ phase, index }: { phase: Phase; index: number }) => {
  const [open, setOpen] = useState(false);
  const Icon = phase.icon;
  return (
    <li id={phase.id} className="relative pl-10 sm:pl-14 scroll-mt-28">
      {/* spine */}
      {index < phases.length - 1 && (
        <span
          aria-hidden
          className="absolute left-[15px] sm:left-[23px] top-10 bottom-[-1.5rem] w-px bg-border"
        />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-1 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-card text-perioperative"
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>

      <article className="rounded-lg border border-border bg-card">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Phase {index + 1} · {phase.timing}
            </p>
            <h2 className="mt-1 font-serif text-lg font-semibold text-foreground sm:text-xl">
              {phase.name}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{phase.summary}</p>
          </div>
          <ChevronDown
            aria-hidden
            className={cn(
              "mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="border-t border-border p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-foreground">Key actions</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {phase.actions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3 className="mt-4 text-sm font-semibold text-foreground">Related topics</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {phase.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-perioperative"
                  >
                    {l.label}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </li>
  );
};

const PerioperativeTimeline = () => (
  <SectionLayout
    title="The Perioperative Timeline"
    subtitle="The patient journey from pre-operative assessment through induction, surgery and anaesthesia to recovery — with each phase linked to its revision topics."
    metaDescription="Perioperative timeline for FRCA and FFICM: pre-operative assessment, induction, surgery, anaesthetic maintenance, post-operative care and recovery — each phase linked to revision topics."
    backPath="/perioperative"
    backLabel="Perioperative Medicine"
    accentColor="text-perioperative"
    disableAutoTOC
  >
    <p className="text-sm text-muted-foreground mb-6">
      Tap a phase to see the key actions and jump to the topics that cover it.
    </p>
    <ol className="space-y-6">
      {phases.map((phase, i) => (
        <PhaseCard key={phase.id} phase={phase} index={i} />
      ))}
    </ol>
  </SectionLayout>
);

export default PerioperativeTimeline;
