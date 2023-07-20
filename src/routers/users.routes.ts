import { Router } from "express";

import {
  userEmailSchema,
  userPasswordSchema,
  userSchemaRequest,
  userSchemaUpdate,
} from "../schemas/user.schema";
import {
  createUserController,
  deleteUserController,
  getProfileUserController,
  resetPasswordController,
  sendEmailPasswordResetController,
  updateUserAdressController,
  updateUserController,
} from "../controllers/users.controllers";

import { addressSchemaRequest } from "../schemas/address.schema";
import ensureDataIsValidMiddleware from "../middlewares/global/ensureDataIsValid.middleware";
import ensureAuthMiddleware from "../middlewares/user/ensureAuth.middleware";
import ensureEmailUniqueMiddleware from "../middlewares/user/ensureEmailUnique.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailUniqueMiddleware,
  createUserController
);

usersRoutes.post(
  "/resetPassword/",
  ensureDataIsValidMiddleware(userEmailSchema),
  sendEmailPasswordResetController
);

usersRoutes.post(
  "/resetPassword/:token",
  ensureDataIsValidMiddleware(userPasswordSchema),
  resetPasswordController
);

usersRoutes.use(ensureAuthMiddleware);

usersRoutes.get("", getProfileUserController);

usersRoutes.put(
  "",
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureEmailUniqueMiddleware,
  updateUserController
);

usersRoutes.put(
  "/addresses",
  ensureDataIsValidMiddleware(addressSchemaRequest),
  updateUserAdressController
);

usersRoutes.delete("", deleteUserController);

export default usersRoutes;
