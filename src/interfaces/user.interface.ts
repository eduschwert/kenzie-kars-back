import { z } from "zod";

import {
  userPasswordUpdateSchema,
  userRequestSchema,
  userResponseSchemaPublic,
  userResponseSchemaWithoutPassword,
  userResponseSchemaWithoutPasswordAndAddress,
  userUpdateSchema,
} from "../schemas";

type UserRequest = z.infer<typeof userRequestSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
type UserUpdatePassword = z.infer<typeof userPasswordUpdateSchema>;
type UserResponseWithoutPassword = z.infer<
  typeof userResponseSchemaWithoutPassword
>;
type UserResponseWithoutPasswordAndAddress = z.infer<
  typeof userResponseSchemaWithoutPasswordAndAddress
>;
type UserResponsePublic = z.infer<typeof userResponseSchemaPublic>;

export {
  UserRequest,
  UserUpdate,
  UserUpdatePassword,
  UserResponseWithoutPassword,
  UserResponseWithoutPasswordAndAddress,
  UserResponsePublic,
};
