import { DeepPartial } from "typeorm";
import {
  userSchema,
  returnUserSchemaNoPassword,
  returnUserSchemaVehicle,
  emailRequest,
  addressSchema,
  returnAddressSchema,
} from "../schemas/user.schema";
import { z } from "zod";
import { User } from "../entities";

export type IUser = z.infer<typeof userSchema>;
export type INewUser = z.infer<typeof returnUserSchemaNoPassword>;
export type IGetUser = z.infer<typeof returnUserSchemaVehicle>;
export type IEmailRequest = z.infer<typeof emailRequest>;
export type IUpdateUser = DeepPartial<User>;
export type IAddress = z.infer<typeof addressSchema>;
export type IUserAddress = z.infer<typeof returnAddressSchema>;
