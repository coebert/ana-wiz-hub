---
name: Topic page template
description: Standardised TopicTemplate structure all audited topics must follow
type: preference
---

All topic pages use `<TopicTemplate>` from `@/components/TopicTemplate`.

Required structure (in order):
1. **Learning Objectives** — 3–6 action-led ("Describe…", "Calculate…", "Manage…"). Auto-numbered.
2. **Core Concepts** — free-form `<ExamSection>` (or `<section>`) blocks with `h2` headings. Main teaching content.
3. **Diagrams & Visualisations** — optional. Interactive diagrams/animations.
4. **Worked Examples** — optional. Clinical vignettes + numerical calculations where relevant. Skip on topics where it doesn't fit (e.g. ethics-only). Use `WorkedExample[]` with `{title, scenario, working, answer}`.
5. **Key Learning Points** — final summary bullets via `keyPoints` prop.
6. **Quiz → References → See Also → Completion toggle** — auto-rendered by template.

**In-page references panel (`sectionSources` prop):** Optional but encouraged on audited topics. Map reference labels (must exist in `topicReferences[topicId]`) to the section they support. Keys: `objectives`, `diagrams`, `workedExamples`, `keyPoints`. Renders a compact `<SectionReferences>` panel beneath each block, each with a "Jump to" anchor link to its supported block (`#objectives`, `#diagrams`, `#worked-examples`, `#key-points`). Per-item anchors also exist (`#objective-N`, `#example-N`, `#keypoint-N`). Unknown labels are ignored at runtime with a dev-only warning.

**Per-section exam mapping (`sectionExamMapping` prop):** Optional but encouraged. Maps each block to FRCA Primary / Final / FFICM / EDIC plus optional curriculum codes. Renders `<ExamMappingBadges>` at the TOP of each block (objectives / diagrams / workedExamples / keyPoints). Each FRCA exam has a distinct semantic-token colour (physiology/pharmacology/icu/clinical) for fast scanning.

**Per-subsection exam filtering (`<ExamSection>`):** Inside `coreConcepts`, wrap each subsection in `<ExamSection exams={[...]} curriculumCodes={[...]}>...</ExamSection>` from `@/components/ExamSection`. This renders the badges AND respects the global `ExamFilterContext` — when the user picks an exam in the header chips or the on-page `<TopicExamFilterBar>` (auto-rendered at the top of every TopicTemplate page), subsections that don't include the active exam collapse to a "Section hidden by exam filter" stub. The same filter also hides built-in objectives / diagrams / workedExamples / keyPoints blocks whose `sectionExamMapping` doesn't match. Do NOT use plain `<div>` + `<ExamMappingBadges>` for new subsections — always use `<ExamSection>` so filtering works.

**How to apply:** When auditing a topic, replace the manual SectionLayout scaffold with `<TopicTemplate>` and pass `objectives`, `coreConcepts` (JSX with `<ExamSection>` per subsection), `keyPoints`, optional `diagrams` and `workedExamples`, optional `sectionSources` and `sectionExamMapping`, plus `topicId`/`quizQuestions`/back-nav props.

**Why:** Consistent learner experience across FRCA/FFICM/EDIC; enforces curriculum-aligned scaffolding (objectives → content → application → recall); surfaces evidence base inline with bidirectional jump links; lets learners filter the page down to only the exam they're revising for.
