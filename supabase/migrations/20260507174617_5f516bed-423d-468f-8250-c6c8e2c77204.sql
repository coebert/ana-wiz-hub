-- 1. Lock down podcasts bucket writes. Service role (used by the
-- generate-podcast edge function) bypasses RLS, so it can still write.
-- Only admins can mutate via the storage API directly.
CREATE POLICY "Admins can upload podcast audio"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'podcasts' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update podcast audio"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'podcasts' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'podcasts' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete podcast audio"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'podcasts' AND public.has_role(auth.uid(), 'admin'));

-- 2. Constrain the anonymous visit-insert policy so it isn't an
-- unconditional `true`. visitor_id is required and bounded.
DROP POLICY IF EXISTS "Anyone can insert visits" ON public.app_visits;

CREATE POLICY "Anyone can insert visits"
ON public.app_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (
  visitor_id IS NOT NULL
  AND length(visitor_id) BETWEEN 1 AND 128
  AND (page_path IS NULL OR length(page_path) <= 512)
);