import { Router } from "express";

import middlewares from "../middlewares";
import { commentsControllers } from "../controllers";
import { commentRequestSchema } from "../schemas";

const commentsRoutes: Router = Router();

commentsRoutes.use(middlewares.ensureAuthMiddleware);

commentsRoutes.post(
  "/:vehicleId",
  middlewares.ensureDataIsValidMiddleware(commentRequestSchema),
  middlewares.ensureVehicleActiveExistsMiddleware,
  middlewares.ensureNotVehicleOwnerMiddleware,
  commentsControllers.create
);

commentsRoutes.put(
  "/:commentId",
  middlewares.ensureDataIsValidMiddleware(commentRequestSchema),
  middlewares.ensureCommentExistsMiddleware,
  middlewares.ensureCommentOwnerMiddleware,
  commentsControllers.update
);

commentsRoutes.delete(
  "/:commentId",
  middlewares.ensureCommentExistsMiddleware,
  middlewares.ensureCommentOwnerMiddleware,
  commentsControllers.destroy
);

export default commentsRoutes;
