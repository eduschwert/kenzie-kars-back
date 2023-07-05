import { Router } from "express";

import { loginController } from "../controllers/login.controller";
import ensureDataIsValidMiddleware from "../middlewares/global/ensureDataIsValid.middleware";
import ensureAuthMiddleware from "../middlewares/user/ensureAuth.middleware";
import { commentSchemaRequest } from "../schemas/comment.schema";
import ensureVehicleExistsMiddleware from "../middlewares/vehicle/ensureVehicleExists.middleware";
import {
  createCommentController,
  deleteCommentController,
  listCommentsController,
  putCommentController,
} from "../controllers/comment.controller";
import { ensureCommentExistsMiddleware } from "../middlewares/comment/ensureCommentExists";

const commentRoutes: Router = Router();

commentRoutes.get(
  "/:vehicleId",
  ensureVehicleExistsMiddleware,
  listCommentsController
);
commentRoutes.use(ensureAuthMiddleware);
commentRoutes.post(
  "/:vehicleId",
  ensureDataIsValidMiddleware(commentSchemaRequest),
  ensureVehicleExistsMiddleware,
  createCommentController
);

commentRoutes.put(
  "/:commentId",
  ensureDataIsValidMiddleware(commentSchemaRequest),
  ensureCommentExistsMiddleware,
  putCommentController
);

commentRoutes.delete(
  "/:commentId",
  ensureCommentExistsMiddleware,
  deleteCommentController
);

export default commentRoutes;
