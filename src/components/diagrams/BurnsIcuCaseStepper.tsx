import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  Stethoscope,
  Wind,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive worked Burns ICU case stepper.
 *
 * Mirrors the five flowchart nodes (recognise → airway → toxin → bronchoscopy
 * → ventilator) and presents a single 38-year-old house-fire patient whose
 * vitals, ABG and ventilator parameters evolve as the trainee makes decisions.
 *
 * Each scene offers 2–3 multiple-choice options; the "best" answer advances
 * the case, "acceptable" gives partial credit + warning, and "wrong" rolls
 * back with a red explanation. A running scorecard tracks decisions.
 */

type Tone = "ok" | "warn" | "danger";

interface Vitals {
  hr: number;
  bp: string;
  rr: number;
  spo2: number;
  gcs: number;
  temp: number;
  uo?: string;
}

interface Abg {
  pH: string;
  paO2: string;
  paCO2: string;
  hco3: string;
  be: string;
  lac: string;
  cohb: string;
  metHb?: string;
  fiO2?: string;
}

interface Vent {
  mode?: string;
  vt?: string;
  rr?: string;
  peep?: string;
  pPlat?: string;
  pf?: string;
}

interface Choice {
  label: string;
  verdict: "best" | "ok" | "wrong";
  feedback: string;
}

interface Scene {
  id: number;
  node: string;
  time: string;
  narrative: string;
  vitals: Vitals;
  abg?: Abg;
  vent?: Vent;
  question: string;
  choices: Choice[];
}

const PATIENT = {
  name: "Mr K",
  age: 38,
  weight: 80,
  scenario:
    "Rescued from an enclosed bedroom fire after ~12 min of smoke exposure. Deep dermal facial burns, soot in nares and oropharynx, hoarse voice, ~40 % TBSA flame burns to torso and arms.",
};

