import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Pill } from "lucide-react";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta } from "@/data/curriculum";

interface InfusionStandard {
  amount_mg?: number;
  diluent_ml?: number;
  unit?: string;
  weight_based?: boolean;
  note?: string;
}

interface Drug {
  slug: string;
  name: string;
  drug_class: string;
  synonyms: string[];
  indication_oneliner: string;
  key_warning: string;
  adult_bolus_dose: string;
  infusion_range: string;
  presentation: string;
  mechanism_of_action: string;
  pharmacokinetics: string;
  preparation: string;
  dosing: string;
  monitoring: string;
  side_effects: string;
  contraindications: string;
  interactions: string;
  infusion_standard: InfusionStandard;
  related_topic_ids: string[];
}

const Section = ({ title, body }: { title: string; body: string }) => (
  <section className="bg-card border border-border rounded-lg p-4">
    <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{body}</p>
  </section>
);

// Parse a free-text dosing string into labelled buckets so adult vs paediatric
// vs renal/hepatic/elderly considerations are visually separated.
type DosingBucket = { key: string; label: string; tone: string; body: string };

const DOSING_RULES: Array<{ key: string; label: string; tone: string; patterns: RegExp[] }> = [
  { key: "adult-bolus", label: "Adult — bolus", tone: "border-drugs/30 bg-drugs/5",
    patterns: [/^adult bolus/i, /^adults? bolus/i, /^bolus/i, /^induction/i, /^loading/i, /^rsi/i, /^stat/i] },
  { key: "adult-infusion", label: "Adult — infusion / maintenance", tone: "border-drugs/30 bg-drugs/5",
    patterns: [/^adult infusion/i, /^infusion/i, /^maintenance/i, /^tiva/i, /^icu sedation/i, /^continuous/i] },
  { key: "adult", label: "Adult — general", tone: "border-drugs/30 bg-drugs/5",
    patterns: [/^adults?\b/i] },
  { key: "paediatric", label: "Paediatric", tone: "border-physiology/30 bg-physiology/5",
    patterns: [/^paed/i, /^paediatrics?/i, /^pediatric/i, /^children/i, /^neonat/i] },
  { key: "elderly", label: "Elderly / frail", tone: "border-perioperative/30 bg-perioperative/5",
    patterns: [/^elderly/i, /^frail/i, /^elderly\/obese/i, /^elderly\/frail/i] },
  { key: "renal", label: "Renal impairment / RRT", tone: "border-clinical/30 bg-clinical/5",
    patterns: [/^renal/i, /^renal impairment/i, /^renal replacement/i, /^crcl/i, /^rrt/i, /^cvvh/i, /^renal adjustment/i] },
  { key: "hepatic", label: "Hepatic impairment", tone: "border-pharmacology/30 bg-pharmacology/5",
    patterns: [/^hepatic/i, /^liver/i] },
  { key: "obese", label: "Obesity", tone: "border-perioperative/30 bg-perioperative/5",
    patterns: [/^obese/i, /^obesity/i, /^bariatric/i] },
  { key: "obstetric", label: "Obstetric", tone: "border-physiology/30 bg-physiology/5",
    patterns: [/^obstetric/i, /^pregnan/i] },
  { key: "other", label: "Other / context", tone: "border-border bg-card",
    patterns: [/^post-operative/i, /^post operative/i, /^icu/i, /^prophylaxis/i, /^altitude/i] },
];

function classifySegment(label: string): { key: string; label: string; tone: string } {
  for (const rule of DOSING_RULES) {
    if (rule.patterns.some((re) => re.test(label.trim()))) {
      // Use the original written label (more specific than the bucket label) when helpful
      return { key: rule.key, label: rule.label, tone: rule.tone };
    }
  }
  return { key: "notes", label: label.trim().replace(/[:.]$/, ""), tone: "border-border bg-card" };
}

