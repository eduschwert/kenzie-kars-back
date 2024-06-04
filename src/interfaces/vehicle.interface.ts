import { z } from "zod";
import {
  vehicleRequestSchema,
  vehicleResponseListSchemaWithOneUser,
  vehicleResponseSchema,
  vehicleResponseSchemaWithImages,
  vehicleResponseSchemaWithUser,
  vehicleResponseSchemaWithUserAndImages,
  vehicleResponseSchemaWithUserAndImagesAndComments,
  vehicleUpdateSchema,
} from "../schemas";

type VehicleRequest = z.infer<typeof vehicleRequestSchema>;
type VehicleRequestWithFipe = VehicleRequest & {
  fipe_price: number;
};

type VehicleUpdate = z.infer<typeof vehicleUpdateSchema>;
type VehicleUpdateWithFipe = VehicleUpdate & {
  fipe_price: number;
};

type VehicleResponse = z.infer<typeof vehicleResponseSchema>;

type VehicleResponseListWithOneUser = z.infer<
  typeof vehicleResponseListSchemaWithOneUser
>;

type VehicleResponseWithUser = z.infer<typeof vehicleResponseSchemaWithUser>;

type VehicleResponseWithUserAndImages = z.infer<
  typeof vehicleResponseSchemaWithUserAndImages
>;

type VehicleResponseWithImages = z.infer<
  typeof vehicleResponseSchemaWithImages
>;

type VehicleResponseWithUserAndImagesAndComments = z.infer<
  typeof vehicleResponseSchemaWithUserAndImagesAndComments
>;

export {
  VehicleRequest,
  VehicleRequestWithFipe,
  VehicleUpdate,
  VehicleUpdateWithFipe,
  VehicleResponse,
  VehicleResponseListWithOneUser,
  VehicleResponseWithUser,
  VehicleResponseWithUserAndImages,
  VehicleResponseWithImages,
  VehicleResponseWithUserAndImagesAndComments,
};
