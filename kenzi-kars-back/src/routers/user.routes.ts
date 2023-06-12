import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchema } from "../schemas/user.schema";
import { checkValidUserMiddleware } from "../middlewares/checlValidUserMiddleware";
import {
  createNewUserController,
  getAllUserVehiclesController,
} from "../controllers/user.controllers";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  checkValidUserMiddleware,
  createNewUserController
);
userRoutes.use(checkTokenMiddleware);
userRoutes.get("/user_vehicles", getAllUserVehiclesController);
