import {
  Repository,
  Between,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import { AppDataSource } from "../../data-source";

import { Vehicle } from "../../entities";
import { TPaginationResult } from "../../interfaces/vehicles.interfaces";

import { vehiclesWithUserSchemaResponse } from "../../schemas/vehicles.schema";

import { vehiclesSchemaResponseWithImages } from "../../schemas/vehicles.schema";


const listVehiclesService = async (
  perPage: number,
  page: number,
  brand: string | undefined,
  model: string | undefined,
  color: string | undefined,
  year: string | undefined,
  fuel: number | undefined,
  minMileage: number | undefined,
  maxMileage: number | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  orderBy: "price" | "year" | "mileage" | undefined,
  baseUrl: string
): Promise<any> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  let whereCondition: any = {
    is_active: true,
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

  whereCondition.is_active = true;

  const [vehicles, totalCount] = await vehicleRepository.findAndCount({
    relations: {
      images: true,
      seller: true,
    },
    where: whereCondition,
    skip: (page - 1) * perPage,
    take: perPage,
    order: orderBy ? { [orderBy]: "ASC" } : {},
  });

  const parsedVehicles = vehicles.map((vehicle) => ({
    ...vehicle,
    fipe_price: Number(vehicle.fipe_price),
    price: Number(vehicle.price),
  }));

  const totalPages: number = Math.ceil(totalCount / perPage);

  const result = {
    count: totalCount,
    previousPage:
      page > 1 ? `${baseUrl}?perPage=${perPage}&page=${page - 1}` : null,
    nextPage:
      page < totalPages
        ? `${baseUrl}?perPage=${perPage}&page=${page + 1}`
        : null,

    //data: vehiclesWithUserSchemaResponse.parse(parsedVehicles),

    data: vehiclesSchemaResponseWithImages.parse(parsedVehicles),

  };

  return result;
};

export default listVehiclesService;
