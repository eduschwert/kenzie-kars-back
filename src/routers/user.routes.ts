import { Router } from "express";

import ensureDataIsValidMiddleware from "../middlewares/global/ensureDataIsValid.middleware";
import {
  userEmailSchema,
  userPasswordSchema,
  userSchemaRequest,
  userSchemaUpdate,
} from "../schemas/user.schema";
import {
  createNewUserController,
  deleteUserController,
  getAllUserVehiclesController,
  getUserController,
  resetPasswordController,
  sendEmailPasswordResetController,
  updateUserAdressController,
  updateUserController,
} from "../controllers/user.controllers";
import ensureAuthMiddleware from "../middlewares/user/ensureAuth.middleware";
import ensureEmailUniqueMiddleware from "../middlewares/user/ensureEmailUnique.middleware";
import { addressSchemaUpdate } from "../schemas/address.schema";
import ensureUserSellerMiddleware from "../middlewares/vehicle/ensureUserSeller.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailUniqueMiddleware,
  createNewUserController
);

userRoutes.post(
  "/resetPassword/",
  ensureDataIsValidMiddleware(userEmailSchema),
  sendEmailPasswordResetController
);

userRoutes.post(
  "/resetPassword/:token",
  ensureDataIsValidMiddleware(userPasswordSchema),
  resetPasswordController
);

userRoutes.use(ensureAuthMiddleware);

userRoutes.get("", getUserController);

userRoutes.patch(
  "",
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureEmailUniqueMiddleware,
  updateUserController
);

userRoutes.patch(
  "/address",
  ensureDataIsValidMiddleware(addressSchemaUpdate),
  updateUserAdressController
);

userRoutes.delete("", deleteUserController);

userRoutes.get(
  "/user_vehicles",
  ensureUserSellerMiddleware,
  getAllUserVehiclesController
);

export default userRoutes;
