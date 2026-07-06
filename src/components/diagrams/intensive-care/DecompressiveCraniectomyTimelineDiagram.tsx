import { useState } from "react";
import {
  Activity,
  Droplets,
  AlertTriangle,
  Bug,
  Zap,
  Waves,
  Brain,
  Hammer,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "early" | "intermediate" | "late";

interface Complication {
  id: string;
  phase: Phase;
  window: string; // x-axis position descriptor
  position: number; // 0-100 along timeline
  title: string;
  icon: typeof Activity;
  detail: string;
  mitigation: string;
}

const complications: Complication[] = [
  // EARLY: 0-7 days
  {
    id: "haemorrhage",
    phase: "early",
    window: "0–48 h",
    position: 4,
    title: "Haemorrhage at craniectomy edge",
    icon: Droplets,
    detail:
      "Bleeding from dural sinuses, bridging veins or bone edge. Re-accumulation under the scalp flap can raise pressure even with the bone off.",
    mitigation: "Meticulous haemostasis; correct coagulopathy; serial CT.",
  },
  {
    id: "contralateral",
    phase: "early",
    window: "0–72 h",
    position: 10,
    title: "Contralateral / new haematoma",
    icon: AlertTriangle,
    detail:
      "Loss of tamponade after removing the bone flap can unmask a contralateral extradural or expand a contused hemisphere.",
    mitigation: "Immediate post-op CT; low threshold for repeat imaging if ICP rebounds.",
  },
  {
    id: "herniation",
    phase: "early",
    window: "0–7 d",
    position: 18,
    title: "External / fungal cerebral herniation",
    icon: Brain,
    detail:
      "Brain herniates through the bony defect, kinking cortical veins at the edge — venous infarction and worsening oedema.",
    mitigation: "Adequate flap size (≥12 cm AP); generous duroplasty; head positioning.",
  },
  {
    id: "csfleak",
    phase: "early",
    window: "3–10 d",
    position: 26,
    title: "CSF leak / pseudomeningocele",
    icon: Waves,
    detail:
      "Watertight duroplasty failure → subgaleal CSF collection or wound leak; raises infection risk.",
    mitigation: "Layered closure; lumbar drain; revision if persistent.",
  },
  {
    id: "seizures",
    phase: "early",
    window: "first week",
    position: 30,
    title: "Early post-traumatic seizures",
    icon: Zap,
    detail:
      "Cortical irritation from injury and surgery. Sub-clinical status epilepticus easily missed in sedated patients.",
    mitigation: "Prophylactic levetiracetam 7 days (BTF); cEEG if unexplained coma.",
  },
  {
    id: "infection",
    phase: "early",
    window: "5–21 d",
    position: 40,
    title: "Wound / CNS infection",
    icon: Bug,
    detail:
      "Superficial wound infection, meningitis, ventriculitis, subdural empyema. Risk amplified by CSF leak and EVD.",
    mitigation: "Strict asepsis; remove EVD as soon as feasible; targeted antibiotics.",
  },

  // INTERMEDIATE: weeks 2-12
  {
    id: "hygroma",
    phase: "intermediate",
    window: "2–6 wk",
    position: 50,
    title: "Subdural hygroma",
    icon: Waves,
    detail:
      "Ipsilateral or contralateral subdural CSF collections from altered CSF dynamics after craniectomy. Often asymptomatic but can enlarge.",
    mitigation: "Serial imaging; surgical drainage only if symptomatic or expanding.",
  },
  {
    id: "hydrocephalus",
    phase: "intermediate",
    window: "2 wk – 3 mo",
    position: 58,
    title: "Post-traumatic hydrocephalus",
    icon: Activity,
    detail:
      "Communicating hydrocephalus in 10–40 % of DC survivors — adhesions, altered CSF absorption. Presents as new neurological plateau or decline.",
    mitigation: "MRI/CT; VP shunt — ideally after cranioplasty to lower over-drainage risk.",
  },
  {
    id: "sinkingflap",
    phase: "intermediate",
    window: "4–12 wk",
    position: 68,
    title: "Sinking-skin-flap appearance",
    icon: Brain,
    detail:
      "Atmospheric pressure pushes the scalp inward over the defect as oedema resolves. Cosmetic and a precursor to syndrome of the trephined.",
    mitigation: "Custom helmet; plan cranioplasty timing.",
  },

  // LATE: months
  {
    id: "cranioplasty",
    phase: "late",
    window: "6–12 wk (typical) — up to 6 mo",
    position: 76,
    title: "Cranioplasty — timing decision",
    icon: Hammer,
    detail:
      "Replace bone flap (autologous, stored at −80 °C) or use custom titanium/PEEK implant. EARLIER (<3 mo) may improve neurological recovery and reduce SoT, but risks infection if wound not yet quiescent. LATER (>3–6 mo) lowers infection but increases flap resorption and prolongs SoT.",
    mitigation:
      "Individualise: typically 6–12 weeks once swelling resolves and wound is healed; earlier if syndrome of the trephined.",
  },
  {
    id: "sot",
    phase: "late",
    window: "1–12 mo post-DC",
    position: 86,
    title: "Syndrome of the trephined (sinking skin flap syndrome)",
    icon: ShieldAlert,
    detail:
      "Orthostatic, posture-dependent neurological deterioration — headache, dizziness, focal deficit, cognitive slowing, seizures — that improves on lying flat. Caused by atmospheric pressure on the cortex and impaired CSF/venous dynamics. Resolves rapidly after cranioplasty.",
    mitigation:
      "Diagnosis is clinical + supine vs upright comparison ± perfusion imaging. Definitive treatment is cranioplasty.",
  },
  {
    id: "resorption",
    phase: "late",
    window: "6 mo – 2 y after cranioplasty",
    position: 94,
    title: "Bone-flap resorption / implant failure",
    icon: Hammer,
    detail:
      "Autologous flap resorption in 15–40 % (higher in children, fragmented flaps, hydrocephalus). Implant infection or extrusion can also occur late.",
    mitigation: "Plain skull X-ray / CT follow-up; replace with synthetic implant if needed.",
  },
];

const phaseStyle: Record<
  Phase,
  { label: string; band: string; chip: string; ring: string; dotBg: string }
> = {
  early: {
    label: "Early (0 – 14 d)",
    band: "bg-destructive/15",
    chip: "bg-destructive/15 text-destructive border-destructive/30",
    ring: "border-destructive/40 bg-destructive/5",
    dotBg: "bg-destructive",
  },
  intermediate: {
    label: "Intermediate (2 wk – 3 mo)",
    band: "bg-amber-500/15",
    chip:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    ring: "border-amber-500/40 bg-amber-500/5",
    dotBg: "bg-amber-500",
  },
  late: {
    label: "Late (> 3 mo)",
    band: "bg-emerald-500/15",
    chip:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    ring: "border-emerald-500/40 bg-emerald-500/5",
    dotBg: "bg-emerald-500",
  },
};

const phaseOrder: Phase[] = ["early", "intermediate", "late"];

const DecompressiveCraniectomyTimelineDiagram = () => {
  const [activeId, setActiveId] = useState<string>("sot");
  const active = complications.find((c) => c.id === activeId)!;
  const Icon = active.icon;
  const style = phaseStyle[active.phase];

  return (
    <figure className="rounded-xl border border-border bg-card p-4 md:p-6">
      <figcaption className="mb-4">
        <h4 className="text-base font-serif font-bold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-clinical" aria-hidden />
          Complications of decompressive craniectomy — timeline
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          From bone-flap removal through cranioplasty and beyond. Tap any milestone to see detail, including cranioplasty timing trade-offs and syndrome of the trephined.
        </p>
      </figcaption>

      {/* Phase legend */}
      <div className="flex flex-wrap gap-2 mb-3">
        {phaseOrder.map((p) => (
          <span
            key={p}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold",
              phaseStyle[p].chip
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", phaseStyle[p].dotBg)} aria-hidden />
            {phaseStyle[p].label}
          </span>
        ))}
      </div>

      {/* Timeline track */}
      <div className="relative pt-6 pb-16">
        {/* Phase bands */}
        <div className="absolute inset-x-0 top-6 h-3 rounded-full overflow-hidden flex border border-border">
          <div className={cn("h-full", phaseStyle.early.band)} style={{ width: "32%" }} />
          <div className={cn("h-full", phaseStyle.intermediate.band)} style={{ width: "40%" }} />
          <div className={cn("h-full", phaseStyle.late.band)} style={{ width: "28%" }} />
        </div>

        {/* Axis labels */}
        <div className="absolute inset-x-0 top-0 flex text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
          <span style={{ width: "32%" }} className="pl-1">Day 0</span>
          <span style={{ width: "40%" }} className="pl-1">2 weeks</span>
          <span style={{ width: "28%" }} className="pl-1">3 months → years</span>
        </div>

        {/* Markers */}
        <div className="absolute inset-x-0 top-3">
          {complications.map((c) => {
            const s = phaseStyle[c.phase];
            const isActive = c.id === activeId;
            const ItemIcon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-pressed={isActive}
                aria-label={`${c.title} (${c.window})`}
                className={cn(
                  "absolute -translate-x-1/2 flex flex-col items-center group focus:outline-none",
                  isActive ? "z-10" : "z-0"
                )}
                style={{ left: `${c.position}%` }}
              >
                <span
                  className={cn(
                    "rounded-full border-2 bg-card transition-all flex items-center justify-center",
                    isActive
                      ? "h-9 w-9 border-primary shadow-md ring-2 ring-primary/30"
                      : "h-7 w-7 border-border group-hover:border-primary/60"
                  )}
                >
                  <ItemIcon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                    aria-hidden
                  />
                </span>
                <span className={cn("mt-1 h-2 w-px", s.dotBg)} aria-hidden />
                <span
                  className={cn(
                    "mt-1 max-w-[88px] text-center text-[10px] leading-tight",
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}
                >
                  {c.window}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className={cn("rounded-lg border p-4 space-y-3", style.ring)}>
        <div className="flex items-start gap-3 flex-wrap">
          <span
            className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center border bg-background/60",
              style.chip
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-semibold text-foreground">{active.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {phaseStyle[active.phase].label} · {active.window}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-background/60 border border-border p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              What happens
            </p>
            <p className="text-foreground mt-1">{active.detail}</p>
          </div>
          <div className="rounded-md bg-background/60 border border-border p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Prevention / management
            </p>
            <p className="text-foreground mt-1">{active.mitigation}</p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-3 italic">
        Synthesised from Honeybul &amp; Ho (J Neurotrauma), Stiver SI (Neurosurg Focus 2009), Yang et al. (Acta Neurochir 2008), and Annan et al. on syndrome of the trephined.
      </p>
    </figure>
  );
};

export default DecompressiveCraniectomyTimelineDiagram;
