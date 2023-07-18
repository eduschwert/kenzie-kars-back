import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

type LoginRequest = z.infer<typeof loginSchema>;

export { LoginRequest };
