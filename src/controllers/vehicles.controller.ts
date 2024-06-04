import { Request, Response } from "express";
import { vehiclesServices } from "../services";
import {
  PaginationResult,
  VehicleResponseListWithOneUser,
  VehicleResponseWithUser,
  VehicleResponseWithUserAndImagesAndComments,
} from "../interfaces";
import { pagination } from "../utils";

import { z } from "zod";
import AppError from "../errors/app.errors";

const parseQueryParamAsNumber = (
  value: string | undefined
): number | undefined => {
  const parsedValue = parseInt(value as string, 10);
  return !isNaN(parsedValue) ? parsedValue : undefined;
};

const findAll = async (req: Request, res: Response): Promise<Response> => {
  const { perPage, page, startIndex, baseUrl, previousPage } =
    pagination.getPaginationParamsController(req);

  const brand = req.query.brand as string | undefined;
  const model = req.query.model as string | undefined;
  const color = req.query.color as string | undefined;
  const year = req.query.year as string | undefined;

  let fuel = parseQueryParamAsNumber(req.query.fuel as string);
  fuel = fuel ? (fuel < 1 || fuel > 3 ? undefined : fuel) : undefined;

  const minMileage = parseQueryParamAsNumber(req.query.minMileage as string);
  const maxMileage = parseQueryParamAsNumber(req.query.maxMileage as string);
  const minPrice = parseQueryParamAsNumber(req.query.minPrice as string);
  const maxPrice = parseQueryParamAsNumber(req.query.maxPrice as string);

  const vehicles: PaginationResult<VehicleResponseWithUser[]> =
    await vehiclesServices.findAll({
      perPage,
      page,
      startIndex,
      baseUrl,
      previousPage,
      brand,
      model,
      color,
      year,
      fuel,
      minMileage,
      maxMileage,
      minPrice,
      maxPrice,
    });

  return res.json(vehicles);
};

const findAllByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { perPage, page, startIndex, baseUrl, previousPage } =
    pagination.getPaginationParamsController(req);

  const userId: string = req.params.userId;

  const schema = z.string().uuid();

  const validateId = schema.safeParse(userId);
  if (!validateId.success) {
    throw new AppError("Invalid UUID", 400);
  }

  const vehicles: PaginationResult<VehicleResponseListWithOneUser> =
    await vehiclesServices.findAllByUserId({
      perPage,
      page,
      startIndex,
      baseUrl,
      previousPage,
      userId,
    });

  return res.json(vehicles);
};

const findOneByVehicleId = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const vehicleId: string = res.locals.vehicle.id;

  const vehicle: VehicleResponseWithUserAndImagesAndComments =
    await vehiclesServices.findOneByVehicleId(vehicleId);

  return res.json(vehicle);
};

export default { findAll, findOneByVehicleId, findAllByUserId };
