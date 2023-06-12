import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

import {
  TImageResponse,
  TVehicleResponse,
  TVehicleWithFipeRequest,
} from "../../interfaces/vehicles.interfaces";
import { Image, User, Vehicle } from "../../entities";
import { vehicleSchemaResponse } from "../../schemas/vehicles.schema";
import AppError from "../../errors/app.errors";
import {
  returnUserSchemaNoPassword,
  returnUserSchemaVehicle,
} from "../../schemas/user.schema";

const createVehicleService = async (
  vehicleData: TVehicleWithFipeRequest,
  userId: string
): Promise<TVehicleResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  console.log(findUser);

  const { images, ...vehicleDataWithoutImages } = vehicleData;

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const vehicle: Vehicle = vehicleRepository.create(vehicleDataWithoutImages);

  vehicle.seller = findUser;

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
    seller: findUser,
  });
};

export default createVehicleService;
