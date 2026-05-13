import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, Droplet, Activity, Heart, Pill, FlaskConical, Stethoscope } from "lucide-react";

/**
 * Interactive comparison: myasthenic vs cholinergic crisis.
 * User toggles individual feature axes — each axis reveals the contrasting
 * findings on both sides and highlights which crisis the picture favours.
 * A persistent treatment panel updates with the cumulative direction the
 * tally is pointing toward.
 */

type Crisis = "myasthenic" | "cholinergic";

interface Feature {
  id: string;
  label: string;
  icon: typeof Eye;
  myasthenic: { finding: string; cue: string };
  cholinergic: { finding: string; cue: string };
  /** Which side this finding favours when toggled on. Used for the tally. */
  favours: Crisis;
}

const FEATURES: Feature[] = [
  {
    id: "pupils",
    label: "Pupils",
    icon: Eye,
    myasthenic: { finding: "Normal or mydriatic", cue: "Sympathetic tone preserved; ptosis from levator weakness, not pupil." },
    cholinergic: { finding: "Miosis (pinpoint)", cue: "Muscarinic excess on iris sphincter — classic SLUDGE marker." },
    favours: "cholinergic",
  },
  {
    id: "secretions",
    label: "Secretions",
    icon: Droplet,
    myasthenic: { finding: "Normal / dry (often on atropinergics)", cue: "Bulbar weakness pools saliva but production is normal." },
    cholinergic: { finding: "SLUDGE — copious", cue: "Salivation, Lacrimation, Urination, Defecation, GI cramps, Emesis." },
    favours: "cholinergic",
  },
  {
    id: "muscle",
    label: "Muscle activity",
    icon: Activity,
    myasthenic: { finding: "Pure fatigable weakness", cue: "Worse with repetition; ice-pack test improves ptosis." },
    cholinergic: { finding: "Weakness + fasciculations", cue: "Nicotinic over-stimulation → desensitisation block on top of weakness." },
    favours: "cholinergic",
  },
  {
    id: "hr",
    label: "Heart rate",
    icon: Heart,
    myasthenic: { finding: "Normal or tachycardia (stress/fever)", cue: "No direct cardiac autonomic involvement." },
    cholinergic: { finding: "Bradycardia ± AV block", cue: "Vagal muscarinic excess; may need atropine 0.5–1 mg IV." },
    favours: "cholinergic",
  },
  {
    id: "drugs",
    label: "Drug history",
    icon: Pill,
    myasthenic: { finding: "Recent infection / steroid taper / aminoglycoside / Mg / β-blocker", cue: "~40 % triggered by infection — culture & treat (avoid worsening drugs)." },
    cholinergic: { finding: "Excessive pyridostigmine (> 120 mg q3h) or organophosphate exposure", cue: "Modern era rare since most patients on optimised dose + steroid." },
    favours: "cholinergic",
  },
  {
    id: "tensilon",
    label: "Edrophonium (Tensilon) test",
    icon: FlaskConical,
    myasthenic: { finding: "Improves within 30–60 s", cue: "Boosts ACh at NMJ — confirms under-cholinergic state." },
    cholinergic: { finding: "Worsens (more weakness, fasciculations)", cue: "Adds to existing ACh excess — have atropine + airway ready." },
    favours: "myasthenic",
  },
];

const TREATMENTS: Record<Crisis, {
  title: string;
  pearls: string[];
  immediate: string;
  avoid: string;
}> = {
  myasthenic: {
    title: "Myasthenic crisis treatment",
    immediate: "Optimise pyridostigmine · IVIg 0.4 g/kg/day × 5 OR PLEX × 5 · NIV trial if no bulbar weakness · intubate if FVC < 15 mL/kg, NIF > −20",
    pearls: [
      "Steroids AFTER immunotherapy is established (50 % transient worsening at 5–10 days)",
      "Stop pyridostigmine while intubated — reduces secretions, no ventilator benefit",
      "Avoid suxamethonium (resistance — needs ~2 mg/kg, unpredictable)",
      "Rocuronium: use 1/10–1/5 normal dose; reverse with sugammadex",
      "Treat trigger: cultures, antibiotics — but AVOID aminoglycosides, fluoroquinolones, macrolides",
    ],
    avoid: "Aminoglycosides · fluoroquinolones · macrolides · IV magnesium · β-blockers · suxamethonium full dose",
  },
  cholinergic: {
    title: "Cholinergic crisis treatment",
    immediate: "STOP all anticholinesterases · atropine 0.5–1 mg IV titrated to dry secretions · supportive ventilation · ICU admission",
    pearls: [
      "If organophosphate poisoning: add pralidoxime (2-PAM) 1–2 g IV — reactivates AChE before ageing",
      "Atropine endpoint: clear chest + dry mouth (NOT pupil dilation or HR alone)",
      "Reintroduce pyridostigmine only after 24–72 h drug holiday at much lower dose",
      "Monitor for intermediate syndrome (24–96 h post-OP exposure: proximal + respiratory weakness)",
      "Pralidoxime ineffective once AChE has 'aged' — give early (< 24 h)",
    ],
    avoid: "Restarting full-dose pyridostigmine · suxamethonium (prolonged block from low plasma cholinesterase) · further AChE inhibitors",
  },
};

