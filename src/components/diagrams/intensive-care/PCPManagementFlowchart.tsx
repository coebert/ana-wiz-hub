import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * PCP ICU Management Flowchart
 *
 * Decision flow for suspected Pneumocystis jirovecii pneumonia in critical
 * care: severity stratification (PaO₂ / A–a gradient), adjuvant steroid
 * criteria, escalation of respiratory support (HFNO → awake proning →
 * NIV/IMV → ECMO), and red flags for treatment failure.
 *
 * Pure semantic HTML/Tailwind — no external flowchart library — so the
 * diagram is responsive on mobile and respects the design system tokens.
 */
const PCPManagementFlowchart = () => {
  const Box = ({
    children,
    tone = "default",
    className = "",
  }: {
    children: React.ReactNode;
    tone?: "default" | "primary" | "warn" | "danger" | "success" | "muted";
    className?: string;
  }) => {
    const toneClass = {
      default: "border-border bg-card text-foreground",
      primary: "border-primary/40 bg-primary/10 text-foreground",
      warn: "border-yellow-500/40 bg-yellow-500/10 text-foreground",
      danger: "border-destructive/50 bg-destructive/10 text-foreground",
      success: "border-emerald-500/40 bg-emerald-500/10 text-foreground",
      muted: "border-border bg-muted/40 text-muted-foreground",
    }[tone];
    return (
      <div className={`rounded-lg border p-3 text-xs leading-snug ${toneClass} ${className}`}>
        {children}
      </div>
    );
  };

  const Arrow = ({ label }: { label?: string }) => (
    <div className="flex flex-col items-center my-1" aria-hidden="true">
      {label && <span className="text-[10px] text-muted-foreground mb-0.5">{label}</span>}
      <span className="text-muted-foreground text-base leading-none">↓</span>
    </div>
  );

  return (
    <DiagramFigure
      id="pcp-mgmt-flow"
      title="ICU management flowchart for suspected PCP"
      description="Decision flow from suspicion through diagnostics, severity-graded therapy, steroid criteria, escalation of respiratory support, and ECMO consideration."
    >
      <div className="space-y-1">
        {/* Step 1 — Suspicion */}
        <Box tone="primary">
          <p className="font-semibold text-sm mb-1">Suspect PCP</p>
          Immunocompromised host (HIV CD4 &lt;200, steroids ≥20 mg pred &gt;4 wk, biologics, HSCT/SOT, haematological malignancy) + subacute dry cough, dyspnoea, hypoxia disproportionate to CXR.
        </Box>
        <Arrow />

        {/* Step 2 — Initial work-up */}
        <Box>
          <p className="font-semibold text-sm mb-1">Resuscitate &amp; investigate in parallel</p>
          ABCDE • SpO₂/ABG • HRCT chest • bloods + LDH + (1,3)-β-D-glucan • HIV test, CD4, viral load • blood &amp; respiratory cultures • CMV PCR • induced sputum or urgent <strong>BAL</strong> if safe • G6PD before high-dose co-trimoxazole.
        </Box>
        <Arrow label="Bilateral perihilar GGO ± upper-zone cysts; ↑LDH; ↑β-D-glucan" />

        {/* Step 3 — Start empiric therapy */}
        <Box tone="success">
          <p className="font-semibold text-sm mb-1">Start empirical co-trimoxazole — do not wait for BAL</p>
          TMP–SMX <strong>15–20 mg/kg/day TMP IV in 3–4 divided doses</strong> for <strong>21 days</strong> (HIV) or 14–21 days (non-HIV). Switch IV→PO when clinically stable. Sulfa allergy / G6PD: pentamidine, clindamycin + primaquine, atovaquone, or dapsone + trimethoprim.
        </Box>
        <Arrow label="Stratify severity on room-air ABG" />

        {/* Step 4 — Severity branch */}
        <div className="grid md:grid-cols-3 gap-2">
          <Box tone="success">
            <p className="font-semibold text-sm mb-1">Mild</p>
            PaO₂ &gt;11 kPa or A–a &lt;4.7 kPa. <br />
            Oral co-trimoxazole, ward-level care. <strong>No steroids.</strong>
          </Box>
          <Box tone="warn">
            <p className="font-semibold text-sm mb-1">Moderate</p>
            PaO₂ 8–11 kPa or A–a 4.7–6 kPa. <br />
            IV co-trimoxazole, HDU. Consider steroids if hypoxia trending down.
          </Box>
          <Box tone="danger">
            <p className="font-semibold text-sm mb-1">Severe</p>
            <strong>PaO₂ &lt;8 kPa (60 mmHg) on air</strong> or <strong>A–a &gt;4.7 kPa</strong>. ICU. <strong>Adjuvant steroids indicated.</strong>
          </Box>
        </div>
        <Arrow />

        {/* Step 5 — Steroid regimen */}
        <Box tone="primary">
          <p className="font-semibold text-sm mb-1">Adjuvant corticosteroids (start with or before first co-trimoxazole dose)</p>
          <strong>Prednisolone 40 mg PO BD × 5 d → 40 mg OD × 5 d → 20 mg OD × 11 d</strong> (or equivalent IV methylprednisolone). Mortality benefit clearest in HIV-PCP; commonly used in non-HIV PCP despite weaker evidence. Add PPI; monitor glucose.
        </Box>
        <Arrow label="Titrate respiratory support" />

        {/* Step 6 — Respiratory escalation ladder */}
        <Box>
          <p className="font-semibold text-sm mb-2">Respiratory support ladder (target SpO₂ 92–96%)</p>
          <div className="grid sm:grid-cols-4 gap-2">
            <div className="rounded-md border border-border p-2">
              <p className="font-semibold text-foreground text-xs">1. O₂ via mask</p>
              <p className="text-[11px] text-muted-foreground mt-1">Up to 15 L/min reservoir mask. Reassess hourly.</p>
            </div>
            <div className="rounded-md border border-border p-2">
              <p className="font-semibold text-foreground text-xs">2. HFNO ± awake proning</p>
              <p className="text-[11px] text-muted-foreground mt-1">First-line escalation. Trial proning ≥8–12 h/day if SpO₂ &lt;92% on FiO₂ ≥0.4.</p>
            </div>
            <div className="rounded-md border border-border p-2">
              <p className="font-semibold text-foreground text-xs">3. NIV (CPAP/BiPAP)</p>
              <p className="text-[11px] text-muted-foreground mt-1">Selected patients (no shock, secretions controlled). Beware delayed intubation.</p>
            </div>
            <div className="rounded-md border border-border p-2">
              <p className="font-semibold text-foreground text-xs">4. Invasive ventilation</p>
              <p className="text-[11px] text-muted-foreground mt-1">V<sub>T</sub> 6 mL/kg PBW, P<sub>plat</sub> ≤30, ΔP &lt;15, prone if P/F &lt;150. <strong>Low PEEP escalation</strong> — pneumothorax risk.</p>
            </div>
          </div>
        </Box>
        <Arrow label="If failing despite optimal lung-protective ventilation" />

        {/* Step 7 — ECMO criteria */}
        <Box tone="danger">
          <p className="font-semibold text-sm mb-1">Consider VV-ECMO (refer early to ECMO centre)</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li><strong>Murray score ≥3</strong> or <strong>P/F &lt;80 for &gt;6 h</strong> / &lt;50 for &gt;3 h despite optimised IMV (EOLIA criteria, adapted)</li>
            <li>Uncompensated hypercapnia (pH &lt;7.20) despite Pplat ≤32</li>
            <li>Reversible underlying disease, mechanical ventilation &lt;7 days, no absolute contraindication (severe immunosuppression with poor 6-month prognosis is a relative contraindication — discuss with ECMO MDT)</li>
            <li>Refractory pneumothorax / persistent air leak from cyst rupture: chest drains, low PEEP, consider VV-ECMO as bridge</li>
          </ul>
        </Box>
        <Arrow />

        {/* Step 8 — Review at 5–7 days */}
        <div className="grid md:grid-cols-2 gap-2">
          <Box tone="success">
            <p className="font-semibold text-sm mb-1">Improving (day 5–7)</p>
            Falling FiO₂ &amp; LDH, weaning support. Continue full course. Switch IV→PO co-trimoxazole when stable. Plan secondary prophylaxis: co-trimoxazole 480–960 mg OD until CD4 &gt;200 for &gt;3 mo on ART, or immunosuppression resolved.
          </Box>
          <Box tone="warn">
            <p className="font-semibold text-sm mb-1">Not improving / deteriorating</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Confirm diagnosis — repeat BAL; exclude co-pathogens (CMV, bacterial, Aspergillus, TB)</li>
              <li>Check co-trimoxazole dose, levels, adherence; consider switch to second-line</li>
              <li>Optimise / re-introduce steroids if not given</li>
              <li>Exclude pneumothorax, fluid overload, VAP, IRIS (HIV)</li>
              <li>Escalate respiratory support / refer ECMO if not already done</li>
              <li>Discuss ceiling of care with patient/family if appropriate</li>
            </ul>
          </Box>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PCPManagementFlowchart;
