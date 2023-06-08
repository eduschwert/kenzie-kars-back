import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { Vehicle } from "../../entities";
import { TPaginationResult } from "../../interfaces/vehicles.interfaces";
import { vehiclesSchemaResponse } from "../../schemas/vehicles.schema";

const listVehiclesService = async (
  perPage: number,
  page: number,
  baseUrl: string
): Promise<TPaginationResult> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const totalCount: number = await vehicleRepository.count();

  const totalPages: number = Math.ceil(totalCount / perPage);
  const startIndex: number = (page - 1) * perPage;

  const vehicles = await vehicleRepository.find({
    relations: {
      images: true,
    },
    where: {
      is_active: true,
    },
    skip: startIndex,
    take: perPage,
  });

  const parsedVehicles = vehicles.map((vehicle) => ({
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
    data: vehiclesSchemaResponse.parse(parsedVehicles),
  };

  return result;
};

export default listVehiclesService;
