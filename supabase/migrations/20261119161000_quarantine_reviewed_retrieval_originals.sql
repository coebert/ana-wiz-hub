-- Retains all rows, historical embeddings, function owner and caller privileges.
DO $guard$
DECLARE
  fn regprocedure := 'public.match_kb_chunks(vector,integer)'::regprocedure;
  before_def text;
  current_hash text;
  old_acl aclitem[];
  old_owner oid;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('clinical-kb-retrieval-filter'));
  SELECT pg_get_functiondef(p.oid), p.proacl, p.proowner INTO STRICT before_def, old_acl, old_owner FROM pg_proc p WHERE p.oid=fn;
  current_hash := encode(sha256(convert_to(before_def,'UTF8')),'hex');
  IF old_owner <> 'postgres'::regrole OR EXISTS (SELECT 1 FROM aclexplode(coalesce(old_acl,acldefault('f',old_owner))) a WHERE a.privilege_type='EXECUTE' AND (a.grantee NOT IN (old_owner,'service_role'::regrole) OR (a.grantee='service_role'::regrole AND a.is_grantable))) OR has_function_privilege('anon',fn,'EXECUTE') OR has_function_privilege('authenticated',fn,'EXECUTE') OR NOT has_function_privilege('service_role',fn,'EXECUTE') THEN
    RAISE EXCEPTION 'Unexpected match_kb_chunks role privileges';
  END IF;
  IF current_hash = '2024f22bc2a4a4fd3b9d96f3fce9672188530d1b3bbfee3b30a4f4262c9b0a9a' THEN RETURN; END IF;
  IF current_hash <> '061d56984a49e7b598d8743987d9f5194fd7fd2cadae5ea439783eae2992e4b6' THEN RAISE EXCEPTION 'Retrieval function changed since audit; compare its deployed definition'; END IF;
  EXECUTE $next$
