import { z } from 'zod';
export const enquirySchema = z.object({type:z.enum(['support','topic','error']),subject:z.string().trim().min(1).max(120),message:z.string().trim().min(1).max(2000),name:z.string().trim().max(100),replyEmail:z.union([z.string().trim().email().max(254),z.literal('')])});
export const replySchema = z.string().trim().min(1).max(5000);
export function manualReply(email: string, subject: string, body: string) {
 if (!z.string().email().max(254).safeParse(email).success || !replySchema.safeParse(body).success) return null;
 return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject.slice(0,120)}`)}&body=${encodeURIComponent(body)}`;
}
