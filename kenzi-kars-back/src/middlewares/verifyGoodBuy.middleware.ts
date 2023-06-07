import { Request, Response, NextFunction } from "express";

import { TVehicleWithFipe } from "../interfaces/vehicles.interfaces";

const verifyGoodBuyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const vehicleData: TVehicleWithFipe = req.body;

  const isGoodBuy = vehicleData.price <= vehicleData.fipe_price * 0.95;

  req.body = {
    ...req.body,
    is_good_buy: isGoodBuy,
  };

  return next();
};

export default verifyGoodBuyMiddleware;
