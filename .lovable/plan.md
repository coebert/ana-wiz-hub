# Learner progress dashboard

## Goal
Turn `/progress` into a clear learner dashboard for completed topics, completed subsections, and progress within every topic.

## Implementation
- Keep the existing cross-device topic and subsection progress as the source of truth.
- Add a searchable topic-progress table grouped by curriculum section.
- Show each topic’s completion state, completed subsection count, and a clear progress indicator.
- Expand each topic row to list the completed subsection names with links back to the relevant point on the topic page.
- Add filters for all, in progress, completed, and not started topics while retaining exam filters.
- Preserve the existing overview, recent topics, curriculum summaries, and signed-in sync messaging.

## Verification
- Test empty, partial, and completed states using saved progress.
- Confirm subsection links open the correct topic section.
- Check desktop and mobile layouts and ensure the preview builds cleanly.

## Technical details
- Reuse `ProgressContext`, `SubsectionProgressContext`, and the curriculum catalogue.
- Derive readable subsection names from the stable subsection identifiers already saved by topic pages.
- Avoid database changes because the required progress records and access controls already exist.
