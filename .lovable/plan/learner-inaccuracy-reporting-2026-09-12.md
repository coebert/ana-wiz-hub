# Learner inaccuracy reporting

## Goal
Provide a working correction form that learners can use from topic pages and `/errata`, with safe automatic publication after editorial approval.

## Implementation
- Consolidate the existing topic-page dialog and `/errata` form around one validated submission flow.
- Pre-fill topic details when reporting from a topic page and retain optional quoted text, suggested correction, source context, and contact email.
- Store every submission in the editorial review queue with a clear pending state; never expose contact details publicly.
- Keep `/errata` sourced from the public corrections ledger so approved reports appear automatically as soon as an editor publishes them.
- Ensure the admin review controls can inspect, approve/publish, add an editor note, or reject reports.
- Add clear success, validation, loading, empty, and failure states.

## Verification
- Submit a representative report from a topic page and from `/errata`.
- Confirm it remains private while pending, then appears on `/errata` after editorial publication.
- Check desktop and mobile layouts and confirm the preview builds cleanly.

## Technical details
- Use the existing `inaccuracy_reports` workflow and restricted `public_errata` ledger.
- Apply matching client validation and database-enforced limits.
- Preserve row-level access rules: public insert only, editor-only review, public read only for approved ledger fields.
