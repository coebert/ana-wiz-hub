# Content audit batch 1 of 4

## Scope

- Expand Lung Mechanics with airway-flow physics, complete intrinsic PEEP guidance, and the four mechanisms of ventilator-induced lung injury.
- Expand Statistics & Evidence-Based Medicine with case reports/series, cross-sectional study strengths and limitations, clear data-type definitions, and a worked Bayesian diagnostic example.
- Correct the four database-backed depth-monitoring viva issues, then expand the topic's elderly, obstetric, and cerebral-perfusion guidance.
- Add Clark and Severinghaus electrode error sources to ABG Analyser.
- Expand Pulse Oximetry with reflective probes, signal processing, perfusion-index interpretation, and complete PVI limitations.
- Expand Clinical Measurement with pathological CVP waveforms, bioimpedance/bioreactance, and complete PPV/SVV definitions and interpretation.
- Add an explicit capnography warning that clinical signs cannot confirm tracheal placement, including the supplied false-positive rates.

## Citations and consistency

- Reuse existing textbook and journal references where they directly support a change.
- Add the supplied VILI, elderly pEEG, obstetric pEEG, and intubation-confirmation sources to the matching reference groups and cite them in-page.
- Keep terminology, units, thresholds, and duplicated teaching content consistent across page text and database-backed viva answers.

## Validation and audit synchronization

- Run the TypeScript typecheck and source-excerpt validation.
- Mark only successfully actioned finding IDs fixed in one managed database operation, including all corrected viva answers in that same operation.
- Run the targeted audit-fixes check and confirm the current build remains healthy.
- Report the fixed count and explicitly list any finding IDs left open with reasons.

## Technical details

- Preserve the existing `TopicTemplate`, `ExamSection`, `InlineRef`, semantic styling, and responsive card/list patterns.
- Treat already-complete sections as verified findings rather than duplicating content; augment only the missing detail.
- Use a documented `unverifiable_reason` only if a finding has no usable source, as required by the audit citation guard.