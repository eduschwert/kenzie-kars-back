import { z } from "zod";
import {
  commentSchemaList,
  commentSchemaRequest,
} from "../schemas/comment.schema";

export type iCommentRequest = z.infer<typeof commentSchemaRequest>;
export type iCommentResponse = z.infer<typeof commentSchemaRequest>;
export type iListComments = z.infer<typeof commentSchemaList>;
