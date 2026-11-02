import { handleSupport } from '../_shared/support/service.ts';
Deno.serve(req => handleSupport(req, true));
