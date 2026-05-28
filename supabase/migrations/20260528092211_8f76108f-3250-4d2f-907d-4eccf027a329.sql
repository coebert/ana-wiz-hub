CREATE TABLE public.inaccuracy_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  topic_url text,
  quoted_text text,
  message text NOT NULL,
  suggested_correction text,
  contact_email text,
  status text NOT NULL DEFAULT 'new',
  public_note text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT inaccuracy_reports_status_check
    CHECK (status IN ('new','acknowledged','published','dismissed')),
  CONSTRAINT inaccuracy_reports_message_len
    CHECK (length(message) BETWEEN 5 AND 4000),
  CONSTRAINT inaccuracy_reports_quoted_len
    CHECK (quoted_text IS NULL OR length(quoted_text) <= 1000),
  CONSTRAINT inaccuracy_reports_correction_len
    CHECK (suggested_correction IS NULL OR length(suggested_correction) <= 4000),
  CONSTRAINT inaccuracy_reports_email_len
    CHECK (contact_email IS NULL OR length(contact_email) <= 320),
  CONSTRAINT inaccuracy_reports_topic_id_len
    CHECK (length(topic_id) BETWEEN 1 AND 128),
  CONSTRAINT inaccuracy_reports_topic_title_len
    CHECK (length(topic_title) BETWEEN 1 AND 256),
  CONSTRAINT inaccuracy_reports_topic_url_len
    CHECK (topic_url IS NULL OR length(topic_url) <= 1024),
  CONSTRAINT inaccuracy_reports_public_note_len
    CHECK (public_note IS NULL OR length(public_note) <= 2000),
  CONSTRAINT inaccuracy_reports_user_agent_len
    CHECK (user_agent IS NULL OR length(user_agent) <= 512)
);

CREATE INDEX inaccuracy_reports_topic_id_idx
  ON public.inaccuracy_reports (topic_id);
CREATE INDEX inaccuracy_reports_status_idx
  ON public.inaccuracy_reports (status, created_at DESC);
CREATE INDEX inaccuracy_reports_published_idx
  ON public.inaccuracy_reports (reviewed_at DESC)
  WHERE status = 'published';

GRANT SELECT, INSERT ON public.inaccuracy_reports TO anon;
GRANT SELECT, INSERT ON public.inaccuracy_reports TO authenticated;
GRANT ALL    ON public.inaccuracy_reports TO service_role;

ALTER TABLE public.inaccuracy_reports ENABLE ROW LEVEL SECURITY;

-- Anyone may submit a report. Submitter-controlled fields are length-checked
-- by the CHECK constraints above; status / review fields must stay at their
-- defaults on insert so a malicious payload can't self-publish.
CREATE POLICY "Anyone can submit an inaccuracy report"
  ON public.inaccuracy_reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND public_note IS NULL
    AND reviewed_by IS NULL
    AND reviewed_at IS NULL
  );

-- The /errata page is fully public; expose only reports an editor has
-- explicitly marked as `published` along with the editor's `public_note`.
CREATE POLICY "Anyone can view published errata"
  ON public.inaccuracy_reports
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admins see, update and delete every report for triage.
CREATE POLICY "Admins can view all reports"
  ON public.inaccuracy_reports
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reports"
  ON public.inaccuracy_reports
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete reports"
  ON public.inaccuracy_reports
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Keep updated_at in sync; reuse the existing trigger pattern.
CREATE OR REPLACE FUNCTION public.update_inaccuracy_reports_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER inaccuracy_reports_set_updated_at
BEFORE UPDATE ON public.inaccuracy_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_inaccuracy_reports_updated_at();