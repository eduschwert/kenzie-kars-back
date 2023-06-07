import { Request, Response, NextFunction } from "express";

import { AxiosResponse } from "axios";
import {
  TVehicleRequest,
  TVehicleFipeApi,
} from "../interfaces/vehicles.interfaces";
import { api } from "../utils/axios";

const ensureVehicleAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const vehicleData: TVehicleRequest = req.body;

  const { data }: AxiosResponse<TVehicleFipeApi> = await api.get(
    `/cars/unique?brand=${vehicleData.brand}&name=${vehicleData.model}&year=${vehicleData.year}&fuel=${vehicleData.fuel}`
  );

  req.body = {
    ...req.body,
    fipe_price: data.value,
  };

  return next();
};

export default ensureVehicleAvailableMiddleware;
