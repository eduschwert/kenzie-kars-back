import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import { Vehicle } from "../../entities";

const deleteVehicleService = async (vehicle: Vehicle): Promise<void> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  await vehicleRepository.remove(vehicle);
};

export default deleteVehicleService;
