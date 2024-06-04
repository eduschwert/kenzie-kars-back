import { z } from "zod";

import {
  userRequestSchema,
  userResponseSchemaWithoutPassword,
  userResponseSchemaWithoutPasswordAndAddress,
  userUpdateSchema,
} from "../schemas";

type UserRequest = z.infer<typeof userRequestSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
type UserResponseWithoutPassword = z.infer<
  typeof userResponseSchemaWithoutPassword
>;
type UserResponseWithoutPasswordAndAddress = z.infer<
  typeof userResponseSchemaWithoutPasswordAndAddress
>;

export {
  UserRequest,
  UserUpdate,
  UserResponseWithoutPassword,
  UserResponseWithoutPasswordAndAddress,
};
