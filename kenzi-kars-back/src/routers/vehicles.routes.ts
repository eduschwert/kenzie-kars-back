import { Router } from "express";

import {
  vehicleSchemaRequest,
  vehicleSchemaUpdate,
} from "../schemas/vehicles.schema";
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
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { ensureVehicleOwnerMiddleware } from "../middlewares/ensureVehicleOwner.middleware copy";

const vehiclesRoutes = Router();

vehiclesRoutes.get("", listVehiclesController);

vehiclesRoutes.get(
  "/:vehicleId",
  ensureVehicleExistsMiddleware,
  retrieveVehicleController
);

vehiclesRoutes.use(checkTokenMiddleware);

vehiclesRoutes.post(
  "",
  ensureDataIsValidMiddleware(vehicleSchemaRequest),
  ensureVehicleAvailableMiddleware,
  verifyGoodBuyMiddleware,
  createVehicleController
);

vehiclesRoutes.put(
  "/:vehicleId",
  ensureDataIsValidMiddleware(vehicleSchemaUpdate),
  ensureVehicleExistsMiddleware,
  ensureVehicleAvailableMiddleware,
  ensureVehicleOwnerMiddleware,
  verifyGoodBuyMiddleware,
  updateVehicleController
);

vehiclesRoutes.delete(
  "/:vehicleId",
  ensureVehicleExistsMiddleware,
  ensureVehicleOwnerMiddleware,
  deleteVehicleController
);

export default vehiclesRoutes;
