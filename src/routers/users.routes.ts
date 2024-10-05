import { Router } from "express";

import middlewares from "../middlewares";
import { usersControllers } from "../controllers";
import {
  userRequestSchema,
  userEmailSchema,
  userPasswordSchema,
  userUpdateSchema,
  addressRequestSchema,
  userPasswordUpdateSchema,
} from "../schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  middlewares.ensureDataIsValidMiddleware(userRequestSchema),
  middlewares.ensureEmailUniqueMiddleware,
  usersControllers.create
);

usersRoutes.post(
  "/resetPassword/",
  middlewares.ensureDataIsValidMiddleware(userEmailSchema),
  usersControllers.sendEmailResetPassword
);

usersRoutes.post(
  "/resetPassword/:token",
  middlewares.ensureDataIsValidMiddleware(userPasswordSchema),
  usersControllers.resetPasswordController
);

usersRoutes.use(middlewares.ensureAuthMiddleware);

usersRoutes.get("", usersControllers.findOne);

usersRoutes.patch(
  "",
  middlewares.ensureDataIsValidMiddleware(userUpdateSchema),
  middlewares.ensureEmailUniqueMiddleware,
  usersControllers.update
);

usersRoutes.patch(
  "/address",
  middlewares.ensureDataIsValidMiddleware(addressRequestSchema),
  usersControllers.updateAddress
);

usersRoutes.patch(
  "/password",
  middlewares.ensureDataIsValidMiddleware(userPasswordUpdateSchema),
  usersControllers.updatePassword
);

usersRoutes.delete("", usersControllers.destroy);

export default usersRoutes;
