import { userSchema, returnUserSchemaNoPassword } from "../schemas/user.schema";
import { z } from "zod";

export type IUser = z.infer<typeof userSchema>;
export type INewUser = z.infer<typeof returnUserSchemaNoPassword>;
