import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Vehicle } from "../../entities";
import { TVehiclesMaxPriceAndMileage } from "../../interfaces/vehicles.interfaces";

const getMaxPriceAndMileageService =
  async (): Promise<TVehiclesMaxPriceAndMileage> => {
    const vehicleRepository: Repository<Vehicle> =
      AppDataSource.getRepository(Vehicle);

    const result = await vehicleRepository
      .createQueryBuilder("vehicles")
      .select("MAX(vehicles.price)", "maxPrice")
      .addSelect("MAX(vehicles.mileage)", "maxMileage")
      .getRawOne();

    const toNumberResult = {
      maxPrice: Number(result.maxPrice),
      maxMileage: Number(result.maxMileage),
    };

    return toNumberResult;
  };

export default getMaxPriceAndMileageService;
