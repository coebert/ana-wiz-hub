import { useMemo, useState } from "react";
import { Check, RotateCcw, Clock, Move, ShieldHalf, HardHat, BadgeCheck } from "lucide-react";

type GroupId = "alara" | "ppe" | "dosimetry";

interface Item {
  id: string;
  label: string;
  detail?: string;
}

interface Group {
  id: GroupId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** HSL accent for the group's left border + chips. */
  accent: string;
  items: Item[];
}

const GROUPS: Group[] = [
  {
    id: "alara",
    title: "ALARA — pre & intra-procedure",
    subtitle: "Time · Distance · Shielding",
    icon: Clock,
    accent: "hsl(var(--primary))",
    items: [
      { id: "justify", label: "Exposure justified by IR(ME)R practitioner & documented", detail: "Right test, right patient, right time — alternatives (US, MRI, V/Q) considered." },
      { id: "pulsed", label: "Pulsed fluoroscopy at lowest acceptable rate", detail: "Typical 30–70% dose reduction vs continuous; reserve cine for essential acquisitions." },
      { id: "collimate", label: "Beam collimated tightly to region of interest", detail: "Smaller field = less scatter to staff and lower patient skin dose." },
      { id: "geometry", label: "Under-couch tube / image intensifier ABOVE patient", detail: "Directs scatter downwards, away from operator faces and lenses." },
      { id: "distance", label: "Maximise distance — step back during DSA / cine runs", detail: "Inverse-square law: doubling distance quarters dose-rate. The most powerful single lever." },
      { id: "screen", label: "Ceiling-suspended lead screen positioned between you and patient", detail: "Single most effective additional barrier for the anaesthetist; combine with table-mounted drape." },
      { id: "magnification", label: "Avoid unnecessary magnification & last-image-hold used where possible", detail: "Magnification raises patient entrance dose dramatically." },
      { id: "review", label: "Screening time and DAP recorded at end of case", detail: "Audit trail for IRR 2017; alerts for high-dose patient skin reactions." },
    ],
  },
  {
    id: "ppe",
    title: "Personal protective equipment",
    subtitle: "Don in this order before entering the controlled area",
    icon: ShieldHalf,
    accent: "hsl(25 85% 55%)",
    items: [
      { id: "apron", label: "0.5 mm Pb-equivalent wrap-around lead apron", detail: "≈95% scatter attenuation at 70 kVp. Wrap-around (not just frontal) for cases where you may turn." },
      { id: "thyroid", label: "0.5 mm Pb thyroid shield", detail: "Thyroid wT = 0.04 and is highly radiosensitive in young workers." },
      { id: "glasses", label: "Leaded glasses with side shields", detail: "Lens of eye annual limit lowered to 20 mSv (ICRP 2011) — cataract is a deterministic effect." },
      { id: "gloves", label: "Lead gloves IF hands enter primary beam (e.g. pain procedures)", detail: "Otherwise keep hands out of the beam — gloves give a false sense of security and trigger AEC to boost dose." },
      { id: "apron-check", label: "Apron checked annually for cracks (fluoroscopy or radiograph QA)", detail: "Defective aprons withdrawn; log inspection date." },
      { id: "apron-store", label: "Apron hung on rack between cases — never folded", detail: "Folding cracks the lead matrix and creates pinhole leaks." },
    ],
  },
  {
    id: "dosimetry",
    title: "Dosimetry badge positioning",
    subtitle: "TLD or OSL, read monthly",
    icon: BadgeCheck,
    accent: "hsl(280 65% 60%)",
    items: [
      { id: "collar", label: "Collar badge — OUTSIDE apron, at left collar level", detail: "Estimates dose to unshielded head/neck/lens (the surrogate for effective dose in most staff)." },
      { id: "body", label: "Optional body badge — UNDER apron at chest/waist for high-exposure roles", detail: "Combined with collar reading to estimate true effective dose in interventional staff." },
      { id: "preg", label: "Declared-pregnant worker: additional badge UNDER apron at waist/abdomen", detail: "Foetal dose limit 1 mSv over remainder of pregnancy — read monthly with risk-assessment review." },
      { id: "ring", label: "Ring (extremity) badge for hands-in-beam procedures", detail: "Extremity equivalent-dose limit 500 mSv/year." },
      { id: "storage", label: "Badges stored in low-background area when not worn", detail: "Never left on the apron in the IR suite; never taken home." },
      { id: "exchange", label: "Badges exchanged on schedule and abnormal results investigated", detail: "Investigation level typically 1 mSv/month; classification triggered above 6 mSv/year." },
    ],
  },
];

const STORAGE_KEY = "radiation-safety-checklist-v1";

const loadState = (): Record<string, boolean> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const RadiationSafetyChecklist = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadState);

  const persist = (next: Record<string, boolean>) => {
    setChecked(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggle = (id: string) => persist({ ...checked, [id]: !checked[id] });

  const reset = () => persist({});

  const totals = useMemo(() => {
    const all = GROUPS.flatMap((g) => g.items);
    const done = all.filter((i) => checked[i.id]).length;
    return { done, total: all.length };
  }, [checked]);

  const pct = totals.total === 0 ? 0 : Math.round((totals.done / totals.total) * 100);

  return (
    <div className="my-6">
      <div className="bg-muted/30 rounded-xl border border-border p-4 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-lg font-serif font-bold text-foreground leading-tight flex items-center gap-2">
              <HardHat className="h-4 w-4 text-physics" aria-hidden />
              Radiation safety checklist — fluoroscopy & CT
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tick items as you set up the case. State persists locally.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors flex items-center gap-1"
            aria-label="Reset checklist"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        {/* Aggregate progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Overall preparedness</span>
            <span className="tabular-nums font-medium text-foreground">
              {totals.done}/{totals.total} · {pct}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Groups */}
        <div className="grid gap-3 md:grid-cols-3">
          {GROUPS.map((group) => {
            const groupDone = group.items.filter((i) => checked[i.id]).length;
            const Icon = group.icon;
            return (
              <section
                key={group.id}
                className="rounded-lg border border-border bg-background/80 p-3 space-y-2"
                style={{ borderLeftWidth: 4, borderLeftColor: group.accent }}
                aria-labelledby={`rsc-${group.id}-title`}
              >
                <header className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4
                      id={`rsc-${group.id}-title`}
                      className="text-sm font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: group.accent }} aria-hidden />
                      {group.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{group.subtitle}</p>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md tabular-nums shrink-0"
                    style={{ background: `${group.accent}26`, color: group.accent }}
                  >
                    {groupDone}/{group.items.length}
                  </span>
                </header>

                <ul className="space-y-1.5">
                  {group.items.map((item) => {
                    const isChecked = !!checked[item.id];
                    return (
                      <li key={item.id}>
                        <label
                          className={`flex items-start gap-2 p-1.5 rounded-md cursor-pointer transition-colors ${
                            isChecked ? "bg-primary/5" : "hover:bg-muted/50"
                          }`}
                        >
                          <span
                            className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border bg-background"
                            }`}
                            aria-hidden
                          >
                            {isChecked && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => toggle(item.id)}
                          />
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-xs font-medium leading-snug ${
                                isChecked ? "text-muted-foreground line-through" : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.detail && (
                              <span className="block text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                {item.detail}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="text-[11px] text-center text-muted-foreground italic flex items-center justify-center gap-1">
          <Move className="h-3 w-3" aria-hidden />
          One step back from the table is usually worth more than any PPE upgrade — distance is king.
        </p>
      </div>
    </div>
  );
};

export default RadiationSafetyChecklist;
