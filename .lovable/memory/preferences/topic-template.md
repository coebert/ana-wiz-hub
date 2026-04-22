---
name: Topic page template
description: Standardised TopicTemplate structure all audited topics must follow
type: preference
---

All topic pages use `<TopicTemplate>` from `@/components/TopicTemplate`.

Required structure (in order):
1. **Learning Objectives** — 3–6 action-led ("Describe…", "Calculate…", "Manage…"). Auto-numbered.
2. **Core Concepts** — free-form `<section>` blocks with `h2` headings. Main teaching content.
3. **Diagrams & Visualisations** — optional. Interactive diagrams/animations.
4. **Worked Examples** — optional. Clinical vignettes + numerical calculations where relevant. Skip on topics where it doesn't fit (e.g. ethics-only). Use `WorkedExample[]` with `{title, scenario, working, answer}`.
5. **Key Learning Points** — final summary bullets via `keyPoints` prop.
6. **Quiz → References → See Also → Completion toggle** — auto-rendered by template.

**In-page references panel (`sectionSources` prop):** Optional but encouraged on audited topics. Map reference labels (must exist in `topicReferences[topicId]`) to the section they support. Keys: `objectives`, `diagrams`, `workedExamples`, `keyPoints`. Renders a compact `<SectionReferences>` panel beneath each block. Unknown labels are ignored at runtime with a dev-only warning.

**Per-section exam mapping (`sectionExamMapping` prop):** Optional but encouraged. Maps each block to FRCA Primary / Final / FFICM / EDIC plus optional curriculum codes. Renders `<ExamMappingBadges>` at the TOP of each block (objectives / diagrams / workedExamples / keyPoints). For finer-grained mapping inside `coreConcepts`, drop `<ExamMappingBadges exams={[...]} curriculumCodes={[...]} />` from `@/components/ExamMappingBadges` directly above each subsection's `<h2>`. Each FRCA exam has a distinct semantic-token colour (physiology/pharmacology/icu/clinical) for fast scanning.

**How to apply:** When auditing a topic, replace the manual SectionLayout scaffold with `<TopicTemplate>` and pass `objectives`, `coreConcepts` (JSX with inline `<ExamMappingBadges>` per subsection), `keyPoints`, optional `diagrams` and `workedExamples`, optional `sectionSources` and `sectionExamMapping`, plus `topicId`/`quizQuestions`/back-nav props.

**Why:** Consistent learner experience across FRCA/FFICM/EDIC; enforces curriculum-aligned scaffolding (objectives → content → application → recall), surfaces evidence base inline, and lets learners filter mentally by which exam each subsection serves.
