import { Router } from "express";

import { vehicleSchemaRequest } from "../schemas/vehicles.schema";
import {
  createVehicleController,
  updateVehicleController,
} from "../controllers/vehicles.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureVehicleExistsMiddleware from "../middlewares/ensureVehicleExists.middleware";
import ensureVehicleAvailableMiddleware from "../middlewares/ensureVehicleAvailable.middleware";
import verifyGoodBuyMiddleware from "../middlewares/verifyGoodBuy.middleware";

const vehiclesRoutes = Router();

vehiclesRoutes.post(
  "",
  ensureDataIsValidMiddleware(vehicleSchemaRequest),
  ensureVehicleAvailableMiddleware,
  verifyGoodBuyMiddleware,
  createVehicleController
);

vehiclesRoutes.put(
  "/:vehicleId",
  ensureDataIsValidMiddleware(vehicleSchemaRequest),
  ensureVehicleExistsMiddleware,
  ensureVehicleAvailableMiddleware,
  verifyGoodBuyMiddleware,
  updateVehicleController
);

// vehiclesRoutes.delete(
//   "/:vehicleId",
//   ensureDataIsValidMiddleware(vehicleSchemaRequest),
//   createVehicleController
// );

export default vehiclesRoutes;
