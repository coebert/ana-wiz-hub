# Memory: index.md
Updated: today

# Project Memory

## Core
FRCA Primary + Final + FFICM + EDIC unified curriculum. Exam filter chips in header.
6 sections: Physics, Physiology, Pharmacology, Clinical, ICU, Perioperative.
Playfair Display headings, Inter body. HSL design tokens in index.css.
QuizSection takes {questions}. TopicCompletionToggle takes {topicId, topicTitle}.
All audited topic pages use <TopicTemplate>: Objectives → Core Concepts → Diagrams → Worked Examples → KLPs → Quiz/Refs/SeeAlso/Toggle.
When adding new content to a topic, ALWAYS assess + place it in the most appropriate TopicTemplate section and state the placement decision briefly.

## Memories
- [Curriculum structure](mem://features/curriculum) — Topic type with examTags, Section type, all topic arrays
- [Color tokens](mem://design/colors) — physics/physiology/pharmacology/clinical/icu/perioperative HSL tokens
- [Topic template](mem://preferences/topic-template) — TopicTemplate component, 5-section structure, migration pattern
- [Section placement rule](mem://preferences/topic-section-placement) — How to decide which TopicTemplate section new additions belong in
