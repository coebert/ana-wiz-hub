import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "./LessonSources";
import { topicReferences } from "@/data/references";

const T = "sepsis";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Check = ({ question, children }: { question: string; children: ReactNode }) => <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary><p className="mt-2">{children}</p></details>;
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

const Quote = ({ label }: { label: string }) => {
  const ref = topicReferences[T]?.find(item => item.label === label);
  if (!ref?.excerpt) return null;
  return <blockquote className="border-l-2 border-primary pl-4 text-foreground"><p>&ldquo;{ref.excerpt}&rdquo;<R label={label} /></p></blockquote>;
};

export function SepsisCriteriaTeaching() {
  return <div className={wrap}>
    <p>Quotations are the sources' own wording; the surrounding explanation is teaching synthesis.</p>
    <H>Sepsis-3: infection plus organ dysfunction</H>
    <Quote label="Sepsis-3 2016 organ dysfunction" />
    <p>Sepsis-3 dropped SIRS from the definition and removed the term "severe sepsis". Sepsis now means infection with a rise in SOFA of 2 or more; it is a definition of organ dysfunction, not of inflammation. The baseline is taken as zero unless pre-existing dysfunction is known, so chronic kidney or liver disease must be accounted for.</p>
    <H>Septic shock: two criteria, both required</H>
    <Quote label="Sepsis-3 2016 septic shock" />
    <p>Hypotension alone, or a raised lactate alone, does not meet the definition. Both must persist after adequate volume resuscitation.</p>
    <H>Screening is not diagnosis</H>
    <Quote label="SSC 2021 qSOFA screening" />
    <p>qSOFA (respiratory rate ≥22, altered mentation, systolic BP ≤100 mm Hg) identifies patients at risk of a poor outcome, but is too insensitive to rule sepsis out. UK hospitals typically screen with NEWS2 and the NICE NG51 risk criteria; that mapping is teaching synthesis, not a quoted recommendation.</p>
    <Quote label="SSC 2021 lactate" />
    <Check question="a patient with pneumonia needs noradrenaline for a MAP of 65 mm Hg after fluids, but lactate is 1.6 mmol/L. Is this septic shock by Sepsis-3?">No. Sepsis-3 requires both vasopressor-dependent hypotension and lactate above 2 mmol/L after adequate fluid. This is sepsis with hypotension needing vasopressors; treat it with the same urgency.</Check>
    <LessonSources topicId={T} labels={["Sepsis-3 2016 organ dysfunction", "Sepsis-3 2016 septic shock", "SSC 2021 qSOFA screening", "SSC 2021 lactate"]} />
  </div>;
}

export function SepsisEgdtTeaching() {
  return <div className={wrap}>
    <H>The original trial: Rivers 2001</H>
    <p>Rivers randomised 263 emergency-department patients to six hours of protocolised resuscitation before ICU admission. Targets were CVP 8–12 mm Hg, MAP ≥65 mm Hg, urine output ≥0.5 mL/kg/h and central venous oxygen saturation (ScvO₂) ≥70%, reached with fluids, vasopressors, red-cell transfusion to haematocrit ≥30% and dobutamine. These targets are summarised from the trial protocol rather than quoted.</p>
    <Quote label="Rivers 2001 EGDT" />
    <p>It was a single-centre trial with a very high control-group mortality, and it shaped the early Surviving Sepsis bundles.</p>
    <H>The three multicentre trials and PRISM</H>
    <p>ProCESS (USA, 2014), ARISE (Australasia, 2014) and ProMISe (England, 2015) each compared EGDT with usual care and found no mortality benefit. The PRISM meta-analysis pooled their individual patient data:</p>
    <Quote label="PRISM 2017 EGDT meta-analysis" />
    <Quote label="PRISM 2017 subgroups" />
    <p>Why the difference? Usual care had improved: by 2014 patients already received early antibiotics and substantial fluid before randomisation, and control mortality was far lower than in Rivers. This explanation is teaching synthesis.</p>
    <H>What replaced EGDT</H>
    <p>The lasting lessons are early recognition, early antibiotics and source control, and prompt resuscitation with frequent reassessment, rather than fixed CVP or ScvO₂ targets. Current guidance uses lactate and capillary refill as perfusion markers:</p>
    <Quote label="SSC 2021 capillary refill" />
    <p>See also the MAP-target lesson below, the <Link to="/intensive-care/fluid-balance" className="text-primary underline">Fluid Balance</Link> page, and <Link to="/intensive-care/haemorrhagic-shock" className="text-primary underline">Haemorrhagic Shock</Link> for comparison with bleeding.</p>
    <Check question="does PRISM show that the Rivers targets are harmful?">No. PRISM found similar 90-day mortality (24.9% vs 25.4%) with more ICU use and higher costs. It shows no benefit over modern usual care, not harm.</Check>
    <LessonSources topicId={T} labels={["Rivers 2001 EGDT", "PRISM 2017 EGDT meta-analysis", "PRISM 2017 subgroups", "SSC 2021 capillary refill"]} />
  </div>;
}
