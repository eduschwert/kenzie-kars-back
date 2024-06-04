import { Router } from "express";

import middlewares from "../middlewares";
import { loginSchema } from "../schemas";
import { loginController } from "../controllers";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  middlewares.ensureDataIsValidMiddleware(loginSchema),
  loginController
);

export default loginRoutes;
