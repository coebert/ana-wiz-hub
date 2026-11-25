# Re-record held podcast episodes with review

## Scope found
- 39 held recordings across 27 topics (more than the 13 counted earlier; holds were added since).
- Each one has a recorded reason (wrong calcium dose, sugammadex taught for "can't intubate, can't oxygenate", out-of-date local anaesthetic toxicity guidance, NAP5/NAP6 figures, and others).
- The database already refuses to release a hold unless the script and audio are both replaced together. Originals stay saved.

## What you'll get
A new admin page, "Held episodes", listing each held topic with its hold reason and voices.

For each topic:
1. **Draft script**: written from the current, corrected topic page, with the hold reason given as a must-fix instruction. One script per topic, shared by all its voices.
2. **Review**: you see the hold reason next to the draft script. Phrases linked to the error are highlighted (e.g. "10 mL", "sugammadex", "2010"). You can edit the script, then approve or reject it. Nothing is recorded until you approve.
3. **Record**: after approval, new audio is made for each held voice and saved as a new file. The original audio is not overwritten.
4. **Release**: the episode becomes playable in the library and on its topic page only when the new script and new audio are ready together.

You review each script yourself. I will not mark anything as clinically checked.

## Cost and limits
- About 27 script drafts and 39 recordings, using AI credits. You start each topic yourself, and nothing runs in bulk unless you press "Draft all".
- Episodes stay hidden until you approve them, so the library fills in gradually.

## Technical details
- Migration: `podcast_review_drafts` (topic_id, draft_script, status draft/approved/rejected, hold_reason snapshot, reviewed_by/at), plus admin-only RLS and grants. The existing `protect_held_podcast_content` trigger is unchanged.
- `generate-podcast`: add an admin-checked `mode: "review_draft"` (script only, stored in drafts) and `mode: "record_approved"` (TTS from the approved draft to a new versioned path, then one update setting the new script/audio_path/status ready/audit_hold=false). The normal path still refuses held rows (409).
- Admin page `/admin/podcast-holds`, plus a link from the admin dashboard.
- Tests: release is blocked without approval; a new audio path is required; the original path is kept.
- Redeploy only `generate-podcast`. The website goes live when you next publish.
