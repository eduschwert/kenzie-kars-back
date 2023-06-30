import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { User, Vehicle } from "../../entities";
import {
  TPaginationResult,
  TVehiclesResponse,
} from "../../interfaces/vehicles.interfaces";
import { vehiclesSchemaResponse } from "../../schemas/vehicles.schema";
import AppError from "../../errors/app.errors";

const listVehiclesByUserIdService = async (
  perPage: number,
  page: number,
  baseUrl: string,
  userId: string
): Promise<TPaginationResult<TVehiclesResponse>> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const totalCount: number = await vehicleRepository.count();

  const totalPages: number = Math.ceil(totalCount / perPage);
  const startIndex: number = (page - 1) * perPage;

  const vehicles = await vehicleRepository.find({
    relations: {
      images: true,
      seller: true,
    },
    where: {
      is_active: true,
      seller: { id: userId },
    },
    skip: startIndex,
    take: perPage,
  });

  const toNumberVehicles = vehicles.map((vehicle) => ({
    ...vehicle,
    fipe_price: Number(vehicle.fipe_price),
    price: Number(vehicle.price),
  }));

  const result = {
    count: totalCount,
    previousPage:
      page > 1 ? `${baseUrl}?perPage=${perPage}&page=${page - 1}` : null,
    nextPage:
      page < totalPages
        ? `${baseUrl}?perPage=${perPage}&page=${page + 1}`
        : null,
    data: vehiclesSchemaResponse.parse(toNumberVehicles),
  };

  return result;
};

export default listVehiclesByUserIdService;
