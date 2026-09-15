# Curated native regional podcast voices

## Goal
Replace the current 98 prompt-steered accent approximations with a smaller, trustworthy catalogue of genuinely distinct regional narrators. Preserve accent-specific podcast caching, background generation, playback, regeneration, and playlists.

## Approach

1. **Connect a regional voice provider**
   - Link ElevenLabs through the supported project connection so its credential remains server-side.
   - Require a paid ElevenLabs tier that permits commercial use.
   - Keep Lovable AI for podcast script writing; change only speech generation.

2. **Create an audition and approval workflow**
   - Add a protected narrator-management view that searches available British and Irish voices and plays short samples.
   - Show provider metadata, regional label, voice owner/licensing indicators, and any custom-rate or notice-period information returned by the provider.
   - Let an administrator approve a voice with a user-facing name, region, gender/style description, and stable internal ID.
   - Never clone or derive a voice from public recordings without documented speaker consent and commercial rights.

3. **Replace the prompt-based catalogue**
   - Drive the public narrator picker from the approved native-voice allowlist rather than the current duplicated 98-entry prompt bank.
   - Claim only the region supported by the selected voice and the administrator’s audition; do not invent hyper-local labels.
   - Start with a compact set such as neutral British, London/south-east, northern England, Scottish, Welsh, Irish, and any more specific regions that have genuinely suitable licensed voices.
   - Keep unavailable and unverified regions out of the picker.

4. **Adapt long-form podcast generation**
   - Add a provider-neutral narrator definition containing provider, provider voice ID, model, label, region, and status.
   - Generate audio server-side through ElevenLabs using its stable long-form model.
   - Split scripts at natural sentence or paragraph boundaries and use previous/next text context to keep pacing and prosody consistent between segments.
   - Preserve clinical pronunciation and add a small pronunciation dictionary for recurring drug and anaesthetic terms where needed.
   - Preserve the existing background-job, stale-job recovery, storage upload, and cached-audio flow.

5. **Preserve episode identity and existing recordings**
   - Continue identifying episodes by topic plus narrator, so multiple voices never collide in the library or playlists.
   - Give new native narrators new stable IDs, preventing old prompt-generated recordings from being mistaken for the improved voice.
   - Keep existing recordings playable as legacy episodes, but remove legacy prompt-only accents from new-generation choices.
   - Update labels throughout the library, playlist, global job indicator, and topic player.

6. **Handle failures and costs clearly**
   - Surface the provider’s actual error message and status for invalid voices, quota, billing, or generation failures.
   - Do not apply short artificial timeouts; allow explicit cancellation only where already supported.
   - Show a generation-cost warning based on script length before regeneration, while retaining one cached audio file per topic and narrator.

7. **Validate before rollout**
   - Test a representative medical passage for every approved voice, including drug names, abbreviations, doses, and numbers.
   - Confirm chunk transitions, duration, storage, cache-busting, navigation-away generation, playlist ordering, and per-accent identity.
   - Verify desktop and mobile narrator selection and run focused type, build, and podcast-flow checks.

## Technical notes
- Current state confirmed: the app duplicates a 98-entry prompt-steered voice table between the client and podcast function, uses OpenAI TTS instructions to approximate accents, and caches recordings by `(topic_id, voice)`.
- ElevenLabs supports server-side voice-library discovery, voice IDs, long-form TTS, request stitching, and pronunciation dictionaries.
- Authenticity cannot be established automatically from a catalogue label. Each public narrator must be auditioned and approved before release.
- Native coverage will be narrower than 98 labels. Additional regions should be added only when a suitable licensed voice is found or a consenting regional voice actor is commissioned for professional cloning.

## External requirement
After approval, the ElevenLabs connection must be created or linked. The owner will then audition and approve the initial regional voices before they appear publicly.
