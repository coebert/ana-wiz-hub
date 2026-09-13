import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { Cite } from "@/components/references/Cite";

/**
 * Major haemorrhage flowchart — activation, empirical ratio, tranexamic acid and
 * the "lethal triad" adjuncts, then a branch: new hypoxia, fever or hypotension
 * during transfusion diverts to the acute transfusion reaction pathway (the
 * classic complex exam scenario — TACO vs TRALI vs haemolytic vs bacterial),
 * while the main path moves from empirical to viscoelastic goal-directed therapy.
 */
const MajorHaemorrhageFlowchart = () => {
  const id = "major-haemorrhage-flow";
  const W = 920;
  const H = 990;

  return (
    <DiagramFigure
      id={id}
      title="Major haemorrhage flowchart — goal-directed transfusion with acute reaction branch"
      description="Decision flow for major haemorrhage: activate the protocol, give empirical 1:1 components with tranexamic acid and correct calcium, temperature and acidosis, then branch to the acute transfusion reaction pathway if new hypoxia, fever or hypotension develops, otherwise switch to viscoelastic goal-directed product targets and defined stand-down criteria."
      showCaption
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>Major haemorrhage and transfusion reaction flowchart</title>
        <desc id={`${id}-desc`}>
          Flowchart for major haemorrhage. Recognise and activate the protocol,
          give empirical red cells and plasma in equal ratio with tranexamic acid
          within three hours, and correct ionised calcium, temperature and
          acidosis. A decision point diverts patients developing new hypoxia,
          fever or hypotension during transfusion to the acute reaction pathway
          distinguishing TACO, TRALI, acute haemolytic and bacterial reactions;
          otherwise viscoelastic testing directs fibrinogen, plasma or
          prothrombin complex, platelets and antifibrinolytics, ending in defined
          stand-down criteria.
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
            Uncontrolled bleeding — activate major haemorrhage protocol
          </text>
          <text x={W / 2} y={52} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            &gt; 4 units in 1 h with ongoing loss, or one blood volume in 24 h, or anticipated need
          </text>
        </g>
        <line x1={W / 2} y1={66} x2={W / 2} y2={92} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* IMMEDIATE ACTIONS */}
        <g>
          <rect x={W / 2 - 260} y={96} width="520" height="72" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={118} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Simultaneous actions — stop the bleeding first
          </text>
          <text x={W / 2} y={136} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Surgical / radiological / obstetric control · pressure, tourniquet, pelvic binder
          </text>
          <text x={W / 2} y={152} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Large-bore access · group &amp; save + crossmatch · baseline FBC, coagulation, fibrinogen, gas
          </text>
        </g>
        <line x1={W / 2} y1={168} x2={W / 2} y2={192} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* EMPIRICAL PACK */}
        <g>
          <rect x={W / 2 - 260} y={196} width="520" height="76" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={218} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Empirical phase — before any test results
          </text>
          <text x={W / 2} y={236} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Red cells : plasma ≈ 1:1 · platelets with the second pack · avoid crystalloid dilution
          </text>
          <text x={W / 2} y={252} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Tranexamic acid 1 g within 3 h of trauma · fluid warmer and active rewarming
          </text>
          <text x={W / 2} y={268} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Ionised Ca²⁺ &gt; 1.0 mmol/L · treat acidosis by restoring perfusion, not bicarbonate
          </text>
        </g>
        <line x1={W / 2} y1={272} x2={W / 2} y2={292} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* DECISION: reaction? */}
        <g>
          <polygon
            points={`${W / 2},296 ${W / 2 + 190},348 ${W / 2},400 ${W / 2 - 190},348`}
            fill="hsl(var(--icu) / 0.12)"
            stroke="hsl(var(--icu))"
            strokeWidth="1.5"
          />
          <text x={W / 2} y={340} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            New hypoxia, fever, rigors, rash or
          </text>
          <text x={W / 2} y={356} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            hypotension during transfusion?
          </text>
        </g>

        <text x={W / 2 + 14} y={422} fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">NO — bleeding continues</text>
        <line x1={W / 2} y1={400} x2={W / 2} y2={428} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        <text x={W / 2 - 340} y={340} fontSize="10" fontWeight="700" fill="hsl(38 92% 40%)">YES — reaction branch</text>
        <path d={`M${W / 2 - 190} 348 H230`} stroke="hsl(38 92% 45%)" strokeWidth="2" fill="none" markerEnd={`url(#${id}-arr-warn)`} />

        {/* LEFT WARN BRANCH */}
        <g>
          <rect x={20} y={430} width="420" height="60" rx="10" fill="hsl(38 92% 50% / 0.12)" stroke="hsl(38 92% 45%)" strokeWidth="2" />
          <text x={230} y={452} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(38 92% 35%)">
            STOP the unit · keep IV access · recheck identity
          </text>
          <text x={230} y={470} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(38 92% 35%)">
            ABC · inform lab and haematologist · report to SHOT
          </text>
        </g>
        <line x1={230} y1={490} x2={230} y2={510} stroke="hsl(38 92% 45%)" strokeWidth="1.5" markerEnd={`url(#${id}-arr-warn)`} />

        <g>
          <rect x={20} y={514} width="420" height="188" rx="10" fill="hsl(var(--card))" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          <text x={34} y={536} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
            Separate the four look-alikes
          </text>
          {[
            "TACO — raised JVP/CVP, S3, hypertension, BNP > 1.5×",
            "  baseline; responds to diuresis. Commonest UK",
            "  transfusion death — the default diagnosis to exclude",
            "TRALI — normal filling pressures, fever, transient",
            "  leucopenia, worse with fluid; supportive ventilation only",
            "Acute haemolytic — loin / infusion-site pain, dark urine,",
            "  DIC, hypotension out of proportion; usually ABO error",
            "Bacterial contamination — rapid rigors, high fever,",
            "  profound shock; cultures + broad-spectrum antibiotics",
            "Anaphylaxis — angio-oedema, wheeze, urticaria;",
            "  adrenaline, consider IgA deficiency / washed components",
          ].map((t, i) => (
            <text key={i} x={34} y={558 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t.startsWith(" ") ? t : `• ${t}`}
            </text>
          ))}
        </g>
        <line x1={230} y1={702} x2={230} y2={722} stroke="hsl(38 92% 45%)" strokeWidth="1.5" markerEnd={`url(#${id}-arr-warn)`} />

        <g>
          <rect x={20} y={726} width="420" height="158" rx="10" fill="hsl(var(--card))" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          <text x={34} y={748} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
            The exam trap: you still have to transfuse
          </text>
          {[
            "Ongoing exsanguination outranks a suspected reaction —",
            "  continue resuscitation with fresh units, never stop cold",
            "Return the implicated unit and giving set to the lab;",
            "  send repeat group, DAT, haemolysis screen, cultures",
            "Rate-limit and diurese where TACO is likely rather than",
            "  abandoning red cells the patient needs",
            "Escalate ventilation for TRALI — do NOT fluid-challenge",
            "Massive-transfusion mimics: citrate hypocalcaemia,",
            "  hyperkalaemia, hypothermia, dilutional coagulopathy",
          ].map((t, i) => (
            <text key={i} x={34} y={770 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t.startsWith(" ") ? t : `• ${t}`}
            </text>
          ))}
        </g>

        {/* MAIN COLUMN — goal directed */}
        <g>
          <rect x={500} y={432} width="400" height="128" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={700} y={454} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Switch to goal-directed therapy (ROTEM/TEG)
          </text>
          {[
            "FIBTEM A5 < 12 mm → fibrinogen concentrate / cryo",
            "EXTEM CT > 80 s → plasma, or PCC if warfarinised",
            "EXTEM A5 < 40 mm with normal FIBTEM → platelets",
            "ML > 15% (lysis) → tranexamic acid",
            "Targets: Hb 80 g/L · Plt > 50 (> 100 if CNS/eye)",
            "Fibrinogen > 1.5 g/L (> 2 g/L obstetric) · PT ratio < 1.5",
          ].map((t, i) => (
            <text key={i} x={516} y={476 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t}
            </text>
          ))}
        </g>
        <line x1={700} y1={560} x2={700} y2={580} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* Decision: bleeding controlled? */}
        <g>
          <polygon points="700,584 810,636 700,688 590,636" fill="hsl(var(--icu) / 0.12)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={700} y={630} fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Bleeding controlled
          </text>
          <text x={700} y={645} fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            and perfusion restored?
          </text>
        </g>

        {/* No → refractory */}
        <text x={812} y={630} fontSize="10" fontWeight="700" fill="hsl(var(--destructive))">NO</text>
        <path d="M810 636 H884 V726 H784" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arr)`} />
        <g>
          <rect x={484} y={726} width="300" height="92" rx="10" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
          <text x={634} y={748} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--destructive))">
            Refractory bleeding — reassess the cause
          </text>
          {[
            "Return to theatre / IR · damage control, pack and close",
            "Missed surgical source? Anticoagulant or DOAC on board?",
            "Consider DIC — treat the trigger, replace, avoid",
            "  antifibrinolytics if thrombotic phenotype dominates",
          ].map((t, i) => (
            <text key={i} x={498} y={766 + i * 14} fontSize="9" fill="hsl(var(--muted-foreground))">
              {t}
            </text>
          ))}
        </g>

        {/* Yes → stand down */}
        <text x={556} y={704} fontSize="10" fontWeight="700" fill="hsl(var(--icu))">YES</text>
        <path d="M700 688 V836 H820 V856" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arr)`} />
        <g>
          <rect x={640} y={860} width="260" height="80" rx="10" fill="hsl(var(--icu) / 0.1)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={770} y={882} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            Stand down the protocol
          </text>
          <text x={770} y={900} fontSize="9" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Inform lab · return unused units · recheck bloods
          </text>
          <text x={770} y={914} fontSize="9" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Thromboprophylaxis once bleeding stopped
          </text>
          <text x={770} y={928} fontSize="9" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Document, debrief and report incidents
          </text>
        </g>

        <text x={W / 2} y={972} fontSize="10" fontStyle="italic" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          Products buy time; only source control stops bleeding. Treat calcium, temperature and pH as part of the transfusion.
        </text>
      </svg>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--icu))" }} /> main haemorrhage pathway
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(38 92% 45%)" }} /> transfusion reaction — caution
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--destructive))" }} /> refractory bleeding
        </span>
      </div>

      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-[11px] leading-relaxed">
        <p className="font-semibold text-foreground mb-1.5">Step sources — verify each part of the flow</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Activation, empirical ratio and product targets:</span>
            <Cite topicId="transfusion-coagulation" labels={["NICE NG24", "BSH 2017"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Tranexamic acid timing:</span> early administration in bleeding trauma, including head injury
            <Cite topicId="transfusion-coagulation" labels={["CRASH-3 2019", "POISE-3 2022"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Viscoelastic triggers:</span> FIBTEM, EXTEM CT/A5 and lysis thresholds
            <Cite topicId="transfusion-coagulation" labels={["Curr Opin Anaesthesiol 2013 VHA", "Anaesthesia 2017 TIC"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Reaction branch — TACO vs TRALI and reporting:</span>
            <Cite topicId="transfusion-coagulation" labels={["SHOT 2023"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">DIC in refractory bleeding:</span> scoring and treat-the-trigger principle
            <Cite topicId="transfusion-coagulation" labels={["ISTH DIC 2009"]} />
          </li>
        </ul>
      </div>
    </DiagramFigure>
  );
};

export default MajorHaemorrhageFlowchart;
