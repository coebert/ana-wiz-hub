CREATE TABLE public.support_tickets (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 request_id uuid NOT NULL UNIQUE,
 owner_id uuid,
 contact_name text NOT NULL DEFAULT '' CHECK (length(contact_name) <= 100),
 reply_email text CHECK (length(reply_email) <= 254),
 category text NOT NULL CHECK (category IN ('support','topic','error')),
 subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 120),
 status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','awaiting_user','resolved')),
 submitter_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Private support ticket reads" ON public.support_tickets FOR SELECT TO authenticated USING (owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE TABLE public.support_messages (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 ticket_id uuid NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
 request_id uuid NOT NULL UNIQUE,
 author_id uuid,
 author_kind text NOT NULL CHECK (author_kind IN ('user','admin','status')),
 body text NOT NULL CHECK (length(body) BETWEEN 1 AND 5000),
 delivery_status text NOT NULL DEFAULT 'saved' CHECK (delivery_status IN ('saved','sending','sent','failed','unavailable')),
 delivery_error text,
 provider_id text,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.support_messages TO authenticated;
GRANT ALL ON public.support_messages TO service_role;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Private support conversation reads" ON public.support_messages FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.support_tickets t WHERE t.id = ticket_id AND (t.owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))));
CREATE INDEX support_tickets_status_updated ON public.support_tickets(status, updated_at DESC);
CREATE INDEX support_tickets_owner ON public.support_tickets(owner_id, updated_at DESC);
CREATE INDEX support_messages_ticket ON public.support_messages(ticket_id, created_at);
CREATE OR REPLACE FUNCTION public.create_support_enquiry(_request_id uuid, _owner_id uuid, _name text, _email text, _category text, _subject text, _body text, _submitter_hash text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.support_tickets; m public.support_messages;
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(_submitter_hash, 0));
 SELECT * INTO t FROM public.support_tickets WHERE request_id = _request_id;
 IF FOUND THEN
  IF t.owner_id IS DISTINCT FROM _owner_id OR t.submitter_hash <> _submitter_hash THEN RAISE EXCEPTION 'Duplicate request belongs to another sender'; END IF;
  SELECT * INTO m FROM public.support_messages WHERE ticket_id = t.id ORDER BY created_at LIMIT 1;
  RETURN jsonb_build_object('ticket', to_jsonb(t), 'message', to_jsonb(m), 'duplicate', true);
 END IF;
 IF (SELECT count(*) FROM public.support_tickets WHERE submitter_hash = _submitter_hash AND created_at > now() - interval '10 minutes') >= 3 THEN RAISE EXCEPTION 'Too many submissions'; END IF;
 INSERT INTO public.support_tickets(request_id, owner_id, contact_name, reply_email, category, subject, submitter_hash) VALUES (_request_id, _owner_id, _name, _email, _category, _subject, _submitter_hash) RETURNING * INTO t;
 INSERT INTO public.support_messages(ticket_id, request_id, author_id, author_kind, body) VALUES (t.id, _request_id, _owner_id, 'user', _body) RETURNING * INTO m;
 RETURN jsonb_build_object('ticket', to_jsonb(t), 'message', to_jsonb(m), 'duplicate', false);
END $$;
REVOKE ALL ON FUNCTION public.create_support_enquiry(uuid,uuid,text,text,text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_support_enquiry(uuid,uuid,text,text,text,text,text,text) TO service_role;
CREATE OR REPLACE FUNCTION public.append_support_message(_ticket_id uuid, _request_id uuid, _actor_id uuid, _admin boolean, _body text, _status text DEFAULT NULL) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.support_tickets; m public.support_messages;
BEGIN
 SELECT * INTO t FROM public.support_tickets WHERE id = _ticket_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Enquiry not found'; END IF;
 IF _admin THEN
  IF NOT public.has_role(_actor_id, 'admin') THEN RAISE EXCEPTION 'Access denied'; END IF;
 ELSE
  IF _actor_id IS NULL OR t.owner_id IS DISTINCT FROM _actor_id OR _status IS NOT NULL THEN RAISE EXCEPTION 'Access denied'; END IF;
 END IF;
 SELECT * INTO m FROM public.support_messages WHERE request_id = _request_id;
 IF FOUND THEN
  IF m.ticket_id <> _ticket_id OR m.author_id IS DISTINCT FROM _actor_id THEN RAISE EXCEPTION 'Access denied'; END IF;
  RETURN jsonb_build_object('ticket',to_jsonb(t),'message',to_jsonb(m),'duplicate',true);
 END IF;
 IF _status IS NOT NULL AND _status NOT IN ('open','awaiting_user','resolved') THEN RAISE EXCEPTION 'Invalid status'; END IF;
 IF NOT _admin AND (SELECT count(*) FROM public.support_messages WHERE author_id = _actor_id AND created_at > now() - interval '10 minutes') >= 10 THEN RAISE EXCEPTION 'Too many submissions'; END IF;
 INSERT INTO public.support_messages(ticket_id,request_id,author_id,author_kind,body) VALUES (_ticket_id,_request_id,_actor_id,CASE WHEN _status IS NOT NULL THEN 'status' WHEN _admin THEN 'admin' ELSE 'user' END,CASE WHEN _status IS NOT NULL THEN 'Status changed to ' || _status ELSE _body END) RETURNING * INTO m;
 UPDATE public.support_tickets SET status = COALESCE(_status, CASE WHEN _admin THEN 'awaiting_user' ELSE 'open' END), updated_at = now() WHERE id = t.id RETURNING * INTO t;
 RETURN jsonb_build_object('ticket',to_jsonb(t),'message',to_jsonb(m),'duplicate',false);
END $$;
REVOKE ALL ON FUNCTION public.append_support_message(uuid,uuid,uuid,boolean,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.append_support_message(uuid,uuid,uuid,boolean,text,text) TO service_role;