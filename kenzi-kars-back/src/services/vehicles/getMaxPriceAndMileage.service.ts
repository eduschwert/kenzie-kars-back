import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Vehicle } from "../../entities";

const getMaxPriceAndMileageService = async (): Promise<any> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const result = await vehicleRepository
    .createQueryBuilder("vehicles")
    .select("MAX(vehicles.price)", "maxPrice")
    .addSelect("MAX(vehicles.mileage)", "maxMileage")
    .getRawOne();

  return result;
};

export default getMaxPriceAndMileageService;
