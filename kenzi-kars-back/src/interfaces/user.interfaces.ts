import {
  userSchema,
  returnUserSchemaNoPassword,
  returnUserSchemaVehicle,
} from "../schemas/user.schema";
import { z } from "zod";

export type IUser = z.infer<typeof userSchema>;
export type INewUser = z.infer<typeof returnUserSchemaNoPassword>;
export type IGetUser = z.infer<typeof returnUserSchemaVehicle>;
