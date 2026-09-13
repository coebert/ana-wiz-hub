import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { Cite } from "@/components/references/Cite";

/**
 * Multimodal neuroprognostication flowchart after cardiac arrest — ERC/ESICM 2021
 * entry criteria and timing, confounder exclusion, the six poor-outcome criteria,
 * and the ≥ 2-concordant-modalities rule. Posterior fossa / brainstem pathology
 * diverts to a separate branch capturing the specific cautions: structural
 * brainstem injury can abolish reflexes and SSEP N20 without diffuse cortical
 * necrosis, lesions are dynamic (cerebellar swelling 3–5 d, treatable
 * hydrocephalus, basilar thrombectomy), and the post-anoxic criteria were not
 * validated in this population.
 */
const NeuroprognosticationFlowchart = () => {
  const id = "neuroprognostication-flow";
  const W = 920;
  const H = 980;

  return (
    <DiagramFigure
      id={id}
      title="Neuroprognostication flowchart — multimodal assessment with posterior fossa branch"
      description="Decision flow for neuroprognostication after cardiac arrest: confirm comatose state and exclude confounders, defer to at least 72 hours, branch off if posterior fossa or brainstem pathology is present (separate cautions apply), otherwise apply the six multimodal criteria and require at least two concordant findings before concluding likely poor outcome."
      showCaption
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>Neuroprognostication flowchart</title>
        <desc id={`${id}-desc`}>
          Flowchart for neuroprognostication after cardiac arrest. Entry criteria
          (comatose, motor score 3 or less), confounder exclusion, minimum 72-hour
          delay, then a branch: posterior fossa or brainstem pathology requires a
          separate cautious pathway with imaging, treatment of reversible lesions
          and MDT review; otherwise apply clinical, EEG, SSEP, biomarker and
          imaging criteria, requiring at least two concordant findings.
        </desc>

        <defs>
          <marker id={`${id}-arr`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
          <marker id={`${id}-arr-warn`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(38 92% 45%)" />
          </marker>
        </defs>

        {/* ───────── ENTRY ───────── */}
        <g>
          <rect x={W / 2 - 220} y={12} width="440" height="54" rx="10" fill="hsl(var(--icu) / 0.15)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={W / 2} y={34} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            Comatose after ROSC — consider prognostication
          </text>
          <text x={W / 2} y={52} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Entry criterion: motor score M ≤ 3 (not itself a prognostic finding)
          </text>
        </g>
        <line x1={W / 2} y1={66} x2={W / 2} y2={92} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── CONFOUNDERS ───────── */}
        <g>
          <rect x={W / 2 - 250} y={96} width="500" height="70" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={118} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Exclude confounders first
          </text>
          <text x={W / 2} y={136} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Residual sedation (≥ 5 half-lives) · NMB — TOF 4/4 · hypothermia &lt; 36 °C
          </text>
          <text x={W / 2} y={152} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Metabolic derangement · shock / organ failure · recent seizure (postictal EEG)
          </text>
        </g>
        <line x1={W / 2} y1={166} x2={W / 2} y2={192} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── TIMING ───────── */}
        <g>
          <rect x={W / 2 - 220} y={196} width="440" height="46" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={216} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Wait ≥ 72 h after ROSC
          </text>
          <text x={W / 2} y={232} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Later if sedation, hypothermia or confounders persist
          </text>
        </g>
        <line x1={W / 2} y1={242} x2={W / 2} y2={268} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── DECISION: posterior fossa pathology? ───────── */}
        <g>
          <polygon
            points={`${W / 2},272 ${W / 2 + 170},320 ${W / 2},368 ${W / 2 - 170},320`}
            fill="hsl(var(--icu) / 0.12)"
            stroke="hsl(var(--icu))"
            strokeWidth="1.5"
          />
          <text x={W / 2} y={312} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Posterior fossa / brainstem
          </text>
          <text x={W / 2} y={328} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            pathology on CT/MRI?
          </text>
        </g>

        {/* No branch → standard algorithm */}
        <text x={W / 2 + 14} y={392} fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">NO — diffuse hypoxic–ischaemic injury</text>
        <line x1={W / 2} y1={368} x2={W / 2} y2={398} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* Yes branch → left to posterior fossa panel */}
        <text x={W / 2 - 320} y={312} fontSize="10" fontWeight="700" fill="hsl(38 92% 40%)">YES — separate branch</text>
        <path d={`M${W / 2 - 170} 320 H230`} stroke="hsl(38 92% 45%)" strokeWidth="2" fill="none" markerEnd={`url(#${id}-arr-warn)`} />

        {/* ───────── POSTERIOR FOSSA BRANCH (left column) ───────── */}
        <g>
          <rect x={20} y={400} width="420" height="60" rx="10" fill="hsl(38 92% 50% / 0.12)" stroke="hsl(38 92% 45%)" strokeWidth="2" />
          <text x={230} y={422} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(38 92% 35%)">
            Treat as a HARD EXCLUSION from the
          </text>
          <text x={230} y={440} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(38 92% 35%)">
            standard post-arrest algorithm
          </text>
        </g>
        <line x1={230} y1={460} x2={230} y2={486} stroke="hsl(38 92% 45%)" strokeWidth="1.5" markerEnd={`url(#${id}-arr-warn)`} />

        <g>
          <rect x={20} y={490} width="420" height="180" rx="10" fill="hsl(var(--card))" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          <text x={34} y={512} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
            Why the standard criteria mislead here
          </text>
          {[
            "Reflexes abolished by direct brainstem injury,",
            "  not diffuse cortical necrosis",
            "SSEP N20 requires an intact brainstem lemniscal",
            "  pathway — focal lesions can falsely abolish it",
            "Low NSE despite devastating small strategic lesion",
            "Locked-in / cognitive-motor dissociation may",
            "  mimic coma (arousal vs awareness problem)",
            "Criteria validated in post-anoxic coma only —",
            "  unquantified false-positive rate here",
          ].map((t, i) => (
            <text key={i} x={34} y={534 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t.startsWith(" ") ? t : `• ${t}`}
            </text>
          ))}
        </g>
        <line x1={230} y1={670} x2={230} y2={696} stroke="hsl(38 92% 45%)" strokeWidth="1.5" markerEnd={`url(#${id}-arr-warn)`} />

        <g>
          <rect x={20} y={700} width="420" height="160" rx="10" fill="hsl(var(--card))" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          <text x={34} y={722} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
            Posterior fossa pathway
          </text>
          {[
            "CT/MRI + vascular imaging — define lesion and",
            "  reversibility (basilar occlusion → thrombectomy)",
            "Treat reversible causes: EVD / suboccipital",
            "  decompression for swelling (peaks day 3–5)",
            "Defer prognosis well beyond 72 h — let the",
            "  lesion declare itself after treatment",
            "Prioritise EEG background/reactivity + MRI over",
            "  brainstem reflexes and SSEPs",
            "Test for covert consciousness before any WLST",
            "  discussion · MDT with neurology + neurosurgery",
          ].map((t, i) => (
            <text key={i} x={34} y={744 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t.startsWith(" ") ? t : `• ${t}`}
            </text>
          ))}
        </g>

        {/* ───────── STANDARD PATH (right/main column) ───────── */}
        <g>
          <rect x={500} y={402} width="400" height="118" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={700} y={424} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            Multimodal assessment — 6 criteria
          </text>
          {[
            "1. Pupillary AND corneal reflexes absent ≥ 72 h",
            "2. Status myoclonus ≤ 72 h (+ malignant EEG)",
            "3. NSE > 60 µg/L at 48/72 h (non-haemolysed)",
            "4. Bilaterally absent N20 on SSEP",
            "5. Highly malignant EEG (suppression / identical bursts)",
            "6. Diffuse anoxic injury on CT or MRI",
          ].map((t, i) => (
            <text key={i} x={516} y={446 + i * 16} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t}
            </text>
          ))}
        </g>
        <line x1={700} y1={520} x2={700} y2={546} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* Decision: ≥2 concordant? */}
        <g>
          <polygon points="700,550 810,600 700,650 590,600" fill="hsl(var(--icu) / 0.12)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={700} y={595} fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            ≥ 2 criteria
          </text>
          <text x={700} y={610} fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--foreground))">
            concordant?
          </text>
        </g>

        {/* Yes → poor outcome */}
        <text x={810} y={594} fontSize="10" fontWeight="700" fill="hsl(var(--destructive))">YES</text>
        <path d="M810 600 H880 V690 H780" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arr)`} />
        <g>
          <rect x={480} y={690} width="300" height="72" rx="10" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
          <text x={630} y={712} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--destructive))">
            Poor outcome LIKELY
          </text>
          <text x={630} y={730} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Document modalities + timing · second senior review
          </text>
          <text x={630} y={746} fontSize="9.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Family discussion before any WLST decision
          </text>
        </g>

        {/* No → indeterminate */}
        <text x={596} y={664} fontSize="10" fontWeight="700" fill="hsl(var(--icu))">NO / only one</text>
        <path d="M700 650 V700 H520 V762" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arr)`} />
        <g>
          <rect x={500} y={766} width="400" height="96" rx="10" fill="hsl(var(--icu) / 0.1)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={700} y={788} fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            INDETERMINATE — continue full support
          </text>
          {[
            "Do not conflate 'poor outcome unlikely' with 'good outcome likely'",
            "Extend observation · repeat EEG + imaging · look for good-outcome",
            "features (reactive EEG, low/falling NSE, symmetrical N20, normal MRI)",
            "Consider testing for cognitive-motor dissociation",
          ].map((t, i) => (
            <text key={i} x={516} y={808 + i * 15} fontSize="9.5" fill="hsl(var(--muted-foreground))">
              {t}
            </text>
          ))}
        </g>

        {/* Footer note */}
        <text x={W / 2} y={900} fontSize="10" fontStyle="italic" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          The algorithm predicts poor outcome only — it does not predict good outcome.
        </text>
        <text x={W / 2} y={918} fontSize="10" fontStyle="italic" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          Every criterion's confidence interval crosses 5% FPR: never act on a single modality.
        </text>
      </svg>

      {/* Compact key */}
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--icu))" }} /> standard pathway
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(38 92% 45%)" }} /> posterior fossa — caution
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--destructive))" }} /> likely poor outcome
        </span>
      </div>

      {/* Per-step source citations */}
      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-[11px] leading-relaxed">
        <p className="font-semibold text-foreground mb-1.5">Step sources — verify each part of the flow</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Entry, confounders & ≥ 72 h timing:</span>{" "}
            comatose with M ≤ 3 after ROSC; exclude sedation, NMB, hypothermia and metabolic causes
            <Cite topicId="neuroprognostication" labels={["ERC/ESICM 2021 Post-Resus"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Six multimodal criteria & ≥ 2 concordant:</span>{" "}
            clinical reflexes, status myoclonus, NSE &gt; 60 µg/L, absent N20, highly malignant EEG, imaging
            <Cite topicId="neuroprognostication" labels={["ERC/ESICM 2021 Post-Resus", "EHJ-ACC 2023 (Neuroprognostication)"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Posterior fossa branch:</span>{" "}
            cerebellar swelling peaks day 3–5, hydrocephalus, surgical decompression; criteria not validated in focal brainstem pathology
            <Cite topicId="neuroprognostication" labels={["Cerebellar Swelling 2014", "ERC/ESICM 2021 Post-Resus"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Indeterminate → CMD testing:</span>{" "}
            covert consciousness in behaviourally unresponsive patients
            <Cite topicId="neuroprognostication" labels={["EHJ-ACC 2023 (Neuroprognostication)"]} />
          </li>
        </ul>
      </div>
    </DiagramFigure>
  );
};

export default NeuroprognosticationFlowchart;
