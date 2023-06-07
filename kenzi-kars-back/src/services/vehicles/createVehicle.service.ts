import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import {
  TImageResponse,
  TVehicleResponse,
  TVehicleWithFipe,
} from "../../interfaces/vehicles.interfaces";
import { Image, Vehicle } from "../../entities";
import { vehicleSchemaResponse } from "../../schemas/vehicles.schema";

const createVehicleService = async (
  vehicleData: TVehicleWithFipe
): Promise<TVehicleResponse> => {
  const { images, ...vehicleDataWithoutImages } = vehicleData;

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const vehicle: Vehicle = vehicleRepository.create(vehicleDataWithoutImages);

  await vehicleRepository.save(vehicle);

  let createdImages: TImageResponse[] = [];

  if (images) {
    const imageRepository: Repository<Image> =
      AppDataSource.getRepository(Image);

    createdImages = await Promise.all(
      images.map(async (imageUrl, index) => {
        const image = new Image();
        image.image_url = imageUrl;
        image.image_number = index + 1;
        image.vehicle = vehicle;

        await imageRepository.save(image);

        return image;
      })
    );
  }

  return vehicleSchemaResponse.parse({
    ...vehicle,
    images: createdImages,
  });
};

export default createVehicleService;
