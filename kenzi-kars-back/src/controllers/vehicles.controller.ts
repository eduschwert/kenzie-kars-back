import { Request, Response } from "express";

import createVehicleService from "../services/vehicles/createVehicle.service";
import {
  TVehicleResponse,
  TVehicleWithFipe,
} from "../interfaces/vehicles.interfaces";

const createVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleWithFipe = req.body;

  const newVehicle: TVehicleResponse = await createVehicleService(vehicleData);

  return res.json(newVehicle);
};

export { createVehicleController };
