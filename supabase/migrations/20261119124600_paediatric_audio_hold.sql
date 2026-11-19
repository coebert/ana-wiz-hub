-- This exact previously serving audio edition has a verified safety error.
-- The records, audio files, scripts, content hashes and all edit history are preserved.
DO $media_review$
DECLARE
  candidate record;
  original public.podcasts%ROWTYPE;
  message_text CONSTANT text := 'Clinical review in progress. Use the current written guidance.';
BEGIN
  FOR candidate IN
    SELECT * FROM (VALUES
      ('965e7cba-645f-40e1-b6c9-e780b6b2e693', 'paediatric-anaesthesia', 'alloy', 'paediatric-anaesthesia.mp3', '4d07bc1a574cbc15269adccd1c25bc89', 'd41d8cd98f00b204e9800998ecf8427e', 'Original recording gives an adult ICU sedation limit as a ceiling for paediatric general anaesthesia. These are different indications. See section 4.2 of UK propofol 1% SmPC 15152.')
    ) AS v(id, topic, voice, path, script_md5, content_md5, reason)
  LOOP
    SELECT * INTO STRICT original FROM public.podcasts WHERE id = candidate.id::uuid FOR UPDATE;
    IF original.topic_id IS DISTINCT FROM candidate.topic OR original.voice IS DISTINCT FROM candidate.voice
       OR original.audio_path IS DISTINCT FROM candidate.path OR md5(original.script) IS DISTINCT FROM candidate.script_md5
       OR md5(coalesce(original.content_hash, '')) IS DISTINCT FROM candidate.content_md5 OR original.regenerating IS DISTINCT FROM false THEN
      RAISE EXCEPTION 'Audio version changed during clinical review: %', candidate.id;
    END IF;
    IF original.status = 'failed' AND original.audit_hold IS TRUE AND original.audit_hold_reason = candidate.reason AND original.error_message = message_text THEN
      CONTINUE;
    END IF;
    IF original.status IS DISTINCT FROM 'ready' OR original.audit_hold IS DISTINCT FROM false OR original.audit_hold_reason IS NOT NULL OR original.error_message IS NOT NULL THEN
      RAISE EXCEPTION 'Audio publication state changed during clinical review: %', candidate.id;
    END IF;
    UPDATE public.podcasts SET status = 'failed', audit_hold = true, audit_hold_reason = candidate.reason, error_message = message_text WHERE id = original.id;
  END LOOP;
END;
$media_review$;
