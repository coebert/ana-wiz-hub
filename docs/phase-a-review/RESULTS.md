# Approved Phase A candidate — not activated

## Outcome

Only an isolated candidate was materialised at `/tmp/phase-a-candidate`, outside watched migration/function paths. Its inert reproducible patch, exact current-source hashes, approved portable test and test output are retained in this directory. **No pause policy was committed, no endpoint deployed, no frontend pause applied or website published. Containment is not active.**

The mandatory pre-activation semantic app typecheck and local Vite build/preview gate cannot be demonstrated in this environment: governing rules prohibit manual project builds/typechecks, and automatic validation supplies evidence only for the watched project, not this isolated candidate. Existing `build OK` entries cannot establish semantic/type/UI correctness of this candidate. No parser result was substituted for semantic typechecking. Consequently activation stopped before the policy rehearsal/maintenance sequence.

## Current-source reconciliation

All nine existing files and root AGENTS.md were read. Six supplied hashes matched. VoiceViva, process-podcast-rerecord and viva-voice-token hashes differed; a diff against the named baseline commit was empty for those paths, so the supplied hashes themselves differ from that commit's current contents. The actual files were inspected and the approved narrow hunks applied only in the candidate. Existing new-path conflicts: none. Final reread SHA-256 values remained identical to preflight; see source-guards.json.

Observed starting HEAD: `48c2f386cc93279ce87db9c57726740e9421a574`. Latest observed documentation save before this report: `5196a73e99d25510762a258df8f9834ecf2d298a`. No activation commit exists; subsequent automatic documentation saves may have different hashes.

## Gates

1. **Passed:** `node --test scripts/qa-ai-safety-pause.cjs` in isolated candidate: **16 passed, 0 failed, 0 skipped**. Auth denial preserved; authenticated Ask, all four viva modes and voice-token return typed no-store503/clinicalScore:null with zero mocked model/embedding/cache/provider calls. Typed transport error, legacy Ask gates, empty viva library and held-worker queue-only failure checks passed.
2. **Blocked:** isolated semantic `tsconfig.app.json` check, relevant function semantic checks, local production build/preview and pre-activation browser QA are not established. No paid endpoint or worker was invoked.
3. **Passed metadata preflight:** both tables RLS enabled, owned by postgres, existing permissive public SELECT policies have true quals. anon/authenticated have SELECT and neither is superuser/BYPASSRLS; service_role retains BYPASSRLS. Both proposed policy names absent. Initial information_schema grants query returned null; direct relacl and has_table_privilege confirmed grants.
4. **Not run:** actual-role transient CREATE POLICY / SET LOCAL ROLE / EXPLAIN / ROLLBACK rehearsal. Read-only metadata is explicitly **not** proof of post-policy anon/authenticated zero-row behaviour. The read tool accepts SELECT only; no migration activation was used as a rehearsal shortcut. This proof remains required before activation.
5. **Recorded and unchanged:** Ask21 rows, viva993 rows, held podcasts13. Non-content aggregate fingerprint of held IDs/flags/reason hashes/script hashes/audio paths: `691bca748600430fffe9a17b49929161`, identical on readback. No saved clinical text, credentials or tokens were captured. No history-table writes, jobs, model/TTS/embedding calls, audio/script/hold changes, index generation or credential changes.

## Exact candidate-only targets

- `supabase/functions/_shared/source-unavailable.ts`
- `supabase/functions/kb-chat/index.ts`
- `supabase/functions/viva/index.ts`
- `supabase/functions/viva-voice-token/index.ts`
- `supabase/functions/process-podcast-rerecord/index.ts`
- `src/lib/sourceUnavailable.ts`
- `src/pages/AskAi.tsx`
- `src/pages/VivaQuestionLibrary.tsx`
- `src/pages/VoiceViva.tsx`
- `src/components/viva/VivaSession.tsx`
- `src/components/viva/DemoVivaInteractive.tsx`
- `supabase/migrations/202611010001_contain_legacy_ai_library.sql`
- `scripts/qa-ai-safety-pause.cjs` (validation only)

Live project deliverables are only inert review documents plus roadmap status. Existing clinical/calculator/donation/other work was not overwritten. Phase B is not implemented.

## Activation and limits

There is no cross-system atomic transaction between policies, function versions and frontend publication. After missing gates pass, current targets must be reread/rebased and tests rerun before the approved maintenance sequence. Keep restrictive policies if a subsequent deploy fails; no automatic unsafe rollback. Confirm deployed versions before authenticated clinical endpoint tests. Real anon/authenticated library reads, live endpoint responses and realtime-event delivery remain unverified because activation did not occur. No claim that old downloaded browser-memory/history answers or already issued realtime sessions are remotely revoked.

Frontend publication remains separately coordinated; neither preview nor production currently contains this pause.