CREATE OR REPLACE FUNCTION public.match_kb_chunks(query_embedding vector, match_count integer DEFAULT 8)
 RETURNS TABLE(id uuid, topic_id text, topic_title text, route text, section text, exam_tags text[], chunk_kind text, content text, similarity double precision)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select
    c.id,
    c.topic_id,
    c.topic_title,
    c.route,
    c.section,
    c.exam_tags,
    c.chunk_kind,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from public.kb_chunks c
  where not exists (
    select 1
    from (values
      ('cb8c1403-5d48-4871-b710-06bd347d24e1'::uuid, '4226768d789ca921d8f36c650500a21664d2f268959ecce81f3ca31c25a6a4a8'),
      ('6b2562ae-135a-4c6f-9eea-90bd73cb97ce'::uuid, '76e0fddb922d542d540f537ba30bbbad7733af37025908779c654d1e163b2274'),
      ('a9a90fa3-8767-47bb-b994-77cfc68940a4'::uuid, 'ca24a1ead8810e67572b219d1e2c51e638582ae3da88ba197fd187d129bbf1a0'),
      ('cb1f9d7e-fe88-4768-ba8e-b4dfa0083022'::uuid, 'b84642436d14074f5a93d9ea9da337a6d601169b79ae191b9fe98e146d483486'),
      ('51baab00-20d4-4ea9-bd8a-17cf10336696'::uuid, '0b2998aff95e86dab8bff868ba2cd9e392dbf785146258477847bfe0d50a8782'),
      ('9ec8cb4b-00da-46f3-8225-c5f397fb28b5'::uuid, '074778e09c14b1d840c1e99e08c3fdf8bbdefa5cd58beaee628fd6b307c7b6dc'),
      ('da7307e8-3dee-488c-ae64-e359f459d716'::uuid, 'a3452c91e6ebb2133000e87d568422d3c21f19d65422ef11479e3b43ed5fd419'),
      ('e2186750-0656-478e-b4bc-f11c9eaa222d'::uuid, '21da4fcf41c81806a6d61fff4f78a89649b759eb1b08a6247a4af2cdda0a5ebb'),
      ('a9e7f01d-e009-4a83-9aa8-ffcc0aaa622a'::uuid, '8df4ff94f55b1eb66bfebe79b20685da3374ccd489f48e571626a1e6dcc13721'),
      ('97ca87f9-b0eb-4ae6-8ffe-e03ddbf443a3'::uuid, 'd17511928437ad95c758c9015549f5c69d58faeea6e8b0f0d15c59af137fdcd2'),
      ('0de6a640-98e2-4685-ac29-c3077beb4ed4'::uuid, 'ce12e820284612ce7aa4f76e2ca708114dc8daeaafdffb9365e3d2cb9604902c'),
      ('42ef1046-bdf3-4dc1-8b4a-32de588a52a1'::uuid, 'ca0b63cff0d65cb1bc2fc7d8dd72ca96be599766e6c21b586f754234e29d1465'),
      ('2ec5f1d2-3816-456b-876f-cce1df087082'::uuid, '7aad802126d99ff86c29dcfe157d177123d0de74b8478c749c15d6993cc28d79'),
      ('56d26f4f-c079-47d5-89c1-6f3e24e764ac'::uuid, 'f7aef9e4b0a615f4ba85f89f3ec50c970b56d1591245431b3714f303e1517d58'),
      ('aad67de5-5bed-4f23-aa90-da511a33b15f'::uuid, 'ac43a43ade6fb1cb60a477c89d26aa4b1c6aa93e399010b927dece49c76652b6'),
      ('0eb79127-f1cd-4539-9367-a1448ed2a0f1'::uuid, '85462ce769be7b55be63f0574b8087b5ca598706bbd3e542c6990a1599b7e3ed'),
      ('14e5f795-69b9-4783-a540-f6ead1fa5747'::uuid, 'f7dc8ad11787a39b330de47d722efe2db5f24e6254eeb00fc22a4fb0cc1f1f9d'),
      ('3447e83c-7f43-4975-bc63-62af8d123369'::uuid, '88c417f0bce1a486766dc19935a29d6906e00fff1090748dba12985613f090ea'),
      ('666f7b7e-5cdc-411f-9175-e1186e3b8b57'::uuid, 'ad8049d5c01d07be1b622229b758c0a768c21f79645fc9d918ab09eb182a0491'),
      ('2547572a-a034-433d-8092-b6f386280fcd'::uuid, '14420cfb51ef5c6adcee777b14a37d5f3396f219944f48e915343b8e939b4cae'),
      ('e5e88ec2-41a2-4b2d-857e-051e6a00d2b3'::uuid, '8009331ea8cf00f78386758dba7b9fb8c6b0c0e8b93e13c735a9f51290427c6a'),
      ('d1b563c6-959b-43b1-9ba1-7ff12d48f7c9'::uuid, '6f6dba925b4229cb07db58dcd9546459660609b246a5881e8e422cafe519c234'),
      ('5481bb05-53ae-47d3-8cfe-488e743fdd57'::uuid, 'bb22e2078a6dac3d7ab43bda6ce77f53aebbb0b7e872b40bd780e1dedaa38001'),
      ('68599ad4-ffb7-42e2-b209-00436dff0bc1'::uuid, 'b321b42ba74d6d5c7af06529b4aa1dbfb15ddf84ed33c99a9c02d042243a87d3'),
      ('977bf8a5-e244-4d2c-9c0b-ede6746a4247'::uuid, '444f813bb3dfd38232ce6f94e0d987b42a81101d28c2c208f6ca716826a86860'),
      ('209727d7-c52e-4dd9-b236-b0aa88f8a5ce'::uuid, 'da02dfc22f33ab4cbf8b3c15150a2ed81f9a77a085fd7a71c23d3d15de6f2298'),
      ('356c164b-4e29-4b1f-ad11-0dd0318c40e1'::uuid, 'fec4ec8683682b7c7f503fcccdfb2fc28314dac6b3a60b56c42c02c587768941'),
      ('48d491b9-7a10-4949-9971-907d78c3248c'::uuid, '3bc5a16837635825f76a6a22e7111b4a9a3164cb71678eaa3099fdc95e84cacf')
    ) as withheld(id, fingerprint)
    where withheld.id = c.id
      and withheld.fingerprint = c.content_hash
      and withheld.fingerprint = encode(sha256(convert_to(c.content, 'UTF8')), 'hex')
  )
  order by c.embedding <=> query_embedding
  limit match_count;
$function$
$next$;
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p WHERE p.oid=fn AND p.proowner=old_owner AND p.proacl IS NOT DISTINCT FROM old_acl AND NOT p.prosecdef
    AND encode(sha256(convert_to(pg_get_functiondef(p.oid),'UTF8')),'hex')='2024f22bc2a4a4fd3b9d96f3fce9672188530d1b3bbfee3b30a4f4262c9b0a9a'
  ) THEN RAISE EXCEPTION 'Retrieval definition, owner or grants changed unexpectedly'; END IF;
END
$guard$;
