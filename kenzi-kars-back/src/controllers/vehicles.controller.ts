import { Request, Response } from "express";

import createVehicleService from "../services/vehicles/createVehicle.service";
import {
  TVehicleResponse,
  TVehicleWithFipe,
} from "../interfaces/vehicles.interfaces";
import updateVehicleService from "../services/vehicles/updateVehicle.service";
import { Vehicle } from "../entities";
import deleteVehicleService from "../services/vehicles/deleteVehicle.service";
import { vehicleSchemaResponse } from "../schemas/vehicles.schema";
import listVehiclesService from "../services/vehicles/listVehicles.service";

const createVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleWithFipe = req.body;

  const newVehicle: TVehicleResponse = await createVehicleService(vehicleData);

  return res.status(201).json(newVehicle);
};

const retrieveVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicle: Vehicle = res.locals.vehicle;

  return res.json(vehicleSchemaResponse.parse(vehicle));
};

const listVehiclesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicles = await listVehiclesService();

  return res.json(vehicles);
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
  retrieveVehicleController,
  listVehiclesController,
  createVehicleController,
  updateVehicleController,
  deleteVehicleController,
};
