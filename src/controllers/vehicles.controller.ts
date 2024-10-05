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

  const isValidBoolean = (value: string | undefined): boolean | undefined => {
    if (value === "true") return true;
    return undefined;
  };

  const brand = req.query.brand as string | undefined;
  const model = req.query.model as string | undefined;
  const isGoodBuy = isValidBoolean(req.query.isGoodBuy as string | undefined);
  const color = req.query.color as string | undefined;
  const minYear = req.query.minYear as string | undefined;
  const maxYear = req.query.maxYear as string | undefined;

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
      isGoodBuy,
      color,
      minYear,
      maxYear,
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
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleId: string = req.params.vehicleId;

  const schema = z.string().uuid();

  const validateId = schema.safeParse(vehicleId);
  if (!validateId.success) {
    throw new AppError("Invalid UUID", 400);
  }

  let token = req.headers.authorization;

  const vehicle: VehicleResponseWithUserAndImagesAndComments =
    await vehiclesServices.findOneByVehicleId(vehicleId, token);

  return res.json(vehicle);
};

export default { findAll, findOneByVehicleId, findAllByUserId };
