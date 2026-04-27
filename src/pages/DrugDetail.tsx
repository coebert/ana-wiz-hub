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
          <Section title="Dosing" body={drug.dosing} />
          <Section title="Monitoring" body={drug.monitoring} />
          <Section title="Side effects" body={drug.side_effects} />
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
