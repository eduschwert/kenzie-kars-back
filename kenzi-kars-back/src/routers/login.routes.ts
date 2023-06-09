import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { loginSchema } from "../schemas/login.schema";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), loginController);
