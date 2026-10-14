import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { Pill, Droplets, AlertTriangle, Activity, Stethoscope } from "lucide-react";

/**
 * HAGMA Management Algorithm
 *
 * Cause-stratified, stepwise management with explicit antidote and
 * dialysis triggers, organised into four columns:
 *   1. Recognise & confirm
 *   2. Resuscitate & supportive
 *   3. Specific therapy / antidote (with start threshold)
 *   4. Escalate to RRT / HD (with explicit triggers)
 *
 * Sources: SSC 2021 (sepsis/lactate), JBDS DKA 2023, EXTRIP 2015
 * (toxic alcohols, salicylate, metformin), KDIGO AKI 2012,
 * BICAR-ICU 2018 (bicarbonate).
 */

type CauseKey = "dka" | "lactic-a" | "lactic-b" | "renal" | "methanol" | "eg" | "salicylate";

interface Step {
  text: string;
  trigger?: string;
}

interface Cause {
  key: CauseKey;
  label: string;
  oneLiner: string;
  recognise: Step[];
  resuscitate: Step[];
  specific: Step[];
  escalate: Step[];
  pearls: string[];
}

const CAUSES: Cause[] = [
  {"key": "dka", "label": "DKA", "oneLiner": "Ketoanion accumulation in insulin deficiency", "recognise": [{"text": "Measure blood β-hydroxybutyrate, glucose, pH, bicarbonate and electrolytes; consider euglycaemic DKA with SGLT2 inhibitors."}], "resuscitate": [{"text": "Assess circulation and potassium; use the local DKA fluid/electrolyte protocol."}], "specific": [{"text": "Insulin, fluid and potassium treatment must follow the current DKA protocol; routine bicarbonate is not indicated."}], "escalate": [{"text": "Escalate severe acidaemia, hypokalaemia, altered consciousness or other organ dysfunction."}], "pearls": ["Urine ketones can miss β-hydroxybutyrate; a normal glucose does not exclude DKA."]},
  {"key": "lactic-a", "label": "Lactic — Type A", "oneLiner": "Hypoperfusion, hypoxia or regional ischaemia", "recognise": [{"text": "Measure lactate and assess its trend alongside perfusion, oxygenation and the clinical cause."}], "resuscitate": [{"text": "Restore perfusion according to the cause; reassess fluid response and avoid indiscriminate fluid loading."}], "specific": [{"text": "Treat infection/source, haemorrhage, cardiac dysfunction or regional ischaemia as appropriate."}], "escalate": [{"text": "Urgently escalate persistent shock, organ failure or severe refractory acidaemia."}], "pearls": ["Do not wait for lactate >4 mmol/L to recognise shock or sepsis."]},
  {"key": "lactic-b", "label": "Lactic — Type B", "oneLiner": "Metabolic, clearance-related or drug-associated lactate elevation", "recognise": [{"text": "Review drugs, nutrition, liver and kidney function; type A and B mechanisms may coexist."}], "resuscitate": [{"text": "Withdraw suspected causative drugs and support circulation and organ function."}], "specific": [{"text": "Treat the identified cause; obtain toxicology advice when metformin or other poisoning is possible."}], "escalate": [{"text": "Toxin-specific extracorporeal criteria and organ dysfunction determine escalation, not lactate alone."}], "pearls": ["A normal blood pressure does not exclude impaired regional perfusion."]},
  {"key": "renal", "label": "Uraemic acidosis", "oneLiner": "Impaired net acid excretion and retained anions", "recognise": [{"text": "Assess renal function, potassium, fluid status and other causes of a raised AG."}], "resuscitate": [{"text": "Treat reversible causes and life-threatening potassium disturbances."}], "specific": [{"text": "Individualise buffer and renal replacement decisions with the renal team."}], "escalate": [{"text": "Escalate refractory acidosis, dangerous hyperkalaemia, pulmonary oedema or uraemic complications."}], "pearls": ["Do not use a fixed maximum AG to attribute the entire disturbance to renal failure."]},
  {"key": "methanol", "label": "Methanol", "oneLiner": "Formate-mediated acidosis and visual injury", "recognise": [{"text": "Exposure history, direct level, pH, AG, osmolality, visual and neurological findings."}], "resuscitate": [{"text": "Obtain urgent NPIS and critical-care advice; sample promptly without delaying indicated treatment."}], "specific": [{"text": "Use indicated ADH blockade and specialist-directed supportive/cofactor therapy."}], "escalate": [{"text": "Use current EXTRIP criteria: organ injury, pH, AG and concentration relative to the antidote; see the source-linked panel below."}], "pearls": ["Normal gaps do not exclude poisoning; ethanol co-ingestion can delay toxicity."]},
  {"key": "eg", "label": "Ethylene glycol", "oneLiner": "Glycolate-related acidosis and oxalate-related injury", "recognise": [{"text": "Assess exposure, direct level, AG, osmolality, renal function and calcium."}], "resuscitate": [{"text": "Urgent NPIS assessment and indicated ADH blockade; monitor renal function and calcium."}], "specific": [{"text": "Treat under the current poison-specific protocol; calcium replacement is guided by clinical need."}], "escalate": [{"text": "Use current EXTRIP clinical, glycolate, potassium-inclusive AG and antidote-specific level criteria."}], "pearls": ["Oxalate crystals neither prove nor exclude poisoning; Wood’s-lamp fluorescence is unreliable."]},
  {"key": "salicylate", "label": "Salicylate", "oneLiner": "Often respiratory alkalosis plus metabolic acidosis", "recognise": [{"text": "Assess serial levels, pH, potassium, glucose, consciousness and oxygen requirement."}], "resuscitate": [{"text": "Support circulation and preserve compensatory ventilation; obtain urgent NPIS advice."}], "specific": [{"text": "Specialist-directed bicarbonate/urinary alkalinisation with electrolyte monitoring."}], "escalate": [{"text": "Use current EXTRIP concentration, renal function, pH and clinical criteria; see the panel below."}], "pearls": ["A normal pH can hide a mixed disorder; chronic exposure may be severe at lower levels."]}
];

