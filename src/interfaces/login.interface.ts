import { z } from "zod";

import { loginSchema } from "../schemas";

type LoginRequest = z.infer<typeof loginSchema>;

export { LoginRequest };
