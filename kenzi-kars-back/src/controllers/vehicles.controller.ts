import { Request, Response } from "express";

import createVehicleService from "../services/vehicles/createVehicle.service";
import {
  TVehicleResponse,
  TVehicleWithFipe,
} from "../interfaces/vehicles.interfaces";
import updateVehicleService from "../services/vehicles/updateVehicle.service";
import { Vehicle } from "../entities";
import deleteVehicleService from "../services/vehicles/deleteVehicle.service";

const createVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleWithFipe = req.body;

  const newVehicle: TVehicleResponse = await createVehicleService(vehicleData);

  return res.json(newVehicle);
};

const updateVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleWithFipe = req.body;
  const vehicle: Vehicle = res.locals.vehicle;

  const updatedVehicle: TVehicleResponse = await updateVehicleService(
    vehicleData,
    vehicle
  );

  return res.json(updatedVehicle);
};

const deleteVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicle: Vehicle = res.locals.vehicle;

  await deleteVehicleService(vehicle);

  return res.status(204).send();
};

export {
  createVehicleController,
  updateVehicleController,
  deleteVehicleController,
};
