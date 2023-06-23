import { Request, Response } from "express";

import {
  TPaginationResult,
  TVehicleRequestWithFipe,
  TVehicleResponse,
  TVehicleUpdateWithFipe,
  TVehiclesResponse,
} from "../interfaces/vehicles.interfaces";
import { User, Vehicle } from "../entities";
import createVehicleService from "../services/vehicles/createVehicle.service";
import deleteVehicleService from "../services/vehicles/deleteVehicle.service";
import updateVehicleService from "../services/vehicles/updateVehicle.service";
import listVehiclesService from "../services/vehicles/listVehicles.service";

import listVehiclesByUserIdService from "../services/vehicles/listVehiclesByUserId.service";
import { vehicleSchemaResponse } from "../schemas/vehicles.schema";

const createVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleRequestWithFipe = req.body;
  const user: User = res.locals.user;

  const newVehicle: TVehicleResponse = await createVehicleService(
    vehicleData,
    user
  );

  return res.status(201).json(newVehicle);
};

const retrieveVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicle: Vehicle = res.locals.vehicle;

  return res.json(vehicleSchemaResponse.parse(vehicle));
};

const listVehiclesController = async (req: Request, res: Response) => {
  let page: number = parseInt(req.query.page as string, 10);
  page = !Number.isNaN(page) && page > 0 && page <= 10 ? page : 1;

  let perPage: number = parseInt(req.query.perPage as string, 10);
  perPage =
    !Number.isNaN(perPage) && perPage > 0 && perPage <= 10 ? perPage : 10;

  const brand: string | undefined = req.query.brand as string | undefined;
  const model: string | undefined = req.query.model as string | undefined;
  const color: string | undefined = req.query.color as string | undefined;
  const year: string | undefined = req.query.year as string | undefined;

  let fuel: number | undefined = parseInt(req.query.fuel as string, 10);
  fuel = !Number.isNaN(fuel) && fuel > 0 && fuel <= 3 ? fuel : undefined;

  let minMileage: number | undefined = parseInt(
    req.query.minMileage as string,
    10
  );
  minMileage = !Number.isNaN(minMileage) ? minMileage : undefined;

  let maxMileage: number | undefined = parseInt(
    req.query.maxMileage as string,
    10
  );
  maxMileage = !Number.isNaN(maxMileage) ? maxMileage : undefined;

  let minPrice: number | undefined = parseInt(req.query.minPrice as string, 10);
  minPrice = !Number.isNaN(minPrice) ? minPrice : undefined;

  let maxPrice: number | undefined = parseInt(req.query.maxPrice as string, 10);
  maxPrice = !Number.isNaN(maxPrice) ? maxPrice : undefined;

  let orderBy: "price" | "year" | "mileage" | undefined;

  if (typeof req.query.orderBy === "string") {
    const orderByQueryParam: string = req.query.orderBy;
    if (
      orderByQueryParam === "price" ||
      orderByQueryParam === "year" ||
      orderByQueryParam === "mileage"
    ) {
      orderBy = orderByQueryParam;
    }
  }

  const baseUrl: string = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  const vehicles: TPaginationResult<TVehiclesResponse> =
    await listVehiclesService(
      perPage,
      page,
      brand,
      model,
      color,
      year,
      fuel,
      minMileage,
      maxMileage,
      minPrice,
      maxPrice,
      orderBy,
      baseUrl
    );

  return res.json(vehicles);
};

const listVehiclesByUserIdController = async (req: Request, res: Response) => {
  let perPage: number = 10;
  let page: number = 1;
  const userId: string = req.params.userId;

  if (typeof req.query.perPage === "string") {
    const perPageQueryParam: string = req.query.perPage;
    const perPageValue: number = parseInt(perPageQueryParam, 10);
    if (!isNaN(perPageValue) && perPageValue >= 1 && perPageValue <= 10) {
      perPage = perPageValue;
    }
  }

  if (typeof req.query.page === "string") {
    const pageQueryParam: string = req.query.page;
    const pageValue: number = parseInt(pageQueryParam, 10);
    if (!isNaN(pageValue) && pageValue >= 1) {
      page = pageValue;
    }
  }

  const baseUrl: string = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  const vehicles: TPaginationResult<TVehiclesResponse> =
    await listVehiclesByUserIdService(perPage, page, baseUrl, userId);

  return res.json(vehicles);
};

const updateVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleUpdateWithFipe = req.body;
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
  listVehiclesByUserIdController,
  createVehicleController,
  updateVehicleController,
  deleteVehicleController,
};