const MyasthenicVsCholinergicComparison = () => {
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Tally: every active feature contributes one vote in its 'favours' direction
  const tally = { myasthenic: 0, cholinergic: 0 };
  for (const id of active) {
    const f = FEATURES.find((x) => x.id === id);
    if (f) tally[f.favours] += 1;
  }
  const leading: Crisis | null =
    tally.myasthenic === tally.cholinergic
      ? null
      : tally.myasthenic > tally.cholinergic
      ? "myasthenic"
      : "cholinergic";

  const total = FEATURES.length;
  const pctM = (tally.myasthenic / total) * 100;
  const pctC = (tally.cholinergic / total) * 100;

  return (
    <Card className="p-5 my-6 border-clinical/40">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-clinical" />
            Myasthenic vs cholinergic crisis — interactive comparison
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click each feature axis to reveal the contrasting findings and the
            cue it adds. The tally and treatment panel update with the leading
            picture — opposite treatments, so it matters.
          </p>
        </div>
        {active.size > 0 && (
          <Button variant="outline" size="sm" onClick={() => setActive(new Set())} className="shrink-0">
            Reset
          </Button>
        )}
      </div>

      {/* Header strip showing column identities */}
      <div className="grid grid-cols-[110px_1fr_1fr] gap-2 mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        <div>Feature</div>
        <div className="text-destructive">Myasthenic</div>
        <div className="text-clinical">Cholinergic</div>
      </div>

      {/* Feature rows */}
      <div className="space-y-2">
        {FEATURES.map((f) => {
          const on = active.has(f.id);
          const Icon = f.icon;
          return (
                <button
              key={f.id}
              type="button"
              onClick={() => toggle(f.id)}
              aria-pressed={on}
              className={`w-full grid grid-cols-[110px_1fr_1fr] gap-2 text-left rounded-lg border p-2.5 transition-all ${
                on
                  ? "border-clinical bg-clinical/5"
                  : "border-border bg-card hover:bg-accent/30"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`h-4 w-4 shrink-0 ${on ? "text-clinical" : "text-muted-foreground"}`} />
                <span className="text-xs font-semibold text-foreground">{f.label}</span>
              </div>

              <div className={`text-xs ${on ? "text-foreground" : "text-muted-foreground"}`}>
                <p className="font-medium">{on ? f.myasthenic.finding : "Tap to reveal"}</p>
                {on && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{f.myasthenic.cue}</p>
                )}
              </div>

              <div className={`text-xs ${on ? "text-foreground" : "text-muted-foreground"}`}>
                <p className="font-medium">{on ? f.cholinergic.finding : "Tap to reveal"}</p>
                {on && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{f.cholinergic.cue}</p>
                )}
              </div>
            </button>
  );
        })}
      </div>

      {/* Tally bar */}
      <div className="mt-4 p-3 rounded-lg border border-border bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Picture favours</p>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-destructive/50 text-destructive text-[10px]">
              Myasthenic {tally.myasthenic}
            </Badge>
            <Badge variant="outline" className="border-clinical/50 text-clinical text-[10px]">
              Cholinergic {tally.cholinergic}
            </Badge>
          </div>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden flex">
          <div className="h-full bg-destructive transition-all duration-500" style={{ width: `${pctM}%` }} />
          <div className="h-full bg-clinical transition-all duration-500" style={{ width: `${pctC}%` }} />
        </div>
      </div>

      {/* Treatment panel */}
      {leading && (
        <div
          className={`mt-3 p-4 rounded-lg border-2 ${
            leading === "myasthenic"
              ? "border-destructive/40 bg-destructive/5"
              : "border-clinical/40 bg-clinical/5"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Working diagnosis</p>
          <p className="text-base font-serif font-bold text-foreground mt-0.5">{TREATMENTS[leading].title}</p>

          <div className="mt-3 p-2.5 rounded-md bg-card border border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-destructive flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Immediate action
            </p>
            <p className="text-xs text-foreground mt-1">{TREATMENTS[leading].immediate}</p>
          </div>

          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              Treatment pearls
            </p>
            <ul className="space-y-1">
              {TREATMENTS[leading].pearls.map((p, i) => (
                <li key={i} className="text-xs text-foreground flex gap-1.5">
                  <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 p-2 rounded-md bg-muted/40 border border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Avoid</p>
            <p className="text-xs text-foreground mt-1">{TREATMENTS[leading].avoid}</p>
          </div>
        </div>
      )}

      {!leading && active.size > 0 && (
        <p className="mt-3 text-xs text-muted-foreground italic text-center">
          Tally is tied — toggle more axes (especially Tensilon, secretions, pupils) to break the tie.
        </p>
      )}
    </Card>
  );
};

export default MyasthenicVsCholinergicComparison;
