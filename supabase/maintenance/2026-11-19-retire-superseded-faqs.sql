-- Run only after the revised source, its refreshed corpus, and the indexer are deployed.
-- A missing replacement, a changed original or a missing vector causes all 28 retirements to roll back.
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
('9ec8cb4b-00da-46f3-8225-c5f397fb28b5', '/physics/temperature-measurement', '074778e09c14b1d840c1e99e08c3fdf8bbdefa5cd58beaee628fd6b307c7b6dc', 'acad938a6e058e5f54999cf9f8c2ac469947d75a91c4acbd626d1e11e9ab4d7c'),
('da7307e8-3dee-488c-ae64-e359f459d716', '/pharmacology/volatile-agents', 'a3452c91e6ebb2133000e87d568422d3c21f19d65422ef11479e3b43ed5fd419', 'f19ef124423c60c794114dd5b023f60955ec42895fd67e88a0fea5b09e98db8b'),
('e2186750-0656-478e-b4bc-f11c9eaa222d', '/pharmacology/local-anaesthetics', '21da4fcf41c81806a6d61fff4f78a89649b759eb1b08a6247a4af2cdda0a5ebb', '0a356dfd55ebd360175aa0e6f0b6e3466672d72e4c01bc4c13a6b3712d3d67ae'),
('a9e7f01d-e009-4a83-9aa8-ffcc0aaa622a', '/pharmacology/local-anaesthetics', '8df4ff94f55b1eb66bfebe79b20685da3374ccd489f48e571626a1e6dcc13721', '375466c44af29487217bb984ba3a398ebde68c868b5fd3e343ee20b1a0908c56'),
('97ca87f9-b0eb-4ae6-8ffe-e03ddbf443a3', '/clinical/airway-management', 'd17511928437ad95c758c9015549f5c69d58faeea6e8b0f0d15c59af137fdcd2', '57fd0d445c0113ddf60d4337e2a7d0362b48bc8f0f098c013b0c2b666831fd8a'),
('0de6a640-98e2-4685-ac29-c3077beb4ed4', '/clinical/airway-management', 'ce12e820284612ce7aa4f76e2ca708114dc8daeaafdffb9365e3d2cb9604902c', 'fdd7b34c4e02f5000420203c4eec341774bee8affef971e0c43d7cf6a855a54b'),
('42ef1046-bdf3-4dc1-8b4a-32de588a52a1', '/clinical/airway-management', 'ca0b63cff0d65cb1bc2fc7d8dd72ca96be599766e6c21b586f754234e29d1465', '52c44ccfae1f284c60437ddbdff4278505abef144c5e4e3361ec9641123dcac9'),
('2ec5f1d2-3816-456b-876f-cce1df087082', '/clinical/airway-management', '7aad802126d99ff86c29dcfe157d177123d0de74b8478c749c15d6993cc28d79', '376e2d1f921fa76f1a412196437615ddcf24326bb3cf9b1be3ff90762105a3bf'),
('56d26f4f-c079-47d5-89c1-6f3e24e764ac', '/clinical/regional-anaesthesia', 'f7aef9e4b0a615f4ba85f89f3ec50c970b56d1591245431b3714f303e1517d58', '1042fc00a9b1415bf4536e8be53d955fe31808b67b6513759a39dd66cd65e822'),
('aad67de5-5bed-4f23-aa90-da511a33b15f', '/clinical/paediatric-anaesthesia', 'ac43a43ade6fb1cb60a477c89d26aa4b1c6aa93e399010b927dece49c76652b6', 'deb1fe724aa6ee103cb15c11f9c11b12eec502e88385370b5ed5ea2221ec6a69'),
('0eb79127-f1cd-4539-9367-a1448ed2a0f1', '/clinical/paediatric-anaesthesia', '85462ce769be7b55be63f0574b8087b5ca598706bbd3e542c6990a1599b7e3ed', '7302767313406ee001c5c79d9d3c1c04820fbc1312d95c0543e4c25205fd6293'),
('14e5f795-69b9-4783-a540-f6ead1fa5747', '/clinical/bariatric-anaesthesia', 'f7dc8ad11787a39b330de47d722efe2db5f24e6254eeb00fc22a4fb0cc1f1f9d', '523c0e33d3ee090ec10c46e68a4d063a4910f5a69a353e4d6e4d3dbcc5eb33fc'),
('3447e83c-7f43-4975-bc63-62af8d123369', '/clinical/trauma-emergency', '88c417f0bce1a486766dc19935a29d6906e00fff1090748dba12985613f090ea', 'a6cbfe4d0ed2f7400fd44d83b69dde5cd6700c11caedf71293e5e2b55db8ad5d'),
('666f7b7e-5cdc-411f-9175-e1186e3b8b57', '/clinical/trauma-emergency', 'ad8049d5c01d07be1b622229b758c0a768c21f79645fc9d918ab09eb182a0491', 'dc85a083d1efc74cd5aa21ca7293163a51577fad29ea83985bd32e64882a67be'),
('2547572a-a034-433d-8092-b6f386280fcd', '/clinical/trauma-emergency', '14420cfb51ef5c6adcee777b14a37d5f3396f219944f48e915343b8e939b4cae', '0cc969ffb8d984d8c354a1ffd2d69eaa51c77ba80f3687d29a39a48cc3fa0a84'),
('e5e88ec2-41a2-4b2d-857e-051e6a00d2b3', '/clinical/trauma-emergency', '8009331ea8cf00f78386758dba7b9fb8c6b0c0e8b93e13c735a9f51290427c6a', '4e6ee36680e834d755f21091cb83b3ff763f7f27abc6801aaeff18e011eeaf38'),
('d1b563c6-959b-43b1-9ba1-7ff12d48f7c9', '/clinical/trauma-emergency', '6f6dba925b4229cb07db58dcd9546459660609b246a5881e8e422cafe519c234', '89dcb5bd4f9aeabe24e11e525905ce2f59abd0baa9d50f1a2593211ca4eec72a'),
('5481bb05-53ae-47d3-8cfe-488e743fdd57', '/clinical/trauma-emergency', 'bb22e2078a6dac3d7ab43bda6ce77f53aebbb0b7e872b40bd780e1dedaa38001', '389509c3f3fc1173a6955d62530c124fc566b54691f25bf157372c491a786e3e'),
('68599ad4-ffb7-42e2-b209-00436dff0bc1', '/clinical/trauma-emergency', 'b321b42ba74d6d5c7af06529b4aa1dbfb15ddf84ed33c99a9c02d042243a87d3', '950f302b4e7952a4fd135e9c5cf7f9c1a8d198c86dab0c396b6822f1e5a72116'),
('977bf8a5-e244-4d2c-9c0b-ede6746a4247', '/intensive-care/toxicology', '444f813bb3dfd38232ce6f94e0d987b42a81101d28c2c208f6ca716826a86860', '0062402306cd1da67799ef55ec179092b6d6f1b937dcd1741291284a2991da2c'),
('209727d7-c52e-4dd9-b236-b0aa88f8a5ce', '/intensive-care/transfusion-coagulation', 'da02dfc22f33ab4cbf8b3c15150a2ed81f9a77a085fd7a71c23d3d15de6f2298', 'e5f4d90bd5838005b7d7beed57a8ca1f90564fe7bf5c0acade326bee5fe696fb'),
('356c164b-4e29-4b1f-ad11-0dd0318c40e1', '/intensive-care/transfusion-coagulation', 'fec4ec8683682b7c7f503fcccdfb2fc28314dac6b3a60b56c42c02c587768941', '57790987eef12135121e5300b494ec253152da6072bd0b681ccdb37cd013686e'),
('48d491b9-7a10-4949-9971-907d78c3248c', '/perioperative/genetic-syndromes', '3bc5a16837635825f76a6a22e7111b4a9a3164cb71678eaa3099fdc95e84cacf', 'd448bf66ac3fa5b179f6546aa7398fd3a1202c49a7db8216c86e3701f6f4fc46');
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
  IF replacement_count <> 28 THEN
    RAISE EXCEPTION '28 exact replacement FAQs with fresh embeddings are required. Found %.', replacement_count;
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
