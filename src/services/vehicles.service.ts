import {
  Between,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

import AppDataSource from "../data-source";
import { User, Vehicle } from "../entities";
import {
  PaginationResult,
  VehicleResponseListWithOneUser,
  VehicleResponseWithUser,
  VehicleResponseWithUserAndImagesAndComments,
} from "../interfaces";
import { pagination } from "../utils";
import {
  vehicleResponseListSchemaWithOneUser,
  vehicleResponseSchemaWithUser,
  vehicleResponseSchemaWithUserAndImagesAndComments,
} from "../schemas";
import AppError from "../errors/app.errors";

const findAll = async ({
  perPage,
  page,
  startIndex,
  baseUrl,
  previousPage,
  brand,
  model,
  color,
  year,
  fuel,
  minMileage,
  maxMileage,
  minPrice,
  maxPrice,
}: {
  perPage: number;
  page: number;
  startIndex: number;
  baseUrl: string;
  previousPage: string | null;
  brand: string | undefined;
  model: string | undefined;
  color: string | undefined;
  year: string | undefined;
  fuel: number | undefined;
  minMileage: number | undefined;
  maxMileage: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}): Promise<PaginationResult<VehicleResponseWithUser[]>> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  let whereCondition: any = {
    isActive: true,
  };

  if (brand) {
    whereCondition.brand = ILike(`%${brand}%`);
  }

  if (model) {
    whereCondition.model = ILike(`%${model}%`);
  }

  if (color) {
    whereCondition.color = ILike(`%${color}%`);
  }

  if (year) {
    whereCondition.year = year;
  }

  if (fuel) {
    whereCondition.fuel = fuel;
  }

  if (minMileage && maxMileage) {
    whereCondition.mileage = Between(minMileage, maxMileage);
  } else if (minMileage) {
    whereCondition.mileage = MoreThanOrEqual(minMileage);
  } else if (maxMileage) {
    whereCondition.mileage = LessThanOrEqual(maxMileage);
  }

  if (minPrice && maxPrice) {
    whereCondition.price = Between(minPrice, maxPrice);
  } else if (minPrice) {
    whereCondition.price = MoreThanOrEqual(minPrice);
  } else if (maxPrice) {
    whereCondition.price = LessThanOrEqual(maxPrice);
  }

  const [vehicles, totalCount] = await vehicleRepository.findAndCount({
    where: whereCondition,
    relations: {
      user: true,
    },
    skip: startIndex,
    take: perPage,
  });

  const { totalPages, nextPage } = pagination.getPaginationParamsService(
    totalCount,
    perPage,
    page,
    baseUrl
  );

  const result = {
    count: totalCount,
    totalPages: totalPages,
    previousPage: previousPage,
    nextPage: nextPage,
    data: vehicleResponseSchemaWithUser.array().parse(vehicles),
  };

  return result;
};

const findAllByUserId = async ({
  perPage,
  page,
  startIndex,
  previousPage,
  baseUrl,
  userId,
}: {
  perPage: number;
  page: number;
  startIndex: number;
  baseUrl: string;
  previousPage: string | null;
  userId: string;
}): Promise<PaginationResult<VehicleResponseListWithOneUser>> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: { id: userId },
  });

  if (!findUser) {
    throw new AppError("Seller not found", 404);
  }

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const [vehicles, totalCount] = await vehicleRepository.findAndCount({
    where: {
      isActive: true,
      user: { id: userId },
    },
    skip: startIndex,
    take: perPage,
  });

  const { nextPage, totalPages } = pagination.getPaginationParamsService(
    totalCount,
    perPage,
    page,
    baseUrl
  );

  const result = {
    count: totalCount,
    totalPages: totalPages,
    previousPage: previousPage,
    nextPage: nextPage,
    data: vehicleResponseListSchemaWithOneUser.parse({
      user: findUser,
      vehicles: vehicles,
    }),
  };

  return result;
};

const findOneByVehicleId = async (
  vehicleId: string
): Promise<VehicleResponseWithUserAndImagesAndComments> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const findVehicle = await vehicleRepository.findOne({
    where: {
      id: vehicleId,
      isActive: true,
    },
    relations: {
      user: true,
      images: true,
      comments: true,
    },
  });

  return vehicleResponseSchemaWithUserAndImagesAndComments.parse(findVehicle);
};

export default { findAll, findAllByUserId, findOneByVehicleId };
