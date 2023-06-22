import { Router } from "express";

import {
  vehicleSchemaRequest,
  vehicleSchemaUpdate,
} from "../schemas/vehicles.schema";
import {
  createVehicleController,
  deleteVehicleController,
  listVehiclesByUserIdController,
  listVehiclesController,
  retrieveVehicleController,
  updateVehicleController,
} from "../controllers/vehicles.controller";
import ensureDataIsValidMiddleware from "../middlewares/global/ensureDataIsValid.middleware";
import ensureVehicleExistsMiddleware from "../middlewares/vehicle/ensureVehicleExists.middleware";
import ensureVehicleAvailableMiddleware from "../middlewares/vehicle/ensureVehicleAvailable.middleware";
import verifyGoodBuyMiddleware from "../middlewares/vehicle/verifyGoodBuy.middleware";
import ensureAuthMiddleware from "../middlewares/user/ensureAuth.middleware";
import ensureVehicleOwnerMiddleware from "../middlewares/vehicle/ensureVehicleOwner.middleware";
import ensureUserSellerMiddleware from "../middlewares/vehicle/ensureUserSeller.middleware";

const vehiclesRoutes = Router();

vehiclesRoutes.get("", listVehiclesController);

vehiclesRoutes.get(
  "/:vehicleId",
  ensureVehicleExistsMiddleware,
  retrieveVehicleController
);

vehiclesRoutes.use(ensureAuthMiddleware, ensureUserSellerMiddleware);

vehiclesRoutes.get("/user/:userId", listVehiclesByUserIdController);

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
  ensureVehicleOwnerMiddleware,
  ensureVehicleAvailableMiddleware,
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
