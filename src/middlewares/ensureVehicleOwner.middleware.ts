import { Request, Response, NextFunction } from "express";

import { Vehicle } from "../entities";
import AppError from "../errors/app.errors";

const ensureVehicleOwnerMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = res.locals.userId;
  const vehicle: Vehicle = res.locals.vehicle;

  if (vehicle.user.id !== userId) {
    throw new AppError("You are not the owner of this vehicle", 403);
  }

  return next();
};

export default ensureVehicleOwnerMiddleware;
