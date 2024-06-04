import { z } from "zod";

const commentRequestSchema = z.object({
  content: z.string().min(3).max(2000),
});

const commentResponseSchema = commentRequestSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { commentRequestSchema, commentResponseSchema };
