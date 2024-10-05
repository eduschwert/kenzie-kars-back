import { Request, Response } from "express";

import {
  PaginationResult,
  VehicleRequestWithFipe,
  VehicleResponseWithImages,
  VehicleUpdateWithFipe,
} from "../interfaces";
import { User, Vehicle } from "../entities";
import sellersService from "../services/sellers.service";
import { pagination } from "../utils";

const create = async (req: Request, res: Response): Promise<Response> => {
  const vehicleData: VehicleRequestWithFipe = req.body;
  const user: User = res.locals.user;

  const newVehicle: VehicleResponseWithImages = await sellersService.create(
    vehicleData,
    user
  );

  return res.status(201).json(newVehicle);
};

const findAll = async (req: Request, res: Response): Promise<Response> => {
  const { perPage, page, startIndex, baseUrl, previousPage } =
    pagination.getPaginationParamsController(req);

  const userId: string = res.locals.userId;

  const vehicles: PaginationResult<VehicleResponseWithImages[]> =
    await sellersService.findAll({
      perPage,
      page,
      startIndex,
      baseUrl,
      previousPage,
      userId,
    });

  return res.json(vehicles);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const vehicleData: VehicleUpdateWithFipe = req.body;
  const vehicle: Vehicle = res.locals.vehicle;

  const updatedVehicle: VehicleResponseWithImages = await sellersService.update(
    vehicleData,
    vehicle
  );

  return res.json(updatedVehicle);
};

const destroy = async (_: Request, res: Response): Promise<Response> => {
  const vehicle: Vehicle = res.locals.vehicle;

  await sellersService.destroy(vehicle);

  return res.status(204).send();
};

export default { create, findAll, update, destroy };
