CREATE TABLE public.note_jump_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_slug text NOT NULL,
  target_path text NOT NULL,
  target_section text NOT NULL,
  target_label text,
  visitor_id text,
  clicked_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX note_jump_clicks_target_path_idx ON public.note_jump_clicks (target_path);
CREATE INDEX note_jump_clicks_clicked_at_idx ON public.note_jump_clicks (clicked_at DESC);

GRANT INSERT ON public.note_jump_clicks TO anon, authenticated;
GRANT SELECT ON public.note_jump_clicks TO authenticated;
GRANT ALL ON public.note_jump_clicks TO service_role;

ALTER TABLE public.note_jump_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert jump clicks"
  ON public.note_jump_clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read jump clicks"
  ON public.note_jump_clicks FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));