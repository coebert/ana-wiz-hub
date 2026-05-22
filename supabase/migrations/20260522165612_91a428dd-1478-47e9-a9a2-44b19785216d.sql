ALTER TABLE public.reviews
  ADD COLUMN deleted_reason text,
  ADD COLUMN deleted_at timestamptz;

DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;

CREATE POLICY "Anyone can view approved or deleted reviews"
ON public.reviews FOR SELECT
USING (status IN ('approved', 'deleted'));