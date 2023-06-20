import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchema, userUpdateSchema } from "../schemas/user.schema";
import { checkValidUserMiddleware } from "../middlewares/checkValidUserMiddleware";
import {
  createNewUserController,
  deleteUserController,
  getAllUserVehiclesController,
  getUserController,
  resetPasswordController,
  sendEmailPasswordResetController,
  updateUserController,
} from "../controllers/user.controllers";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { checkValidUserUpdateEmailMiddleware } from "../middlewares/checkValidUserUpdateEmailMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  checkValidUserMiddleware,
  createNewUserController
);
userRoutes.post("/sendToken", sendEmailPasswordResetController);
userRoutes.post("/resetPassword", resetPasswordController);

userRoutes.use(checkTokenMiddleware);

userRoutes.get("/user_vehicles", getAllUserVehiclesController);
userRoutes.get("", getUserController);

userRoutes.patch(
  "",
  ensureDataIsValidMiddleware(userUpdateSchema),
  checkValidUserUpdateEmailMiddleware,
  updateUserController
);
userRoutes.delete("", deleteUserController);
