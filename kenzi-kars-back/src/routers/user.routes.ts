import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchema, userUpdateSchema } from "../schemas/user.schema";
import { checkValidUserMiddleware } from "../middlewares/checkValidUserMiddleware";
import {
  createNewUserController,
  deleteUserController,
  getAllUserVehiclesController,
  getUserController,
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

userRoutes.use(checkTokenMiddleware);
userRoutes.get("", getUserController);
userRoutes.patch(
  "",
  ensureDataIsValidMiddleware(userUpdateSchema),
  checkValidUserUpdateEmailMiddleware,
  updateUserController
);
userRoutes.delete("", deleteUserController);

userRoutes.get("/user_vehicles", getAllUserVehiclesController);
