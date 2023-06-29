import { Router } from "express";

import ensureDataIsValidMiddleware from "../middlewares/global/ensureDataIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
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

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailUniqueMiddleware,
  createNewUserController
);
userRoutes.post("/sendToken", sendEmailPasswordResetController);
userRoutes.post("/resetPassword", resetPasswordController);
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

userRoutes.get("/user_vehicles", getAllUserVehiclesController);

export default userRoutes;
