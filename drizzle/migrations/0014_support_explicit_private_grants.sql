REVOKE ALL ON public.support_tickets, public.support_messages FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.support_tickets, public.support_messages FROM authenticated;
GRANT SELECT ON public.support_tickets, public.support_messages TO authenticated;
GRANT ALL ON public.support_tickets, public.support_messages TO service_role;
REVOKE ALL ON FUNCTION public.create_support_enquiry(uuid,uuid,text,text,text,text,text,text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.append_support_message(uuid,uuid,uuid,boolean,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_support_enquiry(uuid,uuid,text,text,text,text,text,text), public.append_support_message(uuid,uuid,uuid,boolean,text,text) TO service_role;