import { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";

import { api } from "../utils";
import { VehicleFipeApi } from "../interfaces";

const ensureVehicleAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { brand, model: name, year, fuel } = req.body;

  try {
    const response = await api.get<VehicleFipeApi>("/cars/unique", {
      params: { brand, name, year, fuel },
    });

    req.body = {
      ...req.body,
      fipePrice: response.data.value,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return res.status(400).json({
          message:
            "The specified car model is not available in the internal car database",
        });
      }
    }
    return res.status(500).json({
      message: "An error occurred while fetching the internal car database",
    });
  }

  return next();
};

export default ensureVehicleAvailableMiddleware;
