import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import {
  SOURCES,
  buildRecommendation,
  type Allergy,
  type Renal,
  type Severity,
  type SourceKey,
} from "./sepsisChooserModel";

/**
 * Empirical sepsis antibiotic chooser.
 * Pick suspected source + patient factors → the adult (16+, not pregnant)
 * empirical recommendation quoted from, and linked to, its supporting
 * guideline. Population scope: NG253 (adults), NG254 (under-16s), NG255 (pregnancy)
 * — only the adult NG253 pathway is modelled here.
 *
 * Selections this review could not trace to a supporting recommendation are
 * held: they render the sources to consult and generate no dose, regimen or
 * alternative. See sepsisChooserModel.ts.
 *
 * Educational tool only — local antibiogram, allergy assessment and
 * microbiology advice always supersede.
 */

const EmpiricalSepsisChooser = () => {
  const [source, setSource] = useState<SourceKey>("cap");
  const [severity, setSeverity] = useState<Severity>("severe");
  const [allergy, setAllergy] = useState<Allergy>("none");
  const [renal, setRenal] = useState<Renal>("normal");
  const [mrsa, setMrsa] = useState(false);
  const [recentAbx, setRecentAbx] = useState(false);

  const activeSource = SOURCES.find((s) => s.key === source)!;
  const rec = useMemo(
    () => buildRecommendation(source, { severity, allergy, renal, mrsa, recentAbx }),
    [source, severity, allergy, renal, mrsa, recentAbx]
  );

  return (
    <DiagramFigure
      id="empirical-sepsis-chooser"
      title="Empirical sepsis chooser"
      description="Empirical sepsis antibiotic chooser for adults (16+) who are not pregnant. Pick suspected source + patient factors → the recommendation quoted from NICE NG250, NICE CG151, NICE NG253 or ATS/IDSA 2019. Selections that could not be traced to a supporting recommendation are held and generate no dose."
    >
      <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">
          Empirical sepsis antibiotic chooser
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Pick the suspected source and patient factors to see the recommendation for that
          selection, with its exact source and clinical pearls. Selections that could not be traced
          to a supporting recommendation are held and generate no dose. Local antibiogram, allergy
          testing and microbiology advice always supersede.
        </p>
        <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-2.5 mb-4">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Scope</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            Adults aged 16 or over who are not pregnant. Paediatric (NICE NG254) and pregnancy (NICE
            NG255) pathways are not modelled here, and none of these adult doses is evidence for
            those groups. Active doses are quoted from the cited adult guidance; confirm them
            against local antimicrobial policy and the product SmPC.
          </p>
        </div>

        {/* Source selector */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-foreground mb-2">
            Suspected source
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {SOURCES.map((s) => (
              <button
                key={s.key}
                onClick={() => setSource(s.key)}
                className="text-[11px] px-2 py-1.5 rounded border text-center transition-all"
                style={{
                  backgroundColor:
                    source === s.key ? "hsl(var(--primary) / 0.15)" : "hsl(var(--background))",
                  borderColor: source === s.key ? "hsl(var(--primary))" : "hsl(var(--border))",
                  color: source === s.key ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  fontWeight: source === s.key ? 600 : 500,
                  borderWidth: source === s.key ? 2 : 1,
                }}
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Patient factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* Severity */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">
              Severity
            </p>
            <div className="flex gap-1.5">
              {(["mild", "severe"] as Severity[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className="flex-1 text-xs px-2 py-1.5 rounded border transition-all capitalize"
                  style={{
                    backgroundColor:
                      severity === s ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                    borderColor: severity === s ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: severity === s ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: severity === s ? 600 : 500,
                  }}
                >
                  {s === "mild" ? "Mild / outpatient" : "Severe / septic shock"}
                </button>
              ))}
            </div>
          </div>

          {/* Penicillin allergy */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">
              Penicillin allergy
            </p>
            <div className="flex gap-1.5">
              {(["none", "non-severe", "anaphylaxis"] as Allergy[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setAllergy(a)}
                  className="flex-1 text-xs px-2 py-1.5 rounded border transition-all capitalize"
                  style={{
                    backgroundColor:
                      allergy === a ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                    borderColor: allergy === a ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: allergy === a ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: allergy === a ? 600 : 500,
                  }}
                >
                  {a === "none" ? "None" : a === "non-severe" ? "Rash only" : "Anaphylaxis"}
                </button>
              ))}
            </div>
          </div>

          {/* Renal */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">
              Renal function
            </p>
            <div className="flex gap-1.5">
              {(["normal", "impaired"] as Renal[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRenal(r)}
                  className="flex-1 text-xs px-2 py-1.5 rounded border transition-all"
                  style={{
                    backgroundColor:
                      renal === r ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                    borderColor: renal === r ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: renal === r ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: renal === r ? 600 : 500,
                  }}
                >
                  {r === "normal" ? "Normal (CrCl ≥ 30)" : "Impaired (CrCl < 30)"}
                </button>
              ))}
            </div>
          </div>

          {/* Risk factor toggles */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">
              Risk factors
            </p>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={mrsa}
                  onChange={(e) => setMrsa(e.target.checked)}
                  className="rounded border-border accent-primary"
                />
                <span className="text-foreground">
                  MRSA risk (colonised, dialysis, recent MRSA infection)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={recentAbx}
                  onChange={(e) => setRecentAbx(e.target.checked)}
                  className="rounded border-border accent-primary"
                />
                <span className="text-foreground">
                  Recent broad-spectrum antibiotics or hospitalisation (&lt; 90 days)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Recommendation panel */}
        <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-primary">
              {rec.held
                ? `Selection held — no regimen generated (${activeSource.shortLabel})`
                : `Suggested empirical regimen — ${activeSource.shortLabel}`}
            </p>
            <p className="text-[10px] text-muted-foreground italic">
              Likely organisms: {activeSource.bugs}
            </p>
          </div>

          {rec.held === true ? (
            <div className="rounded-md border border-amber-500/50 bg-amber-500/10 p-3">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                Awaiting source verification
              </p>
              <p className="text-xs text-foreground mt-0.5 leading-snug">{rec.reason}</p>

              {rec.teaching.length > 0 && (
                <div className="mt-2">
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                    Teaching that does not depend on the held regimen
                  </p>
                  <ul className="mt-1 space-y-1">
                    {rec.teaching.map((point, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground leading-snug flex gap-1.5"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-2">
                <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                  Sources to use for this selection
                </p>
                <ul className="mt-1 space-y-1">
                  {rec.consult.map((point, i) => (
                    <li key={i} className="text-xs text-muted-foreground leading-snug flex gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-md bg-background border border-primary/30 p-3">
                <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1">
                  First-line
                </p>
                <p className="text-sm font-semibold text-foreground leading-snug">
                  {rec.firstLine}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                  Source:{" "}
                  <a
                    className="underline"
                    href={rec.citation.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {rec.citation.label}
                  </a>{" "}
                  — “{rec.citation.recommendation}”
                </p>
              </div>

              <div className="mt-3 rounded-md bg-background/60 border border-border p-2.5">
                <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                  Rationale
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{rec.rationale}</p>
              </div>

              {rec.alternatives.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">
                    Modifications
                  </p>
                  <div className="space-y-1.5">
                    {rec.alternatives.map((a, i) => (
                      <div
                        key={i}
                        className="rounded-md border-l-2 border-primary/50 bg-background/60 p-2.5"
                      >
                        <p className="text-[11px] font-semibold text-primary">{a.trigger}</p>
                        <p className="text-xs text-foreground mt-0.5 leading-snug">{a.regimen}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="rounded-md bg-background/60 border border-border p-2.5">
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                    Clinical pearls
                  </p>
                  <ul className="mt-1 space-y-1">
                    {rec.pearls.map((pearl, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground leading-snug flex gap-1.5"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{pearl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md bg-background/60 border border-border p-2.5">
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                    Review point
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{rec.reviewAt}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sepsis-6 reminder */}
        <div className="mt-3 rounded-md bg-destructive/10 border border-destructive/30 p-2.5">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-destructive">
            Sepsis bundle — the antibiotic clock depends on risk
          </p>
          <p className="text-xs text-foreground mt-0.5 leading-snug">
            <span className="font-semibold">Take 3:</span> blood cultures · lactate · urine output ·
            <span className="font-semibold"> Give 3:</span> oxygen to a target saturation of 94–98%
            (88–92% if at risk of hypercapnic respiratory failure) · IV broad-spectrum antibiotics ·
            IV fluid bolus. Antibiotics within 1 hour apply to adults at high risk of severe illness
            or death from sepsis, timed from the first NEWS2 score; medium risk allows up to 3 hours
            and low risk up to 6 hours, and suspected neutropenic sepsis is treated immediately.
            Source control as soon as feasible.
          </p>
        </div>

        {/* Source-specific provenance */}
        <div className="mt-3 rounded-md border border-border bg-background/60 p-2.5">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
            Sources for these outputs
          </p>
          <ul className="mt-1 space-y-1 text-xs text-muted-foreground leading-snug">
            <li>
              Community- and hospital-acquired pneumonia:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/ng250/chapter/Recommendations"
                target="_blank"
                rel="noreferrer"
              >
                NICE NG250 (2025), tables 1 and 3
              </a>
              .
            </li>
            <li>
              Neutropenic sepsis:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/cg151/chapter/Recommendations"
                target="_blank"
                rel="noreferrer"
              >
                NICE CG151
              </a>{" "}
              — β-lactam monotherapy; no routine aminoglycoside or glycopeptide.
            </li>
            <li>
              Antibiotic timing for adults aged 16 or over:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/ng253/chapter/Antibiotic-therapy-intravenous-fluid-and-oxygen"
                target="_blank"
                rel="noreferrer"
              >
                NICE NG253
              </a>{" "}
              — within 1 hour of the first NEWS2 score for high risk of severe illness or death
              (1.8.3), up to 3 hours at medium risk (1.8.17), up to 6 hours at low risk (1.8.23);
              oxygen to 94–98% (1.10.1).
            </li>
            <li>
              MRSA risk in CAP (HCAP abandoned):{" "}
              <a
                className="underline"
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6812437/"
                target="_blank"
                rel="noreferrer"
              >
                ATS/IDSA 2019
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">
                Held selections — no dose or regimen generated:
              </strong>{" "}
              intra-abdominal, urinary, meningitic and skin/soft-tissue infections, every
              renal-impairment selection, hospital-acquired pneumonia with MRSA risk, and
              neutropenic sepsis with penicillin allergy. These selections could not be traced to a
              supporting recommendation in this review, so the chooser shows the sources to consult
              instead of a generated regimen.
            </li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EmpiricalSepsisChooser;
