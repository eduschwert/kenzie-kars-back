import { Request, Response, NextFunction } from "express";

import {
  TVehicleRequest,
  TVehicleFipeApi,
  TVehicleUpdateWithFipe,
  TVehicleUpdate,
} from "../../interfaces/vehicles.interfaces";
import { api } from "../../utils/axios";

const ensureVehicleAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const vehicleData: TVehicleRequest | TVehicleUpdate = req.body;

  const { data } = await api.get<TVehicleFipeApi>(
    `/cars/unique?brand=${vehicleData.brand}&name=${vehicleData.model}&year=${vehicleData.year}&fuel=${vehicleData.fuel}`
  );

  req.body = {
    ...req.body,
    fipe_price: data.value,
  };

  return next();
};

export default ensureVehicleAvailableMiddleware;