const HAGMAManagementAlgorithm = () => {
  const [active, setActive] = useState<CauseKey>("dka");
  const cause = CAUSES.find((c) => c.key === active) ?? CAUSES[0];

  const columns: { title: string; icon: typeof Pill; steps: Step[]; tint: string }[] = [
    { title: "1. Recognise & confirm", icon: Stethoscope, steps: cause.recognise, tint: "border-l-icu" },
    { title: "2. Resuscitate & support", icon: Droplets, steps: cause.resuscitate, tint: "border-l-physiology" },
    { title: "3. Specific therapy / antidote", icon: Pill, steps: cause.specific, tint: "border-l-pharmacology" },
    { title: "4. Escalate (RRT / HD)", icon: AlertTriangle, steps: cause.escalate, tint: "border-l-destructive" },
  ];

  return (
    <DiagramFigure
      id="hagma-management-algorithm"
      title="HAGMA management algorithm by cause"
      description="Cause-stratified, four-step algorithm for HAGMA. Select a cause to see recognition, resuscitation, specific therapy / antidote and escalation principles for renal replacement therapy."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-base font-serif font-bold text-foreground">HAGMA management algorithm</h3>
          <p className="text-xs text-muted-foreground">Recognition, support, cause-specific treatment and escalation</p>
        </div>

        {/* Cause selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CAUSES.map((c) => (
            <Button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                active === c.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary text-foreground"
              }`}
            >
              {c.label}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground italic mb-4 animate-fade-in" key={cause.key}>
          {cause.oneLiner}
        </p>

        {/* 4-column algorithm */}
        <div className="grid md:grid-cols-2 gap-3 mb-4 animate-fade-in" key={`grid-${cause.key}`}>
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.title} className={`p-3 rounded-md border border-border bg-secondary/30 border-l-4 ${col.tint}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className="h-4 w-4 text-foreground" aria-hidden="true" focusable={false} />
                  <p className="text-xs font-bold text-foreground">{col.title}</p>
                </div>
                <ol className="space-y-2">
                  {col.steps.map((s, i) => (
                    <li key={i} className="text-xs text-foreground leading-snug">
                      <div className="flex gap-1.5">
                        <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                        <span>{s.text}</span>
                      </div>
                      {s.trigger && (
                        <div className="mt-1 ml-4 inline-block text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                          Trigger: {s.trigger}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        {/* Pearls */}
        <div className="p-3 rounded-md border border-primary/30 bg-primary/5 animate-fade-in" key={`pearls-${cause.key}`}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Activity className="h-4 w-4 text-primary"  aria-hidden="true" focusable={false}/>
            <p className="text-sm font-semibold text-foreground">Exam / clinical pearls</p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-foreground">
            {cause.pearls.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground italic">
          Cause-based teaching, not a prescribing protocol. Confirm treatment with the relevant current guideline and NPIS/TOXBASE.
        <InlineRef topicId="acid-base" refLabel="Jung 2019 diagnosis" /><InlineRef topicId="acid-base" refLabel="EXTRIP methanol" /><InlineRef topicId="acid-base" refLabel="EXTRIP ethylene glycol" /><InlineRef topicId="acid-base" refLabel="EXTRIP salicylates" /></p>
      </div>
    </DiagramFigure>
  );
};

export default HAGMAManagementAlgorithm;
