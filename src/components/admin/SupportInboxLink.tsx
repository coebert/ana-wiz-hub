import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
export default function SupportInboxLink() {
 const [count,setCount] = useState<number | null>(null);
 useEffect(() => { let active = true; supabase.from('support_tickets').select('id',{count:'exact',head:true}).eq('status','open').then(({count,error})=>{if(active && !error)setCount(count);}); return ()=>{active=false;}; },[]);
 return <Button asChild variant="outline" className="min-h-11"><Link to="/admin/support"><Mail className="w-4 h-4 mr-2" aria-hidden />User enquiries / Support inbox{count !== null ? ` (${count} outstanding)` : ''}</Link></Button>;
}
