import { Router } from "express";

import { vehiclesControllers } from "../controllers";

const vehiclesRoutes = Router();

vehiclesRoutes.get("", vehiclesControllers.findAll);

vehiclesRoutes.get("/:vehicleId", vehiclesControllers.findOneByVehicleId);

vehiclesRoutes.get("/seller/:userId", vehiclesControllers.findAllByUserId);

export default vehiclesRoutes;
