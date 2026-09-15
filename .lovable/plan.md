# Reliable background podcast re-recording

## Goal
Make a re-recording run continue after the admin page is hidden, closed, or the device sleeps.

## Changes
- Move queue ownership from the admin browser to a protected backend worker.
- Store the current topic text with each queued episode so the worker no longer needs hidden browser pages.
- Process one episode at a time with atomic claiming, retries, stale-item recovery, and duplicate-generation protection.
- Automatically schedule the next small batch and periodically recover interrupted work.
- Keep the admin page as a live monitor with pause, resume, cancel, per-batch completion counts, and errors.
- Preserve every existing accent recording until its replacement is successfully uploaded.
- Reconcile the currently stuck run and resume its pending episodes through the new worker.

## Technical details
- Add queue payload and heartbeat fields plus database functions for safe item claiming and counter updates.
- Add a protected `process-podcast-rerecord` Edge Function using server credentials only.
- Reuse the current `generate-podcast` pipeline and per-topic/per-voice cache identity.
- Trigger work from job creation/resume, self-chain bounded batches, and add a scheduled recovery invocation.
- Validate pause/cancel behavior, retry limits, counters, function logs, and the active run end to end.
