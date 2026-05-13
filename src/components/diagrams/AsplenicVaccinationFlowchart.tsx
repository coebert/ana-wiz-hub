import { useState } from "react";

type Timing = "elective" | "emergency" | "established";

interface VaccineGroup {
  key: string;
  name: string;
  agents: string;
  schedule: string;
  boost: string;
  rationale: string;
}

const VACCINE_GROUPS: VaccineGroup[] = [
  {
    key: "pneumo",
    name: "1. Pneumococcus",
    agents: "PCV13 (conjugate) → PPV23 (polysaccharide) ≥ 8 wk later",
    schedule: "PCV13 once; PPV23 at 8 wk, then 5-yearly",
    boost: "PPV23 every 5 years lifelong",
    rationale: "S. pneumoniae causes ~50–90% of OPSI. Conjugate primes T-dependent memory; polysaccharide broadens serotype coverage.",
  },
  {
    key: "menigo",
    name: "2. Meningococcus",
    agents: "MenACWY conjugate + MenB (Bexsero or Trumenba)",
    schedule: "MenACWY ×2 doses 8 wk apart; MenB ×2 doses 4 wk apart",
    boost: "MenACWY every 5 yr; MenB per Green Book",
    rationale: "N. meningitidis — encapsulated; asplenic patients lose marginal-zone B cells that mount the rapid IgM response.",
  },
  {
    key: "hib",
    name: "3. Haemophilus influenzae b",
    agents: "Hib conjugate (often as Hib/MenC combined)",
    schedule: "Single dose if not previously vaccinated",
    boost: "No routine booster",
    rationale: "H. influenzae type b — encapsulated. Conjugate vaccine generates T-cell-dependent memory.",
  },
  {
    key: "flu",
    name: "4. Influenza",
    agents: "Inactivated trivalent/quadrivalent IM (avoid LAIV nasal)",
    schedule: "Annual, every autumn",
    boost: "Annual lifelong",
    rationale: "Influenza predisposes to bacterial superinfection (pneumococcus, S. aureus) — a lethal combination in asplenia.",
  },
];

const TIMING_PLANS: Record<Timing, { label: string; window: string; steps: string[]; pitfall: string }> = {
  elective: {
    label: "Elective splenectomy",
    window: "Vaccinate ≥ 2 weeks PRE-op",
    steps: [
      "Identify need ≥ 2 wk before surgery in pre-assessment clinic",
      "Give all 4 vaccine groups with ≥ 14 days before splenectomy",
      "Allows full T-dependent antibody response while spleen intact",
      "Document vaccinations in pre-op notes and GP letter",
    ],
    pitfall: "Vaccinating < 14 d before splenectomy → blunted response. If unavoidable, treat as emergency pathway and re-vaccinate 2 wk post-op.",
  },
  emergency: {
    label: "Emergency / trauma splenectomy",
    window: "Vaccinate ≥ 2 weeks POST-op",
    steps: [
      "Do NOT vaccinate in the immediate post-op period (poor response, surgical stress)",
      "Wait ≥ 14 days post-splenectomy before starting schedule",
      "Earlier vaccination (< 14 d) gives suboptimal antibody titres — must repeat",
      "Ensure prophylactic antibiotics started before discharge",
    ],
    pitfall: "Patient discharged without vaccination plan or alert card — the single commonest serious failure point. Hand-over to GP in writing.",
  },
  established: {
    label: "Functional / established hyposplenism",
    window: "Vaccinate as soon as identified",
    steps: [
      "Functional asplenia: sickle-cell disease, coeliac, IBD, post-radiation, post-stem cell transplant",
      "Anatomical: previous splenectomy without vaccination history",
      "Check serology if available; otherwise re-vaccinate per schedule",
      "Annual flu + 5-yearly PPV23 + clinical review",
    ],
    pitfall: "Coeliac and SCD patients are often missed — actively screen at every clinic encounter.",
  },
};

