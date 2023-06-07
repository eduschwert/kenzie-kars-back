import { Router } from "express";

import { vehicleSchemaRequest } from "../schemas/vehicles.schema";
import {
  createVehicleController,
  deleteVehicleController,
  listVehiclesController,
  retrieveVehicleController,
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

vehiclesRoutes.get(
  "/:vehicleId",
  ensureVehicleExistsMiddleware,
  retrieveVehicleController
);

vehiclesRoutes.get("", listVehiclesController);

vehiclesRoutes.put(
  "/:vehicleId",
  ensureDataIsValidMiddleware(vehicleSchemaRequest),
  ensureVehicleExistsMiddleware,
  ensureVehicleAvailableMiddleware,
  verifyGoodBuyMiddleware,
  updateVehicleController
);

vehiclesRoutes.delete(
  "/:vehicleId",
  ensureVehicleExistsMiddleware,
  deleteVehicleController
);

export default vehiclesRoutes;
