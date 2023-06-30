import { Request, Response, NextFunction } from "express";

import { TVehicleFipeApi } from "../../interfaces/vehicles.interfaces";
import { api } from "../../utils/axios";

const ensureVehicleAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { brand, model, year, fuel } = req.body;
  const name = model;

  const response = await api.get<TVehicleFipeApi>(`/cars/unique`, {
    params: { brand, name, year, fuel },
  });

  req.body = {
    ...req.body,
    fipe_price: response.data.value,
  };

  return next();
};

export default ensureVehicleAvailableMiddleware;
