ALTER TABLE public.app_visits
  ADD CONSTRAINT app_visits_visitor_id_len CHECK (char_length(visitor_id) BETWEEN 1 AND 64),
  ADD CONSTRAINT app_visits_page_path_len CHECK (page_path IS NULL OR char_length(page_path) <= 256),
  ADD CONSTRAINT app_visits_page_path_format CHECK (page_path IS NULL OR page_path ~ '^/[A-Za-z0-9/_\-]*$');