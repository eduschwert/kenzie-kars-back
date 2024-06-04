import { z } from "zod";
import { commentRequestSchema, commentResponseSchema } from "../schemas";

type CommentRequest = z.infer<typeof commentRequestSchema>;
type CommentResponse = z.infer<typeof commentResponseSchema>;

export { CommentRequest, CommentResponse };
