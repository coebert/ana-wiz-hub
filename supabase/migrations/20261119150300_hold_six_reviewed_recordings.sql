-- Clinically reviewed 19 November 2026. Preserve the original audio and script records.
BEGIN;
SET LOCAL lock_timeout = '5s';
CREATE TEMP TABLE audit_20261119_hold_six ON COMMIT DROP AS
SELECT * FROM (
VALUES
    ('17683bb4-6f8c-44bc-baf0-f3d8b5409c88'::uuid, 'depth-of-anaesthesia', 'british-west-country', '631a05cd73255fd4efe768f4202b048d', '2810e71bebf8cded3f93297d11963a9bc98def8f017c0f22b85921c81e91c05f', 'depth-of-anaesthesia--british-west-country.mp3', 'b9f37f7581ad1763acf830c92153795b0a08ab11a451149873d6665551a3e135', 'ee2be28b-98e5-4eb2-8e76-2025e25f8090'::uuid, '528d686d-4048-472d-9033-277cde73e659', '"0e89eac5c6f4f4ebe81839e8192d76b3"', '8510241', 'The stored transcript attributes NAP5’s one-in-eight-thousand estimate to TIVA. NAP5 observed about one spontaneous report per 8,200 general anaesthetics with neuromuscular blockade. A processed EEG value alone cannot determine awareness or dictate a dose change.'),
    ('2c5cb1a7-d5b9-42bf-92fc-7449b75c6c12'::uuid, 'vasoactive-agents', 'alloy', '1b602efce128a35401092e65d352c27d', 'a4badcf57c0455476fe4ba18ac89c816b874c4e4218ef6c5abb2100aab283fcd', 'vasoactive-agents.mp3', NULL::text, 'ecece1ca-d2b9-4543-9cf3-c88d4f12b939'::uuid, 'd2799efa-8071-4091-a4d8-a7a3e680ae43', '"593b5bd356d4afa669d5d9d075f00a2a-2"', '6544128', 'The stored transcript confuses calcium concentration with calcium per mole. For the 10% solutions, 10 mL calcium chloride and 30 mL calcium gluconate provide about 6.8 mmol calcium each. Calcium in cardiac arrest has specific indications.'),
    ('36399b1a-df09-4378-985a-b8c7236d9036'::uuid, 'depth-of-anaesthesia', 'alloy', '982baa0af211e0764da6d4f8af179598', '55b533741eac842605006d870e0ad41e6605c7366a14c4e1f2b31d67b0bbab7f', 'depth-of-anaesthesia.mp3', NULL::text, '866a2f1b-3920-4d3a-a214-5a5994a8db1d'::uuid, 'f3f8e4bf-9dba-4394-94b7-c2e2e6f7788a', '"8df5f85d5dcabfe1bdecff58e7454825-2"', '6165888', 'The stored transcript attributes NAP5’s one-in-eight-thousand estimate to TIVA. NAP5 observed about one spontaneous report per 8,200 general anaesthetics with neuromuscular blockade. A processed EEG value alone cannot determine awareness or dictate a dose change.'),
    ('9614e300-6b0d-4fc0-b746-5cbe71afe825'::uuid, 'haematology-immunity', 'british-yorkshire', 'd3bb6474ba83ef3197ecd62300797555', '89564d4a5d6e96dae4e6c5f0cabe4f77b9da6bdd19ca0bc53f9218086de783da', 'haematology-immunity--british-yorkshire.mp3', NULL::text, '603565fe-167a-4d0b-bd3c-33906b13e8ec'::uuid, 'b1c9ab3a-2b30-490c-9d06-a4090792eea6', '"03b99e831c967196c4c49ed5828701df"', '9536611', 'The stored transcript misstates the NAP6 culprit ranking and presents a universal obstetric transfusion ratio. Of 199 identified agents, antibiotics accounted for 47%, neuromuscular blockers 33% and chlorhexidine 9%. Use the local major obstetric haemorrhage protocol.'),
    ('c171ebb5-7881-4b15-b9a3-6b0d2ce6a438'::uuid, 'haematology-immunity', 'british-oxford', 'd3bb6474ba83ef3197ecd62300797555', '89564d4a5d6e96dae4e6c5f0cabe4f77b9da6bdd19ca0bc53f9218086de783da', 'haematology-immunity--british-oxford.mp3', NULL::text, 'f4e95771-c672-47b2-8573-56606aa8a7db'::uuid, '1eb9c083-e571-4a15-96c6-3046c2605884', '"4e4dfa789e39c3cbbeb94641fc28ba67"', '10119071', 'The stored transcript misstates the NAP6 culprit ranking and presents a universal obstetric transfusion ratio. Of 199 identified agents, antibiotics accounted for 47%, neuromuscular blockers 33% and chlorhexidine 9%. Use the local major obstetric haemorrhage protocol.'),
    ('dc4365d0-4e46-4079-92ad-390ebc8a4895'::uuid, 'haematology-immunity', 'alloy', 'd3bb6474ba83ef3197ecd62300797555', '89564d4a5d6e96dae4e6c5f0cabe4f77b9da6bdd19ca0bc53f9218086de783da', 'haematology-immunity.mp3', NULL::text, '640896ad-0fa2-4ede-a22a-a41d04f5243a'::uuid, '0d321e8c-3f45-4543-b88e-cfb7c17a2406', '"9236d84ca516a8d2b69ddfac6f885061-2"', '8315904', 'The stored transcript misstates the NAP6 culprit ranking and presents a universal obstetric transfusion ratio. Of 199 identified agents, antibiotics accounted for 47%, neuromuscular blockers 33% and chlorhexidine 9%. Use the local major obstetric haemorrhage protocol.')
) AS e(id, topic_id, voice, script_md5, script_sha256, audio_path, content_hash, object_id, object_version, object_etag, object_size, reason);

