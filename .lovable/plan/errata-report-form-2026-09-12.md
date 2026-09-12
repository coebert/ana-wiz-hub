# Errata report form

## Goal
Add a complete correction-report form directly to `/errata`, while keeping the public ledger trustworthy through editorial review.

## Implementation
- Add a prominent “Report a correction” section above the published ledger.
- Collect the affected topic/page, quoted text, issue description, suggested correction, and optional contact email.
- Validate and length-limit every field before submission, with clear inline feedback, loading, success, and retry states.
- Submit reports into the existing correction review queue as `new`; readers cannot publish entries themselves.
- Keep the ledger limited to editor-approved `published` corrections. Once an admin publishes a report with an editor’s note, it appears automatically on `/errata`.
- Refresh the ledger after successful submission without implying that an unreviewed report is already public.

## Technical details
- Reuse the existing `inaccuracy_reports` workflow and public `public_errata` view; no new database table is needed.
- Extract or share validation so the topic-page report dialog and Errata form follow the same limits.
- Preserve the existing admin triage and publishing controls.
- Verify type checking, current build status, anonymous submission, and desktop/mobile rendering.
