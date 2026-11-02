# Private support inbox — 2 November 2026

## Implemented
- Admin dashboard direct **User enquiries / Support inbox** link and outstanding count; `/admin/support` and ticket deep links.
- Search by subject/contact, status filters, private detail/history, reply composer, saved/email-accepted/failed/unavailable states, resolve/reopen, and existing clinical inaccuracy report panel access.
- Existing feedback now accepts optional name/reply email and support enquiries, persists ticket plus initial message atomically before email, and retains retry request IDs.
- `/my-enquiries` shows only the signed-in account's tickets and private conversation replies. Server-validated account identity, not typed email, determines ownership.
- Service-only atomic RPC writes; owner/admin SELECT RLS; explicit anonymous access revocation and authenticated write revocation. Status changes are recorded in conversation history.
- Email uses existing Resend connection through its existing gateway. Both notifications and external replies require `SUPPORT_FROM_EMAIL` with an exact verified sender domain returned by the provider. `onboarding@resend.dev` is explicitly rejected. Admin notifications include ticket URL and user's reply address when supplied; admin replies use the existing admin email as reply-to. No mailbox is read or imported.

## Configuration and behaviour
Currently the deployed capability endpoint returns HTTP 200, `ready: false`, `A verified support sender is not configured.`
Configure a verified domain in the existing Resend service, grant the existing connection permission to read sender-domain verification, and add `SUPPORT_FROM_EMAIL` in Project Settings → Secrets (a plain verified sender address, not `onboarding@resend.dev`). Existing `RESEND_API_KEY` and `LOVABLE_API_KEY` are used server-side only. No replacement email service was enabled.
Until configured, enquiries and replies are still saved; signed-in users can see their replies privately. Manual email is available for valid supplied addresses; opening it never marks delivery as sent. Provider acceptance is not proof of inbox delivery. No blind retry/resend occurs for duplicate requests; uncertain bookkeeping remains saved rather than risking duplicate emails.
Old email-only submissions cannot automatically appear or acquire a reply address. Anonymous submissions are admin-only and cannot be claimed by email. Responses to ordinary email are not automatically imported into conversation history.

## Exact validation
- `bunx vitest run src/test/support-workflow.test.ts src/test/support-form.test.tsx src/test/support-buymeacoffee.test.tsx`: **3 files, 16 tests passed**. Includes ownership/admin/anonymous isolation, validated identity, field limits, sender verification, manual URL encoding, save-first outages, rejected reply, duplicate notification suppression, persistence failure, bookkeeping failure, rapid submits and retry ID preservation. Router future-flag warnings only.
- Live anonymous reads: both support tables HTTP **401**, no content disclosed. Anonymous action **401**; invalid session **401**; invalid public form **400**. Real authenticated admin capability **200**, unavailable sender accurately reported.
- Readback: RLS enabled on both tables; anonymous SELECT false; authenticated SELECT true/INSERT false; service-role INSERT true. Policies scope reads to owner or server-checked admin. Final counts **0 tickets / 0 messages**: tests created no real enquiries and sent no real email.
- Real own-account admin browser at localhost: private inbox accessible, actual empty state. Isolated browser transport mocks rehearsed saved/failed reply, history, manual email, resolve/reopen and signed-in My enquiries readback; 1280×1800 and 390×844, no horizontal overflow. Screenshots retained under `/tmp/browser/support/`.
- Automatic preview validation latest observed **build OK, 22:17:15 UTC**. No manual production build/typecheck run.
- Deployed only `send-feedback` and `support-inbox`; both additive support migrations applied. No whole-site publication, viva/clinical/audio/native/settings changes.

## Limits
Actual external delivery is deliberately untested and blocked by sender configuration. Owner-vs-other-account behavioural tests use isolated mocks/pure rules plus real policy readback; no non-admin real-account ticket write/read rehearsal or real persisted test ticket was performed. Anonymous abuse rate limits are durable per hashed actor/IP but depend on trusted hosting proxy headers; this is not bot identity verification. An uncertain response after a saved message retains the same retry ID; do not change the payload and retry unless intending a new message.

## Changed paths
- `src/App.tsx`, `src/pages/AdminDashboard.tsx`, `src/components/feedback/SupportSection.tsx`
- `src/components/admin/SupportInboxLink.tsx`, `src/pages/SupportInbox.tsx`, `src/lib/support.ts`
- `supabase/functions/send-feedback/index.ts`, `supabase/functions/support-inbox/index.ts`
- `supabase/functions/_shared/support/rules.ts`, `supabase/functions/_shared/support/service.ts`
- `drizzle/migrations/0013_support_enquiries_private_inbox.sql`, `drizzle/migrations/0014_support_explicit_private_grants.sql` and managed migration metadata/types
- `src/test/support-workflow.test.ts`, `src/test/support-form.test.tsx`, `src/test/support-buymeacoffee.test.tsx`
- `AGENTS.md`, `roadmap.md`, this validation record.
