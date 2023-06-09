import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchema } from "../schemas/user.schema";
import { checkValidUserMiddleware } from "../middlewares/checlValidUserMiddleware";
import { createNewUserController } from "../controllers/user.controllers";
// import { checkValidDataMiddleware } from "../middlewares/checkValidDataMiddleware";
// import { checkValidUserMiddleware } from "../middlewares/checlValidUserMiddleware";
// import { updateUserSchema, userSchema } from "../schemas/userSchemas";
// import {
//   createNewUserController,
//   //   getUserController,
//   //   patchUserController,
//   //   deleteUserController,
// } from "../controllers/userControllers";
// import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
// import { checkPatchEmailMiddleware } from "../middlewares/checkPatchEmailMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  checkValidUserMiddleware,
  createNewUserController
);
