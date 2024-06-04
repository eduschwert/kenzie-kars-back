import { Router } from "express";

import { vehiclesControllers } from "../controllers";
import middlewares from "../middlewares";

const vehiclesRoutes = Router();

vehiclesRoutes.get("", vehiclesControllers.findAll);

vehiclesRoutes.get(
  "/:vehicleId",
  middlewares.ensureVehicleActiveExistsMiddleware,
  vehiclesControllers.findOneByVehicleId
);

vehiclesRoutes.get("/seller/:userId", vehiclesControllers.findAllByUserId);

export default vehiclesRoutes;