-- Lock in reproducible order. No new media or storage object is created or modified.
-- Row-level locks prevent concurrent edits of the six existing metadata records until transaction end.
SELECT p.id FROM public.podcasts p
JOIN audit_20261119_hold_six e ON e.id = p.id
ORDER BY p.id FOR UPDATE OF p;
SELECT o.id FROM storage.objects o
JOIN audit_20261119_hold_six e ON e.object_id = o.id
ORDER BY o.id FOR SHARE OF o;

CREATE TEMP VIEW audit_20261119_guard AS
WITH expected AS (SELECT * FROM audit_20261119_hold_six)
SELECT e.id, e.topic_id, e.voice, p.status, p.audit_hold, p.audit_hold_reason,
       (p.id IS NOT NULL AND p.topic_id = e.topic_id AND p.voice = e.voice
        AND md5(p.script) = e.script_md5
        AND encode(sha256(convert_to(p.script, 'UTF8')), 'hex') = e.script_sha256
        AND p.audio_path = e.audio_path
        AND p.content_hash IS NOT DISTINCT FROM e.content_hash
        AND p.regenerating IS FALSE AND p.error_message IS NULL
        AND o.id = e.object_id AND o.version::text = e.object_version
        AND o.metadata->>'eTag' = e.object_etag
        AND o.metadata->>'size' = e.object_size) IS TRUE AS original_matches,
       (p.status = 'ready' AND p.audit_hold IS FALSE AND p.audit_hold_reason IS NULL) IS TRUE AS original_ready,
       (p.status = 'failed' AND p.audit_hold IS TRUE AND p.audit_hold_reason = e.reason) IS TRUE AS exact_hold
FROM expected e
LEFT JOIN public.podcasts p ON p.id = e.id
LEFT JOIN storage.objects o ON o.bucket_id = 'podcasts' AND o.name = e.audio_path;

-- Take a transaction-local before image so all other row values can be compared exactly.
-- The updated_at timestamp is maintained by the existing production touch trigger.
CREATE TEMP TABLE audit_20261119_before ON COMMIT DROP AS
SELECT p.id, to_jsonb(p) - ARRAY['status','audit_hold','audit_hold_reason','updated_at'] AS preserved
FROM public.podcasts p JOIN audit_20261119_hold_six e ON p.id = e.id;

DO $apply_six$
DECLARE
    expected_count integer;
    ready_count integer;
    updated_count integer;
BEGIN
    SELECT count(*), count(*) FILTER (WHERE original_ready)
      INTO expected_count, ready_count
      FROM audit_20261119_guard
     WHERE original_matches AND (original_ready OR exact_hold);
    IF expected_count <> 6 THEN
        RAISE EXCEPTION 'No changes: six exact original fingerprints and eligible states were required';
    END IF;

    -- Reapplying the identical batch leaves exact existing holds alone.
    UPDATE public.podcasts p
       SET status = 'failed', audit_hold = true, audit_hold_reason = e.reason
      FROM audit_20261119_hold_six e
     WHERE p.id = e.id AND p.audit_hold IS FALSE AND p.status = 'ready'
       AND p.audit_hold_reason IS NULL;
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    IF updated_count <> ready_count THEN
        RAISE EXCEPTION 'No changes: an unexpected number of ready originals was updated';
    END IF;
    IF (SELECT count(*) FROM audit_20261119_guard WHERE original_matches AND exact_hold) <> 6 THEN
        RAISE EXCEPTION 'No changes: post-hold fingerprint or exact held state failed';
    END IF;
    IF (SELECT count(*)
          FROM public.podcasts p JOIN audit_20261119_before b ON p.id = b.id
         WHERE (to_jsonb(p) - ARRAY['status','audit_hold','audit_hold_reason','updated_at']) = b.preserved) <> 6 THEN
        RAISE EXCEPTION 'No changes: a preserved original row field changed';
    END IF;
END;
$apply_six$;

SELECT id, topic_id, voice, original_matches, exact_hold
  FROM audit_20261119_guard
 ORDER BY topic_id, voice;
DROP VIEW audit_20261119_guard;

COMMIT;
