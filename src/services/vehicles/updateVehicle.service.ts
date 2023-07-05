import { AppDataSource } from "../../data-source";
import { Equal, Repository } from "typeorm";

import {
  TVehicleResponse,
  TVehicleUpdateWithFipe,
} from "../../interfaces/vehicles.interfaces";
import { Image, Vehicle } from "../../entities";
import { vehicleSchemaResponse } from "../../schemas/vehicles.schema";

const updateVehicleService = async (
  vehicleData: TVehicleUpdateWithFipe,
  existingVehicle: Vehicle
): Promise<TVehicleResponse> => {
  const { images, ...vehicleDataToUpdate } = vehicleData;

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const updatedVehicle = {
    ...existingVehicle,
    ...vehicleDataToUpdate,
  };

  await vehicleRepository.save(updatedVehicle);

  let updatedImages: Image[] = [];

  if (images) {
    const imageRepository: Repository<Image> =
      AppDataSource.getRepository(Image);

    await imageRepository.delete({ vehicle: Equal(updatedVehicle.id) });

    updatedImages = await Promise.all(
      images.map(async (imageUrl, index) => {
        const image = new Image();
        image.image_url = imageUrl;
        image.image_number = index + 1;
        image.vehicle = updatedVehicle;

        await imageRepository.save(image);

        return image;
      })
    );
  }

  return vehicleSchemaResponse.parse({
    ...updatedVehicle,
    images: updatedImages,
  });
};

export default updateVehicleService;
