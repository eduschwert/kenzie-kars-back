import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TVehicleResponse } from "../../interfaces/vehicles.interfaces";
import { Vehicle } from "../../entities";

const listVehiclesService = async (): Promise<Array<any>> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const vehicles: Vehicle[] = await vehicleRepository.find({
    relations: {
      images: true,
    },
  });

  return vehicles;
};

export default listVehiclesService;