export const AsplenicVaccinationFlowchart = () => {
  const [timing, setTiming] = useState<Timing>("elective");
  const [activeGroup, setActiveGroup] = useState<string>("pneumo");

  const plan = TIMING_PLANS[timing];
  const group = VACCINE_GROUPS.find(g => g.key === activeGroup)!;

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-5 space-y-5">
      {/* Timing selector */}
      <div>
        <div className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-2">Clinical scenario</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(Object.keys(TIMING_PLANS) as Timing[]).map(t => {
            const isActive = timing === t;
            return (
              <button
                key={t}
                onClick={() => setTiming(t)}
                className={`text-left rounded-lg border p-2.5 transition ${
                  isActive
                    ? "border-physiology bg-physiology/10"
                    : "border-border hover:bg-secondary/40"
                }`}
              >
                <div className="text-sm font-semibold text-foreground">{TIMING_PLANS[t].label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{TIMING_PLANS[t].window}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline flow */}
      <div className="rounded-lg border border-border bg-secondary/20 p-3">
        <div className="text-xs uppercase tracking-wide font-semibold text-physiology mb-2">{plan.label} — pathway</div>
        <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
          {plan.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <div className="mt-3 rounded border border-destructive/40 bg-destructive/5 p-2 text-xs text-foreground">
          <strong className="text-destructive">Pitfall: </strong>{plan.pitfall}
        </div>
      </div>

      {/* Four vaccine groups */}
      <div>
        <div className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-2">The four mandatory vaccine groups</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {VACCINE_GROUPS.map(g => {
            const isActive = activeGroup === g.key;
            return (
                  <button
                key={g.key}
                onClick={() => setActiveGroup(g.key)}
                className={`text-left rounded-lg border p-2 transition ${
                  isActive ? "border-physiology bg-physiology/10" : "border-border hover:bg-secondary/40"
                }`}
              >
                <div className="text-xs font-semibold text-foreground leading-tight">{g.name}</div>
              </button>
  );
          })}
        </div>
        <div className="rounded-lg border border-border p-3 space-y-2 text-sm">
          <div>
            <span className="text-[10px] uppercase tracking-wide font-semibold text-physiology">Agents</span>
            <p className="text-muted-foreground leading-relaxed">{group.agents}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wide font-semibold text-physiology">Schedule</span>
            <p className="text-muted-foreground leading-relaxed">{group.schedule}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wide font-semibold text-physiology">Booster</span>
            <p className="text-muted-foreground leading-relaxed">{group.boost}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wide font-semibold text-physiology">Why</span>
            <p className="text-muted-foreground leading-relaxed">{group.rationale}</p>
          </div>
        </div>
      </div>

      {/* Antibiotic prophylaxis + alert card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3 bg-secondary/10">
          <div className="text-xs uppercase tracking-wide font-semibold text-physiology mb-1.5">💊 Lifelong antibiotic prophylaxis</div>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong className="text-foreground">First line:</strong> Phenoxymethylpenicillin (Penicillin V) 250–500 mg PO BD lifelong</li>
            <li><strong className="text-foreground">Penicillin allergy:</strong> Erythromycin 250–500 mg PO BD or clarithromycin</li>
            <li><strong className="text-foreground">Stand-by course:</strong> Co-amoxiclav 625 mg TDS — start at first sign of infection (fever, rigors) and seek urgent medical review</li>
            <li><strong className="text-foreground">High-risk groups:</strong> children &lt; 16, age &gt; 50, &lt; 2 yr post-splenectomy, prior OPSI, immunosuppression, poor response to vaccination</li>
            <li>BSH 2011 / BCSH guidance — duration ≥ 2 yr minimum, lifelong in high-risk</li>
          </ul>
        </div>
        <div className="rounded-lg border border-physiology/40 p-3 bg-physiology/5">
          <div className="text-xs uppercase tracking-wide font-semibold text-physiology mb-1.5">🪪 Patient-held alert card &amp; education</div>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong className="text-foreground">Splenectomy alert card</strong> — issued at discharge, carried at all times</li>
            <li><strong className="text-foreground">MedicAlert bracelet</strong> recommended</li>
            <li>Counsel on signs of OPSI: fever, rigors, malaise — seek help immediately, take stand-by antibiotic en route</li>
            <li>Travel: malaria prophylaxis essential (asplenia ↑ severity); animal bite → urgent antibiotics + tetanus + rabies review</li>
            <li>Notify all healthcare contacts (dentist, GP, anaesthetist) of asplenia status</li>
            <li>Annual review: vaccination history, antibiotic adherence, education refresh</li>
          </ul>
        </div>
      </div>

      {/* Anaesthetic note */}
      <div className="rounded-lg border border-border p-3 bg-secondary/20 text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Anaesthetic relevance:</strong> Pre-op assessment must document splenectomy/hyposplenism status, confirm vaccination history is up-to-date, and verify ongoing antibiotic prophylaxis. For emergency surgery in an unvaccinated asplenic patient, give broad-spectrum antibiotic cover and refer for vaccination ≥ 2 wk post-op. Sickle-cell disease (functional asplenia from autoinfarction by ~age 5) is the commonest cause encountered in paediatric anaesthesia.
      </div>
    </div>
  );
};

export default AsplenicVaccinationFlowchart;
