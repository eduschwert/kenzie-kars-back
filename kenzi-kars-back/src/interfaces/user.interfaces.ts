import { z } from "zod";

import {
  userSchemaRequest,
  userSchemaResponseWithoutPassword,
  userSchemaUpdate,
} from "../schemas/user.schema";

type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserUpdate = z.infer<typeof userSchemaUpdate>;
type TUserResponse = z.infer<typeof userSchemaResponseWithoutPassword>;

export { TUserRequest, TUserUpdate, TUserResponse };
