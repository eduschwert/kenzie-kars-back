import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User, Vehicle } from "../entities";
import AppError from "../errors/app.errors";

export const ensureVehicleOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);
  const userId = res.locals.userId;

  const vehicleId: string = req.params.vehicleId;

  const findVehicle: Vehicle | null = await vehicleRepository.findOne({
    where: {
      id: vehicleId,
    },
    relations: {
      images: true,
      seller: true,
    },
  });

  if (!findVehicle) {
    throw new AppError("Vehicle not found", 404);
  }
  if (findVehicle.seller.id !== userId) {
    throw new AppError("Not allowed", 403);
  }

  if (findVehicle) {
    findVehicle.price = Number(findVehicle.price);
    findVehicle.fipe_price = Number(findVehicle.fipe_price);
  }

  res.locals.vehicle = findVehicle;

  return next();
};