const SCENES: Scene[] = [
  {
    id: 0,
    node: "1. Recognise inhalation injury",
    time: "T+0 min — ED resus",
    narrative:
      "Brought in by HEMS on a non-rebreather. Talking but voice is rasping. Soot at the nares and visible carbonaceous sputum.",
    vitals: { hr: 118, bp: "108/72", rr: 26, spo2: 98, gcs: 14, temp: 35.6 },
    abg: { pH: "7.31", paO2: "32 kPa", paCO2: "4.4 kPa", hco3: "18", be: "−6.5", lac: "5.8", cohb: "24 %", fiO2: "100 %" },
    question: "Initial priority?",
    choices: [
      {
        label: "Continue 100 % O₂, send full ABG with co-oximetry, alert difficult-airway team and burns centre",
        verdict: "best",
        feedback:
          "Correct — SpO₂ 98 % is reassuring but COHb 24 % means true SaO₂ is much lower. CO ½-life shortens from 4 h (air) to 80 min on 100 % O₂.",
      },
      {
        label: "Wean FiO₂ to 40 % because SpO₂ is 98 %",
        verdict: "wrong",
        feedback:
          "Dangerous — pulse oximeters cannot distinguish COHb from O₂Hb. Maintain 100 % O₂ until COHb < 5 %.",
      },
      {
        label: "Start salbutamol nebs and observe",
        verdict: "ok",
        feedback:
          "Misses the point — the immediate threats are CO, airway oedema and possible cyanide. Bronchodilators are useful adjuncts, not first action.",
      },
    ],
  },
  {
    id: 1,
    node: "2. Airway decision",
    time: "T+20 min — ED resus",
    narrative:
      "Voice deteriorating to a whisper, drooling, tongue swelling visible. Anterior chest is tight with circumferential deep dermal burn.",
    vitals: { hr: 132, bp: "98/64", rr: 32, spo2: 94, gcs: 13, temp: 35.4 },
    abg: { pH: "7.27", paO2: "22 kPa", paCO2: "5.1 kPa", hco3: "16", be: "−9.0", lac: "8.2", cohb: "18 %", fiO2: "100 %" },
    question: "Airway plan?",
    choices: [
      {
        label:
          "Modified RSI: ketamine 1.5 mg/kg + rocuronium 1.2 mg/kg, ≥ 8.0 mm UNCUT tube, surgeon ready for FONA, secure with umbilical tape",
        verdict: "best",
        feedback:
          "Correct — early intubation before oedema obliterates the airway. Uncut large-bore tube allows for facial swelling and later bronchoscopy.",
      },
      {
        label: "RSI with suxamethonium 1.5 mg/kg + standard 7.5 mm cut tube, secure with adhesive tape",
        verdict: "wrong",
        feedback:
          "Two errors: (a) cut tube + adhesive tape will fail as facial oedema worsens; (b) although sux is safe < 24 h, the cut/adhesive choice is unsafe. Use uncut ≥ 8.0 mm + umbilical tape.",
      },
      {
        label: "Defer intubation — give nebulised adrenaline and reassess in 30 min",
        verdict: "wrong",
        feedback:
          "Wrong window — stridor, drooling and tongue oedema mark the last safe moment. Delay risks an emergency front-of-neck airway.",
      },
    ],
  },
  {
    id: 2,
    node: "3. Toxin co-management",
    time: "T+45 min — post-intubation",
    narrative:
      "Tube secured, ventilated. Persistent metabolic acidosis with rising lactate despite adequate MAP and Parkland fluids running.",
    vitals: { hr: 124, bp: "102/68 (no vasopressor)", rr: 18, spo2: 99, gcs: "sedated", temp: 36.0 } as unknown as Vitals,
    abg: { pH: "7.21", paO2: "38 kPa", paCO2: "4.3 kPa", hco3: "14", be: "−12", lac: "11.4", cohb: "9 %", fiO2: "100 %" },
    question: "Next intervention for the persistent acidosis + lactate 11.4?",
    choices: [
      {
        label: "Hydroxocobalamin 5 g IV over 15 min for empirical cyanide treatment; continue 100 % O₂; consider HBO referral if symptoms persist",
        verdict: "best",
        feedback:
          "Correct — enclosed-space fire + lactate > 10 mmol/L with adequate perfusion = empirical cyanide. Hydroxocobalamin is safe (turns urine red) and binds CN⁻ as cyanocobalamin.",
      },
      {
        label: "Sodium nitrite 300 mg IV",
        verdict: "wrong",
        feedback:
          "Avoid in fire victims — induces methaemoglobinaemia which compounds CO-related impaired O₂ delivery. Hydroxocobalamin is preferred.",
      },
      {
        label: "Bicarbonate 8.4 % 100 mL and recheck",
        verdict: "ok",
        feedback:
          "Treats the number, not the cause. Bicarb can be a bridge but you must give hydroxocobalamin and identify the source.",
      },
    ],
  },
  {
    id: 3,
    node: "4. Bronchoscopy & lower-airway care",
    time: "T+3 h — burns ICU",
    narrative:
      "Lactate falling, COHb 3 %. Peak airway pressure rising 28 → 36 cmH₂O over 1 h, P/F dropping. Bilateral coarse crackles with thick sooty secretions on suction.",
    vitals: { hr: 116, bp: "110/72 on noradrenaline 0.08", rr: 18, spo2: 92, gcs: "sedated", temp: 37.4 } as unknown as Vitals,
    abg: { pH: "7.32", paO2: "11 kPa", paCO2: "6.0 kPa", hco3: "20", be: "−5", lac: "3.1", cohb: "3 %", fiO2: "80 %" },
    vent: { mode: "VC-PRVC", vt: "480 mL (6 mL/kg)", rr: "18", peep: "10", pPlat: "36", pf: "13.7 kPa" },
    question: "Next step?",
    choices: [
      {
        label: "Therapeutic fibre-optic bronchoscopy with lavage; grade injury (Endorf 0–4); commence nebulised heparin 5,000 U + NAC q4h",
        verdict: "best",
        feedback:
          "Correct — rising peak pressures + sloughing secretions = grade 3–4 injury. Bronchoscopy is diagnostic AND therapeutic; nebulised heparin/NAC reduces cast formation.",
      },
      {
        label: "Increase Vt to 8 mL/kg to drop the PaCO₂",
        verdict: "wrong",
        feedback:
          "Plateau is already 36 — exceeding 30 raises VILI risk. Permissive hypercapnia is acceptable; address compliance instead.",
      },
      {
        label: "Add inhaled nitric oxide now",
        verdict: "ok",
        feedback:
          "Premature — iNO is reserved for refractory hypoxaemia after lung-protective optimisation, prone and NMB.",
      },
    ],
  },
  {
    id: 4,
    node: "5. Ventilator escalation",
    time: "T+12 h — burns ICU",
    narrative:
      "Despite bronchoscopic toilet, oxygenation worsens. Plateau still 34 with Vt 6 mL/kg. Anterior chest eschar feels board-like; peak airway pressure jumps with each position change.",
    vitals: { hr: 122, bp: "98/58 on noradrenaline 0.25", rr: 22, spo2: 88, gcs: "sedated", temp: 38.2 } as unknown as Vitals,
    abg: { pH: "7.18", paO2: "7.5 kPa", paCO2: "8.4 kPa", hco3: "22", be: "−4", lac: "4.0", cohb: "1 %", fiO2: "100 %" },
    vent: { mode: "PC-AC", vt: "480 mL", rr: "22", peep: "14", pPlat: "34", pf: "7.5 kPa" },
    question: "What now?",
    choices: [
      {
        label:
          "Chest escharotomy to relieve restrictive chest wall, then NMB + prone positioning; if P/F < 80 or Murray ≥ 3 refer to ECMO retrieval",
        verdict: "best",
        feedback:
          "Correct — the restrictive chest is contributing to the plateau pressure and hypoxaemia. PROSEVA supports prone in P/F < 150; EOLIA supports VV-ECMO referral for refractory cases.",
      },
      {
        label: "Switch to HFOV immediately",
        verdict: "wrong",
        feedback:
          "OSCILLATE / OSCAR trials showed no benefit and possible harm from routine HFOV in moderate–severe ARDS. Consider only as rescue in centres with experience.",
      },
      {
        label: "Reduce PEEP to drop plateau pressure",
        verdict: "wrong",
        feedback:
          "Will worsen oxygenation and de-recruit. Address chest-wall compliance (escharotomy) and use proning before manipulating PEEP downward.",
      },
    ],
  },
];

