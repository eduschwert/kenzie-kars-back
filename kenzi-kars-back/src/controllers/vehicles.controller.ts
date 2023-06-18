import { Request, Response } from "express";

import {
  TPaginationResult,
  TVehicleResponse,
  TVehicleWithFipeRequest,
  TVehicleWithFipeRequestUpdate,
} from "../interfaces/vehicles.interfaces";
import { Vehicle } from "../entities";
import { vehicleSchemaResponse } from "../schemas/vehicles.schema";
import createVehicleService from "../services/vehicles/createVehicle.service";
import deleteVehicleService from "../services/vehicles/deleteVehicle.service";
import updateVehicleService from "../services/vehicles/updateVehicle.service";
import listVehiclesService from "../services/vehicles/listVehicles.service";

const createVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleWithFipeRequest = req.body;
  const userId = res.locals.userId;

  const newVehicle: TVehicleResponse = await createVehicleService(
    vehicleData,
    userId
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
  let perPage: number = 10;
  let page: number = 1;

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

  let brand: string | undefined = req.query.brand as string | undefined;
  let model: string | undefined = req.query.model as string | undefined;
  let color: string | undefined = req.query.color as string | undefined;
  let year: string | undefined = req.query.year as string | undefined;

  let fuel: number | undefined = req.query.fuel
    ? parseInt(req.query.fuel as string, 10)
    : undefined;
  if (Number.isNaN(fuel)) {
    fuel = undefined;
  }
  if (fuel !== undefined) {
    fuel = fuel > 0 && fuel < 4 ? fuel : undefined;
  }

  let minMileage: number | undefined = req.query.minMileage
    ? parseInt(req.query.minMileage as string, 10)
    : undefined;
  if (Number.isNaN(minMileage)) {
    minMileage = undefined;
  }

  let maxMileage: number | undefined = req.query.maxMileage
    ? parseInt(req.query.maxMileage as string, 10)
    : undefined;
  if (Number.isNaN(maxMileage)) {
    maxMileage = undefined;
  }

  let minPrice: number | undefined = req.query.minPrice
    ? parseInt(req.query.minPrice as string, 10)
    : undefined;
  if (Number.isNaN(minPrice)) {
    minPrice = undefined;
  }

  let maxPrice: number | undefined = req.query.maxPrice
    ? parseInt(req.query.maxPrice as string, 10)
    : undefined;
  if (Number.isNaN(maxPrice)) {
    maxPrice = undefined;
  }

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

  const vehicles: TPaginationResult = await listVehiclesService(
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

const updateVehicleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const vehicleData: TVehicleWithFipeRequestUpdate = req.body;
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
