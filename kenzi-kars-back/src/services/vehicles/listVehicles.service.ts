import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Vehicle } from "../../entities";

const listVehiclesService = async (
  perPage: number,
  page: number,
  baseUrl: string
): Promise<any> => {
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

  const result = {
    count: totalCount,
    previousPage:
      page > 1 ? `${baseUrl}?perPage=${perPage}&page=${page - 1}` : null,
    nextPage:
      page < totalPages
        ? `${baseUrl}?perPage=${perPage}&page=${page + 1}`
        : null,
    data: vehicles,
  };

  return result;
};

export default listVehiclesService;
