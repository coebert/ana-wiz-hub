# Topic-linked perioperative cases

## Goal
Show relevant perioperative case-bank scenarios within topic pages and let learners jump directly into each full case.

## Implementation
- Create a shared case index containing each scenario’s title, category, difficulty, short clinical context, and related topic IDs.
- Add a standard “Related cases” section to the shared topic-page template; it will appear when the bank contains a case mapped to that topic.
- Link every case preview to its exact scenario in `/perioperative/case-bank`.
- Give full case cards stable anchors and automatically open the linked scenario on arrival.
- Map steroid cases to endocrine/adrenal and perioperative topics, phaeochromocytoma cases to endocrine and relevant obstetric topics, and antifibrinolytic cases to coagulation, trauma, obstetric, renal, cardiac and perioperative topics.

## Verification
- Check representative endocrine, obstetric and trauma topic pages.
- Verify a case link lands on and opens the correct scenario.
- Confirm mobile and desktop layouts and a clean preview build.

## Technical details
- Reuse the existing shared `TopicTemplate`, so individual topic files do not need repetitive edits.
- Keep this frontend-only; no new learner data or database changes are needed.
