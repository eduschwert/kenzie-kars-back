import { Router } from "express";

import middlewares from "../middlewares";
import { vehicleRequestSchema, vehicleUpdateSchema } from "../schemas";
import sellersController from "../controllers/sellers.controller";

const sellersRoutes: Router = Router();

sellersRoutes.use(
  middlewares.ensureAuthMiddleware,
  middlewares.ensureUserSellerMiddleware
);

sellersRoutes.post(
  "",
  middlewares.ensureDataIsValidMiddleware(vehicleRequestSchema),
  middlewares.ensureVehicleAvailableMiddleware,
  middlewares.verifyGoodBuyMiddleware,
  sellersController.create
);

sellersRoutes.get("", sellersController.findAll);

sellersRoutes.put(
  "/:vehicleId",
  middlewares.ensureDataIsValidMiddleware(vehicleUpdateSchema),
  middlewares.ensureVehicleExistsMiddleware,
  middlewares.ensureVehicleOwnerMiddleware,
  middlewares.ensureVehicleAvailableMiddleware,
  middlewares.verifyGoodBuyMiddleware,
  sellersController.update
);

sellersRoutes.delete(
  "/:vehicleId",
  middlewares.ensureVehicleExistsMiddleware,
  middlewares.ensureVehicleOwnerMiddleware,
  sellersController.destroy
);

export default sellersRoutes;
