import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

export type ILoginUser = z.infer<typeof loginSchema>;
