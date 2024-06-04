import { Repository } from "typeorm";

import AppDataSource from "../data-source";
import { User, Vehicle, Image } from "../entities";
import {
  ImageResponse,
  PaginationResult,
  VehicleRequestWithFipe,
  VehicleResponse,
  VehicleResponseWithImages,
  VehicleUpdateWithFipe,
} from "../interfaces";
import { pagination } from "../utils";
import {
  vehicleResponseSchema,
  vehicleResponseSchemaWithImages,
} from "../schemas";

const create = async (
  vehicleData: VehicleRequestWithFipe,
  user: User
): Promise<VehicleResponseWithImages> => {
  const { images, ...vehicleDataWithoutImages } = vehicleData;

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const vehicle: Vehicle = vehicleRepository.create(vehicleDataWithoutImages);

  vehicle.user = user;

  await vehicleRepository.save(vehicle);

  let createdImages: ImageResponse[] = [];

  if (images) {
    const imageRepository: Repository<Image> =
      AppDataSource.getRepository(Image);

    createdImages = await Promise.all(
      images.map(async (imageUrl, index) => {
        const image = new Image();
        image.imageUrl = imageUrl;
        image.imageNumber = index + 1;
        image.vehicle = vehicle;

        await imageRepository.save(image);

        return image;
      })
    );
  }

  return vehicleResponseSchemaWithImages.parse({
    ...vehicle,
    images: createdImages,
  });
};

const findAll = async ({
  userId,
  perPage,
  page,
  startIndex,
  previousPage,
  baseUrl,
}: {
  userId: string;
  perPage: number;
  page: number;
  startIndex: number;
  baseUrl: string;
  previousPage: string | null;
}): Promise<PaginationResult<VehicleResponse[]>> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const [vehicles, totalCount] = await vehicleRepository.findAndCount({
    where: {
      user: { id: userId },
    },
    skip: startIndex,
    take: perPage,
  });

  const { nextPage, totalPages } = pagination.getPaginationParamsService(
    totalCount,
    perPage,
    page,
    baseUrl
  );

  const result = {
    count: totalCount,
    totalPages: totalPages,
    previousPage: previousPage,
    nextPage: nextPage,
    data: vehicleResponseSchema.array().parse(vehicles),
  };

  return result;
};

const update = async (
  vehicleData: VehicleUpdateWithFipe,
  vehicle: Vehicle
): Promise<VehicleResponseWithImages> => {
  const { images, ...vehicleDataToUpdate } = vehicleData;

  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  const updatedVehicle = await vehicleRepository.save({
    ...vehicle,
    ...vehicleDataToUpdate,
  });

  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);

  if (!images) {
    await imageRepository.delete({ vehicle: { id: vehicle.id } });
  } else {
    const existingImages = await imageRepository.find({
      where: { vehicle: { id: vehicle.id } },
    });

    const imagesToRemove = existingImages.filter(
      (existingImage, index) =>
        !images[index] || existingImage.imageUrl !== images[index]
    );

    await imageRepository.remove(imagesToRemove);

    const newImages = await Promise.all(
      images.map(async (imageUrl, index) => {
        const existingImage = existingImages[index];
        if (!existingImage || existingImage.imageUrl !== imageUrl) {
          const newImage = new Image();
          newImage.imageUrl = imageUrl;
          newImage.imageNumber = index + 1;
          newImage.vehicle = updatedVehicle;
          return imageRepository.save(newImage);
        }
        return existingImage;
      })
    );

    return vehicleResponseSchemaWithImages.parse({
      ...updatedVehicle,
      images: newImages,
    });
  }

  return vehicleResponseSchemaWithImages.parse({
    ...updatedVehicle,
    images: [],
  });
};

const destroy = async (vehicle: Vehicle): Promise<void> => {
  const vehicleRepository: Repository<Vehicle> =
    AppDataSource.getRepository(Vehicle);

  await vehicleRepository.remove(vehicle);
};

export default { findAll, create, update, destroy };
