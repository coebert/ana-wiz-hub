-- These five exact previously serving audio editions have verified safety errors.
-- The records, audio files, scripts, content hashes and all edit history are preserved.
DO $media_review$
DECLARE
  candidate record;
  original public.podcasts%ROWTYPE;
  message_text CONSTANT text := 'Clinical review in progress. Use the current written guidance.';
BEGIN
  FOR candidate IN
    SELECT * FROM (VALUES
      ('0a3fb43e-999a-4666-8422-d3d6d3a245f2', 'capnography', 'british-west-country', 'capnography--british-west-country.mp3', '61c35ecb7d8deb54eaf39dbc086e6f1d', '7678f81414e949ebb6e9ecd42ceece04', 'Original recording presents six breaths as sufficient to confirm tracheal position. PUMA requires consistent or increasing waveform amplitude over at least seven breaths alongside its other sustained-exhaled-CO2 criteria (PMID 35977431).'),
      ('1e4a5813-e97c-481c-bb04-e8d28b3327d2', 'trauma-emergency', 'alloy', 'trauma-emergency.mp3', 'eab211dbc2ceb4adf64da2b197d6ab0c', 'd41d8cd98f00b204e9800998ecf8427e', 'Original recording presents sugammadex as rescue in cannot-intubate-cannot-oxygenate and overlooks the need to proceed immediately to emergency front-of-neck airway. See DAS 2025 (PMID 41203471).'),
      ('93342e23-ee0d-402b-9680-fc6775d68a0b', 'capnography', 'alloy', 'capnography.mp3', 'cbc69b37a6bd0f30e0dc32f06112f99f', 'd41d8cd98f00b204e9800998ecf8427e', 'Original recording presents six breaths as sufficient to confirm tracheal position. PUMA requires consistent or increasing waveform amplitude over at least seven breaths alongside its other sustained-exhaled-CO2 criteria (PMID 35977431).'),
      ('ba9c06e6-88a8-49ff-9db2-576f82c56de0', 'arrhythmias-ecg-icu', 'alloy', 'arrhythmias-ecg-icu.mp3', '510536e530690e38d3d4e8406188caec', 'd41d8cd98f00b204e9800998ecf8427e', 'Original recording advises 10 mL of 10% calcium gluconate for adult hyperkalaemia with ECG toxicity. UK MHRA alert NatPSA/2023/007 specifies 30 mL of 10% calcium gluconate to provide the calcium in 10 mL of 10% calcium chloride.'),
      ('fad9134b-6894-41ed-aa27-094dc8f19b56', 'psychiatric-substance-disease', 'alloy', 'psychiatric-substance-disease.mp3', '46d9869e3a1b2e3bfadd67820d241e80', 'd41d8cd98f00b204e9800998ecf8427e', 'Original recording says to always give thiamine before glucose, which could delay emergency treatment for hypoglycaemia. JBDS 01 requires immediate treatment. Give indicated parenteral thiamine promptly.')
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
