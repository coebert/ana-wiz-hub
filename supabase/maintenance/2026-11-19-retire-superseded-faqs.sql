-- Run only after the revised source, its refreshed corpus, and the indexer are deployed.
-- A missing replacement, a changed original or a missing vector causes all six retirements to roll back.
-- Idempotent on an already-retired set with verified replacement rows.
BEGIN;
CREATE TEMP TABLE expected_faq_swap (
  old_id uuid PRIMARY KEY, route text, old_hash text, new_hash text UNIQUE
) ON COMMIT DROP;
INSERT INTO expected_faq_swap VALUES
('cb8c1403-5d48-4871-b710-06bd347d24e1', '/pharmacology/rocuronium', '4226768d789ca921d8f36c650500a21664d2f268959ecce81f3ca31c25a6a4a8', 'dcb7a0b84396244c16955656d92ca54bc3c6ed3275caf6fbb37887127d42e5d2'),
('6b2562ae-135a-4c6f-9eea-90bd73cb97ce', '/physics/capnography', '76e0fddb922d542d540f537ba30bbbad7733af37025908779c654d1e163b2274', '8b15b16f1b26aa70eb21ee9b678ce2db2dc7c0418c06c9b46c09fee158d25138'),
('a9a90fa3-8767-47bb-b994-77cfc68940a4', '/physics/capnography', 'ca24a1ead8810e67572b219d1e2c51e638582ae3da88ba197fd187d129bbf1a0', 'eea811f660266b44ceecc1734b2025160d1becdb5896261dae181b33a01e11eb'),
('cb1f9d7e-fe88-4768-ba8e-b4dfa0083022', '/physics/clinical-measurement', 'b84642436d14074f5a93d9ea9da337a6d601169b79ae191b9fe98e146d483486', '771d5c0bcb5ebbb482d38a37367b7ff5eeb9ce655beaf2bdd6c8847158904e53'),
('51baab00-20d4-4ea9-bd8a-17cf10336696', '/physics/temperature-measurement', '0b2998aff95e86dab8bff868ba2cd9e392dbf785146258477847bfe0d50a8782', '0655a14682559b3dc5ae9284f5598a9e8b86f850c5bd1a990564692dc7492a1c'),
('9ec8cb4b-00da-46f3-8225-c5f397fb28b5', '/physics/temperature-measurement', '074778e09c14b1d840c1e99e08c3fdf8bbdefa5cd58beaee628fd6b307c7b6dc', 'acad938a6e058e5f54999cf9f8c2ac469947d75a91c4acbd626d1e11e9ab4d7c');
DO $check$
DECLARE
  replacement_count integer;
BEGIN
  -- Lock replacements through this transaction, so a concurrently withdrawn new entry cannot leave a gap.
  PERFORM n.id FROM public.kb_chunks n JOIN expected_faq_swap s
    ON n.content_hash = s.new_hash AND n.route = s.route AND n.chunk_kind = 'faq'
    WHERE n.embedding IS NOT NULL
    ORDER BY n.id FOR SHARE OF n;
  SELECT count(DISTINCT s.old_id) INTO replacement_count
    FROM expected_faq_swap s JOIN public.kb_chunks n
    ON n.content_hash = s.new_hash AND n.route = s.route AND n.chunk_kind = 'faq'
    WHERE n.embedding IS NOT NULL AND encode(sha256(convert_to(n.content,'UTF8')), 'hex') = s.new_hash;
  IF replacement_count <> 6 THEN
    RAISE EXCEPTION 'Six exact replacement FAQs with fresh embeddings are required. Found %.', replacement_count;
  END IF;
  PERFORM o.id FROM public.kb_chunks o JOIN expected_faq_swap s ON o.id=s.old_id ORDER BY o.id FOR UPDATE OF o;
  IF EXISTS (SELECT 1 FROM public.kb_chunks o JOIN expected_faq_swap s ON o.id=s.old_id
    WHERE o.content_hash IS DISTINCT FROM s.old_hash OR o.route IS DISTINCT FROM s.route
      OR o.chunk_kind IS DISTINCT FROM 'faq' OR encode(sha256(convert_to(o.content,'UTF8')), 'hex') IS DISTINCT FROM s.old_hash) THEN
    RAISE EXCEPTION 'Original FAQ changed since audit. Re-read before retiring.';
  END IF;
END $check$;
DELETE FROM public.kb_chunks o USING expected_faq_swap s
WHERE o.id=s.old_id AND o.content_hash=s.old_hash AND o.route=s.route AND o.chunk_kind='faq';
COMMIT;
