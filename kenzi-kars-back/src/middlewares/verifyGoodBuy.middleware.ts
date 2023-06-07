import { Request, Response, NextFunction } from "express";

import {
  TVehicleWithFipeRequest,
  TVehicleWithFipeRequestUpdate,
} from "../interfaces/vehicles.interfaces";

const verifyGoodBuyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const vehicleData: TVehicleWithFipeRequest | TVehicleWithFipeRequestUpdate =
    req.body;

  const isGoodBuy = vehicleData.price <= vehicleData.fipe_price * 0.95;

  req.body = {
    ...req.body,
    is_good_buy: isGoodBuy,
  };

  return next();
};

export default verifyGoodBuyMiddleware;
