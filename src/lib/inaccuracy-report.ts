import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max.toLocaleString()} characters or fewer.`)
    .optional()
    .or(z.literal(""));

export const inaccuracyReportSchema = z.object({
  topicId: z.string().trim().min(1, "Enter the affected page or topic.").max(128),
  topicTitle: z.string().trim().min(1, "Enter the affected page or topic.").max(256),
  topicUrl: optionalText(1024).refine(
    (value) => !value || value.startsWith("/") || /^https?:\/\//i.test(value),
    "Enter a full web address or a path beginning with /.",
  ),
  quotedText: optionalText(1000),
  message: z
    .string()
    .trim()
    .min(5, "Describe the issue in at least a few words.")
    .max(4000, "Must be 4,000 characters or fewer."),
  suggestedCorrection: optionalText(4000),
  contactEmail: z
    .string()
    .trim()
    .max(320, "Must be 320 characters or fewer.")
    .refine((value) => !value || z.email().safeParse(value).success, "Enter a valid email address."),
});

export type InaccuracyReportInput = z.infer<typeof inaccuracyReportSchema>;

const nullable = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const buildInaccuracyReportPayload = (input: InaccuracyReportInput) => ({
  topic_id: input.topicId.trim(),
  topic_title: input.topicTitle.trim(),
  topic_url: nullable(input.topicUrl),
  quoted_text: nullable(input.quotedText),
  message: input.message.trim(),
  suggested_correction: nullable(input.suggestedCorrection),
  contact_email: nullable(input.contactEmail),
  user_agent:
    typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 512) : null,
});

export const getFirstValidationError = (error: z.ZodError) =>
  error.issues[0]?.message ?? "Check the form and try again.";