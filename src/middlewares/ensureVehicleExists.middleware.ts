import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { z } from "zod";

import AppDataSource from "../data-source";
import { Vehicle } from "../entities";
import AppError from "../errors/app.errors";

const ensureVehicleExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const vehicleId: string = req.params.vehicleId;

  const schema = z.string().uuid();

  const validateId = schema.safeParse(vehicleId);
  if (!validateId.success) {
    throw new AppError("Invalid UUID", 400);
  }

  const findVehicle: Vehicle | null = await vehicleRepository.findOne({
    where: {
      id: vehicleId,
    },
    relations: { user: true },
  });

  if (!findVehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  res.locals.vehicle = findVehicle;

  return next();
};

export default ensureVehicleExistsMiddleware;
