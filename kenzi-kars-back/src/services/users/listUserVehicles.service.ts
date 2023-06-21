import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { Vehicle } from "../../entities";
import { TPaginationResult } from "../../interfaces/vehicles.interfaces";
import { vehiclesSchemaResponseWithImages } from "../../schemas/vehicles.schema";

const listUserVehiclesService = async (
  userId: string,
  perPage: number,
  page: number,
  baseUrl: string
): Promise<any> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const totalCount: number = await vehicleRepository.count({
    where: {
      seller: { id: userId },
    },
  });

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

  const vehiclesToNumber = vehicles.map((vehicle) => ({
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
    data: vehiclesSchemaResponseWithImages.parse(vehiclesToNumber),
  };

  return result;
};

export default listUserVehiclesService;
