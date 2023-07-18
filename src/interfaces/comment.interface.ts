import { z } from "zod";

import {
  commentSchemaList,
  commentSchemaRequest,
} from "../schemas/comment.schema";

type CommentRequest = z.infer<typeof commentSchemaRequest>;
type CommentResponse = z.infer<typeof commentSchemaRequest>;
type CommentResponseList = z.infer<typeof commentSchemaList>;

export { CommentRequest, CommentResponse, CommentResponseList };
