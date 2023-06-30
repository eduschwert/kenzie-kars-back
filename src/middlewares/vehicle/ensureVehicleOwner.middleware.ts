import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/app.errors";

const ensureVehicleOwnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = res.locals.userId;
  const vehicle = res.locals.vehicle;

  if (vehicle.seller.id !== userId) {
    throw new AppError(
      "You don`t have permissions to perform this action",
      403
    );
  }

  return next();
};

export default ensureVehicleOwnerMiddleware;
