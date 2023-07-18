import { z } from "zod";

import {
  userSchemaRequest,
  userSchemaResponseWithoutPassword,
  userSchemaResponseWithoutPasswordAndAddress,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type UserRequest = z.infer<typeof userSchemaRequest>;

type UserUpdate = DeepPartial<
  z.infer<typeof userSchemaResponseWithoutPasswordAndAddress>
>;

type UserResponse = z.infer<typeof userSchemaResponseWithoutPassword>;

export { UserRequest, UserUpdate, UserResponse };
