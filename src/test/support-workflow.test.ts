import { describe, it, expect, vi } from 'vitest';
import { canAccess, contactIdentity, persistThenNotify, verifiedSender } from '../../supabase/functions/_shared/support/rules';
import { enquirySchema, manualReply, replySchema } from '@/lib/support';
const actor={id:'owner-a',email:'verified@example.org',admin:false};
describe('private support access and identity',()=>{
 it('denies anonymous, other accounts and forged email ownership',()=>{expect(canAccess(null,'owner-a')).toBe(false);expect(canAccess({...actor,id:'owner-b'},'owner-a')).toBe(false);expect(canAccess(actor,null)).toBe(false);});
 it('allows only owner or verified admin',()=>{expect(canAccess(actor,'owner-a')).toBe(true);expect(canAccess({...actor,admin:true},'owner-b')).toBe(true);});
 it('uses session identity, never typed email for account association',()=>{expect(contactIdentity(actor,{replyEmail:'other@example.org'})).toEqual({owner:'owner-a',name:'',email:'verified@example.org'});expect(contactIdentity(null,{replyEmail:'verified@example.org'}).owner).toBeNull();});
});
describe('input and email boundaries',()=>{
 const input={type:'support',subject:'Viva offline',message:'Please help',name:'',replyEmail:''};
 it('rejects blank, overlong and malformed inputs',()=>{for(const value of [{...input,subject:' '},{...input,message:'x'.repeat(2001)},{...input,name:'x'.repeat(101)},{...input,replyEmail:'not-email'},{...input,type:'admin'}])expect(enquirySchema.safeParse(value).success).toBe(false);expect(enquirySchema.safeParse(input).success).toBe(true);});
 it('rejects blank and oversized replies',()=>{expect(replySchema.safeParse(' ').success).toBe(false);expect(replySchema.safeParse('x'.repeat(5001)).success).toBe(false);});
 it('does not treat resend test domain or pending verification as externally usable',()=>{expect(verifiedSender('onboarding@resend.dev',[{name:'resend.dev',status:'verified'}])).toBe(false);expect(verifiedSender('support@example.org',[{name:'example.org',status:'pending'}])).toBe(false);expect(verifiedSender('support@example.org',[{name:'example.org',status:'verified'}])).toBe(true);});
 it('encodes manual email safely and rejects invalid recipient',()=>{expect(manualReply('x@example.org','a&b','hello\nworld')).toContain('a%26b');expect(manualReply('x@example.org\nBcc:x@evil.org','subject','body')).toBeNull();});
});
describe('save-first and duplicate safety',()=>{
 it('keeps saved enquiry and records failure when email throws',async()=>{const order:string[]=[];const record=vi.fn();const result=await persistThenNotify(async()=>{order.push('saved');return {duplicate:false,message:{id:'message-1'}};},async()=>{order.push('email');throw new Error('outage');},record);expect(order).toEqual(['saved','email']);expect(result.message.id).toBe('message-1');expect(record).toHaveBeenCalledWith('message-1','failed','Email delivery failed; message remains saved.');});
 it('records provider rejection for a saved admin reply',async()=>{const record=vi.fn();await persistThenNotify(async()=>({duplicate:false,message:{id:'reply-1'}}),async()=>({status:'failed',error:'rejected'}),record);expect(record).toHaveBeenCalledWith('reply-1','failed','rejected');});
 it('never emails twice for repeated request id',async()=>{const notify=vi.fn();const record=vi.fn();const result=await persistThenNotify(async()=>({duplicate:true,message:{id:'same'}}),notify,record);expect(result.message.id).toBe('same');expect(notify).not.toHaveBeenCalled();expect(record).not.toHaveBeenCalled();});
 it('does not email if persistence fails',async()=>{const notify=vi.fn();await expect(persistThenNotify(async()=>{throw new Error('storage unavailable');},notify,vi.fn())).rejects.toThrow('storage unavailable');expect(notify).not.toHaveBeenCalled();});
 it('does not resend when delivery bookkeeping fails',async()=>{const notify=vi.fn(async()=>({status:'sent'}));const result=await persistThenNotify(async()=>({duplicate:false,message:{id:'saved'}}),notify,async()=>{throw new Error('outage');});expect(result.message.id).toBe('saved');expect(notify).toHaveBeenCalledTimes(1);});
});
