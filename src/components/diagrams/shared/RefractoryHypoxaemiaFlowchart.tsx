import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { Cite } from "@/components/references/Cite";

/**
 * Refractory hypoxaemia escalation flowchart for ARDS — Berlin confirmation and
 * exclusion of mimics, lung-protective baseline, then a decision point that
 * diverts patients with acute cor pulmonale / RV failure into an RV-protective
 * branch (the classic complex exam scenario, where higher PEEP, permissive
 * hypercapnia and recruitment manoeuvres can worsen the patient), before the
 * standard escalation to prone, NMB, inhaled vasodilator trial and VV-ECMO.
 */
const RefractoryHypoxaemiaFlowchart = () => {
  const id = "ards-refractory-hypoxaemia-flow";
  const W = 920;
  const H = 990;

  return (
    <DiagramFigure
      id={id}
      title="Refractory hypoxaemia in ARDS — escalation flowchart with acute cor pulmonale branch"
      description="Decision flow for worsening hypoxaemia in ARDS: confirm the Berlin criteria and exclude mimics, establish lung-protective ventilation, then branch to an RV-protective pathway if acute cor pulmonale is present, otherwise escalate through prone positioning, neuromuscular blockade and inhaled vasodilator trial to VV-ECMO referral."
      showCaption
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>Refractory hypoxaemia escalation flowchart in ARDS</title>
        <desc id={`${id}-desc`}>
          Flowchart for refractory hypoxaemia in ARDS. Confirm Berlin criteria and
          exclude mimics, optimise lung-protective ventilation, then a decision
          point: if echocardiography shows acute cor pulmonale or right ventricular
          failure, follow an RV-protective branch limiting driving pressure and
          hypercapnia with early prone positioning and early ECMO referral;
          otherwise escalate prone positioning, neuromuscular blockade and an
          inhaled vasodilator trial, and refer for VV-ECMO if oxygenation or pH
          targets remain unmet.
        </desc>

        <defs>
          <marker id={`${id}-arr`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
          <marker id={`${id}-arr-warn`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(38 92% 45%)" />
          </marker>
        </defs>

        {/* ENTRY */}
        <g>
          <rect x={W / 2 - 240} y={12} width="480" height="54" rx="10" fill="hsl(var(--icu) / 0.15)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={W / 2} y={34} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            Worsening hypoxaemia on mechanical ventilation
          </text>
          <text x={W / 2} y={52} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Berlin: onset ≤ 1 week · bilateral opacities · PaO₂/FiO₂ ≤ 300 on PEEP ≥ 5
          </text>
        </g>
        <line x1={W / 2} y1={66} x2={W / 2} y2={92} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* EXCLUDE MIMICS */}
        <g>
          <rect x={W / 2 - 260} y={96} width="520" height="70" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={118} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Exclude reversible causes and mimics first
          </text>
          <text x={W / 2} y={136} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Blocked / displaced tube · pneumothorax · lobar collapse · circuit or ventilator fault
          </text>
          <text x={W / 2} y={152} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Cardiogenic oedema · fluid overload · pulmonary embolism · untreated source of sepsis
          </text>
        </g>
        <line x1={W / 2} y1={166} x2={W / 2} y2={192} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* LUNG-PROTECTIVE BASELINE */}
        <g>
          <rect x={W / 2 - 260} y={196} width="520" height="74" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={218} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Optimise the lung-protective baseline
          </text>
          <text x={W / 2} y={236} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            VT 6 ml/kg IBW · Pplat ≤ 30 · driving pressure ≤ 15 cmH₂O · PEEP titrated to compliance
          </text>
          <text x={W / 2} y={252} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Conservative fluids · adequate sedation, treat dyssynchrony · NMB if severe in first 48 h
          </text>
        </g>
        <line x1={W / 2} y1={270} x2={W / 2} y2={288} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* DECISION: acute cor pulmonale? */}
        <g>
          <polygon
            points={`${W / 2},292 ${W / 2 + 190},344 ${W / 2},396 ${W / 2 - 190},344`}
            fill="hsl(var(--icu) / 0.12)"
            stroke="hsl(var(--icu))"
            strokeWidth="1.5"
          />
          <text x={W / 2} y={336} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Echo: acute cor pulmonale /
          </text>
          <text x={W / 2} y={352} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            RV failure? (RV:LV &gt; 0.6, D-sign)
          </text>
        </g>

        {/* NO → main escalation column */}
        <text x={W / 2 + 14} y={418} fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">NO — oxygenation problem alone</text>
        <line x1={W / 2} y1={396} x2={W / 2} y2={424} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* YES → left warn branch */}
        <text x={W / 2 - 340} y={336} fontSize="10" fontWeight="700" fill="hsl(38 92% 40%)">YES — RV-protective branch</text>
        <path d={`M${W / 2 - 190} 344 H230`} stroke="hsl(38 92% 45%)" strokeWidth="2" fill="none" markerEnd={`url(#${id}-arr-warn)`} />

        {/* LEFT BRANCH */}
        <g>
          <rect x={20} y={426} width="420" height="60" rx="10" fill="hsl(38 92% 50% / 0.12)" stroke="hsl(38 92% 45%)" strokeWidth="2" />
          <text x={230} y={448} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(38 92% 35%)">
            The usual oxygenation moves can KILL the
          </text>
          <text x={230} y={466} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(38 92% 35%)">
            right ventricle — change the targets
          </text>
        </g>
        <line x1={230} y1={486} x2={230} y2={506} stroke="hsl(38 92% 45%)" strokeWidth="1.5" markerEnd={`url(#${id}-arr-warn)`} />

        <g>
          <rect x={20} y={510} width="420" height="170" rx="10" fill="hsl(var(--card))" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          <text x={34} y={532} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
            Why standard escalation backfires
          </text>
          {[
            "Higher PEEP and recruitment manoeuvres raise PVR",
            "  and can convert RV strain into RV failure",
            "Permissive hypercapnia is a potent pulmonary",
            "  vasoconstrictor — pH and PaCO₂ now matter",
            "Driving pressure > 18 cmH₂O is independently",
            "  associated with acute cor pulmonale",
            "Fluid loading distends a failing RV and worsens",
            "  septal shift and LV filling (D-sign)",
            "Prevalence ~ 22% in protective ventilation, with",
            "  substantially higher mortality",
          ].map((t, i) => (
            <text key={i} x={34} y={554 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t.startsWith(" ") ? t : `• ${t}`}
            </text>
          ))}
        </g>
        <line x1={230} y1={680} x2={230} y2={700} stroke="hsl(38 92% 45%)" strokeWidth="1.5" markerEnd={`url(#${id}-arr-warn)`} />

        <g>
          <rect x={20} y={704} width="420" height="176" rx="10" fill="hsl(var(--card))" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          <text x={34} y={726} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
            RV-protective pathway
          </text>
          {[
            "Cap driving pressure < 18; accept lower PEEP even",
            "  at the cost of some oxygenation",
            "Target PaCO₂ ≈ 6 kPa / pH ≥ 7.30 — treat hypercapnia",
            "  as an RV problem, not just a gas result",
            "Prone early: unloads the RV, improves V/Q, lowers PaCO₂",
            "Inhaled pulmonary vasodilator trial (NO / prostacyclin)",
            "  — oxygenation and RV afterload only, no mortality benefit",
            "Noradrenaline / vasopressin to keep MAP and RV",
            "  coronary perfusion; cautious diuresis, not fluid loading",
            "Serial echo (TAPSE, McConnell sign, septal shift)",
            "Refer for VV-ECMO EARLY — do not chase the PaO₂",
          ].map((t, i) => (
            <text key={i} x={34} y={748 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t.startsWith(" ") ? t : `• ${t}`}
            </text>
          ))}
        </g>

        {/* MAIN COLUMN */}
        <g>
          <rect x={500} y={428} width="400" height="120" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={700} y={450} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Escalate in evidence order
          </text>
          {[
            "1. Prone ≥ 16 h/day if P/F < 150 (mortality benefit)",
            "2. NMB for severe dyssynchrony / high driving pressure",
            "3. PEEP titration to best compliance, not best PaO₂",
            "4. Recruitment manoeuvres — caution, harm signal",
            "5. Inhaled NO as a bridge / rescue, not a therapy",
            "6. Fluid removal once shock resolved",
          ].map((t, i) => (
            <text key={i} x={516} y={472 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t}
            </text>
          ))}
        </g>
        <line x1={700} y1={548} x2={700} y2={568} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* Decision: ECMO criteria */}
        <g>
          <polygon points="700,572 810,624 700,676 590,624" fill="hsl(var(--icu) / 0.12)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={700} y={618} fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Still P/F &lt; 80, or
          </text>
          <text x={700} y={633} fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            pH &lt; 7.25 with PaCO₂ ≥ 60?
          </text>
        </g>

        {/* Yes → ECMO */}
        <text x={812} y={618} fontSize="10" fontWeight="700" fill="hsl(var(--destructive))">YES</text>
        <path d="M810 624 H884 V714 H784" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arr)`} />
        <g>
          <rect x={484} y={714} width="300" height="78" rx="10" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
          <text x={634} y={736} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--destructive))">
            Refer NOW to a VV-ECMO centre
          </text>
          <text x={634} y={754} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Discuss before rescue therapies fail — reversibility,
          </text>
          <text x={634} y={769} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            comorbidity, ventilated days, transfer capability
          </text>
          <text x={634} y={784} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Continue ultra-protective ventilation on ECMO
          </text>
        </g>

        {/* No → continue */}
        <text x={562} y={692} fontSize="10" fontWeight="700" fill="hsl(var(--icu))">NO — improving</text>
        <path d="M700 676 V800 H820 V824" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arr)`} />
        <g>
          <rect x={640} y={828} width="260" height="76" rx="10" fill="hsl(var(--icu) / 0.1)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={770} y={850} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            Consolidate and de-escalate
          </text>
          <text x={770} y={868} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Wean FiO₂ then PEEP · daily sedation hold
          </text>
          <text x={770} y={884} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Negative fluid balance · early rehabilitation
          </text>
        </g>

        <text x={W / 2} y={950} fontSize="10" fontStyle="italic" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          Oxygenation is a marker, not the target — mortality follows driving pressure, the RV and the underlying cause.
        </text>
      </svg>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--icu))" }} /> standard escalation
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(38 92% 45%)" }} /> acute cor pulmonale — caution
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--destructive))" }} /> ECMO referral
        </span>
      </div>

      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-[11px] leading-relaxed">
        <p className="font-semibold text-foreground mb-1.5">Step sources — verify each part of the flow</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Entry criteria:</span> Berlin timing, imaging, oxygenation and PEEP thresholds
            <Cite topicId="ards" labels={["ARDS Definition 2012"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Exclude mimics before escalating:</span> structured diagnostic workup of the deteriorating ARDS patient
            <Cite topicId="ards" labels={["Intensive Care Med 2016 (ARDS workup)"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Lung-protective baseline:</span> 6 ml/kg IBW with plateau pressure limitation
            <Cite topicId="ards" labels={["ARDSNet 2000", "BJA Educ 2018"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Prone positioning ≥ 16 h at P/F &lt; 150:</span>
            <Cite topicId="ards" labels={["PROSEVA 2013"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Acute cor pulmonale branch:</span> prevalence, driving-pressure association and prognosis under protective ventilation
            <Cite topicId="ards" labels={["Intensive Care Med 2013 (Cor pulmonale)"]} />
          </li>
        </ul>
      </div>
    </DiagramFigure>
  );
};

export default RefractoryHypoxaemiaFlowchart;
