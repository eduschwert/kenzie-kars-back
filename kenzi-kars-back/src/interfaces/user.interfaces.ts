import { z } from "zod";

import {
  userSchemaRequest,
  userSchemaResponseWithoutPassword,
  userSchemaWithoutAdress,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserUpdate = DeepPartial<z.infer<typeof userSchemaWithoutAdress>>;
type TUserResponse = z.infer<typeof userSchemaResponseWithoutPassword>;

export { TUserRequest, TUserUpdate, TUserResponse };
