import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Activity } from "lucide-react";

/**
 * 4Ts pre-test probability score for HIT (Lo et al. 2006).
 *
 * Four domains, each scored 0 / 1 / 2 (max 8):
 *   • Thrombocytopenia  — magnitude of platelet fall
 *   • Timing of fall     — relative to heparin exposure
 *   • Thrombosis or sequelae
 *   • oTher cause for thrombocytopenia
 *
 * Interpretation:
 *   0–3 LOW (<5%)        → HIT effectively excluded; continue heparin
 *   4–5 INTERMEDIATE     → stop heparin, start non-heparin anticoag, send PF4 ELISA
 *   6–8 HIGH (~64%)      → as above + functional assay (SRA/HIPA), expect positive
 */

type Domain = {
  key: string;
  label: string;
  short: string;
  options: { score: 0 | 1 | 2; text: string }[];
};

const domains: Domain[] = [
  {
    key: "thrombocytopenia",
    label: "Thrombocytopenia",
    short: "Magnitude of platelet fall",
    options: [
      { score: 2, text: ">50% fall AND nadir ≥ 20 ×10⁹/L" },
      { score: 1, text: "30–50% fall OR nadir 10–19 ×10⁹/L" },
      { score: 0, text: "<30% fall OR nadir < 10 ×10⁹/L" },
    ],
  },
  {
    key: "timing",
    label: "Timing of platelet fall",
    short: "Relative to heparin exposure",
    options: [
      { score: 2, text: "Day 5–10 OR ≤ 1 day if heparin in past 30 d" },
      { score: 1, text: "Consistent with day 5–10 but unclear, OR > day 10, OR ≤ 1 d if heparin 30–100 d ago" },
      { score: 0, text: "Platelet fall ≤ day 4 with no recent heparin exposure" },
    ],
  },
  {
    key: "thrombosis",
    label: "Thrombosis or sequelae",
    short: "New thrombosis, skin necrosis, anaphylactoid reaction",
    options: [
      { score: 2, text: "New confirmed thrombosis, skin necrosis at injection site, or post-bolus anaphylactoid reaction" },
      { score: 1, text: "Progressive/recurrent thrombosis, non-necrotising skin lesions, suspected (unproven) thrombosis" },
      { score: 0, text: "None" },
    ],
  },
  {
    key: "other",
    label: "oTher causes for thrombocytopenia",
    short: "Sepsis, drugs, dilution, marrow failure, etc.",
    options: [
      { score: 2, text: "No alternative cause apparent" },
      { score: 1, text: "Possible alternative cause" },
      { score: 0, text: "Definite alternative cause present" },
    ],
  },
];

type Answers = Record<string, 0 | 1 | 2 | undefined>;

export const FourTsScorePanel = () => {
  const [answers, setAnswers] = useState<Answers>({});

  const { total, complete } = useMemo(() => {
    const vals = domains.map((d) => answers[d.key]);
    const complete = vals.every((v) => v !== undefined);
    const total = vals.reduce<number>((sum, v) => sum + (v ?? 0), 0);
    return { total, complete };
  }, [answers]);

  const interpretation = useMemo(() => {
    if (!complete) return null;
    if (total <= 3) {
      return {
        band: "LOW",
        risk: "< 5%",
        tone: "ok" as const,
        action:
          "HIT effectively excluded — continue heparin if clinically indicated. PF4 ELISA not routinely required.",
      };
    }
    if (total <= 5) {
      return {
        band: "INTERMEDIATE",
        risk: "~ 14%",
        tone: "warn" as const,
        action:
          "Stop ALL heparin (incl. flushes). Start non-heparin anticoagulant (argatroban first-line UK ICU). Send PF4 ELISA; bilateral leg duplex.",
      };
    }
    return {
      band: "HIGH",
      risk: "~ 64%",
      tone: "bad" as const,
      action:
        "Stop ALL heparin. Start non-heparin anticoagulant immediately. Send PF4 ELISA AND functional assay (SRA/HIPA). Bilateral leg duplex.",
    };
  }, [complete, total]);

  const reset = () => setAnswers({});

  const toneClasses = (tone: "ok" | "warn" | "bad") =>
    tone === "ok"
      ? "border-icu/40 bg-icu/10 text-icu"
      : tone === "warn"
        ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400"
        : "border-destructive/50 bg-destructive/10 text-destructive";

  const VerdictIcon =
    interpretation?.tone === "ok"
      ? CheckCircle2
      : interpretation?.tone === "warn"
        ? AlertTriangle
        : Activity;

  return (
    <section
      aria-labelledby="fourts-heading"
      className="rounded-xl border border-border bg-card p-5 mb-4"
    >
      <header className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 id="fourts-heading" className="font-semibold text-foreground text-lg">
            4Ts Score — pre-test probability of HIT
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Lo et al. 2006 · max 8 points · score in <strong>each</strong> of the four domains
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </header>

      <ol className="space-y-4">
        {domains.map((d, i) => (
          <li key={d.key} className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-icu text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-foreground text-sm">{d.label}</p>
                <p className="text-xs text-muted-foreground">{d.short}</p>
              </div>
            </div>
            <div role="radiogroup" aria-label={d.label} className="grid gap-1.5">
              {d.options.map((opt) => {
                const selected = answers[d.key] === opt.score;
                return (
                  <button
                    key={opt.score}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [d.key]: opt.score }))
                    }
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-xs transition ${
                      selected
                        ? "border-icu bg-icu/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        selected
                          ? "bg-icu text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {opt.score}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {/* Live total */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
        <span className="text-xs text-muted-foreground">
          {complete ? "Total" : `Answer all 4 domains (${Object.keys(answers).length}/4 complete)`}
        </span>
        <span className="text-2xl font-bold tabular-nums text-foreground">
          {total} <span className="text-sm font-normal text-muted-foreground">/ 8</span>
        </span>
      </div>

      {/* Interpretation */}
      {interpretation && (
        <div
          className={`mt-3 rounded-lg border-2 p-4 ${toneClasses(interpretation.tone)}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-1">
            <VerdictIcon className="h-5 w-5" />
            <p className="font-bold text-base">
              {interpretation.band} probability ({interpretation.risk})
            </p>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{interpretation.action}</p>
        </div>
      )}

      <p className="mt-3 text-[11px] text-muted-foreground italic">
        Decision support only — combine with clinical judgement, PF4 ELISA optical density, and
        functional assay results. Never withhold non-heparin anticoagulation in INTERMEDIATE/HIGH
        cases while waiting for assay results.
      </p>
    </section>
  );
};

export default FourTsScorePanel;