function parseDosing(raw: string): { buckets: DosingBucket[]; preface: string } {
  if (!raw) return { buckets: [], preface: "" };
  // Match "Label: ..." segments. Labels may contain spaces, slashes, parentheses, hyphens.
  const regex = /([A-Z][A-Za-z0-9 /()\-–]{1,50}?):\s+/g;
  const matches: Array<{ label: string; start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(raw)) !== null) {
    matches.push({ label: m[1], start: m.index, end: m.index + m[0].length });
  }
  if (matches.length === 0) return { buckets: [], preface: raw.trim() };
  const preface = raw.slice(0, matches[0].start).trim();
  const buckets: DosingBucket[] = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].start : raw.length;
    const body = raw.slice(cur.end, nextStart).trim().replace(/\s+/g, " ");
    if (!body) continue;
    const cls = classifySegment(cur.label);
    buckets.push({ key: `${cls.key}-${i}`, label: cur.label.trim(), tone: cls.tone, body });
  }
  return { buckets, preface };
}

function DosingBreakdown({ raw }: { raw: string }) {
  const { buckets, preface } = parseDosing(raw);
  if (buckets.length === 0) {
    return (
      <section className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Dosing — regimen defaults & patient context</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{raw || "—"}</p>
      </section>
    );
  }
  return (
    <section className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Dosing — regimen defaults & patient context</h3>
      <p className="text-[11px] text-muted-foreground mb-3">
        Bolus and infusion ranges below; paediatric, renal, hepatic and elderly adjustments are split out where relevant.
      </p>
      {preface && (
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{preface}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-2.5">
        {buckets.map((b) => (
          <div key={b.key} className={`rounded-md border ${b.tone} p-3`}>
            <div className="text-[10px] uppercase tracking-wide font-semibold text-foreground/80 mb-1">{b.label}</div>
            <div className="text-sm text-foreground/90 leading-relaxed">{b.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =====================================================================
// Standardized Avoid / Caution / Preferred badges (shared with PathophysDrugMapper convention)
// =====================================================================
type Impact = "avoid" | "caution" | "preferred" | "neutral";

const IMPACT_DEFINITIONS: Record<Exclude<Impact, "neutral">, { label: string; tone: string; description: string }> = {
  avoid: {
    label: "Avoid",
    tone: "bg-destructive/10 text-destructive border-destructive/30",
    description: "Serious or potentially irreversible harm — do not use, or use only when no safer alternative exists.",
  },
  caution: {
    label: "Caution",
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
    description: "Predictable adverse effect or pitfall — anticipate, mitigate and monitor closely.",
  },
  preferred: {
    label: "Preferred / required",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    description: "Mandatory or strongly recommended monitoring / target — should be in place during use.",
  },
};

const NEUTRAL_TONE = "bg-muted text-muted-foreground border-border";

// Heuristic classification of a side-effect or monitoring sentence into an Impact band.
function classifyImpact(label: string, body: string, mode: "side_effects" | "monitoring"): Impact {
  const text = `${label} ${body}`.toLowerCase();
  const AVOID = [
    "anaphylaxis", "fatal", "death", "arrest", "irreversible", "fibrosis",
    "pris", "propofol infusion syndrome", "torsades", "vf", "vt storm",
    "rhabdomyolysis", "agranulocytosis", "stevens-johnson", "steven-johnson",
    "dress", "malignant hyperthermia", "hyperkalaem", "complete heart block",
    "asystole", "anaphylactoid", "ototoxicity",
  ];
  const CAUTION = [
    "hypotension", "bradycardia", "tachycardia", "qt", "qtc", "prolong",
    "respiratory depression", "apnoea", "apnea", "rigidity", "sedation",
    "delirium", "myoclonus", "phlebitis", "pain on injection", "ponv",
    "nausea", "vomit", "histamine", "red man", "thrombocytopenia",
    "neutropenia", "nephrotox", "hepatotox", "neuropathy", "tremor",
    "ataxia", "miosis", "hyperalgesia", "thyroid", "photosensitivity",
    "discolour", "discolor", "elevated transaminase", "lft", "tft",
  ];
  const PREFERRED_MON = [
    "continuous", "mandatory", "monitor", "tdm", "trough", "peak",
    "target", "bis", "peeg", "etco2", "ecg", "nibp", "ibp", "spo2",
    "u&e", "fbc", "lipid", "ck", "creatine kinase", "lft", "tft", "cxr",
    "level", "essential", "baseline", "daily", "before the", "pre-dose",
  ];

  if (AVOID.some((k) => text.includes(k))) return "avoid";
  if (mode === "monitoring" && PREFERRED_MON.some((k) => text.includes(k))) return "preferred";
  if (CAUTION.some((k) => text.includes(k))) return "caution";
  if (mode === "monitoring") return "preferred"; // default monitoring entry = recommended
  return "neutral";
}

function parseLabelled(raw: string): Array<{ label: string; body: string }> {
  if (!raw) return [];
  const regex = /([A-Z][A-Za-z0-9 /()\-–'’]{1,60}?):\s+/g;
  const matches: Array<{ label: string; start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(raw)) !== null) {
    matches.push({ label: m[1], start: m.index, end: m.index + m[0].length });
  }
  if (matches.length === 0) {
    // Split on sentences as fallback so each item can be badged.
    return raw.split(/(?<=\.)\s+(?=[A-Z])/).map((s) => ({ label: "", body: s.trim() })).filter((x) => x.body);
  }
  const out: Array<{ label: string; body: string }> = [];
  const preface = raw.slice(0, matches[0].start).trim();
  if (preface) out.push({ label: "", body: preface });
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].start : raw.length;
    const body = raw.slice(cur.end, nextStart).trim().replace(/\s+/g, " ");
    if (body) out.push({ label: cur.label.trim(), body });
  }
  return out;
}

function ImpactBadge({ impact }: { impact: Impact }) {
  if (impact === "neutral") {
    return (
      <span className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border ${NEUTRAL_TONE}`}>
        Note
      </span>
    );
  }
  const def = IMPACT_DEFINITIONS[impact];
  return (
    <span
      title={def.description}
      className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border ${def.tone}`}
    >
      {def.label}
    </span>
  );
}

function ImpactLegend() {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-3 text-[11px] text-muted-foreground">
      <span className="font-medium text-foreground">Legend:</span>
      {(Object.keys(IMPACT_DEFINITIONS) as Array<Exclude<Impact, "neutral">>).map((k) => {
        const def = IMPACT_DEFINITIONS[k];
        return (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded border ${def.tone}`}>
              {def.label}
            </span>
            <span>{def.description}</span>
          </span>
        );
      })}
    </div>
  );
}

function ClinicalSignalPanel({
  title,
  raw,
  mode,
}: {
  title: string;
  raw: string;
  mode: "side_effects" | "monitoring";
}) {
  const items = parseLabelled(raw);
  if (items.length === 0) {
    return (
      <section className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">—</p>
      </section>
    );
  }
  const subtitle =
    mode === "monitoring"
      ? "Drug levels, haemodynamic targets and ECG/QTc considerations — banded by clinical priority."
      : "Adverse effects banded by severity to guide vigilance.";
  return (
    <section className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">{subtitle}</p>
      <ImpactLegend />
      <ul className="grid gap-2">
        {items.map((it, i) => {
          const impact = classifyImpact(it.label, it.body, mode);
          return (
            <li key={i} className="flex items-start gap-2.5 bg-background/50 border border-border rounded-md p-2.5">
              <div className="shrink-0 pt-0.5">
                <ImpactBadge impact={impact} />
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed min-w-0">
                {it.label && (
                  <span className="font-medium text-foreground">{it.label}: </span>
                )}
                <span className="text-foreground/85">{it.body}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function InfusionCalculator({ drug }: { drug: Drug }) {
  const std = drug.infusion_standard || {};
  const [weight, setWeight] = useState<number>(70);
  const [rate, setRate] = useState<number>(0.1);

  if (!std.amount_mg || !std.diluent_ml || !std.unit) return null;

  const concMgPerMl = std.amount_mg / std.diluent_ml;
  const concMcgPerMl = concMgPerMl * 1000;
  const weightBased = std.weight_based;

  // Compute mL/hr
  let mlPerHr = 0;
  if (std.unit === "mcg/kg/min") {
    const mcgPerMin = rate * weight;
    mlPerHr = (mcgPerMin * 60) / concMcgPerMl;
  } else if (std.unit === "mcg/min") {
    mlPerHr = (rate * 60) / concMcgPerMl;
  } else if (std.unit === "mg/kg/hr") {
    mlPerHr = (rate * weight) / concMgPerMl;
  } else if (std.unit === "mcg/kg/hr") {
    mlPerHr = (rate * weight) / concMcgPerMl;
  } else if (std.unit === "units/hr" || std.unit === "mg/hr") {
    mlPerHr = rate / concMgPerMl;
  }

  return (
    <section className="bg-drugs/5 border border-drugs/30 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Infusion calculator</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Standard mix: <span className="font-medium text-foreground">{std.amount_mg} mg in {std.diluent_ml} mL</span>
        {" "}({concMgPerMl.toFixed(2)} mg/mL{std.note ? ` — ${std.note}` : ""})
      </p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {weightBased && (
          <label className="text-xs">
            <span className="block text-muted-foreground mb-1">Weight (kg)</span>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm"
            />
          </label>
        )}
        <label className="text-xs">
          <span className="block text-muted-foreground mb-1">Target ({std.unit})</span>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm"
          />
        </label>
      </div>
      <div className="text-sm">
        <span className="text-muted-foreground">Pump rate: </span>
        <span className="font-semibold text-drugs">{mlPerHr.toFixed(2)} mL/hr</span>
      </div>
    </section>
  );
}

export default function DrugDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase.from("drugs").select("*").eq("slug", slug).maybeSingle();
      setDrug(data as Drug | null);
      setLoading(false);
    })();
  }, [slug]);

  const relatedTopics = useMemo(() => {
    if (!drug?.related_topic_ids?.length) return [];
    return allTopics.filter((t) => drug.related_topic_ids.includes(t.id) && t.available);
  }, [drug]);

  if (loading) return (
    <div className="min-h-screen bg-background"><Header /><main className="container mx-auto px-4 py-8"><p className="text-sm text-muted-foreground">Loading…</p></main></div>
  );
  if (!drug) return (
    <div className="min-h-screen bg-background"><Header /><main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/drugs" className="text-sm text-drugs inline-flex items-center gap-1 mb-4"><ArrowLeft className="h-3.5 w-3.5"/>Back to formulary</Link>
      <p className="text-sm text-muted-foreground">Drug not found.</p>
    </main></div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/drugs" className="text-sm text-muted-foreground hover:text-drugs inline-flex items-center gap-1 mb-3">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to formulary
        </Link>

        {/* Sticky crash card */}
        <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 mb-4 border-b border-border">
          <div className="bg-drugs/5 border border-drugs/40 rounded-xl p-4">
            <div className="flex items-start gap-3 flex-wrap">
              <div className="h-9 w-9 rounded-lg bg-drugs/15 text-drugs grid place-items-center shrink-0">
                <Pill className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-foreground">{drug.name}</h1>
                  <span className="text-[10px] uppercase tracking-wide text-drugs font-medium">{drug.drug_class}</span>
                </div>
                {drug.synonyms?.length > 0 && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">aka {drug.synonyms.join(", ")}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1.5">{drug.indication_oneliner}</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-2.5 text-xs">
                  <div className="bg-card border border-border rounded-md px-2.5 py-1.5">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Adult bolus</span>
                    <div className="font-medium text-foreground">{drug.adult_bolus_dose || "—"}</div>
                  </div>
                  <div className="bg-card border border-border rounded-md px-2.5 py-1.5">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Infusion</span>
                    <div className="font-medium text-foreground">{drug.infusion_range || "—"}</div>
                  </div>
                </div>
                {drug.key_warning && (
                  <div className="mt-2 flex items-start gap-1.5 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-2 py-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{drug.key_warning}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <InfusionCalculator drug={drug} />

        <div className="mt-4 grid gap-3">
          <Section title="Presentation" body={drug.presentation} />
          <Section title="Mechanism of action" body={drug.mechanism_of_action} />
          <Section title="Pharmacokinetics" body={drug.pharmacokinetics} />
          <Section title="Preparation & dilution" body={drug.preparation} />
          <DosingBreakdown raw={drug.dosing} />
          <ClinicalSignalPanel title="Monitoring requirements" raw={drug.monitoring} mode="monitoring" />
          <ClinicalSignalPanel title="Side effects" raw={drug.side_effects} mode="side_effects" />
          <Section title="Contraindications" body={drug.contraindications} />
          <Section title="Interactions" body={drug.interactions} />
        </div>

        {relatedTopics.length > 0 && (
          <section className="mt-6 bg-muted/30 border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Related curriculum topics</h3>
            <ul className="flex flex-wrap gap-2">
              {relatedTopics.map((t) => (
                <li key={t.id}>
                  <Link
                    to={`${sectionMeta[t.section].path}/${t.id}`}
                    className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:border-drugs/50 hover:text-drugs transition-colors"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