const TONE_BG: Record<Tone, string> = {
  ok: "border-emerald-600/40 bg-emerald-600/5",
  warn: "border-orange-500/40 bg-orange-500/5",
  danger: "border-destructive/40 bg-destructive/5",
};

const TONE_TEXT: Record<Tone, string> = {
  ok: "text-emerald-700 dark:text-emerald-400",
  warn: "text-orange-600 dark:text-orange-400",
  danger: "text-destructive",
};

const verdictTone: Record<Choice["verdict"], Tone> = {
  best: "ok",
  ok: "warn",
  wrong: "danger",
};

export const BurnsIcuCaseStepper = () => {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});

  const scene = SCENES[step];
  const pick = picked[step];
  const verdict = pick !== undefined ? scene.choices[pick].verdict : null;
  const _tone: Tone | null = verdict ? verdictTone[verdict] : null;

  const score = useMemo(() => {
    let best = 0;
    let ok = 0;
    let wrong = 0;
    Object.entries(picked).forEach(([k, v]) => {
      const verd = SCENES[Number(k)].choices[v].verdict;
      if (verd === "best") best++;
      else if (verd === "ok") ok++;
      else wrong++;
    });
    return { best, ok, wrong, answered: best + ok + wrong };
  }, [picked]);

  const canAdvance = pick !== undefined && verdict !== "wrong";

  return (
    <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
      <figcaption className="mb-3">
        <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Flame className="h-4 w-4 text-orange-500" /> Worked case — {PATIENT.name}, {PATIENT.age} y / {PATIENT.weight} kg
        </h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{PATIENT.scenario}</p>
      </figcaption>

      {/* Step rail */}
      <div className="mb-3 flex flex-wrap gap-1">
        {SCENES.map((sc, i) => {
          const done = picked[i] !== undefined && SCENES[i].choices[picked[i]].verdict !== "wrong";
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                step === i
                  ? "border-primary bg-primary text-primary-foreground"
                  : done
                  ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400"
                  : "border-border bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {done && <CheckCircle2 className="h-3 w-3" />}
              <span>{sc.node}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[280px_1fr]">
        {/* Vitals / ABG / Vent panel */}
        <aside className="space-y-2 rounded-lg border border-border bg-background p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" /> {scene.time}
          </p>

          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <Heart className="h-3 w-3" /> Vitals
            </p>
            <dl className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <Vital label="HR" value={`${scene.vitals.hr}`} />
              <Vital label="BP" value={scene.vitals.bp} />
              <Vital label="RR" value={`${scene.vitals.rr}`} />
              <Vital label="SpO₂" value={`${scene.vitals.spo2} %`} />
              <Vital label="GCS" value={`${scene.vitals.gcs}`} />
              <Vital label="Temp" value={`${scene.vitals.temp} °C`} />
            </dl>
          </div>

          {scene.abg && (
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Stethoscope className="h-3 w-3" /> ABG (FiO₂ {scene.abg.fiO2})
              </p>
              <dl className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
                <Vital label="pH" value={scene.abg.pH} />
                <Vital label="PaO₂" value={scene.abg.paO2} />
                <Vital label="PaCO₂" value={scene.abg.paCO2} />
                <Vital label="HCO₃" value={scene.abg.hco3} />
                <Vital label="BE" value={scene.abg.be} />
                <Vital label="Lac" value={scene.abg.lac} alert={parseFloat(scene.abg.lac) > 4} />
                <Vital label="COHb" value={scene.abg.cohb} alert={parseFloat(scene.abg.cohb) > 10} />
              </dl>
            </div>
          )}

          {scene.vent && (
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Wind className="h-3 w-3" /> Ventilator
              </p>
              <dl className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
                {scene.vent.mode && <Vital label="Mode" value={scene.vent.mode} />}
                {scene.vent.vt && <Vital label="Vt" value={scene.vent.vt} />}
                {scene.vent.rr && <Vital label="Rate" value={scene.vent.rr} />}
                {scene.vent.peep && <Vital label="PEEP" value={scene.vent.peep} />}
                {scene.vent.pPlat && <Vital label="P-plat" value={scene.vent.pPlat} alert={parseFloat(scene.vent.pPlat) > 30} />}
                {scene.vent.pf && <Vital label="P/F" value={scene.vent.pf} />}
              </dl>
            </div>
          )}
        </aside>

        {/* Scene + question */}
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{scene.node}</p>
          <p className="mt-1 text-sm text-foreground leading-relaxed">{scene.narrative}</p>

          <p className="mt-3 text-sm font-semibold text-foreground">{scene.question}</p>

          <div className="mt-2 space-y-2">
            {scene.choices.map((c, i) => {
              const isPick = pick === i;
              const showState = isPick;
              const t = showState ? verdictTone[c.verdict] : null;
              return (
    <DiagramFigure
      id="burns-icu-case-stepper"
      title="Burns ICU case stepper"
      description="Auto-generated wrapper for the Burns ICU case stepper anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                      <button
                    key={i}
                    type="button"
                    onClick={() => setPicked((p) => ({ ...p, [step]: i }))}
                    className={cn(
                      "w-full rounded-lg border p-3 text-left text-xs transition-all",
                      showState ? TONE_BG[t!] + " ring-2 ring-primary/30" : "border-border bg-card hover:bg-muted/40",
                    )}
                  >
                    <p className={cn("font-medium leading-relaxed", showState ? TONE_TEXT[t!] : "text-foreground")}>
                      {showState && (c.verdict === "best" ? <CheckCircle2 className="inline h-3.5 w-3.5 mr-1" />
                        : c.verdict === "ok" ? <AlertTriangle className="inline h-3.5 w-3.5 mr-1" />
                        : <XCircle className="inline h-3.5 w-3.5 mr-1" />)}
                      {c.label}
                    </p>
                    {showState && (
                      <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">{c.feedback}</p>
                    )}
                  </button>
    </DiagramFigure>
  );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="h-7 px-2 text-[11px]"
            >
              ← Previous
            </Button>
            <p className="text-[10px] text-muted-foreground">
              Scene {step + 1} of {SCENES.length}
              {pick !== undefined && verdict === "wrong" && (
                <span className="ml-2 text-destructive">try again to advance</span>
              )}
            </p>
            <Button
              size="sm"
              disabled={!canAdvance || step === SCENES.length - 1}
              onClick={() => setStep((s) => Math.min(SCENES.length - 1, s + 1))}
              className="h-7 px-2 text-[11px]"
            >
              Next <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scorecard */}
      <div className="mt-3 grid grid-cols-4 gap-2 text-[11px]">
        <ScoreCell label="Answered" value={`${score.answered} / ${SCENES.length}`} icon={<Activity className="h-3 w-3" />} />
        <ScoreCell label="Best" value={`${score.best}`} tone="ok" />
        <ScoreCell label="Acceptable" value={`${score.ok}`} tone="warn" />
        <ScoreCell label="Wrong" value={`${score.wrong}`} tone="danger" />
      </div>

      {step === SCENES.length - 1 && pick !== undefined && verdict !== "wrong" && (
        <div className={cn(
          "mt-3 rounded-md border p-3 text-xs",
          score.wrong === 0 && score.ok === 0 ? TONE_BG.ok : score.wrong === 0 ? TONE_BG.warn : TONE_BG.danger,
        )}>
          <p className="font-semibold text-foreground">
            Case complete. {score.best === SCENES.length
              ? "Flawless run — exam-standard decision-making at every checkpoint."
              : score.wrong === 0
              ? "Safe management overall; revisit the acceptable-but-not-ideal answers."
              : "Re-attempt the wrong answers to consolidate the learning points."}
          </p>
        </div>
      )}
    </figure>
  );
};

const Vital = ({ label, value, alert }: { label: string; value: string; alert?: boolean }) => (
  <>
    <dt className="text-muted-foreground">{label}</dt>
    <dd className={cn("font-mono font-semibold", alert ? "text-destructive" : "text-foreground")}>{value}</dd>
  </>
);

const ScoreCell = ({ label, value, icon, tone }: { label: string; value: string; icon?: React.ReactNode; tone?: Tone }) => (
  <div className={cn("rounded-md border p-2", tone ? TONE_BG[tone] : "border-border bg-muted/30")}>
    <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">{icon}{label}</p>
    <p className={cn("text-sm font-bold", tone ? TONE_TEXT[tone] : "text-foreground")}>{value}</p>
  </div>
);

export default BurnsIcuCaseStepper;
