# Physics content-audit fixes — batch 1 of 2

## Goal
Resolve all 26 supplied findings across eight physics topics, preserve the existing teaching style, add traceable citations, correct duplicated case/viva content, validate the result, and synchronize only verified findings.

## Implementation
- **Flow & Flowmeters:** add the continuity equation and its Bernoulli link; explain Venturi-device back-pressure and total-flow limitations; add Doppler flow measurement, its equation, angle dependence, and oesophageal Doppler/echocardiography applications.
- **Pressure Measurement:** add grade-aware IAP monitoring and escalation while preserving clinical judgement around decompression; deepen cuffless PTT/PWA principles, calibration, and Aurora limitations; expand ICP waveform/Lundberg-wave interpretation and tiered treatment; strengthen Bourdon/aneroid mechanisms; correct the arterial-line case conversion to 7.4 mmHg per 10 cm.
- **Optics & Light:** add a cited polarisation section and expand reflection applications in laryngoscopy, theatre lighting, and laser-safe instruments.
- **Defibrillation & Pacing:** structure transthoracic-impedance factors; add capture, sensing, and output failure recognition/troubleshooting; explain BOL/ERI/EOL magnet-rate interpretation; update paediatric shock escalation and maximum energy.
- **Electrical Safety:** add paediatric defibrillation dosing, attenuation/pad placement, and non-overlap precautions; retain and cite the existing capacitor equations while aligning typical capacitance wording with the supplied source.
- **Gas Laws:** verify and retain the already-complete Avogadro section; add Graham’s law with its Fick/Henry clinical link; deepen hyperbaric pressure, oxygen-toxicity, ETT-cuff, decompression-illness, carbon-monoxide, density, and ventilation implications.
- **Mathematical Concepts:** verify and retain existing Michaelis–Menten and probit/logit coverage; expand spread, sample/population SD, normal-distribution proportions, IQR calculation, confidence intervals, and null-value interpretation.
- **SI Units & Thermodynamics:** verify and, if needed, clarify the existing van der Waals equation and one-mole form.

## Citation and data corrections
- Add the supplied peer-reviewed references to `references.ts` where no matching registered label exists, then place matching `InlineRef` citations in each affected topic section.
- Correct the pressure-transducer viva answer from piezoelectric to piezoresistive terminology, including its high-yield point.
- Correct both exponential viva records: preserve the mathematically correct half-life/time-constant relationship and replace the misleading “5 half-lives” clinical-completion statement with “5 time constants (~99.3%).”
- Treat already-complete source sections as actioned only after confirming their wording and citations satisfy the finding.

## Validation and synchronization
- Run TypeScript typecheck, source-excerpt validation, and the audit-fixes validator; resolve every new failure.
- Mark the 26 supplied findings fixed in exactly one managed database update only after all source and citation checks pass. Any unsafe or unresolved ID will be omitted and reported explicitly.
- Re-run the audit-fixes validator after synchronization and mark the roadmap item complete.

## Technical notes
- Reuse existing `ExamSection`, `CollapsibleSubsection`, `InlineRef`, diagram, card, and table patterns; no unrelated UI or business-logic changes.
- For IAP, avoid presenting grade IV alone as an automatic laparotomy indication: urgent decompression is tied to abdominal compartment syndrome and failure of less-invasive measures, consistent with WSACS guidance.
