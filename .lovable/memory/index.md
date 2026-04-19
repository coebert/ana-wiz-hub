# Project Memory

## Core
FRCA Primary + Final + FFICM unified curriculum. Exam filter chips in header.
8 sections: Physics, Physiology, Pharmacology, Anatomy, Clinical, ICU, Perioperative, Chemistry.
Playfair Display headings, Inter body. HSL design tokens in index.css.
QuizSection takes {questions}. TopicCompletionToggle takes {topicId, topicTitle}.
Anatomy diagrams MUST follow src/components/diagrams/STYLE_GUIDE.md (DiagramToggleBar header, depth gradients, tissue patterns, prefixed defs ids, detail panel).

## Memories
- [Curriculum structure](mem://features/curriculum) — Topic type with examTags, Section type, all topic arrays
- [Color tokens](mem://design/colors) — physics/physiology/pharmacology/clinical/icu/perioperative/anatomy/chemistry HSL tokens
- [Anatomy diagram style](mem://design/diagrams) — DiagramToggleBar pattern, gradients, palette, detail panel for anatomy SVGs
