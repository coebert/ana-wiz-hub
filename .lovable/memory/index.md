# Memory: index.md
Updated: today

# Project Memory

## Core
FRCA Primary + Final + FFICM + EDIC unified curriculum. Exam filter chips in header.
6 sections: Physics, Physiology, Pharmacology, Clinical, ICU, Perioperative.
Playfair Display headings, Inter body. HSL design tokens in index.css.
QuizSection takes {questions}. TopicCompletionToggle takes {topicId, topicTitle}.
All audited topic pages use <TopicTemplate>: Objectives → Core Concepts → Diagrams → Worked Examples → KLPs → Quiz/Refs/SeeAlso/Toggle.
For EVERY "add to topic" request: auto-run placement flow (read → 3-layer dedupe: text + diagram registry + semantic LLM → section → insertion point → 5-line report → build → register fingerprint).

## Memories
- [Curriculum structure](mem://features/curriculum) — Topic type with examTags, Section type, all topic arrays
- [Color tokens](mem://design/colors) — physics/physiology/pharmacology/clinical/icu/perioperative HSL tokens
- [Topic template](mem://preferences/topic-template) — TopicTemplate component, 5-section structure, migration pattern
- [Section placement flow](mem://preferences/topic-section-placement) — Mandatory auto flow with 3-layer dedupe (text + registry + semantic)
- [Diagram registry](mem://reference/diagram-registry) — src/lib/diagram-registry.ts: DiagramFingerprint, findSimilarDiagrams, verdictLine
- [Semantic dedupe](mem://reference/semantic-dedupe) — semantic-dedupe edge function + src/lib/semantic-dedupe.ts: LLM paraphrase detection
